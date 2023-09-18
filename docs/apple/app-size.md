# 包体大小优化

[Apple - Reducing Your App’s Size](https://developer.apple.com/documentation/xcode/reducing_your_app_s_size)

[periphery](https://github.com/peripheryapp/periphery) - A tool to identify unused code in Swift projects.

## App Thinning

不同的设备分发不同分辨率的资源文件（通过 xcassets 管理资源文件）、根据不同芯片的指令集优化二进制文件（Xcode 默认）、开启 Bitcode （需设置，优化不明显，有时要依赖第三方）等。

## 清理无用的资源文件

- 使用 `find` 命令找到工程目录下所有的资源文件，用正则表达式匹配出源码中用到的资源，确认并删除。
- 使用开源工具 [LSUnusedResources](https://github.com/tinymind/LSUnusedResources)。

## 资源压缩

GIF 转为 WebP，可减少大量体积！Google 提供的 WebP 压缩工具可以将其他图片格式转为 WebP。显示图片时使用 [libwebp](https://github.com/carsonmcdonald/WebP-iOS-example) 进行解析。

不过，WebP 在 CPU 消耗和解码时间上会比 PNG 高两倍。小于 100KB 的图片，也可以使用 [TinyPNG](https://tinypng.com/) 等工具压缩。

## 代码瘦身

可执行文件就是 Mach-O 文件，其大小是由代码量决定的。通常情况下，对可执行文件进行瘦身，就是找到并删除无用代码的过程。

方法一、LinkMap

首先，找出方法和类的全集；然后，找到**使用到**的方法和类；最后，由人工确认删除无用代码。

1. 通过分析 LinkMap 来获得所有的代码类和方法的信息。获取 LinkMap 可以通过将 Build Setting 里的 Write Link Map File 设置为 Yes，然后指定 Path to Link Map File 的路径就可以得到每次编译后的 LinkMap 文件了。
2. 通过 [MachOView](https://github.com/gdbinit/MachOView) 工具可以查看 Mach-O 文件里的信息。
3. 查看 `__objc_selrefs`、`__objc_classrefs`和`__objc_superrefs` 这三个 section。可以找到 Mach-O 文件里用到的方法和类。

方法二、通过 [AppCode](https://www.jetbrains.com/objc/) 找出无用代码

如果工程量不是很大的话，建议直接使用 AppCode 来做分析。那些代码量达到百万行的团队，则会自己通过 Clang 静态分析来开发工具，去检查无用的方法和类。

方法三、找到无用的功能

在 App 的不断迭代过程中，业务功能需求不断替换，会留下很多无用代码。这些代码在执行静态检查时会被用到，但是线上可能连这些老功能的入口都没有了，没有机会被用户用到。这些无用功能相关的代码也是可以删除的。通过 Runtime 检查类是否真正被使用过。

## 工作流程建设

包体增量大小检查，利用持续集成，及代码合入把控。

资源压缩用流程来规范。

定期做无用代码检查。
