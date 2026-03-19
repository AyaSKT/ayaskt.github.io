# 6 Z-Transform

**憧憬是距离理解最遥远的感情。**

![alt text](<DSP Chapter 6.attachments/1773645596770.JPG>)

> [!TIP]
> 说实话，我真没感觉出这里的 ZT 和信号与系统里的 ZT 有什么区别 ...
>
> 搞不好，信号与系统里学的还深一点。
>
> 带 ☆ 的内容为 Key Points。



## 章节目录


- [章节目录](#章节目录)
- [6-1 ☆ Z 变换的定义与性质](#6-1--z-变换的定义与性质)
  - [☆ 6-1-1 从 DTFT 到 ZT](#-6-1-1-从-dtft-到-zt)
  - [☆ 6-1-2 Z 变换的基本性质](#-6-1-2-z-变换的基本性质)
  - [☆ 6-1-3 基本序列的 Z 变换](#-6-1-3-基本序列的-z-变换)
- [6-2 有理 Z 变换 Rational ZT](#6-2-有理-z-变换-rational-zt)
  - [6-2-1 有理 ZT 的基本形式](#6-2-1-有理-zt-的基本形式)
  - [6-2-2 有理 ZT 的零点 Zeros 和极点 Poles](#6-2-2-有理-zt-的零点-zeros-和极点-poles)
- [6-3 有理 Z 变换的 ROC](#6-3-有理-z-变换的-roc)
  - [6-3-1 基于方向分类序列](#6-3-1-基于方向分类序列)
  - [6-3-2 序列的 ROC](#6-3-2-序列的-roc)
- [6-4 ☆ 反 Z 变换 Inverse Z-Transform, IZT](#6-4--反-z-变换-inverse-z-transform-izt)
  - [6-4-1 ☆ 留数定理及一般表达式](#6-4-1--留数定理及一般表达式)
  - [6-4-2 ☆ 查表法求解 IZT](#6-4-2--查表法求解-izt)
  - [6-4-3 ☆ 部分分式法求解 IZT](#6-4-3--部分分式法求解-izt)
  - [6-4-4 ☆ 长除法求解 IZT](#6-4-4--长除法求解-izt)
- [6-5 ☆ ZT 的性质](#6-5--zt-的性质)
- [6-7 传递函数 Transfer Function](#6-7-传递函数-transfer-function)
  - [6-7-1 定义](#6-7-1-定义)
  - [6-7-2 传递函数的表示](#6-7-2-传递函数的表示)
  - [6-7-3 来自传递函数的频域响应](#6-7-3-来自传递函数的频域响应)
  - [6-7-4 频域响应的几何解释](#6-7-4-频域响应的几何解释)
  - [6-7-5 极点位置与稳定条件](#6-7-5-极点位置与稳定条件)



## 6-1 ☆ Z 变换的定义与性质


> [!CAUTION]
> 本节被标注为 Key Point 。

### ☆ 6-1-1 从 DTFT 到 ZT

回顾 DTFT 的定义式：

$$
X(e^{j \omega}) = \sum_{n = - \infty} ^{\infty} 

x[n] e^{-j \omega n}
$$

不难发现，其自变量被限制在了 **复平面的单位圆 Unit Circle** 上。

思路打开，如果我们不再拘束于单位圆，而选择将自变量扩展到整个复数域上，就可以得到 Z 变换的定义。

即，一个离散序列的 Z 变换为：


$$
X(z) = \sum_{n = - \infty} ^{\infty} 

x[n] z^{-n}
$$

其中

$$
z = a+jb, \quad a, b \in \R
$$

。

---

### ☆ 6-1-2 Z 变换的基本性质

#### 1. Z 变换的退化

可以使用极坐标的方式换元 $z$ 自变量，此时 ZT 简化为：

$$
G(re^{j \omega}) = \sum_{n = -\infty} ^{\infty} g[n] r^{-n}  e^{-j \omega n}
$$

如果我们令 $r = 1$ ，不难发现此时 ZT 退化为复平面上的单位圆，即 DTFT （前提是该序列的 DTFT 存在）。



#### 2. 收敛域 Region of Convergence, ROC

对于 ZT 定义式中的无穷级数项：

$$
\sum_{n = - \infty} ^{\infty} 
x[n] z^{-n}
$$

，显然 $z$ 的不同取值会影响其收敛性。

对于一个给定的序列，使该序列的 ZT 能收敛的 $z$ 构成的集合被称为该序列的 **收敛域 Region of Convergence, ROC**。


#### 3. ROC 的条件

回到 ZT 的极坐标表达，我们可以将 ZT 看作对序列先做 $r^{-n}$ 的加权，再对其做 DTFT 。


$$
G(re^{j \omega}) = \sum_{n = -\infty} ^{\infty} g[n] r^{-n}  e^{-j \omega n}
$$

$$
\mathrm{ZT} \{ g[n] \} \xLeftrightarrow{} \mathrm{DTFT} \{  g[n] r^{-n} \}
$$





通过这样的等效，我们可以采取 DTFT 收敛的方法来分析 ZT 的 ROC。

由于 DTFT 在复平面中等效为一个单位圆上的旋转，因此 ZT 在复平面可以看作不同半径为 $r$ 的圆，所以 ZT 的 ROC一定为一个环形区域。

$$
0 \le ROC_{g^-} \lt |z| \lt ROC_{g^+} \le + \infty
$$


同时也可以想到， ZT 收敛的条件为加权序列 $r^{-n}g[n]$ 绝对可和

$$
\sum_{n = -\infty}^{\infty} |r^{-n}g[n]| \lt \infty
$$

> [!NOTE]
> Z变换是一种Laurent级数的形式，并且在ROC中的每个点都是一个解析函数。

---

### ☆ 6-1-3 基本序列的 Z 变换

| Sequence | Z-Transform | ROC |
|---|---|---| 
| $\delta[n]$ | $1$ | All values of $z$ |
| $\mu[n]$ | $\dfrac{1}{1-z^{-1}}$ | $\lvert z \rvert > 1$ |
| $\alpha^n \mu[n]$ | $\dfrac{1}{1-\alpha z^{-1}}$ | $\lvert z \rvert > \lvert \alpha \rvert$ |
| $(r^n \cos \omega_0 n)\mu[n]$ | $\dfrac{1-(r\cos\omega_0)z^{-1}}{1-(2r\cos\omega_0)z^{-1}+r^2 z^{-2}}$ | $\lvert z \rvert > r$ |
| $(r^n \sin \omega_0 n)\mu[n]$ | $\dfrac{(r\sin\omega_0)z^{-1}}{1-(2r\cos\omega_0)z^{-1}+r^2 z^{-2}}$ | $\lvert z \rvert > r$ |


## 6-2 有理 Z 变换 Rational ZT

### 6-2-1 有理 ZT 的基本形式

在本科阶段的课程中，我们通常只关注有理的 Z 变换。

通常，一个有理 ZT 可以写作两个多项式所构成的分式：

$$
G(z)=\frac{P(z)}{D(z)}
=\frac{p_0+p_1z^{-1}+\cdots+p_{M-1}z^{-(M-1)}+p_Mz^{-M}}
{d_0+d_1z^{-1}+\cdots+d_{N-1}z^{-(N-1)}+d_Nz^{-N}}
$$

或者因式分解形式：

$$
G(z)=
\frac{p_0\prod_{i=1}^{M}\left(1-\xi_i z^{-1}\right)}
{d_0\prod_{k=1}^{N}\left(1-\lambda_k z^{-1}\right)}
$$

$$
= z^{N-M}
\frac{p_0\prod_{i=1}^{M}\left(z-\xi_i\right)}
{d_0\prod_{k=1}^{N}\left(z-\lambda_k\right)}
$$

---

### 6-2-2 有理 ZT 的零点 Zeros 和极点 Poles

对于一个有理 ZT 

$$G(z) = \frac{P(z)}{D(z)}$$


- 将其分子的根称为这个 ZT 的 **零点 Zeros**，使得 $G(\xi_i)=0$ ；
- 将其分母的根称为这个 ZT 的 **极点 Poles**， $G(z)$ 趋于无穷大。


如果 ZT 的形式为：

$$
G(z) = z^{N-M}
\frac{p_0\prod_{i=1}^{M}\left(z-\xi_i\right)}
{d_0\prod_{k=1}^{N}\left(z-\lambda_k\right)}
\qquad N \not ={M}
$$

这个因子会额外在原点 $z=0$ 产生零点或极点。

<br>
<br>

1. 情况一：$N>M$

此时 $z^{N-M}$ 为正幂，因此在 $z=0$ 处会额外产生 $N-M$ 个零点。

也就是说，除了原本的 $M$ 个有限零点外，在原点还会多出 $N-M$ 个零点。

2. 情况二：$N<M$

此时

$$
z^{N-M}=\frac{1}{z^{M-N}}
$$

因此在 $z=0$ 处会额外产生 $M-N$ 个极点。

也就是说，除了原本的 $N$ 个有限极点外，在原点还会多出 $M-N$ 个极点。

## 6-3 有理 Z 变换的 ROC

单独的 ZT 无法唯一确定原序列的表达式。必须要带上 ROC 才能推断原序列。

因此一个标准的 ZT 表达式必然带有其 ROC 。

### 6-3-1 基于方向分类序列

我们可以按照以下四种方向来分类离散时间序列：

1. 有限序列 Finite Sequence
2. 右侧序列 Right-sided Sequence
3. 左侧序列 Left-sided Sequence
4. 两侧序列 Two-sided Sequence

X 侧序列的意思是该序列在坐标轴上向 X 侧无限延伸。

例如一个右侧序列自变量的有效取值范围为： $-\infty \lt N_1 \lt n \le \infty$ 。

---

### 6-3-2 序列的 ROC

在开始之前，必须要阐述一条非常重要的原则：

> [!IMPORTANT]
> 极点 Poles 决定了 ROC 的边界。
>
> 换而言之，在复平面上，ROC 的区域**绝对不能**包含极点。

假设复平面上有 $a$ ， $b$ ， $c$ 三个极点(如下图所示)，则可能的 ROC 有四种情况：

![alt text](<DSP Chapter 6.attachments/1773886586622.png>)


#### 1. ROC：$|z| > |c|$（最外侧）

- 区域：所有极点之外
- 序列类型：**右边序列（因果序列）**
- 物理意义：信号只在 $n \ge 0$ 存在


#### 2. ROC：$|b| < |z| < |c|$（外环）

- 区域：介于 $b$ 与 $c$ 之间
- 序列类型：**双边序列**
- 结构：
  - 一部分为右边序列（由 $c$ 对应）
  - 一部分为左边序列（由 $a, b$ 对应）


#### 3. ROC：$|a| < |z| < |b|$（内环）

- 区域：介于 $a$ 与 $b$ 之间
- 序列类型：**双边序列**
- 结构：
  - 一部分为右边序列（由 $b, c$ 对应）
  - 一部分为左边序列（由 $a$ 对应）


#### 4. ROC：$|z| < |a|$（最内侧）

- 区域：所有极点之内
- 序列类型：**左边序列（反因果序列）**
- 物理意义：信号只在 $n \le -1$ 存在



> [!NOTE]
> ROC 一定是**不包含任何极点的连通区域**；
> 
> 对于 $N$ 个极点，最多有 $N+1$ 种 ROC。
> 
> 本题中：
> $$\text{3 个极点} \Rightarrow 4 \text{种 ROC}$$


## 6-4 ☆ 反 Z 变换 Inverse Z-Transform, IZT

> [!CAUTION]
> 本节被标注为 Key Point 。


### 6-4-1 ☆ 留数定理及一般表达式


#### 1. 留数 Residue


$f(z)$ 在 $z_0$ 处的 **留数 Residue** 定义为其洛朗展开中 $\frac{1}{z - z_0}$ 项的**系数 $c_{-1}$**，记作：
$$\text{Res}[f(z), z_0] = c_{-1} = \frac{1}{2\pi j} \oint_C f(z) \, dz$$
其中 $C$ 是在去心邻域内绕 $z_0$ 的任意一条正向（逆时针）简单闭合曲线。


#### 2. 留数定理 Cauchy's Residue Theorem

> [!TIP]
> **围道积分 Contour Integral** 是复变函数中的核心概念，本质上是沿着复平面上一条曲线进行的积分。

设 $f(z)$ 在简单闭合曲线 $C$ 及其内部除有限个孤立奇点 $z_1, z_2, \ldots, z_n$ 外处处解析，则：
$$\oint_C f(z) \, dz = 2\pi j \sum_{k=1}^{n} \text{Res}[f(z), z_k]$$
> **核心思想**：复杂的围道积分可以转化为对各奇点留数的求和，极大地简化了计算。


#### 3. ZT 的一般形式


逆 Z 变换定义为：
$$g[n] = \frac{1}{2\pi j} \oint_{C'} G(z) z^{n-1} \, dz$$
其中 $C'$ 是一条**逆时针方向**的围道积分路径，定义在 $|z| = r$ 上，且必须落在 ROC 内。


- 上述围道积分**直接计算非常困难**
- 可以利用 **柯西留数定理** 来求解该围道积分：


根据留数定理，令
$$F(z) = G(z) z^{n-1}$$
若 $F(z)$ 在围道 $C$ 上连续，且围道 $C$ **内部**有 $K$ 个极点 $z_k$，**外部**有 $M$ 个极点 $z_m$，则：
- **当 $C$ 为逆时针方向时：**
$$\frac{1}{2\pi j} \oint_C G(z) z^{n-1} \, dz = \sum_k \text{Res}\left[ G(z) z^{n-1} \right]_{z = z_k}$$
- **当 $C$ 为顺时针方向时：**
$$\frac{1}{2\pi j} \oint_C G(z) z^{n-1} \, dz = -\sum_m \text{Res}\left[ G(z) z^{n-1} \right]_{z = z_m}$$

#### 4. 使用留数定理求 IZT


- 若 $z_r$ 是 $F(z) = G(z)z^{n-1}$ 的**一阶极点**，则留数为：

$$\text{Res}[G(z)z^{n-1}]_{z=z_r} = \left[(z - z_r) \cdot G(z) z^{n-1}\right]_{z=z_r}$$

> [!TIP]
> 方法：把导致分母为零的因子 $(z - z_r)$ 乘上去消掉，然后代入 $z = z_r$。




- 若 $z_r$ 是 $F(z)$ 的 **$M$ 阶极点**（即分母含 $(z - z_r)^M$），则留数为：
$$\text{Res}[G(z)z^{n-1}]_{z=z_r} = \frac{1}{(M-1)!} \cdot \frac{d^{M-1}}{dz^{M-1}}\left[(z - z_r)^M \cdot G(z) z^{n-1}\right]_{z=z_r}$$





> [!NOTE] 例：用留数定理求逆 Z 变换
> **题目：** 已知 $G(z) = \dfrac{z}{(z-1)(z-2)}$，ROC 为 $|z| > 2$（因果序列），求 $g[n]$。
>
> **第一步：构造被积函数**
>
> $$F(z) = G(z) z^{n-1} = \frac{z^n}{(z-1)(z-2)}$$
>
> **第二步：找极点**
>
> $F(z)$ 有两个一阶极点：$z_1 = 1$，$z_2 = 2$，均在围道 $C$（$|z| > 2$）内部。
>
> **第三步：计算留数**
>
> $$\text{Res}_{z=1} = \lim_{z \to 1} (z-1) \cdot \frac{z^n}{(z-1)(z-2)} = \frac{1}{-1} = -1$$
>
> $$\text{Res}_{z=2} = \lim_{z \to 2} (z-2) \cdot \frac{z^n}{(z-1)(z-2)} = \frac{2^n}{1} = 2^n$$
>
> **第四步：求和**
>
> $$g[n] = \text{Res}_{z=1} + \text{Res}_{z=2} = -1 + 2^n = 2^n - 1, \quad n \geq 0$$


---

### 6-4-2 ☆ 查表法求解 IZT



例：
$$H(z) = \frac{0.5z}{z^2 - z + 0.25}, \quad |z| > 0.5$$
分母因式分解：
$$H(z) = \frac{0.5z}{(z - 0.5)^2} = \frac{0.5z^{-1}}{(1 - 0.5z^{-1})^2}$$
查 Z 变换表，已知变换对：
$$n \alpha^n u[n] \xleftrightarrow{Z} \frac{\alpha z^{-1}}{(1 - \alpha z^{-1})^2}, \quad |z| > |\alpha|$$
对比可知 $\alpha = 0.5$，因此：
$$h[n] = n(0.5)^n u[n]$$


> [!TIP]
> 查表法是最简单且最常用的方法。反正是开卷考试，直接打印一张查询表就行了～


---

### 6-4-3 ☆ 部分分式法求解 IZT

$X(z)$ 是 $z$ 的**有理分式**：
$$X(z) = \frac{B(z)}{A(z)} = X_1(z) + X_2(z) + \cdots + X_k(z)$$
其中 $A(z)$、$B(z)$ 都是 $z$ 的多项式。核心思想是将 $X(z)$ 拆分为若干简单项，分别查表求逆变换：
$$x[n] = Z^{-1}[X(z)] = Z^{-1}[X_1(z)] + Z^{-1}[X_2(z)] + \cdots + Z^{-1}[X_k(z)]$$
> [!WARNING]
> 每个 $X_k(z)$ 必须足够简单以便查表求 IZT，同时要注意各项的 ROC。

#### 1. 展开的一般形式

设：
$$X(z) = \frac{B(z)}{A(z)} = \frac{p_0 + p_1 z^{-1} + \cdots + p_M z^{-M}}{d_0 + d_1 z^{-1} + \cdots + d_N z^{-N}}$$
当 $M \geq N$ 时，先做**长除法**提取多项式部分，再对余项因式分解：
$$X(z) = \sum_{l=0}^{M-N} \eta_l z^{-l} + \frac{B_1(z)}{(1 - \lambda_1 z^{-1})(1 - \lambda_2 z^{-1}) \cdots (1 - \lambda_{N-L} z^{-1})(1 - \nu z^{-1})^L}$$
展开为部分分式：
$$X(z) = \sum_{l=0}^{M-N} \eta_l z^{-l} + \sum_{l=1}^{N-L} \frac{\rho_l}{1 - \lambda_l z^{-1}} + \sum_{i=1}^{L} \frac{\gamma_i}{(1 - \nu z^{-1})^i}$$
其中 $\nu$ 是 $X(z)$ 的 $L$ 阶重极点，$\lambda_l$（$l = 1, 2, \ldots, N-L$）是各单极点。

#### 2. 各系数的求法

**$\eta_l$（多项式部分）：** 当 $M \geq N$ 时存在，$M < N$ 时为 0。

**$\rho_l$（单极点系数）：** 由留数定理得：

$$\rho_l = (1 - \lambda_l z^{-1}) X(z) \Big|_{z = \lambda_l} = (z - \lambda_l) \frac{X(z)}{z} \Big|_{z = \lambda_l} = \text{Res}\left[\frac{X(z)}{z}\right]_{z = \lambda_l}, \quad l = 1, 2, \ldots, N-L$$

**$\gamma_i$（重极点系数）：**

$$\gamma_i = \frac{1}{(-\nu)^{L-i}} \cdot \frac{1}{(L-i)!} \cdot \frac{d^{L-i}}{d(z^{-1})^{L-i}} \left[(1 - \nu z^{-1})^L X(z)\right]_{z = \nu}, \quad i = 1, 2, \ldots, L$$



> [!NOTE] 例：部分分式展开
> 已知：
>
> $$G(z) = \frac{2 + 0.8z^{-1} + 0.5z^{-2} + 0.3z^{-3}}{1 + 0.8z^{-1} + 0.2z^{-2}}$$
>
> 此处分子阶数 $M = 3 > N = 2$，需先做**长除法**，得：
>
> $$G(z) = -3.5 + 1.5z^{-1} + \frac{5.5 + 2.1z^{-1}}{1 + 0.8z^{-1} + 0.2z^{-2}} = -3.5 + 1.5z^{-1} + G_1(z)$$
>
> 然后对 $G_1(z)$ 继续做部分分式展开，分别查表求逆变换即可。





---

### 6-4-4 ☆ 长除法求解 IZT


由于 $X(z)$ 通常是有理分式，可以用**长除法**将分子多项式除以分母多项式，得到 $z^{-1}$ 的幂级数展开，从而直接读出 $x[n]$。
> [!WARNING]
> 使用长除法时，必须先根据 ROC 判断序列类型（因果/反因果/双边），再选择合适的展开方向：
> - ROC 为 $|z| > r$（因果）→ 按 $z^{-1}$ 的正幂展开
> - ROC 为 $|z| < r$（反因果）→ 按 $z$ 的正幂展开
> - ROC 为环形区域 → 拆分后分别展开


> [!NOTE] 例：双边序列的长除法
> **题目：** 求 $X(z) = \dfrac{z^2}{(4-z)(z-\frac{1}{4})}$ 的逆 Z 变换，ROC：$\dfrac{1}{4} < |z| < 4$
>
> **分析 ROC：** 收敛域是环形区域，因此 $x[n]$ 是**双边序列**：
> - 极点 $z = \frac{1}{4}$ 在 ROC 内侧 → 对应**右边序列**（$n \geq 0$）
> - 极点 $z = 4$ 在 ROC 外侧 → 对应**左边序列**（$n \leq -1$）
>
> **第一步：部分分式展开**
>
> $$\frac{X(z)}{z} = \frac{z}{(4-z)(z-\frac{1}{4})} = \frac{16/15}{4-z} + \frac{1/15}{z-\frac{1}{4}}$$
>
> $$X(z) = \frac{1}{15}\left(\frac{16z}{4-z} + \frac{z}{z-\frac{1}{4}}\right)$$
>
> **第二步：对每一项做长除法**
>
> **左边序列项** $\dfrac{16z}{4-z}$，按 $z$ 的正幂展开（$|z| < 4$）：
>
> $$\frac{16z}{4-z} = 4z + z^2 + \frac{1}{4}z^3 + \frac{1}{16}z^4 + \cdots$$
>
> **右边序列项** $\dfrac{z}{z-\frac{1}{4}}$，按 $z^{-1}$ 的正幂展开（$|z| > \frac{1}{4}$）：
>
> $$\frac{z}{z-\frac{1}{4}} = 1 + \frac{1}{4}z^{-1} + \frac{1}{16}z^{-2} + \cdots$$
>
> **第三步：合并，写成级数形式**
>
> $$X(z) = \frac{1}{15}\left[\cdots + \frac{1}{4}z^3 + z^2 + 4z + 1 + \frac{1}{4}z^{-1} + \frac{1}{16}z^{-2} + \cdots\right]$$
>
> $$= \frac{1}{15}\left[\sum_{n=0}^{\infty}\left(\frac{1}{4}\right)^n z^{-n} + \sum_{n=-\infty}^{-1} 4^{n+2}\, z^{-n}\right]$$
>
> **第四步：读出系数得到 $x[n]$**
>
> $$x[n] = \frac{4^{-n}}{15}\,\mu[n] + \frac{4^{n+2}}{15}\,\mu[-n-1]$$











## 6-5 ☆ ZT 的性质

> [!CAUTION]
> 本节被标注为 Key Point 。


| 性质 | 序列 | Z 变换 | ROC（收敛域） |
|------|------|--------|---------------|
| 基本定义 | $g[n],\; h[n]$ | $G(z),\; H(z)$ | $R_g,\; R_h$ |
| 共轭 | $g^*[n]$ | $G^*(z^*)$ | $R_g$ |
| 时间反转 | $g[-n]$ | $G(1/z)$ | $1/R_g$ |
| 线性性 | $\alpha g[n] + \beta h[n]$ | $\alpha G(z) + \beta H(z)$ | 至少包含 $R_g \cap R_h$ |
| 时移 | $g[n - n_0]$ | $z^{-n_0} G(z)$ | 与 $R_g$ 相同，但可能不包含 $z=0$ 或 $z=\infty$ |
| 指数加权 | $\alpha^n g[n]$ | $G(z/\alpha)$ | $|\alpha| R_g$ |
| 微分性质 | $n g[n]$ | $-z \dfrac{dG(z)}{dz}$ | 与 $R_g$ 相同，但可能不包含 $z=0$ 或 $z=\infty$ |
| 卷积 | $g[n] \circledast h[n]$ | $G(z)H(z)$ | 至少包含 $R_g \cap R_h$ |
| 调制（乘积） | $g[n]h[n]$ | $\dfrac{1}{2\pi j} \oint_C G(v)H\left(\dfrac{z}{v}\right)\dfrac{1}{v} dv$ | 至少包含 $R_g R_h$ |

**Parseval's Relation** 

$$
\sum_{n=-\infty}^{\infty} g[n] h^*[n]
=
\frac{1}{2\pi j}
\oint_C
G(v) H^*\left(\frac{1}{v^*}\right)
\frac{1}{v} dv
$$

> [!TIP]
> **ROC 运算规则（常用结论）**
>
> 若：
> $$
> R_g: \quad R_{g-} < |z| < R_{g+}
> $$
> $$
> R_h: \quad R_{h-} < |z| < R_{h+}
> $$
>
> 则：
>
> - **时间反转**：
>   $$
>   \frac{1}{R_g}: \quad \frac{1}{R_{g+}} < |z| < \frac{1}{R_{g-}}
>   $$
>
> - **调制（乘积）**：
>   $$
>   R_g R_h: \quad R_{g-} R_{h-} < |z| < R_{g+} R_{h+}
>   $$


## 6-7 传递函数 Transfer Function

### 6-7-1 定义

LTI 系统的冲激响应的 ZT 称为传递函数 Transfer Function，一般是 $z^{-1}$ 的有理函数。

在大多数实际应用中，所关注的 LTI 数字滤波器由具有常数和实系数的线性差分方程表征，因此其传递函数是有理 ZT 。

在时域中，给定冲激响应 $h[n]$ ：

$$
y[n] = x[n] * h[n]
$$

对两边同时做 ZT ，可得

$$
\begin{aligned}
Y(z) &= X(z) H(z) \\

H(z) &= \frac{Y(z)}{X(z)}
\end{aligned}
$$

这里的 $H(z)$ 即这个 LTI 系统的传递函数。

---

### 6-7-2 传递函数的表示

#### 1. FIR 系统的传递函数

FIR 系统的冲激响应 $h[n]$ 只在区间 $N_1 \le n \le N_2$ 范围内非零，所以它的转移函数就是一个有限项求和（多项式）：

$$
H(z) = \sum_{n = N_1}^{N_2} 
h[n]
z^{-n}
$$

其特点是只有零点，不存在极点（分母中不存在 $z$ 项）。


#### 2. IIR 系统的传递函数

IIR 系统由常系数线性差分方程描述：

$$
\sum_{k = 0}^{N}d_k y[n-k] = \sum_{k = 0}^M p_k x[n-k]
$$

对两遍做 ZT ：

$$
\sum_{k = 0}^{N}d_k z^{-k} Y(z) = \sum_{k = 0}^M p_k z^{-k} X(z)
$$

处理得：


$$
H(z) = \frac{Y(z)}{X(z)} = \frac{\sum_{k = 0}^M p_k z^{-k}}{\sum_{k = 0}^{N}d_k z^{-k}}
$$


#### 3. 传递函数的因式分解形式

对上面的分式做因式分解，得到一般形式：

$$
H(z) = \frac{p_0}{d_0} \cdot z^{(N-M)} \cdot \frac
{\prod_{k = 1}^M (z - \xi_k)}
{\prod_{k = 1}^N (z - \lambda_k)}
$$

其有以下特征：

1. $\xi_1, \xi_2 \dots$ 均为有限零点， $\lambda_1, \lambda_2 \dots$ 均为有限极点；
2. $N \not ={M}$ 时，根据 $N-M$ 判断多出 $|N-M|$ 个零点还是极点；
3. 对于任意因果 IIR 系统，其 ROC 在最大极点外侧，即 $|z| \gt \mathrm{max}{|\lambda_k|}$


---

### 6-7-3 来自传递函数的频域响应

频率响应就是转移函数在**单位圆**上的取值：
$$H(e^{j\omega}) = H(z)\Big|_{z = e^{j\omega}}$$
将 $H(z)$ 的因式分解形式：
$$H(z) = \frac{p_0}{d_0} \cdot \frac{\prod_{m=1}^{M}(1 - \xi_m z^{-1})}{\prod_{k=1}^{N}(1 - \lambda_k z^{-1})} = \frac{p_0}{d_0} \cdot z^{(N-M)} \cdot \frac{\prod_{m=1}^{M}(z - \xi_m)}{\prod_{k=1}^{N}(z - \lambda_k)}$$
代入 $z = e^{j\omega}$，得到频率响应：
$$H(e^{j\omega}) = \frac{p_0}{d_0} \cdot e^{j\omega(N-M)} \cdot \frac{\prod_{m=1}^{M}(e^{j\omega} - \xi_m)}{\prod_{k=1}^{N}(e^{j\omega} - \lambda_k)} = \left|H(e^{j\omega})\right| \cdot e^{j\arg[H(e^{j\omega})]}$$
其中：
- **幅度响应：** $|H(e^{j\omega})| = \dfrac{|p_0|}{|d_0|} \cdot \dfrac{\prod_{m=1}^{M} |e^{j\omega} - \xi_m|}{\prod_{k=1}^{N} |e^{j\omega} - \lambda_k|}$
- **相位响应：** $\arg[H(e^{j\omega})] = \omega(N-M) + \sum_{m=1}^{M}\arg(e^{j\omega} - \xi_m) - \sum_{k=1}^{N}\arg(e^{j\omega} - \lambda_k)$


---

### 6-7-4 频域响应的几何解释

#### 1. 零点向量与极点向量

定义从每个零点/极点指向单位圆上 $e^{j\omega}$ 的向量：
- **零点向量：** $\vec{c}_m = e^{j\omega} - \xi_m = \rho_m \, e^{j\theta_m}$（长度 $\rho_m$，角度 $\theta_m$）
- **极点向量：** $\vec{d}_k = e^{j\omega} - \lambda_k = l_k \, e^{j\phi_k}$（长度 $l_k$，角度 $\phi_k$）


![alt text](<DSP Chapter 6.attachments/1773904264562.png>)

#### 2. 频率响应的相位表达

> [!IMPORTANT]
>
> **幅度响应** = 零点向量长度之积 / 极点向量长度之积：
> 
> $$
> \boxed{
> \left|H(e^{j\omega})\right| = |K| \cdot \frac{\prod_{m=1}^{M} \rho_m}{\prod_{k=1}^{N} l_k}
> }
> $$
> 
> **相位响应** = 零点向量角度之和 - 极点向量角度之和：
> 
> $$\boxed{\arg[H(e^{j\omega})] = \arg[K] + \sum_{m=1}^{M}\theta_m - \sum_{k=1}^{N}\phi_k + (N-M)\omega}$$


#### 3. 低通滤波器与高通滤波器



**低通滤波器：** 极点 $p_1$ 靠近 $z = 1$（$\omega = 0$）
- $\omega \approx 0$ 时，$e^{j\omega}$ 离极点很近 → 极点向量短 → 分母小 → 增益大
- $\omega$ 增大时，$e^{j\omega}$ 远离极点 → 增益下降

**高通滤波器：** 极点 $p_1$ 靠近 $z = 1$，同时在 $z = 1$ 处放一个零点 $z_1$
- $\omega = 0$ 时，零点向量长度 = 0 → 分子 = 0 → 低频完全抑制
- $\omega$ 增大时，零点向量变长 → 增益增大 → 高频通过

![alt text](<DSP Chapter 6.attachments/1773904487243.png>)


> [!NOTE]
> **零点的位置**决定频率响应中**凹谷**的位置和深度：
> - 零点**在**单位圆上 → 该频率幅度**恰好为 0**
> - 零点**趋近**单位圆 → 该频率幅度**趋近于 0**
> 
> **极点的位置**决定频率响应中**峰值**的位置和高度：
> - 极点**趋近**单位圆 → 该频率幅度**趋近于** $\infty$
> - 极点**在单位圆外** → **系统不稳定**



> [!TIP]
> 设计滤波器的几何直觉：想象一个点沿单位圆转一圈，它到各零点距离之积 / 到各极点距离之积，就画出了幅度响应曲线。
> 
> **想衰减哪个频率就在那里放零点，想增强哪个频率就在那里放极点。**

![alt text](<DSP Chapter 6.attachments/1773904750908.png>)

(好逆天的图，我要瞎了)

---

### 6-7-5 极点位置与稳定条件

#### 1. BIBO 稳定条件

LTI 数字滤波器 **BIBO 稳定**的充要条件为冲激响应**绝对可和**：

$$\sum_{n=-\infty}^{\infty} |h[n]| < \infty$$

等价于：$H(z)$ 的 **ROC 必须包含单位圆** $|z| = 1$。

#### 2. 因果系统的稳定判据

对于因果 LTI 系统，ROC 为 $|z| > \max_k|\lambda_k|$。要使 ROC 包含单位圆，则需：

$$|\lambda_k| < 1, \quad \forall \, k$$

> **因果系统稳定 等价于 所有极点都在单位圆内部。**


#### 3. FIR v.s. IIR 的稳定性


| 类型 | 稳定性 | 原因 |
|------|--------|------|
| 因果 FIR | **永远稳定** | $h[n]$ 有限长，绝对可和必然满足；极点都在 $z=0$ |
| 因果 IIR | **不一定稳定** | 需确保所有极点满足 $\|\lambda_k\| < 1$ |


> [!WARNING]
> 即使 IIR 滤波器设计时所有极点都在单位圆内，实际数字实现中由于系数的**量化误差**（有限字长效应），极点位置可能发生偏移，导致原本稳定的滤波器**变得不稳定**。







