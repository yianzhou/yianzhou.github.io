"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5833],{15185:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var a=n(87462),l=(n(67294),n(3905));n(61839);const r={},i="\u6807\u51c6\u5e93",p={unversionedId:"cpp/std",id:"cpp/std",title:"\u6807\u51c6\u5e93",description:"IO \u5e93",source:"@site/docs/language/cpp/std.md",sourceDirName:"cpp",slug:"/cpp/std",permalink:"/docs/language/cpp/std",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Class",permalink:"/docs/language/cpp/class"},next:{title:"\u591a\u7ebf\u7a0b",permalink:"/docs/language/cpp/thread"}},s={},o=[{value:"IO \u5e93",id:"io-\u5e93",level:2},{value:"\u987a\u5e8f\u5bb9\u5668",id:"\u987a\u5e8f\u5bb9\u5668",level:2},{value:"\u987a\u5e8f\u5bb9\u5668\u9002\u914d\u5668",id:"\u987a\u5e8f\u5bb9\u5668\u9002\u914d\u5668",level:2},{value:"\u8303\u578b\u7b97\u6cd5",id:"\u8303\u578b\u7b97\u6cd5",level:2},{value:"lambda \u8868\u8fbe\u5f0f (C++11)",id:"lambda-\u8868\u8fbe\u5f0f-c11",level:2},{value:"Generalized capture (C++ 14)",id:"generalized-capture-c-14",level:3},{value:"\u5173\u8054\u5bb9\u5668",id:"\u5173\u8054\u5bb9\u5668",level:2},{value:"\u5bb9\u5668\u64cd\u4f5c",id:"\u5bb9\u5668\u64cd\u4f5c",level:2}],u={toc:o};function d(e){let{components:t,...r}=e;return(0,l.kt)("wrapper",(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u6807\u51c6\u5e93"},"\u6807\u51c6\u5e93"),(0,l.kt)("h2",{id:"io-\u5e93"},"IO \u5e93"),(0,l.kt)("p",null,"IO \u5bf9\u8c61\u662f\u4e0d\u80fd\u62f7\u8d1d\u6216\u8d4b\u503c\u7684\uff0c\u53ea\u80fd\u901a\u8fc7\u5f15\u7528\u65b9\u5f0f\u4f20\u9012\u3002"),(0,l.kt)("p",null,"\u5934\u6587\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"p"},"iostream")," \u5b9a\u4e49\u4e86\u8bfb\u5199\u6d41\u7684\u7c7b\u578b\uff0c\u9ed8\u8ba4\u5173\u8054\u5230\u7528\u6237\u7684\u63a7\u5236\u53f0\u7a97\u53e3\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},'#include <iostream>\nusing std::endl; using std::flush; using std::ends;\nusing std::unitbuf; using std::nounitbuf; using std::cout;\nint main() {\n    // writes hi and a newline, then flushes the buffer\n    cout << "hi!" << endl;\n    // writes hi, then flushes the buffer; adds no data\n    cout << "hi!" << flush;\n    // writes hi and a null, then flushes the buffer\n    cout << "hi!" << ends;\n\n    cout << unitbuf; // all writes will be flushed immediately\n    // any output is flushed immediately, no buffering\n    cout << "first" << " second" << endl;\n    cout << nounitbuf; // returns to normal buffering\n\n    return 0;\n}\n')),(0,l.kt)("p",null,"\u5934\u6587\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"p"},"fstream")," \u5b9a\u4e49\u4e86\u8bfb\u5199\u547d\u540d\u6587\u4ef6\u7684\u7c7b\u578b\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"void process(ifstream &is) {\n    string s;\n    while (is >> s)\n        cout << s << endl;\n}\n\nint main(int argc, char *argv[]) {\n    // for each file passed to the program\n    for (char **p = argv + 1; p != argv + argc; ++p) {\n        ifstream input(*p); // create input and open the file\n        if (input) // if the file is ok, process this file\n            process(input);\n        else\n            cerr << \"couldn't open: \" + string(*p);\n    } // input goes out of scope and is destroyed on each iteration\n    char **p = argv + 1, **end = argv + argc;\n    ifstream input;\n    while (p != end) { // for each file passed to the program\n        input.open(*p); // open the file, automatically clears the stream\n        if (input) // if the file is ok, read and ``process'' the input\n            process(input);\n        else\n            cerr << \"couldn't open: \" + string(*p);\n        input.close(); // close file when we're done with it\n        ++p;           // increment pointer to get next file\n    }\n}\n")),(0,l.kt)("p",null,"\u5934\u6587\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"p"},"sstream")," \u5b9a\u4e49\u4e86\u8bfb\u5199\u5185\u5b58 ",(0,l.kt)("inlineCode",{parentName:"p"},"string")," \u5bf9\u8c61\u7684\u7c7b\u578b\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},'struct ErrCode {\n    ErrCode(int i) : num(i) { }\n    string msg() {\n        ostringstream s;\n        s << "ErrCode " << num;\n        return s.str();\n    }\n    int num;\n};\n')),(0,l.kt)("h2",{id:"\u987a\u5e8f\u5bb9\u5668"},"\u987a\u5e8f\u5bb9\u5668"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u5bb9\u5668"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5e95\u5c42\u5b9e\u73b0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"vector"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6570\u7ec4\uff0c\u652f\u6301\u6269\u5bb9\u3001\u7f29\u5bb9"),(0,l.kt)("td",{parentName:"tr",align:null},"\u652f\u6301\u5feb\u901f\u968f\u673a\u8bbf\u95ee\uff1b\u5c3e\u90e8\u63d2\u5165/\u5220\u9664\u5feb\uff0c\u5176\u4f59\u4f4d\u7f6e\u6162")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6570\u7ec4\uff0c\u652f\u6301\u6269\u5bb9\u3001\u7f29\u5bb9"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e0e vector \u76f8\u4f3c\uff0c\u4f46\u4e13\u95e8\u7528\u4e8e\u4fdd\u5b58\u5b57\u7b26")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"deque"),(0,l.kt)("td",{parentName:"tr",align:null},"\u53cc\u6570\u7ec4\uff0c\u652f\u6301\u6269\u5bb9\u3001\u7f29\u5bb9"),(0,l.kt)("td",{parentName:"tr",align:null},"\u652f\u6301\u5feb\u901f\u968f\u673a\u8bbf\u95ee\uff1b\u5934\u5c3e\u63d2\u5165/\u5220\u9664\u5feb\uff0c\u5176\u4f59\u4f4d\u7f6e\u6162")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"list"),(0,l.kt)("td",{parentName:"tr",align:null},"\u53cc\u5411\u94fe\u8868"),(0,l.kt)("td",{parentName:"tr",align:null},"\u63d2\u5165/\u5220\u9664\u5feb\uff0c\u67e5\u627e\u9700\u904d\u5386")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"forward_list (C++11)"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5355\u5411\u94fe\u8868"),(0,l.kt)("td",{parentName:"tr",align:null},"\u63d2\u5165/\u5220\u9664\u5feb\uff0c\u67e5\u627e\u9700\u904d\u5386\uff1b\u4e0d\u652f\u6301 size \u64cd\u4f5c")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"array (C++11)"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6570\u7ec4\uff0c\u56fa\u5b9a\u5927\u5c0f"),(0,l.kt)("td",{parentName:"tr",align:null},"\u652f\u6301\u5feb\u901f\u968f\u673a\u8bbf\u95ee\uff1b\u4e0d\u80fd\u63d2\u5165/\u5220\u9664\u5143\u7d20")))),(0,l.kt)("p",null,"\u6570\u7ec4\u7684\u7f3a\u70b9\uff1a\u6570\u7ec4\u7684\u5143\u7d20\u662f\u8fde\u7eed\u5b58\u50a8\u7684\uff0c\u5728\u4e2d\u95f4\u4f4d\u7f6e\u6dfb\u52a0\u6216\u5220\u9664\u5143\u7d20\u540e\uff0c\u9700\u8981\u79fb\u52a8\u4e4b\u540e\u7684\u6240\u6709\u5143\u7d20\uff1b\u6269\u5bb9\u65f6\uff0c\u5206\u914d\u65b0\u7684\u5185\u5b58\u7a7a\u95f4\uff0c\u5c06\u65e7\u5143\u7d20\u90fd\u79fb\u52a8\u5230\u65b0\u7a7a\u95f4\uff0c\u7136\u540e\u6dfb\u52a0\u65b0\u5143\u7d20\uff0c\u91ca\u653e\u65e7\u5185\u5b58\u7a7a\u95f4\u3002"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"vector"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"capacity()")," \u544a\u8bc9\u6211\u4eec\u5bb9\u5668\u5728\u4e0d\u6269\u5bb9\u7684\u60c5\u51b5\u4e0b\uff0c\u53ef\u4ee5\u4fdd\u5b58\u591a\u5c11\u5143\u7d20\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"reserve(n)")," \u5206\u914d\u81f3\u5c11\u80fd\u5bb9\u7eb3 n \u4e2a\u5143\u7d20\u7684\u5185\u5b58\u7a7a\u95f4\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"shrink_to_fit()")," \u5c06 ",(0,l.kt)("inlineCode",{parentName:"li"},"capacity")," \u51cf\u5c11\u4e3a\u540c ",(0,l.kt)("inlineCode",{parentName:"li"},"size")," \u7684\u5927\u5c0f\u3002\u8fd9\u53ea\u662f\u4e00\u4e2a\u8bf7\u6c42\uff0c\u6807\u51c6\u5e93\u5e76\u4e0d\u4fdd\u8bc1\u9000\u8fd8\u5185\u5b58\u3002")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"size")," \u4fdd\u8bc1\u662f\u4e00\u4e2a\u5feb\u901f\u7684\u5e38\u91cf\u65f6\u95f4\u7684\u64cd\u4f5c\u3002"),(0,l.kt)("p",null,"\u901a\u5e38\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"vector")," \u662f\u6700\u597d\u7684\u9009\u62e9\uff0c\u9664\u975e\u6709\u5f88\u597d\u7684\u7406\u7531\u9009\u62e9\u5176\u5b83\u5bb9\u5668\u3002"),(0,l.kt)("p",null,"\u901a\u5e38\uff0c\u4e0d\u8981\u9009\u62e9\u5185\u7f6e\u6570\u7ec4\uff0c\u59cb\u7ec8\u9009\u62e9 C++ \u6807\u51c6\u5e93\u7684\u5bb9\u5668\u3002"),(0,l.kt)("h2",{id:"\u987a\u5e8f\u5bb9\u5668\u9002\u914d\u5668"},"\u987a\u5e8f\u5bb9\u5668\u9002\u914d\u5668"),(0,l.kt)("p",null,"\u6807\u51c6\u5e93\u5b9a\u4e49\u4e86\u4e09\u4e2a\u987a\u5e8f\u5bb9\u5668\u9002\u914d\u5668\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"stack"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"queue"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"priority_queue"),"\u3002"),(0,l.kt)("p",null,"\u9002\u914d\u5668\u662f\u4e00\u79cd\u673a\u5236\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"stack")," \u9002\u914d\u5668\u63a5\u53d7\u4e00\u4e2a\u987a\u5e8f\u5bb9\u5668\uff08\u9664 ",(0,l.kt)("inlineCode",{parentName:"p"},"array"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"forward_list")," \u5916\uff09\uff0c\u5e76\u4f7f\u5176\u64cd\u4f5c\u8d77\u6765\u50cf\u4e00\u4e2a ",(0,l.kt)("inlineCode",{parentName:"p"},"stack")," \u4e00\u6837\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"template<class T, class Container = std::deque<T>> class stack;\n// \u64cd\u4f5c\uff1aempty, top, push, pop\n\ntemplate<class T, class Container = std::deque<T>> class queue;\n// \u64cd\u4f5c\uff1aempty, front, back, push, pop\n\ntemplate<class T, class Container = std::vector<T>, class Compare = std::less<typename Container::value_type>> class priority_queue;\n// \u64cd\u4f5c\uff1aempty, top, push, pop\n")),(0,l.kt)("h2",{id:"\u8303\u578b\u7b97\u6cd5"},"\u8303\u578b\u7b97\u6cd5"),(0,l.kt)("p",null,"\u987a\u5e8f\u5bb9\u5668\u53ea\u5b9a\u4e49\u4e86\u5f88\u5c11\u7684\u64cd\u4f5c\u3002\u7528\u6237\u8fd8\u9700\u8981\u5f88\u591a\u5176\u5b83\u7684\u64cd\u4f5c\uff0c\u4f8b\u5982\u67e5\u627e\u3001\u66ff\u6362\u3001\u5220\u9664\u7279\u5b9a\u503c\u3001\u6392\u5e8f\u7b49\u3002\u6807\u51c6\u5e93\u6ca1\u6709\u7ed9\u6bcf\u4e2a\u5bb9\u5668\u5b9a\u4e49\u6210\u5458\u51fd\u6570\u6765\u5b9e\u73b0\u8fd9\u4e9b\u64cd\u4f5c\uff0c\u800c\u662f\u5b9a\u4e49\u4e86\u4e00\u7ec4\u8303\u578b\u7b97\u6cd5 (generic algorithm)\uff0c\u5b83\u4eec\u5b9e\u73b0\u4e86\u4e00\u4e9b\u7ecf\u5178\u7b97\u6cd5\u7684\u516c\u5171\u63a5\u53e3\uff0c\u53ef\u4ee5\u7528\u4e8e\u4e0d\u540c\u7c7b\u578b\u7684\u5bb9\u5668\u548c\u5143\u7d20\u3002"),(0,l.kt)("p",null,"\u6807\u51c6\u5e93\u63d0\u4f9b\u4e86\u8d85\u8fc7 100 \u4e2a\u7b97\u6cd5\uff0c\u9664\u4e86\u5c11\u6570\u4f8b\u5916\uff0c\u524d\u4e24\u4e2a\u53c2\u6570\u662f\u8fed\u4ee3\u5668\uff0c\u8fd9\u4e9b\u7b97\u6cd5\u904d\u5386\u7531\u4e24\u4e2a\u8fed\u4ee3\u5668\u6307\u5b9a\u7684\u8303\u56f4\u3002"),(0,l.kt)("p",null,"\u5bf9\u5bb9\u5668\u7684\u6bcf\u4e2a\u5143\u7d20\u5e94\u7528\u51fd\u6570\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},'#include <algorithm>\nusing std::for_each;\nusing std::transform;\n\nvoid print(int i) { cout << i << " "; }\nunsigned absInt(int i) { return i < 0 ? -i : i; }\n\nfor_each(vi.begin(), vi.end(), print);\ntransform(vi.begin(), vi.end(), vi.begin(), absInt);\n')),(0,l.kt)("p",null,"\u7d2f\u52a0\u5bb9\u5668\u4e2d\u7684\u6570\u503c\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"int sum = accumulate(vec.begin(), vec.end(), 0);")),(0,l.kt)("p",null,"\u62fc\u63a5\u5bb9\u5668\u4e2d\u7684\u5b57\u7b26\u4e32\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},'string concat = accumulate(v.begin(), v.end(), string(""));')),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"fill_n(back_inserter(vec), 10, 42);")," Create 10 elements on the end of vec each with the value 42. \u4f1a\u8c03\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"push_back")," \u5f80\u5bb9\u5668\u672b\u5c3e\u6dfb\u52a0\u5143\u7d20\u3002"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"copy(lst.begin(), lst.end(), front_inserter(lst2));")," \u62f7\u8d1d\u7b97\u6cd5\u662f\u4ece\u4e00\u4e2a\u4f4d\u7f6e\u5411\u53e6\u4e00\u4e2a\u4f4d\u7f6e\u62f7\u8d1d\u6570\u636e\uff0c\u524d\u4e24\u4e2a\u53c2\u6570\u662f\u62f7\u8d1d\u81ea\u94fe\u8868\u7684\u8fed\u4ee3\u5668\u8303\u56f4\uff0c\u7b2c\u4e09\u4e2a\u53c2\u6570\u662f\u62f7\u8d1d\u5230\u94fe\u8868\u8d77\u59cb\u4f4d\u7f6e\u3002"),(0,l.kt)("p",null,"\u5411\u6587\u4ef6\u62f7\u8d1d\u6570\u636e\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},'ofstream out_file("data/outFile2");   // writes int to named file\nostream_iterator<int> out_iter(out_file, " ");\ncopy(v.begin(), v.end(), out_iter);\nout_file << endl;  // write a newline at end of the file\n')),(0,l.kt)("p",null,"\u6392\u5e8f\u3001\u53bb\u91cd\u3001\u5220\u9664\u91cd\u590d\u5143\u7d20\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},'void elimDups(vector<string> &words) {\n    sort(words.begin(), words.end()); // \u6309\u5b57\u5178\u5e8f\u6392\u5e8f\n    vector<string>::const_iterator end_unique = unique(words.begin(), words.end()); // \u53bb\u91cd\uff0c\u8fd4\u56de\u4e0d\u91cd\u590d\u5143\u7d20\u7684\u540e\u4e00\u4e2a\u8fed\u4ee3\u5668\n    words.erase(end_unique, words.end()); // \u5220\u9664\u591a\u4f59\u5143\u7d20\uff1b\u7b97\u6cd5\u4e0d\u80fd\u6267\u884c\u5bb9\u5668\u7684\u64cd\u4f5c\uff0c\u5220\u9664\u6210\u5458\u9700\u7528 vector \u7684\u6210\u5458\u51fd\u6570 erase \u6765\u5b8c\u6210\n}\n\nvoid biggies(vector<string> &words,\n             vector<string>::size_type sz,\n             ostream &os = cout,\n             char c = \' \') {\n    elimDups(words);\n    stable_sort(words.begin(), words.end(), isShorter); // \u4f20\u9012\u51fd\u6570\u53c2\u6570\uff0c\u6309\u5b57\u7b26\u957f\u5ea6\u6392\u5e8f\n}\n\nvector<string> words{"the", "quick", "red", "fox", "jumps", "over", "the", "slow", "red", "turtle"};\nbiggies(words, 4);\n')),(0,l.kt)("h2",{id:"lambda-\u8868\u8fbe\u5f0f-c11"},"lambda \u8868\u8fbe\u5f0f (C++11)"),(0,l.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u5411\u4e00\u4e2a\u7b97\u6cd5\u4f20\u9012\u4efb\u4f55\u7c7b\u522b\u7684\u53ef\u8c03\u7528\u5bf9\u8c61 (callable object)\u3002\u51fd\u6570\u3001\u51fd\u6570\u6307\u9488\u3001\u91cd\u8f7d\u4e86\u51fd\u6570\u8c03\u7528\u8fd0\u7b97\u7b26\u7684\u7c7b\u3001lambda \u8868\u8fbe\u5f0f\u90fd\u662f\u53ef\u8c03\u7528\u5bf9\u8c61\u3002"),(0,l.kt)("p",null,"lambda \u8868\u8fbe\u5f0f\u8868\u793a\u4e00\u4e2a\u53ef\u8c03\u7528\u7684\u4ee3\u7801\u5355\u5143\uff0c\u53ef\u4ee5\u5c06\u5176\u7406\u89e3\u4e3a\u672a\u547d\u540d\u7684\u5185\u8054\u51fd\u6570\u3002"),(0,l.kt)("p",null,"lambda \u8868\u8fbe\u5f0f\u7684\u5f62\u5f0f\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"[capture list] (parameter list) -> return type { function body }")),(0,l.kt)("p",null,"capture list\uff08\u6355\u83b7\u5217\u8868\uff09\u662f\u4e00\u4e2a lambda \u6240\u5728\u51fd\u6570\u4e2d\u5b9a\u4e49\u7684\u5c40\u90e8\u53d8\u91cf\u7684\u5217\u8868\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"void fcn1() {\n    size_t v1 = 42;\n    // \u7f16\u8bd1\u5668\u751f\u6210\u4e86\u4e00\u4e2a\u4e0e lambda \u5bf9\u5e94\u7684\u65b0\u7684\uff08\u672a\u547d\u540d\uff09\u7c7b\uff0c\u5e76\u5b9a\u4e49\u4e86\u8be5\u7c7b\u7684\u4e00\u4e2a\u5bf9\u8c61 f\n    // \u6355\u83b7\u53d8\u91cf v1\uff0c\u5e76\u521d\u59cb\u5316 lambda \u751f\u6210\u7684\u7c7b\u7684\u6570\u636e\u6210\u5458\n    // \u503c\u6355\u83b7\u7684\u524d\u63d0\u662f\u53d8\u91cf\u53ef\u4ee5\u62f7\u8d1d\n    // copies v1 into the callable object named f\n    auto f = [v1] { return v1; };\n    v1 = 0; // \u4e0d\u4f1a\u5f71\u54cd lambda \u5185\u7684\u503c\n    // \u88ab\u6355\u83b7\u7684\u503c\u662f\u5728 lambda \u521b\u5efa\u65f6\u62f7\u8d1d\uff0c\u800c\u4e0d\u662f\u8c03\u7528\u65f6\u62f7\u8d1d\uff0c\u968f\u540e\u5bf9 v1 \u8fdb\u884c\u4fee\u6539\u4e0d\u4f1a\u5f71\u54cd lambda \u5185\u7684\u503c\n    size_t j = f(); // j is 42; f stored a copy of v1 when we created it\n    cout << j << endl;\n}\n")),(0,l.kt)("p",null,"\u7c7b\u4f3c\u4e8e\u51fd\u6570\u8c03\u7528\u65f6\u7684\u53c2\u6570\u4f20\u9012\uff0c\u53d8\u91cf\u7684\u6355\u83b7\u65b9\u5f0f\u53ef\u4ee5\u662f\u503c\u6216\u8005\u5f15\u7528\u3002\u5f53\u4ee5\u5f15\u7528\u65b9\u5f0f\u6355\u83b7\u53d8\u91cf\u65f6\uff0c\u5fc5\u987b\u4fdd\u8bc1\u5728 lambda \u6267\u884c\u65f6\u53d8\u91cf\u662f\u5b58\u5728\u7684\uff01"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"void fcn2() {\n    size_t v1 = 42; // local variable\n    // the object f2 contains a reference to v1\n    auto f2 = [&v1] { return v1; };\n    v1 = 0;\n    auto j = f2(); // j is 0; f2 refers to v1; it doesn't store it\n    cout << j << endl;\n}\n")),(0,l.kt)("p",null,"\u5bf9\u4e8e\u503c\u6355\u83b7\u7684\u53d8\u91cf\uff0c\u5982\u679c\u6211\u4eec\u60f3\u8981\u6539\u53d8\u5176\u503c\uff0c\u5c31\u8981\u52a0\u4e0a\u5173\u952e\u5b57 ",(0,l.kt)("inlineCode",{parentName:"p"},"mutable"),"\u3002\u5bf9\u4e8e\u5f15\u7528\u6355\u83b7\u7684\u53d8\u91cf\uff0c\u662f\u5426\u80fd\u4fee\u6539\u53d6\u51b3\u4e8e\u5f15\u7528\u7684\u662f\u5426\u662f const \u7c7b\u578b\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"void fcn3() {\n    size_t v1 = 42; // local variable\n    // f can change the value of the variables it captures\n    auto f = [v1]() mutable { return ++v1; };\n    v1 = 0;\n    auto j = f(); // j is 43\n    cout << j << endl;\n}\n")),(0,l.kt)("p",null,"\u9690\u5f0f\u6355\u83b7\uff0c\u4ea4\u7531\u7f16\u8bd1\u5668\u81ea\u52a8\u63a8\u65ad\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"// = \u8868\u793a\u9ed8\u8ba4\u4ee5\u503c\u6355\u83b7\u53d8\u91cf\n// & \u8868\u793a\u9ed8\u8ba4\u4ee5\u5f15\u7528\u6355\u83b7\u53d8\u91cf\nauto f = [=](const string &a) {\n    return a.size() >= sz; // \u9690\u5f0f\u503c\u6355\u83b7 sz\n};\n")),(0,l.kt)("h3",{id:"generalized-capture-c-14"},"Generalized capture (C++ 14)"),(0,l.kt)("p",null,"In C++14, you can introduce and initialize new variables in the capture clause, without the need to have those variables exist in the lambda function's enclosing scope. The initialization can be expressed as any arbitrary expression; the type of the new variable is deduced from the type produced by the expression. This feature lets you capture move-only variables (such as ",(0,l.kt)("inlineCode",{parentName:"p"},"std::unique_ptr"),") from the surrounding scope and use them in a lambda."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp",metastring:"title='flutter/shell/common/shell.cc'",title:"'flutter/shell/common/shell.cc'"},"auto result = [platform_runner = task_runners_.GetPlatformTaskRunner(),\n                result_callback](Engine::RunStatus run_result) {\n    if (!result_callback) {\n        return;\n    }\n    platform_runner->PostTask(\n        [result_callback, run_result]() { result_callback(run_result); });\n};\n")),(0,l.kt)("h2",{id:"\u5173\u8054\u5bb9\u5668"},"\u5173\u8054\u5bb9\u5668"),(0,l.kt)("p",null,"\u5173\u8054\u5bb9\u5668 (associative-container) \u6709 map \u548c set \u4e24\u79cd\u3002map \u4e2d\u7684\u5143\u7d20\u662f\u5173\u952e\u5b57-\u503c\u5bf9 (key-value pair)\uff1bset \u4e2d\u7684\u5143\u7d20\u53ea\u5305\u542b\u4e00\u4e2a\u5173\u952e\u5b57\u3002"),(0,l.kt)("p",null,"\u6807\u51c6\u5e93\u63d0\u4f9b 8 \u4e2a\u5173\u8054\u5bb9\u5668\u3002"),(0,l.kt)("p",null,"\u5bf9\u4e8e\u6709\u5e8f\u5bb9\u5668 ",(0,l.kt)("inlineCode",{parentName:"p"},"map"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"set"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"multimap"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"multiset"),"\uff0c\u5173\u952e\u5b57\u7c7b\u578b\u5fc5\u987b\u5b9a\u4e49\u5143\u7d20\u6bd4\u8f83\u7684\u65b9\u6cd5\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u6807\u51c6\u5e93\u4f7f\u7528 key \u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"<")," \u6bd4\u8f83\u8fd0\u7b97\u7b26\u6765\u6bd4\u8f83\u4e24\u4e2a key\u3002\u5f53\u6211\u4eec\u5411\u5173\u8054\u5bb9\u5668\u6dfb\u52a0\u5143\u7d20\u65f6\uff0c\u6807\u51c6\u5e93\u4f7f\u7528\u8fd9\u4e2a\u6bd4\u8f83\u8fd0\u7b97\u7b26\u6765\u4e3a\u8fd9\u4e9b\u5143\u7d20\u6392\u5e8f\uff0c\u4ee5\u4fdd\u6301\u5b83\u4eec\u6709\u5e8f\u3002",(0,l.kt)("inlineCode",{parentName:"p"},"multiset")," \u548c ",(0,l.kt)("inlineCode",{parentName:"p"},"multimap")," \u5141\u8bb8\u6709\u91cd\u590d\u7684\u5173\u952e\u5b57\u3002\u8fd9\u56db\u79cd\u5bb9\u5668\u7528\u7ea2\u9ed1\u6811\u5b9e\u73b0\u3002"),(0,l.kt)("p",null,"\u5bf9\u4e8e\u65e0\u5e8f\u5bb9\u5668\uff08C++11\uff09",(0,l.kt)("inlineCode",{parentName:"p"},"unordered_map"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"unordered_set"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"unordered_multimap"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"unordered_multiset"),"\uff0c\u4e0d\u662f\u4f7f\u7528\u6bd4\u8f83\u8fd0\u7b97\u7b26\u6765\u7ec4\u7ec7\u5143\u7d20\uff0c\u800c\u662f\u4f7f\u7528\u4e00\u4e2a\u54c8\u5e0c\u51fd\u6570\u548c key \u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"==")," \u8fd0\u7b97\u7b26\u3002"),(0,l.kt)("p",null,"\u5ffd\u7565\u6389\u67d0\u4e9b\u5355\u8bcd\uff0c\u5e76\u7edf\u8ba1\u6bcf\u4e2a\u5355\u8bcd\u51fa\u73b0\u7684\u6b21\u6570\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},'void test() {\n    map<string, size_t> word_count;\n    string word;\n    while (cin >> word) {\n        ++word_count[word]; // \u5982\u679c word \u672a\u5728 map \u4e2d\uff0c\u4e0b\u6807\u8fd0\u7b97\u7b26\u4f1a\u521b\u5efa\u4e00\u4e2a\u65b0\u5143\u7d20\n        // \u5982\u679c\u53ea\u662f\u60f3\u77e5\u9053\u4e00\u4e2a key \u662f\u5426\u5728 map \u4e2d\uff0c\u800c\u4e0d\u60f3\u6539\u53d8 map \u7684\u8bdd\uff0c\u5c31\u4e0d\u8981\u4f7f\u7528\u4e0b\u6807\u8fd0\u7b97\u7b26\uff0c\u800c\u662f\u4f7f\u7528 find \u51fd\u6570\n        if (word_count.find(word) == word_count.end()) {}\n    }\n    // \u4ece map \u4e2d\u63d0\u53d6\u4e00\u4e2a\u5143\u7d20\uff0c\u4f1a\u5f97\u5230 pair \u7c7b\u578b\u7684\u5bf9\u8c61\n    for (const pair<string, size_t> &w : word_count) {\n        cout << w.first << " -> " << w.second << endl;\n    }\n}\n')),(0,l.kt)("p",null,"\u4f7f\u7528\u987a\u5e8f\u5bb9\u5668\u521d\u59cb\u5316\u65e0\u5e8f\u5bb9\u5668\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"int main() {\n    vector<int> ivec;\n    for (vector<int>::size_type i = 0; i < 10; ++i) {\n        ivec.push_back(i);\n        ivec.push_back(i);\n    }\n    set<int> iset(ivec.cbegin(), ivec.cend());\n    cout << iset.size() << endl; // 10\n    multiset<int> miset(ivec.cbegin(), ivec.cend());\n    cout << miset.size() << endl; // 20\n    return 0;\n}\n")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Sales_data")," \u7c7b\u6ca1\u6709 ",(0,l.kt)("inlineCode",{parentName:"p"},"<")," \u8fd0\u7b97\u7b26\uff0c\u5728\u5b9a\u4e49 ",(0,l.kt)("inlineCode",{parentName:"p"},"Sales_data")," \u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"set")," \u65f6\uff0c\u5fc5\u987b\u63d0\u4f9b key \u7c7b\u578b\u548c\u6bd4\u8f83\u64cd\u4f5c\u7c7b\u578b\uff08\u51fd\u6570\u6307\u9488\uff09\u3002\u5f53\u521b\u5efa\u5bb9\u5668\u5bf9\u8c61\u65f6\uff0c\u4ee5\u6784\u9020\u51fd\u6570\u53c2\u6570\u7684\u5f62\u5f0f\u63d0\u4f9b\u6bd4\u8f83\u64cd\u4f5c\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-cpp"},"bool compareIsbn(const Sales_data &lhs, const Sales_data &rhs) {\n    return lhs.bookNo < rhs.bookNo;\n}\nmultiset<Sales_data, decltype(compareIsbn)*> bookstore(compareIsbn);\n")),(0,l.kt)("p",null,"\u5f53\u4f7f\u7528\u65e0\u5e8f\u5bb9\u5668\u5b58\u50a8\u952e\u503c\u5bf9\u65f6\uff0c\u4f1a\u5148\u7533\u8bf7\u4e00\u6574\u5757\u8fde\u7eed\u7684\u5b58\u50a8\u7a7a\u95f4\uff08\u6807\u51c6\u5e93\u901a\u5e38\u4f1a\u9009\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"vector")," \u5bb9\u5668\uff09\uff0c\u5b58\u50a8\u94fe\u8868\u7684\u5934\u6307\u9488\uff0c\u5404\u952e\u503c\u5bf9\u771f\u6b63\u7684\u5b58\u50a8\u4f4d\u7f6e\u662f\u94fe\u8868\u7684\u5404\u4e2a\u8282\u70b9\u3002"),(0,l.kt)("p",null,"\u65e0\u5e8f\u5bb9\u5668\u5728\u5b58\u50a8\u4e0a\u7ec4\u7ec7\u4e3a\u4e00\u7ec4\u6876\uff0c\u6bcf\u4e2a\u6876\u4fdd\u5b58\u96f6\u4e2a\u6216\u591a\u4e2a\u5143\u7d20\u3002\u4e3a\u4e86\u8bbf\u95ee\u4e00\u4e2a\u5143\u7d20\uff0c\u9996\u5148\u8ba1\u7b97\u5143\u7d20\u7684\u54c8\u5e0c\u503c\uff0c\u5e76\u6620\u5c04\u5230\u4e00\u4e2a\u6876\u3002"),(0,l.kt)("p",null,"\u65e0\u5e8f\u5bb9\u5668\u63d0\u4f9b\u4e86\u4e00\u7ec4\u7ba1\u7406\u6876\u7684\u51fd\u6570\uff0c\u8fd9\u4e9b\u6210\u5458\u51fd\u6570\u5141\u8bb8\u6211\u4eec\u67e5\u8be2\u5bb9\u5668\u7684\u72b6\u6001\u3001\u5fc5\u8981\u65f6\u5bf9\u5bb9\u5668\u8fdb\u884c\u91cd\u7ec4\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"img",src:n(46117).Z,width:"760",height:"535"})),(0,l.kt)("p",null,"\u6211\u4eec\u901a\u5e38\u4e0d\u5bf9\u5173\u8054\u5bb9\u5668\u4f7f\u7528\u8303\u578b\u7b97\u6cd5\u3002"),(0,l.kt)("h2",{id:"\u5bb9\u5668\u64cd\u4f5c"},"\u5bb9\u5668\u64cd\u4f5c"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u5bb9\u5668"),(0,l.kt)("th",{parentName:"tr",align:null},"\u8bbf\u95ee"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63d2\u5165"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5220\u9664"),(0,l.kt)("th",{parentName:"tr",align:null},"\u67e5\u627e"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"vector"),(0,l.kt)("td",{parentName:"tr",align:null},"front, back, operator[]"),(0,l.kt)("td",{parentName:"tr",align:null},"push_back, insert(ite)"),(0,l.kt)("td",{parentName:"tr",align:null},"pop_back, erase(ite), clear"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8fed\u4ee3\u5668")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"queue"),(0,l.kt)("td",{parentName:"tr",align:null},"front,back"),(0,l.kt)("td",{parentName:"tr",align:null},"push"),(0,l.kt)("td",{parentName:"tr",align:null},"pop"),(0,l.kt)("td",{parentName:"tr",align:null},"\u65e0\u8fed\u4ee3\u5668")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"stack"),(0,l.kt)("td",{parentName:"tr",align:null},"top"),(0,l.kt)("td",{parentName:"tr",align:null},"push"),(0,l.kt)("td",{parentName:"tr",align:null},"pop"),(0,l.kt)("td",{parentName:"tr",align:null},"\u65e0\u8fed\u4ee3\u5668")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"unordered_map"),(0,l.kt)("td",{parentName:"tr",align:null},"operator[]"),(0,l.kt)("td",{parentName:"tr",align:null},"insert"),(0,l.kt)("td",{parentName:"tr",align:null},"erase, clear"),(0,l.kt)("td",{parentName:"tr",align:null},"find, count")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"unordered_set"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"insert"),(0,l.kt)("td",{parentName:"tr",align:null},"erase, clear"),(0,l.kt)("td",{parentName:"tr",align:null},"find, count")))))}d.isMDXComponent=!0},46117:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/C7D650BF-19C6-43B9-800D-D6FDB904A290-f9e528b1ac9bc3acaefebb15cb07f7e9.jpg"}}]);