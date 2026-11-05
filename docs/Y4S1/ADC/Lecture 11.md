---
lastUpdated: 2026-11-05T09:47:12+08:00
---

# 11 Demodulation and Detection

## 章节目录

- [章节目录](#章节目录)
- [11-1 接收机的两个阶段 Two Receiver Stages](#_11-1-接收机的两个阶段-two-receiver-stages)
- [11-2 匹配滤波器 Matched Filter](#_11-2-匹配滤波器-matched-filter)
  - [11-2-1 最大输出信噪比 Maximum Output SNR](#_11-2-1-最大输出信噪比-maximum-output-snr)
  - [11-2-2 冲激响应 Impulse Response](#_11-2-2-冲激响应-impulse-response)
- [11-3 二进制检测 Binary Detection](#_11-3-二进制检测-binary-detection)
  - [11-3-1 似然比检验 Likelihood Ratio Test](#_11-3-1-似然比检验-likelihood-ratio-test)
  - [11-3-2 判决门限与误码率 Threshold and Error Probability](#_11-3-2-判决门限与误码率-threshold-and-error-probability)
- [11-4 匹配滤波器组与实现 Matched Filter Bank](#_11-4-匹配滤波器组与实现-matched-filter-bank)
- [11-5 接收机性能小结 Summary](#_11-5-接收机性能小结-summary)

## 11-1 接收机的两个阶段 Two Receiver Stages

数字接收机要完成两件事：把波形变成判决统计量，再把这个统计量变成符号。

- **解调 Demodulation**：用滤波器把接收波形压缩成一个变量，同时抑制带外噪声；
- **检测 Detection**：把该变量与门限比较，判定发送的是哪个符号。

接收机链路的完整顺序是：频带下变换、中频滤波、均衡（可选）、采样与判决。均衡器用于补偿信道引起的 ISI，通常与解调、检测集成在一起。

接收信号的误差来源有两类：

- **热噪声 Thermal Noise**：加性的白高斯过程，频谱在各频率上近似平坦；
- **码间干扰 ISI**：发射机、信道与接收机的滤波效应使符号在时间上"拖尾"，相邻符号互相叠加。

## 11-2 匹配滤波器 Matched Filter

### 11-2-1 最大输出信噪比 Maximum Output SNR

假设理想信道，接收信号为发送波形与噪声之和：

$$
r(t)=s_i(t)+n(t),\qquad i=1,2,\qquad 0\leq t\leq T
$$

$n(t)$ 是均值为零的 AWGN，双边功率谱密度 $N_0/2$。接收滤波器 $H(f)$ 的输出在 $t=T$ 时刻采样，信号分量为

$a_i(T)=\int_{-\infty}^{\infty}H(f)S(f)e^{j2\pi fT}\,df$

输出噪声功率为

$\sigma_0^2=\frac{N_0}{2}\int_{-\infty}^{\infty}\left|H(f)\right|^2df$

因此采样时刻的信噪比为

$$
\left(\frac{S}{N}\right)_T=\frac{\left|\int H(f)S(f)e^{j2\pi fT}df\right|^2}{\frac{N_0}{2}\int\left|H(f)\right|^2df}
$$

用施瓦茨不等式放缩，分子不超过两个平方积分的乘积，等号在 $H(f)=kS^*(f)e^{-j2\pi fT}$ 时成立。于是最大输出信噪比只由信号能量 $E$ 与噪声谱密度决定：

$$
\max\left(\frac{S}{N}\right)_T=\frac{2E}{N_0}
$$

这个结果说明：最大输出信噪比与波形形状无关，只与能量有关。

### 11-2-2 冲激响应 Impulse Response

:::: definition 匹配滤波器 Matched Filter
**匹配滤波器 Matched Filter** 是对给定发送符号波形 $s(t)$ 设计、使其输出信噪比最大的线性滤波器，冲激响应为发送波形的镜像并延迟一个符号周期。
::::

由最优传递函数 $H_0(f)=kS^*(f)e^{-j2\pi fT}$ 反变换，得到实时域形式：

$$
h(t)=k\,s(T-t),\qquad 0\leq t\leq T
$$

其余时刻 $h(t)=0$。$k$ 是任意常数，取 $k=1$ 即可。

匹配滤波器的冲激响应是发送波形的镜像沿时间轴反转后再延迟 $T$，因此输出在 $t=T$ 时刻达到峰值，峰值正比于波形能量。

匹配滤波器可以用相关器实现：把接收信号与本地波形相乘再积分，输出与卷积实现相同。两者在 $t=T$ 时刻的采样值一致。

## 11-3 二进制检测 Binary Detection

### 11-3-1 似然比检验 Likelihood Ratio Test

检测器拿到采样值 $z$ 后要在两个假设之间选择：$H_1$ 表示发送 $s_1(t)$，$H_0$ 表示发送 $s_0(t)$。

最小错误概率准则等价于比较后验概率：$P(s_1|z)$ 与 $P(s_0|z)$ 谁大就判谁。用贝叶斯公式把后验换成先验与条件概率密度，得到似然比检验：

$$
L(z)=\frac{p(z|s_1)}{p(z|s_0)}\ \overset{H_1}{\underset{H_0}{\gtrless}}\ \frac{P(s_0)}{P(s_1)}
$$

两种符号等概时，门限为 1，判据退化为最大似然：

$$
\frac{p(z|s_1)}{p(z|s_0)}\ \overset{H_1}{\underset{H_0}{\gtrless}}\ 1
$$

### 11-3-2 判决门限与误码率 Threshold and Error Probability

假设两种假设下 $z$ 都是等方差的高斯变量，均值分别为 $a_1$ 与 $a_0$。代入高斯密度并取对数，得到线性门限：

$$
z\ \overset{H_1}{\underset{H_0}{\gtrless}}\ \gamma_0=\frac{a_1+a_0}{2}
$$

对双极性（反相）信号 $s_1(t)=-s_0(t)$，有 $a_1=-a_0$，门限落在零点。

误码率是错误判决区域下条件概率密度的面积。把高斯密度在门限外积分并换元，得到

$$
P_B=Q\left(\frac{a_1-a_0}{2\sigma_0}\right)
$$

其中 $Q(x)$ 是高斯尾概率：

$$
Q(x)=\frac{1}{\sqrt{2\pi}}\int_x^{\infty}e^{-u^2/2}\,du
$$

$Q(x)$ 没有闭式解，工程上用查表或近似。$x>3$ 时常用

$Q(x)\approx\frac{1}{x\sqrt{2\pi}}e^{-x^2/2}$

把信噪比代入误码率：令 $E_d$ 为两波形之差的能量，则 $\left(a_1-a_0\right)^2/\sigma_0^2=2E_d/N_0$，于是

$$
P_B=Q\left(\sqrt{\frac{E_d}{2N_0}}\right)
$$

要降低误码率，就要增大判决时刻两信号分量之差，或减小噪声方差。

## 11-4 匹配滤波器组与实现 Matched Filter Bank

$M$ 进制系统需要 $M$ 个匹配滤波器并行工作，每个滤波器匹配一个候选波形。接收信号同时送入所有滤波器，在 $t=T$ 采样得到观测向量：

$$
\mathbf{z}=\left(z_1(T),z_2(T),\dots,z_M(T)\right)
$$

检测器比较各分量，选出最大者对应的符号。对于二进制反相波形，两个匹配滤波器可以合并为一个：一个滤波器加一个门限比较器即可完成判决。

:::: stem L11-E1
BPSK 系统的 $E_b/N_0=8$ dB。求误码率。
::::

:::: solution
BPSK 的误码率为

$P_B=Q\left(\sqrt{2E_b/N_0}\right)$

$8$ dB 即 $10^{0.8}=6.31$，故

$\sqrt{2\times6.31}=\sqrt{12.62}=3.55$

查 $Q$ 函数表得

$P_B=Q(3.55)\approx1.9\times10^{-4}$
::::

## 11-5 接收机性能小结 Summary

误码率由三个量共同决定：判决时刻信号差 $a_1-a_0$、噪声方差 $\sigma_0^2$、以及两符号的先验概率。匹配滤波器在给定能量下把信噪比做到最大，因此是可实现的最优前端。

多进制系统的最小错误概率判决要求比较 $M$ 个似然值，判决区域由相邻波形的中点决定；二进制情形只是它的特例。
