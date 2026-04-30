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
- [4-5 直角坐标系的边值问题](#4-5-直角坐标系的边值问题)



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


---

### 4-4-4 线电荷镜像导体圆柱




## 4-5 直角坐标系的边值问题







