---
title: "启动时长优化"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# 冷启动的各个阶段

## main() 函数执行前

在 main() 函数执行前，系统主要会做下面几件事情：

- 加载可执行文件(App 的 .o 文件的集合)
- 加载动态链接库，进行 rebase 指针调整和 bind 符号绑定
- Objc 运行时的初始处理，包括 Objc 相关类的注册、category 注册、selector 唯一性检查等
- 初始化，包括了执行 +load() 方法、attribute((constructor)) 修饰的函数的调用、创建 C++ 静态全局变量

相应地，这个阶段对于启动速度优化来说，可以做的事情包括：

- 减少动态库加载。每个库本身都有依赖关系，苹果公司建议使用更少的动态库，并且建议在使用动态库的数量较多时，尽量将多个动态库进行合并。数量上，苹果公司最多可以支持 6 个非系统动态库合并为一个。
- 减少加载启动后不会去使用的类或者方法。
- +load() 方法里的内容可以放到首屏渲染完成后再执行，或使用 +initialize() 方法替换掉。因为，在一个 +load() 方法里，进行运行时方法替换操作会带来 4 毫秒的消耗。不要小看这 4 毫秒，积少成多，执行 +load() 方法对启动速度的影响会越来越大。
- 控制 C++ 全局变量的数量。

## main() 函数执行后

main() 函数执行后的阶段，指的是从 main() 函数执行开始，到 appDelegate 的 didFinishLaunchingWithOptions 方法里首屏渲染相关方法执行完成。主要包括了：首屏初始化所需配置文件的读写操作；首屏列表数据的读取；首屏渲染的大量计算等。优化方式是，这个阶段只处理首屏渲染相关的业务，其他业务的初始化、监听注册、配置文件读取等，都放到首屏渲染完成后去做。

## 首屏渲染完成后

从函数上来看，这个阶段指的是 didFinishLaunchingWithOptions 方法作用域内执行首屏渲染之后的所有方法执行完成。这个阶段用户已经能够看到 App 的首页了，所以优化的优先级排在最后。但是，那些会卡住主线程的方法还是需要最优先处理的，不然还是会影响到用户后面的交互操作。

# 检查、监控方法耗时情况

一、Instruments 的分析工具 "App Launch"、"Time Profiler"，参考 [WWDC 2019 - Optimizing App Launch](https://developer.apple.com/videos/play/wwdc2019/423/)，Time Profiler 定时抓取主线程上的方法调用堆栈，计算一段时间里各个方法的耗时。

二、对 objc_msgSend 方法进行 hook 来掌握所有方法的执行耗时。利用开源库 [fishhook](https://github.com/facebook/fishhook) 和汇编实现。可参考戴铭的开源项目 [GCDFetchFeed](https://github.com/ming1016/GCDFetchFeed)，在需要检测耗时的地方调用 [SMCallTrace start]，结束时调用 stop 和 save 就可以打印出方法的调用层级和耗时了。