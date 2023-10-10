# VSCode

## 换行

如何将日志文件里的 `\n` 变成真正的换行？

![img](/img/33DB6234-84C6-41FA-B8F3-BAFE8D2F2C42.png)

## 插件

统计代码行数：VS Code Counter

AI 写代码：[GitHub Copilot · Your AI pair programmer](https://copilot.github.com/)

## 常用快捷键

查看、编辑键盘快捷键：`⌘ K + ⌘ S`

Go to file 前往文件 quickopen：`⌘ P`

workbench.action.openEditorAtIndex1 打开/切换 tab：自定义！

## Preferences - User Settings

重置所有设置：

1. 打开设置
2. 右上角 - 打开 settings.json
3. 删掉所有内容即可

保存时自动格式化：

```json
{
  "editor.formatOnType": true,
  "editor.formatOnSave": true,
  "[ruby]": {
    "editor.defaultFormatter": "jnbt.vscode-rufo"
  },
  "window.autoDetectColorScheme": true,
  "workbench.colorTheme": "Default Light Modern",
  "[markdown]": {
      "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
  }
}
```

## Preferences - User Snippets

Trigger Suggestion 触发代码补全建议：`⌘ I`

注意：Markdown 文件不支持自动弹出补全建议！！

## 搜索结果不全

设置项的问题，忽略了 `.gitignore` 的文件：

```json
"search.useIgnoreFiles": false
```

## 解决冲突时不高亮了

![img](/img/8BBE8C09-1BAC-4582-A66C-588DB64E14AC.png)

Settings 里面把这个取消勾选。

## Ruby 无法高亮

系统要先安装：`gem install rufo`
