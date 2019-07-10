---
title:  "CocoaPods"
categories: [Stick]
---

# Cocoapods
更新 Ruby
`$ gem update --system` #这里请翻墙一下

替换 Ruby 源为国内镜像

`$ gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/`

从 GitHub 的国内镜像上，clone 下来 cocoapods 的 master 分支，上面包含了所有第三方库的信息

`$ cd ~/.cocoapods/repos `

`$ pod repo remove master`

`$ git clone https://git.coding.net/hging/Specs.git master`

在 Podfile 中加入以下

`source 'https://git.coding.net/hging/Specs.git'`