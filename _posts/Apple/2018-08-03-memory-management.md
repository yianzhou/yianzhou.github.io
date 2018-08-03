---
title:  "内存管理"
categories: [Apple]
---

# 理解 ARC

在引用计数的架构下，每个对象都有个“计数器”，表示有多少引用想令对象存活下去。

* `retain`: increment the retain count (reference count)
* `release`: decrement the retain count
* `autorelease`: decrement the retain count later, when the autorelease pool is drained.

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

在 Objective-C 的引用计数架构中，自动释放池是一项重要特性。调用 release 会立即减少对象的引用计数，有可能令系统回收此对象。有时候我们需要使用 autorelease，此方法会在稍后减少计数，比如**在一个方法中返回对象时**，可以保证对象在跨越“方法调用边界”(method call boundary)一定存活。

实际上，**释放操作会在清空最外层的自动释放池时执行**。除非你拥有自己的自动释放池，否则这个时机指的就是当前线程的下一次 event loop。

# 引用循环

