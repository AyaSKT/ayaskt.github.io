# 5 Discrete Fourier Transform

**迎着阳光盛大逃亡。**

![alt text](<DSP Chapter 5.attachments/1773562401264.png>)


> [!TIP]
> 带 * 内容不在考试范围内。

## 章节目录

- [章节目录](#章节目录)
- [5-1 \* 正交变换 Orthogonal Transforms](#5-1--正交变换-orthogonal-transforms)
  - [5-1-1 \* 正交变换的一般形式 General Form](#5-1-1--正交变换的一般形式-general-form)
  - [5-1-2 \* 离散傅里叶级数 Discrete Fourier Series, DFS](#5-1-2--离散傅里叶级数-discrete-fourier-series-dfs)
  - [5-1-3 常见 DFS 变换对](#5-1-3-常见-dfs-变换对)
- [5-2 离散傅里叶变换 Discrete Fourier Transform, DFT](#5-2-离散傅里叶变换-discrete-fourier-transform-dft)
  - [5-2-1 DFT 的定义](#5-2-1-dft-的定义)
  - [5-2-2 矩阵关系 Matrix Relation](#5-2-2-矩阵关系-matrix-relation)
- [5-3 DFT 和 DTFT 的关系](#5-3-dft-和-dtft-的关系)
  - [5-3-1 从 DTFT 得到 DFT](#5-3-1-从-dtft-得到-dft)
  - [5-3-2 插值 DFT 以得到 DTFT](#5-3-2-插值-dft-以得到-dtft)
  - [5-3-3 DTFT 采样](#5-3-3-dtft-采样)
  - [5-3-4 DTFT v.s. DFS v.s. DFT](#5-3-4-dtft-vs-dfs-vs-dft)
- [5-4 有限序列的运算](#5-4-有限序列的运算)
  - [5-4-1 循环移位 Circular Shift](#5-4-1-循环移位-circular-shift)
  - [5-4-2 循环反转 Circular Reversal](#5-4-2-循环反转-circular-reversal)
  - [5-4-3 循环卷积 / 圆卷积 Circular Convolution](#5-4-3-循环卷积--圆卷积-circular-convolution)
- [5-5 \* 有限序列的分类](#5-5--有限序列的分类)
  - [5-5-1 \* 基于共轭对称 Conjugate Symmetry](#5-5-1--基于共轭对称-conjugate-symmetry)
  - [5-5-2 \* 基于几何对称 Geometric Symmetry](#5-5-2--基于几何对称-geometric-symmetry)
- [5-6 DFT 性质](#5-6-dft-性质)
- [5-7 DFT 定理](#5-7-dft-定理)
- [5-8 \* 傅里叶域滤波 Fourier-Domain Filtering](#5-8--傅里叶域滤波-fourier-domain-filtering)
- [5-9 \* 实序列计算 DFT](#5-9--实序列计算-dft)
  - [\* 5-9-1 两个实序列共用一次 N 点 DFT](#-5-9-1-两个实序列共用一次-n-点-dft)
  - [\* 5-9-2 用一次 N 点 DFT 求一个 2N 点实序列的 DFT](#-5-9-2-用一次-n-点-dft-求一个-2n-点实序列的-dft)
- [5-10 使用 DFT 计算线性卷积](#5-10-使用-dft-计算线性卷积)
  - [5-10-1 两个有限长序列的线性卷积](#5-10-1-两个有限长序列的线性卷积)
  - [5-10-2 循环前缀 The Cyclic Prefix](#5-10-2-循环前缀-the-cyclic-prefix)
  - [5-10-3 有限长序列和无限长序列卷积](#5-10-3-有限长序列和无限长序列卷积)


## 5-1 * 正交变换 Orthogonal Transforms

### 5-1-1 * 正交变换的一般形式 General Form

#### 1. 正交变换 Orthogonal Transforms

正交变换是一类在信号处理、数据分析和线性代数中至关重要的线性变换。其核心特征是**保持向量的内积不变**，从而完美保留了数据的几何结构。


对于任意两个向量 $\mathbf{u}$ 和 $\mathbf{v}$，一个线性变换 $T$ 是正交的当且仅当：

$$ \langle T(\mathbf{u}), T(\mathbf{v})\rangle = \langle\mathbf{u},\mathbf{v}\rangle $$

其中 $\langle\cdot,\cdot\rangle$ 表示向量的内积（点积）。


正交变换具有以下重要特性：

- **保长度（保范数）**：$\|T(\mathbf{v})\| = \|\mathbf{v}\|$
- **保夹角**：变换后任意两个向量的夹角保持不变
- **保正交性**：原本正交（垂直）的向量对，变换后依然正交


#### 2. 正交变换的一般形式

一个一般形式的正交变换对可表示为：

分析式 Analysis Equation：

$$
X[k] = \sum_{n = 0}^{N} x[n] \psi^* [k, n]
$$

合成式 Synthesis Equation：

$$
x[n] = \sum_{k = 0}^{N} X[k] \psi[k, n]
$$

$\psi[k,n]$ —— **基序列**，在两个域中都是长度为 $N$ 的序列，并且满足如下正交关系：

$$
\frac{1}{N}\sum_{n=0}^{N-1}\psi[k,n]\psi^*[l,n]
=
\begin{cases}
1, & l = k \\
0, & l \ne k
\end{cases}
$$

> [!TIP]
> $e^{j \omega n}$ 就满足这个。


---


### 5-1-2 * 离散傅里叶级数 Discrete Fourier Series, DFS

假设有一个周期 DT 信号：

$$
\tilde{x} [n] = \tilde{x} [n + rN], \quad   n \in \mathbb{Z}, \quad r \in \mathbb{N^+}
$$

我们选用如下正交函数集对其进行变换：

$$
y[k, n] = e^{j (\frac{2\pi}{N})kn}, \quad k \in \{ 0, 1,2,\dots,N-1\}
$$

为了简化表达式，我们定义**核函数 Kernel** $\; W_N^{kn} = e^{-j (\frac{2\pi}{N})kn}$ ；

综上，可得变换对：

$$
\begin{cases}
\tilde{x}[n] = \frac{1}{N} \sum_{k = 0}^{N-1} \tilde X[k] e^{j (\frac{2\pi}{N})kn} = \frac{1}{N} \sum_{k = 0}^{N-1} \tilde X[k] W_N^{kn} \\
\\
\tilde{X} [k] = \sum_{n = 0}^{N-1} \tilde x[n] e^{-j (\frac{2\pi}{N})kn} = \sum_{n = 0}^{N-1} \tilde x[k] W_N^{-kn}
\end{cases}
$$

即**离散傅里叶级数 Discrete Fourier Series, DFS**。

\
其变换可以简单记为：

$$
\tilde {x} [n] \xLeftrightarrow{} \tilde{X} [k] \\

\text{或} \\


\begin{cases}
\tilde{X} [k] = \mathrm{DFS} \{\tilde x[n] \} \\
\\
\tilde{x} [n] = \mathrm{IDFS} \{\tilde X[k] \} 
\end{cases}
$$


> [!NOTE]
> 在 DFS 中，基函数
> $$
> \psi[k,n] = e^{j\frac{2\pi}{N}kn}
> $$
> 具有以下几个基本性质：
>
> 1. **时域周期性**：对固定的 $k$，$\psi[k,n]$ 关于 $n$ 的周期为 $N$。
> 2. **直流与谐波含义**：$\psi[0,n]=1$ 表示 **DC 分量**，而 $\psi[k,n]$ 表示第 $k$ 个谐波分量。
> 3. **正交性**：不同的基函数在一个周期内两两正交，即
>    $$
>    \sum_{n=0}^{N-1}\psi[k,n]\psi^*[l,n]
>    =
>    \begin{cases}
>    N, & l=k+rN \\
>    0, & l\ne k+rN
>    \end{cases}
>    $$
>    这保证了不同频率分量可以被独立分离。
> 4. **频域索引周期性**：$\psi[k+N,n]=\psi[k,n]$，说明频率索引 $k$ 也是以 $N$ 为周期重复的，因此只需考虑 $k=0,1,\dots,N-1$。
> 5. **DFS 变换对**：周期序列 $\tilde{x}[n]$ 与其 DFS 系数 $\tilde{X}[k]$ 构成一一对应关系：
>    $$
>    \tilde{x}[n] \Longleftrightarrow \tilde{X}[k]
>    $$
>    即可通过 DFS 分析，也可通过 IDFS 重建原序列。

### 5-1-3 常见 DFS 变换对


| 时域序列 $x[n]$ (长度 $N$) | 频域序列 $X[k]$ (DFT) | 说明与条件 |
| :--- | :--- | :--- |
| $\delta[n]$ | $1$ | 单位采样序列，$0 \le n \le N-1$ |
| $1$ | $N \delta[k]$ | 常数序列，$X[0]=N$，其余为0 |
| $e^{j 2\pi m n / N}$ | $N \delta[k - m]$ | 复指数序列，$m$ 为整数，$0 \le m \le N-1$ |
| $\cos(2\pi m n / N + \phi)$ | $\frac{N}{2} [e^{j\phi} \delta[k-m] + e^{-j\phi} \delta[k-(N-m)]]$ | 余弦序列 |
| $\sin(2\pi m n / N + \phi)$ | $\frac{N}{2j} [e^{j\phi} \delta[k-m] - e^{-j\phi} \delta[k-(N-m)]]$ | 正弦序列 |
| $a^n$ (若 $\|a\| < 1$) | $\frac{1 - a^N}{1 - a e^{-j 2\pi k / N}}$ | 有限长指数序列，$0 \le n \le N-1$ |
| $n$ | $\frac{N(N-1)}{2} \delta[k] - \frac{N}{1 - a e^{-j 2\pi k / N}}$ (当 $k \neq 0$) | 斜坡序列，$X[0] = \frac{N(N-1)}{2}$ |
| 矩形脉冲：<br>$x[n] = 1,\ 0 \le n \le L-1$<br>$L \le N$ | $e^{-j\pi k (L-1)/N} \cdot \frac{\sin(\pi k L / N)}{\sin(\pi k / N)}$ | Dirichlet 核形式 |





## 5-2 离散傅里叶变换 Discrete Fourier Transform, DFT

### 5-2-1 DFT 的定义

直接给出 DFT 和 IDFT 的计算公式：


$$
\mathrm{DFT\; /\; IDFT}\;
\begin{cases}
{x}[n] = \frac{1}{N} \sum_{k = 0}^{N-1} X[k] W_N^{kn} \\
\\
{X} [k] = \sum_{n = 0}^{N-1} x[k] W_N^{-kn}
\end{cases}
$$


> [!TIP]
> 我们注意到一点：DFT 和 DFS 在形式上 **完全相同**。
>
> 也就是说，DFT 的过程暗含了对原始有限序列的周期延拓，这是 DFT 的数学结构所决定的。
>
> 同时也不难想到，一段 DFT 序列是无法被区分来自有限序列还是它的周期延拓。

---

### 5-2-2 矩阵关系 Matrix Relation

再次观察 DFT 的计算公式：

$$
{X} [k] = \sum_{n = 0}^{N-1} x[k] W_N^{-kn}
, \quad k \in \{ 0, 1,2,\dots,N-1\}
$$

我们发现该公式的一个特点，即求序列的 DFT 在计算上等效为对 $k$ 的加权求和。

同时等号左右两侧均为序列运算，因此自然地想到将 $X[k]$ 和 $x[n]$ 等效为两个向量 $\mathbf{X}$ 和 $\mathbf{x}$ ，用一个方阵 $\mathbf D$ 来代替求和。因此原式可改写为：


$$
\mathbf{X} = \mathbf{D}_N \mathbf x
$$

；同理， IDFT可写为：

$$
\mathbf{x} = \mathbf{D}_N^{-1} \mathbf X
$$

。

其中，两矩阵分别为：

$$
\mathbf D_N=
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & W_N^1 & W_N^2 & \cdots & W_N^{N-1}\\
1 & W_N^2 & W_N^4 & \cdots & W_N^{2(N-1)}\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
1 & W_N^{N-1} & W_N^{2(N-1)} & \cdots & W_N^{(N-1)^2}
\end{bmatrix}
$$

和

$$
\mathbf D_N^{-1}
=
\frac{1}{N}
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & W_N^{-1} & W_N^{-2} & \cdots & W_N^{-(N-1)}\\
1 & W_N^{-2} & W_N^{-4} & \cdots & W_N^{-2(N-1)}\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
1 & W_N^{-(N-1)} & W_N^{-2(N-1)} & \cdots & W_N^{-(N-1)^2}
\end{bmatrix}
$$

> [!TIP]
> 这样的形式说明 DFT 是一个 坐标变换 / 基变换。
>
>可以这样理解：
> - $\mathbf x$ 是信号在“时域标准基”下的坐标；
> - $\mathbf X$ 是信号在“傅里叶基”下的坐标；
>$\mathbf D_N$ 就是从时域坐标变到频域坐标的变换矩阵。

两矩阵间存在如下运算关系：

$$
\mathbf D_N^{-1}=\frac{1}{N}\mathbf D_N^{H}
$$

> [!NOTE]
>
> 这一性质很重要，因为它表明：
>
> 1. **DFT 矩阵是可逆的**；
> 2. **DFT 的逆运算结构非常简单**；
> 3. **构成 DFT 的复指数基之间彼此正交**。
>
> 如果进一步把 DFT 矩阵归一化为
> $$
> U=\frac{1}{\sqrt{N}}D_N
> $$
> 那么 $U$ 就是一个**酉矩阵 Unitary Matrix 或者幺正矩阵**，满足
> $$
> U^{-1}=U^{H}
> $$
> 这在线性代数和信号处理中都非常重要。

## 5-3 DFT 和 DTFT 的关系

### 5-3-1 从 DTFT 得到 DFT

在 DFFT 的频谱上，以 $\frac{2 \pi}{N}$ 为间隔，采样 $N$ 个点，得到的序列即为原序列的 DFT。

#### 1. 数学证明

首先，我们有 DTFT 的表达式：

$$
X(e^{j\omega})=\sum_{n=-\infty}^{\infty}x[n]e^{-j\omega n}
$$

由于 DFT的操作对象是有限长序列，假设其序列分布在区间 $0 \le n \le N-1$ ，可以缩减求和上下限至：

$$
X(e^{j\omega})=\sum_{n=0}^{N - 1}x[n]e^{-j\omega n}
$$

然后，对 $X(e^{j\omega})$ 以 $\frac{2 \pi}{N}$ 为周期采样，即：

$$
X[k] = \left. X(e^{j \omega}) \right|_{\omega = \frac{2 \pi k}{N}} 
$$

带入可得

$$
\boxed{

X[k] = \sum_{n=0}^{N - 1}x[n]e^{-j (\frac{2\pi}{N}) kn }

}
$$

证毕。

#### 2. 在复数坐标上的理解

由于 DTFT 为一个周期为 $2\pi$ 的周期序列，我们可以通过将其对应到复平面上的一个圆。 $\omega$ 不断增大的过程，也就是 DTFT 函数在这个圆上不断旋转的过程。

而 DFT 就是以 $\frac{2 \pi}{N}$ 为间隔，在圆上取采样点，如下图所示。

![alt text](<DSP Chapter 5.attachments/1773571917238.png>)

---

### 5-3-2 插值 DFT 以得到 DTFT

在 Chapter 3 II 中，我们已经证明了一个模拟信号在恰当的采样条件下，其采样所得的离散序列携带着原模拟信号的全部信息，可以通过恰当的方式完美恢复出原始信号。

而上一小节又提及 DFT 可以视作对 DTFT 在频域的等距采样。也就是说，采用类似的方法，在一定条件下，直觉上我们可以通过某些方式从 DFT 序列中恢复出 DTFT 频域信息。

#### 1. 数学证明


对于长度为 $N$ 的有限长序列 $x[n]$，其 DTFT 为

$$
X(e^{j\omega})=\sum_{n=0}^{N-1}x[n]e^{-j\omega n}
$$

由 IDFT 公式

$$
x[n]=\frac{1}{N}\sum_{k=0}^{N-1}X[k]W_N^{-kn}
$$

代入上式，可得

$$
X(e^{j\omega})
=
\sum_{n=0}^{N-1}
\left\{
\frac{1}{N}\sum_{k=0}^{N-1}X[k]W_N^{-kn}
\right\}
e^{-j\omega n}
$$

交换求和次序，得到

$$
X(e^{j\omega})
=
\frac{1}{N}\sum_{k=0}^{N-1}X[k]\sum_{n=0}^{N-1}W_N^{-kn}e^{-j\omega n}
$$


有

$$
W_N^{-kn}e^{-j\omega n}
=
e^{-j\left(\omega-\frac{2\pi k}{N}\right)n}
$$

于是可写成

$$
X(e^{j\omega})
=
\sum_{k=0}^{N-1}X[k]
\left\{
\frac{1}{N}\sum_{n=0}^{N-1}
e^{-j\left(\omega-\frac{2\pi k}{N}\right)n}
\right\}
$$

定义插值核

$$
\Phi_k(\omega)
=
\frac{1}{N}\sum_{n=0}^{N-1}
e^{-j\left(\omega-\frac{2\pi k}{N}\right)n}
$$

则有

$$

\boxed{
X(e^{j\omega})=\sum_{k=0}^{N-1}X[k]\Phi_k(\omega)

}
$$

基于上述推导，我们证明了 DTFT 可由 DFT 的加权和完全恢复。

---

### 5-3-3 DTFT 采样

对一个长度为 M 的离散序列及其 DTFT ，考虑如下操作：

$$
x[n] \xleftrightarrow{DTFT} X(e^{j \omega})
$$

对频域表达式进行 N 点采样：

$$
Y[k] = \left. X(e^{j \omega}) \right|_{\omega = 2 \pi k/ N}
$$

再对采样后的序列做 IDFT：

$$
Y[k] \xleftrightarrow{IDFT} y[n]
$$

这里得到的新序列与原序列的关系为：

$$
y[n] = \sum_{r = -\infty}^{\infty} x[n - rN], \quad 0 \le n \le N-1
$$


把 DTFT 在频域上每隔采一个点，相当于把时域序列按间隔 $\frac{2 \pi}{N}$ 折叠起来，相同模 N 的样本全部加到一起。


> [!NOTE]
> 对于
> $$
> y[n]=\sum_{m=-\infty}^{\infty}x[n+mN],\qquad 0\le n\le N-1
> $$
> 分两种情况：
>
> 1. **当 $M\le N$ 时**  
>    原序列在按周期 $N$ 折叠时不会发生重叠，因此
>    $$
>    y[n]=x[n],\qquad 0\le n\le N-1
>    $$
>    即频域采样后再做 IDFT，可以无失真恢复原序列这一段。
>
> 2. **当 $M>N$ 时**  
>    原序列中相隔 $N$ 的样本会折叠到同一个位置并相加，因此
>    $$
>    y[n]\neq x[n]
>    $$
>    此时会发生 **时域混叠 Time-domain Aliasing**，原序列不能由 $y[n]$ 唯一恢复。


### 5-3-4 DTFT v.s. DFS v.s. DFT

![alt text](<DSP Chapter 5.attachments/1773576202466.png>)


| Time domain | Transform | Frequency domain |
|---|---|---|
| Continuous Aperiodical | CTFT | Continuous Aperiodical |
| Continuous Periodical | FS | Aperiodical Discrete |
| Discrete Aperiodical | DTFT | Periodical Continuous |
| Discrete & Periodical | DFS | Periodical & Discrete |



## 5-4 有限序列的运算

有限序列中主要有三种循环运算：

- Circular Shift：循环移位
- Circular Reversal：循环反转
- Circular Convolution：循环卷积 / 圆卷积

在讲解之前，我们定义如下运算:

$$
\langle \cdot \rangle _N \; \xLeftrightarrow{} \cdot \; \mathrm{mod} \; N
$$

即取模运算 Modulo Operation，计算除以 $N$ 后的余数。

### 5-4-1 循环移位 Circular Shift

我们定义循环移位操作：

$$
x[\langle n - n_0 \rangle _N] =

\begin{cases}
x[n - n_0] & \text{for } n_0 \le n \le N-1 \\
\\
x[n - n_0 +N] & \text{for } 0 \le n \lt n_0 \\


\end{cases}

$$

也就是当进行移位时，用另一侧的序列填补移位造成的空白部分。

![alt text](<DSP Chapter 5.attachments/1773589076810.png>)

---

### 5-4-2 循环反转 Circular Reversal

循环反转数学定义为

$$
x[\langle -n \rangle _N] =

\begin{cases}
0 & n=0 \\

\\

x[-n + N] & 1 \le n \le N-1 
\end{cases}
$$

![alt text](<DSP Chapter 5.attachments/1773625416558.png>)

> [!TIP]
>
> 实际上，循环移位和循环反转都可以用以下步骤进行：
>
> 1. 将 $x[n]$ 以序列长度 $N$ 为周期， 延拓为周期函数 $\tilde x[n]$
> 2. 进行正常的线性移位 / 反转
> 3. 只取 $0 \le n \le N-1$ 范围的值，其余部分全部设 0。
>
> （假装他是个周期函数）


---

### 5-4-3 循环卷积 / 圆卷积 Circular Convolution

#### 1. 定义

假设有两个有限序列 $x[n]$ 和 $h[n]$ ，长度均为 $M$，

首先看线性卷积：

$$
y_L[n] = x[n] * h[n] = \sum_{k = -\infty}^{\infty} x[k] h [k-n]
$$

熟悉地，这个卷积会得到一个长度为 $2N -1$ 的序列。

通过与前面类似的定义，有圆卷积：

$$
y_L[n] = x[n] \circledast h[n] = \sum_{k = -\infty}^{\infty} x[k] h [\langle k-n \rangle _N]
$$

而这个操作会得到一个**长度为 $N$ 的序列**。


> [!NOTE]
> 对于两个长度不同的序列，不能脱离长度参数直接圆卷积。圆卷积本质上是 **$N$ 点圆卷积**，必须先把两个序列都放到同一个长度为 $N$ 的“圆环”上。
>
> 设
> $$
> x[n],\quad 0 \le n \le L-1
> $$
> 和
> $$
> h[n],\quad 0 \le n \le M-1
> $$
> 它们的长度分别为 $L$ 和 $M$。若要做圆卷积，必须先指定一个共同长度 $N$，将它们扩展或补零为长度 $N$ 的序列 $x_N[n]$ 和 $h_N[n]$，然后定义
> $$
> y_N[n] = \sum_{m=0}^{N-1} x_N[m]\,h_N[\langle n-m\rangle_N],
> \qquad n=0,1,\dots,N-1
> $$
>
> 这也是为什么在 DFT/FFT 体系里，频域逐点相乘对应的不是线性卷积，而是圆卷积；因为 DFT 默认把序列看成周期为 $N$ 的序列。

![alt text](<DSP Chapter 5.attachments/1773627275379.png>)

#### 2. 圆卷积的矩阵表示

再次观察圆卷积的数学定义：

$$
y_L[n] = x[n] * h[n] = \sum_{k = -\infty}^{\infty} x[k] h [k-n]
$$

与 DFS 类似，可以将圆卷积看作一个 $N$ 输入 $N$ 输出的线性变换。因此可以使用一个矩阵来表示圆卷积的过程：

$$
\begin{bmatrix}
y_C[0]\\
y_C[1]\\
y_C[2]\\
\vdots\\
y_C[N-1]
\end{bmatrix}
=
\begin{bmatrix}
h[0] & h[N-1] & h[N-2] & \cdots & h[1]\\
h[1] & h[0] & h[N-1] & \cdots & h[2]\\
h[2] & h[1] & h[0] & \cdots & h[3]\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
h[N-1] & h[N-2] & h[N-3] & \cdots & h[0]
\end{bmatrix}
\begin{bmatrix}
g[0]\\
g[1]\\
g[2]\\
\vdots\\
g[N-1]
\end{bmatrix}
$$

简单记为：

$$
\boxed{
\mathbf{y}_C=\mathbf{H}_c\mathbf{g}
}
$$

其中：

$$
\mathbf{y}_C=
\begin{bmatrix}
y_C[0]\\
y_C[1]\\
y_C[2]\\
\vdots\\
y_C[N-1]
\end{bmatrix},
\qquad
\mathbf{g}=
\begin{bmatrix}
g[0]\\
g[1]\\
g[2]\\
\vdots\\
g[N-1]
\end{bmatrix}
$$

$$
\mathbf{H}_c=
\begin{bmatrix}
h[0] & h[N-1] & h[N-2] & \cdots & h[1]\\
h[1] & h[0] & h[N-1] & \cdots & h[2]\\
h[2] & h[1] & h[0] & \cdots & h[3]\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
h[N-1] & h[N-2] & h[N-3] & \cdots & h[0]
\end{bmatrix}
$$


## 5-5 * 有限序列的分类

### 5-5-1 * 基于共轭对称 Conjugate Symmetry

#### 1. 循环共轭对称 / 循环共轭反对称

定义：

- 循环共轭对称： 

$$
x[n] = x^*[\langle -n \rangle _N] = x^*[\langle N -n \rangle _N]
$$

- 循环共轭反对称:

$$
x[n] = - x^*[\langle -n \rangle _N] = - x^*[\langle N -n \rangle _N]
$$

#### 2. 信号的对称表示

一个 $N$ 点复信号可以被拆分成：

$$
x[n] = x_{cs} [n] + x_{as} [n]
$$

其中 $x_{cs} [n]$ 和 $x_{as} [n]$ 分别为**其循环共轭对称部分**和**循环反对称部分**。

$$
\boxed{
\begin{aligned}
x_{cs}[n] = \frac{1}{2}(x[n]+ x^*[\langle -n \rangle _N])

\\


x_{cs}[n] = \frac{1}{2}(x[n]+ x^*[\langle -n \rangle _N])

\end{aligned}
}
$$  


<br>
<br>

一个 $N$ 点实信号可以被拆分成：

$$
x[n] = x_{ev} [n] + x_{od} [n]
$$

其中 $x_{ev} [n]$ 和 $x_{od} [n]$ 分别为**其循环奇部分**和**循环偶部分**。


$$
\boxed{
\begin{aligned}
x_{ev}[n] = \frac{1}{2}(x[n]+ x[\langle -n \rangle _N])

\\


x_{od}[n] = \frac{1}{2}(x[n]+ x[\langle -n \rangle _N])

\end{aligned}
}
$$

---

### 5-5-2 * 基于几何对称 Geometric Symmetry

#### 1. 两种常用的几何对称定义

- 对称序列 Symmetric Sequence：关于中点左右两边的样本相等。

$$
x[n] = x[N - 1 -n]
$$

- 反对称序列 Antisymmetric Sequence：关于中点左右两边的样本大小相等、符号相反。

$$
x[n] = - x[N - 1 -n]
$$

因为序列长度 $N$ 可能是奇数，也可能是偶数，所以“对称/反对称”再和“奇长/偶长”组合起来，一共就有四类。


#### 2. 四种几何对称的类型

通常分为以下四类：

- Type 1: Symmetric, odd length

$$
h[n]=h[N-1-n], \qquad N \text{ 为奇数}
$$

- Type 2: Symmetric, even length

$$
h[n]=h[N-1-n], \qquad N \text{ 为偶数}
$$

- Type 3: Antisymmetric, odd length

$$
h[n]=-h[N-1-n], \qquad N \text{ 为奇数}
$$

其中中间点必须满足

$$
h\left[\frac{N-1}{2}\right]=0
$$

- Type 4: Antisymmetric, even length

$$
h[n]=-h[N-1-n], \qquad N \text{ 为偶数}
$$


## 5-6 DFT 性质

| 类别 | 长度为 $N$ 的序列 / 条件 | $N$ 点 DFT / 对应关系 |
|---|---|---|
| 复序列 | $x[n]$ | $X[k]$ |
| 复序列 | $x^{*}[n]$ | $X^{*}[\langle -k \rangle_N]$ |
| 复序列 | $x^{*}[\langle -n \rangle_N]$ | $X^{*}[k]$ |
| 复序列 | $\operatorname{Re}\{x[n]\}$ | $X_{cs}[k]=\dfrac{X[\langle k \rangle_N]+X^{*}[\langle -k \rangle_N]}{2}$ |
| 复序列 | $j\operatorname{Im}\{x[n]\}$ | $X_{ca}[k]=\dfrac{X[\langle k \rangle_N]-X^{*}[\langle -k \rangle_N]}{2}$ |
| 复序列 | $x_{cs}[n]$ | $\operatorname{Re}\{X[k]\}$ |
| 复序列 | $x_{ca}[n]$ | $j\operatorname{Im}\{X[k]\}$ |
| 实序列 | 实序列 $x[n]$ | $X[k]=\operatorname{Re}\{X[k]\}+j\operatorname{Im}\{X[k]\}$ |
| 实序列 | $x_{ev}[n]$ | $\operatorname{Re}\{X[k]\}$ |
| 实序列 | $x_{od}[n]$ | $j\operatorname{Im}\{X[k]\}$ |
| 实序列的频域对称关系 | $x[n]$ 为实序列 | $X[k]=X^{*}[\langle -k \rangle_N]$ |
| 实序列的频域对称关系 | $x[n]$ 为实序列 | $\operatorname{Re}\{X[k]\}=\operatorname{Re}\{X[\langle -k \rangle_N]\}$ |
| 实序列的频域对称关系 | $x[n]$ 为实序列 | $\operatorname{Im}\{X[k]\}=-\operatorname{Im}\{X[\langle -k \rangle_N]\}$ |
| 实序列的频域对称关系 | $x[n]$ 为实序列 | $\lvert X[k]\rvert=\lvert X[\langle -k \rangle_N]\rvert$ |
| 实序列的频域对称关系 | $x[n]$ 为实序列 | $\arg X[k]=-\arg X[\langle -k \rangle_N]$ |

> [!NOTE]
> $x[n]$ 为复序列时，$x_{cs}[n]$ 和 $x_{ca}[n]$ 分别表示 $x[n]$ 的**圆共轭对称部分**和**圆共轭反对称部分**。  
> $x[n]$ 为实序列时，$x_{ev}[n]$ 和 $x_{od}[n]$ 分别表示 $x[n]$ 的**圆偶部分**和**圆奇部分**。



## 5-7 DFT 定理

设长度为 $N$ 的序列与其 $N$ 点 DFT 分别为

$$
g[n] \;\xleftrightarrow{\text{DFT}}\; G[k], \qquad
h[n] \;\xleftrightarrow{\text{DFT}}\; H[k]
$$

则常见性质可写为：

| 性质类型 | 长度为 $N$ 的序列 | $N$ 点 DFT |
|---|---|---|
| 线性性 Linearity | $a g[n] + b h[n]$ | $a G[k] + b H[k]$ |
| 圆周时移 Circular Time-shifting | $g[\langle n-n_0\rangle_N]$ | $W_N^{k n_0} G[k]$ |
| 频移 Frequency-shifting | $W_N^{-k_0 n} g[n]$ | $G[\langle k-k_0\rangle_N]$ |
| 对偶性 Duality | $G[n]$ | $N\,g[\langle -k\rangle_N]$ |
| 圆卷积 Circular Convolution | $\displaystyle \sum_{m=0}^{N-1} g[m]\,h[\langle n-m\rangle_N]$ | $G[k]\,H[k]$ |
| 调制 Modulation | $g[n]\,h[n]$ | $\displaystyle \frac{1}{N}\sum_{m=0}^{N-1} G[m]\,H[\langle k-m\rangle_N]$ |
| 帕塞瓦尔关系 Parseval's relation | $\sum_{n=0}^{N-1} \lvert x[n] \rvert ^2$ | $\displaystyle \frac{1}{N}\sum_{k=0}^{N-1} \lvert X[k] \rvert ^2$ |

其中

$$
W_N = e^{-j\frac{2\pi}{N}}
$$

且 $\langle \cdot \rangle _N$ 表示对 $N$ 取模。


## 5-8 * 傅里叶域滤波 Fourier-Domain Filtering

频域滤波是指先将离散时间信号变换到频域，在频域中通过乘以滤波器的频率响应来抑制或去除不需要的频率分量，然后再变换回时域得到滤波结果。其理论基础是卷积定理：

$$
y[n]=\sum_{m=-\infty}^{\infty} g[m]\,h[n-m]
\quad \Longleftrightarrow \quad
Y(e^{j\omega})=G(e^{j\omega})H(e^{j\omega})
$$

实际中常用 DFT/FFT 实现频域滤波，因为频域乘法比时域直接卷积更高效。

若 $g[n]$ 和 $h[n]$ 都是实值信号，则理论上反变换结果 $y[n]$ 也应为实数；实际计算中出现的极小虚部通常只是数值误差，因此一般取实部作为最终输出。

需要注意的是，基于 DFT 的滤波由于有限长度和离散频域采样，往往会带来一些小波纹；若零填充不足，还可能得到圆卷积而不是线性卷积。


## 5-9 * 实序列计算 DFT

前面的推导，计算和性质中， DFT 大多是以处理复序列为目的。

然而在实际应用中， DFT 处理的对象一般为实序列 Real Sequence。


对实序列做 DFT 时，注意到其有一非常美丽的性质，即共轭循环对称性：

$$
X[k] = X[\langle -k \rangle _ N ]
$$

通过这种性质，我们可以使用一些优雅且巧妙的方式，简化实际计算中的 DFT 。

---

### * 5-9-1 两个实序列共用一次 N 点 DFT

考虑两个长度均为 $N$ 的实序列及其 DFT ：

$$
g[n] \xleftrightarrow{DFT} G[k] \quad \quad
h[n] \xleftrightarrow{DFT} H[k]
$$

打包成复序列，做一次 N 点 DFT：

$$
\begin{aligned}
x[n] &= g[n] + jh[n]\\
\\

\end{aligned}
$$

$$
x[n]  \xleftrightarrow{DFT} X[k] = G[k]+jH[k] \quad \text{(DFT 具有线性性)}
$$

由于 $g[n]$ 和 $h[n]$ 都是实序列，所以它们的频谱满足共轭对称：


$$
X[k] + X^{*}[\langle -k \rangle_N]
=
\left(G[k] + jH[k]\right) + \left(G[k] - jH[k]\right)
=
2G[k]
$$

$$
X[k] - X^{*}[\langle -k \rangle_N]
=
\left(G[k] + jH[k]\right) - \left(G[k] - jH[k]\right)
=
2jH[k]
$$



于是可以把它们从 $X[k]$ 中分离出来：


$$
\boxed{
\begin{aligned}
G[k] = \frac{1}{2}(X[k]+ X^*[\langle -k \rangle _N])

\\


H[n] = \frac{1}{2}(X[n]+ X^*[\langle -k \rangle _N])

\end{aligned}
}
$$  


---

### * 5-9-2 用一次 N 点 DFT 求一个 2N 点实序列的 DFT


现设有一个长度为 $2N$ 的实序列

$$
v[n]
$$

它的 $2N$ 点 DFT 记为

$$
V[k]
$$

可以将它拆成两个长度为 $N$ 的实序列：

$$
g[n]=v[2n], \qquad h[n]=v[2n+1]
$$

其中：

- $g[n]$ 是偶序号样本序列
- $h[n]$ 是奇序号样本序列

则有关系式

$$
V[k]=G[\langle k\rangle_N]+W_{2N}^k\,H[\langle k\rangle_N]
$$

其中

$$
W_{2N}=e^{-j\frac{2\pi}{2N}}
$$

这说明，一个 $2N$ 点 DFT 可以分解为：

- 偶序列 $g[n]$ 的 $N$ 点 DFT
- 奇序列 $h[n]$ 的 $N$ 点 DFT
- 再乘以旋转因子组合起来

这实际上就是将长序列的 DFT 分解成更短 DFT 的基本思想，也是 FFT 偶奇分解的核心形式之一。


## 5-10 使用 DFT 计算线性卷积

### 5-10-1 两个有限长序列的线性卷积

有限序列的 DFT 天然对应的是圆卷积，因此如果直接对两个序列做卷积再求和，只会得到圆卷积的结果。因此如果我们想要使用 DFT 计算两个序列的线性卷积，就需要一些特殊的步骤。


考虑如下两个有限序列，其长度分别为 $N$ 和 $M$ ：

$$
g[n]  \quad \quad
h[n] 
$$

1. 将两个序列进行补零，直到二者长度相同且满足：

$$
L \ge N + M-1
$$

，通常取等号。


2. 分别做 $N+M-1$ 点的 DFT ，再相乘得到线性卷积的 DFT：

$$

g_e[n] \;\xleftrightarrow{\text{DFT}}\; G_e[k], \qquad
h_e[n] \;\xleftrightarrow{\text{DFT}}\; H_e[k]

$$

$$
Y[k] = G_e[k]H_e[k]
$$


3. 对结果做 IDFT ，得到线性卷积结果。

$$
Y[k] = G_e[k]H_e[k] \;\xleftrightarrow{\text{IDFT}}\; y[n]
$$

上述计算过程可表示为

![alt text](<DSP Chapter 5.attachments/1773644408858.png>)




> [!TIP]
>
> 使用这种方法计算线性卷积的原理为：
>
> 只要 DFT 长度满足
> $$L \ge N + M-1$$
> 圆卷积就不会发生混叠，于是圆卷积结果就等于线性卷积。


---

### 5-10-2 循环前缀 The Cyclic Prefix

DFT / IDFT 天然对应的是 圆卷积，但真实信道或普通滤波通常产生的是 线性卷积。
循环前缀的目的，就是想办法让“接收端关心的那一段线性卷积结果”看起来像“圆卷积结果”，这样就可以直接用 DFT 在频域里做简单乘法处理。

把一个长度为 $N$ 的序列最后一小段复制出来，放到序列最前面。



经过信道后，时域输出本来是输入序列与信道冲激响应的**线性卷积**：

$$
y[n]=x[n]*h[n]
$$

若循环前缀长度足够长，通常满足

$$
L\ge M-1
$$

其中 $M$ 是信道冲激响应 $h[n]$ 的长度，那么在接收端去掉循环前缀后，保留下来的那一段长度为 $N$ 的输出，就可以等效看成一个 **$N$ 点圆卷积**：

$$
y[n]=x[n]\circledast_N h[n]
$$

因此在频域中可写成

$$
Y[k]=X[k]H[k]
$$

这说明循环前缀的关键作用是：把原本复杂的时域线性卷积，转化为频域中的逐点相乘。这样接收端只需要做 DFT、频域乘法和 IDFT，就能高效完成信道作用或均衡处理。这也是循环前缀在 OFDM 等多载波通信中非常重要的原因。

---

### 5-10-3 有限长序列和无限长序列卷积

当输入信号 $x[n]$ 很长，甚至可以看成无限长时，如何用 DFT / FFT 高效计算卷积就成为一个不可忽视的问题，

也就是要计算

$$
y[n]=\sum_{\ell=0}^{M-1} h[\ell]\,x[n-\ell]=h[n]*x[n]
$$

其中 $h[n]$ 长度为 $M$，而 $x[n]$ 很长。

这种情况下，不能直接把整条 $x[n]$ 一次性做一个超长 FFT，所以要把长信号分块处理。课件给出了两种经典方法：

- **重叠相加 Overlap-Add**
- **重叠保留 Overlap-Save**


#### 1. 重叠相加 Overlap-Add


Overlap-Add 的思想是：**将输入序列分成若干个互不重叠的短块**，每一块分别与 $h[n]$ 做线性卷积，然后把各块输出中重叠的部分相加，得到最终结果。

设每块输入长度为 $N$，则可将 $x[n]$ 分解为

$$
x[n]=\sum_{m=0}^{\infty} x_m[n-mN]
$$

其中每个子序列 $x_m[n]$ 只在长度 $N$ 的区间内非零。对每一块分别计算

$$
y_m[n]=x_m[n]*h[n]
$$

由于 $x_m[n]$ 长度为 $N$，$h[n]$ 长度为 $M$，所以每个子卷积结果 $y_m[n]$ 的长度为

$$
N+M-1
$$

最后总输出写成

$$
y[n]=\sum_{m=0}^{\infty} y_m[n-mN]
$$

相邻两个子输出之间会有
$
M-1
$
个样本重叠，因此这些重叠部分需要**相加**，这就是 Overlap-Add 名称的由来。

**特点：**

- 输入分块之间**不重叠**
- 输出分块之间会**重叠**
- 重叠部分需要**相加**




#### 2. 重叠保留 Overlap-Save

Overlap-Save 的思想是：**将输入序列分成彼此重叠的块**，对每一块做圆卷积，然后保留其中与线性卷积一致的部分，丢弃被混叠污染的部分。

设滤波器长度为 $M$，每次取长度为 $N$ 的输入块，则相邻输入块之间需要重叠 $M-1$ 个样本。对每一块做 $N$ 点 DFT、频域乘法和 $N$ 点 IDFT，相当于计算一次 $N$ 点圆卷积。

由于圆卷积会产生时域混叠，因此每块输出的前
$
M-1
$
个样本通常是错误的，需要丢弃；后面的
$
N-M+1
$
个样本才是与线性卷积一致的有效结果。将各块保留下来的有效部分顺次拼接，就可以得到最终输出。

**特点：**

- 输入分块之间**有重叠**
- 输出块不需要相加
- 每块前面的污染部分直接**丢弃**
- 只保留后面正确的部分



