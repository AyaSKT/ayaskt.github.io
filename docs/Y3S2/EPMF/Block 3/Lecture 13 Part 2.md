# Lec. 13 Part 2 Engineering Economics (Capex, Opex, and Total Cost of Ownership)

**Fly perfect wings,**  
**飞呀，完美的翅膀，**

**Where have you been hiding?**  
**你至今为止到底藏在哪里？**

![alt text](<Lecture 13 Part 2.attachments/1781330682661.jpg>)

## Block 3 Part 6 Contents

- [Block 3 Part 6 Contents](#block-3-part-6-contents)
- [Lec. 13 - Ses. 3 CapEx 与 OpEx](#lec-13---ses-3-capex-与-opex)
  - [13-3-1 被遗漏的资本成本 Missing Capital Cost](#13-3-1-被遗漏的资本成本-missing-capital-cost)
  - [13-3-2 Capital Cost 买车例子](#13-3-2-capital-cost-买车例子)
  - [13-3-3 CapEx 定义 Capital Expenditure](#13-3-3-capex-定义-capital-expenditure)
  - [13-3-4 OpEx 定义 Operating Expenditure](#13-3-4-opex-定义-operating-expenditure)
- [Lec. 13 - Ses. 4 TCO 总拥有成本 Total Cost of Ownership](#lec-13---ses-4-tco-总拥有成本-total-cost-of-ownership)
  - [13-4-1 TCO 用途](#13-4-1-tco-用途)
  - [13-4-2 显性与隐性成本 Obvious and Less Obvious Costs](#13-4-2-显性与隐性成本-obvious-and-less-obvious-costs)
  - [13-4-3 TCO 现值计算 TCO Present Value](#13-4-3-tco-现值计算-tco-present-value)



## Lec. 13 - Ses. 3 CapEx 与 OpEx

### 13-3-1 被遗漏的资本成本 Missing Capital Cost

回看 Florida drive / fly 案例，汽车保险和汽车购买成本对该次旅行决策通常不 relevant，因为不管开不开车，这些成本都已经存在或不会改变。

但它们仍然是真实成本。

| Cost | 是否影响 fly / drive | 是否真实存在 |
|---|---|---|
| Car insurance | No | Yes |
| Car purchase / monthly repayments | No | Yes |
| Gasoline | Yes | Yes |
| Airfare / rental car | Yes | Yes |

这引出 CapEx / OpEx：有些成本不影响短期决策，但会影响长期资产拥有成本。

---

### 13-3-2 Capital Cost 买车例子

买车例子：

| 项目 | Year 0 | Year 1 | Year 2 | Year 3 | Year 4 |
|---|---:|---:|---:|---:|---:|
| Purchase car with bank loan | 10,000 |  |  |  |  |
| Repayments to bank |  | 2,500 | 2,500 | 2,500 | 2,500 |
| Balance owed | 10,000 | 7,500 | 5,000 | 2,500 | 0 |
| Value of car (Depreciation) | 10,000 | 8,000 | 6,000 | 4,000 | 2,000 |
| Net wealth | 0 | 500 | 1,000 | 1,500 | 2,000 |

四年后，贷款还清，车仍值 $\$2,000$，期间还获得了使用汽车的 benefit。

公司买昂贵设备时也类似。P&L 反映一个 period 的 business activity，不能在购买当年把整个设备成本一次性打成巨额亏损。常用做法是在设备寿命内摊销。

若设备寿命 5 年：

$$
\text{Annual depreciation charge}
=
\frac{\text{Capital cost}}{5}
$$

---

### 13-3-3 CapEx 定义 Capital Expenditure

:::definition CapEx Capital Expenditure
购买、升级或维护长期实物资产的支出。这些资产预计在多个年份内提供经济利益。
:::

常见 CapEx：

- Land
- Buildings
- Vehicles
- Factory machinery and production equipment
- Store equipment and furnishings
- Laboratory equipment
- Large IT systems
- Office furniture and equipment

General rule：

$$
\text{Useful life} > 1 \text{ year} \Rightarrow \text{likely CapEx}
$$

CapEx 通常进入 balance sheet 作为 asset，再通过 depreciation 逐年影响 P&L。

---

### 13-3-4 OpEx 定义 Operating Expenditure

:::definition OpEx Operating Expenditure
日常经营过程中发生的费用，例如销售、一般和行政费用。源材料特别说明它不包括 CoGS、taxes、depreciation 和 interest。
:::

OpEx 是维持业务运行的日常成本：

- Power, heat, light
- Rent
- Insurance
- Administrative salaries
- Office expenses

CapEx / OpEx 对比：

| 项目 | CapEx | OpEx |
|---|---|---|
| 时间跨度 | 多年受益 | 当期消耗 |
| 财务报表 | Balance Sheet asset，然后 depreciation | P&L 当期 expense |
| 例子 | 买设备、买服务器、建厂房 | 电费、租金、维护、云服务 |
| 工程关注 | 产能、折旧、资产寿命 | 日常运行成本、固定开销 |



## Lec. 13 - Ses. 4 TCO 总拥有成本 Total Cost of Ownership

### 13-4-1 TCO 用途

:::definition 总拥有成本 Total Cost of Ownership (TCO)
在一定期间或资产寿命内，拥有并使用某项资产所产生的总成本，包括购买、安装、运行、维护、停用和处置等成本。
:::

工程里问 TCO，常见目的：

1. 理解某个 process 的成本组成
2. 为 make-or-buy analysis 提供输入
3. 比较不同设备或供应方案的长期经济性

TCO 通常用于 critical 或 expensive capital equipment。

---

### 13-4-2 显性与隐性成本 Obvious and Less Obvious Costs

显性成本：

| Obvious Costs | 中文 |
|---|---|
| Purchase Cost | 购买成本 |
| Installation Cost | 安装成本 |
| Labour costs | 人工成本 |
| Utility Cost | 电力等公用事业 |
| Consumables Cost | 化学品等消耗品 |
| Maintenance | 维护 |
| Calibration Costs | 校准 |
| Repair | 修理 |

隐性或不容易被写进第一版表格的成本：

| Less Obvious Costs | 中文 |
|---|---|
| Pre-purchase analysis | 采购前分析 |
| Tendering process | 招标流程 |
| Facility preparation | 场地准备 |
| Building / floor space | 建筑或地面空间 |
| Training costs | 培训 |
| Process modification | 流程修改 |
| Decommission costs | 停用 |
| Removal costs | 拆除 |
| Re-instatement costs | 恢复 |
| Disposal costs | 处置 |

---

### 13-4-3 TCO 现值计算 TCO Present Value

若某设备维护成本为 $\$1M / \text{year}$，不考虑通胀和折现，5 年合计：

$$
1 + 1 + 1 + 1 + 1 = 5M
$$

若要换算到 today's prices，需要做 present value。

折现率 10% 时：

$$
PV_i = \frac{V_i}{(1 + 0.10)^i}
$$

维护费 $\$1M$ 的 PV：

| Year | Future Cost | PV at 10% |
|---:|---:|---:|
| 1 | 1.00 | 0.91 |
| 2 | 1.00 | 0.83 |
| 3 | 1.00 | 0.75 |
| 4 | 1.00 | 0.68 |
| 5 | 1.00 | 0.62 |

合计约：

$$
PV_{\text{M\&C}}
=
0.91 + 0.83 + 0.75 + 0.68 + 0.62
= 3.79M
$$

TCO 例题：

- Purchase price: $\$10M$
- Maintenance and calibration: $\$1M / \text{year}$
- Power: $\$500K$，按 10% inflation 增长
- Resale value: $\$0M$
- Life: 5 years
- Discount rate: 10%

Actual cost table：

| Year | Purchase | M&C | Power inflated 10% / yr | Total |
|---|---:|---:|---:|---:|
| 0 | 10.00 |  | 0.00 | 10.00 |
| 1 |  | 1.00 | 0.50 | 1.50 |
| 2 |  | 1.00 | 0.55 | 1.55 |
| 3 |  | 1.00 | 0.61 | 1.61 |
| 4 |  | 1.00 | 0.67 | 1.67 |
| 5 |  | 1.00 | 0.73 | 1.73 |
| Total | 10.00 | 5.00 | 3.06 | 18.06 |

因为 power 按同一 10% inflation 增长，又用 10% discount rate 折回今天，所以每年 PV 约为 $0.5M$：

$$
\frac{0.5(1.1)^{i-1}}{(1.1)^i}
=
\frac{0.5}{1.1}
\approx 0.455
$$

源表把 power PV 近似列为每年 $0.5M$，5 年合计 $2.5M$。按源表口径：

| Item | PV Total |
|---|---:|
| Purchase Price | 10.0 |
| M&C (PV) | 3.8 |
| Resale (PV) | 0.0 |
| Power | 2.5 |
| Present Value Total | 16.3 |

所以：

$$
\boxed{
TCO_{PV} \approx \$16.3M
}
$$

Lecture 13 Part 2 的记忆线索：

$$
\text{TCO} = \text{CapEx} + \text{PV(OpEx and lifecycle costs)}
$$
