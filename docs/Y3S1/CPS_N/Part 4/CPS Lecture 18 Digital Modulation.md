---
author: Ayaskt
---

# CPS Lecture 18 Digital Modulation

## 章节目录

- [18-1 数字通信系统 Digital Communication System](#18-1-数字通信系统-digital-communication-system)
  - [18-1-1 系统组成 System Components](#18-1-1-系统组成-system-components)
  - [18-1-2 线路编码 Line Coding](#18-1-2-线路编码-line-coding)
  - [18-1-3 复用与再生中继 Multiplexing and Regenerative Repeating](#18-1-3-复用与再生中继-multiplexing-and-regenerative-repeating)
- [18-2 基带传输与 ISI Baseband Transmission and ISI](#18-2-基带传输与-isi-baseband-transmission-and-isi)
  - [18-2-1 基带传输 Baseband Transmission](#18-2-1-基带传输-baseband-transmission)
  - [18-2-2 符号间干扰 Intersymbol Interference](#18-2-2-符号间干扰-intersymbol-interference)
  - [18-2-3 Nyquist 第一准则 Nyquist First Criterion](#18-2-3-nyquist-第一准则-nyquist-first-criterion)
  - [18-2-4 升余弦脉冲 Raised Cosine Pulse](#18-2-4-升余弦脉冲-raised-cosine-pulse)
- [18-3 二进制数字调制 Binary Digital Modulation](#18-3-二进制数字调制-binary-digital-modulation)
  - [18-3-1 载波模型 Carrier Model](#18-3-1-载波模型-carrier-model)
  - [18-3-2 每比特能量 Energy per Bit](#18-3-2-每比特能量-energy-per-bit)
  - [18-3-3 二进制幅移键控 BASK](#18-3-3-二进制幅移键控-bask)
  - [18-3-4 二进制频移键控 BFSK](#18-3-4-二进制频移键控-bfsk)
  - [18-3-5 二进制相移键控 BPSK](#18-3-5-二进制相移键控-bpsk)
- [18-4 QPSK 与 Gray 编码 QPSK and Gray Coding](#18-4-qpsk-与-gray-编码-qpsk-and-gray-coding)
  - [18-4-1 QPSK 信号 QPSK Signal](#18-4-1-qpsk-信号-qpsk-signal)
  - [18-4-2 I/Q 分解 In-phase and Quadrature Decomposition](#18-4-2-iq-分解-in-phase-and-quadrature-decomposition)
  - [18-4-3 Gray 映射 Gray Mapping](#18-4-3-gray-映射-gray-mapping)
- [18-5 M 进制数字调制 M-ary Digital Modulation](#18-5-m-进制数字调制-m-ary-digital-modulation)
  - [18-5-1 M 进制基本关系 M-ary Relations](#18-5-1-m-进制基本关系-m-ary-relations)
  - [18-5-2 M 进制相移键控 M-PSK](#18-5-2-m-进制相移键控-m-psk)
  - [18-5-3 M 进制正交幅度调制 M-QAM](#18-5-3-m-进制正交幅度调制-m-qam)
  - [18-5-4 M 进制频移键控 M-FSK](#18-5-4-m-进制频移键控-m-fsk)
- [18-6 多载波调制与 OFDM Multi-carrier Modulation and OFDM](#18-6-多载波调制与-ofdm-multi-carrier-modulation-and-ofdm)
  - [18-6-1 多载波调制 Multi-carrier Modulation](#18-6-1-多载波调制-multi-carrier-modulation)
  - [18-6-2 正交频分复用 OFDM](#18-6-2-正交频分复用-ofdm)

## 18-1 数字通信系统 Digital Communication System

### 18-1-1 系统组成 System Components

![数字通信系统框图](<CPS Lecture 18 Digital Modulation.attachments/digital-communication-system.jpg>)

:::: definition 数字通信系统 Digital Communication System
**数字通信系统 Digital Communication System** 用离散符号承载信息，并通过物理信道把符号从发送端传到接收端。
::::

基本组成包括：

- **信源 Source**：产生数字数据，例如计算机数据、PCM 音频、Delta modulation 音频、HDTV 或遥测数据；
- **线路编码 Line Coding**：把数字符号变成适合物理信道传输的基带波形；
- **复用器 Multiplexer**：把多个数据流合并到同一信道；
- **信道 Channel**：传输介质，同时引入失真和噪声；
- **再生中继器 Regenerative Repeater**：判决、清除噪声影响，并重新生成脉冲。

:::: definition 二进制通信 Binary Communication
**二进制通信 Binary Communication** 只使用两个符号，通常记为 $0$ 和 $1$。
::::

:::: definition M 进制通信 M-ary Communication
**M 进制通信 M-ary Communication** 在每个符号周期内从 $M$ 个可能符号中选一个。每个符号携带 $\log_2 M$ 个比特。
::::

### 18-1-2 线路编码 Line Coding

![线路编码波形](<CPS Lecture 18 Digital Modulation.attachments/line-coding-waveforms-wide.png>)

:::: definition 线路编码 Line Coding
**线路编码 Line Coding** 是把数字数据映射成物理脉冲波形的过程。它决定基带信号的电平、极性、归零方式和直流分量。
::::

常见线路码如下：

| 类型 | 英文 | 符号表示特点 |
| --- | --- | --- |
| 开关键控归零码 | On-off RZ | $1$ 为脉冲，$0$ 为零电平，每个脉冲回到零 |
| 极性归零码 | Polar RZ | $1$ 和 $0$ 用正负脉冲表示，脉冲回到零 |
| 双极性归零码 | Bipolar RZ | $1$ 的极性交替，$0$ 为零电平 |
| 开关键控不归零码 | On-off NRZ | $1$ 保持非零电平，$0$ 保持零电平 |
| 极性不归零码 | Polar NRZ | $1$ 和 $0$ 保持正负电平，不强制回零 |

**归零 Return-to-Zero, RZ** 的脉冲在一个比特周期内回到零电平。**不归零 Non-Return-to-Zero, NRZ** 在整个比特周期维持当前电平。

线路编码影响带宽、同步、直流分量和误码恢复。后续讨论调制时，通常把线路编码后的波形视为输入基带数据流。

---

### 18-1-3 复用与再生中继 Multiplexing and Regenerative Repeating

:::: definition 复用 Multiplexing
**复用 Multiplexing** 是把多个数据流合并到一个物理信道中传输的技术。
::::

常见复用方式：

- **频分复用 Frequency Division Multiplexing, FDM**：不同用户占用不同频带；
- **时分复用 Time Division Multiplexing, TDM**：不同用户占用不同时隙；
- **码分复用 Code Division Multiplexing, CDM**：不同用户使用不同码序列。

:::: definition 再生中继器 Regenerative Repeater
**再生中继器 Regenerative Repeater** 对接收脉冲进行判决，重新生成干净脉冲后继续传输。
::::

再生中继器是数字通信抗噪声能力强的重要原因。模拟系统只能放大已经叠加噪声的波形，数字系统可以在判决正确时重新生成理想符号。

## 18-2 基带传输与 ISI Baseband Transmission and ISI

### 18-2-1 基带传输 Baseband Transmission

:::: definition 基带 Baseband
**基带 Baseband** 指信源原始信息所在的低频频带。二进制数据流经过线路编码后得到的脉冲波形就是典型基带信号。
::::

基带数字数据通过物理信道传输时，主要受两类因素限制：

- **符号间干扰 Intersymbol Interference, ISI**：信道频率响应不理想导致脉冲展宽；
- **信道噪声 Channel Noise**：随机物理过程在接收端叠加非期望电信号。

Lecture 18 先处理 ISI 和调制结构。噪声下的最优接收和 BER 放到 Lecture 19。

---

### 18-2-2 符号间干扰 Intersymbol Interference

:::: definition 符号间干扰 Intersymbol Interference, ISI
**符号间干扰 Intersymbol Interference, ISI** 是一个符号的脉冲拖尾扩展到相邻符号采样时刻，对当前符号判决造成干扰的现象。
::::

ISI 的来源通常是有限带宽和非理想频率响应。若发送脉冲经过信道后在时间上变宽，接收端在某个采样时刻看到的不只当前符号，还有前后符号的残留。

对数字判决而言，ISI 与噪声不同。噪声来自随机扰动，ISI 来自确定性的脉冲叠加；ISI 可以通过脉冲成形和均衡减轻。

---

### 18-2-3 Nyquist 第一准则 Nyquist First Criterion

:::: definition Nyquist 第一准则 Nyquist First Criterion
**Nyquist 第一准则 Nyquist First Criterion** 要求总脉冲响应在本符号采样时刻为 $1$，在其他符号采样时刻为 $0$，从而实现零 ISI。
::::

设比特周期为：

$$
T_b=\frac{1}{R_b}.
$$

零 ISI 条件写成：

$$
p(nT_b)=
\begin{cases}
1, & n=0,\\
0, & n=\pm1,\pm2,\ldots.
\end{cases}
$$

理想 Nyquist 脉冲为 sinc 形状：

$$
p(t)=\operatorname{sinc}\left(\frac{t}{T_b}\right)
=\frac{\sin{(\pi t/T_b)}}{\pi t/T_b}.
$$

![理想 Nyquist 脉冲](<CPS Lecture 18 Digital Modulation.attachments/ideal-nyquist-pulse.png>)

理想 sinc 在采样时刻满足零交叉条件，因此理论上可实现零 ISI。它的频域响应是矩形，带宽最小；时域拖尾很长，对定时误差敏感。

> [!NOTE]
> 旧 CPS 笔记补充了频域解释：零 ISI 不只看单个脉冲的形状，还看所有频谱平移副本叠加后是否平坦。Raised cosine 的滚降区就是用更宽带宽换取更好实现性。

---

### 18-2-4 升余弦脉冲 Raised Cosine Pulse

:::: definition 升余弦脉冲 Raised Cosine Pulse
**升余弦脉冲 Raised Cosine Pulse** 是满足 Nyquist 第一准则的一类实用脉冲。它用滚降因子控制带宽和时域拖尾之间的折中。
::::

![升余弦脉冲](<CPS Lecture 18 Digital Modulation.attachments/raised-cosine-pulses.png>)

滚降因子通常记为 $r$ 或 $\alpha$，范围为：

$$
0\le r\le1.
$$

升余弦滤波器的带宽为：

$$
B=\frac{1+r}{2T_b}.
$$

典型情况：

| 滚降因子 | 带宽 | 时域特性 |
| --- | --- | --- |
| $r=0$ | 最小带宽 | 退化为理想 sinc，拖尾长 |
| $r=0.5$ | 中等带宽 | 工程中常见折中 |
| $r=1$ | 最大带宽 | 时域衰减较快，抗定时误差较好 |

实际系统常用根升余弦 Root Raised Cosine, RRC 滤波器分别放在发送端和接收端。两端响应相乘后得到整体 Raised Cosine 响应。

## 18-3 二进制数字调制 Binary Digital Modulation

### 18-3-1 载波模型 Carrier Model

:::: definition 数字调制 Digital Modulation
**数字调制 Digital Modulation** 按数字符号离散地改变载波的幅度、频率或相位。
::::

:::: definition 键控 Shift Keying
**键控 Shift Keying** 指在有限个离散状态之间切换载波参数，例如幅度、频率或相位。
::::

正弦载波写成：

$$
c(t)=A_c\cos{(2\pi f_ct+\phi_c)}.
$$

其中：

- $A_c$：载波幅度 Carrier Amplitude；
- $f_c$：载波频率 Carrier Frequency；
- $\phi_c$：载波相位 Carrier Phase。

若令载波在一个比特周期内具有单位能量，可取：

$$
A_c=\sqrt{\frac{2}{T_b}}.
$$

于是：

$$
c(t)=\sqrt{\frac{2}{T_b}}
\cos{(2\pi f_ct+\phi_c)}.
$$

设输入基带数据波形为 $b(t)$，调制信号为：

$$
s(t)=b(t)c(t).
$$

---

### 18-3-2 每比特能量 Energy per Bit

设 $\phi_c=0$，每比特能量定义为：

$$
E_b=\int_0^{T_b}\left|s(t)\right|^2\,dt.
$$

代入 $s(t)$：

$$
E_b
=\frac{2}{T_b}\int_0^{T_b}
\left|b(t)\right|^2\cos^2{(2\pi f_ct)}\,dt.
$$

由：

$$
\cos^2{(2\pi f_ct)}
=\frac{1}{2}\left[1+\cos{(4\pi f_ct)}\right],
$$

可得：

$$
\begin{aligned}
E_b
&=\frac{1}{T_b}\int_0^{T_b}\left|b(t)\right|^2\,dt\\
&\quad+
\frac{1}{T_b}\int_0^{T_b}
\left|b(t)\right|^2\cos{(4\pi f_ct)}\,dt.
\end{aligned}
$$

若载波频率远高于基带变化速度，第二项在一个比特周期内平均近似为零：

$$
\int_0^{T_b}
\left|b(t)\right|^2\cos{(4\pi f_ct)}\,dt\approx0.
$$

于是：

$$
\boxed{
E_b\approx
\frac{1}{T_b}\int_0^{T_b}\left|b(t)\right|^2\,dt
}
$$

该结果说明，调制后的每比特能量由基带符号波形能量决定。

---

### 18-3-3 二进制幅移键控 BASK

:::: definition 二进制幅移键控 Binary Amplitude Shift Keying, BASK
**二进制幅移键控 Binary Amplitude Shift Keying, BASK** 用两个不同幅度表示二进制符号，载波频率和相位保持不变。
::::

常见 on-off BASK 中：

$$
b(t)=
\begin{cases}
\sqrt{E_b}, & \text{symbol }1,\\
0, & \text{symbol }0.
\end{cases}
$$

对应带通信号：

$$
s(t)=
\begin{cases}
\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_ct)}, & \text{symbol }1,\\
0, & \text{symbol }0.
\end{cases}
$$

![BASK 波形](<CPS Lecture 18 Digital Modulation.attachments/bask-waveform-wide.png>)

BASK 的结构简单，但符号距离受幅度噪声影响较大。在同等能量下，它通常不如 BPSK 抗噪声。

---

### 18-3-4 二进制频移键控 BFSK

:::: definition 二进制频移键控 Binary Frequency Shift Keying, BFSK
**二进制频移键控 Binary Frequency Shift Keying, BFSK** 用两个不同频率表示二进制符号，载波幅度通常保持不变，信息由频率切换承载。
::::

相位不作为 BFSK 的独立键控参数；实际实现可以是连续相位 FSK，也可以是非连续相位 FSK。

BFSK 信号可写为：

$$
s_i(t)=
\begin{cases}
\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_1t)}, & \text{symbol }1,\\
\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_2t)}, & \text{symbol }0.
\end{cases}
$$

其中 $f_1\ne f_2$。

![BFSK 波形](<CPS Lecture 18 Digital Modulation.attachments/bfsk-waveform.png>)

BFSK 的两个符号可设计为正交信号，接收端用两个匹配滤波器或相关器比较能量即可判决。

---

### 18-3-5 二进制相移键控 BPSK

:::: definition 二进制相移键控 Binary Phase Shift Keying, BPSK
**二进制相移键控 Binary Phase Shift Keying, BPSK** 用两个相差 $\pi$ 的载波相位表示二进制符号，载波幅度和频率保持不变。
::::

BPSK 信号为：

$$
s_i(t)=
\begin{cases}
\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_ct)}, & \text{symbol }1,\\
\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_ct+\pi)}, & \text{symbol }0.
\end{cases}
$$

第二行可化为：

$$
\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_ct+\pi)}
=-\sqrt{\dfrac{2E_b}{T_b}}\cos{(2\pi f_ct)}.
$$

![BPSK 波形](<CPS Lecture 18 Digital Modulation.attachments/bpsk-waveform-wide.png>)

BPSK 的两个信号点位于同一直线两端，欧氏距离较大，因此在 AWGN 信道下误码性能很好。

## 18-4 QPSK 与 Gray 编码 QPSK and Gray Coding

### 18-4-1 QPSK 信号 QPSK Signal

:::: definition 正交相移键控 Quadriphase Shift Keying, QPSK
**正交相移键控 Quadriphase Shift Keying, QPSK** 用四个等间隔相位表示符号。每个 QPSK 符号携带两个比特。
::::

:::: definition 双比特 Dibit
**双比特 Dibit** 是由两个比特组成的一组输入，例如 $00$、$01$、$10$、$11$。
::::

QPSK 可取四个相位：

$$
\frac{\pi}{4},\quad
\frac{3\pi}{4},\quad
\frac{5\pi}{4},\quad
\frac{7\pi}{4}.
$$

第 $i$ 个符号波形为：

$$
s_i(t)=
\begin{cases}
\sqrt{\dfrac{2E}{T}}
\cos{\left[2\pi f_ct+(2i-1)\dfrac{\pi}{4}\right]},
& 0\le t\le T,\\
0, & \text{elsewhere},
\end{cases}
$$

其中 $i=1,2,3,4$。

---

### 18-4-2 I/Q 分解 In-phase and Quadrature Decomposition

由：

$$
\cos{(a+b)}=\cos{a}\cos{b}-\sin{a}\sin{b},
$$

可将 QPSK 写成：

$$
\begin{aligned}
s_i(t)
&=
\sqrt{\frac{2E}{T}}
\cos{\left[(2i-1)\frac{\pi}{4}\right]}\cos{(2\pi f_ct)}\\
&\quad-
\sqrt{\frac{2E}{T}}
\sin{\left[(2i-1)\frac{\pi}{4}\right]}\sin{(2\pi f_ct)}.
\end{aligned}
$$

定义两个正交基函数：

$$
\phi_1(t)=\sqrt{\frac{2}{T}}\cos{(2\pi f_ct)},
\qquad
\phi_2(t)=\sqrt{\frac{2}{T}}\sin{(2\pi f_ct)}.
$$

则信号空间坐标为：

$$
a_1=\sqrt{E}\cos{\left[(2i-1)\frac{\pi}{4}\right]},
\qquad
a_2=-\sqrt{E}\sin{\left[(2i-1)\frac{\pi}{4}\right]}.
$$

对应取值：

$$
\sqrt{E}\cos{\left[(2i-1)\frac{\pi}{4}\right]}
=
\begin{cases}
+\sqrt{E/2}, & i=1,4,\\
-\sqrt{E/2}, & i=2,3,
\end{cases}
$$

$$
-\sqrt{E}\sin{\left[(2i-1)\frac{\pi}{4}\right]}
=
\begin{cases}
-\sqrt{E/2}, & i=1,2,\\
+\sqrt{E/2}, & i=3,4.
\end{cases}
$$

![QPSK 正交通道](<CPS Lecture 18 Digital Modulation.attachments/qpsk-quadrature-channel.jpg>)

QPSK 可看成两路相位正交的 BPSK 叠加：一路同相 In-phase, I，一路正交 Quadrature, Q。

---

### 18-4-3 Gray 映射 Gray Mapping

:::: definition Gray 编码 Gray Coding
**Gray 编码 Gray Coding** 让星座图中相邻符号的比特标签只差一位。接收点若被噪声推到相邻区域，通常只造成一位错误。
::::

一种 QPSK Gray 映射如下：

| 索引 $i$ | 相位 | I 分量 | Q 分量 | 输入 dibit |
| --- | --- | --- | --- | --- |
| $1$ | $\pi/4$ | $+\sqrt{E/2}$ | $-\sqrt{E/2}$ | $10$ |
| $2$ | $3\pi/4$ | $-\sqrt{E/2}$ | $-\sqrt{E/2}$ | $00$ |
| $3$ | $5\pi/4$ | $-\sqrt{E/2}$ | $+\sqrt{E/2}$ | $01$ |
| $4$ | $7\pi/4$ | $+\sqrt{E/2}$ | $+\sqrt{E/2}$ | $11$ |

Gray 编码不改变符号波形本身，只改变比特到符号点的标号。它降低的是平均比特错误数，不直接改变符号错误概率。

## 18-5 M 进制数字调制 M-ary Digital Modulation

### 18-5-1 M 进制基本关系 M-ary Relations

:::: definition M 进制数字调制 M-ary Digital Modulation
**M 进制数字调制 M-ary Digital Modulation** 在每个符号周期从 $M$ 个可能信号中选择一个发送。
::::

若：

$$
M=2^m,
$$

则每个符号携带：

$$
m=\log_2 M
$$

个比特。符号周期与比特周期满足：

$$
T=mT_b.
$$

M 进制调制的主要用途是节省带宽。代价是星座点更密集，通常需要更高 SNR 或更复杂接收机。

---

### 18-5-2 M 进制相移键控 M-PSK

:::: definition M 进制相移键控 M-ary Phase Shift Keying, M-PSK
**M 进制相移键控 M-ary Phase Shift Keying, M-PSK** 把 $2\pi$ 相位范围均匀分成 $M$ 个相位，每个相位表示一个符号。
::::

M-PSK 信号可写为：

$$
s_i(t)=
\sqrt{\frac{2E}{T}}
\cos{\left(2\pi f_ct+\frac{2\pi i}{M}\right)},
\qquad i=0,1,\ldots,M-1.
$$

信号空间表示为：

$$
\begin{aligned}
s_i(t)
&=
\left[\sqrt{E}\cos{\left(\frac{2\pi i}{M}\right)}\right]\phi_1(t)\\
&\quad-
\left[\sqrt{E}\sin{\left(\frac{2\pi i}{M}\right)}\right]\phi_2(t).
\end{aligned}
$$

包络大小为：

$$
\sqrt{
\left[\sqrt{E}\cos{\left(\frac{2\pi i}{M}\right)}\right]^2
+
\left[\sqrt{E}\sin{\left(\frac{2\pi i}{M}\right)}\right]^2
}
=\sqrt{E}.
$$

因此 M-PSK 是恒包络 Constant-envelope 调制，适合非线性功放。

![8-PSK 星座图](<CPS Lecture 18 Digital Modulation.attachments/eight-psk-constellation-wide.png>)

随着 $M$ 增大，相邻相位间隔变小，星座点之间距离减小。同等发射能量下，误码率会变差。

---

### 18-5-3 M 进制正交幅度调制 M-QAM

:::: definition M 进制正交幅度调制 M-ary Quadrature Amplitude Modulation, M-QAM
**M 进制正交幅度调制 M-ary Quadrature Amplitude Modulation, M-QAM** 同时改变同相分量和正交分量的幅度，使星座点排列在二维网格上。
::::

M-QAM 信号形式为：

$$
s_i(t)=
\sqrt{\frac{2E_0}{T}}a_i\cos{(2\pi f_ct)}
-
\sqrt{\frac{2E_0}{T}}b_i\sin{(2\pi f_ct)},
$$

其中：

- $a_i$：I 分量幅度等级；
- $b_i$：Q 分量幅度等级；
- $E_0$：最小幅度信号对应的参考能量；
- $i=0,1,\ldots,M-1$。

![16-QAM 星座图](<CPS Lecture 18 Digital Modulation.attachments/qam-constellation-wide.png>)

M-QAM 的特点：

- I/Q 分量相互独立；
- 星座点通常为矩形网格；
- 各符号能量不一定相同；
- 常使用 Gray 编码降低相邻判错带来的比特错误数；
- 包络变化较大，通常需要线性度较好的收发链路，尤其是功放；非线性会造成幅度和相位失真。

特殊情况：

- 若 $b_i=0$，M-QAM 退化为 M-ASK；
- 若所有星座点能量相同且落在圆上，M-QAM 退化为 M-PSK。

---

### 18-5-4 M 进制频移键控 M-FSK

:::: definition M 进制频移键控 M-ary Frequency Shift Keying, M-FSK
**M 进制频移键控 M-ary Frequency Shift Keying, M-FSK** 用 $M$ 个不同频率表示 $M$ 个符号。
::::

课件中给出的 M-FSK 形式为：

$$
s_i(t)=
\sqrt{\frac{2E}{T}}
\cos{\left[\frac{\pi}{T}(n+i)t\right]},
\qquad i=0,1,\ldots,M-1.
$$

所有符号具有相同持续时间 $T$ 和相同能量 $E$。按该形式，符号频率为 $f_i=(n+i)/(2T)$，相邻频率间隔为 $1/(2T)$；在相应整数频率索引条件下，不同符号满足正交性：

$$
\int_0^T s_i(t)s_j(t)\,dt
=
\begin{cases}
E, & i=j,\\
0, & i\ne j.
\end{cases}
$$

M-FSK 也是恒包络调制，抗非线性能力较好。它通常比 M-PSK 和 M-QAM 占用更多带宽。

## 18-6 多载波调制与 OFDM Multi-carrier Modulation and OFDM

### 18-6-1 多载波调制 Multi-carrier Modulation

:::: definition 多载波调制 Multi-carrier Modulation
**多载波调制 Multi-carrier Modulation** 把高速数据流拆成多个低速子数据流，并行调制到多个子载波上传输。
::::

![多载波频谱](<CPS Lecture 18 Digital Modulation.attachments/multicarrier-spectrum-wide.png>)

单载波系统在频率选择性信道中容易受到严重 ISI。多载波系统把总带宽拆成多个窄带子信道，使每个子载波看到的信道近似平坦。

多载波调制的主要收益：

- 每个子载波符号周期变长，抗多径时延扩展能力提高；
- 频率选择性衰落被拆成多个窄带平坦衰落；
- 可按子载波信道质量分配功率和调制阶数。

---

### 18-6-2 正交频分复用 OFDM

:::: definition 正交频分复用 Orthogonal Frequency-Division Multiplexing, OFDM
**正交频分复用 Orthogonal Frequency-Division Multiplexing, OFDM** 是一种多载波调制技术。它使用彼此正交的子载波并行传输数据。
::::

![OFDM 系统](<CPS Lecture 18 Digital Modulation.attachments/ofdm-system.jpg>)

OFDM 的关键是子载波正交。若子载波间隔为：

$$
\Delta f=\frac{1}{T},
$$

则不同子载波在一个符号周期 $T$ 内满足：

$$
\int_0^T
e^{j2\pi k\Delta f t}
e^{-j2\pi l\Delta f t}\,dt
=0,\qquad k\ne l.
$$

这种正交性允许子载波频谱互相重叠，但在判决时仍可分离。现代 OFDM 通常用 IFFT/FFT 实现调制和解调。

> [!NOTE]
> 循环前缀 Cyclic Prefix, CP 是 OFDM 常见工程补充。它把每个 OFDM 符号尾部复制到前面，用一部分效率换取对多径 ISI 的鲁棒性。
