---
title:  "Effective Objective-C"
categories: [Apple]
---

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

## 属性 Property
```
@interface EOCPerson: NSObject
@property NSString *firstName;
@property NSString *lastName;
@end
```
属性是 Objective-C 的特性，让编译器自动生成与属性相关的存取方法。使用“点语法”等同于调用了存取方法。
```
EOCPerson* per = [Person new];
per.firstName = @"Bob"; //setter
print(per.firstName); //getter
```
实际上编译器使用 `_属性名` 如 `_firstName` 的方式作为真正的实例变量，并生成了存取方法。使用 @systhesize 可以更改这个默认的名字，但不建议这么做。

@dynamic 可以告诉编译器不要自动创建 `_属性名` 和存取方法，比如 Core Data 框架里。

## 属性的 attribute

属性的 attribute会影响编译器所生成的存取方法。

第一类：原子性。如果没有声明 nonatomic，那么编译器默认使用同步锁，保证对该属性的操作是原子的（atomic）。

第二类：读写权限。readwrite 或 readonly。

第三类：内存管理。assign, strong, weak, unsafe_unretained, copy.

第四类：方法名 getter, setter（少见）

在 iOS 开发中，**所有属性都声明为 nonatomic**，这样做是因为在 iOS 中使用同步锁的开销较大，会带来严重的性能问题。因为一个 atomic 的属性并不能保证线程安全，还需采用更为深层的锁定机制。

## 在对象内部尽量直接访问实例变量

在对象内部读取数据时，直接读取实例变量；写入数据时，可以通过属性来写。

在 init 和 dealloc 方法中，总是应该通过实例变量来读写数据。

在 lazy initialization 中需要通过属性来读取数据。

## Object Equality

NSObject 协议中有两个用于判断对象是否相等的关键方法：
```
- (BOOL)isEqual:(id)object;
- (NSUInteger)hash;
```
如果两个对象相等，其 hash 值必须相同；但如果两个 hash 值相同的对象不一定相等。

设计 hash 算法时，可以多做试验，在减少碰撞（collision）频度与降低运算复杂程度之间取舍。

默认的 isEqual 比较的是内存地址，默认的哈希方法直接返回了内存地址，这对于我们来说没有什么意义。

重写了 isEqual，不一定需要重写 hash 方法。但当对象需要放进 collection 时，必须重写 hash 方法。

## Factory Pattern

UIButton 使用了工厂模式，可以隐藏 Abstract base class 背后的实现细节：
```
+ (UIButton*)buttonWithType:(UIButtonType)type;
```
在系统的框架中这种模式经常出现，称为 class cluster。

## objc_msgSend

这几段译本翻译得很差，直接看英文吧。

