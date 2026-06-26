---
lastUpdated: 2026-05-11T10:05:08+08:00
---

# 5 Steady Electric Currents

<LyricCard
  title="ヒッチコック"
  artist="ヨルシカ"
  lang="ja"
  title-style="ja-kagi"
  qq-url="https://y.qq.com/n/ryqq/songDetail/002khQke3D5YTV"
  netease-url="https://music.163.com/#/song?id=557581315"
>
  <LyricLine
    original="先生(せんせい)、人生相談(じんせいそうだん)です。"
    translation="老师，我想谈谈人生。"
  />
  <LyricLine
    original="この先(さき)どうなら楽(らく)ですか？"
    translation="在这之后怎样才能感到轻松呢？"
  />
  <LyricLine
    original="そんなの誰(だれ)もわかりはしないよなんて言(い)われますか。"
    translation="会被说那种事情谁也不知道之类的吗？"
  />
</LyricCard>

![alt text](<EMFT Chapter 5.attachments/1774778411631.jpg>)

## 章节目录

- [章节目录](#章节目录)
- [5-1 引言 Introduction](#5-1-引言-introduction)
- [5-2 电流密度与欧姆定律 Current Density \& Ohm's Law](#5-2-电流密度与欧姆定律-current-density--ohms-law)
  - [5-2-1 电流与电流密度](#5-2-1-电流与电流密度)
  - [5-2-2 传导电流与欧姆定律](#5-2-2-传导电流与欧姆定律)
  - [5-2-3 运流电流](#5-2-3-运流电流)
- [5-3 电动势与 KVL Electromotive Force \& KVL](#5-3-电动势与-kvl-electromotive-force--kvl)
- [5-4 连续性方程与 KCL Equation of Continuity \& KCL](#5-4-连续性方程与-kcl-equation-of-continuity--kcl)
  - [5-4-1 电荷守恒与连续性方程](#5-4-1-电荷守恒与连续性方程)
  - [5-4-2 稳恒电流场](#5-4-2-稳恒电流场)
- [5-5 功率损耗与焦耳定律 Power Dissipation \& Joule's Law](#5-5-功率损耗与焦耳定律-power-dissipation--joules-law)
- [5-6 电流密度的边界条件 Boundary Conditions for Current Density](#5-6-电流密度的边界条件-boundary-conditions-for-current-density)
  - [5-6-1 基本方程](#5-6-1-基本方程)
  - [5-6-2 一般边界条件](#5-6-2-一般边界条件)
  - [5-6-3 电流线折射关系](#5-6-3-电流线折射关系)
  - [5-6-4 稳恒电流场与静电场的对应](#5-6-4-稳恒电流场与静电场的对应)
- [5-7 电阻计算 Resistance Calculations](#5-7-电阻计算-resistance-calculations)
  - [5-7-1 电导与电阻](#5-7-1-电导与电阻)
  - [5-7-2 求解方法](#5-7-2-求解方法)
  - [5-7-3 典型例题](#5-7-3-典型例题)
- [5-8 总结](#5-8-总结)

## 5-1 引言 Introduction

::: definition
稳恒电流场 Steady Electric Current Field 讨论的是**自由电荷持续定向运动**时产生的电场与电流分布。
:::

这类问题的关键句其实就是：

> 在导电介质中存在电场，才会形成稳恒电流。

常见电流可以分为：

| 电流类型 | 英文 | 说明 |
| --- | --- | --- |
| 电解电流 | Electrolytic Current | 正负离子在电解质中的迁移形成电流 |
| 运流电流 | Convection Current | 电子或离子在真空、稀薄气体中的整体运动形成电流 |
| 传导电流 | Conduction Current | 导体或半导体中自由电子、空穴等载流子的漂移运动形成电流 |

本章主要讨论的是**传导电流**。

> [!NOTE]
> 稳恒电流场并不等于静电场。
>
> 静电场强调电荷静止，导体内部最终有 $\vec E=0$；  
> 稳恒电流场中载流子持续运动，有限电导率导体内部一般有
>
> $$
> \vec E=\frac{\vec J}{\sigma}\ne 0
> $$

## 5-2 电流密度与欧姆定律 Current Density & Ohm's Law

### 5-2-1 电流与电流密度

#### 1. 电流 Electric Current

::: definition
**电流强度 Electric Current Intensity**，简称**电流 Electric Current**，定义为单位时间内通过某一截面的电荷量，记作 $I$：

$$

I=\frac{dq}{dt}

\qquad (A)
$$

其中 $A$ 为安培 Ampere。
:::

#### 2. 电流密度 Current Density

::: definition
**电流密度 Current Density** 记作 $\vec J$，是一个矢量：

- 方向：规定为**正电荷运动方向**；
- 大小：单位垂直截面积上通过的电流。
:::


设有一个有向面积元

$$
d\vec S=\vec e_n\,dS
$$

则穿过该面积元的微元电流为

$$

dI=\vec J\cdot d\vec S

$$

穿过整个曲面 $S$ 的电流为

$$

I=\iint_S \vec J\cdot d\vec S

$$

也就是说，**电流就是电流密度通过曲面的通量**。

> [!TIP]
> 这个式子和电通量
>
> $$
> \Psi=\iint_S \vec E\cdot d\vec S
> $$
>
> 形式完全一样。区别只在于这里通过曲面的是 $\vec J$，得到的是电流 $I$。

### 5-2-2 传导电流与欧姆定律

::: definition
在大多数导电介质中，某点的传导电流密度 $\vec J$ 与该点的电场强度 $\vec E$ 成正比：

$$

\boxed{
\vec J=\sigma\vec E
}

$$

其中 $\sigma$ 称为**电导率 Conductivity**，单位为

$$
S/m
$$

电导率越大，介质的导电能力越强。

上式是欧姆定律的**微分形式**。电路中熟悉的

$$

U=IR

$$

则是欧姆定律的整体形式。
:::

#### 几种介质的电导率

| 介质 | 电导率 $(S/m)$ | 介质 | 电导率 $(S/m)$ |
| --- | ---: | --- | ---: |
| Silver | $6.17\times10^7$ | Sea water | $4$ |
| Copper | $5.80\times10^7$ | Pure water | $10^{-3}$ |
| Gold | $4.10\times10^7$ | Dry soil | $10^{-5}$ |
| Aluminum | $3.54\times10^7$ | Transformer oil | $10^{-11}$ |
| Brass | $1.57\times10^7$ | Glass | $10^{-12}$ |
| Iron | $10^7$ | Rubber | $10^{-15}$ |

#### 理想导体与理想介质

::: definition

| 类型 | 条件 | 性质 |
| --- | --- | --- |
| 理想导体 / 完美电导体 Perfect Electric Conductor | $\sigma\to\infty$ | 稳恒情况下内部不能存在有限电场，否则会产生无穷大电流 |
| 理想电介质 / 绝缘体 Perfect Dielectric | $\sigma=0$ | 不产生传导电流 |

:::

> [!CAUTION]
> 自然界中不存在真正的 $\sigma=\infty$ 或 $\sigma=0$ 的材料，它们只是理想模型。

对于有限电导率的普通导体，若存在稳恒电流，则内部一般满足

$$
\vec E=\frac{\vec J}{\sigma}
$$

所以导体内部可以有非零电场。

### 5-2-3 运流电流

运流电流 Convection Current 不一定满足 $\vec J=\sigma\vec E$。

如果空间中电荷密度为 $\rho$，这些电荷整体以速度 $\vec v$ 运动，则电流密度为

$$

\vec J=\rho\vec v

$$

运流电流的方向由电荷运动决定，不一定与电场方向相同。

> [!NOTE]
> 和介质的极化性质类似，导电性质也可以分为均匀 / 非均匀、线性 / 非线性、各向同性 / 各向异性。  
> 本章中的
>
> $$
> \vec J=\sigma\vec E
> $$
>
> 默认适用于**线性各向同性导电介质**。

## 5-3 电动势与 KVL Electromotive Force & KVL

在电源外部的导电区域中，维持稳恒电流的电场仍然可以看作保守场，因此满足

$$

\oint_C \vec E\cdot d\vec l=0

$$

结合欧姆定律

$$
\vec J=\sigma\vec E
$$

可得

$$

\oint_C \frac{\vec J}{\sigma}\cdot d\vec l=0

$$

若导电介质均匀，即 $\sigma$ 为常数，则有

$$

\oint_C \vec J\cdot d\vec l=0

$$

由 Stokes 定理可得其微分形式：

$$

\nabla\times\left(\frac{\vec J}{\sigma}\right)=0

$$

在均匀导电介质中进一步化为

$$

\nabla\times\vec J=0

$$

> [!IMPORTANT]
> 对均匀导电介质中的稳恒电流场：
>
> $$
> \nabla\times\vec J=0
> $$
>
> 即稳恒电流密度场是**无旋场 Irrotational Field**。

KVL Kirchhoff's Voltage Law 本质上就是上述环路积分为零在电路中的表述：沿闭合回路一周，各段电压的代数和为零。

## 5-4 连续性方程与 KCL Equation of Continuity & KCL

### 5-4-1 电荷守恒与连续性方程

电荷守恒是电磁学的基本假设之一：

**电荷不会凭空产生，也不会凭空消失。**

设闭合曲面 $S$ 包围体积 $V$，体积内部总电荷为

$$
q=\iiint_V \rho\,dV
$$

若有净电流从闭合曲面向外流出，则体积内部电荷减少，因此


$$

\oiint_S \vec J\cdot d\vec S
=
-\frac{dq}{dt}
=
-\frac{d}{dt}\iiint_V\rho\,dV

$$

若积分区域固定，则

$$
\oiint_S \vec J\cdot d\vec S
=
-\iiint_V \frac{\partial \rho}{\partial t}\,dV
$$

由散度定理

$$
\oiint_S \vec J\cdot d\vec S
=
\iiint_V \nabla\cdot\vec J\,dV
$$

因此得到

$$
\iiint_V
\left(
\nabla\cdot\vec J
+\frac{\partial\rho}{\partial t}
\right)
dV=0
$$

因为体积 $V$ 任意，所以有

::: definition
**连续性方程 Equation of Continuity** 是电荷守恒的微分形式：

$$
\boxed{
\nabla\cdot\vec J
=
-\frac{\partial\rho}{\partial t}
}
$$

:::

### 5-4-2 稳恒电流场

对于稳恒电流场，电荷分布不随时间变化：

$$
\frac{\partial\rho}{\partial t}=0
$$

所以连续性方程化为

$$
\boxed{
\nabla\cdot\vec J=0
}
$$

其积分形式为

$$
\oiint_S \vec J\cdot d\vec S=0
$$

这说明：对于任意闭合曲面，流出的总电流等于流入的总电流。

如果用电流线 Electric Current Lines 描述电流密度场，则电流线处处与 $\vec J$ 相切。



稳恒电流场满足

$$
\nabla\cdot\vec J=0
$$

所以电流线**没有起点也没有终点**，只能形成闭合结构，或从一个电极进入再从另一个电极流出。

电路中的 KCL Kirchhoff's Current Law 即为

$$

\sum_j I_j=0

$$

它来自稳恒电流场的积分形式：

$$

\oiint_S \vec J\cdot d\vec S=0

$$

> [!TIP]
> KCL 不是一个孤立的电路规则。  
> 它本质上是
>
> $$
> \nabla\cdot\vec J=0
> $$
>
> 在电路节点附近取一个很小闭合曲面后的结果。

## 5-5 功率损耗与焦耳定律 Power Dissipation & Joule's Law

电场推动电荷运动时会做功。设电荷 $q$ 以漂移速度 $\vec u$ 运动，则单位时间内电场对该电荷做功为

$$
p=q\vec E\cdot\vec u
$$

对体积元 $dV$ 中所有载流子求和，可得

$$
dP
=
\vec E\cdot
\left(
\sum_i N_i q_i\vec u_i
\right)
dV
$$

括号中的量正是电流密度 $\vec J$，因此

$$

dP=\vec E\cdot\vec J\,dV

$$

于是单位体积内的功率损耗为



::: definition
**焦耳损耗功率密度 Power Dissipation Density** 定义为单位体积内电场对载流子做功的功率：

$$
\boxed{
p_l
=
\frac{dP}{dV}
=
\vec E\cdot\vec J
}

\qquad (W/m^3)
$$

这就是焦耳定律 Joule's Law 的局部形式。
:::

在线性各向同性导电介质中，由

$$
\vec J=\sigma\vec E
$$

可得

$$
p_l=\sigma E^2
$$

也可写成

$$
p_l=\frac{J^2}{\sigma}
$$

对于体积 $V$ 中的总功率损耗：

$$

P=\iiint_V \vec E\cdot\vec J\,dV

$$

若导体截面恒定，电流沿导体方向流动，则

$$
P
=
\int_L E\,dl\int_S J\,dS
=
UI
$$

再结合

$$
U=IR
$$

得到熟悉的电路形式：

$$

P=UI=I^2R=\frac{U^2}{R}

$$

## 5-6 电流密度的边界条件 Boundary Conditions for Current Density

### 5-6-1 基本方程

稳恒电流场的基本方程为

$$

\begin{cases}
\nabla\cdot\vec J=0\\
\nabla\times\vec E=0
\end{cases}

$$

对应积分形式为

$$

\begin{cases}
\oiint_S \vec J\cdot d\vec S=0\\
\oint_C \vec E\cdot d\vec l=0
\end{cases}

$$

本构关系为

$$

\vec J=\sigma\vec E

$$

如果引入电势 $\varphi$，仍有

$$
\vec E=-\nabla\varphi
$$

因此

$$
\vec J=-\sigma\nabla\varphi
$$

在均匀介质中，由 $\nabla\cdot\vec J=0$ 可得

$$
\nabla\cdot(-\sigma\nabla\varphi)=0
$$

若 $\sigma$ 为常数，则

$$

\nabla^2\varphi=0

$$

> [!NOTE]
> 这就是稳恒电流场问题和静电场无源区问题高度相似的原因：  
> 它们都可以落到拉普拉斯方程上。

### 5-6-2 一般边界条件

考虑两种导电介质的分界面，法向单位矢量为 $\vec e_n$，从介质 2 指向介质 1。

由

$$
\nabla\cdot\vec J=0
$$

可得电流密度法向分量连续：

$$

\vec e_n\cdot(\vec J_1-\vec J_2)=0

$$

即

$$

J_{1n}=J_{2n}

$$

由

$$
\nabla\times\vec E=0
$$

可得电场切向分量连续：

$$

\vec e_n\times(\vec E_1-\vec E_2)=0

$$

即

$$

E_{1t}=E_{2t}

$$

同时，电位移矢量仍满足静电边界条件：

$$

D_{1n}-D_{2n}=\rho_s

$$

整理为：

> [!IMPORTANT]
> 稳恒电流场在两导电介质分界面上满足
>
> $$
> \boxed{
> \begin{cases}
> J_{1n}=J_{2n}\\
> E_{1t}=E_{2t}
> \end{cases}
> }
> $$
>
> 若还讨论界面自由电荷，则
>
> $$
> D_{1n}-D_{2n}=\rho_s
> $$

写成电势形式，由 $\vec E=-\nabla\varphi$ 和 $\vec J=\sigma\vec E$ 得

$$

\begin{cases}
\varphi_1=\varphi_2\\
\sigma_1\dfrac{\partial\varphi_1}{\partial n}
=
\sigma_2\dfrac{\partial\varphi_2}{\partial n}
\end{cases}

$$

> [!CAUTION]
> 上式中法向导数的符号依赖于法向量取向。实际计算时要先固定同一个 $\vec e_n$，再写 $J_{1n}=J_{2n}$。

### 5-6-3 电流线折射关系

设两侧电场与法线的夹角分别为 $\theta_1,\theta_2$，则

$$
\tan\theta
=
\frac{E_t}{E_n}
$$

由于

$$
E_{1t}=E_{2t}
$$

且

$$
J_{1n}=J_{2n}
\quad\Longrightarrow\quad
\sigma_1E_{1n}=\sigma_2E_{2n}
$$

所以

$$
\boxed{
\frac{\tan\theta_1}{\tan\theta_2}
=
\frac{\sigma_1}{\sigma_2}
}
$$

这称为电流线在导电介质分界面上的折射关系。

> [!TIP]
> 和静电场介质分界面的折射关系对比：
>
> $$
> \frac{\tan\alpha_1}{\tan\alpha_2}
> =
> \frac{\varepsilon_1}{\varepsilon_2}
> $$
>
> 稳恒电流场中只需要把 $\varepsilon$ 换成 $\sigma$。

### 5-6-4 稳恒电流场与静电场的对应

稳恒电流场和静电场的形式对应如下：

| 项目 | 静电场无源区 | 稳恒电流场 |
| --- | --- | --- |
| 基本方程 | $\nabla\cdot\vec D=0,\quad \nabla\times\vec E=0$ | $\nabla\cdot\vec J=0,\quad \nabla\times\vec E=0$ |
| 本构关系 | $\vec D=\varepsilon\vec E$ | $\vec J=\sigma\vec E$ |
| 电势函数 | $\vec E=-\nabla\varphi,\quad \nabla^2\varphi=0$ | $\vec E=-\nabla\varphi,\quad \nabla^2\varphi=0$ |
| 边界条件 | $E_{1t}=E_{2t},\quad D_{1n}=D_{2n}$ | $E_{1t}=E_{2t},\quad J_{1n}=J_{2n}$ |
| 电势边界 | $\varphi_1=\varphi_2,\quad \varepsilon_1\dfrac{\partial\varphi_1}{\partial n}=\varepsilon_2\dfrac{\partial\varphi_2}{\partial n}$ | $\varphi_1=\varphi_2,\quad \sigma_1\dfrac{\partial\varphi_1}{\partial n}=\sigma_2\dfrac{\partial\varphi_2}{\partial n}$ |

对应物理量为：

| 静电场 | $\vec E$ | $\vec D$ | $\varphi$ | $q$ | $\varepsilon$ | $C$ |
| --- | --- | --- | --- | --- | --- | --- |
| 稳恒电流场 | $\vec E$ | $\vec J$ | $\varphi$ | $I$ | $\sigma$ | $G$ |



因此对于几何结构相同、介质均匀的对应问题，有

::: definition
**静电比拟法 Electrostatic Simulation Method** 是指利用稳恒电流场与静电场在方程形式上的对应关系，将已知电容问题转化为电导问题：

$$
\boxed{
\frac{G}{C}=\frac{\sigma}{\varepsilon}
}
$$

:::

## 5-7 电阻计算 Resistance Calculations

### 5-7-1 电导与电阻

::: definition
**电导 Conductance** 定义为

$$
G=\frac{I}{U}
$$

**电阻 Resistance** 定义为

$$
R=\frac{1}{G}=\frac{U}{I}
$$
:::

### 5-7-2 求解方法

#### 方法一：先设电流，再求电压

1. 假设两电极之间的电流为 $I$；
1. 由

$$
\vec J=\sigma\vec E
$$

求出 $\vec E$；

1. 由

$$
U=\int_1^2 \vec E\cdot d\vec l
$$

求两电极电压；

1. 最后用

$$
G=\frac{I}{U}
$$

求电导。



#### 方法二：先设电压，再求电流

1. 假设两电极电势差为 $U$；
1. 求电势函数 $\varphi$，通常满足

$$
\nabla^2\varphi=0
$$

1. 由

$$
\vec E=-\nabla\varphi,
\qquad
\vec J=\sigma\vec E
$$

求电流密度；

1. 由

$$
I=\iint_S \vec J\cdot d\vec S
$$

求总电流；

1. 再用

$$
G=\frac{I}{U}
$$

求电导。



#### 方法三：静电比拟法

若某一电阻问题与一个电容问题具有相同几何边界，并且介质参数可对应为

$$
\varepsilon \longleftrightarrow \sigma
$$

则有

$$
\frac{G}{C}=\frac{\sigma}{\varepsilon}
$$

因此如果已经知道对应电容 $C$，可以直接得到电导 $G$。

### 5-7-3 典型例题

:::: stem 两层非理想电介质串联

平行板电容器由两层非理想电介质串联构成。两层介质的介电常数分别为 $\varepsilon_1,\varepsilon_2$，电导率分别为 $\sigma_1,\sigma_2$，厚度分别为 $d_1,d_2$。外加电压为 $U$。

求两层介质中的电场强度、电能密度和功率损耗密度。

![alt text](<EMFT Chapter 5.attachments/ch5-series-imperfect-dielectrics.jpg>)

::::
:::: solution

由于电流线垂直于极板，且稳恒电流场满足法向电流连续，所以

$$
\sigma_1E_1=\sigma_2E_2
$$

又因为总电压为

$$
E_1d_1+E_2d_2=U
$$

联立可得

$$

E_1=
\frac{\sigma_2}
{d_1\sigma_2+d_2\sigma_1}U

$$

$$

E_2=
\frac{\sigma_1}
{d_1\sigma_2+d_2\sigma_1}U

$$

界面自由面电荷密度为

$$

\rho_s
=
D_{1n}-D_{2n}
=
\frac{\sigma_2\varepsilon_1-\sigma_1\varepsilon_2}
{\sigma_2d_1+\sigma_1d_2}U

$$

两层介质中的电能密度分别为

$$

w_{e1}=\frac{1}{2}\varepsilon_1E_1^2,
\qquad
w_{e2}=\frac{1}{2}\varepsilon_2E_2^2

$$

功率损耗密度分别为

$$

p_{l1}=\sigma_1E_1^2,
\qquad
p_{l2}=\sigma_2E_2^2

$$

> [!NOTE]
> 这个例题的核心不是 $\varepsilon$，而是 $\sigma$。  
> 稳恒电流分布先由
>
> $$
> J_{1n}=J_{2n}
> $$
>
> 决定，所以电场大小由电导率分配；介电常数只影响电能密度和界面电荷。

::::

:::: stem 两层介质同轴线中的稳恒电流

同轴结构中，内导体电势为 $U_0$，外导体接地。两层导电介质分界半径为 $b$，内外导体半径分别为 $a,c$，电导率为 $\sigma_1,\sigma_2$。

求各区域中的电流密度、电场强度以及界面自由电荷面密度。

![alt text](<EMFT Chapter 5.attachments/ch5-coax-two-media.jpg>)

::::
:::: solution

由于结构轴对称，电流沿径向流动。设单位长度上的总电流为 $I_l$，则半径为 $\rho$ 的同轴圆柱面面积为

$$
2\pi\rho
$$

于是

$$
\vec J
=
\vec e_\rho\frac{I_l}{2\pi\rho}
\qquad
(a<\rho<c)
$$

两层介质中的电场为

$$
\vec E_1
=
\frac{\vec J}{\sigma_1}
=
\vec e_\rho\frac{I_l}{2\pi\sigma_1\rho}
\qquad
(a<\rho<b)
$$

$$
\vec E_2
=
\frac{\vec J}{\sigma_2}
=
\vec e_\rho\frac{I_l}{2\pi\sigma_2\rho}
\qquad
(b<\rho<c)
$$

电压满足

$$
U_0
=
\int_a^b \vec E_1\cdot d\vec \rho
+
\int_b^c \vec E_2\cdot d\vec \rho
$$

即

$$
U_0
=
\frac{I_l}{2\pi\sigma_1}\ln\frac{b}{a}
+
\frac{I_l}{2\pi\sigma_2}\ln\frac{c}{b}
$$

所以

$$

I_l
=
\frac{2\pi\sigma_1\sigma_2U_0}
{\sigma_2\ln(b/a)+\sigma_1\ln(c/b)}

$$

因此

$$

\vec J
=
\vec e_\rho
\frac{\sigma_1\sigma_2U_0}
{\rho\left[\sigma_2\ln(b/a)+\sigma_1\ln(c/b)\right]}

$$

$$

\vec E_1
=
\vec e_\rho
\frac{\sigma_2U_0}
{\rho\left[\sigma_2\ln(b/a)+\sigma_1\ln(c/b)\right]}

$$

$$

\vec E_2
=
\vec e_\rho
\frac{\sigma_1U_0}
{\rho\left[\sigma_2\ln(b/a)+\sigma_1\ln(c/b)\right]}

$$

界面 $\rho=b$ 上自由面电荷密度为

$$

\rho_{s12}
=
\frac{(\varepsilon_2\sigma_1-\varepsilon_1\sigma_2)U_0}
{b\left[\sigma_2\ln(b/a)+\sigma_1\ln(c/b)\right]}

$$

::::

:::: stem 同轴线漏电电阻

同轴线内外半径为 $a,b$，长度为 $l$，中间介质电导率为 $\sigma$。求内外导体之间的电阻。

![alt text](<EMFT Chapter 5.attachments/ch5-coax-resistance.jpg>)

::::
:::: solution

设从内导体流向外导体的总电流为 $I$。由于电流径向分布，半径为 $\rho$ 的圆柱面面积为

$$
2\pi\rho l
$$

所以

$$
J=\frac{I}{2\pi\rho l}
$$

由欧姆定律微分形式

$$
\vec J=\sigma\vec E
$$

可得

$$
E=\frac{I}{2\pi\rho l\sigma}
$$

电压为

$$
U
=
\int_a^b E\,d\rho
=
\int_a^b
\frac{I}{2\pi\rho l\sigma}
d\rho
=
\frac{I}{2\pi\sigma l}\ln\frac{b}{a}
$$

因此

$$

G=\frac{I}{U}
=
\frac{2\pi\sigma l}{\ln(b/a)}

$$

$$

R=\frac{1}{G}
=
\frac{1}{2\pi\sigma l}\ln\frac{b}{a}

$$

::::

:::: stem 四分之一圆环导电片电阻

如图为四分之一圆环导电片，内外半径分别为 $a,b$，厚度为 $t$，电导率为 $\sigma$。求两端面之间沿 $\phi$ 方向的电阻。

![alt text](<EMFT Chapter 5.attachments/ch5-quarter-washer.jpg>)

::::
:::: solution

取柱坐标系。设两端面电势分别为

$$
\varphi(0)=0,
\qquad
\varphi\left(\frac{\pi}{2}\right)=U
$$

由于电势只与角度 $\phi$ 有关，满足

$$
\frac{d^2\varphi}{d\phi^2}=0
$$

通解为

$$
\varphi=C_1\phi+C_2
$$

代入边界条件得

$$
\varphi=\frac{2U}{\pi}\phi
$$

电场为

$$
\vec E
=
-\nabla\varphi
=
-\vec e_\phi
\frac{1}{r}\frac{\partial\varphi}{\partial\phi}
=
-\vec e_\phi
\frac{2U}{\pi r}
$$

电流密度为

$$
\vec J
=
\sigma\vec E
=
-\vec e_\phi
\frac{2\sigma U}{\pi r}
$$

穿过端面 $\phi=\frac{\pi}{2}$ 的电流为

$$
I
=
\int_a^b
\frac{2\sigma U}{\pi r}
t\,dr
=
\frac{2\sigma Ut}{\pi}
\ln\frac{b}{a}
$$

所以

$$

R
=
\frac{U}{I}
=
\frac{\pi}
{2\sigma t\ln(b/a)}

$$

::::

:::: stem 一般圆环扇形导电介质

圆环扇形导电介质厚度为 $h$，内外半径分别为 $r_1,r_2$，圆心角为 $\phi_0$，电导率为 $\sigma$。求两径向电极之间沿 $\phi$ 方向的电阻。

![alt text](<EMFT Chapter 5.attachments/ch5-annular-sector.jpg>)

::::
:::: solution

设两电极之间电压为 $U_0$，边界条件为

$$
\varphi(0)=U_0,
\qquad
\varphi(\phi_0)=0
$$

由于电势只与 $\phi$ 有关：

$$
\nabla^2\varphi
=
\frac{1}{\rho^2}
\frac{\partial^2\varphi}{\partial\phi^2}
=0
$$

通解为

$$
\varphi=C_1\phi+C_2
$$

代入边界条件得

$$
\varphi
=
U_0-\frac{U_0}{\phi_0}\phi
$$

电场为

$$
\vec E
=
-\nabla\varphi
=
\vec e_\phi
\frac{U_0}{\rho\phi_0}
$$

电流密度为

$$
\vec J
=
\sigma\vec E
=
\vec e_\phi
\frac{\sigma U_0}{\rho\phi_0}
$$

总电流为

$$
I
=
\int_{r_1}^{r_2}
\frac{\sigma U_0}{\rho\phi_0}
h\,d\rho
=
\frac{\sigma U_0h}{\phi_0}
\ln\frac{r_2}{r_1}
$$

所以电阻为

$$

R
=
\frac{U_0}{I}
=
\frac{\phi_0}
{\sigma h\ln(r_2/r_1)}

$$

当 $\phi_0=\dfrac{\pi}{2}$ 且 $h=t$ 时，就退化为上一题的结果。

::::

## 5-8 总结

稳恒电流场的核心关系可以总结为：

| 项目 | 公式 | 意义 |
| --- | --- | --- |
| 电流定义 | $I=\dfrac{dq}{dt}$ | 单位时间通过截面的电荷量 |
| 电流密度通量 | $I=\iint_S\vec J\cdot d\vec S$ | 电流是 $\vec J$ 的通量 |
| 欧姆定律微分形式 | $\vec J=\sigma\vec E$ | 线性各向同性导电介质中的本构关系 |
| 电势关系 | $\vec E=-\nabla\varphi$ | 电场由电势负梯度给出 |
| 连续性方程 | $\nabla\cdot\vec J=-\dfrac{\partial\rho}{\partial t}$ | 电荷守恒的微分形式 |
| 稳恒条件 | $\nabla\cdot\vec J=0$ | 稳恒电流场无散 |
| 均匀介质环路性质 | $\nabla\times\vec J=0$ | 均匀导电介质中 $\vec J$ 无旋 |
| 焦耳损耗密度 | $p_l=\vec E\cdot\vec J=\sigma E^2=\dfrac{J^2}{\sigma}$ | 单位体积发热功率 |
| 总功率 | $P=\iiint_V\vec E\cdot\vec J\,dV$ | 整个导电区域的功率损耗 |
| 电导与电阻 | $G=\dfrac{I}{U},\quad R=\dfrac{U}{I}$ | 电流场整体参数 |
| 静电比拟 | $\dfrac{G}{C}=\dfrac{\sigma}{\varepsilon}$ | 同几何结构下 $\vec J$ 对应 $\vec D$ |

> [!IMPORTANT]
> 稳恒电流场最常用的解题链条是：
>
> $$
> \text{边界条件}
> \Rightarrow
> \varphi
> \Rightarrow
> \vec E=-\nabla\varphi
> \Rightarrow
> \vec J=\sigma\vec E
> \Rightarrow
> I,\;G,\;R,\;P
> $$
>
> 若几何对称性强，也可以反过来先设 $I$，再由 $\vec J$ 和 $\vec E$ 求电压。
