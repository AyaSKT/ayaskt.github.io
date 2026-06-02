# Ex 2 概念复习 Concept Review

**「あるべき人間の姿へ」，「正しい人間の姿へ」。**  
**「做该做的事」，「做正确的事」。**  


<div align="right">——花譜《不可解 (Inexplicable)》</div>

![alt text](<EFMT Extra 2.attachments/1780388664426.jpg>)

> [!CAUTION]
> Assisted with AI generation.

| 概念题类型 | 2022 | 2023 | 2024 | 2025 | 频率 |
| --- | :---: | :---: | :---: | :---: | :---: |
| 极化类型与判断 | Q1d, Q3c | Q2c | Q1d, Q3b | Q3a,b,c | 连考四年 |
| 场论 vs 电路理论 | Q1a | - | - | - | 一年 |
| 静电场 / 电势 / 电容 | Q1b | Q1a,b,c | Q1b | Q1c,d | 连考四年 |
| 介质极化 / 束缚电荷 | - | - | - | Q1a | 一年 |
| 边界条件 | Q1c, Q2a | Q1b,d | Q1b | Q2a, Q1c | 连考四年 |
| 位移电流 | Q3a | - | Q1c | - | 两年 |
| Maxwell 方程组 | - | - | Q1a | - | 一年 |
| 坡印廷矢量 / 坡印廷定理 | Q3b | Q2b | - | Q4a | 三年 |
| 时谐场与相量法 | - | Q2a | Q4b,c | Q3, Q4 | 三年 |
| 行波 / 驻波 / 行驻波 | - | - | Q2b | - | 一年 |
| E 与 H 相位关系 | - | - | Q2a | - | 一年 |
| 规范条件 Coulomb / Lorenz gauge | Q1b | - | - | Q1b | 两年 |
| 传导电流 vs 磁化电流 | - | Q1d | - | Q2a,c | 两年 |

## 章节目录

- [章节目录](#章节目录)
- [Ex 2-1 场论与电路理论 Field Theory and Circuit Theory](#ex-2-1-场论与电路理论-field-theory-and-circuit-theory)
- [Ex 2-2 数学工具 Mathematical Concepts](#ex-2-2-数学工具-mathematical-concepts)
- [Ex 2-3 静电场 Static Electric Field](#ex-2-3-静电场-static-electric-field)
- [Ex 2-4 电介质与极化 Dielectrics and Polarization](#ex-2-4-电介质与极化-dielectrics-and-polarization)
- [Ex 2-5 恒定电流 Steady Electric Current](#ex-2-5-恒定电流-steady-electric-current)
- [Ex 2-6 静磁场与磁介质 Magnetostatics and Magnetic Media](#ex-2-6-静磁场与磁介质-magnetostatics-and-magnetic-media)
- [Ex 2-7 时变场与 Maxwell 方程 Time-Varying Fields and Maxwell Equations](#ex-2-7-时变场与-maxwell-方程-time-varying-fields-and-maxwell-equations)
- [Ex 2-8 时谐场与平面波 Time-Harmonic Fields and Plane Waves](#ex-2-8-时谐场与平面波-time-harmonic-fields-and-plane-waves)
- [Ex 2-9 法向入射与反射 Normal Incidence and Reflection](#ex-2-9-法向入射与反射-normal-incidence-and-reflection)
- [Ex 2-10 英文答题模板 Answer Templates](#ex-2-10-英文答题模板-answer-templates)
- [总结 Summary](#总结-summary)


## Ex 2-1 场论与电路理论 Field Theory and Circuit Theory

2022 Q1a。Chapter 1 总论题。记住 **lumped parameters** 和 **distributed parameters** 这两个词就行。

:::: definition 电路理论 Circuit Theory

电路理论用集中参数模型描述。电压、电流、$RLC$ 等都集中在理想元件上，元件尺寸远小于波长，信号传播延迟忽略不计。

::::

**适用条件：**

$$
l \ll \lambda
$$

其中 $l$ 为电路尺寸，$\lambda$ 为工作频率对应波长。

常用参数：

| 电路理论 | 含义 |
| --- | --- |
| $U$ | 电压 |
| $I$ | 电流 |
| $R$ | 电阻 |
| $C$ | 电容 |
| $L$ | 电感 |
| $P$ | 功率 |

:::: definition 电磁场理论 Electromagnetic Field Theory

电磁场理论中，电场和磁场是空间与时间的函数。电磁现象由场量分布描述，需要考虑传播、边界、能量流和波动效应。

::::

常用参数：

| 电磁场理论 | 含义 |
| --- | --- |
| $\vec E$ | 电场强度 |
| $\vec D$ | 电通量密度 |
| $\vec H$ | 磁场强度 |
| $\vec B$ | 磁感应强度 |
| $\rho,\ \vec J$ | 电荷密度、电流密度 |
| $\varepsilon,\ \mu,\ \sigma$ | 介电常数、磁导率、电导率 |

**区别表：**

| 角度 | 电路理论 | 电磁场理论 |
| --- | --- | --- |
| 参数特点 | 集中参数 Lumped parameters | 分布参数 Distributed parameters |
| 变量 | $U,I,R,L,C$ | $\vec E,\vec D,\vec H,\vec B,\rho,\vec J$ |
| 空间分布 | 通常忽略 | 需要考虑 |
| 时间延迟 | 通常忽略 | 传播速度有限 |
| 基本规律 | KCL, KVL, Ohm's law | Maxwell's equations |
| 典型场景 | 低频、小尺寸电路 | 高频、长线、天线、波导、辐射问题 |

可直接写：

> Circuit theory uses lumped parameters such as voltage and current. Field theory uses distributed quantities such as $\vec E$ and $\vec H$. When the size is comparable with wavelength, field theory should be applied.

## Ex 2-2 数学工具 Mathematical Concepts

这部分很少单独考大题，但会混在边界条件、位函数和波动方程里。



### Ex 2-2-1 梯度 Gradient <!-- omit from toc -->

:::: definition 梯度 Gradient

标量场 $u$ 的梯度是一个矢量，方向为 $u$ 增加最快的方向，大小为最大方向导数。

$$
\nabla u
$$
::::

常用物理意义：

$$
\vec E=-\nabla\varphi
$$

电场方向是电势下降最快的方向。

---

### Ex 2-2-2 散度 Divergence <!-- omit from toc -->

:::: definition 散度 Divergence

散度表示单位体积内净向外通量的极限，用来描述矢量场的源。

$$
\nabla\cdot\vec F
$$
::::

在电磁场中：

$$
\nabla\cdot\vec D=\rho,\qquad \nabla\cdot\vec B=0
$$

$\vec D$ 有电荷源，$\vec B$ 无磁单极源。

---

### Ex 2-2-3 旋度 Curl <!-- omit from toc -->

:::: definition 旋度 Curl

旋度表示单位面积环量的极限，用来描述矢量场的旋涡源。

$$
\nabla\times\vec F
$$
::::

在电磁场中：

$$
\nabla\times\vec E=-\frac{\partial\vec B}{\partial t},\qquad
\nabla\times\vec H=\vec J+\frac{\partial\vec D}{\partial t}
$$

---

### Ex 2-2-4 Stokes 定理与散度定理 <!-- omit from toc -->

两条定理经常用于微分形式和积分形式互换。

$$
\oint_C\vec F\cdot d\vec l=\iint_S(\nabla\times\vec F)\cdot d\vec S
$$

$$
\oiint_S\vec F\cdot d\vec S=\iiint_V\nabla\cdot\vec F\,dV
$$

**积分形式**适合整体区域，**微分形式**适合空间一点处的局部关系。

## Ex 2-3 静电场 Static Electric Field

### Ex 2-3-1 静电场定义 <!-- omit from toc -->

2023 Q1a 问过静电场。

:::: definition 静电场 Static Electric Field

静止电荷产生的电场称为静电场。静电场不随时间变化，且为无旋场。

$$
\nabla\times\vec E=0
$$
::::

基本方程：

$$
\nabla\times\vec E=0,\qquad \nabla\cdot\vec D=\rho
$$

线性介质中：

$$
\vec D=\varepsilon\vec E
$$

---

### Ex 2-3-2 导体内部静电场为零 <!-- omit from toc -->

2023 Q1a 问过原因。

静电平衡时，导体内部自由电荷不再宏观移动。若内部仍存在电场，自由电荷会继续受力运动，因此静电平衡条件要求：

$$
\vec E=0
$$

导体静电性质：

| 位置 | 性质 |
| --- | --- |
| 导体内部 | $\vec E=0$ |
| 导体内部 | $\rho=0$ |
| 导体表面 | 电场垂直导体表面 |
| 整个导体 | 等势体 |
| 净电荷 | 分布在导体表面 |

可直接写：

> In electrostatic equilibrium, the electric field inside a conductor must be zero. Otherwise free charges would experience electric force and keep moving, which contradicts the electrostatic condition.

---

### Ex 2-3-3 标量电势 Scalar Potential <!-- omit from toc -->

2022 Q1b 问过静电场和时变场中 scalar potential 的意义。

:::: definition 静电标量电势 Electrostatic Scalar Potential

由于静电场无旋，可以用标量电势描述电场。

$$
\vec E=-\nabla\varphi
$$
::::

物理意义：

$$
\varphi=\frac{W}{q}
$$

电势表示单位正电荷从该点移动到参考点时电场力所做的功。

---

### Ex 2-3-4 时变场中的标量电势 <!-- omit from toc -->

时变场中一般有：

$$
\nabla\times\vec E=-\frac{\partial\vec B}{\partial t}\ne0
$$

因此只用 $-\nabla\varphi$ 不够，需要引入磁矢位：

$$
\vec B=\nabla\times\vec A
$$

$$
\vec E=-\nabla\varphi-\frac{\partial\vec A}{\partial t}
$$

区别：

| 情况 | 电场表达式 | 说明 |
| --- | --- | --- |
| 静电场 | $\vec E=-\nabla\varphi$ | 电势完全决定电场 |
| 时变场 | $\vec E=-\nabla\varphi-\partial\vec A/\partial t$ | 标量位只描述电场的一部分 |

---

### Ex 2-3-5 Poisson 方程与 Laplace 方程 <!-- omit from toc -->

2023 Q1b 和 2025 Q1c 都和电势方程有关。

由

$$
\vec E=-\nabla\varphi,\qquad \nabla\cdot\vec D=\rho
$$

可得 Poisson 方程：

$$
\nabla^2\varphi=-\frac{\rho}{\varepsilon}
$$

无源区 $\rho=0$ 时退化为 Laplace 方程：

$$
\nabla^2\varphi=0
$$

**波导或矩形区域中的电势问题**通常写：

$$
\nabla^2\varphi=0
$$

再配合边界上的电势值或法向导数条件。

---

### Ex 2-3-6 静电势边界条件 <!-- omit from toc -->

两种无损介质界面上：

$$
\varphi_1=\varphi_2
$$

$$
\varepsilon_1\frac{\partial\varphi_1}{\partial n}
-\varepsilon_2\frac{\partial\varphi_2}{\partial n}
=-\rho_s
$$

若界面无自由面电荷：

$$
\varepsilon_1\frac{\partial\varphi_1}{\partial n}
=\varepsilon_2\frac{\partial\varphi_2}{\partial n}
$$

等价地，电场边界条件为：

$$
E_{1t}=E_{2t},\qquad D_{1n}-D_{2n}=\rho_s
$$

---

### Ex 2-3-7 电容 Capacitance <!-- omit from toc -->

2023 Q1c 问过定义，2025 Q1d 考过同轴线分层介质电容。

:::: definition 电容 Capacitance

电容定义为导体所带电荷量与其电势或电压的比值。

$$
C=\frac{Q}{U}
$$
::::

孤立导体：

$$
C=\frac{Q}{\varphi}
$$

双导体：

$$
C=\frac{Q}{U_{12}}
$$

真空中半径为 $a$ 的孤立导体球：

$$
C=4\pi\varepsilon_0 a
$$

可直接写：

> Capacitance measures the ability of a conductor system to store electric charge under a given potential difference. It depends only on geometry and medium parameters.

## Ex 2-4 电介质与极化 Dielectrics and Polarization

### Ex 2-4-1 电介质 Dielectric <!-- omit from toc -->

:::: definition 电介质 Dielectric

电介质中没有可以在宏观范围内自由移动的电荷，但束缚电荷会在外电场作用下发生微小位移，形成极化。

::::

与导体区别：

| 材料 | 电荷特点 | 外电场作用 |
| --- | --- | --- |
| 导体 | 有自由载流子 | 自由电荷宏观移动 |
| 电介质 | 主要为束缚电荷 | 束缚电荷微小偏移或取向 |

---

### Ex 2-4-2 电极化 Polarization of Dielectric <!-- omit from toc -->

2025 Q1a 问过 dielectric polarization。

:::: definition 电极化 Polarization

电介质在外加静电场作用下，正负束缚电荷中心发生相对位移，或分子电偶极矩发生取向排列，这种现象称为电极化。

::::

电极化强度定义为单位体积内电偶极矩矢量和：

$$
\vec P=\lim_{\Delta V\to0}\frac{\sum \vec p_i}{\Delta V}
$$

线性各向同性介质中：

$$
\vec P=\varepsilon_0\chi_e\vec E
$$

---

### Ex 2-4-3 束缚电荷 vs 传导电荷 <!-- omit from toc -->

2025 Q1a 明确要求 differentiate。

| 对象 | 束缚电荷 Bound charge | 传导电荷 Conducting charge |
| --- | --- | --- |
| 来源 | 电介质极化 | 导体自由载流子移动 |
| 是否能自由移动 | 不能宏观自由移动 | 可以宏观移动 |
| 典型位置 | 介质体内和表面 | 导体表面或导体内部电流 |
| 数学表示 | $\rho_p,\rho_{ps}$ | $\rho_f,\vec J$ |
| 作用 | 等效描述极化效应 | 真实自由电荷或传导电流 |

束缚电荷：

$$
\rho_p=-\nabla\cdot\vec P
$$

$$
\rho_{ps}=\vec P\cdot\vec e_n
$$

可直接写：

> Bound charge is caused by polarization of dielectric molecules and cannot move freely over macroscopic distance. Conducting charge is free charge in a conductor and can move under an electric field to form conduction current.

---

### Ex 2-4-4 电位移矢量 Electric Displacement Vector <!-- omit from toc -->

引入 $\vec D$ 是为了把自由电荷和极化束缚电荷分开处理。

$$
\vec D=\varepsilon_0\vec E+\vec P
$$

线性各向同性介质中：

$$
\vec D=\varepsilon\vec E
$$

高斯定律写成：

$$
\nabla\cdot\vec D=\rho_f
$$

$\vec D$ 的源是自由电荷，不直接把束缚电荷写进右侧。

---

### Ex 2-4-5 介质分类 <!-- omit from toc -->

常见默写关键词：

| 类型 | 判断标准 |
| --- | --- |
| 线性 / 非线性 | 响应是否与场强成正比 |
| 均匀 / 非均匀 | 介质参数是否随空间变化 |
| 各向同性 / 各向异性 | 性质是否与方向有关 |
| 时不变 / 时变 | 参数是否随时间变化 |
| 无耗 / 有耗 | $\sigma$ 是否可忽略 |
| 色散 / 非色散 | 参数是否随频率变化 |

## Ex 2-5 恒定电流 Steady Electric Current

### Ex 2-5-1 电流与电流密度 <!-- omit from toc -->

:::: definition 电流 Electric Current

电流定义为单位时间内通过某截面的电荷量。

$$
I=\frac{dq}{dt}
$$
::::

:::: definition 电流密度 Current Density

电流密度表示单位面积上的电流强度，方向为正电荷运动方向。

$$
I=\iint_S\vec J\cdot d\vec S
$$
::::

---

### Ex 2-5-2 欧姆定律 Ohm's Law <!-- omit from toc -->

微分形式：

$$
\vec J=\sigma\vec E
$$

其中 $\sigma$ 为电导率。

积分形式：

$$
U=IR
$$

---

### Ex 2-5-3 连续性方程 Continuity Equation <!-- omit from toc -->

电荷守恒的微分形式为：

$$
\nabla\cdot\vec J=-\frac{\partial\rho}{\partial t}
$$

稳恒电流中：

$$
\frac{\partial\rho}{\partial t}=0
$$

所以：

$$
\nabla\cdot\vec J=0
$$

稳恒电流场是无散场。

---

### Ex 2-5-4 传导电流 vs 运流电流 <!-- omit from toc -->

| 类型 | 来源 | 表达式 |
| --- | --- | --- |
| 传导电流 Conduction current | 导体内载流子在电场中漂移 | $\vec J=\sigma\vec E$ |
| 运流电流 Convection current | 带电粒子整体运动 | $\vec J=\rho\vec v$ |

---

### Ex 2-5-5 焦耳损耗 Joule Loss <!-- omit from toc -->

焦耳损耗功率密度：

$$
p=\vec J\cdot\vec E=\sigma E^2=\frac{J^2}{\sigma}
$$

位移电流没有这种传导电流意义下的焦耳热效应。

## Ex 2-6 静磁场与磁介质 Magnetostatics and Magnetic Media

### Ex 2-6-1 磁感应强度与磁场强度 <!-- omit from toc -->

:::: definition 磁感应强度 Magnetic Flux Density

磁感应强度 $\vec B$ 描述磁场对运动电荷或电流元产生力的能力。

$$
\vec F=q\vec v\times\vec B
$$
::::

:::: definition 磁场强度 Magnetic Field Intensity

磁场强度 $\vec H$ 用于把自由电流与介质磁化效应分开处理。

$$
\vec H=\frac{\vec B}{\mu_0}-\vec M
$$
::::

线性各向同性磁介质中：

$$
\vec B=\mu\vec H
$$

---

### Ex 2-6-2 安培环路定理 <!-- omit from toc -->

静磁场中：

$$
\nabla\times\vec H=\vec J_f
$$

积分形式：

$$
\oint_C\vec H\cdot d\vec l=I_{\mathrm{free}}
$$

若用 $\vec B$ 且在真空中：

$$
\oint_C\vec B\cdot d\vec l=\mu_0 I
$$

---

### Ex 2-6-3 磁矢位与 Coulomb Gauge <!-- omit from toc -->

由于

$$
\nabla\cdot\vec B=0
$$

可以引入磁矢位：

$$
\vec B=\nabla\times\vec A
$$

Coulomb gauge：

$$
\nabla\cdot\vec A=0
$$

适用场景：静磁场、低频或无辐射问题中常用。

---

### Ex 2-6-4 磁化矢量 Magnetization <!-- omit from toc -->

:::: definition 磁化矢量 Magnetization Vector

磁化矢量定义为单位体积内磁偶极矩的矢量和。

$$
\vec M=\lim_{\Delta V\to0}\frac{\sum\vec m_i}{\Delta V}
$$
::::

线性磁介质中：

$$
\vec M=\chi_m\vec H
$$

---

### Ex 2-6-5 磁化电流 Magnetized Current <!-- omit from toc -->

2023 Q1d 和 2025 Q2a,c 都涉及传导电流与磁化电流。

体磁化电流密度：

$$
\vec J_m=\nabla\times\vec M
$$

面磁化电流密度：

$$
\vec J_{sm}=\vec M\times\vec e_n
$$

其中 $\vec e_n$ 通常取介质表面向外法向。

区别：

| 对象 | 传导电流 Conduction current | 磁化电流 Magnetized current |
| --- | --- | --- |
| 来源 | 自由电荷宏观运动 | 磁偶极矩取向等效结果 |
| 是否真实自由电荷流 | 是 | 否，属于等效电流 |
| 公式 | $\vec J=\sigma\vec E$ | $\vec J_m=\nabla\times\vec M$ |
| 边界形式 | $\vec J_s$ | $\vec J_{sm}=\vec M\times\vec e_n$ |

可直接写：

> Conduction current is caused by free charge motion. Magnetized current is an equivalent current introduced to represent the macroscopic effect of magnetization.

---

### Ex 2-6-6 静磁场边界条件 <!-- omit from toc -->

磁感应强度法向连续：

$$
\vec e_n\cdot(\vec B_1-\vec B_2)=0
$$

磁场强度切向跳变：

$$
\vec e_n\times(\vec H_1-\vec H_2)=\vec J_s
$$

若无自由面电流：

$$
H_{1t}=H_{2t}
$$

---

### Ex 2-6-7 电感 Inductance <!-- omit from toc -->

磁通：

$$
\Phi=\iint_S\vec B\cdot d\vec S
$$

磁链：

$$
\Psi=N\Phi
$$

自感：

$$
L=\frac{\Psi}{I}
$$

互感：

$$
M=\frac{\Psi_{21}}{I_1}
$$

物理意义：电感描述电流产生磁链的能力。

## Ex 2-7 时变场与 Maxwell 方程 Time-Varying Fields and Maxwell Equations

### Ex 2-7-1 法拉第电磁感应定律 <!-- omit from toc -->

:::: definition 法拉第电磁感应定律 Faraday's Law

闭合回路中的感应电动势等于穿过回路的磁链变化率的负值。

$$
\varepsilon_{\mathrm{in}}=-\frac{d\Psi}{dt}
$$
::::

积分形式：

$$
\oint_C\vec E\cdot d\vec l
=-\iint_S\frac{\partial\vec B}{\partial t}\cdot d\vec S
$$

微分形式：

$$
\nabla\times\vec E=-\frac{\partial\vec B}{\partial t}
$$

物理意义：时变磁场产生涡旋电场。

---

### Ex 2-7-2 位移电流 Displacement Current <!-- omit from toc -->

2022 Q3a 和 2024 Q1c 都考过。

:::: definition 位移电流密度 Displacement Current Density

位移电流密度定义为电通量密度对时间的变化率。

$$
\vec J_d=\frac{\partial\vec D}{\partial t}
$$
::::

位移电流没有自由电荷的宏观迁移。它描述时变电场对磁场的贡献。

安培-麦克斯韦定律：

$$
\nabla\times\vec H=\vec J_f+\frac{\partial\vec D}{\partial t}
$$

考试问 electric field is the source of magnetic field 时：

时变电场是磁场旋度的源之一。传导电流和位移电流共同产生磁场旋涡。

可直接写：

> Displacement current does not mean free charge conduction. It represents the contribution of time-varying electric flux density to magnetic field.

---

### Ex 2-7-3 Maxwell 方程组 <!-- omit from toc -->

2024 Q1a 问过积分形式、微分形式和区别。

微分形式：

$$
\begin{cases}
\nabla\times\vec H=\vec J_f+\dfrac{\partial\vec D}{\partial t} \\[4pt]
\nabla\times\vec E=-\dfrac{\partial\vec B}{\partial t} \\[4pt]
\nabla\cdot\vec B=0 \\[4pt]
\nabla\cdot\vec D=\rho_f
\end{cases}
$$

积分形式：

$$
\begin{cases}
\displaystyle\oint_C\vec H\cdot d\vec l
=\iint_S\left(\vec J_f+\dfrac{\partial\vec D}{\partial t}\right)\cdot d\vec S \\[6pt]
\displaystyle\oint_C\vec E\cdot d\vec l
=-\iint_S\dfrac{\partial\vec B}{\partial t}\cdot d\vec S \\[6pt]
\displaystyle\oiint_S\vec B\cdot d\vec S=0 \\[6pt]
\displaystyle\oiint_S\vec D\cdot d\vec S=\iiint_V\rho_f\,dV
\end{cases}
$$

区别：

| 形式 | 特点 |
| --- | --- |
| 微分形式 | 描述空间一点处的局部关系 |
| 积分形式 | 描述有限路径、曲面或体积上的整体关系 |

---

### Ex 2-7-4 电磁边界条件 <!-- omit from toc -->

设 $\vec e_n$ 从介质 2 指向介质 1。

$$
\begin{cases}
\vec e_n\cdot(\vec D_1-\vec D_2)=\rho_s \\[4pt]
\vec e_n\cdot(\vec B_1-\vec B_2)=0 \\[4pt]
\vec e_n\times(\vec E_1-\vec E_2)=0 \\[4pt]
\vec e_n\times(\vec H_1-\vec H_2)=\vec J_s
\end{cases}
$$

记忆：

| 条件 | 来源 |
| --- | --- |
| $D_n$ 跳变 | Gauss law for electric field |
| $B_n$ 连续 | Gauss law for magnetic field |
| $E_t$ 连续 | Faraday law |
| $H_t$ 跳变 | Ampere-Maxwell law |

理想导体表面，取 $\vec e_n$ 从导体指向外部介质：

$$
\vec e_n\cdot\vec D=\rho_s,\qquad
\vec e_n\times\vec E=0,\qquad
\vec e_n\cdot\vec B=0,\qquad
\vec e_n\times\vec H=\vec J_s
$$

---

### Ex 2-7-5 波动方程 Wave Equation <!-- omit from toc -->

无源均匀介质中：

$$
\nabla^2\vec E-\mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}=0
$$

$$
\nabla^2\vec H-\mu\varepsilon\frac{\partial^2\vec H}{\partial t^2}=0
$$

波速：

$$
v=\frac{1}{\sqrt{\mu\varepsilon}}
$$

物理意义：时变电场和时变磁场互相激发，并以有限速度传播。

---

### Ex 2-7-6 Coulomb Gauge 与 Lorenz Gauge <!-- omit from toc -->

2025 Q1b 问过。

Coulomb gauge：

$$
\nabla\cdot\vec A=0
$$

常用于静磁场或准静态问题。此时磁矢位常满足 Poisson 型方程。

Lorenz gauge：

$$
\nabla\cdot\vec A+\mu\varepsilon\frac{\partial\varphi}{\partial t}=0
$$

常用于时变场和电磁波问题。它能使 $\vec A$ 与 $\varphi$ 的波动方程解耦，并且形式上满足相对论协变性。

| Gauge | 条件 | 典型场景 |
| --- | --- | --- |
| Coulomb gauge | $\nabla\cdot\vec A=0$ | 静磁场、准静态场 |
| Lorenz gauge | $\nabla\cdot\vec A+\mu\varepsilon\partial\varphi/\partial t=0$ | 时变场、电磁波 |

## Ex 2-8 时谐场与平面波 Time-Harmonic Fields and Plane Waves

### Ex 2-8-1 时谐场定义与动机 <!-- omit from toc -->

2023 Q2a 问过。

:::: definition 时谐场 Time-Harmonic Field

所有场量都以同一角频率 $\omega$ 作正弦变化的电磁场。

$$
A(\vec r,t)=\operatorname{Re}[\dot A(\vec r)e^{j\omega t}]
$$
::::

说白了，就是因为单频正弦最好分析。任意周期信号可以拆成多个正弦分量，时谐场把 $\partial_t$ 变成 $j\omega$，微分方程直接变代数方程，算传播、反射、功率、损耗都省事。

相量法规则：

$$
\frac{\partial}{\partial t}\Longleftrightarrow j\omega,\qquad
\int dt\Longleftrightarrow\frac{1}{j\omega}
$$

---

### Ex 2-8-2 复介电常数与损耗角正切 <!-- omit from toc -->

导电介质中：

$$
\nabla\times\dot{\vec H}
=\dot{\vec J}_{\mathrm{introduced}}+\sigma\dot{\vec E}+j\omega\varepsilon\dot{\vec E}
$$

定义复介电常数：

$$
\varepsilon_c=\varepsilon-j\frac{\sigma}{\omega}
$$

损耗角正切：

$$
\tan\delta_\sigma=\frac{\sigma}{\omega\varepsilon}
$$

判断：

| 介质 | 条件 |
| --- | --- |
| 低损耗介质 | $\sigma/(\omega\varepsilon)\ll1$ |
| 良导体 | $\sigma/(\omega\varepsilon)\gg1$ |

---

### Ex 2-8-3 均匀平面波 Uniform Plane Wave <!-- omit from toc -->

:::: definition 均匀平面波 Uniform Plane Wave

等相位面为平面，并且同一等相位面上场强振幅和方向都保持不变的电磁波。

::::

沿 $+z$ 传播：

$$
\dot{\vec E}(z)=\dot{\vec E}_m e^{-jkz}
$$

对应瞬时相位：

$$
\omega t-kz
$$

所以 $e^{-jkz}$ 表示沿 $+z$ 传播，$e^{jkz}$ 表示沿 $-z$ 传播。

---

### Ex 2-8-4 TEM 波性质 <!-- omit from toc -->

均匀平面波在理想介质中是 TEM 波：

$$
\vec k\cdot\dot{\vec E}=0,\qquad
\vec k\cdot\dot{\vec H}=0,\qquad
\dot{\vec E}\cdot\dot{\vec H}=0
$$

$\dot{\vec E},\dot{\vec H},\vec k$ 两两垂直，满足右手关系。

E-H 关系：

$$
\dot{\vec H}=\frac{1}{\eta}\vec e_n\times\dot{\vec E}
$$

$$
\dot{\vec E}=-\eta\vec e_n\times\dot{\vec H}
$$

本征阻抗：

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$

---

### Ex 2-8-5 E 与 H 的相位关系 <!-- omit from toc -->

2024 Q2a 问过。

| 介质 | E 与 H 相位关系 |
| --- | --- |
| 理想介质 Perfect dielectric | 同相 |
| 良导体 Good conductor | $\vec H$ 相对 $\vec E$ 滞后 $45^\circ$ |

良导体中：

$$
\eta_c\approx(1+j)\sqrt{\frac{\pi f\mu}{\sigma}}
$$

因此 $\eta_c$ 相位为 $45^\circ$。因为 $\dot{\vec H}=\dot{\vec E}/\eta_c$，磁场相对电场滞后 $45^\circ$。

---

### Ex 2-8-6 电磁波极化 Polarization <!-- omit from toc -->

四年都考过，优先背。

:::: definition 电磁波极化 Polarization of Electromagnetic Wave

电磁波的极化描述空间固定点处电场矢量端点随时间变化形成的轨迹。

::::

沿 $+z$ 传播时：

$$
E_x=E_{xm}\cos{(\omega t-kz+\phi_x)}
$$

$$
E_y=E_{ym}\cos{(\omega t-kz+\phi_y)}
$$

定义：

$$
\Delta\phi=\phi_y-\phi_x
$$

判断表：

| 条件 | 极化 |
| --- | --- |
| $\Delta\phi=0,\pm\pi$ | 线极化 |
| $E_{xm}=E_{ym}$，$\Delta\phi=+\pi/2$ | 左旋圆极化 |
| $E_{xm}=E_{ym}$，$\Delta\phi=-\pi/2$ | 右旋圆极化 |
| 其他非线性情况 | 椭圆极化 |

沿 $-z$ 传播时，旋向判断相反。

判断步骤：

1. 统一成余弦形式；
2. 读出 $E_{xm},E_{ym},\phi_x,\phi_y$；
3. 计算 $\Delta\phi=\phi_y-\phi_x$；
4. 先判断线/圆/椭圆；
5. 再结合传播方向判断左右旋。

---

### Ex 2-8-7 圆极化 TEM 波特征 <!-- omit from toc -->

2022 Q3c 问过 circular polarized TEM wave。

圆极化 TEM 波满足：

1. 两个正交电场分量振幅相等；
2. 两个正交分量相位差为 $\pm\pi/2$；
3. 电场矢量端点在固定空间点处作圆周运动；
4. $\vec E,\vec H,\vec k$ 两两垂直；
5. $\vec E$ 与 $\vec H$ 的振幅比为本征阻抗 $\eta$。

---

### Ex 2-8-8 坡印廷定理与坡印廷矢量 <!-- omit from toc -->

2022 Q3b 和 2023 Q2b 问过。

:::: definition 坡印廷矢量 Poynting Vector

坡印廷矢量定义为电场和磁场的叉乘，表示电磁能流密度。

$$
\vec S=\vec E\times\vec H
$$
::::

方向：电磁能量传播方向。  
大小：单位面积上的功率流密度。

时均坡印廷矢量：

$$
\vec S_{\mathrm{av}}=\frac12\operatorname{Re}[\dot{\vec E}\times\dot{\vec H}^*]
$$

坡印廷定理微分形式：

$$
-\nabla\cdot(\vec E\times\vec H)
=\frac{\partial}{\partial t}
\left(
\frac12\vec E\cdot\vec D+\frac12\vec H\cdot\vec B
\right)
+\vec E\cdot\vec J
$$

物理意义：

$$
\text{流入体积的功率}
=
\text{电磁能增加率}
+
\text{焦耳损耗功率}
$$

---

### Ex 2-8-9 行波、驻波、行驻波 <!-- omit from toc -->

2024 Q2b 问过。

| 类型 | 定义 | 平均能流 |
| --- | --- | --- |
| 行波 Travelling wave | 能量沿传播方向传输的波 | 非零 |
| 驻波 Standing wave | 等幅反向波叠加，振幅分布固定 | 零 |
| 行驻波 Travelling-standing wave | 不等幅入射波与反射波叠加 | 非零但有振幅起伏 |

驻波中电场和磁场在空间上错开 $\lambda/4$，时间相位差为 $\pi/2$。

---

### Ex 2-8-10 有损媒质与趋肤效应 <!-- omit from toc -->

有损媒质中：

$$
\dot{\vec E}(z)=\dot{\vec E}_m e^{-\alpha z}e^{-j\beta z}
$$

$\alpha$ 控制衰减，$\beta$ 控制相位。

良导体近似：

$$
\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}
$$

趋肤深度：

$$
\delta=\frac{1}{\alpha}
$$

物理意义：频率越高，电磁场和高频电流越集中在导体表面附近。

## Ex 2-9 法向入射与反射 Normal Incidence and Reflection

### Ex 2-9-1 反射系数与透射系数 <!-- omit from toc -->

电磁波从介质 1 法向入射到介质 2：

$$
\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1}
$$

$$
\tau=\frac{2\eta_2}{\eta_2+\eta_1}
$$

其中：

$$
E_{rm}=\Gamma E_{im},\qquad E_{tm}=\tau E_{im}
$$

---

### Ex 2-9-2 理想导体边界 <!-- omit from toc -->

理想导体中：

$$
\eta_2=0
$$

所以：

$$
\Gamma=-1,\qquad \tau=0
$$

物理意义：电场全反射且反相，导体内部透射场为零，导体表面形成感应电流。

---

### Ex 2-9-3 无反射条件 <!-- omit from toc -->

2024 Q4d 和 2025 Q4c 都涉及减少反射或无反射。

法向入射无反射要求：

$$
\Gamma=0
$$

即：

$$
\eta_1=\eta_2
$$

对于理想介质：

$$
\sqrt{\frac{\mu_1}{\varepsilon_1}}
=
\sqrt{\frac{\mu_2}{\varepsilon_2}}
$$

也就是：

$$
\frac{\mu_1}{\varepsilon_1}=\frac{\mu_2}{\varepsilon_2}
$$

减少反射的方法：

1. 使两侧本征阻抗匹配；
2. 使用匹配层或渐变介质；
3. 调整介质的 $\varepsilon$ 与 $\mu$，使 $\eta$ 接近入射侧。

---

### Ex 2-9-4 反射能量百分比 <!-- omit from toc -->

理想介质法向入射时，反射功率比例为：

$$
R=|\Gamma|^2
$$

透射功率比例为：

$$
T=1-|\Gamma|^2
$$

驻波比：

$$
S=\frac{1+|\Gamma|}{1-|\Gamma|}
$$

## Ex 2-10 英文答题模板 Answer Templates

### Ex 2-10-1 State the difference between A and B <!-- omit from toc -->

套路：A 是什么 → B 是什么 → 关键区别在哪。

例句：

> Circuit theory uses lumped parameters such as voltage and current. Field theory uses distributed quantities such as $\vec E$ and $\vec H$. Field theory also considers spatial distribution and wave propagation.

---

### Ex 2-10-2 Define and explain the meaning of <!-- omit from toc -->

套路：先给定义式 → 数学上是什么 → 物理上意味着什么。

例句：

> The Poynting vector is defined as $\vec S=\vec E\times\vec H$. Its direction gives the energy-flow direction, and its magnitude gives the power-flow density.

---

### Ex 2-10-3 State integral and differential forms <!-- omit from toc -->

套路：先写公式，再解释微分形式是局部关系、积分形式是整体关系。

> The differential form describes the local relation at a point, while the integral form describes the global relation over a path, surface or volume.

---

### Ex 2-10-4 Explain physical meaning <!-- omit from toc -->

关键词对应表：

| 关键词 | 可写内容 |
| --- | --- |
| source | 说明谁是谁的源 |
| distribution | 说明空间分布 |
| energy flow | 说明能量传播方向 |
| boundary | 说明界面处连续或跳变 |
| equivalent | 说明是等效量，不一定是真实自由电荷流 |

## 总结 Summary

| 题目关键词 | 第一步 | 第二步 |
| --- | --- | --- |
| Circuit theory vs field theory | lumped / distributed | $U,I$ vs $\vec E,\vec H$ |
| Static electric field | $\nabla\times\vec E=0$ | conductor 内部 $\vec E=0$ |
| Scalar potential | $\vec E=-\nabla\varphi$ | 时变场要加 $-\partial\vec A/\partial t$ |
| Capacitance | $C=Q/U$ | 只由几何和介质决定 |
| Dielectric polarization | $\vec P$ | 束缚电荷 vs 传导电荷 |
| Boundary condition | 法向/切向 | 有源跳变，无源连续 |
| Displacement current | $\vec J_d=\partial\vec D/\partial t$ | 时变电场对磁场的贡献 |
| Maxwell equations | 四个方程 | 积分形式 vs 微分形式 |
| Gauge | Coulomb / Lorenz | 静磁场 vs 时变场 |
| Time harmonic field | $e^{j\omega t}$ | $\partial_t\leftrightarrow j\omega$ |
| Polarization | 轨迹定义 | 线/圆/椭圆与旋向 |
| Poynting vector | $\vec S=\vec E\times\vec H$ | 能流方向和功率密度 |
| Travelling / standing wave | 能流和反射 | 驻波平均能流为零 |
| Reflection | $\Gamma$ | 无反射要求 $\eta_1=\eta_2$ |
