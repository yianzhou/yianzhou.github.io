"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7950],{43068:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=n(87462),i=(n(67294),n(3905));n(61839);const o={},l="\u591a\u7ebf\u7a0b",r={unversionedId:"\u5e95\u5c42\u539f\u7406/multithread",id:"\u5e95\u5c42\u539f\u7406/multithread",title:"\u591a\u7ebf\u7a0b",description:"Parallelism and Concurrency",source:"@site/docs/apple/\u5e95\u5c42\u539f\u7406/multithread.md",sourceDirName:"\u5e95\u5c42\u539f\u7406",slug:"/\u5e95\u5c42\u539f\u7406/multithread",permalink:"/docs/apple/\u5e95\u5c42\u539f\u7406/multithread",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/\u5e95\u5c42\u539f\u7406/multithread.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5185\u5b58\u4f18\u5316",permalink:"/docs/apple/\u5e95\u5c42\u539f\u7406/memory"},next:{title:"\u6027\u80fd\u4f18\u5316",permalink:"/docs/apple/\u5e95\u5c42\u539f\u7406/performance"}},s={},p=[{value:"Parallelism and Concurrency",id:"parallelism-and-concurrency",level:2},{value:"Context Switching",id:"context-switching",level:3},{value:"Lock Contention",id:"lock-contention",level:3},{value:"Target Queue Hirerachy",id:"target-queue-hirerachy",level:3},{value:"Operation",id:"operation",level:2},{value:"Synchronization",id:"synchronization",level:2},{value:"\u516c\u5e73\u9501\u4e0e\u975e\u516c\u5e73\u9501",id:"\u516c\u5e73\u9501\u4e0e\u975e\u516c\u5e73\u9501",level:3},{value:"os_unfair_lock",id:"os_unfair_lock",level:3},{value:"\u4e92\u65a5\u9501",id:"\u4e92\u65a5\u9501",level:3},{value:"\u4fe1\u53f7\u91cf",id:"\u4fe1\u53f7\u91cf",level:3},{value:"OSSpinLock (deprecated)",id:"osspinlock-deprecated",level:3},{value:"\u539f\u5b50\u64cd\u4f5c",id:"\u539f\u5b50\u64cd\u4f5c",level:2},{value:"IPC \u8de8\u8fdb\u7a0b\u901a\u4fe1",id:"ipc-\u8de8\u8fdb\u7a0b\u901a\u4fe1",level:2},{value:"\u6b7b\u9501",id:"\u6b7b\u9501",level:2},{value:"\u5355\u4f8b\u4e0e\u7ebf\u7a0b\u5b89\u5168",id:"\u5355\u4f8b\u4e0e\u7ebf\u7a0b\u5b89\u5168",level:2}],c={toc:p};function u(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u591a\u7ebf\u7a0b"},"\u591a\u7ebf\u7a0b"),(0,i.kt)("h2",{id:"parallelism-and-concurrency"},"Parallelism and Concurrency"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2017/706"},"WWDC 2017 - Modernizing Grand Central Dispatch Usage"))),(0,i.kt)("p",null,"Concurrency \u5e76\u53d1: A condition that exists when at least two threads are making progress. Single-core devices can achieve concurrency through time-slicing."),(0,i.kt)("p",null,"Parallelism \u5e76\u884c: A condition that arises when at least two threads are executing simultaneously. Multi-core devices execute multiple threads at the same time via parallelism."),(0,i.kt)("p",null,"Efficient parallel for-loop doing parallel computation across all CPU cores:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Objective-C: ",(0,i.kt)("a",{parentName:"p",href:"https://developer.apple.com/documentation/dispatch/1453050-dispatch_apply"},(0,i.kt)("inlineCode",{parentName:"a"},"dispatch_apply(DISPATCH_APPLY_AUTO, 1000, ^(size_t) { ... }")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Swift: ",(0,i.kt)("a",{parentName:"p",href:"https://developer.apple.com/documentation/dispatch/dispatchqueue/2016088-concurrentperform"},(0,i.kt)("inlineCode",{parentName:"a"},"DispatchQueue.concurrentPerform(1000) { i in ... }"))))),(0,i.kt)("h3",{id:"context-switching"},"Context Switching"),(0,i.kt)("p",null,"A context switch is when the CPU switches between these different subsystems or threads that make up your application."),(0,i.kt)("p",null,"Let's image that we only have one CPU remaining, the others are busy for some reason. At any time only one threads can run on that CPU. When the user touches the app, because the database is run off the main thread, the OS can immediately switch the CPU to work on the main thread, so it can respond immediately to the user without having to wait for the database thread to complete. When the user interface is done responding, the CPU can then switch back to the database thread, and then finish the networking task as well. These white lines below show the context switches."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(90385).Z,width:"1924",height:"1142"})),(0,i.kt)("p",null,"Context switches might happen when:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A higher priority thread needs the CPU"),(0,i.kt)("li",{parentName:"ul"},"A thread finishes its current work"),(0,i.kt)("li",{parentName:"ul"},"Waiting to acquire a resource"),(0,i.kt)("li",{parentName:"ul"},"Waiting for an asynchronous request to complete")),(0,i.kt)("p",null,"Excessive Context Switching: Context switch is good thing, it's where the power of concurrency comes from. However, if you're doing this thousands of times in really rapid succession, the costs start to add up and you run into trouble."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Lock Contention: See below."),(0,i.kt)("li",{parentName:"ul"},"Having too many serial queue: See below."),(0,i.kt)("li",{parentName:"ul"},"Too many thread-blocking work items submiited to concurrent queue:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Do not block thread;"),(0,i.kt)("li",{parentName:"ul"},"Choose the right amount of concurrency in your application;"),(0,i.kt)("li",{parentName:"ul"},"Size your work items appropriately.")))),(0,i.kt)("p",null,"Debug tool: Instruments - Template: Blank - Add Library: GCD Performance."),(0,i.kt)("h3",{id:"lock-contention"},"Lock Contention"),(0,i.kt)("p",null,"The primary case of excessive context switching is ",(0,i.kt)("strong",{parentName:"p"},"lock contention"),", that happens when you have a lock and a bunch of threads are all trying to acquire that lock."),(0,i.kt)("p",null,"Let's see a ",(0,i.kt)("strong",{parentName:"p"},"fair lock")," case. Here we're focusing on two threads, and we have a CPU on top. We've added a lock track view that shows the state of the lock and what thread owns it."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(54556).Z,width:"2362",height:"1428"})),(0,i.kt)("p",null,"At the beginninbg, the blue thread owns the lock, and the green thread is waiting. Then, when the blue thread unlocks, the ownership of that lock is transferred to the green thread, because it's next in line, However, the CPU is still running the blue thread, and suppose, the blue thread grabs the lock again, it can't because the lock is ",(0,i.kt)("strong",{parentName:"p"},"reserved")," for the green thread. It forces a context switch at this point to the green thread."),(0,i.kt)("p",null,"The fair lock is useful. You want every thread that's waiting on the lock to get a chance to acquire the resource."),(0,i.kt)("p",null,"And the ",(0,i.kt)("strong",{parentName:"p"},"unfair lock")," case. This time, when blue thread unlocks, the lock isn't reserved. The ownership of the lock is up for grabs. Blue can take the lock again, and it can immediately reacquire and stay on CPU without forcing a context switch."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(19409).Z,width:"2362",height:"1418"})),(0,i.kt)("p",null,"This might make it difficult for the green thread to actually get a chance at the lock, but it reduces the number of context switches the blue thread has to have in order to reacquire the lock."),(0,i.kt)("p",null,'You actually need to measure your application in "Instruments - System Trace" and see if you have an excessive context switching issue. If you do, often the unfair lock works best for these cases.'),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(17107).Z,width:"2560",height:"657"})),(0,i.kt)("p",null,"As you see the lock track view above, the runtime actually knows which thread will unlock the lock next. We can take advantage of that power to automatically resolve ",(0,i.kt)("strong",{parentName:"p"},"priority inversions")," between the waiters and the owners of the lock, and even enable other optimizations, like directed CPU handoff to the owning thread. Primitives with a single known owner have this power, but the others don't have."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(31722).Z,width:"2560",height:"813"})),(0,i.kt)("p",null,"So when you're picking a primitive (lock), consider whether or not your use case involves threads of different priorities interacting, like a high priority UI thread with a lower priority background thread. If so, you might want to take advantage of a primitive with ownership that ensures that your UI thread doesn't get delayed by waiting on a lower priority background thread."),(0,i.kt)("h3",{id:"target-queue-hirerachy"},"Target Queue Hirerachy"),(0,i.kt)("p",null,"Set your serial queues targeting one queue per subsystem, use a fixed number of serial queue hierarchies."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(74148).Z,width:"2560",height:"1059"})),(0,i.kt)("p",null,"We have completely reinvented the internals of GCD this year to eliminate some unwanted context switches and execute single queue hierarchies on the single thread. You, as the developer, need to ",(0,i.kt)("strong",{parentName:"p"},"protect the target queue hierarchy")," so your code can be benefited from these optimizations."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(49944).Z,width:"2540",height:"1374"})),(0,i.kt)("h2",{id:"operation"},"Operation"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"https://developer.apple.com/videos/play/wwdc2015/226/"},"WWDC 2015 - Advanced NSOperations"))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"OperationQueue"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"High-level ",(0,i.kt)("inlineCode",{parentName:"li"},"dispatch_queue_t")),(0,i.kt)("li",{parentName:"ul"},"Cancellation"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"maxConcurrentOperationCount"),", 1 means ",(0,i.kt)("strong",{parentName:"li"},"serial queue"))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"High-level ",(0,i.kt)("inlineCode",{parentName:"li"},"dispatch_block_t")),(0,i.kt)("li",{parentName:"ul"},"Long-running task"),(0,i.kt)("li",{parentName:"ul"},"Subclassable")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"@property(readonly, getter=isCancelled) BOOL cancelled;")," Cancellation on ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation")," only flipped the boolean value of ",(0,i.kt)("inlineCode",{parentName:"p"},"cancelled"),". So as you subclass ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation"),", it is up to you to decide what it means for your ",(0,i.kt)("inlineCode",{parentName:"p"},"Operation")," to be canceled."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"@property(readonly, getter=isReady) BOOL ready;")," By default, an operation will become ready if all of its ",(0,i.kt)("strong",{parentName:"p"},"dependencies")," have finished executing. If you have two operation queues in your application, operations in the first queue can be dependent on the operations in the second queue. \u5148\u8fdb\u5165 ready \u72b6\u6001\u7684\u4efb\u52a1\u5148\u51fa\u5217\u6267\u884c\u3001\u4e0d\u7ba1\u5176\u5728\u961f\u5217\u4e2d\u7684\u54ea\u4e2a\u4f4d\u7f6e\u3002",(0,i.kt)("inlineCode",{parentName:"p"},"OperationQueue")," \u5e76\u4e0d\u662f FIFO \u7684\u961f\u5217\uff01"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(45653).Z,width:"2560",height:"1286"})),(0,i.kt)("p",null,"Use operations to ",(0,i.kt)("strong",{parentName:"p"},"abstract the logic")," in your app. By putting your logic inside of operations, it becomes very easy to change it later. Use ",(0,i.kt)("strong",{parentName:"p"},"dependencies")," to express the relationships between your operations. Next, operations allow you to describe complex behaviors, such as ",(0,i.kt)("strong",{parentName:"p"},"mutual exclusivity")," or ",(0,i.kt)("strong",{parentName:"p"},"composition"),"."),(0,i.kt)("h2",{id:"synchronization"},"Synchronization"),(0,i.kt)("p",null,"\u591a\u4e2a\u8fdb\u7a0b\u540c\u65f6\u64cd\u4f5c\u540c\u4e00\u4efd\u6570\u636e\u3001\u5e76\u4e14\u6267\u884c\u7ed3\u679c\u53d6\u51b3\u4e8e\u64cd\u4f5c\u53d1\u751f\u7684\u7279\u5b9a\u987a\u5e8f\u7684\u60c5\u51b5\uff0c\u79f0\u4e3a",(0,i.kt)("strong",{parentName:"p"},"\u7ade\u4e89\u60c5\u51b5")," (race condition)\u3002\u4e3a\u4e86\u9632\u6b62\u51fa\u73b0\u7ade\u4e89\u60c5\u51b5\uff0c\u6211\u4eec\u8981\u6c42\u4ee5\u67d0\u79cd\u65b9\u5f0f\u540c\u6b65 (synchronized) \u8fdb\u7a0b\u3002"),(0,i.kt)("p",null,"\u6bcf\u4e2a\u7ebf\u7a0b\u4f1a\u6709\u81ea\u5df1\u7684\u6808\u5185\u5b58\u7a7a\u95f4\uff0c\u6808\u7a7a\u95f4\u76f8\u4e92\u9694\u79bb\u3001\u4e92\u4e0d\u5f71\u54cd\uff1b\u4f46\u6709\u65f6\u591a\u4e2a\u7ebf\u7a0b\u8981\u8bbf\u95ee\u5230\u5171\u4eab\u7684\u5806\u533a\u5185\u5b58\uff0c\u6b64\u65f6\u5982\u679c\u4e0d\u8fdb\u884c\u540c\u6b65\uff0c\u5c31\u4f1a\u51fa\u73b0\u5185\u5b58\u4e0d\u4e00\u81f4\u95ee\u9898\u3002\u8bbe\u60f3\u8fd9\u6837\u4e00\u4e2a\u573a\u666f\uff0c\u7528\u6237\u7684\u94f6\u884c\u8d26\u6237\u91cc\u6709 100 \u5143\uff0c\u6b64\u65f6\u6709 3 \u4e2a\u67dc\u5458\u673a\u540c\u65f6\u8fdb\u884c\u5b58\u3001\u53d6\u3001\u67e5\u64cd\u4f5c\uff0c\u5b83\u4eec\u4e4b\u95f4\u5c31\u9700\u8981\u8fdb\u884c\u540c\u6b65\u3002"),(0,i.kt)("p",null,"\u7a0b\u5e8f\u53ef\u4ee5\u58f0\u660e\u79f0\u4e3a\u4e34\u754c\u533a (critical section) \u7684\u4ee3\u7801\u3002\u5728\u4e34\u754c\u533a\u4e2d\uff0c\u7ebf\u7a0b\u53ef\u80fd\u6b63\u5728\u8bbf\u95ee\u6216\u66f4\u65b0\u4e0e\u81f3\u5c11\u4e00\u4e2a\u5176\u4ed6\u7ebf\u7a0b\u5171\u4eab\u7684\u6570\u636e\u3002\u5f53\u4e00\u4e2a\u7ebf\u7a0b\u5728\u4e34\u754c\u533a\u6267\u884c\u65f6\uff0c\u4e0d\u5141\u8bb8\u5176\u4ed6\u7ebf\u7a0b\u5728\u4e34\u754c\u533a\u6267\u884c\u3002\u591a\u4e2a\u7ebf\u7a0b\u5fc5\u987b\u4e92\u65a5\u5730\u5bf9\u4e34\u754c\u8d44\u6e90\u8fdb\u884c\u8bbf\u95ee\u3002"),(0,i.kt)("h3",{id:"\u516c\u5e73\u9501\u4e0e\u975e\u516c\u5e73\u9501"},"\u516c\u5e73\u9501\u4e0e\u975e\u516c\u5e73\u9501"),(0,i.kt)("p",null,"\u591a\u4e2a\u7ebf\u7a0b\u540c\u65f6\u5230\u8fbe\u4e34\u754c\u533a\uff0c\u5148\u5230\u7684\u7ebf\u7a0b\u4f1a\u83b7\u5f97\u9501\uff0c\u540e\u5230\u7684\u7ebf\u7a0b\u4f1a\u5728\u4e00\u4e2a FIFO \u961f\u5217\u91cc\u7b49\u5f85\u3002"),(0,i.kt)("p",null,"\u516c\u5e73\u9501\uff1a\u5728\u7ade\u4e89\u60c5\u51b5\u4e0b\uff0c\u9501\u88ab\u91ca\u653e\u540e\uff0c\u5373\u88ab\u7b49\u5f85\u961f\u5217\u5934\u90e8\u7684\u7ebf\u7a0b\u4fdd\u7559\u3002\u4f18\u70b9\u662f\u6bcf\u4e2a\u7ebf\u7a0b\u90fd\u6709\u673a\u4f1a\u5f97\u5230\u9501\uff0c\u4e0d\u4f1a\u997f\u6b7b\uff1b\u7f3a\u70b9\u662f\u7531\u4e8e\u4e0a\u4e0b\u6587\u5207\u6362\u6b21\u6570\u66f4\u591a\u3001\u76f8\u5bf9\u6765\u8bf4\u541e\u5410\u91cf\u6ca1\u6709\u975e\u516c\u5e73\u9501\u5927\u3002"),(0,i.kt)("p",null,"\u975e\u516c\u5e73\u9501\uff1a\u5728\u7ade\u4e89\u60c5\u51b5\u4e0b\uff0c\u9501\u88ab\u91ca\u653e\u540e\u4e0d\u4f1a\u88ab\u4fdd\u7559\uff0c\u65e0\u987b\u8003\u8651\u7b49\u5f85\u961f\u5217\u91cc\u7684\u7ebf\u7a0b\u3002\u4f18\u70b9\u662f\u63d0\u9ad8\u4e86\u91cd\u83b7\u9501\u7684\u6548\u7387\u548c\u6574\u4f53\u7684\u541e\u5410\u91cf\uff1b\u7f3a\u70b9\u662f\u53ef\u80fd\u5bfc\u81f4\u522b\u7684\u7ebf\u7a0b\u4e00\u76f4\u83b7\u53d6\u4e0d\u5230\u9501\u3001\u751a\u81f3\u997f\u6b7b\u3002"),(0,i.kt)("p",null,"iOS \u4e2d\u65e5\u5e38\u4f7f\u7528\u5230\u7684\u9501\uff0c\u9664\u4e86 ",(0,i.kt)("inlineCode",{parentName:"p"},"os_unfair_lock")," \u662f\u975e\u516c\u5e73\u9501\uff0c\u5176\u4f59\u90fd\u662f\u516c\u5e73\u9501\u3002"),(0,i.kt)("p",null,"\u4e3a\u4ec0\u4e48\u8981\u8fdb\u5165\u961f\u5217\u7b49\u5f85\u5462\uff1f\u4e00\u76f4\u5c1d\u8bd5\u83b7\u53d6\u9501\u53ef\u4ee5\u5417\uff1f\u2014\u2014\u53ef\u4ee5\uff0c\u4e00\u76f4\u5c1d\u8bd5\u83b7\u53d6\u7684\u53eb\u81ea\u65cb\u9501\uff0c\u4e0e\u4e92\u65a5\u9501\u7c7b\u4f3c\uff0c\u53ea\u662f\u81ea\u65cb\u9501\u88ab\u67d0\u7ebf\u7a0b\u5360\u7528\u65f6\uff0c\u5176\u4ed6\u7ebf\u7a0b\u4e0d\u4f1a\u6302\u8d77\uff0c\u800c\u662f\u4e00\u76f4\u8fd0\u884c\uff08\u81ea\u65cb/\u7a7a\u8f6c\uff09\u76f4\u5230\u9501\u88ab\u91ca\u653e\u3002\u7531\u4e8e\u4e0d\u6d89\u53ca\u7528\u6237\u6001\u4e0e\u5185\u6838\u6001\u4e4b\u95f4\u7684\u5207\u6362\uff0c\u5b83\u7684\u6548\u7387\u9ad8\u4e8e\u4e92\u65a5\u9501\u3002\u4f46\u76f8\u5e94\u5730\uff0c\u4f1a\u4e00\u76f4\u5360\u7528 CPU\uff0c\u5982\u679c\u4e0d\u80fd\u5728\u5f88\u77ed\u7684\u65f6\u95f4\u5185\u83b7\u5f97\u9501\uff0c\u65e0\u7591\u4f1a\u4f7f CPU \u6574\u4f53\u6548\u7387\u964d\u4f4e\u3002"),(0,i.kt)("p",null,"\u975e\u516c\u5e73\u9501/\u81ea\u65cb\u9501\u9002\u7528\u4e8e\uff1a\u9884\u8ba1\u4e34\u754c\u533a\u6267\u884c\u7684\u65f6\u95f4\u5f88\u77ed\uff0c\u7b49\u5f85\u7684\u7ebf\u7a0b\u80fd\u5f88\u5feb\u83b7\u5f97\u9501\uff1b\u4e34\u754c\u533a\u7684\u4ee3\u7801\u7ecf\u5e38\u88ab\u8c03\u7528\uff0c\u4f46\u7ade\u4e89\u60c5\u51b5\u5f88\u5c11\u53d1\u751f\u3002"),(0,i.kt)("p",null,"\u516c\u5e73\u9501/\u4e92\u65a5\u9501\u9002\u7528\u4e8e\uff1a\u9884\u8ba1\u4e34\u754c\u533a\u6267\u884c\u7684\u65f6\u95f4\u8f83\u957f\uff0c\u7ebf\u7a0b\u7b49\u5f85\u9501\u7684\u65f6\u95f4\u8f83\u957f\uff1b\u4e34\u754c\u533a\u7ade\u4e89\u60c5\u51b5\u7ecf\u5e38\u53d1\u751f\u3002"),(0,i.kt)("h3",{id:"os_unfair_lock"},"os_unfair_lock"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},'#import <os/lock.h>\nos_unfair_lock lock = OS_UNFAIR_LOCK_INIT;\nos_unfair_lock_lock(&lock); // \u52a0\u9501\u548c\u89e3\u9501\u5fc5\u987b\u5bf9\u79f0\uff0c\u91cd\u590d\u52a0\u9501\u4f1a\u76f4\u63a5\u5d29\u6e83\uff01\nNSLog(@"safe here ...");\nos_unfair_lock_unlock(&lock);\n')),(0,i.kt)("p",null,"A lock must be unlocked only from the same thread in which it was locked. Attempting to unlock from a different thread causes a runtime error."),(0,i.kt)("p",null,"This is a replacement for the deprecated ",(0,i.kt)("inlineCode",{parentName:"p"},"OSSpinLock"),". This function doesn't spin on contention, but instead waits in the kernel to be awoken by an unlock. Like ",(0,i.kt)("inlineCode",{parentName:"p"},"OSSpinLock"),", this function does not enforce fairness or lock ordering\u2014for example, an unlocker could potentially reacquire the lock immediately, before an awoken waiter gets an opportunity to attempt to acquire the lock. This may be advantageous for performance reasons, but also makes starvation of waiters a possibility."),(0,i.kt)("h3",{id:"\u4e92\u65a5\u9501"},"\u4e92\u65a5\u9501"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"pthread_mutex_t"),"\uff0cpthread \u4e2d\u7684\u4e92\u65a5\u9501\uff0c\u5177\u6709\u8de8\u5e73\u53f0\u6027\u8d28\uff0c\u6709\u666e\u901a\u9501\u3001\u68c0\u9519\u9501\u3001\u9012\u5f52\u9501\u4e09\u79cd\u3002\u5f53\u9501\u5904\u4e8e\u5360\u7528\u72b6\u6001\u65f6\uff0c\u5176\u4ed6\u7ebf\u7a0b\u4f1a\u6302\u8d77\uff1b\u5f53\u9501\u88ab\u91ca\u653e\u65f6\uff0c\u6240\u6709\u7b49\u5f85\u7684\u7ebf\u7a0b\u90fd\u5c06\u88ab\u5524\u9192\uff0c\u518d\u6b21\u5bf9\u9501\u8fdb\u884c\u7ade\u4e89\u3002\u5728\u6302\u8d77\u4e0e\u5524\u9192\u8fc7\u7a0b\u4e2d\uff0c\u6d89\u53ca\u7528\u6237\u6001\u4e0e\u5185\u6838\u6001\u4e4b\u95f4\u7684\u4e0a\u4e0b\u6587\u5207\u6362\uff0c\u8fd9\u79cd\u5207\u6362\u662f\u6bd4\u8f83\u6d88\u8017\u6027\u80fd\u7684\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"NSLock")," \u662f\u5bf9 ",(0,i.kt)("inlineCode",{parentName:"p"},"pthread_mutex_lock")," \u7684\u5c01\u88c5\uff0c\u662f\u666e\u901a\u7c7b\u578b\u7684\u4e92\u65a5\u9501\uff1b\u5982\u679c\u7528\u5728\u9700\u8981\u9012\u5f52\u5d4c\u5957\u52a0\u9501\u7684\u573a\u666f\u65f6\uff0c\u9700\u8981\u4f7f\u7528\u5176\u5b50\u7c7b ",(0,i.kt)("inlineCode",{parentName:"p"},"NSRecursiveLock"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"@synchronized")," \u662f\u5bf9 ",(0,i.kt)("inlineCode",{parentName:"p"},"pthread_mutex_t")," \u7684\u5c01\u88c5\uff0c\u662f\u9012\u5f52\u7c7b\u578b\u7684\u4e92\u65a5\u9501\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},"@synchronized (self) {\n    callbacks = [[self.callbackBlocks valueForKey:key] mutableCopy];\n}\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"pthread_rwlock_t")," \u8bfb\u5199\u9501\u662f\u7528\u4e8e\u201c\u591a\u7ebf\u7a0b\u8bfb\u3001\u5355\u7ebf\u7a0b\u5199\u201d\u8fd9\u4e00\u79cd\u8bfb\u5199\u4e92\u65a5\u7684\u573a\u666f\uff0c\u8bfb\u64cd\u4f5c\u53ef\u5e76\u53d1\u91cd\u5165\uff0c\u5199\u64cd\u4f5c\u662f\u4e92\u65a5\u7684\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},"#import <pthread/pthread.h>\n\n- (instancetype)init {\n    self = [super init];\n    if (self) {\n        pthread_rwlock_init(&_lock, nil);\n    }\n    return self;\n}\n\n- (void)queryMoney {\n    pthread_rwlock_rdlock(&_lock);\n    [super queryMoney];\n    pthread_rwlock_unlock(&_lock);\n}\n\n- (void)saveMoney {\n    pthread_rwlock_wrlock(&_lock);\n    [super saveMoney];\n    pthread_rwlock_unlock(&_lock);\n}\n")),(0,i.kt)("h3",{id:"\u4fe1\u53f7\u91cf"},"\u4fe1\u53f7\u91cf"),(0,i.kt)("p",null,"\u4fe1\u53f7\u91cf\u4e3b\u8981\u7528\u4e8e\u63a7\u5236\u4e34\u754c\u533a\u7684\u8d44\u6e90\u6700\u591a\u53ef\u4ee5\u88ab\u591a\u5c11\u4e2a\u7ebf\u7a0b\u5e76\u53d1\u8bbf\u95ee\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},'dispatch_semaphore_t lock = dispatch_semaphore_create(1);\ndispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER); // \u7b49\u5f85\u548c\u53d1\u51fa\u4fe1\u53f7\u5fc5\u987b\u5bf9\u79f0\uff01\u91cd\u590d\u8c03\u7528 wait \u4e0d\u4f1a\u5d29\u6e83\uff0c\u4f46\u4f1a\u9020\u6210\u65e0\u9650\u7684\u7b49\u5f85\u2026\u2026\nNSLog(@"safe here ...");\ndispatch_semaphore_signal(lock);\n')),(0,i.kt)("h3",{id:"osspinlock-deprecated"},"OSSpinLock (deprecated)"),(0,i.kt)("p",null,"\u5728\u7f55\u89c1\u7684\u60c5\u51b5\u4e0b\uff0c\u4f4e\u4f18\u5148\u7ea7\u7684\u7ebf\u7a0b\u5148\u83b7\u5f97\u4e86\u9501\uff0c\u8fd9\u65f6\u4e00\u4e2a\u9ad8\u4f18\u5148\u7ea7\u7684\u7ebf\u7a0b\u4e5f\u5c1d\u8bd5\u83b7\u5f97\u8fd9\u4e2a\u9501\uff0c\u5b83\u4f1a\u5904\u4e8e\u7a7a\u8f6c\u72b6\u6001\u5e76\u6301\u7eed\u5360\u7528 CPU\u3002\u4f46\u4e0e\u6b64\u540c\u65f6\uff0c\u4f4e\u4f18\u5148\u7ea7\u7ebf\u7a0b\u5728 CPU \u65f6\u95f4\u7684\u5206\u914d\u4e0a\u8fdc\u8fdc\u5c11\u4e8e\u9ad8\u3001\u4e2d\u4f18\u5148\u7ea7\u7ebf\u7a0b\uff0c\u8fd9\u5c31\u5bfc\u81f4\u4efb\u52a1\u8fdf\u8fdf\u5b8c\u4e0d\u6210\u3001\u65e0\u6cd5\u91ca\u653e\u9501\u3002\u9664\u975e\u5f00\u53d1\u8005\u80fd\u4fdd\u8bc1\u8bbf\u95ee\u9501\u7684\u7ebf\u7a0b\u5168\u90e8\u5904\u4e8e\u540c\u4e00\u4f18\u5148\u7ea7\uff0c\u5426\u5219 iOS \u7cfb\u7edf\u4e2d\u6240\u6709\u7c7b\u578b\u7684\u81ea\u65cb\u9501\u90fd\u4e0d\u80fd\u518d\u4f7f\u7528\u4e86\u3002"),(0,i.kt)("p",null,"\u8fc7\u53bb ",(0,i.kt)("inlineCode",{parentName:"p"},"atomic")," \u4fee\u9970\u7684\u5c5e\u6027\u5728\u5e95\u5c42\u4e5f\u662f\u4f7f\u7528\u81ea\u65cb\u9501\u7684\uff0c\u968f\u7740\u81ea\u65cb\u9501\u88ab\u5e9f\u5f03\uff0c\u73b0\u5728\u6539\u7528\u4e86 ",(0,i.kt)("inlineCode",{parentName:"p"},"os_unfair_lock"),"\u3002"),(0,i.kt)("h2",{id:"\u539f\u5b50\u64cd\u4f5c"},"\u539f\u5b50\u64cd\u4f5c"),(0,i.kt)("p",null,"\u67d0\u4e9b\u7b80\u5355\u7684\u8868\u8fbe\u5f0f\u4f8b\u5982 ",(0,i.kt)("inlineCode",{parentName:"p"},"i += 1"),"\uff0c\u5176\u5b9e\u7f16\u8bd1\u4e4b\u540e\u7684\u5f97\u5230\u7684\u6c47\u7f16\u6307\u4ee4\uff0c\u4e0d\u6b62\u4e00\u6761\uff0c\u6240\u4ee5\u4ed6\u4eec\u5e76\u4e0d\u662f\u539f\u5b50\u64cd\u4f5c\u3002"),(0,i.kt)("p",null,"\u539f\u5b50\u64cd\u4f5c\u4e00\u5b9a\u662f\u5728\u540c\u4e00\u4e2a CPU \u65f6\u95f4\u7247\u4e2d\u5b8c\u6210\uff0c\u8fd9\u6837\u5373\u4f7f\u7ebf\u7a0b\u88ab\u5207\u6362\uff0c\u591a\u4e2a\u7ebf\u7a0b\u4e5f\u4e0d\u4f1a\u770b\u5230\u540c\u4e00\u5757\u5185\u5b58\u4e2d\u4e0d\u5b8c\u6574\u7684\u6570\u636e\u3002"),(0,i.kt)("h2",{id:"ipc-\u8de8\u8fdb\u7a0b\u901a\u4fe1"},"IPC \u8de8\u8fdb\u7a0b\u901a\u4fe1"),(0,i.kt)("p",null,"\u7531\u4e8e iOS \u7684\u6c99\u76d2\u673a\u5236\uff0c\u6bcf\u4e2a\u8fdb\u7a0b\u90fd\u5728\u72ec\u7acb\u7684\u6c99\u76d2\u4e2d\u8fd0\u884c\uff0c\u4e0e\u5176\u5b83\u8fdb\u7a0b\u7684\u901a\u4fe1\u76f8\u5bf9\u53d7\u9650\uff0c\u4e3b\u8981\u662f\u901a\u8fc7\u7cfb\u7edf\u7684\u63a5\u53e3\u3002\u4f8b\u5982\uff1a"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"UIDocumentInteractionController")," \u53ef\u4ee5\u4f20\u8f93\u6587\u6863\u3001\u9884\u89c8\u3001\u6253\u5370\u3001\u53d1\u90ae\u4ef6\u7b49\uff0c\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"https://code.tutsplus.com/tutorials/ios-sdk-previewing-and-opening-documents--mobile-15130"},"iOS SDK: Previewing and Opening Documents"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"UIActivityViewController")," \u63d0\u4f9b\u4e86\u5206\u4eab\u5185\u5bb9\u7684\u65b9\u6cd5\uff0c\u5305\u62ec AirDrop \u7b49\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"UIPasteboard")," \u53ef\u4ee5\u8bbf\u95ee\u526a\u8d34\u677f\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Keychain")," \u63d0\u4f9b\u94a5\u5319\u4e32\u8bbf\u95ee\u3002"),(0,i.kt)("p",null,"\u8bbf\u95ee Application Group \u5171\u4eab\u7684\u6587\u4ef6\u5939\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: kAppGroupIdentifier)"),"\u3002"),(0,i.kt)("p",null,"\u5728\u5171\u4eab\u533a\u5b58\u50a8 UserDefaults\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"UserDefaults(suiteName: kAppGroupIdentifier)"),"\u3002"),(0,i.kt)("p",null,"URLScheme \u548c Universal Links \u901a\u8fc7\u6df1\u94fe\u63a5 URL \u4f20\u9012\u4fe1\u606f\u3002"),(0,i.kt)("p",null,"macOS \u4e0a\u8fd8\u53ef\u4ee5\u901a\u8fc7 local socket\uff0c\u8fdb\u7a0b A \u5bf9\u67d0\u4e00\u4e2a\u7aef\u53e3\u8fdb\u884c\u7ed1\u5b9a\u3001\u76d1\u542c\uff0c\u8fdb\u7a0b B \u8fdb\u884c TCP \u8fde\u63a5\u3002\u53c2\u8003\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://nshipster.com/inter-process-communication/"},"Inter-Process Communication"),"\uff08\u4e0d\u4ec5\u662f iOS\uff0c\u4e5f\u6709 macOS\uff0c\u9488\u5bf9\u6574\u4e2a\u82f9\u679c\u751f\u6001\uff09\u3002"),(0,i.kt)("h2",{id:"\u6b7b\u9501"},"\u6b7b\u9501"),(0,i.kt)("p",null,"\u7b80\u5355\u7684\u6b7b\u9501\u4f8b\u5b50\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},'import Foundation\n\nlet lock = NSLock()\n\nfunc methodA() {\n    lock.lock();\n    methodB()\n    lock.unlock();\n}\n\nfunc methodB() {\n    lock.lock();\n    print("B")\n    lock.unlock()\n}\n\nmethodA()\n')),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:n(66839).Z,width:"1316",height:"1016"})),(0,i.kt)("p",null,"NSLock \u662f\u975e\u9012\u5f52\u9501\uff0c\u5f53\u540c\u4e00\u7ebf\u7a0b\u91cd\u590d\u83b7\u53d6\u540c\u4e00\u975e\u9012\u5f52\u9501\u65f6\uff0c\u5c31\u4f1a\u53d1\u751f\u6b7b\u9501\u3002"),(0,i.kt)("p",null,"\u9012\u5f52\u9501\uff1a\u5b83\u5141\u8bb8",(0,i.kt)("strong",{parentName:"p"},"\u540c\u4e00\u7ebf\u7a0b"),"\u591a\u6b21\u52a0\u9501\uff0c\u800c\u4e0d\u4f1a\u9020\u6210\u6b7b\u9501\u3002\u6240\u4ee5\u4e0a\u9762\u7684\u4ee3\u7801\u6539\u6210 ",(0,i.kt)("inlineCode",{parentName:"p"},"NSRecursiveLock")," \u540e\u4e0d\u4f1a\u6b7b\u9501\u3002"),(0,i.kt)("p",null,"\u4f46\u5982\u679c\u9519\u8bef\u5730\u5728\u4e24\u4e2a\u7ebf\u7a0b\u4e2d\u4f7f\u7528\u4e86\u9012\u5f52\u9501\uff0c\u5219\u5f88\u5bb9\u6613\u5bfc\u81f4\u6b7b\u9501\uff1a\u4e24\u4e2a\u7ebf\u7a0b\u540c\u65f6\u5bf9\u540c\u4e00\u4e2a\u9501\u8fdb\u884c\u52a0\u9501\uff0c\u540c\u65f6\u53d1\u73b0\u8be5\u9501\u5df2\u7ecf\u9501\u5b9a\uff0c\u5f7c\u6b64\u7b49\u5f85\u5bf9\u65b9\u89e3\u9501\uff0c\u5bfc\u81f4\u4e24\u4e2a\u7ebf\u7a0b\u90fd\u65e0\u6cd5\u6267\u884c\u4e0b\u53bb\u3002\u5c24\u5176\u662f\u6709\u4e00\u65b9\u662f\u4e3b\u7ebf\u7a0b\u7684\u60c5\u51b5\u4e0b\uff0c\u4e3b\u7ebf\u7a0b\u88ab\u963b\u585e\uff0cUI \u5448\u73b0\u5047\u6b7b\u72b6\u6001\u3002"),(0,i.kt)("p",null,"\u9012\u5f52\u9501\u4e13\u95e8\u7528\u4e8e\u5faa\u73af\u6216\u9012\u5f52\u4e2d\u9700\u8981\u540c\u6b65\u7684\u4ee3\u7801\uff0c\u4f46\u5b83\u5374\u4e0d\u80fd\u907f\u514d\u4e24\u4e2a\u7ebf\u7a0b\u540c\u65f6\u8bbf\u95ee\u9501\u4e2d\u4ee3\u7801\u7684\u60c5\u51b5\u3002\u800c ",(0,i.kt)("inlineCode",{parentName:"p"},"NSLock")," \u5374\u6070\u6070\u76f8\u53cd\uff0c\u5b83\u80fd\u907f\u514d\u4e24\u4e2a\u7ebf\u7a0b\u540c\u65f6\u8bbf\u95ee\u9501\u4e2d\u7684\u4ee3\u7801\uff0c\u5374\u4e0d\u80fd\u907f\u514d\u5728\u540c\u4e00\u7ebf\u7a0b\u4e2d\uff0c\u540c\u6b65\u4ee3\u7801\u4e2d\u5d4c\u5957\u52a0\u9501\u7684\u60c5\u51b5\u3002"),(0,i.kt)("p",null,"\u5982\u679c\u56e0\u4e3a\u4ee3\u7801\u4e2d\u65e2\u6ca1\u6709\u9012\u5f52\u4e5f\u6ca1\u6709\u5faa\u73af\uff0c\u5219\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"NSLock"),"\u3002"),(0,i.kt)("h2",{id:"\u5355\u4f8b\u4e0e\u7ebf\u7a0b\u5b89\u5168"},"\u5355\u4f8b\u4e0e\u7ebf\u7a0b\u5b89\u5168"),(0,i.kt)("p",null,"\u5355\u4f8b\u4e2d\u8bfb\u5199\u9759\u6001\u53d8\u91cf\uff0c\u4e0d\u5b89\u5168\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},"static bool hasDone = NO;\nif (!hasDone) {\n    // do something\n    hasDone = YES;\n}\n")),(0,i.kt)("p",null,"\u4ee5\u4e0a\u5199\u6cd5\u4e0d\u5b89\u5168\uff0c\u6709\u53ef\u80fd\u591a\u4e2a\u7ebf\u7a0b\u540c\u65f6\u901a\u8fc7\u975e\u7a7a\u68c0\u67e5\uff0c\u5bfc\u81f4 ",(0,i.kt)("inlineCode",{parentName:"p"},"if")," \u5185\u7684\u4ee3\u7801\u6267\u884c\u591a\u6b21\u3002"),(0,i.kt)("p",null,"\u61d2\u52a0\u8f7d\u5728\u5355\u4f8b\u4e2d\u4e0d\u5b89\u5168\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},"- (NSArray *)myArray {\n    if (_myArray) {\n        _myArray = [[NSArray alloc] init];\n    }\n    return _myArray;\n}\n")),(0,i.kt)("p",null,"\u8fd9\u79cd\u5224\u65ad\u5728\u591a\u7ebf\u7a0b\u4e0b\u4e0d\u5b89\u5168\u7684\u3002\u591a\u7ebf\u7a0b\u4e0b\u5c3d\u91cf\u522b\u4f7f\u7528\u61d2\u52a0\u8f7d\uff0c\u5373\u4f7f\u4f7f\u7528\uff0c\u4e5f\u8981\u52a0\u76f8\u5e94\u7684\u4fdd\u62a4\uff0c\u6bd4\u5982\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"_myArray")," \u4e0d\u4f1a\u88ab\u91cd\u65b0\u7f6e\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"nil")," \u7684\u524d\u63d0\u4e0b\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"dispatch_once"),"\u3002"))}u.isMDXComponent=!0},74148:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/1677795a-5cf6-4118-ac0e-d87439dbf510-12f1cbe5c82956bd6977a655e5ae1d99.png"},45653:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/328be38f-19c3-4a69-969c-5c405da382f6-b7fa1221dc9ed392dcf85682f7b21c10.png"},49944:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/3a460ef9-2b43-4de7-96a9-e9b622bd201a-266d38de24db852ced4781c85c152c95.png"},66839:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/6f90086b-9eee-4de0-a7ec-2e7f3c7c1c0c-8487ba7aba7979b79ecd3cab5797e059.png"},19409:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/7a56c617-f8d6-434f-983e-7cbac7cbb0bc-e93e3635b825d75444b13d96e8a8a08e.png"},31722:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/a07fb769-61e6-4059-b70d-6c4f62b700f7-0c90e0aa7aaae18ed634e421a66fb28f.png"},90385:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/b58785de-d2af-4c8b-9d76-638f9df52be3-6b5a0c72f0ce8a9847eaa75c33580ada.png"},17107:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ba464317-1f0c-42e3-af18-ef5b84cc3982-bea306ff311562ef187135d77dca98b5.png"},54556:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/d809255e-282d-440c-8394-eb16d795ccd0-a100e07549e23b8625804efdad0ad803.png"}}]);