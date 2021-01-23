---
title: "UserNotification"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# 请求通知权限

```swift
/// 是否询问过通知权限
var notDetermined = false
// iOS 10 及以上
UNUserNotificationCenter.current().getNotificationSettings { (settings) in
    if settings.authorizationStatus == .notDetermined {
        notDetermined = true
    }
}
UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { (granted, error) in
    if notDetermined && granted {
        // 首次询问并同意了
    } else if notDetermined && !granted {
        // 首次询问并拒绝了
    } else if !notDetermined && granted {
        // 用户之前已同意过了
    } else {
        // 用户之前已拒绝过了
    }
}
```


# 向模拟器推送消息

创建 json 文件：

```json
{
  "Simulator Target Bundle": "com.yianzhou.demo",
  "aps": {
    "alert": {
      "title": "测试标题",
      "subtitle": "测试副标题",
      "body": "测试内容"
    },
    "sound": "default",
    "badge": 1
  },
  "payloads": {
    // 附加信息，通过 `response.notification.request.content.userInfo` 取到
    "url": "demo://playerv2?id=769"
  }
}
```

通过命令行发送：`xcrun simctl push booted ./1605665134.json`