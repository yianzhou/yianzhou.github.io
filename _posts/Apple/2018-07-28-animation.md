---
title:  "动画"
categories: [Apple]
---

# UIViewPropertyAnimator

本文主要总结了 iOS 上常见的动画实现方式。

UIView 可以实现动画的属性包括：frame, bounds, center, transform, alpha, backgroundColor.

iOS 4+ 提供了一系列 UIView 的类方法实现 UIView 的动画。

iOS 10 为了我们带来了 [UIViewPropertyAnimator](https://developer.apple.com/documentation/uikit/uiviewpropertyanimator)，不仅可以对 UIView 执行动画，更能在动画过程中进行动态的修改。

## 创建一个简单的动画
* @duration: 持续时间
* @curve: 时间曲线，定义动画的速度，默认支持四种（.easeInOut, .easeIn, .easeOut, .linear）
```
let animator = UIViewPropertyAnimator(duration: 2.0, curve: .easeInOut){
    // change UIView property
}
animator.startAnimation()
```

# Core Animation


> Core Animation provides high frame rates and smooth animations without burdening the CPU and slowing down your app. Most of the work required to draw each frame of an animation is done for you. You configure animation parameters such as the start and end points, and Core Animation does the rest, handing off most of the work to dedicated graphics hardware, to accelerate rendering.

Core Animation 提供了高帧率、流畅的动画效果。你只需要定义动画的起始和结束点，Core Animation 会处理剩下的全部工作，包括将工作提交到专门的图形硬件上去加速处理。

> CALayer is an object that manages image-based content and allows you to perform animations on that content.

CALayer 管理了基于图像的内容，并且允许我们对这些内容进行动画。

> Layers are often used to provide the **backing store** for views but can also be used without a view to display content. 
>
> Modifying the properties of the layer is how you initiate animations on the layer’s content or geometry. A layer object encapsulates the duration and pacing of a layer and its animations by adopting the CAMediaTiming protocol, which defines the layer’s timing information.

CALayer 类在概念上和 UIView 类似，同样也是一些被层级关系树管理的矩形块，同样也可以包含一些内容（像图片，文本或者背景色），管理子图层的位置。它们有一些方法和属性用来做动画和变换。和 UIView 最大的不同是 CALayer 不处理用户的交互。

每一个UIView都有一个CALayer实例的图层属性，也就是所谓的backing layer，视图的职责就是创建并管理这个图层，以确保当子视图在层级关系中添加或者被移除的时候，他们关联的图层也同样对应在层级关系树当中有相同的操作（见图1.2）。

但是为什么iOS要基于UIView和CALayer提供两个平行的层级关系呢？为什么不用一个简单的层级来处理所有事情呢？原因在于要做职责分离，这样也能避免很多重复代码。在iOS和Mac OS两个平台上，事件和用户交互有很多地方的不同，基于多点触控的用户界面和基于鼠标键盘有着本质的区别，这就是为什么iOS有UIKit和UIView，但是Mac OS有AppKit和NSView的原因。他们功能上很相似，但是在实现上有着显著的区别。

实际上这些背后关联的图层才是真正用来在屏幕上显示和做动画，UIView仅仅是对它的一个封装，提供了一些iOS类似于处理触摸的具体功能，以及Core Animation底层方法的高级接口。

如果说CALayer是UIView内部实现细节，那我们为什么要全面地了解它呢？苹果当然为我们提供了优美简洁的UIView接口，那么我们是否就没必要直接去处理Core Animation的细节了呢？

我们已经证实了图层不能像视图那样处理触摸事件，那么他能做哪些视图不能做的呢？这里有一些UIView没有暴露出来的CALayer的功能：

* 阴影，圆角，带颜色的边框
* 3D变换
* 非矩形范围
* 透明遮罩
* 多级非线性动画

使用图层关联的视图而不是CALayer的好处在于，你能在使用所有CALayer底层特性的同时，也可以使用UIView的高级API（比如自动排版，布局和事件处理）。

然而，当满足以下条件的时候，你可能更需要使用CALayer而不是UIView:
* 开发同时可以在Mac OS上运行的跨平台应用
* 使用多种CALayer的子类（见第六章，“特殊的图层“），并且不想创建额外的UIView去包封装它们所有
* 做一些对性能特别挑剔的工作，比如对UIView一些可忽略不计的操作都会引起显著的不同（尽管如此，你可能会直接想使用OpenGL绘图）

但是这些例子都很少见，总的来说，处理视图会比单独处理图层更加方便。

默认情况下，UIView仍然会绘制超过边界的内容或是子视图，在CALayer下也是这样的。

UIView有一个叫做clipsToBounds的属性可以用来决定是否显示超出边界的内容，CALayer对应的属性叫做masksToBounds，把它设置为YES，雪人就在边界里啦～（如图2.5）





©️ 本文原创，转载请注明出处。