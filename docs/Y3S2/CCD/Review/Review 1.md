---
lastUpdated: 2026-06-22T12:19:18+08:00
---

# Rev 1 考试分析与复习重点

<LyricCover
  image="Review 1.attachments/1781871673814.JPG"
  title="Dye the sky."
  artist="シャイニーカラーズ"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/songDetail/001uQOMI1gx65x"
  netease-url="https://music.163.com/#/song?id=2741168530"
>
  <LyricLine
    original="さぁ、誰(だれ)よりも鮮烈(せんれつ)に，"
    translation="来吧 描绘出超越一切的浓烈，"
  />
  <LyricLine
    original="キャンバスを裂(さ)くように，叩(たた)きつけろ。"
    translation="如撕裂画布般，甩下这一笔。"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [1-1 试卷结构 Paper Structure](#1-1-试卷结构-paper-structure)
  - [1-1-1 年份对比 Year-by-year Pattern](#1-1-1-年份对比-year-by-year-pattern)
- [1-2 高频模块 High-frequency Modules](#1-2-高频模块-high-frequency-modules)
  - [1-2-1 放大器与器件 Amplifiers and Devices](#1-2-1-放大器与器件-amplifiers-and-devices)
  - [1-2-2 LC、匹配与振荡 LC, Matching and Oscillators](#1-2-2-lc匹配与振荡-lc-matching-and-oscillators)
  - [1-2-3 混频与镜像频率 Mixers and Image Frequency](#1-2-3-混频与镜像频率-mixers-and-image-frequency)
  - [1-2-4 调制 Modulation](#1-2-4-调制-modulation)
  - [1-2-5 PLL、DAC/ADC 与接收机](#1-2-5-plldacadc-与接收机)
- [1-3 难点来源 Difficulty Sources](#1-3-难点来源-difficulty-sources)
  - [1-3-1 难点一：先识别模型](#1-3-1-难点一先识别模型)
  - [1-3-2 难点二：单位和 dB](#1-3-2-难点二单位和-db)
  - [1-3-3 难点三：解释题比例上升](#1-3-3-难点三解释题比例上升)
- [1-4 近年侧重方向 Recent Emphasis](#1-4-近年侧重方向-recent-emphasis)
  - [1-4-1 从代公式到设计说明](#1-4-1-从代公式到设计说明)
  - [1-4-2 图题权重较高](#1-4-2-图题权重较高)
- [1-5 复习优先级 Revision Priority](#1-5-复习优先级-revision-priority)
  - [1-5-1 第一优先级](#1-5-1-第一优先级)
  - [1-5-2 第二优先级](#1-5-2-第二优先级)
  - [1-5-3 第三优先级](#1-5-3-第三优先级)
- [Summary](#summary)

本页基于 2022、2023、2024、2025 四份 CCD past paper 归纳。2025 试卷文件名为 `202504`，卷面题头仍保留日期占位文字，因此此处按文件名年份处理。

## 1-1 试卷结构 Paper Structure

CCD 期末卷结构很稳定。每年都是四道大题，每题约 $25\,\mathrm{marks}$，总分 $100\,\mathrm{marks}$。

| 大题 | 常见内容 | 判断入口 |
| --- | --- | --- |
| Q1 | dB、BJT/JFET、放大器小信号模型 | 先区分直流偏置和交流等效 |
| Q2 | 混频、LC、匹配网络、振荡器、镜像频率 | 先判断是频率搬移、谐振还是阻抗匹配 |
| Q3 | AM、SSB、FM/PM、调制器与接收链路 | 先画频谱或系统框图 |
| Q4 | PLL、DAC/ADC、接收机、天线、噪声 | 先识别公式族和图中电路类型 |

卷面不是按难度递增，而是按课程模块推进。Q1 和 Q2 更像电路分析，Q3 和 Q4 更像通信系统分析。

---

### 1-1-1 年份对比 Year-by-year Pattern

| 年份 | Q1 | Q2 | Q3 | Q4 |
| --- | --- | --- | --- | --- |
| 2022 | dB 链路、共集放大器、JFET | 混频、RC/Clapp 振荡器、镜像抑制 | FM 带宽、AM 功率、SSB、PLL | 天线、接收机噪声、超外差接收机 |
| 2023 | 功率增益、NPN 放大器、串并联等效 | 匹配网络、镜像频率、LC 飞轮效应 | SSB、二极管环形调制、PM 倍频、AM 功率 | PLL、4046 VCO、超外差、ADC |
| 2024 | 分压与增益补偿、JFET、共集放大器 | 混频、Clapp、反馈谐振、镜像问题 | SSB 接收机、LO 稳定性、AM 功率 | 超外差、链路预算、R-2R DAC、PLL |
| 2025 | dB 链路、BJT 工作区、NPN 放大器 | Q 匹配、带宽与 Q、反馈谐振 | 非线性谐波、变容二极管 FM、调制指数 | 加权电阻 DAC、PLL 增益 |

可以看出，Q1 和 Q2 几乎是固定主线；Q3 和 Q4 在调制、PLL、转换器、接收机之间轮换。

## 1-2 高频模块 High-frequency Modules

### 1-2-1 放大器与器件 Amplifiers and Devices

放大器是必考模块。题目常把三个层次混在一起：

1. 直流偏置：$I_B$、$I_C$、$V_{CE}$、active / saturation 判断；
2. 交流等效：电容短路，直流源接地，画 $r_e'$ model；
3. 性能参数：$A_v$、$A_i$、$R_{in}$、power gain 和 dB。

常见题型如下。

| 题型 | 常见要求 | 易错点 |
| --- | --- | --- |
| dB 链路 | 增益与衰减相加，再反推输入电压 | 电压用 $20\log_{10}$，功率用 $10\log_{10}$ |
| BJT 工作区 | 由 $I_B$ 推 $I_C$，与饱和电流比较 | 不能只看 $\beta I_B$，还要看 $V_{CE(sat)}$ |
| 共射/共集放大器 | 画 AC equivalent，推 $A_v$ 和 $R_{in}$ | 旁路电容、负载、偏置电阻是否进入 AC 模型 |
| JFET 偏置 | 由 $V_G$、$V_S$、$V_D$ 求 $V_{GS}$ 和 $I_D$ | $V_{GS}$ 符号容易反 |

需要熟练到看到图就能决定哪些元件进入交流模型。2024、2025 的放大器题还会要求解释应用场景，例如共集是否适合驱动扬声器。

---

### 1-2-2 LC、匹配与振荡 LC, Matching and Oscillators

Q2 的分值长期集中在 LC 系统。它是最容易拉开差距的部分，因为题目经常要求先设计，再验证。

核心模型包括：

$$
f_0=\frac{1}{2\pi\sqrt{LC}}
$$

$$
Q=\frac{f_0}{BW}
$$

$$
f_L=f_0-\frac{BW}{2},
\qquad
f_H=f_0+\frac{BW}{2}
$$

匹配网络题通常不是直接代公式。判断顺序如下：

1. 把串联负载换算到等效并联形式；
2. 判断需要升阻抗还是降阻抗；
3. 选 L 型或 Q matching 结构；
4. 计算电感、电容；
5. 回代验证 source 和 load 看到的阻抗是否共轭匹配。

:::: tip
匹配题中若题干要求 "discuss a strategy"，答案不能只写数值。需要说明采用串并联等效、Q matching 或 L network 的理由。
::::

---

### 1-2-3 混频与镜像频率 Mixers and Image Frequency

混频题的核心是乘法产生和频与差频：

$$
\cos{(\omega_1t)}\cos{(\omega_2t)}
=\frac{1}{2}\cos{((\omega_1-\omega_2)t)}
+\frac{1}{2}\cos{((\omega_1+\omega_2)t)}
$$

因此：

$$
f_{\mathrm{out}}=f_1+f_2
\quad \mathrm{or} \quad
f_{\mathrm{out}}=\lvert f_1-f_2\rvert
$$

超外差接收机中：

$$
f_{\mathrm{IF}}=\lvert f_{\mathrm{LO}}-f_{\mathrm{RF}}\rvert
$$

镜像频率的判断本质是另一个频率也能与同一个 LO 混出相同 IF。题目常见问法包括：计算 image frequency、说明 image problem、提出抑制方法、画 RF/LO/IF/image 频谱图。

---

### 1-2-4 调制 Modulation

调制每年都会出现，但具体分配会变。AM、SSB、FM/PM 都要复习。

| 模块 | 高频题型 | 关键点 |
| --- | --- | --- |
| AM | sideband power、total transmit power、overmodulation | $m>1$ 会产生包络失真，功率分布也会变化 |
| SSB | filter $Q$、balanced modulator、diode ring modulator、SSB transmitter/receiver | 画框图和频率链路比背文字更稳 |
| FM/PM | Carson rule、frequency deviation、modulation index、frequency multipliers | 倍频会同时放大 carrier frequency 和 deviation |
| Varactor FM | 变容二极管调制器、LC 载波频率 | 电容随调制电压变化，频率随 $LC$ 变化 |

2025 的 Q3 明显偏机理题。非线性接收机输出：

$$
y(t)=a_0+a_1x(t)+a_2x^2(t)+a_3x^3(t)
$$

当 $x(t)=B\cos{(\omega t)}$ 时，平方项和三次项会产生 $2\omega$、$3\omega$ 等高次谐波。这里考的是三角恒等式和非线性机理，不是单纯记结论。

---

### 1-2-5 PLL、DAC/ADC 与接收机

PLL 在 2022、2023、2024、2025 都出现过，近两年更偏参数影响分析。

| 内容 | 常见要求 |
| --- | --- |
| PLL 阶段 | free-running、capture、lock / tracking |
| PLL 增益 | 由 $K_D$、$K_O$ 求 loop gain 或 $K_V$ |
| 控制电压 | 由频率变化反推 $\Delta V_O$ |
| 性能解释 | 增益变化对锁定范围、响应速度、稳定性的影响 |

DAC/ADC 是 Q4 的高频轮换点。2024 考 R-2R DAC，2025 考加权电阻 DAC，并要求比较两者。

| 类型 | 重点 |
| --- | --- |
| 加权电阻 DAC Weighted-resistor DAC | 按二进制权重求反相求和输出 |
| R-2R DAC | 用相同阻值比例实现二进制权重，工程上更容易制造 |
| ADC resolution | 由参考电压范围和 bit 数求 LSB |

Lecture 17 把 Q4 的 receiver 部分补完整。接收机题通常从 superheterodyne block diagram 进入，再落到 image frequency、receiver linearity、noise figure 和 sensitivity。

| 模块 | 常见要求 |
| --- | --- |
| Superheterodyne receiver | 说明 RF、LO、mixer、IF、detector、AGC 的作用 |
| Image frequency | 由 $f_{\mathrm{IF}}=\lvert f_{\mathrm{RF}}-f_{\mathrm{LO}}\rvert$ 求 image，解释为什么 IF filter 不能再消掉 image |
| Linearity | 由 $y(t)=a_0+a_1x+a_2x^2+a_3x^3$ 解释 harmonics、IM3、1 dB compression 和 IIP3 |
| Noise / sensitivity | 用 $P_n=-174+10\log_{10}B+NF$ 和 Friis 公式判断 LNA 为什么要放在最前面 |

## 1-3 难点来源 Difficulty Sources

### 1-3-1 难点一：先识别模型

CCD 的题目经常把图、文字和公式混在一起。多数题不是公式难，而是要先判断该用哪个模型。

| 题目线索 | 对应模型 |
| --- | --- |
| gain / attenuation / output voltage | dB 链路 |
| AC equivalent / current gain / input resistance | 小信号放大器 |
| source and load mismatch | 匹配网络 |
| IF / LO / image | 超外差接收机 |
| IM3 / IIP3 / 1 dB compression | 接收机非线性 |
| noise figure / Friis / sensitivity | 接收机噪声链路 |
| sideband separation / suppression | SSB filter $Q$ |
| varactor diode | 变容二极管振荡或 FM |
| $K_D$、$K_O$、VCO | PLL |
| binary input / $V_{\mathrm{ref}}$ | DAC / ADC |

---

### 1-3-2 难点二：单位和 dB

单位换算是高频失分点。尤其是：

- $\mathrm{MHz}$、$\mathrm{kHz}$、$\mathrm{Hz}$ 混用；
- $\mathrm{rad/s}$ 和 $\mathrm{Hz}$ 混用；
- $\mathrm{dB}$、$\mathrm{dBm}$、$\mathrm{dBi}$ 和线性增益混用；
- 电压增益与功率增益的 dB 系数不同；
- DAC 输出可能带反相符号。

计算前先统一单位。若题目使用 $\omega$，最终换成 $f$ 时需要除以 $2\pi$。

---

### 1-3-3 难点三：解释题比例上升

2024 和 2025 的解释题明显增多。常见问法包括：

- justify your answer；
- explain the process；
- discuss a strategy；
- recommend an appropriate measure；
- discuss the impact；
- compare and contrast。

这类题需要写出因果链。例如 PLL 增益变大时，锁定能力可能增强、响应变快，但过高增益也会带来稳定性和噪声问题。只写公式通常不够。

## 1-4 近年侧重方向 Recent Emphasis

### 1-4-1 从代公式到设计说明

2022 的卷面更偏直接计算：带宽、功率、增益、频率。2023 开始出现更多电路设计和系统框图。2024、2025 则明显加强解释、比较和工程判断。

变化可以概括为：

| 方向 | 早期问法 | 近年问法 |
| --- | --- | --- |
| 匹配网络 | 计算匹配元件 | 说明设计策略，再计算并画图 |
| PLL | 求 capture / lock range | 分析 loop gain 对锁定能力的影响 |
| DAC | 求输出电压 | 判断 DAC 类型，并比较结构优缺点 |
| 接收机 | 求 image frequency | 解释 image problem 并提出抑制措施 |
| 调制 | 计算功率或带宽 | 解释过调制、LO 不稳定、非线性谐波 |

---

### 1-4-2 图题权重较高

每年都有图题。常见图包括：

- BJT/JFET 偏置图；
- common emitter / common collector amplifier；
- LC matching network；
- Clapp oscillator / varactor oscillator；
- SSB transmitter / receiver；
- superheterodyne receiver；
- R-2R DAC / weighted-resistor DAC；
- PLL block diagram。

复习时需要能从图中直接识别电路类型。尤其是 DAC，2024 图是 R-2R ladder，2025 图是 weighted-resistor summing DAC，两者计算入口不同。

## 1-5 复习优先级 Revision Priority

### 1-5-1 第一优先级

第一优先级是 Q1 和 Q2，对应固定主线。

| 模块 | 必须掌握 |
| --- | --- |
| dB 链路 | 增益/衰减相加，电压和功率 dB 区分 |
| BJT/JFET | 工作区判断、偏置、电流关系、$V_{GS}$ |
| 放大器 | AC equivalent、$r_e'$ model、$A_v$、$R_{in}$ |
| LC 谐振 | $f_0$、$Q$、$BW$、上下 cutoff |
| 匹配网络 | 串并联等效、Q matching、画 matched circuit |
| 振荡器 | Clapp、RC phase shift、feedback network resonance |

---

### 1-5-2 第二优先级

第二优先级是调制系统。它的公式不算多，但框图和频率链路必须清楚。

| 模块 | 必须掌握 |
| --- | --- |
| AM | carrier power、sideband power、total power、overmodulation |
| SSB | filter $Q$、balanced modulator、ring modulator、SSB receiver |
| FM/PM | Carson rule、frequency deviation、modulation index、multipliers |
| Mixer | sum / difference frequency、image frequency |

---

### 1-5-3 第三优先级

第三优先级是 Q4 的轮换模块。近年 PLL 和 DAC 的权重较高，不应放到最后才看。

| 模块 | 必须掌握 |
| --- | --- |
| PLL | operating stages、$K_D$、$K_O$、$K_V$、control voltage |
| DAC | weighted-resistor、R-2R、output voltage、resolution |
| ADC | resolution、precision improvement |
| Receiver | heterodyne block diagram、image frequency、linearity、noise figure、LNA 作用 |
| Antenna | beamwidth、efficiency、Friis link budget |

## Summary

| 结论 | 复习含义 |
| --- | --- |
| Q1 和 Q2 每年稳定出现 | 放大器、器件、LC、匹配网络是基本盘 |
| Q3 每年考调制 | AM、SSB、FM/PM 不能只背公式，要会画频谱和框图 |
| Q4 近年偏 PLL、DAC 与接收机指标 | PLL 参数影响、DAC 图型识别、receiver noise/linearity 要重点练 |
| 2024、2025 解释题增多 | 答案需要写出模型选择、设计理由和工程影响 |
| 图题贯穿全卷 | 复习时必须练电路图识别，不只看文字公式 |

最后按这个顺序刷题：

1. 先刷 Q1：dB、BJT/JFET、放大器；
2. 再刷 Q2：LC、matching、oscillator、image；
3. 再刷 Q3：AM、SSB、FM/PM；
4. 最后刷 Q4：PLL、receiver、DAC/ADC、antenna。
