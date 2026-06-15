# 7 LTI-DT Systems in the Transform Domain

**愿你的青春如花般绽放。**

![alt text](<DSP Chapter 7.attachments/1773645635605.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [7-1 基于幅度特性的传递函数分类 Transfer Function Classification Based on Magnitude Characteristics](#7-1-基于幅度特性的传递函数分类-transfer-function-classification-based-on-magnitude-characteristics)
  - [7-1-1 传递函数分类 Types of Transfer Functions](#7-1-1-传递函数分类-types-of-transfer-functions)
  - [7-1-2 理想幅度响应数字滤波器 Digital Filters with Ideal Magnitude Responses](#7-1-2-理想幅度响应数字滤波器-digital-filters-with-ideal-magnitude-responses)
  - [7-1-3 有界实传递函数 Bounded Real Transfer Functions](#7-1-3-有界实传递函数-bounded-real-transfer-functions)
  - [7-1-4 全通传递函数 Allpass Transfer Functions](#7-1-4-全通传递函数-allpass-transfer-functions)
- [7-2 基于相位特性的传递函数分类 Transfer Function Classification Based on Phase Characteristics](#7-2-基于相位特性的传递函数分类-transfer-function-classification-based-on-phase-characteristics)
  - [7-2-1 相位延迟与波形失真 Phase Delay and Waveform Distortion](#7-2-1-相位延迟与波形失真-phase-delay-and-waveform-distortion)
  - [7-2-2 零相位传递函数 Zero-Phase Transfer Functions](#7-2-2-零相位传递函数-zero-phase-transfer-functions)
  - [7-2-3 最小相位与最大相位 Minimum-Phase and Maximum-Phase Transfer Functions](#7-2-3-最小相位与最大相位-minimum-phase-and-maximum-phase-transfer-functions)
  - [7-2-4 线性相位传递函数 Linear-Phase Transfer Functions](#7-2-4-线性相位传递函数-linear-phase-transfer-functions)
- [7-3 线性相位 FIR 传递函数类型 Types of Linear-Phase FIR Transfer Functions](#7-3-线性相位-fir-传递函数类型-types-of-linear-phase-fir-transfer-functions)
  - [7-3-1 对称性与线性相位条件 Symmetry Conditions for Linear Phase](#7-3-1-对称性与线性相位条件-symmetry-conditions-for-linear-phase)
  - [7-3-2 四类线性相位 FIR Four Types of Linear-Phase FIR](#7-3-2-四类线性相位-fir-four-types-of-linear-phase-fir)
  - [7-3-3 线性相位 FIR 的零点位置 Zero Locations of Linear-Phase FIR](#7-3-3-线性相位-fir-的零点位置-zero-locations-of-linear-phase-fir)
- [7-4 简单数字滤波器 Simple Digital Filters](#7-4-简单数字滤波器-simple-digital-filters)
  - [7-4-1 简单 FIR 数字滤波器 Simple FIR Digital Filters](#7-4-1-简单-fir-数字滤波器-simple-fir-digital-filters)
  - [7-4-2 简单 IIR 数字滤波器 Simple IIR Digital Filters](#7-4-2-简单-iir-数字滤波器-simple-iir-digital-filters)

## 7-1 基于幅度特性的传递函数分类 Transfer Function Classification Based on Magnitude Characteristics

### 7-1-1 传递函数分类 Types of Transfer Functions

第 6 章已经把 LTI-DT 系统写成了传递函数：

$$
H(z)=\frac{Y(z)}{X(z)}
$$

只要单位圆落在 ROC 内，频率响应就可以由 $z=e^{j\omega}$ 得到：

$$
H(e^{j\omega})=H(z)\big|_{z=e^{j\omega}}
$$

因此，数字滤波器可按以下两类频域特性分类：

- **幅度特性 Magnitude Characteristics**：由 $\lvert H(e^{j\omega})\rvert$ 描述频率成分的通过与抑制；
- **相位特性 Phase Characteristics**：由 $\arg H(e^{j\omega})$ 描述各频率分量的相位延迟。

第 6 章中的 FIR / IIR 分类基于冲激响应长度，本章的分类基于频域特性。

### 7-1-2 理想幅度响应数字滤波器 Digital Filters with Ideal Magnitude Responses

:::: definition 理想数字滤波器 Ideal Digital Filter
**理想数字滤波器 Ideal Digital Filter** 指幅度响应在通带 Passband 内精确为 1，在阻带 Stopband 内精确为 0，并且过渡带 Transition Band 宽度为 0 的滤波器。
::::

四类基本理想幅度响应如下。

![alt text](<DSP Chapter 7.attachments/ideal-magnitude-responses-2x2.jpg>)

以理想低通为例：

$$
H_{LP}(e^{j\omega})=
\begin{cases}
1, & \lvert \omega\rvert\le \omega_c\\
0, & \omega_c < \lvert \omega\rvert\le \pi
\end{cases}
$$

由 IDTFT 可得其冲激响应：

$$
h_{LP}[n]
=\frac{1}{2\pi}\int_{-\omega_c}^{\omega_c}e^{j\omega n}\mathrm d\omega
=
\begin{cases}
\frac{\omega_c}{\pi}, & n=0\\
\frac{\sin{(\omega_c n)}}{\pi n}, & n\ne0
\end{cases}
$$

这个结果是无限长的双边序列，且关于 $n=0$ 对称。因此理想低通是非因果系统，也不能用有限个延迟器精确实现。

实际滤波器只能逼近理想响应，指标通常写成：

- 通带纹波 **Passband Ripple**：$\delta_p$；
- 阻带纹波 **Stopband Ripple**：$\delta_s$；
- 通带边缘 **Passband Edge**：$\omega_p$；
- 阻带边缘 **Stopband Edge**：$\omega_s$；
- 过渡带宽度 **Transition Bandwidth**：$\Delta\omega=\omega_s-\omega_p$。

![alt text](<DSP Chapter 7.attachments/practical-lowpass-spec.jpg>)

过渡带越窄、纹波越小，滤波器阶数通常越高。

---

### 7-1-3 有界实传递函数 Bounded Real Transfer Functions

:::: definition 有界实传递函数 Bounded Real Transfer Function
若稳定因果系统的频率响应满足

$$
\lvert H(e^{j\omega})\rvert\le 1,\qquad -\pi\le \omega\le \pi
$$

则称 $H(z)$ 为**有界实传递函数 Bounded Real Transfer Function, BR**。
::::

由

$$
Y(e^{j\omega})=H(e^{j\omega})X(e^{j\omega})
$$

以及 Parseval 关系可知：

$$
\sum_{n=-\infty}^{\infty}\lvert y[n]\rvert^2
\le
\sum_{n=-\infty}^{\infty}\lvert x[n]\rvert^2
$$

BR 系统不会增加输入信号的总能量。

:::: definition 无损有界实传递函数 Lossless Bounded Real Transfer Function
若稳定因果系统满足

$$
\lvert H(e^{j\omega})\rvert=1
$$

则称 $H(z)$ 为**无损有界实传递函数 Lossless Bounded Real Transfer Function, LBR**。
::::

LBR 不改变幅度，只改变相位。全通传递函数是常见的 LBR。

:::: stem L7-E1
设一阶 IIR 系统

$$
H(z)=\frac{K}{1-\alpha z^{-1}},\qquad \lvert \alpha\rvert<1
$$

求其成为 BR 系统的条件。
::::

:::: solution
单位圆上有

$$
\lvert H(e^{j\omega})\rvert^2
=
\frac{K^2}{1+\alpha^2-2\alpha\cos{\omega}}
$$

分母最小值为 $(1-\lvert\alpha\rvert)^2$，所以最大幅度为

$$
\max_\omega \lvert H(e^{j\omega})\rvert
=
\frac{\lvert K\rvert}{1-\lvert\alpha\rvert}
$$

因此 BR 条件为：

$$
\boxed{\lvert K\rvert\le 1-\lvert\alpha\rvert}
$$

其中：

- $\alpha>0$ 时，最大值出现在 $\omega=0$；
- $\alpha<0$ 时，最大值出现在 $\omega=\pi$。

因此该条件应写成 $1-\lvert\alpha\rvert$，而不是 $1-\alpha$。
::::

---

### 7-1-4 全通传递函数 Allpass Transfer Functions

:::: definition 全通传递函数 Allpass Transfer Function
若稳定因果系统满足

$$
\lvert A(e^{j\omega})\rvert=1
$$

则称 $A(z)$ 为**全通传递函数 Allpass Transfer Function**。
::::

一阶实系数全通系统可写成：

$$
A(z)=\frac{z^{-1}-a}{1-az^{-1}},\qquad \lvert a\rvert<1
$$

极点在 $z=a$，零点在 $z=1/a$。若 $a$ 为复数，则更一般的形式是

$$
A(z)=\frac{z^{-1}-a^*}{1-az^{-1}}
$$

此时极点在 $z=a$，零点在

$$
z=\frac{1}{a^*}
$$

全通系统的零点与极点满足上述镜像关系。

![alt text](<DSP Chapter 7.attachments/allpass-second-order-poles-zeros.jpg>)

对于 $M$ 阶全通系统，有：

$$
A_M(z)=\pm\prod_{k=1}^{M}\frac{z^{-1}-a_k^*}{1-a_k z^{-1}},
\qquad \lvert a_k\rvert<1
$$

源教材中把分母多项式的镜像写作 $D_M^0(z)$。若

$$
D_M(z)=\prod_{k=1}^{M}(1-a_kz^{-1})
$$

则镜像多项式为：

$$
D_M^0(z)=z^{-M}D_M(z^{-1})
$$

于是：

$$
A_M(z)=\pm\frac{D_M^0(z)}{D_M(z)}
=\pm\frac{z^{-M}D_M(z^{-1})}{D_M(z)}
$$

镜像多项式对应的零点就是 $\frac{1}{a_k^*}$。

![alt text](<DSP Chapter 7.attachments/allpass-mirror-polynomial.jpg>)

在单位圆上有：

$$
A_M(z)A_M(z^{-1})\big|_{z=e^{j\omega}}=1
$$

因此：

$$
\lvert A_M(e^{j\omega})\rvert=1
$$

更一般地，稳定全通函数满足：

$$
\lvert A(z)\rvert
\begin{cases}
<1, & \lvert z\rvert>1\\
=1, & \lvert z\rvert=1\\
>1, & \lvert z\rvert<1
\end{cases}
$$

全通系统的幅度恒为 1，但相位通常不是 0。它常用于**群延迟均衡 Group-Delay Equalization**。

![alt text](<DSP Chapter 7.attachments/delay-equalizer-before-after.jpg>)

若 $H(z)=G(z)A(z)$，由于全通部分不改变幅度：

$$
\lvert H(e^{j\omega})\rvert
=\lvert G(e^{j\omega})\rvert\lvert A(e^{j\omega})\rvert
=\lvert G(e^{j\omega})\rvert
$$

群延迟则直接相加：

$$
\tau_H(\omega)=\tau_G(\omega)+\tau_A(\omega)
$$

对于任意稳定因果系统，单位圆外零点对应的因子可分解为全通部分：

$$
H(z)=H_{\min}(z)A(z)
$$

其中 $H_{\min}(z)$ 是最小相位部分，$A(z)$ 用于补偿相位。

## 7-2 基于相位特性的传递函数分类 Transfer Function Classification Based on Phase Characteristics

### 7-2-1 相位延迟与波形失真 Phase Delay and Waveform Distortion

对复指数输入

$$
x[n]=e^{j\omega n}
$$

LTI 系统的输出为

$$
y[n]=H(e^{j\omega})e^{j\omega n}
=\lvert H(e^{j\omega})\rvert e^{j(\omega n+\theta(\omega))}
$$

其中 $\theta(\omega)=\arg H(e^{j\omega})$。

若不同频率分量经历不同的相位延迟，叠加后的波形会改变。

![alt text](<DSP Chapter 7.attachments/phase-delay-waveform-distortion.jpg>)

定义**相位延迟 Phase Delay**：

$$
\tau_p(\omega)=-\frac{\theta(\omega)}{\omega}
$$

定义**群延迟 Group Delay**：

$$
\tau_g(\omega)=-\frac{\mathrm d\theta(\omega)}{\mathrm d\omega}
$$

若

$$
\theta(\omega)=-D\omega
$$

则

$$
\tau_p(\omega)=\tau_g(\omega)=D
$$

所有频率分量都延迟 $D$ 个采样，波形不发生相位失真。

---

### 7-2-2 零相位传递函数 Zero-Phase Transfer Functions

:::: definition 零相位传递函数 Zero-Phase Transfer Function
若

$$
H(e^{j\omega})=\lvert H(e^{j\omega})\rvert
$$

且频率响应为实偶函数，则称 $H(z)$ 为**零相位传递函数 Zero-Phase Transfer Function**。
::::

零相位系统不会造成相位延迟，典型冲激响应满足偶对称：

$$
h[n]=h[-n]
$$

这类系统通常是非因果的。实时系统通常不能直接实现零相位滤波，但离线处理中可以用前向-反向滤波构造：

$$
F(z)=H(z)H(z^{-1})
$$

在单位圆上：

$$
F(e^{j\omega})
=H(e^{j\omega})H(e^{-j\omega})
=\lvert H(e^{j\omega})\rvert^2
$$

该关系对应信号处理软件中的 zero-phase filtering。

对应流程是：

$$
x[n]\xrightarrow{H(z)}v[n],\qquad
u[n]=v[-n]\xrightarrow{H(z)}w[n],\qquad
y[n]=w[-n]
$$

对于实值有限长输入，有：

$$
Y(e^{j\omega})
=H^*(e^{j\omega})H(e^{j\omega})X(e^{j\omega})
=\lvert H(e^{j\omega})\rvert^2X(e^{j\omega})
$$

---

### 7-2-3 最小相位与最大相位 Minimum-Phase and Maximum-Phase Transfer Functions

稳定因果 IIR 系统的极点都在单位圆内。零点的位置则决定了相位类型。

:::: definition 最小相位传递函数 Minimum-Phase Transfer Function
若稳定因果系统的所有零点也都在单位圆内，则称其为**最小相位传递函数 Minimum-Phase Transfer Function**。
::::

:::: definition 最大相位传递函数 Maximum-Phase Transfer Function
若稳定因果系统的所有零点都在单位圆外，则称其为**最大相位传递函数 Maximum-Phase Transfer Function**。
::::

若零点既有单位圆内的，也有单位圆外的，则称为**混合相位 Mixed-Phase**。

同一个幅度响应可以对应多个相位响应。常用处理方法是将单位圆外零点反射到单位圆内，并乘上全通因子以保持幅度响应不变。

例如零点 $z_0$ 在单位圆外时，可写成：

$$
1-z_0z^{-1}
=
(-z_0)
\left(z^{-1}-\frac{1}{z_0}\right)
$$

其中 $\frac{1}{z_0}$ 属于最小相位部分，相应比例因子和全通因子并入 $A(z)$。

最小相位系统在同幅度响应中具有最小相位延迟，也具有最短的能量集中时间。

---

### 7-2-4 线性相位传递函数 Linear-Phase Transfer Functions

:::: definition 线性相位传递函数 Linear-Phase Transfer Function
若系统相位可以写成

$$
\theta(\omega)=-\omega D+\beta
$$

则称该系统具有**线性相位 Linear Phase**。
::::

线性相位的群延迟为常数：

$$
\tau_g(\omega)=D
$$

它仅引入整体延迟，不改变波形中各频率分量的相对位置。

![alt text](<DSP Chapter 7.attachments/linear-phase-lowpass-mag-phase.jpg>)

理想低通的冲激响应以 $n=0$ 为中心。为了得到因果 FIR，需要将其向右平移 $D$ 个采样：

$$
h[n]=h_d[n-D]
$$

对于理想低通：

$$
h_{LP}[n]
=
\begin{cases}
\dfrac{\omega_c}{\pi}, & n=D\\
\dfrac{\sin{\left[\omega_c(n-D)\right]}}{\pi(n-D)}, & n\ne D
\end{cases}
$$

若 FIR 长度为 $N+1$，通常取

$$
D=\frac{N}{2}
$$

这也是线性相位 FIR 中常见的群延迟。

截断后可写成：

$$
h_{LP}[n]
=\frac{\sin{\left[\omega_c(n-N/2)\right]}}{\pi(n-N/2)},
\qquad 0\le n\le N
$$

## 7-3 线性相位 FIR 传递函数类型 Types of Linear-Phase FIR Transfer Functions

### 7-3-1 对称性与线性相位条件 Symmetry Conditions for Linear Phase

FIR 传递函数为：

$$
H(z)=\sum_{n=0}^{N}h[n]z^{-n}
$$

若它具有线性相位，则频率响应可写成：

$$
H(e^{j\omega})
=e^{-jN\omega/2}e^{j\beta}\tilde H(\omega)
$$

其中 $\tilde H(\omega)$ 是实函数。对 $h[n]$ 的要求只有两类：

$$
h[n]=h[N-n]
$$

或

$$
h[n]=-h[N-n]
$$

第一类称为**对称 Symmetric**，第二类称为**反对称 Antisymmetric**。

> [!IMPORTANT]
> 在线性相位 FIR 中，$N$ 是阶数，长度是 $N+1$。四类分类依据为 $N$ 的奇偶性和冲激响应的对称性。

---

### 7-3-2 四类线性相位 FIR Four Types of Linear-Phase FIR

线性相位 FIR 有四种类型。

| 类型 | 对称性 | 阶数 $N$ | 长度 $N+1$ | 强制零点 |
| --- | --- | --- | --- | --- |
| Type I | $h[n]=h[N-n]$ | 偶数 | 奇数 | 无 |
| Type II | $h[n]=h[N-n]$ | 奇数 | 偶数 | $z=-1$ |
| Type III | $h[n]=-h[N-n]$ | 偶数 | 奇数 | $z=1,\ z=-1$ |
| Type IV | $h[n]=-h[N-n]$ | 奇数 | 偶数 | $z=1$ |

对应的冲激响应形状如下。

![alt text](<DSP Chapter 7.attachments/linear-phase-fir-types-2x2.jpg>)

Type I 约束最少，可用于低通、高通、带通和带阻滤波器。Type II 在 $\omega=\pi$ 必为零，不适合高通滤波器。Type III 在 $\omega=0$ 和 $\omega=\pi$ 都为零，适合 Hilbert transformer 等奇对称相位系统。Type IV 在 $\omega=0$ 必为零，常用于微分器。

进一步，$z=1$ 和 $z=-1$ 处零点个数满足：

| 类型 | $z=1$ 处零点 | $z=-1$ 处零点 |
| --- | --- | --- |
| Type I | 偶数个或无 | 偶数个或无 |
| Type II | 偶数个或无 | 奇数个 |
| Type III | 奇数个 | 奇数个 |
| Type IV | 奇数个 | 偶数个或无 |

四类的实幅度函数可按余弦或正弦项展开：

| 类型 | 实幅度函数形式 |
| --- | --- |
| Type I | $\tilde H(\omega)=h[N/2]+2\sum_{n=0}^{N/2-1}h[n]\cos{\left[\omega\left(N/2-n\right)\right]}$ |
| Type II | $\tilde H(\omega)=2\sum_{n=0}^{(N-1)/2}h[n]\cos{\left[\omega\left(N/2-n\right)\right]}$ |
| Type III | $\tilde H(\omega)=2\sum_{n=0}^{N/2-1}h[n]\sin{\left[\omega\left(N/2-n\right)\right]}$ |
| Type IV | $\tilde H(\omega)=2\sum_{n=0}^{(N-1)/2}h[n]\sin{\left[\omega\left(N/2-n\right)\right]}$ |

反对称情况下，实际频率响应会多出 $\pm j$，相位中会出现 $\pm\pi/2$ 的常数项。

---

### 7-3-3 线性相位 FIR 的零点位置 Zero Locations of Linear-Phase FIR

线性相位 FIR 的零点成组出现。

若 $z_i$ 是零点，则以下点也会出现：

$$
z_i^*,\qquad \frac{1}{z_i},\qquad \frac{1}{z_i^*}
$$

对于实系数 FIR，共轭对称来自实系数；对于线性相位，倒数对称来自 $h[n]=\pm h[N-n]$。

![alt text](<DSP Chapter 7.attachments/linear-phase-fir-zero-symmetry.jpg>)

特别地：

- 单位圆上的零点只需要共轭成对；
- 实轴上的零点只需要倒数成对；
- $z=1$ 和 $z=-1$ 是自己的倒数和共轭，因此经常成为强制零点。

:::: stem L7-E2
某 FIR 滤波器为实系数线性相位系统，已知一个零点为

$$
z_0=2e^{j\pi/3}
$$

求必须同时出现的零点。
::::

:::: solution
实系数给出共轭零点：

$$
z_0^*=2e^{-j\pi/3}
$$

线性相位给出倒数零点：

$$
\frac{1}{z_0}=\frac{1}{2}e^{-j\pi/3}
$$

再对倒数零点取共轭：

$$
\frac{1}{z_0^*}=\frac{1}{2}e^{j\pi/3}
$$

因此四个零点为：

$$
\boxed{
2e^{j\pi/3},\quad
2e^{-j\pi/3},\quad
\frac{1}{2}e^{j\pi/3},\quad
\frac{1}{2}e^{-j\pi/3}
}
$$
::::

## 7-4 简单数字滤波器 Simple Digital Filters

### 7-4-1 简单 FIR 数字滤波器 Simple FIR Digital Filters

最简单的 FIR 滤波器通常由少量零点配置构成。

#### 1. 两点平均器

$$
H_0(z)=\frac{1}{2}(1+z^{-1})
$$

其零点在 $z=-1$，即 $\omega=\pi$，所以它具有低通效果。

单位圆上：

$$
H_0(e^{j\omega})
=e^{-j\omega/2}\cos{\left(\frac{\omega}{2}\right)}
$$

因此：

$$
\lvert H_0(e^{j0})\rvert=1,\qquad
\lvert H_0(e^{j\pi})\rvert=0
$$

#### 2. 两点差分器

$$
H_1(z)=\frac{1}{2}(1-z^{-1})
$$

其零点在 $z=1$，即 $\omega=0$，所以它抑制低频，具有高通效果。

单位圆上：

$$
H_1(e^{j\omega})
=je^{-j\omega/2}\sin{\left(\frac{\omega}{2}\right)}
$$

#### 3. 二阶陷波器

若要在 $\omega_0$ 处产生零点，可以把零点放在 $e^{\pm j\omega_0}$：

$$
H_{\text{notch}}(z)
=(1-e^{j\omega_0}z^{-1})(1-e^{-j\omega_0}z^{-1})
$$

即：

$$
\boxed{
H_{\text{notch}}(z)=1-2\cos{\omega_0}z^{-1}+z^{-2}
}
$$

这类 FIR notch 的零点在单位圆上，陷波位置准确，但邻近频率处的过渡通常较缓。

若表达式取正号：

$$
1+2\cos{\omega_0}z^{-1}+z^{-2}
$$

则对应的零点在 $-e^{\pm j\omega_0}=e^{j(\pi\pm\omega_0)}$。陷波频率由单位圆上的零点角度确定。

#### 4. 梳状滤波器

把两点平均器中的 $z$ 换成 $z^L$，可得：

$$
G_0(z)=H_0(z^L)=\frac{1}{2}(1+z^{-L})
$$

该形式会在单位圆上产生周期性零点，因此称为**梳状滤波器 Comb Filter**。

---

### 7-4-2 简单 IIR 数字滤波器 Simple IIR Digital Filters

IIR 滤波器通过极点增强某些频率附近的响应。极点越靠近单位圆，响应越尖锐，但稳定裕量越小。

一个简单的一阶低通可写为：

$$
H_{LP}(z)
=\frac{1-\alpha}{2}\cdot\frac{1+z^{-1}}{1-\alpha z^{-1}},
\qquad 0<\alpha<1
$$

它有一个位于 $z=-1$ 的零点和一个位于 $z=\alpha$ 的极点。单位圆上的幅度平方为：

$$
\lvert H_{LP}(e^{j\omega})\rvert^2
=
\frac{(1-\alpha)^2(1+\cos{\omega})}
{2(1+\alpha^2-2\alpha\cos{\omega})}
$$

当 $\alpha$ 接近 1 时，低频附近增益更集中，截止频率更低。

一个简单的一阶高通可写为：

$$
H_{HP}(z)=\frac{1+\alpha}{2}\frac{1-z^{-1}}{1-\alpha z^{-1}},
\qquad 0<\alpha<1
$$

其中 $z=1$ 的零点抑制直流分量，极点 $z=\alpha$ 控制过渡带形状。

二阶带通可以写作：

$$
H_{BP}(z)
=\frac{1-\alpha}{2}
\cdot
\frac{1-z^{-2}}
{1-\beta(1+\alpha)z^{-1}+\alpha z^{-2}}
$$

二阶带阻可以写作：

$$
H_{BS}(z)
=\frac{1+\alpha}{2}
\cdot
\frac{1-2\beta z^{-1}+z^{-2}}
{1-\beta(1+\alpha)z^{-1}+\alpha z^{-2}}
$$

这里 $\alpha$ 主要控制极点半径，即带宽；$\beta$ 主要控制中心频率位置。

源稿给出的带宽关系为：

$$
B_w=\omega_{c2}-\omega_{c1}
=\cos^{-1}{\left(\frac{2\alpha}{1+\alpha^2}\right)}
$$

> [!TIP]
> FIR 主要通过零点抑制指定频率；IIR 可同时利用极点增强邻近频率响应，因此过渡特性通常更灵活。
