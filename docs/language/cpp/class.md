# Class

## 类

```cpp
struct Sales_data {
public:
    std::string isbn() const {
        return bookNo;
    }
    Sales_data &combine(const Sales_data&);
    double avg_price() const;
private:
    std::string bookNo;
    unsigned units_sold = 0;
    double revenue = 0;
};
```

成员函数的声明必须在类的内部，定义可以在类的内部或外部。

类内成员函数可以显式声明 `inline`，也可以不声明、放到类外部再声明为 `inline`。类内部没有声明 `inline`，但定义在类内部的函数，是隐式的内联函数。

```cpp
char get() const { return contents[cursor]; } // 隐式内联
inline char get(pos ht, pos wd) const;        // 显式内联
```

编译器处理类内部的名字，分两步处理：

1. 编译成员的声明。声明中使用的名字，包括返回类型、参数类型，都必须在使用前确保可见。
2. 直到类全部可见后，才编译函数体。因为成员函数体直到整个类可见后才会被处理，所以它能使用类中定义的任何名字。

### this 指针

`this` 指针总是指向“这个”对象，是一个常量指针。默认情况下，`this` 的类型是指向类类型非常量版本的常量指针，即 `Sales_data *const this`，但是，只有 pointer to const 才能绑定到常量对象上，意味着，不能把 `this` 绑定到一个常量对象上，也就意味着，我们不能在一个常量对象上（例如 `const Sales_data`）调用普通的成员函数。例如：`std::string isbn();`

所以，把 `this` 设置为指向常量的指针，有助于提高函数的灵活性，毕竟，这个函数体里只读不写。C++ 的做法是把 `const` 关键字放在成员函数的参数列表之后，表示 `this` 是一个指向常量的指针，这样的成员函数被称为常量成员函数。`std::string isbn() const;`

定义返回 `this` 对象的函数：

```cpp
Sales_data &Sales_data::combine(const Sales_data &rhs) {
    units_sold += rhs.units_sold;
    revenue += rhs.revenue;
    return *this; // 返回调用该函数的对象
}
```

类本身就是一个作用域，使用作用域操作符告诉编译器，这个函数是在 `Sales_data` 作用域内的，这样，编译器就知道 `revenue` 指的是 `Sales_data` 的成员变量了。

```cpp
double Sales_data::avg_price() const {
    if (units_sold)
        return revenue / units_sold;
    else
        return 0;
}
```

根据对象是否是 `const` 重载函数，函数调用会匹配相应的版本：

```cpp
inline Screen &display(std::ostream &os) {
    do_display(os);
    return *this;
}

inline const Screen &display(std::ostream &os) const {
    do_display(os);
    return *this;
}
```

### 构造函数

类通过特殊的成员函数来控制其对象的初始化过程，称为构造函数。

构造函数的名字与类名相同，没有返回类型。

如果我们没有显式定义任何构造函数，编译器就会隐式地为我们定义一个默认构造函数。

和其他函数一样，如果构造函数体在类的内部，则是隐式内联的；如果在类的外部，则默认不是内联的。

```cpp
struct Sales_data {
    Sales_data() = default; // C++11 默认构造函数
    Sales_data(const string &s) : bookNo(s) {} // 构造函数初始值列表，除了给数据成员赋值没有别的事情要做，因此函数体是空的
    // 没有出现在构造函数初始值列表的成员，将通过类内初始值（如果有）初始化，或者执行默认初始化
    Sales_data(const string &s, unsigned n, double p) : bookNo(s), units_sold(n), revenue(p * n) {}
    Sales_data(istream &);
};
```

在类的外部定义构造函数：

```cpp
Sales_data::Sales_data(std::istream &is) {
    read(is, *this);
}
```

构造函数还有另一种写法，但不鼓励，我们应该始终使用初始值列表！如果没有在初始值列表中初始化成员，则该成员在执行构造函数体之前执行默认初始化。下面的写法，实际上是先将数据成员执行默认初始化，再给它们赋值。这一区别到底会有什么深层次的影响，完全取决于数据成员的类型。

```cpp
Sales_data::Sales_data(const string &s, unsigned n, double p) {
    bookNo = s;
    units_sold = n;
    revenue = p * n;
}
```

创建类的对象：

```cpp
int main() {
    Person noPerson; // 使用 Person 的默认构造函数初始化的对象
    Person func(); // 注意：这是一个函数定义！不是一个默认构造函数初始化的对象！
    Person person("James", "NY");
    Person *ptr = &person;
    cout << noPerson.getName() << endl;
    cout << person.getName() << endl;
    cout << ptr->getName() << endl;
    return 0;
}
```

C++11 支持委托构造函数 (delegating constructor)：

```cpp
class Sales_data {
    Sales_data() : Sales_data("", 0, 0) {}
    Sales_data(string s) : Sales_data(s, 0, 0) {}
    Sales_data(istream &is) : Sales_data() {
        read(is, *this);
    }
};
```

如果构造函数只接受一个实参，则它实际上定义了转换为此类类型的隐式转换机制，有时把这种构造函数称为转换构造函数。

例如，`Person` 类有一个构造函数：`Person(istream &is);`，有一个函数 `friend ostream &print(ostream &os, const Person &person);`。

`print(cout, cin);` 这段代码隐式地把 `cin` 转换成 `Person`。这个转换执行了 `Person(istream &is)` 构造函数，创建了一个临时对象，然后传递给 `print` 函数。

我们可以通过在构造函数声明加上 `explicit` 关键字，阻止这样的隐式转换。

编译器不会将 `explicit` 的构造函数用于隐式转换，但是我们仍然可以用这样的构造函数进行显式强制转换：`print(cout, static_cast<Person>(cin));`

### 类的其它特性

向前声明：

```cpp
class Screen; // 向前声明
class Window_mgr {
    std::vector<Screen> screens;
};
```

mutable data member，即使在 const 对象内也能被修改：`mutable size_t access_ctr;`

聚合类，当一个类满足以下条件时，我们说它是聚合的：

- 所有成员都是 `public` 的
- 没有定义任何构造函数
- 没有类内初始值
- 没有基类，也没有 `virtual` 函数

例如这样的类，是一个聚合类：

```cpp
struct {
    int ival;
    string s;
}
```

数据成员都是字面值类型的聚合类是字面值常量类 (literal class)，这是 C++11 的新特性。不是聚合类，但符合以下要求的，也是 literal class：

- 数据成员都是 literal type
- 类至少有一个 constexpr 构造函数
- 内置类型数据成员的初始值（如果有的话）必须是 constexpr
- 类类型数据成员的初始值（如果有的话）必须使用 constexpr 构造函数
- 必须使用默认析构函数

### 友元

为非成员函数做 friend 声明，以让它访问类的私有成员。

`friend istream &read(istream &is, Person &person);`

友元类可以访问此类的所有成员。友元关系不存在传递性，`Window_mgr` 的友元不能访问 `Screen` 的私有成员。

```cpp
class Screen {
    friend class Window_mgr;
};
```

也可以只为别的类的某个函数提供访问权限：`friend void Window_mgr::clear(ScreenIndex);`

友元不是类的成员，不受类访问说明符的约束。

友元声明只能出现在类的内部。有的编译器还要求，在类内的友元声明之外，在类外部还需要再对函数专门进行一次声明。

友元声明只是指定了访问权限，并不是通常意义上的函数声明。

### 静态成员

静态数据成员一旦被定义，就存在于程序的整个生命周期中。

通常情况下，类的静态成员不应该在类内初始化。

```cpp
class Account {
public:
    void calculate() {
        // 成员函数不用通过作用域运算符就可以访问静态成员
        amount += amount * interestRate;
    }
    static double rate() {
        return interestRate;
    }
    static void rate(double);
private:
    std::string owner;
    double amount;
    static double interestRate;
    static double initRate();
};
```

在类的外部定义静态成员函数时，不能重复 `static` 关键字，`static` 关键字只出现在类内部的声明语句。

```cpp
void Account::rate(double newRate) {
    interestRate = newRate;
}
double Account::initRate() {
    return 5.25 / 100;
}
double Account::interestRate = initRate();
```

使用作用域运算符直接访问静态成员。虽然静态成员不属于类的某个对象，但是我们仍然可以使用类的对象、引用、指针来访问。

```cpp
int main() {
    double r;
    r = Account::rate();
    Account ac1;
    Account *ac2 = &ac1;
    r = ac1.rate();
    r = ac2->rate();
    return 0;
}
```

## 拷贝控制

类有五种特殊的成员函数。这些操作统称为拷贝控制 (copy control)。

copy constructor, move constructor 定义了当用同类型的另一个对象初始化本对象时做什么。`Foo(const Foo&);`

copy-assignment operator, move-assignment operator 定义了当用同类型的另一个对象赋值给本对象时做什么。`Foo& operator=(const Foo&);`

destructor 定义了类销毁时做什么。`~Foo()`

默认情况下编译器会为我们合成拷贝构造函数。合成拷贝构造函数，会从给定对象中依次将每个非 static 成员拷贝到正在创建的对象中。

如果一个类需要析构函数，几乎可以肯定它同时也需要一个拷贝构造函数和拷贝赋值运算符。

使用 `=default` 显式使用编译器默认合成的函数。

使用 `=delete` 来阻止拷贝。

### 对象移动

C++ 11 一个最主要的新特性是可以移动而非拷贝对象的能力。在很多情况下会发生对象的拷贝，其中某些情况下例如函数返回、函数传参，对象拷贝后就立即被销毁了，在这些情况下，移动而非拷贝对象会大幅度提升性能。另外，还有一些对象根本就不支持拷贝。

为了支持移动操作，新标准定义了一种新的引用类型——右值引用 (rvalue reference)，即必须绑定到右值的引用，且它只能绑定到一个将要销毁的对象。因此，我们可以将右值引用的资源“移动”到另一个对象中。

类似于“引用”，或者“左值引用”，右值引用也只不过是对象的另一个名字。不能将常规引用绑定到要求转换的表达式、字面常量、或返回右值的表达式，右值引用则完全相反，它可以绑定到这类表达式上，但不能绑定到左值上。

```cpp
int i = 42;
int &r = i; // ✅ r 引用 i

int &r2 = i * 42; // ❌ 左值引用不能绑定右值
int &&rr2 = i * 42; // ✅ 右值引用可以绑定到右值
const int &cr = i * 42; // ✅ reference to const 可以绑定到右值
```

观察上面的例子得知，右值要么是字面常量、要么是表达式求值过程中创建的临时对象。

标准库 `<utility>` 头文件下定义了 `move` 函数，调用它来获得绑定到左值上的右值引用：

```cpp
int &&rr1 = 42;
int &&rr2 = std::move(rr1);
```

对 `move` 不能使用 `using` 声明，而应该总是使用 `std::move`，避免潜在的命名冲突。

`std::move` 是一个 C++11 标准库中的函数模板，用于将一个对象的所有权转移到另一个对象。它实际上并不移动任何数据，而是将一个对象的指针或引用转移到另一个对象，从而避免了不必要的数据复制和内存分配。

下面是一个使用 `std::move` 的示例代码：

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2 = std::move(v1);

    std::cout << "v1 size: " << v1.size() << std::endl; // 输出 0
    std::cout << "v2 size: " << v2.size() << std::endl; // 输出 3

    return 0;
}
```

在这个例子中，我们创建了两个 `std::vector<int>` 对象 `v1` 和 `v2`，并将 `v1` 的所有权转移到 `v2` 中。使用 `std::move` 可以避免将 `v1` 中的数据复制到 `v2` 中，从而提高了代码的性能。

在这个例子中，`v1.size()` 输出 0 是因为在使用 `std::move` 将 `v1` 的所有权转移到 `v2` 后，`v1` 中的元素已经被移动到了 `v2` 中，`v1` 变成了一个空的 `std::vector<int>` 对象。

当你使用 `std::move` 将一个对象的所有权转移到另一个对象时，原始对象的状态会被移动到新的对象中，原始对象的状态会变为未定义。在这个例子中，`v1` 的状态变为了未定义，因此调用 `v1.size()` 将返回一个未定义的值。

因此，在使用 `std::move` 时，你应该确保不再使用原始对象，并且不要假设原始对象的状态仍然有效。

## 面向对象程序设计

OOP 的核心思想是：数据抽象、继承、动态绑定。

数据抽象我们在第七章介绍过了，即类的接口与实现分离。

继承是类与类之间的层次关系。根部有一个基类 (base class)，其它类直接或间接继承自基类，称为派生类 (derived class)。

C++ 中，基类希望其派生类进行覆盖的函数，声明为虚函数 (`virtual`)，该函数在调用时动态绑定；另一种是基类希望派生类直接继承而不要改变的函数，没有声明 `virtual` 的成员函数，其解析发生在编译时而不是运行时。

```cpp
// returns the total sales price for the specified number of items
// derived classes will override and apply different discount algorithms
virtual double net_price(std::size_t n) const { return n * price; }
```

可以将派生类对象当成基类对象来使用，也能将基类的指针或引用绑定到派生类对象上。基类的指针或引用的**静态类型**可能与其**动态类型**不一致。

```cpp
Qoute item;
Bulk_qoute bulk;
Qoute *p = &item;
p = &bulk; // 编译器隐式执行派生类向基类的转换
Qoute &r = bulk; // 同上
```

C++11 的 `override` 关键字可以告诉编译器我们希望覆盖基类的虚函数，让代码的意图更加清晰、同时能让编译器为我们发现错误。

使用作用域运算符，强行调用基类中定义的函数，而不管动态类型：`double undiscounted = baseP->Qoute::net_price(42)`

就像友元关系不能传递一样，友元关系不能继承。当一个类将另一个类声明为友元时，只对做出声明的类有效，对其基类、派生类无效。

派生类的作用域嵌套在其基类的作用域之内。

### 抽象基类

将函数声明为纯虚函数：`double net_price(std::size_t) const = 0`。一个纯虚函数无需定义。

含有纯虚函数的类是抽象基类。

### 访问控制

对于 `struct`，在第一个访问说明符之前的成员是 `public` 的；对于 `class`，则是 `private` 的。

别名一样存在访问限制，必须先定义后使用。

子类可以访问父类的 `public` 和 `protected` 成员，不能访问父类的 `private` 成员。

派生访问说明符的目的是，控制派生类的用户对于基类成员的访问权限：

```cpp
class Bulk_qoute: public Qoute {}
// public 表示派生类从基类那里继承而来的成员是否对派生类的用户可见
```

默认情况下，`class` 定义的派生类是私有继承的；`struct` 定义的派生类是公有继承的。

`class` 和 `struct` 仅有的区别就是默认成员访问说明符、默认派生访问说明符。

### 构造、拷贝、移动、赋值、析构

派生类的构造函数，构造函数初始化列表将实参传给基类的构造函数：

```cpp
Bulk_qoute(const std::string &book, double p, std::size_t qty, double disc) :
    Qoute(book, p), min_qty(qty), discount(disc) {}
```

当执行派生类的构造、拷贝、移动、赋值操作时，首先构造、拷贝、移动、赋值基类部分，然后才轮到派生类部分。

析构函数的执行则相反，首先销毁派生类，然后执行基类的析构函数。

基类都应该定义一个 `virtual` 的析构函数，即使它不执行任何操作。原因是当我们 `delete` 一个动态分配对象的指针时，将执行析构函数。但由于动态绑定的存在，可能出现指针的静态类型与被删除对象的动态类型不符的情况。例如我们 `delete` 一个 `Qoute*` 类型的指针，但实际它指向的是 `Bulk_qoute` 对象，编译器必须清楚它应该执行 `Bulk_qoute` 的析构函数。和其它函数一样，我们通过在基类中将析构函数定义成虚函数，以确保执行正确的版本：

```cpp
class Qoute {
public:
    virtual ~Qoute() = default; // 动态绑定析构函数
}
```

### 容器与继承

当我们使用容器存放继承体系中的对象时，会遇到一个难题，将容器声明为 `vector<Qoute>` 或 `vector<Bulk_qoute>` 都不合适。`vector<Qoute>` 在存放 `Bulk_qoute` 对象时，派生类的部分会被切掉；而 `vector<Bulk_qoute>` 无法存放 `Qoute` 对象，原因是基类无法隐式转换成派生类。

因此，当我们使用容器存放继承体系中的对象时，通常存放的是基类的指针（最佳选择是智能指针）`vector<shared_ptr<Qoute>>`。

```cpp
class Qoute {
public:
    // virtual function to return a dynamically allocated copy of itself
    virtual Quote* clone() const {
        return new Quote(*this);
    }
}

class Basket {
public:
    void add_item(const Qoute& sale) {
        items.insert(std::shared_ptr<Qoute>(sale.clone()));
    }
}
```

## 模板与范型编程

模板是 C++ 中范型编程的基础。一个模板是告诉编译器如何创建一个类或者函数的蓝图。

### 函数模板

常规版本的 `compare`：

```cpp
int compare(const double &v1, const double &v2) {
    if (v1 < v2) return -1;
    if (v1 > v2) return 1;
    return 0;
}
```

模板版本的 `compare`：关键字 `template`，模板参数列表 `<typename T, ...>` (template parameter list)。

```cpp
template <typename T>
int compare(const T &v1, const T &v2) {
    if (v1 < v2) return -1;
    if (v1 > v2) return 1;
    return 0;
}
```

当我们调用一个函数模板时，编译器通常用实参来推断模板参数的类型。然后为我们实例化 (instantiate) 一个特定版本的函数。

`T` 称为**类型参数** (type parameter)，可以用来指定返回类型、函数的参数类型、函数体内变量声明或类型转换。类型参数前必须使用关键字 `typename` 或 `class`，两者意义一样，可以互换使用。

```cpp
template <typename T> T foo(T* p) {
    T tmp = *p;
    // ...
    return tmp;
}
```

除了类型参数，还可以定义非类型参数 (nontype parameter)，它可以是整型、指向（对象或函数）的（指针或引用）。

```cpp
template <unsigned M, unsigned N>
int compare(const char &(p1)[M], const char &(p2)[N]) {
    return strcmp(p1, p2);
}
```

当我们调用 `compare("hi", "mom")` 时，编译器会实例化成函数 `int compare(const char (&p1)[3], const char &(p2)[4])`。

函数模板、类模板成员函数的定义通常放在头文件中。

### 类模板

```cpp
template <typename T> class Blob {
public:
    typedef T value_type;
    void push_back(const T &t);
}
```

### 特例化

#### 模板函数特例化

定义模板函数的特例化版本，实际上是接管了编译器的工作，为模板函数提供了一个特殊的实例。

关键字 template 后面接空尖括号，指出我们将为所有模板参数提供实参：

```cpp
template <>
int compare(const char* const &p1, const char* const &p2) {
    return strcmp(p1, p2);
}
```

#### 模板类特例化

除了特例化函数模板，还可以特例化类模板。默认情况下，无序容器使用 `hash<key_type>` 来组织其元素。为了使我们自定义的 `Sales_data` 也能保存在无序容器中，必须特例化 `hash` 类，它必须定义：

- 重载的调用运算符
- 两个类型成员 `result_type` 和 `argument_type`
- 默认构造函数、拷贝赋值运算符（可以隐式定义）

要注意的是，必须在 std::hash 类模板定义所在的命名空间中特例化它。

```cpp
// 打开 std 命名空间，以便特例化 std::hash
#include "Sales_data.h"
using std::hash;

namespace std {
    template <>
    struct hash<Sales_data> {
        typedef size_t result_type;
        typedef Sales_data argument_type;
        size_t operator()(const Sales_data &s) const;
    };

    size_t hash<Sales_data>::operator()(const Sales_data &s) const {
        return hash<string>()(s.bookNo) ^
               hash<unsigned>()(s.units_sold) ^
               hash<double>()(s.revenue);
    }
}
```

由于使用了 `Sales_data` 的私有成员，还需在 `Sales_data` 里声明此类为友元：

```cpp
template <class T> class std::hash;
class Sales_data {
    friend class std::hash<Sales_data>;
};
```

当我们使用无序容器存放 `Sales_data` 时，就会组合使用上面的 `Sales_data` 的特例化 hash 版本，以及 `Sales_data` 里定义的 `==` 运算符。

### 多重继承

C++ 的某些特性特别适合于处理超大规模问题，这些问题往往需要一个大团队工作数年才能解决。

多重继承即一个派生类从多个直接基类继承。派生类包含每个基类对应的基类部分。

如果一个类从多个基类直接继承，有可能这些基类本身又共享了另一个基类，在这种情况下，中间类可以选择虚继承，从而声明愿意与层次中的其他类共享虚基类。这样，派生类中只有一个共享虚基类的副本。

```cpp
class Raccoon: virtual public ZooAnimal {};
class Bear: virtual public ZooAnimal {};
class Panda: public Bear, public Raccoon, public Endangered {};
```
