# 4 Multi-Symbol Stationary Information Source

<LyricCover
  image="IT-Lecture-4.attachments/1783163755502.jpg"
  title="Love 2000"
  artist="hitomi"
  lang="ja"
>
  <LyricLine
    original="愛(あい)はどこからやってくるのでしょう 自分(じぶん)の胸(むね)に問(と)いかけた，"
    translation="爱到底会从哪里来呢 在心里默默问自己，"
  />
  <LyricLine
    original="少(すこ)しずつだけどいろんな事(こと)が変(か)わって 私(わたし)はここにアル。"
    translation="就算我没变但世界一直在变 我应该活在当下吧。"
  />
</LyricCover>

## 章节目录


- [章节目录](#章节目录)
- [4-1 多符号信源 Multi-Symbol Information Source](#4-1-多符号信源-multi-symbol-information-source)
  - [4-1-1 多符号信源](#4-1-1-多符号信源)
  - [4-1-2 一二维平稳信源 1D and 2D Stationary Info. Source](#4-1-2-一二维平稳信源-1d-and-2d-stationary-info-source)
  - [4-1-3 离散平稳信源 Discrete Stationary Info. Source](#4-1-3-离散平稳信源-discrete-stationary-info-source)
- [4-2 无记忆信源 Memoryless Information Source](#4-2-无记忆信源-memoryless-information-source)
  - [4-2-1 无记忆信源 Memoryless Information Source](#4-2-1-无记忆信源-memoryless-information-source)
  - [4-2-2 N 阶扩展信源 Expanded Source of Order N](#4-2-2-n-阶扩展信源-expanded-source-of-order-n)
  - [4-2-3 无记忆扩展信源例题 Example](#4-2-3-无记忆扩展信源例题-example)
  - [4-2-4 扩展信源熵 Entropy of the Expanded Source](#4-2-4-扩展信源熵-entropy-of-the-expanded-source)
- [4-3 有记忆信源 Memory Information Source](#4-3-有记忆信源-memory-information-source)
  - [4-3-1 离散有记忆信源 Discrete Memory Info. Source](#4-3-1-离散有记忆信源-discrete-memory-info-source)
  - [4-3-2 二维离散有记忆信源 2D Discrete Memory Info. Source](#4-3-2-二维离散有记忆信源-2d-discrete-memory-info-source)
  - [4-3-3 二维信源性质 Properties of 2D Info. Source](#4-3-3-二维信源性质-properties-of-2d-info-source)
  - [4-3-4 N 维离散有记忆信源 N-D Discrete Memory Info. Source](#4-3-4-n-维离散有记忆信源-n-d-discrete-memory-info-source)
  - [4-3-5 熵率与极限熵 Entropy Rate and Entropy Limit](#4-3-5-熵率与极限熵-entropy-rate-and-entropy-limit)
  - [4-3-6 熵率例题 Example](#4-3-6-熵率例题-example)


## 4-1 多符号信源 Multi-Symbol Information Source


### 4-1-1 多符号信源

#### 多符号序列

通常，一个信源输出的是一个由随机符号组成的序列，序列中的随机符号相互间统计相关。我们使用向量来表示这样的一个序列：

$$
\mathbf{X} =
\begin{bmatrix}
X_1 & X_2 & X_3 & \cdots
\end{bmatrix}
$$

一般情况下，随机符号 $X_i$ 和 $X_{i+r}$ 在不同时刻有不同的统计学性质。

常见的多符号离散信源有：

- 英语： Hello, world!
- 摩斯电码


#### 平稳信源 Stationary Info. Source

::: definition 平稳信源 Stationary Information Source
对于一个随机向量 $\mathbf X$ ，如果其任意维度随机变量间的的联合概率不随时间变化，即其概率分布与时间无关，则产生这个随机向量的信源被称为**平稳信源 Stationary Information Source**。
:::



---

### 4-1-2 一二维平稳信源 1D and 2D Stationary Info. Source

#### 一维平稳信源

::: definition 一维平稳信源 1D Stationary Info. Source
给定一个随机变量的序列
$
\mathbf{X} =
\begin{bmatrix}
X_1 & X_2 & X_3 & \cdots
\end{bmatrix}
$
，如果其在任何时刻都有如下的概率分布

$$
\begin{aligned}
P(X_i = a_1) = P&(X_j = a_1) = p(a_1) \\
P(X_i = a_2) = P&(X_j = a_2) = p(a_2) \\
&\cdots \\
P(X_i = a_n) = P&(X_j = a_n) = p(a_n)
\end{aligned}
$$


则我们称该信源为一个 **一维平稳信源 1D Stationary Info. Source**。

:::

#### 二维离散信源

::: definition 二维离散信源 2D Stationary Info. Source
信源的所有一维和二维的概率都不随时间变化，称其为一个二维离散信源。

$$
P(X_i X_{i+1}) = P(X_j X_{j+1}) , \quad \forall i, \, j \in \mathbb Z , \; i \neq j
$$

:::


---

### 4-1-3 离散平稳信源 Discrete Stationary Info. Source

::: definition 离散平稳信源 Discrete Stationary Information Source
若离散信息源 $X$ 的任意有限维概率分布都与时间无关，则称该信源为**离散平稳信源 Discrete Stationary Information Source**。
:::

对任意两个时刻 $i$ 与 $j$，一维概率分布相同：

$$
P(X_i)=P(X_j).
$$

二维、三维到任意维的连续符号块概率分布也相同：

$$
P(X_iX_{i+1})=P(X_jX_{j+1}),
$$

$$
P(X_iX_{i+1}X_{i+2})
=
P(X_jX_{j+1}X_{j+2}),
$$

$$
\cdots
$$

$$
P(X_iX_{i+1}X_{i+2}\cdots X_{i+N})
=
P(X_jX_{j+1}X_{j+2}\cdots X_{j+N}).
$$

等价地，随机过程的任意有限维联合分布在时间平移后保持不变：

$$
\Pr\{X_1=x_1,X_2=x_2,\cdots,X_n=x_n\}
=
\Pr\{X_{1+\ell}=x_1,X_{2+\ell}=x_2,\cdots,X_{n+\ell}=x_n\}.
$$

该式对任意 $n$、任意时间平移 $\ell$ 以及所有 $x_1,x_2,\cdots,x_n\in\mathcal X$ 成立，其中 $\mathcal X$ 为信源字母表。

#### 1. 单符号离散信源模型

单符号离散信息源的数学模型为：

$$
\begin{bmatrix}
X \\
P(X)
\end{bmatrix}
=
\begin{bmatrix}
a_1 & a_2 & \cdots & a_n \\
p(a_1) & p(a_2) & \cdots & p(a_n)
\end{bmatrix},
\qquad
\sum_{i=1}^{n}p(a_i)=1.
$$

#### 2. 多符号离散信源模型

多符号离散信息源写作：

$$
X=X_1X_2\cdots X_N,
\qquad
X_1,X_2,\cdots,X_N\in\{a_1,a_2,\cdots,a_n\}.
$$

其数学模型为：

$$
\begin{bmatrix}
X \\
P(X)
\end{bmatrix}
=
\begin{bmatrix}
\alpha_1 & \alpha_2 & \cdots & \alpha_{n^N} \\
p(\alpha_1) & p(\alpha_2) & \cdots & p(\alpha_{n^N})
\end{bmatrix}.
$$

其中第 $k$ 个多符号消息为：

$$
\alpha_k=(a_{i_1},a_{i_2},\cdots,a_{i_N}),
\qquad
k=1,\cdots,n^N.
$$

指标满足：

$$
i_1,i_2,\cdots,i_N=1,\cdots,n.
$$

该多符号消息的发送概率为：

$$
p(\alpha_k)=p(a_{i_1}a_{i_2}\cdots a_{i_N}).
$$

所有多符号消息的概率满足：

$$
\sum_{k=1}^{n^N}p(\alpha_k)
=
\sum_{i_1=1}^{n}\sum_{i_2=1}^{n}\cdots\sum_{i_N=1}^{n}
p(a_{i_1}a_{i_2}\cdots a_{i_N})
=1.
$$

## 4-2 无记忆信源 Memoryless Information Source

### 4-2-1 无记忆信源 Memoryless Information Source

::: definition 无记忆信源 Memoryless Information Source
对离散平稳信源，若任意多符号消息中各符号相互独立，则称该信源为**无记忆信源 Memoryless Information Source**。
:::

对任意时刻 $i$，若多符号消息满足：

$$
P(X_iX_{i+1}\cdots X_{i+m})
=
P(X_i)P(X_{i+1})\cdots P(X_{i+m}),
$$

则消息内部各符号之间没有统计相关性。

设 $X\in\{0,1\}$ 是一个二元单符号信源。若每次从 $X$ 独立地产生两个符号并组合成一个消息，则得到二阶扩展信源：

$$
X^2\in\{00,01,10,11\}.
$$

若每次独立产生三个符号，则得到三阶扩展信源：

$$
X^3\in\{000,001,010,011,100,101,110,111\}.
$$

---

### 4-2-2 N 阶扩展信源 Expanded Source of Order N

单符号离散信源的数学模型为：

$$
\begin{bmatrix}
X \\
P(X)
\end{bmatrix}
=
\begin{bmatrix}
a_1 & a_2 & \cdots & a_n \\
p(a_1) & p(a_2) & \cdots & p(a_n)
\end{bmatrix},
\qquad
\sum_{i=1}^{n}p(a_i)=1.
$$

其 $N$ 阶无记忆扩展信源 $X^N$ 的数学模型为：

$$
\begin{bmatrix}
X^N \\
P(X^N)
\end{bmatrix}
=
\begin{bmatrix}
\alpha_1 & \alpha_2 & \cdots & \alpha_{n^N} \\
p(\alpha_1) & p(\alpha_2) & \cdots & p(\alpha_{n^N})
\end{bmatrix}.
$$

每个消息 $\alpha_k$ 都由 $X$ 独立生成的 $N$ 个符号组成。若：

$$
\alpha_k=(a_{i_1},a_{i_2},\cdots,a_{i_N}),
\qquad
i_1,\cdots,i_N=1,\cdots,n,
$$

则由无记忆性质：

$$
p(\alpha_k)
=
p(a_{i_1})p(a_{i_2})\cdots p(a_{i_N}).
$$

---

### 4-2-3 无记忆扩展信源例题 Example

:::: stem IT4-E1
给定单符号信源：

$$
\begin{bmatrix}
X \\
P(X)
\end{bmatrix}
=
\begin{bmatrix}
0 & 1 \\
\frac{1}{4} & \frac{3}{4}
\end{bmatrix}.
$$

1. 计算信源 $X$ 的熵；
2. 多符号信源 $\mathbf X$ 每次发送由 $X$ 独立生成的 $100$ 个符号组成的消息，计算 $\mathbf X$ 的熵。
::::

:::: solution
由熵的定义：

$$
\begin{aligned}
H(X)
&=
-\frac{1}{4}\log_2\frac{1}{4}
-\frac{3}{4}\log_2\frac{3}{4} \\
&=0.8113\ \mathrm{bit}.
\end{aligned}
$$

由于 $\mathbf X=X^{100}$ 是 $100$ 阶无记忆扩展信源：

$$
H(\mathbf X)
=H(X^{100})
=100H(X)
=81.1278\ \mathrm{bit}.
$$
::::

---

### 4-2-4 扩展信源熵 Entropy of the Expanded Source

对 $N$ 阶扩展信源 $\mathbf X=X^N$，其熵为：

$$
\begin{aligned}
H(\mathbf X)
&=H(X^N) \\
&=-\sum_{\alpha_k\in X^N}p(\alpha_k)\log_2 p(\alpha_k).
\end{aligned}
$$

若该扩展信源无记忆，则：

$$
\boxed{
H(X^N)=NH(X)
}
$$

证明时直接代入熵定义和无记忆性质：

$$
p(\alpha_k)=p(a_{i_1})p(a_{i_2})\cdots p(a_{i_N}).
$$

因此，扩展信源的熵可以由对应单符号信源的熵直接得到。$H(X^N)$ 表示一个 $N$ 符号消息平均携带的信息量。

## 4-3 有记忆信源 Memory Information Source

### 4-3-1 离散有记忆信源 Discrete Memory Info. Source

::: definition 离散有记忆信源 Discrete Memory Information Source
若离散平稳信源发送的符号之间存在统计相关性，则称该信源为**离散有记忆信源 Discrete Memory Information Source**。
:::

对 $N$ 维离散平稳有记忆信源 $\mathbf X$，其数学模型为：

$$
\begin{bmatrix}
\mathbf X \\
P(\mathbf X)
\end{bmatrix}
=
\begin{bmatrix}
\alpha_1 & \alpha_2 & \cdots & \alpha_{n^N} \\
p(\alpha_1) & p(\alpha_2) & \cdots & p(\alpha_{n^N})
\end{bmatrix}.
$$

其中：

$$
\alpha_k=(a_{i_1},a_{i_2},\cdots,a_{i_N}),
\qquad
k=1,\cdots,n^N.
$$

符号之间的相关性可由联合概率表示：

$$
p(\alpha_k)=p(a_{i_1}a_{i_2}\cdots a_{i_N}).
$$

也可以由条件概率表示。若信源已经发送符号序列 $\{a_{i_1},\cdots,a_{i_m}\}$，则下一符号为 $a_{i_{m+1}}$ 的概率写作：

$$
p(a_{i_{m+1}}\mid a_{i_1},\cdots,a_{i_m}).
$$

若当前符号只与前 $m$ 个符号相关，则该信源称为记忆长度为 $m$ 的 **Markov 信息源 Markov Information Source**。

---

### 4-3-2 二维离散有记忆信源 2D Discrete Memory Info. Source

设两个单符号离散信源 $X_1$ 与 $X_2$ 都从符号集合 $\{a_1,\cdots,a_n\}$ 中发送符号。二维离散平稳有记忆信源为：

$$
\mathbf X=X_1X_2.
$$

其消息空间为：

$$
\mathbf X\in
\{a_1a_1,\cdots,a_1a_n,\cdots,a_na_1,\cdots,a_na_n\}.
$$

每个二维消息可写作：

$$
\alpha_k=(a_{i_1},a_{i_2}),
\qquad
i_1,i_2=1,2,\cdots,n.
$$

其数学模型为：

$$
\begin{bmatrix}
\mathbf X \\
P(\mathbf X)
\end{bmatrix}
=
\begin{bmatrix}
\alpha_1 & \alpha_2 & \cdots & \alpha_{n^2} \\
p(\alpha_1) & p(\alpha_2) & \cdots & p(\alpha_{n^2})
\end{bmatrix}.
$$

其中：

$$
p(\alpha_k)=p(a_{i_1}a_{i_2}),
\qquad
1\le k\le n^2.
$$

这些概率共同构成完整概率空间。

---

### 4-3-3 二维信源性质 Properties of 2D Info. Source

二维信源 $\mathbf X=X_1X_2$ 的熵由链式法则给出：

$$
H(\mathbf X)
=H(X_1X_2)
=H(X_1)+H(X_2\mid X_1).
$$

若 $X_1$ 与 $X_2$ 相互独立，则：

$$
H(\mathbf X)
=H(X_1X_2)
=H(X_1)+H(X_2).
$$

若 $X_1$ 与 $X_2$ 独立同分布，且都等于单符号信源 $X$，则二维信源退化为二阶扩展信源：

$$
H(\mathbf X)
=H(X^2)
=2H(X).
$$

对于有记忆信源，相关性会降低平均不确定性：

$$
H(X_1X_2)\le H(X_1)+H(X_2).
$$

---

### 4-3-4 N 维离散有记忆信源 N-D Discrete Memory Info. Source

对 $N$ 维离散有记忆信源 $\mathbf X=X_1X_2\cdots X_N$，由链式法则：

$$
\begin{aligned}
H(\mathbf X)
&=H(X_1X_2\cdots X_N) \\
&=H(X_1)
+H(X_2\mid X_1)
+\cdots
+H(X_N\mid X_1X_2\cdots X_{N-1}).
\end{aligned}
$$

条件熵随条件数量增加而不增。对平稳信源，有：

$$
\begin{aligned}
H(X_N\mid X_1X_2\cdots X_{N-1})
&\le
H(X_N\mid X_2X_3\cdots X_{N-1}) \\
&=
H(X_{N-1}\mid X_1X_2\cdots X_{N-2}).
\end{aligned}
$$

当 $N=3$ 时：

$$
H(X_3\mid X_1X_2)
\le
H(X_3\mid X_2)
=
H(X_2\mid X_1).
$$

一般地：

$$
\begin{aligned}
H(X_N\mid X_1X_2\cdots X_{N-1})
&\le
H(X_{N-1}\mid X_1X_2\cdots X_{N-2}) \\
&\le
\cdots
\le
H(X_2\mid X_1)
\le
H(X_1).
\end{aligned}
$$

---

### 4-3-5 熵率与极限熵 Entropy Rate and Entropy Limit

$N$ 维离散信源的熵：

$$
H(\mathbf X)=H(X_1X_2\cdots X_N)
$$

刻画一个 $N$ 符号消息携带的平均信息量。单个符号平均携带的信息量定义为：

$$
H_N(\mathbf X)
=
\frac{1}{N}H(X_1X_2\cdots X_N).
$$

这称为 $N$ 维信源的**熵率 Entropy Rate**。当 $N\to\infty$ 时，得到单符号的**极限熵 Entropy Limit**：

$$
H_\infty(\mathbf X)
=
\lim_{N\to\infty}
\frac{1}{N}H(X_1X_2\cdots X_N).
$$

实际信源中，符号相关性可能不只限制在有限维度内。极限熵用于刻画无限长序列中单个符号平均携带的信息量。

若信源平稳，则：

$$
H_\infty(\mathbf X)
=
\lim_{N\to\infty}H_N(\mathbf X)
=
\lim_{N\to\infty}H(X_N\mid X_1X_2\cdots X_{N-1}).
$$

---

### 4-3-6 熵率例题 Example

:::: stem IT4-E2
给定二元信息源 $X$，其发送符号序列由 $0$ 和 $1$ 组成：

$$
p(1)=0.6,
\qquad
p(0)=0.4.
$$

该信源为无记忆信源，因为每次发送符号 $1$ 的概率恒为 $0.6$，发送符号 $0$ 的概率恒为 $0.4$，并且与之前符号无关。

1. 判断该信源是否平稳；
2. 计算 $H(X^2)$、$H(X_3\mid X_1X_2)$ 与 $H_\infty(X)$；
3. 计算 $H(X^4)$，并写出 $X^4$ 的所有可能消息。
::::

:::: solution
由于各时刻符号分布不随时间变化，且符号之间相互独立，因此该信源是离散平稳无记忆信源。

单符号熵为：

$$
\begin{aligned}
H(X)
&=
-0.4\log_2 0.4
-0.6\log_2 0.6 \\
&=0.9710\ \mathrm{bit}.
\end{aligned}
$$

因此：

$$
H(X^2)=2H(X)=1.9419\ \mathrm{bit}.
$$

无记忆信源中，$X_3$ 与 $X_1X_2$ 独立：

$$
H(X_3\mid X_1X_2)=H(X_3)=H(X)=0.9710\ \mathrm{bit}.
$$

其极限熵为：

$$
H_\infty(X)=H(X)=0.9710\ \mathrm{bit/symbol}.
$$

四阶扩展信源熵为：

$$
H(X^4)=4H(X)=3.8838\ \mathrm{bit}.
$$

$X^4$ 的所有可能消息为：

$$
\begin{aligned}
X^4=\{&
0000,0001,0010,0011,0100,0101,0110,0111,\\
&1000,1001,1010,1011,1100,1101,1110,1111\}.
\end{aligned}
$$
::::
