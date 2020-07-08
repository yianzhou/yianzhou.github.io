---
title: "Gist - Swift"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

# CAGradientLayer

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

# 页面时长统计打点

```swift
private var viewDidAppearDate = Date()

override func viewDidLoad() {
    super.viewDidLoad()

    NotificationCenter.default.addObserver(self, selector: #selector(appDidBecomeActive(_:)), name: UIApplication.didBecomeActiveNotification, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(appWillResignActive(_:)), name: UIApplication.willResignActiveNotification, object: nil)
}

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    viewDidAppearDate = Date()
}

override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    let duration = Date().timeIntervalSince(self.viewDidAppearDate)
    if duration < 100000 {
        log(duration)
    }
}

@objc func appDidBecomeActive(_ notification: Any) {
    viewDidAppearDate = Date()
}

@objc func appWillResignActive(_ notification: Any) {
    let duration = Date().timeIntervalSince(self.viewDidAppearDate)
    if duration < 100000 {
        log(duration)
    }
}
```

# UILabel with padding

```swift
@IBDesignable class URLabel: UILabel {
    @IBInspectable var topInset: CGFloat = 0
    @IBInspectable var bottomInset: CGFloat = 0
    @IBInspectable var leftInset: CGFloat = 4
    @IBInspectable var rightInset: CGFloat = 4

    override func drawText(in rect: CGRect) {
        let insets = UIEdgeInsets(top: topInset, left: leftInset, bottom: bottomInset, right: rightInset)
        super.drawText(in: rect.inset(by: insets))
    }

    override var intrinsicContentSize: CGSize {
        let size = super.intrinsicContentSize
        return CGSize(width: size.width + leftInset + rightInset,
                      height: size.height + topInset + bottomInset)
    }

    override var bounds: CGRect {
        didSet {
            // ensures this works within stack views if multi-line
            preferredMaxLayoutWidth = bounds.width - (leftInset + rightInset)
        }
    }
}
```

# UILabel 字间距

```swift
let tryText = "TRY FOR FREE!!!"
let tryTextMark = "!!!"
let substringRange = tryText.range(of: tryTextMark)!
let nsRange = NSRange(substringRange, in: tryText)
let attrStr = NSMutableAttributedString(string: tryText)
let style = NSMutableParagraphStyle()
style.alignment = .center
attrStr.addAttribute(NSAttributedString.Key.kern, value: -5, range: nsRange)
tryLabel.attributedText = attrStr
tryLabel.font = UIFont.systemFont(ofSize: 40 * kAppScale, weight: .heavy)
tryLabel.textColor = UIColor.white
tryLabel.numberOfLines = 1
tryLabel.adjustsFontSizeToFitWidth = true
tryLabel.textAlignment = .center
```

# 时间 Date

```swift
/// 将秒数转换为 00:00:00 格式的字符串
func ms(from count: Int) -> (String, String) {
    let minute = count / 60
    let second = count - minute * 60
    var minuteStr = "\(minute)"
    if minuteStr.count == 1 {
        minuteStr = "0\(minuteStr[0])"
    }
    var secondStr = "\(second)"
    if secondStr.count == 1 {
        secondStr = "0\(secondStr[0])"
    }
    return (minuteStr, secondStr)
}
```
