---
title: "AVFoundation"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# 介绍

[Learning-AV-Foundation 示例代码](https://github.com/tapharmonic/Learning-AV-Foundation)

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

如果创建一个用在音频或视频编辑场景中的资源，可以用更长的加载时间，来获取更精确的资源时长信息。

```objc
NSDictionary *options = @{AVURLAssetPreferPreciseDurationAndTimingKey: @YES};
AVURLAsset *asset = [[AVURLAsset alloc] initWithURL:url options:options];
```

`AVAsset` 本身不是媒体资源，它是 timed media 的容器。它由一个或多个带有（描述自身的）元数据的媒体组成，即 `AVAssetTrack`，最常见的形态就是音频和视频流，还有文本、副标题、隐藏字幕等类型。

## 媒体来源

一、`UIImagePickerController`，无需授权，无需权限描述。

```swift
class ViewController: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        let pickerController = UIImagePickerController()
        pickerController.sourceType = .photoLibrary
        pickerController.delegate = self
        pickerController.mediaTypes = ["public.movie"];
        pickerController.modalPresentationStyle = .fullScreen
        pickerController.videoExportPreset = AVAssetExportPresetPassthrough
        self.present(pickerController, animated: true, completion: nil)
    }

    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        if let url = info[.mediaURL] as? URL {
            // 如果创建一个用在音频或视频编辑场景中的资源，可以用更长的加载时间，来获取更精确的资源时长信息。
            let asset = AVURLAsset(url: url, options: [AVURLAssetPreferPreciseDurationAndTimingKey: true])
            print(asset.duration)
        }
        picker.dismiss(animated: true, completion: nil)
    }

    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {}
}
```

二、NSURL (Bundle, Network)

```objc
NSURL *url = [[NSBundle mainBundle] URLForResource:@"v0300fd00000btm8f4819jm9302jl26g" withExtension:@"MP4"];
AVAsset *asset = [[AVURLAsset alloc] initWithURL:url options:nil];

NSURL *remoteUrl = [NSURL URLWithString:@"http://d2406bdlf08kkz.cloudfront.net/subscribe/sleep/audio/a616b9fa-84ae-4d1d-b177-d1491e6de57c.mp4"];
AVAsset *remoteAsset = [[AVURLAsset alloc] initWithURL:remoteUrl options:nil];
NSLog(@"%lld", remoteAsset.duration.value);
```

三、PhotoKit

需要在 `Info.plist` 中增加 `NSPhotoLibraryUsageDescription`，开发者自行获取并决定展示方式。

```objc
[PHPhotoLibrary requestAuthorizationForAccessLevel:PHAccessLevelReadWrite handler:^(PHAuthorizationStatus status) {
    switch (status) {
        case PHAuthorizationStatusAuthorized:
        case PHAuthorizationStatusLimited:
            [self fetchAllVideos];
            break;
        default:
            break;
    }
}];
```

## 异步载入资源属性

AVAsset 初始化时，延迟载入资源的属性，直到请求的时候才载入，这样可以快速创建资源模型。对属性的访问是同步进行的，意味着如果属性没有载入，程序就会阻塞。比如，请求资源的 duration 可能是一个昂贵的操作，例如 MP3 文件的头没有 TLEN 标签时，则需要解析整个音频来确定它的时长，假设这个请求发生在主线程，就会阻塞主线程直到操作完成。

正因为上述原因，AVAsset 遵循 AVAsynchronousKeyValueLoading 协议，可以异步查询资源的属性。

```swift
let url = Bundle.main.url(forResource: "RPReplay_Final1609407498", withExtension: "MP4")!
let asset = AVURLAsset(url: url)
let durationKey = "duration"
let tracksKey = "tracks"
// key 的名称和 AVAsset 的属性名称一样
asset.loadValuesAsynchronously(forKeys: [durationKey, tracksKey]) {
    // 需要为每个请求的属性调用 statusOfValueForKey:error: 方法，不能假设所有的属性都返回相同的状态值
    let durationStatus = asset.statusOfValue(forKey: durationKey, error: nil)
    let tracksStatus = asset.statusOfValue(forKey: tracksKey, error: nil)
    if durationStatus == .loaded && tracksStatus == .loaded {
        print(asset.duration)
        print(asset.tracks)
    }
}
```

duration 的类型是 CMTime，注意获取资源时长是 value/timescale = seconds.

## 媒体元数据

Apple 环境下的媒体类型主要有：QuickTime (mov), MPEG-4 video (mp4, m4v), MPEG-4 audio (m4a), MPEG-Layer III audio (mp3)。m4v 是带有苹果针对 FairPlay 加密及 AC3-audio 扩展的 mp4 格式；m4a 专门针对音频。

QuickTime 文件由一种称为 atom 的数据结构组成；MP4 直接派生自 QuickTime，数据结构相似。

MP3 与上面两种格式则有显著区别，它不使用容器格式，使用编码音频数据，文件开头有可选元数据，使用一种称为 ID3v2 的格式来保存描述信息。AVFoundation 支持读取 ID3v2 标签，但不支持写入，原因是 MP3 格式有专利限制。

对这些不同格式，AVFoundation 提供了统一的元数据接口 `AVMetadataItem`。大部分情况下我们使用 `AVAsset` 提供的元数据；少部分情况会使用到 `AVAssetTrack` 提供的元数据。

每个资源至少包含两个 `AVMetadataKeySpace`（键空间），用于将一组相关的键组合在一起。`AVAsset` 和 `AVAssetTrack` 提供两种方法获取元数据，`commonMetadata` 和 `metadataForFormat:`。

![img-60](/assets/images/57913ED8-77F7-4955-8676-7932F0F600CF.jpg)

Common 键空间通过 `commonMetadata` 查询：

```swift
let url = Bundle.main.url(forResource: "03 Demo ID3v2.3", withExtension: "mp3")!
let asset = AVURLAsset(url: url)
let commonMetadataKey = "commonMetadata"
asset.loadValuesAsynchronously(forKeys: [commonMetadataKey]) {
    let commonMetadata = asset.commonMetadata
    // 查找 Common 键空间的元数据
    let keySpace = AVMetadataKeySpace.common
    let artistKey = AVMetadataKey.commonKeyArtist
    let albumKey = AVMetadataKey.commonKeyAlbumName
    let artistMetadata = AVMetadataItem.metadataItems(from: commonMetadata, withKey: artistKey, keySpace: keySpace)
    let albumMetadata = AVMetadataItem.metadataItems(from: commonMetadata, withKey: albumKey, keySpace: keySpace)
    print(artistMetadata)
    print(albumMetadata)
}
```

其他特定类型键空间通过 `metadataForFormat:` 查询：

```swift
let url = Bundle.main.url(forResource: "01 Demo AAC", withExtension: "m4a")!
let asset = AVURLAsset(url: url)
let availableMetadataFormatsKey = "availableMetadataFormats"
asset.loadValuesAsynchronously(forKeys: [availableMetadataFormatsKey]) {
    let availableMetadataFormats = asset.availableMetadataFormats
    var metadata = [AVMetadataItem]()
    // 将所有元数据信息汇集到数组中
    for format in availableMetadataFormats {
        metadata.append(contentsOf: asset.metadata(forFormat: format))
    }
    print(metadata)
    // 查找 iTunes 键空间的元数据
    let keySpace = AVMetadataKeySpace.iTunes
    let artistKey = AVMetadataKey.iTunesMetadataKeyArtist
    let albumKey = AVMetadataKey.iTunesMetadataKeyAlbum
    let artistMetadata = AVMetadataItem.metadataItems(from: metadata, withKey: artistKey, keySpace: keySpace)
    let albumMetadata = AVMetadataItem.metadataItems(from: metadata, withKey: albumKey, keySpace: keySpace)
    print(artistMetadata)
    print(albumMetadata)
}
```

除了通过键和键空间来获取元数据外，iOS 8 之后新增了 `keyForIdentifier:` 方法，identifier 将键和键空间统一成单独的字符串，以更简单的模型获取元数据。

```swift
let url = Bundle.main.url(forResource: "03 Demo ID3v2.3", withExtension: "mp3")!
let asset = AVURLAsset(url: url)
let commonMetadataKey = "commonMetadata"
asset.loadValuesAsynchronously(forKeys: [commonMetadataKey]) {
    let commonMetadata = asset.commonMetadata
    // 查找 Common 键空间的元数据
    let artistMetadata = AVMetadataItem.metadataItems(from: commonMetadata, filteredByIdentifier: .commonIdentifierArtist)
    let albumMetadata = AVMetadataItem.metadataItems(from: commonMetadata, filteredByIdentifier: .commonIdentifierAlbumName)
    print(artistMetadata)
    print(albumMetadata)
}
```

## MetaManager 示例程序

从上面的章节得知，一个元数据的键，在不同的容器格式下，存在不同的表示。例如 "artist" 有两种 key 分别是 `AVMetadataCommonKeyArtist` 和 `AVMetadataQuickTimeMetadataKeyProducer`。示例程序的 `THMetadata` 就是将这些特定格式的元数据键，映射到一个标准化的、一致的键值集合中，这样一来，展现到用户界面的就是“艺术家”这个统一的选项。详见 `THMetadata` 的 `buildKeyMapping` 方法。

在处理 `AVMetadataItem` 时，最难的部分就是保存在 `value` 属性里的值。当 `value` 是简单字符串时，比如艺术家名字或唱片标题，很容易理解并且不需要转换。但如果 `value` 里是一些晦涩的内容，就需要一些额外工作来转换为可以展示的内容，可以在 `THMetadata` 类直接加入转换逻辑，但这样的话代码量会很大而且不易维护，更好的做法是将转换逻辑分离到几个独立的类中，使用**工厂模式**，这些类都遵循 `THMetadataConverter` 协议。

保存元数据的改变不会直接修改 `AVAsset`，而是通过 `AVAssetExportSession` 导出一个保存了元数据改动的资源副本。这里我们只修改元数据，不需要重新编码，因此初始化 `AVAssetExportSession` 时传入预设 `AVAssetExportPresetPassthrough`。但要注意这个 preset 只适用于修改元数据，如果要新增元数据，则必须使用转码 preset。

# 播放视频

## CMTime

在计算机程序中，用浮点型表示时长会存在丢失精度的问题，AVFoundation 使用 `CMTime` 这个数据结构来保存时长信息。`CMTime` 中的 `value` 和 `timescale` 分别作为分子和分母，表示一个时间间隔。

```objc
// One sample from a 44.1 kHz audio file
CMTime oneSample = CMTimeMake(1, 44100);
```
