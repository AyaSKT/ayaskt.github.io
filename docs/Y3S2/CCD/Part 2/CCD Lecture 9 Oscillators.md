---
lastUpdated: 2026-06-12T01:40:38+08:00
---
# Lecture 9 Oscillators 振荡器

<LyricCover
  image="CCD Lecture 9 Oscillators.attachments/1780209759050.jpg"
  title="新长征路上的摇滚"
  artist="崔健"
  lang="zh"
  netease-url="https://music.163.com/#/song?id=63705"
>
  <LyricLine original="问问天 问问地 还有多少里" />
  <LyricLine original="求求风 求求雨 快离我远去" />
  <LyricLine original="山也多 水也多 分不清东西" />
  <LyricLine original="人也多 嘴也多 讲不清道理" />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [9-1 LC 振荡与 Barkhausen 条件 LC Oscillation and Barkhausen Criterion](#9-1-lc-振荡与-barkhausen-条件-lc-oscillation-and-barkhausen-criterion)
  - [9-1-1 LC 槽路与飞轮效应 Tank Circuit and Flywheel Effect](#9-1-1-lc-槽路与飞轮效应-tank-circuit-and-flywheel-effect)
  - [9-1-2 Barkhausen 振荡条件 Barkhausen Criterion](#9-1-2-barkhausen-振荡条件-barkhausen-criterion)
- [9-2 相移振荡器 Phase-Shift Oscillator](#9-2-相移振荡器-phase-shift-oscillator)
- [9-3 开环设计方法 Open-Loop Design](#9-3-开环设计方法-open-loop-design)
  - [9-3-1 反馈网络的三个参数 Three Feedback Parameters](#9-3-1-反馈网络的三个参数-three-feedback-parameters)
  - [9-3-2 常见反馈网络 Feedback Network Topologies](#9-3-2-常见反馈网络-feedback-network-topologies)
- [9-4 Hartley 与 Colpitts 振荡器 Hartley and Colpitts Oscillators](#9-4-hartley-与-colpitts-振荡器-hartley-and-colpitts-oscillators)
- [9-5 晶体振荡器与压控振荡器 Crystal and Voltage-Controlled Oscillators](#9-5-晶体振荡器与压控振荡器-crystal-and-voltage-controlled-oscillators)
  - [9-5-1 晶体振荡器 Crystal Oscillators](#9-5-1-晶体振荡器-crystal-oscillators)
  - [9-5-2 压控振荡器 Voltage-Controlled Oscillators](#9-5-2-压控振荡器-voltage-controlled-oscillators)
- [9-6 振荡器指标与相位噪声 Oscillator Metrics and Phase Noise](#9-6-振荡器指标与相位噪声-oscillator-metrics-and-phase-noise)
- [9-7 例题 Exercises](#9-7-例题-exercises)
- [Summary](#summary)

## 9-1 LC 振荡与 Barkhausen 条件 LC Oscillation and Barkhausen Criterion

:::: definition 振荡器 Oscillator
振荡器把直流电源转换为周期性交流输出。通信电路中的本地振荡器、载波源和时钟源都属于这类电路。
::::

理想正弦振荡器希望输出

$$
v_o(t)=A\cos(\omega_0t)
$$

其中频率和幅度都稳定。



### 9-1-1 LC 槽路与飞轮效应 Tank Circuit and Flywheel Effect

并联 LC 槽路中，能量在电容电场和电感磁场之间来回交换。

![LC 槽路振荡过程](<CCD%20Lecture%209%20Oscillators.attachments/osc_04_lc_oscillator_waveform.jpg>)

若电容一开始被充电，闭合回路后：

1. 初始时电容电压最大，电感电流为零；
2. 电容放电，电流逐渐增大，能量转移到电感磁场；
3. 电感电流继续流动，把电容充成相反极性；
4. 过程反向重复，形成振荡。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862289732.png>)

这个能量交换称为**飞轮效应 Flywheel Effect**。理想 LC 槽路的谐振频率为



$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

实际槽路有电阻损耗，振荡会衰减。要得到稳定输出，必须用放大器补偿损耗，并用反馈网络控制相位与幅度。



---

### 9-1-2 Barkhausen 振荡条件 Barkhausen Criterion


![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862264329.png>)

把振荡器看成放大器 $A$ 与反馈网络 $\beta$ 组成的闭环系统。开环时：

$$
V_o=AV_i
$$

$$
V_f=\beta V_o=\beta AV_i
$$

因此环路增益为

$$
L=A\beta
$$

维持振荡的 Barkhausen 条件为：

$$
|A\beta|\ge 1
$$

并且环路总相移为

$$
\angle A\beta=2\pi n
$$

也就是 $0^\circ,360^\circ,720^\circ,\ldots$。

严格说，Barkhausen 条件是必要条件，实际振荡器还需要：

- 起振时 $|A\beta|>1$，让噪声或开关瞬态能被放大；
- 稳态时幅度控制让有效增益回到 $|A\beta|=1$；
- 反馈网络具有足够高的选择性，只让目标频率被强化。

若闭环写成

$$
V_o=A(V_i+\beta V_o)
$$

则

$$
\frac{V_o}{V_i}=\frac{A}{1-A\beta}
$$

当 $A\beta=1$ 时，分母趋近于零，任何很小的内部噪声都可能触发振荡。

## 9-2 相移振荡器 Phase-Shift Oscillator

相移振荡器用一个反相放大器提供 $180^\circ$ 相移，再用多级 RC 网络提供额外 $180^\circ$ 相移，使总相移达到 $360^\circ$。

![相移振荡器](<CCD%20Lecture%209%20Oscillators.attachments/osc_09_phase_shift_circuit.jpg>)

对三节相同的 RC 网络，理想放大器输入阻抗无限大时，振荡频率为

$$
f=\frac{1}{2\pi RC\sqrt{6}}
$$

此时反馈网络的衰减固定，放大器增益至少需要满足

$$
|A|\ge 29
$$

相移振荡器适合音频频率；在高频射频电路中，更常用高 $Q$ 的 LC 反馈网络。

## 9-3 开环设计方法 Open-Loop Design

射频振荡器设计常先看开环参数，再把反馈网络接回形成闭环。

![开环设计视角](<CCD%20Lecture%209%20Oscillators.attachments/osc_14_open_loop_design.jpg>)

开环设计通常分三步：

1. 先认为内部噪声可以触发振荡；
2. 放大器看到反馈网络等效为一个负载阻抗；
3. 反馈网络的等效输入阻抗又受放大器输入阻抗影响，因此需要把两者一起考虑。



### 9-3-1 反馈网络的三个参数 Three Feedback Parameters

设计反馈网络时主要找三个量：

| 参数 | 含义 |
| --- | --- |
| $\beta$ | 反馈网络增益或衰减 |
| $Z_{\mathrm{eff}}$ | 放大器看到的反馈网络等效输入阻抗 |
| $\omega_0$ | 环路谐振角频率 |

只要反馈网络具有高选择性，噪声虽然包含很多频率，但最后只有谐振频率附近的成分被不断强化。


---

### 9-3-2 常见反馈网络 Feedback Network Topologies

课程中给出的反馈网络都可以看成并联 LC 槽路的不同抽头形式。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862560463.png>)

常见形式如下：

| 反馈网络 | 谐振角频率 | 反馈系数 $\beta$ |
| --- | --- | --- |
| 中心接地抽头电感 | $\displaystyle \omega_0=\frac{1}{\sqrt{(L_1+L_2)C}}$ | $\displaystyle \beta=-\frac{L_1}{L_2}$ |
| 中心接地抽头电容 | $\displaystyle \omega_0=\sqrt{\frac{C_1+C_2}{C_1C_2L}}$ | $\displaystyle \beta\approx-\frac{C_1}{C_2}$ |
| 底部接地抽头电感 | $\displaystyle \omega_0=\frac{1}{\sqrt{(L_1+L_2)C}}$ | $\displaystyle \beta=\frac{L_1}{L_1+L_2}$ |
| 底部接地抽头电容 | $\displaystyle \omega_0=\sqrt{\frac{C_1+C_2}{C_1C_2L}}$ | $\displaystyle \beta=\frac{C_2}{C_1+C_2}$ |

高 $Q$ 近似下，这些网络都以槽路谐振频率作为振荡频率。

中心接地抽头电感网络中，放大器看到的等效负载还会受到抽头比例影响，可写成

$$
R_{\mathrm{eff}}
=
R_L\left(\frac{L_2}{L_1}\right)^2
\parallel
\frac{Q\omega L_2^2}{L_1+L_2}
$$

反馈网络被放大器输入端加载后，等效 $Q$ 会下降。更精确的谐振频率为

$$
f_r=
\frac{1}{2\pi\sqrt{LC_T}}
\sqrt{\frac{Q^2}{Q^2+1}}
$$

当 $Q>10$ 时，根号修正项接近 $1$，才可直接用 $1/(2\pi\sqrt{LC_T})$。

## 9-4 Hartley 与 Colpitts 振荡器 Hartley and Colpitts Oscillators

Hartley 振荡器使用抽头电感反馈网络。放大器通常由 BJT 提供，反馈网络由 $L_1$、$L_2$ 和 $C$ 组成。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862626563.png>)

其谐振频率近似为

$$
f_r=\frac{1}{2\pi\sqrt{(L_1+L_2)C}}
$$



Colpitts 振荡器把电感和电容的位置互换，使用抽头电容反馈网络。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862658506.png>)

两个串联电容的等效电容为

$$
C_T=\frac{C_1C_2}{C_1+C_2}
$$

所以谐振频率为

$$
f_r=\frac{1}{2\pi\sqrt{LC_T}}
$$

射频扼流圈 RFC 对直流近似短路，用来给晶体管供电；对射频近似开路，避免射频信号被电源旁路掉。耦合电容负责隔直通交，避免直流偏置进入槽路或输出端。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862836264.png>)

起振时 Colpitts 振荡器需要满足

$$
A_vB>1
$$

稳态维持时近似为

$$
A_vB=1
$$

其中反馈衰减 $B$ 主要由 $C_1$ 和 $C_2$ 的比值决定。

对课程中的抽头电容反馈网络，可近似写为

$$
B=\frac{V_f}{V_{out}}
\approx\frac{X_{C1}}{X_{C2}}
=\frac{C_2}{C_1}
$$

因此自启动时常取

$$
A_v>\frac{C_1}{C_2}
$$

## 9-5 晶体振荡器与压控振荡器 Crystal and Voltage-Controlled Oscillators

![晶体、可变电容与变容二极管 VCO](<CCD%20Lecture%209%20Oscillators.attachments/osc_crystal_vco_wide.jpg>)



### 9-5-1 晶体振荡器 Crystal Oscillators

石英等压电材料有双向效应：

- 机械形变会产生电压；
- 外加电压会产生机械形变。

由于晶体尺寸和切割方式可以做得非常精确，晶体振荡器能产生很稳定的频率。

晶体的等效电路可看成一个串联 RLC 支路，再并联一个电容 $C_P$，对应上图左侧。

晶体的串联谐振与并联谐振频率非常接近，因此总体 $Q$ 很高。普通 LC 电路的高 $Q$ 可能在 $10^3$ 量级，而晶体 $Q$ 常可达到 $2\times10^4$ 左右，所以输出频率成分很纯。

频率稳定度常用 ppm 表示。若稳定度为 $\pm0.001\%$，则

$$
0.001\%=10^{-5}=10\,\mathrm{ppm}
$$

晶振还可以进一步分为：

| 类型 | 特点 |
| --- | --- |
| CXO | 普通晶体振荡器 |
| TCXO | 加温度补偿 |
| DTCXO | 用数字控制改善补偿 |
| OCXO | 恒温槽控制，稳定度更高，但功耗和成本更高 |

晶体常见频率从几 $\mathrm{kHz}$ 到几十 $\mathrm{MHz}$。若需要约 $50$ 到 $100\,\mathrm{MHz}$ 以上的输出，常利用高阶谐振或泛音 overtone，再配合倍频或 PLL。


---

### 9-5-2 压控振荡器 Voltage-Controlled Oscillators

很多通信系统需要调谐振荡频率。改变振荡频率的本质，是改变反馈网络的谐振频率。

早期收音机常用可变电容，转动旋钮改变极板重叠面积：

$$
C=\frac{\epsilon A}{d}
$$

现代电路更多使用变容二极管。变容二极管的结电容 $C_D$ 随反向偏置电压 $V_D$ 改变。

上图右侧给出变容二极管 VCO 的简化结构。直流控制电压通过隔直电容与槽路分离，交流上变容二极管电容并入谐振网络。

若变容二极管电容与槽路电容并联，则角频率可写为

$$
\omega_0=\frac{1}{\sqrt{L(C+C_D(V_D))}}
$$

因此控制电压 $V_D$ 改变 $C_D$，就改变振荡频率。

课程中常用的近似关系为

$$
C_D\approx\frac{C_0}{\sqrt{1+\frac{|V_D|}{0.5\,\mathrm{V}}}}
$$

反向偏置电压越大，结电容通常越小，故谐振频率升高。

> [!NOTE]
> VCO 的**调谐灵敏度 Tuning Sensitivity** 或 **VCO 增益** 定义为
>
> $$
> K_{\mathrm{VCO}}=\frac{\Delta f_{\mathrm{osc}}}{\Delta V_D}\qquad\mathrm{(Hz/V)}
> $$
>
> 此参数直接决定 FM 调制器中给定消息电压产生的频偏大小（参见 Lecture 14）。

Clapp 振荡器可以看成带额外串联电容的 Colpitts 结构。加入变容二极管后，反馈网络总电容由 $C_1$、$C_2$ 和 $C_D$ 的串联组合决定。

![Clapp 压控振荡器](<CCD%20Lecture%209%20Oscillators.attachments/osc_32_clapp_vco.jpg>)

先把 $C_1$、$C_2$ 串联合并：

$$
C_S=\frac{C_1C_2}{C_1+C_2}
$$

再与变容二极管电容串联：

$$
C_T=\frac{C_DC_S}{C_D+C_S}
$$

因此

$$
\omega_0=\frac{1}{\sqrt{LC_T}}
$$

## 9-6 振荡器指标与相位噪声 Oscillator Metrics and Phase Noise

振荡器常见指标包括：

| 指标 | 含义 |
| --- | --- |
| 输出频率范围 | 能调谐覆盖的频率范围 |
| 输出电压摆幅 | 输出信号幅度 |
| 功耗 | 为维持振荡所消耗的功率 |
| 输出波形 | 正弦波、方波，或其他波形 |
| 杂散分量 | 目标频率之外的离散频率分量 |
| 相位噪声 | 输出频率纯度和短期稳定度 |

理想正弦振荡器为

$$
v_o(t)=A\cos(\omega_0t)
$$

实际输出会带有随机相位扰动：

$$
v_o(t)=A\cos(\omega_0t+\phi_n(t))
$$

其中 $\phi_n(t)$ 使零交叉点发生随机偏移，这种时间上的偏移称为抖动。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862907294.png>)

在时域中，可以用眼图观察抖动。把波形按半个周期切成许多段并叠加，若抖动小，交叉点集中，眼图打开；若抖动大，交叉点扩散，眼图闭合。

![alt text](<CCD%20Lecture%209%20Oscillators.attachments/1781862875113.png>)

在频域中，相位噪声表现为载波附近的频谱扩展。常在距离载波 $\Delta f$ 的偏移处，用 $1\,\mathrm{Hz}$ 带宽内的噪声功率相对载波功率表示：

$$
L(\Delta f)\quad [\mathrm{dBc/Hz}]
$$

靠近载波的相位噪声通常最能体现振荡器质量。

## 9-7 例题 Exercises

:::: stem L9-E1
三节相同 RC 相移网络中，$R_1=R_2=R_3=R=10\,\mathrm{k}\Omega$，$C_1=C_2=C_3=C=0.001\,\mu\mathrm{F}$。求相移振荡器的振荡频率。
::::

:::: solution
三节 RC 相移振荡器频率为

$$
f=\frac{1}{2\pi RC\sqrt{6}}
$$

代入

$$
R=10\times10^3\,\Omega
$$

$$
C=0.001\times10^{-6}\,\mathrm{F}=1.0\times10^{-9}\,\mathrm{F}
$$

所以

$$
f=\frac{1}{2\pi(10\times10^3)(1.0\times10^{-9})\sqrt{6}}
$$

$$
f\approx6.5\,\mathrm{kHz}
$$
::::

:::: stem L9-E2
Colpitts 振荡器中，$L=50\,\mathrm{mH}$，$C_1=0.1\,\mu\mathrm{F}$，$C_2=0.01\,\mu\mathrm{F}$。假设反馈网络负载很小且 $Q>10$，求振荡频率。若加载后 $Q=8$，频率变为多少？若 $Q=4$ 呢？

![Colpitts 振荡器例题电路](<CCD%20Lecture%209%20Oscillators.attachments/osc_colpitts_problem_wide.jpg>)
::::

:::: solution
先求串联等效电容：

$$
C_T=\frac{C_1C_2}{C_1+C_2}
$$

$$
C_T=\frac{(0.1\,\mu\mathrm{F})(0.01\,\mu\mathrm{F})}{0.11\,\mu\mathrm{F}}
=0.0091\,\mu\mathrm{F}
$$

高 $Q$ 近似下：

$$
f_r\approx\frac{1}{2\pi\sqrt{LC_T}}
$$

$$
f_r=\frac{1}{2\pi\sqrt{(50\,\mathrm{mH})(0.0091\,\mu\mathrm{F})}}
=7.46\,\mathrm{kHz}
$$

加载后并联谐振频率可近似修正为

$$
f_r=\frac{1}{2\pi\sqrt{LC_T}}\sqrt{\frac{Q^2}{Q^2+1}}
$$

当 $Q=8$：

$$
f_r=7.46\,\mathrm{kHz}\sqrt{\frac{8^2}{8^2+1}}
=7.40\,\mathrm{kHz}
$$

当 $Q=4$：

$$
f_r=7.46\,\mathrm{kHz}\sqrt{\frac{4^2}{4^2+1}}
=7.24\,\mathrm{kHz}
$$

$Q$ 降低时，谐振频率会偏离高 $Q$ 近似值，选择性也会变差。
::::

:::: stem L9-E3
解释为什么振荡器起振时要求 $|A\beta|>1$，但稳定工作时又不能长期保持 $|A\beta|\gg1$。
::::

:::: solution
起振时，电路中只有内部噪声或上电瞬态等很小的初始信号。若

$$
|A\beta|<1
$$

每绕环一周信号都会变小，振荡会衰减。

因此起振时需要

$$
|A\beta|>1
$$

让谐振频率附近的噪声被逐步放大。

但如果长期保持

$$
|A\beta|\gg1
$$

输出幅度会不断增长，直到放大器进入削波或非线性失真。实际振荡器需要幅度限制或自动增益控制，让稳态有效环路增益回到

$$
|A\beta|=1
$$

这样既能维持振荡，又能保持幅度有限。
::::

ss

## Summary

| 内容 | 结论 |
| --- | --- |
| LC 槽路 | 能量在电容电场与电感磁场之间交换 |
| 谐振频率 | $f_r=1/(2\pi\sqrt{LC})$ |
| Barkhausen 幅度条件 | 起振需 $|A\beta|>1$，稳态约为 $|A\beta|=1$ |
| Barkhausen 相位条件 | 环路总相移为 $2\pi n$ |
| 相移振荡器 | 三节 RC 网络，$f=1/(2\pi RC\sqrt6)$，增益至少约 29 |
| Hartley 振荡器 | 抽头电感反馈，$f_r=1/(2\pi\sqrt{(L_1+L_2)C})$ |
| Colpitts 振荡器 | 抽头电容反馈，$C_T=C_1C_2/(C_1+C_2)$ |
| 晶体振荡器 | 高 $Q$，频率稳定度高 |
| 压控振荡器 | 用控制电压改变等效电容，从而调谐频率 |
| 相位噪声 | 表示载波附近的频谱扩展，单位常用 $\mathrm{dBc/Hz}$ |
| 抖动 | 相位噪声在时域中的零交叉时间偏移 |
