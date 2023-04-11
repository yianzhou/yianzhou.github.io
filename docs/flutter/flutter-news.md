# Flutter News

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
