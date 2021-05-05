---
title: "Cocoapods"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# Installing Ruby

> [The definitive guide to installing Ruby gems on a Mac](https://www.moncefbelyamani.com/the-definitive-guide-to-installing-ruby-gems-on-a-mac/)

某些 gem 的安装教程告诉读者，只要能够运行 `ruby -v` 就可以顺利运行 `gem install xx` 来安装 gem。但这在 macOS 上会得到错误信息：

```sh
ERROR: While executing gem ... (Gem::FilePermissionError)
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory
```

macOS returns this error because the default location for Ruby gem installations is the system Ruby directory that is preinstalled by Apple. That directory is not meant to be modified. Using sudo to install gems, or changing permissions of system files and directories is strongly discouraged, even if you know what you are doing.

没有自行安装 Ruby 之前，`which ruby` 会找到 `/usr/bin/ruby`，这就是 macOS 自带的 Ruby。

The solution is: install a separate version of Ruby that does not interfere with the one that came with your Mac!

```sh
# 1. Install Homebrew
# 2. Install the latest Ruby
brew install ruby
# 3. Update the `PATH` environment variable
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

To verify that you are using the Homebrew version of Ruby, run this command: `which ruby`, you should see `/usr/local/opt/ruby/bin/ruby`.

Then, tell RubyGems to install into your user directory by configuring the RubyGems environment. Edit `~/.zshrc`:

```sh
export GEM_HOME=$HOME/.gem
export PATH=$GEM_HOME/bin:$PATH
```

`/usr/local/opt` 这个目录存放的都是一些符号链接：

```sh
cd /usr/local/opt
ls -l
...
lrwxr-xr-x  1 zhouyian  admin   22 Jun 15 17:53 ruby -> ../Cellar/ruby/2.7.1_2
```

# RubyGems

Ruby ships with RubyGems built-in.

`gem search ^cocoapods$ -d`

The `search` command lets you find remote gems by name. You can use regular expression characters in your query. If you see a gem you want more information on you can add the details option `-d`.

`gem list` shows your locally installed gems.

`gem uninstall drip` removes the gems you have installed.

Use `gem environment` to find out about your gem environment.

# Bundler

> [Using a Gemfile](https://guides.cocoapods.org/using/a-gemfile.html)

A lot of ideas for CocoaPods came from similar projects (for example [RubyGems](https://rubygems.org/), [Bundler](https://bundler.io/), [npm](https://www.npmjs.com/) and [Gradle](https://gradle.org/)).

RubyGems is a hosted ruby library service. It centralizes where you look for a library, and installing ruby libraries/apps. These are installed into a central database of versions.

The downside of this is that there is no way to ensure that a project needing a specific version of a library can use that, it would always use the latest version.（就像 App Store 永远给你安装最新版本一样）This is the problem bundler solves.

> [Bundler's Purpose and Rationale](https://bundler.io/v2.1/rationale.html)

Bundler creates a consistent application environment for your application, by allowing you to specify the version of libraries. We took this idea almost whole-sale for CocoaPods. You define a `Gemfile` that says what libraries you want to include, and can optionally specify a version or range. You run `bundle install` and it will generate a `Gemfile.lock` saying the exact version of all of your libraries and then anyone else running bundle install with that project gets the exact same versions.

With a Gemfile setup, you run `bundle install` to install, or `bundle update` to update within your Gemfile's constraints. From here on in however, you will need to remember to run `bundle exec` before any terminal commands that have come in via bundler.

Doing it without `bundle exec` will bypass your Gemfile's specific versioning and will use the latest version of the library within RubyGems. This could potentially be the exact same version, but it can often not.

# pod install vs. pod update

> [pod install vs. pod update](https://guides.cocoapods.org/using/pod-install-vs-update.html)

`pod install`: This is to be used the first time you want to retrieve the pods for the project, but also every time you edit your `Podfile` to add, update or remove a pod.

Every time the pod install command is run — and downloads and install new pods — it writes the version it has installed, for each pods, in the `Podfile.lock` file. This file keeps track of the installed version of each pod and **locks** those versions. When you run pod install, it only resolves dependencies for pods that are **not** already listed in the `Podfile.lock`. For pods listed in the `Podfile.lock`, it downloads the explicit version listed in the `Podfile.lock` without trying to check if a newer version is available.

`pod update`: It will update the pod to the latest version possible (as long as it matches the version restrictions in your `Podfile`).

```rb
pod 'SSZipArchive' # use the latest version
pod 'Objection', '0.9' # specific version
pod 'Objection', '~> 0.1.2' # Version 0.1.2 and the versions up to 0.2, not including 0.2 and higher

pod 'Alamofire', :path => '~/Documents/Alamofire' # a folder local to the machine

pod 'Alamofire', :git => 'https://github.com/Alamofire/Alamofire.git' # To use the master branch of the repo
pod 'Alamofire', :git => 'https://github.com/Alamofire/Alamofire.git', :branch => 'dev' # To use a different branch of the repo:
pod 'Alamofire', :git => 'https://github.com/Alamofire/Alamofire.git', :tag => '3.1.1' # To use a tag of the repo
pod 'Alamofire', :git => 'https://github.com/Alamofire/Alamofire.git', :commit => '0f506b1c45' # Or specify a commit
```

# 如何发布仓库

我们先看看 CocoaPods 在本地目录里的东西：`cd ~/.cocoapods/repos`，这里存放着 Pod 的仓库目录，其中的`master`文件夹是 CocoaPods 官方的仓库。如果你添加过其他的 repo，这里还会有其他文件夹。

`cd ~/.cocoapods/repos/master`，通过`git remote -v`，发现`master`文件夹是一个 git 仓库，它的远端是：

```sh
origin https://github.com/CocoaPods/Specs.git (fetch)
origin https://github.com/CocoaPods/Specs.git (push)
```

每个第三方库会有多个版本号，每个版本号是一个文件夹，其中有一个`*.podspec.json`。比如：

`~/.cocoapods/repos/master/Specs/0/0/1/YYImage/1.0.4/YYImage.podspec.json`

注意，第三方库的源代码不会放在 Specs 文件夹里，这里只放描述信息。

想要在 Cocoapods 中发布仓库，就是需要在`~/.cocoapods/repos/master`中添加我们的仓库的描述信息，然后 push 到远端。不过不用我们通过 git 命令，直接用 pod 命令操作即可。

Running `pod lib create [pod name]` will set you up with a well thought out library structure allowing you to easily include your files and get started quickly.

You should be testing your library. In Objective-C [Specta/Expecta](https://github.com/specta/expecta). In Swift [Quick/Nimble](https://github.com/Quick/Nimble). For View-based Testing: [iOSSnapshotTestCase](https://github.com/uber/ios-snapshot-test-case/).

发表到官方仓库需要一个“账户”：[CocoaPods Trunk](https://guides.cocoapods.org/making/getting-setup-with-trunk.html) is an authentication and CocoaPods API service. To publish new or updated libraries to CocoaPods for public release you will need to be registered with Trunk and have a valid Trunk session on your current device.

账户没有密码，是通过 Email 地址完成的：First sign up for an account with your email address. This begins a session on your current device. You must click a link in an email Trunk sends you to verify the connection between your Trunk account and the current computer. Trunk accounts do not have passwords, only per-computer session tokens.

Trunk will publish a canonical JSON representation of your Podspec.

# 创建私有仓库

## 创建“描述文件”仓库

首先创建一个类似于`~/.cocoapods/repos/master/Specs`这样的存放描述文件的 git 仓库。例如 <https://github.com/yianzhou/PodSpecs>

回到终端，将这个描述文件仓库添加到本地：

`pod repo add MyRepo https://github.com/yianzhou/PodSpecs.git`

到这个目录下：`~/.cocoapods/repos/MyRepo`，会发现我们的描述文件 git 仓库，已经被 clone 到本地了。它跟`~/.cocoapods/repos/master`的作用是一样的。

## 创建 SDK 代码库

创建 podspec 文件：`pod spec create SampleLib`，打开 `SampleLib.podspec` 文件并编辑好相关配置。可以参考别的第三方库的配置如 [YYImage](https://github.com/ibireme/YYImage/blob/master/YYImage.podspec)。

验证仓库是否配置正确：`pod lib lint`，验证正确后，就可以把描述文件推到远端了。然后，打上版本号的 tag，注意这个 tag 是与`.podspec` 文件中的版本对应的。

`pod lib lint` does not access the network, whereas `pod spec lint` checks the external repo and associated tag.

验证成功后，可以发布到我们的私有库描述文件中：`pod repo push MyRepo SampleLib.podspec --allow-warnings`；这时会再验证一次配置是否正确，成功的话，我们的 `~/.cocoapods/repos/MyRepo` 中也会增加了这个新的库了。

使用 `pod search SampleLib` 验证，若出现仓库信息说明已经成功了，这时候就可以在 Podfile 添加、使用自己的仓库了。

## 使用私有库

使用私有库需要在 Podflie 中添加版本库地址，若同时使用了公有库，也需要加上公有库地址。

```rb
source 'https://github.com/yianzhou/PodSpecs.git'
source 'https://github.com/CocoaPods/Specs.git'
```

`pod install`时，会拉取 `Podflie` 中 `source` 标记的版本库到本地的 repos 文件夹中；然后在 repos 中搜索 `SampleLib.podspec` 文件。根据文件中描述的源码地址下载并整合到项目中。

# 查看下载进度

打开 Activity Monitor，选择 Network，筛选 git，然后可看到进程的网络情况。

![image](/assets/images/Screen%20Shot%202020-03-02%20at%2014.52.56.png)

# 问题：Development pods 的更改在 build 后没有生效

[How to rebuild development pod changes?](https://stackoverflow.com/questions/50552752/how-to-rebuild-development-pod-changes)（Xcode 11.4, pod 1.8.4 试过了，仍然没有解决）

GitHub 上有[这个问题的讨论](https://github.com/CocoaPods/CocoaPods/issues/8073)：

> Its because of build optimalisation in new Xcode - when it detects no change in input or output files specified for script, the script is not started.

解决方法一：So the solution would be to have no input and out files at all, or during pod install add also content files of frameworks into the input files list.

With New Build System, add to your Podfile, [参考](https://guides.cocoapods.org/syntax/podfile.html#install_bang)

`install! 'cocoapods', :disable_input_output_paths => true`

解决方法二：Use legacy build system

解决方法三：I have a possible temporary solution. I added this Run script phase before Embed Pods Framework:
`touch "${PODS_ROOT}/*SCRIPT_DIRECTORY*frameworks.sh"`.（路径直接复制\[CP\] Embed Pods Frameworks 里面的即可）
It forces Xcode to run the script everytime.

# 问题：pod 连接慢、安装/更新失败等

`[!] Failed to connect to GitHub to update the CocoaPods/Specs specs repo - Please check if you are offline, or that GitHub is down`

主要解决方法：更新 Ruby、CocoaPods、openssl 版本。

```sh
brew install ruby
ruby --version
export PATH=/usr/local/Cellar/ruby/2.7.1_2/bin:$PATH
which openssl
brew upgrade openssl
export PATH="/usr/local/opt/openssl/bin:$PATH"
brew link openssl --force
```

删除主库并重新添加：

```sh
pod repo remove master
pod setup
cd ~/.cocoapods/repos
pod repo add master https://github.com/CocoaPods/Specs.git
```

# 集成 Framework

首先要有一个工程，其中的 TARGETS 有我们想打包出来的 Framework。在工程里正常 build 后，产物会在 `/Users/zhouyian/Library/Developer/Xcode/DerivedData` 目录下，也可以在 Project Navigator - Products 下面找到。

在工程目录下运行命令：

`xcodebuild -configuration "Release" -target "${FRAMEWORK_NAME}" -sdk iphoneos clean build`

会将 Framework 打包到当前文件夹下。然后创建 podspec 文件并声明 `s.ios.vendored_frameworks = 'path/to/framework'` 即可。
