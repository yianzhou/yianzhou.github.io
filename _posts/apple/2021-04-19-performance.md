---
title: "性能优化"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# Time Profiler

> [WWDC 2015 - Profiling in Depth](https://developer.apple.com/videos/play/wwdc2015/412/)
>
> [WWDC 2016 - Using Time Profiler in Instruments](https://developer.apple.com/videos/play/wwdc2016/418/)

You should do your time profiling on **release builds** to take advantage of the compiler optimizations. 其中一项编译器优化就是尾调用消除，下面会详细介绍。

使用技巧：

- 按住 option 键可展开至最深层调用栈
- 按 CPU 查看、按线程查看，可以检查我们的代码是否真正利用了多线程并发
- Self Weight: the amount of time that was spent within that method itself, and not some other method that it called

## How does Time Profiler works?

![img](/assets/images/167519af-1739-429e-bbf7-5535d7445fb6.png)

When that call is made to the `drawRect:` it will push a **call frame** onto the stack including return address from the link register and the previous value of the frame pointer. Now `drawRect:` knows how to return to its caller and restore the frame pointer. Next, we take the frame pointer set up to the new base. Then `drawRect:` will make room for its local variables and the compiler scratch space 暂存空间. Now we have a frame for `drawRect:`.

Next the code starts to run and we come down to `CGContextDrawPath` and it does the same thing. It pushes a frame onto the stack.

![img](/assets/images/76af6702-aa11-4e25-91cd-4e8978da25bc.png)

The way time profiler works, it uses a service in the kernel that will sample what the CPUs are doing at about 1000 times per second.

In this case, if we take a sample, we see that we're running inside of `CGContextDrawPath`. Then the kernal looks at the frame pointer register to see where the base of that function's frame is and find the return address of who called it. We can use the frame pointers that were pushed on the stack to find the base of `drawRect:` and then continuously go back through the stack until we hit the bottom. This is called **backtrace**. If we take enough of these and put them in the call tree view you can get a pretty good picture of what's going on inside of your application.

![img](/assets/images/b0a15964-67cd-4478-8c23-9645a58ac3bc.png)

Time Profiler's not actually measuring duration. It's not recording when the method starts, and then when it exits. It's aggregating the **samples** into a useful summary. So when you see time values in Time Profiler, that's the number of samples multiplied by the time between samples, which is 1 millisecond in most cases.

This does have some side effects. First, it doesn't distinguish between long running methods, and much faster methods that are called repetitively. Second, it doesn't necessarily capture everything. If you have really fast functions that aren't called very often, they won't appear in your call tree. But this is actually okay because they're not having an impact in how much work I have to be doing over time.

## Tail Call Elimination

You notice when `CGContextDrawPath` returns, `drawRect:` returns. The way it returns is it pops the stack frame, restores the previous value of the frame pointer and jumps back to the caller. The compiler makes optimization here. It's going to pop the `drawRect:` stack frame, restore the frame pointer and make a direct call back into `CGContextDrawPath`. From `CGContextDrawPath`'s perspective it was called directly from `drawLayer:inContext:` from UIKit.

This is called Tail Call Elimination who has some benefits. It saves stack memory. In the process of saving stack memory, it keeps the caches hot, that reuses the memory, the caches and data. It has a profound effect on recursive code, especially tail call recursive code, where a function or method calls itself as the last thing and then returns.

If you want to turn it off to show a cleaner stack trace you can turn it off by going in the build settings of the project and setting the compiler flag, the `CFLAGS=-fno-optimize-sibling-calls`.

## objc_msgSend

`objc_msgSend` implicitly gets inserted by the compiler whenever you use the square bracket notation or whenever you use the dot notation to access a property on an object. Its purpose is to look up the method implementation for the selector and invoke that method. That's how we do dynamic dispatch in Objective-C. `objc_msgSend` is extremely fast and does not push a stack frame.

通过**实测**发现，objc 的消息发送消耗了一定的 CPU 时间，我们希望优化这部分时间。**Method caching** was not as fast as **inlining**. What we really want in this case is that small method body to be inlined. You have alternatives: use C or C++. However, Swift is more ideal, because unlike Objective-C it is only dynamic when it needs to be. If you make sure that the performance critical classes are internal and you use **whole module optimization**, the compiler or the whole tool chain can determine when there's only one method implementation and inlines it right into the call site giving you some significant wins especially on the iterator case.

# Measuring Performance

> [WWDC 2015 - Performance on iOS and watchOS](https://developer.apple.com/videos/play/wwdc2015/230/)

Code Instrumentation: (Profiling in release builds but don't ship your instrumentation)

```swift
    @IBAction func showImageTapped(sender: UIButton) {
#if MEASURE_PERFORMANCE
        let startTime = CFAbsoluteTimeGetCurrent()
#endif
        let myData = Data(contentOfFile: self.path)!
        let myImage = self.watermarkedImageFromData(myData)
        self.imageView.image = myImage
#if MEASURE_PERFORMANCE
        let endTime = CFAbsoluteTimeGetCurrent()
        let totalTime = (endTime - startTime) * 1000
        print("showImageTappedTimed took \(totalTime) milliseconds”)
#endif
}
```

# Responsiveness

> [WWDC 2016 - Using Time Profiler in Instruments](https://developer.apple.com/videos/play/wwdc2016/418/)

The way your application works, is the main thread that does all the user interface work. It's responsible for responding to user input, and then updating your views. The main thread has a runloop that's just watching a queue called an Event Queue and waiting for events to appear on it. When an event appears, it sends it to your UIApplication instance, which then passes the event down through the responder chain in your application.

When busy, the main thread can't process the queue. And then as a result, you get stuttering and hiccups. So it's really important to keep your main thread free, so it's able to respond to the user input in a very quick manner.

# Ref

[Advancements in the Objective-C runtime](https://developer.apple.com/videos/play/wwdc2020/10163/)

[Identify trends with the Power and Performance API](https://developer.apple.com/videos/play/wwdc2020/10057/)

[Improving Battery Life and Performance](https://developer.apple.com/videos/play/wwdc2019/417/)

[Practical Approaches to Great App Performance](https://developer.apple.com/videos/play/wwdc2018/407/)

[Measuring Performance Using Logging](https://developer.apple.com/videos/play/wwdc2018/405)

[Love at First Launch](https://developer.apple.com/videos/play/wwdc2017/816)

[Unified Logging and Activity Tracing](https://developer.apple.com/videos/play/wwdc2016/721)
