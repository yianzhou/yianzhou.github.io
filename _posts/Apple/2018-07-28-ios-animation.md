---
title:  "iOS 动画"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

> [iOS Core Animation 进阶技术](https://github.com/AttackOnDobby/iOS-Core-Animation-Advanced-Techniques)

# Core Animation

Core Animation 是 iOS 的 UIKit 和 UIView 的基础和底层，在 macOS 上也有对应的封装，AppKit 和 NSView。

## CALayer

CALayer 类在概念上和 UIView 类似，同样也是一些被层级关系树管理的矩形块；实际上 UIView 背后关联的图层，才是真正在屏幕上显示和动画的，它们很多的属性也是相对应的。和 UIView 最大的不同是，CALayer 不处理用户的交互。

为什么 iOS 要基于 UIView 和 CALayer 提供两个平行的层级关系呢？原因在于要做职责分离。在 iOS 和 macOS 两个平台上，事件和用户交互有很多地方的不同，基于多点触控的用户界面和基于鼠标键盘有着本质的区别，它们共享 Core Animation 对图形的绘制，并分别实现用户交互的各种接口。

既然有了简洁的 UIView 的高级接口，为什么还要了解 Core Animation呢？虽然这个框架的名字叫做 Core Animation，实际上很多丰富的、自定义的视觉效果，我们要通过 CALayer 才能实现，而这些是 UIView 没有暴露出来的，包括：
* 阴影、圆角、边框
* 3D变换
* 非矩形范围
* 透明遮罩
* 多级非线性动画
* 粒子效果 ([CAEmitterLayer](https://developer.apple.com/documentation/quartzcore/caemitterlayer?language=objc))
* 渐变效果 ([CAGradientLayer](https://developer.apple.com/documentation/quartzcore/cagradientlayer?language=objc))

## 隐式动画
你并不需要在 Core Animation 中手动打开动画，任何对 CALayer 属性的改变都不是瞬间完成的，而是从先前的值平滑地过渡到新的值，除非你明确禁用了这个功能，这是框架默认的“**隐形动画**”。

我们随意改变 CALayer 的一个属性，如 
```
colorLayer.backgroundColor = UIColor.red.cgColor
```
我们并没有指定任何动画的类型，而 Core Animation 自动帮我们实现了一个平滑的动画效果。动画的默认时长是 0.25 秒。我们可以通过把改变属性的代码放在 CATransaction 里执行，来干预隐式动画的效果，如时间函数等。
```
CATransaction.begin()
CATransaction.setAnimationDuration(3.0)

colorLayer.transform = CATransform3DMakeScale(3, 3, 3)

CATransaction.commit() 
```

Core Animation 在每个 RunLoop 周期中自动开始一次新的事务（RunLoop 是 iOS 负责收集用户输入，处理未完成的定时器或者网络事件，最终重新绘制屏幕的东西），即使你不显式地使用 `[CATransaction begin]` 开始一次事务，在一个特定 RunLoop 循环中的任何属性的变化都会被收集起来，然后做一次 0.25 秒的动画。

UIView 关联的图层禁用了隐式动画，如果想对这个图层做动画可以：
1. 使用 UIView 的动画函数
2. 或者继承 UIView，并覆盖 `-actionForLayer:forKey:` 方法（如果在非动画 block 里改变了 UIView 的属性，这个方法返回 nil 值，禁用了隐式动画）
3. 或者直接创建一个显式动画

## 显式动画
 
The previous chapter introduced the concept of implicit animations. Implicit animations are a straightforward way to create animated user interfaces on iOS, and they are the mechanism on which UIKit’s own animation methods are based, but they are not a completely general-purpose animation solution.

In this chapter, we will look at explicit animations 显式动画, which allow us to specify custom animations for particular properties or create nonlinear animations, such as a movement along an arbitrary curve 沿着任意曲线运动.

The first type of explicit animation we will look at is the property animation. Property animations target a single property of a layer and specify a target value or range of values for that property to animate between. Property animations come in two flavors: basic and keyframe.

类的继承关系：`CAAnimation`(Abstract)->`CAPropertyAnimation`(Abstract)->`CABasicAnimation`/`CAKeyframeAnimation`。

`CABasicAnimation` is interesting in that it shows us the underlying mechanism behind most of the implicit animations on iOS, but adding a CABasicAnimation to a layer explicitly is a lot of work for little benefit when there are simpler ways to achieve the same effect (either using implicit animations for hosted layers, or UIView animation for views and backing layers).
 
`CAKeyframeAnimation`, however, is considerably more powerful and has no equivalent interface exposed in UIKit. It still operates on a **single property**, but it is not limited to just a single start and end value, and instead can be given an arbitrary sequence of values to animate between.

Multiple such animations can be gathered together using a `CAAnimationGroup`. Adding an animation group to a layer is not fundamentally different from adding the animations individually. It only really becomes apparent when it comes to **hierarchical timing**, which is explained in Chapter 9.

## 转场

Property animations only work on animatable **properties** of a layer, so if you need to change a nonanimatable property (such as an image) or actually add and remove layers from the hierarchy, property animations won’t work.

**Transitions** affect an **entire layer** instead of just a specific property.

# UIView

UIView 可以实现动画的属性包括：
- frame
- bounds
- center
- transform
- alpha
- backgroundColor

iOS 4 以前，使用 `+beginAnimation` 和 `commitAnimation` 实现，是对 CATransaction 的封装。

iOS 4+，使用代码块的方式，实际还是对 CATransaction 的封装。

iOS 10+，使用 `UIViewPropertyAnimator`，实现出了很多以前要用显式动画才能做到的特性，比如时间曲线等。

# 其它

## Open GL in iOS

Open GL ES 全称 Open Graphics Libary for Embedded Systems，是 [Open GL](https://www.opengl.org/) 的子集。Open GL 是跨编程语言、跨平台、行业领域中最为广泛接纳的 2D/3D 图形 API。

根据苹果文档的描述，[Open GL ES 已经正式弃用了](https://developer.apple.com/library/archive/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008793?changes=_3)，相关的如 [GLKit](https://developer.apple.com/documentation/glkit)、Core Animation 里面的 [CAEAGLLayer](https://developer.apple.com/documentation/quartzcore/caeagllayer) 也都被弃用了。

[Metal](https://developer.apple.com/metal/) 才是未来的方向。

## 媒体播放

[AVPlayerLayer](https://developer.apple.com/documentation/avfoundation/avplayerlayer) 是 CALayer 的子类，但它属于 AVFoundation 框架。它是高级接口 [AVPlayerView](https://developer.apple.com/documentation/avkit/avplayerview) 和 [AVPlayerViewController](https://developer.apple.com/documentation/avkit/avplayerviewcontroller) 的底层实现。单纯的 AVPlayerLayer 不提供播放控制，而高级接口提供了这些控制。

## Runloop
iOS上的每个线程都管理了一个 NSRunloop，字面上看就是通过一个循环来完成一些任务列表。但是对主线程，这些任务包含如下几项：
- 处理触摸事件
- 发送和接受网络数据包
- 执行使用gcd的代码
- 处理计时器行为
- 屏幕重绘