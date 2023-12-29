"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3227],{7743:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>n,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var s=a(87462),i=(a(67294),a(3905));a(61839);const o={},n="WWDC23",r={unversionedId:"wwdc23",id:"wwdc23",title:"WWDC23",description:"Explore media formats for the web - WWDC23 - Videos - Apple Developer",source:"@site/docs/apple/wwdc23.md",sourceDirName:".",slug:"/wwdc23",permalink:"/docs/apple/wwdc23",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/wwdc23.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"WWDC",permalink:"/docs/apple/wwdc"},next:{title:"XCAssets",permalink:"/docs/apple/xcassets"}},l={},d=[{value:"Explore media formats for the web - WWDC23 - Videos - Apple Developer",id:"explore-media-formats-for-the-web---wwdc23---videos---apple-developer",level:2},{value:"Build robust and resumable file transfers - WWDC23 - Videos - Apple Developer",id:"build-robust-and-resumable-file-transfers---wwdc23---videos---apple-developer",level:2}],p={toc:d};function u(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,s.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"wwdc23"},"WWDC23"),(0,i.kt)("h2",{id:"explore-media-formats-for-the-web---wwdc23---videos---apple-developer"},(0,i.kt)("a",{parentName:"h2",href:"https://developer.apple.com/videos/play/wwdc2023/10122/"},"Explore media formats for the web - WWDC23 - Videos - Apple Developer")),(0,i.kt)("p",null,"The incumbent formats are GIF, JPEG, and PNG."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"GIF: It does not support a full color palette being limited to 8 bits color at a time. Since it's a lossless format, file sizes can be quite large, making it less suitable for larger animations."),(0,i.kt)("li",{parentName:"ul"},"JPEG: A great feature is progressive loading. It's a lossy format."),(0,i.kt)("li",{parentName:"ul"},"PNG: supports transparency. It's lossless and doesn't compress as well as JPEG, so it's not very suitable for big images with lots of color. Like GIF, it was designed to replace, it supports animations, though I've rarely seen those in the wild.")),(0,i.kt)("p",null,"Safari 17 supports an additional four extra modern formats."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"WebP")," was added to Safari 14 and macOS Big Sur. This is a modern image format that uses advanced compression algorithms to achieve smaller file sizes without sacrificing image quality. WebP files are typically smaller than those earlier image formats. WebP lets you do animations with video-like quality, and so use it where it's a bad idea to use GIF due to their size or lack of colors."),(0,i.kt)("p",null,"One exciting addition to Safari 17 is ",(0,i.kt)("strong",{parentName:"p"},"JPEG-XL"),'. JPEG-XL uses a new compression algorithm called "Modular Entropy Coding" that allows for greater flexibility in adjusting the compression ratio. A key feature of JPEG-XL is that you can losslessly convert, that is, not occur any data loss going from your existing JPEG files to JPEG-XL, all while significantly reducing their size by up to 60%.'),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"AVIF")," is another modern image format that uses the AV1 video codec to achieve high compression rates without sacrificing image quality. Widely supported across all browsers, it is well suited for live photos and supports up to 12 bits color depth. It also has the broadest support, and you should include it as fallback. AVIF can be up to ten times smaller than JPEG."),(0,i.kt)("p",null,"In Safari 17, we added support for ",(0,i.kt)("strong",{parentName:"p"},"HEIC"),", also known as ",(0,i.kt)("strong",{parentName:"p"},"HEIF"),". It's an image format that uses the HEVC video codec compression algorithm to achieve small file sizes. But since it's not widely supported on other platforms, you will probably only want to use it as an alternative format. This is the format used by iPhones and iPad to save photos, so you can directly handle photo uploaded from your iPhone with no conversion. If you intend to display images using a WKWebView inside your app, this is the format you should be using, as it's hardware accelerated and can be rendered quickly and efficiently."),(0,i.kt)("p",null,"You don't have to choose!"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'// Support existing and modern image formats\n<picture>\n  <source srcset="images/large/sophie.heic" type="image/heic" />\n  <source srcset="images/large/sophie.j\xd7]" type="image/jx]" />\n  <source srcset="images/large/sophie.avif" type="image/avif" />\n  <img src="images/large/sophie.jpeg" />\n</picture>\n')),(0,i.kt)("p",null,"In the early 2000s, browser plugins like Flash and QuickTime emerged as a popular way to add video to websites. And in 2010, HTML5 was introduced, which made it possible to embed video directly into webpages without the need for those plugins."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"HTTP Live Streaming (HLS)")," was introduced by Apple in 2009. One of the key features of HLS is its support for adaptive bitrate streaming, which allows for the delivery of the best possible video quality based on the user's internet connection speed and device capabilities."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:a(24735).Z,width:"2516",height:"1544"})),(0,i.kt)("p",null,"Adaptive streaming in HLS works by dividing the video content into small chunks or segments, typically between two and ten seconds in length. Each segment is encoded at multiple bitrates, and these different bitrate versions are made available to the client via a manifest file in the form of an ",(0,i.kt)("strong",{parentName:"p"},"M3U8")," multi-variant playlist. HLS does a brilliant job at selecting the best suitable variant. It's very simple to use and is the best solution for the end users. Unfortunately, even today, only Safari supports it. Web developers wanted more control and more flexibility, such as the selection and transfer of media data, or the ability to play DRMed content on desktop."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"\u82f9\u679c\u5f00\u53d1\u7684\u201cHTTP \u76f4\u64ad\u6d41\u201d\uff08HTTP Live Streaming\uff0cHLS\uff09\u6280\u672f\u672c\u8eab\u662f\u4e00\u4e2a\u534f\u8bae\uff0c\u800c Edge \u5728 Windows 10 \u6b63\u5f0f\u7248\u53d1\u884c\u4e4b\u540e\u786e\u5b9a\u652f\u6301\u4e86\u8fd9\u9879\u534f\u8bae\u3002\u76f4\u5230\u76ee\u524d\u4e3a\u6b62\uff0c\u975e\u82f9\u679c\u7684\u6d4f\u89c8\u5668\u53ea\u6709 Chrome \u548c Edge \u652f\u6301\u4e86 HLS \u6280\u672f\uff0c\u800c\u4e14\u5728 Chrome \u4e0a\u5b9e\u73b0 HLS\uff0c\u8fd8\u9700\u8981\u7528\u6237\u7f16\u5199\u989d\u5916\u7684 js \u811a\u672c\u3002\u56e0\u6b64\uff0c\u53ea\u6709 Edge \u5b8c\u5168\u5177\u5907\u4f7f\u7528 HLS \u8fdb\u884c\u7f51\u7edc\u8f6c\u64ad\u7684\u80fd\u529b\u3002")),(0,i.kt)("p",null,"And so in 2013, the ",(0,i.kt)("strong",{parentName:"p"},"Media Source Extension (MSE)")," was published by the W3C body. It is a low-level toolkit that allows for adaptive streaming by giving the webpage more control and responsibilities for managing buffering and resolution. Overall, MSE has been a game changer for web developers. It has enabled the development of high-quality streaming experiences on the web and is now the most used web video technology. MSE has some drawbacks. It isn't particularly good at managing of buffer levels, the timing and amount of network access, and media variant selection. These inefficiencies have largely been immaterial on relatively powerful devices like modern general purpose computers. Power usage on mobile devices was much higher than with the HLS native player, and so MSE was never made available on iPhones because we couldn't achieve with MSE the required battery savings."),(0,i.kt)("p",null,"The new ",(0,i.kt)("strong",{parentName:"p"},"Managed Media Source")," API makes it easier for media website authors to support streaming media playback on constrained capability devices, all while allowing User Agents to react to changes in available memory and networking capabilities."),(0,i.kt)("h2",{id:"build-robust-and-resumable-file-transfers---wwdc23---videos---apple-developer"},(0,i.kt)("a",{parentName:"h2",href:"https://developer.apple.com/videos/play/wwdc2023/10006/"},"Build robust and resumable file transfers - WWDC23 - Videos - Apple Developer")),(0,i.kt)("p",null,"\u4e0b\u8f7d\u3001\u4e0a\u4f20\u90fd\u53ef\u4ee5\u65ad\u70b9\u7eed\u4f20"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:a(65787).Z,width:"2308",height:"1492"})),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},"// Pausing and resuming a URLSessionUploadTask\nlet uploadTask = session.uploadTask(with: request, fromFile: fileURL)\nuploadTask.resume()\nguard let resumeData = await uploadTask.cancelByProducingResumeData() else {\n    // Upload cannot be resumed return\n}\n\nlet newUploadTask = session.uploadTask(withResumeData: resumeData)\nnewUploadTask.resume()\n\n// Retrieving resume data on error\ndo {\n    let (data, response) = try await session.upload(for: request, fromFile: fileURL)\n} catch let error as URLError {\n    guard let resumeData = error.uploadTaskResumeData else {\n        // Upload cannot be resumed\n        return\n    }\n}\n")),(0,i.kt)("p",null,"\u5982\u4f55\u4f7f\u7528 BackgroundSession"))}u.isMDXComponent=!0},24735:(e,t,a)=>{a.d(t,{Z:()=>s});const s=a.p+"assets/images/3D93C2F7-58CC-43BF-B86D-AF0FAD56208B-f637883b2e14d3fea9a5ea564aee46d0.png"},65787:(e,t,a)=>{a.d(t,{Z:()=>s});const s=a.p+"assets/images/F1CAD7FF-EFD1-4CCA-8A36-25882E980D63-2e92669095f19981e86bccc96ae186e5.png"}}]);