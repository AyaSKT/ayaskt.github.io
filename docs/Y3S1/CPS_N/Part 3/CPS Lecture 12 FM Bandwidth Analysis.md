---
author: Ayaskt
---

# CPS Lecture 12 FM Bandwidth Analysis

## 章节目录

- [12-1 FM 带宽为什么难分析 Why FM Bandwidth Is Hard to Analyze](#12-1-fm-带宽为什么难分析-why-fm-bandwidth-is-hard-to-analyze)
  - [12-1-1 累积消息信号 Accumulated Message Signal](#12-1-1-累积消息信号-accumulated-message-signal)
  - [12-1-2 复包络表示 Complex Representation](#12-1-2-复包络表示-complex-representation)
- [12-2 幂级数展开与无限带宽 Power Series and Infinite Bandwidth](#12-2-幂级数展开与无限带宽-power-series-and-infinite-bandwidth)
  - [12-2-1 Maclaurin 展开 Maclaurin Expansion](#12-2-1-maclaurin-展开-maclaurin-expansion)
  - [12-2-2 频谱扩展 Spectrum Spreading](#12-2-2-频谱扩展-spectrum-spreading)
- [12-3 窄带 FM Narrowband FM](#12-3-窄带-fm-narrowband-fm)
  - [12-3-1 NBFM 近似 NBFM Approximation](#12-3-1-nbfm-近似-nbfm-approximation)
  - [12-3-2 AM 与 NBFM 对比 AM and NBFM Comparison](#12-3-2-am-与-nbfm-对比-am-and-nbfm-comparison)
- [12-4 单音 FM 与 Bessel 展开 Single-Tone FM and Bessel Expansion](#12-4-单音-fm-与-bessel-展开-single-tone-fm-and-bessel-expansion)
  - [12-4-1 单音 FM 模型 Single-Tone FM Model](#12-4-1-单音-fm-模型-single-tone-fm-model)
  - [12-4-2 Bessel 边带 Bessel Sidebands](#12-4-2-bessel-边带-bessel-sidebands)
- [12-5 宽带 FM 与 Carson 法则 Wideband FM and Carson's Rule](#12-5-宽带-fm-与-carson-法则-wideband-fm-and-carsons-rule)
  - [12-5-1 阶梯近似 Staircase Approximation](#12-5-1-阶梯近似-staircase-approximation)
  - [12-5-2 频谱范围估计 Spectrum Range Estimate](#12-5-2-频谱范围估计-spectrum-range-estimate)
  - [12-5-3 Carson 法则 Carson's Rule](#12-5-3-carson-法则-carsons-rule)

## 12-1 FM 带宽为什么难分析 Why FM Bandwidth Is Hard to Analyze

### 12-1-1 累积消息信号 Accumulated Message Signal

FM 的瞬时角频率为

$$
\omega_i(t)=\omega_c+k_fm(t).
$$

相位由瞬时角频率积分得到，所以 FM 的相位依赖消息信号的累积值。

:::: definition 累积消息信号 Accumulated Message Signal
**累积消息信号 Accumulated Message Signal** 定义为消息信号的时间积分：

$$
a(t)=\int_{-\infty}^{t}m(u)\,du.
$$
::::

用 $a(t)$ 表示时，FM 信号为

$$
s_{\mathrm{FM}}(t)=A\cos{[\omega_c t+k_fa(t)]}.
$$

---

### 12-1-2 复包络表示 Complex Representation

为了分析频谱，先写出对应的复指数信号：

$$
\widehat{s}_{\mathrm{FM}}(t)
=A e^{j[\omega_c t+k_fa(t)]}.
$$

拆成载波项和调制项：

$$
\widehat{s}_{\mathrm{FM}}(t)
=A e^{jk_fa(t)}e^{j\omega_c t}.
$$

实信号由实部得到：

$$
s_{\mathrm{FM}}(t)=\Re\{\widehat{s}_{\mathrm{FM}}(t)\}.
$$

FM 的非线性来自 $e^{jk_fa(t)}$。这个指数项会把 $a(t)$ 的不同幂次混进频谱，因此不能像 AM 那样只看一次频移。

## 12-2 幂级数展开与无限带宽 Power Series and Infinite Bandwidth

### 12-2-1 Maclaurin 展开 Maclaurin Expansion

对调制项作 Maclaurin 展开：

$$
e^{jk_fa(t)}
=1+jk_fa(t)-\frac{k_f^2a^2(t)}{2!}
+\cdots+\frac{(jk_f)^n a^n(t)}{n!}+\cdots.
$$

代回 FM 信号并取实部，可得

$$
s_{\mathrm{FM}}(t)
=A\left[
\cos{(\omega_c t)}
-k_fa(t)\sin{(\omega_c t)}
-\frac{k_f^2}{2!}a^2(t)\cos{(\omega_c t)}
+\cdots
\right].
$$

![FM 功率级数带宽](<CPS Lecture 12 FM Bandwidth Analysis.attachments/fm-power-series-bandwidth.png>)

---

### 12-2-2 频谱扩展 Spectrum Spreading

若 $a(t)$ 的带宽为 $B$，第一项只是载波，理想带宽为 $0$。第二项包含 $a(t)$，调制到载波附近后产生宽度约为 $2B$ 的双边频谱。

第三项包含 $a^2(t)$。时域相乘对应频域卷积：

$$
\mathcal{F}\{a^2(t)\}=A(f)*A(f).
$$

若 $A(f)$ 分布在 $[-B,B]$，卷积后频率范围扩展到 $[-2B,2B]$。更高次 $a^n(t)$ 会继续扩大频谱范围。

:::: definition 理论带宽 Theoretical Bandwidth
**理论带宽 Theoretical Bandwidth** 指信号所有非零频谱分量占据的频率范围。理想 FM 因为含有无限阶边带，理论带宽为无限大。
::::

实际系统只保留幅度显著的边带。高阶项含有 $n!$，阶乘增长很快，所以远离载波的高阶边带通常可以忽略。

## 12-3 窄带 FM Narrowband FM

### 12-3-1 NBFM 近似 NBFM Approximation

:::: definition 窄带 FM Narrowband FM
**窄带 FM Narrowband Frequency Modulation, NBFM** 指相位偏移很小、可以忽略二阶及以上项的 FM。

$$
\lvert k_fa(t)\rvert\ll1
$$
::::

在该条件下，

$$
e^{jk_fa(t)}\approx 1+jk_fa(t).
$$

因此

$$
\boxed{
s_{\mathrm{NBFM}}(t)
\approx A\cos{(2\pi f_c t)}
-Ak_fa(t)\sin{(2\pi f_c t)}
}
$$

NBFM 只保留一阶边带，因此实际带宽近似等于 AM 的带宽：

$$
B_{\mathrm{NBFM}}\approx 2B.
$$

这里的 $B$ 是基带消息信号的最高频率。

---

### 12-3-2 AM 与 NBFM 对比 AM and NBFM Comparison

| 特征 | AM | NBFM |
| --- | --- | --- |
| 信号形式 | $A_c[1+\mu m(t)]\cos{(\omega_c t)}$ | $A\cos{(\omega_c t)}-Ak_fa(t)\sin{(\omega_c t)}$ |
| 主要变化量 | 幅度 | 相位 / 频率 |
| 近似带宽 | $2B$ | $2B$ |
| 包络 | 随消息变化 | 理想情况下恒定 |
| 调制性质 | 线性 | 小角度近似下近似线性 |

NBFM 的一阶项与 AM 很像，但它乘在 $\sin{(\omega_c t)}$ 上，相当于相对于载波正交的边带项。这个 $90^\circ$ 关系也是 PM/FM 与 AM 频谱结构不同的来源。

## 12-4 单音 FM 与 Bessel 展开 Single-Tone FM and Bessel Expansion

### 12-4-1 单音 FM 模型 Single-Tone FM Model

令消息信号为单音正弦

$$
m(t)=A_m\cos{(2\pi f_m t)}.
$$

则

$$
a(t)=\int m(t)\,dt
=\frac{A_m}{2\pi f_m}\sin{(2\pi f_m t)}.
$$

FM 信号为

$$
s_{\mathrm{FM}}(t)
=A_c\cos{\left[2\pi f_c t+\beta\sin{(2\pi f_m t)}\right]},
$$

其中

$$
\beta=\frac{k_fA_m}{2\pi f_m}=\frac{\Delta f}{f_m}.
$$

:::: definition 调制指数 Modulation Index
**调制指数 Modulation Index** $\beta$ 是峰值频偏与单音消息频率的比值：

$$
\beta=\frac{\Delta f}{f_m}.
$$
::::

---

### 12-4-2 Bessel 边带 Bessel Sidebands

利用 Fourier series 展开

$$
e^{j\beta\sin{(2\pi f_m t)}}
=\sum_{n=-\infty}^{+\infty}J_n(\beta)e^{j2\pi n f_m t},
$$

其中 $J_n(\beta)$ 是第一类 $n$ 阶 **Bessel 函数 Bessel Function**。因此单音 FM 的频率分量位于

$$
f=f_c\pm n f_m,\qquad n=0,1,2,\ldots
$$

各阶边带的幅度由 $J_n(\beta)$ 决定。

![Bessel 函数曲线](<CPS Lecture 12 FM Bandwidth Analysis.attachments/bessel-functions.jpg>)

当 $\beta$ 很小时，只有 $J_0(\beta)$ 和 $J_1(\beta)$ 显著，对应 NBFM。$\beta$ 增大后，更多 $J_n(\beta)$ 变得显著，信号进入 WBFM。

## 12-5 宽带 FM 与 Carson 法则 Wideband FM and Carson's Rule

### 12-5-1 阶梯近似 Staircase Approximation

:::: definition 宽带 FM Wideband FM
**宽带 FM Wideband Frequency Modulation, WBFM** 指频偏较大、不能忽略高阶边带的 FM。
::::

对低通信号 $m(t)$ 作阶梯近似。若消息带宽为 $B$，每个小单元的宽度取不大于

$$
\Delta t=\frac{1}{2B}.
$$

该取法来自采样定理。每个单元内 $m(t)$ 近似为常数 $m(t_k)$，对应一小段瞬时角频率近似恒定的正弦波：

$$
\omega_i(t)\approx \omega_c+k_fm(t_k).
$$

![阶梯近似 FM 消息](<CPS Lecture 12 FM Bandwidth Analysis.attachments/staircase-approximation.jpg>)

---

### 12-5-2 频谱范围估计 Spectrum Range Estimate

若 $m(t)$ 的峰值为 $m_p$，各小段正弦波的中心角频率范围为

$$
\omega_c-k_fm_p
\le
\omega_i
\le
\omega_c+k_fm_p.
$$

每个小段的时间宽度有限，因此其频谱表现为带有 sinc 主瓣的谱。课件的 staircase 近似估计每侧主瓣扩展约为 $4\pi B$。

![FM 小段频谱主瓣](<CPS Lecture 12 FM Bandwidth Analysis.attachments/fm-cell-spectrum-wide.jpg>)

总角频率范围近似为

$$
\omega_c-k_fm_p-4\pi B
\quad\text{到}\quad
\omega_c+k_fm_p+4\pi B.
$$

换算成 Hz 后：

$$
B_{\mathrm{FM}}
\approx \frac{1}{2\pi}\left(2k_fm_p+8\pi B\right)
=2\left(\frac{k_fm_p}{2\pi}+2B\right).
$$

该推导给出 WBFM 带宽的松散量级估计。这里的 $B$ 来自 staircase 近似中的主瓣扩展记号，不应直接和 Carson 法则中的消息单边最高频率混用。实际工程中通常使用更简洁的 Carson 法则。

---

### 12-5-3 Carson 法则 Carson's Rule

:::: definition Carson 法则 Carson's Rule
**Carson 法则 Carson's Rule** 用峰值频偏和消息带宽估计 FM 的实际传输带宽：

$$
B_{\mathrm{FM}}\approx 2(\Delta f+B_m).
$$
::::

其中：
- $B_{\mathrm{FM}}$：FM 信号的实际占用带宽；
- $\Delta f$：峰值频偏；
- $B_m$：消息信号最高频率或单边带宽。

对单音消息，$B_m=f_m$，所以

$$
B_{\mathrm{FM}}\approx 2(\Delta f+f_m)
=2(\beta+1)f_m.
$$

> [!TIP]
> 判断 NBFM/WBFM 时先算 $\beta=\Delta f/f_m$。$\beta\ll1$ 时可用 NBFM 近似；$\beta$ 较大时用 Carson 法则估计实际带宽。
