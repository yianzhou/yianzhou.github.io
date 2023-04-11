# WebKit

## WKWebView

首先打开活动监视器，然后在模拟器打开 QB，会看到 WebKit 新创建了几个进程：

![img](/img/FBDEC325-1D0A-447E-BC89-801904697B7C.png)

UI 进程负责启动其它进程；每个 WKWebView 会有自己独立的 WebContent 进程；网络进程在多个 WKWebView 之间共享；

![img](/img/FD652240-4705-4A98-A144-376D5B624EF2.jpg)

## Dark Mode

自己的网站想适配深色模式：[sandoche/Darkmode.js: 🌓 Add a dark-mode / night-mode to your website in a few seconds](https://github.com/sandoche/Darkmode.js)

浏览器想对所有网站适配深色模式：[darkreader/darkreader: Dark Reader Chrome and Firefox extension](https://github.com/darkreader/darkreader)

## 离线网页

一般浏览网页发现需要保存时，有 4 个选择：

1. 网页，全部（_.htm, _.html）。会把网页的全部元素，例如文本、图片、Flash 动画等全部保存下来，生成一个网页文件和一个与该网页文件同名的文件夹。这个文件夹里面保存了上面说的图片、Flash 动画等内容。
2. Web 档案，单一文件（\*.mht）。它会把网页中全部元素保存在一个文件里，不生成一个单独的文件夹，对于你文件的保存、管理会比较方便。
3. 网页，仅 Html（_.htm, _.html），仅生成一个网页文件，保留了网页中文字的内容，但是图片、Flash 动画等全部没有保存，或者以链接方式保存。
4. 文本文件（\*.txt），仅生成一个后缀为.txt 的纯文本文件，保存了网页中所有的文字内容，图片、Flash 动画等完全忽略。

**网页封存档**将一个多附件网页（如包含大量图片、Flash 动画、Java 小程序的网页）存储成单一文件，扩展名为 `.mht` 或 `.mhtml`。
