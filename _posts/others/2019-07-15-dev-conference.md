---
title: "开发者大会"
categories: [internet]
---

# WWDC

苹果 WWDC 2019 迎来第 30 年，在今年的全球开发者大会上，苹果推出了新版 tvOS、watchOS 6、iOS 13、iPadOS、macOS 等新版系统与新款 Mac Pro、32 英寸 6K 视网膜显示器两款硬件产品。其中 watchOS 新增计算器、语音备忘录等功能，iOS 13 新增 Dark Mode 并推出 Sign in with Apple，iPadOS 为首次推出，支持同一应用多窗口，新款 Mac Pro 最高配备英特尔至强 28 核处理器，标准版售价为 5999 美元。

Screen Time 也被带到 Mac 上，996 群众可以看到自己每天对着电脑多长时间。

450000 的 app 在使用 Swift，很多低龄学生在开始学 coding 的时候也用 Swift 上手，SwiftUI 降低了编程难度，更加简化了使用。

在今天开幕的全球开发者大会上，苹果公司强调了所有面向开发者的新产品，包括 SwiftUI、Xcode 11 和 ARKit 3。

没错，不仅仅是 iOS 和 macOS，在 tvOS 和 watchOS 上，SwiftUI 也将以最符合平台设计语言和交互的方式去展示每一个控件。而且，你还将自动获得大量的系统特性，比如 Dynamic Type、Dark Model、阅读方向自适应等。

从这一点上来看，SwiftUI 和 React Native 有着更为相似的思路和技术。只不过 Facebook 无论对 iOS 还是 Android 都几乎没有任何话语权，因此在兼容性、一致性上都有一定问题。而为了达到这种兼容性，不仅 React Native 自身需要做大量的工作，开发人员也需要疲于应对各种问题，可以说是一种比较尴尬的中间技术。

而 SwiftUI 和 React Native 与 Flutter 的跨 UI 平台思想有着本质的不同。Flutter 完全抛弃了运行平台的原生 UI 框架，类似于在一张画布上一个像素一个像素"画"出每一个控件，类似于一个 2D 游戏引擎。它的目的也很明确：确保相同的代码在不同的操作系统、硬件设备、屏幕尺寸下展示完全相同的 UI 。这似乎是开发者想要的，因为我们受够了 RN 在不同平台上表现出的不可控差异。但即便抛去了不同操作系统设计语言的差异，不同尺寸屏幕下的 UI 至少应该是很不一样的。桌面平台 UI 和移动平台 UI，甚至手表上的 UI，应该根据用户的使用习惯和操控方式，制定完全不同的 UI 和交互。如果要在 Flutter 上实现多平台的适配，结果对任何一个程序员而言都可能是一场噩梦。你需要做大量的判断，并且可能需要使用多种控件来实现单一功能，最终还要面对大量的测试和 Bug。

不过有利就有弊。SwiftUI 近乎完美的跨平台方案是建立在较低自由度下的。通过上面的例子你也发现了，Demo 中使用的都是系统原生的控件样式。这并不是说我们无法自定义，只不过：1. 我们能够自定义的项目不够多 2. 我们自定义的内容越多，系统为我们自动添加的特性失去的也就越多。

这和 Flutter 引以为傲的 "精确到像素" 还有一定差距，我们可能无法像 Flutter 那样完全掌控 UI 控件的所有细节。但就像画画一样，你失去了一定的自由，换来的是更快更高效的开发，这恰恰体现了 Apple 的企业风格。

然而 SwiftUI 跨平台的故事讲完了吗？我认为这恰恰只是个开始。SwiftUI 这个完全与平台、设备无关的，纯描述的 UI 框架，恰恰才是跨平台方案的正确方向。SwiftUI 能够用来描述 iOS macOS tvOS 甚至 watchOS 的 UI，为什么不能用来描述 Android，或者 Web？SwiftUI 已经拥有了 Flex 布局、combine 数据绑定、热加载等一系列特性，我们只需要照着这个思路，将 Android 或者 Web 的模版套用在 SwiftUI 上，就能同样得到符合平台设计语言和规范的 UI 。当然，这远没有我说的那么简单，但是不要忘了，Swift 是开源的，跨平台运行也不是问题。只要条件存在，一切皆有实现的可能。

然而到那时，Flutter 又会变成什么样子呢？至少在目前，Flutter 还是会成为大部分公司跨平台的首要方案之一，而 SwiftUI 嘛，大面积使用至少也是 2 ～ 3 年之后的事咯。

# Google I/O

Google 在 2017 年的 I/O 大会上宣布支持使用 Kotlin 语言来开发 Android 应用程序，和 Java 同为一级开发语言。而今天 Google 正式宣布，Kotlin 将由一级开发语言转为第一开发语言，未来 Google 提供的 API 都会优先以 Kotlin 为准。当然 Java 和 C++开发也会继续支持下去，暂时还没有放弃 Java 的时间表。

只要开发者按照 Google Assistant 规定的格式来配置属性，在 Google 搜索相关的内容时就可以显示诸如下图中的步骤过程，让用户可以一目了然。类似地，如果开发者在 App 中按照 Google Assistant 规定的格式来配置属性，那么用户就可以通过语音来操控 App，完成诸如运动健身、照片分享、甚至是点外卖的功能。

Google 将人工智能技术归为了三大类体系，ML Kit、Google Cloud 和 TensorFlow。

通过这次的 Developer Keynote 我们可以看出，Flutter 是一种跨平台技术，而不属于 Android 技术，Google 的 Android 团队对于 Flutter 只字未提，而是建议使用 Kotlin 语言来进行开发。那么 Google 为什么还要开发 Flutter 技术呢？因为跨平台开发市场即使 Google 不做也会有其他公司去做，比如 FaceBook 的 RN，阿里的 Weex。因此 Flutter 实际上是在和这些公司的产品抢市场，而不是在和自己的 Android 团队抢市场。
