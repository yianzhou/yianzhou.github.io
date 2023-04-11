# Xcode

## 版本

切换 Xcode 版本：[RobotsAndPencils/XcodesApp: The easiest way to install and switch between multiple versions of Xcode - with a mouse click.](https://github.com/RobotsAndPencils/XcodesApp)

查看 Xcode SDK 版本：`xcodebuild -version -sdk`

切换 Xcode 版本后出现编译时 SDK 版本不对的问题，解决方法是设置 SYSROOT：`xcode-select -s /Applications/Xcode.app/Contents/Developer`

<https://xcodereleases.com/>

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
