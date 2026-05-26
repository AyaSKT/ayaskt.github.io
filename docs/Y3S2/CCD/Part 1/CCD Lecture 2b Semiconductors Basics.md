# Lecture 2b Semiconductors and PN Junction 半导体与 PN 结

**今日は歩いてみようよ，上を向いて歩いた；**  
**今天我们一起出去走一走吧，抬起头来缓缓迈步；**  

**花が夜空に咲いてる，夏の匂いがしてた。**  
**烟花绽放在夜空之中，散发着阵阵夏日气息。**  

<div align="right">——ヨルシカ《逃亡 (Escape)》</div>

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/1779784870101.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [2b-1 原子结构 Atomic Structure](#2b-1-原子结构-atomic-structure)
- [2b-2 导体、绝缘体与半导体 Conductors, Insulators and Semiconductors](#2b-2-导体绝缘体与半导体-conductors-insulators-and-semiconductors)
- [2b-3 本征半导体 Intrinsic Semiconductor](#2b-3-本征半导体-intrinsic-semiconductor)
- [2b-4 掺杂半导体 Doped Semiconductor](#2b-4-掺杂半导体-doped-semiconductor)
- [2b-5 PN 结 PN Junction](#2b-5-pn-结-pn-junction)
- [2b-6 二极管 Diode](#2b-6-二极管-diode)
- [2b-7 二极管偏置 Diode Biasing](#2b-7-二极管偏置-diode-biasing)
  - [正向偏置 Forward Bias](#正向偏置-forward-bias)
  - [反向偏置 Reverse Bias](#反向偏置-reverse-bias)
  - [V-I 特性曲线](#v-i-特性曲线)
- [2b-8 二极管模型 Diode Models](#2b-8-二极管模型-diode-models)
- [Summary](#summary)

## 2b-1 原子结构 Atomic Structure

Bohr 模型中，电子只能位于特定能级的壳层上。第 $n$ 层最多容纳的电子数为

$$
N_e = 2n^2
$$

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/bohr-atom.jpg>)

最外层称为价壳层 Valence shell，其中的电子称为价电子 Valence electrons。价电子束缚较弱，获得足够能量后可以脱离原子并参与导电。

:::: definition 价电子 Valence Electron
价电子是处于最外层能级的电子。材料的化学键合和电学性质主要由价电子决定。
::::

## 2b-2 导体、绝缘体与半导体 Conductors, Insulators and Semiconductors

材料按导电能力可分为导体、绝缘体和半导体。

| 类型 | 价电子状态 | 导电能力 | 例子 |
| --- | --- | --- | --- |
| 导体 Conductor | 存在大量自由电子 | 强 | 铜、铝 |
| 绝缘体 Insulator | 电子束缚很强 | 弱 | 玻璃、橡胶、空气 |
| 半导体 Semiconductor | 导电性介于两者之间 | 可通过掺杂、温度、光照改变 | 硅、锗 |

硅 Silicon 有 4 个价电子，相邻硅原子通过共价键共享电子。

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/silicon.jpg>)

纯硅中大多数价电子被束缚在共价键中，因此室温下导电能力有限。

## 2b-3 本征半导体 Intrinsic Semiconductor

:::: definition 本征半导体 Intrinsic Semiconductor
本征半导体是未故意掺杂的纯半导体。其导电载流子来自热激发产生的电子-空穴对。
::::

当价电子获得足够能量后，会从价带跃迁到导带，留下一个空穴。

:::: definition 电子-空穴对 Electron-Hole Pair
一个电子进入导带时，价带中留下一个空位，称为空穴。导带电子与空穴成对产生，也可复合消失。
::::

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/electron-hole-current.jpg>)

半导体中有两种电流：

- 导带电子在电场作用下移动，形成电子电流；
- 价带电子填补相邻空穴，等效为空穴移动。

空穴按正电荷处理，方向与电子运动方向相反。

## 2b-4 掺杂半导体 Doped Semiconductor

掺杂可以显著改变半导体导电性。硅是四价元素，掺入五价或三价杂质会分别形成 n 型或 p 型材料。

| 类型 | 掺杂元素 | 多数载流子 | 少数载流子 | 说明 |
| --- | --- | --- | --- | --- |
| n-type | 五价杂质，如 Sb、P、As | 电子 | 空穴 | 多出一个弱束缚电子 |
| p-type | 三价杂质，如 B、Al、Ga | 空穴 | 电子 | 共价键中缺少一个电子 |

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/n-type.jpg>)

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/p-type.jpg>)

:::: tip
n 型材料整体仍为电中性。n 型只表示电子是多数载流子，不表示材料带负电。
::::

## 2b-5 PN 结 PN Junction

:::: definition PN 结 PN Junction
p 型半导体与 n 型半导体接触形成 PN 结。结附近会因载流子扩散与复合形成耗尽层，并建立内建电势。
::::

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/pn-junction.jpg>)

形成过程如下：

1. n 区电子向 p 区扩散，并与 p 区空穴复合；
2. p 区空穴也可等效向 n 区扩散；
3. 结附近留下固定离子，形成耗尽层 Depletion region；
4. 固定离子产生电场，阻止进一步扩散；
5. 扩散与漂移达到平衡。

内建电势也称势垒电势 Barrier potential。对硅 PN 结，室温下常近似为

$$
V_\gamma \approx 0.7\,\mathrm{V}
$$

对锗 PN 结常近似为

$$
V_\gamma \approx 0.3\,\mathrm{V}
$$

## 2b-6 二极管 Diode

:::: definition 二极管 Diode
二极管是具有单个 PN 结和两个引脚的半导体器件。理想情况下，它只允许电流沿一个方向通过。
::::

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/diode.jpg>)

二极管的两个端点：

| 端点 | 英文 | 对应区域 |
| --- | --- | --- |
| 阳极 | Anode | p 区 |
| 阴极 | Cathode | n 区 |

常规电流方向为从阳极到阴极。

## 2b-7 二极管偏置 Diode Biasing

### 正向偏置 Forward Bias

正向偏置时，电源正端接 p 区，负端接 n 区。外加电压降低势垒，耗尽层变窄。

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/forward-bias.jpg>)

若外加电压超过势垒电势，电流显著增加。实际电路中通常需要串联电阻限制电流。

### 反向偏置 Reverse Bias

反向偏置时，电源正端接 n 区，负端接 p 区。外加电压增大势垒，耗尽层变宽。

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/reverse-bias.jpg>)

理想情况下反向电流为零。实际二极管会有很小的反向漏电流；若反向电压超过击穿电压，电流会急剧增大。

### V-I 特性曲线

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/vi-curve.jpg>)

| 区域 | 条件 | 特点 |
| --- | --- | --- |
| 正向导通 | $V_D \gtrsim V_\gamma$ | 电流快速增大 |
| 反向截止 | $V_D < 0$ 且未击穿 | 只有很小漏电流 |
| 击穿 | $|V_D| \ge V_{\mathrm{BR}}$ | 反向电流急剧增大 |

## 2b-8 二极管模型 Diode Models

常用二极管模型有三种。

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/diode-models.jpg>)

| 模型 | 正向导通时 | 反向偏置时 | 用途 |
| --- | --- | --- | --- |
| 理想模型 Ideal | $V_D=0$ | 开路 | 快速判断导通方向 |
| 实用模型 Practical | $V_D\approx0.7\,\mathrm{V}$ for Si | 开路 | 手算硅二极管电流 |
| 完整模型 Complete | $V_D\approx0.7\,\mathrm{V}+I_Dr_d$ | 有大反向电阻 | 更接近实际器件 |

:::: tip
CCD 手算中若未特别说明，硅二极管通常按 practical model 取 $V_D=0.7\,\mathrm{V}$。
::::

:::: stem
使用实用二极管模型，求图中电路电流。已知 $V_{\mathrm{BIAS}}=12\,\mathrm{V}$，$R=3.3\,\mathrm{k}\Omega$，硅二极管正向导通。

![alt text](<CCD Lecture 2b Semiconductors Basics.attachments/diode-example.jpg>)
::::

:::: solution
实用模型中，硅二极管正向压降取

$$
V_D = 0.7\,\mathrm{V}
$$

因此电阻两端电压为

$$
V_R = V_{\mathrm{BIAS}} - V_D
= 12\,\mathrm{V} - 0.7\,\mathrm{V}
= 11.3\,\mathrm{V}
$$

代入 Ohm 定律：

$$
I = \frac{V_R}{R}
= \frac{11.3\,\mathrm{V}}{3.3\,\mathrm{k}\Omega}
= 3.42\,\mathrm{mA}
$$

故电路电流约为

$$
I \approx 3.4\,\mathrm{mA}
$$
::::

## Summary

| 内容 | 结论 | 备注 |
| --- | --- | --- |
| 壳层最大电子数 | $N_e=2n^2$ | Bohr 模型 |
| 硅原子 | 4 个价电子 | 形成共价键 |
| 本征半导体 | 载流子来自电子-空穴对 | 电子与空穴浓度相等 |
| n 型半导体 | 多数载流子为电子 | 五价杂质 |
| p 型半导体 | 多数载流子为空穴 | 三价杂质 |
| PN 结 | 扩散形成耗尽层和势垒电势 | 硅约 $0.7\,\mathrm{V}$ |
| 正向偏置 | 耗尽层变窄，允许电流 | p 接正，n 接负 |
| 反向偏置 | 耗尽层变宽，阻止电流 | p 接负，n 接正 |
| Practical model | $V_D\approx0.7\,\mathrm{V}$ for Si | 常用于手算 |
