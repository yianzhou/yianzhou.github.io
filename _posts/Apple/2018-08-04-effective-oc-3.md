---
title: 'Effective Objective-C (3) Interface and API'
categories: [Effective Objective-C]
---

* Do not remove this line (it will not be displayed)
{:toc}

## 15. Use Prefix Names to Avoid Namespace Clashes

为类名添加前缀，与你的公司或应用名相关。

## 16: Have a Designated Initializer

提供一个 designated initializer，其它的初始化方法均应调用此方法。

## 17: Implement the description Method

This compact description can be used by forming a dictionary within your own description method and returning a string containing this dictionary’s description method.

```
- (NSString*)description {
    return [NSString stringWithFormat:@"<%@: %p, %@>",
    [self class],
    self,
    @{@"title":_title,
    @"latitude":@(_latitude),
    @"longitude":@(_longitude)}];
}
```

Another method to be aware of is `debugDescription`, called when you invoke the _print-object_ command within the debugger. The default implementation within the NSObject class simply calls directly through to description.

## 18. Prefer Immutable Objects

笔者建议大家尽量减少对象中的可变内容。在编程实践中，应该尽量把对外公布的属性设为只读，而且只在确有必要时才对外公布属性。有一些数据可能源自网络服务，它不会被修改，即使临时修改了也不会被推送到服务器。

不要把可变的 collection 作为属性公开！而应提供相关的方法。

## 19: Use Clear and Consistent Naming

Follow the naming that has become standard in Objective-C to create interfaces that fit in and feel right.

Ensure that method names are concise but precise, and make their use read left to right just like a sentence.

## 20: Prefix Private Method Names

When writing a class implementation, it is common to write methods that are used only internally. For such methods, I suggest that you prefix their names with something. This helps with debugging by clearly separating the public methods from the private ones.

## 21. Objective-C Error Model

Use exceptions only for **fatal errors** that should bring down the entire application.

For nonfatal errors, either provide a delegate method to handle errors or offer an out-parameter NSError object.

## 22. NSCopying

Implement the `NSCopying` protocol if your object will need to be copied.

A **deep copy** copies all the backing data. Copying by default for all the collection classes in `Foundation` is **shallow copy**, meaning that only the container is copied, not the data stored within the container.

**No** protocol defines deep copying, so it is left up to each class to define how such a copy is made. Also, you should never assume that an object conforming to NSCopying will be performing a deep copy.
