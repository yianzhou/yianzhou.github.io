---
title: "Alamofire"
categories: [Apple]
---

* Do not remove this line (it will not be displayed)
{:toc}

# [URL Loading System](https://developer.apple.com/documentation/foundation/url_loading_system)

`URLSession` You use a URLSession instance to create one or more URLSessionTask instances. Your app creates one or more URLSession instances, each of which coordinates a group of related data-transfer tasks. For example, if you’re creating a web browser, your app might create one session per tab or window, or one session for interactive use and another for background downloads.

`URLSessionConfiguration` To configure a session, you use a URLSessionConfiguration object. 四种基本类型：`.shared, .default, .ephemeral, .background(identifier)`

It is important to configure your URLSessionConfiguration object appropriately **before** using it to initialize a session object. Session objects make a copy of the configuration settings you provide and use those settings to configure the session. Once configured, the session object ignores any changes you make to the URLSessionConfiguration object. If you need to modify your transfer policies, you must update the session configuration object and use it to create a new URLSession object. 注意，这一点和 SDWebImage 里设置 SDWebImageContext 的逻辑是一样的，调用传参后，字典就被拷贝了。

`URLSessionTask` Within a session, you create four types of tasks: Data tasks (small interaction, into memory), Upload tasks (support background, into disk), Download tasks (support background), WebSocket tasks.

`URLSessionDelegate` The session object keeps a strong reference to the delegate until your app exits or explicitly invalidates the session. If you don’t invalidate the session, your app leaks memory until the app terminates. 记得调用 invalidate
