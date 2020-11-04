---
title: "AVFoundation"
categories: [Apple]
---

[Learning-AV-Foundation 示例代码](https://github.com/tapharmonic/Learning-AV-Foundation)

AVFoundation Stack on iOS:

![image](/assets/images/1_zY4oLLDPVGW1cMdhzSHElg.png)

# Media Assets and Metadata

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
