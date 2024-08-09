---
sidebar_position: 4
---

# Block

## 语法

![img](/assets/images/blocks_2x.png)

[How Do I Declare A Block in Objective-C?](http://goshdarnblocksyntax.com/)

## 底层探索

block 是封装了函数调用及其上下文环境的 OC 对象。

```objc
dispatch_block_t block = ^{};
NSLog(@"%@", [block class]); // __NSGlobalBlock__
NSLog(@"%@", [block superclass]); // NSBlock
NSLog(@"%@", [[block superclass] superclass]); // NSObject
```

想探究 block 的底层，可以用编译器前端 clang 将 OC 代码转写为 C++ 代码：

`xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc main.m`

> 注意，真正在编译时 llvm 生成的不是 cpp 代码，而是中间代码。所以 cpp 代码只能作为窥探底层实现的参考，其和最终产物在一些细节实现上是有区别的，还是要以运行时的结果为准。

```c title='main.m'
int cat = 3;

int main(int argc, const char * argv[]) {
    int apple = 1; // 即 auto int，自动变量，离开作用域就销毁
    static int boy = 2;
    void (^block)(void) = ^{
        printf("%d", apple + boy + cat);
    };
    block();
    return 0;
}
```

```cpp title='main.cpp'
int cat = 3; // 全局变量，不用捕获，直接访问

// block 在底层变成了这样的结构体
// block 捕获的变量，都对应着结构体中的成员
struct __main_block_impl_0 { // 意为 main 函数中的第 0 个 block
  // 注意这里不是指针，而是直接声明的变量，那么就相当于把 __block_impl 里的东西都搬过来
  // 可以看到，block 里的第一个成员就是 isa 指针（继承自 NSObject），因此，它就是一个 OC 对象
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  int apple; // 值传递
  int *boy; // 指针传递

  // 构造函数
  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, int _apple, int *_boy, int flags=0) : apple(_apple), boy(_boy) {
    impl.isa = &_NSConcreteStackBlock; // 这个类不代表最终的实现，要以运行时为准
    impl.Flags = flags;
    impl.FuncPtr = fp; // 函数指针，指向函数实现
    Desc = desc;
  }
};

struct __block_impl {
  void *isa;
  int Flags;
  int Reserved;
  void *FuncPtr;
};

// block 内部的代码在这
static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
    int apple = __cself->apple; // bound by copy
    int *boy = __cself->boy; // bound by copy
    printf("%d", apple + (*boy) + cat);
}

static struct __main_block_desc_0 {
  size_t reserved; // 保留字段，没什么用
  size_t Block_size; // sizeof 运算符得出的内存大小
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0)};

int main(int argc, const char * argv[]) {
    int apple = 1; // 原封不动
    static int boy = 2; // 原封不动

    // 定义 block 变量，调用构造函数，apple 传值，boy 传地址
    dispatch_block_t block = ((void (*)())&__main_block_impl_0((void *)__main_block_func_0,
                                                                &__main_block_desc_0_DATA,
                                                                apple,
                                                                &boy));
    // 简化：block->FuncPtr(block);
    ((void (*)(__block_impl *))((__block_impl *)block)->FuncPtr)((__block_impl *)block);
    return 0;
}
```

## self 如何捕获

```objc
@implementation Person
- (void)test {
    void (^block)(void) = ^ {
        NSLog(@"%p", self); // self 是函数实参，是个局部变量
    };
    block();
}
@end
```

重写：`xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc Person.m`

当捕获的变量类型是对象而不是基本类型时，需要对捕获的对象进行**内存管理**，此时会发现 `__Person__test_block_desc_0` 结构体里多了两个函数指针，分别是：

- `void (*copy)`：当 block 被拷贝到堆上时，会对对象进行引用（强/弱引用由捕获的 `auto` 变量的修饰符决定）
- `void (*dispose)`：当 block 从堆上释放时，取消对对象的引用

```cpp
// @implementation Person
struct __Person__test_block_impl_0 {
  struct __block_impl impl;
  struct __Person__test_block_desc_0* Desc;
  Person *self;
  __Person__test_block_impl_0(void *fp, struct __Person__test_block_desc_0 *desc, Person *_self, int flags=0) : self(_self) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};

static void __Person__test_block_func_0(struct __Person__test_block_impl_0 *__cself) {
    Person *self = __cself->self; // bound by copy
    NSLog((NSString *)&__NSConstantStringImpl__var_folders_yb_d6gg31rn7snd9rnp12sctfb00000gn_T_Person_9d4d3e_mi_0, self);
}

static void __Person__test_block_copy_0(struct __Person__test_block_impl_0*dst, struct __Person__test_block_impl_0*src) {
    _Block_object_assign((void*)&dst->self, (void*)src->self, 3/*BLOCK_FIELD_IS_OBJECT*/);
}

static void __Person__test_block_dispose_0(struct __Person__test_block_impl_0*src) {
    _Block_object_dispose((void*)src->self, 3/*BLOCK_FIELD_IS_OBJECT*/);
}

static struct __Person__test_block_desc_0 {
  size_t reserved;
  size_t Block_size;
  void (*copy)(struct __Person__test_block_impl_0*, struct __Person__test_block_impl_0*);
  void (*dispose)(struct __Person__test_block_impl_0*);
} __Person__test_block_desc_0_DATA = { 0, sizeof(struct __Person__test_block_impl_0), __Person__test_block_copy_0, __Person__test_block_dispose_0};

// -(void)test
static void _I_Person_test(Person * self, SEL _cmd) {
    void (*block)(void) = (&__Person__test_block_impl_0(__Person__test_block_func_0,
                                                        &__Person__test_block_desc_0_DATA,
                                                        self,
                                                        570425344));
    ((void (*)(__block_impl *))((__block_impl *)block)->FuncPtr)((__block_impl *)block);
}
// @end
```

当用到了 `__weak` 引用时，重写代码可能会遇到报错，原因是弱引用需要依赖运行时，此时的重写指令需指定 ARC 和运行时版本：

`xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc -fobjc-arc -fobjc-runtime=ios-15.0.0 main.m`

## block 的类型

只要不访问 `auto` 变量，都是 `__NSGlobalBlock__` 类型。

```cpp
int cat = 3;

int main(int argc, const char * argv[]) {
    static int boy = 2;
    void (^block)(void) = ^{
        printf("%d", boy + cat);
    };
    NSLog(@"%@", [block class]); // __NSGlobalBlock__
    return 0;
}
```

在 MRC 下，只要访问了 `auto` 变量，就是 `__NSStackBlock__` 类型：

![img](/img/41456A7A-79A9-4B65-8D91-E3A2C4DD39B3.png)

```cpp
// 编译设置为 MRC
int main(int argc, const char * argv[]) {
    int cat = 1;
    void (^block)(void) = ^{
        printf("%d", cat);
    };
    NSLog(@"%@", [block class]); // __NSStackBlock__
    return 0;
}
```

栈上的 block 存在什么问题呢？

```cpp
// 编译设置为 MRC
void (^block)(void) = nil;

void test() {
    int cat = 1; // cat是auto变量，存放在栈上
    block = ^{
        printf("%d", cat);
    };
}

int main(int argc, const char * argv[]) {
    test(); // test函数调用完毕后，cat就被释放了
    block(); // 打印出来并不是1，而是随机的数字例如16176
    return 0;
}
```

对 `__NSStackBlock__` 类型的 block 调用 copy，就可以将其拷贝到堆上，变成 `__NSMallocBlock__` 类型，其捕获的变量值也就能保留下来。

```cpp
// 编译设置为 MRC
void (^block)(void) = nil;

void test() {
    int cat = 1;
    block = [^{
        printf("%d", cat);
    } copy];
}

int main(int argc, const char * argv[]) {
    test();
    block(); // 1
    NSLog(@"%@", [block class]); // __NSMallocBlock__
    return 0;
}
```

![img](/img/7E005CA2-855F-4B86-AA77-1D6C4AA59C93.png)

为什么 block 属性要用 copy 修饰呢？根据[官方文档](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithBlocks/WorkingwithBlocks.html#//apple_ref/doc/uid/TP40011210-CH8-SW1)的解释：在 ARC 下，编译器会自动帮我们完成 copy，因此建议使用 copy 修饰符来指出这里的内存行为。You should specify copy as the property attribute, because a block needs to be copied to **keep track of its captured state outside of the original scope**. This isn’t something you need to worry about when using Automatic Reference Counting, as it will happen automatically, but it’s best practice for the property attribute to show the resultant behavior.

如果 block 属性用 strong 修饰会怎么样？ARC 下，block 被强引用时会自动拷贝到堆上；MRC 下，自己管理内存；所以都和 `copy` 没区别。

哪些情况会自动 copy：

- block 作为函数返回值
- block 赋值给 `__strong` 指针（即强引用）
- block 作为 Cocoa API 中带有 `usingBlock` 的方法参数时
- block 作为 GCD API 的方法参数时

```cpp
// 编译设置为 ARC
int main(int argc, const char * argv[]) {
    int apple = 1;
    void (^block)(void) block = ^{ // 赋值给 __strong 指针
        printf("%d", apple);
    };
    NSLog(@"%@", [block class]); // __NSMallocBlock__
    NSLog(@"%@", [^{
        printf("%d", apple);
    } class]); // __NSStackBlock__
    return 0;
}
```

## `__block` 修饰符

block 中修改捕获的变量有两种方法：

一、使用静态变量或全局变量。上面已经展示过了两者被重写后的代码。

二、添加 `__block` 修饰符。（`__block` 不能用于修饰静态变量或全局变量）

使用 `__block` 修饰的变量，会被编译器包装成一个 OC 对象。

```c
int main(int argc, const char * argv[]) {
    __block int age = 18;
    void (^block)(void) block = ^{
        age++;
    };
    block();
    return 0;
}
```

上面代码重写后：

```cpp
struct __Block_byref_age_0 {
    void *__isa; // 在 OC 语言里看到 isa 就可以理解为一个 OC 对象
    __Block_byref_age_0 *__forwarding;
    int __flags;
    int __size;
    int age; // 18，外部的值在这
};

struct __main_block_impl_0 {
  struct __block_impl impl;
  struct __main_block_desc_0* Desc;
  __Block_byref_age_0 *age; // by ref

  __main_block_impl_0(void *fp, struct __main_block_desc_0 *desc, __Block_byref_age_0 *_age, int flags=0) : age(_age->__forwarding) {
    impl.isa = &_NSConcreteStackBlock;
    impl.Flags = flags;
    impl.FuncPtr = fp;
    Desc = desc;
  }
};

static void __main_block_func_0(struct __main_block_impl_0 *__cself) {
    __Block_byref_age_0 *age = __cself->age; // bound by ref
    (age->__forwarding->age)++;
}

static void __main_block_copy_0(struct __main_block_impl_0*dst, struct __main_block_impl_0*src) {
    _Block_object_assign((void*)&dst->age, (void*)src->age, 8/*BLOCK_FIELD_IS_BYREF*/);
}

static void __main_block_dispose_0(struct __main_block_impl_0*src) {
    _Block_object_dispose((void*)src->age, 8/*BLOCK_FIELD_IS_BYREF*/);
}

static struct __main_block_desc_0 {
  size_t reserved;
  size_t Block_size;
  void (*copy)(struct __main_block_impl_0*, struct __main_block_impl_0*);
  void (*dispose)(struct __main_block_impl_0*);
} __main_block_desc_0_DATA = { 0, sizeof(struct __main_block_impl_0), __main_block_copy_0, __main_block_dispose_0};

int main(int argc, const char * argv[]) {
    __Block_byref_age_0 age = {
        0,
        &age, // 存了自己的地址
        0,
        sizeof(__Block_byref_age_0),
        18
    };
    dispatch_block_t block = &__main_block_impl_0(__main_block_func_0,
                                                  &__main_block_desc_0_DATA,
                                                  &age,
                                                  570425344);
    block->FuncPtr(block);
    return 0;
}
```

为了搞清楚 `__block` 修饰后的 `age` 变量，到底是哪块内存，我们把转换后的底层结构体全都挪过来调试：

![img](/img/B5941C09-1AC3-40B6-A332-D68C68A6E3BA.png)

这样就发现，`age` 的地址其实是底层结构体对象里 `age` 成员的地址。也就是说，在 block 外部访问 `age` 时，实际访问的是底层结构体对象里的 `age` 了。

前面说过，当捕获的变量类型是对象而不是基本类型时，需要对捕获的对象进行内存管理。这里虽然捕获的是基本类型 `int`，但由于需要对其进行修改，因此底层将其包装成了对象，同样需要对这个对象进行内存管理，因此也有 `copy` 和 `dispose` 函数。不同的是，`_Block_object_assign` 这个函数的第三个参数，

- 如果捕获的是对象，传参是 `BLOCK_FIELD_IS_OBJECT`
- 如果捕获的是 `__block`，传参是 `BLOCK_FIELD_IS_BYREF`

## `__forwarding` 指针

当 block 位于栈上时，`__forwarding` 指针指向的就是 block 自己；

当 block 被拷贝到堆上后，栈上 block 的`__forwarding` 会指向堆区的 block。

![img](/img/2D6112C1-3F8C-4DCD-825E-206D6CB68568.jpeg)

## 基本类型与对象类型被 `__block` 修饰的区别

基本类型被 `__block` 修饰后包装成结构体：

![img](/img/83291357-B4DF-411D-90B5-1D52C0A43ABE.png)

对象类型被 `__block` 修饰后包装成结构体：

![img](/img/4E05C5A6-D579-4A88-A74F-81E0B7459B39.png)

## 解决循环引用

### 1. weak-strong dance

weak 引用可以解决循环引用的问题，因为 `__weak` 修饰的变量不会持有对象，一旦指向的对象被释放，变量就会被置为空。

但 weak 引用有时候会出现一些问题，在 block 执行的过程中，`weakSelf` 指向的对象可能会被释放。例如：

```objc
@interface DetailViewController ()
@property (nonatomic, copy) dispatch_block_t handler;
@end

@implementation DetailViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    __weak typeof(self) weakSelf = self;
    self.handler = ^{
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSLog(@"self is %@", weakSelf);
        });
    };
    self.handler();
}

- (void)dealloc {
    NSLog(@"%s", __FUNCTION__);
}
@end
```

解决这个问题的方法叫 weak-strong dance，**weak-strong dance 可以保证 block 在被执行期间，`strongSelf` 指向的对象不会被释放**。

```objc
@interface DetailViewController ()
@property (nonatomic, copy) dispatch_block_t handler;
@end

@implementation DetailViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    __weak typeof(self) weakSelf = self;
    self.handler = ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSLog(@"self is %@", strongSelf);
        });
    };
    self.handler();
}

- (void)dealloc {
    NSLog(@"%s", __FUNCTION__);
}
@end
```

但 weak-strong dance 不会阻止 `weakSelf` 指向的对象被释放：

```objc
@interface DetailViewController ()
@property (nonatomic, copy) dispatch_block_t handler;
@end

@implementation DetailViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    __weak typeof(self) weakSelf = self;
    self.handler = ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSLog(@"self is %@", strongSelf);
    };

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), self.handler);
}

- (void)dealloc {
    NSLog(@"%s", __FUNCTION__);
}
@end
```

输出：

```
-[DetailViewController dealloc]
self is (null)
```

假设执行 block 的时候 `weakSelf` 已经为 nil 了，那么 `strongSelf` 变量也是 nil；假设执行 block 时 `weakSelf` 不为 nil，那么 `strongSelf` 就会强引用这个对象，直到 block 执行完，`strongSelf` 变量销毁。

另外，一个题外话，对于 `dispatch_after` 来说，不存在循环引用问题，所以这里用不用 weak-strong dance 都不会内存泄漏，问题仅仅是延时释放。

```objc
@interface DetailViewController ()
@property (nonatomic, copy) dispatch_block_t handler;
@end

@implementation DetailViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        NSLog(@"self is %@", self); // 用不用 weak-strong dance 都不会造成循环引用的内存泄漏问题，问题仅仅是延时释放。
    });
}

- (void)dealloc {
    NSLog(@"%s", __FUNCTION__);
}
@end
```

### 2. 临时变量

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    __block BlockViewController* vc = self;
    self.myBlock = ^{
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSLog(@"%@", vc.name);
            vc = nil;
        });
    };
    self.myBlock();
}
```

### 3. block 传参

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    self.myBlock = ^(BlockViewController *vc){
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSLog(@"%@", vc.name);
        });
    };
    self.myBlock(self);
}
```

## 代码示例 1

```objc
#import "ViewController.h"

@interface ViewController ()
@property(nonatomic, copy, nullable) void (^printA)(void);
@property(nonatomic, assign) int a;
@end

@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    self.printA = ^() {
        // 在 block 里面使用实例变量，会强引用，编译器会警告
        // Block implicitly retains 'self'; explicitly mention 'self' to indicate this is intended behavior
        NSLog(@"%d", _a);

        // 循环引用，编译器会警告
        // Capturing 'self' strongly in this block is likely to lead to a retain cycle
        NSLog(@"%d", self->_a);
        NSLog(@"%d", self.a);
    };

    __weak typeof(self) weakSelf = self;
    self.printA = ^() {
        if (weakSelf == nil) {
            return;
        }
        // 使用 weak 指针调用实例变量，编译器会报错
        // Dereferencing a __weak pointer is not allowed due to possible null value caused by race condition, assign it to strong variable first
        NSLog(@"%d", weakSelf->_a);
        // 可以
        NSLog(@"%d", weakSelf.a);
    };

    // 推荐的写法
    __weak typeof(self) weakSelf = self;
    self.printA = ^() {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        NSLog(@"%d", strongSelf.a);
    };
}
@end
```

## 代码示例 2

```objc
NSMutableArray *array = [NSMutableArray array];
void(^block)(void) = ^{
    [array addObject:@123];
};
block();
```

这里对 array 只是使用，而不是赋值，所以不需要 `__block` 进行修饰；

```objc
__block NSMutableArray *array = nil;
void(^block)(void) = ^{
    array = [NSMutableArray array];
};
block();
```

这里就需要在 array 的声明处添加 `__block` 修饰符，否则编译器会报错。
