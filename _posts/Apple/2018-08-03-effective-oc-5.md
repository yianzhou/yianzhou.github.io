---
title:  "Effective Objective-C (5) 内存管理"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> AW.Effective.Objective-C.2.0（第五章，内存管理）

本章介绍了什么是引用计数；引用计数机制与垃圾回收机制的区别；Cocoa的自动引用计数是如何工作的；什么是引用循环，如何使用弱引用；什么是 Runtime 的 autoreleasepool；以及如何用僵尸对象调试内存管理问题。

# 引用计数

在引用计数的架构下，每个对象都有个“计数器”，表示有多少事物想令对象存活下去。

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

# 引用循环

In a garbage-collected environment, retain cycle would usually be picked up as a "island of isolation", the collector would deallocate all three objects.

In a reference counting environment, this leads to memory leaks, and usually solved by using **weak** reference.

# 自动引用计数

编译器知道哪些语句会令对象的引用计数增加，如果没有对应的减少操作，那么就会有内存泄漏。既然编译器知道，那么它现在多做了一步——自动帮我们管理引用计数。

ARC 比 MRC 效率更高，因为它直接调用底层 C 的函数，而不是封装后的 Objective-C 方法。

如果调用了以这些名字开头的方法（owning prefix），那么其返回的对象归调用者拥有，调用者必须负责将它们释放：
* alloc
* new
* copy
* mutableCopy

Objective-C 通过上述的命名约定，将内存管理标准化。初学者可能觉得有些奇怪，但优秀的 Objective-C 程序员必须适应这个理念。

ARC 管理对象生命周期的基本方法是：在合适的地方插入“保留”和“释放”操作。在 ARC 环境下，变量的内存管理语义可以通过修饰符来指明。包括 `__strong`, `__unsafe__unretained`, `__weak`, `__autoreleasing`。

你绝对不应该自己调用 dealloc 方法，Runtime 会在适当时候调用。

在 dealloc 方法中，应该做的是释放其它对象的引用，取消订阅的 KVO 或 NSNotificationCenter 通知，不要做其他事情。
```
- (void)dealloc {
    CFRelease(coreFoundationObject); // CoreFoundation object 不归 ARC 管理，须自行释放
    [[NSNotificationCenter defaultCenter] removeObserver: self]; // 解除监听
}
```

# Weak Reference
`@property(nonatomic, unsafe_unretained) EOCPerson* other` 

用 unsafe_unretained 修饰的属性，语义上同 assign 等价（assign 是用于 int, float, 结构体等），表明属性值可能不安全，并且不归此实例所拥有。

weak 与 unsafe_unretained 的作用完全相同。只要系统把属性回收，属性值就会自动设为 nil；而 unsafe_unretained 属性仍然指向原来的位置，不安全。

# 以自动释放池块降低内存峰值

在 Objective-C 的引用计数架构中，**自动释放池**是一项重要特性。调用 release 会立即减少对象的引用计数，有可能令系统回收此对象。有时候我们需要使用 autorelease，此方法会在稍后减少计数，比如在一个方法中返回对象时，可以保证对象在跨越“方法调用边界”（method call boundary）一定存活。

释放对象有两种方式，一种是 release，使引用计数递减；另一种是 autorelease，将其加入“自动释放池”中。

自动释放池用于存放那些需要在稍后某个时刻释放的对象。清空（drain）释放池时，系统会向其中的对象发送 release 消息。

在 iOS 应用运行后，系统会自动创建一些线程，包括主线程和 GCD 中的线程。这些线程都默认拥有自动释放池，在每次执行事件循环之前都会清空一次。

通常我们不需要自己手动创建自动释放池，在程序的主入口：
```
int main(int argc, char * argv[]) {
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    }
}
```
如果没有 `@autoreleasepool{}`，那么在 `UIApplicationMain` 里自动释放的那些对象就没有池子能够容纳了，只能等到应用程序终止时，由操作系统一次性回收所有内存，系统会发出警告信息表明这一情况。所以说，这个池子可以理解为最外围的、捕捉全部自动释放对象的池。

花括号定义了自动释放池的范围，**池子在左花括号处创建，在右花括号处自动清空**。自动释放池可以嵌套，嵌套的池子被放在一个栈里，里层的池子被推入栈顶，清空池子相当于出栈。对一个 object 执行 autorelease，会将它放到栈顶的池子里。

自己创建自动释放池可以控制内存峰值不至于过高。比如一个要执行很多次的 for 循环，或者是循环次数未知、需要取决于用户输入的情况，如要从数据库中读取出很多对象，并存放到数组中时。如果把循环内的代码包裹在自动释放池 block 里，那么在循环中自动释放的对象就会被放在这个池子里，而不是在主线程的池子里。例如：

```
NSMutableArray *array = [NSMutableArray new];
for(NSDictionary *record in databaseRecords) {
    @autoreleasepool {
        EOCPerson *person = [[EOCPerson alloc] initWithRecord: record];
        [array addObject: person];
    }
}
```
那么在右花括号处，池子会自动清空，释放掉临时对象的内存，减少了内存峰值。

尽管自动释放池 block 的开销不太大，但还是有的。需不需要使用，要根据监控内存用量的实际结果来定。

# 僵尸对象

启用了"Zombie Object"这个调试功能之后，Runtime 会把所有已经释放的实例转化为特殊的僵尸对象，而不会真正回收他们。僵尸对象所在的核心内存无法被重用，不可能被覆写，当尝试向僵尸对象发送消息时，程序会抛出异常，其中准确说明了发送过来的消息，并描述了回收之前的那个对象。僵尸对象是调试内存管理问题的最佳方式。