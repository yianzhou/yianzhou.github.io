---
sidebar_position: 99
---

# Code Review

- 不允许直接 `git push origin master`，需创建 MR
- 合并请求必须经过代码评审才可以合并
- 只允许压缩合并（点击合并时请写好标题）
- 禁止创建者自己通过评审

[Code Review Developer Guide | eng-practices](https://google.github.io/eng-practices/review/)

[Google Objective-C Style Guide | styleguide](https://google.github.io/styleguide/objcguide.html)

## 设计

## 实现

不建议使用前置声明。原因：头文件没有 self-contain、引用来源无法确定、影响文件依赖分析结果。避免使用 `@class` 前向声明，前向声明只用来解决同一个文件中循环引用的问题，其他场景建议直接使用 `import`。

头文件里写 `static` 函数，会让每一个引用的文件中都生成一份实现，会导致包大小增大。应该只写声明，在 `.m` 写实现。

父类不应该 `import` 子类。如果父类必须依赖子类则是设计上有问题。

就近原则：声明和使用尽量靠近；类似的声明分组放一起。

少抛异常，错误建议可以使用 `NSError` 传递。

重写 `isEqual` 方法时应该同时重写 `hash` 方法。

指针类型强转缺少背景信息，无法确认该实例是否一定实现了协议。建议接口使用泛型来传参，或增加断言判断。

基类不想让外部直接初始化来使用的话，应使用 `NS_UNAVAILABLE` 修饰、增加 `NSAssert` 断言等手段，防止直接初始化基类来使用。

优先使用标准库的能力。

防御性编程：变量都要初始化。

`UIView` 初始化的时候 `frame` 为 `CGRectZero` 且同时设置 `cornerRadius`，一旦触发 `renderLayerInContext` 截图就会挂。

`NSMutableArray` 不能插入 `nil`，会有崩溃，`-[__NSArrayM insertObject:atIndex:]: object cannot be nil`

### 类型

通知名称类型要用 NSNotificationName 而不是 NSString。

时间应该是使用 `NSTimeInterval`。

完美透传视频相关的时间，应该使用 AVFoundation 定义的 `CMTime` 类型。

应该优先使用系统定义好的类型，对于此处来说应使用 `AVLayerVideoGravity`。

### NSError

错误类型应该用 `NSErrorDomain` 来声明。

某个 errorDomain 下的错误码定义，应该用 `NS_ERROR_ENUM`。

错误码的定义一般会对外公开，建议放在头文件中。

错误命名风格应与系统保持一致，带命名空间前缀、以 Error 结束，如 `SDWebImageError`。

正确示范：

```c
FOUNDATION_EXPORT NSErrorDomain const SDWebImageErrorDomain;

typedef NS_ERROR_ENUM(SDWebImageErrorDomain, SDWebImageError) {
    SDWebImageErrorInvalidURL = 1000,
    // ...
};
```

## 规范

常量定义应该使用 `FOUNDATION_EXPORT`，兼容 C++。

不用空行把紧密相关的代码分开。不插入没有价值的空行。无意义的空行，会降低信息密度，应该删除。

整个文件的缩进都应该使用空格而不是 tab，tab 在不同 IDE 看到的格式是不一致的。

可读性问题：同一行嵌套两个或以上三元运算符，应该拆成两个表达式。

宏定义中不应该定义外部变量，可以用参数传递。

建议避免使用宏生成类、属性、方法等。特别是会产生局部变量的宏，容易引起不必要的麻烦。

推荐使用 `pragma mark -` 分隔不同的代码模块。

不建议在同一个文件中声明多个不同的类，应该拆分至独立的文件中。

推荐使用轻量泛型：`NSArray<NSString *> *userDescriptions;`

优先使用字面量语法。

### 注释

注释格式不统一，同时存在两种风格的注释 `/**/` 和 `//`，对于新版本 Xcode，可以统一用快捷键默认生成的注释格式。

使用 `/**/` 风格的注释时，注释内容与 `*` 之间需要留空格。

行注释 `//` 两边都要有空格，中英文之间应该有空格。

头文件里的公开属性、方法都需要加注释。

不要用注释删除代码，无用代码应直接删除。

关键的技术选择和业务逻辑等必要的背景信息，应该有文档注释。

公开接口的注释应该放在头文件，使用标准 `///` 进行注释，不要只放在实现文件。

### 命名

使用驼峰命名。无拼写错误、单复数错误。

不要在名字上带类型。

命名应符合惯用法，getter 不以 `get` 开头，布尔值的方法通常用 can, is, should, has 这些开头。

布尔类型的**属性**在命名时不需要增加 `is` 开头，`is` 是属于 `getter` 需要增加的。属性带 `is` 前缀的话，会导致 `getter` 生成后变成 `isIsPlaying`，引起重复。

OC 中的命名不应该带下划线。

NSLog 还是不要直接使用为好，会在 release 环境下出 log（除非直接或间接 import 了 AllLogMacros.h，将 NSLog 覆盖）
