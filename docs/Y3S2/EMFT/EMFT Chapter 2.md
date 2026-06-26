---
lastUpdated: 2026-06-10T18:09:22+08:00
---

# 2 Vector Analysis

> [!TIP]
> 本章节作为基础数学工具，偏向于知识清单而并非理解工具。
>
> 如果你是微积分II高手，其实不需要看这一章。

同是天涯沦落人，相逢何必曾相识。

![alt text](<EMFT Chapter 2.attachments/1773559063473.PNG>)


## 章节目录

- [章节目录](#章节目录)
- [2-1 向量代数](#2-1-向量代数)
  - [2-1-1 向量的表示](#2-1-1-向量的表示)
  - [2-1-2 向量的代数运算](#2-1-2-向量的代数运算)
- [2-2 正交坐标系](#2-2-正交坐标系)
  - [2-2-1 直角坐标系 Cartesian Coordinates](#2-2-1-直角坐标系-cartesian-coordinates)
  - [2-2-2 圆柱坐标系 Cylindrical Coodrdinates](#2-2-2-圆柱坐标系-cylindrical-coodrdinates)
  - [2-2-3 球面坐标系 Spherical Coordindates](#2-2-3-球面坐标系-spherical-coordindates)
  - [2-2-4 运算关系](#2-2-4-运算关系)
- [2-3 标量场的梯度 Gradient](#2-3-标量场的梯度-gradient)
  - [2-3-1 等值面 Level Suface](#2-3-1-等值面-level-suface)
  - [2-3-2 方向导数 Directional Derivative](#2-3-2-方向导数-directional-derivative)
  - [2-3-3 梯度](#2-3-3-梯度)
- [2-4 矢量场的通量 Flux 与散度 Divergence](#2-4-矢量场的通量-flux-与散度-divergence)
  - [2-4-1 矢量线 Vector Line](#2-4-1-矢量线-vector-line)
  - [2-4-2 通量 Flux](#2-4-2-通量-flux)
  - [2-4-3 散度 Divergence](#2-4-3-散度-divergence)
  - [2-4-4 散度定理 Divergence Theorem](#2-4-4-散度定理-divergence-theorem)
- [2-5 矢量场的环量 Circulation 与旋度 Curl](#2-5-矢量场的环量-circulation-与旋度-curl)
  - [2-5-1 环量](#2-5-1-环量)
  - [2-5-2 旋度 Curl](#2-5-2-旋度-curl)
  - [2-5-3 相关公式](#2-5-3-相关公式)
  - [2-5-4 斯托克斯公式 Stokes's Theorem](#2-5-4-斯托克斯公式-stokess-theorem)
- [2-6 无旋场与无散场 Irrotational field and solenoidal field](#2-6-无旋场与无散场-irrotational-field-and-solenoidal-field)
  - [2-6-1 向量场的源 Source](#2-6-1-向量场的源-source)
  - [2-6-2 按场源对向量场分类](#2-6-2-按场源对向量场分类)
- [2-7 拉普拉斯算子 Laplacian operation](#2-7-拉普拉斯算子-laplacian-operation)
  - [标量拉普拉斯算子](#标量拉普拉斯算子)
  - [2-7-1 不同坐标系下的表达式](#2-7-1-不同坐标系下的表达式)
- [2-8 亥姆霍兹定理 Helmholtz’s Theorem](#2-8-亥姆霍兹定理-helmholtzs-theorem)
  - [2-8-1 无界区域中的表述](#2-8-1-无界区域中的表述)
  - [2-8-2 有界区域中的表述](#2-8-2-有界区域中的表述)


## 2-1 向量代数

### 2-1-1 向量的表示

| 项目      | 说明                    | 公式                                                        |
| ------- | --------------------- | --------------------------------------------------------- |
| 向量的代数表示 | 向量可以表示为单位方向向量与其大小的乘积。 | $\vec{A} = \vec{e}_A A = \vec{e}_A \lvert \vec{A} \rvert$ |
| 向量的大小   | 向量的大小等于该向量的模。         | $A = \lvert \vec{A} \rvert$                               |
| 单位向量    | 单位向量等于原向量除以其大小。       | $\vec{e}_A = \dfrac{ \vec{A} }{A}$                        |
| 恒定向量    | 具有恒定大小和固定方向的向量。       |                                                           |

#### 直角坐标系 Cartesian Coordinates 的向量表示

![alt text](<EMFT Chapter 2.attachments/1773461970725.png>)

1. 坐标

$$
\vec{A}=\vec{e}_x A_x+\vec{e}_y A_y+\vec{e}_z A_z
$$

2. 坐标轴投影 Projection

$$
A_x=A\cos\alpha
$$

$$
A_y=A\cos\beta
$$

$$
A_z=A\cos\gamma
$$

3. 投影合成坐标向量 / 单位向量

$$
\vec{A}=A\left(\vec{e}_x\cos\alpha+\vec{e}_y\cos\beta+\vec{e}_z\cos\gamma\right)
$$

$$
\vec{e}_A=\vec{e}_x\cos\alpha+\vec{e}_y\cos\beta+\vec{e}_z\cos\gamma
$$

### 2-1-2 向量的代数运算

**1. 加法和减法**

$$
\vec{A} \pm \vec{B}
= \vec{e}_x (A_x \pm B_x)
+ \vec{e}_y (A_y \pm B_y)
+ \vec{e}_z (A_z \pm B_z)
$$

**交换律：**

$$
\vec{A} + \vec{B} = \vec{B} + \vec{A}
$$

**结合律：**

$$
\vec{A} + (\vec{B} + \vec{C}) = (\vec{A} + \vec{B}) + \vec{C}
$$

**2. 标量乘法**

$$
k\vec{A}
= \vec{e}_x kA_x
+ \vec{e}_y kA_y
+ \vec{e}_z kA_z
$$

**3. 点乘 Scalar Product / Dot Product**

$$
\vec{A} \cdot \vec{B}
= AB \cos \theta
= A_x B_x + A_y B_y + A_z B_z
$$

**交换律：**

$$
\vec{A} \cdot \vec{B} = \vec{B} \cdot \vec{A}
$$

$$
\vec{A} \perp \vec{B}
\;\Rightarrow\;
\vec{A} \cdot \vec{B} = 0
$$

$$
\vec{A} \parallel \vec{B}
\;\Rightarrow\;
\vec{A} \cdot \vec{B} = AB
$$

$$
\vec{e}_x \cdot \vec{e}_y
=
\vec{e}_y \cdot \vec{e}_z
=
\vec{e}_z \cdot \vec{e}_x
= 0
$$

$$
\vec{e}_x \cdot \vec{e}_x
=
\vec{e}_y \cdot \vec{e}_y
=
\vec{e}_z \cdot \vec{e}_z
= 1
$$

**4. 叉乘 Vector Product / Cross Product**

$$
\vec{A} \times \vec{B} = \vec{e}_n AB \sin \theta
$$

**分量形式：**

$$
\vec{A} \times \vec{B}
=
\vec{e}_x (A_y B_z - A_z B_y)
+
\vec{e}_y (A_z B_x - A_x B_z)
+
\vec{e}_z (A_x B_y - A_y B_x)
$$

**行列式形式：**

$$
\vec{A} \times \vec{B}
=
\begin{vmatrix}
\vec{e}_x & \vec{e}_y & \vec{e}_z \\
A_x & A_y & A_z \\
B_x & B_y & B_z
\end{vmatrix}
$$

$$
\vec{A} \times \vec{B} = -\,\vec{B} \times \vec{A}
$$

$$
\text{If } \vec{A} \parallel \vec{B}, \text{ then } \left| \vec{A} \times \vec{B} \right| = 0
$$

**5. 三重运算**

**分配律：**

$$
(\vec{A} + \vec{B}) \cdot \vec{C}
=
\vec{A} \cdot \vec{C}
+
\vec{B} \cdot \vec{C}
$$

**分配律：**

$$
(\vec{A} + \vec{B}) \times \vec{C}
=
\vec{A} \times \vec{C}
+
\vec{B} \times \vec{C}
$$

**标量三重积：**

$$
\vec{A} \cdot (\vec{B} \times \vec{C})
=
\vec{B} \cdot (\vec{C} \times \vec{A})
=
\vec{C} \cdot (\vec{A} \times \vec{B})
$$

**向量三重积：**

$$
\vec{A} \times (\vec{B} \times \vec{C})
=
(\vec{A} \cdot \vec{C}) \vec{B}-
(\vec{A} \cdot \vec{B}) \vec{C}
$$



## 2-2 正交坐标系

### 2-2-1 直角坐标系 Cartesian Coordinates

![alt text](<EMFT Chapter 2.attachments/1773462820339.png>)

![alt text](<EMFT Chapter 2.attachments/1773462851176.png>)

| 项目            | 表达式                                               |
| --------------- | ---------------------------------------------------- |
| Variable        | $x, y, z$                                            |
| Unit vector     | $\vec{e}_x,\ \vec{e}_y,\ \vec{e}_z$                  |
| Position        | $\vec{r}=\vec{e}_x x+\vec{e}_y y+\vec{e}_z z$        |
| Line element    | $d\vec{l}=\vec{e}_x\,dx+\vec{e}_y\,dy+\vec{e}_z\,dz$ |
| Surface element | $d\vec{S}_x=\vec{e}_x\,dy\,dz$                       |
| Surface element | $d\vec{S}_y=\vec{e}_y\,dx\,dz$                       |
| Surface element | $d\vec{S}_z=\vec{e}_z\,dx\,dy$                       |
| Volume element  | $dV=dx\,dy\,dz$                                      |

### 2-2-2 圆柱坐标系 Cylindrical Coodrdinates

![alt text](<EMFT Chapter 2.attachments/1773463148718.png>)

![alt text](<EMFT Chapter 2.attachments/1773463164081.png>)

| 项目            | 表达式                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Variable        | $\rho, \phi, z$                                                        |
| Unit vector     | $\vec{e}_\rho,\ \vec{e}_\phi,\ \vec{e}_z$                              |
| Position        | $\vec{r}=\vec{e}_\rho \rho+\vec{e}_z z$                                |
| Line element    | $d\vec{l}=\vec{e}_\rho\,d\rho+\vec{e}_\phi\,\rho\,d\phi+\vec{e}_z\,dz$ |
| Surface element | $d\vec{S}_\rho=\vec{e}_\rho\,\rho\,d\phi\,dz$                          |
| Surface element | $d\vec{S}_\phi=\vec{e}_\phi\,d\rho\,dz$                                |
| Surface element | $d\vec{S}_z=\vec{e}_z\,\rho\,d\rho\,d\phi$                             |
| Volume element  | $dV=\rho\,d\rho\,d\phi\,dz$                                            |

### 2-2-3 球面坐标系 Spherical Coordindates

![alt text](<EMFT Chapter 2.attachments/1773463260006.png>)

![alt text](<EMFT Chapter 2.attachments/1773463273975.png>)

![alt text](<EMFT Chapter 2.attachments/1773463287273.png>)

| 项目            | 表达式                                                                               |
| --------------- | ------------------------------------------------------------------------------------ |
| Variable        | $r, \theta, \phi$                                                                    |
| Unit vector     | $\vec{e}_r,\ \vec{e}_\theta,\ \vec{e}_\phi$                                          |
| Position        | $\vec{r}=\vec{e}_r\,r$                                                               |
| Line element    | $d\vec{l}=\vec{e}_r\,dr+\vec{e}_\theta\,r\,d\theta+\vec{e}_\phi\,r\sin\theta\,d\phi$ |
| Surface element | $d\vec{S}_r=\vec{e}_r\,r^2\sin\theta\,d\theta\,d\phi$                                |
| Surface element | $d\vec{S}_\theta=\vec{e}_\theta\,r\sin\theta\,dr\,d\phi$                             |
| Surface element | $d\vec{S}_\phi=\vec{e}_\phi\,r\,dr\,d\theta$                                         |
| Volume element  | $dV=r^2\sin\theta\,dr\,d\theta\,d\phi$                                               |

### 2-2-4 运算关系

| 行基矢 / 列基矢 | $\vec{e}_x$ | $\vec{e}_y$ | $\vec{e}_z$ |
| --------------- | ----------: | ----------: | ----------: |
| $\vec{e}_\rho$  |  $\cos\phi$ |  $\sin\phi$ |         $0$ |
| $\vec{e}_\phi$  | $-\sin\phi$ |  $\cos\phi$ |         $0$ |
| $\vec{e}_z$     |         $0$ |         $0$ |         $1$ |

| 行基矢 / 列基矢  | $\vec{e}_\rho$ | $\vec{e}_\phi$ |   $\vec{e}_z$ |
| ---------------- | -------------: | -------------: | ------------: |
| $\vec{e}_r$      |   $\sin\theta$ |            $0$ |  $\cos\theta$ |
| $\vec{e}_\theta$ |   $\cos\theta$ |            $0$ | $-\sin\theta$ |
| $\vec{e}_\phi$   |            $0$ |            $1$ |           $0$ |

| 行基矢 / 列基矢  |          $\vec{e}_x$ |          $\vec{e}_y$ |   $\vec{e}_z$ |
| ---------------- | -------------------: | -------------------: | ------------: |
| $\vec{e}_r$      | $\sin\theta\cos\phi$ | $\sin\theta\sin\phi$ |  $\cos\theta$ |
| $\vec{e}_\theta$ | $\cos\theta\cos\phi$ | $\cos\theta\sin\phi$ | $-\sin\theta$ |
| $\vec{e}_\phi$   |          $-\sin\phi$ |           $\cos\phi$ |           $0$ |

> [!TIP]
> 这类表格的读取方法是：
>
> “每一行”表示左侧的基矢，如何用表头对应的那一组基矢展开。
>
> 例如在第一个表中，
>
> $$
> \vec{e}_\rho=\cos\phi\,\vec{e}_x+\sin\phi\,\vec{e}_y
> $$
>
> $$
> \vec{e}_\phi=-\sin\phi\,\vec{e}_x+\cos\phi\,\vec{e}_y
> $$
>
> $$
> \vec{e}_z=\vec{e}_z
> $$
>
> 也就是说，表中的每一行本质上都是一个“基矢展开式”。

> [!TIP]
> 如果要做“向量分量转换”，就把表里的系数直接写成变换矩阵。
>
> 例如 Cartesian $\to$ Cylindrical：
>
> $$
> \begin{bmatrix}
> A_\rho\\
> A_\phi\\
> A_z
> \end{bmatrix}
> =
> \begin{bmatrix}
> \cos\phi & \sin\phi & 0\\
> -\sin\phi & \cos\phi & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> \begin{bmatrix}
> A_x\\
> A_y\\
> A_z
> \end{bmatrix}
> $$
>
> 即
>
> $$
> A_\rho=A_x\cos\phi+A_y\sin\phi
> $$
>
> $$
> A_\phi=-A_x\sin\phi+A_y\cos\phi
> $$
>
> $$
> A_z=A_z
> $$

> [!TIP]
> 同理，Cylindrical $\to$ Spherical 可由第二个表直接写成：
>
> $$
> \begin{bmatrix}
> A_r\\
> A_\theta\\
> A_\phi
> \end{bmatrix}
> =
> \begin{bmatrix}
> \sin\theta & 0 & \cos\theta\\
> \cos\theta & 0 & -\sin\theta\\
> 0 & 1 & 0
> \end{bmatrix}
> \begin{bmatrix}
> A_\rho\\
> A_\phi\\
> A_z
> \end{bmatrix}
> $$
>
> 即
>
> $$
> A_r=A_\rho\sin\theta+A_z\cos\theta
> $$
>
> $$
> A_\theta=A_\rho\cos\theta-A_z\sin\theta
> $$
>
> $$
> A_\phi=A_\phi
> $$

> [!TIP]
> 注意：这些 relationship 表是“基矢/向量分量变换表”，主要用于向量展开和分量坐标变换。
>
> 它们不是点坐标变量之间的直接变换公式。
>
> 例如点坐标的 Cartesian $\leftrightarrow$ Cylindrical、Spherical 转换，通常还是要单独使用
>
> $$
> \rho=\sqrt{x^2+y^2},\qquad
> \phi=\operatorname{atan2}(y,x),\qquad
> r=\sqrt{x^2+y^2+z^2},\qquad
> \theta=\arccos\left(\frac{z}{r}\right)
> $$
>
> 这些公式。

## 2-3 标量场的梯度 Gradient

**场：** 一个物理量关于空间的函数。

我们通常将场分为

- 标量场 $U(x, y, z)$ ，
- 矢量场 $\vec{A}(x, y, z)$ ；

或:

- 恒定场 $U(x, y, z)$ ，
- 时变场 $U(x, y, z, t)$ 。

### 2-3-1 等值面 Level Suface

#### 定义

$$U(x, y, z) = C$$

- 当常数 $C$ 取一系列不同值时，会得到一族不同的等值面，称为**等值面族 Level Surface Family**；
- 这些等值面充满整个标量场所在空间；
- 这些等值面彼此不能相交。

> [!NOTE]
> 在二维情况下，对应的是**等值线**（level curve / contour line）。

### 2-3-2 方向导数 Directional Derivative

![alt text](<EMFT Chapter 2.attachments/1773464484388.png>)

#### 定义

设点 $M_0$ 处沿某一单位方向 $\vec e_l$ 求方向导数，则

$$
\left.\frac{\partial u}{\partial l}\right|_{M_0}
=
\lim_{\Delta l\to 0}\frac{\Delta u}{\Delta l}
=
\frac{\partial u}{\partial x}\cos\alpha
+
\frac{\partial u}{\partial y}\cos\beta
+
\frac{\partial u}{\partial z}\cos\gamma
$$

其中：

- $\cos\alpha,\cos\beta,\cos\gamma$ 是方向 $\vec e_l$ 对 $x,y,z$ 轴的**方向余弦**；
- $\vec e_l$ 是所取方向上的单位向量。

方向导数描述标量场沿某一指定方向的空间变化率。

**符号意义：**

- 若

  $$
  \frac{\partial u}{\partial l}>0
  $$

  则 $u(M)$ 沿该方向增大；

- 若

  $$
  \frac{\partial u}{\partial l}<0
  $$

  则 $u(M)$ 沿该方向减小；

- 若
  $$
  \frac{\partial u}{\partial l}=0
  $$
  则 $u(M)$ 沿该方向不变。

**特点：**

- 方向导数既与点 $M_0$ 的位置有关，也与所选方向有关。

### 2-3-3 梯度

![alt text](<EMFT Chapter 2.attachments/1773464500922.png>)

#### 定义

梯度记作

$$
\nabla u
\quad \text{或} \quad
\mathrm{grad}\,u
$$

其定义可写为

$$
\nabla u
=
\vec e_l
\left.\frac{\partial u}{\partial l}\right|_{\max}
$$

其中 $\vec e_l$ 表示使方向导数取得最大值的方向单位向量。

#### 性质

- 梯度是一个**向量**；
- 梯度描述标量场在某点处的**最大空间变化率**及其方向；
- 梯度方向与该点处的等值面正交；
- 某方向上的方向导数，是梯度在该方向上的投影。

更准确地说，

$$
\frac{\partial u}{\partial l}
=
\nabla u\cdot \vec e_l
=
|\nabla u|\cos\theta
$$

其中 $\theta$ 为 $\nabla u$ 与方向 $\vec e_l$ 的夹角。

因此，

$$
\left.\frac{\partial u}{\partial l}\right|_{\max}
=
|\nabla u|
$$

并且最大值出现于

$$
\vec e_l \parallel \nabla u
$$

时。

#### 表达式

| 坐标系                  | 梯度表达式                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 笛卡尔坐标（Cartesian） | $\displaystyle \nabla u=\vec e_x\frac{\partial u}{\partial x}+\vec e_y\frac{\partial u}{\partial y}+\vec e_z\frac{\partial u}{\partial z}$                                                 |
| 柱坐标（Cylindrical）   | $\displaystyle \nabla u=\vec e_\rho\frac{\partial u}{\partial \rho}+\vec e_\phi\frac{1}{\rho}\frac{\partial u}{\partial \phi}+\vec e_z\frac{\partial u}{\partial z}$                       |
| 球坐标（Spherical）     | $\displaystyle \nabla u=\vec e_r\frac{\partial u}{\partial r}+\vec e_\theta\frac{1}{r}\frac{\partial u}{\partial \theta}+\vec e_\phi\frac{1}{r\sin\theta}\frac{\partial u}{\partial \phi}$ |

> [!NOTE]
> 方向导数可以通过**梯度**与**方向单位向量**的点积来计算。
> 设标量场为
>
> $$
> u=u(x,y,z)
> $$
>
> 在点 $P$ 处，沿方向 $\vec l$ 的方向导数为
>
> $$
> D_{\vec e_l}u(P)=\nabla u(P)\cdot \vec e_l
> $$
>
> 其中：
>
> - $\nabla u(P)$ 表示点 $P$ 处的梯度；
> - $\vec e_l$ 表示所给方向上的**单位向量**。

#### 基本公式

其中 $C$ 为常数，则有：

$$
\nabla C = 0
$$

$$
\nabla(Cu)=C\nabla u
$$

$$
\nabla(u\pm v)=\nabla u \pm \nabla v
$$

$$
\nabla(uv)=u\nabla v+v\nabla u
$$

$$
\nabla f(u)=f'(u)\nabla u
$$

> [!TIP]
> 其实当作求导来记就行了，本来也就是求偏导嘛。

#### 梯度与最大方向导数的关系

设标量场写作 $\varphi$，在点 $P$ 处有

$$
\left.\frac{\partial \varphi}{\partial l}\right|_P
=
\nabla\varphi(P)\cdot \vec e_l
$$

因此任意方向上的方向导数满足

$$
-|\nabla\varphi|_P
\le
\left.\frac{\partial \varphi}{\partial l}\right|_P
\le
|\nabla\varphi|_P
$$

所以其最大值为

$$
\left.\frac{\partial \varphi}{\partial l}\right|_{\max,P}
=
|\nabla\varphi|_P
$$

特别地，

$$
\left.\frac{\partial \varphi}{\partial l}\right|_P
\le
|\nabla\varphi|_P
$$

当且仅当所取方向与梯度方向一致时取等号。

> [!TIP]
> 为避免与柱坐标/球坐标中的角变量 $\phi$ 混淆，这里把标量场记作 $\varphi$。

## 2-4 矢量场的通量 Flux 与散度 Divergence

### 2-4-1 矢量线 Vector Line

#### 定义

用来在视觉上描述矢量场的分布

**方程：**

$$
\frac{\mathrm{d}x}{F_x(x,y,z)} = \frac{\mathrm{d}y}{F_y(x,y,z)} = \frac{\mathrm{d}z}{F_z(x,y,z)}
$$

### 2-4-2 通量 Flux

#### 定义

用于衡量面积上矢量场的大小。

设向量场为 $\vec{F}(x,y,z)$，曲面为 $S$，则穿过曲面 $S$ 的通量定义为

$$
\psi=\int d\psi=\iint_S \vec{F}\cdot d\vec{S}
=\iint_S \vec{F}\cdot \vec{e}_n\, dS
$$

其中：

$$
d\vec{S}=\vec{e}_n\, dS
$$

表示**面元向量**；

$$
\vec{e}_n
$$

表示该面元的**法向单位向量**；

$$
d\psi=\vec{F}\cdot \vec{e}_n\, dS
$$

表示穿过面元 $dS$ 的**微元通量**。

如果曲面 $S$ 是**封闭曲面**，并规定外法线方向为正方向，则向量场穿过该封闭曲面的通量为

$$
\psi=\oiint_S \vec{F}\cdot d\vec{S}
=\oiint_S \vec{F}\cdot \vec{e}_n\, dS
$$

### 2-4-3 散度 Divergence

**定义：** 当包围某点的体积趋于零时，单位体积上的**净向外通量**的极限，称为该点处向量场的散度。

因此，向量场 $\vec{F}(x,y,z)$ 的散度定义为

$$
\operatorname{div}\vec{F}(x,y,z)
=
\lim_{\Delta V\to 0}
\frac{\oiint_S \vec{F}(x,y,z)\cdot d\vec{S}}{\Delta V}
$$

根据散度的定义，在笛卡尔坐标系中，若

$$
\vec{F}=F_x\vec{e}_x+F_y\vec{e}_y+F_z\vec{e}_z
$$

则有

$$
\operatorname{div}\vec{F}
=
\lim_{\Delta V\to 0}
\frac{\oiint_S \vec{F}\cdot d\vec{S}}{\Delta V}
=
\frac{\partial F_x}{\partial x}
+
\frac{\partial F_y}{\partial y}
+
\frac{\partial F_z}{\partial z}
$$

并且可写成算子形式

> [!IMPORTANT]
>
> $$
> \operatorname{div}\vec{F}=\nabla\cdot\vec{F}
> $$

### 2-4-4 散度定理 Divergence Theorem


$$
\oiint_S \vec{F}\cdot d\vec{S}
=
\iiint_V \nabla\cdot\vec{F}\, dV
$$

> [!TIP]
> 这个公式就是**高斯散度定理**。  
> 它表示：一个封闭曲面 $S$ 上的**总向外通量**，等于该曲面所包围体积 $V$ 内部**散度的体积分**。  
> 直观上看，散度描述的是向量场在每个点“向外发散”的强弱，而把整个体积内这些“发散量”全部加起来，就得到穿出边界曲面的总通量。

## 2-5 矢量场的环量 Circulation 与旋度 Curl

### 2-5-1 环量

#### 定义

向量场沿一条闭合路径的环量，定义为该向量沿该闭合路径的标量线积分。

$$
\Gamma
=
\oint_C \vec{F}(x,y,z)\cdot d\vec{l}
$$

其中：

- $d\vec{l}$ 是沿曲线切线方向的微小线元向量；
- 若环量不为零，则在由 $C$ 围成的曲面上存在某种**旋源**（或局部旋转趋势）。


2. 向量场的旋度（Curl of a Vector Field）

记作

$$
\operatorname{rot}\vec{F}
\qquad \text{或} \qquad
\nabla\times \vec{F}
$$

### 2-5-2 旋度 Curl

#### 环量面密度

![alt text](<EMFT Chapter 2.attachments/1773467367498.png>)

过点 $M$，取法向单位向量为 $\vec{e}_n$ 的微小曲面 $\Delta S$，其边界为闭合曲线 $C$，则沿 $\vec{e}_n$ 方向的环量面密度定义为

$$
\operatorname{rot}_n \vec{F}
=
\lim_{\Delta S\to 0}
\frac{1}{\Delta S}
\oint_C \vec{F}\cdot d\vec{l}
$$

它称为向量场在点 $M$ 处沿 $\vec{e}_n$ 方向的**环量面密度**。

**特点：**

- 其数值与所取方向有关；
- 不同方向上的环量面密度一般不同。



---

#### 旋度 Curl

向量场的旋度是一个向量，其方向由右手定则确定，其大小等于该点处**最大环量面密度**：

$$
\operatorname{rot}\vec{F}
=
\nabla\times \vec{F}
$$

在笛卡尔坐标系中，若

$$
\vec{F}
=
F_x\vec{e}_x+F_y\vec{e}_y+F_z\vec{e}_z
$$

则

$$
\operatorname{rot}\vec{F}
=
\vec{e}_x
\left(
\frac{\partial F_z}{\partial y}-
\frac{\partial F_y}{\partial z}
\right)
+
\vec{e}_y
\left(
\frac{\partial F_x}{\partial z}-
\frac{\partial F_z}{\partial x}
\right)
+
\vec{e}_z
\left(
\frac{\partial F_y}{\partial x}-
\frac{\partial F_x}{\partial y}
\right)
$$

也可写成行列式形式：

$$
\operatorname{rot}\vec{F}
=
\begin{vmatrix}
\vec{e}_x & \vec{e}_y & \vec{e}_z \\
\dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z} \\
F_x & F_y & F_z
\end{vmatrix}
$$

因此

> [!IMPORTANT]
> $$
>\operatorname{rot}\vec{F}
>=
>\nabla\times \vec{F}
>$$

### 2-5-3 相关公式

#### 1. 任意标量场的梯度场无旋

$$
\nabla\times(\nabla u)\equiv 0
$$

#### 2. 任意向量场的旋度场无散

$$
\nabla\cdot(\nabla\times \vec F)\equiv 0
$$

> [!NOTE]
> 这两个公式是向量分析中的**恒等式**，描述了 gradient、curl、divergence 之间的基本关系。它们的成立通常要求相关函数在所讨论区域内具有足够光滑性，一般取二阶连续可导即可。
>
> **1.**
>
> $$
> \nabla\times(\nabla u)\equiv 0
> $$
>
> 这表示：**任意标量场的梯度场，其旋度恒为零**。  
> 也就是说，若一个向量场本身由某个标量势函数 $u$ 的梯度生成，那么这个场没有局部旋转趋势，是一个**无旋场**（irrotational field）。
>
> 它的意义在于：
>
> - 梯度场一定无旋；
> - 若已知一个场可写成 $\vec F=\nabla u$，则必有
>
> $$
> \nabla\times \vec F=0
> $$
>
> - 这是“保守场 / 势场”分析中的基本判据之一。
>
> **2.**
>
> $$
> \nabla\cdot(\nabla\times \vec F)\equiv 0
> $$
>
> 这表示：**任意向量场的旋度场，其散度恒为零**。  
> 也就是说，若一个向量场是由另一个向量场取旋度得到的，那么这个场没有净源汇，是一个**无散场**（solenoidal field）。
>
> 它的意义在于：
>
> - 旋度场一定无散；
> - 若已知一个场可写成 $\vec G=\nabla\times \vec F$，则必有
>
> $$
> \nabla\cdot \vec G=0
> $$
>
> - 这是分析“环流场”“无源汇场”时的重要结构性质。
>
> **需要注意：**
>
> 这两个公式说明的是
>
> - “梯度场 $\Rightarrow$ 无旋”；
> - “旋度场 $\Rightarrow$ 无散”。
>
> 但反过来要推出
>
> - “无旋场一定是梯度场”；
> - “无散场一定是某个旋度场”；
>
> 还需要对定义区域附加额外条件，例如区域连通性、单连通性等，不能仅凭这两个恒等式直接反推。

### 2-5-4 斯托克斯公式 Stokes's Theorem


$$
\oint_C \vec{F}\cdot d\vec{l}
=
\iint_S (\nabla\times \vec{F})\cdot d\vec{S}
$$


> [!TIP]
> 斯托克斯公式说明：**曲面边界上的总环量，等于曲面内部所有局部旋转的总和**。直观上，可以把整个曲面分成很多小面片，相邻面片公共边上的环流方向相反，会彼此抵消，最后只剩下最外圈边界上的环量。因此，边界上的整体“绕圈效果”，本质上就是曲面内部旋度累积后的结果。


## 2-6 无旋场与无散场 Irrotational field and solenoidal field

### 2-6-1 向量场的源 Source

向量场的源可分为两类：

- **散度源（divergence source）**
- **旋度源 / 涡旋源（vortex source）**


### 2-6-2 按场源对向量场分类

#### 无旋场 Irrotational field

无旋场是指：向量场只有散度源，没有旋度源，即

$$
\nabla\times \vec{F}\equiv 0
$$

其特征为：

$$
\oint_C \vec{F}\cdot d\vec{l}=0
$$

这说明：

- 线积分与路径无关；
- 该场是**保守场 Conservation Field**。

无旋场可表示为某个标量场的梯度（常取负梯度）：

$$
\vec{F}=-\nabla u
$$

于是有

$$
\nabla\times \vec{F}
=
-\nabla\times(\nabla u)
\equiv 0
$$

由斯托克斯公式可知：

$$
\iint_S [\nabla\times(\nabla u)]\cdot d\vec{S}
=
\oint_C (\nabla u)\cdot d\vec{l}
=
0
$$

**例：静电场**

$$
\nabla\times \vec{E}\equiv 0
\quad\Rightarrow\quad
\vec{E}=-\nabla \varphi
$$

---

#### 无散场 Solenoidal field

无散场是指：向量场只有旋度源，没有散度源，即

$$
\nabla\cdot \vec{F}\equiv 0
$$

其特征为：

$$
\oiint_S \vec{F}\cdot d\vec{S}=0
$$

即任意封闭曲面的总通量为零。

无散场可以表示为另一个向量场的旋度：

$$
\vec{F}=\nabla\times \vec{A}
$$

于是有

$$
\nabla\cdot \vec{F}
=
\nabla\cdot(\nabla\times \vec{A})
\equiv 0
$$

由散度定理可知：

$$
\iiint_V \left[\nabla\cdot(\nabla\times \vec{A})\right]\,dV
=
\oiint_S (\nabla\times \vec{A})\cdot d\vec{S}
=
0
$$

**例：静磁场**

$$
\nabla\cdot \vec{B}=0
\quad\Rightarrow\quad
\vec{B}=\nabla\times \vec{A}
$$

---

#### 既无旋又无散的场

若在某一区域内

$$
\nabla\times \vec{F}=0
\quad\Rightarrow\quad
\vec{F}=-\nabla u
$$

同时又满足

$$
\nabla\cdot \vec{F}=0
$$

则有

$$
\nabla\cdot(-\nabla u)=0
$$

即

$$
\nabla^2 u=0
$$

这说明势函数 $u$ 满足**拉普拉斯方程**。

> [!NOTE]
> 这种情况通常表示：讨论区域内部没有源，源位于讨论区域之外。

---

#### 一般向量场：既非无旋，也非无散

一般向量场既不一定无旋，也不一定无散。它可以分解为两部分：

- 无旋部分；
- 无散部分。

即

$$
\vec{F}(\vec{r})
=
\vec{F}_I(\vec{r})+\vec{F}_C(\vec{r})
=
-\nabla u(\vec{r})+\nabla\times \vec{A}(\vec{r})
$$

其中：

- $-\nabla u(\vec{r})$ 为**无旋部分**；
- $\nabla\times \vec{A}(\vec{r})$ 为**无散部分**。



## 2-7 拉普拉斯算子 Laplacian operation

### 标量拉普拉斯算子

标量场 $u$ 的拉普拉斯算子定义为

$$
\nabla^2 u
$$

并且

$$
\nabla\cdot(\nabla u)=\nabla^2 u
$$


### 2-7-1 不同坐标系下的表达式

#### 笛卡尔坐标 Cartesian coordinates

$$
\nabla^2 u
=
\frac{\partial^2 u}{\partial x^2}
+
\frac{\partial^2 u}{\partial y^2}
+
\frac{\partial^2 u}{\partial z^2}
$$

#### 柱坐标 Cylindrical coordinates

$$
\nabla^2 u
=
\frac{1}{\rho}\frac{\partial}{\partial \rho}
\left(
\rho\frac{\partial u}{\partial \rho}
\right)
+
\frac{1}{\rho^2}\frac{\partial^2 u}{\partial \phi^2}
+
\frac{\partial^2 u}{\partial z^2}
$$

#### 球坐标（Spherical coordinates）

$$
\nabla^2 u
=
\frac{1}{r^2}\frac{\partial}{\partial r}
\left(
r^2\frac{\partial u}{\partial r}
\right)
+
\frac{1}{r^2\sin\theta}\frac{\partial}{\partial \theta}
\left(
\sin\theta\frac{\partial u}{\partial \theta}
\right)
+
\frac{1}{r^2\sin^2\theta}\frac{\partial^2 u}{\partial \phi^2}
$$

> [!NOTE]
> **拉普拉斯算子** $\nabla^2$ 可以看作是“对一个场的二阶空间变化程度”的度量。  
> 对标量场 $u$，它定义为
>
> $$
> \nabla^2 u=\nabla\cdot(\nabla u)
> $$
>
> 在笛卡尔坐标中就是
>
> $$
> \nabla^2 u=\frac{\partial^2 u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2}+\frac{\partial^2 u}{\partial z^2}
> $$
>
> 它的意义是描述某一点的函数值，相对于周围邻域是“鼓起”“凹下”还是“平衡”。因此它常用来研究：
>
> - **静电场、引力场、稳态温度场**中的势函数，得到拉普拉斯方程或泊松方程；
> - **扩散、热传导、波动、电磁场**等偏微分方程；
> - 判断某个区域内是否存在源、汇，或者场是否满足调和条件。
>
> **和 $\nabla$（nabla 算子）的区别：**
>
> - $\nabla$ 本身只是一个**微分算子符号**，写作
>
> $$
> \nabla=\vec e_x\frac{\partial}{\partial x}+\vec e_y\frac{\partial}{\partial y}+\vec e_z\frac{\partial}{\partial z}
> $$
>
> 它本身不是一个具体结果，而是一个“操作工具”；
>
> - 当 $\nabla$ 作用在标量场上，可以形成**梯度**
>
> $$
> \nabla u
> $$
>
> - 当 $\nabla\cdot$ 作用在向量场上，可以形成**散度**
>
> $$
> \nabla\cdot\vec F
> $$
>
> - 当 $\nabla\times$ 作用在向量场上，可以形成**旋度**
>
> $$
> \nabla\times\vec F
> $$
>
> - 而 **拉普拉斯算子** $\nabla^2$ 是由 $\nabla$ 进一步组合得到的二阶算子。对标量场来说，
>
> $$
> \nabla^2 u=\nabla\cdot(\nabla u)
> $$
>
> 所以可以理解为：  
> **$\nabla$ 是基础算子，梯度 / 散度 / 旋度 / 拉普拉斯都是由它构造出来的不同运算。**

## 2-8 亥姆霍兹定理 Helmholtz’s Theorem

### 2-8-1 无界区域中的表述

在无界区域中，如果一个向量场在整个区域内的**散度**和**旋度**都已知，则可以通过它们确定这个向量场的表达式。其分解形式为

$$
\vec{F}(\vec{r})
=
-\nabla u(\vec{r})
+
\nabla\times \vec{A}(\vec{r})
$$

其中：

- $u(\vec{r})$ 是标量势；
- $\vec{A}(\vec{r})$ 是矢量势。


### 2-8-2 有界区域中的表述

若向量场定义在一个由曲面包围的有界区域内，则当下列量已知时，该向量场可以被确定：

- 区域内各点的散度；
- 区域内各点的旋度；
- 向量场在边界面上的法向分量。
