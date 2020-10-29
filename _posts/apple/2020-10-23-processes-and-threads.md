---
title: "进程和线程"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# GCD

[WWDC 2017 - Modernizing Grand Central Dispatch Usage](https://developer.apple.com/videos/play/wwdc2017/706)

FIFO 队列。串行队列一个接一个执行；并行队列，按 FIFO 原则出列，可以并发执行，返回顺序无法预计。

需注意，避免因为并发而创建过多的线程，会占用大量内存和资源。

# IPC 跨进程通信

1\. AirDrop

2\. UIDocumentInteractionController

可进程间传输**文档**，预览、打印、发邮件等。

[iOS SDK: Previewing and Opening Documents](https://code.tutsplus.com/tutorials/ios-sdk-previewing-and-opening-documents--mobile-15130)

3\. UIActivityViewController

4\. Keychain

5\. App Groups

6\. UIPasteboard

7\. URLScheme

8\. Local socket

进程 A 对某一个端口进行绑定、监听，进程 B 进行 TCP 连接。

> <https://nshipster.com/inter-process-communication/> （不仅是 iOS，也有 macOS，针对整个苹果生态）

# 多线程

[Parallel programming with Swift: Operations](https://medium.com/flawless-app-stories/parallel-programming-with-swift-operations-54cbefaf3cb0)

Concurrency 并发: A condition that exists when at least two threads are making progress. Single-core devices can achieve concurrency through time-slicing. 单核 CPU 通过分时策略实现并发。

Parallelism 并行: A condition that arises when at least two threads are executing simultaneously. Multi-core devices execute multiple threads at the same time via parallelism.

# 锁

iOS 中可以用的锁：

- pthread_mutex_lock: 底层 pthread 级别加锁
- @synchronized
- DispatchSemaphore
- NSLock, NSRecursiveLock, NSConditionLock: 对 pthread_mutex_lock 的封装
- OSSpinLock, os_unfair_lock

![image](/assets/images/lock_benchmark.png)

<https://blog.ibireme.com/2016/01/16/spinlock_is_unsafe_in_ios/>

<https://juejin.im/post/6844903543527178248>

# 线程间通信

1. `performSelector:onThread:withObject:waitUntilDone:`
2. GCD
