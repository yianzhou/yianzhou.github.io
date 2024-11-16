"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6311],{99889:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var l=a(87462),n=(a(67294),a(3905));a(61839);const i={},r="Android",o={unversionedId:"android",id:"android",title:"Android",description:"\u4e00\u6b65\u4e00\u6b65\u5f00\u53d1\u5929\u6c14 App",source:"@site/docs/dev/android.md",sourceDirName:".",slug:"/android",permalink:"/docs/dev/android",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6570\u636e\u7ed3\u6784\u4e0e\u7b97\u6cd5",permalink:"/docs/dev/algorithm"},next:{title:"BTW",permalink:"/docs/dev/btw"}},d={},p=[{value:"Kotlin",id:"kotlin",level:2},{value:"Jetpack",id:"jetpack",level:2},{value:"adb",id:"adb",level:2},{value:"\u5b89\u5353\u5206\u652f",id:"\u5b89\u5353\u5206\u652f",level:2},{value:"\u673a\u578b",id:"\u673a\u578b",level:2},{value:"gradle",id:"gradle",level:2}],s={toc:p};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,l.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"android"},"Android"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/lilongweidev/GoodWeather"},"\u4e00\u6b65\u4e00\u6b65\u5f00\u53d1\u5929\u6c14 App")),(0,n.kt)("h2",{id:"kotlin"},"Kotlin"),(0,n.kt)("p",null,"\u5b66\u4e60\u65b0\u8bed\u8a00\uff1a"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u642d\u5efa\u73af\u5883\uff0c\u5165\u53e3\u51fd\u6570\uff0c\u6253\u5370\u5b57\u7b26\u4e32\uff0cHello World!"),(0,n.kt)("li",{parentName:"ol"},"\u53d8\u91cf\u3001\u5e38\u91cf\u3001\u679a\u4e3e"),(0,n.kt)("li",{parentName:"ol"},"\u8868\u8fbe\u5f0f\u3001\u63a7\u5236\u6d41\u7a0b"),(0,n.kt)("li",{parentName:"ol"},"\u51fd\u6570\u3001\u9ad8\u9636\u51fd\u6570"),(0,n.kt)("li",{parentName:"ol"},"\u96c6\u5408\u53ca\u96c6\u5408\u7684\u64cd\u4f5c"),(0,n.kt)("li",{parentName:"ol"},"\u7c7b\u3001\u9759\u6001\u6210\u5458\u3001\u7ee7\u627f\u3001\u6269\u5c55(extension)"),(0,n.kt)("li",{parentName:"ol"},"\u9010\u6b65\u8c03\u8bd5")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://play.kotlinlang.org/byExample/01_introduction/01_Hello%20world"},"Hello World Playground")),(0,n.kt)("p",null,"Kotlin \u662f\u7531\u6377\u514b\u7684 JetBrains \u8f6f\u4ef6\u516c\u53f8\u5f00\u53d1\u7684\u4e00\u79cd\u9759\u6001\u7c7b\u578b\u7684\u3001\u9762\u5411\u5bf9\u8c61\u7684\u7f16\u7a0b\u8bed\u8a00\u3002\u5b83\u4e0e Java \u8bed\u8a00\u5177\u6709\u4e92\u64cd\u4f5c\u6027\uff0c\u800c\u4e14\u8be5\u8bed\u8a00\u5341\u5206\u7b80\u6d01\uff0c\u5e76\u5f97\u5230 Android Studio \u7684\u652f\u6301\u3002\u4e8b\u5b9e\u4e0a\uff0cKotlin \u5728\u60a8\u7684\u8bbe\u5907\u4e2d\u9700\u8981\u4f7f\u7528 JVM\u3002"),(0,n.kt)("p",null,"If ",(0,n.kt)("strong",{parentName:"p"},"lambdas")," are nothing more than nameless functions, then ",(0,n.kt)("strong",{parentName:"p"},"closures")," are little more than lambdas with a context."),(0,n.kt)("p",null,"Kotlin is a modern statically typed programming language.\uff08\u9759\u6001\u7c7b\u578b\u8bed\u8a00 vs \u52a8\u6001\u7c7b\u578b\u8bed\u8a00\uff09"),(0,n.kt)("p",null,"Android KTX is a set of Kotlin extensions that are included with Android Jetpack and other Android libraries."),(0,n.kt)("p",null,"A language is statically-typed if the type of a variable is known at compile-time instead of at run-time: C, C++, C#, Java, Swift, Kotlin, ..."),(0,n.kt)("p",null,"A language is dynamically-typed if the type of a variable is checked during run-time: JavaScript, Dart, Objective-C, PHP, Python, Ruby, ..."),(0,n.kt)("p",null,"A strongly-typed language is one in which variables are bound to specific data types, and will result in type errors if types do not match up as expected in the expression \u2014 regardless of when type checking occurs.\uff08\u4e0e\u7c7b\u578b\u68c0\u67e5\u53d1\u751f\u5728\u7f16\u8bd1\u671f\u8fd8\u662f\u8fd0\u884c\u671f\u65e0\u5173\uff09 e.g Python, Java, etc."),(0,n.kt)("p",null,"A weakly-typed language is a language in which variables are not bound to a specific data type; they still have a type, but type safety constraints are lower compared to strongly-typed languages. e.g PHP, C, etc."),(0,n.kt)("p",null,"All Strongly-typed languages are Statically-typed, not all Weakly-typed languages are Dynamically-typed. \u5f3a\u7c7b\u578b\u8bed\u8a00\u7684\u53d8\u91cf\u7c7b\u578b\u4e00\u5b9a\u662f\u5728\u7f16\u8bd1\u671f\u5c31\u786e\u5b9a\u4e86\u3002"),(0,n.kt)("p",null,"Most of these rules affect variable assignment, return values and function calling."),(0,n.kt)("h2",{id:"jetpack"},"Jetpack"),(0,n.kt)("p",null,"Jetpack is a suite of libraries, tools, and guidance. Jetpack comprises the androidx.","*"," package libraries, unbundled from the platform APIs. This means that it offers backward compatibility and is updated more frequently than the Android platform."),(0,n.kt)("p",null,"AndroidX is a major improvement to the original Android Support Library, which is no longer maintained."),(0,n.kt)("h2",{id:"adb"},"adb"),(0,n.kt)("p",null,"Android Debug Bridge \u662f\u4e00\u79cd\u5ba2\u6237\u7aef-\u670d\u52a1\u5668\u7a0b\u5e8f\uff0c\u5305\u62ec\u4ee5\u4e0b\u4e09\u4e2a\u7ec4\u4ef6\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5ba2\u6237\u7aef\uff1a\u7528\u4e8e\u53d1\u9001\u547d\u4ee4\u3002\u5ba2\u6237\u7aef\u5728\u5f00\u53d1\u8ba1\u7b97\u673a\u4e0a\u8fd0\u884c\u3002\u60a8\u53ef\u4ee5\u901a\u8fc7\u53d1\u51fa adb \u547d\u4ee4\u6765\u4ece\u547d\u4ee4\u884c\u7ec8\u7aef\u8c03\u7528\u5ba2\u6237\u7aef\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u5b88\u62a4\u8fdb\u7a0b (adbd)\uff1a\u5728\u8bbe\u5907\u4e0a\u8fd0\u884c\u547d\u4ee4\u3002\u5b88\u62a4\u8fdb\u7a0b\u5728\u6bcf\u4e2a\u8bbe\u5907\u4e0a\u4f5c\u4e3a\u540e\u53f0\u8fdb\u7a0b\u8fd0\u884c\u3002"),(0,n.kt)("li",{parentName:"ul"},"\u670d\u52a1\u5668\uff1a\u7ba1\u7406\u5ba2\u6237\u7aef\u548c\u5b88\u62a4\u8fdb\u7a0b\u4e4b\u95f4\u7684\u901a\u4fe1\u3002\u670d\u52a1\u5668\u5728\u5f00\u53d1\u673a\u5668\u4e0a\u4f5c\u4e3a\u540e\u53f0\u8fdb\u7a0b\u8fd0\u884c\u3002")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://mta.qq.com/mta/data/device/os"},"\u64cd\u4f5c\u7cfb\u7edf\u5206\u5e03")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://source.android.com/setup/start/build-numbers"},"Android API Levels")),(0,n.kt)("p",null,"Android 9.0 Pie, Aug 6, 2018 (iOS 12, September 17, 2018)"),(0,n.kt)("h2",{id:"\u5b89\u5353\u5206\u652f"},"\u5b89\u5353\u5206\u652f"),(0,n.kt)("p",null,"\u539f\u751f\u5b89\u5353\u2014\u2014Google \u4e3a\u81ea\u5bb6\u5b89\u5353\u8bbe\u5907 Pixel \u7cfb\u5217\u63d0\u4f9b\u7684\u7cfb\u7edf\uff0c\u7531\u8c37\u6b4c\u8d1f\u8d23\u5b89\u5168\u8865\u4e01\u5347\u7ea7\u548c\u7cfb\u7edf\u66f4\u65b0\uff1b"),(0,n.kt)("p",null,"Android One\u2014\u2014Google \u4e3a\u975e Google \u786c\u4ef6\u63d0\u4f9b\u7684\u539f\u751f\u5b89\u5353\uff0c\u7531\u8c37\u6b4c\u8d1f\u8d23\u5b89\u5168\u8865\u4e01\u5347\u7ea7\u548c\u7cfb\u7edf\u66f4\u65b0\uff1b"),(0,n.kt)("p",null,"Android Go\u2014\u2014\u53d6\u4ee3 Android One \u6210\u4e3a\u4e13\u4e3a\u4f4e\u7aef\u8bbe\u5907\u4f18\u5316\u7684\u5b89\u5353\u7cfb\u7edf\uff0c\u7531 OEM \u5382\u5546\u5728\u63a5\u53d7 Google \u63a8\u9001\u540e\u8d1f\u8d23\u5b89\u5168\u8865\u4e01\u5347\u7ea7\u548c\u7cfb\u7edf\u66f4\u65b0\u3002"),(0,n.kt)("h2",{id:"\u673a\u578b"},"\u673a\u578b"),(0,n.kt)("p",null,"\u56fd\u5185\u7684\u539f\u5382\u7cfb\u7edf\u63a5\u8fd1\u539f\u751f\uff0c\u800c\u4e14\u53e3\u7891\u8fd8\u53ef\u4ee5\u7684\u57fa\u672c\u4e0a\u5c31\u662f\u4e00\u52a0\u4e86\uff0c\u4f46\u662f\u4e00\u52a0 6 \u53d8\u6210 AB \u5206\u533a\u540e\uff0c\u5237\u673a\u4ec0\u4e48\u7684\u6bd4\u8f83\u9ebb\u70e6\uff0c\u4e4b\u524d\u7684\u673a\u578b\u8fd8\u53ef\u4ee5\u3002\u534e\u4e3a\u9501\u4e86 bootloader\uff0c\u4e0d\u80fd\u81ea\u5df1\u89e3\u9501\uff0cOV \u4e24\u5bb6\u4e5f\u662f\u5f88\u5c11\u6709 rom\uff0c\u57fa\u672c\u4e0a\u53ea\u6709\u5c0f\u7c73\u6bd4\u8f83\u9002\u5408\u641e\u673a\u3002"),(0,n.kt)("h2",{id:"gradle"},"gradle"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"build.gradle"),": \u7528\u4e8e\u5b9a\u4e49\u9879\u76ee\u548c\u6a21\u5757\u7684\u6784\u5efa\u914d\u7f6e\u548c\u4f9d\u8d56\u9879\u3002\u9879\u76ee\u7ea7\u522b\u7684 ",(0,n.kt)("inlineCode",{parentName:"p"},"build.gradle")," \u914d\u7f6e\u6574\u4e2a\u9879\u76ee\uff0c\u6a21\u5757\u7ea7\u522b\u7684 ",(0,n.kt)("inlineCode",{parentName:"p"},"build.gradle")," \u914d\u7f6e\u5177\u4f53\u6a21\u5757\u3002"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"settings.gradle"),": \u7528\u4e8e\u5b9a\u4e49\u9879\u76ee\u7684\u8bbe\u7f6e\uff0c\u5b83\u544a\u8bc9 Gradle \u54ea\u4e9b\u6a21\u5757\u662f\u9879\u76ee\u7684\u4e00\u90e8\u5206\u3002"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"gradle.properties"),": \u7528\u4e8e\u5b9a\u4e49\u5168\u5c40\u7684 Gradle \u5c5e\u6027\u548c\u914d\u7f6e\u53c2\u6570\uff0c\u5f71\u54cd\u6574\u4e2a\u6784\u5efa\u8fc7\u7a0b\u3002"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"build.gradle.kts")," \u6587\u4ef6\u4f7f\u7528 Kotlin \u8bed\u8a00\u7f16\u5199\uff0c\u63d0\u4f9b\u4e86\u66f4\u5f3a\u7684\u7c7b\u578b\u5b89\u5168\u548c\u66f4\u597d\u7684 IDE \u652f\u6301\u3002"))}u.isMDXComponent=!0}}]);