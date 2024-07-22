"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1542],{3588:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var a=t(87462),n=(t(67294),t(3905));t(61839);const o={},r="Aspects",l={unversionedId:"aspects",id:"aspects",title:"Aspects",description:"\u9762\u5411\u5207\u9762\u7f16\u7a0b",source:"@site/docs/apple/aspects.md",sourceDirName:".",slug:"/aspects",permalink:"/docs/apple/aspects",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/aspects.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Apple Bugs",permalink:"/docs/apple/apple-bugs"},next:{title:"\u97f3\u89c6\u9891\u57fa\u7840\u77e5\u8bc6",permalink:"/docs/apple/audio-video"}},c={},i=[{value:"\u9762\u5411\u5207\u9762\u7f16\u7a0b",id:"\u9762\u5411\u5207\u9762\u7f16\u7a0b",level:2},{value:"Aspects \u5b9e\u73b0\u539f\u7406",id:"aspects-\u5b9e\u73b0\u539f\u7406",level:2}],p={toc:i};function d(e){let{components:s,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,t,{components:s,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"aspects"},"Aspects"),(0,n.kt)("h2",{id:"\u9762\u5411\u5207\u9762\u7f16\u7a0b"},"\u9762\u5411\u5207\u9762\u7f16\u7a0b"),(0,n.kt)("p",null,"Runtime Method Swizzling \u7f16\u7a0b\u65b9\u5f0f\uff0c\u4e5f\u53ef\u4ee5\u53eb\u4f5c AOP\uff08Aspect-Oriented Programming\uff0c\u9762\u5411\u5207\u9762\u7f16\u7a0b\uff09\u3002AOP \u662f\u4e00\u79cd\u7f16\u7a0b\u8303\u5f0f\uff0c\u4e5f\u53ef\u4ee5\u8bf4\u662f\u4e00\u79cd\u7f16\u7a0b\u601d\u60f3\uff0c\u4f7f\u7528 AOP \u53ef\u4ee5\u89e3\u51b3 OOP\uff08Object Oriented Programming\uff0c\u9762\u5411\u5bf9\u8c61\u7f16\u7a0b\uff09\u7531\u4e8e\u5207\u9762\u9700\u6c42\u5bfc\u81f4\u5355\u4e00\u804c\u8d23\u88ab\u7834\u574f\u7684\u95ee\u9898\u3002\u901a\u8fc7 AOP \u53ef\u4ee5\u4e0d\u4fb5\u5165 OOP \u5f00\u53d1\uff0c\u975e\u5e38\u65b9\u4fbf\u5730\u63d2\u5165\u5207\u9762\u9700\u6c42\u529f\u80fd\u3002"),(0,n.kt)("p",null,"\u6bd4\u5982\u65e0\u4fb5\u5165\u57cb\u70b9\u65b9\u6848\uff0c\u901a\u8fc7 AOP \u5728\u4e0d\u4fb5\u5165\u539f\u6709\u529f\u80fd\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\uff0c\u63d2\u5165\u57cb\u70b9\u3002\u5982\u679c\u6ca1\u6709\u4f7f\u7528 AOP\uff0c\u9274\u4e8e OOP \u7684\u5c40\u9650\u6027\uff0c\u8fd9\u4e9b\u4e0e\u4e3b\u4e1a\u52a1\u65e0\u5173\u7684\u4ee3\u7801\u5c31\u4f1a\u5230\u5904\u90fd\u662f\uff0c\u52a0\u5927\u7ef4\u62a4\u6210\u672c\u3002"),(0,n.kt)("p",null,'Aspect-oriented programming (AOP) is used to encapsulate "cross-cutting" concerns. These are the kind of requirements that cut-across many modules in your system, and so cannot be encapsulated using normal object oriented programming. Some examples of these kinds of requirements:'),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Whenever a user invokes a method on the service client, security should be checked."),(0,n.kt)("li",{parentName:"ul"},"Whenever a user interacts with the store, a genius suggestion should be presented, based on their interaction."),(0,n.kt)("li",{parentName:"ul"},"All calls should be logged.")),(0,n.kt)("p",null,"\u53c2\u8003\u5f00\u6e90\u5e93\uff1a",(0,n.kt)("a",{parentName:"p",href:"https://github.com/steipete/Aspects"},"https://github.com/steipete/Aspects")," Think of Aspects as method swizzling on steroids \u7c7b\u56fa\u9187. It allows you to add code to existing methods per class or per instance, whilst thinking of the insertion point e.g. before/instead/after. Aspects automatically deals with calling super and is easier to use than regular method swizzling."),(0,n.kt)("h2",{id:"aspects-\u5b9e\u73b0\u539f\u7406"},"Aspects \u5b9e\u73b0\u539f\u7406"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"AspectsContainer"),": Tracks all aspects for an object/class."),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"AspectIdentifier"),": Tracks a single aspect."),(0,n.kt)("p",null,"Aspects \u548c kvo \u7684\u539f\u7406\u7c7b\u4f3c\uff0c\u5c06 hook \u5bf9\u8c61\u7684 isa \u6307\u9488\u6307\u5411\u52a8\u6001\u521b\u5efa\u7684\u5b50\u7c7b\uff0c\u628a\u5b50\u7c7b ",(0,n.kt)("inlineCode",{parentName:"p"},"forwardInvocation:")," \u7684 IMP \u6307\u5411 ",(0,n.kt)("inlineCode",{parentName:"p"},"(IMP)__ASPECTS_ARE_BEING_CALLED__"),"\uff0c\u4ea4\u6362\u65b9\u6cd5 ",(0,n.kt)("inlineCode",{parentName:"p"},"__aspects_forwardInvocation:")," \u7684 IMP \u6307\u5411\u539f\u6765\u7684\u5b9e\u73b0\u3002"),(0,n.kt)("p",null,"\u9700\u8981 hook \u7684 selector\uff0c\u5176 IMP \u66ff\u6362\u6210 ",(0,n.kt)("inlineCode",{parentName:"p"},"_objc_msgForward"),"\uff0c\u4f7f\u65b9\u6cd5\u8c03\u7528\u8fdb\u5165\u6d88\u606f\u8f6c\u53d1\u6d41\u7a0b ",(0,n.kt)("inlineCode",{parentName:"p"},"forwardInvocation:"),"\uff0c\u5728 ",(0,n.kt)("inlineCode",{parentName:"p"},"__ASPECTS_ARE_BEING_CALLED__")," \u65b9\u6cd5\u91cc\uff0c\u6267\u884c\u6211\u4eec\u81ea\u5b9a\u4e49\u7684 block\u3002"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-objc"},'static id aspect_add(id self, SEL selector, AspectOptions options, id block, NSError **error) {\n    __block AspectIdentifier *identifier = nil;\n    // \u4f7f\u7528 OSSpinLock \u52a0\u9501\n    aspect_performLocked(^{\n        // \u68c0\u67e5\u662f\u5426\u53ef\u4ee5 hook\n        if (aspect_isSelectorAllowedAndTrack(self, selector, options, error)) {\n            // \u4e3a\u5f53\u524d\u5b9e\u4f8b\u8bbe\u7f6e\u5173\u8054\u5bf9\u8c61\u4f5c\u4e3a aspectContainer\uff0c\u5173\u8054\u5bf9\u8c61\u7684 key \u662f AspectsMessagePrefix + selector \u7684\u540d\u79f0\n            AspectsContainer *aspectContainer = aspect_getContainerForObject(self, selector);\n            identifier = [AspectIdentifier identifierWithSelector:selector object:self options:options block:block error:error];\n            if (identifier) {\n                [aspectContainer addAspect:identifier withOptions:options];\n                // \u5f00\u59cb\u8fdb\u5165 hook \u6d41\u7a0b\n                aspect_prepareClassAndHookSelector(self, selector, error);\n            }\n        }\n    });\n    return identifier;\n}\n\nstatic void aspect_prepareClassAndHookSelector(NSObject *self, SEL selector, NSError **error) {\n    NSCParameterAssert(selector); // "buttonPressed:"\n\n    // \u521b\u5efa\u5b50\u7c7b\uff0c\u5e76\u4ea4\u6362 `forwardInvocation:` \u65b9\u6cd5\uff0cself \u7684 isa \u6307\u9488\u6307\u5411\u5b50\u7c7b\uff01\n    Class klass = aspect_hookClass(self, error);\n    Method targetMethod = class_getInstanceMethod(klass, selector);\n    IMP targetMethodIMP = method_getImplementation(targetMethod); // (AspectsDemo`-[AspectsViewController buttonPressed:] at AspectsViewController.m:14)\n\n    if (!aspect_isMsgForwardIMP(targetMethodIMP)) {\n        const char *typeEncoding = method_getTypeEncoding(targetMethod);\n        SEL aliasSelector = aspect_aliasForSelector(selector); // "aspects__buttonPressed:"\n        if (![klass instancesRespondToSelector:aliasSelector]) {\n            // aliasSelector \u7684 IMP \u6307\u5411\u539f\u5b9e\u73b0\n            class_addMethod(klass, aliasSelector, method_getImplementation(targetMethod), typeEncoding);\n        }\n        // \u5f53\u524d\u5b9e\u4f8b self \u7684 selector \u6307\u5411 `forwardInvocation:`\n        class_replaceMethod(klass, selector, aspect_getMsgForwardIMP(self, selector), typeEncoding);\n    }\n}\n\nstatic Class aspect_hookClass(NSObject *self, NSError **error) {\n    Class statedClass = self.class; // NSObject `- (Class)class;` Returns the class object for the receiver\u2019s class.\n    Class baseClass = object_getClass(self); // Returns the class of an object.\n    NSString *className = NSStringFromClass(baseClass);\n\n    // \u521b\u5efa\u52a8\u6001\u5b50\u7c7b\uff01\u5b50\u7c7b\u7684\u540d\u79f0\u662f \u201c\u5f53\u524d\u5b9e\u4f8b\u7684\u7c7b\u540d + AspectsSubclassSuffix\u201d\n    const char *subclassName = [className stringByAppendingString:AspectsSubclassSuffix].UTF8String;\n    Class subclass = objc_getClass(subclassName);\n    if (subclass == nil) {\n        /**\n        * Creates a new class and metaclass.\n        * @param superclass The class to use as the new class\'s superclass.\n        * @param name The string to use as the new class\'s name. The string will be copied.\n        * @return The new class\n        */\n        subclass = objc_allocateClassPair(baseClass, subclassName, 0);\n\n        // \u5b50\u7c7b `forwardInvocation:` \u7684 IMP \u6307\u5411 (IMP)__ASPECTS_ARE_BEING_CALLED__\n        // `__aspects_forwardInvocation:` \u7684 IMP \u6307\u5411\u539f\u6765\u7684\u5b9e\u73b0\n        aspect_swizzleForwardInvocation(subclass);\n\n        // \u66ff\u6362 `- (Class)class;` \u65b9\u6cd5\u7684 IMP \u4f7f\u5176\u8fd4\u56de statedClass\n        aspect_hookedGetClass(subclass, statedClass); // UIImagePickerController_Aspects_, UIImagePickerController\n        aspect_hookedGetClass(object_getClass(subclass), statedClass); // UIImagePickerController_Aspects_, UIImagePickerController\n\n        objc_registerClassPair(subclass);\n    }\n    object_setClass(self, subclass); // self \u7684 isa \u6307\u9488\u6307\u5411\u52a8\u6001\u521b\u5efa\u7684\u5b50\u7c7b\uff01\n    return subclass;\n}\n')))}d.isMDXComponent=!0}}]);