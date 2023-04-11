# Ruby

## Installing Ruby

> [The definitive guide to installing Ruby gems on a Mac](https://www.moncefbelyamani.com/the-definitive-guide-to-installing-ruby-gems-on-a-mac/)

某些 gem 的安装教程告诉读者，只要能够运行 `ruby -v` 就可以顺利运行 `gem install xx` 来安装 gem。但这在 macOS 上会得到错误信息：

```bash
ERROR: While executing gem ... (Gem::FilePermissionError)
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory
```

macOS returns this error because the default location for Ruby gem installations is the system Ruby directory that is preinstalled by Apple. That directory is not meant to be modified. Using sudo to install gems, or changing permissions of system files and directories is strongly discouraged, even if you know what you are doing.

没有自行安装 Ruby 之前，`which ruby` 会找到 `/usr/bin/ruby`，这就是 macOS 自带的 Ruby。

The solution is: install a separate version of Ruby that does not interfere with the one that came with your Mac!

```bash
# 1. Install Homebrew
# 2. Install the latest Ruby
brew install ruby
# 3. Update the `PATH` environment variable
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

To verify that you are using the Homebrew version of Ruby, run this command: `which ruby`, you should see `/usr/local/opt/ruby/bin/ruby`.

Then, tell RubyGems to install into your user directory by configuring the RubyGems environment. Edit `~/.zshrc`:

```bash
export GEM_HOME=$HOME/.gem
export PATH=$GEM_HOME/bin:$PATH
```

`/usr/local/opt` 这个目录存放的都是一些符号链接：

```bash
cd /usr/local/opt
ls -l
...
lrwxr-xr-x  1 zhouyian  admin   22 Jun 15 17:53 ruby -> ../Cellar/ruby/2.7.1_2
```

## RubyGems

Ruby ships with RubyGems built-in.

`gem search ^cocoapods$ -d`

The `search` command lets you find remote gems by name. You can use regular expression characters in your query. If you see a gem you want more information on you can add the details option `-d`.

`gem list` shows your locally installed gems.

`gem uninstall drip` removes the gems you have installed.

Use `gem environment` to find out about your gem environment.

## Bundler

> [Using a Gemfile](https://guides.cocoapods.org/using/a-gemfile.html)

A lot of ideas for CocoaPods came from similar projects (for example [RubyGems](https://rubygems.org/), [Bundler](https://bundler.io/), [npm](https://www.npmjs.com/) and [Gradle](https://gradle.org/)).

RubyGems is a hosted ruby library service. It centralizes where you look for a library, and installing ruby libraries/apps. These are installed into a central database of versions.

The downside of this is that there is no way to ensure that a project needing a specific version of a library can use that, it would always use the latest version.（就像 App Store 永远给你安装最新版本一样）This is the problem bundler solves.

> [Bundler's Purpose and Rationale](https://bundler.io/v2.1/rationale.html)

Bundler creates a consistent application environment for your application, by allowing you to specify the version of libraries. We took this idea almost whole-sale for CocoaPods. You define a `Gemfile` that says what libraries you want to include, and can optionally specify a version or range. You run `bundle install` and it will generate a `Gemfile.lock` saying the exact version of all of your libraries and then anyone else running bundle install with that project gets the exact same versions.

With a Gemfile setup, you run `bundle install` to install, or `bundle update` to update within your Gemfile's constraints. From here on in however, you will need to remember to run `bundle exec` before any terminal commands that have come in via bundler.

Doing it without `bundle exec` will bypass your Gemfile's specific versioning and will use the latest version of the library within RubyGems. This could potentially be the exact same version, but it can often not.

## rbenv

[rbenv 使用指南 · Ruby China](https://ruby-china.org/wiki/rbenv-guide)

查看已安装的版本：`rbenv versions`

切换版本：`rbenv global 3.8.2`

放到 `~/.zshrc`:

```c
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```
