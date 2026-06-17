---
author: Ayaskt
---

# CPS Lecture 13 FM Demodulation

## 章节目录

- [13-1 单音 FM 频谱回顾 Single-Tone FM Spectrum Review](#13-1-单音-fm-频谱回顾-single-tone-fm-spectrum-review)
  - [13-1-1 Bessel 系数 Bessel Coefficients](#13-1-1-bessel-系数-bessel-coefficients)
  - [13-1-2 调制指数的作用 Role of Modulation Index](#13-1-2-调制指数的作用-role-of-modulation-index)
- [13-2 FM 解调基本原理 Basic Principle of FM Demodulation](#13-2-fm-解调基本原理-basic-principle-of-fm-demodulation)
  - [13-2-1 从相位导数恢复消息 Recovering Message from Phase Derivative](#13-2-1-从相位导数恢复消息-recovering-message-from-phase-derivative)
  - [13-2-2 微分后包络 After Differentiation](#13-2-2-微分后包络-after-differentiation)
- [13-3 微分器与包络检波 Differentiator and Envelope Detection](#13-3-微分器与包络检波-differentiator-and-envelope-detection)
  - [13-3-1 理想微分解调 Ideal Differentiator Demodulation](#13-3-1-理想微分解调-ideal-differentiator-demodulation)
  - [13-3-2 幅度失真的来源 Source of Amplitude Distortion](#13-3-2-幅度失真的来源-source-of-amplitude-distortion)
- [13-4 Slope Detector 与实用鉴频器 Slope Detector and Practical Frequency Discriminators](#13-4-slope-detector-与实用鉴频器-slope-detector-and-practical-frequency-discriminators)
  - [13-4-1 RC 高通近似微分 RC High-Pass Differentiator Approximation](#13-4-1-rc-高通近似微分-rc-high-pass-differentiator-approximation)
  - [13-4-2 RLC 调谐电路 RLC Tuned Circuit](#13-4-2-rlc-调谐电路-rlc-tuned-circuit)
- [13-5 过零检测 Zero-Crossing Detection](#13-5-过零检测-zero-crossing-detection)
  - [13-5-1 过零率与瞬时频率 Zero-Crossing Rate and Instantaneous Frequency](#13-5-1-过零率与瞬时频率-zero-crossing-rate-and-instantaneous-frequency)
- [13-6 超外差接收机 Superheterodyne Receiver](#13-6-超外差接收机-superheterodyne-receiver)
  - [13-6-1 混频与中频 Mixing and Intermediate Frequency](#13-6-1-混频与中频-mixing-and-intermediate-frequency)
  - [13-6-2 超外差结构的优势 Advantages of Superheterodyne Structure](#13-6-2-超外差结构的优势-advantages-of-superheterodyne-structure)
- [13-7 锁相环 Phase-Locked Loop](#13-7-锁相环-phase-locked-loop)
  - [13-7-1 PLL 组成 Components of PLL](#13-7-1-pll-组成-components-of-pll)
  - [13-7-2 鉴相与误差信号 Phase Detection and Error Signal](#13-7-2-鉴相与误差信号-phase-detection-and-error-signal)
  - [13-7-3 锁定条件与 FM 解调 Lock Condition and FM Demodulation](#13-7-3-锁定条件与-fm-解调-lock-condition-and-fm-demodulation)

## 13-1 单音 FM 频谱回顾 Single-Tone FM Spectrum Review

### 13-1-1 Bessel 系数 Bessel Coefficients

单音消息信号为

$$
m(t)=\cos{(2\pi f_m t)}.
$$

FM 信号可写成

$$
s_{\mathrm{FM}}(t)
=A_c\cos{\left[2\pi f_c t+\beta\sin{(2\pi f_m t)}\right]},
$$

其中

$$
\beta=\frac{k_f}{2\pi f_m}=\frac{\Delta f}{f_m}
$$

是 **调制指数 Modulation Index**。

利用 Fourier series：

$$
e^{j\beta\sin{(2\pi f_m t)}}
=\sum_{n=-\infty}^{+\infty}c_n(\beta)e^{j2\pi n f_m t}.
$$

系数为

$$
c_n(\beta)
=\frac{1}{2\pi}\int_{-\pi}^{\pi}
e^{j\beta\sin{x}}e^{-jnx}\,dx
=J_n(\beta),
$$

其中 $J_n(\beta)$ 是第一类 $n$ 阶 **Bessel 函数 Bessel Function**。

![Bessel 函数曲线](<CPS Lecture 13 FM Demodulation.attachments/bessel-functions.jpg>)

---

### 13-1-2 调制指数的作用 Role of Modulation Index

单音 FM 的频谱线位于

$$
f_c,\quad f_c\pm f_m,\quad f_c\pm2f_m,\quad \ldots
$$

第 $n$ 阶边带幅度由 $J_n(\beta)$ 决定。$\beta$ 越大，显著边带阶数越多，实际占用带宽越大。

Carson 法则给出常用估计：

$$
B_{\mathrm{FM}}\approx 2(\Delta f+f_m)=2(\beta+1)f_m.
$$

## 13-2 FM 解调基本原理 Basic Principle of FM Demodulation

### 13-2-1 从相位导数恢复消息 Recovering Message from Phase Derivative

:::: definition FM 解调 FM Demodulation
**FM 解调 FM Demodulation** 是从 FM 信号的瞬时频率变化中恢复消息信号 $m(t)$ 的过程。
::::

FM 信号的相位为

$$
\theta(t)=\omega_c t+k_f\int_{-\infty}^{t}m(\alpha)\,d\alpha.
$$

对相位求导：

$$
\begin{aligned}
\omega_i(t)
&=\frac{d\theta(t)}{dt} \\
&=\omega_c+k_fm(t).
\end{aligned}
$$

因此只要能得到瞬时角频率，并去掉载波角频率 $\omega_c$，就能恢复 $m(t)$：

$$
m(t)=\frac{\omega_i(t)-\omega_c}{k_f}.
$$

---

### 13-2-2 微分后包络 After Differentiation

对 FM 信号本身求导：

$$
\frac{d}{dt}\left[A_c\cos{\theta(t)}\right]
=-A_c\frac{d\theta(t)}{dt}\sin{\theta(t)}.
$$

代入 $\frac{d\theta(t)}{dt}=\omega_c+k_fm(t)$：

$$
\dot{s}_{\mathrm{FM}}(t)
=A_c[\omega_c+k_fm(t)]
\sin{[\theta(t)-\pi]}.
$$

微分前，FM 信号幅度恒定；微分后，信号包络变为

$$
A_c[\omega_c+k_fm(t)].
$$

这把频率变化转成了幅度变化，后面可以用包络检波恢复消息。

## 13-3 微分器与包络检波 Differentiator and Envelope Detection

### 13-3-1 理想微分解调 Ideal Differentiator Demodulation

理想 FM 解调结构为

$$
\text{FM signal}
\rightarrow
\text{Differentiator}
\rightarrow
\text{Envelope detector}
\rightarrow
\text{DC removal and scaling}.
$$

![微分器加包络检波器](<CPS Lecture 13 FM Demodulation.attachments/differentiator-envelope-detector.jpg>)

包络检波器输出近似为

$$
y(t)=A_c[\omega_c+k_fm(t)].
$$

去掉直流项 $A_c\omega_c$，再除以 $A_ck_f$：

$$
\widehat{m}(t)=\frac{y(t)-A_c\omega_c}{A_ck_f}.
$$

![FM 微分后包络](<CPS Lecture 13 FM Demodulation.attachments/differentiated-fm-envelope.jpg>)

---

### 13-3-2 幅度失真的来源 Source of Amplitude Distortion

若信道引入幅度变化，接收信号写成

$$
r(t)=A(t)\cos{\theta(t)}.
$$

微分后包络会近似包含

$$
A(t)[\omega_c+k_fm(t)].
$$

包络检波器此时同时响应 $A(t)$ 和 $m(t)$，输出会产生失真。实际 FM 接收机常在鉴频前加入 **限幅器 Limiter**，先压制幅度变化，再进行频率检测。

> [!NOTE]
> 这一段是旧 CPS 笔记的补充解释。课件只给出幅度变化会导致失真，限幅器说明可以把原因和实际接收机结构连起来。

## 13-4 Slope Detector 与实用鉴频器 Slope Detector and Practical Frequency Discriminators

### 13-4-1 RC 高通近似微分 RC High-Pass Differentiator Approximation

:::: definition Slope Detector
**Slope Detector** 利用线性系统频率响应中的斜率，把输入频率变化转换成输出幅度变化。
::::

任何具有正斜率幅频响应的线性系统，都可以在小范围内近似微分器。RC 高通滤波器的频率响应为

$$
H(f)=\frac{j2\pi fRC}{1+j2\pi fRC}.
$$

当

$$
2\pi fRC\ll1
$$

时，

$$
H(f)\approx j2\pi fRC.
$$

这正是微分器的频域形式。输出经过包络检波后即可得到与频率偏移相关的信号。

![Slope detector 线性区](<CPS Lecture 13 FM Demodulation.attachments/slope-linear-segment.jpg>)

---

### 13-4-2 RLC 调谐电路 RLC Tuned Circuit

**RLC 调谐电路 RLC Tuned Circuit** 的谐振角频率为

$$
\omega_0=\frac{1}{\sqrt{LC}}.
$$

若载波角频率位于谐振点一侧，且 FM 的频率摆动范围落在线性斜率区内，则 $|H(f)|$ 的变化近似正比于瞬时频率变化。

课件给出的设计条件为

$$
\omega_c<\omega_0.
$$

Slope detector 的主要限制是线性区很窄。频偏较大时，输出不再严格正比于 $m(t)$。改进方法包括 **平衡鉴频器 Balanced Discriminator** 和 **比例检测器 Ratio Detector**。

## 13-5 过零检测 Zero-Crossing Detection

### 13-5-1 过零率与瞬时频率 Zero-Crossing Rate and Instantaneous Frequency

:::: definition 过零检测器 Zero-Crossing Detector
**过零检测器 Zero-Crossing Detector** 通过统计信号穿过零电平的次数估计瞬时频率。
::::

对一个局部近似正弦的信号，每个周期通常有两次过零。因此单位时间过零次数 $R_z(t)$ 与瞬时频率满足

$$
R_z(t)\approx 2f_i(t).
$$

于是

$$
f_i(t)\approx \frac{R_z(t)}{2}.
$$

得到 $f_i(t)$ 后，按 FM 定义恢复消息：

$$
m(t)=\frac{2\pi[f_i(t)-f_c]}{k_f}.
$$

过零检测适合数字电路实现。实际电路还需要限幅、计数窗口和低通平滑，否则噪声会引入额外过零点。

## 13-6 超外差接收机 Superheterodyne Receiver

### 13-6-1 混频与中频 Mixing and Intermediate Frequency

:::: definition 超外差接收机 Superheterodyne Receiver
**超外差接收机 Superheterodyne Receiver** 先把射频信号搬移到固定中频，再在中频处放大、滤波和解调。
::::

设输入为

$$
x_{\mathrm{RF}}(t)=A_c\cos{(\omega_c t+\phi(t))}.
$$

与本振信号 $2\cos{(\omega_{\mathrm{mix}}t)}$ 相乘：

$$
\begin{aligned}
x(t)
&=2A_c\cos{(\omega_c t+\phi(t))}\cos{(\omega_{\mathrm{mix}}t)} \\
&=A_c\cos{[(\omega_c-\omega_{\mathrm{mix}})t+\phi(t)]}
+A_c\cos{[(\omega_c+\omega_{\mathrm{mix}})t+\phi(t)]}.
\end{aligned}
$$

选择

$$
\omega_{\mathrm{mix}}=\omega_c-\omega_{\mathrm{IF}}
\quad\text{或}\quad
\omega_{\mathrm{mix}}=\omega_c+\omega_{\mathrm{IF}},
$$

即可把目标信号搬移到中频 $\omega_{\mathrm{IF}}$。

这个过程只平移载频，$\phi(t)$ 中携带的 FM 信息和频偏不会被理想混频器改变。

![超外差混频到中频](<CPS Lecture 13 FM Demodulation.attachments/superhet-mixer-if.jpg>)

---

### 13-6-2 超外差结构的优势 Advantages of Superheterodyne Structure

超外差结构的主要优势有两个：

- 射频信号先下变频到固定中频，后级放大器可以围绕固定频率优化；
- 在较低且固定的中频设计高选择性带通滤波器，比直接在射频设计更容易。

对 FM 接收机而言，superhet 负责把信号搬到合适的中频，真正恢复消息的部分仍是后面的鉴频器或 PLL。

## 13-7 锁相环 Phase-Locked Loop

### 13-7-1 PLL 组成 Components of PLL

:::: definition 锁相环 Phase-Locked Loop
**锁相环 Phase-Locked Loop, PLL** 是比较输入信号与本地振荡器相位，并通过负反馈使本地振荡器跟踪输入相位的系统。
::::

PLL 的三个基本部分为：

- **鉴相器 Phase Detector**：比较输入信号与 VCO 输出的相位；
- **环路滤波器 Loop Filter** $H(s)$：滤除高频项并平滑误差信号；
- **压控振荡器 Voltage-Controlled Oscillator, VCO**：根据控制电压调整输出频率。

![PLL 方框图](<CPS Lecture 13 FM Demodulation.attachments/pll-block-diagram.jpg>)

---

### 13-7-2 鉴相与误差信号 Phase Detection and Error Signal

令输入信号与 VCO 输出分别为

$$
x_1(t)=A_1\cos{(\omega_{\mathrm{in}}t+\phi_{\mathrm{in}})}
$$

和

$$
x_2(t)=A_2\cos{(\omega_{\mathrm{vco}}t+\phi_{\mathrm{vco}})}.
$$

乘法型鉴相器输出为

$$
v_{\mathrm{pd}}(t)
=A_1A_2\cos{(\omega_{\mathrm{in}}t+\phi_{\mathrm{in}})}
\cos{(\omega_{\mathrm{vco}}t+\phi_{\mathrm{vco}})}.
$$

用积化和差公式：

$$
\begin{aligned}
v_{\mathrm{pd}}(t)
=\frac{A_1A_2}{2}
&\cos{\left[(\omega_{\mathrm{in}}-\omega_{\mathrm{vco}})t+(\phi_{\mathrm{in}}-\phi_{\mathrm{vco}})\right]} \\
+\frac{A_1A_2}{2}
&\cos{\left[(\omega_{\mathrm{in}}+\omega_{\mathrm{vco}})t+(\phi_{\mathrm{in}}+\phi_{\mathrm{vco}})\right]}.
\end{aligned}
$$

环路滤波器去掉和频项，只留下与相位差有关的低频误差信号。在锁定附近并选择合适的鉴相工作点后，该低频项可近似作为线性的相位误差信号。

![PLL 鉴相模型](<CPS Lecture 13 FM Demodulation.attachments/pll-phase-model.jpg>)

---

### 13-7-3 锁定条件与 FM 解调 Lock Condition and FM Demodulation

PLL 锁定时，VCO 的输出频率跟随输入信号：

$$
\omega_{\mathrm{vco}}(t)\approx \omega_i(t).
$$

VCO 的控制电压 $e_o(t)$ 用来调节本地振荡器频率。对 FM 输入而言，输入瞬时频率为

$$
\omega_i(t)=\omega_c+k_fm(t).
$$

锁定后，控制电压必须随 $m(t)$ 变化，才能让 VCO 跟踪输入频率。因此 PLL 的环路滤波器输出可以作为 FM 的解调输出。

| 方法 | 核心思想 | 主要限制 |
| --- | --- | --- |
| 微分 + 包络 | 频率变化转幅度变化 | 对幅度噪声敏感 |
| Slope detector | 斜率响应完成鉴频 | 线性区有限 |
| Zero-crossing | 统计过零率估计频率 | 对噪声和计数窗口敏感 |
| Superhet + 鉴频 | 先变中频再解调 | 需要本振和镜像抑制 |
| PLL | 反馈跟踪输入相位/频率 | 需要锁定范围和环路稳定性设计 |
