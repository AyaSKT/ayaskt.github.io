---
lastUpdated: 2026-05-25T21:50:22+08:00
---

# 6 Static Magnetic Fields

<LyricCard
  title="Komm, süsser Tod"
  artist="ARIANNE"
  lang="de"
  qq-url="https://y.qq.com/n/ryqq/songDetail/003iThvD25EblY"
  netease-url="https://music.163.com/#/song?id=2740110229"
>
  <LyricLine
    original="It all returns to nothing，"
    translation="一切都回不去了，"
  />
  <LyricLine
    original="It all comes tumbling down, tumbling down, tumbling down."
    translation="一切都分崩离析，分崩离析。"
  />
</LyricCard>

![alt text](<EMFT Chapter 6.attachments/1778749796338.jpg>)

## 章节目录

- [章节目录](#章节目录)
- [6-1 自由空间静磁场基本公设 Fundamental Postulates of Magnetostatics in Free Space](#6-1-自由空间静磁场基本公设-fundamental-postulates-of-magnetostatics-in-free-space)
  - [6-1-1 洛伦兹力 Lorentz Force](#6-1-1-洛伦兹力-lorentz-force)
  - [6-1-2 静磁场基本方程](#6-1-2-静磁场基本方程)
  - [6-1-3 安培环路定理 Ampere's Circuital Law](#6-1-3-安培环路定理-amperes-circuital-law)
- [6-2 磁矢位 Vector Magnetic Potential](#6-2-磁矢位-vector-magnetic-potential)
  - [6-2-1 磁矢位的定义与库仑规范](#6-2-1-磁矢位的定义与库仑规范)
  - [6-2-2 磁矢位的微分方程与积分解](#6-2-2-磁矢位的微分方程与积分解)
- [6-3 毕奥-萨伐尔定律 The Biot-Savart Law](#6-3-毕奥-萨伐尔定律-the-biot-savart-law)
  - [6-3-1 安培力定律与磁感应强度](#6-3-1-安培力定律与磁感应强度)
  - [6-3-2 典型电流分布的磁场](#6-3-2-典型电流分布的磁场)
  - [6-3-3 用安培环路定理求磁场](#6-3-3-用安培环路定理求磁场)
- [6-4 磁化强度与等效电流密度 Magnetization and Equivalent Current Densities](#6-4-磁化强度与等效电流密度-magnetization-and-equivalent-current-densities)
  - [6-4-1 介质磁化与磁化矢量](#6-4-1-介质磁化与磁化矢量)
  - [6-4-2 体磁化电流与面磁化电流](#6-4-2-体磁化电流与面磁化电流)
- [6-5 磁场强度与相对磁导率 Magnetic Field Intensity and Relative Permeability](#6-5-磁场强度与相对磁导率-magnetic-field-intensity-and-relative-permeability)
  - [6-5-1 磁场强度](#6-5-1-磁场强度)
  - [6-5-2 磁介质的分类与本构关系](#6-5-2-磁介质的分类与本构关系)
- [6-6 静磁场边界条件 Boundary Conditions for Magnetostatic Fields](#6-6-静磁场边界条件-boundary-conditions-for-magnetostatic-fields)
  - [6-6-1 磁感应强度的边界条件](#6-6-1-磁感应强度的边界条件)
  - [6-6-2 磁场强度的边界条件](#6-6-2-磁场强度的边界条件)
  - [6-6-3 磁矢位的边界条件](#6-6-3-磁矢位的边界条件)
- [6-7 电感与电感器 Inductances and Inductors](#6-7-电感与电感器-inductances-and-inductors)
  - [6-7-1 磁通与磁链 Magnetic Flux and Flux Linkage](#6-7-1-磁通与磁链-magnetic-flux-and-flux-linkage)
  - [6-7-2 自感 Self-Inductance](#6-7-2-自感-self-inductance)
  - [6-7-3 互感 Mutual Inductance](#6-7-3-互感-mutual-inductance)
  - [6-7-4 Neumann 公式](#6-7-4-neumann-公式)
- [6-8 磁场能 Magnetic Energy](#6-8-磁场能-magnetic-energy)
- [总结 Summary](#总结-summary)

## 6-1 自由空间静磁场基本公设 Fundamental Postulates of Magnetostatics in Free Space

静磁场 Magnetostatic Field 讨论的是**稳恒电流**产生的磁场。所谓稳恒，是指电流分布不随时间变化，因此电荷密度也不随时间变化。

$$
\frac{\partial}{\partial t}=0,
\qquad
\nabla\cdot\vec J=0
$$

### 6-1-1 洛伦兹力 Lorentz Force

:::: definition
静止电荷在电场中受到电场力：

$$
\vec F_e=q\vec E
$$

运动电荷在磁场中还会受到磁场力：

$$
\vec F_m=q\vec v\times\vec B
$$

因此总电磁力为**洛伦兹力 Lorentz Force**：

$$
\vec F=q(\vec E+\vec v\times\vec B)
$$
::::

其中 $\vec B$ 称为**磁感应强度 Magnetic Flux Density**，单位为

$$
T=\mathrm{Wb/m^2}
$$

:::: tip
磁场力方向由叉乘 $\vec v\times\vec B$ 决定，因此磁场力总是垂直于速度方向。它可以改变带电粒子的运动方向，但对单个点电荷本身不做功。
::::

---

### 6-1-2 静磁场基本方程

在自由空间中，静磁场满足两个基本公设：

:::: definition
**自由空间静磁场基本方程 Differential Form**

$$
\begin{cases}
\nabla\times\vec B=\mu_0\vec J \\
\\
\nabla\cdot\vec B=0
\end{cases}
$$

其中

$$
\mu_0=4\pi\times10^{-7}\ \mathrm{H/m}
$$
::::

对应积分形式为：

$$
\begin{cases}
\displaystyle\oint_C\vec B\cdot d\vec l=\mu_0 I \\
\\
\displaystyle\oiint_S\vec B\cdot d\vec S=0
\end{cases}
$$

这两个式子对应两句话：

- 电流是静磁场的旋涡源；
- 磁感线无头无尾，总是闭合曲线。

---

### 6-1-3 安培环路定理 Ampere's Circuital Law

:::: definition
**真空中的安培环路定理 Ampere's Circuital Law in Free Space**

$$
\oint_C\vec B\cdot d\vec l=\mu_0 I_{\mathrm{enc}}
$$

磁感应强度沿闭合路径的环流，等于该路径所围任意曲面穿过电流代数和的 $\mu_0$ 倍。
::::

使用时要注意正方向：右手四指沿积分路径正方向弯曲，拇指指向就是正电流方向。

:::: stem
半径为 $b$ 的无限长圆柱导体中均匀分布稳恒电流 $I$。求导体内外的磁感应强度。
::::

:::: solution
由于电流和几何结构均具有圆柱对称性，磁场方向沿 $\vec e_\phi$，大小只与半径 $\rho$ 有关：

$$
\vec B=\vec e_\phi B_\phi(\rho)
$$

**导体内部 $0\le \rho\le b$：**

安培环路包围的电流为

$$
I_{\mathrm{enc}}=I\frac{\pi\rho^2}{\pi b^2}=I\frac{\rho^2}{b^2}
$$

由安培环路定理：

$$
2\pi\rho B_\phi=\mu_0I\frac{\rho^2}{b^2}
$$

所以

$$
\vec B=\vec e_\phi\frac{\mu_0I\rho}{2\pi b^2},
\qquad 0\le\rho\le b
$$

**导体外部 $\rho\ge b$：**

环路包围全部电流 $I$，故

$$
2\pi\rho B_\phi=\mu_0I
$$

于是

$$
\vec B=\vec e_\phi\frac{\mu_0I}{2\pi\rho},
\qquad \rho\ge b
$$

可见，导体内部磁场随 $\rho$ 线性增大，导体外部按 $1/\rho$ 衰减。
::::

## 6-2 磁矢位 Vector Magnetic Potential

### 6-2-1 磁矢位的定义与库仑规范

因为磁场满足

$$
\nabla\cdot\vec B=0
$$

而任意矢量场旋度的散度恒为零，因此可以引入一个矢量场 $\vec A$，使得

:::: definition
**磁矢位 Magnetic Vector Potential** 定义为：

$$
\vec B=\nabla\times\vec A
$$
::::

磁矢位不唯一。若令

$$
\vec A' = \vec A + \nabla f
$$

则

$$
\nabla\times\vec A'
=\nabla\times\vec A+\nabla\times\nabla f
=\vec B
$$

因此还需要指定一个规范条件。静磁场中常用的是**库仑规范 Coulomb Gauge**：

$$
\nabla\cdot\vec A=0
$$

---

### 6-2-2 磁矢位的微分方程与积分解

由

$$
\nabla\times\vec B=\mu_0\vec J,
\qquad
\vec B=\nabla\times\vec A
$$

可得

$$
\nabla\times\nabla\times\vec A=\mu_0\vec J
$$

利用恒等式

$$
\nabla\times\nabla\times\vec A
=\nabla(\nabla\cdot\vec A)-\nabla^2\vec A
$$

并采用库仑规范 $\nabla\cdot\vec A=0$，得到：

:::: definition
**磁矢位泊松方程 Vector Poisson Equation**

$$
\nabla^2\vec A=-\mu_0\vec J
$$

在无源区域 $\vec J=0$ 中，退化为矢量拉普拉斯方程：

$$
\nabla^2\vec A=0
$$
::::

与静电势泊松方程类比：

$$
\nabla^2\varphi=-\frac{\rho}{\varepsilon}
\quad\Longrightarrow\quad
\varphi(\vec r)=\frac{1}{4\pi\varepsilon}\iiint_{V'}\frac{\rho(\vec r')}{R}\,dV'
$$

磁矢位在无限均匀空间中的解为：

$$
\vec A(\vec r)=\frac{\mu_0}{4\pi}\iiint_{V'}\frac{\vec J(\vec r')}{R}\,dV'
$$

其中

$$
R=|\vec r-\vec r'|
$$

:::: tip
磁矢位 $\vec A$ 的地位类似静电势 $\varphi$，但它是矢量。很多电感、互感和磁能公式用 $\vec A$ 写会更自然，因为磁通可以写成

$$
\Phi=\iint_S\vec B\cdot d\vec S=\oint_C\vec A\cdot d\vec l
$$
::::

## 6-3 毕奥-萨伐尔定律 The Biot-Savart Law

### 6-3-1 安培力定律与磁感应强度

两个载流回路之间的相互作用力可以写为电流元之间的积分。由这个式子可以自然定义磁感应强度。

:::: definition
**毕奥-萨伐尔定律 Biot-Savart Law**

对线电流：

$$
\vec B(\vec r)
=\frac{\mu_0}{4\pi}\oint_C
\frac{I\,d\vec l'\times\vec R}{R^3}
$$

其中

$$
\vec R=\vec r-\vec r',
\qquad
R=|\vec R|
$$
::::

![alt text](<EMFT Chapter 6.attachments/1778922380235.png>)

对电流元，有

$$
d\vec B(\vec r)
=\frac{\mu_0}{4\pi}\frac{I\,d\vec l'\times\vec R}{R^3}
$$

对面电流和体电流分别为：

$$
\vec B(\vec r)
=\frac{\mu_0}{4\pi}\iint_{S'}
\frac{\vec K(\vec r')\times\vec R}{R^3}\,dS'
$$

$$
\vec B(\vec r)
=\frac{\mu_0}{4\pi}\iiint_{V'}
\frac{\vec J(\vec r')\times\vec R}{R^3}\,dV'
$$

安培力定律为：

$$
\vec F=\int_L I\,d\vec l\times\vec B
$$

---

### 6-3-2 典型电流分布的磁场

:::: stem
设有限长直线段电流为 $I$，场点 $M$ 到导线的垂直距离为 $\rho$。从导线下端、上端分别指向 $M$ 的矢量与电流方向之间的夹角记为 $\theta_1$、$\theta_2$。求场点处的磁感应强度。

![alt text](<EMFT Chapter 6.attachments/1778922450311.png>)
::::

:::: solution
由毕奥-萨伐尔定律积分可得有限长直导线磁场：

$$
\vec B=\vec e_\phi\frac{\mu_0I}{4\pi\rho}
(\cos\theta_1-\cos\theta_2)
$$

若导线为无限长，则

$$
\theta_1\to0,
\qquad
\theta_2\to\pi
$$

因此

$$
\vec B=\vec e_\phi\frac{\mu_0I}{2\pi\rho}
$$

磁场方向沿绕导线的圆周切向，由右手螺旋定则确定。
::::

---

:::: stem
半径为 $a$ 的圆环置于 $xy$ 平面，圆心在原点，通有电流 $I$。求轴线 $z$ 上点 $P(0,0,z)$ 处的磁感应强度。

![alt text](<EMFT Chapter 6.attachments/1778852329010.png>)
::::

:::: solution
由对称性可知，圆环上对称电流元产生的径向磁场分量相互抵消，只剩 $z$ 分量。

对圆环积分可得：

$$
\vec B(0,0,z)
=\vec e_z\frac{\mu_0Ia^2}{2(a^2+z^2)^{3/2}}
$$

特别地，在圆心处 $z=0$：

$$
\vec B(0)=\vec e_z\frac{\mu_0I}{2a}
$$

在远场 $z\gg a$ 时：

$$
\vec B\approx\vec e_z\frac{\mu_0Ia^2}{2z^3}
$$

说明圆环电流的远场按 $z^{-3}$ 衰减。
::::

---

### 6-3-3 用安培环路定理求磁场

安培环路定理只有在问题具有足够对称性时才适合直接求磁场。常见对称性包括：

| 电流分布 | 适合的安培环路 | 磁场方向 |
| --- | --- | --- |
| 无限长直电流 | 同轴圆周 | $\vec e_\phi$ |
| 无限大面电流 | 跨越电流面的矩形回路 | 平行于面、垂直于电流 |
| 同轴电缆 | 同轴圆周 | $\vec e_\phi$ |

:::: stem
无限大电流薄片位于 $yz$ 平面，面电流密度为

$$
\vec K=\vec e_zK_0
$$

求空间各处磁感应强度。

![alt text](<EMFT Chapter 6.attachments/1778922486950.png>)
::::

:::: solution
由对称性，磁场只可能沿 $\vec e_y$ 方向，并且只与 $x$ 有关。薄片两侧磁场大小相等、方向相反。

取跨越薄片的矩形安培环路，长边长度为 $l$，则

$$
\oint_C\vec B\cdot d\vec l=2Bl
$$

环路包围的电流为

$$
I_{\mathrm{enc}}=K_0l
$$

由安培环路定理：

$$
2Bl=\mu_0K_0l
$$

所以

$$
\vec B=
\begin{cases}
\vec e_y\dfrac{\mu_0K_0}{2}, & x>0 \\
\\
-\vec e_y\dfrac{\mu_0K_0}{2}, & x<0
\end{cases}
$$
::::

---

:::: stem
同轴电缆内导体半径为 $a$，外导体内半径为 $b$、外半径为 $c$。内导体均匀通电 $I$，外导体均匀通反向电流 $-I$。求各区域磁感应强度。
::::

:::: solution
由圆柱对称性，取同轴圆形安培环路：

$$
\vec B=\vec e_\phi B_\phi(\rho)
$$

**区域一 $0\le\rho<a$：**

$$
I_{\mathrm{enc}}=I\frac{\rho^2}{a^2}
$$

$$
\vec B_1=\vec e_\phi\frac{\mu_0I\rho}{2\pi a^2}
$$

**区域二 $a\le\rho<b$：**

$$
I_{\mathrm{enc}}=I
$$

$$
\vec B_2=\vec e_\phi\frac{\mu_0I}{2\pi\rho}
$$

**区域三 $b\le\rho<c$：**

外导体中半径 $b$ 到 $\rho$ 的部分包围了部分反向电流，因此

$$
I_{\mathrm{enc}}
=I-I\frac{\rho^2-b^2}{c^2-b^2}
=I\frac{c^2-\rho^2}{c^2-b^2}
$$

$$
\vec B_3
=\vec e_\phi\frac{\mu_0I}{2\pi\rho}
\frac{c^2-\rho^2}{c^2-b^2}
$$

**区域四 $\rho\ge c$：**

包围净电流为零，故

$$
\vec B_4=0
$$
::::

## 6-4 磁化强度与等效电流密度 Magnetization and Equivalent Current Densities

### 6-4-1 介质磁化与磁化矢量

介质放入外磁场后，分子或原子尺度的磁偶极矩会发生取向排列，宏观上表现为磁化。

:::: definition
**磁偶极矩 Magnetic Dipole Moment**

对小电流环：

$$
\vec p_m=I\Delta\vec S
$$

方向由电流环的右手螺旋定则确定。
::::

:::: definition
**磁化矢量 Magnetization Vector** 定义为单位体积内磁偶极矩的矢量和：

$$
\vec M=\lim_{\Delta V\to0}\frac{\sum_i\vec p_{mi}}{\Delta V}
$$

单位为 $A/m$。
::::

若介质未被磁化，各微观磁偶极矩取向杂乱，宏观上

$$
\sum_i\vec p_{mi}=0,
\qquad
\vec M=0
$$

若介质被外磁场磁化，磁偶极矩出现优先取向，宏观上 $\vec M\ne0$。

对于线性各向同性磁介质：

$$
\vec M=\chi_m\vec H
$$

其中 $\chi_m$ 为磁化率 Magnetic Susceptibility。

---

### 6-4-2 体磁化电流与面磁化电流

磁化后的介质可以等效为某种电流分布产生附加磁场。这个等效电流分为体磁化电流和面磁化电流。

:::: definition
**体磁化电流密度 Volume Magnetization Current Density**

$$
\vec J_M=\nabla\times\vec M
$$

**面磁化电流密度 Surface Magnetization Current Density**

$$
\vec K_M=\vec M\times\vec e_n
$$

其中 $\vec e_n$ 是介质表面的外法向单位矢量。
::::

:::: tip
磁化电流来自微观环流磁矩的宏观等效，并不一定对应宏观自由电荷沿导线流动。引入 $\vec H$ 后，磁化效应被并入介质响应，安培环路定理中只需显式计算自由电流。
::::

## 6-5 磁场强度与相对磁导率 Magnetic Field Intensity and Relative Permeability

### 6-5-1 磁场强度

在介质中，总磁场由自由电流和磁化电流共同产生：

$$
\nabla\times\vec B=\mu_0(\vec J+\vec J_M)
$$

代入

$$
\vec J_M=\nabla\times\vec M
$$

得

$$
\nabla\times\vec B=\mu_0(\vec J+\nabla\times\vec M)
$$

整理为：

$$
\nabla\times\left(\frac{\vec B}{\mu_0}-\vec M\right)=\vec J
$$

于是定义磁场强度：

:::: definition
**磁场强度 Magnetic Field Intensity**

$$
\vec H=\frac{\vec B}{\mu_0}-\vec M
$$

等价地：

$$
\vec B=\mu_0(\vec H+\vec M)
$$
::::

引入 $\vec H$ 后，介质中的静磁场基本方程为：

$$
\begin{cases}
\nabla\times\vec H=\vec J \\
\\
\nabla\cdot\vec B=0
\end{cases}
$$

积分形式为：

$$
\begin{cases}
\displaystyle\oint_C\vec H\cdot d\vec l=\iint_S\vec J\cdot d\vec S=I_{\mathrm{free}} \\
\\
\displaystyle\oiint_S\vec B\cdot d\vec S=0
\end{cases}
$$

因此，$\vec H$ 的环流只显式计算自由电流。

---

### 6-5-2 磁介质的分类与本构关系

对于线性各向同性磁介质：

$$
\vec M=\chi_m\vec H
$$

代入

$$
\vec B=\mu_0(\vec H+\vec M)
$$

可得

$$
\vec B=\mu_0(1+\chi_m)\vec H
$$

定义：

$$
\mu_r=1+\chi_m,
\qquad
\mu=\mu_0\mu_r
$$

于是本构关系为：

:::: definition
**磁介质本构关系 Constitutive Relation of Magnetic Medium**

$$
\vec B=\mu\vec H
$$
::::

常见磁介质分类如下：

| 类型 | 条件 | 特点 |
| --- | --- | --- |
| 抗磁质 Diamagnetic Material | $\mu_r<1$ | 磁化方向与外磁场相反，效应很弱 |
| 顺磁质 Paramagnetic Material | $\mu_r>1$ | 磁化方向与外磁场相同，效应很弱 |
| 铁磁质 Ferromagnetic Material | $\mu_r\gg1$ | 磁化显著，通常存在非线性与磁滞 |

:::: stem
无限长磁介质圆柱半径为 $a$，磁导率为 $\mu$，轴线上有线电流 $I$。圆柱外为空气，磁导率为 $\mu_0$。求 $\vec H$、$\vec B$ 和 $\vec M$ 的分布。
::::

:::: solution
由安培环路定理，任意半径 $\rho$ 的圆形路径都包围自由电流 $I$：

$$
\oint_C\vec H\cdot d\vec l=2\pi\rho H_\phi=I
$$

所以

$$
\vec H=\vec e_\phi\frac{I}{2\pi\rho}
$$

磁感应强度为

$$
\vec B=
\begin{cases}
\vec e_\phi\dfrac{\mu I}{2\pi\rho}, & 0<\rho<a \\
\\
\vec e_\phi\dfrac{\mu_0 I}{2\pi\rho}, & \rho>a
\end{cases}
$$

磁化强度只存在于磁介质内部：

$$
\vec M=\frac{\vec B}{\mu_0}-\vec H
$$

因此

$$
\vec M=
\begin{cases}
\vec e_\phi\left(\dfrac{\mu}{\mu_0}-1\right)\dfrac{I}{2\pi\rho}, & 0<\rho<a \\
\\
0, & \rho>a
\end{cases}
$$
::::

## 6-6 静磁场边界条件 Boundary Conditions for Magnetostatic Fields

设界面法向单位矢量 $\vec e_n$ 从介质 2 指向介质 1。

### 6-6-1 磁感应强度的边界条件

由

$$
\oiint_S\vec B\cdot d\vec S=0
$$

取跨越界面的薄圆柱高斯面，令高度趋于零，可得：

:::: definition
**磁感应强度法向边界条件**

$$
\vec e_n\cdot(\vec B_1-\vec B_2)=0
$$

即

$$
B_{1n}=B_{2n}
$$
::::

这说明磁感应强度的法向分量总是连续的。物理原因是不存在磁单极子。

---

### 6-6-2 磁场强度的边界条件

由

$$
\oint_C\vec H\cdot d\vec l=I_{\mathrm{free}}
$$

取跨越界面的窄矩形回路，令高度趋于零，可得：

:::: definition
**磁场强度切向边界条件**

$$
\vec e_n\times(\vec H_1-\vec H_2)=\vec K_s
$$

其中 $\vec K_s$ 为界面自由面电流密度。
::::

若界面上没有自由面电流，即 $\vec K_s=0$，则

$$
\vec H_{1t}=\vec H_{2t}
$$

---

### 6-6-3 磁矢位的边界条件

若磁矢位在界面上没有奇异面源，通常取

$$
\vec A_1=\vec A_2
$$

又因为

$$
\vec H=\frac{1}{\mu}\nabla\times\vec A
$$

所以切向磁场强度边界条件可写为：

$$
\vec e_n\times\left(
\frac{1}{\mu_1}\nabla\times\vec A_1
-
\frac{1}{\mu_2}\nabla\times\vec A_2
\right)=\vec K_s
$$

:::: tip
边界条件可以按分量连续性来记：

- $\vec B$ 的法向分量连续；
- $\vec H$ 的切向分量在无自由面电流时连续；
- 若存在自由面电流，$\vec H$ 的切向分量发生跳变。
::::

## 6-7 电感与电感器 Inductances and Inductors

### 6-7-1 磁通与磁链 Magnetic Flux and Flux Linkage

:::: definition
**磁通 Magnetic Flux** 定义为磁感应强度通过某曲面的通量：

$$
\Phi=\iint_S\vec B\cdot d\vec S
$$

由 Stokes 定理和 $\vec B=\nabla\times\vec A$，也可写为：

$$
\Phi=\oint_C\vec A\cdot d\vec l
$$
::::

:::: definition
**磁链 Flux Linkage** 记作 $\Psi$，表示与电流回路相链的总磁通。

单匝线圈：

$$
\Psi=\Phi
$$

$N$ 匝线圈且每匝磁通相同：

$$
\Psi=N\Phi
$$
::::

对粗导体回路，磁链通常分为外磁链和内磁链：

$$
\Psi=\Psi_o+\Psi_i
$$

---

### 6-7-2 自感 Self-Inductance

:::: definition
**自感 Self-Inductance** 定义为回路自身电流产生的磁链与该电流之比：

$$
L=\frac{\Psi}{I}
$$
::::

若导体不可忽略粗细，则

$$
L=L_i+L_o
$$

其中 $L_i$ 是内自感，$L_o$ 是外自感。

:::: tip
自感只与回路几何形状、尺寸和周围介质有关。在线性介质中，它不依赖电流大小；但如果介质为铁磁材料，由于 $\mu$ 可能随磁场变化，自感也可能不再是常数。
::::

:::: stem
求同轴线单位长度自感。内导体半径为 $a$，外导体内半径为 $b$，忽略外导体内部自感，只考虑内导体内部与两导体之间的磁链。
::::

:::: solution
**内导体内部：**

对 $0\le\rho\le a$，由安培环路定理：

$$
H_i=\frac{I\rho}{2\pi a^2},
\qquad
B_i=\mu_0H_i=\frac{\mu_0I\rho}{2\pi a^2}
$$

内磁链积分可得单位长度内自感：

$$
L_i=\frac{\mu_0}{8\pi}
$$

**两导体之间：**

对 $a\le\rho\le b$，

$$
B=\frac{\mu_0I}{2\pi\rho}
$$

单位长度外磁链为

$$
\Psi_o'=\int_a^b\frac{\mu_0I}{2\pi\rho}\,d\rho
=\frac{\mu_0I}{2\pi}\ln\frac{b}{a}
$$

所以

$$
L_o=\frac{\mu_0}{2\pi}\ln\frac{b}{a}
$$

总单位长度自感为

$$
L=\frac{\mu_0}{8\pi}+\frac{\mu_0}{2\pi}\ln\frac{b}{a}
$$
::::

---

:::: stem
两根半径为 $a$ 的平行长导线相距 $D$，且 $D\gg a$，通以大小相等、方向相反的电流。求单位长度自感。
::::

:::: solution
两线之间的外磁场可由叠加得到，外自感近似为：

$$
L_o\approx\frac{\mu_0}{\pi}\ln\frac{D}{a}
$$

每根圆导线的内自感单位长度为 $\mu_0/(8\pi)$，两根导线合计：

$$
L_i=2\times\frac{\mu_0}{8\pi}=\frac{\mu_0}{4\pi}
$$

因此总单位长度自感为

$$
L=\frac{\mu_0}{4\pi}+\frac{\mu_0}{\pi}\ln\frac{D}{a}
$$
::::

---

### 6-7-3 互感 Mutual Inductance

:::: definition
设回路 $C_1$ 中电流 $I_1$ 在回路 $C_2$ 中产生磁链 $\Psi_{21}$，则

$$
M_{21}=\frac{\Psi_{21}}{I_1}
$$

称为回路 $C_1$ 对回路 $C_2$ 的互感。
::::

类似地：

$$
M_{12}=\frac{\Psi_{12}}{I_2}
$$

在线性各向同性介质中，互易性成立：

$$
M_{12}=M_{21}=M
$$

---

### 6-7-4 Neumann 公式

由磁矢位：

$$
\vec A_1(\vec r_2)=\frac{\mu_0I_1}{4\pi}\oint_{C_1}\frac{d\vec l_1}{R}
$$

回路 $C_2$ 的磁链为：

$$
\Psi_{21}=\oint_{C_2}\vec A_1\cdot d\vec l_2
$$

代入得：

$$
\Psi_{21}
=\frac{\mu_0I_1}{4\pi}\oint_{C_2}\oint_{C_1}\frac{d\vec l_1\cdot d\vec l_2}{R}
$$

因此

:::: definition
**Neumann 公式**

$$
M=\frac{\mu_0}{4\pi}\oint_{C_1}\oint_{C_2}\frac{d\vec l_1\cdot d\vec l_2}{R}
$$
::::

:::: stem
无限长直导线与矩形线圈位于同一平面。矩形线圈高为 $a$，近边距离长直导线为 $D$，宽为 $b$。求长直导线与矩形线圈之间的互感。
::::

:::: solution
长直导线通电 $I_1$ 时，在距离 $r$ 处产生磁场：

$$
B_1=\frac{\mu_0I_1}{2\pi r}
$$

穿过矩形线圈的磁链为

$$
\Psi_{21}=\int_D^{D+b}B_1a\,dr
=\frac{\mu_0I_1a}{2\pi}\ln\frac{D+b}{D}
$$

因此互感为

$$
M_{21}=\frac{\Psi_{21}}{I_1}
=\frac{\mu_0a}{2\pi}\ln\frac{D+b}{D}
$$

若线圈绕向相反，互感符号随所选参考方向改变；互感大小不变。
::::

## 6-8 磁场能 Magnetic Energy

磁场可以储存能量。对线性介质，磁场能密度为：

:::: definition
**磁场能密度 Magnetic Energy Density**

$$
w_m=\frac{1}{2}\vec B\cdot\vec H
$$

若介质线性各向同性，$\vec B=\mu\vec H$，则

$$
w_m=\frac{1}{2}\mu H^2=\frac{B^2}{2\mu}
$$
::::

总磁场能为：

$$
W_m=\frac{1}{2}\iiint_V\vec B\cdot\vec H\,dV
$$

也可以用磁矢位表示：

| 电流分布 | 磁场能表达式 |
| --- | --- |
| 体电流 | $\displaystyle W_m=\frac{1}{2}\iiint_V\vec J\cdot\vec A\,dV$ |
| 面电流 | $\displaystyle W_m=\frac{1}{2}\iint_S\vec K\cdot\vec A\,dS$ |
| 线电流回路 | $\displaystyle W_m=\frac{I}{2}\oint_C\vec A\cdot d\vec l=\frac{1}{2}I\Psi$ |

对于单个电感：

$$
W_m=\frac{1}{2}LI^2
$$

对于多个线性耦合回路：

$$
W_m=\frac{1}{2}\sum_j\sum_k I_jI_kM_{jk}
$$

两个回路时：

$$
W_m=\frac{1}{2}L_1I_1^2+\frac{1}{2}L_2I_2^2+MI_1I_2
$$

:::: stem
同轴线内导体半径为 $a$，外导体内半径为 $b$、外半径为 $c$。内外导体通以大小相等、方向相反的电流。求单位长度磁场能，并由磁场能求单位长度自感。
::::

:::: solution
各区域磁场强度由安培环路定理得到：

$$
\vec H=
\begin{cases}
\vec e_\phi\dfrac{\rho I}{2\pi a^2}, & 0\le\rho<a \\
\\
\vec e_\phi\dfrac{I}{2\pi\rho}, & a\le\rho<b \\
\\
\vec e_\phi\dfrac{I}{2\pi\rho}\dfrac{c^2-\rho^2}{c^2-b^2}, & b\le\rho<c \\
\\
0, & \rho\ge c
\end{cases}
$$

单位长度磁场能为

$$
W_m'=\frac{\mu_0}{2}\int H^2\,dS
$$

分别积分可得：

$$
W_{m1}'=\frac{\mu_0I^2}{16\pi}
$$

$$
W_{m2}'=\frac{\mu_0I^2}{4\pi}\ln\frac{b}{a}
$$

$$
W_{m3}'=\frac{\mu_0I^2}{4\pi}
\left[
\frac{c^4}{(c^2-b^2)^2}\ln\frac{c}{b}
-\frac{3c^2-b^2}{4(c^2-b^2)}
\right]
$$

总磁场能为

$$
W_m'=W_{m1}'+W_{m2}'+W_{m3}'
$$

由

$$
W_m'=\frac{1}{2}L'I^2
$$

得到单位长度自感：

$$
L'=\frac{\mu_0}{8\pi}
+\frac{\mu_0}{2\pi}\ln\frac{b}{a}
+\frac{\mu_0}{2\pi}
\left[
\frac{c^4}{(c^2-b^2)^2}\ln\frac{c}{b}
-\frac{3c^2-b^2}{4(c^2-b^2)}
\right]
$$
::::

## 总结 Summary

本章主要讨论稳恒电流产生的静磁场。静磁场是有旋无散场；在介质中，磁化效应用等效电流或 $\vec H$ 描述；电感和磁场能则把磁场与电路量联系起来。

| 内容 | 公式 | 物理图像 |
| --- | --- | --- |
| 静磁场基本方程 | $\nabla\times\vec B=\mu_0\vec J$，$\nabla\cdot\vec B=0$ | 电流是磁场旋涡源，磁感线闭合 |
| 毕奥-萨伐尔定律 | $\displaystyle \vec B=\frac{\mu_0}{4\pi}\int\frac{I d\vec l'\times\vec R}{R^3}$ | 由电流分布直接叠加磁场 |
| 磁矢位 | $\vec B=\nabla\times\vec A$ | 用矢量势表示无散磁场 |
| 磁化电流 | $\vec J_M=\nabla\times\vec M$，$\vec K_M=\vec M\times\vec e_n$ | 磁化的宏观等效电流 |
| 磁场强度 | $\vec H=\dfrac{\vec B}{\mu_0}-\vec M$ | 把磁化效应并入介质响应 |
| 介质本构 | $\vec B=\mu\vec H$ | 线性磁介质中 $\vec B$ 与 $\vec H$ 成正比 |
| 边界条件 | $B_{1n}=B_{2n}$，$\vec e_n\times(\vec H_1-\vec H_2)=\vec K_s$ | $\vec B$ 法向连续，$\vec H$ 切向由面电流决定 |
| 自感 | $L=\Psi/I$ | 自身电流产生的磁链能力 |
| 互感 | $M=\Psi_{21}/I_1$ | 一个回路电流在另一个回路中产生磁链 |
| 磁场能 | $w_m=\dfrac{1}{2}\vec B\cdot\vec H$，$W_m=\dfrac{1}{2}LI^2$ | 磁场可以储能 |

常用结论集中写为：

$$
\begin{cases}
\nabla\times\vec H=\vec J \\
\\
\nabla\cdot\vec B=0 \\
\\
\vec B=\mu\vec H
\end{cases}
$$

$$
\begin{cases}
\vec e_n\cdot(\vec B_1-\vec B_2)=0 \\
\\
\vec e_n\times(\vec H_1-\vec H_2)=\vec K_s
\end{cases}
$$
