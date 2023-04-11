# 计算机科学

问题解决的思维过程分为发现问题、分析问题、提出假设、验证假设四个阶段。

## 开发语言

所有的语言，最终都要转换为机器语言来执行。

语言越低级，越接近机器，执行效率越高；

语言越高级，越接近人类，高级的编程语言屏蔽了底层细节，提高了开发效率，相应地会牺牲一部分运行效率。

## Dart vs JavaScript

JavaScript 之父 Brendan Eich 曾在一次采访中说，JavaScript“几天就设计出来了”。JavaScript 实际上是两类编程语言风格的混合产物:（简化的）函数式编程风格，与（简化的）面向对象编程风格。

原本 JavaScript 只能在浏览器中运行，但 Node.js 的出现让它开始有能力运行在服务端；很快手机应用与桌面应用也成为了 JavaScript 的宿主容器，一些明星项目比如 React、React Native、Vue、Electron、NW (node-webkit) 等框架如雨后春笋般崛起。

2011 年，Google 发布 Dart 语言。正如 Objective-C -> Swift，Java -> Kotlin；Dart 的诞生正是要解决 JavaScript 存在的、在语言本质上无法改进的缺陷。

## Java

Java 代码编译执行（mixed 模式下）：

- Java 代码经过 javac 编译成 class 文件（字节码）
- class（字节码）文件经过 JVM 编译成机器码，解释执行
- HotSpot VM 采用了 JIT (just-in-time) 技术，将运行频率很高的字节码直接编译为机器指令执行以提高性能

## 字符集的发展

[一文说清文本编码那些事](https://zhuanlan.zhihu.com/p/113772793)

计算机中最基本的存储单位为字节（byte），由 8 个比特位（bit）组成，也叫做八位字节（octet）。8 个比特位可以表示 2^8 = 256 个字符。

比特本身没有意义，比特在上下文（context）中才构成信息。举个例子，对于内存中一个字节 01000001，你将它看做一个整数，它就是 65；将它作为一个英文字符，它就是字母 A；你看待比特的方式，就是所谓的上下文。

ASCII 定义了 0 - 127。

EASCII 定义了 128 - 255。

中国人开始使用计算机后，弃用 EASCII，规定 <=127 的字符仍然与原来相同，但两个 >=128 的字符连在一起时，就表示一个汉字。这个方案叫 GB2312。

后来又不够用了，规定只要一个字节 >=128，就固定表示这是一个汉字的开始，扩展之后的标准叫 GBK。

中文方案的这些标准统称为“DBCS“（Double Byte Character Set 双字节字符集）。两个字节可以表示一个汉字。

如果全世界各个地区都搞一套独立的编码，就会造成很大的交流障碍。于是 Unicode 出现了。Unicode 保持了 ASCII 编码不变，高位补 0。其余字符全部重新编码。

就带来一个问题，如果每个符号用三个或四个字节表示，那么每个英文字母前都必然有二到三个字节全部是 0，这对于存储空间来说是极大的浪费，文本文件的大小会因此大出二三倍，这是难以接受的。

UTF（UCS Transfer Format）是为传输而设计的编码，它是一种变长的编码方式。它可以使用 1-4 个字节表示一个符号，根据不同的符号而变化字节长度，当字符在 ASCII 码的范围时，就用一个字节表示。

Unicode 一个中文字符占 2 个字节，而 UTF-8 一个中文字符占 3 个字节。从 Unicode 到 UTF-8 并不是直接的对应，而是要通过一些算法来转换。

## 原码、反码、补码、移码

The four best-known methods of extending the binary numeral system to represent signed numbers are:

- sign–magnitude
- ones' complement
- two's complement
- offset binary

原码：最高位表示符号位，其他位存放该数的绝对值。

- `1010` 表示十进制 -2
- 十进制 0 可以表示为 `0000` 或 `1000`，即出现正 0 和负 0
- 不能直接相加，例如 `0001` 表示 1，`1001` 表示 -1，相加结果应该是 0；但 `0001 + 1001 = 1010`，表示 -2

反码：正数的原码与反码相同；负数的反码就是它的原码除符号位外按位取反；负数的反码就是它的绝对值的原码按位取反。

- 3 表示为 `0011`，-3 表示为 `1100`
- +0 表示为 `0000`，-0 表示为 `1111`
- 两个负数不能相加，例如 `1110` 表示 -1，`1100` 表示 -3，相加结果应该是 -4；但 `1110 + 1100 = 1010`，表示 -5

补码：正数的原码、反码、补码相同；负数的补码等于它的反码+1。

移码：将符号位取反的补码。

+5 用单字节原码表示：`0000 0101`

-5 用单字节表示，是 +5 的补码，即按位取反 `1111 1010` 后再 +1：`11111011`

当相加时，`0000 0101 + 1111 1011 = 1 0000 0000`，结果发生了溢出，计算机会直接抛弃最高位，所以结果为 0。

## 位运算

位与 `&`：按位进行比较，如果都是 1，则结果的这一位为 1；否则为 0。

位或 `|`：按位进行比较，只要有一个是 1，则结果的这一位为 1；否则为 0。

位非 `~`：按位取反。

异或 `^`：按位进行比较，如果相同则这一位为 0；否则为 1。

左移 `<<`：`x << 2` 代表将 x 的二进制数向左移动 2 位，低位补 0；就是一种乘法运算，x 左移 n 位，结果是 `x * 2 ^ n`。

右移 `>>`：`x >> 2` 代表将 x 的二进制数向右移动 2 位，若 x 为正，则高位补 0；若 n 为负，则高位补 1。

## 单片机

在一块芯片上集成了：CPU、振荡电路、ROM 和 RAM 存储器、定时/计数器和并行/串行 I/接口等，具有一定功能的计算机称为单片微型计算机，简称单片机。