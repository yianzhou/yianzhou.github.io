# fishhook

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
