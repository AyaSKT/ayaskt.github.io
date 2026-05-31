# Lecture 8 LC Circuits and Matching Networks LC 电路与匹配网络

**If I leave here tomorrow**  
**如果明天我将离开**

**Would you still remember me?**  
**你还会记得我吗？**

<div align="right">——Lynyrd Skynrd《Free Bird》</div>

![alt text](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/1780209189821.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [8-1 LC 元件与谐振 LC Components and Resonance](#8-1-lc-元件与谐振-lc-components-and-resonance)
  - [8-1-1 实际电容与电感 Practical Capacitors and Inductors](#8-1-1-实际电容与电感-practical-capacitors-and-inductors)
  - [8-1-2 串联谐振 Series Resonance](#8-1-2-串联谐振-series-resonance)
  - [8-1-3 带通响应与 Q Band-Pass Response and Q](#8-1-3-带通响应与-q-band-pass-response-and-q)
  - [8-1-4 并联 LC 与 Tank Circuit](#8-1-4-并联-lc-与-tank-circuit)
  - [8-1-5 高频寄生参数 High Frequency Parasitics](#8-1-5-高频寄生参数-high-frequency-parasitics)
- [8-2 阻抗匹配 Impedance Matching](#8-2-阻抗匹配-impedance-matching)
  - [8-2-1 串并联等效转换 Series to Parallel Conversion](#8-2-1-串并联等效转换-series-to-parallel-conversion)
  - [8-2-2 最大功率传输 Maximum Power Transfer](#8-2-2-最大功率传输-maximum-power-transfer)
  - [8-2-3 反射系数、回波损耗与失配损耗 Reflection Coefficient, Return Loss and Mismatch Loss](#8-2-3-反射系数回波损耗与失配损耗-reflection-coefficient-return-loss-and-mismatch-loss)
  - [8-2-4 匹配网络 Matching Networks](#8-2-4-匹配网络-matching-networks)
- [8-3 例题 Exercises](#8-3-例题-exercises)
- [Summary](#summary)

## 8-1 LC 元件与谐振 LC Components and Resonance



### 8-1-1 实际电容与电感 Practical Capacitors and Inductors

理想电容只储存电场能量，理想电感只储存磁场能量。但在 RF 频率下，实际元件一定有损耗。

| 元件 | 理想功能 | 主要损耗 |
| --- | --- | --- |
| 电容 Capacitor | 存储电场能量 | 极板间漏电 |
| 电感 Inductor | 存储磁场能量 | 绕线电阻 |

:::: definition LC 储能 Energy Stored in L and C
电容储存电场能量，电感储存磁场能量：

$$
E_C=\frac{1}{2}CV^2
$$

$$
E_L=\frac{1}{2}LI^2
$$

LC 电路中的能量在 $E_C$ 与 $E_L$ 之间周期性交换，实际电阻会把一部分能量耗散掉。
::::

损耗用品质因数表示。对电感：

$$
Q_L=\frac{\text{电抗}}{\text{电阻}}
=\frac{\omega L}{R}
$$

对电容：

$$
Q_C=\frac{\text{电纳}}{\text{电导}}
=\frac{\omega C}{G}
=\omega C R
$$

。

损耗因数定义为

$$
D=\frac{1}{Q}
$$

因此 $Q$ 越高，损耗越小，频率选择性通常也越好。


---

### 8-1-2 串联谐振 Series Resonance

串联 RLC 电路的阻抗为

$$
Z=R+j(X_L-X_C)
$$

其中

$$
X_L=\omega L
$$

$$
X_C=\frac{1}{\omega C}
$$

。

谐振发生在

$$
X_L=X_C
$$

即

$$
\omega_0 L=\frac{1}{\omega_0 C}
$$

所以

$$
\omega_0=\frac{1}{\sqrt{LC}}
$$

$$
f_0=\frac{1}{2\pi\sqrt{LC}}
$$

。

串联谐振时，电感和电容的虚部抵消，阻抗最小：

$$
Z_{\min}=R
$$

因此串联 RLC 可以用作陷波滤波器，也可以换位置做带通滤波器。

![串联谐振与带通响应](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_resonance_response_wide.jpg>)


---

### 8-1-3 带通响应与 Q Band-Pass Response and Q

如果把输出取在合适位置，串联谐振电路可以形成带通响应。峰值出现在谐振频率。

带宽定义为输出降到最大值 $1/\sqrt{2}$，也就是 $0.707$ 倍时两个频率之间的间隔。

对串联 RLC：

$$
BW=\frac{R}{2\pi L}
$$

品质因数可写成

$$
Q=\frac{\omega_0 L}{R}
$$

也可写成

$$
Q=\frac{f_r}{BW}
$$

。

若带通响应近似关于中心频率对称，两个 $-3\,\mathrm{dB}$ 截止频率可估算为

$$
f_1=f_r-\frac{BW}{2}
$$

$$
f_2=f_r+\frac{BW}{2}
$$

$Q$ 越大，频响曲线越窄，选择性越强。

![谐振响应与 Q 对带宽的影响](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_q_bandwidth_wide.jpg>)

:::: tip
高 $Q$ 不表示信号一定更大，主要表示带宽更窄、选择性更强。
::::


---

### 8-1-4 并联 LC 与 Tank Circuit

并联 LC 电路常称为槽路 Tank Circuit。这里的电阻往往不是外加电阻，而是电感绕线本身的内阻。

并联 RLC 的精确谐振频率可写为

$$
f_r=\frac{1}{2\pi}\sqrt{\frac{1}{LC}-\frac{R^2}{L^2}}
$$

但当 $Q>10$ 时，损耗项通常可忽略：

$$
f_r\approx \frac{1}{2\pi\sqrt{LC}}
$$

。

并联谐振时导纳最小，所以阻抗最大。若把槽路作为负载，它可以在谐振频率附近产生带通滤波。

![Tank circuit band-pass](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_19_tank_circuit_bpf_wide.jpg>)

高 $Q$ 近似下，槽路谐振处的最大阻抗常写作

$$
Z_{\max}\approx Q^2R
$$

槽路中，能量在 $L$ 的磁场和 $C$ 的电场之间来回交换。

在低于 $100\,\mathrm{kHz}$ 的频率下，RC 滤波器往往更方便；高频射频电路里，RLC 模块更常用。多个 RLC 小节串联时，也常用滤波器阶数或极点数描述。


---

### 8-1-5 高频寄生参数 High Frequency Parasitics

在高频下，元件不再只是一个元件。

电感会表现出：

- 绕线电阻；
- 线圈间杂散电容；
- 原本的电感。

电阻也可能有：

- 引线电感；
- 引线间杂散电容。

![高频寄生参数](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_20_high_frequency_parasitics.jpg>)

因此射频 PCB 上应尽量缩短引线长度。多数高频异常最终可归因于寄生 RLC 效应。

## 8-2 阻抗匹配 Impedance Matching



### 8-2-1 串并联等效转换 Series to Parallel Conversion

在某一个特定频率下，可以把串联 RLC 与并联 RLC 互相等效。这个转换通常保持品质因数不变：

$$
Q_S=Q_P=Q
$$

对串联网络：

$$
Q_S=\frac{X_S}{R_S}
$$

对并联网络：

$$
Q_P=\frac{R_P}{X_P}
$$

。

转换公式为

$$
R_P=R_S(1+Q^2)
$$

$$
X_P=X_S\left(1+\frac{1}{Q^2}\right)
$$

当 $Q>10$ 时：

$$
R_P\approx R_SQ^2
$$

$$
X_P\approx X_S
$$

。

这个近似很常用：从串联等效到并联等效会大幅提高等效电阻，但电抗基本不变。


---

### 8-2-2 最大功率传输 Maximum Power Transfer

通信系统常由很多模块组成。每个模块可以用戴维南等效看成源电压加源阻抗，后面接负载阻抗。

![通信模块的戴维南视角](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_23_max_power_blocks.jpg>)

设源阻抗为

$$
Z_0=R_0+jX_0
$$

负载阻抗为

$$
Z_L=R_L+jX_L
$$

最大平均功率传输条件是**复共轭匹配 Complex Conjugate Matching**：

$$
Z_L=Z_0^*
$$

即

$$
R_L=R_0
$$

且

$$
X_L=-X_0
$$

。

若阻抗不匹配，一部分功率会被反射回去。反射不只是浪费功率，也可能造成后级异常、驻波、额外失真。


---

### 8-2-3 反射系数、回波损耗与失配损耗 Reflection Coefficient, Return Loss and Mismatch Loss

反射系数定义为

$$
\Gamma=\frac{Z_2-Z_1}{Z_2+Z_1}
$$

完美匹配时：

$$
\Gamma=0
$$

。

回波损耗通常写作

$$
RL=-20\log_{10}|\Gamma|
$$

回波损耗越大，说明反射越小。

失配损耗表示由于阻抗失配损失掉的功率：

$$
ML=-10\log_{10}(1-|\Gamma|^2)
$$

。


---

### 8-2-4 匹配网络 Matching Networks

如果源电阻与负载电阻天生不同，就需要匹配网络把一侧“看起来”的阻抗变成另一侧需要的值。

L 型匹配网络的规则：

- 串联电抗放在较低电阻一侧；
- 并联电抗放在较高电阻一侧；
- $X_S$ 和 $X_P$ 不能是同类型元件；
- 如果需要直流隔断，优先用电容。

![匹配网络规则](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_30_matching_network_rule.jpg>)

假设要把较小电阻 $R_-$ 匹配到较大电阻 $R_+$，则

$$
Q=\sqrt{\frac{R_+}{R_-}-1}
$$

串联电抗：

$$
X_S=QR_-
$$

并联电抗：

$$
X_P=\frac{R_+}{Q}
$$

。

再根据元件类型换算：

$$
X_L=\omega L
$$

$$
X_C=\frac{1}{\omega C}
$$

。

若源或负载本身带有寄生电抗，可以：

- 把寄生电抗吸收到匹配网络中；
- 或先把电抗谐振掉，再匹配电阻部分。

![复数阻抗匹配](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_complex_matching_wide.jpg>)

## 8-3 例题 Exercises

:::: stem L8-E1
求能与 $12\,\mathrm{pF}$ 电容在 $49\,\mathrm{MHz}$ 谐振的电感值，并用 $\mu\mathrm{H}$ 表示。

::::

:::: solution
由

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

反解得

$$
L=\frac{1}{(2\pi f_r)^2C}
$$

代入：

$$
L=\frac{1}{(2\pi\cdot49\times10^6)^2(12\times10^{-12})}
$$

$$
L=8.79\times10^{-7}\,\mathrm{H}
$$

因此

$$
L=0.879\,\mu\mathrm{H}
$$
::::

:::: stem L8-E2
谐振电路的中心频率为 $28\,\mathrm{MHz}$，$Q=70$。求带宽。

::::

:::: solution
由

$$
Q=\frac{f_r}{BW}
$$

可得

$$
BW=\frac{f_r}{Q}
=\frac{28\,\mathrm{MHz}}{70}
=0.4\,\mathrm{MHz}
$$

即

$$
BW=400\,\mathrm{kHz}
$$
::::

:::: stem L8-E3
设计一个匹配网络，把 $5\,\Omega$ 源电阻匹配到 $50\,\Omega$ 负载电阻。工作频率为 $100\,\mathrm{MHz}$。

![匹配网络例题](<CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_31_matching_network_example.jpg>)
::::

:::: solution
较小电阻为

$$
R_-=5\,\Omega
$$

较大电阻为

$$
R_+=50\,\Omega
$$

先求 $Q$：

$$
Q=\sqrt{\frac{R_+}{R_-}-1}
=\sqrt{\frac{50}{5}-1}
=3
$$

串联电抗：

$$
X_S=QR_-=3(5)=15\,\Omega
$$

并联电抗：

$$
X_P=\frac{R_+}{Q}
=\frac{50}{3}
=16.67\,\Omega
$$

若选串联电感：

$$
L=\frac{X_S}{2\pi f}
=\frac{15}{2\pi(100\times10^6)}
=23.9\,\mathrm{nH}
$$

若选并联电容：

$$
C=\frac{1}{2\pi f X_P}
=\frac{1}{2\pi(100\times10^6)(16.67)}
=95.5\,\mathrm{pF}
$$

另一种 L/C 互换结构也可以，具体取决于是否需要直流隔断或偏置通路。
::::

## Summary

| 内容 | 结论 |
| --- | --- |
| 电感 Q | $Q_L=\omega L/R$ |
| 电容 Q | $Q_C=\omega CR$ |
| 谐振频率 | $f_r=1/(2\pi\sqrt{LC})$ |
| 串联 RLC 谐振 | 阻抗最小 |
| 并联 LC 槽路谐振 | 阻抗最大 |
| 带宽 | $Q=f_r/BW$ |
| 高频寄生 | 引线电感、杂散电容、绕线电阻 |
| 串并联转换 Series to Parallel | $R_P=R_S(1+Q^2)$ |
| 最大功率传输 Maximum Power Transfer | $Z_L=Z_0^*$ |
| 反射系数 Reflection Coefficient | $\Gamma=(Z_2-Z_1)/(Z_2+Z_1)$ |
| 回波损耗 Return Loss | $RL=-20\log_{10}|\Gamma|$ |
| L 型匹配网络 L Matching Network | 串联元件靠近低电阻侧，并联元件靠近高电阻侧 |
