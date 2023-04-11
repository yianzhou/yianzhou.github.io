# Block and GCD

## 37: Blocks

A block is similar to a function but is defined inline to another function and shares the scope of that within which it is defined.

A block can be assigned to a variable and then used like any other variable.

By default, any variable captured by a block cannot be modified by the block. However, variables can be declared as modifiable by giving them the `__block` qualifier.

When it captures a variable of object type, a block implicitly retains it. It will be released when the block itself is released. A block itself can be considered an object. In fact, blocks respond to many of the selectors that other Objective-C objects do. Most important to understand is that a block is reference counted just like other objects. When the last reference to a block is removed, it is deallocated. In doing so, any objects that the block captures are released to balance out the block’s retain of them.

If the block is defined in an instance method of an Objective-C class, the self variable is available along with any instance variables of the class. Instance variables are always writable and do not need to be explicitly declared with `__block`. But if an instance variable is captured by either reading or writing to it, the self variable is implicitly captured also, because the instance variable relates to that instance. This situation can often lead to retain cycles being introduced if the block is itself retained by the same object to which self refers.

### Memory Layout

A block is an object itself, since the first variable within the region of memory that a block is defined in is a pointer to a Class object, called the isa pointer.

![image](/assets/images/block_layout.png)

The most important thing to note in the layout is the variable called invoke, a function pointer to where the implementation of the block resides. The prototype of the function takes at least a void\*, which is the block itself. Recall that blocks are a simple replacement for function pointers where state is passed using an opaque void pointer.

The descriptor variable is a pointer to a structure that each block has, declaring the overall size of the block object and function pointers for copy and dispose helpers. These helpers are run when a block is copied and disposed of, for example, to perform any retaining or releasing, respectively, of captured objects.

Finally, a block contains copies of all the variables it captures. These copies are stored after the descriptor variable and take up as much space as required to store all the captured variables. When the block is run, the captured variables are read from this region of memory, which is why the block needs to be passed as a parameter into the invoke function.

### Global, Stack, and Heap Blocks

When blocks are defined, the region of memory they occupy is allocated on the **stack**. Blocks can be copied from the stack to the heap by sending the block the `copy` message.

Global blocks are another category, along with stack and heap blocks. Blocks that don’t capture any state, such as variables from the enclosing scope, do not need any state to run. The entire region of memory these blocks use is known in full at compile time. These blocks can be declared as global.

## 38: Create typedefs for Common Block Types

To hide the complicated block type, you use a language feature from C called type definitions. The keyword `typedef` allows you to define an easy-to-read name that becomes an alias for another type.

## 39: Use Handler Blocks to Reduce Code Separation

Use a handler block when it will be useful to have the business logic of the handler be declared inline with the creation of the object.

Handler blocks have the benefit of being associated with an object directly rather than delegation, which often requires switching based on the object if multiple instances are being observed.

When designing an API that uses handler blocks, consider passing a queue as a parameter, to designate the queue on which the block should be enqueued.

Another consideration when writing handler-based APIs stems from the fact that some code is required to run on a certain thread. For instance, any UI work in both Cocoa and Cocoa Touch must happen on the main thread. Therefore, it is sometimes prudent to allow the consumer of a handler-based API to decide on which queue the handler is run. One such API is NSNotificationCenter. If no queue is given, the default behavior is invoked, and the block is run on the thread that posted the notification.

```objc
- (id<NSObject>)addObserverForName:(NSNotificationName)name
                            object:(id)obj
                             queue:(NSOperationQueue *)queue
                        usingBlock:(void (^)(NSNotification *note))block;
```

## 40: Avoid Retain Cycles Introduced by Blocks

The key is to think about what objects a block may capture and therefore retain. If any of these can be an object that retains the block, either directly or indirectly, you will need to think about how to break the retain cycle at the correct moment.

## 41: Prefer Dispatch Queues to Locks for Synchronization

Sometimes in Objective-C, you will come across code that you’re having trouble with because it’s being accessed from multiple threads. This situation usually calls for the application of some sort of synchronization through the use of locks. Before GCD, there were two ways to achieve this:

1\. built-in synchronization block

```objc
- (void)synchronizedMethod {
    @synchronized(self) {
        // 修改 self 的实例变量/属性
        // 调用 self 的实例方法
    }
}
```

This construct automatically creates a lock based on the given object and waits on that lock until it executes the code contained in the block. At the end of the code block, the lock is released. In the example, the object being synchronized against is self. This construct is often a good choice, as it ensures that each instance of the object can run its own `synchronizedMethod` independently. However, overuse of `@synchronized(self)` can lead to inefficient code, as each synchronized block will execute serially across all such blocks. If you overuse synchronization against self, you can end up with code waiting unnecessarily on a lock held by unrelated code.

2\. use the `NSLock` object directly

```objc
_lock = [[NSLock alloc] init];

- (void)synchronizedMethod {
    [_lock lock];
    // safe
    [_lock unlock];
}
```

Recursive locks are also available through `NSRecursiveLock`, allowing for one thread to take out the same lock multiple times without causing a deadlock.

Both of these approaches are fine but come with their own drawbacks. For example, synchronization blocks can suffer from deadlock under extreme circumstances and are not necessarily efficient. Direct use of locks can be troublesome when it comes to deadlocks.

那么，更好的方案是使用 GCD，它能更简单、高效地为代码加锁。使用串行队列，将读取和写入操作都放在同一个队列里，即可保证数据同步。如此，全部加锁任务都交由 GCD 处理，而 GCD 是在相当深的底层实现的，安全且效率很高。

`get` 方法必须同步执行；`set`方法不需要返回值，所以不是必须同步执行，也可以异步执行：

```objc
- (void)setStr:(NSString *)str {
    dispatch_async(self.serialQueue, ^{
        self.str = str;
    });
}
```

即使使用异步执行，队列中的任务仍然是串行的，读取和写入依然会按顺序执行。但执行异步派发时，由于需要拷贝 block，如果拷贝 block 的时间明显超过执行 block 的时间，那么这种写法会比原来更慢。如果派发的 block 要执行繁重的任务，那么可以考虑这种方案。

多个`get`方法可以并发执行，但`get`和`set`方法不能并发执行，利用这个特点，还可以写出更快的代码。

```objc
#import <Foundation/Foundation.h>
NS_ASSUME_NONNULL_BEGIN
@interface DemoObject : NSObject
@property(nonatomic, copy) NSString *someString;
@end
NS_ASSUME_NONNULL_END
```

```objc
#import "DemoObject.h"

@interface DemoObject()
@property(nonatomic, strong, nonnull) dispatch_queue_t concurrentQueue;
@end

@implementation DemoObject

@synthesize someString = _someString; // 重要

- (instancetype)init
{
    self = [super init];
    if (self) {
        // 自己创建并发队列，栅栏函数不能配合全局队列使用！！
        _concurrentQueue = dispatch_queue_create(NSStringFromClass([self class]).UTF8String, DISPATCH_QUEUE_CONCURRENT);
    }
    return self;
}

-(NSString *)someString {
    __block NSString *localSomeString;
    dispatch_sync(_concurrentQueue, ^{
        NSLog(@"%@", [[NSThread currentThread]description]); // 主线程！！
        // 此处需使用 _someString 直接访问实例变量！
        // 如果使用 self.someString 就是再次调用了 getter！会死循环！
        localSomeString = _someString;
    });
    return localSomeString;
}

-(void)setSomeString:(NSString *)someString{
    dispatch_barrier_async(_concurrentQueue, ^{
        self->_someString = someString;
    });
}
@end
```

在队列中，barrier block 必须单独执行，不能并发执行，这只对并行队列有意义，因为串行队列中的块总是逐个执行。并发队列中如果要执行一个 barrier block，必须等待当前所有的并发块都执行完，再单独执行 barrier block，然后继续正常执行。

## 42: Prefer GCD to performSelector and Friends

## 43: GCD and Operation Queues

The first difference to note is that GCD is a pure C API, whereas operation queues are Objective-C objects.

In GCD, the task that is queued is a block, which is a fairly lightweight data structure. Operations, on the other hand, are Objective-C objects and are therefore more heavyweight.

That said, GCD is not always the approach of choice. Sometimes, this overhead is minimal, and the benefits of using full objects far outweigh the downsides. These queues can also do much more complex things that would require additional code on top of GCD.

- Cancelling operations
- Operation dependencies
- Key-Value Observing of operation properties: such as `isCancelled` to determine whether it has been cancelled and `isFinished` to determine whether it has finished.
- Operation priorities
- Reuse of operations. `BlockOperation`的子类在执行时可以充分利用自己的成员变量和方法，这些封装好的`Operation`可以在代码中多次使用。

总的来说，Operation 提供了更多在编写多线程程序时需要的功能，比如线程调度、任务取消、线程优先级等，为我们提供了简单的 API。从编程原则来说，一般我们需要尽可能使用高等级、封装完美的 API，在必须时才使用底层 API。但当我们认为需求能够以更简单的代码块实现的时候，简洁的 GCD 或许是个更好的选择。

## 44: Use Dispatch Groups to Take Advantage of Platform Scaling

Dispatch groups are a GCD feature that allows you to easily group tasks. You can then wait on that set of tasks to finish or be notified through a callback when the set of tasks has finished.

```objc
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
dispatch_group_t dispatchGroup = dispatch_group_create();
for (id object in collection) {
    dispatch_group_async(dispatchGroup, queue, ^{
        [object performTask];
    });
}
dispatch_group_wait(dispatchGroup, DISPATCH_TIME_FOREVER);
```

If the current thread should not be blocked, you can use the notify function instead of waiting:

```objc
dispatch_queue_t notifyQueue = dispatch_get_main_queue();
dispatch_group_notify(dispatchGroup, notifyQueue, ^{
    /* Continue processing after completing tasks */
});
```

GCD automatically creates new threads or reuses old ones as it sees fit to service blocks on a queue. In the case of concurrent queues, this can be multiple threads, meaning that multiple blocks are executed concurrently. This leaves you to code your business logic and not have to write any kind of complex scheduler to handle concurrent tasks.

## 45: Use dispatch_once for Thread-Safe Single-Time Code Execution

`dispatch_once` ensures that for a given token, the block is executed once and only once. The block is always executed the first time and, most important, is entirely thread safe. The token has been declared static because it needs to be exactly the same token each time.

```objc
+ (id)sharedInstance {
    static EOCClass *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}
```

## 46: Avoid dispatch_get_current_queue
