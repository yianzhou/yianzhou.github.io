---
title: "iOS 重要更新"
categories: [Apple]
---

# iOS 14

Redesigned widgets:

- Place widgets anywhere on the Home Screen
- Widgets now come in small, medium, and large sizes
- Widget gallery
- Widget stacks: You can create stacks of up to 10 widgets

App Library on the Home Screen.（自动分类、建议、搜索……）

精简界面：来电以横幅显示（包括 FaceTime 和第三方 VoIP 通话）；视频画中画……

App Clips

- 轻 App 能在你需要的那刻为你所用，专以满足当下的特定需求。会在你使用完毕之后自动消失。
- 通过 NFC 标签或扫描二维码，或是通过信息 app、地图 app 和 Safari 浏览器。

Privacy

- App Store 中的每个产品页面增加了一个新版块，让你在下载某款 app 之前，能够参看它的隐私处理方法摘要。
- App 追踪控制和透明度：开发者在通过 app 对你进行追踪之前，将会被要求先征得你的同意。
- 如果开发者请求访问你的照片，你可以选择仅分享特定的项目，或允许访问你的整个图库。
- 每当有 app 使用你的麦克风或相机时，iOS 会同时在 app 内及控制中心显示一个指示器。

# iOS 13

Dark Mode.

Sign in with Apple.

App Store with Arcade: unlimited access to new games with one subscription, option to download large apps over your cellular connection.（彻底蜂窝数据放开下载应用的限制，默认超过 200MB 时询问）

QuickPath: Slide to type on the keyboard.

Custom fonts are available from the App Store.

External drives supported in Files.

Allow Once location permission with the option to share your locations with apps only once.

Background tracking alerts now notify you when an app is using your location in the background.

Optimized battery charging.

iOS 13.1 Ability to select who you want to AirDrop to by pointing from one iPhone 11, iPhone 11 Pro, or iPhone 11 Pro Max to another using the new U1 chip with Ultra Wideband technology for spatial awareness.

iOS 13.2 Deep Fusion for iPhone 11, iPhone 11 Pro, and iPhone 11 Pro Max uses the A13 Bionic Neural Engine to capture multiple images at various exposures, run a pixel-by-pixel analysis, and fuse the highest quality parts of the images together resulting in photos with dramatically better texture, details, and reduced noise, especially for mid to low light scenes.

iOS 13.5 speeds up access to the passcode field on devices with Face ID when you are wearing a face mask and introduces the Exposure Notification API to support COVID-19 contact tracing apps from public health authorities.

iOS 13.6 Unlock, lock, and start your compatible car with your iPhone.

# iOS 12

支持编辑 RAW 图像。

同一应用的通知会自动归为一组，便于您管理通知；“即时调整”可让您直接在锁定屏幕中控制通知设置；新的“隐式推送”选项可直接将通知静默发送至通知中心而不打扰您。

测距仪。

自动建议唯一强密码；安全码自动填充；重复使用的密码会在“设置”>“密码与帐户”中标识。

在不支持三维触控的设备上，触碰并按住键盘空格键来将键盘变成触控板。

iOS 12.3 现可支持启用“隔空播放 2”的电视。

iOS 12.4 推出了 iPhone 迁移功能，可将数据直接从旧 iPhone 传输至新 iPhone。

# iOS 12 密码管理

> [Automatic Strong Passwords and Security Code AutoFill](https://developer.apple.com/videos/play/wwdc2018/204/)

## 自动填充密码

How it works? AutoFill will:

- Infer login scenario
- Check eligibility based on associated domains
- Find user name and password fields
- Detect sign-in action
- Prompt to save or update password

Deprecated: `SecAddSharedWebCredential()`

在 iOS 11.3+，[WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) 也支持自动填充了。

## 自动强密码

AutoFill will:

- Infer the view controller type
- Check eligibility based on associated domains
- Detect relevant sign up form elements Suggest a user name
- Insert a strong password
- Save the password after user signs up

⚠️ User name and new password text fields should be on same screen

自动生成的密码格式：20 字符，大小写、数字、横线，安全且兼容大部分服务。

当然，你也可以自己定义生成的密码格式，并使用苹果提供的[在线工具](https://developer.apple.com/password-rules/)模拟生成的结果。

## 自动填充安全码

Rely on the native system keyboard.

iOS and macOS use data detector heuristics to infer that an incoming message carries a security code.

Specifically, our **heuristics** are looking for words like code or passcode in proximity to the actual code string.

Then, when you go into the message transcript and you see the code being underlined and tapping the code offers you a **Copy Code** option, you know you have it right.

## Federated authentication

本节讲述了新 API：[ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession) 如何利用第三方网站的信息登录。

## 新的密码管理特性

😲 “Hey Siri, show me my Shiny password”.

🤝 Users can now AirDrop passwords to their contacts.

👍 Another new feature of the iCloud Keychain Password Manager is it now warns users if they're reusing passwords across multiple websites.

## 最佳实践

- ✅ 建立 App 和域名的联系（entitlements）
- ✅ 正确设置 [UITextContentType](https://developer.apple.com/documentation/uikit/uitextcontenttype)
- ✅ Ensure login detection. Remove login fields from view hierarchy.（保存密码的提示会在登录文本框消失后出现，这里的消失包括 ViewController 的消失等等）

# iOS 11

全新 HEIF 和 HEVC 图像和视频格式使照片和视频占用空间仅为之前的一半；现支持动态 GIF 图像。

iOS 11 针对 64 位应用进行了优化。应用开发者需更新 32 位应用以在此 iOS 版本上正常工作。

iOS 11.2 新增 Apple Pay Cash，可通过 Apple Pay 在亲朋好友间付款、请款与收款（仅限美国）

iOS 11.3 加入了 iPhone 电池健康（Beta 版）；将北京和上海交通卡添加到“钱包”并使用 Apple Pay 搭乘公共交通；

# iOS 10, iOS 9, iOS 8

iOS 9.0 and macOS 10.11 and later use App Transport Security (ATS) for all HTTP connections made with URLSession. ATS requires that HTTP connections use HTTPS (RFC 2818).

# iOS 7

重新设计的界面，对整个系统和每个内建应用程序都进行了更新。
