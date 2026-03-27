# OpenClaw

## 进展

英伟达联合以 OpenClaw 创始人 Peter Steinberger 为代表的团队，召集了一批顶级安全与计算专家，推出 NeMoClaw 参考架构。

Windows→PC时代，Linux→服务器时代，HTML→互联网时代，Kubernetes→云时代，OpenClaw→Agent时代。

## 安装

按照官网提示安装失败，问题在这里有详细解释：[Fix OpenClaw Install Failed on Mac: EACCES Permission Denied | Vibe Coding Academy](https://www.vibecodingacademy.club/fix-openclaw-install-mac/)

## 常用命令

```sh
openclaw configure --section web

// 改变primary模型
openclaw models set moonshot/kimi-k2.5
// 移除zai模型
openclaw config unset 'models.providers.zai/gml-5'

// 你当前的并发配置偏高，容易短时间打爆 API 限额，建议降低
openclaw config set agents.defaults.maxConcurrent 1
openclaw config set agents.defaults.subagents.maxConcurrent 1
```

Termux 调试命令：

```sh
scp -P 8022 u0_a390@30.22.249.13:~/.openclaw/openclaw.json ~/Downloads/
```

## 常用 Prompt

你叫 YIANZHOU-MC6，作为我的 AI 助理，帮助我完成一些日常的自动化任务，可以叫我安哥。

- exec: 当前我的桌面有哪些文件
- write: 帮我把以上的信息新建一个 md 文件记录下来，放在桌面
- read, edit: 修改一下刚才创建的 md 文件，其中关于图片的描述，要包括图片具体的内容，不能只有一个文件名
- web_search: 网络搜索一下有小熊图案的卫衣是什么品牌，并写到一个新的 md 文件里
- web_fetch: 总结一下这篇文章的内容：https://news.qq.com/rain/a/20260308A060NZ00

## 问题解决

OpenClaw v2026.3.2 升级后，tools.profile 的默认值从 full 变成了 messaging，导致文件系统操作、命令执行等工具默认被禁用了，只保留了聊天/消息功能。所以它才说"没有文件系统操作工具"。别的博主教程是基于旧版本写的，那时候默认就是 full，开箱即用。

⚠️ API rate limit reached. Please try again later.

[充值与限速 - Moonshot AI 开放平台 - Kimi K2.5 大模型 API 服务](https://platform.moonshot.cn/docs/pricing/limits)

## 工作区

配置文件：`~/.openclaw/openclaw.json`

在 Termux 上，`~` 展开后是 `/data/data/com.termux/files/home`

`gateway.auth.token` 就是 dashboard 要用的 token

```
.  # `.openclaw` 数据根目录，存放 OpenClaw 的配置、状态和工作区文件
├── agents  # 代理运行数据目录，保存主代理/子代理的状态与会话记录
│   └── main  # 主代理的数据目录，包含其模型配置与会话历史
├── canvas  # 画布/可视化页面资源目录
│   └── index.html  # 画布页面入口文件
├── completions  # 命令行自动补全脚本目录
│   ├── openclaw.bash  # Bash 的 `openclaw` 自动补全脚本
│   ├── openclaw.fish  # Fish 的 `openclaw` 自动补全脚本
│   ├── openclaw.ps1  # PowerShell 的 `openclaw` 自动补全脚本
│   └── openclaw.zsh  # Zsh 的 `openclaw` 自动补全脚本
├── credentials  # 外部渠道/消息平台的授权与访问控制数据
│   ├── telegram-default-allowFrom.json  # Telegram 允许交互的账号白名单
│   └── telegram-pairing.json  # Telegram 配对/绑定请求状态
├── cron  # 定时任务配置目录
│   └── jobs.json  # 已配置的 cron 作业列表
├── devices  # 已知设备的配对与审批状态目录
│   ├── paired.json  # 已配对并获批的设备清单
│   └── pending.json  # 等待审批的设备清单
├── exec-approvals.json  # 命令执行审批服务的本地配置与 socket 信息
├── gateway.env  # 网关进程使用的环境变量配置
├── identity  # 当前设备身份与认证材料目录
│   ├── device-auth.json  # 当前设备的认证信息
│   └── device.json  # 当前设备的基础身份信息
├── logs  # 运行日志与审计日志目录
│   ├── config-audit.jsonl  # 配置变更审计日志
│   ├── gateway.err.log  # 网关错误输出日志
│   └── gateway.log  # 网关常规运行日志
├── openclaw.json  # OpenClaw 主配置文件（模型、通道、工具、网关等）
├── openclaw.json.bak  # 主配置文件的最近一次备份
├── subagents  # 子代理运行状态目录
│   └── runs.json  # 子代理运行记录索引
├── telegram  # Telegram 渠道的运行时状态与缓存目录
│   ├── command-hash-default-01a0abe3bc1ab59d.txt  # 已处理命令哈希缓存，用于避免重复执行
│   └── update-offset-default.json  # Telegram update offset 检查点，避免重复拉取消息
├── update-check.json  # 上次检查 OpenClaw 更新的时间记录
└── workspace  # 代理工作区目录，存放人格、用户、心跳与本地说明文档
    ├── AGENTS.md  # 工作区总说明，定义每次会话的读取顺序和行为约定
    ├── BOOTSTRAP.md  # 首次启动引导文档，用于初始化代理身份与用户信息
    ├── HEARTBEAT.md  # 心跳轮询任务说明；为空时通常表示跳过周期检查
    ├── IDENTITY.md  # 代理自我身份档案（名称、风格、头像等）
    ├── SOUL.md  # 代理的核心行为准则与长期风格设定
    ├── TOOLS.md  # 本地环境专属工具笔记与速查信息
    └── USER.md  # 当前用户的称呼、偏好与背景信息
```

## 任务成功率最高的模型

[PinchBench - Success Rate Leaderboard](https://pinchbench.com/)

## 数据提供商

[Agent Skills & Data Unified Interface for LLMs | QVeris AI](https://www.qveris.ai/)

## Agent

Agent 不是常驻进程，而是 per-session 的瞬态实例。每个对话都是一次完整的加载-执行-销毁循环。

**OpenClaw引入了全新的上下文引擎插件架构(Context Engine Plugins)。**这在技术圈里意味着什么？意味着“记忆管理”从一个固定的死板程序，变成了一个可以随时拔插更换的“插件”。

Lossless-Claw的核心逻辑听起来非常接近我们真实人类做笔记的路子。它参考了无损上下文管理的最新研究成果。

它的工作流程不再是简单粗暴的“阅后即焚”，而是分成了极其克制的三步走：

- **压缩(Summarization)：** 当对话太长快要塞不下时，系统不会直接扔掉旧信息，而是启动一个微型模型把旧对话提炼成一段极其精炼的摘要。
- **双向链接(Bi-directional Linking)：** 这段摘要并不是孤立存在的，它身上带着一个隐形链接精准指向原始的、未压缩的对话记录。
- **按需展开(On-demand Expansion)：** 如果AI在后续对话中突然发现某个摘要里提到了它现在急需的细节，它会像点开折叠文件夹一样瞬间把那段原始对话找回来并展开。