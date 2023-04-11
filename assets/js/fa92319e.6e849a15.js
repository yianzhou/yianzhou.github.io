"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6340],{67942:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>p,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=n(87462),o=(n(67294),n(3905));n(61839);const i={},p="App Extension",s={unversionedId:"Frameworks/app-extension",id:"Frameworks/app-extension",title:"App Extension",description:"iOS and macOS define several types of app extensions, each of which is tied to a single, well-scoped area of the system. A system area that enables extensions is called an extension point.",source:"@site/docs/apple/Frameworks/app-extension.md",sourceDirName:"Frameworks",slug:"/Frameworks/app-extension",permalink:"/docs/apple/Frameworks/app-extension",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/Frameworks/app-extension.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"UIKit",permalink:"/docs/apple/Frameworks/UIKit"},next:{title:"App in the Background",permalink:"/docs/apple/Frameworks/app-in-the-background"}},r={},l=[],c={toc:l};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"app-extension"},"App Extension"),(0,o.kt)("p",null,"iOS and macOS define several types of ",(0,o.kt)("strong",{parentName:"p"},"app extensions"),", each of which is tied to a single, well-scoped area of the system. A system area that enables extensions is called an ",(0,o.kt)("strong",{parentName:"p"},"extension point"),"."),(0,o.kt)("p",null,"An app extension is different from an app. Although you must use an app to contain and deliver your extensions, each extension is a separate binary that runs independent of the app used to deliver it."),(0,o.kt)("p",null,"You create an app extension by adding a new ",(0,o.kt)("strong",{parentName:"p"},"target")," to an app. You can add multiple extension targets to a single app (an app that contains one or more extensions is called a ",(0,o.kt)("strong",{parentName:"p"},"containing app"),")."),(0,o.kt)("p",null,"An app that a user employs to choose an app extension is called a ",(0,o.kt)("strong",{parentName:"p"},"host app"),". An app extension communicates primarily with its host app. Any app extension and its containing app can access shared data in a privately defined shared container."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"A Today widget (",(0,o.kt)("strong",{parentName:"p"},"and no other app extension type"),") can ask the system to open its containing app by calling the ",(0,o.kt)("inlineCode",{parentName:"p"},"openURL:completionHandler:")," method of the ",(0,o.kt)("inlineCode",{parentName:"p"},"NSExtensionContext")," class.")),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/Art/detailed_communication_2x.png",alt:"image"})),(0,o.kt)("p",null,"Each app extension template includes a property list file (that is, an Info.plist file), a view controller class, and a default user interface, all of which are defined by the extension point."),(0,o.kt)("p",null,"When a host app sends a request to an app extension, it specifies an extension ",(0,o.kt)("strong",{parentName:"p"},"context"),"."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionCreation.html#//apple_ref/doc/uid/TP40014214-CH5-SW1"},"\u5982\u4f55\u8c03\u8bd5\uff1f"),"In your extension scheme\u2019s Run phase, you specify a host app as the executable."),(0,o.kt)("p",null,"\u6570\u636e\u5171\u4eab To enable data sharing, use Xcode or the Developer portal to enable app groups for the containing app and its contained app extensions."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html#//apple_ref/doc/uid/TP40014214-CH21-SW1"},"\u4e0a\u4f20\u4e0e\u4e0b\u8f7d")," In iOS, if your extension isn\u2019t running when a background task completes, the system launches your containing app in the background and calls the ",(0,o.kt)("inlineCode",{parentName:"p"},"application:handleEventsForBackgroundURLSession:completionHandler:")," app delegate method."),(0,o.kt)("p",null,"If your app extension initiates a background ",(0,o.kt)("inlineCode",{parentName:"p"},"NSURLSession")," task, you must also set up a shared container that both the extension and its containing app can access. Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"sharedContainerIdentifier")," property of the ",(0,o.kt)("inlineCode",{parentName:"p"},"NSURLSessionConfiguration")," class to specify an identifier for the shared container so that you can access it later."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/CustomKeyboard.html#//apple_ref/doc/uid/TP40014214-CH16-SW1"},"\u5f00\u542f\u5b8c\u5168\u8bbf\u95ee")," \u5b9a\u4f4d\u670d\u52a1\u3001\u5730\u5740\u7c3f\u3001\u4e0e\u5bbf\u4e3b APP \u5171\u4eab\u5bb9\u5668\u3001\u7f51\u7edc\u8bf7\u6c42/\u4e91\u8f93\u5165\u7b49\u2026\u2026"),(0,o.kt)("p",null,"To ask the system to switch to another keyboard, call the ",(0,o.kt)("inlineCode",{parentName:"p"},"advanceToNextInputMode")," method of the ",(0,o.kt)("inlineCode",{parentName:"p"},"UIInputViewController")," class. The system picks the appropriate \u201cnext\u201d keyboard from the list of user-enabled keyboards; there is no API to obtain a list of enabled keyboards or for picking a particular keyboard to switch to. \u4e0d\u80fd\u5207\u6362\u5230\u6307\u5b9a\u8f93\u5165\u6cd5"))}d.isMDXComponent=!0}}]);