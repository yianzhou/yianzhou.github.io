"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3510],{55741:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var a=n(87462),s=(n(67294),n(3905));n(61839);const o={},i="App in the Background",r={unversionedId:"Frameworks/app-in-the-background",id:"Frameworks/app-in-the-background",title:"App in the Background",description:"WWDC 2019 - Advances in App Background Execution",source:"@site/docs/apple/Frameworks/app-in-the-background.md",sourceDirName:"Frameworks",slug:"/Frameworks/app-in-the-background",permalink:"/docs/apple/Frameworks/app-in-the-background",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/Frameworks/app-in-the-background.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"App Extension",permalink:"/docs/apple/Frameworks/app-extension"},next:{title:"Aspects",permalink:"/docs/apple/Frameworks/aspects"}},p={},l=[{value:"What&#39;s affecting Background Execution?",id:"whats-affecting-background-execution",level:2},{value:"Background Modes",id:"background-modes",level:2},{value:"Background App Refresh",id:"background-app-refresh",level:2},{value:"Background Notification",id:"background-notification",level:2},{value:"Background URLSession",id:"background-urlsession",level:2},{value:"Background App Refresh with Background URLSession",id:"background-app-refresh-with-background-urlsession",level:2},{value:"Background Processing",id:"background-processing",level:2}],u={toc:l};function d(e){let{components:t,...o}=e;return(0,s.kt)("wrapper",(0,a.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"app-in-the-background"},"App in the Background"),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},(0,s.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2019/707/"},"WWDC 2019 - Advances in App Background Execution")),(0,s.kt)("p",{parentName:"blockquote"},(0,s.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2020/10063/"},"WWDC 2020 - Background execution demystified"))),(0,s.kt)("h2",{id:"whats-affecting-background-execution"},"What's affecting Background Execution?"),(0,s.kt)("p",null,"Top seven factors that are likely to affect:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Critically low battery (iPhone battery <= 20%)"),(0,s.kt)("li",{parentName:"ul"},"Low Power Mode:",(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ProcessInfo.processInfo.isLowPowerModeEnabled")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"NSProcessInfoPowerStateDidChange")))),(0,s.kt)("li",{parentName:"ul"},"App usage: There is an on-device predictive engine that learns which apps people will use and when."),(0,s.kt)("li",{parentName:"ul"},"App switcher:",(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"Users can stop transfers by swiping to kill the app in the App Switcher."),(0,s.kt)("li",{parentName:"ul"},"When the system determines which apps to run, it constrains to the set of apps that are still visible in the App Switcher, so as to prevent the app from running unexpectedly against user intent."))),(0,s.kt)("li",{parentName:"ul"},"Background App Refresh switch"),(0,s.kt)("li",{parentName:"ul"},"System budgets"),(0,s.kt)("li",{parentName:"ul"},"Rate limiting")),(0,s.kt)("h2",{id:"background-modes"},"Background Modes"),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},(0,s.kt)("a",{parentName:"p",href:"https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background/about_the_background_execution_sequence"},"About the Background Execution Sequence"))),(0,s.kt)("p",null,"For apps that support one of the Background Modes capabilities, the system launches or resumes the app in the background to handle events associated with those capabilities."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"img-50",src:n(99763).Z,width:"770",height:"432"})),(0,s.kt)("p",null,"An app may enter the background from one of several different starting points:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"System events cause a not running app to be launched directly into the background."),(0,s.kt)("li",{parentName:"ul"},"A foreground app transitions to the background when another app is launched or when the user returns to the Home screen."),(0,s.kt)("li",{parentName:"ul"},"System events can cause a suspended app to be returned to the background.")),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"img-50",src:n(42420).Z,width:"714",height:"508"})),(0,s.kt)("p",null,"[1]"," UIKit calls your app delegate's ",(0,s.kt)("inlineCode",{parentName:"p"},"application(_:didFinishLaunchingWithOptions:)")," method."),(0,s.kt)("p",null,"[2]"," UIKit calls the app delegate's ",(0,s.kt)("inlineCode",{parentName:"p"},"applicationWillResignActive(_:)")," method."),(0,s.kt)("p",null,"[3]"," UIKit calls the app delegate's ",(0,s.kt)("inlineCode",{parentName:"p"},"applicationDidEnterBackground(_:)")," method. ",(0,s.kt)("a",{parentName:"p",href:"https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background/extending_your_app_s_background_execution_time"},"This method has five seconds to perform any tasks and return.")," Shortly after that method returns, the app's snapshot is taken, the system puts your app into the suspended state."),(0,s.kt)("p",null,"For most apps, five seconds is enough to perform any crucial tasks, but if you need more time, you can ask UIKit to extend your app\u2019s runtime. You extend your app\u2019s runtime by calling the ",(0,s.kt)("inlineCode",{parentName:"p"},"beginBackgroundTask(withName:expirationHandler:)")," method."),(0,s.kt)("h2",{id:"background-app-refresh"},"Background App Refresh"),(0,s.kt)("p",null,"Check the status: ",(0,s.kt)("inlineCode",{parentName:"p"},"UIApplication.shared.backgroundRefreshStatus")),(0,s.kt)("p",null,"Observe the notification: ",(0,s.kt)("inlineCode",{parentName:"p"},"UIApplication.backgroundRefreshStatusDidChangeNotification")),(0,s.kt)("p",null,"Background App Refresh lets your app run periodically in the background so that it can update its content."),(0,s.kt)("p",null,"1","."," Enable at: Xcode - Capabilities - Background Modes - Background fetch"),(0,s.kt)("p",null,"2","."," At launch time: ",(0,s.kt)("inlineCode",{parentName:"p"},"UIApplication.shared.setMinimumBackgroundFetchInterval(3600)")),(0,s.kt)("p",null,"3","."," Implement the delegate method:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-swift"},"func application(_ application: UIApplication,\n                 performFetchWithCompletionHandler completionHandler:\n                 @escaping (UIBackgroundFetchResult) -> Void) {\n   // Configure a URLSession object to download any new data.\n   if let newData = fetchUpdates() {\n      addDataToFeed(newData: newData)\n      completionHandler(.newData)\n   }\n   completionHandler(.noData)\n   // Calling the completion handler in a timely manner\n}\n")),(0,s.kt)("h2",{id:"background-notification"},"Background Notification"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"img",src:n(17577).Z,width:"1847",height:"465"})),(0,s.kt)("p",null,"Instead of running upon every push, the system delays the delivery of some pushes to limit the amount of execution while maintaining a frequent launch cadence. The time interval between runs was just 15 minutes, meaning we had many times per hour, and the app will be up-to-date before the user launches it."),(0,s.kt)("h2",{id:"background-urlsession"},"Background URLSession"),(0,s.kt)("p",null,"You can create tasks that run in the background. ",(0,s.kt)("strong",{parentName:"p"},"These tasks continue to run even when your app is suspended.")),(0,s.kt)("p",null,(0,s.kt)("em",{parentName:"p"},"You don\u2019t have to do all background network activity with background sessions. Apps that declare appropriate background modes can use default URL sessions and data tasks, just as if they were in the foreground.")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-swift"},'// Listing 1\nprivate lazy var urlSession: URLSession = {\n    let config = URLSessionConfiguration.background(withIdentifier: "MySession")\n    config.isDiscretionary = true // [1]\n    config.sessionSendsLaunchEvents = true // to have the system to wake up your app when a task completes\n    return URLSession(configuration: config, delegate: self, delegateQueue: nil)\n}()\n')),(0,s.kt)("p",null,"[1]"," The system will perform ",(0,s.kt)("strong",{parentName:"p"},"discretionary")," transfers when conditions are optimal, perhaps when the phone is plugged in and on Wi-Fi. If you enqueue a transfer while the app is in the background, the system will ignore the ",(0,s.kt)("inlineCode",{parentName:"p"},"isDiscretionary")," property and treat it as true. From the foreground, you can optionally request discretionary."),(0,s.kt)("p",null,"You create download tasks from this session. With background sessions, ",(0,s.kt)("strong",{parentName:"p"},"the actual transfer is performed by a process that is separate from your app\u2019s process"),"."),(0,s.kt)("p",null,"These tasks use system intelligence to decide when to start and when to stop a download based on various factors like battery, CPU, Wi-Fi, etc."),(0,s.kt)("p",null,"If your app is in the background, the system may suspend your app. In this case, when the download finishes, the system resumes the app and calls the ",(0,s.kt)("inlineCode",{parentName:"p"},"UIApplicationDelegate")," method:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-swift"},"func application(_ application: UIApplication,\n                     handleEventsForBackgroundURLSession identifier: String,\n                     completionHandler: @escaping () -> Void) {\n    backgroundCompletionHandler = completionHandler\n}\n")),(0,s.kt)("p",null,"When all events have been delivered, the system calls the ",(0,s.kt)("inlineCode",{parentName:"p"},"URLSessionDelegate")," method:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-swift"},"func urlSessionDidFinishEvents(forBackgroundURLSession session: URLSession) {\n    DispatchQueue.main.async {\n        if let appDelegate = UIApplication.shared.delegate as? AppDelegate,\n            let backgroundCompletionHandler = appDelegate.backgroundCompletionHandler {\n                backgroundCompletionHandler()\n        }\n    }\n}\n")),(0,s.kt)("p",null,"Once your resumed app calls the completion handler, the download task finishes its work and calls the ",(0,s.kt)("inlineCode",{parentName:"p"},"URLSessionDelegate")," method:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-swift"},"func urlSession(_ session: URLSession,\n                    downloadTask: URLSessionDownloadTask,\n                    didFinishDownloadingTo location: URL) {\n}\n")),(0,s.kt)("p",null,"If the system terminated the app while it was suspended, the system relaunches the app in the background. As part of your launch time setup, recreate the background session (see Listing 1), using the same session identifier as before, to allow the system to reassociate the background download task with your session."),(0,s.kt)("h2",{id:"background-app-refresh-with-background-urlsession"},"Background App Refresh with Background URLSession"),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},(0,s.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2017/709"},"WWDC 2017 - Advances in Networking, Part 2"))),(0,s.kt)("p",null,"One of the great use cases for background URLSession is taking advantage of another feature on the system, which is background app refresh."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"img",src:n(13615).Z,width:"2560",height:"754"})),(0,s.kt)("p",null,"\u5de5\u4f5c\u6d41\uff1a\u7531\u4e8e\u540e\u53f0\u5237\u65b0\u673a\u5236\uff0cApp \u5728\u540e\u53f0\u542f\u52a8\uff08\u7b2c\u4e00\u6b21\uff09\uff1b\u7136\u540e\u6211\u4eec\u4f7f\u7528 Background URLSession \u4e0b\u8f7d\u6570\u636e\uff1b\u7136\u540e App \u53ef\u80fd\u518d\u6b21\u88ab\u6302\u8d77\uff1b\u4e0b\u8f7d\u5b8c\u6210\u540e\uff0cApp \u5728\u540e\u53f0\u542f\u52a8\uff08\u7b2c\u4e8c\u6b21\uff09\uff0c\u6211\u4eec\u901a\u8fc7\u56de\u8c03\u5904\u7406\u4e0b\u8f7d\u597d\u7684\u6570\u636e\u3002"),(0,s.kt)("p",null,"New ",(0,s.kt)("inlineCode",{parentName:"p"},"URLSessionTask")," property: ",(0,s.kt)("inlineCode",{parentName:"p"},"var earliestBeginDate: Date?")," (only applicable to background URLSession)."),(0,s.kt)("p",null,"The way it works is while your app is running, you create a ",(0,s.kt)("inlineCode",{parentName:"p"},"URLSessionTask"),"; you'll opt in to our new scheduling API by setting an ",(0,s.kt)("inlineCode",{parentName:"p"},"earliestBeginDate"),"; then your process can go to sleep."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"img",src:n(46977).Z,width:"2560",height:"738"})),(0,s.kt)("p",null,"\u8fd9\u6837\uff0c\u4e24\u6b21\u540e\u53f0\u542f\u52a8\u53ef\u4f18\u5316\u4e3a\u4e00\u6b21\u3002"),(0,s.kt)("p",null,"This below method is called when a background session task with a delayed start time (as set with the ",(0,s.kt)("inlineCode",{parentName:"p"},"earliestBeginDate")," property) is ready to start. This delegate method should be implemented if the request might become stale while waiting for the network load and needs to be replaced by a new request. Or you might make the decision this request is just useless at this point, cancel."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-swift"},'func urlSession(_ session: URLSession,\n                    task: URLSessionTask,\n                    willBeginDelayedRequest request: URLRequest,\n                    completionHandler: @escaping (URLSession.DelayedRequestDisposition, URLRequest?) -> Void) {\n    // example: Altering HTTP request headers to avoid a stale request.\n    var updatedRequest = request\n    updatedRequest.addValue("...", forHTTPHeaderField: "...")\n    completionHandler(.useNewRequest, updatedRequest)\n}\n')),(0,s.kt)("p",null,"\u5982\u679c\u5b9e\u73b0\u4e86\u8fd9\u4e2a\u4ee3\u7406\u65b9\u6cd5\uff0c\u5c06\u4f1a\u56de\u5230\u539f\u6765\u4e24\u6b21\u540e\u53f0\u542f\u52a8\u7684\u5de5\u4f5c\u6d41\u3002\u5f00\u53d1\u8005\u9700\u8003\u8651\uff0c\u5e94\u7528\u7684\u7f51\u7edc\u8bf7\u6c42\u662f\u5426\u4f1a\u53d8\u5f97\u201c\u8fc7\u65f6\u201d\u800c\u4e0d\u518d\u9700\u8981\u3002\u5982\u679c\u5e94\u7528\u5185\u53ef\u4ee5\u505a\u51fa\u8fd9\u4e2a\u5224\u65ad\uff0c\u90a3\u4e48\u5728\u8bf7\u6c42\u53d1\u751f\u524d\u3001\u901a\u8fc7\u8fd9\u4e2a\u56de\u8c03\u4fee\u6539\u6216\u53d6\u6d88\u8bf7\u6c42\uff0c\u5c06\u662f\u6709\u4ef7\u503c\u7684\u3002\u56e0\u4e3a\u4e00\u4e2a\u8fc7\u65f6\u7684\u3001\u4e0d\u88ab\u9700\u8981\u7684\u8bf7\u6c42\u9020\u6210\u7684\u5f00\u9500\uff0c\u6bd4\u591a\u4e00\u6b21\u540e\u53f0\u542f\u52a8\u66f4\u5927\u3002"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"countOfBytesClientExpectsToSend"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"countOfBytesClientExpectsToReceive")," are used by the system to optimize the background task scheduling. Developers are strongly encouraged to provide an approximate upper bound, or an exact byte count, if possible, rather than accept the default."),(0,s.kt)("h2",{id:"background-processing"},"Background Processing"),(0,s.kt)("p",null,"Background processing tasks give your app several minutes runtime to do maintenance work, like indexing a database, on-device Core ML training. The system will wait to run these tasks until the user is not actively using the device, such as when it's charging at night. As long as the user plugs in every day, your background processing tasks should be able to run daily."))}d.isMDXComponent=!0},46977:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/1b0c28df-3f1c-41bc-8151-9e5b7305d5e9-ed343dfb9fb26736ac8268525a8d7c1a.png"},99763:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/9e792176-b802-46f2-b94d-6fb288637109-a595cbf5462c9b632b92f04355a0d4cd.png"},42420:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/a668c5de-d033-423e-8aea-6100f72c3378-736d2f9c2e529b9fb95308645879e0d2.png"},17577:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/cbfea2f0-a85b-41e3-8cce-69803c19941e-6cf2b616110bb877a14e385492d45663.png"},13615:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ea9d7c1f-be5d-41ae-b9e7-13e5e12bf344-bc8cceade4dc78737f0d9d274bb293ef.png"}}]);