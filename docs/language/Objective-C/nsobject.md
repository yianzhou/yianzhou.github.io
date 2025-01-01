---
sidebar_position: 1
---

# NSObject

## NSObject 内存布局

下载 objc 源码：`https://opensource.apple.com/tarballs/objc4/`，github 仓库：`https://github.com/opensource-apple/objc4`

下载 CoreFoundation 源码：`https://opensource.apple.com/tarballs/CF/`，github 仓库：`https://github.com/opensource-apple/CF`

OC 代码经过编译器的 rewrite 后，会变成 C/C++代码，这是 OC 的底层。

```bash
xcrun -sdk iphoneos clang -arch arm64 -rewrite-objc main.m
```

重写 `main.m` 文件：

```cpp
int main(int argc, char * argv[]) {
    NSObject *obj = [[NSObject alloc] init];
    return 0;
}
```

产出 `main.cpp` 文件：

```cpp
int main(int argc, char * argv[]) {
    NSObject *obj = ((NSObject *(*)(id, SEL))(void *)objc_msgSend)((id)((NSObject *(*)(id, SEL))(void *)objc_msgSend)((id)objc_getClass("NSObject"), sel_registerName("alloc")), sel_registerName("init"));
    return 0;
}
```

在 Objective-C 中，所有的方法调用都通过 `objc_msgSend` 函数进行。

OC 的面向对象是基于 C/C++ 的数据结构实现的，在上面 `main.cpp` 文件中，找到的重写后的 `NSObject`：

```c
struct NSObject_IMPL {
    Class isa;
}
```

`Class` 是什么？找到它的定义：

```c
/// An opaque type that represents an Objective-C class.
typedef struct objc_class *Class;
```

`NSObject` 存储的内容就是一个 `isa` 指针，指针在 64 位系统所占内存空间是 8 个字节。

结构体的地址，就是它里面第一个成员的地址。`isa` 指针的地址，也就是 `NSObject_IMPL` 结构体的地址。`isa` 存储的值，就是 `NSObject` 类对象的地址。

> 指针存储的值是别人的内存地址。指针存储了谁的内存地址，就称为指针指向了谁。此时访问这个指针，就等同于访问指针指向的那块内存。

下面探究 `NSObject` 占用多少内存：

```c
#import <malloc/malloc.h>
#import <objc/runtime.h>

NSLog(@"%zd", class_getInstanceSize([NSObject class])); // 8

// `sizeof(type)` yields the size in bytes of the object representation of type.
NSLog(@"%zd", sizeof([NSObject class])); // 8

// Returns size of given ptr
NSObject *obj = [[NSObject alloc] init];
NSLog(@"%zd", malloc_size((__bridge const void *)obj)); // 16
```

在 objc 源码中找到 `class_getInstanceSize` 的实现：

```cpp title='objc-class.mm'
size_t class_getInstanceSize(Class cls)
{
    if (!cls) return 0;
    return cls->alignedInstanceSize();
}

// Class's ivar size rounded up to a pointer-size boundary.
uint32_t alignedInstanceSize() const {
    return word_align(unalignedInstanceSize());
}

// 传入未对齐的内存大小，返回对齐后的内存大小
static inline uint32_t word_align(uint32_t x) {
    return (x + WORD_MASK) & ~WORD_MASK;
}
```

- `class_getInstanceSize` 得到的值是一个对象的所有实例变量**经过内存对齐后**所需的内存。
- `sizeof` 是编译期的运算符，在编译期计算出操作数的所需内存。
- `malloc_size` 得到的值是运行时系统实际分配的值。

下面看看对象是怎么分配内存的，`alloc` 方法的描述：For historical reasons, `alloc` invokes `allocWithZone:`.

```cpp title='NSObject.mm'
+ (id)allocWithZone:(struct _NSZone *)zone {
    return _objc_rootAllocWithZone(self, (malloc_zone_t *)zone);
}
```

```cpp title='objc-runtime-new.mm'
NEVER_INLINE
id _objc_rootAllocWithZone(Class cls, malloc_zone_t *zone __unused)
{
    // allocWithZone under __OBJC2__ ignores the zone parameter
    return _class_createInstanceFromZone(cls, 0, nil,
                                         OBJECT_CONSTRUCT_CALL_BADALLOC);
}

static ALWAYS_INLINE id
_class_createInstanceFromZone(Class cls, size_t extraBytes, void *zone,
                              int construct_flags = OBJECT_CONSTRUCT_NONE,
                              bool cxxConstruct = true,
                              size_t *outAllocatedSize = nil)
{
    size = cls->instanceSize(extraBytes); // 获取应该分配的内存大小
    obj = (id)calloc(1, size); // 分配内存
}
```

```cpp title='objc-runtime-new.h'
inline size_t instanceSize(size_t extraBytes) const {
    size_t size = alignedInstanceSize() + extraBytes;
    // CF requires all objects be at least 16 bytes.
    if (size < 16) size = 16;
    return size;
}
```

通过阅读源码得知，`CoreFoundation` 要求所有对象至少分配 16 个字节，属于框架的硬性规定。因此，64 位系统上， `NSObject` 分配了 16 字节内存，但其内部只用了 8 字节。

## 查看内存

![img](/img/6A9EF225-BA47-474F-A185-D30A64F8F36D.png)

![img](/img/9F200769-7F69-42BC-8E10-A82A1D66A8AB.png)

这里显示的数字是 16 进制，`16 * 16 = 2 ^ 8 = 256`，**两个 16 进制数表示一个字节**，可以看到前 8 个字节是对象的内容，后 8 个字节没有内容、全是 0。

lldb 指令 `memory read` 可以读取内存中的数据，简写 `x`：

```c
Printing description of obj:
<NSObject: 0x600002764480>
(lldb) x 0x600002764480
0x600002764480: e8 b6 4b 86 ff 7f 00 00 00 00 00 00 00 00 00 00  ..K.............
0x600002764490: 90 44 ac 54 17 31 00 00 4b 00 49 00 00 00 00 00  .D.T.1..K.I.....
```

`x/nuf <addr>`:

- n 表示要显示的内存单元的个数
- u 表示一个内存单元的长度，g 对应 8 个字节
- f 表示显示方式，x 代表 16 进制

```c
Printing description of obj:
<NSObject: 0x1060ac280>
(lldb) x/4g 0x1060ac280
0x1060ac280: 0x010000021de7e331 0x0000000000000000
0x1060ac290: 0x6b636950534e5b2d 0x426863756f547265
```

## Person 内存布局

现扩展到 `Person` 类，

```objc
@interface Person : NSObject {
    @public
    int _age;
}
@end
```

同样地将 `main.cpp` 重写为 C++ 代码：

```c
struct Person_IMPL {
    struct NSObject_IMPL NSObject_IVARS; // 8个字节
    int _age; // 4个字节
}
```

明明只需要 12 个字节，为什么获取实例大小返回 16 呢？这是因为内存对齐。内存对齐要求，结构体的内存大小必须是其**最大成员的大小的整数倍**。

```c
NSLog(@"%zd", class_getInstanceSize([Person class])); // 16
```

给 `_age` 赋值为 4，然后查看内存，

![img](/img/3B570F72-51B6-4EE3-B919-07E824EBE6AC.png)

现代计算机都是**小端序** (Little-Endian)，即，一个多位数的低位放在较小的地址处，高位放在较大的地址处。

所以这里的内存读取出来不是 `0x04000000`，而是 `0x00000004`。

将 `Person` 里的实例变量改为属性：

```objc
@interface Person : NSObject
@property (nonatomic, assign) int age;
@end
```

它重写后的结构体还是和上面的 `Person_IMPL` 一样，不会有变化。而 `getter` 和 `setter` 则变成了函数，这些函数会存在类对象的方法列表里面，以供调用：

```cpp
static int _I_Person_age(Person * self, SEL _cmd) { return (*(int *)((char *)self + OBJC_IVAR_$_Person$_age)); } // self 指针偏移 8 个字节
static void _I_Person_setAge_(Person * self, SEL _cmd, int age) { (*(int *)((char *)self + OBJC_IVAR_$_Person$_age)) = age; }
```

类可以被实例化成无数对象，因此结构体里面只存成员变量，实例方法在内存中有一份就够了，实例方法是不可能放在结构体里存的。

## self 是什么

从上面重写后的 `getAge` 和 `setAge` 函数可以看到，函数的参数有两个，分别是 `self` 和 `_cmd`。所有的 OC 方法，其底层函数都有这两个参数。

- `self` 实际上就是一个**局部变量**，它是指向当前对象的指针。
- `_cmd` 表示当前方法的 selector，即 `_cmd == @selector(age)`

> 现代计算机，函数的实参并不是放在栈空间，而是放在 CPU 的寄存器，这样效率更高，这点要注意。

## Student 内存布局

再扩展到 `Student` 类，

```objc
@interface Student : Person {
    @public
    int _no;
}
@end
```

其底层实现为：

```c
struct Student_IMPL {
    struct Person_IMPL Person_IVARS; // 12个字节
    int _no; // 4个字节
}
```

此时 `Student` 占用 16 个字节，

```objc
Student *stu = [[Student alloc] init];
NSLog(@"%zd", malloc_size((__bridge const void *)stu)); // 16
```

我们可以将 oc 对象的指针转为其底层结构体的指针，因为内存布局相同。

```objc
Student *stu = [[Student alloc] init];
stu->_no = 100;
struct Student_IMPL *stuIMP = (__bridge struct Student_IMPL *)stu;
NSLog(@"%d", stuIMP->_no);
```

如果给 `Student` 再增加一个成员变量 `int _gender`，那么我们会发现：

```c
Student *stu = [[Student alloc] init];
NSLog(@"%zd", class_getInstanceSize([Student class])); // 24
NSLog(@"%zd", sizeof([Student class])); // 24
NSLog(@"%zd", malloc_size((__bridge const void *)stu)); // 32
```

由于内存对齐，`Student_IMPL` 结构体的大小是它的最大的成员变量大小，即 `struct Person_IMPL` 12 个字节的整数倍，因此是 24 个字节。

但实际上系统为其分配了 32 个字节，这是为什么呢？要到 `calloc` 的源码里找答案。

## 内存分配

下载 libmalloc 源码：[https://opensource.apple.com/tarballs/libmalloc/](https://opensource.apple.com/tarballs/libmalloc/)

```c title='malloc.c'
void *calloc(size_t num_items, size_t size)
{
    return _malloc_zone_calloc(default_zone, num_items, size, MZ_POSIX);
}
```

这里的 `size`，调用方传多少，系统就给多少吗？例如调用方传 17，系统就会分配 17 个字节的连续内存吗？显然不是的。在 64 位系统里，指针的地址是 64 位即 8 个字节，CPU 在寻址的时候，自然是按照 8 的倍数来寻址比较方便。也就是说，系统在分配内存时，也会考虑内存对齐。

由于源码比较复杂，这里只说结论，看这段代码：

```cpp title='nano_zone_common.h'
#define NANO_MAX_SIZE           256 /* Buckets sized {16, 32, 48, ..., 256} */
```

这里我们可以把系统管理的**堆区内存**，想象成一个个的桶 (bucket)，每个桶的大小都是 16 的倍数，当向系统申请内存时，系统会找一个能装下你申请的 size 的最小的桶分配给你。

并且，我们筛选 "malloc.c" 文件，会发现有好多个这样的文件，其实是在不同的情况下，系统会调用不同的 `malloc` 方法分配内存：

![img](/img/F8BD3EE3-32E7-41B9-B57F-9687E0DBEAEE.png)

实际上 "nano" 这种分配方式最大能分配的内存大小就是 `NANO_MAX_SIZE`，即 256 字节，超出这个大小的，就用其它的分配方式。

## isa 和 superclass 指针

![img](/img/F8FDE1E6-025F-4A14-8464-2B6561648EE4.png)

任何类的元类对象的 `isa` 指针，都指向 `NSObject` 的元类对象。

`superclass` 指针向上指向父类，除了 `NSObject` 的元类对象指向 `NSObject` 的类对象。

![img](/img/F757D5D0-06D2-43CE-B18C-882384B98C7E.png)

> `p/x` 表示按十六进制输出

看上图，`obj` 实例对象的 `isa` 指针，应该存放类对象的内存地址 `0x1da9a6710`，但实际上它的值却是 `0x01000001da9a6711`，这是为什么呢？

注意，在 64 位机器上，isa 需要进行一次位运算，才能得到真实的地址。打开 objc 源码可以找到这个 `ISA_MASK`：

```objc title='isa.h'
# if __arm64__
#   if __has_feature(ptrauth_calls) || TARGET_OS_SIMULATOR
#     define ISA_MASK        0x007ffffffffffff8ULL
#   else
#     define ISA_MASK        0x0000000ffffffff8ULL
# elif __x86_64__
#   define ISA_MASK        0x00007ffffffffff8ULL
# else
#   error unknown architecture for packed isa
# endif
```

即，需要将 `isa` 指针的地址，`& ISA_MASK` 运算之后，才能得到真正的类对象的地址：

```log
(lldb) expr 0x01000001da9a6711 & 0x007ffffffffffff8ULL
(unsigned long long) $1 = 7962519312
(lldb) p/x 7962519312
(long) $2 = 0x00000001da9a6710
```

`super_class` 指针的地址则不用进行这样的位运算转换。

## 内存对齐

内存是一个巨大的字节数组，理论上，对变量的访问可以从任何地址开始。但是实际上，计算机并不能直接按任意地址来读写内存，而是以 4 字节、8 字节、16 字节这样的单位来读写内存，称为**内存存取粒度**。

以 4 字节的粒度为例，如果我们存放了一个 4 字节的数据在地址 0，那么计算机只需一次访问就能读取到；但如果我们存放一个 4 字节的数据在地址 1，计算机就需要两次读取、再移位、合并，才能读取到这个数据，计算量增加了很多。

![img](/img/FC53B401-FFED-4AAC-92D9-2A4B3EE74D7D.jpeg)

![img](/img/C7C02E5C-4CC5-427D-AC3A-74BE99496B63.jpeg)

因此，编译器会对基本数据类型的合法地址作出一些限制，即内存地址必须是 4、8、16 的倍数，称为**内存对齐**，这个倍数称为**对齐系数**。

为了学习内存对齐，除了苹果系统，我们也可以看看 Linux 系统的实现。Linux 系统使用的是 GNU 开源的代码，GNU 这个组织开源了大量优秀的代码。

> GNU is a recursive acronym for "GNU's Not Unix!", chosen because GNU's design is Unix-like, but differs from Unix by being free software and containing no Unix code.

下载 glibc 源码：[https://www.gnu.org/software/libc/sources.html](https://www.gnu.org/software/libc/sources.html)

```c title='sysdeps/i386/malloc-alignment.h'
// 在 i386 架构下，内存对齐系数是 16
#define MALLOC_ALIGNMENT 16
```

```c title='sysdeps/generic/malloc-alignment.h'
/* MALLOC_ALIGNMENT is the minimum alignment for malloc'ed chunks.  It
   must be a power of two at least 2 * SIZE_SZ, even on machines for
   which smaller alignments would suffice. It may be defined as larger
   than this though. Note however that code and data structures are
   optimized for the case of 8-byte alignment.  */
#define MALLOC_ALIGNMENT (2 * SIZE_SZ < __alignof__ (long double) \
              ? __alignof__ (long double) : 2 * SIZE_SZ)
```

```c title='sysdeps/generic/malloc-size.h'
#ifndef INTERNAL_SIZE_T
# define INTERNAL_SIZE_T size_t
#endif

/* The corresponding word size.  */
#define SIZE_SZ (sizeof (INTERNAL_SIZE_T))
```

虽然 glibc 的源码我们没法跑，但我们可以放到 Xcode 里尝试跑一下：

```objc
NSLog(@"%zd", sizeof(size_t)); // 8
NSLog(@"%zd", __alignof__(long double)); // 16
```

基本可以肯定，在通用架构下，内存对齐系数都是 16。

## 类对象与元类对象

```cpp title='NSObject.mm'
+ (Class)class {
    return self;
}

- (Class)class {
    return object_getClass(self);
}
```

从 objc 源码实现可知，无论是 `-class` 还是 `+class`，返回的都是类对象，它不会返回元类对象，所以不管你怎么调、调多少次，结果都一样的。

```objc
#import <objc/runtime.h>

@implementation ViewController

+ (void)load {
    NSLog(@"%p", self); // 0x10468c4c0
    NSLog(@"%p", [self class]); // 0x10468c4c0
}

- (void)viewDidLoad {
    [super viewDidLoad];

    Class classObj1 = [self class];
    Class classObj2 = [ViewController class];
    Class classObj3 = [[[ViewController class] class] class];
    Class classObj4 = object_getClass(self);
    Class classObj5 = NSClassFromString(@"ViewController");
    NSLog(@"%p %p %p %p %p", classObj1, classObj2, classObj3, classObj4, classObj5); // 0x1040992d0

    // 要取到元类对象，需调用 object_getClass 并传入类对象
    Class meta_class_obj = object_getClass(classObj1);
    NSLog(@"%p", meta_class_obj);

    NSLog(@"%d", class_isMetaClass(classObj1));
    NSLog(@"%d", class_isMetaClass(meta_class_obj));
}

@end
```

instance object: 实例对象。实例对象的 `isa` 指针，指向类对象。

class object: 类对象，实例方法存放在这。类对象的 `isa` 指针，指向元类对象。

meta-class object: 元类对象，类方法存放在这。**元类对象是一种特殊的类对象**。

class object 和 meta-class object 的内存结构是一样的，它们都是 `struct objc_class`，但是两者用途不一样。

```c title='objc.h'
typedef struct objc_class *Class;

struct objc_object {
    Class _Nonnull isa  OBJC_ISA_AVAILABILITY;
};

typedef struct objc_object *id;
```

旧的 `objc_class` 结构体在 `runtime.h` 文件，在 objc2 之后已经废弃了，新的会复杂很多：

```cpp title='objc-runtime-new.h'
struct objc_class : objc_object { // cpp的语法，结构体继承
    // Class ISA; // isa 指针，继承自父类
    Class superclass; // superclass 指针
    cache_t cache;             // formerly cache pointer and vtable
    class_data_bits_t bits;    // class_rw_t * plus custom rr/alloc flags

    class_rw_t *data() const { // class read-write table
        return bits.data();
    }
}

struct class_rw_t {
    const class_ro_t *ro() const { // class readonly table
    }
    const method_array_t methods() const { // 方法列表（二维数组）
    }
    const property_array_t properties() const { // 属性列表（二维数组）
    }
    const protocol_array_t protocols() const { // 协议列表（二维数组）
    }
}

/// 在这个只读的结构体中存了一份类本身的、未经过 Runtime 附加各种分类方法的原始方法列表
struct class_ro_t {
    uint32_t instanceSize; // 实例对象大小
    explicit_atomic<const char *> name; // 类名
    void *baseMethodList;
    protocol_list_t * baseProtocols;
    const ivar_list_t * ivars;
    property_list_t *baseProperties;
}

struct class_data_bits_t {
    uintptr_t bits;
    class_rw_t* data() const {
        return (class_rw_t *)(bits & FAST_DATA_MASK);
    }
}
```

类编译好了之后，其成员变量、属性、协议、方法信息存储在只读的 `class_ro_t` 里，运行时取出 `class_ro_t` 的信息，与分类、动态添加方法等信息合并，变成 `class_rw_t`。

```cpp title='objc-runtime-new.mm'
static Class realizeClassWithoutSwift(Class cls, Class previously)
{
    auto ro = (const class_ro_t *)cls->data();
    // Normal class. Allocate writeable class data.
    rw = objc::zalloc<class_rw_t>();
    rw->set_ro(ro);
    rw->flags = RW_REALIZED|RW_REALIZING|isMeta;
    cls->setData(rw);
}
```
