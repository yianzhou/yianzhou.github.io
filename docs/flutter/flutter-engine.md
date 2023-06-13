# Flutter Engine

## 代码解释

`namespace fml`: In the Flutter framework, the "fml" namespace refers to the **Flutter Markup Language**. FML is a declarative language for building Flutter UIs that is similar to HTML and XML. It is used to define the structure and layout of UI elements in a Flutter app.

什么是 `scoped_nsobject<>`？为什么在 `FlutterViewController.mm` 里面不直接用 `FlutterView *_flutterView` 而要用 `fml::scoped_nsobject<FlutterView> _flutterView;`？

`scoped_nsobject<>` 的设计模仿了 `scoped_ptr<>`，并保持了类似的接口，以便于开发者使用。这使得在 Objective-C 环境中，使用 `scoped_nsobject<>` 可以方便地管理 `NSObject` 子类对象的内存，而不需要手动调用 `retain` 和 `release` 方法。

## 启动流程

```mermard

```

## 引擎初始化

上层调用：`[[FlutterEngine alloc] +[CocoaHotReload run]:name project:nil allowHeadlessExecution:NO];`

```cpp title='FlutterEngine.mm'
- (instancetype)initWithName:(NSString*)labelPrefix
                     project:(FlutterDartProject*)project
      allowHeadlessExecution:(BOOL)allowHeadlessExecution
          restorationEnabled:(BOOL)restorationEnabled {
  _binaryMessenger = [[FlutterBinaryMessengerRelay alloc] initWithParent:self]; // self即FlutterEngine
}
```

`FlutterBinaryMessengerRelay` 是什么？`FlutterBinaryMessengerRelay : NSObject <FlutterBinaryMessenger>`

`FlutterBinaryMessenger` 协议是供 native 和 flutter 通信使用的，其实现有三种：`FlutterBasicMessageChannel`, `FlutterMethodChannel`, `FlutterEventChannel`

## 引擎运行

上层调用 `+[FlutterEngine run]`

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
    [self setupShell:std::move(shell)
        withObservatoryPublication:settings.enable_observatory_publication];
}
```
