"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1013],{55842:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>r,contentTitle:()=>s,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var i=a(87462),n=(a(67294),a(3905));a(61839);const l={},s="\u542f\u52a8\u65f6\u957f\u4f18\u5316",o={unversionedId:"\u5e95\u5c42\u539f\u7406/app-launch",id:"\u5e95\u5c42\u539f\u7406/app-launch",title:"\u542f\u52a8\u65f6\u957f\u4f18\u5316",description:"Mach-O",source:"@site/docs/apple/\u5e95\u5c42\u539f\u7406/app-launch.md",sourceDirName:"\u5e95\u5c42\u539f\u7406",slug:"/\u5e95\u5c42\u539f\u7406/app-launch",permalink:"/docs/apple/\u5e95\u5c42\u539f\u7406/app-launch",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/\u5e95\u5c42\u539f\u7406/app-launch.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u9879\u76ee\u914d\u7f6e",permalink:"/docs/apple/\u5de5\u7a0b/\u9879\u76ee\u914d\u7f6e"},next:{title:"\u5d29\u6e83",permalink:"/docs/apple/\u5e95\u5c42\u539f\u7406/crash"}},r={},p=[{value:"Mach-O",id:"mach-o",level:2},{value:"exec to main",id:"exec-to-main",level:2},{value:"Measurement",id:"measurement",level:2},{value:"Launch Types",id:"launch-types",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"dyld3",id:"dyld3",level:2},{value:"Instruments: App Launch Template",id:"instruments-app-launch-template",level:2},{value:"XCTest Metrics",id:"xctest-metrics",level:2},{value:"\u5b9e\u6218",id:"\u5b9e\u6218",level:2},{value:"\u4e8c\u8fdb\u5236\u91cd\u6392",id:"\u4e8c\u8fdb\u5236\u91cd\u6392",level:2}],d={toc:p};function c(e){let{components:t,...l}=e;return(0,n.kt)("wrapper",(0,i.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\u542f\u52a8\u65f6\u957f\u4f18\u5316"},"\u542f\u52a8\u65f6\u957f\u4f18\u5316"),(0,n.kt)("h2",{id:"mach-o"},"Mach-O"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2016/406/"},"WWDC 2016 - Optimizing App Startup Time"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Image"),": An executable, dylib, or bundle."),(0,n.kt)("p",null,"A Mach-O image is divided into segments. Each segment is always a multiple of the page size. The page size is determined by the hardware, for arm64, the page size is 16KB."),(0,n.kt)("p",null,"The most common segment names are ",(0,n.kt)("inlineCode",{parentName:"p"},"__TEXT"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"__DATA"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"__LINKEDIT"),":"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"__TEXT")," contains the Mach header, machine instructions and read-only constants such as C strings"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"__DATA")," segment is read-write and contains global variables, static variables, etc"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"__LINKEDIT"),' contains information about your functions and variables such as their names and addresses, the "meta data" about how to load the program')),(0,n.kt)("p",null,"You may also heard about Mach-O Universal Files, that's merged Mach-O images for different architectures."),(0,n.kt)("p",null,"Every process has a logical address space which gets mapped to some physical page of RAM."),(0,n.kt)("p",null,"File backed mapping: rather than actually read an entire file into RAM you can tell the VM system through the ",(0,n.kt)("inlineCode",{parentName:"p"},"mmap")," call, that I want this slice of this file mapped to this address range in my process. Each time you access an address that hasn't been accessed before it will cause a ",(0,n.kt)("strong",{parentName:"p"},"page fault"),", the kernel will read just that one page. And that gives you lazy reading of your file."),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"__TEXT")," segment of any images can be mapped into VM, it will be read lazily, and all those pages can be shared between processes."),(0,n.kt)("p",null,"As soon as one process actually tries to write to ",(0,n.kt)("inlineCode",{parentName:"p"},"__DATA")," segment page, the ",(0,n.kt)("strong",{parentName:"p"},"Copy-On-Write")," (COW) happens. The Copy-On-Write causes the kernel to make a copy of that page into another physical RAM and redirect the mapping to go to that. So that one process now has its own copy of that page, which brings us to clean versus dirty pages. That copy is considered a dirty page."),(0,n.kt)("p",null,"A ",(0,n.kt)("strong",{parentName:"p"},"dirty page")," is something that contains process specific information. A ",(0,n.kt)("strong",{parentName:"p"},"clean page")," is something that the kernel could regenerate later if needed such as re-reading from disk. So dirty pages are much more expensive than clean pages."),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"__LINKEDIT")," is only needed while dyld is doing its operations. Once it's done, it doesn't need these ",(0,n.kt)("inlineCode",{parentName:"p"},"__LINKEDIT")," pages anymore, the kernal can reclaim them when someone else needs RAM."),(0,n.kt)("p",null,"You can mark a page readable, writable, or executable, or any combination of those."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img",src:a(7138).Z,width:"2460",height:"1396"})),(0,n.kt)("p",null,"There are two security things that have impacted dyld, ",(0,n.kt)("strong",{parentName:"p"},"ASLR")," and ",(0,n.kt)("strong",{parentName:"p"},"code signing"),". ASLR is that every time you loaded the images it may be at a different address. Code signing is at ",(0,n.kt)("strong",{parentName:"p"},"build time"),", every single page of your Mach-O file gets its own individual cryptographic hash. And all those hashes are stored in the ",(0,n.kt)("inlineCode",{parentName:"p"},"__LINKEDIT"),". This allows each page to be validated that it hasn't been tampered with."),(0,n.kt)("h2",{id:"exec-to-main"},"exec to main"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2016/406/"},"WWDC 2016 - Optimizing App Startup Time"))),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"exec()")," is a system call. When you trap into the kernel, you basically say I want to replace this process with this new program. The kernel wipes the entire address space and maps-in your executable."),(0,n.kt)("p",null,"For ASLR the system maps your executable in at a random address. From that address, back down to zero, it marks that whole region (",(0,n.kt)("strong",{parentName:"p"},"PAGEZERO"),") inaccessible. The size of that region is at least 4GB for 64-bit processes. This catches any NULL pointer references and pointer truncation errors."),(0,n.kt)("p",null,"When the kernel's done mapping a process, it now maps another Mach-O called dyld into that process at another random address, sets the PC (program counter) into dyld and let dyld load all the dylibs and get everything prepared."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img",src:a(80502).Z,width:"2560",height:"200"})),(0,n.kt)("p",null,"First, dyld has to map all the dependent ",(0,n.kt)("strong",{parentName:"p"},"dylibs"),". To find those dylibs, it first reads the header of the main executable that the kernel already mapped in. That header has a list of all the dependent libraries. Once dyld found each dylib, it validate it, register that code signature to the kernel, then mmap each segment in that dylib. Each of the dylibs may depend on something that's already loaded or something need to load. Apps typically load 100 to 400 dylibs! Luckily most of those are OS dylibs which load very quickly because the OS do a lot of pre-calculate and pre-cache works."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img-40",src:a(96693).Z,width:"1326",height:"1584"})),(0,n.kt)("p",null,"Eventually, it has everything loaded, but now they're all independent of each other, we have to bind them together. But, because of code signing we can't actually alter instructions. So how does one dylib call into another dylib if you can't change the instructions? Modern code-gen is dynamic PIC (Position Independent Code), means code can run loaded at any address and is never altered. Actually, the co-gen creates pointers in the ",(0,n.kt)("inlineCode",{parentName:"p"},"__DATA")," segment that point to implementation. The dyld is going to ",(0,n.kt)("strong",{parentName:"p"},"fix up")," pointers and data (in ",(0,n.kt)("inlineCode",{parentName:"p"},"__DATA")," sengment)."),(0,n.kt)("p",null,"There're two main categories of fix-ups, ",(0,n.kt)("strong",{parentName:"p"},"rebasing")," and ",(0,n.kt)("strong",{parentName:"p"},"binding"),"."),(0,n.kt)("p",null,"Rebasing is adjusting pointers to within an image. It means going through all your data pointers and adding a slide to them (because of ASLR). Location of those ",(0,n.kt)("strong",{parentName:"p"},"relocatable addresses")," is encoded in ",(0,n.kt)("inlineCode",{parentName:"p"},"__LINKEDIT"),". When we start doing rebasing, we're actually causing page faults to page in all the ",(0,n.kt)("inlineCode",{parentName:"p"},"__DATA")," pages. And then we cause copy and write as we're changing them. So rebasing can sometimes be expensive because of all the I/O.\uff08\u8fd9\u5c31\u89e3\u91ca\u4e86\u4e3a\u4ec0\u4e48 ",(0,n.kt)("inlineCode",{parentName:"p"},"__DATA")," sengment \u5728\u5185\u5b58\u4e2d\u662f\u810f\u5206\u9875\uff09"),(0,n.kt)("p",null,"Binding is setting pointers to outside image. All references to something in another dylib are ",(0,n.kt)("strong",{parentName:"p"},"symbolic"),". So dyld needs to find the implementation of that symbol by looking through symbol tables. Once it's found, that values is stored in that data pointer. This is more computationally complex than rebasing is. But there's very little I/O because rebasing has done most of the I/O already."),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"To see fix-ups: ",(0,n.kt)("inlineCode",{parentName:"p"},"> xcrun dyldinfo -rebase -bind -lazy_bind myapp.app/myapp"))),(0,n.kt)("p",null,"Next, a few extra things that ",(0,n.kt)("strong",{parentName:"p"},"ObjC Runtime")," requires:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"All ObjC class definitions are registered with a global table."),(0,n.kt)("li",{parentName:"ul"},"Non-fragile ivars offsets updated."),(0,n.kt)("li",{parentName:"ul"},"Categories are inserted into method lists, including those not in your executable but in other dylibs."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"objc_msgSend")," is based on selectors being unique so we need unique selectors.")),(0,n.kt)("p",null,"Finally, before jumping to ",(0,n.kt)("inlineCode",{parentName:"p"},"main"),", we have to run initializers:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"C++ compiler generates initializer for statically allocated objects"),(0,n.kt)("li",{parentName:"ul"},"ObjC ",(0,n.kt)("inlineCode",{parentName:"li"},"+load")," methods")),(0,n.kt)("h2",{id:"measurement"},"Measurement"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2016/406/"},"WWDC 2016 - Optimizing App Startup Time"))),(0,n.kt)("p",null,"We have a built-in measurement in dyld, you can access it through setting an environment variable. (Xcode - Edit Scheme - Arguments - Environment Variables, ",(0,n.kt)("inlineCode",{parentName:"p"},"DYLD_PRINT_STATISTICS=1"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"DYLD_PRINT_STATISTICS_DETAILS=1"),")"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-log"},"Total pre-main time: 1.3 seconds (100.0%)\n         dylib loading time: 1.0 seconds (74.7%)\n        rebase/binding time:  95.79 milliseconds (7.1%)\n            ObjC setup time:  41.65 milliseconds (3.0%)\n           initializer time: 202.46 milliseconds (15.0%)\n           slowest intializers :\n             libSystem.B.dylib :   7.37 milliseconds (0.5%)\n           libMTLCapture.dylib :  36.40 milliseconds (2.7%)\n                       Flutter :  79.66 milliseconds (5.9%)\n\n  total time: 2.4 seconds (100.0%)\n  total images loaded:  656 (584 from dyld shared cache)\n  total segments mapped: 221, into 63664 pages\n  total images loading time: 2.0 seconds (84.9%)\n  total load time in ObjC:  41.65 milliseconds (1.6%)\n  total debugger pause time: 1.0 seconds (44.1%)\n  total dtrace DOF registration time:   0.00 milliseconds (0.0%)\n  total rebase fixups:  295,165\n  total rebase fixups time:  69.41 milliseconds (2.8%)\n  total binding fixups: 29,525\n  total binding fixups time:  46.85 milliseconds (1.9%)\n\n  total weak binding fixups time:  10.28 milliseconds (0.4%)\n  total redo shared cached bindings time:  30.76 milliseconds (1.2%)\n  total bindings lazily fixed up: 0 of 0\n  total time in initializers and ObjC +load: 202.46 milliseconds (8.2%)\n                         libSystem.B.dylib :   7.37 milliseconds (0.2%)\n               libBacktraceRecording.dylib :   5.82 milliseconds (0.2%)\n                       libMTLCapture.dylib :  36.40 milliseconds (1.4%)\n                                 Alamofire :   2.95 milliseconds (0.1%)\n                                    Charts :   3.29 milliseconds (0.1%)\n                              FBSDKCoreKit :   6.85 milliseconds (0.2%)\n                                   Flutter :  79.66 milliseconds (3.2%)\n                                 xxNetwork :   2.85 milliseconds (0.1%)\n                                 HandyJSON :   2.61 milliseconds (0.1%)\n                                MoyaMapper :   2.59 milliseconds (0.1%)\n                                   RxSwift :   4.43 milliseconds (0.1%)\n                                   RxCocoa :   7.06 milliseconds (0.2%)\n                                        xx :  18.68 milliseconds (0.7%)\ntotal symbol trie searches:    86758\ntotal symbol table binary searches:    0\ntotal images defining weak symbols:  70\ntotal images using weak symbols:  157\n")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"The debugger has to pause launch on every single dylib load in order to parse the symbols from your app and load your break points, over a USB cable that can be very time consuming. But dyld knows about that and it subtracts the debugger time.")),(0,n.kt)("h2",{id:"launch-types"},"Launch Types"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2016/406/"},"WWDC 2016 - Optimizing App Startup Time"))),(0,n.kt)("p",null,"A ",(0,n.kt)("strong",{parentName:"p"},"warm launch")," is an app where the application is already in memory, either because it's been launched and quit previously, and it's still sitting in the discache in the kernel, or because you just copied it over."),(0,n.kt)("p",null,"A ",(0,n.kt)("strong",{parentName:"p"},"cold launch")," is a launch where it's not in the discache, when your user is launching an app after rebooting the phone, or for the first time in a long time."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img",src:a(13947).Z,width:"2560",height:"1101"})),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2018/407/?time=2086"},"WWDC 2018 - Practical Approaches to Great App Performance"))),(0,n.kt)("p",null,"If you kill an app, it might not trigger a cold launch, because the system decides when the resources should be paged out. If you relaunch it a few second later, it's almost guaranteed that you'll hit a warm launch. We call it warm, because the resources or the dependents are still in the cache, so it's faster to launch."),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2019/423/"},"WWDC 2019 - Optimizing App Launch"))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Cold launch: In order to launch your app, we need to bring it from disk into memory, startup system-side services that support your app, and then spawn your process."),(0,n.kt)("li",{parentName:"ul"},"Warm launch: Your app still needs to be spawned, but we've already brought your app into memory and started up some of those system-side services. So, this will be a little bit faster and more consistent."),(0,n.kt)("li",{parentName:"ul"},"Resume (Hot): occurs when a user reenters your app from either the home screen or the app switcher.")),(0,n.kt)("h2",{id:"best-practices"},"Best Practices"),(0,n.kt)("p",null,"400 milliseconds is a good launch time. Don\u2019t ever take longer than 20 seconds, in that case app will get killed."),(0,n.kt)("p",null,"After call ",(0,n.kt)("inlineCode",{parentName:"p"},"main"),", we have to call ",(0,n.kt)("inlineCode",{parentName:"p"},"UIApplicationMain"),", that does some other things including running the framework initializers and loading your nibs. And then finally you'll get a call back ",(0,n.kt)("inlineCode",{parentName:"p"},"applicationWillFinishLaunching"),", which is also counted in that 400 milliseconds."),(0,n.kt)("p",null,"Use fewer dylibs, a good target is about 6:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"you can merge existing dylibs"),(0,n.kt)("li",{parentName:"ul"},"use static libraries")),(0,n.kt)("p",null,"I/O is for both of rebasing and binding. So fixing up fewer pointers can help:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Reduce Objective-C metadata (classes, selectors, and categories). There are a number of coding styles that are encouraging very small classes, that maybe only have one or two functions. Those particular patterns may result in gradual slowdowns of your applications. Having 100 or 1,000 classes isn't a problem, but 10,000 or 20,000 classes is."),(0,n.kt)("li",{parentName:"ul"},"Reduce C++ virtual functions which create V-tables, that are the same as ObjC metadata. They create structures in the ",(0,n.kt)("inlineCode",{parentName:"li"},"__DATA")," section that have to be fixed up."),(0,n.kt)("li",{parentName:"ul"},"Use Swift structs. Swift tends to use less data that has pointers for fixing up. Swift is more inlinable and can better co-gen to avoid a lot of that, so migrating to Swift is a great way to improve this."),(0,n.kt)("li",{parentName:"ul"},"Be careful about machine generated codes. You may describe some structures in terms of a DSL (domain-specific language) and then have a program that generates other code from it. And if those generated programs have a lot of pointers in them, they can become very expensive.")),(0,n.kt)("p",null,"For ObjC setup, we solved by less fix-ups before."),(0,n.kt)("p",null,"Initilizers:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Replacing ",(0,n.kt)("inlineCode",{parentName:"li"},"+load")," with ",(0,n.kt)("inlineCode",{parentName:"li"},"+initialize"),", which will cause the ObjC runtime to initialize your code when the classes were substantiated instead of when the file is loaded."),(0,n.kt)("li",{parentName:"ul"},"Don't use C/C++ ",(0,n.kt)("inlineCode",{parentName:"li"},"__attribute__((constructor))"),". Replace with call site initializers, means things like ",(0,n.kt)("inlineCode",{parentName:"li"},"dispatch_once()"),"."),(0,n.kt)("li",{parentName:"ul"},"C++ statics with non-trivial constructors:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"replace those with call site initilizers"),(0,n.kt)("li",{parentName:"ul"},"Only set simple values (PODs, plain old data)"),(0,n.kt)("li",{parentName:"ul"},"Use ",(0,n.kt)("inlineCode",{parentName:"li"},"-Wglobal-constructors")," compiler flag to identify those initilizers"),(0,n.kt)("li",{parentName:"ul"},"Rewrite in Swift"))),(0,n.kt)("li",{parentName:"ul"},"Do not call ",(0,n.kt)("inlineCode",{parentName:"li"},"dlopen")," in initializers"),(0,n.kt)("li",{parentName:"ul"},"Do not create threads in initializers")),(0,n.kt)("p",null,"New in iOS 11, we've added Static Initializer Tracing to Instruments. This is pretty exciting stuff because initializers are code that have to run before main to setup objects for you, and you haven't had much visibility into what happens before main. See ",(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2017/413"},"WWDC 2017 - App Startup Time: Past, Present, and Future"),"."),(0,n.kt)("h2",{id:"dyld3"},"dyld3"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2017/413"},"WWDC 2017 - App Startup Time: Past, Present, and Future"))),(0,n.kt)("p",null,"dyld 3 has 3 components:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"An out-of-process Mach-O parser/compiler"),(0,n.kt)("li",{parentName:"ul"},"An in-process engine that runs launch closures"),(0,n.kt)("li",{parentName:"ul"},"A launch closure caching service")),(0,n.kt)("h2",{id:"instruments-app-launch-template"},"Instruments: App Launch Template"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2019/423/"},"WWDC 2019 - Optimizing App Launch"))),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img",src:a(43394).Z,width:"2560",height:"256"})),(0,n.kt)("p",null,"These six phases came from the new App Launch template in Instruments since Xcode 11. They cover everything from system initialization to the app initialization to view creation and layout, and then depending on your app, potentially a asynchronous loading phase for your data, the extended phase."),(0,n.kt)("p",null,"The first half of system interface is dyld. A ",(0,n.kt)("strong",{parentName:"p"},"dynamic linker")," (dyld) loads your shared libraries and frameworks. DYLD3 introduces caching of runtime dependencies to improve warm launch."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Avoid linking unused frameworks"),(0,n.kt)("li",{parentName:"ul"},"Avoid dynamic library loading during launch, e.g. ",(0,n.kt)("inlineCode",{parentName:"li"},"dlopen"),", ",(0,n.kt)("inlineCode",{parentName:"li"},"-[NSBundle load]")),(0,n.kt)("li",{parentName:"ul"},"Hard link all your dependencies")),(0,n.kt)("p",null,"The second half of system interface is libSystem Init. This is when we initialize the low-level system components within your application. This is mostly system-side work with a fixed cost.\nDevelopers don't need to focus on the section."),(0,n.kt)("p",null,"Runtime initialization: This is when the system initializes your Objective-C and Swift runtimes and invokes all class static load methods."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Don't use static initialization. If you own a framework which uses static initialization, consider exposing API to initialize your stack early."),(0,n.kt)("li",{parentName:"ul"},"Reduce impact to launch by avoiding ",(0,n.kt)("inlineCode",{parentName:"li"},"+[Class load]"),"."),(0,n.kt)("li",{parentName:"ul"},"Use ",(0,n.kt)("inlineCode",{parentName:"li"},"+[Class initialize]")," to lazily conduct static initialization.")),(0,n.kt)("p",null,"UIKit Initialization: This is when the system instantiates your ",(0,n.kt)("inlineCode",{parentName:"p"},"UIApplication")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"UIApplicationDelegate"),"."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Minimize work in ",(0,n.kt)("inlineCode",{parentName:"li"},"UIApplication")," subclass"),(0,n.kt)("li",{parentName:"ul"},"Minimize work in ",(0,n.kt)("inlineCode",{parentName:"li"},"UIApplicationDelegate")," initialization")),(0,n.kt)("p",null,"Application Initialization: This is where you get callbacks of the delegate methods."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img",src:a(49468).Z,width:"2560",height:"473"})),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"You should be deferring any unrelated work not necessary to commit your first frame, by either pushing it to the background queues or just doing it later entirely."),(0,n.kt)("li",{parentName:"ul"},"If you did adopt ",(0,n.kt)("inlineCode",{parentName:"li"},"UIScene"),", make sure that you're sharing resources between scenes.")),(0,n.kt)("p",null,"First Frame Render: Creates, performs layout for, and draws views. ",(0,n.kt)("inlineCode",{parentName:"p"},"loadView"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"viewDidLoad"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"layoutSubviews"),"."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Flatten view hierarchies and lazily load views"),(0,n.kt)("li",{parentName:"ul"},"Optimize auto layout usage, reduce the number of constraints you're using")),(0,n.kt)("p",null,"Extended phase: This is the app-specific period from the first frame to the final frame. To displays asynchronously loaded data."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Leverage ",(0,n.kt)("inlineCode",{parentName:"li"},"os_signpost")," to measure work")),(0,n.kt)("p",null,"In summary: ",(0,n.kt)("strong",{parentName:"p"},"Minimize, Prioritize, Optimize"),"."),(0,n.kt)("h2",{id:"xctest-metrics"},"XCTest Metrics"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2019/417/"},"WWDC 2019 - Improving Battery Life and Performance")),(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2019/423/"},"WWDC 2019 - Optimizing App Launch"))),(0,n.kt)("p",null,"Utilize the new XCTest app launch measurements on a variety of devices and possibly integrate this with ",(0,n.kt)("strong",{parentName:"p"},"continuous integration"),"."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-swift"},'func testApplicationLaunchTime() {\n    measure(metrics: [.applicationLaunch]) {\n        XCUIApplication(bundleIdentifier: "com.yianzhou.demo").launch()\n    }\n}\n')),(0,n.kt)("h2",{id:"\u5b9e\u6218"},"\u5b9e\u6218"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"main")," \u51fd\u6570\u6267\u884c\u540e\uff1a\u6307\u7684\u662f\u4ece ",(0,n.kt)("inlineCode",{parentName:"p"},"main")," \u51fd\u6570\u6267\u884c\u5f00\u59cb\uff0c\u5230 ",(0,n.kt)("inlineCode",{parentName:"p"},"application(_:didFinishLaunchingWithOptions:)")," \u65b9\u6cd5\u91cc\u9996\u5c4f\u6e32\u67d3\u76f8\u5173\u65b9\u6cd5\u6267\u884c\u5b8c\u6210\u3002\u4e3b\u8981\u5305\u62ec\u4e86\uff1a\u9996\u5c4f\u521d\u59cb\u5316\u6240\u9700\u914d\u7f6e\u6587\u4ef6\u7684\u8bfb\u5199\u64cd\u4f5c\u3001\u9996\u5c4f\u6570\u636e\u6a21\u578b\u7684\u8bfb\u53d6\u3001\u9996\u5c4f\u6e32\u67d3\u7684\u8ba1\u7b97\u7b49\u3002\u4f18\u5316\u65b9\u5f0f\u662f\uff0c\u6392\u67e5\u4e1a\u52a1\u4ee3\u7801\uff0c\u4e0e\u9996\u5c4f\u6e32\u67d3\u65e0\u5173\u7684\u4ee3\u7801\u5168\u90e8\u5ef6\u540e\u6267\u884c\uff0c\u4f8b\u5982\u7c7b\u7684\u521d\u59cb\u5316\u3001\u76d1\u542c\u6ce8\u518c\u7b49\uff1b\u9996\u5c4f\u89c6\u56fe\u6839\u636e\u529f\u80fd\u903b\u8f91\uff0c\u6682\u65f6\u4e0d\u9700\u663e\u793a\u7684\u91c7\u7528\u61d2\u52a0\u8f7d\uff1b\u6d89\u53ca\u6587\u4ef6\u6216\u8def\u5f84\u7684\u64cd\u4f5c\uff0c\u5982\u68c0\u67e5\u6587\u4ef6\u5939\u662f\u5426\u5b58\u5728\uff0c\u65b0\u5efa\u3001\u590d\u5236\u3001\u79fb\u52a8\u3001\u5220\u9664\u6587\u4ef6\u7b49\u7b49\u64cd\u4f5c\uff0c\u4e0d\u8981\u653e\u5728\u4e3b\u7ebf\u7a0b\u3002"),(0,n.kt)("p",null,"\u9996\u5c4f\u6e32\u67d3\u5b8c\u6210\u540e\uff1a\u4ece\u51fd\u6570\u4e0a\u6765\u770b\uff0c\u8fd9\u4e2a\u9636\u6bb5\u6307\u7684\u662f ",(0,n.kt)("inlineCode",{parentName:"p"},"application(_:didFinishLaunchingWithOptions:)")," \u65b9\u6cd5\u4f5c\u7528\u57df\u5185\uff0c\u6267\u884c\u9996\u5c4f\u6e32\u67d3\u4e4b\u540e\u7684\u6240\u6709\u65b9\u6cd5\u6267\u884c\u5b8c\u6210\u3002\u8fd9\u4e2a\u9636\u6bb5\u7528\u6237\u5df2\u7ecf\u80fd\u591f\u770b\u5230 App \u7684\u9996\u9875\u4e86\uff0c\u6240\u4ee5\u4f18\u5316\u7684\u4f18\u5148\u7ea7\u6392\u5728\u6700\u540e\u3002\u4f46\u662f\uff0c\u90a3\u4e9b\u4f1a\u5361\u4f4f\u4e3b\u7ebf\u7a0b\u7684\u65b9\u6cd5\u8fd8\u662f\u9700\u8981\u6700\u4f18\u5148\u5904\u7406\u7684\uff0c\u4e0d\u7136\u8fd8\u662f\u4f1a\u5f71\u54cd\u5230\u7528\u6237\u7684\u4ea4\u4e92\u3002"),(0,n.kt)("h2",{id:"\u4e8c\u8fdb\u5236\u91cd\u6392"},"\u4e8c\u8fdb\u5236\u91cd\u6392"),(0,n.kt)("p",null,"\u4f20\u7edf\u7684\u542f\u52a8\u4f18\u5316\u662f\u57fa\u4e8e\u51cf\u5c11\u4e0d\u5fc5\u8981\u4ee3\u7801\u3001\u61d2\u52a0\u8f7d\u3001\u5229\u7528\u591a\u7ebf\u7a0b\u3001\u5ef6\u540e\u6267\u884c\u4e0e\u9996\u5c4f\u6e32\u67d3\u65e0\u5173\u7684\u4ee3\u7801\u6765\u505a\u7684\uff0c\u4e3b\u8981\u662f\u4ece\u51cf\u5c11\u4e3b\u7ebf\u7a0b\u4efb\u52a1\u7684\u89d2\u5ea6\u6765\u51fa\u53d1\uff0c\u6b64\u7c7b\u76f8\u5173\u4f18\u5316\u7684\u7b56\u7565\u5df2\u7ecf\u5f88\u666e\u904d\u4e86\uff0c\u5f88\u96be\u518d\u505a\u51fa\u5927\u7684\u63d0\u5347\u3002\u4eca\u5929\uff0c\u6211\u4eec\u4ece\u53e6\u4e00\u4e2a\u89d2\u5ea6\u53bb\u601d\u8003\u542f\u52a8\u4f18\u5316\u2014\u2014\u5185\u5b58\u52a0\u8f7d\u673a\u5236\u3002"),(0,n.kt)("p",null,"APP \u542f\u52a8\u65f6\uff0cdyld \u4f1a\u628a\u7a0b\u5e8f\u7684\u4e8c\u8fdb\u5236 mmap \u5230\u865a\u62df\u5185\u5b58\u91cc\uff0c\u5f53\u6267\u884c\u4ee3\u7801\u9700\u8981\u4f7f\u7528\u5230\u5177\u4f53\u7684\u7269\u7406\u5185\u5b58\u65f6\uff0c\u518d\u901a\u8fc7 page fault \u89e6\u53d1\u7269\u7406\u5185\u5b58\u52a0\u8f7d\uff0c\u7136\u540e\u624d\u80fd\u8bbf\u95ee\u3002"),(0,n.kt)("p",null,"page fault \u5728\u8f83\u5dee\u7684\u60c5\u51b5\u4e0b\u8017\u65f6\u8d85\u8fc7 1ms\uff0c\u5728\u8f83\u6b63\u5e38\u7684\u60c5\u51b5\u4e0b\u4e5f\u8981\u8017\u65f6 0.3-0.6ms \u5de6\u53f3\u3002\u90a3\u4e48 App \u542f\u52a8\u671f\u95f4\u5927\u6982\u9700\u8981\u53d1\u751f\u591a\u5c11\u6b21 page fault \u5462\uff1f\u5728\u6211\u4eec\u5e94\u7528\u4e2d\u7684\u6570\u636e\u5982\u4e0b\uff1a\u4e00\u6b21\u51b7\u542f\u52a8\u89e6\u53d1\u4e86 2000 \u591a\u6b21 page fault\uff0c\u603b\u8017\u65f6\u8fbe\u5230\u4e86 300+ms\u3002(Instruments - System Trace - Virtual Memory Trace - File Backed Page In)"),(0,n.kt)("p",null,"\u5982\u679c\u6211\u4eec\u80fd\u8ba9\u542f\u52a8\u671f\u95f4\u9700\u8981\u6267\u884c\u7684\u6307\u4ee4\uff0c\u90fd\u7d27\u51d1\u5730\u6392\u5217\u5728\u76f8\u90bb\u7684\u5185\u5b58\u5206\u9875\uff0c\u90a3\u4e48\u5c31\u80fd\u5c3d\u53ef\u80fd\u5730\u51cf\u5c11 page fault \u7684\u6b21\u6570\uff0c\u8fd9\u5c31\u662f\u4e8c\u8fdb\u5236\u91cd\u6392\u7684\u76ee\u7684\u3002"),(0,n.kt)("p",null,"Xcode \u5bf9\u4e8c\u8fdb\u5236\u91cd\u6392\u63d0\u4f9b\u4e86\u652f\u6301\uff0c\u53ea\u9700\u8981\u5728\u7f16\u8bd1\u8bbe\u7f6e\u91cc\u6307\u5b9a\u4e00\u4e2a Order File \u5373\u53ef (Build Settings - Linking - Order File)\uff0c\u4f8b\u5982 objc \u7684\u6e90\u7801\u5c31\u4f7f\u7528\u4e86\u8fd9\u9879\u6280\u672f\uff08\u6e90\u7801\u6587\u4ef6\u5939\u4e0b\u7684 libobjc.order \u6587\u4ef6\uff09\u3002\u7f16\u8bd1\u5668\u4f1a\u6309\u7167\u8fd9\u4e2a\u6587\u4ef6\u6307\u5b9a\u7684\u7b26\u53f7\u987a\u5e8f\u6765\u6392\u5217\u4e8c\u8fdb\u5236\u4ee3\u7801\u6bb5\uff0c\u8fbe\u5230\u4f18\u5316\u7684\u76ee\u7684\u3002"))}c.isMDXComponent=!0},7138:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/0cd353b5-de0f-4150-88d1-d8ce30f960b4-9f0605eee734eabaead576353fae86d5.png"},96693:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/3def0897-d699-4017-8410-b9bd7676c6b4-92ceff050284c1fd75dbf8bd06b5ae60.png"},13947:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/45cd0914-f19b-4404-a5ea-05fd3c3963f3-fac2c9a2ac65a606c5b439bc02435e10.png"},80502:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/59ab22bd-6bf5-47b8-a758-0f54334aa35c-14b30ca78a805a96a5ae6585e0aff8b3.png"},43394:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/c603c294-5ef9-4077-baa2-013f7d9d439c-dc18217288f989c4cf46ae2622342082.png"},49468:(e,t,a)=>{a.d(t,{Z:()=>i});const i=a.p+"assets/images/d3ddf60d-93c9-4b23-9eb2-ef64298eccf7-da1be2e9df2d56fdf08b446f3c0d6a21.png"}}]);