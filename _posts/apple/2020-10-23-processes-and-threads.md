---
title: "进程和线程"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

下载 libdispatch 源码：`curl -O https://opensource.apple.com/tarballs/libdispatch/libdispatch-1271.40.12.tar.gz`

# GCD

[WWDC 2015 - Building Responsive and Efficient Apps with GCD](https://developer.apple.com/videos/play/wwdc2015/718/)

Threads are competiting at moments like the main thread wants to handle new events while the GCD queue wants to execute the block you dispatched to it, but we're only on a single core device. In this case, which thread do we execute? This is where Quality of Service classes come into play. These are ways you tell the system what kind of work you're doing, and in turn, it allows the system to provide a variety of **resource controls** to most effectively execute your code:

- CPU scheduling priority, which threads do we run, in what order?
- I/O priority, how do we execute I/O with deference to other I/O in the system.
- Timer coalescing, which is a power-saving feature.
- Whether we run the CPU in throughput- or efficiency-oriented mode.

Quality of Service Classes:

- User Interactive: **This is the main thread.** The user interactive code is specifically the code needed in order to keep 60 frames per second **animation** running smoothly. It's the work actively involved in updating the UI. **There's nothing you have to do to get this. The main thread of the application always comes up at this QoS class**.
- User Initiated: loading the results of an action done by the user. If the user can't continue to make meaningful progress with your application, user initiated is the correct class. (For example, user tap an icon and wait to view a document.)
- Utility: long running tasks that don't prevent the user from continuing to use your app. (For example, download a magazine with a progress bar showing to user)
- Background: The user is not actively watching. Any kind of maintenance task, cleanup work, database vacuuming would all be background.

Dispatch queues 都是 FIFO 队列！串行队列，按 FIFO 原则出列，一个接一个执行；并行队列，按 FIFO 原则出列，可以并发执行，返回顺序无法预计。

When designing tasks for concurrent execution, **do not call methods that block the current thread of execution**. When a task scheduled by a concurrent dispatch queue blocks a thread, the system creates additional threads to run other queued concurrent tasks. If too many tasks block, the system may run out of threads for your app. 需注意，不要调用会阻塞线程的方法，这样会导致系统创建过多的线程，占用大量内存和资源、甚至耗尽。

Another way that apps consume too many threads is by creating too many private concurrent dispatch queues. Because each dispatch queue consumes thread resources, creating additional concurrent dispatch queues exacerbates 使恶化 the thread consumption problem. Instead of creating private concurrent queues, submit tasks to one of the global concurrent dispatch queues. For serial tasks, set the target of your serial queue to one of the global concurrent queues. That way, you can maintain the serialized behavior of the queue while minimizing the number of separate queues creating threads. 需注意，尽量不要自行创建并发队列，而是尝试利用系统的全局并发队列。对于串行队列，设置其目标为全局并发队列中的一个，既可以保证串行执行的特性，又减少了新建线程。

The system automatically creates the main queue and associates it with your application’s main thread. 系统会自动创建主队列，并将其与应用程序的主线程关联。主队列只有一个工作线程，就是主线程。

GCD 管理了一个线程池，往全局并发队列、自己创建的并发队列里提交 block，GCD 会将 block 派发到线程池里的线程来执行。如果当前工作线程全繁忙，会创建新的线程，最多同时有 64 个工作线程。

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

并发读，互斥写！见 [DemoGCD](https://github.com/yianzhou/ios-demos/)。

`dispatch_barrier_async` The queue you specify should be a concurrent queue that you create yourself using the `dispatch_queue_create` function. If the queue you pass to this function is a serial queue or one of the global concurrent queues, this function behaves like the `dispatch_async` function. 栅栏函数要配合自己创建的并发队列使用！！

# DispatchGroup

You attach multiple work items to a group and schedule them for asynchronous execution **on the same queue or different queues**. When all work items finish executing, the group executes its completion handler. You can also wait synchronously for all tasks in the group to finish executing.

# Synchronization

## 竞争情况

多个进程同时操作同一份数据、并且执行结果取决于操作发生的特定顺序的情况，称为**竞争情况** (race condition)。为了防止出现竞争情况，我们要求以某种方式同步 (synchronized) 进程。

每个线程会有自己的栈内存空间，栈空间相互隔离、互不影响；但有时多个线程要访问到共享的堆区内存，此时如果不进行同步，就会出现内存不一致问题。设想这样一个场景，用户的银行账户里有 100 元，此时有 3 个柜员机同时进行存、取、查操作，它们之间就需要进行同步。

## 临界区

程序可以声明称为临界区 (critical section) 的代码。在临界区中，线程可能正在访问或更新与至少一个其他线程共享的数据。当一个线程在临界区执行时，不允许其他线程在临界区执行。多个线程必须互斥地对临界资源进行访问。

## 公平锁与非公平锁

公平锁：在竞争情况下，把到达临界区的线程放到一个 FIFO 队列里等待，锁被释放后，唤醒队列头部的线程来获取锁。优点是每个线程都有机会得到锁，不会饿死；缺点是每个线程都要经历排队挂起、出队唤醒过程，涉及上下文切换，相对来说吞吐量没有非公平锁直接抢占来得高。

非公平锁：在竞争情况下，线程进入临界区直接尝试获取锁，无须考虑等待队列里的线程，获取不到再进入队列等待。优点是某些线程可以在到达临界区时直接抢占锁，不用经历排队挂起、再出队唤醒的过程，提高了整体的吞吐效率；缺点是可能导致队列里等待的线程一直获取不到锁、甚至饿死。

为什么要进入队列等待呢？一直尝试获取锁可以吗？——可以，一直尝试获取的叫自旋锁，与互斥锁类似，只是自旋锁被某线程占用时，其他线程不会挂起，而是一直运行（自旋/空转）直到锁被释放。由于不涉及用户态与内核态之间的切换，它的效率高于互斥锁。但相应地，会一直占用 CPU，如果不能在很短的时间内获得锁，无疑会使 CPU 整体效率降低。

iOS 中日常使用到的锁，除了 `os_unfair_lock` 是非公平锁，其余都是公平锁。

非公平锁/自旋锁适用于：预计临界区执行的时间很短，等待的线程能很快获得锁；临界区的代码经常被调用，但竞争情况很少发生。

公平锁/互斥锁适用于：预计临界区执行的时间较长，线程等待锁的时间较长；临界区竞争情况经常发生。

## os_unfair_lock

```objc
#import <os/lock.h>
os_unfair_lock lock = OS_UNFAIR_LOCK_INIT;
os_unfair_lock_lock(&lock); // 加锁和解锁必须对称，重复加锁会直接崩溃！
NSLog(@"safe here ...");
os_unfair_lock_unlock(&lock);
```

A lock must be unlocked only from the same thread in which it was locked. Attempting to unlock from a different thread causes a runtime error.

This is a replacement for the deprecated `OSSpinLock`. This function doesn't spin on contention, but instead waits in the kernel to be awoken by an unlock. Like `OSSpinLock`, this function does not enforce fairness or lock ordering—for example, an unlocker could potentially reacquire the lock immediately, before an awoken waiter gets an opportunity to attempt to acquire the lock. This may be advantageous for performance reasons, but also makes starvation of waiters a possibility.

## 互斥锁

`pthread_mutex_lock`，pthread 中的互斥锁，具有跨平台性质，有普通锁、检错锁、递归锁三种。当锁处于占用状态时，其他线程会挂起；当锁被释放时，所有等待的线程都将被唤醒，再次对锁进行竞争。在挂起与唤醒过程中，涉及用户态与内核态之间的上下文切换，这种切换是比较消耗性能的。

`NSLock` 是对 `pthread_mutex_lock` 的封装，是普通类型的互斥锁；如果用在需要递归嵌套加锁的场景时，需要使用其子类 `NSRecursiveLock`。

## @synchronized

`@synchronized` 是对 `pthread_mutex_t` 的封装，是递归类型的互斥锁。

```objc
@synchronized (self) {
    callbacks = [[self.callbackBlocks valueForKey:key] mutableCopy];
}
```

## 信号量

信号量主要用于控制临界区的资源最多可以被多少个线程并发访问。

```objc
dispatch_semaphore_t lock = dispatch_semaphore_create(1);
dispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER); // 等待和发出信号必须对称！重复调用 wait 不会崩溃，但会造成无限的等待……
NSLog(@"safe here ...");
dispatch_semaphore_signal(lock);
```

## pthread_rwlock_t

读写锁是用于“多线程读、单线程写”这一种读写互斥的场景，读操作可并发重入，写操作是互斥的。

```objc
- (instancetype)init {
    self = [super init];
    if (self) {
        pthread_rwlock_init(&_lock, nil);
    }
    return self;
}

- (void)queryMoney {
    pthread_rwlock_rdlock(&_lock);
    [super queryMoney];
    pthread_rwlock_unlock(&_lock);
}

- (void)saveMoney {
    pthread_rwlock_wrlock(&_lock);
    [super saveMoney];
    pthread_rwlock_unlock(&_lock);
}
```

## OSSpinLock (deprecated)

在罕见的情况下，低优先级的线程先获得了锁，这时一个高优先级的线程也尝试获得这个锁，它会处于空转状态并持续占用 CPU。但与此同时，低优先级线程在 CPU 时间的分配上远远少于高、中优先级线程，这就导致任务迟迟完不成、无法释放锁。除非开发者能保证访问锁的线程全部处于同一优先级，否则 iOS 系统中所有类型的自旋锁都不能再使用了。

过去 `atomic` 修饰的属性在底层也是使用自旋锁的，随着自旋锁被废弃，现在改用了 `os_unfair_lock`。

# 生产者-消费者问题

生产者-消费者问题是经典的、并发编程中的多线程同步问题。它有很多的变体，我们讨论一种最基本的情况：只有一个生产者线程和一个消费者线程；它们之间缓冲区的大小为一。

[这个例子](https://levelup.gitconnected.com/producer-consumer-problem-using-mutex-in-c-764865c47483)中，我们通过互斥量，保证两个线程对竞争资源（即缓冲区）的访问是互斥的。

```cpp
class SolutionA {
public:
    int produceData() {
        int ran = rand() % 1000; // [0, 1000) 的随机数
        cout << "Produce data: " << ran << endl;
        return ran;
    }

    void consumeData(int data) {
        cout << "Consume data: " << data << endl;
    }

    void producer() {
        while (true) {
            mu.lock();
            data = produceData();
            ready = true;
            mu.unlock();
            while (ready) {
                // 每秒检测一次，直到消费者吃完
                std::this_thread::sleep_for(std::chrono::seconds(1));
            }
        }
    }

    void consumer() {
        while (true) {
            while (!ready) {
                // 每秒检测一次，直到生产者产出
                std::this_thread::sleep_for(std::chrono::seconds(1));
            }
            mu.lock();
            consumeData(data);
            ready = false;
            mu.unlock();
        }
    }

    void run() {
        thread t1(&SolutionA::producer, this);
        thread t2(&SolutionA::consumer, this);
        t1.join();
        t2.join();
    }
private:
    mutex mu;
    bool ready = false;
    int data = 0;
};
```

这个例子显然是不够好的，因为我们缺少一种手段让生产者/消费者线程知道对方已经完成工作了，我们只好选择用 `while` 循环轮询，这会使得线程在等待对方时空转，尽管我们可以让线程休眠一定的时间、以节省资源，但这并不是完美的方案。**条件量**就是用来解决这种问题的。

The `condition_variable` class is a synchronization primitive that can be used to block a thread, or multiple threads at the same time, until another thread both modifies a shared variable (the condition), and notifies the `condition_variable`.

```cpp
class SolutionB {
public:
    int produceData() {
        int ran = rand() % 1000; // [0, 1000) 的随机数
        cout << "Produce data: " << ran << endl;
        return ran;
    }

    void consumeData(int data) {
        cout << "Consume data: " << data << endl;
    }

    void producer() {
        while (true) {
            // Resource Acquisition Is Initialization or RAII
            std::unique_lock<std::mutex> ul(mu);
            // critical section
            data = produceData();
            ready = true;
            // critical section
            ul.unlock();

            cv.notify_one();

            ul.lock();
            // The wait operations atomically release the mutex and suspend the execution of the thread.
            cv.wait(ul, [this] {
                return !this->ready;
            });
            // When the condition variable is notified, the thread is awakened, and the mutex is atomically reacquired.
        }
    }

    void consumer() {
        while (true) {
            std::unique_lock<std::mutex> ul(mu);
            cv.wait(ul, [this]() {
                return this->ready;
            });
            // after the wait, we own the lock.
            consumeData(data);
            ready = false;
            ul.unlock();
            cv.notify_one();
        }
    }

    void run() {
        thread t1(&SolutionB::producer, this);
        thread t2(&SolutionB::consumer, this);
        t1.join();
        t2.join();
    }
private:
    std::mutex mu;
    std::condition_variable cv;
    int data = 0;
    bool ready = false;
};
```

# 并发与并行

[Parallel programming with Swift: Operations](https://medium.com/flawless-app-stories/parallel-programming-with-swift-operations-54cbefaf3cb0)

Concurrency 并发: A condition that exists when at least two threads are making progress. Single-core devices can achieve concurrency through time-slicing. 单核 CPU 通过分时策略实现并发。

Parallelism 并行: A condition that arises when at least two threads are executing simultaneously. Multi-core devices execute multiple threads at the same time via parallelism.

# 原子操作

某些简单的表达式例如 `i += 1`，其实编译之后的得到的汇编指令，不止一条，所以他们并不是原子操作。

原子操作一定是在同一个 CPU 时间片中完成，这样即使线程被切换，多个线程也不会看到同一块内存中不完整的数据。

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
