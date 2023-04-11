# Aspects

## 面向切面编程

Runtime Method Swizzling 编程方式，也可以叫作 AOP（Aspect-Oriented Programming，面向切面编程）。AOP 是一种编程范式，也可以说是一种编程思想，使用 AOP 可以解决 OOP（Object Oriented Programming，面向对象编程）由于切面需求导致单一职责被破坏的问题。通过 AOP 可以不侵入 OOP 开发，非常方便地插入切面需求功能。

比如无侵入埋点方案，通过 AOP 在不侵入原有功能代码的情况下，插入埋点。如果没有使用 AOP，鉴于 OOP 的局限性，这些与主业务无关的代码就会到处都是，加大维护成本。

Aspect-oriented programming (AOP) is used to encapsulate "cross-cutting" concerns. These are the kind of requirements that cut-across many modules in your system, and so cannot be encapsulated using normal object oriented programming. Some examples of these kinds of requirements:

- Whenever a user invokes a method on the service client, security should be checked.
- Whenever a user interacts with the store, a genius suggestion should be presented, based on their interaction.
- All calls should be logged.

参考开源库：<https://github.com/steipete/Aspects> Think of Aspects as method swizzling on steroids 类固醇. It allows you to add code to existing methods per class or per instance, whilst thinking of the insertion point e.g. before/instead/after. Aspects automatically deals with calling super and is easier to use than regular method swizzling.

## Aspects 实现原理

`AspectsContainer`: Tracks all aspects for an object/class.

`AspectIdentifier`: Tracks a single aspect.

Aspects 和 kvo 的原理类似，将 hook 对象的 isa 指针指向动态创建的子类，把子类 `forwardInvocation:` 的 IMP 指向 `(IMP)__ASPECTS_ARE_BEING_CALLED__`，交换方法 `__aspects_forwardInvocation:` 的 IMP 指向原来的实现。

需要 hook 的 selector，其 IMP 替换成 `_objc_msgForward`，使方法调用进入消息转发流程 `forwardInvocation:`，在 `__ASPECTS_ARE_BEING_CALLED__` 方法里，执行我们自定义的 block。

```objc
static id aspect_add(id self, SEL selector, AspectOptions options, id block, NSError **error) {
    __block AspectIdentifier *identifier = nil;
    // 使用 OSSpinLock 加锁
    aspect_performLocked(^{
        // 检查是否可以 hook
        if (aspect_isSelectorAllowedAndTrack(self, selector, options, error)) {
            // 为当前实例设置关联对象作为 aspectContainer，关联对象的 key 是 AspectsMessagePrefix + selector 的名称
            AspectsContainer *aspectContainer = aspect_getContainerForObject(self, selector);
            identifier = [AspectIdentifier identifierWithSelector:selector object:self options:options block:block error:error];
            if (identifier) {
                [aspectContainer addAspect:identifier withOptions:options];
                // 开始进入 hook 流程
                aspect_prepareClassAndHookSelector(self, selector, error);
            }
        }
    });
    return identifier;
}

static void aspect_prepareClassAndHookSelector(NSObject *self, SEL selector, NSError **error) {
    NSCParameterAssert(selector); // "buttonPressed:"

    // 创建子类，并交换 `forwardInvocation:` 方法，self 的 isa 指针指向子类！
    Class klass = aspect_hookClass(self, error);
    Method targetMethod = class_getInstanceMethod(klass, selector);
    IMP targetMethodIMP = method_getImplementation(targetMethod); // (AspectsDemo`-[AspectsViewController buttonPressed:] at AspectsViewController.m:14)

    if (!aspect_isMsgForwardIMP(targetMethodIMP)) {
        const char *typeEncoding = method_getTypeEncoding(targetMethod);
        SEL aliasSelector = aspect_aliasForSelector(selector); // "aspects__buttonPressed:"
        if (![klass instancesRespondToSelector:aliasSelector]) {
            // aliasSelector 的 IMP 指向原实现
            class_addMethod(klass, aliasSelector, method_getImplementation(targetMethod), typeEncoding);
        }
        // 当前实例 self 的 selector 指向 `forwardInvocation:`
        class_replaceMethod(klass, selector, aspect_getMsgForwardIMP(self, selector), typeEncoding);
    }
}

static Class aspect_hookClass(NSObject *self, NSError **error) {
    Class statedClass = self.class; // NSObject `- (Class)class;` Returns the class object for the receiver’s class.
    Class baseClass = object_getClass(self); // Returns the class of an object.
    NSString *className = NSStringFromClass(baseClass);

    // 创建动态子类！子类的名称是 “当前实例的类名 + AspectsSubclassSuffix”
    const char *subclassName = [className stringByAppendingString:AspectsSubclassSuffix].UTF8String;
    Class subclass = objc_getClass(subclassName);
    if (subclass == nil) {
        /**
        * Creates a new class and metaclass.
        * @param superclass The class to use as the new class's superclass.
        * @param name The string to use as the new class's name. The string will be copied.
        * @return The new class
        */
        subclass = objc_allocateClassPair(baseClass, subclassName, 0);

        // 子类 `forwardInvocation:` 的 IMP 指向 (IMP)__ASPECTS_ARE_BEING_CALLED__
        // `__aspects_forwardInvocation:` 的 IMP 指向原来的实现
        aspect_swizzleForwardInvocation(subclass);

        // 替换 `- (Class)class;` 方法的 IMP 使其返回 statedClass
        aspect_hookedGetClass(subclass, statedClass); // UIImagePickerController_Aspects_, UIImagePickerController
        aspect_hookedGetClass(object_getClass(subclass), statedClass); // UIImagePickerController_Aspects_, UIImagePickerController

        objc_registerClassPair(subclass);
    }
    object_setClass(self, subclass); // self 的 isa 指针指向动态创建的子类！
    return subclass;
}
```
