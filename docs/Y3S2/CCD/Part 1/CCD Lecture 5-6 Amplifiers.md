# Lecture 5-6 Amplifiers 放大器

**Все забере тихе море,**  
**宁静的大海会带走一切，**  

**Лиш дай йому свої думи.**  
**把你的想法告诉它。**  


<div align="right">——SadSvit《Море (海)》</div>



## 章节目录

- [章节目录](#章节目录)
- [5-1 放大器直流分析 DC Analysis](#5-1-放大器直流分析-dc-analysis)
  - [5-1-1 戴维南等效 Thevenin Equivalent](#5-1-1-戴维南等效-thevenin-equivalent)
  - [5-1-2 静态工作点 Q-Point](#5-1-2-静态工作点-q-point)
- [5-2 晶体管交流模型 AC Transistor Models](#5-2-晶体管交流模型-ac-transistor-models)
  - [5-2-1 r 参数 r Parameters](#5-2-1-r-参数-r-parameters)
  - [5-2-2 h 参数 h Parameters](#5-2-2-h-参数-h-parameters)
- [5-3 共射放大器 Common-Emitter Amplifier](#5-3-共射放大器-common-emitter-amplifier)
  - [5-3-1 相位反转 Phase Inversion](#5-3-1-相位反转-phase-inversion)
  - [5-3-2 交流等效 AC Equivalent](#5-3-2-交流等效-ac-equivalent)
  - [5-3-3 输入电阻与基极信号 Input Resistance and Base Signal](#5-3-3-输入电阻与基极信号-input-resistance-and-base-signal)
  - [5-3-4 电压增益 Voltage Gain](#5-3-4-电压增益-voltage-gain)
  - [5-3-5 旁路电容与负载效应 Bypass Capacitor and Loading](#5-3-5-旁路电容与负载效应-bypass-capacitor-and-loading)
- [6-1 共集放大器 Common-Collector Amplifier](#6-1-共集放大器-common-collector-amplifier)
- [6-2 共基放大器 Common-Base Amplifier](#6-2-共基放大器-common-base-amplifier)
- [6-3 电流增益、功率增益与多级增益 Current, Power and Multistage Gain](#6-3-电流增益功率增益与多级增益-current-power-and-multistage-gain)
- [6-4 例题 Exercises](#6-4-例题-exercises)
- [Summary](#summary)

## 5-1 放大器直流分析 DC Analysis

放大器分析通常分两步：先求直流偏置，再求交流小信号响应。直流偏置决定晶体管是否工作在放大区，也决定小信号模型里的参数。

对 BJT 共射放大器，直流分析时：

- 耦合电容和旁路电容视为开路；
- 信号源和负载电阻被隔离；
- 只保留偏置网络、晶体管、集电极电阻和发射极电阻。


---

### 5-1-1 戴维南等效 Thevenin Equivalent

分压偏置网络可以从基极看进去做戴维南等效。

![分压偏置的戴维南等效](<CCD Lecture 5-6 Amplifiers.attachments/amp_08_thevenin_bias.jpg>)

若上拉电阻为 $R_1$，下拉电阻为 $R_2$，电源为 $V_{CC}$，则

$$
V_{TH}=V_{CC}\frac{R_2}{R_1+R_2}
$$

$$
R_{TH}=R_1\parallel R_2
$$

对 npn 晶体管，基极-发射极回路满足

$$
V_{TH}=I_BR_{TH}+V_{BE}+I_ER_E
$$

且

$$
I_E=(\beta_{DC}+1)I_B
$$

所以

$$
I_B=\frac{V_{TH}-V_{BE}}{R_{TH}+(\beta_{DC}+1)R_E}
$$

再由

$$
I_C=\beta_{DC}I_B
$$

求出静态电流。


---

### 5-1-2 静态工作点 Q-Point

静态工作点由直流集电极电流 $I_C$ 和集电极-发射极电压 $V_{CE}$ 给出。

$$
V_E=I_ER_E
$$

$$
V_C=V_{CC}-I_CR_C
$$

$$
V_{CE}=V_C-V_E
$$

如果 $V_{CE}$ 太小，晶体管进入饱和；如果 $I_C$ 接近零，则进入截止。放大器希望静态点留在放大区，并给交流摆幅留出空间。

## 5-2 晶体管交流模型 AC Transistor Models

交流分析关注信号的小变化，而不是直流总量。因此把晶体管换成小信号模型会更清楚。


---

### 5-2-1 r 参数 r Parameters

课程中主要使用 r 参数模型。常用参数包括：

| 参数 | 含义 |
| --- | --- |
| $r_e'$ | 从发射极看进去的小信号电阻 |
| $r_b'$ | 基极内部小信号电阻 |
| $r_c'$ | 集电极小信号电阻 |
| $\beta_{ac}r_e'$ | 从基极看进去的等效输入电阻 |
| $\alpha_{ac}I_e$ 或 $\beta_{ac}I_b$ | 集电极受控电流源 |

![r 参数模型](<CCD Lecture 5-6 Amplifiers.attachments/amp_18_r_parameter_model.jpg>)

一般分析中，$r_b'$ 很小，可以近似短路；$r_c'$ 很大，可以近似开路。这样 BJT 就变成一个输入电阻加受控电流源。

小信号发射极电阻可由直流发射极电流估算：

$$
r_e'\approx\frac{25\,\mathrm{mV}}{I_E}
$$

其中 $I_E$ 用安培，$r_e'$ 得到欧姆。


---

### 5-2-2 h 参数 h Parameters

数据手册常给 h 参数，因为它们容易测量。课程中只需要掌握它们和 r 参数的关系：

| h 参数 | 常见含义 | r 参数近似 |
| --- | --- | --- |
| $h_{ie}$ | 共射输入电阻 | $\beta_{ac}r_e'$ |
| $h_{fe}$ | 共射电流增益 | $\beta_{ac}$ |
| $h_{ib}$ | 共基输入电阻 | $r_e'$ |
| $h_{fb}$ | 共基电流增益 | $\alpha_{ac}$ |

![h 参数与 r 参数关系](<CCD Lecture 5-6 Amplifiers.attachments/amp_23_h_to_r.jpg>)

## 5-3 共射放大器 Common-Emitter Amplifier

共射放大器的输入加在基极，输出从集电极取出，发射极对交流信号通常接地。

![共射放大器](<CCD Lecture 5-6 Amplifiers.attachments/amp_24_common_emitter_amp.jpg>)


---

### 5-3-1 相位反转 Phase Inversion

共射放大器的输出与输入相差 $180^\circ$。

当基极电压上升时，基极电流增加，集电极电流也增加。集电极电流增加会让 $R_C$ 上的压降变大，因此集电极电压下降。输入上升、输出下降，所以出现相位反转。

![共射放大器的相位反转](<CCD Lecture 5-6 Amplifiers.attachments/amp_25_phase_inversion.jpg>)


---

### 5-3-2 交流等效 AC Equivalent

做交流等效时：

- 耦合电容和旁路电容按短路处理；
- 直流电源按交流地处理；
- 晶体管换成 r 参数小信号模型。

![共射放大器交流等效](<CCD Lecture 5-6 Amplifiers.attachments/amp_30_ac_equivalent.jpg>)

直流电源之所以是交流地，是因为理想直流源内阻近似为零，交流电压不能在其两端形成变化。


---

### 5-3-3 输入电阻与基极信号 Input Resistance and Base Signal

若发射极被旁路电容短路到交流地，则从基极看进去的输入电阻为

$$
R_{in(base)}=\beta_{ac}r_e'
$$

总输入电阻还要与偏置电阻并联：

$$
R_{in(tot)}=R_1\parallel R_2\parallel R_{in(base)}
$$

如果信号源有内阻 $R_s$，基极实际得到的信号电压为分压结果：

$$
V_b=V_s\frac{R_{in(tot)}}{R_s+R_{in(tot)}}
$$

![基极信号分压](<CCD Lecture 5-6 Amplifiers.attachments/amp_32_base_signal_divider.jpg>)


---

### 5-3-4 电压增益 Voltage Gain

电压增益定义为

$$
A_v=\frac{V_c}{V_b}
$$

发射极被有效旁路时，共射放大器从基极到集电极的电压增益近似为

$$
A_v=-\frac{R_C}{r_e'}
$$

负号表示相位反转。

如果考虑信号源内阻造成的输入衰减，则总电压增益为

$$
A_{v(overall)}=\frac{V_c}{V_s}=A_v\frac{V_b}{V_s}
$$

![基极到集电极电压增益](<CCD Lecture 5-6 Amplifiers.attachments/amp_38_voltage_gain.jpg>)


---

### 5-3-5 旁路电容与负载效应 Bypass Capacitor and Loading

发射极旁路电容的作用是让发射极在交流上接地，从而获得最大电压增益。

设计经验是：在最低工作频率下，旁路电容的容抗至少比 $R_E$ 小 10 倍：

$$
X_C\le \frac{R_E}{10}
$$

$$
C\ge \frac{1}{2\pi f_{\min}X_C}
$$

![发射极旁路电容的作用](<CCD Lecture 5-6 Amplifiers.attachments/amp_41_emitter_bypass_effect.jpg>)

若没有旁路电容，发射极电阻会进入交流增益公式：

$$
A_v\approx-\frac{R_C}{r_e'+R_E}
$$

这会降低增益，但也让增益更稳定，因为它不再只依赖 $r_e'$。

若输出接负载 $R_L$，交流下集电极等效电阻变为

$$
R_C'=R_C\parallel R_L
$$

于是

$$
A_v=-\frac{R_C\parallel R_L}{r_e'}
$$

![负载效应](<CCD Lecture 5-6 Amplifiers.attachments/amp_47_load_effect.jpg>)

## 6-1 共集放大器 Common-Collector Amplifier

共集放大器也叫发射极跟随器。输入加在基极，输出从发射极取出，集电极对交流信号接地。

![共集放大器](<CCD Lecture 5-6 Amplifiers.attachments/amp_63_common_collector.jpg>)

它的主要特点是：

| 指标 | 结论 |
| --- | --- |
| 电压增益 | 约等于 1 |
| 相位关系 | 不反相 |
| 输入电阻 | 很高 |
| 电流增益 | 较高 |
| 典型用途 | 缓冲器，减小前级负载效应 |

共集放大器的输入电阻近似为

$$
R_{in(base)}=\beta_{ac}(r_e'+R_E')
$$

其中

$$
R_E'=R_E\parallel R_L
$$

因为输出取在发射极，所以发射极电阻不能被旁路掉。

![共集输入电阻](<CCD Lecture 5-6 Amplifiers.attachments/amp_67_cc_input_resistance.jpg>)

## 6-2 共基放大器 Common-Base Amplifier

共基放大器的输入加在发射极，输出从集电极取出，基极对交流信号接地。

![共基放大器](<CCD Lecture 5-6 Amplifiers.attachments/amp_74_common_base.jpg>)

它的主要特点是：

| 指标 | 结论 |
| --- | --- |
| 电压增益 | 高 |
| 电流增益 | 最大约为 1 |
| 输入电阻 | 很低 |
| 相位关系 | 不反相 |
| 典型用途 | 低源阻抗、高频场景 |

共基放大器电压增益近似为

$$
A_v=\frac{R_C}{r_e'}
$$

输入电阻近似为

$$
R_{in(emitter)}\approx r_e'
$$

![共基电压增益](<CCD Lecture 5-6 Amplifiers.attachments/amp_76_cb_voltage_gain.jpg>)

## 6-3 电流增益、功率增益与多级增益 Current, Power and Multistage Gain

电流增益定义为

$$
A_i=\frac{I_{out}}{I_{in}}
$$

功率增益定义为

$$
A_p=A_vA_i
$$

如果使用 dB 表示：

$$
A_{v,\mathrm{dB}}=20\log_{10}|A_v|
$$

$$
A_{p,\mathrm{dB}}=10\log_{10}A_p
$$

多级放大器的总电压增益为各级电压增益相乘：

$$
A_{v(total)}=A_{v1}A_{v2}\cdots A_{vn}
$$

用 dB 表示时，各级增益直接相加：

$$
A_{v(total),\mathrm{dB}}
=A_{v1,\mathrm{dB}}+A_{v2,\mathrm{dB}}+\cdots+A_{vn,\mathrm{dB}}
$$

![多级电压增益](<CCD Lecture 5-6 Amplifiers.attachments/amp_81_multistage_gain.jpg>)

## 6-4 例题 Exercises

:::: stem L5-E1
某晶体管电路给定 $P_D(\max)=800\,\mathrm{mW}$、$V_{CE}(\max)=15\,\mathrm{V}$、$I_C(\max)=100\,\mathrm{mA}$。已知 $V_{BB}=5\,\mathrm{V}$，$R_B=22\,\mathrm{k}\Omega$，$\beta_{DC}=100$，$R_C=1\,\mathrm{k}\Omega$，取 $V_{BE}=0.7\,\mathrm{V}$。求在不超过任一额定值时 $V_{CC}$ 最大可调到多少，并判断哪个额定值先被超过。若基极偏置被移除，会发生什么？
::::

:::: solution
先求基极电流：

$$
I_B=\frac{V_{BB}-V_{BE}}{R_B}
=\frac{5-0.7}{22\,\mathrm{k}\Omega}
=195\,\mu\mathrm{A}
$$

集电极电流为

$$
I_C=\beta_{DC}I_B
=100(195\,\mu\mathrm{A})
=19.5\,\mathrm{mA}
$$

集电极电阻上的压降为

$$
V_{RC}=I_CR_C
=19.5\,\mathrm{mA}\times1\,\mathrm{k}\Omega
=19.5\,\mathrm{V}
$$

当 $V_{CE}=V_{CE}(\max)=15\,\mathrm{V}$ 时，

$$
V_{CC(\max)}=V_{CE(\max)}+V_{RC}
=15+19.5
=34.5\,\mathrm{V}
$$

此时功耗为

$$
P_D=V_{CE}I_C
=15(19.5\,\mathrm{mA})
=293\,\mathrm{mW}
$$

小于 $800\,\mathrm{mW}$，而 $I_C$ 也远小于 $100\,\mathrm{mA}$，因此先到限制的是 $V_{CE}(\max)$。

若基极偏置被移除，晶体管截止，几乎全部 $V_{CC}$ 会落在晶体管两端，因此仍然最先超过 $V_{CE}(\max)$。
::::

:::: stem L5-E2
分压偏置共射电路中，$V_{CC}=10\,\mathrm{V}$，$R_1=10\,\mathrm{k}\Omega$，$R_2=5.6\,\mathrm{k}\Omega$，$R_C=1.0\,\mathrm{k}\Omega$，$R_E=560\,\Omega$，$\beta_{DC}=100$，取 $V_{BE}=0.7\,\mathrm{V}$。求 $I_C$ 与 $V_{CE}$。

![求直流工作点的电路](<CCD Lecture 5-6 Amplifiers.attachments/amp_12_find_ic_vce.jpg>)
::::

:::: solution
先做戴维南等效：

$$
V_{TH}=10\frac{5.6}{10+5.6}=3.59\,\mathrm{V}
$$

$$
R_{TH}=10\,\mathrm{k}\Omega\parallel5.6\,\mathrm{k}\Omega
=3.59\,\mathrm{k}\Omega
$$

基极电流为

$$
I_B=\frac{V_{TH}-V_{BE}}{R_{TH}+(\beta_{DC}+1)R_E}
$$

$$
I_B=\frac{3.59-0.7}{3.59\,\mathrm{k}\Omega+101(560\,\Omega)}
=48.0\,\mu\mathrm{A}
$$

因此

$$
I_C=\beta_{DC}I_B=4.80\,\mathrm{mA}
$$

$$
I_E=(\beta_{DC}+1)I_B=4.85\,\mathrm{mA}
$$

$$
V_E=I_ER_E=2.72\,\mathrm{V}
$$

$$
V_C=V_{CC}-I_CR_C=10-4.80=5.20\,\mathrm{V}
$$

所以

$$
V_{CE}=V_C-V_E=2.48\,\mathrm{V}
$$
::::

:::: stem L5-E3
共射放大器的直流发射极电流为 $I_E=3.80\,\mathrm{mA}$，$\beta_{ac}=160$。交流源为 $V_s=10\,\mathrm{mV_{rms}}$，源电阻 $R_s=300\,\Omega$，偏置电阻为 $R_1=22\,\mathrm{k}\Omega$、$R_2=6.8\,\mathrm{k}\Omega$。求基极实际信号电压 $V_b$。

![基极信号电压例题](<CCD Lecture 5-6 Amplifiers.attachments/amp_35_ce_problem_base_voltage.jpg>)
::::

:::: solution
先求小信号发射极电阻：

$$
r_e'=\frac{25\,\mathrm{mV}}{3.80\,\mathrm{mA}}
=6.58\,\Omega
$$

从基极看进去：

$$
R_{in(base)}=\beta_{ac}r_e'
=160(6.58)
=1.05\,\mathrm{k}\Omega
$$

总输入电阻为

$$
R_{in(tot)}
=22\,\mathrm{k}\Omega\parallel6.8\,\mathrm{k}\Omega\parallel1.05\,\mathrm{k}\Omega
=875\,\Omega
$$

基极电压为

$$
V_b=V_s\frac{R_{in(tot)}}{R_s+R_{in(tot)}}
$$

$$
V_b=10\,\mathrm{mV}\frac{875}{300+875}
=7.45\,\mathrm{mV}
$$
::::

:::: stem L5-E4
若共射放大器中 $R_C=1.0\,\mathrm{k}\Omega$，$R_L=5.0\,\mathrm{k}\Omega$，发射极被有效旁路，且 $r_e'=6.58\,\Omega$，求带负载后的基极到集电极电压增益。

![负载电压增益例题](<CCD Lecture 5-6 Amplifiers.attachments/amp_48_load_problem.jpg>)
::::

:::: solution
交流下集电极等效电阻为

$$
R_C'=R_C\parallel R_L
=1.0\,\mathrm{k}\Omega\parallel5.0\,\mathrm{k}\Omega
=833\,\Omega
$$

所以

$$
A_v=-\frac{R_C'}{r_e'}
=-\frac{833}{6.58}
=-127
$$

负号表示输出相对输入反相。
::::

:::: stem L6-E1
某共集放大器中，$\beta_{ac}=100$，$r_e'=10\,\Omega$，$R_E=1.0\,\mathrm{k}\Omega$，$R_L=1.0\,\mathrm{k}\Omega$。估算从基极看进去的输入电阻。
::::

:::: solution
发射极交流等效电阻为

$$
R_E'=R_E\parallel R_L
=1.0\,\mathrm{k}\Omega\parallel1.0\,\mathrm{k}\Omega
=500\,\Omega
$$

共集放大器从基极看进去：

$$
R_{in(base)}=\beta_{ac}(r_e'+R_E')
$$

因此

$$
R_{in(base)}
=100(10+500)
=51\,\mathrm{k}\Omega
$$

这就是发射极跟随器适合做缓冲器的原因：它让前级看到较高输入电阻。
::::

## Summary

| 内容 | 结论 |
| --- | --- |
| 直流分析 | 电容开路，求 $I_C$、$V_{CE}$ 与 Q 点 |
| 交流分析 | 电容短路，直流源为交流地 |
| 戴维南等效 | $V_{TH}=V_{CC}R_2/(R_1+R_2)$，$R_{TH}=R_1\parallel R_2$ |
| 小信号发射极电阻 | $r_e'\approx25\,\mathrm{mV}/I_E$ |
| 共射放大器 | 电压增益高，输出反相 |
| 共射增益 | $A_v=-R_C/r_e'$，带负载时 $R_C$ 换成 $R_C\parallel R_L$ |
| 无旁路电容 | $A_v\approx-R_C/(r_e'+R_E)$，增益降低但稳定性提高 |
| 共集放大器 | 电压增益约 1，输入电阻高，适合缓冲 |
| 共基放大器 | 输入电阻低，电压增益高，电流增益约 1 |
| 多级增益 | 线性增益相乘，dB 增益相加 |
