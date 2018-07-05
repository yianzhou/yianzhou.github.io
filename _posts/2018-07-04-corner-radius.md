---
title:  "圆角的使用"
categories: [Apple]
---

# 圆角的使用

首先，设置圆角非常简单，
```
view.layer.cornerRadius = 5
```
只需要一句代码，通过 Instruments 的 Core Animation 调试可以得出，它并不会带来性能损耗。

根据[官方文档](https://developer.apple.com/documentation/quartzcore/calayer/1410818-cornerradius)的描述：

`cornerRadius` Setting the radius to a value greater than 0.0 causes the layer to begin drawing rounded corners on its background. By default, the corner radius does not apply to the image in the layer’s contents property; it applies only to the background color and border of the layer. However, setting the `masksToBounds` property to true causes the content to be clipped to the rounded corners.

可见 `cornerRadius` 在类似 `UIImageView` 这样的控件上不能实现我们需要的圆角效果，我们还需要：
```
label.layer.masksToBounds = true
```
虽然设置 `masksToBounds` 会导致 Offscreen Rendering，但这个影响有多大呢，经过[这篇文章](http://www.cocoachina.com/ios/20160301/15486.html)的测试，在 iPhone 6 上，即使出现了 17 个带圆角的视图，动画依然保持在 60 fps。而当圆角达到 34 个时，fps 下降到 33 左右。因此：如果只是一两个圆角，就不要费力气优化了。

那么如果圆角很多的时候怎么优化呢：

❌ 避免重写 `drawRect(:_)`，这会导致内存暴增！

✅ 对于 `UIImageView`，使用 `UIBezierPath` 画出圆角路径，直接截取图片。

✅ 对于 `UIView`，利用 Core Graphics 画出一个圆角矩形，作为 `UIImageView` 加在 `UIView` 的底部。