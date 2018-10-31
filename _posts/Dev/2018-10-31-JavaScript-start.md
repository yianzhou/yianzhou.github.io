---
title:  "JavaScript 快速开始"
categories: [Development]
---

# 基础

您只能在 HTML 输出中使用 document.write。如果您在文档加载完成后使用该方法，会覆盖整个文档。

HTML 中的脚本必须位于 `<script>` 与 `</script>` 标签之间。
脚本可被放置在 HTML 页面的 `<body>` 和 `<head>` 部分中。

只需明白，浏览器会解释并执行位于 `<script>` 和 `</script>`之间的 JavaScript 代码。

那些老旧的实例可能会在 `<script>` 标签中使用 `type="text/javascript"`。现在已经不必这样做了。JavaScript 是所有现代浏览器以及 HTML5 中的默认脚本语言。

上面例子中的 JavaScript 语句，会在页面加载时执行。如果我们把 JavaScript 代码放入函数中，就可以在事件发生时调用该函数。

JavaScript 没有任何打印或者输出的函数。使用 `console.log()` 写入到浏览器的控制台。浏览器启用调试工具一般是按下 F12 键，并在调试菜单中选择 "Console" 。在调试窗口中，你可以设置 JavaScript 代码的断点。

HTML DOM 定义了访问和操作 HTML 文档的标准方法。 DOM 以树结构表达 HTML 文档。

JavaScript 是脚本语言。浏览器会在读取代码时，逐行地执行脚本代码。而对于传统编程来说，会在执行前对所有代码进行编译。

JavaScript 标准：随着时间的推移，我们开始看到，所有的现代浏览器已经完全支持 ECMAScript 5（ES5，2009 年发布）。

`<a href="javascript:void(0)"></a>` 仅仅表示一个死链接。`void()`仅仅是代表不返回任何值，但是括号内的表达式还是要运行。

The "use strict" directive was new in ECMAScript version 5. You can use strict mode in all your programs. It helps you to write cleaner code, like preventing you from using undeclared variables.

Strict mode is declared by adding "use strict"; to the beginning of a script or a function.

在 JavaScript 中，正则表达式通常用于两个字符串方法 : search() 和 replace()。

# Object

In JavaScript, almost "everything" is an object. Objects are mutable: They are addressed by **reference**, not by value.

There are different ways to create new objects:
* Define and create a single object, using an object literal.
* Define and create a single object, with the keyword new.
* Define an object constructor, and then create objects of the constructed type.

For simplicity, readability and execution speed, prefer the object literal method to the keyword new.

The way to create an "object type" (Blueprint, Class), is to use an **object constructor function**:
```
function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
}
```
Objects of the same type are created by calling the constructor function with the `new` keyword:
```
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");
```

All JavaScript objects inherit properties and methods from a prototype. The JavaScript prototype property allows you to add new properties and methods to object constructors.

# Function
## Declaration
Functions are declared with the following syntax:
```
function functionName(parameters) {
    // code to be executed
}
```
Declared functions are not executed immediately. They are "saved for later use".

## Function Expressions
A JavaScript function can also be defined using an expression:
```
var x = function (a, b) {return a * b};
var z = x(4, 3);
```
The function above is actually an anonymous function (a function without a name).

## Hoisting
**Hoisting** is JavaScript's default behavior of moving declarations to the top of the current scope. Hoisting applies to variable declarations and to function declarations. Because of this, JavaScript functions can be called before they are declared:
```
myFunction(5);               
function myFunction(y) {        
    return y * y;        
}
```

## Self-Invoking Functions
A self-invoking expression is invoked (started) automatically, without being called.
```
(function () {
    var x = "Hello!!";      // I will invoke myself
})();
```

## Invoking
[Invocation](https://www.w3schools.com/js/js_function_invocation.asp)
* Invoking a function as a global function, causes the value of this to be the global object.
* Invoking a function as an object method, causes the value of this to be the object itself.
* A constructor invocation creates a new object.

## Closure
Global variables can be made local (private) with closures.
```
var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
})();
add();
```
The variable add is assigned the return value of a self-invoking function.

The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.

This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.

This is called a JavaScript closure. It makes it possible for a function to have "private" variables.

The counter is protected by the scope of the anonymous function, and can only be changed using the add function.