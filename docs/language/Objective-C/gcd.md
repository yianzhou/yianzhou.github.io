---
sidebar_position: 7
---

# GCD

下载 libdispatch 源码：`curl -O https://opensource.apple.com/tarballs/libdispatch/libdispatch-1271.40.12.tar.gz`

> [WWDC 2015 - Building Responsive and Efficient Apps with GCD](https://developer.apple.com/videos/play/wwdc2015/718/)

`DispatchQueue` 是 FIFO 队列。串行队列，按 FIFO 原则出列，一个接一个执行；并行队列，按 FIFO 原则出列，并发执行，返回顺序无法预计。

系统会自动创建主队列，并将其与应用程序的主线程关联。主队列只有一个工作线程，就是主线程。

## Sync and Async

同步和异步的区别：是否开启新的线程。同步是在当前线程执行，异步（可能会）开启新的线程执行。

串行和并行的区别：串行是一个接一个地执行，并行是同时执行。

`sync` 是在当前线程执行，不能开启新线程，所以就算派发到并发队列，也是串行执行的。（只有一个线程，咋并发呀？）

> [WWDC 2016 - Concurrent Programming With GCD in Swift 3](https://developer.apple.com/videos/play/wwdc2016/720/?time=257)

Dispatch queues have two main ways that you can submit work for them, the first is asynchronous execution.

```swift
// It's now on main thread
let queue = DispatchQueue(label: "com.yianzhou.demo")
queue.async {
    // It's now on dispatch worker thread
}
```

This is where you can queue up multiple items of work to your dispatch queue, and then will **bring up** a thread to execute that work. Dispatch will one by one take items off that queue and execute them. And then when it's finished with all items on the queue, the system will **reclaim** the thread that it bought up for you.

The second mode of execution is synchronous execution.

```swift
// It's now on your own background thread
queue.sync {
    // It's now on your own background thread too.
}
```

This is, you have your own thread. You submit synchronous work to the dispatch queue, and then it will **block** until the work item has completed. When it comes time to run the synchronous item, the dispatch queue will pass control over to the thread that was waiting, executes that work item, and then returns the control back to the worker thread. Dispatch will continue to drain the rest of the items on dispatch queue, and then also reclaims the worker thread that it was using.

![img-80](/assets/images/af0a14fb-689d-496b-ba3d-5aca619d833b.png)

Use GCD precondition to check whether your code is running on expected queue:

```swift
dispatchPrecondition(.onQueue(expectedQueue))
dispatchPrecondition(.notOnQueue(expectedQueue))
```

## Avoiding Thread Explosion

When designing tasks for concurrent execution, **do not call methods that block the current thread of execution**. When a task scheduled by a concurrent dispatch queue blocks a thread, the system creates additional threads to run other queued concurrent tasks. If too many tasks block, the system may run out of threads for your app.

Another way that apps consume too many threads is by creating too many private concurrent dispatch queues. Because each dispatch queue consumes thread resources, creating additional concurrent dispatch queues exacerbates the thread consumption problem. Instead of creating private concurrent queues, submit tasks to one of the global concurrent dispatch queues.

For serial tasks, **set the target** of your serial queue to one of the global concurrent queues. That way, you can maintain the serialized behavior of the queue while minimizing the number of separate queues creating threads.

GCD 管理了一个线程池，往全局并发队列、自己创建的并发队列里提交 block，GCD 会将 block 派发到线程池里的线程来执行。如果当前工作线程全繁忙，会创建新的线程，最多同时有 64 个工作线程。

To avoid thread explosion:

- prefer asynchronous APIs, especially for I/O
- use serial queues
- use `OperationQueue` with concurrency limits
- don’t generate unlimited work...

```objc
// DANGEROUS – may cause thread explosion and deadlocks
for (int i = 0; i < 999; i++){
    dispatch_async(q, ^{...});
}
dispatch_barrier_sync(q, ^{});

// GOOD – GCD will manage parallelism
dispatch_apply(999, q, ^(size_t i){...});

// GOOD - Use semaphore to control the concurrency
#define CONCURRENT_TASKS 4
sema = dispatch_semaphore_create(CONCURRENT_TASKS);
for (int i = 0; i < 999; i++){
    dispatch_async(q, ^{
        // do work
        dispatch_semaphore_signal(sema);
    });
    dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
}
```

## 创建队列

创建队列的 API：

```c
dispatch_queue_t dispatch_queue_create(const char *_Nullable label, dispatch_queue_attr_t _Nullable attr);
```

Dispatch queues created with the DISPATCH_QUEUE_CONCURRENT attribute may invoke blocks concurrently (similarly to the global concurrent queues, but potentially with more overhead), and support barrier blocks submitted with the dispatch barrier API, which e.g. enables the implementation of efficient reader-writer schemes.

When a dispatch queue is no longer needed, it should be released with `dispatch_release()`. Note that any pending blocks submitted asynchronously to a queue will hold a reference to that queue. Therefore a queue will not be deallocated until all pending blocks have finished.

Passing the result of the `dispatch_queue_attr_make_with_qos_class()` function to the attr parameter of this function allows a quality of service class and relative priority to be specified for the newly created queue. The quality of service class so specified takes precedence over the quality of service class of the newly created dispatch queue's target queue (if any) as long that does not result in a lower QOS class and relative priority.

When no quality of service class is specified, the target queue of a newly created dispatch queue is the default priority global concurrent queue.

创建队列属性的 API：

```c
dispatch_queue_attr_t dispatch_queue_attr_make_initially_inactive(dispatch_queue_attr_t _Nullable attr);
```

这个很少见，省略不讲。

```c
dispatch_queue_attr_t dispatch_queue_attr_make_with_autorelease_frequency(dispatch_queue_attr_t _Nullable attr,
                                                                            dispatch_autorelease_frequency_t frequency);
```

The global concurrent queues have the `DISPATCH_AUTORELEASE_FREQUENCY_NEVER` behavior. Manually created dispatch queues use `DISPATCH_AUTORELEASE_FREQUENCY_INHERIT` by default.

When a queue uses the `DISPATCH_AUTORELEASE_FREQUENCY_WORK_ITEM` (either directly or inherithed from its target queue), any block submitted asynchronously to this queue is executed as if surrounded by a individual Objective-C `@autoreleasepool` scope.

```c
dispatch_queue_attr_t dispatch_queue_attr_make_with_qos_class(dispatch_queue_attr_t _Nullable attr,
                                                                dispatch_qos_class_t qos_class,
                                                                int relative_priority);
```

When specified in this manner, the QOS class and relative priority take precedence over those inherited from the dispatch queue's target queue (if any) as long that does not result in a lower QOS class and relative priority.

The global queue priorities map to the following QOS classes:

- DISPATCH_QUEUE_PRIORITY_HIGH: QOS_CLASS_USER_INITIATED
- DISPATCH_QUEUE_PRIORITY_DEFAULT: QOS_CLASS_DEFAULT
- DISPATCH_QUEUE_PRIORITY_LOW: QOS_CLASS_UTILITY
- DISPATCH_QUEUE_PRIORITY_BACKGROUND: QOS_CLASS_BACKGROUND

The QOS class and relative priority set this way on a queue have no effect on blocks that are submitted synchronously to a queue (via `dispatch_sync()`, `dispatch_barrier_sync()`).

## Quality of Service

Quality of Service classes are ways you tell the system what kind of work you're doing, and in turn, it allows the system to provide a variety of **resource controls** to most effectively execute your code.

- User Interactive: **This is the main thread.** The user interactive code is specifically the code needed in order to keep 60 frames per second **animation** running smoothly. It's the work actively involved in updating the UI. **There's nothing you have to do to get this. The main thread of the application always comes up at this QoS class**.
- User Initiated: Loading the results of an action done by the user. If the user can't continue to make meaningful progress with your application, user initiated is the correct class. (e.g. user tap an icon and wait to view a document)
- Utility: Long running tasks that don't prevent the user from continuing to use your app. (e.g. download a magazine with a progress bar showing to user)
- Background: The user is not actively watching. Any kind of maintenance task, cleanup work, database vacuuming would all be background.

QoS can be specified on the individual block level (`DispatchWorkItem`) and on queue as a whole (`DispatchQueue`).

For Objective-C, see [`dispatch_block_create`](https://developer.apple.com/documentation/dispatch/1431050-dispatch_block_create?language=objc) and [`dispatch_block_create_with_qos_class`](https://developer.apple.com/documentation/dispatch/1431068-dispatch_block_create_with_qos_c?language=objc).

For Swift, see [`init(qos:flags:block:)`](https://developer.apple.com/documentation/dispatch/dispatchworkitem/2300102-init).

**Priority inversion** happens when high QoS block submitted to serial queue which already contains blocks with lower QoS. In this case, GCD helps you by **raising** the items in front of your work on the dispatch queue to the higher QoS so that they execute quicker. The system makes a best effort to apply the necessary QoS **overrides** to ensure that blocks submitted earlier to the serial queue are executed at that same QoS class or higher.

## dispatch_async

`dispatch_async` Calls to this function always return immediately after the block has been submitted and never wait for the block to be invoked. The target queue determines whether the block is invoked serially or concurrently with respect to other blocks submitted to that same queue. Independent serial queues are processed concurrently with respect to each other.

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
dispatch_async(self.serialQueue, ^{
    dispatch_sync(self.serialQueue, ^{
        // ...
    });
});
```

使用 `dispatch_sync` 往当前队列里添加任务，就会死锁。

**As a performance optimization, this function executes blocks on the current thread whenever possible, with one obvious exception. Specifically, blocks submitted to the main dispatch queue always run on the main thread.**

在主线程使用 `dispatch_sync`，不管派发到主队列还是子队列，都在主线程执行！！

```objc
// 主线程
dispatch_sync(任意队列, ^{
    // 在主线程执行！
});
```

在子线程使用 `dispatch_sync`，在当前线程执行！有一个例外，如果提交到主队列的话，在主线程执行！

**Using serial queues as locks** is a very common use of GCD where you use `dispatch_sync` to execute a critical section block on that serial queue where that block has exclusive access to the shared data.

![img-80](/assets/images/4e504177-95a0-4824-b05f-58131cc45eca.png)

In this case, we have the main thread called `dispatch_sync` and **we will execute that block at the QoS of the calling thread**, user interactive here. At the meantime you have a QoS utility thread also calling `dispatch_sync` on this queue to get the exclusive access to the shared data. Again, the same thing will happen if he comes in later he will block waiting to get the exclusive access. Then **execute that block on his own thread at QoS utility**.

Now, suppose the utility guy comes in first and takes the lock, you will have the main thread waiting on a utility thread. It's again a case of **priority inversion**. We'll resolve that by **raising** the Quality of Service of waited on work.

Generally, QoS of waited on work is raised for:

- `dispatch_sync()` and `dispatch_block_wait()` of blocks on serial queues
- `pthread_mutex_lock()`, `NSLock`

## dispatch_barrier_async

并发读，互斥写！见 [DemoGCD](https://github.com/yianzhou/ios-demos/)。

`dispatch_barrier_async` The queue you specify should be a concurrent queue that you create yourself using the `dispatch_queue_create` function. If the queue you pass to this function is a serial queue or one of the global concurrent queues, this function behaves like the `dispatch_async` function. 栅栏函数要配合自己创建的并发队列使用！！

## dispatch_group_t

You attach multiple work items to a group and schedule them for asynchronous execution **on the same queue or different queues**. When all work items finish executing, the group executes its completion handler. You can also wait synchronously for all tasks in the group to finish executing.

## dispatch_source_t

```swift
let source = DispatchSource.makeReadSource(fileDescriptor: fd, queue: queue)
source.setEventHandler { read(fd) }
source.setCancelHandler { close(fd) }
source.activate()
```

This is our event monitoring primitive in GCD. Here we are setting one up to monitor a file descriptor for readability. You pass it in a queue which is the target queue of the source, which is where we execute the event handler of the source. This target queue is also where you might put other work that should be serialized with this operation, such as processing the data that was read. Then, we set the cancel handler for the source, which is how sources implement the invalidation pattern. And finally, when everything is set up, we call `source.activate()` to start monitoring.

`DispatchSource` is just an instance of a more general pattern throughout the OS, where you have objects that deliver events to a target queue that you specify. Another example was XPC connections.

## RunLoop vs Dispatch Queues

The autorelease pool on a serial queue will only pop when a thread goes completely idle. This could never happen if your application is constantly busy. So it's important to not rely on the autorelease pool that comes for free when you use dispatch.
