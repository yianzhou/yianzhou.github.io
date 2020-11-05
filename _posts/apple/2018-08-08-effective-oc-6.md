---
title: "Effective Objective-C (6) Block and GCD"
categories: [Effective Objective-C]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# 37: Blocks

A block is similar to a function but is defined inline to another function and shares the scope of that within which it is defined.

A block can be assigned to a variable and then used like any other variable.

By default, any variable captured by a block cannot be modified by the block. However, variables can be declared as modifiable by giving them the `__block` qualifier.

When it captures a variable of object type, a block implicitly retains it. It will be released when the block itself is released. A block itself can be considered an object. In fact, blocks respond to many of the selectors that other Objective-C objects do. Most important to understand is that a block is reference counted just like other objects. When the last reference to a block is removed, it is deallocated. In doing so, any objects that the block captures are released to balance out the block’s retain of them.

If the block is defined in an instance method of an Objective-C class, the self variable is available along with any instance variables of the class. Instance variables are always writable and do not need to be explicitly declared with `__block`. But if an instance variable is captured by either reading or writing to it, the self variable is implicitly captured also, because the instance variable relates to that instance. This situation can often lead to retain cycles being introduced if the block is itself retained by the same object to which self refers.

## block 的内存结构

 A block is an object itself, since the first variable within the region of memory that a block is defined in is a pointer to a Class object, called the isa pointer.

![image](/assets/images/block_layout.png)

The most important thing to note in the layout is the variable called invoke, a function pointer to where the implementation of the block resides. The prototype of the function takes at least a void*, which is the block itself. Recall that blocks are a simple replacement for function pointers where state is passed using an opaque void pointer.

The descriptor variable is a pointer to a structure that each block has, declaring the overall size of the block object and function pointers for copy and dispose helpers. These helpers are run when a block is copied and disposed of, for example, to perform any retaining or releasing, respectively, of captured objects.

Finally, a block contains copies of all the variables it captures. These copies are stored after the descriptor variable and take up as much space as required to store all the captured variables. When the block is run, the captured variables are read from this region of memory, which is why the block needs to be passed as a parameter into the invoke function.

## Global, Stack, and Heap Blocks

When blocks are defined, the region of memory they occupy is allocated on the **stack**. Blocks can be copied from the stack to the heap by sending the block the `copy` message.

Global blocks are another category, along with stack and heap blocks. Blocks that don’t capture any state, such as variables from the enclosing scope, do not need any state to run. The entire region of memory these blocks use is known in full at compile time. These blocks can be declared as global.

# 38: Create typedefs for Common Block Types

To hide the complicated block type, you use a language feature from C called type definitions. The keyword `typedef` allows you to define an easy-to-read name that becomes an alias for another type.

# 39: Use Handler Blocks to Reduce Code Separation

Use a handler block when it will be useful to have the business logic of the handler be declared inline with the creation of the object.

Handler blocks have the benefit of being associated with an object directly rather than delegation, which often requires switching based on the object if multiple instances are being observed.

When designing an API that uses handler blocks, consider passing a queue as a parameter, to designate the queue on which the block should be enqueued.

# 40: Avoid Retain Cycles Introduced by Blocks

The key is to think about what objects a block may capture and therefore retain. If any of these can be an object that retains the block, either directly or indirectly, you will need to think about how to break the retain cycle at the correct moment.

# 41: Prefer Dispatch Queues to Locks for Synchronization

Sometimes in Objective-C, you will come across code that you’re having trouble with because it’s being accessed from multiple threads. This situation usually calls for the application of some sort of synchronization through the use of locks.（需要使用锁来实现同步机制）Before GCD, there were two ways to achieve this:

一、built-in synchronization block

```
- (void)synchronizedMethod {
    @synchronized(self) {
        // 对 self 使用同步锁
    }
}
```

This construct automatically creates a lock based on the given object and waits on that lock until it executes the code contained in the block. At the end of the code block, the lock is released. In the example, the object being synchronized against is self. Each synchronized block will execute serially across all such blocks.

二、use the `NSLock` object directly

```
_lock = [[NSLock alloc] init];

- (void)synchronizedMethod {
    [_lock lock];
    // safe
    [_lock unlock];
}
```

Recursive locks are also available through NSRecursiveLock, allowing for one thread to take out the same lock multiple times without causing a deadlock.

As an aside, you should be aware that although this goes some way to ensuring thread safety, it does not ensure absolute thread safety of the object. Rather, access to the property is atomic. You are guaranteed to get valid results when using the property, but if you call the getter multiple times from the same thread, you may not necessarily get the same result each time. Other threads may have written to the property between accesses.

那么，更好的方案是使用 GCD，它能更简单、高效地为代码加锁。使用串行队列，将读取和写入操作都放在同一个队列里，即可保证数据同步。如此，全部加锁任务都交由 GCD 处理，而 GCD 是在相当深的底层实现的，安全且效率很高。

```
let myQueue = DispatchQueue(label: "com.hello.myQueue")

var myString = "Hello"

func getSomeString() -> String {
    var str = ""
    myQueue.sync {
        str = myString
    }
    return str
}

func setSomeString(_ string: String) {
    myQueue.sync {
        myString = string
    }
}
```

`set`方法不需要返回值，所以不一定要是同步的，也可以异步执行：

```
func setSomeString(_ string: String) {
    myQueue.async {
        myString = string
    }
}
```

即使使用异步执行，队列中的任务仍然是串行的，读取和写入依然会按顺序执行。但执行异步派发时，由于需要拷贝 block，如果拷贝 block 的时间明显超过执行 block 的时间，那么这种写法会比原来更慢。如果派发的 block 要执行繁重的任务，那么可以考虑这种方案。

多个`get`方法可以并发执行，但`get`和`set`方法不能并发执行，利用这个特点，还可以写出更快的代码。

```
let concurrentQueue = DispatchQueue.global()

var conString = "Hello"

func getConString() -> String {
    var str = ""
    concurrentQueue.sync {
        str = conString
    }
    return str
}

func setConString(_ string: String) {
    let workItem = DispatchWorkItem(qos: .default, flags: .barrier) {
        conString = string
    }
    concurrentQueue.sync(execute: workItem)
}
```

在队列中，barrier block 必须单独执行，不能并发执行，这只对并行队列有意义，因为串行队列中的块总是逐个执行。并发队列中如果要执行一个 barrier block，必须等待当前所有的并发块都执行完，再单独执行 barrier block，然后继续正常执行。

# 42: Prefer GCD to performSelector and Friends

# 43: GCD and Operation Queues

In fact, from iOS 4 and Mac OS X 10.6 onward, operation queues use GCD under the hood.

The first difference to note is that GCD is a pure C API, whereas operation queues are Objective-C objects. In GCD, the task that is queued is a block, which is a fairly lightweight data structure. Operations, on the other hand, are Objective-C objects and are therefore more heavyweight. That
said, GCD is not always the approach of choice. Sometimes, this overhead is minimal, and the benefits of using full objects far outweigh the downsides. These queues can also do much more complex things
that would require additional code on top of GCD.

- Cancelling operations
- Operation dependencies
- Key-Value Observing of operation properties: such as `isCancelled` to determine whether it has been cancelled and `isFinished` to determine whether it has finished. 当这些值变更时，会得到通知。
- Operation priorities
- Reuse of operations. `BlockOperation`的子类在执行时可以充分利用自己的成员变量和方法，这些封装好的`Operation`可以在代码中多次使用。

# 44: Use Dispatch Groups to Take Advantage of Platform Scaling

GCD automatically creates new threads or reuses old ones as it sees fit to service blocks on a queue. In the case of concurrent queues, this can be multiple threads, meaning that multiple blocks are executed concurrently. This leaves you to code your business logic and not have to write any kind of complex scheduler to handle concurrent tasks.

# 45: Use dispatch_once for Thread-Safe Single-Time Code Execution

# 46: Avoid dispatch_get_current_queue
