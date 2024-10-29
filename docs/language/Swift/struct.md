# Swift 里怎么写一个链表

前段时间面试 iOS 开发的时候，出了一道简单的代码题——反转链表。

本来是很简单的一道题，没想到一上来在链表节点这里就卡住了，平时我们一般用 C++ 写链表节点：

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
};
```

看起来很自然对吧，然而，候选人使用了 Swift 里的 `struct` 来实现链表节点：

```swift
struct ListNode {
    var val: Int = 0;
    var next: ListNode? = nil;
};
```

于是就产生了第一个报错：

<img alt="" src="/img/0708D16C-A807-4F50-84DA-6DDE9C854342.png" />

C++ 的 struct 和 Swift 的 struct 有什么区别呢？其实没什么区别，两者都是值类型，值类型意味着在函数传参、赋值等情形中，结构体里的所有元素都会被拷贝并产生一份新的数据。

问题出在了指针这里。Swift 被设计成一种安全的语言，它不能直接操作指针。而结构体的内存地址，就是它首个元素的内存地址。因此，要在值类型的 `ListNode` 里面再放一个值类型的 `ListNode` 显然会造成数据的递归嵌套。

那么如果非要用指针呢？Swift 提供了**非安全**的方法来间接使用指针：

```swift
struct ListNode {
    var val: Int
    var next: UnsafePointer<ListNode>?

    init(val: Int) {
        self.val = val
        self.next = nil
    }
}

// 创建链表节点
var node1 = ListNode(val: 1)
var node2 = ListNode(val: 2)
var node3 = ListNode(val: 3)

// 使用 withUnsafeMutablePointer 创建指向节点的指针
let pointer1 = withUnsafeMutablePointer(to: &node1) { $0 }
let pointer2 = withUnsafeMutablePointer(to: &node2) { $0 }
let pointer3 = withUnsafeMutablePointer(to: &node3) { $0 }

// 链接节点
pointer1.pointee.next = UnsafePointer(pointer2)
pointer2.pointee.next = UnsafePointer(pointer3)

// 打印链表
var currentPointer: UnsafeMutablePointer<ListNode>? = pointer1
while let current = currentPointer {
    print(current.pointee.val)
    currentPointer = UnsafeMutablePointer(mutating: current.pointee.next)
}
```

`withUnsafePointer`和`withUnsafeMutablePointer`的用法类似，它允许你在一个闭包中访问一个对象的指针，例如：

```swift
var number: Int = 42

withUnsafePointer(&number) { pointer in
    // 在这个闭包中，你可以使用 pointer 来访问 number 的内存地址
    print("The address of number is: \(pointer)")
    print("The value at that address is: \(pointer.pointee)")
}
```

在官方文档中提到该函数的注意事项：

> The pointer argument to body is valid only during the execution of `withUnsafeMutablePointer(to:_:)`. Do not store or return the pointer for later use.

显然官方并不建议我们把指针拿到闭包外去使用，这会破坏 Swift 所提倡的安全性。

既然 struct + 指针的写法不安全，有没有别的方式呢？其实 Swift 的枚举也可以用于实现链表：

```swift
indirect enum ListNode<T> {
    case empty
    case node(value: T, next: ListNode<T>)
}
```

C/C++ 的枚举仅仅是一个命名的整数集合，不能存储额外的数据。而 Swift 的枚举可以存储关联值，甚至可以定义方法和计算属性，在许多情况下可以替代类和结构体。另外，Swift 的**递归枚举**是一种特殊的枚举，它有一个或多个枚举成员使用该枚举类型的实例作为关联值。你可以在枚举成员前加上 `indirect` 来表示该成员可递归，也可以在枚举类型开头加上 `indirect` 关键字来表明它的所有成员都是可递归的。

这种写法有点讨巧，利用了 Swift 中比较高阶的语法特性。总之，笔者觉得使用枚举来实现链表还是稍微有点绕的，最常规的写法还是 `class ListNode`。
