# Android

[一步一步开发天气 App](https://github.com/lilongweidev/GoodWeather)

## Kotlin

学习新语言：

1. 搭建环境，入口函数，打印字符串，Hello World!
2. 变量、常量、枚举
3. 表达式、控制流程
4. 函数、高阶函数
5. 集合及集合的操作
6. 类、静态成员、继承、扩展(extension)
7. 逐步调试

[Hello World Playground](https://play.kotlinlang.org/byExample/01_introduction/01_Hello%20world)

Kotlin 是由捷克的 JetBrains 软件公司开发的一种静态类型的、面向对象的编程语言。它与 Java 语言具有互操作性，而且该语言十分简洁，并得到 Android Studio 的支持。事实上，Kotlin 在您的设备中需要使用 JVM。

If **lambdas** are nothing more than nameless functions, then **closures** are little more than lambdas with a context.

Kotlin is a modern statically typed programming language.（静态类型语言 vs 动态类型语言）

Android KTX is a set of Kotlin extensions that are included with Android Jetpack and other Android libraries.

A language is statically-typed if the type of a variable is known at compile-time instead of at run-time: C, C++, C#, Java, Swift, Kotlin, ...

A language is dynamically-typed if the type of a variable is checked during run-time: JavaScript, Dart, Objective-C, PHP, Python, Ruby, ...

A strongly-typed language is one in which variables are bound to specific data types, and will result in type errors if types do not match up as expected in the expression — regardless of when type checking occurs.（与类型检查发生在编译期还是运行期无关） e.g Python, Java, etc.

A weakly-typed language is a language in which variables are not bound to a specific data type; they still have a type, but type safety constraints are lower compared to strongly-typed languages. e.g PHP, C, etc.

All Strongly-typed languages are Statically-typed, not all Weakly-typed languages are Dynamically-typed. 强类型语言的变量类型一定是在编译期就确定了。

Most of these rules affect variable assignment, return values and function calling.

## Jetpack

Jetpack is a suite of libraries, tools, and guidance. Jetpack comprises the androidx.\* package libraries, unbundled from the platform APIs. This means that it offers backward compatibility and is updated more frequently than the Android platform.

AndroidX is a major improvement to the original Android Support Library, which is no longer maintained.

## adb

Android Debug Bridge 是一种客户端-服务器程序，包括以下三个组件：

- 客户端：用于发送命令。客户端在开发计算机上运行。您可以通过发出 adb 命令来从命令行终端调用客户端。
- 守护进程 (adbd)：在设备上运行命令。守护进程在每个设备上作为后台进程运行。
- 服务器：管理客户端和守护进程之间的通信。服务器在开发机器上作为后台进程运行。

[操作系统分布](https://mta.qq.com/mta/data/device/os)

[Android API Levels](https://source.android.com/setup/start/build-numbers)

Android 9.0 Pie, Aug 6, 2018 (iOS 12, September 17, 2018)

## 安卓分支

原生安卓——Google 为自家安卓设备 Pixel 系列提供的系统，由谷歌负责安全补丁升级和系统更新；

Android One——Google 为非 Google 硬件提供的原生安卓，由谷歌负责安全补丁升级和系统更新；

Android Go——取代 Android One 成为专为低端设备优化的安卓系统，由 OEM 厂商在接受 Google 推送后负责安全补丁升级和系统更新。

## 机型

国内的原厂系统接近原生，而且口碑还可以的基本上就是一加了，但是一加 6 变成 AB 分区后，刷机什么的比较麻烦，之前的机型还可以。华为锁了 bootloader，不能自己解锁，OV 两家也是很少有 rom，基本上只有小米比较适合搞机。

## Android Studio