---
lastUpdated: 2026-06-16T00:03:58+08:00
---

# 10 FIR Digital Filter Design

**坚守着你所厌恶的爱情的我，和你的相位逐渐变得错位。**

![alt text](<DSP Chapter 10.attachments/1781539232266.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [10-1 FIR 设计概述 FIR Design Overview](#10-1-fir-设计概述-fir-design-overview)
  - [10-1-1 基本目标 Basic Objective](#10-1-1-基本目标-basic-objective)
  - [10-1-2 线性相位条件 Linear Phase Condition](#10-1-2-线性相位条件-linear-phase-condition)
  - [10-1-3 设计指标 Digital Filter Specifications](#10-1-3-设计指标-digital-filter-specifications)
- [10-2 理想滤波器与截断 Ideal Filters and Truncation](#10-2-理想滤波器与截断-ideal-filters-and-truncation)
  - [10-2-1 从理想频响得到冲激响应 Ideal Impulse Response](#10-2-1-从理想频响得到冲激响应-ideal-impulse-response)
  - [10-2-2 典型理想滤波器 Typical Ideal Filters](#10-2-2-典型理想滤波器-typical-ideal-filters)
  - [10-2-3 最小均方意义下的截断 Truncation in MSE Sense](#10-2-3-最小均方意义下的截断-truncation-in-mse-sense)
- [10-3 窗函数法 Window Method](#10-3-窗函数法-window-method)
  - [10-3-1 Gibbs 现象 Gibbs Phenomenon](#10-3-1-gibbs-现象-gibbs-phenomenon)
  - [10-3-2 窗函数与频域卷积 Windowing and Frequency Convolution](#10-3-2-窗函数与频域卷积-windowing-and-frequency-convolution)
  - [10-3-3 固定窗函数 Fixed Windows](#10-3-3-固定窗函数-fixed-windows)
- [10-4 Kaiser 窗 Kaiser Window](#10-4-kaiser-窗-kaiser-window)
  - [10-4-1 Kaiser 窗定义 Definition](#10-4-1-kaiser-窗定义-definition)
  - [10-4-2 参数估计 Parameter Estimation](#10-4-2-参数估计-parameter-estimation)
- [10-5 窗函数法例题 Window Method Examples](#10-5-窗函数法例题-window-method-examples)
  - [10-5-1 由数字指标选择窗函数 Selecting a Window](#10-5-1-由数字指标选择窗函数-selecting-a-window)
  - [10-5-2 低通与高通设计 Lowpass and Highpass Design](#10-5-2-低通与高通设计-lowpass-and-highpass-design)
- [10-6 频率采样法 Frequency Sampling Method](#10-6-频率采样法-frequency-sampling-method)
  - [10-6-1 基本方法 Basic Method](#10-6-1-基本方法-basic-method)
  - [10-6-2 频率采样例题 Design Examples](#10-6-2-频率采样例题-design-examples)
- [10-7 MATLAB FIR 设计 MATLAB FIR Design](#10-7-matlab-fir-设计-matlab-fir-design)
  - [10-7-1 常用函数 Common Functions](#10-7-1-常用函数-common-functions)
  - [10-7-2 kaiserord 与 fir1 Kaiserord and fir1](#10-7-2-kaiserord-与-fir1-kaiserord-and-fir1)

## 10-1 FIR 设计概述 FIR Design Overview

### 10-1-1 基本目标 Basic Objective

FIR 数字滤波器设计通常直接逼近给定的数字频率响应，并附加线性相位要求。

长度为 $L=N+1$、阶数为 $N$ 的因果 FIR 滤波器满足：

$$
H(e^{j\omega})
=\sum_{n=0}^{N}h[n]e^{-j\omega n}
=\left|H(e^{j\omega})\right|e^{j\theta(\omega)}
$$

设计任务主要确定以下量：

- 阶数 $N$，即系数个数 $L=N+1$；
- 冲激响应 $h[n]$，即 FIR 的全部抽头系数。

---

### 10-1-2 线性相位条件 Linear Phase Condition

线性相位 FIR 的相位可以写成：

$$
\theta(\omega)=c\omega+\beta
$$

对于长度 $N+1$ 的常用线性相位 FIR，

$$
c=-\frac{N}{2},
\qquad
\beta=0,\pi,\pm\frac{\pi}{2}
$$

等价地，冲激响应关于中点对称或反对称：

$$
h[n]=h[N-n]
\quad \text{or} \quad
h[n]=-h[N-n]
$$

本章主要处理对称情形。对称 FIR 适合设计低通、高通、带通和带阻幅频滤波器。

---

### 10-1-3 设计指标 Digital Filter Specifications

常见指标包括：

- 通带边缘频率 $\omega_p$；
- 阻带边缘频率 $\omega_s$；
- 通带纹波 $\delta_p$ 或 $\alpha_p$；
- 阻带纹波 $\delta_s$ 或最小阻带衰减 $\alpha_s$；
- 过渡带宽度 $\Delta\omega=\left|\omega_s-\omega_p\right|$。

若用 dB 指标描述，阻带衰减通常写作：

$$
\alpha_s=-20\log_{10}{\delta_s}
$$

通带纹波若围绕 1 对称，可由 $\alpha_p$ 近似换算为：

$$
\delta_p=
\frac{10^{\alpha_p/20}-1}{10^{\alpha_p/20}+1}
$$

FIR 阶数可以先粗估。Kaiser 经验公式的一种常见形式为：

$$
N\cong
\frac{-20\log_{10}{\sqrt{\delta_p\delta_s}}-13}
{14.6(\omega_s-\omega_p)/(2\pi)}
$$

Bellanger 公式为：

$$
N\cong
-\frac{2}{3}
\frac{\log_{10}{(10\delta_p\delta_s)}}
{(\omega_s-\omega_p)/(2\pi)}
-1
$$

这些公式给出初始阶数。最终仍需验证实际频响是否满足指标。

## 10-2 理想滤波器与截断 Ideal Filters and Truncation

### 10-2-1 从理想频响得到冲激响应 Ideal Impulse Response

设理想频率响应为 $H_d(e^{j\omega})$，对应的理想冲激响应为 $h_d[n]$。由 DTFT 反变换：

$$
h_d[n]
=\frac{1}{2\pi}
\int_{-\pi}^{\pi}
H_d(e^{j\omega})e^{j\omega n}\,d\omega,
\qquad
-\infty<n<\infty
$$

大多数理想滤波器的 $h_d[n]$ 为无限长序列，因此不能直接实现。FIR 设计的基本思路是用有限长序列 $h_t[n]$ 逼近它：

$$
h_t[n]\xrightarrow{\text{approximation}}h_d[n]
$$

对应频域为：

$$
H_t(e^{j\omega})
=\sum_{n=0}^{N}h_t[n]e^{-j\omega n}
\xrightarrow{\text{approximation}}
H_d(e^{j\omega})
$$

---

### 10-2-2 典型理想滤波器 Typical Ideal Filters

![alt text](<DSP Chapter 10.attachments/ideal-filter-responses-grid.jpg>)

理想低通的频率响应为：

$$
H_{LP}(e^{j\omega})
=
\begin{cases}
1, & \left|\omega\right|\leq\omega_c\\
0, & \omega_c<\left|\omega\right|\leq\pi
\end{cases}
$$

对应冲激响应：

$$
h_{LP}[n]
=
\begin{cases}
\dfrac{\omega_c}{\pi}, & n=0\\
\dfrac{\sin{(\omega_c n)}}{\pi n}, & n\neq0
\end{cases}
$$

理想高通可由单位冲激减去低通得到：

$$
h_{HP}[n]
=
\begin{cases}
1-\dfrac{\omega_c}{\pi}, & n=0\\
-\dfrac{\sin{(\omega_c n)}}{\pi n}, & n\neq0
\end{cases}
$$

理想带通的两个截止频率为 $0<\omega_{c1}<\omega_{c2}<\pi$：

$$
h_{BP}[n]
=
\begin{cases}
\dfrac{\omega_{c2}-\omega_{c1}}{\pi}, & n=0\\
\dfrac{\sin{(\omega_{c2}n)}-\sin{(\omega_{c1}n)}}{\pi n}, & n\neq0
\end{cases}
$$

理想带阻为单位冲激减去带通：

$$
h_{BS}[n]
=
\begin{cases}
1-\dfrac{\omega_{c2}-\omega_{c1}}{\pi}, & n=0\\
\dfrac{\sin{(\omega_{c1}n)}-\sin{(\omega_{c2}n)}}{\pi n}, & n\neq0
\end{cases}
$$

> [!NOTE]
> 四类理想响应都可由频域矩形函数的反变换得到。低通对应 sinc 形式，其余几类可由低通响应的平移、相减或谱反转得到。

---

### 10-2-3 最小均方意义下的截断 Truncation in MSE Sense

定义积分平方误差：

$$
\Phi_R
=\frac{1}{2\pi}
\int_{-\pi}^{\pi}
\left|
H_t(e^{j\omega})-H_d(e^{j\omega})
\right|^2d\omega
$$

由 Parseval 关系：

$$
\Phi_R
=
\sum_{n=-\infty}^{\infty}
\left|h_t[n]-h_d[n]\right|^2
$$

若只保留 $-M\leq n\leq M$ 的有限长度，则误差可以写成：

$$
\begin{aligned}
\Phi_R
=&
\sum_{n=-M}^{M}
\left|h_t[n]-h_d[n]\right|^2\\
&+
\sum_{n=-\infty}^{-M-1}
\left|h_d[n]\right|^2
+
\sum_{n=M+1}^{\infty}
\left|h_d[n]\right|^2
\end{aligned}
$$

当

$$
h_t[n]=h_d[n],
\qquad -M\leq n\leq M
$$

时，第一项为 0，$\Phi_R$ 最小。因此，在均方误差意义下，截断给出有限长最佳逼近。

截断后的序列仍以 $n=0$ 为中心，是零相位形式。为了得到因果 FIR，需要整体右移 $M$：

$$
h[n]=h_t[n-M],
\qquad
0\leq n\leq 2M
$$

若 $L=2M+1$，则低通因果 FIR 可写成：

$$
h_{LP}[n]
=
\begin{cases}
\dfrac{\omega_c}{\pi}, & n=M\\
\dfrac{\sin{[\omega_c(n-M)]}}{\pi(n-M)}, & n\neq M
\end{cases}
\qquad
0\leq n\leq 2M
$$

## 10-3 窗函数法 Window Method

### 10-3-1 Gibbs 现象 Gibbs Phenomenon

![alt text](<DSP Chapter 10.attachments/windowing-gibbs-convolution-grid.jpg>)

直接截断相当于乘上矩形窗。频域中，理想频响的突变边缘会被窗函数频谱的主瓣和旁瓣扩散，从而产生纹波。

增大长度 $M$ 时：

- 通带和阻带中的纹波数量增加；
- 纹波宽度变窄；
- 过渡带变窄；
- 最大纹波高度不会随长度增加而消失。

该现象称为 **Gibbs 现象 Gibbs Phenomenon**。对于不连续频响，矩形截断无法完全消除边缘过冲；增大长度主要使过冲集中在更窄的频带附近。

---

### 10-3-2 窗函数与频域卷积 Windowing and Frequency Convolution

截断可以改写为窗函数操作：

$$
h_t[n]=h_d[n]w[n]
$$

时域相乘对应频域周期卷积：

$$
H_t(e^{j\omega})
=
\frac{1}{2\pi}
\int_{-\pi}^{\pi}
H_d(e^{j\phi})
W(e^{j(\omega-\phi)})\,d\phi
$$

其中 $W(e^{j\omega})$ 是窗函数 $w[n]$ 的 DTFT。

窗函数的主瓣宽度决定过渡带宽度，旁瓣面积决定通带和阻带纹波。二者存在折中关系。

> [!IMPORTANT]
> 主瓣越窄，过渡带越窄；旁瓣越低，纹波越小。固定窗函数预先给出这两个目标之间的折中。

---

### 10-3-3 固定窗函数 Fixed Windows

![alt text](<DSP Chapter 10.attachments/fixed-window-spectra-grid.jpg>)

以下窗函数均采用中心化写法，定义在 $-M\leq n\leq M$，长度为 $L=2M+1$。

矩形窗：

$$
w_R[n]
=
\begin{cases}
1, & -M\leq n\leq M\\
0, & \text{otherwise}
\end{cases}
$$

其频谱为：

$$
W_R(e^{j\omega})
=
\frac{\sin{\left[\omega(2M+1)/2\right]}}
{\sin{(\omega/2)}}
$$

Hann 窗：

$$
w[n]
=
\frac{1}{2}\left[1+\cos{\left(\frac{\pi n}{M}\right)}\right],
\qquad -M\leq n\leq M
$$

Hamming 窗：

$$
w[n]
=
0.54+0.46\cos{\left(\frac{\pi n}{M}\right)},
\qquad -M\leq n\leq M
$$

Blackman 窗：

$$
w[n]
=
0.42+0.5\cos{\left(\frac{\pi n}{M}\right)}
+0.08\cos{\left(\frac{2\pi n}{M}\right)},
\qquad -M\leq n\leq M
$$

固定窗函数的性质如下：

| 窗函数 Type | 主瓣宽度 $\Delta_{ML}$ | 相对旁瓣电平 $A_{sl}$ | 最小阻带衰减 $\alpha_s$ | 过渡带宽 $\Delta\omega\approx c/M$ |
| --- | --- | --- | --- | --- |
| Rectangular | $4\pi/(2M+1)$ | $13.3\,\mathrm{dB}$ | $20.9\,\mathrm{dB}$ | $0.92\pi/M$ |
| Hann | $8\pi/(2M+1)$ | $31.5\,\mathrm{dB}$ | $43.9\,\mathrm{dB}$ | $3.11\pi/M$ |
| Hamming | $8\pi/(2M+1)$ | $42.7\,\mathrm{dB}$ | $54.5\,\mathrm{dB}$ | $3.32\pi/M$ |
| Blackman | $12\pi/(2M+1)$ | $58.1\,\mathrm{dB}$ | $75.3\,\mathrm{dB}$ | $5.56\pi/M$ |

矩形窗主瓣最窄，但旁瓣最高。Blackman 窗旁瓣最低，但主瓣最宽。

## 10-4 Kaiser 窗 Kaiser Window

### 10-4-1 Kaiser 窗定义 Definition

Kaiser 窗是可调窗函数。仍使用中心化定义：

$$
w[n]
=
\frac{
I_0\left(\beta\sqrt{1-\left(\frac{n}{M}\right)^2}\right)
}
{I_0(\beta)},
\qquad
-M\leq n\leq M
$$

其中 $I_0(x)$ 是零阶第一类修正 Bessel 函数：

$$
I_0(x)
=
1+\sum_{k=1}^{\infty}
\left[
\frac{(x/2)^k}{k!}
\right]^2
$$

$\beta$ 控制窗函数形状。$\beta$ 越大，旁瓣越低，但主瓣也越宽。

---

### 10-4-2 参数估计 Parameter Estimation

设目标阻带衰减为 $A=\alpha_s$，Kaiser 窗的 $\beta$ 取：

$$
\beta=
\begin{cases}
0.1102(A-8.7), & A>50\\
0.5842(A-21)^{0.4}+0.07886(A-21), & 21\leq A\leq50\\
0, & A<21
\end{cases}
$$

阶数估计为：

$$
N
\cong
\frac{A-8}{2.285\Delta\omega}
$$

其中 $\Delta\omega$ 使用弧度频率。实际设计中取上整，再根据所需的线性相位类型调整奇偶性。

## 10-5 窗函数法例题 Window Method Examples

### 10-5-1 由数字指标选择窗函数 Selecting a Window

设计线性相位 FIR 低通滤波器：

$$
\omega_p=0.3\pi,
\qquad
\omega_s=0.5\pi,
\qquad
\alpha_p=1\,\mathrm{dB},
\qquad
\alpha_s=40\,\mathrm{dB}
$$

取截止频率为过渡带中点：

$$
\omega_c
=\frac{\omega_p+\omega_s}{2}
=0.4\pi
$$

理想低通冲激响应：

$$
h_{LP}[n]
=
\begin{cases}
\dfrac{0.4\pi}{\pi}=0.4, & n=0\\
\dfrac{\sin{(0.4\pi n)}}{\pi n}, & n\neq0
\end{cases}
$$

根据 $\alpha_s=40\,\mathrm{dB}$，Hann 窗已经满足 $43.9\,\mathrm{dB}$ 的阻带衰减要求。

Hann 窗：

$$
\Delta\omega=0.2\pi
=\frac{3.11\pi}{M}
\Rightarrow
M\approx 16,
\qquad
L=2M+1=33
$$

因果 FIR 为：

$$
h[n]
=
\frac{\sin{[0.4\pi(n-16)]}}{\pi(n-16)}
w_{Hann}[n-16],
\qquad
0\leq n\leq32
$$

其中 $n=16$ 时取极限值 $0.4$。

若改用 Hamming 窗：

$$
M\approx
\frac{3.32\pi}{0.2\pi}
=16.6
\Rightarrow
M=17,
\qquad
L=35
$$

若改用 Blackman 窗：

$$
M\approx
\frac{5.56\pi}{0.2\pi}
=27.8
\Rightarrow
M=28,
\qquad
L=57
$$

若改用 Kaiser 窗：

$$
N\cong
\frac{40-8}{2.285(0.2\pi)}
\cong 23
$$

$$
\beta
=
0.5842(40-21)^{0.4}+0.07886(40-21)
\cong 3.395
$$

---

### 10-5-2 低通与高通设计 Lowpass and Highpass Design

![alt text](<DSP Chapter 10.attachments/window-method-results-grid.jpg>)

低通例题指标：

- 通带边缘 $f_p=400\,\mathrm{Hz}$；
- 阻带边缘 $f_s=1650\,\mathrm{Hz}$；
- 阻带衰减 $50\,\mathrm{dB}$；
- 采样频率 $F_T=11.025\,\mathrm{kHz}$。

过渡带宽：

$$
\Delta f=1650-400=1250\,\mathrm{Hz}
$$

$$
\Delta\omega
=
2\pi\frac{\Delta f}{F_T}
=
2\pi\frac{1250}{11025}
=0.22676\pi
=0.71238
$$

截止频率取中点：

$$
f_c=\frac{400+1650}{2}=1025\,\mathrm{Hz}
$$

$$
\omega_c
=2\pi\frac{1025}{11025}
=0.18594\pi
=0.58415
$$

选 Hamming 窗。其最小阻带衰减约为 $54.5\,\mathrm{dB}$，满足 $50\,\mathrm{dB}$ 指标。

$$
M\approx
\frac{3.32\pi}{0.71238}
=14.6
\Rightarrow
M=15,
\qquad
L=31
$$

有限长因果低通为：

$$
\hat h_{LP}[n]
=
\begin{cases}
\dfrac{\sin{[\omega_c(n-M)]}}{\pi(n-M)}, & n\neq M\\
\dfrac{\omega_c}{\pi}, & n=M
\end{cases}
$$

Hamming 窗为：

$$
w[n]
=
0.54+0.46\cos{\left(\frac{2\pi(n-M)}{2M}\right)},
\qquad
0\leq n\leq2M
$$

最终系数为：

$$
h[n]=\hat h_{LP}[n]w[n],
\qquad
0\leq n\leq30
$$

高通设计将理想低通替换为理想高通：

$$
\hat h_{HP}[n]
=
\begin{cases}
-\dfrac{\sin{[\omega_c(n-M)]}}{\pi(n-M)}, & n\neq M\\
1-\dfrac{\omega_c}{\pi}, & n=M
\end{cases}
$$

窗函数和阶数不变：

$$
h[n]=\hat h_{HP}[n]w[n]
$$

## 10-6 频率采样法 Frequency Sampling Method

### 10-6-1 基本方法 Basic Method

![alt text](<DSP Chapter 10.attachments/frequency-sampling-grid.jpg>)

频率采样法直接在频域近似目标频率响应。设 FIR 长度为 $L=N+1$，采样点为：

$$
\omega_k=\frac{2\pi k}{L},
\qquad
k=0,1,\dots,L-1
$$

令：

$$
H[k]\approx H_d(e^{j\omega_k})
$$

再用 IDFT 得到系数：

$$
h[n]
=
\frac{1}{L}
\sum_{k=0}^{L-1}
H[k]e^{j2\pi kn/L},
\qquad
n=0,1,\dots,L-1
$$

若要求 Type I 线性相位，且 $N=L-1$ 为偶数，则频域样本常写成：

$$
H[k]
=
H_k e^{-j(N/2)\omega_k}
=
H_k e^{-j(N/2)(2\pi k/L)}
$$

其中 $H_k$ 是实偶对称的幅度采样值：

$$
H_k=H_{L-k}
$$

过渡带可以放入若干个采样点。经验表如下：

| 过渡带采样点数 $m$ | 1 | 2 | 3 |
| --- | --- | --- | --- |
| 阻带最小衰减 | $40\text{--}55\,\mathrm{dB}$ | $65\text{--}75\,\mathrm{dB}$ | $85\text{--}95\,\mathrm{dB}$ |

长度估计：

$$
L\geq
\frac{(m+1)2\pi}{\Delta\omega}
$$

---

### 10-6-2 频率采样例题 Design Examples

设长度 $L=N+1=15$，幅度采样为：

$$
H_k=
\begin{cases}
1, & k=0\\
0.5, & k=1,14\\
0, & k=2,3,\dots,13
\end{cases}
$$

由于 $N=14$，线性相位为：

$$
\theta(\omega)
=-\frac{N}{2}\omega
=-7\omega
$$

于是：

$$
H[k]
=H_k e^{-j7(2\pi k/15)}
$$

非零项为：

$$
H[0]=1,
\qquad
H[1]=0.5e^{-j14\pi/15},
\qquad
H[14]=0.5e^{-j(14)(14\pi/15)}
$$

IDFT 得：

$$
\begin{aligned}
h[n]
&=
\frac{1}{15}
\left[
1+\frac{1}{2}e^{-j14\pi/15}e^{j2\pi n/15}
+\frac{1}{2}e^{-j196\pi/15}e^{j28\pi n/15}
\right]\\
&=
\frac{1}{15}
\left[
1+\cos{\left(\frac{2\pi}{15}(n-7)\right)}
\right],
\qquad
n=0,1,\dots,14
\end{aligned}
$$

另一组按指标设计的低通为：

$$
\omega_p=0.3\pi,
\qquad
\omega_s=0.5\pi,
\qquad
\alpha_s=40\,\mathrm{dB}
$$

查表取 $m=1$，则：

$$
L\geq
\frac{(1+1)2\pi}{0.2\pi}
=20
$$

取奇长度 $L=21$。

通带采样点数为：

$$
N_p
=
L\frac{\omega_p}{2\pi}
=21\frac{0.3\pi}{2\pi}
=3.15
\Rightarrow
N_p=4
$$

幅度采样可写为：

$$
\left|H[k]\right|
=
\begin{cases}
1, & k=0,1,2,3,18,19,20\\
t, & k=4,17\\
0, & k=5,6,\dots,16
\end{cases}
$$

其中 $t$ 是过渡带采样值，通常在 $0$ 到 $1$ 之间选取。然后代入 IDFT：

$$
h[n]
=
\frac{1}{L}
\sum_{k=0}^{L-1}
H[k]W_L^{-kn},
\qquad
W_L=e^{-j2\pi/L}
$$

## 10-7 MATLAB FIR 设计 MATLAB FIR Design

### 10-7-1 常用函数 Common Functions

MATLAB 中固定窗可以直接生成：

```matlab
W = hann(L);
W = hamming(L);
W = blackman(L);
W = kaiser(L, beta);
```

`fir1` 用于设计常规低通、高通、带通、带阻和多带 FIR：

```matlab
b = fir1(N, Wn);
b = fir1(N, Wn, 'ftype');
b = fir1(N, Wn, window);
```

其中：

- `N` 是 FIR 阶数；
- `Wn` 是归一化截止频率，范围为 $0$ 到 $1$，对应 $\omega/\pi$；
- `window` 的长度应为 `N+1`；
- `ftype` 可取 `'high'`、`'bandpass'`、`'stop'` 等。

`fir2` 用于任意形状幅频响应的 FIR 设计。

---

### 10-7-2 kaiserord 与 fir1 Kaiserord and fir1

![alt text](<DSP Chapter 10.attachments/matlab-kaiser-results-grid.jpg>)

Kaiser 窗设计常用 `kaiserord` 估计阶数和参数：

```matlab
fpts = input('Type in the bandedges = ');
mag = input('Type in the desired magnitude values = ');
dev = input('Type in the ripples in each band = ');

[N, Wn, beta, ftype] = kaiserord(fpts, mag, dev);
kw = kaiser(N + 1, beta);
b = fir1(N, Wn, kw);

[h, omega] = freqz(b, 1, 512);
plot(omega/pi, 20*log10(abs(h)));
grid;
xlabel('\omega/\pi');
ylabel('Gain, dB');
```

低通例题输入：

```matlab
fpts = [0.3 0.4];
mag = [1 0];
dev = [0.003162 0.003162];
```

输出为：

$$
N=59,
\qquad
W_n=0.3500,
\qquad
\beta=4.5513,
\qquad
\mathrm{ftype}=\mathrm{low}
$$

高通例题修改设计类型：

```matlab
fpts = [0.4 0.55];
mag = [0 1];
dev = [0.02 0.02];

[N, Wn, beta, ftype] = kaiserord(fpts, mag, dev);
kw = kaiser(N + 1, beta);
b = fir1(N, Wn, 'high', kw);
```

对应结果：

$$
N=26,
\qquad
W_n=0.4750,
\qquad
\beta=2.6523,
\qquad
\mathrm{ftype}=\mathrm{high}
$$

FDATool / `filterDesigner` 可用于图形化设计 FIR 或 IIR 滤波器。手算和脚本设计中，应优先掌握 `fir1`、`kaiserord` 以及 `Wn` 按 Nyquist 频率归一化的约定。
