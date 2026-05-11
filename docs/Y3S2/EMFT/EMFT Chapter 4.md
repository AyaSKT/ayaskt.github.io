# 4 Solution of Electrostatic Problems

**我的白马儿呀你慢些跑啊，这一次没有我带你回家。**


<div align="right">——福禄寿FloruitShow《马》</div>

![alt text](<EMFT Chapter 4.attachments/1774777767457.jpg>)

## 章节目录

- [章节目录](#章节目录)
- [4-2 泊松方程与拉普拉斯方程](#4-2-泊松方程与拉普拉斯方程)
- [4-3 静电场的唯一性定理 Uniqueness of Electrostatic Solutions](#4-3-静电场的唯一性定理-uniqueness-of-electrostatic-solutions)
  - [4-3-1 唯一性定理 Uniqueness Theorem](#4-3-1-唯一性定理-uniqueness-theorem)
  - [4-3-2 自然边界条件与三类边界条件](#4-3-2-自然边界条件与三类边界条件)
- [4-4 镜像法 Method of Images](#4-4-镜像法-method-of-images)
  - [4-4-1 镜像法的基本原理](#4-4-1-镜像法的基本原理)
  - [4-4-2 点电荷镜像导体平面](#4-4-2-点电荷镜像导体平面)
  - [4-4-3 点电荷镜像导体球](#4-4-3-点电荷镜像导体球)
  - [4-4-4 线电荷镜像导体圆柱](#4-4-4-线电荷镜像导体圆柱)
- [4-5 直角坐标系的边值问题 (分离变量法)](#4-5-直角坐标系的边值问题-分离变量法)
  - [4-5-1 分离变量法的基本思想](#4-5-1-分离变量法的基本思想)
  - [4-5-2 Fourier 正弦级数](#4-5-2-fourier-正弦级数)
  - [4-5-3 例题](#4-5-3-例题)



## 4-2 泊松方程与拉普拉斯方程

回顾静电场基本方程的微分形式：

$$
\left\{
\begin{aligned}
\nabla \cdot \vec E = \frac{\rho}{\varepsilon_0} \\

\\

\nabla \times \vec E = 0

\end{aligned}
\right.
$$

根据电势和电场的关系 $\vec E = - \nabla \varphi$ ，代入原式可得：

::: definition
**泊松方程 Possion Equation**

$$
\boxed{\nabla^2 \varphi = \frac{\rho}{\varepsilon}}
$$

当 $\rho = 0$ 时，泊松方程退化为**拉普拉斯方程 Laplace Equation** ：

$$
\boxed{\nabla^2 \varphi = 0}
$$

:::

::: example 例题
::: stem
平行板电容器两板间距离为d，并分别保持电势为 $0$ 和 $V_0$ 。假设边缘的边缘效应忽略不计，确定

（a）两板之间任意点的电势，

（b）板上的面电荷密度。

![alt text](<EMFT Chapter 4.attachments/1775961060498.png>)

:::

::: solution

**(a)**

由于忽略极板边缘效应，因此由对称性可得极板电势只与y轴有关。
在两极板中间区域，根据定义和边界条件可以写出静电场方程：

$$
\begin{cases}
\nabla^2 \varphi (y) = 0 \\

\varphi(0) = 0 \\

\varphi(d) = V_0 

\end{cases}
$$

又因为 $\varphi(y)$ 只与y轴坐标有关，因此拉普拉斯方程可以化简为：

$$
\nabla^2 \varphi(y) = \frac{\partial^2}{\partial y^2} \varphi (y) = 0
$$

这是一个常微分方程，因此直接对两边积分两次，可以得到：

$$
\varphi = C_1 y + C_2
$$

带入 $\varphi(0)$ 和 $\varphi(d)$ 的值可以解出系数，因此可以得到该小题答案：

$$
\boxed{
    \varphi = \frac{V_0}{d} y
}
$$

**(b)**

因为该电容由上下两个导体极板共同构成，且导体表面电荷密度与导体表面电场强度成正比，因此只需要求出导体表面的电场强度即可得到本小题答案。

确定思路后，先求板间电场：

$$
\vec E = - \nabla \varphi = - \frac{V_0}{d} \hat y
$$

其中 $\hat y$ 为y轴正方向的单位矢量。

假设导体表面的单位法向向量为 $\hat n$ ，通过公式计算可得

$$
E_n = \hat n \cdot \left. \vec E \right|_{y = 0\; or\; d} = \frac{\sigma}{\varepsilon}
$$

即上下极板的面电荷密度分别为：

$$
\boxed{
    \begin{cases}
    \sigma_{upper} = \frac{\varepsilon V_0}{d} \\
    \\
    \sigma_{lower} =  -\frac{\varepsilon V_0}{d} \\
    \end{cases}
}
$$

:::
:::



## 4-3 静电场的唯一性定理 Uniqueness of Electrostatic Solutions

### 4-3-1 唯一性定理 Uniqueness Theorem

::: definition
给定边界条件，满足泊松方程的解一定是是唯一解。
:::

即满足如下方程组的解有且仅有一个：

$$
\begin{cases}
\nabla^2 \varphi = \frac{\rho}{\varepsilon} \\
\\
\left. \varphi \right|_{S} = f(s)

\end{cases}
$$

其中 S 代表边界。

::: example 利用反证法证明唯一性定理

::: solution

**假设** 通过该定理找到两个解 $\varphi_1$ 和 $\varphi_2$ ，我们取 $U = \varphi_1 - \varphi_2$

两个解同时满足：

$$
\begin{cases}
\nabla^2 \varphi_1 = \frac{\rho}{\varepsilon} \\
\left. \varphi_1 \right|_{S} = f(s)

\end{cases}
\qquad
\begin{cases}
\nabla^2 \varphi_2 = \frac{\rho}{\varepsilon} \\
\left. \varphi_2 \right|_{S} = f(s)

\end{cases}
$$

将它们相减可得：

$$
\begin{cases}
\nabla^2 U = \nabla^2 (\varphi_1 - \varphi_2) = 0 \\
\left. U \right|_S = 0
\end{cases}
$$

注意到第一个式子退化成一个**拉普拉斯方程**，且边界上均为0，展开该方程得到：

$$
\nabla^2 U = 
\frac{\partial^2}{\partial x^2} U +
\frac{\partial^2}{\partial y^2} U +
\frac{\partial^2}{\partial z^2} U =0
$$

假如 U 在该空间中存在一个不为0的极大值或极小值，则其一阶导函数必然不为0且斜率不为0（各方向上同号），故其二阶导函数也不可能为0。


因此该处的拉普拉斯方程必然不能满足 $\nabla^2 U = 0$ 。因此唯一可行的解即为：

$$
U \equiv 0 \quad \text{在边界上和区域内}
$$

即：

$$
\boxed{
  \begin{aligned}
  U = \varphi_1 &- \varphi_2 = 0 \\
  
  \varphi_1 &= \varphi_2
  \end{aligned}
}
$$

所以假设的两个解相等，不存在不同的第二解，唯一性得证。

:::


:::

---

### 4-3-2 自然边界条件与三类边界条件

::: definition

在一个开放空间中，对于一个有限区域的体电荷分布，有：

$$
\lim_{r \to \infty}{r \varphi} \lt \infty 
$$

即在无限远处，距离与电势的乘积总是有限的。

这一条件被称为 开放空间的**自然边界条件 Natural Boundary Condition** 。


::: 


#### 1. 第一类边界条件：边界电势

形式为

$$
\left. \varphi \right|_S = f(s)
$$

意思是边界上每一点的电势都已知。这是最常见的一种边界条件。


#### 2. 第二类边界条件：法向导数

形式为

$$
\left. \frac{\partial}{\partial n} \varphi \right|_S = g(s)
$$

在静电学中，这也通常被等价为边界上的法向电场或者法向电位移，即

$$
D_n = \varepsilon E_n = - \varepsilon \frac{\partial}{\partial n} \varphi
$$

**纯第二类边界条件下，电势一般只能确定到一个加法常数。**


#### 3. 第三类边界条件：电势和法向导数的线性组合

形式为

$$
a(s) \varphi + b(s) \frac{\partial}{\partial n} \varphi = h(s)
$$





## 4-4 镜像法 Method of Images

### 4-4-1 镜像法的基本原理

![alt text](<EMFT Chapter 4.attachments/1775976686541.png>)

由静电场的唯一性原理可知，对于一个区域，只要其边界条件一定，且内部电荷分布一定，其解也是一定的。

对于一些复杂的面电荷或者体电荷，通过将它们替换为在特定位置摆放特定的点电荷或线电荷，保持其边界条件和电荷分布不变，即可将一个复杂的问题等效为一个简单的点电荷问题。

这就是镜像法的核心思想和原理。

> [!IMPORTANT]
> 确定镜像电荷的两个原则
>
> 1. 镜像电荷必须放置在求解区域之外
> 2. 镜像电荷的个数、位置和电量大小的选择，目的是使该问题的边界条件保持不变。

---

### 4-4-2 点电荷镜像导体平面


1. **点电荷镜像无限大接地平板**

::: example 
::: stem

一个无限大的导体平板接地，其上方 $d$ 处有一点电荷 q ，真空电导率 $\varepsilon_0$ 。

![alt text](<EMFT Chapter 4.attachments/1775983039362.png>)
:::

::: solution

对极板下方列静电场方程：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad

\\
\left. \varphi \right|_{y=0} = 0
\\
\left. \varphi \right|_{r=\infty} \lt \infty

\end{cases}
$$

因为在极板下方电势的二阶导数恒为0，所以可以认为电势在这个区域不会出现极大值和极小值。

所以极板下方电势恒为0。



在极板上方空间列静电场方程：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad
\text{除点q外}
\\
\left. \varphi \right|_{y=0} = 0
\\
\left. \varphi \right|_{r=\infty} \lt \infty

\end{cases}
$$

其边界出现在极板平面上，因此考虑镜像法替换该极板，使得该区域的边界条件不变。

放置一个反极性电荷-q相对于q关于极板对称，并移去极板：


此时对 $y \ge 0$ ，

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad
\text{除点q外}
\\
\left. \varphi \right|_{y=0} = 0
\\
\left. \varphi \right|_{r=\infty} \lt \infty

\end{cases}
$$

边界条件没有发生变化。





![alt text](<EMFT Chapter 4.attachments/1775983178018.png>)

随后整理得

| | 表达式 / 说明 |
|---|---|
| 镜像电荷 | $q'=-q,\quad h'=h$ |
| 电势函数 | $\varphi=\dfrac{q}{4\pi\varepsilon}\left(\dfrac{1}{R}-\dfrac{1}{R'}\right),\quad (y\ge 0)$ |
| 当 $z=0$ 时 | $R=R' \;\Rightarrow\; \left.\varphi\right\rvert_{y=0}=0$ |

:::

:::



2. **线电荷镜像无限大接地平板**

::: example 
::: stem

一个无限大的导体平板接地，其上方 $h$ 处有一根无限长直线电荷，线电荷密度为 $\rho_l$ ，介质为真空，介电常数为 $\varepsilon_0$ 。

设导体平面为 $y=0$ ，线电荷平行于 $z$ 轴放置。

![alt text](<EMFT Chapter 4.attachments/1775984697392.png>)

:::

::: solution

对极板下方列静电场方程：

$$
\begin{cases}
\nabla^2 \varphi = 0
\\
\left. \varphi \right|_{y=0} = 0
\\
\left. \varphi \right|_{r=\infty} < \infty
\end{cases}
$$

因为在极板下方不存在自由电荷，且边界 $y=0$ 上电势为零，所以该区域内唯一满足条件的解为

$$
\varphi = 0.
$$



在极板上方空间列静电场方程：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad \text{除线电荷所在位置外}
\\
\left. \varphi \right|_{y=0} = 0
\\
\left. \varphi \right|_{r=\infty} < \infty
\end{cases}
$$

其边界出现在极板平面上，因此考虑用镜像法替换该极板，使得该区域的边界条件不变。

在极板下方关于平面 $y=0$ 对称位置放置一根镜像线电荷，其线电荷密度取为原线电荷的反号：

$$
\rho_l'=-\rho_l,\qquad h'=h
$$

并移去极板。

此时对 $y\ge 0$ ，

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad \text{除真实线电荷所在位置外}
\\
\left. \varphi \right|_{y=0} = 0
\\
\left. \varphi \right|_{r=\infty} < \infty
\end{cases}
$$

边界条件没有发生变化。



设场点为 $(x,y)$ ，则

$$
R=\sqrt{x^2+(y-h)^2},\qquad
R'=\sqrt{x^2+(y+h)^2}
$$

其中：

- $R$ 为场点到真实线电荷的距离；
- $R'$ 为场点到镜像线电荷的距离。

随后整理得

| 项目 | 表达式 / 说明 |
|---|---|
| 镜像线电荷 | $\rho_l'=-\rho_l,\quad h'=h$ |
| 电势函数 | $\varphi=\dfrac{\rho_l}{2\pi\varepsilon_0}\ln\dfrac{R'}{R},\quad (y\ge 0)$ |
| 当 $y=0$ 时 | $R=R' \;\Rightarrow\; \varphi(y=0)=0$ |

因此，该镜像电荷构成的等效场满足原边值问题的全部条件，所以它就是原问题在极板上方空间中的正确解。

:::
:::

3. **两相交接地半无限导体平面之间的点电荷**

::: example 
::: stem

两块半无限大导体平面互相垂直相交，并且都接地。设真实点电荷 $q$ 位于两平面夹角内部，其坐标为 $(d_1,d_2)$ 。

求该区域内的电势分布。

![alt text](<EMFT Chapter 4.attachments/1775985068117.png>)

:::

::: solution

设两接地导体平面分别为

$$
x=0,\qquad y=0
$$

真实点电荷位于第一象限：

$$
q:(d_1,d_2)
$$


原问题的边界条件为：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad \text{除点电荷 }q\text{ 所在位置外}
\\
\left.\varphi\right|_{x=0}=0
\\
\left.\varphi\right|_{y=0}=0
\\
\left.\varphi\right|_{r\to\infty}<\infty
\end{cases}
$$

其边界出现在两接地导体平面上，因此考虑使用镜像法，使得该区域的边界条件保持不变。



先对平面 $x=0$ 作镜像，得到镜像电荷

$$
q_1=-q,\qquad (-d_1,d_2)
$$

再对平面 $y=0$ 作镜像，得到镜像电荷

$$
q_2=-q,\qquad (d_1,-d_2)
$$

为了同时满足两个边界条件，再对上述镜像继续关于另一平面作镜像，得到第三个镜像电荷

$$
q_3=+q,\qquad (-d_1,-d_2)
$$



设场点为 $(x,y)$ ，则各距离分别为

$$
R=\sqrt{(x-d_1)^2+(y-d_2)^2}
$$

$$
R_1=\sqrt{(x+d_1)^2+(y-d_2)^2}
$$

$$
R_2=\sqrt{(x-d_1)^2+(y+d_2)^2}
$$

$$
R_3=\sqrt{(x+d_1)^2+(y+d_2)^2}
$$

于是电势函数可写为

$$
\varphi=\frac{q}{4\pi\varepsilon}
\left(
\frac{1}{R}
-\frac{1}{R_1}
-\frac{1}{R_2}
+\frac{1}{R_3}
\right)
$$



随后整理得

| 项目 | 表达式 / 说明 |
|---|---|
| 真实电荷 | $q,\quad (d_1,d_2)$ |
| 镜像电荷 1 | $q_1=-q,\quad (-d_1,d_2)$ |
| 镜像电荷 2 | $q_2=-q,\quad (d_1,-d_2)$ |
| 镜像电荷 3 | $q_3=+q,\quad (-d_1,-d_2)$ |
| 电势函数 | $\varphi=\dfrac{q}{4\pi\varepsilon}\left(\dfrac{1}{R}-\dfrac{1}{R_1}-\dfrac{1}{R_2}+\dfrac{1}{R_3}\right)$ |



验证边界条件：

当 $x=0$ 时，有

$$
R=R_1,\qquad R_2=R_3
$$

故

$$
\left.\varphi\right\rvert_{x=0}=0
$$

当 $y=0$ 时，有

$$
R=R_2,\qquad R_1=R_3
$$

故

$$
\left.\varphi\right\rvert_{y=0}=0
$$

因此，该镜像电荷构成的等效场满足原边值问题的全部条件，所以它就是原问题在有效区域内的正确解。

:::




:::



:::


::: tip

![alt text](<EMFT Chapter 4.attachments/1775985088094.png>)

对于两相交接地导体平面形成的楔形边界，镜像法仍然适用。

若楔角为

$$
\alpha=\frac{\pi}{n},\qquad n\in\mathbb{Z}^+
$$

则通过连续镜像反射，可以在有限步内得到全部镜像电荷。

此时：

- 真实电荷共对应 $2n$ 个对称位置；
- 除去原电荷外，共需要

$$
2n-1
$$

个镜像电荷。

其选择原则仍然是：

1. 镜像电荷必须放置在求解区域之外；
2. 镜像电荷的个数、位置和电量大小必须保证原边界上仍有

$$
\varphi=0
$$

例如：

- 当 $\alpha=\dfrac{\pi}{2}$ 时，$n=2$ ，需 $3$ 个镜像电荷；
- 当 $\alpha=\dfrac{\pi}{3}$ 时，$n=3$ ，需 $5$ 个镜像电荷。

最终电势均可由“真实电荷 + 全部镜像电荷”的电势按叠加原理求得。

:::

---

### 4-4-3 点电荷镜像导体球

1. **点电荷镜像接地导体球**

:::: example 
:::: stem

半径为 $a$ 的导体球接地，球心为 $O$ 。在球外距离球心 $d$ 处放置一点电荷 $q$ ，其中

$$
d>a
$$

求球外区域的电势分布、导体球表面的感应电荷面密度以及总感应电荷。

![alt text](<EMFT Chapter 4.attachments/1777551562814.png>)

::::

:::: solution


球外区域满足的边值问题为：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad \text{除点电荷 }q\text{ 所在位置外}
\\
\left.\varphi\right|_{r=a}=0
\\
\left.\varphi\right|_{r\to\infty}<\infty
\end{cases}
$$

由于边界是球面，因此镜像电荷应放在球内，并且与真实电荷、球心在同一直线上。

设镜像电荷为 $q'$ ，其到球心的距离为 $d'$ 。对球面上一点 $P$ ，有

$$
\varphi(P)=\frac{1}{4\pi\varepsilon}
\left(
\frac{q}{R}+\frac{q'}{R'}
\right)
$$

其中 $R$ 为 $P$ 到真实电荷的距离，$R'$ 为 $P$ 到镜像电荷的距离。

为了使整个球面上均有 $\varphi=0$ ，需要满足

$$
\left.
\frac{R'}{R}
\right|_{r=a}
=
-\frac{q'}{q}
=
\text{constant}
$$

由几何关系可得：

$$
\left.
\frac{R'}{R}
\right|_{r=a}
=
\frac{a}{d}
$$

因此镜像电荷的位置和电量分别为

$$
\boxed{
d'=\frac{a^2}{d}
}
\qquad
\boxed{
q'=-\frac{a}{d}q
}
$$

![alt text](<EMFT Chapter 4.attachments/1777551597805.png>)

所以球外区域的电势为

$$
\boxed{
\varphi
=
\frac{q}{4\pi\varepsilon}
\left[
\frac{1}{\sqrt{r^2+d^2-2rd\cos\theta}}-
\frac{a}{d}
\frac{1}{\sqrt{r^2+\left(\dfrac{a^2}{d}\right)^2-2r\dfrac{a^2}{d}\cos\theta}}
\right]
}
\qquad (r\ge a)
$$

验证边界条件：

当 $r=a$ 时，

$$
R'=\frac{a}{d}R
$$

因此

$$
\frac{q}{R}+\frac{q'}{R'}
=
\frac{q}{R}-
\frac{\dfrac{a}{d}q}{\dfrac{a}{d}R}
=0
$$

故球面上满足

$$
\left.\varphi\right|_{r=a}=0
$$

随后整理得

| 项目 | 表达式 / 说明 |
| --- | --- |
| 真实电荷 | $q,\quad d>a$ |
| 镜像电荷 | $q'=-\dfrac{a}{d}q,\quad d'=\dfrac{a^2}{d}$ |
| 电势函数 | $\varphi=\dfrac{1}{4\pi\varepsilon}\left(\dfrac{q}{R}+\dfrac{q'}{R'}\right),\quad (r\ge a)$ |
| 球面边界 | $R'=\dfrac{a}{d}R \;\Rightarrow\; \left.\varphi\right\rvert_{r=a}=0$ |

导体表面的感应电荷面密度可由法向电场求得：

$$
\rho_s
=
-\varepsilon
\left.
\frac{\partial \varphi}{\partial r}
\right|_{r=a}
$$

代入上式可得

$$
\boxed{
\rho_s
=-
\frac{q(d^2-a^2)}
{4\pi a\left(a^2+d^2-2ad\cos\theta\right)^{3/2}}
}
$$

总感应电荷为

$$
q_{in}
=
\int_S \rho_s\,dS
=
\boxed{
-\frac{a}{d}q
}
$$

可以看到，对于接地导体球，导体球表面的总感应电荷等于镜像电荷的电量。

::::
::::


1. **点电荷镜像接地空心导体球壳**

:::: example 
:::: stem

半径为 $a$ 的空心导体球壳接地，点电荷 $q$ 位于球壳内部，距离球心为 $d$ ，其中

$$
d<a
$$

求球壳内部区域的电势分布以及内表面的总感应电荷。

![alt text](<EMFT Chapter 4.attachments/1777551645008.png>)

::::

:::: solution

球壳内部区域满足的边值问题为：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad \text{除点电荷 }q\text{ 所在位置外}
\\
\left.\varphi\right|_{r=a}=0
\end{cases}
$$

由于要求解区域是球壳内部，因此镜像电荷必须放在求解区域之外，也就是放在球壳外部。

仍设镜像电荷与真实电荷、球心共线。根据与上一问相同的边界条件，有

$$
\boxed{
d'=\frac{a^2}{d}
}
\qquad
\boxed{
q'=-\frac{a}{d}q
}
$$

此时由于 $d<a$ ，所以

$$
d'>a,\qquad |q'|>|q|
$$

球壳内部的电势为

$$
\boxed{
\varphi
=
\frac{q}{4\pi\varepsilon}
\left[
\frac{1}{\sqrt{r^2+d^2-2rd\cos\theta}}-
\frac{a}{d}
\frac{1}{\sqrt{r^2+\left(\dfrac{a^2}{d}\right)^2-2r\dfrac{a^2}{d}\cos\theta}}
\right]
}
\qquad (r\le a)
$$

当 $r=a$ 时，仍有

$$
R'=\frac{a}{d}R
$$

所以球面边界上电势为零。

内表面的感应电荷面密度为

$$
\rho_s
=
\varepsilon
\left.
\frac{\partial \varphi}{\partial r}
\right|_{r=a}
$$

注意这里的法向取向与外部导体球问题相反，因此符号与上一问不同。

计算得到

$$
\boxed{
\rho_s
=
-
\frac{q(a^2-d^2)}
{4\pi a\left(a^2+d^2-2ad\cos\theta\right)^{3/2}}
}
$$

于是内表面总感应电荷为

$$
q_{in}
=
\int_S \rho_s\,dS
=
\boxed{-q}
$$

这里需要注意：

$$
q_{in}\ne q'
$$

也就是说，镜像电荷只是为了等效边界条件而引入的辅助电荷，并不总是等于真实导体表面上的总感应电荷。

如果导体球壳还有外半径 $b$ ，内部空腔的解仍然与 $b$ 无关。原因是接地导体本身为零电势体，空腔区域只看到边界

$$
\left.\varphi\right|_{r=a}=0
$$

而外表面的形状和半径不会进入空腔内的边值问题。



::::
::::


1. **点电荷镜像不接地导体球**

:::: example 
:::: stem

半径为 $a$ 的孤立不接地导体球原来不带电，球外距离球心 $d$ 处放置一点电荷 $q$ ，其中

$$
d>a
$$

求球外区域的电势分布。

![alt text](<EMFT Chapter 4.attachments/1777551673622.png>)

::::

:::: solution

不接地导体球仍然是等势体，但其电势不一定为零。

同时，因为导体球原来不带电，所以导体球表面的总感应电荷应满足

$$
q_{in}=0
$$

先借用接地导体球的结果，在球内放置镜像电荷

$$
q'=-\frac{a}{d}q,
\qquad
d'=\frac{a^2}{d}
$$

这一部分保证球面为零电势，但它对应的总感应电荷为

$$
q'
=
-\frac{a}{d}q
$$

为了使导体球总电荷为零，需要再在球心放置一个补偿镜像电荷

$$
q''=-q'=\frac{a}{d}q
$$

球心电荷到球面上任一点的距离都为 $a$ ，因此它只会把整个球面电势整体抬高同一个常数，不会破坏等势边界。

于是球外区域电势为

$$
\boxed{
\varphi
=
\frac{1}{4\pi\varepsilon}
\left(
\frac{q}{R}
+
\frac{q'}{R'}
+
\frac{q''}{r}
\right)
}
\qquad (r\ge a)
$$

其中

$$
q'=-\frac{a}{d}q,
\qquad
d'=\frac{a^2}{d},
\qquad
q''=\frac{a}{d}q
$$

随后整理得

| 项目 | 表达式 / 说明 |
| --- | --- |
| 真实电荷 | $q,\quad d>a$ |
| 第一镜像电荷 | $q'=-\dfrac{a}{d}q,\quad d'=\dfrac{a^2}{d}$ |
| 补偿镜像电荷 | $q''=\dfrac{a}{d}q,\quad \text{位于球心}$ |
| 电势函数 | $\varphi=\dfrac{1}{4\pi\varepsilon}\left(\dfrac{q}{R}+\dfrac{q'}{R'}+\dfrac{q''}{r}\right)$ |
| 总感应电荷 | $q'+q''=0$ |

导体球表面的感应电荷分布可以理解为两部分叠加：

1. 接地导体球对应的非均匀负电荷分布；
2. 球心补偿电荷对应的均匀正电荷分布。

因此，不接地导体球表面的负电荷分布与接地导体球相同，但为了保证总电荷为零，还会叠加一层均匀的正电荷分布。

![alt text](<EMFT Chapter 4.attachments/1777551689645.png>)

::::
::::

---

### 4-4-4 线电荷镜像导体圆柱

:::: example 
:::: stem

半径为 $a$ 的无限长导体圆柱接地，圆柱轴线为 $z$ 轴。在圆柱外距离轴线 $f$ 处放置一根无限长直线电荷，线电荷密度为 $\rho_l$ ，且与圆柱轴线平行，其中

$$
f>a
$$

求圆柱外区域的电势分布以及导体圆柱表面的感应电荷面密度。

![alt text](<EMFT Chapter 4.attachments/1777551709431.png>)

::::

:::: solution

圆柱外区域满足的边值问题为：

$$
\begin{cases}
\nabla^2 \varphi = 0 \qquad \text{除真实线电荷所在位置外}
\\
\left.\varphi\right|_{\rho=a}=0
\\
\left.\varphi\right|_{\rho\to\infty}<\infty
\end{cases}
$$

由于真实电荷是一根无限长线电荷，镜像电荷也应取为一根与其平行的无限长线电荷。

设镜像线电荷密度为 $\rho_l'$ ，其到圆柱轴线的距离为 $d$ 。为了抵消导体表面的电势，取

$$
\rho_l'=-\rho_l
$$

设圆柱表面上一点 $P$ 到真实线电荷和镜像线电荷的距离分别为 $R$ 和 $R'$ 。两根线电荷在点 $P$ 处产生的电势可写为

$$
\varphi_P
=
\frac{\rho_l}{2\pi\varepsilon}
\ln\frac{R'}{R}
$$

为了使导体圆柱成为等势体，需要有

$$
\left.
\frac{R'}{R}
\right|_{\rho=a}
=
\text{constant}
$$

根据圆柱几何关系，当镜像线电荷放在

$$
\boxed{
d=\frac{a^2}{f}
}
$$

处时，有

$$
\left.
\frac{R'}{R}
\right|_{\rho=a}
=
\frac{a}{f}
$$

因此圆柱表面确实为等势面。

若要求接地圆柱表面电势为零，只需在电势中加入相应的常数，得到圆柱外区域电势：

$$
\boxed{
\varphi
=
\frac{\rho_l}{2\pi\varepsilon}
\ln
\left(
\frac{fR'}{aR}
\right)
}
\qquad (\rho\ge a)
$$

其中

$$
R=\sqrt{\rho^2+f^2-2\rho f\cos\theta}
$$

$$
R'=\sqrt{\rho^2+d^2-2\rho d\cos\theta},
\qquad
d=\frac{a^2}{f}
$$

验证边界条件：

当 $\rho=a$ 时，

$$
R'=\frac{a}{f}R
$$

因此

$$
\left.
\varphi
\right|_{\rho=a}
=
\frac{\rho_l}{2\pi\varepsilon}
\ln
\left(
\frac{f}{a}\cdot \frac{a}{f}
\right)
=0
$$

随后整理得

| 项目 | 表达式 / 说明 |
| --- | --- |
| 真实线电荷 | $\rho_l,\quad f>a$ |
| 镜像线电荷 | $\rho_l'=-\rho_l,\quad d=\dfrac{a^2}{f}$ |
| 电势函数 | $\varphi=\dfrac{\rho_l}{2\pi\varepsilon}\ln\left(\dfrac{fR'}{aR}\right),\quad (\rho\ge a)$ |
| 圆柱面边界 | $R'=\dfrac{a}{f}R \;\Rightarrow\; \left.\varphi\right\rvert_{\rho=a}=0$ |

导体圆柱表面的感应电荷面密度为

$$
\rho_s
=
-\varepsilon
\left.
\frac{\partial \varphi}{\partial \rho}
\right|_{\rho=a}
$$

代入电势函数可得

$$
\boxed{
\rho_s
=
-
\frac{\rho_l(f^2-a^2)}
{2\pi a\left(a^2+f^2-2af\cos\theta\right)}
}
$$

单位长度上的总感应电荷为

$$
\rho_{in}
=
\int_0^{2\pi}\rho_s a\,d\theta
=
\boxed{-\rho_l}
$$

因此，对于接地导体圆柱，每单位长度上的总感应电荷等于镜像线电荷的线电荷密度。


::::


:::: tip

镜像法处理导体球和导体圆柱时，关键并不是直接猜导体表面上的真实电荷分布，而是先找到能够保持边界条件不变的等效电荷。

常见结果可以记为：

| 原问题 | 镜像位置 | 镜像电荷 |
| --- | --- | --- |
| 球外点电荷 $q$ ，接地导体球 | $d'=\dfrac{a^2}{d}$ | $q'=-\dfrac{a}{d}q$ |
| 球内点电荷 $q$ ，接地球壳 | $d'=\dfrac{a^2}{d}$ | $q'=-\dfrac{a}{d}q$ |
| 圆柱外线电荷 $\rho_l$ ，接地导体圆柱 | $d=\dfrac{a^2}{f}$ | $\rho_l'=-\rho_l$ |

但要特别注意：镜像电荷只是辅助构造，是否等于总感应电荷，要看具体问题。

::::
::::



## 4-5 直角坐标系的边值问题 (分离变量法)

### 4-5-1 分离变量法的基本思想

**分离变量法 Method of Separation of Variables** 是一种解决边值问题的通用解法。

其基本思想可以总结为：叠加原理+假设变量间可以互相分离。

1. **微分方程**

在一个直角坐标系中，拉普拉斯方程可以被写为：

$$
\nabla ^2 \varphi = \frac{\partial ^2}{\partial x^2} \varphi + \frac{\partial ^2}{\partial y^2} \varphi + \frac{\partial ^2}{\partial z^2} \varphi =0
$$


然后我们 **假设** （这个词在这里可能难以令人接受，但是要相信待定系数法是前人的智慧，在这里假设那肯定能够解出问题的）电势 $\varphi$ 能够被表示为三个坐标函数的乘积，即：

$$
\varphi (x, y, z) = X(x)Y(y)Z(z)
$$

通常待定系数法不会涉及到三个维度，因为这会使得计算极其复杂。所以在这里忽略 z 轴，得到：

$$
\varphi (x, y) = X(x)Y(y)
$$

带回拉普拉斯方程，可以得到：

$$
Y \frac{\partial ^2}{\partial x^2} X + X \frac{\partial ^2}{\partial y^2} Y = 0
$$

同时除以 $XY$ ，

$$
\boxed{
  \frac{1}{X} \frac{\partial ^2}{\partial x^2} X + \frac{1}{Y} \frac{\partial ^2}{\partial y^2} Y = 0
}
$$

显然在这个函数中，任何自变量的改变都会导致二者相加不再为0。因此唯一的可能解仅存在于两项均为常数，因此我们令：

$$
\frac{1}{X} \frac{\partial ^2}{\partial x^2} X = -k^2

\qquad

\frac{1}{Y} \frac{\partial ^2}{\partial y^2} Y = k^2
$$

:::: tip
这里正常数和负常数的选取需要根据实际情况判定。
::::



> [!IMPORTANT]
> 根据如下表格（背诵）：
> 
> 对于方程
>
> $$
> X''(x)+k_x^2X(x)=0
> $$
>
> 其可能解如下：
>
> | $k_x^2$ | $k_x$ | $X(x)$ | $X(x)$ 的指数形式 |
> | --- | --- | --- | --- |
> | $0$ | $0$ | $A_0x+B_0$ | 无 |
> | $+$ | $k$ | $A_1\sin kx+B_1\cos kx$ | $C_1e^{jkx}+D_1e^{-jkx}$ |
> | $-$ | $jk$ | $A_2\sinh kx+B_2\cosh kx$ | $C_2e^{kx}+D_2e^{-kx}$ |
>
> 其中，指数形式与三角函数、双曲函数之间有如下关系：
>
> $$
> e^{\pm jkx}=\cos kx \pm j\sin kx
> $$
>
> $$
> \cos kx=\frac{1}{2}\left(e^{jkx}+e^{-jkx}\right),
> \qquad
> \sin kx=\frac{1}{2j}\left(e^{jkx}-e^{-jkx}\right)
> $$
>
> $$
> e^{\pm kx}=\cosh kx \pm \sinh kx
> $$
>
> $$
> \cosh kx=\frac{1}{2}\left(e^{kx}+e^{-kx}\right),
> \qquad
> \sinh kx=\frac{1}{2}\left(e^{kx}-e^{-kx}\right)
> $$

2. **分离常数为 $\lambda=-k^2$**

根据上面的取法，有：

$$
\frac{d^2X(x)}{dx^2}+k^2X(x)=0
$$

$$
\frac{d^2Y(y)}{dy^2}-k^2Y(y)=0
$$

也就是说，$x$ 方向对应三角函数解，$y$ 方向对应双曲函数解。

当 $k=0$ 时，

$$
X(x)=X_0(x)=A_0x+B_0
$$

$$
Y(y)=Y_0(y)=C_0y+D_0
$$

因此可得零阶解：

$$
\boxed{
\varphi_0(x,y)=X_0(x)Y_0(y)=(A_0x+B_0)(C_0y+D_0)
}
$$

当 $k=k_n\ne 0$ 时，

$$
X(x)=X_n(x)=A_n\sin(k_nx)+B_n\cos(k_nx)
$$

$$
Y(y)=Y_n(y)=C_n\sinh(k_ny)+D_n\cosh(k_ny)
$$

因此第 $n$ 阶解为：

$$
\boxed{
\begin{aligned}
\varphi_n(x,y)
&=X_n(x)Y_n(y)
\\
&=
\left[
A_n\sin(k_nx)+B_n\cos(k_nx)
\right]
\left[
C_n\sinh(k_ny)+D_n\cosh(k_ny)
\right]
\end{aligned}
}
$$

3. **叠加原理**

由于拉普拉斯方程是线性方程，所以所有满足方程的解可以线性叠加。

因此当 $\lambda=-k^2$ 时，电势的一般形式可以写为：

$$
\boxed{
\begin{aligned}
\varphi(x,y)
&=
(A_0x+B_0)(C_0y+D_0)
\\
&\quad+
\sum_{n=1}^{\infty}
\left[
A_n\sin(k_nx)+B_n\cos(k_nx)
\right]
\left[
C_n\sinh(k_ny)+D_n\cosh(k_ny)
\right]
\end{aligned}
}
$$

其中分离常数 $k_n$ 以及各个待定系数，都需要由具体边界条件决定。

类似地，如果取

$$
\lambda=k^2
$$

则 $x$ 方向和 $y$ 方向的函数形式会互换，即：

$$
\frac{d^2X(x)}{dx^2}-k^2X(x)=0
\qquad
\frac{d^2Y(y)}{dy^2}+k^2Y(y)=0
$$

此时电势的一般形式为：

$$
\boxed{
\begin{aligned}
\varphi(x,y)
&=
(A_0x+B_0)(C_0y+D_0)
\\
&\quad+
\sum_{n=1}^{\infty}
\left[
A_n\sinh(k_nx)+B_n\cosh(k_nx)
\right]
\left[
C_n\sin(k_ny)+D_n\cos(k_ny)
\right]
\end{aligned}
}
$$

4. **待定系数法的基本步骤**

:::: definition

用分离变量法解直角坐标系边值问题时，通常按如下步骤：

1. 写出求解区域内的拉普拉斯方程；
2. 根据边界形状假设 $\varphi(x,y)=X(x)Y(y)$；
3. 代入方程并分离变量，得到关于 $X$ 和 $Y$ 的两个常微分方程；
4. 根据边界条件选择正分离常数或负分离常数；
5. 写出通解并利用叠加原理构造级数形式；
6. 将边界条件代入通解，确定 $k_n$ 和所有待定系数。

::::

:::: tip

一般来说，若某个方向上的边界条件要求电势在两个端点取零值，常常会在该方向上选用 $\sin$ 型函数；而另一方向则对应 $\sinh$ 或 $\cosh$ 型函数。

选择哪一个方向放三角函数，核心不是死记，而是看哪个方向的边界条件能自然确定 $k_n$ 。

::::

---

### 4-5-2 Fourier 正弦级数

在分离变量法中，待定系数通常不是直接“看出来”的，而是通过边界条件的 Fourier 级数展开求出来。

最常用的是 **Fourier 正弦级数**。

:::: definition

若函数 $f(x)$ 定义在区间

$$
0<x<a
$$

上，并希望把它展开为一组正弦函数的线性组合，则可以写成：

$$
\boxed{
f(x)=\sum_{n=1}^{\infty}b_n\sin\left(\frac{n\pi x}{a}\right)
}
$$

其中系数为：

$$
\boxed{
b_n
=
\frac{2}{a}
\int_0^a
f(x)
\sin\left(\frac{n\pi x}{a}\right)
dx
}
$$

::::

这个公式的来源是正弦函数的正交性：

$$
\int_0^a
\sin\left(\frac{n\pi x}{a}\right)
\sin\left(\frac{m\pi x}{a}\right)
dx
=
\begin{cases}
0, & m\ne n \\
\dfrac{a}{2}, & m=n
\end{cases}
$$

因此，如果边界条件写成

$$
f(x)=\sum_{n=1}^{\infty}b_n\sin\left(\frac{n\pi x}{a}\right)
$$

则两边同时乘以

$$
\sin\left(\frac{m\pi x}{a}\right)
$$

并在 $0$ 到 $a$ 上积分，即可把第 $m$ 项系数单独“筛”出来。

:::: example 常数函数的 Fourier 正弦展开

若

$$
f(x)=U_0,\qquad 0<x<a
$$

则

$$
U_0=\sum_{n=1}^{\infty}b_n\sin\left(\frac{n\pi x}{a}\right)
$$

其中

$$
\begin{aligned}
b_n
&=
\frac{2}{a}
\int_0^a
U_0
\sin\left(\frac{n\pi x}{a}\right)
dx
\\
&=
\frac{2U_0}{n\pi}
\left[
1-(-1)^n
\right]
\end{aligned}
$$

所以

$$
\boxed{
b_n=
\begin{cases}
\dfrac{4U_0}{n\pi}, & n=1,3,5,\cdots \\
0, & n=2,4,6,\cdots
\end{cases}
}
$$

也就是说，常数 $U_0$ 的正弦级数展开只保留奇数项。

::::

:::: tip

做待定系数法时，如果某一步得到

$$
U_0
=
\sum_{n=1}^{\infty}
A_n
\sinh\left(\frac{n\pi b}{a}\right)
\sin\left(\frac{n\pi x}{a}\right)
$$

那么可以先把 $U_0$ 展开成

$$
U_0
=
\sum_{n=1}^{\infty}
b_n
\sin\left(\frac{n\pi x}{a}\right)
$$

再逐项比较，得到

$$
A_n
=
\frac{b_n}
{\sinh\left(\dfrac{n\pi b}{a}\right)}
$$

::::

---

### 4-5-3 例题

:::: example 矩形区域三边接地问题
:::: stem

在矩形区域

$$
0<x<a,\qquad 0<y<b
$$

内没有自由电荷。三条边界接地，顶部边界保持电势 $V_0$ ：

$$
\begin{cases}
\varphi(0,y)=0 \\
\varphi(a,y)=0 \\
\varphi(x,0)=0 \\
\varphi(x,b)=V_0
\end{cases}
$$

求矩形区域内的电势分布。

![alt text](<EMFT Chapter 4.attachments/1777551778822.png>)

::::

:::: solution

区域内部没有自由电荷，所以电势满足拉普拉斯方程：

$$
\nabla^2\varphi=0
$$

根据分离变量法，设

$$
\varphi(x,y)=X(x)Y(y)
$$

由于边界 $x=0$ 和 $x=a$ 上电势均为零，因此希望 $X(x)$ 在两端为零。

所以选择

$$
X_n(x)=\sin(k_nx)
$$

并由边界条件

$$
X_n(0)=0,\qquad X_n(a)=0
$$

得到

$$
\sin(k_na)=0
$$

因此

$$
\boxed{
k_n=\frac{n\pi}{a}
}
\qquad
n=1,2,3,\cdots
$$

此时对应的 $y$ 方向解为

$$
Y_n(y)=C_n\sinh(k_ny)+D_n\cosh(k_ny)
$$

再利用边界条件

$$
\varphi(x,0)=0
$$

可知

$$
Y_n(0)=0
$$

所以

$$
D_n=0
$$

因此通解可以写为

$$
\varphi(x,y)
=
\sum_{n=1}^{\infty}
A_n\sin\left(\frac{n\pi x}{a}\right)
\sinh\left(\frac{n\pi y}{a}\right)
$$

最后代入顶部边界条件：

$$
\varphi(x,b)=V_0
$$

即

$$
V_0
=
\sum_{n=1}^{\infty}
A_n
\sinh\left(\frac{n\pi b}{a}\right)
\sin\left(\frac{n\pi x}{a}\right)
$$

这说明需要把常数 $V_0$ 展开为正弦级数：

$$
V_0
=
\sum_{n=1}^{\infty}
B_n
\sin\left(\frac{n\pi x}{a}\right)
$$

其中

$$
B_n
=
\frac{2}{a}
\int_0^a
V_0
\sin\left(\frac{n\pi x}{a}\right)
dx
$$

计算可得

$$
B_n
=
\frac{2V_0}{n\pi}
\left[
1-(-1)^n
\right]
$$

因此

$$
A_n
=
\frac{B_n}
{\sinh\left(\dfrac{n\pi b}{a}\right)}
$$

最终电势分布为

$$
\boxed{
\varphi(x,y)
=
\sum_{n=1}^{\infty}
\frac{2V_0\left[1-(-1)^n\right]}
{n\pi\sinh\left(\dfrac{n\pi b}{a}\right)}
\sin\left(\frac{n\pi x}{a}\right)
\sinh\left(\frac{n\pi y}{a}\right)
}
$$

由于当 $n$ 为偶数时，

$$
1-(-1)^n=0
$$

所以实际上只有奇数项保留下来，也可以写为：

$$
\boxed{
\varphi(x,y)
=
\frac{4V_0}{\pi}
\sum_{m=0}^{\infty}
\frac{1}{2m+1}
\frac{
\sinh\left(\dfrac{(2m+1)\pi y}{a}\right)
}{
\sinh\left(\dfrac{(2m+1)\pi b}{a}\right)
}
\sin\left(\frac{(2m+1)\pi x}{a}\right)
}
$$

随后整理得

| 项目 | 表达式 / 说明 |
| --- | --- |
| 分离常数 | $k_n=\dfrac{n\pi}{a}$ |
| $x$ 方向函数 | $X_n(x)=\sin\left(\dfrac{n\pi x}{a}\right)$ |
| $y$ 方向函数 | $Y_n(y)=\sinh\left(\dfrac{n\pi y}{a}\right)$ |
| 待定系数来源 | 由顶部边界 $\varphi(x,b)=V_0$ 作傅里叶正弦展开得到 |

::::
::::

:::: tip

这个例题中，$x=0$ 和 $x=a$ 两条边界都是零电势，所以最自然的选择是让 $x$ 方向出现 $\sin\left(\dfrac{n\pi x}{a}\right)$ 。

如果换成 $y=0$ 和 $y=b$ 两条边界为零电势，那么通常会让 $y$ 方向出现三角函数，而 $x$ 方向出现双曲函数。

::::


:::: example 半无限平行导体槽问题
:::: stem

两块半无限接地导体平面彼此平行，间距为 $d$ 。槽口处由一块电势为 $\varphi_0$ 的导体平面封闭，并且与上下两块接地导体平面之间存在很小间隙而互相绝缘。

取求解区域为

$$
x>0,\qquad 0<y<d
$$

边界条件为：

$$
\begin{cases}
\varphi(x,0)=0 \\
\varphi(x,d)=0 \\
\varphi(0,y)=\varphi_0 \\
\varphi(\infty,y)=0
\end{cases}
$$

求导体槽内的电势分布。

![alt text](<EMFT Chapter 4.attachments/1777551804473.png>)

::::

:::: solution

由于导体槽沿 $z$ 方向无限延伸，因此槽内电势与 $z$ 无关，是一个二维边值问题。

区域内部没有自由电荷，所以满足：

$$
\frac{\partial^2\varphi}{\partial x^2}
+
\frac{\partial^2\varphi}{\partial y^2}
=0
$$

设

$$
\varphi(x,y)=X(x)Y(y)
$$

由于上下边界为零电势：

$$
\varphi(x,0)=0,
\qquad
\varphi(x,d)=0
$$

因此令 $y$ 方向取正弦函数：

$$
Y(y)=A\sin(k_yy)+B\cos(k_yy)
$$

由 $Y(0)=0$ 可得

$$
B=0
$$

由 $Y(d)=0$ 可得

$$
\sin(k_yd)=0
$$

因此

$$
\boxed{
k_y=\frac{n\pi}{d}
}
\qquad
n=1,2,3,\cdots
$$

所以

$$
Y_n(y)=\sin\left(\frac{n\pi y}{d}\right)
$$

由分离变量关系可知，$x$ 方向对应指数函数形式：

$$
X_n(x)=C_ne^{\frac{n\pi}{d}x}+D_ne^{-\frac{n\pi}{d}x}
$$

又因为当 $x\to\infty$ 时电势必须趋于零，所以指数增长项不能存在：

$$
C_n=0
$$

于是槽内电势可以写为：

$$
\varphi(x,y)
=
\sum_{n=1}^{\infty}
D_n
e^{-\frac{n\pi}{d}x}
\sin\left(\frac{n\pi y}{d}\right)
$$

再代入左端边界条件：

$$
\varphi(0,y)=\varphi_0
$$

得到

$$
\varphi_0
=
\sum_{n=1}^{\infty}
D_n
\sin\left(\frac{n\pi y}{d}\right),
\qquad
0<y<d
$$

这说明需要将常数 $\varphi_0$ 在区间 $(0,d)$ 上展开为 Fourier 正弦级数。

由前一小节的结果可得：

$$
D_n
=
\begin{cases}
\dfrac{4\varphi_0}{n\pi}, & n=1,3,5,\cdots \\
0, & n=2,4,6,\cdots
\end{cases}
$$

因此导体槽内的电势分布为：

$$
\boxed{
\varphi(x,y)
=
\frac{4\varphi_0}{\pi}
\sum_{n=1,3,5,\cdots}^{\infty}
\frac{1}{n}
e^{-\frac{n\pi}{d}x}
\sin\left(\frac{n\pi y}{d}\right)
}
$$

随后整理得

| 项目 | 表达式 / 说明 |
| --- | --- |
| 求解区域 | $x>0,\quad 0<y<d$ |
| $y$ 方向函数 | $Y_n(y)=\sin\left(\dfrac{n\pi y}{d}\right)$ |
| $x$ 方向函数 | $X_n(x)=e^{-\frac{n\pi}{d}x}$ |
| Fourier 系数 | $D_n=\dfrac{4\varphi_0}{n\pi}$，仅保留奇数项 |
| 最终结果 | $\varphi(x,y)=\dfrac{4\varphi_0}{\pi}\displaystyle\sum_{n=1,3,5,\cdots}^{\infty}\dfrac{1}{n}e^{-\frac{n\pi}{d}x}\sin\left(\dfrac{n\pi y}{d}\right)$ |

::::
::::


:::: tip

这个例题和上一个矩形槽问题的区别在于：这里的 $x$ 方向是半无限区域，所以必须把会随 $x$ 增大的指数项舍去，只保留

$$
e^{-\frac{n\pi}{d}x}
$$

这样才能满足远处边界条件

$$
\varphi(\infty,y)=0
$$

::::






