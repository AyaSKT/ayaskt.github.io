# Rev 4 概念总整理 Concept Index



本页只整理 CCD 笔记里出现的概念。公式推导看 Rev 3，电路图和框图看 Rev 2；这里负责回答一个问题：看到术语时，它属于哪一类，入口判断是什么。

> [!NOTE]
> Lecture 10 是中期复习页，概念已并入 Lecture 1-9 对应条目。

## 章节目录

- [章节目录](#章节目录)
- [4-1 通信系统与信号基础 Communication Basics](#4-1-通信系统与信号基础-communication-basics)
  - [4-1-1 通信链路与系统量](#4-1-1-通信链路与系统量)
  - [4-1-2 信号、频谱与传输方式](#4-1-2-信号频谱与传输方式)
- [4-2 半导体与二极管 Semiconductors and Diodes](#4-2-半导体与二极管-semiconductors-and-diodes)
  - [4-2-1 材料、掺杂与载流子](#4-2-1-材料掺杂与载流子)
  - [4-2-2 PN 结、偏置与二极管模型](#4-2-2-pn-结偏置与二极管模型)
- [4-3 晶体管与放大器 Transistors and Amplifiers](#4-3-晶体管与放大器-transistors-and-amplifiers)
  - [4-3-1 BJT 概念](#4-3-1-bjt-概念)
  - [4-3-2 JFET 与 MOSFET](#4-3-2-jfet-与-mosfet)
  - [4-3-3 放大器分析](#4-3-3-放大器分析)
- [4-4 混频、LC、匹配与振荡 RF Building Blocks](#4-4-混频lc匹配与振荡-rf-building-blocks)
  - [4-4-1 混频器 Mixers](#4-4-1-混频器-mixers)
  - [4-4-2 LC、Q 与阻抗匹配](#4-4-2-lcq-与阻抗匹配)
  - [4-4-3 振荡器 Oscillators](#4-4-3-振荡器-oscillators)
- [4-5 调制与解调 Modulation and Demodulation](#4-5-调制与解调-modulation-and-demodulation)
  - [4-5-1 AM](#4-5-1-am)
  - [4-5-2 SSB](#4-5-2-ssb)
  - [4-5-3 FM 与 PM](#4-5-3-fm-与-pm)
- [4-6 天线与链路 Antennas and Links](#4-6-天线与链路-antennas-and-links)
  - [4-6-1 天线空间概念](#4-6-1-天线空间概念)
  - [4-6-2 天线参数与链路](#4-6-2-天线参数与链路)
- [4-7 PLL 与频率控制 PLL and Frequency Control](#4-7-pll-与频率控制-pll-and-frequency-control)
  - [4-7-1 FM 解调与 PLL 模块](#4-7-1-fm-解调与-pll-模块)
  - [4-7-2 PLL 状态、参数与模型](#4-7-2-pll-状态参数与模型)
- [4-8 RF 接收机 RF Receivers](#4-8-rf-接收机-rf-receivers)
  - [4-8-1 接收机架构](#4-8-1-接收机架构)
  - [4-8-2 接收机质量指标](#4-8-2-接收机质量指标)
  - [4-8-3 非线性与噪声](#4-8-3-非线性与噪声)
- [4-9 DAC、ADC 与转换误差 Converters and Errors](#4-9-dacadc-与转换误差-converters-and-errors)
  - [4-9-1 DAC](#4-9-1-dac)
  - [4-9-2 ADC](#4-9-2-adc)
  - [4-9-3 转换器误差](#4-9-3-转换器误差)
- [4-10 概念串联 Concept Map](#4-10-概念串联-concept-map)

## 4-1 通信系统与信号基础 Communication Basics

### 4-1-1 通信链路与系统量

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **电子通信系统 Electronic Communication System** | 消息从 source 经过 transmitter、channel、receiver 到 destination。先看系统边界，再看信号在哪一级被处理。 | Lec 1 |
| **发射机 Transmitter** | 把消息信号转换、调制、放大，并送入信道。关键词是 modulation、amplification、coupling。 | Lec 1 |
| **信道 Channel** | 信号传播的物理路径，可以是导线、光纤或自由空间。噪声和衰减主要在这里进入系统。 | Lec 1 |
| **接收机 Receiver** | 从信道中选出目标信号，放大、解调，并恢复消息。后面 RF receiver 是这个概念的高频版本。 | Lec 1 |
| **噪声 Noise** | 不携带目标信息的随机扰动。热噪声、外部干扰和电路内部噪声都算。 | Lec 1 |
| **热噪声 Thermal Noise** | 由载流子热运动产生，功率与温度和带宽相关。接收机灵敏度、noise floor 都从这里延伸。 | Lec 1, Lec 17 |
| **增益 Gain** | 输出量相对输入量的放大倍数。线性域相乘，dB 域相加。 | Lec 1 |
| **衰减 Attenuation** | 信号幅度或功率降低。通常当作负增益处理。 | Lec 1 |
| **分贝 Decibel, dB** | 对数尺度。功率比用 $10\log$，电压或电流比用 $20\log$。 | Lec 1 |
| **dBm / dBW** | 绝对功率单位。dBm 参考 $1\,\mathrm{mW}$，dBW 参考 $1\,\mathrm{W}$。 | Lec 1 |
| **信噪比 Signal-to-Noise Ratio, SNR** | 有用信号功率与噪声功率的比值。接收机灵敏度题经常把它作为最低输出质量要求。 | Lec 1, Lec 17 |
| **RMS 值 Root Mean Square** | 交流功率计算使用有效值。电阻负载上常用 $P=V_{\mathrm{rms}}^2/R$。 | Lec 1 |

---

### 4-1-2 信号、频谱与传输方式

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **单工 Simplex** | 只允许单方向传输。广播、电视属于典型例子。 | Lec 2 |
| **全双工 Full Duplex** | 双方可以同时发送和接收。电话通话是典型例子。 | Lec 2 |
| **半双工 Half Duplex** | 双方都能通信，但同一时刻只有一方发送。对讲机是典型例子。 | Lec 2 |
| **模拟信号 Analog Signal** | 幅度随时间连续变化。容易受噪声影响，但能直接表示自然物理量。 | Lec 2 |
| **数字信号 Digital Signal** | 幅度取离散状态。更适合编码、存储和抗噪处理。 | Lec 2 |
| **采样 Sampling** | 按固定间隔从连续信号取值。ADC 章节会把它展开为采样、保持、量化、编码。 | Lec 2, Lec 19 |
| **采样频率 Sampling Frequency** | 每秒采样次数。采样频率不够会导致 aliasing。 | Lec 2, Lec 19 |
| **Nyquist Rate** | 对最高频率为 $f_{\max}$ 的带限信号，最低采样频率为 $2f_{\max}$。 | Lec 2, Lec 19 |
| **Nyquist Frequency** | 对采样频率 $f_s$，可无混叠表示的最高频率为 $f_s/2$。 | Lec 2, Lec 19 |
| **基带 Baseband** | 未搬移到高频载波上的原始信息频带。音频、数字基带码流都属于这个层次。 | Lec 2 |
| **宽带 Broadband / Passband** | 信号被搬移到某个载波附近传输。调制、混频和 RF 接收机都在处理这个问题。 | Lec 2 |
| **调制 Modulation** | 用消息信号改变载波的幅度、频率或相位。AM、FM、PM、SSB 都从这里开始。 | Lec 2, Lec 11 |
| **解调 Demodulation** | 从已调载波恢复消息信号。接收机 detector stage 的核心动作。 | Lec 2 |
| **复用 Multiplexing** | 多路信号共享同一信道。可从 frequency、time、code 等维度区分。 | Lec 2 |
| **频谱 Spectrum** | 信号在频率轴上的分量分布。调制题先画频谱，通常能少错一半。 | Lec 2 |
| **带宽 Bandwidth** | 信号或系统占用的频率范围。LC、AM、FM、天线、接收机都会反复使用。 | Lec 2 |

## 4-2 半导体与二极管 Semiconductors and Diodes

### 4-2-1 材料、掺杂与载流子

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **原子结构 Atomic Structure** | 电子分布决定材料导电性。半导体章节只需要抓住价电子和能否形成自由载流子。 | Lec 2b |
| **价电子 Valence Electron** | 最外层参与成键和导电的电子。硅的四价结构是半导体分析入口。 | Lec 2b |
| **导体 Conductor** | 有大量自由电子，容易导电。 | Lec 2b |
| **绝缘体 Insulator** | 几乎没有自由载流子，导电能力很差。 | Lec 2b |
| **半导体 Semiconductor** | 导电能力介于导体和绝缘体之间，可通过掺杂和偏置控制。 | Lec 2b |
| **本征半导体 Intrinsic Semiconductor** | 纯净半导体。电子和空穴数量大致相同。 | Lec 2b |
| **空穴 Hole** | 价电子缺位形成的等效正载流子。P 型材料以空穴为多数载流子。 | Lec 2b |
| **掺杂 Doping** | 向半导体加入杂质原子，改变多数载流子类型和浓度。 | Lec 2b |
| **施主 Donor** | 提供额外电子的掺杂原子，形成 N 型半导体。 | Lec 2b |
| **受主 Acceptor** | 接收电子并产生空穴的掺杂原子，形成 P 型半导体。 | Lec 2b |
| **N 型半导体 N-Type Semiconductor** | 多数载流子是电子，少数载流子是空穴。 | Lec 2b |
| **P 型半导体 P-Type Semiconductor** | 多数载流子是空穴，少数载流子是电子。 | Lec 2b |
| **多数载流子 Majority Carrier** | 在某类掺杂半导体中数量占主导的载流子。器件电流方向判断会用到。 | Lec 2b |
| **少数载流子 Minority Carrier** | 数量较少但对反向电流、光电效应等现象仍有影响的载流子。 | Lec 2b |

---

### 4-2-2 PN 结、偏置与二极管模型

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **PN 结 PN Junction** | P 型和 N 型材料接触后形成的结。二极管、BJT 结偏置都从这里来。 | Lec 2b |
| **耗尽层 Depletion Region** | 结附近自由载流子被复合消耗后留下的空间电荷区。宽度随外加偏置改变。 | Lec 2b |
| **势垒电压 Barrier Potential** | PN 结内建电场对应的电压障碍。硅二极管常按约 $0.7\,\mathrm{V}$ 记。 | Lec 2b |
| **二极管 Diode** | 由一个 PN 结构成，主要特性是单向导通。 | Lec 2b |
| **正向偏置 Forward Bias** | P 端接高电位，耗尽层变窄，超过门槛后电流显著增大。 | Lec 2b |
| **反向偏置 Reverse Bias** | P 端接低电位，耗尽层变宽，只有很小反向电流。 | Lec 2b |
| **V-I 特性曲线 V-I Characteristic** | 横轴电压、纵轴电流。正向导通、反向截止、击穿都在这张图上判断。 | Lec 2b |
| **击穿 Breakdown** | 反向电压过大导致反向电流急剧增大。普通二极管要避免，稳压二极管可利用。 | Lec 2b |
| **理想二极管模型 Ideal Diode Model** | 正向导通当短路，反向截止当开路。适合快速判断。 | Lec 2b |
| **实用二极管模型 Practical Diode Model** | 正向导通加入固定压降，硅二极管常取 $0.7\,\mathrm{V}$。 | Lec 2b |
| **完整二极管模型 Complete Diode Model** | 在固定压降外再考虑体电阻。适合更精确的电路计算。 | Lec 2b |

## 4-3 晶体管与放大器 Transistors and Amplifiers

### 4-3-1 BJT 概念

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **BJT Bipolar Junction Transistor** | 由两个 PN 结构成，电流由电子和空穴共同参与。主要有 NPN 和 PNP。 | Lec 3-4 |
| **NPN / PNP** | NPN 常规电流从 collector 到 emitter，PNP 极性相反。题图先判箭头和电源方向。 | Lec 3-4 |
| **Emitter / Base / Collector** | 发射极注入载流子，基极控制，集电极收集载流子。 | Lec 3-4 |
| **Base-Emitter Junction** | 放大区中正向偏置。判断 BJT 是否导通时先看它。 | Lec 3-4 |
| **Base-Collector Junction** | 放大区中反向偏置。若也正向偏置，器件进入 saturation。 | Lec 3-4 |
| **电流增益 beta** | $\beta_{\mathrm{DC}}=I_C/I_B$。active region 中用它由基极电流估算集电极电流。 | Lec 3-4 |
| **电流增益 alpha** | $\alpha_{\mathrm{DC}}=I_C/I_E$，小于 1。共基放大器常出现。 | Lec 3-4 |
| **截止区 Cutoff Region** | $I_B\approx0$，$I_C\approx0$，晶体管近似 OFF。 | Lec 3-4 |
| **放大区 Active Region** | BE 正偏、BC 反偏，$I_C$ 主要受 $I_B$ 控制。线性放大分析默认在这里。 | Lec 3-4 |
| **饱和区 Saturation Region** | BE、BC 都正偏，$V_{CE}$ 很小，晶体管近似 ON。 | Lec 3-4 |
| **击穿区 Breakdown Region** | 电压过高导致电流急剧增大，不作为正常工作区。 | Lec 3-4 |
| **直流负载线 DC Load Line** | 由外部电源和电阻决定的 $I_C$-$V_{CE}$ 关系。Q 点必须落在其上。 | Lec 3-4 |
| **BJT 作为开关 BJT as Switch** | cutoff 对应 OFF，saturation 对应 ON。不要用 active-region 的 $\beta I_B$ 直接当最终电流。 | Lec 3-4 |

---

### 4-3-2 JFET 与 MOSFET

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **JFET Junction Field-Effect Transistor** | 用栅源电压改变沟道宽度，从而控制漏极电流。栅极通常反向偏置。 | Lec 3-4 |
| **Source / Drain / Gate** | source 是多数载流子进入沟道的位置，drain 是离开沟道的位置，gate 控制沟道。 | Lec 3-4 |
| **沟道 Channel** | JFET 或 MOSFET 中承载漏极电流的导电路径。 | Lec 3-4 |
| **夹断 Pinch-Off** | 沟道被耗尽区挤压到使电流趋于恒定的状态。JFET 恒流区从这里理解。 | Lec 3-4 |
| **欧姆区 Ohmic Region** | $I_D$ 与 $V_{DS}$ 近似满足欧姆关系，器件像电压控制电阻。 | Lec 3-4 |
| **恒流区 Constant-Current Region** | $I_D$ 主要由 $V_{GS}$ 决定，适合放大。 | Lec 3-4 |
| **转移特性 Transfer Characteristic** | 描述 $I_D$ 随 $V_{GS}$ 的变化。JFET 常用平方关系。 | Lec 3-4 |
| **跨导 Transconductance** | $g_m$ 是输出电流对输入电压的斜率。它是 FET 小信号增益的入口量。 | Lec 3-4 |
| **自偏置 Self-Bias** | JFET gate 近似接地，source 电阻产生负 $V_{GS}$。 | Lec 3-4 |
| **分压偏置 Voltage-Divider Bias** | 用分压器设定 gate 电压，稳定性优于简单自偏置。 | Lec 3-4 |
| **MOSFET** | 绝缘栅场效应管。输入电阻高，分为 depletion 和 enhancement 类型。 | Lec 3-4 |
| **D-MOSFET Depletion MOSFET** | 预先有沟道，可 depletion 或 enhancement 工作。 | Lec 3-4 |
| **E-MOSFET Enhancement MOSFET** | 无预形成沟道，只有 $V_{GS}$ 超过阈值后导通。 | Lec 3-4 |
| **阈值电压 Threshold Voltage** | E-MOSFET 形成导电沟道所需的最低 $V_{GS}$。 | Lec 3-4 |
| **导通电阻 On Resistance** | $R_{DS(on)}$ 越小，导通损耗越低。常出现在 MOSFET 数据手册参数中。 | Lec 3-4 |

---

### 4-3-3 放大器分析

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **放大器 Amplifier** | 用较小输入控制较大输出。CCD 中主要分析 BJT 小信号放大器。 | Lec 5-6 |
| **直流分析 DC Analysis** | 只求偏置电流和电压。电容开路，交流源不参与。 | Lec 5-6 |
| **戴维南等效 Thevenin Equivalent** | 把基极分压网络化成一个电压源和串联电阻，方便求 $I_B$ 与 Q 点。 | Lec 5-6 |
| **静态工作点 Q-Point** | 无交流信号时的电流和电压。Q 点决定是否有足够摆幅且不削顶。 | Lec 5-6 |
| **交流等效 AC Equivalent** | 电容视作短路，直流电源接交流地，晶体管换成小信号模型。 | Lec 5-6 |
| **r 参数 r Parameters** | 用 $r_e'$、$\beta r_e'$ 等小信号电阻描述 BJT。考试里最常用。 | Lec 5-6 |
| **h 参数 h Parameters** | 另一种小信号参数表达。笔记中主要用于和 r 参数换算。 | Lec 5-6 |
| **相位反转 Phase Inversion** | 共射输出与输入相差 $180^\circ$。这是判断共射波形题的第一件事。 | Lec 5-6 |
| **输入电阻 Input Resistance** | 信号源看到的等效电阻。偏置电阻、小信号基极电阻和负载折算都可能进入。 | Lec 5-6 |
| **电压增益 Voltage Gain** | 输出电压与输入电压之比。共射、共集、共基的数量级和相位不同。 | Lec 5-6 |
| **旁路电容 Bypass Capacitor** | 在交流中把 emitter resistor 短路，增大共射电压增益。 | Lec 5-6 |
| **负载效应 Loading Effect** | 负载电阻与放大器输出等效电阻并联，使实际增益降低。 | Lec 5-6 |
| **共射放大器 Common-Emitter Amplifier** | 电压增益高，电流增益高，输入电阻中等，输出反相。 | Lec 5-6 |
| **共集放大器 Common-Collector Amplifier** | 又叫 emitter follower。电压增益约 1，输入电阻高，输出电阻低。 | Lec 5-6 |
| **共基放大器 Common-Base Amplifier** | 输入电阻低，电压增益高，电流增益约 1，输出同相。 | Lec 5-6 |
| **电流增益 Current Gain** | 输出电流与输入电流之比。共基约为 1，共射和共集较高。 | Lec 5-6 |
| **功率增益 Power Gain** | 功率输出与功率输入之比。常转换成 dB。 | Lec 5-6 |
| **多级增益 Multistage Gain** | 线性增益相乘，dB 增益相加。级间 loading 会改变实际值。 | Lec 5-6 |

## 4-4 混频、LC、匹配与振荡 RF Building Blocks

### 4-4-1 混频器 Mixers

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **混频 Mixing** | 用非线性乘法把两个频率组合，产生和频与差频。 | Lec 7 |
| **混频器 Mixer** | 实现 frequency conversion 的电路。三个端口通常是 RF、LO、IF。 | Lec 7 |
| **本地振荡器 Local Oscillator, LO** | 提供混频参考频率。LO 频率决定 IF 和 image frequency 的位置。 | Lec 7, Lec 17 |
| **中频 Intermediate Frequency, IF** | 接收机把不同 RF 频道转换到的固定频率。固定 IF 便于高选择性滤波和增益设计。 | Lec 7, Lec 17 |
| **上变频 Up-Conversion** | 保留和频，把基带或低频信号搬到 RF。发射端常见。 | Lec 7 |
| **下变频 Down-Conversion** | 保留差频，把 RF 信号搬到 IF 或基带。接收端常见。 | Lec 7 |
| **理想频移 Ideal Frequency Shifting** | 只保留需要的搬移分量，抑制不需要的和频、差频或原频率泄漏。 | Lec 7 |
| **二极管混频器 Diode Mixer** | 利用二极管非线性产生频率分量，结构简单但杂散较多。 | Lec 7 |
| **BJT 混频器 BJT Mixer** | 利用晶体管非线性并可能提供转换增益。 | Lec 7 |
| **JFET 混频器 JFET Mixer** | 平方特性较干净，高阶杂散相对少。 | Lec 7 |
| **双栅 MOSFET 混频器 Dual-Gate MOSFET Mixer** | 两个 gate 分别接 RF 和 LO，便于隔离输入并实现乘法控制。 | Lec 7 |
| **镜像频率 Image Frequency** | 另一个会被同一 LO 转换到相同 IF 的 RF 频率。它若进入 mixer，会与目标信号重叠。 | Lec 7, Lec 17 |
| **镜像抑制 Image Rejection** | 在 mixer 前用高选择性 RF filter 衰减 image frequency。 | Lec 7, Lec 17 |
| **转换损耗 Conversion Loss** | IF 输出功率相对 RF 输入功率的损耗。无源混频器常见。 | Lec 7 |
| **转换增益 Conversion Gain** | IF 输出功率相对 RF 输入功率的增益。有源混频器可能为正。 | Lec 7 |
| **隔离度 Isolation** | LO 泄漏到 RF 或 IF 端口的程度。数值越大越好。 | Lec 7 |
| **VSWR** | 端口匹配程度，越接近 1 越好。可与反射系数互换理解。 | Lec 7 |

---

### 4-4-2 LC、Q 与阻抗匹配

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **电容 Capacitor** | 储存电场能量。实际电容有漏电和寄生参数。 | Lec 8 |
| **电感 Inductor** | 储存磁场能量。实际电感有绕线电阻和自谐振限制。 | Lec 8 |
| **LC 谐振 Resonance** | 电感磁场能量和电容电场能量来回交换。谐振频率由 $L$ 与 $C$ 决定。 | Lec 8 |
| **串联谐振 Series Resonance** | 谐振时阻抗最小。常用于陷波或选择通路。 | Lec 8 |
| **并联 LC / 槽路 Tank Circuit** | 谐振时阻抗最大。振荡器和调谐放大器常用。 | Lec 8, Lec 9 |
| **Q 值 Quality Factor** | 描述选择性和储能损耗。Q 越高，带宽越窄，选择性越强。 | Lec 8 |
| **带通响应 Band-Pass Response** | 只允许某个频带通过。中心频率、带宽、Q 是三个核心量。 | Lec 8 |
| **高频寄生 High-Frequency Parasitics** | 引线电感、杂散电容、绕线电阻等非理想因素。高频电路不能忽略。 | Lec 8 |
| **串并联等效转换 Series-to-Parallel Conversion** | 把含电阻的串联支路换成等效并联支路，匹配网络题常用。 | Lec 8 |
| **最大功率传输 Maximum Power Transfer** | 负载阻抗应为源阻抗的共轭。实数系统中就是阻值相等。 | Lec 8 |
| **阻抗匹配 Impedance Matching** | 让源和负载之间功率传输最大，并减少反射。 | Lec 8 |
| **反射系数 Reflection Coefficient** | 衡量阻抗不连续处反射强弱。匹配时为 0。 | Lec 8 |
| **回波损耗 Return Loss** | 用 dB 表示反射小不小。数值越大，反射越小。 | Lec 8 |
| **失配损耗 Mismatch Loss** | 因阻抗不匹配导致无法传给负载的功率损失。 | Lec 8 |
| **L 型匹配网络 L Matching Network** | 用一个串联和一个并联电抗完成阻抗变换。串联元件靠低电阻侧。 | Lec 8 |
| **Q Matching** | 由指定 Q 或带宽反推匹配元件。先转等效阻抗，再选网络结构。 | Lec 8 |

---

### 4-4-3 振荡器 Oscillators

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **振荡器 Oscillator** | 不需要外部周期输入，靠反馈和选频网络产生周期输出。 | Lec 9 |
| **LC 槽路 Tank Circuit** | 提供选频和能量交换。损耗会让振荡衰减，需要放大器补偿。 | Lec 9 |
| **飞轮效应 Flywheel Effect** | LC 中能量在电场和磁场之间交换，使振荡持续。 | Lec 9 |
| **Barkhausen 条件 Barkhausen Criterion** | 环路相移为 $2\pi n$，环路增益起振时大于 1，稳态约等于 1。 | Lec 9 |
| **相移振荡器 Phase-Shift Oscillator** | 用三节 RC 网络提供相移，放大器补足增益。 | Lec 9 |
| **开环设计 Open-Loop Design** | 断开反馈环，分别计算放大器增益、反馈系数和等效阻抗。 | Lec 9 |
| **反馈系数 Feedback Factor** | 反馈网络把输出送回输入的比例。Hartley 和 Colpitts 主要差在反馈网络。 | Lec 9 |
| **Hartley 振荡器 Hartley Oscillator** | 抽头电感反馈。总电感参与谐振，抽头比决定反馈。 | Lec 9 |
| **Colpitts 振荡器 Colpitts Oscillator** | 抽头电容反馈。串联等效电容参与谐振，电容比决定反馈。 | Lec 9 |
| **Clapp 振荡器 Clapp Oscillator** | Colpitts 的变形，常加串联电容改善频率稳定度。 | Lec 9 |
| **晶体振荡器 Crystal Oscillator** | 利用石英晶体高 Q 获得高频率稳定度。 | Lec 9 |
| **CXO / TCXO / OCXO** | 晶体振荡器稳定度等级。TCXO 有温度补偿，OCXO 用恒温槽。 | Lec 9 |
| **压控振荡器 Voltage-Controlled Oscillator, VCO** | 输出频率由控制电压决定。FM、PLL 都会使用。 | Lec 9, Lec 16 |
| **变容二极管 Varactor Diode** | 反向偏置下作为电压控制电容，改变 LC 谐振频率。 | Lec 9, Lec 14 |
| **相位噪声 Phase Noise** | 载波附近的频谱扩展，表示短期频率纯度。 | Lec 9 |
| **抖动 Jitter** | 相位噪声在时域中的零交叉时间偏移。 | Lec 9 |
| **眼图 Eye Diagram** | 用于观察数字信号定时和噪声余量。笔记里作为振荡器时域指标的补充。 | Lec 9 |
| **杂散分量 Spurious Components** | 目标频率外的离散输出分量。频率合成和接收机都会怕它。 | Lec 9 |

## 4-5 调制与解调 Modulation and Demodulation

### 4-5-1 AM

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **幅度调制 Amplitude Modulation, AM** | 载波瞬时幅度随消息变化，载波频率保持不变。 | Lec 11-12 |
| **载波 Carrier** | 承载消息的高频正弦信号。AM 中载波本身不含新增信息，但消耗功率。 | Lec 11-12 |
| **消息信号 Message Signal** | 要传输的低频信息。AM 中它控制载波包络。 | Lec 11-12 |
| **调制度 Modulation Index** | 表示载波幅度被消息改变的比例。$m>1$ 为过调制。 | Lec 11-12 |
| **包络 Envelope** | AM 波形外侧包络线。正常 AM 中 envelope detector 可直接恢复消息。 | Lec 11-12 |
| **过调制 Overmodulation** | 调制度大于 1，包络发生交叉，解调失真。 | Lec 11-12 |
| **边频 Side Frequency** | 单音 AM 产生 $f_c-f_m$ 与 $f_c+f_m$。多音信号形成边带。 | Lec 11-12 |
| **上边带 Upper Sideband, USB** | 高于载波频率的一侧频谱。 | Lec 11-12 |
| **下边带 Lower Sideband, LSB** | 低于载波频率的一侧频谱。 | Lec 11-12 |
| **AM 带宽 AM Bandwidth** | 最高消息频率两倍。因为上下边带都要传。 | Lec 11-12 |
| **载波功率 Carrier Power** | AM 总功率的一部分，不随消息携带新信息。 | Lec 11-12 |
| **边带功率 Sideband Power** | 真正携带消息的功率部分。单音 AM 中上下边带功率相同。 | Lec 11-12 |
| **低电平调制 Low-Level Modulation** | 在前级调制，后级用线性放大。灵活但效率受限。 | Lec 11-12 |
| **高电平调制 High-Level Modulation** | 在末级功放调制，常用于高功率 AM 发射。 | Lec 11-12 |
| **集电极调制 Collector Modulation** | 高电平 AM 的一种实现，让消息信号调节 Class C 放大器集电极电源。 | Lec 11-12 |

---

### 4-5-2 SSB

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **DSB-FC** | Double-Sideband Full Carrier，普通 AM。含载波、USB、LSB。 | Lec 13 |
| **DSB-SC** | Double-Sideband Suppressed Carrier，只保留上下边带，抑制载波。 | Lec 13 |
| **SSB Single-Sideband Communication** | 只发送一个边带，通常同时抑制载波和另一个边带。 | Lec 13 |
| **USB / LSB 选择** | 只保留上边带或下边带。选择哪一个不改变信息本身，但影响频谱位置。 | Lec 13 |
| **VSB Vestigial Sideband** | 保留一个完整边带和另一个边带的一部分。用于兼顾带宽和滤波难度。 | Lec 13 |
| **AM 冗余 Redundancy in AM** | 上下边带含相同信息，载波本身不含消息。SSB 就是从这里节省功率和带宽。 | Lec 13 |
| **平衡调制器 Balanced Modulator** | 产生 DSB-SC，抑制载波。后面再通过滤波得到 SSB。 | Lec 13 |
| **二极管环形调制器 Diode Ring Modulator** | 用四个二极管作开关，载波半周期交替翻转消息信号，得到 DSB-SC。 | Lec 13 |
| **边带滤波 Sideband Filtering** | 用高选择性滤波器去掉不需要的边带。难点是滤波器 Q。 | Lec 13 |
| **滤波法 SSB 发射机 Filter-Method Transmitter** | 先生成 DSB-SC，再滤掉一个边带，后续放大和频率搬移。 | Lec 13 |
| **SSB 接收机 SSB Receiver** | 需要重新插入本地载波，再用 product detector 恢复音频。 | Lec 13 |
| **BFO Beat Frequency Oscillator** | 在接收端提供本地载波，使 SSB 能正确还原为音频。 | Lec 13 |
| **Product Detector** | 把 SSB 与本地载波相乘，得到音频差频分量。 | Lec 13 |

---

### 4-5-3 FM 与 PM

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **角度调制 Angle Modulation** | 用消息信号改变载波瞬时相位或瞬时频率，理想幅度保持不变。 | Lec 14 |
| **频率调制 Frequency Modulation, FM** | 消息控制瞬时频率。噪声性能好，带宽通常比 AM 大。 | Lec 14 |
| **相位调制 Phase Modulation, PM** | 消息控制瞬时相位。FM 与 PM 可通过积分或微分互相转换。 | Lec 14 |
| **载波角度 Carrier Angle** | 载波相位函数 $\theta(t)$。瞬时频率是相位变化率。 | Lec 14 |
| **瞬时频率 Instantaneous Frequency** | 随时间变化的频率。FM 题先从这里看频偏。 | Lec 14 |
| **频偏 Frequency Deviation** | FM 瞬时频率相对中心频率的最大偏移。 | Lec 14 |
| **调频指数 Modulation Index for FM** | 频偏与消息频率之比。决定边频数量和频谱扩展程度。 | Lec 14 |
| **Bessel 边频 Bessel Side Frequencies** | FM 频谱含 $f_c\pm nf_m$ 多个边频，幅度由 Bessel 函数决定。 | Lec 14 |
| **Carson 定则 Carson Rule** | 估算 FM 传输带宽。工程题通常用它快速定带宽。 | Lec 14 |
| **变容二极管 FM Varactor FM** | 消息改变 varactor 电容，从而改变 LC 振荡频率。 | Lec 14 |
| **间接 FM Indirect FM** | 先生成 PM 或窄带 FM，再通过倍频得到所需频偏。 | Lec 14 |
| **倍频器 Frequency Multiplier** | 输出频率和频偏同时按倍数增加，调制指数也相应改变。 | Lec 14 |
| **斜率检波器 Slope Detector** | 先把 FM 转成 AM 幅度变化，再用包络检波恢复消息。 | Lec 14, Lec 16 |
| **限幅 Limiting** | 去掉 FM 信号的幅度噪声，使后续解调主要响应频率变化。 | Lec 14 |
| **噪声抑制 Noise Suppression** | FM 的抗噪优势来自幅度限幅和频偏信息承载。 | Lec 14 |

## 4-6 天线与链路 Antennas and Links

### 4-6-1 天线空间概念

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **天线 Antenna** | guided wave 与 free-space wave 之间的转换器。发射和接收是同一物理过程的两个方向。 | Lec 15 |
| **发射天线 Transmitting Antenna** | 把传输线信号辐射到空间。重点是匹配、方向性和辐射效率。 | Lec 15 |
| **接收天线 Receiving Antenna** | 从空间电磁波中耦合能量到电路。后接 RF receiver。 | Lec 15 |
| **近场 Near Field** | 天线附近，电场和磁场关系复杂，不能按远场平面波处理。 | Lec 15 |
| **远场 Far Field** | 离天线足够远，辐射方向图、功率密度和链路预算在这里定义。 | Lec 15 |
| **远场边界 Far-Field Boundary** | 判断是否能用远场近似的距离门槛，和天线最大尺寸、波长有关。 | Lec 15 |
| **辐射方向图 Radiation Pattern** | 辐射强度随方向变化的图。先找主瓣、副瓣、零点。 | Lec 15 |
| **主瓣 Main Lobe** | 辐射最强的方向区域。天线瞄准通常看它。 | Lec 15 |
| **副瓣 Side Lobe** | 非主方向上的辐射。副瓣过高会带来干扰和能量浪费。 | Lec 15 |
| **零点 Null** | 辐射接近零的方向。FNBW 用主瓣两侧第一零点定义。 | Lec 15 |

---

### 4-6-2 天线参数与链路

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **HPBW Half-Power Beamwidth** | 主瓣峰值下降到半功率，也就是 $-3\,\mathrm{dB}$ 两点之间的角度。 | Lec 15 |
| **FNBW First Null Beamwidth** | 主瓣两侧第一零点之间的角度。通常大于 HPBW。 | Lec 15 |
| **功率密度 Power Density** | 单位面积接收到的功率。链路预算中随距离平方衰减。 | Lec 15 |
| **辐射强度 Radiation Intensity** | 单位立体角辐射功率。用于定义方向性。 | Lec 15 |
| **方向性 Directivity** | 某方向辐射强度相对全向平均值的比。只看方向集中程度。 | Lec 15 |
| **天线增益 Antenna Gain** | 在方向性基础上考虑效率，用输入功率作参考。 | Lec 15 |
| **天线带宽 Antenna Bandwidth** | 天线满足匹配、增益或方向图要求的频率范围。 | Lec 15 |
| **前后比 Front-to-Back Ratio** | 主瓣前向辐射与后向辐射的比值。方向性天线常用。 | Lec 15 |
| **EIRP** | 等效全向辐射功率。把发射功率和天线增益合并看。 | Lec 15 |
| **通信链路 Communication Link** | 由发射功率、天线增益、路径损耗、接收增益和接收机灵敏度共同决定。 | Lec 15 |
| **自由空间路径损耗 Free-Space Path Loss** | 自由空间传播导致的功率衰减。频率越高、距离越远，损耗越大。 | Lec 15 |

## 4-7 PLL 与频率控制 PLL and Frequency Control

### 4-7-1 FM 解调与 PLL 模块

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **FM 解调器 FM Demodulator** | 把频率变化还原为电压变化。输出应与原始消息成比例。 | Lec 16 |
| **频率鉴别器 Frequency Discriminator** | 频率检测器的另一种叫法。斜率检波、PLL 检波都可归入这类。 | Lec 16 |
| **脉冲平均 Pulse-Averaging** | 把频率变化转为脉冲密度变化，再取平均得到电压。 | Lec 16 |
| **正交检波 Quadrature Detector** | 把频偏转为相位差，再由相位检测恢复消息。 | Lec 16 |
| **PLL 检波 PLL Detector** | VCO 跟踪 FM 输入，控制电压就是解调输出。 | Lec 16 |
| **锁相环 Phase-Locked Loop, PLL** | 反馈电路，使 VCO 输出频率与输入信号频率同步。 | Lec 16 |
| **相位检测器 Phase Detector** | 比较输入相位与 VCO 输出相位，把相位误差转成电压。 | Lec 16 |
| **环路滤波器 Loop Filter** | 滤掉相位检测器输出中的高频项，保留控制 VCO 的低频误差信号。 | Lec 16 |
| **VCO** | 用控制电压改变输出频率，是 PLL 的被控对象。 | Lec 16 |
| **PLL 增益 PLL Gain** | 常由相位检测器增益和 VCO 增益相乘得到，决定误差到频率修正的强度。 | Lec 16 |

---

### 4-7-2 PLL 状态、参数与模型

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **自由运行 Free-Running** | 未锁定时 VCO 以自身自由振荡频率运行。 | Lec 16 |
| **捕获 Capture** | 输入信号出现后，环路尝试把频率误差拉入可锁定范围。 | Lec 16 |
| **锁定 Locked** | VCO 频率等于输入频率，相位差保持常数。 | Lec 16 |
| **相位误差 Phase Error** | 输入相位与输出相位的差。PLL 实际调节的是这个量。 | Lec 16 |
| **控制电压 Control Voltage** | 环路滤波器输出，直接控制 VCO 频率。 | Lec 16 |
| **捕获范围 Capture Range** | 未锁定时能够捕获输入的频率范围，通常比 lock range 窄。 | Lec 16 |
| **锁定范围 Lock Range** | 已锁定后仍能维持锁定的输入频率范围。 | Lec 16 |
| **XOR Phase Detector** | 简单数字相位检测器，适合方波输入。 | Lec 16 |
| **PFD Phase-Frequency Detector** | 同时判断相位和频率方向，比 XOR 更适合捕获过程。 | Lec 16 |
| **Charge Pump PFD** | PFD 与电荷泵组合，常用于集成 PLL。 | Lec 16 |
| **负反馈模型 Negative Feedback Model** | 把 PLL 看成相位域反馈系统，便于写传递函数。 | Lec 16 |
| **一阶 PLL First-Order PLL** | 无额外动态滤波或使用简单比例模型，传递函数较简单。 | Lec 16 |
| **二阶 PLL Second-Order PLL** | 加一阶环路滤波器后出现自然频率和阻尼比。 | Lec 16 |
| **4046 VCO** | 课件常用 PLL 芯片例子，外接 $R_1$、$R_2$、$C_1$ 决定频率范围。 | Lec 16 |

## 4-8 RF 接收机 RF Receivers

### 4-8-1 接收机架构

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **射频接收机 RF Receiver** | 从天线信号中选出目标信号、抑制干扰、放大并解调。 | Lec 17 |
| **TRF 接收机 Tuned Radio Frequency Receiver** | 不做频率变换，所有 RF 级直接调谐到目标载波。结构简单但稳定性和选择性差。 | Lec 17 |
| **外差 Heterodyne** | RF 与 LO 混频产生固定 IF。superhet 的核心思想。 | Lec 17 |
| **超外差接收机 Superheterodyne Receiver** | 把不同 RF 频道都搬到固定 IF，再做高选择性滤波和放大。 | Lec 17 |
| **RF Section** | 天线后的前端选择和放大部分。要在噪声、线性度、镜像抑制之间折中。 | Lec 17 |
| **Mixer / Converter Section** | 完成 RF 到 IF 的频率转换。 | Lec 17 |
| **Intermediate Frequency Section** | 固定 IF 上的滤波和增益部分。选择性主要由这里决定。 | Lec 17 |
| **Detector and Audio Section** | 解调并放大基带或音频输出。 | Lec 17 |
| **AGC Automatic Gain Control** | 根据信号强弱自动调节接收机总增益，使输出幅度稳定。 | Lec 17 |
| **High-Side Injection** | LO 频率高于 RF。镜像频率会出现在目标 RF 的另一侧。 | Lec 17 |
| **Low-Side Injection** | LO 频率低于 RF。计算 image frequency 时要先画频率轴。 | Lec 17 |

---

### 4-8-2 接收机质量指标

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **选择性 Selectivity** | 区分 desired signal 和 unwanted signals 的能力，通常由滤波器 Q 与带宽决定。 | Lec 17 |
| **灵敏度 Sensitivity** | 在满足指定 SNR 下仍能接收的最小 RF 输入信号。下限受 noise floor 和 NF 影响。 | Lec 17 |
| **保真度 Fidelity** | 输出信号复制原始信息的准确程度。选择性不足或非线性都会破坏它。 | Lec 17 |
| **动态范围 Dynamic Range** | 最大可处理信号与最小可接收信号之间的范围。上限受压缩和互调限制，下限受灵敏度限制。 | Lec 17 |
| **邻道抑制 Adjacent-Channel Rejection** | 抑制邻近频率干扰的能力，属于选择性的具体表现。 | Lec 17 |
| **镜像接收 Image Reception** | image frequency 未被前端滤掉，进入 IF 后与目标信号重叠。 | Lec 17 |
| **RF Filter Q** | 前端滤波器越高 Q，image rejection 越好，但调谐难度越大。 | Lec 17 |

---

### 4-8-3 非线性与噪声

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **非线性模型 Nonlinear Model** | 输出可写成输入的幂级数。二阶、三阶项产生谐波和互调。 | Lec 17 |
| **谐波失真 Harmonic Distortion** | 输出出现输入频率的整数倍分量。 | Lec 17 |
| **THD Total Harmonic Distortion** | 高阶谐波幅度相对基波幅度的比例。 | Lec 17 |
| **1 dB 压缩点 1 dB Compression Point** | 实际输出比理想线性外推低 $1\,\mathrm{dB}$ 时的输入功率。 | Lec 17 |
| **互调失真 Intermodulation Distortion** | 多个输入信号在非线性器件中混合，产生不在原输入频率上的新分量。 | Lec 17 |
| **三阶互调 Third-Order Intermodulation** | 最危险，因为 $2f_1-f_2$ 和 $2f_2-f_1$ 常落在信道附近。 | Lec 17 |
| **IIP3 Input Third-Order Intercept Point** | 基波和三阶互调小信号趋势外推相交时的输入功率。越高线性度越好。 | Lec 17 |
| **OIP3 Output Third-Order Intercept Point** | IIP3 加上增益后的输出端截点。 | Lec 17 |
| **噪声底 Noise Floor** | 系统背景噪声形成的最低可检测功率基准。 | Lec 17 |
| **噪声因子 Noise Factor** | 输入 SNR 与输出 SNR 之比，衡量系统让 SNR 退化多少。 | Lec 17 |
| **噪声系数 Noise Figure** | Noise factor 的 dB 表示。 | Lec 17 |
| **等效噪声温度 Equivalent Noise Temperature** | 用等效温度表示器件噪声。常与 noise factor 互换。 | Lec 17 |
| **Friis 公式 Friis Formula** | 级联系统总噪声由前级增益强烈决定。第一级 LNA 很关键。 | Lec 17 |
| **Front-End Sensitivity** | 把前端增益、噪声系数、带宽和所需 SNR 合起来看最小输入信号。 | Lec 17 |

## 4-9 DAC、ADC 与转换误差 Converters and Errors

### 4-9-1 DAC

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **DAC Digital-to-Analog Converter** | 把数字二进制码转换为对应模拟电压或电流。 | Lec 18 |
| **数字系统与模拟世界 Digital Systems and Analog World** | 处理器输出离散 code，真实执行器和信号通常需要连续模拟量。DAC 连接这两边。 | Lec 18 |
| **参考电压 Reference Voltage** | DAC 输出满量程和步距的基准。 | Lec 18 |
| **分辨率 Resolution** | bit 数决定可分级数。bit 越多，步距越小。 | Lec 18, Lec 19 |
| **LSB Least Significant Bit** | 最小 code 变化对应的模拟步距。误差常用 LSB 衡量。 | Lec 18, Lec 19 |
| **阶梯波形 Staircase Waveform** | DAC 输出随数字 code 变化呈阶梯。理想连续量需要后续滤波或保持。 | Lec 18 |
| **建立时间 Settling Time** | code 改变后输出进入允许误差范围所需时间。高速 DAC 重点看它。 | Lec 18 |
| **电流求和 Current Summing** | DAC 常把各 bit 对应电流相加，再用 op-amp 转成电压。 | Lec 18 |
| **反相 DAC Inverting DAC** | 运放反相端求和，输出符号与参考极性相关。 | Lec 18 |
| **同相 DAC Non-Inverting DAC** | 输出与输入码极性同向，结构和分析入口不同。 | Lec 18 |
| **加权电阻 DAC Weighted Resistor DAC** | 不同 bit 使用按权重变化的电阻。直观但高位数时电阻跨度太大。 | Lec 18 |
| **R-2R 电阻梯 DAC R-2R Ladder DAC** | 只用 $R$ 和 $2R$ 两种阻值，制造更友好。考试题常从梯形等效电阻切入。 | Lec 18 |
| **MSB / LSB 权重** | MSB 贡献最大，LSB 贡献最小。计算输出时先确认 bit 权重方向。 | Lec 18 |

---

### 4-9-2 ADC

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **ADC Analog-to-Digital Converter** | 把模拟输入电压转换为对应数字码。 | Lec 19 |
| **采样 Sampling** | 在离散时间点取模拟值。 | Lec 19 |
| **保持 Holding** | 保持采样值不变，以便后续量化和编码。 | Lec 19 |
| **量化 Quantization** | 把连续幅度映射到有限个离散等级。 | Lec 19 |
| **编码 Encoding** | 把量化等级写成 binary value。 | Lec 19 |
| **采样周期 Sampling Period** | 相邻采样点的时间间隔。 | Lec 19 |
| **Nyquist-Shannon 采样定理** | 带限信号采样频率至少为最高频率两倍，否则会混叠。 | Lec 19 |
| **混叠 Aliasing** | 高频分量采样后表现为低频分量。前端 anti-aliasing filter 就是为它服务。 | Lec 19 |
| **量化误差 Quantization Error** | 实际输入与量化代表值之间的误差，理想情况下限制在半个 LSB 内。 | Lec 19 |
| **SAR ADC Successive Approximation ADC** | 用逐次逼近寄存器从 MSB 到 LSB 二分搜索。速度和复杂度折中好。 | Lec 19 |
| **Dual-Slope ADC** | 先积分输入再用参考反向积分，精度高、速度慢，抗噪较好。 | Lec 19 |
| **Flash ADC** | 用大量比较器一次判断。速度最快，但硬件规模随 bit 数指数增长。 | Lec 19 |
| **ADC 类型比较 ADC Comparison** | SAR 折中，dual-slope 慢但准，flash 快但贵。 | Lec 19 |

---

### 4-9-3 转换器误差

| 概念 | 复习抓手 | 来源 |
| --- | --- | --- |
| **转换器误差 Converter Error** | 实际转换曲线偏离理想直线的方式。先判断是平移、斜率错，还是局部非线性。 | Lec 20 |
| **增益误差 Gain Error** | 实际输入输出曲线斜率与理想斜率不同。零点可能仍然正确。 | Lec 20 |
| **偏移误差 Offset Error** | 整条转换曲线上下平移。斜率可以正确，但零点不准。 | Lec 20 |
| **非线性误差 Non-Linearity Error** | 曲线不能用简单斜率或平移修正。分为 INL 与 DNL。 | Lec 20 |
| **INL Integral Non-Linearity** | 实际转换点相对理想直线的最大偏差。看全局偏离。 | Lec 20 |
| **DNL Differential Non-Linearity** | 相邻 code 实际步距相对理想 1 LSB 的偏差。看局部步距。 | Lec 20 |
| **Missing Code** | 某个数字码永远不会出现，通常与严重 DNL 有关。 | Lec 20 |
| **Monotonicity** | 输入增加时输出码不应下降。DAC/ADC 都会关心单调性。 | Lec 20 |

## 4-10 概念串联 Concept Map

| 主线 | 概念链 |
| --- | --- |
| 系统视角 | source → transmitter → channel → receiver → destination |
| 信号视角 | message → modulation → spectrum → bandwidth → demodulation |
| 器件视角 | semiconductor → PN junction → diode / BJT / FET → amplifier / mixer / oscillator |
| 频率搬移视角 | RF + LO → mixer → IF，image frequency 需要前端滤波 |
| 选频视角 | LC resonance → Q → bandwidth → selectivity → matching |
| 发射视角 | oscillator / carrier → modulation → power amplifier → antenna |
| 接收视角 | antenna → RF filter / LNA → mixer → IF filter → detector → audio/baseband |
| 噪声视角 | thermal noise → noise floor → noise factor / NF → sensitivity |
| 非线性视角 | harmonic distortion → intermodulation → compression point → IIP3 |
| 转换视角 | sampling → quantization → encoding，或 binary code → DAC output |

最后复习时可以按三个问题扫一遍：

1. 这个概念是在处理**幅度、频率、相位、功率、阻抗**，还是在处理**码值**。
2. 它属于**器件级、电路级、系统级**中的哪一层。
3. 题目给图时，先判断它是 **amplifier、mixer、oscillator、modulator、receiver、converter** 中的哪一种。
