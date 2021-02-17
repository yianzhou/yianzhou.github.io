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

AVFoundation 提供的核心功能：音频播放与记录、媒体文件检查（元数据）、视频播放、媒体捕捉、媒体编辑、媒体处理（直接访问视频帧、音频样本）。

# 播放和录制音频

## 音频会话

`AVAudioSession` 在应用程序和操作系统之间扮演了中间人的角色。

`AVAudioPlayer` 和 `AVAudioRecorder` 都构建于 `CoreAudio` 之上，提供了音频播放和记录的功能。

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

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    AVAudioSession *session = [AVAudioSession sharedInstance];
    NSError *error;
    if (![session setCategory:AVAudioSessionCategoryPlayback error:&error]) {
        NSLog(@"Category Error: %@", [error localizedDescription]);
    }
    if (![session setActive:YES error:&error]) {
        NSLog(@"Activation Error: %@", [error localizedDescription]);
    }
    return YES;
}
```

想要在后台播放音频，除了设置合适的音频会话外，需要在 `Info.plist` 里面增加配置：

```xml
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
```

## 播放音频

创建 `AVAudioPlayer`：

```objc
- (AVAudioPlayer *)playerForFile:(NSString *)name {
    NSURL *fileURL = [[NSBundle mainBundle] URLForResource:name
                                             withExtension:@"caf"]; // 例子中的文件后缀名是 "caf"
    NSError *error;
    AVAudioPlayer *player = [[AVAudioPlayer alloc] initWithContentsOfURL:fileURL
                                                                   error:&error];
    if (player) {
        player.numberOfLoops = -1; // loop indefinitely
        player.enableRate = YES; // 可调节播放速率
        [player prepareToPlay]; // 这样做会取得需要的音频硬件、并预加载 AudioQueue 的缓冲区，可降低调用 play 方法到听到声音输出的延时
    } else {
        NSLog(@"Error creating player: %@", [error localizedDescription]);
    }
    return player;
}
```

`-[AVAudioPlayer stop]` 会撤销 `prepareToPlay` 中所做的设置，调用 `pause` 方法不会。

`volumn` 属性是播放器的音量，从 0.0（静音）到 1.0（最大，默认值）。

`pan` 属性是立体声平移，从 -1.0（全左声道）到 1.0（全右声道）。默认值为 0.0 （居中）。

`rate` 属性是播放速率，从 0.5 到 2.0，默认 1.0。

`numberOfLoops` 属性代表循环次数，-1 代表无限循环。MP3 音频要实现无缝循环，需要特殊工具进行处理，通常建议使用 AAC。

音频计量。

本节的例子中我们创建了三个 `AVAudioPlayer` 的实例，分别播放吉他、贝斯、鼓的声音。为了使三个播放器实例的播放紧密同步，需要捕捉设备的时间并增加一个小的延时，让三个实例按照这个参照时间开始播放。

```objc
- (void)play {
    if (!self.playing) {
        NSTimeInterval delayTime = [self.players[0] deviceCurrentTime] + 0.01;
        for (AVAudioPlayer *player in self.players) {
            [player playAtTime:delayTime];
        }
        self.playing = YES;
    }
}
```

停止播放时，开发者可能还需要设置 `currentTime` 属性为 0.0f，以让播放进度回到原点。

```objc
- (void)stop {
    if (self.playing) {
        for (AVAudioPlayer *player in self.players) {
            [player stop];
            player.currentTime = 0.0f;
        }
        self.playing = NO;
    }
}
```

音频会话的中断在手机系统上很常见，例如电话呼入、闹钟响起、FaceTime 请求等情况。

```objc
// 处理中断事件，首先需要注册中断的通知
NSNotificationCenter *nsnc = [NSNotificationCenter defaultCenter];
[nsnc addObserver:self
                 selector:@selector(handleInterruption:)
                     name:AVAudioSessionInterruptionNotification
                   object:[AVAudioSession sharedInstance]];

- (void)handleInterruption:(NSNotification *)notification {
    NSDictionary *info = notification.userInfo;
    // 通知的字典里有附带中断的信息，通过合适的 key 取出来
    AVAudioSessionInterruptionType type = [info[AVAudioSessionInterruptionTypeKey] unsignedIntegerValue]; // 中断类型
    if (type == AVAudioSessionInterruptionTypeBegan) {
        // 实际上当接收到通知时，应用程序的音频会话已经被终止，player 实例处于暂停状态，调用 stop 方法只是做内部状态更新，并不能停止播放。
        [self stop];
        if (self.delegate) {
            [self.delegate playbackStopped];
        }
    } else {
        // 当中断结束后，字典会包含信息，表示音频会话是否已重新激活、是否可以再次播放
        AVAudioSessionInterruptionOptions options = [info[AVAudioSessionInterruptionOptionKey] unsignedIntegerValue];
        if (options == AVAudioSessionInterruptionOptionShouldResume) {
            [self play];
            if (self.delegate) {
                [self.delegate playbackBegan];
            }
        }
    }
}
```

在 iOS 设备上添加或移除音频输入、输出线路时，会发生线路改变事件。与中断事件一样，操作系统已经处理好了某些场景，但我们也需要确保我们对这些事件的处理是符合我们自身业务需要的。这里我们处理的是，当用户拔出耳机时，正在播放的内容希望保密或不打扰到周围，需要停止播放。

```objc
// 处理线路改变事件，首先需要注册通知
NSNotificationCenter *nsnc = [NSNotificationCenter defaultCenter];
[nsnc addObserver:self
                 selector:@selector(handleRouteChange:)
                     name:AVAudioSessionRouteChangeNotification
                   object:[AVAudioSession sharedInstance]];

- (void)handleRouteChange:(NSNotification *)notification {
    NSDictionary *info = notification.userInfo;
    AVAudioSessionRouteChangeReason reason =
    [info[AVAudioSessionRouteChangeReasonKey] unsignedIntValue];
    if (reason == AVAudioSessionRouteChangeReasonOldDeviceUnavailable) {
        AVAudioSessionRouteDescription *previousRoute =
        info[AVAudioSessionRouteChangePreviousRouteKey];
        AVAudioSessionPortDescription *previousOutput = previousRoute.outputs[0]; // 找输出接口数组的第一个设备
        NSString *portType = previousOutput.portType;
        if ([portType isEqualToString:AVAudioSessionPortHeadphones]) {
            [self stop];
            [self.delegate playbackStopped];
        }
    }
}
```

## 音频录制

想要录制音频，需要在 `Info.plist` 里面增加配置，首次访问麦克风会询问用户同意。

```xml
<key>NSMicrophoneUsageDescription</key>
<string>To record memo.</string>
```

创建 `AVAudioRecorder` 实例：

`AVFormatIDKey` 是写入内容的音频格式。`kAudioFormatLinearPCM` 是未压缩格式、`kAudioFormatMPEG4AAC` 是最常用的 AAC 格式。注意，指定的音频格式一定要和文件类型相兼容！

`AVSampleRateKey` 是采样率。开发者应该尽量使用标准采样率，比如 8000、16000、22050、44100（CD 音质采样率）。

`AVNumberOfChannelsKey` 是通道数。默认值 1 代表单声道录制；设置为 2 代表立体声录制。除非使用外接设备，否则通常选择单声道录音。

```objc
NSString *tmpDir = NSTemporaryDirectory();
NSString *filePath = [tmpDir stringByAppendingPathComponent:@"memo.caf"];
NSURL *fileURL = [NSURL fileURLWithPath:filePath];

NSDictionary *settings = @{
                            AVFormatIDKey : @(kAudioFormatAppleIMA4),
                            AVSampleRateKey : @44100.0f,
                            AVNumberOfChannelsKey : @1,
                            AVEncoderBitDepthHintKey : @16,
                            AVEncoderAudioQualityKey : @(AVAudioQualityMedium)
                            };

NSError *error;
self.recorder = [[AVAudioRecorder alloc] initWithURL:fileURL settings:settings error:&error];
if (self.recorder) {
    self.recorder.delegate = self;
    self.recorder.meteringEnabled = YES; // 允许对音量进行测量
    [self.recorder prepareToRecord];
} else {
    NSLog(@"Error: %@", [error localizedDescription]);
}
```

开始录制 `-[AVAudioRecorder record]`，暂停录制 `-[AVAudioRecorder pause]`，停止录制 `-[AVAudioRecorder stop]`。停止录制后，`AVAudioRecorder` 回调委托方法通知代理，我们在这个回调里处理录音文件的保存：

```objc
- (void)saveRecordingWithName:(NSString *)name completionHandler:(THRecordingSaveCompletionHandler)handler {
    NSTimeInterval timestamp = [NSDate timeIntervalSinceReferenceDate];
    NSString *filename = [NSString stringWithFormat:@"%@-%f.m4a", name, timestamp];
    NSString *docsDir = [self documentsDirectory];
    NSString *destPath = [docsDir stringByAppendingPathComponent:filename];

    NSURL *srcURL = self.recorder.url;
    NSURL *destURL = [NSURL fileURLWithPath:destPath];
    NSError *error;
    BOOL success = [[NSFileManager defaultManager] copyItemAtURL:srcURL toURL:destURL error:&error];
    if (success) {
        handler(YES, [THMemo memoWithTitle:name url:destURL]); // 回传数据模型
        [self.recorder prepareToRecord];
    } else {
        handler(NO, error);
    }
}

- (NSString *)documentsDirectory {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [paths objectAtIndex:0];
}
```

我们希望展示给用户录制的时间。属性 `currentTime` 经过一定的格式化处理可以用于展示：

```objc
- (NSString *)formattedCurrentTime {
    NSUInteger time = (NSUInteger)self.recorder.currentTime;
    NSInteger hours = (time / 3600);
    NSInteger minutes = (time / 60) % 60;
    NSInteger seconds = time % 60;
    NSString *format = @"%02i:%02i:%02i";
    return [NSString stringWithFormat:format, hours, minutes, seconds];
}
```

如何实时更新显示时间，你可能想用 KVO，但是在这里并不可以，因 `currentTime` 属性是不可见的。这里需要用 `NSTimer` 按照一定时间间隔轮询值并更新界面。

```objc
- (void)startTimer { // 开始录制时调用
    [self.timer invalidate];
    self.timer = [NSTimer timerWithTimeInterval:0.5 // 这里我们 0.5 秒轮询一次
                                         target:self
                                       selector:@selector(updateTimeDisplay)
                                       userInfo:nil
                                        repeats:YES];
    [[NSRunLoop mainRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
}

- (void)stopTimer { // 暂停、停止录制时调用
    [self.timer invalidate];
    self.timer = nil;
}
```

接下来我们希望能将捕捉到的信号以可视化的形式表现出来。`AVAudioRecorder` 和 `AVAudioPlayer` 都可以对音量进行测量。

通过 `averagePowerForChannel:` 和 `peakPowerForChannel:` 方法获得的读数，是一个描述音量等级的对数单位，取值范围从最大分贝的 0 (full scale）到最小分贝或静音的 -160dB。我们想在用户界面上展示音量大小，需要把这个值转化为 0 - 1 之间的值。例子中的 `THMeterTable` 完成了这部分工作。

```cpp
- (THLevelPair *)levels {
    [self.recorder updateMeters]; // 在读取当前等级值前调用此方法，以保证获取到的是最新的数据
    float avgPower = [self.recorder averagePowerForChannel:0]; // 单声道录制，获取通道 0 的音量
    float peakPower = [self.recorder peakPowerForChannel:0];
    float linearLevel = [self.meterTable valueForPower:avgPower]; // 将音量等级转换为 0 - 1 之间的值
    float linearPeak = [self.meterTable valueForPower:peakPower];
    return [THLevelPair levelsWithLevel:linearLevel peakLevel:linearPeak]; // 返回数据模型
}
```

同样用定时器轮询音量等级值，这里为了使音量值刷新的动画效果更加平滑，使用 `CADisplayLink` 以获得与屏幕刷新同步的回调：

```objc
- (void)startMeterTimer {
    [self.levelTimer invalidate];
    self.levelTimer = [CADisplayLink displayLinkWithTarget:self
                                                  selector:@selector(updateMeter)];
    self.levelTimer.frameInterval = 5;
    [self.levelTimer addToRunLoop:[NSRunLoop currentRunLoop]
                          forMode:NSRunLoopCommonModes];
}
```

# 资源和元数据

有别于传统面向文件的音频类，AVFoundation 把所有的代码设计围绕着“资源”进行，最核心的类就是 `AVAsset`！

`AVAsset` 是一个抽象类。第一，它提供了对基本媒体格式的抽象，开发者不需考虑不同的编码和容器格式细节，只需面对“资源”这一概念；第二，它屏蔽了资源位置的细节，不管资源是在应用程序 bundle、沙盒文件夹、用户音乐库或远程音频流，开发者都可以合理地获取和载入媒体。

`AVAsset` 本身不是媒体资源，它是 timed media 的容器。它由一个或多个带有（描述自身的）元数据的媒体组成，即 `AVAssetTrack`，最常见的形态就是音频和视频流，还有文本、副标题、隐藏字幕等类型。资源的曲目可以通过 `tracks` 属性访问，返回的是一个 `NSArray`，数组的元素是专辑的所有曲目。

获取一个资源的方式很直接：`AVAsset *asset = [AVAsset assetWithURL:url];`；如果创建一个用在音视频编辑场景中的资源，可以用更长的加载时间，来获取更精确的资源时长信息。

```objc
NSDictionary *options = @{AVURLAssetPreferPreciseDurationAndTimingKey: @YES};
AVURLAsset *asset = [[AVURLAsset alloc] initWithURL:url options:options];
```

## 媒体来源

### UIImagePickerController

无需授权，无需权限描述。

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
            let asset = AVURLAsset(url: url)
            print(asset.duration)
        }
        picker.dismiss(animated: true, completion: nil)
    }

    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {}
}
```

### NSURL

来自 App Bundle 或网络。

```objc
NSURL *url = [[NSBundle mainBundle] URLForResource:@"v0300fd00000btm8f4819jm9302jl26g" withExtension:@"MP4"];
AVAsset *asset = [[AVURLAsset alloc] initWithURL:url options:nil];

NSURL *remoteUrl = [NSURL URLWithString:@"....mp4"];
AVAsset *remoteAsset = [[AVURLAsset alloc] initWithURL:remoteUrl options:nil];
NSLog(@"%lld", remoteAsset.duration.value);
```

### PhotoKit

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

### Media Library

```objc
MPMediaPropertyPredicate *artistPredicate = [MPMediaPropertyPredicate predicateWithValue:@"Foo Fighters" forProperty:MPMediaItemPropertyArtist];
MPMediaPropertyPredicate *albumPredicate = [MPMediaPropertyPredicate predicateWithValue:@"In Your Honor" forProperty:MPMediaItemPropertyAlbumTitle];
MPMediaPropertyPredicate *songPredicate = [MPMediaPropertyPredicate predicateWithValue:@"Best of You" forProperty:MPMediaItemPropertyTitle];

MPMediaQuery *query = [[MPMediaQuery alloc]init];
[query addFilterPredicate:artistPredicate];
[query addFilterPredicate:albumPredicate];
[query addFilterPredicate:songPredicate];

NSArray *result = [query items];
if (result.count > 0) {
    MPMediaItem *item = result[0];
    NSURL *assetURL = [item valueForProperty:MPMediaItemPropertyAssetURL];
    AVAsset *asset = [AVAsset assetWithURL:assetURL];
    // do sth ...
}
```

## 异步载入资源属性

当创建 `AVAsset` 时，资源就是对媒体文件的处理。`AVAsset` 采用一种高效的设计，即延迟载入资源的属性，直到属性被请求时才载入，这样可以快速创建资源模型。但有一点，就是同步访问属性时，如果属性没有载入，程序就会阻塞。比如，请求资源的 `duration` 可能是一个昂贵的操作，例如 MP3 文件的头没有 TLEN 标签时，则需要解析整个音频来确定它的时长，假设这个请求发生在主线程，就会阻塞主线程直到操作完成。

正因为上述原因，`AVAsset` 和 `AVAssetTrack` 都遵循 `AVAsynchronousKeyValueLoading` 协议，可以异步查询资源的属性。

```objc
self.metadata = [[THMetadata alloc] init];
NSArray *keys = @[COMMON_META_KEY, AVAILABLE_META_KEY]; // key 的名称和 AVAsset 的属性名称一样
[self.asset loadValuesAsynchronouslyForKeys:keys completionHandler:^{
    // 即使请求了多个属性，这个 block 也只会被回调一次
    // 需要为每个请求的属性都调用 statusOfValueForKey:error: 方法，不能假设所有的属性都返回相同的状态值
    AVKeyValueStatus commonStatus =
        [self.asset statusOfValueForKey:COMMON_META_KEY error:nil];
    AVKeyValueStatus formatsStatus =
        [self.asset statusOfValueForKey:AVAILABLE_META_KEY error:nil];
    self.prepared = (commonStatus == AVKeyValueStatusLoaded) &&
                    (formatsStatus == AVKeyValueStatusLoaded);
    if (self.prepared) {
        for (AVMetadataItem *item in self.asset.commonMetadata) { // 访问已载入的属性不会耗时
            NSLog(@"%@: %@", item.keyString, item.value);
            [self.metadata addMetadataItem:item withKey:item.commonKey];
        }
        for (id format in self.asset.availableMetadataFormats) {
            if ([self.acceptedFormats containsObject:format]) {
                NSArray *items = [self.asset metadataForFormat:format];
                for (AVMetadataItem *item in items) {
                    NSLog(@"%@: %@", item.keyString, item.value);
                    [self.metadata addMetadataItem:item
                                            withKey:item.keyString];
                }
            }
        }
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        completionHandler(self.prepared);
    });
}];
```

## 媒体元数据

Apple 环境下的媒体类型主要有：QuickTime (mov), MPEG-4 video (mp4, m4v), MPEG-4 audio (m4a), MPEG-Layer III audio (mp3)。m4v 是带有苹果针对 FairPlay 加密及 AC3-audio 扩展的 mp4 格式；m4a 专门针对音频。

QuickTime 文件由一种称为 atom 的数据结构组成；MP4 直接派生自 QuickTime，数据结构相似。

MP3 与上面两种格式则有显著区别，它不使用容器格式，使用编码音频数据，文件开头有可选元数据，使用一种称为 ID3v2 的格式来保存描述信息。AVFoundation 支持读取 ID3v2 标签，但不支持写入，原因是 MP3 格式有专利限制。

对这些不同格式，AVFoundation 提供了统一的元数据接口 `AVMetadataItem`。大部分情况下我们使用 `AVAsset` 提供的元数据；少部分情况会使用到 `AVAssetTrack` 提供的元数据。

每个资源至少包含两个 `AVMetadataKeySpace`（键空间），用于将一组相关的键组合在一起。Common 键空间是所有资源格式都有的；其它键空间是特定的资源格式才有的。

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

除了通过键和键空间来获取元数据外，iOS 8 之后新增了 `keyForIdentifier:` 方法，identifier 将键和键空间统一成单独的字符串，以更简单的方式获取元数据。

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

## 快速播放

```objc
- (void)viewDidLoad {
    [super viewDidLoad];

    NSURL *assetURL = [[NSBundle mainBundle] URLForResource:@"hubblecast" withExtension:@"m4v"];
    AVAsset *asset = [AVAsset assetWithURL:assetURL];
    AVPlayerItem *playerItem = [AVPlayerItem playerItemWithAsset:asset]; // 1
    [playerItem addObserver:self
                 forKeyPath:@"status"
                    options:0
                    context:&PlayerItemStatusContext];
    self.player = [AVPlayer playerWithPlayerItem:playerItem]; // 2

    AVPlayerLayer *playerLayer = [AVPlayerLayer playerLayerWithPlayer:self.player];
    playerLayer.frame = self.view.bounds;
    [self.view.layer addSublayer:playerLayer];
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
    if (context == &PlayerItemStatusContext) {
        AVPlayerItem *playerItem = (AVPlayerItem *)object;
        [playerItem removeObserver:self forKeyPath:@"status"]; // 收到通知后，移除观察者！
        if (playerItem.status == AVPlayerStatusReadyToPlay) {
            [self.player play];
        }
    }
}
```

[1] `AVAsset`, `AVAssetTrack` 是媒体资源的静态信息，播放资源时，要通过 `AVPlayerItem`, `AVPlayerItemTrack` 构建相应的动态内容。

[2] 将 `AVPlayerItem` 与 `AVPlayer` 关联会将媒体放入队列，但在具体内容可以播放前，需要等待对象的状态改变为 `AVPlayerStatusReadyToPlay`，可以通过 KVO 来观察这一过程，以得知播放就绪的时机。

## CMTime

在计算机程序中，用浮点型表示时长会存在丢失精度的问题，AVFoundation 使用 `CMTime` 这个数据结构来保存时长信息。`CMTime` 中的 `value` 和 `timescale` 分别作为分子和分母，表示一个时间间隔。

Conceptually, the timescale specifies the fraction of a second each unit in the numerator occupies. Thus if the timescale is 4, each unit represents a quarter of a second.

`CMTime oneSample = CMTimeMake(1, 44100); // One sample from a 44.1 kHz audio file`

获取以秒为单位的时长：`CMTimeGetSeconds(duration);`

## 例子：视频播放器

`THPlayerView` 是显示视频内容、为用户提供操作的 view。

```objc
@implementation THPlayerView
+ (Class)layerClass {
    return [AVPlayerLayer class]; // 1
}

- (id)initWithPlayer:(AVPlayer *)player {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        self.backgroundColor = [UIColor blackColor];
        self.autoresizingMask = UIViewAutoresizingFlexibleHeight |
                                UIViewAutoresizingFlexibleWidth;
        [(AVPlayerLayer *) [self layer] setPlayer:player];
        [[NSBundle mainBundle] loadNibNamed:@"THOverlayView"
                                      owner:self
                                    options:nil];
        [self addSubview:_overlayView];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.overlayView.frame = self.bounds;
}

- (id <THTransport>)transport {
    return self.overlayView;
}
@end
```

[1] 指定以 `AVPlayerLayer` 作为 `THPlayerView` 的支持层。

`THPlayerController` 是这个例子核心的播放控制器。它为（类的）用户提供的接口相当简单：

```objc
@interface THPlayerController : NSObject
- (id)initWithURL:(NSURL *)assetURL; // 1
@property (strong, nonatomic, readonly) UIView *view; // 2
@end
```

[1] 用户可传入本地或远程 URL 初始化播放控制器。

[2] 为播放器视图提供了一个只读属性，用户可读取它、添加到业务视图中。这个视图是一个 `THPlayerView`，但这个细节并不需要对用户可见，所以只返回一个通用的 `UIView` 即可。

`THPlayerController` 与提供用户控制的视图 `THOverlayView` 之间会有很多交互，不过它们不需要直接了解彼此的细节，要断开这个关联，就会用到 `THTransport` 和 `THTransportDelegate` 协议（面向协议编程的思想）。

也就是说，`THPlayerController` 不直接与 `THOverlayView` 通信（操作它的属性或调用它的实例方法），而是通过 `THTransport` 协议里的接口！

通过资源 URL 初始化控制器后，为了播放资源，要做一些准备工作：

```objc
- (void)prepareToPlay {
    NSArray *keys = @[
        @"tracks",
        @"duration",
        @"commonMetadata",
        @"availableMediaCharacteristicsWithMediaSelectionOptions"
    ];
    self.playerItem = [AVPlayerItem playerItemWithAsset:self.asset          // 2
                           automaticallyLoadedAssetKeys:keys];
    [self.playerItem addObserver:self                                       // 3
                      forKeyPath:@"status"
                         options:0
                         context:&PlayerItemStatusContext];
    self.player = [AVPlayer playerWithPlayerItem:self.playerItem];          // 4

    self.playerView = [[THPlayerView alloc] initWithPlayer:self.player];    // 5
    self.transport = self.playerView.transport;
    self.transport.delegate = self;
}
```

[2] 为了载入资源的属性，之前我们使用的是 `loadValuesAsynchronously(forKeys:completionHandler:)` 方法。但 iOS 7+ 提供了这个更简易的初始化方法，通过传入属性的数组，让框架自动载入。

[3, 4] 同上，添加观察者，以得知播放就绪的时机。

```objc
- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context {
    if (context == &PlayerItemStatusContext) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.playerItem removeObserver:self forKeyPath:@"status"];
            if (self.playerItem.status == AVPlayerItemStatusReadyToPlay) {
                // Set up time observers.
                [self addPlayerItemTimeObserver];
                [self addItemEndObserverForPlayerItem];

                CMTime duration = self.playerItem.duration;
                [self.transport setCurrentTime:CMTimeGetSeconds(kCMTimeZero)
                                      duration:CMTimeGetSeconds(duration)];

                [self.transport setTitle:self.asset.title]; // (extension) 到 common keyspace 中获取 title

                [self.player play];

                [self loadMediaOptions];
                [self generateThumbnails];
            } else {
                [UIAlertView showAlertWithTitle:@"Error"
                                        message:@"Failed to load video"];
            }
        });
    }
}
```

KVO 可以用来监听很多属性的变化，但也有不能胜任的场景，例如 `AVPlayer` 的时间变化——具有明显的动态特性、并且需要非常高的精确度。为了满足这一要求，`AVPlayer` 提供了两种基于时间的监听方法，分别是：

- `addPeriodicTimeObserverForInterval:queue:usingBlock:`，以一定时间间隔获得通知。
- `addBoundaryTimeObserverForTimes:queue:usingBlock:`，以数组形式传入一组时间戳，在每个时间戳到达时获得通知，

```objc
- (void)addPlayerItemTimeObserver {
    CMTime interval =
        CMTimeMakeWithSeconds(REFRESH_INTERVAL, NSEC_PER_SEC); // REFRESH_INTERVAL == 0.5
    dispatch_queue_t queue = dispatch_get_main_queue();
    __weak THPlayerController *weakSelf = self;
    void (^callback)(CMTime time) = ^(CMTime time) {
        NSTimeInterval currentTime = CMTimeGetSeconds(time);
        NSTimeInterval duration = CMTimeGetSeconds(weakSelf.playerItem.duration);
        [weakSelf.transport setCurrentTime:currentTime duration:duration];
    };
    self.timeObserver =
        [self.player addPeriodicTimeObserverForInterval:interval
                                                  queue:queue
                                             usingBlock:callback];
}
```

当资源播放完毕时，`AVPlayerItem` 会发出通知，控制器应采取相应的动作。

```objc
- (void)addItemEndObserverForPlayerItem {
    NSString *name = AVPlayerItemDidPlayToEndTimeNotification;
    NSOperationQueue *queue = [NSOperationQueue mainQueue];
    __weak THPlayerController *weakSelf = self;
    void (^callback)(NSNotification *note) = ^(NSNotification *notification) {
        [weakSelf.player seekToTime:kCMTimeZero
                  completionHandler:^(BOOL finished) {
            [weakSelf.transport playbackComplete];
        }];
    };
    self.itemEndObserver =
        [[NSNotificationCenter defaultCenter] addObserverForName:name
                                                          object:self.playerItem
                                                           queue:queue
                                                      usingBlock:callback];
}
```

与进度条拖拽有关的方法：

```objc
- (void)scrubbingDidStart {
    self.lastPlaybackRate = self.player.rate;
    [self.player pause];
    [self.player removeTimeObserver:self.timeObserver]; // 用户拖拽进度条时停用定时器
    self.timeObserver = nil;
}

- (void)scrubbedToTime:(NSTimeInterval)time {
    [self.playerItem cancelPendingSeeks]; // 取消之前的 seek 操作
    [self.player seekToTime:CMTimeMakeWithSeconds(time, NSEC_PER_SEC) toleranceBefore:kCMTimeZero toleranceAfter:kCMTimeZero];
}

- (void)scrubbingDidEnd {
    [self addPlayerItemTimeObserver];
    if (self.lastPlaybackRate > 0.0f) {
        [self.player play];
    }
}
```

## 创建视频缩略图

`AVAssetImageGenerator` 可从 `AVAsset` 中生成缩略图，可以从本地或是正在下载中的资源生成，但不能从 HTTP Live Stream 中生成。

```objc
- (void)generateThumbnails {
    self.imageGenerator = [AVAssetImageGenerator assetImageGeneratorWithAsset:self.asset]; // 1 
    
    // 设置缩略图的像素宽为 200，高度自适应
    self.imageGenerator.maximumSize = CGSizeMake(200.0f, 0.0f);
    
    CMTime duration = self.asset.duration;
    NSMutableArray *times = [NSMutableArray array];
    CMTimeValue increment = duration.value / 20; // 将视频时长等分为 20 个间隔
    CMTimeValue currentValue = 2.0 * duration.timescale; // 2
    while (currentValue <= duration.value) {
        CMTime time = CMTimeMake(currentValue, duration.timescale);
        [times addObject:[NSValue valueWithCMTime:time]];
        currentValue += increment;
    }
    
    __block NSUInteger imageCount = times.count;
    NSMutableArray *images = [NSMutableArray array];
    
    AVAssetImageGeneratorCompletionHandler handler;
    handler = ^(CMTime requestedTime, // 我们要求的缩略图的时间
                CGImageRef imageRef,
                CMTime actualTime, // 实际生成的缩略图的时间
                AVAssetImageGeneratorResult result,
                NSError *error) {
        if (result == AVAssetImageGeneratorSucceeded) {
            UIImage *image = [UIImage imageWithCGImage:imageRef];
            id thumbnail = [THThumbnail thumbnailWithImage:image time:actualTime];
            [images addObject:thumbnail]; // 数据模型
        } else {
            NSLog(@"Error: %@", [error localizedDescription]);
        }
        
        if (--imageCount == 0) {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSString *name = THThumbnailsGeneratedNotification;
                NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
                [nc postNotificationName:name object:images]; // 将装有数据模型的数组通过通知对象发送出去
            });
        }
    };
    
    [self.imageGenerator generateCGImagesAsynchronouslyForTimes:times
                                              completionHandler:handler];
}
```

[1] 这里有必要保持强引用，否则将无法回调。

[2] 这里为什么不用 0 呢？因为对于视频来说，时间戳 0 通常是一帧全黑的画面，因此这里取时间戳为第 2 秒的画面。

## 显示字幕
