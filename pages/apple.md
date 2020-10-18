---
permalink: apple
---

[macOS](2018/12/18/macOS.html)，[开发及调试](2020/08/07/exp.html)

工作常用代码：[Swift Gists](2020/06/02/gist-swift.html)，[OC Gists](2020/06/02/gist-oc.html)，[UIView](2020/05/22/UIView.html)，[UIFont](2020/07/10/UIFont.html)

底层原理：[Runtime](2020/03/28/Runtime.html)，[RunLoop](2020/03/29/RunLoop.html)，[Block](2020/04/22/Block.html)，[Swift 底层](2019/06/24/Swift.html)，[iOS 进阶](advanced)

多线程：[信号量](2019/12/29/Semaphore.html)

[编译过程](2020/04/28/Compile.html)

[性能优化](2020/07/04/performance.html)（启动速度、卡顿、崩溃、包体大小、内存优化）

[动画](2018/07/28/ios-animation.html)，[图形渲染](2020/04/22/Graphics.html)（离屏渲染、圆角），[Metal](2019/01/10/metal.html)，[ARKit](2018/12/20/arkit.html)

音视频：[AVFoundation](2018/12/21/AVFoundation.html)，[音视频基础知识](2018/12/21/AV.html)

[CocoaPods](2019/07/10/CocoaPods.html)，[第三方库](2020/05/06/frameworks.html)，[SDWebImage](SDWebImage)

[数据库](2019/01/07/Core-Data.html)

[简历](2020/09/22/tech-points.html)

[iOS 重要更新](ios-update-notes)，[WWDC](2018/11/28/WWDC-视频汇总.html)，[App Extension](2019/02/21/App-Extension.html)

[App Store 相关](2019/01/18/AppStoreConnect.html)

[代码签名](signing)

# Effective Objective-C
<ul>
  {% for post in site.categories['Effective Objective-C'] %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>