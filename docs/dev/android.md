# Android

## adb

Android Debug Bridge 是一种客户端-服务器程序，包括以下三个组件：

- 客户端：用于发送命令。客户端在开发计算机上运行。您可以通过发出 adb 命令来从命令行终端调用客户端。
- 守护进程 (adbd)：在设备上运行命令。守护进程在每个设备上作为后台进程运行。
- 服务器：管理客户端和守护进程之间的通信。服务器在开发机器上作为后台进程运行。

[操作系统分布](https://mta.qq.com/mta/data/device/os)

[Android API Levels](https://source.android.com/setup/start/build-numbers)

## 安卓分支

原生安卓——Google 为自家安卓设备 Pixel 系列提供的系统，由谷歌负责安全补丁升级和系统更新；

Android One——Google 为非 Google 硬件提供的原生安卓，由谷歌负责安全补丁升级和系统更新；

Android Go——取代 Android One 成为专为低端设备优化的安卓系统，由 OEM 厂商在接受 Google 推送后负责安全补丁升级和系统更新。

## gradle

`build.gradle`: 用于定义项目和模块的构建配置和依赖项。项目级别的 `build.gradle` 配置整个项目，模块级别的 `build.gradle` 配置具体模块。

`settings.gradle`: 用于定义项目的设置，它告诉 Gradle 哪些模块是项目的一部分。

`gradle.properties`: 用于定义全局的 Gradle 属性和配置参数，影响整个构建过程。

`build.gradle.kts` 文件使用 Kotlin 语言编写，提供了更强的类型安全和更好的 IDE 支持。

## Android Studio

Unresolved reference: ...

1. 在项目的工程根目录中找到名为 `.idea` 的文件夹，进入该文件夹后，再找到里面的 “libraries” 文件夹，将 “libraries” 文件夹下的所有文件都删除。
2. 导航栏 - File - Invalidate Caches...
