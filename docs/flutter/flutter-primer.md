---
slug: /
---

# Flutter Primer

## 安装

[macOS install](https://flutter.dev/docs/get-started/install/macos)

下载安装 Flutter，然后，将这个文件夹加到 $PATH 中：

```bash
export PATH="$HOME/Documents/flutter/bin:$PATH"
```

然后，运行 `flutter doctor`，flutter 会下载一系列相关的 SDK。

下载完成后，`~/.pub-cache/hosted/pub.dartlang.org` 文件夹下会多了很多 pub packages，我们开发的 flutter 工程所安装的 pub，都会在这个目录下缓存。

此外，如果有自定义的 pub package 源，也会出现在 `~/.pub-cache/hosted/` 下面，以域名命名的文件夹。

Flutter framework 位置：`flutter/bin/cache/artifacts/engine/ios/Flutter.xcframework/ios-arm64_armv7/Flutter.framework'`

## 新建项目

在命令行直接创建新项目，默认原生语言是 kotlin 和 swift，使用 objc 和 java 需要传参。

这里我们创建一个 flutter 项目，它主要实现的功能是获取原生端电池的电量，项目名称只能小写（有大写字母会报错）：

```bash
flutter create -i objc -a java battery_level
```

## Platform Channel

如何从 dart 代码调用到 native？[Writing custom platform-specific code](https://flutter.dev/docs/development/platform-integration/platform-channels)

第一步，dart 代码声明一个 channel：`static const platform = MethodChannel('samples.flutter.dev/battery');`

第二步，dart 调用 `await platform.invokeMethod('getBatteryLevel');`

```dart title='my_homepage.dart'
class _MyHomePageState extends State<MyHomePage> {
  String _batteryLevel = '';

  static const platform = MethodChannel('samples.flutter.dev/battery');

  Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await platform.invokeMethod('getBatteryLevel');
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }
    setState(() {
      _batteryLevel = batteryLevel;
    });
  }
}
```

第三步，原生实现

```objc title='MyFlutterViewController.m'
- (void)viewDidLoad {
    [super viewDidLoad];

    FlutterMethodChannel *batteryChannel = [FlutterMethodChannel methodChannelWithName:@"samples.flutter.dev/battery" binaryMessenger:self.binaryMessenger];
    __weak typeof(self) weakSelf = self;
    [batteryChannel setMethodCallHandler:^(FlutterMethodCall *call, FlutterResult result) {
        // Note: this method is invoked on the UI thread.
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (![strongSelf canHandleMethod:call.method]) {
            result(FlutterMethodNotImplemented); // 记得给flutter回调，不然await后面的不会执行了
            return;
        }
        int batteryLevel = [weakSelf getBatteryLevel];
        if (batteryLevel == -1) {
            result([FlutterError errorWithCode:@"UNAVAILABLE"
                                       message:@"Battery info unavailable"
                                       details:nil]);
        } else {
            result(@(batteryLevel));
        }
    }];
}
```

`binaryMessenger` 是 `FlutterViewController` 的属性，实际取的是引擎的 binary messenger：

```objc
/**
 * The `FlutterBinaryMessenger` associated with this FlutterViewController (used for communicating
 * with channels).
 *
 * This is just a convenient way to get the |FlutterEngine|'s binary messenger.
 */
@property(nonatomic, readonly) NSObject<FlutterBinaryMessenger>* binaryMessenger;
```

Messages are passed between the **client** and **host** using platform channels. The client sends messages to its host. The host listens on the platform channel, and receives the message.

Messages and responses are passed asynchronously, to ensure the user interface remains responsive.

When invoking channels on the platform side destined for Flutter, they need to be invoked on the platform’s main thread. When invoking channels in Flutter destined for the platform side, they need to be invoked on the root Isolate.

[Dart 数据类型对应平台的数据类型](https://docs.flutter.dev/development/platform-integration/platform-channels?tab=type-mappings-obj-c-tab#codec)

## Flutter Tools

我们在命令行使用的 `flutter` 指令，位于 `flutter/bin` 路径下。查看其源码，发现其执行的是 `flutter/bin/internal/shared.sh`，其中最关键的执行代码：

```bash
"$DART" --disable-dart-dev --packages="$FLUTTER_TOOLS_DIR/.packages" $FLUTTER_TOOL_ARGS "$SNAPSHOT_PATH" "$@"
```

`$DART` 是 `flutter/bin/cache/dart-sdk/bin/dart`；

`$SNAPSHOT_PATH` 是 `flutter/bin/cache/flutter_tools.snapshot`，这是 `flutter/packages/flutter_tools` 项目编译的产物。

将 `"$SNAPSHOT_PATH"` 改为 `"$FLUTTER_ROOT/packages/flutter_tools/bin/flutter_tools.dart"`，再运行 `flutter` 命令就会执行本地 flutter_tools 项目的代码。
