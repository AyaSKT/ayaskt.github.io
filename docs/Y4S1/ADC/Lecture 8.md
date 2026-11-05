---
lastUpdated: 2026-11-04T21:15:44+08:00
---

# 8 Line Coding

<LyricCover
  image="Lecture 8.attachments/1793871862948.jpg"
  title="人を気取る"
  artist="花譜"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/songDetail/002TgsZq1d2LSE"
  netease-url="https://music.163.com/song?id=2026790780"
>
  <LyricLine
    original="人(ひと)を気取(きど)って気取って気取って気取って気取った"
    translation="自命不凡 自命不凡 自命不凡 自命不凡 装了个够"
  />
  <LyricLine
    original="人生(じんせい)を歌(うた)って歌って歌って歌って歌った"
    translation="歌唱人生 歌唱人生 歌唱人生 歌唱人生 唱了个够"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [8-1 数字基带传输 Digital Baseband Transmission](#8-1-数字基带传输-digital-baseband-transmission)
- [8-2 线路编码的模型与要求 Model and Requirements](#8-2-线路编码的模型与要求-model-and-requirements)
  - [8-2-1 编码模型 Coding Model](#8-2-1-编码模型-coding-model)
  - [8-2-2 三项要求 Three Requirements](#8-2-2-三项要求-three-requirements)
- [8-3 常见码型 Common Line Codes](#8-3-常见码型-common-line-codes)
  - [8-3-1 单极性与极性码 Unipolar and Polar Codes](#8-3-1-单极性与极性码-unipolar-and-polar-codes)
  - [8-3-2 双极性码 Bipolar Code](#8-3-2-双极性码-bipolar-code)
- [8-4 功率谱密度 Power Spectral Density](#8-4-功率谱密度-power-spectral-density)
  - [8-4-1 维纳-辛钦关系 Wiener-Khintchine Relation](#8-4-1-维纳-辛钦关系-wiener-khintchine-relation)
  - [8-4-2 各类码型的 PSD PSD of Each Scheme](#8-4-2-各类码型的-psd-psd-of-each-scheme)
- [8-5 频谱与带宽比较 Spectrum and Bandwidth](#8-5-频谱与带宽比较-spectrum-and-bandwidth)
- [8-6 码型权衡 Trade-offs](#8-6-码型权衡-trade-offs)

## 8-1 数字基带传输 Digital Baseband Transmission

数字数据在进入信道前要先变成电波形。编码器把比特序列映射为电平序列，解码器在接收端还原比特。

数据电平 Data Level 是表示数据所用的取值个数，二进制数据有两个取值。信号电平 Signal Level 是表示信号所用的取值个数，两者可以不同：多元信号用多个电平承载多个比特。

:::: definition 脉冲 Pulse
**脉冲 Pulse** 是发送一个符号所需的最短时间，其倒数为脉冲速率 Pulse Rate，即每秒发送的脉冲数。
::::

比特率与脉冲速率的关系为

$$
R_b=R_s\log_2 L
$$

其中 $R_s$ 为脉冲速率，$L$ 为信号电平数，$\log_2 L$ 为每符号比特数。

:::: stem L8-E1
某系统每秒发送 2400 个脉冲，采用 4 电平信号。求比特率。
::::

:::: solution
$L=4$，每符号携带 $\log_2 4=2$ 个比特，故

$R_b=2400\times2=4800$ bit/s
::::

## 8-2 线路编码的模型与要求 Model and Requirements

### 8-2-1 编码模型 Coding Model

:::: definition 线路编码 Line Coding
**线路编码 Line Coding** 把二进制信息序列映射为进入信道的数字信号，映射逐比特进行，区别于分组编码。
::::

线路编码器的输入是幅度序列 $a_k$，输出为脉冲波形的叠加：

$$
s(t)=\sum_{k=0}^{\infty}a_kf(t-kT_s)
$$

$f(t)$ 为符号脉冲形状，$T_s$ 为符号间隔，$a_k$ 为第 $k$ 个符号的幅度。二进制传输时 $T_s=T_b$，多元传输时 $T_s=LT_b$。

### 8-2-2 三项要求 Three Requirements

线路编码的方案选择围绕三项要求：

- **自同步 Self-synchronisation**：接收端能从信号本身恢复时钟；
- **低误码率 Low Bit Error Rate**：信号受损后仍能可靠判决；
- **合适的频谱 Suitable Spectrum**：带宽尽量小，并避开直流分量。

自同步的前提是收发时钟频率一致。接收端的比特区间必须与发送端对齐，否则判决位置偏移，数据会出错。

长串相同的 1 或 0 会让波形缺少跳变，接收端难以提取时钟，这是单极性与极性 NRZ 码的主要弱点。

直流分量来自波形正负面积不相等。电缆、双绞线、光纤等实际信道会阻断或衰减直流，脉冲变压器也无法传递直流；含直流分量的信号经过这些信道会失真，进而引起误码。

## 8-3 常见码型 Common Line Codes

![alt text](<Lecture 8.attachments/l8-pulses.png>)

三种基本脉冲的形状：NRZ 在 $T_b$ 内不回到零，RZ 在 $T_b/2$ 处回到零，Manchester 在 $T_b/2$ 处发生跳变。

### 8-3-1 单极性与极性码 Unipolar and Polar Codes

单极性码 Unipolar 用一个非零电平与一个零电平表示数据，例如 0 对应零电平、1 对应 $A$。它实现简单，但存在直流分量，长串相同比特时又缺少同步。

极性码 Polar 用两个非零电平（正、负）表示数据，消除了单极性码的直流问题。常见的极性码包括：

- **NRZ-L（电平不归零）**：电平直接对应比特，正为 1、负为 0，长串相同比特缺少跳变；
- **NRZ-I（反转不归零）**：电平翻转表示 1，不翻转表示 0，1 的连串有同步能力，0 的连串仍有问题；
- **RZ**：每个比特在 $T_b/2$ 处回到零，同步性能好，但每个比特出现两次电平变化，带宽加倍；
- **Manchester**：用比特中间的跳变同时完成同步与数据表示，由正到负表示 1，由负到正表示 0；
- **差分 Manchester**：比特中间的跳变只用于同步，比特由下一个比特区间起点有无跳变来判断。

Manchester 对交替序列工作良好，长串相同比特时跳变率最高；它被以太网 IEEE 802.3 采用。差分 Manchester 对长串 1 表现良好，长串 0 时跳变最密。

![alt text](<Lecture 8.attachments/l8-schemes.png>)

同一比特序列 101011100 在各码型下的波形。

### 8-3-2 双极性码 Bipolar Code

双极性码 Bipolar 又称传号交替反转码 AMI，用两个非零电平与零电平表示两种数据：0 对应零电平，1 交替使用正、负电平。

1 的极性交替规则带来两个好处：波形无直流分量，且连续两个 1 的极性必然相反，极性违规可以直接用来检错。

双极性码的带宽小于 Manchester，但长串 0 时仍会失去同步。

## 8-4 功率谱密度 Power Spectral Density

### 8-4-1 维纳-辛钦关系 Wiener-Khintchine Relation

随机脉冲序列的功率谱密度由脉冲形状与符号序列的自相关共同决定。根据维纳-辛钦关系：

$$
S(f)=\frac{1}{T_b}\left|x(f)\right|^2\sum_{n=-\infty}^{\infty}R_A(n)e^{-j2\pi fnT_b}
$$

其中 $x(f)$ 为单个脉冲的傅里叶变换，$R_A(n)$ 为幅度序列的自相关：

$$
R_A(n)=E\left[a_ka_{k-n}\right]
$$

矩形 NRZ 脉冲的频谱为

$$
x(f)=T_b\,\mathrm{sinc}\left(fT_b\right)
$$

sinc 函数在 $fT_b=1$ 处首次过零，这决定了码型的第一零点带宽。

### 8-4-2 各类码型的 PSD PSD of Each Scheme

单极性码的幅度取 $A$ 与 0，等概时 $R_A(0)=A^2/2$，$n\neq0$ 时 $R_A(n)=A^2/4$。代入后连续谱与直流冲激同时存在：

$$
S(f)=\frac{A^2T_b}{4}\mathrm{sinc}^2\left(fT_b\right)+\frac{A^2}{4}\delta(f)
$$

极性码的幅度取 $\pm A$，等概时 $R_A(0)=A^2$，其余自相关为零，谱中没有冲激：

$$
S(f)=A^2T_b\,\mathrm{sinc}^2\left(fT_b\right)
$$

Manchester 的脉冲频谱多出一个 $\sin(\pi fT_b/2)$ 因子，直流处为零：

$$
S(f)=A^2T_b\,\mathrm{sinc}^2\left(\frac{fT_b}{2}\right)\sin^2\left(\frac{\pi fT_b}{2}\right)
$$

双极性码的自相关为 $R_A(0)=A^2/2$、$R_A(\pm1)=-A^2/4$，其余为零：

$$
S(f)=A^2T_b\,\mathrm{sinc}^2\left(fT_b\right)\sin^2\left(\pi fT_b\right)
$$

双极性码的 $\sin^2(\pi fT_b)$ 因子把直流分量压到零，这是它优于单极性的地方。

## 8-5 频谱与带宽比较 Spectrum and Bandwidth

![alt text](<Lecture 8.attachments/l8-psd.png>)

图中未画双极性码，三条曲线分别对应单极性 NRZ、极性 NRZ 与 Manchester。极性 NRZ 的能量集中在低频，Manchester 的峰值向 $fT_b=0.5$ 偏移，单极性 NRZ 在直流处有冲激。

第一零点带宽由频谱第一次过零的位置决定：

| 码型 | 第一零点条件 | 第一零点带宽 |
| --- | --- | --- |
| 单极性 NRZ | $fT_b=1$ | $R_b$ |
| 极性 NRZ | $fT_b=1$ | $R_b$ |
| Manchester | $fT_b/2=1$ | $2R_b$ |
| 双极性 NRZ | $fT_b=1$ | $R_b$ |

Manchester 的带宽是 NRZ 的两倍，代价换来的是每个比特都有跳变、同步性能最好。

:::: stem L8-E2
某链路比特率 1 Mbit/s，分别采用极性 NRZ 与 Manchester 编码。求两种编码的第一零点带宽。
::::

:::: solution
极性 NRZ：$B=R_b=1$ MHz。

Manchester：$B=2R_b=2$ MHz。

同样的比特率下，Manchester 需要两倍带宽。
::::

## 8-6 码型权衡 Trade-offs

| 码型 | 直流分量 | 自同步 | 第一零点带宽 | 其他特点 |
| --- | --- | --- | --- | --- |
| 单极性 NRZ | 有 | 差 | $R_b$ | 实现简单，功耗小 |
| 极性 NRZ | 无 | 长连串差 | $R_b$ | 误码率低，功率较大 |
| RZ | 无 | 好 | $2R_b$ | 每比特两次跳变 |
| Manchester | 无 | 好 | $2R_b$ | 以太网采用 |
| 双极性 | 无 | 长串 0 差 | $R_b$ | 可检错，需要记忆极性 |

选型取决于三项要求的折中。带宽受限且允许较长连串时用 NRZ 类码；需要可靠时钟恢复时用 Manchester 或 RZ；需要检错且连 0 不多时用双极性码。
