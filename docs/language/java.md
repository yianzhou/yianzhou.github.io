# Java

关于 Java 的版本和 JDK 版本命名真的挺乱的，在 2018 年更新 Java SE 10 之后，对应的 JDK 版本叫做 JDK10，后续为了方便统一，之前的 JDK1.8 也可以叫做 JDK8 了！

<img alt="" src="/img/9E514CD0-BAC8-442C-9331-467CAA76AEF4.png" />

Java 代码编译执行（mixed 模式下）：

- Java 代码经过 javac 编译成 class 文件（字节码）
- class（字节码）文件经过 JVM 编译成机器码，解释执行
- HotSpot VM 采用了 JIT (just-in-time) 技术，将运行频率很高的字节码直接编译为机器指令执行以提高性能
