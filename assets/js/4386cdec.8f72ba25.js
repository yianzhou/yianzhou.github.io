"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5594],{94146:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var n=i(87462),a=(i(67294),i(3905)),l=i(61839);const r={},d="Flutter Widget",o={unversionedId:"flutter-widget",id:"flutter-widget",title:"Flutter Widget",description:"Bringing it all together",source:"@site/docs/flutter/flutter-widget.md",sourceDirName:".",slug:"/flutter-widget",permalink:"/docs/flutter/flutter-widget",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Flutter Source",permalink:"/docs/flutter/flutter-source"}},p={},s=[{value:"Widget \u539f\u7406",id:"widget-\u539f\u7406",level:2},{value:"StatelessWidget",id:"statelesswidget",level:2},{value:"Widget \u7b80\u4ecb",id:"widget-\u7b80\u4ecb",level:2},{value:"Widget \u7b80\u4ecb 2",id:"widget-\u7b80\u4ecb-2",level:2},{value:"\u6309\u94ae",id:"\u6309\u94ae",level:2},{value:"\u751f\u547d\u5468\u671f",id:"\u751f\u547d\u5468\u671f",level:2},{value:"Widget \u4e0e Element",id:"widget-\u4e0e-element",level:2},{value:"Widget Key",id:"widget-key",level:2},{value:"FutureBuilder",id:"futurebuilder",level:2},{value:"InheritedWidget",id:"inheritedwidget",level:2},{value:"ChangeNotifier",id:"changenotifier",level:2},{value:"RenderObjectWidget",id:"renderobjectwidget",level:2},{value:"PlatformView",id:"platformview",level:2},{value:"Rendering",id:"rendering",level:3},{value:"Widget",id:"widget",level:3},{value:"Service",id:"service",level:3},{value:"iOS",id:"ios",level:3},{value:"\u7ebf\u7a0b",id:"\u7ebf\u7a0b",level:3}],u={toc:s};function m(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"flutter-widget"},"Flutter Widget"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("a",{parentName:"p",href:"https://flutter.dev/docs/development/ui/widgets-intro#bringing-it-all-together"},"Bringing it all together")),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG"},"Flutter Widget of the Week")),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/playlist?list=PLOU2XLYxmsIJyiwUPCou_OVTpRIn_8UMd"},"Flutter Widget 101"))),(0,a.kt)("h2",{id:"widget-\u539f\u7406"},"Widget \u539f\u7406"),(0,a.kt)("p",null,"In Flutter, almost everything is a widget."),(0,a.kt)("p",null,"Widgets are immutable and only exist until they need to be changed. \u4e00\u65e6\u521b\u5efa\u5c31\u662f\u4e0d\u53ef\u53d8\u7684\uff0cstate \u6539\u53d8\u4f1a\u5bfc\u81f4\u9500\u6bc1\u5e76\u91cd\u5efa\u3002"),(0,a.kt)("p",null,"Flutter\u2019s widgets are lightweight, in part due to their immutability. Because they aren\u2019t views themselves, and aren\u2019t directly drawing anything, but rather are a ",(0,a.kt)("strong",{parentName:"p"},"description")," of the UI and its semantics that get \u201cinflated\u201d into actual view objects under the hood."),(0,a.kt)("p",null,"Implementing a stateful widget requires at least two classes: 1) a ",(0,a.kt)("inlineCode",{parentName:"p"},"StatefulWidget")," class that creates an instance of 2) a ",(0,a.kt)("inlineCode",{parentName:"p"},"State")," class. You might wonder why StatefulWidget and State are separate objects. In Flutter, these two types of objects have different life cycles. Widgets are temporary objects, used to construct a presentation of the application in its current state. State objects, on the other hand, are persistent between calls to ",(0,a.kt)("inlineCode",{parentName:"p"},"build()"),", allowing them to remember information."),(0,a.kt)("p",null,"Calling ",(0,a.kt)("inlineCode",{parentName:"p"},"setState")," marks this widget as dirty and schedules it to be rebuilt the next time your app needs to update the screen. By managing state in this way, you don\u2019t need to write separate code for creating and updating child widgets. Instead, you simply implement the build function, which handles both situations."),(0,a.kt)("h2",{id:"statelesswidget"},"StatelessWidget"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dart"},"import 'package:flutter/material.dart';\n\n// \u7ed9\u5361\u7247\u89c6\u56fe\u52a0\u4e0a\u9634\u5f71\nclass CardShadowContainer extends StatelessWidget {\n  const CardShadowContainer({Key key, this.child}) : super(key: key);\n\n  final Widget child;\n\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      child: child,\n      decoration: const BoxDecoration(\n        borderRadius: BorderRadius.all(\n          Radius.circular(4.0),\n        ),\n        boxShadow: [\n          BoxShadow(\n            color: Color.fromRGBO(0, 0, 0, 0.02), // \u9634\u5f71\u989c\u8272\n            offset: Offset(0.0, 2.0), // \u9634\u5f71y\u8f74\u504f\u79fb\u91cf\n            blurRadius: 4, // \u9634\u5f71\u6a21\u7cca\u7a0b\u5ea6\n            spreadRadius: 0, // \u9634\u5f71\u6269\u6563\u7a0b\u5ea6\n          )\n        ],\n      ),\n    );\n  }\n}\n")),(0,a.kt)("h2",{id:"widget-\u7b80\u4ecb"},"Widget \u7b80\u4ecb"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"MaterialApp")," \u4f5c\u4e3a\u6839 Widget\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Scaffold")," \u662f Material Design \u5e03\u5c40\u7ed3\u6784\u7684\u57fa\u672c\u5b9e\u73b0\uff0c\u5c5e\u6027\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"appBar"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"floatingActionButton"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"drawer")," \u7b49\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Center")," \u4f1a\u5c06\u5b83\u7684 child \u5c45\u4e2d\u663e\u793a\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Container")," \u53ef\u8bbe\u7f6e\u5bbd\u9ad8\u3001\u5706\u89d2\u3001margin\u3001padding \u7684\u5bb9\u5668\u3002\u5c5e\u6027\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"alignment"),"\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ListView")," \u7ebf\u6027\u6392\u5217\u5b83\u7684 children \u7684\u53ef\u6ed1\u52a8\u7ec4\u4ef6\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"ListTile"),": A single fixed-height row that typically contains some text as well as a leading or trailing icon.")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"GridView"),": A scrollable, 2D array of widgets."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Padding"),": Fluttter \u4e2d\u5f88\u591a Widget \u6ca1\u6709 padding \u5c5e\u6027\uff0c\u53ef\u4ee5\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"Padding"),"\u7ec4\u4ef6\u6765\u5b9e\u73b0\u5185\u95f4\u8ddd\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Row"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Column"),": \u6c34\u5e73\u3001\u5782\u76f4\u5e03\u5c40\u7ec4\u4ef6\uff0c\u51e0\u4e4e\u662f\u6700\u5e38\u7528\u7684\u7ec4\u4ef6\u3002\u5c5e\u6027\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"mainAxisAlignment"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"crossAxisAlignment"),"\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Expanded")," \u53ef\u4ee5\u7528\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"Row"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"Column"),"\uff0c\u5c5e\u6027\u6709 ",(0,a.kt)("inlineCode",{parentName:"li"},"flex"),"\u3002\u4f8b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"Row")," \u91cc\u56fa\u5b9a\u5bbd\u5ea6 + \u81ea\u9002\u5e94\u7684\u7ec4\u5408\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Flexible"),": Flexible takes only the needed space, and Expanded takes all available space."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SizedBox")," \u53ef\u4ee5\u7528\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"Row"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"Column"),"\uff0c\u7528\u4e8e\u5360\u4f4d\u56fa\u5b9a\u7684\u5bbd/\u9ad8\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Spacer")," \u53ef\u4ee5\u7528\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"Row"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"Column")," \u5e03\u5c40\u65f6\u52a0\u5165\u53ef\u81ea\u9002\u5e94\u7684\u95f4\u9694\u3002")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Stack")," \u5c06 children \u90fd\u5806\u53e0\u5728\u4e00\u8d77\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Align"),"\uff1a\u4f9d\u9644\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"Stack")," \u7684\u67d0\u4e2a\u65b9\u4f4d\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Positioned"),"\uff1a\u7075\u6d3b\u63a7\u5236\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"Stack")," \u4e2d\u7684\u4f4d\u7f6e\u3002")),(0,a.kt)("h2",{id:"widget-\u7b80\u4ecb-2"},"Widget \u7b80\u4ecb 2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://api.flutter.dev/flutter/material/InkWell-class.html"},(0,a.kt)("inlineCode",{parentName:"a"},"InkWell")),": A rectangular area of a Material that responds to touch."),(0,a.kt)("p",null,"\u5b9e\u73b0\u900f\u660e\u5ea6\uff1aIn Flutter, most of the time you need to wrap a widget in an ",(0,a.kt)("inlineCode",{parentName:"p"},"Opacity")," widget to accomplish this."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"AspectRatio")," \u53ef\u4ee5\u8bbe\u7f6e child \u7684\u5bbd\u9ad8\u6bd4\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Card")," \u5361\u7247\u6548\u679c\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Wrap"),"\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"Row"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Column")," \u662f\u5355\u884c\u5355\u5217\u7684\uff0c\u4f46 ",(0,a.kt)("inlineCode",{parentName:"p"},"Wrap")," \u53ef\u4ee5\u7a81\u7834\u8fd9\u4e2a\u9650\u5236\uff0c\u4e3b\u8f74\u7a7a\u95f4\u4e0d\u8db3\u65f6\u5219\u5411\u4ea4\u53c9\u8f74\u6269\u5c55\u663e\u793a\uff08\u5373\u53ef\u4ee5\u6362\u884c\uff09\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"FittedBox"),": \u7c7b\u4f3c ",(0,a.kt)("inlineCode",{parentName:"p"},"UIView")," \u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"contentMode")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"InheritedWidget"),": Base class for widgets that efficiently propagate information down the tree. \u4f8b\u5982\uff1a\u5728\u63a7\u4ef6\u6811\u7684\u53f6\u5b50\u8282\u70b9\u53d6\u6839\u8282\u70b9\u7684\u4fe1\u606f\u3002"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://api.flutter.dev/flutter/widgets/Hero-class.html"},(0,a.kt)("inlineCode",{parentName:"a"},"Hero")),": A widget that marks its child as being a candidate for ",(0,a.kt)("a",{parentName:"p",href:"https://flutter.dev/docs/development/ui/animations/hero-animations"},"hero animations"),"."),(0,a.kt)("h2",{id:"\u6309\u94ae"},"\u6309\u94ae"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"img",src:i(84388).Z,width:"1209",height:"406"})),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"RaisedButton")," \u5df2\u7ecf\u5f03\u7528\uff0c\u8bf7\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"ElevatedButton"),"\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"FlatButton"),"\uff1a\u6241\u5e73\u7684\u6309\u94ae\uff0c\u5df2\u7ecf\u5f03\u7528\uff0c\u8bf7\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"TextButton"),"\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"OutlineButton"),"\uff1a\u7ebf\u6846\u6309\u94ae\uff0c\u5df2\u7ecf\u5f03\u7528\uff0c\u8bf7\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"OutlinedButton"),"\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"IconButton"),"\uff1a\u56fe\u6807\u6309\u94ae"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ButtonBar"),"\uff1a\u6309\u94ae\u7ec4"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"FloatingActionButton"),"\uff1a\u6d6e\u52a8\u6309\u94ae"),(0,a.kt)("h2",{id:"\u751f\u547d\u5468\u671f"},"\u751f\u547d\u5468\u671f"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"img",src:i(6199).Z,width:"640",height:"347"})),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"State<StatefulWidget> createState ()")," return state for this widget."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"bool mounted"),' Whether this State object is currently in a tree. After createState and before calling initState, the framework "mounts" the State object by associating it with a BuildContext.'),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void initState ()")," Called when this object is inserted into the tree. Subscribe to the object\uff0cfor example a ChangeNotifier or Stream in this callback."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void didChangeDependencies ()")," This method is also called immediately after ",(0,a.kt)("inlineCode",{parentName:"p"},"initState"),". \u5b83\u4f1a\u5728\u201c\u4f9d\u8d56\u201d\u53d1\u751f\u53d8\u5316\u65f6\u88ab Flutter \u6846\u67b6\u8c03\u7528\u3002\u800c\u8fd9\u4e2a\u201c\u4f9d\u8d56\u201d\u6307\u7684\u5c31\u662f\u5b50 widget \u662f\u5426\u4f7f\u7528\u4e86\u7236 widget \u4e2d ",(0,a.kt)("inlineCode",{parentName:"p"},"InheritedWidget")," \u7684\u6570\u636e\uff01\u6bd4\u5982\u5f53 ",(0,a.kt)("inlineCode",{parentName:"p"},"InheritedWidget")," \u7684\u4e3b\u9898\u3001\u989c\u8272\u7b49\u53d1\u751f\u53d8\u5316\u65f6\uff0c\u5b50 widget \u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"didChangeDependencies")," \u65b9\u6cd5\u5c06\u4f1a\u88ab\u8c03\u7528\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Widget build (BuildContext context)")," This method can potentially be called in every frame and should not have any side effects beyond building a widget."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void didUpdateWidget (covariant T oldWidget)")," If the parent widget rebuilds and request that this location in the tree update to display a new widget with the same runtimeType and Widget.key, the framework will update the widget property of this State object to refer to the new widget and then call this method with the previous widget as an argument."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void setState (VoidCallback fn)")," Notify the framework that the internal state of this object has changed."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void deactivate ()")," Called when this object is removed from the tree."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void dispose ()")," Called when this object is removed from the tree permanently."),(0,a.kt)("h2",{id:"widget-\u4e0e-element"},"Widget \u4e0e Element"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("a",{parentName:"p",href:"https://www.bilibili.com/video/BV15k4y1B74z"},"Flutter \u6559\u7a0b Key-2 Widget \u548c Element \u7684\u5bf9\u5e94\u5173\u7cfb"))),(0,a.kt)("p",null,"Widget \u662f\u4e0d\u53ef\u53d8\u7684\uff0c\u4e00\u65e6\u88ab\u5efa\u7acb\u51fa\u6765\uff0c\u5c31\u4e0d\u53ef\u4ee5\u5728\u8fd0\u884c\u65f6\u6539\u53d8\u3002\u80fd\u591f\u6539\u53d8\u7684\u662f\u72b6\u6001\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"setState")," \u4f1a\u89e6\u53d1 ",(0,a.kt)("inlineCode",{parentName:"p"},"Widget")," \u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"build")," \u65b9\u6cd5\uff0c\u91cd\u5efa\u4e00\u4e2a\u65b0\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"Widget"),"\uff0c\u65e7\u7684\u4f1a\u88ab\u629b\u5f03\u6389\uff0c\u800c\u4e0d\u662f\u5728\u65e7\u7684\u57fa\u7840\u4e0a\u505a\u4fee\u6539\u3002"),(0,a.kt)("p",null,"\u65b0\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"Widget")," \u4e0d\u65ad\u6784\u5efa\u3001\u65e7\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"Widget")," \u4e0d\u65ad\u5e9f\u5f03\uff0c\u80fd\u591f\u5728\u8fd9\u4e2a\u8fc7\u7a0b\u4e2d\u88ab\u59cb\u7ec8\u4fdd\u5b58\u4e0b\u6765\u7684\uff0c\u662f\u72b6\u6001\u3002\u8fd9\u5c31\u662f\u4e3a\u4ec0\u4e48 ",(0,a.kt)("inlineCode",{parentName:"p"},"StatefulWidget")," \u8981\u521b\u5efa\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"State")," \u5bf9\u8c61\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"img",src:i(56789).Z,width:"2030",height:"1086"})),(0,a.kt)("h2",{id:"widget-key"},"Widget Key"),(0,a.kt)("p",null,"Widget \u91cd\u5efa\u65f6\u6bd4\u8f83\u4e24\u4e2a\u4e1c\u897f 1. Widget \u7684\u7c7b\u578b\uff1b2. Key\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dart",metastring:"title='packages/flutter/lib/src/widgets/framework.dart'",title:"'packages/flutter/lib/src/widgets/framework.dart'"},"static bool canUpdate(Widget oldWidget, Widget newWidget) {\n  return oldWidget.runtimeType == newWidget.runtimeType\n      && oldWidget.key == newWidget.key;\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Key")," \u6709\u4e24\u4e2a\u5b50\u7c7b\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"LocalKey")," \u9488\u5bf9\u540c\u4e00\u7ea7 Widget\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"GlobalKey")," \u9488\u5bf9\u5168\u5c40\uff1b\u5c3d\u91cf\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"LocalKey")," \u56e0\u4e3a\u4f1a\u5feb\u5f88\u591a\u3002"),(0,a.kt)(l.G,{chart:"classDiagram\n    Key <|-- LocalKey\n    Key <|-- GlobalKey\n    LocalKey <|-- ValueKey\n    LocalKey <|-- ObjectKey\n    LocalKey <|-- UniqueKey",mdxType:"Mermaid"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"GlobalKey")," \u4e3b\u8981\u6709\u4e24\u79cd\u7528\u6cd5\uff0c\u4e00\u662f\u8ba9 Widget \u5728 Widget Tree \u53d1\u751f\u5927\u5e45\u6539\u52a8\u7684\u65f6\u5019\u4ecd\u7136\u4fdd\u7559\u72b6\u6001\uff1b\u4e8c\u662f\u50cf JavaScript \u91cc\u9762 ",(0,a.kt)("inlineCode",{parentName:"p"},"getElementById")," \u90a3\u6837\u67e5\u627e\u67d0\u4e2a\u5143\u7d20\u5e76\u5f97\u5230\u5b83\u7684\u5404\u79cd\u4fe1\u606f\u3002"),(0,a.kt)("h2",{id:"futurebuilder"},"FutureBuilder"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("a",{parentName:"p",href:"https://www.bilibili.com/video/BV165411V7PS/?spm_id_from=pageDriver"},"Flutter \u6559\u7a0b Async-3 \u6df1\u5165\u8be6\u89e3 FutureBuilder \u7ec4\u4ef6"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dart"},"FutureBuilder getSimpleFutureBuilder() {\n  return FutureBuilder(\n    future: getDelayedAlice(),\n    builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {\n      print(snapshot.connectionState); // future \u76ee\u524d\u7684\u72b6\u6001\n      print(snapshot.data); // future \u7684\u6570\u636e\uff08\u5df2\u5b8c\u6210\u7684\u60c5\u51b5\u4e0b\uff09\n      print(snapshot.error); // future \u7684\u9519\u8bef\uff08\u5f02\u5e38\u7684\u60c5\u51b5\u4e0b\uff09\n      return Container();\n    },\n  );\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"FutureBuilder")," \u4e3b\u8981\u7528\u4e8e\u8ddf\u8e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"Future")," \u7684\u53d8\u5316\u5e76\u81ea\u52a8\u91cd\u7ed8\u3002\u6bcf\u6b21\u91cd\u7ed8\u65f6\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"AsyncSnapshot")," \u4f1a\u63cf\u8ff0 ",(0,a.kt)("inlineCode",{parentName:"p"},"Future")," \u7684\u6700\u65b0\u52a8\u6001\u3002"),(0,a.kt)("h2",{id:"inheritedwidget"},"InheritedWidget"),(0,a.kt)(l.G,{chart:"classDiagram\n  Widget~abstract~ <|-- ProxyWidget~abstract~\n  ProxyWidget <|-- InheritedWidget~abstract~",mdxType:"Mermaid"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Widget"),": Describes the configuration for an ",(0,a.kt)("inlineCode",{parentName:"p"},"Element"),"."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ProxyWidget"),": A widget that has a child widget provided to it, instead of building a new widget."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"InheritedWidget"),": Base class for widgets that efficiently propagate information down the tree."),(0,a.kt)("h2",{id:"changenotifier"},"ChangeNotifier"),(0,a.kt)(l.G,{chart:"classDiagram\n  Listenable~abstract~ <|-- ChangeNotifier\n  Listenable~abstract~ <|-- ValueListenable~abstract~\n  ChangeNotifier <|-- ValueNotifier\n  ValueListenable <|-- ValueNotifier : implements\n\n  Widget~abstract~ <|-- StatefulWidget~abstract~\n  StatefulWidget <|-- AnimatedWidget~abstract~\n  AnimatedWidget <|-- AnimatedBuilder\n  StatefulWidget <|-- ValueListenableBuilder",mdxType:"Mermaid"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"AnimatedBuilder"),": Despite the name, ",(0,a.kt)("inlineCode",{parentName:"p"},"AnimatedBuilder")," is not limited to ",(0,a.kt)("inlineCode",{parentName:"p"},"Animation"),"s. Any subtype of ",(0,a.kt)("inlineCode",{parentName:"p"},"Listenable")," (such as ",(0,a.kt)("inlineCode",{parentName:"p"},"ChangeNotifier")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"ValueNotifier"),") can be used with an ",(0,a.kt)("inlineCode",{parentName:"p"},"AnimatedBuilder")," to rebuild only certain parts of a widget when the ",(0,a.kt)("inlineCode",{parentName:"p"},"Listenable")," notifies its listeners. This technique is a performance improvement that allows rebuilding only specific widgets leaving others untouched."),(0,a.kt)("h2",{id:"renderobjectwidget"},"RenderObjectWidget"),(0,a.kt)(l.G,{chart:"classDiagram\n  Widget~abstract~ <|-- RenderObjectWidget~abstract~\n  RenderObjectWidget <|-- LeafRenderObjectWidget~abstract~\n  RenderObjectWidget <|-- SingleChildRenderObjectWidget~abstract~\n  RenderObjectWidget <|-- MultiChildRenderObjectWidget~abstract~",mdxType:"Mermaid"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"LeafRenderObjectWidget"),": \u7528\u4e8e\u6ca1\u6709\u5b50\u8282\u70b9\u7684 widget\uff0c\u901a\u5e38\u57fa\u7840\u7ec4\u4ef6\u90fd\u5c5e\u4e8e\u8fd9\u4e00\u7c7b\uff0c\u5982 Image\u3002"),(0,a.kt)("h2",{id:"platformview"},"PlatformView"),(0,a.kt)("h3",{id:"rendering"},"Rendering"),(0,a.kt)(l.G,{chart:"classDiagram\n  RenderObject~abstract~ <|-- RenderBox~abstract~\n  RenderBox <|-- PlatformViewRenderBox\n  PlatformViewRenderBox <|-- RenderAndroidView\n  RenderBox <|-- RenderUiKitView\n\n  GestureArenaMember~abstract~ <|-- GestureRecognizer~abstract~\n  GestureRecognizer~abstract~ <|-- OneSequenceGestureRecognizer~abstract~\n  OneSequenceGestureRecognizer <|-- _UiKitViewGestureRecognizer\n  OneSequenceGestureRecognizer <|-- _PlatformViewGestureRecognizer",mdxType:"Mermaid"}),(0,a.kt)("h3",{id:"widget"},"Widget"),(0,a.kt)(l.G,{chart:"classDiagram\n  Widget~abstract~ <|-- StatefulWidget~abstract~\n  StatefulWidget <|-- AndroidView\n  StatefulWidget <|-- UiKitView\n  StatefulWidget <|-- PlatformViewLink\n  Widget <|-- RenderObjectWidget~abstract~\n  RenderObjectWidget <|-- LeafRenderObjectWidget~abstract~\n  LeafRenderObjectWidget <|-- _AndroidPlatformView\n  LeafRenderObjectWidget <|-- _UiKitPlatformView\n  LeafRenderObjectWidget <|-- PlatformViewSurface\n  PlatformViewSurface <|-- AndroidViewSurface",mdxType:"Mermaid"}),(0,a.kt)("h3",{id:"service"},"Service"),(0,a.kt)(l.G,{chart:"classDiagram\n  PlatformViewController~abstract~ <|-- AndroidViewController~abstract~\n  AndroidViewController <|-- TextureAndroidViewController\n  TextureAndroidViewController <|-- SurfaceAndroidViewController\n  AndroidViewController <|-- ExpensiveAndroidViewController\n  class UiKitViewController",mdxType:"Mermaid"}),(0,a.kt)("h3",{id:"ios"},"iOS"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dart"},"class UiKitView extends StatefulWidget {\n  @override\n  State<UiKitView> createState() => _UiKitViewState();\n}\n\nclass _UiKitViewState extends State<UiKitView> {\n  UiKitViewController? _controller;\n\n  @override\n  Widget build(BuildContext context) {\n    return _UiKitPlatformView(\n      controller: _controller!,\n      hitTestBehavior: widget.hitTestBehavior,\n      gestureRecognizers: widget.gestureRecognizers ?? _emptyRecognizersSet,\n    );\n  }\n\n  Future<void> _createNewUiKitView() async {\n    // \u901a\u8fc7 channel \u8c03\u7528\u5e73\u53f0\u5c42\uff0c\u521b\u5efa UIView\n    final UiKitViewController controller = await PlatformViewsService.initUiKitView(\n      id: id,\n      viewType: widget.viewType,\n      layoutDirection: _layoutDirection!,\n      creationParams: widget.creationParams,\n      creationParamsCodec: widget.creationParamsCodec,\n    );\n    setState(() {\n      _controller = controller;\n    });\n  }\n}\n\nclass _UiKitPlatformView extends LeafRenderObjectWidget {\n  @override\n  RenderObject createRenderObject(BuildContext context) {\n    return RenderUiKitView(\n      viewController: controller,\n      hitTestBehavior: hitTestBehavior,\n      gestureRecognizers: gestureRecognizers,\n    );\n  }\n}\n")),(0,a.kt)("h3",{id:"\u7ebf\u7a0b"},"\u7ebf\u7a0b"),(0,a.kt)("p",null,"\u5f53\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"PlatformView")," \u5728\u5c4f\u5e55\u4e0a\u65f6\uff0cRasterizer \u4f1a\u8f6c\u79fb\u5230 Platform thread \u4e0a\u5de5\u4f5c\uff08\u5373\u5e73\u53f0\u7684\u4e3b\u7ebf\u7a0b\uff09\uff1b\u79f0\u4e3a\u52a8\u6001\u7ebf\u7a0b\u5408\u5e76\u3002"),(0,a.kt)("p",null,"\u5f53\u6ca1\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"PlatformView")," \u5728\u5c4f\u5e55\u4e0a\u65f6\uff0cRasterizer \u56de\u5230 Raster thread \u5de5\u4f5c\u3002\u79f0\u4e3a\u52a8\u6001\u7ebf\u7a0b\u5206\u89e3\u3002"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=23pU7uLkPYw"},"\u89e3\u6790\u6df7\u5408\u96c6\u6210 PlatformViews (Flutter Engage China \u201921) - YouTube")))}m.isMDXComponent=!0},6199:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/flutter-stateful-widget-life-cycle-5eee47bc2a19356f458777770911ed31.png"},84388:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/224705A9-514D-4F3C-8780-E2C9F470D4AC-49ee703a7a5d6f3466573f0a886d4685.png"},56789:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/E9DAA63D-0572-4F51-B0F9-EC65939880A7-794bd90205f85cf20b9c21750b5c0fcb.png"}}]);