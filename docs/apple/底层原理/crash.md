# 崩溃

[iOS Crash Dump Analysis, Second Edition](https://faisalmemon.github.io/ios-crash-dump-analysis-book/en/)

> [Diagnosing Issues Using Crash Reports and Device Logs](https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs)

## Exception Types

> [Understanding the Exception Types in a Crash Report](https://developer.apple.com/documentation/xcode/diagnosing_issues_using_crash_reports_and_device_logs/understanding_the_exception_types_in_a_crash_report?language=objc)

苹果官方已经有明确的崩溃分类了，我们收集上来的崩溃也是按照以下类型来分类的，这些异常类型定义在 `mach/exception_types.h` 里。

### EXC_BREAKPOINT (SIGTRAP)

The breakpoint exception type indicates a trace trap interrupted the process. A trace trap gives an attached debugger the chance to interrupt the process at a specific point in its execution. 断点调试

The Swift runtime uses trace traps for specific types of unrecoverable errors. Swift 强解包或强转类型。

Some lower-level libraries, such as Dispatch, trap the process with this exception upon encountering an unrecoverable error. 底层库例如 Dispatch 遇到的不可恢复的错误。

On x86_64 processors, this appears as EXC_BAD_INSTRUCTION (SIGILL).

### EXC_BAD_ACCESS (SIGSEGV)

This is an execute bad access exception, the segment violation signal. A crash due to a memory access issue occurs when an app uses memory in an unexpected way. Memory access problems have numerous causes, such as dereferencing a pointer to an invalid memory address, jumping to an instruction at an invalid address, or writing to read-only memory.

`EXC_BAD_ACCESS` 崩溃时还会带有一个错误码，定义在 `mach/kern_return.h` 里。最常见的就是以下两种：

- `KERN_INVALID_ADDRESS`. Specified address is not currently valid.
- `KERN_PROTECTION_FAILURE`. Specified memory is valid, but does not permit the required forms of access.

代码复现：

```objc
memcpy(NULL, "Hello", 5); // code=1, address=0x0
NSLog(@"%@", 1); // code=1, address=0x1
```

![img](/assets/images/C93290DE-203F-4B7F-A300-6C68D207C142.png)

See [Memory Errors](#memory-errors).

### EXC_CRASH (SIGABRT)

EXC_CRASH (SIGABRT) indicates the process terminated because it received the SIGABRT signal. Typically, this signal is sent because a function in the process called `abort()`, such as when an app encounters an uncaught Objective-C or C++ **language exception**.

Language exceptions, such as those from Objective-C, indicate programming errors discovered at runtime, such as accessing an array with an index that’s out-of-bounds or not implementing a required method of a protocol. 数组越界、方法未实现。

If the API throwing the exception is `doesNotRecognizeSelector:`, the crash may be due to a zombie object. See [Investigating Crashes for Zombie Objects](https://developer.apple.com/documentation/xcode/diagnosing_issues_using_crash_reports_and_device_logs/identifying_the_cause_of_common_crashes/investigating_crashes_for_zombie_objects?language=objc) for additional information.

When an **app extension** takes too much time to initialize, the operating system sends a SIGABRT to the app extension process. These crashes include an Exception Subtype field with the value LAUNCH_HANG.

### EXC_CRASH (SIGKILL)

EXC_CRASH (SIGKILL) indicates the operating system terminated the process. The crash report contains a Termination Reason field with a code that explains the reason for the crash. 被系统杀死，有异常编码！

- 0x8badf00d (pronounced “ate bad food”). The operating system’s watchdog terminated the app. See Addressing Watchdog Terminations. App 太久无响应而被 watchdog 杀掉！
- 0xdead10cc (pronounced “dead lock”). The operating system terminated the app because it held on to a file lock or SQLite database lock during suspension. 死锁！
- 0xc00010ff (pronounced “cool off”). 设备过热！
- 0xbaadca11 (pronounced “bad call”). The operating system terminated the app for failing to report a CallKit call in response to a PushKit notification.
- 0xbad22222. The operating system terminated a VoIP application because it resumed too frequently.

watchOS 专用的异常编码：

- 0xc51bad01. watchOS terminated the app because it used too much CPU time while performing a background task.
- 0xc51bad02. watchOS terminated the app because it failed to complete a background task within the allocated time.
- 0xc51bad03. The system was sufficiently busy overall that the app may not have received much CPU time to perform the background task.

### EXC_CRASH (SIGQUIT)

EXC_CRASH (SIGQUIT) indicates the process terminated at the request of another process with privileges to manage its lifetime.（例如：宿主进程拥有特权可以管理键盘进程的生命周期）SIGQUIT doesn’t mean that the process crashed, but it likely misbehaved in a detectable manner.

With iOS and iPadOS keyboard extensions, the host app terminates the keyboard extension if it takes too long to load. 键盘进程被宿主进程杀死！

### EXC_GUARD

EXC_GUARD indicates the process violated a guarded resource protection. Although there are multiple types of guarded system resources, most guarded resource crashes are from guarded file descriptors. 大部分是由于操作文件句柄不当！

### EXC_RESOURCE

EXC_RESOURCE is a notification from the operating system that the process exceeded a resource consumption limit.

- CPU and CPU_FATAL. A thread in the process used too much CPU over a short period of time.
- MEMORY. The process crossed a memory limit imposed by the system.
- IO. The process caused an excessive amount of disk writes over a short period of time.
- WAKEUPS. Threads in the process woke up too many times per second, which consumes battery life. Thread-to-thread communication APIs, such as `performSelector:onThread:withObject:waitUntilDone:`, or `dispatch_async`, cause this when unwittingly called far more often than expected. 线程过于频繁被唤起。

## Memory Errors

> [Investigating Memory Access Crashes](https://developer.apple.com/documentation/xcode/diagnosing_issues_using_crash_reports_and_device_logs/identifying_the_cause_of_common_crashes/investigating_memory_access_crashes?language=objc)

`EXC_BAD_ACCESS` 最常见的情况就是野指针（向一个已经释放的对象发送消息），从操作系统的层面说，当对象被释放后，它在虚拟内存空间中的内存块，可能被回收、复写，这时再对它进行访问就是非法的。

Once an Objective-C or Swift object no longer has any strong references to it, the object is deallocated. Attempting to further send messages to the object as if it were still a valid object is a “use after free” issue, with the deallocated object still receiving messages called a **zombie object**.

> [WWDC 2018 - Understanding Crashes and Crash Logs](https://developer.apple.com/videos/play/wwdc2018/414/)

![img](/assets/images/7b28d32a-f07b-4ab7-907c-f9422132fd53.png)

这是一个向已释放的对象发送消息的例子。如何看出来的呢？This particular bad value "0x7fdd5e70700" looks like it's inside the address range for the malloc memory allocator (0x7fdd5e400000 - 0x7fdd5e800000), but it's been **shifted/rotated by 4 bits**.（转换成二进制、再移位运算，可用系统计算器操作验证）

> Bit Rotation: A rotation (or circular shift) is an operation similar to shift except that the bits that fall off at one end are put back to the other end. In left rotation, the bits that fall off at left end are put back at right end. In right rotation, the bits that fall off at right end are put back at left end.

对象是如何被释放的：When the free function deletes an object it inserts it into a free list of other dead objects. It writes a rotated pointer into the object's `isa` field to make sure that the value written there is not a valid memory address precisely so that bad use of the object will crash.

当这个已被释放的对象再次被发送消息时，它的 `isa` 指针地址是一个被旋转了的、非法的指针地址，就会触发崩溃。The memory allocator did that for us, it deliberately rotated that pointer to make sure we would crash if we tried to use it again.

那么能否找到是 `LoginViewController` 的哪个属性接收了 `objc_release` 消息导致崩溃呢？We can see a +42 where the file and line number would've been. And the +42 is our clue because the +42 is an offset in the assembly code of the function. We can use lldb. We can find the address of the ivar destroyer function "0x1000022ea" and disassemble it.

### Unrecognized Selector

```log
Application Specific Information:
*** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason:
'-[NSURL _isResizable]: unrecognized selector sent to instance 0x280742c40'
```

Another common memory error symptom is an unrecognized selector exception. These are often caused when you have an object of some type, a code that is using that object, and then the object gets deallocated and used again. It sounds like that we will get what we saw in that previous crash log - malloc free list signature. But in this case, a new object is allocated at the same address where the old object used to be. So when the code tries to call a function on the old object, we have a different object of a different type at that same address and it doesn't recognize that function at all and we get an unrecognized selector exception.

```objc
[self performSelector:@selector(forceToCloseXxxx)];
```

通过给 `NSObject` 添加分类，介入**消息转发流程**，可以应对这种崩溃。[NSObjectSafe](https://github.com/jasenhuang/NSObjectSafe) 有相关实现。

```objc
+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        swizzleInstanceMethod([NSObject class], @selector(methodSignatureForSelector:), @selector(hookMethodSignatureForSelector:));
        swizzleInstanceMethod([NSObject class], @selector(forwardInvocation:), @selector(hookForwardInvocation:));
    });
}
```

### Debug Tools

Xcode contains a suite of debugging tools you can use to identify memory access issues as your app runs:

- **Address Sanitizer** for memory corruption bugs
- Undefined Behavior Sanitizer
- **Thread Sanitizer** for multithreading problems

For difficult-to-diagnose memory access crashes, the malloc debugging features, such as **Guard Malloc**, can help.

You enable these tools through the Xcode scheme editor.

![img](/assets/images/00EB4311-ABEE-4DFD-A9E5-9885978821E8.png)

If your app contains code in Objectice-C, C, or C++, run the static analyzer, and fix all issues it discovers.

## 常见崩溃原因

- 野指针：向已经释放的对象发送消息
- 给数组或集合添加 nil、字典的 key 为 nil
- 数组越界
- 在子线程中进行 UI 更新可能会发生崩溃
- 多线程问题：多个线程进行数据的读取操作，比如有一个线程在置空数据的同时另一个线程在读取这个数据，可能会出现崩溃情况
- 主线程卡顿/无响应：如果主线程超过系统规定的时间无响应，就会被 Watchdog 杀掉
- 内存消耗过高（OOM）
- 后台任务超时

## 崩溃监控工具

1. Xcode - Organizer。
2. 利用开源框架收集堆栈信息，自己部署服务器监控。如 [PLCrashReporter](https://github.com/microsoft/plcrashreporter) 和 [KSCrash](https://github.com/kstenerud/KSCrash)。
3. 友盟、Firebase、Bugly，提供集成 SDK 及分析服务。

## 捕获崩溃

示例代码：<https://github.com/Haley-Wong/RunLoopDemos/tree/master/RunLoopDemo04/RunLoopDemo04>

```objc
- (void)setCatchExceptionHandler
{
    // 1.捕获一些异常导致的崩溃
    NSSetUncaughtExceptionHandler(&HandleException);

    // 2.捕获非异常情况，通过 signal 传递出来的崩溃
    signal(SIGSEGV, handleSignalException);
    signal(SIGFPE, handleSignalException);
    signal(SIGBUS, handleSignalException);
    signal(SIGPIPE, handleSignalException);
    signal(SIGHUP, handleSignalException);
    signal(SIGINT, handleSignalException);
    signal(SIGQUIT, handleSignalException);
    signal(SIGABRT, handleSignalException);
    signal(SIGILL, handleSignalException);
}
```

捕获方法目前只可以执行一次，下次触发崩溃后，会跳过捕获方法，直接崩溃。

```objc
- (void)handleException:(NSException *)exception
{
    // 崩溃信息记录、上传
    // 回到程序主页面，“起死回生”
    // 强制运行 RunLoop
    // ...
}
```

## Crash Report

> [WWDC 2016 - Concurrent Programming With GCD in Swift 3](https://developer.apple.com/videos/play/wwdc2016/720/?time=257)

![img](/assets/images/2f5c3f44-66b4-464a-9e0c-a1f94ac23d4a.png)

> [WWDC 2018 - Understanding Crashes and Crash Logs](https://developer.apple.com/videos/play/wwdc2018/414/)

And if you upload an app that contains bitcode you should use the "Xcode - Organizer - Archives - Download Debug Symbols" to download any dSYMs that come from a store-side bitcode compilation.
