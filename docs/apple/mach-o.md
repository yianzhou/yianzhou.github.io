---
slug: /
---

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

Load Commands 是告诉 dyld 怎么把这个 Mach-O 加载到内存并运行的指令表。程序启动时，dyld 读取 Mach-O 文件的 Load Commands，并根据这些命令一条一条地执行，最终把这个磁盘上的文件，变成一个可以在内存中运行的进程。

每一条命令都有自己的类型和大小，告诉 dyld 要执行一个特定的任务。以下是一些最重要的 Load Commands 及其作用：

内存布局映射 (LC_SEGMENT_64): 这是最基本、最重要的命令之一。它告诉 dyld 把文件中的这一块数据，映射到内存的这个虚拟地址上。

- `__TEXT` 段：包含可执行代码、只读数据等。内存权限为只读+可执行 (r-x)，防止代码被意外篡改。
- `__DATA` 段：包含可读写的数据，比如全局变量、静态变量等。内存权限为可读+可写 (rw-)。
- `__LINKEDIT` 段：包含链接时需要的信息，如符号表、字符串表、重定位信息、代码签名等。内存权限为可读 (r)。

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

- `vmaddr`: 这个 Segment 被加载到内存后，它应该被放置在的虚拟地址。这是程序链接时就已经计算和分配好的一个理想地址。
- `vmsize`: 这个 Segment 在内存中总共需要多大的空间。这个值通常会向上取整到系统内存页（Page）的整数倍（在 ARM64 上是 16KB）。
- `fileoff`: 这个 Segment 的内容是从 Mach-O 文件的第几个字节开始的。

动态库加载 (LC_LOAD_DYLIB): 这条命令告诉 dyld 本程序依赖于某个动态库，请在启动时找到并加载它。

主线程入口点 (LC_MAIN): 这条命令指定了程序 main 函数相对于 `__TEXT` 段基地址的偏移量。dyld 在完成所有加载和链接工作后，会跳转到这个地址开始执行。

## 符号表

符号表信息 (LC_SYMTAB): 为了进行动态链接和调试，dyld 和调试器需要知道函数和变量的名字与地址的对应关系。这条命令告诉 dyld 符号表和字符串表在文件中的什么位置，以及它们有多大。dyld 会利用这些信息来完成符号的“绑定”（Binding），比如将你的代码中对 `printf` 函数的调用，链接到 `libSystem.B.dylib` 中 `printf` 函数的实际内存地址。

- 符号表的位置 (Symbol Table Offset): 指向一个由 `nlist_64` 结构体组成的数组。每个结构体描述一个符号，但只包含指向字符串表的索引，没有名字本身。
- 字符串表的位置 (String Table Offset): 指向一个包含所有符号名称的、连续的字符串区域。

为什么符号表不存储符号的名称？而是要把符号的名称另外存到字符串表里？——将符号表设计成一个固定大小结构体的数组，并将可变长度的字符串分离出去，是解决“固定”与“可变”数据存储矛盾的最佳方案。

由于符号表是一个固定大小的结构体数组，整个符号表可以被直接映射到内存中，并作为一个原生的 C 数组来访问，通过索引 i 直接定位符号信息的操作快如闪电。

如果强行在 `nlist_64` 结构体中为符号名预留空间，比如 `char symbol_name[256];`，那么对于 `_main` 这样短小的名字，就会浪费掉 251 个字节的无用空间。对于成千上万个符号，这将导致二进制文件极度臃肿。

根据 `loader.h` 文件里的注释，主符号表可以分为三个大组：

- 本地符号：当你编译一个项目时，每个 `.c` 或 `.m` 文件都会先被编译成一个 `.o` 目标文件（这就是一个“模块”），因此可以按模块进一步分组，本地符号的作用域仅限于其所在的模块，且**仅用于调试**。
- 已定义的外部符号：在当前二进制文件中实现的，并且可以被其他模块或动态库引用的符号。它们构成了你的二进制文件的“公共 API”。
- 未定义符号：你的代码引用了，但其实现位于外部动态库中的符号。

```c
struct symtab_command {
	uint32_t	cmd;		/* LC_SYMTAB */
	uint32_t	cmdsize;	/* sizeof(struct symtab_command) */
	uint32_t	symoff;		/* symbol table offset */
	uint32_t	nsyms;		/* number of symbol table entries */
	uint32_t	stroff;		/* string table offset */
	uint32_t	strsize;	/* string table size in bytes */
};
```

### 本地符号

本地符号在最终的可执行文件中，其主要作用就是为了调试和分析。它们完全可以，并且在 Release 版本中应该被“脱去”（Stripped）。

在编译和链接时，本地符号是必需的。静态链接器需要它们来解析和重定位单个编译单元（.o 文件）内部的引用。一旦静态链接器完成了它的工作，所有内部的跳转和引用地址都已经计算完毕。从程序纯粹的执行角度来看，这些本地符号的名字（比如 `printf` 这个字符串）就不再是必需的了。机器码只需要知道跳转的目标地址，而不需要知道那个地址的名字是什么。

脱去本地符号，不会“删掉”或影响任何静态变量或全局变量的实际存在。在 Mach-O 文件中，符号和数据是完全分离的。所有变量的内存空间都在 `__DATA` 段中被定义和分配，所有函数代码都在 `__TEXT` 段中。编译器在生成机器码时，已经将对这些变量的访问转换成了对特定内存地址或基于寄存器的偏移量的操作。CPU 在执行时只关心地址，根本不知道 `printf` 这个名字。

所有符号的名字和它们对应的地址信息都作为元数据存储在 `__LINKEDIT` 段的符号表和字符串表中。这个段就像一个独立的“字典”或“索引”，它的存在是为了方便工具（如链接器、调试器、分析器）工作，而不是为了 CPU 的执行。

“脱去”（Stripping）这个动作，只会修改 `__LINKEDIT` 段，绝对不会触碰 `__TEXT` 和 `__DATA` 段。程序的运行时行为将和脱去前完全一模一样。

### 动态符号表

LC_DYSYMTAB 是动态符号表。它并不直接存储符号名称，它里面的条目（本地符号、导出符号、未定义符号）实际上是指向 LC_SYMTAB 所定义的完整符号表中的索引。

动态符号表是主符号表的一个经过高度优化的、专门用于动态链接的子集。dyld 在程序启动时只关心这个小而精的子集，从而大大加快了 App 的启动速度。像是在告诉 dyld：“在那个庞大的主符号表中，你只需要关心这些条目就够了。”

动态符号表主要暴露了模块的“公共 API”（导出符号，可以被别的模块使用）和“外部依赖”（导入符号，本模块使用外部模块的符号），这些是模块间通信所必需的。

```c
struct dysymtab_command {
    uint32_t cmd;	/* LC_DYSYMTAB */
    uint32_t cmdsize;	/* sizeof(struct dysymtab_command) */

    uint32_t ilocalsym;	/* index to local symbols */
    uint32_t nlocalsym;	/* number of local symbols */

    uint32_t iextdefsym;/* index to externally defined symbols */
    uint32_t nextdefsym;/* number of externally defined symbols */

    uint32_t iundefsym;	/* index to undefined symbols */
    uint32_t nundefsym;	/* number of undefined symbols */

    uint32_t tocoff;	/* file offset to table of contents */
    uint32_t ntoc;	/* number of entries in table of contents */

    uint32_t modtaboff;	/* file offset to module table */
    uint32_t nmodtab;	/* number of module table entries */

    uint32_t extrefsymoff;	/* offset to referenced symbol table */
    uint32_t nextrefsyms;	/* number of referenced symbol table entries */

    uint32_t indirectsymoff; /* file offset to the indirect symbol table */
    uint32_t nindirectsyms;  /* number of indirect symbol table entries */

    uint32_t extreloff;	/* offset to external relocation entries */
    uint32_t nextrel;	/* number of external relocation entries */

    uint32_t locreloff;	/* offset to local relocation entries */
    uint32_t nlocrel;	/* number of local relocation entries */
};
```

动态符号表不是不关心本地符号吗，为什么 `dysymtab_command` 结构体中有 `ilocalsym` 和 `nlocalsym`？

`dysymtab_command` 的命名虽然侧重于“动态符号”，但它的实际功能是一个更加通用的、为整个主符号表提供结构化索引的加载命令，可以视作是“主符号表的导航图”或“索引目录”。它为整个主符号表的所有三个部分（本地、外部、未定义）都划定了清晰的边界。虽然 dyld 只使用这张“导航图”的后两个部分，但其他工具（尤其是静态链接器 `ld` 和 剥离工具 `strip`）会使用到第一个部分。

### 间接符号表

间接符号表是一个由 32 位无符号整数（`uint32_t`）组成的索引数组。这个数组本身不存储符号的名称或地址，而是存储指向主符号表（Symbol Table）中条目的索引。

它的位置和大小由 `LC_DYSYMTAB` 中的 `indirectsymoff` 和 `nindirectsyms` 字段定义。

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

`nm -ap SmartPush`: 使用 `-p` 选项告诉 `nm` 不要对输出进行排序，而是按照它们在符号表中的原始顺序列出；使用 `-a` 强制 `nm` 显示所有符号，包括那些默认被隐藏的本地符号和调试符号。

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

因此，编译器会将 `printf` 标记为一个未定义的外部符号 (Undefined External Symbol)。同时，生成一条跳转指令，看起来像是 `bl _printf`，并且在 `main.o` 文件的重定位表中添加一条记录。这条记录大致意思是：“在代码段的这个位置，有一条 `bl` 指令，它的目标是外部符号 `_printf`。请在链接时修复这个跳转。”

链接器的任务是把所有独立的零件（目标文件 .o 和库文件 .dylib/.a）组装成一个完整的、可以运行的最终产品（可执行文件或动态库）。

链接器会遍历所有输入文件中的符号表，并掌握两类关键信息：

- 已定义符号 (Defined Symbols)：某个文件明确提供了这个函数或变量。例如，`main.o` 提供了 `_main` 函数，`libSystem.B.dylib` 提供了 `_printf` 函数。
- 未定义符号 (Undefined Symbols)：某个文件需要使用，但自己没有提供。例如，`main.o` 说它需要 `_printf`。

然后，链接器会拿着所有“未定义符号”的清单，去找对应的“已定义符号”。例如在内部记录下：`main.o` 想要的 `_printf`，实际上就是 `libSystem.B.dylib` 里的那个。

如果链接器找不到某个未定义符号的定义，就会发生 "Undefined symbols for architecture..." 错误。

链接器确定所有符号的最终归属后，就可以处理编译器留下的那些重定位条目了。

对于 `main.o` 中 `_printf` 的调用，链接器知道 `_printf` 来自一个动态库，这意味着它的真实内存地址在程序运行时才能确定。直接填一个固定的地址是行不通的。

链接器会在 `__TEXT,__stubs` 节中生成一小段汇编代码，我们称之为 `_printf$stub`。这段代码的作用是读取 `__la_symbol_ptr` 中的指针并跳转。

在 `__DATA,__la_symbol_ptr` 节中为 `_printf` 预留一个 8 字节的指针大小的空间（一个槽位）。Lazy Symbol Pointers 这是一个指针数组，专门用于懒加载的函数。它的初始值是指向 dyld 的一个辅助函数`dyld_stub_binder`。程序运行时，dyld 会将函数的真实地址回填到这里。

在间接符号表中添加一个条目，这个条目的位置与 `__la_symbol_ptr` 中的槽位对应，这个条目的值是 `_printf` 在主符号表中的索引。

然后，它将 main.o 中的 `bl _printf` 指令的跳转目标，修改为它刚刚生成的 `_printf$stub` 的地址。

## 函数调用

程序启动时，dyld 会加载程序和它依赖的 libSystem 库。

当代码执行到 `br` 指令时，跳转到 `__stubs` 节中的 `printf` 符号桩。符号桩的代码非常简单，本质上就是一条间接跳转指令，它会去读取 `__la_symbol_ptr` 表里 `printf` 对应槽位的值，然后跳转到那个值所指向的地址。

因为是第一次调用，`__la_symbol_ptr` 里的地址是 `dyld_stub_binder`。所以，程序跳转到了 dyld 的绑定辅助函数。

`dyld_stub_binder` 被触发后，dyld 通过传递给它的信息，能够确定是哪个指针槽位触发了这次绑定。比如说，它知道了是 `__la_symbol_ptr` 节中的第 k 个槽位。

此时，间接符号表开始发挥其决定性作用：

- 定位索引：dyld 知道 `__la_symbol_ptr` 节在间接符号表中的起始索引（从 Section Header 的 `reserved1` 字段获得）。假设这个起始索引是 217。
- 查找索引：dyld 计算出当前要解析的符号在间接符号表中的确切位置：`index_in_indirect_table = 217 + k`。
- 读取索引：dyld 读取间接符号表在该位置的值。这个值是一个指向主符号表的索引。假设读出来的值是 1181。（间接符号表在此刻提供了一个从“物理位置”（第 k 个指针槽）到“逻辑身份”（主符号表中的第 1067 个符号）的关键映射）
- 获取符号名：dyld 使用索引 1067 访问主符号表 (symtab)，从 `symtab[1181]` 条目中获得该符号名在字符串表 (strtab) 中的偏移量，最终读取到符号名字符串 `_printf`。
- 查找真实地址：dyld 拿着 `_printf` 这个名字，在所有已加载的动态库（如 libSystem.B.dylib）的导出符号中进行查找。最终，它找到了 printf 函数的真实内存地址，比如 0x7fffa1b2c3d4。
- 回填（Back-Patching）：dyld 将刚刚找到的真实地址 0x7fffa1b2c3d4 写回到 `__la_symbol_ptr` 节中第 k 个指针槽位，覆盖掉原来指向 `dyld_stub_binder` 的那个旧地址。
- 跳转执行：dyld 将执行流跳转到 0x7fffa1b2c3d4，`printf` 函数被成功调用。

后续调用时，直接跳转到真实的 0x7fffa1b2c3d4 函数，不再需要 dyld 解析过程。
