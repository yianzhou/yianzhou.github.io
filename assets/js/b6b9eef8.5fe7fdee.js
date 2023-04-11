"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9341],{86470:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=t(87462),i=(t(67294),t(3905));t(61839);const o={},r="Core Animation",l={unversionedId:"\u97f3\u89c6\u9891\u3001\u56fe\u5f62/core-animation",id:"\u97f3\u89c6\u9891\u3001\u56fe\u5f62/core-animation",title:"Core Animation",description:"iOS Core Animation \u8fdb\u9636\u6280\u672f",source:"@site/docs/apple/\u97f3\u89c6\u9891\u3001\u56fe\u5f62/core-animation.md",sourceDirName:"\u97f3\u89c6\u9891\u3001\u56fe\u5f62",slug:"/\u97f3\u89c6\u9891\u3001\u56fe\u5f62/core-animation",permalink:"/docs/apple/\u97f3\u89c6\u9891\u3001\u56fe\u5f62/core-animation",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/\u97f3\u89c6\u9891\u3001\u56fe\u5f62/core-animation.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AVFoundation",permalink:"/docs/apple/\u97f3\u89c6\u9891\u3001\u56fe\u5f62/avfoundation"},next:{title:"\u56fe\u5f62\u6e32\u67d3",permalink:"/docs/apple/\u97f3\u89c6\u9891\u3001\u56fe\u5f62/graphics"}},m={},p=[{value:"CALayer",id:"calayer",level:2},{value:"\u9690\u5f0f\u52a8\u753b",id:"\u9690\u5f0f\u52a8\u753b",level:2},{value:"\u663e\u5f0f\u52a8\u753b",id:"\u663e\u5f0f\u52a8\u753b",level:2},{value:"modelLayer and presentationLayer",id:"modellayer-and-presentationlayer",level:2},{value:"\u8f6c\u573a",id:"\u8f6c\u573a",level:2},{value:"\u624b\u52a8\u52a8\u753b",id:"\u624b\u52a8\u52a8\u753b",level:2},{value:"\u5750\u6807\u7cfb",id:"\u5750\u6807\u7cfb",level:2},{value:"UIView",id:"uiview",level:2},{value:"Lottie",id:"lottie",level:2}],s={toc:p};function c(e){let{components:n,...o}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,o,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"core-animation"},"Core Animation"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"https://github.com/AttackOnDobby/iOS-Core-Animation-Advanced-Techniques"},"iOS Core Animation \u8fdb\u9636\u6280\u672f"))),(0,i.kt)("p",null,"Core Animation \u662f iOS \u7684 UIView \u7684\u57fa\u7840\u548c\u5e95\u5c42\uff0c\u5c5e\u4e8e UIKit\uff1b\u5728 macOS \u4e0a\u4e5f\u6709\u5bf9\u5e94\u7684\u5c01\u88c5 NSView\uff0c\u5c5e\u4e8e AppKit\u3002"),(0,i.kt)("h2",{id:"calayer"},"CALayer"),(0,i.kt)("p",null,"CALayer \u7c7b\u5728\u6982\u5ff5\u4e0a\u548c UIView \u7c7b\u4f3c\uff0c\u540c\u6837\u4e5f\u662f\u4e00\u4e9b\u88ab\u5c42\u7ea7\u5173\u7cfb\u6811\u7ba1\u7406\u7684\u77e9\u5f62\u5757\uff1b\u5b9e\u9645\u4e0a UIView \u80cc\u540e\u5173\u8054\u7684\u56fe\u5c42\uff0c\u624d\u662f\u771f\u6b63\u5728\u5c4f\u5e55\u4e0a\u663e\u793a\u7684\uff0c\u5b83\u4eec\u5f88\u591a\u7684\u5c5e\u6027\u4e5f\u662f\u76f8\u5bf9\u5e94\u7684\u3002\u548c UIView \u6700\u5927\u7684\u4e0d\u540c\u662f\uff0cCALayer \u4e0d\u5904\u7406\u7528\u6237\u7684\u4ea4\u4e92\u3002"),(0,i.kt)("p",null,"\u4e3a\u4ec0\u4e48 iOS \u8981\u57fa\u4e8e UIView \u548c CALayer \u63d0\u4f9b\u4e24\u4e2a\u5e73\u884c\u7684\u5c42\u7ea7\u5173\u7cfb\u5462\uff1f\u539f\u56e0\u5728\u4e8e\u8981\u505a\u804c\u8d23\u5206\u79bb\u3002\u5728 iOS \u548c macOS \u4e24\u4e2a\u5e73\u53f0\u4e0a\uff0c\u4e8b\u4ef6\u548c\u7528\u6237\u4ea4\u4e92\u6709\u5f88\u591a\u5730\u65b9\u7684\u4e0d\u540c\uff0c\u57fa\u4e8e\u591a\u70b9\u89e6\u63a7\u7684\u7528\u6237\u754c\u9762\u548c\u57fa\u4e8e\u9f20\u6807\u952e\u76d8\u7684\u6709\u7740\u672c\u8d28\u7684\u533a\u522b\uff0c\u5b83\u4eec\u5171\u4eab Core Animation \u5bf9\u56fe\u5f62\u7684\u7ed8\u5236\uff0c\u5e76\u5206\u522b\u5b9e\u73b0\u7528\u6237\u4ea4\u4e92\u7684\u5404\u79cd\u63a5\u53e3\u3002"),(0,i.kt)("p",null,"\u65e2\u7136\u6709\u4e86\u7b80\u6d01\u7684 UIView \u7684\u9ad8\u7ea7\u63a5\u53e3\uff0c\u4e3a\u4ec0\u4e48\u8fd8\u8981\u4e86\u89e3 Core Animation \u5462\uff1f\u867d\u7136\u8fd9\u4e2a\u6846\u67b6\u7684\u540d\u5b57\u53eb\u505a Core Animation\uff0c\u5b9e\u9645\u4e0a\u5f88\u591a\u4e30\u5bcc\u7684\u3001\u81ea\u5b9a\u4e49\u7684\u89c6\u89c9\u6548\u679c\uff0c\u6211\u4eec\u8981\u901a\u8fc7 CALayer \u624d\u80fd\u5b9e\u73b0\uff0c\u800c\u8fd9\u4e9b\u662f UIView \u6ca1\u6709\u66b4\u9732\u51fa\u6765\u7684\uff0c\u5305\u62ec\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u9634\u5f71\u3001\u5706\u89d2\u3001\u8fb9\u6846"),(0,i.kt)("li",{parentName:"ul"},"3D \u53d8\u6362"),(0,i.kt)("li",{parentName:"ul"},"\u975e\u77e9\u5f62\u8303\u56f4"),(0,i.kt)("li",{parentName:"ul"},"\u900f\u660e\u906e\u7f69"),(0,i.kt)("li",{parentName:"ul"},"\u591a\u7ea7\u975e\u7ebf\u6027\u52a8\u753b"),(0,i.kt)("li",{parentName:"ul"},"\u7c92\u5b50\u6548\u679c (",(0,i.kt)("a",{parentName:"li",href:"https://developer.apple.com/documentation/quartzcore/caemitterlayer?language=objc"},"CAEmitterLayer"),")"),(0,i.kt)("li",{parentName:"ul"},"\u6e10\u53d8\u6548\u679c (",(0,i.kt)("a",{parentName:"li",href:"https://developer.apple.com/documentation/quartzcore/cagradientlayer?language=objc"},"CAGradientLayer"),")")),(0,i.kt)("p",null,"CALayer \u6709\u4e09\u4e2a\u89c6\u89c9\u5143\u7d20\uff0c\u4e2d\u95f4\u7684 contents \u5c5e\u6027\u662f\u8fd9\u6837\u58f0\u660e\u7684\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"var contents: AnyObject?"),"\uff0c\u5b9e\u9645\u4e0a\u5b83\u5fc5\u987b\u662f\u4e00\u4e2a CGImage \u624d\u80fd\u663e\u793a\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:t(23845).Z,width:"759",height:"579"})),(0,i.kt)("h2",{id:"\u9690\u5f0f\u52a8\u753b"},"\u9690\u5f0f\u52a8\u753b"),(0,i.kt)("p",null,"\u4f60\u5e76\u4e0d\u9700\u8981\u5728 Core Animation \u4e2d\u624b\u52a8\u6253\u5f00\u52a8\u753b\uff0c\u4efb\u4f55\u5bf9 CALayer \u5c5e\u6027\u7684\u6539\u53d8\u90fd\u4e0d\u662f\u77ac\u95f4\u5b8c\u6210\u7684\uff0c\u800c\u662f\u4ece\u5148\u524d\u7684\u503c\u5e73\u6ed1\u5730\u8fc7\u6e21\u5230\u65b0\u7684\u503c\uff0c\u9664\u975e\u4f60\u660e\u786e\u7981\u7528\u4e86\u8fd9\u4e2a\u529f\u80fd\uff0c\u8fd9\u662f\u6846\u67b6\u9ed8\u8ba4\u7684\u201c",(0,i.kt)("strong",{parentName:"p"},"\u9690\u5f0f\u52a8\u753b"),"\u201d\u3002"),(0,i.kt)("p",null,"\u5728\u8fd9\u4e2a\u793a\u4f8b\u4e2d\u6211\u4eec\u4ec5\u4ec5\u662f\u6539\u53d8\u4e86 CALayer \u7684\u4e00\u4e2a\u5c5e\u6027\uff0c\u5e76\u6ca1\u6709\u6307\u5b9a\u4efb\u4f55\u52a8\u753b\u7684\u7c7b\u578b\uff0c\u800c Core Animation \u81ea\u52a8\u5e2e\u6211\u4eec\u5b9e\u73b0\u4e86\u4e00\u4e2a\u5e73\u6ed1\u7684\u52a8\u753b\u6548\u679c\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},"import UIKit\n\nclass ViewController: UIViewController {\n    private let colorLayer = CALayer()\n\n    override func viewDidLoad() {\n        super.viewDidLoad()\n        self.view.backgroundColor = .white\n\n        colorLayer.frame = CGRect(origin: CGPoint.zero, size: CGSize(width: 100, height: 100))\n        colorLayer.backgroundColor = UIColor.blue.cgColor\n        self.view.layer.addSublayer(colorLayer)\n    }\n\n    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {\n        // randomize the layer background color\n        let red = CGFloat(arc4random()) / CGFloat(UInt32.max)\n        let green = CGFloat(arc4random()) / CGFloat(UInt32.max)\n        let blue = CGFloat(arc4random()) / CGFloat(UInt32.max)\n        colorLayer.backgroundColor = UIColor(red: red, green: green, blue: blue, alpha: 1.0).cgColor\n    }\n}\n")),(0,i.kt)("p",null,"Core Animation \u5728\u6bcf\u4e2a RunLoop \u5468\u671f\u4e2d\u81ea\u52a8\u5f00\u59cb\u4e00\u6b21\u65b0\u7684\u4e8b\u52a1\uff08RunLoop \u662f iOS \u8d1f\u8d23\u6536\u96c6\u7528\u6237\u8f93\u5165\uff0c\u5904\u7406\u672a\u5b8c\u6210\u7684\u5b9a\u65f6\u5668\u6216\u8005\u7f51\u7edc\u4e8b\u4ef6\uff0c\u6700\u7ec8\u91cd\u65b0\u7ed8\u5236\u5c4f\u5e55\u7684\u4e1c\u897f\uff09\uff0c\u5373\u4f7f\u4f60\u4e0d\u663e\u5f0f\u5730\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"[CATransaction begin]"),"\uff0c\u5728\u4e00\u4e2a\u7279\u5b9a RunLoop \u5faa\u73af\u4e2d\u7684\u4efb\u4f55\u5c5e\u6027\u7684\u53d8\u5316\u90fd\u4f1a\u88ab\u6536\u96c6\u8d77\u6765\uff0c\u7136\u540e\u505a\u4e00\u6b21 0.25 \u79d2\u7684\u52a8\u753b\u3002"),(0,i.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u628a\u6539\u53d8\u5c5e\u6027\u7684\u4ee3\u7801\u653e\u5728 CATransaction \u91cc\u6267\u884c\uff0c\u6765\u4fee\u6539\u52a8\u753b\u7684\u65f6\u95f4\u3001\u53e0\u52a0\u4e0d\u540c\u7684\u52a8\u753b\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},"import UIKit\n\nclass MyViewController: UIViewController {\n    @objc func nestedTransaction(_ sender: UIButton) {\n        // \u5d4c\u5957\u7684 CATransaction \u4e2d\uff0c\u52a8\u753b\u6548\u679c\u662f\u53e0\u52a0\u7684\n        CATransaction.begin() // push a transaction to the stack\n        CATransaction.setAnimationDuration(1.0)\n        colorLayer.backgroundColor = UIColor.red.cgColor\n        // push another transaction to the stack, transaction can be nested\n        CATransaction.begin()\n        CATransaction.setAnimationDuration(3.0)\n        colorLayer.transform = CATransform3DMakeScale(3, 3, 3)\n        CATransaction.commit() // pop\n        CATransaction.commit() // pop\n    }\n}\n")),(0,i.kt)("p",null,"UIView \u4e2d\u4e5f\u63d0\u4f9b\u4e86\u8fd9\u7ec4\u65b9\u6cd5\u7684\u5c01\u88c5\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"+beginAnimations:context:")," \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"+commitAnimations")),(0,i.kt)("p",null,"iOS 4+\uff0c\u82f9\u679c\u5bf9 UIView \u6dfb\u52a0\u4e86\u4e00\u79cd\u57fa\u4e8e block \u7684\u52a8\u753b\u65b9\u6cd5\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"+animateWithDuration:animations:completion:"),"\uff0cblock \u4e2d\u6240\u6709\u5c5e\u6027\u7684\u6539\u53d8\u90fd\u4f1a\u81ea\u52a8\u88ab CATransaction \u5305\u542b\uff0c\u53ef\u4ee5\u907f\u514d\u5f00\u53d1\u8005\u624b\u52a8\u5bf9 +begin \u548c +commit \u5339\u914d\u5bb9\u6613\u9020\u6210\u7684\u5931\u8bef\u3002"),(0,i.kt)("p",null,"UIView \u5173\u8054\u7684\u56fe\u5c42\u7981\u7528\u4e86\u9690\u5f0f\u52a8\u753b\uff0c\u5982\u679c\u60f3\u5bf9\u8fd9\u4e2a\u56fe\u5c42\u505a\u52a8\u753b\u53ef\u4ee5\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u4f7f\u7528 UIView \u7684\u52a8\u753b\u51fd\u6570"),(0,i.kt)("li",{parentName:"ol"},"\u6216\u8005\u7ee7\u627f UIView\uff0c\u5e76 override ",(0,i.kt)("inlineCode",{parentName:"li"},"-actionForLayer:forKey:")," \u65b9\u6cd5\uff0c\u8fd4\u56de\u52a8\u753b\uff08\u9ed8\u8ba4\u8fd4\u56de nil \u5373\u65e0\u52a8\u753b\uff09"),(0,i.kt)("li",{parentName:"ol"},"\u6216\u8005\u76f4\u63a5\u521b\u5efa\u4e00\u4e2a\u663e\u5f0f\u52a8\u753b")),(0,i.kt)("h2",{id:"\u663e\u5f0f\u52a8\u753b"},"\u663e\u5f0f\u52a8\u753b"),(0,i.kt)("p",null,"Implicit animations are a straightforward way to create animated user interfaces on iOS, and they are the mechanism on which UIKit\u2019s own animation methods are based, but they are not a completely general-purpose animation solution."),(0,i.kt)("p",null,"In this chapter, we will look at explicit animations, which allow us to specify custom animations for particular properties or create nonlinear animations, such as a movement along an arbitrary curve."),(0,i.kt)("p",null,"The first type of explicit animation we will look at is the property animation. Property animations target a ",(0,i.kt)("strong",{parentName:"p"},"single property")," of a layer and specify a target value or range of values for that property to animate between. Property animations come in two flavors: basic and keyframe."),(0,i.kt)("p",null,"\u7c7b\u7684\u7ee7\u627f\u5173\u7cfb\uff1a"),(0,i.kt)("div",{class:"mermaid"},'graph TD CAAnimation(["CAAnimation (Abstract)"]) CATransition(["CATransition"]) CAAnimation --\x3e CATransition CAPropertyAnimation(["CAPropertyAnimation (Abstract)"]) CABasicAnimation(["CABasicAnimation"]) CAKeyframeAnimation(["CAKeyframeAnimation"]) CAAnimation --\x3e CAPropertyAnimation CAPropertyAnimation --\x3e CABasicAnimation CAPropertyAnimation --\x3e CAKeyframeAnimation'),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"CABasicAnimation")," is interesting in that it shows us the underlying mechanism behind most of the implicit animations on iOS, but adding a CABasicAnimation to a layer explicitly is a lot of work for little benefit when there are simpler ways to achieve the same effect (either using implicit animations for hosted layers, or UIView animation for views and backing layers)."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"CAKeyframeAnimation"),", however, is considerably more powerful and has no equivalent interface exposed in UIKit. It still operates on a single property, but it is not limited to just a single start and end value, and instead can be given an arbitrary sequence of values to animate between."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},'import UIKit\n\nclass MyViewController: UIViewController {\n    private let shipLayer = CALayer()\n    override func viewDidLoad() {\n        super.viewDidLoad()\n        /* \u6211\u4eec\u521b\u5efa\u4e00\u4e2a\u5b87\u5b99\u98de\u8239\uff0c\u5b83\u4f1a\u6cbf\u7740\u6211\u4eec\u6307\u5b9a\u7684\u8def\u5f84\u8fd0\u52a8 */\n        shipLayer.frame = CGRect(x: 0, y: 0, width: 64, height: 64)\n        shipLayer.position = CGPoint(x: 0, y: 150) // start point\n        shipLayer.contents = UIImage(named: "train")!.cgImage\n        self.view.layer.addSublayer(shipLayer)\n        demo()\n    }\n\n    private func demo() {\n        // create path\n        let path = UIBezierPath()\n        path.move(to: CGPoint(x: 0, y: 150))\n        path.addCurve(to: CGPoint(x: 300, y: 150), controlPoint1: CGPoint(x: 75, y: 0), controlPoint2: CGPoint(x: 225, y: 300))\n\n        // draw the path using CAShapeLayer \u5b9e\u9645\u53ef\u4ee5\u4e0d\u7528\u753b\u51fa\u6765\uff0c\u8fd9\u91cc\u662f\u4e3a\u4e86\u65b9\u4fbf\u9a8c\u8bc1\n        let pathLayer = CAShapeLayer()\n        pathLayer.path = path.cgPath\n        pathLayer.fillColor = UIColor.clear.cgColor\n        pathLayer.strokeColor = UIColor.red.cgColor\n        pathLayer.lineWidth = 3.0\n        self.view.layer.addSublayer(pathLayer)\n\n        // create the key frame animation\n        let animation = CAKeyframeAnimation(keyPath: "position") // the key path of the property that you want to animate on the layer.\n        animation.duration = 5.0\n        // The path for a point-based property to follow.\n        animation.path = path.cgPath\n        // Determines whether objects animating along the path rotate to match the path tangent\uff08\u5207\u7ebf\uff09.\n        animation.rotationMode = CAAnimationRotationMode.rotateAuto\n        // set timing function \u8bbe\u7f6e\u65f6\u95f4\u51fd\u6570\u8ba9\u52a8\u753b\u6548\u679c\u66f4\u63a5\u8fd1\u771f\u5b9e\uff0c\u5f53\u65f6\u7528 UIView \u52a8\u753b\u65f6\uff0c\u9ed8\u8ba4\u5c31\u662f EaseInEaseOut \u6548\u679c\uff0c\u4f46\u5f53\u6211\u4eec\u81ea\u5df1\u521b\u5efa\u663e\u5f0f\u52a8\u753b\u65f6\uff0c\u9700\u8981\u81ea\u5df1\u8bbe\u7f6e\n        // \u5982\u679c\u5167\u7f6e\u7684\u65f6\u95f4\u51fd\u6570\u4e0d\u80fd\u6ee1\u8db3\u8981\u6c42\uff0c\u8fd8\u53ef\u4ee5\u81ea\u5df1\u5b9a\u4e49\u8d1d\u585e\u5c14\u66f2\u7ebf\uff0c\u6216\u8005\u5229\u7528\u5173\u952e\u5e27\u5b9e\u73b0\u5b8c\u5168\u81ea\u5b9a\u4e49\u7684\u65f6\u95f4\u51fd\u6570\n        animation.timingFunction = CAMediaTimingFunction(name: CAMediaTimingFunctionName.easeInEaseOut)\n\n        // Determines if the receiver\u2019s presentation is frozen or removed once its active duration has completed.\n        animation.fillMode = CAMediaTimingFillMode.forwards\n        // Determines if the animation is removed from the target layer\u2019s animations upon completion.\n        animation.isRemovedOnCompletion = false\n\n        shipLayer.add(animation, forKey: nil)\n        shipLayer.position = CGPoint(x: 300, y: 150) // end point\n    }\n\n    func demo2() {\n        let tintAnimation = CAKeyframeAnimation(keyPath: "backgroundColor")\n        tintAnimation.duration = 5.0\n        // An array of objects that specify the keyframe values to use for the animation.\n        tintAnimation.values = [UIColor.red.cgColor,\n                                UIColor.green.cgColor,\n                                UIColor.blue.cgColor]\n        // An optional array of NSNumber objects that define the time at which to apply a given keyframe segment.\n        tintAnimation.keyTimes = [0.0, 0.9, 1.0]\n        shipLayer.add(tintAnimation, forKey: nil)\n\n        /*\n         @keyTimes: If the calculationMode is set to linear or cubic or discrete, the first value in the array must be 0.0 and the last value must be 1.0.\n         */\n    }\n}\n')),(0,i.kt)("p",null,"Multiple such animations can be gathered together using a ",(0,i.kt)("inlineCode",{parentName:"p"},"CAAnimationGroup"),". Adding an animation group to a layer is not fundamentally different from adding the animations individually. It only really becomes apparent when it comes to ",(0,i.kt)("strong",{parentName:"p"},"hierarchical timing"),", which is explained in Chapter 9."),(0,i.kt)("h2",{id:"modellayer-and-presentationlayer"},"modelLayer and presentationLayer"),(0,i.kt)("p",null,"\u5f53\u4f60\u6539\u53d8\u4e00\u4e2a\u56fe\u5c42\u7684\u5c5e\u6027\uff0c\u5c5e\u6027\u503c\u7684\u786e\u662f\u7acb\u523b\u66f4\u65b0\u7684\uff08\u5982\u679c\u4f60\u8bfb\u53d6\u5b83\u7684\u6570\u636e\uff0c\u4f60\u4f1a\u53d1\u73b0\u5b83\u7684\u503c\u5728\u4f60\u8bbe\u7f6e\u5b83\u7684\u90a3\u4e00\u523b\u5c31\u5df2\u7ecf\u751f\u6548\u4e86\uff09\uff0c\u4f46\u662f\u5c4f\u5e55\u4e0a\u5e76\u6ca1\u6709\u9a6c\u4e0a\u53d1\u751f\u6539\u53d8\u3002"),(0,i.kt)("p",null,"\u5f53\u6211\u4eec\u8bbe\u7f6e CALayer \u7684\u5c5e\u6027\uff0c\u5b9e\u9645\u4e0a\u662f\u5728\u5b9a\u4e49\u5f53\u524d\u4e8b\u52a1\u7ed3\u675f\u4e4b\u540e\u56fe\u5c42\u5982\u4f55\u663e\u793a\u7684 model\u3002"),(0,i.kt)("p",null,"\u5728 iOS \u4e2d\uff0c\u5c4f\u5e55\u6bcf\u79d2\u949f\u91cd\u7ed8 60 \u6b21\u3002\u5728\u4f60\u8bbe\u7f6e\u7684\u65b0\u503c\u5b8c\u5168\u751f\u6548\u4e4b\u524d\uff0cCore Animation \u626e\u6f14\u4e86 Controller \u7684\u89d2\u8272\uff0c\u56fe\u5c42\u5c5e\u6027\u7684\u663e\u793a\u503c\uff0c\u88ab\u5b58\u50a8\u5728 presentationLayer \u5f53\u4e2d\uff0c\u5b83\u7684\u503c\u624d\u662f\u5f53\u524d\u5c4f\u5e55\u4e0a\u771f\u6b63\u663e\u793a\u51fa\u6765\u7684\u503c\u3002"),(0,i.kt)("p",null,"presentationLayer \u4ec5\u4ec5\u5f53\u56fe\u5c42\u7b2c\u4e00\u6b21\u5728\u5c4f\u5e55\u4e0a\u663e\u793a\u7684\u65f6\u5019\u521b\u5efa\uff0c\u5728\u90a3\u4e4b\u524d\u8c03\u7528\u5c06\u4f1a\u8fd4\u56de nil\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},"print(colorLayer.model().description)\nprint(colorLayer.presentation().description)\n")),(0,i.kt)("h2",{id:"\u8f6c\u573a"},"\u8f6c\u573a"),(0,i.kt)("p",null,"Property animations only work on animatable ",(0,i.kt)("strong",{parentName:"p"},"properties")," of a layer, so if you need to change a nonanimatable property (such as an image) or actually add and remove layers from the hierarchy, property animations won\u2019t work."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Transitions")," affect an ",(0,i.kt)("strong",{parentName:"p"},"entire layer")," instead of just a specific property."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},'import UIKit\n\nclass MyViewController: UIViewController {\n    private var imageView: UIImageView!\n    private var imageNames = ["aut.jpg", "decep.jpg"]\n    private var imageIndex = 0\n\n    override func viewDidLoad() {\n        super.viewDidLoad()\n\n        imageView = UIImageView(frame: CGRect(origin: CGPoint.zero, size: CGSize(width: 400, height: 400)))\n        imageView.image = UIImage(named: imageNames[0])\n        imageIndex = 0\n        self.view.addSubview(imageView)\n    }\n\n    private func transformByCA() {\n        imageIndex = imageIndex > 0 ? 0 : 1\n        let transition = CATransition()\n        transition.type = CATransitionType.fade\n        self.imageView.layer.add(transition, forKey: nil)\n        self.imageView.image = UIImage(named: imageNames[imageIndex])\n    }\n\n    private func transformByUIKit() {\n        imageIndex = imageIndex > 0 ? 0 : 1\n        UIView.transition(with: self.imageView, duration: 0.5, options: .transitionCrossDissolve, animations: {\n            self.imageView.image = UIImage(named: self.imageNames[self.imageIndex])\n        })\n    }\n}\n')),(0,i.kt)("h2",{id:"\u624b\u52a8\u52a8\u753b"},"\u624b\u52a8\u52a8\u753b"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"timeOffset")," \u53ef\u4ee5\u8ba9\u4f60\u624b\u52a8\u63a7\u5236\u52a8\u753b\u8fdb\u7a0b\uff0c\u901a\u8fc7\u8bbe\u7f6e speed \u4e3a 0\uff0c\u53ef\u4ee5\u7981\u7528\u52a8\u753b\u7684\u81ea\u52a8\u64ad\u653e\uff0c\u7136\u540e\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"timeOffset")," \u6765\u56de\u663e\u793a\u52a8\u753b\u5e8f\u5217\u3002\u8fd9\u53ef\u4ee5\u4f7f\u5f97\u8fd0\u7528\u624b\u52bf\u6765\u624b\u52a8\u63a7\u5236\u52a8\u753b\u53d8\u5f97\u5f88\u7b80\u5355\u3002"),(0,i.kt)("h2",{id:"\u5750\u6807\u7cfb"},(0,i.kt)("a",{parentName:"h2",href:"https://developer.apple.com/documentation/uikit/uibezierpath/1624358-bezierpathwitharccenter"},"\u5750\u6807\u7cfb")),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://docs-assets.developer.apple.com/published/741002b545/radians_circle_4de280d3-557c-4d69-8f12-efed200dbbd3.jpg",alt:"image"})),(0,i.kt)("h2",{id:"uiview"},"UIView"),(0,i.kt)("p",null,"UIView \u53ef\u4ee5\u5b9e\u73b0\u52a8\u753b\u7684\u5c5e\u6027\u5305\u62ec\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"frame"),(0,i.kt)("li",{parentName:"ul"},"bounds"),(0,i.kt)("li",{parentName:"ul"},"center"),(0,i.kt)("li",{parentName:"ul"},"transform"),(0,i.kt)("li",{parentName:"ul"},"alpha"),(0,i.kt)("li",{parentName:"ul"},"backgroundColor")),(0,i.kt)("p",null,"iOS 4 \u4ee5\u524d\uff0c\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"+beginAnimation")," \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"commitAnimation")," \u5b9e\u73b0\uff0c\u662f\u5bf9 CATransaction \u7684\u5c01\u88c5\u3002"),(0,i.kt)("p",null,"iOS 4+\uff0c\u4f7f\u7528\u4ee3\u7801\u5757\u7684\u65b9\u5f0f\uff0c\u5b9e\u9645\u8fd8\u662f\u5bf9 CATransaction \u7684\u5c01\u88c5\u3002"),(0,i.kt)("p",null,"iOS 10+\uff0c\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"UIViewPropertyAnimator"),"\uff0c\u5b9e\u73b0\u51fa\u4e86\u5f88\u591a\u4ee5\u524d\u8981\u7528\u663e\u5f0f\u52a8\u753b\u624d\u80fd\u505a\u5230\u7684\u7279\u6027\uff0c\u6bd4\u5982\u65f6\u95f4\u66f2\u7ebf\u7b49\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:t(80155).Z,width:"2756",height:"530"})),(0,i.kt)("p",null,"\u5f53\u51fa\u73b0\u9000\u540e\u53f0\u7684\u60c5\u51b5\u65f6\uff0c\u8fd9\u91cc\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"finished")," \u4f1a\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"NO"),"\uff0c\u8981\u6ce8\u610f\u3002"),(0,i.kt)("h2",{id:"lottie"},"Lottie"),(0,i.kt)("p",null,"\u52a8\u753b\u8bbe\u8ba1\u5e08\u4f7f\u7528 After Effects\uff0c\u5b89\u88c5\u63d2\u4ef6 Bodymovin\uff0c\u5236\u4f5c\u52a8\u753b\u5e76\u8f93\u51fa JSON\u3002"))}c.isMDXComponent=!0},23845:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/5f32-0ddc979b41551f8177cc679625800c10.png"},80155:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/3559C300-7930-4170-810A-1D00B2B2BCAC-7a7ead134950f963eb9e8fe38b0e7167.png"}}]);