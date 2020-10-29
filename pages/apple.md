---
permalink: apple
---

[开发及调试]({% post_url apple/2020-08-07-dev %})，[Swift Gists]({% post_url apple/2020-06-02-gist-swift %})，[OC Gists]({% post_url apple/2020-06-02-gist-oc %})，[UIFont]({% post_url apple/2020-07-10-UIFont %})

底层原理：[Runtime]({% post_url apple/2020-03-28-Runtime %})，[RunLoop]({% post_url apple/2020-03-29-RunLoop %})，[Block]({% post_url apple/2020-04-22-Block %})，[Swift 底层]({% post_url apple/2019-06-24-Swift %})，[iOS 进阶]({% post_url apple/2020-08-07-advanced %})

[进程与线程]({% post_url apple/2020-10-23-processes-and-threads %})，[信号量]({% post_url apple/2019-12-29-semaphore %})

[编译过程]({% post_url apple/2020-04-28-compile %})

[性能优化]({% post_url apple/2020-07-04-performance %})（启动速度、卡顿、崩溃、包体大小、内存优化），[启动时长优化]({% post_url apple/2020-10-27-app-launch %})

[UIView]({% post_url apple/2020-10-27-uiview %})，[动画]({% post_url apple/2018-07-28-animation %})，[图形渲染]({% post_url apple/2020-04-22-graphics %})（离屏渲染、圆角），[Metal]({% post_url apple/2019-01-10-Metal %})，[ARKit]({% post_url apple/2018-12-20-ARKit %})

音视频：[AVFoundation]({% post_url apple/2018-12-21-AVFoundation %})，[音视频基础知识]({% post_url apple/2018-12-21-audio-video %})

[CocoaPods]({% post_url apple/2019-07-10-CocoaPods %})，[第三方库]({% post_url apple/2020-05-06-frameworks %})，[SDWebImage]({% post_url apple/2020-10-14-SDWebImage %})，[Alamofire]({% post_url apple/2020-10-19-Alamofire %})

[简历]({% post_url apple/2020-09-22-resume %})

[iOS 重要更新]({% post_url apple/2020-10-08-iOS-update-notes %})，[WWDC]({% post_url apple/2018-11-28-wwdc-videos %})，[App Extension]({% post_url apple/2019-02-21-app-extension %})

[App Store 相关]({% post_url apple/2019-01-18-appstore-connect %})

[代码签名]({% post_url apple/2020-10-10-signing %})

[macOS]({% post_url apple/2018-12-18-macOS %})

# Effective Objective-C

<ul>
  {% for post in site.categories['Effective Objective-C'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
