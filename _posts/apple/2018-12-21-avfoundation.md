---
title: "AVFoundation"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

[Learning-AV-Foundation 示例代码](https://github.com/tapharmonic/Learning-AV-Foundation)

# 介绍

AVFoundation Stack on iOS:

![img-60](/assets/images/1_zY4oLLDPVGW1cMdhzSHElg.png)

媒体元数据读写：`AVMetadataItem` 允许开发者读写媒体资源的描述信息，如艺术家、专辑等。

`AVPlayer` 和 `AVPlayerItem` 让你从本地文件或远程流中播放视频或音频，并对播放进行控制。

摄像头采集的核心类是 `AVCaptureSession`，可以对采集设备进行精确控制，捕捉静态图片和视频。

`AVAssetReader` 和 `AVAssetWriter` 提供直接访问视频帧和音频样本的功能。

# 播放和录制音频

`AVAudioSession` 在应用程序和操作系统之间扮演了中间人的角色。

`AVAudioPlayer` 和 `AVAudioRecorder` 提供了音频播放和记录的功能。

[`AVAudioSession.Category`](https://developer.apple.com/documentation/avfoundation/avaudiosession/category) 定义了 7 种分类来描述应用程序的音频行为。

| Category            | 是否被锁屏和静音开关静音 | 是否允许混音 | 音频输入 | 音频输出 |
| ------------------- | ------------------------ | ------------ | -------- | -------- |
| ambient             | ✅                       | ✅           |          | ✅       |
| soloAmbient（默认） | ✅                       |              |          | ✅       |
| playback            |                          | Optional     |          | ✅       |
| record              |                          |              | ✅       |          |
| playAndRecord       |                          | Optional     | ✅       | ✅       |
| multiRoute          |                          |              | ✅       | ✅       |

音频会话在应用程序的生命周期中是可以修改的，但通常我们只对其配置一次，最佳位置就是在启动时：

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let session = AVAudioSession.sharedInstance()
    try? session.setCategory(.playback)
    try? session.setActive(true) // tell the session to active
    return true
}
```

想要在后台播放音频，除了设置合适的音频会话外，需要在 `Info.plist` 里面增加配置：

```xml
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
```

想要录制音频，需要在 `Info.plist` 里面增加配置，首次访问麦克风会询问用户同意。

```xml
<key>NSMicrophoneUsageDescription</key>
<string>To record memo.</string>
```

`AVAudioRecorder` 和 `AVAudioPlayer` 都可以对音量进行测量。通过 `averagePowerForChannel:` 和 `peakPowerForChannel:` 方法获得的读数，是一个描述音量等级的对数单位，取值范围从最大分贝的 0（full scale）到最小分贝或静音的 -160dB。我们想在用户界面上展示音量大小，需要把这个值转化为 0 - 1 之间的值。参考 `THMeterTable` 类。

# 资源和元数据

有别于传统面向文件的音频类，AVFoundation 把所有的代码设计围绕着“资源”进行，最核心的类就是 `AVAsset`！

`AVAsset` 是一个抽象类。第一，它提供了对基本媒体格式的抽象，开发者不需考虑不同的编码和容器格式细节，只需面对“资源”这一概念；第二，它屏蔽了资源位置的细节，不管资源是在应用程序 bundle、沙盒文件夹、用户音乐库或远程音频流，开发者都可以合理地获取和载入媒体。

`AVAsset` 本身不是媒体资源，它是 timed media 的容器。它由一个或多个带有（描述自身的）元数据的媒体组成，即 `AVAssetTrack`，最常见的形态就是音频和视频流，还有文本、副标题、隐藏字幕等类型。

Many of AVFoundation’s key features and capabilities relate to playing and processing media assets. The framework models assets by using the `AVAsset` class, which is an abstract, immutable type representing a single media resource. It provides a composite view of a media asset, modeling the static aspects of the media as a whole. 它提供了媒体资产的组合视图，对整个媒体的静态方面进行了建模。

`AVAsset` is an abstract class, so when you create an asset as shown in the example, you’re actually creating an instance of one of its concrete subclasses called `AVURLAsset`. In many cases this is a suitable way of creating an asset.

```objc
// AVURLAssetPreferPreciseDurationAndTimingKey 默认为 NO, YES表示提供精确的时长
NSDictionary *inputOptions = [NSDictionary dictionaryWithObject:[NSNumber numberWithBool:YES] forKey:AVURLAssetPreferPreciseDurationAndTimingKey];

// 创建 AVURLAsset
AVURLAsset *inputAsset = [[AVURLAsset alloc] initWithURL:videoUrl options:inputOptions];
```

`AVAsset` is a container object composed of one or more instances of `AVAssetTrack`. The most commonly used track types are audio and video tracks, but AVAssetTrack also models other supplementary tracks, such as closed captions, subtitles, and timed metadata. 最常用的轨道类型是音频和视频轨道，但是 AVAssetTrack 也可以对其他补充轨道进行建模，例如隐藏式字幕，字幕和定时元数据。

```objc
AVAssetTrack *videoTrack = [[asset tracksWithMediaType:AVMediaTypeVideo] objectAtIndex:0];
```

`AVAssetTrack` adopts the `AVAsynchronousKeyValueLoading` protocol. （采纳了这个协议的类，即表示实现了异步加载键值对的方法。）

Because of the nature of timed audiovisual media, upon successful initialization of an asset, some or all of the values for its keys may not be immediately available. The value of any key can be requested at any time, and the asset always returns its value synchronously, although it may have to block the calling thread to do so. To avoid blocking, you can register your interest in particular keys and be notified when their values become available. For further details, see `AVAsynchronousKeyValueLoading`.

`AVAsynchronousKeyValueLoading` protocol includes methods you can use to find out the status of a key—any property of a class that uses asynchronous key value loading. For example, you can find out whether the value of a key has been loaded. You can also ask the object to load its values asynchronously and inform you when the operation has completed.

To play an instance of `AVAsset`, initialize an instance of `AVPlayerItem` with it, and provide the player item to an `AVPlayer` object according to whether the item is to be played by itself or with a collection of other items.

You can insert AVAsset objects into an `AVMutableComposition` object to assemble audiovisual constructs from one or more source assets.

## File Import

`AVAssetReader` lets you: Read raw un-decoded media samples directly from storage, obtain samples decoded into renderable forms. Mix multiple audio tracks of the asset and compose multiple video tracks.

You can read the media data of an asset track by adding an instance of `AVAssetReaderTrackOutput` to an asset reader using the `AVAssetReader` method `add(_:)`. The `AVAssetReaderTrackOutput` class can only produce **uncompressed** output. For video output settings, this means that the dictionary must contain values for uncompressed video output, as defined in Video Settings.

```objc
AVAssetReader *assetReader = [AVAssetReader assetReaderWithAsset:asset error:&error];

NSMutableDictionary *outputSettings = [NSMutableDictionary dictionary];
[outputSettings setObject:@(kCVPixelFormatType_420YpCbCr8BiPlanarFullRange) forKey:(id)kCVPixelBufferPixelFormatTypeKey];

AVAssetReaderTrackOutput *readerVideoTrackOutput = [AVAssetReaderTrackOutput assetReaderTrackOutputWithTrack:[[asset tracksWithMediaType:AVMediaTypeVideo] objectAtIndex:0] outputSettings:outputSettings];
// alwaysCopiesSampleData 表示缓存区的数据输出之前是否会被复制。YES: 输出总是从缓存区提供复制的数据，你可以自由的修改这些缓存区数据
readerVideoTrackOutput.alwaysCopiesSampleData = NO;

// 为 assetReader 填充输出
[assetReader addOutput:readerVideoTrackOutput];
```

## File Export

Convert the movie file by exporting the asset into the desired file type. You'll use `AVFileType` to configure an `AVAssetExportSession` object, which then manages the export process from your existing type.

You can get the media data for one or more assets from instances of `AVAssetReader` or even from outside the AVFoundation API set. Send Media data to `AVAssetWriter` for writing in the form of `CMSampleBuffer`. You can only use a given instance of `AVAssetWriter` once to write to a single file. You must use a new instance of `AVAssetWriter` every time you write to a file.
