---
title:  "在开发中应用最佳实践"
categories: [Apple]
---

# 在开发中应用最佳实践

©️ 本文原创，转载请注明出处。

其实像 UIKit、Core Animation 这些重要的框架，无论在官方文档，还是 WWDC 的 Session 里面都有提到很多最佳实践。我认为学习一门技术，一定要多从官方渠道获取第一手资料，没有人比他们自己更熟悉这些框架，这些优秀的工程师花了大量的时间和精力去优化这些 SDK，为的是让我们开发者能够写出高质量的 APP。

工欲善其事，必先利其器。但这些器到了开发者的手里，由于不同的人知识水平、认知能力、理解能力、应用能力不一样，加上项目的需求是多样化的、多变的，并且项目还往往有工期的限制，因此技术的世界还是存在很多拙劣的代码。

所以我们要做的，是在平时就多积累，而不是出现问题的时候再去搜一些博客或者论坛、随意地复制一些代码过来，不理解背后的原因或者缺乏最佳实践的指导，很多时候所谓的优化做的都是无用功甚至负优化。

WWDC 的一些讲解：

主题 | 年份
------------ | -------------
[Using Time Profiler in Instruments](https://developer.apple.com/videos/play/wwdc2016/418/) | 2016
[What's New in UICollectionView in iOS 10](https://developer.apple.com/videos/play/wwdc2016/219) | 2016
[Modernizing Grand Central Dispatch Usage](https://developer.apple.com/videos/play/wwdc2017/706) | 2017
[Practical Approaches to Great App Performance](https://developer.apple.com/videos/play/wwdc2018/407/) | 2018
[Image and Graphics Best Practices](https://developer.apple.com/videos/play/wwdc2018/219/) | 2018
[Behind the Scenes of the Xcode Build Process](https://developer.apple.com/videos/play/wwdc2018/415/) | 2018

另外，请善用优秀的第三方库。这些库的作者们，花费大量的时间和精力去优化它，在官方的 SDK 有更新时，他们也会及时做出对应的更新，所以在恰当的时候使用这些库的最新版本，也是很有用的。

## Star 10000+

在 GitHub 获得 10000+ 的星星，非常流行的、非常多人用的第三方库。可以直接拿来用。

Library | 用途 
------------ | -------------
[SDWebImage](https://github.com/rs/SDWebImage) | 图片异步下载、缓存、后台解压
[Alamofie](https://github.com/Alamofire/Alamofire#features) | 链式的网络请求和处理，非常优雅
[Masonry](https://github.com/SnapKit/Masonry) | 强大的 AutoLayout 库

## Star 1000+

在 GitHub 获得 1000+ 的星星，不一定直接拿来用，可以参考里面的实现方法的。

Library | 用途 
------------ | -------------
[LazyScrollView](https://github.com/alibaba/LazyScrollView) | 天猫团队开源的一个 ScrollView，支持 UIView 的重用
[Texture](https://github.com/TextureGroup/Texture) | Facebook 和 Pinterest 采用的异步显示框架

