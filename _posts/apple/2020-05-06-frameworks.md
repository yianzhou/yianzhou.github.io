---
title: "第三方库代码学习"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# AFNetworking

核心 NSURLSession（网络通信模块）- AFURLSessionManager（封装 NSURLSession）- AFHTTPSessionManager（继承自 AFURLSessionManager，实现了 HTTP 请求相关的配置）

核心 Serialization：AFURLRequestSerialization（请求参数序列化），AFURLResponseSerialization（验证返回数据和反序列化）

辅助：Security（网络通信安全策略模块）、Reachability（网络状态监听模块）、UIKit category（对 iOS 系统 UI 控件的扩展）

# ijkplayer

视频播放的两个步骤：解码（使用 FFmpeg）、渲染（使用 OpenGL ES）

# J2ObjC 的应用举例

主要的业务逻辑、常量、数据对象等都可以复用。

不能重用的主要是必须交由原生代码/库去实现的，比如网络请求、本地存储等，用 Java Abstract Class 表示，在 Android/iOS 分别给予具体实现。

![Image]({{"/assets/images/demo-Page-2.jpg"}})
