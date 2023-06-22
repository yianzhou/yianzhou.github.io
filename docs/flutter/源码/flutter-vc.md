# FlutterViewController

## ViewController

```cpp title='flutter/shell/platform/darwin/ios/framework/Source/FlutterViewController.mm'
- (instancetype)initWithEngine:(FlutterEngine*)engine
                       nibName:(nullable NSString*)nibName
                        bundle:(nullable NSBundle*)nibBundle {
  self = [super initWithNibName:nibName bundle:nibBundle];
  if (self) {
    _viewOpaque = YES;
    _engine.reset([engine retain]);
    _engineNeedsLaunch = NO;
    _flutterView.reset([[FlutterView alloc] initWithDelegate:_engine opaque:self.isViewOpaque]);
    _weakFactory = std::make_unique<fml::WeakPtrFactory<FlutterViewController>>(self);
    _ongoingTouches.reset([[NSMutableSet alloc] init]);

    [self performCommonViewControllerInitialization];
    [engine setViewController:self];
  }

  return self;
}

- (void)loadView {
  self.view = GetViewOrPlaceholder(_flutterView.get());
  self.view.multipleTouchEnabled = YES;
  self.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

  [self installSplashScreenViewIfNecessary];
  UIScrollView* scrollView = [[UIScrollView alloc] init];
  scrollView.autoresizingMask = UIViewAutoresizingFlexibleWidth;
  // The color shouldn't matter since it is offscreen.
  scrollView.backgroundColor = UIColor.whiteColor;
  scrollView.delegate = self;
  // This is an arbitrary small size.
  scrollView.contentSize = CGSizeMake(kScrollViewContentSize, kScrollViewContentSize);
  // This is an arbitrary offset that is not CGPointZero.
  scrollView.contentOffset = CGPointMake(kScrollViewContentSize, kScrollViewContentSize);
  [self.view addSubview:scrollView];
  _scrollView.reset(scrollView);
}

- (void)installSplashScreenViewIfNecessary {
  // Show the launch screen view again on top of the FlutterView if available.
  // This launch screen view will be removed once the first Flutter frame is rendered.
  if (_splashScreenView && (self.isBeingPresented || self.isMovingToParentViewController)) {
    [_splashScreenView.get() removeFromSuperview];
    _splashScreenView.reset();
    return;
  }

  // Use the property getter to initialize the default value.
  UIView* splashScreenView = self.splashScreenView;
  if (splashScreenView == nil) {
    return;
  }
  splashScreenView.frame = self.view.bounds;
  [self.view addSubview:splashScreenView];
}

- (void)viewDidLoad {
  // Register internal plugins.
  [self addInternalPlugins];

  if ([_engine.get() viewController] == self) {
    [_engine.get() attachView];
  }

  [super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
  if ([_engine.get() viewController] == self) {
    [self onUserSettingsChanged:nil];

    // Only recreate surface on subsequent appearances when viewport metrics are known.
    // First time surface creation is done on viewDidLayoutSubviews.
    if (_viewportMetrics.physical_width) {
      [self surfaceUpdated:YES];
    }
    [[_engine.get() lifecycleChannel] sendMessage:@"AppLifecycleState.inactive"];
    [[_engine.get() restorationPlugin] markRestorationComplete];
  }

  [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated {
  if ([_engine.get() viewController] == self) {
    [self onUserSettingsChanged:nil];
    [self onAccessibilityStatusChanged:nil];
    if (UIApplication.sharedApplication.applicationState == UIApplicationStateActive) {
      [[_engine.get() lifecycleChannel] sendMessage:@"AppLifecycleState.resumed"];
    }
  }
  [super viewDidAppear:animated];
}

- (void)viewDidLayoutSubviews {
  CGRect viewBounds = self.view.bounds;
  CGFloat scale = [UIScreen mainScreen].scale;

  // Purposefully place this not visible.
  _scrollView.get().frame = CGRectMake(0.0, 0.0, viewBounds.size.width, 0.0);
  _scrollView.get().contentOffset = CGPointMake(kScrollViewContentSize, kScrollViewContentSize);

  // First time since creation that the dimensions of its view is known.
  bool firstViewBoundsUpdate = !_viewportMetrics.physical_width;
  _viewportMetrics.device_pixel_ratio = scale;
  _viewportMetrics.physical_width = viewBounds.size.width * scale;
  _viewportMetrics.physical_height = viewBounds.size.height * scale;

  [self updateViewportPadding];
  [self updateViewportMetrics];

  // There is no guarantee that UIKit will layout subviews when the application is active. Creating
  // the surface when inactive will cause GPU accesses from the background. Only wait for the first
  // frame to render when the application is actually active.
  bool applicationIsActive =
      [UIApplication sharedApplication].applicationState == UIApplicationStateActive;

  // This must run after updateViewportMetrics so that the surface creation tasks are queued after
  // the viewport metrics update tasks.
  if (firstViewBoundsUpdate && applicationIsActive && _engine) {
    [self surfaceUpdated:YES];

    flutter::Shell& shell = [_engine.get() shell];
    fml::TimeDelta waitTime =
#if FLUTTER_RUNTIME_MODE == FLUTTER_RUNTIME_MODE_DEBUG
        fml::TimeDelta::FromMilliseconds(200);
#else
        fml::TimeDelta::FromMilliseconds(100);
#endif
    if (shell.WaitForFirstFrame(waitTime).code() == fml::StatusCode::kDeadlineExceeded) {
      FML_LOG(INFO) << "Timeout waiting for the first frame to render.  This may happen in "
                    << "unoptimized builds.  If this is a release build, you should load a less "
                    << "complex frame to avoid the timeout.";
    }
  }
}

- (void)surfaceUpdated:(BOOL)appeared {
  if (!_engine) {
    return;
  }

  // NotifyCreated/NotifyDestroyed are synchronous and require hops between the UI and raster
  // thread.
  if (appeared) {
    [self installFirstFrameCallback];
    [_engine.get() platformViewsController]->SetFlutterView(_flutterView.get());
    [_engine.get() platformViewsController]->SetFlutterViewController(self);
    [_engine.get() iosPlatformView]->NotifyCreated();
  } else {
    self.displayingFlutterUI = NO;
    [_engine.get() iosPlatformView]->NotifyDestroyed();
    [_engine.get() platformViewsController]->SetFlutterView(nullptr);
    [_engine.get() platformViewsController]->SetFlutterViewController(nullptr);
  }
}

- (void)addInternalPlugins {
  self.keyboardManager = [[[FlutterKeyboardManager alloc] init] autorelease];
  fml::WeakPtr<FlutterViewController> weakSelf = [self getWeakPtr];
  FlutterSendKeyEvent sendEvent =
      ^(const FlutterKeyEvent& event, FlutterKeyEventCallback callback, void* userData) {
        if (weakSelf) {
          [weakSelf.get()->_engine.get() sendKeyEvent:event callback:callback userData:userData];
        }
      };
  [self.keyboardManager addPrimaryResponder:[[[FlutterEmbedderKeyResponder alloc]
                                                initWithSendEvent:sendEvent] autorelease]];
  FlutterChannelKeyResponder* responder = [[[FlutterChannelKeyResponder alloc]
      initWithChannel:self.engine.keyEventChannel] autorelease];
  [self.keyboardManager addPrimaryResponder:responder];
  FlutterTextInputPlugin* textInputPlugin = self.engine.textInputPlugin;
  if (textInputPlugin != nil) {
    [self.keyboardManager addSecondaryResponder:textInputPlugin];
  }
}

- (void)popRoute {
  [[_engine.get() navigationChannel] invokeMethod:@"popRoute" arguments:nil];
}

- (void)pushRoute:(NSString*)route {
  [[_engine.get() navigationChannel] invokeMethod:@"pushRoute" arguments:route];
}
```

## FlutterView

```cpp
- (instancetype)initWithDelegate:(id<FlutterViewEngineDelegate>)delegate opaque:(BOOL)opaque {
  self = [super initWithFrame:CGRectNull];
  if (self) {
    _delegate = delegate;
    self.layer.opaque = opaque;
  }
  return self;
}

+ (Class)layerClass {
  return [CAMetalLayer class];
}
```

## FlutterEngine

```cpp
- (void)attachView {
  self.iosPlatformView->attachView();
  [_textInputPlugin.get() setupIndirectScribbleInteraction:self.viewController];
}

- (flutter::PlatformViewIOS*)iosPlatformView {
  return static_cast<flutter::PlatformViewIOS*>(_shell->GetPlatformView().get());
}
```

## Shell

```cpp
fml::WeakPtr<PlatformView> Shell::GetPlatformView() {
  return weak_platform_view_; // Shell::Setup中赋值
}
```

## PlatformViewIOS

A bridge connecting the platform-agnostic shell and the iOS embedding.

The shell provides and requests for UI related data and this `PlatformView` subclass fulfills it with iOS specific capabilities. As an example, the iOS embedding (the `FlutterEngine` and the `FlutterViewController`) sends pointer data to the shell and receives the shell's request for a Skia GrDirectContext and supplies it.

Despite the name "view", this class is unrelated to UIViews on iOS and doesn't have the same lifecycle. It's a long lived bridge owned by the `FlutterEngine` and can be attached and detached sequentially to multiple `FlutterViewController`s and `FlutterView`s.

```cpp title='flutter/shell/platform/darwin/ios/platform_view_ios.mm'
void PlatformViewIOS::attachView() {
  auto flutter_view = static_cast<FlutterView*>(owner_controller_.get().view);
  auto ca_layer = fml::scoped_nsobject<CALayer>{[[flutter_view layer] retain]};
  ios_surface_ = IOSSurface::Create(ios_context_, ca_layer);
}
```

## IOSSurface

```cpp
std::unique_ptr<IOSSurface> IOSSurface::Create(std::shared_ptr<IOSContext> context,
                                               fml::scoped_nsobject<CALayer> layer) {
    if ([layer.get() isKindOfClass:[CAMetalLayer class]]) {
        switch (context->GetBackend()) {
        case IOSRenderingBackend::kSkia:
            return std::make_unique<IOSSurfaceMetalSkia>(
                fml::scoped_nsobject<CAMetalLayer>(
                    reinterpret_cast<CAMetalLayer*>([layer.get() retain])),  // Metal layer
                std::move(context)                                           // context
            );
            break;
        case IOSRenderingBackend::kImpeller:
            return std::make_unique<IOSSurfaceMetalImpeller>(
                fml::scoped_nsobject<CAMetalLayer>(
                    reinterpret_cast<CAMetalLayer*>([layer.get() retain])),  // Metal layer
                std::move(context)                                           // context
            );
        }
    }
    return std::make_unique<IOSSurfaceSoftware>(std::move(layer),   // layer
                                                std::move(context)  // context
    );
}
```
