# 3 Static Electric Field Part I

**倘若真的有那么一瞬间，能够奋不顾身的话...**

![alt text](<EMFT Chapter 3 P I.attachments/1773799938745.JPG>)

> [!TIP]
> 本文覆盖第三章电势及电势之前的小节。


## 章节目录

- [章节目录](#章节目录)
- [3-1 矢量约定和静电分布](#3-1-矢量约定和静电分布)
  - [3-1-1 静电场矢量约定](#3-1-1-静电场矢量约定)
  - [3-1-2 四种电荷的存在形式](#3-1-2-四种电荷的存在形式)
- [3-2 自由空间静电场的基本公设 Fundamental Postulates](#3-2-自由空间静电场的基本公设-fundamental-postulates)
  - [3-2-1 电场强度与电通量 Electric Field Intensity \& Electric Flux](#3-2-1-电场强度与电通量-electric-field-intensity--electric-flux)
  - [3-2-2 两个基本公设 Fundamental Postulates](#3-2-2-两个基本公设-fundamental-postulates)
- [3-3 库仑定律 Coulomb’s Law](#3-3-库仑定律-coulombs-law)
  - [3-3-1 库仑定律的数学推导](#3-3-1-库仑定律的数学推导)
  - [3-3-2 电偶极子 Electric Dipole](#3-3-2-电偶极子-electric-dipole)
- [3-4 高斯定理的应用 Applications of Gauss’s Law](#3-4-高斯定理的应用-applications-of-gausss-law)
  - [3-4-1 均匀带电球体求解](#3-4-1-均匀带电球体求解)
  - [3-4-2 带电球壳求解](#3-4-2-带电球壳求解)
  - [3-4-3 无限大带电平板求解](#3-4-3-无限大带电平板求解)
- [3-5 电势 / 电位 Electric Potential](#3-5-电势--电位-electric-potential)
  - [3-5-1 电势与等势面 Electric Potential \& Equipotential Surfaces](#3-5-1-电势与等势面-electric-potential--equipotential-surfaces)
  - [3-5-2 电势的性质](#3-5-2-电势的性质)
  - [3-5-3 参考点与电势差 / 电压 Reference Point \& Voltage](#3-5-3-参考点与电势差--电压-reference-point--voltage)
  - [3-5-4 电偶极子的电势](#3-5-4-电偶极子的电势)



## 3-1 矢量约定和静电分布

### 3-1-1 静电场矢量约定

在静电场中，我们做如下矢量约定：


- 从坐标原点指向场源电荷的矢量： $\vec r  \ '$
- 从坐标原点指向场内一点的矢量： $\vec r$
- 从场源指向场内一点的矢量： $\vec R =  \vec r - \vec r \ '$
- 从场源指向场内一点的单位矢量： $\vec e_R$

使用哈密顿算子时，也需要区分微分的变量：

$$
R = | \vec r - \vec r \ '|
$$

$$
\begin{aligned}



\nabla (\frac{1}{R}) = - \frac{\vec e_R}{R^2} 
\text{（源点固定，对 } \vec r \text { 微分）} \\


\nabla  \ ' (\frac{1}{R}) = \frac{\vec e_R}{R^2} 
\text{（场点固定，对 } \vec r \ ' \text { 微分）}

\end{aligned}
$$

---

### 3-1-2 四种电荷的存在形式

#### 1. 体电荷及密度 Volume Charge (Density)


$$
\rho(\vec r) = \lim_{\Delta V \rightarrow 0} \frac{\Delta q (\vec r)}{\Delta V} = \frac{dq (\vec r)}{dV}

\quad \mathrm{(C/m^3)}

$$


$$
q = \iiint_{V} \rho(\vec r) \, dV
$$

#### 2. 面电荷及密度 Surface Charge (Density)

$$
\rho_s(\vec{r})=\lim_{\Delta S\to 0}\frac{\Delta q(\vec{r})}{\Delta S}=\frac{dq(\vec{r})}{dS} \quad \mathrm{(C/m^2)}
$$

$$

q=\iint_S \rho_s(\vec{r})\,dS

$$



#### 3. 线电荷及密度 Line Charge (Density)


$$
\rho_l(\vec{r})=\lim_{\Delta l\to 0}\frac{\Delta q(\vec{r})}{\Delta l}=\frac{dq(\vec{r})}{dl}
\quad
\mathrm{(C/m)}
$$

$$
q=\int_C \rho_l(\vec{r})\,dl
$$

#### 4. 点电荷 Point Charge

$$
\rho(\vec{r})=q\,\delta(\vec{r}-\vec{r}^{\,\prime})
$$

其中，单位点电荷满足：

$$
\iiint_V \delta(\vec{r}-\vec{r}^{\,\prime})\,dV=1
$$


## 3-2 自由空间静电场的基本公设 Fundamental Postulates

### 3-2-1 电场强度与电通量 Electric Field Intensity & Electric Flux

#### 1. 定义

**电场强度 Electric Field Intensity** 的定义为单位点电荷所受到的电场力：

$$
\vec E =\lim_{q \rightarrow 0} = \frac{\vec F}{q}

\quad

\mathrm{(V/m)}
$$

因此在该点也有：

$$
\vec {F} = q \vec E
$$

通过一个曲面的电场强度的通量被称为**电通量 Electric Flux**，记作 $\Psi$ ，即：

$$
\Psi = \oiint_S \vec E \cdot d \vec S
$$

#### 2. 电场线及其分布

电场强度是一个矢量，其构成的矢量线被称为电场线或电力线 Electric Line 。

给定电场线的一个线微元 $d\vec l$ ，则电场线满足：

$$
\vec E \times d \vec l = 0
$$

通常，电场线满足以下三种分布：

![alt text](<EMFT Chapter 3 P I.attachments/1773816952381.png>)


---

### 3-2-2 两个基本公设 Fundamental Postulates

对于静电场，我们给定如下两个公设：

#### 1. 旋度关系 Circulation Relation

$$
\boxed{
\nabla \times \vec E = 0
\quad \xLeftrightarrow{} \quad 
\oint_C \vec E \cdot d \vec l
}
$$

左侧为该表述的微分形式，右侧为积分形式（通过斯托克斯公式给出）。

这个假设保证了静电场无旋 Irrotational ，为一个保守场 Conservative Field ，电场力在静电场中做的功与路径无关。

#### 2. 散度关系 Divergence Equation

$$
\boxed{
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
\quad \xLeftrightarrow{} \quad
\oiint_S \vec{E} \cdot d\vec{S} = \frac{Q_{\text{enc}}}{\varepsilon_0}

}
$$

其中：

- $\rho$：体电荷密度
- $\varepsilon_0$：真空介电常数 Permittivity of Free Space

- $Q_{\text{enc}}$ 表示闭合曲面 $S$ 所包围的总电荷。

左侧为该表述的微分形式，右侧为积分形式（通过散度定理给出），也叫做**高斯定理 Gauss's Law**。

> [!NOTE]
> 
>$$\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$$
>
> 说明电荷是电场散度的源。
>
> - 正电荷是电场线的源头
> - 负电荷是电场线的终点
>
> 在无电荷区 $\rho = 0$ 中，才有
>
> $$\nabla \cdot \mathbf{E} = 0$$
>
> 此时电场才是无散场。



## 3-3 库仑定律 Coulomb’s Law

### 3-3-1 库仑定律的数学推导


设点电荷 $q$ 位于源点 $\vec r \  '$，场点为 $\vec r$。定义从源点指向场点的位移矢量

$$
\vec R = \vec r - \vec r \  ', \qquad R = |\vec R|, \qquad \vec e_R = \frac{\vec R}{R}
$$

由球对称性可知，电场只能沿径向分布，故有

$$
\vec E(\vec r) = E(R)\,\vec e_R
$$

取以源点 $\vec r \  '$ 为球心、半径为 $R$ 的闭合球面 $S_R$，由高斯定律

$$
\oiint_{S_R} \vec E \cdot d\vec S = \frac{q}{\varepsilon_0}
$$

在该球面上，$\vec E$ 的大小处处相同，且方向与外法向一致，因此

$$
d\vec S = \vec e_R\, dS
$$

于是

$$
\oiint_{S_R} \vec E \cdot d\vec S
=
\oiint_{S_R} E(R)\,\vec e_R \cdot \vec e_R\, dS
=
E(R)\oiint_{S_R} dS
=
E(R)\,4\pi R^2
$$

所以

$$
E(R)\,4\pi R^2 = \frac{q}{\varepsilon_0}
$$

从而得到点电荷在任意位置时的电场一般形式

$$
\vec E(\vec r)
=
\frac{q}{4\pi\varepsilon_0 R^2}\,\vec e_R
=
\frac{q}{4\pi\varepsilon_0}\frac{\vec R}{R^3}
=
\frac{q}{4\pi\varepsilon_0}\frac{\vec r-\vec r \  '}{|\vec r-\vec r \  '|^3}
$$

若在场点 $\vec r$ 处放置另一点电荷 $Q$，则其受力为

$$
\vec F = Q\vec E(\vec r)
$$

因此库仑定律的矢量形式为

$$
\boxed{
\vec F
=
\frac{qQ}{4\pi\varepsilon_0}\frac{\vec r-\vec r \  '}{|\vec r-\vec r \  '|^3}
}
$$


特别地，当源点在原点，即 $\vec r \  '=\vec 0$ 时，

$$
\boxed{
\vec E(\vec r)=\frac{q}{4\pi\varepsilon_0}\frac{\vec r}{r^3}
}
$$

> [!NOTE]
> 由叠加原理，若电荷连续分布，则将离散求和推广为积分：
>
> $$
> \vec E(\vec r)
> =
> \frac{1}{4\pi\varepsilon_0}
> \iiint_V
> \frac{\rho(\vec r \  ')(\vec r-\vec r \  ')}{|\vec r-\vec r \  '|^3}\, dV'
> $$
>
> 若为面电荷分布和线电荷分布，则分别为
>
> $$
> \vec E(\vec r)
> =
> \frac{1}{4\pi\varepsilon_0}
> \iint_S
> \frac{\rho_S(\vec r \  ')(\vec r-\vec r \  ')}{|\vec r-\vec r \  '|^3}\, dS'
> $$
>
> $$
> \vec E(\vec r)
> =
> \frac{1}{4\pi\varepsilon_0}
> \int_C
> \frac{\rho_l(\vec r \  ')(\vec r-\vec r \  ')}{|\vec r-\vec r \  '|^3}\, dl'
> $$

---

### 3-3-2 电偶极子 Electric Dipole

![alt text](<EMFT Chapter 3 P I.attachments/1773819215614.png>)


设电偶极子由两个点电荷组成：$+q$ 与 $-q$，二者间的位移矢量记为 $\vec l$，其方向规定为 **从负电荷指向正电荷**。于是电偶极矩定义为

$$
\vec p = q \vec l
$$

设场点位置矢量为 $\vec r$，从正电荷与负电荷分别指向场点的矢量记为 $\vec r_+$ 与 $\vec r_-$，其模分别为 $r_+$ 和 $r_-$。由叠加原理，电偶极子在场点处产生的电场精确写为

$$
\vec E(\vec r)
=
\frac{q}{4\pi\varepsilon_0}\frac{\vec r_+}{r_+^3}-
\frac{q}{4\pi\varepsilon_0}\frac{\vec r_-}{r_-^3}
$$

对应的电势为

$$
\varphi(\vec r)
=
\frac{q}{4\pi\varepsilon_0}
\left(
\frac{1}{r_+}-\frac{1}{r_-}
\right)
$$

当观察点距离远大于偶极子尺寸时，即

$$
r \gg l
$$

可采用远场近似。设 $\theta$ 为 $\vec r$ 与偶极矩方向 $\vec p$ 的夹角，则有

$$
r_+ \approx r-\frac{l}{2}\cos\theta,
\qquad
r_- \approx r+\frac{l}{2}\cos\theta
$$

从而

$$
\frac{1}{r_+}-\frac{1}{r_-}
\approx
\frac{l\cos\theta}{r^2}
$$

代入电势式，得远场电势

$$
\varphi(\vec r)
\approx
\frac{ql\cos\theta}{4\pi\varepsilon_0 r^2}
=
\frac{p\cos\theta}{4\pi\varepsilon_0 r^2}
$$

其中 $p=|\vec p|$。

再由

$$
\vec E = -\nabla \varphi
$$

并利用球坐标系中的梯度公式

$$
\nabla \varphi
=
\vec e_r \frac{\partial \varphi}{\partial r}
+
\vec e_\theta \frac{1}{r}\frac{\partial \varphi}{\partial \theta}
+
\vec e_\phi \frac{1}{r\sin\theta}\frac{\partial \varphi}{\partial \phi}
$$

且此处 $\varphi$ 与 $\phi$ 无关，所以 $E_\phi=0$。于是

$$
E_r
=
-\frac{\partial \varphi}{\partial r}
=
\frac{2p\cos\theta}{4\pi\varepsilon_0 r^3}
$$

$$
E_\theta
=
-\frac{1}{r}\frac{\partial \varphi}{\partial \theta}
=
\frac{p\sin\theta}{4\pi\varepsilon_0 r^3}
$$

因此电偶极子的远场电场为

$$
\boxed{
\vec E(\vec r)
=
\vec e_r \frac{2p\cos\theta}{4\pi\varepsilon_0 r^3}
+
\vec e_\theta \frac{p\sin\theta}{4\pi\varepsilon_0 r^3}
}
$$

也可写成

$$
\boxed{
\vec E(\vec r)
=
\frac{1}{4\pi\varepsilon_0 r^3}
\left(
2p\cos\theta\,\vec e_r
+
p\sin\theta\,\vec e_\theta
\right)
}
$$

由此可见，电偶极子远场电势按 $r^{-2}$ 衰减，而电场按 $r^{-3}$ 衰减；同时电场不仅与距离 $r$ 有关，也与极角 $\theta$ 有关。这里的 $\theta$ 是 **极角**，不是方位角。



## 3-4 高斯定理的应用 Applications of Gauss’s Law

### 3-4-1 均匀带电球体求解

![alt text](<EMFT Chapter 3 P I.attachments/1773820541930.png>)

均匀带电实心球半径为 $a$，体电荷密度为 $\rho_0$。由于电荷分布具有球对称性，电场必沿径向分布，因此可设

$$
\vec E(\vec r)=E(r)\,\vec e_r
$$

其中 $r=|\vec r|$，$\vec e_r$ 为径向单位向量。

取半径为 $r$ 的同心球面作为高斯面，由高斯定律

$$
\oiint_{S_r}\vec E\cdot d\vec S=\frac{Q_{\text{enc}}}{\varepsilon_0}
$$

又因为在高斯面上电场大小恒定、方向与外法向一致，所以

$$
\oiint_{S_r}\vec E\cdot d\vec S = E(r)\,4\pi r^2
$$

当 $r\ge a$ 时，高斯面包围整个带电球，故

$$
Q_{\text{enc}}=\rho_0\cdot \frac{4}{3}\pi a^3
\quad\Longrightarrow\quad
E(r)=\frac{\rho_0 a^3}{3\varepsilon_0 r^2}
$$

当 $r<a$ 时，高斯面只包围半径为 $r$ 的部分电荷，故

$$
Q_{\text{enc}}=\rho_0\cdot \frac{4}{3}\pi r^3
\quad\Longrightarrow\quad
E(r)=\frac{\rho_0 r}{3\varepsilon_0}
$$

因此，均匀带电实心球的电场为

$$
\vec E(\vec r)=
\begin{cases}
\dfrac{\rho_0 r}{3\varepsilon_0}\,\vec e_r, & r<a \\[6pt]
\dfrac{\rho_0 a^3}{3\varepsilon_0 r^2}\,\vec e_r, & r\ge a
\end{cases}
$$

可见，球内电场随 $r$ 线性增大，球外电场按 $r^{-2}$ 衰减，并且在 $r=a$ 处连续。




---

### 3-4-2 带电球壳求解

#### 1. 无厚度球壳

设球心在原点，场点位置矢量为 $\vec r$，其中 $r=|\vec r|$。由球对称性可知，电场只能沿径向分布，因此可设

$$
\vec E(\vec r)=E(r)\,\vec e_r
$$

取半径为 $r$ 的同心球面作为高斯面，则有

$$
\oiint_S \vec E\cdot d\vec S = E(r)\,4\pi r^2=\frac{Q_{\text{enc}}}{\varepsilon_0}
$$

对于**理想均匀带电球面**（半径为 $R$，总电荷为 $q$），当 $r<R$ 时高斯面内不包围电荷，故 $Q_{\text{enc}}=0$；当 $r>R$ 时包围全部电荷，故 $Q_{\text{enc}}=q$。因此

$$
\vec E(\vec r)=
\begin{cases}
\vec 0, & r<R \\[6pt]
\dfrac{q}{4\pi\varepsilon_0 r^2}\,\vec e_r
=\dfrac{q}{4\pi\varepsilon_0}\dfrac{\vec r}{r^3}, & r>R
\end{cases}
$$

这里在 $r=R$ 处电场法向分量发生跃变，这是因为“球面带电”本质上是**面电荷模型**。若表面电荷密度为 $\sigma$，则边界条件应写为

$$
E_n(R^+)-E_n(R^-)=\frac{\sigma}{\varepsilon_0}
$$


#### 2. 有厚度球壳

若考虑更真实的**均匀带电球壳**，其体电荷密度为 $\rho$，分布在 $R_1\le r\le R_2$，则包围电荷应按体积计算：
$r<R_1$ 时 $Q_{\text{enc}}=0$；
$R_1\le r\le R_2$ 时 $Q_{\text{enc}}=\rho \dfrac{4\pi}{3}(r^3-R_1^3)$；
$r\ge R_2$ 时 $Q_{\text{enc}}=\rho \dfrac{4\pi}{3}(R_2^3-R_1^3)$。
代入高斯定律得

$$
\vec E(\vec r)=
\begin{cases}
\vec 0, & r<R_1 \\[6pt]
\dfrac{\rho}{3\varepsilon_0}\left(r-\dfrac{R_1^3}{r^2}\right)\vec e_r, & R_1\le r\le R_2 \\[10pt]
\dfrac{\rho\left(R_2^3-R_1^3\right)}{3\varepsilon_0 r^2}\,\vec e_r, & r>R_2
\end{cases}
$$

因此，理想球面模型会导致表面处电场不连续，而有限厚度的体电荷模型给出的电场在边界处是连续的，更适合描述实际情形。


![alt text](<EMFT Chapter 3 P I.attachments/1773820753076.png>)





---

### 3-4-3 无限大带电平板求解

![alt text](<EMFT Chapter 3 P I.attachments/1773820815485.png>)

设无限大平面电荷面在真空中均匀带电，面电荷密度为 $\sigma$。由对称性可知，电场必与平面垂直，且在平面两侧距平面相同的位置处电场大小相同，因此可设电场写为沿法向的形式。

![alt text](<EMFT Chapter 3 P I.attachments/1773820925938.png>)


取一个穿过该平面的薄圆柱作为高斯面，两端底面积均为 $\Delta S$，圆柱侧面与电场平行，因此侧面通量为零；两个底面上的电场均与外法向同向，于是总通量为

$$
\oiint_S \vec E\cdot d\vec S = E\Delta S+E\Delta S=2E\Delta S
$$

高斯面所包围的电荷为

$$
Q_{\text{enc}}=\sigma \Delta S
$$

代入高斯定律

$$
2E\Delta S=\frac{\sigma \Delta S}{\varepsilon_0}
\qquad\Longrightarrow\qquad
E=\frac{\sigma}{2\varepsilon_0}
$$

因此，若取 $\vec e_n$ 为该平面的单位法向量，则电场可写为

$$
\vec E=
\begin{cases}
\dfrac{\sigma}{2\varepsilon_0}\,\vec e_n, & \text{平面一侧} \\[6pt]
-\dfrac{\sigma}{2\varepsilon_0}\,\vec e_n, & \text{平面另一侧}
\end{cases}
$$

当 $\sigma>0$ 时，电场从平面向两侧发散；当 $\sigma<0$ 时，电场指向平面。可见无限大均匀带电平面产生的电场大小与距离无关，并且法向分量在穿过带电面时满足跃变关系

$$
E_n^{+}-E_n^{-}=\frac{\sigma}{\varepsilon_0}
$$


![alt text](<EMFT Chapter 3 P I.attachments/1773820944400.png>)







---

## 3-5 电势 / 电位 Electric Potential

### 3-5-1 电势与等势面 Electric Potential & Equipotential Surfaces

#### 1. 推导与定义

我们已知静电场中午如下两个等式：

$$
\nabla \times ( \nabla \varphi) \equiv 0

\qquad \qquad

\nabla \times \vec E = 0
$$

这也就是说，我们可以将电场强度这个矢量表示为一个标量场的梯度，从而将矢量计算变换为更简单的标量计算。

根据这样的思想，我们通过如下关系定义**电势 Electric Potential**：

$$
\vec E = - \nabla \varphi
$$

有些时候，也将 $\varphi$ 称作电位。这两者本质是同一个东西。


> [!TIP]
> 由于梯度的定义，可以得到电场强度指向的方向即是电势下降最快的方向。


#### 2. 物理意义

该点电势 $\varphi$ 的物理意义是电场力将单位电荷从该点移动到无穷远所做的功 $W$ ，因此有

$$
\varphi = \frac{W}{q}
$$

其中 $q$ 为电荷的总带电量。


#### 3. 等势面 Equipotential Surfaces

电势场作为一个标量场，其等势面即为所有相等的电势所共同构成的一个面，方程为：

$$
\varphi (x,y,z) = C
$$

等势面有以下两条性质：

- 电场线处处垂直于等势面；
- 等势面的分布密度可以指示电场的强度。

![alt text](<EMFT Chapter 3 P I.attachments/1773822325870.png>)


---

### 3-5-2 电势的性质

#### 1. 电场强度与电势的关系

静电场中，电场强度 $\vec E$ 与电势 $\varphi$ 满足关系

$$
d\varphi=-\vec E\cdot d\vec l
$$

因此，已知电场时，可以通过线积分求两点间的电势差：

$$
\varphi(B)-\varphi(A)=-\int_A^B \vec E\cdot d\vec l
$$

反过来，若已知电势分布，则电场可由电势的负梯度得到：

$$
\vec E=-\nabla\varphi
$$

这说明电场方向总是指向电势降低最快的方向。


#### 2. 介质中的电势

![alt text](<EMFT Chapter 3 P I.attachments/1773822552412.png>)

在均匀介质中，静电场还满足高斯定律的微分形式

$$
\nabla\cdot\vec E=\frac{\rho}{\varepsilon}
$$

将

$$
\vec E=-\nabla\varphi
$$

代入上式，可得

$$
\nabla\cdot(-\nabla\varphi)=\frac{\rho}{\varepsilon}
\quad\Longrightarrow\quad
\nabla^2\varphi=-\frac{\rho}{\varepsilon}
$$

这就是**泊松方程**，适用于有电荷分布的区域。

如果区域内没有电荷，即

$$
\rho=0
$$

则泊松方程退化为

$$
\nabla^2\varphi=0
$$

这就是**拉普拉斯方程**，适用于无电荷区域。

因此，静电场问题常常先由电荷分布求电势，再由电势求电场，即

$$
\rho \;\longrightarrow\; \varphi \;\longrightarrow\; \vec E
$$

对于分区域介质，应在每个区域内分别写出对应的电势函数和方程：有电荷区满足泊松方程，无电荷区满足拉普拉斯方程，然后再结合边界条件求解整个空间中的电势与电场。

#### 3. 不同场源的电势

| 场源类型 | 电荷微元 | 电势表达式 $\varphi(\vec r)$ | 说明 |
|---|---|---|---|
| 点电荷 $q$ | $dq=q$ | $\frac{q}{4\pi \varepsilon R}+C$ | 其中 $R=\lvert \vec r-\vec r \  '\rvert$，$\vec r \  '$ 为点电荷位置 |
| 体电荷 $\rho(\vec r \  ')$ | $dq=\rho(\vec r \  ')\,dV'$ | $\iiint_V \frac{\rho(\vec r \  ')}{4\pi \varepsilon \lvert \vec r-\vec r \  '\rvert}\,dV'+C$ | 对整个带电体体积积分 |
| 面电荷 $\rho_s(\vec r \  ')$ | $dq=\rho_s(\vec r \  ')\,dS'$ | $\iint_S \frac{\rho_s(\vec r \  ')}{4\pi \varepsilon \lvert \vec r-\vec r \  '\rvert}\,dS'+C$ | 对整个带电面积分 |
| 线电荷 $\rho_l(\vec r \  ')$ | $dq=\rho_l(\vec r \  ')\,dl'$ | $\int_C \frac{\rho_l(\vec r \  ')}{4\pi \varepsilon \lvert \vec r-\vec r \  '\rvert}\,dl'+C$ | 对整个带电曲线积分 |


---

### 3-5-3 参考点与电势差 / 电压 Reference Point & Voltage

一个点的电势不是唯一的，可能会有一个常数的差值。

因此，确定一个点的电势总是需要依据一个**参考点 Reference Point**。

而两点间电势的差值被定义为**电势差 Potential Difference**，也叫做**电压 Voltage**；

电势差与参考点**无关**，一旦场确定，两点间的电势差也能被唯一确定。

通常根据以下几点原则来设定参考点：

- 使得电势表达式有意义
- 使得电势表达式及计算最简单
- 一个问题里只能选择一个参考点

![alt text](<EMFT Chapter 3 P I.attachments/1773823276905.png>)



---

### 3-5-4 电偶极子的电势

设电偶极子由两个点电荷 $+q$ 和 $-q$ 组成，二者间距为 $d$，偶极矩定义为

$$
\vec p = q\vec d
$$

其中 $\vec d$ 的方向规定为 **从负电荷指向正电荷**。取偶极子中心为原点，并令 $\vec p$ 沿 $z$ 轴方向。对场点 $P(r,\theta,\phi)$，其电势可由两个点电荷叠加得到：

$$
\varphi(\vec r)=\frac{q}{4\pi\varepsilon_0}\left(\frac{1}{r_1}-\frac{1}{r_2}\right)
$$

其中

$$
r_1=\sqrt{r^2+\left(\frac d2\right)^2-rd\cos\theta},
\qquad
r_2=\sqrt{r^2+\left(\frac d2\right)^2+rd\cos\theta}
$$

当观察点远离偶极子，即

$$
r\gg d
$$

时，可作近似

$$
r_1\approx r-\frac d2\cos\theta,
\qquad
r_2\approx r+\frac d2\cos\theta
$$

于是远场电势为

$$
\boxed{
\varphi(\vec r)\approx \frac{qd\cos\theta}{4\pi\varepsilon_0 r^2}
=\frac{p\cos\theta}{4\pi\varepsilon_0 r^2}
=\frac{\vec p\cdot \vec e_r}{4\pi\varepsilon_0 r^2}
=\frac{\vec p\cdot \vec r}{4\pi\varepsilon_0 r^3}
}
$$

再由

$$
\vec E=-\nabla \varphi
$$

并利用球坐标系梯度公式，可得电偶极子的远场电场

$$
\boxed{
\vec E(\vec r)
=
\frac{1}{4\pi\varepsilon_0 r^3}
\left(
2p\cos\theta\,\vec e_r
+
p\sin\theta\,\vec e_\theta
\right)
}
$$

即

$$
E_r=\frac{2p\cos\theta}{4\pi\varepsilon_0 r^3},
\qquad
E_\theta=\frac{p\sin\theta}{4\pi\varepsilon_0 r^3},
\qquad
E_\phi=0
$$

由等势面方程 $\varphi=C$，可得

$$
\boxed{
\frac{p\cos\theta}{4\pi\varepsilon_0 r^2}=C
\quad\Longrightarrow\quad
r^2=C'\cos\theta
}
$$

这就是电偶极子等势线在极坐标下的表达式。

电场线满足方向关系

$$
\frac{dr}{E_r}=\frac{r\,d\theta}{E_\theta}
$$

代入 $E_r$ 与 $E_\theta$ 后得

$$
\frac{dr}{2r\cos\theta}=\frac{d\theta}{\sin\theta}
$$

积分可得

$$
\boxed{
r=C_1\sin^2\theta
}
$$

这就是电偶极子电场线的方程。

由以上结果可见，电偶极子的远场电势按 $r^{-2}$ 衰减，电场按 $r^{-3}$ 衰减；同时电场和电势都与角度 $\theta$ 有关，这与点电荷场明显不同。






