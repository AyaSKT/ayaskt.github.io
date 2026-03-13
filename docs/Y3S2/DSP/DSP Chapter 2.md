# 2 Discrete-Time Signals in the Time Domain

## 2-1 时域表示 Time-Domain Representation

### 基本表示方法

- 离散信号可以被表示为 $x[n]$ ，其中 $n$ 为正整数；
- $x[n]$ 也可以代表序列的第 $n$ 个值；
- $x[n]$ 在 $n$ 为非整数时没有定义；
- 使用 $\{x[n] \}$ 表示离散序列。

对于一个复数序列 $\{x[n] \}$ ，可以表示为两个实序列之和 $\{x[n]\} = \{x_{re}[n]\} + j\{x_{im}[n]\}$ ，其共轭序列 $\{x^*[n]\} = \{x_{re}[n]\} - j\{x_{im}[n]\}$ 。

**在没有歧义的情况下，可以省略花括号来表示序列。**

### 离散时间信号的两种类型

- 采样信号，其中样本是连续值；
- 数字信号，其中样本是离散值。

实际的数字信号处理系统中的信号是通过舍入或截断对样本值进行量化得到的数字信号。

![](Attachments/Pasted%20image%2020260312095821.png)

### 离散时间信号的长度

一个离散信号可能是有限长度或者无限长度的序列。  
对于一个长度定义在 $N_1 \le n \le N_2$ 的有限序列，其长度为 $N = N_2 - N_1 +1$ 。  
**零填充 Zero-Padding：** 给信号添加零值样本。  


一个 right-sided 右侧序列的定义是

$$
\forall n \lt N_1, x[n]=0
$$

。

**如果 $N_1 \ge 0$ ，则这个右侧序列被称为因果序列 Causal Sequence。**

一个 left-sided 左侧序列的定义是

$$
\forall n \gt N_2, x[n]=0
$$

。

**如果 $N_2 \le 0$ ，则这个左侧序列被称为反因果序列 Anticausal Sequence。**

```
反因果（anticausal）是非因果（noncausal）的一种特殊情况。
非因果的意思是“不是因果”，也就是序列或系统只要涉及负时刻样本、或输出依赖未来输入，就属于非因果；
而反因果更严格，它要求只出现在当前及过去一侧，或者系统输出只依赖当前和未来而不依赖更早的过去。
因此，所有典型的反因果对象通常都可看作非因果，但非因果不一定是反因果，因为一个非因果对象也可能同时包含过去和未来两侧的成分，而不是纯粹只在一侧。
```

### 离散时间信号的强度

我们通常使用信号的范数来定义其强度，即 $\{x[n]\}$的 $L_p - norm$ 定义为：

$$
||x||_p = (\sum^{+\infty}_{-\infty} |x[n]|^p)^{(1/p)}
$$

其中 $p$ 是一个正整数，实际中通常取值 1，2 或者 $\infty$ 。

- $L_{\infty} - norm$ 即是序列的最大绝对值，  $||x|| _{\infty} = |x[n]|_{max}$  ；
- $L_{2} - norm / \sqrt{N}$  即是序列的均方根值(rms)；
- $L_{2} - norm / \sqrt{N}$ 即是序列的绝对值均值，
- 显然有 $||x||_2 \le ||x||_1$ 。

同样地，范数也可以用来估计误差，例如：
- 均方误差： $MSE = \frac{1}{N} (||y[n] - x[n]||_2)^2$ ；
- 相对误差： $E_{rel} = \frac{||y[n] - x[n]||_2}{||x[n]||_2}$ 。

## 2-2 序列的基本运算 The Basic Operations On Sequences

### 基本运算

1. 乘法器 (Modulator / Product / Windowing)

![](Attachments/Pasted%20image%2020260312104239.png)

2. 加法器 (Adder)

![](Attachments/Pasted%20image%2020260312104304.png)

3. 单位延时 / 单位超前 (Unit Delayer / Advance)

![](Attachments/Pasted%20image%2020260312104355.png)

4. 时间翻转 (Time-reversal) $x[-n]$ 

### 卷积和 Convolution Sum

卷积和被定义为：

$$
y[n] = \sum^\infty _{k = - \infty} x[k] h[n-k] = \sum^\infty _{k = - \infty} h[k] x[n-k]
$$

，同样可被简单表示为

$$
y[n] = x[n] \circledast h[n]
$$

。

### 采样率转换

**上采样 Up-sampling**

![](Attachments/Pasted%20image%2020260312105412.png)

$$
x_u[n] = 
\begin{cases}
x[n/L] & n = 0, \pm L, \pm 2L, \dots \\
0 & otherwise
\end{cases}
$$

**下采样 Down-sampling**

![](Attachments/Pasted%20image%2020260312105728.png)

$$
x_d[n] = x[Mn]
$$

### 循环操作 / 圆操作 (Circular Operation)

对于有限序列，其定义域为 $N_1 \le n \le N_2$ 。但在其进行时域翻转或者时移等操作时，其非零值可能会被移动到定义域之外，导致有效数据被截断，因此引入循环操作解决这一潜在问题。

定义取模操作 $<m>_N = m \mod N$ ，
即取余数。

**循环时间翻转 Circular Time-reversal**

$$
\{ y[n] \} = \{ x[<-n>_N] \}
$$

，其中两序列均定义在 $0 \le n \le N-1$ 。

**循环时移 Circular Shift**

$$
x_c[n] = x[<n-n_0>_N]
$$

。

## 2-3 序列的分类

1. **基于对称性的分类**

|           |    复序列 $x[n]$     |   实序列 $x[n]$   |
| :-------- | :---------------: | :------------: |
| 共轭对称 / 偶  | $x^* [n]= x[-n]$  | $x[n] = x[-n]$ |
| 共轭非对称 / 奇 | $x^* [n]= -x[-n]$ | $x[n]= -x[-n]$ |

对于一个复序列 $x[n]$ ，可将其拆分为共轭对称部分和共轭非对称部分，即

$$x[n] = x_{cs}[n] + x_{ca} [n]$$

$$x_{cs} [n] = \frac{1}{2} \{ x[n] + x^*[-n] \}$$

$$x_{ca} [n] = \frac{1}{2} \{ x[n] a x^*[-n] \}$$

。

2. **基于周期性的分类**

**周期性**
如果一个序列满足

$$
\forall n \text{, }\tilde{x} [n] = \tilde{x} [n+kN]
$$

，则 $\tilde{x} [n]$ 就被称作一个周期序列。

**基本周期：** $N_f = \text{smallest} \; N$ 。

**周期函数加法**

$$
\tilde{y}[n] = \tilde{x}_a[n] + \tilde{x}_b[n] 
$$

其中 $\tilde{x}_a[n]$ 和 $\tilde{x}_b[n]$ 均为周期函数，基本周期分别为 $N_a$ 和 $N_b$ ，则有：

$$
N_y = LCM(N_a, N_b)= \frac{N_a N_b}{GCD(N_a, N_b)}
$$

其中LCM为最小公倍数，GCD为最大公约数。

3. **能量 / 功率信号分类**

信号的能量和平均功率分别定义为：

$$
\mathcal{E}_x = \sum_{n= - \infty}^{ + \infty} |x[n]|^2
$$

$$
P_x = \lim_{K \rightarrow \infty} \frac{1}{2K+1} \sum_{n = -K}^{K} |x[n]|^2
$$

- **能量信号：** 一个能量有限，平均功率为0的信号。
- **功率信号：** 一个能量无限，平均功率有限的信号。

4. **其它分类方法**

**有界 Bounded：** $\forall n , \, \exists B; \; |x[n]| \le B \lt \infty$ 。

**绝对可和 Absolutely Summable：** $\sum_{n = - \infty}^\infty |x[n]| \lt \infty$ 。

**均方可和 Square-summable：** $\sum_{n = - \infty}^\infty |x[n]|^2 \lt \infty$ 。

## 2-4 典型序列 Typical Sequences

```
反正就那几种，懒得写了
```

## 2-5 采样 Sampling

**归一化角频率 Normalised Angular Frequency**

在数字信号处理中，**归一化角频率**是连接连续时间信号与离散时间系统的核心桥梁。其定义为模拟角频率 ω 与采样频率 fs​之比，即 $Ω=ω/fs​=2πf/fs$ ​ 。它是一个**无量纲**的纯数字，核心价值在于其**周期性**：任何数字系统的频率响应都以 2π为周期重复，这对应着模拟域中以采样频率 fs​为间隔的频谱周期性延拓。

**关键物理对应关系为**：

- Ω=0对应**直流分量**。

- Ω=π对应**奈奎斯特频率**​ fs​/2，这是数字系统能无混叠表示的最高物理频率。

- Ω=2π在频域上与 Ω=0等效。


因此，归一化角频率将具体的物理频率统一映射到一个固定的、周期性的数字标尺（主值区间通常取 $[−π,π]$ 或 $[0, 2π)$ ）上。这使算法设计（如数字滤波器指标设定、频谱分析横轴）得以**独立于具体采样率**，成为分析和设计所有离散时间系统时通用且必需的基本频率变量。