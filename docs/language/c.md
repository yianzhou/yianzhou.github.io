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

## 结构体

```cpp
// C 风格的定义
struct Student {
    char name[50];
    int age;
    float score;
};

// C++ 风格的定义 (使用 std::string)
#include <string>
struct Student {
    std::string name;
    int age;
    float score;
};
```

顺序聚合初始化，最经典、最基础的初始化方法。在定义变量时，使用花括号 {} 提供一个初始值列表。值的顺序必须与结构体成员声明的顺序完全一致。

优点：简单直观，兼容所有 C/C++ 版本；缺点：可读性稍差，不清楚每个值对应哪个成员。

```c
// 完整初始化
struct Student s1 = {"John Doe", 20, 85.5f};

// 部分初始化
// 未被初始化的成员会被自动初始化为零
// (数值类型为 0, 指针为 NULL)
struct Student s2 = {"Jane Doe", 21};
// s2.name = "Jane Doe", s2.age = 21, s2.score = 0.0f

// 全部零初始化 (常用技巧)
// 将第一个成员初始化为0，其余成员会自动零初始化
struct Student s3 = {0};
// s3.name 的所有字节都为0, s3.age = 0, s3.score = 0.0f
```

列表初始化（C++11 及以上）：

```cpp
Student s2 {"Bob", 25, 88.0f};
Student s3 {}; // 所有成员进行零初始化或默认初始化
```

对于不仅仅是数据集合、可能包含逻辑或不变量的结构体，最佳实践是为其定义构造函数。

```cpp
#include <string>
#include <utility> // for std::move

struct Student {
    std::string name;
    int age;
    float score;

    // 默认构造函数
    Student() : age(0), score(0.0f) {
        // name 会被默认构造为空字符串
    }

    // 带参数的构造函数 (使用成员初始化列表)
    Student(std::string n, int a, float s)
        : name(std::move(n)), age(a), score(s) {}
};

// 使用构造函数进行初始化
Student s5; // 调用默认构造函数
Student s6("Diana", 28, 98.0f); // 调用带参数的构造函数
```

直接初始化 (Direct Initialization) **通常**对应于栈分配 (Stack Allocation)，也可以分配在全局/静态区（全局变量、static 变量）。

动态分配初始化 (Dynamic Allocation) 对应于堆分配 (Heap Allocation)。

这是一个非常核心且重要的问题，它关系到 C/C++ 编程中内存管理的根本。简单来说，这个问题的核心是：我应该把数据放在栈还是堆？

当你在函数内部像声明一个普通变量（如 `int`）一样声明一个结构体时，它会被分配在栈上，随函数调用自动创建和销毁。**这是默认和首选的方式**。遵循一个简单的原则：除非你有充分的理由不这样做，否则总是使用栈分配。

栈空间是有限的（通常为几 MB）。如果你试图在栈上分配一个非常大的结构体或数组，可能会导致栈溢出 (Stack Overflow)。

当结构体较大，或数量在运行时才确定（如链表、树、动态数组等），或需要跨函数、跨模块传递和管理结构体数据，你会使用堆。对象的生命周期不与其创建时的作用域绑定。你可以从一个函数中创建对象，返回其指针，并在程序的其他地方继续使用它。

```c
struct Point* create_point(int x, int y) {
    struct Point* p = (struct Point*)malloc(sizeof(struct Point));
    p->x = x; p->y = y;
    return p;
}
// 外部调用者需要在用完后 free(p);
```

```cpp
// 使用智能指针（现代 C++ 最佳实践）
// 1. 使用 std::make_unique 在堆上创建并初始化对象
auto p_ptr = std::make_unique<Point>(Point{100, 200});
// 2. 通过智能指针访问
std::cout << "Smart p: (" << p_ptr->x << ", " << p_ptr->y << ")\n";
```
