---
sidebar_position: 3
---

# Category

怎么扩展已有的类呢？一般而言，继承和组合是不错的选择。但是在 Objective-C 2.0 中，又提供了 category 这个语言特性，可以动态地为已有类添加新行为。

## 实现原理

新建 `Person` 类，再新建 `Person+Eat` 分类，将分类实现文件重写为 cpp 文件，可以找到名为 `_category_t` 的结构体。这个结构体定义在 `objc-runtime-new.h` 文件中。

```cpp
struct _category_t {
    const char *name; // 类的名字
    struct _class_t *cls;
    const struct _method_list_t *instance_methods; // 实例方法列表
    const struct _method_list_t *class_methods; // 类方法列表
    const struct _protocol_list_t *protocols; // 分类遵循的协议列表
    const struct _prop_list_t *properties; // 分类的属性列表
};
```

可以看出，category 可以添加实例方法，类方法，甚至可以实现协议，添加属性；但无法添加成员变量。

编译后的类，其内存布局已经确定，不能向编译好的类添加实例变量。运行时创建的类，可以调用 `class_addIvar` 添加成员变量。

并且，在 cpp 文件里定义了一个类型为 `struct _category_t`、名称为 `_OBJC_$_CATEGORY_Person_$_Eat` 的变量，并进行了初始化：

```cpp
static struct _category_t _OBJC_$_CATEGORY_Person_$_Eat __attribute__ ((used, section ("__DATA,__objc_const"))) =
{
	"Person",
	0, // &OBJC_CLASS_$_Person,
	(const struct _method_list_t *)&_OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_Eat,
	0,
	0,
	0,
};
```

在编译阶段，每个分类实现文件，会先以这个结构体的形式参与编译。在运行时，再将这个结构体的数据，加到类对象、元类对象里。怎么添加的呢？

```cpp title='objc-os.mm'
void _objc_init(void) // 这个函数可以看作是加载程序和运行时的入口
{
    _dyld_objc_notify_register(&map_images, load_images, unmap_image); // `load_images` 是一个函数的地址
}
```

```cpp title='objc-runtime-new.mm'
void load_images(const char *path __unused, const struct mach_header *mh)
{
    if (!didInitialAttachCategories && didCallDyldNotifyRegister) {
        didInitialAttachCategories = true;
        loadAllCategories();
    }

    // 附加 category 到类的工作会先于 `+load` 方法的执行。
    // 因此在类的 `+load` 方法调用的时候，可以调用 category 中声明的方法。
    call_load_methods();
}

static void loadAllCategories() {
    load_categories_nolock(hi);
}

static void load_categories_nolock(header_info *hi) {
    attachCategories(cls, &lc, 1, ATTACH_EXISTING);
}

// 假设 Person 类有两个分类 Play 和 Eat，那么这里传参就是
// cls: Person
// cats_list: [Play, Eat]
static void attachCategories(Class cls, const locstamped_category_t *cats_list, uint32_t cats_count, int flags)
{
    // 这里看源码注释，解释了为什么用长度为 64 的数组
    constexpr uint32_t ATTACH_BUFSIZ = 64;
    method_list_t *mlists[ATTACH_BUFSIZ]; // 二维数组
    /** 数组的内容：
    [
        [-play1, -play2], // Play 分类的方法列表
        [-eat1, -eat2], // Eat 分类的方法列表
    ]
    */
    uint32_t mcount = 0; // 一共加了多少方法
    auto rwe = cls->data()->extAllocIfNeeded(); // cls->data()取到类的数据，即class_rw_t
    for (uint32_t i = 0; i < cats_count; i++) {
        auto& entry = cats_list[i]; // 取出 category_t
        method_list_t *mlist = entry.cat->methodsForMeta(isMeta); // 取出分类中的方法
        if (mlist) {
            if (mcount == ATTACH_BUFSIZ) { // 这里处理的是一个类超过64个分类的情况
                prepareMethodLists(cls, mlists, mcount, NO, fromBundle, __func__);
                rwe->methods.attachLists(mlists, mcount);
                mcount = 0;
            }
            // 将方法加到二维数组里：
            // 先进循环的分类，其方法放在数组的后面位置；
            // 后进循环的分类，其方法放在数组的前面位置；
            // 所以，最后链接的分类，其 image 中的方法，会在最前面。
            mlists[ATTACH_BUFSIZ - ++mcount] = mlist;
        }
    }
    if (mcount > 0) {
        prepareMethodLists(cls, mlists + ATTACH_BUFSIZ - mcount, mcount,
                           NO, fromBundle, __func__);
        // 将二维数组里的所有方法，加到类的方法列表里，即 class_rw_t 里的 methods
        rwe->methods.attachLists(mlists + ATTACH_BUFSIZ - mcount, mcount);
    }
}
```

```cpp title='objc-runtime-new.h'
// addedLists: 上面那个二维数组
// addedCount: 上面那个二维数组里的方法数
class list_array_tt {
    void attachLists(List* const * addedLists, uint32_t addedCount) {
        if (addedCount == 0) return;

        if (hasArray()) {
            // many lists -> many lists
            uint32_t oldCount = array()->count;
            uint32_t newCount = oldCount + addedCount;
            array_t *newArray = (array_t *)malloc(array_t::byteSize(newCount));
            newArray->count = newCount;
            array()->count = newCount;

            // array()->lists 是原来的方法列表，放到新数组的后面位置
            for (int i = oldCount - 1; i >= 0; i--)
                newArray->lists[i + addedCount] = array()->lists[i];
            // addedLists 是新加的方法列表，放在新数组的前面位置
            for (unsigned i = 0; i < addedCount; i++)
                newArray->lists[i] = addedLists[i];
            // 假设原来 Person 类有方法 A, B
            // 先链接 Play 分类的方法 C, D
            // 后链接 Eat 分类的方法 E, F
            // 则新数组为 E, F, C, D, A, B
            free(array());
            setArray(newArray);
            validate();
        }
    }
}
```

![img](/img/6CC85DEF-52E4-48D6-859D-48903740711F.png)

这里我们可以看到，`Person+Eat.o` 最后被链接，因此同名方法里，调用的是 `Eat` 分类的方法。

## 类扩展

`@interface Person ()`

Class Extension（类扩展，也叫匿名分类），是在编译阶段就直接与 `Person` 类合并在一起，编译到 `Person.o` 文件里的。

[class extensions are often referred to as anonymous categories](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html#//apple_ref/doc/uid/TP40011210-CH6-SW3)

extension 可以添加成员变量，category 不能。

## load

`+load` 和其它类方法一样，都是放在元类对象的方法列表里。但是我们一般不会主动去调用，而是在 Runtime 加载类、分类时由系统来调用，且程序运行过程中只调用一次。

调用过程：

```cpp title='objc-runtime-new.mm'
void prepare_load_methods(const headerType *mhdr)
{
    classref_t const *classlist = _getObjc2NonlazyClassList(mhdr, &count); // 这里的顺序就和编译顺序有关了
    for (i = 0; i < count; i++) {
        schedule_class_load(remapClass(classlist[i]));
    }

    category_t * const *categorylist = _getObjc2NonlazyCategoryList(mhdr, &count); // 这里的顺序就和编译顺序有关了
    for (i = 0; i < count; i++) {
        add_category_to_loadable_list(cat);
    }
    // 结论：先编译的分类先调用，跟分类所属的类没关系
}

static void schedule_class_load(Class cls)
{
    // Ensure superclass-first ordering
    // 递归调用自身，也就是说，先将父类的方法放到数组里
    // 结论：先调用父类的 +load 方法，再调用子类的 +load 方法
    schedule_class_load(cls->getSuperclass());

    add_class_to_loadable_list(cls);
}
```

```cpp title='objc-loadmethod.mm'
void call_load_methods(void)
{
    // 结论：先调用类的 +load 方法，再调用分类的 +load 方法
    do {
        // 1. Repeatedly call class +loads until there aren't any more
        while (loadable_classes_used > 0) {
            call_class_loads();
        }
        // 2. Call category +loads ONCE
        more_categories = call_category_loads();
        // 3. Run more +loads if there are classes OR more untried categories
    } while (loadable_classes_used > 0  ||  more_categories);
}

static void call_class_loads(void)
{
    // 直接拿到 +load 方法的指针来调用，不是通过 objc_msgSend
    // 结论：类的 +load 并不会被分类的 +load 方法所覆盖
    load_method_t load_method = (load_method_t)classes[i].method;
    (*load_method)(cls, @selector(load));
}
```

## initialize

`+initialize` 会在类第一次接收到消息发送时调用，最常见的就是 `+alloc` 方法，如 `[NSObject alloc]`。

要想调用 `alloc` 方法，类对象会先通过 `isa` 指针找到元类对象，进而查找方法列表，我们可以看 `class_getClassMethod` 的源码：

```objc title='objc-class.mm'
Method class_getClassMethod(Class cls, SEL sel)
{
    // 之前已经学习过，元类对象和类对象的数据结构一模一样，元类对象就是特殊的类对象
    // 因此找元类对象的方法列表，就是将元类对象传参给 class_getInstanceMethod 方法
    return class_getInstanceMethod(cls->getMeta(), sel);
}
```

```objc title='objc-runtime-new.mm'
Method class_getInstanceMethod(Class cls, SEL sel)
{
    // Search method lists, try method resolver, etc.
    lookUpImpOrForward(nil, sel, cls, LOOKUP_RESOLVER);

    return _class_getMethod(cls, sel);
}

NEVER_INLINE
IMP lookUpImpOrForward(id inst, SEL sel, Class cls, int behavior)
{
    cls = realizeAndInitializeIfNeeded_locked(inst, cls, behavior & LOOKUP_INITIALIZE);
}

static Class realizeAndInitializeIfNeeded_locked(id inst, Class cls, bool initialize)
{
    if (slowpath(initialize && !cls->isInitialized())) {
        cls = initializeAndLeaveLocked(cls, inst, runtimeLock);
    }
    return cls;
}

static Class initializeAndLeaveLocked(Class cls, id obj, mutex_t& lock)
{
    return initializeAndMaybeRelock(cls, obj, lock, true);
}

static Class initializeAndMaybeRelock(Class cls, id inst, mutex_t& lock, bool leaveLocked)
{
    initializeNonMetaClass(nonmeta);
}
```

```objc title=objc-initialize.mm
/***********************************************************************
* class_initialize.  Send the '+initialize' message on demand to any
* uninitialized class. Force initialization of superclasses first.
**********************************************************************/
void initializeNonMetaClass(Class cls)
{
    Class supercls;
    // Make sure super is done initializing BEFORE beginning to initialize cls.
    // See note about deadlock above.
    supercls = cls->getSuperclass();
    if (supercls  &&  !supercls->isInitialized()) {
        // 结论：如果父类没有初始化，强制先调用父类的初始化
        initializeNonMetaClass(supercls); // 递归
    }

    callInitialize(cls);
}

void callInitialize(Class cls)
{
    // 结论：走的 objc_msgSend
    // 因此：
    // 1. 如果分类实现了 +initialize，会覆盖类的 +initialize 的实现
    // 2. 如果子类没有实现 +initialize，在向子类发送此消失时，会找到父类的 +initialize 方法并调用，所以 +initialize 是可能被调用多次的！
    ((void(*)(Class, SEL))objc_msgSend)(cls, @selector(initialize));
}
```

验证：

```objc
// @interface Person : NSObject
// @interface Student : Person

#import "Student.h"

int main(int argc, const char * argv[]) {
    [Student alloc];
    return 0;
}

/**
2012-07-02 16:31:45.442989+0800 ocdemo[21209:5122958] Person(Eat) +initialize
// 由于父类没有初始化过，先调用父类的初始化方法：objc_msgSend(objc_getClass("Person"), @selector(initialize))

2012-07-02 16:31:45.443267+0800 ocdemo[21481:5125042] Person(Eat) +initialize
// 父类已经初始化过了，调用子类的初始化方法：objc_msgSend(objc_getClass("Student"), @selector(initialize))
// 但由于子类没有实现 +initialize，因此消息发送机制又找到了父类的 +initialize 来调用
*/
```

## 关联对象

在分类里面写一个属性，编译器只会生成 `get` 和 `set` 方法的**声明**，不会为我们生成成员变量、`get` 和 `set` 方法的实现！

```objc
@interface Student (Name)
@property(nonatomic, copy) NSString* name;
/**
 - (NSString *)name;
 - (void)setName:(NSString *)name;
 */
@end
```

Xcode 会有警告：

```log
Property 'name' requires method 'name' to be defined - use @dynamic or provide a method implementation in this category
```

原因是编译后对象的内存布局已经确定，如果在运行时添加实例变量就会破坏类的内存布局，这对编译型语言是灾难性的。所以需使用关联对象为已存在的类添加属性。

关联对象的 Key 最好用 `@selector` 来实现，1. 代码简洁，不用另外声明变量；2. 编译器有检查，`@selector` 的方法必须存在，因此不会写错。

```objc
#import "objc/runtime.h"

@implementation Student (Name)
- (NSString *)name {
    // 对于 get 方法，还可以写成 objc_getAssociatedObject(self, _cmd)
    return objc_getAssociatedObject(self, @selector(name));
}

- (void)setName:(NSString *)name {
    objc_setAssociatedObject(self, @selector(name), name, OBJC_ASSOCIATION_COPY_NONATOMIC);
}
@end
```

## DenseMap 与 DisguisedPtr

`DenseMap` 是在 llvm 中用的非常广泛的数据结构，它的实现是一个基于 quadratic probing 的散列表。其中哈希逻辑抽象到了 `DenseMapBase` 中，而内存管理的逻辑留在了 `DenseMap` 和 `SmallDenseMap` 实现。

`DisguisedPtr` 在底层很常用，它直译为伪装指针：

```c title='objc-private.h'
class DisguisedPtr {
    // typedef unsigned long uintptr_t;
    uintptr_t value;

    static uintptr_t disguise(T* ptr) {
        return -(uintptr_t)ptr; // 将指针地址值直接取反
    }

    static T* undisguise(uintptr_t val) {
        return (T*)-val;
    }
}
```

## 关联对象的存储

所有实例的关联对象，都存在 Runtime 维护的全局哈希表中。key 是实例对象的内存地址（经过伪装），value 是关联对象的 KV 字典。

![img](/img/FD871C0E-17E5-4674-A963-D9B7FC1DB460.png)

调用过程：

```objc title='objc-runtime.mm'
void objc_setAssociatedObject(id object, const void *key, id value, objc_AssociationPolicy policy)
{
    _object_set_associative_reference(object, key, value, policy); // 这四个参数不用解释了，一看就知道是什么
}
```

```objc title='objc-references.mm'
typedef DenseMap<const void *, ObjcAssociation> ObjectAssociationMap;
typedef DenseMap<DisguisedPtr<objc_object>, ObjectAssociationMap> AssociationsHashMap;
class AssociationsManager {
    using Storage = ExplicitInitDenseMap<DisguisedPtr<objc_object>, ObjectAssociationMap>;
    static Storage _mapStorage;

    AssociationsHashMap &get() {
        return _mapStorage.get();
    }
};

void _object_set_associative_reference(id object, const void *key, id value, uintptr_t policy)
{
    DisguisedPtr<objc_object> disguised{(objc_object *)object}; // 伪装指针，并不会增加 object 的引用计数
    ObjcAssociation association{policy, value};

    association.acquireValue(); // 执行 retain 或 copy 操作

    {
        AssociationsManager manager;
        AssociationsHashMap &associations(manager.get());
        if (value) { // 设置关联对象
            // try_emplace 是 std::map 的方法，尝试放置键值对，返回值是 pair<iterator, bool>
            auto refs_result = associations.try_emplace(disguised, ObjectAssociationMap{});

            /* establish or replace the association */
            auto &refs = refs_result.first->second;
            auto result = refs.try_emplace(key, std::move(association));
            if (!result.second) {
                association.swap(result.first->second);
            }
        } else { // 擦除关联对象
            auto refs_it = associations.find(disguised);
            if (refs_it != associations.end()) {
                auto &refs = refs_it->second;
                auto it = refs.find(key);
                if (it != refs.end()) {
                    association.swap(it->second);
                    refs.erase(it);
                    if (refs.size() == 0) {
                        associations.erase(refs_it);
                    }
                }
            }
        }
    }
}
```

## 如何调用被分类覆盖的方法

拿到类对象 -> 拷贝方法列表 -> 方法名称匹配（先匹配到 category 的方法，后匹配到类的方法）拿到排在后面的 SEL 和 IMP。

```objc
Student* student = [[Student alloc] init];
student.gender = @"M";
// Student 的 printGender 方法已被 category Student (Name) 覆盖

Class studentClass = [Student class];
if (studentClass) {
    unsigned int methodCount;
    Method *methodList = class_copyMethodList(studentClass, &methodCount);
    IMP lastIMP = NULL;
    SEL lastSel = NULL;
    for (int i = 0; i < methodCount; i++) {
        Method method = methodList[i];
        NSString *methodName = [NSString stringWithCString:sel_getName(method_getName(method)) encoding:NSUTF8StringEncoding];
        if ([@"printGender" isEqualToString:methodName]) {
            lastIMP = method_getImplementation(method);
            lastSel = method_getName(method);
        }
    }
    // 见 objc 源代码 message.h
    // * These functions must be cast to an appropriate function pointer type
    // * before being called.
    // 这些方法需要强制转换成适当的函数指针类型才能调用
    typedef void (*fn)(id, SEL);
    if (lastIMP != NULL) {
        fn f = (fn)lastIMP;
        f(student, lastSel);
    }
    free(methodList);
}
```
