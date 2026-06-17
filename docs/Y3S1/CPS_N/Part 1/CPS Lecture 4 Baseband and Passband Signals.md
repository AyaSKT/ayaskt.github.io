---
author: Ayaskt
---

# Baseband and Passband Signals

## 章节目录

- [4-1 信号带宽 Signal Bandwidth](#4-1-信号带宽-signal-bandwidth)
  - [4-1-1 带宽的含义 Meaning of Bandwidth](#4-1-1-带宽的含义-meaning-of-bandwidth)
  - [4-1-2 正频率和共轭对称 Positive Frequencies and Conjugate Symmetry](#4-1-2-正频率和共轭对称-positive-frequencies-and-conjugate-symmetry)
  - [4-1-3 本质带宽 Essential Bandwidth](#4-1-3-本质带宽-essential-bandwidth)
  - [4-1-4 其他带宽定义 Other Width Definitions](#4-1-4-其他带宽定义-other-width-definitions)
- [4-2 能量谱密度与功率谱密度 ESD and PSD](#4-2-能量谱密度与功率谱密度-esd-and-psd)
  - [4-2-1 能量谱密度 Energy Spectral Density](#4-2-1-能量谱密度-energy-spectral-density)
  - [4-2-2 自相关 Autocorrelation](#4-2-2-自相关-autocorrelation)
  - [4-2-3 功率谱密度 Power Spectral Density](#4-2-3-功率谱密度-power-spectral-density)
- [4-3 基带和通带信号 Baseband and Passband Signals](#4-3-基带和通带信号-baseband-and-passband-signals)
  - [4-3-1 基带信号 Baseband Signal](#4-3-1-基带信号-baseband-signal)
  - [4-3-2 通带信号 Passband Signal](#4-3-2-通带信号-passband-signal)
  - [4-3-3 基带信道和通带信道 Baseband and Passband Channels](#4-3-3-基带信道和通带信道-baseband-and-passband-channels)
- [4-4 基带到通带 Baseband to Passband](#4-4-基带到通带-baseband-to-passband)
  - [4-4-1 余弦和正弦调制 Cosine and Sine Modulation](#4-4-1-余弦和正弦调制-cosine-and-sine-modulation)
  - [4-4-2 I 和 Q 分量 I and Q Components](#4-4-2-i-和-q-分量-i-and-q-components)
  - [4-4-3 上变频 Upconversion](#4-4-3-上变频-upconversion)
  - [4-4-4 下变频 Downconversion](#4-4-4-下变频-downconversion)
  - [4-4-5 I 和 Q 的正交性 Orthogonality of I and Q](#4-4-5-i-和-q-的正交性-orthogonality-of-i-and-q)
- [4-5 复包络 Complex Envelope](#4-5-复包络-complex-envelope)
  - [4-5-1 矩形坐标和极坐标 Rectangular and Polar Forms](#4-5-1-矩形坐标和极坐标-rectangular-and-polar-forms)
  - [4-5-2 频域构造 Frequency Domain Construction](#4-5-2-频域构造-frequency-domain-construction)
  - [4-5-3 现代收发机 Modern Transceivers](#4-5-3-现代收发机-modern-transceivers)
  - [4-5-4 频率和相位参考 Choice of Reference](#4-5-4-频率和相位参考-choice-of-reference)
- [4-6 复习重点 Review Checklist](#4-6-复习重点-review-checklist)
  - [4-6-1 本讲公式 Formula List](#4-6-1-本讲公式-formula-list)
  - [4-6-2 概念关系 Concept Map](#4-6-2-概念关系-concept-map)

## 4-1 信号带宽 Signal Bandwidth

### 4-1-1 带宽的含义 Meaning of Bandwidth

:::: definition 信号带宽 Signal Bandwidth
**信号带宽 Signal Bandwidth** 描述信号在频域中占用的频率范围。
::::

例如 WiFi 信号可能占用 $20\,\mathrm{MHz}$ 带宽，频率范围从 $2.40\,\mathrm{GHz}$ 到 $2.42\,\mathrm{GHz}$。这里的 $20\,\mathrm{MHz}$ 描述频率占用宽度，$2.4\,\mathrm{GHz}$ 附近描述信号所在位置。

带宽和数据速率、信号变化速度、滤波器设计、频谱监管直接相关。通信系统设计时，信号必须落在被分配或允许使用的频段内。

---

### 4-1-2 正频率和共轭对称 Positive Frequencies and Conjugate Symmetry

物理通信信号通常是实值时域信号。若：

$$
u(t)\in\mathbb R
$$

则其频谱满足 **共轭对称 Conjugate Symmetry**：

$$
U(-f)=U^*(f)
$$

因此幅度谱满足：

$$
\lvert U(-f)\rvert=\lvert U(f)\rvert
$$

负频率用于表示复指数旋转方向。对实值信号，正频率部分已经能确定负频率部分。

---

### 4-1-3 本质带宽 Essential Bandwidth

:::: definition 本质带宽 Essential Bandwidth
**本质带宽 Essential Bandwidth** 是包含信号主要能量或功率的频率范围。范围之外的频谱分量可以被抑制，且对信号形状和能量影响较小。
::::

实际信号的频谱常延伸到无穷远，但有限能量信号的频谱必须在远离主要频段时趋近于 $0$。

若 $g(t)\xleftrightarrow{\mathcal F}G(f)$，采用 $f$ 形式 Fourier 变换：

$$
G(f)=\int_{-\infty}^{\infty}g(t)e^{-j2\pi ft}\,dt
$$

Parseval 定理为：

$$
E_g=\int_{-\infty}^{\infty}\lvert g(t)\rvert^2\,dt
=
\int_{-\infty}^{\infty}\lvert G(f)\rvert^2\,df
$$

对低通信号，若希望选择包含 $90\%$ 能量的带宽 $B$，定义：

$$
E_B=\int_{-B}^{B}\lvert G(f)\rvert^2\,df
$$

要求：

$$
\frac{E_B}{E_g}=0.9
$$

同理也可以使用 $95\%$ 或 $99\%$ 能量作为标准。标准由应用的误差容忍度决定。

---

### 4-1-4 其他带宽定义 Other Width Definitions

课程中提到的其他宽度定义包括：

| 定义 | 含义 |
| --- | --- |
| $95\%$ 能量带宽 | 包含总能量 $95\%$ 的最小频带 |
| $99\%$ 能量带宽 | 包含总能量 $99\%$ 的最小频带 |
| 半幅宽度 Half Amplitude Width | 幅度下降到峰值一半处的宽度 |
| 半功率宽度 Half Power Width | 功率下降到峰值一半处的宽度，幅度为峰值的 $1/\sqrt{2}$ |
| $50\%$ 能量宽度 | 包含总能量一半的频带 |

半功率点常称为 $3\,\mathrm{dB}$ 点，因为：

$$
10\log_{10}{\left(\frac{1}{2}\right)}
\approx -3.01\,\mathrm{dB}
$$

## 4-2 能量谱密度与功率谱密度 ESD and PSD

### 4-2-1 能量谱密度 Energy Spectral Density

:::: definition 能量谱密度 Energy Spectral Density
对能量信号 $g(t)$，其 **能量谱密度 Energy Spectral Density, ESD** 定义为：

$$
\Psi_g(f)=\lvert G(f)\rvert^2
$$
::::

总能量可由 ESD 积分得到：

$$
E_g=\int_{-\infty}^{\infty}\Psi_g(f)\,df
$$

ESD 表示信号能量在频率轴上的分布。若某段频率上的 $\Psi_g(f)$ 很大，说明信号能量主要集中在那段频率。

---

### 4-2-2 自相关 Autocorrelation

:::: definition 自相关 Autocorrelation
能量信号 $g(t)$ 的 **自相关 Autocorrelation** 可定义为：

$$
\mathcal R_g(\tau)=
\int_{-\infty}^{\infty}g(t)g^*(t-\tau)\,dt
$$
::::

自相关描述信号与自身延迟版本之间的相似度。当 $\tau=0$ 时：

$$
\mathcal R_g(0)=
\int_{-\infty}^{\infty}\lvert g(t)\rvert^2\,dt
=E_g
$$

自相关和能量谱密度是一对 Fourier 变换关系：

$$
\mathcal R_g(\tau)
\xleftrightarrow{\mathcal F}
\Psi_g(f)
$$

这条关系将时域相似性和频域能量分布连接起来。

---

### 4-2-3 功率谱密度 Power Spectral Density

:::: definition 功率谱密度 Power Spectral Density
对功率信号 $g(t)$，其 **功率谱密度 Power Spectral Density, PSD** 记为 $S_g(f)$，表示平均功率在频率轴上的分布。
::::

功率信号的自相关定义为：

$$
\mathcal R_g(\tau)=
\lim_{T\to\infty}
\frac{1}{T}
\int_{-T/2}^{T/2}g(t)g^*(t-\tau)\,dt
$$

PSD 是自相关的 Fourier 变换：

$$
S_g(f)=\mathcal F\{\mathcal R_g(\tau)\}
$$

平均功率由 PSD 积分得到：

$$
P_g=\int_{-\infty}^{\infty}S_g(f)\,df
$$

能量信号使用 ESD，功率信号使用 PSD。通信中的噪声、周期载波和长时间数据流通常按功率谱密度处理。

## 4-3 基带和通带信号 Baseband and Passband Signals

### 4-3-1 基带信号 Baseband Signal

:::: definition 基带信号 Baseband Signal
**基带信号 Baseband Signal** 的能量或功率集中在直流 DC 附近的低频带内。
::::

若基带信号记为 $u(t)$，其频谱满足近似：

$$
U(f)\approx 0,\qquad \lvert f\rvert>W
$$

其中 $W$ 是基带带宽。

实值基带信号满足：

$$
U(-f)=U^*(f)
$$

所以频谱关于 $f=0$ 共轭对称。

---

### 4-3-2 通带信号 Passband Signal

:::: definition 通带信号 Passband Signal
**通带信号 Passband Signal** 的能量或功率集中在远离直流的某个载波频率附近。
::::

若通带信号中心频率为 $f_c$，相对中心频率的单边带宽为 $W$，则频谱主要集中在 $\pm f_c$ 附近：

$$
U_p(f)\approx 0,
\qquad
\lvert f-f_c\rvert>W
\ \text{and}\
\lvert f+f_c\rvert>W
$$

也就是说，正频率通带大约覆盖 $f_c-W$ 到 $f_c+W$，占用宽度约为 $2W$。

通常要求：

$$
f_c>W>0
$$

这样正频段和负频段不会压到 DC 附近，也便于用复包络描述。

---

### 4-3-3 基带信道和通带信道 Baseband and Passband Channels

信道常用 LTI 系统近似。信号先通过信道，再叠加噪声：

$$
r(t)=s(t)*h(t)+n(t)
$$

其中：

- $s(t)$：发射信号；
- $h(t)$：信道冲激响应；
- $n(t)$：噪声；
- $r(t)$：接收信号。

按频段分：

| 类型 | 频率位置 | 例子 |
| --- | --- | --- |
| 基带信道 Baseband Channel | DC 附近 | 有线数字基带链路、短距离音频链路 |
| 通带信道 Passband Channel | 某个载波频率附近 | 无线电、蜂窝、卫星、微波链路 |

通带系统可以用复基带形式统一处理。这样做可以把高频载波的快速振荡移除，只分析承载信息的慢变化包络。

## 4-4 基带到通带 Baseband to Passband

### 4-4-1 余弦和正弦调制 Cosine and Sine Modulation

设 $m(t)$ 是实值基带消息信号，频谱为 $M(f)$。

乘以余弦载波：

$$
u_p(t)=m(t)\cos{(2\pi f_ct)}
$$

由调制性质：

$$
U_p(f)=
\frac{1}{2}
\left[
M(f-f_c)+M(f+f_c)
\right]
$$

乘以正弦载波：

$$
v_p(t)=m(t)\sin{(2\pi f_ct)}
$$

对应频谱为：

$$
V_p(f)=
\frac{1}{2j}
\left[
M(f-f_c)-M(f+f_c)
\right]
$$

余弦和正弦调制都会把基带频谱搬移到 $\pm f_c$ 附近。载波频率应大于消息带宽，避免频谱与 DC 附近混叠。

---

### 4-4-2 I 和 Q 分量 I and Q Components

:::: definition I 分量 In-phase Component
**I 分量 In-phase Component** 是乘在余弦载波上的基带分量，常记为 $u_c(t)$。
::::

:::: definition Q 分量 Quadrature Component
**Q 分量 Quadrature Component** 是乘在负正弦载波上的基带分量，常记为 $u_s(t)$。
::::

通带信号可写成：

$$
u_p(t)=u_c(t)\cos{(2\pi f_ct)}
-u_s(t)\sin{(2\pi f_ct)}
$$

$u_c(t)$ 和 $u_s(t)$ 都是低频基带分量。它们可以分别承载信息，合成后共享同一个载波频率。

---

### 4-4-3 上变频 Upconversion

:::: definition 上变频 Upconversion
**上变频 Upconversion** 是把基带信号搬移到通带频率附近的过程，通常发生在发射机中。
::::

IQ 上变频公式为：

$$
\boxed{
u_p(t)=u_c(t)\cos{(2\pi f_ct)}
-u_s(t)\sin{(2\pi f_ct)}
}
$$

实际发射机可能分多级上变频。每一级都要满足频谱模板、镜像抑制和带外发射限制。

---

### 4-4-4 下变频 Downconversion

:::: definition 下变频 Downconversion
**下变频 Downconversion** 是把通带接收信号搬回基带的过程，通常发生在接收机中。
::::

接收机若拥有与来波同频同相的本地载波，则称为 **相干接收 Coherent Reception**。

恢复 I 分量时，将 $u_p(t)$ 乘以 $2\cos{(2\pi f_ct)}$：

$$
\begin{aligned}
2u_p(t)\cos{(2\pi f_ct)}
&=2u_c(t)\cos^2{(2\pi f_ct)}
-2u_s(t)\sin{(2\pi f_ct)}\cos{(2\pi f_ct)}\\
&=u_c(t)
+u_c(t)\cos{(4\pi f_ct)}
-u_s(t)\sin{(4\pi f_ct)}
\end{aligned}
$$

低通滤波器去除 $2f_c$ 附近的高频项，留下：

$$
\operatorname{LPF}
\{2u_p(t)\cos{(2\pi f_ct)}\}
=u_c(t)
$$

恢复 Q 分量时，将 $u_p(t)$ 乘以 $-2\sin{(2\pi f_ct)}$：

$$
\begin{aligned}
-2u_p(t)\sin{(2\pi f_ct)}
&=-2u_c(t)\cos{(2\pi f_ct)}\sin{(2\pi f_ct)}
+2u_s(t)\sin^2{(2\pi f_ct)}\\
&=u_s(t)
-u_s(t)\cos{(4\pi f_ct)}
-u_c(t)\sin{(4\pi f_ct)}
\end{aligned}
$$

低通后：

$$
\operatorname{LPF}
\{-2u_p(t)\sin{(2\pi f_ct)}\}
=u_s(t)
$$

---

### 4-4-5 I 和 Q 的正交性 Orthogonality of I and Q

:::: definition 正交 Orthogonality
两个信号在给定积分区间上的内积为 $0$，称它们在该区间内 **正交 Orthogonal**。
::::

余弦和正弦载波在整数个载波周期上正交：

$$
\int_{t_0}^{t_0+NT_c}
\cos{(2\pi f_ct)}
\sin{(2\pi f_ct)}\,dt
=0
$$

其中 $T_c=1/f_c$，$N$ 为正整数。

这使 I 和 Q 两个分量可以在同一个频率上并行承载信息。乘法下变频后，目标分量落回 DC 附近，交叉项落在 $2f_c$ 附近，再由低通滤波器去除。

## 4-5 复包络 Complex Envelope

### 4-5-1 矩形坐标和极坐标 Rectangular and Polar Forms

:::: definition 复包络 Complex Envelope
通带信号的 **复包络 Complex Envelope** 是：

$$
u(t)=u_c(t)+ju_s(t)
$$
::::

通带信号可由复包络重建：

$$
\boxed{
u_p(t)=\operatorname{Re}
\left\{
u(t)e^{j2\pi f_ct}
\right\}
}
$$

代入 $u(t)=u_c(t)+ju_s(t)$：

$$
\operatorname{Re}
\left\{
(u_c(t)+ju_s(t))
(\cos{(2\pi f_ct)}+j\sin{(2\pi f_ct)})
\right\}
=u_c(t)\cos{(2\pi f_ct)}
-u_s(t)\sin{(2\pi f_ct)}
$$

复包络也可以写成极坐标：

$$
u(t)=e(t)e^{j\theta(t)}
$$

其中：

$$
e(t)=\sqrt{u_c^2(t)+u_s^2(t)}
$$

$$
\theta(t)=\operatorname{atan2}\!\left(u_s(t),u_c(t)\right)
$$

于是通带信号也可以写作：

$$
u_p(t)=e(t)\cos{(2\pi f_ct+\theta(t))}
$$

三种等价表示：

| 表示 | 公式 | 含义 |
| --- | --- | --- |
| I/Q 矩形坐标 | $u_c(t),u_s(t)$ | 两条正交基带分支 |
| 包络相位 | $e(t),\theta(t)$ | 幅度包络和瞬时相位 |
| 复包络 | $u(t)=u_c(t)+ju_s(t)$ | 现代收发机最常用形式 |

---

### 4-5-2 频域构造 Frequency Domain Construction

对实值通带信号 $u_p(t)$，频谱 $U_p(f)$ 共轭对称。先取其正频率部分：

$$
U_p^+(f)=
\begin{cases}
U_p(f), & f>0\\
0, & f<0
\end{cases}
$$

构造解析通带信号 $c(t)$ 的频谱：

$$
C(f)=2U_p^+(f)
=
\begin{cases}
2U_p(f), & f>0\\
0, & f<0
\end{cases}
$$

复基带信号由解析通带信号下移 $f_c$ 得到：

$$
u(t)=c(t)e^{-j2\pi f_ct}
$$

频域中：

$$
U(f)=C(f+f_c)
$$

反过来，实值通带频谱可由解析信号恢复：

$$
U_p(f)=\frac{1}{2}C(f)+\frac{1}{2}C^*(-f)
$$

时域中：

$$
u_p(t)=\frac{1}{2}c(t)+\frac{1}{2}c^*(t)
=\operatorname{Re}\{c(t)\}
$$

由于 $c(t)=u(t)e^{j2\pi f_ct}$，得到：

$$
u_p(t)=\operatorname{Re}
\left\{
u(t)e^{j2\pi f_ct}
\right\}
$$

---

### 4-5-3 现代收发机 Modern Transceivers

现代收发机主要处理复基带信号，原因有三点：

- 固定载波 $f_c$ 引入的快速相位旋转是可预测的；
- 信息位于 $u_c(t)$、$u_s(t)$ 或 $u(t)$ 的慢变化中；
- 复基带采样率由带宽决定，远低于直接采样通带载波所需的速率。

通带滤波也可以等效搬到复基带处理。若通带系统的正频率响应搬移到基带，数字滤波器可以直接作用于复样本序列。

课程后面出现的 AM、FM、PM、QAM 和数字调制，都会反复使用复基带表示。

---

### 4-5-4 频率和相位参考 Choice of Reference

复基带表示依赖选择的频率参考和相位参考。设同一个通带信号有两种表示：

$$
u_p(t)=
\operatorname{Re}
\left\{
u_1(t)e^{j(2\pi f_1t+\theta_1)}
\right\}
$$

$$
u_p(t)=
\operatorname{Re}
\left\{
u_2(t)e^{j(2\pi f_2t+\theta_2)}
\right\}
$$

把第一种表示改写为第二个参考：

$$
\begin{aligned}
u_p(t)
&=\operatorname{Re}
\left\{
u_1(t)e^{j(2\pi f_1t+\theta_1)}
\right\}\\
&=\operatorname{Re}
\left\{
\left[
u_1(t)
e^{j(2\pi(f_1-f_2)t+\theta_1-\theta_2)}
\right]
e^{j(2\pi f_2t+\theta_2)}
\right\}
\end{aligned}
$$

比较可得：

$$
\boxed{
u_2(t)=
u_1(t)
e^{j(2\pi(f_1-f_2)t+\theta_1-\theta_2)}
}
$$

更换参考频率会在复包络中引入额外旋转；更换相位参考会引入常数相位旋转。

## 4-6 复习重点 Review Checklist

### 4-6-1 本讲公式 Formula List

| 内容 | 公式 |
| --- | --- |
| 实值信号共轭对称 | $U(-f)=U^*(f)$ |
| Parseval 定理 | $E_g=\int\lvert g(t)\rvert^2dt=\int\lvert G(f)\rvert^2df$ |
| 本质带宽能量比例 | $E_B/E_g=\alpha$ |
| ESD | $\Psi_g(f)=\lvert G(f)\rvert^2$ |
| PSD | $S_g(f)=\mathcal F\{\mathcal R_g(\tau)\}$ |
| 基带频谱 | $U(f)\approx0,\ \lvert f\rvert>W$ |
| 通带条件 | $f_c>W>0$ |
| 余弦调制 | $m(t)\cos{(2\pi f_ct)}\leftrightarrow \dfrac{1}{2}[M(f-f_c)+M(f+f_c)]$ |
| 正弦调制 | $m(t)\sin{(2\pi f_ct)}\leftrightarrow \dfrac{1}{2j}[M(f-f_c)-M(f+f_c)]$ |
| IQ 通带信号 | $u_p(t)=u_c(t)\cos{(2\pi f_ct)}-u_s(t)\sin{(2\pi f_ct)}$ |
| 复包络 | $u(t)=u_c(t)+ju_s(t)$ |
| 通带重建 | $u_p(t)=\operatorname{Re}\{u(t)e^{j2\pi f_ct}\}$ |
| 包络相位 | $u(t)=e(t)e^{j\theta(t)}$ |
| 参考变换 | $u_2(t)=u_1(t)e^{j(2\pi(f_1-f_2)t+\theta_1-\theta_2)}$ |

---

### 4-6-2 概念关系 Concept Map

本讲的主线：

$$
\text{Bandwidth}
\rightarrow
\text{Baseband}
\rightarrow
\text{Passband}
\rightarrow
\text{IQ Representation}
\rightarrow
\text{Complex Envelope}
$$

复习时按下面几句话串起来：

1. 带宽描述信号频谱占用；
2. 本质带宽用能量或功率比例定义；
3. 基带信号集中在 DC 附近；
4. 通带信号集中在 $\pm f_c$ 附近；
5. 乘以载波会把基带频谱搬移到通带；
6. I 和 Q 使用正交载波并行承载两个基带分量；
7. 复包络 $u(t)$ 包含通带信号的全部信息；
8. 现代通信收发机主要在复基带中完成 DSP。
