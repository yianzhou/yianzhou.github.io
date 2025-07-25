# 计算机科学

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
