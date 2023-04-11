# 代码

## OptionSet

需求：用户通过点击按钮，回答问卷，可多选。

```swift
struct Answers: OptionSet {
    let rawValue: Int

    static let A = Answers(rawValue: 1 << 0)
    static let B = Answers(rawValue: 1 << 1)
    static let C = Answers(rawValue: 1 << 2)
    static let D = Answers(rawValue: 1 << 3)
    static let E = Answers(rawValue: 1 << 4)
    static let F = Answers(rawValue: 1 << 5)
    static let G = Answers(rawValue: 1 << 5)
    static let H = Answers(rawValue: 1 << 5)

    static let all: Answers = [.A, .B, .C, .D, .E, .F, .G, .H]
}
```

We can pass `.all` instead of [.all] if we want to select all answers. The reason for this is that OptionSet is an **object** that can be initialized using an array literal but it is not an array. Instead, it is an object that stands on its own and it uses a **single raw value** to represent all options that it holds.

```swift
let singleOption: ShippingOptions = .priority
let multipleOptions: ShippingOptions = [.nextDay, .secondDay, .priority]
let noOptions: ShippingOptions = []
var freeOptions: ShippingOptions = []
freeOptions.insert(.priority)
if freeOptions.contains(.priority) {}
```

用 python 打印出 100111 对应的选项 ABCF：

```py
base = 65
for i in range(0, 64):
    string = "{0:b}".format(i)
    N = len(string)
    res = str(i) + " "
    for j in range(N-1, -1, -1):
        if string[j] == '1':
            res += str(chr(base + N-j-1))
    print(res)
```

## String

是否匹配正则表达式：

```swift
var str = "HelloaZ0123___"
var str2 = "Hello, playground"
var str3 = "Hello???"

extension String {
    // 是否匹配正则表达式
    func matchRegex(_ pattern: String) -> Bool {
        guard let regex = try? NSRegularExpression(pattern: pattern, options: []) else { return false }
        let matches = regex.matches(in: self, options: [], range: NSRange(location: 0, length: self.count))
        return matches.count > 0
    }
}

str.matchRegex("^[A-Za-z0-9_]+$") // true
str2.matchRegex("^[A-Za-z0-9_]+$") // false
str3.matchRegex("^[A-Za-z0-9_]+$") // false
```

过滤，只允许数字、字母、小数点、下划线：

```swift
let str = "1A_2b_$9.99_¥8.88"
let set = CharacterSet.alphanumerics.union(CharacterSet.init(charactersIn: "_."))
let filted = String(v.unicodeScalars.filter(set.contains))
```

将秒数转换为时间字符串：

```swift
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

将秒数转换为 00:00 格式：

```swift
func str(from seconds: Int) -> String {
    let minute = seconds / 60
    let second = seconds - minute * 60
    var minuteStr = "\(minute)"
    if minuteStr.count == 1 {
        minuteStr = "0\(String(minuteStr.prefix(1)))"
    }
    var secondStr = "\(second)"
    if secondStr.count == 1 {
        secondStr = "0\(String(secondStr.prefix(1)))"
    }
    return "\(minuteStr):\(secondStr)"
}
```

计算 MD5：

```swift
extension String {
    var md5: String {
        guard !isEmpty else { return "" }
        // Create and initialize MD5 context:
        var context = CC_MD5_CTX()
        CC_MD5_Init(&context)
        let data = Data(self.utf8)
        // Read data and update MD5 context:
        data.withUnsafeBytes {
            _ = CC_MD5_Update(&context, $0.baseAddress, numericCast(data.count))
        }
        var digest: [UInt8] = Array(repeating: 0, count: Int(CC_MD5_DIGEST_LENGTH))
        _ = CC_MD5_Final(&digest, &context)
        let hex = digest.map { String(format: "%02hhx", $0) }.joined()
        return hex
    }
}

extension URL {
    var md5: String {
        return self.absoluteString.md5
    }
}
```

计算字符串的宽高：

```swift
extension String {
    func width(font: UIFont) -> CGFloat {
        return self.size(withAttributes: [.font: font]).width
    }

    func height(withConstrainedWidth width: CGFloat, font: UIFont) -> CGFloat {
        let constraintRect = CGSize(width: width, height: .greatestFiniteMagnitude)
        let boundingBox = self.boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, attributes: [.font: font], context: nil)

        return ceil(boundingBox.height)
    }

    func width(withConstrainedHeight height: CGFloat, font: UIFont) -> CGFloat {
        let constraintRect = CGSize(width: .greatestFiniteMagnitude, height: height)
        let boundingBox = self.boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, attributes: [.font: font], context: nil)

        return ceil(boundingBox.width)
    }
}
```

## Foundation

### URL

拼接参数到链接里：

```swift
var domain = "https://github.com"
var params = ["device": "iOS", "systemVersion": "13.2.2"]
var query = "?"
params.forEach { (key, value) in
    if let valueWithPercentEncoding = value.addingPercentEncoding(withAllowedCharacters: .alphanumerics) {
        query += key
        query += "="
        query += valueWithPercentEncoding
        query += "&"
    }
}
if query.last == "&" {
    query.removeLast()
}
print(domain + query)

if let url = URL(string: domain + query), let components = URLComponents(url: url, resolvingAgainstBaseURL: true), let queryItems = components.queryItems {
    var dict = [String: Any]()
    for item in queryItems {
        dict[item.name] = item.value
    }
}
```

### URLSession

断点续传：

```swift
/// 下载模型，实现了 URLSessionDataDelegate 用于断点续传
class NetworkDownloadModel: NSObject, URLSessionDataDelegate {
    /// 下载的 URL
    private var url: URL
    /// 下载文件的存放路径（注意带.temp后缀）
    private var destination: URL
    /// 临时文件，下载成功后再移到目的地
    private var tempDestination: URL
    /// 下载完成的回调
    private var completion: (Error?) -> Void
    /// 文件处理
    private var fileHandle: FileHandle?

    init(url: URL, destination: URL, completion: @escaping (Error?) -> Void) {
        self.url = url
        self.destination = destination
        self.completion = completion
        // 目的地创建一个tmp文件夹用于存放文件
        let tmp = destination.deletingLastPathComponent().appendingPathComponent("tmp")
        try? FileManager.default.createDirectory(at: tmp, withIntermediateDirectories: true, attributes: nil)
        self.tempDestination = tmp.appendingPathComponent(destination.lastPathComponent)
        super.init()
    }

    /// 执行下载任务
    ///
    /// - Parameter resumeAtBreakPoint: 是否断点续传
    @discardableResult
    func download(resumeAtBreakPoint: Bool) -> URLSessionDataTask {
        // 已下载的字节数
        var downloadedBytes: UInt64 = 0
        // 不断点续传的话，删掉旧的文件。
        if !resumeAtBreakPoint {
            try? FileManager.default.removeItem(at: tempDestination)
        }
        if FileManager.default.fileExists(atPath: tempDestination.path) {
            // 如果已经下载过，取得已下载的字节数
            if let fileDict = try? FileManager.default.attributesOfItem(atPath: tempDestination.path) as NSDictionary {
                downloadedBytes = fileDict.fileSize()
            }
        } else {
            // 如果未下载过，创建文件用于断点续传
            FileManager.default.createFile(atPath: tempDestination.path, contents: nil, attributes: nil)
        }
        var urlRequest = URLRequest(url: url)
        // 断点续传的 header
        if downloadedBytes > 0 {
            urlRequest.setValue("bytes=\(downloadedBytes)-", forHTTPHeaderField: "Range")
        }

        let configuration = URLSessionConfiguration.default
        configuration.httpMaximumConnectionsPerHost = 1
        let session = URLSession(configuration: configuration, delegate: self, delegateQueue: nil)
        let task = session.dataTask(with: urlRequest)
        task.resume()
        return task
    }

    // MARK: URLSessionDataDelegate
    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive response: URLResponse, completionHandler: @escaping (URLSession.ResponseDisposition) -> Void) {
        if let httpResponse = response as? HTTPURLResponse {
            if (200...299).contains(httpResponse.statusCode) {
                fileHandle = try? FileHandle(forUpdating: tempDestination)
                completionHandler(.allow)
            }
            else {
                try? FileManager.default.removeItem(at: tempDestination) // 出现服务器异常，删除旧的临时文件
                completionHandler(.cancel)
                completion(NSError(domain: "", code: httpResponse.statusCode, userInfo: nil))
            }
        }
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        fileHandle?.seekToEndOfFile()
        fileHandle?.write(data)
    }

    // 请求结束
    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        fileHandle?.closeFile()
        if error == nil {
            try? FileManager.default.moveItem(at: tempDestination, to: destination)
        }
        completion(error)
    }
}
```

失败重试：

```swift
func retry(times: Int, data: Data) {
    if times == 0 {
        return
    }
    upload(data, success: {}, failure: { error in
        retry(times: times - 1, data: data)
    })
}
```

### JSONSerialization

```swift
// 从bundle中读取一个json文件
if let url = Bundle.main.url(forResource: "stickers", withExtension: "json"),
    let data = try? Data(contentsOf: url),
    let jsonObject = try? JSONSerialization.jsonObject(with: data),
    let json = jsonObject as? [String: Any] {
     // ...
}

// json 字符串转成字典
if let data = json.data(using: .utf8), let dict = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
    logEventCount(code, dict: dict)
}
```

### 文件目录

```swift
var DocumentDirectory: URL {
    return FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
//    return NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first!
}

var CacheDirectory: URL {
    return FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
}

func VideoDirectory() -> URL {
    let url = DocumentDirectory.appendingPathComponent("Video", isDirectory: true)
    // create folder if not exist
    try? FileManager.default.createDirectory(at: url, withIntermediateDirectories: true, attributes: nil)
    return url
}
```

### Bundle

```swift
private let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1.0"
private let buildVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "1"
private let osVersion = UIDevice.current.systemVersion
private let deviceString = DeviceGuru().hardwareString() // dependency: DeviceGuru
private let idfv = UIDevice.current.identifierForVendor?.uuidString
private let systemLanguage = Locale.preferredLanguages.first // 设置 - 通用 - 语言与地区 - 首选语言顺序（第一位）
private let regionCode = Locale.current.regionCode // 国家或地区
UIDevice.current.isBatteryMonitoringEnabled = true
```

### Date

获取当前时间：

```swift
private func getCurrentDate() -> String {
    let dateFormater = DateFormatter()
    dateFormater.dateFormat = "yyyyMMdd"
    return dateFormater.string(from: Date())
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

### NSAttributedString

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

## UIViewController

### UITabBarController

圆角 TabBar

```swift
class TabBarController: UITabBarController, UITabBarControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        let sleep = ("sleep_icon_normal", "sleep_icon_hover", "Sleep")
        let sounds = ("sounds_icon_normal", "sounds_icon_hover", "Sounds")
        let more = ("more_icon_normal", "more_icon_hover", "More")
        let tabTuples = [sleep, sounds, more]

        var viewControllers = [UIViewController]()
        for i in 0 ..< tabTuples.count {
            let vc = ViewController()
            let nav = UINavigationController(rootViewController: vc)
            nav.tabBarItem.image = UIImage(named: tabTuples[i].0)
            nav.tabBarItem.selectedImage = UIImage(named: tabTuples[i].1)
            nav.tabBarItem.title = tabTuples[i].2
            viewControllers.append(nav)
        }

        self.viewControllers = viewControllers
        self.selectedIndex = 0
        self.tabBar.tintColor = UIColor.white
        self.tabBar.unselectedItemTintColor = UIColor.white.withAlphaComponent(0.42)
        self.tabBar.backgroundColor = UIColor(red: 16/255, green: 16/255, blue: 16/255, alpha: 1)
        self.tabBar.backgroundImage = UIImage.from(color: .clear)
        self.tabBar.shadowImage = UIImage()
    }

    override func viewWillLayoutSubviews() {
        let cornerRadius: CGFloat = 30.0
        if #available(iOS 11.0, *) {
            self.tabBar.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
            self.tabBar.layer.cornerRadius = cornerRadius
        } else {
            let bezierpath = UIBezierPath.init(roundedRect: self.tabBar.bounds, byRoundingCorners: [UIRectCorner.topLeft, UIRectCorner.topRight], cornerRadii: CGSize(width: cornerRadius, height: cornerRadius))
            let shape = CAShapeLayer()
            shape.path = bezierpath.cgPath
            self.tabBar.layer.mask = shape
        }
    }
}
```

### UIAlertController

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

### UINavigationController

解决 push 和 pop 时动画卡顿问题：

```swift
// 背景图片的contentMode不对
if let path = Bundle.main.path(forResource: "skin_preview_background", ofType: "png"), let image = UIImage(contentsOfFile: path) {
    let imageView = UIImageView(frame: view.bounds)
    imageView.image = image
    imageView.contentMode = .scaleToFit
    view.addSubview(imageView)
}

// 当前vc的背景色设为白色
self.view.backgroundColor = .white
```

## UIView

### tableHeaderView, tableFooterView

extension UIView {
/// 创建一个占位的 UIView，这是用于 tableHeaderView 和 tableFooterView
/// When assigning a view to this property, set the height of that view to a nonzero value.
/// 否则，tableHeaderView 和 tableFooterView 的高度会无法正确刷新
static func tableHeaderFooterPlaceholder() -> UIView {
return UIView(frame: CGRect(x: 0, y: 0, width: CGFloat.leastNormalMagnitude, height: CGFloat.leastNormalMagnitude))
}
}

### 圆角

```swift
override func layoutSubviews() {
    let cornerRadius: CGFloat = 20
    if #available(iOS 11.0, *) {
        self.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        self.layer.cornerRadius = cornerRadius
    } else {
        let bezierpath = UIBezierPath.init(roundedRect: self.bounds, byRoundingCorners: [UIRectCorner.topLeft, UIRectCorner.topRight], cornerRadii: CGSize(width: cornerRadius, height: cornerRadius))
        let shape = CAShapeLayer()
        shape.path = bezierpath.cgPath
        self.layer.mask = shape
    }
}
```

### UILabel

带内边距：

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

### UIButton

图片在上面，文字在下面：

```swift
extension UIButton {
    func centerVertically(padding: CGFloat = 6.0) {
        guard let imageViewSize = currentImage?.size, let titleLabelSize = titleLabel?.intrinsicContentSize else { return }
        imageEdgeInsets = UIEdgeInsets.only(top: -(titleLabelSize.height + padding), right: -titleLabelSize.width)
        titleEdgeInsets = UIEdgeInsets.only(left: -imageViewSize.width, bottom: -(imageViewSize.height + padding))
    }
}
```

扩大点击区域：

```swift
private var pTouchAreaEdgeInsets: UIEdgeInsets = .zero
extension UIButton {
    public var touchAreaEdgeInsets: UIEdgeInsets {
        get {
            if let value = objc_getAssociatedObject(self, &pTouchAreaEdgeInsets) as? NSValue {
                var edgeInsets: UIEdgeInsets = .zero
                value.getValue(&edgeInsets)
                return edgeInsets
            }
            else {
                return .zero
            }
        }
        set {
            var newValueCopy = newValue
            let objCType = NSValue(uiEdgeInsets: .zero).objCType
            let value = NSValue(&newValueCopy, withObjCType: objCType)
            objc_setAssociatedObject(self, &pTouchAreaEdgeInsets, value, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        }
    }

    override open func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
        if self.isHidden || !self.isEnabled || self.touchAreaEdgeInsets == .zero {
            return super.point(inside: point, with: event)
        }
        let newRect = self.bounds.inset(by: self.touchAreaEdgeInsets)
        return newRect.contains(point)
    }
}
```

按钮左对齐（左边图片，右边文字）：

```swift
class LeftAlignedIconButton: UIButton {
    override func titleRect(forContentRect contentRect: CGRect) -> CGRect {
        let titleRect = super.titleRect(forContentRect: contentRect)
        let imageSize = currentImage?.size ?? .zero
        let availableWidth = contentRect.width - imageEdgeInsets.right - imageSize.width - titleRect.width
        return titleRect.offsetBy(dx: round(availableWidth / 2), dy: 0)
    }
}
```

按钮状态的组合：

```swift
// https://www.jianshu.com/p/bd232eac8de8
button.setImage(image, for: UIControlState.selected.union(.highlighted))
```

### UICollectionView

实现一个左右滑动的轮播图，每张图的大小略小于屏幕宽度，显示第一张图时，第二张图能稍微露出一点点。

Many solutions presented here result in some weird behaviour that doesn't feel like properly implemented paging.

The solution presented in [this tutorial](https://medium.com/@shaibalassiano/tutorial-horizontal-uicollectionview-with-paging-9421b479ee94), however, doesn't seem to have any issues. It just feels like a perfectly working paging algorithm. You can implement it in 5 simple steps:

Add the following property to your type: `private var indexOfCellBeforeDragging = 0`

Set the collectionView delegate like this: `collectionView.delegate = self`

Add conformance to UICollectionViewDelegate: `YourType: UICollectionViewDelegate { }`

Add the following method to the extension implementing the UICollectionViewDelegate conformance and set a value for pageWidth:

```swift
func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
    let pageWidth = // The width your page should have (plus a possible margin)
    let proportionalOffset = collectionView.contentOffset.x / pageWidth
    indexOfCellBeforeDragging = Int(round(proportionalOffset))
}
```

Add the following method to the extension implementing the UICollectionViewDelegate conformance, set the same value for pageWidth (you may also store this value at a central place) and set a value for collectionViewItemCount:

```swift
func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
    // Stop scrolling
    targetContentOffset.pointee = scrollView.contentOffset
    // Calculate conditions
    let pageWidth = // The width your page should have (plus a possible margin)
    let collectionViewItemCount = // The number of items in this section
    let proportionalOffset = collectionView.contentOffset.x / pageWidth
    let indexOfMajorCell = Int(round(proportionalOffset))
    let swipeVelocityThreshold: CGFloat = 0.5
    let hasEnoughVelocityToSlideToTheNextCell = indexOfCellBeforeDragging + 1 < collectionViewItemCount && velocity.x > swipeVelocityThreshold
    let hasEnoughVelocityToSlideToThePreviousCell = indexOfCellBeforeDragging - 1 >= 0 && velocity.x < -swipeVelocityThreshold
    let majorCellIsTheCellBeforeDragging = indexOfMajorCell == indexOfCellBeforeDragging
    let didUseSwipeToSkipCell = majorCellIsTheCellBeforeDragging && (hasEnoughVelocityToSlideToTheNextCell || hasEnoughVelocityToSlideToThePreviousCell)

    if didUseSwipeToSkipCell {
        // Animate so that swipe is just continued
        let snapToIndex = indexOfCellBeforeDragging + (hasEnoughVelocityToSlideToTheNextCell ? 1 : -1)
        let toValue = pageWidth * CGFloat(snapToIndex)
        UIView.animate(
            withDuration: 0.3,
            delay: 0,
            usingSpringWithDamping: 1,
            initialSpringVelocity: velocity.x,
            options: .allowUserInteraction,
            animations: {
                scrollView.contentOffset = CGPoint(x: toValue, y: 0)
                scrollView.layoutIfNeeded()
            },
            completion: nil
        )
    } else {
        // Pop back (against velocity)
        let indexPath = IndexPath(row: indexOfMajorCell, section: 0)
        collectionView.scrollToItem(at: indexPath, at: .left, animated: true)
    }
}
```

### UIWindow

新建项目后如何从代码中加载 ViewController 而不是 Storyboard？

```swift
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }
        let window = UIWindow(windowScene: windowScene)
        let vc = ViewController()
        window.rootViewController = vc
        window.makeKeyAndVisible()
        self.window = window
    }
}
```

另外，删除 Info.plist 里面的两项有关 Storyboard 的键值。

## UIView 截图

```swift
extension UIView {
    func snapshot() -> UIImage {
        UIGraphicsBeginImageContextWithOptions(bounds.size, false, UIScreen.main.scale)
        drawHierarchy(in: bounds, afterScreenUpdates: true)
        let result = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        return result
    }

    func renderAsImage() -> UIImage {
        let renderer = UIGraphicsImageRenderer(bounds: bounds)
        return renderer.image { rendererContext in
            layer.render(in: rendererContext.cgContext)
        }
    }
}
```

## CALayer

### CAShapeLayer

CAShapeLayer 画圆：

```swift
let circleView = UIView(frame: CGRect(x: 0, y: 0, width: 100, height: 100))
circleView.center = CGPoint(x: kMainScreenWidth/2, y: kMainScreenHeight*0.7)
let shapeLayer = CAShapeLayer()
let bezierPath = UIBezierPath(ovalIn: circleView!.bounds)
shapeLayer.path = bezierPath.cgPath
shapeLayer.strokeColor = UIColor.white.cgColor
shapeLayer.lineWidth = 5.0
shapeLayer.strokeStart = 0
shapeLayer.strokeEnd = 1
shapeLayer.fillColor = UIColor.clear.cgColor
circleView.layer.addSublayer(shapeLayer)
circleView.isUserInteractionEnabled = false
self.view.addSubview(circleView)
```

部分圆角：

```swift
let maskPath = UIBezierPath(roundedRect: normalView.bounds, byRoundingCorners: [UIRectCorner.topLeft, UIRectCorner.topRight], cornerRadii: CGSize(width: 10, height: 10))
let maskLayer = CAShapeLayer()
maskLayer.frame = normalView.bounds
maskLayer.path = maskPath.cgPath
normalView.layer.mask = maskLayer
```

### CAGradientLayer

从左到右渐变色，添加子图层方式：

```swift
let color1 = UIColor(rgba: "#F4DEA9")
let color2 = UIColor(rgba: "#F4C467")
let gradientColors: [CGColor] = [color1.cgColor, color2.cgColor]
let gradientLayer = CAGradientLayer()
gradientLayer.colors = gradientColors
gradientLayer.startPoint = CGPoint(x: 0, y: 0)
gradientLayer.endPoint = CGPoint(x: 1, y: 0)
gradientLayer.frame = unlockButton.bounds
button.layer.insertSublayer(gradientLayer, at: 0)
```

从左到右渐变色，UIView backing layer：

```swift
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

## UIImage

图片模糊处理：

```swift
/// 图片模糊效果处理
/// - parameter image: 需要处理的图片
/// - parameter level: 模糊程度（0~1）
func blurry(_ image: UIImage, level: CGFloat) -> UIImage {

    // boxSize 必须大于 0
    let boxSize = level - level.truncatingRemainder(dividingBy: 2) + 1

    let _cgImage = image.cgImage

    // 图像缓存: 输入缓存、输出缓存
    var inBuffer = vImage_Buffer()
    var outBuffer = vImage_Buffer()
    var error = vImage_Error()

    let inProvider = _cgImage?.dataProvider
    let inBitmapData = inProvider?.data

    inBuffer.width = vImagePixelCount((_cgImage?.width)!)
    inBuffer.height = vImagePixelCount((_cgImage?.height)!)
    inBuffer.rowBytes = (_cgImage?.bytesPerRow)!
    inBuffer.data = UnsafeMutableRawPointer(mutating: CFDataGetBytePtr(inBitmapData!))

    // 像素缓存
    let pixelBuffer = malloc((_cgImage?.bytesPerRow)! * (_cgImage?.height)!)
    outBuffer.data = pixelBuffer
    outBuffer.width = vImagePixelCount((_cgImage?.width)!)
    outBuffer.height = vImagePixelCount((_cgImage?.height)!)
    outBuffer.rowBytes = (_cgImage?.bytesPerRow)!

    // 中间缓存区, 抗锯齿
    let pixelBuffer2 = malloc((_cgImage?.bytesPerRow)! * (_cgImage?.height)!)
    var outBuffer2 = vImage_Buffer()
    outBuffer2.data = pixelBuffer2
    outBuffer2.width = vImagePixelCount((_cgImage?.width)!)
    outBuffer2.height = vImagePixelCount((_cgImage?.height)!)
    outBuffer2.rowBytes = (_cgImage?.bytesPerRow)!

    error = vImageBoxConvolve_ARGB8888(&inBuffer, &outBuffer2, nil, 0, 0, UInt32(boxSize), UInt32(boxSize), nil, vImage_Flags(kvImageEdgeExtend))
    error = vImageBoxConvolve_ARGB8888(&outBuffer2, &outBuffer, nil, 0, 0, UInt32(boxSize), UInt32(boxSize), nil, vImage_Flags(kvImageEdgeExtend))

    if error != kvImageNoError {
        debugPrint(error)
    }

    let colorSpace = CGColorSpaceCreateDeviceRGB()
    let ctx = CGContext(data: outBuffer.data, width: Int(outBuffer.width), height: Int(outBuffer.height), bitsPerComponent: 8, bytesPerRow: outBuffer.rowBytes, space: colorSpace, bitmapInfo: (_cgImage?.bitmapInfo.rawValue)!)

    let finalCGImage = ctx!.makeImage()
    let finalImage = UIImage(cgImage: finalCGImage!)

    free(pixelBuffer!)
    free(pixelBuffer2!)

    return finalImage
}

extension UIImage {
    func blurred(radius: CGFloat) -> UIImage {
        let ciContext = CIContext(options: nil)
        guard let cgImage = cgImage else { return self }
        let inputImage = CIImage(cgImage: cgImage)
        guard let ciFilter = CIFilter(name: "CIGaussianBlur") else { return self }
        ciFilter.setValue(inputImage, forKey: kCIInputImageKey)
        ciFilter.setValue(radius, forKey: kCIInputRadiusKey)
        guard let resultImage = ciFilter.value(forKey: kCIOutputImageKey) as? CIImage else { return self }
        guard let cgImage2 = ciContext.createCGImage(resultImage, from: inputImage.extent) else { return self }
        return UIImage(cgImage: cgImage2)
    }
}

extension UIImage {
    public func blur(size: Float) -> UIImage! {

        let boxSize = size - size.truncatingRemainder(dividingBy: 2) + 1

        guard let image = self.cgImage else { return nil }

        let height = vImagePixelCount(image.height)
        let width = vImagePixelCount(image.width)
        let bytesPerRow = image.bytesPerRow

        let inBitmapData = image.dataProvider!.data!
        let inData = UnsafeMutableRawPointer(mutating: CFDataGetBytePtr(inBitmapData))
        var inBuffer = vImage_Buffer(data: inData, height: height, width: width, rowBytes: bytesPerRow)

        let outData = malloc(bytesPerRow * Int(height))
        var outBuffer = vImage_Buffer(data: outData, height: height, width: width, rowBytes: bytesPerRow)

        let _ = vImageBoxConvolve_ARGB8888(&inBuffer, &outBuffer, nil, 0, 0, UInt32(boxSize), UInt32(boxSize), nil, vImage_Flags(kvImageEdgeExtend))

        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let context = CGContext(data: outBuffer.data, width: Int(outBuffer.width), height: Int(outBuffer.height), bitsPerComponent: 8, bytesPerRow: outBuffer.rowBytes, space: colorSpace, bitmapInfo: image.bitmapInfo.rawValue)
        let imageRef = context!.makeImage()
        let bluredImage = UIImage(cgImage: imageRef!)

        free(outData)
        return bluredImage
    }
}

```

生成纯色图片：

```swift
extension UIImage {
    static func from(color: UIColor) -> UIImage {
        let rect = CGRect(x: 0, y: 0, width: 1, height: 1)
        UIGraphicsBeginImageContext(rect.size)
        let context = UIGraphicsGetCurrentContext()
        context!.setFillColor(color.cgColor)
        context!.fill(rect)
        let img = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return img!
    }
}
```

降采样：

```swift
    // data buffer - 图片从磁盘文件加载到内存中，这是经过编码的图片数据
    // image buffer - 图片解码后的数据，每个元素描述一个图片像素的颜色信息，buffer 的大小为 width*height*4 (rgba)
    // frame buffer - 类似于OpenGL的Frame Buffer，用于上传到GPU中成像

    // Downsampling large images for display at smaller size
    public class func downsample(imageAt imageURL: URL, to pointSize: CGSize, scale: CGFloat) -> UIImage? {
        // 设置`kCGImageSourceShouldCache`为`false`，可以避免缓存解码后的数据，64位设置上默认是开启缓存的
        let imageSourceOptions = [kCGImageSourceShouldCache: false] as CFDictionary
        if let imageSource = CGImageSourceCreateWithURL(imageURL as CFURL, imageSourceOptions) {
            return downsample(imageAt: imageSource, to: pointSize, scale: scale)
        } else {
            return nil
        }
    }

    public class func downsample(imageAt imageData: Data, to pointSize: CGSize, scale: CGFloat) -> UIImage? {
        let imageSourceOptions = [kCGImageSourceShouldCache: false] as CFDictionary
        if let imageSource = CGImageSourceCreateWithData(imageData as CFData, imageSourceOptions) {
            return downsample(imageAt: imageSource, to: pointSize, scale: scale)
        } else {
            return nil
        }
    }

    public class func downsample(imageAt imageSource: CGImageSource, to pointSize: CGSize, scale: CGFloat) -> UIImage? {
        let maxDimensionInPixels = max(pointSize.width, pointSize.height) * scale
        let downsampleOptions =
            [kCGImageSourceCreateThumbnailFromImageAlways: true,
             kCGImageSourceShouldCacheImmediately: true,
             kCGImageSourceCreateThumbnailWithTransform: true,
             kCGImageSourceThumbnailMaxPixelSize: maxDimensionInPixels] as CFDictionary
        if let downsampledImage =
            CGImageSourceCreateThumbnailAtIndex(imageSource, 0, downsampleOptions) {
            return UIImage(cgImage: downsampledImage)
        } else {
            return nil
        }
    }
```

生成渐变色图片：

```swift
func generateGradientImage(colors: [UIColor], imageSize: CGSize) -> UIImage? {
    let cgColors = colors.map{ $0.cgColor }
    let gradientLayer = CAGradientLayer()
    let frame = CGRect(origin: .zero, size: imageSize)
    gradientLayer.frame = frame
    gradientLayer.colors = cgColors
    gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.5)
    gradientLayer.endPoint = CGPoint(x: 1.0, y: 0.5)

    UIGraphicsBeginImageContextWithOptions(gradientLayer.frame.size, gradientLayer.isOpaque, 0.0);

    guard let context = UIGraphicsGetCurrentContext() else { return nil }
    gradientLayer.render(in: context)
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()

    return image
}
```

修改曝光值：

```swift
extension UIImage {
    func exposure(_ exposure: Float) -> UIImage {
        if let cgImage = self.cgImage {
            let context = CIContext()
            let ciImage = CIImage(cgImage: cgImage)
            let filter = CIFilter(name: "CIExposureAdjust")
            filter?.setValue(ciImage, forKey: kCIInputImageKey)
            filter?.setValue(exposure, forKey: kCIInputEVKey)
            if let outputImage = filter?.outputImage, let imageRef = context.createCGImage(outputImage, from: ciImage.extent) {
                let uiImage = UIImage(cgImage: imageRef)
                return uiImage
            }
        }
        return self
    }
}
```

## UIColor

hex 颜色：

```swift
extension UIColor {
    public convenience init(hex: Int) {
        let red: CGFloat = CGFloat((hex >> 16) & 0x0000FF) / 255.0
        let green: CGFloat = CGFloat((hex >> 8) & 0x0000FF) / 255.0
        let blue: CGFloat = CGFloat(hex & 0x0000FF) / 255.0
        self.init(red:red, green:green, blue:blue, alpha:1.0)
    }
}
```

## Media Player

[Becoming a Now Playable App](https://developer.apple.com/documentation/mediaplayer/becoming_a_now_playable_app)

## 页面时长统计打点

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
