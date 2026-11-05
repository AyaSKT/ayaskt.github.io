---
lastUpdated: 2026-11-05T16:41:57+08:00
---

# 15 Orthogonal Frequency Division Multiplexing

## 章节目录

- [章节目录](#章节目录)
- [15-1 从多载波到 OFDM Multicarrier and OFDM](#_15-1-从多载波到-ofdm-multicarrier-and-ofdm)
- [15-2 子载波的正交性 Subcarrier Orthogonality](#_15-2-子载波的正交性-subcarrier-orthogonality)
- [15-3 调制与解调 Modulation and Demodulation](#_15-3-调制与解调-modulation-and-demodulation)
- [15-4 保护间隔与循环前缀 Guard Interval and Cyclic Prefix](#_15-4-保护间隔与循环前缀-guard-interval-and-cyclic-prefix)
  - [15-4-1 多径与保护间隔](#_15-4-1-多径与保护间隔)
  - [15-4-2 循环前缀的作用](#_15-4-2-循环前缀的作用)
- [15-5 参数与数据率 OFDM Parameters](#_15-5-参数与数据率-ofdm-parameters)
- [15-6 优缺点与应用 Pros, Cons and Applications](#_15-6-优缺点与应用-pros-cons-and-applications)

## 15-1 从多载波到 OFDM Multicarrier and OFDM

传统 FDMA 为每路传输分配一个独立载频，载频之间留保护带，用带通滤波器分离。多载波调制让一路高速数据分散到多个子载波上并行传输，每个子载波用 PSK 或 QAM 调制。

OFDM 是多载波调制的一种。它与普通多载波的区别在于子载波频谱相互重叠：普通 FDMA 用滤波器分离，OFDM 靠子载波之间的正交性用 DFT 分离。

![alt text](<Lecture 15.attachments/l15-spectrum.png>)

相同数据率下，单载波占用一个宽而平的频带；多载波分成多个互不重叠的窄带；OFDM 的子载波频谱重叠但正交，因此频谱利用率最高。

## 15-2 子载波的正交性 Subcarrier Orthogonality

:::: definition 正交频分复用 Orthogonal Frequency Division Multiplexing
**正交频分复用 Orthogonal Frequency Division Multiplexing, OFDM** 把数据分散到多个相互正交的子载波上并行传输，子载波间隔为符号周期的倒数。
::::

子载波频率是基频的整数倍，$f_n=n/T$，$T$ 为符号周期。在一个符号周期内，任意两个不同子载波的内积为零：

$$
\int_0^T\cos(2\pi mf_0t)\cos(2\pi nf_0t)\,dt=
\begin{cases}
T/2, & m=n\\
0, & m\neq n
\end{cases}
$$

正弦与余弦之间同样正交。正交性成立的条件是每个子载波在符号周期内完成整数个周期，因此子载波间隔固定为

$$
\Delta f=f_0=\frac{1}{T}
$$

正是因为正交，接收端用一个子载波做相关运算时，其他子载波的贡献积分为零，子载波之间不产生干扰。

## 15-3 调制与解调 Modulation and Demodulation

基带 OFDM 符号是 $N$ 个子载波之和：

$$
s_B(t)=\sum_{n=0}^{N-1}\left\{a_n\cos(2\pi nf_0t)-b_n\sin(2\pi nf_0t)\right\}
$$

$a_n$、$b_n$ 是该子载波上 QAM 符号的同相与正交分量。把基带信号写成复数形式：

$$
u(t)=\sum_{n=0}^{N-1}d_ne^{j2\pi nf_0t},\qquad d_n=a_n+jb_n
$$

在一个符号周期内采样 $N$ 点，采样间隔 $1/(Nf_0)$，得到

$$
u(k)=\sum_{n=0}^{N-1}d_ne^{j\frac{2\pi nk}{N}},\qquad k=0,1,\dots,N-1
$$

这正是 IDFT。接收端做 DFT 就能恢复 $d_n$：

$d_n=\mathrm{FFT}\left(u(k)\right)$

因此 OFDM 的调制解调只需要一对 IFFT/FFT，不需要 $N$ 个振荡器与滤波器。这正是 OFDM 在数字时代变得实用的原因。

:::: stem L15-E1
某 OFDM 系统 $N=4$，调制符号为 $d=[1,-2,2,4]$。用 IDFT 求发送的时域样本。
::::

:::: solution
按 IDFT 定义逐点计算：

$u(0)=1-2+2+4=5$

$u(1)=1-2j-2-4j=-1-6j$

$u(2)=1+2+2-4=1$

$u(3)=1+2j-2+4j=-1+6j$

时域样本为 $[5,\ -1-6j,\ 1,\ -1+6j]$。
::::

## 15-4 保护间隔与循环前缀 Guard Interval and Cyclic Prefix

### 15-4-1 多径与保护间隔

多径信道中，同一符号经不同路径到达，接收信号是多个延迟副本的叠加。若延迟超过符号周期，前一个符号的拖尾会落到当前符号上，形成符号间干扰 ISI。

OFDM 把数据分散到 $N$ 个并行子载波上，符号周期延长为原来的 $N$ 倍，多径的相对延迟占比大幅下降。剩余的影响用保护间隔消除：在每个 OFDM 符号前插入一段保护时间，使前一个符号的拖尾在本符号采样开始前衰减完。

---

### 15-4-2 循环前缀的作用

:::: definition 循环前缀 Cyclic Prefix
**循环前缀 Cyclic Prefix, CP** 是把 OFDM 符号尾部的一段样本复制到符号开头形成的保护间隔，使多径卷积在接收端等效为循环卷积。
::::

CP 的长度必须不小于信道冲激响应的时延扩展。由于复制的是符号自身的尾部，接收端去掉 CP 后，线性卷积被转化为循环卷积，经过 FFT 后每个子载波上的信道响应变成一个复数乘法：$Y_k=H_kX_k$。均衡只需逐个子载波除以信道响应，时域卷积的逆运算由此省去。

:::: stem L15-E2
OFDM 时域样本 $x=[3,5,7,2]$，信道 $h=[0.9,0.3,0.1]$，$N=4$，无噪声。设计 CP 并求接收信号，验证频域为逐点相乘。
::::

:::: solution
信道长度 3，CP 长度取 2，复制末尾两个样本到开头：

$x_{cp}=[7,2,\ 3,5,7,2]$

与信道卷积得到接收信号：

$y=[6.3,\ 3.9,\ 4.0,\ 5.6,\ 8.1,\ 4.4,\ 1.3,\ 0.2]$

去掉前两个 CP 样本，取 $[4.0,\ 5.6,\ 8.1,\ 4.4]$ 做 FFT：

$Y=[22.1,\ -4.1-1.2j,\ 2.1,\ -4.1+1.2j]$

信道的频响为 $H=\mathrm{FFT}([0.9,0.3,0.1,0])$：

$H=[1.3,\ 0.8-0.3j,\ 0.7,\ 0.8+0.3j]$

逐点相除得 $X=[17,\ -4-3j,\ 3,\ -4+3j]$，再取 IFFT 即回到 $x=[3,5,7,2]$。这正是 CP 的作用：把信道变成每个子载波上的标量乘。
::::

## 15-5 参数与数据率 OFDM Parameters

OFDM 系统的三个基本参数相互约束：

$$
\Delta f=\frac{1}{T},\qquad B=N\Delta f,\qquad T_s=\frac{1}{B}
$$

其中 $T$ 为有用符号周期，$B$ 为系统带宽，$N$ 为子载波数。已知任意两个即可确定第三个。

:::: stem L15-E3
OFDM 系统带宽 10 MHz，子载波数 1000。求子载波间隔、符号周期与采样间隔。
::::

:::: solution
$\Delta f=B/N=10\times10^{6}/1000=10$ kHz

$T=1/\Delta f=100$ µs

采样间隔 $T/N=100/1000=0.1$ µs
::::

:::: stem L15-E4
OFDM 系统子载波间隔 2000 Hz，子载波数 10000，8-PSK 调制，编码速率 0.5。求符号周期、OFDM 符号率与数据率。
::::

:::: solution
$T=1/2000=0.5$ ms，符号率为 2000 symbol/s。

每个子载波每符号携带 $\log_2 8\times0.5=1.5$ 个比特，全系统每符号携带

$10000\times1.5=15000$ bit

数据率为

$15000\times2000=30$ Mbit/s
::::

:::: stem L15-E5
要求传输 100 kbit/s，子载波间隔 1 kHz，16-PSK 调制，编码速率 0.5。求子载波数与总带宽。
::::

:::: solution
符号率为 1000 symbol/s，故每符号需承载 100 bit。

每子载波每符号携带 $\log_2 16\times0.5=2$ bit，因此

$N=100/2=50$

总带宽

$B=N\Delta f=50\times1000=50$ kHz
::::

实际系统的例子：HyperLAN2 共 64 个子载波，其中 48 个数据子载波、4 个导频、12 个保护子载波，带宽 20 MHz。

$\Delta f=20\times10^{6}/64=312.5$ kHz

$T_s=1/312.5\text{k}=3.2$ µs

加 0.8 µs 保护间隔后总符号时长 4 µs，符号率 0.25 Msymbol/s。QPSK 时每符号 96 bit，数据率 $96\times0.25\text{M}=24$ Mbit/s；编码速率 0.5 后为 12 Mbit/s。

## 15-6 优缺点与应用 Pros, Cons and Applications

OFDM 的优点：

- 抗多径：并行子载波延长符号周期，CP 消除残余 ISI；
- 频谱效率高：子载波正交重叠，无需保护带；
- 实现简单：调制解调由 IFFT/FFT 完成；
- 均衡简单：每个子载波只需一次复数除法；
- 灵活：可对不同子载波分配不同调制方式。

OFDM 的缺点：

- **高峰均功率比 PAPR**：多个子载波同相叠加时峰值远高于平均功率，需要动态范围很大的线性功放；
- **对频偏敏感**：子载波间隔小，收发本振的频率误差与多普勒频移会破坏正交性，产生子载波间干扰；
- **带外辐射高**：矩形窗使频谱旁瓣衰减慢，需要额外滤波或加窗。

应用包括数字电视 DVB、WLAN（IEEE 802.11a/g/n）、ADSL、LTE 与 5G 的下行链路。IEEE 802.11a 的 20 MHz 带宽、64 子载波结构与前面的 HyperLAN2 参数一致，LTE 则以 15 kHz 子载波间隔与多种带宽配置为特征。
