# Flutter News

## 3.29

从 3.29 开始，显示多个背景滤镜的应用现在可以使用新的 BackdropGroup 和新的 BackdropFilter.grouped 提高多个模糊的性能。

新的 ImageFilter 构造函数允许将自定义着色器应用于任何子 Widget。

3.29 开始，Android 和 iOS 上的 Flutter 将在应用的主线程上执行 Dart 代码，并且不再有单独的 Dart UI 线程。双方处于同一个线程下时，同步响应和调用可以更好处理一些平台事件处理、文本输入、插件调用和辅助功能等。

特别是在对于 PlatformView 混合渲染等场景，如果处于同一线程之上，那么一些场景下的 PlatformView 由于不同线程导致的闪烁或者同步问题或者也可以得到改善。

在整个 Flutter 团队的目标里，完全剔除 platform/message channels 是必然的方向。

3.29 移除了 Flutter Gradle 插件，这个在很久之前就提到了，该插件其实自 3.19 起已被弃用，后续将把 Flutter Gradle 插件从 Groovy 转换为 Kotlin，并将其迁移到使用 AGP 公共 API，这个改动有望降低发布新 AGP 版本时损坏的频率，并减少基于构建的回归。

## 3.27

Flutter 在高帧率设备上将更一致地达到 120Hz。

3.27 支持 DisplayP3 色彩空间中的颜色定义 UI，之前只支持 P3 图片效果。

## 3.10

[What’s new in Flutter 3.10. Seamless web and mobile integration… | by Kevin Chisholm | Flutter | May, 2023 | Medium](https://medium.com/flutter/whats-new-in-flutter-3-10-b21db2c38c73)

Material 3: Developers must “opt in” to these changes using the `useMaterial3` theme flag. In the next stable release, `useMaterial3` defaults to true.

All M3 components configure the default colors of the theme’s `ColorScheme`. You can create a custom color scheme either from a single “seed” color or from an image. 从一个种子颜色或者从一张图片，就能创建一套标准色版。

Flutter supports SLSA level 1

By default, all apps built for iOS with Flutter 3.10 use **Impeller**. Impeller on Android remains under active development but not ready for preview.

Eliminating Jank: You need to set the `FlutterViews` background color to a non-nil value.

In this release, we moved the opening and decoding of local images from the Dart thread to a background thread. This change eliminates potential long pauses on screens with a lot of local images, while avoiding delaying vsync events.

Reducing iOS startup latency: An inefficient strategy for identifier lookups in app bundles increased app startup latency. This startup latency grows in proportion to the app’s size. In this release, we fixed the bundle identifier lookup. This reduced startup latency by 100ms or about 30–50% in a large production application.

It adds the ability to decode **APNG** images.

iOS Wireless debugging.

Flutter apps on iOS can now support accurate rendering for wide gamut images. 广色域图片

## 3.7

[What’s new in Flutter 3.7. Material 3 updates, iOS improvements… | by Kevin Chisholm | Flutter | Medium](https://medium.com/flutter/whats-new-in-flutter-3-7-38cbea71133c)

Enhanced Material 3 support, Menu bars and cascading menus

Impeller preview: We expect to make Impeller the default renderer on iOS in a forthcoming stable release.

When you release an iOS app, a checklist of settings to update ensures that your app is ready for submission to the App Store. The flutter build ipa command now validates some of these settings.

DevTools updates.

Now Platform Channels can be invoked from any Isolate. Previously, users were only able to invoke Platform Channels from Flutter’s supplied main isolate.

This release introduces a few improvements to **memory management** that have the collective effect of reducing jank caused by garbage collection pauses, reducing CPU utilization due to allocation velocity and background GC threads, and reducing the memory footprint.

## 3.3

[What’s new in Flutter 3.3. Exciting updates for text handling… | by Kevin Chisholm | Flutter | Medium](https://medium.com/flutter/whats-new-in-flutter-3-3-893c7b9af1ff)

Flutter web apps `SelectableArea` widget.

Flutter 3.3 provides improved support for trackpad input.

Flutter now supports Scribble handwriting input using the Apple Pencil on iPadOS.

Rich text editor updates: [Flutter samples](https://flutter.github.io/samples/rich_text_editor.html)

Material Design 3

Windows desktop application versions can now be set from your projects pubspec.yaml file and build arguments.

The `go_router` package, maintained by the Flutter team, simplifies routing by providing a declarative, url-based API, making it easier to navigate and handle deep-links.

Visual Studio Code extension for Flutter has several updates.

Raster cache improvements increases the performance of **loading images from assets** by eliminating copies and reducing Dart garbage collection (GC) pressure. [Adding ImageProvider.loadBuffer | Flutter](https://docs.flutter.dev/release/breaking-changes/image-provider-load-buffer)

iOS pointer compression disabled.

In this release, instead of using a custom `Zone`, you should catch all errors and exceptions by setting the `PlatformDispatcher.onError` callback. For more information, check out the updated [Handling errors in Flutter | Flutter](https://docs.flutter.dev/testing/errors).

You should regard the Engine’s `FragmentProgram` API as accepting only the output of Flutter’s build tooling.

The 3.3 stable version of Flutter and all following stable releases no longer support 32-bit iOS devices and iOS versions 9 and 10.

Flutter will drop support for bitcode in a future stable release.
