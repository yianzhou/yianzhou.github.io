# App Extension

iOS and macOS define several types of **app extensions**, each of which is tied to a single, well-scoped area of the system. A system area that enables extensions is called an **extension point**.

An app extension is different from an app. Although you must use an app to contain and deliver your extensions, each extension is a separate binary that runs independent of the app used to deliver it.

You create an app extension by adding a new **target** to an app. You can add multiple extension targets to a single app (an app that contains one or more extensions is called a **containing app**).

An app that a user employs to choose an app extension is called a **host app**. An app extension communicates primarily with its host app. Any app extension and its containing app can access shared data in a privately defined shared container.

> A Today widget (**and no other app extension type**) can ask the system to open its containing app by calling the `openURL:completionHandler:` method of the `NSExtensionContext` class.

![image](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/Art/detailed_communication_2x.png)

Each app extension template includes a property list file (that is, an Info.plist file), a view controller class, and a default user interface, all of which are defined by the extension point.

When a host app sends a request to an app extension, it specifies an extension **context**.

[如何调试？](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionCreation.html#//apple_ref/doc/uid/TP40014214-CH5-SW1)In your extension scheme’s Run phase, you specify a host app as the executable.

数据共享 To enable data sharing, use Xcode or the Developer portal to enable app groups for the containing app and its contained app extensions.

[上传与下载](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html#//apple_ref/doc/uid/TP40014214-CH21-SW1) In iOS, if your extension isn’t running when a background task completes, the system launches your containing app in the background and calls the `application:handleEventsForBackgroundURLSession:completionHandler:` app delegate method.

If your app extension initiates a background `NSURLSession` task, you must also set up a shared container that both the extension and its containing app can access. Use the `sharedContainerIdentifier` property of the `NSURLSessionConfiguration` class to specify an identifier for the shared container so that you can access it later.

[开启完全访问](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/CustomKeyboard.html#//apple_ref/doc/uid/TP40014214-CH16-SW1) 定位服务、地址簿、与宿主 APP 共享容器、网络请求/云输入等……

To ask the system to switch to another keyboard, call the `advanceToNextInputMode` method of the `UIInputViewController` class. The system picks the appropriate “next” keyboard from the list of user-enabled keyboards; there is no API to obtain a list of enabled keyboards or for picking a particular keyboard to switch to. 不能切换到指定输入法
