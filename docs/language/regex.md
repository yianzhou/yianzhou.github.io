# Regex

> [learn-regex/README-cn.md at master · ziishaned/learn-regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)
>
> [re --- 正则表达式操作 — Python 3.10.0 文档](https://docs.python.org/zh-cn/3/library/re.html)
>
> [Regex Vis](https://regex-vis.com/)：在线可视化正则编辑器。

以下文章摘自：

- [Regular Expression HOWTO](https://docs.python.org/3/howto/regex.html)
- [learn-regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

## 匹配单个字符

正则表达式是对文本执行搜索时所指定的“格式”。大多数字符匹配它们自己，例如，正则表达式 `test` 将完全匹配字符串 `test`。

正则表达式是大小写敏感的，所以 `The` 不会匹配 `the`。

有些字符是特殊的**元字符**，有特殊作用，它们不匹配自身：

```
. ^ $ * + ? { } [ ] \ | ( )
```

`[` and `]` are used for specifying a **character class**, which is a set of characters that you wish to match. Characters can be listed individually, or a range of characters can be indicated by giving two characters and separating them by a '-'.

`[a-z]` match only lowercase letters.

在 `[]` 内的元字符会被当作一般的字符。

**complementing** the set: `[^5]` will match any character except `5`

在 `[]` 内想匹配元字符，就要加反斜杠转义。

`\d` 匹配任何十进制数字；这相当于 `[0-9]`

`\D` 匹配任何非数字字符；这相当于 `[^0-9]`

`\s` 匹配任何空白字符；这相当于 `[ \t\n\r\f\v]`

`\S` 匹配任何非空白字符；这相当于 `[^ \t\n\r\f\v]`

`\w` 匹配任何字母数字字符；这相当于类 `[a-zA-Z0-9_]`

`\W` 匹配任何非字母数字字符；这相当于类 `[^a-za-z0-9_]`

`.` matches anything except a newline character.

`(xyz)` 字符集，匹配与 `xyz` 完全相等的字符串

## 匹配多个字符

`*` specifies that the previous character can be matched zero or more times. 

- `a[bcd]*b` 匹配 a 开头、b 结尾、中间 bcd 任意字符重复任意次。

`+` matches one or more times.

`?` matches either once or zero time

`{m,n}` means there must be at least m repetitions, and at most n

## 更多元字符

`^` Matches at the beginning of a line.

`$` Matches at the end of a line.

`\b` Word boundary. This is a zero-width assertion that matches only at the beginning or end of a word. A word is defined as a sequence of alphanumeric characters, so the end of a word is indicated by whitespace or a non-alphanumeric character.

## 应用

找出当前目录下的所有 .h .m .mm 后缀的文件：`find -E . -regex ".*\.(h|m|mm)"`

全量格式化处理：

```bash
find -E . -regex ".*\.(h|m|mm|c|cc|cpp)" | xargs clang-format -i -style=file
```

on Mac OS X (BSD find): man find says -E uses extended regex support.
