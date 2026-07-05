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
  - [4-2-1 无记忆信源](#4-2-1-无记忆信源)
  - [4-2-2 信源的](#4-2-2-信源的)
- [4-3 有记忆信源 Memory Information Source](#4-3-有记忆信源-memory-information-source)


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

### 4-2-1 无记忆信源

---

### 4-2-2 信源的

## 4-3 有记忆信源 Memory Information Source
