# 文件相关

文件在 App 内打开后，会自动放在 `Documents/Inbox` 文件夹下。

```objc
[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
[NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) firstObject];
NSTemporaryDirectory()
```

自动重命名文件：

```c
/// 传入一个文件路径，如果该路径下的文件不存在，则返回它本身；如果已存在，那么会自动重命名文件名，返回一个不冲突的文件路径。
/// @param filePath 文件路径
+ (NSString *)autoRenamePath:(NSString *)filePath {
    NSFileManager *manager = [NSFileManager defaultManager];
    NSString *fileName = [[filePath lastPathComponent] stringByDeletingPathExtension]; // 例如“PDF_0707”
    NSString *directory = [filePath stringByDeletingLastPathComponent]; // 目录
    NSUInteger numOfFiles = [manager contentsOfDirectoryAtPath:directory error:nil].count;
    // 如果“PDF_0707”存在，就在后面自动追加数字后缀
    NSUInteger counter = 0; // 计数器
    NSString *newName = [fileName copy];
    while ([manager fileExistsAtPath:filePath]) {
        ++counter;
        if (counter > numOfFiles + 1) {
            break; // 循环的次数不大于目录下的文件个数+1
        }
        newName = [NSString stringWithFormat:@"%@(%@)", fileName, @(counter)]; // 例如“PDF_0707(1)”
        NSString *extension = [filePath pathExtension];
        filePath = [[directory stringByAppendingPathComponent:newName] stringByAppendingPathExtension:extension];
        // 不会一直循环下去，因为用户每天导出的文件数是有限的，0707 这个日期下的 PDF 文件大多数情况下也就几个
        // 因此随着计数器的增加，一定会找到一个可以用的数字，例如“PDF_0707(99)”，就是可用的文件路径
    }
    return filePath;
}
```

文件大小格式化字符串：

```c
+ (NSString *)displayStringWithFileSize:(NSUInteger)fileSize {
    if (fileSize >= 1024 * 1024) {
        return [NSString stringWithFormat:@"%.2fMB", fileSize / 1024 / 1024];
    } else if (fileSize >= 1024) {
        return [NSString stringWithFormat:@"%.2fKB", fileSize / 1024];
    } else {
        return [NSString stringWithFormat:@"%.2fB", fileSize];
    }
}
```
