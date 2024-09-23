"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7894],{65177:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>p});var n=i(87462),a=(i(67294),i(3905));i(61839);const l={},o="Git",r={unversionedId:"git",id:"git",title:"Git",description:"\u65e5\u5e38\u547d\u4ee4",source:"@site/docs/dev/git.md",sourceDirName:".",slug:"/git",permalink:"/docs/dev/git",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"gRPC",permalink:"/docs/dev/gRPC"},next:{title:"Google",permalink:"/docs/dev/google"}},s={},p=[{value:"\u65e5\u5e38\u547d\u4ee4",id:"\u65e5\u5e38\u547d\u4ee4",level:2},{value:"gitignore",id:"gitignore",level:2},{value:"lfs",id:"lfs",level:2},{value:"Step-by-step",id:"step-by-step",level:3},{value:"Migrate",id:"migrate",level:3},{value:"Config",id:"config",level:2},{value:"submodule",id:"submodule",level:2},{value:"\u5982\u4f55\u67e5\u627e\u88ab\u5220\u9664\u7684\u4ee3\u7801",id:"\u5982\u4f55\u67e5\u627e\u88ab\u5220\u9664\u7684\u4ee3\u7801",level:2}],g={toc:p};function d(e){let{components:t,...l}=e;return(0,a.kt)("wrapper",(0,n.Z)({},g,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"git"},"Git"),(0,a.kt)("h2",{id:"\u65e5\u5e38\u547d\u4ee4"},"\u65e5\u5e38\u547d\u4ee4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# \u67e5\u770b\u914d\u7f6e\u9879\ngit config --list\n\n# tag \u67d0\u4e2a commit\ngit tag r20191211_3.4.4 ff5aeaa\n\n# \u63a8\u9001tag\u5230\u8fdc\u7aef\ngit push origin r20191211_3.4.4\n\n# \u63a8\u9001\u5206\u652f\u5230\u8fdc\u7aef\ngit push -u origin branchname\n\n# \u5220\u9664\u8fdc\u7aeftag\ngit push --delete origin tagname\n\n# \u67e5\u770b remote \u4fe1\u606f\ngit remote show origin\n\n# \u5f3a\u5236\u91cd\u7f6e master \u5230\u5f53\u524d\u7684\u63d0\u4ea4\ngit branch -f master\n\n# \u5f3a\u5236\u5207\u5230\u8fdc\u7aef\u6700\u65b0\ngit checkout -B master origin/master\n\n# \u67e5\u770b\u67d0\u4e2a\u6587\u4ef6\u7684\u4fee\u6539\u8bb0\u5f55\ngit log filename\n\n# \u67e5\u770b\u67d0\u4e2a commit \u6240\u5728\u7684\u5206\u652f\ngit branch -a --contains 749593c\n\n# \u76f4\u63a5\u590d\u7528\u4e0a\u4e00\u6b21\u63d0\u4ea4\u7684 commit message \u6765\u63d0\u4ea4\ngit commit --reuse-message=HEAD --reset-author\n\n# \u4fee\u6539\u4e0a\u6b21\u63d0\u4ea4\ngit commit --no-verify --amend --no-edit\n\n# \u67e5\u770b\u4e24\u6b21\u63d0\u4ea4\u4e4b\u95f4\u6240\u6709\u7684\u63d0\u4ea4\ngit log --perl-regexp --author=\"(yianzhou|zhouyian)\" --pretty=short --ancestry-path 1a795d0ff7dc3c32ae5a003cae740ae054bd1e9f..abbd10baace5efde21e279b78ec76b4f9496bd19 > ~/Downloads/$(echo `date +%s` | rev).log\n\n# \u67e5\u770b\u67d0\u4e2a\u5206\u652f\u4e0a\u6211\u7684\u63d0\u4ea4\ngit log develop --author=yianzhou --pretty=short\n\n# \u67e5\u770b\u6240\u6709\u6211\u7684\u63d0\u4ea4\ngit log --author=yianzhou --pretty=format:%cd\\ %H\\ %an\\ %s --date=format:'%Y-%m-%d %H:%M:%S' --all | git name-rev --stdin --refs=\"release/*\" > ~/Downloads/git.log\n\n# \u67e5\u770b\u4e00\u4e2acommit\u7684commit date\uff0c\u4ee5\u672c\u5730\u65f6\u95f4\u4e3a\u51c6\ngit show -s --format=%ad 39ff172891319b89187ec79899bcf8b6f329f8af --date=local\n\n# \u514b\u9686\u6307\u5b9a\u5206\u652f\uff0c\u6df1\u5ea61\ngit clone --depth 1 --branch master https://github.com/flutter/flutter.git\n\n# \u514b\u9686\u6df1\u5ea6\u4e3a 1 \u4e4b\u540e\uff0c\u5982\u4f55\u62c9\u53d6\u5176\u5b83\u63d0\u4ea4\ngit fetch --unshallow\n\n# \u5220\u9664\u6240\u6709tag\u7136\u540e\u91cd\u65b0\u62c9\u53d6\ngit tag -l | xargs git tag -d && git fetch -t\n\n# \u627e\u5230\u6240\u6709\u5728stage\u533a\u7684diff\u6587\u4ef6\uff0c\u5e76\u5bf9\u5176\u4e2d\u7684dart\u6587\u4ef6\u8fdb\u884c\u683c\u5f0f\u5316\ngit diff --cached --name-only -- '*.dart' | xargs -I '{}' dart format {}\n\n# \u67e5\u770b merge request diffs\ngit log HEAD ^origin/develop --oneline --no-merges\n\n# \u6dfb\u52a0\u8fdc\u7aef\ngit remote add github https://github.com/flutter/engine.git\n\n# \u62c9\u53d6\u8fdc\u7aef\u5206\u652f\ngit fetch github master:master\n")),(0,a.kt)("p",null,"\u65e5\u671f\u683c\u5f0f\u53ef\u9009\u9879\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"git log --date={relative,local,default,iso,rfc}\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("strong",{parentName:"p"},"author date")," notes when this commit was originally made (i.e. when you finished the git commit). According to the docs of git commit, the author date could be overridden using the --date switch."),(0,a.kt)("p",null,"The ",(0,a.kt)("strong",{parentName:"p"},"commit date")," gets changed every time the commit is being modified, for example when rebasing the branch where the commit is in on another branch (more)."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"img",src:i(13788).Z,width:"2016",height:"878"})),(0,a.kt)("h2",{id:"gitignore"},"gitignore"),(0,a.kt)("p",null,"How to remove files that are listed in the .gitignore but still on the repository?"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'git rm -r --cached .\ngit add .\ngit commit -m "Drop files from .gitignore"\n')),(0,a.kt)("h2",{id:"lfs"},"lfs"),(0,a.kt)("p",null,"Git Large File Storage (LFS) is an open source Git extension for versioning large files by replacing large files with ",(0,a.kt)("strong",{parentName:"p"},"text pointers")," inside Git, while storing the file contents on a remote server."),(0,a.kt)("p",null,"\u8fdc\u7aef\u8fd8\u662f\u4fdd\u5b58\u4e86\u5927\u6587\u4ef6\u7684\u6bcf\u4e00\u4e2a\u7248\u672c\uff0c\u8fdc\u7aef\u4ed3\u5e93\u7684\u5927\u5c0f\u5e76\u4e0d\u4f1a\u56e0\u4e3a\u7528\u4e86 LFS \u800c\u51cf\u5c0f\u3002\u51cf\u5c0f\u7684\u662f\u4f60\u7684\u672c\u5730\u4ed3\u5e93\u3002\u56e0\u4e3a\u672c\u5730\u4ed3\u5e93\u4e2d\u5e76\u4e0d\u4fdd\u7559\u6240\u6709\u7684\u6587\u4ef6\u7248\u672c\uff0c\u800c\u662f\u4ec5\u6839\u636e\u9700\u8981\u68c0\u51fa\u7248\u672c\u4e2d\u5fc5\u9700\u7684\u6587\u4ef6\u3002"),(0,a.kt)("h3",{id:"step-by-step"},"Step-by-step"),(0,a.kt)("p",null,"Install: ",(0,a.kt)("inlineCode",{parentName:"p"},"brew install git-lfs")),(0,a.kt)("p",null,"Set up Git LFS for your user account (only once per user account): ",(0,a.kt)("inlineCode",{parentName:"p"},"git lfs install")),(0,a.kt)("p",null,"In Git repository where you want to use Git LFS: ",(0,a.kt)("inlineCode",{parentName:"p"},'git lfs track "*.psd"'),", or directly edit your ",(0,a.kt)("inlineCode",{parentName:"p"},".gitattributes")),(0,a.kt)("p",null,"Make sure .gitattributes is tracked: ",(0,a.kt)("inlineCode",{parentName:"p"},"git add .gitattributes")),(0,a.kt)("p",null,"For any pre-existing files, use the ",(0,a.kt)("inlineCode",{parentName:"p"},"git lfs migrate")," command."),(0,a.kt)("p",null,"Just commit and push as you normally would!"),(0,a.kt)("h3",{id:"migrate"},"Migrate"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"import")," mode converts Git files to Git LFS, while the ",(0,a.kt)("inlineCode",{parentName:"p"},"export")," mode does the reverse, and the ",(0,a.kt)("inlineCode",{parentName:"p"},"info")," mode provides an informational summary."),(0,a.kt)("p",null,"First, run ",(0,a.kt)("inlineCode",{parentName:"p"},"git lfs migrate info")," to list the file types taking up the most space in your repository."),(0,a.kt)("p",null,"When converting files to or from Git LFS, the ",(0,a.kt)("inlineCode",{parentName:"p"},"git lfs migrate")," command will only make changes to your local repository and working copy, never any remotes. This is intentional as the ",(0,a.kt)("inlineCode",{parentName:"p"},"import")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"export"),' modes are generally "destructive" in the sense that they ',(0,a.kt)("strong",{parentName:"p"},"rewrite your Git history"),", changing commits and generating new commit SHAs. Once you are satisfied with the changes, you will need to force-push the new Git history of any rewritten branches to all your remotes.\uff08\u7528\u4e86\u8fd9\u4e2a\u547d\u4ee4\u540e\uff0c\u6240\u6709 commit \u5386\u53f2\u4f1a\u88ab\u91cd\u5199\uff0c\u62e5\u6709\u65b0\u7684 SHA \u503c\uff09"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'git lfs migrate import --include="opencv2"')," \u5c06 opencv2 \u7684\u4e8c\u8fdb\u5236\u8f6c\u6362\u6210 LFS\uff0c\u6b64\u65f6\u4f1a\u770b\u5230\u672c\u5730\u78c1\u76d8\u91cc\u7684\u6587\u4ef6\u53d8\u6210\u4e86\u6587\u672c\u6307\u9488\u3002"),(0,a.kt)("p",null,"The working copies of these files can be repopulated with their full expected contents by using ",(0,a.kt)("inlineCode",{parentName:"p"},"git lfs checkout")),(0,a.kt)("h2",{id:"config"},"Config"),(0,a.kt)("p",null,"\u67e5\u770b\u6240\u6709\u914d\u7f6e\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"git config --list --show-origin")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7cfb\u7edf\u7ea7\u522b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"/usr/local/etc/gitconfig")),(0,a.kt)("li",{parentName:"ul"},"\u7528\u6237\u7ea7\u522b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"/Users/yianzhou/.gitconfig")),(0,a.kt)("li",{parentName:"ul"},"git \u76ee\u5f55\u7ea7\u522b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},".git/config"))),(0,a.kt)("h2",{id:"submodule"},"submodule"),(0,a.kt)("p",null,"To suppress listing of 'modified content'/dirty submodule entries in status, diff, etc? Just add one line to that ",(0,a.kt)("inlineCode",{parentName:"p"},".gitmodules")," file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'[submodule "bundle/fugitive"]\n    path = bundle/fugitive\n    url = git://github.com/tpope/vim-fugitive.git\n    ignore = dirty\n')),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git submodule add <repository> [<path>]")," \u9ed8\u8ba4\u5c06\u5b50\u6a21\u5757 clone \u5230\u5f53\u524d\u5de5\u4f5c\u76ee\u5f55\u4e0b"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git submodule init")," \u6b64\u547d\u4ee4\u901a\u5e38\u4ec5\u5728\u6dfb\u52a0\u65b0\u5b50\u6a21\u5757\u540e\uff08\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"git submodule add"),"\uff09\u8fd0\u884c\u4e00\u6b21"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git submodule update")," \u5c06\u5b50\u6a21\u5757\u66f4\u65b0\u4e3a\u7236\u4ed3\u5e93\u6307\u5b9a\u7684 commit"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git submodule update --remote")," \u66f4\u65b0\u5b50\u6a21\u5757\u5230\u4e0a\u6e38\u4ed3\u5e93\u7684\u6700\u65b0 commit"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git submodule update --init --recursive")," \u9012\u5f52\u5730\u521d\u59cb\u5316\u5e76\u66f4\u65b0\u5b50\u6a21\u5757\u53ca\u6240\u6709\u5d4c\u5957\u7684\u5b50\u6a21\u5757"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"git submodule status")," \u5217\u51fa\u6240\u6709\u5b50\u6a21\u5757\u7684\u5f53\u524d\u72b6\u6001"),(0,a.kt)("h2",{id:"\u5982\u4f55\u67e5\u627e\u88ab\u5220\u9664\u7684\u4ee3\u7801"},"\u5982\u4f55\u67e5\u627e\u88ab\u5220\u9664\u7684\u4ee3\u7801"),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u8bb0\u5f97\u5220\u9664\u4ee3\u7801\u65f6\u7684\u63d0\u4ea4\u6d88\u606f\uff0c\u53ef\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u641c\u7d22\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},'git log --grep="\u5173\u952e\u5b57"')),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u8bb0\u5f97\u88ab\u5220\u9664\u4ee3\u7801\u7684\u4e00\u90e8\u5206\u5185\u5bb9\uff0c\u53ef\u4ee5\u4f7f\u7528 -S \u9009\u9879\u6765\u67e5\u627e\u6dfb\u52a0\u6216\u5220\u9664\u8be5\u5185\u5bb9\u7684\u63d0\u4ea4\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},'git log -S"\u4ee3\u7801\u7247\u6bb5"')),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u8981\u641c\u7d22\u7684\u662f\u6b63\u5219\u8868\u8fbe\u5f0f\u5339\u914d\u7684\u4ee3\u7801\u53d8\u52a8\uff0c\u53ef\u4ee5\u4f7f\u7528 -G \u9009\u9879\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},'git log -G"\u6b63\u5219\u8868\u8fbe\u5f0f"')),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u77e5\u9053\u4ee3\u7801\u88ab\u5220\u9664\u7684\u6587\u4ef6\u540d\uff0c\u53ef\u4ee5\u67e5\u770b\u8be5\u6587\u4ef6\u7684\u5386\u53f2\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"git log -- \u6587\u4ef6\u540d")),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u4e0d\u786e\u5b9a\u4ee3\u7801\u662f\u5728\u54ea\u4e2a\u63d0\u4ea4\u4e2d\u88ab\u5220\u9664\u7684\uff0c\u53ef\u4ee5\u4f7f\u7528 git bisect \u6765\u4e8c\u5206\u67e5\u627e\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"git bisect start")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6807\u8bb0\u5f53\u524d\u7248\u672c\u4e2d\u4ee3\u7801\u5df2\u7ecf\u4e22\u5931\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"git bisect bad")),(0,a.kt)("li",{parentName:"ul"},"\u6807\u8bb0\u4e00\u4e2a\u4f60\u77e5\u9053\u4ee3\u7801\u5b58\u5728\u7684\u65e7\u7248\u672c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"git bisect good \u6807\u7b7e\u6216\u63d0\u4ea4\u54c8\u5e0c")),(0,a.kt)("li",{parentName:"ul"},"Git \u4f1a\u68c0\u51fa\u4e00\u4e2a\u4e2d\u95f4\u7684\u63d0\u4ea4\uff0c\u4f60\u53ef\u4ee5\u68c0\u67e5\u4ee3\u7801\u662f\u5426\u5b58\u5728\u3002\u5982\u679c\u4ee3\u7801\u5b58\u5728\uff0c\u6267\u884c ",(0,a.kt)("inlineCode",{parentName:"li"},"git bisect good"),"\uff0c\u5982\u679c\u4ee3\u7801\u4e22\u5931\uff0c\u6267\u884c ",(0,a.kt)("inlineCode",{parentName:"li"},"git bisect bad"),"\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u91cd\u590d\u4e0a\u4e00\u6b65\u9aa4\uff0c\u76f4\u5230 Git \u627e\u5230\u5f15\u5165\u53d8\u5316\u7684\u786e\u5207\u63d0\u4ea4\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5b8c\u6210\u67e5\u627e\u540e\uff0c\u7ed3\u675f\u4e8c\u5206\u67e5\u627e\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"git bisect reset"))),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u77e5\u9053\u5927\u6982\u7684\u65f6\u95f4\u8303\u56f4\uff0c\u53ef\u4ee5\u67e5\u770b\u6587\u4ef6\u5728\u67d0\u4e2a\u65f6\u95f4\u6bb5\u5185\u7684\u5dee\u5f02\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"git diff \u5f00\u59cb\u54c8\u5e0c..\u7ed3\u675f\u54c8\u5e0c \u6587\u4ef6\u540d")),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u7684\u4ed3\u5e93\u5f88\u5927\uff0c\u4e00\u4e9b\u547d\u4ee4\u53ef\u80fd\u9700\u8981\u8f83\u957f\u65f6\u95f4\u6765\u6267\u884c\u3002"))}d.isMDXComponent=!0},13788:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/fea19a87-fb67-4a85-ac07-d4dad995f08d-4605b67865f8054b5f7df2cdf34029d0.png"}}]);