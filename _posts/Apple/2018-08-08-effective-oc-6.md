---
title:  "Effective Objective-C (6) Block and GCD"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> AW.Effective.Objective-C.2.0

## 37: Blocks
Blocks are lexical closures for C, C++, and Objective-C. When it captures a variable of object type, a block implicitly retains it. It will be released when the block itself is released. It is important to remember that `self` is an object and is therefore retained when it is captured by the block. This situation can often lead to retain
cycles being introduced if the block is itself retained by the same object to which `self` refers.

When blocks are defined, the region of memory they occupy is allocated on the **stack**. This means that the block is valid only within the scope in which it is defined. For example, the following code is **dangerous** ⚠️:
```
void (^block)();
if ( /* some condition */ ) {
    block = ^{
        NSLog(@"Block A");
    };
} else {
    block = ^{
        NSLog(@"Block B");
    };
} 
block();
```
So each block is guaranteed to be valid only within its respective if-statement section. To solve this problem, blocks can be copied from the stack to the heap by sending the block the `copy` message.

Global blocks are another category, along with stack and heap blocks. Blocks that don’t capture any state, such as variables from the enclosing scope, do not need any state to run. The entire region of memory these blocks use is known in full at compile time:
```
void (^hello)(void) = ^ {
    NSLog(@"hello, world!");
};
```

## 38: Create typedefs for Common Block Types
To hide the complicated block type, you use a language feature from C called type definitions. The keyword `typedef` allows you to define an easy-to-read name that becomes an alias for another type.

## 39: Use Handler Blocks to Reduce Code Separation
Use a handler block when it will be useful to have the business logic of the handler be declared inline with the creation of the object.

Handler blocks have the benefit of being associated with an object directly rather than delegation, which often requires switching based on the object if multiple instances are being observed.

When designing an API that uses handler blocks, consider passing a queue as a parameter, to designate the queue on which the block should be enqueued.

## 40: Avoid Retain Cycles Introduced by Blocks
The key is to think about what objects a block may capture and therefore retain. If any of these can be an object that retains the block, either directly or indirectly, you will need to think about how to break the retain cycle at the correct moment.

## 41: Prefer Dispatch Queues to Locks for Synchronization
## 42: Prefer GCD to performSelector and Friends

## 43: GCD and Operation Queues
In fact, from iOS 4 and Mac OS X 10.6 onward, operation queues use GCD under the hood.

The first difference to note is that GCD is a pure C API, whereas operation queues are Objective-C objects. In GCD, the task that is queued is a block, which is a fairly lightweight data structure. Operations, on the other hand, are Objective-C objects and are therefore more heavyweight. That
said, GCD is not always the approach of choice. Sometimes, this overhead is minimal, and the benefits of using full objects far outweigh the downsides. These queues can also do much more complex things
that would require additional code on top of GCD.

* Cancelling operations
* Operation dependencies
* Key-Value Observing of operation properties: such as `isCancelled` to determine whether it has been cancelled and `isFinished` to determine whether it has finished.
* Operation priorities
* Reuse of operations

## 44: Use Dispatch Groups to Take Advantage of Platform Scaling
GCD automatically creates new threads or reuses old ones as it sees fit to service blocks on a queue. In the case of concurrent queues, this can be multiple threads, meaning that multiple blocks are executed concurrently. This leaves you to code your business logic and not have to write any kind of complex scheduler to handle concurrent tasks.

## 45: Use dispatch_once for Thread-Safe Single-Time Code Execution
## 46: Avoid dispatch_get_current_queue