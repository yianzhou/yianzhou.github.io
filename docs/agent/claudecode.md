# Claude Code

- `? for shortcuts` 默认模式：每次修改文件前都会询问用户
- `accept edits on` 自动模式：不询问用户，直接修改文件
- `plan mode on` 规划模式：只讨论，不修改文件

Ctrl + G 进入 VSCode 写 prompt

Shift + Enter 换行

`/task` 查看后台任务

`/rewind` 回滚，每次对话都会创建回滚点。Claude Code 可以回滚自己写入的文件，但无法回滚终端命令执行创建的文件。如果要精准回滚，建议使用 git。

`/resume` 恢复上一次会话，或者启动时`claude -c`

`/mcp` 管理 MCP 服务器

`/init` 创建 Claude.md 文件

`/memory` 可以看到三种记忆：`./CLAUDE.md`, `~/.claude/CLAUDE.md`, auto-memory folder

`/hooks` 例如在编辑代码后自动执行格式化函数

修改默认编辑器，创建 `~/.claude/settings.json` 并写入配置：

```json
{
  "env": {
    "EDITOR": "buddycn --wait"
  }
}
```

`/skills` 管理 Skills

`/agents` 管理 SubAgent。例如我们现在要执行代码审查，此时 Agent 会阅读很多代码，这个分析过程会完整地记录在当前会话的上下文中，很快上下文窗口就塞满了。这种独立的任务就特别适合交给 SubAgent 来处理。

![img](/img/F3832AE5-7631-4D94-897F-C541E0A842B5.png)

plugin = Skills + SubAgents + MCP + Hooks 打包在一起，像是一个完整的安装包。
