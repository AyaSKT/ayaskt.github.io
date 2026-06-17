---
author: Ayaskt
---

# Review of Signals and Systems

## 章节目录

- [2-1 通信中的信号 Signals in Communication](#2-1-通信中的信号-signals-in-communication)
  - [2-1-1 信号的定义 Definition of Signal](#2-1-1-信号的定义-definition-of-signal)
  - [2-1-2 时域和频域 Time Domain and Frequency Domain](#2-1-2-时域和频域-time-domain-and-frequency-domain)
- [2-2 信号分类 Signal Classification](#2-2-信号分类-signal-classification)
  - [2-2-1 确定信号和随机信号 Deterministic and Random Signals](#2-2-1-确定信号和随机信号-deterministic-and-random-signals)
  - [2-2-2 模拟数字和连续离散 Analog Digital Continuous Discrete](#2-2-2-模拟数字和连续离散-analog-digital-continuous-discrete)
  - [2-2-3 周期信号 Periodic Signals](#2-2-3-周期信号-periodic-signals)
  - [2-2-4 信息与非周期性 Information and Aperiodicity](#2-2-4-信息与非周期性-information-and-aperiodicity)
- [2-3 复数表示 Complex Representation](#2-3-复数表示-complex-representation)
  - [2-3-1 复平面 Complex Plane](#2-3-1-复平面-complex-plane)
  - [2-3-2 极坐标和 Euler 公式 Polar Form and Euler Formula](#2-3-2-极坐标和-euler-公式-polar-form-and-euler-formula)
  - [2-3-3 共轭和实虚部 Conjugate Real and Imaginary Parts](#2-3-3-共轭和实虚部-conjugate-real-and-imaginary-parts)
- [2-4 基本信号 Fundamental Signals](#2-4-基本信号-fundamental-signals)
  - [2-4-1 正弦信号 Sinusoidal Signal](#2-4-1-正弦信号-sinusoidal-signal)
  - [2-4-2 指数信号 Exponential Signal](#2-4-2-指数信号-exponential-signal)
  - [2-4-3 冲激信号 Impulse Signal](#2-4-3-冲激信号-impulse-signal)
  - [2-4-4 阶跃信号 Unit Step Signal](#2-4-4-阶跃信号-unit-step-signal)
  - [2-4-5 sinc 信号 Sinc Signal](#2-4-5-sinc-信号-sinc-signal)
- [2-5 信号能量与功率 Signal Energy and Power](#2-5-信号能量与功率-signal-energy-and-power)
  - [2-5-1 能量信号 Energy Signal](#2-5-1-能量信号-energy-signal)
  - [2-5-2 功率信号 Power Signal](#2-5-2-功率信号-power-signal)
  - [2-5-3 分贝单位 Decibel Units](#2-5-3-分贝单位-decibel-units)
- [2-6 复习重点 Review Checklist](#2-6-复习重点-review-checklist)
  - [2-6-1 本讲公式 Formula List](#2-6-1-本讲公式-formula-list)
  - [2-6-2 判断顺序 Decision Flow](#2-6-2-判断顺序-decision-flow)

## 2-1 通信中的信号 Signals in Communication

### 2-1-1 信号的定义 Definition of Signal

:::: definition 信号 Signal
**信号 Signal** 是携带或编码信息的波形，可以是电压、电流、电磁场，也可以是声压、光强或其他随时间变化的物理量。
::::

在通信系统中，信息源产生消息，消息被转换为适合传输的电波形。这个电波形就是课程里分析的主要对象。

信号常写成时间函数：

$$
x(t),\quad g(t),\quad m(t),\quad s(t)
$$

变量 $t$ 表示时间。不同字母只是为了区分上下文，例如 $m(t)$ 常表示 message signal，$s(t)$ 常表示 transmitted signal。

---

### 2-1-2 时域和频域 Time Domain and Frequency Domain

:::: definition 时域 Time Domain
**时域 Time Domain** 用时间作为横轴，描述信号随时间的变化。
::::

:::: definition 频域 Frequency Domain
**频域 Frequency Domain** 用频率作为横轴，描述信号由哪些频率分量组成，以及每个频率分量的幅度和相位。
::::

同一个信号可以有两种描述：

$$
x(t)
\xleftrightarrow{\mathcal F}
X(\omega)
$$

其中 $x(t)$ 是时域波形，$X(\omega)$ 是频域频谱。通信系统大量使用傅里叶分析，因为信道、滤波器和调制都可以在频域中更清楚地表示。

## 2-2 信号分类 Signal Classification

### 2-2-1 确定信号和随机信号 Deterministic and Random Signals

:::: definition 确定信号 Deterministic Signal
**确定信号 Deterministic Signal** 可以用明确的数学表达式或确定规则描述。给定时间 $t$ 后，信号值可以被确定。
::::

:::: definition 随机信号 Random Signal
**随机信号 Random Signal** 也称 **随机过程 Stochastic Signal / Random Process**，它的具体取值不能提前完全确定，只能用概率模型描述。
::::

课程前半部分主要处理确定信号。噪声通常需要随机模型，但在 Part 1 中只需要知道噪声会降低接收信号质量，后续再具体分析。

---

### 2-2-2 模拟数字和连续离散 Analog Digital Continuous Discrete

![模拟与数字波形](<CPS Lecture 2 Review of Signals and Systems.attachments/analog-and-digital-waveforms.jpg>)

:::: definition 模拟信号 Analog Signal
**模拟信号 Analog Signal** 的某个连续参数表示物理量，幅度可以在指定范围内连续取值。
::::

:::: definition 数字信号 Digital Signal
**数字信号 Digital Signal** 表示一串数字、符号或状态，其取值通常限制在有限集合中。
::::

:::: definition 连续时间信号 Continuous-Time Signal
**连续时间信号 Continuous-Time Signal** 的自变量在连续时间轴上取值，常写为 $x(t)$。
::::

:::: definition 离散时间信号 Discrete-Time Signal
**离散时间信号 Discrete-Time Signal** 的自变量只在离散时刻取值，常写为 $x[n]$ 或 $x(nT)$。
::::

![连续与离散信号分类](<CPS Lecture 2 Review of Signals and Systems.attachments/continuous-and-discrete-classification-wide.jpg>)

这两组分类互相独立：

| 分类角度 | 关注点 | 例子 |
| --- | --- | --- |
| 模拟 / 数字 | 幅度或状态怎样表示信息 | 连续幅度电压、二进制电平 |
| 连续时间 / 离散时间 | 自变量 $t$ 怎样取值 | 模拟电路波形、采样序列 |

因此可以有连续时间数字信号，也可以有离散时间模拟信号。看图时要同时判断横轴和纵轴。

---

### 2-2-3 周期信号 Periodic Signals

:::: definition 周期信号 Periodic Signal
**周期信号 Periodic Signal** 满足存在正实数 $T$，使得对所有 $t$ 都有：

$$
x(t)=x(t+T)
$$
::::

满足条件的最小正周期称为 **基波周期 Fundamental Period**，记为 $T_0$。对应的 **基波频率 Fundamental Frequency** 和 **基波角频率 Fundamental Angular Frequency** 为：

$$
f_0=\frac{1}{T_0}
$$

$$
\omega_0=\frac{2\pi}{T_0}=2\pi f_0
$$

若不存在这样的 $T$，信号称为 **非周期信号 Aperiodic Signal**。

---

### 2-2-4 信息与非周期性 Information and Aperiodicity

完全周期的比特序列，例如 $10101010\cdots$，接收者很快就可以预测后续符号。真正携带新信息的序列通常具有不可完全预测的变化。

这点和频谱也有关。周期信号对应离散谱线；非周期信号通常对应连续频谱。通信信号要承载消息，必须允许波形随消息内容发生变化。

## 2-3 复数表示 Complex Representation

### 2-3-1 复平面 Complex Plane

![复平面中的复数向量](<CPS Lecture 2 Review of Signals and Systems.attachments/complex-plane-vector.jpg>)

:::: definition 复数 Complex Number
**复数 Complex Number** 写作：

$$
z=x+jy
$$

其中 $j=\sqrt{-1}$，$x=\operatorname{Re}(z)$ 是实部，$y=\operatorname{Im}(z)$ 是虚部。
::::

复数可以看作二维向量。通信中用复数描述幅度和相位，尤其适合表示正弦波、相位旋转、滤波器频率响应和 IQ 信号。

---

### 2-3-2 极坐标和 Euler 公式 Polar Form and Euler Formula

复数也可以写成极坐标形式：

$$
r=\sqrt{x^2+y^2}
$$

$$
\theta=\angle z=\operatorname{atan2}(y,x)
$$

若只写成 $\tan^{-1}(y/x)$，还需要根据 $x$ 与 $y$ 的符号修正象限。

反过来：

$$
x=r\cos{\theta},\qquad y=r\sin{\theta}
$$

因此：

$$
z=x+jy=r\cos{\theta}+jr\sin{\theta}
$$

:::: definition Euler 公式 Euler Formula
**Euler 公式 Euler Formula** 将复指数和三角函数连接起来：

$$
e^{j\theta}=\cos{\theta}+j\sin{\theta}
$$
::::

于是复数可以写成：

$$
z=re^{j\theta}
$$

用复指数处理三角恒等式会更省力。由：

$$
e^{j(\theta_1+\theta_2)}
=e^{j\theta_1}e^{j\theta_2}
$$

代入 Euler 公式：

$$
\begin{aligned}
e^{j(\theta_1+\theta_2)}
&=(\cos{\theta_1}+j\sin{\theta_1})
(\cos{\theta_2}+j\sin{\theta_2})\\
&=(\cos{\theta_1}\cos{\theta_2}-\sin{\theta_1}\sin{\theta_2})\\
&\quad+j(\cos{\theta_1}\sin{\theta_2}+\sin{\theta_1}\cos{\theta_2})
\end{aligned}
$$

取实部：

$$
\cos{(\theta_1+\theta_2)}
=\cos{\theta_1}\cos{\theta_2}
-\sin{\theta_1}\sin{\theta_2}
$$

取虚部：

$$
\sin{(\theta_1+\theta_2)}
=\cos{\theta_1}\sin{\theta_2}
+\sin{\theta_1}\cos{\theta_2}
$$

---

### 2-3-3 共轭和实虚部 Conjugate Real and Imaginary Parts

:::: definition 复共轭 Complex Conjugate
若 $z=x+jy=re^{j\theta}$，则 **复共轭 Complex Conjugate** 为：

$$
z^*=x-jy=re^{-j\theta}
$$
::::

复共轭对应复平面中关于实轴的镜像。实部和虚部可以由 $z$ 与 $z^*$ 得到：

$$
\operatorname{Re}(z)=\frac{z+z^*}{2}
$$

$$
\operatorname{Im}(z)=\frac{z-z^*}{2j}
$$

特别地，令 $z=e^{j\theta}$：

$$
\cos{\theta}=\frac{e^{j\theta}+e^{-j\theta}}{2}
$$

$$
\sin{\theta}=\frac{e^{j\theta}-e^{-j\theta}}{2j}
$$

这些关系在 Fourier 分析和 IQ 调制中会反复使用。

## 2-4 基本信号 Fundamental Signals

### 2-4-1 正弦信号 Sinusoidal Signal

![正弦信号参数](<CPS Lecture 2 Review of Signals and Systems.attachments/sinusoid-parameters-wide.jpg>)

:::: definition 正弦信号 Sinusoidal Signal
**正弦信号 Sinusoidal Signal** 是形如：

$$
x(t)=A\cos{(2\pi f t+\theta)}
$$

的周期信号。
::::

其中：

- $A$：幅度 Amplitude；
- $f$：频率 Frequency，单位 $\mathrm{Hz}$；
- $T=1/f$：周期 Period；
- $\theta$：相位 Phase，单位 $\mathrm{rad}$。

角频率写作：

$$
\omega=2\pi f
$$

因此也常写成：

$$
x(t)=A\cos{(\omega t+\theta)}
$$

---

### 2-4-2 指数信号 Exponential Signal

:::: definition 复指数信号 Complex Exponential Signal
**复指数信号 Complex Exponential Signal** 写作：

$$
x(t)=Ae^{\lambda t}
$$

其中 $A$ 和 $\lambda$ 可以是复数。
::::

若 $A,\lambda$ 都是实数，则得到实指数信号：

| 条件 | 行为 |
| --- | --- |
| $\lambda>0$ | 随时间指数增长 |
| $\lambda=0$ | 常数信号 |
| $\lambda<0$ | 随时间指数衰减 |

若 $\lambda=j\omega$ 为纯虚数：

$$
x(t)=Ae^{j\omega t}
$$

令 $A=\lvert A\rvert e^{j\theta}$，则：

$$
x(t)=\lvert A\rvert e^{j(\omega t+\theta)}
$$

由 Euler 公式：

$$
x(t)=\lvert A\rvert\cos{(\omega t+\theta)}
+j\lvert A\rvert\sin{(\omega t+\theta)}
$$

其实部和虚部都是正弦信号，相差一个相位。

更一般地，令：

$$
\lambda=\sigma+j\omega
$$

则：

$$
x(t)=\lvert A\rvert e^{\sigma t}
\cos{(\omega t+\theta)}
+j\lvert A\rvert e^{\sigma t}
\sin{(\omega t+\theta)}
$$

![增长复指数信号](<CPS Lecture 2 Review of Signals and Systems.attachments/growing-complex-exponential-wide.jpg>)

此时 $\sigma$ 控制包络增长或衰减，$\omega$ 控制振荡频率。

---

### 2-4-3 冲激信号 Impulse Signal

![单位冲激及其矩形脉冲极限](<CPS Lecture 2 Review of Signals and Systems.attachments/unit-impulse-and-limit-wide.jpg>)

:::: definition 单位冲激 Unit Impulse
**单位冲激 Unit Impulse** 又称 **Dirac delta function**，记为 $\delta(t)$，满足：

$$
\delta(t)=0,\qquad t\neq 0
$$

$$
\int_{-\infty}^{\infty}\delta(t)\,dt=1
$$
::::

冲激属于广义函数，普通函数的点值描述不适用。图像上常用一根箭头表示，箭头旁的数值表示冲激面积。

单位冲激可以看成矩形脉冲的极限。

定义：

$$
g_\varepsilon(t)=
\begin{cases}
\dfrac{1}{\varepsilon}, & \lvert t\rvert<\dfrac{\varepsilon}{2}\\
0, & \text{otherwise}
\end{cases}
$$

对任意 $\varepsilon>0$：

$$
\int_{-\infty}^{\infty}g_\varepsilon(t)\,dt=1
$$

当 $\varepsilon\to 0$ 时：

$$
\delta(t)=\lim_{\varepsilon\to 0}g_\varepsilon(t)
$$

冲激的两个关键性质：

$$
x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0)
$$

$$
\int_{-\infty}^{\infty}x(t)\delta(t-t_0)\,dt=x(t_0)
$$

第一个是 **等效性质 Equivalence Property**，第二个是 **抽样性质 Sampling Property**。后者说明冲激可以从连续函数中“取出”某个时刻的值。

在 LTI 系统中，输入为 $\delta(t)$ 时的输出称为 **冲激响应 Impulse Response**。知道冲激响应后，可以用卷积求任意输入的输出。

---

### 2-4-4 阶跃信号 Unit Step Signal

![单位阶跃信号](<CPS Lecture 2 Review of Signals and Systems.attachments/unit-step-signal.jpg>)

:::: definition 单位阶跃 Unit Step
**单位阶跃 Unit Step** 记为 $u(t)$，定义为：

$$
u(t)=
\begin{cases}
0, & t<0\\
1, & t\geq 0
\end{cases}
$$
::::

若希望某个信号从 $t=0$ 开始，可以乘以单位阶跃。例如：

$$
x(t)u(t)
$$

表示 $x(t)$ 在 $t<0$ 时被截断为 $0$，在 $t\geq 0$ 时保持原值。

---

### 2-4-5 sinc 信号 Sinc Signal

![sinc 函数](<CPS Lecture 2 Review of Signals and Systems.attachments/sinc-function-wide.jpg>)

:::: definition sinc 信号 Sinc Signal
本讲采用的 **sinc 信号 Sinc Signal** 定义为：

$$
\operatorname{sinc}(t)=\frac{\sin{t}}{t}
$$
::::

在 $t=0$ 处按极限定义：

$$
\operatorname{sinc}(0)
=\lim_{t\to 0}\frac{\sin{t}}{t}
=1
$$

sinc 信号由正弦振荡和 $1/t$ 型衰减包络组成。它在 Fourier 变换中很常见，矩形脉冲的频谱就是 sinc 形状。

## 2-5 信号能量与功率 Signal Energy and Power

### 2-5-1 能量信号 Energy Signal

:::: definition 信号能量 Signal Energy
连续时间信号 $g(t)$ 的 **信号能量 Signal Energy** 定义为：

$$
E_g=\int_{-\infty}^{\infty}\lvert g(t)\rvert^2\,dt
$$
::::

如果 $g(t)$ 是复值信号，$\lvert g(t)\rvert^2=g(t)g^*(t)$。

当：

$$
0<E_g<\infty
$$

时，$g(t)$ 称为 **能量信号 Energy Signal**。有限时长脉冲、指数衰减信号通常属于能量信号。

对有限能量信号，远离主要时间范围的尾部能量必须趋于 $0$：

$$
\lim_{T\to\infty}
\left(
\int_{-\infty}^{-T}\lvert g(t)\rvert^2\,dt
+
\int_{T}^{\infty}\lvert g(t)\rvert^2\,dt
\right)=0
$$

---

### 2-5-2 功率信号 Power Signal

:::: definition 平均功率 Average Power
信号 $g(t)$ 的 **平均功率 Average Power** 定义为：

$$
P_g=\lim_{T\to\infty}
\frac{1}{T}
\int_{-T/2}^{T/2}\lvert g(t)\rvert^2\,dt
$$
::::

若 $g(t)$ 是周期为 $T_0$ 的周期信号，则可以在任意一个周期上求平均功率：

$$
P_g=\frac{1}{T_0}\int_{a}^{a+T_0}\lvert g(t)\rvert^2\,dt
$$

其中 $a$ 可以任取。

当：

$$
0<P_g<\infty
$$

时，$g(t)$ 称为 **功率信号 Power Signal**。正弦信号和周期方波都是功率信号。

能量信号和功率信号的常见关系：

| 类型 | 能量 $E_g$ | 平均功率 $P_g$ |
| --- | --- | --- |
| 能量信号 | 有限正数 | $0$ |
| 功率信号 | $\infty$ | 有限正数 |

---

### 2-5-3 分贝单位 Decibel Units

若电压信号 $g(t)$ 加在电阻 $R$ 上，瞬时功率为：

$$
P(t)=\frac{g^2(t)}{R}
$$

通信课程中常将 $R$ 归一化为 $1\,\Omega$，于是信号功率直接与 $\lvert g(t)\rvert^2$ 成正比。

:::: definition 分贝 Decibel
**分贝 Decibel, dB** 是对数形式的相对功率单位。若功率为 $P$，相对于参考功率 $P_0$ 的 dB 值为：

$$
P_{\mathrm{dB}}=10\log_{10}{\left(\frac{P}{P_0}\right)}
$$
::::

常见参考：

$$
P_{\mathrm{dBW}}=10\log_{10}{\left(\frac{P}{1\,\mathrm{W}}\right)}
$$

若 $P$ 以瓦特为单位：

$$
P_{\mathrm{dBm}}
=10\log_{10}{\left(\frac{P}{1\,\mathrm{mW}}\right)}
=30+10\log_{10}{P}
$$

分贝适合通信系统，因为很多感知和工程指标都以比例变化为主，例如 SNR、路径损耗和放大器增益。

## 2-6 复习重点 Review Checklist

### 2-6-1 本讲公式 Formula List

| 内容 | 公式 |
| --- | --- |
| 周期条件 | $x(t)=x(t+T)$ |
| 基波频率 | $f_0=1/T_0$ |
| 基波角频率 | $\omega_0=2\pi/T_0$ |
| Euler 公式 | $e^{j\theta}=\cos{\theta}+j\sin{\theta}$ |
| 复共轭 | $z^*=x-jy=re^{-j\theta}$ |
| 正弦信号 | $x(t)=A\cos{(2\pi ft+\theta)}$ |
| 复指数 | $x(t)=Ae^{\lambda t}$ |
| 单位冲激面积 | $\int_{-\infty}^{\infty}\delta(t)\,dt=1$ |
| 冲激抽样 | $\int_{-\infty}^{\infty}x(t)\delta(t-t_0)\,dt=x(t_0)$ |
| 单位阶跃 | $u(t)=0,t<0;\ u(t)=1,t\geq0$ |
| sinc | $\operatorname{sinc}(t)=\sin{t}/t$ |
| 信号能量 | $E_g=\int_{-\infty}^{\infty}\lvert g(t)\rvert^2\,dt$ |
| 平均功率 | $P_g=\lim_{T\to\infty}\dfrac{1}{T}\int_{-T/2}^{T/2}\lvert g(t)\rvert^2\,dt$ |

---

### 2-6-2 判断顺序 Decision Flow

判断一个信号时可以按以下顺序：

1. 看自变量：连续时间 $x(t)$ 或离散时间 $x[n]$；
2. 看取值集合：模拟幅度或数字状态；
3. 看可预测性：确定信号或随机信号；
4. 看重复性：周期或非周期；
5. 看总能量和平均功率：能量信号或功率信号；
6. 若要分析系统作用，准备使用冲激响应和 Fourier 变换。

本讲最重要的结论是：复指数、冲激、阶跃、sinc、能量和功率是后续 LTI 系统与 Fourier 分析的基础件。
