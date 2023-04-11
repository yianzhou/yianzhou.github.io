# UIScene

> [Supporting Multiple Windows on iPad](https://developer.apple.com/documentation/uikit/uiscenedelegate/supporting_multiple_windows_on_ipad)
>
> [WWDC 2019 - Introducing Multiple Windows on iPad](https://developer.apple.com/videos/play/wwdc2019/212/)
>
> [WWDC 2019 - Window Management in Your Multitasking App](https://developer.apple.com/videos/play/wwdc2019/246/)
>
> [WWDC 2019 - Architecting Your App for Multiple Windows](https://developer.apple.com/videos/play/wwdc2019/258/)
>
> [WWDC 2019 - Targeting Content with Multiple Windows](https://developer.apple.com/videos/play/wwdc2019/259/)

iOS 13.0+ required.

Xcode - Gallery.xcodeproj - General - Deployment Info - Support multiple windows

Every **device** has at least one `UIScreen` object representing the device’s main screen, and additional screen objects represent **connected displays**. `UIScreen` 代表和它关联的设备！

A `UIWindow` object provides no visible content of its own. All of the window's visible content is provided by its **root view controller**. The window's role is to receive events from UIKit and to forward any relevant events to the root view controller and associated views.

![img](/assets/images/fdca6f5d-4841-4f1c-be04-e0b970674e12.png)

A `UISceneSession` object manages a **unique** runtime instance of your scene. You do not create session objects directly.

`UIWindowScene` is a `UIScene`. Typically, UIKit creates a `UIWindowScene` object instead of a `UIScene` object. You do not create scene objects directly.

Every time a new window gets created on the system, you get informed through the application delegate that a new session has been made. And every time one has been destroyed by the user, either through interactions with our APIs, or because they swiped up in the switcher, you get informed that that session has been destroyed. And `UIScene`s connect to and disconnect from these sessions over the lifetime of your application.
