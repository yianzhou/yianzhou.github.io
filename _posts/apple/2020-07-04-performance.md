---
title: "卡顿监测及性能"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

[WWDC 2018 - Practical Approaches to Great App Performance](https://developer.apple.com/videos/play/wwdc2018/407/)

[Matrix-iOS 卡顿监控](https://cloud.tencent.com/developer/article/1427933)

[如何利用 RunLoop 原理去监控卡顿？](https://time.geekbang.org/column/article/89494)

# 卡顿原因

可能导致主线程卡顿的原因：

- 界面绘制计算量太大（如大量图文混排等复杂的 UI）
- 主线程同步请求网络、等待子线程同步块
- 主线程执行大量 IO 操作或计算
- 总运算量过大，CPU 持续高占用
- 死锁、主子线程抢锁

# CADisplayLink

```swift
link = CADisplayLink(target: WeakProxy.init(target: self), selector: #selector(FPSLabel.tick(link:)))
link.add(to: RunLoop.main, forMode: .commonModes)
```

YYFPSLabel 采用这样的办法显示屏幕帧率。计算两次刷新的时间差，即可显示帧率。但计算到卡顿时，卡顿已经过去了，所以这种方法无法捕获到卡顿堆栈。

# 子线程 Ping

创建一个专门用于监控的子线程去 ping 主线程。

[iOS卡顿监控实战（开源）](https://juejin.cn/post/6844904005437489165)

针对同一个卡顿只会上报一次，并没有像微信那样重复上报。一是出于我们本身业务考虑；二是上报使用的 Fabric，它会在下一次启动时将所有记录数据推到平台，并且对于上报量有限制。

```swift
private final class PingMainThread: Thread {
    override func main() {
        while !isCancelled {
            autoreleasepool {
                isResponse = false
                // 主线程同步标志位，同时释放信号量
                DispatchQueue.main.async {
                    self.isResponse = true
                    self.semaphore.signal()
                }
                // 暂停指定间隔，检验此时标志位是否修改，没有修改则说明线程卡顿，需要上报
                Thread.sleep(forTimeInterval: TimeInterval(threshold))
                if !isResponse {
                    // 获取所有线程
                    // 获取线程栈寄存器，获得指令地址
                }
                // 避免重复上报，一次卡顿仅上报一次（这里与微信runloop方案有比较大的区别，微信会按照斐波拉契间隔重复上报）
                _ = semaphore.wait(timeout: DispatchTime.distantFuture)
            }
        }
    }
}
```

# RunLoop 监听

A `CFRunLoopObserver` provides a general means to receive callbacks at different points within a running run loop. In contrast to sources, which fire when an asynchronous event occurs, and timers, which fire when a particular time passes, observers fire at special locations within the execution of the run loop, such as before sources are processed or before the run loop goes to sleep, waiting for an event to occur.

要想监听 RunLoop，首先需要创建一个 CFRunLoopObserverContext 观察者，将创建好的观察者添加到主线程 RunLoop 的 common 模式下观察。然后，创建一个持续运行的子线程专门用来监控主线程的 RunLoop 状态。

一旦发现进入睡眠前的 kCFRunLoopBeforeSources 状态，或者唤醒后的状态 kCFRunLoopAfterWaiting，在设置的时间阈值内一直没有变化，即可判定为卡顿。

参考：<https://github.com/ming1016/DecoupleDemo/blob/master/DecoupleDemo/SMLagMonitor.m>

卡顿堆栈的捕获：[BSBacktraceLogger](https://github.com/bestswifter/BSBacktraceLogger)，[PLCrashReporter](https://github.com/microsoft/plcrashreporter) 等开源框架均有实现。

```swift
import Foundation

class RunLoopObserver {
    static let shared = RunLoopObserver()

    private var runLoopObserver: CFRunLoopObserver?
    private let semaphore = DispatchSemaphore(value: 0)
    private var runLoopActivity: CFRunLoopActivity?

    private init() {
        // Creates a CFRunLoopObserver object with a block-based handler.
        runLoopObserver = CFRunLoopObserverCreateWithHandler(
            kCFAllocatorDefault, // The allocator to use to allocate memory for the new object.
            CFRunLoopActivity.allActivities.rawValue, // Set of flags identifying the activity stages of the run loop during which the observer is called.
            true, // A flag identifying whether the observer is called only once or every time through the run loop.
            0, // A priority index indicating the order in which run loop observers are processed.
            {
                (observer: CFRunLoopObserver!, activity: CFRunLoopActivity) -> Void in
                self.runLoopActivity = activity
                self.semaphore.signal()
            })

        CFRunLoopAddObserver(CFRunLoopGetMain(), runLoopObserver, CFRunLoopMode.commonModes)

        DispatchQueue.global().async {
            while (true) {
                let result = self.semaphore.wait(timeout: .now() + 2.0)
                if result == .timedOut {
                    if (self.runLoopObserver == nil) {
                        return
                    }
                    if self.runLoopActivity == .beforeSources || self.runLoopActivity == .afterWaiting {
                        DispatchQueue.global(qos: .userInteractive).async {
                            // 获取卡顿堆栈
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

# CPU 占用过高

我们也认为 CPU 过高也可能导致应用出现卡顿，所以在子线程检查主线程 RunLoop 状态的同时，如果检测到 CPU 占用过高，会捕获当前的线程快照保存到文件中。目前微信应用中认为，单核 CPU 的占用超过了 80%，此时的 CPU 占用就过高了。

```c
#import <mach/mach.h>
+ (integer_t)cpuUsage {
    thread_act_array_t threads; // 所有线程的列表，int 组成的数组比如 thread[1] = 5635
    mach_msg_type_number_t threadCount = 0; // 任务中所有线程的数量
    kern_return_t kr = task_threads(mach_task_self(), &threads, &threadCount);
    integer_t cpuUsage = 0;
    if (kr == KERN_SUCCESS) {
        for (int i = 0; i < threadCount; i++) {
            thread_info_data_t threadInfo;
            thread_basic_info_t threadBaseInfo;
            mach_msg_type_number_t threadInfoCount = THREAD_INFO_MAX;
            if (thread_info((thread_act_t)threads[i], THREAD_BASIC_INFO, (thread_info_t)threadInfo, &threadInfoCount) == KERN_SUCCESS) {
                // 获取 CPU 使用率
                threadBaseInfo = (thread_basic_info_t)threadInfo;
                if (!(threadBaseInfo->flags & TH_FLAGS_IDLE)) {
                    cpuUsage += threadBaseInfo->cpu_usage;
                }
            }
        }
        assert(vm_deallocate(mach_task_self(), (vm_address_t)threads, threadCount * sizeof(thread_t)) == KERN_SUCCESS);
    }
    return cpuUsage;
}
```

内存占用、FPS、CPU 的性能监控方案，它们的代码和业务逻辑是完全解耦的，监控时基本都是直接获取系统本身提供的数据，没有额外的计算量，因此对 App 本身的性能影响也非常小。

# [腾讯 Matrix](https://github.com/Tencent/matrix)

当前工具监控范围包括：崩溃、卡顿和爆内存，包含以下两款插件：

WCCrashBlockMonitorPlugin：基于 KSCrash 框架开发，具有业界领先的卡顿堆栈捕获能力，同时兼备崩溃捕获能力。

WCMemoryStatPlugin：一款性能优化到极致的爆内存（OOM）监控工具，能够全面捕获应用爆内存时的内存分配以及调用堆栈情况。

为了降低检测带来的性能损耗，我们为检测线程增加了退火算法。

每次子线程检查到主线程卡顿，会先获得主线程的堆栈并保存到内存中，然后，将获得的主线程堆栈与上次卡顿获得的主线程堆栈进行比对：

- 如果堆栈不同，则将线程快照并写入文件中；
- 如果堆栈相同，则跳过，并按照斐波那契数列将检查时间递增，直到没有遇到卡顿或者主线程卡顿堆栈不一样。

这样，可以避免同一个卡顿写入多个文件的情况；避免检测线程遇到主线程卡死的情况下，不断写线程快照文件。

# 线上效果

主线程卡顿率：卡顿 UU / 启动监测 UU，约为 1.25% 左右。人均卡顿 1.7 次左右。较差设备翻几倍。卡顿堆栈：

- OpenGL ES 特效相关代码
- Keychain 读写
- 视图初始化、读取 Bundle 图片

子线程卡顿率：卡顿 UU / 启动监测 UU，约为 0.35% - 0.45% 左右。人均卡顿 1.2-1.4 次。较差设备翻几倍。卡顿堆栈：

- 学习词典的加载、写入

卡顿堆栈，不一定能修复解决，要看业务需要、影响面和修复的成本/收益。卡顿率可以作为日常监控和报警项，它的趋势可以辅助判断线上问题，如果某一个版本突然升高，就要排查一下这个版本的改动点，哪些可能带来卡顿。
