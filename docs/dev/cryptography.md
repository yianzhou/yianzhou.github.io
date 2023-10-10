# 加解密与数字签名

## 加解密

加密：密钥 + 明文 -> 密文；

解密：密钥 + 密文 -> 明文。

如果加密和解密过程的密钥相同，则称为对称加密，反之为非对称加密。

对称加密：stream ciphers and block ciphers (DES, 3DES, AES)。

非对称加密：RSA，发送者公钥加密、接收者私钥解密。

## 加密哈希函数

哈希函数将任意长度的消息，映射到固定长度的哈希字符串。

加密哈希函数满足以下特性：对任意两个不同的消息，哈希值不一样。

MD5, SHA-1, SHA-2, SHA-3

```sh
> md5 -s "abc"
MD5 ("abc") = 900150983cd24fb0d6963f7d28e17f72

> md5 -s "123456"
MD5 ("123456") = e10adc3949ba59abbe56e057f20f883e
```

## MAC

Alice 将消息 m 和其哈希值 h 一起发送给 Bob；Bob 验证 H(m) = h，确保了消息完整性。

但，入侵者也可以假装是 Alice 并且发送 (m', H(m'))，那么如何确保信息就是 Alice 发来的呢？

Alice 和 Bob 需要一个共同的 authentication key `s`，并发送 `(m, H(m + s))`，`H(m + s)` 就称为 MAC (Message authentication code)。

注意，这个过程中并没有涉及明文-密文的转换。MAC 的应用场景只关心消息的完整性，不关心消息的保密性。

However, to allow the receiver to be able to detect **replay attacks**, the message itself must contain data that assures that this same message can only be sent once (e.g. **time stamp**, **sequence number** or use of a **one-time MAC**). Otherwise an attacker could – without even understanding its content – record this message and play it back at a later time, producing the same result as the original sender.

## 数字签名

Bob 使用他的私钥签名一份文件（通常是签名文件摘要/哈希值），Alice 使用 Bob 的公钥解密，可以证明这份文件是 Bob 的。

当 Alice 收到了 Bob 的数字签名，她需要使用 Bob 的公钥来验证。但，如何保证她手上的公钥就是 Bob 的？

CA 负责颁发证书，**证书中包含了 Bob 的名字和他的公钥**，以此证明这份公钥就是 Bob 的。CA 是有公信力的机构，是我们可以相信的。

证书由 CA 的私钥进行数字签名，Alice 使用 CA 的公钥解密，证明这份证书是 CA 颁发的。但，如何保证她手上 CA 的公钥就是 CA 的呢？

![img](/assets/images/截屏2020-10-1116.58.44.png)

在 macOS 中，根证书存储在钥匙串访问（Keychain Access）的系统钥匙串（System Keychain）中。访问“应用程序 > 实用工具 > 钥匙串访问”，在“系统”钥匙串下可以找到根证书。Safari 浏览器使用由 macOS 钥匙串访问管理的证书。

## 代码签名

代码签名是对应用程序可执行文件的数字签名。

通过 App Store 渠道分发的应用，是怎么签名的：苹果服务器持有私钥，iOS 系统内置公钥。App 上传到 App Store 后，由苹果用私钥签名，下载到手机后，用公钥验证。

iOS 双向签名验证：

1. Mac 电脑通过 CSR 文件（本地公钥 M）向 App Store 申请证书和描述文件，由苹果的私钥 A 进行签名。
2. Mac 电脑拿到签名后的证书，与本地私钥 M 进行绑定（即导出后的 p12 文件）。
3. Xcode 安装时，使用本地私钥 M 对 App 签名，并将可执行文件 + App 签名 + 描述文件 + 证书一起打包。
4. iOS 安装时，利用内置的苹果公钥 A 验证证书，证明是苹果颁发的。
5. 取出证书中的公钥，验证 App 的签名。

![img](/assets/images/应用签名原理-0010.png)

描述文件限制了：AppID、可安装的设备、可使用的权限（Push、iCloud 等）

查看 CSR 文件内容：`openssl asn1parse -i -in CertificateSigningRequest.certSigningRequest`

描述文件的存放位置：`~/Library/MobileDevice/Provisioning\ Profiles`

查看描述文件的信息：`security cms -D -i f2a92752-97d8-4231-9064-20b4811cdd8b.mobileprovision`

用 [MachOView](https://sourceforge.net/projects/machoview/) 可以查看可执行文件里的代码签名信息。

> [WWDC 2016 - What's New in Xcode App Signing](https://developer.apple.com/videos/play/wwdc2016/401/)

> [Apple Support - Code Signing](https://developer.apple.com/support/code-signing/)

> [Xcode Help - What is app signing?](https://help.apple.com/xcode/mac/current/#/dev3a05256b8)

There are three things that you need in order to sign your apps.

- Certificates 标识开发者身份
- Provisioning Profiles 标识应用程序，包括可安装的设备和能力（其中能力通过 entitlement 文件）
- Entitlements 标识应用程序每个 target 的能力

Certificates are issued by Apple. This is important because the device needs a trust chain back to Apple so it can install the app. Certificates come in two forms: development and distribution. Certificates require a private key to be in the keychain if you want to sign your apps. 苹果设备不允许随意安装应用程序，应用程序必须通过信任链以证明它是由苹果信任的开发者发布的。

Profiles grant permissions. They allow access to running on devices and entitlements. There's a white list of entitlements in a profile. Entitlements declare capabilities.
