---
title: 'Swift 代码'
categories: [Apple]
---

渐变色，CAGradientLayer

```swift
// 从左到右渐变色
// addSublayer
let color1 = UIColor(rgba: "#F4DEA9")
let color2 = UIColor(rgba: "#F4C467")
let gradientColors: [CGColor] = [color1.cgColor, color2.cgColor]
let gradientLayer = CAGradientLayer()
gradientLayer.colors = gradientColors
gradientLayer.startPoint = CGPoint(x: 0, y: 0)
gradientLayer.endPoint = CGPoint(x: 1, y: 0)
gradientLayer.frame = unlockButton.bounds
button.layer.insertSublayer(gradientLayer, at: 0)

// UIView backing layer
private class ProgressView: UIView {
    override class var layerClass: AnyClass { return CAGradientLayer.self }
}

let progressView = ProgressView()
let color1 = UIColor(rgba: "#15E78D")
let color2 = UIColor(rgba: "#BFF95D")
let gradientColors: [CGColor] = [color1.cgColor, color2.cgColor]
let gradientLayer = progressView.layer as! CAGradientLayer
gradientLayer.colors = gradientColors
gradientLayer.startPoint = CGPoint(x: 0, y: 0)
gradientLayer.endPoint = CGPoint(x: 1, y: 0)
```

页面时长统计打点

```swift
private var viewDidAppearTimestamp: Double = 0

override func viewDidLoad() {
    super.viewDidLoad()
                
    NotificationCenter.default.addObserver(self, selector: #selector(appBecomeActive(_:)), name: UIApplication.didBecomeActiveNotification, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(appResignActive(_:)), name: UIApplication.willResignActiveNotification, object: nil)
}

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    viewDidAppearTimestamp = CFAbsoluteTimeGetCurrent()
}
    
override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    let stayTime = Int(CFAbsoluteTimeGetCurrent() - viewDidAppearTimestamp)
    log(stayTime)
}

@objc func appBecomeActive(_ notification: Any) {
    viewDidAppearTimestamp = CFAbsoluteTimeGetCurrent()
}
    
@objc func appResignActive(_ notification: Any) {
    let stayTime = Int(CFAbsoluteTimeGetCurrent() - viewDidAppearTimestamp)
    log(stayTime)
}
```