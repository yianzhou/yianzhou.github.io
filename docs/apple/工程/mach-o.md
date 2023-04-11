# Mach-O

## 概念

Mach-O (Mach Object) 文件格式是苹果 macOS 和 iOS 系统使用的可执行、可链接的 ABI 文件格式。类比 ELF 文件之于 Linux 平台，PE 文件之于 Windows 平台。同样的，Mach-O 文件是代码与数据的集合，体现了在苹果定义的一套规则下，程序文件是如何构成的，程序的链接、装载是如何发生的。

ABI 文件是操作系统的基石。学习认识一个新的 OS，理解它的 ABI 文件是非常好的切入点，对于苹果系统同样如此。

Mach-O 官方文档：<https://github.com/aidansteele/osx-abi-macho-file-format-reference/blob/master/Mach-O_File_Format.pdf>

Mach-O 源码：<https://github.com/apple/darwin-xnu/tree/main/EXTERNAL_HEADERS/Mach-O>

Mach-O 文件格式：

![img](/img/184275AA-0107-4039-BA26-F6D1B7EDF5ED.png)

ABI (Application Binary Interface): 通过 `machoinfo` 这个程序，我们了解到 Mach-O 内信息的排列，是按照约定的格式（一个个的结构体）来对齐的。ABI 即对应 Mach-O 的格式，也就对应了一套读取的规则。ABI 稳定也就是说 Mach-O 内部的格式不会再变了，那么编译器、链接器才能稳定地向后兼容。

查看 Mach-O 的工具：<https://github.com/fangshufeng/MachOView>

## 本地符号、全局符号、导出符号

```c
int global_int_value = 1; // 全局变量
static int static_int_value = 2; // 静态变量

int main () {
	global_int_value = 10;
    static_int_value = 20;
    return 0;
}
```

编译并查看其符号表：`clang -c main.c && objdump --macho --syms main.o`

```
SYMBOL TABLE:
0000000000000000 l     F __TEXT,__text ltmp0
0000000000000030 l     O __DATA,__data _static_int_value
000000000000002c l     O __DATA,__data ltmp1
0000000000000038 l     O __LD,__compact_unwind ltmp2
000000000000002c g     O __DATA,__data _global_int_value
0000000000000000 g     F __TEXT,__text _main
```

`l` 代表本地符号 (local symbols)，`g` 代表全局符号 (global symbols)。

可以看到，静态变量变成了本地符号；全局变量变成了全局符号。

链接并查看其符号表：`clang main.o && objdump --macho --syms a.out`

```
SYMBOL TABLE:
0000000100004004 l     O __DATA,__data _static_int_value
0000000100000000 g     F __TEXT,__text __mh_execute_header
0000000100004000 g     O __DATA,__data _global_int_value
0000000100003f8c g     F __TEXT,__text _main
```

其中本地符号是可以 `strip` 脱去的。如果想要减小动态库的体积，尽量把不必要的全局符号变为本地符号。

```bash
# 脱掉前
ls -l a.out
-rwxr-xr-x  1 yianzhou  staff  33442  1 23 20:05 a.out
# 脱掉本地符号
strip -x a.out
# 脱掉后
ls -l a.out
-rwxr-xr-x  1 yianzhou  staff  33416  1 23 20:08 a.out
```

全局符号在链接后会被导出，查看其导出符号：`objdump --macho --exports-trie a.out`

```
Exports trie:
0x100000000  __mh_execute_header
0x100004000  _global_int_value
0x100003F8C  _main
```

## visibility

```c
__attribute__((visibility("default"))) int default_int_value = 1;
__attribute__((visibility("hidden"))) int hidden_int_value = 2;

int main () {
    default_int_value = 10;
    hidden_int_value = 20;
    return 0;
}
```

编译并查看其符号表：`clang -c main.c && objdump --macho --syms main.o`

```
SYMBOL TABLE:
0000000000000000 l     F __TEXT,__text ltmp0
000000000000002c l     O __DATA,__data ltmp1
0000000000000038 l     O __LD,__compact_unwind ltmp2
000000000000002c g     O __DATA,__data _default_int_value
0000000000000030 g     O __DATA,__data _hidden_int_value
0000000000000000 g     F __TEXT,__text _main
```

链接并查看其符号表：`clang main.o && objdump --macho --syms a.out`

```
SYMBOL TABLE:
0000000100004004 l     O __DATA,__data _hidden_int_value
0000000100000000 g     F __TEXT,__text __mh_execute_header
0000000100004000 g     O __DATA,__data _default_int_value
0000000100003f8c g     F __TEXT,__text _main
```

由此可见，`visibility` 在链接阶段生效。查看其导出符号：`objdump --macho --exports-trie a.out`

```
Exports trie:
0x100000000  __mh_execute_header
0x100004000  _default_int_value
0x100003F8C  _main
```

通常在编写库的时候，会通过 `-fvisibility=hidden` 选项让所有符号默认隐藏，以减小库的体积。

`clang -fvisibility=hidden main.c && objdump --macho --syms a.out`

```
SYMBOL TABLE:
0000000100003f8c l     F __TEXT,__text _main
0000000100004000 l     O __DATA,__data _global_int_value
0000000100004004 l     O __DATA,__data _static_int_value
0000000100000000 g     F __TEXT,__text __mh_execute_header
```

对于需要导出给外部使用的符号，再显式使用 `__attribute__((visibility("default")))` 修饰。

## 外部符号

```objc
#import <Foundation/Foundation.h>

int main () {
    NSLog(@"Hello, world!");
    return 0;
}
```

编译并查看其符号表：`clang -fobjc-arc -c main.m && objdump --macho --syms main.o`

```
SYMBOL TABLE:
0000000000000000 l     F __TEXT,__text ltmp0
0000000000000048 l     O __DATA,__cfstring l__unnamed_cfstring_
0000000000000034 l     O __TEXT,__cstring ltmp1
0000000000000034 l     O __TEXT,__cstring l_.str
0000000000000048 l     O __DATA,__cfstring ltmp2
0000000000000068 l     O __DATA,__objc_imageinfo ltmp3
0000000000000070 l     O __LD,__compact_unwind ltmp4
0000000000000000 g     F __TEXT,__text _main
0000000000000000         *UND* _NSLog
0000000000000000         *UND* ___CFConstantStringClassReference
```

`NSLog` 对于 `main.o` 这个 Mach-O 来说，是**外部符号**，它现在处于**未定义**的状态。

链接并查看其符号表：`clang -fobjc-arc main.o && objdump --macho --syms a.out`

```
SYMBOL TABLE:
0000000100000000 g     F __TEXT,__text __mh_execute_header
0000000100003f68 g     F __TEXT,__text _main
0000000000000000         *UND* _NSLog
0000000000000000         *UND* ___CFConstantStringClassReference
```

链接后，其外部符号会被放到**间接符号表**：`objdump --macho --indirect-symbols a.out`

```
Indirect symbols for (__TEXT,__stubs) 1 entries
address            index name
0x0000000100003f9c     2 _NSLog
Indirect symbols for (__DATA_CONST,__got) 1 entries
address            index name
0x0000000100004000     2 _NSLog
```

所以，间接符号表的符号是不能脱去的，里面存放的是其它动态库的导出符号。

## OC 的符号

OC 的所有类在编译的时候，默认都是全局符号，并且会被导出，即使方法没有在头文件里声明。

```objc
#import <Foundation/Foundation.h>
@interface Demo : NSObject
@end
@implementation Demo
- (void)hello {
    NSLog(@"Hello world!");
}
@end
```

编译、链接、查看其导出符号：`clang -fobjc-arc main.m && objdump --macho --exports-trie a.out`

```
Exports trie:
0x1000080C0  _OBJC_CLASS_$_Demo
0x100008098  _OBJC_METACLASS_$_Demo
0x100000000  __mh_execute_header
0x100003F58  _main
```

可以传链接器参数，指定某个符号不导出，还可以使用文件来列出不需要导出的符号：

`clang -fobjc-arc -Xlinker -unexported_symbol -Xlinker '_OBJC_CLASS_$_Demo' main.m && objdump --macho --exports-trie a.out`

注意这里符号 `_OBJC_CLASS_$_Demo` 用了单引号括住，这是由于 shell 里美金符号有特殊含义。

## Swift 的符号

Swift 中 `public` 修饰的函数和类会成为导出符号。

```swift
private func p_greet() {
  print("Hello, World!")
}

func greet() {
  print("Hello, World!")
}

public func g_greet() {
  print("Hello, World!")
}
```

编译并查看其导出符号表：`swiftc main.swift && objdump --macho --exports-trie main`

```
Exports trie:
0x100003E74  _$s4main7g_greetyyF
0x100000000  __mh_execute_header
0x100003D08  _main
```

## 弱定义符号和弱引用符号

可以使用 `__attribute__((weak))` 来定义弱定义符号。链接时，如果有一个强符号和多个弱符号同名，会链接强符号，不会报错。

弱定义符号默认为全局符号。可以使用 `__attribute__((weak, visibility("hidden")))` 将其变为本地符号。

可以使用 `__attribute__((weak_import))` 来定义弱引用符号。弱引用符号如果没有方法实现，会报 `undefined symbol` 错误。

可以通过传链接器参数，允许弱引用符号未实现（即运行时动态查找）。

弱引用符号也是全局符号。

弱符号可以用来做版本适配相关的工作，假设有一个 API 在 iOS 10 不可用，iOS 11 中可用，就可以使用弱符号。

## 调试符号

编译、链接传 `-g` 参数，会生成调试符号：`clang -g main.c && objdump --macho --syms a.out`

```
SYMBOL TABLE:
0000000100004004 l     O __DATA,__data _static_int_value
0000000000000000      d  *UND*
0000000000000000      d  *UND* /Users/yianzhou/Documents/megabox/examples/macOS/symbols/
0000000000000000      d  *UND* main.c
0000000063ce2b2d      d  *UND* /var/folders/yb/d6gg31rn7snd9rnp12sctfb00000gn/T/main-ac0949.o
0000000100003f8c      d  *UND*
0000000100003f8c      d  *UND* _main
000000000000002c      d  *UND*
0000000100003f8c      d  *UND*
0000000000000000      d  *UND* _global_int_value
0000000100004004      d  *UND* _static_int_value
0000000000000000      d  *UND*
0000000100000000 g     F __TEXT,__text __mh_execute_header
0000000100004000 g     O __DATA,__data _global_int_value
0000000100003f8c g     F __TEXT,__text _main
```

`d` 表示调试符号。同时，同目录下会生成 `a.out.dSYM` 文件。

注意，这里 `dSYM` 文件不是 `clang` 生成的，而是苹果的另一个工具叫 `dsymutil`，使用 `clang -g main.c --verbose` 指令，可以看到输出里有调用 `dsymutil` 的指令：

```
"/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/dsymutil" -o a.out.dSYM a.out
```

## 符号重名

同一个可执行文件中，不能有重名的符号。

![img](/img/D9034377-360D-419E-ACEF-5075E1C7B3EF.png)

不同的可执行文件中，可能存在重名的符号。假设 A 声明了 `int global_init_value = 10`，A 链接了动态库 B，其中声明了同名的 `int global_init_value = 20`，那么，在 A 里面读取 `global_init_value` 结果会是什么呢？

——结果是 10。原因是链接器默认采用二级命名空间，除了记录符号名称，还会记录符号属于哪个可执行文件，优先使用本可执行文件的符号。

## 重定位符号

```c
void test() {}
int main () {
	test();
    return 0;
}
```

编译并查看其代码段：`clang -c main.c && objdump --macho -d main.o`：

![img](/img/00AC24D9-9AEC-4579-A6F4-A349738FA5D6.png)

第一列是相对于文件的偏移量，第二列是机器码指令，第三列是汇编代码。

关注到 `1c` 这一行，`test` 函数此时指令都是 0，这是由于在链接时才会分配真实的虚拟内存地址，所以暂时用 0 地址占位。

如果想在链接时，告诉链接器此指令需要替换成真实的虚拟内存地址，则必须将其存储到重定位符号表中。在链接阶段进行重定位。

查看重定位符号表信息：`objdump --macho --reloc main.o`

```
Relocation information (__TEXT,__text) 1 entries
address  pcrel length extern type    scattered symbolnum/value
0000001c True  long   True   BR26    False     _test

Relocation information (__LD,__compact_unwind) 2 entries
address  pcrel length extern type    scattered symbolnum/value
00000020 False ?( 3)  False  UNSIGND False     1 (__TEXT,__text)
00000000 False ?( 3)  False  UNSIGND False     1 (__TEXT,__text)
```

可以看到 `0000001c` 这个偏移量的指令需要重定位。

链接并查看其代码段：`clang main.o && objdump --macho -d a.out`：

```
(__TEXT,__text) section
_test:
100003f80:	c0 03 5f d6	ret
_main:
100003f84:	ff 83 00 d1	sub	sp, sp, #32
100003f88:	fd 7b 01 a9	stp	x29, x30, [sp, #16]
100003f8c:	fd 43 00 91	add	x29, sp, #16
100003f90:	08 00 80 52	mov	w8, #0
100003f94:	e8 0b 00 b9	str	w8, [sp, #8]
100003f98:	bf c3 1f b8	stur	wzr, [x29, #-4]
100003f9c:	f9 ff ff 97	bl	_test
100003fa0:	e0 0b 40 b9	ldr	w0, [sp, #8]
100003fa4:	fd 7b 41 a9	ldp	x29, x30, [sp, #16]
100003fa8:	ff 83 00 91	add	sp, sp, #32
100003fac:	c0 03 5f d6	ret
```

第一列是虚拟内存地址，固定从 100000000 开始，即 4GB 的 PAGEZERO；第二列是机器码指令，第三列是汇编代码。

可以看到 `_test` 函数的指令已经有了具体的地址。

## 终端读取 Mach-O

在终端输入 `tty` 可以获得当前终端窗口的链接：`/dev/ttys005`，执行脚本时 `> /dev/ttys005` 即可输出到这个终端。

`objdump` prints the contents of object files and final linked images named on the command line.

```bash
# 输出 mach header
objdump --macho --private-header machoinfo
# 读取目标文件中的重定位信息
objdump --macho --reloc main.o
# 读取符号表信息
objdump --macho --syms MachOAndSymbol
# 查看 `__TEXT` 段
objdump --macho -d MachOAndSymbol
# 查看导出符号
objdump --macho --exports-trie MachOAndSymbol
```

`otool` is the preferred tool for inspecting Mach-O binaries.

```bash
otool --help # 除了 man otool 外，也可以使用 --help 输出简短的使用说明
otool -h machoinfo # print the mach header
otool -l machoinfo # print the load commands
```

## 程序读取 Mach-O

`main` 函数的 `argv` 参数是个数组，`argv[0]` 是本可执行文件的路径，`argv[1]` 是传入的第一个参数。

```c
extern void dump_segments(FILE *obj_file);

int main(int argc, char *argv[]) {
    const char *filename = argv[1];
    FILE *obj_file = fopen(filename, "rb");
    dump_segments(obj_file);
    fclose(obj_file);

    (void)argc; // suppressing the warning of unused function argument issued by some compilers
    return 0;
}
```

让 `main` 函数的入参为 `machoinfo` 可执行文件的路径：`$(BUILD_ROOT)/$(CONFIGURATION)/$(EXECUTABLE_NAME)`，然后用程序读取其 Mach-O 信息。

Mach-O 开头的 4 个字节 `uint32_t magic` 是个魔数，存储的信息代表了此 Mach-O 的一些基本格式。

例如，如果这是一个 64 位的 Mach-O，则文件的首字节开始，是 `struct mach_header_64`，占 32 个字节。

（以下源码在 macOS/Frameworks/Kernel 里可以找到）

```c title='Mach-O/loader.h'
struct mach_header_64 {
	uint32_t	magic;		/* mach magic number identifier */
	cpu_type_t	cputype;	/* cpu specifier */
	cpu_subtype_t	cpusubtype;	/* machine specifier */
	uint32_t	filetype;	/* type of file */
	uint32_t	ncmds;		/* number of load commands */
	uint32_t	sizeofcmds;	/* the size of all the load commands */
	uint32_t	flags;		/* flags */
	uint32_t	reserved;	/* reserved */
};
```

`struct mach_header_64` 之后，则是 `ncmds` 个 LC (load command)。

读取 LC 时，先读出每个 LC 的前面 `sizeof(struct load_command)` 个字节，

```c title='Mach-O/loader.h'
struct load_command {
	uint32_t cmd;		/* type of load command */
	uint32_t cmdsize;	/* total size of command in bytes */
};
```

`cmd` 的值就代表了这个 LC 的结构体类型。例如 `LC_MAIN` 的结构体：

```c title='Mach-O/loader.h'
struct entry_point_command {
    uint32_t  cmd;	/* LC_MAIN only used in MH_EXECUTE filetypes */
    uint32_t  cmdsize;	/* 24 */
    uint64_t  entryoff;	/* file (__TEXT) offset of main() */
    uint64_t  stacksize;/* if not zero, initial stack size */
};
```

`machoinfo` 这个二进制文件的 LC 信息输出：

```
LC: 0 segname: __PAGEZERO vmaddr: 0 nsects: 0 filesize: 0 vmsize: 4294967296
LC: 1 segname: __TEXT vmaddr: 100000000 nsects: 5 filesize: 32768 vmsize: 32768
LC: 2 segname: __DATA_CONST vmaddr: 100008000 nsects: 2 filesize: 16384 vmsize: 16384
LC: 3 segname: __DATA vmaddr: 10000c000 nsects: 2 filesize: 16384 vmsize: 16384
LC: 4 segname: __LINKEDIT vmaddr: 100010000 nsects: 0 filesize: 28160 vmsize: 32768
LC: 5 LC_DYLD_INFO_ONLY rebase_off: 65536 rebase_size: 16 bind_off: 65552 bind_size: 64 weak_bind_off: 0 weak_bind_size: 0 lazy_bind_off: 65616 lazy_bind_size: 1072 export_off: 66688 export_size: 64
LC: 6 LC_SYMTAB symoff: 66832 nsyms: 250 stroff: 71184 strsize: 3144
LC: 7 LC_DYSYMTAB indirectsymoff: 70832
LC: 8 LC_LOAD_DYLINKER dyld: /usr/lib/dyld
LC: 9 LC_UUID uuid 1E1BE742-5EAA-35E3-A717-80FAD898B4A0
LC: 10 LC_BUILD_VERSION platform: macos, sdk: 12.3, minos: 11.1, ntools: 1
LC: 11 LC_SOURCE_VERSION version: 0.0
LC: 12 LC_MAIN entryoff: 15420 stacksize: 0
LC: 13 LC_LOAD_DYLIB dylid: /System/Library/Frameworks/Foundation.framework/Versions/C/Foundation
LC: 14 LC_LOAD_DYLIB dylid: /usr/lib/libobjc.A.dylib
LC: 15 LC_LOAD_DYLIB dylid: /usr/lib/libSystem.B.dylib
LC: 16 LC_FUNCTION_STARTS cmdsize: 16 dataoff: 66752 datasize: 80
LC: 17 LC_DATA_IN_CODE cmdsize: 16 dataoff: 66832 datasize: 0
LC: 18 LC_CODE_SIGNATURE cmdsize: 16 dataoff: 74336 datasize: 19360
```

注意上面的输出，前面 LC0 - LC4 的结构体是 `struct segment_command_64`：

```c title='Mach-O/loader.h'
struct segment_command_64 { /* for 64-bit architectures */
	uint32_t	cmd;		/* LC_SEGMENT_64 */
	uint32_t	cmdsize;	/* includes sizeof section_64 structs */
	char		segname[16];	/* segment name */
	uint64_t	vmaddr;		/* memory address of this segment */
	uint64_t	vmsize;		/* memory size of this segment */
	uint64_t	fileoff;	/* file offset of this segment */
	uint64_t	filesize;	/* amount to map from the file */
	vm_prot_t	maxprot;	/* maximum VM protection */
	vm_prot_t	initprot;	/* initial VM protection */
	uint32_t	nsects;		/* number of sections in segment */
	uint32_t	flags;		/* flags */
};
```

在这个 Mach-O 二进制里，Load Commands 结束后，紧接着存放的信息就是 `__TEXT`、`__DATA_CONST`、`__DATA`、`__LINKEDIT`：

- `__PAGEZERO` 文件大小为 0，它占用 4294967296 的虚拟内存空间，刚好是 2 的 32 次方（32 位程序的指针寻址范围），这是为了隔绝 32 位程序
- `__TEXT` 段有 5 个 section（nsects: 5）
- `__DATA_CONST` 段有 2 个 section（nsects: 2）
- `__DATA` 段 有 2 个 section（nsects: 2）

LC6 代表符号表，LC7 代表间接符号表。

LC13 - LC15 即代表这个二进制文件用到的动态库，结构体是 `struct dylib_command`，在运行时 dyld 会加载这些动态库。

```c title='Mach-O/loader.h'
struct dylib_command {
	uint32_t cmd; /* LC_ID_DYLIB, LC_LOAD_{,WEAK_}DYLIB, LC_REEXPORT_DYLIB */
	uint32_t cmdsize; /* includes pathname string */
	struct dylib dylib; /* the library identification */
};
```
