"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2983],{55666:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>u,contentTitle:()=>l,default:()=>c,frontMatter:()=>p,metadata:()=>a,toc:()=>i});var t=n(87462),r=(n(67294),n(3905));n(61839);const p={sidebar_position:6},l="RunLoop",a={unversionedId:"Objective-C/runloop",id:"Objective-C/runloop",title:"RunLoop",description:"\u4ecb\u7ecd",source:"@site/docs/language/Objective-C/runloop.md",sourceDirName:"Objective-C",slug:"/Objective-C/runloop",permalink:"/docs/language/Objective-C/runloop",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Runtime",permalink:"/docs/language/Objective-C/runtime"},next:{title:"GCD",permalink:"/docs/language/Objective-C/gcd"}},u={},i=[{value:"\u4ecb\u7ecd",id:"\u4ecb\u7ecd",level:2},{value:"Mode",id:"mode",level:2},{value:"Observer",id:"observer",level:2},{value:"\u6e90\u7801\u5206\u6790",id:"\u6e90\u7801\u5206\u6790",level:2},{value:"\u5904\u7406\u4e0d\u540c\u4e8b\u4ef6\u7684\u51fd\u6570",id:"\u5904\u7406\u4e0d\u540c\u4e8b\u4ef6\u7684\u51fd\u6570",level:2},{value:"\u7ebf\u7a0b\u662f\u5982\u4f55\u4f11\u7720\u7684",id:"\u7ebf\u7a0b\u662f\u5982\u4f55\u4f11\u7720\u7684",level:2},{value:"performSelector",id:"performselector",level:2}],s={toc:i};function c(e){let{components:o,...p}=e;return(0,r.kt)("wrapper",(0,t.Z)({},s,p,{components:o,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"runloop"},"RunLoop"),(0,r.kt)("h2",{id:"\u4ecb\u7ecd"},"\u4ecb\u7ecd"),(0,r.kt)("p",null,"A run loop is an event processing loop that you use to schedule work and coordinate the receipt of incoming events. The purpose of a run loop is to keep your thread busy when there is work to do and put your thread to sleep when there is none."),(0,r.kt)("p",null,"\u5982\u679c\u6ca1\u6709 RunLoop\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"main"),"\u51fd\u6570\u6267\u884c\u5b8c\u5c31\u9000\u51fa\u4e86\uff0cApp \u5c31\u65e0\u6cd5\u8fd0\u884c\u4e86\u3002"),(0,r.kt)("p",null,"RunLoop \u7684\u57fa\u672c\u4f5c\u7528\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4fdd\u6301\u7a0b\u5e8f\u6301\u7eed\u8fd0\u884c\u4e0d\u9000\u51fa"),(0,r.kt)("li",{parentName:"ul"},"\u5904\u7406\u7a0b\u5e8f\u8fd0\u884c\u4e2d\u7684\u5404\u79cd\u4e8b\u4ef6\uff08\u89e6\u6478\u3001\u624b\u52bf\u3001\u5b9a\u65f6\u5668\u3001\u7f51\u7edc\u8bf7\u6c42\u7b49\uff09"),(0,r.kt)("li",{parentName:"ul"},"\u6ca1\u6709\u4e8b\u4ef6\u8981\u5904\u7406\u65f6\uff0c\u4f11\u7720\uff0c\u8282\u7701 CPU \u8d44\u6e90")),(0,r.kt)("p",null,"iOS \u4e2d\u6709 2 \u5957 API \u53ef\u4ee5\u8bbf\u95ee RunLoop\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Foundation: ",(0,r.kt)("inlineCode",{parentName:"li"},"NSRunLoop")," (ObjC)"),(0,r.kt)("li",{parentName:"ul"},"Core Foundation: ",(0,r.kt)("inlineCode",{parentName:"li"},"CFRunLoopRef")," (C)")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"CFRunLoopRef")," \u662f\u5f00\u6e90\u7684\uff1a",(0,r.kt)("a",{parentName:"p",href:"https://opensource.apple.com/tarballs/CF/"},"https://opensource.apple.com/tarballs/CF/"),"\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"NSRunLoop")," \u662f\u57fa\u4e8e ",(0,r.kt)("inlineCode",{parentName:"p"},"CFRunLoopRef")," \u7684\u5c01\u88c5\u3002"),(0,r.kt)("p",null,"RunLoop \u7684\u57fa\u672c\u77e5\u8bc6\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u6bcf\u4e2a\u7ebf\u7a0b\u90fd\u6709\u552f\u4e00\u7684\u4e0e\u4e4b\u5bf9\u5e94\u7684 RunLoop \u5bf9\u8c61\uff0c\u4fdd\u5b58\u5728\u5168\u5c40\u7684\u5b57\u5178\u91cc"),(0,r.kt)("li",{parentName:"ul"},"\u7ebf\u7a0b\u521a\u521b\u5efa\u65f6\u6ca1\u6709 RunLoop \u5bf9\u8c61\uff0cRunLoop \u4f1a\u5728\u7b2c\u4e00\u6b21\u83b7\u53d6\u5b83\u65f6\u521b\u5efa\uff0c\u5728\u7ebf\u7a0b\u7ed3\u675f\u65f6\u9500\u6bc1")),(0,r.kt)("p",null,"Your application does not need to create these objects explicitly; each thread, including the application\u2019s main thread, has an associated run loop object. Only secondary threads need to run their run loop explicitly, however. The app frameworks automatically set up and run the run loop on the main thread as part of the application startup process."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='CFRunLoop.c'",title:"'CFRunLoop.c'"},"CFRunLoopRef CFRunLoopGetCurrent(void) {\n    CHECK_FOR_FORK();\n    CFRunLoopRef rl = (CFRunLoopRef)_CFGetTSD(__CFTSDKeyRunLoop);\n    if (rl) return rl;\n    return _CFRunLoopGet0(pthread_self());\n}\n\nstatic CFMutableDictionaryRef __CFRunLoops = NULL;\nstatic CFLock_t loopsLock = CFLockInit;\n\nCF_EXPORT CFRunLoopRef _CFRunLoopGet0(pthread_t t) {\n    if (pthread_equal(t, kNilPthreadT)) {\n        t = pthread_main_thread_np(); // t\u4e3a\u7a7a\u7684\u8bdd\u5c31\u9ed8\u8ba4\u4e3b\u7ebf\u7a0b\n    }\n    __CFLock(&loopsLock);\n    if (!__CFRunLoops) { // \u5168\u5c40\u5b57\u5178\u4e0d\u5b58\u5728\uff0c\u521b\u5efa\n        __CFUnlock(&loopsLock);\n        CFMutableDictionaryRef dict = CFDictionaryCreateMutable(kCFAllocatorSystemDefault, 0, NULL, &kCFTypeDictionaryValueCallBacks);\n        CFRunLoopRef mainLoop = __CFRunLoopCreate(pthread_main_thread_np()); // \u9ed8\u8ba4\u7ed9\u4e3b\u7ebf\u7a0b\u521b\u5efaRunLoop\uff0c\u5e76\u52a0\u5230\u5b57\u5178\u91cc\n        CFDictionarySetValue(dict, pthreadPointer(pthread_main_thread_np()), mainLoop);\n        if (!OSAtomicCompareAndSwapPtrBarrier(NULL, dict, (void * volatile *)&__CFRunLoops)) {\n            CFRelease(dict);\n        }\n        CFRelease(mainLoop);\n        __CFLock(&loopsLock);\n    }\n    CFRunLoopRef loop = (CFRunLoopRef)CFDictionaryGetValue(__CFRunLoops, pthreadPointer(t));\n    __CFUnlock(&loopsLock);\n    if (!loop) {\n        CFRunLoopRef newLoop = __CFRunLoopCreate(t); // \u5f53\u524d\u7ebf\u7a0b\u6ca1\u6709RunLoop\u5219\u521b\u5efa\uff0c\u5e76\u52a0\u5230\u5b57\u5178\u91cc\n        __CFLock(&loopsLock);\n        loop = (CFRunLoopRef)CFDictionaryGetValue(__CFRunLoops, pthreadPointer(t));\n        if (!loop) {\n            CFDictionarySetValue(__CFRunLoops, pthreadPointer(t), newLoop);\n            loop = newLoop;\n        }\n        // don't release run loops inside the loopsLock, because CFRunLoopDeallocate may end up taking it\n        __CFUnlock(&loopsLock);\n        CFRelease(newLoop);\n    }\n    return loop;\n}\n")),(0,r.kt)("h2",{id:"mode"},"Mode"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='CFRunLoop.c'",title:"'CFRunLoop.c'"},"struct __CFRunLoop {\n    pthread_t _pthread; // \u5bf9\u5e94\u7684\u7ebf\u7a0b\n    CFMutableSetRef _commonModes; // \u6807\u8bb0\u54ea\u4e9b\u6a21\u5f0f\u662f common \u6a21\u5f0f\n    CFMutableSetRef _commonModeItems; // \u52a0\u5230 commonMode \u7684 Source/Observer/Timer \u653e\u5728\u8fd9\n    CFRunLoopModeRef _currentMode; // \u5f53\u524d\u8fd0\u884c\u7684\u6a21\u5f0f\n    CFMutableSetRef _modes; // \u88c5\u7740 CFRunLoopModeRef\uff0c\u8fd9\u4e9b\u662f\u5b9e\u9645\u8fd0\u884c\u7684\u6a21\u5f0f\n};\n\nstruct __CFRunLoopMode {\n    CFStringRef _name; // \u6a21\u5f0f\u7684\u540d\u79f0\n    CFMutableSetRef _sources0; // \u88c5\u7740 CFRunLoopSourceRef\n    CFMutableSetRef _sources1; // \u88c5\u7740 CFRunLoopSourceRef\n    CFMutableArrayRef _observers; // \u88c5\u7740 CFRunLoopObserverRef\n    CFMutableArrayRef _timers; // \u88c5\u7740 CFRunLoopTimerRef\n};\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"__CFRunLoopMode")," \u4ee3\u8868 RunLoop \u8fd0\u884c\u7684\u6a21\u5f0f\uff0c\u540c\u4e00\u65f6\u95f4 RunLoop \u53ea\u80fd\u4ee5\u4e00\u79cd\u6a21\u5f0f\u8fd0\u884c\u3002\u5982\u679c\u8981\u5207\u6362\u6a21\u5f0f\uff0c\u5219\u9700\u8981\u9000\u51fa\u5f53\u524d\u7684 RunLoop\uff0c\u5e76\u9009\u62e9\u65b0\u7684\u6a21\u5f0f\u91cd\u65b0\u8fdb\u5165\u3002\u8fd9\u6837\u505a\u53ef\u4ee5\u9694\u79bb\u5f00\u4e0d\u540c\u6a21\u5f0f\u7684 Source/Timer/Observer\uff0c\u4f7f\u5176\u4e92\u4e0d\u5f71\u54cd\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"img-40",src:n(22190).Z,width:"910",height:"714"})),(0,r.kt)("p",null,"Source/Timer/Observer \u8fd9\u4e9b\u53ef\u4ee5\u7406\u89e3\u4e3a RunLoop \u8981\u5904\u7406\u7684\u4e8b\u60c5\u3002RunLoop \u4ee5 ",(0,r.kt)("inlineCode",{parentName:"p"},"UITrackingRunLoopMode")," \u8fd0\u884c\u65f6\u8981\u5904\u7406\u7684\u4e8b\u60c5\uff0c\u80af\u5b9a\u6bd4\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"p"},"kCFRunLoopDefaultMode")," \u8fd0\u884c\u65f6\u5c11\u5f97\u591a\uff0c\u82f9\u679c\u8fd9\u6837\u505a\u53ef\u4ee5\u4fdd\u6301\u6ed1\u52a8\u65f6\u5019\u7684\u6d41\u7545\u6027\u3002"),(0,r.kt)("p",null,"\u5982\u679c RunLoop \u91cc\u9762\u6ca1\u6709\u4efb\u4f55\u7684 Source/Timer/Observer\uff0c\u5b83\u4f1a\u7acb\u5373\u9000\u51fa\uff08\u53ef\u4ee5\u7406\u89e3\u4e3a\u5b83\u6ca1\u6709\u4e8b\u60c5\u53ef\u505a\u4e86\uff09\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='NSRunLoop.h'",title:"'NSRunLoop.h'"},"FOUNDATION_EXPORT NSRunLoopMode const NSDefaultRunLoopMode;\nFOUNDATION_EXPORT NSRunLoopMode const NSRunLoopCommonModes; // \u4e0d\u662f\u5b9e\u9645\u8fd0\u884c\u7684\u6a21\u5f0f\uff0c\u662f\u4e00\u4e2a\u6807\u8bb0\u4f4d\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='UIApplication.h'",title:"'UIApplication.h'"},"UIKIT_EXTERN NSRunLoopMode const UITrackingRunLoopMode;\n")),(0,r.kt)("p",null,"\u4e3b\u7ebf\u7a0b\u7684 RunLoop \u91cc\u6709\u4e24\u4e2a\u9884\u7f6e\u7684 Mode\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"NSDefaultRunLoopMode")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"UITrackingRunLoopMode"),"\u3002\u8fd9\u4e24\u4e2a Mode \u9ed8\u8ba4\u90fd\u5df2\u7ecf\u6dfb\u52a0\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"commonModes")," \u4e2d\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"NSDefaultRunLoopMode")," \u662f App \u5e73\u65f6\u6240\u5904\u7684\u6a21\u5f0f\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"UITrackingRunLoopMode")," \u662f ScrollView \u6ed1\u52a8\u65f6\u7684\u6a21\u5f0f\u3002"),(0,r.kt)("p",null,"\u5f53\u521b\u5efa\u4e00\u4e2a Timer \u5e76\u52a0\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"NSDefaultRunLoopMode")," \u540e\uff0cTimer \u4f1a\u5f97\u5230\u91cd\u590d\u56de\u8c03\uff1b\u4f46\u6b64\u65f6\u6ed1\u52a8\u4e00\u4e2a ScrollView\uff0cRunLoop \u4f1a\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"p"},"UITrackingRunLoopMode")," \u8fd0\u884c\uff0c\u8fd9\u65f6 Timer \u5c31\u4e0d\u4f1a\u88ab\u56de\u8c03\u3002"),(0,r.kt)("p",null,"\u5f53\u9700\u8981 Timer \u5728\u4e24\u4e2a Mode \u4e2d\u90fd\u80fd\u5f97\u5230\u56de\u8c03\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"RunLoop.current.add(timer, forMode: .common)"),"\uff0c\u6b64\u65f6\u8fd9\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"timer")," \u88ab\u6dfb\u52a0\u5230 RunLoop \u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"_commonModeItems")," \u91cc\uff0c\u5e76\u540c\u6b65\u7ed9 ",(0,r.kt)("inlineCode",{parentName:"p"},"commonModes")," \u7684\u6240\u6709\u6210\u5458\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"void CFRunLoopAddTimer(CFRunLoopRef rl, CFRunLoopTimerRef rlt, CFStringRef modeName) {\n    if (modeName == kCFRunLoopCommonModes) {\n        CFSetRef set = rl->_commonModes ? CFSetCreateCopy(kCFAllocatorSystemDefault, rl->_commonModes) : NULL;\n        CFSetAddValue(rl->_commonModeItems, rlt);\n        if (NULL != set) {\n            CFTypeRef context[2] = {rl, rlt};\n            /* add new item to all common-modes */\n            CFSetApplyFunction(set, (__CFRunLoopAddItemToCommonModes), (void *)context);\n            CFRelease(set);\n        }\n    }\n}\n\nstatic void __CFRunLoopAddItemToCommonModes(const void *value, void *ctx) {\n    CFStringRef modeName = (CFStringRef)value;\n    CFRunLoopRef rl = (CFRunLoopRef)(((CFTypeRef *)ctx)[0]);\n    CFTypeRef item = (CFTypeRef)(((CFTypeRef *)ctx)[1]);\n    if (CFGetTypeID(item) == CFRunLoopSourceGetTypeID())\n    {\n        CFRunLoopAddSource(rl, (CFRunLoopSourceRef)item, modeName);\n    }\n    else if (CFGetTypeID(item) == CFRunLoopObserverGetTypeID())\n    {\n        CFRunLoopAddObserver(rl, (CFRunLoopObserverRef)item, modeName);\n    }\n    else if (CFGetTypeID(item) == CFRunLoopTimerGetTypeID())\n    {\n        CFRunLoopAddTimer(rl, (CFRunLoopTimerRef)item, modeName);\n    }\n}\n")),(0,r.kt)("h2",{id:"observer"},"Observer"),(0,r.kt)("p",null,"RunLoop \u53ef\u4ee5\u76d1\u542c\u7684\u72b6\u6001\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='RunLoop.h'",title:"'RunLoop.h'"},"/* Run Loop Observer Activities */\ntypedef CF_OPTIONS(CFOptionFlags, CFRunLoopActivity) {\n    kCFRunLoopEntry = (1UL << 0),\n    kCFRunLoopBeforeTimers = (1UL << 1),\n    kCFRunLoopBeforeSources = (1UL << 2),\n    kCFRunLoopBeforeWaiting = (1UL << 5),\n    kCFRunLoopAfterWaiting = (1UL << 6),\n    kCFRunLoopExit = (1UL << 7),\n    kCFRunLoopAllActivities = 0x0FFFFFFFU\n};\n")),(0,r.kt)("h2",{id:"\u6e90\u7801\u5206\u6790"},"\u6e90\u7801\u5206\u6790"),(0,r.kt)("p",null,"\u600e\u4e48\u627e\u6e90\u7801\u7684\u8c03\u7528\u5165\u53e3\u5462\uff1f\u6211\u4eec\u901a\u8fc7\u67e5\u770b\u4e00\u4e2a\u70b9\u51fb\u4e8b\u4ef6\u7684\u8c03\u7528\u5806\u6808\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"img",src:n(8466).Z,width:"2560",height:"1600"})),(0,r.kt)("p",null,"\u627e ",(0,r.kt)("inlineCode",{parentName:"p"},"CFRunLoopRunSpecific")," \u51fd\u6570\uff0c\u8fd9\u4e2a\u51fd\u6570\u5c31\u76f8\u5f53\u4e8e\u5165\u53e3\u4e86\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='CFRunLoop.c'",title:"'CFRunLoop.c'"},"SInt32 CFRunLoopRunSpecific(CFRunLoopRef rl, CFStringRef modeName, CFTimeInterval seconds, Boolean returnAfterSourceHandled) {\n    // \u5916\u90e8\u4f20 modeName\uff0c\u6307\u5b9a RunLoop \u8fd0\u884c\u7684\u6a21\u5f0f\n    CFRunLoopModeRef currentMode = __CFRunLoopFindMode(rl, modeName, false);\n    CFRunLoopModeRef previousMode = rl->_currentMode;\n    rl->_currentMode = currentMode;\n\n    // \u901a\u77e5 Observers\uff1a\u8fdb\u5165 RunLoop\n    if (currentMode->_observerMask & kCFRunLoopEntry)\n        __CFRunLoopDoObservers(rl, currentMode, kCFRunLoopEntry);\n\n    // \u5904\u7406 RunLoop \u8981\u505a\u7684\u4e8b\u60c5\uff0c\u8fd4\u56de\u7ed3\u679c\n    result = __CFRunLoopRun(rl, currentMode, seconds, returnAfterSourceHandled, previousMode);\n\n    // \u901a\u77e5 Observers\uff1a\u9000\u51fa RunLoop\n    if (currentMode->_observerMask & kCFRunLoopExit)\n        __CFRunLoopDoObservers(rl, currentMode, kCFRunLoopExit);\n\n    return result;\n}\n\nstatic int32_t __CFRunLoopRun(CFRunLoopRef rl, CFRunLoopModeRef rlm, CFTimeInterval seconds, Boolean stopAfterHandle, CFRunLoopModeRef previousMode) {\n    int32_t retVal = 0;\n    do {\n        // \u901a\u77e5 Observers\uff1a\u5373\u5c06\u5904\u7406 Timers\n        if (rlm->_observerMask & kCFRunLoopBeforeTimers)\n            __CFRunLoopDoObservers(rl, rlm, kCFRunLoopBeforeTimers);\n\n        // \u901a\u77e5 Observers\uff1a\u5373\u5c06\u5904\u7406 Sources\n        if (rlm->_observerMask & kCFRunLoopBeforeSources)\n            __CFRunLoopDoObservers(rl, rlm, kCFRunLoopBeforeSources);\n\n        // \u5904\u7406 Blocks\uff0c\u5373 CFRunLoopPerformBlock(_:_:_:)\n        __CFRunLoopDoBlocks(rl, rlm);\n\n        // \u5904\u7406 Source0\n        Boolean sourceHandledThisLoop = __CFRunLoopDoSources0(rl, rlm, stopAfterHandle);\n        if (sourceHandledThisLoop) {\n            // \u518d\u6b21\u5904\u7406 Blocks\n            __CFRunLoopDoBlocks(rl, rlm);\n        }\n\n        // \u5224\u65ad\u6709\u65e0 Source1\n        if (MACH_PORT_NULL != dispatchPort && !didDispatchPortLastTime)\n        {\n            // \u5904\u7406 Source1\uff0c\u5373 Port \u76f8\u5173\n            if (__CFRunLoopServiceMachPort(dispatchPort, &msg, sizeof(msg_buffer), &livePort, 0, &voucherState, NULL))\n            {\n                goto handle_msg;\n            }\n        }\n\n        // \u901a\u77e5 Observers\uff1a\u5373\u5c06\u8fdb\u5165\u4f11\u7720\n        if (!poll && (rlm->_observerMask & kCFRunLoopBeforeWaiting))\n            __CFRunLoopDoObservers(rl, rlm, kCFRunLoopBeforeWaiting);\n        __CFRunLoopSetSleeping(rl);\n\n        do {\n            // \u7b49\u5f85 Port \u6d88\u606f\u6765\u5524\u9192\u5f53\u524d\u7ebf\u7a0b\n            // RunLoop \u7b49\u5f85\u5728\u8fd9\u4e2a\u51fd\u6570\u8fd9\u91cc\n            __CFRunLoopServiceMachPort(waitSet, &msg, sizeof(msg_buffer), &livePort, poll ? 0 : TIMEOUT_INFINITY, &voucherState, &voucherCopy);\n\n            // \u77e5\u9053\u8fd9\u91cc\u4f1a\u6709break\u8df3\u51fa\u8fd9\u4e2a\u5faa\u73af\u5c31\u53ef\u4ee5\u4e86\n        } while (1);\n\n        // \u901a\u77e5 Observers\uff1a\u7ed3\u675f\u4f11\u7720\n        __CFRunLoopUnsetSleeping(rl);\n        if (!poll && (rlm->_observerMask & kCFRunLoopAfterWaiting))\n            __CFRunLoopDoObservers(rl, rlm, kCFRunLoopAfterWaiting);\n\n        // \u8def\u5f84\u4e00\uff1a\u7ed3\u675f\u4f11\u7720\u540e\uff0c\u5224\u65ad\u662f\u4ec0\u4e48\u539f\u56e0\u88ab\u5524\u9192\u7684\uff0c\u505a\u76f8\u5e94\u7684\u5904\u7406\n    handle_msg: // \u8def\u5f84\u4e8c\uff1a\u524d\u9762 goto \u8df3\u8fc7\u6765\u7684\n        if (modeQueuePort != MACH_PORT_NULL && livePort == modeQueuePort) {\n            CFRUNLOOP_WAKEUP_FOR_TIMER();\n            // \u5904\u7406 Timers\n            __CFRunLoopDoTimers(rl, rlm, mach_absolute_time());\n        } else if (livePort == dispatchPort) {\n            CFRUNLOOP_WAKEUP_FOR_DISPATCH();\n            // \u5904\u7406 GCD\n            __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__(msg);\n        } else {\n            CFRUNLOOP_WAKEUP_FOR_SOURCE();\n            // \u5904\u7406 Source1\n            sourceHandledThisLoop = __CFRunLoopDoSource1(rl, rlm, rls, msg, msg->msgh_size, &reply) || sourceHandledThisLoop;\n        }\n\n        // \u5904\u7406 Blocks\n        __CFRunLoopDoBlocks(rl, rlm);\n\n        // \u8bbe\u7f6e\u8fd4\u56de\u503c\n        if (sourceHandledThisLoop && stopAfterHandle) {\n            retVal = kCFRunLoopRunHandledSource;\n        }\n        else if (timeout_context->termTSR < mach_absolute_time()) {\n            retVal = kCFRunLoopRunTimedOut;\n        }\n        else if (__CFRunLoopIsStopped(rl)) {\n            __CFRunLoopUnsetStopped(rl);\n            retVal = kCFRunLoopRunStopped;\n        }\n        else if (rlm->_stopped) {\n            rlm->_stopped = false;\n            retVal = kCFRunLoopRunStopped;\n        }\n        else if (__CFRunLoopModeIsEmpty(rl, rlm, previousMode)) {\n            retVal = kCFRunLoopRunFinished;\n        }\n\n    } while (0 == retVal); // \u5982\u679c\u7ed3\u679c\u4e0d\u4e3a0\uff0c\u5c31\u9000\u51fa\u5faa\u73af\uff0c\u8fd4\u56de\u4e86\n\n    return retVal;\n}\n")),(0,r.kt)("p",null,"\u6d41\u7a0b\u56fe\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"img-80",src:n(97676).Z,width:"1240",height:"954"})),(0,r.kt)("h2",{id:"\u5904\u7406\u4e0d\u540c\u4e8b\u4ef6\u7684\u51fd\u6570"},"\u5904\u7406\u4e0d\u540c\u4e8b\u4ef6\u7684\u51fd\u6570"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"__CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__\n__CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__\n__CFRUNLOOP_IS_CALLING_OUT_TO_A_TIMER_CALLBACK_FUNCTION__\n__CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__\n__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__\n__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__\n")),(0,r.kt)("p",null,"GCD \u7684\u7edd\u5927\u591a\u6570\u5de5\u4f5c\u662f\u4e0d\u7528\u4f9d\u8d56 RunLoop \u7684\uff0c\u53ea\u6709\u6d3e\u53d1\u4efb\u52a1\u5230\u4e3b\u961f\u5217\u65f6\uff0c\u624d\u4f1a\u7531 RunLoop \u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"__CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__")," \u51fd\u6570\u5904\u7406\u3002"),(0,r.kt)("p",null,"\u7528\u6237\u7684\u89e6\u6478\u4e8b\u4ef6\u662f\u7531 Source1 \u6355\u83b7\u3001\u518d\u4ea4\u7ed9 Source0 \u5904\u7406\u7684\u3002Source1 \u53ef\u4ee5\u7406\u89e3\u4e3a\u5185\u6838\u7ba1\u7406\u7684\u8fdb\u7a0b\u95f4\u901a\u4fe1\uff0cSource0 \u53ef\u4ee5\u7406\u89e3\u4e3a App \u7ba1\u7406\u7684\u5e94\u7528\u5185\u90e8\u4e8b\u4ef6\u5904\u7406\u3002"),(0,r.kt)("h2",{id:"\u7ebf\u7a0b\u662f\u5982\u4f55\u4f11\u7720\u7684"},"\u7ebf\u7a0b\u662f\u5982\u4f55\u4f11\u7720\u7684"),(0,r.kt)("p",null,"\u4e0a\u9762\u63d0\u5230 RunLoop \u7b49\u5f85\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"__CFRunLoopServiceMachPort")," \u8fd9\u4e2a\u51fd\u6570\u91cc\uff0c\u627e\u5230\u5b83\u7684\u5b9e\u73b0\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='CFRunLoop.c'",title:"'CFRunLoop.c'"},"static Boolean __CFRunLoopServiceMachPort(mach_port_name_t port, mach_msg_header_t **buffer, size_t buffer_size, mach_port_t *livePort, mach_msg_timeout_t timeout, voucher_mach_msg_state_t *voucherState, voucher_t *voucherCopy) {\n    kern_return_t ret = KERN_SUCCESS;\n    for (;;) {\n        ret = mach_msg(msg, MACH_RCV_MSG | (voucherState ? MACH_RCV_VOUCHER : 0) | MACH_RCV_LARGE | ((TIMEOUT_INFINITY != timeout) ? MACH_RCV_TIMEOUT : 0) | MACH_RCV_TRAILER_TYPE(MACH_MSG_TRAILER_FORMAT_0) | MACH_RCV_TRAILER_ELEMENTS(MACH_RCV_TRAILER_AV), 0, msg->msgh_size, port, timeout, MACH_PORT_NULL);\n\n        CFRUNLOOP_WAKEUP(ret);\n        if (MACH_MSG_SUCCESS == ret) {\n            *livePort = msg ? msg->msgh_local_port : MACH_PORT_NULL;\n            return true;\n        }\n    }\n}\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"mach_msg")," \u662f\u4e00\u4e2a\u7cfb\u7edf\u8c03\u7528\uff0c\u53ef\u4ee5\u5411\u76ee\u6807\u7aef\u53e3\u53d1\u9001 mach \u6d88\u606f\uff0c\u6216\u8005\u4ece\u76ee\u6807\u7aef\u53e3\u63a5\u6536 mach \u6d88\u606f\uff0c\u5173\u4e8e\u7cfb\u7edf\u8c03\u7528\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"img",src:n(42703).Z,width:"1418",height:"814"})),(0,r.kt)("p",null,"RunLoop \u4f11\u7720\u5b9e\u9645\u4e0a\u662f\u8c03\u7528\u64cd\u4f5c\u7cfb\u7edf\u7684\u5e95\u5c42\u51fd\u6570 ",(0,r.kt)("inlineCode",{parentName:"p"},"mach_msg"),"\uff0c\u64cd\u4f5c\u7cfb\u7edf\u4f1a\u7531\u7528\u6237\u6001\u5207\u6362\u5230\u5185\u6838\u6001\uff0c\u7531\u5185\u6838\u5c06\u7ebf\u7a0b\u6302\u8d77\u5e76\u7b49\u5f85\u76ee\u6807\u7aef\u53e3\u7684 mach \u6d88\u606f\u3002\u5f53\u63a5\u6536\u5230\u6d88\u606f\u65f6\uff0c\u7531\u5185\u6838\u5524\u9192\u7ebf\u7a0b\u5e76\u7ee7\u7eed\u5904\u7406\u3002"),(0,r.kt)("h2",{id:"performselector"},"performSelector"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-objc"},"- (id)performSelector:(SEL)aSelector;\n- (id)performSelector:(SEL)aSelector withObject:(id)object;\n- (id)performSelector:(SEL)aSelector withObject:(id)object1 withObject:(id)object2;\n")),(0,r.kt)("p",null,"Sends a specified message to the receiver and returns the result of the message. \u4ee5\u4e0a\u4e09\u4e2a\u65b9\u6cd5\u7b49\u4ef7\u4e8e\u76f4\u63a5\u8c03\u7528\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-objc"},"- (void)performSelector:(SEL)aSelector withObject:(nullable id)anArgument afterDelay:(NSTimeInterval)delay;\n")),(0,r.kt)("p",null,"Invokes a method of the receiver on the current thread using the default (runloop) mode after a delay. \u521b\u5efa\u4e00\u4e2a Timer \u5e76\u6dfb\u52a0\u5230\u5f53\u524d\u7ebf\u7a0b\u7684 RunLoop \u4e2d\u3002\u6240\u4ee5\u5982\u679c\u5f53\u524d\u7ebf\u7a0b\u6ca1\u6709 RunLoop\uff0c\u5219\u8fd9\u4e2a\u65b9\u6cd5\u4f1a\u5931\u6548\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-objc"},"- (void)performSelectorOnMainThread:(SEL)aSelector withObject:(nullable id)arg waitUntilDone:(BOOL)wait;\n- (void)performSelector:(SEL)aSelector onThread:(NSThread *)thr withObject:(nullable id)arg waitUntilDone:(BOOL)wait);\n- (void)performSelectorInBackground:(SEL)aSelector withObject:(nullable id)arg);\n")),(0,r.kt)("p",null,"Invokes a method of the receiver on the specified thread using the default (runloop) mode. \u521b\u5efa\u4e00\u4e2a Timer \u5e76\u52a0\u5230\u5bf9\u5e94\u7ebf\u7a0b\u7684 Runloop \u4e2d\uff0c\u540c\u6837\u7684\uff0c\u5982\u679c\u5bf9\u5e94\u7ebf\u7a0b\u6ca1\u6709 RunLoop \u8be5\u65b9\u6cd5\u4e5f\u4f1a\u5931\u6548\u3002"))}c.isMDXComponent=!0},97676:(e,o,n)=>{n.d(o,{Z:()=>t});const t=n.p+"assets/images/3258209-19e2888899adddd6-1832ffd481e0ae654290c1f28fcfe232.png"},8466:(e,o,n)=>{n.d(o,{Z:()=>t});const t=n.p+"assets/images/C36C74C7-7E40-46C7-AECD-890436C5D959-07585c6ef85c4622042f0d7bfc605ec4.png"},22190:(e,o,n)=>{n.d(o,{Z:()=>t});const t=n.p+"assets/images/RunLoop_0-1c0fea5cd20d63bedbe3b43f81e8d450.png"},42703:(e,o,n)=>{n.d(o,{Z:()=>t});const t=n.p+"assets/images/73D0AA4B-FB84-4A69-9AF3-6BC0093B7360-90c278bb80985556efa58cbbbeab2b76.jpg"}}]);