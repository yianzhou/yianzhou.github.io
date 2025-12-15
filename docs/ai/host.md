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

终端计算方案：微信 XNet-DNN、阿里 MNN、llama.cpp

> 深度神经网络（Deep Neural Networks）

> MNN（Mobile Neural Network）

> LLVM 的全称是 Low Level Virtual Machine（低级虚拟机）。今天，“LLVM”这个词已经不再被视为一个缩写，而就是一个专有项目名称。官方早已不再强调“Low Level Virtual Machine”这个全称。今天，当你现在提到“LLVM”，业界默认你指的是整个编译器基础设施项目，包括其IR、前端、优化器、后端、调试器、链接器等一整套工具。

## 公司

ARM 控股公司（现为软银集团旗下，已启动独立上市进程）是一家半导体和软件设计公司。不制造和销售芯片。它的主要业务是设计 CPU（及其他 IP 核）的架构蓝图，然后将这些设计授权给其他公司（如苹果、高通、三星、华为等）使用，收取授权费和版税。

AMD（超威半导体公司）是一家集设计、制造（通过代工厂）、销售于一体的半导体公司。主要使用 x86 架构。x86 架构是复杂指令集，由英特尔主导，AMD 拥有 x86 架构的交叉授权。这也是与 ARM 架构最根本的技术区别。
