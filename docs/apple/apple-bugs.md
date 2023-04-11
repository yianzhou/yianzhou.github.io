# Apple Bugs

## 反馈

[Feedback Assistant](https://feedbackassistant.apple.com/)

[Bug Reporting](https://developer.apple.com/bug-reporting/profiles-and-logs/)

## Unable to install

Xcode 调试无法安装：

- 重启 Xcode：❌
- 重启 Mac：❌
- 重启 iPhone：✅（23/4/10 试了也不行）
- 删掉所有 appextension target：✅（23/4/10 试了也不行）
- 删掉 APP 重装：✅

```
Details

Unable to install "???"
Domain: com.apple.dt.MobileDeviceErrorDomain
Code: -402653170
User Info: {
    DVTErrorCreationDateKey = "2023-03-28 07:33:56 +0000";
    IDERunOperationFailingWorker = IDEInstalliPhoneLauncher;
}
--
End of file.
Domain: com.apple.dt.MobileDeviceErrorDomain
Code: -402653170
User Info: {
    DVTRadarComponentKey = 261622;
    MobileDeviceErrorCode = "(0xE800000E)";
    "com.apple.dtdevicekit.stacktrace" = (
	0   DTDeviceKitBase                     0x000000011131c2bc DTDKCreateNSErrorFromAMDErrorCode + 300
	1   DTDeviceKitBase                     0x00000001113503c0 __90-[DTDKMobileDeviceToken installApplicationBundleAtPath:withOptions:andError:withCallback:]_block_invoke + 136
	2   DVTFoundation                       0x00000001053f20e0 DVTInvokeWithStrongOwnership + 76
	3   DTDeviceKitBase                     0x0000000111350144 -[DTDKMobileDeviceToken installApplicationBundleAtPath:withOptions:andError:withCallback:] + 1196
	4   IDEiOSSupportCore                   0x0000000116d73c34 __118-[DVTiOSDevice(DVTiPhoneApplicationInstallation) processAppInstallSet:appUninstallSet:installOptions:completionBlock:]_block_invoke.147 + 2328
	5   DVTFoundation                       0x00000001054fc99c __DVT_CALLING_CLIENT_BLOCK__ + 16
	6   DVTFoundation                       0x00000001054fd408 __DVTDispatchAsync_block_invoke + 152
	7   libdispatch.dylib                   0x000000019e62e5f0 _dispatch_call_block_and_release + 32
	8   libdispatch.dylib                   0x000000019e6301b4 _dispatch_client_callout + 20
	9   libdispatch.dylib                   0x000000019e6378a8 _dispatch_lane_serial_drain + 668
	10  libdispatch.dylib                   0x000000019e638404 _dispatch_lane_invoke + 392
	11  libdispatch.dylib                   0x000000019e642c98 _dispatch_workloop_worker_thread + 648
	12  libsystem_pthread.dylib             0x000000019e7f0360 _pthread_wqthread + 288
	13  libsystem_pthread.dylib             0x000000019e7ef080 start_wqthread + 8
);
}
--

Analytics Event: com.apple.dt.IDERunOperationWorkerFinished : {
    "device_model" = "iPhone13,2";
    "device_osBuild" = "16.3.1 (20D67)";
    "device_platform" = "com.apple.platform.iphoneos";
    "launchSession_schemeCommand" = Run;
    "launchSession_state" = 1;
    "launchSession_targetArch" = arm64;
    "operation_duration_ms" = 151672;
    "operation_errorCode" = "-402653170";
    "operation_errorDomain" = "com.apple.dt.MobileDeviceErrorDomain";
    "operation_errorWorker" = IDEInstalliPhoneLauncher;
    "operation_name" = IDEiPhoneRunOperationWorkerGroup;
    "param_consoleMode" = 0;
    "param_debugger_attachToExtensions" = 0;
    "param_debugger_attachToXPC" = 1;
    "param_debugger_type" = 5;
    "param_destination_isProxy" = 0;
    "param_destination_platform" = "com.apple.platform.iphoneos";
    "param_diag_MainThreadChecker_stopOnIssue" = 0;
    "param_diag_MallocStackLogging_enableDuringAttach" = 0;
    "param_diag_MallocStackLogging_enableForXPC" = 1;
    "param_diag_allowLocationSimulation" = 1;
    "param_diag_checker_tpc_enable" = 1;
    "param_diag_gpu_frameCapture_enable" = 0;
    "param_diag_gpu_shaderValidation_enable" = 0;
    "param_diag_gpu_validation_enable" = 0;
    "param_diag_memoryGraphOnResourceException" = 0;
    "param_diag_queueDebugging_enable" = 1;
    "param_diag_runtimeProfile_generate" = 0;
    "param_diag_sanitizer_asan_enable" = 0;
    "param_diag_sanitizer_tsan_enable" = 0;
    "param_diag_sanitizer_tsan_stopOnIssue" = 0;
    "param_diag_sanitizer_ubsan_stopOnIssue" = 0;
    "param_diag_showNonLocalizedStrings" = 0;
    "param_diag_viewDebugging_enabled" = 1;
    "param_diag_viewDebugging_insertDylibOnLaunch" = 1;
    "param_install_style" = 0;
    "param_launcher_UID" = 2;
    "param_launcher_allowDeviceSensorReplayData" = 0;
    "param_launcher_kind" = 0;
    "param_launcher_style" = 0;
    "param_launcher_substyle" = 0;
    "param_runnable_appExtensionHostRunMode" = 0;
    "param_runnable_productType" = "com.apple.product-type.application";
    "param_runnable_type" = 2;
    "param_testing_launchedForTesting" = 0;
    "param_testing_suppressSimulatorApp" = 0;
    "param_testing_usingCLI" = 0;
    "sdk_canonicalName" = "iphoneos16.2";
    "sdk_osVersion" = "16.2";
    "sdk_variant" = iphoneos;
}
--


System Information

macOS Version 12.6.2 (Build 21G320)
Xcode 14.2 (21534) (Build 14C18)
Timestamp: 2023-03-28T15:33:56+08:00
```

## Instruments 看不到符号

1. 重启 Xcode 和 Mac
2. 确保 xcode 工程里开启 DWARF with dSYM
3. 重新 profile 一次

如果 1~3 还不行，重装 Xcode 即可解决问题。

## WKPasswordView 崩溃问题

![img](/img/672DED12-1B0D-4512-B732-F1EA9AD0747D.png)

## Xcode 编译遇到错误直接停住

编译遇到错误直接停住，不继续进行也不报错误

![img](/img/F14F25E6-64EC-4BAF-9B14-9C621572B555.png)

## 模拟器读不了剪贴板

<https://developer.apple.com/forums/thread/682395>

```
2022-06-10 14:20:49.799939+0800 mttlite[95986:1163105] [claims] Upload preparation for claim 86E693B5-3C42-4D3C-961F-D765CBD0DCAC completed with error: Error Domain=NSCocoaErrorDomain Code=256 "未能打开文件“62a2509f882bf7cad1f2c3e8d11735b88a810281”。" UserInfo={NSURL=file:///Users/yianzhou/Library/Developer/CoreSimulator/Devices/2B208B55-99BE-4A23-901D-D8A88D07452B/data/Library/Caches/com.apple.Pasteboard/eb77e5f8f043896faf63b5041f0fbd121db984dd/62a2509f882bf7cad1f2c3e8d11735b88a810281, NSFilePath=/Users/yianzhou/Library/Developer/CoreSimulator/Devices/2B208B55-99BE-4A23-901D-D8A88D07452B/data/Library/Caches/com.apple.Pasteboard/eb77e5f8f043896faf63b5041f0fbd121db984dd/62a2509f882bf7cad1f2c3e8d11735b88a810281, NSUnderlyingError=0x600000a59770 {Error Domain=NSOSStatusErrorDomain Code=-10817 "(null)"}}
```

## 在 LLDB 使用中文会卡死

[unixzii/XcodePatch: A patch collection to save your Xcode.](https://github.com/unixzii/XcodePatch) Xcode 13.3 introduced a very annoying bug. When you type anything with Chinese IME in the LLDB console, the whole app freezes! I did some investigation and fixed this issue before Apple publishes the next release.

## Wi-Fi 慢

[WiFriedX | by Mario Ciabarra | Medium](https://medium.com/@mariociabarra/wifriedx-in-depth-look-at-yosemite-wifi-and-awdl-airdrop-41a93eb22e48)

[Troubleshooting your Stadia experience - Stadia Help](https://support.google.com/stadia/answer/9595943?hl=en#zippy=%2Cmac-and-ios-troubleshooting)

[Mac WiFi 间歇性断流断网问题解决 - 知乎](https://zhuanlan.zhihu.com/p/441284532)

AWDL 是苹果公司推出的独家无线直接链接协议，可实现点到点的数据高速传送，它的数据传输原理是先用蓝牙对接上，再占用 WiFi 模块进行传输。Apple 侧并不认为这是个问题或 BUG，但在无线高密、高并发的办公场景内使用对本机及同颗无线 AP 下的其他用户的无线体验带来影响。

## 私有无线局域网地址（MAC 地址）

[在 iPhone、iPad、iPod touch 和 Apple Watch 上使用私有无线局域网地址 - 官方 Apple 支持 (中国)](https://support.apple.com/zh-cn/HT211227)
