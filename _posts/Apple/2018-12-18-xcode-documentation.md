---
title:  "Objective-C 和 Swift 的注释文档"
categories: [Apple]
---

# Swift
## 单行注释
```
/// 翻转摄像头
private var switchCameraButton: UIButton!
```

## 多行注释
```
/**
 Creates a JSON object
 - parameter object: the object
 - note: this does not parse a `String` into JSON, instead use `init(parseJSON: String)`
 - returns: the created JSON object
 */
public init(_ object: Any) {
}
```

# Objective-C
## 单行注释
```
/// 主题颜色
+ (UIColor *)mainColor;
```

## 多行注释
```
/**
 *  Convert SDImageFormat to UTType
 *  @param format Format as SDImageFormat
 *  @return The UTType as CFStringRef
 */
+ (nonnull CFStringRef)sd_UTTypeFromSDImageFormat:(SDImageFormat)format;
```