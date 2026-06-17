---
author: Ayaskt
---

# Introduction

## 章节目录

- [1-1 课程定位 Course Scope](#1-1-课程定位-course-scope)
  - [1-1-1 学习目标 Learning Outcomes](#1-1-1-学习目标-learning-outcomes)
  - [1-1-2 Part 1 的位置 Position of Part 1](#1-1-2-part-1-的位置-position-of-part-1)
- [1-2 通信系统的任务 Communication Task](#1-2-通信系统的任务-communication-task)
  - [1-2-1 信息交换 Information Exchange](#1-2-1-信息交换-information-exchange)
  - [1-2-2 通信系统 Communication System](#1-2-2-通信系统-communication-system)
  - [1-2-3 电子通信 Electronic Communication](#1-2-3-电子通信-electronic-communication)
- [1-3 通信系统的基本组成 Basic Elements](#1-3-通信系统的基本组成-basic-elements)
  - [1-3-1 总体链路 Overall Chain](#1-3-1-总体链路-overall-chain)
  - [1-3-2 发射机与接收机 Transmitter and Receiver](#1-3-2-发射机与接收机-transmitter-and-receiver)
  - [1-3-3 信道 Channel](#1-3-3-信道-channel)
- [1-4 限制与分类 Limitations and Classification](#1-4-限制与分类-limitations-and-classification)
  - [1-4-1 带宽与噪声 Bandwidth and Noise](#1-4-1-带宽与噪声-bandwidth-and-noise)
  - [1-4-2 信道损伤 Channel Impairments](#1-4-2-信道损伤-channel-impairments)
  - [1-4-3 通信方式 Transmission Modes](#1-4-3-通信方式-transmission-modes)
- [1-5 模拟与数字通信 Analog and Digital Communication](#1-5-模拟与数字通信-analog-and-digital-communication)
  - [1-5-1 模拟信号与数字信号 Analog and Digital Signals](#1-5-1-模拟信号与数字信号-analog-and-digital-signals)
  - [1-5-2 模拟通信链路 Analog Communication Chain](#1-5-2-模拟通信链路-analog-communication-chain)
  - [1-5-3 数字通信链路 Digital Communication Chain](#1-5-3-数字通信链路-digital-communication-chain)
- [1-6 基带、载波与调制 Baseband, Carrier and Modulation](#1-6-基带载波与调制-baseband-carrier-and-modulation)
  - [1-6-1 基带信号 Baseband Signal](#1-6-1-基带信号-baseband-signal)
  - [1-6-2 基带传输的限制 Baseband Transmission Limitations](#1-6-2-基带传输的限制-baseband-transmission-limitations)
  - [1-6-3 调制信号 Modulated Signal](#1-6-3-调制信号-modulated-signal)
  - [1-6-4 调制类型 Types of Modulation](#1-6-4-调制类型-types-of-modulation)
- [1-7 通信设计折中 Communication Design Trade-offs](#1-7-通信设计折中-communication-design-trade-offs)
  - [1-7-1 性能指标 Performance Metrics](#1-7-1-性能指标-performance-metrics)
  - [1-7-2 典型场景 Typical Scenarios](#1-7-2-典型场景-typical-scenarios)
  - [1-7-3 复习重点 Review Checklist](#1-7-3-复习重点-review-checklist)

## 1-1 课程定位 Course Scope

### 1-1-1 学习目标 Learning Outcomes

**通信原理与系统 Communications Principles and Systems** 关注物理链路层附近的问题：信号如何表示、系统如何改变信号、频谱如何描述信号，以及调制如何把信息搬到适合传输的频段。

课程的第一部分主要服务后续模拟调制、频率调制和数字调制。需要掌握的工具包括：

- **傅里叶级数 Fourier Series**：用于周期信号的频谱分解；
- **傅里叶变换 Fourier Transform**：用于一般信号的时域 / 频域转换；
- **卷积 Convolution**：用于描述输入、系统冲激响应和输出之间的关系；
- **滤波 Filtering**：用于解释系统对不同频率分量的选择性。

这些工具会反复出现。后面看到 AM、FM、IQ 调制、信道带宽和噪声分析时，本质上都在操作同一套信号与系统语言。

---

### 1-1-2 Part 1 的位置 Position of Part 1

Part 1 覆盖 Lectures 1--4：

| Lecture | 主题 | 作用 |
| --- | --- | --- |
| Lecture 1 | Introduction | 建立通信系统、信道、调制和设计折中的整体图景 |
| Lecture 2 | Review of Signals | 复习信号分类、复数表示、基本信号、能量与功率 |
| Lecture 3 | LTI Systems and Fourier Transform | 建立 LTI 系统、卷积、频率响应和滤波器模型 |
| Lecture 4 | Baseband and Passband Signals | 建立带宽、基带、通带、IQ 分量和复包络表示 |

这四讲的关系很紧。Lecture 2 给出信号对象，Lecture 3 给出系统工具，Lecture 4 把信号和系统放回通信频段中。

## 1-2 通信系统的任务 Communication Task

### 1-2-1 信息交换 Information Exchange

:::: definition 通信 Communication
**通信 Communication** 是两个实体之间的信息交换。两个实体可以相隔空间，例如电话和网页浏览；也可以相隔时间，例如录音、硬盘和其他存储介质。
::::

通信系统的目标通常写成三个词：

- **高效 Efficient**：用较少带宽、功率、时间或成本传输较多信息；
- **可靠 Reliable**：在噪声、衰减、干扰和失真存在时仍能恢复信息；
- **安全 Secure**：使未授权接收者难以获取或篡改信息。

通信不只发生在人与人之间。处理器总线、路由器之间的信令、传感器网络、卫星链路和蜂窝网络，都属于通信系统分析的对象。

---

### 1-2-2 通信系统 Communication System

:::: definition 通信系统 Communication System
**通信系统 Communication System** 是使信息从源端传到目的端的一组设备、算法和传输媒介。它通常包含信息源、发射机、信道、接收机和目的端。
::::

通信过程可以按功能拆成六步：

1. 产生消息信号，例如语音、图像、音乐、视频或数据；
2. 用一组符号描述消息，例如电信号、声学符号或视觉符号；
3. 将符号编码成适合传输的形式；
4. 通过信道发送编码后的符号；
5. 在接收端解码并恢复符号；
6. 重建原始消息或其可接受近似。

通信系统中出现的“信号”，通常是信息的物理承载形式。例如电压、电流、电磁场、光强或空气压力。

---

### 1-2-3 电子通信 Electronic Communication

:::: definition 电子通信 Electronic Communication
**电子通信 Electronic Communication** 使用电信号或电磁场作为信息载体，将消息从一个位置传送到另一个位置。
::::

现代电子通信的发展依赖几个关键技术节点：电能利用、无线电波、数字化、晶体管和集成电路。课程不考历史细节，但这些节点解释了后续为什么会同时关心模拟电路、数字处理和无线频谱。

对本课程更有用的抽象是：

$$
\text{message} \longrightarrow \text{signal} \longrightarrow \text{channel} \longrightarrow \widehat{\text{message}}
$$

其中 $\widehat{\text{message}}$ 表示接收端得到的估计。估计越接近原消息，通信质量越好。

## 1-3 通信系统的基本组成 Basic Elements

### 1-3-1 总体链路 Overall Chain

![通信系统的基本链路](<CPS Lecture 1 Introduction.attachments/basic-communication-system.jpg>)

一个基本通信链路可以写成：

$$
\text{Source}
\rightarrow
\text{Transmitter}
\rightarrow
\text{Channel}
\rightarrow
\text{Receiver}
\rightarrow
\text{User}
$$

其中：

- **信息源 Information Source**：产生待传输的消息；
- **发射机 Transmitter**：把消息信号改造成适合信道的发射信号；
- **信道 Channel**：承载信号的媒介，同时引入衰减、失真、噪声和干扰；
- **接收机 Receiver**：从接收信号中提取消息估计；
- **用户 User / Destination**：最终使用恢复出来的信息。

---

### 1-3-2 发射机与接收机 Transmitter and Receiver

:::: definition 输入换能器 Input Transducer
**输入换能器 Input Transducer** 将非电形式的消息转换为电信号。例如麦克风把声压变化转换成电压变化。
::::

发射机的核心任务是修改基带消息信号，使其适合远距离传输、频谱分配和抗噪声要求。常见子模块包括：

- **模数转换器 Analog-to-Digital Converter, ADC**；
- **源编码器 Source Encoder**；
- **信道编码器 Channel Encoder**；
- **调制器 Modulator**；
- **功率放大器 Power Amplifier**。

接收机做相反方向的处理。它需要放大、滤波、同步、解调、均衡、信道解码和源解码。课程后面会把这些模块压缩成数学模型，例如滤波器、调制器和 LTI 信道。

:::: definition 输出换能器 Output Transducer
**输出换能器 Output Transducer** 将接收端电信号转换为用户需要的物理形式。例如扬声器、显示器、打印机和执行器。
::::

---

### 1-3-3 信道 Channel

:::: definition 信道 Channel
**信道 Channel** 是连接发射端和接收端的传输媒介。它可以是双绞线、同轴电缆、光纤、波导、自由空间无线链路，也可以是网络中的一段逻辑连接。
::::

信道可以分为两类：

| 类型 | 例子 | 特点 |
| --- | --- | --- |
| **有线信道 Wired Channel** | 铜线、同轴电缆、光纤、波导 | 方向性强，频谱可在不同线缆中复用，带宽高，但基础设施复杂 |
| **无线信道 Wireless Channel** | 无线电、红外、自由空间光链路 | 便于移动接入，部署成本低，但更容易受干扰，频谱资源受限 |

有线和无线信道都存在非理想影响。工程设计的重点是建模、补偿，并在限制内取得足够性能。

## 1-4 限制与分类 Limitations and Classification

### 1-4-1 带宽与噪声 Bandwidth and Noise

通信系统有两个基本物理限制：**带宽 Bandwidth** 和 **噪声 Noise**。

:::: definition 带宽 Bandwidth
**带宽 Bandwidth** 描述信号或系统占用的频率范围。带宽越大，信号允许变化得越快，但频谱资源也消耗得越多。
::::

:::: definition 噪声 Noise
**噪声 Noise** 是随机或不可预测的电信号扰动，来源可以是大气、电磁干扰、宇宙背景、热噪声、散粒噪声或电路内部器件。
::::

带宽限制影响可传的数据速率，噪声限制影响可恢复的精度。模拟通信中常用 **信噪比 Signal-to-Noise Ratio, SNR** 衡量质量；数字通信中常用 **误码率 Bit Error Rate, BER** 衡量质量。

---

### 1-4-2 信道损伤 Channel Impairments

常见信道损伤包括：

- **传播损耗 Propagation Loss**：距离越远，接收功率通常越低；
- **频率选择性 Frequency Selectivity**：不同频率分量经历不同增益和相位变化；
- **时变性 Time Variation**：温度、湿度、移动物体和传播环境变化会改变信道；
- **非线性 Nonlinearity**：部分链路或器件在大信号下偏离线性模型；
- **共享使用 Shared Usage**：多个用户竞争同一频段或媒介；
- **干扰 Interference**：其他通信信号或设备辐射叠加到目标信号上。

这些因素共同决定发射机和接收机的结构。后续将用 LTI 系统、频率响应和滤波器描述其中一部分影响。

---

### 1-4-3 通信方式 Transmission Modes

按信息流方向，通信方式常分为：

| 方式 | 英文 | 信息流 |
| --- | --- | --- |
| 单工 | Simplex | 只允许单向传输 |
| 半双工 | Half-duplex | 双向传输，但同一时刻只能一个方向 |
| 全双工 | Full-duplex | 两个方向可以同时传输 |

广播电台接收是单工的典型例子，对讲机是半双工，电话和蜂窝通信通常按全双工设计。

## 1-5 模拟与数字通信 Analog and Digital Communication

### 1-5-1 模拟信号与数字信号 Analog and Digital Signals

![模拟信号波形](<CPS Lecture 1 Introduction.attachments/analog-waveform.jpg>)

![数字信号波形](<CPS Lecture 1 Introduction.attachments/digital-waveform.jpg>)

:::: definition 模拟信号 Analog Signal
**模拟信号 Analog Signal** 用连续变化的物理量表示信息，幅度可以在某个范围内取任意值。
::::

:::: definition 数字信号 Digital Signal
**数字信号 Digital Signal** 用离散状态或数字序列表示信息。最常见的二进制信号只使用 $0$ 和 $1$ 两种状态。
::::

物理波形本身仍然是连续世界中的电压、电流或电磁波。模拟和数字的区别在于波形所代表的信息结构：模拟信号用连续幅度承载信息，数字信号用离散符号承载信息。

数字通信的优点包括：

- 对噪声和干扰更稳健；
- 可使用再生中继器恢复符号；
- 可用信道编码获得很低误码率；
- 更适合复用、加密和存储；
- 可用 DSP 和 VLSI 实现复杂算法。

---

### 1-5-2 模拟通信链路 Analog Communication Chain

![模拟通信链路](<CPS Lecture 1 Introduction.attachments/analog-communication-chain.jpg>)

模拟通信直接处理连续消息信号。基本链路为：

$$
m(t)
\rightarrow
\text{Modulator}
\rightarrow
s(t)
\rightarrow
\text{Channel}
\rightarrow
r(t)
\rightarrow
\text{Demodulator}
\rightarrow
\hat m(t)
$$

其中：

- $m(t)$：消息信号 Message Signal；
- $s(t)$：发射信号 Transmitted Signal；
- $r(t)$：接收信号 Received Signal；
- $\hat m(t)$：恢复消息的估计。

模拟链路中，信道噪声和失真会连续地影响波形幅度、相位或频率，因此常用 SNR 描述恢复质量。

---

### 1-5-3 数字通信链路 Digital Communication Chain

![数字通信链路](<CPS Lecture 1 Introduction.attachments/digital-communication-chain.jpg>)

数字通信把消息转化为比特，再把比特映射为物理波形。一个较完整的链路为：

$$
\text{Source}
\rightarrow
\text{Source Encoder}
\rightarrow
\text{Channel Encoder}
\rightarrow
\text{Modulator}
\rightarrow
\text{Channel}
\rightarrow
\text{Demodulator}
\rightarrow
\text{Channel Decoder}
\rightarrow
\text{Source Decoder}
$$

**源编码 Source Coding** 负责把语音、图像或数据压缩成比特；**信道编码 Channel Coding** 加入冗余，用于抵抗错误；**调制 Modulation** 把比特映射成适合信道传输的波形。

Shannon 理论给出两个重要结论：

- 给定允许失真，任意信息源都可以用比特表示；
- 给定信道容量，在容量以下可以用编码实现任意低的错误概率。

这两个结论解释了为什么现代通信系统大量使用数字链路。

## 1-6 基带、载波与调制 Baseband, Carrier and Modulation

### 1-6-1 基带信号 Baseband Signal

![基带信号和载波波形](<CPS Lecture 1 Introduction.attachments/baseband-and-carrier-waveforms.jpg>)

:::: definition 基带信号 Baseband Signal
**基带信号 Baseband Signal** 是原始消息信号，或用于调制载波的低频调制信号，其频率成分集中在接近 $0\,\mathrm{Hz}$ 的低频范围。
::::

语音基带信号常取 $300\,\mathrm{Hz}$ 到 $3400\,\mathrm{Hz}$。这类信号可以直接在短距离有线链路中传输，例如简单音频电路。

---

### 1-6-2 基带传输的限制 Baseband Transmission Limitations

![基带语音链路](<CPS Lecture 1 Introduction.attachments/baseband-voice-link.jpg>)

:::: definition 基带传输 Baseband Transmission
**基带传输 Baseband Transmission** 指把原始模拟或数字消息信号直接送入传输媒介，不进行频率搬移。
::::

基带传输在远距离无线通信中不合适，主要有两个原因。

第一个原因是天线尺寸。若用频率 $f$ 的电磁波辐射，波长为：

$$
\lambda=\frac{c}{f}
$$

工程上天线长度常至少取波长的一个固定比例，例如 $\lambda/10$。语音频率很低，波长极长，直接辐射需要不现实的天线尺寸。

第二个原因是频谱重叠。多个语音或低频数据源使用相同低频范围时，接收机难以区分不同来源。调制把不同信号搬到不同载波频率附近，可以实现频分复用。

---

### 1-6-3 调制信号 Modulated Signal

![调制过程](<CPS Lecture 1 Introduction.attachments/modulation-process.jpg>)

:::: definition 调制 Modulation
**调制 Modulation** 是用基带消息信号控制高频载波的幅度、频率或相位，使消息适合指定信道传输的过程。
::::

设载波为：

$$
c(t)=A_c\cos{(2\pi f_c t+\theta_c)}
$$

调制可以改变 $A_c$、$f_c$ 或 $\theta_c$。这样得到的信号称为 **调制信号 Modulated Signal**，通常集中在载波频率 $f_c$ 附近。

调制的主要作用：

- 让信号适配无线信道或带通信道；
- 通过不同载波频率同时发送多个信号；
- 避开强噪声或强干扰频段；
- 减小天线尺寸；
- 支持后续的 AM、FM、PM、ASK、FSK、PSK 等调制方法。

---

### 1-6-4 调制类型 Types of Modulation

模拟调制面向模拟消息信号，典型类型为：

| 类型 | 英文 | 被控制的载波参数 |
| --- | --- | --- |
| 幅度调制 | Amplitude Modulation, AM | 幅度 |
| 频率调制 | Frequency Modulation, FM | 频率 |
| 相位调制 | Phase Modulation, PM | 相位 |

数字调制面向数字符号，典型类型为：

| 类型 | 英文 | 被控制的载波参数 |
| --- | --- | --- |
| 幅移键控 | Amplitude Shift Keying, ASK | 幅度 |
| 频移键控 | Frequency Shift Keying, FSK | 频率 |
| 相移键控 | Phase Shift Keying, PSK | 相位 |

这些调制方式的共同点是：消息从低频波形映射到高频载波附近的通带信号。

## 1-7 通信设计折中 Communication Design Trade-offs

### 1-7-1 性能指标 Performance Metrics

一个好的通信系统通常希望同时满足：

- 接收信号保真度高；
- 发射功率低；
- 信息速率高；
- 占用带宽小；
- 成本和复杂度低；
- 安全性和可靠性满足需求。

这些指标互相牵制。更高功率可以改善接收质量，但会增加能耗和干扰；更大带宽可以提高数据速率，但频谱资源受监管限制；更复杂的编码和 DSP 可以降低错误率，但会增加硬件成本和延迟。

---

### 1-7-2 典型场景 Typical Scenarios

不同通信场景的主导限制不同：

| 场景 | 主导限制 | 设计倾向 |
| --- | --- | --- |
| 卫星和深空通信 | 发射功率昂贵、距离极远 | 能量效率优先 |
| 微波中继塔 | 可用带宽受监管限制 | 频谱效率优先 |
| 蜂窝手机 | 电池容量和频谱都受限 | 能量效率与频谱效率同时考虑 |

因此通信工程很少只优化单一指标。系统设计通常是在功率、带宽、复杂度、延迟、容量和可靠性之间取平衡。

---

### 1-7-3 复习重点 Review Checklist

本讲需要记住：

- 通信系统的基本链路：源、发射机、信道、接收机、用户；
- 信道的主要限制：带宽、噪声、损耗、频率选择性、时变性、干扰；
- 模拟信号与数字信号的区别在于信息表示方式；
- 数字通信链路中源编码、信道编码和调制的分工；
- 基带信号不适合远距离无线传输的原因；
- 调制通过高频载波完成频谱搬移；
- 通信系统设计总是在功率、带宽、复杂度和可靠性之间折中。
