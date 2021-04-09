---
title: "音视频直播开发"
categories: [Apple]
---

<!-- prettier-ignore -->
* Do not remove this line (it will not be displayed)
{:toc}

# 综述

音视频直播开发中用到的框架：

- 采集音视频数据：AVFoundation
- 视频帧处理：
  - GPUImage：基于 OpenGL ES/Metal 封装的高级框架，可作为小团队、没有专门视觉同学的团队的选择。
  - OpenGL ES：跨平台使得成为目前绝大多数商用项目的首选
  - Metal
- 视频编码
  - VideoToolBox（利用 GPU 编码，又称硬件编码，首选）
  - FFmpeg（大量选项、指令，可作为进阶选择）

网络层：ST/Socket 负责传输

协议层：RTMP/HLS 负责网络打包

封装层：FLV/TS 负责编解码数据的封装

不同的码流（360P、720P、1080P 等）如何无缝切换：主流的方案是两个播放器，切换时，旧播放器保持播放，新播放器缓冲并解码完成后，在旧播放器即将播放下一个 I 帧时，切换的新播放器对应位置的 I 帧上，实现无缝连接。
