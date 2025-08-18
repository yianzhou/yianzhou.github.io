# Mach-O

## 概念

Mach-O (Mach Object) 文件格式是苹果 macOS 和 iOS 系统使用的可执行、可链接的 ABI 文件格式。Mach-O 文件是代码与数据的集合，体现了在苹果定义的一套规则下，程序文件是如何构成的，程序的链接、装载是如何发生的。

ABI 文件是操作系统的基石。学习认识一个新的 OS，理解它的 ABI 文件是非常好的切入点，对于苹果系统同样如此。

Mach-O 官方文档：`https://github.com/aidansteele/osx-abi-macho-file-format-reference/blob/master/Mach-O_File_Format.pdf`

Mach-O 源码：`https://github.com/apple/darwin-xnu/blob/main/EXTERNAL_HEADERS/mach-o/loader.h`

Mach-O 文件格式：

![img](/img/184275AA-0107-4039-BA26-F6D1B7EDF5ED.png)

Mach-O 内信息的排列，是按照约定的格式（一个个的结构体）来对齐的。ABI 即对应 Mach-O 的格式，也就对应了一套读取的规则。ABI 稳定也就是说 Mach-O 内部的格式不会再变了，那么编译器、链接器才能稳定地向后兼容。

查看 Mach-O 的工具：`https://github.com/fangshufeng/MachOView`

## Load Commands

Load Commands 是告诉 dyld 怎么把这个 Mach-O 加载到内存并运行的指令表。

当你在 macOS 或 iOS 上打开一个应用或在终端运行一个命令时，操作系统内核首先会识别它是一个 Mach-O 文件。然后，内核会启动一个叫做 dyld 的程序。dyld 的核心任务就是读取这个 Mach-O 文件的 Load Commands，并根据这些命令一条一条地执行，最终把这磁盘上的文件，变成一个可以在内存中运行的进程。

每一条命令都有自己的类型 (cmd) 和大小 (cmdsize)，告诉 dyld 要执行一个特定的任务。以下是一些最常见和最重要的 Load Commands 及其作用：

内存布局映射 (LC_SEGMENT_64): 这是最基本、最重要的命令之一。它告诉 dyld 把文件中的这一块数据，映射到内存的这个虚拟地址上。

- `__TEXT` 段：包含可执行代码、只读数据等。这条命令会把它映射到内存中，并设置为只读+可执行 (r-x) 权限，防止代码被意外篡改。
- `__DATA` 段：包含可读写的数据，比如全局变量、静态变量等。这条命令会把它映射到内存中，并设置为可读+可写 (rw-) 权限。
- `__LINKEDIT` 段：包含链接时需要的信息，如符号表、字符串表、重定位信息等。dyld 会用它来解析符号。

```c
// 这是 LC_SEGMENT_64 命令在 C 语言中的结构体定义
struct segment_command_64 {
    uint32_t    cmd;        // 命令类型, 对于这个命令, 值是 LC_SEGMENT_64
    uint32_t    cmdsize;    // 这条命令的总大小 (包括它后面的 section 定义)
    char        segname[16];// Segment 的名字, 如 "__TEXT", "__DATA"
    uint64_t    vmaddr;     // Segment 在虚拟内存中的起始地址 (VM Address)
    uint64_t    vmsize;     // Segment 在虚拟内存中占据的大小 (VM Size)
    uint64_t    fileoff;    // Segment 在文件中的起始偏移 (File Offset)
    uint64_t    filesize;   // Segment 在文件中占据的大小 (File Size)
    vm_prot_t   maxprot;    // 内存页面的最大允许权限 (Maximum VM Protection)
    vm_prot_t   initprot;   // 内存页面的初始权限 (Initial VM Protection)
    uint32_t    nsects;     // 这个 Segment 包含的 Section 数量
    uint32_t    flags;      // 标志位
};
```

- `vmaddr`: 当这个 Segment 被加载到内存后，它应该被放置在的虚拟地址。这是程序链接时就已经计算和分配好的一个理想地址。
- `vmsize`: 这个 Segment 在内存中总共需要多大的空间。这个值通常会向上取整到系统内存页（Page）的整数倍（在 ARM64 上是 16KB）。因为操作系统是以页为单位管理内存的。
- `fileoff`: 这个 Segment 的内容，是从 Mach-O 文件的第几个字节开始的。

动态库加载 (LC_LOAD_DYLIB): 这条命令告诉 dyld 本程序依赖于某个动态库，请在启动时找到并加载它。

主线程入口点 (LC_MAIN): 这条命令指定了程序 main 函数相对于 `__TEXT` 段基地址的偏移量。dyld 在完成所有加载和链接工作后，会跳转到这个地址开始执行。

## 符号表

符号表信息 (LC_SYMTAB): 为了进行动态链接和调试，dyld 和调试器需要知道函数和变量的名字与地址的对应关系。这条命令告诉 dyld 符号表和字符串表在文件中的什么位置，以及它们有多大。dyld 会利用这些信息来完成符号的“绑定”（Binding），比如将你的代码中对 `printf` 函数的调用，链接到 `libSystem.B.dylib` 中 `printf` 函数的实际内存地址。

- 符号表的位置 (Symbol Table Offset): 指向一个由 `nlist_64` 结构体组成的数组。每个结构体描述一个符号，但只包含指向字符串表的索引，没有名字本身。
- 字符串表的位置 (String Table Offset): 指向一个包含所有符号名称的、连续的字符串区域。

### 动态符号表

LC_DYSYMTAB 是动态符号表。它并不直接存储符号名称，它里面的条目（本地符号、导出符号、未定义符号）实际上是指向 LC_SYMTAB 所定义的完整符号表中的索引。

动态符号表是主符号表的一个经过高度优化的、专门用于动态链接的子集。dyld 在程序启动时只关心这个小而精的子集，从而大大加快了 App 的启动速度。动态符号表只暴露了模块的“公共 API”（导出符号，可以被别的模块使用）和“外部依赖”（导入符号，本模块使用外部模块的符号），这些是模块间通信所必需的。

动态符号表像是在告诉 dyld：“在那个庞大的主符号表中，你只需要关心这些条目就够了。”

### 间接符号表

间接符号表是一个由 32 位无符号整数（`uint32_t`）组成的索引数组。这个数组本身不存储符号的名称或地址，而是存储指向主符号表（Symbol Table）中条目的索引。

它的位置和大小由加载命令 LC_DYSYMTAB 中的 indirectsymoff 和 nindirectsyms 字段定义。

其内部的条目顺序与需要进行动态符号绑定的特定 Section（如 `__la_symbol_ptr`, `__nl_symbol_ptr`, `__got`）中的指针槽位是一一对应的。这种对应关系通过 Section 头部结构中的 `reserved1` 字段来建立，该字段指明了此 Section 对应的条目在整个间接符号表中的起始索引。

例如：

- `__TEXT __stubs` 的 `reserved1` 字段是 0，表示`__TEXT __stubs` 里的指针与间接符号表里 0 开始的索引一一对应。
- `__DATA_CONST __got` 的 `reserved1` 字段是 65，表示`__DATA_CONST __got` 里的指针与间接符号表里 65 开始的索引一一对应。
- `__DATA __la_symbol_ptr` 的 `reserved1` 字段是 91，表示`__DATA __la_symbol_ptr` 里的指针与间接符号表里 91 开始的索引一一对应。

间接符号表的核心功能是为动态链接器（dyld）在运行时进行符号绑定（Symbol Binding）提供必要的映射信息。

使用 `otool -I SmartPush.app/Contents/MacOS/SmartPush` 查看间接符号表：

```
Indirect symbols for (__TEXT,__stubs) 65 entries
address            index
0x0000000100008b40  1067
0x0000000100008b4c  1068
...

Indirect symbols for (__DATA_CONST,__got) 26 entries
address            index
0x0000000100010000  1077
0x0000000100010008  1170
...

Indirect symbols for (__DATA,__la_symbol_ptr) 65 entries
address            index
0x0000000100015460  1067
0x0000000100015468  1068
...
```

1067, 1068 这些数字是指向主符号表 (LC_SYMTAB) 的索引。

用 `nm` 可以查看 mach-o 的符号表。`nm` 命令在默认情况下，只显示外部（global）和未定义（undefined）的符号，不显示本地符号和调试符号。

`nm -ap SmartPush | nl`: 使用 `-p` 选项告诉 `nm` 不要对输出进行排序，而是按照它们在符号表中的原始顺序列出；使用 `-a` 强制 `nm` 显示所有符号，包括那些默认被隐藏的本地符号和调试符号；使用 `nl` 这个命令会给它的输入流加上行号。

```
1068	                 U _CFArrayCreate
1069	                 U _CFBundleGetVersionNumber
1070	                 U _CFDictionaryGetValue
1071	                 U _CFRelease
1072	                 U _CFRetain
1073	                 U _NSApplicationMain
1074	                 U _NSColorPboardType
1075	                 U _NSFilenamesPboardType
1076	                 U _NSFontAttributeName
1077	                 U _NSForegroundColorAttributeName
1078	                 U _NSGlobalDomain
1079	                 U _NSLog
```

`nl` 命令是从 1 开始显示行数，对应索引值应该是 `1068-1=1067`。结合上面的间接符号表，得出信息：间接符号表里的第一个整数 1067 代表的是主符号表里的第 1067 个符号即`_CFArrayCreate`。

## 编译链接

假设你的代码中调用了 `printf` 函数。编译时，编译器看到 `printf` 调用，第一步不是生成代码，而是检查合法性。因为你在文件开头写了 `#include <stdio.h>`，编译器会去查找这个头文件。

在 `stdio.h` 里，它会找到 `printf` 的函数原型 (Function Prototype)，类似这样：`int printf(const char *format, ...);`

有了这些信息，编译器就能检查你的调用是否正确。比如，`printf(123);` 就会报错，因为它知道第一个参数必须是字符串。

编译器现在知道如何正确地调用 `printf`。根据调用约定 (Calling Convention)，它会生成汇编指令来准备这次调用。

但编译器不知道 `printf` 的地址。`printf` 是一个外部函数，它的代码在 C 标准库 (libc 或在苹果系统上的 libSystem) 里，而不在你写的 `main.c` 文件里。

所以，编译器会做以下三件事，然后将这个问题留给链接器。

1. 生成一个带占位符的 `call` 指令，这条指令的目标地址是一个无效地址或临时的值（比如 0x00000000）。
2. 编译器生成的`main.o`中有一个符号表 (Symbol Table)，它会在这个表里添加一条记录，内容是一个名为 `_printf` 的外部符号 (External Symbol)。（注意：C 语言的函数在底层通常会加一个下划线前缀）。
3. 编译器会在 `main.o` 的重定位表里写下这样一条指令：“链接器！请在我生成的代码的第 N 个字节处（就是那个带占位符的 `call` 指令），把它后面的地址，替换成你找到的 `_printf` 符号的最终地址。”

链接器的任务是把所有独立的零件（目标文件 .o 和库文件 .dylib/.a）组装成一个完整的、可以运行的最终产品（可执行文件或动态库）。

链接器会遍历所有输入文件中的符号表，并掌握两类关键信息：

- 已定义符号 (Defined Symbols)：某个文件明确提供了这个函数或变量。例如，`main.o` 提供了 `_main` 函数，`libSystem.B.dylib` 提供了 `_printf` 函数。
- 未定义符号 (Undefined Symbols)：某个文件需要使用，但自己没有提供。例如，`main.o` 说它需要 `_printf`。

然后，链接器会拿着所有“未定义符号”的清单，去找对应的“已定义符号”。例如在内部记录下：`main.o` 想要的 `_printf`，实际上就是 `libSystem.B.dylib` 里的那个。

如果链接器找不到某个未定义符号的定义，就会发生 "Undefined symbols for architecture..." 错误。

链接器确定所有符号的最终归属后，就可以处理编译器留下的那些重定位条目了。

对于 `main.o` 中 `_printf` 的调用，链接器知道 `_printf` 来自一个动态库，这意味着它的真实内存地址在程序运行时才能确定。直接填一个固定的地址是行不通的。链接器会生成：

一个 `printf` 的符号桩 (Symbol stub) 在 `__TEXT` segment 的 `__stubs` section 中。这是一个只读可执行的区域，为每一个导入的外部函数都生成了一小段固定的跳板代码。你的代码中的 `call printf` 指令，实际上被改成了 `call <printf_stub_address>`。

一个为 `printf` 准备的指针槽位在 `__DATA` segment 的 `__la_symbol_ptr` section 中。Lazy Symbol Pointers 这是一个指针数组，专门用于懒加载的函数。它的初始值是指向 dyld 的一个辅助函数`dyld_stub_binder`。程序运行时，dyld 会将函数的真实地址回填到这里。

## 函数调用

程序启动时，dyld 会加载程序和它依赖的 libSystem 库。

当代码执行到 `call` 指令时，跳转到 `__stubs` 节中的 `printf` 符号桩。符号桩的代码非常简单，本质上就是一条间接跳转指令，类似于这样 `jmp *(__la_symbol_ptr + offset_for_printf)`。它会去读取 `__la_symbol_ptr` 表里 `printf` 对应槽位的值，然后跳转到那个值所指向的地址。

因为是第一次调用，`__la_symbol_ptr` 里的地址是 `dyld_stub_binder`。所以，程序跳转到了 dyld 的绑定辅助函数。

`dyld_stub_binder` 被触发后，dyld 通过传递给它的信息，能够确定是哪个指针槽位触发了这次绑定。比如说，它知道了是 `__la_symbol_ptr` 节中的第 k 个槽位。

此时，间接符号表开始发挥其决定性作用：

- 定位索引：dyld 知道 `__la_symbol_ptr` 节在间接符号表中的起始索引（从 Section Header 的 reserved1 字段获得）。假设这个起始索引是 217。
- 查找索引：dyld 计算出当前要解析的符号在间接符号表中的确切位置：`index_in_indirect_table = 217 + k`。
- 读取索引：dyld 读取间接符号表在该位置的值。这个值是一个指向主符号表的索引。假设读出来的值是 1181。（间接符号表在此刻提供了一个从“物理位置”（第 k 个指针槽）到“逻辑身份”（主符号表中的第 1067 个符号）的关键映射）
- 获取符号名：dyld 使用索引 1067 访问主符号表 (symtab)，从 `symtab[1181]` 条目中获得该符号名在字符串表 (strtab) 中的偏移量，最终读取到符号名字符串 `_printf`。
- 查找真实地址：dyld 拿着 `_printf` 这个名字，在所有已加载的动态库（如 libSystem.B.dylib）的导出符号中进行查找。最终，它找到了 printf 函数的真实内存地址，比如 0x7fffa1b2c3d4。
- 回填（Back-Patching）：dyld 将刚刚找到的真实地址 0x7fffa1b2c3d4 写回到 `__la_symbol_ptr` 节中第 k 个指针槽位，覆盖掉原来指向 `dyld_stub_binder` 的那个旧地址。
- 跳转执行：dyld 将执行流跳转到 0x7fffa1b2c3d4，`printf` 函数被成功调用。

后续调用时，直接跳转到真实的 0x7fffa1b2c3d4 函数，不再需要 dyld 解析过程。
