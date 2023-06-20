# Flutter Engine

## 代码解释

prompt:

- `` 在 Flutter iOS 中是做什么用的？请详细描述一下它的作用和技术细节。
- Extract plain text from the following code comments: ``

The **ICU** (International Components for Unicode) data files are a set of files that provide support for internationalization and localization in software applications. In the context of Flutter, the ICU data files are used to support features like formatting of dates, times, currencies, and pluralization rules in multiple languages.

The **Dart Precompiled Runtime** is a binary file that includes the Dart Virtual Machine and a precompiled snapshot of a Dart application or library. It enables the distribution of Dart applications as standalone binaries that can be run on the target platform without the need for the Dart SDK to be installed.

In programming, a **blob** (short for **Binary Large OBject**) is a collection of binary data, typically stored in a database or file system.

## fml

`namespace fml`: In the Flutter framework, the "fml" namespace refers to the **Flutter Markup Language**. FML is a declarative language for building Flutter UIs that is similar to HTML and XML. It is used to define the structure and layout of UI elements in a Flutter app.

`fml::scoped_nsobject` 使得在 Objective-C 环境中可以方便地管理 `NSObject` 子类对象的内存，而不需要手动调用 `retain` 和 `release` 方法。

`fml::RefPtr`（引用计数指针）是一种类模板，用于实现对特定对象的引用计数。

### fml::WeakPtrFactory

在多线程环境下，一个线程可能正试图访问一个对象，而另一个线程可能在同一时间销毁此对象。在这种情况下，直接使用原始指针可能会导致未定义的行为和程序崩溃。为了解决这个问题，`WeakPtrFactory` 提供了一种方法来创建在对象销毁后自动无效化的弱指针。当对象被销毁时，使用这些弱指针的线程会注意到指针无效，并避免对该对象执行进一步的操作。

`WeakPtrFactory` 的使用方法如下：

1. 在堆上分配的类（如 FlutterEngine）中，添加一个 `WeakPtrFactory` 成员变量：

`std::unique_ptr<fml::WeakPtrFactory<FlutterEngine>> _weakFactory;`

2. 在类的方法中创建弱指针：

`_weakFactory = std::make_unique<fml::WeakPtrFactory<FlutterEngine>>(self);`

3. 在其他线程使用弱指针：

```cpp
-[FlutterEngine getWeakPtr]

- (fml::WeakPtr<FlutterEngine>)getWeakPtr {
  return _weakFactory->GetWeakPtr();
}
```

4. 在析构函数中，在销毁或释放其他任何`FlutterEngine`的成员之前，释放 `_weakFactory` 从而使所有弱指针无效：

`_weakFactory.reset();`

## 启动流程

### 引擎初始化

`-[FlutterEngine initWithName:project:allowHeadlessExecution:restorationEnabled:]`

The FlutterEngine class coordinates a single instance of execution for a [`FlutterDartProject`](#flutterdartproject).

A FlutterEngine can be created independently of a `FlutterViewController` for headless execution. It can also persist across the lifespan of multiple `FlutterViewController` instances to maintain state and/or asynchronous tasks (such as downloading a large file).

A newly initialized FlutterEngine will not actually run a Dart Isolate until either `-runWithEntrypoint:` or `-runWithEntrypoint:libraryURI` is invoked. One of these methods must be invoked before calling `-setViewController:`.

```cpp
#define TRACING_CHECKS_NECESSARY        \
  FML_OS_IOS && !TARGET_OS_SIMULATOR && \
      (FLUTTER_RUNTIME_MODE == FLUTTER_RUNTIME_MODE_DEBUG)

- (instancetype)initWithName:(NSString*)labelPrefix
                     project:(FlutterDartProject*)project
      allowHeadlessExecution:(BOOL)allowHeadlessExecution
          restorationEnabled:(BOOL)restorationEnabled {
  // 见WeakPtrFactory解释
  _weakFactory = std::make_unique<fml::WeakPtrFactory<FlutterEngine>>(self);

  if (project == nil) {
    _dartProject.reset([[FlutterDartProject alloc] init]);
  }

  // If tracing is required but cannot be enabled, subsequent attempts to launch the VM in JIT mode will cause process termination.（从桌面进入会直接退出）
  if (!EnableTracingIfNecessary([_dartProject.get() settings])) {
    NSLog(
        @"Cannot create a FlutterEngine instance in debug mode without Flutter tooling or "
        @"Xcode.\n\nTo launch in debug mode in iOS 14+, run flutter run from Flutter tools, run "
        @"from an IDE with a Flutter IDE plugin or run the iOS project from Xcode.\nAlternatively "
        @"profile and release mode apps can be launched from the home screen.");
    [self release];
    return nil;
  }

  [self recreatePlatformViewController];

  _binaryMessenger = [[FlutterBinaryMessengerRelay alloc] initWithParent:self];
  _connections.reset(new flutter::ConnectionCollection());

  return self;
}

- (void)recreatePlatformViewController {
  // 模拟器：kSoftware,
  // 老机器：kOpenGLES,
  // 新机器：kMetal,
  _renderingApi = flutter::GetRenderingAPIForProcess(FlutterView.forceSoftwareRendering);
  _platformViewsController.reset(new flutter::FlutterPlatformViewsController());
}
```

检查是否由 Xcode 运行：

```cpp title='ptrace_check.cc'
IsLaunchedByXcode()
```

### Run

```cpp title='FlutterEngine.mm'
- (BOOL)runWithEntrypoint:(NSString*)entrypoint
               libraryURI:(NSString*)libraryURI
             initialRoute:(NSString*)initialRoute
           entrypointArgs:(NSArray<NSString*>*)entrypointArgs {
  if ([self createShell:entrypoint libraryURI:libraryURI initialRoute:initialRoute]) {
    [self launchEngine:entrypoint libraryURI:libraryURI entrypointArgs:entrypointArgs];
  }
  return _shell != nullptr;
}

- (BOOL)createShell:(NSString*)entrypoint
         libraryURI:(NSString*)libraryURI
       initialRoute:(NSString*)initialRoute {
  // 设置entrypoint
  auto settings = [_dartProject.get() settings];
  SetEntryPoint(&settings, entrypoint, libraryURI);

  // 创建线程
  NSString* threadLabel = [FlutterEngine generateThreadLabel:_labelPrefix];
  _threadHost = std::make_shared<flutter::ThreadHost>();
  *_threadHost = [FlutterEngine makeThreadHost:threadLabel];

  // 平台负责提供 task_runners 给 Shell
  flutter::TaskRunners task_runners(threadLabel.UTF8String,                          // label
                                    fml::MessageLoop::GetCurrent().GetTaskRunner(),  // platform
                                    _threadHost->raster_thread->GetTaskRunner(),     // raster
                                    _threadHost->ui_thread->GetTaskRunner(),         // ui
                                    _threadHost->io_thread->GetTaskRunner()          // io
  );

  // Create the shell. This is a blocking operation.
  std::unique_ptr<flutter::Shell> shell = flutter::Shell::Create(
      /*platform_data=*/std::move(platformData),
      /*task_runners=*/std::move(task_runners),
      /*settings=*/std::move(settings),
      /*on_create_platform_view=*/on_create_platform_view,
      /*on_create_rasterizer=*/on_create_rasterizer,
      /*is_gpu_disabled=*/_isGpuDisabled);

  [self setupShell:std::move(shell) withObservatoryPublication:settings.enable_observatory_publication];

  return _shell != nullptr;
}

// flutter::ThreadHost 对象表示一个包含 UI、RASTER、和 IO 这三种类型的 Flutter 线程集合
+ (flutter::ThreadHost)makeThreadHost:(NSString*)threadLabel {
  // The current thread will be used as the platform thread. Ensure that the message loop is
  // initialized.
  fml::MessageLoop::EnsureInitializedForCurrentThread();

  uint32_t threadHostType = flutter::ThreadHost::Type::UI | flutter::ThreadHost::Type::RASTER |
                            flutter::ThreadHost::Type::IO;

  // ThreadHostConfig就是一组ThreadConfig的集合
  flutter::ThreadHost::ThreadHostConfig host_config(threadLabel.UTF8String, threadHostType,
                                                    IOSPlatformThreadConfigSetter);

  // ThreadConfig就是ThreadName+ThreadPriority
  host_config.ui_config =
      fml::Thread::ThreadConfig(flutter::ThreadHost::ThreadHostConfig::MakeThreadName(
                                    flutter::ThreadHost::Type::UI, threadLabel.UTF8String),
                                fml::Thread::ThreadPriority::DISPLAY);
  host_config.raster_config =
      fml::Thread::ThreadConfig(flutter::ThreadHost::ThreadHostConfig::MakeThreadName(
                                    flutter::ThreadHost::Type::RASTER, threadLabel.UTF8String),
                                fml::Thread::ThreadPriority::RASTER);
  host_config.io_config =
      fml::Thread::ThreadConfig(flutter::ThreadHost::ThreadHostConfig::MakeThreadName(
                                    flutter::ThreadHost::Type::IO, threadLabel.UTF8String),
                                fml::Thread::ThreadPriority::NORMAL);

  return (flutter::ThreadHost){host_config}; // 调用构造函数，传入host_config
}

- (void)setupShell:(std::unique_ptr<flutter::Shell>)shell
    withObservatoryPublication:(BOOL)doesObservatoryPublication {
  _shell = std::move(shell);
  [self setupChannels];
  [self onLocaleUpdated:nil];
  [self initializeDisplays];
  _publisher.reset([[FlutterObservatoryPublisher alloc]
      initWithEnableObservatoryPublication:doesObservatoryPublication]);
  [self maybeSetupPlatformViewChannels];
  _shell->SetGpuAvailability(_isGpuDisabled ? flutter::GpuAvailability::kUnavailable
                                            : flutter::GpuAvailability::kAvailable);
}
```

### 插件注册

调用 `+[GeneratedPluginRegistrant registerWithRegistry:]`，这里的 `registry` 就是 `FlutterEngine`。

### Channel 注册

```objc
FlutterMethodChannel *flutterMethodChannel = [FlutterMethodChannel methodChannelWithName:channelName binaryMessenger:engine.binaryMessenger];
[flutterMethodChannel setMethodCallHandler:methodCallHandler];

FlutterEventChannel *flutterEventChannel = [FlutterEventChannel eventChannelWithName:channelName binaryMessenger:engine.binaryMessenger];
[flutterEventChannel setStreamHandler:streamHandler];
```

## FlutterDartProject

A set of Flutter and Dart assets used by a `FlutterEngine` to initialize execution.

**The engine will execute the project located in the bundle with the identifier "io.flutter.flutter.app"**.

If the `FlutterDartProject` is not specified, the `FlutterEngine` will attempt to locate the project in a default location (the flutter_assets folder in the iOS application bundle).

```cpp
- (instancetype)initWithPrecompiledDartBundle:(nullable NSBundle*)bundle {
  self = [super init];
  if (self) {
    _settings = FLTDefaultSettingsForBundle(bundle);
  }
  return self;
}

flutter::Settings FLTDefaultSettingsForBundle(NSBundle* bundle) {
  auto command_line = flutter::CommandLineFromNSProcessInfo();
  auto settings = flutter::SettingsFromCommandLine(command_line);

  NSBundle* engineBundle = [NSBundle bundleForClass:[FlutterViewController class]];
  if (settings.icu_data_path.size() == 0) {
    NSString* icuDataPath = [engineBundle pathForResource:@"icudtl" ofType:@"dat"]; // Flutter.framework/icudtl.dat
    settings.icu_data_path = icuDataPath.UTF8String;
  }

  if (flutter::DartVM::IsRunningPrecompiledCode()) {
    // In case the application bundle is still not specified, look for the App.framework in the
    // Frameworks directory.
    if (settings.application_library_path.size() == 0) {
      NSBundle* mainBundle = [NSBundle mainBundle];
      NSString* applicationFrameworkPath = [mainBundle pathForResource:@"Frameworks/App.framework"
                                                                ofType:@""];
      if (applicationFrameworkPath.length > 0) {
        NSString* executablePath =
            [NSBundle bundleWithPath:applicationFrameworkPath].executablePath;
        settings.application_library_path.push_back(executablePath.UTF8String);
      }
    }
  }

  // Checks to see if the flutter assets directory is already present.
  if (settings.assets_path.size() == 0) {
    NSString* assetsName = [FlutterDartProject flutterAssetsName:bundle]; // App.framework/flutter_assets
    NSString* assetsPath = [bundle pathForResource:assetsName ofType:@""];

    settings.assets_path = assetsPath.UTF8String;

    // Check if there is an application kernel snapshot in the assets directory we could
    // potentially use.  Looking for the snapshot makes sense only if we have a VM that can use
    // it.
    if (!flutter::DartVM::IsRunningPrecompiledCode()) {
      NSURL* applicationKernelSnapshotURL =
          [NSURL URLWithString:@(kApplicationKernelSnapshotFileName)
                  relativeToURL:[NSURL fileURLWithPath:assetsPath]]; // kernel_blob.bin
      settings.application_kernel_asset = applicationKernelSnapshotURL.path.UTF8String;
    }
  }

  // SkParagraph text layout library
  NSNumber* enableSkParagraph = [mainBundle objectForInfoDictionaryKey:@"FLTEnableSkParagraph"];
  settings.enable_skparagraph = (enableSkParagraph != nil) ? enableSkParagraph.boolValue : true;

  // Whether to enable Impeller.
  NSNumber* enableImpeller = [mainBundle objectForInfoDictionaryKey:@"FLTEnableImpeller"];
  if (enableImpeller != nil) {
    settings.enable_impeller = enableImpeller.boolValue;
  }

  // Leak Dart VM settings, set whether leave or clean up the VM after the last shell shuts down.
  NSNumber* leakDartVM = [mainBundle objectForInfoDictionaryKey:@"FLTLeakDartVM"];
  if (leakDartVM != nil) {
    settings.leak_vm = leakDartVM.boolValue;
  }

  // 老生代是指经过多次GC后仍然存活的Widget？减小老生代的堆大小，会有哪些影响？
  if (settings.old_gen_heap_size <= 0) {
    settings.old_gen_heap_size = std::round([NSProcessInfo processInfo].physicalMemory * .48 /
                                            flutter::kMegaByteSizeInBytes);
  }

  // a setting flag that defines the maximum number of bytes that can be used by the Resource Cache, which is a mechanism for caching frequently used resources such as images, text, and other graphic assets.
  settings.resource_cache_max_bytes_threshold = screenWidth * screenHeight * 12 * 4;

  return settings;
}
```

All shells in the process share the same VM. The last shell to shutdown should typically shut down the VM as well. However, applications depend on the behavior of "warming-up" the VM by creating a shell that does not do anything. This used to work earlier when the VM could not be shut down (and hence never was). Shutting down the VM now breaks such assumptions in existing embedders. To keep this behavior consistent and allow existing embedders the chance to migrate, this flag defaults to true.

`FLTLeakDartVM` 的默认值是 true 的原因是，在过去的实现中，虚拟机（VM）无法被关闭，因此它从未被关闭过。现有的 Flutter 应用可能依赖于这种行为，将 VM 保持在"预热"状态。如果突然更改这个行为，可能会破坏这些应用的设计和假设。因此，将其默认值设置为 true 可以让现有的 Flutter 应用继续运行，而不会因为突然更改行为而产生问题。然后，开发者们可以有时间迁移到新的实现，并在需要的时候手动关闭 VM，彻底释放资源。在新开发的应用中，开发者可以更精确地控制 VM 的关闭和资源释放。

## FlutterPlatformView

```cpp title='shell/platform/darwin/ios/framework/Headers/FlutterPlatformViews.h'
@protocol FlutterPlatformView <NSObject>
- (UIView*)view;
@end

@protocol FlutterPlatformViewFactory <NSObject>
- (NSObject<FlutterPlatformView>*)createWithFrame:(CGRect)frame
                                   viewIdentifier:(int64_t)viewId
                                        arguments:(id _Nullable)args;

- (NSObject<FlutterMessageCodec>*)createArgsCodec;
@end
```

某些情况下，开发者可能需要在 Flutter 应用中使用**原生视图**来实现特定的功能。`FlutterPlatformViewsController` 类就是为此而设计的，它能够组合并管理 Flutter 渲染层与原生视图的交互。

`FlutterPlatformViewsController` 的工作原理是通过一个 compositing layer 将原生视图嵌入到 Flutter 的场景中，然后利用 MethodChannel 进行通信，以便创建、更新和销毁嵌入的原生视图。`FlutterPlatformViewsController` 需要处理各种操作，如原生视图的触摸事件、渲染与合成以及视图层级关系的调整等。

## ThreadHost

```cpp title='flutter/fml/thread_host.cc'
ThreadHost::ThreadHost(const ThreadHostConfig& host_config)
    : name_prefix(host_config.name_prefix) {
  // 在这里，创建不同的线程
  if (host_config.isThreadNeeded(ThreadHost::Type::UI)) {
    ui_thread = CreateThread(Type::UI, host_config.ui_config, host_config);
  }
}

std::unique_ptr<fml::Thread> ThreadHost::CreateThread(
    Type type,
    std::optional<ThreadConfig> thread_config,
    const ThreadHostConfig& host_config) const {
  return std::make_unique<fml::Thread>(host_config.config_setter,
                                       thread_config.value());
}
```

```cpp title='flutter/fml/thread.cc'
Thread::Thread(const ThreadConfigSetter& setter, const ThreadConfig& config)
    : joined_(false) {
  fml::AutoResetWaitableEvent latch;
  fml::RefPtr<fml::TaskRunner> runner;

  // template<class Function, class... Args> explicit thread(Function&& f, Args&&... args);
  // 创建一个 std::thread 对象，新产生的线程会调用 fn 函数，该函数的参数由 args 给出
  thread_ = std::make_unique<std::thread>(
      [&latch, &runner, setter, config]() -> void {
        setter(config); // 设置线程优先级
        fml::MessageLoop::EnsureInitializedForCurrentThread();
        auto& loop = MessageLoop::GetCurrent();
        runner = loop.GetTaskRunner();
        latch.Signal();
        loop.Run();
      });
  latch.Wait();
  task_runner_ = runner; // thread 的 task_runner 实际上是：thread 的 MessageLoop 的 task_runner
}
```

```cpp title='flutter/fml/message_loop.cc'
void MessageLoop::EnsureInitializedForCurrentThread() {
  tls_message_loop.reset(new MessageLoop());
}

MessageLoop::MessageLoop()
    : loop_(MessageLoopImpl::Create()),
      task_runner_(fml::MakeRefCounted<fml::TaskRunner>(loop_)) {}

MessageLoop& MessageLoop::GetCurrent() {
  auto* loop = tls_message_loop.get();
  return *loop;
}

fml::RefPtr<fml::TaskRunner> MessageLoop::GetTaskRunner() const {
  return task_runner_;
}
```

## Shell

摘自 shell.h 的注释：

> Perhaps the single most important class in the Flutter engine repository. When embedders create a Flutter application, they are referring to the creation of an instance of a shell. Creation and destruction of the shell is synchronous and the embedder only holds a unique pointer to the shell. The shell does not create the threads its primary components run on. Instead, **it is the embedder's responsibility to create threads and give the shell task runners for those threads**.（嵌入者有责任创建线程，并为这些线程提供任务运行器）Due to deterministic destruction of the shell, the embedder can terminate all threads immediately after collecting the shell. The shell must be created and destroyed on the same thread, but, different shells (i.e. a separate instances of a Flutter application) may be run on different threads simultaneously. The task runners themselves do not have to be unique. **If all task runner references given to the shell during shell creation point to the same task runner, the Flutter application is effectively single threaded.**（如果 shell 的所有任务运行器引用都指向同一个任务运行器，则 Flutter 应用程序实际上是单线程的。）
>
> The shell is the central nervous system of the Flutter application. None of the shell components are thread safe and must be created, accessed and destroyed on the same thread. To interact with one another, the various components delegate to the shell for communication. Instead of using back pointers to the shell, a delegation pattern is used by all components that want to communicate with one another. Because of this, **the shell implements the delegate interface for all these components**.
>
> All shell methods accessed by the embedder may only be called on the platform task runner. In case the embedder wants to directly access a shell subcomponent, it is the embedder's responsibility to acquire a weak pointer to that component and **post a task to the task runner used by the component to access its methods**. The shell must also be destroyed on the platform task runner.
>
> There is no explicit API to bootstrap and shutdown the Dart VM. **The first instance of the shell in the process bootstraps the Dart VM and the destruction of the last shell instance destroys the same**. Since different shells may be created and destroyed on different threads. VM bootstrap may happen on one thread but its collection on another. This behavior is thread safe.

## FlutterViewController

```
// init
-[FlutterViewController initWithEngine:nibName:bundle:]
-[FlutterViewController performCommonViewControllerInitialization]
-[FlutterViewController setupNotificationCenterObservers]

// viewDidLoad
-[FlutterViewController viewDidLoad]
-[FlutterViewController addInternalPlugins]
-[FlutterEngine attachView]

// viewWillAppear
-[FlutterViewController viewWillAppear:]
-[FlutterViewController onUserSettingsChanged:]

// viewDidAppear
-[FlutterViewController viewDidAppear:]
-[FlutterViewController onUserSettingsChanged:]
-[FlutterViewController onAccessibilityStatusChanged:]

// viewDidLayoutSubviews
_viewportMetrics.device_pixel_ratio = scale;
_viewportMetrics.physical_width = viewBounds.size.width * scale;
_viewportMetrics.physical_height = viewBounds.size.height * scale;
-[FlutterEngine updateViewportMetrics:]
-[FlutterViewController surfaceUpdated:]
Shell::WaitForFirstFrame() // release模式100ms
```
