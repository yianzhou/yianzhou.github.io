# Xcode

## 版本

切换 Xcode 版本：[RobotsAndPencils/XcodesApp: The easiest way to install and switch between multiple versions of Xcode - with a mouse click.](https://github.com/RobotsAndPencils/XcodesApp)

查看 Xcode SDK 版本：`xcodebuild -version -sdk`

[https://xcodereleases.com/](https://xcodereleases.com/)

## 调试技巧

如何查看宏定义展开后的样子：打开要查看的文件，Xcode - Product - Perform Action - Preprocess File。

`po bt all` 打印全部堆栈信息（print object, backtrace）

你会发现输出的信息中带有 `$1`、`$2` 的字样。实际上，lldb 的每次查询结果会保存在一些持续变量中，`(\$[0-9]+)`，之后可以直接使用、修改这些值。

清空 `UserDefaults`：

```
expr [[NSUserDefaults standardUserDefaults] setPersistentDomain:[NSDictionary dictionary] forName:[[NSBundle mainBundle] bundleIdentifier]]
```

将字典打印成 json：

```
p print(String(data: try! JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted), encoding: .utf8 )!)
```

创建 Swift 变量：`e var $map = ["a": 1]`，打印：`po $map`

打印模拟器沙盒路径：`po NSHomeDirectory()`

如何解码二进制 plist 文件：VSCode 安装插件即可查看。备用：[Decode data plist in property list files – George Garside](https://georgegarside.com/blog/macos/decode-data-plist/)

## 在 Xcode 中打开 Terminal

1\. Create executable shell script with the following contents and save it anywhere

```bash
#!/bin/bash
open -a Terminal "`pwd`"
```

2\. Add execute permissions to your script: `chmod +x <YourShellScript>`

3\. In the Xcode menu bar, Go to Xcode -> Preferences -> Behaviors.

4\. Add a Custom behavior, name it "Open Terminal". (Optional) Configure a hotkey for the behavior.

5\. Checkmark Run, select you script from step 1.

## 模拟器安装路径

Runtimes: `$ open /Library/Developer/CoreSimulator/Profiles/Runtimes`

Devices: `$ open ~/Library/Developer/CoreSimulator/Devices`

查看可用的模拟器：`xcrun simctl list`

## Info.plist

`UIFileSharingEnabled` 在 iTunes File Sharing 中可见

`NSAppTransportSecurity` 允许非 HTTPS

`LSSupportsOpeningDocumentsInPlace`: A Boolean value indicating whether the app may open the original document from a file provider, rather than a copy of the document.

`UISupportsDocumentBrowser`: To allow other apps to open and edit the files stored in your app’s Documents folder, set this key to YES. This key also lets users set the app’s default save location in Settings.

plist 文件里声明 [Required Device Capabilities](https://developer.apple.com/support/required-device-capabilities/)，保证用户只下载到他们设备所支持的 App

## 环境变量

在命令行输入：`export OBJC_HELP=1`，再输入任意命令例如 `ls`，会打印以下内容：

```log
objc[90825]: Objective-C runtime debugging. Set variable=YES to enable.
objc[90825]: OBJC_HELP: describe available environment variables
objc[90825]: OBJC_PRINT_OPTIONS: list which options are set
objc[90825]: OBJC_PRINT_IMAGES: log image and library names as they are loaded
objc[90825]: OBJC_PRINT_IMAGE_TIMES: measure duration of image loading steps
objc[90825]: OBJC_PRINT_LOAD_METHODS: log calls to class and category +load methods
objc[90825]: OBJC_PRINT_INITIALIZE_METHODS: log calls to class +initialize methods
objc[90825]: OBJC_PRINT_RESOLVED_METHODS: log methods created by +resolveClassMethod: and +resolveInstanceMethod:
objc[90825]: OBJC_PRINT_CLASS_SETUP: log progress of class and category setup
objc[90825]: OBJC_PRINT_PROTOCOL_SETUP: log progress of protocol setup
objc[90825]: OBJC_PRINT_IVAR_SETUP: log processing of non-fragile ivars
objc[90825]: OBJC_PRINT_VTABLE_SETUP: log processing of class vtables
objc[90825]: OBJC_PRINT_VTABLE_IMAGES: print vtable images showing overridden methods
objc[90825]: OBJC_PRINT_CACHE_SETUP: log processing of method caches
objc[90825]: OBJC_PRINT_FUTURE_CLASSES: log use of future classes for toll-free bridging
objc[90825]: OBJC_PRINT_PREOPTIMIZATION: log preoptimization courtesy of dyld shared cache
objc[90825]: OBJC_PRINT_CXX_CTORS: log calls to C++ ctors and dtors for instance variables
objc[90825]: OBJC_PRINT_EXCEPTIONS: log exception handling
objc[90825]: OBJC_PRINT_EXCEPTION_THROW: log backtrace of every objc_exception_throw()
objc[90825]: OBJC_PRINT_ALT_HANDLERS: log processing of exception alt handlers
objc[90825]: OBJC_PRINT_REPLACED_METHODS: log methods replaced by category implementations
objc[90825]: OBJC_PRINT_DEPRECATION_WARNINGS: warn about calls to deprecated runtime functions
objc[90825]: OBJC_PRINT_POOL_HIGHWATER: log high-water marks for autorelease pools
objc[90825]: OBJC_PRINT_CUSTOM_CORE: log classes with custom core methods
objc[90825]: OBJC_PRINT_CUSTOM_RR: log classes with custom retain/release methods
objc[90825]: OBJC_PRINT_CUSTOM_AWZ: log classes with custom allocWithZone methods
objc[90825]: OBJC_PRINT_RAW_ISA: log classes that require raw pointer isa fields
objc[90825]: OBJC_DEBUG_UNLOAD: warn about poorly-behaving bundles when unloaded
objc[90825]: OBJC_DEBUG_FRAGILE_SUPERCLASSES: warn about subclasses that may have been broken by subsequent changes to superclasses
objc[90825]: OBJC_DEBUG_NIL_SYNC: warn about @synchronized(nil), which does no synchronization
objc[90825]: OBJC_DEBUG_NONFRAGILE_IVARS: capriciously rearrange non-fragile ivars
objc[90825]: OBJC_DEBUG_ALT_HANDLERS: record more info about bad alt handler use
objc[90825]: OBJC_DEBUG_MISSING_POOLS: warn about autorelease with no pool in place, which may be a leak
objc[90825]: OBJC_DEBUG_POOL_ALLOCATION: halt when autorelease pools are popped out of order, and allow heap debuggers to track autorelease pools
objc[90825]: OBJC_DEBUG_DUPLICATE_CLASSES: halt when multiple classes with the same name are present
objc[90825]: OBJC_DEBUG_DONT_CRASH: halt the process by exiting instead of crashing
objc[90825]: OBJC_DEBUG_POOL_DEPTH: log fault when at least a set number of autorelease pages has been allocated
objc[90825]: OBJC_DEBUG_SCRIBBLE_CACHES: scribble the IMPs in freed method caches
objc[90825]: OBJC_DEBUG_SCAN_WEAK_TABLES: scan the weak references table continuously in the background - set OBJC_DEBUG_SCAN_WEAK_TABLES_INTERVAL_NANOSECONDS to set scanning interval (default 1000000)
objc[90825]: OBJC_DISABLE_VTABLES: disable vtable dispatch
objc[90825]: OBJC_DISABLE_PREOPTIMIZATION: disable preoptimization courtesy of dyld shared cache
objc[90825]: OBJC_DISABLE_TAGGED_POINTERS: disable tagged pointer optimization of NSNumber et al.
objc[90825]: OBJC_DISABLE_TAG_OBFUSCATION: disable obfuscation of tagged pointers
objc[90825]: OBJC_DISABLE_NONPOINTER_ISA: disable non-pointer isa fields
objc[90825]: OBJC_DISABLE_INITIALIZE_FORK_SAFETY: disable safety checks for +initialize after fork
objc[90825]: OBJC_DISABLE_FAULTS: disable os faults
objc[90825]: OBJC_DISABLE_PREOPTIMIZED_CACHES: disable preoptimized caches
objc[90825]: OBJC_DISABLE_AUTORELEASE_COALESCING: disable coalescing of autorelease pool pointers
objc[90825]: OBJC_DISABLE_AUTORELEASE_COALESCING_LRU: disable coalescing of autorelease pool pointers using look back N strategy
```

## 统计编译时间

在 Xcode 中直接看到编译项目的时间：

1. 关闭 Xcode
2. 终端执行 `defaults write com.apple.dt.Xcode ShowBuildOperationDuration YES`
3. 重启 Xcode

## OTA

OTA 方式安装，是通过 WebKit 解析链接中的 itms-services:// 来实现的。例如：

```
<a href="itms-services://?action=download-manifest&url=https://zjhdreamteam.coding.net/p/OTADemo/git/raw/master/manifest.plist">点击安装</a>
```

浏览器会去读取 manifest.plist 中的信息，如：iOS 应用的名称、版本、安装地址等。

## LLDB

打印方法调用者：`po $x0`

打印方法名：`po (SEL)$x1`

打印参数：`po $x2`（以此类推，x3、x4 也可能是参数，如果是 x86 寄存器就是 r0、r1、r2）

## 打包

.xcarchive 是一个 Xcode 归档文件，包含了应用程序的构建产物、符号表、dSYM 文件和其他调试信息。

使用 xcodebuild 命令行工具生成 .xcarchive 文件：

```sh
xcodebuild -scheme YourScheme -configuration Release -sdk iphoneos -archivePath build/YourApp.xcarchive archive
```

生成的 .xcarchive 文件通常位于 `build/` 目录下。

生成的 .app 文件通常位于 `build/YourApp.xcarchive/Products/Applications/` 目录下。

## iPhone 设备内存信息

| 内存  | 设备                                                                                                                |
| ----- | ------------------------------------------------------------------------------------------------------------------- |
| 6GB   | iPhone 13 Pro Max, iPhone 13 Pro, iPhone 12 Pro Max, iPhone 12 Pro                                                  |
| 4GB   | iPhone SE (2022), iPhone 13, iPhone 13 mini, iPhone 12, iPhone 12 mini, iPhone 11, iPhone 11 Pro, iPhone 11 Pro Max |
| 3GB   | iPhone SE (2nd Gen), iPhone XS, iPhone XS Max, iPhone XR, iPhone X, iPhone 8 Plus, iPhone 7 Plus                    |
| 2GB   | iPhone 8, iPhone 7, iPhone SE, iPhone 6s Plus, iPhone 6s                                                            |
| 1GB   | iPhone 6 Plus, iPhone 6, iPhone 5s, iPhone 5C, iPhone 5                                                             |
| 512MB | iPhone 4S, iPhone 4                                                                                                 |
| 256MB | iPhone 3GS                                                                                                          |
| 128MB | iPhone, iPhone 3G                                                                                                   |

## 网络调试

可供调试的接口：`http://requestbin.net/`，`https://httpbin.org/get`，`https://httpbin.org/post`

模拟器用的网络调节器：先[下载](https://developer.apple.com/download/more/?=for%20Xcode)，copying the .prefPane file to: `/Library/PreferencePanes`

Charles HTTPS 抓包检查：

1. 电脑上的证书是否已安装好（Help - SSL Proxying - Install Charles Root Certificate），Keychain Access 中是否已信任。
2. 手机上连上代理，访问 `chls.pro/ssl` 下载证书，然后有两个地方要启用：在 General - Profile 中启用，在 General - About - Certificate Trust Settings 中启用。

配置 SSL 代理：

![img](/img/42C0CB22-70B8-43DE-8D10-6E1E23B82D5A.png)

[Charles 在线破解工具](https://www.zzzmode.com/mytools/charles/)

## Changes not staged for commit

`modified:   Runner/Assets.xcassets/AppIcon.appiconset/114.png`

Encountered 14 files that should have been pointers, but weren't:

```
git lfs uninstall && git reset --hard && git lfs install && git lfs pull
```

## Explore media formats for the web - WWDC23 - Videos - Apple Developer

https://developer.apple.com/videos/play/wwdc2023/10122/

The incumbent formats are GIF, JPEG, and PNG.

- GIF: It does not support a full color palette being limited to 8 bits color at a time. Since it's a lossless format, file sizes can be quite large, making it less suitable for larger animations.
- JPEG: A great feature is progressive loading. It's a lossy format.
- PNG: supports transparency. It's lossless and doesn't compress as well as JPEG, so it's not very suitable for big images with lots of color. Like GIF, it was designed to replace, it supports animations, though I've rarely seen those in the wild.

Safari 17 supports an additional four extra modern formats.

**WebP** was added to Safari 14 and macOS Big Sur. This is a modern image format that uses advanced compression algorithms to achieve smaller file sizes without sacrificing image quality. WebP files are typically smaller than those earlier image formats. WebP lets you do animations with video-like quality, and so use it where it's a bad idea to use GIF due to their size or lack of colors.

One exciting addition to Safari 17 is **JPEG-XL**. JPEG-XL uses a new compression algorithm called "Modular Entropy Coding" that allows for greater flexibility in adjusting the compression ratio. A key feature of JPEG-XL is that you can losslessly convert, that is, not occur any data loss going from your existing JPEG files to JPEG-XL, all while significantly reducing their size by up to 60%.

**AVIF** is another modern image format that uses the AV1 video codec to achieve high compression rates without sacrificing image quality. Widely supported across all browsers, it is well suited for live photos and supports up to 12 bits color depth. It also has the broadest support, and you should include it as fallback. AVIF can be up to ten times smaller than JPEG.

In Safari 17, we added support for **HEIC**, also known as **HEIF**. It's an image format that uses the HEVC video codec compression algorithm to achieve small file sizes. But since it's not widely supported on other platforms, you will probably only want to use it as an alternative format. This is the format used by iPhones and iPad to save photos, so you can directly handle photo uploaded from your iPhone with no conversion. If you intend to display images using a WKWebView inside your app, this is the format you should be using, as it's hardware accelerated and can be rendered quickly and efficiently.

You don't have to choose!

```html
// Support existing and modern image formats
<picture>
  <source srcset="images/large/sophie.heic" type="image/heic" />
  <source srcset="images/large/sophie.j×]" type="image/jx]" />
  <source srcset="images/large/sophie.avif" type="image/avif" />
  <img src="images/large/sophie.jpeg" />
</picture>
```

In the early 2000s, browser plugins like Flash and QuickTime emerged as a popular way to add video to websites. And in 2010, HTML5 was introduced, which made it possible to embed video directly into webpages without the need for those plugins.

**HTTP Live Streaming (HLS)** was introduced by Apple in 2009. One of the key features of HLS is its support for adaptive bitrate streaming, which allows for the delivery of the best possible video quality based on the user's internet connection speed and device capabilities.

![img](/img/3D93C2F7-58CC-43BF-B86D-AF0FAD56208B.png)

Adaptive streaming in HLS works by dividing the video content into small chunks or segments, typically between two and ten seconds in length. Each segment is encoded at multiple bitrates, and these different bitrate versions are made available to the client via a manifest file in the form of an **M3U8** multi-variant playlist. HLS does a brilliant job at selecting the best suitable variant. It's very simple to use and is the best solution for the end users. Unfortunately, even today, only Safari supports it. Web developers wanted more control and more flexibility, such as the selection and transfer of media data, or the ability to play DRMed content on desktop.

And so in 2013, the **Media Source Extension (MSE)** was published by the W3C body. It is a low-level toolkit that allows for adaptive streaming by giving the webpage more control and responsibilities for managing buffering and resolution. Overall, MSE has been a game changer for web developers. It has enabled the development of high-quality streaming experiences on the web and is now the most used web video technology. MSE has some drawbacks. It isn't particularly good at managing of buffer levels, the timing and amount of network access, and media variant selection. These inefficiencies have largely been immaterial on relatively powerful devices like modern general purpose computers. Power usage on mobile devices was much higher than with the HLS native player, and so MSE was never made available on iPhones because we couldn't achieve with MSE the required battery savings.

The new **Managed Media Source** API makes it easier for media website authors to support streaming media playback on constrained capability devices, all while allowing User Agents to react to changes in available memory and networking capabilities.
