# 8 Plane Electromagnetic Waves

**So, get away, another way to feel what you didn't want yourself to know,**  
**所以 那就离开吧，只为让自己不愿了解真相，**  

**And let yourself go,**  
**放任你自己走吧，**

<div align="right">——Rosa Walton / Hallie Coggins《I Really Want to Stay at Your House》</div>

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
- [8-4 平面导体边界的法向入射 Normal Incidence at a Plane Conducting Boundary](#8-4-平面导体边界的法向入射-normal-incidence-at-a-plane-conducting-boundary)
  - [8-4-1 法向入射基本模型](#8-4-1-法向入射基本模型)
  - [8-4-2 边界条件与反射透射系数](#8-4-2-边界条件与反射透射系数)
  - [8-4-3 理想导体边界 Ideal Conductor Boundary](#8-4-3-理想导体边界-ideal-conductor-boundary)
  - [8-4-4 合成场与驻波 Standing Wave](#8-4-4-合成场与驻波-standing-wave)
  - [8-4-5 表面电流与工程理解](#8-4-5-表面电流与工程理解)
- [8-5 平面介质边界的法向入射 Normal Incidence at a Plane Dielectric Boundary](#8-5-平面介质边界的法向入射-normal-incidence-at-a-plane-dielectric-boundary)
  - [8-5-1 理想介质界面](#8-5-1-理想介质界面)
  - [8-5-2 总场与行驻波 Travelling-Standing Wave](#8-5-2-总场与行驻波-travelling-standing-wave)
  - [8-5-3 驻波比 Standing-Wave Ratio](#8-5-3-驻波比-standing-wave-ratio)
  - [8-5-4 电磁能流密度](#8-5-4-电磁能流密度)
  - [8-5-5 典型例题](#8-5-5-典型例题)
  - [8-5-6 雷达低空盲区](#8-5-6-雷达低空盲区)
- [总结 Summary](#总结-summary)

## 8-1 无损媒质中的平面波 Plane Waves in Lossless Media

### 8-1-1 基本问题 Basic Issues

本章从**时谐电磁场 Time-Harmonic Field** 出发讨论电磁波传播。

时谐场的一般实数形式可以写成：

$$
A(\vec r,t)=A_0(\vec r)\cos[\omega t+\phi(\vec r)+\phi_0]
$$

其中：

- $A_0(\vec r)$：空间位置相关的振幅；
- $\omega t$：时间相位；
- $\phi(\vec r)$：空间相位；
- $\phi_0$：初相位。

用复矢量表示时：

$$
\vec E(\vec r,t)=\operatorname{Re}[\vec E(\vec r)e^{j\omega t}]
$$

$$
\vec E(\vec r)
=\vec e_xE_x(\vec r)e^{j\phi_x(\vec r)}
+\vec e_yE_y(\vec r)e^{j\phi_y(\vec r)}
+\vec e_zE_z(\vec r)e^{j\phi_z(\vec r)}
$$

复矢量 $\vec E(\vec r)$ 把空间变化、振幅、相位都收进去了。时谐场里经常直接令：

$$
\frac{\partial}{\partial t}=j\omega
$$

。

在无源区域，电场满足亥姆霍兹方程：

$$
\nabla^2\vec E(\vec r)+k_c^2\vec E(\vec r)=0
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
\nabla^2\vec E(\vec r)+k^2\vec E(\vec r)=0
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
\vec E(\vec r)=\vec E(z)
$$

代入亥姆霍兹方程：

$$
\nabla^2\vec E+k^2\vec E=0
$$

可得：

$$
\frac{d^2\vec E}{dz^2}+k^2\vec E=0
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

---

### 8-1-3 理想介质中的场表达式

若只考虑沿 $+z$ 方向传播的波：

$$
\vec E(z)=\vec E_m e^{-jkz}
$$

$$
\vec H(z)=\vec H_m e^{-jkz}
$$

瞬时电场为：

$$
\vec E(z,t)=\operatorname{Re}[\vec E(z)e^{j\omega t}]
$$

若某一分量为 $E_i(z)=E_{im}e^{j\phi_i}e^{-jkz}$，则：

$$
E_i(z,t)=E_{im}\cos(\omega t-kz+\phi_i)
$$

均匀平面波在理想介质中的关键结论：

$$
\boxed{
\vec e_z\cdot \vec E=0,\qquad \vec e_z\cdot \vec H=0
}
$$

即它是**横电磁波 Transverse Electromagnetic Wave, TEM Wave**。

这里的“横”指场矢量没有传播方向上的分量。若波沿 $z$ 方向传播，$\vec E$ 和 $\vec H$ 都只在横截面内振动。

由 Maxwell 方程可得：

$$
\boxed{
\vec E=-\eta\,\vec e_n\times\vec H,
\qquad
\vec H=\frac{1}{\eta}\vec e_n\times\vec E
}
$$

:::: definition
**本征阻抗 Intrinsic Impedance**，也叫波阻抗，定义为电场振幅与磁场振幅之比：

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$
::::

真空中：

$$
\eta_0=\sqrt{\frac{\mu_0}{\varepsilon_0}}\approx377\ \Omega
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
> $\vec E,\vec H,\vec k$ 两两垂直，并满足右手螺旋关系。电场与磁场同相，振幅相差 $\eta$ 倍。

这组关系用于从一个场求另一个场。已知传播方向和 $\vec E$ 时，用 $\vec H=\dfrac{1}{\eta}\vec e_n\times\vec E$；已知传播方向和 $\vec H$ 时，用 $\vec E=-\eta\vec e_n\times\vec H$。

---

### 8-1-4 任意传播方向的平面波

若传播方向单位矢量为 $\vec e_n$，则任意位置 $\vec r$ 在传播方向上的投影为：

$$
z'=\vec e_n\cdot\vec r
$$

于是沿 $\vec e_n$ 方向传播的均匀平面波为：

$$
\vec E(\vec r)=\vec E_m e^{-jk\vec e_n\cdot\vec r}
$$

:::: definition
**波矢 Wave Vector** 定义为波数与传播方向单位矢量的乘积：

$$
\vec k=k\vec e_n
$$
::::

则：

$$
\vec E(\vec r)=\vec E_m e^{-j\vec k\cdot\vec r}
$$

$$
\vec H(\vec r)=\vec H_m e^{-j\vec k\cdot\vec r}
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
\nabla\times\vec H&=j\omega\vec D\\
\nabla\times\vec E&=-j\omega\vec B\\
\nabla\cdot\vec D&=0\\
\nabla\cdot\vec B&=0
\end{aligned}
\right.
$$

得到：

$$
\left\{
\begin{aligned}
\vec k\times\vec H_m&=-\omega\vec D_m\\
\vec k\times\vec E_m&=\omega\vec B_m\\
\vec k\cdot\vec D_m&=0\\
\vec k\cdot\vec B_m&=0
\end{aligned}
\right.
$$

**任意方向传播的均匀平面波**

:::: stem
空气中某均匀平面波的磁场强度复矢量为：

$$
\vec H=(-\vec e_xA+2\vec e_y+4\vec e_z)e^{-j\pi(4x+3z)}
$$

求：

1. $\vec k$；
2. $\lambda$ 与 $f$；
3. 常数 $A$；
4. 电场复矢量 $\vec E$。
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
\vec k\cdot\vec H_m=0
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
\vec E=-\eta_0\vec e_n\times\vec H
$$

可得：

$$
\vec E
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
::::

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
E_x(t)&=E_{xm}\cos(\omega t-kz+\phi_x)\\
E_y(t)&=E_{ym}\cos(\omega t-kz+\phi_y)
\end{aligned}
\right.
$$

极化方式由两个量决定：

- 两个正交分量的振幅 $E_{xm},E_{ym}$；
- 初相差 $\Delta\phi=\phi_y-\phi_x$。

![alt text](<EMFT Chapter 8.attachments/1780208249429.png>)

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
\vec E=\vec e_xE_me^{-jkz}
$$

$$
\vec E
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
\vec E=\vec e_xE_me^{-jkz}-j\vec e_yE_me^{-jkz}
$$

$$
(2)\quad
\vec E=\vec e_xE_m\sin\left(\omega t-kz+\frac{\pi}{4}\right)
+\vec e_yE_m\cos\left(\omega t-kz-\frac{\pi}{4}\right)
$$

$$
(3)\quad
\vec E=\vec e_xE_m\sin(\omega t+kz)
+2\vec e_yE_m\cos(\omega t+kz)
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

### 8-2-1 基本形式 Basic Form

无损媒质中：

$$
\sigma=0
$$

$$
k=\omega\sqrt{\mu\varepsilon}=\beta
$$

场表达式为：

$$
\vec E(\vec r)=\vec E_m e^{-jk\vec e_n\cdot\vec r}
$$

有损媒质中：

$$
\sigma\ne0
$$

:::: definition
**复介电常数 Complex Permittivity** 用来把位移电流与传导电流合并到同一个参数中：

$$
\varepsilon_c=\varepsilon-j\frac{\sigma}{\omega}
$$

**复波数 Complex Wave Number** 定义为：

$$
k_c=\omega\sqrt{\mu\varepsilon_c}=\beta-j\alpha
$$
::::

于是：

$$
\vec E(\vec r)=\vec E_me^{-jk_c\vec e_n\cdot\vec r}
$$

展开：

$$
\vec E(\vec r)=\vec E_me^{-\alpha\vec e_n\cdot\vec r}
e^{-j\beta\vec e_n\cdot\vec r}
$$

前一项控制衰减，后一项控制相位变化。

$\sigma\ne0$ 时，电场驱动传导电流，部分电磁能转化为焦耳热，波幅随传播距离衰减。引入 $\varepsilon_c$ 将位移电流与传导电流统一处理，波数由实数 $k$ 变为复数 $k_c$。

---

### 8-2-2 导电媒质中的均匀平面波

:::: definition
**传播常数 Propagation Constant** 定义为：

$$
\gamma=jk_c=\alpha+j\beta
$$

其中 $\alpha$ 为衰减常数，$\beta$ 为相位常数。
::::

若波沿 $+z$ 方向传播：

$$
\vec E(z)=\vec E_me^{-jk_cz}
$$

即：

$$
\vec E(z)=\vec E_me^{-\gamma z}
=\vec E_me^{-\alpha z}e^{-j\beta z}
$$

对应瞬时形式可写为：

$$
\vec E(z,t)=\vec E_me^{-\alpha z}\cos(\omega t-\beta z)
$$

其中：

- $e^{-\alpha z}$：衰减因子；
- $\alpha$：衰减常数，单位 $\mathrm{Np/m}$；
- $e^{-j\beta z}$：相位因子；
- $\beta$：相位常数，单位 $\mathrm{rad/m}$。

导电媒质中的波在传播的同时不断衰减。

---

### 8-2-3 传播常数与本征阻抗

有损媒质中的磁场仍可由：

$$
\vec H=\frac{1}{\eta_c}\vec e_z\times\vec E
$$

得到。

但此时本征阻抗为复数：

$$
\eta_c=\sqrt{\frac{\mu}{\varepsilon_c}}
=|\eta_c|e^{j\phi}
$$

因此磁场为：

$$
\vec H(z)
=\frac{1}{|\eta_c|}\vec e_z\times\vec E_m
e^{-\alpha z}e^{-j(\beta z+\phi)}
$$

瞬时形式为：

$$
\vec H(z,t)
=\frac{\vec e_z\times\vec E_m}{|\eta_c|}
e^{-\alpha z}\cos(\omega t-\beta z-\phi)
$$

![理想介质中 E 与 H 同相](<EMFT Chapter 8 P I.attachments/ideal-medium-eh.jpg>)

![导电媒质中 E 与 H 不同相](<EMFT Chapter 8 P I.attachments/lossy-medium-eh.jpg>)

在导电媒质中，$\vec E$ 与 $\vec H$ 不再同相。若 $\eta_c=|\eta_c|e^{j\phi}$，则磁场相对电场滞后 $\phi$。

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
\operatorname{Re}[\vec E(\vec r)e^{j\omega t}]
\times
\operatorname{Re}[\vec H(\vec r)e^{j\omega t}]
$$

如果求时间平均值，则可以直接用复矢量。对周期函数：

$$
A_{\mathrm{av}}(\vec r)
=\frac{1}{T}\int_0^T A(\vec r,t)\,dt
$$

| 物理量 | 一般形式 | 线性媒质中 |
|--------|---------|-----------|
| 平均坡印廷矢量 | $\displaystyle \vec S_{\mathrm{av}}=\frac12\operatorname{Re}[\vec E\times\vec H^*]$ | — |
| 平均电场能量密度 | $\displaystyle w_{E,\mathrm{av}}=\frac14\operatorname{Re}[\vec D\cdot\vec E^*]$ | $\displaystyle w_{E,\mathrm{av}}=\frac14\varepsilon'\vec E\cdot\vec E^*$ |
| 平均磁场能量密度 | $\displaystyle w_{M,\mathrm{av}}=\frac14\operatorname{Re}[\vec B\cdot\vec H^*]$ | — |
| 平均焦耳损耗功率密度 | $\displaystyle p_{J,\mathrm{av}}=\frac12\sigma\vec E\cdot\vec E^*$ | — |

> [!WARNING]
> 瞬时量必须用实数场计算；求时均值才可直接使用复矢量公式，注意 $\vec S_{\mathrm{av}}$ 中的 $\dfrac12$ 因子。

**平均功率计算**

:::: stem
自由空间中平面波电场为：

$$
\vec E=\vec e_x50\cos(\omega t-kz)\ \mathrm{V/m}
$$

求其垂直穿过半径 $R=2.5\ \mathrm{m}$ 圆面的平均功率。
::::

:::: solution
复电场为：

$$
\vec E=\vec e_x50e^{-jkz}
$$

自由空间本征阻抗：

$$
\eta_0=120\pi\ \Omega
$$

磁场复矢量：

$$
\vec H=\vec e_y\frac{50}{120\pi}e^{-jkz}
=\vec e_y\frac{5}{12\pi}e^{-jkz}\ \mathrm{A/m}
$$

平均坡印廷矢量：

$$
\vec S_{\mathrm{av}}
=\frac12\operatorname{Re}(\vec E\times\vec H^*)
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

## 8-4 平面导体边界的法向入射 Normal Incidence at a Plane Conducting Boundary

### 8-4-1 法向入射基本模型

![法向入射、反射与透射](<EMFT Chapter 8 P II.attachments/normal-incidence-boundary-wide.jpg>)

电磁波入射到平面边界后，入射侧一般同时存在**入射波 Incident Wave** 和 **反射波 Reflected Wave**；另一侧存在**透射波 Transmitted Wave**。

本节只讨论法向入射，即传播方向垂直于界面。

设界面为 $z=0$，区域 1 为 $z<0$，区域 2 为 $z>0$。入射波沿 $+z$ 方向传播，反射波沿 $-z$ 方向传播，透射波沿 $+z$ 方向传播。

若入射电场取 $x$ 方向线极化，则：

$$
\vec E_i(z)=\vec e_xE_{im}e^{-\gamma_1z}
$$

$$
\vec H_i(z)=\vec e_y\frac{E_{im}}{\eta_{1c}}e^{-\gamma_1z}
$$

反射波为：

$$
\vec E_r(z)=\vec e_xE_{rm}e^{\gamma_1z}
$$

$$
\vec H_r(z)=-\vec e_y\frac{E_{rm}}{\eta_{1c}}e^{\gamma_1z}
$$

透射波为：

$$
\vec E_t(z)=\vec e_xE_{tm}e^{-\gamma_2z}
$$

$$
\vec H_t(z)=\vec e_y\frac{E_{tm}}{\eta_{2c}}e^{-\gamma_2z}
$$

反射波的磁场前面有负号，因为反射波传播方向为 $-\vec e_z$，而 $\vec E,\vec H,\vec k$ 仍必须满足右手关系。

---

### 8-4-2 边界条件与反射透射系数

法向入射问题的核心是边界条件。

在无面电流、无面磁流的普通界面上，切向电场和切向磁场连续：

$$
\left.\vec e_n\times(\vec E_1-\vec E_2)\right|_S=0
$$

$$
\left.\vec e_n\times(\vec H_1-\vec H_2)\right|_S=0
$$

在 $z=0$ 处：

$$
E_{im}+E_{rm}=E_{tm}
$$

$$
\frac{1}{\eta_{1c}}(E_{im}-E_{rm})
=
\frac{1}{\eta_{2c}}E_{tm}
$$

:::: definition
**反射系数 Reflection Coefficient** $\Gamma$ 定义为反射电场幅度与入射电场幅度之比。

**透射系数 Transmission Coefficient** $\tau$ 定义为透射电场幅度与入射电场幅度之比。
::::

由边界条件解得：

$$
E_{rm}=\Gamma E_{im}
$$

$$
E_{tm}=\tau E_{im}
$$

其中：

$$
\boxed{
\Gamma=\frac{\eta_{2c}-\eta_{1c}}{\eta_{2c}+\eta_{1c}},
\qquad
\tau=\frac{2\eta_{2c}}{\eta_{2c}+\eta_{1c}}
}
$$

这两个系数是法向入射问题的主要结果。后面只是在不同边界条件下代入对应的 $\eta$。

---

### 8-4-3 理想导体边界 Ideal Conductor Boundary

若区域 1 为理想介质，区域 2 为理想导体，则：

$$
\sigma_1=0,\qquad \sigma_2=\infty
$$

理想导体内部电场为零，等效为：

$$
\eta_{2c}=0
$$

代入反射、透射系数：

$$
\Gamma=-1,\qquad \tau=0
$$

即：

$$
E_{rm}=-E_{im}
$$

界面处反射电场与入射电场反相，透射电场为零。

入射波与反射波可写为：

$$
\vec E_i(z)=\vec e_xE_{im}e^{-j\beta_1z},
\qquad
\vec H_i(z)=\vec e_y\frac{E_{im}}{\eta_1}e^{-j\beta_1z}
$$

$$
\vec E_r(z)=-\vec e_xE_{im}e^{j\beta_1z},
\qquad
\vec H_r(z)=\vec e_y\frac{E_{im}}{\eta_1}e^{j\beta_1z}
$$

注意磁场没有反相。电场反相来自理想导体表面切向电场必须为零；磁场相加后在表面形成最大值，对应表面感应电流。

---

### 8-4-4 合成场与驻波 Standing Wave

理想导体前方区域的总场为：

$$
\vec E_1(z)=\vec E_i(z)+\vec E_r(z)
$$

代入：

$$
\vec E_1(z)
=\vec e_xE_{im}(e^{-j\beta_1z}-e^{j\beta_1z})
=-\vec e_xj2E_{im}\sin(\beta_1z)
$$

磁场总场为：

$$
\vec H_1(z)
=\vec e_y\frac{E_{im}}{\eta_1}(e^{-j\beta_1z}+e^{j\beta_1z})
=\vec e_y\frac{2E_{im}}{\eta_1}\cos(\beta_1z)
$$

对应瞬时形式：

$$
\vec E_1(z,t)=\vec e_x2E_{im}\sin(\beta_1z)\sin\omega t
$$

$$
\vec H_1(z,t)=\vec e_y\frac{2E_{im}}{\eta_1}\cos(\beta_1z)\cos\omega t
$$

![理想导体前的驻波分布](<EMFT Chapter 8 P II.attachments/standing-wave-wide.jpg>)

电场和磁场有两个差别：

- 时间相位差为 $\pi/2$；
- 空间位置差为 $\lambda_1/4$。

理想导体表面处 $z=0$：

$$
\vec E_1(0,t)=0
$$

$$
|\vec H_1(0,t)| \text{ 取最大值}
$$

:::: definition
**行波 Travelling Wave**：能量沿某一方向传播的电磁波。

**驻波 Standing Wave**：入射波与反射波等幅叠加后形成的空间固定振幅分布，平均能流为零。

**行驻波 Travelling-Standing Wave**：入射波与反射波不等幅叠加后形成的混合波。
::::

理想导体边界对应全反射，所以总场为纯驻波。

平均坡印廷矢量为：

$$
\vec S_{av}
=\frac12\operatorname{Re}[\vec E_1\times\vec H_1^*]
=0
$$

电场波腹位置：

$$
z_{\max}=-\frac{(2n+1)\lambda_1}{4},
\qquad n=0,1,2,\dots
$$

电场波节位置：

$$
z_{\min}=-\frac{n\lambda_1}{2},
\qquad n=0,1,2,\dots
$$

---

### 8-4-5 表面电流与工程理解

理想导体表面的感应电流密度为：

$$
\vec J_S=\vec e_n\times\vec H_1\big|_{z=0}
$$

在本节坐标中，指向区域 1 的法向量为 $-\vec e_z$，于是：

$$
\vec J_S
=-\vec e_z\times\vec e_y\frac{2E_{im}}{\eta_1}
=\vec e_x\frac{2E_{im}}{\eta_1}
$$

理想导体内部透射场为零，表面仍存在感应电流。该表面电流承担边界条件所需的磁场跃变。

:::: stem
均匀平面波沿 $+z$ 方向传播，入射电场为：

$$
\vec E_i
=\vec e_x100\sin(\omega t-\beta z)
+\vec e_y200\cos(\omega t-\beta z)
\quad \mathrm{V/m}
$$

在 $z=0$ 处放置无限大理想导体平板。求 $z<0$ 区域的总电场、总磁场，以及导体表面电流密度。
::::

:::: solution
先写复电场：

$$
\vec E_i(z)
=\vec e_x100e^{-j\beta z}e^{-j\pi/2}
+\vec e_y200e^{-j\beta z}
$$

入射磁场：

$$
\vec H_i(z)
=\frac{1}{\eta_0}\vec e_z\times\vec E_i
$$

反射电场在理想导体表面反相：

$$
\vec E_r(z)
=-\vec e_x100e^{j\beta z}e^{-j\pi/2}
-\vec e_y200e^{j\beta z}
$$

反射磁场为：

$$
\vec H_r(z)
=\frac{1}{\eta_0}(-\vec e_z)\times\vec E_r
$$

相加得：

$$
\vec E_1(z)
=-j\vec e_x200e^{-j\pi/2}\sin(\beta z)
-j\vec e_y400\sin(\beta z)
$$

$$
\vec H_1(z)
=\frac{1}{\eta_0}
\left[
-\vec e_x400\cos(\beta z)
+\vec e_y200e^{-j\pi/2}\cos(\beta z)
\right]
$$

表面电流密度：

$$
\vec J_S=-\vec e_z\times\vec H_1\big|_{z=0}
$$

代入：

$$
\vec J_S
=\vec e_x\frac{200}{\eta_0}e^{-j\pi/2}
+\vec e_y\frac{400}{\eta_0}
$$

即：

$$
\vec J_S
=-j0.53\vec e_x+1.06\vec e_y
\quad \mathrm{A/m}
$$
::::

## 8-5 平面介质边界的法向入射 Normal Incidence at a Plane Dielectric Boundary

### 8-5-1 理想介质界面

本节讨论两侧均为理想介质：

$$
\sigma_1=\sigma_2=0
$$

于是：

$$
\gamma_1=j\beta_1=j\omega\sqrt{\mu_1\varepsilon_1}
$$

$$
\gamma_2=j\beta_2=j\omega\sqrt{\mu_2\varepsilon_2}
$$

$$
\eta_1=\sqrt{\frac{\mu_1}{\varepsilon_1}},
\qquad
\eta_2=\sqrt{\frac{\mu_2}{\varepsilon_2}}
$$

反射、透射系数退化为实数：

$$
\boxed{
\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1},
\qquad
\tau=\frac{2\eta_2}{\eta_2+\eta_1}
}
$$

当 $\eta_2>\eta_1$ 时，$\Gamma>0$，反射电场与入射电场同相。

当 $\eta_2<\eta_1$ 时，$\Gamma<0$，反射电场与入射电场反相。

这个符号会决定界面处是电场波腹还是波节。

---

### 8-5-2 总场与行驻波 Travelling-Standing Wave

在区域 1 中：

$$
\vec E_1(z)
=\vec E_i(z)+\vec E_r(z)
=\vec e_xE_{im}
\left(
e^{-j\beta_1z}
+\Gamma e^{j\beta_1z}
\right)
$$

可写成：

$$
\vec E_1(z)
=\vec e_xE_{im}
\left[
(1+\Gamma)e^{-j\beta_1z}
+j2\Gamma\sin(\beta_1z)
\right]
$$

第一项对应行波成分，第二项对应驻波成分。

介质界面中通常 $|\Gamma|<1$，反射波幅度小于入射波，所以总场不是纯驻波，而是行驻波。

![介质界面行驻波振幅变化](<EMFT Chapter 8 P II.attachments/dielectric-amplitude-wide.jpg>)

总电场振幅为：

$$
|\vec E_1(z)|
=E_{im}\left|1+\Gamma e^{j2\beta_1z}\right|
$$

即：

$$
|\vec E_1(z)|
=E_{im}\sqrt{1+\Gamma^2+2\Gamma\cos(2\beta_1z)}
$$

若 $\Gamma<0$：

$$
|\vec E_1|_{\max}=E_{im}|1-\Gamma|,
\qquad
z=-\left(\frac n2+\frac14\right)\lambda_1
$$

$$
|\vec E_1|_{\min}=E_{im}|1+\Gamma|,
\qquad
z=-\frac{n\lambda_1}{2}
$$

若 $\Gamma>0$：

$$
|\vec E_1|_{\max}=E_{im}|1+\Gamma|,
\qquad
z=-\frac{n\lambda_1}{2}
$$

$$
|\vec E_1|_{\min}=E_{im}|1-\Gamma|,
\qquad
z=-\left(\frac n2+\frac14\right)\lambda_1
$$

其中 $n=0,1,2,\dots$。

---

### 8-5-3 驻波比 Standing-Wave Ratio

:::: definition
**驻波比 Standing-Wave Ratio, SWR** 定义为总场最大振幅与最小振幅之比：

$$
S=\frac{|\vec E|_{\max}}{|\vec E|_{\min}}
$$
::::

对法向入射的理想介质界面：

$$
\boxed{
S=\frac{1+|\Gamma|}{1-|\Gamma|}
}
$$

反过来：

$$
|\Gamma|=\frac{S-1}{S+1}
$$

几个特殊情况：

| 条件 | 结果 | 波形 |
| --- | --- | --- |
| $\Gamma=0$ | $S=1$ | 纯行波 |
| $\Gamma=\pm1$ | $S=\infty$ | 纯驻波 |
| $0<\lvert\Gamma\rvert<1$ | $1<S<\infty$ | 行驻波 |

驻波比越大，反射越强，驻波成分越明显。

---

### 8-5-4 电磁能流密度

在区域 1 中，入射波平均能流密度为：

$$
\vec S_{iav}
=\frac12\operatorname{Re}[\vec E_i\times\vec H_i^*]
=\vec e_z\frac{E_{im}^2}{2\eta_1}
$$

反射波沿 $-z$ 方向传播：

$$
\vec S_{rav}
=-\vec e_z\frac{\Gamma^2E_{im}^2}{2\eta_1}
$$

因此区域 1 的净平均能流为：

$$
\vec S_{1av}
=\vec e_z\frac{E_{im}^2}{2\eta_1}(1-\Gamma^2)
$$

区域 2 中只有透射波：

$$
\vec S_{2av}
=\vec e_z\frac{\tau^2E_{im}^2}{2\eta_2}
$$

由 $\Gamma,\tau$ 的定义可验证：

$$
\vec S_{1av}=\vec S_{2av}
$$

理想介质界面没有损耗，所以平均功率守恒。反射改变的是功率在两侧的分配，不会凭空消耗能量。

---

### 8-5-5 典型例题

:::: stem
自由空间中均匀平面波法向入射到半无限无损介质。已知自由空间中的驻波比为 $S=3$，介质中的波长为自由空间波长的 $1/6$。总场最小值出现在界面处。求介质的 $\mu_r$ 与 $\varepsilon_r$。
::::

:::: solution
由驻波比：

$$
S=\frac{1+|\Gamma|}{1-|\Gamma|}=3
$$

得：

$$
|\Gamma|=\frac12
$$

总场最小值在界面处，说明界面处入射波与反射波反相：

$$
\Gamma=-\frac12
$$

由：

$$
\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1}
$$

且 $\eta_1=\eta_0$，得：

$$
\eta_2=\frac13\eta_0
$$

因此：

$$
\frac{\mu_r}{\varepsilon_r}=\frac19
$$

又因为：

$$
\lambda_2=\frac{\lambda_0}{\sqrt{\mu_r\varepsilon_r}}
=\frac{\lambda_0}{6}
$$

所以：

$$
\mu_r\varepsilon_r=36
$$

联立：

$$
\mu_r=2,\qquad \varepsilon_r=18
$$
::::

:::: stem
空气中入射波电场为：

$$
\vec E_i=\vec e_x10\cos(3\pi\times10^9t-10\pi z)\quad \mathrm{V/m}
$$

电磁波从空气区域 $z<0$ 法向入射到 $z>0$ 的无损介质中。介质参数为 $\mu_r=1,\varepsilon_r=4$。求 $z>0$ 区域中的电场和磁场。
::::

:::: solution
介质 2 的波阻抗：

$$
\eta_2=\eta_0\sqrt{\frac{\mu_{r2}}{\varepsilon_{r2}}}
=\frac{120\pi}{2}=60\pi\ \Omega
$$

空气中：

$$
\eta_1=\eta_0=120\pi\ \Omega
$$

透射系数：

$$
\tau=\frac{2\eta_2}{\eta_1+\eta_2}
=\frac{2\times60\pi}{120\pi+60\pi}
=0.667
$$

相位常数：

$$
\beta_2=\omega\sqrt{\mu_2\varepsilon_2}
=\frac{3\pi\times10^9}{3\times10^8}\times2
=20\pi\ \mathrm{rad/m}
$$

透射电场：

$$
\vec E_2(z,t)
=\vec e_x\tau E_{im}\cos(\omega t-\beta_2z)
$$

即：

$$
\vec E_2(z,t)
=\vec e_x6.67\cos(3\pi\times10^9t-20\pi z)\quad \mathrm{V/m}
$$

透射磁场：

$$
\vec H_2=\frac{1}{\eta_2}\vec e_z\times\vec E_2
$$

所以：

$$
\vec H_2(z,t)
=\vec e_y0.036\cos(3\pi\times10^9t-20\pi z)\quad \mathrm{A/m}
$$
::::

---

### 8-5-6 雷达低空盲区

雷达测距需要三个条件：

1. 电磁波近似直线传播；
2. 目标产生可接收的反射波；
3. 入射波与反射波速度已知。

距离估计通常按往返时间计算：

$$
R=\frac{ct}{2}
$$

低空目标会受到地面反射影响。雷达接收点处，直接波与地面反射波可能近似等幅反相，合成场减小，于是形成低空盲区。

![雷达低空盲区示意](<EMFT Chapter 8 P II.attachments/radar-low-altitude-wide.jpg>)

当入射角趋近擦地入射时，反射系数近似为：

$$
\Gamma_\perp\approx -1
$$

$$
\Gamma_\parallel\approx -1
$$

因此地面反射波相对直接波近似反相。低空目标越接近地面，多径相消越明显，雷达探测越困难。





## 总结 Summary


**8.1 — 8.3 主要结论：**

1. 无损媒质中，均匀平面波满足 TEM 特性，$\vec E,\vec H,\vec k$ 两两垂直，并且 $\vec E$ 与 $\vec H$ 同相；
2. 任意方向传播时，核心表达式是 $e^{-j\vec k\cdot\vec r}$；
3. 极化看固定点处电场矢量端点轨迹，由振幅和相位差决定；
4. 有损媒质中，$k_c=\beta-j\alpha$，波传播时同时发生相位变化与指数衰减；
5. 良导体中 $\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}$，趋肤深度 $\delta=1/\alpha$；
6. 电磁能量流用坡印廷矢量 $\vec S=\vec E\times\vec H$ 描述，平均功率用 $\frac12\operatorname{Re}(\vec E\times\vec H^*)$。

**8.4 — 8.5 主要结论：**

1. 法向入射问题先写入射波、反射波、透射波，再用切向边界条件求幅度；
2. 反射系数与透射系数为 $\displaystyle\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1},\ \tau=\frac{2\eta_2}{\eta_2+\eta_1}$；
3. 理想导体边界满足 $\Gamma=-1,\tau=0$，前方形成纯驻波；
4. 理想介质边界通常满足 $\lvert\Gamma\rvert<1$，前方形成行驻波；
5. 驻波比 $S=\dfrac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ 用来描述反射强弱；
6. 理想介质界面无损耗，平均能流满足 $\vec S_{1av}=\vec S_{2av}$；
7. 雷达低空盲区来自直接波与地面反射波的相消。
