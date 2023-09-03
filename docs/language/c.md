---
slug: /
---

# C

## 指针

In C, function arguments are passed by values.

```c
#include <stdio.h>

void test(int y) {
    y = 20;
    printf("y = %d\n", y); // y = 20
}

int main(int argc, const char * argv[]) {
    int x = 10;
    test(x);
    printf("x = %d\n", x); // x = 10
    return 0;
}
```

`int a = 10;` a 是 `int` 类型的变量，这个变量存储的值是整数 10，打印 a 的值 `printf("%d", a);`

`int *b = &a;` b 是 `int*` 类型的变量，即指向 int 类型的指针，这个变量存储的值是 a 的地址，打印 a 的地址 `printf("%p", b);`

```c
#include <stdio.h>

void test(int *y) {
    printf("y points to, or, what y stores is = %p\n", y); // 0x7ffeefbff4cc
    printf("address of y itself is = %p\n", &y); // 0x7ffeefbff4a8
    *y = 20; // 将数据写入 y 指针指向的内存区域！
    printf("*y = %d\n", *y); // *y = 20
}

int main(int argc, const char * argv[]) {
    int x = 10;
    printf("address of x = %p\n", &x); // 0x7ffeefbff4cc
    test(&x);
    printf("x = %d\n", x); // x = 20
    return 0;
}
```

函数参数依然是 passed by value，但不同的是，这次是将 x 的地址传入函数调用，函数内部创建了它的局部变量 y，并使用 x 的地址初始化了 y！

现在，我们创建一个指针并指向一块堆区内存：

```c
int main(int argc, const char * argv[]) {
    int *px = malloc(sizeof(int));
    printf("px points to %p\n", px); // 0x100587c90
    return 0;
}
```

那么，`void test(int *y)` 函数只能修改 px 指向的内存空间（`*px`）的数据，如何改变 px 的指向呢？把指针的地址传进去就可以了。

```c
#include <stdio.h>
#include <stdlib.h>

void test(int **py) {
    *py = malloc(sizeof(int));
    printf("*py points to %p\n", *py); //  0x1005b4770
}

int main(int argc, const char * argv[]) {
    int *px = malloc(sizeof(int));
    printf("px points to %p\n", px); // 0x1005b61c0
    test(&px);
    printf("px points to %p\n", px); // 0x1005b4770
    return 0;
}
```

## `__attribute__`

The `__attribute__` directive is used to decorate a code declaration in C, C++ and Objective-C. This gives the declared code additional attributes that would help the compiler incorporate optimizations or elicit useful warnings to the consumer of that code.

`__attribute__` 的用法非常简单，当我们定义一个函数、变量或者类型时，直接在名字旁边添加属性即可。注意后面是两对小括号，括号里表示要声明的属性。

[Function Attributes (Using the GNU Compiler Collection (GCC))](https://gcc.gnu.org/onlinedocs/gcc/Function-Attributes.html)

- 当函数被设定为 `constructor` 属性时，函数会在 `main` 函数执行之前被执行。
- 当函数被设定为 `destructor` 属性时，函数会在 `main` 函数执行之后被执行。

```cpp
#include <iostream>

__attribute__((constructor)) void before() {
    printf("constructor\n");
}

__attribute__((destructor)) void after() {
    printf("destructor\n");
}

int main(int argc, const char * argv[]) {
    std::cout << "Hello, world!\n";
    return 0;
}
```

## include, import

In C++, `#include <filename>` and `#include "filename"` includes source file, identified by filename into the current source file at the line immediately after the directive. In the case the file is not found, program is ill-formed.

(1) `#include <filename>` Typical implementations search only **standard include directories**. The standard C++ library and the standard C library are implicitly included in these standard include directories. The standard include directories usually can be controlled by the user through compiler options.

(2) `#include "filename"` Typical implementations first search the directory **where the current file resides** and, only if the file is not found, search the standard include directories as with (1).

The `#import` directive was added to Objective-C as an improved version of `#include`.

`#import` ensures that a file is only ever **included once**.

What the compiler does when it sees a `#include` is that it replaces that line with the contents of the included files. The `#import` line is only replaced by the contents of the named file for the first time it is encountered. Every time after that it is just ignored.

用 `#include` 的话，编译器会无条件地在实现文件中拷贝头文件里的所有内容，如果重复 include 的话相同的内容会重复出现，此时要靠 include guards 来避免重复定义导致的编译错误。而 `#import` 内部保证了同一个文件不会被导入两次。

Basically, it's up to you to decide which you want to use. I tend to `#import` headers for Objective-C things and `#include` standard C stuff. For example:

```c
#import <Foundation/Foundation.h>

#include <asl.h>
#include <mach/mach.h>
```

`#import` is an Objective-C addition to the preprocessor. GCC just supports it in C and C++ source files as well, although they officially suggest not using it in C or C++ in favor of portable, traditional header guards.

`import<header.h>` vs `import "header.h"`: Objective-C has this in common with C/C++; the quoted form is for "local" includes of files (you need to specify the **relative path** from the current file.

```cpp
#include "tnn/core/macro.h"
#include "tnn/core/tnn.h"
#include "tnn/utils/blob_converter.h"
```

While the angle-bracket form is for "global" includes -- those found somewhere on the **include path passed to the compiler** (e.g. `#include <math.h>`).
