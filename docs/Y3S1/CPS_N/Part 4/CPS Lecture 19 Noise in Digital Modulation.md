---
author: Ayaskt
---

# CPS Lecture 19 Noise in Digital Modulation

## 章节目录

- [19-1 BER、SNR 与 AWGN BER, SNR and AWGN](#19-1-bersnr-与-awgn-ber-snr-and-awgn)
  - [19-1-1 比特误码率 Bit Error Rate](#19-1-1-比特误码率-bit-error-rate)
  - [19-1-2 数字通信中的 SNR Signal-to-Noise Ratio](#19-1-2-数字通信中的-snr-signal-to-noise-ratio)
  - [19-1-3 AWGN 信道 Additive White Gaussian Noise Channel](#19-1-3-awgn-信道-additive-white-gaussian-noise-channel)
- [19-2 噪声中的单脉冲检测 Detection of a Single Pulse in Noise](#19-2-噪声中的单脉冲检测-detection-of-a-single-pulse-in-noise)
  - [19-2-1 接收信号模型 Received Signal Model](#19-2-1-接收信号模型-received-signal-model)
  - [19-2-2 判决统计量 Decision Statistic](#19-2-2-判决统计量-decision-statistic)
  - [19-2-3 输出噪声统计 Output Noise Statistics](#19-2-3-输出噪声统计-output-noise-statistics)
- [19-3 匹配滤波与相关接收 Matched Filtering and Correlation Receiving](#19-3-匹配滤波与相关接收-matched-filtering-and-correlation-receiving)
  - [19-3-1 输出 SNR 最大化 Maximizing Output SNR](#19-3-1-输出-snr-最大化-maximizing-output-snr)
  - [19-3-2 匹配滤波器 Matched Filter](#19-3-2-匹配滤波器-matched-filter)
  - [19-3-3 相关接收机 Correlation Receiver](#19-3-3-相关接收机-correlation-receiver)
- [19-4 BPSK 最优检测 Optimum Detection of BPSK](#19-4-bpsk-最优检测-optimum-detection-of-bpsk)
  - [19-4-1 BPSK 发送信号 BPSK Transmitted Signal](#19-4-1-bpsk-发送信号-bpsk-transmitted-signal)
  - [19-4-2 相干检测 Coherent Detection](#19-4-2-相干检测-coherent-detection)
  - [19-4-3 乘积解调与低通滤波 Product Detection and Low-pass Filtering](#19-4-3-乘积解调与低通滤波-product-detection-and-low-pass-filtering)
  - [19-4-4 判决规则与 BER Decision Rule and BER](#19-4-4-判决规则与-ber-decision-rule-and-ber)

## 19-1 BER、SNR 与 AWGN BER, SNR and AWGN

### 19-1-1 比特误码率 Bit Error Rate

:::: definition 比特误码率 Bit Error Rate, BER
**比特误码率 Bit Error Rate, BER** 是数字通信系统中错误比特数占总传输比特数的长期平均比例。
::::

若总共传输 $N$ 个比特，其中 $n$ 个判错，则：

$$
\mathrm{BER}
=\lim_{N\to\infty}\frac{n}{N}.
$$

BER 是评价数字链路质量的直接指标。应用不同，容许 BER 也不同：

| 应用 | 典型 BER 要求 |
| --- | --- |
| 语音编码 Vocoded Speech | $10^{-2}\text{--}10^{-3}$ |
| 无线数据 Wireless Data | $10^{-5}\text{--}10^{-6}$ |
| 视频传输 Video Transmission | $10^{-7}\text{--}10^{-12}$ |
| 金融数据 Financial Data | $10^{-11}$ 或更低 |

:::: definition 分组错误率 Packet Error Rate, PER
**分组错误率 Packet Error Rate, PER** 是数据包出错概率。若比特错误相互独立，PER 可由 BER 和包长近似推得。
::::

若每个包有 $L$ 个比特，且比特错误独立，则包正确概率近似为 $(1-\mathrm{BER})^L$，因此：

$$
\mathrm{PER}\approx1-(1-\mathrm{BER})^L.
$$

---

### 19-1-2 数字通信中的 SNR Signal-to-Noise Ratio

:::: definition 信噪比 Signal-to-Noise Ratio, SNR
**信噪比 Signal-to-Noise Ratio, SNR** 描述信号强度与噪声强度的相对大小。在数字调制中，常用每比特能量与噪声功率谱密度之比作为性能横轴。
::::

数字通信中的常用参考比值为：

$$
\left(\frac{E_b}{N_0}\right)_{\mathrm{digital}}
=\frac{E_b}{N_0}.
$$

其中：

- $E_b$：每比特能量 Energy per Bit；
- $N_0$：单边噪声功率谱密度 One-sided Noise Spectral Density。

$E_b/N_0$ 是能量与噪声谱密度之比，不是某个接收点上的普通功率 SNR；但它适合比较不同调制方式，因为它把比特能量与信道噪声分开，使 BER 曲线可以画成同一横轴。

---

### 19-1-3 AWGN 信道 Additive White Gaussian Noise Channel

:::: definition 加性白高斯噪声 Additive White Gaussian Noise, AWGN
**加性白高斯噪声 Additive White Gaussian Noise, AWGN** 是加到信号上的零均值高斯噪声，其功率谱密度在频率上近似为常数。
::::

AWGN 信道模型为：

$$
r(t)=s(t)+w(t).
$$

其中 $w(t)$ 满足：

$$
E[w(t)]=0,
$$

且自相关函数为：

$$
E[w(t)w(\tau)]
=\frac{N_0}{2}\delta(t-\tau).
$$

白噪声表示不同时间样本不相关；高斯噪声表示任意线性滤波后的噪声仍为高斯随机变量。

## 19-2 噪声中的单脉冲检测 Detection of a Single Pulse in Noise

### 19-2-1 接收信号模型 Received Signal Model

![单脉冲接收机](<CPS Lecture 19 Noise in Digital Modulation.attachments/single-pulse-receiver.jpg>)

单脉冲传输中，接收信号有两种假设：

$$
r(t)=
\begin{cases}
s(t)+w(t), & \text{pulse present},\\
w(t), & \text{pulse absent}.
\end{cases}
$$

接收机需要根据 $r(t)$ 判断脉冲是否存在。结构上通常包括线性滤波器、采样保持 Sample and Hold，以及阈值比较 Threshold Comparison。

---

### 19-2-2 判决统计量 Decision Statistic

:::: definition 判决统计量 Decision Statistic
**判决统计量 Decision Statistic** 是接收机从连续时间接收波形中提取出的随机变量，用于后续阈值判决。
::::

令线性滤波器为 $g(t)$，采样时刻为 $T$。判决统计量定义为：

$$
Y=\int_0^T g(T-t)r(t)\,dt.
$$

代入 $r(t)=s(t)+w(t)$：

$$
Y=
\int_0^T g(T-t)s(t)\,dt
+
\int_0^T g(T-t)w(t)\,dt.
$$

定义：

$$
S=\int_0^T g(T-t)s(t)\,dt,
\qquad
N=\int_0^T g(T-t)w(t)\,dt.
$$

于是：

$$
Y=S+N.
$$

设计接收滤波器的目标是让输出 SNR 最大。

---

### 19-2-3 输出噪声统计 Output Noise Statistics

噪声项为：

$$
N=\int_0^T g(T-t)w(t)\,dt.
$$

由于 AWGN 零均值：

$$
E[N]
=\int_0^T g(T-t)E[w(t)]\,dt
=0.
$$

方差为：

$$
\begin{aligned}
\mathrm{Var}(N)
&=E[N^2]\\
&=
\int_0^T\int_0^T
g(T-t)g(T-\tau)
E[w(t)w(\tau)]\,dt\,d\tau.
\end{aligned}
$$

代入白噪声自相关：

$$
E[w(t)w(\tau)]
=\frac{N_0}{2}\delta(t-\tau),
$$

得到：

$$
\mathrm{Var}(N)
=\frac{N_0}{2}
\int_0^T\left|g(T-t)\right|^2\,dt.
$$

若滤波器归一化满足：

$$
\int_0^T\left|g(t)\right|^2\,dt=T,
$$

则：

$$
\mathrm{Var}(N)=\frac{N_0T}{2}.
$$

线性接收机输出噪声仍为高斯随机变量：

| 统计量 | 结果 |
| --- | --- |
| 均值 | $0$ |
| 方差 | $\dfrac{N_0}{2}\int_0^T\left|g(t)\right|^2\,dt$ |
| 分布 | Gaussian |

## 19-3 匹配滤波与相关接收 Matched Filtering and Correlation Receiving

### 19-3-1 输出 SNR 最大化 Maximizing Output SNR

输出信号分量为：

$$
S=\int_0^T g(T-t)s(t)\,dt.
$$

输出噪声功率为：

$$
\sigma_N^2
=\frac{N_0}{2}
\int_0^T\left|g(T-t)\right|^2\,dt.
$$

因此输出 SNR 为：

$$
\mathrm{SNR}_{\mathrm{out}}
=
\frac{
\left|\int_0^T g(T-t)s(t)\,dt\right|^2
}{
\dfrac{N_0}{2}
\int_0^T\left|g(T-t)\right|^2\,dt
}.
$$

由 Schwarz 不等式：

$$
\left|
\int_0^T g(T-t)s(t)\,dt
\right|^2
\le
\int_0^T\left|g(T-t)\right|^2\,dt
\int_0^T\left|s(t)\right|^2\,dt.
$$

取等号条件为：

$$
g(T-t)=cs(t).
$$

等价地：

$$
g(t)=cs(T-t).
$$

---

### 19-3-2 匹配滤波器 Matched Filter

:::: definition 匹配滤波器 Matched Filter
**匹配滤波器 Matched Filter** 是冲激响应与发送信号时间反转形状成比例的滤波器。它能在 AWGN 信道下最大化采样时刻输出 SNR。
::::

匹配滤波器满足：

$$
g(t)=cs(T-t).
$$

若发送信号能量为：

$$
E=\int_0^T\left|s(t)\right|^2\,dt,
$$

则最大输出 SNR 为：

$$
\boxed{
\mathrm{SNR}_{\max}=\frac{2E}{N_0}
}
$$

比例常数 $c$ 不影响 SNR，因为它同时放大信号和噪声。

---

### 19-3-3 相关接收机 Correlation Receiver

![相关接收机](<CPS Lecture 19 Noise in Digital Modulation.attachments/correlation-receiver.jpg>)

匹配滤波输出为：

$$
Y=\int_0^T g(T-t)r(t)\,dt.
$$

代入 $g(T-t)=cs(t)$：

$$
Y=c\int_0^T s(t)r(t)\,dt.
$$

:::: definition 相关接收机 Correlation Receiver
**相关接收机 Correlation Receiver** 通过计算接收信号与候选发送信号的内积或互相关来完成检测。
::::

若接收脉冲定时未知，可以计算不同延迟下的相关输出：

$$
Y(\tau)=c\int_{-\infty}^{+\infty}s(t)r(t-\tau)\,dt.
$$

最大相关值对应最可能的时间对齐位置。

## 19-4 BPSK 最优检测 Optimum Detection of BPSK

### 19-4-1 BPSK 发送信号 BPSK Transmitted Signal

**二进制相移键控 Binary Phase Shift Keying, BPSK** 使用相差 $\pi$ 的两个相位表示二进制符号：

$$
s(t)=
\begin{cases}
A_c\cos{(2\pi f_ct)}, & 0\le t\le T,\ \text{发送 }1,\\
A_c\cos{(2\pi f_ct+\pi)}, & 0\le t\le T,\ \text{发送 }0.
\end{cases}
$$

由于：

$$
\cos{(2\pi f_ct+\pi)}=-\cos{(2\pi f_ct)},
$$

可写成统一形式：

$$
s(t)=A_cm(t)\cos{(2\pi f_ct)}.
$$

其中：

$$
m(t)=
\begin{cases}
+1, & \text{bit }1,\\
-1, & \text{bit }0.
\end{cases}
$$

多比特基带波形可写为：

$$
m(t)=\sum_{k=0}^{N}b_kh(t-kT),
$$

其中 $b_k\in\{+1,-1\}$，$h(t)$ 为矩形脉冲成形函数。

---

### 19-4-2 相干检测 Coherent Detection

:::: definition 相干检测 Coherent Detection
**相干检测 Coherent Detection** 要求接收机具有与发送端载波同频同相的参考信号。
::::

![BPSK 相干接收机](<CPS Lecture 19 Noise in Digital Modulation.attachments/bpsk-coherent-receiver.jpg>)

BPSK 和 DSB-SC 调制形式接近，常用相干接收机检测。接收机本振 Local Oscillator 必须和发送载波保持频率与相位同步。

带通噪声可分解为同相和正交分量：

$$
x(t)=s(t)+n_I(t)\cos{(2\pi f_ct)}-n_Q(t)\sin{(2\pi f_ct)}.
$$

其中：

- $n_I(t)$：同相噪声 In-phase Noise；
- $n_Q(t)$：正交噪声 Quadrature Noise。

![带通噪声功率谱](<CPS Lecture 19 Noise in Digital Modulation.attachments/bandpass-noise-psd.jpg>)

---

### 19-4-3 乘积解调与低通滤波 Product Detection and Low-pass Filtering

![BPSK 乘积检测](<CPS Lecture 19 Noise in Digital Modulation.attachments/bpsk-product-detection.jpg>)

接收信号乘以本地载波：

$$
v(t)=x(t)\cos{(2\pi f_ct)}.
$$

代入并使用三角恒等式：

$$
\cos{A}\cos{B}
=\frac{1}{2}\left[\cos{(A-B)}+\cos{(A+B)}\right],
$$

$$
\sin{A}\cos{B}
=\frac{1}{2}\left[\sin{(A+B)}+\sin{(A-B)}\right],
$$

得到：

$$
\begin{aligned}
v(t)
&=
\frac{1}{2}\left[A_cm(t)+n_I(t)\right]\\
&\quad+
\frac{1}{2}\left[A_cm(t)+n_I(t)\right]\cos{(4\pi f_ct)}
-
\frac{1}{2}n_Q(t)\sin{(4\pi f_ct)}.
\end{aligned}
$$

低通滤波器保留基带项：

$$
v_{\mathrm{LPF}}(t)
=\frac{1}{2}\left[A_cm(t)+n_I(t)\right].
$$

高频项位于 $2f_c$ 附近，被低通滤波器去除。对于匹配滤波接收机，低通和匹配滤波常合并实现。

---

### 19-4-4 判决规则与 BER Decision Rule and BER

用归一化基函数：

$$
\phi(t)=\sqrt{\frac{2}{T_b}}\cos{(2\pi f_ct)},
\qquad 0\le t\le T_b.
$$

BPSK 两个符号在一维信号空间中的坐标为：

$$
s_1=+\sqrt{E_b},
\qquad
s_0=-\sqrt{E_b}.
$$

相关接收输出：

$$
y=\int_0^{T_b}r(t)\phi(t)\,dt.
$$

在 AWGN 下：

$$
y=
\begin{cases}
+\sqrt{E_b}+n, & \text{发送 }1,\\
-\sqrt{E_b}+n, & \text{发送 }0,
\end{cases}
$$

其中：

$$
n\sim\mathcal{N}\left(0,\frac{N_0}{2}\right).
$$

等概先验下，最优判决门限为 $0$：

$$
\begin{cases}
y>0, & \text{判为 }1,\\
y<0, & \text{判为 }0.
\end{cases}
$$

> [!NOTE]
> 旧 CPS 笔记到相干接收结构为止，没有展开 BER 闭式结果。复习 AWGN 下 BPSK 时通常直接使用下面这个标准结论。

定义 Q 函数：

$$
Q(x)=\frac{1}{\sqrt{2\pi}}\int_x^\infty e^{-u^2/2}\,du.
$$

BPSK 在 AWGN 信道下的最优比特错误率为：

$$
\boxed{
P_b
=Q\left(\sqrt{\frac{2E_b}{N_0}}\right)
=\frac{1}{2}\operatorname{erfc}
\left(\sqrt{\frac{E_b}{N_0}}\right)
}
$$

该式直接连接 Lecture 19 的三个核心量：BER、$E_b/N_0$ 和最优检测。
