---
title:  "iOS 12 密码管理"
categories: [2019]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

> [Automatic Strong Passwords and Security Code AutoFill](https://developer.apple.com/videos/play/wwdc2018/204/)

# 自动填充密码

How it works? AutoFill will:

- Infer login scenario
- Check eligibility based on associated domains
- Find user name and password fields
- Detect sign-in action
- Prompt to save or update password

Deprecated: `SecAddSharedWebCredential()`

在 iOS 11.3+，[WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) 也支持自动填充了。

# 自动强密码

AutoFill will:

- Infer the view controller type
- Check eligibility based on associated domains
- Detect relevant sign up form elements Suggest a user name
- Insert a strong password
- Save the password after user signs up

⚠️ User name and new password text fields should be on same screen

自动生成的密码格式：20 字符，大小写、数字、横线，安全且兼容大部分服务。

当然，你也可以自己定义生成的密码格式，并使用苹果提供的[在线工具](https://developer.apple.com/password-rules/)模拟生成的结果。

# 自动填充安全码

⚠️ Rely on the native system keyboard

iOS and macOS use data detector heuristics to infer that an incoming message carries a security code.

Specifically, our **heuristics** are looking for words like code or passcode in proximity to the actual code string.

Then, when you go into the message transcript and you see the code being underlined and tapping the code offers you a **Copy Code** option, you know you have it right.

# Federated authentication

本节讲述了新 API：[ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession) 如何利用第三方网站的信息登录。

# 新的密码管理特性

😲 “Hey Siri, show me my Shiny password”.

🤝  Users can now AirDrop passwords to their contacts.

👍  Another new feature of the iCloud Keychain Password Manager is it now warns users if they're reusing passwords across multiple websites.

# 最佳实践

- ✅ 建立 App 和域名的联系（entitlements）
- ✅ 正确设置 [UITextContentType](https://developer.apple.com/documentation/uikit/uitextcontenttype)
- ✅ Ensure login detection. Remove login fields from view hierarchy.（保存密码的提示会在登录文本框消失后出现，这里的消失包括 ViewController 的消失等等）
