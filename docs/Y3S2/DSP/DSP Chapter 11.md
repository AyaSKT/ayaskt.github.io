# 11 Fast Fourier Transform

**梦里不觉秋已深，余情岂是为他人。**

![alt text](<DSP Chapter 11.attachments/1781531803387.jpg>)

## 章节目录

- [章节目录](#章节目录)
- [11-1 DFT 计算问题 DFT Computation Problem](#11-1-dft-计算问题-dft-computation-problem)
  - [11-1-1 直接计算 Direct Computation](#11-1-1-直接计算-direct-computation)
  - [11-1-2 FFT 的位置 Role of FFT](#11-1-2-fft-的位置-role-of-fft)
- [11-2 旋转因子 Twiddle Factor](#11-2-旋转因子-twiddle-factor)
  - [11-2-1 定义 Definition](#11-2-1-定义-definition)
  - [11-2-2 基本性质 Basic Properties](#11-2-2-基本性质-basic-properties)
- [11-3 Cooley-Tukey 算法 Cooley-Tukey FFT](#11-3-cooley-tukey-算法-cooley-tukey-fft)
  - [11-3-1 分解思想 Decomposition Idea](#11-3-1-分解思想-decomposition-idea)
  - [11-3-2 计算量 Complexity](#11-3-2-计算量-complexity)
- [11-4 按时间抽取 FFT DIT FFT](#11-4-按时间抽取-fft-dit-fft)
  - [11-4-1 偶奇抽取 Even-Odd Decimation](#11-4-1-偶奇抽取-even-odd-decimation)
  - [11-4-2 蝶形计算 Butterfly Computation](#11-4-2-蝶形计算-butterfly-computation)
- [11-5 按频率抽取 FFT DIF FFT](#11-5-按频率抽取-fft-dif-fft)
  - [11-5-1 频域抽取 Frequency Decimation](#11-5-1-频域抽取-frequency-decimation)
  - [11-5-2 DIT 与 DIF 对比 DIT and DIF Comparison](#11-5-2-dit-与-dif-对比-dit-and-dif-comparison)
- [11-6 用 FFT 计算 IDFT IDFT Using FFT](#11-6-用-fft-计算-idft-idft-using-fft)
- [11-7 MATLAB 中的 DFT/IDFT MATLAB DFT and IDFT](#11-7-matlab-中的-dftidft-matlab-dft-and-idft)
  - [11-7-1 直接矩阵计算 Matrix Computation](#11-7-1-直接矩阵计算-matrix-computation)
  - [11-7-2 fft 与 ifft 函数 fft and ifft](#11-7-2-fft-与-ifft-函数-fft-and-ifft)
- [11-8 位反转地址 Bit-Reversed Addressing](#11-8-位反转地址-bit-reversed-addressing)

## 11-1 DFT 计算问题 DFT Computation Problem

### 11-1-1 直接计算 Direct Computation

回顾第 5 章的 DFT 约定：

$$
X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn},
\qquad
0\le k\le N-1
$$

$$
x[n]=\frac{1}{N}\sum_{k=0}^{N-1}X[k]W_N^{-kn},
\qquad
0\le n\le N-1
$$

其中：

$$
W_N=e^{-j2\pi/N}
$$

若直接计算全部 $N$ 个频域样本，每一个 $X[k]$ 都需要对 $N$ 个时域样本加权求和。

因此直接 DFT 的复数运算量为：

| 计算项 Computation Item | 运算量 Count |
|---|---:|
| 复数乘法 Complex Multiplication | $N^2$ |
| 复数加法 Complex Addition | $N(N-1)$ |

当 $N$ 较大时，$N^2$ 级别的计算量会迅速变重。若只需要少量频点，可以单独计算这些 $X[k]$，也可以使用 Goertzel 算法；若需要全部频点，FFT 更合适。

---

### 11-1-2 FFT 的位置 Role of FFT

**快速傅里叶变换 Fast Fourier Transform, FFT** 是 DFT 的快速计算算法，变换定义仍然是 DFT。

本章只讨论最常用的 radix-2 FFT。设序列长度为：

$$
N=2^L,
\qquad
L\in\mathbb{Z}
$$

FFT 的计算目标是把一个 $N$ 点 DFT 逐层分解成更短的 DFT，直到最后只剩 2 点 DFT。每一层由相同形式的蝶形单元组成。

## 11-2 旋转因子 Twiddle Factor

### 11-2-1 定义 Definition

DFT 中的复指数因子称为**旋转因子 Twiddle Factor**：

$$
W_N^m=e^{-j2\pi m/N}
$$

它在复平面单位圆上取值。FFT 能够减少计算量，主要依赖旋转因子的周期性和对称性。

---

### 11-2-2 基本性质 Basic Properties

#### 1. 周期性 Periodicity

$$
W_N^{m+N}=W_N^m
$$

因此：

$$
W_N^{nk}
=W_N^{(n+N)k}
=W_N^{n(k+N)}
$$

频率索引和时间索引都只需要在长度 $N$ 的周期内考虑。

#### 2. 共轭对称 Conjugate Symmetry

$$
\left(W_N^{nk}\right)^*
=W_N^{-nk}
$$

并且：

$$
W_N^{n(N-k)}
=W_N^{(N-n)k}
=W_N^{-nk}
$$

#### 3. 降阶关系 Reduction

若 $m$ 为正整数，则有：

$$
W_N^{nk}=W_{mN}^{mnk}
$$

当 $m\mid nk$ 且 $N/m$ 为整数时：

$$
W_N^{nk}=W_{N/m}^{nk/m}
$$

特别地：

$$
W_N^{2rk}=W_{N/2}^{rk}
$$

这是 radix-2 FFT 推导中最常用的一步。

#### 4. 半周期符号 Half-Period Sign

当 $N$ 为偶数时：

$$
W_N^{N/2}=-1
$$

于是：

$$
W_N^{k+N/2}=-W_N^k
$$

这个性质使上半频点和下半频点可以共用同一组较短 DFT 结果。

## 11-3 Cooley-Tukey 算法 Cooley-Tukey FFT

### 11-3-1 分解思想 Decomposition Idea

Cooley-Tukey FFT 的基本思路是把一个长 DFT 分解成若干短 DFT，再用旋转因子把这些短 DFT 合成。

以 radix-2 为例：

$$
N\text{ 点 DFT}
\rightarrow
2\text{ 个 }N/2\text{ 点 DFT}
\rightarrow
4\text{ 个 }N/4\text{ 点 DFT}
\rightarrow
\cdots
\rightarrow
N/2\text{ 个 }2\text{ 点 DFT}
$$

每一层分解只改变数据的组合方式，不改变 DFT 的定义。

---

### 11-3-2 计算量 Complexity

radix-2 FFT 一共有：

$$
L=\log_2N
$$

级。每一级包含 $N/2$ 个蝶形单元。

按一般复数乘法计数，全部 $N$ 点 DFT 的运算量为：

$$
\text{Complex Multiplications}
=\frac{N}{2}\log_2N
$$

$$
\text{Complex Additions}
=N\log_2N
$$

与直接 DFT 对比：

| 点数 $N$ | 直接乘法 | 直接加法 | radix-2 FFT 乘法 | radix-2 FFT 加法 |
|---:|---:|---:|---:|---:|
| $4$ | $16$ | $12$ | $4$ | $8$ |
| $16$ | $256$ | $240$ | $32$ | $64$ |
| $64$ | $4096$ | $4032$ | $192$ | $384$ |
| $256$ | $65536$ | $65280$ | $1024$ | $2048$ |
| $1024$ | $1048576$ | $1047552$ | $5120$ | $10240$ |

实际实现中，$W_N^0=1$ 和 $W_N^{N/2}=-1$ 对应的乘法还能进一步化简。

## 11-4 按时间抽取 FFT DIT FFT

### 11-4-1 偶奇抽取 Even-Odd Decimation

**按时间抽取 Decimation-in-Time, DIT** 先在时域把输入序列分成偶序号和奇序号两部分：

$$
x_0[r]=x[2r],
\qquad
x_1[r]=x[2r+1],
\qquad
0\le r\le\frac{N}{2}-1
$$

将它们代入 DFT 定义：

$$
\begin{aligned}
X[k]
&=\sum_{n=0}^{N-1}x[n]W_N^{nk} \\
&=\sum_{r=0}^{N/2-1}x[2r]W_N^{2rk}
+\sum_{r=0}^{N/2-1}x[2r+1]W_N^{(2r+1)k} \\
&=\sum_{r=0}^{N/2-1}x_0[r]W_{N/2}^{rk}
+W_N^k\sum_{r=0}^{N/2-1}x_1[r]W_{N/2}^{rk}
\end{aligned}
$$

定义两个 $N/2$ 点 DFT：

$$
X_0[k]=\sum_{r=0}^{N/2-1}x_0[r]W_{N/2}^{rk}
$$

$$
X_1[k]=\sum_{r=0}^{N/2-1}x_1[r]W_{N/2}^{rk}
$$

于是：

$$
X[k]=X_0[\langle k\rangle_{N/2}]
+W_N^kX_1[\langle k\rangle_{N/2}]
$$

其中 $\langle k\rangle_{N/2}$ 表示对 $N/2$ 取模。

---

### 11-4-2 蝶形计算 Butterfly Computation

利用 $X_0[k]$ 与 $X_1[k]$ 的周期性，对 $0\le k\le N/2-1$ 有：

$$
X[k]=X_0[k]+W_N^kX_1[k]
$$

$$
X\left[k+\frac{N}{2}\right]
=X_0[k]-W_N^kX_1[k]
$$

由此得到 DIT 的基本蝶形：

$$
\begin{cases}
Y_0=A+W_N^kB \\
Y_1=A-W_N^kB
\end{cases}
$$

每个蝶形把两个较短 DFT 的同序号输出合成两个较长 DFT 的输出。

DIT 的典型特征：

- 输入按时间索引不断偶奇抽取；
- 输出可以保持自然顺序；
- 若采用原地计算，输入通常需要先排成位反转顺序。

## 11-5 按频率抽取 FFT DIF FFT

### 11-5-1 频域抽取 Frequency Decimation

**按频率抽取 Decimation-in-Frequency, DIF** 从输出频点的偶数项和奇数项出发。

先把输入序列按前后两半分组：

$$
\begin{aligned}
X[k]
&=\sum_{n=0}^{N/2-1}x[n]W_N^{nk}
+\sum_{n=0}^{N/2-1}x\left[n+\frac{N}{2}\right]W_N^{(n+N/2)k} \\
&=\sum_{n=0}^{N/2-1}
\left[
x[n]+(-1)^kx\left[n+\frac{N}{2}\right]
\right]W_N^{nk}
\end{aligned}
$$

当 $k=2r$ 时：

$$
X[2r]
=\sum_{n=0}^{N/2-1}
\left[
x[n]+x\left[n+\frac{N}{2}\right]
\right]W_{N/2}^{nr}
$$

当 $k=2r+1$ 时：

$$
X[2r+1]
=\sum_{n=0}^{N/2-1}
\left\{
\left[
x[n]-x\left[n+\frac{N}{2}\right]
\right]W_N^n
\right\}W_{N/2}^{nr}
$$

定义：

$$
g[n]=x[n]+x\left[n+\frac{N}{2}\right]
$$

$$
h[n]=\left[
x[n]-x\left[n+\frac{N}{2}\right]
\right]W_N^n
$$

则有：

$$
X[2r]=\mathrm{DFT}_{N/2}\{g[n]\}
$$

$$
X[2r+1]=\mathrm{DFT}_{N/2}\{h[n]\}
$$

DIF 的蝶形先做加减，再把差值支路乘以旋转因子。

---

### 11-5-2 DIT 与 DIF 对比 DIT and DIF Comparison

![DIT 与 DIF 的 8 点 FFT 流图对比](<DSP Chapter 11.attachments/fft-8point-dit-dif-comparison.jpg>)

DIT 和 DIF 的运算量相同，都是：

$$
\frac{N}{2}\log_2N
\quad\text{complex multiplications}
$$

$$
N\log_2N
\quad\text{complex additions}
$$

二者的差别主要在数据顺序：

| 算法 Algorithm | 输入顺序 Input Order | 输出顺序 Output Order | 蝶形位置 |
|---|---|---|---|
| DIT FFT | 位反转顺序 | 自然顺序 | 先小 DFT，后合成 |
| DIF FFT | 自然顺序 | 位反转顺序 | 先分解，后小 DFT |

DIF 的流图可以看作 DIT 流图的转置形式。实际程序中选择 DIT 或 DIF，通常取决于数据进入和离开 FFT 模块时更方便采用哪一种顺序。

## 11-6 用 FFT 计算 IDFT IDFT Using FFT

IDFT 的定义为：

$$
x[n]=\frac{1}{N}\sum_{k=0}^{N-1}X[k]W_N^{-nk}
$$

对两边取共轭：

$$
x^*[n]
=\frac{1}{N}\sum_{k=0}^{N-1}X^*[k]W_N^{nk}
$$

因此：

$$
Nx^*[n]
=\sum_{k=0}^{N-1}X^*[k]W_N^{nk}
$$

右侧正好是序列 $X^*[k]$ 的 $N$ 点 DFT。于是可以用 FFT 计算 IDFT：

$$
\boxed{
x[n]=\frac{1}{N}
\left\{
\mathrm{DFT}\left[X^*[k]\right]
\right\}^*
}
$$

对应步骤：

1. 对频域序列 $X[k]$ 取共轭；
2. 对 $X^*[k]$ 做一次 FFT；
3. 对 FFT 输出取共轭；
4. 乘以 $1/N$。

这也是许多库函数中 `ifft` 可以复用 `fft` 内核的原因。

## 11-7 MATLAB 中的 DFT/IDFT MATLAB DFT and IDFT

### 11-7-1 直接矩阵计算 Matrix Computation

DFT 可以写成矩阵乘法：

$$
\mathbf{X}=\mathbf{D}_N\mathbf{x}
$$

其中：

$$
\left[\mathbf{D}_N\right]_{k,n}=W_N^{kn},
\qquad
0\le k,n\le N-1
$$

IDFT 对应：

$$
\mathbf{x}=\frac{1}{N}\mathbf{D}_N^*\mathbf{X}
$$

MATLAB 中可以直接构造 DFT 矩阵：

```matlab
N = length(x);
n = 0:N-1;
k = n.';
W = exp(-1j*2*pi/N);
D = W .^ (k*n);

X = D * x(:);
x_rec = (1/N) * conj(D) * X;
```

这种写法适合验证公式。实际计算不建议用它处理大规模数据，因为矩阵乘法仍然是 $N^2$ 级别。

---

### 11-7-2 fft 与 ifft 函数 fft and ifft

MATLAB 的 DFT 与 IDFT 通常直接使用：

```matlab
X = fft(x, N);
x_rec = ifft(X, N);
```

若未给出 $N$，`fft(x)` 默认使用 `length(x)`。若给出更大的 $N$，MATLAB 会在序列尾部补零。

线性卷积也可以通过 FFT 计算。设 $x[n]$ 长度为 $L_x$，$h[n]$ 长度为 $L_h$，应取：

$$
N\ge L_x+L_h-1
$$

对应 MATLAB 写法：

```matlab
N = length(x) + length(h) - 1;
y = ifft(fft(x, N) .* fft(h, N));
```

补零到更长的 $N$ 可以让频谱采样更密，但不会改变原序列本身包含的频率信息。

## 11-8 位反转地址 Bit-Reversed Addressing

radix-2 FFT 的每一级都在二进制索引上分组。若：

$$
n=(b_{L-1}b_{L-2}\cdots b_1b_0)_2
$$

则位反转地址为：

$$
\operatorname{bitrev}(n)
=(b_0b_1\cdots b_{L-2}b_{L-1})_2
$$

以 $N=8$ 为例：

| 原地址 $n$ | 二进制 | 位反转二进制 | 位反转地址 |
|---:|:---:|:---:|---:|
| $0$ | `000` | `000` | $0$ |
| $1$ | `001` | `100` | $4$ |
| $2$ | `010` | `010` | $2$ |
| $3$ | `011` | `110` | $6$ |
| $4$ | `100` | `001` | $1$ |
| $5$ | `101` | `101` | $5$ |
| $6$ | `110` | `011` | $3$ |
| $7$ | `111` | `111` | $7$ |

DIT 常把输入预先排成位反转顺序，使输出自然有序；DIF 常保持输入自然有序，使输出落在位反转顺序。硬件或高性能库中通常会用专门的位反转寻址来减少数据搬移。
