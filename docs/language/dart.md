# Dart

> [Dart overview | Dart](https://dart.dev/overview)

Dart forms the foundation of Flutter. Dart provides the language and runtimes that power Flutter apps.

The Dart language is type safe.

> Type safety means that the compiler will validate types while compiling, and throw an error if you try to assign the wrong type to a variable.

Dart is strongly typed.

> [Strong and weak typing - Wikipedia](https://en.wikipedia.org/wiki/Strong_and_weak_typing). There is no precise technical definition. Dynamically typed languages (where type checking happens at run time) can also be strongly typed.

Dart offers _sound_ null safety.

For apps targeting mobile and desktop devices, Dart includes both a Dart VM with just-in-time (JIT) compilation and an ahead-of-time (AOT) compiler for producing machine code (native ARM or x64 machine code).

For apps targeting the web, Dart includes compilers translate Dart into JavaScript.

在浏览器试用 Dart：<https://dart.dev/tools/dartpad>

## Runtime

> [Dart overview | Dart](https://dart.dev/overview)

![img](/img/9B3D318C-B811-4D54-A328-595707BCE579.png)

Dart runtime is responsible for the following critical tasks:

- Managing memory: Dart uses a managed memory model, where unused memory is reclaimed by a generational garbage collector.
- Enforcing the Dart type system: Although most type checks in Dart are static (compile-time), some type checks are dynamic (runtime).
- Managing isolates: The Dart runtime controls the main isolate (where code normally runs) and any other isolates that the app creates.

## Garbage Collector

> [Flutter: Don’t Fear the Garbage Collector | by Matt Sullivan | Flutter | Medium](https://medium.com/flutter/flutter-dont-fear-the-garbage-collector-d69b3ff1ca30)

Garbage collecting happens when the engine detects that the app is idle and there’s no user interaction. The garbage collector can also run sliding compaction during those idle intervals, which minimizes memory overhead by reducing memory fragmentation.

Dart’s garbage collector is **generational** and consists of two phases: the young space scavenger and parallel mark sweep collectors.

Young Space Scavenger: 分配给新对象的内存空间由两半组成，一个处于活跃状态，另一个处于非活跃状态。新对象被分配到活跃的一半，一旦这一半被填满，活跃的对象就会从活跃的一半复制到非活跃的一半，死对象就会被忽略。然后不活跃的一半变为活跃的并且重复该过程。此阶段旨在清理生命周期较短的临时对象，例如 stateless widget。虽然它是阻塞的，但它比第二代标记/清除快得多，并且当与调度相结合时，几乎消除了应用程序运行时的可感知的暂停。

![img](/img/854CBD9D-2B5D-47FC-9D39-C3360BAC4EFF.png)

Parallel mark sweep: When objects achieve a certain lifespan, they are promoted to a new memory space, managed by the second generation collector: mark-sweep. This garbage collection technique has two phases: the object graph is first traversed and objects that are still in use are marked. During the second phase the entire memory is scanned, and any objects not marked are recycled. All flags are then cleared. This form of garbage collection blocks on the marking phase; no memory mutation can occur and the UI thread is blocked.

Wrapping Up: Dart employs a powerful generational garbage collector to minimize the effects for blocking garbage collection in Flutter apps. 由于 Flutter Widget 的实现方式，大多数对象会在年轻时死去，被第一代垃圾收集器收集，因此对性能影响非常小。

## Language Tour

```dart
void printInteger(int aNumber) { // 驼峰
  // String interpolation: $variableName or ${expression}
  print('The number is $aNumber.');
}

void main() {
  var number = 42; // 大部分变量可以自动推断类型（在编译时）
  printInteger(number);
}
```

Everything is an object, and every object is an instance of a class. Even numbers, functions are objects. All objects inherit from the Object class.

If an identifier starts with an underscore (`_`), it’s private to its library.

### Variables

Lazily initializing a variable: `late String temperature = _readThermometer();`

A `final` variable can be set only once.

A `const` **variable** is a compile-time constant, `const` variables are implicitly `final`. (Note the diff between const variable and const value).

### Build-in Types

Both `int` and `double` are subtypes of `num`. If a number includes a decimal, it is a `double`, otherwise it's `int`.

Here’s how you turn a string into a number, or vice versa:

```dart
// String -> int
var one = int.parse('1');
// String -> double
var onePointOne = double.parse('1.1');
// int -> String
String oneAsString = 1.toString();
// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
```

You can create a “raw” string by prefixing it with `r`:

```dart
var s = r'In a raw string, not even \n gets special treatment.';
```

Dart list: `var listOfInts = [1, 2, 3];`

Dart 2.3 introduced the **spread operator** (...) and the **null-aware spread operator** (...?), which provide a concise way to insert multiple values into a collection.

Dart set: `var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};`

Dart map: Both keys and values can be any type of object.

```dart
var nobleGases = Map<int, String>();
nobleGases[2] = 'helium';
```

Because a Dart string is a sequence of UTF-16 code units, expressing Unicode code points within a string requires special syntax: `\u2665` or `\u{1f606}`.

### Functions

箭头函数：

```dart
String get name => 'D'; // getter
set name(String _name) => name = _name; // setter
```

命名参数：

```dart
void enableFlags({bool? bold, bool? hidden}) {...}
```

调用：`enableFlags(bold: true, hidden: false);`

除非声明 `required`，否则命名参数都是可选的：

`const Scrollbar({Key? key, required Widget child})`

Wrapping a set of function parameters in `[]` marks them as **optional positional parameters**:

```dart
String say(String from, String msg, [String? device]) {...}
say('Bob', 'Howdy', 'smoke signal');
```

Your function can use `=` to define **default values** for both named and positional parameters.

```dart
void enableFlags({bool bold = false, bool hidden = false}) {...}
```

You can create a nameless function called an **anonymous function**, or sometimes a **lambda** or **closure**.

排序：

```dart
// 从小到大，a.certificateId < b.certificateId
_models.sort((CertificateInfo a, CertificateInfo b) => b.certificateId.compareTo(a.certificateId));
```

### Operators

cast an object to a particular type: `(employee as Person).firstName = 'Bob';`

check the type: `if (employee is Person) {...}`

To assign only if the assigned-to variable is null, use the `??=` operator:

```dart
// Assign value to b if b is null; otherwise, b stays the same
b ??= value;
```

Cascade notation allow you to make a sequence of operations on the same object:

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;

// The previous example is equivalent to this code:
var paint = Paint();
paint.color = Colors.black;
paint.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

If the object that the cascade operates on can be null, then use a null-shorting cascade (`?..`) for the first operation.

```dart
querySelector('#confirm') // Get an object.
  ?..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));

// The previous code is equivalent to the following:
var button = querySelector('#confirm');
button?.text = 'Confirm'; // use ?. to avoid an exception when the leftmost operand is null
button?.classes.add('important');
button?.onClick.listen((e) => window.alert('Confirmed!'));
```

## Dart Classes

Dart is an object-oriented language with classes and mixin-based inheritance.

**Mixin-based** inheritance means that although every class (except for the top class, Object?) has exactly one superclass, a class body can be reused in multiple class hierarchies.

Constructor names can be either `ClassName` or `ClassName.identifier`:

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

To get an object’s type at runtime: `print('The type of a is ${a.runtimeType}');`

```dart
class Point {
  double? x; // nullable variable
  double z = 0; // Declare z, initially 0.
}
```

### Constructors

构造函数的推荐写法：[prefer_initializing_formals](https://dart-lang.github.io/linter/lints/prefer_initializing_formals.html)

[Constructors in Dart – Use Cases and Examples](https://www.freecodecamp.org/news/constructors-in-dart/)

```dart
class Car {
    String make;
    String model;
    String yearMade;
    bool hasABS;

    // 推荐写法
    Car(this.make, this.model, this.yearMade, this.hasABS);
}
```

命名构造函数：

```dart
// Initializer lists are handy when setting up `final` fields.
// Note: Anything that is placed on the right hand side of the colon (:) has no access to `this`.
Car.withoutABS(this.make, this.model, this.yearMade): hasABS = false;
```

Use the `factory` keyword when implementing a constructor that doesn’t always create a new instance of its class.

If your class represents an object that will never change after its creation, you can benefit from the use of a **constant constructor**.

When you want one constructor to call another constructor under the hood, it's referred to as redirecting constructors.

```dart
Car.withoutABS(this.make, this.model, this.yearMade): this(make, model, yearMade, false);
```

### OOP

Abstract class: a class that can’t be instantiated. Abstract classes are useful for defining interfaces, often with some implementation.

Dart 里通常用抽象类来声明接口。

Dart 里可以继承抽象类，也可以实现抽象类的接口。区别是：

- 继承（`extends`）必须实现抽象类的抽象方法
- 实现（`implements`）必须实现抽象类的所有属性和方法

`extends` 用在抽象类提供了一些方法的公共实现的情况。

**Abstract methods** can only exist in **abstract classes**.

Dart 里没有方法体的方法，是抽象方法。

Every class implicitly defines an interface containing all the instance members of the class and of any interfaces it implements.

If you want to create a class A that supports class B’s API without inheriting B’s implementation, class A should **implement** the B interface.

```dart
class Point implements Comparable, Location {...}
```

Extension methods, are a way to add functionality to existing libraries.

```dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }
}
```

### mixin

`mixin` 就是在类中混入其它的功能，使用 `mixin` 可以实现类似于多继承的特性。

To use a **mixin**, use the `with` keyword.

```dart
class A {
  String name = 'A';
  void myPrint() {
    print('A');
  }
}

class B {
  void myPrint() {
    print('B');
  }
}

class C with A, B {
}

class D implements A, B {
  String get name => 'D';
  set name(String _name) => name = _name;

  void myPrint() {
    print('D');
  }
}

void main() {
  A insA = A();
  B insB = B();
  C insC = C();
  D insD = D();

  insA.myPrint(); // A
  insB.myPrint(); // B
  print(insC.name); // A
  insC.myPrint(); // B
  insD.myPrint(); // D

  print(insC is A); // true，A 可看作是 C 的父类
  print(insC is B); // true，B 可看作是 C 的父类
}
```

被 `mixin` 的类，不能继承别的类，也不能有构造函数。

You can restrict a mixin’s use by using the `on` keyword to specify the required superclass.

## Generics

范型函数可以约束参数和返回值的类型，减少重复代码：

```dart
T theSmallerOne<T>(T lhs, T rhs) {
  if (T == num || T == int || T == double) {
    return (lhs as num) < (rhs as num) ? lhs : rhs;
  }
  return rhs;
}

void main() {
  // print(theSmallerOne<num>('a', 2)); // ❌
  print(theSmallerOne<num>(1, 2));
  print(theSmallerOne<int>(1, 2));
  print(theSmallerOne<double>(1, 2));
}
```

范型类、范型容器：

```dart
void main() {
  // List 是一个范型类，不给它指定类型时，它可以装任意类型
  var l1 = [1, 2, 'hello', 2.0];
  for (var i in l1) {
    print(i.runtimeType);
  }
  // 当给范型类指定类型时，则只能装指定类型
  var l2 = <num>[1, 2, 2.0];
  for (var i in l2) {
    print(i.runtimeType);
  }
}
```

范型接口：

```dart
abstract class Cache<T> {
  T? getByKey(String key);
  void setByKey(String key, T value);
}

class MemoryCache<T> implements Cache<T> {
  Map<String, T> map = {};
  T? getByKey(String key) {
    return map[key];
  }

  void setByKey(String key, T value) {
    map[key] = value;
  }
}

void main() {
  var cache = MemoryCache<num>();
  cache.setByKey('1', 1);
  cache.setByKey('2', 2.0);
  print(cache.getByKey('1').runtimeType);
  print(cache.getByKey('2').runtimeType);
  print(cache.getByKey('3'));
}
```

## Libraries and visibility

The only required argument to `import` is a **URI** specifying the library. For built-in libraries, the URI has the special `dart:` scheme.

```dart
import 'dart:html';
```

For other libraries, you can use a file system path or the `package:` scheme.

If you import two libraries that have conflicting identifiers, then you can specify a prefix for one or both libraries.

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;
```

If you want to use only part of a library, you can selectively import the library. For example:

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

## Concurrency

Dart supports concurrent programming with async-await, isolates, and classes such as `Future` and `Stream`.

The Dart language and libraries use `Future` and `Stream` objects to represent values to be provided in the future.

For example, a **promise** to eventually provide an int value is typed as `Future<int>`. A **promise** to provide a series of int values has the type `Stream<int>`.

The `async` function executes only until it encounters its first `await` expression. Then it returns a `Future` object, resuming execution only after the `await` expression completes.

```dart
Future<void> checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```

An asynchronous for loop has the following form, the value of expression must have type `Stream`.

```dart
await for (varOrType identifier in expression) {
  // Executes each time the stream emits a value.
}
```

## Isolates

> [Language tour | Dart](https://dart.dev/guides/language/language-tour#isolates)

Most computers, even on mobile platforms, have multi-core CPUs. To take advantage of all those cores, developers traditionally use shared-memory threads running concurrently. However, shared-state concurrency is error prone and can lead to complicated code.

Instead of threads, all Dart code runs inside of isolates. Each Dart isolate has a single thread of execution and shares no mutable objects with other isolates.

Because there’s no shared memory, you don’t have to worry about mutexes or locks.

To communicate with each other, isolates use **message passing**.

Isolates are like threads or processes, but each isolate has its own memory and a single thread running an **event loop**.

![img](/img/6F521845-C867-4E06-BCE5-DBD197FBD86C.png)

Dart isolates have their own private heap, independent of one another. As each isolate runs in a separate thread, garbage collection events for each isolate should not impact the performance of others. Using isolates is a great way to avoid blocking the UI and offloading process intensive activities.

> [Concurrency in Dart | Dart](https://dart.dev/guides/language/concurrency)

Many Dart apps use only one isolate (the main isolate), but you can create additional isolates, enabling parallel code execution on multiple processor cores.

If your app’s UI becomes unresponsive due to a time-consuming computation — parsing a large JSON file, for example — consider offloading that computation to a worker isolate, often called a background worker.

In Flutter, the `compute()` function is a simple way to move a single function call to a **worker isolate**.

[JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)

The `compute()` function runs expensive functions in a background isolate and returns the result.
