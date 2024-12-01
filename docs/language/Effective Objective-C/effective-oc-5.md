# Memory Management

## 29: Reference Counting

在引用计数的架构下，每个对象都有个“计数器”，表示有多少事物想令对象存活下去。

- `retain`: increment the retain count (reference count)
- `release`: decrement the retain count
- `autorelease`: decrement the retain count later, when the autorelease pool is drained.

Object may has reference to other objects, thereby forming what is known as an object graph.

Objects are said to own other objects if they hold a strong reference to them. This means that they have registered their interest in keeping them alive by retaining them. When they are finished with them, they release them.

```objc
- (void)setFoo:(id)foo {
    [foo retain];
    [_foo release];
    _foo = foo;
}
```

The order is important. If the old value was release before the new value was retained and the two values are exactly the same, the release would mean that the object could potentially be deallocated prematurely.

In a garbage-collected environment, retain cycle would usually be picked up as a "island of isolation", the collector would deallocate all three objects.

In a reference counting environment, this leads to memory leaks, and usually solved by using weak reference.

## 30: Auto Reference Counting

编译器知道哪些语句会令对象的引用计数增加，如果没有对应的减少操作，那么就会有内存泄漏。既然编译器知道，那么它现在多做了一步——自动帮我们管理引用计数。

ARC 比 MRC 效率更高，因为它直接调用底层 C 的函数，而不是封装后的 Objective-C 方法。MRC 时代的方法在 ARC 环境下都不允许调用，包括 `retain`、`release`、`autorelease`、`dealloc`。

ARC 管理对象生命周期的基本方法是：在合适的地方插入“保留”和“释放”操作。在 ARC 环境下，变量的内存管理语义可以通过修饰符来指明。

如果调用了以 alloc, new, copy, mutableCopy 开头的方法（owning prefix），那么其返回的对象归调用者拥有，调用者必须负责将它们释放。

Any other method name indicates that any returned object will be returned not owned by the calling code. In these cases, the object will be returned autoreleased, so that the value is alive across the method call boundary. If it wants to ensure that the object stays alive longer, the calling code must retain it.

举例：

```objc
+ (EOCPerson*)newPerson {
    EOCPerson *person = [[EOCPerson alloc] init];
    return person;
    /**
     * The method name begins with 'new', and since 'person'
     * already has an unbalanced +1 retain count from the
     * 'alloc', no retains, releases, or autoreleases are
     * required when returning.
     */
}

+ (EOCPerson*)somePerson {
    EOCPerson *person = [[EOCPerson alloc] init];
    return person;
    /**
     * The method name does not begin with one of the "owning"
     * prefixes, therefore ARC will add an autorelease when
     * returning 'person'.
     * The equivalent manual reference counting statement is:
     *   return [person autorelease];
     */
}

- (void)doSomething {
    EOCPerson *personOne = [EOCPerson newPerson];
    // ...
    EOCPerson *personTwo = [EOCPerson somePerson];
    // ...
    /**
     * At this point, 'personOne' and 'personTwo' go out of
     * scope, therefore ARC needs to clean them up as required.
     * - 'personOne' was returned as owned by this block of
     *   code, so it needs to be released.
     * - 'personTwo' was returned not owned by this block of
     *   code, so it does not need to be released.
     * The equivalent manual reference counting cleanup code
     * is:
     *    [personOne release];
     */
}
```

Objective-C 通过上述的命名约定，将内存管理标准化。

ARC 也包含运行时组件。处理优化 `autorelease` 和 `retain` 先后出现等情况。

The semantics of local and instance variables can be altered through the application of the following qualifiers:

- `__strong`: The default; the value is retained.
- `__unsafe__unretained`: The value is not retained and is potentially unsafe, as the object may have been deallocated already by the time the variable is used again.
- `__weak`: The value is not retained but is safe because it is automatically set to nil if the current object is ever deallocated.
- `__autoreleasing`: This special qualifier is used when an object is passed by reference to a method. The value is autoreleased on return.

You still need to clean up any non-Objective-C objects if you have any, such as CoreFoundation objects or heap-allocated memory with `malloc()`.

```objc
- (void)dealloc {
    CFRelease(_coreFoundationObject);
    free(_heapAllocatedMemoryBlob);
}
```

`__autoreleasing` 我们一般很少显式使用，通常由编译器隐式添加。比如 NSFileManager 的接口：

`- (nullable NSArray<NSString *> *)contentsOfDirectoryAtPath:(NSString *)path error:(NSError **)error);`

## 31: Release References and Clean Up Observation State Only in dealloc

你绝对不应该自己调用 dealloc 方法，Runtime 会在适当时候调用。

在 dealloc 方法中，应该做的是释放其它对象的引用，取消订阅的 KVO 或 NSNotificationCenter 通知，不要做其他事情。

```objc
- (void)dealloc {
    CFRelease(coreFoundationObject); // CoreFoundation object 不归 ARC 管理，须自行释放
    [[NSNotificationCenter defaultCenter] removeObserver: self]; // 解除监听
}
```

## 32: Beware of Memory Management with Exception-Safe Code

C++ and Objective-C exceptions are compatible, meaning that an exception thrown from one language can be caught using a handler from the other language.

Inside a try block, if an object is retained and then an exception is thrown before the object has been released, the object will leak unless this case is handled in the catch block. C++ destructors are run by the Objective-C exception-handling routines. This is important for C++ because any object whose lifetime has been cut short by a thrown exception needs to be destructed; otherwise, the memory it uses will be leaked, not to mention all the other system resources, such as file handles, that may not be cleaned up properly.

## 33: Use Weak References to Avoid Retain Cycles

`@property(nonatomic, unsafe_unretained) EOCPerson *other;` 用 unsafe_unretained 修饰的属性，语义上同 assign 等价，表明属性值可能不安全，并且不归此实例所拥有。

weak 与 unsafe_unretained 的作用完全相同。只要系统把属性回收，属性值就会自动设为 nil；而 unsafe_unretained 属性仍然指向原来的位置，不安全。

## 34: Use Autorelease Pool Blocks to Reduce High-Memory Waterline

One of the features of Objective-C’s reference-counted architecture is a concept known as autorelease pools. Releasing an object means that its retain count either is decremented immediately through a call `[obj release]` or is added to an auto-release pool through a call `[obj autorelease]`.

An autorelease pool is used as a collection of objects that will need releasing at some point in the future. When a pool is drained, all the objects in the pool at that time are sent the release message.

If no autorelease pool is in place when an object is sent the autorelease message, you will see a message like this in the console:

> Object 0xabcd0123 of class `__NSCFString` autoreleased with no pool in place - just leaking - break on objc_autoreleaseNoPool() to debug

Often, the only one you will ever see in an application is the one that wraps the main application entry point in the main function:

```objc
int main(int argc, char *argv[]) {
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, @"EOCAppDelegate");
    }
}
```

Technically, this autorelease pool block is **unnecessary**. The end of the block coincides with the application terminating, at which point the operating system releases all memory used by the application. Without it, any objects autoreleased by the UIApplicationMain function would not have a pool to go into and would log a warning saying just that. So this pool can be thought of as an outer catch-all pool.

The braces in `@autoreleasepool {}` define the scope of the autorelease pool. A pool is created at the first brace and is automatically drained at the end of the scope. Any object autoreleased within the scope is therefore sent the release message at the end of the scope.

Autorelease pools can be nested. When an object is autoreleased, it is added to the innermost pool. This nesting of autorelease pools can be taken advantage of to allow the control of the _high memory mark_ of an application.

Autorelease pools can be thought of as being in a stack. When an autorelease pool is created, it is pushed onto the stack; when it is drained, it is pulled off the stack. When an object is autoreleased, it is put into the topmost pool in the stack.

The need to make this additional pool optimization depends entirely on your application. It is certainly not something that should be done without first monitoring the memory footprint to decide whether a problem needs addressing. Autorelease pool blocks do not incur too much overhead, but they do incur at least some overhead, so if the extra autorelease pool can be avoided, it should be.

## 35: Use Zombies to Help Debug Memory-Management Problems

启用了 "Zombie Object" 这个调试功能之后，Runtime 会把所有已经释放的实例转化为特殊的僵尸对象，而不会真正回收他们。僵尸对象所在的核心内存无法被重用，不可能被覆写，当尝试向僵尸对象发送消息时，程序会抛出异常，其中准确说明了发送过来的消息，并描述了回收之前的那个对象。僵尸对象是调试内存管理问题的最佳方式。

## 36: Avoid Using retainCount

When ARC came along, the retainCount method was deprecated, and using it causes a compiler error to be emitted.
