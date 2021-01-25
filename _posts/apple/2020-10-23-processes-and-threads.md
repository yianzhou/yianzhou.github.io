---
title: "进程和线程"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# GCD

[WWDC 2017 - Modernizing Grand Central Dispatch Usage](https://developer.apple.com/videos/play/wwdc2017/706)

Dispatch queues 都是 FIFO 队列！串行队列，按 FIFO 原则出列，一个接一个执行；并行队列，按 FIFO 原则出列，可以并发执行，返回顺序无法预计。

When designing tasks for concurrent execution, **do not call methods that block the current thread of execution**. When a task scheduled by a concurrent dispatch queue blocks a thread, the system creates additional threads to run other queued concurrent tasks. If too many tasks block, the system may run out of threads for your app. 需注意，不要调用会阻塞线程的方法，这样会导致系统创建过多的线程，占用大量内存和资源、甚至耗尽。

Another way that apps consume too many threads is by creating too many private concurrent dispatch queues. Because each dispatch queue consumes thread resources, creating additional concurrent dispatch queues exacerbates the thread consumption problem. Instead of creating private concurrent queues, submit tasks to one of the global concurrent dispatch queues. For serial tasks, set the target of your serial queue to one of the global concurrent queues. That way, you can maintain the serialized behavior of the queue while minimizing the number of separate queues creating threads. 需注意，尽量不要自行创建并发队列，而是尝试利用系统的全局并发队列。对于串行队列，设置其目标为全局并发队列中的一个，既可以保证串行执行的特性，又减少了新建线程。

The system automatically creates the main queue and associates it with your application’s main thread. 系统会自动创建主队列，并将其与应用程序的主线程关联。主队列只有一个工作线程，就是主线程。

## dispatch_async

`dispatch_async` Calls to this function always return immediately after the block has been submitted and never wait for the block to be invoked. The target queue determines whether the block is invoked serially or concurrently with respect to other blocks submitted to that same queue. Independent serial queues are processed concurrently with respect to each other.

The queue is retained by the system until the block has run to completion. This function performs `Block_copy` and `Block_release` on behalf of callers.

## dispatch_sync

`dispatch_sync` This function does not return until the block has finished. Calling this function and targeting the current queue results in **deadlock**. Unlike with `dispatch_async`, no retain is performed on the target queue. Because calls to this function are synchronous, it "borrows" the reference of the caller. Moreover, no `Block_copy` is performed on the block.

在主线程往主队列里派发一个同步任务，就会死锁！

```objc
dispatch_sync(dispatch_get_main_queue(), ^{
    NSLog(@"never going to execute...");
});
```

在串行队列里执行的代码，如果有派发到当前队列的同步块，也会造成死锁！

```objc
- (void)asyncWithSerialQueuePrint2 {
    NSLog(@"1");
    dispatch_async(self.serialQueue, ^{
        NSLog(@"2");
        dispatch_sync(self.serialQueue, ^{
            NSLog(@"3");
        });
        NSLog(@"4");
    });
    NSLog(@"5");
    // 1 - 5 - 2 - 死锁
    // 或者
    // 1 - 2 - 5 - 死锁
}
```

**As a performance optimization, this function executes blocks on the current thread whenever possible, with one obvious exception. Specifically, blocks submitted to the main dispatch queue always run on the main thread.**

在主线程使用 `dispatch_sync`，不管派发到主队列还是子队列，都在主线程执行！！

```objc
// 主线程
dispatch_sync(任意队列, ^{
    // 在主线程执行！
});
```

在子线程使用 `dispatch_sync`，在当前线程执行！有一个例外，如果提交到主队列的话，在主线程执行！

## dispatch_barrier_async

并发读，栅栏写！（见 [DemoGCD](https://github.com/yianzhou/ios-demos/)）`dispatch_barrier_async` The queue you specify should be a concurrent queue that you create yourself using the `dispatch_queue_create` function. If the queue you pass to this function is a serial queue or one of the global concurrent queues, this function behaves like the `dispatch_async` function. 栅栏函数要配合自己创建的并发队列使用！！

# IPC 跨进程通信

由于 iOS 的沙盒机制，每个进程都在独立的沙盒中运行，与其它进程的通信相对受限，主要是通过系统的接口。例如：

`UIDocumentInteractionController` 可以传输文档、预览、打印、发邮件等，参考 [iOS SDK: Previewing and Opening Documents](https://code.tutsplus.com/tutorials/ios-sdk-previewing-and-opening-documents--mobile-15130)。

`UIActivityViewController` 提供了分享内容的方法，包括 AirDrop 等。

`UIPasteboard` 可以访问剪贴板。

`Keychain` 提供钥匙串访问。

访问 Application Group 共享的文件夹：`FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: kAppGroupIdentifier)`。

在共享区存储 UserDefaults：`UserDefaults(suiteName: kAppGroupIdentifier)`。

URLScheme 和 Universal Links 通过深链接 URL 传递信息。

macOS 上还可以通过 local socket，进程 A 对某一个端口进行绑定、监听，进程 B 进行 TCP 连接。参考：[Inter-Process Communication](https://nshipster.com/inter-process-communication/)（不仅是 iOS，也有 macOS，针对整个苹果生态）。

# 多线程

[Parallel programming with Swift: Operations](https://medium.com/flawless-app-stories/parallel-programming-with-swift-operations-54cbefaf3cb0)

Concurrency 并发: A condition that exists when at least two threads are making progress. Single-core devices can achieve concurrency through time-slicing. 单核 CPU 通过分时策略实现并发。

Parallelism 并行: A condition that arises when at least two threads are executing simultaneously. Multi-core devices execute multiple threads at the same time via parallelism.

# 原子操作

某些简单的表达式例如 `i += 1`，其实编译之后的得到的汇编指令，不止一条，所以他们并不是原子操作。

原子操作一定是在同一个 CPU 时间片中完成，这样即使线程被切换，多个线程也不会看到同一块内存中不完整的数据。

# 锁

[不再安全的 OSSpinLock](https://blog.ibireme.com/2016/01/16/spinlock_is_unsafe_in_ios/)

[线程同步及线程锁](https://juejin.im/post/6844903543527178248)

iOS 有 5 个不同的线程优先级（DispatchQoS.QoSClass），大多数情况下，高优先级的线程会比低优先级的线程先执行；但在少数情况下，会存在优先级反转的情况。`OSSpinLock` 在优先级反转的情况下存在严重问题，除非开发者能保证访问锁的线程全部处于同一优先级，否则 iOS 系统中所有类型的自旋锁都不能再使用了。

在 iOS 10 / macOS 10.12 发布时，苹果提供了新的 `os_unfair_lock` 作为 `OSSpinLock` 的替代，并且将 `OSSpinLock` 标记为了 Deprecated。

一个简单的[性能测试](https://github.com/ibireme/tmp/blob/master/iOSLockBenckmark/iOSLockBenckmark/ViewController.m)，对比了一下几种能够替代 OSSpinLock 锁的性能。测试是在 iPhone 6、iOS 9 上跑的，只是测试了单线程的情况，不能反映多线程下的实际性能，所以这个结果只能当作一个定性分析。

![img-80](/assets/images/lock_benchmark.png)

SDWebImage 中主要用到 `os_unfair_lock`、`dispatch_semaphore`、`@synchronized` 这几种锁。

`pthread_mutex_lock`，pthread 中的互斥锁，具有跨平台性质，又可分为普通锁、检错锁、递归锁。当锁处于占用状态时，其他线程会挂起；当锁被释放时，所有等待的线程都将被唤醒，再次对锁进行竞争。在挂起与唤醒过程中，涉及用户态与内核态之间的上下文切换，而这种切换是比较消耗性能的。

`OSSpinLock`（自旋锁）已废弃，`os_unfair_lock` 作为替代。

自旋锁与互斥锁有点类似，只是自旋锁被某线程占用时，其他线程不会进入睡眠/挂起状态，而是一直运行（自旋/空转）直到锁被释放。由于不涉及用户态与内核态之间的切换，它的效率远远高于互斥锁。但相应地，会一直占用 CPU，如果不能在很短的时间内获得锁，无疑会使 CPU 整体效率降低。

`@synchronized` 使用后，会在代码块前面插入 `objc_sync_enter`，代码块最后插入 `objc_sync_exit`。其核心逻辑是 `recursive_mutex_lock` 和 `recursive_mutex_unlock`，这两个函数在苹果私有库当中，从文档中得知是基于递归类型的 pthread_mutex 的。

`NSLock`, `NSRecursiveLock`：`NSLock` 是对 `pthread_mutex_lock` 的封装，是普通类型的互斥锁；如果用在需要递归嵌套加锁的场景时，需要使用其子类 `NSRecursiveLock`。

# 几种锁的使用

同步块使用：

```objc
@synchronized (self) {
    callbacks = [[self.callbackBlocks valueForKey:key] mutableCopy];
}
```

信号量加锁：

```objc
dispatch_semaphore_t lock = dispatch_semaphore_create(1);
dispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER); // 等待和发出信号必须对称！重复调用 wait 不会崩溃，但会造成无限的等待……
NSLog(@"safe here ...");
dispatch_semaphore_signal(lock);
```

os_unfair_lock 使用：

```objc
#import <os/lock.h>
os_unfair_lock lock = OS_UNFAIR_LOCK_INIT;
os_unfair_lock_lock(&lock); // 加锁和解锁必须对称，重复加锁会直接崩溃！
NSLog(@"safe here ...");
os_unfair_lock_unlock(&lock);
```
