# Foundation

## NSURL

![img](/img/30CFBF55-675D-4B0F-BAB0-AB5AB334B02C.png)

```objc
[NSCharacterSet URLQueryAllowedCharacterSet]

!$&'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~
```

## NSDictionary

![img](/img/93698EA5-9091-4948-AE04-9578DA6C21EF.png)

![img](/img/76F80401-4BF8-46EC-956C-2DEBA19916EE.png)

![img](/img/566E914F-51E1-4FB8-AC3B-97CF74C35225.png)

![img](/img/C950B878-C18D-44E8-8120-4862370A7D9C.png)

## KVO

```c
[self.tableView addObserver:self forKeyPath:@"contentInset" options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld context:nil];

#pragma mark - KVO

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary<NSKeyValueChangeKey, id> *)change
                       context:(void *)context {
    if (object == self.tableView && [keyPath isEqualToString:@"contentInset"]) {
    }
}

- (void)dealloc {
    [self.tableView removeObserver:self forKeyPath:@"contentInset"];
}

#import <KVOController/KVOController.h>

[self.KVOController observe:self keyPath:@"startPageTopBarStatus" options:NSKeyValueObservingOptionNew block:^(id observer, id object, NSDictionary<NSString *,id> *change) {
}];
```

## 时间戳

时间戳字符串：

```objc
NSTimeInterval timestamp = [[NSDate date] timeIntervalSince1970];
NSString *timestampString = [@(ceil(timestamp)) stringValue];
```

## 日期格式化字符串

```c
// 这个初始化比较耗时，用单例持有
+ (NSDateFormatter *)dateFormatter {
    static NSDateFormatter *dateFormatter = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        dateFormatter = [[NSDateFormatter alloc] init];
    });
    return dateFormatter;
}

+ (NSString *)displayStringWithTime:(NSTimeInterval)browseTime {
    /**
     最近一次保存（关闭）时间，时间展示：具体到分钟
     - 60分钟内则展示“xxx分钟前”
     - “今天”/“昨天”/“前天”打开的文件直接用文案“今天”/“昨天”/“前天”
     - 往前时间展示格式“xx月xx日”
     - 非当前年份时需要在前面加上年份“xx年xx月xx日”
     */
    NSDate *date = [NSDate date]; // 当前时间
    NSDate *browseDate = [NSDate dateWithTimeIntervalSince1970:browseTime];
    NSTimeInterval diff = [date timeIntervalSinceDate:browseDate];
    if (diff < 60 * 60) {
        NSUInteger minute = diff / 60;
        return [NSString stringWithFormat:@"%@分钟前", @(minute > 0 ? minute : 1)];
    } else if ([[NSCalendar currentCalendar] isDateInToday:browseDate]) {
        return @"今天";
    } else if ([[NSCalendar currentCalendar] isDateInYesterday:browseDate]) {
        return @"昨天";
    } else {
        NSCalendarUnit units = NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear;
        NSDateComponents *today = [[NSCalendar currentCalendar] components:units fromDate:date];
        NSDateComponents *ref = [[NSCalendar currentCalendar] components:units fromDate:browseDate];
        NSDateComponents *components = [[NSCalendar currentCalendar] components:units fromDate:browseDate toDate:[NSDate date] options:0];
        if (components.year < 0 && components.month < 0 && components.day >= 2 && components.day < 3) {
            return @"前天";
        } else if (today.year == ref.year) {
            [[self dateFormatter] setDateFormat:@"MM-dd"];
            return [self.dateFormatter stringFromDate:browseDate];
        } else {
            [[self dateFormatter] setDateFormat:@"yyyy-MM-dd"];
            return [self.dateFormatter stringFromDate:browseDate];
        }
    }
}
```

## NSError

> `-[NSError init]` called; this results in an invalid `NSError` instance. It will raise an exception in a future release. Please call `errorWithDomain:code:userInfo:` or `initWithDomain:code:userInfo:`. This message shown only once.

```c
[NSError errorWithDomain:NSCocoaErrorDomain code:NSUserCancelledError userInfo:nil]
[NSError errorWithDomain:AVFoundationErrorDomain code:AVErrorUnknown userInfo:nil]
```

## base64 字符串编码

```c
- (NSString *)base64Decoded:(NSString *)originString {
    NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:originString options:0];
    NSString *decodedString = [[NSString alloc] initWithData:decodedData encoding:NSUTF8StringEncoding];
    return decodedString;
}
```

## 计算文本行数

```c
NSInteger lineCount = 0;
CGSize textSize = CGSizeMake(self.titleView.frame.size.width, MAXFLOAT);
long rHeight = lroundf([self.titleView sizeThatFits:textSize].height);
long charSize = lroundf(self.titleView.font.lineHeight);
lineCount = rHeight/charSize;
```

## NS_ERROR_ENUM

```c
// 注意命名是 xxxError
typedef NS_ERROR_ENUM(GCDAsyncSocketErrorDomain, GCDAsyncSocketError) {
    GCDAsyncSocketNoError = 0,           // Never used
    GCDAsyncSocketBadConfigError,        // Invalid configuration
    GCDAsyncSocketBadParamError,         // Invalid parameter was passed
    GCDAsyncSocketConnectTimeoutError,   // A connect operation timed out
    GCDAsyncSocketReadTimeoutError,      // A read operation timed out
    GCDAsyncSocketWriteTimeoutError,     // A write operation timed out
    GCDAsyncSocketReadMaxedOutError,     // Reached set maxLength without completing
    GCDAsyncSocketClosedError,           // The remote peer closed the connection
    GCDAsyncSocketOtherError,            // Description provided in userInfo
};
```

## 向前声明

不建议使用前置声明，理由：

1. 头文件没有 self-contain
2. 引用来源再也无法确定了
3. 影响文件依赖分析结果

编译加速可以通过其他方式解决，比如 bazel，但上述 3 个缺点没有解决方案。

## 禁用编译警告

[Diagnostic flags in Clang — Clang 13 documentation](https://clang.llvm.org/docs/DiagnosticsReference.html)

```c
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
#pragma clang diagnostic ignored "-Wdeprecated-implementations"
#pragma clang diagnostic ignored "-Wunused-variable"
#pragma clang diagnostic ignored "-Wunreachable-code"
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
...
#pragma clang diagnostic pop
```

## NS_UNAVAILABLE

```c
+ (instancetype)new NS_UNAVAILABLE;
- (instancetype)init NS_UNAVAILABLE;
```

## Notification

```c
// .h
FOUNDATION_EXPORT NSNotificationName const ABCNotification;
// .m
NSNotificationName const ABCNotification = @"ABCNotification";

- (void)testThirdInvokeNotifications {
    XCTNSNotificationExpectation *notificationExpectation = [[XCTNSNotificationExpectation alloc] initWithName:ABCNotification];
    // post notification
    [self waitForExpectations:@[ notificationExpectation ] timeout:1];
}
```

## NSString

URL 编码：

```
NSString *encoded = [str stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
```

## 可变参数

```c
/// 记录运营日志
/// @param format 格式，可变参数
- (void)log:(NSString *)format, ...;

- (void)log:(NSString *)format, ... {
    va_list args;
    va_start(args, format);
    NSString *message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    NSLog(@"%@", message);
}
```

## 打印指针地址

```objc
NSString *str = @"Susan";
NSLog(@"指针所指对象的内存地址：%p", str); // 堆区，低地址区
NSLog(@"指针本身的内存地址：%p", &str); // 栈区，高地址区
```

打印 `CGRect`：`NSLog(@"%@", NSStringFromCGRect(frame));`

## 内存缓存

```c
SDImageCacheConfig *config = [[SDImageCacheConfig alloc] init];
// 最大内存消耗，判断一下是不是小内存手机
config.maxMemoryCost = SystemInfo_isGTE2GBDevice() ? 314572800 : 157286400;
SDMemoryCache *cache = [[SDMemoryCache alloc] initWithConfig:config];
```

## 访问 Bundle 资源

```c
NSBundle *bundle = [NSBundle bundleWithPath:[[NSBundle mainBundle] pathForResource:@"ToolkitLibResource" ofType:@"bundle"]];
NSURL *URL = [bundle URLForResource:@"PageTranslation" withExtension:@".js"];

NSBundle *bundle = [NSBundle bundleWithPath:[[NSBundle bundleForClass:[self class]] pathForResource:@"ARScanLibTestResource" ofType:@"bundle"]];
NSString *flowerDataPath = [bundle pathForResource:@"flowerData" ofType:@"json"];
```

## 读取 Cookie

```c
- (void)logOpenThemeID {
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSArray<NSHTTPCookie *> *cookies = [cookieStorage cookiesForURL:self.URL];
    NSString *openThemeID = @"";
    for (NSHTTPCookie *cookie in cookies) {
        if ([cookie.name isEqualToString:@"open_theme_id"]) {
            openThemeID = cookie.value;
        }
    }
    NSLog(@"Cookie - [open_theme_id : %@]", openThemeID);
}
```

## NSAttributedString

```objc
NSString *string = @"Hello, world!";

UIFont *font = [UIFont systemFontOfSize:14];
NSMutableParagraphStyle *style = [[NSParagraphStyle defaultParagraphStyle] mutableCopy];
[style setLineBreakMode:NSLineBreakByWordWrapping];

NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:string];
NSDictionary *attributes = @{NSFontAttributeName: font, NSParagraphStyleAttributeName: style};
[attributedString addAttributes:attributes range:NSRangeFromString(string)];

UITextView *textView = [[UITextView alloc] init];
textView.attributedText = attributedString;
textView.font = font;
textView.textColor = UIColor.blueColor;
textView.backgroundColor = UIColor.clearColor;
textView.editable = NO;
self.textView = textView;
[self.containerView addSubview:textView];

CGSize constrainedSize = CGSizeMake(UIScreen.mainScreen.bounds.size.width - 30 * 2, MAXFLOAT);
CGRect rect = [string boundingRectWithSize:constrainedSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attributes context:nil];
```

## 字符串枚举

```objc title='Demo.h'
typedef NSString *FileTypeStringEnum NS_STRING_ENUM;
FOUNDATION_EXPORT FileTypeStringEnum const FileTypeStringEnumDoc;
```

```objc title='Demo.m'
FileTypeStringEnum const FileTypeStringEnumDoc = @"doc";
```
