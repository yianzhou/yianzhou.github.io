---
title: 'Effective Objective-C (1) Get Accustomed'
categories: [Effective Objective-C]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

## 1. Objective-C's Roots

Objective-C is a superset of C, adding object-oriented features. Objective-C uses a messaging structure with dynamic binding, meaning that the type of an object is discovered at runtime. The runtime, rather than the compiler, works out what code to run for a given message.

```objc
NSString *str = @"Hello";
```

All Objective-C objects must be declared in this way because the memory for objects is always allocated in heap space and never on the stack.

The memory allocated in the heap has to be managed directly, whereas the stack-allocated memory to hold the variables is automatically cleaned up when the stack frame on which they are allocated is popped.

Objective-C 不需要像 C 一样使用 malloc 和 free 来分配或释放堆区内存，Objective-C Runtime 把这部分工作抽象为一套内存管理架构，即引用计数机制。

## 2. Forward Declaring

To compile anything that imports EOCPerson.h, you don’t need to know the full details about what an EOCEmployer is. All you need to know is that a class called EOCEmployer exists.

```objc
#import <Foundation/Foundation.h>
@class EOCEmployer;
  
@interface EOCPerson : NSObject
@property (nonatomic, copy) NSString *firstName;
@property (nonatomic, copy) NSString *lastName;
@property (nonatomic, strong) EOCEmployer *employer;

@end
```

The implementation file for EOCPerson would then need to import the header file of EOCEmployer, as it would need to know the full interface details of the class in order to use it.

```objc
#import "EOCPerson.h"
#import "EOCEmployer.h"
@implementation EOCPerson

@end
```

Deferring the import to where it is required enables you to limit the scope of what a consumer of your class needs to import. In the example, if EOCEmployer.h were imported in EOCPerson.h, anything importing EOCPerson.h would also import all of EOCEmployer.h. If the chain of importing continues, you could end up importing a lot more than you bargained for, which will certainly increase compile time.

Using forward declaration also alleviates the problem of both classes referring to each other.

When writing an import into a header file, always ask yourself whether it’s really necessary. If the import can be forward declared, prefer that. If the import is for something used in a property, instance variable, or protocol conformance and can be moved to the class-continuation category (see Item 27), prefer that. Doing so will keep compile time as low as possible and reduce interdependency.

## 3. Literal Syntax

不用 Foundation 也能写出 Objective-C 代码，但 iOS 开发与 Foundation 密不可分。使用 literal syntax 使代码更易读：

```objc
NSString *str = @"Hello";
NSNumber *num = @1;
NSArray *animals = @[@"cat", @"dog"];
NSDictionary* dic = @{@"key" : @"value", @"key2" : @28};
```

通过下标进行 get 和 set：

```objc
mutableArray[1] = @"dog";
mutableDictionary[@"lastName"] = @"Galloway";
```

## 4. Prefer Typed Constants to Preprocessor #define

少用预处理指令：`#define ANIMATION_DURATION 0.3`，多使用类型常量，后者提供了更多的可读性。

若常量是在某个实现文件之内，则在名称前加字母 k：

```objc
static const NSTimeInterval kAnimationDuration = 0.3;
```

若在类之外可见，则以类名称为前缀：

```objc
// EOCAnimatedView.h
extern const NSTimeInterval EOCAnimatedViewAnimationDuration;

// EOCAnimatedView.m
const NSTimeInterval EOCAnimatedViewAnimationDuration = 0.3;
```

## 5. Use Enumerations

```objc
enum EOCConnectionState {
    EOCConnectionStateDisconnected,
    EOCConnectionStateConnecting,
    EOCConnectionStateConnected,
};
typedef enum EOCConnectionState EOCConnectionState;

EOCConnectionState state = EOCConnectionStateDisconnected;
```
