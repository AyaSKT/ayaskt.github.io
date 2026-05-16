# 6 Static Magnetic Fields

**It all returns to nothing，**  
**一切都回不去了，**

**It all comes tumbling down, tumbling down, tumbling down.**  
**一切都分崩离析，分崩离析。**  

<div align="right">——ARIANNE《Komm, süsser Tod》</div>

![alt text](<EMFT Chapter 6.attachments/1778749796338.jpg>)

## 章节目录


- [章节目录](#章节目录)
- [6-1 毕奥-萨伐尔定律 The Biot-Savart Law](#6-1-毕奥-萨伐尔定律-the-biot-savart-law)
  - [6-1-1 毕奥-萨伐尔定律](#6-1-1-毕奥-萨伐尔定律)
  - [6-1-2 磁感应强度与安培力定律 Magnetic Flux Density and Ampere's Force Law](#6-1-2-磁感应强度与安培力定律-magnetic-flux-density-and-amperes-force-law)
  - [6-1-3 典型电流分布的磁场](#6-1-3-典型电流分布的磁场)
  - [6-1-4 真空安培环路定理 Ampere's Circuital Law in Vaccum](#6-1-4-真空安培环路定理-amperes-circuital-law-in-vaccum)
- [6-2 自由空间静磁场 Magnetostatic 基本公设](#6-2-自由空间静磁场-magnetostatic-基本公设)
  - [6-2-1 电磁力与洛伦兹力基本方程](#6-2-1-电磁力与洛伦兹力基本方程)
  - [6-2-2 静磁学基本方程](#6-2-2-静磁学基本方程)
- [6-3 磁矢位 Vector Magnetic Potential](#6-3-磁矢位-vector-magnetic-potential)
  - [6-3-1 磁矢位，规范自由度与库仑规范](#6-3-1-磁矢位规范自由度与库仑规范)
  - [6-3-2 磁矢位的微分方程](#6-3-2-磁矢位的微分方程)
  - [6-3-3 磁矢位的积分解](#6-3-3-磁矢位的积分解)
- [6-4 磁化强度与等效电流密度 Magnetization and Equivalent Current Densities](#6-4-磁化强度与等效电流密度-magnetization-and-equivalent-current-densities)
  - [6-4-1 介质的磁化 Magnetization of Medium](#6-4-1-介质的磁化-magnetization-of-medium)
  - [6-4-2 磁化矢量 Magnetization Vector](#6-4-2-磁化矢量-magnetization-vector)
  - [6-4-3 附加磁场](#6-4-3-附加磁场)
  - [6-4-4 体磁化电流与面磁化电流](#6-4-4-体磁化电流与面磁化电流)
- [6-5 磁场强度和相对磁导率 Magnetic Field Intensity and Relative Permeability](#6-5-磁场强度和相对磁导率-magnetic-field-intensity-and-relative-permeability)
  - [6-5-1 磁场强度与一般形式的安培环路定理](#6-5-1-磁场强度与一般形式的安培环路定理)
  - [6-5-2 相对磁导率 Relative Permeability](#6-5-2-相对磁导率-relative-permeability)
- [6-6 静磁场的边界条件 Boundary Conditions for Magnetostatic Fields](#6-6-静磁场的边界条件-boundary-conditions-for-magnetostatic-fields)
  - [6-6-1 磁感应强度的边界条件](#6-6-1-磁感应强度的边界条件)
  - [6-6-2 磁场强度的边界条件](#6-6-2-磁场强度的边界条件)
  - [6-6-3 磁矢位的边界条件](#6-6-3-磁矢位的边界条件)
- [6-7 电感与电感器 Inductances and Inductors](#6-7-电感与电感器-inductances-and-inductors)
  - [6-7-1 磁通与磁链 Magnetic Flux \& Megnatic Linkage](#6-7-1-磁通与磁链-magnetic-flux--megnatic-linkage)
  - [6-7-2 自感 Self-Inductance](#6-7-2-自感-self-inductance)
  - [6-7-3 互感 Mutual Inductance](#6-7-3-互感-mutual-inductance)
  - [6-7-4 Newman 公式的证明 Proof of the Newman’s Formula](#6-7-4-newman-公式的证明-proof-of-the-newmans-formula)
- [6-8 磁场能 Magnetic Energy](#6-8-磁场能-magnetic-energy)
  - [6-8-1 磁场分布求解磁场能](#6-8-1-磁场分布求解磁场能)
  - [6-8-2 磁矢位求磁场能](#6-8-2-磁矢位求磁场能)
  - [6-8-3 电感求磁场能](#6-8-3-电感求磁场能)
- [总结 Summary](#总结-summary)


## 6-1 毕奥-萨伐尔定律 The Biot-Savart Law



### 6-1-1 毕奥-萨伐尔定律

![alt text](<EMFT Chapter 6.attachments/1778922380235.png>)

::: definition 

**毕奥-萨伐尔定律 Biot-Savart Law** 描述真空中两个线圈中电流元对各自的相互作用力。

回路 1 电流元对回路 2 电流元作用力为：

$$
\vec F_{21} = \frac{\mu_0}{4 \pi} \oint_{C_2} \oint_{C_1}  
\frac{I_2d\vec l_2 \times I_1 d \vec l_1 \times \hat{e}_R}{R_{12}^2}
$$

:::

---

### 6-1-2 磁感应强度与安培力定律 Magnetic Flux Density and Ampere's Force Law

对该表达式进行数学处理，可以得到如下积分式：

$$
\vec F_{21} = \oint_{C_2} I_2d\vec l_2 \times \left[  \frac{\mu_0}{4 \pi} \oint_{C_1}  \frac{ I_1 d \vec l_1 \times \hat{e}_R}{R_{12}^2} \right]
$$

我们定义：磁感应强度 / 磁通量密度 Magnetic Flux Density 

$$
\vec B = \frac{\mu_0}{4 \pi} \oint_{C_1}  \frac{ I_1 d \vec l_1 \times \hat{e}_R}{R_{12}^2}
$$

则可以得到：

::: definition
**磁感应强度 / 磁通量密度 Magnetic Flux Density**

$$
\vec B = \frac{\mu_0}{4 \pi} \int_{L}  \frac{ I d \vec l \times \hat{e}_R}{R^2}
$$

**安培力定律 Ampere's Force Law**

$$
\vec F_{21} = \int_{L_2} I_2d\vec l_2 \times \vec B
$$

其中 $\vec B$ 为电流元 $I_1 d \vec l_1$ 在 电流元 $I_2 d \vec l_2$ 处产生的磁感应强度。
:::

如果电流 $I$ 是体电流分布 $\vec J (\vec r')$ 或者面电流密度 $\vec K (\vec r')$ ，可以得到如下两种推广：

$$

\vec B_S = \frac{\mu_0}{4 \pi} \iint_{S}  \frac{ \vec K (\vec r') dS' \times \hat{e}_R}{R^2}

$$

$$

\vec B_V = \frac{\mu_0}{4 \pi} \iiint_{V}  \frac{ \vec J (\vec r') dV' \times \hat{e}_R}{R^2}

$$

上面的公式构成了无限大空间中磁场的计算公式。

---

### 6-1-3 典型电流分布的磁场


::: stem

设有限长直线段电流为 $I$，场点 $M$ 到导线的垂直距离为 $\rho$。从导线下端、上端分别指向 $M$ 的矢量与电流方向之间的夹角记为 $\theta_1$、$\theta_2$。

![alt text](<EMFT Chapter 6.attachments/1778922450311.png>)

:::

::: solution

由毕奥-萨伐尔定律，对电流元 $I\,d\vec{l}'$ 积分可得：

**有限长直线段：**

$$
\vec{B} = \vec{e}_{\phi} \frac{\mu_0 I}{4\pi\rho}(\cos \theta_1 - \cos \theta_2)
$$

**无限长直导线**（ $\theta_1 \to 0$，$\theta_2 \to \pi$）：

$$
\vec{B} = \vec{e}_{\phi} \frac{\mu_0 I}{2\pi\rho}
$$

其中 $\vec{e}_{\phi}$ 为环绕电流方向的右手系方位角单位矢量，磁场方向沿以导线为轴的圆周切向。可见无限长直导线的磁场与距离 $\rho$ 成反比。
:::


---


::: stem

半径为 $a$ 的圆环置于 $xy$ 平面、圆心在原点 $O$，通有电流 $I$。求轴线 $z$ 上点 $P(0,\,0,\,z)$ 处的磁感应强度。

![alt text](<EMFT Chapter 6.attachments/1778852329010.png>)

:::

::: solution

由对称性分析，各电流元在轴线 $P$ 点产生的磁场的径向分量相互抵消，仅余 $z$ 方向分量叠加。对圆环上所有电流元积分：

$$
\vec{B}(0,\,0,\,z) = \vec{e}_z \frac{\mu_0 I a^2}{2(a^2 + z^2)^{3/2}}
$$

特别地：
- 在圆心处（ $z = 0$）： $\vec{B} = \vec{e}_z \dfrac{\mu_0 I}{2a}$
- 在远场处（ $z \gg a$）： $\vec{B} \approx \vec{e}_z \dfrac{\mu_0 I a^2}{2z^3}$，衰减为 $z^{-3}$ 量级

:::

---

### 6-1-4 真空安培环路定理 Ampere's Circuital Law in Vaccum

::: definition

**真空中的安培环路定理 Ampere's Circuital Law in Vacuum** 表述为：

$$
\oint_L \vec B \cdot d\vec l = \mu_0 \sum_{k=1}^N I_k
$$

磁感应强度 $\vec B$ 沿任意闭合路径 $L$ 的环流，等于该闭合路径所包围的所有传导电流的代数和的 $\mu_0$ 倍。

其中，电流的正方向与积分路径的绕行方向满足**右手螺旋关系**：若右手四指沿积分方向弯曲，则拇指指向为电流正方向。未被闭合路径包围的电流以及不在路径所在平面内的电流分量对环流无贡献。

:::

安培环路定理适用于具有**对称性**的磁场问题。求解时，需要根据电流分布的对称性合理选取安培环路，使得 $\vec B$ 在环路上大小恒定或为零，从而将面积分化简为代数方程。



::: stem
无限大电流薄片位于 $xy$ 平面，面电流密度 $\vec{K} = \vec{e}_z K_{s0}$（单位： $\mathrm{A/m}$）。建立坐标系后，利用对称性选择矩形安培环路，计算空间各处的磁感应强度分布。

![alt text](<EMFT Chapter 6.attachments/1778922486950.png>)

:::
::: solution

由对称性分析可知，磁场仅有 $y$ 分量，且仅与 $x$ 有关： $\vec B = \vec{e}_y B_y(x)$。

选取矩形安培环路 $abcd$，其中 $ab$、$cd$ 边平行于 $y$ 轴，长度为 $l$，且关于 $x=0$ 对称。$bc$、$da$ 边垂直于 $\vec B$，对环流无贡献。

由安培环路定理：

$$
\oint_L \vec B \cdot d\vec l = 2 B_y l = \mu_0 K_{s0} l
$$

解得：

$$
\vec{B}(x) =
\begin{cases}
\displaystyle \vec{e}_y \frac{\mu_0 K_{s0}}{2}, & x > 0 \\[6pt]
\displaystyle -\vec{e}_y \frac{\mu_0 K_{s0}}{2}, & x < 0
\end{cases}
$$

可见，无限大电流薄片两侧磁场大小恒为 $\dfrac{\mu_0 K_{s0}}{2}$ ，方向在薄片两侧相反，磁场为**均匀场**。
:::

---

::: stem
无限长同轴电缆内导体半径为 $a$，外导体内半径为 $b$、外半径为 $c$，电流 $I$ 沿轴向流动（内导体流出，外导体返回）。选择圆柱坐标系，分区域应用安培环路定理求解磁场分布。

![alt text](<EMFT Chapter 6.attachments/1778922623037.png>)

:::
::: solution

由轴对称性，磁场仅有 $\phi$ 分量，且仅与 $\rho$ 有关： $\vec B = \vec{e}_\phi B_\phi(\rho)$。选取半径为 $\rho$ 的圆形安培环路。

**(1)** $0 \leq \rho < a$（内导体内部）

环路包围的电流为 $I' = I \dfrac{\rho^2}{a^2}$（均匀电流密度），则：

$$
2\pi\rho \cdot B_\phi = \mu_0 I \frac{\rho^2}{a^2}
$$

$$
\vec{B}_1 = \vec{e}_\phi \frac{\mu_0 I \rho}{2\pi a^2}
$$

**(2)** $a \leq \rho < b$（内外导体之间）

环路包围全部内导体电流 $I$：

$$
2\pi\rho \cdot B_\phi = \mu_0 I
$$

$$
\vec{B}_2 = \vec{e}_\phi \frac{\mu_0 I}{2\pi \rho}
$$

**(3)** $b \leq \rho < c$（外导体内部）

外导体中返回电流密度为 $J = \dfrac{I}{\pi(c^2 - b^2)}$，环路包围的净电流为 $I - I \dfrac{\rho^2 - b^2}{c^2 - b^2}$，则：

$$
\vec{B}_3 = \vec{e}_\phi \frac{\mu_0 I}{2\pi \rho} \cdot \frac{c^2 - \rho^2}{c^2 - b^2}
$$

**(4)** $\rho > c$（电缆外部）

内外导体电流大小相等、方向相反，净电流为零：

$$
\vec{B}_4 = 0
$$

:::


## 6-2 自由空间静磁场 Magnetostatic 基本公设

### 6-2-1 电磁力与洛伦兹力基本方程

电荷在电场和磁场中的受力由以下三个方程描述：

::: definition

**电场力 Electric Force**

$$
\vec{F}_e = q\vec{E} \quad \mathrm{(N)}
$$

静止电荷 $q$ 在电场 $\vec{E}$ 中受到的电场力。

**磁力 / 洛伦兹磁力 Magnetic Force**

$$
\vec{F}_m = q\vec{v} \times \vec{B} \quad \mathrm{(N)}
$$

运动电荷在磁场 $\vec{B}$ 中受到的磁力，其中 $\vec{v}$ 为电荷速度。磁力方向始终垂直于速度方向，因此磁力不做功，只改变运动方向。

**洛伦兹力方程 Lorentz Force Equation**

$$
\vec{F} = q(\vec{E} + \vec{v} \times \vec{B}) \quad \mathrm{(N)}
$$

运动电荷在电磁场中受到的总电磁力，是电场力与磁力的叠加。

:::

---

### 6-2-2 静磁学基本方程

自由空间中的静磁场由以下两个基本方程（麦克斯韦方程组的静磁特例）描述：

::: definition

**安培环路定律（微分形式）Ampere's Circuital Law (Differential Form)**

$$
\nabla \times \vec{B} = \mu_0 \vec{J}
$$

其中 $\mu_0 = 4\pi \times 10^{-7} \ \mathrm{H/m}$ 为真空磁导率，$\vec{J}$ 为传导电流密度。该方程表明**电流是磁场的旋涡源**。

**磁场高斯定律 Gauss's Law for Magnetism**

$$
\nabla \cdot \vec{B} = 0
$$

磁场的散度恒为零，说明磁场是**无源场**——磁感线总是闭合的，不存在磁单极子。

:::

对安培环路定律两边取散度，利用矢量恒等式 $\nabla \cdot (\nabla \times \vec{F}) \equiv 0$，可得：

$$
\nabla \cdot (\nabla \times \vec{B}) = \mu_0 \nabla \cdot \vec{J} = 0
$$

即：

$$
\nabla \cdot \vec{J} = 0
$$

这正是**电流连续性方程**在恒定电流条件下的形式，表明在静磁场中电荷守恒——流入任意体积元的净电流为零。



## 6-3 磁矢位 Vector Magnetic Potential


### 6-3-1 磁矢位，规范自由度与库仑规范

由磁场高斯定律 $\nabla \cdot \vec{B} = 0$ 可知，磁场是无源场。根据矢量分析，无散场可以表示为另一个矢量场的旋度，由此引入磁矢位。


::: definition

**磁矢位 Vector Magnetic Potential / Magnetic Vector Potential** 定义为满足以下关系的矢量场 $\vec{A}$：

$$
\vec{B} = \nabla \times \vec{A} \qquad \text{(Wb/m)}
$$

磁矢位并非直接等于磁场，而是通过取旋度得到磁感应强度。

:::

一个矢量场需要同时指定其旋度和散度才能唯一确定。对 $\vec{A}$ 而言，旋度已由 $\nabla \times \vec{A} = \vec{B}$ 确定，但散度 $\nabla \cdot \vec{A}$ 仍可自由选择——这称为**规范自由度 Gauge Freedom**。

在静磁场中，通常选取：

$$
\nabla \cdot \vec{A} = 0
$$

称为**库仑规范 Coulomb Gauge**。

---

### 6-3-2 磁矢位的微分方程

将 $\vec{B} = \nabla \times \vec{A}$ 代入安培环路定律的微分形式 $\nabla \times \vec{B} = \mu_0 \vec{J}$，得：

$$
\nabla \times \nabla \times \vec{A} = \mu_0 \vec{J}
$$

利用矢量恒等式：

$$
\nabla \times \nabla \times \vec{A} = \nabla(\nabla \cdot \vec{A}) - \nabla^2 \vec{A}
$$

在库仑规范 $\nabla \cdot \vec{A} = 0$ 下，有：

$$
\nabla^2 \vec{A} = -\mu_0 \vec{J}
$$

::: definition

**磁矢位的矢量泊松方程 Vector Poisson's Equation**

$$
\nabla^2 \vec{A} = -\mu_0 \vec{J}
$$

**磁矢位的矢量拉普拉斯方程 Vector Laplace's Equation**（无源区域 $\vec{J} = 0$）

$$
\nabla^2 \vec{A} = 0
$$

:::


在实际求解磁矢位时，可以通过电流密度分别计算其分量的泊松方程来求解，即：

$$
\begin{cases}
\nabla^2 A_x = - \mu J_x \\
\nabla^2 A_y = - \mu J_y \\
\nabla^2 A_z = - \mu J_z \\
\end{cases}
$$



---

### 6-3-3 磁矢位的积分解

磁矢位方程与静电势方程形式类似。静电势满足：

$$
\nabla^2 \varphi(\vec{r}) = -\frac{\rho(\vec{r})}{\varepsilon}
$$

其解为：

$$
\varphi(\vec{r}) = \frac{1}{4\pi\varepsilon} \iiint_V \frac{\rho(\vec{r}')}{R} \, dV'
$$

类似地，磁矢位的积分解为：

::: definition

**磁矢位的积分解**

$$
\vec{A}(\vec{r}) = \frac{\mu_0}{4\pi} \int \frac{I \, d\vec{l}'}{R}
$$

$$
\vec{A}(\vec{r}) = \frac{\mu_0}{4\pi} \iint_S \frac{\vec{K}(\vec{r}')}{R} \, dS'
$$

$$
\vec{A}(\vec{r}) = \frac{\mu_0}{4\pi} \iiint_V \frac{\vec{J}(\vec{r}')}{R} \, dV'
$$

其中 $R = |\vec{r} - \vec{r}'|$ 为源点到场点的距离。

:::

通过斯托克斯方程，我们还可以利用磁矢位来求解磁通的大小（闭合曲面通过的磁感线数量）：

$$
\Phi = \iint_S \vec B \cdot d \vec S = \iint (\nabla \times \vec A) d \vec S
= \oint_l \vec A \cdot d \vec l
$$

即通过某一闭合曲面 $S$ 的磁通量即为磁矢量沿这个曲面边缘的环路积分值。







::: stem

设无限长直线电流沿 $z$ 轴方向，电流为 $I$。选取圆柱坐标系，场点为 $P(\rho,\,\phi,\,z)$，源点为 $(0,\,0,\,z')$，源点到场点的距离 $R = \sqrt{\rho^2 + (z - z')^2}$。

:::

::: solution

对长度为 $2L$ 的有限长直线段，代入磁矢位积分公式：

$$
\vec{A}(\vec{r}) = \vec{e}_z \frac{\mu_0 I}{4\pi} \int_{-L}^{L} \frac{dz'}{\sqrt{\rho^2 + (z - z')^2}}
$$

积分后得到：

$$
\vec{A}(\vec{r}) = \vec{e}_z \frac{\mu_0 I}{4\pi} \ln \frac{\sqrt{\rho^2 + (z - L)^2} - (z - L)}{\sqrt{\rho^2 + (z + L)^2} - (z + L)}
$$

当 $L \to \infty$ 时，化简为：

$$
\vec{A}(\vec{r}) = \vec{e}_z \frac{\mu_0 I}{2\pi} \ln \frac{2L}{\rho} + \vec{C}
$$

其中 $\vec{C}$ 为常矢量。注意磁矢位包含 $\ln(2L)$ 发散项，因此绝对值本身无独立物理意义，真正有意义的是通过旋度得到的磁场：

$$
\vec{B} = \nabla \times \vec{A} = \vec{e}_\phi \frac{\mu_0 I}{2\pi \rho}
$$

与安培环路定理的结果一致。

:::








## 6-4 磁化强度与等效电流密度 Magnetization and Equivalent Current Densities

### 6-4-1 介质的磁化 Magnetization of Medium

![alt text](<EMFT Chapter 6.attachments/1778901018902.png>)

介质的磁化现象可以用以下两个结论概括：


**介质磁化的本质**

**结论 1**：当介质处于外加磁场中时，其内部分子的磁偶极矩会沿外场方向定向排列，从而产生宏观的磁化现象。无外场时磁矩方向杂乱，施加外场后磁矩趋于统一朝向磁场方向。

**结论 2**：磁化强度的大小由介质中单位体积内磁偶极矩的数量决定。磁矩密度越大，磁化越强。



为了定量描述磁化，需要先定义磁偶极矩。

::: definition


**磁偶极矩 Magnetic Dipole Moment**

$$
\vec{p}_m = i \Delta \vec{S}
$$

其中 $i$ 为微观环形电流，$\Delta \vec{S}$ 为环路所围面积矢量（方向由右手定则确定）。磁偶极矩代表微观环形电流的磁效应，单位为 $\mathrm{A \cdot m^2}$。

:::

每个原子或分子可以等效为一个微小的环形电流（分子电流），其磁效应由磁偶极矩 $\vec{p}_m$ 描述。在无外加磁场时，各分子磁矩方向随机，宏观上不表现磁性；施加外磁场后，磁矩定向排列，介质被磁化。

---

### 6-4-2 磁化矢量 Magnetization Vector

::: definition
磁化矢量 Magnetization Vector 是单位体积内的磁偶极矩矢量和，即

$$
\vec M = \frac{1}{\Delta V} \sum_{i=1}^n \vec{p}_i \qquad \text{(A/m)}
$$
:::


**Discussion 外磁场对介质内（非永磁体）磁化矢量的影响**

![alt text](<EMFT Chapter 6.attachments/1778916059623.png>)

1. **无外加磁场**

此时介质中各分子的磁偶极矩散乱排布，在宏观上不对外现磁性。

$$
\sum \vec p_{mi} = 0 \quad \Rightarrow \quad \vec M = 0
$$

2. **存在外加磁场**

此时介质内分子磁偶极矩在同一方向规则排列，有：

$$
\sum_{i=1}^N \vec p_{mi} = N \vec p_m
$$

$$
\vec M = n \vec p_m
$$

其中 $n$ 为单位体积内磁偶极矩数量。

---

### 6-4-3 附加磁场

介质被磁化后，空间中会产生附加磁场 $\vec{B}_m$。介质内外的总磁感应强度为：

$$
\vec{B} = \vec{B}_e + \vec{B}_m
$$

其中 $\vec{B}_e$ 为外加磁场，$\vec{B}_m$ 为介质磁化产生的附加磁场。

对于**线性各向同性介质**，磁化强度 $\vec{M}$ 与磁场强度 $\vec{H}$ 成正比：

$$
\vec{M} = \chi_m \vec{H}
$$

其中 $\chi_m$ 为介质的**磁化率 Magnetic Susceptibility**：
- $\chi_m = 0$：非磁性介质（真空）
- $\chi_m > 0$：顺磁性介质（ $\vec{M}$ 与 $\vec{H}$ 同向）
- $\chi_m < 0$：抗磁性介质（ $\vec{M}$ 与 $\vec{H}$ 反向）

磁化矢量的大小取决于两个因素：介质材料本身的性质，以及外加磁场 $\vec{B}_e$ 的强度。

---

### 6-4-4 体磁化电流与面磁化电流

介质被磁化以后，会出现等效的磁化电流，包括**体磁化电流**和**面磁化电流**。

#### 磁化后产生的两类等效电流

磁化介质内部可以看成存在大量微观分子电流环。无外场时这些环形电流方向杂乱，宏观上相互抵消；施加外磁场后磁矩定向排列，大量微观电流环不再完全抵消，从而表现出宏观等效电流。

等效电流分为两种：

- 介质**内部**的体磁化电流密度 $\vec{J}_M$——出现在磁化介质的内部
- 介质**表面**的面磁化电流密度 $\vec{J}_{SM}$——出现在磁化介质的边界表面

即：

$$
\text{磁化} \Longrightarrow
\begin{cases}
\text{介质内部出现体磁化电流 } \vec{J}_M \\
\text{介质表面出现面磁化电流 } \vec{J}_{SM}
\end{cases}
$$

![alt text](<EMFT Chapter 6.attachments/1778918630268.png>)

#### 体磁化电流密度

::: definition

**体磁化电流密度 Volume Magnetization Current Density**

$$
\boxed{\vec{J}_M = \nabla \times \vec{M}}
$$

体磁化电流密度由磁化强度的旋度决定。当磁化强度 $\vec{M}$ 在空间中有旋转变化（即 $\nabla \times \vec{M} \neq 0$）时，介质内部就会出现等效的体磁化电流。

:::

在介质内部，相邻分子电流环的边界电流互相抵消；但如果 $\vec{M}$ 的分布不均匀，抵消不完全，就会产生体磁化电流。



#### 面磁化电流密度

::: definition

**面磁化电流密度 Surface Magnetization Current Density**

$$
\boxed{\vec{J}_{SM} = \vec{M} \times \vec{e}_n}
$$

其中 $\vec{e}_n$ 为介质表面的外法线单位矢量。面磁化电流密度由磁化强度在表面处的切向分量决定。

:::

在介质表面，由于外侧没有相邻的分子电流环来抵消，表面会留下等效面电流。只有 $\vec{M}$ 的切向分量会贡献面磁化电流；如果 $\vec{M}$ 完全垂直于表面，则面磁化电流为零。

## 6-5 磁场强度和相对磁导率 Magnetic Field Intensity and Relative Permeability

### 6-5-1 磁场强度与一般形式的安培环路定理

在存在介质的空间中，电流可以分为两类：一类是自由电流 $\vec{J}$（例如导线中由电源驱动的电流），另一类是介质磁化产生的等效磁化电流 $\vec{J}_M = \nabla \times \vec{M}$。

根据安培环路定理，总电流（自由电流 + 磁化电流）共同产生磁场：

$$
\begin{aligned}
\oint_C \vec{B} \cdot d\vec{l} &= \mu_0 \iint_S (\vec{J} + \vec{J}_M) \cdot d\vec{S} \\
&= \mu_0 \iint_S (\vec{J} + \nabla \times \vec{M}) \cdot d\vec{S}
\end{aligned}
$$

写为微分形式并移项：

$$
\nabla \times \left(\frac{\vec{B}}{\mu_0} - \vec{M}\right) = \vec{J}
$$

可见括号内的量仅与自由电流有关，而与磁化电流无关。由此引入一个新的辅助矢量——**磁场强度**：

::: definition

**磁场强度 Magnetic Field Intensity**

$$
\vec{H} = \frac{\vec{B}}{\mu_0} - \vec{M} \qquad \text{(A/m)}
$$

**一般形式的安培环路定理**

微分形式

$$
\nabla \times \vec{H} = \vec{J}
$$

积分形式

$$
\oint_C \vec{H} \cdot d\vec{l} = \iint_S \vec{J} \cdot d\vec{S}
$$

:::

引入 $\vec{H}$ 的意义在于：安培环路定理的右端只需考虑自由电流 $\vec{J}$，而不再需要计算磁化电流 $\vec{J}_M$，这在实际问题中大大简化了求解过程。

因此，当空间中存在介质时，恒定磁场由以下基本方程组描述：

$$
\boxed{
\begin{cases}

\nabla \times \vec{H} = \vec{J} \\
\\
\nabla \cdot \vec{B} = 0

\end{cases}

\qquad \quad

\begin{cases}

\oint_C \vec{H} \cdot d\vec{l} = \iint_S \vec{J} \cdot d\vec{S} \\
\\
\oiint_S \vec{B} \cdot d\vec{S} = 0

\end{cases}
}
$$







---

### 6-5-2 相对磁导率 Relative Permeability

#### 本构关系 Constitutive Relation

对应线形各向同性 Linear and Isotropic 介质，我们有如下本构关系：

$$
\vec M = \chi_m \vec H
$$

其中 $\chi_m$ 被称为**磁化率 Magnetic Susceptibility**，是一个无量纲常数。

进一步得到如下本构关系：

::: definition
$$
\vec M = \chi_m \vec H \quad \Rightarrow \quad 
\vec B = \mu_0 (1+\chi_m) \vec H
= \mu_0 \mu_r \vec H
= \mu \vec H
$$

其中 $\mu_r =1+\chi_m$ 被称为**相对磁导率 Relative Magnetic Permeability**， $\mu$ 被称为介质的 **磁化率 Magnetic Permeability**。

:::





在计算实际问题时，可以通过以下顺序来逐级求解各个物理量：

$$
\boxed{
\vec J \Rightarrow \vec H \Rightarrow \vec B, \; \vec M ,\; \vec J_M
}
$$

#### 根据磁导率分类介质

| 相对磁导率       | 磁性分类                                 | 典型例子 | 相对磁导率 $\mu_r$ |
| ------------- | ------------------------------------ | ---- | ------------- |
| $\mu_r > 1$   | 顺磁性物质 Paramagnetic Substance        | 空气   | $1.0000004$   |
| $\mu_r < 1$   | 抗磁性物质 / 反磁性物质 Diamagnetic substance | 水    | $0.99999$     |
| $\mu_r \gg 1$ | 铁磁性物质 Ferromagnetic substance       | 铁    | $4000$        |


::: stem

一个无限长导磁圆柱体，磁导率为 $\mu$，半径为 $a$，轴线上有一线电流 $I$。圆柱外部为空气（$\mu_0$）。求圆柱外部的 $\vec{B}$、$\vec{H}$ 和 $\vec{M}$ 分布。

![alt text](<EMFT Chapter 6.attachments/1778921339256.png>)

:::

::: solution

由安培环路定理，选取半径为 $\rho$ 的圆形安培环路：

$$
\oint_C \vec{H} \cdot d\vec{l} = 2\pi\rho \, H_\phi = I
$$

解得磁场强度：

$$
\vec{H} = \vec{e}_\phi \frac{I}{2\pi\rho}, \qquad 0 < \rho < \infty
$$

磁感应强度在不同区域取不同磁导率：

$$
\vec{B} =
\begin{cases}
\vec{e}_\phi \dfrac{\mu I}{2\pi\rho}, & 0 < \rho < a \\[8pt]
\vec{e}_\phi \dfrac{\mu_0 I}{2\pi\rho}, & a < \rho < \infty
\end{cases}
$$

由 $\vec{M} = \dfrac{\vec{B}}{\mu_0} - \vec{H}$ 可得磁化强度：

$$
\vec{M} =
\begin{cases}
\vec{e}_\phi \dfrac{\mu - \mu_0}{\mu_0} \cdot \dfrac{I}{2\pi\rho}, & \rho < a \\[8pt]
0, & a < \rho < \infty
\end{cases}
$$

圆柱外部（$\rho > a$）为自由空间，$\vec{M} = 0$；圆柱内部的磁化强度与 $(\mu - \mu_0)$ 成正比，反映了介质的磁化程度。

:::

## 6-6 静磁场的边界条件 Boundary Conditions for Magnetostatic Fields

### 6-6-1 磁感应强度的边界条件

---

### 6-6-2 磁场强度的边界条件

---

### 6-6-3 磁矢位的边界条件




## 6-7 电感与电感器 Inductances and Inductors

### 6-7-1 磁通与磁链 Magnetic Flux & Megnatic Linkage

---

### 6-7-2 自感 Self-Inductance

---

### 6-7-3 互感 Mutual Inductance

---

### 6-7-4 Newman 公式的证明 Proof of the Newman’s Formula


## 6-8 磁场能 Magnetic Energy

### 6-8-1 磁场分布求解磁场能

---

### 6-8-2 磁矢位求磁场能

---

### 6-8-3 电感求磁场能




## 总结 Summary



