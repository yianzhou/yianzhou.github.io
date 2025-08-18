# fishhook

## 使用方法

```c
#import <fishhook/fishhook.h>
#import <xpc/xpc.h>

// 定义一个指向原始函数的指针
static void *(*original_malloc)(size_t size);

void *my_malloc(size_t size) {
    // 在这里实现你自己的逻辑
    NSLog(@"malloc called with size: %zu", size);

    // 调用原始的 malloc 函数
    return original_malloc(size);
}

int main(int argc, char * argv[]) {
    // 使用 fishhook 替换 malloc 函数的实现
    struct rebinding reb = {"malloc", my_malloc, (void *)&original_malloc};
    rebind_symbols(&reb, 1);

    // 测试fishhook
    malloc(100);

    return 0;
}
```

## 数组退化为指针

```c
int rebind_symbols(struct rebinding rebindings[], size_t rebindings_nel);
```

当你写 `struct rebinding rebindings[]` 作为参数时，实际上传递的是一个指向结构体数组首元素的指针。核心概念：数组退化为指针 (Array Decay)。当你将一个数组传递给一个函数时，你实际上并没有把整个数组（所有的数据）复制一份传进去。这样做效率极低，特别是对于大数组。相反，C 语言只传递了数组第一个元素的内存地址。因此，在函数内部，rebindings 变量的实际类型是一个指针。这和 `struct rebinding *rebindings` 在参数声明中的效果是一样的。这样做的好处是，语义上更清楚：你期望传递的是一个结构体数组，而不是单个结构体。

C 函数能否直接传递数组本身？不能。C 语言没有办法直接把整个数组作为参数传递给函数（当你尝试这样做的时候，编译器会报错）。传递的只是数组的首地址（指针），而不是整个数组的内容。如果你想在函数内部获得数组的长度，必须额外传递长度参数。

![img](/img/CE19D6E1-0B21-4A76-A49A-819D1CE84B6D.png)

## 指针的指针

```c
struct rebinding {
  const char *name;
  void *replacement;
  void **replaced;
};
```

这个结构体代表了一个需要被 hook 的函数。

`void *replacement` 是一个**输入**参数。你告诉 fishhook：“这是新函数的地址”。
`void **replaced` 是一个**输出**参数。fishhook 告诉你：“我把原始函数的地址存到你指定的这个位置了”。

在 C 语言中，一个函数名本身就可以被看作一个指向该函数代码起始位置的指针。例如，如果你有一个新函数 `void *my_malloc(size_t size)`，那么 `my_malloc` 这个标识符的值就是这个函数的地址。它的类型是 `void (*)(size_t size)`，但为了通用性，fishhook 使用 `void *` (通用指针) 来接收它。`replacement` 存储的是一个值：新函数的内存地址。

`void **replaced` (指针的指针): 这个成员的用途是接收原始函数的地址。这是一种典型的 C 语言"通过指针传参实现值返回"(pass-by-reference) 的技巧。

注意我们用来存储原始 malloc 函数地址的变量 `static void *(*original_malloc)(size_t size);`，它是指针的指针。

假设我们用的是指针：`static void *original_malloc(size_t size);`，然后把`original_malloc`传递给了 fishhook，你传递的是它当前的**值**，fishhook 内部对这个值的任何修改，都只是修改了它自己的一个副本，无法影响到你代码中的 `original_malloc` 变量。

为了让 fishhook 能够修改你代码中的 `original_malloc` 变量，你必须把这个变量的地址 (`&original_malloc`) 传给它。

`original_malloc` 的类型是 `void *` (一个指针)。`&original_malloc` 的类型自然就是 `void **` (一个指向指针的指针)。

```c
// 链表的元素数量在运行时才确定，因此使用堆分配
static struct rebindings_entry *_rebindings_head;

int rebind_symbols(struct rebinding rebindings[], size_t rebindings_nel) {
  // 这个函数将传入的rebindings数组添加到fishhook的全局链表头部。链表的头指针是_rebindings_head，这是一个全局变量，用于维护所有重绑定请求。
  // fishhook使用链表来存储重绑定信息，因为它允许多次调用rebind_symbols时累积多个重绑定请求，而不会覆盖之前的请求。
  int retval = prepend_rebindings(&_rebindings_head, rebindings, rebindings_nel);
}

static int prepend_rebindings(struct rebindings_entry **rebindings_head,
                              struct rebinding rebindings[],
                              size_t nel) {
  // 链表节点需要长期存在，不能用栈分配，必须用malloc在堆上分配
  // 如果用栈分配，new_entry在prepend_rebindings函数返回后就会被销毁，链表中的指针就会指向无效内存
  struct rebindings_entry *new_entry = malloc(sizeof(struct rebindings_entry));
  // 需要为 rebindings 数组在堆上分配空间，因为它的大小是动态的
  new_entry->rebindings = malloc(sizeof(struct rebinding) * nel);
  memcpy(new_entry->rebindings, rebindings, sizeof(struct rebinding) * nel);
  new_entry->rebindings_nel = nel;
  new_entry->next = *rebindings_head;

  // 在函数内部修改链表头指针本身
  *rebindings_head = new_entry;

  return 0;
}
```

`struct rebindings_entry **` 这种“二级指针”是 C 语言中修改函数外部指针（即链表的头）的标准模式。这样做的目的是：在函数内部可以修改链表头指针本身。

如果参数是`struct rebindings_entry *rebindings_head`，C 语言的函数调用是按值传递 (Pass-by-Value)，你只能修改链表头指针的副本，无法改变外部的链表头指针。这样即使你在函数内部让 `rebindings_head = new_entry;`，函数外部的链表头指针并不会改变。

当用户首次调用 `rebind_symbols` `时，prepend_rebindings` 会将传入的 rebindings 数组插入到 `_rebindings_head` 之后（即 `_rebindings_head->next` 指向第一个实际节点）。`_rebindings_head` 本身是一个永久存在的空节点，用于标记链表的开始，是一个哨兵节点（sentinel node）。

## 链表节点

```c
// 链表节点，用于存储重绑定信息，包括重绑定数组、重绑定数量和下一个节点指针。
struct rebindings_entry {
  struct rebinding *rebindings;
  size_t rebindings_nel; // number of elements
  struct rebindings_entry *next;
};
```

为什么 `rebindings_entry` 节点要保存一个数组而不是单个 `rebinding`？

批量操作的效率：外部调用者可能一次性重绑定多个符号（一次性 hook 多个函数），如果每次只能插入一个 rebinding，那么就要多次调用 `prepend_rebindings` 接口，链表就会有很多节点，插入和遍历效率都低。允许每个节点保存一个数组，可以一次性批量插入，减少链表节点数量，提高效率。

内存管理简化：每个节点只需分配一次数组内存，管理起来更简单。如果每个节点只保存一个 `rebinding`，那么每插入一个都要分配一个节点，内存碎片化严重。

```c
// 如果每个节点只保存一个 rebinding
struct rebindings_entry {
    struct rebinding data; // 单个 rebinding
    struct rebindings_entry *next;
};

// 如果有 1000 个 rebinding 需要处理，需要循环调用 prepend
for (int i = 0; i < 1000; i++) {
    prepend_one_rebinding(&head, &rebindings[i]);
}
```

在这种设计下，为了处理 1000 个 rebinding，需要调用 `malloc` 1000 次来创建 1000 个链表节点，`malloc` 是一个相对昂贵的操作，它涉及到向操作系统申请内存、查找合适的内存块、记录元数据等。频繁地调用 `malloc` 来分配小块内存会导致内存碎片化和性能下降。

从使用场景来看，调用者传入的一批 rebinding 往往是逻辑上相关的一个集合，例如 `printf`, `scanf`, `fopen` 等多个相关的函数。当后续的代码需要遍历和处理这些 rebinding 时，它可以直接拿到一个逻辑相关的数组进行操作，而不是在链表上一个个地跳跃。这可能使得后续的算法更简单、缓存更友好（因为数组内元素是连续存储的）。如果将来需要撤销某一次的重绑定操作，只需要找到对应的 rebindings_entry 节点并将其从链表中移除，就可以一次性撤销一整批 rebinding。

综上所述，虽然“每个节点只保存一个元素”是链表最基础、最简单的形式，但在 `rebind_symbols` 这个特定的高性能、面向批量操作的场景下，采用“每个节点保存一批元素”的设计是一种非常明智的权衡与优化。它用稍微复杂一点的数据结构，换来了巨大的性能提升和更好的逻辑聚合性。这种设计模式在高性能系统编程中非常常见。

## 绑定

```c
uint32_t c = _dyld_image_count();
for (uint32_t i = 0; i < c; i++) {
    _rebind_symbols_for_image(_dyld_get_image_header(i), _dyld_get_image_vmaddr_slide(i));
}
```

因此，这个循环遍历了当前进程加载的每一个镜像（image）——包括主程序和所有动态库。对于每一个镜像，它都调用了 `_rebind_symbols_for_image` 函数来执行真正的符号重绑定操作。
