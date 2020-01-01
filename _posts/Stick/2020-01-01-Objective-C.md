---
title: "Objective-C"
categories: [Stick]
---

变量懒加载：

```
@property (nonatomic, strong) NSMutableArray *players;

- (NSMutableArray *)players {
  if (!_players) {
    _players = [[NSMutableArray alloc] init];
  }
  return _players;
}
```

获取目录路径：

```
// 获取沙盒主目录路径
NSString *homeDir = NSHomeDirectory();
// 获取Documents目录路径
NSString *docDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
// 获取Library的目录路径
NSString *libDir = [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) lastObject];
// 获取Caches目录路径
NSString *cachesDir = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
// 获取tmp目录路径
NSString *tmpDir =  NSTemporaryDirectory();
// Bundle资源文件路径
NSString *imagePath = [[NSBundle mainBundle] pathForResource:@"apple" ofType:@"png"];
UIImage *appleImage = [[UIImage alloc] initWithContentsOfFile:imagePath];
```
