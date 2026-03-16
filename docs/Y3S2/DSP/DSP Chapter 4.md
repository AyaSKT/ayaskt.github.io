# 4 Discrete Time Systems

**桃之夭夭，其叶蓁蓁。之子于归，宜其家人。**

![alt text](<DSP Chapter 4.attachments/1773557639355.PNG>)

## 章节目录

- [章节目录](#章节目录)
- [4-2 DT 系统的分类](#4-2-dt-系统的分类)
  - [4-2-1 线性系统 Linear System](#4-2-1-线性系统-linear-system)
  - [4-2-2 时不变系统 Shift-invariant System](#4-2-2-时不变系统-shift-invariant-system)
  - [4-2-3 因果系统 Causal System](#4-2-3-因果系统-causal-system)
  - [4-2-4 稳定系统 Stable System](#4-2-4-稳定系统-stable-system)
  - [4-2-5 无源系统与无损系统 Passive and Lossless System](#4-2-5-无源系统与无损系统-passive-and-lossless-system)
- [4-3 冲激响应与阶跃响应 Impulse and Step Responses](#4-3-冲激响应与阶跃响应-impulse-and-step-responses)
  - [4-3-1 定义](#4-3-1-定义)
- [4-4 LTI 离散系统的时域特性](#4-4-lti-离散系统的时域特性)
  - [4-4-1 离散信号通过 LTI 离散系统：卷积和](#4-4-1-离散信号通过-lti-离散系统卷积和)
  - [4-4-2 卷积和的运算性质](#4-4-2-卷积和的运算性质)
  - [4-4-3 LTI 系统中的稳定性与因果性](#4-4-3-lti-系统中的稳定性与因果性)
- [4-5 LTI 系统互联](#4-5-lti-系统互联)
  - [4-5-1 串联 Cascade Connection](#4-5-1-串联-cascade-connection)
  - [4-5-2 并联 Parallel Connection](#4-5-2-并联-parallel-connection)
- [4-6 有限维 LTI 离散系统 Finite-dimensional LTI-DT System](#4-6-有限维-lti-离散系统-finite-dimensional-lti-dt-system)
  - [4-6-1 有限维 LTI 离散系统](#4-6-1-有限维-lti-离散系统)
  - [4-6-2 \* 初始状态和响应计算](#4-6-2--初始状态和响应计算)
- [4-7 LTI-DT 系统分类](#4-7-lti-dt-系统分类)
  - [4-7-1 基于序列长度](#4-7-1-基于序列长度)
  - [4-7-2 基于输出计算方式](#4-7-2-基于输出计算方式)
- [4-8 LTI-DT 系统的频域表示](#4-8-lti-dt-系统的频域表示)
  - [4-8-1 频率响应 Frequency Response](#4-8-1-频率响应-frequency-response)
  - [4-8-2 通过卷积定理得到频率响应](#4-8-2-通过卷积定理得到频率响应)
  - [4-8-3 FIR 和 IIR 的频率响应](#4-8-3-fir-和-iir-的频率响应)
  - [4-8-5 稳态和瞬态响应  Steady-state and Transient Response](#4-8-5-稳态和瞬态响应--steady-state-and-transient-response)
  - [4-8-7 滤波 Filtering](#4-8-7-滤波-filtering)
- [4-9 相位延迟和群延迟 Phase Delay and Group Delay](#4-9-相位延迟和群延迟-phase-delay-and-group-delay)
  - [4-9-1 相位延迟](#4-9-1-相位延迟)
  - [4-9-2 群延迟 Group Delay](#4-9-2-群延迟-group-delay)
  - [4-9-3 延迟均衡器](#4-9-3-延迟均衡器)





## 4-2 DT 系统的分类

我们可以通过系统的性质，将 DT 系统简单分为以下几类：

- Linear System 线性系统
- Shift-invariant System 时不变系统
- Causal System 因果系统
- Stable System 稳定系统
- Passive and Lossless System 无源系统与无损系统

在本章节接下来的定义中，我们默认：

$$
x[n] \xrightarrow{H} y[n]
$$

，即 $y[n]$ 为 $x[n]$ 通过系统 $H$ 的**响应 Response**。

---

### 4-2-1 线性系统 Linear System

#### 定义

对于一个系统 $H$ ，如果有：

$$
\forall \alpha, \beta \in \mathbb{C}, \quad
x[n] = \alpha x_1[n] + \beta x_2[n] \xrightarrow{H} y[n] = \alpha y_1[n] + \beta y_2[n]
$$

，即对于所有可能的常数 $\alpha, \beta$ 以及任意输入信号都满足**叠加性质 Superposition Property**，我们就称这个系统为线性系统。

上述定义展示了线性系统的两者性质，分别为：

- 其次性 / 比例性
- 可加性

---

### 4-2-2 时不变系统 Shift-invariant System

#### 定义

对于一个系统 $H$ ，如果任意输入信号满足：

$$
\forall n_0 \in \mathbb{Z}, \quad
x[n] = x_1[n - n_0] \xrightarrow{H} y[n] = y[n-n_0]
$$

，则我们称这个系统为时不变系统。

---

### 4-2-3 因果系统 Causal System

#### 1. 定义

第 $n_0$ 个输出样本 $y[n_0]$ 只依赖于输入样本中满足 $n\le n_0$ 的部分，而不依赖于 $n>n_0$ 的未来输入，则称系统为因果系统。

即当前输出只能由现在和过去的输入决定，不能受到未来输入的影响。

> [!NOTE]
> 在某些教材中，因果系统也被称为**物理可实现系统 Physical Practical System**。
>
> 这个名字应该比因果好理解一点，因果性这个翻译还是太哲学了。

#### 2. 等价表述

对于一个 **输入和输出具有相同采样率的** 因果系统，如果两个输入信号满足：

$$
\forall n \lt N, \quad u_1[n] = u_2[n]
$$

则其对应输出也必然满足


$$
\forall n \lt N, \quad y_1[n] = y_2[n]
$$

。即如果两个输入在某个时刻之前完全一样，那么在那个时刻之前，输出也必须完全一样。

> [!TIP]
> **强调输入和输出是相同采样率的原因**
> 因为这里默认输入序列和输出序列都能用同一个离散索引 $n$ 直接一一对应比较。如果系统有抽取、插值、变采样率，输入输出的索引关系就不再这么简单了，此时这个写法就不够直接。
> 
> 比如：
> - 输入采样率是 $F_s$ 
> - 输出采样率是 $2F_s$
> 
> 那输入和输出的“同一个 $n$”就不再表示同一个物理时间点。


---

### 4-2-4 稳定系统 Stable System

#### 1. 定义

如果且仅如果一个系统 $H$ 对于每一个有界 Bounded 输入，输出也有界，则系统称为稳定系统。这种稳定性通常称为 BIBO (Bounded Input Bounded Output) 稳定性。

#### 2. 性质

对于一个 BIBO 稳定系统，

$$
\forall n \in \mathbb{Z}, \quad \exists B_y \in \mathbb{R}^+ \quad \text{s.t.} \quad \forall n \in \mathbb{Z}, \quad |y[n]| \le B_y
$$



即，只要输入有界，就能找到某个有限的输出界。

> [!TIP]
> 对性质的理解
> 
> 第一，输入只要求“幅值不超过某个有限数”，不要求能量有限。
> 比如 $x[n] = 1$ ，
> 
> 它不是有限能量信号，但它是有界信号。
>
> 第二，输出的界 $B_y$ 不一定等于输入的界 $B_x$，也不一定固定不变。

---

### 4-2-5 无源系统与无损系统 Passive and Lossless System

#### 1. 无源系统

如果对每一个有限能量输入序列 $x[n]$，输出序列 $y[n]$ 的能量 **至多** 与输入相同，即

$$
\sum_{n = -\infty}^\infty |y[n]|^2 \le \sum_{n = -\infty}^\infty |x[n]|^2 \lt \infty
$$

，那么这个离散时间系统称为**无源系统 Passive System**。


#### 2. 无损系统

如果上式对每一个输入都以等号成立，即

$$
\sum_{n = -\infty}^\infty |y[n]|^2 = \sum_{n = -\infty}^\infty |x[n]|^2 
$$

那么该离散时间系统称为无损系统 Lossless System。


> [!TIP]
> 这里讨论的是能量，不是幅值。
>
> 讨论这两个性质时，只需要按照定义考虑输入和输出的能量即可。

#### 3. 工程意义

无源性和无损性这两个性质，对于设计那些对滤波器系数变化不敏感的离散时间系统来说是非常重要的。

在数字滤波器实现中，滤波器系数通常会有：

- 量化误差
- 舍入误差
- 有限字长误差
- 硬件实现偏差

如果一个系统具有无源性或无损性，那么它通常在数值实现上更“稳健”，不容易因为系数稍微变化就导致：

- 输出能量异常增大
- 数值发散
- 对误差极其敏感

所以这类性质在数字滤波器、格型滤波器、正交变换结构等设计里很重要。



## 4-3 冲激响应与阶跃响应 Impulse and Step Responses

### 4-3-1 定义

数字系统对单位样本序列 $\{\delta[n]\}$ 的响应称为**单位样本响应** Unit Sample Response，也简称为**冲激响应** Impulse response，记作 $\{h[n]\}$。

离散时间系统对单位阶跃序列 $\{\mu[n]\}$ 的响应，记作 $\{s[n]\}$，称为它的**单位阶跃响应** Unit Step Response，也简称为**阶跃响应** Step Response。

一个**线性时不变数字系统** Linear Time-Invariant Digital System, LTI system 在时域中可以被其**冲激响应**或其**阶跃响应**完全表征。


## 4-4 LTI 离散系统的时域特性

### 4-4-1 离散信号通过 LTI 离散系统：卷积和

通过前面的学习，我们已经知道一个离散序列 $x[n]$ 可以被表示成一个冲激串的加权和，即

$$
x[n] = \sum_{k = -\infty}^{\infty} x[k] \delta[n-k]
$$

而对于一个 LTI 系统，对每个单独的加权冲激函数，**将 $x[k]$ 看作系数**，通过其线性性有

$$
\delta[n-k] \xrightarrow{H} h[n-k], \quad x[k]\delta[n-k] \xrightarrow{H} x[k] h[n-k]
$$

又因为其遵循线性性的可加性，因此可以得到：

$$
x[n] = \sum_{k = -\infty}^{\infty} x[k] \delta[n-k] \xrightarrow{H} y[n] = \sum_{k = -\infty}^{\infty} x[k] h[n-k]
$$

我们将 $\sum_{k = -\infty}^{\infty} x[k] h[n-k]$ 称为**卷积和 Convolution Sum** 。

通常简写为

> [!IMPORTANT]
> $$y[n] = x[n] * h[n]$$

通过以上的数学推导，我们证明了一个信号通过 LTI 系统的输出信号即为原始信号与该系统冲激响应的卷积和。

> 卷积的具体计算在这里不讨论，相信大伙都会了

---

### 4-4-2 卷积和的运算性质

#### 1. 交换律 Commutative Property

$$
y[n] = x[n] * h[n] = h[n] * x[n]
$$

#### 2. 结合律 Associative Property

$$
x[n] * h_1[n] * h_2[n]
=
\bigl(x[n] * h_1[n]\bigr) * h_2[n]
=
x[n] * \bigl(h_1[n] * h_2[n]\bigr)

$$

#### 3. 分配律 Distributive Property

$$
x[n] * \bigl(h_1[n] + h_2[n]\bigr)
=
x[n] * h_1[n] + x[n] * h_2[n]
$$


---

### 4-4-3 LTI 系统中的稳定性与因果性

#### 1. 稳定性

一个 LTI 系统具有 BIBO 稳定性，当且仅当它的冲激响应绝对可和，即

$$
\sum_{n = -\infty}^{\infty} |h[n]| \lt \infty
$$

#### 2. 因果性

一个 LTI 系统具有因果性，当且仅当它的冲激响应在负时间全部为 0 ，即

$$
\forall n \lt 0, \quad h[n] = 0
$$

## 4-5 LTI 系统互联

### 4-5-1 串联 Cascade Connection

假设两系统串联连接，过程可表示为：

$$
x[n] \xrightarrow{H_1} w[n] \xrightarrow{H_2} y[n]
$$

其响应为：

$$
w[n] = x[n] * h_1[n]
$$

$$
y[n] = w[n] * h_2[n]
$$

$$
\Downarrow
$$

$$
y[n] = (x[n] * h_1[n]) * h_2[n] =x[n] * (h_1[n] * h_2[n])
$$

> [!IMPORTANT]
> 可以得到所以串联系统的冲激响应表达式
> $$h_{cascade}[n] = h_1[n] * h_2[n]$$


---

### 4-5-2 并联 Parallel Connection

假设两系统并联连接，过程可表示为：

$$
x[n] \xrightarrow{H_1} y_1[n], \quad x[n] \xrightarrow{H_2} y_2[n]
$$

$$
y[n] = y_1[n] + y_2[n]
$$

带入，可得总输出为

$$
\begin{aligned}
y[n] &= y_1[n] + y_2[n] \\
&= x[n] * h_1[n] + x[n] * h_2[n] \\
&= x[n] * (h_1[n] + h_2[n])
\end{aligned}
$$

> [!IMPORTANT]
> 可以得到所以并联系统的冲激响应表达式
> $$h_{parallel}[n] = h_1[n] + h_2[n]$$


## 4-6 有限维 LTI 离散系统 Finite-dimensional LTI-DT System

### 4-6-1 有限维 LTI 离散系统

> [!TIP]
> 如果你学过 Markov 链，应该很容易理解这一节。虽然一个是描述概率和状态，一个是描述输入和输出，但它们都可以把“当前时刻的未来演化”写成只依赖“当前状态”的形式。

#### 1. 定义

先看一般的 LTI 卷积：

$$
y[n] = \sum_{k = -\infty}^{\infty} x[k] h[n-k]
$$

不难发现，如果我们要计算 $n$ 时刻的输出 $y[n]$ ，我们必须知道输入信号的 **无限个** 过去输入。用不严谨的数学语言描述，即需要 $x[- \infty]$ 到 $x[n]$ 的所有信息。

而对于有限维 LTI 离散系统，我们不需要无限个过去样本。

**即当前输出以及若干个过去输出，与当前输入以及若干个过去输入之间满足一个有限项关系。**

> [!IMPORTANT]
> 用系数线性差分方程描述有限维 LTI 离散系统：
> $$\sum^N_{k = 0} d_k y[n-k] = \sum^M_{k = 0} p_k x[n]$$

**系统阶数 System Order**： $MAX(N, M)$ ，意思是系统所涉及的最大延时深度由输出端延时阶数 $N$ 和输入端延时阶数 $M$ 中较大的那个决定。

#### 2. 数学处理

我们假设该系统一定因果，且 $d_0 \not ={0}$ ，可将差分方程改写为递推：

$$
y[n]= -\sum_{k=1}^{N}\frac{d_{k}}{d_{0}} y[n-k]+\sum_{k=0}^{M}\frac{p_{k}}{d_{0}} x[n-k]
$$



这个式子只用了：

- 当前输入 $x[n]$
- 过去输入 $x[n-1],x[n-2],\dots$
- 过去输出 $y[n-1],y[n-2],\dots$

没有出现未来项，比如 $x[n+1]$ 或 $y[n+1]$，所以它是因果的。

---

> [!CAUTION]
> 以下内容在 PPT 中标注为自学 Self-Study
> 
> 我的意思是，我也没学会

### 4-6-2 * 初始状态和响应计算

#### 1. 总解

系统输出可以写成

$$
y[n] = y_c[n] + y_p[n]
$$

其中：

- $y[n]$：**总解**（total solution）
- $y_c[n]$：**补充解**（complementary solution），也常称为**齐次解**
- $y_p[n]$：**特解**（particular solution）

##### 含义说明

- $y_c[n]$ 是在输入取零时，即
  $$
  x[n] = 0
  $$
  对应差分方程的解，因此反映的是系统自身的自然演化行为。

- $y_p[n]$ 是在输入
  $$
  x[n] \neq 0
  $$
  时，由外部输入激励产生的那部分响应。

因此，总输出可以理解为：

> 系统内部固有响应 + 外部输入引起的响应



#### 2. 零输入响应与零状态响应

系统输出也可以写成

$$
y[n] = y_{zi}[n] + y_{zs}[n]
$$

其中：

- $y_{zi}[n]$：**零输入响应**（zero-input response）
- $y_{zs}[n]$：**零状态响应**（zero-state response）

##### 零输入响应（Zero-Input Response）

零输入响应是通过令输入为零得到的，即

$$
x[n] = 0
$$

但此时系统的**初始条件不一定为零**。  
因此，零输入响应描述的是：

> 即使没有外部输入，系统由于初始储能或初始状态而产生的输出。


##### 零状态响应（Zero-State Response）

零状态响应是指在给定输入 $x[n]$ 的情况下，令所有初始条件都为零时得到的响应。

也就是说，系统初始时没有任何内部存储能量或历史状态，输出完全由输入激发产生。

因此，零状态响应描述的是：

> 在零初始条件下，外部输入单独引起的输出。


#### 3. 两种分解的关系

从数学求解角度，输出可写为

$$
y[n] = y_c[n] + y_p[n]
$$

从系统响应来源角度，输出也可写为

$$
y[n] = y_{zi}[n] + y_{zs}[n]
$$

这两种分解的关注点不同：

- **补充解 / 特解**：强调差分方程的数学结构
- **零输入响应 / 零状态响应**：强调系统输出的物理来源

在常系数线性系统中，通常可以将它们对应理解为：

$$
y_c[n] \leftrightarrow y_{zi}[n]
$$

$$
y_p[n] \leftrightarrow y_{zs}[n]
$$

但严格来说，它们的出发点并不完全相同。


## 4-7 LTI-DT 系统分类

### 4-7-1 基于序列长度

- 如果系统的冲激响应 $h[n]$ 是**有限长度**的，则称该系统为**有限冲激响应系统** Finite Impulse Response, **FIR** system。

- 如果系统的冲激响应 $h[n]$ 是**无限长度**的，则称该系统为**无限冲激响应系统** Infinite Impulse Response, **IIR** system 。


### 4-7-2 基于输出计算方式


- 如果系统的输出只需要由**当前输入和过去输入**来计算，则称该系统为**非递归系统** Nonrecursive System。

- 如果系统的输出计算除了依赖输入之外，还依赖于**过去输出**，则称该系统为**递归系统** Recursive System。



## 4-8 LTI-DT 系统的频域表示

### 4-8-1 频率响应 Frequency Response

#### 1. 定义

从前面，我们知道系统的时域表达式：

$$
y[n] = \sum_{k = -\infty}^{\infty} x[k] h[n-k]
$$

如果想从频域的角度分析 LTI 系统，那么只需要分析 **系统对每个频率的响应** 即可。

因此，我们令 $x[n]$ 在每一个时刻仅有仅有单一频率，即

$$
x[n] = e^{j \omega n} = \cos (\omega n) + j \sin (\omega n) \quad n \in \mathbb{Z}
$$

，带入卷积式得到：

$$
\begin{aligned}
y[n] &= \sum_{k = -\infty}^{\infty} x[n-k] h[k] \\
&= \sum_{k = -\infty}^{\infty} h[k] e^{j \omega (n-k)} \\
&= (\sum_{k = -\infty}^{\infty} h[k] e^{-j \omega k})e^{j \omega n} \\

\end{aligned}
$$

> [!IMPORTANT]
> 我们定义：
> $$H(e^{j \omega}) = \sum_{k = -\infty}^{\infty} h[k] e^{-j \omega k}$$
> 这里的 $H(e^{j \omega})$ 被称作该系统的 **频率响应 Frequency Response**。
>
> 
> 则原式可写为
> $$y[n] = H(e^{j \omega})e^{j \omega n}$$
> 其中 $e^{j\omega n}$ 是 LTI 系统的 **特征函数 Eigen Function**。
> 
> 定义：当特征函数作用于一个LTI系统时，其输出信号与输入信号保持相同的函数形式，仅在幅度和相位上发生一个常数倍的变化


系统的频率响应也可以通过对 $h[n]$ 做 DTFT 得到：

$$
h[n] \xleftrightarrow{DTFT} H(e^{j \omega})
$$

。

#### 2. 性质与意义

- **幅度和相位** 

通过观察定义式

$$y[n] = H(e^{j \omega})e^{j \omega n}$$


如果对频率响应函数做极坐标分解，我们可以发现：

$$
\theta (\omega) = \arg \{ H(e^{j \omega}) \} \\
H(e^{j \omega}) = |H(e^{j \omega})| e^{j \theta (\omega)} \\
y[n] = |H(e^{j \omega})| e^{j (\theta (\omega)+ \omega n)}
$$

> [!IMPORTANT]
> 我们将 $|H(e^{j \omega})|$ 称为这个系统的 **幅频响应 Magnitude Response**。表示系统对频率 $\omega$ 的分量，幅度放大或缩小多少。
>
> 相应地， $\theta (\omega) = \arg \{ H(e^{j \omega}) \}$ 被称为 **相位响应 Phase Response**。表示系统对频率 $\omega$ 的分量，引入多少相位偏移。


也就是说：

系统不会改变输入复指数的频率，只会改变它的幅度和相位。

或者说，当一个频率分量通过 LTI-DT 系统时，其频率没有发生任何变化，对每个频率分量独立作用。


- **周期性**

$$
H(e^{j (\omega + 2\pi)})
= H(e^{j \omega})
$$

显然，频率响应函数以 $2\pi$ 为周期，这也再次证明了 DTFT 的周期性。

相似地，频率响应也通常只看一个主值区间，如 $[-\pi, \pi)$ 或者 $[0, 2\pi)$ 。


#### 3. 增益函数 Gain Function 和 dB 表示

我们定义：

$$
\text{增益函数 Gain} \quad 
G( \omega) = 20 \log_{10} |H(e^{j \omega})| \quad \text{(dB)}
$$

- 若 $G(\omega)>0$，说明该频率被放大
- 若 $G(\omega)<0$，说明该频率被衰减
- 若 $G(\omega)=0$，说明该频率幅度不变

$$
\text{衰减 / 损耗函数 Attenuation / Loss} \quad a(\omega) = -G(\omega) \quad \text{(dB)}
$$

> [!TIP]
> 通常，对于比值取对数，我们对功率比有10的系数，幅度比则有20的系数。
>
> 它们的2倍差值来自于功率其实是幅度的平方项，在取对数后平方被移到了系数的位置。
> 
> 这里增益函数因为是对幅度比取对数系数20。
> 
> 如果是功率比才常写成 $10\log_{10}(\cdot)$。

> [!NOTE]
> 另一种表示增益函数的公式：
> $$G( \omega) = 20 \log_{10} |\frac{H(e^{j \omega})}{H(e^{j \omega_0})}| \quad \text{(dBC)}$$
>
> 这里表示：
> 
> **用某个参考频率 $\omega_0$ 的响应幅度作为基准，再比较其它频率相对它差多少 dB。**
>
> 其中 dBC 常理解为“相对于载波 Carrier”或某个参考分量的分贝值，这在通信和频谱分析里特别常见。

#### 4. 实系统的对称性结论

| 类别 | 结论 | 数学表达 |
|---|---|---|
| 条件 | 若系统的冲激响应 $h[n]$ 为实数序列 | $h[n] \in \mathbb{R}$ |
| 幅度响应 | 幅度是偶函数 | $\lvert H(e^{-j\omega}) \rvert = \lvert H(e^{j\omega}) \rvert$ |
| 实部 | 实部是偶函数 | $H_{re}(e^{-j\omega}) = H_{re}(e^{j\omega})$ |
| 相位响应 | 相位是奇函数 | $\theta(-\omega) = -\theta(\omega)$ |
| 虚部 | 虚部是奇函数 | $H_{im}(e^{-j\omega}) = -H_{im}(e^{j\omega})$ |
| 根本原因 | 实序列的 DTFT 满足共轭对称 | $H(e^{-j\omega}) = H^*(e^{j\omega})$ |

---

### 4-8-2 通过卷积定理得到频率响应

卷积定理：

$$
y[n] = x[n] * h[n] \xleftrightarrow{DTFT} Y(e^{j \omega}) = X(e^{j \omega}) H(e^{j \omega})
$$

通过卷积定理，我们可以轻松得到频率响应，如：

$$
H(e^{j \omega}) = \frac{Y(e^{j \omega})}{X(e^{j \omega})}
$$

这一解法与 CT 信号类似。

---

### 4-8-3 FIR 和 IIR 的频率响应

#### 1. FIR 系统响应

由于 FIR 系统的序列长度有限，因此其频率响应可以被写成一个有限项求和：

$$
H(e^{j \omega}) = \sum_{n = N_1}^{N_2} h[n] e^{-j \omega n}
$$

FIR 的频率响应本质上是一个关于 $e^{-j\omega}$ 的有限多项式。

#### 2. IIR 系统响应

IIR 系统频率响应可以被写作：

$$ H\left(e^{j \omega}\right)=\frac{Y\left(e^{j \omega}\right)}{X\left(e^{j \omega}\right)}=\frac{\sum_{k=0}^{M} p_{k} e^{-j \omega k}}{\sum_{k=0}^{N} d_{k} e^{-j \omega k}} $$



因为 IIR 系统通常由差分方程描述：

$$ \sum_{k=0}^{N} d_{k}y[n-k]=\sum_{k=0}^{M} p_{k}x[n-k] $$

对它取 DTFT，就会得到：

$$ \left(\sum_{k=0}^{N} d_{k} e^{-j \omega k}\right) Y\left(e^{j \omega}\right)=\left(\sum_{k=0}^{M} p_{k} e^{-j \omega k}\right) X\left(e^{j \omega}\right) $$

于是：

$$ H\left(e^{j \omega}\right)=\frac{Y\left(e^{j \omega}\right)}{X\left(e^{j \omega}\right)}=\frac{\sum_{k=0}^{M} p_{k} e^{-j \omega k}}{\sum_{k=0}^{N} d_{k} e^{-j \omega k}} $$

所以：

- FIR：频率响应是有限和
- IIR：频率响应通常是一个比值，分子分母是关于 $e^{-j\omega}$ 的多项式

---

### 4-8-5 稳态和瞬态响应  Steady-state and Transient Response

对于一个离散时间周期信号 $x[n]$，可以先将其表示为傅里叶级数形式：

$$
x[n] = \sum_{l=-\infty}^{\infty} a_l e^{j l \omega_0 n}
$$

其中：

- $\omega_0$ 是基波角频率
- $l\omega_0$ 是第 $l$ 个谐波角频率
- $a_l$ 是第 $l$ 个频率分量对应的傅里叶级数系数

#### 1. LTI 系统对周期输入的响应

对于冲激响应为 $h[n]$ 的 LTI 系统，其输出满足卷积和：

$$
y[n] = \sum_{k=-\infty}^{\infty} h[k]\,x[n-k]
$$

将周期输入的傅里叶级数展开代入上式：

$$
y[n]
= \sum_{k=-\infty}^{\infty} h[k] \sum_{l=-\infty}^{\infty} a_l e^{j l \omega_0 (n-k)}
$$

交换求和次序，可得：

$$
y[n]
= \sum_{l=-\infty}^{\infty} a_l \sum_{k=-\infty}^{\infty} h[k] e^{-j l \omega_0 k} e^{j l \omega_0 n}
$$

由频率响应定义：

$$
H\left(e^{j l \omega_0}\right)
=
\sum_{k=-\infty}^{\infty} h[k] e^{-j l \omega_0 k}
$$

因此输出可写成：

$$
y[n]
=
\sum_{l=-\infty}^{\infty}
a_l H\left(e^{j l \omega_0}\right)e^{j l \omega_0 n}
$$

> [!NOTE]
> 
>这说明：对于输入信号 $x[n]$ 中的**每一个频率分量**
>
>$$
>a_l e^{j l \omega_0 n}
>$$
>
>LTI 系统的输出仍然是**同频率**的复指数信号，只是被乘上了一个复常数
>
>$$
>H\left(e^{j l \omega_0}\right)
>$$
>
>也就是说，系统对每个谐波分量只做两件事：
>
> - 改变幅度
> - 改变相位
>
>而**不会改变该分量的频率本身**。

#### 2. 稳态响应 Steady-state Response


对于周期输入，系统输出中由各个频率分量稳定叠加而成的这一部分，通常称为**稳态响应**  Steady-state Response。

其表达式为：

$$
y_{ss}[n]
=
\sum_{l=-\infty}^{\infty}
a_l H\left(e^{j l \omega_0}\right)e^{j l \omega_0 n}
$$

即，

周期输入经过 LTI 系统后，输出仍然由同一组谐波频率构成，只是每个谐波的幅度和相位都被系统频率响应修改了。


#### 3. 瞬态响应 Transient Response


定义：

$$
H_n\left(e^{j\omega}\right)
=
\sum_{k=-\infty}^{n} h[k] e^{-j\omega k}
$$

它称为系统的**瞬态频率响应** Transient  Frequency Response。


作为对比，普通频率响应为：

$$
H\left(e^{j\omega}\right)
=
\sum_{k=-\infty}^{\infty} h[k] e^{-j\omega k}
$$

而瞬态频率响应只累加到 $k=n$，因此它反映的是：

> 在时刻 $n$ 之前，系统冲激响应已经“积累”到的那一部分频域作用。

也就是说：

- $H(e^{j\omega})$ 描述系统完整的长期频域特性
- $H_n(e^{j\omega})$ 描述系统在有限时刻 $n$ 下尚未完全进入稳态时的频域特性


---

### 4-8-7 滤波 Filtering

#### 1. 数字滤波器 Digital Filter


LTI-DT 系统的一个重要应用，是：

- **让某些频率分量通过**
- **抑制或阻止另外一些频率分量通过**

这样的系统称为**数字滤波器** Digital filter。

从频域角度看，滤波器的作用本质上就是：

> 对不同频率分量给予不同的响应。

如果某个频率处的幅度响应较大，则该频率成分可以较好地通过系统；  
如果某个频率处的幅度响应很小，则该频率成分会被显著衰减。


#### 2. 滤波原理

滤波理论的关键基础是 DTFT 的反变换公式：

$$
x[n]
=
\frac{1}{2\pi}
\int_{-\pi}^{\pi}
X(e^{j\omega})e^{j\omega n}\,d\omega
$$

这个公式表明：

> 任意离散时间输入信号 $x[n]$ 都可以表示为无穷多个复指数信号 $e^{j\omega n}$ 的线性加权和。

由于复指数信号也可对应理解为正弦/余弦频率分量，因此任意信号都可以从频域上看成许多不同频率成分的叠加。


> 只要适当设计系统的频率响应，特别是其幅度响应
> $$
> \lvert H(e^{j\omega}) \rvert
> $$
> ，就可以对输入中的不同频率成分进行有选择的保留或压制。

例如：

- 若在某个频率 $\omega_1$ 处有
  $$
  \lvert H(e^{j\omega_1}) \rvert \approx 1
  $$
  则该频率分量基本通过

- 若在某个频率 $\omega_2$ 处有
  $$
  \lvert H(e^{j\omega_2}) \rvert \approx 0
  $$
  则该频率分量被强烈衰减甚至滤除

因此，滤波的本质就是：

> **通过设计系统对不同频率的增益，来实现对频率成分的选择性保留或抑制。**

## 4-9 相位延迟和群延迟 Phase Delay and Group Delay

### 4-9-1 相位延迟

假设一个单音正弦信号 $x[n] = A\cos\left(\omega_0 n + \phi\right)$ 通过一个离散系统 $H$ ，即：

$$

x[n] = A\cos\left(\omega_0 n + \phi\right) = \frac{A}{2} \left( e^{j\phi} e^{j\omega_0 n} + e^{-j\phi} e^{-j\omega_0 n} \right )

$$

求其响应信号：

$$
\begin{aligned}
y[n] &= \frac{A}{2} \left\{ e^{j\phi} H\left(e^{j\omega_0}\right) e^{j\omega_0 n} + e^{-j\phi} H\left(e^{-j\omega_0}\right) e^{-j\omega_0 n} \right\} \\
&= \frac{A}{2} \left| H\left(e^{j\omega_0}\right) \right| \left\{ e^{j\phi} e^{j\theta(\omega_0)} e^{j\omega_0 n} + e^{-j\phi} e^{-j\theta(\omega_0)} e^{-j\omega_0 n} \right\} \\
&= A \left| H\left(e^{j\omega_0}\right) \right| \cos\left(\omega_0 n + \phi + \theta(\omega_0) \right)
\end{aligned}
$$

输出信号与输入信号的频率 $\omega_0$ 相同，幅度被缩放 $H$ 倍，并且在时间序列上产生了一个相位偏移​ $\theta(\omega)$ 。

> [!IMPORTANT]
> 我们定义频率 $\omega_0$ 上的相位延迟：
>
> $$\tau_p (\omega) = - \frac{\theta(\omega_0)}{\omega_0}$$
>
> 其意义为：对频率为 $\omega_0$ 的纯正弦波，系统看起来像是把它延迟了 $\tau_p(\omega_0)$ 个采样。

---

### 4-9-2 群延迟 Group Delay

假设一个调制后的信号：

$$
x[n] = A \cos(\omega_0 n) \cos (\omega_c n)
$$

，如果 $\omega_c \gg \omega_0$ ，即消息信号带宽远小于载波频率，我们称其为一个**窄带信号 Narrowband Signal**。

当这个窄带信号通过 $H$ 时，通过数学处理，可以近似得到：

$$
y[n] \approx A\left|H\left(e^{j \omega_{c}}\right)\right| \cos \left(\omega_{0}\left(n-\tau_{g}\right)\right) \cos \left(\omega_{c}\left(n-\tau_{p}\right)\right)
$$

> [!IMPORTANT]
> 此时我们定义群延迟：
> $$
> \tau_g = -\left.\frac{d\theta}{d\omega}\right|_{\omega=\omega_c}
> $$
>
> 其意义为：频率附近一小段窄带频谱整体移动了多少，也就是包络延迟了多少。

![alt text](<DSP Chapter 4.attachments/1773557129864.png>)


![alt text](<DSP Chapter 4.attachments/1773557174847.png>)


> [!NOTE] 为什么群延迟是相位对频率的导数
> 因为窄带信号不是一个频率，而是一簇靠近 $\omega_c$ 的频率。
> 
> 如果系统相位响应在 $\omega_c$ 附近可近似展开为
> 
> $$ \theta(\omega) \approx \theta(\omega_c) + (\omega - \omega_c) \theta'(\omega_c) $$
> 
> 那么这簇频率经过系统后：
> - **常数项** $\theta(\omega_c)$ 主要影响整体载波相位；
> - **斜率项** $\theta'(\omega_c)$ 决定不同频率成分之间的相对错位。
> 
> 而这些相对错位正好决定包络整体移动多少，所以就得到：
> 
> $$ \tau_g(\omega_c) = -\theta'(\omega_c) $$
> 
> 这就是群延迟的来源。

### 4-9-3 延迟均衡器

当 LTI 系统的群延迟 $\tau_g(\omega)$ 在输入信号 $x[n]$ 的带宽 $\Omega$ 内不是常数时，其重建或对应的连续时间波形 $x_c(t)$ 将发生失真。为纠正此失真，通常将一个**延迟均衡器**（其相位响应与主系统互补）与原始 LTI 系统级联使用。


