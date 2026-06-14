---
lastUpdated: 2026-05-31T14:55:30+08:00
---
# Lecture 10 Revision 复习

<LyricCard
  title="Before Summer"
  artist="塞壬唱片-MSR"
  lang="en"
  netease-url="https://music.163.com/#/song?id=2051789190"
>
  <LyricLine
    original="Even if the sky is gray your're sunny"
    translation="天空阴沉也无妨，你会带来晴天"
  />
  <LyricLine
    original="Always finding time to play it's funny"
    translation="总在为玩耍寻找时间，这多有趣"
  />
</LyricCard>

![alt text](<CCD Lecture 9 Oscillators.attachments/1780209422588.JPG>)

## 章节目录

- [章节目录](#章节目录)
- [10-1 放大器 Amplifiers](#10-1-放大器-amplifiers)
- [10-2 混频器 Mixers](#10-2-混频器-mixers)
- [10-3 LC 电路与匹配网络 LC Circuits and Matching Networks](#10-3-lc-电路与匹配网络-lc-circuits-and-matching-networks)
- [10-4 振荡器 Oscillators](#10-4-振荡器-oscillators)
- [10-5 综合例题 Review Exercises](#10-5-综合例题-review-exercises)
- [Summary](#summary)

复习时先判断题目属于哪类模块，再选对应模型。常见入口如下。

| 模块 | 先判断什么 | 常用模型 |
| --- | --- | --- |
| 放大器 | 直流偏置还是交流小信号 | Q 点、$r_e'$ 模型、输入/输出电阻 |
| 混频器 | 上变频、下变频或镜像问题 | 乘法恒等式、超外差频率关系 |
| LC/匹配 | 谐振、带宽还是功率传输 | $f_r$、$Q$、$\Gamma$、L 型匹配 |
| 振荡器 | 起振条件还是频率计算 | Barkhausen 条件、反馈网络谐振 |

## 10-1 放大器 Amplifiers

放大器题目通常先判断是直流分析还是交流分析。

| 分析类型 | 处理方式 |
| --- | --- |
| 直流分析 | 耦合/旁路电容开路，信号源与负载被隔离 |
| 交流分析 | 耦合/旁路电容短路，直流电源为交流地 |

分压偏置的戴维南等效：

$$
V_{TH}=V_{CC}\frac{R_2}{R_1+R_2}
$$

$$
R_{TH}=R_1\parallel R_2
$$

基极电流：

$$
I_B=\frac{V_{TH}-V_{BE}}{R_{TH}+(\beta_{DC}+1)R_E}
$$

静态点：

$$
I_C=\beta_{DC}I_B
$$

$$
V_{CE}=V_{CC}-I_CR_C-I_ER_E
$$

小信号发射极电阻：

$$
r_e'\approx\frac{25\,\mathrm{mV}}{I_E}
$$

共射放大器：

$$
A_v=-\frac{R_C}{r_e'}
$$

带负载时：

$$
A_v=-\frac{R_C\parallel R_L}{r_e'}
$$

没有发射极旁路电容时：

$$
A_v\approx-\frac{R_C}{r_e'+R_E}
$$

共集放大器：

$$
A_v\approx1
$$

$$
R_{in(base)}=\beta_{ac}(r_e'+R_E')
$$

共基放大器：

$$
A_v\approx\frac{R_C}{r_e'}
$$

$$
R_{in}\approx r_e'
$$

## 10-2 混频器 Mixers

混频器用非线性乘法产生新频率。两个单音相乘：

$$
\cos(\omega_1t)\cos(\omega_2t)
=\frac{1}{2}\cos((\omega_1-\omega_2)t)
+\frac{1}{2}\cos((\omega_1+\omega_2)t)
$$

因此输出中会有：

$$
\omega_{\mathrm{sum}}=\omega_1+\omega_2
$$

$$
\omega_{\mathrm{diff}}=|\omega_1-\omega_2|
$$

| 场景 | 保留分量 | 目的 |
| --- | --- | --- |
| 上变频 | 和频 | 把基带搬到射频 |
| 下变频 | 差频 | 把射频搬到中频或基带 |

超外差接收机中：

$$
f_{\mathrm{IF}}=|f_{\mathrm{LO}}-f_{\mathrm{RF}}|
$$

镜像频率与目标射频频率位于本振频率两侧，并且到本振频率的距离相同：

$$
|f_{\mathrm{image}}-f_{\mathrm{LO}}|
=|f_{\mathrm{RF}}-f_{\mathrm{LO}}|
=f_{\mathrm{IF}}
$$

镜像抑制依赖前端选择性，常用高 $Q$ 带通滤波器。

## 10-3 LC 电路与匹配网络 LC Circuits and Matching Networks

谐振频率：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

串联 RLC 谐振时阻抗最小：

$$
Z_{\min}=R
$$

并联 LC 槽路谐振时导纳最小、阻抗最大。

品质因数：

$$
Q=\frac{f_r}{BW}
$$

对电感：

$$
Q_L=\frac{\omega L}{R}
$$

对电容：

$$
Q_C=\omega CR
$$

串并联等效：

$$
R_P=R_S(1+Q^2)
$$

$$
X_P=X_S\left(1+\frac{1}{Q^2}\right)
$$

高 $Q$ 时：

$$
R_P\approx R_SQ^2
$$

$$
X_P\approx X_S
$$

最大平均功率传输需要复共轭匹配：

$$
Z_L=Z_0^*
$$

反射系数：

$$
\Gamma=\frac{Z_2-Z_1}{Z_2+Z_1}
$$

回波损耗：

$$
RL=-20\log_{10}|\Gamma|
$$

失配损耗：

$$
ML=-10\log_{10}(1-|\Gamma|^2)
$$

L 型匹配网络中，若要把较小电阻 $R_-$ 匹配到较大电阻 $R_+$：

$$
Q=\sqrt{\frac{R_+}{R_-}-1}
$$

$$
X_S=QR_-
$$

$$
X_P=\frac{R_+}{Q}
$$

## 10-4 振荡器 Oscillators

LC 振荡器的基本频率：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

Barkhausen 条件：

$$
|A\beta|\ge1
$$

$$
\angle A\beta=2\pi n
$$

实际理解：

- 起振时需要 $|A\beta|>1$；
- 稳态时有效环路增益回到 $|A\beta|=1$；
- 反馈网络必须选择目标频率；
- 幅度控制避免削波和失真。

三节 RC 相移振荡器：

$$
f=\frac{1}{2\pi RC\sqrt6}
$$

并且放大器增益至少约为

$$
|A|\ge29
$$

Hartley 振荡器：

$$
f_r=\frac{1}{2\pi\sqrt{(L_1+L_2)C}}
$$

Colpitts 振荡器：

$$
C_T=\frac{C_1C_2}{C_1+C_2}
$$

$$
f_r=\frac{1}{2\pi\sqrt{LC_T}}
$$

压控振荡器用控制电压改变变容二极管电容：

$$
\omega_0=\frac{1}{\sqrt{L(C+C_D(V_D))}}
$$

相位噪声可写进输出模型：

$$
v_o(t)=A\cos(\omega_0t+\phi_n(t))
$$

相位噪声在频域中表现为载波附近频谱变宽，在时域中表现为零交叉抖动。

## 10-5 综合例题 Review Exercises

:::: stem L10-E1
共射放大器中，$I_E=2.0\,\mathrm{mA}$，$R_C=2.2\,\mathrm{k}\Omega$，$R_L=10\,\mathrm{k}\Omega$，发射极被有效旁路。估算带负载电压增益。
::::

:::: solution
先求

$$
r_e'=\frac{25\,\mathrm{mV}}{2.0\,\mathrm{mA}}
=12.5\,\Omega
$$

集电极交流等效电阻：

$$
R_C'=R_C\parallel R_L
=2.2\,\mathrm{k}\Omega\parallel10\,\mathrm{k}\Omega
=1.80\,\mathrm{k}\Omega
$$

所以

$$
A_v=-\frac{R_C'}{r_e'}
=-\frac{1.80\,\mathrm{k}\Omega}{12.5\,\Omega}
=-144
$$
::::

:::: stem L10-E2
接收机希望接收 $f_{\mathrm{RF}}=980\,\mathrm{kHz}$，本振频率为 $f_{\mathrm{LO}}=1.435\,\mathrm{MHz}$。求中频和镜像频率。
::::

:::: solution
中频为

$$
f_{\mathrm{IF}}=|f_{\mathrm{LO}}-f_{\mathrm{RF}}|
=|1.435-0.980|\,\mathrm{MHz}
=455\,\mathrm{kHz}
$$

目标频率在本振下方，因此镜像频率在本振上方：

$$
f_{\mathrm{image}}=f_{\mathrm{LO}}+f_{\mathrm{IF}}
=1.435\,\mathrm{MHz}+0.455\,\mathrm{MHz}
=1.890\,\mathrm{MHz}
$$
::::

:::: stem L10-E3
设计一个 L 型匹配网络，把 $10\,\Omega$ 匹配到 $50\,\Omega$，工作频率 $100\,\mathrm{MHz}$。求 $Q$、串联电抗和并联电抗。
::::

:::: solution
较小电阻为

$$
R_-=10\,\Omega
$$

较大电阻为

$$
R_+=50\,\Omega
$$

$$
Q=\sqrt{\frac{R_+}{R_-}-1}
=\sqrt{\frac{50}{10}-1}
=2
$$

串联电抗：

$$
X_S=QR_-=2(10)=20\,\Omega
$$

并联电抗：

$$
X_P=\frac{R_+}{Q}
=\frac{50}{2}
=25\,\Omega
$$

元件类型取决于所选结构。若串联用电感：

$$
L=\frac{X_S}{2\pi f}
=\frac{20}{2\pi(100\times10^6)}
=31.8\,\mathrm{nH}
$$

若并联用电容：

$$
C=\frac{1}{2\pi fX_P}
=\frac{1}{2\pi(100\times10^6)(25)}
=63.7\,\mathrm{pF}
$$
::::

:::: stem L10-E4
Colpitts 振荡器中，$L=10\,\mu\mathrm{H}$，$C_1=100\,\mathrm{pF}$，$C_2=100\,\mathrm{pF}$。求振荡频率。
::::

:::: solution
串联等效电容为

$$
C_T=\frac{C_1C_2}{C_1+C_2}
=\frac{100\,\mathrm{pF}\times100\,\mathrm{pF}}{200\,\mathrm{pF}}
=50\,\mathrm{pF}
$$

所以

$$
f_r=\frac{1}{2\pi\sqrt{LC_T}}
$$

$$
f_r=\frac{1}{2\pi\sqrt{(10\,\mu\mathrm{H})(50\,\mathrm{pF})}}
=7.12\,\mathrm{MHz}
$$
::::

## Summary

| 模块 | 最重要的判断 |
| --- | --- |
| 放大器 | 先直流偏置，再交流小信号；注意负载与旁路电容 |
| 混频器 | 输出同时有和频与差频，必须靠滤波选择 |
| 镜像频率 | 与目标频率关于本振对称，能落到同一个中频 |
| LC 电路 | $Q$ 决定带宽和选择性 |
| 阻抗匹配 | 最大功率传输要求复共轭匹配 |
| 振荡器 | 起振靠环路增益，频率靠高选择性反馈网络 |
| 相位噪声 | 频域是载波裙边，时域是抖动 |
