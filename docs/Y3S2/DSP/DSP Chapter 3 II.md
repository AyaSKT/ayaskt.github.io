# 3 Discrete-Time Signals in the Frequency Domain Part II

**有些错误无法犯两次，有些事绝对不会无趣。**

![alt text](<DSP Chapter 3 II.attachments/1773557978013.PNG>)

## 章节目录


- [章节目录](#章节目录)
- [3-8 CT 信号的数字处理](#3-8-ct-信号的数字处理)
  - [3-8-1 采样的频域效应](#3-8-1-采样的频域效应)
  - [3-8-2 采样定理 Sampling Theorem](#3-8-2-采样定理-sampling-theorem)
  - [3-8-3 模拟信号的恢复 Recovery](#3-8-3-模拟信号的恢复-recovery)
  - [3-8-4 采样混叠的过程](#3-8-4-采样混叠的过程)
- [3-9 带通信号的采样](#3-9-带通信号的采样)
  - [3-9-1 低通与带通](#3-9-1-低通与带通)
  - [3-9-2 带通采样](#3-9-2-带通采样)


> [!TIP]
> 在采样理论中通常用 $\Omega$ 表示**连续时间角频率**（单位 rad/s），而用 $\omega$ 表示**离散时间角频率**（单位 rad/sample），所以写 $G_p(j\Omega)$ 是因为它仍然是在做连续时间傅里叶变换。

## 3-8 CT 信号的数字处理

数字处理基本流程：

![alt text](<DSP Chapter 3 II.attachments/1773478847626.png>)

关键概念：

- ADC: 模数转换器
- DAC：数模转换器
- S/H：采样保持电路 Sample-and-Hold (Circuit)
- Anti-aliasing Filter：抗混叠滤波器
- Reconstruction or Interpolation Filter：重构或插值滤波器

### 3-8-1 采样的频域效应

#### 1. 理想采样与实际采样

![alt text](<DSP Chapter 3 II.attachments/1773479125660.png>)

理想采样中，采样函数 $p(t)$ 和采样后的信号 $g_p(t)$ 应当是一串冲激函数所构成的**冲激串 Impulse Train**。

其中， $p(t)$ 的表达式可写为

$$
p(t) = \sum_{n = -\infty}^\infty \delta(t - nT)
$$


![alt text](<DSP Chapter 3 II.attachments/1773479251543.png>)

在实际采样中，完美的冲激函数是无法实现的。因此实际用于采样的函数是一连串占空比 $Duty = \frac{\tau}{t}$ 的方波。


#### 2. 频域效应

当 $\tau \ll T$ 时，我们可以认为 $p(t) \approx \delta T$ ，即将实际采样近似为一个理想采样器。

接下来分别在时域和频域对处理后的信号进行分析，

我们约定 $\delta_T (t)$ 为周期为 $T$ 的冲激串；对单位冲激有 
$\delta (t) \xleftrightarrow{\text{FT}} \Delta (j \omega)$ 。

1. 时域

$$
g_p(t) = g_a(t)\delta_T(t) = \sum_{n = - \infty}^\infty g_a(nT) \delta(t - nT)
$$

直接对结果做FT，我们可以得到：

$$
g_p(t) \xleftrightarrow{\text{FT}} G_p (j \Omega) = \sum_{n = - \infty}^\infty g_a(nT)e^{-j \Omega nT}
$$

2. 频域

$$
G_p(j \Omega) = \frac{1}{2\pi} G_a(j \Omega) * \Delta_T (j \Omega) = \frac{1}{T} \sum_{k = - \infty}^\infty G_a (j(\Omega - k \Omega_T)) = \frac{1}{T} \sum_{k = - \infty}^\infty G_a (j(\Omega - k \frac{2\pi}{T}))
$$

，

其中 $\Omega_T = \frac{2\pi}{T}$ 。

> [!IMPORTANT]
> 我们可以发现，通过对采样后信号的不同处理，我们得到了两种形式的频域表达式。由傅里叶变换的唯一性可以知道，这两者是等价的。
>
> 1. 时域FT：
> $$G_p (j \Omega) = \sum_{n = - \infty}^\infty g_a(nT)e^{-j \Omega nT}$$
> 注意到这个形式与前文定义的DTFT表达式非常相似。
>
> 实际上，如果我们定义 $g[n] = g_a (nT)$ ，就可以直接得到 DTFT 的计算方程。
>
> 2. 频域相乘
> $$G_p(j \Omega) = \frac{1}{T} \sum_{k = - \infty}^\infty G_a (j(\Omega - k \frac{2\pi}{T})) $$
> 我们可以发现对一个模拟信号进行采样，实际上就是在频域上对其进行**周期化 Periodization**。
>
> 即，将原始的频谱图形每隔 $\Omega_T$ 重复一次。这解释了为什么 DTFT 后频域会是一个周期函数，也解释了采样频率太低造成的**混叠 Aliasing** 现象。


通过上面的分析，我们可以得出：

$$
\text{时域离散化 Discretization} \xLeftrightarrow{} \text{频域周期化 Periodization}
$$

。

> [!NOTE]
> **证明二者等价：泊松求和公式**
> 
>（这不是课内内容，肯定不会考，但是这个公式非常优雅）
>
> 
>
> **泊松求和简介**
>
> 若连续时间信号 $x(t)$ 的傅里叶变换为 $X(j\Omega)$，则泊松求和公式可写为
>
> $$
> \sum_{n=-\infty}^{\infty} x(nT)e^{-j\Omega nT}
> =
> \frac{1}{T}\sum_{k=-\infty}^{\infty} X\!\big(j(\Omega-k\Omega_s)\big)
> $$
>
> 其中
> $
> \Omega_s=\frac{2\pi}{T}
> $
>  是采样角频率。
> 
> 理想采样可写成
>
> $$
> g_p(t)=g_a(t)\sum_{n=-\infty}^{\infty}\delta(t-nT)
> =\sum_{n=-\infty}^{\infty} g_a(nT)\,\delta(t-nT)
> $$
>
> 对它作连续时间傅里叶变换，可得
>
> $$
> G_p(j\Omega)=\sum_{n=-\infty}^{\infty} g_a(nT)e^{-j\Omega nT}
> $$
>
> 而根据**泊松求和公式**，有
>
> $$
> \sum_{n=-\infty}^{\infty} g_a(nT)e^{-j\Omega nT}
> =
> \frac{1}{T}\sum_{k=-\infty}^{\infty} G_a\!\big(j(\Omega-k\Omega_s)\big)
> $$
>
> 这说明：  
> **时域中的等间隔采样，会导致频域中的频谱以 $\Omega_s$ 为间隔周期性复制，并且幅度缩放为原来的 $1/T$。**
>
> 因此采样后的频谱可写成
>
> $$
> G_p(j\Omega)=\frac{1}{T}\sum_{k=-\infty}^{\infty} G_a\!\big(j(\Omega-k\Omega_s)\big)
> $$
>
> 这就是课件中“time-domain discretization $\Longleftrightarrow$ frequency-domain periodization”的本质。
>
>
> 可以把泊松求和公式理解为：  
> **“采样值指数和”** 与 **“原频谱周期复制和”** 是同一个对象的两种写法。


![alt text](<DSP Chapter 3 II.attachments/1773481283743.png>)

---

### 3-8-2 采样定理 Sampling Theorem

#### 1. 采样定理

假设一个 CT 带限信号 

$$
g_a(t) \xLeftrightarrow{FT} G_a(j \Omega),\;G_a(j\Omega) = 0\text{ for all } | \Omega | \gt \Omega_m
$$

即原信号带宽为 $\Omega_m$，则：
- 当

$$
\Omega_s \ge 2\Omega_m
$$

各频谱副本互不重叠，不发生混叠；

**此时原信号可以被唯一确定。**

- 而当

$$
\Omega_s < 2\Omega_m
$$

相邻副本发生重叠，产生混叠。

> [!IMPORTANT]
> 采样定理：一个带限连续时间信号，在采样频率足够高时，可以由它的离散样本完全恢复出来。

#### 2. 相关术语

- **奈奎斯特条件 Nyquist Condition**：$\Omega_s \ge 2 \Omega_m$ ，避免混叠并实现恢复的条件。
- **折叠频率 Folding Frequency**：$\frac{\Omega_s}{2}$ ，即在当前采样频率下最高的不会发生混叠的频率。
- **奈奎斯特速率 Nyquist Rate**： $2 \Omega_m$ ，即重建信号所需的最小采样速率。
- **奈奎斯特频率 Nyquist Frequency**： $\Omega$ ，即信号的带宽。

> [!WARNING]
> 在ppt里，奈奎斯特频率被标注为原信号的带宽。但有些教材/资料中将奈奎斯特频率等价于折叠频率。
>
> 哎，这就是工科。从上学期那一堆不写底数的 $\log$ 我就知道没什么好事了。
>
> 秦始皇，你在哪里...

#### 3. 过采样 / 欠采样 / 临界采样

- **过采样 Oversampling** - 采样频率高于奈奎斯特频率；
- **欠采样 Undersampling** - 采样频率低于奈奎斯特频率；
- **临界采样 Critical Sampling** - 采样频率等于奈奎斯特频率；

> [!TIP]
> **注意**：纯正弦波从其临界采样版本可能无法恢复。

#### 4. $G(e^{j\omega})$ 和 $G_p(j \Omega)$ 的关系

现在，我们要将 DTFT 和采样 CTFT 联系起来。

如果令 $g[n] = g_a (nT)$ ，
代入后，我们得到了两个非常相似的式子：

$$
G_p(e^{j\omega}) = \sum_{n = - \infty}^\infty g_a(nT)e^{-j \omega n}
$$

$$
G_p(j \Omega) = \sum_{n = - \infty}^\infty g_a(nT)e^{-j \Omega nT}
$$

注意到，它们唯一的区别在于复指数的指数部分不同。
存在一个明显的映射关系，如果我们令 $\omega = \Omega T$ ，二者的式子将完全相同。

也就是说，$G(e^{j\omega})$ 和 $G_p(j \Omega)$ 只是在横轴上进行了坐标的缩放，二者本质上对应了同一个频谱。

> [!NOTE]
> **DTFT 的周期为 $2\pi$ 的原因**
>
> 1. 根本原因：复指数相位的周期性
> 
> DTFT 定义为
>
> $$
> X(e^{j\omega})=\sum_{n=-\infty}^{\infty}x[n]e^{-j\omega n}
> $$
>
> 由于离散时间索引 $n$ 是整数，因此
>
> $$
> e^{-j(\omega+2\pi)n}=e^{-j\omega n}e^{-j2\pi n}=e^{-j\omega n}
> $$
>
> 因为对任意整数 $n$ 都有
>
> $$
> e^{-j2\pi n}=1
> $$
>
> 所以
>
> $$
> X(e^{j(\omega+2\pi)})=X(e^{j\omega})
> $$
>
> 2. 采样视角
> 
> 也可以从采样的角度理解 DTFT 的 $2\pi$ 周期性：
> 
> 采样后连续时间频谱 $G_p(j\Omega)$ 的周期为 $\Omega_T=\frac{2\pi}{T}$，而离散频率与连续频率满足 $\omega=\Omega T$，因此当 $\Omega$ 增加一个周期 $\Omega_T$ 时，$\omega$ 恰好增加 $2\pi$，所以 $G(e^{j\omega})$ 以 $2\pi$ 为周期。
>
> 因此，DTFT 关于 $\omega$ 是一个以 $2\pi$ 为周期的函数。

---

### 3-8-3 模拟信号的恢复 Recovery

基于采样定理，我们证明了一个连续的模拟信号可以从一个恰当的 DT 信号中完全恢复。而这个重建的过程可以被等效为通过一个滤波器 $H_r (j \Omega)$ ，这个滤波器被称为**重构滤波器 Reconstruction Filter / 插值滤波器 Interpolation Filter / 平滑滤波器 Smoothing Filter** 。

上面这三个名字指的都是同一个东西。

![alt text](<DSP Chapter 3 II.attachments/1773485349864.png>)

> [!TIP]
> 如果你不理解为什么这里可以等效为一个滤波器，可以这么想：
>
> 重建前的信号是一个 DT 信号，在频域上是许多个原本的 CT 信号的频谱的周期复制。如果我们用一个低通滤波器把它的基带信号滤出来，那就可以得到原始的 CT 信号了。这里的低通滤波器就是一种重构滤波器。正如你可以用许多种低通滤波器恢复，重构滤波器也不是唯一的。

#### 重构的步骤

首先，对连续信号 $g_a(t)$ 以采样周期 $T$ 进行采样，得到离散序列：
$$
g[n] = g_a(nT)
$$

这些样值可以表示成一个冲激串信号：
$$
g_p(t)=\sum_{n=-\infty}^{\infty} g[n]\delta(t-nT)
$$

在频域中，采样会使原信号的频谱发生周期性重复。只要采样频率足够高，使这些频谱副本之间不重叠，就可以通过一个理想低通滤波器保留中间的原始频谱，并滤除其他重复谱。

因此，重构后的输出信号可以写为：
$$
\hat g_a(t)=h_r(t)*g_p(t)
$$

其中 $h_r(t)$ 是重构滤波器的冲激响应。

对于理想低通重构，时域上等价于 sinc 插值，因此有：
$$
\hat g_a(t)=\sum_{n=-\infty}^{\infty} g[n]\,
\frac{\sin\!\big(\pi (t-nT)/T\big)}{\pi (t-nT)/T}
$$

也就是说，每一个采样值 $g[n]$ 都对应一个以 $t=nT$ 为中心的 sinc 函数，所有这些 sinc 函数叠加后，就恢复出连续时间信号。

如果采样频率不满足奈奎斯特条件，频谱会发生重叠，产生混叠，此时原信号将无法被精确重构。

---

### 3-8-4 采样混叠的过程

通过一个例子说明：**不同的连续时间正弦信号，在采样后可能得到完全相同的离散时间序列**。这说明采样会带来**频率混叠**，也说明仅凭样值序列，未必能唯一确定原来的模拟信号。

#### 1. 采样和恢复

设三个连续时间信号分别为：

$$
g_1(t)=\cos(6\pi t), \qquad
g_2(t)=\cos(14\pi t), \qquad
g_3(t)=\cos(26\pi t)
$$

它们的 CTFT 分别为：
$$
G_1(j\Omega)=\pi[\delta(\Omega-6\pi)+\delta(\Omega+6\pi)]
$$
$$
G_2(j\Omega)=\pi[\delta(\Omega-14\pi)+\delta(\Omega+14\pi)]
$$
$$
G_3(j\Omega)=\pi[\delta(\Omega-26\pi)+\delta(\Omega+26\pi)]
$$

可以看出，这三个信号在连续时间频域中的频率位置是不同的，分别位于：
$$
\pm 6\pi,\quad \pm 14\pi,\quad \pm 26\pi
$$

![alt text](<DSP Chapter 3 II.attachments/1773486021067.png>)

现在取采样周期
$$
T=0.1\ \text{s}
$$

因此采样角频率为：
$$
\Omega_T=\frac{2\pi}{T}=20\pi\ \text{rad/s}
$$

采样后，频谱会以 $\Omega_T=20\pi$ 为间隔周期性重复，因此采样信号的频谱为：
$$
G_{ip}(j\Omega)=\frac{1}{T}\sum_{k=-\infty}^{\infty} G_i\big(j(\Omega-k\Omega_T)\big), \qquad i=1,2,3
$$

因为这里 $T=0.1$，所以 $\frac{1}{T}=10$，于是也可写成：
$$
G_{ip}(j\Omega)=10\sum_{k=-\infty}^{\infty} G_i\big(j(\Omega-k\Omega_T)\big)
$$

这表示：**原来的谱线会在频域中每隔 $20\pi$ 复制一次。**



对这三个信号分别采样，可得离散时间序列：

对于 $g_1(t)$：
$$
g_1[n]=g_1(nT)=\cos(6\pi nT)=\cos(6\pi n \cdot 0.1)=\cos(0.6\pi n)
$$

对于 $g_2(t)$：
$$
g_2[n]=g_2(nT)=\cos(14\pi nT)=\cos(14\pi n \cdot 0.1)=\cos(1.4\pi n)
$$

又因为
$$
1.4\pi = 2\pi - 0.6\pi
$$

而离散时间余弦满足
$$
\cos((2\pi-\omega)n)=\cos(\omega n)
$$

所以：
$$
g_2[n]=\cos(1.4\pi n)=\cos(0.6\pi n)
$$

对于 $g_3(t)$：
$$
g_3[n]=g_3(nT)=\cos(26\pi nT)=\cos(26\pi n \cdot 0.1)=\cos(2.6\pi n)
$$

又因为
$$
2.6\pi = 2\pi + 0.6\pi
$$

而离散时间余弦满足
$$
\cos((2\pi+\omega)n)=\cos(\omega n)
$$

所以：
$$
g_3[n]=\cos(2.6\pi n)=\cos(0.6\pi n)
$$

因此最终有：
$$
g_1[n]=g_2[n]=g_3[n]=\cos(0.6\pi n)
$$

![alt text](<DSP Chapter 3 II.attachments/1773486078228.png>)

这说明：

**虽然 $g_1(t)$、$g_2(t)$、$g_3(t)$ 是三个不同的连续时间信号，但在以 $T=0.1$ s 采样后，它们变成了同一个离散时间信号。**

这就是**混叠**的本质：  
连续时间中的不同频率，在采样后会折叠到同一个离散时间频率上。

#### 2. 分析

从频域角度看，这三个信号之所以会采样后等价，是因为它们的频率满足模 $\Omega_T$ 的等价关系：

$$
14\pi = 20\pi - 6\pi
$$

$$
26\pi = 20\pi + 6\pi
$$

也就是说，采样以后，这些频率都会映射到同一个离散频率
$$
\omega = \Omega T = 0.6\pi
$$


1. 不同的连续时间正弦信号，采样后可能得到相同的离散时间序列。  
2. 原因是采样会让连续时间频谱按 $\Omega_T=\frac{2\pi}{T}$ 周期复制，从而发生混叠。  
3. 离散时间频率本身是以 $2\pi$ 为周期的，因此频率相差整数倍 $2\pi$ 的离散正弦序列是等价的。  
4. 如果不额外假设原信号是带限的，单靠样值序列并不能唯一确定原来的连续时间信号。  
5. 只有当原信号满足奈奎斯特采样条件，并且**重构滤波器正确选择时**，才能唯一恢复原模拟信号。

---

## 3-9 带通信号的采样

### 3-9-1 低通与带通

在前面的章节中，采样的目标信号讨论的是**低通 Low-pass 信号 / 基带 Baseband 信号**。对于这一类信号，通常直接取其最高频率 $\Omega_m$ 作为信号的带宽。

但是存在着一类信号，它们与 0 频点的距离远大于其真正所占据的带宽，即 $\Omega_center \gg Bandwidth$ 。

对于这一类信号，使用简单的 Nyquist 采样频率速率会造成大量的频谱浪费，因为其在很长一段低频区域没有频谱。同时采样率会非常高，造成不可忽视的资源浪费。

---

### 3-9-2 带通采样

带通采样 Bandpass Sampling 也叫 **欠采样** 或 **中频采样 IF Sampling**。  
它针对的不是普通低通信号，而是**频谱只分布在某一段高频带内**的连续时间信号。

#### 1. 核心思想

**利用采样后频谱周期复制的性质，把高频窄带信号无混叠地折叠到较低频带的空白频段，从而用远低于 $2\Omega_H$ 的采样率完成采样。**


设原连续时间信号频谱为 $G_a(f)$。  
采样后，频谱会以采样频率 $f_s$ 为周期重复：

$$
G_p(f)=\frac{1}{T_s}\sum_{k=-\infty}^{\infty}G_a(f-kf_s)
$$

其中
$$
T_s=\frac{1}{f_s}
$$

这表示原始频谱会被复制成很多份，并沿频率轴左右平移。

对于低通信号，如果 $f_s$ 太小，复制后的频谱会在基带处重叠，产生混叠。  
对于带通信号，由于原信号只占一小段频带，所以即使 $f_s < 2f_H$，也可能让这些复制谱恰好错开，不发生重叠。

所以带通采样成立的条件本质上是：采样后的各个频谱副本不能互相重叠。

> [!TIP]
> 虽然这里没说，但是 $\Omega = 2 \pi f$ ，
> 
> 如果你被通信原理的那一堆单位坑过，应该就再也不会忘记了，
>
> 吧？

#### 2. 步骤


##### 第一步：确定原信号频带范围
先确定带通信号的频率范围为：
$$
f_L \le |f| \le f_H
$$

并计算其带宽：
$$
B=f_H-f_L
$$



##### 第二步：选择合适的采样频率
带通采样率必须满足两个要求：

1. **采样后频谱副本之间不重叠**
2. **采样后目标频带能够折叠到较低频区域，便于数字处理**

在一般理论中，可选采样率常写成：
$$
f_s=\frac{2(f_L+f_H)}{2n+1}
$$

也可写成关于中心频率 $f_0$ 的形式：
$$
f_0=\frac{f_L+f_H}{2}
$$

则
$$
f_s=\frac{4f_0}{2n+1}
$$

其中 $n=0,1,2,\dots$ 为满足无混叠条件的整数。

同时还要满足：
$$
f_s \ge 2B
$$

因此，带通采样率通常在
$$
2B
$$
附近选取，而不是在
$$
2f_H
$$
附近选取。



##### 第三步：对连续时间带通信号进行均匀采样
采样后得到离散时间序列：
$$
g[n]=g_a(nT_s)
$$

这时，原来位于高频段的模拟信号会在离散频域中“折叠”到较低频率范围。

也就是说，采样过程本身就完成了一种**频谱搬移**。



##### 第四步：观察采样后频谱的位置
采样后，高频带信号通常会被映射到较低频带，例如：
$$
(0,B)
$$

这使得后续数字处理更加容易。  
因此带通采样本质上兼具两种作用：

- **减少采样率要求**
- **将高频窄带信号搬移到低频进行处理**

##### 第五步：根据需要恢复原信号
如果希望恢复原始模拟带通信号，可以将采样后的冲激串信号通过一个理想带通重构滤波器，其通带为：
$$
f_L \le |f| \le f_H
$$

并设置合适增益，即可恢复原信号。

如果不恢复到原始高频，也可以直接在采样后得到的低频等效信号上进行数字处理，这在通信系统中非常常见。


#### 3. 频谱翻转现象

![alt text](<DSP Chapter 3 II.attachments/1773487100094.png>)

一般来说：

- 若折叠到低频的方式对应某些奇数区间，频谱可能反向
- 若对应偶数区间，频谱可能不反向

因此，带通采样后不仅要关心信号是否混叠，还要关心：

- 频谱是否倒置
- 上下边带顺序是否变化
- 后续数字下变频时是否需要补偿翻转

> [!TIP]
> 其实没那么复杂，一个实信号的 FT 肯定是轴对称的，频谱搬移的过程实际上是同时移动正频率部分和负部分。这里的反转实际上就是负频率的部分在坐标轴上被搬到正频率了。
