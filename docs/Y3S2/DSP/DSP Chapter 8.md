# 8 Digital Filter Structure

**我听到水流进入我的身体，我听到阳光穿透海面。**

![alt text](<DSP Chapter 8.attachments/1773652978344.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [8-1 框图表示 Block Diagram Representation](#8-1-框图表示-block-diagram-representation)
  - [8-1-1 基本构件 Basic Building Blocks](#8-1-1-基本构件-basic-building-blocks)
  - [8-1-2 从卷积到结构 From Convolution to Structure](#8-1-2-从卷积到结构-from-convolution-to-structure)
  - [8-1-3 框图分析 Block Diagram Analysis](#8-1-3-框图分析-block-diagram-analysis)
- [8-2 基本结构变换 Basic Structure Transformations](#8-2-基本结构变换-basic-structure-transformations)
  - [8-2-1 无延迟环路 Delay-Free Loop](#8-2-1-无延迟环路-delay-free-loop)
  - [8-2-2 典范结构 Canonic Structure](#8-2-2-典范结构-canonic-structure)
  - [8-2-3 转置结构 Transposed Structure](#8-2-3-转置结构-transposed-structure)
- [8-3 FIR 滤波器结构 FIR Filter Structures](#8-3-fir-滤波器结构-fir-filter-structures)
  - [8-3-1 直接型 Direct Form](#8-3-1-直接型-direct-form)
  - [8-3-2 级联型 Cascade Form](#8-3-2-级联型-cascade-form)
  - [8-3-3 多相实现 Polyphase Realization](#8-3-3-多相实现-polyphase-realization)
  - [8-3-4 线性相位结构 Linear-Phase Structures](#8-3-4-线性相位结构-linear-phase-structures)
- [8-4 IIR 滤波器结构 IIR Filter Structures](#8-4-iir-滤波器结构-iir-filter-structures)
  - [8-4-1 直接型 Direct Forms](#8-4-1-直接型-direct-forms)
  - [8-4-2 二阶节级联 Second-Order Sections](#8-4-2-二阶节级联-second-order-sections)
  - [8-4-3 并联型 Parallel Form](#8-4-3-并联型-parallel-form)
- [8-5 复杂度与实现选择 Complexity and Implementation Choice](#8-5-复杂度与实现选择-complexity-and-implementation-choice)
  - [8-5-1 复杂度对比 Complexity Comparison](#8-5-1-复杂度对比-complexity-comparison)
  - [8-5-2 实现选择 Implementation Choice](#8-5-2-实现选择-implementation-choice)


## 8-1 框图表示 Block Diagram Representation

### 8-1-1 基本构件 Basic Building Blocks

![alt text](<DSP Chapter 8.attachments/filter-building-blocks.jpg>)

数字滤波器的实现可以是软件算法，也可以是硬件电路。框图表示给出内部变量、输入、输出和延迟样本之间的计算关系。

常用基本构件有：

- **加法器 Adder**：输出为多个输入之和；
- **乘法器 Multiplier**：把信号乘以常数系数；
- **分支节点 Pick-off Node**：复制同一个信号到多条支路；
- **单位延迟 Unit Delay**：$x[n]\mapsto x[n-1]$，对应 $z^{-1}$。

单位超前 $z$ 在离线推导中可以出现。实时因果实现一般只使用单位延迟，因为系统只能保存过去样本。

---

### 8-1-2 从卷积到结构 From Convolution to Structure

对 LTI FIR 系统，

$$
y[n]=\sum_{k=N_1}^{N_2}h[k]x[n-k]
$$

若系统因果且阶数为 $N$，常写成

$$
y[n]=\sum_{k=0}^{N}h[k]x[n-k]
$$

这个式子可以直接实现，因为只需要有限个乘法器、加法器和延迟器。

对 LTI IIR 系统，

$$
y[n]=\sum_{k=-\infty}^{\infty}h[k]x[n-k]
$$

冲激响应无限长。直接按卷积求和不适合实现，所以 IIR 一般从传递函数或差分方程出发。

设有理传递函数为

$$
H(z)=\frac{P(z)}{D(z)}
=
\frac{\sum_{k=0}^{M}p_kz^{-k}}
{1+\sum_{k=1}^{N}d_kz^{-k}}
$$

则对应差分方程为

$$
y[n]=\sum_{k=0}^{M}p_kx[n-k]
-\sum_{k=1}^{N}d_ky[n-k]
$$

这里的反馈项 $y[n-k]$ 是 IIR 结构和 FIR 结构最明显的区别。

---

### 8-1-3 框图分析 Block Diagram Analysis

![alt text](<DSP Chapter 8.attachments/lattice-analysis-example.jpg>)

分析框图时，一般先给内部节点命名，再写节点方程。

以上图为例：

$$
\begin{aligned}
W_1&=X-\alpha S_2, &
W_2&=W_1-\delta S_1,\\
W_3&=S_1+\varepsilon W_2, &
Y&=\beta W_1+\gamma S_2,
\end{aligned}
$$

其中

$$
S_2=z^{-1}W_3,\qquad S_1=z^{-1}W_2
$$

于是

$$
W_2=\frac{W_1}{1+\delta z^{-1}},
\qquad
W_3=\frac{\varepsilon+z^{-1}}{1+\delta z^{-1}}W_1
$$

代回 $W_1=X-\alpha z^{-1}W_3$ 和 $Y=\beta W_1+\gamma z^{-1}W_3$，可得

$$
H(z)=\frac{Y}{X}
=
\frac{
\beta+(\beta\delta+\gamma\varepsilon)z^{-1}+\gamma z^{-2}
}{
1+(\delta+\alpha\varepsilon)z^{-1}+\alpha z^{-2}
}
$$

此类框图分析不需要预先判断结构类型。按节点写方程，消去内部变量即可。


## 8-2 基本结构变换 Basic Structure Transformations

### 8-2-1 无延迟环路 Delay-Free Loop

![alt text](<DSP Chapter 8.attachments/delay-free-loop-comparison.jpg>)

**无延迟环路 Delay-Free Loop** 指一条反馈环路中没有任何 $z^{-1}$ 延迟元件。

图中左侧结构满足

$$
y[n]=B\{A(w[n]+y[n])+v[n]\}
$$

展开得

$$
y[n]=ABw[n]+ABy[n]+Bv[n]
$$

若 $AB\ne 1$，代数上可解出

$$
y[n]=\frac{AB}{1-AB}w[n]+\frac{B}{1-AB}v[n]
$$

由此得到右侧的等价无环结构。

注意，原结构的 $y[n]$ 依赖同一时刻的 $y[n]$ 本身。实时硬件或顺序软件实现中，该结构形成代数环路，不能直接作为可实现算法。

---

### 8-2-2 典范结构 Canonic Structure

![alt text](<DSP Chapter 8.attachments/canonic-structure-comparison.jpg>)

**典范结构 Canonic Structure** 的延迟器数量等于实现该传递函数所需的最小状态数。

对一个阶数为 $N$ 的 FIR 滤波器，直接型需要 $N$ 个延迟器，因此是典范的。

对一般 IIR 传递函数

$$
H(z)=
\frac{p_0+p_1z^{-1}+\cdots+p_Mz^{-M}}
{1+d_1z^{-1}+\cdots+d_Nz^{-N}}
$$

若按 DF-I 分开实现分子和分母，通常需要 $M+N$ 个延迟器；若合并延迟线得到 DF-II，则只需要

$$
\max(M,N)
$$

个延迟器。分子、分母同阶时就是 $N$ 个。

---

### 8-2-3 转置结构 Transposed Structure

![alt text](<DSP Chapter 8.attachments/transposed-structure.jpg>)

由一个结构得到转置结构的规则：

1. 反转所有支路方向；
2. 交换加法器和分支节点；
3. 交换输入节点和输出节点。

转置前后的传递函数相同。这条性质通常称为**转置定理 Transposition Theorem**。

在无限精度下，等价结构具有相同的输入输出关系。但在有限字长实现中，不同结构的舍入误差、溢出风险和内部动态范围可能不同。因此，结构选择会影响实际数值性能。


## 8-3 FIR 滤波器结构 FIR Filter Structures

### 8-3-1 直接型 Direct Form

![alt text](<DSP Chapter 8.attachments/fir-direct-transpose-comparison.jpg>)

因果 FIR 滤波器的传递函数为

$$
H(z)=\sum_{k=0}^{N}h[k]z^{-k}
$$

对应时域表达式为

$$
y[n]=\sum_{k=0}^{N}h[k]x[n-k]
$$

直接型按照上述求和式连接：输入依次通过 $N$ 个单位延迟，每一级抽头乘以 $h[k]$，最后求和。

FIR 直接型需要：

- $N$ 个延迟器；
- $N+1$ 个乘法器；
- $N$ 个二输入加法器。

转置直接型由转置定理得到。它和直接型实现同一个 $H(z)$，但数据流方向和内部累加位置不同。

---

### 8-3-2 级联型 Cascade Form

![alt text](<DSP Chapter 8.attachments/fir-cascade-form.jpg>)

FIR 传递函数也可以分解为一阶或二阶因子：

$$
H(z)=h[0]\prod_{k=1}^{K}
\left(1+\beta_{1k}z^{-1}+\beta_{2k}z^{-2}\right)
$$

当 $\beta_{2k}=0$ 时，该节为一阶节；当 $\beta_{2k}\ne0$ 时，该节为二阶节。

实系数 FIR 的复零点成共轭对出现，因此常把一对共轭零点合成一个二阶节。级联型适合单独调整某一组零点，也适合把高阶滤波器拆成若干小模块。

---

### 8-3-3 多相实现 Polyphase Realization

![alt text](<DSP Chapter 8.attachments/fir-polyphase-realization.jpg>)

**多相分解 Polyphase Decomposition** 把 FIR 系数按下标模 $L$ 分组。

对

$$
H(z)=\sum_{n=0}^{N}h[n]z^{-n}
$$

定义第 $m$ 个 polyphase component 为

$$
E_m(z)=\sum_{\substack{r\ge0\\Lr+m\le N}}h[Lr+m]z^{-r},
\qquad 0\le m\le L-1
$$

则

$$
\boxed{
H(z)=\sum_{m=0}^{L-1}z^{-m}E_m(z^L)
}
$$

例如 $L=2$ 时，

$$
H(z)=E_0(z^2)+z^{-1}E_1(z^2)
$$

其中

$$
E_0(z)=h[0]+h[2]z^{-1}+h[4]z^{-2}+\cdots
$$

$$
E_1(z)=h[1]+h[3]z^{-1}+h[5]z^{-2}+\cdots
$$

多相结构常用于抽取、插值和滤波器组。它的总乘法次数不一定减少，但可以把部分运算安排到较低采样率的分支上。

---

### 8-3-4 线性相位结构 Linear-Phase Structures

![alt text](<DSP Chapter 8.attachments/linear-phase-fir-comparison.jpg>)

FIR 具有线性相位的常见条件是冲激响应关于中点对称或反对称：

$$
h[n]=h[N-n]
\quad \text{or} \quad
h[n]=-h[N-n]
$$

对称时，一对系数可以共用一个乘法器。

当长度为奇数，即 $N=2K$ 时，

$$
H(z)=
\sum_{k=0}^{K-1}h[k]\left(z^{-k}+z^{-(N-k)}\right)
+h[K]z^{-K}
$$

当长度为偶数，即 $N=2K-1$ 时，

$$
H(z)=
\sum_{k=0}^{K-1}h[k]\left(z^{-k}+z^{-(N-k)}\right)
$$

若为反对称结构，上式中的加号改为减号：

$$
z^{-k}+z^{-(N-k)}
\quad \longrightarrow \quad
z^{-k}-z^{-(N-k)}
$$

线性相位结构的乘法器数量约为直接型的一半：

$$
N+1
\quad \longrightarrow \quad
\left\lfloor\frac{N+2}{2}\right\rfloor
$$


## 8-4 IIR 滤波器结构 IIR Filter Structures

### 8-4-1 直接型 Direct Forms

![alt text](<DSP Chapter 8.attachments/iir-realization-comparison.jpg>)

一般 IIR 传递函数写成

$$
H(z)=
\frac{p_0+p_1z^{-1}+\cdots+p_Mz^{-M}}
{1+d_1z^{-1}+\cdots+d_Nz^{-N}}
$$

对应差分方程为

$$
y[n]=\sum_{k=0}^{M}p_kx[n-k]
-\sum_{k=1}^{N}d_ky[n-k]
$$

**Direct Form I, DF-I** 可以看作先实现分子 $P(z)$，再实现全极点部分 $1/D(z)$：

$$
w[n]=\sum_{k=0}^{M}p_kx[n-k]
$$

$$
y[n]=w[n]-\sum_{k=1}^{N}d_ky[n-k]
$$

DF-I 的前向延迟线和反馈延迟线分开，结构关系清楚；其代价是延迟器数量通常较多。

---

**Direct Form II, DF-II** 把两条延迟线合并。定义内部状态 $v[n]$：

$$
v[n]=x[n]-\sum_{k=1}^{N}d_kv[n-k]
$$

输出为

$$
y[n]=\sum_{k=0}^{M}p_kv[n-k]
$$

实际书写时，若 $M\ne N$，缺少的系数按 $0$ 补齐。DF-II 的延迟器数量为 $\max(M,N)$，因此是典范结构。

---

### 8-4-2 二阶节级联 Second-Order Sections

![alt text](<DSP Chapter 8.attachments/iir-cascade-form.jpg>)

高阶 IIR 通常分解成若干二阶节实现：

$$
H(z)=G\prod_{i=1}^{L}H_i(z)
$$

其中

$$
H_i(z)=
\frac{
b_{0i}+b_{1i}z^{-1}+b_{2i}z^{-2}
}{
1+a_{1i}z^{-1}+a_{2i}z^{-2}
}
$$

这种形式称为 **Second-Order Sections, SOS**。MATLAB 中常见的 `tf2sos`、`zp2sos` 用于生成二阶节表示。

级联结构还需要确定：

- 零极点如何配对；
- 二阶节排列顺序；
- 每一节的增益如何缩放。

这些选择会影响内部溢出和量化噪声。实际工程中，高阶 IIR 更常用 SOS 级联结构，较少直接使用高阶 DF-II。

---

### 8-4-3 并联型 Parallel Form

![alt text](<DSP Chapter 8.attachments/iir-parallel-form.jpg>)

并联型来自部分分式展开：

$$
H(z)=C+\sum_{i=1}^{R}H_i(z)
$$

若按实系数二阶节组织，可写为

$$
H(z)=C+\sum_{i=1}^{R}
\frac{
r_{0i}+r_{1i}z^{-1}
}{
1+a_{1i}z^{-1}+a_{2i}z^{-2}
}
$$

并联型的输出为各分支输出之和。它适合从留数形式实现滤波器，也便于单独修改某一组极点对应的分支。

对简单一阶例子：

$$
H(z)=
\frac{1+\frac{1}{3}z^{-1}}
{1-\frac{3}{4}z^{-1}+\frac{1}{8}z^{-2}}
$$

分解为

$$
H(z)=
\frac{-\frac{7}{3}}{1-\frac{1}{4}z^{-1}}
+
\frac{\frac{10}{3}}{1-\frac{1}{2}z^{-1}}
$$

于是两个一阶 IIR 分支并联，最后把输出相加。


## 8-5 复杂度与实现选择 Complexity and Implementation Choice

### 8-5-1 复杂度对比 Complexity Comparison

对阶数为 $N$ 的 FIR 滤波器：

| FIR 结构 | 乘法器数量 | 二输入加法器数量 | 延迟器数量 |
| --- | ---: | ---: | ---: |
| 直接型 Direct form | $N+1$ | $N$ | $N$ |
| 级联型 Cascade form | $N+1$ | $N$ | $N$ |
| 多相型 Polyphase | $N+1$ | $N$ | $N$ |
| 线性相位 Linear phase | $\left\lfloor\dfrac{N+2}{2}\right\rfloor$ | $N$ | $N$ |

对分子、分母同为 $N$ 阶的 IIR 滤波器：

| IIR 结构 | 乘法器数量 | 二输入加法器数量 | 延迟器数量 |
| --- | ---: | ---: | ---: |
| DF-I | $2N+1$ | $2N$ | $2N$ |
| DF-II / 转置 DF-II | $2N+1$ | $2N$ | $N$ |
| SOS 级联 Cascade SOS | $2N+1$ | $2N$ | $N$ |
| 并联型 Parallel form | $2N+1$ | $2N$ | $N$ |

这些表只统计结构复杂度。数值性能还取决于系数量化、舍入方式、溢出处理和内部动态范围。

---

### 8-5-2 实现选择 Implementation Choice

FIR 的选择通常比较直接：

- 系数没有特殊性质时，用直接型或转置直接型；
- 有线性相位约束时，用线性相位结构减少乘法器；
- 做抽取、插值、滤波器组时，优先考虑多相结构；
- 需要按零点分组调节时，可以用级联型。

IIR 的选择更依赖数值稳定性：

- 低阶例题可以使用 DF-I 或 DF-II；
- 高阶 IIR 工程实现优先使用 SOS 级联；
- 部分分式结果自然给出并联型；
- 有限字长实现中，结构等价不必然带来相同误差特性。

实现选择可按以下线索判断：

$$
\text{FIR：主要取决于系数对称性和采样率结构}
$$

$$
\text{IIR：主要取决于极点、二阶节和有限字长误差}
$$

滤波器结构讨论的是同一个 $H(z)$ 在不同实现形式下的计算方式与数值特性。
