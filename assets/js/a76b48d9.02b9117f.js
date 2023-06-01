"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5346],{20293:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var a=n(87462),l=(n(67294),n(3905));n(61839);const r={},i="JavaScript",o={unversionedId:"JavaScript",id:"JavaScript",title:"JavaScript",description:"Introduction",source:"@site/docs/language/JavaScript.md",sourceDirName:".",slug:"/JavaScript",permalink:"/docs/language/JavaScript",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"System Frameworks",permalink:"/docs/language/Effective Objective-C/effective-oc-7"},next:{title:"NSObject",permalink:"/docs/language/Objective-C/nsobject"}},s={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Hello, world",id:"hello-world",level:2},{value:"Variables",id:"variables",level:2},{value:"Data types",id:"data-types",level:2},{value:"Fundamentals",id:"fundamentals",level:2},{value:"Functions",id:"functions",level:2},{value:"Objects",id:"objects",level:2},{value:"Garbage collection",id:"garbage-collection",level:2}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"javascript"},"JavaScript"),(0,l.kt)("h2",{id:"introduction"},"Introduction"),(0,l.kt)("p",null,"JavaScript was initially created to \u201cmake web pages alive\u201d."),(0,l.kt)("p",null,"Scripts are provided and executed as ",(0,l.kt)("strong",{parentName:"p"},"plain text"),". They don\u2019t need special preparation or compilation to run."),(0,l.kt)("p",null,"When JavaScript was created, it initially had another name: \u201cLiveScript\u201d. But Java was very popular at that time, so it was decided that positioning a new language as a \u201cyounger brother\u201d of Java would help. But as it evolved, JavaScript became a fully independent language with its own specification called ",(0,l.kt)("strong",{parentName:"p"},"ECMAScript"),", and now it has no relation to Java at all."),(0,l.kt)("p",null,"Today, JavaScript can execute not only in the browser, but also on the server, or actually on any device that has a special program called the ",(0,l.kt)("strong",{parentName:"p"},"JavaScript engine"),". Different engines have different \u201ccodenames\u201d:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"V8 \u2013 in Chrome, Opera and Edge."),(0,l.kt)("li",{parentName:"ul"},"SpiderMonkey \u2013 in Firefox."),(0,l.kt)("li",{parentName:"ul"},"JavaScriptCore - in Safari.")),(0,l.kt)("p",null,"JavaScript does not suit everyone\u2019s needs. So recently a plethora of new languages appeared, which are ",(0,l.kt)("strong",{parentName:"p"},"transpiled (converted) to JavaScript")," before they run in the browser."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("em",{parentName:"li"},"CoffeeScript")," is a \u201csyntactic sugar\u201d for JavaScript. (by Ruby)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("em",{parentName:"li"},"TypeScript")," is concentrated on adding \u201cstrict data typing\u201d. (by Microsoft)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("em",{parentName:"li"},"Flow")," also adds data typing, but in a different way. (by Facebook)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("em",{parentName:"li"},"Dart")," can be transpiled to JavaScript. (by Google)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("em",{parentName:"li"},"Brython")," is a Python transpiler to JavaScript."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("em",{parentName:"li"},"Kotlin")," can target the browser or Node.")),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://javascript.info/manuals-specifications"},"Manuals and specifications"),": MDN (Mozilla) JavaScript Reference \u662f\u4e3b\u8981\u7684\u624b\u518c\uff0c\u5f53\u9700\u8981\u627e\u67d0\u4e2a\u51fd\u6570\u4fe1\u606f\u65f6\uff0c\u53ef\u4ee5\u641c\u7d22 \u201cMDN ","[term]","\u201d\u3002"),(0,l.kt)("p",null,"\u5173\u4e8e\u63a7\u5236\u53f0\uff1aChrome \u7b49\u5927\u90e8\u5206\u6d4f\u89c8\u5668\u90fd\u662f\u6309 F12 \u5524\u51fa\uff08Mac \u662f fn + F12\uff09\uff0c\u76f4\u63a5 ",(0,l.kt)("inlineCode",{parentName:"p"},"Enter")," \u662f\u6267\u884c\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"Shift + Enter")," \u662f\u6362\u884c\u3002"),(0,l.kt)("p",null,"\u5728\u7ebf\u8c03\u8bd5\u5b66\u4e60\uff1a",(0,l.kt)("a",{parentName:"p",href:"https://plnkr.co/edit/?p=preview&preview"},"Plunker")),(0,l.kt)("h2",{id:"hello-world"},"Hello, world"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"<script>")," tag contains JavaScript code which is automatically executed when the browser ",(0,l.kt)("strong",{parentName:"p"},"processes the tag"),"."),(0,l.kt)("p",null,"We must choose either an external ",(0,l.kt)("inlineCode",{parentName:"p"},'<script src="\u2026">')," or a regular ",(0,l.kt)("inlineCode",{parentName:"p"},"<script>")," with code. If ",(0,l.kt)("inlineCode",{parentName:"p"},"src")," is set, the script content is ignored."),(0,l.kt)("p",null,"\u5bf9\u4e8e\u73b0\u4ee3\u6d4f\u89c8\u5668\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"<script>")," \u5c31\u8db3\u591f\u4e86\uff0c\u4e00\u4e9b\u7279\u522b\u8001\u7684\u4ee3\u7801\u91cc\uff0c\u53ef\u80fd\u8fd8\u80fd\u770b\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},'<script type="text/javascript">')," \u8fd9\u79cd\u5199\u6cd5\u7684\uff0c\u73b0\u5728\u5df2\u7ecf\u4e0d\u7528\u4e86\u3002"),(0,l.kt)("p",null,"JavaScript interprets the line break as an \u201cimplicit\u201d semicolon. \u6bcf\u53e5 statement \u90fd\u6362\u884c\u7684\u60c5\u51b5\u4e0b\uff0c\u4f60\u4e0d\u5199\u5206\u53f7\u4e5f\u884c\uff0c\u4f46\u6700\u597d\u662f\u5199\uff0c\u8fd9\u662f\u793e\u533a\u89c4\u8303\u3002"),(0,l.kt)("p",null,"For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn\u2019t change. That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript\u2019s creators got stuck in the language forever. This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications ",(0,l.kt)("strong",{parentName:"p"},"are off by default"),". You need to explicitly enable them with a special directive: ",(0,l.kt)("inlineCode",{parentName:"p"},'"use strict"'),"."),(0,l.kt)("p",null,"Please make sure that ",(0,l.kt)("inlineCode",{parentName:"p"},'"use strict"')," is at the top of your scripts. Only comments may appear above ",(0,l.kt)("inlineCode",{parentName:"p"},'"use strict"'),"."),(0,l.kt)("p",null,"When you use a developer console, please note that it doesn\u2019t ",(0,l.kt)("inlineCode",{parentName:"p"},"use strict")," by default. \u5982\u679c\u60f3\u8981\u5f00\u542f\uff0c\u5148\u8f93\u5165 ",(0,l.kt)("inlineCode",{parentName:"p"},'"use strict";')," \u518d ",(0,l.kt)("inlineCode",{parentName:"p"},"Shift + Enter")," \u6362\u884c\u3002"),(0,l.kt)("p",null,"Modern JavaScript supports \u201cclasses\u201d and \u201cmodules\u201d \u2013 advanced language structures, that enable ",(0,l.kt)("inlineCode",{parentName:"p"},"use strict")," automatically. When your code is all in classes and modules, ",(0,l.kt)("strong",{parentName:"p"},"you may omit it"),"."),(0,l.kt)("p",null,"\u4e09\u4e2a\u4ea4\u4e92\u51fd\u6570\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'alert("Hello"); // \u901a\u77e5\u7528\u6237\uff0c\u70b9\u51fb\u786e\u8ba4\u624d\u80fd\u7ee7\u7eed\u4ea4\u4e92\nlet age = prompt(\'How old are you?\', 100); // \u5f39\u51fa\u8f93\u5165\u6846\u8ba9\u7528\u6237\u8f93\u5165\uff0c\u7b2c\u4e8c\u4e2a\u53c2\u6570\u4ee3\u8868\u9ed8\u8ba4\u503c\uff0c\u53ef\u9009\nlet isBoss = confirm("Are you the boss?"); // \u5f39\u51fa\u4ea4\u4e92\u6846\u8ba9\u7528\u6237\u786e\u8ba4\uff0c\u8fd4\u56de true \u6216 false\n')),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"alert")," automatically converts any value to a string to show it."),(0,l.kt)("p",null,"To output something to console from our code, there\u2019s ",(0,l.kt)("inlineCode",{parentName:"p"},"console.log")," function."),(0,l.kt)("h2",{id:"variables"},"Variables"),(0,l.kt)("p",null,"To create a variable in JavaScript, use the ",(0,l.kt)("inlineCode",{parentName:"p"},"let")," keyword. ",(0,l.kt)("inlineCode",{parentName:"p"},"let user = 'John';")),(0,l.kt)("p",null,"In older scripts, you may also find another keyword: ",(0,l.kt)("inlineCode",{parentName:"p"},"var"),". There are subtle differences between ",(0,l.kt)("inlineCode",{parentName:"p"},"let")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"var"),", but they do not matter for us yet."),(0,l.kt)("p",null,"Variable naming: ",(0,l.kt)("inlineCode",{parentName:"p"},"camelCase")," is commonly used. Case matters."),(0,l.kt)("p",null,"To declare a constant (unchanging) variable, use ",(0,l.kt)("inlineCode",{parentName:"p"},"const"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5728\u8fd0\u884c\u524d\u5c31\u77e5\u9053\u503c\u7684\u5e38\u91cf\uff0c\u901a\u5e38\u7528\u5927\u5199 + \u4e0b\u5212\u7ebf\u7684\u65b9\u5f0f\u6765\u547d\u540d\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},'const COLOR_RED = "#F00";')),(0,l.kt)("li",{parentName:"ul"},"\u5728\u8fd0\u884c\u65f6\u624d\u8ba1\u7b97\u503c\u7684\u5e38\u91cf\uff0c\u5219\u7528\u9a7c\u5cf0\u547d\u540d\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"const pageLoadTime = /* time taken by a webpage to load */;"))),(0,l.kt)("h2",{id:"data-types"},"Data types"),(0,l.kt)("p",null,"A value in JavaScript is always of a ",(0,l.kt)("strong",{parentName:"p"},"certain type"),"."),(0,l.kt)("p",null,"We can put any type in a variable. Programming languages that allow such things are called \u201c",(0,l.kt)("strong",{parentName:"p"},"dynamically typed"),"\u201d, meaning that there exist data types, but variables are not bound to any of them."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let message = "hello";\nmessage = 123456;\n')),(0,l.kt)("p",null,"There are 8 basic data types in JavaScript."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Seven primitive data types: number, bigint, string, boolean, null, undefined, symbol."),(0,l.kt)("li",{parentName:"ul"},"One non-primitive data type: object.")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},'"Primitive" values contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store keyed collections of various data and more complex entities.')),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"number")," type: integer, floating point numbers, ",(0,l.kt)("inlineCode",{parentName:"p"},"Infinity"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"-Infinity")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"NaN"),"."),(0,l.kt)("p",null,"\u6570\u5b66\u8fd0\u7b97\u5728 JavaScript \u662f\u5b89\u5168\u7684\uff0c\u5c31\u7b97\u9664\u4ee5 0 \u4e5f\u4e0d\u4f1a\u4f7f\u7a0b\u5e8f\u7ec8\u6b62\u8fd0\u884c\uff0c\u6700\u574f\u60c5\u51b5\u5c31\u662f\u5f97\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"NaN"),"\u3002"),(0,l.kt)("p",null,"\u7531\u4e8e\u5185\u90e8\u5b9e\u73b0\u7684\u539f\u56e0\uff0cJavaScript \u7684 number \u7c7b\u578b\u53ea\u80fd\u8868\u793a ","[-2^53-1, 2^53-1]"," \u8303\u56f4\u5185\u7684\u6570\uff0c\u5bf9\u4e8e\u4e00\u4e9b\u52a0\u5bc6\u3001\u5fae\u79d2\u7ea7\u65f6\u95f4\u6233\u7b49\u573a\u666f\u53ef\u80fd\u4e0d\u591f\uff0c\u6b64\u65f6\u5728\u6574\u6570\u540e\u9762\u52a0\u4e0a ",(0,l.kt)("inlineCode",{parentName:"p"},"n")," \u53ef\u4ee5\u5f97\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"BigInt")," \u7c7b\u578b\u3002"),(0,l.kt)("p",null,"A ",(0,l.kt)("inlineCode",{parentName:"p"},"string")," in JavaScript must be surrounded by quotes. Double and single quotes are practically no difference between them in JavaScript."),(0,l.kt)("p",null,"Backticks are \u201cextended functionality\u201d quotes:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let name = "John";\n// embed a variable\nalert(`Hello, ${name}!`); // Hello, John!\n// embed an expression\nalert(`the result is ${1 + 2}`); // the result is 3\n')),(0,l.kt)("p",null,"In JavaScript, ",(0,l.kt)("inlineCode",{parentName:"p"},"null")," is not a \u201creference to a non-existing object\u201d or a \u201cnull pointer\u201d like in some other languages. It\u2019s just a special value which represents \u201cnothing\u201d, \u201cempty\u201d or \u201cvalue unknown\u201d."),(0,l.kt)("p",null,"The meaning of ",(0,l.kt)("inlineCode",{parentName:"p"},"undefined")," is \u201cvalue is not assigned\u201d. ",(0,l.kt)("inlineCode",{parentName:"p"},"undefined")," is reserved as a default initial value for unassigned things.\uff08\u4e0d\u8981\u4e3b\u52a8\u7528\u5b83\uff09"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"object")," type is used to store collections of data and more complex entities. The ",(0,l.kt)("inlineCode",{parentName:"p"},"symbol")," type is used to create unique identifiers for objects."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"typeof")," \u8fd0\u7b97\u7b26\u8fd4\u56de\u5176\u53c2\u6570\u7684\u7c7b\u578b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'typeof "foo"; // "string"\ntypeof Symbol("id"); // "symbol"\ntypeof Math; // "object" Math is a built-in object.\ntypeof null; // "object" \u7531\u4e8e\u5386\u53f2\u539f\u56e0\uff0c\u8fd9\u4e2a\u662f\u9519\u7684\uff0c\u5b9a\u4e49\u4e0a null \u5e76\u4e0d\u662f\u5bf9\u8c61\u3002\ntypeof alert; // "function" function \u4e5f\u5c5e\u4e8e\u5bf9\u8c61\uff0c\u8fd9\u91cc\u4e5f\u662f\u7531\u4e8e\u5386\u53f2\u539f\u56e0\n')),(0,l.kt)("h2",{id:"fundamentals"},"Fundamentals"),(0,l.kt)("p",null,"\u7c7b\u578b\u8f6c\u6362\u3001\u8fd0\u7b97\u7b26\u3001\u6761\u4ef6\u3001\u5faa\u73af\u7b49\uff0c\u6b64\u7ae0\u7701\u7565\u3002"),(0,l.kt)("h2",{id:"functions"},"Functions"),(0,l.kt)("p",null,"Function declaration:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'function showMessage() {\n  alert("Hello everyone!");\n}\n')),(0,l.kt)("p",null,"Variables declared ",(0,l.kt)("strong",{parentName:"p"},"outside of any function")," are called global. Global variables are visible from any function."),(0,l.kt)("p",null,"Default values:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'function showMessage(from, text = "no text given") {\n  alert(from + ": " + text);\n}\n\nfunction showMessage(from, text = anotherFunction()) {\n  // anotherFunction() only executed if no text given\n}\n')),(0,l.kt)("p",null,"There is another syntax for creating a function that is called a ",(0,l.kt)("strong",{parentName:"p"},"Function Expression"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let sayHi = function () {\n  alert("Hello");\n};\n')),(0,l.kt)("p",null,"Please note, ",(0,l.kt)("strong",{parentName:"p"},"there\u2019s no name")," after the function keyword. Omitting a name is allowed for Function Expressions."),(0,l.kt)("p",null,"No matter how the function is created, ",(0,l.kt)("strong",{parentName:"p"},"a function is a value"),"."),(0,l.kt)("p",null,"The arguments below are called callback functions or just ",(0,l.kt)("strong",{parentName:"p"},"callbacks"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// usage: functions showOk, showCancel are passed as arguments to ask\nask("Do you agree?", showOk, showCancel);\n\nask(\n  "Do you agree?",\n  function () {\n    alert("You agreed.");\n  }, // anonymous function\n  function () {\n    alert("You canceled the execution.");\n  } // anonymous function\n);\n')),(0,l.kt)("p",null,"\u51fd\u6570\u8c03\u7528\u53ef\u4ee5\u53d1\u751f\u5728\u51fd\u6570\u58f0\u660e\u4e4b\u524d\u3002\u56e0\u4e3a\u8fd0\u884c\u65f6\u4f1a\u6709\u4e00\u4e2a\u521d\u59cb\u5316\u9636\u6bb5\uff0c\u627e\u5230\u6240\u6709\u7684\u51fd\u6570\u58f0\u660e\u3002"),(0,l.kt)("p",null,"We should use a Function Expression ",(0,l.kt)("strong",{parentName:"p"},"only when a Function Declaration is not fit for the task"),"."),(0,l.kt)("p",null,"\u51fd\u6570\u8868\u8fbe\u5f0f\u7684\u8bed\u6cd5\u7cd6\uff1a\u7bad\u5934\u51fd\u6570\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let sum = (a, b) => a + b;\n\n// \u5982\u679c\u53ea\u6709\u4e00\u4e2a\u53c2\u6570\uff0c\u62ec\u53f7\u8fd8\u53ef\u4ee5\u7701\u7565\nlet double = (n) => n * 2;\n\n// \u53c2\u6570\u4e3a\u7a7a\u65f6\uff0c\u62ec\u53f7\u4e0d\u80fd\u7701\u7565\nlet sayHi = () => alert("Hello!");\n\n// \u591a\u884c\u7bad\u5934\u51fd\u6570\nlet sum = (a, b) => {\n  let result = a + b;\n  return result;\n};\n')),(0,l.kt)("h2",{id:"objects"},"Objects"),(0,l.kt)("p",null,"Objects store properties. A property is a \u201ckey: value\u201d pair, where keys must be strings or symbols (usually strings), values can be of any type."),(0,l.kt)("p",null,"\u8bfb\u53d6\u5c5e\u6027\u6709\u4e24\u79cd\u8bed\u6cd5\uff1a\u70b9\u8bed\u6cd5\u548c\u65b9\u62ec\u53f7\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let user = new Object(); // "object constructor" syntax\nlet user = {\n  name: "John",\n  age: 30,\n}; // "object literal" syntax\n')),(0,l.kt)("p",null,"To remove a property, we can use the delete operator: ",(0,l.kt)("inlineCode",{parentName:"p"},"delete user.age;")),(0,l.kt)("p",null,"\u65b9\u62ec\u53f7\u8fd8\u53ef\u4ee5\u7528\u5728\u521b\u5efa\u5bf9\u8c61\u65f6\uff0c\u79f0\u4e3a\u201c\u8ba1\u7b97\u5c5e\u6027\u201d\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let fruit = "apple";\nlet bag = {\n  [fruit + "Computers"]: 5, // bag.appleComputers = 5\n};\n')),(0,l.kt)("p",null,"\u521b\u5efa\u5bf9\u8c61\u8fd8\u6709\u4e00\u79cd\u7b80\u6d01\u5199\u6cd5\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"function makeUser(name, age) {\n  return {\n    name, // same as name: name\n    age, // same as age: age\n  };\n}\n")),(0,l.kt)("p",null,"\u5f53\u975e\u5b57\u7b26\u4e32\u7c7b\u578b\u7528\u4f5c\u5bf9\u8c61\u7684 key \u65f6\uff0c\u4f1a\u88ab\u81ea\u52a8\u8f6c\u4e3a\u5b57\u7b26\u4e32\u7c7b\u578b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let obj = {\n  0: "test", // same as "0": "test"\n};\nalert(obj[0]); // same as obj["0"]\n')),(0,l.kt)("p",null,"Reading a non-existing property just returns ",(0,l.kt)("inlineCode",{parentName:"p"},"undefined"),"."),(0,l.kt)("p",null,"\u6d4b\u8bd5 key \u662f\u5426\u5728\u5c5e\u6027\u91cc\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let user = { name: "John", age: 30 };\nalert("age" in user); // true, user.age exists\n')),(0,l.kt)("p",null,"\u904d\u5386\u5bf9\u8c61\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"for (key in object) {...}")),(0,l.kt)("p",null,"Are objects ordered? - integer properties are sorted, others appear in creation order. (The \u201cinteger property\u201d term here means a string that can be converted to-and-from an integer without a change.)"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let codes = {\n  49: "Germany",\n  41: "Switzerland",\n  44: "Great Britain",\n  // ..,\n  1: "USA",\n};\n')),(0,l.kt)("p",null,"One of the fundamental differences of objects versus primitives is that objects are stored and copied \u201cby reference\u201d, whereas primitive values are always copied \u201cas a whole value\u201d."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"let a = {};\nlet b = a; // copy the reference\nlet c = {};\nalert( a == b ); // true\nalert( a === b ); // true\nalert( a == c ); // false\n")),(0,l.kt)("p",null,"Copying an object variable creates one more reference to the same object."),(0,l.kt)("p",null,"We can create a new object from the existing one, by iterating over its properties (for..in..) and copying them on the primitive level."),(0,l.kt)("p",null,"To make a \u201creal copy\u201d (a clone) we can use ",(0,l.kt)("inlineCode",{parentName:"p"},"Object.assign")," for the so-called \u201cshallow copy\u201d (nested objects are copied by reference) or a \u201cdeep cloning\u201d function, such as ",(0,l.kt)("inlineCode",{parentName:"p"},"_.cloneDeep(obj)")," from the JavaScript library lodash."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let user = {\n  name: "John",\n  age: 30,\n};\n\nlet clone = Object.assign({}, user);\n')),(0,l.kt)("p",null,"\u5373\u4f7f\u5bf9\u8c61\u88ab\u58f0\u660e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"const"),"\uff0c\u5b83\u7684\u5c5e\u6027\u4f9d\u7136\u53ef\u4ee5\u88ab\u4fee\u6539\uff0c\u56e0\u4e3a\u4e0d\u53d8\u7684\u53ea\u662f\u5f15\u7528\u3002"),(0,l.kt)("p",null,"\u5bf9\u8c61\u65b9\u6cd5\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'let user = {\n  name: "John",\n  age: 30,\n\n  sayHi() {\n    // "this" is the "current object"\n    alert(this.name);\n  },\n};\n\nuser.sayHi(); // John\n')),(0,l.kt)("p",null,"In JavaScript, keyword ",(0,l.kt)("inlineCode",{parentName:"p"},"this")," behaves unlike most other programming languages. It can be used in any function, even if it\u2019s not a method of an object."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'function sayHi() {\n  alert(this.name); // The value of this is evaluated during the run-time, depending on the context.\n}\n\nlet user = { name: "John" };\nlet admin = { name: "Admin" };\n\n// use the same function in two objects\nuser.f = sayHi;\nadmin.f = sayHi;\n\n// these calls have different this\n// "this" inside the function is the object "before the dot"\nuser.f(); // John  (this == user)\nadmin.f(); // Admin  (this == admin)\n')),(0,l.kt)("p",null,"The concept of run-time evaluated ",(0,l.kt)("inlineCode",{parentName:"p"},"this")," has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes."),(0,l.kt)("p",null,"Arrow functions are special: they don\u2019t have their \u201cown\u201d ",(0,l.kt)("inlineCode",{parentName:"p"},"this"),". If we reference ",(0,l.kt)("inlineCode",{parentName:"p"},"this")," from such a function, it\u2019s taken from the outer \u201cnormal\u201d function."),(0,l.kt)("h2",{id:"garbage-collection"},"Garbage collection"),(0,l.kt)("p",null,"The main concept of memory management in JavaScript is ",(0,l.kt)("strong",{parentName:"p"},"reachability"),"."),(0,l.kt)("p",null,"There\u2019s a base set of inherently ",(0,l.kt)("strong",{parentName:"p"},"reachable")," values, that cannot be deleted for obvious reasons. These values are called ",(0,l.kt)("strong",{parentName:"p"},"roots"),"."),(0,l.kt)("p",null,"Any other value is considered reachable if it\u2019s reachable from a root by a reference or by a chain of references."),(0,l.kt)("p",null,"There\u2019s a background process in the JavaScript engine that is called ",(0,l.kt)("strong",{parentName:"p"},"garbage collector"),". It monitors all objects and removes those that have become unreachable."),(0,l.kt)("p",null,"\u4e00\u4e2a\u5bf9\u8c61\u201c\u88ab\u5f15\u7528\u201d\u548c\u201c\u53ef\u5230\u8fbe\u201d\u662f\u4e0d\u4e00\u6837\u7684\u6982\u5ff5\u3002\u53ef\u80fd\u5b58\u5728\u4e00\u7ec4\u76f8\u4e92\u5f15\u7528\u7684\u5bf9\u8c61\uff0c\u4f46\u5176\u6574\u4f53\u5374\u4e0d\u53ef\u8fbe\u3002It is possible that the whole ",(0,l.kt)("strong",{parentName:"p"},"island")," of interlinked objects becomes unreachable and is removed from the memory."),(0,l.kt)("p",null,"The basic garbage collection algorithm is called \u201cmark-and-sweep\u201d."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u4ece\u6839\u8282\u70b9\u51fa\u53d1\uff0c\u627e\u5230\u6839\u8282\u70b9\u76f4\u63a5\u5f15\u7528\u7684\u5bf9\u8c61\uff0c\u6807\u8bb0\u5b83\u4eec\uff1b"),(0,l.kt)("li",{parentName:"ul"},"\u4ece\u4e0a\u4e00\u6b65\u6807\u8bb0\u7684\u5bf9\u8c61\u51fa\u53d1\uff0c\u627e\u5230\u5176\u76f4\u63a5\u5f15\u7528\u7684\u5bf9\u8c61\uff0c\u6807\u8bb0\u5b83\u4eec\uff1b"),(0,l.kt)("li",{parentName:"ul"},"\u2026\u2026\u5982\u6b64\u91cd\u590d\uff0c\u76f4\u5230\u6240\u6709\u53ef\u5230\u8fbe\u7684\u5bf9\u8c61\u90fd\u88ab\u8bbf\u95ee\u5230\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u6240\u6709\u6ca1\u6709\u88ab\u6807\u8bb0\u7684\u5bf9\u8c61\u5c06\u88ab\u6e05\u9664\u3002")),(0,l.kt)("p",null,"That\u2019s the concept of how garbage collection works. JavaScript engines apply many ",(0,l.kt)("strong",{parentName:"p"},"optimizations")," to make it run faster and not introduce any delays into the code execution."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5206\u4ee3\u56de\u6536\uff1a\u9488\u5bf9\u4e0d\u540c\u7684\u4ee3\u4f7f\u7528\u4e0d\u540c\u7684 GC \u7b97\u6cd5\uff1b\u65b0\u751f\u6210\u7684\u5bf9\u8c61\u79f0\u4e3a\u5e74\u8f7b\u4ee3\uff0c\u5927\u591a\u6570\u5bf9\u8c61\u5b58\u6d3b\u65f6\u95f4\u90fd\u6bd4\u8f83\u77ed\uff0c\u53ef\u4ee5\u7528\u6807\u8bb0-\u64e6\u9664\u7b97\u6cd5\uff1b\u7ecf\u5386\u591a\u6b21 GC \u4ecd\u7136\u5b58\u6d3b\u7684\u5bf9\u8c61\uff0c\u5c31\u664b\u5347\u4e3a\u8001\u5e74\u4ee3\uff0c\u8001\u5e74\u4ee3 GC \u7684\u9891\u7387\u4f1a\u5f88\u4f4e\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u589e\u91cf\u56de\u6536\uff1a\u5141\u8bb8 GC \u5206\u591a\u4e2a\u5c0f\u6279\u6b21\u6267\u884c\uff0c\u6bcf\u6b21\u9020\u6210\u7684\u505c\u987f\u90fd\u5f88\u5c0f\uff0c\u8fbe\u5230\u8fd1\u4f3c\u5b9e\u65f6\u7684\u6548\u679c\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u95f2\u65f6\u56de\u6536\uff1a\u4ec5\u5728 CPU \u7a7a\u95f2\u65f6\u8fdb\u884c\u5783\u573e\u56de\u6536\u3002")))}c.isMDXComponent=!0}}]);