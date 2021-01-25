---
title: Apple
permalink: apple
---

# 日常开发

[开发及调试]({% post_url apple/2020-08-07-dev %})，[macOS]({% post_url apple/2018-12-18-macOS %})，[Swift Gists]({% post_url apple/2020-06-02-gist-swift %})，[OC Gists]({% post_url apple/2020-06-02-gist-oc %})，[UIFont]({% post_url apple/2020-07-10-UIFont %})

[通知]({% post_url apple/2021-01-25-user-notification %})

# 知识图谱

[iOS 进阶]({% post_url apple/2020-08-07-advanced %})，[Swift 底层]({% post_url apple/2019-06-24-swift %})

[C]({% post_url apple/2020-11-9-c %})，[C++]({% post_url apple/2020-11-9-cpp %})，[Runtime]({% post_url apple/2020-03-28-runtime %})，[RunLoop]({% post_url apple/2020-03-29-runloop %})，[Block]({% post_url apple/2020-04-22-block %})

[进程与线程]({% post_url apple/2020-10-23-processes-and-threads %})，[信号量]({% post_url apple/2019-12-29-semaphore %})

[编译过程]({% post_url apple/2020-04-28-compile %})，[获取函数调用栈及符号化]({% post_url apple/2020-10-30-symbol %})

[卡顿监测]({% post_url apple/2020-07-04-performance %})，[包体大小]({% post_url apple/2020-11-2-app-size %})，[内存优化]({% post_url apple/2020-10-31-memory %})，[启动时长优化]({% post_url apple/2020-10-27-app-launch %})，[崩溃监控]({% post_url apple/2020-10-30-crash %})

[Auto Layout]({% post_url apple/2020-10-27-auto-layout %})，[Core Animation]({% post_url apple/2018-07-28-core-animation %})，[图形渲染]({% post_url apple/2020-04-22-graphics %})，[Metal]({% post_url apple/2019-01-10-Metal %})，[ARKit]({% post_url apple/2018-12-20-ARKit %})

[音视频基础知识]({% post_url apple/2018-12-21-audio-video %})，[AVFoundation]({% post_url apple/2018-12-21-avfoundation %})

[CocoaPods]({% post_url apple/2019-07-10-cocoapods %})，[第三方库]({% post_url apple/2020-05-06-frameworks %})，[SDWebImage]({% post_url apple/2020-10-14-SDWebImage %})，[Alamofire]({% post_url apple/2020-10-19-Alamofire %})，[Matrix]({% post_url apple/2020-11-1-matrix %})，[响应式编程]({% post_url apple/2020-11-1-reactive-rx %})，[埋点]({% post_url apple/2020-10-30-event-log %})

[iOS 重要更新]({% post_url apple/2020-10-08-iOS-update-notes %})，[App Store 相关]({% post_url apple/2019-01-18-appstore-connect %})

[App Extension]({% post_url apple/2019-02-21-app-extension %})

[代码签名]({% post_url apple/2020-10-10-signing %})

[WebView]({% post_url apple/2020-11-2-webview %})

# 算法

[数据结构与算法]({% post_url apple/2020-01-10-algorithm %})，[Leetcode 1]({% post_url apple/2020-06-17-leetcode %})，[Leetcode 2]({% post_url apple/2020-06-17-leetcode2 %})

# Effective Objective-C

<ul>
  {% for post in site.categories['Effective Objective-C'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
