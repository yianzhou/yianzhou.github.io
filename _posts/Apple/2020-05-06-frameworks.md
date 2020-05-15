---
title: '第三方库代码学习'
categories: [Apple]
---

# SDWebImage

## UIKit 的 category

保证每个对象有且仅有一个 ImageLoadOperation

这部分所关心的：传入图片 URL，获取图片回调

## 中心管理类：SDWebImageManager

（API 设计范例）可以自定义 Manager，也可以用默认的。

收集任务，封装 SDWebImageCombinedOperation（cacheOperation+loaderOperation），交给具体的类去工作。

## SDImageCache (interface)

内存缓存（哈希表，NSCache）

磁盘缓存（NSFileManager/SQLite）

可以自定义 CachesManager，也可以用默认的 SDImageCachesManager

## SDImageLoader (interface)

SDWebImageDownloader，负责下载。

## SDImageCoder (interface)

负责图片的解码（过程式解码，即边下载、边解码、边渲染）；

支持多种图片格式：JPG、PNG、GIF、WEBP……

## SDImageTransformer (interface)

图片的变形等

# AFNetworking

核心 NSURLSession（网络通信模块）- AFURLSessionManager（封装 NSURLSession）- AFHTTPSessionManager（继承自 AFURLSessionManager，实现了 HTTP 请求相关的配置）

核心 Serialization：AFURLRequestSerialization（请求参数序列化），AFURLResponseSerialization（验证返回数据和反序列化）

辅助：Security（网络通信安全策略模块）、Reachability（网络状态监听模块）、UIKit category（对 iOS 系统 UI 控件的扩展）