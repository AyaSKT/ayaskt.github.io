---
lastUpdated: 2026-06-21T22:47:31+08:00
---
# Lecture 17 RF Receivers 射频接收机

<LyricCover
  image="CCD Lecture 17 RF Receivers.attachments/1782053769829.jpg"
  title="堕天"
  artist="Creepy Nuts"
  lang="ja"
  default-furigana
  qq-url="https://y.qq.com/n/ryqq/songDetail/002MVjb31ZNK5m"
  netease-url="https://music.163.com/#/song?id=1958186823"
>
  <LyricLine
    original="もうひと｜雫(しずく)… again，"
    translation="再来一滴… 再来一次，"
  />
  <LyricLine
    original="fallin’ falling，"
    translation="堕落，陨落吧，"
  />
  <LyricLine
    original="｜螺旋状(らせんじょう)に｜堕(お)ちてゆく｜摩天楼(まてんろう)に，"
    translation="从摩天大楼螺旋而堕。"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [17-1 接收机基本任务 Receiver Basics](#17-1-接收机基本任务-receiver-basics)
  - [17-1-1 接收机功能 Receiver Functions](#17-1-1-接收机功能-receiver-functions)
  - [17-1-2 设计要求 Design Requirements](#17-1-2-设计要求-design-requirements)
- [17-2 TRF 接收机 Tuned Radio Frequency Receiver](#17-2-trf-接收机-tuned-radio-frequency-receiver)
  - [17-2-1 TRF 结构 TRF Structure](#17-2-1-trf-结构-trf-structure)
  - [17-2-2 TRF 优缺点 Advantages and Limits](#17-2-2-trf-优缺点-advantages-and-limits)
- [17-3 超外差接收机 Superheterodyne Receiver](#17-3-超外差接收机-superheterodyne-receiver)
  - [17-3-1 从 TRF 到外差 From TRF to Heterodyne](#17-3-1-从-trf-到外差-from-trf-to-heterodyne)
  - [17-3-2 Superhet 分级 Blocks of Superhet](#17-3-2-superhet-分级-blocks-of-superhet)
  - [17-3-3 频率变换 Frequency Conversion](#17-3-3-频率变换-frequency-conversion)
- [17-4 接收机质量指标 Receiver Quality Metrics](#17-4-接收机质量指标-receiver-quality-metrics)
  - [17-4-1 选择性 Selectivity](#17-4-1-选择性-selectivity)
  - [17-4-2 灵敏度 Sensitivity](#17-4-2-灵敏度-sensitivity)
  - [17-4-3 保真度 Fidelity](#17-4-3-保真度-fidelity)
  - [17-4-4 动态范围 Dynamic Range](#17-4-4-动态范围-dynamic-range)
- [17-5 非线性指标 Nonlinearity Metrics](#17-5-非线性指标-nonlinearity-metrics)
  - [17-5-1 接收机非线性模型 Receiver Nonlinear Model](#17-5-1-接收机非线性模型-receiver-nonlinear-model)
  - [17-5-2 谐波失真 Harmonic Distortion](#17-5-2-谐波失真-harmonic-distortion)
  - [17-5-3 1 dB 压缩点 1 dB Compression Point](#17-5-3-1-db-压缩点-1-db-compression-point)
  - [17-5-4 互调失真 Intermodulation](#17-5-4-互调失真-intermodulation)
  - [17-5-5 三阶截点 Third-Order Intercept Point](#17-5-5-三阶截点-third-order-intercept-point)
- [17-6 镜像频率 Image Frequency](#17-6-镜像频率-image-frequency)
  - [17-6-1 镜像频率定义 Image Frequency Definition](#17-6-1-镜像频率定义-image-frequency-definition)
  - [17-6-2 镜像抑制 Image Rejection](#17-6-2-镜像抑制-image-rejection)
  - [17-6-3 外差频率例题 Heterodyne Examples](#17-6-3-外差频率例题-heterodyne-examples)
- [17-7 噪声、灵敏度与 Friis 公式 Noise, Sensitivity and Friis Formula](#17-7-噪声灵敏度与-friis-公式-noise-sensitivity-and-friis-formula)
  - [17-7-1 热噪声与噪声底 Thermal Noise and Noise Floor](#17-7-1-热噪声与噪声底-thermal-noise-and-noise-floor)
  - [17-7-2 灵敏度与动态范围 Sensitivity and Dynamic Range](#17-7-2-灵敏度与动态范围-sensitivity-and-dynamic-range)
  - [17-7-3 噪声因子与噪声系数 Noise Factor and Noise Figure](#17-7-3-噪声因子与噪声系数-noise-factor-and-noise-figure)
  - [17-7-4 等效噪声温度 Equivalent Noise Temperature](#17-7-4-等效噪声温度-equivalent-noise-temperature)
  - [17-7-5 级联系统 Friis 公式 Friis Formula for Cascaded Systems](#17-7-5-级联系统-friis-公式-friis-formula-for-cascaded-systems)
  - [17-7-6 噪声例题 Noise Examples](#17-7-6-噪声例题-noise-examples)
- [Summary](#summary)

## 17-1 接收机基本任务 Receiver Basics

### 17-1-1 接收机功能 Receiver Functions

:::: definition 射频接收机 RF Receiver
**射频接收机 RF Receiver** 是从天线接收到的调制信号中选出目标信号、抑制非目标信号，并通过解调恢复原始信息的电子系统。
::::

接收机的输入是带有载波的 RF signal。目标是留下 desired signal，去掉 unwanted signal，再把 carrier 上的信息恢复成基带或音频信号。

典型功能可以按信号链写成：

$$
\text{Intercept}
\rightarrow
\text{Select}
\rightarrow
\text{Amplify}
\rightarrow
\text{Demodulate}
\rightarrow
\text{Audio/Baseband Amplify}
$$

也就是：

| 功能 | 说明 |
| --- | --- |
| Intercept incoming modulated signal | 天线截获空间中的调制信号 |
| Select desired and reject unwanted signals | 选出目标频道，抑制邻近频道和干扰 |
| Amplify desired signal | 放大弱 RF 信号 |
| Demodulate detected signal | 从载波中恢复信息 |
| Amplify modulating frequency signal | 放大音频或基带输出 |

---

### 17-1-2 设计要求 Design Requirements

接收机设计先看应用类型。AM、FM、SSB、数字调制对带宽、解调器和线性度的要求不同。

基本要求：

- 能 tune 到目标频率；
- 能放大 desired signal；
- 能 filter out other stations；
- demodulator 能在目标频率范围内工作；
- 噪声和非线性不能把输出毁掉。

接收机不是只追求 gain。gain 过高会引入振荡、压缩、互调和噪声问题。RF front-end 的设计通常是在 sensitivity、selectivity、linearity、noise figure 和 cost 之间折中。

## 17-2 TRF 接收机 Tuned Radio Frequency Receiver

### 17-2-1 TRF 结构 TRF Structure

![TRF 接收机结构](<CCD Lecture 17 RF Receivers.attachments/rf_trf_receiver.jpg>)

:::: definition 调谐射频接收机 Tuned Radio Frequency Receiver
**TRF 接收机 Tuned Radio Frequency Receiver** 是最早、最简单的无线接收机结构。它不做频率变换，所有 RF 级都直接调谐到目标载波频率。
::::

AM 场景中，TRF 的基本链路为：

$$
\text{Antenna}
\rightarrow
\text{RF Amplifier}
\rightarrow
\text{Envelope Detector}
\rightarrow
\text{Audio Amplifier}
$$

TRF 没有 mixer 和 IF stage。因此 RF amplifier、detector 前的 tuned circuit 等模块都要随目标载波频率 $\omega_c$ 一起调谐。

TRF receiver 可分成三段：

| Stage | 作用 |
| --- | --- |
| RF stage | 检测、限带并放大接收的 RF signal |
| Detector stage | 解调并恢复原始信号 |
| Audio stage | 放大恢复后的音频信号 |

---

### 17-2-2 TRF 优缺点 Advantages and Limits

TRF 的优点是结构简单，适合接收单一固定频率。若只看一个频点，所有 tuned circuit 都可以围绕该频点优化。

主要问题来自高频、多级放大和可调谐滤波：

| 问题 | 原因 | 影响 |
| --- | --- | --- |
| Instability | 多级高频放大器存在 stray capacitance feedback | 小反馈可能被高 gain 放大成振荡 |
| Variation in bandwidth | 固定 $Q$ 时 $BW=f_0/Q$ | 中心频率越高，带宽越宽 |
| Poor selectivity | 高频窄带滤波要求高 $Q$ 或多级滤波 | 邻近台可能一起被选入 |
| Poor audio quality | 选择性和稳定性不足 | 解调输出畸变或混入干扰 |

由

$$
Q=\frac{f_0}{BW}
$$

可得

$$
BW=\frac{f_0}{Q}
$$

若 $Q$ 近似固定，调谐中心频率 $f_0$ 越高，带宽 $BW$ 越大。TRF 在宽频段调谐时会出现带宽不一致。

:::: tip
TRF 的核心缺陷在于高频下稳定放大和窄带选择难以同时做到，问题不在能否放大本身。
::::

## 17-3 超外差接收机 Superheterodyne Receiver

### 17-3-1 从 TRF 到外差 From TRF to Heterodyne

![超外差接收机结构](<CCD Lecture 17 RF Receivers.attachments/rf_superhet_receiver.jpg>)

:::: definition 外差 Heterodyne
**外差 Heterodyne** 是把 RF signal 与 local oscillator signal 在 mixer 中相乘，产生和频与差频分量，从而完成 frequency conversion 的过程。
::::

现代 RF 接收机多数使用 heterodyne receiver。接收信号先与 LO 混频，下变频到固定的 **中频 Intermediate Frequency, IF**，再进行主要放大、滤波和解调。

基本关系：

$$
f_{\mathrm{IF}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

高频 RF 被变到较低且固定的 IF 后，IF amplifier 和 IF filter 不需要随目标电台频率改变。只要 RF preselector 和 LO 同步调谐，不同 RF 频道都能落到同一个 IF。

Superheterodyne 解决了 TRF 的三个主要问题：

| TRF 问题 | Superhet 处理方式 |
| --- | --- |
| 高频稳定性差 | 高增益主要放在较低 IF，寄生电容反馈影响减弱 |
| 带宽随中心频率变化 | IF filter 工作在固定频率，带宽更可控 |
| 选择性差 | IF stage 可使用稳定窄带滤波器 |

AM receiver 常见 IF 在约 $438\text{--}465\,\mathrm{kHz}$。具体 IF 由系统标准、镜像抑制和 IF gain stability 折中决定。

---

### 17-3-2 Superhet 分级 Blocks of Superhet

Superheterodyne receiver 可以拆成几个连续模块。

**RF Section**

RF section 包括 pre-selector 和 RF amplifier。Pre-selector 是中心频率可调的 broad-tuned bandpass filter，用于初步抑制 unwanted RF signals，并减少进入后级的噪声带宽。

RF amplifier 决定接收机 sensitivity，并且强烈影响 receiver noise figure。前级噪声会被后面所有级放大，所以 RF amplifier 通常要做成 low-noise amplifier。

**Mixer / Converter Section**

Mixer/converter section 包括 RF oscillator 或 VCO，以及 mixer。Mixer 是非线性器件，用来把 RF 转换成 IF。

频率变换不应改变调制包络本身。理想情况下，envelope shape、signal bandwidth 和 original information 保持不变，只是 carrier 和 sideband 的绝对频率从 RF 搬移到 IF。

**Intermediate Frequency Section**

IF section 包括多级 IF amplifiers 和 bandpass filters。接收机的大部分 gain 和 selectivity 通常在这里完成。

IF 低于 RF，所以高 gain、稳定、窄带的放大器更容易实现。IF amplifiers 也比 RF amplifiers 更不容易在高频寄生反馈下振荡。

**Detector and Audio Section**

Detector section 把 IF signal 解调回原始信息。AM 可用 envelope detector，FM 可用 PLL detector 或其他 frequency discriminator。

Audio amplifier section 则继续放大恢复出的音频或基带信号，并推动 speaker 或后续处理电路。

**Automatic Gain Control**

:::: definition 自动增益控制 Automatic Gain Control
**AGC** 是根据接收信号强弱自动调节接收机总增益，使输出幅度尽量稳定的反馈机制。
::::

AGC 常根据平均信号幅度调节 IF amplifier gain。强信号进入时降低增益，弱信号进入时提高增益，从而减少输出音量或基带幅度的大幅波动。

---

### 17-3-3 频率变换 Frequency Conversion

接收机的 mixer 将 RF signal 与 LO signal 合成，输出包含和频与差频：

$$
f_{\mathrm{sum}}=f_{\mathrm{RF}}+f_{\mathrm{LO}}
$$

$$
f_{\mathrm{diff}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

IF 通常取差频：

$$
f_{\mathrm{IF}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

若 LO 频率高于 RF，称为 **高边注入 High-Side Injection**：

$$
f_{\mathrm{LO}}>f_{\mathrm{RF}}
$$

$$
f_{\mathrm{LO}}=f_{\mathrm{RF}}+f_{\mathrm{IF}}
$$

若 LO 频率低于 RF，称为 **低边注入 Low-Side Injection**：

$$
f_{\mathrm{LO}}<f_{\mathrm{RF}}
$$

$$
f_{\mathrm{LO}}=f_{\mathrm{RF}}-f_{\mathrm{IF}}
$$

Preselector 和 LO 需要 gang-tuned。也就是调电台时，RF filter 的中心频率跟目标 RF 一起变，LO 同时变，使差频始终等于固定 IF。

## 17-4 接收机质量指标 Receiver Quality Metrics

### 17-4-1 选择性 Selectivity

:::: definition 选择性 Selectivity
**选择性 Selectivity** 是接收机区分 desired signal 和 unwanted signals 的能力。
::::

选择性描述接收机能否在目标 RF signal 与邻近干扰之间留出足够隔离。通常依靠 tuned bandpass filters 实现。

LC tuned circuit 的 $Q$ factor 决定滤波曲线窄宽：

$$
Q=\frac{f_0}{BW}
$$

$Q$ 越高，带宽越窄，selectivity 越好。实际设计中，过高的 $Q$ 会带来调谐困难、损耗和制造成本。

---

### 17-4-2 灵敏度 Sensitivity

:::: definition 灵敏度 Sensitivity
**灵敏度 Sensitivity** 是接收机在满足指定 SNR 的前提下仍能可靠接收的最小 RF signal level。
::::

Sensitivity 衡量接收机识别和放大弱信号的能力。它通常由 receiver gain、input noise power 和 receiver noise figure 共同决定。

灵敏度越高，弱信号越容易被接收。但 sensitivity 不是无限越高越好。前端过宽、增益过高时，unwanted signals 和 noise 也会一起进来。

常见影响因素：

- 输入端 thermal noise；
- receiver noise figure；
- RF/IF gain distribution；
- required output SNR；
- receiver bandwidth。

---

### 17-4-3 保真度 Fidelity

:::: definition 保真度 Fidelity
**保真度 Fidelity** 是接收机输出信号复制原始信息信号的准确程度。
::::

若 demodulated signal 中出现源信息不存在的变化，就属于 distortion。AM 接收机中的 envelope distortion、FM 解调器中的非线性频率-电压关系，以及放大器压缩都可能降低 fidelity。

高 fidelity 要求 demodulator、filters 和 amplifiers 的幅频、相频和线性范围都满足信号要求。

---

### 17-4-4 动态范围 Dynamic Range

:::: definition 动态范围 Dynamic Range
**动态范围 Dynamic Range, DR** 是接收机仍能可靠处理的最大 RF signal 与最小 RF signal 之间的幅度比。
::::

若用电压幅度比表示：

$$
DR
=
20\log_{10}
\left(
\frac{V_{\max}}{V_{\min}}
\right)
\qquad \mathrm{dB}
$$

课件例子中，最小幅度为 $1\,\mathrm{mV}$，最大幅度为 $1\,\mathrm{V}$：

$$
DR
=
20\log_{10}
\left(
\frac{1}{0.001}
\right)
=
60\,\mathrm{dB}
$$

Typical receivers 的 $DR$ 可达到或超过 $100\,\mathrm{dB}$。动态范围越宽，成本通常越高。

DR 的下限由 noise floor 和 required SNR 决定，上限常由 1 dB compression point 或 IIP3 决定。电源电压、mixer/amplifier linearity 和前端滤波都会影响上限。

## 17-5 非线性指标 Nonlinearity Metrics

### 17-5-1 接收机非线性模型 Receiver Nonlinear Model

RF receiver 中的 mixers 和 amplifiers 都可能产生非线性。把整个 receiver 看成一个输入 $x(t)$、输出 $y(t)$ 的模块，可以写成多项式模型：

$$
y(t)
=
a_0+a_1x(t)+a_2x^2(t)+a_3x^3(t)+\cdots
$$

$a_1x(t)$ 是线性项。$a_2x^2(t)$、$a_3x^3(t)$ 等高阶项会产生 harmonic distortion、gain compression 和 intermodulation。

:::: tip
二阶项常产生 DC、二次谐波、和频与差频。三阶项常产生三次谐波、gain compression 和接近原信号的 IM3 分量。
::::

---

### 17-5-2 谐波失真 Harmonic Distortion

设输入为单音：

$$
x(t)=B\cos{(\omega t)}
$$

去掉 DC 输入项，代入非线性模型：

$$
\begin{aligned}
y(t)
&=
a_1B\cos{(\omega t)}
+a_2B^2\cos^2{(\omega t)}
+a_3B^3\cos^3{(\omega t)}
+\cdots
\\
&=
\frac{a_2B^2}{2}
+
\left(
a_1B+\frac{3a_3B^3}{4}
\right)
\cos{(\omega t)}
\\
&\quad
+
\frac{a_2B^2}{2}\cos{(2\omega t)}
+
\frac{a_3B^3}{4}\cos{(3\omega t)}
+\cdots
\end{aligned}
$$

于是可写成：

$$
y(t)
=
b_0+b_1\cos{(\omega t)}
+b_2\cos{(2\omega t)}
+b_3\cos{(3\omega t)}
+\cdots
$$

其中：

$$
b_0=\frac{a_2B^2}{2}
$$

$$
b_1=a_1B+\frac{3a_3B^3}{4}
$$

$$
b_2=\frac{a_2B^2}{2},
\qquad
b_3=\frac{a_3B^3}{4}
$$

原本输入只有 $\omega$，输出中多出了 $2\omega$、$3\omega$ 等高阶谐波。这些分量来自 transfer characteristic 的非线性。

:::: definition 总谐波失真 Total Harmonic Distortion
**THD** 用高阶谐波幅度相对基波幅度的比例衡量 harmonic distortion。
::::

各阶失真比例：

$$
D_2=\frac{b_2}{b_1},
\qquad
D_3=\frac{b_3}{b_1},
\qquad
D_4=\frac{b_4}{b_1},
\ldots
$$

总谐波失真为：

$$
THD
=
\sqrt{
D_2^2+D_3^2+\cdots
}
$$

---

### 17-5-3 1 dB 压缩点 1 dB Compression Point

![1 dB 压缩点](<CCD Lecture 17 RF Receivers.attachments/rf_gain_compression.jpg>)

:::: definition 1 dB 压缩点 1 dB Compression Point
**1 dB compression point** 是实际输出功率比理想线性外推值低 $1\,\mathrm{dB}$ 时对应的输入功率。
::::

小信号下，输出功率近似满足：

$$
P_{\mathrm{out}}=AP_{\mathrm{in}}
$$

输入继续增大时，电源、电路摆幅和器件非线性会限制输出增长。输出曲线开始低于理想直线，gain 被 compressed。

从单音推导可知，基波理想幅度为：

$$
V_{\mathrm{out}}=a_1B
$$

含三阶非线性后的基波幅度为：

$$
V_{\mathrm{out}}'
=
a_1B+\frac{3a_3B^3}{4}
$$

两者幅度比：

$$
\left|
\frac{V_{\mathrm{out}}'}{V_{\mathrm{out}}}
\right|
=
\left|
1+\frac{3a_3B^2}{4a_1}
\right|
$$

1 dB compression 的条件为：

$$
20\log_{10}
\left|
1+\frac{3a_3B^2}{4a_1}
\right|
=
-1\,\mathrm{dB}
$$

若三阶项导致压缩，常取 $a_3<0$，可得课件给出的幅度结果：

$$
B_{1\mathrm{dB}}
=
\sqrt{
0.145
\left|
\frac{a_1}{a_3}
\right|
}
$$

若用输入幅度的 dB 表示：

$$
S_{\mathrm{in}}(1\,\mathrm{dB})
=
20\log_{10}{B_{1\mathrm{dB}}}
$$

1 dB compression point 常作为动态范围上限之一。它描述的是强信号进入后，接收机开始明显偏离线性工作的边界。

---

### 17-5-4 互调失真 Intermodulation

![双音输入频谱](<CCD Lecture 17 RF Receivers.attachments/rf_two_tone_input.jpg>)

两个输入 tone 进入非线性接收机：

$$
x(t)
=
B_1\cos{(\omega_a t)}
+
B_2\cos{(\omega_b t)}
$$

输出不仅包含 $\omega_a$、$\omega_b$ 及其谐波，还会包含由非线性生成的 intermodulation products。

二阶项会生成：

$$
2\omega_a,\quad
2\omega_b,\quad
\omega_a+\omega_b,\quad
\left| \omega_a-\omega_b \right|
$$

三阶项会生成：

$$
3\omega_a,\quad
3\omega_b,\quad
2\omega_a\pm\omega_b,\quad
2\omega_b\pm\omega_a
$$

当 $\omega_a$ 与 $\omega_b$ 很接近时，三阶分量

$$
2\omega_a-\omega_b
$$

和

$$
2\omega_b-\omega_a
$$

会落在原始两个 tone 附近，滤波很难去掉。

![双音输出频谱](<CCD Lecture 17 RF Receivers.attachments/rf_two_tone_output.jpg>)

对接收机来说，IM3 比远离信号的谐波更麻烦。它可能落进同一个 channel 或邻近 channel，直接污染 wanted signal。

---

### 17-5-5 三阶截点 Third-Order Intercept Point

:::: definition 三阶输入截点 Third-Order Input Intercept Point
**IIP3** 是把 fundamental output 与 third-order intermodulation output 的小信号线性趋势外推后，两者相交时对应的输入功率。
::::

在 two-tone test 中，若 $B_1=B_2=B$ 且 $B$ 较小，fundamental tone 的主要系数近似为：

$$
a_1B
$$

三阶互调分量的系数近似为：

$$
\frac{3a_3B^3}{4}
$$

令两者相等，可得 IIP3 对应输入幅度：

$$
a_1B
=
\frac{3a_3B^3}{4}
$$

$$
B_{\mathrm{IIP3}}
=
\sqrt{
\frac{4}{3}
\left|
\frac{a_1}{a_3}
\right|
}
$$

与 1 dB compression point 对比：

$$
B_{1\mathrm{dB}}
=
\sqrt{
0.145
\left|
\frac{a_1}{a_3}
\right|
}
$$

换成幅度 dB 后，两者相差约：

$$
20\log_{10}
\left(
\frac{B_{\mathrm{IIP3}}}{B_{1\mathrm{dB}}}
\right)
\approx
9.6\,\mathrm{dB}
$$

因此常写作：

$$
P_{\mathrm{IIP3}}
\approx
P_{1\mathrm{dB}}+9.6\,\mathrm{dB}
$$

该关系来自课件的三阶多项式模型，是近似经验关系，不是所有真实电路都严格满足。

![IIP3 频谱测量关系](<CCD Lecture 17 RF Receivers.attachments/rf_iip3_spectrum.jpg>)

在 dB 图上，fundamental 的斜率是 $1:1$，third-order term 的斜率是 $3:1$。若在某个输入功率 $P_{\mathrm{in}}$ 处测得 fundamental 与 IM3 的功率差为 $\Delta P$，则：

$$
\boxed{
IIP3
=
P_{\mathrm{in}}
+
\frac{\Delta P}{2}
}
\qquad \mathrm{dB}
$$

IIP3 越高，表示小信号区三阶互调越弱，接收机线性度越好。

## 17-6 镜像频率 Image Frequency

### 17-6-1 镜像频率定义 Image Frequency Definition

:::: definition 镜像频率 Image Frequency
**镜像频率 Image Frequency** 是目标 RF carrier 以外的某个 RF frequency。它若进入 mixer，会与 LO 产生同一个 IF，从而与 desired signal 在 IF 上重叠。
::::

Mixer 只看频率差：

$$
f_{\mathrm{IF}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

因此只要另一个 RF signal 与 LO 的差频也等于 $f_{\mathrm{IF}}$，它就会被 down-convert 到同一个 IF。

以高边注入为例：

$$
f_{\mathrm{LO}}
=
f_{\mathrm{RF}}+f_{\mathrm{IF}}
$$

镜像频率在 LO 的另一侧：

$$
f_{\mathrm{image}}
=
f_{\mathrm{LO}}+f_{\mathrm{IF}}
=
f_{\mathrm{RF}}+2f_{\mathrm{IF}}
$$

低边注入时：

$$
f_{\mathrm{LO}}
=
f_{\mathrm{RF}}-f_{\mathrm{IF}}
$$

镜像频率为：

$$
f_{\mathrm{image}}
=
f_{\mathrm{LO}}-f_{\mathrm{IF}}
=
f_{\mathrm{RF}}-2f_{\mathrm{IF}}
$$

图上可以记成：desired RF 与 image RF 分别在 LO 两侧，二者间隔为 $2f_{\mathrm{IF}}$。

![镜像频率位置](<CCD Lecture 17 RF Receivers.attachments/rf_image_frequency.jpg>)

镜像频率一旦被下变频到 IF，就无法再靠 IF filter 区分。它必须在 mixer 前由 RF preselector 或 image-rejection filter 抑制。

---

### 17-6-2 镜像抑制 Image Rejection

处理 image/ghost frequency 的方法：

- 提高 image-rejection filter 的 $Q$ factor；
- 通过频谱规划让邻近 transmitter frequency 保持最小间隔；
- 禁止某些容易产生干扰的频段用于发射；
- 使用 two-stage superheterodyne receiver；
- 合理选择 IF。

IF 的选择是典型折中。较高 IF 让 desired RF 与 image RF 的距离 $2f_{\mathrm{IF}}$ 变大，image rejection 更容易；但较高 IF 下稳定高增益 IF amplifier 更难做。

:::: tip
高 IF 有利于 image rejection，低 IF 有利于 IF gain stability 和窄带滤波。Superhet 的 IF 不是随便选的。
::::

---

### 17-6-3 外差频率例题 Heterodyne Examples

:::: stem L17-E1
**High-Side Injection LO Range**

Superheterodyne receiver 接收 $4\text{--}6\,\mathrm{MHz}$ carrier，IF 为 $850\,\mathrm{kHz}$。使用 high-side injection，求 LO frequency range。
::::

:::: solution
High-side injection 满足：

$$
f_{\mathrm{LO}}
=
f_c+f_{\mathrm{IF}}
$$

最低 LO：

$$
f_{\mathrm{LO,min}}
=
4\,\mathrm{MHz}+0.85\,\mathrm{MHz}
=
4.85\,\mathrm{MHz}
$$

最高 LO：

$$
f_{\mathrm{LO,max}}
=
6\,\mathrm{MHz}+0.85\,\mathrm{MHz}
=
6.85\,\mathrm{MHz}
$$

因此：

$$
\boxed{
4.85\,\mathrm{MHz}
\le
f_{\mathrm{LO}}
\le
6.85\,\mathrm{MHz}
}
$$
::::

:::: stem L17-E2
**RF Filter Q and Image Frequency**

RF amplifier/filter 是 RLC parallel tuned circuit，$-3\,\mathrm{dB}$ 带宽为 $200\,\mathrm{kHz}$。它调谐到 $5\,\mathrm{MHz}$，IF 为 $850\,\mathrm{kHz}$，使用 high-side injection。求 $Q$ 与 image frequency。
::::

:::: solution
滤波器 $Q$ 为：

$$
Q=\frac{f_0}{BW}
=
\frac{5\times10^6}{200\times10^3}
=
25
$$

High-side injection 的 image frequency 为：

$$
f_{\mathrm{image}}
=
f_c+2f_{\mathrm{IF}}
$$

代入：

$$
f_{\mathrm{image}}
=
5\,\mathrm{MHz}
+2(0.85\,\mathrm{MHz})
=
6.7\,\mathrm{MHz}
$$
::::

:::: stem L17-E3
**Image Reception**

Superheterodyne receiver 调谐到 $85\,\mathrm{MHz}$ signal，LO 工作在 $110\,\mathrm{MHz}$。求能造成 image reception 的 incoming frequency。
::::

:::: solution
先求 IF：

$$
f_{\mathrm{IF}}
=
f_{\mathrm{LO}}-f_c
=
110\,\mathrm{MHz}-85\,\mathrm{MHz}
=
25\,\mathrm{MHz}
$$

此处是 high-side injection，所以：

$$
f_{\mathrm{image}}
=
f_c+2f_{\mathrm{IF}}
=
85\,\mathrm{MHz}
+50\,\mathrm{MHz}
=
135\,\mathrm{MHz}
$$
::::

## 17-7 噪声、灵敏度与 Friis 公式 Noise, Sensitivity and Friis Formula

### 17-7-1 热噪声与噪声底 Thermal Noise and Noise Floor

:::: definition 噪声底 Noise Floor
**噪声底 Noise Floor** 是系统背景噪声形成的最低可检测功率基准。接收信号必须高于该噪声基准并满足所需 SNR，才可被可靠处理。
::::

热噪声功率为：

$$
P_n=kT\Delta f
\qquad \mathrm{W}
$$

其中：

- $k=1.38\times10^{-23}\,\mathrm{J/K}$：Boltzmann constant；
- $T$：absolute temperature；
- $\Delta f$ 或 $B$：system bandwidth。

在室温 $T=290\,\mathrm{K}$ 下，归一化到每 Hz 带宽：

$$
P_n=kT
=
1.38\times10^{-23}\times290
\qquad \mathrm{W/Hz}
$$

换成 dBm：

$$
\boxed{
P_n
=
-174\,\mathrm{dBm/Hz}
}
$$

也可写成：

$$
P_n
=
-204\,\mathrm{dBW/Hz}
$$

实际 RF signal 占用带宽 $B$，理想热噪声底为：

$$
P_n
=
-174+10\log_{10}{B}
\qquad \mathrm{dBm}
$$

$B$ 用 Hz 代入。若考虑 receiver noise figure：

$$
\boxed{
P_n
=
-174+10\log_{10}{B}+NF
}
\qquad \mathrm{dBm}
$$

降低 noise floor 的直接方法是降低 temperature 或减少 bandwidth。实际接收机还要降低 front-end noise figure。

---

### 17-7-2 灵敏度与动态范围 Sensitivity and Dynamic Range

灵敏度是满足指定输出 SNR 的最小输入信号功率：

$$
\boxed{
S_n
=
P_n+SNR_{\mathrm{desired}}
}
\qquad \mathrm{dBm}
$$

若把 1 dB compression point 作为上限，理想动态范围为：

$$
DR_{\mathrm{ideal}}
=
P_{1\mathrm{dB}}-S_n
\qquad \mathrm{dB}
$$

也可以用 IIP3 作为线性上限指标。课件给出的是乐观估计，实际 DR 常会按约 $2/3$ 取更保守的 usable range。

![接收机噪声底与动态范围](<CCD Lecture 17 RF Receivers.attachments/rf_noise_floor_metrics.jpg>)

图中从下到上依次是：

$$
-174\,\mathrm{dBm/Hz}
\rightarrow
10\log_{10}{\Delta f}
\rightarrow
NF
\rightarrow
SNR_{\mathrm{desired}}
\rightarrow
S_n
$$

再往上到 IIP3 或 1 dB compression，是 receiver 可用动态范围的上限。

---

### 17-7-3 噪声因子与噪声系数 Noise Factor and Noise Figure

:::: definition 噪声因子 Noise Factor
**Noise Factor** 定义为输入信噪比与输出信噪比之比，衡量接收机使 SNR 退化的程度。

$$
F=\frac{SNR_i}{SNR_o}
$$
::::

:::: definition 噪声系数 Noise Figure
**Noise Figure** 是 noise factor 的 dB 表示。

$$
NF=10\log_{10}{F}
\qquad \mathrm{dB}
$$
::::

理想接收机没有额外噪声：

$$
F=1,
\qquad
NF=0\,\mathrm{dB}
$$

真实接收机中的电阻、晶体管、mixer 和 amplifier 都会加噪声，因此：

$$
F>1,
\qquad
NF>0\,\mathrm{dB}
$$

若输入噪声为 $N_i$，接收机自身添加噪声为 $N_a$，输出噪声为

$$
N_o=N_i+N_a
$$

则：

$$
F
=
\frac{S/N_i}{S/N_o}
=
\frac{S}{N_i}
\cdot
\frac{N_i+N_a}{S}
$$

$$
\boxed{
F
=
1+\frac{N_a}{N_i}
}
$$

---

### 17-7-4 等效噪声温度 Equivalent Noise Temperature

Noise factor 也可用 equivalent noise temperature 表示。设输入参考温度为 $T_i=290\,\mathrm{K}$，接收机等效附加噪声温度为 $T_e$。

输入热噪声：

$$
N_i=kT_iB
$$

等效输出噪声可写成由总等效温度产生：

$$
T_o=T_i+T_e
$$

因此：

$$
F
=
\frac{S_i/(kT_iB)}{GS_i/(GkT_oB)}
=
\frac{T_i+T_e}{T_i}
$$

故：

$$
\boxed{
F=1+\frac{T_e}{T_i}
}
$$

$$
\boxed{
T_e=T_i(F-1)=290(F-1)
}
$$

---

### 17-7-5 级联系统 Friis 公式 Friis Formula for Cascaded Systems

![两级系统噪声因子](<CCD Lecture 17 RF Receivers.attachments/rf_two_stage_noise_factor.jpg>)

对两级 cascaded system，若每一级增益为 $G_1,G_2$，noise factor 为 $F_1,F_2$，所有增益都必须使用 linear scale。

两级总 noise factor：

$$
F_{\mathrm{total}}
=
F_1+\frac{F_2-1}{G_1}
$$

推广到多级：

$$
\boxed{
F_{\mathrm{total}}
=
F_1
+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+
\frac{F_4-1}{G_1G_2G_3}
+\cdots
}
$$

这是 **Friis Formula for Noise**。它说明第一级噪声最关键。后面级的噪声贡献会被前面级的 gain 除掉。

因此 RF receiver 前端通常先放 **低噪声放大器 Low-Noise Amplifier, LNA**。LNA 提供低噪声 gain，让后级 mixer、filter、amplifier 的噪声贡献被前级 gain 压低。

换算时使用：

$$
G_{\mathrm{linear}}
=
10^{G_{\mathrm{dB}}/10}
$$

$$
F_{\mathrm{linear}}
=
10^{NF_{\mathrm{dB}}/10}
$$

最后若要回到 dB：

$$
NF_{\mathrm{dB}}
=
10\log_{10}{F_{\mathrm{linear}}}
$$

---

### 17-7-6 噪声例题 Noise Examples

:::: stem L17-E4
**Receiver Sensitivity**

接收机工作在室温，noise figure 为 $5\,\mathrm{dB}$，desired SNR 为 $10\,\mathrm{dB}$，useful bandwidth 为 $1\,\mathrm{MHz}$。求 sensitivity。
::::

:::: solution
先求含 NF 的 noise floor：

$$
P_n
=
-174+10\log_{10}{B}+NF
$$

代入 $B=1\,\mathrm{MHz}=10^6\,\mathrm{Hz}$：

$$
P_n
=
-174+10\log_{10}{(10^6)}+5
=
-174+60+5
=
-109\,\mathrm{dBm}
$$

Sensitivity 为：

$$
S_n
=
P_n+SNR_{\mathrm{desired}}
=
-109+10
=
-99\,\mathrm{dBm}
$$
::::

:::: stem L17-E5
**Three-Stage Noise Figure**

三级放大器参数如下：

$$
G_1=15\,\mathrm{dB},
\quad
NF_1=1.5\,\mathrm{dB}
$$

$$
G_2=10\,\mathrm{dB},
\quad
NF_2=10\,\mathrm{dB}
$$

$$
G_3=3\,\mathrm{dB},
\quad
NF_3=20\,\mathrm{dB}
$$

求总 noise factor 与 noise figure。
::::

:::: solution
先转成 linear scale：

$$
G_1=10^{15/10}=31.6,
\qquad
G_2=10^{10/10}=10
$$

$$
F_1=10^{1.5/10}=1.413,
\qquad
F_2=10^{10/10}=10,
\qquad
F_3=10^{20/10}=100
$$

Friis 公式：

$$
F
=
F_1+\frac{F_2-1}{G_1}
+\frac{F_3-1}{G_1G_2}
$$

代入：

$$
F
=
1.413
+
\frac{10-1}{31.6}
+
\frac{100-1}{31.6\times10}
=
2.01
$$

转回 dB：

$$
NF
=
10\log_{10}{(2.01)}
=
3.03\,\mathrm{dB}
$$
::::

:::: stem L17-E6
**Front-End Sensitivity**

接收机前端如下图。题干给出工作在室温，bandwidth 为 $10\,\mathrm{MHz}$，desired SNR 为 $15\,\mathrm{dB}$。求 sensitivity。

![前端灵敏度例题](<CCD Lecture 17 RF Receivers.attachments/rf_front_end_sensitivity_example.jpg>)
::::

:::: solution
图中参数可按 linear scale 写成：

$$
G_1=10,
\qquad
F_1=10^{2/10}=1.58
$$

被动损耗 $G_2=-3\,\mathrm{dB}$，可近似取：

$$
G_2=10^{-3/10}\approx0.5,
\qquad
F_2\approx2
$$

第三、四级：

$$
G_3=10^{15/10}=31.62,
\qquad
F_3=10^{3/10}\approx2
$$

$$
G_4=10^{-2/10}\approx0.63,
\qquad
F_4\approx10^{2/10}=1.58
$$

Friis 公式：

$$
F
=
F_1
+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+
\frac{F_4-1}{G_1G_2G_3}
$$

代入：

$$
F
\approx
1.58
+
\frac{2-1}{10}
+
\frac{2-1}{10\times0.5}
+
\frac{1.58-1}{10\times0.5\times31.62}
$$

$$
F\approx1.88
$$

对应：

$$
NF
=
10\log_{10}{(1.88)}
\approx
2.75\,\mathrm{dB}
$$

若按题干 $B=10\,\mathrm{MHz}$ 计算：

$$
S_n
=
-174+10\log_{10}{(10^7)}
+2.75+15
$$

$$
S_n
=
-174+70+2.75+15
=
-86.25\,\mathrm{dBm}
$$

> [!WARNING]
> 课件页面给出的最终值是 $-96.25\,\mathrm{dBm}$。这个数值对应 $B=1\,\mathrm{MHz}$ 时的计算，而不是题干写的 $10\,\mathrm{MHz}$。复习时以公式和题干带宽为准。
::::

:::: stem L17-E7
**Overall Gain, Noise Factor and Equivalent Noise Temperature**

两级系统参数：

$$
G_1=10\,\mathrm{dB},
\quad
NF_1=3\,\mathrm{dB}
$$

$$
G_2=9\,\mathrm{dB},
\quad
NF_2=6.5\,\mathrm{dB}
$$

求 overall gain、noise factor 和 $T_e$。

![两级系统例题](<CCD Lecture 17 RF Receivers.attachments/rf_two_stage_example.jpg>)
::::

:::: solution
总增益：

$$
G_t
=
G_1G_2
$$

dB 相加：

$$
G_{t,\mathrm{dB}}
=
10+9
=
19\,\mathrm{dB}
$$

linear scale：

$$
G_t
=
10^{19/10}
\approx
79
$$

Noise factor 转换：

$$
F_1=10^{3/10}\approx2.00
$$

$$
F_2=10^{6.5/10}\approx4.47
$$

$$
G_1=10^{10/10}=10
$$

两级 Friis 公式：

$$
F
=
F_1+\frac{F_2-1}{G_1}
=
2.00+\frac{4.47-1}{10}
=
2.35
$$

等效噪声温度：

$$
T_e
=
T_i(F-1)
=
290(2.35-1)
=
391.5\,\mathrm{K}
$$
::::

## Summary

RF receiver 的基本任务是 select、amplify、demodulate。TRF 结构简单，但高频稳定性、带宽一致性和选择性都受限。

Superheterodyne receiver 通过 mixer 和 LO 把不同 RF channel 转换到固定 IF：

$$
f_{\mathrm{IF}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

High-side injection：

$$
f_{\mathrm{LO}}=f_{\mathrm{RF}}+f_{\mathrm{IF}},
\qquad
f_{\mathrm{image}}=f_{\mathrm{RF}}+2f_{\mathrm{IF}}
$$

Low-side injection：

$$
f_{\mathrm{LO}}=f_{\mathrm{RF}}-f_{\mathrm{IF}},
\qquad
f_{\mathrm{image}}=f_{\mathrm{RF}}-2f_{\mathrm{IF}}
$$

接收机质量指标要一起看：

| 指标 | 复习抓手 |
| --- | --- |
| Selectivity | 由 tuned filter 和 $Q=f_0/BW$ 决定 |
| Sensitivity | 最小可接收信号，受 noise floor、NF、SNR 要求影响 |
| Fidelity | 输出是否准确复制原始信息 |
| Dynamic Range | 上限由 compression/IIP3 限制，下限由 sensitivity 限制 |

非线性可用多项式模型：

$$
y(t)=a_0+a_1x(t)+a_2x^2(t)+a_3x^3(t)+\cdots
$$

单音输入产生 harmonic distortion；双音输入产生 intermodulation。三阶互调靠近原信号，常用 IIP3 衡量：

$$
IIP3
=
P_{\mathrm{in}}
+
\frac{\Delta P}{2}
$$

噪声部分最重要的三组公式：

$$
P_n=-174+10\log_{10}{B}+NF
\qquad \mathrm{dBm}
$$

$$
S_n=P_n+SNR_{\mathrm{desired}}
$$

$$
F_{\mathrm{total}}
=
F_1
+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+\cdots
$$

Friis 公式说明第一级最重要。RF receiver 前端放 LNA，是为了用低噪声 gain 压低后级噪声贡献。
