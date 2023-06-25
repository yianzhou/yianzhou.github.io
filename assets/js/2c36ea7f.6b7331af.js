"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5706],{87285:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>w,frontMatter:()=>o,metadata:()=>d,toc:()=>s});var i=r(87462),n=(r(67294),r(3905)),a=r(61839);const o={},l="PlatformView",d={unversionedId:"\u6e90\u7801/flutter-platformview",id:"\u6e90\u7801/flutter-platformview",title:"PlatformView",description:"Rendering",source:"@site/docs/flutter/\u6e90\u7801/flutter-platformview.md",sourceDirName:"\u6e90\u7801",slug:"/\u6e90\u7801/flutter-platformview",permalink:"/docs/flutter/\u6e90\u7801/flutter-platformview",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"FlutterEngine",permalink:"/docs/flutter/\u6e90\u7801/flutter-engine"},next:{title:"FlutterViewController",permalink:"/docs/flutter/\u6e90\u7801/flutter-vc"}},c={},s=[{value:"Rendering",id:"rendering",level:2},{value:"Widget",id:"widget",level:2},{value:"Service",id:"service",level:2},{value:"iOS",id:"ios",level:2},{value:"\u7ebf\u7a0b",id:"\u7ebf\u7a0b",level:2}],u={toc:s};function w(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"platformview"},"PlatformView"),(0,n.kt)("h2",{id:"rendering"},"Rendering"),(0,n.kt)(a.G,{chart:"classDiagram\n  RenderObject~abstract~ <|-- RenderBox~abstract~\n  RenderBox <|-- PlatformViewRenderBox\n  PlatformViewRenderBox <|-- RenderAndroidView\n  RenderBox <|-- RenderUiKitView\n\n  GestureArenaMember~abstract~ <|-- GestureRecognizer~abstract~\n  GestureRecognizer~abstract~ <|-- OneSequenceGestureRecognizer~abstract~\n  OneSequenceGestureRecognizer <|-- _UiKitViewGestureRecognizer\n  OneSequenceGestureRecognizer <|-- _PlatformViewGestureRecognizer",mdxType:"Mermaid"}),(0,n.kt)("h2",{id:"widget"},"Widget"),(0,n.kt)(a.G,{chart:"classDiagram\n  Widget~abstract~ <|-- StatefulWidget~abstract~\n  StatefulWidget <|-- AndroidView\n  StatefulWidget <|-- UiKitView\n  StatefulWidget <|-- PlatformViewLink\n  Widget <|-- RenderObjectWidget~abstract~\n  RenderObjectWidget <|-- LeafRenderObjectWidget~abstract~\n  LeafRenderObjectWidget <|-- _AndroidPlatformView\n  LeafRenderObjectWidget <|-- _UiKitPlatformView\n  LeafRenderObjectWidget <|-- PlatformViewSurface\n  PlatformViewSurface <|-- AndroidViewSurface",mdxType:"Mermaid"}),(0,n.kt)("h2",{id:"service"},"Service"),(0,n.kt)(a.G,{chart:"classDiagram\n  PlatformViewController~abstract~ <|-- AndroidViewController~abstract~\n  AndroidViewController <|-- TextureAndroidViewController\n  TextureAndroidViewController <|-- SurfaceAndroidViewController\n  AndroidViewController <|-- ExpensiveAndroidViewController\n  class UiKitViewController",mdxType:"Mermaid"}),(0,n.kt)("h2",{id:"ios"},"iOS"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-dart"},"class UiKitView extends StatefulWidget {\n  @override\n  State<UiKitView> createState() => _UiKitViewState();\n}\n\nclass _UiKitViewState extends State<UiKitView> {\n  UiKitViewController? _controller;\n\n  @override\n  Widget build(BuildContext context) {\n    return _UiKitPlatformView(\n      controller: _controller!,\n      hitTestBehavior: widget.hitTestBehavior,\n      gestureRecognizers: widget.gestureRecognizers ?? _emptyRecognizersSet,\n    );\n  }\n\n  Future<void> _createNewUiKitView() async {\n    // \u901a\u8fc7 channel \u8c03\u7528\u5e73\u53f0\u5c42\uff0c\u521b\u5efa UIView\n    final UiKitViewController controller = await PlatformViewsService.initUiKitView(\n      id: id,\n      viewType: widget.viewType,\n      layoutDirection: _layoutDirection!,\n      creationParams: widget.creationParams,\n      creationParamsCodec: widget.creationParamsCodec,\n    );\n    setState(() {\n      _controller = controller;\n    });\n  }\n}\n\nclass _UiKitPlatformView extends LeafRenderObjectWidget {\n  @override\n  RenderObject createRenderObject(BuildContext context) {\n    return RenderUiKitView(\n      viewController: controller,\n      hitTestBehavior: hitTestBehavior,\n      gestureRecognizers: gestureRecognizers,\n    );\n  }\n}\n")),(0,n.kt)("h2",{id:"\u7ebf\u7a0b"},"\u7ebf\u7a0b"),(0,n.kt)("p",null,"\u5f53\u6709 ",(0,n.kt)("inlineCode",{parentName:"p"},"PlatformView")," \u5728\u5c4f\u5e55\u4e0a\u65f6\uff0cRasterizer \u4f1a\u8f6c\u79fb\u5230 Platform thread \u4e0a\u5de5\u4f5c\uff08\u5373\u5e73\u53f0\u7684\u4e3b\u7ebf\u7a0b\uff09\uff1b\u79f0\u4e3a\u52a8\u6001\u7ebf\u7a0b\u5408\u5e76\u3002"),(0,n.kt)("p",null,"\u5f53\u6ca1\u6709 ",(0,n.kt)("inlineCode",{parentName:"p"},"PlatformView")," \u5728\u5c4f\u5e55\u4e0a\u65f6\uff0cRasterizer \u56de\u5230 Raster thread \u5de5\u4f5c\u3002\u79f0\u4e3a\u52a8\u6001\u7ebf\u7a0b\u5206\u89e3\u3002"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=23pU7uLkPYw"},"\u89e3\u6790\u6df7\u5408\u96c6\u6210 PlatformViews (Flutter Engage China \u201921) - YouTube")))}w.isMDXComponent=!0}}]);