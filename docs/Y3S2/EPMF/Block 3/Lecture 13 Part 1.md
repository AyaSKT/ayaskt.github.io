# Lec. 13 Part 1 Engineering Economics (Discounted Cash Flow)

## Block 3 Part 5 Contents

- [Block 3 Part 5 Contents](#block-3-part-5-contents)
- [Lec. 13 - Ses. 1 贴现现金流 Discounted Cash Flow](#lec-13---ses-1-贴现现金流-discounted-cash-flow)
  - [13-1-1 Cost 与 Price](#13-1-1-cost-与-price)
  - [13-1-2 Discounting 贴现](#13-1-2-discounting-贴现)
  - [13-1-3 Present Value 单笔现值](#13-1-3-present-value-单笔现值)
  - [13-1-4 Net Present Value 多期净现值](#13-1-4-net-present-value-多期净现值)
  - [13-1-5 B/C Ratio 与 IRR](#13-1-5-bc-ratio-与-irr)
- [Lec. 13 - Ses. 2 现金流图 Cash Flow Diagrams](#lec-13---ses-2-现金流图-cash-flow-diagrams)
  - [13-2-1 工程项目现金流 Project Cash Flows](#13-2-1-工程项目现金流-project-cash-flows)
  - [13-2-2 Compounding 与 Discounting](#13-2-2-compounding-与-discounting)
  - [13-2-3 Boney 借款案例 Boney Loan Example](#13-2-3-boney-借款案例-boney-loan-example)
  - [13-2-4 Equal Payment Series](#13-2-4-equal-payment-series)
  - [13-2-5 TSMC Fab 决策案例](#13-2-5-tsmc-fab-决策案例)



## Lec. 13 - Ses. 1 贴现现金流 Discounted Cash Flow

### 13-1-1 Cost 与 Price

工程财务里，cost 和 price 要分开。

| Term | 中文 | 含义 |
|---|---|---|
| Cost | 成本 | 生产某物或提供服务所需花费 |
| Price | 价格 | 客户愿意为该物或服务支付的金额 |
| Profit | 利润 | Price 与 Cost 的差额，口径可能是税前或税后 |

关系：

$$
\text{Price} = \text{Cost} + \text{Profit}
$$

。

Price 和 Cost 混在一起，会直接毁掉项目财务判断。

---

### 13-1-2 Discounting 贴现

:::definition 贴现 Discounting
把未来某一笔付款或一串付款换算成今天等价值的过程。

**Discounting is the process of determining the present value of a payment or a stream of payments to be received or paid in the future.**
:::

基本思想：今天的 $\$1$ 通常比未来的 $\$1$ 更有价值。

原因包括：

- Inflation 通胀
- Currency depreciation 货币贬值
- Risk 风险
- Opportunity cost 机会成本
- 人对当前确定收益的偏好

例：今天存入 $\pounds100$，年利率 5%，十年后：

$$
100(1 + 0.05)^{10} = 162.89
$$

源材料写成约 $\pounds163.89$。反过来看，十年后的约 $\pounds163.89$，在 5% 折现率下约等于今天的 $\pounds100$。

---

### 13-1-3 Present Value 单笔现值

Future value：

$$
F = P(1 + r)^n
$$

Present value：

$$
\boxed{
P = \frac{F}{(1 + r)^n}
}
$$

。

其中：

- $P$：present equivalent value
- $F$：future equivalent value
- $r$：annual interest / discount rate
- $n$：number of years

例：未来第 1 年支付 $\pounds105$，折现率 5%：

$$
P = \frac{105}{1.05} = 100
$$

未来第 10 年支付 $\pounds163.89$：

$$
P = \frac{163.89}{(1.05)^{10}} \approx 100
$$

所以若项目需要现在支付 $\pounds100$、一年后支付 $\pounds105$、十年后支付 $\pounds163.89$，三笔付款的 PV 合计约：

$$
PV = -100 -100 -100 = -300
$$

。

简单相加是 $-368.89$，和 PV 不是同一个口径。

---

### 13-1-4 Net Present Value 多期净现值

多期现金流的现值：

$$
PV = \sum_{i=1}^{n}\frac{V_i}{(1 + r)^i}
$$

。

若分别计算成本现值 $PV_c$ 和收益现值 $PV_b$：

$$
\boxed{
NPV = PV_b - PV_c
}
$$

。

判断：

| NPV | 含义 |
|---:|---|
| $NPV > 0$ | 项目收益现值超过成本现值，可考虑 |
| $NPV = 0$ | 刚好达到折现率要求 |
| $NPV < 0$ | 在该折现率下不经济 |

折现率通常不是央行 base lending rate。投资者一般希望回报高于无风险储蓄利率，因为项目有额外风险和管理成本。

---

### 13-1-5 B/C Ratio 与 IRR

Benefit / Cost Ratio：

$$
B/C = \frac{PV_b}{PV_c}
$$

判断：

| B/C | 含义 |
|---:|---|
| $B/C > 1$ | 收益现值大于成本现值 |
| $B/C = 1$ | 收益与成本现值相等 |
| $B/C < 1$ | 项目不经济 |

:::definition 内部收益率 Internal Rate of Return (IRR)
使项目整体 $NPV = 0$ 的折现率。
:::

IRR 满足：

$$
\sum_{i=0}^{n}\frac{V_i}{(1 + r)^i} = 0
$$

其中 $V_i$ 带符号：收入为正，支出为负。



## Lec. 13 - Ses. 2 现金流图 Cash Flow Diagrams

### 13-2-1 工程项目现金流 Project Cash Flows

工程项目的经济后果往往跨越多年。现金流图用时间轴展示每个时间点的费用和收入。

常见支出：

1. Initial expense: 建造、购买、安装
2. Operations and maintenance (O&M): 电力、人工、小修
3. Salvage cost: 项目结束出售或转移设备的费用
4. Overhaul: 使用寿命中的大修资本支出

对应收益：

- 年销售产品或服务的收入
- Salvage value income

现金流图规则：

| 箭头 | 含义 |
|---|---|
| Up arrow | Receipts / benefits |
| Down arrow | Payments / costs |
| Horizontal line | Time |

---

### 13-2-2 Compounding 与 Discounting

Compounding：

$$
F = P(1 + r)^n
$$

Discounting：

$$
P = \frac{F}{(1 + r)^n}
$$

。

如果比较不同产品或机会，需要把所有现金流换算到同一个时间点。最常用的是 present worth。

经济等价 economic equivalence 依赖折现率：

$$
\text{Equivalent cash flows depend on } r
$$

。

---

### 13-2-3 Boney 借款案例 Boney Loan Example

Boney 从银行借 $\$1000$，利率 8%。两年末分两次还本金，每年还一半本金加当年利息。

| End of Year | Cash Flow as Boney | Cash Flow as Bank |
|---:|---:|---:|
| 0 | +1000 | -1000 |
| 1 | -580 | +580 |
| 2 | -540 | +540 |
| Total interest | -120 | +120 |

计算：

第 1 年利息：

$$
1000 \times 0.08 = 80
$$

第 1 年还款：

$$
500 + 80 = 580
$$

第 2 年剩余本金 $\$500$，利息：

$$
500 \times 0.08 = 40
$$

第 2 年还款：

$$
500 + 40 = 540
$$

。

不规则现金流的现值就是逐笔折现后相加。

---

### 13-2-4 Equal Payment Series

若每年等额支付 $A$，共 $N$ 年，利率为 $i$，未来值：

$$
F = A + A(1+i) + A(1+i)^2 + \dots + A(1+i)^{N-1}
$$

等比数列求和：

$$
\boxed{
F = A\left[\frac{(1+i)^N - 1}{i}\right]
}
$$

。

选择题里常见三类现金流：

- $\$20,000$ today
- $\$50,000$ ten years from now
- $\$8,000$ each year for ten years

没有利率，不能直接比较。给定利率后，把它们换算到同一个时间点再比较。

---

### 13-2-5 TSMC Fab 决策案例

Apple iPhone processor 是否从 10 nm fab 转到 7 nm / 7 nm EUV fab，需要比较 capex contribution per good die。

源材料假设：

- 10 nm 和新 7 nm fab 的 variable costs 近似相同
- Fab capacity 约 $1M$ wafers / year
- Yield 约 90%
- Relevant costs 主要由 fab CapEx 主导
- Payback period: 24 months，即约 $2M$ wafers

10 nm：

$$
\text{Gross die per wafer} = \frac{70650}{89.23} \approx 792
$$

$$
\text{Good die} = 792 \times 0.9 \approx 712
$$

Fab 15 CapEx 为 $\$9.375B$：

$$
\text{CapEx per wafer}
= \frac{9.375B}{2M}
= 4687.5
$$

$$
\text{CapEx per good die}
= \frac{4687.5}{712}
\approx 6.58
$$

7 nm EUV：

面积节省约：

$$
37\% + 10\% \text{ compounded approximately} \approx 43\%
$$

Die size：

$$
89.23 \times (1 - 0.43) \approx 50.59 \text{ mm}^2
$$

Good die 约 1257。Fab 18 CapEx 为 $\$17.08B$：

$$
\text{CapEx per wafer}
= \frac{17.08B}{2M}
= 8540
$$

$$
\text{CapEx per good die}
= \frac{8540}{1257}
\approx 6.79
$$

仅看 CapEx per good die：

| Fab | CapEx / good die |
|---|---:|
| 10 nm | $\$6.58$ |
| 7 nm EUV | $\$6.79$ |

CapEx 角度不支持转移。但 good die 数从 712 到 1257，约增加：

$$
\frac{1257 - 712}{712} = 76.5\%
$$

若 variable cost 近似相同，产出提升会支持转移。这个案例的重点是：经济结论依赖假设。
