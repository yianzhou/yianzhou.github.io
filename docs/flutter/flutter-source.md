# Flutter Source

## 环境配置

本节介绍编译 Flutter 源码所需要的环境配置。

参考文档：[Setting up the Engine development environment · flutter/flutter Wiki](https://github.com/flutter/flutter/wiki/Setting-up-the-Engine-development-environment)

其中一个依赖项是 [Chromium's depot_tools](https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html)：

- Chromium is an open-source web browser project initiated by Google and maintained by the developer community. The Chromium project primarily provides a browser engine responsible for processing web requests, rendering web pages, and incorporating a range of security features and performance optimizations. Many modern browsers, such as Google Chrome, Microsoft Edge, Opera, Brave, and Vivaldi, are built on top of the Chromium project.
- The Chromium depot_tools(7) suite contains many git workflow-enhancing tools which are designed to work together to enable anyone to wrangle the Chromium codebase expertly.

```bash
# 可以把 depot_tools 单独放，或者放到 flutter_source 目录里
mkdir flutter_source
cd flutter_source

git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# Add depot_tools to the front of your PATH
export PATH=`pwd`/depot_tools:$PATH

# A configuration file for you source checkout
touch .gclient
```

官方让自己 fork 一个仓库，但如果不往官方提交代码的话，可以先用着官方仓库：

```json title='flutter_source/.gclient'
solutions = [
  {
    "managed": False,
    "name": "src/flutter",
    "url": "git@github.com:flutter/engine.git@origin/yourBranch", // 这里可以换成自己维护的引擎仓库地址
    "custom_deps": {
      "src/third_party/skia": "git@github.com:flutter/skia.git@origin/yourBranch", // 这里可以换成自己维护的引擎仓库地址
    },
    "deps_file": "DEPS",
    "safesync_url": "",
  },
]
```

`DEPS`: A file in the chromium checkout which gclient sync uses to determine what dependencies to pull in. This file also contains hooks.（位于 `src/flutter/DEPS`）

`gclient sync`: This will pull all dependencies of the `src/flutter` checkout. You will need to run this any time you update the `src/flutter` checkout, including when you switch branches. **Avoid interrupting this script, as doing so can leave your repository in an inconsistent state that is tedious to clean up.**

```bash
# 第一次运行这个，会非常非常久，别着急
# 这一步会克隆 flutter/engine 仓库
# 在 flutter_source 根目录或者子目录运行此命令，应该没有什么区别，都是用 flutter_source/.gclient 这个文件
gclient sync
```

Editor autocomplete support: On Mac, you can simply use Xcode (e.g., open `out/host_debug_unopt/products.xcodeproj`).

切换引擎分支：打开 `src/flutter/.git`，这是一个 git 仓库，在这里切换

## Debug 编译

参考文档：[Compiling the engine · flutter/flutter Wiki](https://github.com/flutter/flutter/wiki/Compiling-the-engine)

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

iOS expect both a `host` and `ios` build. It is critical to recompile the `host` build after upgrading the Dart SDK (e.g. via a `gclient sync` after merging up to head), since artifacts from the `host` build need to be version matched to artifacts in the `iOS` build.

## Release 编译

```bash
cd src

# 生产 out/ios_release_arm64
./flutter/tools/gn --no-goma --ios --runtime-mode=release --mac-cpu=arm64 --ios-cpu=arm64

# 编译源码（M1）
ninja -C out/ios_release_arm64

# 脱去所有本地符号
strip -x out/ios_release_arm64/Flutter.framework/Flutter

# 提取符号表
dsymutil out/ios_release_arm64/libFlutter.dylib
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

```bash
cd my_app # 在my_app调试
export FLUTTER_ENGINE=$HOME/Documents/flutter_source/src/
flutter build ios --debug --local-engine ios_debug_unopt_arm64
```

官方说了，只能符号断点调试：

> Add an engine symbol breakpoint via Debug > Breakpoints > Create Symbolic Breakpoint.... The Symbol field should be the engine symbol you're interested in, like -[FlutterEngine runWithEntrypoint:] (note the -[ prefix has no space).

打开 `flutter_source/src/out/ios_debug_unopt/flutter_engine.xcodeproj`，阅读源码比较方便。

You can also set the environment variable `$FLUTTER_ENGINE` instead of specifying `--local-engine-src-path`.

## 错误解决

### fatal: bad object

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

### Cannot find gen_snapshot

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

### vpython3: No such file or directory

```
/Users/yianzhou/Documents/flutter_source/depot_tools/vpython3: line 45: /Users/yianzhou/Documents/flutter_source/depot_tools/.cipd_bin/vpython3: No such file or directory
/Users/yianzhou/Documents/flutter_source/depot_tools/vpython3: line 45: exec: /Users/yianzhou/Documents/flutter_source/depot_tools/.cipd_bin/vpython3: cannot execute: No such file or directory
```

这个问题，我把 `flutter_source/depot_tools` 目录执行 `git pull`，多试了几次，就好了。

### Undefined symbols for architecture arm64

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

### Simulator not implemented

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

### BUILD.gn

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

### Could not find Ninja

```
depot_tools/ninja.py: Could not find Ninja in the third_party of the current project, nor in your PATH.
Please take one of the following actions to install Ninja:
- If your project has DEPS, add a CIPD Ninja dependency to DEPS.
- Otherwise, add Ninja to your PATH *after* depot_tools.

depot_tools/ninja.py: Fallback to a deprecated legacy ninja binary. Note that this ninja binary will be removed soon.
Please install ninja to your project using DEPS. If your project does not have DEPS, Please install ninja in your PATH.
See also https://crbug.com/1340825
```

解决：`brew install ninja`

### cxxabi

3.0.4 版本，目前还没解决

```c
../../flutter/fml/backtrace.cc:7:10: fatal error: 'cxxabi.h' file not found
#include <cxxabi.h>
         ^~~~~~~~~~
1 error generated.

In file included from ../../third_party/abseil-cpp/absl/debugging/symbolize.cc:33:
../../third_party/abseil-cpp/absl/debugging/symbolize_darwin.inc:15:10: fatal error: 'cxxabi.h' file not found
#include <cxxabi.h>
         ^~~~~~~~~~
1 error generated.
```

找了一圈发现是 macOS 13.3.1 的问题：[Building failed after upgrade to Mac OS 13.3.1 - ROOT - ROOT Forum](https://root-forum.cern.ch/t/building-failed-after-upgrade-to-mac-os-13-3-1/54420)

在蓝盾上使用 macOS 12.5.1 + Xcode 14.2 编译成功了。
