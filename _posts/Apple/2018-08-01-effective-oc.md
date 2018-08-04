---
title:  "Effective Objective-C"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> AW.Effective.Objective-C.2.0

## Objective-C 的起源

Objective-C 在 C 的基础上添加了面向对象特性。Objective-C 是 C 的 superset。Objective-C 由 Smalltalk 演化而来，使用“消息结构”而非“函数调用”，
```
// Message (Objective-C)
Object *obj = [Object new];
[obj performWith:param1 and:param2];

// Function calling (C++)
Object *obj = new Object;
obj->perform(param1, param2);
```
使用消息结构的语言，运行时所执行的代码由运行环境所决定(Dynamic Binding)；使用函数调用的语言，由编译器决定。

```
NSString* str = @"Hello";
```
str 是指向 NSString 的指针，存放在栈区，占用的空间在64位计算机上是8字节，存储了 NSString 实例的内存地址。而实例本身存放在堆区。

Objective-C 不需要像 C 一样使用 malloc 和 free 来分配或释放堆区内存，Objective-C Runtime 把这部分工作抽象为一套内存管理架构，即引用计数。

对于非对象类型，如 int, double, CGRect 等，仍存放在栈区。

## Forward Declaring

Objective-C 按照 .h 和 .m 的方式组织文件。除非确有必要，否则不要引入头文件。尽量在类的头文件中使用向前声明来提及别的类，尽量降低类之间的耦合（coupling）。

## Literal Syntax

不用 Foundation 也能写出 Objective-C 代码，但 iOS 开发与 Foundation 密不可分。使用 literal syntax 使代码更易读：
```
NSString *str = @"Hello";
NSNumber *num = @1;
NSArray *animals = @[@"cat", @"dog"];
NSDictionary* dic = @{@"key" : @"value", @"key2" : @28};
```

## static const VS #define

不要用预处理指令：`#define ANIMATION_DURATION 0.3`

使用类型常量：`static const NSTimeInterval kAnimationDuration = 0.3;`

后者提供了更多的可读性。若常量是在某个 implementation file 之内，则在名称前加字母 k；若在类之外可见，则以类名称为前缀。

全局常量的声明：
```
// EOCAnimatedView.h
extern const NSTimeInterval EOCAnimatedViewAnimationDuration;

// EOCAnimatedView.m
const NSTimeInterval EOCAnimatedViewAnimationDuration = 0.3;
```
