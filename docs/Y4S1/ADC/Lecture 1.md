---
lastUpdated: 2026-11-03T22:47:32+08:00
---

# 1 Digital Communication System

<LyricCover
  image="Lecture 1.attachments/1793780893664.jpg"
  title="迷星叫"
  artist="MyGO!!!!!"
  lang="ja"
  netease-url="https://music.163.com/song?id=2097485069"
>
  <LyricLine
    original="僕(ぼく)のため"
    translation="为了我自己"
  />
  <LyricLine
    original="それだけ それだけだったんだよ"
    translation="只是如此 就仅仅是如此而已"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [1-1 通信系统 Communication System](#1-1-通信系统-communication-system)
  - [1-1-1 角色与指标 Roles and Metrics](#1-1-1-角色与指标-roles-and-metrics)
  - [1-1-2 基本结构 Basic Structure](#1-1-2-基本结构-basic-structure)
- [1-2 数字通信 Digital Communication](#1-2-数字通信-digital-communication)
  - [1-2-1 信息的数字表示 Digital Representation](#1-2-1-信息的数字表示-digital-representation)
  - [1-2-2 性能指标 Performance Metrics](#1-2-2-性能指标-performance-metrics)
  - [1-2-3 优势 Advantages](#1-2-3-优势-advantages)
  - [1-2-4 劣势 Disadvantages](#1-2-4-劣势-disadvantages)
- [1-3 数字通信系统结构 Digital Communication System Architecture](#1-3-数字通信系统结构-digital-communication-system-architecture)
  - [1-3-1 框图 Block Diagram](#1-3-1-框图-block-diagram)
  - [1-3-2 信源编码 Source Encoding](#1-3-2-信源编码-source-encoding)
  - [1-3-3 信道编码 Channel Coding](#1-3-3-信道编码-channel-coding)
  - [1-3-4 数字调制器 Digital Modulator](#1-3-4-数字调制器-digital-modulator)
  - [1-3-5 比特率与符号速率 Bit Rate and Symbol Rate](#1-3-5-比特率与符号速率-bit-rate-and-symbol-rate)
  - [1-3-6 通信信道 Communication Channel](#1-3-6-通信信道-communication-channel)
  - [1-3-7 接收端 Receiver](#1-3-7-接收端-receiver)
- [1-4 设计目标 Design Goals](#1-4-设计目标-design-goals)

## 1-1 通信系统 Communication System

### 1-1-1 角色与指标 Roles and Metrics

:::: definition 通信系统 Communication System
**通信系统 Communication System** 通过物理信道 Physical Channel，将信息从 **信源 Source** 传输到 **信宿 Destination**。
::::

系统性能由一组相互约束的指标共同描述：

- **可靠性 Reliability**；
- **数据速率 Data Rate**；
- **延迟 Latency**；
- **覆盖范围 Coverage**；
- **频谱效率 Spectral Efficiency**；
- **能量效率 Energy Efficiency**。

上述指标通常无法同时取到最优。实际设计是在频谱、功率与复杂度等约束下，求可靠且高效的传输方案。

---

### 1-1-2 基本结构 Basic Structure

通信系统的基本框图如下：

![alt text](<Lecture 1.attachments/1793777691949.png>)

图中包含五个元素：

- **信源 Source**：模拟或数字信号；
- **发射机 Transmitter**：放大器、调制器、振荡器、天线等；
- **信道 Channel**：光纤、电缆或自由空间；
- **接收机 Receiver**：天线、放大器、解调器、振荡器等；
- **信宿 Recipient**：人、扬声器、计算机等。

收发信号的差异主要来自信道，常见损伤包括：

- **衰减 Attenuation**；
- **噪声 Noise**；
- **干扰 Interference**；
- **失真 Distortion**；
- **衰落 Fading**；
- **定时与同步误差 Timing and Synchronisation Error**。

> [!IMPORTANT]
> 接收机必须从受损观测中恢复原始信息。数字通信研究如何在不完美信道下设计可恢复的信号与接收机。

## 1-2 数字通信 Digital Communication

### 1-2-1 信息的数字表示 Digital Representation

信源产生的信号可能是：

- 模拟信号：语音、图像、传感器测量等；
- 数字信号：计算机数据、文本和控制信号等。

模拟信号转换为数字比特的步骤为：

$$
\text{采样 Sampling}
\;\rightarrow\;
\text{量化 Quantisation}
\;\rightarrow\;
\text{二进制编码 Binary Encoding}.
$$

最终比特仍须经调制，变成能够在信道上传播的物理波形。

---

### 1-2-2 性能指标 Performance Metrics

| 指标 | 符号 / 单位 | 含义 |
| --- | --- | --- |
| 比特率 Bit Rate | $R_b$，$\mathrm{bit/s}$ | 信息比特的传输速率 |
| 符号速率 / 波特率 Symbol Rate | $R_s$，$\mathrm{symbol/s}$ 或 baud | 符号的传输速率 |
| 误码率 Bit Error Rate, BER | — | 错误检测比特所占的比例或概率 |
| 信噪比 Signal-to-Noise Ratio, SNR | — | 接收信号功率与噪声功率之比 |
| 频谱效率 Spectral Efficiency | $\eta$，$\mathrm{bit/s/Hz}$ | 每赫兹每秒传输的比特数 |
| 延迟 Latency | $\mathrm{s}$ | 信息通过系统所需的时间 |
| 能量效率 Energy Efficiency | — | 单位能量成功传输的信息量 |

---

### 1-2-3 优势 Advantages

- 可对失真信号再生 Regenerated Distorted Signal；
- 可实现数据压缩、检错与纠错 Data Compression, Error Detection and Correction；
- 硬件选择灵活 Flexible Hardware；
- 成本较低 Low Cost；
- 信号复用更直接 Efficient Multiplexing；
- 便于组合不同类型的信号 Combine Different Signal Types；
- 存储容量更大 Larger Storage Capacity；
- 可用加密保护隐私与安全 Encryption；
- 整体性能更易按指标折中设计。

---

### 1-2-4 劣势 Disadvantages

- 通常需要更大带宽；
- 对同步的可靠性要求更高；
- 多级处理带来更高功耗；
- 电路结构更复杂。

## 1-3 数字通信系统结构 Digital Communication System Architecture

### 1-3-1 框图 Block Diagram

数字通信系统按编码—调制—信道—解调—译码展开：

![alt text](<Lecture 1.attachments/1793780204857.png>)

发射端依次完成：

**信息源 Information Source** $\rightarrow$ **信源编码 Source Encoding** $\rightarrow$ **信道编码 Channel Encoding** $\rightarrow$ **数字调制器 Digital Modulator**。

接收端依次完成：

**数字解调器 Digital Demodulator** $\rightarrow$ **信道译码 Channel Decoding** $\rightarrow$ **信源译码 Source Decoding** $\rightarrow$ **输出换能器 Output Transducer**。

发射机的目标是把信息转换成适于可靠传输的波形。接收机的目标是从带噪声、失真的观测中推断所发信息。

---

### 1-3-2 信源编码 Source Encoding

:::: definition 信源编码 Source Encoding
**信源编码 Source Encoding** 把模拟或数字信源的输出高效转换成二进制数字序列，用于降低冗余、提高带宽利用并实现数据压缩。
::::

信源产生的消息被转换成比特序列。对连续时间信号需 **采样 Sampling**，对连续取值信号需 **量化 Quantisation**，再对所得符号做 **压缩 Compression**。

信源编码改变的是信息的表示效率，不主动加入用于抗噪声的受控冗余。

---

### 1-3-3 信道编码 Channel Coding

:::: definition 信道编码 Channel Coding
**信道编码 Channel Coding** 向比特序列加入受控冗余 Controlled Redundancy，使信道噪声引起的差错可被发现或纠正，从而提高接收数据的可靠性。
::::

语言本身带有冗余。例如发送

$$
\text{Glasgow College, UESTC}
$$

经信道后可能变成

$$
\text{Gxasgxw Cxllxge, UExTC}.
$$

部分字母出错后，仍可依据单词结构与上下文恢复原句。信道编码用同样思路：事先约定码结构，使接收端能利用冗余从受损序列中重构原比特。

---

### 1-3-4 数字调制器 Digital Modulator

:::: definition 数字调制器 Digital Modulator
**数字调制器 Digital Modulator** 完成数模转换 Digital-to-Analog Conversion，把二进制信息序列映射为可在信道上发送的连续时间波形。
::::

低频数字信号被搬移到适合传输的高频模拟波形。调制器输出送至天线或有线接口。调制的作用是把抽象比特变成物理可传播的信号。

---

### 1-3-5 比特率与符号速率 Bit Rate and Symbol Rate

若每个传输符号携带

$$
k=\log_2 M
$$

个比特，则比特率与符号速率满足

$$
\boxed{
R_b = k R_s
=
R_s\log_2 M,
\qquad
R_s
=
\frac{R_b}{\log_2 M}.
}
$$

其中：

- $R_b$：比特率，单位 $\mathrm{bit/s}$；
- $R_s$：符号速率，单位 baud；
- $M$：可能的符号个数；
- $k$：每符号比特数。

:::: stem L1-E1
某 16-QAM 系统的符号速率为 $R_s=5\,\mathrm{Mbaud}$。求比特率 $R_b$。
::::

:::: solution
$M=16$，故

$$
k=\log_2 16=4.
$$

代入 $R_b=k R_s$ 得

$$
R_b=4\times 5=20\,\mathrm{Mbit/s}.
$$
::::

---

### 1-3-6 通信信道 Communication Channel

:::: definition 通信信道 Communication Channel
**通信信道 Communication Channel** 是发送波形传播所经过的物理环境。
::::

常见信道包括铜缆、光纤、地面无线信道与卫星信道。信号在信道中会以随机方式受损，典型损伤为路径损耗、噪声、干扰与衰落。

信道引入的总效果可写成：

$$
\text{attenuation}
+
\text{noise}
+
\text{interference}
+
\text{distortion}
+
\text{fading}.
$$

---

### 1-3-7 接收端 Receiver

**数字解调器 Digital Demodulator** 处理受损波形，并将其转换成对发送比特的估计。

**信道译码器 Channel Decoder** 利用发端所用码的结构，以及接收序列中的受控冗余，重构原始二进制序列。

译码器输出的平均误比特率，用来衡量解调器—译码器组合的性能。

## 1-4 设计目标 Design Goals



数字通信系统设计通常希望同时最大化数据速率、覆盖范围与可靠性，并最小化带宽、延迟、能耗与复杂度。

这两组目标相互冲突，不能在无约束条件下同时达到。

| 手段 | 收益 | 代价 |
| --- | --- | --- |
| 提高发射功率 | 可靠性上升 | 能耗上升 |
| 加强信道编码 | 差错减少 | 引入冗余，有效信息速率下降 |
| 高阶调制 | 频谱效率上升 | 对信道条件要求更高 |
| 重传 | 可靠性上升 | 延迟上升 |
| 加宽带宽 | 可达速率上升 | 频谱资源有限 |

具体方案取决于应用与约束。同一套指标在蜂窝覆盖、短距高速链路或深空通信中的权重不同。
