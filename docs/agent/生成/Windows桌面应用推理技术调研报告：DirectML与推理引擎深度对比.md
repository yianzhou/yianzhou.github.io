# Windows 桌面应用推理技术调研报告：DirectML 与推理引擎深度对比

## 1. DirectML 技术详解

### 1.1 定义与技术原理

DirectML (Direct Machine Learning) 是由微软开发的低级别、硬件无关的机器学习推理 API。它作为 DirectX 家族的成员，旨在为所有兼容 DirectX 12 的硬件提供高性能的加速能力 [1]。其核心原理是将机器学习算子（如 Convolution, ReLU, GEMM）抽象为硬件加速的基元，通过 Direct3D 12 的计算队列进行调度。开发者可以采用“逐层执行”模式以获得最大控制权，或使用“基于图”的工作流实现自动优化 [1][8]。

### 1.2 与 DirectX 及 Direct3D 的关系

DirectML 紧密集成于 DirectX 12 生态系统中。它使用与 Direct3D 12 相同的原生 C++ nano-COM 接口和资源管理模型。机器学习的工作负载被记录到 Direct3D 12 命令列表中，并与图形渲染任务共享 GPU 队列。张量（Tensors）在底层被表示为标准的 Direct3D 12 缓冲区或纹理资源，这使得 AI 推理可以无缝嵌入到游戏引擎或实时渲染管线中 [1][8]。

### 1.3 硬件支持列表

DirectML 最大的优势在于其极广的兼容性，支持所有符合 DirectX 12 标准的硬件：

- **NVIDIA**: Kepler 架构（GTX 600 系列）及以上所有 GPU [2][3]。
- **AMD**: GCN 1st Gen（Radeon HD 7000 系列）及以上所有 GPU [2][4]。
- **Intel**: Haswell（第 4 代酷睿）集成显卡及以上，以及 Arc 系列独立显卡 [2][13]。
- **Qualcomm**: Adreno 600 系列及以上 GPU，并原生支持 Snapdragon X Elite 中的 Hexagon NPU [2][13]。
- **NPU 支持**: 随着 Windows 11 24H2 的发布，DirectML 已扩展支持 Intel Core Ultra 和 AMD Ryzen AI 系列芯片中的专用 NPU [10][13]。

### 1.4 Windows 系统要求与检测方法

- **系统要求**: 最低支持 Windows 10 版本 1903（内部版本 16299），推荐 Windows 11 以获得最佳 NPU 支持 [6][9]。
- **命令行检测**: 运行`dxdiag`查看“显示”选项卡，确认 Direct3D 功能级别是否包含 12_0 或更高。
- **代码检测示例 (C#)**:

```csharp
// 使用ONNX Runtime的DirectML扩展进行检测
using Microsoft.ML.OnnxRuntime;
SessionOptions options = new SessionOptions();
try {
    options.AppendExecutionProvider_DML(0); // 尝试附加默认DirectML设备
    Console.WriteLine("DirectML is supported.");
} catch (Exception) {
    Console.WriteLine("DirectML not supported or driver missing.");
}
```

### 1.5 实际应用场景

DirectML 广泛应用于 Windows 生态中的 AI 任务，包括：

- **超分辨率与图像增强**: 如游戏中的 DLSS 替代方案或照片修复。
- **实时视频处理**: 背景虚化、降噪及自动取景。
- **本地 LLM 推理**: 作为 ONNX Runtime 的后端，在非 NVIDIA 硬件上运行大语言模型 [8][15]。

## 2. llama.cpp vs ONNX Runtime 深度对比

### 2.1 性能数据对比

在 Windows 桌面场景下，两者的性能表现受硬件架构影响显著。以下为基于 Llama-2-7B (Q4_0) 的典型推理速度（Tokens/sec）：

| 硬件平台           | llama.cpp (Vulkan/CUDA) | ONNX Runtime (DirectML) | 备注                              |
| :----------------- | :---------------------- | :---------------------- | :-------------------------------- |
| NVIDIA RTX 4090    | 187.97 t/s (CUDA)       | ~140 t/s (DML)          | llama.cpp 在 NVIDIA 上更优 [20]   |
| AMD RX 7900 XTX    | 191.28 t/s (Vulkan)     | ~130 t/s (DML)          | Vulkan 后端在 AMD 上表现强劲 [20] |
| Intel Arc B580     | ~45 t/s (Vulkan)        | ~35 t/s (DML)           | 驱动优化对 DML 影响较大 [21]      |
| 纯 CPU (i5-13600K) | 5.37 t/s (12 线程)      | ~3.2 t/s                | llama.cpp 的 CPU 优化更深 [24]    |

### 2.2 模型兼容性与 Qwen 支持

- **llama.cpp**: 核心格式为 GGUF。对 Qwen 系列（Qwen2.5, Qwen3）支持极佳，提供专门的转换脚本`convert-hf-to-gguf.py`，支持复杂的 SwiGLU 和 Rotary Embedding [16][17]。
- **ONNX Runtime**: 使用 ONNX 格式。虽然支持 Qwen，但早期版本在处理动态 KV 缓存时性能较差。目前通过`onnxruntime-genai`扩展已大幅改善对 Qwen2.5/3-VL 的支持 [16][29]。

### 2.3 部署复杂度与分发体积

- **llama.cpp**: 极简部署。Windows 预编译包通常仅包含几个.exe 文件（如`llama-cli.exe`），体积约 20-50MB，无外部依赖 [17][20]。
- **ONNX Runtime**: 较复杂。需集成多个 DLL（如`onnxruntime.dll`, `DirectML.dll`），NuGet 包体积通常在 100MB 以上，且对 VC++ Runtime 有严格要求 [30][31]。

### 2.4 API 易用性对比

- **llama.cpp (C++)**:

```cpp
auto model = llama_load_model_from_file("qwen.gguf", params);
auto ctx = llama_new_context_with_model(model, ctx_params);
```

- **ONNX Runtime GenAI (Python)**:

```python
import onnxruntime_genai as og
model = og.Model('path/to/qwen_onnx')
tokenizer = og.Tokenizer(model)
```

### 2.5 内存管理机制

- **llama.cpp**: 默认使用`mmap`（内存映射），支持延迟加载，允许模型大小超过物理 RAM（利用虚拟内存），并支持精确的显存层级抵消（`--gpu-layers`） [24][28]。
- **ONNX Runtime**: 倾向于预分配显存。虽然也支持内存优化，但在显存溢出时处理不如 llama.cpp 灵活，容易导致系统卡顿 [24][30]。

### 2.6 社区与原生支持

- **活跃度**: llama.cpp 在 GitHub 拥有 97k+ Stars，更新频率极高（每日多次提交），对新模型（如 Gemma-3）的响应通常在 24 小时内 [18][19]。ONNX Runtime 由微软维护，更新周期较长但企业级稳定性更高。
- **Windows 支持**: 两者均提供成熟的 Windows 预编译二进制文件。llama.cpp 的编译难度较低，支持简单的 CMake 构建 [17][20]。

## 3. 总结与场景推荐

针对 50% NVIDIA + 50% 其他显卡的 Windows 桌面应用场景，建议方案如下：

### 3.1 推荐集成策略

1.  **首选引擎**: **llama.cpp**。
    - **理由**: 极小的分发体积（50MB-）和极高的硬件覆盖率。通过其 Vulkan 后端，可以一套代码同时覆盖 NVIDIA、AMD 和 Intel 显卡，且性能损失较小 [20][26]。
    - **针对 Qwen 优化**: llama.cpp 对 Qwen 的 GGUF 格式支持最成熟，量化损失小。
2.  **备选/特定场景**: **ONNX Runtime (DirectML)**。
    - **理由**: 当应用已深度集成微软 Windows ML 框架，或需要利用最新 Copilot+ PC 的 NPU 加速时使用 [10][13]。

### 3.2 综合对比表

| 特性          | llama.cpp                  | ONNX Runtime (DirectML)      |
| :------------ | :------------------------- | :--------------------------- |
| **核心优势**  | 极致轻量、CPU/GPU 混合推理 | 微软官方支持、跨 AI 任务通用 |
| **硬件覆盖**  | 全能（CUDA/Vulkan/Metal）  | 全能（DX12 兼容硬件）        |
| **分发体积**  | 极小 (~30MB)               | 较大 (>100MB)                |
| **Qwen 支持** | 原生完美支持               | 需通过 GenAI 扩展支持        |
| **内存管理**  | 灵活的 mmap 与层级控制     | 预分配为主                   |

## 参考文献

[1] Microsoft Learn, 2026-01-08. DirectML 简介. https://learn.microsoft.com/zh-cn/windows/ai/directml/dml

[2] GitHub, microsoft/DirectML. https://github.com/microsoft/DirectML

[3] NVIDIA Developer, 2023-04-25. ONNX and DirectML for NVIDIA-based PCs. https://developer.nvidia.cn/blog/end-to-end-ai-for-nvidia-based-pcs-onnx-and-directml

[4] ONNX Runtime Documentation. DirectML Execution Provider. https://onnxruntime.ai/docs/execution-providers/DirectML-ExecutionProvider.html

[6] Microsoft Learn, 2025-06-10. 在 Windows 上通过 DirectML 启用 PyTorch. https://learn.microsoft.com/zh-cn/windows/ai/directml/pytorch-windows

[8] IT 之家, 2023-12-18. 微软为 DirectML 添加 NPU 支持. https://it.ithome.com/archiver/740/014.htm

[10] Windows Blogs, 2024-08-29. DirectML expands NPU support to Copilot+ PCs. https://blogs.windows.com/windowsdeveloper/2024/08/29/directml-expands-npu-support-to-copilot-pcs-and-webnn

[13] Techzine, 2024-08-30. Microsoft adds native DirectML for Copilot+ PCs. https://techzine.eu/news/devops/123916/microsoft-adds-critical-feature-native-directml-for-copilot-pcs

[16] 火山引擎, 2025-09-01. 基于 llama.cpp 在 CPU 环境部署 Qwen3. https://adg.csdn.net/6952436e5b9f5f31781b47f1.html

[17] Qwen Documentation. llama.cpp - Qwen. https://qwen.readthedocs.io/zh-cn/latest/run_locally/llama.cpp.html

[18] GitHub, ggml-org/llama.cpp. https://github.com/ggml-org/llama.cpp

[20] GitHub Discussions, 2024-12-17. Performance of llama.cpp with Vulkan #10879. https://github.com/ggml-org/llama.cpp/discussions/10879

[21] OpenBenchmarking, 2025-12-03. Llama.cpp Vulkan December 2025 GPU Comparison. https://openbenchmarking.org/result/2512070-NE-LLAMACPPV90

[24] Dev.to, 2024-08-22. llama.cpp: CPU vs GPU, shared VRAM and Inference Speed. https://dev.to/maximsaplin/llamacpp-cpu-vs-gpu-shared-vram-and-inference-speed-3jpl

[28] LinkedIn, 2024-12-02. Understanding llama.cpp — Efficient Model Loading. https://linkedin.com/pulse/understanding-llamacpp-efficient-model-loading-divya-mehta-y3nre

[29] GitHub, microsoft/onnxruntime-genai. https://github.com/microsoft/onnxruntime-genai

[30] NuGet Gallery. Microsoft.ML.OnnxRuntime.DirectML. https://nuget.org/packages/Microsoft.ML.OnnxRuntime.DirectML

[31] ONNX Runtime Documentation. Install ONNX Runtime. https://onnxruntime.ai/docs/install
