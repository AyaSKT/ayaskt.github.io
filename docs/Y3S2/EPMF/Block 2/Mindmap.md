---
lastUpdated: 2026-06-14T15:37:51+08:00
aside: false
outline: false
---

# Block 2 Mindmap

<LyricCard
  title="ひとりぼっち東京"
  artist="結束バンド"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/songDetail/001NU4Vv3Svc5C"
  netease-url="https://music.163.com/#/song?id=1984541377"
  album-cover="Mindmap.attachments/hitoribocchi-tokyo-cover.jpg"
  album-cover-alt="ひとりぼっち東京 专辑封面"
>
  <LyricLine
    original="ひとりぼっち東京(とうきょう)"
    translation="孤身飘荡在东京"
  />
  <LyricLine
    original="優(やさ)しくない街(まち)に降(お)りた"
    translation="来到并不温柔的城镇"
  />
  <LyricLine
    original="人(ひと)の波(なみ)に乗(の)って抜(ぬ)ける駅(えき)の改札(かいさつ)"
    translation="乘着熙熙攘攘的人潮从车站闸机挤身而过"
  />
</LyricCard>


## Lecture 5

```mindmap

# DFM

## 考虑的因素 Considerations 

- 产品的功能 Function
- 产品的使用方式 How it will be used
- 产品的材料 What it will be made of
- 消费者的使用寿命 How long consumers will use it
- 是否需要保修 Warranty
- 制造成本 Cost to manufacture
- 能否实现盈利 Profit


## DFM 六项原则

- 简洁性 Simplicity
- 标准化 Standardization
- 公差设计 Tolerance
- 材料选择 Material Selection
- 自动化 Automation
- 工艺集成 Process Integration

## DFM 益处

- 降低制造成本 Lower Manufacturing Costs
- 提高生产效率 Improved Production Efficiency
- 提升产品质量 Improved Product Quality
- 简化产品开发流程 Streamlined Product Development Process
- 优化供应链管理 Better Supply Chain Management
- 增强竞争力 Enhanced Competitiveness
- 符合法规要求 Compliance with Regulations

## DFM 相关责任方

- 设计工程师 Design Engineers
- 制造工程师 Manufacturing Engineers
- 质量控制 Quality Control
- 采购部门 Procurement
- 管理层 Management

## DFM 实施周期

- 产品复杂度 Product Complexity
- 组织规模 Organization Size
- 可用资源 Available Resources
- DFM 不是一次性的活动，而是一个贯穿整个产品生命周期的持续过程。

## 与 DFM 联动的工具/方法

- 工艺能力 Process Capability
- 六西格玛 6-Sigma
- 可持续性设计 Design for Sustainability
- 稳健产品设计 Robust Product Design
- 质量成本 Cost of Quality
- 质量控制 Quality Control


# DFS

## 可持续性三大支柱

- 经济支柱 Economic Pillar
- 环境支柱 Environmental Pillar
- 社会支柱 Social Pillar


## 可持续性四大原则 The 4Rs

- 减量化 Reduce
- 再利用 Reuse
- 维修 Repair
- 回收 Recycle

## DFS 核心目标

- 使用更少的资源 Use Fewer Resources
- 优先选择环保替代方案 Prefer Eco-Friendly Alternatives

## DFS 七大原则

- 去物质化 Dematerialization
- 模块化设计 Modular Design
- 优先使用可再生能源 Prefer Renewable Energy
- 向产品-服务系统迁移 Migration to Product-service System
- 耐久性设计 Design for Longevity
- 限制或消除远距离外包 Limit or Eliminate Long-distance Outsourcing
- 投资仿真技术 Invest on Simulation

```

## Lecture 6

```mindmap

# 质量控制 Quality Control

## QC 与 QA 的区别

- QC 反应性过程，QA 主动性过程
- QC 识别已完成产品中的缺陷，QA 通过改善流程预防缺陷
- QC 在产品完成后交付前，QA 在开发过程中
- QC 的目标是检测和纠正缺陷，QA 的目标是防止缺陷产生
- QC 的方法是检查，测试，审查，QA 的目标是过程改进，标准制定，培训 

## 七大质量控制工具 7 QC tools

- 流程图 Flowchart 
- 检查表 Check Sheet
- 因果图 Cause-Effect Diagram
- Pareto 图 Pareto Chart
- 控制图 Control Chart
- 直方图 Histogram
- 散点图 Scatter Diagram

# 质量成本 Cost of Quality, COQ

## 质量成本曲线

- 质量改进区 
- 质量最佳区
- 质量过剩区

## COQ 四大类别

- 预防成本 Prevention Cost
- 鉴定成本 Appraisal Cost
- 内部失败成本 Internal Failure Cost
- 外部失败成本 External Failure Cost

## 可见成本与隐性成本

- 可见成本 Visible Cost：可以直接测量记录，通常占20-30%
- 隐形成本 Invisible Cost：难以测量但影响重大，通常占70-80%

```

## Lecture 7

```mindmap

# 稳健设计 Robust Design

## 目标

- 降低产品对噪音的敏感程度

## 两大工具

- 品质损失函数 Quality Loss Function 统一精确度和准确度
- 正交阵列 Orthogonal Arrays 减少因子实验次数

## 品质特性

- 望小特性 Smaller-the-better $L(y)=ky^2$
- 望目特性 Nominal-the-best $L(y) = k(y-m)^2$
- 望大特性 Larger-the-better $L(y) = k \left( \frac{1}{y^2} \right)$

## P Diagram 参数

- 信号因子 Signal Factors
- 噪声因子 Noise Factors
- 控制因子 Control Factors

## 平均质量损失

- 标准公式： $Q = \frac{1}{n}\sum_{i=1}^{n}L(y_i) = k\left[(\mu-m)^2 + \frac{n-1}{n}\sigma^2\right]$
- n 极大公式： $Q = k\left[(\mu-m)^2 + \sigma^2\right]$

# 实验设计 Design of Experiments, DOE

## 田口参数设计步骤

- Brainstorming
- Identify parameters & noise
- Construct DOE
- Perform experiments
- Analyze results

## 因子实验设计

- 全因子设计 Full Factorial Design （试验次数随着因子数呈指数增长）
- 正交阵列 Orthogonal Arrays （任意两列中水准组合恰好各出现一次，即正交）
- 交叉阵列 Corssed Arrays - Inner & Outer Arrays （同时考虑Accuracy和Precision，在噪声条件下找到最稳健的参数组合）

```

## Lecture 8

``` mindmap

# 6-Sigma

## 低质量成本 Cost of Poor Quality, COPQ

- 报废 Scrap
- 重工 Rework
- 过长周期 Excessice cycle times
- 客户流失 Business lost
- 机会损失 Opportunities lost

- （冰山效应：隐藏成本往往远大于可见部分）

## 质量关键要素 Critical-to Quality, CTQ

## 6-Sigma 六大核心收益

- Money
- QUality
- Customer Satisfaction
- Competitive Advantage
- Growth
- Employee Pride

## DMAIC 模型 6-Sigma 核心改进方法论 / 路线图

- Define
- Measure
- Analyze
- Improve
- Control

## 6-Sigma 工具

- 5 Whys - 追溯原因
- PDCA - 改善循环
- 防错 Poka-Yoke - 防呆设计
- SPC - 监控制程稳定性
- FMEA - 风险评估
- 回归分析 - 因子关系分析

-（还有一些不想写了）

# 过程能力 Process Capability

## 目标

- 减小 bias
- 减小变异

## 参数

- 潜在过程能力指数 $C_p = \frac{USL-LSL}{6 \sigma}$ 
- 过程能力指数 $C_{pk} = \min \left[ \frac{USL-\mu}{3 \sigma},\, \frac{\mu-LSL}{3 \sigma} \right]$



```







