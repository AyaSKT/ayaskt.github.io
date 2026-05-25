# 7 Time-Varying Fields and Maxwell’s Equations

**季節の変わり目の服は 何着りゃいいんだろ，**  
**季节交替之时 该换上什么衣服呢，** 


**春と秋 どこいっちゃったんだよ。**  
**春天与秋天 究竟去了哪里呢。**  

<div align="right">——結束バンド《ギターと孤独と蒼い惑星》</div>

![alt text](<EMFT Chapter 7.attachments/1778750317994.PNG>)

## 章节目录

- [章节目录](#章节目录)
- [7-1 法拉第电磁感应定律 Faraday's Law of Electromagnetic Induction](#7-1-法拉第电磁感应定律-faradays-law-of-electromagnetic-induction)
  - [7-1-1 感应电动势与楞次定律](#7-1-1-感应电动势与楞次定律)
  - [7-1-2 感应电场 Induced Electric Field](#7-1-2-感应电场-induced-electric-field)
  - [7-1-3 运动电动势 Motional EMF](#7-1-3-运动电动势-motional-emf)
- [7-2 麦克斯韦方程组 Maxwell's Equations](#7-2-麦克斯韦方程组-maxwells-equations)
  - [7-2-1 位移电流 Displacement Current](#7-2-1-位移电流-displacement-current)
  - [7-2-2 麦克斯韦方程组的微分形式与积分形式](#7-2-2-麦克斯韦方程组的微分形式与积分形式)
  - [7-2-3 线性各向同性介质中的形式](#7-2-3-线性各向同性介质中的形式)
- [7-3 电磁场边界条件 Electromagnetic Boundary Conditions](#7-3-电磁场边界条件-electromagnetic-boundary-conditions)
  - [7-3-1 一般边界条件](#7-3-1-一般边界条件)
  - [7-3-2 理想介质界面与理想导体表面](#7-3-2-理想介质界面与理想导体表面)
- [7-4 波动方程 Wave Equations](#7-4-波动方程-wave-equations)
- [7-5 位函数 Potential Functions](#7-5-位函数-potential-functions)
  - [7-5-1 时变场中的标量位与矢量位](#7-5-1-时变场中的标量位与矢量位)
  - [7-5-2 洛伦兹规范 Lorenz Gauge](#7-5-2-洛伦兹规范-lorenz-gauge)
- [7-6 时谐场 Time-Harmonic Fields](#7-6-时谐场-time-harmonic-fields)
  - [7-6-1 复矢量表示](#7-6-1-复矢量表示)
  - [7-6-2 复数形式的麦克斯韦方程与亥姆霍兹方程](#7-6-2-复数形式的麦克斯韦方程与亥姆霍兹方程)
  - [7-6-3 复介电常数与损耗角正切](#7-6-3-复介电常数与损耗角正切)
- [总结 Summary](#总结-summary)

## 7-1 法拉第电磁感应定律 Faraday's Law of Electromagnetic Induction

本章开始进入**时变场 Time-Varying Fields**。

静态场中，电场和磁场可以分开讨论：静电场由电荷产生，静磁场由稳恒电流产生。进入时变情形后，二者不再独立：**随时间变化的磁场会激发电场，随时间变化的电场也会激发磁场**。

:::: definition
**法拉第电磁感应定律 Faraday's Law of Electromagnetic Induction** 表述为：闭合回路中的感应电动势等于穿过该回路所围曲面的磁链随时间变化率的负值。

$$
\varepsilon_{\mathrm{in}}=-\frac{d\Psi}{dt}
$$

若回路为单匝线圈，磁链就是磁通：

$$
\Psi=\Phi=\iint_S \vec B\cdot d\vec S
$$

因此

$$
\varepsilon_{\mathrm{in}}
=-\frac{d}{dt}\iint_S \vec B\cdot d\vec S
$$
::::



### 7-1-1 感应电动势与楞次定律

式子前面的负号来自**楞次定律 Lenz's Law**：感应电动势产生的效果，总是阻碍原磁通量的变化。

这里的阻碍指感应电流产生的磁场方向会反抗磁通的增加或减少，并不表示变化会停止。


![alt text](<EMFT Chapter 7.attachments/faraday-oriented-surface.jpg>)

---

### 7-1-2 感应电场 Induced Electric Field

感应电动势也可以写成电场沿闭合路径的环流：

$$
\varepsilon_{\mathrm{in}}=\oint_C \vec E_{\mathrm{in}}\cdot d\vec l
$$

因此法拉第定律的积分形式为：

:::: definition
**法拉第定律积分形式 Integral Form of Faraday's Law**

$$
\oint_C \vec E\cdot d\vec l
=-\frac{d}{dt}\iint_S \vec B\cdot d\vec S
$$

若回路和积分曲面固定不动，则时间导数可以进入积分号：

$$
\oint_C \vec E\cdot d\vec l
=-\iint_S \frac{\partial \vec B}{\partial t}\cdot d\vec S
$$
::::

由 Stokes 定理：

$$
\oint_C \vec E\cdot d\vec l
=\iint_S (\nabla\times \vec E)\cdot d\vec S
$$

于是得到微分形式：

:::: definition
**法拉第定律微分形式 Differential Form of Faraday's Law**

$$
\nabla\times\vec E=-\frac{\partial\vec B}{\partial t}
$$
::::

这个式子的物理意义很重要：**时变磁场是涡旋电场的源**。

静电场满足

$$
\nabla\times\vec E_c=0
$$

但时变磁场激发出的感应电场满足

$$
\nabla\times\vec E_{\mathrm{in}}\ne 0
$$

所以在时变场中，电场一般写为

$$
\vec E=\vec E_c+\vec E_{\mathrm{in}}
$$

其中 $\vec E_c$ 来自电荷，$\vec E_{\mathrm{in}}$ 来自变化的磁场。

---

### 7-1-3 运动电动势 Motional EMF

磁通变化有几种来源：

| 情况 | 主要原因 | 常用表达式 |
| --- | --- | --- |
| 回路不动，磁场随时间变化 | $\partial \vec B/\partial t\ne0$ | $\displaystyle \varepsilon=-\iint_S\frac{\partial\vec B}{\partial t}\cdot d\vec S$ |
| 导体回路在恒定磁场中运动 | 导体切割磁感线 | $\displaystyle \varepsilon=\oint_C(\vec v\times\vec B)\cdot d\vec l$ |
| 回路运动且磁场也随时间变化 | 两者共同作用 | $\displaystyle \varepsilon=\oint_C(\vec v\times\vec B)\cdot d\vec l-\iint_S\frac{\partial\vec B}{\partial t}\cdot d\vec S$ |

:::: stem
矩形回路宽为 $b$，长度为 $a$。均匀磁场垂直穿过回路，方向为 $\vec e_z$。讨论以下三种情形的感应电动势：

1. $\vec B=\vec e_zB_0\cos\omega t$，回路静止；
2. $\vec B=\vec e_zB_0$，滑动导体以 $\vec v=\vec e_xv$ 运动，使回路长度随时间增加；
3. $\vec B=\vec e_zB_0\cos\omega t$，滑动导体同时以 $\vec v=\vec e_xv$ 运动。
::::

:::: solution
**(1) 回路静止，磁场随时间变化**

$$
\varepsilon_{\mathrm{in}}
=-\iint_S\frac{\partial\vec B}{\partial t}\cdot d\vec S
=-\frac{d}{dt}(abB_0\cos\omega t)
$$

故

$$
\varepsilon_{\mathrm{in}}=abB_0\omega\sin\omega t
$$

**(2) 磁场恒定，回路运动**

此时感应电动势来自运动电动势：

$$
\varepsilon_{\mathrm{in}}
=\oint_C(\vec v\times\vec B)\cdot d\vec l
$$

由于

$$
\vec v\times\vec B
=\vec e_xv\times\vec e_zB_0
=-\vec e_yvB_0
$$

沿滑动边积分得

$$
\varepsilon_{\mathrm{in}}=-vB_0b
$$

**(3) 磁场变化，回路也运动**

若令回路长度随时间为 $x=vt$，则面积为 $S=bt$ 对应的 $bvt$，总电动势为两部分叠加：

$$
\varepsilon_{\mathrm{in}}
=-\iint_S\frac{\partial\vec B}{\partial t}\cdot d\vec S
+\oint_C(\vec v\times\vec B)\cdot d\vec l
$$

代入可得

$$
\varepsilon_{\mathrm{in}}
=vb t B_0\omega\sin\omega t-vbB_0\cos\omega t
$$
::::

## 7-2 麦克斯韦方程组 Maxwell's Equations

静态场中有

$$
\frac{\partial}{\partial t}=0
$$

时变场中则有

$$
\frac{\partial}{\partial t}\ne0
$$

因此需要做两个修正：

1. 静电场的 $\nabla\times\vec E=0$ 修正为 $\nabla\times\vec E=-\dfrac{\partial\vec B}{\partial t}$；
2. 稳恒电流中的 $\nabla\times\vec H=\vec J$ 需要加入位移电流项。

### 7-2-1 位移电流 Displacement Current

在稳恒电流中，连续性方程退化为

$$
\nabla\cdot\vec J=0
$$

但在时变情形中，电荷密度可以随时间变化：

$$
\nabla\cdot\vec J=-\frac{\partial\rho}{\partial t}
$$

如果仍写

$$
\nabla\times\vec H=\vec J
$$

两边取散度会得到

$$
\nabla\cdot\vec J=\nabla\cdot(\nabla\times\vec H)=0
$$

这与时变连续性方程矛盾。

由高斯定律

$$
\nabla\cdot\vec D=\rho
$$

可得

$$
\nabla\cdot\vec J
=-\frac{\partial}{\partial t}(\nabla\cdot\vec D)
$$

因此

$$
\nabla\cdot\left(\vec J+\frac{\partial\vec D}{\partial t}\right)=0
$$

于是安培环路定理应修正为：

:::: definition
**全电流定律 Total Current Law**

$$
\nabla\times\vec H
=\vec J+\frac{\partial\vec D}{\partial t}
$$

其中

$$
\vec J_d=\frac{\partial\vec D}{\partial t}
$$

称为**位移电流密度 Displacement Current Density**。
::::

![alt text](<EMFT Chapter 7.attachments/displacement-current-capacitor.jpg>)

需要注意，位移电流表示**时变电场对磁场的贡献**，没有自由电荷宏观迁移，因此也没有传导电流那样的焦耳热效应。

:::: tip
电容器充电问题可以说明位移电流的必要性。

若积分曲面切过导线，可以看到传导电流 $I$；若曲面鼓入两极板之间，那里没有传导电流。为了让同一个闭合路径 $C$ 得到唯一的 $\oint_C\vec H\cdot d\vec l$，两极板间必须存在位移电流

$$
I_d=\frac{d}{dt}\iint_S\vec D\cdot d\vec S
$$

它在积分意义上补上了传导电流的连续性。
::::

---

### 7-2-2 麦克斯韦方程组的微分形式与积分形式

:::: definition
**麦克斯韦方程组 Maxwell's Equations** 的微分形式为：

$$
\begin{cases}
\nabla\times\vec H=\vec J_f+\dfrac{\partial\vec D}{\partial t} \\
\\
\nabla\times\vec E=-\dfrac{\partial\vec B}{\partial t} \\
\\
\nabla\cdot\vec B=0 \\
\\
\nabla\cdot\vec D=\rho_f
\end{cases}
$$

对应的积分形式为：

$$
\begin{cases}
\displaystyle\oint_C\vec H\cdot d\vec l
=\iint_S\left(\vec J_f+\dfrac{\partial\vec D}{\partial t}\right)\cdot d\vec S \\
\\
\displaystyle\oint_C\vec E\cdot d\vec l
=-\iint_S\dfrac{\partial\vec B}{\partial t}\cdot d\vec S \\
\\
\displaystyle\oiint_S\vec B\cdot d\vec S=0 \\
\\
\displaystyle\oiint_S\vec D\cdot d\vec S=\iiint_V\rho_f\,dV
\end{cases}
$$
::::

其中自由电荷与自由电流还满足连续性方程：

$$
\nabla\cdot\vec J_f=-\frac{\partial\rho_f}{\partial t}
$$

---

### 7-2-3 线性各向同性介质中的形式

对于线性、各向同性介质，有本构关系：

$$
\vec D=\varepsilon\vec E,
\qquad
\vec B=\mu\vec H,
\qquad
\vec J=\sigma\vec E
$$

若介质均匀，则麦克斯韦方程组可写为：

$$
\begin{cases}
\nabla\times\vec H=\sigma\vec E+\varepsilon\dfrac{\partial\vec E}{\partial t} \\
\\
\nabla\times\vec E=-\mu\dfrac{\partial\vec H}{\partial t} \\
\\
\nabla\cdot\vec H=0 \\
\\
\nabla\cdot\vec E=\dfrac{\rho}{\varepsilon}
\end{cases}
$$

## 7-3 电磁场边界条件 Electromagnetic Boundary Conditions

电磁场边界条件来自麦克斯韦方程组的积分形式。令跨越界面的薄圆柱或窄矩形回路高度趋于零，时间变化项对应的面积分也趋于零，因此时变场的边界条件形式与静态场一致。

### 7-3-1 一般边界条件

设界面法向单位矢量 $\vec e_n$ 从介质 2 指向介质 1，界面上自由面电荷密度为 $\rho_s$，自由面电流密度为 $\vec J_s$。



:::: definition
**一般电磁边界条件 General Electromagnetic Boundary Conditions**

$$
\begin{cases}
\vec e_n\cdot(\vec D_1-\vec D_2)=\rho_s \\
\\
\vec e_n\cdot(\vec B_1-\vec B_2)=0 \\
\\
\vec e_n\times(\vec E_1-\vec E_2)=0 \\
\\
\vec e_n\times(\vec H_1-\vec H_2)=\vec J_s
\end{cases}
$$
::::

此外，界面自由电流还满足面电荷连续性关系：

$$
\vec e_n\cdot(\vec J_1-\vec J_2)
=-\frac{\partial\rho_s}{\partial t}
$$

---

### 7-3-2 理想介质界面与理想导体表面

若两侧为理想介质，且界面上没有自由面电荷与自由面电流，即

$$
\rho_s=0,
\qquad
\vec J_s=0
$$

则边界条件化简为

$$
\begin{cases}
\vec e_n\cdot(\vec D_1-\vec D_2)=0 \\
\\
\vec e_n\cdot(\vec B_1-\vec B_2)=0 \\
\\
\vec e_n\times(\vec E_1-\vec E_2)=0 \\
\\
\vec e_n\times(\vec H_1-\vec H_2)=0
\end{cases}
$$

![alt text](<EMFT Chapter 7.attachments/medium-interface.jpg>)

若介质与理想导体相接，导体内部电场为零，导体表面满足：

$$
\begin{cases}
\vec e_n\cdot\vec D=\rho_s \\
\\
\vec e_n\cdot\vec B=0 \\
\\
\vec e_n\times\vec E=0 \\
\\
\vec e_n\times\vec H=\vec J_s
\end{cases}
$$

## 7-4 波动方程 Wave Equations

在均匀线性介质中，由麦克斯韦方程组可以推出电场和磁场的波动方程。

对

$$
\nabla\times\vec E=-\mu\frac{\partial\vec H}{\partial t}
$$

两边取旋度，并代入

$$
\nabla\times\vec H=\vec J+\varepsilon\frac{\partial\vec E}{\partial t}
$$

可得到电场波动方程：

$$
\nabla^2\vec E-\mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}
=\mu\frac{\partial\vec J}{\partial t}+\frac{1}{\varepsilon}\nabla\rho
$$

类似可得磁场波动方程：

$$
\nabla^2\vec H-\mu\varepsilon\frac{\partial^2\vec H}{\partial t^2}
=-\nabla\times\vec J
$$

在无源区域中，$\rho=0$，$\vec J=0$，于是

:::: definition
**无源区波动方程 Wave Equations in Source-Free Region**

$$
\begin{cases}
\nabla^2\vec E-\mu\varepsilon\dfrac{\partial^2\vec E}{\partial t^2}=0 \\
\\
\nabla^2\vec H-\mu\varepsilon\dfrac{\partial^2\vec H}{\partial t^2}=0
\end{cases}
$$
::::

波速为

$$
v=\frac{1}{\sqrt{\mu\varepsilon}}
$$

在真空中：

$$
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

:::: tip
波动方程说明，电磁场不会瞬时传递。时变电场和时变磁场互相激发，并以有限速度在空间中传播，这对应电磁波的基本图像。
::::

## 7-5 位函数 Potential Functions

### 7-5-1 时变场中的标量位与矢量位

因为

$$
\nabla\cdot\vec B=0
$$

所以仍可引入磁矢位：

$$
\vec B=\nabla\times\vec A
$$

代入法拉第定律：

$$
\nabla\times\vec E
=-\frac{\partial}{\partial t}(\nabla\times\vec A)
$$

即

$$
\nabla\times\left(\vec E+\frac{\partial\vec A}{\partial t}\right)=0
$$

无旋场可以写成某个标量函数的负梯度，于是

:::: definition
**时变场中的位函数 Potential Functions in Time-Varying Fields**

$$
\vec B=\nabla\times\vec A
$$

$$
\vec E=-\frac{\partial\vec A}{\partial t}-\nabla\varphi
$$
::::

与静态场相比，这里多了 $-\dfrac{\partial\vec A}{\partial t}$ 项。因此时变场中的电场不再只由标量电势决定。

---

### 7-5-2 洛伦兹规范 Lorenz Gauge

位函数不唯一，需要附加规范条件。常用的规范条件是**洛伦兹规范 Lorenz Gauge**：

:::: definition
**洛伦兹规范 Lorenz Gauge**

$$
\nabla\cdot\vec A+\mu\varepsilon\frac{\partial\varphi}{\partial t}=0
$$
::::

在洛伦兹规范下，位函数方程可以解耦为：

$$
\begin{cases}
\nabla^2\vec A-\mu\varepsilon\dfrac{\partial^2\vec A}{\partial t^2}=-\mu\vec J \\
\\
\nabla^2\varphi-\mu\varepsilon\dfrac{\partial^2\varphi}{\partial t^2}=-\dfrac{\rho}{\varepsilon}
\end{cases}
$$



## 7-6 时谐场 Time-Harmonic Fields

### 7-6-1 复矢量表示

:::: definition
**时谐场 Time-Harmonic Field** 指所有场量都随时间按同一角频率 $\omega$ 作正弦变化的电磁场。

例如

$$
A(\vec r,t)=A_0(\vec r)\cos[\omega t+\phi(\vec r)]
$$
::::

时谐场中的场量都带有幅值、相位和空间变化。若直接使用三角函数，后续求导、积分和联立方程会比较繁琐。因此通常使用相量法 Phasor Method。

相量法把公共时间因子 $e^{j\omega t}$ 提出，只保留与空间有关的复振幅。计算完成后，再取实部得到真实的瞬时值：

$$
\boxed{
A(\vec r,t)=\mathrm{Re}\left[\dot A(\vec r)e^{j\omega t}\right]
}
$$

其中：

- $A(\vec r,t)$ 为瞬时值；
- $\dot A(\vec r)$ 为复振幅，也称相量 Phasor；
- $e^{j\omega t}$ 为公共时间因子；
- $\mathrm{Re}[\ ]$ 表示取实部。

例如

$$
A(\vec r,t)=A_m(\vec r)\cos[\omega t+\phi(\vec r)]
$$

对应的相量为

$$
\dot A(\vec r)=A_m(\vec r)e^{j\phi(\vec r)}
$$

因为

$$
\mathrm{Re}\left[A_m(\vec r)e^{j\phi(\vec r)}e^{j\omega t}\right]
=A_m(\vec r)\cos[\omega t+\phi(\vec r)]
$$

所以，相量实际上同时记录了幅值和相位。

:::: tip
相量只是一种计算表示。实际的电场、磁场仍通过取实部得到。
::::

#### 时间微分与积分

设

$$
A(\vec r,t)=\mathrm{Re}\left[\dot A(\vec r)e^{j\omega t}\right]
$$

由于 $\dot A(\vec r)$ 与时间无关，故

$$
\frac{\partial A}{\partial t}
=\mathrm{Re}\left[
\dot A(\vec r)\frac{\partial}{\partial t}e^{j\omega t}
\right]
=\mathrm{Re}\left[
j\omega\dot A(\vec r)e^{j\omega t}
\right]
$$

因此在相量域中有：

$$
\boxed{
\frac{\partial}{\partial t}\Longleftrightarrow j\omega,
\qquad
\int dt\Longleftrightarrow \frac{1}{j\omega}
}
$$

这样就可以把时间微分方程化为复数代数方程。



#### 常见转换规则

| 瞬时表达式 | 相量表达式 |
| --- | --- |
| $A_m\cos(\omega t+\phi)$ | $\dot A=A_me^{j\phi}$ |
| $A_m\sin(\omega t+\phi)$ | $\dot A=A_me^{j(\phi-\pi/2)}=-jA_me^{j\phi}$ |
| $A_m\cos(\omega t-kz+\phi)$ | $\dot A(z)=A_me^{j\phi}e^{-jkz}$ |

其中 $e^{-jkz}$ 为沿 $z$ 方向的空间相位因子。

:::: stem
已知瞬时电场为

$$
\vec E(z,t)=\vec e_xE_{xm}\cos(\omega t-kz+\phi_x)
+\vec e_yE_{ym}\sin(\omega t-kz+\phi_y)
$$

求它的复矢量表示。
::::

:::: solution
相量默认使用余弦作为实部，所以先把正弦项写成余弦项：

$$
\sin(\omega t-kz+\phi_y)
=\cos\left(\omega t-kz+\phi_y-\frac{\pi}{2}\right)
$$

于是 $x$ 分量对应的相量为

$$
\dot{\vec E}_x(z)=\vec e_xE_{xm}e^{j\phi_x}e^{-jkz}
$$

$y$ 分量对应的相量为

$$
\dot{\vec E}_y(z)=\vec e_yE_{ym}e^{j(\phi_y-\pi/2)}e^{-jkz}
$$

因为

$$
e^{-j\pi/2}=-j
$$

所以总相量为

$$
\dot{\vec E}(z)
=\left(\vec e_xE_{xm}e^{j\phi_x}
-j\vec e_yE_{ym}e^{j\phi_y}\right)e^{-jkz}
$$

代回复矢量定义可验证，乘回 $e^{j\omega t}$ 并取实部后，正好回到原来的瞬时电场。
::::

---

### 7-6-2 复数形式的麦克斯韦方程与亥姆霍兹方程

在时谐场中，每一个场量都写成

$$
\vec F(\vec r,t)=\mathrm{Re}\left[\dot{\vec F}(\vec r)e^{j\omega t}\right]
$$

于是所有时间微分都可以用 $j\omega$ 代替。麦克斯韦方程组变为复矢量形式：

$$
\begin{cases}
\nabla\times\dot{\vec H}=\dot{\vec J}+j\omega\dot{\vec D} \\
\\
\nabla\times\dot{\vec E}=-j\omega\dot{\vec B} \\
\\
\nabla\cdot\dot{\vec B}=0 \\
\\
\nabla\cdot\dot{\vec D}=\dot\rho
\end{cases}
$$

连续性方程为

$$
\nabla\cdot\dot{\vec J}=-j\omega\dot\rho
$$

:::: tip
复矢量形式只是时谐条件下的计算形式。时间求导已经由 $j\omega$ 代替，因此方程主要只含空间变量。
::::

在无源无耗介质中，波动方程变为亥姆霍兹方程：

:::: definition
**亥姆霍兹方程 Helmholtz Equations**

$$
\begin{cases}
\nabla^2\dot{\vec E}+k^2\dot{\vec E}=0 \\
\\
\nabla^2\dot{\vec H}+k^2\dot{\vec H}=0
\end{cases}
$$

其中

$$
k=\omega\sqrt{\mu\varepsilon}
$$
::::

其中 $k$ 称为波数 Wave Number，表示相位随空间变化的快慢。若波沿 $+z$ 方向传播，常见空间因子为

$$
e^{-jkz}
$$

因为

$$
\mathrm{Re}\left[e^{-jkz}e^{j\omega t}\right]
=\cos(\omega t-kz)
$$

这对应沿 $+z$ 方向传播的波。

位函数方程也可写为

$$
\begin{cases}
\nabla^2\dot{\vec A}+k^2\dot{\vec A}=-\mu\dot{\vec J} \\
\\
\nabla^2\dot\varphi+k^2\dot\varphi=-\dfrac{\dot\rho}{\varepsilon}
\end{cases}
$$

洛伦兹规范变为

$$
\nabla\cdot\dot{\vec A}=-j\omega\mu\varepsilon\dot\varphi
$$

---

### 7-6-3 复介电常数与损耗角正切

在导电介质中，安培-麦克斯韦方程为

$$
\nabla\times\dot{\vec H}
=\dot{\vec J}_{\mathrm{introduced}}+\sigma\dot{\vec E}+j\omega\varepsilon\dot{\vec E}
$$

后两项分别是传导电流和位移电流。为了把它们合并成一个形式，可以定义复介电常数：

:::: definition
**复介电常数 Complex Permittivity**

$$
\varepsilon_c=\varepsilon-j\frac{\sigma}{\omega}
$$

于是

$$
\nabla\times\dot{\vec H}
=\dot{\vec J}_{\mathrm{introduced}}+j\omega\varepsilon_c\dot{\vec E}
$$
::::

导电介质中，传导电流与位移电流的大小比为

$$
\tan\delta_\sigma=\frac{\sigma}{\omega\varepsilon}
$$

这个量也可以看作导电损耗对应的损耗角正切。

| 介质类型 | 条件 | 说明 |
| --- | --- | --- |
| 良介质 / 弱导电介质 | $\dfrac{\sigma}{\omega\varepsilon}\ll1$ | 位移电流占主导 |
| 一般导电介质 | $\dfrac{\sigma}{\omega\varepsilon}\approx1$ | 传导电流与位移电流同量级 |
| 良导体 | $\dfrac{\sigma}{\omega\varepsilon}\gg1$ | 传导电流占主导 |

:::: tip
判断介质在某个频率下更接近导体还是介质，不能只看 $\sigma$，还要看 $\omega\varepsilon$。同一种材料在低频时可能导电损耗明显，在高频时位移电流可能变得不可忽略。
::::

:::: stem
已知电场复矢量为

$$
\dot{\vec E}(z)=\vec e_xjE_{xm}\cos(k_zz)
$$

求瞬时值 $\vec E(z,t)$。
::::

:::: solution
按照复矢量定义：

$$
\vec E(z,t)=\mathrm{Re}\left[\dot{\vec E}(z)e^{j\omega t}\right]
$$

代入得

$$
\vec E(z,t)
=\mathrm{Re}\left[\vec e_xjE_{xm}\cos(k_zz)e^{j\omega t}\right]
$$

因为 $j=e^{j\pi/2}$，所以乘以 $j$ 表示相位超前 $\pi/2$：

$$
\vec E(z,t)
=\vec e_xE_{xm}\cos(k_zz)\cos\left(\omega t+\frac{\pi}{2}\right)
$$

即

$$
\vec E(z,t)=-\vec e_xE_{xm}\cos(k_zz)\sin\omega t
$$
::::

## 总结 Summary

本章主要讨论时变场中电场与磁场的耦合关系。进入时变情形后，二者必须作为统一的电磁场处理。

| 内容 | 公式 | 物理意义 |
| --- | --- | --- |
| 法拉第定律 | $\nabla\times\vec E=-\dfrac{\partial\vec B}{\partial t}$ | 时变磁场产生涡旋电场 |
| 位移电流 | $\vec J_d=\dfrac{\partial\vec D}{\partial t}$ | 时变电场产生磁场 |
| 安培-麦克斯韦定律 | $\nabla\times\vec H=\vec J_f+\dfrac{\partial\vec D}{\partial t}$ | 传导电流与位移电流都是磁场的旋涡源 |
| 无源波动方程 | $\nabla^2\vec E-\mu\varepsilon\dfrac{\partial^2\vec E}{\partial t^2}=0$ | 电磁场以波的形式传播 |
| 位函数 | $\vec B=\nabla\times\vec A$，$\vec E=-\dfrac{\partial\vec A}{\partial t}-\nabla\varphi$ | 用势函数间接求解电磁场 |
| 时谐场 | $\dfrac{\partial}{\partial t}\Longleftrightarrow j\omega$ | 把微分问题转化为复数代数形式 |

麦克斯韦方程组为：

$$
\begin{cases}
\nabla\times\vec H=\vec J_f+\dfrac{\partial\vec D}{\partial t} \\
\\
\nabla\times\vec E=-\dfrac{\partial\vec B}{\partial t} \\
\\
\nabla\cdot\vec B=0 \\
\\
\nabla\cdot\vec D=\rho_f
\end{cases}
$$

