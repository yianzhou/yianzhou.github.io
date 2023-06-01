"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[184],{77835:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>u});var a=n(87462),l=(n(67294),n(3905));n(61839);const r={},i="Flutter News",o={unversionedId:"flutter-news",id:"flutter-news",title:"Flutter News",description:"3.10",source:"@site/docs/flutter/flutter-news.md",sourceDirName:".",slug:"/flutter-news",permalink:"/docs/flutter/flutter-news",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Flutter Gist",permalink:"/docs/flutter/flutter-gist"},next:{title:"Flutter Primer",permalink:"/docs/flutter/"}},s={},u=[{value:"3.10",id:"310",level:2},{value:"3.7",id:"37",level:2},{value:"3.3",id:"33",level:2}],p={toc:u};function d(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"flutter-news"},"Flutter News"),(0,l.kt)("h2",{id:"310"},"3.10"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://medium.com/flutter/whats-new-in-flutter-3-10-b21db2c38c73"},"What\u2019s new in Flutter 3.10. Seamless web and mobile integration\u2026 | by Kevin Chisholm | Flutter | May, 2023 | Medium")),(0,l.kt)("p",null,"Material 3: Developers must \u201copt in\u201d to these changes using the ",(0,l.kt)("inlineCode",{parentName:"p"},"useMaterial3")," theme flag. In the next stable release, ",(0,l.kt)("inlineCode",{parentName:"p"},"useMaterial3")," defaults to true."),(0,l.kt)("p",null,"All M3 components configure the default colors of the theme\u2019s ",(0,l.kt)("inlineCode",{parentName:"p"},"ColorScheme"),". You can create a custom color scheme either from a single \u201cseed\u201d color or from an image. \u4ece\u4e00\u4e2a\u79cd\u5b50\u989c\u8272\u6216\u8005\u4ece\u4e00\u5f20\u56fe\u7247\uff0c\u5c31\u80fd\u521b\u5efa\u4e00\u5957\u6807\u51c6\u8272\u7248\u3002"),(0,l.kt)("p",null,"Flutter supports SLSA level 1"),(0,l.kt)("p",null,"By default, all apps built for iOS with Flutter 3.10 use ",(0,l.kt)("strong",{parentName:"p"},"Impeller"),". Impeller on Android remains under active development but not ready for preview."),(0,l.kt)("p",null,"Eliminating Jank: You need to set the ",(0,l.kt)("inlineCode",{parentName:"p"},"FlutterViews")," background color to a non-nil value."),(0,l.kt)("p",null,"In this release, we moved the opening and decoding of local images from the Dart thread to a background thread. This change eliminates potential long pauses on screens with a lot of local images, while avoiding delaying vsync events."),(0,l.kt)("p",null,"Reducing iOS startup latency: An inefficient strategy for identifier lookups in app bundles increased app startup latency. This startup latency grows in proportion to the app\u2019s size. In this release, we fixed the bundle identifier lookup. This reduced startup latency by 100ms or about 30\u201350% in a large production application."),(0,l.kt)("p",null,"It adds the ability to decode ",(0,l.kt)("strong",{parentName:"p"},"APNG")," images."),(0,l.kt)("p",null,"iOS Wireless debugging."),(0,l.kt)("p",null,"Flutter apps on iOS can now support accurate rendering for wide gamut images. \u5e7f\u8272\u57df\u56fe\u7247"),(0,l.kt)("h2",{id:"37"},"3.7"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://medium.com/flutter/whats-new-in-flutter-3-7-38cbea71133c"},"What\u2019s new in Flutter 3.7. Material 3 updates, iOS improvements\u2026 | by Kevin Chisholm | Flutter | Medium")),(0,l.kt)("p",null,"Enhanced Material 3 support, Menu bars and cascading menus"),(0,l.kt)("p",null,"Impeller preview: We expect to make Impeller the default renderer on iOS in a forthcoming stable release."),(0,l.kt)("p",null,"When you release an iOS app, a checklist of settings to update ensures that your app is ready for submission to the App Store. The flutter build ipa command now validates some of these settings."),(0,l.kt)("p",null,"DevTools updates."),(0,l.kt)("p",null,"Now Platform Channels can be invoked from any Isolate. Previously, users were only able to invoke Platform Channels from Flutter\u2019s supplied main isolate."),(0,l.kt)("p",null,"This release introduces a few improvements to ",(0,l.kt)("strong",{parentName:"p"},"memory management")," that have the collective effect of reducing jank caused by garbage collection pauses, reducing CPU utilization due to allocation velocity and background GC threads, and reducing the memory footprint."),(0,l.kt)("h2",{id:"33"},"3.3"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://medium.com/flutter/whats-new-in-flutter-3-3-893c7b9af1ff"},"What\u2019s new in Flutter 3.3. Exciting updates for text handling\u2026 | by Kevin Chisholm | Flutter | Medium")),(0,l.kt)("p",null,"Flutter web apps ",(0,l.kt)("inlineCode",{parentName:"p"},"SelectableArea")," widget."),(0,l.kt)("p",null,"Flutter 3.3 provides improved support for trackpad input."),(0,l.kt)("p",null,"Flutter now supports Scribble handwriting input using the Apple Pencil on iPadOS."),(0,l.kt)("p",null,"Rich text editor updates: ",(0,l.kt)("a",{parentName:"p",href:"https://flutter.github.io/samples/rich_text_editor.html"},"Flutter samples")),(0,l.kt)("p",null,"Material Design 3"),(0,l.kt)("p",null,"Windows desktop application versions can now be set from your projects pubspec.yaml file and build arguments."),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"go_router")," package, maintained by the Flutter team, simplifies routing by providing a declarative, url-based API, making it easier to navigate and handle deep-links."),(0,l.kt)("p",null,"Visual Studio Code extension for Flutter has several updates."),(0,l.kt)("p",null,"Raster cache improvements increases the performance of ",(0,l.kt)("strong",{parentName:"p"},"loading images from assets")," by eliminating copies and reducing Dart garbage collection (GC) pressure. ",(0,l.kt)("a",{parentName:"p",href:"https://docs.flutter.dev/release/breaking-changes/image-provider-load-buffer"},"Adding ImageProvider.loadBuffer | Flutter")),(0,l.kt)("p",null,"iOS pointer compression disabled."),(0,l.kt)("p",null,"In this release, instead of using a custom ",(0,l.kt)("inlineCode",{parentName:"p"},"Zone"),", you should catch all errors and exceptions by setting the ",(0,l.kt)("inlineCode",{parentName:"p"},"PlatformDispatcher.onError")," callback. For more information, check out the updated ",(0,l.kt)("a",{parentName:"p",href:"https://docs.flutter.dev/testing/errors"},"Handling errors in Flutter | Flutter"),"."),(0,l.kt)("p",null,"You should regard the Engine\u2019s ",(0,l.kt)("inlineCode",{parentName:"p"},"FragmentProgram")," API as accepting only the output of Flutter\u2019s build tooling."),(0,l.kt)("p",null,"The 3.3 stable version of Flutter and all following stable releases no longer support 32-bit iOS devices and iOS versions 9 and 10."),(0,l.kt)("p",null,"Flutter will drop support for bitcode in a future stable release."))}d.isMDXComponent=!0}}]);