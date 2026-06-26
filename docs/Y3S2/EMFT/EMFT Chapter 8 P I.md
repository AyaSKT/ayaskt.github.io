---
lastUpdated: 2026-06-03T16:35:12+08:00
---

# 8 Plane Electromagnetic Waves Part I

<LyricCard
  title="I Really Want to Stay at Your House"
  artist="Rosa Walton / Hallie Coggins"
  lang="en"
  qq-url="https://y.qq.com/n/ryqq/songDetail/0011gtqV1AYyOO"
  netease-url="https://music.163.com/#/song?id=1496089152"
>
  <LyricLine
    original="So, get away, another way to feel what you didn't want yourself to know,"
    translation="所以 那就离开吧，只为让自己不愿了解真相，"
  />
  <LyricLine
    original="And let yourself go,"
    translation="放任你自己走吧，"
  />
</LyricCard>

![alt text](<EMFT Chapter 8 P I.attachments/1778750856565.JPG>)


## 章节目录

- [章节目录](#章节目录)
- [8-1 无损媒质中的平面波 Plane Waves in Lossless Media](#8-1-无损媒质中的平面波-plane-waves-in-lossless-media)
  - [8-1-1 基本问题 Basic Issues](#8-1-1-基本问题-basic-issues)
  - [8-1-2 均匀平面波 Uniform Plane Wave](#8-1-2-均匀平面波-uniform-plane-wave)
  - [8-1-3 理想介质中的场表达式](#8-1-3-理想介质中的场表达式)
  - [8-1-4 任意传播方向的平面波](#8-1-4-任意传播方向的平面波)
  - [8-1-5 传播参数 Propagation Parameters](#8-1-5-传播参数-propagation-parameters)
  - [8-1-6 电磁波的极化 Polarization](#8-1-6-电磁波的极化-polarization)
- [8-2 有损媒质中的平面波 Plane Waves in Lossy Media](#8-2-有损媒质中的平面波-plane-waves-in-lossy-media)
  - [8-2-1 基本形式 Basic Form](#8-2-1-基本形式-basic-form)
  - [8-2-2 导电媒质中的均匀平面波](#8-2-2-导电媒质中的均匀平面波)
  - [8-2-3 传播常数与本征阻抗](#8-2-3-传播常数与本征阻抗)
  - [8-2-4 低损耗介质 Low-Loss Dielectrics](#8-2-4-低损耗介质-low-loss-dielectrics)
  - [8-2-5 良导体 Good Conductor](#8-2-5-良导体-good-conductor)
  - [8-2-6 趋肤深度与工程含义](#8-2-6-趋肤深度与工程含义)
- [8-3 电磁功率流与坡印廷矢量 Poynting Vector](#8-3-电磁功率流与坡印廷矢量-poynting-vector)
  - [8-3-1 能量流与电磁能量守恒 Energy Flow and Conservation](#8-3-1-能量流与电磁能量守恒-energy-flow-and-conservation)
  - [8-3-2 坡印廷定理 Poynting Theorem](#8-3-2-坡印廷定理-poynting-theorem)
  - [8-3-3 坡印廷矢量 Poynting Vector](#8-3-3-坡印廷矢量-poynting-vector)
  - [8-3-4 平均能流密度](#8-3-4-平均能流密度)
- [总结 Summary](#总结-summary)
  - [平面波参数列表](#平面波参数列表)


## 8-1 无损媒质中的平面波 Plane Waves in Lossless Media

### 8-1-1 基本问题 Basic Issues

本章从**时谐电磁场 Time-Harmonic Field** 出发讨论电磁波传播。

时谐场的一般实数形式可以写成：

$$
A(\vec r,t)=A_0(\vec r)\cos{{[\omega t+\phi(\vec r)+\phi_0]}}
$$

其中：

- $A_0(\vec r)$：空间位置相关的振幅；
- $\omega t$：时间相位；
- $\phi(\vec r)$：空间相位；
- $\phi_0$：初相位。

用复矢量表示时：

$$
\vec E(\vec r,t)=\operatorname{Re}[\dot{\vec E}(\vec r)e^{j\omega t}]
$$

$$
\dot{\vec E}(\vec r)
=\vec e_xE_x(\vec r)e^{j\phi_x(\vec r)}
+\vec e_yE_y(\vec r)e^{j\phi_y(\vec r)}
+\vec e_zE_z(\vec r)e^{j\phi_z(\vec r)}
$$

复矢量 $\dot{\vec E}(\vec r)$ 包含了空间变化、振幅、相位的信息。在时谐场里，我们经令：

$$
\frac{\partial}{\partial t}=j\omega
$$

。

在无源区域，电场满足亥姆霍兹方程：

$$
\nabla^2\dot{\vec E}(\vec r)+k_c^2\dot{\vec E}(\vec r)=0
$$

若媒质为理想介质：

$$
\sigma=0
$$

$$
k=\omega\sqrt{\mu\varepsilon}=\beta
$$

于是：

$$
\nabla^2\dot{\vec E}(\vec r)+k^2\dot{\vec E}(\vec r)=0
$$

若媒质有损耗：

$$
\sigma\ne0
$$

$$
k_c=\omega\sqrt{\mu\varepsilon_c}=\beta-j\alpha
$$

其中 $\alpha$ 为衰减常数，$\beta$ 为相位常数。



---

### 8-1-2 均匀平面波 Uniform Plane Wave

:::: definition
**平面波 Plane Wave**：任意时刻，等相位面 Equiphase Surface 为平面的电磁波。

**均匀 Uniform**：同一个等相位面上，电磁场的振幅和方向都保持不变。

因此，**均匀平面波 Uniform Plane Wave** 指等相位面为平面，并且同一等相位面上场强恒定的电磁波。
::::

![均匀平面波的等相位面](<EMFT Chapter 8 P I.attachments/plane-wavefront.jpg>)

取等相位面为 $xOy$ 平面，波沿 $z$ 方向传播，场量只与 $z$ 有关：

$$
\dot{\vec E}(\vec r)=\dot{\vec E}(z)
$$

代入亥姆霍兹方程：

$$
\nabla^2\dot{\vec E}+k^2\dot{\vec E}=0
$$

可得：

$$
\frac{d^2\dot{\vec E}}{dz^2}+k^2\dot{\vec E}=0
$$

对每一个分量都有：

$$
\frac{d^2E_i}{dz^2}+k^2E_i=0,\qquad i=x,y,z
$$

其解为：

$$
E_i(z)=A_1e^{-jkz}+A_2e^{jkz}
$$

同理：

$$
H_i(z)=B_1e^{-jkz}+B_2e^{jkz}
$$

$e^{-jkz}$ 表示沿 $+z$ 方向传播，$e^{jkz}$ 表示沿 $-z$ 方向传播。判断传播方向时看相位：

$$
\omega t-kz=\text{constant}
$$

随着 $t$ 增大，$z$ 也增大，所以是沿 $+z$ 传播。

即波沿空间相位滞后的方向传播。


> [!NOTE]
> 一维平面波 $E(z,t)=E_0\cos{(\omega t-kz)}$ 中，相位 $\Phi=\omega t-kz$ 由时间相位项 $\omega t$ 与空间相位项 $kz$ 组成。时间侧与空间侧参数存在对偶关系：
>
> $$
> \boxed{\omega \leftrightarrow k},\qquad \boxed{T \leftrightarrow \lambda}
> $$
>
> $\omega$ 是"时间上的相位变化率"（rad/s），$k$ 是"空间上的相位变化率"（rad/m）；$T$ 是"时间上的一个周期"（s），$\lambda$ 是"空间上的一个周期"（m）。
>
> 两侧关系结构相同：
>
> $$
> \boxed{\omega=\frac{2\pi}{T}}
> \quad \leftrightarrow \quad
> \boxed{k=\frac{2\pi}{\lambda}}
> $$
>
> | 时间侧 | 空间侧 | 含义 |
> | --- | --- | --- |
> | $t$ | $z$（或 $\vec r$） | 变量 |
> | $T$ | $\lambda$ | 周期 |
> | $f=1/T$ | $1/\lambda$ | 频率 |
> | $\omega=2\pi f$ | $k=2\pi/\lambda$ | 角频率 |
>
> 相速度 $v_p=\omega/k$ 就是把时间周期"换算"成空间周期的比例。

---

### 8-1-3 理想介质中的场表达式

若只考虑沿 $+z$ 方向传播的波：

$$
\dot{\vec E}(z)=\dot{\vec E}_m e^{-jkz}
$$

$$
\dot{\vec H}(z)=\dot{\vec H}_m e^{-jkz}
$$

瞬时电场为：

$$
\vec E(z,t)=\operatorname{Re}[\dot{\vec E}(z)e^{j\omega t}]
$$

若某一分量为 $E_i(z)=E_{im}e^{j\phi_i}e^{-jkz}$，则：

$$
E_i(z,t)=E_{im}\cos{(\omega t-kz+\phi_i)}
$$

:::: definition
**横电磁波 Transverse Electromagnetic Wave, TEM Wave**：场矢量没有传播方向上的分量。若波沿 $z$ 方向传播，$\dot{\vec E}$ 和 $\dot{\vec H}$ 都只在横截面内振动，满足：

$$
\vec e_z\cdot \dot{\vec E}=0,\qquad \vec e_z\cdot \dot{\vec H}=0
$$
::::

下面从法拉第定律导出本征阻抗。设电场沿 $x$ 方向：$\dot{\vec E}=\vec e_x E_0 e^{-jkz}$。由 $\nabla\times\dot{\vec E}=-j\omega\mu\dot{\vec H}$：

$$
\nabla\times\dot{\vec E}
=\vec e_y\frac{\partial}{\partial z}(E_0 e^{-jkz})
=\vec e_y(-jk)E_0 e^{-jkz}
$$

所以：

$$
\dot{\vec H}=\vec e_y\frac{k}{\omega\mu}E_0 e^{-jkz}
$$

代入 $k=\omega\sqrt{\mu\varepsilon}$：

$$
\frac{k}{\omega\mu}
=\frac{\omega\sqrt{\mu\varepsilon}}{\omega\mu}
=\sqrt{\frac{\varepsilon}{\mu}}
=\frac{1}{\eta}
$$

因此 $\dot{\vec H}=\vec e_y\frac{1}{\eta}E_0 e^{-jkz}$，电场与磁场振幅之比为 $\eta$。

:::: definition 
**本征阻抗 Intrinsic Impedance** 也叫波阻抗，定义为平面波中电场振幅与磁场振幅之比：

$$
\eta=\frac{|E|}{|H|}=\sqrt{\frac{\mu}{\varepsilon}}
$$
::::

真空中：

$$
\eta_0=\sqrt{\frac{\mu_0}{\varepsilon_0}}\approx377\ \Omega
$$

推广到任意取向：对沿 $\vec e_n$ 方向传播的均匀平面波，由 Maxwell 方程可得 $\dot{\vec E},\dot{\vec H},\vec e_n$ 的右手关系：

$$
\boxed{
\dot{\vec E}=-\eta\,\vec e_n\times\dot{\vec H},
\qquad
\dot{\vec H}=\frac{1}{\eta}\vec e_n\times\dot{\vec E}
}
$$

![理想介质中 E、H、k 的右手关系](<EMFT Chapter 8 P I.attachments/ehk-right-hand.jpg>)

> [!IMPORTANT]
> 在理想介质中，均匀平面波满足：
>
> $$
> \vec k\cdot\vec E=0,\qquad
> \vec k\cdot\vec H=0,\qquad
> \vec E\cdot\vec H=0
> $$
>
> $\dot{\vec E},\dot{\vec H},\vec k$ 两两垂直，并满足右手螺旋关系。电场与磁场同相，振幅相差 $\eta$ 倍。

这组关系用于从一个场求另一个场。已知传播方向和 $\dot{\vec E}$ 时，用 $\dot{\vec H}=\dfrac{1}{\eta}\vec e_n\times\dot{\vec E}$；已知传播方向和 $\dot{\vec H}$ 时，用 $\dot{\vec E}=-\eta\vec e_n\times\dot{\vec H}$。


---

### 8-1-4 任意传播方向的平面波

若传播方向单位矢量为 $\vec e_n$，则任意位置 $\vec r$ 在传播方向上的投影为：

$$
z'=\vec e_n\cdot\vec r
$$

于是沿 $\vec e_n$ 方向传播的均匀平面波为：

$$
\dot{\vec E}(\vec r)=\dot{\vec E}_m e^{-jk\vec e_n\cdot\vec r}
$$

:::: definition
**波矢 Wave Vector** 定义为波数与传播方向单位矢量的乘积：

$$
\vec k=k\vec e_n
$$
::::

则：

$$
\dot{\vec E}(\vec r)=\dot{\vec E}_m e^{-j\vec k\cdot\vec r}
$$

$$
\dot{\vec H}(\vec r)=\dot{\vec H}_m e^{-j\vec k\cdot\vec r}
$$

由于：

$$
\nabla e^{-j\vec k\cdot\vec r}=-j\vec k e^{-j\vec k\cdot\vec r}
$$

所以对这种平面波，形式上可以记为：

$$
\nabla\rightarrow -j\vec k
$$

代入无源区 Maxwell 方程：

$$
\left\{
\begin{aligned}
\nabla\times\dot{\vec H}&=j\omega\dot{\vec D}\\
\nabla\times\dot{\vec E}&=-j\omega\dot{\vec B}\\
\nabla\cdot\dot{\vec D}&=0\\
\nabla\cdot\dot{\vec B}&=0
\end{aligned}
\right.
$$

得到：

$$
\left\{
\begin{aligned}
\vec k\times\dot{\vec H}_m&=-\omega\dot{\vec D}_m\\
\vec k\times\dot{\vec E}_m&=\omega\dot{\vec B}_m\\
\vec k\cdot\dot{\vec D}_m&=0\\
\vec k\cdot\dot{\vec B}_m&=0
\end{aligned}
\right.
$$

**任意方向传播的均匀平面波**

:::: stem
空气中某均匀平面波的磁场强度复矢量为：

$$
\dot{\vec H}=(-\vec e_xA+2\vec e_y+4\vec e_z)e^{-j\pi(4x+3z)}
$$

求：

1. $\vec k$；
2. $\lambda$ 与 $f$；
3. 常数 $A$；
4. 电场复矢量 $\dot{\vec E}$。
::::

:::: solution
由相位项可知：

$$
\vec k\cdot\vec r=4\pi x+3\pi z
$$

所以：

$$
\vec k=4\pi\vec e_x+3\pi\vec e_z
$$

其大小为：

$$
k=\sqrt{(4\pi)^2+(3\pi)^2}=5\pi
$$

故：

$$
\lambda=\frac{2\pi}{k}=\frac{2}{5}\ \mathrm{m}
$$

$$
f=\frac{c}{\lambda}=7.5\times10^8\ \mathrm{Hz}
$$

由于均匀平面波满足：

$$
\vec k\cdot\dot{\vec H}_m=0
$$

代入：

$$
4\pi(-A)+3\pi\cdot4=0
$$

得：

$$
A=3
$$

传播方向单位矢量为：

$$
\vec e_n=\frac{\vec k}{k}=\frac45\vec e_x+\frac35\vec e_z
$$

空气中 $\eta_0=120\pi\ \Omega$，由

$$
\dot{\vec E}=-\eta_0\vec e_n\times\dot{\vec H}
$$

可得：

$$
\dot{\vec E}
=120\pi(1.2\vec e_x+5\vec e_y-1.6\vec e_z)
e^{-j\pi(4x+3z)}
$$
::::

---

### 8-1-5 传播参数 Propagation Parameters

#### 1. 角频率、频率与周期

:::: definition
**角频率 Angular Frequency** 表示单位时间内相位变化量：

$$
\omega\quad \mathrm{rad/s}
$$
::::

**周期 Period** $T$ 为同一点处相位变化 $2\pi$ 所需时间：

$$
\omega T=2\pi
$$

故：

$$
T=\frac{2\pi}{\omega}
$$

频率为：

$$
f=\frac{1}{T}=\frac{\omega}{2\pi}
$$

#### 2. 波长与相位常数

:::: definition
**波长 Wavelength** 是同一时刻，相位相差 $2\pi$ 的两个等相位面之间的距离。
::::

由：

$$
k\lambda=2\pi
$$

可得：

$$
\lambda=\frac{2\pi}{k}
$$

相位常数又称波数：

$$
k=\frac{2\pi}{\lambda}=\omega\sqrt{\mu\varepsilon}
$$


#### 3. 相速度

:::: definition
**相速度 Phase Velocity** 是等相位面移动的速度。
::::

令：

$$
\omega t-kz=C
$$

两边微分：

$$
\omega dt-kdz=0
$$

所以：

$$
v_p=\frac{dz}{dt}=\frac{\omega}{k}=\frac{1}{\sqrt{\mu\varepsilon}}
$$

在真空中：

$$
v_p=c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}=3\times10^8\ \mathrm{m/s}
$$

理想介质中 $v_p$ 与频率无关，因此理想介质无色散。

---

### 8-1-6 电磁波的极化 Polarization

极化描述固定空间点处电场矢量端点随时间的运动轨迹。

:::: definition
**极化 Polarization**：在空间某固定点处，电场矢量 $\vec E(t)$ 的端点随时间变化所形成的轨迹。
::::

对沿 $+z$ 方向传播的均匀平面波：

$$
\vec E(z,t)=\vec e_xE_x(t)+\vec e_yE_y(t)
$$

其中：

$$
\left\{
\begin{aligned}
E_x(t)&=E_{xm}\cos{(\omega t-kz+\phi_x)}\\
E_y(t)&=E_{ym}\cos{(\omega t-kz+\phi_y)}
\end{aligned}
\right.
$$

极化方式由两个量决定：

- 两个正交分量的振幅 $E_{xm},E_{ym}$；
- 初相差 $\Delta\phi=\phi_y-\phi_x$。

![alt text](<EMFT Chapter 8 P I.attachments/1780208249429.png>)

#### 1. 线极化 Linear Polarization



当：

$$
\Delta\phi=0\quad \text{or}\quad \pm\pi
$$

两正交分量同相或反相，电场端点轨迹为一条直线。

因此：

$$
\Delta\phi=0,\ \pm\pi \quad \Longrightarrow \quad \text{线极化}
$$

此时电场方向固定，大小随时间变化。

#### 2. 圆极化 Circular Polarization



当两个正交分量振幅相等，并且相位差为 $\pm\pi/2$：

$$
E_{xm}=E_{ym}=E_m
$$

$$
\Delta\phi=\pm\frac{\pi}{2}
$$

电场端点轨迹为圆：

$$
E_x^2+E_y^2=E_m^2
$$

对沿 $+z$ 传播的波，本课采用的约定为：

$$
\Delta\phi=\frac{\pi}{2}\quad \Longrightarrow\quad \text{左旋圆极化 LHCP}
$$

$$
\Delta\phi=-\frac{\pi}{2}\quad \Longrightarrow\quad \text{右旋圆极化 RHCP}
$$

> [!TIP]
> 判断顺序：先确认振幅是否相等、相位差是否为 $\pm\pi/2$（圆极化条件），再判定旋向。跳过第一步直接判旋向容易误判。

#### 3. 椭圆极化 Elliptical Polarization

![椭圆极化](<EMFT Chapter 8 P I.attachments/elliptical-polarization.jpg>)

一般情况下，两个正交线极化波合成后得到椭圆极化。

其轨迹方程为：

$$
\frac{E_x^2}{E_{xm}^2}
+\frac{E_y^2}{E_{ym}^2}
-\frac{2E_xE_y}{E_{xm}E_{ym}}\cos\Delta\phi
=\sin^2\Delta\phi
$$

当相位差既不为 $0,\pm\pi$，又不满足圆极化条件时，通常为椭圆极化。

对沿 $+z$ 方向传播的波：

$$
0<\Delta\phi<\pi
\quad\Longrightarrow\quad
\text{左旋椭圆极化}
$$

$$
-\pi<\Delta\phi<0
\quad\Longrightarrow\quad
\text{右旋椭圆极化}
$$

#### 4. 极化分解

任意极化的均匀平面波都可以分解为两个正交线极化波。

任意极化波也可以分解为左旋圆极化波与右旋圆极化波的叠加。

例如，线极化波可以分解为两个等幅、反旋向的圆极化波：

$$
\dot{\vec E}=\vec e_xE_me^{-jkz}
$$

$$
\dot{\vec E}
=(\vec e_x+j\vec e_y)\frac{E_m}{2}e^{-jkz}
+(\vec e_x-j\vec e_y)\frac{E_m}{2}e^{-jkz}
$$

#### 5. 极化判断步骤

1. 写出 $E_x,E_y$ 两个正交分量；
2. 统一成余弦形式；
3. 读出 $E_{xm},E_{ym},\phi_x,\phi_y$；
4. 计算 $\Delta\phi=\phi_y-\phi_x$；
5. 先判断线极化、圆极化、椭圆极化，再判断左右旋。

**极化方式判断**

:::: stem
判断下列平面波的极化方式：

$$
(1)\quad
\dot{\vec E}=\vec e_xE_me^{-jkz}-j\vec e_yE_me^{-jkz}
$$

$$
(2)\quad
\dot{\vec E}=\vec e_xE_m\sin\left(\omega t-kz+\frac{\pi}{4}\right)
+\vec e_yE_m\cos\left(\omega t-kz-\frac{\pi}{4}\right)
$$

$$
(3)\quad
\dot{\vec E}=\vec e_xE_m\sin{(\omega t+kz)}
+2\vec e_yE_m\cos{(\omega t+kz)}
$$
::::

:::: solution
**(1)**：

$$
E_{xm}=E_{ym}=E_m,\qquad
\phi_x=0,\qquad
\phi_y=-\frac{\pi}{2}
$$

所以：

$$
\Delta\phi=-\frac{\pi}{2}
$$

沿 $+z$ 方向传播，故为：

$$
\text{右旋圆极化 RHCP}
$$

**(2)**：

把正弦改成余弦：

$$
\sin\left(\omega t-kz+\frac{\pi}{4}\right)
=\cos\left(\omega t-kz-\frac{\pi}{4}\right)
$$

两个分量相位相同：

$$
\Delta\phi=0
$$

故为：

$$
\text{线极化}
$$

**(3)**：

该波相位为 $\omega t+kz$，沿 $-z$ 方向传播。

两个分量振幅不等：

$$
E_{xm}\ne E_{ym}
$$

并且：

$$
\phi_x=-\frac{\pi}{2},\qquad \phi_y=0
$$

所以：

$$
\Delta\phi=\frac{\pi}{2}
$$

对 $-z$ 方向传播，旋向与 $+z$ 情形相反，因此为：

$$
\text{右旋椭圆极化}
$$
::::

## 8-2 有损媒质中的平面波 Plane Waves in Lossy Media

> [!NOTE]
> 有损介质中，电磁波的传播有三种等价的数学描述，本质是同一物理规律在不同表示下的形式：
>
> **波动方程 Wave Equation**（时域，直接对 $\vec E,\vec H$）：
>
> $$
> \nabla^2\vec E-\mu\sigma\frac{\partial\vec E}{\partial t}-\mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}=0
> $$
>
> 无损时 $\sigma=0$，只剩第二项 $\nabla^2\vec E-\mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}=0$。有损只是多了一个一阶时间导数项 $-\mu\sigma\frac{\partial\vec E}{\partial t}$。
>
> **亥姆霍兹方程 Helmholtz Equation**（频域/相量形式）：
>
> $$
> \nabla^2\dot{\vec E}+k_c^2\dot{\vec E}=0
> $$
>
> 用 $k_c=\beta-j\alpha$ 替代实数 $k$，适合单频稳态问题（平面波、边界条件）。
>
> **达朗贝尔方程 d'Alembert Equation**（对位函数 $\vec A,\phi$，含源）：
>
> $$
> \nabla^2\vec A-\mu\sigma\frac{\partial\vec A}{\partial t}-\mu\varepsilon\frac{\partial^2\vec A}{\partial t^2}=-\mu\vec J_s
> $$
>
> $$
> \nabla^2\phi-\mu\sigma\frac{\partial\phi}{\partial t}-\mu\varepsilon\frac{\partial^2\phi}{\partial t^2}=-\frac{\rho_s}{\varepsilon}
> $$
>
> 用广义洛伦兹规范 $\nabla\cdot\vec A+\mu\sigma\phi+\mu\varepsilon\frac{\partial\phi}{\partial t}=0$ 使方程解耦。适合从源 $\vec J_s,\rho_s$ 出发求场。
>
> 三者算符结构一致（$\nabla^2-\mu\sigma\frac{\partial}{\partial t}-\mu\varepsilon\frac{\partial^2}{\partial t^2}$），只是作用对象不同——$\vec E,\vec H$ 或 $\vec A,\phi$。

### 8-2-1 基本形式 Basic Form

从有损媒质的波动方程出发。对一般媒质（$\sigma$ 未必为零），$\vec E$ 满足：

$$
\nabla^2\vec E-\mu\sigma\frac{\partial\vec E}{\partial t}-\mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}=0
$$

对时谐场，$\partial/\partial t\to j\omega$，代入整理：

$$
\nabla^2\dot{\vec E}-\mu\sigma(j\omega)\dot{\vec E}-\mu\varepsilon(j\omega)^2\dot{\vec E}=0
$$

$$
\nabla^2\dot{\vec E}+\omega^2\mu\left(\varepsilon-j\frac{\sigma}{\omega}\right)\dot{\vec E}=0
$$

括号内正是位移电流与传导电流的合并因子。将其定义为**复介电常数**：

:::: definition
**复介电常数 Complex Permittivity** 把位移电流与传导电流合并到同一个参数中：

$$
\varepsilon_c=\varepsilon-j\frac{\sigma}{\omega}
$$
::::

代入得亥姆霍兹方程的统一形式：

$$
\boxed{\nabla^2\dot{\vec E}+k_c^2\dot{\vec E}=0}
$$

其中 $k_c$ 由复介电常数决定：

:::: definition
**复波数 Complex Wave Number** 由复介电常数定义的波数，统一描述相位变化与衰减：

$$
k_c=\omega\sqrt{\mu\varepsilon_c}
$$
::::

$k_c$ 同时覆盖了无损和有损两种情况：

- **无损介质**（$\sigma=0$）：$\varepsilon_c=\varepsilon$，$k_c=\omega\sqrt{\mu\varepsilon}=k=\beta$，波数为纯实数；
- **有损介质**（$\sigma\ne0$）：$k_c$ 为复数，写成 $k_c=\beta-j\alpha$。

实际使用中常用另一种写法。令 $\gamma=jk_c$：

:::: definition
**传播常数 Propagation Constant** 将复波数旋转到实部为衰减、虚部为相位的坐标系：

$$
\gamma=jk_c=\alpha+j\beta
$$
::::

其中 $\alpha$ 为衰减常数（Np/m），$\beta$ 为相位常数（rad/m）。

对沿 $\vec e_n$ 方向传播的波，亥姆霍兹方程的解为：

$$
\boxed{\dot{\vec E}(\vec r)=\dot{\vec E}_0 e^{-jk_c\vec e_n\cdot\vec r}
=\dot{\vec E}_0 e^{-\gamma\vec e_n\cdot\vec r}}
$$

展开即：

$$
\dot{\vec E}(\vec r)=\dot{\vec E}_0 e^{-\alpha\vec e_n\cdot\vec r}
e^{-j\beta\vec e_n\cdot\vec r}
$$

$e^{-\alpha\,\cdot}$ 控制振幅衰减，$e^{-j\beta\,\cdot}$ 控制相位变化。无损时 $\alpha=0$，自动退化为 8-1 中的 $\dot{\vec E}(\vec r)=\dot{\vec E}_0 e^{-j\beta\vec e_n\cdot\vec r}$。

![alt text](<EMFT Chapter 8 P I.attachments/1780473917359.png>)

---

### 8-2-2 导电媒质中的均匀平面波

沿用 8-2-1 定义的 $\gamma=\alpha+j\beta$。若波沿 $+z$ 方向传播：

$$
\dot{\vec E}(z)=\dot{\vec E}_me^{-jk_cz}
$$

即：

$$
\dot{\vec E}(z)=\dot{\vec E}_me^{-\gamma z}
=\dot{\vec E}_me^{-\alpha z}e^{-j\beta z}
$$

对应瞬时形式可写为：

$$
\vec E(z,t)=\dot{\vec E}_me^{-\alpha z}\cos{(\omega t-\beta z)}
$$

其中：

- $e^{-\alpha z}$：衰减因子；
- $\alpha$：衰减常数，单位 $\mathrm{Np/m}$；
- $e^{-j\beta z}$：相位因子；
- $\beta$：相位常数，单位 $\mathrm{rad/m}$。

导电媒质中的波在传播的同时不断衰减。

> [!NOTE]
> 有损介质中，$\gamma=\alpha+j\beta$ 将两个物理效应分开：
>
> $$
> \vec E(z,t)=\vec E_0 e^{-\alpha z}\cos{(\omega t-\beta z)}
> $$
>
> $$
> \dot{ \vec E}(z) = \vec E_0 e^{-(\alpha + j \beta) z}
> $$
>
> **$\alpha$**：控制振幅衰减。传播 $z=1/\alpha$ 后振幅降至 $1/e\approx 36.8\%$。$1\ \mathrm{Np}\approx 8.686\ \mathrm{dB}$。$\alpha$ 越大，介质损耗越强，波传得越浅。
>
> **$\beta$**：控制空间相位变化。与波长的关系为 $\lambda=2\pi/\beta$，与相速度的关系为 $v_p=\omega/\beta$。$\beta$ 越大，波长越短，相位变得越快。
>
> 两者由同一复传播常数 $\gamma^2=j\omega\mu(\sigma+j\omega\varepsilon)$ 决定，具体取值与 $\sigma/(\omega\varepsilon)$ 密切相关（见 8-2-4、8-2-5 的近似）。核心形式：
>
> $$
> \boxed{\alpha:\ \text{振幅衰减}}\qquad
> \boxed{\beta:\ \text{相位变化}}
> $$

---

### 8-2-3 传播常数与本征阻抗

有损媒质中的磁场仍可由：

$$
\dot{\vec H}=\frac{1}{\eta_c}\vec e_z\times\dot{\vec E}
$$

得到。

但此时本征阻抗为复数：

$$
\eta_c=\sqrt{\frac{\mu}{\varepsilon_c}}
=|\eta_c|e^{j\phi}
$$

因此磁场为：

$$
\dot{\vec H}(z)
=\frac{1}{|\eta_c|}\vec e_z\times\dot{\vec E}_m
e^{-\alpha z}e^{-j(\beta z+\phi)}
$$

瞬时形式为：

$$
\vec H(z,t)
=\frac{\vec e_z\times\dot{\vec E}_m}{|\eta_c|}
e^{-\alpha z}\cos{(\omega t-\beta z-\phi)}
$$

![理想介质中 E 与 H 同相](<EMFT Chapter 8 P I.attachments/ideal-medium-eh.jpg>)

![导电媒质中 E 与 H 不同相](<EMFT Chapter 8 P I.attachments/lossy-medium-eh.jpg>)

在导电媒质中，$\dot{\vec E}$ 与 $\dot{\vec H}$ 不再同相。若 $\eta_c=|\eta_c|e^{j\phi}$，则磁场相对电场滞后 $\phi$。

传播参数由：

$$
k_c^2=\omega^2\mu\left(\varepsilon-j\frac{\sigma}{\omega}\right)
$$

以及：

$$
k_c^2=(\beta-j\alpha)^2
=\beta^2-\alpha^2-j2\alpha\beta
$$

比较实部与虚部：

$$
\left\{
\begin{aligned}
\beta^2-\alpha^2&=\omega^2\mu\varepsilon\\
2\alpha\beta&=\omega\mu\sigma
\end{aligned}
\right.
$$

解得：

$$
\alpha
=\omega\sqrt{
\frac{\mu\varepsilon}{2}
\left[
\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}-1
\right]
}
$$

$$
\beta
=\omega\sqrt{
\frac{\mu\varepsilon}{2}
\left[
\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}+1
\right]
}
$$

于是：

$$
\lambda=\frac{2\pi}{\beta}
$$

$$
v_p=\frac{\omega}{\beta}
$$

有损媒质中 $\beta$ 与频率相关，所以相速度也与频率相关，对应为色散。

---

### 8-2-4 低损耗介质 Low-Loss Dielectrics

:::: definition
**低损耗介质 Low-Loss Dielectrics** 满足：

$$
\frac{\sigma}{\omega\varepsilon}\ll1
$$
::::

利用近似：

$$
(1+x)^{1/2}\approx1+\frac{x}{2}
$$

可得：

$$
\gamma
=j\omega\sqrt{\mu\varepsilon}
\left(1+\frac{\sigma}{j\omega\varepsilon}\right)^{1/2}
\approx
j\omega\sqrt{\mu\varepsilon}
+\frac{\sigma}{2}\sqrt{\frac{\mu}{\varepsilon}}
$$

因此：

$$
\alpha\approx\frac{\sigma}{2}\sqrt{\frac{\mu}{\varepsilon}}
$$

$$
\beta\approx\omega\sqrt{\mu\varepsilon}
$$

本征阻抗近似为：

$$
\eta_c
\approx
\sqrt{\frac{\mu}{\varepsilon}}
\left(1+j\frac{\sigma}{2\omega\varepsilon}\right)
$$

低损耗介质中的相位常数接近理想介质，主要多了一个较小的衰减。

---

### 8-2-5 良导体 Good Conductor

:::: definition
**良导体 Good Conductor** 满足：

$$
\frac{\sigma}{\omega\varepsilon}\gg1
$$
::::

此时：

$$
\gamma
=j\omega\sqrt{\mu\varepsilon}
\left(1-j\frac{\sigma}{\omega\varepsilon}\right)^{1/2}
\approx
\sqrt{j\omega\mu\sigma}
$$

由于：

$$
\sqrt{j}=e^{j45^\circ}
$$

所以：

$$
\gamma
\approx
\sqrt{\omega\mu\sigma}e^{j45^\circ}
=\sqrt{\frac{\omega\mu\sigma}{2}}(1+j)
$$

于是：

$$
\boxed{
\alpha\approx\beta\approx
\sqrt{\frac{\omega\mu\sigma}{2}}
=\sqrt{\pi f\mu\sigma}
}
$$

相速度：

$$
v_p=\frac{\omega}{\beta}
\approx
\sqrt{\frac{2\omega}{\mu\sigma}}
$$

波长：

$$
\lambda=\frac{2\pi}{\beta}
\approx
2\sqrt{\frac{\pi}{f\mu\sigma}}
$$

本征阻抗：

$$
\eta_c
\approx
(1+j)\sqrt{\frac{\pi f\mu}{\sigma}}
$$

良导体中 $\eta_c$ 的相位为 $45^\circ$，所以磁场相对电场滞后 $45^\circ$。

---

### 8-2-6 趋肤深度与工程含义

:::: definition
**趋肤效应 Skin Effect**：频率越高，导体中的衰减常数越大，电磁波和高频电流越集中在导体表面附近。

**趋肤深度 Skin Depth** $\delta$：场强衰减到表面值 $1/e$ 时对应的深度。
::::

由定义：

$$
E_me^{-\alpha\delta}=\frac{E_m}{e}
$$

所以：

$$
\alpha\delta=1
$$

$$
\delta=\frac{1}{\alpha}
$$

对良导体：

$$
\boxed{
\delta=\frac{1}{\sqrt{\pi f\mu\sigma}}
}
$$

![趋肤深度示意](<EMFT Chapter 8 P I.attachments/skin-depth.jpg>)

:::: definition
**表面阻抗 Surface Impedance** 表示良导体表面切向电场与表面电流密度之间的等效阻抗：

$$
Z_s=R_s+jX_s
=(1+j)\frac{1}{\sigma\delta}
=(1+j)\sqrt{\frac{\pi f\mu}{\sigma}}
$$
::::

几个直接结论：

- $f$ 越高，$\delta$ 越小；
- $\mu$ 越大，$\delta$ 越小；
- $\sigma$ 越大，$\delta$ 越小；
- 高频电流主要走表面，因此空心铜管、多股绝缘细线、表面镀银都有意义。

> [!TIP]
> 高频电流集中在导体表面，导线中心区域几乎不承载电流。利用趋肤效应可减少导体材料用量（空心铜管、镀银导线），但趋肤深度减小也意味着高频交流电阻增大。

**海水中的电磁波衰减**

:::: stem
海水参数为：

$$
\varepsilon_r=81,\qquad \mu_r=1,\qquad \sigma=4\ \mathrm{S/m}
$$

若电磁波频率为 $f=5\ \mathrm{MHz}$，判断其在海水中的传播特性，并估算衰减到 $10^{-6}$ 所需距离。
::::

:::: solution
角频率为：

$$
\omega=2\pi f=10^7\pi\ \mathrm{rad/s}
$$

海水中：

$$
\frac{\sigma}{\omega\varepsilon}\gg1
$$

所以可按良导体处理。

衰减常数：

$$
\alpha=\sqrt{\pi f\mu\sigma}
$$

代入可得：

$$
\alpha\approx8.89\ \mathrm{Np/m}
$$

若场强衰减到 $10^{-6}$：

$$
e^{-\alpha z}=10^{-6}
$$

故：

$$
z=\frac{6\ln10}{\alpha}
\approx1.55\ \mathrm{m}
$$

高频电磁波在海水里衰减很快，因此潜艇通信必须使用极低频率。
::::

## 8-3 电磁功率流与坡印廷矢量 Poynting Vector

### 8-3-1 能量流与电磁能量守恒 Energy Flow and Conservation

时变电磁场中，能量可以在空间中流动。描述这个流动的量为坡印廷矢量。

![能量流入控制体](<EMFT Chapter 8 P I.attachments/energy-flow-wide.jpg>)

对一个体积 $V$，能量关系可以写成：

$$
\text{流入 }V\text{ 的能量}
=
\text{体内电磁能增加}
+
\text{体内损耗}
$$

即：

$$
P_{\mathrm{in}}=\frac{dW}{dt}+P_{\mathrm{loss}}
$$

:::: definition
**电磁能量密度 Electromagnetic Energy Density** 由电场能量密度与磁场能量密度组成。
::::

电场能量密度：

$$
w_e=\frac12\vec E\cdot\vec D
$$

磁场能量密度：

$$
w_m=\frac12\vec H\cdot\vec B
$$

总电磁能量密度：

$$
w=w_e+w_m
=\frac12\vec E\cdot\vec D+\frac12\vec H\cdot\vec B
$$

体积 $V$ 内储存的总电磁能量：

$$
W=\int_Vw\,dV
=\int_V
\left(
\frac12\vec E\cdot\vec D+\frac12\vec H\cdot\vec B
\right)dV
$$

当电磁场随时间变化时，空间各点的能量密度也随时间变化，所以能量会发生流动。

---

### 8-3-2 坡印廷定理 Poynting Theorem

由 Maxwell 方程：

$$
\left\{
\begin{aligned}
\nabla\times\vec H&=\vec J+\frac{\partial\vec D}{\partial t}\\
\nabla\times\vec E&=-\frac{\partial\vec B}{\partial t}
\end{aligned}
\right.
$$

两式分别点乘 $\vec E$ 与 $\vec H$：

$$
\vec E\cdot(\nabla\times\vec H)
=\vec E\cdot\vec J+\vec E\cdot\frac{\partial\vec D}{\partial t}
$$

$$
\vec H\cdot(\nabla\times\vec E)
=-\vec H\cdot\frac{\partial\vec B}{\partial t}
$$

两式相减：

$$
\vec E\cdot(\nabla\times\vec H)
-\vec H\cdot(\nabla\times\vec E)
=
\vec E\cdot\vec J
+\vec E\cdot\frac{\partial\vec D}{\partial t}
+\vec H\cdot\frac{\partial\vec B}{\partial t}
$$

使用矢量恒等式：

$$
\nabla\cdot(\vec E\times\vec H)
=
\vec H\cdot(\nabla\times\vec E)
-\vec E\cdot(\nabla\times\vec H)
$$

并且在线性媒质中：

$$
\vec E\cdot\frac{\partial\vec D}{\partial t}
=\frac12\frac{\partial}{\partial t}(\vec E\cdot\vec D)
$$

$$
\vec H\cdot\frac{\partial\vec B}{\partial t}
=\frac12\frac{\partial}{\partial t}(\vec H\cdot\vec B)
$$

可得坡印廷定理微分形式：

$$
\boxed{
-\nabla\cdot(\vec E\times\vec H)
=
\frac{\partial}{\partial t}
\left(
\frac12\vec E\cdot\vec D
+\frac12\vec H\cdot\vec B
\right)
+\vec E\cdot\vec J
}
$$

积分形式为：

$$
-\oiint_S(\vec E\times\vec H)\cdot d\vec S
=
\frac{d}{dt}
\int_V
\left(
\frac12\vec E\cdot\vec D
+\frac12\vec H\cdot\vec B
\right)dV
+
\int_V\vec E\cdot\vec J\,dV
$$

右侧第一项是体内电磁能增加率，第二项是焦耳损耗功率。

左侧前面的负号来自外法线方向。$\oiint_S\vec S\cdot d\vec S$ 表示从闭合面向外流出的功率，因此加上负号后表示流入体积 $V$ 的功率。

---

### 8-3-3 坡印廷矢量 Poynting Vector

:::: definition
**坡印廷矢量 Poynting Vector** 定义为：

$$
\vec S=\vec E\times\vec H
$$

单位：

$$
\mathrm{W/m^2}
$$
::::

![坡印廷矢量方向关系](<EMFT Chapter 8 P I.attachments/poynting-vector-wide.jpg>)

其物理意义：

- $\vec S$ 的方向：电磁能量传播方向；
- $|\vec S|$：垂直于能量传播方向的单位面积功率流。

它不是新的场源，而是由已有的 $\vec E$ 与 $\vec H$ 共同决定的能流密度。只有电场和磁场同时存在，并且方向不平行时，才会形成非零的电磁功率流。

对理想介质中的均匀平面波：

$$
\vec H=\frac{1}{\eta}\vec e_n\times\vec E
$$

于是：

$$
\vec S
=\vec E\times\vec H
=\vec e_n\frac{1}{\eta}|\vec E|^2
$$

也可以写成：

$$
\vec S=\vec e_n\frac{1}{\eta}|\vec E(\vec r,t)|^2
=\vec e_n\eta|\vec H(\vec r,t)|^2
$$

理想介质中，电场能量密度与磁场能量密度相等：

$$
w_e=w_m
$$

所以：

$$
w=2w_e=2w_m
$$

即：

$$
w=\varepsilon|\vec E(\vec r,t)|^2
=\mu|\vec H(\vec r,t)|^2
$$

:::: definition
**能量速度 Energy Velocity** 定义为能流密度与能量密度之比：

$$
\vec v_e=\frac{\vec S}{w}
$$
::::

代入可得：

$$
\vec v_e=\vec v_p=\vec e_n\frac{1}{\sqrt{\mu\varepsilon}}
$$

理想介质中，均匀平面波的能量速度等于相速度。

---

### 8-3-4 平均能流密度

瞬时坡印廷矢量必须使用实数形式：

$$
\vec S(\vec r,t)
=\vec E(\vec r,t)\times\vec H(\vec r,t)
$$

即：

$$
\vec S(\vec r,t)
=
\operatorname{Re}[\dot{\vec E}(\vec r)e^{j\omega t}]
\times
\operatorname{Re}[\dot{\vec H}(\vec r)e^{j\omega t}]
$$

如果求时间平均值，则可以直接用复矢量。对周期函数：

$$
A_{\mathrm{av}}(\vec r)
=\frac{1}{T}\int_0^T A(\vec r,t)\,dt
$$

| 物理量 | 一般形式 | 线性媒质中 |
|--------|---------|-----------|
| 平均坡印廷矢量 | $\displaystyle \vec S_{\mathrm{av}}=\frac12\operatorname{Re}[\dot{\vec E}\times\dot{\vec H}^*]$ | — |
| 平均电场能量密度 | $\displaystyle w_{E,\mathrm{av}}=\frac14\operatorname{Re}[\dot{\vec D}\cdot\dot{\vec E}^*]$ | $\displaystyle w_{E,\mathrm{av}}=\frac14\varepsilon'\dot{\vec E}\cdot\dot{\vec E}^*$ |
| 平均磁场能量密度 | $\displaystyle w_{M,\mathrm{av}}=\frac14\operatorname{Re}[\dot{\vec B}\cdot\dot{\vec H}^*]$ | — |
| 平均焦耳损耗功率密度 | $\displaystyle p_{J,\mathrm{av}}=\frac12\sigma\dot{\vec E}\cdot\dot{\vec E}^*$ | — |

> [!WARNING]
> 瞬时量必须用实数场计算；求时均值才可直接使用复矢量公式，注意 $\vec S_{\mathrm{av}}$ 中的 $\dfrac12$ 因子。

**平均功率计算**

:::: stem
自由空间中平面波电场为：

$$
\vec E=\vec e_x50\cos{(\omega t-kz)}\ \mathrm{V/m}
$$

求其垂直穿过半径 $R=2.5\ \mathrm{m}$ 圆面的平均功率。
::::

:::: solution
复电场为：

$$
\dot{\vec E}=\vec e_x50e^{-jkz}
$$

自由空间本征阻抗：

$$
\eta_0=120\pi\ \Omega
$$

磁场复矢量：

$$
\dot{\vec H}=\vec e_y\frac{50}{120\pi}e^{-jkz}
=\vec e_y\frac{5}{12\pi}e^{-jkz}\ \mathrm{A/m}
$$

平均坡印廷矢量：

$$
\vec S_{\mathrm{av}}
=\frac12\operatorname{Re}(\dot{\vec E}\times\dot{\vec H}^*)
$$

$$
=\vec e_z
\frac12\cdot50\cdot\frac{5}{12\pi}
$$

即：

$$
\vec S_{\mathrm{av}}
=\vec e_z\frac{125}{12\pi}\ \mathrm{W/m^2}
$$

圆面面积：

$$
A=\pi R^2=\pi(2.5)^2
$$

所以平均功率：

$$
P_{\mathrm{av}}
=\frac{125}{12\pi}\cdot\pi(2.5)^2
$$

$$
P_{\mathrm{av}}\approx65.1\ \mathrm{W}
$$
::::


## 总结 Summary


1. 无损媒质中，均匀平面波满足 TEM 特性，$\dot{\vec E},\dot{\vec H},\vec k$ 两两垂直，并且 $\dot{\vec E}$ 与 $\dot{\vec H}$ 同相；
2. 任意方向传播时，核心表达式是 $e^{-j\vec k\cdot\vec r}$；
3. 极化看固定点处电场矢量端点轨迹，由振幅和相位差决定；
4. 有损媒质中，$k_c=\beta-j\alpha$，波传播时同时发生相位变化与指数衰减；
5. 良导体中 $\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}$，趋肤深度 $\delta=1/\alpha$；
6. 电磁能量流用坡印廷矢量 $\vec S=\vec E\times\vec H$ 描述，平均功率用 $\frac12\operatorname{Re}(\dot{\vec E}\times\dot{\vec H}^*)$。

### 平面波参数列表

| 类别 | 参数 | 含义 | 常用关系 / 用法 |
| --- | --- | --- | --- |
| 阻抗 | $\eta,\eta_c,\eta_0$ | 本征阻抗、复本征阻抗、自由空间本征阻抗 | 无损 $\eta=\sqrt{\mu/\varepsilon}$；$\eta_0=120\pi\ \Omega$；有损 $\eta_c=\sqrt{\mu/\varepsilon_c}=\lvert\eta_c\rvert e^{j\phi}$ |
| 空间 | $\lambda,k,\vec k$ | 波长、波数、波矢 | 无损 $k=2\pi/\lambda=\omega\sqrt{\mu\varepsilon}$，$\vec k=k\vec e_n$；相位因子为 $e^{-j\vec k\cdot\vec r}$ |
| 速度 | $v_p,\vec v_e$ | 相速度、能量速度 | 无损 $v_p=\omega/k=1/\sqrt{\mu\varepsilon}$；有损 $v_p=\omega/\beta$；理想介质中 $\vec v_e=\vec e_n/\sqrt{\mu\varepsilon}$ |
| 有损传播 | $k_c$ | 复波数 | $k_c=\omega\sqrt{\mu\varepsilon_c}=\beta-j\alpha$ |
| 有损传播 | $\gamma$ | 传播常数 | $\gamma=jk_c=\alpha+j\beta$；$\dot{\vec E}=\dot{\vec E}_0e^{-\gamma s}$ |
| 有损传播 | $\alpha$ | 衰减常数，单位 $\mathrm{Np/m}$ | 振幅因子为 $e^{-\alpha s}$；低损耗介质中 $\alpha\approx\frac{\sigma}{2}\sqrt{\frac{\mu}{\varepsilon}}$；良导体中 $\alpha\approx\sqrt{\pi f\mu\sigma}$ |
| 有损传播 | $\beta$ | 相位常数，单位 $\mathrm{rad/m}$ | 相位因子为 $e^{-j\beta s}$；$\lambda=2\pi/\beta$，$v_p=\omega/\beta$；无损时 $\beta=k$ |
| 有损传播 | $\delta$ | 趋肤深度 | $\delta=1/\alpha$；良导体中 $\delta=1/\sqrt{\pi f\mu\sigma}$ |
| 极化 | $E_{xm},E_{ym},\phi_x,\phi_y,\Delta\phi$ | 两个正交电场分量的振幅与相位差 | $\Delta\phi=\phi_y-\phi_x$；$\Delta\phi=0,\pm\pi$ 为线极化；等幅且 $\Delta\phi=\pm\pi/2$ 为圆极化 |
| 功率 | $\vec S,\vec S_{\mathrm{av}},P_{\mathrm{av}}$ | 坡印廷矢量、平均能流密度、平均功率 | $\vec S=\vec E\times\vec H$；$\vec S_{\mathrm{av}}=\frac12\operatorname{Re}(\dot{\vec E}\times\dot{\vec H}^*)$；$P_{\mathrm{av}}=\iint_S\vec S_{\mathrm{av}}\cdot d\vec S$ |
| 能量 | $w_e,w_m,w,W$ | 电场能量密度、磁场能量密度、总能量密度、总能量 | $w_e=\frac12\vec E\cdot\vec D$，$w_m=\frac12\vec H\cdot\vec B$；理想平面波中 $w=\varepsilon\lvert\vec E\rvert^2=\mu\lvert\vec H\rvert^2$ |
