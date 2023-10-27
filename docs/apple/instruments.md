# Instruments

Profile 要使用 Release 编译设置，原因是：

- release 包的性能跟线上是最为接近的，具有较高准确性
- ci 包里开启了大量调试工具和调试代码，一方面会让性能失真；另一方面由于这些工具可能 hook 了一些系统关键调用，可能导致 Instrument 抓取不到数据

## 方法一：使用 Comand + I（不推荐）

在 Xcode 中使用快捷键 Comand + I 会启动 Instruments，之后选择对应的模板即可进行 Profile。使用这种方法，Xcode 和 Instrument 会自动帮你做好符号化，在 Instrument 中点击堆栈，甚至会帮你在 Xcode 中直接定位到对应代码文件和对应行数。这种方法简单直接，也是苹果推荐的方式，但这种方式在超大型项目几无可用性，很可能遇到卡死、无响应等情况，所以不推荐，平常测试 Demo 之类的可以用这种方式。

## 方法二：单独使用 Instruments 进行 Profile（推荐）

单独使用 Instrument 进行 Profile 相较于方法一，可用性高了不少，但需要解决 debug 权限和符号化的问题，具体步骤如下：

- Xcode -> Open Developer Tool 中打开 Instrument
- 选择要 Profile 的设备和应用，以及 Instrument 模板
- 在录制界面按住 Option + 点击 Record 按钮，进入 Recording Options 界面可以对录制进行更精细的控制。

![img](/img/5A0B6AEB-423D-40CD-9D6B-C9DACBB2D983.png)

如果跑 Instruments 感觉很卡，或者丢失数据：在 Recording Options 中将 Recording Mode 设置为 Deferred 试试。

录制完记得保存 trace 文件！

## 方法三：使用 xctrace

xctrace 是 Instrument 的 CLI。有一个简单易用的方法可以符号化 trace 文件，即用 xctrace symbolicate 命令直接符号化整个 trace 文件。

推荐的重签名工具：[GitHub - AloneMonkey/MonkeyDev: CaptainHook Tweak、Logos Tweak and Command-line Tool、Patch iOS Apps, Without Jailbreak.](https://github.com/AloneMonkey/MonkeyDev)

## 符号解析

![img](/img/202ECC56-05F5-4488-A89D-CE1F38BD25CF.png)

如果没有产出符号表，需要将 Build Settings 中对应的配置改为 DWARF with DSYM File，再次 build 生成符号表。然后在 Xcode - Product - Show Build Folder in Finder 中找到符号表。
