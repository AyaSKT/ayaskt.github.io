# Lecture 16 Phase-Locked Loop PLL 锁相环

**歌って聞かせて　この話の続き，**  
**歌唱给我听吧 关于这段故事的后续，**

**連れて行って見たことない星まで。**  
**直至抵达我们从未去过的星球。**

<div align="right">——さユり 《花の塔》</div>

![alt text](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/1781247638338.PNG>)

## 章节目录

- [章节目录](#章节目录)
- [16-1 FM 解调回顾 FM Demodulation Review](#16-1-fm-解调回顾-fm-demodulation-review)
  - [16-1-1 频率鉴别器 Frequency Discriminator](#16-1-1-频率鉴别器-frequency-discriminator)
  - [16-1-2 斜率检波器 Slope Detector](#16-1-2-斜率检波器-slope-detector)
- [16-2 PLL 基本结构 Basic PLL Structure](#16-2-pll-基本结构-basic-pll-structure)
  - [16-2-1 PLL 的工作目标 Operating Goal](#16-2-1-pll-的工作目标-operating-goal)
  - [16-2-2 三个核心模块 Three Core Blocks](#16-2-2-三个核心模块-three-core-blocks)
  - [16-2-3 工作阶段 Operating Stages](#16-2-3-工作阶段-operating-stages)
- [16-3 相位检测器 Phase Detector](#16-3-相位检测器-phase-detector)
  - [16-3-1 模拟相位检测器 Analog Phase Detector](#16-3-1-模拟相位检测器-analog-phase-detector)
  - [16-3-2 数字相位检测器 Digital Phase Detector](#16-3-2-数字相位检测器-digital-phase-detector)
- [16-4 环路滤波器与 VCO Loop Filter and VCO](#16-4-环路滤波器与-vco-loop-filter-and-vco)
  - [16-4-1 环路滤波器 Loop Filter](#16-4-1-环路滤波器-loop-filter)
  - [16-4-2 压控振荡器 Voltage-Controlled Oscillator](#16-4-2-压控振荡器-voltage-controlled-oscillator)
  - [16-4-3 PLL 增益 PLL Gain](#16-4-3-pll-增益-pll-gain)
- [16-5 PLL 反馈模型与例题 Feedback Model and Examples](#16-5-pll-反馈模型与例题-feedback-model-and-examples)
  - [16-5-1 负反馈模型 Negative Feedback Model](#16-5-1-负反馈模型-negative-feedback-model)
  - [16-5-2 4046 VCO 设计 4046 VCO Design](#16-5-2-4046-vco-设计-4046-vco-design)
  - [16-5-3 速算例题 Quick Examples](#16-5-3-速算例题-quick-examples)
- [Summary](#summary)

## 16-1 FM 解调回顾 FM Demodulation Review

### 16-1-1 频率鉴别器 Frequency Discriminator

**FM 解调器 FM Demodulator** 把接收载波的频率变化还原成电压变化。输出电压应当与原始消息信号成比例。

常见名称：

| 名称 | English |
| --- | --- |
| FM 检波器 | FM detector |
| 频率鉴别器 | frequency discriminator |
| 频率检测器 | frequency detector |

FM 波本身的幅度通常保持不变，信息在瞬时频率里。解调器做的事就是把频率偏移 $\Delta f$ 变成电压 $v_o(t)$。

常见方法可以排成一张表：

| 方法 Method | 主要思路 Main idea | 输出依赖 Output depends on |
| --- | --- | --- |
| 斜率检波 Slope detector | 频率变化变成幅度变化 | 调谐电路输出电压 |
| 脉冲平均 Pulse-averaging | 频率变化变成脉冲密度变化 | 平均脉冲密度 |
| 正交检波 Quadrature detector | 频偏变成相移 | 相位差 |
| PLL 检波 PLL detector | VCO 跟踪 FM 输入 | VCO 控制电压 |

---

### 16-1-2 斜率检波器 Slope Detector

![斜率检波器频率响应](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_slope_detector.jpg>)

斜率检波器使用调谐电路的频率响应。载波频率 $f_c$ 放在响应曲线的斜坡上，而不是放在谐振峰值 $f_r$ 处。

当 FM 瞬时频率升高时，调谐电路输出幅度升高；瞬时频率降低时，输出幅度降低。之后再用包络检波器取出这个幅度变化。

过程可以写成：

$$
\text{FM frequency variation}
\rightarrow
\text{AM amplitude variation}
\rightarrow
\text{audio voltage}
$$

斜率检波器结构简单，但线性度和抗噪声能力一般。PLL 检波用反馈追踪频率，通常更稳定。

> [!NOTE]
> 除斜率检波和 PLL 检波外，FM 解调还有以下常见方法：
>
> **正交检波器 Quadrature Detector**：先将 FM 信号的频率变化经 $90^\circ$ 移相网络转为相位变化，再用乘法器比较原信号与移相后信号的相位差。乘法器输出经低通滤波后得到与频偏成比例的电压。无需 LC 调谐电路，适合集成电路实现。
>
> **脉冲平均检波器 Pulse-Averaging Detector**：将 FM 信号限幅为方波，每个过零点触发一个等宽脉冲。瞬时频率越高，脉冲密度越大，经低通滤波后的平均电压越高。输出与瞬时频率成正比。

## 16-2 PLL 基本结构 Basic PLL Structure

### 16-2-1 PLL 的工作目标 Operating Goal

![PLL 基本介绍](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_basic_intro.jpg>)

:::: definition 锁相环 Phase-Locked Loop
**锁相环 PLL** 是一种反馈电路，使压控振荡器 VCO 的输出频率与输入信号频率保持同步。

锁定后，VCO 输出与输入信号之间保持固定相位差，频率相同。
::::

PLL 用在 FM 解调时，VCO 控制电压就是恢复出来的消息信号：

$$
\text{FM frequency variation}
\rightarrow
\text{VCO control-voltage variation}
\rightarrow
\text{recovered message}
$$

VCO 的自由振荡频率记作 $f_0$。没有输入信号或未锁定时，VCO 频率接近 $f_0$。

---

### 16-2-2 三个核心模块 Three Core Blocks

![PLL 基本系统](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_basic_system.jpg>)

基本 PLL 由三个模块组成：

| 模块 Block | 作用 Function | 常用符号 |
| --- | --- | --- |
| 相位检测器 Phase Detector | 比较输入与 VCO 输出相位 | $K_D$ |
| 环路滤波器 Loop Filter | 保留低频误差信号，滤掉高频项 | $F(s)$ |
| 压控振荡器 VCO | 用控制电压调节输出频率 | $K_O$ |

相位检测器输出误差信号：

$$
v_{\phi}=K_D\phi_e
$$

其中：

- $K_D$：相位检测器增益，单位 $\mathrm{V/rad}$
- $\phi_e$：输入与 VCO 输出之间的相位误差

环路滤波器输出控制电压 $v_o$，送入 VCO。VCO 频率随 $v_o$ 改变。

---

### 16-2-3 工作阶段 Operating Stages

PLL 常用三个阶段描述：

| 阶段 Stage | 状态 |
| --- | --- |
| 自由运行 Free-running | 没有锁定，$f_{\mathrm{osc}}\approx f_0$ |
| 捕获 Capture | 输入出现，环路尝试减小频率与相位误差 |
| 锁定 Locked | $f_{\mathrm{osc}}=f_{\mathrm{in}}$，相位差固定 |

自由运行时：

$$
f_{\mathrm{osc}}=f_0
$$

锁定后：

$$
f_{\mathrm{osc}}=f_{\mathrm{in}}
$$

:::: tip
Lock range 是已经锁住以后还能跟踪的频率范围；capture range 是从未锁定状态开始能抓住输入的范围。后者通常更窄。
::::

## 16-3 相位检测器 Phase Detector

### 16-3-1 模拟相位检测器 Analog Phase Detector

![相位检测器](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_phase_detector.jpg>)

模拟相位检测器常用乘法器实现。设两个输入为

$$
x_1(t)=A_1\cos{(\omega t+\phi_1)}
$$

$$
x_2(t)=A_2\cos{(\omega t+\phi_2)}
$$

相乘后：

$$
x_1(t)x_2(t)
=
\frac{A_1A_2}{2}
\cos{(\phi_1-\phi_2)}
+
\frac{A_1A_2}{2}
\cos{(2\omega t+\phi_1+\phi_2)}
$$

环路滤波器滤掉 $2\omega$ 高频项，留下与相位差有关的低频项：

$$
v_{\phi}\propto \cos{(\phi_1-\phi_2)}
$$

在锁定点附近，可以把相位检测器近似成线性模块：

$$
v_{\phi}=K_D\phi_e
$$

这个 $K_D$ 就是相位检测器特性曲线的斜率。

---

### 16-3-2 数字相位检测器 Digital Phase Detector

数字 PLL 常用 XOR、触发器型 PFD 或其他逻辑电路。输入信号通常先整形成方波。

数字相位检测器的输出通常表现为脉冲宽度或占空比。相位差越大，平均输出电压越大或越小。

| 类型 Type | 特点 |
| --- | --- |
| XOR phase detector | 简单，适合方波输入 |
| PFD phase-frequency detector | 能同时判断相位和频率方向 |
| Charge pump PFD | 常用于集成 PLL |

数字检测器输出仍然要经过环路滤波器，得到 VCO 控制电压。

## 16-4 环路滤波器与 VCO Loop Filter and VCO

### 16-4-1 环路滤波器 Loop Filter

![环路滤波器](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_loop_filter.jpg>)

相位检测器输出通常包含两部分：

1. 低频或 DC 部分，用于控制 VCO；
2. 高频纹波，由相位检测器运算产生。

环路滤波器保留第一部分，衰减第二部分。滤波器输出记作

$$
v_o(t)=\text{VCO control voltage}
$$

滤波器还会影响捕获速度、稳定性和输出纹波。带宽太窄，锁定慢；带宽太宽，噪声和纹波更容易进入 VCO。

---

### 16-4-2 压控振荡器 Voltage-Controlled Oscillator

![VCO](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_vco.jpg>)

VCO 的输出频率由控制电压决定。线性近似下：

$$
f_{\mathrm{osc}}=f_0+K_{\mathrm{VCO}}v_o
$$

或者写成角频率：

$$
\omega_{\mathrm{osc}}=\omega_0+K_Ov_o
$$

其中：

- $f_0,\omega_0$：自由运行频率；
- $K_{\mathrm{VCO}}$：VCO 频率灵敏度，单位 $\mathrm{Hz/V}$；
- $K_O$：VCO 角频率增益，单位 $\mathrm{rad/(s\cdot V)}$。

若控制电压增加，VCO 频率增加；控制电压降低，VCO 频率降低。

---

### 16-4-3 PLL 增益 PLL Gain

PLL 里最常用的两个增益是：

$$
K_D=\frac{v_{\phi}}{\phi_e}
\qquad \mathrm{(V/rad)}
$$

$$
K_O=\frac{\Delta \omega_{\mathrm{osc}}}{v_o}
\qquad \mathrm{rad/(s\cdot V)}
$$

环路增益为

$$
K_V=K_DK_O
$$

锁定状态下，若 VCO 需要从 $\omega_0$ 移到 $\omega_1$，则

$$
v_o=\frac{\omega_1-\omega_0}{K_O}
$$

又因为

$$
v_o\approx K_D\phi_e
$$

所以

$$
\phi_e
=
\frac{\omega_1-\omega_0}{K_DK_O}
$$

环路增益越大，维持同样频率偏移需要的相位误差越小。

## 16-5 PLL 反馈模型与例题 Feedback Model and Examples

### 16-5-1 负反馈模型 Negative Feedback Model

![PLL 反馈模型](<CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_feedback_model.jpg>)

用相位域模型看 PLL，VCO 对控制电压的相位输出带一个积分：

$$
\Phi_{\mathrm{out}}(s)
=
\frac{K_OF(s)K_D}{s}
\left[
\Phi_{\mathrm{in}}(s)-\Phi_{\mathrm{out}}(s)
\right]
$$

整理得闭环传递函数：

$$
H(s)=
\frac{\Phi_{\mathrm{out}}(s)}{\Phi_{\mathrm{in}}(s)}
=
\frac{K_DK_OF(s)}{s+K_DK_OF(s)}
$$

若 $F(s)=1$：

$$
H(s)=\frac{K_V}{s+K_V}
$$

这是一个一阶低通形式。输入相位的低频变化被跟踪，高频变化会被环路衰减。

---

### 16-5-2 4046 VCO 设计 4046 VCO Design

CD4046 是经典 PLL 芯片，内部含相位比较器和 VCO。VCO 的频率范围可由 $R_1,R_2,C_1$ 近似设定。

常用近似式：

$$
f_{\min}\approx
\frac{1}{R_2(C_1+32\,\mathrm{pF})}
$$

$$
f_{\max}\approx
f_{\min}
+
\frac{1}{R_1(C_1+32\,\mathrm{pF})}
$$

若 $0\le v_o\le V_{DD}$ 时 VCO 近似线性，则频率灵敏度为

$$
K_{\mathrm{VCO}}
=
\frac{\Delta f_{\mathrm{osc}}}{\Delta v_o}
=
\frac{f_{\max}-f_{\min}}{V_{DD}}
$$

例：$f_{\min}=8\,\mathrm{kHz}$，$f_{\max}=12\,\mathrm{kHz}$，$V_{DD}=15\,\mathrm{V}$。

$$
K_{\mathrm{VCO}}
=
\frac{12-8}{15}\,\mathrm{kHz/V}
=
0.267\,\mathrm{kHz/V}
$$

---

### 16-5-3 速算例题 Quick Examples

**例 1：VCO 频率变化**

已知 $K_{\mathrm{VCO}}=2.5\,\mathrm{kHz/V}$，控制电压变化 $\Delta v_o=0.8\,\mathrm{V}$。

$$
\Delta f
=
K_{\mathrm{VCO}}\Delta v_o
=
2.5\times 0.8
=
2.0\,\mathrm{kHz}
$$

**例 2：相位检测器输出**

已知 $K_D=0.5\,\mathrm{V/rad}$，相位误差 $\phi_e=0.75\,\mathrm{rad}$。

$$
v_{\phi}=K_D\phi_e=0.5\times0.75=0.375\,\mathrm{V}
$$

**例 3：一阶 PLL 传递函数**

若 $K_O=10^3\,\mathrm{rad/(s\cdot V)}$，$K_D=1\,\mathrm{V/rad}$，$F(s)=1$：

$$
K_V=K_DK_O=10^3\,\mathrm{s^{-1}}
$$

$$
H(s)=\frac{10^3}{s+10^3}
$$

## Summary

PLL 用反馈让 VCO 频率跟随输入信号。相位检测器产生误差电压，环路滤波器生成平滑控制电压，VCO 把控制电压变成频率变化。

FM 解调时，输入 FM 的频率偏移被 PLL 转换为 VCO 控制电压，所以控制电压就是恢复后的消息信号。公式上最常用的是

$$
v_{\phi}=K_D\phi_e,
\qquad
\omega_{\mathrm{osc}}=\omega_0+K_Ov_o,
\qquad
H(s)=\frac{K_DK_OF(s)}{s+K_DK_OF(s)}
$$
