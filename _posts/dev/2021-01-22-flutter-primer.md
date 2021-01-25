---
title: "Flutter Primer"
categories: [Development]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# 安装

[macOS install](https://flutter.dev/docs/get-started/install/macos)

下载 flutter_macos_1.22.5-stable.zip 至本地文件夹，解压后得到 flutter 文件夹，这是 flutter SDK 的所在地。

然后，将这个文件夹加到 $PATH 中：``export PATH="$PATH:`pwd`/flutter/bin"``

然后，运行 `flutter doctor`，flutter 会下载一系列相关的 SDK：

```log
Downloading Dart SDK from Flutter engine ae90085a8437c0ae94d6b5ad2741739ebc742cb4...
Building flutter tool...
Downloading Material fonts...                                       8.7s
Downloading Gradle Wrapper...                                       1.2s
Downloading package sky_engine...                                   4.5s
Downloading flutter_patched_sdk tools...                           14.4s
Downloading flutter_patched_sdk_product tools...                   15.3s
Downloading darwin-x64 tools...                                    61.5s
Downloading libimobiledevice...                                     0.4s
Downloading usbmuxd...                                              0.4s
Downloading libplist...                                             0.2s
Downloading openssl...                                              4.0s
Downloading ios-deploy...                                           0.4s
Downloading darwin-x64/font-subset tools...                         3.4s
Downloading android-arm-profile/darwin-x64 tools...                 4.2s
Downloading android-arm-release/darwin-x64 tools...                 3.8s
Downloading android-arm64-profile/darwin-x64 tools...               4.3s
Downloading android-arm64-release/darwin-x64 tools...               3.8s
Downloading android-x64-profile/darwin-x64 tools...                 4.1s
Downloading android-x64-release/darwin-x64 tools...                 3.6s
```

下载完成后，`flutter/.pub-cache/hosted/pub.dartlang.org` 文件夹下会多了很多 pub packages，我们开发的 flutter 工程所安装的 pub，都会在这个目录下缓存。

同时，新增了 `flutter/bin/cache`，TODO: 这些缓存的作用。

这个 flutter 文件夹也是一个 git 目录，里面还提供了一些 examples。

# 新建项目

在命令行直接创建新项目，默认原生语言是 kotlin 和 swift，使用 objc 和 java 需要传参：

```sh
flutter create -i objc -a java batterylevel
```

# Platform Channel

[Writing custom platform-specific code](https://flutter.dev/docs/development/platform-integration/platform-channels)

第一步，dart 代码声明一个 channel `static const platform = const MethodChannel('samples.flutter.dev/battery');`

第二步，dart 调用 `int result = await platform.invokeMethod('getBatteryLevel');`

第三步，原生实现

```swift
let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
let batteryChannel = FlutterMethodChannel(name: "samples.flutter.dev/battery",
                                            binaryMessenger: controller.binaryMessenger)
batteryChannel.setMethodCallHandler({
    (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
    // Note: this method is invoked on the UI thread.
    // Handle battery messages.
    if call.method == "getBatteryLevel" {
        result(100)
    }
})
```

# Dart packages, Plugin packages

[Developing packages & plugins](https://flutter.dev/docs/development/packages-and-plugins/developing-packages)

packages 可以是纯 dart 代码，也可以包含对原生的调用，调用了原生的话 flutter 称之为 plugin。

新建 dart packages：`flutter create --template=package welcome`

新建 plugin packages：`flutter create --org com.yianzhou --template=plugin --platforms=android,ios -i objc welcome`

以下以开发 plugin packages 为例讲解。

新建好 plugin packages 后，里面有 examples/ 文件夹，首先要做的是在 Xcode 中把 example 跑起来。

跑起来之后注意 `AppDelegate.m`，当我们新建一个 flutter 工程时，会自动生成以下的代码：

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [GeneratedPluginRegistrant registerWithRegistry:self];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```

`GeneratedPluginRegistrant.h+m` 是 flutter 生成的文件，所有的 plugin 会在这个自动生成的类里注册，不用我们操心。

```objc
+ (void)registerWithRegistry:(NSObject<FlutterPluginRegistry>*)registry {
  [WelcomePlugin registerWithRegistrar:[registry registrarForPlugin:@"WelcomePlugin"]];
}
```

之后，开发 plugin 的过程就是使用 platform channel 调用原生代码了。

开发好 packages 后，发布到私有 Pub 仓库，通过 pubspec.yaml 被业务代码依赖和集成。

## 安装位置

以 [local_auth](https://pub.dev/packages/local_auth) 为例，在 pubspec.yaml 添加依赖后，运行 `flutter pub get` 安装，然后打开 ios 原生工程执行 `pod install`，local_auth 的原生代码部分是通过 Development Pods 的方式集成到工程里，并通过 symlinks 的方式，软链接到以下位置：

`flutter/.pub-cache/hosted/pub.dartlang.org/local_auth-0.6.3+4/ios`

# Add-to-app

[官方 Add-to-App Samples](https://github.com/flutter/samples/tree/master/add_to_app)

## 工程集成设置

[将 flutter 集成到现有的原生工程](https://flutter.dev/docs/development/add-to-app/ios/project-setup)，可以将 flutter 理解为一个单独的模块，通过 pod 库的方式引入主工程。

注意以下的限制：

- 只能有一个 flutter 实例，只能全屏；多个实例或者非全屏会有无法预料的后果。
- 暂时无法在后台使用 flutter 实例。
- 只能将一个 flutter library 集成到工程里。

在原生工程的**父级目录**下运行命令：`flutter create -i objc --template module my_flutter`，形成原生 iOS、原生 Android、Flutter module 同级的目录结构：

```
.
├── HelloWorld-iOS
│   ├── HelloWorld
│   ├── HelloWorld.xcodeproj
│   ├── HelloWorld.xcworkspace
│   ├── Podfile
│   ├── Podfile.lock
│   └── Pods
└── HelloWorld-Android
└── my_flutter
    ├── .android
    ├── .dart_tool
    ├── .gitignore
    ├── .idea
    ├── .ios
    ├── .metadata
    ├── .packages
    ├── README.md
    ├── lib
    ├── my_flutter.iml
    ├── my_flutter_android.iml
    ├── pubspec.lock
    ├── pubspec.yaml
    └── test
```

创建好后，my_flutter/ 这个文件夹和一般的 flutter 工程目录无异。特别地，.ios/ 这个文件夹是自动生成地，不要修改里面的东西，也不要把它加到版本控制里。

首先，在原生工程的 Podfile 中添加：

```rb
flutter_application_path = '../my_flutter'
load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')

target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end
```

在 Ruby 中 `File.join` 就是把入参的几个字符串用 "/" 拼成文件路径；`load` 就是执行这个文件路径的代码。

所以这里的意思就是载入 "my_flutter/.ios/Flutter/podhelper.rb" 这个文件。`install_all_flutter_pods` 是 `podhelper.rb` 这个文件里定义的函数。

The podhelper.rb script embeds your plugins, Flutter.framework, and App.framework into your project. Flutter.framework is the bundle for the Flutter engine, and App.framework is the compiled Dart code for this project.

通过 Development Pods 的方式引入，具体路径在

- my_flutter/.ios/Flutter/engine/Flutter.framework
- my_flutter/.ios/Flutter/App.framework
- my_flutter/.ios/Flutter/FlutterPluginRegistrant

![img-40](/assets/images/BA99168E-EA53-43E1-8DE4-028104DBE9B6.png)

现在，执行 `pod install`。然后，打开 `MyApp.xcworkspace`，现在应该可以 build 了。

## Flutter screen

The FlutterEngine serves as a host to the Dart VM and your Flutter runtime, and the FlutterViewController attaches to a FlutterEngine to pass UIKit input events into Flutter and to display frames rendered by the FlutterEngine.

通常推荐在 AppDelegate 启动并“预热”引擎，以便在 FlutterViewController 显示的时候第一帧能更快地出现。

```objc
self.flutterEngine = [[FlutterEngine alloc] initWithName:@"my flutter engine"];
[self.flutterEngine run];
// [self.flutterEngine runWithEntrypoint:nil];
```

在需要的时候，初始化 FlutterViewController 并展示：

```objc
FlutterViewController *flutterViewController = [[FlutterViewController alloc] initWithEngine:flutterEngine nibName:nil bundle:nil];
[self presentViewController:flutterViewController animated:YES completion:nil];
```

推荐 AppDelegate 继承 `FlutterAppDelegate`，但这不是必须的。如果不方便继承的话，可以遵守 `FlutterAppLifeCycleProvider` 协议，主要的目的是让 flutter plugins 能够收到必要的回调，包括 `touchesBegan:`、`didReceiveRemoteNotification:`、`openURL:`、`handleOpenURL:`、`performActionForShortcutItem:`、`handleEventsForBackgroundURLSession:`、`performFetchWithCompletionHandler:` 等。

## 路由

`flutterEngine.run()` Calling `run` on a FlutterEngine, by default, runs the `main()` Dart function of your lib/main.dart file.

`flutterEngine.run(withEntrypoint: "myOtherEntrypoint")` You can also run a different entrypoint function by using `runWithEntrypoint` with an NSString specifying a different Dart function.

`flutterEngine.run(withEntrypoint: FlutterDefaultDartEntrypoint, initialRoute: "/onboarding")` This code sets your dart:ui’s window.defaultRouteName to "/onboarding" instead of "/".

In order to imperatively change your current Flutter route from the platform side after the FlutterEngine is already running, use `pushRoute()` or `popRoute()` on the FlutterViewController.

To pop the iOS route from the Flutter side, call `SystemNavigator.pop()`.

# Flutter Tools

The command line developer tools for building Flutter applications.

我们在命令行使用的 `flutter` 指令，位于 `flutter/bin` 路径下。查看其源码，发现其执行的是 `flutter/bin/internal/shared.sh`，其中最关键的执行代码：

```sh
"$DART" --disable-dart-dev --packages="$FLUTTER_TOOLS_DIR/.packages" $FLUTTER_TOOL_ARGS "$SNAPSHOT_PATH" "$@"
```

`$DART` 是 `flutter/bin/cache/dart-sdk/bin/dart`；

`$SNAPSHOT_PATH` 是 `flutter/bin/cache/flutter_tools.snapshot`，这是 `flutter/packages/flutter_tools` 项目编译的产物。

将 `"$SNAPSHOT_PATH"` 改为 `"$FLUTTER_ROOT/packages/flutter_tools/bin/flutter_tools.dart"`，再运行 `flutter` 命令就会执行本地 flutter_tools 项目的代码，可用于调试分析。

# Flutter Engine

![img-60](/assets/images/9B096B50-89DA-4F44-883D-29C43FB985B7.png)

这是 Flutter 项目的架构，参考 [Flutter architectural overview](https://flutter.dev/docs/resources/architectural-overview)。

Most developers will interact with Flutter via the Flutter Framework. The [Flutter Engine](https://github.com/flutter/engine) is a portable runtime for hosting Flutter applications. It implements Flutter's core libraries, including animation and graphics, file and network I/O, accessibility support, plugin architecture, and a Dart runtime and compile toolchain.
