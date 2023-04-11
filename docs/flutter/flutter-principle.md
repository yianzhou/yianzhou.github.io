# Flutter Principle

## Flutter vs React Native 性能对比

Flutter (written in Dart) -> Skia (written in C/C++) -> OpenGL/Metal -> GPU -> Frame Buffer

Flutter 利用 Skia 绘图引擎，直接通过 CPU、GPU 进行绘制，不需要依赖任何原生的控件。Skia 引擎会将 Dart 视图结构数据加工成 GPU 数据，交由 OpenGL 最终提供给 GPU 渲染。

React Native(JSX) -> JavaScript (JS Bundle) -> JavaScriptCore -> Bridge -> iOS (OC/Swift) -> CoreAnimation -> OpenGL/Metal -> GPU -> Frame Buffer

通过 JavaScript 虚拟机扩展调用系统组件，由 Android 和 iOS 进行组件的渲染。

Flutter 是重写了一整套包括底层渲染逻辑和上层开发语言的完整解决方案。Dart 是少数同时支持 JIT（Just In Time，即时编译）和 AOT（Ahead of Time，运行前编译）的语言。可以保证视图渲染在 Android 和 iOS 上的高度一致性；在代码执行效率和渲染性能上也可以媲美原生 App。

在开发期使用 JIT，支持有状态的热重载，开发效率极高；而发布期使用 AOT，代码执行更高效，代码性能和用户体验也更卓越。

Flutter apps run in a VM that offers stateful hot reload of changes without needing a full recompile. For release, Flutter apps are compiled directly to machine code (Intel x64 or ARM instructions).

Dart 避免了抢占式调度和共享内存，可以在没有锁的情况下进行对象分配和垃圾回收，在性能方面表现相当不错。

## Declarative UI

Frameworks from Win32 to web to Android and iOS typically use an imperative 命令式 style of UI programming. You manually construct a full-functioned UI entity, such as a UIView or equivalent, and later mutate it using methods and setters when the UI changes. （控制器持有 UIView 的实例，并调用实例方法）

In order to lighten the burden on developers from having to program how to **transition between various UI states**, Flutter, by contrast, lets the developer describe the current UI state and leaves the transitioning to the framework.

Here, rather than mutating an UIView instance when the UI changes, Flutter constructs new Widget instances. The framework manages many of the responsibilities of a traditional UI object (such as maintaining the state of the layout) behind the scenes with `RenderObjects`. RenderObjects persist between frames and Flutter’s lightweight Widgets tell the framework to mutate the RenderObjects between states. The Flutter framework handles the rest.

## Flutter architectural overview

> [Flutter architectural overview](https://flutter.dev/docs/resources/architectural-overview)。

![img-60](/assets/images/9B096B50-89DA-4F44-883D-29C43FB985B7.png)

Most developers will interact with Flutter via the Flutter Framework. The [Flutter Engine](https://github.com/flutter/engine) is a portable runtime for hosting Flutter applications. It implements Flutter's core libraries, including animation and graphics, file and network I/O, accessibility support, plugin architecture, and a Dart runtime and compile toolchain.

## 异步

> [Flutter 教程 Async-1 事件循环 Event Loop 机制\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV12K4y1Z7Zg/?spm_id_from=333.788)

JavaScript 只有一个线程；Dart 里面，每个线程都被封装在一个 `Isolate` 里面。

`Future` 就相当于 JavaScript 里面的 `Promise`。

Event Loop 可以防止主线程被阻塞，保持主线程的响应。`Future` 调用会把闭包放进 Event Queue 里面；Dart 还保留了更优先的 Microtask Queue，一般不要使用。

由于 Dart 的单线程模型，如果你真的有很大的计算量要运行，就算你派发到 Event Queue 里面，最终还是要占用主线程来计算，可能导致阻塞，此时你就需要创建 `Isolate`，用多线程来解决问题。

## 三棵树

Widget 树：开发者写的 dart 代码，对图形化界面的描述/蓝图。

Element 树：Element 与 Widget 一一对应，Flutter 引擎维护管理，并在 `setState` 时对比、刷新。

Render 树：已布局完毕，所有元素的位置、宽高，图片、纹理等信息都已确定，可以交给 Skia 引擎绘图的树。

When your app creates and displays a scene, the UI thread creates a **layer tree**, a lightweight object containing device-agnostic painting commands, and sends the layer tree to the raster thread to be rendered on the device.

`PlatformView` 到了 iOS 平台上是个 `UIView`，如果 Widget 树里有 `PlatformView`，那么它会以 `UIView` 的 `subview` 形式存在。

## 四个线程

- UI thread: All of your Dart code runs on the UI thread. The UI thread executes Dart code in the Dart VM.
- Platform thread: The platform’s main thread. Plugin code runs here.
- Raster thread: Skia, the graphics library, runs on this thread. 接受 UI thread 创建的 layer tree，输出光栅化图像，然后将光栅化的数据交给 GPU 绘制。
- I/O thread: Performs expensive tasks (mostly I/O) that would otherwise block either the UI or raster threads.

## 120 Hz

[Flutter 120hz 高刷新率在 Android 和 iOS 上的调研总结 - 掘金](https://juejin.cn/post/7081273509690736653)

[Support Variable Refresh Rate Displays (PUBLICLY SHARED) - Google Docs](https://docs.google.com/document/d/1O-ot6MydAl5pAr_XGnpR-Qq5A5CPDF6edaPu8xQtgCQ/edit?resourcekey=0-LlXeGtGRC67XL4NrGoc91A)
