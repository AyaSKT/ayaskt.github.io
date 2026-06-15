---
aside: false
outline: false
---

# Block 3 Mindmap

<LyricCard
  title="A Turtle's Heart"
  artist="Mili"
  lang="en"
  netease-url="https://music.163.com/#/song?id=29418286"
  album-cover="Mindmap.attachments/1781424506867.JPG"
>
<LyricLine
  original="Life goes around and round"
  translation="生命的年轮转了一圈又一圈"
/>
<LyricLine
  original="I've stumbled and stopped moving on"
  translation="我却依然蹒跚徘徊，停滞不前"
/>
</LyricCard>

## Lecture 9

```mindmap

# 工程经济学 Engineering Economics

## 性质

- 准数学方法 Quasi-mathematical techniques
- 比较成本，收益，时间和风险
- 决策对象是备选方案 Alternatives
- 技术选择会转化为现金流和 P&L 影响
- 关键问题：相同假设下哪个方案经济结果最好

## 常见工程经济变量

- 初始成本 Initial Cost
- 利率 / 回报率 Interest Rate / Rate of Return
- 经济寿命 Economic Life
- 年运营成本 Annual Operating Cost
- 残值 Salvage Value

# 财务报表 Financial Records

## 三大报表

- Balance Sheet 资产负债表 > 某一日期的资产，负债，权益
- Cash Flow Statement 现金流量表 > 某一期间现金来源和去向
- Profit & Loss / Income Statement 损益表 > 某一期间销售，成本，费用，利润或亏损

## 法定账目 Statutory Accounts

- Balance Sheet
- Profit and Loss Account
- Notes about the Accounts
- Director's Report
- 真实公允视图 True and Fair View

# 现金流 Cash Flow

## 性质

- 实际收到和付出的现金
- 分为 operating / investing / financing activities
- 现金流不等于利润
- Over-trading 的核心风险是现金流时间错配

## 现金流入 Cash Inflows

- 销售收款
- 出售资产或借款
- 所有者投资

## 现金流出 Cash Outflows

- 运营费用
- 扩张运营
- 偿还贷款
- 投资者回报

# 损益表 P&L / Income Statement

## 基本结构

- Sales 销售收入
- Cost of Sales 销售成本
- Gross Profit 毛利润
- Other Expenses 其他费用
- EBITDA
- ITDA
- Net Income 净收入

## 核心公式

- $\text{Gross Profit} = \text{Sales} - \text{Cost of Sales}$
- $\text{EBITDA} = \text{Gross Profit} - \text{Other Expenses}$
- $\text{Net Income} = \text{EBITDA} - \text{ITDA}$

## EBITDA

- Earnings
- Interest
- Taxes
- Depreciation
- Amortization
- 近似观察运营赚钱能力

## 工程影响点

- BOM 成本
- 制造成本
- 功能溢价
- 资本设备折旧
- 成本收益分析 Cost-Benefit Analysis

```


## Lecture 10

```mindmap

# 自制或外购 Make-or-Buy

## 性质

- 比较内部生产和外部采购
- 对象可以是 component / service
- 重点看会随方案改变的成本和收益
- 隐性成本 / 隐性收益需要另行检查

## 常见触发原因

- 供应商交付失败
- 聚焦核心业务 Core Business
- 获取外部技能和技术
- 需求弹性 Demand Flexibility
- 降低成本

# 租赁与购买 Lease or Buy

## 方法

- 写出各方案成本函数
- 令成本相等，求临界点
- 临界点左侧 / 右侧分别判断

## 典型形式

- Lease: $C_L = 150d$
- Buy: $C_B = 1000 + 50d$
- 相等点：$150d = 1000 + 50d$
- $d = 10$
- $d < 10$ 倾向租赁
- $d > 10$ 倾向购买

# 相关成本 Relevant Cost

## 判别

- 会随方案改变而改变
- 所有方案相同的成本通常不相关
- 已发生且不可改变的成本可视为 sunk / unchanged
- 无形收益 Intangible Benefit 不能完全忽略

## 决策成本习惯

- $\Delta C = C_A - C_B$
- $\text{Decision cost} = \text{Costs that change} - \text{Benefits that change}$

# 增量成本 Incremental Cost

## 自制成本关注

- Direct Materials
- Direct Labour
- Incremental Overhead
- Avoidable Fixed Cost

## 不应直接使用

- Allocated Overhead Rate
- 不可避免固定制造费用
- 与所有方案无关的分摊成本

# 机会成本 Opportunity Cost

## 性质

- 某项资源用于当前方案时，放弃的替代用途价值
- 会改变 make-or-buy 结论
- 设施出租收入，闲置产能，技术能力都可能形成机会成本

## Exitel 判断口径

- 无替代用途：只比较可避免变动成本与外部报价
- 有替代用途：加入出租收入或替代收益
- 真问题：资源的最佳用途是什么

# Make / Partnership / Buy

## 控制需求

- Strong Control > Make
- Moderate Control > Partnership
- Weak Control > Buy

## Make 优势

- 成本可能更低
- 品质控制更强
- 产品特性更独特
- 时间管理更直接
- 专有信息留在公司内部

## 外购 / 外包风险

- 供应商议价能力
- 买方技术能力不足
- 交易数量和复杂度高
- Hidden Costs / Hidden Benefits 缺失

```


## Lecture 11

```mindmap

# 盈亏平衡 Break-Even Analysis

## 基本术语

- Selling Price $SP$
- Variable Cost per Unit $VC$
- Fixed Cost $F$
- Quantity $Q$
- Revenue $R$
- Total Cost $TC$
- Contribution per Unit $= SP - VC$

## 核心性质

- Break-even Point: $TC = R$
- 无利润，无亏损
- 右侧利润区，左侧亏损区
- 本质是固定成本由单位贡献覆盖

## 公式法 Formula Method

- $TC = F + VC \cdot Q$
- $R = SP \cdot Q$
- $Q_{BE} = \frac{F}{SP - VC}$
- $\text{Break-even output} = \frac{\text{Fixed Cost}}{\text{Contribution per unit}}$

## 目标利润 Target Profit

- $Q = \frac{F + \text{Target Profit}}{SP - VC}$

## 盈亏平衡收入 Break-Even Revenue

- $\text{Break-even Revenue} = \frac{\text{Fixed Costs}}{1 - (VC / SP)}$
- 常用于 service business
- Billable hours = Break-even revenue / hourly price

# 表格法与图像法

## 表格法

- 固定成本列
- 变动成本列
- 总成本列
- 收入列
- Profit / Loss 列
- 找 Profit / Loss = 0 的产量

## 图像法

- Fixed Costs > 水平线
- Total Costs > 从固定成本起点出发，斜率为 $VC$
- Sales Revenue > 从 0 出发，斜率为 $SP$
- 交点是盈亏平衡点

# 安全边际 Margin of Safety

## 公式

- $\text{Margin of Safety} = Q_{\text{actual}} - Q_{BE}$
- $\text{Margin of Safety Revenue} = R_{\text{actual}} - R_{BE}$

## 判别

- Positive > 当前销售高于盈亏平衡
- Zero > 刚好盈亏平衡
- Negative > 当前销售低于盈亏平衡

# 决策与敏感性

## 管理杠杆

- 提价 > 收入线斜率增加，但销量可能下降
- 降低单位变动成本 > 总成本线斜率下降
- 更换地点或设备 > 固定成本和变动成本组合变化

## 硬假设 / 局限

- 成本和收入近似直线
- 变动成本按产量等比例变化
- 生产多少卖多少
- 固定成本在区间内不跳变
- 半变动成本会削弱模型精度

```


## Lecture 12

```mindmap

# 外包 Outsourcing

## 性质

- 战略性使用外部资源
- 承接过去由内部员工和资源处理的活动
- 不只看报价
- 真实成本包含接口，管理，知识流失和供应商依赖

## 常见目标

- Scalable
- Secure
- Efficient
- 改善服务水平
- 降低成本

## 主要原因

- Reduce Costs
- Focus on Core
- Improve Quality
- Increase Speed to Market
- Foster Innovation
- Conserve Capital

# 传统角色与现代角色

## Traditional Role

- Reduction and control of costs
- Avoid large capital investment costs
- Insufficient resources available

## Modern Role

- Focus on core competencies
- Keep up with cutting-edge technology
- Create value for organization and customers
- Build partnerships

# PwC 外包判断模型

## 活动类型

- Strategic > Not Outsourced
- Non-strategic > Outsource
- Grey Area > Further Analysis
- In-house if possible > 保留内部

## 判断重点

- 是否决定长期竞争力
- 是否属于核心能力
- 外部伙伴是否提供能力优势
- 风险是否可被合同和治理机制控制

# 外包实施要素

## Program Initiation

- Critical / Non-critical activities
- Candidate activities
- Business case

## Operations

- Service Level Agreement (SLA)
- 沟通机制
- 服务转移
- 管理流程

## Contract Agreement

- 服务范围
- 价格和调整机制
- 服务水平
- 数据安全和保密
- 退出机制
- 供应商绩效评价

# 外包风险

## 风险清单

- Loss of Control
- Increased Cash Outflow
- Confidentiality and Security
- Supplier Selection
- Dependence on Provider
- Loss of Staff / Morale Problems
- Time Consuming
- Provider does not understand business
- Slow response to strategy changes

# In-House vs Outsource 成本比较

## 内部执行总成本

- $C_{\text{in-house}}$
- Activity costs including labour and overhead
- Raw materials including shipping, storage, handling
- Cost of invested capital
- Impact on costs and revenue

## 外包总成本

- $C_{\text{outsource}}$
- Proposal price
- Future pricing adjustments
- One-time outsourcing costs
- Ongoing outsourcing costs

## 决策式

- $\Delta C = C_{\text{outsource}} - C_{\text{in-house}}$
- $\Delta C < 0$ > 外包财务成本更低
- $\Delta C > 0$ > 内部执行财务成本更低
- 战略能力和风险单独判断

# 适源配置 Rightsourcing

## 性质

- 选择内部执行，外包，或混合伙伴关系
- 根据客户需求，战略计划，核心能力配置来源
- 不是 outsource everything

## 判断句

- $\text{Outsource only when it improves cost, capability, or strategic focus after full-cost analysis.}$

```


## Lecture 13

```mindmap

# 贴现现金流 Discounted Cash Flow

## 成本 / 价格 / 利润

- Cost > 生产或提供服务所需花费
- Price > 客户愿意支付的金额
- Profit > Price 与 Cost 的差额
- $\text{Price} = \text{Cost} + \text{Profit}$

## 贴现 Discounting 性质

- 把未来付款换算为今天等价值
- 今天的现金通常比未来现金更有价值
- 原因：通胀，货币贬值，风险，机会成本，确定性偏好
- 不同时间点现金流必须统一到同一时间点比较

## 现值 / 未来值

- $F = P(1 + r)^n$
- $P = \frac{F}{(1 + r)^n}$
- $PV = \sum_{i=1}^{n}\frac{V_i}{(1 + r)^i}$
- $V_i$ 带符号：收入为正，支出为负

## 净现值 NPV

- $NPV = PV_b - PV_c$
- $NPV > 0$ > 收益现值超过成本现值
- $NPV = 0$ > 刚好达到折现率要求
- $NPV < 0$ > 在该折现率下不经济

## B/C Ratio 与 IRR

- $B/C = \frac{PV_b}{PV_c}$
- $B/C > 1$ > 收益现值大于成本现值
- $B/C < 1$ > 项目不经济
- IRR > 使项目整体 $NPV = 0$ 的折现率
- $\sum_{i=0}^{n}\frac{V_i}{(1 + r)^i} = 0$

# 现金流图 Cash Flow Diagrams

## 图形规则

- Up Arrow > 收入 / 收益
- Down Arrow > 付款 / 成本
- Horizontal Line > 时间
- 不规则现金流逐笔折现后相加

## 工程项目现金流

- Initial Expense
- Operations and Maintenance (O&M)
- Overhaul
- Salvage Cost
- Salvage Value Income

## 经济等价 Economic Equivalence

- $\text{Equivalent cash flows depend on } r$
- 没有利率不能直接比较不同时间分布的现金流

## 等额支付序列 Equal Payment Series

- $F = A + A(1+i) + A(1+i)^2 + \dots + A(1+i)^{N-1}$
- $F = A\left[\frac{(1+i)^N - 1}{i}\right]$

# Fab / 产能经济性方法

## 单位良品资本成本

- $\text{Gross die per wafer} \approx \frac{70650}{\text{Die area}}$
- $\text{Good die} = \text{Gross die} \times \text{Yield}$
- $\text{CapEx per wafer} = \frac{\text{Fab CapEx}}{\text{Payback wafers}}$
- $\text{CapEx per good die} = \frac{\text{CapEx per wafer}}{\text{Good die per wafer}}$

## 方法意识

- 相关成本可能由 CapEx 主导
- 可变成本近似相同时，产出提升会改变结论
- 经济结论依赖假设

# CapEx / OpEx

## CapEx 性质

- 长期实物资产的购买，升级或维护支出
- Useful life > 1 year 通常倾向 CapEx
- 进入 Balance Sheet 作为 Asset
- 通过 Depreciation 逐年影响 P&L

## CapEx 例子

- Land
- Buildings
- Vehicles
- Factory machinery and production equipment
- Laboratory equipment
- Large IT systems

## OpEx 性质

- 日常经营过程中发生的费用
- 当期消耗，当期进入 P&L
- 源材料口径不含 CoGS, taxes, depreciation, interest

## OpEx 例子

- Power / Heat / Light
- Rent
- Insurance
- Administrative Salaries
- Office Expenses

## 折旧方法

- $\text{Annual depreciation charge} = \frac{\text{Capital cost}}{\text{Useful life}}$

# 总拥有成本 TCO

## 性质

- 资产寿命内拥有并使用资产的总成本
- 包含购买，安装，运行，维护，停用和处置
- 常用于关键或昂贵资本设备
- 服务 make-or-buy 和长期供应方案比较

## 显性成本

- Purchase Cost
- Installation Cost
- Labour Costs
- Utility Cost
- Consumables Cost
- Maintenance
- Calibration
- Repair

## 隐性成本

- Pre-purchase Analysis
- Tendering Process
- Facility Preparation
- Building / Floor Space
- Training
- Process Modification
- Decommission
- Removal
- Re-instatement
- Disposal

## 现值口径

- $PV_i = \frac{V_i}{(1 + r)^i}$
- $TCO_{PV} = \text{Purchase Price} + PV(\text{OpEx and lifecycle costs}) - PV(\text{Resale Value})$
- $\text{TCO} = \text{CapEx} + \text{PV(OpEx and lifecycle costs)}$

# 三大报表 Revisit

## Balance Sheet

- 展示某一具体日期的 assets, liabilities, equity
- $\text{Assets} = \text{Liabilities} + \text{Equity}$
- Assets 按 liquidity 排列
- Liabilities 按到期时间排列

## Income Statement

- 展示特定期间 revenue, expenses, profit
- $\text{Revenue} = \text{Price} \times \text{Units Sold}$
- $\text{Gross Profit} = \text{Revenue} - \text{COGS}$
- $\text{Operating Income} = \text{Gross Profit} - \text{Operating Expenses}$
- $\text{Net Income} = \text{Pre-Tax Income} - \text{Income Taxes}$
- $\text{EPS} = \frac{\text{Net Income}}{\text{Shares Outstanding}}$

## Cash Flow Statement

- Operating Activities
- Investing Activities
- Financing Activities
- $\text{Cash at end} = \text{Cash at start} + CFO + CFI + CFF$

## CapEx / OpEx 报表位置

- CapEx > Balance Sheet asset + depreciation into P&L
- OpEx > Income Statement expense
- CapEx 也会出现在 Cash Flow Statement 的 investing activities

```
