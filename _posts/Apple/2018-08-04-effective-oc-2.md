---
title: "Effective Objective-C (2) Objects, Messaging, and the Runtime"
categories: [Effective Objective-C]
---

* Do not remove this line (it will not be displayed)
{:toc}

# 6. Property

@property 的本质是什么？@property = ivar + getter + setter;

You can declare instance variables in the public interface for a class as follows:

```objc
@interface EOCPerson : NSObject {
@public
    NSDate *_dateOfBirth;
    NSString *_firstName;
    NSString *_lastName;
@private
    NSString *_someInternalData;
}
@end
```

This will be familiar if you are coming from the worlds of Java or C++, where you can define the scope of instance variables. However, this technique is rarely used in modern Objective-C.

The problem with the approach is that the layout of an object is defined at compile time. 对象的内存布局在编译期就已经确定了。 Whenever the `_firstName` variable is accessed, the compiler hardcodes the offset into the memory region where the object is stored.

This works fine until you add another instance variable. Code that makes use of calculating the offset at compile time will break unless recompiled when the class definition changes. For example, code may exist in a library that uses an old class definition. If linked with code using the new class definition, there will be an incompatibility at runtime. To overcome this problem, languages have invented a variety of techniques. The approach Objective-C has taken is to make instance variables special variables held by **class objects** storing the offset. Then at runtime, the offset is looked up so that if the class definition changes, the offset stored is updated; whenever an access to the instance variable is made, the correct offset is used.

You can even add instance variables to classes at runtime. This is known as the nonfragile Application Binary Interface (ABI). An ABI defines, among other things, the conventions for how code should be generated. The nonfragile ABI also means that instance variables can be defined in a class-continuation category or in the implementation. So you don’t have to have all your instance variables declared in the interface anymore, and you therefore don’t leak internal information about your implementation in the public interface.（[Swift ABI 的稳定](https://onevcat.com/2019/02/swift-abi/))

```
@interface EOCPerson: NSObject
@property NSString *firstName;
@property NSString *lastName;
@end
```

属性是 Objective-C 的特性，让编译器自动生成与属性相关的存取方法。使用“点语法”等同于调用了存取方法。

```
EOCPerson* per = [[Person alloc] init];
per.firstName = @"Bob"; //setter
NSLog("%@", per.firstName); //getter
```

实际上编译器使用 `_属性名` 如 `_firstName` 作为真正的实例变量，并生成了存取方法。使用 @synthesize 可以更改这个默认的名字，但不建议这么做。

@dynamic 可以告诉编译器不要自动创建实例变量 `_firstName` 和存取方法，Core Data 框架中使用了这种声明。

属性的 attribute 会影响编译器所生成的存取方法：

一、原子性。如果没有声明 nonatomic，那么编译器默认使用同步锁，保证对该属性的操作是原子的（atomic）。在 iOS 开发中，**所有属性都声明为 nonatomic**，这样做是因为在 iOS 中使用同步锁的开销较大，会带来严重的性能问题。而且一个 atomic 的属性并不能保证线程安全，要保证线程安全，还需采用更为深层的锁定机制。

Atomic accessors include locks to ensure atomicity. This means that if two threads are reading and writing the same property, the value of the property at any given point in time is valid. Without the locks, or nonatomic, the property value may be read on one thread while another thread is midway through writing to it. If this happens, the value that’s read could be invalid.

If you’ve been developing for iOS at all, you’ll notice that all properties are declared nonatomic. The reason is that, historically, the locking introduces such an overhead on iOS that it becomes a performance problem. Usually, atomicity is not required anyway, since it does not ensure thread safety, which usually requires a deeper level of locking. For example, even with atomicity, a single thread might read a property multiple times immediately after one another and obtain different values if another thread is writing to it at the same time. Therefore, you will usually want to use nonatomic properties on iOS. But on Mac OS X, you don’t usually find that atomic property access is a performance bottleneck.

二、读写权限（readwrite 或 readonly）

三、内存管理（ARC）

| assign | The setter is a simple assign operation used for scalar types, such as `CGFloat` or `NSInteger`. |
| unsafe_unretained | This has the same semantics as assign but is used where the type is an object type to indicate a nonowning relationship (unretained) that is not nilled out (unsafe) when the target is destroyed, unlike weak. |
| strong | This designates that the property defines an owning relationship. When a new value is set, it is first retained, the old value is released, and then the value is set. |
| weak | This designates that the property defines a nonowning relationship. When a new value is set, it is not retained; nor is the old value released. This is similar to what assign does, but the value is also nilled out when the object pointed to by the property at any time is destroyed. |
| copy | This designates an owning relationship similar to strong; however, instead of retaining the value, it is copied. This is often used when the type is NSString\* to preserve encapsulation, since the value passed into the setter might be an instance of the subclass NSMutableString. If it’s this mutable variant, the value could be mutated after the property is set, without the object’s knowing. So an immutable copy is taken to ensure that the string cannot change from underneath the object. Any object that may be mutable should take a copy. |

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
@property(nonatomic, copy) NSString* str;
@property(nonatomic, copy) NSArray* arr;
@property(nonatomic, copy) NSDictionary* dic;
@property(nonatomic, copy) NSSet* set;

// 可变类型不能用 copy，会崩溃！
@property(nonatomic, strong) NSMutableString* str;
@property(nonatomic, strong) NSMutableArray* arr;
@property(nonatomic, strong) NSMutableDictionary* dic;
@property(nonatomic, strong) NSMutableSet* set;
```

在 category 中添加 property 要用到 `objc_setAssociatedObject`，其中 `objc_AssociationPolicy` 常用的有三种：

- OBJC_ASSOCIATION_ASSIGN
- OBJC_ASSOCIATION_COPY_NONATOMIC
- OBJC_ASSOCIATION_RETAIN_NONATOMIC

四、方法名 getter, setter（少用）

# 7. Instance Variables

A good compromise is to write instance variables using the setter and to read using direct access. Doing so has the benefit of fast reading and not losing the control of writing via properties.

Within initializers and dealloc, always read and write data directly through instance variables, because subclasses could override the setter.

You will need to read data through properties when that data is being lazily initialized.

# 8. Object Equality

NSObject 协议中有两个用于判断对象是否相等的关键方法：

```
- (BOOL)isEqual:(id)object;
- (NSUInteger)hash;
```

The default implementations of these methods from the NSObject class itself work such that two objects are equal if and only if their pointer values are exactly the same.

哈希值在对象被加入哈希表时会用到（例如添加至 NSSet、设置为 NSDictionary 的 key 时）。在判断元素是否相等时，会首先判断 hash 值是否相等，hash 值不同的两个对象直接判断不相等；如果相等，再调用 `isEqual:`。

默认的哈希方法直接返回了内存地址，所以总是不同的。如果只实现了 `isEqual:` 而不实现 `hash`，那么即使我们定义了 object a is equals to object b，他们还是可以被放在一个集合里面，这不符合我们的定义。

哈希值是用作计算元素在哈希表中的位置的。如果两个对象相等，其 hash 值必须相同；但两个 hash 值相同的对象不一定相等。两个不同的元素哈希值相同，这种情况称为哈希冲突。

# 9. Class Cluster

A class cluster is a great way to hide implementation detail behind an abstract base class.

An example from UIKit is UIButton. To create a button, you call the following class method:

```
+ (UIButton*)buttonWithType:(UIButtonType)type;
```

This **Factory pattern** is one way of creating a class cluster.

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

# 10: Associated Objects

```
id objc_getAssociatedObject(id object, void *key);
void objc_removeAssociatedObjects(id object);
```

Associated objects should be used only when another approach is not possible,
since they can easily introduce hard-to-find bugs.

# 11: objc_msgSend

Calling a function in C uses "static binding", which means that the function being called is known at compile time. **Dynamic binding** is the mechanism by which methods in Objective-C are invoked. The method to call when a message is sent to an object in Objective-C is resolved at runtime.

Every method of an Objective-C object can be thought of as a simple C function, whose prototype is of the following form:

```c
<return_type> Class_selector(id self, SEL _cmd, parameters);
```

Note that the prototype is strangely similar to the `objc_msgSend` function itself. This is no coincidence. It makes jumping to the method simpler and can make good use of tail-call optimizations. Tail-call optimization occurs when the last thing a function does is call another function. Instead of pushing a new stack frame, the compiler can emit code to jump to the next function. This can be done only if the final thing a function does is call another function and does not need to use the return value for anything. Using this optimization is crucial for `objc_msgSend` because without it, the stack trace would show `objc_msgSend` right before every Objective-C method. Also, stack overflow would occur prematurely.

但调用哪个方法是完全运行时决定的，甚至可以在运行时改变。

对函数的调用：

```
id returnValue = [receiver selector:params];
```

实际上是向对象发送消息：

```
id returnValue = objc_msgSend(receiver, @selector(messageName:), params);
```

The selector combined with the parameters is known as the message. A selector is the name that refers to a method. The term **selector** is often used interchangeably with the term **method**.

The `objc_msgSend` function calls the correct method, depending on the type of the receiver and the selector. In order to do this, the function:

- looks through the list of methods implemented by the receiver's class and, if it finds a method that matches the selector name, jumps to its implementation.
- If not, the function traverse up the inheritance hierarchy to find the method to jump to.
- If no matching method is found, **message forwarding** kicks in.

`objc_msgSend` caches the result in a fast map, one for each class, so that future message to the same class and selector combination are executed quickly.

# 12. Message Forwarding

如果消息接受者没有实现所调用方法，一直到它的继承关系中最顶层的父类也没有实现这个方法，那么消息转发就发生了。

开发者在编写自己的类时，可于转发过程中设置挂钩，用于执行预定的逻辑。

1\. Dynamic Method Resolution 动态方法解析：首先，调用 `+(BOOL)resolveInstanceMethod:(SEL)selector`。表示这个类是否能新增一个实例方法处理这个 selector。这个方法在实现与 Core Data 有关的 @dynamic 属性时经常被用到。

```objc
+ (BOOL) resolveInstanceMethod:(SEL)aSEL
{
    if (aSEL == @selector(resolveThisMethodDynamically))
    {
          class_addMethod([self class], aSEL, (IMP) dynamicMethodIMP, "v@:");
          return YES;
    }
    return [super resolveInstanceMethod:aSel];
}
```

2\. Replacement Receiver 替补接收者：第二次尝试处理一个未知的 selector，是看有没有替补的消息接受者，方法是 `-(id)forwardingTargetForSelector:(SEL)selector` 一个对象可能在内部拥有多个对象，在这个方法中返回实际处理消息的对象，在外部看来好像它自己处理这个消息一样。

3\. Full forward mechanism：如果以上都不能处理消息，最后一个方法就是通过创建一个 `NSInvocation` 对象，包装着未被处理的消息，然后调用 `-(void)forwardInvocation:(NSInvocation*)invocation`。并向上转发，如果继承关系里的所有父类都没有处理，那么最后，NSObject 的 `doesNotRecognizeSelector:` 方法会抛出一个异常。

```objc
- (void)forwardInvocation:(NSInvocation *)invocation
{
    SEL aSelector = [invocation selector];
    if ([friend respondsToSelector:aSelector])
        [invocation invokeWithTarget:friend];
    else
        [super forwardInvocation:invocation];
}
```

注意，消息转发是需要开销的，而且越往后的步骤开销越大。

To illustrate how forwarding can be useful, the following example shows the use of dynamic method resolution to provide @dynamic properties. Consider an object that allows you to store any object in it, much like a dictionary, but provide access through properties.（可以通过点语法访问）

使用 @dynamic 声明属性：

![image]({{"/assets/images/Screen Shot 2018-08-02 at 14.54.03.png"}}){:width="600px"}

动态生成 getter 和 setter：

![image]({{"/assets/images/Screen Shot 2018-08-02 at 14.54.08.png"}}){:width="600px"}

可以通过点语法访问：

![image]({{"/assets/images/Screen Shot 2018-08-02 at 14.54.37.png"}}){:width="600px"}

A similar approach is employed by `CALayer`. This approach allows `CALayer` to be a key value coding-compliant container class, meaning that it can store a value against any key. `CALayer` uses this ability to allow the addition of custom animatable properties whereby the storage of the property values is handled directly by the base class, but the property definition can be added in a subclass.

# 13. Method Swizzling

方法交换会对类的所有实例都生效。

Being able to add logging functionality by method swizzling can be a very useful **debugging** feature. It can be used to debug opaque methods.

Method Swizzling can be used to great advantage, as it can be used to change functionality in classes for which you don't have the source code, without having to subclass and override methods.

```objc
@interface Demo (Yell) // category 中实现

#import "objc/Runtime.h"

@implementation Demo (Yell)

// 2. 交换方法应在+load方法
+(void)load{
    // 3. 交换方法应该放到 dispatch_once 中执行
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method originalMethod = class_getInstanceMethod([self class], @selector(hello));
        Method swizzledMethod = class_getInstanceMethod([self class], @selector(yellHello));
        // 1. 避免交换父类方法（父类实现了，子类没实现）
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

// 4. 交换的分类方法应该添加自定义前缀，避免冲突
-(void)yellHello {
    // 5. 交换的分类方法应调用原实现
    [self yellHello];
    NSLog(@"Yell hello!");
}
```

A class's method list contains a list of selector names to implementation mappings, telling the dynamic messaging system where to find the implementation of a given method.

The implementations are stored as function pointers called **IMPs** and having the following prototype:

```
id (*IMP)(id, SEL, ...)
```

# 14. Class Object

每个 Objective-C 对象实例都是指向某块内存的指针。`id`类型是指向`objc_object`结构体的指针。

```
typedef struct objc_object *id;
```

`objc_object`结构体有一个`isa`指针，`Class`类型是指向`objc_class`结构体的指针。

```
struct objc_object {
    Class _Nonnull isa  OBJC_ISA_AVAILABILITY;
};

typedef struct objc_class *Class;
```

`objc_class`结构体有两个特殊的指针，一个是`isa`，指向它的`metaclass`；一个是`super_class`，指向它的父类。

```
struct objc_class {
    Class _Nonnull isa;
    Class _Nullable super_class;
};
```

`super_class`指针明确了继承关系；`isa`指针描述了实例所属的类；类对象所属的类型是另外一个类，称为`metaclass`，用来表述类对象本身的元数据，`static`方法就定义于此处。每个类仅有一个“类对象”，每个“类对象”仅有一个与之相关的 metaclass。

![image]({{"/assets/images/Screen Shot 2020-01-21 at 17.50.43.png"}})

通过这样的关系，我们可以查出对象是否能响应某个`selector`，是否遵循某个协议，以及对象位于类继承体系的哪一部分。
