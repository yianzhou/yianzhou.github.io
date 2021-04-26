---
title: "Javascript"
categories: [Development]
---

# 1. 介绍

[阮一峰 ECMAScript 5.1 版本 导论](https://wangdoc.com/javascript/basic/introduction.html)

JavaScript 因为互联网而生，紧跟着浏览器的出现而问世。1995 年 5 月，Brendan Eich 只用了 10 天，就设计完成了这种语言的第一版。由于来源多样，从一开始就注定，JavaScript 的编程风格是函数式编程和面向对象编程的一种混合体。12 月，Netscape 公司与 Sun 公司达成协议，后者允许将这种语言叫做 JavaScript。这样一来，Netscape 公司可以借助 Java 语言的声势，而 Sun 公司则将自己的影响力扩展到了浏览器。

2005 年，Ajax 方法（Asynchronous JavaScript and XML）正式诞生。

2006 年，jQuery 函数库诞生，jQuery 为操作网页 DOM 结构提供了非常强大易用的接口，成为了使用最广泛的函数库。

2009 年，Node.js 项目诞生，创始人为 Ryan Dahl，它标志着 JavaScript 可以用于服务器端编程。

2012 年，微软发布 TypeScript 语言。

2013 年 5 月，Facebook 发布 UI 框架库 React。2015 年 3 月，Facebook 公司发布了 React Native 项目，将 React 框架移植到了手机端，它会将 JavaScript 代码转为 iOS 平台的 Objective-C 代码，或者 Android 平台的 Java 代码。

2015 年 4 月，Angular 框架宣布，2.0 版将基于微软公司的 TypeScript 语言开发。

JavaScript 是一种轻量级的脚本语言。JavaScript 本身不提供任何与 I/O（输入/输出）相关的 API，都要靠宿主环境（host）提供，所以 JavaScript 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 API。

目前，已经嵌入 JavaScript 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 Node 项目。

JavaScript 的核心语法部分相当精简，只包括两个部分：基本的语法构造（比如操作符、控制结构、语句）和标准库（就是一系列具有各种功能的对象比如 Array、Date、Math 等）。除此之外，各种宿主环境提供额外的 API（只能在该环境使用的接口），以便 JavaScript 调用。

JavaScript 本身的语法特性并不是特别多。而且，那些语法中的复杂部分，也不是必需要学会。你完全可以只用简单命令，完成大部分的操作。

只要有浏览器，就能运行 JavaScript 程序；只要有文本编辑器，就能编写 JavaScript 程序。不用另行安装复杂的 IDE（集成开发环境）和编译器。进入 Chrome 浏览器的“控制台”，`Option + Command + J`，或者`Option + Command + I`（开发者工具），就可以在提示符后输入代码，然后按`Enter`键，代码就会执行。如果按`Shift + Enter`键，就是代码换行，不会触发执行。

# 2. 基础

语句、变量、标识符、注释、区块、条件语句、循环语句

语句（statement）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句。语句以分号结尾。

```js
var a = 1 + 3;
```

变量的声明和赋值，是分开的两个步骤，上面的代码将它们合在了一起，实际的步骤是下面这样：

```js
var a;
a = 1 + 3;
```

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。所有的变量的声明语句，都会被提升到代码的头部，这叫做变量提升（hoisting）。

JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型。

```js
var a = 1;
a = "hello";
```

JavaScript 提供两种相等运算符：`==` 和 `===`。如果两个值不是同一类型，严格相等运算符（===）直接返回 false，而相等运算符（==）会将它们转换成同一个类型，再用严格相等运算符进行比较。

强制转换主要指使用`Number()`、`String()` 和 `Boolean()` 三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。

# 3. 数据类型

JavaScript 的数据类型，共有六种。

- 数值（number）：整数和小数（比如 1 和 3.14）
- 字符串（string）
- 布尔值（boolean）
- undefined：表示“未定义”或不存在
- null：表示空值
- 对象（object）：各种值组成的集合。

对象又可以分成三个子类型：狭义的对象（object）、数组（array）、函数（function）。除非特别声明，本教程的“对象”都特指狭义的对象。JavaScript 把函数当成一种数据类型，可以赋值给变量，这为编程带来了很大的灵活性，也为 JavaScript 的“函数式编程”奠定了基础。

JavaScript 有三种方法，可以确定一个值到底是什么类型。

- `typeof` 运算符
- `instanceof` 运算符
- `Object.prototype.toString` 方法

```js
// v 是没有声明的变量
if (typeof v === "undefined") {
  // ...
}

var o = {};
var a = [];
o instanceof Object; // true
a instanceof Array; // true
```

## 数值

JavaScript 内部，所有数字都是以 64 位浮点数形式储存。NaN 是 JavaScript 的特殊值，表示“非数字”（Not a Number）。

parseInt 方法用于将字符串转为整数：`parseInt(' 81') // 81`

parseFloat 方法用于将一个字符串转为浮点数：`parseFloat('3.14')`

isNaN 方法可以用来判断一个值是否为 NaN：`isNaN('Hello') // true`

## 字符串

字符串放在单引号或双引号之中。单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号。由于 HTML 语言的属性值使用双引号，所以很多项目约定 JavaScript 语言的字符串只使用单引号，本教程遵守这个约定。

```js
'key = "value"';
"It's a long journey";

```

如果要在单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义。双引号字符串内部使用双引号，也是如此。

字符串可以被视为字符数组：

```js
var s = "hello";
s[0]; // "h"
```

字符串的长度：

```js
s.length; // 5
```

JavaScript 以 Unicode 储存字符，每个字符在 JavaScript 内部都是以 16 位（即 2 个字节）的 UTF-16 格式储存。对于码点在 U+10000 到 U+10FFFF 之间的字符，JavaScript 总是认为它们是两个字符（length 属性为 2）。也就是说，JavaScript 返回的字符串长度可能是不正确的。

```js
var s = "\u00A9";
s; // "©"
"𝌆".length; // 2
```

Base64 是一种编码方法，可以将任意值转成 0-9、A-Z、a-z、+ 和 / 这 64 个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。

JavaScript 原生提供两个 Base64 相关的方法：

```js
var string = "Hello World!";
btoa(string); // "SGVsbG8gV29ybGQh"
atob("SGVsbG8gV29ybGQh"); // "Hello World!"
```

注意，这两个方法不适合非 ASCII 码的字符，会报错。要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```js
btoa(encodeURIComponent("你好")); // "JUU0JUJEJUEwJUU1JUE1JUJE"
decodeURIComponent(atob("JUU0JUJEJUEwJUU1JUE1JUJE")); // "你好"
```

## 对象

对象（object）是 JavaScript 语言的核心概念，也是最重要的数据类型。对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

```js
var obj = {
  foo: "Hello",
  bar: "World",
};
```

对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。

```js
var obj = {
  p: function (x) {
    return 2 * x;
  },
};
obj.p(1); // 2
```

读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。如果使用方括号运算符，键名必须放在引号里面（数字键可以不加引号，因为会自动转成字符串），否则会被当作变量处理。

```js
var obj = {
  p: "Hello World",
};

obj.p; // "Hello World"
obj["p"]; // "Hello World"
```

查看一个对象本身的所有属性，可以使用 Object.keys 方法。`Object.keys(obj)`

`in`运算符用于检查对象是否包含某个属性：

```js
var obj = { p: 1 };
"p" in obj; // true
"toString" in obj; // true
```

for...in 循环用来遍历一个对象的全部属性。

```js
var obj = { a: 1, b: 2, c: 3 };

for (var i in obj) {
  console.log("键名：", i);
  console.log("键值：", obj[i]);
}
```

## 函数

JavaScript 有三种声明函数的方法。

```js
// function 命令
function print(s) {
  console.log(s);
}

// 函数表达式（变量赋值）
var print = function (s) {
  console.log(s);
};

// Function 构造函数（不推荐使用）
var add = new Function("x", "y", "return x + y");
```

作用域（scope）指的是变量存在的范围。在 ES5 的规范中，JavaScript 只有两种作用域：一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取；另一种是函数作用域，变量只在函数内部存在。函数本身也是一个值，它的作用域与变量一样。

函数参数不是必需的，JavaScript 允许省略参数。但是，没有办法只省略靠前的参数，而保留靠后的参数。如果一定要省略靠前的参数，只有显式传入 undefined。

```js
function f(a, b) {
  return a;
}

f(1); // 1
f(undefined, 1); // undefined
```

JavaScript 允许函数有不定数目的参数。

```js
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
};
f(1, 2, 3); // 1, 2, 3
```

闭包：函数外部无法读取函数内部声明的变量。可以把闭包简单理解成“定义在一个函数内部的函数”。如下所示，f2 可以读取 f1 的局部变量，只要把 f2 作为返回值，我们就可以在 f1 外部读取它的内部变量。

```js
function f1() {
  var n = 999;
  function f2() {
    console.log(n); // 999
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包最大的特点，就是它可以“记住”诞生的环境，比如 f2 记住了它诞生的环境 f1，所以从 f2 可以得到 f1 的内部变量。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

立即调用的函数表达式（IIFE）：通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```js
var f = (function f() {
  return 1;
})();

(function () {
  /* code */
})();

// 推荐写法
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
})();
```

## 数组

数组属于一种特殊的对象。`typeof` 运算符会返回数组的类型是 `object`。由于数组成员的键名是固定的（默认总是 0、1、2...），因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

清空数组的一个有效方法，就是将 length 属性设为 0。

```js
var arr = ["a", "b", "c"];
arr.length = 0;
arr; // []
```

将对象转化为数组：

```js
var arr = Array.prototype.slice.call(arrayLike);
```

# 4. 面向对象编程

JavaScript 原生提供 Object 对象，所有其他对象都继承自 Object 对象。

Object 对象的原生方法分成两类：静态方法与实例方法。

```js
Object.print = function (o) {
  console.log(o);
};
Object.prototype.print = function () {
  console.log(this);
};
```

典型的面向对象编程语言（比如 C++ 和 Java），都有“类”（class）这个概念。所谓“类”就是对象的模板，对象就是“类”的实例。但是，JavaScript 语言的对象体系，不是基于“类”的，而是基于构造函数(constructor) 和原型链 (prototype)。

构造函数就是一个普通的函数，为了与普通函数区别，构造函数名字的第一个字母通常大写。`new` 命令的作用，就是执行构造函数，返回一个实例对象。

```js
var Vehicle = function () {
  this.price = 1000;
};
var v = new Vehicle();
v.price; // 1000
```

如果忘了使用 `new` 命令，构造函数就变成了普通函数，并不会生成实例对象。`this` 这时代表全局对象，将造成一些意想不到的结果。如果对普通函数（内部没有 this 关键字的函数）使用 new 命令，则会返回一个空对象。

this 关键字是一个非常重要的语法点。不管是什么场合，this 都有一个共同点：它总是返回一个对象。简单说，this 就是属性或方法“当前”所在的对象。

- 全局环境使用 this，它指的就是顶层对象 window。
- 构造函数中的 this，指的是实例对象。
- 如果对象的方法里面包含 this，this 的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变 this 的指向。

使用注意点：

- 切勿在函数中包含多层的 this。
- 数组的 map 和 foreach 方法，允许提供一个函数作为参数，这个函数内部不应该使用 this。
- 回调函数中的 this 往往会改变指向，最好避免使用。（如点击按钮的回调`$('#button').on('click', o.f);`）

this 的动态切换，固然为 JavaScript 创造了巨大的灵活性，但也使得编程变得困难和模糊。有时，需要把 this 固定下来，避免出现意想不到的情况。JavaScript 提供了 `call`、`apply`、`bind` 这三个方法，来切换/固定 this 的指向。

JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。JavaScript 规定，每个函数都有一个 prototype 属性，指向一个对象。

```js
function f() {}
typeof f.prototype; // "object"
```

对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = "white";

var cat1 = new Animal("大毛");
var cat2 = new Animal("二毛");

cat1.color; // 'white'
cat2.color; // 'white'
```

总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。

JavaScript 规定，所有对象都有自己的原型对象（prototype）。因此，就会形成一个“原型链”（prototype chain）。所有对象的原型最终都可以上溯到 Object.prototype，即 Object 构造函数的 prototype 属性。Object.prototype 的原型是 null。原型链的尽头就是 null。

```js
function Animal(name) {
  this.name = name;
}
var cat = new Animal("miao");
Object.getPrototypeOf(cat) === Animal.prototype; // true
Object.getPrototypeOf(Animal.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype) === null; // true
```

# 异步操作

JavaScript 采用单线程模型。JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。

异步操作的几种模式

- 回调函数
- 事件监听
- 发布/订阅

`setTimeout()` 用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。

```js
var timerId = setTimeout(func | code, delay);
```

`setInterval` 指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

`setTimeout(f, 0)`不会真的在 0 毫秒之后运行，而是会在下一轮事件循环开始时执行，不同的浏览器有不同的实现。以 Edge 浏览器为例，会等到 4 毫秒之后运行。如果电脑正在使用电池供电，会等到 16 毫秒之后运行；如果网页不在当前 Tab 页，会推迟到 1000 毫秒（1 秒）之后运行。这样是为了节省系统资源。

`Promise` 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。Promise 实例有一个 `then` 方法，用来指定下一步的回调函数。

```js
function f1(resolve, reject) {
  // 异步代码...
}

var p1 = new Promise(f1);
p1.then(f2);
```
