# Flutter Errors

## Failed to create platform view rendering surface

> [VERBOSE-2:platform_view.cc(85)] Failed to create platform view rendering surface

[Failed to create platform view rendering surface · Issue #70811 · flutter/flutter](https://github.com/flutter/flutter/issues/70811)

[iOS 15 simulator on macOS 12 beta 2 launches with blank screen, "Failed to create platform view rendering surface" · Issue #85749 · flutter/flutter](https://github.com/flutter/flutter/issues/85749)

[Failed to create platform view rendering surface · Issue #88168 · flutter/flutter](https://github.com/flutter/flutter/issues/88168)

以上三条信息最终指向的解决方式是 Xcode 的 bug，造成了误导。

> This is fixed as of Xcode 13 beta 5. Closing.

最终发现原因是，我改了 storyboard 里的视图控制器的 Custom Class（由 `FlutterViewController` 改成了 `MyFlutterViewController`），并且，`MyFlutterViewController` 的 `viewDidLoad` 方法里没有调用 `[super viewDidLoad]`，导致视图无法正确加载……

## Dart SDK is not configed

![img](/img/18F7ACAA-A85F-4EAC-99F0-DBCA4404C7F2.png)

删掉根目录下的 `.idea` 目录，重新按照官网教程做一遍就好了。

[Set up an editor | Flutter](https://docs.flutter.dev/get-started/editor)

注意 Dart SDK 要用这个路径呀：

![img](/img/08FDBA80-DDDD-4E35-9F7E-90A1CAD7D8E9.png)

## MissingPluginException

MissingPluginException(No implementation found for method getTemporaryDirectory on channel plugins.flutter.io/path_provider)

因为不是一个引擎。

通过创建 FlutterViewController 来展示 flutter 页面，会隐式创建一个新的引擎。等于在主引擎做的注册插件和通道，在新的引擎都没有。

## There are multiple observatory ports available.

![img](/img/CD0F1ED6-3DEC-497D-8A92-34EEEFD6F256.png)

## Failed to create datagram socket

Oops; flutter has exited unexpectedly: "SocketException: Failed to create datagram socket (OS Error: Address already in use, errno = 48), address = , port = 5353".

开启了远程桌面 NoMachine 服务导致的，关闭后问题解决。

## MediaQuery

![img](/img/28492006-234F-442D-9367-BB0EAC00F99E.png)

MediaQuery 获取屏幕宽度为 0 的原因。

## LFS

Encountered 30 files that should have been pointers, but weren't:

```
git lfs uninstall
git lfs install
```

## iOS 14 以上 Debug 包无法从桌面启动

[Launching debug Flutter without a host computer ios 14.5 not working · Issue #87034 · flutter/flutter](https://github.com/flutter/flutter/issues/87034)

[App crashes on launch on physical iOS 14 device in debug mode when debugger not attached, EXC_BAD_ACCESS (SIGKILL - CODESIGNING) · Issue #60657 · flutter/flutter](https://github.com/flutter/flutter/issues/60657#issuecomment-688478590)

## pub get failed

1. 在 `flutter pub get` 之前运行一下 `flutter doctor` 命令，让它去下载 flutter_tools 即可
2. 建议机器上面装了新版 flutter 后可以运行 `flutter doctor` 让它自动安装一些依赖，避免每次执行都安装

## PlatformView 点击事件透传

[webview response to gesture from the widget above it · Issue #58659 · flutter/flutter](https://github.com/flutter/flutter/issues/58659)

[IgnorePointer doesn't work properly when wrapped around a webview running JS (ex. google maps) · Issue #100020 · flutter/flutter](https://github.com/flutter/flutter/issues/100020)

[50431040/flutter_gromore: flutter 插件：穿山甲 Gromore 广告插件](https://github.com/50431040/flutter_gromore)

[Flutter 原生广告优化 -- 点击穿透](http://jackin.cn/2021/02/01/bytedance-ad-click-penetration-on-flutter.html)

## Skia 渲染 emoji 崩溃

[App crashes when rendering emoji text · Issue #107509 · flutter/flutter · GitHub](https://github.com/flutter/flutter/issues/107509)

[[Windows] Crash when rendering text with some special characters · Issue #109825 · flutter/flutter · GitHub](https://github.com/flutter/flutter/issues/109825)

## add-to-app 模式下改 dart 代码不生效

![img](/img/99B3A9C7-7E7A-4528-B269-631254851530.png)

## beta 版本设置高刷崩溃

![img](/img/43059C54-FD92-468D-98CA-ADF716280D61.png)

都是在 beta 版本：

![img](/img/25E53444-1BAD-4B89-AA60-BE332DE1C31B.png)

## Attaching to running flutter process doesn't highlight source paused on

[Attaching to running flutter process doesn't highlight source paused on](https://github.com/Dart-Code/Dart-Code/issues/3808)

![img](/img/21819F6C-2820-4592-A8C6-F76A2DB23C8F.png)

## xargs: dart: No such file or directory

代码自动格式化时遇到的错误。

![img](/img/C756BA75-2640-4D3E-ADD5-15169D4D4A8C.png)

最后发现是 git 工具没有把 .zshrc 里的路径读进来，导致 dart 命令找不到。

```zsh
if [[ ! $PATH =~ "flutter" ]]; then
    if [ -f "$HOME/.bashrc" ]; then
        echo '载入.bashrc'
        source $HOME/.bashrc
    fi
    if [ -f "$HOME/.zshrc" ]; then
        echo '载入.zshrc'
        source $HOME/.zshrc
    fi
fi
```

## IO thread's priority

[Thread priority changes make app more easily to be stuck in production · Issue #107351 · flutter/flutter · GitHub](https://github.com/flutter/flutter/issues/107351)

[Increase IO thread's priority on iOS to avoid stucks by Yeatse · Pull Request #34568 · flutter/engine · GitHub](https://github.com/flutter/engine/pull/34568/commits/3e876ca45220255ca8ae4b1437115c4406626bdc)

[setThreadPriority: | Apple Developer Documentation](https://developer.apple.com/documentation/foundation/nsthread/1407523-setthreadpriority)：0 为最低，1 为最高。

```cpp title='FlutterEngine.mm'
switch (config.priority) {
    case fml::Thread::ThreadPriority::BACKGROUND: {
      [[NSThread currentThread] setThreadPriority:0];
      break;
    }
    case fml::Thread::ThreadPriority::NORMAL: {
      [[NSThread currentThread] setThreadPriority:0.5];
      break;
    }
    case fml::Thread::ThreadPriority::RASTER:
    case fml::Thread::ThreadPriority::DISPLAY: {
      [[NSThread currentThread] setThreadPriority:1.0];
      break;
    }
}
```

## Unexpected top padding in ListView put inside scaffold with no appBar

[Unexpected top padding in ListView put inside scaffold with no appBar · Issue #14842 · flutter/flutter](https://github.com/flutter/flutter/issues/14842)

[ListView automatically adds SafeArea and there's no way to remove it · Issue #21236 · flutter/flutter](https://github.com/flutter/flutter/issues/21236)

源码解释：

```
/// By default, [ListView] will automatically pad the list's scrollable
/// extremities to avoid partial obstructions indicated by [MediaQuery]'s
/// padding. To avoid this behavior, override with a zero [padding] property.
///
```

## Android Studio 断点断不上

重启 Android Studio 好了，但是有些函数某些行还是会断点断不上。

## type 'int' is not a subtype of type 'double'

涉及到终端到 Flutter 数据传递时，不要随便改数据类型，这个值是 Android 终端传的，iOS 直接改了没验证，结果启动页面就 exception

![img](/img/C572AAAA-B297-47FF-B4BC-1C764D11551C.png)

## An error occurred while processing the post-install hook of the Podfile

Issue: [Error running pod install, undefined local variable or method 'continue' for #<Pod::Podfile:0x00000001095c1188 @defined_in_file=#<Pathname:/path/to/ios/Podfile> · Issue #104118 · flutter/flutter](https://github.com/flutter/flutter/issues/104118)

fix: [continue->next in Ruby script by jmagman · Pull Request #104296 · flutter/flutter](https://github.com/flutter/flutter/pull/104296)

## Incorrect use of ParentDataWidget

Under `ListView` don't use `Spacer` Widget.

`Expanded` cannot be used inside a `Stack`. You should use `Expanded` only within a `Column`, `Row` or `Flex`.

## Waiting for connection

重新 `make ios-debug DART_ONLY=1` 再 `make ios-attach` 就可以连上了。

## RenderConstrainedBox object was given an infinite size during layout.

有个需求，需要在 Column 中放个 Webview，用到 RenderUiKitView，根据错误信息描述，原因是在渲染控件时，WebView 是无限大的，在 Column 中是不允许这样的。我们只需要使用 Expanded 将其包裹即可。
