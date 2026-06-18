---
lastUpdated: 2026-06-12T01:40:38+08:00
---
# Lecture 3-4 Transistors 晶体管

<LyricCover
  image="CCD Lecture 3-4 Transistors.attachments/1779784088824.jpg"
  title="艾蜜莉"
  artist="回春丹"
  lang="zh"
  netease-url="https://music.163.com/#/song?id=1429237296"
>
  <LyricLine original="艾蜜莉啊艾蜜莉，夕阳照进我心底；" />
  <LyricLine original="我要带你去寻找，散落的星星。" />
</LyricCover>

> [!TIP]
> 通信一周学完了电工一学期的内容，唉。

## 章节目录

- [章节目录](#章节目录)
- [3-1 BJT 结构 Bipolar Junction Transistor Structure](#3-1-bjt-结构-bipolar-junction-transistor-structure)
- [3-2 BJT 工作条件 BJT Biasing](#3-2-bjt-工作条件-bjt-biasing)
- [3-3 BJT 电流关系 BJT Current Relations](#3-3-bjt-电流关系-bjt-current-relations)
- [3-4 BJT 工作区与负载线 Operating Regions and Load Line](#3-4-bjt-工作区与负载线-operating-regions-and-load-line)
- [3-5 BJT 作为放大器与开关 Amplifier and Switch](#3-5-bjt-作为放大器与开关-amplifier-and-switch)
- [4-1 JFET 结构与工作原理 JFET Structure and Operation](#4-1-jfet-结构与工作原理-jfet-structure-and-operation)
- [4-2 JFET 特性曲线 JFET Characteristics](#4-2-jfet-特性曲线-jfet-characteristics)
- [4-3 JFET 转移特性与跨导 Transfer Characteristic and Transconductance](#4-3-jfet-转移特性与跨导-transfer-characteristic-and-transconductance)
- [4-4 JFET 偏置 JFET Biasing](#4-4-jfet-偏置-jfet-biasing)
- [4-5 MOSFET](#4-5-mosfet)
- [Summary](#summary)

## 3-1 BJT 结构 Bipolar Junction Transistor Structure

:::: definition BJT
BJT，双极结型晶体管，由 emitter、base、collector 三个区域组成。它同时依靠电子和空穴两种载流子工作。
::::

![alt text](<CCD Lecture 3-4 Transistors.attachments/bjt-structure.jpg>)

BJT 有两种基本类型：

| 类型 | 结构 | 常规电流方向 | 说明 |
| --- | --- | --- | --- |
| npn | n-p-n | 从 collector 流向 emitter | 电子为主要参与者 |
| pnp | p-n-p | 从 emitter 流向 collector | 极性与 npn 相反 |

![alt text](<CCD Lecture 3-4 Transistors.attachments/bjt-types_wide.jpg>)

三个区域的掺杂通常不同：

- emitter 重掺杂，用于注入载流子；
- base 很薄且轻掺杂，减少复合；
- collector 中等掺杂，负责收集载流子并承受较高电压。

## 3-2 BJT 工作条件 BJT Biasing

BJT 正常放大工作时处于 active region。此时：

| 结 | 偏置状态 |
| --- | --- |
| Base-emitter junction | 正向偏置 |
| Base-collector junction | 反向偏置 |

![alt text](<CCD Lecture 3-4 Transistors.attachments/bjt-bias_wide.jpg>)

对 npn 管，正常有

$$
V_C > V_B > V_E
$$

对 pnp 管，电压极性相反。

:::: tip
硅 BJT 的 base-emitter 结在正向导通时常近似为 $V_{BE}\approx0.7\,\mathrm{V}$。
::::

## 3-3 BJT 电流关系 BJT Current Relations

BJT 三端电流满足

$$
I_E = I_C + I_B
$$

直流电流增益定义为

$$
\beta_{\mathrm{DC}} = \frac{I_C}{I_B}
$$

数据手册中常用 $h_{\mathrm{FE}}$ 表示 $\beta_{\mathrm{DC}}$。

另一参数为

$$
\alpha_{\mathrm{DC}} = \frac{I_C}{I_E}
$$

由于 $I_E=I_C+I_B$，故

$$
\alpha_{\mathrm{DC}} < 1
$$

$\alpha_{\mathrm{DC}}$ 与 $\beta_{\mathrm{DC}}$ 的关系为

$$
\alpha_{\mathrm{DC}} = \frac{\beta_{\mathrm{DC}}}{\beta_{\mathrm{DC}}+1}
$$

$$
\beta_{\mathrm{DC}} = \frac{\alpha_{\mathrm{DC}}}{1-\alpha_{\mathrm{DC}}}
$$

![alt text](<CCD Lecture 3-4 Transistors.attachments/bjt-characteristics_wide.jpg>)

:::: stem
若在 BJT 输出特性曲线上读得 $I_B=30\,\mu\mathrm{A}$ 时 $I_C=5.0\,\mathrm{mA}$，求 $\beta_{\mathrm{DC}}$。
::::

:::: solution
由定义

$$
\beta_{\mathrm{DC}} = \frac{I_C}{I_B}
$$

代入可得

$$
\beta_{\mathrm{DC}}
= \frac{5.0\,\mathrm{mA}}{30\,\mu\mathrm{A}}
= 167
$$
::::

## 3-4 BJT 工作区与负载线 Operating Regions and Load Line

BJT 输出特性曲线可分为三个主要区域。

| 区域 | 条件 | 特点 |
| --- | --- | --- |
| Cutoff 截止区 | $I_B\approx0$ | $I_C\approx0$，晶体管近似开路 |
| Active 放大区 | BE 正偏，BC 反偏 | $I_C\approx\beta_{\mathrm{DC}}I_B$ |
| Saturation 饱和区 | BE、BC 都正偏 | $V_{CE}$ 很小，$I_C$ 由外电路限制 |

饱和时常用近似：

$$
V_{CE(\mathrm{sat})} \approx 0.2\,\mathrm{V}
$$

![alt text](<CCD Lecture 3-4 Transistors.attachments/dc-load-line_wide.jpg>)

直流负载线由外部电路决定。对简单 collector 电阻电路，

$$
V_{CC} = I_C R_C + V_{CE}
$$

截止点为

$$
I_C = 0,\quad V_{CE}=V_{CC}
$$

饱和点近似为

$$
I_{C(\mathrm{sat})}
= \frac{V_{CC}-V_{CE(\mathrm{sat})}}{R_C}
$$

:::: stem
已知 $V_{CC}=15\,\mathrm{V}$，$R_C=3.3\,\mathrm{k}\Omega$，饱和时取 $V_{CE(\mathrm{sat})}=0.2\,\mathrm{V}$。求饱和电流与截止电压。
::::

:::: solution
饱和电流为

$$
I_{C(\mathrm{sat})}
= \frac{V_{CC}-V_{CE(\mathrm{sat})}}{R_C}
= \frac{15\,\mathrm{V}-0.2\,\mathrm{V}}{3.3\,\mathrm{k}\Omega}
= 4.48\,\mathrm{mA}
$$

截止时 $I_C=0$，因此

$$
V_{CE(\mathrm{cutoff})}=V_{CC}=15\,\mathrm{V}
$$
::::

---

:::: stem
图中晶体管 $\beta_{\mathrm{DC}}=150$。已知 $V_{BB}=5\,\mathrm{V}$，$R_B=10\,\mathrm{k}\Omega$，$V_{CC}=10\,\mathrm{V}$，$R_C=100\,\Omega$，取 $V_{BE}=0.7\,\mathrm{V}$。求 $I_B$、$I_C$、$I_E$、$V_{CE}$ 与 $V_{CB}$。

![alt text](<CCD Lecture 3-4 Transistors.attachments/bjt-bias-example_wide.jpg>)
::::

:::: solution
基极电流为

$$
I_B = \frac{V_{BB}-V_{BE}}{R_B}
= \frac{5\,\mathrm{V}-0.7\,\mathrm{V}}{10\,\mathrm{k}\Omega}
= 430\,\mu\mathrm{A}
$$

集电极电流为

$$
I_C = \beta_{\mathrm{DC}}I_B
= 150(430\,\mu\mathrm{A})
= 64.5\,\mathrm{mA}
$$

发射极电流为

$$
I_E = I_C + I_B
= 64.5\,\mathrm{mA}+0.43\,\mathrm{mA}
= 64.93\,\mathrm{mA}
$$

集电极-发射极电压：

$$
V_{CE}=V_{CC}-I_CR_C
=10\,\mathrm{V}-(64.5\,\mathrm{mA})(100\,\Omega)
=3.55\,\mathrm{V}
$$

集电极-基极电压：

$$
V_{CB}=V_{CE}-V_{BE}
=3.55\,\mathrm{V}-0.7\,\mathrm{V}
=2.85\,\mathrm{V}
$$

由于 $V_{CB}>0$，collector-base 结反向偏置。
::::

## 3-5 BJT 作为放大器与开关 Amplifier and Switch

BJT 可把直流电源能量转换为交流信号能量，因此可作为放大器。小信号分析中，输入交流信号叠加在直流偏置上，输出常出现相位反转。

BJT 也可作为开关：

| 状态 | 近似模型 | 负载状态 |
| --- | --- | --- |
| Cutoff | 开路 | OFF |
| Saturation | 闭合开关 | ON |

:::: stem
LED 需要约 $30\,\mathrm{mA}$ 电流。已知 $V_{CC}=9\,\mathrm{V}$，$V_{LED}=1.6\,\mathrm{V}$，$V_{CE(\mathrm{sat})}=0.3\,\mathrm{V}$，$R_C=220\,\Omega$，$R_B=3.3\,\mathrm{k}\Omega$，$\beta_{\mathrm{DC}}=50$。若为保证饱和取两倍最小基极电流，求输入方波高电平 $V_{in}$。

![alt text](<CCD Lecture 3-4 Transistors.attachments/bjt-switch-example_wide.jpg>)
::::

:::: solution
先求饱和集电极电流：

$$
I_{C(\mathrm{sat})}
= \frac{V_{CC}-V_{LED}-V_{CE(\mathrm{sat})}}{R_C}
= \frac{9-1.6-0.3}{220}
= 32.3\,\mathrm{mA}
$$

最小基极电流：

$$
I_{B(\min)}
= \frac{I_{C(\mathrm{sat})}}{\beta_{\mathrm{DC}}}
= \frac{32.3\,\mathrm{mA}}{50}
= 646\,\mu\mathrm{A}
$$

取两倍安全裕量：

$$
I_B = 2I_{B(\min)} = 1.29\,\mathrm{mA}
$$

因此

$$
I_B = \frac{V_{in}-V_{BE}}{R_B}
$$

代入 $V_{BE}=0.7\,\mathrm{V}$：

$$
V_{in}=I_BR_B+V_{BE}
=(1.29\,\mathrm{mA})(3.3\,\mathrm{k}\Omega)+0.7\,\mathrm{V}
=4.96\,\mathrm{V}
$$

故输入高电平约取 $5\,\mathrm{V}$。
::::

## 4-1 JFET 结构与工作原理 JFET Structure and Operation

:::: definition JFET
JFET，即结型场效应晶体管，通过 gate-source PN 结的反向偏置改变沟道宽度，从而控制 drain current。
::::

![alt text](<CCD Lecture 3-4 Transistors.attachments/jfet-structure_wide.jpg>)

JFET 有三个端点：

| 端点 | 英文 | 说明 |
| --- | --- | --- |
| Source | 源极 | 多数载流子进入沟道 |
| Drain | 漏极 | 多数载流子离开沟道 |
| Gate | 栅极 | 控制沟道宽度，通常反向偏置 |

对 n-channel JFET，通常有

$$
V_{GS} \le 0
$$

当 $V_{GS}$ 更负时，耗尽层变宽，沟道变窄，$I_D$ 减小。

![alt text](<CCD Lecture 3-4 Transistors.attachments/jfet-operation_wide.jpg>)

## 4-2 JFET 特性曲线 JFET Characteristics

JFET 漏极特性曲线主要分为三段。

![alt text](<CCD Lecture 3-4 Transistors.attachments/jfet-drain-curve.jpg>)

| 区域 | 英文 | 特点 |
| --- | --- | --- |
| 欧姆区 | Ohmic region | $I_D$ 与 $V_{DS}$ 近似满足 Ohm 定律 |
| 恒流区 | Active / constant-current region | $I_D$ 主要由 $V_{GS}$ 决定 |
| 击穿区 | Breakdown region | 电流急剧增大，可能损坏器件 |

夹断电压 Pinch-off voltage $V_P$ 表示沟道进入夹断状态所需的 $V_{DS}$。对 n-channel JFET，数据手册常给出 $V_{GS(\mathrm{off})}<0$，其幅值与 $V_P$ 相关。

:::: stem
图中 JFET 有 $V_{GS(\mathrm{off})}=-4\,\mathrm{V}$，$I_{DSS}=12\,\mathrm{mA}$，$R_D=560\,\Omega$。当 $V_{GS}=0$ 时，求使器件刚进入恒流区所需的最小 $V_{DD}$。

![alt text](<CCD Lecture 3-4 Transistors.attachments/jfet-example.jpg>)
::::

:::: solution
当 $V_{GS}=0$ 时，进入恒流区的最小条件可取

$$
V_{DS} \approx V_P = 4\,\mathrm{V}
$$

此时

$$
I_D = I_{DSS} = 12\,\mathrm{mA}
$$

电阻压降为

$$
V_{R_D}=I_DR_D
=(12\,\mathrm{mA})(560\,\Omega)
=6.72\,\mathrm{V}
$$

由 KVL：

$$
V_{DD}=V_{DS}+V_{R_D}
=4\,\mathrm{V}+6.72\,\mathrm{V}
=10.72\,\mathrm{V}
$$

故最小 $V_{DD}$ 约为 $10.7\,\mathrm{V}$。
::::

## 4-3 JFET 转移特性与跨导 Transfer Characteristic and Transconductance

:::: definition JFET 转移特性 Transfer Characteristic
JFET 转移特性表示 $I_D$ 随 $V_{GS}$ 的变化关系，通常在恒流区内使用。
::::

![alt text](<CCD Lecture 3-4 Transistors.attachments/jfet-transfer_wide.jpg>)

Shockley 方程为

$$
I_D = I_{DSS}\left(1-\frac{V_{GS}}{V_{GS(\mathrm{off})}}\right)^2
$$

其中 $V_{GS(\mathrm{off})}$ 为使 $I_D$ 近似降为 0 的 gate-source 电压。

跨导定义为

$$
g_m = \frac{\Delta I_D}{\Delta V_{GS}}
$$

若已知 $g_{m0}$，可用近似式

$$
g_m = g_{m0}\left(1-\frac{V_{GS}}{V_{GS(\mathrm{off})}}\right)
$$

其中

$$
g_{m0} = \frac{2I_{DSS}}{|V_{GS(\mathrm{off})}|}
$$

:::: tip
JFET 的 $g_m$ 不是常数。工作点改变时，转移曲线斜率也随之改变。
::::

## 4-4 JFET 偏置 JFET Biasing

JFET 常见偏置方式如下。

| 偏置方式 | 特点 | 说明 |
| --- | --- | --- |
| Self-bias | 简单常用 | gate 近似为 $0\,\mathrm{V}$，source 电阻产生负 $V_{GS}$ |
| Voltage-divider bias | 稳定性更好 | gate 电压由分压器设置 |
| Current-source bias | 电流更稳定 | drain current 对 $V_{GS}$ 变化不敏感 |

**自偏置 Self-Bias**：对 n-channel JFET，gate 通过 $R_G$ 接地，故

$$
V_G \approx 0
$$

$$
V_S = I_D R_S
$$

因此

$$
V_{GS} = V_G - V_S = -I_D R_S
$$

若根据目标工作点选择源极电阻：

$$
R_S = \left|\frac{V_{GS}}{I_D}\right|
$$

> [!NOTE]
> **分压偏置 Voltage-Divider Bias** 的 gate 电压由 $R_1$、$R_2$ 分压设定，不依赖于 $I_D$：
>
> $$
> V_G = V_{DD}\frac{R_2}{R_1+R_2}
> $$
>
> source 电压仍为 $V_S=I_DR_S$，故
>
> $$
> V_{GS} = V_G - I_DR_S
> $$
>
> 与 Shockley 方程 $I_D=I_{DSS}(1-V_{GS}/V_{GS(\mathrm{off})})^2$ 联立可解出 Q 点。分压偏置比自偏置的 $I_D$ 对器件参数变化更不敏感，因为 $V_G$ 被分压器固定。

## 4-5 MOSFET

:::: definition MOSFET
MOSFET 是 gate 与沟道之间由二氧化硅绝缘层隔开的场效应晶体管。其输入电阻很高，但也更容易受静电影响。
::::

MOSFET 可分为 depletion MOSFET 与 enhancement MOSFET。

| 类型 | 是否有预先形成的沟道 | 工作模式 |
| --- | --- | --- |
| D-MOSFET | 有 | depletion 或 enhancement |
| E-MOSFET | 无 | 只能 enhancement |

![D-MOSFET 与 E-MOSFET](<CCD Lecture 3-4 Transistors.attachments/mosfet-types_wide.jpg>)

对 n-channel E-MOSFET，只有当

$$
V_{GS} > V_{GS(\mathrm{th})}
$$

时才形成导电沟道。其转移特性常写为

$$
I_D = K\left(V_{GS}-V_{GS(\mathrm{th})}\right)^2
$$

![alt text](<CCD Lecture 3-4 Transistors.attachments/emosfet-transfer_wide.jpg>)

对 n-channel D-MOSFET，可近似使用与 JFET 类似的形式：

$$
I_D \cong I_{DSS}\left(1-\frac{V_{GS}}{V_{GS(\mathrm{off})}}\right)^2
$$

![alt text](<CCD Lecture 3-4 Transistors.attachments/dmosfet-transfer_wide.jpg>)

MOSFET 使用时需要注意静电防护：

- 器件应保存在导电泡棉或防静电袋中；
- 测试仪器和工作台应接地；
- 操作人员应使用带串联高阻的接地腕带；
- 电路上电时不要随意插拔 MOSFET；
- 直流电源关闭时，不应单独给 gate 加信号。

:::: tip
接地腕带中串联高阻是为了限流。若人体误触电源，高阻可降低危险电流。
::::

## Summary

| 内容 | 公式 / 结论 | 使用条件 |
| --- | --- | --- |
| BJT 电流 | $I_E=I_C+I_B$ | 三端电流关系 |
| BJT beta | $\beta_{\mathrm{DC}}=I_C/I_B$ | active region |
| BJT alpha | $\alpha_{\mathrm{DC}}=I_C/I_E$ | $\alpha_{\mathrm{DC}}<1$ |
| BJT 饱和电流 | $I_{C(\mathrm{sat})}=(V_{CC}-V_{CE(\mathrm{sat})})/R_C$ | 简单 collector 电阻电路 |
| BJT 截止 | $I_B\approx0,\ I_C\approx0$ | 开关 OFF |
| BJT 饱和 | $V_{CE}\approx0.2\,\mathrm{V}$ | 开关 ON |
| JFET 转移特性 | $I_D=I_{DSS}(1-V_{GS}/V_{GS(\mathrm{off})})^2$ | 恒流区 |
| JFET 跨导 | $g_m=\Delta I_D/\Delta V_{GS}$ | 小信号斜率 |
| JFET 自偏置 | $V_{GS}=-I_DR_S$ | n-channel，$V_G\approx0$ |
| E-MOSFET | $I_D=K(V_{GS}-V_{GS(\mathrm{th})})^2$ | $V_{GS}>V_{GS(\mathrm{th})}$ |
