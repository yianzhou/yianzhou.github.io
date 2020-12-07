---
title: "Semaphore"
categories: [Apple]
---

# 工作原理

[A Quick Look at Semaphores in Swift 🚦](https://medium.com/swiftly-swift/a-quick-look-at-semaphores-6b7b85233ddb#.61uw6lq2d)

信号量由两部分组成：

- 计数器，让信号量知道有多少个线程能使用它的资源
- FIFO 队列，用来追踪这些等待资源的线程

当信号量收到一个 `wait()` 时：

- 如果计数器大于零，代表本次请求可以放行，信号量会减一，然后给线程放行；
- 如果计数器等于零，代表本次请求不能放行，会把线程添加到它队列的末尾。

当信号量收到一个 `signal()` 时，会检查它的 FIFO 队列是否有线程存在：

- 如果有，那么信号量会把第一个线程取出来，给它放行；
- 如果没有，会增加它的计数器。

当一个线程发送一个 `wait()` 资源请求给信号量时，线程会冻结直到信号量给线程放行。（如果你在主线程这么做，整个 app 会冻结！）

```swift
import Foundation

let higherPriority = DispatchQueue.global(qos: .default)
let lowerPriority = DispatchQueue.global(qos: .background)

// 同时只允许一个线程访问资源
let semaphore = DispatchSemaphore(value: 1)

func asyncPrint(queue: DispatchQueue, symbol: String) {
  queue.async {
    print(queue.label + " wait")
    semaphore.wait()

    for i in 0...100 {
      print(symbol, i)
    }

    print(queue.label + " signal")
    semaphore.signal()
  }
}

asyncPrint(queue: higherPriority, symbol: "🚗")
asyncPrint(queue: lowerPriority, symbol: "🚴‍♀️")
```

# 优先级反转

在极少数情况下，处理器决定先执行低优先级的线程（这是真的，它的确会发生）。低优先级的线程被放行，高优先级的线程必须等待低优先级的线程完成。

# 饥饿

如果我们有一种像上面那样优先级反转的情况，高优先级的线程必须等待低优先级的线程，假设在我们的高优先级和低优先级线程之间还有 1000 多个中优先级的线程，大多数情况下，处理器会执行中优先级的线程，因为他们的优先级高于我们的低优先级线程。这种情况下，我们的高优先级线程，在 CPU 时间分配中，一直处于饥饿状态（Starvation）。

# 死锁

考虑以下这种情况，有两个资源 A 和 B，它们可以被独立使用，所以它们应该使用两个独立的信号量；如果它们会被一起使用，那么用同一个信号量就可以了。这时有两个线程，一个高优先级的线程需要先使用 A 然后使用 B、一个低优先级的线程需要先使用 B 再使用 A：

```swift
import UIKit

let higherPriority = DispatchQueue.global(qos: .userInitiated)
let lowerPriority = DispatchQueue.global(qos: .utility)

let semaphoreA = DispatchSemaphore(value: 1)
let semaphoreB = DispatchSemaphore(value: 1)

func asyncPrint(queue: DispatchQueue, firstResource: String, firstSemaphore: DispatchSemaphore, secondResource: String, secondSemaphore: DispatchSemaphore) {

  func requestResource(_ resource: String, with semaphore: DispatchSemaphore) {
    print("\(queue.label) waiting \(resource)")
    semaphore.wait()
  }

    queue.async {
        requestResource(firstResource, with: firstSemaphore)
        for i in 0...10 {
            print(queue.label, i, firstResource)
            if i == 5 {
                requestResource(secondResource, with: secondSemaphore)
                print(queue.label, i, secondResource)
                print("\(queue.label) releasing \(secondResource)")
                secondSemaphore.signal()
            }
        }
        print("\(queue.label) releasing \(firstResource)")
        firstSemaphore.signal()
  }
}

asyncPrint(queue: higherPriority, firstResource: "A", firstSemaphore: semaphoreA, secondResource: "B", secondSemaphore: semaphoreB)
asyncPrint(queue: lowerPriority, firstResource: "B", firstSemaphore: semaphoreB, secondResource: "A", secondSemaphore: semaphoreA)
```

正常情况下：

```
com.apple.root.user-initiated-qos waiting A // 高优线程等待 A
com.apple.root.utility-qos waiting B // 低优线程等待 B
com.apple.root.user-initiated-qos 0 A // 高优线程 A 资源被放行
com.apple.root.user-initiated-qos 1 A
com.apple.root.user-initiated-qos 2 A
com.apple.root.user-initiated-qos 3 A
com.apple.root.user-initiated-qos 4 A
com.apple.root.user-initiated-qos 5 A
com.apple.root.user-initiated-qos waiting B // 高优线程等待 B
com.apple.root.user-initiated-qos 5 B // 高优线程 B 资源被放行
com.apple.root.user-initiated-qos releasing B // 高优线程释放 B
com.apple.root.user-initiated-qos 6 A
com.apple.root.user-initiated-qos 7 A
com.apple.root.user-initiated-qos 8 A
com.apple.root.user-initiated-qos 9 A
com.apple.root.user-initiated-qos 10 A
com.apple.root.user-initiated-qos releasing A // 高优线程释放 A
com.apple.root.utility-qos 0 B // 低优线程 B 资源被放行
com.apple.root.utility-qos 1 B
com.apple.root.utility-qos 2 B
com.apple.root.utility-qos 3 B
com.apple.root.utility-qos 4 B
com.apple.root.utility-qos 5 B
com.apple.root.utility-qos waiting A // 低优线程等待 A
com.apple.root.utility-qos 5 A // 低优线程 A 资源被放行
com.apple.root.utility-qos releasing A // 低优线程释放 A
com.apple.root.utility-qos 6 B
com.apple.root.utility-qos 7 B
com.apple.root.utility-qos 8 B
com.apple.root.utility-qos 9 B
com.apple.root.utility-qos 10 B
com.apple.root.utility-qos releasing B // 低优线程释放 B
```

死锁情况：

```
com.apple.root.user-initiated-qos waiting A // 高优线程等待 A
com.apple.root.utility-qos waiting B // 低优线程等待 B
com.apple.root.user-initiated-qos 0 A // 高优线程 A 资源被放行
com.apple.root.user-initiated-qos 1 A
com.apple.root.utility-qos 0 B // 低优线程 B 资源被放行
com.apple.root.user-initiated-qos 2 A
com.apple.root.user-initiated-qos 3 A
com.apple.root.utility-qos 1 B
com.apple.root.user-initiated-qos 4 A
com.apple.root.user-initiated-qos 5 A
com.apple.root.utility-qos 2 B
com.apple.root.user-initiated-qos waiting B // 高优线程等待 B 资源，但由于 B 正在被低优线程使用，无法获得放行
com.apple.root.utility-qos 3 B
com.apple.root.utility-qos 4 B
com.apple.root.utility-qos 5 B
com.apple.root.utility-qos waiting A // 低优线程等待 A 资源，但由于 A 正在被高优线程使用，无法获得放行
```
