---
title: 'Swift 代码'
categories: [Apple]
---

渐变色，CAGradientLayer

```swift
let gradient = CAGradientLayer()
gradient.colors = [UIColor(rgba: "#00C97F").cgColor, UIColor(rgba: "#7CE87C").cgColor]
gradient.locations = [0.0 , 1.0]
gradient.startPoint = CGPoint(x: 0.0, y: 0.5)
gradient.endPoint = CGPoint(x: 1.0, y: 0.5)
gradient.frame = subscribeButton.bounds
subscribeButton.layer.insertSublayer(gradient, at: 0)
```