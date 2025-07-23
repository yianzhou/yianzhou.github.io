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

C 函数能否直接传递数组本身？不能。C 语言没有办法直接把整个数组作为参数传递给函数。传递的只是数组的首地址（指针），而不是整个数组的内容。如果你想在函数内部获得数组的长度，必须额外传递长度参数。

## 指针的指针

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

## 原理

iOS 应用最终编译成 Mach-O 格式的可执行文件。Mach-O 文件中有一个重要的 section 叫做 `__DATA,__la_symbol_ptr`（懒加载符号指针表）和 `__DATA,__nl_symbol_ptr`（非懒加载符号指针表），这两者分别用于懒加载和非懒加载的动态库符号解析。

这是一个非常经典且具有诊断价值的问题！当符号断点能命中一个函数，而 `fishhook` 却无法 Hook 它时，问题几乎总是指向一个核心原因：**函数的调用方式**。

让我们深入分析一下，为什么会发生这种情况，以及如何去验证它。

### 核心原因：静态链接 vs 动态链接 (Inline vs PLT/GOT)

一个 C 函数的调用，在编译后可以有两种主要形式：

1.  **间接调用 (Indirect Call) / 外部调用 (External Call)**:

    - **场景**: 当你的代码调用一个位于**不同二进制文件**（例如，一个动态库 `dylib`）中的函数时，比如你的 App 代码调用 `libxpc.dylib` 里的 `xpc_dictionary_set_data`。
    - **工作原理**: 编译器无法在编译时知道这个函数的具体地址。因此，它会生成一个“桩”（stub）。这个桩会去一个叫做 **GOT (Global Offset Table)** 的表中查找函数的真实地址，然后跳转过去。这个过程被称为**动态链接**。
    - **`fishhook` 的作用域**: **`fishhook` 正是工作在这个层面上**。它通过修改 GOT 表中的函数地址，将原本指向原始函数的指针，重定向到你的自定义函数。所以，**`fishhook` 只能 Hook 这种间接调用**。

2.  **直接调用 (Direct Call) / 内联 (Inlining)**:
    - **场景**: 当调用者和被调用者位于**同一个二进制文件**内时，编译器在优化时可能会采取更激进的策略。
    - **工作原理**:
      - **直接调用**: 如果编译器在链接时能确定函数的地址，它会生成一个直接跳转到该地址的机器指令 (`BL` 指令 on ARM64)。这个调用完全绕过了 GOT 表。
      - **内联 (Inlining)**: 编译器甚至会把被调用函数的代码直接“复制粘贴”到调用者的代码中，完全消除了函数调用的开销。
    - **`fishhook` 的局限**: 在这两种情况下，因为调用没有经过 GOT 表，所以 **`fishhook` 完全无效**。它无法修改一个硬编码在机器指令中的跳转地址，也无法 Hook 一个已经被内联的代码。

### 诊断：你的情况是什么？

你的情况是：

- **符号断点可以命中 `xpc_dictionary_set_data`**: 这说明这个函数**确实被调用了**。Xcode 的调试器足够智能，可以在函数入口处设置断点，无论它是如何被调用的。
- **`fishhook` 失败了**: 这强烈暗示调用 `xpc_dictionary_set_data` 的代码，与 `xpc_dictionary_set_data` 函数本身，**位于同一个二进制模块中**，并且是以**直接调用**或**内联**的方式进行的。

**那么，谁在调用 `xpc_dictionary_set_data`？**

当你创建一个 `WKWebView` 时，大部分 XPC 相关的操作是由 `WebKit.framework` 或 `WebKitLegacy.framework` 内部的代码执行的。`xpc_dictionary_set_data` 函数本身位于 `libxpc.dylib` 中。

但是，这里有一个关键点：**`libxpc.dylib` 是一个非常基础和核心的库，很多系统框架为了性能，可能会选择将部分 `libxpc` 的代码静态链接或内联到自己的二进制中。**

更有可能的情况是：

> WebKit 框架内部在调用 `xpc_dictionary_set_data` 时，这个调用发生在 `WebKit.framework` 的二进制内部，并且它调用的很可能是另一个也位于 `WebKit.framework` 内部的、对 `xpc_dictionary_set_data` 的一个封装或直接实现，或者编译器进行了跨模块优化。

**最可能的一种情况是，`WebKit.framework` 内部的代码调用 `xpc_dictionary_set_data` 时，这个调用是直接的，而不是通过动态链接的桩。**

### 如何验证这个理论？(关键步骤)

你可以使用 LLDB 来查看调用栈和反汇编代码，这会给你确凿的证据。

1.  **设置符号断点**：在 `xpc_dictionary_set_data` 上设置符号断点，就像你之前做的那样。
2.  **运行并命中断点**：让程序运行到断点处。
3.  **查看调用栈 (Backtrace)**：
    在 LLDB 控制台中输入 `bt` (backtrace) 命令。

    ```lldb
    bt
    ```

    观察调用栈。`frame #0` 是当前函数 `xpc_dictionary_set_data`。你需要看 `frame #1`，也就是**调用它**的那个函数。

    - **如果 `frame #1` 也在 `libxpc.dylib` 中**：这说明是 `libxpc` 内部的函数在调用它。这很可能是直接调用。
    - **如果 `frame #1` 在 `WebKit.framework` 或其他框架中**：这是我们最关心的场景。

4.  **反汇编调用处的代码 (Disassemble)**：
    现在，让我们看看到底是哪条机器指令发起了这个调用。
    在 LLDB 中输入 `dis -p` 或者 `disassemble --pc`。这会反汇编当前程序计数器（PC）所在的函数，并用箭头 `->` 指出当前行。

    ```lldb
    dis -p
    ```

    你会看到类似这样的汇编代码（以 ARM64 为例）：

    ```assembly
    libxpc.dylib`xpc_dictionary_set_data:
    ->  0x1a7b8f3c0 <+0>:  stp    x29, x30, [sp, #-0x10]!
        0x1a7b8f3c4 <+4>:  mov    x29, sp
        ...
    ```

    这只是函数内部。我们需要看**调用它之前**的地方。

    使用 `up` 命令切换到上一层栈帧 (`frame #1`)，然后反汇编：

    ```lldb
    (lldb) frame select 1   // 或者 up
    (lldb) dis -c 5 -p      // 反汇编当前 PC 周围的 5 条指令
    ```

    现在，仔细观察调用 `xpc_dictionary_set_data` 的那条指令。

    - **情况 A (fishhook 能 Hook 的)**：你会看到类似 `BLR x16` 的指令，它跳转到一个从内存（通常是 GOT 表）加载到寄存器 `x16` 的地址。或者跳转到一个 `__stubs` 或 `__la_symbol_ptr` 的地址。这表示间接调用。

    - **情况 B (fishhook 不能 Hook 的)**：你会看到一条 `BL <address>` 指令。
      ```assembly
      ...
      0x18f3c4a88: BL     0x1a7b8f3c0  ; xpc_dictionary_set_data
      ...
      ```
      这里的 `0x1a7b8f3c0` 是一个**硬编码的地址**。这个调用是直接的，完全不经过 `fishhook` 能修改的区域。**这几乎可以肯定是你的问题所在。**

### 结论与解决方案

**结论**：`fishhook` 失败是因为 `xpc_dictionary_set_data` 在这个调用路径上被**直接调用（Direct Call）**，而不是通过动态链接的 GOT/PLT 机制。你的符号断点之所以有效，是因为它直接在函数的入口地址设置了断点，绕过了调用方式的差异。

**解决方案**：
很遗憾，对于这种情况，**没有简单的解决方案**。`fishhook` 的机制决定了它无法处理直接调用。

你能做的是：

1.  **改变 Hook 目标**：向上追溯调用栈。既然无法 Hook `xpc_dictionary_set_data`，那就尝试 Hook **调用它**的那个函数（`frame #1` 里的函数）。这个更高层的函数可能是一个 Objective-C 方法或者一个更容易被 Hook 的 C 函数。但这需要更深入的逆向分析。

2.  **使用更强大的工具**：对于这种场景，你需要更底层的 Hook 框架，比如 **Inline Hook** 框架（例如 Substrate, Dobby 等）。Inline Hook 通过直接在函数开头插入跳转指令（JMP）来重定向代码流，因此它可以 Hook 任何函数，无论它是如何被调用的。但这通常更复杂，并且在非越狱设备上使用有诸多限制。

3.  **继续使用断点**：如果你的目的只是调试和分析，那么使用带 "Action" 的符号断点，让它自动打印参数并继续执行，可能是最实用、最无侵入性的方法。

这个诊断过程本身就是一次非常有价值的逆向工程实践，它揭示了编译、链接和函数调用背后的深层机制。
