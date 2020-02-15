---
title: "Swift Semaphore"
categories: [Apple]
---

> 原文地址：<https://medium.com/swiftly-swift/a-quick-look-at-semaphores-6b7b85233ddb#.61uw6lq2d>

How Semaphores Work, three steps:

1. Whenever we would like to use one shared resource, we send a request to its semaphore;
2. Once the semaphore gives us the green light we can assume that the resource is ours and we can use it;
3. Once the resource is no longer necessary, we let the semaphore know by sending him a signal, allowing him to assign the resource to another thread.

When this resource is only one and can be used only by one thread at any given time, you can think of these request/signal as the resource **lock/unlock**.

信号量由两部分组成：

- 计数器，让信号量知道有多少个线程能使用它的资源
- FIFO 队列，用来追踪这些等待资源的线程

当信号量收到一个`wait()`时：

- 如果计数器大于零，代表本次请求可以放行，信号量会减一，然后给线程放行；
- 如果计数器等于零，代表本次请求不能放行，会把线程添加到它队列的末尾。

当信号量收到一个`signal()`时，会检查它的 FIFO 队列是否有线程存在：

- 如果有，那么信号量会把第一个线程拉出来，给它放行；
- 如果没有，会增加它的计数器。

当一个线程发送一个 `wait()` 资源请求给信号量时，线程会冻结直到信号量给线程放行。（如果你在主线程这么做，整个 app 会冻结！）

```
import Foundation
import PlaygroundSupport

let higherPriority = DispatchQueue.global(qos: .default)
let lowerPriority = DispatchQueue.global(qos: .background)

// 同时只允许一个线程访问资源
let semaphore = DispatchSemaphore(value: 1)

func asyncPrint(queue: DispatchQueue, symbol: String) {
  queue.async {
    print(queue.label + " wait")
    semaphore.wait()

    for i in 0...4 {
      print(symbol, i)
    }

    print(queue.label + " signal")
    semaphore.signal()
  }
}

asyncPrint(queue: higherPriority, symbol: "🚗")
asyncPrint(queue: lowerPriority, symbol: "🚴‍♀️")
```

**优先级反转**：在极少数情况下，处理器决定先执行低优先级的线程（这是真的，它的确会发生）。低优先级的线程被放行，高优先级的线程必须等待低优先级的线程完成。

**饥饿**：如果我们有一种像上面那样优先级反转的情况，高优先级的线程必须等待低优先级的线程，假设在我们的高优先级和低优先级线程之间还有 1000 多个中优先级的线程，大多数情况下，处理器会执行中优先级的线程，因为他们的优先级高于我们的低优先级线程。这种情况下，我们的高优先级线程，在 CPU 时间分配中，一直处于饥饿状态（Starvation）。

**死锁**：参考原文。
