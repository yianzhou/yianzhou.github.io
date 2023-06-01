"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2756],{32577:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>A,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var a=n(87462),i=(n(67294),n(3905)),o=n(61839);const r={},A="Flutter Frameworks",l={unversionedId:"flutter-frameworks",id:"flutter-frameworks",title:"Flutter Frameworks",description:"fish-redux",source:"@site/docs/flutter/flutter-frameworks.md",sourceDirName:".",slug:"/flutter-frameworks",permalink:"/docs/flutter/flutter-frameworks",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Flutter FFI",permalink:"/docs/flutter/flutter-ffi"},next:{title:"Flutter Gist",permalink:"/docs/flutter/flutter-gist"}},h={},d=[{value:"fish-redux",id:"fish-redux",level:2},{value:"Nested",id:"nested",level:2},{value:"Provider",id:"provider",level:2}],s={toc:d};function p(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"flutter-frameworks"},"Flutter Frameworks"),(0,i.kt)("h2",{id:"fish-redux"},"fish-redux"),(0,i.kt)("p",null,"\u5b98\u65b9\u6587\u6863\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/alibaba/fish-redux/tree/master/doc"},"fish-redux/doc at master \xb7 alibaba/fish-redux")),(0,i.kt)("p",null,"\u5148\u4e86\u89e3\u4e00\u4e0b Redux \u7684\u7406\u5ff5\uff1a\u4e2d\u5fc3\u5316\u7684\u72b6\u6001\u7ba1\u7406\u3002Centralizing your application's state and logic enables powerful capabilities like undo/redo, state persistence, and much more."),(0,i.kt)("p",null,"fish-redux \u5728 Redux \u7684\u57fa\u7840\u4e0a\u53d1\u5c55\uff1aThe framework not only solves the problem of state management, but also solves the problems of divide and conquer, communication, data drive, decoupling and so on."),(0,i.kt)("p",null,"Component \u662f\u57fa\u672c\u5355\u5143\uff0c\u662f\u89c6\u56fe\u5448\u73b0\u548c\u903b\u8f91\u529f\u80fd\u7684\u5c01\u88c5\u3002Page \u7ee7\u627f Component\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(45567).Z,width:"900",height:"780"})),(0,i.kt)("p",null,"\u5206\u6cbb\uff1a\u5355\u4e2a Component \u5185\u90e8\uff0c\u7528\u6237\u5728 View \u89e6\u53d1\u4e86 Action\uff08\u4f8b\u5982\u70b9\u51fb\u6309\u94ae\uff09\uff0c\u9020\u6210 Side Effect\uff0c\u901a\u8fc7 Reducer \u6539\u53d8\u4e86\u72b6\u6001\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(91201).Z,width:"1426",height:"762"})),(0,i.kt)("p",null,"\u96c6\u4e2d\uff1a\u5168\u5c40\u72b6\u6001\u6539\u53d8\u5982\u4f55\u5f71\u54cd\u6bcf\u4e2a\u5177\u4f53\u7684 Component"),(0,i.kt)("p",null,"\u76ee\u5f55\u7ed3\u6784\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-dart"},"sample_page\n    -- action.dart /// define action types and action creator\n    -- page.dart /// config a page or component\n    -- view.dart /// define a function which expresses the presentation of user interface\n    -- effect.dart /// define a function which handles the side-effect\n    -- reducer.dart /// define a function which handles state-change\n    -- state.dart /// define a state and some connector of substate\n    components\n        sample_component\n        -- action.dart // \u5b9a\u4e49\u9875\u9762\u6709\u54ea\u4e9b\u52a8\u4f5c\n        -- component.dart\n        -- view.dart  // \u9875\u9762 Widget\n        -- effect.dart // \u4e8b\u4ef6\u5904\u7406\uff0c\u5305\u62ec action \u91cc\u5b9a\u4e49\u7684\u4e8b\u4ef6\u3001\u548c\u751f\u547d\u5468\u671f\u4e8b\u4ef6\n        -- reducer.dart // \u6539\u53d8\u72b6\u6001\n        -- state.dart // \u9875\u9762\u6709\u54ea\u4e9b\u72b6\u6001\n")),(0,i.kt)("p",null,"\u4f8b\u5b50\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/alibaba/fish-redux/tree/master/example"},"fish-redux/example at master \xb7 alibaba/fish-redux")),(0,i.kt)("p",null,"Middleware \u662f\u5904\u7406\u4e00\u4e9b\u9762\u5411\u5207\u9762\u7684\u4e1c\u897f\uff0c\u4f8b\u5982\u5bf9\u6bcf\u4e2a\u9875\u9762\u7684\u751f\u547d\u5468\u671f\u843d\u65e5\u5fd7\u8fd9\u79cd\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Dependencies")," is a structure that expresses dependencies between components."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"adapter"),": used to build a high-performance ListView."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"slots"),": subcomponents that the component depends on."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Dependent"),": connector + subcomponent"),(0,i.kt)("p",null,"connector: It expresses a data connection relationship of how to read small data from a big data, and how to synchronize to big data when the small data is modified."),(0,i.kt)("p",null,"\u6709\u4e86\u8fd9\u4e2a connector\uff0c\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"view.dart")," \u91cc\u9762\u8c03\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"viewService.buildComponent('report')")," \u5c31\u53ef\u4ee5\u521b\u5efa\u5b50 component\uff0c\u800c\u4e0d\u7528\u4f20\u53c2\u6570\uff0c\u72b6\u6001\u7684\u4f20\u9012\u4e5f\u662f\u901a\u8fc7\u8fd9\u4e2a connector\u3002"),(0,i.kt)("p",null,"\u751f\u547d\u5468\u671f\u901a\u8fc7 Action \u7684\u5f62\u5f0f\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"effect.dart")," \u91cc\u5904\u7406\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"effect.dart")," \u4e0d\u80fd\u4fee\u6539\u9875\u9762\u72b6\u6001\uff0c\u8981\u4fee\u6539\u9875\u9762\u72b6\u6001\u7684\u8bdd\uff0c\u8981\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"dispatch")," \u6d3e\u53d1 Action \u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"reducer.dart")," \u91cc\u5904\u7406\u3002"),(0,i.kt)("h2",{id:"nested"},"Nested"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://pub.dev/packages/nested"},"nested | Flutter Package")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Nested"),": A widget that simplify the writing of deeply nested widget trees."),(0,i.kt)(o.G,{chart:"classDiagram\n    Widget <|-- StatelessWidget : extends\n    Widget <|-- StatefulWidget : extends\n    StatelessWidget <|-- Nested : extends\n    Widget <|.. SingleChildWidget : implements\n    SingleChildWidget <|.. Nested : implements\n    StatelessWidget <|-- SingleChildStatelessWidget : extends\n    SingleChildWidget <|.. SingleChildStatelessWidget : implements\n    StatefulWidget <|-- SingleChildStatefulWidget : extends\n    SingleChildWidget <|.. SingleChildStatefulWidget : implements",mdxType:"Mermaid"}),(0,i.kt)("h2",{id:"provider"},"Provider"),(0,i.kt)("p",null,"Provider \u662f\u5b98\u65b9\u63a8\u8350\u7684\u72b6\u6001\u7ba1\u7406\u3002"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"https://docs.flutter.dev/development/data-and-backend/state-mgmt/simple"},"Simple app state management | Flutter"))),(0,i.kt)("p",null,"\u4e0d\u7528\u5173\u5fc3\u8fd9\u4e9b\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"InheritedWidget"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"InheritedNotifier"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"InheritedModel"),"\uff0cProvider \u5df2\u7ecf\u5c01\u88c5\u597d\u4e86\u3002"),(0,i.kt)("p",null,"\u8981\u7528 Provider\uff0c\u5148\u4e86\u89e3 3 \u4e2a\u6982\u5ff5\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"ChangeNotifier"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"ChangeNotifierProvider"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Consumer"),"\u3002"),(0,i.kt)("p",null,"If something is a ",(0,i.kt)("inlineCode",{parentName:"p"},"ChangeNotifier"),", you can subscribe to its changes. (It is a form of ",(0,i.kt)("inlineCode",{parentName:"p"},"Observable"),", for those familiar with the term.) ",(0,i.kt)("inlineCode",{parentName:"p"},"ChangeNotifier")," is part of ",(0,i.kt)("inlineCode",{parentName:"p"},"flutter:foundation"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ChangeNotifierProvider")," is the widget that provides an instance of a ",(0,i.kt)("inlineCode",{parentName:"p"},"ChangeNotifier")," to its descendants. It comes from the provider package."),(0,i.kt)("p",null,"When you call ",(0,i.kt)("inlineCode",{parentName:"p"},"notifyListeners()")," in your model, all ",(0,i.kt)("inlineCode",{parentName:"p"},"Consumer")," widgets's ",(0,i.kt)("inlineCode",{parentName:"p"},"builder")," method get called."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-dart"},'return Consumer<CartModel>(\n  builder: (context, cart, child) {\n    return Text("Total price: ${cart.totalPrice}");\n  },\n);\n')),(0,i.kt)("p",null,"\u5982\u679c\u4e0d\u60f3\u5305\u4e00\u5c42 ",(0,i.kt)("inlineCode",{parentName:"p"},"Consumer"),"\uff0c\u4e5f\u53ef\u4ee5\u76f4\u63a5\u5728\u6211\u4eec\u7684 Widget \u91cc\u76d1\u542c\u72b6\u6001\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-dart"},"Provider.of<CartModel>(context, listen: true).totalPrice;\n// \u8bed\u6cd5\u7cd6\ncontext.watch<CartModel>().totalPrice,\n")),(0,i.kt)("p",null,"\u5982\u679c\u6211\u4eec\u4e0d\u9700\u8981\u66f4\u65b0 UI\uff0c\u53ea\u9700\u8981\u8bbf\u95ee\u5171\u4eab\u72b6\u6001\u65f6\uff0c\u5219\u53ef\u4ee5\u7528\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-dart"},"Provider.of<CartModel>(context, listen: false).removeAll();\n// \u8bed\u6cd5\u7cd6\ncontext.read<CartModel>().removeAll();\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"listen: false")," \u4f7f\u5f97\u5f53\u524d Widget \u4e0d\u4f1a\u56e0\u4e3a\u5171\u4eab\u72b6\u6001\u7684\u6539\u53d8\u800c rebuild\u3002"))}p.isMDXComponent=!0},45567:(e,t,n)=>{n.d(t,{Z:()=>a});const a="data:image/png;base64,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"},91201:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/B5CCB044-7162-4CA4-BF3D-E92E8E69F0E7-d89b98d1ac26efd192e64a8b14f609b7.png"}}]);