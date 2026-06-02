# Ex 1 公式复习 Formula Review

**You know you didn't lose your self-control,**  
**你深知 你并未失去自制力，**  

**let's start at the rainbow.**  
**让我们于彩虹之上开始。**  

<div align="right">——Rosa Walton / Hallie Coggins《I Really Want to Stay at Your House》</div>

![alt text](<EMFT Chapter 8 P II.attachments/1778848085341.JPG>)

> [!CAUTION]
> Assisted with AI generation.

| 知识点 | 2022 | 2023 | 2024 | 2025 | 频率 |
| --- | :---: | :---: | :---: | :---: | :---: |
| 极化判断 | Q1d, Q3c | Q2c | Q1d, Q3b | Q3a,b,c | 连考四年 |
| 法向入射 / 反射透射 / 驻波比 | Q4 | Q3d, Q4d | Q4 | Q4 | 连考四年 |
| 平均坡印廷矢量 | Q3b | Q2b, Q3d, Q4c | Q3d | Q4a | 每年都有 |
| 边界条件 H→Js | Q1c | Q1d | — | Q2a | 连考三年 |
| 长直导线+矩形线圈互感 | — | Q2d | Q2d | Q2c | 连考三年 |
| 均匀平面波参数 (k,λ,f,ω) | Q3d | Q3b, Q4b | Q3a, Q4a | Q3d, Q4a | 每年 |
| E-H 关系求磁场 | Q3d, Q4a | Q3c | Q3c | Q4a | 每年 |
| 磁化 (M, 磁化电流) | Q2 | — | Q2c | Q2a,c | 三年 |
| 麦克斯韦方程组 | — | — | Q1a | — | 一年 |
| 位移电流 | Q3a | — | Q1c | — | 两年 |
| 行波/驻波/行驻波概念 | — | — | Q2b | — | 一年 |
| 自感 (同轴线) | — | — | — | Q2b | 一年 |

## 章节目录

- [章节目录](#章节目录)
- [Ex 1-1 麦克斯韦方程组 Maxwell's Equations](#ex-1-1-麦克斯韦方程组-maxwells-equations)
- [Ex 1-2 边界条件 Boundary Conditions](#ex-1-2-边界条件-boundary-conditions)
- [Ex 1-3 静磁场分布计算 Magnetostatic Field Distribution](#ex-1-3-静磁场分布计算-magnetostatic-field-distribution)
  - [毕奥-萨伐尔定律 Biot-Savart Law](#毕奥-萨伐尔定律-biot-savart-law)
  - [安培环路定理 Ampere's Circuital Law](#安培环路定理-amperes-circuital-law)
  - [常见几何分布的直接结论](#常见几何分布的直接结论)
- [Ex 1-4 电感与磁场能 Inductance and Magnetic Energy](#ex-1-4-电感与磁场能-inductance-and-magnetic-energy)
- [Ex 1-5 电磁感应 Electromagnetic Induction](#ex-1-5-电磁感应-electromagnetic-induction)
- [Ex 1-6 时谐场与相量法 Time-Harmonic Fields and Phasors](#ex-1-6-时谐场与相量法-time-harmonic-fields-and-phasors)
- [Ex 1-7 均匀平面波 Uniform Plane Waves](#ex-1-7-均匀平面波-uniform-plane-waves)
- [Ex 1-8 极化 Polarization](#ex-1-8-极化-polarization)
- [Ex 1-9 有损媒质与趋肤效应 Lossy Media and Skin Effect](#ex-1-9-有损媒质与趋肤效应-lossy-media-and-skin-effect)
- [Ex 1-10 功率与能流 Power and Energy Flow](#ex-1-10-功率与能流-power-and-energy-flow)
- [Ex 1-11 法向入射与驻波 Normal Incidence and Standing Waves](#ex-1-11-法向入射与驻波-normal-incidence-and-standing-waves)
  - [反射系数与透射系数](#反射系数与透射系数)
  - [理想导体边界（全反射）](#理想导体边界全反射)
  - [驻波比](#驻波比)
  - [能流守恒](#能流守恒)
- [总结 Summary](#总结-summary)

## Ex 1-1 麦克斯韦方程组 Maxwell's Equations


时变电磁场的全部规律浓缩在四个方程里。做题时优先回忆需要的是微分形式还是积分形式。

:::: definition 麦克斯韦方程组 Maxwell's Equations（微分形式）

$$
\begin{cases}
\nabla \times \vec H = \vec J_f + \dfrac{\partial \vec D}{\partial t} \\[6pt]
\nabla \times \vec E = -\dfrac{\partial \vec B}{\partial t} \\[6pt]
\nabla \cdot \vec B = 0 \\[6pt]
\nabla \cdot \vec D = \rho_f
\end{cases}
$$
::::

**积分形式**——对前两式取面积分并用 Stokes 定理，对后两式取体积分并用散度定理：

$$
\begin{cases}
\displaystyle\oint_C \vec H \cdot d\vec l = \iint_S \left(\vec J_f + \dfrac{\partial \vec D}{\partial t}\right) \cdot d\vec S \\[6pt]
\displaystyle\oint_C \vec E \cdot d\vec l = -\iint_S \dfrac{\partial \vec B}{\partial t} \cdot d\vec S \\[6pt]
\displaystyle\oiint_S \vec B \cdot d\vec S = 0 \\[6pt]
\displaystyle\oiint_S \vec D \cdot d\vec S = \iiint_V \rho_f\,dV
\end{cases}
$$

**线性各向同性介质本构关系：**

$$
\vec D = \varepsilon \vec E,\qquad
\vec B = \mu \vec H,\qquad
\vec J = \sigma \vec E
$$

**位移电流密度** $\displaystyle \vec J_d = \frac{\partial \vec D}{\partial t}$：不是真实电荷流动，而是时变电场对磁场的贡献。

![电容器极板间的位移电流补上了传导电流的连续性](<EMFT Chapter 7.attachments/displacement-current-capacitor.jpg>)

**连续性方程：**

$$
\nabla \cdot \vec J_f = -\frac{\partial \rho_f}{\partial t}
$$

**无源区波动方程：**

$$
\nabla^2 \vec E - \mu\varepsilon \frac{\partial^2 \vec E}{\partial t^2} = 0,\qquad
v = \frac{1}{\sqrt{\mu\varepsilon}},\qquad
c = \frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

## Ex 1-2 边界条件 Boundary Conditions


边界条件来自麦克斯韦方程组积分形式在界面上的极限。设 $\vec e_n$ 从介质 2 指向介质 1，界面上自由面电荷密度 $\rho_s$，自由面电流密度 $\vec J_s$。

:::: definition 一般电磁边界条件

$$
\begin{cases}
\vec e_n \cdot (\dot{\vec D}_1 - \dot{\vec D}_2) = \rho_s \\[4pt]
\vec e_n \cdot (\dot{\vec B}_1 - \dot{\vec B}_2) = 0 \\[4pt]
\vec e_n \times (\dot{\vec E}_1 - \dot{\vec E}_2) = 0 \\[4pt]
\vec e_n \times (\dot{\vec H}_1 - \dot{\vec H}_2) = \vec J_s
\end{cases}
$$
::::

![介质分界面上的场量](<EMFT Chapter 7.attachments/medium-interface.jpg>)

**理想介质界面**（$\rho_s = 0,\ \vec J_s = 0$）：四个量全部连续。

**理想导体表面**（导体内部场为零，$\vec e_n$ 从导体指向外部介质）：

$$
\vec e_n \cdot \dot{\vec D} = \rho_s,\qquad
\vec e_n \cdot \dot{\vec B} = 0,\qquad
\vec e_n \times \dot{\vec E} = 0,\qquad
\vec e_n \times \dot{\vec H} = \vec J_s
$$

**静磁场边界条件**（常用子集）：

| 条件 | 公式 |
| --- | --- |
| $\dot{\vec B}$ 法向连续 | $B_{1n} = B_{2n}$ |
| $\dot{\vec H}$ 切向跳变 | $\vec e_n \times (\dot{\vec H}_1 - \dot{\vec H}_2) = \vec K_s$ |
| 无面电流时 $\dot{\vec H}$ 切向连续 | $H_{1t} = H_{2t}$ |

> [!TIP]
> 法向分量由散度方程约束（$\dot{\vec D},\dot{\vec B}$），切向分量由旋度方程约束（$\dot{\vec E},\dot{\vec H}$）。有面源时跳变，无面源时连续。

## Ex 1-3 静磁场分布计算 Magnetostatic Field Distribution


由稳恒电流分布求 $\dot{\vec B}$（或 $\dot{\vec H}$）。两条主线：毕奥-萨伐尔定律（通用）和安培环路定理（高对称性）。

**磁感应强度** 单位 $\mathrm{T = Wb/m^2}$。**洛伦兹力**：$\vec F = q(\dot{\vec E} + \vec v \times \dot{\vec B})$，其中 $\vec F_m = q\vec v \times \dot{\vec B}$ 不做功。

**本构：** $\dot{\vec B} = \mu\dot{\vec H}$，$\mu = \mu_0\mu_r$，$\mu_0 = 4\pi \times 10^{-7}\ \mathrm{H/m}$。

### 毕奥-萨伐尔定律 Biot-Savart Law

:::: definition 毕奥-萨伐尔定律

$$
\dot{\vec B}(\vec r) = \frac{\mu_0}{4\pi} \oint_C \frac{I\,d\vec l' \times \vec R}{R^3},
\qquad \vec R = \vec r - \vec r',\quad R = |\vec R|
$$
::::

![毕奥-萨伐尔定律几何关系](<EMFT Chapter 6.attachments/1778922380235.png>)

对面电流与体电流，将 $I\,d\vec l'$ 替换为 $\vec K\,dS'$ 或 $\vec J\,dV'$。

---

### 安培环路定理 Ampere's Circuital Law

:::: definition 安培环路定理

$$
\oint_C \dot{\vec B} \cdot d\vec l = \mu_0 I_{\mathrm{enc}},\qquad
\oint_C \dot{\vec H} \cdot d\vec l = I_{\mathrm{free}}
$$
::::

右手四指沿积分路径正方向，拇指指向即为正电流方向。只在具有圆柱/平面/螺线管对称性时适用。

---

### 常见几何分布的直接结论

| 电流分布 | $\dot{\vec B}$ | 备注 |
| --- | --- | --- |
| 无限长直导线 | $\displaystyle \vec e_\phi \frac{\mu_0 I}{2\pi\rho}$ | 右手定则定方向 |
| 有限长直导线 | $\displaystyle \vec e_\phi \frac{\mu_0 I}{4\pi\rho}(\cos\theta_1 - \cos\theta_2)$ | $\theta_1,\theta_2$ 为两端到场点张角 |
| 圆环轴线 | $\displaystyle \vec e_z \frac{\mu_0 I a^2}{2(a^2+z^2)^{3/2}}$ | 圆心处 $z=0$：$\frac{\mu_0 I}{2a}$ |
| 无限大面电流 $\vec K = \vec e_z K_0$ | $\displaystyle \pm\vec e_y \frac{\mu_0 K_0}{2}$ | $x>0$ 取正，$x<0$ 取负 |

![无限大面电流与安培环路](<EMFT Chapter 6.attachments/1778922486950.png>)

**同轴电缆**（内导体半径 $a$，外导体内 $b$ 外 $c$，内导体 $I$，外导体 $-I$）：

| 区域 | $H_\phi$ |
| --- | --- |
| $0 < \rho < a$ | $\displaystyle \frac{I\rho}{2\pi a^2}$ |
| $a < \rho < b$ | $\displaystyle \frac{I}{2\pi\rho}$ |
| $b < \rho < c$ | $\displaystyle \frac{I}{2\pi\rho}\frac{c^2-\rho^2}{c^2-b^2}$ |
| $\rho > c$ | $0$ |

## Ex 1-4 电感与磁场能 Inductance and Magnetic Energy


**磁通：** $\displaystyle \Phi = \iint_S \dot{\vec B} \cdot d\vec S = \oint_C \vec A \cdot d\vec l$

**磁链：** $\Psi = N\Phi$。粗导体需分内外磁链 $\Psi = \Psi_i + \Psi_o$。

:::: definition 自感与互感

$$
L = \frac{\Psi}{I},\qquad
M = \frac{\Psi_{21}}{I_1}
$$
::::

线性各向同性介质中 $M_{12} = M_{21}$。

**单位长度电感常用结果（真空）：**

| 结构 | $L'$ |
| --- | --- |
| 同轴线 | $\displaystyle \frac{\mu_0}{8\pi} + \frac{\mu_0}{2\pi}\ln\frac{b}{a}$ |
| 平行双线 ($D \gg a$) | $\displaystyle \frac{\mu_0}{4\pi} + \frac{\mu_0}{\pi}\ln\frac{D}{a}$ |
| 直导线与矩形线圈互感 | $\displaystyle M = \frac{\mu_0 a}{2\pi}\ln\frac{D+b}{D}$ |

> [!TIP]
> 前一项为内自感（导体内部磁链），后一项为外自感（导体间磁链）。计算时需先确认是否包含内自感。

**磁场能密度：**

$$
w_m = \frac{1}{2}\dot{\vec B} \cdot \dot{\vec H} = \frac{1}{2}\mu H^2 = \frac{B^2}{2\mu}
$$

**总磁场能：**

$$
W_m = \frac{1}{2}\iiint_V \dot{\vec B} \cdot \dot{\vec H}\,dV
$$

**电感-能量关系：**

$$
W_m = \frac{1}{2}LI^2,\qquad
W_m = \frac{1}{2}L_1I_1^2 + \frac{1}{2}L_2I_2^2 + MI_1I_2
$$

由 $W_m = \frac{1}{2}L'I^2$ 反求单位长度自感是同轴电缆类题目的常用解法。

## Ex 1-5 电磁感应 Electromagnetic Induction


:::: definition 法拉第电磁感应定律

$$
\varepsilon_{\mathrm{in}} = -\frac{d\Psi}{dt},\qquad
\nabla \times \vec E = -\frac{\partial \vec B}{\partial t}
$$
::::

负号来自楞次定律：感应电流的效果总是阻碍原磁通的变化。

![定向曲面与感应电动势的正方向约定](<EMFT Chapter 7.attachments/faraday-oriented-surface.jpg>)

**感应电动势按来源分三类：**

| 情况 | 表达式 | 典型场景 |
| --- | --- | --- |
| 回路静止，$\dot{\vec B}$ 时变 | $\displaystyle \varepsilon = -\iint_S \frac{\partial \vec B}{\partial t} \cdot d\vec S$ | 变压器 |
| $\dot{\vec B}$ 恒定，回路运动 | $\displaystyle \varepsilon = \oint_C (\vec v \times \dot{\vec B}) \cdot d\vec l$ | 发电机 |
| 两者共同作用 | $\displaystyle \varepsilon = \oint_C (\vec v \times \vec B) \cdot d\vec l - \iint_S \frac{\partial \vec B}{\partial t} \cdot d\vec S$ | 一般情形 |

## Ex 1-6 时谐场与相量法 Time-Harmonic Fields and Phasors


时谐场中所有场量以单频 $\omega$ 正弦变化，用相量法将时间微分转为 $j\omega$ 乘法：

$$
A(\vec r, t) = \operatorname{Re}[\dot A(\vec r) e^{j\omega t}]
$$

$$
\boxed{\frac{\partial}{\partial t} \longleftrightarrow j\omega},\qquad
\boxed{\int dt \longleftrightarrow \frac{1}{j\omega}}
$$

| 瞬时表达式 | 相量 |
| --- | --- |
| $A_m\cos{(\omega t + \phi)}$ | $\dot A = A_m e^{j\phi}$ |
| $A_m\sin{(\omega t + \phi)}$ | $\dot A = A_m e^{j(\phi - \pi/2)} = -jA_m e^{j\phi}$ |

**亥姆霍兹方程**（无源区）：

$$
\nabla^2 \dot{\vec E} + k^2 \dot{\vec E} = 0,\qquad
k = \omega\sqrt{\mu\varepsilon}
$$

:::: definition 复介电常数 Complex Permittivity

$$
\varepsilon_c = \varepsilon - j\frac{\sigma}{\omega}
$$
::::

**损耗角正切**判定介质类型：

$$
\tan\delta_\sigma = \frac{\sigma}{\omega\varepsilon}
$$

| 介质类型 | 条件 | 主导机制 |
| --- | --- | --- |
| 低损耗介质 | $\sigma/(\omega\varepsilon) \ll 1$ | 位移电流占主导 |
| 良导体 | $\sigma/(\omega\varepsilon) \gg 1$ | 传导电流占主导 |

## Ex 1-7 均匀平面波 Uniform Plane Waves


均匀平面波是最简单的电磁波解——等相位面为平面且同一等相位面上场强恒定。

![均匀平面波的等相位面](<EMFT Chapter 8 P I.attachments/plane-wavefront.jpg>)

**基本传播参数：**

$$
\omega = 2\pi f,\quad T = \frac{2\pi}{\omega},\quad
\lambda = \frac{2\pi}{k},\quad k = \frac{2\pi}{\lambda} = \omega\sqrt{\mu\varepsilon},\quad
v_p = \frac{\omega}{k} = \frac{1}{\sqrt{\mu\varepsilon}}
$$

真空中 $c = 3\times 10^8\ \mathrm{m/s}$。理想介质中 $v_p$ 无色散。

:::: definition 本征阻抗 Intrinsic Impedance

$$
\eta = \sqrt{\frac{\mu}{\varepsilon}},\qquad \eta_0 \approx 377\ \Omega
$$
::::

**TEM 波性质：** $\vec k \cdot \dot{\vec E} = \vec k \cdot \dot{\vec H} = \dot{\vec E} \cdot \dot{\vec H} = 0$，三者两两垂直，右手螺旋。

![E、H、k 的右手关系](<EMFT Chapter 8 P I.attachments/ehk-right-hand.jpg>)

**E-H 关系**——已知一个场和传播方向即可求另一个：

$$
\boxed{\dot{\vec H} = \frac{1}{\eta}\vec e_n \times \dot{\vec E},\qquad
\dot{\vec E} = -\eta\,\vec e_n \times \dot{\vec H}}
$$

**任意方向传播：** $\dot{\vec E}(\vec r) = \dot{\vec E}_m e^{-j\vec k \cdot \vec r}$，其中 $\vec k = k\vec e_n$。对这种平面波 $\nabla \to -j\vec k$。

沿 $+z$ 方向：$\dot{\vec E}(z) = \dot{\vec E}_m e^{-jkz}$，瞬时形式 $\vec E(z,t) = \dot{\vec E}_m \cos{(\omega t - kz + \phi)}$。

## Ex 1-8 极化 Polarization


极化描述空间固定点处电场矢量端点随时间的运动轨迹。判断时先统一成余弦形式，再读振幅和相位。

沿 $+z$ 传播的波，令 $E_x = E_{xm}\cos{(\omega t - kz + \phi_x)}$，$E_y = E_{ym}\cos{(\omega t - kz + \phi_y)}$，$\Delta\phi = \phi_y - \phi_x$：

| 条件 | 极化方式 |
| --- | --- |
| $\Delta\phi = 0,\ \pm\pi$ | 线极化 Linear |
| $E_{xm}=E_{ym}$ 且 $\Delta\phi = +\pi/2$ | 左旋圆极化 LHCP |
| $E_{xm}=E_{ym}$ 且 $\Delta\phi = -\pi/2$ | 右旋圆极化 RHCP |
| $0 < \Delta\phi < \pi$（不满足圆极化） | 左旋椭圆极化 |
| $-\pi < \Delta\phi < 0$（不满足圆极化） | 右旋椭圆极化 |

![线极化](<EMFT Chapter 8 P I.attachments/linear-polarization.jpg>)

![圆极化](<EMFT Chapter 8 P I.attachments/circular-polarization.jpg>)

![椭圆极化](<EMFT Chapter 8 P I.attachments/elliptical-polarization.jpg>)

> [!TIP]
> 判断步骤：先将分量统一为余弦形式，读取 $E_{xm},E_{ym},\phi_x,\phi_y$，计算 $\Delta\phi=\phi_y-\phi_x$，先判定线/圆/椭圆，再判定旋向。沿 $-z$ 方向传播时旋向结论与上表相反。

## Ex 1-9 有损媒质与趋肤效应 Lossy Media and Skin Effect


有损媒质中 $\sigma \ne 0$，波数变为复数。核心：先判断 $\sigma/(\omega\varepsilon)$ 的大小，再选近似式。

**复波数与传播常数：**

$$
k_c = \omega\sqrt{\mu\varepsilon_c} = \beta - j\alpha,\qquad
\gamma = jk_c = \alpha + j\beta
$$

$$
\dot{\vec E}(z) = \dot{\vec E}_m e^{-jk_c z} = \dot{\vec E}_m e^{-\alpha z} e^{-j\beta z}
$$

**复本征阻抗：** $\eta_c = \sqrt{\mu/\varepsilon_c} = |\eta_c| e^{j\phi}$。此时 $\dot{\vec E}$ 与 $\dot{\vec H}$ 不再同相，磁场相对电场滞后 $\phi$。

![理想介质中 E 与 H 同相](<EMFT Chapter 8 P I.attachments/ideal-medium-eh.jpg>)

![导电媒质中 E 与 H 不同相](<EMFT Chapter 8 P I.attachments/lossy-medium-eh.jpg>)

**$\alpha,\beta$ 一般解：**

$$
\alpha = \omega\sqrt{\frac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\dfrac{\sigma}{\omega\varepsilon}\right)^2} - 1\right]},\qquad
\beta = \omega\sqrt{\frac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\dfrac{\sigma}{\omega\varepsilon}\right)^2} + 1\right]}
$$

**两类工程近似：**

| 类型 | 条件 | $\alpha$ | $\beta$ | $\eta_c$ |
| --- | --- | --- | --- | --- |
| 低损耗介质 | $\dfrac{\sigma}{\omega\varepsilon} \ll 1$ | $\displaystyle \frac{\sigma}{2}\sqrt{\frac{\mu}{\varepsilon}}$ | $\omega\sqrt{\mu\varepsilon}$ | $\displaystyle \sqrt{\frac{\mu}{\varepsilon}}\left(1 + j\frac{\sigma}{2\omega\varepsilon}\right)$ |
| 良导体 | $\dfrac{\sigma}{\omega\varepsilon} \gg 1$ | $\sqrt{\pi f\mu\sigma}$ | $\sqrt{\pi f\mu\sigma}$ | $\displaystyle (1+j)\sqrt{\frac{\pi f\mu}{\sigma}}$ |

:::: definition 趋肤深度 Skin Depth

场强衰减到表面值 $1/e$ 的深度：$\delta = 1/\alpha$

良导体中：$\displaystyle \boxed{\delta = \frac{1}{\sqrt{\pi f\mu\sigma}}}$
::::

![趋肤深度示意](<EMFT Chapter 8 P I.attachments/skin-depth.jpg>)

**表面阻抗：** $Z_s = R_s + jX_s = (1+j)\dfrac{1}{\sigma\delta} = (1+j)\sqrt{\dfrac{\pi f\mu}{\sigma}}$

## Ex 1-10 功率与能流 Power and Energy Flow


**电磁能量密度（瞬时量，用实数场）：**

$$
w_e = \frac{1}{2}\vec E \cdot \vec D,\qquad
w_m = \frac{1}{2}\vec H \cdot \vec B,\qquad
w = w_e + w_m
$$

**峰值相量的时均能量密度：**

$$
w_{E,\mathrm{av}} = \frac{1}{4}\operatorname{Re}[\dot{\vec D}\cdot\dot{\vec E}^*],\qquad
w_{M,\mathrm{av}} = \frac{1}{4}\operatorname{Re}[\dot{\vec B}\cdot\dot{\vec H}^*]
$$

理想介质中均匀平面波瞬时满足 $w_e = w_m$，故 $w = \varepsilon|\vec E|^2 = \mu|\vec H|^2$；若用峰值相量，时均总能量密度为 $w_{\mathrm{av}}=\frac{1}{2}\varepsilon|\dot{\vec E}|^2=\frac{1}{2}\mu|\dot{\vec H}|^2$。

:::: definition 坡印廷矢量 Poynting Vector

瞬时：$\vec S = \vec E \times \vec H\quad(\mathrm{W/m^2})$

时均：$\displaystyle \boxed{\vec S_{\mathrm{av}} = \frac{1}{2}\operatorname{Re}[\dot{\vec E} \times \dot{\vec H}^*]}$
::::

![坡印廷矢量方向关系](<EMFT Chapter 8 P I.attachments/poynting-vector-wide.jpg>)

> [!WARNING]
> 瞬时量必须用实数场计算；求时间平均值才可直接使用复矢量，注意 $\frac{1}{2}$ 因子。

**理想介质中均匀平面波：**

$$
\vec S = \vec e_n \frac{E^2}{\eta},\qquad
\vec S_{\mathrm{av}} = \vec e_n \frac{E_m^2}{2\eta}
$$

**平均焦耳损耗功率密度：** $p_{J,\mathrm{av}} = \frac{1}{2}\sigma\dot{\vec E} \cdot \dot{\vec E}^*$

## Ex 1-11 法向入射与驻波 Normal Incidence and Standing Waves


电磁波垂直入射到平面边界（$z=0$）。入射侧存在入射波 + 反射波，另一侧存在透射波。核心流程：由介质参数确定 $\eta$，代入 $\Gamma,\tau$，再合成总场。

![法向入射、反射与透射模型](<EMFT Chapter 8 P II.attachments/normal-incidence-boundary-wide.jpg>)

### 反射系数与透射系数

:::: definition 反射系数 $\Gamma$ 与透射系数 $\tau$（法向入射）

$$
\boxed{\Gamma = \frac{\eta_{2c} - \eta_{1c}}{\eta_{2c} + \eta_{1c}},\qquad
\tau = \frac{2\eta_{2c}}{\eta_{2c} + \eta_{1c}}}
$$

$E_{rm} = \Gamma E_{im}$，$E_{tm} = \tau E_{im}$
::::

**理想介质界面**（$\sigma_1 = \sigma_2 = 0$）：$\Gamma,\tau$ 为实数。

| $\Gamma$ 符号 | 条件 | 界面处电场 |
| --- | --- | --- |
| $\Gamma > 0$ | $\eta_2 > \eta_1$ | 反射波与入射波同相 $\to$ 波腹 |
| $\Gamma < 0$ | $\eta_2 < \eta_1$ | 反射波与入射波反相 $\to$ 波节 |

![介质界面行驻波振幅变化](<EMFT Chapter 8 P II.attachments/dielectric-amplitude-wide.jpg>)

---

### 理想导体边界（全反射）

$\eta_{2c} = 0 \ \Longrightarrow\ \Gamma = -1,\ \tau = 0$。反射波与入射波等幅反相，合成纯驻波：

$$
\dot{\vec E}_1(z) = -\vec e_x j2E_{im}\sin{(\beta_1 z)},\qquad
\dot{\vec H}_1(z) = \vec e_y \frac{2E_{im}}{\eta_1}\cos{(\beta_1 z)}
$$

![理想导体前的驻波分布](<EMFT Chapter 8 P II.attachments/standing-wave-wide.jpg>)

波腹 $z_{\max} = -(2n+1)\lambda_1/4$，波节 $z_{\min} = -n\lambda_1/2$（$n=0,1,2,\dots$）。$\dot{\vec E}$ 与 $\dot{\vec H}$ 时间相位差 $\pi/2$，空间错开 $\lambda_1/4$。平均坡印廷矢量为零。

**表面电流密度：** $\vec J_S = \vec e_n \times \dot{\vec H}_1|_{z=0}$

---

### 驻波比

:::: definition 驻波比 Standing-Wave Ratio

$$
\boxed{S = \frac{|\dot{\vec E}|_{\max}}{|\dot{\vec E}|_{\min}} = \frac{1 + |\Gamma|}{1 - |\Gamma|}},\qquad
|\Gamma| = \frac{S-1}{S+1}
$$
::::

| $\Gamma$ | $S$ | 波形 | 物理含义 |
| --- | --- | --- | --- |
| $0$ | $1$ | 纯行波 | 无反射，全透射 |
| $\pm 1$ | $\infty$ | 纯驻波 | 全反射，无能流 |
| $0 < \lvert\Gamma\rvert < 1$ | $1 < S < \infty$ | 行驻波 | 部分反射 |

由 $S$ 反求 $|\Gamma|$，再结合界面处是波腹还是波节判断 $\Gamma$ 符号。

---

### 能流守恒

理想介质界面无损耗，两侧平均能流相等：

$$
\vec S_{1\mathrm{av}} = \vec e_z\frac{E_{im}^2}{2\eta_1}(1-\Gamma^2),\qquad
\vec S_{1\mathrm{av}} = \vec S_{2\mathrm{av}}
$$

## 总结 Summary

| 问题类型 | 第一步判断 | 核心公式 |
| --- | --- | --- |
| 由电流求磁场 | 对称性如何？ | 毕奥-萨伐尔定律 / 安培环路定理 |
| 边界条件 | 有无面源？哪种介质？ | $\vec e_n \times (\dot{\vec H}_1 - \dot{\vec H}_2) = \vec J_s$ 等 |
| 电感 / 磁能 | 要不要内自感？ | $L = \Psi/I$，$W_m = \frac{1}{2}LI^2$ |
| 感应电动势 | 谁在变？$\dot{\vec B}$ 还是回路形状？ | $\varepsilon = -\frac{d\Psi}{dt}$ |
| 时谐转换 | 给定瞬时还是相量？ | $\partial_t \leftrightarrow j\omega$，$\varepsilon_c = \varepsilon - j\sigma/\omega$ |
| 波参数 | 介质参数 $\mu_r,\varepsilon_r,\sigma$？ | $\eta = \sqrt{\mu/\varepsilon}$，$k = \omega\sqrt{\mu\varepsilon}$ |
| 极化 | $\Delta\phi$ 和 $E_{xm},E_{ym}$？ | 先判线/圆/椭圆，再判旋向 |
| 良导体 / 趋肤 | $\sigma/(\omega\varepsilon) \gg 1$？ | $\delta = 1/\sqrt{\pi f\mu\sigma}$ |
| 平均功率 | 有复矢量吗？ | $\vec S_{\mathrm{av}} = \frac{1}{2}\operatorname{Re}[\dot{\vec E} \times \dot{\vec H}^*]$ |
| 反射 / 驻波 | 界面两侧 $\eta$？导体还是介质？ | $\Gamma = \frac{\eta_2-\eta_1}{\eta_2+\eta_1}$，$S = \frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ |
