---
title: 'Effective Objective-C (5) Memory Management'
categories: [Effective Objective-C]
---

- Do not remove this line (it will not be displayed)
  {:toc}

> AW.Effective.Objective-C.2.0

## 29: Reference Counting

在引用计数的架构下，每个对象都有个“计数器”，表示有多少事物想令对象存活下去。

- `retain`: increment the retain count (reference count)
- `release`: decrement the retain count
- `autorelease`: decrement the retain count later, when the autorelease pool is drained.

Object may has reference to other objects, thereby forming what is known as an **object graph**.

Objects are said to **own** other objects if they hold a strong reference to them. This means that they have registered their interest in keeping them alive by retaining them. When they are finished with them, they release them.

```
- (void)setFoo:(id)foo {
    [foo retain]; // 新对象被保留
    [_foo release]; // 旧对象被释放
    _foo = foo; // 实例变量指向新对象
}
```

The order is important. If the old value was release before the new value was retained and the two values are exactly the same, the release would mean that the object could potentially be deallocated prematurely.

In a garbage-collected environment, retain cycle would usually be picked up as a "island of isolation", the collector would deallocate all three objects.

In a reference counting environment, this leads to memory leaks, and usually solved by using **weak** reference.

## 30: Auto Reference Counting

编译器知道哪些语句会令对象的引用计数增加，如果没有对应的减少操作，那么就会有内存泄漏。既然编译器知道，那么它现在多做了一步——自动帮我们管理引用计数。

ARC 比 MRC 效率更高，因为它直接调用底层 C 的函数，而不是封装后的 Objective-C 方法。

如果调用了以这些名字开头的方法（owning prefix），那么其返回的对象归调用者拥有，调用者必须负责将它们释放：

- alloc
- new
- copy
- mutableCopy

Objective-C 通过上述的命名约定，将内存管理标准化。初学者可能觉得有些奇怪，但优秀的 Objective-C 程序员必须适应这个理念。

ARC 管理对象生命周期的基本方法是：在合适的地方插入“保留”和“释放”操作。在 ARC 环境下，变量的内存管理语义可以通过修饰符来指明。包括 `__strong`, `__unsafe__unretained`, `__weak`, `__autoreleasing`。

## 31: Release References and Clean Up Observation State Only in dealloc

你绝对不应该自己调用 dealloc 方法，Runtime 会在适当时候调用。

在 dealloc 方法中，应该做的是释放其它对象的引用，取消  订阅的 KVO 或 NSNotificationCenter 通知，不要做其他事情。

```
- (void)dealloc {
    CFRelease(coreFoundationObject); // CoreFoundation object 不归 ARC 管理，须自行释放
    [[NSNotificationCenter defaultCenter] removeObserver: self]; // 解除监听
}
```

## 32: Beware of Memory Management with Exception-Safe Code

## 33: Use Weak References to Avoid Retain Cycles

`@property(nonatomic, unsafe_unretained) EOCPerson* other`

用 unsafe_unretained 修饰的属性，语义上同 assign 等价（assign 是用于 int, float, 结构体等），表明属性值可能不安全，并且不归此实例所拥有。

weak 与 unsafe_unretained 的作用完全相同。只要系统把属性回收，属性值就会自动设为 nil；而 unsafe_unretained 属性仍然指向原来的位置，不安全。

## 34: Use Autorelease Pool Blocks to Reduce High-Memory Waterline

One of the features of Objective-C’s reference-counted architecture is a concept known as autorelease pools. Releasing an object means that its retain count either is decremented immediately through a call `[obj release]` or is added to an auto-release pool through a call `[obj autorelease]`.

An autorelease pool is used as a collection of objects that will need releasing at some point in the future. When a pool is drained, all the objects in the pool at that time are sent the release message.

If no autorelease pool is in place when an object is sent the autorelease message, you will see a message like this in the console:

> Object 0xabcd0123 of class \_\_NSCFString autoreleased with no pool in place - just leaking - break on objc_autoreleaseNoPool() to debug

Often, the only one you will ever see in an application is the one that wraps the main application entry point in the main function:

```objc
int main(int argc, char *argv[]) {
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, @"EOCAppDelegate");
    }
}
```

Technically, this autorelease pool block is **unnecessary**. The end of the block coincides with the application terminating, at which point the operating system releases all memory used by the application. Without it, any objects autoreleased by the UIApplicationMain function would not have a pool to go into and would log a warning saying just that. So this pool can be thought of as an outer catch-all pool.

The braces in `@autoreleasepool {}` define the scope of the autorelease pool. A pool is created at the first brace and is automatically drained at the end of the scope. Any object autoreleased within the scope is therefore sent the release message at the end of the scope.

Autorelease pools can be nested. When an object is autoreleased, it is added to the innermost pool. This nesting of autorelease pools can be taken advantage of to allow the control of the _high memory mark_ of an application.

Autorelease pools can be thought of as being in a stack. When an autorelease pool is created, it is pushed onto the stack; when it is drained, it is pulled off the stack. When an object is autoreleased, it is put into the topmost pool in the stack.

The need to make this additional pool optimization depends entirely on your application. It is certainly not something that should be done without first monitoring the memory footprint to decide whether a problem needs addressing. Autorelease pool blocks do not incur too much overhead, but they do incur at least some overhead, so if the extra autorelease pool can be avoided, it should be.

```objc
for (int i = 0; i < 10e5 * 2; i++) {
    NSString *str = [NSString stringWithFormat:@"%d", i];
}

// 降低内存峰值
for (int i = 0; i < 10e5 * 2; i++) {
    @autoreleasepool {
        NSString *str = [NSString stringWithFormat:@"%d", i];
    }
}

// 不能降低内存峰值的例子：因为数组中存了引用，引用计数仍然大于 1
NSMutableArray *arr = [NSMutableArray array];
for (int i = 0; i < count; i++) {
    @autoreleasepool {
        NSNumber *num = [NSNumber numberWithInt:i];
        [arr addObject:num];
    }
}
```

## 35: Use Zombies to Help Debug Memory-Management Problems

启用了"Zombie Object"这个调试功能之后，Runtime 会把所有已经释放的实例转化为特殊的僵尸对象，而不会真正回收他们。僵尸对象所在的核心内存无法被重用，不可能被覆写，当尝试向僵尸对象发送消息时，程序会抛出异常，其中准确说明了发送过来的消息，并描述了回收之前的那个对象。僵尸对象是调试内存管理问题的最佳方式。

## 36: Avoid Using retainCount
