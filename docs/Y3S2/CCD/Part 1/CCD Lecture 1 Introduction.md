# Lecture 1 Introduction 电子通信导论

**请你随意，即便不必认真。**

![alt text](<CCD Lecture 1 Introduction.attachments/communication-system.jpg>)

## 章节目录

- [章节目录](#章节目录)
- [1-1 电子通信系统 Electronic Communication System](#1-1-电子通信系统-electronic-communication-system)
- [1-2 发射机、信道与接收机 Transmitter, Channel and Receiver](#1-2-发射机信道与接收机-transmitter-channel-and-receiver)
- [1-3 噪声 Noise](#1-3-噪声-noise)
- [1-4 增益与衰减 Gain and Attenuation](#1-4-增益与衰减-gain-and-attenuation)
- [1-5 分贝 Decibel](#1-5-分贝-decibel)
- [1-6 信噪比 Signal-to-Noise Ratio](#1-6-信噪比-signal-to-noise-ratio)
- [Summary](#summary)

## 1-1 电子通信系统 Electronic Communication System

通信指信息的交换。电子通信中，信息先被转换为电信号，再通过某种媒介传输到接收端。

:::: definition 电子通信系统 Electronic Communication System
一个基本电子通信系统由发射机、信道或媒介、接收机三部分组成。信息信号由发射机处理后进入信道，接收机从信道中取回信号并恢复为可使用的信息。
::::

![alt text](<CCD Lecture 1 Introduction.attachments/communication-system.jpg>)

通信过程可以写成

$$
\text{Information} \rightarrow \text{Transmitter} \rightarrow \text{Channel} \rightarrow \text{Receiver}
$$

需要注意，信道和接收机都会引入噪声，因此接收端得到的信号通常不是原始信号的完全复制。

## 1-2 发射机、信道与接收机 Transmitter, Channel and Receiver

### 发射机 Transmitter

发射机负责把原始电信号变成适合信道传输的形式。常见功能包括：

- 振荡器 Oscillator：产生载波或本振信号；
- 放大器 Amplifier：提高信号幅度或功率；
- 滤波器 Filter：限制频带，去除不需要的分量；
- 调制器 Modulator：把基带信息加载到高频载波上；
- 混频器 Mixer：进行频率搬移；
- 频率合成器 Frequency Synthesizer：产生所需频率。

![alt text](<CCD Lecture 1 Introduction.attachments/system-with-noise.jpg>)

### 信道 Channel

信道是信号传播的媒介。常见类型如下。

| 信道类型 | 例子 | 说明 |
| --- | --- | --- |
| 电导体 Electrical conductors | 双绞线、同轴线、电力线 | 直接传输电压或电流信号 |
| 光介质 Optical media | 光纤 | 将信息转换为光强变化后传输 |
| 自由空间 Free space | 无线电、红外、可见光通信 | 依靠电磁波传播 |
| 其他媒介 | 水、地面 | 声呐或低频通信中会出现 |

### 接收机 Receiver

接收机负责从信道中取出信号，并恢复原始信息。接收机中也会用到放大器、振荡器、混频器、滤波器和解调器。

:::: tip
收发信机 Transceiver 指发射机和接收机做在同一设备中，例如手机、无线电对讲机和调制解调器。
::::

## 1-3 噪声 Noise

:::: definition 噪声 Noise
噪声是出现在接收机输出端的非期望电压或电流。它会降低信息的可辨认程度，严重时会淹没有用信号。
::::

![alt text](<CCD Lecture 1 Introduction.attachments/noise.jpg>)

噪声按来源可分为两类。

| 类型 | 来源 | 例子 |
| --- | --- | --- |
| 外部噪声 External noise | 传输媒介或接收天线之前 | 人为噪声、大气噪声、空间噪声 |
| 内部噪声 Internal noise | 接收机内部器件 | 热噪声、晶体管噪声、频率相关噪声 |

热噪声常写为

$$
N = kTB
$$

其中 $k$ 为 Boltzmann 常数，$T$ 为绝对温度，$B$ 为噪声带宽。温度越高、带宽越宽，热噪声功率越大。

## 1-4 增益与衰减 Gain and Attenuation

:::: definition 增益 Gain
增益表示输出量与输入量之比。若输出幅度大于输入幅度，则电路具有增益。
::::

![alt text](<CCD Lecture 1 Introduction.attachments/gain.jpg>)

电压增益和功率增益分别为

$$
A_V = \frac{V_{\mathrm{out}}}{V_{\mathrm{in}}}
$$

$$
A_P = \frac{P_{\mathrm{out}}}{P_{\mathrm{in}}}
$$

:::: definition 衰减 Attenuation
衰减表示信号经过电路或媒介后幅度减小。若仍用输出与输入之比表示，则衰减电路的 $A < 1$。
::::

![alt text](<CCD Lecture 1 Introduction.attachments/attenuation.jpg>)

级联系统中，总增益或总衰减为各级比值的乘积：

$$
A_T = A_1 A_2 A_3 \cdots A_n
$$

需要注意，同一个字母 $A$ 有时表示 gain，有时表示 attenuation。判断时看比值是否大于 1。

## 1-5 分贝 Decibel

分贝用于表示很大或很小的功率比、幅度比。乘法关系换成分贝后可直接相加，因此在通信系统中很常用。

功率比的分贝表示为

$$
G_{\mathrm{dB}} = 10 \log_{10}\frac{P_{\mathrm{out}}}{P_{\mathrm{in}}}
$$

若两端阻抗相同，电压比和电流比可写为

$$
G_{\mathrm{dB}} = 20 \log_{10}\frac{V_{\mathrm{out}}}{V_{\mathrm{in}}}
$$

$$
G_{\mathrm{dB}} = 20 \log_{10}\frac{I_{\mathrm{out}}}{I_{\mathrm{in}}}
$$

:::: tip
电压和电流前面是 20，是因为功率与电压平方或电流平方成正比。若两端阻抗不同，不能直接用 $20\log$ 的形式。
::::

常用绝对功率单位：

| 单位 | 参考功率 | 公式 |
| --- | --- | --- |
| dBm | $1\,\mathrm{mW}$ | $P_{\mathrm{dBm}} = 10\log_{10}\dfrac{P}{1\,\mathrm{mW}}$ |
| dBW | $1\,\mathrm{W}$ | $P_{\mathrm{dBW}} = 10\log_{10}\dfrac{P}{1\,\mathrm{W}}$ |

## 1-6 信噪比 Signal-to-Noise Ratio

:::: definition 信噪比 SNR
信噪比为有用信号功率与噪声功率之比，用来衡量接收信号质量。
::::

线性形式为

$$
\mathrm{SNR} = \frac{S}{N} = \frac{P_S}{P_N}
$$

分贝形式为

$$
\mathrm{SNR}_{\mathrm{dB}} = 10\log_{10}\frac{P_S}{P_N}
$$

SNR 越大，接收端越容易恢复原始信息。若系统中有多级放大，前级噪声通常影响更明显，因为后续级会把前级噪声一起放大。

:::: stem
证明 $1\,\mathrm{mW}$ 对应 $0\,\mathrm{dBm}$。
::::

:::: solution
由 dBm 定义

$$
P_{\mathrm{dBm}} = 10\log_{10}\frac{P}{1\,\mathrm{mW}}
$$

代入 $P=1\,\mathrm{mW}$ 可得

$$
P_{\mathrm{dBm}} = 10\log_{10}1 = 0\,\mathrm{dBm}
$$
::::

---

:::: stem
求 $600\,\Omega$ 负载上 $0\,\mathrm{dBm}$ 对应的 RMS 电压。
::::

:::: solution
$0\,\mathrm{dBm}$ 对应

$$
P = 1\,\mathrm{mW}
$$

由

$$
P = \frac{V_{\mathrm{rms}}^2}{R}
$$

可得

$$
V_{\mathrm{rms}} = \sqrt{PR}
= \sqrt{(1\times 10^{-3})(600)}
= 0.775\,\mathrm{V}
$$
::::

## Summary

| 内容 | 公式 / 结论 | 使用条件 |
| --- | --- | --- |
| 基本通信系统 | Transmitter + Channel + Receiver | 所有电子通信系统的基本抽象 |
| 电压增益 | $A_V = V_{\mathrm{out}} / V_{\mathrm{in}}$ | 幅度比 |
| 功率增益 | $A_P = P_{\mathrm{out}} / P_{\mathrm{in}}$ | 功率比 |
| 级联系统 | $A_T=A_1A_2\cdots A_n$ | 线性比值相乘 |
| 功率分贝 | $10\log_{10}(P_{\mathrm{out}}/P_{\mathrm{in}})$ | 功率比 |
| 电压分贝 | $20\log_{10}(V_{\mathrm{out}}/V_{\mathrm{in}})$ | 相同阻抗 |
| 信噪比 | $\mathrm{SNR}_{\mathrm{dB}}=10\log_{10}(P_S/P_N)$ | 信号与噪声功率比较 |
