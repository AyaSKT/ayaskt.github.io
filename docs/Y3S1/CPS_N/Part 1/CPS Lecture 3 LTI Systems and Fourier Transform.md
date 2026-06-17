---
author: Ayaskt
---

# LTI Systems and Fourier Transform

## 章节目录

- [3-1 系统模型 System Model](#3-1-系统模型-system-model)
  - [3-1-1 系统作为算子 System as Operator](#3-1-1-系统作为算子-system-as-operator)
  - [3-1-2 系统连接 System Connections](#3-1-2-系统连接-system-connections)
- [3-2 基本系统性质 Basic System Properties](#3-2-基本系统性质-basic-system-properties)
  - [3-2-1 记忆性 Memory](#3-2-1-记忆性-memory)
  - [3-2-2 因果性 Causality](#3-2-2-因果性-causality)
  - [3-2-3 线性 Linearity](#3-2-3-线性-linearity)
  - [3-2-4 时不变性 Time Invariance](#3-2-4-时不变性-time-invariance)
- [3-3 LTI 系统和卷积 LTI Systems and Convolution](#3-3-lti-系统和卷积-lti-systems-and-convolution)
  - [3-3-1 LTI 系统 Linear Time Invariant System](#3-3-1-lti-系统-linear-time-invariant-system)
  - [3-3-2 冲激响应 Impulse Response](#3-3-2-冲激响应-impulse-response)
  - [3-3-3 卷积积分 Convolution Integral](#3-3-3-卷积积分-convolution-integral)
  - [3-3-4 卷积例题 Convolution Example](#3-3-4-卷积例题-convolution-example)
  - [3-3-5 复指数特征函数 Complex Exponential Eigenfunctions](#3-3-5-复指数特征函数-complex-exponential-eigenfunctions)
- [3-4 通信信道的 LTI 模型 LTI Channel Modelling](#3-4-通信信道的-lti-模型-lti-channel-modelling)
  - [3-4-1 多径信道 Multipath Channel](#3-4-1-多径信道-multipath-channel)
  - [3-4-2 逆系统和均衡 Inverse System and Equalisation](#3-4-2-逆系统和均衡-inverse-system-and-equalisation)
- [3-5 傅里叶级数 Fourier Series](#3-5-傅里叶级数-fourier-series)
  - [3-5-1 周期信号展开 Periodic Signal Expansion](#3-5-1-周期信号展开-periodic-signal-expansion)
  - [3-5-2 谐波和直流分量 Harmonics and DC Component](#3-5-2-谐波和直流分量-harmonics-and-dc-component)
- [3-6 傅里叶变换 Fourier Transform](#3-6-傅里叶变换-fourier-transform)
  - [3-6-1 正变换和反变换 Forward and Inverse Transform](#3-6-1-正变换和反变换-forward-and-inverse-transform)
  - [3-6-2 矩形脉冲例题 Rectangular Pulse Example](#3-6-2-矩形脉冲例题-rectangular-pulse-example)
  - [3-6-3 冲激变换 Impulse Transform](#3-6-3-冲激变换-impulse-transform)
- [3-7 傅里叶变换性质 Fourier Transform Properties](#3-7-傅里叶变换性质-fourier-transform-properties)
  - [3-7-1 线性 Linearity](#3-7-1-线性-linearity)
  - [3-7-2 时移和调制 Shifting and Modulation](#3-7-2-时移和调制-shifting-and-modulation)
  - [3-7-3 对偶性 Duality](#3-7-3-对偶性-duality)
  - [3-7-4 卷积性质 Convolution Property](#3-7-4-卷积性质-convolution-property)
  - [3-7-5 Parseval 定理 Parseval Theorem](#3-7-5-parseval-定理-parseval-theorem)
- [3-8 频率响应和滤波器 Frequency Response and Filters](#3-8-频率响应和滤波器-frequency-response-and-filters)
  - [3-8-1 LTI 频率响应 Frequency Response of LTI Systems](#3-8-1-lti-频率响应-frequency-response-of-lti-systems)
  - [3-8-2 幅度响应和相位响应 Magnitude and Phase Response](#3-8-2-幅度响应和相位响应-magnitude-and-phase-response)
  - [3-8-3 理想滤波器 Ideal Filters](#3-8-3-理想滤波器-ideal-filters)
- [3-9 复习重点 Review Checklist](#3-9-复习重点-review-checklist)
  - [3-9-1 本讲公式 Formula List](#3-9-1-本讲公式-formula-list)
  - [3-9-2 常见判断 Common Decisions](#3-9-2-常见判断-common-decisions)

## 3-1 系统模型 System Model

### 3-1-1 系统作为算子 System as Operator

![系统算子框图](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/system-operator-block.jpg>)

:::: definition 系统 System
**系统 System** 是把输入信号映射为输出信号的数学模型。它描述某个物理过程、算法或电路对信号的作用。
::::

系统常写作算子形式：

$$
y=\mathcal H\{x\}
$$

或省略花括号：

$$
y=\mathcal H x
$$

其中：

- $x(t)$：输入信号 Input / Excitation；
- $y(t)$：输出信号 Output / Response；
- $\mathcal H$：系统算子 Operator。

算子把函数映射为函数。它处理整段信号，输入输出对象都是时间函数。

---

### 3-1-2 系统连接 System Connections

系统可以串联或并联。

![系统串联连接](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/series-system-connection.jpg>)

串联连接写作：

$$
y=\mathcal H_2\{\mathcal H_1 x\}
$$

并联连接写作：

$$
y=\mathcal H_1x+\mathcal H_2x
$$

通信链路中常见串联结构，例如发射滤波器、信道、接收滤波器依次作用。并联结构常用于多径叠加、滤波器组和 I/Q 分支。

## 3-2 基本系统性质 Basic System Properties

### 3-2-1 记忆性 Memory

:::: definition 无记忆系统 Memoryless System
**无记忆系统 Memoryless System** 在任意时刻 $t_0$ 的输出 $y(t_0)$ 只依赖同一时刻的输入 $x(t_0)$。
::::

:::: definition 有记忆系统 System with Memory
**有记忆系统 System with Memory** 在某时刻的输出依赖其他时刻的输入，例如过去输入或未来输入。
::::

理想放大器：

$$
y(t)=Ax(t)
$$

是无记忆系统。电容、电感和滤波器通常有记忆，因为它们的输出与之前储存的能量或过去输入有关。

---

### 3-2-2 因果性 Causality

:::: definition 因果系统 Causal System
**因果系统 Causal System** 在时刻 $t_0$ 的输出只依赖 $t\leq t_0$ 的输入，即当前和过去输入。
::::

:::: definition 非因果系统 Noncausal System
**非因果系统 Noncausal System** 在某时刻的输出依赖未来输入。实时物理系统不能依赖未来输入。
::::

![RC 电路的因果和记忆性](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/rc-circuit-causal-memory.jpg>)

RC 电路是因果且有记忆的系统。电容电压由过去电流累积决定：

$$
v_C(t)=\frac{1}{C}\int_{-\infty}^{t}i(\tau)\,d\tau
$$

积分上限是当前时刻 $t$，因此它不需要未来输入；积分区间包含过去时刻，因此它有记忆。

---

### 3-2-3 线性 Linearity

:::: definition 可加性 Additivity
系统满足 **可加性 Additivity**，若对任意输入 $x_1(t)$、$x_2(t)$ 有：

$$
\mathcal H\{x_1+x_2\}
=\mathcal H\{x_1\}+\mathcal H\{x_2\}
$$
::::

:::: definition 齐次性 Homogeneity
系统满足 **齐次性 Homogeneity**，若对任意标量 $a$ 有：

$$
\mathcal H\{ax\}=a\mathcal H\{x\}
$$
::::

:::: definition 线性系统 Linear System
**线性系统 Linear System** 同时满足可加性和齐次性。等价地，对任意 $a_1,a_2$：

$$
\mathcal H\{a_1x_1+a_2x_2\}
=a_1\mathcal H\{x_1\}+a_2\mathcal H\{x_2\}
$$
::::

线性系统允许使用叠加原理。通信中的小信号放大器、滤波器和许多信道模型都常用线性近似。

---

### 3-2-4 时不变性 Time Invariance

:::: definition 时不变系统 Time-Invariant System
**时不变系统 Time-Invariant System** 满足：若输入 $x(t)$ 的输出为 $y(t)$，则输入延迟 $t_0$ 后，输出也只延迟同样的 $t_0$。

$$
x(t)\xrightarrow{\mathcal H}y(t)
\quad\Longrightarrow\quad
x(t-t_0)\xrightarrow{\mathcal H}y(t-t_0)
$$
::::

判断时不变性时，比较两件事：

1. 先输入 $x(t)$，得到输出 $y(t)$，再把输出延迟为 $y(t-t_0)$；
2. 先把输入延迟为 $x(t-t_0)$，再送入系统。

若两者对任意 $x(t)$ 和 $t_0$ 都相同，系统时不变。

例：系统定义为：

$$
\mathcal H\{x(t)\}=\sin{[x(t)]}
$$

令 $x'(t)=x(t-t_0)$，则：

$$
\mathcal H\{x'(t)\}
=\sin{[x'(t)]}
=\sin{[x(t-t_0)]}
$$

而原输出延迟为：

$$
y(t-t_0)=\sin{[x(t-t_0)]}
$$

两者相同，因此该系统时不变。

## 3-3 LTI 系统和卷积 LTI Systems and Convolution

### 3-3-1 LTI 系统 Linear Time Invariant System

:::: definition 线性时不变系统 Linear Time-Invariant System
**线性时不变系统 Linear Time-Invariant System, LTI System** 同时满足线性和时不变性。
::::

LTI 系统是通信系统中最重要的模型之一。许多真实系统在一定工作范围内可以近似为 LTI 系统，例如小信号滤波器、线性信道和线性均衡器。

对连续时间 LTI 系统：

$$
\boxed{
y(t)=x(t)*h(t)
}
$$

其中 $h(t)$ 是系统冲激响应，$*$ 表示卷积。

---

### 3-3-2 冲激响应 Impulse Response

![LTI 系统冲激响应框图](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/lti-impulse-response-block.jpg>)

:::: definition 冲激响应 Impulse Response
**冲激响应 Impulse Response** 是 LTI 系统在输入为单位冲激 $\delta(t)$ 时的输出，记为 $h(t)$。
::::

冲激响应完全表征 LTI 系统。若知道 $h(t)$，对任意输入 $x(t)$ 都可以由卷积求输出：

$$
y(t)=x(t)*h(t)
$$

这条关系把“测系统”变成“测一个冲激响应”。

---

### 3-3-3 卷积积分 Convolution Integral

:::: definition 卷积 Convolution
连续时间信号 $x(t)$ 和 $h(t)$ 的 **卷积 Convolution** 定义为：

$$
(x*h)(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau
$$
::::

卷积的计算可以看成四步：

1. 保留 $x(\tau)$；
2. 将 $h(\tau)$ 翻转为 $h(-\tau)$；
3. 平移得到 $h(t-\tau)$；
4. 对重叠部分相乘并积分。

对 LTI 系统，卷积中的 $h(t-\tau)$ 给出各时刻输入对当前输出的权重。若系统因果，即 $h(t)=0,\ t<0$，则当前输出只依赖当前和过去输入。

---

### 3-3-4 卷积例题 Convolution Example

:::: stem L3-E1
设 LTI 系统输入和冲激响应为：

$$
x(t)=
\begin{cases}
1, & 0\leq t\leq 1\\
0, & \text{otherwise}
\end{cases}
\qquad
h(t)=
\begin{cases}
2, & 0\leq t\leq 1\\
0, & \text{otherwise}
\end{cases}
$$

求输出 $y(t)=x(t)*h(t)$。
::::

:::: solution
由卷积定义：

$$
y(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau
$$

两个矩形脉冲有重叠时才有非零输出。

当 $t<0$ 时，无重叠：

$$
y(t)=0
$$

当 $0\leq t\leq 1$ 时，重叠区间为 $0\leq\tau\leq t$：

$$
y(t)=\int_0^t 1\cdot 2\,d\tau=2t
$$

当 $1<t\leq 2$ 时，重叠区间为 $t-1\leq\tau\leq 1$：

$$
y(t)=\int_{t-1}^{1}1\cdot 2\,d\tau=4-2t
$$

当 $t>2$ 时，无重叠：

$$
y(t)=0
$$

因此：

$$
\boxed{
y(t)=
\begin{cases}
2t, & 0\leq t\leq 1\\
4-2t, & 1<t\leq 2\\
0, & \text{otherwise}
\end{cases}
}
$$

![卷积得到的三角形输出](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/convolution-triangular-output.jpg>)
::::

---

### 3-3-5 复指数特征函数 Complex Exponential Eigenfunctions

:::: definition 特征函数 Eigenfunction
若系统对输入函数的输出只改变幅度和相位，而函数形式保持同类，则该输入函数称为系统的 **特征函数 Eigenfunction**。
::::

对 LTI 系统，复指数 $e^{j\omega t}$ 是所有 LTI 系统的特征函数。令输入：

$$
x(t)=e^{j\omega t}
$$

则：

$$
\begin{aligned}
y(t)
&=x(t)*h(t)\\
&=\int_{-\infty}^{\infty}h(\tau)e^{j\omega(t-\tau)}\,d\tau\\
&=e^{j\omega t}\int_{-\infty}^{\infty}h(\tau)e^{-j\omega\tau}\,d\tau\\
&=H(\omega)e^{j\omega t}
\end{aligned}
$$

其中：

$$
H(\omega)=\int_{-\infty}^{\infty}h(\tau)e^{-j\omega\tau}\,d\tau
$$

也就是冲激响应的 Fourier 变换。LTI 系统对每个频率分量只做复数乘法。

## 3-4 通信信道的 LTI 模型 LTI Channel Modelling

### 3-4-1 多径信道 Multipath Channel

![多径信道模型](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/multipath-channel-model.jpg>)

:::: definition 多径传播 Multipath Propagation
**多径传播 Multipath Propagation** 指同一发射信号经过直达路径和反射路径等多个路径到达接收机，各路径具有不同衰减和时延。
::::

若发射信号为 $x(t)$，第 $m$ 条路径的增益为 $\alpha_m$，时延为 $\tau_m$，则接收信号可建模为：

$$
y(t)=\sum_{m=1}^{M}\alpha_m x(t-\tau_m)
$$

利用冲激的平移性质：

$$
x(t-\tau_m)=x(t)*\delta(t-\tau_m)
$$

因此：

$$
\begin{aligned}
y(t)
&=\sum_{m=1}^{M}\alpha_m x(t)*\delta(t-\tau_m)\\
&=x(t)*
\left[
\sum_{m=1}^{M}\alpha_m\delta(t-\tau_m)
\right]
\end{aligned}
$$

多径信道的冲激响应为：

$$
h(t)=\sum_{m=1}^{M}\alpha_m\delta(t-\tau_m)
$$

---

### 3-4-2 逆系统和均衡 Inverse System and Equalisation

若信道满足：

$$
y=\mathcal H x
$$

理想恢复希望构造逆系统：

$$
\mathcal H^{-1}\{y\}
=\mathcal H^{-1}\{\mathcal H x\}
=x
$$

在通信中，这类补偿称为 **均衡 Equalisation**。实际系统中存在噪声、带宽限制和信道零点，逆系统不能无限放大某些频率，因此均衡器通常只能近似补偿。

## 3-5 傅里叶级数 Fourier Series

### 3-5-1 周期信号展开 Periodic Signal Expansion

:::: definition 傅里叶级数 Fourier Series
**傅里叶级数 Fourier Series** 将周期信号表示为一组谐波复指数的线性组合。
::::

设周期复信号 $x(t)$ 的周期为 $T$，基波角频率为：

$$
\omega_0=\frac{2\pi}{T}
$$

则：

$$
x(t)=\sum_{k=-\infty}^{\infty}c_k e^{jk\omega_0t}
$$

系数为：

$$
c_k=\frac{1}{T}\int_0^T x(t)e^{-jk\omega_0t}\,dt
$$

---

### 3-5-2 谐波和直流分量 Harmonics and DC Component

$c_0$ 是 **直流分量 DC Component**：

$$
c_0=\frac{1}{T}\int_0^T x(t)\,dt
$$

$k=\pm1$ 对应基波频率 $\pm\omega_0$，$k=\pm2,\pm3,\ldots$ 对应整数倍谐波。

以单位幅度、零均值的奇对称方波为例，它可以由奇次谐波逐步逼近：

$$
x(t)\approx
\frac{4}{\pi}\left[
\sin{(\omega_0t)}
+\frac{1}{3}\sin{(3\omega_0t)}
+\frac{1}{5}\sin{(5\omega_0t)}
+\cdots
\right]
$$

加入越多谐波，时域波形越接近方波；频域中则表现为更多离散谱线。

## 3-6 傅里叶变换 Fourier Transform

### 3-6-1 正变换和反变换 Forward and Inverse Transform

:::: definition 傅里叶变换 Fourier Transform
连续时间信号 $x(t)$ 的 **傅里叶变换 Fourier Transform** 定义为：

$$
X(\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}\,dt
$$
::::

反变换为：

$$
x(t)=\frac{1}{2\pi}
\int_{-\infty}^{\infty}X(\omega)e^{j\omega t}\,d\omega
$$

记作：

$$
x(t)\xleftrightarrow{\mathcal F}X(\omega)
$$

傅里叶级数主要处理周期信号；傅里叶变换可以处理非周期信号，也可以通过广义函数处理周期信号。

---

### 3-6-2 矩形脉冲例题 Rectangular Pulse Example

![矩形脉冲时域图](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/rectangular-pulse-time-domain.jpg>)

:::: stem L3-E2
设：

$$
x_1(t)=
\begin{cases}
1, & -1\leq t\leq 1\\
0, & \text{otherwise}
\end{cases}
$$

求 $x_1(t)$ 的 Fourier 变换。
::::

:::: solution
由定义：

$$
X_1(\omega)=\int_{-1}^{1}e^{-j\omega t}\,dt
$$

积分可得：

$$
\begin{aligned}
X_1(\omega)
&=\left.\frac{e^{-j\omega t}}{-j\omega}\right|_{-1}^{1}\\
&=\frac{e^{-j\omega}-e^{j\omega}}{-j\omega}\\
&=\frac{2\sin{\omega}}{\omega}
\end{aligned}
$$

因此矩形脉冲的频谱是 sinc 形状：

$$
\boxed{
X_1(\omega)=\frac{2\sin{\omega}}{\omega}
}
$$
::::

时间伸缩性质为：

$$
x(at)\xleftrightarrow{\mathcal F}
\frac{1}{\lvert a\rvert}X\left(\frac{\omega}{a}\right)
$$

时间拉宽会使频谱变窄，时间压缩会使频谱变宽。

---

### 3-6-3 冲激变换 Impulse Transform

设：

$$
x(t)=\delta(t)
$$

由冲激抽样性质：

$$
\begin{aligned}
X(\omega)
&=\int_{-\infty}^{\infty}\delta(t)e^{-j\omega t}\,dt\\
&=e^{-j\omega\cdot 0}\\
&=1
\end{aligned}
$$

因此：

$$
\boxed{
\delta(t)\xleftrightarrow{\mathcal F}1
}
$$

时域中无限窄的冲激，对应频域中所有频率成分等幅存在。

## 3-7 傅里叶变换性质 Fourier Transform Properties

### 3-7-1 线性 Linearity

若：

$$
x_1(t)\xleftrightarrow{\mathcal F}X_1(\omega),
\qquad
x_2(t)\xleftrightarrow{\mathcal F}X_2(\omega)
$$

则：

$$
a_1x_1(t)+a_2x_2(t)
\xleftrightarrow{\mathcal F}
a_1X_1(\omega)+a_2X_2(\omega)
$$

Fourier 变换保持线性组合。

---

### 3-7-2 时移和调制 Shifting and Modulation

若：

$$
x(t)\xleftrightarrow{\mathcal F}X(\omega)
$$

时域平移性质为：

$$
x(t-t_0)
\xleftrightarrow{\mathcal F}
e^{-j\omega t_0}X(\omega)
$$

延迟不会改变幅度谱，只引入线性相位。

调制性质为：

$$
e^{j\omega_0t}x(t)
\xleftrightarrow{\mathcal F}
X(\omega-\omega_0)
$$

乘上复指数会把频谱整体搬移 $\omega_0$。Lecture 4 的基带到通带变换直接使用这条性质。

---

### 3-7-3 对偶性 Duality

若：

$$
x(t)\xleftrightarrow{\mathcal F}X(\omega)
$$

则：

$$
X(t)\xleftrightarrow{\mathcal F}2\pi x(-\omega)
$$

对偶性来自正变换和反变换的结构对称：

$$
X(\lambda)=\int_{-\infty}^{\infty}x(\theta)e^{-j\theta\lambda}\,d\theta
$$

$$
x(\lambda)=\frac{1}{2\pi}\int_{-\infty}^{\infty}X(\theta)e^{j\theta\lambda}\,d\theta
$$

---

### 3-7-4 卷积性质 Convolution Property

若：

$$
x_1(t)\xleftrightarrow{\mathcal F}X_1(\omega),
\qquad
x_2(t)\xleftrightarrow{\mathcal F}X_2(\omega)
$$

则：

$$
x_1(t)*x_2(t)
\xleftrightarrow{\mathcal F}
X_1(\omega)X_2(\omega)
$$

时域卷积对应频域乘法。对 LTI 系统：

$$
y(t)=x(t)*h(t)
$$

因此频域中：

$$
Y(\omega)=X(\omega)H(\omega)
$$

---

### 3-7-5 Parseval 定理 Parseval Theorem

:::: definition Parseval 定理 Parseval Theorem
若 $x(t)\xleftrightarrow{\mathcal F}X(\omega)$，则：

$$
\int_{-\infty}^{\infty}\lvert x(t)\rvert^2\,dt
=
\frac{1}{2\pi}
\int_{-\infty}^{\infty}\lvert X(\omega)\rvert^2\,d\omega
$$
::::

Parseval 定理说明信号能量可以在时域或频域中计算。差异只来自本课程采用的 $\omega$ 形式 Fourier 变换中的 $1/(2\pi)$ 系数。

## 3-8 频率响应和滤波器 Frequency Response and Filters

### 3-8-1 LTI 频率响应 Frequency Response of LTI Systems

![频率响应框图](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/frequency-response-block.jpg>)

:::: definition 频率响应 Frequency Response
LTI 系统冲激响应 $h(t)$ 的 Fourier 变换称为 **频率响应 Frequency Response**：

$$
H(\omega)=\mathcal F\{h(t)\}
$$
::::

由卷积性质：

$$
y(t)=x(t)*h(t)
$$

对应：

$$
\boxed{
Y(\omega)=X(\omega)H(\omega)
}
$$

所以 LTI 系统在频域中对每个频率分量乘以一个复数 $H(\omega)$。

---

### 3-8-2 幅度响应和相位响应 Magnitude and Phase Response

一般情况下，$H(\omega)$ 是复值函数。可写为：

$$
H(\omega)=\lvert H(\omega)\rvert e^{j\angle H(\omega)}
$$

:::: definition 幅度响应 Magnitude Response
**幅度响应 Magnitude Response** 是 $\lvert H(\omega)\rvert$，表示系统对不同频率分量幅度的放大或衰减。
::::

:::: definition 相位响应 Phase Response
**相位响应 Phase Response** 是 $\angle H(\omega)$，表示系统对不同频率分量引入的相位变化。
::::

由：

$$
Y(\omega)=X(\omega)H(\omega)
$$

得到：

$$
\lvert Y(\omega)\rvert
=\lvert X(\omega)\rvert\lvert H(\omega)\rvert
$$

$$
\angle Y(\omega)
=\angle X(\omega)+\angle H(\omega)
$$

因此系统的幅度响应改变输出幅度谱，相位响应改变输出相位谱。

---

### 3-8-3 理想滤波器 Ideal Filters

:::: definition 滤波器 Filter
**滤波器 Filter** 是选择性通过某些频率分量、衰减或抑制其他频率分量的系统。
::::

理想低通滤波器：

![理想低通响应](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/ideal-lowpass-response.jpg>)

$$
H(\omega)=
\begin{cases}
1, & -B\leq\omega\leq B\\
0, & \text{otherwise}
\end{cases}
$$

理想高通滤波器：

![理想高通响应](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/ideal-highpass-response.jpg>)

$$
H(\omega)=
\begin{cases}
0, & -B\leq\omega\leq B\\
1, & \text{otherwise}
\end{cases}
$$

理想带通滤波器：

![理想带通响应](<CPS Lecture 3 LTI Systems and Fourier Transform.attachments/ideal-bandpass-response.jpg>)

$$
H(\omega)=
\begin{cases}
1, & B_1\leq \lvert\omega\rvert\leq B_2\\
0, & \text{otherwise}
\end{cases}
$$

低通用于保留基带，高通用于去除低频成分，带通用于选择载波附近的频带。

## 3-9 复习重点 Review Checklist

### 3-9-1 本讲公式 Formula List

| 内容 | 公式 |
| --- | --- |
| 系统算子 | $y=\mathcal Hx$ |
| 线性 | $\mathcal H\{a_1x_1+a_2x_2\}=a_1\mathcal H\{x_1\}+a_2\mathcal H\{x_2\}$ |
| 时不变性 | $x(t-t_0)\to y(t-t_0)$ |
| LTI 输出 | $y(t)=x(t)*h(t)$ |
| 卷积 | $(x*h)(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau$ |
| 复指数响应 | $e^{j\omega t}\to H(\omega)e^{j\omega t}$ |
| Fourier 级数 | $x(t)=\sum_{k=-\infty}^{\infty}c_ke^{jk\omega_0t}$ |
| Fourier 系数 | $c_k=\dfrac{1}{T}\int_0^T x(t)e^{-jk\omega_0t}\,dt$ |
| Fourier 变换 | $X(\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}\,dt$ |
| 反变换 | $x(t)=\dfrac{1}{2\pi}\int_{-\infty}^{\infty}X(\omega)e^{j\omega t}\,d\omega$ |
| 频率响应 | $Y(\omega)=X(\omega)H(\omega)$ |
| Parseval | $\int\lvert x(t)\rvert^2dt=\dfrac{1}{2\pi}\int\lvert X(\omega)\rvert^2d\omega$ |

---

### 3-9-2 常见判断 Common Decisions

系统题常用判断顺序：

1. 判断是否有记忆；
2. 判断是否因果；
3. 判断是否满足可加性；
4. 判断是否满足齐次性；
5. 判断是否时不变；
6. 若线性且时不变，用冲激响应和卷积求输出；
7. 若进入频域，用 $Y(\omega)=X(\omega)H(\omega)$。

Fourier 题常用判断顺序：

1. 周期信号优先考虑 Fourier series；
2. 非周期信号优先考虑 Fourier transform；
3. 出现平移用时移性质；
4. 出现乘复指数用调制性质；
5. 出现 LTI 系统用卷积性质；
6. 出现能量计算用 Parseval 定理。
