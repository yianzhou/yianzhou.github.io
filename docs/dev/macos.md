# macOS

## XNU

XNU（X is Not Unix）是苹果自研的混合型内核，负责最底层的硬件管理和资源调度。它由三个核心模块组成：

- ​​Mach 微内核：源自卡内基梅隆大学，处理线程调度、IPC 通信和虚拟内存
- ​​BSD 子系统：来自 FreeBSD，提供 POSIX 兼容性、网络协议栈和文件系统支持（POSIX 是一系列操作系统接口的标准。pthread 即 POSIX thread）
- ​​I/O Kit​​：面向对象的设备驱动框架，支持热插拔和硬件抽象

XNU 最初由 NeXT 公司为 NeXTSTEP 操作系统开发，苹果收购 NeXT 后，整合 Mach 3.0 和 FreeBSD 代码，引入 I/O Kit 取代旧驱动框架，并于 2001 年推出首个 macOS 版本（Cheetah）。

为适应 iPhone 需求，XNU 加入内存压缩（Jetsam）、地址随机化（ASLR）等移动端优化技术。2023 年后，通过 ​​exclaves​​ 技术增强安全性，隔离关键资源以抵御内核攻击。

## Darwin

Darwin 是基于 XNU 内核的完整操作系统基础层。Darwin 以 APSL 协议开源，但 XNU 中涉及商业机密的部分（如 Secure Enclave 驱动）仍闭源。

XNU 如同汽车的发动机，负责动力输出；Darwin 则是包含发动机、变速箱和底盘的整车平台。两者共同构成苹果生态的基石。苹果操作系统的生态都建立在这套经过 20 余年演进的精密架构之上。

## 显示隐藏文件

`defaults write com.apple.finder AppleShowAllFiles TRUE;killall Finder`

## 电脑

> [Mac Benchmarks - Geekbench Browser](https://browser.geekbench.com/mac-benchmarks)

| 电脑                                                                    | 评分 | 备注                |
| ----------------------------------------------------------------------- | ---- | ------------------- |
| iMac Pro (Late 2017) Intel Xeon W-2140B @ 3.2 GHz (8 cores)             | 7977 | QB 组内工作站       |
| MacBook Pro (16-inch Late 2019) Intel Core i7-9750H @ 2.6 GHz (6 cores) | 5285 | 2021 发放笔记本电脑 |
| iMac (27-inch Retina Mid 2020) Intel Core i7-10700K @ 3.8 GHz (8 cores) | 8130 | 2022 电脑发放标准   |
| Mac mini (Late 2020) Apple M1 @ 3.2 GHz (8 cores)                       | 7424 | 参考                |

## Apple silicon Macs

> [iPad and iPhone apps on Apple silicon Macs](https://developer.apple.com/videos/play/wwdc2020/10114/)
>
> [Introducing iPad Apps for Mac](https://developer.apple.com/videos/play/wwdc2019/205/)

In macOS Catalina, we added the ability to build your iOS apps for the Mac with **Mac Catalyst**. Mac Catalyst requires building your app with the macOS SDK.

In macOS Big Sur, we are leveraging this Mac Catalyst infrastructure to enable running your **existing** iOS apps as-is on Apple Silicon-based Macs. It is the exact **same binary**. Compatible iOS apps are automatically available in the Mac App Store, but you can manage the availability of your app in App Store Connect.

![img](/assets/images/cf447478-d79b-4383-aa50-21349a27cb80.png)

If you want to take your iOS applications further on the Mac, create a Mac Catalyst version by **checking that switch in Xcode**. This will give you the ability to customize your app's behavior on the Mac, as well as allow you to distribute your application on all Macs, not just those running Apple Silicon.

[Is Apple silicon ready?](https://isapplesiliconready.com/)

## Help

[如何重新安装 macOS](https://support.apple.com/zh-cn/HT204904)

[如何抹掉基于 Intel 的 Mac](https://support.apple.com/zh-cn/HT208033)

[磁盘格式](https://support.apple.com/zh-cn/guide/disk-utility/dsku19ed921c/mac)选择 APFS，不加密、不区分大小写（某些应用程序不支持加密和区分大小写）

Turn off mojave screenshot previews:

- From a Mac running at least macOS 10.14 Mojave, use the keyboard shortcut `Command-Shift-5` to open the new screenshot utility.
- From the toolbar of icons at the bottom of the screen, select Options.
- Click once to uncheck Show Floating Thumbnail.

## Apache 快速开始

打开终端，启动内置 Apache：`sudo apachectl start`

打开浏览器，输入 `localhost`，即可看见 "It works!"。

也可以通过 [127.0.0.1](http://127.0.0.1) 访问。

文件目录：`open /Library/WebServer/Documents`

配置文件：`/etc/apache2/httpd.conf`

停止：`sudo apachectl stop`

## Chrome

[SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega/releases)，如果遇到最新版本不能安装的，可以试试旧版本。

为色盲/色弱人群打造的插件 [Colorblindly](https://chrome.google.com/webstore/detail/colorblindly/floniaahmccleoclneebhhmnjgdfijgg)，[Github 地址](https://github.com/oftheheadland/Colorblindly)。

Chrome 全屏截图：`Command-Option-I` 开发者界面 - `SHIFT-COMMAND-P` - 输入 "Capture full size screenshot"

Reading List: `chrome://flags/#read-later`

## 清理磁盘空间

![img](/assets/images/D7916664-A09D-422A-B171-E0F370B8105F.png)

遇到回收站文件无法删除：`sudo rm -rfv /Users/yianzhou/.Trash/prebuilt`

## 软件

[Clipy/Clipy: Clipboard extension app for macOS.](https://github.com/Clipy/Clipy)

[p0deje/Maccy: Lightweight clipboard manager for macOS](https://github.com/p0deje/Maccy)

[DevUtils - All-in-one Toolbox for Developers](https://devutils.com/)

[iina/iina: The modern video player for macOS.](https://github.com/iina/iina)

[Moom on the Mac App Store](https://apps.apple.com/us/app/moom/id419330170?mt=12): Moom allows you to easily move and zoom windows—on one display, or to another display—using either the mouse or the keyboard.

[DB Browser for SQLite](https://sqlitebrowser.org/)

## 如何在 Finder 打开终端

系统有内置服务：

![img](/img/472789F1-0F32-4B25-BAEC-6015468DBE19.png)

可以设置快捷键：

![img](/img/8CB530FC-506D-4614-A581-7844BDF9044F.png)

## .DS_Store

.DS_Store is a hidden file that is created by macOS Finder to store custom attributes of a folder, such as the position of icons, the size and position of windows, and other view options. It is a binary file that is not meant to be edited manually.

The .DS_Store file is created automatically by Finder when you open a folder or change its view options. It is stored in the same folder as the folder it belongs to, and it is hidden by default to prevent accidental deletion or modification.

If you see a .DS_Store file appear suddenly in your macOS Finder, it is likely because you have opened or modified a folder in Finder. This is a normal behavior of macOS, and you don't need to worry about it.

However, if you want to prevent the creation of .DS_Store files, you can disable it by running the following command in Terminal:

`defaults write com.apple.desktopservices DSDontWriteNetworkStores true`

This will prevent the creation of .DS_Store files on network volumes. If you want to prevent the creation of .DS_Store files on local volumes as well, you can run the following command:

`defaults write com.apple.desktopservices DSDontWriteStores true`

Note that disabling the creation of .DS_Store files may affect the behavior of Finder and other macOS applications, so use it with caution.
