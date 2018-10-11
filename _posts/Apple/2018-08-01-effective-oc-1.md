---
title:  "Effective Objective-C (1) Get Accustomed"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> AW.Effective.Objective-C.2.0

## 1. Objective-C's Roots
C 的两个孪生兄弟，C++ 和 Objective-C，以不同的方式为 C 添加了面向对象特性。Objective-C 由 Smalltalk 演化而来，使用“消息结构”而非“函数调用”，OC 的主要工作是由 Runtime 而非编译器来完成，使用 OC 的面向对象特性的全部数据结构和函数都在 Runtime 里面。

```
// Message (Objective-C)
Object *obj = [Object new];
[obj performWith:param1 and:param2];

// Function calling (C++)
Object *obj = new Object;
obj->perform(param1, param2);
```
使用消息结构的语言，运行时所执行的代码由运行环境所决定；使用函数调用的语言，由编译器决定。

在 `NSString *str = @"Hello";` 中，`str` 是指向 NSString 的指针，存放在栈区，占用的空间在64位计算机上是8字节（1字节是8位），存储了实例的内存地址。实例本身存放在堆区。

Objective-C 不需要像 C 一样使用 malloc 和 free 来分配或释放堆区内存，Objective-C Runtime 把这部分工作抽象为一套内存管理架构，即引用计数机制。

对于非对象类型，如 int, double, CGRect 等，仍存放在栈区。

## 2. Forward Declaring
尽量在类的头文件中使用向前声明来提及别的类，降低类之间的耦合。

## 3. Literal Syntax
不用 Foundation 也能写出 Objective-C 代码，但 iOS 开发与 Foundation 密不可分。使用 literal syntax 使代码更易读：
```
NSString *str = @"Hello";
NSNumber *num = @1;
NSArray *animals = @[@"cat", @"dog"];
NSDictionary* dic = @{@"key" : @"value", @"key2" : @28};
```
通过下标进行 get 和 set：
```
mutableArray[1] = @"dog";
mutableDictionary[@"lastName"] = @"Galloway";
```

## 4. Prefer Typed Constants to Preprocessor #define
少用预处理指令：`#define ANIMATION_DURATION 0.3`，多使用类型常量，后者提供了更多的可读性。

若常量是在某个实现文件之内，则在名称前加字母 k：
```
static const NSTimeInterval kAnimationDuration = 0.3;
```

若在类之外可见，则以类名称为前缀：
```
// EOCAnimatedView.h
extern const NSTimeInterval EOCAnimatedViewAnimationDuration;

// EOCAnimatedView.m
const NSTimeInterval EOCAnimatedViewAnimationDuration = 0.3;
```

## 5. Use Enumerations
```
enum EOCConnectionState {
    EOCConnectionStateDisconnected,
    EOCConnectionStateConnecting,
    EOCConnectionStateConnected,
};
typedef enum EOCConnectionState EOCConnectionState;
```
Use:
```
EOCConnectionState state = EOCConnectionStateDisconnected;
```
