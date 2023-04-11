# Flutter Source

## 编译

[Setting up the Engine development environment · flutter/flutter Wiki](https://github.com/flutter/flutter/wiki/Setting-up-the-Engine-development-environment)

```bash
mkdir flutter_source

cd flutter_source

# https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# Add depot_tools to the front of your PATH
export PATH=`pwd`/depot_tools:$PATH

touch .gclient
```

官方让自己 fork 一个仓库，但如果不往官方提交代码的话，可以先用着官方仓库：

```json title='flutter_source/.gclient'
solutions = [
  {
    "managed": False,
    "name": "src/flutter",
    "url": "git@github.com:flutter/engine.git",
    "custom_deps": {},
    "deps_file": "DEPS",
    "safesync_url": "",
  },
]
```

```bash
# 第一次运行这个，会非常非常久，别着急
# 这一步会克隆 flutter/engine 仓库
gclient sync

# 自己手动克隆 flutter 仓库
git clone https://github.com/flutter/flutter.git
```

至此，形成这样的目录结构：

```
➜  flutter_source tree -L 1 .
.
├── depot_tools
├── flutter
└── src
```

确保 `flutter` 目录下的代码是最新的，如果切到其它分支，即使是 stable 分支，也不能保证可以编译成功的。

确保 `src/flutter` 目录下的代码是 `flutter/bin/internal/engine.version` 的版本，两者对齐。

每次切换版本后，再执行一遍 `gclient sync -D` 同步一下。

[Compiling the engine · flutter/flutter Wiki](https://github.com/flutter/flutter/wiki/Compiling-the-engine)

```bash
cd src

# 生产 out/host_debug_unopt
./flutter/tools/gn --unoptimized --mac-cpu=arm64

# 生产 out/ios_debug_unopt
./flutter/tools/gn --unoptimized --ios --mac-cpu=arm64

# 编译源码（Intel）
ninja -C out/ios_debug_unopt && ninja -C out/host_debug_unopt
# 编译源码（M1）
ninja -C out/ios_debug_unopt_arm64 && ninja -C out/host_debug_unopt_arm64
```

## 源码调试

[The flutter tool · flutter/flutter Wiki](https://github.com/flutter/flutter/wiki/The-flutter-tool)

[Debugging the engine · flutter/flutter Wiki · GitHub](https://github.com/flutter/flutter/wiki/Debugging-the-engine)

```bash
# 新建项目
./flutter/bin/flutter create my_app --local-engine-src-path src --local-engine=ios_debug_unopt_arm64

# 运行项目
cd my_app
../flutter/bin/flutter run --local-engine-src-path ../src --local-engine=ios_debug_unopt_arm64
```

在 Android Studio 中运行 my_app，即可调试 framework 源码。

`open flutter_soure/my_app/ios/Runner.xcworkspace` 打开 Xcode 工程，将 `flutter_source/src/out/ios_debug_unopt/flutter_engine.xcodeproj` 拖到 Runner 项目中，运行，即可断点调试 embedder 源码。

You can also set the environment variable `$FLUTTER_ENGINE` instead of specifying `--local-engine-src-path`.

## 错误解决

```
➜  flutter_source gclient sync -D
Syncing projects: 100% (123/123), done.

WARNING: 'src/third_party/vulkan-deps' is no longer part of this client.
Despite running 'gclient sync -D' no action was taken as there are modifications.
It is recommended you revert all changes or run 'gclient sync -D --force' next time.
Error: Command 'git -c core.quotePath=false diff --name-status 210a80013067672b52847ec7aa70ff78b2f4d77e' returned non-zero exit status 128 in /Users/yianzhou/Documents/flutter_source/src/third_party/vulkan-deps/spirv-cross/src
fatal: bad object 210a80013067672b52847ec7aa70ff78b2f4d77e
```

将 `src/third_party/vulkan-deps` 文件夹删掉就好了。

编译命令：`./flutter/tools/gn --ios --runtime-mode=release --mac-cpu=arm64 && ninja -C out/ios_release_arm64`

```
➜  src git:(886fd09) ninja -C out/ios_release_arm64
ninja: Entering directory `out/ios_release_arm64'
[3726/4848] ACTION //flutter/lib/snapshot:create_arm_gen_snapshot(//build/toolchain/mac:ios_clang_arm)
FAILED: clang_x64/gen_snapshot_arm64
python3 ../../flutter/sky/tools/create_macos_gen_snapshots.py --dst /Users/yianzhou/Documents/flutter_source/src/out/ios_release_arm64/clang_x64 --arm64-out-dir /Users/yianzhou/Documents/flutter_source/src/out/ios_release_arm64
Cannot find gen_snapshot at /Users/yianzhou/Documents/flutter_source/src/out/ios_release_arm64/clang_x64/gen_snapshot
[3737/4848] ACTION //flutter/lib/snapshot:strong_platform(//build/toolchain/mac:ios_clang_arm)
ninja: build stopped: subcommand failed.
```

[Cannot build iOS engine on arm64 Mac, create_macos_gen_snapshots.py fails with Cannot find gen_snapshot at src/out/ios_debug_unopt/clang_x64/gen_snapshot · Issue #105651 · flutter/flutter](https://github.com/flutter/flutter/issues/105651)

[Engine builds for Android on Mac always look for gen_snapshot in the default clang_x64 directory · Issue #108238 · flutter/flutter](https://github.com/flutter/flutter/issues/108238)

[use host_cpu in BUILD.gn to determine where to find gen_snapshot by flar · Pull Request #34870 · flutter/engine](https://github.com/flutter/engine/pull/34870)

```
/Users/yianzhou/Documents/flutter_source/depot_tools/vpython3: line 45: /Users/yianzhou/Documents/flutter_source/depot_tools/.cipd_bin/vpython3: No such file or directory
/Users/yianzhou/Documents/flutter_source/depot_tools/vpython3: line 45: exec: /Users/yianzhou/Documents/flutter_source/depot_tools/.cipd_bin/vpython3: cannot execute: No such file or directory
```

这个问题，我把 flutter_source 目录执行 `git pull`，多试了几次，就好了。

```
Undefined symbols for architecture arm64:
  "GrGLMakeNativeInterface()", referenced from:
      flutter::CreateGLInterface(std::__1::function<void* (char const*)>) in gpu_surface_gl.gpu_surface_gl_delegate.o
  "GrGLMakeAssembledGLInterface(void*, void (* (*)(void*, char const*))())", referenced from:
      flutter::CreateGLInterface(std::__1::function<void* (char const*)>) in gpu_surface_gl.gpu_surface_gl_delegate.o
  "GrGLMakeAssembledGLESInterface(void*, void (* (*)(void*, char const*))())", referenced from:
      flutter::CreateGLInterface(std::__1::function<void* (char const*)>) in gpu_surface_gl.gpu_surface_gl_delegate.o
  "GrGLTextureParameters::invalidate()", referenced from:
      GrBackendTexture::glTextureParametersModified() in gpu.GrBackendSurface.o
  "GrGLTextureParameters::NonsamplerState::NonsamplerState()", referenced from:
      GrGLTextureParameters::GrGLTextureParameters() in gpu.GrBackendSurface.o
  "GrGLTextureParameters::SamplerOverriddenState::SamplerOverriddenState()", referenced from:
      GrGLTextureParameters::GrGLTextureParameters() in gpu.GrBackendSurface.o
  "GrGLBackendTextureInfo::assign(GrGLBackendTextureInfo const&, bool)", referenced from:
      GrBackendTexture::operator=(GrBackendTexture const&) in gpu.GrBackendSurface.o
  "GrGLBackendTextureInfo::cleanup()", referenced from:
      GrBackendTexture::cleanup() in gpu.GrBackendSurface.o
  "GrGLGpu::Make(sk_sp<GrGLInterface const>, GrContextOptions const&, GrDirectContext*)", referenced from:
      GrDirectContext::MakeGL(sk_sp<GrGLInterface const>, GrContextOptions const&) in gpu.GrDirectContext.o
ld: symbol(s) not found for architecture arm64
clang-14: error: linker command failed with exit code 1 (use -v to see invocation)
```

这个问题其实是因为我的编译指令没有指定到 arm64 架构。注意 Intel 和 M1 芯片要用不同的命令。

```
../../third_party/dart/runtime/vm/simulator.h:12:2: error: Simulator not implemented.
#error Simulator not implemented.
 ^
1 error generated.
```

[The flutter engine build host_debug failed on AppleSilicon with or without `--no-prebuilt-dart-sdk` · Issue #96716 · flutter/flutter · GitHub](https://github.com/flutter/flutter/issues/96716)

[Setup Flutter engine environment and build engine on M1 (Apple Silicon ARM64) · Issue #96745 · flutter/flutter · GitHub](https://github.com/flutter/flutter/issues/96745)

M1 电脑没法使用 `--local-engine`：[arm64 engine builds not compatible with --local-engine tool option · Issue #112679 · flutter/flutter · GitHub](https://github.com/flutter/flutter/issues/112679)

这个问题最后我通过把 `flutter_source/src/out/host_debug_unopt_arm64` 目录直接重命名为 `host_debug_unopt` 解决。

```
Generating GN files in: out/ios_debug_unopt_arm64
ERROR at //flutter/shell/gpu/BUILD.gn:62:37: Can't load input file.
  public_deps = gpu_common_deps + [ "//flutter/impeller" ]
                                    ^-------------------
Unable to load:
  /Users/yianzhou/Documents/flutter_source/src/flutter/impeller/BUILD.gn
I also checked in the secondary tree for:
  /Users/yianzhou/Documents/flutter_source/src/build/secondary/flutter/impeller/BUILD.gn
```

这个问题的原因是 `flutter_source/src/flutter/impeller` 子仓库存在变更，把变更丢弃，然后再 `gclient sync` 即可。

## Release 产物

```bash
cd src

# 生产 out/ios_release_arm64
./flutter/tools/gn --ios --runtime-mode=release --mac-cpu=arm64 --ios-cpu=arm64

# 编译源码（M1）
ninja -C out/ios_release_arm64

# 脱去所有本地符号
strip -x out/ios_release_arm64/Flutter.framework/Flutter

# 提取符号表
dsymutil out/ios_release_arm64/libFlutter.dylib
```
