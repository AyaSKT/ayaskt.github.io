---
lastUpdated: 2026-06-12T01:40:38+08:00
---
# Lecture 11-12 Amplitude Modulation 幅度调制

<LyricCover
  image="CCD Lecture 11-12 Amplitude Modulation.attachments/1780674328208.JPG"
  title="幸福刑"
  artist="LonePi / 初音ミク"
  lang="ja"
  netease-url="https://music.163.com/#/song?id=3357994187"
>
  <LyricLine
    original="これは これは 誰(だれ)のため？"
    translation="这一切 这一切 到底是为谁？"
  />
  <LyricLine
    original="なにが なにが 君(きみ)のため？"
    translation="该如何 才算是 真正为了你？"
  />
</LyricCover>


## 章节目录

- [章节目录](#章节目录)
- [11-1 调制与 AM 基本模型 Modulation and AM Model](#11-1-调制与-am-基本模型-modulation-and-am-model)
  - [11-1-1 为什么需要调制 Why Modulation Is Needed](#11-1-1-为什么需要调制-why-modulation-is-needed)
  - [11-1-2 AM 信号表达式 AM Signal Expression](#11-1-2-am-信号表达式-am-signal-expression)
- [11-2 调制度与包络 Modulation Index and Envelope](#11-2-调制度与包络-modulation-index-and-envelope)
  - [11-2-1 调制度 Modulation Index](#11-2-1-调制度-modulation-index)
  - [11-2-2 过调制 Overmodulation](#11-2-2-过调制-overmodulation)
- [11-3 AM 频谱与带宽 AM Spectrum and Bandwidth](#11-3-am-频谱与带宽-am-spectrum-and-bandwidth)
  - [11-3-1 单音调制 Single-Tone Modulation](#11-3-1-单音调制-single-tone-modulation)
  - [11-3-2 多音与语音信号 Multi-Tone and Speech Signals](#11-3-2-多音与语音信号-multi-tone-and-speech-signals)
- [11-4 AM 功率 AM Power](#11-4-am-功率-am-power)
  - [11-4-1 载波与边带功率 Carrier and Sideband Power](#11-4-1-载波与边带功率-carrier-and-sideband-power)
  - [11-4-2 电流关系 Current Relation](#11-4-2-电流关系-current-relation)
- [11-5 AM 产生电路 AM Generation Circuits](#11-5-am-产生电路-am-generation-circuits)
  - [11-5-1 非线性器件与滤波 Nonlinear Device and Filtering](#11-5-1-非线性器件与滤波-nonlinear-device-and-filtering)
  - [11-5-2 低电平与高电平调制 Low-Level and High-Level Modulation](#11-5-2-低电平与高电平调制-low-level-and-high-level-modulation)
  - [11-5-3 集电极调制 Collector Modulation](#11-5-3-集电极调制-collector-modulation)
- [Summary](#summary)

## 11-1 调制与 AM 基本模型 Modulation and AM Model

### 11-1-1 为什么需要调制 Why Modulation Is Needed

:::: definition 调制 Modulation
**调制 Modulation** 是把低频基带信息加载到高频载波上的过程。通信电路中通常改变载波的幅度、频率或相位。
::::

基带语音或音乐频率很低，直接辐射不实际。调制的主要作用：

- 把信号搬移到适合天线辐射的高频段；
- 让不同用户占用不同频段，减少互相干扰；
- 便于后续放大、滤波和频率规划。

![AM 调制框图](<CCD Lecture 11-12 Amplitude Modulation.attachments/am_modulation_block.jpg>)

模拟调制中，载波可写成

$$
e_c(t)=E_c\cos{(\omega_c t)}
$$

若改变 $E_c$，得到 AM；若改变 $\omega_c$ 或相位，进入 FM/PM。

---

### 11-1-2 AM 信号表达式 AM Signal Expression

:::: definition 幅度调制 Amplitude Modulation
**幅度调制 Amplitude Modulation, AM** 中，载波瞬时幅度随消息信号变化，而载波频率保持为 $f_c$。
::::

设单音消息为

$$
e_m(t)=E_m\cos{(\omega_m t)}
$$

载波为

$$
e_c(t)=E_c\cos{(\omega_c t)}
$$

标准 AM 信号可写为

$$
e_{\mathrm{AM}}(t)=E_c\left[1+m\cos{(\omega_m t)}\right]\cos{(\omega_c t)}
$$

其中 $m$ 是调制度。

![AM 信号模型](<CCD Lecture 11-12 Amplitude Modulation.attachments/am_signal_model.jpg>)

包络为

$$
E_{\mathrm{env}}(t)=E_c\left[1+m\cos{(\omega_m t)}\right]
$$

AM 的信息在包络里，因此调制完成后的功率放大器必须保持包络形状。

## 11-2 调制度与包络 Modulation Index and Envelope

### 11-2-1 调制度 Modulation Index

:::: definition 调制度 Modulation Index
**调制度 Modulation Index** 表示载波幅度被消息信号改变的比例。

$$
m=\frac{\text{maximum change in carrier amplitude}}{\text{unmodulated carrier amplitude}}
$$
::::

若包络最大值和最小值分别为 $E_{\max}$、$E_{\min}$，则

$$
m=\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}
$$

也可用百分比调制度表示：

$$
\%m=
\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}
\times100\%
$$

调制百分比为

$$
M=m\times 100\%
$$

![AM 包络](<CCD Lecture 11-12 Amplitude Modulation.attachments/am_envelope.jpg>)

100% 调制时，包络最低点刚好到零，载波瞬时幅度在 $0$ 到 $2E_c$ 之间变化。

> [!TIP]
> 包络法求 $m$ 时必须用峰值包络的 $E_{\max}$ 和 $E_{\min}$，不是用载波周期内相邻高频峰值。

---

### 11-2-2 过调制 Overmodulation

当 $m>1$ 时，

$$
1+m\cos{(\omega_m t)}
$$

可能变为负值。包络检测器无法区分这种符号翻转，恢复出的消息会被削顶或翻折。

![过调制](<CCD Lecture 11-12 Amplitude Modulation.attachments/am_overmodulation.jpg>)

工程上 AM 发送机通常不追求超过 100% 调制。调制度太小会浪费载波功率，调制度太大又会失真。

过调制不只是时域包络失真。因为波形被折叠或削顶，会产生额外频率分量，使边带向外扩展。这个现象常称为 **sideband splatter**，可能干扰邻近信道。

## 11-3 AM 频谱与带宽 AM Spectrum and Bandwidth

### 11-3-1 单音调制 Single-Tone Modulation

展开 AM 表达式：

$$
\begin{aligned}
e_{\mathrm{AM}}(t)
&=E_c\cos{(\omega_c t)}
+mE_c\cos{(\omega_m t)}\cos{(\omega_c t)}\\
&=E_c\cos{(\omega_c t)}
+\frac{mE_c}{2}\cos{[(\omega_c+\omega_m)t]}
+\frac{mE_c}{2}\cos{[(\omega_c-\omega_m)t]}
\end{aligned}
$$

所以单音 AM 频谱含三个分量：

| 分量 | 频率 | 幅度 |
| --- | --- | --- |
| Lower Side Frequency | $f_c-f_m$ | $\displaystyle \frac{mE_c}{2}$ |
| Carrier | $f_c$ | $E_c$ |
| Upper Side Frequency | $f_c+f_m$ | $\displaystyle \frac{mE_c}{2}$ |

两个边带携带相同消息信息。载波本身不携带消息，但常规 AM 仍发送载波，方便接收端包络检波。

---

### 11-3-2 多音与语音信号 Multi-Tone and Speech Signals

实际消息可由 Fourier 分解看成很多正弦分量的和。每个消息频率 $f_m$ 都会在载波两侧生成一对边带：

$$
f_{\mathrm{USB}}=f_c+f_m
$$

$$
f_{\mathrm{LSB}}=f_c-f_m
$$

若消息最高频率为 $f_{m,\max}$，AM 带宽为

$$
\boxed{\mathrm{BW}_{\mathrm{AM}}=2f_{m,\max}}
$$

例如音频最高到 $3\,\mathrm{kHz}$，则常规 AM 需要

$$
\mathrm{BW}_{\mathrm{AM}}=2\times 3\,\mathrm{kHz}=6\,\mathrm{kHz}
$$

## 11-4 AM 功率 AM Power

### 11-4-1 载波与边带功率 Carrier and Sideband Power

载波功率为

$$
P_c=\frac{E_c^2}{2R}
$$

每个边带的电压幅度为 $mE_c/2$，所以单个边带功率为

$$
P_{\mathrm{USB}}=P_{\mathrm{LSB}}=\frac{m^2}{4}P_c
$$

总边带功率为

$$
P_{\mathrm{SB}}=P_{\mathrm{USB}}+P_{\mathrm{LSB}}=\frac{m^2}{2}P_c
$$

总发射功率：

$$
\boxed{P_T=P_c\left(1+\frac{m^2}{2}\right)}
$$

当 $m=1$ 时，

$$
P_T=1.5P_c
$$

其中两个边带总共只占 $P_c/2$。常规 AM 的功率效率不高，后面 SSB 就是在处理这个问题。

---

### 11-4-2 电流关系 Current Relation

若负载阻抗不变，功率正比于电流平方。未调制载波电流为 $I_c$，调制后总电流为 $I_T$：

$$
I_T=I_c\sqrt{1+\frac{m^2}{2}}
$$

反过来可由电流测量调制度：

$$
m=\sqrt{2\left[\left(\frac{I_T}{I_c}\right)^2-1\right]}
$$

这个公式适合发射机调试时估计调制度。

同样的关系也可写成电压形式：

$$
E_T=E_c\sqrt{1+\frac{m^2}{2}}
$$

前提仍然是负载阻抗不变。

## 11-5 AM 产生电路 AM Generation Circuits

### 11-5-1 非线性器件与滤波 Nonlinear Device and Filtering

线性相加只得到

$$
e_{\mathrm{out}}(t)=e_c(t)+e_m(t)
$$

它没有产生 $f_c\pm f_m$，所以不能形成 AM 频谱。

AM 需要非线性器件或乘法器。

> [!NOTE]
> 以平方律器件为例，设输入为载波与消息之和：
>
> $$
> v_{\mathrm{in}}(t)=E_c\cos{(\omega_c t)}+E_m\cos{(\omega_m t)}
> $$
>
> 平方律器件输出为
>
> $$
> v_{\mathrm{out}}(t)=a_1 v_{\mathrm{in}}(t)+a_2 v_{\mathrm{in}}^2(t)
> $$
>
> 展开平方项：
>
> $$
> v_{\mathrm{in}}^2=E_c^2\cos^2{(\omega_c t)}+E_m^2\cos^2{(\omega_m t)}+2E_cE_m\cos{(\omega_c t)}\cos{(\omega_m t)}
> $$
>
> 交叉项 $2E_cE_m\cos{(\omega_c t)}\cos{(\omega_m t)}$ 产生 $f_c\pm f_m$。
>
> 非线性器件会产生：直流分量（来自 $\cos^2$ 的常数项）；原频率 $f_c$、$f_m$；和频与差频 $f_c+f_m$、$f_c-f_m$（来自交叉项）；二次谐波 $2f_c$、$2f_m$。

带通调谐电路只保留 $f_c-f_m$、$f_c$、$f_c+f_m$，其余分量被滤除。

![晶体管 AM 调制器](<CCD Lecture 11-12 Amplitude Modulation.attachments/am_transistor_modulator_wide.jpg>)

---

### 11-5-2 低电平与高电平调制 Low-Level and High-Level Modulation

AM 调制可发生在发送机链路的不同位置。

Low-level modulation 在前级低功率处完成调制，后面所有 RF 放大器都需要线性。High-level modulation 在末级 RF 功率放大处完成调制，可先用高效率 Class C 放大纯载波，适合大功率 AM 广播。

AM 完成后，包络就是消息。后级若使用非线性放大器，会改变包络并产生失真。

Class C 放大器效率高，但不适合直接放大已经生成的 AM 信号。它适合先放大纯载波，再在末级用消息控制幅度。

> [!NOTE]
> **低电平调制 Low-Level Modulation**：调制后的信号已包含完整 AM 波形，后续所有 RF 放大器必须工作在线性模式（如 Class A 或 Class AB）以保持包络形状不畸变。调制电路功率小、实现灵活，但末级线性放大器效率低，不适合大功率发射。
>
> **高电平调制 High-Level Modulation**：前级可用高效率非线性放大器（如 Class C）放大纯载波，末级再用消息信号控制输出载波幅度。整体效率高，适合大功率 AM 广播发射机，但调制器需要提供与 RF 输出功率相当的音频功率。

低功率集成 AM 调制也可用 OTA，例如 LM13700。carrier 作为输入信号，message 控制 OTA 的跨导，也就是控制放大器增益，输出就得到幅度随 message 变化的 AM 波形。

---

### 11-5-3 集电极调制 Collector Modulation

:::: definition 集电极调制 Collector Modulation
**集电极调制 Collector Modulation** 是高电平 AM 的一种实现。载波送入 Class C RF 放大器，消息信号串入集电极电源，使输出载波幅度随消息变化。
::::

![集电极调制器](<CCD Lecture 11-12 Amplitude Modulation.attachments/am_collector_modulator_wide.jpg>)

工作关系：

1. 基极偏置使晶体管每个载波周期只在短时间导通；
2. 集电极 LC 槽路靠 flywheel effect 重建正弦载波；
3. 消息电压改变集电极供电；
4. 供电高时载波输出幅度变大，供电低时载波输出幅度变小。

理想 100% 调制时，包络最低点刚好到零。实际晶体管会受工作区和电源余量限制，常在达到理想 100% 前出现失真。

## Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| AM 信号 | $e_{\mathrm{AM}}(t)=E_c[1+m\cos{(\omega_m t)}]\cos{(\omega_c t)}$ | 载波幅度随消息变化 |
| 调制度 | $m=(E_{\max}-E_{\min})/(E_{\max}+E_{\min})$ | $m>1$ 为过调制 |
| AM 频率分量 | $f_c-f_m,\ f_c,\ f_c+f_m$ | 两个边带含相同信息 |
| AM 带宽 | $\mathrm{BW}_{\mathrm{AM}}=2f_{m,\max}$ | 双边带 |
| 单个边带功率 | $P_{\mathrm{USB}}=P_{\mathrm{LSB}}=m^2P_c/4$ | 对单音 AM |
| 总功率 | $P_T=P_c(1+m^2/2)$ | $m=1$ 时为 $1.5P_c$ |
| 高电平调制 | 末级调制，Class C 放大载波 | 高效率 AM 发送机 |
| 低电平调制 | 前级调制，后级线性放大 | 实现更灵活 |
