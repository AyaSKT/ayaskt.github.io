---
lastUpdated: 2026-06-13T16:56:33+08:00
---

# Lec. 10 Engineering Economics (Make or Buy)

**In dreams I'm with you.**  
**让我们在梦中重逢。**

![alt text](<Lecture 10.attachments/1781256840867.JPG>)

## Block 3 Part 2 Contents

- [Block 3 Part 2 Contents](#block-3-part-2-contents)
- [Lec. 10 - Ses. 1 自制或外购决策 Make-or-Buy Decisions](#lec-10---ses-1-自制或外购决策-make-or-buy-decisions)
  - [10-1-1 自制或外购 Make-or-Buy 定义](#10-1-1-自制或外购-make-or-buy-定义)
  - [10-1-2 租赁与购买 Lease or Buy](#10-1-2-租赁与购买-lease-or-buy)
  - [10-1-3 相关成本 Relevant Costs](#10-1-3-相关成本-relevant-costs)
- [Lec. 10 - Ses. 2 Exitel 芯片案例 Exitel Chip Case](#lec-10---ses-2-exitel-芯片案例-exitel-chip-case)
  - [10-2-1 增量成本 Incremental Cost](#10-2-1-增量成本-incremental-cost)
  - [10-2-2 无替代用途 No Alternative Use](#10-2-2-无替代用途-no-alternative-use)
  - [10-2-3 机会成本改变决策 Opportunity Cost Changes the Decision](#10-2-3-机会成本改变决策-opportunity-cost-changes-the-decision)
  - [10-2-4 自制 / 合作 / 外购 Make / Partnership / Buy](#10-2-4-自制--合作--外购-make--partnership--buy)



## Lec. 10 - Ses. 1 自制或外购决策 Make-or-Buy Decisions

### 10-1-1 自制或外购 Make-or-Buy 定义

:::definition 自制或外购决策 Make-or-Buy Decision
比较内部生产某个组件 component / 服务 service 的成本，和从外部供应商采购该组件 component / 服务 service 的成本。

**Make-or-buy decisions compare the cost of producing a component or service internally against the cost of purchasing it from an external supplier.**
:::

常见原因：

- 现有供应商交付失败或服务差
- 组织想集中精力做核心业务 core business
- 获取外部技能和技术
- 提供需求弹性 demand flexibility
- 市场或内部要求降低成本

---

### 10-1-2 租赁与购买 Lease or Buy

例：某项目设备可以租赁 lease，也可以买。

- 租赁 Lease: $\$150 / \text{day}$
- 购买 Purchase: 初始 $\$1000$，再加 $\$50 / \text{day}$

设使用天数为 $d$。令两种成本相等：

$$
150d = 1000 + 50d
$$

$$
100d = 1000
$$

$$
d = 10 \text{ days}
$$

判断：

| 使用天数 | 较优方案 |
|---:|---|
| $d < 10$ | 租赁 Lease |
| $d = 10$ | 两者成本相同 |
| $d > 10$ | 购买 Purchase |

如果需要 12 天，从这个计算看，购买更经济。

不过这个分析只看显性现金支出。运输、维护、残值、闲置风险、交付时间等隐性成本 hidden costs 可能会改变判断。

---

### 10-1-3 相关成本 Relevant Costs

:::definition 相关成本 Relevant Cost
会随备选方案改变而改变的成本。若某项成本在所有方案中相同，通常不影响当前决策。
:::

Florida Spring Break 的 drive / fly 案例：

| Cost | Drive | Fly | Relevant? |
|---|---:|---:|---|
| Motel | 640 | 640 | No |
| Eating out | 160 | 160 | No |
| Kennel | 40 | 40 | No |
| Car insurance | 100 | 100 | No, sunk / unchanged |
| Gasoline | 200 | 0 | Yes |
| Airfare / rental car | 0 | 500 | Yes |

相关成本差额：

$$
\Delta C = 500 - 200 = 300
$$

问题就变成：多花 $\$300$ 飞过去，换 Florida 多待两天，值不值。

这里已经出现无形收益 intangible benefit：时间和体验不容易直接写成美元，但不能忽略。



## Lec. 10 - Ses. 2 Exitel 芯片案例 Exitel Chip Case

### 10-2-1 增量成本 Incremental Cost

自制或外购 Make-or-buy 中，内部生产成本应关注：

1. 直接材料 Direct materials
2. 直接人工 Direct labour
3. 增量制造费用 Incremental overhead

不应直接拿分摊制造费用率 allocated overhead rate 当产品相关成本。分摊固定制造费用 allocated fixed overhead 可能买不买都存在。

---

### 10-2-2 无替代用途 No Alternative Use

Exitel 每年生产 20,000 颗芯片，单位成本如下：

| 项目 | 年成本 Annual Cost | 单位成本 Per Unit |
|---|---:|---:|
| 直接材料 Direct Material | 180,000 | 9.00 |
| 直接人工 Direct Labour | 100,000 | 5.00 |
| 变动制造费用 Variable Overhead | 20,000 | 1.00 |
| 固定制造费用 Fixed Overhead | 260,000 | 13.00 |
| 总计 Total | 560,000 | 28.00 |

外部供应商报价：

$$
\$25 / \text{chip}
$$

若固定制造费用无法避免，且设施没有其他用途，则买入只能节省变动成本 variable costs：

| 可避免成本 Avoided Cost | 单位成本 Unit Cost |
|---|---:|
| 直接材料 Direct Material | 9.00 |
| 直接人工 Direct Labour | 5.00 |
| 变动制造费用 Variable Overhead | 1.00 |
| 节省的总变动成本 Total Variable Costs Saved | 15.00 |

比较：

$$
\text{Cost saved by buying} = 15
$$

$$
\text{External purchase price} = 25
$$

所以不应接受 $\$25$ 报价。买入会多花：

$$
(25 - 15) \times 20000 = 200000
$$

---

### 10-2-3 机会成本改变决策 Opportunity Cost Changes the Decision

新信息：如果 Exitel 买入芯片，闲置设施可以出租，每年收入 $\$250,000$。

年度成本比较：

| 基于每年 20,000 颗芯片 Figures based on 20,000 chips / year | 自制 Make | 外购 Buy | 外购并出租 Buy & Lease |
|---|---:|---:|---:|
| 直接材料 Direct Material | 180,000 | 0 | 0 |
| 直接人工 Direct Labour | 100,000 | 0 | 0 |
| 变动制造费用 Variable Overhead | 20,000 | 0 | 0 |
| 固定制造费用 Fixed Overhead | 260,000 | 260,000 | 260,000 |
| 外部采购价 External Price | 0 | 500,000 | 500,000 |
| 成本小计 Costs sub-total | 560,000 | 760,000 | 760,000 |
| 场地出租收入 Lease of Premises (Income) | 0 | 0 | (250,000) |
| 总计 Total | 560,000 | 760,000 | 510,000 |

机会成本加入后：

$$
\text{Buy \& Lease cost} = 760000 - 250000 = 510000
$$

$$
\text{Make cost} = 560000
$$

所以外购并出租 Buy & Lease 比自制 Make 低 $\$50,000$。

真正的问题变成：

$$
\text{What is the best use of Exitel's facilities?}
$$

---

### 10-2-4 自制 / 合作 / 外购 Make / Partnership / Buy

自制 Make 的优势：

- 成本可能更低
- 品质控制更强
- 产品特性更独特
- 时间管理更直接
- 专有信息 proprietary information 留在公司内部

控制需求和采购模式可以粗略对应：

| 控制需求 | 倾向方案 |
|---|---|
| 需要强控制 Strong control needed | 自制 Make |
| 需要中等控制 Moderate control needed | 合作 Partnership |
| 需要弱控制 Weak control needed | 外购 Buy |

外包 Outsourcing 风险：

- 供应商规模和议价能力
- 买方技术能力不足
- 交易数量和复杂度高
- 隐性成本 hidden costs / 隐性收益 hidden benefits 没有进入表格

Lecture 10 的计算习惯：

$$
\text{Decision cost} = \text{Costs that change} - \text{Benefits that change}
$$
