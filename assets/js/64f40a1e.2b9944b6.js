"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6456],{47051:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>r,metadata:()=>l,toc:()=>T});var s=n(87462),t=(n(67294),n(3905)),i=n(61839);const r={},o="AFNetworking",l={unversionedId:"afnetworking",id:"afnetworking",title:"AFNetworking",description:"AFNetworking",source:"@site/docs/apple/afnetworking.md",sourceDirName:".",slug:"/afnetworking",permalink:"/docs/apple/afnetworking",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/afnetworking.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"UIKit",permalink:"/docs/apple/UIKit"},next:{title:"App Extension",permalink:"/docs/apple/app-extension"}},p={},T=[],k={toc:T};function g(e){let{components:a,...n}=e;return(0,t.kt)("wrapper",(0,s.Z)({},k,n,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"afnetworking"},"AFNetworking"),(0,t.kt)("blockquote",null,(0,t.kt)("p",{parentName:"blockquote"},(0,t.kt)("a",{parentName:"p",href:"https://github.com/AFNetworking/AFNetworking"},"AFNetworking"))),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"AFURLSessionManager")," creates and manages an ",(0,t.kt)("inlineCode",{parentName:"p"},"NSURLSession")," object based on a specified ",(0,t.kt)("inlineCode",{parentName:"p"},"NSURLSessionConfiguration")," object."),(0,t.kt)("p",null,(0,t.kt)("inlineCode",{parentName:"p"},"AFHTTPSessionManager")," is a subclass of ",(0,t.kt)("inlineCode",{parentName:"p"},"AFURLSessionManager")," with convenience methods for making HTTP requests (by ",(0,t.kt)("inlineCode",{parentName:"p"},"baseURL")," and relative paths)."),(0,t.kt)("blockquote",null,(0,t.kt)("p",{parentName:"blockquote"},(0,t.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods"},"HTTP request methods"))),(0,t.kt)("p",null,"Create and resume a task:"),(0,t.kt)(i.G,{chart:"sequenceDiagram\n    Client ->>+ AFHTTPSessionManager: GET:\n    AFHTTPSessionManager ->> AFHTTPSessionManager: dataTaskWithHTTPMethod:\n    AFHTTPSessionManager ->>+ AFHTTPRequestSerializer: requestWithMethod:\n    AFHTTPRequestSerializer ->> AFHTTPRequestSerializer: requestBySerializingRequest:\n    AFHTTPRequestSerializer --\x3e> AFHTTPRequestSerializer: NSURLRequest\n    AFHTTPRequestSerializer --\x3e>- AFHTTPSessionManager: NSMutableURLRequest\n    AFHTTPSessionManager ->>+ AFURLSessionManager: dataTaskWithRequest:\n    AFURLSessionManager ->>+ NSURLSession: dataTaskWithRequest:\n    NSURLSession ->>- AFURLSessionManager: NSURLSessionDataTask\n    AFURLSessionManager ->> AFURLSessionManager: addDelegateForDataTask:\n    AFURLSessionManager ->> AFURLSessionManager: setDelegate:forTask:\n    AFURLSessionManager --\x3e>- AFHTTPSessionManager: NSURLSessionDataTask\n    AFHTTPSessionManager -> AFHTTPSessionManager: [dataTask resume]\n    AFHTTPSessionManager --\x3e>- Client: NSURLSessionDataTask",mdxType:"Mermaid"}),(0,t.kt)("p",null,"Data task did completed:"),(0,t.kt)(i.G,{chart:"sequenceDiagram\n    System ->> AFURLSessionManager: URLSession:task:didCompleteWithError:\n    AFURLSessionManager ->> AFURLSessionManager: delegateForTask:\n    AFURLSessionManager ->> AFURLSessionManagerTaskDelegate: URLSession:task:didCompleteWithError:\n    AFURLSessionManagerTaskDelegate ->> AFHTTPResponseSerializer: responseObjectForResponse:data:error:\n    AFHTTPResponseSerializer --\x3e> AFURLSessionManagerTaskDelegate: id responseObject\n    AFURLSessionManagerTaskDelegate ->> Client: completionHandler(responseObject)",mdxType:"Mermaid"}))}g.isMDXComponent=!0}}]);