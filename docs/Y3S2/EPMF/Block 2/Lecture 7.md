# Lec. 7 Robust Manufacturing Design

**若时光能永远静止于此，只希望我可以一直待在这里。**

![alt text](<Lecture 7.attachments/1779869970627.jpeg>)


## 章节目录

- [章节目录](#章节目录)
- [7-1 稳健设计基础 Robust Design Basics](#7-1-稳健设计基础-robust-design-basics)
  - [7-1-1 稳健设计导论 Introduction to Robust Design](#7-1-1-稳健设计导论-introduction-to-robust-design)
  - [7-1-2 质量与变异 Quality and Variation](#7-1-2-质量与变异-quality-and-variation)
  - [7-1-3 稳健设计的两大工具 Two Major Tools of Robust Design](#7-1-3-稳健设计的两大工具-two-major-tools-of-robust-design)
  - [7-1-4 质量损失函数 Quality Loss Function](#7-1-4-质量损失函数-quality-loss-function)
  - [7-1-5 损失函数示例 Loss Function Examples](#7-1-5-损失函数示例-loss-function-examples)
  - [7-1-6 质量特性类型 Types of Quality Characteristics](#7-1-6-质量特性类型-types-of-quality-characteristics)
  - [7-1-7 P Diagram 参数分类 Parameter Classification](#7-1-7-p-diagram-参数分类-parameter-classification)
  - [7-1-8 平均质量损失 Average Quality Loss](#7-1-8-平均质量损失-average-quality-loss)
- [7-2 实验设计 Design of Experiments (DOE)](#7-2-实验设计-design-of-experiments-doe)
  - [7-2-1 田口参数设计步骤 Taguchi Parameter Design Steps](#7-2-1-田口参数设计步骤-taguchi-parameter-design-steps)
  - [7-2-2 全因子设计 Full Factorial Design](#7-2-2-全因子设计-full-factorial-design)
  - [7-2-3 正交阵列 Orthogonal Arrays](#7-2-3-正交阵列-orthogonal-arrays)
  - [7-2-4 正交阵列示例 L9(3^4) Orthogonal Array Example](#7-2-4-正交阵列示例-l934-orthogonal-array-example)
  - [7-2-5 交叉阵列 Crossed Arrays — Inner \& Outer Arrays](#7-2-5-交叉阵列-crossed-arrays--inner--outer-arrays)
  - [7-2-6 交叉阵列示例 Crossed Array Example](#7-2-6-交叉阵列示例-crossed-array-example)
  - [7-2-7 总结 Summary — Robust Design Process](#7-2-7-总结-summary--robust-design-process)
- [Block 2 例题 Examples](#block-2-例题-examples)



## 7-1 稳健设计基础 Robust Design Basics

### 7-1-1 稳健设计导论 Introduction to Robust Design

R&D 需要在品质、成本和速度之间取得平衡。

:::definition 稳健设计 Robust Design
**稳健设计是一种工程方法论，用于提高研发阶段的生产力，从而快速、低成本地生产高品质产品。它基于统计实验设计，由田口玄一（Genichi Taguchi）于 1950-1960 年代提出。**

**An engineering methodology for improving R&D productivity, producing high-quality products quickly and at lower cost using statistical experimental design methods. Developed by Genichi Taguchi in the 1950s-1960s.**
:::

稳健设计的核心思路：**减少变异对品质的影响，同时不必消除变异的来源**——因为消除变异来源往往太困难、太昂贵。

> [!NOTE] 电阻器范例
> 工厂生产 100Ω 电阻器，实际范围 95-105Ω。经过田口优化后，范围缩小到 98-102Ω。

---

### 7-1-2 质量与变异 Quality and Variation

![电阻器制造与田口方法](<Lecture 7.attachments/lec7_07_resistor_example.jpg>)

:::definition 理想品质 Ideal Quality
**理想品质 = 每一件产品都达到目标性能。田口观点：品质应以功能变异对社会造成的总损失来衡量。理想品质下损失为零。**

**Ideal quality: every product delivers target performance. Quality is measured by total loss to society due to functional variation. Loss is zero at ideal quality.**
:::

> [!IMPORTANT] Sony 电视范例（1970s）
> 美国消费者更喜欢日本制造的 Sony 电视，而非美国制造的——即使设计和公差完全一样。日本版分布以目标为中心、变异小；美国版变异大。品质感知来自**变异**，而非缺陷数量。

> [!TIP] 电话线缆范例
> 制造商通过减小变异并将均值靠近上限来省铜。但电阻偏高导致电气损失大、用户投诉多。**变异和偏离目标，两者都要考虑。**

---

### 7-1-3 稳健设计的两大工具 Two Major Tools of Robust Design

稳健设计依赖两大工具：

| 工具 | 用途 |
|:---:|:---:|
| 品质损失函数 Quality Loss Function | 设计/开发阶段的品质度量 |
| 正交阵列 Orthogonal Arrays | 高效实验设计 |

---

### 7-1-4 质量损失函数 Quality Loss Function

![Sony 电视机质量案例](<Lecture 7.attachments/lec7_09_sony_example.jpg>)

:::definition 品质损失函数 Quality Loss Function
**品质损失函数是量化产品性能偏离目标值时所造成损失的数学模型。**

**A mathematical model quantifying the loss incurred when product performance deviates from target value.**
:::

**传统观点**：

$$L(y) = \begin{cases} 0, & \text{if } |y-m| \leq \Delta_0 \\ A_0, & \text{otherwise} \end{cases}$$

> [!NOTE] 参数说明
> 其中：
> - $y$：产品实际性能值
> - $m$：目标值 (Target Value)
> - $\Delta_0$：功能界限 (Functional Limit)，产品还能正常工作的最大偏离量
> - $A_0$：超出功能界限时的维修或更换成本

**田口观点 — 二次损失函数 Quadratic Loss Function**：

$$L(y) = k(y-m)^2$$

> [!NOTE] 参数说明
> $k = \dfrac{A_0}{\Delta_0^2}$ 为**品质损失系数 (Quality Loss Coefficient)**，由功能界限和维修成本共同决定。

> [!IMPORTANT] 关键特性
> - 在目标值 $m$ 处损失为零
> - 接近目标时损失缓慢增加
> - 远离目标时损失快速增加

---

### 7-1-5 损失函数示例 Loss Function Examples

**范例 1：电视色彩密度 TV Color Density**

- 功能限值：$m \pm 7$
- 维修成本：$A_0 = \$98$

由 $k = A_0 / \Delta_0^2$ 可得：

$$k = \frac{98}{49} = 2$$

于是有：

$$L(y) = 2(y-m)^2$$

| 偏离量 | 损失 |
|:---:|:---:|
| $y = m \pm 4$ | $L = 2(4)^2 = \$32$ |
| $y = m \pm 2$ | $L = 2(2)^2 = \$8$ |

**范例 2：电源供应器 Power Supply**

- 目标：$m = 110V$
- 失效范围：$110 \pm 20V$（即 $\Delta_0 = 20V$）
- 维修成本：$A_0 = \$100$

代入公式得：

$$k = \frac{100}{400} = 0.25$$

$$L(y) = 0.25(y-110)^2$$

---

### 7-1-6 质量特性类型 Types of Quality Characteristics

![质量特性类型](<Lecture 7.attachments/lec7_16_quality_characteristics.jpg>)

品质特性分三类：

| 类型 | 说明 | 范例 |
|:---:|:---:|:---:|
| 望小特性 Smaller-the-better | 越小越好 | Response time, Leakage current, Pollution |
| 望目特性 Nominal-the-best | 接近目标值越好 | Temperature, Duty Cycle, Bandwidth, Voltage Regulation |
| 望大特性 Larger-the-better | 越大越好 | Efficiency, Accuracy, Power amplification |

三种特性对应的损失函数公式：

| 类型 | 损失函数 |
|:---:|:---:|
| 望目 Nominal-the-best | $L(y) = k(y-m)^2$ |
| 望小 Smaller-the-better | $L(y) = ky^2$（目标 $m=0$） |
| 望大 Larger-the-better | $L(y) = k\!\left(\dfrac{1}{y^2}\right)$ |

---

### 7-1-7 P Diagram 参数分类 Parameter Classification

![P Diagram 参数分类](<Lecture 7.attachments/lec7_17_p_diagram.jpg>)

P Diagram 将参数分为三类：

| 参数类型 | 说明 | 范例 |
|:---:|:---:|:---:|
| 信号因子 Signal Factors | 直接影响性能的因子 | Voltage, Current, Frequency, Resistance, Capacitance |
| 控制因子 Control Factors | 设计者可优化指定的因子 | Process parameters, Material properties, Component selection, Assembly techniques |
| 噪音因子 Noise Factors | 造成变异但生产中难以控制的因子 | Temperature, Humidity, Electrical interference, Component tolerances, Process variations, Human error |

---

### 7-1-8 平均质量损失 Average Quality Loss

:::definition 平均品质损失 Average Quality Loss
**对 $n$ 个产品，平均品质损失为各产品损失的均值。**

**The average quality loss for $n$ products is the mean of individual losses.**
:::

$$Q = \frac{1}{n}\sum_{i=1}^{n}L(y_i) = k\left[(\mu-m)^2 + \frac{n-1}{n}\sigma^2\right]$$

特别地，当 $n$ 足够大时：

$$\boxed{Q = k\left[(\mu-m)^2 + \sigma^2\right]}$$

> [!NOTE] 物理意义
> 平均品质损失由两部分组成：
> 1. $(\mu - m)^2$：偏离目标的损失（**准确度 Accuracy**）
> 2. $\sigma^2$：变异造成的损失（**精密度 Precision**）

**范例：电子量测装置 Electronic Measurement Device**

- 10 个装置的量测值：9.4V - 10.3V
- 目标值：$m = 10V$
- 故障界限：$10 \pm 0.5V$
- 故障维修成本：$A_0 = \$2$

代入 $k = A_0/\Delta_0^2$ 得：

$$k = \frac{2}{0.5^2} = 8$$

10 个装置的量测值及各装置损失：

| 装置 | $y_i$ | $y_i - m$ | $L(y_i) = 8(y_i-10)^2$ |
|:---:|:---:|:---:|:---:|
| 1 | 9.5 | -0.5 | $8(0.25) = 2.00$ |
| 2 | 9.8 | -0.2 | $8(0.04) = 0.32$ |
| 3 | 10.1 | +0.1 | $8(0.01) = 0.08$ |
| 4 | 9.9 | -0.1 | $8(0.01) = 0.08$ |
| 5 | 9.7 | -0.3 | $8(0.09) = 0.72$ |
| 6 | 10.2 | +0.2 | $8(0.04) = 0.32$ |
| 7 | 9.6 | -0.4 | $8(0.16) = 1.28$ |
| 8 | 10.3 | +0.3 | $8(0.09) = 0.72$ |
| 9 | 10.0 | 0.0 | $8(0) = 0.00$ |
| 10 | 9.4 | -0.6 | $8(0.36) = 2.88$ |

$$\mu = \frac{9.5+9.8+10.1+9.9+9.7+10.2+9.6+10.3+10.0+9.4}{10} = 9.85$$

$$\sigma^2 = \frac{1}{9}\sum_{i=1}^{10}(y_i - 9.85)^2 = \frac{0.765}{9} = 0.085$$

代入平均损失公式：

$$Q = 8\left[(9.85-10)^2 + \frac{9}{10}(0.085)\right] = 8(0.0225 + 0.0765) = 8 \times 0.099 = \boxed{0.792}$$


## 7-2 实验设计 Design of Experiments (DOE)

### 7-2-1 田口参数设计步骤 Taguchi Parameter Design Steps

田口参数设计共五步：

| 步骤 | 说明 |
|:---:|:---:|
| 1. 脑力激荡 Brainstorming | 识别所有可能的因子 |
| 2. 识别参数和噪音 Identify Parameters & Noise | 对因子进行分类 |
| 3. 建构 DOE Construct DOE | 选择合适的正交阵列 |
| 4. 执行实验 Perform Experiments | 按方案进行实验、收集数据 |
| 5. 分析结果 Analyze Results | 确定最佳参数组合 |

---

### 7-2-2 全因子设计 Full Factorial Design

全因子实验的次数公式：

$$\text{Number of Experiments} = (\text{\# levels})^{(\text{\# factors})}$$

> [!NOTE] DOE 术语说明
> - **因子 Factor**：实验中待考察的独立变量（如温度、压力、材料类型），可能是控制因子或噪音因子
> - **水准 Level**：因子在实验中可取的不同数值或离散设定（如温度取 $100^\circ\text{C}$、$150^\circ\text{C}$、$200^\circ\text{C}$ 三个水准）
> - **实验 Run**：按照特定因子水准组合执行的一次试验
> - **处理 Treatment**：一次实验中所有因子水准的具体组合，在全因子设计中每个处理对应一次 Run

当 $n$ 个因子各取 2 水准时，实验次数 = $2^n$：

| 因子数 | 实验次数 |
|:---:|:---:|
| 3 | $2^3 = 8$ |
| 4 | $2^4 = 16$ |
| 5 | $2^5 = 32$ |
| 7 | $2^7 = 128$ |
| 10 | $2^{10} = 1024$ |

> [!TIP] 为何使用正交阵列
> 全因子设计的实验次数随因子数呈指数增长。正交阵列大幅减少实验次数，同时仍能有效估计各因子的影响。

---

### 7-2-3 正交阵列 Orthogonal Arrays

![标准正交数组](<Lecture 7.attachments/lec7_27_standard_oas.jpg>)

:::definition 正交阵列 Orthogonal Array
**正交阵列是一种部分因子设计，以最少的实验次数有效估计各因子效果。每个因子的各水准在实验中均匀出现。**

**A fractional factorial design that efficiently estimates factor effects with minimum experiments. Each level of every factor appears uniformly.**
:::

正交阵列表示法：$L_N(k^m)$

- $N$：实验次数
- $k$：每因子的水准数
- $m$：最多可安排的因子数

| 正交阵列 | 实验次数 | 水准数 | 因子数 |
|:---:|:---:|:---:|:---:|
| $L_4(2^3)$ | 4 | 2 | 3 |
| $L_8(2^7)$ | 8 | 2 | 7 |
| $L_9(3^4)$ | 9 | 3 | 4 |
| $L_{12}(2^{11})$ | 12 | 2 | 11 |
| $L_{16}(2^{15})$ | 16 | 2 | 15 |
| $L_{18}(2^1 \times 3^7)$ | 18 | 混合 | 8 |
| $L_{25}(5^6)$ | 25 | 5 | 6 |
| $L_{27}(3^{13})$ | 27 | 3 | 13 |

标准正交阵列全集：$L_4, L_8, L_9, L_{12}, L_{16}, L_{16b}, L_{18}, L_{25}, L_{27}, L_{32}, L_{32b}, L_{36}, L_{50}, L_{54}, L_{64}, L_{64b}, L_{81}$

---

### 7-2-4 正交阵列示例 L9(3^4) Orthogonal Array Example

$L_9(3^4)$：9 次实验，每因子 3 水准，最多安排 4 因子。

| 实验 Run | A | B | C | D |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | 1 | 1 | 1 |
| 2 | 1 | 2 | 2 | 2 |
| 3 | 1 | 3 | 3 | 3 |
| 4 | 2 | 1 | 2 | 3 |
| 5 | 2 | 2 | 3 | 1 |
| 6 | 2 | 3 | 1 | 2 |
| 7 | 3 | 1 | 3 | 2 |
| 8 | 3 | 2 | 1 | 3 |
| 9 | 3 | 3 | 2 | 1 |

> [!NOTE] 正交特性
> 任意两列中，所有水准组合 $(1,1), (1,2), (1,3), (2,1), \ldots$ 均恰好出现一次，即「正交」的含义。

---

### 7-2-5 交叉阵列 Crossed Arrays — Inner & Outer Arrays

:::definition 交叉阵列 Crossed Arrays
**交叉阵列将控制因子安排在内侧阵列（Inner Array），噪音因子安排在外侧阵列（Outer Array）。对每个内侧阵列的实验行，运行所有外侧阵列组合，评估噪音条件下的稳健性。**

**Control factors go in the Inner Array, noise factors in the Outer Array. For each inner array row, all outer array combinations are run to evaluate robustness under noise.**
:::

**分析流程**：

1. 对内侧阵列每一行，执行外侧阵列所有实验
2. 计算该行的均值 $\mu$ 和变异数 $\sigma^2$
3. 计算平均品质损失：$Q = \frac{k}{n}\sum_{j=1}^{n}(y_j-m)^2$
4. 选择 $Q$ 最小的行——对应最佳控制因子组合

### 7-2-6 交叉阵列示例 Crossed Array Example

![交叉阵列例题](<Lecture 7.attachments/lec7_30_crossed_array_example.jpg>)

**问题设定**：

- **控制因子**：4 个（A, B, C, D），各 3 水准
- **噪音因子**：3 个（E, F, G），各 2 水准
- **目标值**：$m = 20$
- **损失系数**：$k = 1$

**内侧阵列**：$L_9(3^4)$ — 9 次实验

**外侧阵列**：$L_8(2^3)$ — 8 次实验（3 个二水准噪音因子的所有组合）

**计算公式**：

$$
\mu_i = \frac{1}{8}\sum_{j=1}^{8}y_{ij}
$$

$$
Q_i = \frac{1}{8}\sum_{j=1}^{8}(y_{ij}-20)^2
$$

| 内侧 Run | A | B | C | D | $\mu$ | $Q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | -1 | -1 | -1 | -1 | 17.525 | 17.545 |
| 2 | -1 | 0 | 0 | 0 | 19.425 | 7.727 |
| 3 | -1 | +1 | +1 | +1 | 19.025 | 8.225 |
| 4 | 0 | -1 | 0 | +1 | 20.125 | 5.920 |
| 5 | 0 | 0 | +1 | -1 | 22.825 | 18.260 |
| 6 | 0 | +1 | -1 | 0 | 19.225 | 10.595 |
| 7 | +1 | -1 | +1 | 0 | 19.850 | 7.818 |
| 8 | +1 | 0 | -1 | +1 | 18.313 | 15.016 |
| 9 | +1 | +1 | 0 | -1 | 21.200 | 15.078 |

选择 $Q_i$ 最小的那一行所对应的控制因子水准组合：

$$
\boxed{\text{Best Combination} = \text{Run 4}: A=0,\;B=-1,\;C=0,\;D=+1}
$$

> [!IMPORTANT] 稳健设计的核心
> 交叉阵列法同时考虑**准确度**（偏离目标）和**精密度**（变异），在噪音条件下找到最稳健的设计参数组合。

### 7-2-7 总结 Summary — Robust Design Process

| 阶段 | 关键步骤 |
|:---:|:---:|
| 问题定义 Problem Definition | 确定品质特性、目标值、控制因子、噪音因子 |
| 实验设计 Experiment Design | 选择内侧阵列和外侧阵列 |
| 执行实验 Experimentation | 按阵列安排进行实验 |
| 分析 Analysis | 计算 $\mu$, $\sigma^2$, $Q$ |
| 最优化 Optimization | 选择 $Q$ 最小的因子组合 |

> [!TIP] 实务要点
> - 田口方法的核心：用最少的实验获得最多的信息
> - 正交阵列大幅降低实验成本
> - 品质损失函数统一了准确度和精密度的考量
> - 稳健设计的目标：让产品对噪音不敏感，而非消除噪音

## Block 2 例题 Examples

Lecture 7 的交叉阵列计算题和后半部分选择题已经集中整理到 [Block 2 例题](<Block 2 Examples.md#lecture-7-robust-manufacturing-design>)。
