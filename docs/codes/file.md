# 文件相关

读文件头签名：`xxd -l 128`

文件在 App 内打开后，会自动放在 `Documents/Inbox` 文件夹下。

```objc
[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
[NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) firstObject];
NSTemporaryDirectory()
```

## Info.plist

`UIFileSharingEnabled`: If you set this key to YES, your app can share files with the user. Place the files in a Documents folder located in the app’s home directiory. The default value is NO.

`UISupportsDocumentBrowser`: To allow other apps to open and edit the files stored in your app’s Documents folder, set this key to YES. This key also lets users set the app’s default save location in Settings.

`LSSupportsOpeningDocumentsInPlace`: A Boolean value indicating whether the app may open the original document from a file provider, rather than a copy of the document.

`NSExtensionFileProviderSupportsEnumeration`: A Boolean value that indicates whether a File Provider extension enumerates its content.

## 选择系统文件

文件被放到了应用的沙盒里 `/private/var/mobile/Containers/Data/Application/854C0C2B-D5B4-4977-B16C-3AB538D52CBF/tmp/com.yianzhou.demo-Inbox/和妈妈的同床直了.docx`

用完被系统删除了：

![img](/img/4B6B9A72-D0F3-4E13-84AE-4FEE5A41FAC4.png)
