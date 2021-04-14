---
title: "Apple Silicons"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

> [iPad and iPhone apps on Apple silicon Macs](https://developer.apple.com/videos/play/wwdc2020/10114/)
>
> [Introducing iPad Apps for Mac](https://developer.apple.com/videos/play/wwdc2019/205/)

In macOS Catalina, we added the ability to build your iOS apps for the Mac with **Mac Catalyst**. Mac Catalyst requires building your app with the macOS SDK.

In macOS Big Sur, we are leveraging this Mac Catalyst infrastructure to enable running your **existing** iOS apps as-is on Apple Silicon-based Macs. It is the exact **same binary**. Compatible iOS apps are automatically available in the Mac App Store, but you can manage the availability of your app in App Store Connect.

![img](/assets/images/cf447478-d79b-4383-aa50-21349a27cb80.png)

If you want to take your iOS applications further on the Mac, create a Mac Catalyst version by **checking that switch in Xcode**. This will give you the ability to customize your app's behavior on the Mac, as well as allow you to distribute your application on all Macs, not just those running Apple Silicon.
