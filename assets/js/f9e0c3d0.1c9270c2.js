"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3722],{63743:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var n=a(87462),i=(a(67294),a(3905));a(61839);const r={},o="CMake",l={unversionedId:"cmake",id:"cmake",title:"CMake",description:"CMake Reference Documentation",source:"@site/docs/language/cmake.md",sourceDirName:".",slug:"/cmake",permalink:"/docs/language/cmake",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"C",permalink:"/docs/language/"},next:{title:"C++",permalink:"/docs/language/cpp"}},s={},c=[{value:"CMake Commands",id:"cmake-commands",level:2},{value:"CMake Cache",id:"cmake-cache",level:2},{value:"CMakeLists.txt",id:"cmakeliststxt",level:2}],p={toc:c};function d(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"cmake"},"CMake"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://cmake.org/cmake/help/latest/manual/cmake.1.html"},"CMake Reference Documentation")),(0,i.kt)("p",null,"Today CMake generates modern buildsystems such as Ninja as well as project files for IDEs such as Visual Studio and Xcode."),(0,i.kt)("h2",{id:"cmake-commands"},"CMake Commands"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"cmake ./CMakeLists.txt \\\n   -B ./out \\\n   -G Xcode \\\n   -DCMAKE_TOOLCHAIN_FILE=./ios.toolchain.cmake \\\n   -DPLATFORM=OS64COMBINED \\\n   -DDEPLOYMENT_TARGET=11.0 \\\n   -DENABLE_BITCODE=NO \\\n   -DENABLE_ARC=YES \\\n   -DDEFINES_MODULE=YES \\\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"-B ./out"),": Path to directory which CMake will use as the root of build directory."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"-G Xcode"),": Specify a build system generator. ",(0,i.kt)("inlineCode",{parentName:"p"},"cmake --help")," output lists available generators on the current platform."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"-D"),": Create or update a CMake CACHE entry."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"CMAKE_TOOLCHAIN_FILE"),": a file which is read early in the CMake run and which specifies target platform and compiler related information."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"PLATFORM=OS64COMBINED"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ios.toolchain.cmake")," \u6587\u4ef6\u91cc\u5b9a\u4e49\u7684\uff0c\u8fd9\u4e2a\u6587\u4ef6\u53ef\u4ee5\u5728 ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/leetal/ios-cmake"},"https://github.com/leetal/ios-cmake")," \u4e0b\u8f7d"),(0,i.kt)("h2",{id:"cmake-cache"},"CMake Cache"),(0,i.kt)("p",null,"The first time CMake is run on a project, it produces a ",(0,i.kt)("inlineCode",{parentName:"p"},"CMakeCache.txt")," file. It may be thought of as a configuration file."),(0,i.kt)("p",null,"To create a variable in the cache, use commands like ",(0,i.kt)("inlineCode",{parentName:"p"},"option"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"find_file"),", or the standard ",(0,i.kt)("inlineCode",{parentName:"p"},"set")," command with the CACHE option."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'option(USE_JPEG "Do you want to use the jpeg library")\n\nset(USE_JPEG ON CACHE BOOL "include jpeg support?")\n')),(0,i.kt)("p",null,"When you use the CACHE option, you may also provide the type of the variable and a documentation string."),(0,i.kt)("p",null,"Once a variable is in the cache, its \u201ccache\u201d value cannot normally be modified from a CMakeLists file. A ",(0,i.kt)("inlineCode",{parentName:"p"},'set(FOO ON CACHE BOOL "doc")')," command will typically only do something when the cache doesn\u2019t have the variable in it. Once the variable is in the cache, that command will have no effect."),(0,i.kt)("p",null,"In the rare event that you really want to change a cached variable\u2019s value, use the ",(0,i.kt)("inlineCode",{parentName:"p"},"FORCE")," option in combination with the ",(0,i.kt)("inlineCode",{parentName:"p"},"CACHE")," option to the ",(0,i.kt)("inlineCode",{parentName:"p"},"set")," command."),(0,i.kt)("p",null,"If a variable is in the cache, it can still be overridden in a CMakeLists file using the ",(0,i.kt)("inlineCode",{parentName:"p"},"set")," command without the ",(0,i.kt)("inlineCode",{parentName:"p"},"CACHE")," option. The set command will define a variable for the current scope without changing the value in the cache."),(0,i.kt)("p",null,"To restrict a cache entry to a limited set of predefined options:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'set(CRYPTOBACKEND "OpenSSL" CACHE STRING "Select a cryptography backend")\nset_property(CACHE CRYPTOBACKEND PROPERTY STRINGS "OpenSSL" "LibTomCrypt" "LibDES")\n')),(0,i.kt)("h2",{id:"cmakeliststxt"},"CMakeLists.txt"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'# \u8bbe\u7f6e Xcode Build Settings\uff1a\n# 1. Debug \u6216\u6a21\u62df\u5668\u751f\u6210 dwarf\uff08\u4e0d\u751f\u6210 dsym\uff09\uff0c\u52a0\u5feb\u7f16\u8bd1\u901f\u5ea6\n# 2. Release + ARM64 \u67b6\u6784\u751f\u6210 dwarf-with-dsym\uff0c\u7528\u4e8e\u8fd8\u539f\u7ebf\u4e0a\u5806\u6808\u7684\u7b26\u53f7\nfunction(setDebugSymbolsAndDebugInformationFormat target)\n    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Debug] "dwarf")\n    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS[variant=Debug] "YES")\n    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Release][sdk=iphonesimulator*] "dwarf")\n    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS[variant=Release][sdk=iphonesimulator*] "YES")\n    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Release][sdk=iphoneos*] "dwarf-with-dsym")\n    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS[variant=Release][sdk=iphoneos*] "YES")\nendfunction()\n\nfunction (setToAllTargets current_dir)\n    # \u5bf9\u5f53\u524d\u76ee\u5f55\u4e0b\u7684 targets \u6267\u884c setDebugSymbolsAndDebugInformationFormat \u51fd\u6570\n    get_property(targets DIRECTORY ${current_dir} PROPERTY BUILDSYSTEM_TARGETS)\n    foreach(target ${targets})\n        setDebugSymbolsAndDebugInformationFormat(${target})\n        message("\u8bbe\u7f6e Xcode Build Settings --- " ${target})\n    endforeach()\n\n    # \u9012\u5f52\u5bf9\u5f53\u524d\u76ee\u5f55\u4e0b\u7684\u6240\u6709\u5b50\u76ee\u5f55\u6267\u884c setToAllTargets \u51fd\u6570\n    get_property(subdirs DIRECTORY ${current_dir} PROPERTY SUBDIRECTORIES)\n    foreach(subdir ${subdirs})\n        setToAllTargets(${subdir})\n    endforeach()\nendfunction()\n')))}d.isMDXComponent=!0}}]);