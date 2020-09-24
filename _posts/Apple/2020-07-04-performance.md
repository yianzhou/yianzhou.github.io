---
title: "性能"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

# App 启动速度

### `main()`函数开始执行前

- 加载可执行文件（App 的.o 文件的集合）；
- 加载动态链接库 dyld，进行 rebase 指针调整和 bind 符号绑定；dyld 从可执行文件的依赖开始，递归加载所有依赖的动态链接库。
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

YYFPSLabel 采用这样的办法显示屏幕帧率。计算两次刷新的时间差，即可显示帧率。但计算到卡顿时，卡顿已经过去了，所以这种方法无法捕获到卡顿堆栈。

## 子线程 Ping

创建一个专门用于监控的子线程，通过信号量去 ping 主线程（ping 的时候主线程肯定是在 kCFRunLoopBeforeSources 和 kCFRunLoopAfterWaiting 之间）。每次检测时，设置 isResponse = false，然后派发任务到主线程中将 isResponse = true；接着子线程沉睡超时阙值时长，判断标志位是否成功设置，如果没有说明主线程发生了卡顿。ANREye 中就是使用子线程 Ping 的方式监测卡顿的。

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

```swift
class RunLoopObserver {
    static let shared = RunLoopObserver()

    private var runLoopObserver: CFRunLoopObserver?
    private let semaphore = DispatchSemaphore(value: 0)
    private var runLoopActivity: CFRunLoopActivity?

    init() {
        runLoopObserver = CFRunLoopObserverCreateWithHandler(kCFAllocatorDefault, CFRunLoopActivity.allActivities.rawValue, true, 0, {
            (observer: CFRunLoopObserver!, activity: CFRunLoopActivity) -> Void in
            self.runLoopActivity = activity
            self.semaphore.signal()
        })

        CFRunLoopAddObserver(CFRunLoopGetCurrent(), runLoopObserver, CFRunLoopMode.commonModes)

        DispatchQueue.global().async {
            while (true) {
                let result = self.semaphore.wait(timeout: .now() + 2.0)
                if result == .timedOut {
                    if self.runLoopActivity == .beforeSources || self.runLoopActivity == .afterWaiting {
                        // 获取卡顿堆栈
                        DispatchQueue.global(qos: .userInteractive).async {
                            let frames = BSBacktraceLogger.bs_backtraceOfMainThread()!
                            print(frames)
                        }
                    }
                }
            }
        }
    }

    deinit {
        CFRunLoopRemoveObserver(CFRunLoopGetCurrent(), runLoopObserver, CFRunLoopMode.commonModes)
    }
}
```

模拟卡顿的代码：

```swift
var pi = Double.pi
for _ in 1...100000000 {
    pi *= Double.pi
}
```

## CPU 占用过高

同时，我们也认为 CPU 过高也可能导致应用出现卡顿，所以在子线程检查主线程状态的同时，如果检测到 CPU 占用过高，会捕获当前的线程快照保存到文件中。目前微信应用中认为，单核 CPU 的占用超过了 80%，此时的 CPU 占用就过高了。<https://cloud.tencent.com/developer/article/1427933>

## 线上效果

主线程卡顿率：卡顿 uu/启动监测 uu，约为 1.25% 左右。人均卡顿 1.7-1.8 次。较差设备翻几倍。卡顿堆栈：

- OpenGL ES 特效相关代码
- keychain 读写
- 视图初始化、读取 bundle 图片

子线程卡顿率：卡顿 uu/启动监测 uu，约为 0.35% - 0.45% 左右。人均卡顿 1.2-1.4 次。较差设备翻几倍。卡顿堆栈：

- 学习词典的加载、写入

关于卡顿监测：一、卡顿信息收集不一定能看到造成卡顿的业务代码堆栈；二、就算看到了卡顿堆栈，也不一定能修复解决，要看业务需要、影响面和修复的成本/收益。因此，卡顿监测更多是作为一种监控和报警，从趋势来辅助判断，如果某一个版本突然升高，就要排查一下这个版本的改动哪些可能带来卡顿。

## [腾讯 Matrix](https://github.com/Tencent/matrix)

当前工具监控范围包括：崩溃、卡顿和爆内存，包含以下两款插件：

WCCrashBlockMonitorPlugin：基于 KSCrash 框架开发，具有业界领先的卡顿堆栈捕获能力，同时兼备崩溃捕获能力。

WCMemoryStatPlugin：一款性能优化到极致的爆内存（OOM）监控工具，能够全面捕获应用爆内存时的内存分配以及调用堆栈情况。

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

- 野指针：指针指向一块已回收的内存。
- 主线程卡顿/无响应：如果主线程超过系统规定的时间无响应，就会被 Watchdog 杀掉。这时，崩溃问题对应的异常编码是 0x8badf00d。
- 多线程问题：在子线程中进行 UI 更新可能会发生崩溃。多个线程进行数据的读取操作，因为处理时机不一致，比如有一个线程在置空数据的同时另一个线程在读取这个数据，可能会出现崩溃情况。
- 数组越界：在取数据索引时越界，或给数组添加了 nil
- 后台任务超时
- 内存消耗过高

捕获的方式：

1. Xcode - Organizer
2. 堆栈信息收集开源框架，如[PLCrashReporter](https://github.com/microsoft/plcrashreporter)和[KSCrash](https://github.com/kstenerud/KSCrash)，自己部署服务器监控。
3. 友盟、Fabric、Bugly，提供集成 SDK 及分析服务。

一些被系统杀掉的情况，我们可以通过[异常编码](https://en.wikipedia.org/wiki/Hexspeak)来分析。常见的就是如下三种：

- 0x8badf00d，表示 App 在一定时间内无响应而被 watchdog 杀掉的情况。
- 0xdeadfa11，表示 App 被用户强制退出。
- 0xc00010ff，表示 App 因为运行造成设备温度太高而被杀掉。

# 获取函数调用栈

系统接口可以获取当前线程调用栈，在 macOS App 执行以下代码：

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    // The return value describes the call stack backtrace of the current thread at the moment this method was called.
    NSArray<NSString *> *array = [NSThread callStackSymbols];
    NSLog(@"%@", array);
}

<!-- 2020-09-24 12:15:24.973516+0800 MacApp[3825:31267] (
	0   MacApp                              0x000000010000329a -[ViewController viewDidLoad] + 74
	1   AppKit                              0x00007fff2f196285 -[NSViewController _sendViewDidLoad] + 87
	2   AppKit                              0x00007fff2f17ca44 -[NSViewController _loadViewIfRequired] + 385
	3   AppKit                              0x00007fff2f17c888 -[NSViewController view] + 23
	4   AppKit                              0x00007fff2f3968ea -[NSWindow _contentViewControllerChanged] + 111
	5   Foundation                          0x00007fff34515473 -[NSObject(NSKeyValueCoding) setValue:forKey:] + 363
	6   AppKit                              0x00007fff2f3d4eaa -[NSWindow setValue:forKey:] + 111
	7   AppKit                              0x00007fff2f1c2845 -[NSIBUserDefinedRuntimeAttributesConnector establishConnection] + 256
	8   AppKit                              0x00007fff2f0f781a -[NSIBObjectData nibInstantiateWithOwner:options:topLevelObjects:] + 1328
	9   AppKit                              0x00007fff2f17dbce -[NSNib _instantiateNibWithExternalNameTable:options:] + 647
	10  AppKit                              0x00007fff2f17d852 -[NSNib _instantiateWithOwner:options:topLevelObjects:] + 143
	11  AppKit                              0x00007fff2f922898 -[NSStoryboard _instantiateControllerWithIdentifier:creator:storyboardSegueTemplate:sender:] + 483
	12  AppKit                              0x00007fff2f0dc34e NSApplicationMain + 705
	13  MacApp                              0x000000010000336f main + 47
	14  libdyld.dylib                       0x00007fff6bf3ecc9 start + 1
	15  ???                                 0x0000000000000003 0x0 + 3
) -->
```

但这个调用存在局限性，即当线程崩溃或卡住时，并不能获取到崩溃或卡顿时的栈帧信息。

要获取所有线程的调用栈，要依靠操作系统内核的用户接口。

```c
// 接口：
kern_return_t task_threads // 获取所有线程，Mach Task 即 BSD 进程，两者是一一对应关系。
(
	task_inspect_t target_task, // 当前任务（进程）
	thread_act_array_t *act_list, // 任务中所有线程的列表
	mach_msg_type_number_t *act_listCnt // 任务中所有线程的数量
);

// 调用：
mach_msg_type_number_t count;
thread_act_array_t list;
task_threads(mach_task_self(), &list, &count);

// 接口：
kern_return_t thread_get_state // 获取线程状态
(
	thread_read_t target_act, // 目标线程
	thread_state_flavor_t flavor, // 线程状态类型，和 CPU 架构有关
	thread_state_t old_state, // 获取线程调用栈寄存器
	mach_msg_type_number_t *old_stateCnt // 线程状态成员数组
);

// 调用：
mach_msg_type_number_t state_count = BS_THREAD_STATE_COUNT;
kern_return_t kr = thread_get_state(thread, BS_THREAD_STATE, (thread_state_t)&machineContext->__ss, &state_count);
```

> BSD(Berkeley Software Distribution) was initially called Berkeley Unix because it was based on the source code of the original Unix developed at Bell Labs.

那么操作系统是如何记录函数调用栈的呢？

![img](/assets/images/342px-Call_stack_layout.png)

函数调用时，首先将函数参数入栈、然后是返回地址、然后是帧内的本地变量。注意这个示意图的内存是向上增长的，而操作系统的栈区内存是从高地址往低地址向下增长的。其中栈指针指向栈的顶部；帧指针指向上一栈帧的帧指针，这样就可以递归回溯获取整个调用栈。

以上，我们获得了所有线程的调用栈，以及详细的函数地址信息，那么，如何将它符号化呢？

App 的可执行文件和系统的动态链接库都是 image（镜像），dyld 以镜像为单位进行加载。首先，我们通过 dyld 相关接口（定义在 mach-o/dyld.h 下）定位函数地址所在的镜像。然后，加载镜像的符号表及字符串表，通过匹配函数地址确定函数符号及名称。

![img](/assets/images/FRAUR-MORT-GIBA-W.png)

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

GPU 渲染机制：CPU 计算好显示内容提交到 GPU，GPU 渲染完成后将渲染结果放入帧缓冲区，随后视频控制器会按照 VSync 信号读取帧缓冲区的数据，传递给显示器显示。

如果要在显示屏上显示内容，我们至少需要一块与屏幕像素数据量一样大的 frame buffer，作为像素数据存储区域，而这也是 GPU 存储渲染结果的地方。如果有时因为面临一些限制，无法把渲染结果直接写入 frame buffer，而是先暂存在另外的内存区域，之后再写入 frame buffer，那么这个过程被称之为离屏渲染。

[objc.io - 绘制像素到屏幕上](https://objccn.io/issue-3-1/)

一般情况下，你需要避免离屏渲染，因为这是很大的消耗。直接将图层合成到帧的缓冲区中(在屏幕上)比先创建屏幕外缓冲区，然后渲染到纹理中，最后将结果渲染到帧的缓冲区中要廉价很多。因为这其中涉及两次昂贵的环境转换(转换环境到屏幕外缓冲区，然后转换环境到帧缓冲区)。

Instrument 的 Core Animation 工具有一个叫做 Color Offscreen-Rendered Yellow 的选项，它会将已经被渲染到屏幕外缓冲区的区域标注为黄色(这个选项在模拟器中也可以用)。同时记得检查 Color Hits Green and Misses Red 选项。绿色代表无论何时一个屏幕外缓冲区被复用，而红色代表当缓冲区被重新创建。

<https://github.com/seedante/iOS-Note/wiki/Mastering-Offscreen-Render>

CALayer 有三个视觉元素，中间的 contents 属性是这样声明的：`var contents: AnyObject?`，实际上它必须是一个 CGImage 才能显示。

![img](/assets/images/5f32.png)

在同等数量的规模下，对性能的影响等级：Shadow > RoundedCorner > Mask > GroupOpacity(迷之效果)。

任何时候优先考虑避免触发离屏渲染，无法避免时优化方案有两种：

Rasterization：适用于静态内容的视图，也就是内部结构和内容不发生变化的视图，对上面的所有效果而言，在实现成本以及性能上最均衡的。即使是动态变化的视图，开启 Rasterization 后能够有效降低 GPU 的负荷，不过在动态视图里是否启用还是看 Instruments 的数据。

规避离屏渲染，用其他手法来模拟效果，混合图层是个性能最好、耗能最少的通用优化方案，尤其对于 rounded corer 和 mask。

# 圆角

`cornerRadius` 的官方解释： By default, the corner radius does not apply to the image in the layer’s contents property; it applies only to the background color and border of the layer.

对于 `UIView`, `UIButton`, `UIScrollView`, `UITextView`，只需要 `view.layer.cornerRadius = 10.0;` 就可以设置圆角。只设置 `cornerRadius` 是不会引发离屏渲染的。

对于 `UILabel`：

```objc
    // 背景色圆角，注意是 label.layer.backgroundColor
    UILabel *label = [[UILabel alloc]initWithFrame:CGRectMake(100, 100, 100, 100)];
    label.text = @"Hello World!";
    label.layer.backgroundColor = UIColor.greenColor.CGColor;
    label.layer.cornerRadius = 10.0;
    [self.view addSubview:label];

    // 边框圆角
    UILabel *label2 = [[UILabel alloc]initWithFrame:CGRectMake(100, 300, 100, 100)];
    label2.text = @"Hello World!";
    label2.layer.borderColor = UIColor.greenColor.CGColor;
    label2.layer.borderWidth = 1.0;
    label2.layer.cornerRadius = 10.0;
    [self.view addSubview:label2];
```

`UIImageView` 添加圆角：

```objc
@implementation UIImageView (CornerRadius)
- (void)addCornersWithRadius:(CGFloat)radius {
    UIGraphicsBeginImageContextWithOptions(self.bounds.size, false, UIScreen.mainScreen.scale);
    CGContextRef context = UIGraphicsGetCurrentContext();
    UIBezierPath * path = [UIBezierPath bezierPathWithRoundedRect:self.bounds byRoundingCorners:UIRectCornerAllCorners cornerRadii:CGSizeMake(radius, radius)];
    CGContextAddPath(context, path.CGPath);
    CGContextClip(context);
    [self.image drawInRect:self.bounds];
    UIImage *output = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    self.image = output;
}
```
