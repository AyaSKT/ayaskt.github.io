---
lastUpdated: 2026-06-12T15:16:20+08:00
---
# Lecture 18 Digital to Analog Conversion 数模转换

<LyricCover
  image="CCD Lecture 18 Digital to Analog Conversion.attachments/1781248048842.jpg"
  title="夢が僕らの太陽さ"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  netease-url="https://music.163.com/#/song?id=1942066993"
>
  <LyricLine
    original="だからどんな時(とき)も夢(ゆめ)が僕(ぼく)らの太陽(たいよう)さ，"
    translation="所以啊 不论何时 梦想都是我们的太阳啊，"
  />
  <LyricLine
    original="泣(な)いちゃった後(あと)は笑顔(えがお)で，明日(あした)を語(かた)ればいいよ。"
    translation="拭去泪水后笑着聊起明天，心情就好起来了。"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [18-1 DAC 的角色 Role of DAC](#18-1-dac-的角色-role-of-dac)
  - [18-1-1 数字系统与模拟世界 Digital Systems and Analog World](#18-1-1-数字系统与模拟世界-digital-systems-and-analog-world)
  - [18-1-2 DAC 定义 DAC Definition](#18-1-2-dac-定义-dac-definition)
- [18-2 DAC 输出与分辨率 DAC Output and Resolution](#18-2-dac-输出与分辨率-dac-output-and-resolution)
  - [18-2-1 4-bit DAC Example](#18-2-1-4-bit-dac-example)
  - [18-2-2 参考电压 Reference Voltage](#18-2-2-参考电压-reference-voltage)
  - [18-2-3 阶梯波形 Staircase Waveform](#18-2-3-阶梯波形-staircase-waveform)
  - [18-2-4 建立时间 Settling Time](#18-2-4-建立时间-settling-time)
- [18-3 运算放大器在 DAC 中的作用 Op-Amps in DACs](#18-3-运算放大器在-dac-中的作用-op-amps-in-dacs)
  - [18-3-1 电流求和与电压输出 Current Summing and Voltage Output](#18-3-1-电流求和与电压输出-current-summing-and-voltage-output)
  - [18-3-2 反相与同相结构 Inverting and Non-Inverting Structures](#18-3-2-反相与同相结构-inverting-and-non-inverting-structures)
- [18-4 加权电阻 DAC Weighted Resistor DAC](#18-4-加权电阻-dac-weighted-resistor-dac)
  - [18-4-1 工作原理 Operating Principle](#18-4-1-工作原理-operating-principle)
  - [18-4-2 制造限制 Manufacturing Limits](#18-4-2-制造限制-manufacturing-limits)
- [18-5 R-2R 电阻梯 DAC R-2R Ladder DAC](#18-5-r-2r-电阻梯-dac-r-2r-ladder-dac)
  - [18-5-1 梯形网络 Ladder Network](#18-5-1-梯形网络-ladder-network)
  - [18-5-2 与加权电阻的比较 Comparison with Weighted Resistor DAC](#18-5-2-与加权电阻的比较-comparison-with-weighted-resistor-dac)
- [Summary](#summary)

## 18-1 DAC 的角色 Role of DAC

### 18-1-1 数字系统与模拟世界 Digital Systems and Analog World

![数字系统与环境接口](<CCD Lecture 18 Digital to Analog Conversion.attachments/dac_system_interface.jpg>)

数字电路处理的是 binary data，也就是 0 和 1。现实里的声音、光照、温度、速度、位置通常是连续量。

一个典型闭环系统可以写成：

$$
\text{Sensor}
\rightarrow
\text{ADC}
\rightarrow
\text{Digital system}
\rightarrow
\text{DAC}
\rightarrow
\text{Actuator}
$$

ADC 让数字系统读懂模拟世界，DAC 让数字系统控制模拟世界。音频播放器、马达控制、灯光调光和工业执行器都离不开这个接口。

---

### 18-1-2 DAC 定义 DAC Definition

:::: definition 数模转换器 Digital-to-Analog Converter
**DAC** 是把数字二进制码转换为对应模拟输出的电子电路。输出通常是电压或电流。

输入是有限个 digital code；输出是与该 code 成比例的 analog level。
::::

DAC 的基本输入输出关系可写成：

$$
D=b_{n-1}b_{n-2}\cdots b_1b_0
$$

$$
V_{\mathrm{out}}\propto D
$$

其中 $b_{n-1}$ 是 MSB，$b_0$ 是 LSB。

常见 DAC 架构：

| 架构 Architecture | 主要特点 |
| --- | --- |
| Binary weighted DAC | 每一位使用不同权重电阻 |
| R-2R ladder DAC | 只使用 $R$ 与 $2R$ 两种电阻 |
| Current steering DAC | 高速应用常见 |

## 18-2 DAC 输出与分辨率 DAC Output and Resolution

### 18-2-1 4-bit DAC Example

![4-bit DAC 方框图](<CCD Lecture 18 Digital to Analog Conversion.attachments/dac_4bit_block.jpg>)

4-bit DAC 有四个输入位：

$$
D=D_3D_2D_1D_0
$$

可表示的数字值为 $0$ 到 $15$，一共有

$$
2^4=16
$$

个 code。

对 unsigned DAC，常把数字值写成

$$
D=8D_3+4D_2+2D_1+D_0
$$

其中 $D_i\in\{0,1\}$。$D_3$ 权重最大，$D_0$ 权重最小。

若输出范围近似为 $0$ 到 $V_{\mathrm{ref}}$，理想输出可写成

$$
V_{\mathrm{out}}
=
\frac{D}{2^n-1}V_{\mathrm{ref}}
$$

不少课程材料也用 LSB step 表示：

$$
V_{\mathrm{out}}\approx D\cdot V_{\mathrm{LSB}}
$$

---

### 18-2-2 参考电压 Reference Voltage

参考电压 $V_{\mathrm{ref}}$ 决定 DAC 的输出范围。$V_{\mathrm{ref}}$ 越高，满量程输出越高；$V_{\mathrm{ref}}$ 越低，每一级电压更小。

分辨率或 LSB 电压常写作：

$$
V_{\mathrm{LSB}}
=
\frac{V_{\mathrm{ref}}}{2^n}
$$

也有资料把从 $0$ 到 full-scale 的 $2^n-1$ 个间隔作为步距：

$$
\Delta V
=
\frac{V_{\mathrm{ref}}}{2^n-1}
$$

考试时看题目给的是哪一种定义。若题目明确说 4-bit 从 $0$ 到 $5\,\mathrm{V}$ 分成 15 个间隔，则用 $5/15$。

例：3-bit DAC，$V_{\mathrm{ref}}=5\,\mathrm{V}$。

$$
V_{\mathrm{LSB}}
=
\frac{5}{2^3}
=
0.625\,\mathrm{V}
$$

---

### 18-2-3 阶梯波形 Staircase Waveform

![DAC 阶梯输出](<CCD Lecture 18 Digital to Analog Conversion.attachments/dac_staircase_wide.jpg>)

DAC 输出不会在每个 digital code 之间连续变化，只能落在有限个电平上。因此输出-输入曲线呈阶梯状。

对 4-bit DAC，若 $V_{\mathrm{ref}}=5\,\mathrm{V}$ 并用 $2^n-1$ 间隔定义：

| Digital Input | Decimal $D$ | Ideal $V_{\mathrm{out}}$ |
| --- | ---: | ---: |
| 0000 | 0 | $0$ |
| 0001 | 1 | $\frac{1}{15}5\,\mathrm{V}$ |
| 0100 | 4 | $\frac{4}{15}5\,\mathrm{V}$ |
| 1000 | 8 | $\frac{8}{15}5\,\mathrm{V}$ |
| 1111 | 15 | $5\,\mathrm{V}$ |

分辨率越高，台阶越多，台阶高度越小，输出越接近连续波形。

:::: tip
Higher resolution 不会让 DAC 输出真正连续，只是让相邻电平更近。
::::

---

### 18-2-4 建立时间 Settling Time

**建立时间 Settling Time** 是输入 code 改变后，输出稳定到最终值误差范围内所需的时间。

常用误差范围是

$$
\pm \frac{1}{2}V_{\mathrm{LSB}}
$$

建立时间影响 DAC 能否用于高速控制或音频输出。若输入更新太快，而输出还没稳定，就会产生额外误差。

## 18-3 运算放大器在 DAC 中的作用 Op-Amps in DACs

### 18-3-1 电流求和与电压输出 Current Summing and Voltage Output

很多 DAC 的内部电阻网络先产生电流。运算放大器把这些电流相加，并转换成输出电压。

反相求和结构中，虚地节点使每一支路电流更容易计算：

$$
I_k=\frac{b_kV_{\mathrm{ref}}}{R_k}
$$

总电流为

$$
I_{\mathrm{sum}}=\sum_k I_k
$$

输出电压为

$$
V_{\mathrm{out}}=-R_fI_{\mathrm{sum}}
$$

负号来自反相输入端。实际设计中也可以再加一级反相器，把输出极性翻回来。

---

### 18-3-2 反相与同相结构 Inverting and Non-Inverting Structures

| 结构 Structure | 作用 |
| --- | --- |
| Inverting amplifier | 电流求和方便，输出带负号 |
| Non-inverting amplifier | 保持相位，常用于缓冲或增益调整 |
| Transimpedance amplifier | 把电流转换成电压 |

反馈电阻 $R_f$ 可调节输出比例。对 DAC 来说，运放还要提供低输出阻抗，减少后级负载对转换结果的影响。

## 18-4 加权电阻 DAC Weighted Resistor DAC

### 18-4-1 工作原理 Operating Principle

![加权电阻 DAC](<CCD Lecture 18 Digital to Analog Conversion.attachments/dac_weighted_resistor_wide.jpg>)

**加权电阻 DAC Weighted Resistor DAC** 对不同 bit 使用不同阻值。阻值按二进制权重排列，使 MSB 贡献最大电流，LSB 贡献最小电流。

4-bit 例子可取：

| Bit | 权重 Weight | 典型电阻 |
| --- | ---: | ---: |
| $D_3$ MSB | 8 | $R$ |
| $D_2$ | 4 | $2R$ |
| $D_1$ | 2 | $4R$ |
| $D_0$ LSB | 1 | $8R$ |

若某一位为 1，对应开关闭合，该支路向求和节点贡献电流。反相求和输出为

$$
V_{\mathrm{out}}
=
-R_f
\left(
\frac{D_3V_{\mathrm{ref}}}{R}
+
\frac{D_2V_{\mathrm{ref}}}{2R}
+
\frac{D_1V_{\mathrm{ref}}}{4R}
+
\frac{D_0V_{\mathrm{ref}}}{8R}
\right)
$$

若取 $R_f=R$：

$$
V_{\mathrm{out}}
=
-V_{\mathrm{ref}}
\left(
D_3+\frac{D_2}{2}+\frac{D_1}{4}+\frac{D_0}{8}
\right)
$$

具体比例会随电路定义调整，但二进制权重关系不变。

---

### 18-4-2 制造限制 Manufacturing Limits

加权电阻 DAC 的问题在高位数时很明显：电阻跨度太大。

对 $n$ bit DAC，电阻可能需要从 $R$ 到 $2^{n-1}R$。例如 16-bit 时，LSB 和 MSB 对应电阻相差 $2^{15}$ 倍。

主要限制：

| 限制 Limit | 影响 |
| --- | --- |
| 电阻精度 Precision | 任意阻值偏差都会变成输出误差 |
| 阻值跨度 Range | 高分辨率时很难集成 |
| 匹配 Matching | bit 权重不准会破坏线性度 |
| 成本 Cost | 精密大范围电阻阵列成本高 |

因此加权电阻 DAC 适合低位数或教学分析，实际高分辨率 DAC 更常用 R-2R 或电流舵结构。

## 18-5 R-2R 电阻梯 DAC R-2R Ladder DAC

### 18-5-1 梯形网络 Ladder Network

![R-2R 电阻梯](<CCD Lecture 18 Digital to Analog Conversion.attachments/dac_r2r_ladder.jpg>)

R-2R DAC 只使用两种电阻：$R$ 和 $2R$。梯形网络不断把电流按 1:1 分流，因此每一位天然得到二进制权重。

对 $N$ bit DAC，第 $k$ 位的贡献可看成

$$
V_k\propto \frac{D_kV_{\mathrm{ref}}}{2^{N-k}}
$$

其中 $k$ 的编号取决于从 MSB 还是 LSB 开始。记忆时抓住一件事：越靠近 MSB，贡献越大。

理想输出可统一写成

$$
V_{\mathrm{out}}
=
V_{\mathrm{ref}}
\left(
\frac{b_{n-1}}{2}
+
\frac{b_{n-2}}{4}
+
\cdots
+
\frac{b_0}{2^n}
\right)
$$

若使用反相运放，输出前面加负号。

---

### 18-5-2 与加权电阻的比较 Comparison with Weighted Resistor DAC

| 项目 Item | Weighted Resistor | R-2R Ladder |
| --- | --- | --- |
| 电阻种类 | 多种，$R,2R,4R,\cdots$ | 只有 $R,2R$ |
| 高位数扩展 | 困难 | 较容易 |
| 匹配要求 | 不同阻值都要精确 | 主要要求 $R$ 与 $2R$ 比例准 |
| 制造成本 | 高分辨率时较高 | 更适合集成 |
| 典型用途 | 教学、低位数 | 通用 DAC 架构之一 |

R-2R 的优势来自 repeatable layout。芯片制造时，重复单元更容易匹配，也更容易校准。

:::: definition 量化噪声 Quantization Noise
DAC 输出只能取有限电平，因此理想连续值与实际阶梯输出之间存在误差。这个误差常称为量化噪声或量化误差。
::::

## Summary

DAC 把 digital code 转换为 analog voltage/current。核心参数是位数 $n$、参考电压 $V_{\mathrm{ref}}$、LSB 大小和建立时间。

理想单极性 DAC 常用关系：

$$
V_{\mathrm{LSB}}=\frac{V_{\mathrm{ref}}}{2^n}
$$

$$
V_{\mathrm{out}}\approx D\cdot V_{\mathrm{LSB}}
$$

加权电阻 DAC 概念清楚，但高分辨率制造困难。R-2R ladder 只需要 $R$ 与 $2R$，更适合集成和扩展。
