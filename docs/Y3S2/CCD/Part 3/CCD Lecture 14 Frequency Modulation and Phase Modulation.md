---
lastUpdated: 2026-06-12T01:40:38+08:00
---
# Lecture 14 Frequency Modulation (FM) & Phase Modulation (PM) 调频与调相

<LyricCover
  image="CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/1780839332491.png"
  title="ありふれてたい"
  artist="花譜"
  lang="ja"
  netease-url="https://music.163.com/#/song?id=2753833710"
>
  <LyricLine
    original="星(ほし)のない夜(よる)，"
    translation="不见星辰的夜幕，"
  />
  <LyricLine
    original="どこにも無(な)いふつう それが素敵(すてき)なので。"
    translation="无处可寻的平凡 才更显美好。"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [14-1 角度调制 Angle Modulation](#14-1-角度调制-angle-modulation)
  - [14-1-1 载波角度 Carrier Angle](#14-1-1-载波角度-carrier-angle)
  - [14-1-2 FM 与 PM 的关系 Relation between FM and PM](#14-1-2-fm-与-pm-的关系-relation-between-fm-and-pm)
- [14-2 FM 表示与频偏 FM Representation and Deviation](#14-2-fm-表示与频偏-fm-representation-and-deviation)
  - [14-2-1 瞬时频率 Instantaneous Frequency](#14-2-1-瞬时频率-instantaneous-frequency)
  - [14-2-2 调频指数 Modulation Index](#14-2-2-调频指数-modulation-index)
- [14-3 FM 频谱与带宽 FM Spectrum and Bandwidth](#14-3-fm-频谱与带宽-fm-spectrum-and-bandwidth)
  - [14-3-1 边频 Side Frequencies](#14-3-1-边频-side-frequencies)
  - [14-3-2 Carson 定则 Carson Rule](#14-3-2-carson-定则-carson-rule)
- [14-4 调频与调相电路 FM and PM Circuits](#14-4-调频与调相电路-fm-and-pm-circuits)
  - [14-4-1 变容二极管 Varactor Diode](#14-4-1-变容二极管-varactor-diode)
  - [14-4-2 间接 FM Indirect FM](#14-4-2-间接-fm-indirect-fm)
- [14-5 FM 解调与抗噪 FM Demodulation and Noise](#14-5-fm-解调与抗噪-fm-demodulation-and-noise)
  - [14-5-1 斜率检波器 Slope Detector](#14-5-1-斜率检波器-slope-detector)
  - [14-5-2 限幅与噪声抑制 Limiting and Noise Suppression](#14-5-2-限幅与噪声抑制-limiting-and-noise-suppression)
- [Summary](#summary)

## 14-1 角度调制 Angle Modulation

### 14-1-1 载波角度 Carrier Angle

正弦载波可写为

$$
c(t)=E_c\cos{(\omega_c t+\phi)}
=E_c\cos{\theta(t)}
$$

AM 改变 $E_c$；FM 和 PM 保持幅度近似恒定，改变 $\theta(t)$。

:::: definition 角度调制 Angle Modulation
**角度调制 Angle Modulation** 通过消息信号改变载波瞬时相位或瞬时频率。FM 和 PM 都属于角度调制。
::::

| 调制方式 | 消息控制量 | 载波幅度 |
| --- | --- | --- |
| AM | 幅度 | 变化 |
| FM | 瞬时频率 | 理想恒定 |
| PM | 瞬时相位 | 理想恒定 |

---

### 14-1-2 FM 与 PM 的关系 Relation between FM and PM

瞬时角频率定义为相位对时间的导数：

$$
\omega_i(t)=\frac{d\theta(t)}{dt}
$$

因此频率和相位不能完全分开看。相位变化的快慢就是频率变化。

FM 的一般形式：

$$
\theta_{\mathrm{FM}}(t)=\omega_c t+k_f\int m(t)\,dt
$$

PM 的一般形式：

$$
\theta_{\mathrm{PM}}(t)=\omega_c t+k_p m(t)
$$

对单音消息，PM 波形可写成

$$
e_{\mathrm{PM}}(t)
=A_c\sin{(\omega_c t+m_p\sin{(\omega_m t)})}
$$

或用 cosine 写作同样形式。PM 调制指数为最大相位偏移：

$$
m_p=\Delta\theta_{\max}
\qquad \mathrm{(rad)}
$$

所以：

- FM 中，消息积分后进入相位；
- PM 中，消息直接进入相位；
- 若先对消息积分再做 PM，可得到 FM；
- 若先对消息微分再做 FM，可得到 PM。

## 14-2 FM 表示与频偏 FM Representation and Deviation

### 14-2-1 瞬时频率 Instantaneous Frequency

FM 发生器可用电压控制振荡器理解：

$$
f_{\mathrm{out}}(t)=f_c+k_f e_i(t)
$$

其中：

- $f_c$：未调制中心频率；
- $k_f$：频偏常数，单位常用 $\mathrm{kHz/V}$；
- $e_i(t)$：消息输入电压。

![FM 波形表示](<CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_representation.jpg>)

当消息为正，瞬时频率高于 $f_c$；当消息为负，瞬时频率低于 $f_c$；消息过零时，瞬时频率等于 $f_c$。

---

### 14-2-2 调频指数 Modulation Index

:::: definition 频偏 Frequency Deviation
**频偏 Frequency Deviation** 是 FM 瞬时频率相对中心频率的最大偏移量。

$$
\Delta f=k_fE_i
$$
::::

![FM 频偏](<CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_deviation.jpg>)

对单音消息，调频指数为

$$
\boxed{m_f=\frac{\Delta f}{f_m}}
$$

其中 $f_m$ 是消息频率。消息幅度决定 $\Delta f$，消息频率决定频率摆动的快慢。

> [!TIP]
> FM 中载波幅度理想恒定。示波器上看到的疏密变化对应瞬时频率，不是包络变化。

## 14-3 FM 频谱与带宽 FM Spectrum and Bandwidth

### 14-3-1 边频 Side Frequencies

单音 FM 可写为

$$
e_{\mathrm{FM}}(t)=E_c\cos{(\omega_c t+m_f\sin{(\omega_m t)})}
$$

FM 频谱含无限多个边频：

$$
f_c\pm nf_m,\qquad n=1,2,3,\ldots
$$

各分量幅度由 Bessel 函数 $J_n(m_f)$ 决定：

$$
E_n=E_cJ_n(m_f)
$$

实际计算中，幅度很小的高阶边频可忽略。课程表格里常把相对幅度低于约 $0.01$ 的项看成不显著。

---

### 14-3-2 Carson 定则 Carson Rule

:::: definition Carson 定则 Carson Rule
**Carson Rule** 用于估算 FM 信号的传输带宽。

$$
\mathrm{BW}_{\mathrm{FM}}\approx 2(\Delta f+f_{m,\max})
$$
::::

用调频指数写：

$$
\mathrm{BW}_{\mathrm{FM}}\approx 2f_m(m_f+1)
$$

Carson 定则约包含 FM 信号总功率的 $98\%$。其中 $\Delta f$ 是载波单侧的最大频偏，而带宽要覆盖载波两侧：

$$
\mathrm{BW}_{\mathrm{FM}}
\approx
2\left(\frac{\Delta f_{\max}}{f_{m,\max}}+1\right)f_{m,\max}
$$

窄带 FM 满足 $m_f\ll1$，主要只有一阶边频。宽带 FM 的边频数量多，带宽也明显增大。

另一个常用指标是**频偏比 Deviation Ratio**：

$$
DR=\frac{\Delta f_{\max}}{f_{m,\max}}
$$

$DR\ge1$ 常称为 wideband FM，$DR<1$ 常称为 narrowband FM。商业 FM 若最大频偏为 $75\,\mathrm{kHz}$，消息频率范围 $30\,\mathrm{Hz}$ 到 $15\,\mathrm{kHz}$，则 $m_f$ 从

$$
\frac{75\,\mathrm{kHz}}{30\,\mathrm{Hz}}=2500
$$

到

$$
\frac{75\,\mathrm{kHz}}{15\,\mathrm{kHz}}=5
$$

变化。

由 Bessel 表还可以估算各频率分量功率。若 $m_f=0.25$，表中约有

$$
J_0\approx0.98,\qquad J_1\approx0.12
$$

对 $10\,\mathrm{kW}$ FM 发射机，载波功率近似为

$$
(0.98)^2(10\,\mathrm{kW})=9.604\,\mathrm{kW}
$$

每个一阶边频功率为

$$
(0.12)^2(10\,\mathrm{kW})=144\,\mathrm{W}
$$

总显著功率约为

$$
9.604\,\mathrm{kW}+144\,\mathrm{W}+144\,\mathrm{W}
=9.892\,\mathrm{kW}
$$

## 14-4 调频与调相电路 FM and PM Circuits

### 14-4-1 变容二极管 Varactor Diode

LC 振荡器频率为

$$
f_c=\frac{1}{2\pi\sqrt{LC}}
$$

改变 $L$ 或 $C$ 都能改变频率，实际电路中更常改变电容。

:::: definition 变容二极管 Varactor Diode
**变容二极管 Varactor Diode** 是反向偏置下作为电压控制电容使用的 PN 结二极管。反向电压改变耗尽层宽度，从而改变结电容。
::::

![变容二极管](<CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_varactor_diode_wide.jpg>)

在变容二极管 FM 调制器中，消息电压改变反向偏置：

$$
C_T=C_1+C_{\mathrm{varactor}}
$$

于是

$$
f_c(t)=\frac{1}{2\pi\sqrt{LC_T(t)}}
$$

![变容二极管 FM 调制器](<CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_varactor_modulator_wide.jpg>)

LC 振荡器简单，但稳定性不如晶体振荡器。温度、电源、元件容差和老化都会造成频率漂移。

> [!NOTE]
> FM 产生方法分为**直接 FM** 和**间接 FM** 两类。直接 FM 用消息电压改变振荡器谐振频率，电路简单但频率稳定度受限于 LC 振荡器。间接 FM 先由晶体振荡器产生稳定载波，再经相位调制和倍频链得到所需频偏。
>
> 变容二极管的结电容 $C_j$ 与反向偏置电压 $V_R$ 的关系可近似为
>
> $$
> C_j \approx \frac{C_0}{\left(1+\dfrac{V_R}{V_0}\right)^n}
> $$
>
> 其中 $C_0$ 为零偏压电容，$V_0$ 为内建电势（硅约 $0.7\,\mathrm{V}$），$n$ 与掺杂分布有关（突变结 $n=1/2$，超突变结 $n>1/2$）。消息电压叠加在直流反向偏置上：$V_R(t)=V_{\mathrm{DC}}+e_m(t)$，改变结电容即改变振荡频率。

---

### 14-4-2 间接 FM Indirect FM

现代 FM 发送机常用稳定晶体振荡器产生载波，再用相位调制和倍频链得到所需频偏。

RC 网络可提供相移。高通 RC 输出可超前输入 $0^\circ$ 到 $90^\circ$，相移近似为

$$
\phi=\tan^{-1}{\left(\frac{X_C}{R}\right)}
$$

其中

$$
X_C=\frac{1}{2\pi fC}
$$

若输出取在低通 RC 的电容端，输出相位滞后，常写为

$$
\theta=-\tan^{-1}{\left(\frac{R}{X_C}\right)}
$$

![相移电路](<CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_phase_shifter.jpg>)

若把相移网络中的电容换成变容二极管，消息信号改变电容，相移也随消息变化，于是得到 PM。

频率倍频器会同时放大载波频率和频偏：

$$
f_{\mathrm{out}}=Nf_{\mathrm{in}}
$$

$$
\Delta f_{\mathrm{out}}=N\Delta f_{\mathrm{in}}
$$

倍频链例题中，若总倍频数为 $N=24$，目标输出频率为 $168.96\,\mathrm{MHz}$，则晶体振荡器频率应为

$$
f_{\mathrm{osc}}=\frac{168.96\,\mathrm{MHz}}{24}
=7.04\,\mathrm{MHz}
$$

若最终需要 $\Delta f=5\,\mathrm{kHz}$，相位调制器起始频偏为

$$
\Delta f_{\mathrm{PM}}
=\frac{5\,\mathrm{kHz}}{24}
=208.33\,\mathrm{Hz}
$$

反过来，若起始频偏为 $200\,\mathrm{Hz}$，经过 $24$ 倍频后：

$$
\Delta f_{\mathrm{out}}=24\times200\,\mathrm{Hz}
=4.8\,\mathrm{kHz}
$$

> [!NOTE]
> 此法也称 **Armstrong 法**。由 FM 与 PM 的关系（见 14-1-2），先对消息积分再做 PM 即得 FM。相位调制器产生的相移有限，直接输出仅为窄带 FM（$m_f\ll1$）。为获得广播 FM 所需的宽频偏（如 $\Delta f=75\,\mathrm{kHz}$），须经倍频链放大。若晶体振荡器频率为 $200\,\mathrm{kHz}$，经多次倍频后可能超出目标频段，此时需混频器将频率搬回而不改变频偏。间接 FM 发射机链路为：晶体振荡器 → 相位调制器 → 倍频链 → 混频器 → 功率放大器。

## 14-5 FM 解调与抗噪 FM Demodulation and Noise

### 14-5-1 斜率检波器 Slope Detector

:::: definition 斜率检波器 Slope Detector
**斜率检波器 Slope Detector** 用调谐电路的幅频斜率先把 FM 转成幅度变化，再用二极管包络检波恢复消息。
::::

![斜率检波器](<CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_slope_detector.jpg>)

当瞬时频率沿调谐曲线移动时，输出幅度随频率变化。这个幅度变化再进入 AM detector。

斜率检波器结构简单，但线性范围有限，对调谐点和幅度噪声比较敏感。

> [!NOTE]
> 调谐电路（LC 槽路）的谐振频率 $f_r$ 偏置于载波频率 $f_c$ 的一侧。当 FM 瞬时频率升高时，工作点沿调谐曲线斜坡向上移动，槽路输出电压幅度增大；瞬时频率降低时，输出幅度减小。频率变化到幅度变化的转换过程为 $\text{FM}\rightarrow\text{AM}\rightarrow\text{audio}$。
>
> 线性范围由调谐曲线斜率线性段决定。频偏超出线性段时，输出幅度与频率不再成正比，解调失真增大。此外，斜率检波器对输入幅度噪声无抑制能力，因此实际 FM 接收机常在斜率检波器前加限幅器。

---

### 14-5-2 限幅与噪声抑制 Limiting and Noise Suppression

FM 的消息在频率变化中，外部噪声很多表现为幅度扰动。因此 FM 接收机可在解调前使用 limiter 去掉幅度尖峰。



AM 中，幅度变化就是消息，噪声幅度会直接进入输出。FM 中，限幅器能削弱幅度噪声。

需要注意，FM 不是完全免疫噪声。靠近目标信号的噪声会改变合成信号相位，而相位扰动会对应到瞬时频率误差。

发射功率常用 Peak Envelope Power, PEP 表示：

$$
PEP=\frac{V_{\mathrm{RMS}}^2}{R}
=
\frac{(V/\sqrt2)^2}{R}
=
\frac{V^2}{2R}
$$

例如

$$
e(t)=2000\sin{(2\pi\times10^8t+2\sin{\pi\times10^4t})}
$$

接 $50\,\Omega$ 天线。由式子直接读出

$$
f_c=100\,\mathrm{MHz},\qquad m_f=2
$$

且

$$
\omega_m=\pi\times10^4=2\pi f_m
$$

所以

$$
f_m=5\,\mathrm{kHz}
$$

频偏为

$$
\Delta f=m_ff_m=2\times5\,\mathrm{kHz}=10\,\mathrm{kHz}
$$

Carson 定则给

$$
BW=2(\Delta f+f_m)=2(10+5)\,\mathrm{kHz}=30\,\mathrm{kHz}
$$

功率为

$$
P=\frac{2000^2}{2(50)}=40\,\mathrm{kW}
$$

## Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| 角度调制 | $c(t)=E_c\cos{\theta(t)}$ | FM/PM 幅度理想恒定 |
| 瞬时频率 | $\omega_i(t)=d\theta(t)/dt$ | 相位变化率就是频率 |
| FM 输出频率 | $f_{\mathrm{out}}=f_c+k_fe_i(t)$ | VCO 模型 |
| 频偏 | $\Delta f=k_fE_i$ | 由消息幅度决定 |
| 调频指数 | $m_f=\Delta f/f_m$ | 单音 FM |
| FM 边频 | $f_c\pm nf_m$ | 幅度由 $J_n(m_f)$ 决定 |
| Carson 定则 | $\mathrm{BW}\approx2(\Delta f+f_{m,\max})$ | 常用带宽估算 |
| 变容 FM | $f_c=1/(2\pi\sqrt{LC_T})$ | 消息改变电容 |
| 倍频器 | $\Delta f_{\mathrm{out}}=N\Delta f_{\mathrm{in}}$ | 频率和频偏同倍数增加 |
| 斜率检波 | FM → AM → envelope detection | 简单但线性一般 |
