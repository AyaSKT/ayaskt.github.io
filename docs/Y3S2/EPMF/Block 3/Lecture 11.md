---
lastUpdated: 2026-06-13T16:56:33+08:00
---

# Lec. 11 Engineering Economics (Break-Even Analysis)

**Поволі звикаєш до неба.**  
**但你会习惯这片天空。**

![alt text](<Lecture 11.attachments/1781257141092.JPG>)

## Block 3 Part 3 Contents

- [Block 3 Part 3 Contents](#block-3-part-3-contents)
- [Lec. 11 - Ses. 1 盈亏平衡基础 Break-Even Basics](#lec-11---ses-1-盈亏平衡基础-break-even-basics)
  - [11-1-1 基本术语 Basic Terms](#11-1-1-基本术语-basic-terms)
  - [11-1-2 公式法 Formula Method](#11-1-2-公式法-formula-method)
  - [11-1-3 鞋类案例 Footwear Example](#11-1-3-鞋类案例-footwear-example)
- [Lec. 11 - Ses. 2 表格法与图像法 Table and Graphical Methods](#lec-11---ses-2-表格法与图像法-table-and-graphical-methods)
  - [11-2-1 汉堡摊表格 Hamburger Stand Table](#11-2-1-汉堡摊表格-hamburger-stand-table)
  - [11-2-2 盈亏平衡图 Break-Even Graph](#11-2-2-盈亏平衡图-break-even-graph)
  - [11-2-3 安全边际 Margin of Safety](#11-2-3-安全边际-margin-of-safety)
- [Lec. 11 - Ses. 3 决策与敏感性分析 Decision and Sensitivity Analysis](#lec-11---ses-3-决策与敏感性分析-decision-and-sensitivity-analysis)
  - [11-3-1 目标利润 Target Profit](#11-3-1-目标利润-target-profit)
  - [11-3-2 盈亏平衡收入 Break-Even Revenue](#11-3-2-盈亏平衡收入-break-even-revenue)
  - [11-3-3 电影院案例 Movie Theater Example](#11-3-3-电影院案例-movie-theater-example)
  - [11-3-4 局限 Limitations](#11-3-4-局限-limitations)



## Lec. 11 - Ses. 1 盈亏平衡基础 Break-Even Basics

### 11-1-1 基本术语 Basic Terms

:::definition 盈亏平衡点 Break-Even Point
总成本等于总收入的产量或销售水平。此时没有利润 profit，也没有亏损 loss。

**The level of output at which total costs equal total revenue.**
:::

核心术语：

| 术语 | 英文 | 含义 |
|---|---|---|
| Price | Selling Price | 公司卖出产品的价格 |
| Cost | Cost | 公司购买组件或生产产品的成本 |
| Contribution | Contribution per unit | 售价减单位变动成本 |
| Fixed Cost | Fixed Cost | 不随产量变化的成本 |
| Variable Cost | Variable Cost | 随产量变化的成本 |

单位贡献：

$$
\text{Contribution per unit} = SP - VC
$$

其中：

- $SP$：单位售价 selling price per unit
- $VC$：单位变动成本 variable cost per unit

---

### 11-1-2 公式法 Formula Method

总成本：

$$
TC = F + VC \cdot Q
$$

收入：

$$
R = SP \cdot Q
$$

> [!NOTE] 参数说明
> 其中：
> - $TC$：总成本 (Total Cost)
> - $F$：固定成本 (Fixed Cost)
> - $VC$：单位变动成本 (Variable Cost per unit)
> - $Q$：产量 (Quantity)
> - $R$：收入 (Revenue)
> - $SP$：单位售价 (Selling Price per unit)

盈亏平衡点满足：

$$
TC = R
$$

$$
F + VC \cdot Q = SP \cdot Q
$$

整理得：

$$
\boxed{Q = \frac{F}{SP - VC}}
$$

也可以写成：

$$
\text{Break-even output} =
\frac{\text{Fixed Cost}}{\text{Contribution per unit}}
$$

例：固定成本 $\$200,000$，单位贡献 $\$50$。

$$
Q = \frac{200000}{50} = 4000 \text{ units}
$$

---

### 11-1-3 鞋类案例 Footwear Example

某公司生产鞋类产品：

- 固定成本 Fixed cost: $\$52,000$
- 单位变动成本 Variable cost: $\$9 / \text{pair}$
- 单位售价 Selling price: $\$25 / \text{pair}$

盈亏平衡销量：

$$
Q = \frac{52000}{25 - 9}
$$

$$
Q = 3250 \text{ pairs}
$$

若卖出 4000 双，利润为：

$$
P = SP \cdot Q - (F + VC \cdot Q)
$$

$$
P = 25 \times 4000 - (52000 + 9 \times 4000)
$$

$$
P = 100000 - 88000 = 12000
$$



## Lec. 11 - Ses. 2 表格法与图像法 Table and Graphical Methods

### 11-2-1 汉堡摊表格 Hamburger Stand Table

汉堡摊 Hamburger stand 数据：

- 固定成本 Fixed cost: 摊位租金 booth rental $\$500 / \text{day}$
- 单位变动成本 Variable cost: $\$1 / \text{hamburger}$
- 单位价格 Price: $\$2 / \text{hamburger}$

| 售出数量 Qty Sold | 固定成本 Fixed Cost | 变动成本 Variable Cost | 总成本 Total Cost | 收入 Revenue | 利润 / 亏损 Profit / Loss |
|---:|---:|---:|---:|---:|---:|
| 0 | 500 | 0 | 500 | 0 | (500) |
| 100 | 500 | 100 | 600 | 200 | (400) |
| 200 | 500 | 200 | 700 | 400 | (300) |
| 300 | 500 | 300 | 800 | 600 | (200) |
| 400 | 500 | 400 | 900 | 800 | (100) |
| 500 | 500 | 500 | 1000 | 1000 | 0 |
| 600 | 500 | 600 | 1100 | 1200 | 100 |
| 700 | 500 | 700 | 1200 | 1400 | 200 |

表格法直接看出：

$$
Q_{BE} = 500 \text{ hamburgers/day}
$$

也可用公式：

$$
Q = \frac{500}{2 - 1} = 500
$$

---

### 11-2-2 盈亏平衡图 Break-Even Graph

盈亏平衡图 Break-even graph 通常包含三条线：

| 线 | 说明 |
|---|---|
| 固定成本 Fixed Costs | 水平线，产量变化时固定成本不变 |
| 总成本 Total Costs | 从固定成本 fixed cost 起点开始，斜率为 $VC$ |
| 销售收入 Sales Revenue | 从 0 开始，斜率为 $SP$ |

利润区和亏损区：

- 盈亏平衡点右侧：收入 Revenue > 总成本 Total Cost，利润 profit
- 盈亏平衡点左侧：收入 Revenue < 总成本 Total Cost，亏损 loss

最大利润通常出现在最大可售产量处，前提是价格和单位变动成本保持线性。

---

### 11-2-3 安全边际 Margin of Safety

:::definition 安全边际 Margin of Safety
实际销售水平超过盈亏平衡销售水平的部分。若销售额 sales 低于盈亏平衡水平 break-even level，就会发生亏损。
:::

公式：

$$
\text{Margin of Safety} = Q_{\text{actual}} - Q_{BE}
$$

若用销售额：

$$
\text{Margin of Safety Revenue}
= R_{\text{actual}} - R_{BE}
$$

判断：

| 安全边际 Margin of Safety | 状态 |
|---:|---|
| 正 Positive | 当前销售高于盈亏平衡 break-even |
| 零 Zero | 刚好盈亏平衡 break-even |
| 负 Negative | 当前销售低于盈亏平衡 break-even |



## Lec. 11 - Ses. 3 决策与敏感性分析 Decision and Sensitivity Analysis

### 11-3-1 目标利润 Target Profit

若要求目标利润 target profit，公式改成：

$$
\boxed{
Q = \frac{F + \text{Target Profit}}{SP - VC}
}
$$

例：

- 目标利润 Target profit: $\$25,000$
- 固定成本 Fixed costs: $\$200,000$
- 单位贡献 Contribution per unit: $\$50$

$$
Q = \frac{200000 + 25000}{50}
$$

$$
Q = 4500 \text{ units}
$$

---

### 11-3-2 盈亏平衡收入 Break-Even Revenue

:::definition 盈亏平衡收入 Break-Even Revenue
覆盖固定成本和变动成本所需的收入额，常用于服务型业务 service business。
:::

公式：

$$
\boxed{
\text{Break-even Revenue}
=
\frac{\text{Fixed Costs}}{1 - (VC / SP)}
}
$$

工程咨询公司例：

- 月固定成本 Monthly fixed costs: $\$60,000$
- 工程师成本 Engineer cost: $\$15 / \text{hour}$
- 客户价格 Client price: $\$30 / \text{hour}$

$$
R_{BE}
=
\frac{60000}{1 - (15 / 30)}
$$

$$
R_{BE} = 120000
$$

需要 bill 的小时数：

$$
H = \frac{120000}{30} = 4000 \text{ hours}
$$

---

### 11-3-3 电影院案例 Movie Theater Example

电影院项目：

- 固定成本 Fixed cost: $\$1,000,000$
- 座位数 Seats: 500
- 每天放映场次 Showings per day: 4
- 每年营业天数 Open days per year: 300
- 票价 Ticket price: $\$8$
- 小卖部销售 Concession sales: $\$2 / \text{patron}$
- 单位变动成本 Variable cost: $\$6 / \text{patron}$

每位顾客收入：

$$
SP = 8 + 2 = 10
$$

盈亏平衡：

$$
10Q = 1000000 + 6Q
$$

$$
4Q = 1000000
$$

$$
Q = 250000 \text{ patrons}
$$

年最大顾客容量 patron capacity：

$$
500 \times 4 \times 300 = 600000
$$

平均 occupancy：

$$
\frac{250000}{600000} = 41.67\%
$$

若卖出 300,000 张票：

$$
P = 10 \times 300000 - (1000000 + 6 \times 300000)
$$

$$
P = 3000000 - 2800000 = 200000
$$

敏感性分析：若 concession 只有 $\$0.50 / \text{patron}$。

$$
SP = 8 + 0.5 = 8.5
$$

$$
8.5Q = 1000000 + 6Q
$$

$$
2.5Q = 1000000
$$

$$
Q = 400000 \text{ patrons}
$$

$$
\frac{400000}{600000} = 66.67\% \approx 67\%
$$

---

### 11-3-4 局限 Limitations

盈亏平衡分析 Break-even analysis 好用，但假设很硬：

- 成本和收入不一定都是直线
- 变动成本 Variable cost 不一定按产量等比例增加
- 有些成本是半变动 semi-variable
- 假设生产多少就卖多少，没有库存因素
- 固定成本 Fixed cost 在不同产量区间可能跳变

管理决策中的用途：

| 决策 | 图上影响 |
|---|---|
| 提价 | 收入线 Revenue line 斜率增加，但销量可能下降 |
| 购买低变动成本 variable cost 新设备 | 总成本线 Total cost line 斜率降低，固定成本 fixed cost 可能增加 |
| 选择不同地点建厂 | 比较固定成本 fixed cost 与变动成本 variable cost 的组合 |

Lecture 11 的核心公式就是：

$$
Q_{BE} = \frac{F}{SP - VC}
$$
