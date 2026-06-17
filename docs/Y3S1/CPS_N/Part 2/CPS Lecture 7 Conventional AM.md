---
author: Ayaskt
---

# Conventional AM

## 章节目录

- [7-1 常规调幅的动机 Need for Conventional AM](#7-1-常规调幅的动机-need-for-conventional-am)
  - [7-1-1 DSB-SC 的同步代价 Synchronisation Cost of DSB-SC](#7-1-1-dsb-sc-的同步代价-synchronisation-cost-of-dsb-sc)
  - [7-1-2 带载波双边带 DSB-WC](#7-1-2-带载波双边带-dsb-wc)
- [7-2 常规 AM 调制 AM Modulation](#7-2-常规-am-调制-am-modulation)
  - [7-2-1 时域表达式 Time-Domain Expression](#7-2-1-时域表达式-time-domain-expression)
  - [7-2-2 频谱 Spectrum](#7-2-2-频谱-spectrum)
  - [7-2-3 带宽与功率浪费 Bandwidth and Power Waste](#7-2-3-带宽与功率浪费-bandwidth-and-power-waste)
- [7-3 包络与调制指数 Envelope and Modulation Index](#7-3-包络与调制指数-envelope-and-modulation-index)
  - [7-3-1 包络 Envelope](#7-3-1-包络-envelope)
  - [7-3-2 调制指数 Modulation Index](#7-3-2-调制指数-modulation-index)
  - [7-3-3 过调制 Over-Modulation](#7-3-3-过调制-over-modulation)
- [7-4 AM 功率效率 Power Efficiency](#7-4-am-功率效率-power-efficiency)
  - [7-4-1 载波功率 Carrier Power](#7-4-1-载波功率-carrier-power)
  - [7-4-2 边带功率 Sideband Power](#7-4-2-边带功率-sideband-power)
  - [7-4-3 单音调制 Tone Modulation](#7-4-3-单音调制-tone-modulation)
- [7-5 AM 解调 AM Demodulation](#7-5-am-解调-am-demodulation)
  - [7-5-1 包络检波条件 Conditions for Envelope Detection](#7-5-1-包络检波条件-conditions-for-envelope-detection)
  - [7-5-2 包络检波器 Envelope Detector](#7-5-2-包络检波器-envelope-detector)
  - [7-5-3 整流检波器 Rectifier Detector](#7-5-3-整流检波器-rectifier-detector)
- [7-6 例题 Examples](#7-6-例题-examples)
- [7-7 小结 Summary](#7-7-小结-summary)

## 7-1 常规调幅的动机 Need for Conventional AM

### 7-1-1 DSB-SC 的同步代价 Synchronisation Cost of DSB-SC

DSB-SC 的接收端必须生成一个与发射端同频同相的本地载波。传播时延、振荡器漂移和多普勒频移都会破坏这个同步条件。

广播系统中，一个发射机对应大量接收机。若每台接收机都要做严格相干同步，接收机成本会明显上升。

---

### 7-1-2 带载波双边带 DSB-WC

:::: definition 带载波双边带 Double Sideband With Carrier
**带载波双边带 Double Sideband With Carrier, DSB-WC** 在 DSB-SC 信号之外额外发送一个强载波，使接收端可用包络检波恢复消息。

DSB-WC 也称为**常规调幅 Conventional Amplitude Modulation**。
::::

工程取舍很清楚：发射端发送较强载波，换来接收端更简单的检波器。AM 广播正是这种取舍。

## 7-2 常规 AM 调制 AM Modulation

### 7-2-1 时域表达式 Time-Domain Expression

常规 AM 信号为：

$$
\boxed{
\varphi_{\mathrm{AM}}(t)=A_c\cos{(2\pi f_c t)}+m(t)\cos{(2\pi f_c t)}
}
$$

也可写成：

$$
\boxed{
\varphi_{\mathrm{AM}}(t)=\left[A_c+m(t)\right]\cos{(2\pi f_c t)}
}
$$

其中：
- $A_c$：载波振幅 Carrier Amplitude；
- $f_c$：载波频率 Carrier Frequency；
- $m(t)$：消息信号 Message Signal。

![常规 AM 波形](<CPS Lecture 7 Conventional AM.attachments/l7-am-waveform.jpg>)

---

### 7-2-2 频谱 Spectrum

对上式取傅里叶变换：

$$
\boxed{
\Phi_{\mathrm{AM}}(f)
=\frac{1}{2}\left[M(f-f_c)+M(f+f_c)\right]
+\frac{A_c}{2}\left[\delta(f-f_c)+\delta(f+f_c)\right]
}
$$

前半部分是 DSB-SC 的两个边带。后半部分是在 $\pm f_c$ 处额外出现的载波冲激。

![常规 AM 频谱](<CPS Lecture 7 Conventional AM.attachments/l7-am-spectrum.jpg>)

---

### 7-2-3 带宽与功率浪费 Bandwidth and Power Waste

若消息信号带宽为 $B\,\mathrm{Hz}$，常规 AM 的射频带宽为：

$$
B_{\mathrm{AM}}=2B
$$

AM 的主要缺点有两个：
- 带宽效率低，因为任意一个边带已经包含完整消息；
- 功率效率低，因为强载波不携带消息信息。

## 7-3 包络与调制指数 Envelope and Modulation Index

### 7-3-1 包络 Envelope

:::: definition 包络 Envelope
**包络 Envelope** 是 AM 信号高频载波振荡外侧的慢变轮廓。

对常规 AM，常把慢变包络函数写为：

$$
e(t)=A_c+m(t)
$$
::::

严格说，物理外包络是 $\lvert A_c+m(t)\rvert$。若 $A_c+m(t)\geq0$ 对所有 $t$ 成立，物理外包络与 $e(t)$ 一致，包络就是消息信号加上直流偏置的真实复现。下图左侧为正常包络，右侧为过调制后的失真包络。

![正常包络与过调制包络对比](<CPS Lecture 7 Conventional AM.attachments/l7-envelope-comparison-wide.jpg>)

---

### 7-3-2 调制指数 Modulation Index

:::: definition 调制指数 Modulation Index
**调制指数 Modulation Index** 衡量消息峰值相对于载波振幅的比例。

$$
\mu=\frac{m_p}{A_c}
$$
::::

其中 $m_p$ 为消息信号峰值。若写成归一化消息 $x(t)$，且 $\lvert x(t)\rvert\leq1$：

$$
\varphi_{\mathrm{AM}}(t)=A_c\left[1+\mu x(t)\right]\cos{(2\pi f_c t)}
$$

对于单音消息，或正负峰值对称的归一化消息，在未过调制条件下，可由示波器包络最大值 $E_{\max}$ 与最小值 $E_{\min}$ 直接求：

$$
\boxed{
\mu=\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}
}
$$

---

### 7-3-3 过调制 Over-Modulation

:::: definition 过调制 Over-Modulation
**过调制 Over-Modulation** 指 $\mu>1$，即消息峰值超过载波振幅，导致 $A_c+m(t)$ 出现负值。
::::

当 $A_c+m(t)<0$ 时，AM 信号发生相位翻转。包络检波器只能跟踪外轮廓，输出会失真。

判断顺序：
1. 先检查 $\mu\leq1$；
2. 再使用包络检波；
3. 若 $\mu>1$，包络法不能无失真恢复 $m(t)$。

## 7-4 AM 功率效率 Power Efficiency

### 7-4-1 载波功率 Carrier Power

AM 信号分解为：

$$
\varphi_{\mathrm{AM}}(t)
=\underbrace{A_c\cos{(2\pi f_c t)}}_{\text{carrier}}
+\underbrace{m(t)\cos{(2\pi f_c t)}}_{\text{sidebands}}
$$

载波平均功率为：

$$
\boxed{
P_c=\frac{A_c^2}{2}
}
$$

这里默认负载电阻归一化为 $1\,\Omega$。若负载为 $R$，功率再除以 $R$。

---

### 7-4-2 边带功率 Sideband Power

定义消息平均功率：

$$
P_m=\lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}m^2(t)\,dt
$$

边带功率为：

$$
P_s
=\lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}m^2(t)\cos^2{(2\pi f_c t)}\,dt
=\frac{1}{2}P_m
$$

功率效率定义为有用功率占总功率的比例：

$$
\eta=\frac{P_s}{P_c+P_s}
$$

代入：

$$
\boxed{
\eta
=\frac{\frac{1}{2}P_m}{\frac{1}{2}A_c^2+\frac{1}{2}P_m}
=\frac{P_m}{A_c^2+P_m}
}
$$

---

### 7-4-3 单音调制 Tone Modulation

若：

$$
m(t)=\mu A_c\cos{(2\pi f_m t)}
$$

则：

$$
P_m=\frac{(\mu A_c)^2}{2}
$$

代入功率效率：

$$
\boxed{
\eta=\frac{\mu^2}{2+\mu^2}
}
$$

当 $\mu=1$ 时：

$$
\eta_{\max}=\frac{1}{3}
$$

常规 AM 即使在不失真的最大调制深度下，最多也只有三分之一功率用于边带。

## 7-5 AM 解调 AM Demodulation

### 7-5-1 包络检波条件 Conditions for Envelope Detection

:::: definition 包络检波 Envelope Detection
**包络检波 Envelope Detection** 是通过跟踪 AM 信号外包络来恢复消息信号的非相干解调方法。
::::

包络检波正常工作需要两个条件：

$$
f_c\gg B
$$

$$
A_c+m(t)\geq0
$$

第一个条件避免正负频率搬移后的谱分量在基带附近重叠。第二个条件避免包络相位翻转。

---

### 7-5-2 包络检波器 Envelope Detector

![包络检波电路](<CPS Lecture 7 Conventional AM.attachments/l7-envelope-detector-circuit.jpg>)

二极管导通时，电容 $C$ 很快充到输入信号峰值。输入下降后，二极管截止，电容通过电阻 $R$ 缓慢放电。

RC 时间常数需同时满足：

$$
\boxed{
2\pi B < \frac{1}{RC} \ll \omega_c
}
$$

等价地：

$$
\boxed{
\frac{1}{\omega_c}\ll RC \ll \frac{1}{2\pi B}
}
$$

左边保证电容不会在每个载波周期内明显放电，输出纹波较小。右边保证电容能跟上包络的变化。

![包络检波 RC 条件](<CPS Lecture 7 Conventional AM.attachments/l7-envelope-detector-rc.jpg>)

---

### 7-5-3 整流检波器 Rectifier Detector

:::: definition 整流检波 Rectifier Detection
**整流检波 Rectifier Detection** 先对 AM 信号半波整流，再用低通滤波器取出基带分量。
::::

半波整流可看作与开关函数 $p(t)$ 相乘：

$$
v_{\mathrm{rect}}(t)
=\left[(A_c+m(t))\cos{(\omega_c t)}\right]p(t)
$$

其中：

$$
p(t)=\frac{1}{2}
+\frac{2}{\pi}\left[
\cos{(\omega_c t)}
-\frac{1}{3}\cos{(3\omega_c t)}
+\frac{1}{5}\cos{(5\omega_c t)}
-\cdots
\right]
$$

低通后保留：

$$
v_{\mathrm{LPF}}(t)=\frac{1}{\pi}\left[A_c+m(t)\right]
$$

直流项 $\frac{A_c}{\pi}$ 可由隔直电容去除，剩余项与 $m(t)$ 成正比。

## 7-6 例题 Examples

:::: stem L7-E1
示波器显示的 AM 信号包络最大值为 $E_{\max}=8$，最小值为 $E_{\min}=2$。求调制指数和单音 AM 功率效率。

![AM 包络例题波形](<CPS Lecture 7 Conventional AM.attachments/l7-example-waveform.jpg>)
::::

:::: solution
由包络最大最小值公式：

$$
\mu=\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}
=\frac{8-2}{8+2}
=0.6
$$

单音 AM 的功率效率为：

$$
\eta=\frac{\mu^2}{2+\mu^2}
=\frac{0.6^2}{2+0.6^2}
=0.1525
$$

即：

$$
\boxed{\eta\approx15.3\%}
$$
::::

:::: stem L7-E2
输入 AM 信号为：

$$
\varphi_{\mathrm{AM}}(t)
=\left[10+4\sin{(10\pi\times10^3t)}\right]\cos{(9.1\pi\times10^5t)}
$$

包络检波器电容 $C=10\,\mathrm{nF}$。按几何平均选取 RC 时间常数，估算 $R$。
::::

:::: solution
消息最高角频率为：

$$
\omega_m=10\pi\times10^3\ \mathrm{rad/s}
$$

载波角频率为：

$$
\omega_c=9.1\pi\times10^5\ \mathrm{rad/s}
$$

RC 条件为：

$$
\omega_m<\frac{1}{RC}\ll\omega_c
$$

取中间量：

$$
\frac{1}{RC}\approx\sqrt{\omega_m\omega_c}
$$

代入：

$$
RC\approx\frac{1}{\sqrt{(10\pi\times10^3)(9.1\pi\times10^5)}}
\approx3.34\times10^{-6}\ \mathrm{s}
$$

因此：

$$
R=\frac{RC}{C}
=\frac{3.34\times10^{-6}}{10\times10^{-9}}
\approx334\ \Omega
$$

可取标准值：

$$
\boxed{R\approx330\ \Omega}
$$
::::

## 7-7 小结 Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| AM 信号 | $\varphi_{\mathrm{AM}}(t)=[A_c+m(t)]\cos{(2\pi f_c t)}$ | DSB-SC 加载波 |
| 频谱 | DSB 边带 + $\pm f_c$ 载波冲激 | 接收端可包络检波 |
| 包络 | $E(t)=A_c+m(t)$ | 需非负 |
| 调制指数 | $\mu=m_p/A_c$ | $\mu\leq1$ 避免过调制 |
| 功率效率 | $\eta=P_m/(A_c^2+P_m)$ | 有用功率为边带功率 |
| 单音效率 | $\eta=\mu^2/(2+\mu^2)$ | 最大 $1/3$ |
| RC 条件 | $2\pi B<1/(RC)\ll\omega_c$ | 同时抑制纹波和跟踪包络 |
