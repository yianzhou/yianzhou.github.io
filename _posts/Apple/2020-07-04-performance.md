---
title: 'iOS 性能专题'
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

# App 启动速度

### `main()`函数开始执行前

- 加载可执行文件（App 的.o 文件的集合）；
- 加载动态链接库，进行 rebase 指针调整和 bind 符号绑定；
- ObjC 运行时的初始处理，包括 Objc 相关类的注册、category 注册、selector 唯一性检查等；
- 初始化，包括了执行 +load() 方法、attribute((constructor)) 修饰的函数的调用、创建 C++ 静态全局变量。

将不必须在 +load 中做的事情尽量挪到 +initialize 中，+initialize 是在第一次初始化这个类之前被调用，+load 在加载类的时候就被调用。尽量将 +load 里的代码延后调用。

### `main()`函数开始执行后

这个阶段，又有人把它分为两个步骤：

- 从`main()`函数开始执行，到 `application:didFinishLaunchingWithOptions:` 方法中的首屏渲染相关方法执行完成，用户可以看到首屏内容了；
- 从完成首屏渲染，到 `application:didFinishLaunchingWithOptions:` 方法执行完毕，用户可以进行交互了。

从功能上梳理出哪些是首屏渲染必要的方法，从而逐个改善：

- 首屏初始化所需配置文件的读写操作；
- 首屏列表数据的读取；
- 首屏渲染的大量计算等。

# 卡顿监测

## CADisplayLink

```swift
link = CADisplayLink(target: WeakProxy.init(target: self), selector: #selector(FPSLabel.tick(link:)))
link.add(to: RunLoop.main, forMode: .commonModes)
```

YYFPSLabel 采用这样的办法显示屏幕帧率。这种方法无法捕获到卡顿堆栈。

## 子线程 Ping

创建一个子线程通过信号量去 ping 主线程，因为 ping 的时候主线程肯定是在 kCFRunLoopBeforeSources 和 kCFRunLoopAfterWaiting 之间。每次检测时设置标记位为 YES，然后派发任务到主线程中将标记位设置为 NO。接着子线程沉睡超时阙值时长，判断标志位是否成功设置成 NO，如果没有说明主线程发生了卡顿。ANREye 中就是使用子线程 Ping 的方式监测卡顿的。

```swift
private final class PingMainThread: Thread {
    override func main() {
        while !isCancelled {
            autoreleasepool {
                isResponse = false
                DispatchQueue.main.async {
                    self.isResponse = true
                    self.semaphore.signal()
                }
                Thread.sleep(forTimeInterval: TimeInterval(threshold))
                if !isResponse {
                    catchHandler() // 在这里获取全线程栈帧
                }
                _ = semaphore.wait(timeout: DispatchTime.distantFuture)
            }
        }
    }
}
```

## RunLoop 监听

要想监听 RunLoop，首先需要创建一个 CFRunLoopObserverContext 观察者，将创建好的观察者添加到主线程 RunLoop 的 common 模式下观察。然后，创建一个持续运行的子线程专门用来监控主线程的 RunLoop 状态。

一旦发现进入睡眠前的 kCFRunLoopBeforeSources 状态，或者唤醒后的状态 kCFRunLoopAfterWaiting，在设置的时间阈值内一直没有变化，即可判定为卡顿。

参考：<https://github.com/ming1016/DecoupleDemo/blob/master/DecoupleDemo/SMLagMonitor.m>

卡顿堆栈的捕获：<https://github.com/bestswifter/BSBacktraceLogger>

> 同时，我们也认为 CPU 过高也可能导致应用出现卡顿，所以在子线程检查主线程状态的同时，如果检测到 CPU 占用过高，会捕获当前的线程快照保存到文件中。目前微信应用中认为，单核 CPU 的占用超过了 80%，此时的 CPU 占用就过高了。<https://cloud.tencent.com/developer/article/1427933>

## 线上效果

主线程卡顿率：卡顿 uu/启动监测 uu，约为 1.25% 左右。人均卡顿 1.7-1.8 次。较差设备翻几倍。卡顿堆栈：

- OpenGL ES 特效相关代码
- keychain 读写
- 视图初始化、读取 bundle 图片

子线程卡顿率：卡顿 uu/启动监测 uu，约为 0.35% - 0.45% 左右。人均卡顿 1.2-1.4 次。较差设备翻几倍。卡顿堆栈：

- 学习词典的加载、写入

关于卡顿监测：一、卡顿信息收集不一定能看到造成卡顿的代码堆栈，很多卡顿信息只是监测代码本身，或者 Foundation 等框架的调用；二、就算看到了卡顿堆栈，也不一定能修复解决，要看业务需要、影响面和修复的成本/收益。因此，卡顿监测更多是作为一种监控和报警，从趋势来辅助判断，如果某一个版本突然升高，就要排查一下这个版本的改动哪些可能带来卡顿。

# 包体大小优化

[Apple - Reducing Your App’s Size](https://developer.apple.com/documentation/xcode/reducing_your_app_s_size)

一、官方的 App Thinning。不同的设备分发不同分辨率的资源文件（通过 xcassets 管理资源文件）、根据不同芯片的指令集优化二进制文件（Xcode 默认的行为）、开启 Bitcode （需设置，优化不明显，有时要依赖第三方）等。

二、清理无用的资源文件（主要是图片）

- 使用 `find` 命令找到工程目录下所有的资源文件，用正则表达式匹配出源码中用到的资源，确认并删除。
- 使用开源工具 [LSUnusedResources](https://github.com/tinymind/LSUnusedResources)

三、图片资源压缩

GIF 转为 WebP，可减少大量体积！Google 提供的 WebP 压缩工具可以将其他图片格式转为 WebP。显示图片时使用 [libwebp](https://github.com/carsonmcdonald/WebP-iOS-example) 进行解析。

不过，WebP 在 CPU 消耗和解码时间上会比 PNG 高两倍。小于 100KB 的图片，也可以使用 [TinyPNG](https://tinypng.com/) 等工具压缩。

四、代码瘦身

可执行文件就是 Mach-O 文件，其大小是由代码量决定的。通常情况下，对可执行文件进行瘦身，就是找到并删除无用代码的过程。

方法一、LinkMap

首先，找出方法和类的全集；然后，找到**使用到**的方法和类；最后，由人工确认删除无用代码。

1. 通过分析 LinkMap 来获得所有的代码类和方法的信息。获取 LinkMap 可以通过将 Build Setting 里的 Write Link Map File 设置为 Yes，然后指定 Path to Link Map File 的路径就可以得到每次编译后的 LinkMap 文件了。
2. 通过 [MachOView](https://github.com/gdbinit/MachOView) 工具可以查看 Mach-O 文件里的信息。
3. 查看 `__objc_selrefs`、`__objc_classrefs`和`、__objc_superrefs` 这三个 section。可以找到 Mach-O 文件里用到的方法和类。

方法二、通过 [AppCode](https://www.jetbrains.com/objc/) 找出无用代码

如果工程量不是很大的话，建议直接使用 AppCode 来做分析。那些代码量达到百万行的团队，则会自己通过 Clang 静态分析来开发工具，去检查无用的方法和类。

方法三、找到无用的功能

在 App 的不断迭代过程中，业务功能需求不断替换，会留下很多无用代码。这些代码在执行静态检查时会被用到，但是线上可能连这些老功能的入口都没有了，没有机会被用户用到。这些无用功能相关的代码也是可以删除的。

通过 Runtime 检查类是否真正被使用过。

五、工作流程建设

包体增量大小检查，利用持续集成，及代码合入把控。

资源压缩用流程来规范。

定期做无用代码检查。

# 崩溃监控

常见崩溃类型：

- 野指针：指针指向一个已删除的对象访问内存区域。
- 主线程卡顿/无响应：如果主线程超过系统规定的时间无响应，就会被 Watchdog 杀掉。这时，崩溃问题对应的异常编码是 0x8badf00d。
- 多线程问题：在子线程中进行 UI 更新可能会发生崩溃。多个线程进行数据的读取操作，因为处理时机不一致，比如有一个线程在置空数据的同时另一个线程在读取这个数据，可能会出现崩溃情况。
- 数组越界：在取数据索引时越界，或给数组添加了 nil
- 后台任务超时
- 内存消耗过高

捕获的方式：

1. Xcode - Organizer
2. [PLCrashReporter](https://github.com/microsoft/plcrashreporter)，自己上传服务器
3. Fabric 或 Bugly

一些被系统杀掉的情况，我们可以通过[异常编码](https://en.wikipedia.org/wiki/Hexspeak)来分析。常见的就是如下三种：

- 0x8badf00d，表示 App 在一定时间内无响应而被 watchdog 杀掉的情况。
- 0xdeadfa11，表示 App 被用户强制退出。
- 0xc00010ff，表示 App 因为运行造成设备温度太高而被杀掉。

# 内存优化

iOS 的内存问题主要是一、循环引用导致的内存泄漏（Delegate、block、NSTimer 等容易出现）；二、大量数据加载及使用导致的内存警告。

使用 Instruments 分析内存占用、内存泄漏的情况，再根据情况来具体分析解决。

下面这段 NSTimer 会造成循环引用，原因是 VC -> timer -> self

注意，即使我们使用 `__weak typeof(self) weakSelf = self;` 也没有用，因为 NSTimer 的内部实现还是会用强引用指针指向 self，发生循环引用。

```objc
@interface DemoTimerViewController ()
@property(nonatomic, strong) NSTimer *timer;
@end

@implementation DemoTimerViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(testPrint) userInfo:nil repeats:YES];
    [self.timer fire];
}

- (void)testPrint {
    NSLog(@"hello");
}

- (void)dealloc {
    [self.timer invalidate]; // dealloc 方法不会被调用到
}
@end
```

解决方式一，采用中间类，VC -> timer -> timerTarget --> self 解除循环引用：

```objc
@interface TimerTarget : NSObject
+ (NSTimer*)scheduledTimerWithTimeInterval:(NSTimeInterval)interval target:(nonnull id)aTarget selector:(nonnull SEL)aSelector userInfo:(nullable id)userInfo repeats:(BOOL)yesOrNo;

@property (assign, nonatomic) SEL outSelector;
@property (weak, nonatomic) id outTarget;

@end

@implementation TimerTarget

+ (NSTimer*)scheduledTimerWithTimeInterval:(NSTimeInterval)interval target:(id)aTarget selector:(SEL)aSelector userInfo:(id)userInfo repeats:(BOOL)yesOrNo {
    TimerTarget *target = [[TimerTarget alloc]init];
    target.outSelector = aSelector;
    target.outTarget = aTarget;
    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:interval target:target selector:@selector(timerSelector:) userInfo:userInfo repeats:yesOrNo];
    return timer;
}

- (void)timerSelector:(NSTimer*)timer {
    if (self.outTarget && [self.outTarget respondsToSelector:self.outSelector]) {
        [self.outTarget performSelector:self.outSelector withObject:timer.userInfo];
    } else {
        [timer invalidate];
    }
}

@end
```

解决方式二，使用 block，VC -> timer -> block --> self 解除循环引用，在 iOS 10+ 上已经有这个 API 了：

```objc
__weak typeof(self) weakSelf = self;
self.timer = [NSTimer scheduledTimerWithTimeInterval:1.0 repeats:YES block:^(NSTimer * _Nonnull timer) {
    [weakSelf testPrint];
}];
```

解决方式三，使用 NSProxy：

```objc
@interface MyProxy : NSProxy
- (instancetype)initWithTarget:(id)target;
@property (weak, readonly, nonatomic) id weakTarget;
@end

@implementation MyProxy
- (instancetype)initWithTarget:(id)target {
    _weakTarget = target;
    return self;
}

- (void)forwardInvocation:(NSInvocation *)invocation {
    SEL sel = [invocation selector];
    if (_weakTarget && [self.weakTarget respondsToSelector:sel]) {
        [invocation invokeWithTarget:self.weakTarget];
    }
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel {
    return [self.weakTarget methodSignatureForSelector:sel];
}

- (BOOL)respondsToSelector:(SEL)aSelector {
    return [self.weakTarget respondsToSelector:aSelector];
}
@end
```

调用：

```objc
self.timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:[[MyProxy alloc]initWithTarget:self] selector:@selector(testPrint) userInfo:nil repeats:YES];
```

# 离屏渲染

On-Screen Rendering: 当前屏幕渲染，指的是 GPU 的渲染操作是在当前用于显示的屏幕缓冲区中进行。

Off-Screen Rendering: 离屏渲染，GPU 离屏渲染指的是 GPU 在当前屏幕缓冲区外新开辟一个缓冲区进行渲染操作。

GPU 渲染机制：CPU 计算好显示内容提交到 GPU，GPU 渲染完成后将渲染结果放入帧缓冲区，随后视频控制器会按照 VSync 信号读取帧缓冲区的数据，传递给显示器显示。

如果要在显示屏上显示内容，我们至少需要一块与屏幕像素数据量一样大的 frame buffer，作为像素数据存储区域，而这也是 GPU 存储渲染结果的地方。如果有时因为面临一些限制，无法把渲染结果直接写入 frame buffer，而是先暂存在另外的内存区域，之后再写入 frame buffer，那么这个过程被称之为离屏渲染。

<https://github.com/seedante/iOS-Note/wiki/Mastering-Offscreen-Render>

直接将图层合成到 frame buffer 中（在屏幕上）比先创建屏幕外缓冲区，然后渲染到纹理中，最后将结果渲染到 frame buffer 中要廉价很多。因为这其中涉及两次昂贵的环境转换（转换环境到屏幕外缓冲区，然后转换环境到 frame buffer）。

会触发离屏渲染的效果，在同等数量的规模下，对性能的影响等级：Shadow > RoundedCorner > Mask > GroupOpacity。

Core Animation Instruments 监测离屏渲染：

1. Color Offscreen-Rendered Yellow，开启后会把那些需要离屏渲染的图层高亮成黄色，这就意味着黄色图层可能存在性能问题。
2. Color Hits Green and Misses Red，如果 shouldRasterize 被设置成 YES，对应的渲染结果会被缓存，如果图层是绿色，就表示这些缓存被复用；如果是红色就表示缓存会被重复创建，这就表示该处存在性能问题了。

优化方案：

```
view.layer.shouldRasterize = true
```

开启 Rasterization 后，GPU 只合成一次内容，然后复用合成的结果。