# 标准库

## IO 库

IO 对象是不能拷贝或赋值的，只能通过引用方式传递。

头文件 `iostream` 定义了读写流的类型，默认关联到用户的控制台窗口。

```cpp
#include <iostream>
using std::endl; using std::flush; using std::ends;
using std::unitbuf; using std::nounitbuf; using std::cout;
int main() {
    // writes hi and a newline, then flushes the buffer
    cout << "hi!" << endl;
    // writes hi, then flushes the buffer; adds no data
    cout << "hi!" << flush;
    // writes hi and a null, then flushes the buffer
    cout << "hi!" << ends;

    cout << unitbuf; // all writes will be flushed immediately
    // any output is flushed immediately, no buffering
    cout << "first" << " second" << endl;
    cout << nounitbuf; // returns to normal buffering

    return 0;
}
```

头文件 `fstream` 定义了读写命名文件的类型。

```cpp
void process(ifstream &is) {
    string s;
    while (is >> s)
        cout << s << endl;
}

int main(int argc, char *argv[]) {
    // for each file passed to the program
    for (char **p = argv + 1; p != argv + argc; ++p) {
        ifstream input(*p); // create input and open the file
        if (input) // if the file is ok, process this file
            process(input);
        else
            cerr << "couldn't open: " + string(*p);
    } // input goes out of scope and is destroyed on each iteration
    char **p = argv + 1, **end = argv + argc;
    ifstream input;
    while (p != end) { // for each file passed to the program
        input.open(*p); // open the file, automatically clears the stream
        if (input) // if the file is ok, read and ``process'' the input
            process(input);
        else
            cerr << "couldn't open: " + string(*p);
        input.close(); // close file when we're done with it
        ++p;           // increment pointer to get next file
    }
}
```

头文件 `sstream` 定义了读写内存 `string` 对象的类型。

```cpp
struct ErrCode {
    ErrCode(int i) : num(i) { }
    string msg() {
        ostringstream s;
        s << "ErrCode " << num;
        return s.str();
    }
    int num;
};
```

## 顺序容器

| 容器                 | 底层实现               | 描述                                          |
| -------------------- | ---------------------- | --------------------------------------------- |
| vector               | 数组，支持扩容、缩容   | 支持快速随机访问；尾部插入/删除快，其余位置慢 |
| string               | 数组，支持扩容、缩容   | 与 vector 相似，但专门用于保存字符            |
| deque                | 双数组，支持扩容、缩容 | 支持快速随机访问；头尾插入/删除快，其余位置慢 |
| list                 | 双向链表               | 插入/删除快，查找需遍历                       |
| forward_list (C++11) | 单向链表               | 插入/删除快，查找需遍历；不支持 size 操作     |
| array (C++11)        | 数组，固定大小         | 支持快速随机访问；不能插入/删除元素           |

数组的缺点：数组的元素是连续存储的，在中间位置添加或删除元素后，需要移动之后的所有元素；扩容时，分配新的内存空间，将旧元素都移动到新空间，然后添加新元素，释放旧内存空间。

`vector`:

- `capacity()` 告诉我们容器在不扩容的情况下，可以保存多少元素。
- `reserve(n)` 分配至少能容纳 n 个元素的内存空间。
- `shrink_to_fit()` 将 `capacity` 减少为同 `size` 的大小。这只是一个请求，标准库并不保证退还内存。

`size` 保证是一个快速的常量时间的操作。

通常，`vector` 是最好的选择，除非有很好的理由选择其它容器。

通常，不要选择内置数组，始终选择 C++ 标准库的容器。

## 顺序容器适配器

标准库定义了三个顺序容器适配器：`stack`, `queue`, `priority_queue`。

适配器是一种机制，`stack` 适配器接受一个顺序容器（除 `array`, `forward_list` 外），并使其操作起来像一个 `stack` 一样。

```cpp
template<class T, class Container = std::deque<T>> class stack;
// 操作：empty, top, push, pop

template<class T, class Container = std::deque<T>> class queue;
// 操作：empty, front, back, push, pop

template<class T, class Container = std::vector<T>, class Compare = std::less<typename Container::value_type>> class priority_queue;
// 操作：empty, top, push, pop
```

## 范型算法

顺序容器只定义了很少的操作。用户还需要很多其它的操作，例如查找、替换、删除特定值、排序等。标准库没有给每个容器定义成员函数来实现这些操作，而是定义了一组范型算法 (generic algorithm)，它们实现了一些经典算法的公共接口，可以用于不同类型的容器和元素。

标准库提供了超过 100 个算法，除了少数例外，前两个参数是迭代器，这些算法遍历由两个迭代器指定的范围。

对容器的每个元素应用函数：

```cpp
#include <algorithm>
using std::for_each;
using std::transform;

void print(int i) { cout << i << " "; }
unsigned absInt(int i) { return i < 0 ? -i : i; }

for_each(vi.begin(), vi.end(), print);
transform(vi.begin(), vi.end(), vi.begin(), absInt);
```

累加容器中的数值：`int sum = accumulate(vec.begin(), vec.end(), 0);`

拼接容器中的字符串：`string concat = accumulate(v.begin(), v.end(), string(""));`

`fill_n(back_inserter(vec), 10, 42);` Create 10 elements on the end of vec each with the value 42. 会调用 `push_back` 往容器末尾添加元素。

`copy(lst.begin(), lst.end(), front_inserter(lst2));` 拷贝算法是从一个位置向另一个位置拷贝数据，前两个参数是拷贝自链表的迭代器范围，第三个参数是拷贝到链表起始位置。

向文件拷贝数据：

```cpp
ofstream out_file("data/outFile2");   // writes int to named file
ostream_iterator<int> out_iter(out_file, " ");
copy(v.begin(), v.end(), out_iter);
out_file << endl;  // write a newline at end of the file
```

排序、去重、删除重复元素：

```cpp
void elimDups(vector<string> &words) {
    sort(words.begin(), words.end()); // 按字典序排序
    vector<string>::const_iterator end_unique = unique(words.begin(), words.end()); // 去重，返回不重复元素的后一个迭代器
    words.erase(end_unique, words.end()); // 删除多余元素；算法不能执行容器的操作，删除成员需用 vector 的成员函数 erase 来完成
}

void biggies(vector<string> &words,
             vector<string>::size_type sz,
             ostream &os = cout,
             char c = ' ') {
    elimDups(words);
    stable_sort(words.begin(), words.end(), isShorter); // 传递函数参数，按字符长度排序
}

vector<string> words{"the", "quick", "red", "fox", "jumps", "over", "the", "slow", "red", "turtle"};
biggies(words, 4);
```

## lambda 表达式 (C++11)

我们可以向一个算法传递任何类别的可调用对象 (callable object)。函数、函数指针、重载了函数调用运算符的类、lambda 表达式都是可调用对象。

lambda 表达式表示一个可调用的代码单元，可以将其理解为未命名的内联函数。

lambda 表达式的形式：`[capture list] (parameter list) -> return type { function body }`

capture list（捕获列表）是一个 lambda 所在函数中定义的局部变量的列表。

```cpp
void fcn1() {
    size_t v1 = 42;
    // 编译器生成了一个与 lambda 对应的新的（未命名）类，并定义了该类的一个对象 f
    // 捕获变量 v1，并初始化 lambda 生成的类的数据成员
    // 值捕获的前提是变量可以拷贝
    // copies v1 into the callable object named f
    auto f = [v1] { return v1; };
    v1 = 0; // 不会影响 lambda 内的值
    // 被捕获的值是在 lambda 创建时拷贝，而不是调用时拷贝，随后对 v1 进行修改不会影响 lambda 内的值
    size_t j = f(); // j is 42; f stored a copy of v1 when we created it
    cout << j << endl;
}
```

类似于函数调用时的参数传递，变量的捕获方式可以是值或者引用。当以引用方式捕获变量时，必须保证在 lambda 执行时变量是存在的！

```cpp
void fcn2() {
    size_t v1 = 42; // local variable
    // the object f2 contains a reference to v1
    auto f2 = [&v1] { return v1; };
    v1 = 0;
    auto j = f2(); // j is 0; f2 refers to v1; it doesn't store it
    cout << j << endl;
}
```

对于值捕获的变量，如果我们想要改变其值，就要加上关键字 `mutable`。对于引用捕获的变量，是否能修改取决于引用的是否是 const 类型。

```cpp
void fcn3() {
    size_t v1 = 42; // local variable
    // f can change the value of the variables it captures
    auto f = [v1]() mutable { return ++v1; };
    v1 = 0;
    auto j = f(); // j is 43
    cout << j << endl;
}
```

隐式捕获，交由编译器自动推断：

```cpp
// = 表示默认以值捕获变量
// & 表示默认以引用捕获变量
auto f = [=](const string &a) {
    return a.size() >= sz; // 隐式值捕获 sz
};
```

### Generalized capture (C++ 14)

In C++14, you can introduce and initialize new variables in the capture clause, without the need to have those variables exist in the lambda function's enclosing scope. The initialization can be expressed as any arbitrary expression; the type of the new variable is deduced from the type produced by the expression. This feature lets you capture move-only variables (such as `std::unique_ptr`) from the surrounding scope and use them in a lambda.

```cpp title='flutter/shell/common/shell.cc'
auto result = [platform_runner = task_runners_.GetPlatformTaskRunner(),
                result_callback](Engine::RunStatus run_result) {
    if (!result_callback) {
        return;
    }
    platform_runner->PostTask(
        [result_callback, run_result]() { result_callback(run_result); });
};
```

## 关联容器

关联容器 (associative-container) 有 map 和 set 两种。map 中的元素是关键字-值对 (key-value pair)；set 中的元素只包含一个关键字。

标准库提供 8 个关联容器。

对于有序容器 `map`, `set`, `multimap`, `multiset`，关键字类型必须定义元素比较的方法。默认情况下，标准库使用 key 的 `<` 比较运算符来比较两个 key。当我们向关联容器添加元素时，标准库使用这个比较运算符来为这些元素排序，以保持它们有序。`multiset` 和 `multimap` 允许有重复的关键字。这四种容器用红黑树实现。

对于无序容器（C++11）`unordered_map`, `unordered_set`, `unordered_multimap`, `unordered_multiset`，不是使用比较运算符来组织元素，而是使用一个哈希函数和 key 的 `==` 运算符。

忽略掉某些单词，并统计每个单词出现的次数：

```cpp
void test() {
    map<string, size_t> word_count;
    string word;
    while (cin >> word) {
        ++word_count[word]; // 如果 word 未在 map 中，下标运算符会创建一个新元素
        // 如果只是想知道一个 key 是否在 map 中，而不想改变 map 的话，就不要使用下标运算符，而是使用 find 函数
        if (word_count.find(word) == word_count.end()) {}
    }
    // 从 map 中提取一个元素，会得到 pair 类型的对象
    for (const pair<string, size_t> &w : word_count) {
        cout << w.first << " -> " << w.second << endl;
    }
}
```

使用顺序容器初始化无序容器：

```cpp
int main() {
    vector<int> ivec;
    for (vector<int>::size_type i = 0; i < 10; ++i) {
        ivec.push_back(i);
        ivec.push_back(i);
    }
    set<int> iset(ivec.cbegin(), ivec.cend());
    cout << iset.size() << endl; // 10
    multiset<int> miset(ivec.cbegin(), ivec.cend());
    cout << miset.size() << endl; // 20
    return 0;
}
```

`Sales_data` 类没有 `<` 运算符，在定义 `Sales_data` 的 `set` 时，必须提供 key 类型和比较操作类型（函数指针）。当创建容器对象时，以构造函数参数的形式提供比较操作。

```cpp
bool compareIsbn(const Sales_data &lhs, const Sales_data &rhs) {
    return lhs.bookNo < rhs.bookNo;
}
multiset<Sales_data, decltype(compareIsbn)*> bookstore(compareIsbn);
```

当使用无序容器存储键值对时，会先申请一整块连续的存储空间（标准库通常会选用 `vector` 容器），存储链表的头指针，各键值对真正的存储位置是链表的各个节点。

无序容器在存储上组织为一组桶，每个桶保存零个或多个元素。为了访问一个元素，首先计算元素的哈希值，并映射到一个桶。

无序容器提供了一组管理桶的函数，这些成员函数允许我们查询容器的状态、必要时对容器进行重组。

![img](/assets/images/C7D650BF-19C6-43B9-800D-D6FDB904A290.jpg)

我们通常不对关联容器使用范型算法。

## 容器操作

| 容器          | 访问                    | 插入                   | 删除                        | 查找        |
| ------------- | ----------------------- | ---------------------- | --------------------------- | ----------- |
| vector        | front, back, operator[] | push_back, insert(ite) | pop_back, erase(ite), clear | 迭代器      |
| queue         | front,back              | push                   | pop                         | 无迭代器    |
| stack         | top                     | push                   | pop                         | 无迭代器    |
| unordered_map | operator[]              | insert                 | erase, clear                | find, count |
| unordered_set |                         | insert                 | erase, clear                | find, count |
