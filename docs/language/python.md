# Python

## 常用代码

执行 shell：

```py
import os
os.system('ls -l')
```

获取用户目录：

```py
from os.path import expanduser
home = expanduser("~")
```

处理命令行参数：

```py
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--proxy', '-p', help='是否使用代理服务器', action="store_true")
parser.add_argument('--file', '-f', help='需要压缩的文件路径')
args = parser.parse_args()
```

递归遍历文件夹：

```py
for parent, dirnames, filenames in os.walk(themesDir):
    for filename in filenames:
        file_path = os.path.join(parent, filename)
        file_name, file_extension = os.path.splitext(filename)
        print('文件名：%s' % filename)
        if file_extension == '.yml':
            print('文件完整路径：%s' % file_path)
```

找到当前文件的目录，再向上路由：

`ROOT_PATH = os.path.abspath(os.path.join(__file__, "../../.."))`

## 配置环境

macOS 是内置 Python 的，macOS Catalina 10.15 弃用 Python2.7，内嵌了 Python3。

查看 python 版本：`python3 --version`

macOS 自带 Python 路径为: `/System/Library/Frameworks/Python.framework/Versions`

和 C 程序相比，Python 非常慢，因为 Python 是解释型语言，代码在执行时会一行一行地翻译成 CPU 能理解的机器码，这个翻译过程非常耗时，所以很慢。而 C 程序是运行前直接编译成 CPU 能执行的机器码，所以非常快。

在 Terminal 输入 `python3`，看到 `>>>` 就代表进入 Python 交互式环境了。输入 `exit()` 就可以退出交互式环境。官方版本的解释器：CPython（使用 C 语言开发的），在命令行下运行 python 就是启动 CPython 解释器。

在 Linux 上直接运行 python 代码，在`hello.py`文件第一行加上：

```bash
#!/usr/bin/env python3
```

给它加上执行权限：`chmod +x hello.py`，然后在 Terminal 中就可以直接输入：`./hello.py`运行了。

## pyenv

查看已安装的版本：`pyenv versions`

切换版本：`pyenv global 3.8.2`

## 终端交互

输入：`name = input()`，`input()`可以让你显示一个字符串来提示用户，比如：
`name = input('please enter your name: ')`

## 数据结构

有序集合：list, tuple

```py
classmates = ['Michael', 'Bob', 'Tracy'] # list
classmates[1] = 'Sarah'
classmates.append('Adam')
classmates.insert(1, 'Jack')
classmates.pop() # delete last item

classmates = ('Michael', 'Bob', 'Tracy') # tuple
classmates[0] # tuple 一旦初始化就不能修改，更安全
```

Python 语言用到的数据结构。There are three basic sequence types: **lists**, **tuples**, and **range** objects.

**Strings** are immutable sequences of Unicode code points.

The core built-in types for manipulating binary data are **bytes** and **bytearray**. They are supported by **memoryview** which uses the buffer protocol to access the memory of other binary objects without needing to make a copy.

A **set** object is an unordered collection of distinct hashable objects.

A mapping object maps hashable values to arbitrary objects. Mappings are mutable objects. There is currently only one standard mapping type, the **dictionary**.

Python 是一门变化中的语言，内部实现一直会有更新。可以在官网上找到 Python 数据结构性能的最新信息。

字典：`d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}`，在其他语言中也称为 map，使用键-值（key-value）存储，内部实现是哈希表；

集合：`s = set([1, 2, 3])`，set 的原理和 dictionary 一样，唯一区别仅在于没有存储对应的 value。

列表解析式：`alist = [x*x for x in range(1, 11) if x%2 == 0]`

## pass by value

```py
class TreeNode:
    def __init__(self, val=0):
        self.val = val

array = []

a = TreeNode(10)
print(a)

array.append(a)
print(array[0].val)

a = TreeNode(5)
print(a)

array.append(a)
print(array[1].val)

a.val = 20
print(array[0].val, array[1].val)
```

## 面向对象

定义类：

```py
# 用来表示分数的类
class Fraction:
    # 所有类都应该首先提供构造方法
    def __init__(self, num, den):
        self.num = num
        self.den = den

    # object to string
    def __str__(self):
        return str(self.num) + "/" + str(self.den)

f = Fraction(3, 5)
print(f)
```

## 高级特性

递归函数的优点是定义简单，逻辑清晰。理论上，所有的递归函数都可以写成循环的方式，但循环的逻辑不如递归清晰。使用递归函数需要注意防止栈溢出。在计算机中，函数调用是通过栈（stack）这种数据结构实现的，由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出。解决递归调用栈溢出的方法是通过尾调用优化。Python 解释器没有尾调用优化。

Slice：

```py
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
L[1:3] # ['Sarah', 'Tracy']
L[:10] # 前10个数
L[-10:] # 后10个数
L[10:20] # 11-20个数
L[:10:2] # 前10个数，每两个取一个
'ABCDEFG'[:3] # 'ABC'
```

循环：

```py
for i, value in enumerate(['A', 'B', 'C']):
    print(i, value)
```

List Comprehensions（列表生成式）：

```py
list(range(1, 11)) # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[x * x for x in range(1, 11)] # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[x * x for x in range(1, 11) if x % 2 == 0] # [4, 16, 36, 64, 100]

# 列出当前目录下的所有文件和目录名
[d for d in os.listdir('.')]

```

Generator:

```py
g = (x * x for x in range(10))
next(g) # 0
next(g) # 1
# generator保存的是算法，每次调用next(g)，就计算出 g 的下一个元素的值
for n in g:
    print(n)
```

Python 的 Iterator 表示的是一个数据流，Iterator 可以被 next() 函数调用并不断返回下一个数据，直到没有数据时抛出 StopIteration 错误。可以把这个数据流看做是一个有序序列，但我们却不能提前知道序列的长度，只能不断通过 next() 函数实现按需计算下一个数据，所以 Iterator 的计算是惰性的，只有在需要返回下一个数据时它才会计算。

生成器都是 Iterator 对象。集合数据类型如 list、dict、str 等是 Iterable 但不是 Iterator，不过可以通过 iter() 函数获得一个 Iterator 对象。

## 函数式编程

函数名其实就是指向函数的变量！

```py
abs(-10) // 10
f = abs
f(-10) // 10
```

A **higher-order function** is a function that takes another function as parameter and/or returns a function:

```py
def add(x, y, f):
    return f(x) + f(y)
```

`map()` 函数接收两个参数，一个是函数，一个是 Iterable，map 将传入的函数依次作用到序列的每个元素，并把结果作为新的 Iterator 返回。

```py
def f(x):
    return x * x
r = map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
list(r) # r是iterator，list() 函数把整个序列都计算出来并返回一个list。
# [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

`reduce()`把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，其效果就是：

```py
reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
```

## 生成列表的四种方法

```py
# 生成列表的四种方法，看性能怎么样
# 要得到每个函数的执行时间，需要用到 Python 的 timeit 模块。

from timeit import Timer

def test1():
    l = []
    for i in range(5000):
        # 列表与列表的连接
        l = l + [i]

def test2():
    l = []
    for i in range(5000):
        # 往列表里追加元素
        l.append(i)

def test3():
    # 列表解析式
    l = [i for i in range(5000)]

def test4():
    # 列表构造函数
    l = list(range(5000))

def test5():
    l = [0] * 5000

t1 = Timer("test1()", "from __main__ import test1")
print("concat ", t1.timeit(number=1000), "ms")

t2 = Timer("test2()", "from __main__ import test2")
print("append ", t2.timeit(number=1000), "ms")

t3 = Timer("test3()", "from __main__ import test3")
print("comprehension ", t3.timeit(number=1000), "ms")

t4 = Timer("test4()", "from __main__ import test4")
print("list range ", t4.timeit(number=1000), "ms")

t5 = Timer("test5()", "from __main__ import test5")
print("?", t5.timeit(number=1000), "ms")

# t1 > t2 > t3 > t4
# concat  24.082856827999997 ms
# append  0.3938799230000001 ms
# comprehension  0.19376184500000093 ms
# list range  0.09405486100000005 ms
# ? 0.011491839999997921 ms
```
