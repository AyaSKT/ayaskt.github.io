# Lec. 8 Six-Sigma & Process Capability

**穿越流云罅隙，阳光闪烁夺目。**

![alt text](<Lecture 8.attachments/1779870024146.jpg>)

## Block 2 Part 4 Contents

- [Block 2 Part 4 Contents](#block-2-part-4-contents)
- [Lec. 8 - Ses. 1 六西格玛 Six-Sigma](#lec-8---ses-1-六西格玛-six-sigma)
  - [8-1-1 什么是 Sigma / Six-Sigma What is Sigma / Six-Sigma](#8-1-1-什么是-sigma--six-sigma-what-is-sigma--six-sigma)
  - [8-1-2 Sigma 水平 Sigma Levels](#8-1-2-sigma-水平-sigma-levels)
  - [8-1-3 应用领域 Field of Application](#8-1-3-应用领域-field-of-application)
  - [8-1-4 低质量成本 Cost of Poor Quality](#8-1-4-低质量成本-cost-of-poor-quality)
  - [8-1-5 质量关键要素 Critical-to-Quality (CTQ)](#8-1-5-质量关键要素-critical-to-quality-ctq)
  - [8-1-6 为什么选择 Six Sigma Why Six Sigma](#8-1-6-为什么选择-six-sigma-why-six-sigma)
  - [8-1-7 DMAIC 模型 DMAIC Model](#8-1-7-dmaic-模型-dmaic-model)
  - [8-1-8 Six Sigma 工具 Tools for Six Sigma](#8-1-8-six-sigma-工具-tools-for-six-sigma)
  - [8-1-9 Six Sigma 关键角色 Key Roles for Six Sigma](#8-1-9-six-sigma-关键角色-key-roles-for-six-sigma)
- [Lec. 8 - Ses. 2 过程能力 Process Capability](#lec-8---ses-2-过程能力-process-capability)
  - [8-2-1 过程能力概论 Process Capability Overview](#8-2-1-过程能力概论-process-capability-overview)
  - [8-2-2 过程能力指数 Cp Process Capability Index Cp](#8-2-2-过程能力指数-cp-process-capability-index-cp)
  - [8-2-3 过程能力指数 Cpk Process Capability Index Cpk](#8-2-3-过程能力指数-cpk-process-capability-index-cpk)
  - [8-2-4 计算要求 Calculation Requirements](#8-2-4-计算要求-calculation-requirements)
  - [8-2-5 Cpk 风险评估 Risk Assessment for Cpk](#8-2-5-cpk-风险评估-risk-assessment-for-cpk)
- [Block 2 例题 Examples](#block-2-例题-examples)



## Lec. 8 - Ses. 1 六西格玛 Six-Sigma

### 8-1-1 什么是 Sigma / Six-Sigma What is Sigma / Six-Sigma

:::definition Sigma (标准差)
统计学中用来表示**标准差 Standard Deviation** 的术语，衡量数据或制程的变异程度。
**A term used in statistics to represent standard deviation, an indicator of the degree of variation in a set of a process.**
:::

:::definition Six-Sigma (六标准差)
以缺陷数量来衡量制程表现的统计概念。在六标准差水准下，每百万次机会中仅有 3.4 个缺陷 (DPMO)。它既是方法论，也是品质的象征。目标：尽可能接近完美 (as perfect as practically possible)。
**A statistical concept that measures a process in terms of defects – at the six-sigma level, there are 3.4 defects per million opportunities (DPMO). A methodology and a symbol of quality.**
:::

> [!IMPORTANT] 核心目标
> 将缺陷率降至 **3.4 DPMO**，即近乎零缺陷。

---

### 8-1-2 Sigma 水平 Sigma Levels

![Sigma 水平表](<Lecture 8.attachments/lec8_07_sigma_levels.jpg>)

不同 Sigma 水准对应的缺陷率 (DPMO)：

| Sigma 水准 | DPMO | 良率 (Yield) |
|:---:|:---:|:---:|
| 1σ | 691,462 | 30.85% |
| 2σ | 308,538 | 69.15% |
| 3σ | 66,807 | 93.32% |
| 4σ | 6,210 | 99.38% |
| 5σ | 233 | 99.977% |
| 6σ | 3.4 | 99.99966% |

> [!NOTE] 提升幅度
> 从 3σ 到 6σ，缺陷率从 ~66,800 降到 3.4，改善超过 **19,000 倍**。

---

### 8-1-3 应用领域 Field of Application

Six-Sigma 不只用于制造业，应用范围很广：

| 领域 | 说明 |
|:---:|:---:|
| 服务业 (Service) | 客户服务流程改善 |
| 设计 (Design) | 产品设计优化 |
| 品质部门 (Quality Dept.) | 品质管理系统提升 |
| 资讯科技 (IT) | 系统可靠性和效率 |
| 管理 (Management) | 组织流程改善 |
| 行政 (Administration) | 行政效率提升 |
| 采购 (Purchase) | 供应商管理与采购流程 |
| 生产 (Production) | 制程能力提升 |

---

### 8-1-4 低质量成本 Cost of Poor Quality

:::definition 低品质成本 COPQ (Cost of Poor Quality)
因品质不良产生的所有额外成本，包括直接和间接损失。
**All additional costs incurred due to quality issues, including direct and indirect losses.**
:::

低品质成本的主要组成：

- **报废 (Scrap)**：无法修复的不良品造成的材料和人工损失
- **重工 (Rework)**：修复不良品的人力和时间
- **过长周期 (Excessive cycle times)**：品质问题导致的生产延误
- **客户流失 (Business lost)**：不满意导致的业务损失
- **机会损失 (Opportunities lost)**：因品质问题错失的市场机会

> [!TIP] 冰山效应
> 可见成本（报废、重工）只是冰山一角。隐藏成本（客户流失、商誉损失）往往远大于可见部分。

---

### 8-1-5 质量关键要素 Critical-to-Quality (CTQ)

:::definition CTQ (Critical-to-Quality)
制程中显著影响输出品质的元素。识别 CTQ 能找到改善方向，从而降低成本并提升品质。
**Elements of a process that significantly affect the output of that process. Identifying these elements is figuring out how to make improvements that can dramatically reduce costs and enhance quality.**
:::

识别 CTQ 的思路：从客户需求出发，将模糊需求转化为可量测的指标，找出对品质影响最大的制程参数，再设定规格界限。

---

### 8-1-6 为什么选择 Six Sigma Why Six Sigma

Six Sigma 的六大核心收益：

- **Money**：降低成本、提高利润
- **Quality**：减少缺陷，提升产品一致性
- **Customer Satisfaction**：满足甚至超越客户期望
- **Competitive Advantage**：在市场上建立品质领先优势
- **Growth**：带动业务扩展和市场份额增长
- **Employee Pride**：员工因参与改善项目获得成就感

业界实际财务效益：

| 公司 | 节省金额 | 时间 |
|:---:|:---:|:---:|
| GE | > $2B 净收入增加 | 1999 年 |
| Motorola | > $15B | 10 年 |
| AlliedSignal | > $1.5B | — |

> [!IMPORTANT] 投资回报
> Six-Sigma 是能带来**可量化财务回报**的投资，不只是品质管理方法。

实施 Six Sigma 的企业（部分）：

3M、Air Canada、Amazon、Bank of America、Boeing、Caterpillar、Corning、Dell、DHL、Eastman Kodak、Ford、General Electric、GlaxoSmithKline、HSBC、LG Group、Motorola、Samsung、Siemens、McGraw-Hill、US Air Force / Navy / Marine Corps、Vodafone、Whirlpool、Xerox

---

### 8-1-7 DMAIC 模型 DMAIC Model

![DMAIC 模型](<Lecture 8.attachments/lec8_14_dmaic.jpg>)

:::definition DMAIC
Six-Sigma 的核心改进方法论，由五个阶段组成：**Define（定义）、Measure（量测）、Analyze（分析）、Improve（改善）、Control（控制）**。
**The core improvement methodology of Six Sigma consisting of five phases: Define, Measure, Analyze, Improve, Control.**
:::

| 阶段 | 说明 |
|:---:|:---:|
| **D** - Define (定义) | 定义专案目标和客户交付物 |
| **M** - Measure (量测) | 量测制程当前绩效 |
| **A** - Analyze (分析) | 分析缺陷的根本原因 |
| **I** - Improve (改善) | 消除缺陷，改善制程 |
| **C** - Control (控制) | 确保改善可持续 |

> [!NOTE] DMAIC vs PDCA
> DMAIC 是 PDCA 的扩展版本，更结构化且数据驱动，适用于复杂品质改善专案。

---

### 8-1-8 Six Sigma 工具 Tools for Six Sigma

![Six Sigma 工具](<Lecture 8.attachments/lec8_17_tools_six_sigma.jpg>)

DMAIC 各阶段常用工具：

| 工具 (Tool) | 用途 (Purpose) | 适用阶段 |
|:---:|:---:|:---:|
| 5 Whys (五个为什么) | 追溯根本原因 | Analyze |
| PDCA | 持续改善循环 | 全阶段 |
| 防错 (Poka-Yoke) | 防止人为错误 | Improve, Control |
| SPC (统计过程控制) | 监控制程稳定性 | Measure, Control |
| FMEA (失效模式分析) | 风险评估 | Analyze, Improve |
| 回归分析 (Regression) | 因子关系分析 | Analyze |

---

#### Brainstorming 四条规则

1. **Don't Evaluate**：不评价任何想法
2. **Quantity Needed**：追求数量，不求质量
3. **Keep Building**：在别人的想法上继续发展
4. **Wild Ideas Wanted**：鼓励天马行空的想法

没有其他规则！

---

#### 5 Whys 五个为什么

:::definition 5 Whys
通过连续追问"为什么"来追溯**根本原因 Root Cause** 的方法。从问题表象出发，逐层深入，直到找到可解决的根源。
**A method of tracing root cause by repeatedly asking "Why" from the surface problem down to the actionable root.**
:::

**流程**：Define Problem → Why? → Why? → Why? → Why? → Why? → Solution → Action Plan

**案例：机器故障**

1. Why did the machine stop working? → The motor burned out.
2. Why did the motor burn out? → The motor overheated.
3. Why did the motor overheat? → The cooling fan was not functioning.
4. Why was the cooling fan not functioning? → The fan belt was broken.
5. Why was the fan belt broken? → It was not replaced during the regular maintenance schedule.

**Root Cause**：Lack of proper maintenance — 风扇皮带未在定期维护中更换，最终导致机器停机。

---

#### VOC 客户之声 Voice of the Customer

:::definition VOC (Voice of the Customer)
系统性收集和分析客户反馈，以驱动产品和流程改善。
**A systematic approach to collecting and analysing customer feedback to drive product and process improvements.**
:::

客户反馈渠道：**Documents**（文档）、**Email**（邮件）、**Social Media**（社交媒体）、**Online Chat**（在线聊天）、**Telephone**（电话）、**Ratings**（评分）、**Community**（社群）。

VOC 闭环流程（8步循环）：

1. **Request** Customer Input — 收集客户输入
2. **Collect** Customer Ideas — 收集客户想法
3. **Collate** and Evaluate Ideas — 整理和评估想法
4. **Prioritise** and Shortlist Ideas — 优先排序和筛选
5. **Develop** Delivery Teams — 组建交付团队
6. **Assess** and Trial Potential Changes — 评估和试运行
7. **Implement** Changes — 实施变更
8. **Review** Changes and Adjust — 检讨和调整

流程循环往复，持续改善。

---

#### 5S 方法论

:::definition 5S
源自日本的**工作场所组织 Workplace Organisation** 方法，五个步骤均以 S 开头。
**A workplace organisation method originating from Japan, with five steps all starting with S.**
:::

| S | 含义 | 说明 |
|:---:|:---:|:---|
| **Sort** 整理 | 区分必要与非必要物品 | 移除无用物品，仅保留工作必需品 |
| **Set in Order** 整顿 | 定位放置 | 按方便取用原则，固定物品位置并标识 |
| **Shine** 清扫 | 清洁工作场所和设备 | 定期清扫，同时发现设备潜在问题 |
| **Standardize** 标准化 | 制定统一规范 | 将前三步的执行方法标准化，确保可复制 |
| **Sustain** 素养 | 持续维持 | 通过培训和检查，让 5S 成为日常工作习惯 |

---

#### PDCA 持续改善循环

:::definition PDCA
**计划-执行-检查-行动 Plan-Do-Check-Act** 循环，持续改善的基础框架。
**Plan-Do-Check-Act cycle, a foundational framework for continuous improvement.**
:::

| 阶段 | 说明 |
|:---:|:---|
| **Plan** | Define and Develop Product — 定义和开发产品 |
| **Do** | Production — 生产 |
| **Check** | Inspection — 检验 |
| **Act** | Corrective Action — 纠正措施 |

---

#### Benchmarking 标杆管理

:::definition Benchmarking
将自身产品、服务或流程与行业**最佳实践 Best Practices** 进行对比，找出差距并制定改善计划。
**Comparing one's own products, services, or processes against industry best practices to identify gaps and develop improvement plans.**
:::

标杆管理涉及多个维度：质量 (Quality)、成本 (Cost)、时间 (Time)、流程 (Process)、指标 (Metrics)、方法论 (Methodology) 等。

---

#### Poka-Yoke 防错设计 Mistake Proofing

:::definition Poka-Yoke (防错)
通过设计手段**消除人为错误 Eliminate Human Error**，使错误操作在物理上不可能发生。
**Design features that make human errors physically impossible by preventing incorrect assembly or usage.**
:::

常见防错设计实例：

| 实例 | 防错原理 |
|:---:|:---|
| SIM 卡 | 缺口设计强制正确插入方向 |
| 形状匹配积木 | 不同形状只对应正确孔位 |
| 电池极性 | 正负极形状/标识防止反装 |
| 电源插头 | 插头形状防止错误插入 |
| USB 接口 | 键槽设计防止反插 |
| 线束组装 | 颜色编码连接器防止接错线 |

核心思路：将 Confusion（混乱）通过 Poka-Yoke 转化为 Clarity（明确）。

---

### 8-1-9 Six Sigma 关键角色 Key Roles for Six Sigma

组织中的角色分工：

| 角色 | 职责 |
|:---:|:---:|
| 执行领导层 (Executive Leadership) | 设定愿景、提供资源 |
| 倡导者 (Champions) | 跨部门推动、移除障碍 |
| 大黑带 (Master Black Belts) | 培训指导、制定策略 |
| 黑带 (Black Belts) | 全职领导 DMAIC 专案 |
| 绿带 (Green Belts) | 本职工作中执行专案 |

> [!TIP] 角色层级
> 从上到下：Executive Leadership → Champions → Master Black Belts → Black Belts → Green Belts。黑带通常需完成至少两个完整专案才能获得认证。


## Lec. 8 - Ses. 2 过程能力 Process Capability

### 8-2-1 过程能力概论 Process Capability Overview

![过程能力概览](<Lecture 8.attachments/lec8_26_process_capability.jpg>)

:::definition 制程能力 Process Capability
制程持续产出符合规格要求的能力。核心问题：**我能信赖这个制程吗？**
**The measure/degree to which a process can consistently produce output that meets process specifications. Question: Can I rely on this process to deliver good parts?**
:::

制程改善的双重目标：

1. **移至目标值**：减少偏移 (bias)
2. **减少变异**：缩小分布宽度

> [!IMPORTANT] 两者缺一不可
> 一个偏离目标但变异小的制程，仍然不是好制程。必须同时做到中心对齐和变异小。

> [!NOTE] Cp/Cpk 计算中的样本数据与规格参数
> | 符号 / 数值 | 来源 | 类型 |
> |---|---|---|
> | 原始测量值 | 抽样测得的一批产品数据 | 样本数据 |
> | $\mu$ / 样本均值 | 由样本算出；例题里是 $10.1\ \Omega$ | 样本数据 |
> | $\sigma$ / 标准差 | 由样本算出；例题里是 $0.3\ \Omega$ | 样本数据 |
> | Target / nominal value | 设计目标；例题里是 $10\ \Omega$ | 目标 / 规格参数 |
> | Tolerance | 设计允许误差；例题里是 $\pm 1\ \Omega$ | 目标 / 规格参数 |
> | $USL$ | 规格上限，由 target + tolerance 得到；例题里是 $11\ \Omega$ | 目标 / 规格参数 |
> | $LSL$ | 规格下限，由 target - tolerance 得到；例题里是 $9\ \Omega$ | 目标 / 规格参数 |
>
> 在 $C_p$ 中，$USL$ 和 $LSL$ 是规格参数，$\sigma$ 是样本估计出来的制程波动。在 $C_{pk}$ 中，$USL$ 和 $LSL$ 仍然是规格参数，$\mu$ 和 $\sigma$ 是样本数据估计出的制程状态。Target 本身不直接出现在公式里，但它用于生成规格限，也用于判断均值是否偏离中心。

---

### 8-2-2 过程能力指数 Cp Process Capability Index Cp

![Cp 公式](<Lecture 8.attachments/lec8_28_cp_formula.jpg>)

:::definition Cp — 潜在制程能力指数 Potential Capability Index
衡量制程的**潜在能力**，假设制程完美居中。**不考虑**偏移。
**Measures the potential capability of the process, assuming perfect centering. Does not account for process centering.**
:::

$$\boxed{C_p = \frac{USL - LSL}{6\sigma}}$$

其中：
- $USL$：规格上限 (Upper Specification Limit)
- $LSL$：规格下限 (Lower Specification Limit)
- $\sigma$：制程标准差 (Process Standard Deviation)

> [!NOTE] Cp 的含义
> - $C_p = 1$：规格宽度恰好等于 6σ
> - $C_p > 1$：有余裕
> - $C_p < 1$：无法满足规格

---

### 8-2-3 过程能力指数 Cpk Process Capability Index Cpk

![Cpk 公式](<Lecture 8.attachments/lec8_29_cpk_formula.jpg>)

:::definition Cpk — 实际制程能力指数 Actual Capability Index
衡量制程的**实际能力**，同时考虑偏移。始终 ≤ Cp。
**Measures the actual capability of the process, accounting for process centering. Always ≤ Cp.**
:::

$$\boxed{C_{pk} = \min\left[\frac{USL - \mu}{3\sigma},\; \frac{\mu - LSL}{3\sigma}\right]}$$

其中 $\mu$ 为制程平均值 (Process Mean)。

> [!IMPORTANT] Cp 与 Cpk 的关系
> - 当 $\mu$ 完美居中（$\mu = \frac{USL+LSL}{2}$）时，$C_{pk} = C_p$
> - 当 $\mu$ 偏移时，$C_{pk} < C_p$
> - $C_{pk}$ 永远不会大于 $C_p$

Cp/Cpk 五组对比：

| $C_p$ | $C_{pk}$ | 状态 | 说明 |
|:---:|:---:|:---:|:---|
| 2.0 | 2.0 | 有能力 Capable | 统计受控且有能力，在控制限内生产 |
| 0.7 | 0.7 | 无能力 Not capable | 统计受控但制程能力不足 |
| 2.0 | 1.5 | 偏移 Off-center | 潜在能力高但均值偏移 |
| 2.0 | 1.0 | 严重偏移 Severely off-center | 潜在能力高但均值严重偏移 |
| 2.0 | 0 | 能力丧失 Lost capability | 均值完全偏离目标，能力丧失 |

后三组 $C_{pk} < C_p$，说明制程均值偏移导致实际能力低于潜在能力，属于 Out of Control 状态。

---

### 8-2-4 计算要求 Calculation Requirements

使用 $C_p$ 和 $C_{pk}$ 前需满足：

| 要求 | 说明 |
|:---:|:---:|
| 样本数 | **≥ 50** 个独立数据值 |
| 常态分布 | 数据近似服从常态分布 |
| 制程稳定性 | 制程在统计控制状态下（无特殊原因变异） |

> [!TIP] 非常态数据
> 数据不服从常态分布时，可考虑 Box-Cox 转换或非参数方法。

---

### 8-2-5 Cpk 风险评估 Risk Assessment for Cpk

![Cpk 风险评估](<Lecture 8.attachments/lec8_31_risk_assessment.jpg>)

根据 $C_{pk}$ 评估制程风险：

| $C_{pk}$ 范围 | 风险等级 | 说明 |
|:---:|:---:|:---:|
| $< 1.00$ | 高风险 High risk | 制程不具能力 |
| $1.00 \sim 1.33$ | 中等风险 Moderate risk | 需要改善 |
| $1.33 \sim 1.67$ | 低风险 Low risk | 具备能力，仍有改善空间 |
| $\geq 1.67$ | 极低风险 Minimal risk | 高度具能力 |

> [!IMPORTANT] 目标值
> 应追求 $C_{pk} \geq 2.00$，此时制程仅使用规格宽度的 50%，缓冲充足。
> $$C_{pk} = 2.00 \Rightarrow \text{仅使用 50\% 规格宽度}$$

## Block 2 例题 Examples

Lecture 8 的电阻器制程能力计算题和后半部分选择题已经集中整理到 [Block 2 例题](<Block 2 Examples.md#lecture-8-six-sigma--process-capability>)。
