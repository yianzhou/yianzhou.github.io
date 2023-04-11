# XCAssets

actool - compiles, prints, updates, and verifies asset catalogs.

```bash
actool resources/Images.xcassets --compile build --minimum-deployment-target 11.0 --platform iphoneos --filter-for-device-model iPhone10,1 --filter-for-device-os-version 12.0
```

提取 `Assets.car` 里的内容：`xcrun assetutil -I Assets.car > 1.txt`

解压 Assets.car 文件：

- [chenjie1219/cartool](https://github.com/chenjie1219/cartool)
- [pcjbird/AssetsExtractor](https://github.com/pcjbird/AssetsExtractor)

读取 bundle 里的颜色/图片：

```
NSBundle *bundle = [NSBundle bundleWithPath:[[[NSBundle mainBundle] bundlePath] stringByAppendingPathComponent:@"ZWAppApiResource.bundle"]];
UIColor *color = [UIColor colorNamed:@"ZW_DwgWhiteColor" inBundle:bundle compatibleWithTraitCollection:nil];
UIImage *image = [UIImage imageNamed:@"Layer_Button_Off" inBundle:bundle compatibleWithTraitCollection:nil];
```

出现读取不到颜色的情况，发现是 bundle 里面有个名字叫 Resources 的文件夹影响到了，如果把这个文件夹改个其它名字，颜色就能读出来。
