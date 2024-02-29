# 卡顿

> [WWDC 2018 - Practical Approaches to Great App Performance](https://developer.apple.com/videos/play/wwdc2018/407/)
>
> [iOS 性能监控 SDK](https://github.com/aozhimin/iOS-Monitor-Platform#freezinglag)

## 卡顿原因

可能导致主线程卡顿的原因：

- 主线程运算量过大：大量 UI 绘制、大量计算。
- 主线程进行了耗时的 I/O 操作。
- 死锁、主子线程抢锁、等待子线程同步块。

## CADisplayLink

```swift
link = CADisplayLink(target: WeakProxy.init(target: self), selector: #selector(FPSLabel.tick(link:)))
link.add(to: RunLoop.main, forMode: .commonModes)
```

YYFPSLabel 采用这样的办法显示屏幕帧率。计算两次刷新的时间差，即可显示帧率。但计算到卡顿时，卡顿已经过去了，所以这种方法无法捕获到卡顿堆栈。

## 子线程 Ping

创建一个专门用于监控的子线程去 ping 主线程。

[iOS 卡顿监控实战（开源）](https://juejin.cn/post/6844904005437489165)

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
                // 避免重复上报，一次卡顿仅记录一次（这里与微信 RunLoop 方案有比较大的区别，微信会按照斐波拉契间隔重复上报）
                _ = semaphore.wait(timeout: DispatchTime.distantFuture)
            }
        }
    }
}
```

## RunLoop 监听

[如何利用 RunLoop 原理去监控卡顿？](https://time.geekbang.org/column/article/89494)

A `CFRunLoopObserver` provides a general means to receive callbacks at different points within a running run loop. In contrast to sources, which fire when an asynchronous event occurs, and timers, which fire when a particular time passes, observers fire at special locations within the execution of the run loop, such as before sources are processed or before the run loop goes to sleep, waiting for an event to occur.

创建一个常驻的子线程，在子线程初始化时，注册 `CFRunLoopObserverContext` 观察者，并将其添加到主线程 RunLoop 的 common 模式下观察。

主线程 RunLoop 状态的每一次变迁，都会做两件事情：1. `runLoopActivity` 写入子线程实例变量中记录；2. 向子线程的信号量发出信号。

<div class="mermaid">
graph LR
    sleep1[休眠] --> AfterWaiting
    subgraph 发生卡顿时
    AfterWaiting --> BeforeTimer
    BeforeTimer --> BeforeSource
    end
    subgraph 没有发生卡顿时
    BeforeWaiting
    end
    BeforeSource --> BeforeWaiting
    BeforeWaiting --> sleep2[休眠]
</div>

子线程的 `main` 函数是一个 `while` 循环，信号量每次等待 2.0 秒的阈值时间，或者收到信号，或者超时。

<div class="mermaid">
graph LR
    等待 --> 超时
    等待 --> 收到信号
    subgraph 代表主线程在处理任务
    lag[AfterWaiting,BeforeTimer,BeforeSource]
    end
    超时 --> lag
    lag --> backtrace["获取并记录卡顿堆栈"]
    subgraph 代表主线程已进入休眠
    BeforeWaiting
    end
    超时 --> BeforeWaiting
    BeforeWaiting --> 进入下次循环体
    收到信号 --> 进入下次循环体
</div>

```swift
import Foundation

class MonitorThread: Thread {
    private var runLoopObserver: CFRunLoopObserver?
    private let semaphore = DispatchSemaphore(value: 0)
    private var runLoopActivity: CFRunLoopActivity?

    override init() {
        super.init()
        // Creates a CFRunLoopObserver object with a block-based handler.
        runLoopObserver = CFRunLoopObserverCreateWithHandler(
            kCFAllocatorDefault, // The allocator to use to allocate memory for the new object.
            CFRunLoopActivity.allActivities.rawValue, // Set of flags identifying the activity stages of the run loop during which the observer is called.
            true, // A flag identifying whether the observer is called only once or every time through the run loop.
            0, // A priority index indicating the order in which run loop observers are processed.
            {
                [weak self] (observer: CFRunLoopObserver!, activity: CFRunLoopActivity) -> Void in
                // 在主线程回调
                self?.runLoopActivity = activity
                self?.semaphore.signal()
            })
        CFRunLoopAddObserver(CFRunLoopGetMain(), runLoopObserver, CFRunLoopMode.commonModes)
    }

    override func main() {
        while (true) {
            autoreleasepool {
                let result = self.semaphore.wait(timeout: .now() + 2.0)
                if result == .timedOut {
                    if (self.runLoopObserver == nil) {
                        return
                    }
                    if let activity = self.runLoopActivity {
                        // 没有发生卡顿时，每 2 秒 timeout 一次，此时的 runLoopActivity 应该是 .beforeWaiting
                        print(activity)
                    }
                    if self.runLoopActivity == .beforeTimers || self.runLoopActivity == .beforeSources || self.runLoopActivity == .afterWaiting {
                        // 在这里获取全线程堆栈并上传
                        if let backtrace = BSBacktraceLogger.bs_backtraceOfMainThread() {
                            print(backtrace)
                        }
                        // 为了对键盘性能影响最小化，检测到卡顿后继续等待信号量，不再重复记录堆栈。
                        let _ = self.semaphore.wait()
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

参考：[戴铭 - SMLagMonitor](https://github.com/ming1016/DecoupleDemo/blob/master/DecoupleDemo/SMLagMonitor.m)；卡顿堆栈的捕获：[BSBacktraceLogger](https://github.com/bestswifter/BSBacktraceLogger)，[PLCrashReporter](https://github.com/microsoft/plcrashreporter)。

## CPU 占用过高

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

## 线上效果

常见卡顿堆栈：

- OpenGL ES 特效相关代码
- Keychain 读写
- 视图初始化、读取 Bundle 图片
- 资源的加载、写入

卡顿堆栈，不一定能修复解决，要看业务需要、影响面和修复的成本/收益。卡顿率可以作为日常监控和报警项，它的趋势可以辅助判断线上问题，如果某一个版本突然升高，就要排查一下这个版本的改动点，哪些可能带来卡顿。
