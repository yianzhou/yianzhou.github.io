# UIKit

## Masonry

```c
NSArray *buttons = @[ button1, button2 ];
[buttons mas_makeConstraints:^(MASConstraintMaker *make) {
    make.centerY.mas_equalTo(0);
    make.height.mas_equalTo(60);
}];
[buttons mas_distributeViewsAlongAxis:MASAxisTypeHorizontal withFixedSpacing:30 leadSpacing:30 tailSpacing:30];
```

## UIViewController 自定义视图

```c
- (void)loadView {
    [super loadView];
    self.bgView = [[FileView alloc] initWithFrame:self.view.bounds];
    self.view = self.bgView;
}
```

## UITableView

```c
UITableView *tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleGrouped];
self.tableView = tableView;
[self.view addSubview:tableView];
tableView.delegate = self;
tableView.dataSource = self;
tableView.showsVerticalScrollIndicator = NO;
tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
tableView.bounces = YES;
tableView.allowsMultipleSelectionDuringEditing = YES;
tableView.estimatedRowHeight = 72;
tableView.directionalLockEnabled = YES;
tableView.rowHeight = UITableViewAutomaticDimension;
tableView.delaysContentTouches = NO;
tableView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
[tableView registerClass:[FileFieldLocalDocCell class] forCellReuseIdentifier:[FileFieldLocalDocCell identifier]];
[tableView registerClass:[FileFieldOnlineFolderCell class] forCellReuseIdentifier:[FileFieldOnlineFolderCell identifier]];
[tableView registerClass:[FileFieldOnlineDocCell class] forCellReuseIdentifier:[FileFieldOnlineDocCell identifier]];
tableView.backgroundColor = [UIColor clearColor];
// 长按进入编辑态
UILongPressGestureRecognizer *recognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(longPressAction:)];
[tableView addGestureRecognizer:recognizer];
#ifdef __IPHONE_15_0
    if (@available(iOS 15.0, *)) {
        tableView.sectionHeaderTopPadding = 0;
    }
#endif
```

## -[UITableView setTableFooterView:]

```c
 // 宽高要给个最小值，不然的话高度就会变成默认的 35，导致头部空出一段距离
UIView *emptyView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, CGFLOAT_MIN, CGFLOAT_MIN)];
[self.tableView setTableFooterView:emptyView];
```

## UITableView 选中态

```c
// 如果有已选中的cell，则先记住路径、再reloadData、再重新选中，让它们保持住原本的选中状态
NSArray<NSIndexPath *> *indexPaths = [self.tableView indexPathsForSelectedRows];
[self.tableView reloadData];
if (self.tableView.isEditing && indexPaths.count > 0) {
    for (NSIndexPath *indexPath in indexPaths) {
        [self.tableView selectRowAtIndexPath:indexPath animated:NO scrollPosition:UITableViewScrollPositionNone];
    }
}
```

## UIScrollView 嵌套

上下滑动时左右不能滑动：

```c title="FileScrollView.h"
@protocol FileScrollViewDelegate <NSObject>

- (BOOL)fileScrollView:(FileScrollView *)scrollView
    shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer;

@end

@interface FileScrollView : UIScrollView

@property (nonatomic, weak) id<FileScrollViewDelegate> delegate;

@end
```

```c title="FileScrollView.m"
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer
    shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer {
    // 返回YES的话，滑动事件会随着响应链传递，本层和上层共同处理；返回No的话则只在本层处理。
    if ([self.delegate respondsToSelector:@selector(fileScrollView:shouldRecognizeSimultaneouslyWithGestureRecognizer:)]) {
        return [self.delegate fileScrollView:self shouldRecognizeSimultaneouslyWithGestureRecognizer:otherGestureRecognizer];
    }
    return NO;
}
```

## 扩大按钮点击区域

```c title="ExpandAreaButton.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ExpandAreaButton : UIButton

/// 需要扩大的矩形响应区域
- (instancetype)initWithExpandInsets:(UIEdgeInsets)expandInsets;

/// 需要响应的圆形区域，以UIButton的center为圆心
- (instancetype)initWithExpandRadius:(CGFloat)expandRadius;

@end

NS_ASSUME_NONNULL_END
```

```c title="ExpandAreaButton.m"
#import "ExpandAreaButton.h"

@interface ExpandAreaButton ()

/// 需要扩大的响应区域
@property (nonatomic, assign) UIEdgeInsets expandInsets;

/// 以UIButton的center为中心,radius为半径的响应区域
@property (nonatomic, assign) CGFloat expandRadius;

@end

@implementation ExpandAreaButton

- (instancetype)initWithExpandInsets:(UIEdgeInsets)expandInsets {
    self = [super init];
    if (self) {
        self.expandInsets = expandInsets;
    }
    return self;
}

- (instancetype)initWithExpandRadius:(CGFloat)expandRadius {
    self = [super init];
    if (self) {
        self.expandRadius = expandRadius;
    }
    return self;
}

- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent *)event {
    CGRect buttonBounds = self.bounds;
    if (self.expandRadius > 0) {
        CGPoint ivCenter = CGPointMake((buttonBounds.origin.x + buttonBounds.size.width) / 2, (buttonBounds.origin.y + buttonBounds.size.height) / 2);
        double dx = fabs(point.x - ivCenter.x);
        double dy = fabs(point.y - ivCenter.y);
        double distance = hypot(dx, dy); # returns the square root of the sum of squares of its arguments
        return distance <= self.expandRadius;
    } else {
        buttonBounds.origin.x -= self.expandInsets.left;
        buttonBounds.origin.y -= self.expandInsets.top;
        buttonBounds.size.width += self.expandInsets.left + self.expandInsets.right;
        buttonBounds.size.height += self.expandInsets.top + self.expandInsets.bottom;
        return CGRectContainsPoint(buttonBounds, point);
    }
}
```

## 按钮设置标题会闪

```c
// 先设置label，再设置title，否则会闪烁一下
self.selectButton.titleLabel.text = title;
[self.selectButton setTitle:title forState:UIControlStateNormal];
```

## 重命名弹窗

```c
UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"重命名" message:@""
                                                                      preferredStyle:UIAlertControllerStyleAlert];
[alertController addTextFieldWithConfigurationHandler:^(UITextField *_Nonnull textField) {
    textField.placeholder = @"文件名";
    textField.text = file.title;
}];
DefineWeakSelfBeforeBlock();
UIAlertAction *confirmAction = [UIAlertAction actionWithTitle:@"确认" style:UIAlertActionStyleDefault handler:^(UIAlertAction *_Nonnull action) {
    DefineStrongSelfInBlock(sSelf);
    [sSelf doRenameWithText:[alertController textFields].firstObject.text onlineFile:file completion:completion];
}];
[alertController addAction:confirmAction];
UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction *_Nonnull action) {
    BLOCK_SAFE_EXEC(completion, NO, YES);
}];
[alertController addAction:cancelAction];
[viewController presentViewController:alertController animated:YES completion:^{
    UITextField *textField = [alertController textFields].firstObject;
    // 全选文本，给非空对象会弹出菜单，给空对象不会弹出菜单
    [textField selectAll:nil];
}];
```

## YYText

```c
+ (void)yyLabel:(YYLabel *)label setText:(NSString *)text {
    label.attributedText = nil;
    // 设置了YYLabel的attributedText属性后，再设置text需要重新设置样式才行
    label.textColor = UIColor.blackColor;
    label.font = [UIFont systemFontOfSize:12.0];
    label.numberOfLines = 0;
    label.userInteractionEnabled = YES;
    label.textAlignment = NSTextAlignmentCenter;
    label.text = text;
}

+ (void)yyLabel:(YYLabel *)label setText:(NSString *)text highlightText:(NSString *)highlightText {
    label.text = nil;
    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:text];
    NSRange range = [text rangeOfString:highlightText];
    attributedString.yy_color = UIColor.blackColor;
    // clang-format off
    [attributedString yy_setTextHighlightRange:range
                                         color:UIColor.blackColor
                               backgroundColor:UIColor.clearColor
                                     tapAction:^(UIView *containerView, NSAttributedString *text, NSRange range, CGRect rect) {
        [manager showLoginOrAuthView];
    }];
    // clang-format on
    label.attributedText = attributedString;
    // YYLabel 的坑，设置了 attributedText 需再次设置 textAlignment 才能生效
    label.textAlignment = NSTextAlignmentCenter;
}
```

## UIImage

```c
- (UIImage *)imageFromImage:(UIImage *)image inRect:(CGRect)rect {
    CGImageRef sourceImageRef = [image CGImage];
    CGImageRef newImageRef = CGImageCreateWithImageInRect(sourceImageRef, rect);
    UIImage *newImage = [UIImage imageWithCGImage:newImageRef];
    return newImage;
}

- (void)saveToPath:(NSString *)filePath {
    if (filePath.length == 0) {
        return;
    }
    @autoreleasepool {
        CFURLRef url = (__bridge CFURLRef)[NSURL fileURLWithPath:filePath];
        CGImageDestinationRef destination = CGImageDestinationCreateWithURL(url, kUTTypePNG, 1, NULL);
        CGImageDestinationAddImage(destination, [self CGImage], nil);
        CFRelease(destination);
    }
}
```

