"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8227],{51832:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>p,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>o});var a=t(87462),r=(t(67294),t(3905));t(61839);const l={},p="Python",i={unversionedId:"python",id:"python",title:"Python",description:"\u5e38\u7528\u4ee3\u7801",source:"@site/docs/language/python.md",sourceDirName:".",slug:"/python",permalink:"/docs/language/python",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"The Linux Command Line",permalink:"/docs/language/linux-cmd-line"},next:{title:"Regex",permalink:"/docs/language/regex"}},s={},o=[{value:"\u5e38\u7528\u4ee3\u7801",id:"\u5e38\u7528\u4ee3\u7801",level:2},{value:"\u914d\u7f6e\u73af\u5883",id:"\u914d\u7f6e\u73af\u5883",level:2},{value:"pyenv",id:"pyenv",level:2},{value:"\u7ec8\u7aef\u4ea4\u4e92",id:"\u7ec8\u7aef\u4ea4\u4e92",level:2},{value:"\u6570\u636e\u7ed3\u6784",id:"\u6570\u636e\u7ed3\u6784",level:2},{value:"pass by value",id:"pass-by-value",level:2},{value:"\u9762\u5411\u5bf9\u8c61",id:"\u9762\u5411\u5bf9\u8c61",level:2},{value:"\u9ad8\u7ea7\u7279\u6027",id:"\u9ad8\u7ea7\u7279\u6027",level:2},{value:"\u51fd\u6570\u5f0f\u7f16\u7a0b",id:"\u51fd\u6570\u5f0f\u7f16\u7a0b",level:2},{value:"\u751f\u6210\u5217\u8868\u7684\u56db\u79cd\u65b9\u6cd5",id:"\u751f\u6210\u5217\u8868\u7684\u56db\u79cd\u65b9\u6cd5",level:2}],m={toc:o};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"python"},"Python"),(0,r.kt)("h2",{id:"\u5e38\u7528\u4ee3\u7801"},"\u5e38\u7528\u4ee3\u7801"),(0,r.kt)("p",null,"\u6267\u884c shell\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"import os\nos.system('ls -l')\n")),(0,r.kt)("p",null,"\u83b7\u53d6\u7528\u6237\u76ee\u5f55\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},'from os.path import expanduser\nhome = expanduser("~")\n')),(0,r.kt)("p",null,"\u5904\u7406\u547d\u4ee4\u884c\u53c2\u6570\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument('--proxy', '-p', help='\u662f\u5426\u4f7f\u7528\u4ee3\u7406\u670d\u52a1\u5668', action=\"store_true\")\nparser.add_argument('--file', '-f', help='\u9700\u8981\u538b\u7f29\u7684\u6587\u4ef6\u8def\u5f84')\nargs = parser.parse_args()\n")),(0,r.kt)("p",null,"\u9012\u5f52\u904d\u5386\u6587\u4ef6\u5939\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"for parent, dirnames, filenames in os.walk(themesDir):\n    for filename in filenames:\n        file_path = os.path.join(parent, filename)\n        file_name, file_extension = os.path.splitext(filename)\n        print('\u6587\u4ef6\u540d\uff1a%s' % filename)\n        if file_extension == '.yml':\n            print('\u6587\u4ef6\u5b8c\u6574\u8def\u5f84\uff1a%s' % file_path)\n")),(0,r.kt)("p",null,"\u627e\u5230\u5f53\u524d\u6587\u4ef6\u7684\u76ee\u5f55\uff0c\u518d\u5411\u4e0a\u8def\u7531\uff1a"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},'ROOT_PATH = os.path.abspath(os.path.join(__file__, "../../.."))')),(0,r.kt)("h2",{id:"\u914d\u7f6e\u73af\u5883"},"\u914d\u7f6e\u73af\u5883"),(0,r.kt)("p",null,"macOS \u662f\u5185\u7f6e Python \u7684\uff0cmacOS Catalina 10.15 \u5f03\u7528 Python2.7\uff0c\u5185\u5d4c\u4e86 Python3\u3002"),(0,r.kt)("p",null,"\u67e5\u770b python \u7248\u672c\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"python3 --version")),(0,r.kt)("p",null,"macOS \u81ea\u5e26 Python \u8def\u5f84\u4e3a: ",(0,r.kt)("inlineCode",{parentName:"p"},"/System/Library/Frameworks/Python.framework/Versions")),(0,r.kt)("p",null,"\u548c C \u7a0b\u5e8f\u76f8\u6bd4\uff0cPython \u975e\u5e38\u6162\uff0c\u56e0\u4e3a Python \u662f\u89e3\u91ca\u578b\u8bed\u8a00\uff0c\u4ee3\u7801\u5728\u6267\u884c\u65f6\u4f1a\u4e00\u884c\u4e00\u884c\u5730\u7ffb\u8bd1\u6210 CPU \u80fd\u7406\u89e3\u7684\u673a\u5668\u7801\uff0c\u8fd9\u4e2a\u7ffb\u8bd1\u8fc7\u7a0b\u975e\u5e38\u8017\u65f6\uff0c\u6240\u4ee5\u5f88\u6162\u3002\u800c C \u7a0b\u5e8f\u662f\u8fd0\u884c\u524d\u76f4\u63a5\u7f16\u8bd1\u6210 CPU \u80fd\u6267\u884c\u7684\u673a\u5668\u7801\uff0c\u6240\u4ee5\u975e\u5e38\u5feb\u3002"),(0,r.kt)("p",null,"\u5728 Terminal \u8f93\u5165 ",(0,r.kt)("inlineCode",{parentName:"p"},"python3"),"\uff0c\u770b\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},">>>")," \u5c31\u4ee3\u8868\u8fdb\u5165 Python \u4ea4\u4e92\u5f0f\u73af\u5883\u4e86\u3002\u8f93\u5165 ",(0,r.kt)("inlineCode",{parentName:"p"},"exit()")," \u5c31\u53ef\u4ee5\u9000\u51fa\u4ea4\u4e92\u5f0f\u73af\u5883\u3002\u5b98\u65b9\u7248\u672c\u7684\u89e3\u91ca\u5668\uff1aCPython\uff08\u4f7f\u7528 C \u8bed\u8a00\u5f00\u53d1\u7684\uff09\uff0c\u5728\u547d\u4ee4\u884c\u4e0b\u8fd0\u884c python \u5c31\u662f\u542f\u52a8 CPython \u89e3\u91ca\u5668\u3002"),(0,r.kt)("p",null,"\u5728 Linux \u4e0a\u76f4\u63a5\u8fd0\u884c python \u4ee3\u7801\uff0c\u5728",(0,r.kt)("inlineCode",{parentName:"p"},"hello.py"),"\u6587\u4ef6\u7b2c\u4e00\u884c\u52a0\u4e0a\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"#!/usr/bin/env python3\n")),(0,r.kt)("p",null,"\u7ed9\u5b83\u52a0\u4e0a\u6267\u884c\u6743\u9650\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"chmod +x hello.py"),"\uff0c\u7136\u540e\u5728 Terminal \u4e2d\u5c31\u53ef\u4ee5\u76f4\u63a5\u8f93\u5165\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"./hello.py"),"\u8fd0\u884c\u4e86\u3002"),(0,r.kt)("h2",{id:"pyenv"},"pyenv"),(0,r.kt)("p",null,"\u67e5\u770b\u5df2\u5b89\u88c5\u7684\u7248\u672c\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"pyenv versions")),(0,r.kt)("p",null,"\u5207\u6362\u7248\u672c\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"pyenv global 3.8.2")),(0,r.kt)("h2",{id:"\u7ec8\u7aef\u4ea4\u4e92"},"\u7ec8\u7aef\u4ea4\u4e92"),(0,r.kt)("p",null,"\u8f93\u5165\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"name = input()"),"\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"input()"),"\u53ef\u4ee5\u8ba9\u4f60\u663e\u793a\u4e00\u4e2a\u5b57\u7b26\u4e32\u6765\u63d0\u793a\u7528\u6237\uff0c\u6bd4\u5982\uff1a\n",(0,r.kt)("inlineCode",{parentName:"p"},"name = input('please enter your name: ')")),(0,r.kt)("h2",{id:"\u6570\u636e\u7ed3\u6784"},"\u6570\u636e\u7ed3\u6784"),(0,r.kt)("p",null,"\u6709\u5e8f\u96c6\u5408\uff1alist, tuple"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"classmates = ['Michael', 'Bob', 'Tracy'] # list\nclassmates[1] = 'Sarah'\nclassmates.append('Adam')\nclassmates.insert(1, 'Jack')\nclassmates.pop() # delete last item\n\nclassmates = ('Michael', 'Bob', 'Tracy') # tuple\nclassmates[0] # tuple \u4e00\u65e6\u521d\u59cb\u5316\u5c31\u4e0d\u80fd\u4fee\u6539\uff0c\u66f4\u5b89\u5168\n")),(0,r.kt)("p",null,"Python \u8bed\u8a00\u7528\u5230\u7684\u6570\u636e\u7ed3\u6784\u3002There are three basic sequence types: ",(0,r.kt)("strong",{parentName:"p"},"lists"),", ",(0,r.kt)("strong",{parentName:"p"},"tuples"),", and ",(0,r.kt)("strong",{parentName:"p"},"range")," objects."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Strings")," are immutable sequences of Unicode code points."),(0,r.kt)("p",null,"The core built-in types for manipulating binary data are ",(0,r.kt)("strong",{parentName:"p"},"bytes")," and ",(0,r.kt)("strong",{parentName:"p"},"bytearray"),". They are supported by ",(0,r.kt)("strong",{parentName:"p"},"memoryview")," which uses the buffer protocol to access the memory of other binary objects without needing to make a copy."),(0,r.kt)("p",null,"A ",(0,r.kt)("strong",{parentName:"p"},"set")," object is an unordered collection of distinct hashable objects."),(0,r.kt)("p",null,"A mapping object maps hashable values to arbitrary objects. Mappings are mutable objects. There is currently only one standard mapping type, the ",(0,r.kt)("strong",{parentName:"p"},"dictionary"),"."),(0,r.kt)("p",null,"Python \u662f\u4e00\u95e8\u53d8\u5316\u4e2d\u7684\u8bed\u8a00\uff0c\u5185\u90e8\u5b9e\u73b0\u4e00\u76f4\u4f1a\u6709\u66f4\u65b0\u3002\u53ef\u4ee5\u5728\u5b98\u7f51\u4e0a\u627e\u5230 Python \u6570\u636e\u7ed3\u6784\u6027\u80fd\u7684\u6700\u65b0\u4fe1\u606f\u3002"),(0,r.kt)("p",null,"\u5b57\u5178\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}"),"\uff0c\u5728\u5176\u4ed6\u8bed\u8a00\u4e2d\u4e5f\u79f0\u4e3a map\uff0c\u4f7f\u7528\u952e-\u503c\uff08key-value\uff09\u5b58\u50a8\uff0c\u5185\u90e8\u5b9e\u73b0\u662f\u54c8\u5e0c\u8868\uff1b"),(0,r.kt)("p",null,"\u96c6\u5408\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"s = set([1, 2, 3])"),"\uff0cset \u7684\u539f\u7406\u548c dictionary \u4e00\u6837\uff0c\u552f\u4e00\u533a\u522b\u4ec5\u5728\u4e8e\u6ca1\u6709\u5b58\u50a8\u5bf9\u5e94\u7684 value\u3002"),(0,r.kt)("p",null,"\u5217\u8868\u89e3\u6790\u5f0f\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"alist = [x*x for x in range(1, 11) if x%2 == 0]")),(0,r.kt)("h2",{id:"pass-by-value"},"pass by value"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n\narray = []\n\na = TreeNode(10)\nprint(a)\n\narray.append(a)\nprint(array[0].val)\n\na = TreeNode(5)\nprint(a)\n\narray.append(a)\nprint(array[1].val)\n\na.val = 20\nprint(array[0].val, array[1].val)\n")),(0,r.kt)("h2",{id:"\u9762\u5411\u5bf9\u8c61"},"\u9762\u5411\u5bf9\u8c61"),(0,r.kt)("p",null,"\u5b9a\u4e49\u7c7b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},'# \u7528\u6765\u8868\u793a\u5206\u6570\u7684\u7c7b\nclass Fraction:\n    # \u6240\u6709\u7c7b\u90fd\u5e94\u8be5\u9996\u5148\u63d0\u4f9b\u6784\u9020\u65b9\u6cd5\n    def __init__(self, num, den):\n        self.num = num\n        self.den = den\n\n    # object to string\n    def __str__(self):\n        return str(self.num) + "/" + str(self.den)\n\nf = Fraction(3, 5)\nprint(f)\n')),(0,r.kt)("h2",{id:"\u9ad8\u7ea7\u7279\u6027"},"\u9ad8\u7ea7\u7279\u6027"),(0,r.kt)("p",null,"\u9012\u5f52\u51fd\u6570\u7684\u4f18\u70b9\u662f\u5b9a\u4e49\u7b80\u5355\uff0c\u903b\u8f91\u6e05\u6670\u3002\u7406\u8bba\u4e0a\uff0c\u6240\u6709\u7684\u9012\u5f52\u51fd\u6570\u90fd\u53ef\u4ee5\u5199\u6210\u5faa\u73af\u7684\u65b9\u5f0f\uff0c\u4f46\u5faa\u73af\u7684\u903b\u8f91\u4e0d\u5982\u9012\u5f52\u6e05\u6670\u3002\u4f7f\u7528\u9012\u5f52\u51fd\u6570\u9700\u8981\u6ce8\u610f\u9632\u6b62\u6808\u6ea2\u51fa\u3002\u5728\u8ba1\u7b97\u673a\u4e2d\uff0c\u51fd\u6570\u8c03\u7528\u662f\u901a\u8fc7\u6808\uff08stack\uff09\u8fd9\u79cd\u6570\u636e\u7ed3\u6784\u5b9e\u73b0\u7684\uff0c\u7531\u4e8e\u6808\u7684\u5927\u5c0f\u4e0d\u662f\u65e0\u9650\u7684\uff0c\u6240\u4ee5\uff0c\u9012\u5f52\u8c03\u7528\u7684\u6b21\u6570\u8fc7\u591a\uff0c\u4f1a\u5bfc\u81f4\u6808\u6ea2\u51fa\u3002\u89e3\u51b3\u9012\u5f52\u8c03\u7528\u6808\u6ea2\u51fa\u7684\u65b9\u6cd5\u662f\u901a\u8fc7\u5c3e\u8c03\u7528\u4f18\u5316\u3002Python \u89e3\u91ca\u5668\u6ca1\u6709\u5c3e\u8c03\u7528\u4f18\u5316\u3002"),(0,r.kt)("p",null,"Slice\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']\nL[1:3] # ['Sarah', 'Tracy']\nL[:10] # \u524d10\u4e2a\u6570\nL[-10:] # \u540e10\u4e2a\u6570\nL[10:20] # 11-20\u4e2a\u6570\nL[:10:2] # \u524d10\u4e2a\u6570\uff0c\u6bcf\u4e24\u4e2a\u53d6\u4e00\u4e2a\n'ABCDEFG'[:3] # 'ABC'\n")),(0,r.kt)("p",null,"\u5faa\u73af\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"for i, value in enumerate(['A', 'B', 'C']):\n    print(i, value)\n")),(0,r.kt)("p",null,"List Comprehensions\uff08\u5217\u8868\u751f\u6210\u5f0f\uff09\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"list(range(1, 11)) # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n[x * x for x in range(1, 11)] # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n[x * x for x in range(1, 11) if x % 2 == 0] # [4, 16, 36, 64, 100]\n\n# \u5217\u51fa\u5f53\u524d\u76ee\u5f55\u4e0b\u7684\u6240\u6709\u6587\u4ef6\u548c\u76ee\u5f55\u540d\n[d for d in os.listdir('.')]\n\n")),(0,r.kt)("p",null,"Generator:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"g = (x * x for x in range(10))\nnext(g) # 0\nnext(g) # 1\n# generator\u4fdd\u5b58\u7684\u662f\u7b97\u6cd5\uff0c\u6bcf\u6b21\u8c03\u7528next(g)\uff0c\u5c31\u8ba1\u7b97\u51fa g \u7684\u4e0b\u4e00\u4e2a\u5143\u7d20\u7684\u503c\nfor n in g:\n    print(n)\n")),(0,r.kt)("p",null,"Python \u7684 Iterator \u8868\u793a\u7684\u662f\u4e00\u4e2a\u6570\u636e\u6d41\uff0cIterator \u53ef\u4ee5\u88ab next() \u51fd\u6570\u8c03\u7528\u5e76\u4e0d\u65ad\u8fd4\u56de\u4e0b\u4e00\u4e2a\u6570\u636e\uff0c\u76f4\u5230\u6ca1\u6709\u6570\u636e\u65f6\u629b\u51fa StopIteration \u9519\u8bef\u3002\u53ef\u4ee5\u628a\u8fd9\u4e2a\u6570\u636e\u6d41\u770b\u505a\u662f\u4e00\u4e2a\u6709\u5e8f\u5e8f\u5217\uff0c\u4f46\u6211\u4eec\u5374\u4e0d\u80fd\u63d0\u524d\u77e5\u9053\u5e8f\u5217\u7684\u957f\u5ea6\uff0c\u53ea\u80fd\u4e0d\u65ad\u901a\u8fc7 next() \u51fd\u6570\u5b9e\u73b0\u6309\u9700\u8ba1\u7b97\u4e0b\u4e00\u4e2a\u6570\u636e\uff0c\u6240\u4ee5 Iterator \u7684\u8ba1\u7b97\u662f\u60f0\u6027\u7684\uff0c\u53ea\u6709\u5728\u9700\u8981\u8fd4\u56de\u4e0b\u4e00\u4e2a\u6570\u636e\u65f6\u5b83\u624d\u4f1a\u8ba1\u7b97\u3002"),(0,r.kt)("p",null,"\u751f\u6210\u5668\u90fd\u662f Iterator \u5bf9\u8c61\u3002\u96c6\u5408\u6570\u636e\u7c7b\u578b\u5982 list\u3001dict\u3001str \u7b49\u662f Iterable \u4f46\u4e0d\u662f Iterator\uff0c\u4e0d\u8fc7\u53ef\u4ee5\u901a\u8fc7 iter() \u51fd\u6570\u83b7\u5f97\u4e00\u4e2a Iterator \u5bf9\u8c61\u3002"),(0,r.kt)("h2",{id:"\u51fd\u6570\u5f0f\u7f16\u7a0b"},"\u51fd\u6570\u5f0f\u7f16\u7a0b"),(0,r.kt)("p",null,"\u51fd\u6570\u540d\u5176\u5b9e\u5c31\u662f\u6307\u5411\u51fd\u6570\u7684\u53d8\u91cf\uff01"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"abs(-10) // 10\nf = abs\nf(-10) // 10\n")),(0,r.kt)("p",null,"A ",(0,r.kt)("strong",{parentName:"p"},"higher-order function")," is a function that takes another function as parameter and/or returns a function:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"def add(x, y, f):\n    return f(x) + f(y)\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"map()")," \u51fd\u6570\u63a5\u6536\u4e24\u4e2a\u53c2\u6570\uff0c\u4e00\u4e2a\u662f\u51fd\u6570\uff0c\u4e00\u4e2a\u662f Iterable\uff0cmap \u5c06\u4f20\u5165\u7684\u51fd\u6570\u4f9d\u6b21\u4f5c\u7528\u5230\u5e8f\u5217\u7684\u6bcf\u4e2a\u5143\u7d20\uff0c\u5e76\u628a\u7ed3\u679c\u4f5c\u4e3a\u65b0\u7684 Iterator \u8fd4\u56de\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"def f(x):\n    return x * x\nr = map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])\nlist(r) # r\u662fiterator\uff0clist() \u51fd\u6570\u628a\u6574\u4e2a\u5e8f\u5217\u90fd\u8ba1\u7b97\u51fa\u6765\u5e76\u8fd4\u56de\u4e00\u4e2alist\u3002\n# [1, 4, 9, 16, 25, 36, 49, 64, 81]\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"reduce()"),"\u628a\u4e00\u4e2a\u51fd\u6570\u4f5c\u7528\u5728\u4e00\u4e2a\u5e8f\u5217","[x1, x2, x3, ...]","\u4e0a\uff0c\u8fd9\u4e2a\u51fd\u6570\u5fc5\u987b\u63a5\u6536\u4e24\u4e2a\u53c2\u6570\uff0c\u5176\u6548\u679c\u5c31\u662f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},"reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)\n")),(0,r.kt)("h2",{id:"\u751f\u6210\u5217\u8868\u7684\u56db\u79cd\u65b9\u6cd5"},"\u751f\u6210\u5217\u8868\u7684\u56db\u79cd\u65b9\u6cd5"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py"},'# \u751f\u6210\u5217\u8868\u7684\u56db\u79cd\u65b9\u6cd5\uff0c\u770b\u6027\u80fd\u600e\u4e48\u6837\n# \u8981\u5f97\u5230\u6bcf\u4e2a\u51fd\u6570\u7684\u6267\u884c\u65f6\u95f4\uff0c\u9700\u8981\u7528\u5230 Python \u7684 timeit \u6a21\u5757\u3002\n\nfrom timeit import Timer\n\ndef test1():\n    l = []\n    for i in range(5000):\n        # \u5217\u8868\u4e0e\u5217\u8868\u7684\u8fde\u63a5\n        l = l + [i]\n\ndef test2():\n    l = []\n    for i in range(5000):\n        # \u5f80\u5217\u8868\u91cc\u8ffd\u52a0\u5143\u7d20\n        l.append(i)\n\ndef test3():\n    # \u5217\u8868\u89e3\u6790\u5f0f\n    l = [i for i in range(5000)]\n\ndef test4():\n    # \u5217\u8868\u6784\u9020\u51fd\u6570\n    l = list(range(5000))\n\ndef test5():\n    l = [0] * 5000\n\nt1 = Timer("test1()", "from __main__ import test1")\nprint("concat ", t1.timeit(number=1000), "ms")\n\nt2 = Timer("test2()", "from __main__ import test2")\nprint("append ", t2.timeit(number=1000), "ms")\n\nt3 = Timer("test3()", "from __main__ import test3")\nprint("comprehension ", t3.timeit(number=1000), "ms")\n\nt4 = Timer("test4()", "from __main__ import test4")\nprint("list range ", t4.timeit(number=1000), "ms")\n\nt5 = Timer("test5()", "from __main__ import test5")\nprint("?", t5.timeit(number=1000), "ms")\n\n# t1 > t2 > t3 > t4\n# concat  24.082856827999997 ms\n# append  0.3938799230000001 ms\n# comprehension  0.19376184500000093 ms\n# list range  0.09405486100000005 ms\n# ? 0.011491839999997921 ms\n')))}u.isMDXComponent=!0}}]);