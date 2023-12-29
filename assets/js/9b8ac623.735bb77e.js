"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2820],{41845:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(87462),a=(n(67294),n(3905));n(61839);const r={},o="\u6587\u4ef6\u76f8\u5173",l={unversionedId:"file",id:"file",title:"\u6587\u4ef6\u76f8\u5173",description:"\u8bfb\u6587\u4ef6\u5934\u7b7e\u540d\uff1axxd -l 128",source:"@site/docs/codes/file.md",sourceDirName:".",slug:"/file",permalink:"/docs/codes/file",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",next:{title:"Foundation",permalink:"/docs/codes/foundation"}},s={},p=[{value:"Info.plist",id:"infoplist",level:2},{value:"\u81ea\u52a8\u91cd\u547d\u540d\u6587\u4ef6",id:"\u81ea\u52a8\u91cd\u547d\u540d\u6587\u4ef6",level:2},{value:"\u6587\u4ef6\u5927\u5c0f\u683c\u5f0f\u5316\u5b57\u7b26\u4e32",id:"\u6587\u4ef6\u5927\u5c0f\u683c\u5f0f\u5316\u5b57\u7b26\u4e32",level:2}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u6587\u4ef6\u76f8\u5173"},"\u6587\u4ef6\u76f8\u5173"),(0,a.kt)("p",null,"\u8bfb\u6587\u4ef6\u5934\u7b7e\u540d\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"xxd -l 128")),(0,a.kt)("p",null,"\u6587\u4ef6\u5728 App \u5185\u6253\u5f00\u540e\uff0c\u4f1a\u81ea\u52a8\u653e\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"Documents/Inbox")," \u6587\u4ef6\u5939\u4e0b\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-objc"},"[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];\n[NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) firstObject];\nNSTemporaryDirectory()\n")),(0,a.kt)("h2",{id:"infoplist"},"Info.plist"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"UIFileSharingEnabled"),": If you set this key to YES, your app can share files with the user. Place the files in a Documents folder located in the app\u2019s home directiory. The default value is NO."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"UISupportsDocumentBrowser"),": To allow other apps to open and edit the files stored in your app\u2019s Documents folder, set this key to YES. This key also lets users set the app\u2019s default save location in Settings."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"LSSupportsOpeningDocumentsInPlace"),": A Boolean value indicating whether the app may open the original document from a file provider, rather than a copy of the document."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"NSExtensionFileProviderSupportsEnumeration"),": A Boolean value that indicates whether a File Provider extension enumerates its content."),(0,a.kt)("h2",{id:"\u81ea\u52a8\u91cd\u547d\u540d\u6587\u4ef6"},"\u81ea\u52a8\u91cd\u547d\u540d\u6587\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},'/// \u4f20\u5165\u4e00\u4e2a\u6587\u4ef6\u8def\u5f84\uff0c\u5982\u679c\u8be5\u8def\u5f84\u4e0b\u7684\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u5219\u8fd4\u56de\u5b83\u672c\u8eab\uff1b\u5982\u679c\u5df2\u5b58\u5728\uff0c\u90a3\u4e48\u4f1a\u81ea\u52a8\u91cd\u547d\u540d\u6587\u4ef6\u540d\uff0c\u8fd4\u56de\u4e00\u4e2a\u4e0d\u51b2\u7a81\u7684\u6587\u4ef6\u8def\u5f84\u3002\n/// @param filePath \u6587\u4ef6\u8def\u5f84\n+ (NSString *)autoRenamePath:(NSString *)filePath {\n    NSFileManager *manager = [NSFileManager defaultManager];\n    NSString *fileName = [[filePath lastPathComponent] stringByDeletingPathExtension]; // \u4f8b\u5982\u201cPDF_0707\u201d\n    NSString *directory = [filePath stringByDeletingLastPathComponent]; // \u76ee\u5f55\n    NSUInteger numOfFiles = [manager contentsOfDirectoryAtPath:directory error:nil].count;\n    // \u5982\u679c\u201cPDF_0707\u201d\u5b58\u5728\uff0c\u5c31\u5728\u540e\u9762\u81ea\u52a8\u8ffd\u52a0\u6570\u5b57\u540e\u7f00\n    NSUInteger counter = 0; // \u8ba1\u6570\u5668\n    NSString *newName = [fileName copy];\n    while ([manager fileExistsAtPath:filePath]) {\n        ++counter;\n        if (counter > numOfFiles + 1) {\n            break; // \u5faa\u73af\u7684\u6b21\u6570\u4e0d\u5927\u4e8e\u76ee\u5f55\u4e0b\u7684\u6587\u4ef6\u4e2a\u6570+1\n        }\n        newName = [NSString stringWithFormat:@"%@(%@)", fileName, @(counter)]; // \u4f8b\u5982\u201cPDF_0707(1)\u201d\n        NSString *extension = [filePath pathExtension];\n        filePath = [[directory stringByAppendingPathComponent:newName] stringByAppendingPathExtension:extension];\n        // \u4e0d\u4f1a\u4e00\u76f4\u5faa\u73af\u4e0b\u53bb\uff0c\u56e0\u4e3a\u7528\u6237\u6bcf\u5929\u5bfc\u51fa\u7684\u6587\u4ef6\u6570\u662f\u6709\u9650\u7684\uff0c0707 \u8fd9\u4e2a\u65e5\u671f\u4e0b\u7684 PDF \u6587\u4ef6\u5927\u591a\u6570\u60c5\u51b5\u4e0b\u4e5f\u5c31\u51e0\u4e2a\n        // \u56e0\u6b64\u968f\u7740\u8ba1\u6570\u5668\u7684\u589e\u52a0\uff0c\u4e00\u5b9a\u4f1a\u627e\u5230\u4e00\u4e2a\u53ef\u4ee5\u7528\u7684\u6570\u5b57\uff0c\u4f8b\u5982\u201cPDF_0707(99)\u201d\uff0c\u5c31\u662f\u53ef\u7528\u7684\u6587\u4ef6\u8def\u5f84\n    }\n    return filePath;\n}\n')),(0,a.kt)("h2",{id:"\u6587\u4ef6\u5927\u5c0f\u683c\u5f0f\u5316\u5b57\u7b26\u4e32"},"\u6587\u4ef6\u5927\u5c0f\u683c\u5f0f\u5316\u5b57\u7b26\u4e32"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},'+ (NSString *)displayStringWithFileSize:(NSUInteger)fileSize {\n    if (fileSize >= 1024 * 1024) {\n        return [NSString stringWithFormat:@"%.2fMB", fileSize / 1024 / 1024];\n    } else if (fileSize >= 1024) {\n        return [NSString stringWithFormat:@"%.2fKB", fileSize / 1024];\n    } else {\n        return [NSString stringWithFormat:@"%.2fB", fileSize];\n    }\n}\n')))}u.isMDXComponent=!0}}]);