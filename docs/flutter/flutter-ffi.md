# Flutter FFI

<https://docs.flutter.dev/development/platform-integration/ios/c-interop>

FFI stands for **foreign function interface**. Other terms for similar functionality include _native interface_ and _language bindings_.

The FFI library can only bind against C symbols, so in C++ these symbols must be marked `extern C`.

如果使用静态库的方式，记得需要 `-force_load`

[ffigen | Dart Package](https://pub.dev/packages/ffigen)
