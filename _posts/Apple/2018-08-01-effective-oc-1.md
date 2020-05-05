---
title: 'Effective Objective-C (1) Get Accustomed'
categories: [Effective Objective-C]
---

* Do not remove this line (it will not be displayed)
{:toc}

## 1. Objective-C's Roots

Objective-C is a superset of C, adding object-oriented features. Objective-C uses a messaging structure with dynamic binding, meaning that the type of an object is discovered at runtime. The runtime, rather than the compiler, works out what code to run for a given message.

```objc
NSString *str = @"Hello";
```

All Objective-C objects must be declared in this way because the memory for objects is always allocated in heap space and never on the stack.

Memory size of a pointer: 4 bytes for a 32-bit architecture, 8 bytes for a 64-bit architecture. These bits of memory will contain the memory address of the `NSString` instance.

The memory allocated in the heap has to be managed directly, whereas the stack-allocated memory to hold the variables is automatically cleaned up when the stack frame on which they are allocated is popped.

Objective-C 不需要像 C 一样使用 malloc 和 free 来分配或释放堆区内存，Objective-C Runtime 把这部分工作抽象为一套内存管理架构，即引用计数机制。

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

少用预处理指令：`#define ANIMATION_DURATION 0.3`，多使用类型常量，后者提供了更多的可读性。

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
