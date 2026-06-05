# Lec. 9 Introduction to Engineering Economics

## Block 3 Part 1 Contents

- [Block 3 Part 1 Contents](#block-3-part-1-contents)
- [Lec. 9 - Ses. 1 工程经济学概览 Engineering Economics Overview](#lec-9---ses-1-工程经济学概览-engineering-economics-overview)
  - [9-1-1 工程师为什么要懂经济 Why Engineers Care](#9-1-1-工程师为什么要懂经济-why-engineers-care)
  - [9-1-2 经济决策中的备选方案 Alternatives](#9-1-2-经济决策中的备选方案-alternatives)
  - [9-1-3 公司财务报表 Company Financial Records](#9-1-3-公司财务报表-company-financial-records)
- [Lec. 9 - Ses. 2 现金流与损益表 Cash Flow and Income Statement](#lec-9---ses-2-现金流与损益表-cash-flow-and-income-statement)
  - [9-2-1 现金流 Cash Flow](#9-2-1-现金流-cash-flow)
  - [9-2-2 过度交易 Over-Trading](#9-2-2-过度交易-over-trading)
  - [9-2-3 损益表 Profit and Loss Account](#9-2-3-损益表-profit-and-loss-account)
  - [9-2-4 Gross Profit 与 EBITDA](#9-2-4-gross-profit-与-ebitda)
  - [9-2-5 Net Income 与报表用途](#9-2-5-net-income-与报表用途)



## Lec. 9 - Ses. 1 工程经济学概览 Engineering Economics Overview

### 9-1-1 工程师为什么要懂经济 Why Engineers Care

:::definition 工程经济学 Engineering Economics
一组用于比较经济方案的准数学方法。它把工程选择中的成本、收益、时间和风险写成可比较的形式。

**A collection of quasi-mathematical techniques that simplifies economic comparisons and supports rational evaluation of economic decisions.**
:::

工程师关心工程经济学，主要因为技术决策会直接影响项目财务。

- 做预算 Budgeting
- 读公司或业务单元报告
- 和 finance、sales、marketing、CEO 等管理团队沟通
- 判断某个设计、设备或制造路线是否值得投入

典型工程场景：

| 场景 | 经济问题 |
|---|---|
| 购买新制造设备 | 初始投入、维护成本、使用寿命、残值 |
| 比较制造方法 | 单位成本、产能、质量损失、现金占用 |
| 替换现有设备 | 新旧设备的现金流差异 |
| 租用或购买设备 | 使用时间达到多少时购买更划算 |
| 增加产品功能 | 额外开发成本能否换来足够售价或销量 |

---

### 9-1-2 经济决策中的备选方案 Alternatives

工程经济决策一定存在 alternative。找对可行方案，和计算方案一样关键。

常见比较变量：

| 变量 | 含义 |
|---|---|
| Initial cost 初始成本 | 购买、安装、导入所需费用 |
| Interest rate / rate of return 利率 / 回报率 | 资金的时间价值或投资要求 |
| Economic life 经济寿命 | 设备或项目能产生收益的时间 |
| Annual operating cost 年运营成本 | 维护、人工、能源、消耗品等 |
| Salvage value 残值 | 项目结束时的转售或回收价值 |

工程经济学里经常会问：

$$
\text{Which alternative gives the best economic result under the same assumptions?}
$$

。

---

### 9-1-3 公司财务报表 Company Financial Records

公司财务记录通常包括三类：

| 报表 | 中文 | 作用 |
|---|---|---|
| Balance Sheet | 资产负债表 | 某一日期公司拥有什么、欠什么、净资产是多少 |
| Cash Flow Statement | 现金流量表 | 某一期间现金从哪里来、用到哪里去 |
| Profit & Loss / Income Statement | 损益表 / 收入表 | 某一期间销售、成本、费用、利润或亏损 |

英国等地区的 statutory accounts 通常至少包括：

- Balance sheet
- Profit and loss account
- Notes about the accounts
- Director's report

报表需要给出 **true and fair view**。也就是公司年度申报不能故意歪曲财务状态，否则就是 fraud。



## Lec. 9 - Ses. 2 现金流与损益表 Cash Flow and Income Statement

### 9-2-1 现金流 Cash Flow

:::definition 现金流 Cash Flow
公司在一定期间内实际收到和付出的现金。现金流量表记录 operating、investing、financing activities 中现金的来源和去向。

**Cash flow reports the cash collected and paid out by a company in operating, investing and financing activities over a period of time.**
:::

**现金流入 Cash inflows：**

- 销售商品或服务收到的现金
- 出售资产或借款收到的现金
- 所有者投资带来的现金

**现金流出 Cash outflows：**

- 支付运营费用
- 扩张运营、偿还贷款
- 向所有者支付投资回报

现金流和利润不是同一件事。利润可以记在账上，但账款没收回来时，现金仍然可能不够。

---

### 9-2-2 过度交易 Over-Trading

:::definition 过度交易 Over-Trading
订单和销售增长过快，导致公司需要提前采购材料、支付人工或扩张产能，但客户回款晚于现金支出，最终现金断裂。
:::

小公司尤其容易被 over-trading 打穿现金流。订单太少会死，订单太多但回款慢也会死，挺现实。

一个典型结构：

| 时间点 | 现金影响 |
|---|---|
| Month 0 | 接到订单，需要订零部件 |
| Month 1 | 供应商要求付款，现金流出 |
| Month 2 | 发货或继续生产 |
| Month 3+ | 客户 30/60 天后付款，现金流入 |

若供应商 30 天收款、客户 60 天付款，中间的现金缺口会明显变大。

---

### 9-2-3 损益表 Profit and Loss Account

:::definition 损益表 Profit and Loss Account / Income Statement
汇总一个财务期间内的销售收入和费用，显示公司在该期间产生了 profit 还是 loss。
:::

损益表对工程师很有用，因为项目、产品、部门的表现通常会用类似格式管理。

基本结构：

| 项目 | 计算 |
|---|---|
| Sales | 销售收入 |
| Cost of Sales | 制造成本、采购成本、直接人工等 |
| Gross Profit | Sales - Cost of Sales |
| Other Expenses | 工资、租金、广告等非直接制造费用 |
| EBITDA | Gross Profit - Other Expenses |
| ITDA | Interest, Taxes, Depreciation, Amortization |
| Net Income | EBITDA - ITDA |

写成公式：

$$
\text{Gross Profit} = \text{Sales} - \text{Cost of Sales}
$$

$$
\text{EBITDA} = \text{Gross Profit} - \text{Other Expenses}
$$

$$
\text{Net Income} = \text{EBITDA} - \text{ITDA}
$$

。

---

### 9-2-4 Gross Profit 与 EBITDA

:::definition 毛利润 Gross Profit
主业务收入减去为产生这些收入直接发生的成本。

**Gross Profit = Sales - Cost of Goods Sold / Cost of Sales.**
:::

小商店里 gross profit 比较好判定：售价减进货成本。制造业和服务业里，哪些人工算 Cost of Sales，哪些算 Other Expenses，可能由公司会计政策决定。

:::definition EBITDA
**Earnings Before Interest, Taxes, Depreciation and Amortization**。它常用来观察公司运营层面的赚钱能力，也叫 operating profit 的近似指标。
:::

EBITDA 的几个部分：

| 项目 | 含义 | 工程影响 |
|---|---|---|
| Earnings | 收益 / 利润 | 增加功能、降低 BOM、降低制造成本 |
| Interest | 借款利息 | 多由财务部门处理 |
| Taxes | 税 | 多由财务和会计处理 |
| Depreciation | 有形资产折旧 | 减少或优化 capital equipment 投入 |
| Amortization | 无形资产或一次性费用摊销 | 多是会计处理 |

Depreciation 的逻辑：设备一次买入，但在有用寿命内逐年分摊成本。比如一台电脑按 3 年写 off，每年在损益表里扣三分之一成本。

---

### 9-2-5 Net Income 与报表用途

:::definition 净收入 Net Income
公司扣除所有相关成本、费用、利息、税、折旧和摊销后的真实利润或亏损。
:::

例：Golden Win Double Dragon International。

| 项目 | 金额 | 占 Sales |
|---|---:|---:|
| Sales | 11,330 | 100% |
| Cost of Sales | 7,200 | 64% |
| Gross Profit | 4,130 | 36% |
| Other Expenses | 1,200 | 11% |
| EBITDA | 2,930 | 26% |
| ITDA | 800 | 7% |
| Net Income | 2,130 | 19% |

损益表用途：

- 法律要求，tax 基于 profit
- 汇总年度交易
- 展示企业财务健康状态
- 供 managers、shareholders、banks、financiers 阅读
- 支撑工程项目的 cost-benefit analysis

Lecture 9 的记忆线索：

$$
\text{Engineering decision} \rightarrow \text{Cash flow} \rightarrow \text{P\&L impact}
$$

。
