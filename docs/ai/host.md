# 终端计算

## 算力

常见英文数字单位：

- Thousand (千): 1,000 (10³)
- Million (百万): 1,000,000 (10⁶)
- Billion (十亿): 1,000,000,000 (10⁹)
- Trillion (万亿/兆): 1,000,000,000,000 (10¹²)
- Quadrillion (千万亿): 10¹⁵

FLOPS（每秒浮点运算次数）是用来衡量计算机的浮点运算性能：

- MFLOPS (Mega Floating-point Operations Per Second), 1 MFLOPS=10^6 次/秒（百万次）
- GFLOPS (Giga Floating-point Operations Per Second), 1 GFLOPS=10^9 次/秒（十亿次）
- TFLOPS (Tera Floating-point Operations Per Second), 1 TFLOPS=10^12 次/秒（万亿次）
- PFLOPS (Peta Floating-point Operations Per Second), 1 TFLOPS=10^15 次/秒（千万亿次）

TOPS (Tera Operations Per Second) 即每秒万亿次操作。TOPS 用于表示一个处理器在执行计算任务时的性能。更高的 TOPS 值意味着该处理器能够在单位时间内执行更多的操作，从而提高模型的推理速度和训练效率。

## 优势

为什么要在终端部署 AI 呢？主要是：延迟（无网络延迟、离线可用）、成本（节约带宽、云服务成本）、隐私（数据不上云，完全私有），三方面的优势。

各家产品：微软 Copilot + PCs、Google Gemini Nano、Apple Intelligence

在 AI 领域的应用中，深度神经网络（Deep Neural Network，DNN）起着举足轻重的作用。对于诸如语音识别、人脸识别、图像分类、物体检测、姿态估计、图像分割之类的任务，DNN 的特征提取能力可以催化出高效、优质的解决方案。不同结构的 DNN 可以用来完成不同的 AI 任务。在具体业务的部署中，推理引擎按照 DNN 网络模型结构的描述，做解释执行。一个优质的推理引擎，可以为各种算法模型的落地提供有力的支撑。

DNN 是由多个作用在张量（Tensor）上的算子（Operator，Op）节点连接而成的计算图。算子除了经典的 Conv/Pooling/Activation/Binary/RNN 等，还可能是研究员使用 Python 等脚本语言自己定义的算子计算过程。这些不同的算子，可能具有不同的参数、输入输出尺寸，甚至这一切都是运行时动态的。

当需要在不同平台落地同一个算法模型的时候，开发者往往使用各自平台的商业推理引擎，或者涵盖此平台的开源引擎开发，并进行一遍评测流程，这种做法导致开发、落地效率非常低下。

终端计算方案：微信 XNet-DNN、阿里 MNN、llama.cpp

> MNN（Mobile Neural Network）

> LLVM 的全称是 Low Level Virtual Machine（低级虚拟机）。今天，“LLVM”这个词已经不再被视为一个缩写，而就是一个专有项目名称。官方早已不再强调“Low Level Virtual Machine”这个全称。今天，当你现在提到“LLVM”，业界默认你指的是整个编译器基础设施项目，包括其 IR、前端、优化器、后端、调试器、链接器等一整套工具。

## 公司

ARM 控股公司（现为软银集团旗下，已启动独立上市进程）是一家半导体和软件设计公司。不制造和销售芯片。它的主要业务是设计 CPU（及其他 IP 核）的架构蓝图，然后将这些设计授权给其他公司（如苹果、高通、三星、华为等）使用，收取授权费和版税。

AMD（超威半导体公司）是一家集设计、制造（通过代工厂）、销售于一体的半导体公司。主要使用 x86 架构。x86 架构是复杂指令集，由英特尔主导，AMD 拥有 x86 架构的交叉授权。这也是与 ARM 架构最根本的技术区别。

## GPU 编程接口

老登：

- OpenGL: 历史悠久，接口较高级，隐藏了很多硬件细节，易于上手。但状态机设计、全局上下文导致效率和多线程支持不佳，被视为“传统 API”。被 Vulkan、Metal、DX12 等现代 API 取代。

专用于并行计算：

- CUDA: NVIDIA 推出的通用并行计算平台和编程模型。扩展了 C++，允许在 GPU 上写“类 C++”的函数，库最丰富，工具链最完善，文档最多，是科学计算、AI 训练、高性能计算的事实标准。
- OpenCL: 苹果最早推出 OpenCL，并提交给 KHR 开放标准组织，期望统一并行计算语言，但最终厂商各自为战。除了 Intel、高通、ARM 之外，其他厂商都放弃了对 OpenCL 的支持。
- ROCm: CUDA 是 NVIDIA 的专有方案，ROCm 是 AMD 的开源方案。它们是直接竞争的关系。都是完整的 GPU 计算平台，包括驱动、编译器、运行时、库等。

既可以做实时图形渲染、又可以做通用并行计算：

- Vulkan: OpenGL 的现代继承者，跨平台、底层、高性能图形与计算 API。暴露了大量硬件细节，让开发者精细控制 GPU 内存、线程同步等，统一了桌面、移动和嵌入式平台。
- Direct3D: D3D 9/10/11 与 OpenGL 属于同一代，D3D 12 是对标 Vulkan/Metal 的现代底层 API。
- Metal: 苹果全平台的底层图形与计算 API。

> GPGPU (General-Purpose compution on Graphics Processing Unit)

传统 GPU（图形）-> 通用 GPU（GPGPU）-> 高性能计算
