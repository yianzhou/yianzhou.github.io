# 直播

## 综述

音视频直播开发中用到的框架：

- 采集音视频数据：AVFoundation
- 视频帧处理：
  - GPUImage：基于 OpenGL ES/Metal 封装的高级框架，可作为小团队、没有专门视觉同学的团队的选择。
  - OpenGL ES：跨平台使得成为目前绝大多数商用项目的首选
  - Metal
- 视频编码
  - VideoToolBox（利用 GPU 编码，又称硬件编码，首选）
  - FFmpeg（大量选项、指令，可作为进阶选择）
- 音频编码
  - AudioToolBox
  - FFmpeg

网络层：ST/Socket 负责传输

协议层：RTMP/HLS 负责网络打包

封装层：FLV/TS 负责编解码数据的封装

不同的码流（360P、720P、1080P 等）如何无缝切换：主流的方案是两个播放器，切换时，旧播放器保持播放，新播放器缓冲并解码完成后，在旧播放器即将播放下一个 I 帧时，切换的新播放器对应位置的 I 帧上，实现无缝连接。

## FFmpeg

The [FFmpeg project](https://ffmpeg.org/about.html) tries to provide the best technically possible solution for developers of applications and end users alike. 为终端用户和开发人员，提供相同程度的，最佳的技术方案。（也就是说，这个项目既有提供给开发者的 API 框架，也有提供给用户的终端工具）

FFmpeg Tools (for end users):

- ffmpeg: 格式转换
- ffplay: 媒体播放
- ffprobe: 流媒体分析器

FFmpeg Libraries for developers:

- libavutil 工具类
- libavcodec 编解码
- libavformat 格式转换
- libavdevice 输入/输出设备
- libavfilter 滤镜
- libswscale 图像处理
- libswresample 音频处理

## 使用 Metal 渲染视频并播放

平时我们用到的播放框架：

- AVPlayer
- [ijkplayer](https://github.com/bilibili/ijkplayer), Video player based on ffplay.（跨平台，iOS 使用 Video Toolbox 硬件解码，渲染使用 Open GL ES。）
- [kxmovie](https://github.com/kolyvan/kxmovie), A movie player for iOS based on FFmpeg.

使用 GPU 能力的接口会提到“硬件加速”，这部分工作是由 GPU 而不是 CPU 完成的，比如 AVFoundation 中的人脸识别、编解码中的“硬解码”。

[Video Toolbox](https://developer.apple.com/documentation/videotoolbox), Work directly with hardware-accelerated video encoding and decoding capabilities.

凡是涉及到美颜、滤镜等功能，均要用到 OpenGL ES/Metal。Shading Language 是视觉团队写的，我们做的更多是对接的工作，需要了解原理。

GPUImage 提供了 OpenGL ES 和 Metal 的封装，让 iOS 开发者更方便地使用。

## FFPlay 同步策略

视频文件 mp4 = 图像文件 h264 + 音频文件 aac（目前最主流的格式）。

图像经过解码、渲染、并显示，音频经过解压，播放，那么它们之间如何同步呢？

有三种方法：音频时钟作为主时钟；视频时钟作为主时钟；外部时钟作为主时钟。

```c
// https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffplay.c
enum {
    AV_SYNC_AUDIO_MASTER, /* default choice */
    AV_SYNC_VIDEO_MASTER,
    AV_SYNC_EXTERNAL_CLOCK, /* synchronize to an external clock */
};
```

音视频同步的模式，业界普遍使用的（ffplay 的默认策略）：音频时钟作为主时钟。主要原因是人眼对帧率不敏感。如果视频超前，则暂停以等待音频；如果视频落后，则丢弃掉一些帧追赶音频（丢弃 P 帧或 B 帧，不能丢弃 I 帧）。人眼很难察觉。
