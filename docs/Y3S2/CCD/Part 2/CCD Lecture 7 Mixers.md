# Lecture 7 Mixers 混频器

**孤独の中，泣いても，**  
**孤独的内心，即使哭泣，**  

**蝶の羽根で，おやすみなさい。**  
**也要在蝴蝶的翅膀上，说着晚安。**  


<div align="right">——Aiobahn/長瀬有花 《宙でおやすみ (在天空晚安)》</div>

![alt text](<CCD Lecture 7 Mixers.attachments/1780057844904.PNG>)

## 章节目录

- [章节目录](#章节目录)
- [7-1 混频原理 Mixing Principle](#7-1-混频原理-mixing-principle)
  - [7-1-1 基本乘法关系 Basic Multiplication Relation](#7-1-1-基本乘法关系-basic-multiplication-relation)
  - [7-1-2 上变频与下变频 Up-Conversion and Down-Conversion](#7-1-2-上变频与下变频-up-conversion-and-down-conversion)
  - [7-1-3 理想频移电路 Ideal Frequency Shifting Circuit](#7-1-3-理想频移电路-ideal-frequency-shifting-circuit)
- [7-2 混频器实现 Mixer Implementations](#7-2-混频器实现-mixer-implementations)
  - [7-2-1 二极管混频器 Diode Mixer](#7-2-1-二极管混频器-diode-mixer)
  - [7-2-2 BJT 混频器 BJT Mixer](#7-2-2-bjt-混频器-bjt-mixer)
  - [7-2-3 JFET 混频器 JFET Mixer](#7-2-3-jfet-混频器-jfet-mixer)
  - [7-2-4 双栅 MOSFET 混频器 Dual-Gate MOSFET Mixer](#7-2-4-双栅-mosfet-混频器-dual-gate-mosfet-mixer)
- [7-3 镜像频率与抑制 Image Frequency and Rejection](#7-3-镜像频率与抑制-image-frequency-and-rejection)
  - [7-3-1 镜像频率 Image Frequency](#7-3-1-镜像频率-image-frequency)
  - [7-3-2 镜像抑制 Image Frequency Rejection](#7-3-2-镜像抑制-image-frequency-rejection)
- [7-4 混频器指标 Mixer Metrics](#7-4-混频器指标-mixer-metrics)
- [7-5 例题 Exercises](#7-5-例题-exercises)
- [Summary](#summary)

## 7-1 混频原理 Mixing Principle



### 7-1-1 基本乘法关系 Basic Multiplication Relation

:::: definition 混频器 Mixer
混频器是一个三端口电路，用非线性器件把两个交流信号相乘，从而在输出端产生新的频率分量。
::::

混频按乘法处理。若两个输入为

$$
v_1(t)=V_1\cos(\omega_1 t)
$$

和

$$
v_2(t)=V_2\cos(\omega_2 t)
$$

则乘积中会出现和频与差频：

$$
\cos(\omega_1t)\cos(\omega_2t)
=\frac{1}{2}\cos((\omega_1-\omega_2)t)
+\frac{1}{2}\cos((\omega_1+\omega_2)t)
$$

同理，

$$
\sin(\omega_1t)\sin(\omega_2t)
=\frac{1}{2}\cos((\omega_1-\omega_2)t)
-\frac{1}{2}\cos((\omega_1+\omega_2)t)
$$

也就是说，输出频率约为

$$
\omega_{\mathrm{out}}=\omega_1+\omega_2
$$

和

$$
\omega_{\mathrm{out}}=|\omega_1-\omega_2|
$$

。

实际混频器输出常同时包含两个分量，因此后级需要接滤波器，仅保留所需频率分量。

![混频器后接滤波器](<CCD Lecture 7 Mixers.attachments/mix_05_mixer_filter_superhet.jpg>)

:::: tip
频域分析更适合理解混频：时域波形叠加不能直接反映频率成分，频谱可明确显示和频与差频的位置。
::::


---

### 7-1-2 上变频与下变频 Up-Conversion and Down-Conversion

混频最常见的用途就是频率搬移。

| 场景 | 输入 | 保留分量 | 结果 |
| --- | --- | --- | --- |
| 发射端 | 基带信号 + 本地振荡器 | 和频 | 上变频 |
| 接收端 | 射频信号 + 本地振荡器 | 差频 | 下变频 |

发射端中，基带信号与本地振荡器产生的载波混频，保留和频后信号被搬到射频频段。

接收端中，收到的射频信号与本地振荡器混频，保留差频后得到较低的中频或基带信号。

若输入是一段带宽内的信号，混频会把整段频谱整体搬移。公式上仍可把每个频率分量分别与本地振荡器相乘，再取和频或差频。


---

### 7-1-3 理想频移电路 Ideal Frequency Shifting Circuit

理论上，可以用两路相乘、90° 相移和加减法构造一个只输出单边频移的理想频移电路。

![理想频移电路](<CCD Lecture 7 Mixers.attachments/mix_07_ideal_frequency_shifter.jpg>)

这种结构的关键问题在于 90° 移相器。固定频率下做 90° 相移还算容易，但如果要在宽频带上保持精确 90°，实现会非常麻烦。

所以实际电路一般不会强行做完美频移，而是用单个乘法器或非线性器件产生多个分量，再用滤波器去掉不想要的频率。

## 7-2 混频器实现 Mixer Implementations

混频需要非线性。二极管、BJT、JFET 和 MOSFET 都可以用来做混频器，只是产生的附加频率分量和转换增益不一样。



### 7-2-1 二极管混频器 Diode Mixer

二极管电流满足指数关系：

$$
i_D=I_S\left(e^{v_D/V_T}-1\right)
$$

若

$$
v_D=\frac{1}{2}(v_1+v_2)
$$

并在小信号条件下展开泰勒级数：

$$
e^{v_D/V_T}\approx
1+\frac{v_D}{V_T}
+\frac{1}{2}\left(\frac{v_D}{V_T}\right)^2
$$

。

线性项只保留原输入频率 $\omega_1,\omega_2$。平方项中有

$$
(v_1+v_2)^2=v_1^2+2v_1v_2+v_2^2
$$

其中 $2v_1v_2$ 就给出 $\omega_1+\omega_2$ 和 $|\omega_1-\omega_2|$。

若写出平方项中的频率成分：

$$
\frac{1}{2}\left(\frac{v_D}{V_T}\right)^2
\rightarrow
2\omega_1,\quad 2\omega_2,\quad |\omega_1-\omega_2|,\quad \omega_1+\omega_2
$$

![二极管混频器](<CCD Lecture 7 Mixers.attachments/mix_09_diode_mixer.jpg>)

二极管混频器的问题是它还会产生 $2\omega_1$、$2\omega_2$ 等不想要的分量。如果输入不够小，高阶泰勒项还会继续产生更多杂散分量。

![二极管混频器与 LC 滤波](<CCD Lecture 7 Mixers.attachments/mix_10_diode_mixer_filter.jpg>)


---

### 7-2-2 BJT 混频器 BJT Mixer

BJT 混频器的思路类似，只是非线性关系换成集电极电流：

$$
i_C=I_S\left(e^{v_{BE}/V_T}-1\right)
$$

输入信号加到基极上：

$$
v_{BE}=\frac{1}{2}(v_1+v_2)
$$

平方项仍然产生 $\omega_1\pm\omega_2$。

![BJT 混频器](<CCD Lecture 7 Mixers.attachments/mix_11_bjt_mixer_wide.jpg>)

BJT 是有源混频器，可以提供转换增益，在混频的同时可能带来放大，对后级需要一定功率电平的场景较为适用。

缺点也很直接：指数关系仍然需要小信号近似，不然高阶项会变多。


---

### 7-2-3 JFET 混频器 JFET Mixer

JFET 的电流关系为平方形式：

$$
I_D=I_{DSS}\left(1-\frac{v_{GS}}{V_P}\right)^2
$$

展开后：

$$
I_D=I_{DSS}
\left[
1-2\frac{v_{GS}}{V_P}
+\frac{v_{GS}^2}{V_P^2}
\right]
$$

平方关系天然包含交叉项，因此也能产生和频与差频。

若 $v_{GS}$ 由两个输入单音叠加而成，平方项近似给出

$$
I_D\sim
-I_{DSS}\frac{V_1V_2}{2V_P^2}
\left[
\cos(|\omega_1-\omega_2|t)
+\cos((\omega_1+\omega_2)t)
\right]
$$

JFET 混频器的优势在于没有指数展开中的无限高阶项，因此杂散项较少，也能接受更大的输入信号。这里的 $I_{DSS}$ 也会带来转换增益。


---

### 7-2-4 双栅 MOSFET 混频器 Dual-Gate MOSFET Mixer

双栅 MOSFET 可以理解为两个匹配得很好的 MOSFET 叠在一起，两个栅极分别接两个输入频率。

![双栅 MOSFET 混频器](<CCD Lecture 7 Mixers.attachments/mix_13_dual_gate_mosfet.jpg>)

输出可近似写成

$$
V_{out}\sim
g_{m\Delta}R_DV_1
\left[
\cos(|\omega_1-\omega_2|t)
+\cos((\omega_1+\omega_2)t)
\right]
$$

因此输出中仍然有 $\omega_1+\omega_2$ 和 $|\omega_1-\omega_2|$。转换增益与跨导变化量 $g_{m\Delta}$ 有关，而且与其中一个输入幅度有关，所以本振驱动电平不能随便选。

## 7-3 镜像频率与抑制 Image Frequency and Rejection



### 7-3-1 镜像频率 Image Frequency

镜像频率是超外差接收机中需要特别注意的问题。

因为混频器只关心差频：

$$
f_{\mathrm{IF}}=|f_{\mathrm{LO}}-f_{\mathrm{RF}}|
$$

所以在给定 $f_{\mathrm{LO}}$ 和 $f_{\mathrm{IF}}$ 时，可能有两个射频频率都能混出同一个中频：

$$
f_{\mathrm{RF,desired}}=f_{\mathrm{LO}}-f_{\mathrm{IF}}
$$

和

$$
f_{\mathrm{image}}=f_{\mathrm{LO}}+f_{\mathrm{IF}}
$$

。

![Image frequency](<CCD Lecture 7 Mixers.attachments/mix_14_image_frequency.jpg>)

如果目标射频频率在本振频率下方，则镜像频率在本振频率上方；反过来也一样。

:::: tip
镜像频率来自差频机制：位于本振两侧且间隔相同的两个频率，会落到同一个中频。
::::


---

### 7-3-2 镜像抑制 Image Frequency Rejection

处理镜像频率的方法主要有两类：

- 通信标准避免把重要业务频率安排成彼此的镜像；
- 接收机前端用带通滤波器在混频器前或混频器后抑制镜像。

LC 并联谐振电路可以做带通滤波器。其选择性由品质因数 $Q$ 决定。

![镜像抑制滤波器](<CCD Lecture 7 Mixers.attachments/mix_15_image_rejection_filter.jpg>)

在谐振频率 $\omega_0$ 附近定义

$$
\delta=\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega}
$$

则相对输出幅度可近似写成

$$
A_r=\frac{V_0(\omega)}{V_0(\omega_0)}
=\frac{1}{\sqrt{1+(\delta Q)^2}}
$$

。

换成 dB：

$$
A_{r,\mathrm{dB}}=20\log_{10}(A_r)
$$

。

多级调谐滤波器可以串联使用。每一级都提供一定镜像抑制，总体抑制会更强。

## 7-4 混频器指标 Mixer Metrics

选混频器时不能只看能不能混频。数据手册里比较常见的指标如下。

| 指标 | 含义 | 备注 |
| --- | --- | --- |
| 频率范围 Frequency Range | 射频、本振、中频端口可工作的频率范围 | 三个端口可能范围不同 |
| 转换损耗 Conversion Loss | 射频到中频的信号损耗 | 无源混频器常见，单位 dB |
| 转换增益 Conversion Gain | 中频输出功率相对射频输入功率的增益 | 有源混频器可能为正 |
| 隔离度 Isolation | 本振泄漏到射频/中频端口的程度 | 越大越好 |
| 最大射频功率 Max RF Power | 射频端口最大允许功率 | 超过可能损坏器件 |
| 本振电平 LO Level | 本振端所需驱动功率 | 常见 Level 7 Mixer 表示约 +7 dBm |
| VSWR | 端口匹配程度 | 越接近 1 越好 |
| $P_{1\mathrm{dB}}$ | 转换增益压缩 $1\,\mathrm{dB}$ 时的输入功率 | 判断大信号能力 |
| IP3 | 三阶互调外推交点 | 判断线性度，越高越好 |

![Mini-Circuits 混频器例子](<CCD Lecture 7 Mixers.attachments/mix_19_minicircuits_example_wide.jpg>)

回波损耗与反射电压比的关系为

$$
RL=-20\log_{10}\left|\frac{V_{\mathrm{ref}}}{V_{\mathrm{inc}}}\right|
$$

VSWR 与反射系数关系为

$$
VSWR=\frac{1+|\Gamma|}{1-|\Gamma|}
$$

其中

$$
|\Gamma|=\left|\frac{V_{\mathrm{ref}}}{V_{\mathrm{inc}}}\right|
$$

。

理想无反射时 $|\Gamma|=0$，所以 $VSWR=1$。实际设计中希望 VSWR 尽量接近 1。

![混频器指标曲线](<CCD Lecture 7 Mixers.attachments/mix_24_mixer_metric_plots.jpg>)

:::: tip
本振电平偏低会使开关不充分，偏高也可能让损耗、隔离度或杂散变差。因此 LO power 要按数据手册给定范围选。
::::

## 7-5 例题 Exercises

:::: stem L7-E1
已知 $s_1(t)=\sin(2\pi ft)$，其中 $f=10\,\mathrm{MHz}$。希望混频后得到 $1\,\mathrm{kHz}$ 的单音。求另一个输入单音可能的两个频率。

::::

:::: solution
混频差频满足

$$
|f_1-f_2|=1\,\mathrm{kHz}
$$

因此有两个可能：

$$
f_2=10\,\mathrm{MHz}+1\,\mathrm{kHz}
=10.001\,\mathrm{MHz}
$$

或

$$
f_2=10\,\mathrm{MHz}-1\,\mathrm{kHz}
=9.999\,\mathrm{MHz}
$$

两个频率都能与 $10\,\mathrm{MHz}$ 混出 $1\,\mathrm{kHz}$ 的差频。
::::

:::: stem L7-E2
某 AM 接收机接收 $f_{\mathrm{RF}}=1.5\,\mathrm{MHz}$，本地振荡器频率为 $f_{\mathrm{LO}}=2.0\,\mathrm{MHz}$。求混频器输出频率、中频与镜像频率。

::::

:::: solution
混频器输出包含和频与差频：

$$
f_{\mathrm{sum}}=1.5\,\mathrm{MHz}+2.0\,\mathrm{MHz}
=3.5\,\mathrm{MHz}
$$

$$
f_{\mathrm{diff}}=|1.5\,\mathrm{MHz}-2.0\,\mathrm{MHz}|
=0.5\,\mathrm{MHz}
$$

接收机下变频时通常取差频为 IF：

$$
f_{\mathrm{IF}}=500\,\mathrm{kHz}
$$

镜像频率位于本振频率另一侧，与本振频率的差同样为中频：

$$
f_{\mathrm{image}}=f_{\mathrm{LO}}+f_{\mathrm{IF}}
=2.0\,\mathrm{MHz}+0.5\,\mathrm{MHz}
=2.5\,\mathrm{MHz}
$$
::::

:::: stem L7-E3
混频器后的射频放大器使用 $Q=20$ 的 LC 槽路滤波器。若镜像频率比目标射频频率高 10%，估算镜像衰减。若 $Q=200$ 会怎样？

::::

:::: solution
设镜像频率为

$$
\omega=1.1\omega_0
$$

则

$$
\delta=\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega}
=1.1-\frac{1}{1.1}
=0.1909
$$

当 $Q=20$：

$$
A_r=\frac{1}{\sqrt{1+(\delta Q)^2}}
=\frac{1}{\sqrt{1+(0.1909\times20)^2}}
=0.253
$$

换成 dB：

$$
20\log_{10}(0.253)=-11.9\,\mathrm{dB}
$$

当 $Q=200$：

$$
A_r=\frac{1}{\sqrt{1+(0.1909\times200)^2}}
=0.0262
$$

$$
20\log_{10}(0.0262)=-31.6\,\mathrm{dB}
$$

$Q$ 越高，滤波器越窄，对镜像频率的抑制越强。
::::

## Summary

| 内容 | 结论 |
| --- | --- |
| 混频器本质 | 非线性乘法 |
| 输出频率 | $\omega_1+\omega_2$ 与 $|\omega_1-\omega_2|$ |
| 上变频 Up-Conversion | 保留和频，把基带搬到射频 |
| 下变频 Down-Conversion | 保留差频，把射频搬到中频或基带 |
| 二极管混频器 Diode Mixer | 简单，但有较多不想要的分量 |
| BJT 混频器 BJT Mixer | 可提供转换增益，但仍依赖小信号近似 |
| JFET 混频器 JFET Mixer | 平方关系较干净，高阶杂散少 |
| 镜像频率 Image Frequency | 与目标射频对称地落到相同中频 |
| 镜像抑制 Image Rejection | 用高 $Q$ 带通滤波器抑制 |
| 混频器指标 Mixer Metrics | 频率范围、转换损耗、隔离度、本振电平、VSWR |
