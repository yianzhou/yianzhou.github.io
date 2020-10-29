---
title: "卡顿监测及性能"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

[WWDC 2018 - Practical Approaches to Great App Performance](https://developer.apple.com/videos/play/wwdc2018/407/)

# CADisplayLink

```swift
link = CADisplayLink(target: WeakProxy.init(target: self), selector: #selector(FPSLabel.tick(link:)))
link.add(to: RunLoop.main, forMode: .commonModes)
```

YYFPSLabel 采用这样的办法显示屏幕帧率。计算两次刷新的时间差，即可显示帧率。但计算到卡顿时，卡顿已经过去了，所以这种方法无法捕获到卡顿堆栈。

# 子线程 Ping

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

# RunLoop 监听

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

# CPU 占用过高

同时，我们也认为 CPU 过高也可能导致应用出现卡顿，所以在子线程检查主线程状态的同时，如果检测到 CPU 占用过高，会捕获当前的线程快照保存到文件中。目前微信应用中认为，单核 CPU 的占用超过了 80%，此时的 CPU 占用就过高了。<https://cloud.tencent.com/developer/article/1427933>

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

# 线上效果

主线程卡顿率：卡顿 uu/启动监测 uu，约为 1.25% 左右。人均卡顿 1.7-1.8 次。较差设备翻几倍。卡顿堆栈：

- OpenGL ES 特效相关代码
- keychain 读写
- 视图初始化、读取 bundle 图片

子线程卡顿率：卡顿 uu/启动监测 uu，约为 0.35% - 0.45% 左右。人均卡顿 1.2-1.4 次。较差设备翻几倍。卡顿堆栈：

- 学习词典的加载、写入

关于卡顿监测：一、卡顿信息收集不一定能看到造成卡顿的业务代码堆栈；二、就算看到了卡顿堆栈，也不一定能修复解决，要看业务需要、影响面和修复的成本/收益。因此，卡顿监测更多是作为一种监控和报警，从趋势来辅助判断，如果某一个版本突然升高，就要排查一下这个版本的改动哪些可能带来卡顿。
