---
author: Ayaskt
---

# CPS Lecture 16-17 Analogue to Digital Conversion

## 章节目录

- [16-17-1 模拟到数字转换 Analogue-to-Digital Conversion](#16-17-1-模拟到数字转换-analogue-to-digital-conversion)
  - [16-17-1-1 数字通信为什么需要 ADC Why ADC Is Needed](#16-17-1-1-数字通信为什么需要-adc-why-adc-is-needed)
  - [16-17-1-2 ADC 的三步 Three Stages of ADC](#16-17-1-2-adc-的三步-three-stages-of-adc)
- [16-17-2 采样 Sampling](#16-17-2-采样-sampling)
  - [16-17-2-1 瞬时采样 Instantaneous Sampling](#16-17-2-1-瞬时采样-instantaneous-sampling)
  - [16-17-2-2 采样定理 Sampling Theorem](#16-17-2-2-采样定理-sampling-theorem)
  - [16-17-2-3 混叠 Aliasing](#16-17-2-3-混叠-aliasing)
  - [16-17-2-4 保护带 Guard Band](#16-17-2-4-保护带-guard-band)
- [16-17-3 量化与编码 Quantization and Encoding](#16-17-3-量化与编码-quantization-and-encoding)
  - [16-17-3-1 标量量化 Scalar Quantization](#16-17-3-1-标量量化-scalar-quantization)
  - [16-17-3-2 量化噪声 Quantization Noise](#16-17-3-2-量化噪声-quantization-noise)
  - [16-17-3-3 编码 Encoding](#16-17-3-3-编码-encoding)
- [16-17-4 波形编码 Waveform Coding](#16-17-4-波形编码-waveform-coding)
  - [16-17-4-1 脉冲编码调制 PCM](#16-17-4-1-脉冲编码调制-pcm)
  - [16-17-4-2 差分脉冲编码调制 DPCM](#16-17-4-2-差分脉冲编码调制-dpcm)
  - [16-17-4-3 增量调制 Delta Modulation](#16-17-4-3-增量调制-delta-modulation)

## 16-17-1 模拟到数字转换 Analogue-to-Digital Conversion

### 16-17-1-1 数字通信为什么需要 ADC Why ADC Is Needed

:::: definition 模拟信号 Analogue Signal
**模拟信号 Analogue Signal** 的时间和幅度通常都是连续的。温度、声音、电压等物理量经过传感器后，常先表现为模拟波形。
::::

:::: definition 数字信号 Digital Signal
**数字信号 Digital Signal** 用有限个符号表示信息，最常见的是二进制符号 $0$ 和 $1$。它适合编码、存储、纠错、加密和数字硬件处理。
::::

数字通信系统希望传输的是可编码的比特流。实际源信号若来自语音、图像或传感器，通常先要经过**模拟到数字转换 Analogue-to-Digital Conversion, ADC**。

数字信号的优势主要在三个位置体现：

- 再生中继器 Regenerative Repeater 可以重新判决并生成脉冲；
- 编码与纠错 Coding and Error Control 可以降低误码率；
- 存储、加密和微处理器实现更方便。

### 16-17-1-2 ADC 的三步 Three Stages of ADC

![ADC 三步](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/adc-three-stages.jpg>)

ADC 把模拟波形变成比特序列，核心步骤是：

| 步骤 | 输入 | 输出 | 作用 |
| --- | --- | --- | --- |
| 采样 Sampling | 连续时间、连续幅度 | 离散时间、连续幅度 | 固定时间间隔取样 |
| 量化 Quantization | 离散时间、连续幅度 | 离散时间、离散幅度 | 把样本幅度映射到有限等级 |
| 编码 Encoding | 量化等级 | 比特序列 | 给每个量化等级分配码字 |

:::: definition 采样 Sampling
**采样 Sampling** 是在离散时刻读取连续时间信号的幅度，得到样本序列 $x(nT_s)$。
::::

:::: definition 量化 Quantization
**量化 Quantization** 是把连续幅度映射到有限个离散幅度等级的过程。
::::

:::: definition 编码 Encoding
**编码 Encoding** 是把量化后的幅度等级映射成二进制码字的过程。
::::

ADC 的结构顺序不能随意交换。采样解决时间轴，量化解决幅度轴，编码解决符号表示。

## 16-17-2 采样 Sampling

### 16-17-2-1 瞬时采样 Instantaneous Sampling

![理想冲激采样](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/ideal-impulse-sampling.jpg>)

设连续时间信号为 $g(t)$，采样间隔为 $T_s$。对应的采样频率为：

$$
f_s=\frac{1}{T_s}.
$$

**瞬时采样 Instantaneous Sampling** 用周期冲激序列抽取信号值：

$$
g_\delta(t)
=\sum_{n=-\infty}^{\infty}g(nT_s)\delta(t-nT_s).
$$

其中：

- $g_\delta(t)$：理想采样信号；
- $g(nT_s)$：第 $n$ 个采样值；
- $\delta(t-nT_s)$：位于 $t=nT_s$ 的狄拉克冲激 Dirac Delta。

也可写成连续信号与冲激列相乘：

$$
g_\delta(t)=g(t)\sum_{n=-\infty}^{\infty}\delta(t-nT_s).
$$

该写法后续用于分析频域复制。

---

### 16-17-2-2 采样定理 Sampling Theorem

:::: definition 带限信号 Band-limited Signal
**带限信号 Band-limited Signal** 的频谱只在有限频率范围内非零。若带宽为 $W$，则：

$$
X(f)=0,\qquad \lvert f\rvert \ge W.
$$
::::

:::: definition Nyquist 采样定理 Nyquist Sampling Theorem
若信号 $x(t)$ 严格带限于 $W$，且采样频率满足

$$
f_s\ge 2W,
$$

则原始信号可由采样值完全重建。
::::

对应的最大采样间隔为：

$$
T_s\le \frac{1}{2W}.
$$

最低无混叠采样频率称为**Nyquist 速率 Nyquist Rate**：

$$
\boxed{f_{\mathrm{Nyquist}}=2W.}
$$

在临界采样 $T_s=1/(2W)$ 时，理想重建公式为：

$$
x(t)=\sum_{n=-\infty}^{\infty}
x\left(\frac{n}{2W}\right)\operatorname{sinc}(2Wt-n).
$$

一般写法为：

$$
x(t)=\sum_{n=-\infty}^{\infty}
x(nT_s)\operatorname{sinc}\left(\frac{t}{T_s}-n\right).
$$

> [!NOTE]
> 旧 CPS 笔记把采样定理的频域推导单独写了出来。这里保留这段推导，因为它直接解释了为什么低于 $2W$ 会出现频谱重叠。

对采样信号做傅里叶变换：

$$
X_\delta(f)
=X(f)*\mathcal{F}\left[
\sum_{n=-\infty}^{\infty}\delta(t-nT_s)
\right].
$$

冲激列的傅里叶变换为：

$$
\mathcal{F}\left[
\sum_{n=-\infty}^{\infty}\delta(t-nT_s)
\right]
=\frac{1}{T_s}
\sum_{n=-\infty}^{\infty}
\delta\left(f-\frac{n}{T_s}\right).
$$

因此：

$$
X_\delta(f)
=\frac{1}{T_s}
\sum_{n=-\infty}^{\infty}
X\left(f-\frac{n}{T_s}\right).
$$

![采样后的频谱复制](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/sampled-spectrum-replicas.jpg>)

采样会在频域中以 $f_s$ 为间隔复制原始频谱。只要相邻频谱副本不重叠，低通重建滤波器就能取回中心那一份频谱。

---

### 16-17-2-3 混叠 Aliasing

:::: definition 混叠 Aliasing
**混叠 Aliasing** 是采样频率过低时，高频分量在采样后表现为较低频率分量的现象。其根源是采样后频谱副本互相重叠。
::::

![混叠频谱](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/aliasing-spectrum-wide.jpg>)

当 $f_s<2W$ 时，频谱副本间隔小于原始频谱总宽度，中心频谱与相邻副本重叠。重叠后无法仅用低通滤波器恢复原信号。

工程上处理混叠通常靠两步：

1. 在采样前加入**抗混叠低通滤波器 Anti-aliasing Low-pass Filter**；
2. 实际采样频率取高于 Nyquist 速率，给重建滤波器留出过渡带。

需要注意，抗混叠滤波器放在 ADC 前面。信号一旦被低采样率采坏，后续数字滤波无法分离已经重叠的频谱。

---

### 16-17-2-4 保护带 Guard Band

:::: definition 保护带 Guard Band
**保护带 Guard Band** 是采样频谱中相邻副本之间预留的频率间隔，用来容纳实际滤波器的过渡带。
::::

![重建滤波器和保护带](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/reconstruction-guard-band-wide.jpg>)

若原信号带宽为 $W$，采样频率为 $f_s$，则正频率侧相邻频谱之间的保护带为：

$$
W_G=(f_s-W)-W=f_s-2W.
$$

临界采样时 $W_G=0$。实际系统一般要求 $W_G>0$，否则重建滤波器需要理想砖墙响应，物理上不可实现。

:::: stem L16-E1
带限信号的带宽为 $3400\,\mathrm{Hz}$。若要求保护带为 $1200\,\mathrm{Hz}$，应使用多少采样频率？
::::

:::: solution
由保护带公式：

$$
W_G=f_s-2W.
$$

代入 $W=3400\,\mathrm{Hz}$，$W_G=1200\,\mathrm{Hz}$：

$$
f_s=W_G+2W
=1200+2\times3400
=8000\,\mathrm{Hz}.
$$

因此应使用：

$$
f_s=8\,\mathrm{kHz}.
$$
::::

## 16-17-3 量化与编码 Quantization and Encoding

### 16-17-3-1 标量量化 Scalar Quantization

:::: definition 标量量化 Scalar Quantization
**标量量化 Scalar Quantization** 是对每个样本单独量化，把一个实数样本映射到有限个代表值之一。
::::

:::: definition 向量量化 Vector Quantization
**向量量化 Vector Quantization** 是把多个样本组成向量，在多维空间中进行量化。它利用样本之间的相关性，但实现复杂度更高。
::::

![四级标量量化器](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/scalar-quantizer-wide.jpg>)

设量化区间为 $\mathbb{R}_i$，对应的重建值为 $\hat{x}_i$。量化函数写成：

$$
Q(x)=\hat{x}_i,\qquad x\in\mathbb{R}_i.
$$

量化误差定义为：

$$
\tilde{x}=x-Q(x)=x-\hat{x}.
$$

平方误差失真为：

$$
d(x,\hat{x})
=\left(x-Q(x)\right)^2
=\tilde{x}^2.
$$

若输入 $X$ 为随机变量，平均失真或**均方误差 Mean Squared Error, MSE** 为：

$$
D=E\left\{d(X,\hat{X})\right\}
=E\left[\left(X-Q(X)\right)^2\right].
$$

---

### 16-17-3-2 量化噪声 Quantization Noise

:::: definition 量化噪声 Quantization Noise
**量化噪声 Quantization Noise** 是量化误差 $\tilde{x}=x-Q(x)$ 对信号造成的等效噪声。
::::

:::: definition 信号量化噪声比 Signal-to-Quantization Noise Ratio, SQNR
**信号量化噪声比 Signal-to-Quantization Noise Ratio, SQNR** 是信号功率与量化噪声功率之比：

$$
\mathrm{SQNR}=\frac{P_X}{P_{\tilde{x}}}.
$$
::::

对随机变量形式：

$$
\mathrm{SQNR}
=\frac{E(X^2)}{E\left[\left(X-Q(X)\right)^2\right]}.
$$

对连续时间随机信号，信号平均功率为：

$$
P_X
=\lim_{T\to\infty}
\frac{1}{T}\int_{-T/2}^{T/2}E\left[X^2(t)\right]\,dt.
$$

量化噪声功率为：

$$
P_{\tilde{x}}
=\lim_{T\to\infty}
\frac{1}{T}\int_{-T/2}^{T/2}
E\left[\left(X(t)-Q(X(t))\right)^2\right]\,dt.
$$

对于均匀量化器，若量化步长为 $\Delta$，且量化误差近似均匀分布于：

$$
\left[-\frac{\Delta}{2},\frac{\Delta}{2}\right],
$$

则误差概率密度为：

$$
f_{\tilde{x}}(u)=
\begin{cases}
\dfrac{1}{\Delta}, & -\dfrac{\Delta}{2}\le u\le \dfrac{\Delta}{2},\\
0, & \text{otherwise}.
\end{cases}
$$

对应量化噪声功率为：

$$
P_{\tilde{x}}
=E(\tilde{x}^2)
=\frac{\Delta^2}{12}.
$$

> [!NOTE]
> 满幅正弦输入和均匀 PCM 的常用近似结论为 $\mathrm{SQNR}_{\mathrm{dB}}\approx6.02v+1.76\,\mathrm{dB}$，其中 $v$ 为每个样本的比特数。它是复习量化位数影响时很常用的结果。

---

### 16-17-3-3 编码 Encoding

:::: definition 自然二进制编码 Natural Binary Coding, NBC
**自然二进制编码 Natural Binary Coding, NBC** 按量化等级顺序直接分配普通二进制码字。
::::

:::: definition 格雷编码 Gray Coding
**格雷编码 Gray Coding** 使相邻等级的码字只相差一位，用来降低相邻等级判错时造成的比特错误数。
::::

若总共有：

$$
N=2^v
$$

个量化等级，则每个样本需要 $v$ 个比特。若采样频率为 $f_s$，比特率为：

$$
R=vf_s\qquad \mathrm{(bit/s)}.
$$

量化等级越多，量化误差越小，但比特率也越高。ADC 设计本质上是在失真、带宽、存储和功耗之间取平衡。

## 16-17-4 波形编码 Waveform Coding

### 16-17-4-1 脉冲编码调制 PCM

:::: definition 波形编码 Waveform Coding
**波形编码 Waveform Coding** 的目标是在接收端尽量重建源信号波形，而不是利用某一类源的语义结构。
::::

:::: definition 脉冲编码调制 Pulse Code Modulation, PCM
**脉冲编码调制 Pulse Code Modulation, PCM** 通过采样、量化和编码，把连续消息信号表示成编码脉冲序列。
::::

PCM 的常见假设为：

- 消息信号带限于 $W$；
- 采样频率满足 $f_s\ge 2W$；
- 信号幅度有限，满足 $\lvert x(t)\rvert\le x_{\max}$；
- 量化等级数为 $N=2^v$。

均匀 PCM 中，输入幅度范围为：

$$
\left[-x_{\max},x_{\max}\right].
$$

量化步长为：

$$
\Delta
=\frac{2x_{\max}}{N}
=\frac{x_{\max}}{2^{v-1}}.
$$

于是量化误差满足：

$$
\tilde{x}\in
\left[-\frac{\Delta}{2},\frac{\Delta}{2}\right].
$$

---

### 16-17-4-2 差分脉冲编码调制 DPCM

:::: definition 差分脉冲编码调制 Differential Pulse Code Modulation, DPCM
**差分脉冲编码调制 Differential Pulse Code Modulation, DPCM** 不直接量化样本本身，而是量化当前样本与预测值之间的差值。
::::

![DPCM 编码器](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/dpcm-encoder.jpg>)

![DPCM 解码器](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/dpcm-decoder.jpg>)

带限平滑信号的相邻样本通常高度相关。若预测器能给出较准确的 $\hat{m}_q[k]$，则差值：

$$
d[k]=m[k]-\hat{m}_q[k]
$$

的动态范围会小于原始样本 $m[k]$。因此差值可以用更少量化等级表示。

量化后的差值为：

$$
d_q[k]=Q(d[k]).
$$

重建样本为：

$$
m_q[k]=d_q[k]+\hat{m}_q[k].
$$

DPCM 的优点是相同失真下可能需要更低比特率。代价是发送端和接收端都要维持一致的预测器状态。

---

### 16-17-4-3 增量调制 Delta Modulation

:::: definition 增量调制 Delta Modulation, DM
**增量调制 Delta Modulation, DM** 是 DPCM 的简化形式。它只使用一位量化器，每次只发送上升或下降一个固定步长的信息。
::::

![增量调制跟踪](<CPS Lecture 16-17 Analogue to Digital Conversion.attachments/delta-modulation-tracking.jpg>)

Delta modulation 的量化输出通常只有两种：

$$
d_q[k]\in\{+\Delta,-\Delta\}.
$$

每个样本只用 $1$ bit，码率形式很简单。但一位量化器动态范围很低，只有在相邻样本高度相关时才可用。

因此 DM 通常需要远高于 Nyquist 速率的采样频率。高采样率让相邻样本变化变小，从而使一步一步跟踪波形成为可能。

> [!NOTE]
> 复习时把 DM 的两个失真记住即可：步长太小会出现 slope overload，波形陡变时跟不上；步长太大会出现 granular noise，平坦区域来回抖动。
