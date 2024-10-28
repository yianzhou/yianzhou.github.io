"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5001],{75873:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>u,contentTitle:()=>p,default:()=>s,frontMatter:()=>l,metadata:()=>k,toc:()=>i});var a=n(87462),r=(n(67294),n(3905));n(61839);const l={slug:"/"},p="\u57fa\u7840\u77e5\u8bc6",k={unversionedId:"basics",id:"basics",title:"\u57fa\u7840\u77e5\u8bc6",description:"\u673a\u5668\u5b66\u4e60",source:"@site/docs/ai/basics.md",sourceDirName:".",slug:"/",permalink:"/docs/ai/",draft:!1,tags:[],version:"current",frontMatter:{slug:"/"},sidebar:"tutorialSidebar",next:{title:"Prompt",permalink:"/docs/ai/prompt"}},u={},i=[{value:"\u673a\u5668\u5b66\u4e60",id:"\u673a\u5668\u5b66\u4e60",level:2},{value:"GPT",id:"gpt",level:2},{value:"ChatGPT",id:"chatgpt",level:2},{value:"RAG",id:"rag",level:2}],o={toc:i};function s(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},o,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u57fa\u7840\u77e5\u8bc6"},"\u57fa\u7840\u77e5\u8bc6"),(0,r.kt)("h2",{id:"\u673a\u5668\u5b66\u4e60"},"\u673a\u5668\u5b66\u4e60"),(0,r.kt)("p",null,"\u673a\u5668\u5b66\u4e60\u7684\u4e09\u4e2a\u8981\u7d20\uff1a\u6a21\u578b\u3001\u8bad\u7ec3\u6570\u636e\u3001\u5b66\u4e60\u65b9\u5f0f\u3002"),(0,r.kt)("p",null,"\u6a21\u578b\u7b80\u5355\u7406\u89e3\u5c31\u662f\u4e00\u4e2a\u6570\u5b66\u51fd\u6570\uff0c\u8fd9\u4e2a\u51fd\u6570\u7684\u53c2\u6570\u975e\u5e38\u591a\uff0c\u591a\u8fbe\u51e0\u5343\u4e07\u3001\u51e0\u4ebf\u4e2a\u3002"),(0,r.kt)("p",null,"\u8bad\u7ec3\u6a21\u578b\u5c31\u662f\u5229\u7528\u5927\u91cf\u7684\u8bad\u7ec3\u6570\u636e\u6765\u8c03\u6574\u8fd9\u4e2a\u6570\u5b66\u51fd\u6570\u7684\u53c2\u6570\u3002\u901a\u8fc7\u8bad\u7ec3\u96c6\u7684\u8c03\u6559\uff0c\u8ba9\u8fd9\u51e0\u4ebf\u4e2a\u53c2\u6570\u8fbe\u5230\u8f83\u4e3a\u7406\u60f3\u7684\u72b6\u6001\uff0c\u4f7f\u5f97\u5728\u6d4b\u8bd5\u96c6\u4e2d\u8f93\u5165\u6307\u5b9a\u7684\u6570\u636e\u5c31\u80fd\u5f97\u5230\u9884\u671f\u7684\u8f93\u51fa\u3002"),(0,r.kt)("p",null,"\u201c\u8bad\u7ec3\u201d\u4e00\u8bcd\u662f\u4ee5\u4eba\u4e3a\u4e3b\u4f53\u7684\u8868\u793a\uff0c\u5982\u679c\u4ee5\u201c\u673a\u5668\u201d\u4e3a\u4e3b\u4f53\uff0c\u5219\u79f0\u4e4b\u4e3a\u201c\u5b66\u4e60\u201d\u3002"),(0,r.kt)("p",null,"\u673a\u5668\u5b66\u4e60\u7684\u65b9\u5f0f\u4e3b\u8981\u5206\u4e3a\u4e09\u79cd\uff1a\u5206\u522b\u662f\u6709\u76d1\u7763\u5b66\u4e60 (Supervised Learning)\u3001\u65e0\u76d1\u7763\u5b66\u4e60 (Unsupervised Learning) \u548c\u5f3a\u5316\u5b66\u4e60 (Reinforcement Learning)\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u6709\u76d1\u7763\u5b66\u4e60\uff1a\u6307\u7684\u662f\u6211\u4eec\u5728\u7ed9\u673a\u5668\u63d0\u4f9b\u8bad\u7ec3\u6570\u636e\u65f6\uff0c\u63d0\u4f9b\u7684\u6570\u636e\u662f\u5e26\u6709\u6807\u7b7e\u6216\u7c7b\u522b\u4fe1\u606f\u7684\uff0c\u8fd9\u6837\u673a\u5668\u624d\u80fd\u591f\u5b66\u4e60\u8f93\u5165\u548c\u8f93\u51fa\u4e4b\u95f4\u7684\u6620\u5c04\u5173\u7cfb\uff0c\u4ece\u800c\u5bf9\u65b0\u7684\u8f93\u5165\u8fdb\u884c\u9884\u6d4b\u3002\u6709\u76d1\u7763\u5b66\u4e60\u7684\u5e94\u7528\u573a\u666f\u975e\u5e38\u5e7f\u6cdb\uff0c\u5982\u56fe\u50cf\u8bc6\u522b\u3001\u80a1\u4ef7\u9884\u6d4b\u7b49\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u65e0\u76d1\u7763\u5b66\u4e60\uff1a\u5373\u63d0\u4f9b\u7ed9\u673a\u5668\u8bad\u7ec3\u7684\u6570\u636e\u662f\u672a\u88ab\u6807\u8bb0\u7684\u6570\u636e\uff0c\u7531\u673a\u5668\u81ea\u5df1\u901a\u8fc7\u67d0\u4e9b\u7b97\u6cd5\u53d1\u73b0\u6570\u636e\u4e4b\u95f4\u7684\u6f5c\u5728\u7ed3\u6784\u4e0e\u89c4\u5f8b\u3002\u65e0\u76d1\u7763\u5b66\u4e60\u7684\u5e94\u7528\u573a\u666f\u6709\u5f02\u5e38\u68c0\u6d4b\u3001\u63a8\u8350\u7cfb\u7edf\u7b49\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5f3a\u5316\u5b66\u4e60\uff1a\u662f\u4e00\u79cd\u8ba9\u673a\u5668\u81ea\u5df1\u5b66\u4e60\u5982\u4f55\u505a\u51fa\u6b63\u786e\u51b3\u7b56\u7684\u65b9\u5f0f\u3002\u5c31\u50cf\u4eba\u7c7b\u73a9\u300a\u98de\u673a\u5927\u6218\u300b\u8fd9\u4e2a\u6e38\u620f\u4e00\u6837\uff0c\u4e0d\u540c\u7684\u64cd\u4f5c\u4f1a\u5f97\u5230\u73af\u5883\u7684\u4e0d\u540c\u53cd\u9988\uff08\u6263\u5206\u6216\u52a0\u5206\uff09\uff0c\u57fa\u4e8e\u73af\u5883\u53cd\u9988\uff0c\u673a\u5668\u4f1a\u4e0d\u65ad\u8c03\u6574\u3001\u4f18\u5316\u81ea\u5df1\u7684\u64cd\u4f5c\uff0c\u6700\u7ec8\u8fbe\u5230\u83b7\u53d6\u6700\u9ad8\u5206\u7684\u76ee\u7684\u3002\u5f3a\u5316\u5b66\u4e60\u9002\u7528\u4e8e\u90a3\u4e9b\u76ee\u6807\u4e0d\u786e\u5b9a\u3001\u73af\u5883\u52a8\u6001\u53d8\u5316\u3001\u9700\u8981\u957f\u671f\u89c4\u5212\u7684\u95ee\u9898\uff0c\u5982\u81ea\u52a8\u9a7e\u9a76\u3001\u673a\u5668\u4eba\u63a7\u5236\u3001\u6e38\u620f AI \u7b49\u3002")),(0,r.kt)("p",null,"\u5b9e\u9645\u5e94\u7528\u4e2d\u6a21\u578b\u662f\u7531\u975e\u5e38\u591a\u7684\u6570\u5b66\u51fd\u6570\u4ee5\u7f51\u72b6\u6216\u66f4\u52a0\u590d\u6742\u7684\u5f62\u72b6\u5f62\u6210\u7684\u4e00\u4e2a\u62d3\u6251\u7ed3\u6784\uff0c\u7531\u4e8e\u8fd9\u79cd\u62d3\u6251\u7ed3\u6784\u4e0e\u4eba\u7684\u795e\u7ecf\u7f51\u7edc\u7ed3\u6784\u975e\u5e38\u76f8\u4f3c\uff0c\u6211\u4eec\u79f0\u4e4b\u4e3a\u4eba\u5de5\u795e\u7ecf\u7f51\u7edc\uff08Artificial Neural Network\uff0cANN\uff09\u3002\u4eba\u5de5\u795e\u7ecf\u7f51\u7edc\u6839\u636e\u5b9e\u9645\u5e94\u7528\u573a\u666f\u7684\u4e0d\u540c\u53d1\u5c55\u51fa\u591a\u79cd\u5f62\u6001\uff0c\u5e94\u7528\u6700\u5e7f\u6cdb\u7684\u795e\u7ecf\u7f51\u7edc\u6709\uff1a\u524d\u9988\u795e\u7ecf\u7f51\u7edc\uff08Feedforward Neural Network, FNN\uff09\u3001\u5377\u79ef\u795e\u7ecf\u7f51\u7edc\uff08Convolutional Neural Network\uff0cCNN\uff09\u548c\u5faa\u73af\u795e\u7ecf\u7f51\u7edc\uff08Recurrent Neural Network\uff0cRNN\uff09\u3002"),(0,r.kt)("p",null,'\u5728\u8ba8\u8bba\u673a\u5668\u5b66\u4e60\u548c\u6df1\u5ea6\u5b66\u4e60\u6a21\u578b\u65f6\uff0c"B" \u901a\u5e38\u6307\u7684\u662f "Billion"\uff08\u5341\u4ebf\uff09\uff0c\u7528\u4e8e\u8868\u793a\u6a21\u578b\u7684',(0,r.kt)("strong",{parentName:"p"},"\u53c2\u6570\u6570\u91cf"),'\u3002\u4f8b\u5982\uff0c\u5982\u679c\u4e00\u4e2a\u6a21\u578b\u88ab\u63cf\u8ff0\u4e3a "175B"\uff0c\u8fd9\u610f\u5473\u7740\u8be5\u6a21\u578b\u6709 1750 \u4ebf\u4e2a\u53c2\u6570\u3002'),(0,r.kt)("h2",{id:"gpt"},"GPT"),(0,r.kt)("p",null,"GPT \u5373 Generative Pre-trained Transformer\uff0c\u662f\u7531 OpenAI \u56e2\u961f\u5f00\u53d1\u7684\u4e00\u79cd\u57fa\u4e8e\u81ea\u7136\u8bed\u8a00\u5904\u7406\u6280\u672f\u7684",(0,r.kt)("strong",{parentName:"p"},"\u751f\u6210\u5f0f\u3001\u9884\u8bad\u7ec3\u3001\u5927\u8bed\u8a00\u6a21\u578b"),"\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u5224\u522b\u5f0f\u6a21\u578b"),"\u5173\u6ce8\u5982\u4f55\u5c06\u8f93\u5165\u6570\u636e\u6620\u5c04\u5230\u6807\u7b7e\u6216\u7c7b\u522b\uff0c\u4f8b\u5982\u5206\u7c7b\u3001\u56de\u5f52\u7b49\u95ee\u9898\uff1b\u800c",(0,r.kt)("strong",{parentName:"p"},"\u751f\u6210\u5f0f\u6a21\u578b"),"\u5219\u5173\u6ce8\u5982\u4f55\u5b66\u4e60\u6570\u636e\u7684\u5206\u5e03\uff0c\u4ee5\u4fbf\u751f\u6210\u65b0\u7684\u6570\u636e\u3002ChatGPT \u80fd\u591f\u4ece\u5927\u91cf\u7684\u8bed\u6599\u5e93\u4e2d\u5b66\u4e60\u5230\u590d\u6742\u7684\u8bed\u8a00\u7ed3\u6784\u548c\u4e0a\u4e0b\u6587\u4fe1\u606f\uff0c\u4ece\u800c\u751f\u6210\u65b0\u7684\u7b26\u5408\u8bed\u8a00\u89c4\u5219\u548c\u8bed\u5883\u7684\u6587\u672c\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u9884\u8bad\u7ec3\u6a21\u578b"),"\u662f\u6307\u8be5\u6a21\u578b\u9884\u5148\u4ece\u5927\u89c4\u6a21\u7684\u8bed\u6599\u5e93\u4e2d\u901a\u8fc7\u65e0\u76d1\u7763\u7684\u65b9\u5f0f\u5b66\u4e60\u8bed\u8a00\u7684\u5185\u5728\u89c4\u5f8b\u548c\u6a21\u5f0f\uff0c\u5176\u80fd\u591f\u5b66\u4e60\u5230\u6570\u636e\u96c6\u7684\u7edf\u8ba1\u89c4\u5f8b\u5e76\u63d0\u53d6\u51fa\u6570\u636e\u4e2d\u7684\u7279\u5f81\u3002\u8fd9\u6837\uff0c\u5728\u8fdb\u884c\u5177\u4f53\u4efb\u52a1\u7684\u65f6\u5019\uff0cGPT \u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u5df2\u7ecf\u5b66\u4e60\u5230\u7684\u77e5\u8bc6\uff0c\u4ece\u800c\u63d0\u9ad8\u6548\u7387\u548c\u51c6\u786e\u6027\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u5927\u6a21\u578b"),"\u6307\u7684\u662f\u5177\u6709\u975e\u5e38\u5e9e\u5927\u7684\u53c2\u6570\u91cf\u548c\u8ba1\u7b97\u91cf\u7684\u673a\u5668\u5b66\u4e60\u6a21\u578b\u3002\u8fd9\u4e9b\u6a21\u578b\u901a\u5e38\u9700\u8981\u5728\u5927\u89c4\u6a21\u7684\u6570\u636e\u96c6\u4e0a\u8fdb\u884c\u8bad\u7ec3\uff0c\u4ee5\u4fbf\u80fd\u591f\u5b66\u4e60\u5230\u6570\u636e\u4e2d\u7684\u590d\u6742\u6a21\u5f0f\u548c\u89c4\u5f8b\uff0c\u5e76\u5728\u5404\u79cd\u4efb\u52a1\u4e2d\u53d6\u5f97\u4f18\u79c0\u7684\u6027\u80fd\u8868\u73b0\u3002ChatGPT \u7531\u4e8e\u5176\u62e5\u6709 1750 \u4ebf\u4e2a\u53c2\u6570\u548c\u8d85\u8fc7 45TB \u7684\u8bad\u7ec3\u6570\u636e\u6240\u4ee5\u88ab\u79f0\u4e4b\u4e3a\u5927\u6a21\u578b\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u8bed\u8a00\u6a21\u578b"),"\u533a\u522b\u4e0e\u56fe\u50cf\u6a21\u578b\u3001\u8bed\u97f3\u6a21\u578b\u7b49\uff0c\u662f\u4e00\u79cd\u7528\u6765",(0,r.kt)("strong",{parentName:"p"},"\u9884\u6d4b\u81ea\u7136\u8bed\u8a00\u6587\u672c\u5e8f\u5217\u7684\u6982\u7387\u5206\u5e03\u7684\u8ba1\u7b97\u6a21\u578b"),"\u3002\u7b80\u5355\u6765\u8bf4\uff0c\u5b83\u5c31\u662f\u4e00\u4e2a\u80fd\u591f\u6839\u636e\u524d\u9762\u7684\u6587\u672c\u5185\u5bb9\u9884\u6d4b\u4e0b\u4e00\u4e2a\u53ef\u80fd\u51fa\u73b0\u7684\u8bcd\u6216\u5b57\u7684\u6a21\u578b\u3002\u8bed\u8a00\u6a21\u578b\u901a\u5e38\u88ab\u7528\u4e8e\u81ea\u7136\u8bed\u8a00\u5904\u7406\u4efb\u52a1\uff0c\u6bd4\u5982\u8bed\u97f3\u8bc6\u522b\u3001\u673a\u5668\u7ffb\u8bd1\u3001\u6587\u672c\u751f\u6210\u3001\u6587\u672c\u5206\u7c7b\u7b49\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Transformer")," \u662f\u4e00\u79cd\u7528\u4e8e\u81ea\u7136\u8bed\u8a00\u5904\u7406\u7684\u795e\u7ecf\u7f51\u7edc\u6a21\u578b\uff0c\u7531 Google \u63d0\u51fa\uff0c\u76ee\u7684\u4e3b\u8981\u662f\u4e3a\u4e86\u89e3\u51b3\u5faa\u73af\u795e\u7ecf\u7f51\u7edc\u5728\u5904\u7406\u957f\u5e8f\u5217\u65f6\u5b58\u5728\u7684\u4e00\u4e9b\u95ee\u9898\uff08\u7b80\u5355\u6765\u8bf4\uff0c\u5faa\u73af\u795e\u7ecf\u7f51\u7edc\u65e0\u6cd5\u8bb0\u4f4f\u4e00\u6bb5\u6587\u672c\u4e2d\u8f83\u65e9\u7684\u5355\u8bcd\u5e76\u4e0e\u5f53\u524d\u7684\u5355\u8bcd\u8fdb\u884c\u5173\u8054\uff09\u3002Transformer \u6a21\u578b\u7684\u6838\u5fc3\u662f\u81ea\u6ce8\u610f\u529b\u673a\u5236\uff08self-attention mechanism\uff09\uff0c\u5b83\u53ef\u4ee5\u5e2e\u52a9\u8ba1\u7b97\u673a\u66f4\u597d\u5730\u7406\u89e3\u6570\u636e\u4e2d\u4e0d\u540c\u5143\u7d20\u4e4b\u95f4\u7684\u5173\u7cfb\u3002\u4e3e\u4e2a\u4f8b\u5b50\uff0c\u5f53\u8ba1\u7b97\u673a\u9605\u8bfb\u4e00\u6bb5\u6587\u5b57\u65f6\uff0c\u81ea\u6ce8\u610f\u529b\u673a\u5236\u53ef\u4ee5\u627e\u51fa\u54ea\u4e9b\u5355\u8bcd\u4e0e\u5176\u4ed6\u5355\u8bcd\u4e4b\u95f4\u7684\u5173\u7cfb\u66f4\u5bc6\u5207\uff0c\u89e3\u51b3\u4e86\u5355\u8bcd\u95f4\u7684\u957f\u8ddd\u79bb\u4f9d\u8d56\u95ee\u9898\uff0c\u4ece\u800c\u66f4\u597d\u5730\u7406\u89e3\u8fd9\u6bb5\u6587\u5b57\u3002"),(0,r.kt)("p",null,"GPT \u7684\u57fa\u672c\u539f\u7406\uff1a",(0,r.kt)("strong",{parentName:"p"},"\u81ea\u56de\u5f52\u751f\u6210"),"\uff0c\u5373\u5148\u7528\u6a21\u578b\u9884\u6d4b\u4e0b\u4e00\u4e2a\u8bcd\u662f\u4ec0\u4e48\uff0c\u7136\u540e\u628a\u9884\u6d4b\u51fa\u6765\u7684\u8bcd\u4ee3\u5165\u6a21\u578b\uff0c\u53bb\u9884\u6d4b\u4e0b\u4e00\u4e2a\u8bcd\u662f\u4ec0\u4e48\uff0c\u4e0d\u65ad\u8fed\u4ee3\u3002\u50cf\u662f\u4e00\u4e2a\u9012\u5f52\u7248\u7684\u201c\u5355\u5b57\u63a5\u9f99\u201d\u3002ChatGPT \u559c\u6b22\u7d6e\u7d6e\u53e8\u53e8\u4e00\u5927\u5806\uff0c\u6216\u8005\u91cd\u590d\u6211\u4eec\u6240\u8bf4\u7684\u8bdd\uff0c\u8fd9\u4e0d\u5149\u662f\u4e3a\u4e86\u544a\u8bc9\u4f60\u89e3\u9898\u601d\u8def\uff0c\u800c\u66f4\u662f\u4e3a\u4e86\u5c06\u8fd9\u6bb5\u4fe1\u606f\u4f5c\u4e3a\u4e0a\u6587\u7684\u8865\u5145\uff0c\u518d\u4ece\u4e2d\u63d0\u53d6\u5173\u952e\u4fe1\u606f\uff0c\u4ee5\u4fbf\u8fdb\u4e00\u6b65\u751f\u6210\u6b63\u786e\u7684\u7ed3\u679c\u3002"),(0,r.kt)("h2",{id:"chatgpt"},"ChatGPT"),(0,r.kt)("p",null,"ChatGPT \u8bad\u7ec3\u8fc7\u7a0b\u4e3b\u8981\u5206\u6210\u4e09\u6b65\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u65e0\u76d1\u7763\u5b66\u4e60\u9636\u6bb5\uff1a\u4e92\u8054\u7f51\u722c\u53d6\u7f51\u9875(\u7ea6 31 \u4ebf\u4e2a)\u3001\u4e66\u7c4d\u3001\u7ef4\u57fa\u767e\u79d1\u3001\u535a\u5ba2\u3001\u65b0\u95fb\u3001Github \u4ee3\u7801\u7b49\uff0c\u6570\u636e\u6765\u6e90\u5e9e\u5927\u4e14\u516c\u5f00\uff0c\u4f46\u53ef\u80fd\u542b\u6709\u6709\u5bb3\u5185\u5bb9\u3001\u90e8\u4efd\u5185\u5bb9\u8d28\u91cf\u4e0d\u9ad8\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u76d1\u7763\u5b66\u4e60\u9636\u6bb5\uff1a\u7528\u4eba\u5de5\u4e13\u95e8\u5199\u597d\u7684\u300c\u4f18\u8d28\u5bf9\u8bdd\u8303\u4f8b\u300d\u8ba9\u5b83\u518d\u6b21\u5b66\u4e60\uff0c\u8fd9\u4e9b\u8303\u4f8b\u9700\u8981\u4eba\u5de5\u4e13\u95e8\u7f16\u5199\uff0c\u4ef7\u683c\u6602\u8d35\uff0c\u6570\u91cf\u6709\u9650\uff0c\u6240\u80fd\u63d0\u4f9b\u7684\u8bed\u8a00\u591a\u6837\u6027\u4e0d\u8db3\uff0c\u53ef\u80fd\u96be\u4ee5\u8ba9\u6a21\u578b\u5b66\u5230\u5e7f\u6cdb\u9002\u7528\u7684\u8bed\u8a00\u89c4\u5f8b\uff0c\u4e5f\u65e0\u6cd5\u6d89\u730e\u5404\u4e2a\u9886\u57df\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u57fa\u4e8e\u4eba\u7c7b\u53cd\u9988\u7684\u5f3a\u5316\u5b66\u4e60\uff1a\u4eba\u5de5\u7ed9\u56de\u7b54\u6253\u5206\uff0c\u5e76\u4e14\u5bf9\u7ed3\u679c\u8fdb\u884c\u6392\u5e8f\uff0c\u5229\u7528\u8fd9\u4e9b\u300c\u4eba\u7c7b\u6392\u5e8f\u7ed3\u679c\u300d\u91cd\u65b0\u8c03\u6574\u6a21\u578b\u3002")),(0,r.kt)("p",null,"\u5728\u5355\u5b57\u63a5\u9f99\u7684\u5c0f\u6a21\u578b\u4e2d\uff0c\u5e76\u6ca1\u6709\u89c9\u9192\u51fa\u201c\u7406\u89e3\u201d\u548c\u201c\u63a8\u7406\u201d\u7684\u80fd\u529b\uff0c\u4f46\u5728\u8d85\u5927\u6a21\u578b\u4e2d\uff0c\u5374\u7a81\u7136\u5c55\u73b0\u3002\u56e0\u6b64\u4e13\u5bb6\u7528\u201c",(0,r.kt)("strong",{parentName:"p"},"\u6d8c\u73b0"),"\u201d\u8fd9\u4e2a\u8bcd\u6765\u63cf\u8ff0\u8fd9\u4e9b\u80fd\u529b\u7684\u51fa\u73b0\u3002"),(0,r.kt)("p",null,"\u8d85\u5927\u8bed\u8a00\u6a21\u578b\u610f\u5916\u638c\u63e1\u4e86\u201c\u7406\u89e3\u6307\u4ee4\u8981\u6c42\u201d\u3001\u201c\u7406\u89e3\u4f8b\u5b50\u8981\u6c42\u201d\u7684\u80fd\u529b\u3002\u8fd9\u79cd\u73b0\u8c61\u88ab\u79f0\u4e3a\u201c",(0,r.kt)("strong",{parentName:"p"},"\u8bed\u5883\u5185\u5b66\u4e60"),"\u201d\uff08In-context Learning\uff09\u3002"),(0,r.kt)("p",null,"\u5f53 ChatGPT \u65e0\u6cd5\u56de\u7b54\u4e00\u4e2a\u5927\u95ee\u9898\u65f6\uff0c\u82e5\u8981\u6c42\u5b83\u5206\u6b65\u601d\u8003\uff0c\u5b83\u5c31\u53ef\u4ee5\u4e00\u6b65\u6b65\u8fde\u7eed\u63a8\u7406\uff0c\u4e14\u6700\u7ec8\u7b54\u5bf9\u7684\u53ef\u80fd\u6027\u5927\u5e45\u63d0\u5347\uff0c\u8be5\u80fd\u529b\u4e5f\u53eb\u201c",(0,r.kt)("strong",{parentName:"p"},"\u601d\u7ef4\u94fe"),"\u201d\u3002\u7c7b\u4f3c\u4e8e\u4eba\u7c7b\u7684\u5206\u6cbb\u601d\u60f3\u3002"),(0,r.kt)("p",null,"ChatGPT \u8ba9 AI \u7b2c\u4e00\u6b21\u770b\u4f3c\u62e5\u6709\u4e86\u201c\u4e4c\u9e26\u201d\u6a21\u5f0f\uff08\u89c2\u5bdf\u3001\u611f\u77e5\u3001\u8ba4\u77e5\u3001\u5b66\u4e60\u3001\u63a8\u7406\u3001\u6267\u884c\uff09\u7684\u667a\u80fd\uff0c\u800c\u4e0d\u4ec5\u4ec5\u53ea\u662f\u50cf\u9e66\u9e49\u90a3\u6837\u5b66\u820c\uff0c\u5b83\u770b\u4e0a\u53bb\u50cf\u662f\u771f\u7684\u4f1a\u601d\u8003\u4e86\u3002"),(0,r.kt)("p",null,"\u4eba\u8111\u4e2d\u5355\u4e2a\u795e\u7ecf\u5143\u7684\u5de5\u4f5c\u65b9\u5f0f\u7279\u522b\u7b80\u5355\uff0c\u5c31\u662f\u5411\u4e0b\u4e00\u4e2a\u795e\u7ecf\u5143\u653e\u7535\uff0c\u4f46\u662f\u901a\u8fc7\u5927\u529b\u51fa\u5947\u8ff9\u7684\u65b9\u5f0f\u5806\u780c\u51e0\u767e\u4ebf\u7684\u795e\u7ecf\u5143\u4ee5\u540e\uff0c\u610f\u8bc6\u5c31\u51fa\u73b0\u4e86\u3002"),(0,r.kt)("h2",{id:"rag"},"RAG"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u68c0\u7d22\u589e\u5f3a\u751f\u6210\uff08RAG\uff09"),"\u662f\u6307\u5bf9\u5927\u578b\u8bed\u8a00\u6a21\u578b\u8f93\u51fa\u8fdb\u884c\u4f18\u5316\uff0c\u4f7f\u5176\u80fd\u591f\u5728\u751f\u6210\u54cd\u5e94\u4e4b\u524d\u5f15\u7528\u8bad\u7ec3\u6570\u636e\u6765\u6e90\u4e4b\u5916\u7684\u6743\u5a01\u77e5\u8bc6\u5e93\u3002\u5728 LLM \u672c\u5c31\u5f3a\u5927\u7684\u529f\u80fd\u57fa\u7840\u4e0a\uff0cRAG \u5c06\u5176\u6269\u5c55\u4e3a\u80fd\u8bbf\u95ee\u7279\u5b9a\u9886\u57df\u6216\u7ec4\u7ec7\u7684\u5185\u90e8\u77e5\u8bc6\u5e93\uff0c\u6240\u6709\u8fd9\u4e9b\u90fd\u65e0\u9700\u91cd\u65b0\u8bad\u7ec3\u6a21\u578b\u3002\u8fd9\u662f\u4e00\u79cd\u7ecf\u6d4e\u9ad8\u6548\u5730\u6539\u8fdb LLM \u8f93\u51fa\u7684\u65b9\u6cd5\uff0c\u8ba9\u5b83\u5728\u5404\u79cd\u60c5\u5883\u4e0b\u90fd\u80fd\u4fdd\u6301\u76f8\u5173\u6027\u3001\u51c6\u786e\u6027\u548c\u5b9e\u7528\u6027\u3002"),(0,r.kt)("p",null,"\u5728\u751f\u6210\u54cd\u5e94\u4e4b\u524d\uff0cRAG \u9996\u5148\u4f1a\u4ece\u4e00\u4e2a\u5927\u578b\u6587\u6863\u5e93\u6216\u77e5\u8bc6\u5e93\u4e2d\u68c0\u7d22\u4e0e\u8f93\u5165\u67e5\u8be2\u76f8\u5173\u7684\u4fe1\u606f\u3002\u8fd9\u4e00\u8fc7\u7a0b\u901a\u5e38\u4f7f\u7528\u4fe1\u606f\u68c0\u7d22\u6280\u672f\uff0c\u5982\u57fa\u4e8e\u5411\u91cf\u7684\u76f8\u4f3c\u6027\u641c\u7d22\u6216\u4f20\u7edf\u7684\u5173\u952e\u8bcd\u5339\u914d\u3002\u4e00\u65e6\u68c0\u7d22\u5230\u76f8\u5173\u4fe1\u606f\uff0cRAG \u4f1a\u5c06\u8fd9\u4e9b\u4fe1\u606f\u4e0e\u8f93\u5165\u67e5\u8be2\u4e00\u8d77\u4f20\u9012\u7ed9\u751f\u6210\u6a21\u578b\uff08\u5982 Transformer \u6a21\u578b\uff09\uff0c\u4ee5\u751f\u6210\u6700\u7ec8\u7684\u54cd\u5e94\u3002",(0,r.kt)("strong",{parentName:"p"},"\u751f\u6210\u6a21\u578b\u5229\u7528\u68c0\u7d22\u5230\u7684\u4fe1\u606f\u6765\u63d0\u4f9b\u66f4\u51c6\u786e\u548c\u4e0a\u4e0b\u6587\u76f8\u5173\u7684\u7b54\u6848"),"\u3002"))}s.isMDXComponent=!0}}]);