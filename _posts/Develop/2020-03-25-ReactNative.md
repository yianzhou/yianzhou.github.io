---
title: 'React Native'
categories: [Development]
---

* Do not remove this line (it will not be displayed)
{:toc}

# 搭建环境

## 1. 使用 Homebrew 来安装 Node 和 Watchman。

> Homebrew 是 macOS 的包管理工具，相当于 ubuntu、Debian 的 apt-get，Redhat、Centos 的 yum。

> Node.js 是一种 javascript 的运行环境，能够使得 javascript 脱离浏览器运行。

> Watchman 是由 Facebook 提供的监视文件系统变更的工具。

`brew install node`

`brew install watchman`

## 2. 安装命令行工具

`npm install -g react-native-cli`

> -g 参数表示全局安装；不使用-g，会安装到当前文件夹的/node_modules 下

## 3. 创建新项目

通过创建新项目，可以看看 RN 目录的组织结构，为我们的工程提供参考。

`react-native init HelloWorld`

运行这个命令，包括了安装/node_modules，创建 iOS 和 Android 工程。

## 4. 运行

可以通过命令行跑起来，也可以直接用 Xcode 跑。

```
cd HelloWorld
react-native run-ios
```

在模拟器中用 ⌘-R 就可以刷新页面，⌘-D 调起开发选项。
在真机上摇晃手机就可以调起开发选项，然后可以 Enable Live Reload。

集成了 RN 之后，应用内会出现[红屏错误和黄屏警告](https://reactnative.cn/docs/debugging/#%E8%87%AA%E5%8A%A8%E5%88%B7%E6%96%B0)。

在开发者菜单中选择"Debug JS Remotely"选项，即可以开始在 Chrome 中调试 JavaScript 代码。Chrome 中并不能直接看到 App 的用户界面，而只能提供 console 的输出，以及断点调试。使用 Chrome 调试目前无法观测到 RN 中的网络请求，可以使用第三方的 react-native-debugger 来进行观测。

## 5. 客户端与服务端

我们的 App 相当于客户端，RN 启动的服务相当于服务端，通过这样的客户端-服务端架构实现热更新。

启动 RN 服务：

```
cd HelloWorld
npm start
```

第 4 点中的通过命令行/Xcode 运行，实际上包含了启动 RN 服务这一步。

如果启动服务失败，可能是端口被占用。查看端口占用情况：

`lsof -i TCP:8081`

> lsof 是 list open file 命令，可以查看到当前打开文件，在 linux 中所有事物都是以文件形式存在，包括网络连接及硬件设备。-i 参数表示网络链接，TCP 表示 TCP 连接，:8081 是 RN 默认的端口号。

找到占用 8081 端口的进程的 PID，通过`kill PID`命令杀掉对应进程、重新启动即可。

# Basics

JSX lets you **write your markup language inside code**. `<View><Text>Hello world!</Text></View>`. This is JSX - a syntax for embedding XML within JavaScript. Many frameworks use a specialized templating language which lets you embed code inside markup language. In React, this is reversed.

Anything you see on the screen is some sort of **component**. A component can be pretty basic - the only thing that's required is a render function which returns some JSX to render.

There are two types of data that control a component: **props and state**. props are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use state.

Most components can be customized when they are created, with different parameters. These creation parameters are called [props](https://reactnative.dev/docs/props), short for properties.

Your own components can also use props. This lets you make a single component that is used in many different places in your app, with slightly different properties in each place by referring to `this.props` in your render function. `<Greeting name='Rexxar' />`

In general, you should initialize [state](https://reactnative.dev/docs/state) in the constructor, and then call `setState` when you want to change it.

_When setState is called, BlinkApp will re-render its Component_.

# Styles

All of the core components accept a prop named **style**. The [style](https://reactnative.dev/docs/style) prop can be a plain old JavaScript object. That's the simplest and what we usually use for example code.

You can also pass an array of styles - the last style in the array has precedence, so you can use this to _inherit styles_. `<Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>`

Height and width:

- fixed: `<View style={{width: 100, height: 100}} />`
- flex: `<View style={{flex: 1}} />`

Normally you will use `flex: 1`, which tells a component to fill all available space, shared evenly amongst other components with the same parent. The larger the flex given, the higher the ratio of space a component will take compared to its siblings.

A component can specify the layout of its children using the [flexbox](https://reactnative.dev/docs/flexbox) algorithm. You will normally use a combination of `flexDirection`, `justifyContent` and `alignItems` to achieve the right layout.

- flexDirection controls the direction in which the children of a node are laid out. This is also referred to as the main axis. (`column`, the default value, Align children from top to bottom.)
- justifyContent describes how to align children within the main axis of their container. (`flex-start`, the default value, Align children of a container to the start of the container's main axis.)
- alignItems describes how to align children along the cross axis of their container. (`stretch`, the default value, Stretch children of a container to match the _extent_ of the container's cross axis.)
  - alignSelf has the same options and effect as alignItems but instead of affecting the children within a container, you can apply this property to a single child to change its alignment within its parent. alignSelf overrides any option set by the parent with alignItems.

The position type of an element defines how it is positioned within its parent. `relative` (default value) By default an element is positioned relatively.

# Gestures

Users can use a combination of gestures, such as tapping on a button, scrolling a list, or zooming on a map.

Users interact with mobile apps mainly through [touch](https://reactnative.dev/docs/handling-touches): `Button`, `TouchableHighlight`,`TouchableNativeFeedback`, `TouchableOpacity`, `TouchableWithoutFeedback`, etc.

The `ScrollView` is a generic scrolling container that can contain multiple components and views.

The `FlatList` component displays a scrolling list of changing, but similarly structured, data. Unlike the more generic ScrollView, the FlatList only renders elements that are currently showing on the screen, not all the elements at once. If you want to render a set of data broken into logical sections, maybe with section headers, similar to UITableViews on iOS, then a `SectionList` is the way to go.

# Networking

<https://reactnative.dev/docs/network>

React Native provides the Fetch API for your networking needs.

React Native also supports WebSockets, a protocol which provides full-duplex communication channels over a single TCP connection.
