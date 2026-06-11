# Lecture 13 Single-Sideband Communication (SSB) 单边带通信

**だって D/N/A じゃ騙れない，**  
**毕竟 D/N/A 不会骗人，**

**この心は私の中，紅く，紅く。**  
**这颗心脏在我心中，变得泛红，泛红。**

<div align="right">——Azari 《D/N/A》</div>

![alt text](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/1780727188147.JPG>)


## 章节目录

- [章节目录](#章节目录)
- [13-1 从 AM 到 SSB From AM to SSB](#13-1-从-am-到-ssb-from-am-to-ssb)
  - [13-1-1 AM 的冗余 Redundancy in AM](#13-1-1-am-的冗余-redundancy-in-am)
  - [13-1-2 SSB 的基本想法 Basic Idea of SSB](#13-1-2-ssb-的基本想法-basic-idea-of-ssb)
- [13-2 SSB 类型与优势 Types and Advantages](#13-2-ssb-类型与优势-types-and-advantages)
  - [13-2-1 常见边带传输方式 Sideband Transmission Types](#13-2-1-常见边带传输方式-sideband-transmission-types)
  - [13-2-2 带宽、功率与噪声 Bandwidth Power and Noise](#13-2-2-带宽功率与噪声-bandwidth-power-and-noise)
- [13-3 SSB 产生方法 SSB Generation](#13-3-ssb-产生方法-ssb-generation)
  - [13-3-1 平衡调制器 Balanced Modulator](#13-3-1-平衡调制器-balanced-modulator)
  - [13-3-2 二极管环形调制器 Diode Ring Modulator](#13-3-2-二极管环形调制器-diode-ring-modulator)
  - [13-3-3 边带滤波 Sideband Filtering](#13-3-3-边带滤波-sideband-filtering)
- [13-4 SSB 发射机与接收机 SSB Transmitters and Receivers](#13-4-ssb-发射机与接收机-ssb-transmitters-and-receivers)
  - [13-4-1 滤波法发射机 Filter-Method Transmitter](#13-4-1-滤波法发射机-filter-method-transmitter)
  - [13-4-2 SSB 接收与 BFO SSB Receiver and BFO](#13-4-2-ssb-接收与-bfo-ssb-receiver-and-bfo)
- [13-5 例题 Exercises](#13-5-例题-exercises)
- [Summary](#summary)

## 13-1 从 AM 到 SSB From AM to SSB

### 13-1-1 AM 的冗余 Redundancy in AM

标准 AM 对单音消息会发送三个频率分量：

$$
f_c-f_m,\qquad f_c,\qquad f_c+f_m
$$

其中：

- 载波 $f_c$ 幅度和频率恒定，不携带消息；
- 上边带 USB 和下边带 LSB 携带相同消息；
- 100% 调制时，每个边带的幅度最大只有载波幅度的一半。

![AM 频谱](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_am_spectrum.jpg>)

因此常规 AM 的功率和带宽都有明显冗余。

---

### 13-1-2 SSB 的基本想法 Basic Idea of SSB

:::: definition 单边带通信 Single-Sideband Communication
**单边带通信 Single-Sideband Communication, SSB** 只发送一个信息边带，通常同时抑制载波和另一个边带。
::::

如果只保留 USB：

$$
f_{\mathrm{USB}}=f_c+f_m
$$

如果只保留 LSB：

$$
f_{\mathrm{LSB}}=f_c-f_m
$$

![边带选择](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_sideband_choice.jpg>)

SSB 仍能恢复消息，因为一个边带已经包含完整消息信息。

## 13-2 SSB 类型与优势 Types and Advantages

### 13-2-1 常见边带传输方式 Sideband Transmission Types

| 类型 | 发送内容 | 特点 |
| --- | --- | --- |
| Standard SSB | 一个边带，载波抑制 | 省功率、省带宽 |
| SSBSC / Pilot Carrier | 一个边带 + 很小载波 | 便于 AGC、AFC 和解调 |
| ISB | 两个边带携带不同消息 | 同一频段传两个通道 |
| VSB | 一个完整边带 + 另一边带残余 | 常见于视频传输 |
| ACSSB | 压扩后的 SSB | 改善语音质量 |

Pilot carrier 会消耗少量功率，但能给接收机提供频率参考。

---

### 13-2-2 带宽、功率与噪声 Bandwidth Power and Noise

AM 的带宽为

$$
\mathrm{BW}_{\mathrm{AM}}=2f_{m,\max}
$$

SSB 只保留一个边带，带宽为消息带宽：

$$
\boxed{\mathrm{BW}_{\mathrm{SSB}}\approx f_{m,\max}-f_{m,\min}}
$$

语音若取 $300\,\mathrm{Hz}$ 到 $3\,\mathrm{kHz}$：

$$
\mathrm{BW}_{\mathrm{SSB}}=3000-300=2.7\,\mathrm{kHz}
$$

而普通 AM 约为

$$
\mathrm{BW}_{\mathrm{AM}}=2\times 3000=6\,\mathrm{kHz}
$$

噪声功率与接收机带宽近似成正比。SSB 带宽更窄，进入接收机的噪声也更少。

SSB 还有 selective fading 优势。AM 中载波、USB、LSB 可能在电离层传播中受到不同衰落，SSB 只传一个边带，边带间不均衡衰落的问题小很多。

## 13-3 SSB 产生方法 SSB Generation

### 13-3-1 平衡调制器 Balanced Modulator

SSB 生成通常分两步：

1. 抑制载波，得到 DSB-SC；
2. 用滤波器去掉一个边带，得到 USB 或 LSB。

:::: definition 双边带抑制载波 Double-Sideband Suppressed Carrier
**DSB-SC** 是只含上、下边带而不含载波的调制信号。

$$
s_{\mathrm{DSB}}(t)=A_c m(t)\cos{(\omega_c t)}
$$
::::

对单音消息：

$$
m(t)=A_m\cos{(\omega_m t)}
$$

则

$$
\begin{aligned}
s_{\mathrm{DSB}}(t)
&=A_cA_m\cos{(\omega_m t)}\cos{(\omega_c t)}\\
&=\frac{A_cA_m}{2}\cos{[(\omega_c+\omega_m)t]}
+\frac{A_cA_m}{2}\cos{[(\omega_c-\omega_m)t]}
\end{aligned}
$$

载波项 $f_c$ 被平衡电路抵消。

---

### 13-3-2 二极管环形调制器 Diode Ring Modulator

:::: definition 二极管环形调制器 Diode Ring Modulator
**二极管环形调制器** 用四个匹配二极管构成开关网络。大幅度载波控制二极管导通组合，使消息信号按载波半周期交替反相，从而产生 DSB-SC。
::::

![二极管环形调制器](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_ring_modulator.jpg>)

正半周时，一组对角二极管导通，消息以原极性传到输出。负半周时，另一组对角二极管导通，消息反相传到输出。

载波电流在变压器中相互抵消，因此输出主要剩下两个边带。匹配较好的环形调制器可达到很高的 carrier suppression，课程中给出可到约 $60\,\mathrm{dB}$。

---

### 13-3-3 边带滤波 Sideband Filtering

DSB-SC 仍有两个边带，SSB 还需要滤波。

![SSB 滤波](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_filter.jpg>)

滤波器需要：

- 通过目标边带；
- 抑制另一边带；
- 尽量不改变目标边带的幅频和相频特性。

课程给出的 SSB 滤波器 $Q$ 估算式为

$$
Q=\frac{f_c\left(10^{\mathrm{dB}/20}\right)^{1/2}}{4\Delta f}
$$

其中：

- $f_c$：滤波中心附近的载波频率；
- $\Delta f$：边带间最小分隔的一半写法对应的频率间隔，课程例题用 $200\,\mathrm{Hz}$；
- $\mathrm{dB}$：所需边带抑制度。

载波频率越高、边带间隔越小，所需 $Q$ 越高。直接在最终 RF 频率做 SSB 滤波通常很难。

> [!NOTE]
> 以语音信号为例，最低消息频率约 $300\,\mathrm{Hz}$，USB 与 LSB 之间仅隔 $600\,\mathrm{Hz}$。若载波为 $10\,\mathrm{MHz}$，所需 $Q$ 远超常规 LC 滤波器可达到的水平（通常 $Q<200$）。因此实际 SSB 发射机先在固定低中频（如 $455\,\mathrm{kHz}$ 或 $1.65\,\mathrm{MHz}$）生成干净 SSB，再经混频器搬移到目标频率。

## 13-4 SSB 发射机与接收机 SSB Transmitters and Receivers

### 13-4-1 滤波法发射机 Filter-Method Transmitter

实际 SSB 发射机常先在固定中频处生成干净 SSB，再混频到最终发射频率。

![滤波法 SSB 发射机](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_transmitter_filter_method.jpg>)

基本链路：

1. Audio amplifier 放大消息；
2. Balanced modulator 生成 DSB-SC；
3. Sideband filter 选出 USB 或 LSB；
4. Mixer / frequency converter 移到目标频段；
5. Linear power amplifier 放大发射。

SSB 信号本身有幅度变化，因此最终 RF 功率放大器必须线性。Class C 这类强非线性末级会产生互调和边带失真。

---

### 13-4-2 SSB 接收与 BFO SSB Receiver and BFO

普通 AM 二极管包络检波不能直接解调 SSB，因为 SSB 中没有原载波。

![SSB 接收机](<CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_receiver.jpg>)

SSB 接收机常见流程：

1. RF amplifier 放大接收信号；
2. Mixer 转换到 IF；
3. IF amplifier 选择并放大中频；
4. Product detector 与本地产生的载波相乘；
5. Audio amplifier 输出语音。

:::: definition 拍频振荡器 Beat Frequency Oscillator
**Beat Frequency Oscillator, BFO** 在 SSB 接收机中重新插入本地载波，使 product detector 能把边带频率差还原为音频。
::::

若发射端抑制载波为 $f_c$，USB 中某个分量为

$$
f_c+f_m
$$

接收端插入同频载波后，乘法器产生差频

$$
(f_c+f_m)-f_c=f_m
$$

BFO 频率偏差会直接造成音调偏移，所以 SSB 接收对频率稳定性要求更高。

## 13-5 例题 Exercises

:::: stem L13-E1
语音信号范围为 $300\,\mathrm{Hz}$ 到 $3\,\mathrm{kHz}$。比较 AM 与 SSB 所需带宽。
::::

:::: solution
AM 按最高消息频率估算：

$$
\mathrm{BW}_{\mathrm{AM}}=2f_{m,\max}=2\times3\,\mathrm{kHz}=6\,\mathrm{kHz}
$$

SSB 只保留一个语音边带：

$$
\mathrm{BW}_{\mathrm{SSB}}=3000-300=2700\,\mathrm{Hz}=2.7\,\mathrm{kHz}
$$

::::

:::: stem L13-E2
载波为 $1\,\mathrm{MHz}$，要求 $80\,\mathrm{dB}$ 边带抑制，边带间隔按 $\Delta f=200\,\mathrm{Hz}$ 代入。求所需滤波器 $Q$。
::::

:::: solution
由课程公式：

$$
Q=\frac{f_c\left(10^{\mathrm{dB}/20}\right)^{1/2}}{4\Delta f}
$$

代入：

$$
Q=\frac{10^6\left(10^{80/20}\right)^{1/2}}{4\times200}
=\frac{10^6\times100}{800}
=125000
$$

这个 $Q$ 很高，所以通常先在较低、固定的中频处做滤波。
::::

## Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| AM 冗余 | 载波无消息，两个边带重复 | SSB 去掉载波和一个边带 |
| SSB 带宽 | $\mathrm{BW}_{\mathrm{SSB}}\approx f_{m,\max}-f_{m,\min}$ | 约为 AM 的一半 |
| DSB-SC | $s(t)=A_cm(t)\cos{(\omega_c t)}$ | 平衡调制器输出 |
| 环形调制器 | 载波控制二极管开关 | 抑制载波，保留双边带 |
| 滤波器 $Q$ | $Q=f_c(10^{\mathrm{dB}/20})^{1/2}/(4\Delta f)$ | 高频直接滤波困难 |
| SSB 发射机 | balanced modulator → filter → mixer → linear PA | 后级必须线性 |
| SSB 接收机 | RF → mixer → IF → product detector | 需要 BFO 重新插入载波 |
