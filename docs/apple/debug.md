---
slug: /
---

# Debug

终端退出 App：`osascript -e 'quit app "Xcode"'`

[ChenYilong/iOSInterviewQuestions: iOS interview questions;iOS 面试题集锦（附答案）](https://github.com/ChenYilong/iOSInterviewQuestions)

## 公众号

百度 APP 技术：[百度 APP iOS 端内存优化-原理篇](https://mp.weixin.qq.com/s/6_FGFU7-X7URMms6-ucyZQ)

字节跳动技术团队：[iOS 高刷屏监控 + 优化：从理论到实践全面解析](https://mp.weixin.qq.com/s/gMxTq0_nmE-xW7GA3pkBJg)

阿里巴巴终端技术：[夸克 iOS Top1 JSC 崩溃攻克之旅](https://mp.weixin.qq.com/s/0DidXWLDeqXpsjGBv69ITQ)

腾讯音乐技术团队：[iOS Crash 防护你看这个就够了-上篇](https://mp.weixin.qq.com/s/TW5NMiGKYY3jTNuugbJxfQ)

微信客户端技术团队：[iOS 微信全文搜索技术优化](https://mp.weixin.qq.com/s/Ph0jykLr5CMF-xFgoJw5UQ)

## 设备信息

[List of iOS and iPadOS devices - Wikipedia](https://en.wikipedia.org/wiki/List_of_iOS_and_iPadOS_devices)

[iOS Resolution // Display proerties of every iPhone, iPad and iPod touch Apple ever made](https://www.ios-resolution.com/)

[Apple iPhone 13 - Full phone specifications](https://www.gsmarena.com/apple_iphone_13-11103.php)

[iPhone RAM Size Comparison Chart: All The Models Listed](https://www.knowyourmobile.com/phones/iphone-ram-size-comparison-chart-all-the-models-listed/)

[How Much RAM Is in the iPhone 13? Why Apple Doesn't Give Specs - The Mac Security Blog](https://www.intego.com/mac-security-blog/how-much-ram-is-in-an-iphone-why-apple-doesnt-give-specs/)

[List of Apple's mobile device codes types and their matching product names](https://gist.github.com/adamawolf/3048717)

[Lookin - 免费好用的 iOS UI 调试软件](https://lookin.work/)

私有库及私有 API：[iOS-Runtime-Headers](https://github.com/nst/iOS-Runtime-Headers)

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

## IPA

- [iOS：使用 Apple Configurator 获取 ipa 包及资源文件](http://www.gsnice.com/2020/04/ios-apple-configurator-ipa/)
- 命令行工具：[majd/ipatool](https://github.com/majd/ipatool)

## APNG

[Animated PNG (APNG) Maker](https://ezgif.com/apng-maker)

[Online APNG Assembler](http://littlesvr.ca/apng/assembler/assembler.php)

[APNG Software](http://littlesvr.ca/apng/)

## iOS 10 及以上允许使用无线数据

[解决方案](https://github.com/Zuikyo/ZIKCellularAuthorization)

动态加载私有库，并调用私有 API 实现。

```objc
#import <dlfcn.h>

void * FTServicesHandle = dlopen("/System/Library/PrivateFrameworks/FTServices.framework/FTServices", RTLD_LAZY);
Class NetworkSupport = NSClassFromString(@"FTNetworkSupport");
id networkSupport = [NetworkSupport performSelector:NSSelectorFromString(@"sharedInstance")];
[networkSupport performSelector:NSSelectorFromString(@"dataActiveAndReachable")];
dlclose(FTServicesHandle);
```

仅供参考！目前不建议在 App Store 正式版中使用，企业 app 中可以随意使用。现在苹果禁止在使用 `dlopen()`, `dlsym()`, `respondsToSelector:`, `performSelector:`, `method_exchangeImplementations()` 时传入动态生成的参数，这通过静态分析是能够被检查出来的。苹果会检查引用了这些符号的那部分汇编代码，判断传入的参数是否是静态编译的。

## 网络

可供调试的接口：<http://requestbin.net/>，<https://httpbin.org/get>，<https://httpbin.org/post>

模拟器用的网络调节器：先[下载](https://developer.apple.com/download/more/?=for%20Xcode)，copying the .prefPane file to: `/Library/PreferencePanes`

Charles HTTPS 抓包检查：

1. 电脑上的证书是否已安装好（Help - SSL Proxying - Install Charles Root Certificate），Keychain Access 中是否已信任。
2. 手机上连上代理，访问 <chls.pro/ssl> 下载证书，在 General - Profile 中启用，在 General - About - Certificate Trust Settings 中启用。

[Charles 在线破解工具](https://www.zzzmode.com/mytools/charles/)

可视化调试：一款 POSTMAN 的替代品，Chrome 插件 Talend API Tester

## copy, mutableCopy

`NSObject` 有两个方法，

- `copy` 调用了 `NSCopying` 协议的 `copyWithZone:` 方法；
- `mutableCopy` 调用了 `NSMutableCopying` 协议的 `mutableCopyWithZone:` 方法。

当 `NSMutableArray` 声明为 `copy` 的属性时：

```objc
@property(nonatomic, copy) NSMutableArray* mutableArray;
```

它的背后实现是：

```objc
-(void)setMutableArray:(NSMutableArray *)mutableArray {
    _mutableArray = [mutableArray copy];
}
```

因此，mutableArray 实际得到的是一个 `NSArray` 对象，如果对它调用 `insertObject:atIndex:` 等方法，就会崩溃。

当修饰可变类型的属性时，如 `NSMutableArray`、`NSMutableDictionary`、`NSMutableString`，用 `strong`；

当修饰不可变类型的属性时，如 `NSArray`、`NSDictionary`、`NSString`，用 `copy`（这些类型在属性赋值时，右边的值有可能是它们的可变版本。这样当可变版本对象进行增删改的时候，属性也会相应被修改，所以它们都应该用 `copy`）。

Sending `copy` to a mutable class returns an immutable copy of the object. But, sending `copy` to an immutable counterpart is equivalent to sending it a `retain` message.

```objc
@interface DemoClass : NSObject
@property (nonatomic, copy) NSString *strCopy;
@property (nonatomic, strong) NSString *strStrong;
@end

DemoClass *demo = [[DemoClass alloc] init];
NSMutableString *hello = [NSMutableString stringWithFormat:@"Hello"];
demo.strCopy = hello;
demo.strStrong = hello;
[hello appendString:@" world!"];
```

## NSLog

[The simple truth is that NSLog is just plain slow. Why?](https://github.com/CocoaLumberjack/CocoaLumberjack/blob/master/Documentation/Performance.md)

NSLog does 2 things:

1. It writes log messages to the Apple System Logging (asl) facility. This allows log messages to show up in Console.app.
2. It also checks to see if the application's stderr stream is going to a terminal (such as when the application is being run via Xcode). If so it writes the log message to stderr (so that it shows up in the Xcode console).

Writing to STDERR doesn't sound difficult. But what about asl? 第二点听起来不难，但第一点呢？

To send a log message to the ASL facility, you basically open a client connection to the ASL daemon and send the message. BUT - each thread must use a separate client connection. So, to be thread safe, every time NSLog is called it opens a new asl client connection, sends the message, and then closes the connection.

The lumberjack framework avoids much of the cost by creating a single re-usable asl client connection for its background logging thread.

## URLSession 内存关系

在开发过程中遇到一个疑惑，为什么函数内的局部变量 `urlSession` 和 `dataTask` 不会被释放，用了一个 demo 来验证。

```swift
class ViewController: UIViewController {
    weak var weakObj: NSObject?
    weak var weakTask: URLSessionDataTask?
    weak var weakURLSession: URLSession?

    override func viewDidLoad() {
        super.viewDidLoad()

        // 对照组
        let obj = NSObject()
        self.weakObj = obj
        // viewDidLoad() 执行完后 obj 被释放

        let urlSession = URLSession(configuration: .default)
        self.weakURLSession = urlSession
        let url = URL(string: "https://www.baidu.com/")!
        let task = urlSession.dataTask(with: url) { (data, response, error) in
            print("response")
        }
        self.weakTask = task
        task.resume()

        // 等待 task 执行完后，urlSession、task 才会释放，不调用这个方法，会内存泄漏
        urlSession.finishTasksAndInvalidate()
    }
}
```

内存图：

![img-80](/assets/images/C6815EAE-C632-4EFC-9BBF-9C45352A669D.png)

## 编译报错

```
clang: error: linker command failed with exit code 1 (use -v to see invocation)
1 error generated.
2 errors generated.
```