---
title:  "Effective Objective-C (2) Runtime"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> AW.Effective.Objective-C.2.0

## 6. Property
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
实际上编译器使用 `_属性名` 如 `_firstName` 的方式作为真正的实例变量，并生成了存取方法。使用 @synthesize 可以更改这个默认的名字，但不建议这么做。

@dynamic 可以告诉编译器不要自动创建 `_属性名` 和存取方法，Core Data 框架中使用了这种声明。

属性的 attribute 会影响编译器所生成的存取方法。

第一类：原子性。如果没有声明 nonatomic，那么编译器默认使用同步锁，保证对该属性的操作是原子的（atomic）。

第二类：读写权限。readwrite 或 readonly。

第三类：内存管理。assign, strong, weak, unsafe_unretained, copy.

第四类：方法名 getter, setter（少见）

在 iOS 开发中，**所有属性都声明为 nonatomic**，这样做是因为在 iOS 中使用同步锁的开销较大，会带来严重的性能问题。因为一个 atomic 的属性并不能保证线程安全，还需采用更为深层的锁定机制。

## 7. Instance Variables

属性是成员变量的供外部访问的接口。在对象内部读取数据时，首先考虑直接读取实例变量。

## 8. Object Equality
NSObject 协议中有两个用于判断对象是否相等的关键方法：
```
- (BOOL)isEqual:(id)object;
- (NSUInteger)hash;
```
如果两个对象相等，其 hash 值必须相同；但两个 hash 值相同的对象不一定相等。

默认的 isEqual 比较的是内存地址，这对于我们来说没有什么意义。

hash 方法什么时候被调用? hash 方法在对象被添加至 NSSet 和设置为 NSDictionary 的 key 时会调用。NSSet 和 NSDictionary 在判断成员是否相等时，会首先判断 hash 值是否相等，hash 值不同的两个对象直接判断不相等；如果相等，再调用 `isEqual:`。

默认的哈希方法直接返回了内存地址，所以总是不同的。如果只实现了 `isEqual:` 而不实现 `hash`，那么即使我们定义了 object a is equals to object b，他们还是可以被放在 NSSet 里面，或者作为 NSDictionary 的 key，这不符合我们的定义。

If two different objects produce the same hash value, the hash table seeks from the calculated index and places the new object in the first available spot. We call this a hash collision. As a hash table becomes more congested, the likelihood of collision increases, which leads to more time spent looking for a free space (hence why a hash function with a uniform distribution is so desirable).

设计 hash 算法时，可以多做试验，在减少碰撞（collision）频度与降低运算复杂程度之间取舍。

## 9. Class Cluster
Use class cluster pattern to hide implementation detail.

UIButton 使用了工厂模式，可以隐藏 Abstract base class 背后的实现细节：
```
+ (UIButton*)buttonWithType:(UIButtonType)type;
```
在系统的框架中这种模式经常出现，称为 class cluster。

## 10: Use Associated Objects to Attach Custom Data to Existing Classes
```
id objc_getAssociatedObject(id object, void *key);
void objc_removeAssociatedObjects(id object);
```
Associated objects should be used only when another approach is not possible,
since they can easily introduce hard-to-find bugs.

## 11: objc_msgSend

Calling a function in C uses "**static binding**", which means that the function being called is known at compile time.

**Dynamic binding** is the mechanism by which methods in Objective-C are invoked. The method to call when a message is sent to an object in Objective-C is resolved at runtime.

Objective-C 中，我们写的所有方法最终都是 C 的形式，类似于：
```
<return_type> Class_selector(id self, SEL _cmd, parameters)
```
但调用哪个方法是完全运行时决定的，甚至可以在运行时改变。

对函数的调用： 
```
id returnValue = [receiver selector:params];
```

实际上是向对象发送消息：
```
id returnValue = objc_msgSend(receiver, @selector(messageName:), params);
```

The **selector** combined with the parameters is known as the message. A **selector** is the name that refers to a method. The term **selector** is often used interchangeably with the term **method**.

The `objc_msgSend` function calls the correct method, depending on the type of the receiver and the selector. In order to do this, the function:
- looks through the list of methods implemented by the receiver's class and, if it finds a method that matches the selector name, jumps to its implementation. 
- If not, the function traverse up the inheritance hierarchy to find the method to jump to. 
- If no matching method is found, **message forwarding** kicks in.

`objc_msgSend` caches the result in a fast map, one for each class, so that future message to the same class and selector combination are executed quickly. 

**Tail-call** optimization (尾调用优化) occurs when the last thing a function does is call another function.

## 12. Message Forwarding

如果消息接受者没有实现所调用方法，一直到它的继承关系中最顶层的父类也没有实现这个方法，那么消息转发就发生了。

1. Dynamic Method Resolution：首先，调用 `+(BOOL)resolveInstanceMethod:(SEL)selector`。这个方法在实现与 Core Data 有关的 @dynamic 属性时经常被用到。

2. Replacement Receiver：第二次尝试处理一个未知的 selector，是看有没有替补的消息接受者，方法是 `-(id)forwardingTargetForSelector:(SEL)selector` 一个对象可能在内部拥有多个对象，在这个方法中返回实际处理消息的对象，在外部看来好像它自己处理这个消息一样。

3. Full forward mechanism：如果以上都不能处理消息，最后一个方法就是通过创建一个 `NSInvocation` 对象，包装着未被处理的消息，然后调用 `-(void)forwardInvocation:(NSInvocation*)invocation`。并向上转发，如果继承关系里的所有父类都没有处理，那么最后，NSObject 的 `doesNotRecognizeSelector:` 方法会抛出一个异常。

⚠️ 注意，消息转发是需要开销的，而且越往后的步骤开销越大。

To illustrate how forwarding can be useful, the following example shows the use of dynamic method resolution to provide @dynamic properties. Consider an object that allows you to store any object in it, much like a dictionary, but provide access through properties.（可以通过点语法访问）

使用 @dynamic 声明属性：

![image]({{"/assets/images/Screen Shot 2018-08-02 at 14.54.03.png"}}){:width="600px"}

动态生成 getter 和 setter：

![image]({{"/assets/images/Screen Shot 2018-08-02 at 14.54.08.png"}}){:width="600px"}

可以通过点语法访问：

![image]({{"/assets/images/Screen Shot 2018-08-02 at 14.54.37.png"}}){:width="600px"}

A similar approach is employed by `CALayer`. This approach allows `CALayer` to be a key value coding-compliant container class, meaning that it can store a value against any key. `CALayer` uses this ability to allow the addition of custom animatable properties whereby the storage of the property values is handled directly by the base class, but the property definition can be added in a subclass.

## 13. Method Swizzling
Being able to add logging functionality by method swizzling can be a very useful **debugging** feature. It can be used to debug opaque methods.

Method Swizzling can be used to great advantage, as it can be used to change functionality in classes for which you don't have the source code, without having to subclass and override methods.

A class's method list contains a list of **selector names to implementation mappings**, telling the dynamic messaging system where to find the implementation of a given method. 

The implementations are stored as **function pointers** called **IMPs** and having the following prototype: 
```
id (*IMP)(id, SEL, ...)
```

## 14. Class Object