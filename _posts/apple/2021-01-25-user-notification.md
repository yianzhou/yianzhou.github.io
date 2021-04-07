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

`registerUserNotificationSettings(_:)` 已废弃。

# UNNotificationTrigger

UNNotificationTrigger is an abstract class, concrete trigger classes include the following:

- UNTimeIntervalNotificationTrigger 时间间隔触发（本地）
- UNCalendarNotificationTrigger 日期触发（本地）
- UNLocationNotificationTrigger 地点触发（本地）
- UNPushNotificationTrigger 服务端推送（远程）

# APNS

调试工具：[Knuff](https://github.com/KnuffApp/Knuff)、[SmartPush](https://github.com/shaojiankui/SmartPush)

1\. 成为代理

```objc
@interface AppDelegate () <UNUserNotificationCenterDelegate>
@end

UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
center.delegate = self;
```

2\. App 启动时，向 APNS 请求 deviceToken。

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[UIApplication sharedApplication] registerForRemoteNotifications];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"%@", deviceToken);
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"error, %@", error);
}
```

3\. 收到通知、点击通知、冷启动 App。

```objc
#import <UserNotifications/UserNotifications.h>
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    NSDictionary *remoteNotification = [launchOptions valueForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    if (remoteNotification) {
        NSDictionary *params = launchOptions[@"userInfo"];
        // 暂存参数，稍后跳转
        NSLog(@"%@", params);
    }
}
```

4\. App 在后台、收到通知、点击通知、热启动 App；或者 App 在前台、`willPresentNotification` 调用系统方法在前台展示了消息，点击也会执行以下这个方法。

```objc
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    UNNotification *noti = ((UNNotificationResponse *)response).notification;
    NSDictionary *userInfo = noti.request.content.userInfo;
    NSDictionary *params = userInfo[@"userInfo"];
    // 根据消息推送中的参数，在用户点击通知时自动进行跳转
    NSLog(@"%@", params);
}
```

5\. App 在前台时收到通知：

```objc
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    completionHandler(UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}
```

这两个方法在 iOS 10+ deprecated 并被上述方法替代。

~~`- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo;`~~

~~`- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification;`~~

6\. 静默推送

当 payload 包含参数 content-available=1 时，该推送就是静默推送，静默推送不会显示任何推送消息。系统会将在后台静默启动 app、或者从挂起状态唤醒它。开发者有 30s 的时间内在该回调方法中处理一些业务逻辑，并在处理完成后调用 fetchCompletionHandler。

```objc
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {}
```

The system calls this method when your app is running in the foreground or background. In addition, if you enabled the remote notifications background mode, the system launches your app (or wakes it from the suspended state) and puts it in the background state when a remote notification arrives. However, the system does not automatically launch your app if the user has force-quit it. In that situation, the user must relaunch your app or restart the device before the system attempts to launch your app automatically again.

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
