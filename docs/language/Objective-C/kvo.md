---
sidebar_position: 2
---

# KVO

## 原理

[Key-Value Observing Implementation Details](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/KeyValueObserving/Articles/KVOImplementation.html)

```objc
- (void)viewDidLoad {
    [super viewDidLoad];

    self.demo1 = [[DemoObject alloc] init];
    self.demo2 = [[DemoObject alloc] init];

    NSKeyValueObservingOptions options = NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld;
    [self.demo1 addObserver:self forKeyPath:@"count" options:options context:nil];

    NSLog(@"%@", object_getClass(self.demo1)); // NSKVONotifying_DemoObject
    NSLog(@"%@", object_getClass(self.demo2)); // DemoObject
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSKeyValueChangeKey,id> *)change
                       context:(void *)context {
    NSLog(@"%@", keyPath);
    NSLog(@"%@", object);
    NSLog(@"%@", change);
}
```

可以看到，添加了 KVO 观察者后，对象的类发生了改变。实际上是系统在运行时动态为 `DemoObject` 创建了子类 `NSKVONotifying_DemoObject`，并将 `demo1` 实例对象的 `isa` 指针指向了这个新的子类。然后，通过重写子类的 `set` 方法，来实现 KVO。

![img](/img/E165CC54-437E-467E-8984-5109C73943E5.png)

通过断点调试打印方法的实现，可以看到，在添加观察者后，`setCount:` 的方法实现变成了 Foundation 内部的方法 `_NSSetIntValueAndNotify`（根据属性的不同类型，Foundation 内部会调用不同的方法）。

由于 KVO 的关键是重写 `set` 方法，因此直接修改成员变量显然是不可能触发 KVO 的。

KVO 的内部实现是类似于这样的：

```objc
- (void)setCount:(NSUInteger)count {
    _NSSetIntValueAndNotify();
}

void _NSSetIntValueAndNotify() {
    [self willChangeValueForKey:@"count"];
    [super setCount:count];
    [self didChangeValueForKey:@"count"];
}

- (void)didChangeValueForKey:(NSString *)key {
    // 在这里通知观察者
}
```

可以通过 runtime 打印 `NSKVONotifying_DemoObject` 类对象里的方法列表，来窥探其内部实现了哪些方法：

```objc
- (void)printMethodListWithClass:(Class)cls {
    unsigned int count = 0;
    Method *methodList = class_copyMethodList(cls, &count);
    for (int i = 0; i < count; i++) {
        Method *method = &methodList[i];
        NSString *name = NSStringFromSelector(method_getName(*method));
        NSLog(@"%@", name);
    }
    free(methodList);
}

/** 输出：
2022-06-26 17:01:27.445053+0800 ocdemo[15670:4354180] setCount:
2022-06-26 17:01:27.445115+0800 ocdemo[15670:4354180] class
2022-06-26 17:01:27.445161+0800 ocdemo[15670:4354180] dealloc
2022-06-26 17:01:27.445196+0800 ocdemo[15670:4354180] _isKVOA
*/
```

如果希望手动触发 KVO，可以通过调用 `willChangeValueForKey:` 和 `didChangeValueForKey:` 来触发。

## KVC

KVC 指的是 `NSObject` 遵循的 `NSKeyValueCoding` 协议：

```c
- valueForKey:
- valueForKeyPath:
- setValue:forKey:
- setValue:forKeyPath:
```

KVC 赋值的全过程（取值的全过程与赋值是类似的）：

首先，找 `set` 方法并调用：

![img](/img/21CB3091-1826-4A97-95E1-E1F9613C3B39.png)

如果没有 `set` 方法，则找 `_set` 方法：

![img](/img/43FB1F7B-74EF-420C-B1A4-898832F9F984.png)

如果还找不到，在 `+accessInstanceVariablesDirectly` 返回 `YES` 的前提下，会尝试直接访问成员变量，并按照 `_age`, `_isAge`, `age`, `isAge` 的顺序来查找成员变量：

![img](/img/D0E5D8C9-0CF1-4F46-9B51-025D14E8EA01.png)

KVC 的方法调用会触发 KVO，哪怕对象没有 `set` 方法：

![img](/img/151725FA-69C8-473F-9230-17B295C2280C.png)

如果找不到 set 方法和实例变量，会抛出异常：

```
*** Terminating app due to uncaught exception 'NSUnknownKeyException',
reason: '[<WKPreferences 0x30240e200> setValue:forUndefinedKey:]:
this class is not key value coding-compliant for the key upgradeMixedContentEnabled.'
```
