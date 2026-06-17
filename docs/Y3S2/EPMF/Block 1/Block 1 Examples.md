---
lastUpdated: 2026-05-27T16:47:21+08:00
---

# Block 1 例题 Examples



- [Lecture 1 Introduction \& Role of Project Manager](#lecture-1-introduction--role-of-project-manager)
- [Lecture 2 Project Scope \& Schedule Management](#lecture-2-project-scope--schedule-management)
- [Lecture 3 Project Cost \& Resource Management](#lecture-3-project-cost--resource-management)
- [Lecture 4 Communications \& Risk Management](#lecture-4-communications--risk-management)

## Lecture 1 Introduction & Role of Project Manager

:::: stem L1-E1
**成本效益分析 Cost-Benefit Analysis**

某项目的折现后数据如下：

- 总项目成本现值 Present value of project cost: 847,434
- 总项目收益现值 Present value of project benefit: 694,965

求收益成本比 $BCR$ 和净收益，并判断项目是否值得推进。
::::

:::: solution
收益成本比：

$$
BCR=\frac{694965}{847434}=0.82
$$

净收益：

$$
Net\ Benefit=694965-847434=-152469
$$

因此：

- $BCR<1$
- 净收益为负

该项目的折现收益低于折现成本，从财务角度看不值得继续推进。
::::

## Lecture 2 Project Scope & Schedule Management

:::: stem L2-E1
**三点估算 Three-Point Estimating**

John 管理一个项目，最可能完成时间为 15 周。最好情况可缩短 2 周，悲观情况会延长 5 周。求三角分布估算、Beta 分布估算和标准差。
::::

:::: solution
三个估计值为：

$$
O=13,\qquad M=15,\qquad P=20
$$

三角分布：

$$
E=\frac{O+M+P}{3}=\frac{13+15+20}{3}=16
$$

Beta 分布：

$$
E=\frac{O+4M+P}{6}=\frac{13+4(15)+20}{6}=15.5
$$

标准差：

$$
\sigma=\frac{P-O}{6}=\frac{20-13}{6}=1.17
$$
::::

:::: stem L2-E2
**关键路径 Critical Path Method**

已知活动与持续时间：

| Activity | Duration | Predecessor |
|:---:|:---:|:---:|
| A | 4 | - |
| B | 5 | F |
| C | 8 | H |
| D | 5 | - |
| E | 10 | D |
| F | 9 | A, D |
| G | 5 | E, F |
| H | 3 | G |

求关键路径和关键路径持续时间。
::::

:::: solution
全部路径中最长的是：

$$
Start \rightarrow D \rightarrow E \rightarrow G \rightarrow H \rightarrow C \rightarrow End
$$

持续时间：

$$
5+10+5+3+8=31
$$

因此关键路径为：

$$
\boxed{Start-D-E-G-H-C-End}
$$

关键路径持续时间为：

$$
\boxed{31}
$$
::::

:::: stem Q1
Carmen 准备交付 Tesla Gigafactory 项目委托的 case study。交付前，她安排会议向 steering committee 和 sponsor 说明成果、回答问题，并取得正式确认，确认该 case study 满足期望。她正在执行哪个过程？

Which process is she performing?

<div class="example-options">
<span class="example-option">A. Deliverables Acceptance</span>
<span class="example-option">B. Accept Deliverables</span>
<span class="example-option">C. Close Project or Phase</span>
<span class="example-option">D. Validate Scope</span>
</div>
::::

:::: solution
**答案 Answer: D. Validate Scope**

关键词是 official confirmation 和 meets expectations。Validate Scope 的核心就是由客户或 sponsor 对已完成可交付成果进行正式验收。
::::

:::: stem Q2
软件项目经理正在收集需求并建立项目估算。这里对应哪个过程组？

A software project manager is collecting requirements and establishing estimates. Which process group is this?

<div class="example-options">
<span class="example-option">A. Planning</span>
<span class="example-option">B. Executing</span>
<span class="example-option">C. Initiating</span>
<span class="example-option">D. Monitoring and Controlling</span>
</div>
::::

:::: solution
**答案 Answer: A. Planning**

收集需求、估算活动持续时间和成本都属于规划阶段的典型工作。
::::

:::: stem Q3
关于 WBS，以下哪项最正确？

Which statement about the WBS is most correct?

<div class="example-options">
<span class="example-option">A. WBS stands for Work Breakdown Statement</span>
<span class="example-option">B. The WBS includes 100 percent of the work of the project</span>
<span class="example-option">C. Any work not included in the WBS is out of scope</span>
<span class="example-option">D. B & C</span>
</div>
::::

:::: solution
**答案 Answer: D. B & C**

WBS 使用 100% rule：项目范围内的全部工作都应包含在 WBS 中；不在 WBS 中的工作通常视为范围外工作。A 错在 WBS 是 Work Breakdown Structure。
::::

:::: stem Q4
Project Schedule Management 的过程顺序是？

Which is the full and correctly ordered list of processes in Project Schedule Management?

<div class="example-options">
<span class="example-option">A. Define Activities, Sequence Activities, Estimate Activity Durations, Develop Schedule, Control Schedule</span>
<span class="example-option">B. Define Activities, Estimate Activity Durations, Develop Schedule, Control Schedule</span>
<span class="example-option">C. Plan Schedule Management, Define Activities, Sequence Activities, Estimate Activity Durations, Develop Schedule, Control Schedule</span>
<span class="example-option">D. Control Schedule, Sequence Activities, Estimate Activity Durations, Define Activities, Plan Schedule Management, Develop Schedule</span>
</div>
::::

:::: solution
**答案 Answer: C**

顺序为：

$$
Plan \rightarrow Define \rightarrow Sequence \rightarrow Estimate \rightarrow Develop \rightarrow Control
$$
::::

:::: stem Q5
关于 Resource optimization，以下哪项正确？

Which statement about resource optimization is true?

<div class="example-options">
<span class="example-option">A. It is an input to Estimate Activity Duration</span>
<span class="example-option">B. It is a tool and technique within Develop Schedule, used to adjust resource load levels</span>
<span class="example-option">C. It is a tool and technique within Estimate Activity Durations</span>
<span class="example-option">D. It is a tool and technique within Plan Schedule Management</span>
</div>
::::

:::: solution
**答案 Answer: B**

Resource optimization 是 Develop Schedule 的工具与技术，用于根据资源约束调整进度模型，例如 resource leveling 和 resource smoothing。
::::

## Lecture 3 Project Cost & Resource Management

:::: stem L3-E1
**挣值分析 Earned Value Analysis**

已知：

- Budget at Completion: \$100M
- Planned Value: \$29M
- Earned Value: \$26M
- Actual Cost: \$30.5M

求 SV, CV, SPI, CPI，并判断成本和进度状态。
::::

:::: solution
进度偏差：

$$
SV=EV-PV=26-29=-3M
$$

成本偏差：

$$
CV=EV-AC=26-30.5=-4.5M
$$

进度绩效指数：

$$
SPI=\frac{EV}{PV}=\frac{26}{29}=0.90
$$

成本绩效指数：

$$
CPI=\frac{EV}{AC}=\frac{26}{30.5}=0.85
$$

因此：

- $SV<0$, $SPI<1$：进度落后 Behind schedule
- $CV<0$, $CPI<1$：成本超支 Over budget
::::

:::: stem Q1
Interoperable Systems Corp 正在为新项目估算成本。Funding limits 将基于这些估算设置，如果估算过低，会造成严重延误和管理压力。哪种估算最合适？

What type of estimating is most appropriate?

<div class="example-options">
<span class="example-option">A. Three-point estimating because it considers optimistic, pessimistic, and most likely costs</span>
<span class="example-option">B. Parametric estimating because nearly 20 percent of project cost is fencing</span>
<span class="example-option">C. Bottom-up estimating, because this will be most thorough</span>
<span class="example-option">D. Top-down estimating because estimates need to align with funding limits</span>
</div>
::::

:::: solution
**答案 Answer: C. Bottom-up estimating**

题目强调估算不能过低、后果严重，因此需要最详细、最可靠的估算。Bottom-up estimating 从工作包逐层汇总，精度通常最高。
::::

:::: stem Q2
以下哪项准确描述 Cost baseline？

Which statement accurately describes the cost baseline?

<div class="example-options">
<span class="example-option">A. It is compared against plan to calculate cost variances and CPI</span>
<span class="example-option">B. It is an output of Determine Budget, subject to formal change control, and does not include management reserves</span>
<span class="example-option">C. It is an input to Determine Budget</span>
<span class="example-option">D. It includes contingency and management reserves</span>
</div>
::::

:::: solution
**答案 Answer: B**

Cost baseline 是 Determine Budget 的输出，纳入正式变更控制。它包含 contingency reserve，但不包含 management reserve。
::::

:::: stem Q3
Cost Management Knowledge Area 的正确过程列表是？

Which is the correct process list in Cost Management?

<div class="example-options">
<span class="example-option">A. Estimate Costs; Create Budget; Control Costs</span>
<span class="example-option">B. Plan Cost Management, Estimate Costs, Determine Budget, Minimize Costs</span>
<span class="example-option">C. Plan Cost Management, Estimate Costs, Secure Funding, Minimize Costs</span>
<span class="example-option">D. Plan Cost Management, Estimate Costs, Determine Budget, Control Costs</span>
</div>
::::

:::: solution
**答案 Answer: D**

项目成本管理包括：

$$
Plan\ Cost\ Management \rightarrow Estimate\ Costs \rightarrow Determine\ Budget \rightarrow Control\ Costs
$$
::::

:::: stem Q4
某 server refresh 项目实际成本为 \$675,000，已完成工作的预算成本为 \$525,000。CPI 是多少？

The project incurred costs of \$675,000, while the work completed was expected to cost \$525,000. What is CPI?

<div class="example-options">
<span class="example-option">A. 0.778</span>
<span class="example-option">B. 1.29</span>
<span class="example-option">C. 0.286</span>
<span class="example-option">D. \$150,000</span>
</div>
::::

:::: solution
**答案 Answer: A. 0.778**

$$
CPI=\frac{EV}{AC}=\frac{525000}{675000}=0.778
$$

$CPI<1$，说明成本效率低，项目超支。
::::

:::: stem Q5
项目经理报告 $CPI=1.1$ 且 $SPI=0.9$。这说明什么？

What does $CPI=1.1$ and $SPI=0.9$ tell us?

<div class="example-options">
<span class="example-option">A. Trading controls need to be tightened</span>
<span class="example-option">B. The project is over budget</span>
<span class="example-option">C. The project is ahead of schedule</span>
<span class="example-option">D. The project is under budget and behind schedule</span>
</div>
::::

:::: solution
**答案 Answer: D**

$CPI>1$ 表示成本表现好，under budget；$SPI<1$ 表示进度落后，behind schedule。
::::

:::: stem Q6
项目在哪个阶段成本最高？

At which stage does a project have maximum cost?

<div class="example-options">
<span class="example-option">A. Initial stage</span>
<span class="example-option">B. Middle stage</span>
<span class="example-option">C. Final stage</span>
<span class="example-option">D. Cost is same at all stages</span>
</div>
::::

:::: solution
**答案 Answer: B. Middle stage**

典型项目生命周期中，成本和人员投入在开始阶段较低，中期最高，收尾阶段下降。
::::

:::: stem Q7
项目 under budget but behind schedule。为了把项目拉回计划，应使用哪项工具或技术？

The project is under budget and behind schedule. Which tool/technique can bring it back to plan?

<div class="example-options">
<span class="example-option">A. Earned value management</span>
<span class="example-option">B. Reserve analysis</span>
<span class="example-option">C. Variance analysis</span>
<span class="example-option">D. Crashing</span>
</div>
::::

:::: solution
**答案 Answer: D. Crashing**

Crashing 通过增加资源缩短关键路径活动时间。题目说 under budget，说明还有成本空间可用于赶工。
::::

:::: stem Q8
Acquire Resources 使用哪些工具与技术？

Which tools and techniques are used in Acquire Resources?

<div class="example-options">
<span class="example-option">A. Advertise, offer, and hire</span>
<span class="example-option">B. Beg, borrow and steal</span>
<span class="example-option">C. Pre-assignment, Decision making, Collocation</span>
<span class="example-option">D. Pre-assignment, Decision making, Virtual Teams</span>
</div>
::::

:::: solution
**答案 Answer: D**

Acquire Resources 的工具与技术包括 decision making, interpersonal and team skills, pre-assignment, virtual teams。Colocation 属于 Develop Team。
::::

:::: stem Q9
项目处于执行阶段，你要追踪谁负责执行任务。哪个文件提供这些信息？

Which plan/document shows who is responsible for executing tasks?

<div class="example-options">
<span class="example-option">A. Resource Management Plan</span>
<span class="example-option">B. Resource histograms</span>
<span class="example-option">C. Responsibility assignment matrix</span>
<span class="example-option">D. Talk to the team</span>
</div>
::::

:::: solution
**答案 Answer: C. Responsibility assignment matrix**

RAM 显示工作包和资源/角色之间的责任对应关系，RACI 是常见形式。
::::

## Lecture 4 Communications & Risk Management

:::: stem L4-E1
**决策树与 EMV Decision Tree Analysis**

两个方案如下：

| 方案 | 情景 | 概率 | 收入 | 投资成本 |
|---|---|:---:|:---:|:---:|
| 新建工厂 | 强需求 | 60% | \$200M | \$120M |
| 新建工厂 | 弱需求 | 40% | \$90M | \$120M |
| 升级工厂 | 强需求 | 60% | \$120M | \$50M |
| 升级工厂 | 弱需求 | 40% | \$60M | \$50M |

求两个方案的 EMV，并选择更优方案。
::::

:::: solution
新建工厂：

$$
EMV=0.6(200-120)+0.4(90-120)=48-12=36M
$$

升级工厂：

$$
EMV=0.6(120-50)+0.4(60-50)=42+4=46M
$$

升级工厂 EMV 更高，且弱需求时仍为正收益，因此选择升级工厂。
::::

:::: stem Q1
以下哪项是 communications model 的最基本组成？

Which are the most fundamental components of the communications model?

<div class="example-options">
<span class="example-option">A. Sender, Receiver, Medium and interference</span>
<span class="example-option">B. Sender, Receiver, Feedback</span>
<span class="example-option">C. Sender, Message, Medium and noise</span>
<span class="example-option">D. Sender, Receiver, Message</span>
</div>
::::

:::: solution
**答案 Answer: D. Sender, Receiver, Message**

最小通信模型至少需要发送者、接收者和消息。Medium, noise, feedback 是完整模型中的重要组成，但题目问 most fundamental。
::::

:::: stem Q2
以下哪项准确描述 communications medium？

Which item accurately describes a communications medium?

<div class="example-options">
<span class="example-option">A. The email system used</span>
<span class="example-option">B. The moderator of a SharePoint site</span>
<span class="example-option">C. The air surrounding the sender and receiver</span>
<span class="example-option">D. The average round trip delay of the message</span>
</div>
::::

:::: solution
**答案 Answer: A**

Medium 是消息传递的渠道或媒介，例如 email system, meeting, report, portal。
::::

:::: stem Q3
Pull communication 最适合什么？

Pull communication is best for what?

<div class="example-options">
<span class="example-option">A. Distributing information to many, in an efficient way</span>
<span class="example-option">B. Puts version control at greater risk</span>
<span class="example-option">C. Is most appropriate for small amounts of information</span>
<span class="example-option">D. Is most appropriate for low numbers of communication channels</span>
</div>
::::

:::: solution
**答案 Answer: A**

Pull communication 适合大量信息或大量受众，由接收者按需访问，例如知识库、intranet、在线资料库。
::::

:::: stem Q4
Project reporting 属于什么？

Project reporting:

<div class="example-options">
<span class="example-option">A. Is a tool or technique within Manage Communications</span>
<span class="example-option">B. Is an output of Manage Communications</span>
<span class="example-option">C. Is an output of Monitor Communications</span>
<span class="example-option">D. Is a tool or technique within Monitor Communications</span>
</div>
::::

:::: solution
**答案 Answer: A**

Project reporting 是 Manage Communications 的工具与技术，用于收集和发布项目信息。
::::

:::: stem Q5
6 名团队成员向项目经理汇报。共有多少沟通渠道？

Six team members report to a project manager. How many communication channels are there?

<div class="example-options">
<span class="example-option">A. 24</span>
<span class="example-option">B. 21</span>
<span class="example-option">C. 15</span>
<span class="example-option">D. 18</span>
</div>
::::

:::: solution
**答案 Answer: B. 21**

总人数为 7：

$$
Channels=\frac{n(n-1)}{2}=\frac{7\times6}{2}=21
$$
::::

:::: stem Q6
原团队有 6 名成员，下一阶段新增 3 人、离开 2 人。由于这些变化，需要新增多少沟通渠道？

A team has 6 members. Three more members are added and two current members leave. How many new communication channels are added?

<div class="example-options">
<span class="example-option">A. 21</span>
<span class="example-option">B. 7</span>
<span class="example-option">C. 5</span>
<span class="example-option">D. No changes are needed</span>
</div>
::::

:::: solution
**答案 Answer: B. 7**

原来总人数为项目经理 + 6 = 7：

$$
\frac{7\times6}{2}=21
$$

变化后团队成员为 7 人，总人数为项目经理 + 7 = 8：

$$
\frac{8\times7}{2}=28
$$

新增渠道：

$$
28-21=7
$$
::::

:::: stem Q7
Manage Communications 的输出可能包括什么？

Outputs from Manage Communications might include what?

<div class="example-options">
<span class="example-option">A. Change requests</span>
<span class="example-option">B. Expert judgment</span>
<span class="example-option">C. Meetings</span>
<span class="example-option">D. Project document updates, including updates to issue log</span>
</div>
::::

:::: solution
**答案 Answer: D**

Manage Communications 的输出包括 project communications, project management plan updates, project documents updates, organizational process assets updates。
::::

:::: stem Q8
确保项目信息及时、适当收集、创建、分发、存储、检索、管理、监控和最终处置的过程是？

The process of ensuring timely and appropriate collection, creation, distribution, storage, retrieval, management, monitoring, and ultimate disposition of project information is:

<div class="example-options">
<span class="example-option">A. Plan Communication Management</span>
<span class="example-option">B. Manage Communications</span>
<span class="example-option">C. Monitor Communications</span>
<span class="example-option">D. Manage Stakeholder Engagement</span>
</div>
::::

:::: solution
**答案 Answer: B. Manage Communications**

这是 Manage Communications 的定义句。
::::

:::: stem Q9
以下哪项准确描述 Probability and Impact Matrix？

Which statement accurately describes a Probability and Impact Matrix?

<div class="example-options">
<span class="example-option">A. It is used in Perform Quantitative Risk Analysis</span>
<span class="example-option">B. It compares risks by largest EMV impact</span>
<span class="example-option">C. It helps identify risks with high probability and impact for prioritization</span>
<span class="example-option">D. It is best for cumulative probability curves of complex systems</span>
</div>
::::

:::: solution
**答案 Answer: C**

Probability and Impact Matrix 属于定性风险分析，用概率和影响组合来给风险排序。B 的 EMV 属于定量分析。
::::

:::: stem Q10
项目测试需要昂贵的 Direct-Attached Storage Device。楼上冲床振动可能损坏设备。以下哪项是 risk mitigation？

Which option is risk mitigation?

<div class="example-options">
<span class="example-option">A. Ask the punch press operator to notify you before operation so you can shut down the device</span>
<span class="example-option">B. Mount the storage device in a rack with elastic mounts for vibration isolation</span>
<span class="example-option">C. Purchase a service contract so the device is replaced if damaged</span>
<span class="example-option">D. Cross your fingers and hope</span>
</div>
::::

:::: solution
**答案 Answer: B**

Mitigation 是降低风险发生概率或影响。弹性安装架直接降低振动影响。C 更接近 transfer，D 是 passive accept。
::::

:::: stem Q11
风险可以从哪里发现？

Risks can be found where?

<div class="example-options">
<span class="example-option">A. Cost estimates with wide ranges</span>
<span class="example-option">B. Task durations with wide ranges</span>
<span class="example-option">C. Positive side-effects that may not be immediately apparent</span>
<span class="example-option">D. All of the above</span>
</div>
::::

:::: solution
**答案 Answer: D**

风险可以是负面威胁，也可以是正面机会；成本和工期估算区间很宽也说明不确定性较高。
::::

:::: stem Q12
Task G 的成本分布为：80% 概率 2000 Swiss Francs，15% 概率 3500 Swiss Francs，5% 概率 8200 Swiss Francs。求成本 EMV。

What is the EMV of the cost for Task G?

<div class="example-options">
<span class="example-option">A. 4567 US Dollars</span>
<span class="example-option">B. 2535 US Dollars</span>
<span class="example-option">C. 4567 Swiss Francs</span>
<span class="example-option">D. 2535 Swiss Francs</span>
</div>
::::

:::: solution
**答案 Answer: D. 2535 Swiss Francs**

$$
EMV=0.80(2000)+0.15(3500)+0.05(8200)
$$

$$
EMV=1600+525+410=2535
$$

单位仍为 Swiss Francs。
::::

:::: stem Q13
SWOT 是什么？

SWOT is which of the following?

<div class="example-options">
<span class="example-option">A. Silver Whisker Optimization Technique</span>
<span class="example-option">B. A tool or technique used in identifying risks</span>
<span class="example-option">C. A structured way of ranking risks</span>
<span class="example-option">D. A graphic view of relative probabilities</span>
</div>
::::

:::: solution
**答案 Answer: B**

SWOT 分析 Strengths, Weaknesses, Opportunities, Threats，可用于识别风险。
::::

:::: stem Q14
作为 EPC 公司项目经理，你已经初步识别所有风险，并按类别排列。下一步应该做什么？

You identified all risks initially and arranged them by category. What should you do next?

<div class="example-options">
<span class="example-option">A. Plan Risk responses</span>
<span class="example-option">B. Monitor the identified risks</span>
<span class="example-option">C. Send RBS for experts' opinion</span>
<span class="example-option">D. Find the probabilities and impacts of each risk</span>
</div>
::::

:::: solution
**答案 Answer: D**

识别并分类之后，下一步通常进入定性风险分析：评估每个风险的 probability 和 impact，再进行优先级排序。
::::
