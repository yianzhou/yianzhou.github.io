# Swift

## Swift Standard Library

### Optional

```swift
public enum Optional : ExpressibleByNilLiteral {
    case none
    case some(Wrapped)
}
```

Optional 在底层是一个枚举，可以把它理解为一个盒子，有两种情况，none 代表没有值，some 代表包装了某个值。

### map, flatMap, compactMap

这三个方法是 Swift 协议 `Sequence` 中定义的。

`map(_:)` 对序列里的每个元素应用一个 transform 函数，并返回一个数组。

`flatMap(_:)` 对序列里的每个元素应用一个 transform 函数，并返回一个扁平化、降维的数组（二维数组变一维数组），等同于先调用 `map(_:)` 再调用 `joined()` 连结起来。

```swift
let numbers = [1, 2, 3, 4]

let mapped = numbers.map { Array(repeating: $0, count: $0) }
// [[1], [2, 2], [3, 3, 3], [4, 4, 4, 4]]

let flatMapped = numbers.flatMap { Array(repeating: $0, count: $0) }
// [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
```

Complexity: O(m + n), where n is the length of this sequence and m is the length of the result.

`compactMap(_:)` 对序列里的每个元素应用一个 transform 函数，并返回其中 non-nil 的结果。

```swift
let possibleNumbers = ["1", "2", "three", "///4///", "5"]

let mapped: [Int?] = possibleNumbers.map { str in Int(str) }
// [1, 2, nil, nil, 5]

let compactMapped: [Int] = possibleNumbers.compactMap { str in Int(str) }
// [1, 2, 5]
```

Complexity: O(m + n), where n is the length of this sequence and m is the length of the result.

## [In-Out Parameters](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID159)

Function parameters are **constants** by default. Trying to change the value of a function parameter from within the body of that function results in a compile-time error. This means that you can’t change the value of a parameter by mistake. If you want a function to modify a parameter’s value, and you want those changes to persist after the function call has ended, define that parameter as an in-out parameter instead.

## 底层

调试方法：通过断点调试，Xcode - Debug - Debug Workflow - Always Show Disassembly，进入汇编代码，查看底层调用的函数；再结合 [objc 源码](https://opensource.apple.com/tarballs/objc4/)和 [swift 源码](https://github.com/apple/swift)阅读。

swift 代码经过编译器生成 AST 后，会生成 SIL 的中间代码表示。想探索 SIL 的可以使用命令 `swiftc -emit-sil main.swift >> ./main.sil` 生成。

我们已经熟悉 objc 的类对象是 `objc_class`，实例对象是 `objc_object`；同样的对应 swift 我们探索两个问题，一、Swift 的类对象；二、swift 实例对象。

在 Swift 中可以定义两种类：一种是从 NSObject 或者派生类派生的类；一种是 SwiftObject 派生的类，如果在定义类时没有指定基类则默认会从 SwiftObject 派生，这是一个隐藏的基类，不会在源代码中体现。

swift 类对象结构体继承自 objc 的类对象结构体，定义在（objc 源码）objc-runtime-new.h

```c
struct swift_class_t : objc_class {
    ...
};
```

swift 实例对象底层是 `HeapObject` 结构体，定义在（swift 源码）stdlib/HeapObject.h；里面有 isa 指针和管理引用计数的结构体，各占用 8 个字节大小，共 16 字节。成员变量在偏移量为 16 个字节开始。

```c
/// The Swift heap-object header.
/// This must match RefCountedStructTy in IRGen.
struct HeapObject {
  /// This is always a valid pointer to a metadata object.
  HeapMetadata const *metadata;

  SWIFT_HEAPOBJECT_NON_OBJC_MEMBERS; // 这是一个宏定义的变量 InlineRefCounts refCounts;

  // Initialize a HeapObject header as appropriate for a newly-allocated object.
  constexpr HeapObject(HeapMetadata const *newMetadata)
    : metadata(newMetadata)
    , refCounts(InlineRefCounts::Initialized)
  { }
};
```

Swift 语言的对象方法调用基本上是在编译链接时刻就被确定的，机制和 OC 语言完全不同。

## Swift ABI 稳定

[https://onevcat.com/2019/02/swift-abi/](https://onevcat.com/2019/02/swift-abi/)

如何做？安装 Xcode 10.2，然后正常迁移就可以了，不会对你的开发造成什么影响。

什么是 ABI 稳定？在运行的时候只要是用 Swift 5 (或以上) 的编译器编译出来的 binary，就可以跑在任意的 Swift 5 (Xcode 10.2 及以上) 的 runtime 上。这样，我们就不需要像以往那样在 app 里放一个 Swift runtime 了，Apple 会把它弄到 iOS 和 macOS 系统里。因为系统集成了 Swift，所以大家都用同一个 Swift 了，app 启动的时候也就不需要额外加载 Swift，所以在新系统上会更快更省内存。

## 协议

把协议理解成 Interface/头文件/接口。

视图通知上级，怎么定义协议方法名？参考[官方的协议命名](https://developer.apple.com/documentation/uikit/uitableviewdelegate/3183944-tableviewdidendmultipleselection)

```
optional func tableViewDidEndMultipleSelectionInteraction(_ tableView: UITableView)
```

方法名需要带上当前视图，这样做的原因是，实现这个协议的上层，通过方法名能知道这个是实现了哪个协议的方法，而不会混淆，如果两个协议定义的方法名一样，必须这样才能区分开。

## demangle

```bash
# swift-demangle所在目录
xcrun -f swift-demangle

# 转换符号
xcrun swift-demangle "s14ChannelManagerAAC03getA5Group4typeAA0aD0CSgAA7TabTypeO_tFTo"
```
