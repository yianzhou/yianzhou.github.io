# JavaScript

## Introduction

JavaScript was initially created to “make web pages alive”.

Scripts are provided and executed as **plain text**. They don’t need special preparation or compilation to run.

When JavaScript was created, it initially had another name: “LiveScript”. But Java was very popular at that time, so it was decided that positioning a new language as a “younger brother” of Java would help. But as it evolved, JavaScript became a fully independent language with its own specification called **ECMAScript**, and now it has no relation to Java at all.

Today, JavaScript can execute not only in the browser, but also on the server, or actually on any device that has a special program called the **JavaScript engine**. Different engines have different “codenames”:

- V8 – in Chrome, Opera and Edge.
- SpiderMonkey – in Firefox.
- JavaScriptCore - in Safari.

JavaScript does not suit everyone’s needs. So recently a plethora of new languages appeared, which are **transpiled (converted) to JavaScript** before they run in the browser.

- _CoffeeScript_ is a “syntactic sugar” for JavaScript. (by Ruby)
- _TypeScript_ is concentrated on adding “strict data typing”. (by Microsoft)
- _Flow_ also adds data typing, but in a different way. (by Facebook)
- _Dart_ can be transpiled to JavaScript. (by Google)
- _Brython_ is a Python transpiler to JavaScript.
- _Kotlin_ can target the browser or Node.

[Manuals and specifications](https://javascript.info/manuals-specifications): MDN (Mozilla) JavaScript Reference 是主要的手册，当需要找某个函数信息时，可以搜索 “MDN [term]”。

关于控制台：Chrome 等大部分浏览器都是按 F12 唤出（Mac 是 fn + F12），直接 `Enter` 是执行，`Shift + Enter` 是换行。

在线调试学习：[Plunker](https://plnkr.co/edit/?p=preview&preview)

## Hello, world

The `<script>` tag contains JavaScript code which is automatically executed when the browser **processes the tag**.

We must choose either an external `<script src="…">` or a regular `<script>` with code. If `src` is set, the script content is ignored.

对于现代浏览器，`<script>` 就足够了，一些特别老的代码里，可能还能看到 `<script type="text/javascript">` 这种写法的，现在已经不用了。

JavaScript interprets the line break as an “implicit” semicolon. 每句 statement 都换行的情况下，你不写分号也行，但最好是写，这是社区规范。

For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn’t change. That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript’s creators got stuck in the language forever. This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications **are off by default**. You need to explicitly enable them with a special directive: `"use strict"`.

Please make sure that `"use strict"` is at the top of your scripts. Only comments may appear above `"use strict"`.

When you use a developer console, please note that it doesn’t `use strict` by default. 如果想要开启，先输入 `"use strict";` 再 `Shift + Enter` 换行。

Modern JavaScript supports “classes” and “modules” – advanced language structures, that enable `use strict` automatically. When your code is all in classes and modules, **you may omit it**.

三个交互函数：

```
alert("Hello"); // 通知用户，点击确认才能继续交互
let age = prompt('How old are you?', 100); // 弹出输入框让用户输入，第二个参数代表默认值，可选
let isBoss = confirm("Are you the boss?"); // 弹出交互框让用户确认，返回 true 或 false
```

`alert` automatically converts any value to a string to show it.

To output something to console from our code, there’s `console.log` function.

## Variables

To create a variable in JavaScript, use the `let` keyword. `let user = 'John';`

In older scripts, you may also find another keyword: `var`. There are subtle differences between `let` and `var`, but they do not matter for us yet.

Variable naming: `camelCase` is commonly used. Case matters.

To declare a constant (unchanging) variable, use `const`:

- 在运行前就知道值的常量，通常用大写 + 下划线的方式来命名：`const COLOR_RED = "#F00";`
- 在运行时才计算值的常量，则用驼峰命名：`const pageLoadTime = /* time taken by a webpage to load */;`

## Data types

A value in JavaScript is always of a **certain type**.

We can put any type in a variable. Programming languages that allow such things are called “**dynamically typed**”, meaning that there exist data types, but variables are not bound to any of them.

```js
let message = "hello";
message = 123456;
```

There are 8 basic data types in JavaScript.

- Seven primitive data types: number, bigint, string, boolean, null, undefined, symbol.
- One non-primitive data type: object.

> "Primitive" values contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store keyed collections of various data and more complex entities.

The `number` type: integer, floating point numbers, `Infinity`, `-Infinity` and `NaN`.

数学运算在 JavaScript 是安全的，就算除以 0 也不会使程序终止运行，最坏情况就是得到 `NaN`。

由于内部实现的原因，JavaScript 的 number 类型只能表示 [-2^53-1, 2^53-1] 范围内的数，对于一些加密、微秒级时间戳等场景可能不够，此时在整数后面加上 `n` 可以得到 `BigInt` 类型。

A `string` in JavaScript must be surrounded by quotes. Double and single quotes are practically no difference between them in JavaScript.

Backticks are “extended functionality” quotes:

```js
let name = "John";
// embed a variable
alert(`Hello, ${name}!`); // Hello, John!
// embed an expression
alert(`the result is ${1 + 2}`); // the result is 3
```

In JavaScript, `null` is not a “reference to a non-existing object” or a “null pointer” like in some other languages. It’s just a special value which represents “nothing”, “empty” or “value unknown”.

The meaning of `undefined` is “value is not assigned”. `undefined` is reserved as a default initial value for unassigned things.（不要主动用它）

`object` type is used to store collections of data and more complex entities. The `symbol` type is used to create unique identifiers for objects.

`typeof` 运算符返回其参数的类型：

```js
typeof "foo"; // "string"
typeof Symbol("id"); // "symbol"
typeof Math; // "object" Math is a built-in object.
typeof null; // "object" 由于历史原因，这个是错的，定义上 null 并不是对象。
typeof alert; // "function" function 也属于对象，这里也是由于历史原因
```

## Fundamentals

类型转换、运算符、条件、循环等，此章省略。

## Functions

Function declaration:

```js
function showMessage() {
  alert("Hello everyone!");
}
```

Variables declared **outside of any function** are called global. Global variables are visible from any function.

Default values:

```js
function showMessage(from, text = "no text given") {
  alert(from + ": " + text);
}

function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
}
```

There is another syntax for creating a function that is called a **Function Expression**:

```js
let sayHi = function () {
  alert("Hello");
};
```

Please note, **there’s no name** after the function keyword. Omitting a name is allowed for Function Expressions.

No matter how the function is created, **a function is a value**.

The arguments below are called callback functions or just **callbacks**:

```js
// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

ask(
  "Do you agree?",
  function () {
    alert("You agreed.");
  }, // anonymous function
  function () {
    alert("You canceled the execution.");
  } // anonymous function
);
```

函数调用可以发生在函数声明之前。因为运行时会有一个初始化阶段，找到所有的函数声明。

We should use a Function Expression **only when a Function Declaration is not fit for the task**.

函数表达式的语法糖：箭头函数。

```js
let sum = (a, b) => a + b;

// 如果只有一个参数，括号还可以省略
let double = (n) => n * 2;

// 参数为空时，括号不能省略
let sayHi = () => alert("Hello!");

// 多行箭头函数
let sum = (a, b) => {
  let result = a + b;
  return result;
};
```

## Objects

Objects store properties. A property is a “key: value” pair, where keys must be strings or symbols (usually strings), values can be of any type.

读取属性有两种语法：点语法和方括号。

```js
let user = new Object(); // "object constructor" syntax
let user = {
  name: "John",
  age: 30,
}; // "object literal" syntax
```

To remove a property, we can use the delete operator: `delete user.age;`

方括号还可以用在创建对象时，称为“计算属性”：

```js
let fruit = "apple";
let bag = {
  [fruit + "Computers"]: 5, // bag.appleComputers = 5
};
```

创建对象还有一种简洁写法：

```js
function makeUser(name, age) {
  return {
    name, // same as name: name
    age, // same as age: age
  };
}
```

当非字符串类型用作对象的 key 时，会被自动转为字符串类型：

```js
let obj = {
  0: "test", // same as "0": "test"
};
alert(obj[0]); // same as obj["0"]
```

Reading a non-existing property just returns `undefined`.

测试 key 是否在属性里：

```js
let user = { name: "John", age: 30 };
alert("age" in user); // true, user.age exists
```

遍历对象：`for (key in object) {...}`

Are objects ordered? - integer properties are sorted, others appear in creation order. (The “integer property” term here means a string that can be converted to-and-from an integer without a change.)

```js
let codes = {
  49: "Germany",
  41: "Switzerland",
  44: "Great Britain",
  // ..,
  1: "USA",
};
```

One of the fundamental differences of objects versus primitives is that objects are stored and copied “by reference”, whereas primitive values are always copied “as a whole value”.

```js
let a = {};
let b = a; // copy the reference
let c = {};
alert( a == b ); // true
alert( a === b ); // true
alert( a == c ); // false
```

Copying an object variable creates one more reference to the same object.

We can create a new object from the existing one, by iterating over its properties (for..in..) and copying them on the primitive level.

To make a “real copy” (a clone) we can use `Object.assign` for the so-called “shallow copy” (nested objects are copied by reference) or a “deep cloning” function, such as `_.cloneDeep(obj)` from the JavaScript library lodash.

```js
let user = {
  name: "John",
  age: 30,
};

let clone = Object.assign({}, user);
```

即使对象被声明为 `const`，它的属性依然可以被修改，因为不变的只是引用。

对象方法：

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  },
};

user.sayHi(); // John
```

In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

```js
function sayHi() {
  alert(this.name); // The value of this is evaluated during the run-time, depending on the context.
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)
```

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Arrow functions are special: they don’t have their “own” `this`. If we reference `this` from such a function, it’s taken from the outer “normal” function.

## Garbage collection

The main concept of memory management in JavaScript is **reachability**.

There’s a base set of inherently **reachable** values, that cannot be deleted for obvious reasons. These values are called **roots**.

Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

There’s a background process in the JavaScript engine that is called **garbage collector**. It monitors all objects and removes those that have become unreachable.

一个对象“被引用”和“可到达”是不一样的概念。可能存在一组相互引用的对象，但其整体却不可达。It is possible that the whole **island** of interlinked objects becomes unreachable and is removed from the memory.

The basic garbage collection algorithm is called “mark-and-sweep”.

- 从根节点出发，找到根节点直接引用的对象，标记它们；
- 从上一步标记的对象出发，找到其直接引用的对象，标记它们；
- ……如此重复，直到所有可到达的对象都被访问到。
- 所有没有被标记的对象将被清除。

That’s the concept of how garbage collection works. JavaScript engines apply many **optimizations** to make it run faster and not introduce any delays into the code execution.

- 分代回收：针对不同的代使用不同的 GC 算法；新生成的对象称为年轻代，大多数对象存活时间都比较短，可以用标记-擦除算法；经历多次 GC 仍然存活的对象，就晋升为老年代，老年代 GC 的频率会很低。
- 增量回收：允许 GC 分多个小批次执行，每次造成的停顿都很小，达到近似实时的效果。
- 闲时回收：仅在 CPU 空闲时进行垃圾回收。
