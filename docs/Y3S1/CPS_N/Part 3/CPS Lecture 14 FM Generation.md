---
author: Ayaskt
---

# CPS Lecture 14 FM Generation

## 章节目录

- [14-1 FM 生成方法 Methods of FM Generation](#14-1-fm-生成方法-methods-of-fm-generation)
  - [14-1-1 直接法与间接法 Direct and Indirect Methods](#14-1-1-直接法与间接法-direct-and-indirect-methods)
- [14-2 直接 FM 生成 Direct FM Generation](#14-2-直接-fm-生成-direct-fm-generation)
  - [14-2-1 VCO 生成 FM FM Generation with VCO](#14-2-1-vco-生成-fm-fm-generation-with-vco)
  - [14-2-2 直接法的特点 Characteristics of Direct Method](#14-2-2-直接法的特点-characteristics-of-direct-method)
- [14-3 间接 FM 生成 Indirect FM Generation](#14-3-间接-fm-生成-indirect-fm-generation)
  - [14-3-1 Armstrong 方法 Armstrong Method](#14-3-1-armstrong-方法-armstrong-method)
  - [14-3-2 DSB-SC 生成 NBFM NBFM Generation with DSB-SC](#14-3-2-dsb-sc-生成-nbfm-nbfm-generation-with-dsb-sc)
- [14-4 倍频器与变频器 Frequency Multiplier and Frequency Converter](#14-4-倍频器与变频器-frequency-multiplier-and-frequency-converter)
  - [14-4-1 倍频器 Frequency Multiplier](#14-4-1-倍频器-frequency-multiplier)
  - [14-4-2 变频器 Frequency Converter](#14-4-2-变频器-frequency-converter)
- [14-5 Armstrong 例题 Armstrong Example](#14-5-armstrong-例题-armstrong-example)
  - [14-5-1 题目条件 Problem Setup](#14-5-1-题目条件-problem-setup)
  - [14-5-2 设计链路 Design Chain](#14-5-2-设计链路-design-chain)
- [14-6 间接法优缺点 Advantages and Disadvantages](#14-6-间接法优缺点-advantages-and-disadvantages)
  - [14-6-1 稳定性与噪声 Stability and Noise](#14-6-1-稳定性与噪声-stability-and-noise)
- [14-7 频分复用 Frequency Division Multiplexing](#14-7-频分复用-frequency-division-multiplexing)
  - [14-7-1 FDM 基本结构 Basic Structure of FDM](#14-7-1-fdm-基本结构-basic-structure-of-fdm)
  - [14-7-2 接收端分离 Receiver Separation](#14-7-2-接收端分离-receiver-separation)
  - [14-7-3 模拟电话系统例子 Analog Telephone Example](#14-7-3-模拟电话系统例子-analog-telephone-example)

## 14-1 FM 生成方法 Methods of FM Generation

### 14-1-1 直接法与间接法 Direct and Indirect Methods

FM 生成方法分为两类：**直接 FM 生成 Direct FM Generation** 和 **间接 FM 生成 Indirect FM Generation**。

![FM 产生方法总览](<CPS Lecture 14 FM Generation.attachments/fm-generation-methods.jpg>)

:::: definition 直接 FM 生成 Direct FM Generation
**直接 FM 生成 Direct FM Generation** 直接控制振荡器频率，使瞬时频率按消息信号变化。
::::

:::: definition 间接 FM 生成 Indirect FM Generation
**间接 FM 生成 Indirect FM Generation** 先生成窄带 FM 或等效相位调制信号，再通过倍频、变频等操作得到目标宽带 FM。
::::

直接法结构短，频偏控制直观。间接法结构长，但可以利用高稳定度晶体振荡器获得更稳定的载波。

## 14-2 直接 FM 生成 Direct FM Generation

### 14-2-1 VCO 生成 FM FM Generation with VCO

**压控振荡器 Voltage-Controlled Oscillator, VCO** 的输出频率由控制电压决定。若控制电压中加入消息信号 $m(t)$，并满足线性关系：

$$
\omega_i(t)=\omega_c+k_fm(t),
$$

则输出为 FM 信号：

$$
s_{\mathrm{FM}}(t)
=A_c\cos{\left[\omega_c t+k_f\int_0^t m(u)\,du\right]}.
$$

常见直接法包括 **电抗调制器 Reactance Modulator** 和 **变容二极管调制器 Varactor Diode Modulator**。它们通过改变振荡回路中的等效电容或电抗，使振荡频率随输入电压变化。

---

### 14-2-2 直接法的特点 Characteristics of Direct Method

直接法的优点是结构简单，输入消息可以直接控制频偏。主要限制是载波频率稳定性依赖振荡器本身，调制信号进入振荡器后也可能影响中心频率稳定度。

| 方法 | 优点 | 限制 |
| --- | --- | --- |
| Direct FM | 结构简单，频偏控制直接 | 频率稳定性较难做到很高 |
| Indirect FM | 可用晶体振荡器提高稳定度 | 需要倍频、变频和滤波链路 |

## 14-3 间接 FM 生成 Indirect FM Generation

### 14-3-1 Armstrong 方法 Armstrong Method

:::: definition Armstrong 间接法 Armstrong Indirect Method
**Armstrong 间接法 Armstrong Indirect Method** 先生成稳定的 NBFM，再用倍频器扩大频偏与载波频率，必要时用变频器调整载波位置。
::::

基本流程为

$$
\text{Crystal oscillator}
\rightarrow
\text{NBFM generator}
\rightarrow
\text{Frequency multipliers}
\rightarrow
\text{Frequency converter}
\rightarrow
\text{Power amplifier}.
$$

该方法先用小调制指数保证 NBFM 近似成立，再通过频率倍增获得 WBFM。

---

### 14-3-2 DSB-SC 生成 NBFM NBFM Generation with DSB-SC

NBFM 近似式为

$$
s_{\mathrm{NBFM}}(t)
\approx A\cos{(\omega_c t)}
-Ak_fa(t)\sin{(\omega_c t)}.
$$

其中

$$
a(t)=\int m(t)\,dt.
$$

这个式子说明，NBFM 可以由两部分相加得到：

- 未调制载波 $A\cos{(\omega_c t)}$；
- 与载波正交的 DSB-SC 项 $-Ak_fa(t)\sin{(\omega_c t)}$。

![NBFM DSB-SC 产生器](<CPS Lecture 14 FM Generation.attachments/nbfm-dsbsc-generator-wide.jpg>)

由于该结构只使用小角度近似，输出会有少量幅度波动和高阶失真。实际链路可加入非线性限幅器，压制幅度变化。

:::: definition 窄带条件 Narrowband Condition
NBFM 要求调制指数较小：

$$
\beta=\frac{\Delta f}{f_m}<1.
$$
::::

## 14-4 倍频器与变频器 Frequency Multiplier and Frequency Converter

### 14-4-1 倍频器 Frequency Multiplier

:::: definition 倍频器 Frequency Multiplier
**倍频器 Frequency Multiplier** 利用非线性器件产生输入频率的谐波，再用带通滤波器选出目标谐波。
::::

非线性器件可写成

$$
y(t)=a_0+a_1x(t)+a_2x^2(t)+\cdots+a_nx^n(t).
$$

若输入为 FM 信号

$$
x(t)=A_c\cos{\theta(t)},
$$

非线性输出会包含 $\cos{[n\theta(t)]}$ 一类分量。选出第 $n$ 次谐波后：

$$
\theta_{\mathrm{out}}(t)=n\theta(t).
$$

因此载波频率和频偏同时乘以 $n$：

$$
f_{c,\mathrm{out}}=nf_c,\qquad
\Delta f_{\mathrm{out}}=n\Delta f.
$$

---

### 14-4-2 变频器 Frequency Converter

**变频器 Frequency Converter** 或混频器通过乘以本振信号移动载波频率。若输入载波为 $f_c$，本振为 $f_{\mathrm{LO}}$，混频后产生

$$
f_{\mathrm{LO}}+f_c
\quad\text{和}\quad
\lvert f_{\mathrm{LO}}-f_c\rvert.
$$

带通滤波器选出所需分量。理想变频只平移中心频率，不改变频偏：

$$
\Delta f_{\mathrm{out}}=\Delta f_{\mathrm{in}}.
$$

> [!TIP]
> Armstrong 题目中常先用倍频满足目标频偏，再用变频把载波搬到目标频率。倍频改变 $\Delta f$，变频不改变 $\Delta f$。

## 14-5 Armstrong 例题 Armstrong Example

### 14-5-1 题目条件 Problem Setup

:::: stem L14-E1
要求生成 FM 信号：

- 目标载波频率 $f_c=91.2\,\mathrm{MHz}$；
- 目标峰值频偏 $\Delta f=75\,\mathrm{kHz}$；
- 基带高保真频率范围约为 $50\,\mathrm{Hz}$ 到 $15\,\mathrm{kHz}$。

说明如何使用 Armstrong 间接 FM 调制器生成该信号。
::::

:::: solution
先生成 NBFM。为保证窄带条件，以最低消息频率 $50\,\mathrm{Hz}$ 检查调制指数。若初始频偏取

$$
\Delta f_1=25\,\mathrm{Hz},
$$

则

$$
\beta_1=\frac{25}{50}=0.5<1.
$$

初始载波选为

$$
f_{c1}=200\,\mathrm{kHz}.
$$

之后通过倍频器扩大频偏，再通过变频器调整载波。
::::

---

### 14-5-2 设计链路 Design Chain

第一级倍频取 $64$：

$$
\begin{aligned}
f_{c2}&=200\,\mathrm{kHz}\times64=12.8\,\mathrm{MHz},\\
\Delta f_2&=25\,\mathrm{Hz}\times64=1.6\,\mathrm{kHz}.
\end{aligned}
$$

用 $10.9\,\mathrm{MHz}$ 晶体振荡器进行变频，选择差频：

$$
\begin{aligned}
f_{c3}&=12.8\,\mathrm{MHz}-10.9\,\mathrm{MHz}=1.9\,\mathrm{MHz},\\
\Delta f_3&=1.6\,\mathrm{kHz}.
\end{aligned}
$$

第二级倍频取 $48$：

$$
\begin{aligned}
f_{c4}&=1.9\,\mathrm{MHz}\times48=91.2\,\mathrm{MHz},\\
\Delta f_4&=1.6\,\mathrm{kHz}\times48=76.8\,\mathrm{kHz}.
\end{aligned}
$$

$76.8\,\mathrm{kHz}$ 与目标 $75\,\mathrm{kHz}$ 接近，实际系统可通过初始频偏或倍频方案微调。

![Armstrong 91.2 MHz 倍频变频链路](<CPS Lecture 14 FM Generation.attachments/armstrong-91mhz-chain.jpg>)

> [!NOTE]
> 源课件 OCR 在该例中把初始频偏附近的单位识别得不稳定。旧 CPS 笔记和图示链路均对应 $\Delta f_1=25\,\mathrm{Hz}$，否则后续 $64$ 和 $48$ 倍频不会得到约 $75\,\mathrm{kHz}$ 的最终频偏。

## 14-6 间接法优缺点 Advantages and Disadvantages

### 14-6-1 稳定性与噪声 Stability and Noise

间接法的主要优点是频率稳定度高。NBFM 可由晶体振荡器提供稳定载波，后续倍频保持相位关系。

主要缺点是链路较长。倍频会同时放大频偏和相位噪声，过多倍频级会提高系统噪声和滤波复杂度。

| 项目 | 说明 |
| --- | --- |
| 优点 | 晶体振荡器提供高频率稳定度 |
| 优点 | 小调制指数 NBFM 易于用线性结构近似生成 |
| 缺点 | 倍频级数较多时噪声和杂散分量增加 |
| 缺点 | 需要多级带通滤波器选择目标谐波或变频结果 |

## 14-7 频分复用 Frequency Division Multiplexing

### 14-7-1 FDM 基本结构 Basic Structure of FDM

:::: definition 频分复用 Frequency Division Multiplexing
**频分复用 Frequency Division Multiplexing, FDM** 把多个独立信号调制到不同子载波上，使它们在同一物理信道中占据不同频带。
::::

每个信号对应一个 **子载波 Subcarrier**。相邻子载波之间保留 **保护带 Guard Band**，用于减小滤波器过渡带造成的频谱重叠。

FDM 中的每个子信道可使用不同调制方式，例如：

- DSB-SC；
- AM；
- SSB-SC；
- FM 或 PM。

---

### 14-7-2 接收端分离 Receiver Separation

接收端先得到复合基带或中频信号，再用带通滤波器分离各个子信道。每个子信道随后用对应的解调器恢复原始消息。

基本接收流程为

$$
\text{Composite signal}
\rightarrow
\text{Bandpass filters}
\rightarrow
\text{Individual demodulators}
\rightarrow
\text{Baseband messages}.
$$

FDM 的关键约束是频谱不能重叠。保护带越大，串扰越小，但频谱利用率也越低。

---

### 14-7-3 模拟电话系统例子 Analog Telephone Example

模拟长途电话系统使用 FDM 把多个语音信道组合到更高频带。课件中的 L-carrier 层级示例中，12 个语音信道组成一个基本组，占据

$$
60\,\mathrm{kHz}\text{--}108\,\mathrm{kHz}.
$$

每个语音信道间隔约为 $4\,\mathrm{kHz}$，通常采用 LSB 形式排列。多个基本组又可继续组成 super-group。

![FDM 话音信道组](<CPS Lecture 14 FM Generation.attachments/fdm-voice-channel-group.jpg>)

| 层级 | 频率范围 | 说明 |
| --- | --- | --- |
| Voice channel | 约 $4\,\mathrm{kHz}$ 间隔 | 单路语音 |
| Basic group | $60\,\mathrm{kHz}\text{--}108\,\mathrm{kHz}$ | 12 路语音 |
| Super-group | 更高频段 | 多个 basic group 继续复用 |
