---
author: Ayaskt
---

# CPS Lecture 11 FM and PM

## 章节目录

- [11-1 角度调制 Angle Modulation](#11-1-角度调制-angle-modulation)
  - [11-1-1 从幅度到角度 From Amplitude to Angle](#11-1-1-从幅度到角度-from-amplitude-to-angle)
  - [11-1-2 瞬时相位与瞬时频率 Instantaneous Phase and Instantaneous Frequency](#11-1-2-瞬时相位与瞬时频率-instantaneous-phase-and-instantaneous-frequency)
- [11-2 相位调制 Phase Modulation](#11-2-相位调制-phase-modulation)
  - [11-2-1 PM 信号模型 PM Signal Model](#11-2-1-pm-信号模型-pm-signal-model)
  - [11-2-2 PM 的瞬时频率 Instantaneous Frequency of PM](#11-2-2-pm-的瞬时频率-instantaneous-frequency-of-pm)
- [11-3 频率调制 Frequency Modulation](#11-3-频率调制-frequency-modulation)
  - [11-3-1 FM 信号模型 FM Signal Model](#11-3-1-fm-信号模型-fm-signal-model)
  - [11-3-2 频偏与频率灵敏度 Frequency Deviation and Frequency Sensitivity](#11-3-2-频偏与频率灵敏度-frequency-deviation-and-frequency-sensitivity)
- [11-4 PM 与 FM 的关系 Relationship Between PM and FM](#11-4-pm-与-fm-的关系-relationship-between-pm-and-fm)
  - [11-4-1 积分与微分关系 Integration and Differentiation Relationship](#11-4-1-积分与微分关系-integration-and-differentiation-relationship)
  - [11-4-2 单音信号下的相位差 Phase Shift for a Single Tone](#11-4-2-单音信号下的相位差-phase-shift-for-a-single-tone)
- [11-5 角度调制的性质与例题 Properties and Example](#11-5-角度调制的性质与例题-properties-and-example)
  - [11-5-1 恒包络与功率 Constant Envelope and Power](#11-5-1-恒包络与功率-constant-envelope-and-power)
  - [11-5-2 三角波消息例题 Triangular Message Example](#11-5-2-三角波消息例题-triangular-message-example)

## 11-1 角度调制 Angle Modulation

### 11-1-1 从幅度到角度 From Amplitude to Angle

**幅度调制 Amplitude Modulation** 通过改变载波的幅度传递消息。典型 AM 信号可写成

$$
s_{\mathrm{AM}}(t)=m(t)\cos{(2\pi f_c t)}.
$$

消息信号 $m(t)$ 直接缩放载波，所以包络随 $m(t)$ 改变。AM 是线性调制，频谱分析通常比较直接。

:::: definition 角度调制 Angle Modulation
**角度调制 Angle Modulation** 保持载波幅度不变，通过改变载波角度中的相位或频率传递消息信号。

$$
s(t)=A_c\cos{\theta(t)}
$$
::::

角度 $\theta(t)$ 一般写成

$$
\theta(t)=\omega_c t+\phi(t),
$$

其中 $\omega_c=2\pi f_c$ 是载波角频率，$\phi(t)$ 是由消息信号引入的附加相位。若 $\phi(t)$ 直接随 $m(t)$ 改变，就得到 PM；若瞬时频率随 $m(t)$ 改变，就得到 FM。

![角度调制波形对比](<CPS Lecture 11 FM and PM.attachments/angle-modulation-waveforms-wide.jpg>)

---

### 11-1-2 瞬时相位与瞬时频率 Instantaneous Phase and Instantaneous Frequency

:::: definition 瞬时相位 Instantaneous Phase
**瞬时相位 Instantaneous Phase** 是余弦信号括号内的完整角度。

$$
s(t)=A_c\cos{\theta(t)}
$$
::::

:::: definition 瞬时角频率 Instantaneous Angular Frequency
**瞬时角频率 Instantaneous Angular Frequency** 定义为瞬时相位对时间的导数：

$$
\omega_i(t)=\frac{d\theta(t)}{dt}.
$$
::::

瞬时频率用 Hz 表示时为

$$
f_i(t)=\frac{1}{2\pi}\frac{d\theta(t)}{dt}.
$$

反过来，已知瞬时角频率时，相位由积分得到：

$$
\theta(t)=\theta(0)+\int_0^t \omega_i(u)\,du.
$$

![瞬时相位斜率示意](<CPS Lecture 11 FM and PM.attachments/instantaneous-phase-slope-wide.jpg>)

> [!TIP]
> 计算时先看单位。$\omega_i(t)$ 的单位是 $\mathrm{rad/s}$，$f_i(t)$ 的单位是 $\mathrm{Hz}$，两者相差 $2\pi$。

## 11-2 相位调制 Phase Modulation

### 11-2-1 PM 信号模型 PM Signal Model

:::: definition 相位调制 Phase Modulation
**相位调制 Phase Modulation, PM** 令载波的附加相位与消息信号成正比。

$$
\theta_{\mathrm{PM}}(t)=\omega_c t+k_p m(t)
$$
::::

因此 PM 已调信号为

$$
s_{\mathrm{PM}}(t)=A_c\cos{[\omega_c t+k_p m(t)]}.
$$

其中：
- $k_p$：相位灵敏度，单位通常为 $\mathrm{rad/V}$；
- $m(t)$：基带消息信号；
- $k_p m(t)$：相位偏移，单位为 $\mathrm{rad}$。

---

### 11-2-2 PM 的瞬时频率 Instantaneous Frequency of PM

由瞬时角频率定义可得

$$
\begin{aligned}
\omega_i^{\mathrm{PM}}(t)
&=\frac{d}{dt}\left[\omega_c t+k_p m(t)\right] \\
&=\omega_c+k_p\frac{dm(t)}{dt}.
\end{aligned}
$$

PM 的瞬时频率与消息信号的变化率有关。消息信号变化越快，PM 的瞬时频率偏移越大。

若用 Hz 表示频偏，则

$$
\Delta f_{\mathrm{PM}}(t)=\frac{k_p}{2\pi}\frac{dm(t)}{dt}.
$$

## 11-3 频率调制 Frequency Modulation

### 11-3-1 FM 信号模型 FM Signal Model

:::: definition 频率调制 Frequency Modulation
**频率调制 Frequency Modulation, FM** 令载波的瞬时角频率与消息信号成线性关系。

$$
\omega_i^{\mathrm{FM}}(t)=\omega_c+k_f m(t)
$$
::::

对瞬时角频率积分可得 FM 的瞬时相位：

$$
\begin{aligned}
\theta_{\mathrm{FM}}(t)
&=\theta(0)+\int_0^t \left[\omega_c+k_f m(u)\right]\,du \\
&=\theta(0)+\omega_c t+k_f\int_0^t m(u)\,du.
\end{aligned}
$$

若初相位取 $0$，FM 已调信号为

$$
s_{\mathrm{FM}}(t)
=A_c\cos{\left[\omega_c t+k_f\int_0^t m(u)\,du\right]}.
$$

---

### 11-3-2 频偏与频率灵敏度 Frequency Deviation and Frequency Sensitivity

**频率灵敏度 Frequency Sensitivity** $k_f$ 描述消息幅度对瞬时角频率的控制强度。若 $m(t)$ 的峰值为 $m_p$，峰值角频偏为

$$
\Delta \omega=k_f m_p.
$$

对应的峰值频偏为

$$
\Delta f=\frac{\Delta\omega}{2\pi}=\frac{k_f m_p}{2\pi}.
$$

当 $k_f$ 或 $m_p$ 增大时，瞬时频率摆动范围变大。FM 的实际带宽通常也随频偏增大而增大。

## 11-4 PM 与 FM 的关系 Relationship Between PM and FM

### 11-4-1 积分与微分关系 Integration and Differentiation Relationship

FM 与 PM 都属于角度调制，差别在于消息信号进入角度的方式。

由 FM 信号

$$
s_{\mathrm{FM}}(t)
=A_c\cos{\left[\omega_c t+k_f\int_0^t m(u)\,du\right]}
$$

可知，FM 等效于先对 $m(t)$ 积分，再送入相位调制器。

![FM 作为积分 PM 示意](<CPS Lecture 11 FM and PM.attachments/fm-as-integrated-pm.jpg>)

由 PM 的瞬时频率

$$
\omega_i^{\mathrm{PM}}(t)=\omega_c+k_p\frac{dm(t)}{dt}
$$

可知，PM 等效于先对 $m(t)$ 微分，再送入频率调制器。

![PM 作为微分 FM 示意](<CPS Lecture 11 FM and PM.attachments/pm-as-differentiated-fm.jpg>)

> [!NOTE]
> 这一点来自旧 CPS 笔记的补充整理。用系统框图记忆时，FM 是“积分后进 PM”，PM 是“微分后进 FM”。

---

### 11-4-2 单音信号下的相位差 Phase Shift for a Single Tone

令消息信号为单音正弦

$$
m(t)=A_m\cos{(\omega_m t)}.
$$

PM 的相位偏移为

$$
\phi_{\mathrm{PM}}(t)=k_p A_m\cos{(\omega_m t)}.
$$

FM 的相位偏移为

$$
\begin{aligned}
\phi_{\mathrm{FM}}(t)
&=k_f\int_0^t A_m\cos{(\omega_m u)}\,du \\
&=\frac{k_f A_m}{\omega_m}\sin{(\omega_m t)}.
\end{aligned}
$$

同一个单音输入下，PM 的相位偏移是 $\cos$ 形式，FM 的相位偏移是 $\sin$ 形式，二者相差 $90^\circ$。这也是课件中说 PM 和 FM 互为 $90^\circ$ shifted version 的原因。

## 11-5 角度调制的性质与例题 Properties and Example

### 11-5-1 恒包络与功率 Constant Envelope and Power

角度调制信号的一般形式为

$$
s(t)=A_c\cos{\theta(t)}.
$$

幅度始终为 $A_c$，调制强度只进入 $\theta(t)$。若负载归一化为 $1\,\Omega$，平均功率为

$$
P=\frac{A_c^2}{2}.
$$

功率与 $k_p$、$k_f$ 没有直接关系。增大调制灵敏度会改变频谱分布和带宽，不会改变理想恒包络信号的平均功率。

---

### 11-5-2 三角波消息例题 Triangular Message Example

:::: stem L11-E1
给定三角波消息 $m(t)$，参数为

$$
k_f=2\pi\times 10^5,\qquad
k_p=10\pi,\qquad
f_c=100\,\mathrm{MHz}.
$$

判断 FM 与 PM 波形的频率变化规律。

![三角消息角度调制例题](<CPS Lecture 11 FM and PM.attachments/triangular-message-example.jpg>)
::::

:::: solution
FM 的瞬时频率为

$$
f_i^{\mathrm{FM}}(t)
=f_c+\frac{k_f}{2\pi}m(t)
=100\,\mathrm{MHz}+10^5m(t).
$$

因为 $m(t)$ 在 $[-1,1]$ 内变化，所以

$$
99.9\,\mathrm{MHz}\le f_i^{\mathrm{FM}}(t)\le 100.1\,\mathrm{MHz}.
$$

$m(t)$ 越大，FM 波形越密；$m(t)$ 越小，FM 波形越疏。

PM 的瞬时频率为

$$
f_i^{\mathrm{PM}}(t)
=f_c+\frac{k_p}{2\pi}\frac{dm(t)}{dt}
=100\,\mathrm{MHz}+5\frac{dm(t)}{dt}.
$$

三角波的斜率在每一段内近似为常数，所以 PM 的频率在每一段内近似保持常值；在三角波拐点处，斜率突变，PM 的瞬时频率也突变。
::::

| 调制方式 | 直接控制量 | 对三角波的响应 |
| --- | --- | --- |
| FM | $m(t)$ | 频率随三角波幅度连续变化 |
| PM | $\dfrac{dm(t)}{dt}$ | 频率随三角波斜率分段变化 |
