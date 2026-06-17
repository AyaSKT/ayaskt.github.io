---
author: Ayaskt
---

# Single Sideband Modulation

## 章节目录

- [8-1 SSB 的动机 Need for SSB](#8-1-ssb-的动机-need-for-ssb)
  - [8-1-1 双边带的信息重复 Information Duplication in DSB](#8-1-1-双边带的信息重复-information-duplication-in-dsb)
  - [8-1-2 单边带 Single Sideband](#8-1-2-单边带-single-sideband)
- [8-2 希尔伯特变换 Hilbert Transform](#8-2-希尔伯特变换-hilbert-transform)
  - [8-2-1 定义 Definition](#8-2-1-定义-definition)
  - [8-2-2 频域幅相特性 Frequency Response](#8-2-2-频域幅相特性-frequency-response)
- [8-3 SSB 信号表达式 SSB Signal Expression](#8-3-ssb-信号表达式-ssb-signal-expression)
  - [8-3-1 正负频率分解 Positive and Negative Frequency Decomposition](#8-3-1-正负频率分解-positive-and-negative-frequency-decomposition)
  - [8-3-2 USB 与 LSB 表达式 USB and LSB Expressions](#8-3-2-usb-与-lsb-表达式-usb-and-lsb-expressions)
- [8-4 SSB 信号产生 SSB Signal Generation](#8-4-ssb-信号产生-ssb-signal-generation)
  - [8-4-1 相移法 Phase Shift Method](#8-4-1-相移法-phase-shift-method)
  - [8-4-2 选择性滤波法 Selective Filtering](#8-4-2-选择性滤波法-selective-filtering)
  - [8-4-3 Weaver 方法 Weaver Method](#8-4-3-weaver-方法-weaver-method)
- [8-5 SSB 解调 SSB Demodulation](#8-5-ssb-解调-ssb-demodulation)
- [8-6 例题 Example](#8-6-例题-example)
- [8-7 小结 Summary](#8-7-小结-summary)

## 8-1 SSB 的动机 Need for SSB

### 8-1-1 双边带的信息重复 Information Duplication in DSB

DSB-SC 和常规 AM 都保留两个边带。对实值基带信号 $m(t)$，正负频率互为共轭，对应的上下边带都包含完整消息信息。

![DSB 中的上下边带](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-dsb-sidebands.jpg>)

若基带带宽为 $B\,\mathrm{Hz}$，DSB 需要 $2B\,\mathrm{Hz}$ 的射频带宽。传输任意一个边带就足以恢复 $m(t)$。

---

### 8-1-2 单边带 Single Sideband

:::: definition 单边带调制 Single Sideband Modulation
**单边带调制 Single Sideband Modulation, SSB** 只保留上边带或下边带中的一个，抑制另一个边带。
::::

SSB 的射频带宽为：

$$
\boxed{B_{\mathrm{SSB}}=B}
$$

发送端和接收端必须提前约定使用 **上边带 Upper Sideband, USB** 还是 **下边带 Lower Sideband, LSB**。若接收端按错边带解调，频谱会镜像或失真。

![SSB 边带选择](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-ssb-sideband-selection.jpg>)

SSB 的优势是带宽省一半，且若抑制载波，所有发射功率都用于消息相关分量。代价是产生和解调都比 DSB 更严格。

## 8-2 希尔伯特变换 Hilbert Transform

### 8-2-1 定义 Definition

:::: definition 希尔伯特变换 Hilbert Transform
**希尔伯特变换 Hilbert Transform** 是一种全通相移操作。它保持幅度谱不变，对正频率产生 $-90^\circ$ 相移，对负频率产生 $+90^\circ$ 相移。

$$
x_h(t)=\mathcal{H}\{x(t)\}
=\mathrm{p.v.}\,\frac{1}{\pi}\int_{-\infty}^{\infty}\frac{x(\alpha)}{t-\alpha}\,d\alpha
$$
::::

其中 $\mathrm{p.v.}$ 表示 Cauchy principal value，因为积分核在 $\alpha=t$ 处奇异。

它也可写为卷积：

$$
x_h(t)=x(t)*\frac{1}{\pi t}
$$

对消息信号 $m(t)$，其希尔伯特变换记为：

$$
m_h(t)=\mathcal{H}\{m(t)\}
$$

---

### 8-2-2 频域幅相特性 Frequency Response

希尔伯特变换器的频率响应为：

$$
H(f)=-j\operatorname{sgn}(f)
$$

即：

$$
H(f)=
\begin{cases}
-j=e^{-j\pi/2}, & f>0\\
j=e^{j\pi/2}, & f<0
\end{cases}
$$

幅度响应为：

$$
\lvert H(f)\rvert=1,\qquad f\neq0
$$

相位响应为：

$$
\theta_h(f)=
\begin{cases}
-\dfrac{\pi}{2}, & f>0\\
\dfrac{\pi}{2}, & f<0
\end{cases}
$$

![Hilbert 变换幅度响应与相位响应](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-hilbert-response-wide.jpg>)

对单音信号：

$$
\mathcal{H}\{\cos{(\omega_m t)}\}=\sin{(\omega_m t)}
$$

这个结论在 SSB 单音例题中会直接用到。

## 8-3 SSB 信号表达式 SSB Signal Expression

### 8-3-1 正负频率分解 Positive and Negative Frequency Decomposition

把消息谱分成正频率部分和负频率部分：

$$
M_+(f)=M(f)u(f)
=\frac{1}{2}M(f)\left[1+\operatorname{sgn}(f)\right]
$$

由 $M_h(f)=-jM(f)\operatorname{sgn}(f)$ 可得：

$$
M(f)\operatorname{sgn}(f)=jM_h(f)
$$

因此：

$$
\boxed{
M_+(f)=\frac{1}{2}\left[M(f)+jM_h(f)\right]
}
$$

同理：

$$
\boxed{
M_-(f)=\frac{1}{2}\left[M(f)-jM_h(f)\right]
}
$$

这一步把“保留一个边带”转换成了可在时域实现的 $m(t)$ 与 $m_h(t)$ 组合。

---

### 8-3-2 USB 与 LSB 表达式 USB and LSB Expressions

USB 频谱可写为：

$$
\Phi_{\mathrm{USB}}(f)=M_+(f-f_c)+M_-(f+f_c)
$$

代入 $M_+$ 与 $M_-$：

$$
\Phi_{\mathrm{USB}}(f)
=\frac{1}{2}\left[M(f-f_c)+M(f+f_c)\right]
-\frac{1}{2j}\left[M_h(f-f_c)-M_h(f+f_c)\right]
$$

反变换得到：

$$
\boxed{
\varphi_{\mathrm{USB}}(t)
=m(t)\cos{(\omega_c t)}-m_h(t)\sin{(\omega_c t)}
}
$$

同理：

$$
\boxed{
\varphi_{\mathrm{LSB}}(t)
=m(t)\cos{(\omega_c t)}+m_h(t)\sin{(\omega_c t)}
}
$$

统一写法为：

$$
\boxed{
\varphi_{\mathrm{SSB}}(t)
=m(t)\cos{(\omega_c t)}
\mp m_h(t)\sin{(\omega_c t)}
}
$$

其中上号对应 USB，下号对应 LSB。

> [!NOTE]
> 旧 CPS 笔记把 SSB 写成正交形式：同相支路 $m(t)\cos{(\omega_c t)}$ 与正交支路 $m_h(t)\sin{(\omega_c t)}$ 相加或相减。这个形式直接对应相移法硬件框图。

## 8-4 SSB 信号产生 SSB Signal Generation

### 8-4-1 相移法 Phase Shift Method

相移法直接实现：

$$
\varphi_{\mathrm{SSB}}(t)
=m(t)\cos{(\omega_c t)}
\mp m_h(t)\sin{(\omega_c t)}
$$

![SSB 相移法](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-phase-shift-method.jpg>)

结构包含两条支路：
- 同相支路：$m(t)$ 与 $\cos{(\omega_c t)}$ 相乘；
- 正交支路：$m(t)$ 先经 Hilbert 变换得到 $m_h(t)$，再与 $\sin{(\omega_c t)}$ 相乘；
- 输出端相减得到 USB，相加得到 LSB。

相移法可直接在目标载波频率上生成 SSB，也容易切换 USB/LSB。限制在于 Hilbert 变换器需要对整个消息带宽提供准确 $90^\circ$ 相移，实际电路只能近似。

---

### 8-4-2 选择性滤波法 Selective Filtering

:::: definition 选择性滤波法 Selective Filtering
**选择性滤波法 Selective Filtering** 先生成 DSB 信号，再用带通滤波器滤掉不需要的边带。
::::

![SSB 选择性滤波法](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-selective-filtering.jpg>)

若消息频谱在直流附近存在间隙：

$$
\omega_g=2\pi f_g
$$

调制到载波附近后，两个边带之间的间隙变成：

$$
2\omega_g=4\pi f_g
$$

这个间隙允许使用渐变截止滤波器。为降低邻道干扰，不需要的边带通常要求至少衰减 $40\,\mathrm{dB}$。

---

### 8-4-3 Weaver 方法 Weaver Method

:::: definition Weaver 方法 Weaver Method
**Weaver 方法 Weaver Method** 是两步调制法。它先在较低中频生成中间 SSB，再搬移到最终载波频率。
::::

![Weaver 两步调制法](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-weaver-method.jpg>)

当最终载波频率很高、可用过渡带太窄时，先用中间载波 $\omega_{c1}$ 生成中间 SSB，再上变频到 $\omega_{c2}$。

为避免低边带靠近频率原点造成干扰：

$$
2(\omega_{c1}+\omega_g)\geq0.01\omega_{c2}
$$

为保证最终频率处有足够间隙带：

$$
\omega_{c1}\geq \Omega_B+\omega_g,
\qquad
\Omega_B=2\pi B
$$

其中：
- $B$：以 Hz 表示的基带带宽；
- $\Omega_B$：对应的基带角频率带宽；
- $\omega_g$：直流间隙带宽；
- $\omega_{c1}$：中间载波角频率；
- $\omega_{c2}$：最终载波角频率。

## 8-5 SSB 解调 SSB Demodulation

SSB-SC 的解调器与 DSB-SC 相干解调器相同。

![SSB 同步解调器](<CPS Lecture 8 Single Sideband Modulation.attachments/l8-synchronous-demodulator.jpg>)

接收信号为：

$$
\varphi_{\mathrm{SSB}}(t)
=m(t)\cos{(\omega_c t)}
\mp m_h(t)\sin{(\omega_c t)}
$$

乘以 $2\cos{(\omega_c t)}$：

$$
\begin{aligned}
2\varphi_{\mathrm{SSB}}(t)\cos{(\omega_c t)}
&=2m(t)\cos^2{(\omega_c t)}
\mp2m_h(t)\sin{(\omega_c t)}\cos{(\omega_c t)}\\
&=m(t)\left[1+\cos{(2\omega_c t)}\right]
\mp m_h(t)\sin{(2\omega_c t)}
\end{aligned}
$$

整理为：

$$
2\varphi_{\mathrm{SSB}}(t)\cos{(\omega_c t)}
=m(t)+
\left[
m(t)\cos{(2\omega_c t)}
\mp m_h(t)\sin{(2\omega_c t)}
\right]
$$

方括号内是载波频率为 $2\omega_c$ 的高频 SSB 分量，低通滤波后得到：

$$
\boxed{y(t)=m(t)}
$$

SSB 仍然需要本地载波同步。频率误差会表现为恢复音频的整体频移，语音通信中会直接变成音调偏差。

## 8-6 例题 Example

:::: stem L8-E1
消息信号为：

$$
m(t)=A_m\cos{(\omega_m t)}
$$

求 USB 与 LSB 的 SSB 信号表达式。
::::

:::: solution
先求 Hilbert 变换：

$$
m_h(t)=\mathcal{H}\{A_m\cos{(\omega_m t)}\}
=A_m\sin{(\omega_m t)}
$$

USB 为：

$$
\begin{aligned}
\varphi_{\mathrm{USB}}(t)
&=m(t)\cos{(\omega_c t)}-m_h(t)\sin{(\omega_c t)}\\
&=A_m\cos{(\omega_m t)}\cos{(\omega_c t)}
-A_m\sin{(\omega_m t)}\sin{(\omega_c t)}\\
&=A_m\cos{[(\omega_c+\omega_m)t]}
\end{aligned}
$$

LSB 为：

$$
\begin{aligned}
\varphi_{\mathrm{LSB}}(t)
&=m(t)\cos{(\omega_c t)}+m_h(t)\sin{(\omega_c t)}\\
&=A_m\cos{(\omega_m t)}\cos{(\omega_c t)}
+A_m\sin{(\omega_m t)}\sin{(\omega_c t)}\\
&=A_m\cos{[(\omega_c-\omega_m)t]}
\end{aligned}
$$

因此：

$$
\boxed{
\varphi_{\mathrm{USB}}(t)=A_m\cos{[(\omega_c+\omega_m)t]},
\qquad
\varphi_{\mathrm{LSB}}(t)=A_m\cos{[(\omega_c-\omega_m)t]}
}
$$
::::

## 8-7 小结 Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| SSB 带宽 | $B_{\mathrm{SSB}}=B$ | 只有一个边带 |
| Hilbert 变换 | $H(f)=-j\operatorname{sgn}(f)$ | 正频率 $-90^\circ$，负频率 $+90^\circ$ |
| USB | $m(t)\cos{(\omega_c t)}-m_h(t)\sin{(\omega_c t)}$ | 保留上边带 |
| LSB | $m(t)\cos{(\omega_c t)}+m_h(t)\sin{(\omega_c t)}$ | 保留下边带 |
| 相移法 | 两条正交支路相加/相减 | 难点是宽带 $90^\circ$ 相移 |
| 选择性滤波法 | DSB 后接边带滤波器 | 依赖 gap-band |
| Weaver 方法 | 两步调制 | 降低高频滤波难度 |
| 解调 | $2\varphi_{\mathrm{SSB}}(t)\cos{(\omega_c t)}\xrightarrow{\mathrm{LPF}}m(t)$ | 需要同步 |
