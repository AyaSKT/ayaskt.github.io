---
lastUpdated: 2026-11-04T15:12:58+08:00
---

# 3 Link Budget Analysis

<LyricCover
  image="Lecture 3.attachments/1793781993269.JPG"
  title="堕天"
  artist="Creepy Nuts"
  lang="ja"
  netease-url="https://music.163.com/song?id=1958186823"
>
  <LyricLine
    original="あの日(ひ)林檎(りんご)の木(き)の下(した) 共犯(きょうはん)で"
    translation="那一天在苹果树下 你我作为共犯"
  />
  <LyricLine
    original="踏(ふ)み越(こ)えてみた境界線(きょうかいせん)"
    translation="跨过了分界线"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [3-1 链路预算的作用 Role of Link Budget](#_3-1-链路预算的作用-role-of-link-budget)
- [3-2 自由空间损耗 Free Space Loss](#_3-2-自由空间损耗-free-space-loss)
  - [3-2-1 波前扩散与 Friis 公式](#_3-2-1-波前扩散与-friis-公式)
  - [3-2-2 路径损耗的 dB 形式](#_3-2-2-路径损耗的-db-形式)
- [3-3 链路预算方程 Link Budget Equation](#_3-3-链路预算方程-link-budget-equation)
- [3-4 噪声基底与接收灵敏度 Noise Floor and Sensitivity](#_3-4-噪声基底与接收灵敏度-noise-floor-and-sensitivity)
- [3-5 链路余量与最大允许路径损耗 Link Margin and MAPL](#_3-5-链路余量与最大允许路径损耗-link-margin-and-mapl)
  - [3-5-1 链路余量 Link Margin](#_3-5-1-链路余量-link-margin)
  - [3-5-2 最大允许路径损耗 Maximum Allowable Path Loss](#_3-5-2-最大允许路径损耗-maximum-allowable-path-loss)
- [3-6 上行与下行的平衡 Uplink and Downlink Balance](#_3-6-上行与下行的平衡-uplink-and-downlink-balance)
- [3-7 工程参数 Engineering Parameters](#_3-7-工程参数-engineering-parameters)
- [3-8 链路预算计算实例 Link Budget Calculation](#_3-8-链路预算计算实例-link-budget-calculation)
  - [3-8-1 双向链路 Two-Way Link](#_3-8-1-双向链路-two-way-link)
  - [3-8-2 单向链路 One-Way Links](#_3-8-2-单向链路-one-way-links)

## 3-1 链路预算的作用 Role of Link Budget

:::: definition 链路预算 Link Budget
**链路预算 Link Budget** 把发射功率、天线增益、各级损耗、噪声与接收灵敏度折算到同一 dB 体系，用来判断给定链路能否建立。
::::

链路预算回答的问题：

- 接收信号是否足以可靠译码；
- 收发两端最远可以相隔多远；
- 需要多大的发射功率；
- 需要多大的天线增益；
- 双向链路中哪一侧限制覆盖；
- 链路还能容忍多少额外损耗；
- 改变频率会怎样改变覆盖。

![alt text](<Lecture 3.attachments/l3-power-budget.png>)

图中发射功率先扣掉馈线损耗、加上天线增益得到 EIRP，再沿距离按路径损耗下降，到接收端的电平与接收灵敏度之间的差值就是链路余量。

链路预算有四个目标：

- 估计最大允许路径损耗；
- 计算平衡路径所需的发射功率；
- 估计覆盖门限；
- 评估技术方案的性能。

---

## 3-2 自由空间损耗 Free Space Loss

### 3-2-1 波前扩散与 Friis 公式

自由空间中不存在影响传播的物体，信号能量沿球面波前扩散，功率密度随距离平方下降。波前面积 $A=4\pi d^2$，距离 $d$ 处的功率密度为 $S=P_t/(4\pi d^2)$。

收发之间的接收功率由 Friis 公式给出：

$$
P_r=P_tG_tG_r\left(\dfrac{\lambda}{4\pi d}\right)^2
$$

其中 $P_t$ 为发射功率，$G_t$、$G_r$ 为收发天线增益，$d$ 为距离，$\lambda$ 为波长。

---

### 3-2-2 路径损耗的 dB 形式

:::: definition 自由空间路径损耗 Free Space Path Loss
**自由空间路径损耗 Free Space Path Loss, FSPL** 是自由空间中收发天线增益均为 0 dBi 时的收发功率之比，由波前扩散造成：

$$
L_p=\left(\dfrac{4\pi d}{\lambda}\right)^2=\left(\dfrac{4\pi f d}{c}\right)^2
$$
::::

距离以 km 计、频率以 GHz 计时，dB 形式为

$$
L_p=92.4+20\log_{10}D+20\log_{10}f
$$

频率越高、距离越远，路径损耗越大。损耗来自能量在更大面积上扩散，与介质吸收无关。

| 距离变化 | FSPL 变化 |
| --- | --- |
| 2 倍 | $+6$ dB |
| 4 倍 | $+12$ dB |
| 10 倍 | $+20$ dB |
| 100 倍 | $+40$ dB |

同样的规律适用于频率：频率加倍，FSPL 增加约 6 dB。3 GHz 与 6 GHz 的同类链路相差 6 dB。

:::: stem L3-E1
计算 2.4 GHz 下 1 m 与 10 m 距离的自由空间路径损耗。
::::

:::: solution
2.4 GHz 时 $92.4+20\log_{10}2.4\approx100$，故 $L_p=100+20\log_{10}D$，$D$ 以 km 计。

1 m 即 $D=10^{-3}$ km：

$L_p=100+20\log_{10}10^{-3}=100-60=40$ dB

10 m 即 $D=10^{-2}$ km：

$L_p=100+20\log_{10}10^{-2}=100-40=60$ dB

距离放大 10 倍，损耗增加 20 dB。
::::

:::: stem L3-E2
2.4 GHz 链路的路径损耗为 $2\times10^{13}$（线性值）。求收发距离。
::::

:::: solution
先换成 dB：

$L_p=10\log_{10}(2\times10^{13})=133$ dB

由 $L_p=100+20\log_{10}D$ 得

$20\log_{10}D=133-100=33$

$D=10^{33/20}\approx44.7$ km
::::

若 1 km 处损耗为 100 dB，则 2 km 处约 106 dB，4 km 处约 112 dB。

## 3-3 链路预算方程 Link Budget Equation

接收功率等于发射功率加收发增益，再减去路径损耗与馈线损耗：

$$
P_r=P_t+G_t+G_r-L_p-L_{feed}
$$

其中 $L_{feed}=L_t+L_r$ 为收发两侧馈线与连接器损耗之和。全部量取 dB 或 dBm 后，乘除关系变成加减。

:::: definition 等效全向辐射功率 EIRP
**等效全向辐射功率 Effective Isotropic Radiated Power, EIRP** 是以各向同性天线为参考的发射功率：

$$
EIRP=P_t+G_t-L_t
$$
::::

EIRP 把发射机功率、天线增益与发射侧馈线损耗合并成一个量，表示链路在发射端实际辐射出去的功率。

## 3-4 噪声基底与接收灵敏度 Noise Floor and Sensitivity

290 K 下热噪声功率谱密度为 $-174$ dBm/Hz。带宽 $B$ 内的噪声功率为

$N=-174+10\log_{10}B$

实际接收机的器件还会附加噪声，用噪声系数 $NF$ 表示：

$$
N=-174+10\log_{10}B+NF
$$

:::: stem L3-E3
接收机带宽 10 MHz，噪声系数 5 dB。求噪声功率。
::::

:::: solution
$10\log_{10}(10^7)=70$，故

$N=-174+70+5=-99$ dBm
::::

:::: definition 接收灵敏度 Receiver Sensitivity
**接收灵敏度 Receiver Sensitivity** 是达到指定误码性能所需的最小接收功率：

$$
P_{min}=N+SNR_{min}
$$
::::

若 $N=-99$ dBm、要求 $SNR_{min}=8$ dB，则 $P_{min}=-91$ dBm。

## 3-5 链路余量与最大允许路径损耗 Link Margin and MAPL

### 3-5-1 链路余量 Link Margin

:::: definition 链路余量 Link Margin
**链路余量 Link Margin** 是实际接收功率高出接收灵敏度的部分：

$$
M=P_r-P_{min}
$$
::::

$P_r=-74$ dBm、$P_{min}=-82$ dBm 时 $M=8$ dB。$M>0$ 链路可用，$M<0$ 链路不可用。

衰落余量 Fade Margin 是为容忍接收电平起伏额外预留的余量。加大衰落余量可以提高鲁棒性，代价是更大的发射功率、更高的天线增益、更短的距离或更好的接收灵敏度。

---

### 3-5-2 最大允许路径损耗 Maximum Allowable Path Loss

:::: definition 最大允许路径损耗 Maximum Allowable Path Loss
**最大允许路径损耗 Maximum Allowable Path Loss, MAPL** 是接收功率恰好等于灵敏度时链路能承受的路径损耗：

$$
MAPL=P_t+G_t-L_t+G_r-L_r-P_{min}
$$
::::

给定 $P_t=20$ dBm、$G_t=10$ dBi、$G_r=14$ dBi、$L_t=L_r=2$ dB、$P_{min}=-82$ dBm，则

$MAPL=20+10-2+14-2-(-82)=122$ dB

实际路径损耗 114 dB 时余量 $M=122-114=8$ dB。

## 3-6 上行与下行的平衡 Uplink and Downlink Balance

双向链路的覆盖由最弱的一侧决定。使两个方向的最大允许路径损耗相等，链路就达到平衡，上下行同时到达覆盖边缘。

> [!NOTE]
> 课件把平衡条件写成「上行路径损耗 = 下行路径损耗」。同一段路径的传播损耗本身对两个方向相同，实际需要拉平的是两侧的链路预算，即最大允许路径损耗。

![alt text](<Lecture 3.attachments/l3-uplink-downlink.png>)

上图基站听不到终端、终端听得到基站，属上行受限；下图相反，属下行受限。实际系统偏向哪一侧，取决于两侧的发射功率、天线增益与噪声性能。

移动链路常常不对称，原因在两端的能力差异。基站可以有更大的发射功率、更高增益的天线、更好的接收机噪声性能；终端受电池、体积、天线尺寸与最大发射功率限制。因此 $P_{t,UL}\neq P_{t,DL}$，两个方向的余量差别很大。

## 3-7 工程参数 Engineering Parameters

射频链路上的增益与损耗来自不同部件：

| 增益 | 损耗 |
| --- | --- |
| 天线增益 Antenna | 电缆与馈线 Cable / Feeder |
| 功率放大器 PA | 双工器 Duplexer |
| 分集 Diversity | 合路器 Combiner |
| 低噪声放大器 LNA | 跳线与连接器 Jumper / Connector |

天线增益是相对参考天线或理想各向同性天线，在特定方向上辐射或接收的电磁功率倍数，直接进入 MAPL。手机天线增益很低，通常约 0 dBi。

发射功率放大器提高射频功率，代价是能耗、发热、干扰与硬件成本。GSM 功放典型值 2.5--32 W；低噪声放大器增益可达 20 dB。

电缆损耗随频率与长度上升。900 MHz 下 1/2 英寸 LDF4-50 跳线约 2.16 dB/100 ft，7/8 英寸 LDF5-50 主馈线约 1.21 dB/100 ft，每个连接器约 0.1 dB。这些数值都要计入 $L_{feed}$。

## 3-8 链路预算计算实例 Link Budget Calculation

### 3-8-1 双向链路 Two-Way Link

:::: stem L3-E4
2.4 GHz 链路长 5 km，自由空间损耗 114 dB。AP 侧发射功率 20 dBm、天线 10 dBi、灵敏度 $-89$ dBm；客户端发射功率 15 dBm、天线 14 dBi、灵敏度 $-82$ dBm；两侧馈线损耗各 2 dB。分别求两个方向的接收功率与余量，判断哪一侧受限。
::::

:::: solution
AP 到客户端：

$P_r=20+10-2+14-2-114=-74$ dBm

$M=-74-(-82)=8$ dB

客户端到 AP：

$P_r=15+14-2+10-2-114=-79$ dBm

$M=-79-(-89)=10$ dB

下行余量 8 dB 小于上行余量 10 dB，链路受下行限制。
::::

---

### 3-8-2 单向链路 One-Way Links

:::: stem L3-E5
相距 30 km 的两副 27 dBi 天线工作在 6 GHz，最小可接受接收功率 $-120$ dBm，不计馈线损耗。求最小发射功率。
::::

:::: solution
$L_p=92.4+20\log_{10}30+20\log_{10}6=137.5$ dB

由 $P_r=P_t+G_t+G_r-L_p$ 得

$P_t=-120-27-27+137.5=-36.5$ dBm
::::

:::: stem L3-E6
两副半波偶极子相距 50 km，对准最佳方向。发射功率 10 W，频率 144 MHz，偶极子增益 2.15 dBi，不计馈线损耗。求接收功率。
::::

:::: solution
10 W 即 40 dBm。

$L_p=92.4+20\log_{10}50+20\log_{10}0.144=92.4+33.98-16.83\approx109.6$ dB

$P_r=40+2.15+2.15-109.6\approx-65.3$ dBm
::::
