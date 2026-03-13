# 3 Discrete-Time Signals in the Frequency Domain

## 3-1 连续时间傅里叶变换 CTFT

```
让我们假设你全都会了。如果你不会，去看看信号与系统吧，在你学过信号与系统后，DSP的3-1全是废话。
```

## 3-2 离散时间傅里叶变换 DTFT

### 定义

一个离散序列的DTFT定义为：

$$
X(e^{j \omega}) = \sum_{n = - \infty} ^{\infty} x[n] e^{-j \omega n}
$$

。

类似地，其 IDTFT(Inverse DTFT) 定义为：

$$
x[n] = \frac{1}{2 \pi} \int_{-\pi}^\pi X(e^{j \omega}) e^{j \omega n} \mathrm{d} \omega
$$

。

**离散序列在频域上具有周期性。**

### 性质

#### 1. 复数性质

$X(e^{j \omega})$ 作为一个有实值自变量的**复函数**，具有一些复数的基本性质。因此可以表示为以下两种种形式：

1. 直角坐标形式 Rectangular Form

$$
X(e^{j \omega}) = X_{re}(e^{j \omega}) + jX_{im}(e^{j \omega})
$$

2. 极坐标形式 Polar Form

$$
X(e^{j \omega}) = |X(e^{j \omega})| e^{j \theta(\omega)}
$$

其中 $\theta(\omega) = arg\{ X(e^{j \omega}) \}$ 。

我们将 $|X(e^{j \omega})|$ 称作**幅度函数 Magnitude function**， $\theta(\omega)$ 称作**相位函数 Phase function** 。它们都是 $\omega$ 的实函数。

通过直角坐标形式和极坐标形式，我们可以通过它们的数学关系得到一些美妙的公式：

1. 实部公式

$$ X_{re}(e^{j\omega}) = |X(e^{j\omega})| \cos \theta(\omega) $$

2. 虚部公式

$$ X_{im}(e^{j\omega}) = |X(e^{j\omega})| \sin \theta(\omega) $$

3. 模平方公式

$$ |X(e^{j\omega})|^{2} = X(e^{j\omega}) X^{*}(e^{j\omega}) = X_{re}^{2}(e^{j\omega}) + X_{im}^{2}(e^{j\omega}) $$

4. 相角公式

$$ \tan \theta(\omega) = \frac{X_{im}(e^{j\omega})}{X_{re}(e^{j\omega})} $$

注：对于一个实序列 $x[n]$ ， $|X(e^{j\omega})|$ 和 $X_{re}(e^{j\omega})$ 是 $\omega$ 的偶函数；而 $\theta (\omega)$ 和 $X_{im}(e^{j\omega})$ 是 $\omega$ 的奇函数。

**包裹相位与展开相位 Wrapped Phase & Unwrapped Phase**

通过极坐标形式的定义，可以发现：

$$
X(e^{j \omega}) = |X(e^{j \omega})| e^{j \theta(\omega)} = |X(e^{j \omega})| e^{j (\theta(\omega) + 2 \pi k)} \; ,k \in \mathbb{N}
$$

。这是由欧拉公式得到的，即将复指数函数拆解为三角函数形式。

因此只需要确定在一个 $2 \pi$ 周期内的相位值，即可得到整个 $\omega$ 域上的相位值。

所以我们规定： $- \pi \le \theta (\omega) \lt \pi$ 区间被称为**主值区间 Principal Value**, 也被称作**包裹相位 Wrapped Phase** 。 

在这种规定下，相位变成了一个以 $2 \pi$ 为周期的周期函数。但在每一个周期的过渡点会造成间断点。

把原始相位函数中那些由于包裹造成的不连续跳变去掉后，得到的连续相位函数，叫**展开相位 Unwrapped phase**。

以上可以简单表述为：
- Wrapped phase：把相位限制在 $[−π,π)$ ；
- Unwrapped phase：把这些 $\pm 2 \pi$ 的折返补回去，使曲线连续。

下图是一个 $\theta (\omega) = -4 \omega$ 的例子：

![](Attachments/Pasted%20image%2020260312145442.png)

#### 2. 对称关系

![](Attachments/Pasted%20image%2020260312145547.png)

![](Attachments/Pasted%20image%2020260312145551.png)

#### 3. 收敛情形

如果我们记：

$$
X_K (e^{j \omega}) = \sum_{n = -K} ^ {K} x[n] e^{-j\omega n}
$$

（其实就是把DTFT上下限的无穷换成了K）；

则有

1. **一致收敛 Uniform Convergence**

$$
\lim_{K \rightarrow \infty} |X(e^{j\omega}) - X_K(e^{j\omega})| = 0
$$

2. **均方收敛 Mean-square Convergence**

$$
\lim_{K \rightarrow \infty} \int_{- \pi} ^{\pi} |X(e^{j\omega}) - X_K(e^{j\omega})|^2 \mathrm{d} \omega = 0
$$

```
这里与随机过程中各态历经性 Ergodicity 的分析方法是类似的。
不过各态历经性针对的是随机过程的统计量，而这里则是用有限的频率分量来逼近一个确定的信号。
```

- **绝对可和是一致收敛的充分条件**
- **有限能量（有限平方和）是均方收敛的充分条件**
- 绝对可和是平方可和的充分条件，即绝对可和是更强的约束

![](Attachments/Pasted%20image%2020260312154648.png)

| 绝对可和                                                                  | 平方可和                                                                                       |
| :-------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 信号能量有限<br><br>DTFT 逐点存在<br>    <br>DTFT 一致收敛<br>    <br>频谱是连续、有界的普通函数 | 总能量有限<br>    <br>DTFT 在均方意义下存在<br>    <br>但不能保证绝对收敛<br>    <br>不能保证频谱处处连续<br><br>也不能保证一致收敛 |

#### DTFT 的强度

DTFT的强度同样由其范数给出。对于一个DTFT函数 $X(e^{j \omega})$ 的 $L_p - norm$ ，定义：

$$
||X||_p = (\frac{1}{2 \pi} \int^\pi _{-\pi} |X(e^{j \omega})|^p )^{1/p}
$$

，其中 $p$ 为正整数。

与时域类似， $p$ 的值通常取 1，2或正无穷。

## 3-3 DTFT 定理

```
和CTFT的差不多，就那几样倒来倒去。
但我还是搓了个表格，这真的很帅。
```

| 性质          | 时域                                                   | 频域                                                                                         |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 线性性         | $a\,g[n]+\beta\,h[n]$                                | $aG(e^{j\omega})+\beta H(e^{j\omega})$                                                     |
| 时移          | $g[n-n_0]$                                           | $e^{-j\omega n_0}G(e^{j\omega})$                                                           |
| 频移          | $e^{j\omega_0 n}g[n]$                                | $G\left(e^{j(\omega-\omega_0)}\right)$                                                     |
| 频域微分        | $n\,g[n]$                                            | $j\dfrac{dG(e^{j\omega})}{d\omega}$                                                        |
| 卷积          | $g[n]\otimes h[n]$                                   | $G(e^{j\omega})H(e^{j\omega})$                                                             |
| 调制          | $g[n]h[n]$                                           | $\dfrac{1}{2\pi}\int_{-\pi}^{\pi} G(e^{j\theta})H\left(e^{j(\omega-\theta)}\right)d\theta$ |
| Parseval 关系 | $\displaystyle \sum_{n=-\infty}^{\infty} g[n]h^*[n]$ | $\displaystyle \frac{1}{2\pi}\int_{-\pi}^{\pi} G(e^{j\omega})H^*(e^{j\omega})d\omega$      |

同样地，与CTFT类似，通过时频转换简单计算卷积：

$$
g[n] \circledast h[n] \xleftrightarrow{\text{DTFT}}G(e^{j \omega})H(e^{j \omega})
$$

。

## 3-4 离散时间序列的能量谱密度 ESD

```
这里的原标题是 Energy Density Spectrum，但实际上更通用的写法是Energy Spectral Density (ESD)。在这里两者定义完全相同，只是名称有差异。为了方便，后文统一使用 ESD 代表能量谱密度 / 能量密度谱。
```

一个有限能量序列的能量可定义为：

$$
\mathcal{E}_g = \sum^\infty_{n = - \infty} |g[n]|^2
$$

。

与CTFT类似，DTFT同样遵循 Parseval 关系，即：

$$
\mathcal{E}_g = \sum^\infty_{n = - \infty} |g[n]|^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} G(e^{j\omega})H^*(e^{j\omega}) \mathrm{d}\omega 
$$

```
与CTFT不同的是，这里 Parseval 关系频域部分只积分了一个周期而不是整个 \omega 轴。
原因是DTFT作为周期函数，其一个周期内包含了所有频域信息。作为对比，CTFT的频谱通常延伸到无穷，需要对整条轴进行积分。
```

通过上述关系，我们可以获得 ESD 的定义，即：

$$
S_{gg} (\omega) = |G(e^{j \omega})|^2
$$

。其中 $S_{gg}$ 的下标代表这是该信号的自功率谱密度。

**离散时间序列的ESD同样以 $2 \pi$ 为周期，且 $S_{gg}$ 在 $[-\pi, \pi)$ 区间内曲线以下的面积乘 $1/2 \pi$ 即为该序列能量。**

## 3-5 带限离散时间信号

一个全频带DT信号的主频谱占据了频谱上 $-\pi \le \omega \lt \pi$ 的整个区间。而一个带限DT信号频谱只占有 $-\pi \le \omega \lt \pi$ 的一部分区间。

基于此性质，我们可以定义一个理想带限信号：

$$
X(e^{j \omega}) = 
\begin{cases}
0 & 0 \le |\omega| \le \omega_a \\
0 & \omega_b \le |\omega| \le \pi
\end{cases}
$$

。

在实际中，可以通过压制信号特定频谱外的能量来获得一个近似的带限信号。

在DT信号和DTFT中，低通，高通，带通的定义与CT信号类似。但是 $\omega$ 范围被限制在了 $[-\pi, \pi)$ 。

## 3-7 展开相位函数 Unwrapped Phase Function

```
3-6全是Matlab，略。
```

在数值计算中，当计算出的相位函数超出范围 $[-π, π]$ 时，相位将计算 $\theta (<\omega>_{2 \pi})$ ，以将计算值带入此范围。因此，某些序列的相位函数在图中表现出 $2\pi$ 的间断性。因此，我们直接计算并绘制出的相位图，并不是一条连续的周期曲线，而是一条**在周期边界处有 2π跳变的不连续曲线**。它本质上是**连续的周期相位函数**经过“取模 2π”运算后，被折叠和截断到主值区间内的结果。

在数学上，相位 $\theta$ 的值域应当为整个实数域。数学上允许相位趋向无穷，是为了获得一个**连续、光滑、可微的相位函数 θ(ω)**，这对于系统分析和设计至关重要。例如，群延迟（衡量系统对不同频率信号延迟的特性）就定义为相位导数的负值。

如果相位被限制在主值区间内，其导数将在跳变点处出现无法定义的冲激，这完全破坏了其物理意义。而展开后的连续相位，其导数是一个良定义的、有物理意义的函数。



对相位展开的证明和处理如下：

**相位函数成为 $\omega$ 的连续函数的条件：**

信号的离散时间傅里叶变换 (DTFT) 可表示为极坐标形式：

$$ X\left(e^{j \omega}\right)=\left| X\left(e^{j \omega}\right)\right| e^{j \theta \left(\omega\right)} $$

其中， $\theta (\omega)=\arg\{ X(e^{j \omega})\}$ 为相位函数。

为分析其连续性，对等式两边取自然对数：

$$ \ln X\left(e^{j\omega}\right)=\ln\left| X\left(e^{j\omega}\right)\right|+j\theta \left(\omega\right) $$


然后，对频率变量 $\omega$ 求导：

$$ \frac{\mathrm{d}\ln X\left(e^{j\omega}\right)}{\mathrm{d}\omega}=\frac{\mathrm{d}\ln\left| X\left(e^{j\omega}\right)\right|}{\mathrm{d}\omega}+j \frac{\mathrm{d}\theta\left(\omega\right)}{\mathrm{d}\omega} $$


相位函数 $\theta \left(\omega\right)$ 可以通过其导数 $\frac{\mathrm{d}\theta \left(\omega\right)}{\mathrm{d}\omega}$ 唯一地定义。



 **展开相位的定义：**
 
相位函数 $\theta(\omega)$ 可以通过对其导数的积分来明确定义，从而得到一个连续的展开相位：

$$ \theta(\omega)=\int_{0}^{\omega}\left[\frac{\mathrm{d} \theta(\eta)}{\mathrm{d} \eta}\right] \mathrm{d} \eta $$

在约束条件 $\theta(0)=0$ 下，所得的 $\theta(\omega)$ 将是 $\omega$ 的连续函数。

**进一步的性质：**
此外，如果满足以下条件（即相位导数在一个完整周期内的平均变化为零）：

$$ \frac{1}{\pi} \int_{0}^{2 \pi}\left[\frac{\mathrm{d} \theta(\eta)}{\mathrm{d} \eta}\right] \mathrm{d} \eta=0 $$

那么，此展开相位 $\theta(\omega)$ 还将是 $\omega$ 的奇函数，即满足 $\theta(-\omega) = -\theta(\omega)$。