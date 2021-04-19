---
title: "启动时长优化"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# Mach-O

> [WWDC 2016 - Optimizing App Startup Time](https://developer.apple.com/videos/play/wwdc2016/406/)

**Image**: An executable, dylib, or bundle.

- Executable: Main binary for application
- Dylib: Dynamic library
- Bundle: Dylib that cannot be linked, only `dlopen()`, used on macOS

**Framework**: Dylib with directory for resources and headers.

A Mach-O image is divided into segments. Each segment is always a multiple of the page size. The page size is determined by the hardware, for arm64, the page size is 16KB, everything else it's 4KB.

The most common segment names are `__TEXT`, `__DATA`, `__LINKEDIT`:

- `__TEXT` contains the Mach header, machine instructions and read-only constants such as C strings
- `__DATA` segment is read-write and contains global variables, static variables, etc
- `__LINKEDIT` contains information about your functions and variables such as their names and addresses, the "meta data" about how to load the program

Mach-O Universal Files: merged Mach-O images for different architectures.

Every process has a logical address space which gets mapped to some physical page of RAM.

File backed mapping: rather than actually read an entire file into RAM you can tell the VM system through the `mmap` call, that I want this slice of this file mapped to this address range in my process. Each time you access an address that hasn't been accessed before it will cause a **page fault**, the kernel will read just that one page. And that gives you lazy reading of your file.

The `__TEXT` segment of any images can be mapped into VM, it will be read lazily, and all those pages can be shared between processes.

As soon as one process actually tries to write to `__DATA` segment page, the **Copy-On-Write** (COW) happens. The Copy-On-Write causes the kernel to make a copy of that page into another physical RAM and redirect the mapping to go to that. So that one process now has its own copy of that page, which brings us to clean versus dirty pages. That copy is considered a dirty page.

A **dirty page** is something that contains process specific information. A **clean page** is something that the kernel could regenerate later if needed such as re-reading from disk. So dirty pages are much more expensive than clean pages.

`__LINKEDIT` is only needed while dyld is doing its operations. Once it's done, it doesn't need these `__LINKEDIT` pages anymore, the kernal can reclaim them when someone else needs RAM.

You can mark a page readable, writable, or executable, or any combination of those.

![img](/assets/images/0cd353b5-de0f-4150-88d1-d8ce30f960b4.png)

There are two security things that have impacted dyld, ASLR and code signing. For code signing, at build time, every single page of your Mach-O file gets its own individual cryptographic hash. And all those hashes are stored in the `__LINKEDIT`. This allows each page to be validated that it hasn't been tampered with.

# exec() to main()

`exec()` is a system call. When you trap into the kernel, you basically say I want to replace this process with this new program. The kernel wipes the entire address space and maps in your executable.

For ASLR the system maps it in at a random address. From that address, back down to zero, it marks that whole region inaccessible (**PAGEZERO**). The size of that region is at least 4GB for 64 bit processes. This catches any NULL pointer references and pointer truncation errors.

When the kernel's done mapping a process, it now maps another Mach-O called **dyld** into that process at another random address, sets the PC (**program counter**) into dyld and let dyld finish launching the process. So now dyld is running in process and its job is to load all the dylibs that you depend on and get everything prepared and running.

# WWDC

[WWDC 2019 - Optimizing App Launch](https://developer.apple.com/videos/play/wwdc2019/423/)

[WWDC 2017 - App Startup Time: Past, Present, and Future](https://developer.apple.com/videos/play/wwdc2017/413)

[WWDC 2016 - Using Time Profiler in Instruments](https://developer.apple.com/videos/play/wwdc2016/418/)

# 统计冷启动时长

Xcode -> Edit Scheme -> Arguments -> Environment Variables，设置 `DYLD_PRINT_STATISTICS` 和 `DYLD_PRINT_STATISTICS_DETAILS` 两个值为 1。

```log
Total pre-main time: 1.3 seconds (100.0%)
         dylib loading time: 1.0 seconds (74.7%)
        rebase/binding time:  95.79 milliseconds (7.1%)
            ObjC setup time:  41.65 milliseconds (3.0%)
           initializer time: 202.46 milliseconds (15.0%)
           slowest intializers :
             libSystem.B.dylib :   7.37 milliseconds (0.5%)
           libMTLCapture.dylib :  36.40 milliseconds (2.7%)
                       Flutter :  79.66 milliseconds (5.9%)

  total time: 2.4 seconds (100.0%)
  total images loaded:  656 (584 from dyld shared cache)
  total segments mapped: 221, into 63664 pages
  total images loading time: 2.0 seconds (84.9%)
  total load time in ObjC:  41.65 milliseconds (1.6%)
  total debugger pause time: 1.0 seconds (44.1%)
  total dtrace DOF registration time:   0.00 milliseconds (0.0%)
  total rebase fixups:  295,165
  total rebase fixups time:  69.41 milliseconds (2.8%)
  total binding fixups: 29,525
  total binding fixups time:  46.85 milliseconds (1.9%)

  total weak binding fixups time:  10.28 milliseconds (0.4%)
  total redo shared cached bindings time:  30.76 milliseconds (1.2%)
  total bindings lazily fixed up: 0 of 0
  total time in initializers and ObjC +load: 202.46 milliseconds (8.2%)
                         libSystem.B.dylib :   7.37 milliseconds (0.2%)
               libBacktraceRecording.dylib :   5.82 milliseconds (0.2%)
                       libMTLCapture.dylib :  36.40 milliseconds (1.4%)
                                 Alamofire :   2.95 milliseconds (0.1%)
                                    Charts :   3.29 milliseconds (0.1%)
                              FBSDKCoreKit :   6.85 milliseconds (0.2%)
                                   Flutter :  79.66 milliseconds (3.2%)
                                 xxNetwork :   2.85 milliseconds (0.1%)
                                 HandyJSON :   2.61 milliseconds (0.1%)
                                MoyaMapper :   2.59 milliseconds (0.1%)
                                   RxSwift :   4.43 milliseconds (0.1%)
                                   RxCocoa :   7.06 milliseconds (0.2%)
                                        xx :  18.68 milliseconds (0.7%)
total symbol trie searches:    86758
total symbol table binary searches:    0
total images defining weak symbols:  70
total images using weak symbols:  157
```

# 冷启动的各个阶段

## main() 函数执行前

在 main() 函数执行前，系统主要会做下面几件事情：

1\. 加载可执行文件，包括应用程序二进制文件和动态库，动态库又会依赖其它的动态库，系统会设置一个共享缓存来解决加载的递归依赖问题。

2\. 进行 rebase 指针调整、符号与地址的绑定。Rebase 是在镜像内部调整指针的指向，由于 ASLR，需要根据随机的地址偏移量进行指向修正。

3\. Runtime 初始化，包括 objc 相关类的注册、category 注册、selector 唯一性检查等。

4\. Initializers：ObjC `+load()` 方法；`attribute((constructor))` C++ 构造函数属性函数；C++ 静态全局变量等。

相应地，这个阶段对于启动速度优化来说，可以做的事情包括：

- 和优化包体积的思路一样，清理无用的类和代码，减小可执行文件的体积。
- 减少加载启动后不会去使用的类或者方法。
- 减少动态库的数量。苹果建议最多使用 6 个非系统动态库。
- `+load()` 方法里的内容可以放到首屏渲染完成后再执行，或使用 `+initialize()` 方法替换掉。因为，在一个 `+load()` 方法里，进行运行时方法替换操作会带来 4 毫秒的消耗。不要小看这 4 毫秒，积少成多，执行 +load() 方法对启动速度的影响会越来越大。
- 控制 C++ 全局变量的数量。

## main() 函数执行后

main() 函数执行后的阶段，指的是从 main() 函数执行开始，到 `application(_:didFinishLaunchingWithOptions:)` 方法里首屏渲染相关方法执行完成。主要包括了：首屏初始化所需配置文件的读写操作、首屏数据模型的读取、首屏渲染的计算等。

优化方式是，排查业务代码，与首屏渲染无关的代码全部延后执行。例如类的初始化、监听注册等。

## 首屏渲染完成后

从函数上来看，这个阶段指的是 `application(_:didFinishLaunchingWithOptions:)` 方法作用域内，执行首屏渲染之后的所有方法执行完成。这个阶段用户已经能够看到 App 的首页了，所以优化的优先级排在最后。但是，那些会卡住主线程的方法还是需要最优先处理的，不然还是会影响到用户后面的交互操作。

# 实战

键盘里没有 StatusBar，将系统创建 StatusBar 的私有方法替换掉，优化了 8 ms；

首屏视图根据功能逻辑，暂时不需显示的采用懒加载，优化了 7 ms。

涉及文件或路径的操作，如检查文件夹是否存在，新建、复制、移动、删除文件等等操作，不要放在主线程。

# 检查、监控方法耗时情况

一、Instruments 的分析工具 "App Launch"、"Time Profiler"，Time Profiler 定时抓取主线程上的方法调用堆栈，计算一段时间里各个方法的耗时。

二、对 objc_msgSend 方法进行 hook 来掌握所有方法的执行耗时。利用开源库 [fishhook](https://github.com/facebook/fishhook) 和汇编实现。可参考戴铭的开源项目 [GCDFetchFeed](https://github.com/ming1016/GCDFetchFeed)，在需要检测耗时的地方调用 `[SMCallTrace start]`，结束时调用 stop 和 save 就可以打印出方法的调用层级和耗时了。

# 二进制重排

传统的启动优化是基于减少不必要代码、懒加载、利用多线程、延后执行与首屏渲染无关的代码来做的，主要是从减少主线程任务的角度来出发，此类相关优化的策略已经很普遍了，很难再做出大的提升。今天，我们从另一个角度去思考启动优化——内存加载机制。

APP 启动时，dyld 会把程序的二进制 mmap 到虚拟内存里，当执行代码需要使用到具体的物理内存时，再通过 page fault 触发物理内存加载，然后才能访问。

page fault 在较差的情况下耗时超过 1ms，在较正常的情况下也要耗时 0.3 - 0.6ms 左右。那么 App 启动期间大概需要发生多少次 page fault 呢？在我们应用中的数据如下：一次冷启动触发了 2000 多次 page fault，总耗时达到了 300+ms。(Instruments - System Trace - Virtual Memory Trace - File Backed Page In)

A9 之后的 CPU 物理页大小为 16KB，如果我们能让启动期间需要执行的指令，都紧凑地排列在相邻的内存分页，那么就能尽可能减少 page fault 的次数，这就是二进制重排的目的。

Xcode 对二进制重排提供了支持，只需要在编译设置里指定一个 Order File 即可 (Build Settings - Linking - Order File)，例如 objc 的源码就使用了这项技术（源码文件夹下的 libobjc.order 文件）。编译器会按照这个文件指定的符号顺序来排列二进制代码段，达到优化的目的。
