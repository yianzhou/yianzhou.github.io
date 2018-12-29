---
title:  "ARFoundation 初探"
categories: [Apple]
---

[AVFoundation Programming Guide](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/AVFoundationPG/Articles/00_Introduction.html)

AVFoundation Stack on iOS:

![image](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/AVFoundationPG/Art/frameworksBlockDiagram_2x.png)

# 1. Playback and Editing

[Creating a Basic Video Player (iOS and tvOS)
](https://developer.apple.com/documentation/avfoundation/media_assets_playback_and_editing/creating_a_basic_video_player_ios_and_tvos)

# 2. Media Assets
Many of AVFoundation’s key features and capabilities relate to playing and processing media assets. The framework models assets by using the `AVAsset` class, which is an abstract, immutable type representing a single media resource. It provides a composite view of a media asset, modeling the static aspects of the media as a whole.

`AVAsset` is a container object composed of one or more instances of `AVAssetTrack`. The most commonly used track types are audio and video tracks, but AVAssetTrack also models other supplementary tracks, such as closed captions, subtitles, and timed metadata. `AVAssetTrack` adopts the `AVAsynchronousKeyValueLoading` protocol. （采纳了这个协议的类，即表示实现了异步加载键值对的方法。）

`AVAsset` is an abstract class, so when you create an asset as shown in the example, you’re actually creating an instance of one of its concrete subclasses called `AVURLAsset`. In many cases this is a suitable way of creating an asset, but you can also directly instantiate an `AVURLAsset` when you need more fine-grained control/options over its initialization.

Because of the nature of timed audiovisual media, upon successful initialization of an asset, some or all of the values for its keys may not be immediately available. The value of any key can be requested at any time, and the asset always returns its value synchronously, although it may have to block the calling thread to do so. To avoid blocking, you can register your interest in particular keys and be notified when their values become available. For further details, see `AVAsynchronousKeyValueLoading`.

`AVAsynchronousKeyValueLoading` protocol includes methods you can use to find out the status of a key—any property of a class that uses asynchronous key value loading. For example, you can find out whether the value of a key has been loaded. You can also ask the object to load its values asynchronously and inform you when the operation has completed.

If you need to access information about the asset before you enqueue it for playback, you can use the methods of the `AVAsynchronousKeyValueLoading` protocol to load the values you need.

To play an instance of `AVAsset`, initialize an instance of `AVPlayerItem` with it, and provide the player item to an `AVPlayer` object according to whether the item is to be played by itself or with a collection of other items.

You can insert AVAsset objects into an `AVMutableComposition` object to assemble audiovisual constructs from one or more source assets.

## File Import
`AVAssetReader` lets you: Read raw un-decoded media samples directly from storage, obtain samples decoded into renderable forms. Mix multiple audio tracks of the asset and compose multiple video tracks by using `AVAssetReaderAudioMixOutput` and `AVAssetReaderVideoCompositionOutput`.

You can read the media data of an asset track by adding an instance of `AVAssetReaderTrackOutput` to an asset reader using the `AVAssetReader` method `add(_:)`. The `AVAssetReaderTrackOutput` class can only produce uncompressed output. For audio output settings, this means that `AVFormatIDKey` must be `kAudioFormatLinearPCM`.  For video output settings, this means that the dictionary must contain values for uncompressed video output, as defined in Video Settings. 

## File Export
Convert the movie file by exporting the asset into the desired file type. You'll use `AVFileType` to configure an `AVAssetExportSession` object, which then manages the export process from your existing type.

You can get the media data for one or more assets from instances of `AVAssetReader` or even from outside the AVFoundation API set. Send Media data to `AVAssetWriter` for writing in the form of `CMSampleBuffer`. You can only use a given instance of `AVAssetWriter` once to write to a single file. You must use a new instance of `AVAssetWriter` every time you write to a file.

# 3. Cameras and Media Capture

[Requesting Authorization for Media Capture on iOS](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_ios)

An `AVCaptureSession` is the basis for all media capture in iOS and macOS. It manages your app’s exclusive access to the OS capture infrastructure and capture devices, as well as the flow of data from input devices to media outputs. How you configure connections between inputs and outputs defines the capabilities of your capture session.
![image](https://docs-assets.developer.apple.com/published/90ad0ad032/b9c65b62-3728-43f1-8d25-08fd42bc6bb7.png)

