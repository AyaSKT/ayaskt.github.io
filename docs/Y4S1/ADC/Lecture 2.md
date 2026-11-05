---
lastUpdated: 2026-11-04T10:34:19+08:00
---

# 2 Transmission Media

<LyricCover
  image="Lecture 2.attachments/egaku-mirai-cover.jpg"
  title="夢じゃないならなんなのさ"
  artist="Little Glee Monster"
  lang="ja"
  netease-url="https://music.163.com/song?id=2693374723"
>
  <LyricLine
    original="この身体(からだ)から溢(あふ)れるものが"
    translation="自这具身体之中满溢而出的"
  />
  <LyricLine
    original="夢(ゆめ)じゃないならなんなのさ"
    translation="如果不是梦想还能是什么呢"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [2-1 传输介质与信号 Transmission Medium and Signal](#_2-1-传输介质与信号-transmission-medium-and-signal)
- [2-2 有线介质 Guided Media](#_2-2-有线介质-guided-media)
- [2-3 无线介质与天线 Wireless Media and Antennas](#_2-3-无线介质与天线-wireless-media-and-antennas)
- [2-4 频段、传播与介质选择 Frequency Bands, Propagation and Medium Selection](#_2-4-频段、传播与介质选择-frequency-bands-propagation-and-medium-selection)
- [2-5 模拟带宽与数字带宽 Analogue and Digital Bandwidth](#_2-5-模拟带宽与数字带宽-analogue-and-digital-bandwidth)
- [2-6 分贝与功率电平 Decibels and Power Levels](#_2-6-分贝与功率电平-decibels-and-power-levels)
- [2-7 信道损伤 Channel Impairments](#_2-7-信道损伤-channel-impairments)
  - [2-7-1 衰减 Attenuation](#_2-7-1-衰减-attenuation)
  - [2-7-2 失真 Distortion](#_2-7-2-失真-distortion)
  - [2-7-3 噪声 Noise](#_2-7-3-噪声-noise)
- [2-8 热噪声与信噪比 Thermal Noise and SNR](#_2-8-热噪声与信噪比-thermal-noise-and-snr)
- [2-9 再生中继器 Regenerative Repeater](#_2-9-再生中继器-regenerative-repeater)
- [2-10 比特率与信道容量 Bit Rate and Channel Capacity](#_2-10-比特率与信道容量-bit-rate-and-channel-capacity)

## 2-1 传输介质与信号 Transmission Medium and Signal

:::: definition 传输介质 Transmission Medium
**传输介质 Transmission Medium** 是发送机与接收机之间承载信号传播的物理路径。
::::

与 1-3-6 节的信道相对应，这里关注的是介质的物理性质。实际介质都不是理想的。介质决定了四件事：

- 哪些频率可以传播；
- 多少信号功率被损耗；
- 多少失真被引入；
- 多少噪声与干扰叠加到接收信号上。

传输介质按物理路径分为两类：

![alt text](<Lecture 2.attachments/tm-taxonomy-wide.png>)

- **有线介质 Guided Media**：双绞线、同轴电缆、光纤；
- **无线介质 Wireless Media**：无线电波、微波、红外、毫米波、太赫兹。

---

通信信号通常由多个频率分量组成。真实介质对各分量的处理并不相同：

- 部分分量衰减更大；
- 部分分量相移不同；
- 部分分量传播时延不同。

因此接收波形一般不恢复为发送波形：

$$
s_{\mathrm{received}}(t)\neq s_{\mathrm{transmitted}}(t).
$$

数字脉冲（例如方波）含有大量频率分量。分量被强烈衰减或延迟后，接收脉冲失去原有形状，后果包括：

- 脉冲展宽 Pulse Spreading；
- 定时不确定性 Timing Uncertainty；
- 码间干扰 Inter-Symbol Interference, ISI；
- 符号错误概率上升。

> [!IMPORTANT]
> 带宽不足时提高符号速率，脉冲展宽与 ISI 会同时加重。介质的频率响应给定了可靠传输速率的上限。

## 2-2 有线介质 Guided Media

:::: definition 双绞线 Twisted Pair
**双绞线 Twisted Pair** 由两根绝缘铜导线绞合而成，绞合用于抑制相邻导体之间的电磁耦合。
::::

多对双绞线通常捆扎在同一根电缆内，必要时外加屏蔽层。干扰电磁场会在两根导线上感应出近似相同的无用电压；导线反复交换位置后，两部分感应电压在差分接收中相互抵消。

| 优点 | 限制 |
| --- | --- |
| 成本低 | 衰减随频率变化 |
| 安装方便 | 串扰 Crosstalk |
| 技术成熟 | 电磁干扰 EMI |
| 适合短至中距离链路 | 可用带宽低于光纤 |

线缆变长后，可达数据速率下降，原因是衰减与失真都随距离加重。

---

:::: definition 同轴电缆 Coaxial Cable
**同轴电缆 Coaxial Cable** 由内导体、介质、外导体与护套同轴套叠构成，外导体兼作屏蔽层并约束电磁场。
::::

![alt text](<Lecture 2.attachments/coax-structure-wide.png>)

与无屏蔽双绞线相比，同轴电缆的抗干扰能力更强、可用频率范围更宽、辐射泄漏更低。典型应用包括有线电视、射频互连、天线馈线系统与测量设备。

性能受导体损耗、介质损耗、连接器损耗与频率相关衰减限制。频率越高，电缆损耗越大。

---

:::: definition 光纤 Optical Fibre
**光纤 Optical Fibre** 是用玻璃或塑料制成的细而可弯曲的介质，通过芯层与包层的折射率差约束光线沿轴向传播。
::::

光纤电缆为圆柱结构，由三个同心圆层组成：芯 Core、包层 Cladding、护套 Jacket。

![alt text](<Lecture 2.attachments/fibre-structure-wide.png>)

超纯玻璃光纤的损耗最低。多组分玻璃光纤与塑料光纤成本更低，损耗更大。

优点：

- 可用带宽极高；
- 衰减很低；
- 传输距离长；
- 抗电磁干扰；
- 电气隔离；
- 体积小。

限制：

- 需要光电转换；
- 连接器与熔接要求高；
- 弯曲损耗；
- 安装成本与复杂度高。

容量与传输距离成为主要设计约束时，光纤优先。

---

有线介质与无线介质的总体差异如下。

| 属性 | 有线介质 | 无线介质 |
| --- | --- | --- |
| 物理路径 | 电缆或光纤 | 自由空间 |
| 移动性 | 有限 | 高 |
| 干扰暴露 | 一般较低 | 一般较高 |
| 覆盖 | 由线缆决定 | 由传播条件决定 |
| 部署 | 需要物理安装 | 需要无线基础设施 |
| 频谱 | 取决于介质 | 受监管的无线电频谱 |

光纤容量极大，仍然选择无线介质的场合包括：

- 终端需要移动；
- 布线成本过高或无法布线；
- 需要广播或快速覆盖大面积区域。

## 2-3 无线介质与天线 Wireless Media and Antennas

:::: definition 天线 Antenna
**天线 Antenna** 是用于辐射或接收电磁能量的导体结构，发射时把电信号转换为电磁能量，接收时把电磁能量转换为电信号。
::::

同一副天线可以兼作收发，收发特性相同。典型天线向各个方向辐射功率，但各方向的功率并不相等。

---

:::: definition 辐射方向图 Radiation Pattern
**辐射方向图 Radiation Pattern** 是天线辐射特性随空间方向变化的图形表示。
::::

![alt text](<Lecture 2.attachments/radiation-patterns-wide.png>)

图中左、中为某实际天线的方位面与俯仰面方向图，右侧为各向同性天线的三维方向图。

---

:::: definition 各向同性天线 Isotropic Antenna
**各向同性天线 Isotropic Antenna** 又称理想天线，在空间所有方向上均匀辐射功率，用作天线增益的参考。
::::

:::: definition 天线增益 Antenna Gain
**天线增益 Antenna Gain** 是天线在给定方向上辐射的功率与各向同性天线在同一距离处辐射的功率之比。
::::

有效面积 $A_e$ 取决于天线的物理尺寸与形状。增益与有效面积、波长的关系为

$$
\boxed{
G=\frac{4\pi A_e}{\lambda^2}=\frac{4\pi f^2 A_e}{c^2}
}
$$

其中：

- $G$：天线增益，相对于各向同性天线，单位为 dBi；
- $A_e$：有效面积，$\mathrm{m^2}$；
- $\lambda$：波长，$\mathrm{m}$；
- $f$：载波频率，$\mathrm{Hz}$；
- $c$：光速，$\mathrm{m/s}$。

由 $G\propto f^2$ 可知，同一有效面积在更高载频上给出更大增益；反之，同一增益在高频处所需的物理口径更小。

## 2-4 频段、传播与介质选择 Frequency Bands, Propagation and Medium Selection

各频段的划分与典型应用如下。

| 频段 | 频率范围 | 传播特点 | 典型应用 |
| --- | --- | --- | --- |
| 无线电波 Radio | $30\text{--}300\,\mathrm{MHz}$ | 全向，无需抛物面天线 | 广播 |
| 微波 Microwave | $300\,\mathrm{MHz}\text{--}30\,\mathrm{GHz}$ | 视距点对点，天线架高 | 蜂窝、IoT、Wi-Fi、卫星广播、地球探测 |
| 毫米波 mmWave | $30\text{--}300\,\mathrm{GHz}$ | 波束窄，易被遮挡 | 蜂窝、点对点、雷达、遥感 |
| 红外 Infrared | $300\,\mathrm{GHz}\text{--}430\,\mathrm{THz}$ | 非相干调制，依赖视距或反射 | 短距视距链路 |
| 太赫兹 Terahertz | $300\,\mathrm{GHz}\text{--}3\,\mathrm{THz}$ | 位于红外频段内 | 感知、超高速通信 |

![alt text](<Lecture 2.attachments/wireless-spectrum-wide.png>)

微波适合地面与卫星的点对点通信，天线架高后覆盖更好，长距离链路上所需的中继较少。毫米波介于微波与红外之间。红外收发机调制非相干红外光，依赖视距或反射。太赫兹处在红外带内，波长短、可用带宽大。

---

载频决定波长：

$$
\lambda=\frac{c}{f}.
$$

载频进一步影响天线尺寸、传播损耗、绕射、穿透能力、可用带宽与被遮挡的敏感程度。

| 较低频率 | 较高频率 |
| --- | --- |
| 绕射更好 | 可用带宽更大 |
| 穿透更好 | 天线阵元更小 |
| 覆盖范围更大 | 波束更窄 |
| 天线尺寸更大 | 可达数据速率更高 |

较高频率更易受遮挡与传播损耗影响。

:::: stem L2-E1
计算 3.5 GHz 与 28 GHz 的波长，并说明短波长对天线阵列的意义。
::::

:::: solution
取 $c=3\times10^8\,\mathrm{m/s}$。3.5 GHz 时

$$
\lambda=\frac{3\times10^8}{3.5\times10^9}=8.57\times10^{-2}\,\mathrm{m}\approx 8.6\,\mathrm{cm}.
$$

28 GHz 时

$$
\lambda=\frac{3\times10^8}{28\times10^9}=1.07\times10^{-2}\,\mathrm{m}=1.07\,\mathrm{cm}.
$$

波长缩短到约八分之一，按半波长间距排布时，同一物理面积可容纳的阵元数增加约 $8^2=64$ 倍。毫米波阵列由此在小尺寸内获得更高增益与更窄波束。
::::

---

介质选择取决于一组相互牵连的因素：

- 所需数据速率；
- 覆盖范围或传输距离；
- 移动性；
- 传播环境；
- 频谱可用性；
- 能耗；
- 可靠性；
- 成本。

数据中心骨干链路与手机终端的数据速率要求可能接近，所选介质却完全不同。介质是设计决策，随应用约束变化。

## 2-5 模拟带宽与数字带宽 Analogue and Digital Bandwidth

:::: definition 模拟带宽 Analogue Bandwidth
**模拟带宽 Analogue Bandwidth** 是介质能够通过的频率范围，单位为赫兹，表示每秒可容纳的周期数。
::::

:::: definition 数字带宽 Digital Bandwidth
**数字带宽 Digital Bandwidth** 是介质能够通过的最大比特率，单位为 $\mathrm{bit/s}$。
::::

信号带宽一般小于介质带宽。把 4 kHz 的信号送入 1 kHz 的介质时，1 kHz 以上的分量被截掉，接收端无法重建原波形。

## 2-6 分贝与功率电平 Decibels and Power Levels

:::: definition 分贝 Decibel
**分贝 Decibel, dB** 是功率比值的对数表示，用于把极大或极小的乘除运算化为加减：

$$
Y=10\log_{10}(X),\qquad X=10^{Y/10}.
$$
::::

对数把乘法变成加法：

$$
\log(A\cdot B)=\log A+\log B,\qquad \log(X^N)=N\log X.
$$

常用比值与 dB 的对应关系如下。

| 比值 | dB | 比值 | dB |
| --- | ---: | --- | ---: |
| 1 | 0 | 1/2 | -3 |
| 10 | 10 | 1/4 | -6 |
| 100 | 20 | 20 | +13 |
| 1000 | 30 | 200 | +23 |
| 0.1 | -10 | 400 | +26 |
| 0.01 | -20 | 8 | 9 |
| 0.001 | -30 | | |

比值减半对应 -3 dB，比值加倍对应 +3 dB。这一对换算在功率与带宽估算中使用最频繁。

---

放大器把 1 mW 放大到 1 W 时，增益为

$$
G=10\log_{10}\frac{P_o}{P_i}=10\log_{10}\frac{1}{10^{-3}}=30\,\mathrm{dB}.
$$

衰减器的增益取负值。1 W 衰减到 0.1 W 时 $G=-10\,\mathrm{dB}$，衰减量 $L=-G=10\,\mathrm{dB}$。

多级级联后的总增益等于各级 dB 之和：

$$
G=+30-10+20=40\,\mathrm{dB}.
$$

---

绝对功率电平以 1 W 或 1 mW 为参考：

$$
\mathrm{dBW}=10\log_{10}\frac{P}{1\,\mathrm{W}},
\qquad
\mathrm{dBm}=10\log_{10}\frac{P}{1\,\mathrm{mW}}.
$$

两者的参考功率相差 1000 倍，因此

$$
\mathrm{dBW}=\mathrm{dBm}-30.
$$

| 线性功率 | dBW | dBm |
| --- | ---: | ---: |
| 1 W | 0 | +30 |
| 10 W | +10 | +40 |
| 100 W | +20 | +50 |
| 0.1 W | -10 | +20 |
| 0.01 W | -20 | +10 |
| 1 mW | -30 | 0 |

---

分贝同样用于带宽、温度与玻尔兹曼常数：

- 带宽：$1\,\mathrm{MHz}=10^6\,\mathrm{Hz}$，即 60 dB-Hz；$1\,\mathrm{kHz}$ 为 30 dB-Hz；
- 温度：$200\,\mathrm{K}$ 为 23 dB-K，$1000\,\mathrm{K}$ 为 30 dB-K；
- 玻尔兹曼常数：$k=1.38\times10^{-23}\,\mathrm{J/K}=-228.6\,\mathrm{dBW/Hz/K}$。

带宽写成 dB-Hz 后，噪声功率等于噪声功率谱密度与带宽的 dB 值相加，链路预算因此可以全程用加减完成。

## 2-7 信道损伤 Channel Impairments

信号经过任何介质都会被衰减、失真与噪声损伤。三者往往同时存在，接收端的任务是在三者共同作用下恢复发送信息。

### 2-7-1 衰减 Attenuation

![alt text](<Lecture 2.attachments/attenuation-signal-wide.png>)

:::: definition 衰减 Attenuation
**衰减 Attenuation** 是信号沿介质传播时发生的能量损失。
::::

信号必须克服介质的阻力，部分电能在传输中转换为热。导线通电后发热即为此现象。衰减的来源包括导体损耗、介质损耗与传播损耗。

衰减降低信号幅度，不破坏信息本身。只要接收端能把信号与噪声区分开，弱信号仍然携带全部发送信息。

有线介质中的衰减随距离按指数下降，通常用每单位长度的固定 dB 数 $\alpha$ 描述。无线介质中的自由空间路径损耗为

$$
\boxed{
L=10\log_{10}\left(\frac{4\pi d}{\lambda}\right)^2\ \mathrm{dB}
}
$$

其中：

- $L$：路径损耗，$\mathrm{dB}$；
- $d$：收发距离，$\mathrm{m}$；
- $\lambda$：波长，$\mathrm{m}$。

路径损耗随距离按对数增长，距离每加倍增加约 6 dB，慢于有线介质的指数衰减。降雨会额外增加无线链路的衰减，频率越高越明显。

:::: stem L2-E2
某信号经过一段传输介质后功率降为原来的一半。求衰减量。
::::

:::: solution
以增益形式计算功率比：

$$
G=10\log_{10}\frac{0.5P}{P}=10\log_{10}0.5\approx-3.01\,\mathrm{dB}.
$$

衰减量 $L=-G\approx3.01\,\mathrm{dB}$，即约 3 dB。
::::

---

### 2-7-2 失真 Distortion

:::: definition 失真 Distortion
**失真 Distortion** 指信道改变了复合信号的波形形状，各频率分量的相对关系在接收端无法复原。
::::

复合信号的不同频率分量在介质中的时延与衰减各不相同。接收端各分量不再按原相位关系叠加，合成波形随之改变。数字信号中的失真是 ISI 的来源之一。

均衡器 Equalizer 用于补偿信道特性，把失真压到可接受的水平。

> [!NOTE]
> 若所有分量经历完全相同的延迟，波形只是在时间上整体平移，形状不变。整体延迟因此不构成失真，只有分量之间的相对差异才改变波形。

---

### 2-7-3 噪声 Noise

:::: definition 噪声 Noise
**噪声 Noise** 是叠加在有用信号上的无用信号，是所有通信系统的限制因素。
::::

模拟系统中，噪声降低信号质量，表现为电视屏幕的雪花与音频中的静电声。数字系统中，噪声造成误码，可靠性的损失通过重传或额外编码换取，吞吐量随之下降。

噪声来源分为两类：

- 外部自然噪声：大气扰动（雷暴、闪电、电离层效应）、宇宙噪声。这类噪声影响所有形式的无线电传输，系统设计必须计入；
- 内部电路噪声：通信系统中有源与无源器件产生的噪声。

按机理划分，常见噪声有三类：

| 类型 | 来源 | 特点 |
| --- | --- | --- |
| 热噪声 Thermal Noise | 电阻中电子的热运动 | 持续存在，功率与带宽成正比 |
| 感应噪声 Induced Noise | 电动机、家用电器 | 由外部设备耦合进入电路 |
| 脉冲噪声 Impulse Noise | 电力线、雷电、汽车发动机 | 短时尖峰，易造成突发错误 |

## 2-8 热噪声与信噪比 Thermal Noise and SNR

:::: definition 热噪声 Thermal Noise
**热噪声 Thermal Noise** 由所有电阻产生，来源于耗散器件中电子的热运动，其功率为

$$
P_n=kTB .
$$
::::

其中：

- $k=1.38\times10^{-23}\,\mathrm{J/K}$，即 $-228.6\,\mathrm{dBW/Hz/K}$；
- $T$：绝对温度，常温取 $290\,\mathrm{K}$；
- $B$：带宽，$\mathrm{Hz}$。

在 $290\,\mathrm{K}$ 下，噪声功率谱密度为

$$
N_0=kT=1.38\times10^{-23}\times290=4.0\times10^{-21}\,\mathrm{W/Hz}=-174\,\mathrm{dBm/Hz}.
$$

用 dB 表示时，噪声功率等于谱密度与带宽的 dB 值之和：

$$
N(\mathrm{dBm})=-174+10\log_{10}B .
$$

:::: stem L2-E3
接收机带宽 $B=10\,\mathrm{MHz}$，温度 $290\,\mathrm{K}$。求热噪声功率；若带宽加倍，噪声功率变化多少？
::::

:::: solution
$10\,\mathrm{MHz}=10^7\,\mathrm{Hz}$，故

$$
N=-174+10\log_{10}(10^7)=-174+70=-104\,\mathrm{dBm}.
$$

带宽加倍对应 $+10\log_{10}2\approx+3\,\mathrm{dB}$，噪声功率变为 $-101\,\mathrm{dBm}$。
::::

---

:::: definition 加性白高斯噪声 Additive White Gaussian Noise
**加性白高斯噪声 Additive White Gaussian Noise, AWGN** 是数字通信中最常用的参考信道模型，其三个性质为：

- 加性 Additive：噪声叠加在接收信号上；
- 白 White：功率谱密度近似为常数；
- 高斯 Gaussian：噪声幅度服从高斯分布。
::::

接收信号写成

$$
r(t)=s(t)+n(t),
$$

其中 $s(t)$ 为发送信号，$n(t)$ 为噪声。AWGN 把噪声的统计特性与信号的调制方式分开处理，便于分析不同调制方案的性能。

---

:::: definition 信噪比 Signal-to-Noise Ratio
**信噪比 Signal-to-Noise Ratio, SNR** 是接收信号平均功率与噪声平均功率之比：

$$
\mathrm{SNR}=\frac{S}{N},
\qquad
\mathrm{SNR_{dB}}=10\log_{10}\frac{S}{N}.
$$
::::

通信系统的目标是最大化接收端的信噪比。SNR 越高，误码率越低。

![alt text](<Lecture 2.attachments/ber-vs-snr-wide.png>)

误码率曲线给出给定 SNR 下的平均错误比特比例。曲线越靠左下，达到同样 BER 所需的 SNR 越低。

> [!NOTE]
> 曲线位置由调制方式与检测方式决定。同一 SNR 下，不同调制方案的 BER 不同，BPSK 与 16-QAM 的曲线并不重合。

## 2-9 再生中继器 Regenerative Repeater

长距离链路上，信号经过衰减、失真与噪声后需要再生。再生中继器完成三项任务：

1. 用均衡器重整接收脉冲的形状；
2. 从接收信号中提取定时信息；
3. 由采样器与判决电路做出符号判决。

与模拟放大器不同，再生中继器输出的是重新生成的脉冲，噪声不在每一级累积。

![alt text](<Lecture 2.attachments/regenerative-repeater-wide.png>)

均衡器补偿信道特性，抵消 ISI；前置放大器提高信号电平。放大器同时放大噪声，这一现象称为噪声放大。该模块在失真与噪声放大之间折中：均衡越强，高频噪声被抬起越多；放大倍数越高，噪声电平越高。判决前需要保证足够的 SNR。

---

定时提取有三种方式：

| 方式 | 原理 | 特点 |
| --- | --- | --- |
| 主基准或次基准 | 依赖主时钟信息 | 用于高速数据传输，成本高 |
| 同步信号 | 随数据发送独立导频 | 要求信道容量大于信号带宽，功耗较高 |
| 自同步 | 不发送导频，从数据本身提取 | 成本低，功耗低 |

---

:::: definition 定时抖动 Timing Jitter
**定时抖动 Timing Jitter** 是脉冲位置相对理想时刻的变化，会造成脉冲失真与 ISI。
::::

抖动可用带弹性存储的缓冲链路抑制。采样判决电路 Sampling and Decision Circuit 使用定时提取给出的时钟对均衡后的信号采样，输出 0 或 1。

## 2-10 比特率与信道容量 Bit Rate and Channel Capacity

由 1-3-5 节，$M$ 个可能符号的系统中每符号携带 $k=\log_2 M$ 个比特，故

$$
R_b=R_s\log_2 M,\qquad k=\log_2 M .
$$

:::: stem L2-E4
某系统采用 16-QAM，比特率 $R_b=40\,\mathrm{Mbit/s}$。求每符号比特数与符号速率。
::::

:::: solution
$M=16$，故每符号携带

$$
k=\log_2 16=4\ \mathrm{bit}.
$$

符号速率为

$$
R_s=\frac{R_b}{k}=\frac{40}{4}=10\,\mathrm{Mbaud}.
$$
::::

:::: stem L2-E5
某信号每符号携带 3 bit，每秒发送 600 个符号。求比特率。
::::

:::: solution
$$
R_b=kR_s=3\times600=1800\,\mathrm{bit/s}.
$$
::::

:::: stem L2-E6
某信号比特率 $4000\,\mathrm{bit/s}$，波特率 1000 baud。求每符号比特数。
::::

:::: solution
$$
k=\frac{R_b}{R_s}=\frac{4000}{1000}=4\ \mathrm{bit}.
$$

即 $M=2^4=16$，每符号有 16 个可选状态。
::::

---

> The fundamental problem of communication is that of reproducing at one point either exactly or approximately a message selected at another point.
>
> ——Shannon, *A Mathematical Theory of Communication*, 1948

:::: definition 信道容量 Channel Capacity
**信道容量 Channel Capacity** 是给定带宽与信噪比条件下，信道能够可靠传输的最高比特率。
::::

$$
\boxed{
C=B\log_2\left(1+\frac{S}{N}\right)
}
$$

其中：

- $C$：信道容量，$\mathrm{bit/s}$；
- $B$：带宽，$\mathrm{Hz}$；
- $S/N$：线性信噪比。

提高容量的手段包括增大带宽 $B$、增大信号功率 $S$、减小噪声功率 $N$，以及三者的组合。

> [!WARNING]
> 代入香农公式时 $S/N$ 必须使用线性比值。以 dB 给出的信噪比需先按 $S/N=10^{\mathrm{SNR_{dB}}/10}$ 转换，直接代入 dB 值会得到错误结果。

:::: stem L2-E7
某信道带宽 $B=1\,\mathrm{MHz}$，接收信噪比 $20\,\mathrm{dB}$。求香农容量。
::::

:::: solution
先转换为线性信噪比：

$$
\frac{S}{N}=10^{20/10}=100.
$$

代入容量公式：

$$
C=10^6\log_2(1+100)=10^6\times6.66=6.66\,\mathrm{Mbit/s}.
$$
::::

> [!NOTE]
> 香农容量是可可靠传输速率的上界，实际系统需要信道编码才能逼近。无编码传输在相同 SNR 下只能达到低得多的速率。
