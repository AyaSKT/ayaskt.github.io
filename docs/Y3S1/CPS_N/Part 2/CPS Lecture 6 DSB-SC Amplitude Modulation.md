---
author: Ayaskt
---

# DSB-SC Amplitude Modulation

## 章节目录

- [6-1 调制的目的 Need for Modulation](#6-1-调制的目的-need-for-modulation)
  - [6-1-1 基带与通带 Baseband and Passband](#6-1-1-基带与通带-baseband-and-passband)
  - [6-1-2 调制方案 Modulation Schemes](#6-1-2-调制方案-modulation-schemes)
- [6-2 双边带抑制载波调制 DSB-SC Modulation](#6-2-双边带抑制载波调制-dsb-sc-modulation)
  - [6-2-1 时域表达式 Time-Domain Expression](#6-2-1-时域表达式-time-domain-expression)
  - [6-2-2 频谱搬移 Spectrum Translation](#6-2-2-频谱搬移-spectrum-translation)
  - [6-2-3 边带与带宽 Sidebands and Bandwidth](#6-2-3-边带与带宽-sidebands-and-bandwidth)
- [6-3 相干解调 Coherent Demodulation](#6-3-相干解调-coherent-demodulation)
  - [6-3-1 乘法解调 Product Demodulation](#6-3-1-乘法解调-product-demodulation)
  - [6-3-2 相位同步 Phase Synchronisation](#6-3-2-相位同步-phase-synchronisation)
  - [6-3-3 正交接收机 Quadrature Receiver](#6-3-3-正交接收机-quadrature-receiver)
- [6-4 例题 Example](#6-4-例题-example)
- [6-5 小结 Summary](#6-5-小结-summary)

## 6-1 调制的目的 Need for Modulation

### 6-1-1 基带与通带 Baseband and Passband

:::: definition 基带信号 Baseband Signal
**基带信号 Baseband Signal** 是原始消息信号所在的低频信号，通常直接包含信息本身。

若消息信号记为 $m(t)$，其频谱记为 $M(f)$。
::::

模拟语音、音频和传感器信号常集中在低频。直接把这些低频信号发射到空中会遇到两个问题：不同发送端容易互相干扰，低频电磁波需要很长的天线。

:::: definition 调制 Modulation
**调制 Modulation** 是用消息信号改变高频载波的某个参数，使基带频谱搬移到适合传输的通带频段。
::::

调制后的信号可通过不同载波频率共存。天线尺寸也随波长降低而减小。

---

### 6-1-2 调制方案 Modulation Schemes

:::: definition 载波 Carrier
**载波 Carrier** 是用于搬移频谱的高频正弦信号，常写为 $\cos{(2\pi f_c t)}$。
::::

一般的带通信号可写为：

$$
s(t)=A(t)\cos{(2\pi f_c(t)t+\phi(t))}
$$

其中：
- $A(t)$：瞬时振幅；
- $f_c(t)$：瞬时载波频率；
- $\phi(t)$：瞬时相位。

三类基本模拟调制为：

| 调制方式 | 被消息信号改变的量 | 说明 |
| --- | --- | --- |
| **调幅 Amplitude Modulation, AM** | $A(t)$ | 改变载波振幅 |
| **调频 Frequency Modulation, FM** | $f_c(t)$ | 改变载波频率 |
| **调相 Phase Modulation, PM** | $\phi(t)$ | 改变载波相位 |

Part 2 只讨论 AM。AM 又包括 DSB-SC、DSB-WC、SSB 和 VSB。

## 6-2 双边带抑制载波调制 DSB-SC Modulation

### 6-2-1 时域表达式 Time-Domain Expression

:::: definition 双边带抑制载波调制 Double Sideband Suppressed Carrier Modulation
**双边带抑制载波调制 Double Sideband Suppressed Carrier Modulation, DSB-SC** 是把消息信号直接乘以载波的调幅方式。

$$
\varphi_{\mathrm{DSB-SC}}(t)=m(t)\cos{(2\pi f_c t)}
$$
::::

![DSB-SC 乘法调制器](<CPS Lecture 6 DSB-SC Amplitude Modulation.attachments/l6-dsbsc-modulator.png>)

DSB-SC 中不额外发送纯载波项。载波只作为乘法工具出现，发送信号的振幅随 $m(t)$ 正负变化。

> [!NOTE]
> 旧 CPS 笔记强调了一个容易漏掉的点：若 $M(f)$ 在 $f=0$ 没有冲激分量，DSB-SC 频谱中不会出现离散的 $f_c$ 载波谱线。

---

### 6-2-2 频谱搬移 Spectrum Translation

由欧拉公式：

$$
\cos{(2\pi f_c t)}
=\frac{1}{2}e^{j2\pi f_c t}
+\frac{1}{2}e^{-j2\pi f_c t}
$$

代入 DSB-SC 信号：

$$
\varphi_{\mathrm{DSB-SC}}(t)
=\frac{1}{2}m(t)e^{j2\pi f_c t}
+\frac{1}{2}m(t)e^{-j2\pi f_c t}
$$

由傅里叶变换的频移性质可得：

$$
\boxed{
\Phi_{\mathrm{DSB-SC}}(f)
=\frac{1}{2}M(f-f_c)+\frac{1}{2}M(f+f_c)
}
$$

频域上，乘以余弦等价于把 $M(f)$ 复制两份，分别搬移到 $+f_c$ 和 $-f_c$ 附近，并各缩小一半。

---

### 6-2-3 边带与带宽 Sidebands and Bandwidth

:::: definition 边带 Sideband
**边带 Sideband** 是消息频谱搬移到载波附近后形成的频谱部分。

对 $+f_c$ 附近的正频率频谱，靠近高频侧的是**上边带 Upper Sideband, USB**，靠近低频侧的是**下边带 Lower Sideband, LSB**。
::::

若 $m(t)$ 的带宽为 $B\,\mathrm{Hz}$，则 $M(f)$ 主要位于：

$$
-B\leq f\leq B
$$

搬移后，每个载波附近占用 $2B$ 的总宽度。对实际正频率射频信道而言，DSB-SC 占用：

$$
\boxed{B_{\mathrm{DSB-SC}}=2B}
$$

DSB-SC 的两个边带都包含完整消息信息。带宽上已经有浪费，这也是后面 SSB 和 VSB 的动机。

## 6-3 相干解调 Coherent Demodulation

### 6-3-1 乘法解调 Product Demodulation

:::: definition 相干解调 Coherent Demodulation
**相干解调 Coherent Demodulation** 是接收端使用与发射端同频同相的本地载波，把带通信号搬回基带的解调方法。
::::

![DSB-SC 相干解调框图](<CPS Lecture 6 DSB-SC Amplitude Modulation.attachments/l6-coherent-demodulator.png>)

接收信号设为：

$$
r(t)=m(t)\cos{(2\pi f_c t)}
$$

若接收端乘以 $2\cos{(2\pi f_c t)}$，则：

$$
\begin{aligned}
2r(t)\cos{(2\pi f_c t)}
&=2m(t)\cos^2{(2\pi f_c t)}\\
&=m(t)\left[1+\cos{(4\pi f_c t)}\right]
\end{aligned}
$$

低通滤波器去掉 $2f_c$ 附近的高频项，保留：

$$
\boxed{y(t)=m(t)}
$$

若只乘以 $\cos{(2\pi f_c t)}$ 而没有系数 $2$，低通输出为 $\frac{1}{2}m(t)$。这个比例常由后级增益补偿。

频域写法为：

$$
\mathcal{F}\{m(t)\cos^2{(2\pi f_c t)}\}
=\frac{1}{4}M(f+2f_c)+\frac{1}{2}M(f)+\frac{1}{4}M(f-2f_c)
$$

中间的 $\frac{1}{2}M(f)$ 是要恢复的基带谱。

---

### 6-3-2 相位同步 Phase Synchronisation

DSB-SC 对本地载波相位敏感。设接收信号带有未知相位误差：

$$
r(t)=m(t)\cos{(2\pi f_c t-\theta)}
$$

接收端仍乘以 $2\cos{(2\pi f_c t)}$：

$$
\begin{aligned}
2r(t)\cos{(2\pi f_c t)}
&=2m(t)\cos{(2\pi f_c t-\theta)}\cos{(2\pi f_c t)}\\
&=m(t)\cos{\theta}+m(t)\cos{(4\pi f_c t-\theta)}
\end{aligned}
$$

低通后得到：

$$
\boxed{y(t)=m(t)\cos{\theta}}
$$

当 $\theta=\frac{\pi}{2}$ 时，$\cos{\theta}=0$，基带分量完全消失。

![相位误差导致基带抵消](<CPS Lecture 6 DSB-SC Amplitude Modulation.attachments/l6-phase-cancellation.png>)

因此 DSB-SC 接收机需要载波同步。同步电路增加复杂度，这也是常规 AM 发送大载波的工程动机。

---

### 6-3-3 正交接收机 Quadrature Receiver

相位误差可通过复数解调处理。若乘以复指数：

$$
e^{j2\pi f_c t}
\xleftrightarrow{\mathcal{F}}
\delta(f-f_c)
$$

则带有相位误差的信号经低通后变为：

$$
y_{\mathrm{LPF}}(t)=\frac{1}{2}e^{j\theta}m(t)
$$

相位误差成为复平面上的旋转因子 $e^{j\theta}$。幅度不再因 $\cos{\theta}$ 被压缩到零。

![复指数解调频谱](<CPS Lecture 6 DSB-SC Amplitude Modulation.attachments/l6-complex-demod-spectrum.png>)

:::: definition 正交接收机 Quadrature Receiver
**正交接收机 Quadrature Receiver** 同时处理同相分量 In-phase Component 和正交分量 Quadrature Component，常写作 I/Q 接收机。
::::

![DSB-SC 正交接收机](<CPS Lecture 6 DSB-SC Amplitude Modulation.attachments/l6-quadrature-receiver.png>)

实际系统不用真正传递抽象复数，而是跟踪两路实信号：

$$
I(t)=\operatorname{Re}\{y(t)\},
\qquad
Q(t)=\operatorname{Im}\{y(t)\}
$$

雷达、声呐、超声、MRI 和通信接收机都常用这种结构。成本在于接收端要维护两路通道以及相位校准。

## 6-4 例题 Example

:::: stem L6-E1
已知消息信号：

$$
m(t)=\cos{(1000t)}\cos{(3000t)}
$$

用载波 $\cos{(10000t)}$ 做 DSB-SC 调制。求基带正频率分量、DSB-SC 正频率分量，并指出 USB 与 LSB。
::::

:::: solution
先把消息信号展开：

$$
\begin{aligned}
m(t)
&=\cos{(1000t)}\cos{(3000t)}\\
&=\frac{1}{2}\cos{(4000t)}+\frac{1}{2}\cos{(2000t)}
\end{aligned}
$$

因此基带正角频率为：

$$
\omega=2000,\ 4000\ \mathrm{rad/s}
$$

DSB-SC 会产生 $\omega_c\pm\omega_m$：

$$
\begin{aligned}
10000-4000&=6000\\
10000-2000&=8000\\
10000+2000&=12000\\
10000+4000&=14000
\end{aligned}
$$

所以正频率分量为：

$$
\omega=6000,\ 8000,\ 12000,\ 14000\ \mathrm{rad/s}
$$

靠近载波内侧的是 LSB：

$$
\omega_{\mathrm{LSB}}=6000,\ 8000\ \mathrm{rad/s}
$$

靠近载波外侧的是 USB：

$$
\omega_{\mathrm{USB}}=12000,\ 14000\ \mathrm{rad/s}
$$
::::

## 6-5 小结 Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| DSB-SC 信号 | $\varphi_{\mathrm{DSB-SC}}(t)=m(t)\cos{(2\pi f_c t)}$ | 不发送额外载波 |
| 频谱 | $\Phi(f)=\frac{1}{2}M(f-f_c)+\frac{1}{2}M(f+f_c)$ | 频谱搬移到 $\pm f_c$ |
| 带宽 | $2B$ | 两个边带都保留 |
| 相干解调 | $2r(t)\cos{(2\pi f_c t)}\xrightarrow{\mathrm{LPF}}m(t)$ | 需要同频同相载波 |
| 相位误差 | $y(t)=m(t)\cos{\theta}$ | $\theta=\pi/2$ 时完全抵消 |
| 正交接收 | $y(t)=\frac{1}{2}e^{j\theta}m(t)$ | I/Q 两路避免幅度归零 |

