# Objects, Messaging, and the Runtime

## 6. Property

访问对象的实例变量，是通过访问对象在内存中的首地址 + 偏移量来完成。

> [objc explain: Non-fragile ivars](http://www.sealiesoftware.com/blog/archive/2009/01/27/objc_explain_Non-fragile_ivars.html)

如果这个偏移量是一个编译时决定的常量，那么父类增加成员变量，就会造成内存布局的改动、导致所有子类都需要重新编译，否则就无法运行。例如，我们在某个 macOS 版本编写了一个类 `PetShopView` 继承 `NSView`，它们的内存布局：

![img-60](/assets/images/856E7BCD-E838-46B6-B8E1-7EF0077AD219.png)

假设，苹果在新的 macOS 版本为 `NSView` 增加了一个实例变量，那么它们的内存布局就会变成：

![img-60](/assets/images/2960A97D-7D1C-40C7-88E2-2B00CFCB2C25.png)

这意味着，所有继承自 `NSView` 的子类都不可用了！要么开发者重新编译并发布更新；要么苹果就不可以改动 `NSView` 的实例变量布局、以免新版操作系统上大量软件变得不可用！

那么如何解决这个问题呢？

To overcome this problem, languages have invented a variety of techniques. The approach Objective-C has taken is to make instance variables special variables held by class objects storing the offset. Then at runtime, the offset is looked up so that if the class definition changes, the offset stored is updated; whenever an access to the instance variable is made, the correct offset is used.

This is known as the nonfragile Application Binary Interface (ABI). An ABI defines, among other things, the conventions for how code should be generated. The nonfragile ABI also means that instance variables can be defined in a class-continuation category or in the implementation. So you don’t have to have all your instance variables declared in the interface anymore, and you therefore don’t leak internal information about your implementation in the public interface.

属性是 Objective-C 的特性，让编译器自动生成与属性相关的存取方法。使用“点语法”等同于调用了存取方法。

`@property` 的本质是什么？@property = ivar + getter + setter;

编译器会为每个 `@property` 添加 `@synthesize`，如以下形式：`@synthesize propertyName = _propertyName;`

实际上编译器使用 `_属性名` 如 `_firstName` 作为真正的实例变量，并生成了存取方法。使用 @synthesize 可以更改这个默认的名字，但不建议这么做。

`@dynamic` 可以告诉编译器不要自动创建实例变量 `_firstName` 和存取方法。

属性的 attribute 会影响编译器所生成的存取方法：

一、原子性。在 iOS 开发中，所有属性都声明为 `nonatomic`，这样做是因为在 iOS 中使用同步锁的开销较大，会带来严重的性能问题。而且 `atomic` 的属性并不能保证线程安全，要保证线程安全，还需采用更为深层的锁定机制。

Atomic accessors include locks to ensure atomicity. This means that if two threads are reading and writing the same property, the value of the property at any given point in time is valid. Without the locks, or nonatomic, the property value may be read on one thread while another thread is midway through writing to it. If this happens, the value that’s read could be invalid.

If you’ve been developing for iOS at all, you’ll notice that all properties are declared nonatomic. The reason is that, historically, the locking introduces such an overhead on iOS that it becomes a performance problem. Usually, atomicity is not required anyway, since it does not ensure thread safety, which usually requires a deeper level of locking.

通过阅读 objc 的源码得知，当属性被声明为 `atomic`，对该属性的读、写会使用 `os_unfair_lock` 加锁。这个锁仅仅是在读、写属性时加的，对属性的其它操作都不是线程安全的。例如这样一个属性 `@property(atomic, assign) int money;`，对它进行 `self.money++` 这样的操作就不是线程安全的。

二、读写权限（readwrite 或 readonly）

`@property (nonatomic, copy, readonly) NSString *firstName;`

readonly 的属性有办法修改吗？有，[Key-Value Coding](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/KeyValueCoding/index.html)：

`[person setValue:@"Yian" forKey:"firstName"];`

三、内存管理（ARC）

| assign | The setter is a simple assign operation used for scalar types, such as `CGFloat` or `NSInteger`. |
| unsafe_unretained | This has the same semantics as assign but is used where the type is an object type to indicate a nonowning relationship (unretained) that is not nilled out (unsafe) when the target is destroyed, unlike weak. |
| strong | This designates that the property defines an owning relationship. When a new value is set, it is first retained, the old value is released, and then the value is set. |
| weak | This designates that the property defines a nonowning relationship. When a new value is set, it is not retained; nor is the old value released. This is similar to what assign does, but the value is also nilled out when the object pointed to by the property at any time is destroyed. |
| copy | This designates an owning relationship similar to strong; however, instead of retaining the value, it is copied. This is often used when the type is `NSString` to preserve encapsulation, since the value passed into the setter might be an instance of the subclass `NSMutableString`. If it’s this mutable variant, the value could be mutated after the property is set, without the object’s knowing. So an immutable copy is taken to ensure that the string cannot change from underneath the object. Any object that may be mutable should take a copy. |

常见类型的内存管理语义：

```objc
// 非指针类型用 assign
@property(nonatomic, assign) CGFloat floatNum;
@property(nonatomic, assign) CGPoint point;
@property(nonatomic, assign) NSInteger integer;

// 指针类型用 strong
@property(nonatomic, strong) NSObject *obj;
@property(nonatomic, strong) NSNumber *num;

// 有可变子类的要用 copy，以防不可知的修改
@property(nonatomic, copy) NSString *str;
@property(nonatomic, copy) NSArray *arr;
@property(nonatomic, copy) NSDictionary *dic;
@property(nonatomic, copy) NSSet *set;

// 可变类型不能用 copy，会崩溃！
@property(nonatomic, strong) NSMutableString *str;
@property(nonatomic, strong) NSMutableArray *arr;
@property(nonatomic, strong) NSMutableDictionary *dic;
@property(nonatomic, strong) NSMutableSet *set;
```

添加关联对象 `objc_setAssociatedObject`，其中关联对象的内存管理语义 `objc_AssociationPolicy` 常用的有三种：

- OBJC_ASSOCIATION_ASSIGN
- OBJC_ASSOCIATION_COPY_NONATOMIC
- OBJC_ASSOCIATION_RETAIN_NONATOMIC

四、方法名 getter, setter（少用）

## 7. Instance Variables

Properties should always be used to access instance variables of an object **externally**, but how you access instance variables **internally** is a hotly debated topic within the Objective-C community. 在类的外部，毫无疑问应该使用属性，但在类的内部是否使用属性，存在争议。

### 访问实例变量和访问属性的区别

Direct access to the instance variables will undoubtedly be faster, as it does not have to go through Objective-C method dispatch. The compiler will emit code that directly accesses the memory where the object’s instance variables are stored. 直接访问实例变量，不会经过 OC 方法的消息发送，而是直接访问内存里当前类的内存首地址加上一个偏移量，速度更快。

Direct access bypasses the property’s memory-management semantics defined by the setter. For example, if your property is declared as copy, directly setting the instance variable will not cause a copy to be made. The new value will be retained and the old value released. 直接设置实例变量，会跳过属性的内存管理语义！

Key-Value Observing (KVO) notifications would not be fired when accessing the instance variables directly.

Accessing through properties can make it easier to debug issues surrounding a property, since you can add a breakpoint to the getter and/or setter to determine who is accessing the properties and when.

### 作者推荐的用法

I strongly encourage you to read instance variables using direct access but to set them using the property, with a few caveats.

The first caveat is when values are set within an initializer method. Here, you should always use direct instance variable access, because subclasses could override the setter. However, there are some cases in which you must use the setter in an initializer. This is when the instance variable is declared within a superclass; you cannot access the instance variable directly anyway, so you must use the setter.

Another caveat is when the property uses lazy initialization. In this case, you have to go via the getter; if you don’t, the instance variable will never get a chance to be initialized.

## 8. Object Equality

NSObject 协议中有两个用于判断对象是否相等的关键方法：

```objc
- (BOOL)isEqual:(id)object;
- (NSUInteger)hash;
```

The default implementations of these methods from the NSObject class itself work such that two objects are equal if and only if their pointer values are exactly the same.

哈希方法是用作计算元素在哈希表中的位置的。如果两个对象相等，其 hash 值必须相同；但两个 hash 值相同的对象不一定相等。两个不同的元素哈希值相同，这种情况称为哈希冲突。

哈希值在对象被加入哈希表时会用到（例如添加至 `NSSet`、设置为 `NSDictionary` 的 key 时）。在判断元素是否相等时，会首先判断 hash 值是否相等，hash 值不同的两个对象直接判断不相等；如果相等，再调用 `isEqual:`

默认的哈希方法直接返回了内存地址，所以总是不同的。如果只实现了 `isEqual:` 而不实现 `hash`，那么即使我们定义了 object a is equals to object b，他们还是可以被放在一个集合里面，这不符合我们的定义。

## 9. Class Cluster

A class cluster is a great way to hide implementation detail behind an abstract base class.

An example from UIKit is UIButton. To create a button, you call the following class method:

```objc
+ (UIButton*)buttonWithType:(UIButtonType)type;
```

This **factory pattern** is one way of creating a class cluster.

Unfortunately, Objective-C gives no language feature for designating that the base class is abstract. In some cases, there is no init family method defined in the interface, which indicates that perhaps instances should not be created directly.

The type of the object returned will depend on the button type passed in. However, all classes inherit from the same base class, UIButton. The point of doing this is that the consumer of the UIButton class does not care about the type of the button being created and the implementation detail behind how that button draws itself. All it needs to know is how to create a button; set attributes, such as the title; and add targets for touch actions.

Class Cluster pattern provides the flexibility of multiple subclasses while keeping a clean interface by hiding them away behind an abstract base class.

There are many class clusters in the system frameworks. Most of the collection classes are class clusters, such as NSArray, and its mutable counterpart, NSMutableArray.

```objc
// __NSArrayI
NSArray *arr1 = @[@0, @1];
NSArray *arr2 = [NSArray arrayWithObjects:@0, @1, nil];
NSArray *arr3 = [NSArray arrayWithArray:arr1];
NSArray *arr4 = [[NSArray alloc]initWithObjects:@0, @1, nil];
NSArray *arr5 = [NSArray arrayWithObjects:@0, nil];

// __NSArray0，仅初始化，不含有任何元素的数组
NSArray *arr6 = [NSArray array];

// __NSSingleObjectArrayI 只有一个元素的数组
NSArray *arr7 = @[@0];
NSArray *arr8 = [[NSArray alloc]initWithObjects:@1, nil];
NSArray *arr9 = [[NSArray alloc]initWithArray:arr7];

// __NSPlaceholderArray 占位数组
NSArray *arr10 = [NSArray alloc];

// __NSArrayM 可变数组
NSMutableArray *arr11 = [[NSMutableArray alloc]initWithArray:arr1];
```

## 10: Associated Objects

```c
id objc_getAssociatedObject(id object, void *key);
void objc_removeAssociatedObjects(id object);
```

## 11: objc_msgSend

Since Objective-C is a superset of C, it’s a good idea to start by understanding that calling a function in C uses what is known as static binding, which means that the function being called is known at compile time. For example, consider the following code:

```c
#import <stdio.h>
void printHello() {
   printf("Hello, world!\n");
}
void printGoodbye() {
    printf("Goodbye, world!\n");
}
void doTheThing(int type) {
    if (type == 0) {
        printHello();
    } else {
        printGoodbye();
    }
    return 0;
}
```

Ignoring inlining, when this is compiled, printHello and printGoodbye are known, and the compiler emits instructions to directly call the functions. The addresses of the functions are effectively hardcoded into the instructions. Consider now if that had been written like this:

```c
#import <stdio.h>
void printHello() {
   printf("Hello, world!\n");
}
void printGoodbye() {
    printf("Goodbye, world!\n");
}
void doTheThing(int type) {
    void (*fnc)();
    if (type == 0) {
        fnc = printHello;
    } else {
        fnc = printGoodbye;
    }
    fnc();
    return 0;
}
```

Here, dynamic binding is used, since the function being called is unknown until runtime. The difference in the instructions the compiler emits will be that in the first example, a function call is made inside both the if and the else statements. In the second example, only a single function call is made but at the cost of having to read the address of which function to call rather than being hardcoded.

**Dynamic binding** is the mechanism by which methods in Objective-C are invoked when a message is passed to an object. All methods are plain old C functions under the hood, but which one is invoked for a given message is decided entirely at runtime and can even change throughout the course of an app running, making Objective-C truly dynamic. 调用哪个方法是运行时决定的，甚至可以在运行时改变。

A message being called on an object looks like this:

`id returnValue = [someObject messageName:parameter];`

In this example, someObject is referred to as the receiver, and messageName is the selector. The selector combined with the parameters is known as the message. When it sees this message, the compiler turns it into a standard C function call to the function at the heart of messaging, objc_msgSend, which has the following prototype:

`void objc_msgSend(id self, SEL cmd, ...)`

This is a variadic 变长参数 function that takes two or more parameters. The first parameter is the receiver, the second parameter is the selector (SEL is the type of a selector), and the remaining parameters are the message parameters in the order they appear. A selector is the name that refers to a method. The term selector is often used interchangeably with the term method. The preceding example message will be converted to the following:

`id returnValue = objc_msgSend(receiver, @selector(messageName:), params);`

The objc_msgSend function calls the correct method, depending on the type of the receiver and the selector. In order to do this, the function looks through the list of methods implemented by the receiver’s class and, if it finds a method that matches the selector name, jumps to its implementation. If not, the function traverses up the inheritance hierarchy to find the method to jump to. If no matching method is found, message forwarding kicks in.

objc_msgSend caches the result in a fast map, one for each class, so that future messages to the same class and selector combination are executed quickly. Even this fast path is slower than for a statically bound function call but not by very much once the selector is cached; in reality, message dispatch is not the bottleneck in an application.

The preceding stands only for certain messages. Additional functions are exposed by the Objective-C runtime to handle certain edge cases: `objc_msgSend_stret`、`objc_msgSend_fpret`、`objc_msgSendSuper`.

Every method of an Objective-C object can be thought of as a simple C function, whose prototype is similar to the `objc_msgSend` function itself. This is no coincidence. It makes jumping to the method simpler and can make good use of tail-call optimizations. Tail-call optimization occurs when the last thing a function does is call another function. Instead of pushing a new stack frame, the compiler can emit code to jump to the next function. This can be done only if the final thing a function does is call another function and does not need to use the return value for anything. Using this optimization is crucial for `objc_msgSend` because without it, the stack trace would show `objc_msgSend` right before every Objective-C method. Also, stack overflow would occur prematurely.

## 12. Message Forwarding

A class can understand only messages that it has been programmed to understand, through implementing methods. But it’s not a compile-time error to send a message to a class that it doesn’t understand, since methods can be added to classes at runtime so the compiler has no way of knowing whether a method implementation is going to exist. When it receives a method that it doesn’t understand, an object goes through message forwarding.

当消息接受者无法响应一个 selector，消息转发就发生了。这就是解决 unrecognized selector 崩溃的思路！

注意，消息转发是需要开销的，而且越往后的步骤开销越大。

### resolveInstanceMethod

The first method that’s called when a message is passed to an object that it doesn’t understand is a class method on the object’s class: `+ (BOOL)resolveInstanceMethod:(SEL)selector`.

Using this approach requires the implementation of the method to already be available, ready to plug in to the class dynamically. This method is often used to implement @dynamic properties such as occurs in CoreData for accessing properties of `NSManagedObjects`.

### forwardingTargetForSelector

第二次尝试是看有没有替补的消息接受者：`-(id)forwardingTargetForSelector:(SEL)selector`。

在这个方法中返回实际处理消息的对象，在外部看来好像它自己处理这个消息一样。

### forwardInvocation

如果以上都不能处理消息，最后一个方法就是完整的消息转发。

通过 `methodSignatureForSelector:` 获取方法签名，然后创建一个 `NSInvocation` 对象，包装着未被处理的消息的全部细节，包括 selector, target, parameters。

然后调用 `forwardInvocation:`，在这个方法的实现中还可以继续向父类转发，如果继承关系里的所有父类都没有处理，那么最后，`NSObject` 的实例方法 `doesNotRecognizeSelector:` 会抛出一个异常。

```objc
- (void)forwardInvocation:(NSInvocation *)anInvocation {
    if ([otherObject respondsToSelector:[anInvocation selector]]) {
        [anInvocation invokeWithTarget:otherObject];
    } else {
        [super forwardInvocation:anInvocation];
    }
}
```

### 例子

Consider an object that allows you to store any object in it, much like a dictionary, but provides access through properties.

```objc
#import <Foundation/Foundation.h>
@interface EOCAutoDictionary : NSObject
@property (nonatomic, strong) NSString *string;
@property (nonatomic, strong) NSNumber *number;
@property (nonatomic, strong) NSDate *date;
@property (nonatomic, strong) id opaqueObject;
@end
```

Internally, the values for each property will be held in a dictionary, declaring the properties as @dynamic such that instance variables and accessors are not automatically created for them:

```objc
#import "EOCAutoDictionary.h"
#import <objc/runtime.h>
@interface EOCAutoDictionary ()
@property (nonatomic, strong) NSMutableDictionary *backingStore;
@end

@implementation EOCAutoDictionary
@dynamic string, number, date, opaqueObject;
- (id)init {
    if ((self = [super init])) {
        _backingStore = [NSMutableDictionary new];
    }
    return self;
}

+ (BOOL)resolveInstanceMethod:(SEL)selector {
    NSString *selectorString = NSStringFromSelector(selector);
    if ([selectorString hasPrefix:@"set"]) {
        // "v@:@" is the type encoding of the implementation.
        // type encoding is made up from characters representing the return type, followed by the parameters that the function takes.
        class_addMethod(self, selector, (IMP)autoDictionarySetter, "v@:@");
    } else {
        class_addMethod(self, selector, (IMP)autoDictionaryGetter, "@@:");
    }
    return YES;
}

id autoDictionaryGetter(id self, SEL _cmd) {
    // Get the backing store from the object
    EOCAutoDictionary *typedSelf = (EOCAutoDictionary*)self;
    NSMutableDictionary *backingStore = typedSelf.backingStore;
    // The key is simply the selector name
    NSString *key = NSStringFromSelector(_cmd);
    // Return the value
    return [backingStore objectForKey:key];
}

void autoDictionarySetter(id self, SEL _cmd, id value) {
    // Get the backing store from the object
    EOCAutoDictionary *typedSelf = (EOCAutoDictionary*)self;
    NSMutableDictionary *backingStore = typedSelf.backingStore;
    /** The selector will be for example, "setOpaqueObject:".
    * We need to remove the "set", ":" and lowercase the first * letter of the remainder.
    */
    NSString *selectorString = NSStringFromSelector(_cmd);
    NSMutableString *key = [selectorString mutableCopy];
    // Remove the ':' at the end
    [key deleteCharactersInRange:NSMakeRange(key.length - 1, 1)]; // Remove the 'set' prefix
    [key deleteCharactersInRange:NSMakeRange(0, 3)];
    // Lowercase the first character
    NSString *lowercaseFirstChar = [[key substringToIndex:1] lowercaseString];
    [key replaceCharactersInRange:NSMakeRange(0, 1) withString:lowercaseFirstChar];
    if (value) {
        [backingStore setObject:value forKey:key];
    } else {
        [backingStore removeObjectForKey:key];
    }
}
@end
```

A similar approach is employed by CALayer, part of the CoreAnimation framework on iOS. This approach allows CALayer to be a key-value-coding-compliant container class, meaning that it can store a value against any key. CALayer uses this ability to allow the addition of custom animatable properties whereby the storage of the property values is handled directly by the base class, but the property definition can be added in a subclass.

## 13. Method Swizzling

方法交换会对类的所有实例都生效。

A class’s method list contains a list of **selector names to implementation mappings**, telling the dynamic messaging system where to find the implementation of a given method. The implementations are stored as function pointers called IMPs and have the following prototype:

`id (*IMP)(id, SEL, ...)`

Method Swizzling can be used to great advantage, as it can be used to change functionality in classes for which you don't have the source code, without having to subclass and override methods.

```objc
#import "objc/Runtime.h"
@implementation Demo (Yell) // category 中实现

// 1. 交换方法应在 load 方法
+(void)load{
    // 2. load 会被执行多次，所以交换方法应该放到 dispatch_once 中执行
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method originalMethod = class_getInstanceMethod([self class], @selector(hello));
        Method swizzledMethod = class_getInstanceMethod([self class], @selector(yellHello));
        // 3. 首先尝试添加方法实现（针对父类实现了，子类没实现的情况）
        BOOL didAddMethod = class_addMethod([self class],
                                            @selector(hello),
                                            method_getImplementation(swizzledMethod),
                                            method_getTypeEncoding(swizzledMethod));
        if (didAddMethod) {
            class_replaceMethod([self class],
                                @selector(yellHello),
                                method_getImplementation(originalMethod),
                                method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
    });
}

-(void)yellHello {
    // 4. 根据需要，交换的分类方法可以调用原实现
    [self yellHello];
    NSLog(@"Yell hello!");
}
```

## 14. Class Object

每个 Objective-C 对象实例都是指向某块内存的指针。`id` 类型是指向 `objc_object` 结构体的指针。

```c
typedef struct objc_object *id;
```

`objc_object` 结构体有一个 `isa` 指针，`Class` 类型是指向 `objc_class` 结构体的指针。

```c
struct objc_object {
    Class _Nonnull isa  OBJC_ISA_AVAILABILITY;
};

typedef struct objc_class *Class;
```

`objc_class` 结构体有两个特殊的指针，一个是 `isa`，指向它的 `metaclass`；一个是 `super_class`，指向它的父类。

```c
struct objc_class {
    Class _Nonnull isa;
    Class _Nullable super_class;
};
```

`super_class` 指针明确了继承关系；`isa` 指针描述了实例所属的类；类对象所属的类型是另外一个类，称为 metaclass，用来表述类对象本身的元数据，static 方法就定义于此处。每个类仅有一个“类对象”，每个“类对象”仅有一个与之相关的 metaclass。

![image](/assets/images/Screen Shot 2020-01-21 at 17.50.43.png)

通过这样的关系，我们可以查出对象是否能响应某个`selector`，是否遵循某个协议，以及对象位于类继承体系的哪一部分。
