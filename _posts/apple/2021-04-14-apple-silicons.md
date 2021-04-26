---
title: "Apple Silicons"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# Apple silicon Macs

> [iPad and iPhone apps on Apple silicon Macs](https://developer.apple.com/videos/play/wwdc2020/10114/)
>
> [Introducing iPad Apps for Mac](https://developer.apple.com/videos/play/wwdc2019/205/)

In macOS Catalina, we added the ability to build your iOS apps for the Mac with **Mac Catalyst**. Mac Catalyst requires building your app with the macOS SDK.

In macOS Big Sur, we are leveraging this Mac Catalyst infrastructure to enable running your **existing** iOS apps as-is on Apple Silicon-based Macs. It is the exact **same binary**. Compatible iOS apps are automatically available in the Mac App Store, but you can manage the availability of your app in App Store Connect.

![img](/assets/images/cf447478-d79b-4383-aa50-21349a27cb80.png)

If you want to take your iOS applications further on the Mac, create a Mac Catalyst version by **checking that switch in Xcode**. This will give you the ability to customize your app's behavior on the Mac, as well as allow you to distribute your application on all Macs, not just those running Apple Silicon.

[Is Apple silicon ready?](https://isapplesiliconready.com/)

# Help

[如何重新安装 macOS](https://support.apple.com/zh-cn/HT204904)

[如何抹掉基于 Intel 的 Mac](https://support.apple.com/zh-cn/HT208033)

[磁盘格式](https://support.apple.com/zh-cn/guide/disk-utility/dsku19ed921c/mac)选择 APFS，不加密、不区分大小写。（某些应用程序不支持加密和区分大小写）

`Shift-Command-5`：拍摄截屏或录制屏幕。

[macOS Catalina 已损坏无法打开解决办法](https://xclient.info/a/4f212972-733a-5d3d-b3a5-dca2557cf2db.html)

Turn off mojave screenshot previews:

- From a Mac running at least macOS 10.14 Mojave, use the keyboard shortcut Command-Shift-5 to open the new screenshot utility.
- From the toolbar of icons at the bottom of the screen, select Options.
- Click once to uncheck Show Floating Thumbnail.

# Apache 快速开始

当前操作系统：macOS 10.14

打开终端，启动内置 Apache：`sudo apachectl start`

打开浏览器，输入 `localhost`，即可看见 "It works!"。

也可以通过 [127.0.0.1](http://127.0.0.1) 访问。

在终端输入：`open /Library/WebServer/Documents`，即可打开文件目录。

配置文件：`/etc/apache2/httpd.conf`

停止：`sudo apachectl stop`

# Chrome

SwitchyOmega：<https://developer.chrome.com/extensions/proxy#bypass_list>

SwitchyOmega 下载地址：<https://github.com/FelisCatus/SwitchyOmega/releases> 需在 chrome 里面开启开发者模式。如果遇到最新版本不能安装的，可以找一下旧版本看能不能安装。

为色盲/色弱人群打造的 Chrome 插件 Colorblindly: <https://chrome.google.com/webstore/detail/colorblindly/floniaahmccleoclneebhhmnjgdfijgg>，github 地址：<https://github.com/oftheheadland/Colorblindly>

Chrome 全屏截图：右键 - Inspect - `SHIFT+COMMAND+P` - 输入 "Capture full size screenshot"

`Command + Option + I` 开发者界面。
