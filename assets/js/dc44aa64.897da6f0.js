"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9295],{90240:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>_,toc:()=>m});var a=t(87462),i=(t(67294),t(3905));t(61839);const l={},o="Mach-O",_={unversionedId:"\u5de5\u7a0b/mach-o",id:"\u5de5\u7a0b/mach-o",title:"Mach-O",description:"\u6982\u5ff5",source:"@site/docs/apple/\u5de5\u7a0b/mach-o.md",sourceDirName:"\u5de5\u7a0b",slug:"/\u5de5\u7a0b/mach-o",permalink:"/docs/apple/\u5de5\u7a0b/mach-o",draft:!1,editUrl:"https://github.com/yianzhou/yianzhou.github.io/docs/apple/\u5de5\u7a0b/mach-o.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Frameworks",permalink:"/docs/apple/\u5de5\u7a0b/frameworks"},next:{title:"\u7b26\u53f7\u5316",permalink:"/docs/apple/\u5de5\u7a0b/symbolic"}},p={},m=[{value:"\u6982\u5ff5",id:"\u6982\u5ff5",level:2},{value:"\u672c\u5730\u7b26\u53f7\u3001\u5168\u5c40\u7b26\u53f7\u3001\u5bfc\u51fa\u7b26\u53f7",id:"\u672c\u5730\u7b26\u53f7\u5168\u5c40\u7b26\u53f7\u5bfc\u51fa\u7b26\u53f7",level:2},{value:"visibility",id:"visibility",level:2},{value:"\u5916\u90e8\u7b26\u53f7",id:"\u5916\u90e8\u7b26\u53f7",level:2},{value:"OC \u7684\u7b26\u53f7",id:"oc-\u7684\u7b26\u53f7",level:2},{value:"Swift \u7684\u7b26\u53f7",id:"swift-\u7684\u7b26\u53f7",level:2},{value:"\u5f31\u5b9a\u4e49\u7b26\u53f7\u548c\u5f31\u5f15\u7528\u7b26\u53f7",id:"\u5f31\u5b9a\u4e49\u7b26\u53f7\u548c\u5f31\u5f15\u7528\u7b26\u53f7",level:2},{value:"\u8c03\u8bd5\u7b26\u53f7",id:"\u8c03\u8bd5\u7b26\u53f7",level:2},{value:"\u7b26\u53f7\u91cd\u540d",id:"\u7b26\u53f7\u91cd\u540d",level:2},{value:"\u91cd\u5b9a\u4f4d\u7b26\u53f7",id:"\u91cd\u5b9a\u4f4d\u7b26\u53f7",level:2},{value:"\u7ec8\u7aef\u8bfb\u53d6 Mach-O",id:"\u7ec8\u7aef\u8bfb\u53d6-mach-o",level:2},{value:"\u7a0b\u5e8f\u8bfb\u53d6 Mach-O",id:"\u7a0b\u5e8f\u8bfb\u53d6-mach-o",level:2}],r={toc:m};function d(e){let{components:n,...l}=e;return(0,i.kt)("wrapper",(0,a.Z)({},r,l,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"mach-o"},"Mach-O"),(0,i.kt)("h2",{id:"\u6982\u5ff5"},"\u6982\u5ff5"),(0,i.kt)("p",null,"Mach-O (Mach Object) \u6587\u4ef6\u683c\u5f0f\u662f\u82f9\u679c macOS \u548c iOS \u7cfb\u7edf\u4f7f\u7528\u7684\u53ef\u6267\u884c\u3001\u53ef\u94fe\u63a5\u7684 ABI \u6587\u4ef6\u683c\u5f0f\u3002\u7c7b\u6bd4 ELF \u6587\u4ef6\u4e4b\u4e8e Linux \u5e73\u53f0\uff0cPE \u6587\u4ef6\u4e4b\u4e8e Windows \u5e73\u53f0\u3002\u540c\u6837\u7684\uff0cMach-O \u6587\u4ef6\u662f\u4ee3\u7801\u4e0e\u6570\u636e\u7684\u96c6\u5408\uff0c\u4f53\u73b0\u4e86\u5728\u82f9\u679c\u5b9a\u4e49\u7684\u4e00\u5957\u89c4\u5219\u4e0b\uff0c\u7a0b\u5e8f\u6587\u4ef6\u662f\u5982\u4f55\u6784\u6210\u7684\uff0c\u7a0b\u5e8f\u7684\u94fe\u63a5\u3001\u88c5\u8f7d\u662f\u5982\u4f55\u53d1\u751f\u7684\u3002"),(0,i.kt)("p",null,"ABI \u6587\u4ef6\u662f\u64cd\u4f5c\u7cfb\u7edf\u7684\u57fa\u77f3\u3002\u5b66\u4e60\u8ba4\u8bc6\u4e00\u4e2a\u65b0\u7684 OS\uff0c\u7406\u89e3\u5b83\u7684 ABI \u6587\u4ef6\u662f\u975e\u5e38\u597d\u7684\u5207\u5165\u70b9\uff0c\u5bf9\u4e8e\u82f9\u679c\u7cfb\u7edf\u540c\u6837\u5982\u6b64\u3002"),(0,i.kt)("p",null,"Mach-O \u5b98\u65b9\u6587\u6863\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/aidansteele/osx-abi-macho-file-format-reference/blob/master/Mach-O_File_Format.pdf"},"https://github.com/aidansteele/osx-abi-macho-file-format-reference/blob/master/Mach-O_File_Format.pdf")),(0,i.kt)("p",null,"Mach-O \u6e90\u7801\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apple/darwin-xnu/tree/main/EXTERNAL_HEADERS/Mach-O"},"https://github.com/apple/darwin-xnu/tree/main/EXTERNAL_HEADERS/Mach-O")),(0,i.kt)("p",null,"Mach-O \u6587\u4ef6\u683c\u5f0f\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:t(58861).Z,width:"524",height:"541"})),(0,i.kt)("p",null,"ABI (Application Binary Interface): \u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"machoinfo")," \u8fd9\u4e2a\u7a0b\u5e8f\uff0c\u6211\u4eec\u4e86\u89e3\u5230 Mach-O \u5185\u4fe1\u606f\u7684\u6392\u5217\uff0c\u662f\u6309\u7167\u7ea6\u5b9a\u7684\u683c\u5f0f\uff08\u4e00\u4e2a\u4e2a\u7684\u7ed3\u6784\u4f53\uff09\u6765\u5bf9\u9f50\u7684\u3002ABI \u5373\u5bf9\u5e94 Mach-O \u7684\u683c\u5f0f\uff0c\u4e5f\u5c31\u5bf9\u5e94\u4e86\u4e00\u5957\u8bfb\u53d6\u7684\u89c4\u5219\u3002ABI \u7a33\u5b9a\u4e5f\u5c31\u662f\u8bf4 Mach-O \u5185\u90e8\u7684\u683c\u5f0f\u4e0d\u4f1a\u518d\u53d8\u4e86\uff0c\u90a3\u4e48\u7f16\u8bd1\u5668\u3001\u94fe\u63a5\u5668\u624d\u80fd\u7a33\u5b9a\u5730\u5411\u540e\u517c\u5bb9\u3002"),(0,i.kt)("p",null,"\u67e5\u770b Mach-O \u7684\u5de5\u5177\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/fangshufeng/MachOView"},"https://github.com/fangshufeng/MachOView")),(0,i.kt)("h2",{id:"\u672c\u5730\u7b26\u53f7\u5168\u5c40\u7b26\u53f7\u5bfc\u51fa\u7b26\u53f7"},"\u672c\u5730\u7b26\u53f7\u3001\u5168\u5c40\u7b26\u53f7\u3001\u5bfc\u51fa\u7b26\u53f7"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"int global_int_value = 1; // \u5168\u5c40\u53d8\u91cf\nstatic int static_int_value = 2; // \u9759\u6001\u53d8\u91cf\n\nint main () {\n    global_int_value = 10;\n    static_int_value = 20;\n    return 0;\n}\n")),(0,i.kt)("p",null,"\u7f16\u8bd1\u5e76\u67e5\u770b\u5176\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -c main.c && objdump --macho --syms main.o")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000000000000 l     F __TEXT,__text ltmp0\n0000000000000030 l     O __DATA,__data _static_int_value\n000000000000002c l     O __DATA,__data ltmp1\n0000000000000038 l     O __LD,__compact_unwind ltmp2\n000000000000002c g     O __DATA,__data _global_int_value\n0000000000000000 g     F __TEXT,__text _main\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"l")," \u4ee3\u8868\u672c\u5730\u7b26\u53f7 (local symbols)\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"g")," \u4ee3\u8868\u5168\u5c40\u7b26\u53f7 (global symbols)\u3002"),(0,i.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c\u9759\u6001\u53d8\u91cf\u53d8\u6210\u4e86\u672c\u5730\u7b26\u53f7\uff1b\u5168\u5c40\u53d8\u91cf\u53d8\u6210\u4e86\u5168\u5c40\u7b26\u53f7\u3002"),(0,i.kt)("p",null,"\u94fe\u63a5\u5e76\u67e5\u770b\u5176\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang main.o && objdump --macho --syms a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000100004004 l     O __DATA,__data _static_int_value\n0000000100000000 g     F __TEXT,__text __mh_execute_header\n0000000100004000 g     O __DATA,__data _global_int_value\n0000000100003f8c g     F __TEXT,__text _main\n")),(0,i.kt)("p",null,"\u5176\u4e2d\u672c\u5730\u7b26\u53f7\u662f\u53ef\u4ee5 ",(0,i.kt)("inlineCode",{parentName:"p"},"strip")," \u8131\u53bb\u7684\u3002\u5982\u679c\u60f3\u8981\u51cf\u5c0f\u52a8\u6001\u5e93\u7684\u4f53\u79ef\uff0c\u5c3d\u91cf\u628a\u4e0d\u5fc5\u8981\u7684\u5168\u5c40\u7b26\u53f7\u53d8\u4e3a\u672c\u5730\u7b26\u53f7\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# \u8131\u6389\u524d\nls -l a.out\n-rwxr-xr-x  1 yianzhou  staff  33442  1 23 20:05 a.out\n# \u8131\u6389\u672c\u5730\u7b26\u53f7\nstrip -x a.out\n# \u8131\u6389\u540e\nls -l a.out\n-rwxr-xr-x  1 yianzhou  staff  33416  1 23 20:08 a.out\n")),(0,i.kt)("p",null,"\u5168\u5c40\u7b26\u53f7\u5728\u94fe\u63a5\u540e\u4f1a\u88ab\u5bfc\u51fa\uff0c\u67e5\u770b\u5176\u5bfc\u51fa\u7b26\u53f7\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"objdump --macho --exports-trie a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Exports trie:\n0x100000000  __mh_execute_header\n0x100004000  _global_int_value\n0x100003F8C  _main\n")),(0,i.kt)("h2",{id:"visibility"},"visibility"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'__attribute__((visibility("default"))) int default_int_value = 1;\n__attribute__((visibility("hidden"))) int hidden_int_value = 2;\n\nint main () {\n    default_int_value = 10;\n    hidden_int_value = 20;\n    return 0;\n}\n')),(0,i.kt)("p",null,"\u7f16\u8bd1\u5e76\u67e5\u770b\u5176\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -c main.c && objdump --macho --syms main.o")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000000000000 l     F __TEXT,__text ltmp0\n000000000000002c l     O __DATA,__data ltmp1\n0000000000000038 l     O __LD,__compact_unwind ltmp2\n000000000000002c g     O __DATA,__data _default_int_value\n0000000000000030 g     O __DATA,__data _hidden_int_value\n0000000000000000 g     F __TEXT,__text _main\n")),(0,i.kt)("p",null,"\u94fe\u63a5\u5e76\u67e5\u770b\u5176\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang main.o && objdump --macho --syms a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000100004004 l     O __DATA,__data _hidden_int_value\n0000000100000000 g     F __TEXT,__text __mh_execute_header\n0000000100004000 g     O __DATA,__data _default_int_value\n0000000100003f8c g     F __TEXT,__text _main\n")),(0,i.kt)("p",null,"\u7531\u6b64\u53ef\u89c1\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"visibility")," \u5728\u94fe\u63a5\u9636\u6bb5\u751f\u6548\u3002\u67e5\u770b\u5176\u5bfc\u51fa\u7b26\u53f7\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"objdump --macho --exports-trie a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Exports trie:\n0x100000000  __mh_execute_header\n0x100004000  _default_int_value\n0x100003F8C  _main\n")),(0,i.kt)("p",null,"\u901a\u5e38\u5728\u7f16\u5199\u5e93\u7684\u65f6\u5019\uff0c\u4f1a\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"-fvisibility=hidden")," \u9009\u9879\u8ba9\u6240\u6709\u7b26\u53f7\u9ed8\u8ba4\u9690\u85cf\uff0c\u4ee5\u51cf\u5c0f\u5e93\u7684\u4f53\u79ef\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"clang -fvisibility=hidden main.c && objdump --macho --syms a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000100003f8c l     F __TEXT,__text _main\n0000000100004000 l     O __DATA,__data _global_int_value\n0000000100004004 l     O __DATA,__data _static_int_value\n0000000100000000 g     F __TEXT,__text __mh_execute_header\n")),(0,i.kt)("p",null,"\u5bf9\u4e8e\u9700\u8981\u5bfc\u51fa\u7ed9\u5916\u90e8\u4f7f\u7528\u7684\u7b26\u53f7\uff0c\u518d\u663e\u5f0f\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},'__attribute__((visibility("default")))')," \u4fee\u9970\u3002"),(0,i.kt)("h2",{id:"\u5916\u90e8\u7b26\u53f7"},"\u5916\u90e8\u7b26\u53f7"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},'#import <Foundation/Foundation.h>\n\nint main () {\n    NSLog(@"Hello, world!");\n    return 0;\n}\n')),(0,i.kt)("p",null,"\u7f16\u8bd1\u5e76\u67e5\u770b\u5176\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -fobjc-arc -c main.m && objdump --macho --syms main.o")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000000000000 l     F __TEXT,__text ltmp0\n0000000000000048 l     O __DATA,__cfstring l__unnamed_cfstring_\n0000000000000034 l     O __TEXT,__cstring ltmp1\n0000000000000034 l     O __TEXT,__cstring l_.str\n0000000000000048 l     O __DATA,__cfstring ltmp2\n0000000000000068 l     O __DATA,__objc_imageinfo ltmp3\n0000000000000070 l     O __LD,__compact_unwind ltmp4\n0000000000000000 g     F __TEXT,__text _main\n0000000000000000         *UND* _NSLog\n0000000000000000         *UND* ___CFConstantStringClassReference\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"NSLog")," \u5bf9\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"main.o")," \u8fd9\u4e2a Mach-O \u6765\u8bf4\uff0c\u662f",(0,i.kt)("strong",{parentName:"p"},"\u5916\u90e8\u7b26\u53f7"),"\uff0c\u5b83\u73b0\u5728\u5904\u4e8e",(0,i.kt)("strong",{parentName:"p"},"\u672a\u5b9a\u4e49"),"\u7684\u72b6\u6001\u3002"),(0,i.kt)("p",null,"\u94fe\u63a5\u5e76\u67e5\u770b\u5176\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -fobjc-arc main.o && objdump --macho --syms a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000100000000 g     F __TEXT,__text __mh_execute_header\n0000000100003f68 g     F __TEXT,__text _main\n0000000000000000         *UND* _NSLog\n0000000000000000         *UND* ___CFConstantStringClassReference\n")),(0,i.kt)("p",null,"\u94fe\u63a5\u540e\uff0c\u5176\u5916\u90e8\u7b26\u53f7\u4f1a\u88ab\u653e\u5230",(0,i.kt)("strong",{parentName:"p"},"\u95f4\u63a5\u7b26\u53f7\u8868"),"\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"objdump --macho --indirect-symbols a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Indirect symbols for (__TEXT,__stubs) 1 entries\naddress            index name\n0x0000000100003f9c     2 _NSLog\nIndirect symbols for (__DATA_CONST,__got) 1 entries\naddress            index name\n0x0000000100004000     2 _NSLog\n")),(0,i.kt)("p",null,"\u6240\u4ee5\uff0c\u95f4\u63a5\u7b26\u53f7\u8868\u7684\u7b26\u53f7\u662f\u4e0d\u80fd\u8131\u53bb\u7684\uff0c\u91cc\u9762\u5b58\u653e\u7684\u662f\u5176\u5b83\u52a8\u6001\u5e93\u7684\u5bfc\u51fa\u7b26\u53f7\u3002"),(0,i.kt)("h2",{id:"oc-\u7684\u7b26\u53f7"},"OC \u7684\u7b26\u53f7"),(0,i.kt)("p",null,"OC \u7684\u6240\u6709\u7c7b\u5728\u7f16\u8bd1\u7684\u65f6\u5019\uff0c\u9ed8\u8ba4\u90fd\u662f\u5168\u5c40\u7b26\u53f7\uff0c\u5e76\u4e14\u4f1a\u88ab\u5bfc\u51fa\uff0c\u5373\u4f7f\u65b9\u6cd5\u6ca1\u6709\u5728\u5934\u6587\u4ef6\u91cc\u58f0\u660e\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-objc"},'#import <Foundation/Foundation.h>\n@interface Demo : NSObject\n@end\n@implementation Demo\n- (void)hello {\n    NSLog(@"Hello world!");\n}\n@end\n')),(0,i.kt)("p",null,"\u7f16\u8bd1\u3001\u94fe\u63a5\u3001\u67e5\u770b\u5176\u5bfc\u51fa\u7b26\u53f7\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -fobjc-arc main.m && objdump --macho --exports-trie a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Exports trie:\n0x1000080C0  _OBJC_CLASS_$_Demo\n0x100008098  _OBJC_METACLASS_$_Demo\n0x100000000  __mh_execute_header\n0x100003F58  _main\n")),(0,i.kt)("p",null,"\u53ef\u4ee5\u4f20\u94fe\u63a5\u5668\u53c2\u6570\uff0c\u6307\u5b9a\u67d0\u4e2a\u7b26\u53f7\u4e0d\u5bfc\u51fa\uff0c\u8fd8\u53ef\u4ee5\u4f7f\u7528\u6587\u4ef6\u6765\u5217\u51fa\u4e0d\u9700\u8981\u5bfc\u51fa\u7684\u7b26\u53f7\uff1a"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"clang -fobjc-arc -Xlinker -unexported_symbol -Xlinker '_OBJC_CLASS_$_Demo' main.m && objdump --macho --exports-trie a.out")),(0,i.kt)("p",null,"\u6ce8\u610f\u8fd9\u91cc\u7b26\u53f7 ",(0,i.kt)("inlineCode",{parentName:"p"},"_OBJC_CLASS_$_Demo")," \u7528\u4e86\u5355\u5f15\u53f7\u62ec\u4f4f\uff0c\u8fd9\u662f\u7531\u4e8e shell \u91cc\u7f8e\u91d1\u7b26\u53f7\u6709\u7279\u6b8a\u542b\u4e49\u3002"),(0,i.kt)("h2",{id:"swift-\u7684\u7b26\u53f7"},"Swift \u7684\u7b26\u53f7"),(0,i.kt)("p",null,"Swift \u4e2d ",(0,i.kt)("inlineCode",{parentName:"p"},"public")," \u4fee\u9970\u7684\u51fd\u6570\u548c\u7c7b\u4f1a\u6210\u4e3a\u5bfc\u51fa\u7b26\u53f7\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-swift"},'private func p_greet() {\n  print("Hello, World!")\n}\n\nfunc greet() {\n  print("Hello, World!")\n}\n\npublic func g_greet() {\n  print("Hello, World!")\n}\n')),(0,i.kt)("p",null,"\u7f16\u8bd1\u5e76\u67e5\u770b\u5176\u5bfc\u51fa\u7b26\u53f7\u8868\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"swiftc main.swift && objdump --macho --exports-trie main")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Exports trie:\n0x100003E74  _$s4main7g_greetyyF\n0x100000000  __mh_execute_header\n0x100003D08  _main\n")),(0,i.kt)("h2",{id:"\u5f31\u5b9a\u4e49\u7b26\u53f7\u548c\u5f31\u5f15\u7528\u7b26\u53f7"},"\u5f31\u5b9a\u4e49\u7b26\u53f7\u548c\u5f31\u5f15\u7528\u7b26\u53f7"),(0,i.kt)("p",null,"\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"__attribute__((weak))")," \u6765\u5b9a\u4e49\u5f31\u5b9a\u4e49\u7b26\u53f7\u3002\u94fe\u63a5\u65f6\uff0c\u5982\u679c\u6709\u4e00\u4e2a\u5f3a\u7b26\u53f7\u548c\u591a\u4e2a\u5f31\u7b26\u53f7\u540c\u540d\uff0c\u4f1a\u94fe\u63a5\u5f3a\u7b26\u53f7\uff0c\u4e0d\u4f1a\u62a5\u9519\u3002"),(0,i.kt)("p",null,"\u5f31\u5b9a\u4e49\u7b26\u53f7\u9ed8\u8ba4\u4e3a\u5168\u5c40\u7b26\u53f7\u3002\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},'__attribute__((weak, visibility("hidden")))')," \u5c06\u5176\u53d8\u4e3a\u672c\u5730\u7b26\u53f7\u3002"),(0,i.kt)("p",null,"\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"__attribute__((weak_import))")," \u6765\u5b9a\u4e49\u5f31\u5f15\u7528\u7b26\u53f7\u3002\u5f31\u5f15\u7528\u7b26\u53f7\u5982\u679c\u6ca1\u6709\u65b9\u6cd5\u5b9e\u73b0\uff0c\u4f1a\u62a5 ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined symbol")," \u9519\u8bef\u3002"),(0,i.kt)("p",null,"\u53ef\u4ee5\u901a\u8fc7\u4f20\u94fe\u63a5\u5668\u53c2\u6570\uff0c\u5141\u8bb8\u5f31\u5f15\u7528\u7b26\u53f7\u672a\u5b9e\u73b0\uff08\u5373\u8fd0\u884c\u65f6\u52a8\u6001\u67e5\u627e\uff09\u3002"),(0,i.kt)("p",null,"\u5f31\u5f15\u7528\u7b26\u53f7\u4e5f\u662f\u5168\u5c40\u7b26\u53f7\u3002"),(0,i.kt)("p",null,"\u5f31\u7b26\u53f7\u53ef\u4ee5\u7528\u6765\u505a\u7248\u672c\u9002\u914d\u76f8\u5173\u7684\u5de5\u4f5c\uff0c\u5047\u8bbe\u6709\u4e00\u4e2a API \u5728 iOS 10 \u4e0d\u53ef\u7528\uff0ciOS 11 \u4e2d\u53ef\u7528\uff0c\u5c31\u53ef\u4ee5\u4f7f\u7528\u5f31\u7b26\u53f7\u3002"),(0,i.kt)("h2",{id:"\u8c03\u8bd5\u7b26\u53f7"},"\u8c03\u8bd5\u7b26\u53f7"),(0,i.kt)("p",null,"\u7f16\u8bd1\u3001\u94fe\u63a5\u4f20 ",(0,i.kt)("inlineCode",{parentName:"p"},"-g")," \u53c2\u6570\uff0c\u4f1a\u751f\u6210\u8c03\u8bd5\u7b26\u53f7\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -g main.c && objdump --macho --syms a.out")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SYMBOL TABLE:\n0000000100004004 l     O __DATA,__data _static_int_value\n0000000000000000      d  *UND*\n0000000000000000      d  *UND* /Users/yianzhou/Documents/megabox/examples/macOS/symbols/\n0000000000000000      d  *UND* main.c\n0000000063ce2b2d      d  *UND* /var/folders/yb/d6gg31rn7snd9rnp12sctfb00000gn/T/main-ac0949.o\n0000000100003f8c      d  *UND*\n0000000100003f8c      d  *UND* _main\n000000000000002c      d  *UND*\n0000000100003f8c      d  *UND*\n0000000000000000      d  *UND* _global_int_value\n0000000100004004      d  *UND* _static_int_value\n0000000000000000      d  *UND*\n0000000100000000 g     F __TEXT,__text __mh_execute_header\n0000000100004000 g     O __DATA,__data _global_int_value\n0000000100003f8c g     F __TEXT,__text _main\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"d")," \u8868\u793a\u8c03\u8bd5\u7b26\u53f7\u3002\u540c\u65f6\uff0c\u540c\u76ee\u5f55\u4e0b\u4f1a\u751f\u6210 ",(0,i.kt)("inlineCode",{parentName:"p"},"a.out.dSYM")," \u6587\u4ef6\u3002"),(0,i.kt)("p",null,"\u6ce8\u610f\uff0c\u8fd9\u91cc ",(0,i.kt)("inlineCode",{parentName:"p"},"dSYM")," \u6587\u4ef6\u4e0d\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"clang")," \u751f\u6210\u7684\uff0c\u800c\u662f\u82f9\u679c\u7684\u53e6\u4e00\u4e2a\u5de5\u5177\u53eb ",(0,i.kt)("inlineCode",{parentName:"p"},"dsymutil"),"\uff0c\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"clang -g main.c --verbose")," \u6307\u4ee4\uff0c\u53ef\u4ee5\u770b\u5230\u8f93\u51fa\u91cc\u6709\u8c03\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"dsymutil")," \u7684\u6307\u4ee4\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'"/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/dsymutil" -o a.out.dSYM a.out\n')),(0,i.kt)("h2",{id:"\u7b26\u53f7\u91cd\u540d"},"\u7b26\u53f7\u91cd\u540d"),(0,i.kt)("p",null,"\u540c\u4e00\u4e2a\u53ef\u6267\u884c\u6587\u4ef6\u4e2d\uff0c\u4e0d\u80fd\u6709\u91cd\u540d\u7684\u7b26\u53f7\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:t(24295).Z,width:"1248",height:"222"})),(0,i.kt)("p",null,"\u4e0d\u540c\u7684\u53ef\u6267\u884c\u6587\u4ef6\u4e2d\uff0c\u53ef\u80fd\u5b58\u5728\u91cd\u540d\u7684\u7b26\u53f7\u3002\u5047\u8bbe A \u58f0\u660e\u4e86 ",(0,i.kt)("inlineCode",{parentName:"p"},"int global_init_value = 10"),"\uff0cA \u94fe\u63a5\u4e86\u52a8\u6001\u5e93 B\uff0c\u5176\u4e2d\u58f0\u660e\u4e86\u540c\u540d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"int global_init_value = 20"),"\uff0c\u90a3\u4e48\uff0c\u5728 A \u91cc\u9762\u8bfb\u53d6 ",(0,i.kt)("inlineCode",{parentName:"p"},"global_init_value")," \u7ed3\u679c\u4f1a\u662f\u4ec0\u4e48\u5462\uff1f"),(0,i.kt)("p",null,"\u2014\u2014\u7ed3\u679c\u662f 10\u3002\u539f\u56e0\u662f\u94fe\u63a5\u5668\u9ed8\u8ba4\u91c7\u7528\u4e8c\u7ea7\u547d\u540d\u7a7a\u95f4\uff0c\u9664\u4e86\u8bb0\u5f55\u7b26\u53f7\u540d\u79f0\uff0c\u8fd8\u4f1a\u8bb0\u5f55\u7b26\u53f7\u5c5e\u4e8e\u54ea\u4e2a\u53ef\u6267\u884c\u6587\u4ef6\uff0c\u4f18\u5148\u4f7f\u7528\u672c\u53ef\u6267\u884c\u6587\u4ef6\u7684\u7b26\u53f7\u3002"),(0,i.kt)("h2",{id:"\u91cd\u5b9a\u4f4d\u7b26\u53f7"},"\u91cd\u5b9a\u4f4d\u7b26\u53f7"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"void test() {}\nint main () {\n    test();\n    return 0;\n}\n")),(0,i.kt)("p",null,"\u7f16\u8bd1\u5e76\u67e5\u770b\u5176\u4ee3\u7801\u6bb5\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang -c main.c && objdump --macho -d main.o"),"\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"img",src:t(42020).Z,width:"1078",height:"538"})),(0,i.kt)("p",null,"\u7b2c\u4e00\u5217\u662f\u76f8\u5bf9\u4e8e\u6587\u4ef6\u7684\u504f\u79fb\u91cf\uff0c\u7b2c\u4e8c\u5217\u662f\u673a\u5668\u7801\u6307\u4ee4\uff0c\u7b2c\u4e09\u5217\u662f\u6c47\u7f16\u4ee3\u7801\u3002"),(0,i.kt)("p",null,"\u5173\u6ce8\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"1c")," \u8fd9\u4e00\u884c\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"test")," \u51fd\u6570\u6b64\u65f6\u6307\u4ee4\u90fd\u662f 0\uff0c\u8fd9\u662f\u7531\u4e8e\u5728\u94fe\u63a5\u65f6\u624d\u4f1a\u5206\u914d\u771f\u5b9e\u7684\u865a\u62df\u5185\u5b58\u5730\u5740\uff0c\u6240\u4ee5\u6682\u65f6\u7528 0 \u5730\u5740\u5360\u4f4d\u3002"),(0,i.kt)("p",null,"\u5982\u679c\u60f3\u5728\u94fe\u63a5\u65f6\uff0c\u544a\u8bc9\u94fe\u63a5\u5668\u6b64\u6307\u4ee4\u9700\u8981\u66ff\u6362\u6210\u771f\u5b9e\u7684\u865a\u62df\u5185\u5b58\u5730\u5740\uff0c\u5219\u5fc5\u987b\u5c06\u5176\u5b58\u50a8\u5230\u91cd\u5b9a\u4f4d\u7b26\u53f7\u8868\u4e2d\u3002\u5728\u94fe\u63a5\u9636\u6bb5\u8fdb\u884c\u91cd\u5b9a\u4f4d\u3002"),(0,i.kt)("p",null,"\u67e5\u770b\u91cd\u5b9a\u4f4d\u7b26\u53f7\u8868\u4fe1\u606f\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"objdump --macho --reloc main.o")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Relocation information (__TEXT,__text) 1 entries\naddress  pcrel length extern type    scattered symbolnum/value\n0000001c True  long   True   BR26    False     _test\n\nRelocation information (__LD,__compact_unwind) 2 entries\naddress  pcrel length extern type    scattered symbolnum/value\n00000020 False ?( 3)  False  UNSIGND False     1 (__TEXT,__text)\n00000000 False ?( 3)  False  UNSIGND False     1 (__TEXT,__text)\n")),(0,i.kt)("p",null,"\u53ef\u4ee5\u770b\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"0000001c")," \u8fd9\u4e2a\u504f\u79fb\u91cf\u7684\u6307\u4ee4\u9700\u8981\u91cd\u5b9a\u4f4d\u3002"),(0,i.kt)("p",null,"\u94fe\u63a5\u5e76\u67e5\u770b\u5176\u4ee3\u7801\u6bb5\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"clang main.o && objdump --macho -d a.out"),"\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(__TEXT,__text) section\n_test:\n100003f80:  c0 03 5f d6 ret\n_main:\n100003f84:  ff 83 00 d1 sub sp, sp, #32\n100003f88:  fd 7b 01 a9 stp x29, x30, [sp, #16]\n100003f8c:  fd 43 00 91 add x29, sp, #16\n100003f90:  08 00 80 52 mov w8, #0\n100003f94:  e8 0b 00 b9 str w8, [sp, #8]\n100003f98:  bf c3 1f b8 stur    wzr, [x29, #-4]\n100003f9c:  f9 ff ff 97 bl  _test\n100003fa0:  e0 0b 40 b9 ldr w0, [sp, #8]\n100003fa4:  fd 7b 41 a9 ldp x29, x30, [sp, #16]\n100003fa8:  ff 83 00 91 add sp, sp, #32\n100003fac:  c0 03 5f d6 ret\n")),(0,i.kt)("p",null,"\u7b2c\u4e00\u5217\u662f\u865a\u62df\u5185\u5b58\u5730\u5740\uff0c\u56fa\u5b9a\u4ece 100000000 \u5f00\u59cb\uff0c\u5373 4GB \u7684 PAGEZERO\uff1b\u7b2c\u4e8c\u5217\u662f\u673a\u5668\u7801\u6307\u4ee4\uff0c\u7b2c\u4e09\u5217\u662f\u6c47\u7f16\u4ee3\u7801\u3002"),(0,i.kt)("p",null,"\u53ef\u4ee5\u770b\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"_test")," \u51fd\u6570\u7684\u6307\u4ee4\u5df2\u7ecf\u6709\u4e86\u5177\u4f53\u7684\u5730\u5740\u3002"),(0,i.kt)("h2",{id:"\u7ec8\u7aef\u8bfb\u53d6-mach-o"},"\u7ec8\u7aef\u8bfb\u53d6 Mach-O"),(0,i.kt)("p",null,"\u5728\u7ec8\u7aef\u8f93\u5165 ",(0,i.kt)("inlineCode",{parentName:"p"},"tty")," \u53ef\u4ee5\u83b7\u5f97\u5f53\u524d\u7ec8\u7aef\u7a97\u53e3\u7684\u94fe\u63a5\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"/dev/ttys005"),"\uff0c\u6267\u884c\u811a\u672c\u65f6 ",(0,i.kt)("inlineCode",{parentName:"p"},"> /dev/ttys005")," \u5373\u53ef\u8f93\u51fa\u5230\u8fd9\u4e2a\u7ec8\u7aef\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"objdump")," prints the contents of object files and final linked images named on the command line."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# \u8f93\u51fa mach header\nobjdump --macho --private-header machoinfo\n# \u8bfb\u53d6\u76ee\u6807\u6587\u4ef6\u4e2d\u7684\u91cd\u5b9a\u4f4d\u4fe1\u606f\nobjdump --macho --reloc main.o\n# \u8bfb\u53d6\u7b26\u53f7\u8868\u4fe1\u606f\nobjdump --macho --syms MachOAndSymbol\n# \u67e5\u770b `__TEXT` \u6bb5\nobjdump --macho -d MachOAndSymbol\n# \u67e5\u770b\u5bfc\u51fa\u7b26\u53f7\nobjdump --macho --exports-trie MachOAndSymbol\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"otool")," is the preferred tool for inspecting Mach-O binaries."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"otool --help # \u9664\u4e86 man otool \u5916\uff0c\u4e5f\u53ef\u4ee5\u4f7f\u7528 --help \u8f93\u51fa\u7b80\u77ed\u7684\u4f7f\u7528\u8bf4\u660e\notool -h machoinfo # print the mach header\notool -l machoinfo # print the load commands\n")),(0,i.kt)("h2",{id:"\u7a0b\u5e8f\u8bfb\u53d6-mach-o"},"\u7a0b\u5e8f\u8bfb\u53d6 Mach-O"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"main")," \u51fd\u6570\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"argv")," \u53c2\u6570\u662f\u4e2a\u6570\u7ec4\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"argv[0]")," \u662f\u672c\u53ef\u6267\u884c\u6587\u4ef6\u7684\u8def\u5f84\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"argv[1]")," \u662f\u4f20\u5165\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'extern void dump_segments(FILE *obj_file);\n\nint main(int argc, char *argv[]) {\n    const char *filename = argv[1];\n    FILE *obj_file = fopen(filename, "rb");\n    dump_segments(obj_file);\n    fclose(obj_file);\n\n    (void)argc; // suppressing the warning of unused function argument issued by some compilers\n    return 0;\n}\n')),(0,i.kt)("p",null,"\u8ba9 ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," \u51fd\u6570\u7684\u5165\u53c2\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"machoinfo")," \u53ef\u6267\u884c\u6587\u4ef6\u7684\u8def\u5f84\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"$(BUILD_ROOT)/$(CONFIGURATION)/$(EXECUTABLE_NAME)"),"\uff0c\u7136\u540e\u7528\u7a0b\u5e8f\u8bfb\u53d6\u5176 Mach-O \u4fe1\u606f\u3002"),(0,i.kt)("p",null,"Mach-O \u5f00\u5934\u7684 4 \u4e2a\u5b57\u8282 ",(0,i.kt)("inlineCode",{parentName:"p"},"uint32_t magic")," \u662f\u4e2a\u9b54\u6570\uff0c\u5b58\u50a8\u7684\u4fe1\u606f\u4ee3\u8868\u4e86\u6b64 Mach-O \u7684\u4e00\u4e9b\u57fa\u672c\u683c\u5f0f\u3002"),(0,i.kt)("p",null,"\u4f8b\u5982\uff0c\u5982\u679c\u8fd9\u662f\u4e00\u4e2a 64 \u4f4d\u7684 Mach-O\uff0c\u5219\u6587\u4ef6\u7684\u9996\u5b57\u8282\u5f00\u59cb\uff0c\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"struct mach_header_64"),"\uff0c\u5360 32 \u4e2a\u5b57\u8282\u3002"),(0,i.kt)("p",null,"\uff08\u4ee5\u4e0b\u6e90\u7801\u5728 macOS/Frameworks/Kernel \u91cc\u53ef\u4ee5\u627e\u5230\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='Mach-O/loader.h'",title:"'Mach-O/loader.h'"},"struct mach_header_64 {\n    uint32_t    magic;      /* mach magic number identifier */\n    cpu_type_t  cputype;    /* cpu specifier */\n    cpu_subtype_t   cpusubtype; /* machine specifier */\n    uint32_t    filetype;   /* type of file */\n    uint32_t    ncmds;      /* number of load commands */\n    uint32_t    sizeofcmds; /* the size of all the load commands */\n    uint32_t    flags;      /* flags */\n    uint32_t    reserved;   /* reserved */\n};\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"struct mach_header_64")," \u4e4b\u540e\uff0c\u5219\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"ncmds")," \u4e2a LC (load command)\u3002"),(0,i.kt)("p",null,"\u8bfb\u53d6 LC \u65f6\uff0c\u5148\u8bfb\u51fa\u6bcf\u4e2a LC \u7684\u524d\u9762 ",(0,i.kt)("inlineCode",{parentName:"p"},"sizeof(struct load_command)")," \u4e2a\u5b57\u8282\uff0c"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='Mach-O/loader.h'",title:"'Mach-O/loader.h'"},"struct load_command {\n    uint32_t cmd;       /* type of load command */\n    uint32_t cmdsize;   /* total size of command in bytes */\n};\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"cmd")," \u7684\u503c\u5c31\u4ee3\u8868\u4e86\u8fd9\u4e2a LC \u7684\u7ed3\u6784\u4f53\u7c7b\u578b\u3002\u4f8b\u5982 ",(0,i.kt)("inlineCode",{parentName:"p"},"LC_MAIN")," \u7684\u7ed3\u6784\u4f53\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='Mach-O/loader.h'",title:"'Mach-O/loader.h'"},"struct entry_point_command {\n    uint32_t  cmd;  /* LC_MAIN only used in MH_EXECUTE filetypes */\n    uint32_t  cmdsize;  /* 24 */\n    uint64_t  entryoff; /* file (__TEXT) offset of main() */\n    uint64_t  stacksize;/* if not zero, initial stack size */\n};\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"machoinfo")," \u8fd9\u4e2a\u4e8c\u8fdb\u5236\u6587\u4ef6\u7684 LC \u4fe1\u606f\u8f93\u51fa\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"LC: 0 segname: __PAGEZERO vmaddr: 0 nsects: 0 filesize: 0 vmsize: 4294967296\nLC: 1 segname: __TEXT vmaddr: 100000000 nsects: 5 filesize: 32768 vmsize: 32768\nLC: 2 segname: __DATA_CONST vmaddr: 100008000 nsects: 2 filesize: 16384 vmsize: 16384\nLC: 3 segname: __DATA vmaddr: 10000c000 nsects: 2 filesize: 16384 vmsize: 16384\nLC: 4 segname: __LINKEDIT vmaddr: 100010000 nsects: 0 filesize: 28160 vmsize: 32768\nLC: 5 LC_DYLD_INFO_ONLY rebase_off: 65536 rebase_size: 16 bind_off: 65552 bind_size: 64 weak_bind_off: 0 weak_bind_size: 0 lazy_bind_off: 65616 lazy_bind_size: 1072 export_off: 66688 export_size: 64\nLC: 6 LC_SYMTAB symoff: 66832 nsyms: 250 stroff: 71184 strsize: 3144\nLC: 7 LC_DYSYMTAB indirectsymoff: 70832\nLC: 8 LC_LOAD_DYLINKER dyld: /usr/lib/dyld\nLC: 9 LC_UUID uuid 1E1BE742-5EAA-35E3-A717-80FAD898B4A0\nLC: 10 LC_BUILD_VERSION platform: macos, sdk: 12.3, minos: 11.1, ntools: 1\nLC: 11 LC_SOURCE_VERSION version: 0.0\nLC: 12 LC_MAIN entryoff: 15420 stacksize: 0\nLC: 13 LC_LOAD_DYLIB dylid: /System/Library/Frameworks/Foundation.framework/Versions/C/Foundation\nLC: 14 LC_LOAD_DYLIB dylid: /usr/lib/libobjc.A.dylib\nLC: 15 LC_LOAD_DYLIB dylid: /usr/lib/libSystem.B.dylib\nLC: 16 LC_FUNCTION_STARTS cmdsize: 16 dataoff: 66752 datasize: 80\nLC: 17 LC_DATA_IN_CODE cmdsize: 16 dataoff: 66832 datasize: 0\nLC: 18 LC_CODE_SIGNATURE cmdsize: 16 dataoff: 74336 datasize: 19360\n")),(0,i.kt)("p",null,"\u6ce8\u610f\u4e0a\u9762\u7684\u8f93\u51fa\uff0c\u524d\u9762 LC0 - LC4 \u7684\u7ed3\u6784\u4f53\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"struct segment_command_64"),"\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='Mach-O/loader.h'",title:"'Mach-O/loader.h'"},"struct segment_command_64 { /* for 64-bit architectures */\n    uint32_t    cmd;        /* LC_SEGMENT_64 */\n    uint32_t    cmdsize;    /* includes sizeof section_64 structs */\n    char        segname[16];    /* segment name */\n    uint64_t    vmaddr;     /* memory address of this segment */\n    uint64_t    vmsize;     /* memory size of this segment */\n    uint64_t    fileoff;    /* file offset of this segment */\n    uint64_t    filesize;   /* amount to map from the file */\n    vm_prot_t   maxprot;    /* maximum VM protection */\n    vm_prot_t   initprot;   /* initial VM protection */\n    uint32_t    nsects;     /* number of sections in segment */\n    uint32_t    flags;      /* flags */\n};\n")),(0,i.kt)("p",null,"\u5728\u8fd9\u4e2a Mach-O \u4e8c\u8fdb\u5236\u91cc\uff0cLoad Commands \u7ed3\u675f\u540e\uff0c\u7d27\u63a5\u7740\u5b58\u653e\u7684\u4fe1\u606f\u5c31\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"__TEXT"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"__DATA_CONST"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"__DATA"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"__LINKEDIT"),"\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"__PAGEZERO")," \u6587\u4ef6\u5927\u5c0f\u4e3a 0\uff0c\u5b83\u5360\u7528 4294967296 \u7684\u865a\u62df\u5185\u5b58\u7a7a\u95f4\uff0c\u521a\u597d\u662f 2 \u7684 32 \u6b21\u65b9\uff0832 \u4f4d\u7a0b\u5e8f\u7684\u6307\u9488\u5bfb\u5740\u8303\u56f4\uff09\uff0c\u8fd9\u662f\u4e3a\u4e86\u9694\u7edd 32 \u4f4d\u7a0b\u5e8f"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"__TEXT")," \u6bb5\u6709 5 \u4e2a section\uff08nsects: 5\uff09"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"__DATA_CONST")," \u6bb5\u6709 2 \u4e2a section\uff08nsects: 2\uff09"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"__DATA")," \u6bb5 \u6709 2 \u4e2a section\uff08nsects: 2\uff09")),(0,i.kt)("p",null,"LC6 \u4ee3\u8868\u7b26\u53f7\u8868\uff0cLC7 \u4ee3\u8868\u95f4\u63a5\u7b26\u53f7\u8868\u3002"),(0,i.kt)("p",null,"LC13 - LC15 \u5373\u4ee3\u8868\u8fd9\u4e2a\u4e8c\u8fdb\u5236\u6587\u4ef6\u7528\u5230\u7684\u52a8\u6001\u5e93\uff0c\u7ed3\u6784\u4f53\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"struct dylib_command"),"\uff0c\u5728\u8fd0\u884c\u65f6 dyld \u4f1a\u52a0\u8f7d\u8fd9\u4e9b\u52a8\u6001\u5e93\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:"title='Mach-O/loader.h'",title:"'Mach-O/loader.h'"},"struct dylib_command {\n    uint32_t cmd; /* LC_ID_DYLIB, LC_LOAD_{,WEAK_}DYLIB, LC_REEXPORT_DYLIB */\n    uint32_t cmdsize; /* includes pathname string */\n    struct dylib dylib; /* the library identification */\n};\n")))}d.isMDXComponent=!0},42020:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/00AC24D9-9AEC-4579-A6F4-A349738FA5D6-662bc3a3b78546628bdae3cbe614f8bd.png"},58861:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/184275AA-0107-4039-BA26-F6D1B7EDF5ED-cb05227fe74a731e29c4bcf73c01c680.png"},24295:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/D9034377-360D-419E-ACEF-5075E1C7B3EF-4a01e516f3acd5624bc1e0e9b5bf6756.png"}}]);