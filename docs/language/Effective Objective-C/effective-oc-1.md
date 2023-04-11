# Get Accustomed

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

A constant that does not need to be exposed to the outside world should be defined in the implementation file where it is used. The usual convention for constants is to prefix with the letter `k` for constants that are local to a translation unit (implementation file).

A translation unit is the input the compiler receives to generate one object file. In the case of Objective-C, this usually means that there is one translation unit per class: every implementation (.m) file.

```objc
#import "EOCAnimatedView.h"

static const NSTimeInterval kAnimationDuration = 0.3;

@implementation EOCAnimatedView
- (void)animate {
    [UIView animateWithDuration:kAnimationDuration animations:^(){}];
}
@end
```

It is important that the variable is declared as both `static` and `const`.

The `const` qualifier means that the compiler will throw an error if you try to alter the value.

The `static` qualifier means that the variable is local to the translation unit in which it is defined.

So in the preceding example, `kAnimationDuration` will be declared locally to the object file generated from `EOCAnimatedView.m`.

If the variable were not declared `static`, the compiler would create an external symbol for it. If another translation unit also declared a variable with the same name, the linker would throw an error.

In fact, when declaring the variable as both `static` and `const`, the compiler doesn’t end up creating a symbol at all but instead replaces occurrences just like a preprocessor define does. Remember, however, the benefit is that the type information is present.

For constants that are exposed outside of a class, it is usual to prefix with the class name. Such constants need to appear in the global symbol table to be used from outside the translation unit in which they are defined.

```objc
// In the header file
extern NSString *const EOCStringConstant;

// In the implementation file
NSString *const EOCStringConstant = @"VALUE";
```

The constant is declared in the header file and defined in the implementation file.

The placement of the `const` qualifier is important, means "constant pointer to an `NSString`", the constant should not be allowed to change to point to a different `NSString` object.

The `extern` keyword in the header tells the compiler that there will be a symbol for `EOCStringConstant` in the global symbol table. This means that the constant can be used without the compiler’s being able to see the definition for it. The compiler simply knows that the constant will exist when the binary is linked. The compiler will allocate storage for the string in the data section of the object file that is generated from this implementation file. When this object file is linked with other object files to produce the final binary, the linker will be able to resolve the global symbol for `EOCStringConstant` wherever else it has been used.

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
