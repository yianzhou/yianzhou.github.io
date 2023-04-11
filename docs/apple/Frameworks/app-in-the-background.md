# App in the Background

> [WWDC 2019 - Advances in App Background Execution](https://developer.apple.com/videos/play/wwdc2019/707/)
>
> [WWDC 2020 - Background execution demystified](https://developer.apple.com/videos/play/wwdc2020/10063/)

## What's affecting Background Execution?

Top seven factors that are likely to affect:

- Critically low battery (iPhone battery <= 20%)
- Low Power Mode:
  - `ProcessInfo.processInfo.isLowPowerModeEnabled`
  - `NSProcessInfoPowerStateDidChange`
- App usage: There is an on-device predictive engine that learns which apps people will use and when.
- App switcher:
  - Users can stop transfers by swiping to kill the app in the App Switcher.
  - When the system determines which apps to run, it constrains to the set of apps that are still visible in the App Switcher, so as to prevent the app from running unexpectedly against user intent.
- Background App Refresh switch
- System budgets
- Rate limiting

## Background Modes

> [About the Background Execution Sequence](https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background/about_the_background_execution_sequence)

For apps that support one of the Background Modes capabilities, the system launches or resumes the app in the background to handle events associated with those capabilities.

![img-50](/assets/images/9e792176-b802-46f2-b94d-6fb288637109.png)

An app may enter the background from one of several different starting points:

- System events cause a not running app to be launched directly into the background.
- A foreground app transitions to the background when another app is launched or when the user returns to the Home screen.
- System events can cause a suspended app to be returned to the background.

![img-50](/assets/images/a668c5de-d033-423e-8aea-6100f72c3378.png)

[1] UIKit calls your app delegate's `application(_:didFinishLaunchingWithOptions:)` method.

[2] UIKit calls the app delegate's `applicationWillResignActive(_:)` method.

[3] UIKit calls the app delegate's `applicationDidEnterBackground(_:)` method. [This method has five seconds to perform any tasks and return.](https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background/extending_your_app_s_background_execution_time) Shortly after that method returns, the app's snapshot is taken, the system puts your app into the suspended state.

For most apps, five seconds is enough to perform any crucial tasks, but if you need more time, you can ask UIKit to extend your app’s runtime. You extend your app’s runtime by calling the `beginBackgroundTask(withName:expirationHandler:)` method.

## Background App Refresh

Check the status: `UIApplication.shared.backgroundRefreshStatus`

Observe the notification: `UIApplication.backgroundRefreshStatusDidChangeNotification`

Background App Refresh lets your app run periodically in the background so that it can update its content.

1\. Enable at: Xcode - Capabilities - Background Modes - Background fetch

2\. At launch time: `UIApplication.shared.setMinimumBackgroundFetchInterval(3600)`

3\. Implement the delegate method:

```swift
func application(_ application: UIApplication,
                 performFetchWithCompletionHandler completionHandler:
                 @escaping (UIBackgroundFetchResult) -> Void) {
   // Configure a URLSession object to download any new data.
   if let newData = fetchUpdates() {
      addDataToFeed(newData: newData)
      completionHandler(.newData)
   }
   completionHandler(.noData)
   // Calling the completion handler in a timely manner
}
```

## Background Notification

See [Background Notification]({% post_url apple/2021-01-25-user-notification %}#background-notification).

![img](/assets/images/cbfea2f0-a85b-41e3-8cce-69803c19941e.png)

Instead of running upon every push, the system delays the delivery of some pushes to limit the amount of execution while maintaining a frequent launch cadence. The time interval between runs was just 15 minutes, meaning we had many times per hour, and the app will be up-to-date before the user launches it.

## Background URLSession

You can create tasks that run in the background. **These tasks continue to run even when your app is suspended.**

_You don’t have to do all background network activity with background sessions. Apps that declare appropriate background modes can use default URL sessions and data tasks, just as if they were in the foreground._

```swift
// Listing 1
private lazy var urlSession: URLSession = {
    let config = URLSessionConfiguration.background(withIdentifier: "MySession")
    config.isDiscretionary = true // [1]
    config.sessionSendsLaunchEvents = true // to have the system to wake up your app when a task completes
    return URLSession(configuration: config, delegate: self, delegateQueue: nil)
}()
```

[1] The system will perform **discretionary** transfers when conditions are optimal, perhaps when the phone is plugged in and on Wi-Fi. If you enqueue a transfer while the app is in the background, the system will ignore the `isDiscretionary` property and treat it as true. From the foreground, you can optionally request discretionary.

You create download tasks from this session. With background sessions, **the actual transfer is performed by a process that is separate from your app’s process**.

These tasks use system intelligence to decide when to start and when to stop a download based on various factors like battery, CPU, Wi-Fi, etc.

If your app is in the background, the system may suspend your app. In this case, when the download finishes, the system resumes the app and calls the `UIApplicationDelegate` method:

```swift
func application(_ application: UIApplication,
                     handleEventsForBackgroundURLSession identifier: String,
                     completionHandler: @escaping () -> Void) {
    backgroundCompletionHandler = completionHandler
}
```

When all events have been delivered, the system calls the `URLSessionDelegate` method:

```swift
func urlSessionDidFinishEvents(forBackgroundURLSession session: URLSession) {
    DispatchQueue.main.async {
        if let appDelegate = UIApplication.shared.delegate as? AppDelegate,
            let backgroundCompletionHandler = appDelegate.backgroundCompletionHandler {
                backgroundCompletionHandler()
        }
    }
}
```

Once your resumed app calls the completion handler, the download task finishes its work and calls the `URLSessionDelegate` method:

```swift
func urlSession(_ session: URLSession,
                    downloadTask: URLSessionDownloadTask,
                    didFinishDownloadingTo location: URL) {
}
```

If the system terminated the app while it was suspended, the system relaunches the app in the background. As part of your launch time setup, recreate the background session (see Listing 1), using the same session identifier as before, to allow the system to reassociate the background download task with your session.

## Background App Refresh with Background URLSession

> [WWDC 2017 - Advances in Networking, Part 2](https://developer.apple.com/videos/play/wwdc2017/709)

One of the great use cases for background URLSession is taking advantage of another feature on the system, which is background app refresh.

![img](/assets/images/ea9d7c1f-be5d-41ae-b9e7-13e5e12bf344.png)

工作流：由于后台刷新机制，App 在后台启动（第一次）；然后我们使用 Background URLSession 下载数据；然后 App 可能再次被挂起；下载完成后，App 在后台启动（第二次），我们通过回调处理下载好的数据。

New `URLSessionTask` property: `var earliestBeginDate: Date?` (only applicable to background URLSession).

The way it works is while your app is running, you create a `URLSessionTask`; you'll opt in to our new scheduling API by setting an `earliestBeginDate`; then your process can go to sleep.

![img](/assets/images/1b0c28df-3f1c-41bc-8151-9e5b7305d5e9.png)

这样，两次后台启动可优化为一次。

This below method is called when a background session task with a delayed start time (as set with the `earliestBeginDate` property) is ready to start. This delegate method should be implemented if the request might become stale while waiting for the network load and needs to be replaced by a new request. Or you might make the decision this request is just useless at this point, cancel.

```swift
func urlSession(_ session: URLSession,
                    task: URLSessionTask,
                    willBeginDelayedRequest request: URLRequest,
                    completionHandler: @escaping (URLSession.DelayedRequestDisposition, URLRequest?) -> Void) {
    // example: Altering HTTP request headers to avoid a stale request.
    var updatedRequest = request
    updatedRequest.addValue("...", forHTTPHeaderField: "...")
    completionHandler(.useNewRequest, updatedRequest)
}
```

如果实现了这个代理方法，将会回到原来两次后台启动的工作流。开发者需考虑，应用的网络请求是否会变得“过时”而不再需要。如果应用内可以做出这个判断，那么在请求发生前、通过这个回调修改或取消请求，将是有价值的。因为一个过时的、不被需要的请求造成的开销，比多一次后台启动更大。

`countOfBytesClientExpectsToSend`, `countOfBytesClientExpectsToReceive` are used by the system to optimize the background task scheduling. Developers are strongly encouraged to provide an approximate upper bound, or an exact byte count, if possible, rather than accept the default.

## Background Processing

Background processing tasks give your app several minutes runtime to do maintenance work, like indexing a database, on-device Core ML training. The system will wait to run these tasks until the user is not actively using the device, such as when it's charging at night. As long as the user plugs in every day, your background processing tasks should be able to run daily.
