# FlutterEngine

## 代码解释

prompt:

- `` 在 Flutter iOS 中是做什么用的？请详细描述一下它的作用和技术细节。
- 以下是一段代码注释，请去掉其中的注释符号，不用加以解释，直接返回英语原文给我：``
- 以下是一段 Flutter 框架的源代码，请尝试解释其中每一行代码的意思，尽可能提供多一些技术细节：``

The **ICU** (International Components for Unicode) data files are a set of files that provide support for internationalization and localization in software applications. In the context of Flutter, the ICU data files are used to support features like formatting of dates, times, currencies, and pluralization rules in multiple languages. (`Flutter.framework/icudtl.dat`)

The **Dart Precompiled Runtime** is a binary file that includes the Dart Virtual Machine and a precompiled snapshot of a Dart application or library. It enables the distribution of Dart applications as standalone binaries that can be run on the target platform without the need for the Dart SDK to be installed.

In programming, a **blob** (short for **Binary Large OBject**) is a collection of binary data, typically stored in a database or file system. (`App.framework/kernel_blob.bin`)

## fml

`namespace fml`: In the Flutter framework, the "fml" namespace refers to the **Flutter Markup Language**. FML is a declarative language for building Flutter UIs that is similar to HTML and XML. It is used to define the structure and layout of UI elements in a Flutter app.

`fml::scoped_nsobject` 使得在 Objective-C 环境中可以方便地管理 `NSObject` 子类对象的内存，而不需要手动调用 `retain` 和 `release` 方法。

`fml::RefPtr`（引用计数指针）是一种类模板，用于实现对特定对象的引用计数。

## fml::WeakPtrFactory

在多线程环境下，一个线程可能正试图访问一个对象，而另一个线程可能在同一时间销毁此对象。在这种情况下，直接使用原始指针可能会导致未定义的行为和程序崩溃。为了解决这个问题，`WeakPtrFactory` 提供了一种方法来创建在对象销毁后自动无效化的弱指针。当对象被销毁时，使用这些弱指针的线程会注意到指针无效，并避免对该对象执行进一步的操作。

`WeakPtrFactory` 的使用方法如下：

1. 在堆上分配的类（如 `FlutterEngine`）中，添加一个 `WeakPtrFactory` 成员变量：

`std::unique_ptr<fml::WeakPtrFactory<FlutterEngine>> _weakFactory;`

2. 初始化：

`_weakFactory = std::make_unique<fml::WeakPtrFactory<FlutterEngine>>(self);`

3. 在其他线程使用弱指针：

```cpp
-[FlutterEngine getWeakPtr]

- (fml::WeakPtr<FlutterEngine>)getWeakPtr {
  return _weakFactory->GetWeakPtr();
}
```

4. 在析构函数中，在销毁或释放其他任何成员之前，释放 `_weakFactory` 从而使所有弱指针无效：

`_weakFactory.reset();`

## 启动流程

### 引擎初始化

`-[FlutterEngine initWithName:project:allowHeadlessExecution:restorationEnabled:]`

The FlutterEngine class coordinates a single instance of execution for a [`FlutterDartProject`](#flutterdartproject).（这里有一揽子项目配置）

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

### 引擎运行

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

  // 等Shell创建好之后，调用此函数以创建PlatformViewIOS
  flutter::Shell::CreateCallback<flutter::PlatformView> on_create_platform_view =
      [self](flutter::Shell& shell) {
        [self recreatePlatformViewController];
        return std::make_unique<flutter::PlatformViewIOS>(
            shell, self->_renderingApi, self->_platformViewsController, shell.GetTaskRunners());
      };

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

- (void)initializeDisplays {
  auto vsync_waiter = std::shared_ptr<flutter::VsyncWaiter>(_shell->GetVsyncWaiter().lock());
  auto vsync_waiter_ios = std::static_pointer_cast<flutter::VsyncWaiterIOS>(vsync_waiter);
  std::vector<std::unique_ptr<flutter::Display>> displays;
  displays.push_back(std::make_unique<flutter::VariableRefreshRateDisplay>(vsync_waiter_ios));
  _shell->OnDisplayUpdates(flutter::DisplayUpdateType::kStartup, std::move(displays));
}

- (void)launchEngine:(NSString*)entrypoint
          libraryURI:(NSString*)libraryOrNil
      entrypointArgs:(NSArray<NSString*>*)entrypointArgs {
  // Launch the Dart application with the inferred run configuration.
  self.shell.RunEngine([_dartProject.get() runConfigurationForEntrypoint:entrypoint
                                                            libraryOrNil:libraryOrNil
                                                          entrypointArgs:entrypointArgs]);
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

## 释放流程

```cpp title='flutter/shell/platform/darwin/ios/framework/Source/FlutterEngine.mm'
- (void)destroyContext {
  [self resetChannels];
  self.isolateId = nil;
  _shell.reset();
  _profiler.reset();
  _threadHost.reset();
  _platformViewsController.reset();
}
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

## ThreadHost, Thread, MessageLoop, TaskRunner

`ThreadHost`, `Thread`, `MessageLoop`, `TaskRunner` 这几个类关系非常紧密，因此放在一起讲。

ThreadHost 表示一组线程的集合，Thread 是具体的一个线程。

```cpp title='flutter/fml/thread_host.cc'
// ThreadHost构造时，根据传入的host_config，创建出不同的线程
ThreadHost::ThreadHost(const ThreadHostConfig& host_config)
    : name_prefix(host_config.name_prefix) {
  // 创建UI线程
  if (host_config.isThreadNeeded(ThreadHost::Type::UI)) {
    ui_thread = CreateThread(Type::UI, host_config.ui_config, host_config);
  }
  // 其它线程的创建省略，不一一列举
}

std::unique_ptr<fml::Thread> ThreadHost::CreateThread(
    Type type,
    std::optional<ThreadConfig> thread_config,
    const ThreadHostConfig& host_config) const {
  return std::make_unique<fml::Thread>(host_config.config_setter,
                                       thread_config.value());
}
```

`fml::Thread` 是对 `std::thread` 的封装。

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
```

```cpp title='flutter/fml/message_loop_impl.cc'
fml::RefPtr<MessageLoopImpl> MessageLoopImpl::Create() {
  return fml::MakeRefCounted<MessageLoopDarwin>();
}

// MessageLoopDarwin调用父类的构造函数
MessageLoopImpl::MessageLoopImpl()
    : task_queue_(MessageLoopTaskQueues::GetInstance()),
      queue_id_(task_queue_->CreateTaskQueue()),
      terminated_(false) {
  task_queue_->SetWakeable(queue_id_, this);
}
```

```cpp title='flutter/fml/platform/darwin/message_loop_darwin.mm'
MessageLoopDarwin::MessageLoopDarwin()
    : running_(false), loop_((CFRunLoopRef)CFRetain(CFRunLoopGetCurrent())) {

  // 初始化时，RunLoop并没有运行，这里设置一个用于唤醒消息循环的“延迟唤醒源”
  CFRunLoopTimerContext timer_context = {
      .info = this,
  };
  delayed_wake_timer_.Reset(
      CFRunLoopTimerCreate(kCFAllocatorDefault, kDistantFuture /* fire date */,
                           HUGE_VAL /* interval */, 0 /* flags */, 0 /* order */,
                           reinterpret_cast<CFRunLoopTimerCallBack>(&MessageLoopDarwin::OnTimerFire)
                           /* callout */,
                           &timer_context /* context */));

  CFRunLoopAddTimer(loop_, delayed_wake_timer_, kCFRunLoopCommonModes);
  // This mode will be used by FlutterKeyboardManager.
  CFRunLoopAddTimer(loop_, delayed_wake_timer_, kMessageLoopCFRunLoopMode);
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

```cpp title='flutter/shell/common/shell.cc'
std::unique_ptr<Shell> Shell::Create(
    const PlatformData& platform_data,
    TaskRunners task_runners,
    Settings settings,
    const Shell::CreateCallback<PlatformView>& on_create_platform_view,
    const Shell::CreateCallback<Rasterizer>& on_create_rasterizer,
    bool is_gpu_disabled) {
  // Always use the `vm_snapshot` and `isolate_snapshot` provided by the
  // settings to launch the VM.  If the VM is already running, the snapshot
  // arguments are ignored.
  auto vm_snapshot = DartSnapshot::VMSnapshotFromSettings(settings);
  auto isolate_snapshot = DartSnapshot::IsolateSnapshotFromSettings(settings);
  auto vm = DartVMRef::Create(settings, vm_snapshot, isolate_snapshot);
  FML_CHECK(vm) << "Must be able to initialize the VM.";

  // If the settings did not specify an `isolate_snapshot`, fall back to the
  // one the VM was launched with.
  if (!isolate_snapshot) {
    isolate_snapshot = vm->GetVMData()->GetIsolateSnapshot();
  }
  auto resource_cache_limit_calculator =
      std::make_shared<ResourceCacheLimitCalculator>(
          settings.resource_cache_max_bytes_threshold);
  return CreateWithSnapshot(std::move(platform_data),            //
                            std::move(task_runners),             //
                            /*parent_merger=*/nullptr,           //
                            /*parent_io_manager=*/nullptr,       //
                            resource_cache_limit_calculator,     //
                            std::move(settings),                 //
                            std::move(vm),                       //
                            std::move(isolate_snapshot),         //
                            std::move(on_create_platform_view),  //
                            std::move(on_create_rasterizer),     //
                            CreateEngine, is_gpu_disabled);
}

std::unique_ptr<Shell> Shell::CreateWithSnapshot() {
  shell = CreateShellOnPlatformThread();
}

std::unique_ptr<Shell> Shell::CreateShellOnPlatformThread() {
  auto shell = std::unique_ptr<Shell>(
      new Shell(std::move(vm), task_runners, parent_merger,
                resource_cache_limit_calculator, settings,
                std::make_shared<VolatilePathTracker>(
                    task_runners.GetUITaskRunner(),
                    !settings.skia_deterministic_rendering_on_cpu),
                is_gpu_disabled));

  // Create the platform view on the platform thread (this thread).
  // 先有shell才能创建platformView
  auto platform_view = on_create_platform_view(*shell.get());

  shell->Setup(std::move(platform_view),
                    engine_future.get(),
                    rasterizer_future.get(),
                    io_manager_future.get());
  return shell;
}

bool Shell::Setup(std::unique_ptr<PlatformView> platform_view,
                  std::unique_ptr<Engine> engine,
                  std::unique_ptr<Rasterizer> rasterizer,
                  std::shared_ptr<ShellIOManager> io_manager) {
  platform_view_ = std::move(platform_view);
  platform_message_handler_ = platform_view_->GetPlatformMessageHandler();
  route_messages_through_platform_thread_.store(true);
  task_runners_.GetPlatformTaskRunner()->PostTask(
      [self = weak_factory_.GetWeakPtr()] {
        if (self) {
          self->route_messages_through_platform_thread_.store(false);
        }
      });
  engine_ = std::move(engine);
  rasterizer_ = std::move(rasterizer);
  io_manager_ = io_manager;

  // Set the external view embedder for the rasterizer.
  auto view_embedder = platform_view_->CreateExternalViewEmbedder();
  rasterizer_->SetExternalViewEmbedder(view_embedder);
  rasterizer_->SetSnapshotSurfaceProducer(
      platform_view_->CreateSnapshotSurfaceProducer());

  // The weak ptr must be generated in the platform thread which owns the unique
  // ptr.
  weak_engine_ = engine_->GetWeakPtr();
  weak_rasterizer_ = rasterizer_->GetWeakPtr();
  weak_platform_view_ = platform_view_->GetWeakPtr();

  is_setup_ = true;
  return true;
}

const std::weak_ptr<VsyncWaiter> Shell::GetVsyncWaiter() const {
  return engine_->GetVsyncWaiter();
}

void Shell::RunEngine(
    RunConfiguration run_configuration,
    const std::function<void(Engine::RunStatus)>& result_callback) {
  auto result = [platform_runner = task_runners_.GetPlatformTaskRunner(),
                 result_callback](Engine::RunStatus run_result) {
    if (!result_callback) {
      return;
    }
    platform_runner->PostTask(
        [result_callback, run_result]() { result_callback(run_result); });
  };
  FML_DCHECK(is_setup_);
  FML_DCHECK(task_runners_.GetPlatformTaskRunner()->RunsTasksOnCurrentThread());

  fml::TaskRunner::RunNowOrPostTask(
      task_runners_.GetUITaskRunner(),
      fml::MakeCopyable(
          [run_configuration = std::move(run_configuration),
           weak_engine = weak_engine_, result]() mutable {
            if (!weak_engine) {
              FML_LOG(ERROR)
                  << "Could not launch engine with configuration - no engine.";
              result(Engine::RunStatus::Failure);
              return;
            }
            auto run_result = weak_engine->Run(std::move(run_configuration));
            if (run_result == flutter::Engine::RunStatus::Failure) {
              FML_LOG(ERROR) << "Could not launch engine with configuration.";
            }
            result(run_result);
          }));
}
```

## TaskRunner

```cpp title='flutter/fml/task_runner.cc'
void TaskRunner::RunNowOrPostTask(fml::RefPtr<fml::TaskRunner> runner,
                                  const fml::closure& task) {
  FML_DCHECK(runner);
  if (runner->RunsTasksOnCurrentThread()) {
    task();
  } else {
    runner->PostTask(std::move(task));
  }
}
```

## DartSnapshot

A read-only Dart heap snapshot, or, read-executable mapping of AOT compiled Dart code. To make Dart code startup more performant, the Flutter tools on the host snapshot the state of the Dart heap at specific points and package the same with the Flutter application. When the Dart VM on the target is configured to run AOT compiled Dart code, the tools also compile the developer's Flutter application code to target specific machine code (instructions). This class deals with the mapping of both these buffers at runtime on the target.

A Flutter application typically needs two instances of this class at runtime to run Dart code. One instance is for the VM and is called the "core snapshot". The other is the isolate and called the "isolate snapshot". Different root isolates can be launched with different isolate snapshots.

These snapshots are typically memory-mapped at runtime, or, referenced directly as symbols present in Mach or ELF binaries.

In the case of the core snapshot, the snapshot is collected when the VM shuts down. The isolate snapshot is collected when the isolate group shuts down.
