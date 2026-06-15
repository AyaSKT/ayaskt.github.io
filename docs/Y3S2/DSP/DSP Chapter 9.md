# 9 IIR Digital Filter Design

**目的虽有，却无路可循；我们称之为路的，无非是踌躇。**

![alt text](<DSP Chapter 9.attachments/1773653064083.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [9-1 设计指标 Design Specifications](#9-1-设计指标-design-specifications)
  - [9-1-1 幅度指标 Magnitude Specifications](#9-1-1-幅度指标-magnitude-specifications)
  - [9-1-2 dB 指标与归一化 Normalized Specifications](#9-1-2-db-指标与归一化-normalized-specifications)
  - [9-1-3 IIR 设计流程 IIR Design Flow](#9-1-3-iir-设计流程-iir-design-flow)
- [9-2 模拟低通原型 Analog Lowpass Prototypes](#9-2-模拟低通原型-analog-lowpass-prototypes)
  - [9-2-1 Butterworth 低通原型 Butterworth Prototype](#9-2-1-butterworth-低通原型-butterworth-prototype)
  - [9-2-2 Chebyshev 低通原型 Chebyshev Prototype](#9-2-2-chebyshev-低通原型-chebyshev-prototype)
  - [9-2-3 Elliptic 低通原型 Elliptic Prototype](#9-2-3-elliptic-低通原型-elliptic-prototype)
  - [9-2-4 原型对比 Prototype Comparison](#9-2-4-原型对比-prototype-comparison)
- [9-3 冲激响应不变法 Impulse Invariance Method](#9-3-冲激响应不变法-impulse-invariance-method)
  - [9-3-1 基本映射 Basic Mapping](#9-3-1-基本映射-basic-mapping)
  - [9-3-2 传递函数变换 Transfer Function Conversion](#9-3-2-传递函数变换-transfer-function-conversion)
  - [9-3-3 混叠问题 Aliasing Problem](#9-3-3-混叠问题-aliasing-problem)
- [9-4 双线性变换 Bilinear Transformation](#9-4-双线性变换-bilinear-transformation)
  - [9-4-1 s 平面到 z 平面的映射 Mapping from s-plane to z-plane](#9-4-1-s-平面到-z-平面的映射-mapping-from-s-plane-to-z-plane)
  - [9-4-2 频率压缩与预畸变 Frequency Warping and Prewarping](#9-4-2-频率压缩与预畸变-frequency-warping-and-prewarping)
  - [9-4-3 双线性设计步骤 Bilinear Design Steps](#9-4-3-双线性设计步骤-bilinear-design-steps)
- [9-5 频率变换 Frequency Transformations](#9-5-频率变换-frequency-transformations)
  - [9-5-1 模拟低通到高通 Lowpass to Highpass](#9-5-1-模拟低通到高通-lowpass-to-highpass)
  - [9-5-2 模拟低通到带通 Lowpass to Bandpass](#9-5-2-模拟低通到带通-lowpass-to-bandpass)
  - [9-5-3 模拟低通到带阻 Lowpass to Bandstop](#9-5-3-模拟低通到带阻-lowpass-to-bandstop)
  - [9-5-4 两种设计流程 Two Design Procedures](#9-5-4-两种设计流程-two-design-procedures)
- [9-6 易错点 Common Pitfalls](#9-6-易错点-common-pitfalls)


## 9-1 设计指标 Design Specifications

### 9-1-1 幅度指标 Magnitude Specifications

IIR 数字滤波器设计的目标，是求一个稳定因果的有理传递函数：

$$
G(z)=\frac{B(z)}{A(z)}
$$

使它的频率响应 $G(e^{j\omega})$ 满足给定幅度指标。

以低通滤波器为例，通常给定四个量：

- 通带边缘 **Passband Edge**：$\omega_p$；
- 阻带边缘 **Stopband Edge**：$\omega_s$；
- 通带允许偏差 **Passband Deviation**：$\delta_p$；
- 阻带允许偏差 **Stopband Deviation**：$\delta_s$。

对应的幅度约束为：

$$
1-\delta_p
\le
\left|G(e^{j\omega})\right|
\le
1+\delta_p,
\qquad
0\le \omega\le \omega_p
$$

$$
\left|G(e^{j\omega})\right|
\le
\delta_s,
\qquad
\omega_s\le \omega\le \pi
$$

![设计指标与原型流程](<DSP Chapter 9.attachments/design-specs-summary.jpg>)

边缘频率若用 Hz 给出，可换算为数字角频率：

$$
\omega_p=\frac{2\pi f_p}{F_T}=2\pi f_pT,
\qquad
\omega_s=\frac{2\pi f_s}{F_T}=2\pi f_sT
$$

其中：

- $F_T$：采样频率；
- $T=1/F_T$：采样周期。

注意，数字角频率的范围是 $0\le\omega\le\pi$，单位为 $\mathrm{rad/sample}$。

---

### 9-1-2 dB 指标与归一化 Normalized Specifications

损耗函数 **Loss Function** 定义为：

$$
A(\omega)
=-20\log_{10}\left|G(e^{j\omega})\right|
\quad \mathrm{dB}
$$

因此通带最大衰减和阻带最小衰减可写作：

$$
\alpha_p=-20\log_{10}(1-\delta_p)
$$

$$
\alpha_s=-20\log_{10}\delta_s
$$

反过来：

$$
\delta_p=1-10^{-\alpha_p/20},
\qquad
\delta_s=10^{-\alpha_s/20}
$$

例如：

$$
\alpha_p=1\ \mathrm{dB}
\Rightarrow
\delta_p=1-10^{-1/20}\approx0.1087
$$

$$
\alpha_s=80\ \mathrm{dB}
\Rightarrow
\delta_s=10^{-80/20}=10^{-4}
$$

模拟原型里更常用归一化写法：

$$
\frac{1}{\sqrt{1+\varepsilon^2}}
\le
\left|H_a(j\Omega)\right|
\le
1
$$

$$
\left|H_a(j\Omega_s)\right|\le \frac{1}{A}
$$

其中：

$$
\varepsilon=\sqrt{10^{\alpha_p/10}-1},
\qquad
A=10^{\alpha_s/20}
$$

这里 $\varepsilon$ 控制通带纹波，$A$ 控制阻带衰减。

---

### 9-1-3 IIR 设计流程 IIR Design Flow

IIR 设计通常借助模拟低通逼近。原因在于模拟滤波器的 Butterworth、Chebyshev、Elliptic 等逼近方法已有成熟的闭式公式和设计表。

基本流程为：

1. 将数字指标转成模拟低通原型指标；
2. 选择 Butterworth / Chebyshev / Elliptic 等模拟低通原型；
3. 求原型阶数 $N$ 和 $H_a(s)$；
4. 用冲激响应不变法或双线性变换得到 $G(z)$；
5. 做幅度缩放，使通带最大增益为 $0\ \mathrm{dB}$。

如果 $G_{\max}$ 是通带内的最大幅度，则缩放因子为：

$$
K=\frac{1}{G_{\max}}
$$

常见特殊点：

$$
K=\frac{1}{G(1)}
\quad \text{for lowpass}
$$

$$
K=\frac{1}{G(-1)}
\quad \text{for highpass}
$$

带通滤波器通常取通带中心频率 $\omega_c$：

$$
K=\frac{1}{G(e^{j\omega_c})}
$$


## 9-2 模拟低通原型 Analog Lowpass Prototypes

### 9-2-1 Butterworth 低通原型 Butterworth Prototype

Butterworth 低通的特点是**通带单调且最大平坦 Maximally Flat**。

其幅度平方响应为：

$$
\left|H_a(j\Omega)\right|^2
=
\frac{1}{1+\left(\Omega/\Omega_c\right)^{2N}}
$$

其中：

- $N$：滤波器阶数；
- $\Omega_c$：$3\ \mathrm{dB}$ 截止频率。

在 $\Omega=\Omega_c$ 时：

$$
\left|H_a(j\Omega_c)\right|^2=\frac{1}{2}
$$

所以：

$$
10\log_{10}\left|H_a(j\Omega_c)\right|^2
=10\log_{10}\frac{1}{2}
\approx -3\ \mathrm{dB}
$$

由通带和阻带指标：

$$
\left|H_a(j\Omega_p)\right|^2
=\frac{1}{1+\varepsilon^2}
$$

$$
\left|H_a(j\Omega_s)\right|^2
=\frac{1}{A^2}
$$

可得阶数估计式：

$$
N
\ge
\frac{
\log_{10}\left(\dfrac{A^2-1}{\varepsilon^2}\right)
}{
2\log_{10}\left(\dfrac{\Omega_s}{\Omega_p}\right)
}
$$

实际阶数取向上取整：

$$
N=\left\lceil
\frac{
\log_{10}\left((A^2-1)/\varepsilon^2\right)
}{
2\log_{10}\left(\Omega_s/\Omega_p\right)
}
\right\rceil
$$

再由通带边缘求 $\Omega_c$：

$$
\Omega_c
=
\frac{\Omega_p}{\varepsilon^{1/N}}
$$

也可以由阻带边缘求：

$$
\Omega_c
=
\frac{\Omega_s}{(A^2-1)^{1/(2N)}}
$$

Butterworth 极点位于半径为 $\Omega_c$ 的圆上，左半平面极点为：

$$
p_l
=
\Omega_c
e^{j\pi(N+2l-1)/(2N)},
\qquad
l=1,2,\dots,N
$$

传递函数可写为：

$$
H_a(s)
=
\frac{\Omega_c^N}{\prod_{l=1}^{N}(s-p_l)}
$$

---

### 9-2-2 Chebyshev 低通原型 Chebyshev Prototype

Chebyshev 的特点是用纹波换取更窄的过渡带。

Chebyshev 多项式定义为：

$$
T_N(x)=
\begin{cases}
\cos\left(N\cos^{-1}x\right), & |x|\le 1\\
\cosh\left(N\cosh^{-1}x\right), & |x|>1
\end{cases}
$$

**Type I Chebyshev** 在通带等波纹，阻带单调：

$$
\left|H_a(j\Omega)\right|^2
=
\frac{1}{
1+\varepsilon^2T_N^2(\Omega/\Omega_p)
}
$$

当 $\Omega=\Omega_s$ 时若要求幅度不超过 $1/A$，则：

$$
\frac{1}{
1+\varepsilon^2T_N^2(\Omega_s/\Omega_p)
}
=
\frac{1}{A^2}
$$

阶数为：

$$
N
=
\left\lceil
\frac{
\cosh^{-1}\left(\sqrt{A^2-1}/\varepsilon\right)
}{
\cosh^{-1}\left(\Omega_s/\Omega_p\right)
}
\right\rceil
$$

**Type II Chebyshev** 又叫 inverse Chebyshev，通带单调，阻带等波纹：

$$
\left|H_a(j\Omega)\right|^2
=
\frac{1}{
1+\varepsilon^2
\left[
\frac{T_N(\Omega_s/\Omega_p)}
{T_N(\Omega_s/\Omega)}
\right]^2
}
$$

Type II 的阶数估计仍可用同一形式：

$$
N
=
\left\lceil
\frac{
\cosh^{-1}\left(\sqrt{A^2-1}/\varepsilon\right)
}{
\cosh^{-1}\left(\Omega_s/\Omega_p\right)
}
\right\rceil
$$

---

### 9-2-3 Elliptic 低通原型 Elliptic Prototype

Elliptic 低通也叫 Cauer filter，通带和阻带都允许等波纹，因此在同样指标下阶数通常最低。

其幅度平方响应写作：

$$
\left|H_a(j\Omega)\right|^2
=
\frac{1}{
1+\varepsilon^2R_N^2(\Omega/\Omega_p)
}
$$

其中 $R_N(\Omega)$ 是 $N$ 阶有理函数，并满足：

$$
R_N(1/\Omega)=\frac{1}{R_N(\Omega)}
$$

记：

$$
k=\frac{\Omega_p}{\Omega_s},
\qquad
k_1=\frac{\varepsilon}{\sqrt{A^2-1}}
$$

近似阶数可由：

$$
N
\approx
\frac{2\log_{10}(4/k_1)}
{\log_{10}(1/\rho)}
$$

其中：

$$
k'=\sqrt{1-k^2}
$$

$$
\rho_0
=
\frac{1-\sqrt{k'}}
{2(1+\sqrt{k'})}
$$

$$
\rho
=
\rho_0+2\rho_0^5+15\rho_0^9+150\rho_0^{13}
$$

实际仍取向上取整：

$$
N=\lceil N_{\mathrm{estimate}}\rceil
$$

---

### 9-2-4 原型对比 Prototype Comparison

![模拟低通原型响应对比](<DSP Chapter 9.attachments/prototype-responses-2x2.jpg>)

同一组指标下，大致有：

| 原型 Prototype | 通带 Passband | 阻带 Stopband | 过渡带 Transition Band |
|---|---|---|---|
| Butterworth | 单调，最大平坦 | 单调 | 最宽 |
| Chebyshev Type I | 等波纹 | 单调 | 比 Butterworth 窄 |
| Chebyshev Type II | 单调 | 等波纹 | 比 Butterworth 窄 |
| Elliptic | 等波纹 | 等波纹 | 最窄 |

以 $\alpha_p=1\ \mathrm{dB}$、$\alpha_s=40\ \mathrm{dB}$、$\Omega_s/\Omega_p=5$ 为例：

$$
\varepsilon^2=10^{1/10}-1\approx0.2589,
\qquad
A^2=10^{40/10}=10000
$$

Butterworth：

$$
N
=
\left\lceil
\frac{\log_{10}(9999/0.2589)}
{2\log_{10}5}
\right\rceil
=4
$$

Chebyshev：

$$
N
=
\left\lceil
\frac{\cosh^{-1}(100/\sqrt{0.2589})}
{\cosh^{-1}5}
\right\rceil
=3
$$

Elliptic 通常还能继续降阶。代价是通带和阻带都有纹波，相位也更不线性。


## 9-3 冲激响应不变法 Impulse Invariance Method

### 9-3-1 基本映射 Basic Mapping

冲激响应不变法通过采样模拟系统的冲激响应建立数字滤波器。

若模拟原型为：

$$
H_a(s)=\mathcal{L}\{h_a(t)\}
$$

则数字滤波器冲激响应取：

$$
g[n]=T h_a(nT)
$$

也可写作 $g[n]=h_a(nT)$，再额外做幅度缩放。本章采用 $g[n]=Th_a(nT)$，使低频处的幅度比例与模拟响应保持一致。

由 $z=e^{sT}$ 可得映射关系：

$$
s=\sigma+j\Omega
\quad\Rightarrow\quad
z=e^{sT}=e^{\sigma T}e^{j\Omega T}
$$

因此：

- $s$ 平面虚轴 $\sigma=0$ 映射到 $z$ 平面单位圆；
- 左半平面 $\sigma<0$ 映射到单位圆内；
- 若模拟滤波器稳定，则映射后的数字滤波器也稳定。

![冲激响应不变法摘要](<DSP Chapter 9.attachments/impulse-invariance-summary.jpg>)

---

### 9-3-2 传递函数变换 Transfer Function Conversion

若模拟传递函数可展开为部分分式：

$$
H_a(s)
=
\sum_{k=1}^{N}
\frac{A_k}{s-s_k},
\qquad
\mathrm{Re}(s_k)<0
$$

则：

$$
h_a(t)
=
\sum_{k=1}^{N}
A_ke^{s_kt}u(t)
$$

采样并乘上 $T$：

$$
g[n]
=
T\sum_{k=1}^{N}
A_ke^{s_knT}u[n]
$$

做 Z 变换：

$$
G(z)
=
\sum_{k=1}^{N}
\frac{T A_k}{1-e^{s_kT}z^{-1}}
$$

所以单个模拟极点 $s_k$ 会映射为一个数字极点：

$$
z_k=e^{s_kT}
$$

注意，这个方法主要保证极点映射关系。零点不具有同样的一一对应映射。

---

### 9-3-3 混叠问题 Aliasing Problem

频率轴关系为：

$$
\omega=\Omega T
\pmod{2\pi}
$$

如果使用 $g[n]=T h_a(nT)$，则频率响应满足：

$$
G(e^{j\omega})
=
\sum_{r=-\infty}^{\infty}
H_a\left(
j\frac{\omega-2\pi r}{T}
\right)
$$

该式表示模拟频率响应会以 $2\pi/T$ 为周期叠加到数字频率轴上。

因此冲激响应不变法适合模拟低通或带限程度较好的系统。若模拟滤波器的高频分量很强，数字滤波器会出现明显混叠。

> [!WARNING]
> 冲激响应不变法没有 frequency warping，但有 aliasing。
>
> 双线性变换没有 aliasing，但有 frequency warping。


## 9-4 双线性变换 Bilinear Transformation

### 9-4-1 s 平面到 z 平面的映射 Mapping from s-plane to z-plane

双线性变换使用如下代换：

$$
s
=
\frac{2}{T}
\frac{1-z^{-1}}{1+z^{-1}}
$$

于是：

$$
G(z)
=
H_a(s)\bigg|_{
s=\frac{2}{T}\frac{1-z^{-1}}{1+z^{-1}}
}
$$

反变换为：

$$
z
=
\frac{1+sT/2}{1-sT/2}
$$

设 $s=\sigma+j\Omega$，可证明：

$$
\sigma=0\Rightarrow |z|=1
$$

$$
\sigma<0\Rightarrow |z|<1
$$

$$
\sigma>0\Rightarrow |z|>1
$$

因此双线性变换同样把稳定模拟系统映射成稳定数字系统。

![双线性变换摘要](<DSP Chapter 9.attachments/bilinear-transform-summary.jpg>)

---

### 9-4-2 频率压缩与预畸变 Frequency Warping and Prewarping

在单位圆上令 $z=e^{j\omega}$：

$$
s
=
\frac{2}{T}
\frac{1-e^{-j\omega}}{1+e^{-j\omega}}
$$

整理可得：

$$
j\Omega
=
j\frac{2}{T}\tan\frac{\omega}{2}
$$

所以：

$$
\boxed{
\Omega
=
\frac{2}{T}\tan\frac{\omega}{2}
}
$$

反过来：

$$
\boxed{
\omega
=
2\tan^{-1}\frac{\Omega T}{2}
}
$$

这是一一映射：

$$
0\le\omega<\pi
\quad\Longleftrightarrow\quad
0\le\Omega<\infty
$$

没有频谱混叠，但频率轴被非线性压缩，该现象称为 **frequency warping**。

设计前必须做预畸变 **prewarping**：

$$
\Omega_p
=
\frac{2}{T}\tan\frac{\omega_p}{2},
\qquad
\Omega_s
=
\frac{2}{T}\tan\frac{\omega_s}{2}
$$

若为简化计算取 $T=2$，则：

$$
\Omega=\tan\frac{\omega}{2}
$$

最终代换使用同一个 $T$ 时，计算结果保持一致。

---

### 9-4-3 双线性设计步骤 Bilinear Design Steps

低通 IIR 的双线性设计步骤：

1. 将数字边缘频率 $\omega_p,\omega_s$ 预畸变为 $\Omega_p,\Omega_s$；
2. 用 $\Omega_p,\Omega_s,\alpha_p,\alpha_s$ 设计模拟低通原型 $H_a(s)$；
3. 代入

$$
s
=
\frac{2}{T}
\frac{1-z^{-1}}{1+z^{-1}}
$$

得到 $G(z)$；

4. 做幅度缩放，使通带最大增益为 1。

双线性变换能保持幅度响应的顺序关系，但不保持相位响应。需要线性相位时，通常优先考虑 FIR。


## 9-5 频率变换 Frequency Transformations

### 9-5-1 模拟低通到高通 Lowpass to Highpass

设原型低通为 $H_{LP}(s)$，其通带边缘为 $\Omega_p$。目标高通变量记为 $\hat{s}$，目标通带边缘为 $\hat{\Omega}_p$。

低通到高通的模拟频率变换为：

$$
s
=
\frac{\Omega_p\hat{\Omega}_p}{\hat{s}}
$$

因此：

$$
H_{HP}(\hat{s})
=
H_{LP}\left(
\frac{\Omega_p\hat{\Omega}_p}{\hat{s}}
\right)
$$

在虚轴上，$\hat{s}=j\hat{\Omega}$：

$$
\Omega
=
-
\frac{\Omega_p\hat{\Omega}_p}{\hat{\Omega}}
$$

低频被映射到高频，高频被映射到低频。

---

### 9-5-2 模拟低通到带通 Lowpass to Bandpass

目标带通的通带边缘为 $\hat{\Omega}_{p1}$ 与 $\hat{\Omega}_{p2}$。

定义：

$$
B=\hat{\Omega}_{p2}-\hat{\Omega}_{p1}
$$

$$
\hat{\Omega}_0
=
\sqrt{\hat{\Omega}_{p1}\hat{\Omega}_{p2}}
$$

低通到带通的变换为：

$$
s
=
\Omega_p
\frac{\hat{s}^2+\hat{\Omega}_0^2}
{B\hat{s}}
$$

因此：

$$
H_{BP}(\hat{s})
=
H_{LP}\left(
\Omega_p
\frac{\hat{s}^2+\hat{\Omega}_0^2}
{B\hat{s}}
\right)
$$

在虚轴上：

$$
\Omega
=
-
\Omega_p
\frac{\hat{\Omega}_0^2-\hat{\Omega}^2}
{B\hat{\Omega}}
$$

带通会把低通的一个通带映射成正负两侧的一对通带。

---

### 9-5-3 模拟低通到带阻 Lowpass to Bandstop

目标带阻的阻带边缘为 $\hat{\Omega}_{s1}$ 与 $\hat{\Omega}_{s2}$。

定义：

$$
B=\hat{\Omega}_{s2}-\hat{\Omega}_{s1}
$$

$$
\hat{\Omega}_0
=
\sqrt{\hat{\Omega}_{s1}\hat{\Omega}_{s2}}
$$

低通到带阻的变换可写成：

$$
s
=
\Omega_r
\frac{B\hat{s}}
{\hat{s}^2+\hat{\Omega}_0^2}
$$

其中 $\Omega_r$ 是低通原型中用来对应目标边缘的参考频率，常按映射后的最严格边缘选取。

于是：

$$
H_{BS}(\hat{s})
=
H_{LP}\left(
\Omega_r
\frac{B\hat{s}}
{\hat{s}^2+\hat{\Omega}_0^2}
\right)
$$

在虚轴上：

$$
\Omega
=
\Omega_r
\frac{B\hat{\Omega}}
{\hat{\Omega}_0^2-\hat{\Omega}^2}
$$

![模拟频率变换](<DSP Chapter 9.attachments/analog-frequency-transformations.jpg>)

---

### 9-5-4 两种设计流程 Two Design Procedures

非低通 IIR 通常有两种设计流程。

**流程 A：先做模拟频率变换，再双线性变换**

$$
\text{digital spec}
\xrightarrow{\mathrm{prewarp}}
\text{analog target spec}
\xrightarrow{\mathrm{LP\ prototype}}
H_{LP}(s)
\xrightarrow{\mathrm{analog\ frequency\ transform}}
H_a(\hat{s})
\xrightarrow{\mathrm{bilinear}}
G(z)
$$

该流程便于推导和计算，也便于与模拟原型公式对应。

**流程 B：先做数字低通，再做数字频率变换**

$$
G_{LP}(z)
\xrightarrow{z^{-1}\mapsto A(\hat{z}^{-1})}
G_{\mathrm{target}}(\hat{z})
$$

其中 $A(\hat{z}^{-1})$ 是稳定全通函数。这样能保持单位圆到单位圆的映射，并保持稳定性。

本科阶段的计算题更常采用流程 A。


## 9-6 易错点 Common Pitfalls

1. **$\omega$ 和 $\Omega$ 不要混用。**

数字频率 $\omega$ 的范围是 $0$ 到 $\pi$，模拟频率 $\Omega$ 的范围是 $0$ 到 $\infty$。

2. **dB 指标的正负号不要写反。**

$$
\alpha_p=-20\log_{10}(1-\delta_p),
\qquad
\alpha_s=-20\log_{10}\delta_s
$$

这里 $\alpha_p,\alpha_s$ 都是正数。

3. **Butterworth 阶数公式要有系数 2。**

因为幅度平方响应里是 $2N$：

$$
N
\ge
\frac{
\log_{10}\left((A^2-1)/\varepsilon^2\right)
}{
2\log_{10}\left(\Omega_s/\Omega_p\right)
}
$$

若遗漏该系数，阶数估计会增大约一倍。

4. **Chebyshev 的 $\cosh^{-1}$ 只用于 $\Omega_s/\Omega_p>1$。**

低通原型里要求阻带边缘大于通带边缘。若是高通、带通、带阻，先做频率变换或边缘映射，再套低通原型公式。

5. **冲激响应不变法的极点映射是 $z=e^{sT}$。**

该映射不同于双线性变换中的分式映射。若 $s_k$ 在左半平面，则：

$$
\left|e^{s_kT}\right|
=
e^{\mathrm{Re}(s_k)T}
<1
$$

6. **冲激响应不变法有混叠。**

它不适合高通，也不适合模拟响应高频衰减很慢的情况。

7. **双线性变换必须预畸变。**

边缘频率要先变成：

$$
\Omega
=
\frac{2}{T}\tan\frac{\omega}{2}
$$

再设计模拟原型。若未做预畸变而把 $\omega_p,\omega_s$ 当成 $\Omega_p,\Omega_s$，边缘频率将不满足原指标。

8. **双线性变换不保持相位。**

它没有 aliasing，也能保持稳定性，但相位响应会被改变。若题目要求线性相位，优先考虑 FIR。
