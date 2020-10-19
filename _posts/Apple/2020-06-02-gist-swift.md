---
title: "Gist - Swift"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

# Media Player

[Becoming a Now Playable App](https://developer.apple.com/documentation/mediaplayer/becoming_a_now_playable_app)

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

# UILabel, NSAttributedString

```swift
// 字间距
let tryText = "TRY FOR FREE!!!"
let tryTextMark = "!!!"
let substringRange = tryText.range(of: tryTextMark)!
let nsRange = NSRange(substringRange, in: tryText)
let attrStr = NSMutableAttributedString(string: tryText)
attrStr.addAttribute(NSAttributedString.Key.kern, value: -5, range: nsRange)
tryLabel.attributedText = attrStr
tryLabel.font = UIFont.systemFont(ofSize: 40 * kAppScale, weight: .heavy)
tryLabel.textColor = UIColor.white

let line1 = "Your Meditation Program\n"
let line2 = "Listen to meditation audio for weight-loss"
let attrString = NSMutableAttributedString(string: line1 + line2)

// 字体及颜色
attrString.addAttribute(.font, value: UIFont.systemFont(ofSize: 24 * kAppScale375, weight: .heavy), range: NSRange(location: 0, length: line1.count))
attrString.addAttribute(.foregroundColor, value: UIColor.black, range: NSRange(location: 0, length: line1.count))
attrString.addAttribute(.font, value: UIFont.systemFont(ofSize: 14 * kAppScale375, weight: .bold), range: NSRange(location: line1.count, length: line2.count))
attrString.addAttribute(.foregroundColor, value: UIColor.black, range: NSRange(location: line1.count, length: line2.count))

// 斜体
attrString.addAttribute(NSAttributedString.Key.obliqueness, value: 0.2, range: NSRange(location: line1.count, length: line2.count))

// 行间距
let style = NSMutableParagraphStyle()
style.lineSpacing = 10.0
attrString.addAttribute(.paragraphStyle, value: style, range: NSRange(location: 0, length: line1.count + line2.count))

self.listenLabel.attributedText = attrString
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

设置 UIDatePicker 时间为晚上 8 点：

```swift
picker.datePickerMode = .time
let calendar = Calendar.current
var components = DateComponents()
components.hour = 20
components.minute = 0
picker.setDate(calendar.date(from: components)!, animated: false)
```

[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)：是国际标准化组织的日期和时间的表示方法。

[RFC 3339](https://tools.ietf.org/html/rfc3339): This document defines a date and time format for use in Internet protocols that is a profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

日期格式：<https://nsdateformatter.com/>

Date 对象使用 +0 时区

```swift
let now = Date()
print(now) // 2020-07-16 07:12:02 +0000
```

Date 转 String

```swift
let dateFormatter = DateFormatter()
dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
dateFormatter.locale = Locale.current
let dateString = dateFormatter.string(from: now)
print(dateString) // 2020-07-16 15:15:17
```

根据用户的时区将 Date 转换为 Calendar

```swift
var calendar = Calendar.current
calendar.timeZone = TimeZone.current
let dateComponents = calendar.dateComponents([.year, .month, .day], from: now)
print(dateComponents) // year: 2020 month: 7 day: 16 isLeapMonth: false
```

初始化一个特定日期

```swift
// 初始化一个日期
let dateFormatter = DateFormatter()
dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
if let date617 = dateFormatter.date(from: "2020-06-17T23:59:59+0000") {
    print(date617)
}
```

# UIAlertController

```swift
let alert = UIAlertController(title: "", message: "", preferredStyle: .alert)
let cancel = UIAlertAction(title: "", style: .cancel) { (action) in
}
let ok = UIAlertAction(title: "", style: .default) { (action) in
}
alert.addAction(cancel)
alert.addAction(ok)
alert.preferredAction = ok
self.parentViewController?.present(alert, animated: true, completion: nil)
```

# Notification

```swift
/// 是否询问过通知权限
var notDetermined = false
UNUserNotificationCenter.current().getNotificationSettings { (settings) in
    if settings.authorizationStatus == .notDetermined {
        notDetermined = true
    }
}
UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { (granted, error) in
    if notDetermined && granted {
        // 首次询问并同意了
    } else if notDetermined && !granted {
        // 首次询问并拒绝了
    } else if !notDetermined && granted {
        // 用户之前已同意过了
    } else {
        // 用户之前已拒绝过了
    }
}
```
