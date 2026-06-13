---
lastUpdated: 2026-03-12T19:42:45+08:00
---

# EC Lecture 3 Constrained Optimization

## 目标函数 vs. 约束 Objective vs. Constraint

示例问题：

$$
\min f(x) = (x-1)^2 - 1
$$

$$
\text{s.t. } g(x) = x - 1.5 \ge 0
$$

- **目标函数 Objective function**：需要被最小化/最大化的函数（这里是最小化）。
- **约束 Constraint**：可行解必须满足的条件（这里要求 $x \ge 1.5$）。

### 在受约束优化中比较解 Comparing solutions in constrained optimization

例子（第 0 代/若干候选点）：

| $x$ | $f(x)$ | $g(x)$ |
|---:|---:|---:|
| 0   | 0     | -1.5 |
| 1   | -1    | -0.5 |
| 1.5 | -0.75 | 0 |
| 2   | 0     | 0.5 |

### 目标与约束的区别 Objectives and constraints

- **目标 Objective**：越小越好（针对最小化问题；若是最大化，则需做相应处理）。
- **约束 Constraint**：只有 **可行 Feasible** / **不可行 Infeasible** 两类
  - 可行解通常被视为"同一层级"（都满足约束）。
  - 不可行解之间仍可比较"好坏"（取决于违反程度）。

### 受约束优化的解排序 Rank solutions

- **可行解 Feasible solutions** 优于 **不可行解 Infeasible solutions**
- 两个可行解：**目标函数值 Objective value** 更优者更好（最小化时更小更好）
- 两个不可行解：**约束违反 Constraint violation** 更小者更好

## 处理约束：违反程度与惩罚函数 Handling Constraints

### 描述约束违反 Describe constraint violation

**约束违反之和 Sum of the constraint violation**
- **Case 1**：总重量 $10\text{ kg}$ vs. 要求 $7\text{ kg}$（违反 $3\text{ kg}$）；
  总体积 $70\text{ cm}^3$ vs. 要求 $60\text{ cm}^3$（违反 $10\text{ cm}^3$）
- **Case 2**：某些约束可能有 **优先级 Priority**

**加权约束违反之和 Weighted sum of the constraint violation**
- 当约束有优先级或量纲不同，使用 **加权和 Weighted sum** 来综合违反程度。

### 惩罚函数法 Penalty function method

将受约束问题：

$$
\min f(x)\quad \text{s.t. } g(x)\le c
$$

等价变换为无约束问题：

$$
\min \; f(x) + k \cdot h(g(x),c)
$$

其中 **惩罚函数 Penalty function**：

$$
h(g(x),c) = \max\{0,\; g(x)-c\}
$$

- $k$ 是 **惩罚系数 Penalty coefficient**（标量 scalar，例如 $k=50$），用于控制惩罚强度。
- 约束违反越多，惩罚项越大。
- 当满足约束时（$g(x)\le c$），惩罚项为 $0$，对目标函数无影响。

### 如何确定惩罚系数 $k$

一种 **经验方法 Empirical method**：

- **Step 1**：估计一个可容忍的 **预期可接受违反 Intended acceptable violation** $\epsilon$
- **Step 2**：估计一个期望获得的 **期望最优目标值 Expected optimal objective value** $\tilde f$
- **Step 3**：选择 $k$，使得 $k\times \epsilon$ 大约是 $\tilde f$ 的 $50$ 倍：

$$
k\cdot \epsilon = 50\tilde f
\quad\Rightarrow\quad
k = \frac{50\tilde f}{\epsilon}
$$

### 惩罚函数法示例 Penalty function example

![](Assets/Pasted%20image%2020251213154830.png)

给定：

$$
\min f(x)=(x-1)^2-1,\quad \text{s.t. } g(x)=x-1.5\ge 0
$$

若取 $k=500$，则等价的惩罚形式（将违反写成 $\max\{0,1.5-x\}$）：

$$
(x-1)^2-1+500\max\{0,1.5-x\}
=
\begin{cases}
(x-1)^2-1, & x-1.5\ge 0\\
(x-1)^2-1+500(1.5-x), & \text{otherwise}
\end{cases}
$$

### 多个约束 Multiple constraints

原问题：

$$
\min f(x)\quad
\text{s.t. }
\begin{cases}
g_1(x)\ge c_1\\
g_2(x)\le c_2\\
g_3(x)\le c_3
\end{cases}
$$

**Step 1：统一约束方向 Unify constraints**（例如全转成 $\le$）

**Step 2：用惩罚函数法并入目标 Integrate constraints**：

$$
\min\; f(x)
+ k_1 h(-g_1(x),-c_1)
+ k_2 h(g_2(x),c_2)
+ k_3 h(g_3(x),c_3)
+ \cdots
$$

**Step 3：分别确定 $k_i$**：

$$
k_i = \frac{50\tilde f}{\epsilon_i}
$$

### 如果是最大化 What if maximization?

只需对目标取负，把 **最大化 Maximization** 转成 **最小化 Minimization**，其余处理同前。

### 惩罚函数法是否遵循排序原则？

排序原则（回顾）：可行解优于不可行解 → 两个可行解比目标值 → 两个不可行解比违反程度。

结论：**如果惩罚系数 $k$ 选择得当**，惩罚函数法可以遵循上述原则。

## 例子：背包问题 Knapsack Problem

### 问题设置 Problem setup

五个物品（价值 value / 重量 weight / 体积 volume）：

| 物品 | 价值 | 重量 | 体积 |
|:---:|:---:|:---:|:---:|
| 1 | $\$10$ | $1\text{ kg}$ | $10\text{ cm}^3$ |
| 2 | $\$25$ | $3\text{ kg}$ | $20\text{ cm}^3$ |
| 3 | $\$20$ | $2\text{ kg}$ | $25\text{ cm}^3$ |
| 4 | $\$15$ | $2\text{ kg}$ | $15\text{ cm}^3$ |
| 5 | $\$40$ | $4\text{ kg}$ | $30\text{ cm}^3$ |

背包容量 Capacity：$7\text{ kg}$ 且 $60\text{ cm}^3$

**决策变量 Decision variable**：

$$
\mathbf{X}=[x_1,x_2,\ldots,x_5],\quad
x_i=
\begin{cases}
1, & \text{选择物品 } i\\
0, & \text{否则}
\end{cases}
$$

最大化总价值：

$$
\max_{\mathbf{X}}\; 10x_1+25x_2+20x_3+15x_4+40x_5
$$

约束：

$$
x_1+3x_2+2x_3+2x_4+4x_5 \le 7
$$

$$
10x_1+20x_2+25x_3+15x_4+30x_5 \le 60
$$

### Step 1：转为最小化 Convert to minimization

$$
\min_{\mathbf{X}}\; -\left(10x_1+25x_2+20x_3+15x_4+40x_5\right)
$$

### Step 2：统一约束方向 Unify constraints

本例两个约束已经是 $\le$ 形式，**无需额外转换**。

### Step 3：惩罚函数并入目标 Integrate constraints

$$
\begin{aligned}
\min_{\mathbf{X}}\;
&-\left(10x_1+25x_2+20x_3+15x_4+40x_5\right) \\
&+ k_1\max\{x_1+3x_2+2x_3+2x_4+4x_5-7,\;0\} \\
&+ k_2\max\{10x_1+20x_2+25x_3+15x_4+30x_5-60,\;0\}
\end{aligned}
$$

给定（示例选择）：

$$
\tilde f = \$100,\quad
\epsilon_1 = 1\text{ kg},\quad
\epsilon_2 = 10\text{ cm}^3
$$

则：

$$
k_1=\frac{50\cdot 100}{1}=5000,\quad
k_2=\frac{50\cdot 100}{10}=500
$$

## 多目标优化 Multiobjective Optimization

### 问题定义 Problem definition

$$
\begin{aligned}
\min f_1(x_1, x_2, \ldots, x_n) \\
\min f_2(x_1, x_2, \ldots, x_n) \\
\vdots \\
\min f_m(x_1, x_2, \ldots, x_n)
\end{aligned}
$$

$$
x = (x_1, x_2, \ldots, x_n)^T \in D \subseteq \mathbb{R}^n
$$

- $x$ 是 **决策变量 decision variables**，$n$ 是维度
- $D$ 是 **决策空间 decision space**
- $m$ 个 **目标 objectives** 通常彼此冲突

### 示例：汽车设计 Example: automobile design

能源消耗（每百英里）应尽可能低，制造成本应尽可能低。两者**相互冲突**：低能耗依赖于更先进的动力单元设计，这会增加制造费用。

### 支配 Dominance

$x$ **支配 dominates** $y$ 如果：
- $x$ 在任何目标上都不比 $y$ 差
- $x$ 至少在一个目标上严格优于 $y$

对于任意两个解 $x, y$：$x$ 支配 $y$，或 $y$ 支配 $x$，或两者**不可比较**。

### 支配图解 Illustration

![](Assets/Pasted%20image%2020251213162135.png)

- B 支配 A
- B 和 C 不可比较，A 和 C 也是如此

### 帕累托前沿 Pareto Front

**帕累托前沿 PF**：在决策空间 $D$ 中不被任何解支配的点的集合。

**帕累托集 PS**：所有帕累托最优解的集合（决策空间的子集）。

**帕累托最优解**：不被任何其他解支配的解。一个理性的决策者不会选择非帕累托最优解。

帕累托前沿的不同形状：凸、凹、不连续、既非凸也非凹。

![](Assets/Pasted%20image%2020251213162146.png)

## 多目标进化算法 MOEAs

### 基于种群的迭代搜索 Population-based iterative search

简单 EA 的一次迭代：
1. 第 $t$ 代种群 → **选择 Selection** → 父代集合
2. **交叉 Crossover** / **变异 Mutation**
3. 第 $t+1$ 代种群

**MOEA 的目标**：生成有限数量的**均匀分布**的帕累托最优解，逼近 PF。

### MOEA 分类

| 类型 | 代表算法 | 思路 |
|:---:|:---:|:---|
| **基于分解** Decomposition | MOEA/D | 将 MOP 分解为多个单目标子问题，协同求解 |
| **基于支配** Dominance | NSGA-II | 基于帕累托支配关系和目标空间距离迭代选择 |
| **基于指标** Indicator | IBEA | 用超体积等指标评估解集质量，迭代选择 |

### MOEA/D 的优势

- **小种群下具有良好的分布性和高优化质量**
- 由于仿真成本，种群规模通常受限；分解思想有助于获得更均匀的最终解分布
- 小种群下 MOEA/D 性能优于 NSGA-II

### MOEA/D：分解 + 协同

**分解 Decomposition**：将逼近 PF 的任务分解为 $N$ 个单目标子任务。

**协同 Collaboration**：$N$ 个代理分别处理子问题，子问题彼此相关，代理协同求解。

每个子问题的输入：分解函数 $g$、偏好向量 $\lambda$、参考点 $z^*$、搜索空间 $D$、当前最优解。

### 分解方法 Decomposition methods

**加权和法 Weighted sum approach**

$$
\min g^{ws}(x | \lambda) = \lambda_1 f_1(x) + \lambda_2 f_2(x),\quad \lambda_1 + \lambda_2 = 1,\; \lambda_1, \lambda_2 \ge 0
$$

适用于**凸 PF**。

**切比雪夫法 Tchebycheff approach**

$$
\min g^{te}(x | \lambda, z^*) = \max \{ \lambda_1 | f_1(x) - z_1^* |, \lambda_2 | f_2(x) - z_2^* | \}
$$

其中 $z^* = (z_1^*, z_2^*)$ 是理想点（Utopian point），$z_i^* < \min f_i$。

### 邻域协同 Neighborhood collaboration

- 如果两个子问题的**权重向量**相近，则互为邻居
- 相邻子问题目标函数相似，最优解也大概率相似

**交叉示例**：子问题当前最优解 `[x1,...,x9]` 与邻居最优解 `[y1,...,y9]` 交叉 → `[x1,x2,x3,y4,y5,y6,y7,x8,x9]`

### MOEA/D 整体流程

每一代，每个子问题执行：
1. **交配池选择**：获取邻居的当前解（协同）
2. **繁殖**：交叉 + 变异生成新解
3. **替换**：若新解更优则替换旧解，并传递给部分邻居
