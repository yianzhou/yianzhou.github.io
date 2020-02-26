---
title: "CocoaPods"
categories: [Stick]
---

# 如何发布仓库

我们先看看 CocoaPods 在本地目录里的东西：`cd ~/.cocoapods/repos`，这里存放着 Pod 的仓库目录，其中的`master`文件夹是 CocoaPods 官方的仓库。如果你添加过其他的 repo，这里还会有其他文件夹。

`cd ~/.cocoapods/repos/master`，通过`git remote -v`，发现`master`文件夹是一个 git 仓库，它的远端是：

```
origin	https://github.com/CocoaPods/Specs.git (fetch)
origin	https://github.com/CocoaPods/Specs.git (push)
```

每个第三方库会有多个版本号，每个版本号是一个文件夹，其中有一个`*.podspec.json`。比如：

```
~/.cocoapods/repos/master/Specs/0/0/1/YYImage/1.0.4/YYImage.podspec.json
```

json 文件中包含了版本、源码仓库地址、subspecs 等信息。**注意，第三方库的源代码不会放在 Specs 文件夹里，这里只放描述信息。**

想要在 Cocoapods 中发布仓库，就是需要在`~/.cocoapods/repos/master`中添加我们的仓库的描述信息，然后 push 到远端。不过不用我们通过 git 命令，直接用 pod 命令操作即可。

# 创建私有仓库

## 创建“描述文件”仓库

首先创建一个类似于`~/.cocoapods/repos/master/Specs`这样的存放描述文件的 git 仓库。我创建在<https://github.com/yianzhou/PodSpecs>

回到终端，将这个描述文件仓库添加到本地：

```
pod repo add MyRepo https://github.com/yianzhou/PodSpecs.git
```

到这个目录下：`~/.cocoapods/repos/MyRepo`，会发现我们的描述文件 git 仓库，已经被 clone 到本地了。它跟`~/.cocoapods/repos/master`的作用是一样的。

## 创建 SDK 代码库

我直接用已经创建好的库：<https://github.com/yianzhou/hello>

创建 `.podspec` 文件：`pod spec create BeSwype`，打开`BeSwype.podspec`文件并编辑好相关配置。可以参考别的第三方库的配置如[YYImage](https://github.com/ibireme/YYImage)。

这时我们的 `hello.git` 会有以下文件：

```
- BeSwype
    - BeSwypeView.swift
- BeSwype.podspec
```

验证仓库是否配置正确：`pod lib lint`，验证正确后，就可以把描述文件推到远端了。然后，打上版本号的 tag，注意这个 tag 是与`.podspec` 文件中的版本对应的。

验证成功后，可以发布到我们的私有库描述文件中：`pod repo push MyRepo BeSwype.podspec --allow-warnings`；这时会再验证一次配置是否正确，成功的话，我们的 `~/.cocoapods/repos/MyRepo` 中也会增加了这个新的库了。

使用`pod search BeSwype`验证，若出现仓库信息说明已经成功了，这时候就可以在`Podfile`添加、使用自己的仓库了。

## 使用私有库

使用私有库需要在 `Podflie` 中添加版本库地址，若同时使用了公有库，也需要加上公有库地址。
```
source 'https://github.com/yianzhou/PodSpecs.git'
source 'https://github.com/CocoaPods/Specs.git'
```

`pod install`时，会拉取 `Podflie` 中 `source` 标记的版本库到本地的 repos 文件夹中；然后在 repos 中搜索`BeSwype.podspec` 文件。根据文件中描述的源码地址下载并整合到项目中。

# 换源加速下载

更新 Ruby
`$ gem update --system` #这里请翻墙一下

替换 Ruby 源为国内镜像

`$ gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/`

从 GitHub 的国内镜像上，clone 下来 cocoapods 的 master 分支，上面包含了所有第三方库的信息

`$ cd ~/.cocoapods/repos`

`$ pod repo remove master`

`$ git clone https://git.coding.net/hging/Specs.git master`

在 Podfile 中加入以下

`source 'https://git.coding.net/hging/Specs.git'`

# 查看下载进度

打开 Activity Monitor，选择 Network，筛选 git，然后可看到进程的网络情况。

![image](/assets/images/Screen%20Shot%202020-03-02%20at%2014.52.56.png)