---
author: Ayaskt
---

# CPS Lecture 15 Practice Problems

## 章节目录

- [15-1 复习公式 Formula Review](#15-1-复习公式-formula-review)
  - [15-1-1 角度调制通式 General Angle-Modulated Signal](#15-1-1-角度调制通式-general-angle-modulated-signal)
  - [15-1-2 FM 与 PM 的反推 Reverse Engineering FM and PM](#15-1-2-fm-与-pm-的反推-reverse-engineering-fm-and-pm)
- [15-2 Q1 已知相位项反推消息 Recovering Message from Phase Term](#15-2-q1-已知相位项反推消息-recovering-message-from-phase-term)
  - [15-2-1 题目 Problem](#15-2-1-题目-problem)
  - [15-2-2 解法 Solution](#15-2-2-解法-solution)
- [15-3 Q2 多音角度调制 Multitone Angle Modulation](#15-3-q2-多音角度调制-multitone-angle-modulation)
  - [15-3-1 题目 Problem](#15-3-1-题目-problem)
  - [15-3-2 解法 Solution](#15-3-2-解法-solution)
- [15-4 Q3 Armstrong 间接 FM 设计 Armstrong Indirect FM Design](#15-4-q3-armstrong-间接-fm-设计-armstrong-indirect-fm-design)
  - [15-4-1 题目 Problem](#15-4-1-题目-problem)
  - [15-4-2 解法 Solution](#15-4-2-解法-solution)
- [15-5 Q4 FM 与 PM 带宽敏感性 Bandwidth Sensitivity of FM and PM](#15-5-q4-fm-与-pm-带宽敏感性-bandwidth-sensitivity-of-fm-and-pm)
  - [15-5-1 题目 Problem](#15-5-1-题目-problem)
  - [15-5-2 解法 Solution](#15-5-2-解法-solution)
- [15-6 Q5 单音角度调制带宽 Single-Tone Angle-Modulation Bandwidth](#15-6-q5-单音角度调制带宽-single-tone-angle-modulation-bandwidth)
  - [15-6-1 题目 Problem](#15-6-1-题目-problem)
  - [15-6-2 解法 Solution](#15-6-2-解法-solution)

## 15-1 复习公式 Formula Review

### 15-1-1 角度调制通式 General Angle-Modulated Signal

角度调制信号写成

$$
s(t)=A_c\cos{[2\pi f_c t+\phi(t)]}.
$$

其中 $\phi(t)$ 是消息信号引起的附加相位。瞬时频率为

$$
f_i(t)=f_c+\frac{1}{2\pi}\frac{d\phi(t)}{dt}.
$$

若负载归一化为 $1\,\Omega$，平均功率为

$$
P=\frac{A_c^2}{2}.
$$

---

### 15-1-2 FM 与 PM 的反推 Reverse Engineering FM and PM

FM 与 PM 的相位项关系如下：

$$
\phi_{\mathrm{FM}}(t)=k_f\int_{-\infty}^{t}m(u)\,du,
$$

$$
\phi_{\mathrm{PM}}(t)=k_pm(t).
$$

因此已知相位项 $\phi(t)$ 时：

$$
m_{\mathrm{FM}}(t)=\frac{1}{k_f}\frac{d\phi(t)}{dt},
\qquad
m_{\mathrm{PM}}(t)=\frac{\phi(t)}{k_p}.
$$

Carson 法则：

$$
B_{\mathrm{FM}}\approx 2(\Delta f+B).
$$

对单音消息，$B=f_m$。

## 15-2 Q1 已知相位项反推消息 Recovering Message from Phase Term

### 15-2-1 题目 Problem

:::: stem Q1
考虑已调信号

$$
z(t)=A\cos{\left[2\pi f_c t+4\pi\operatorname{sinc}{(8t)}\right]}.
$$

1. 若 $z(t)$ 是 FM 输出，且 $k_f=1$，求输入消息信号；
2. 若 $z(t)$ 是 PM 输出，且 $k_p=1$，求输入消息信号；
3. 画出可实现 FM 解调的 PLL 框图，并说明各模块作用。
::::

---

### 15-2-2 解法 Solution

:::: solution
记附加相位为

$$
\phi(t)=4\pi\operatorname{sinc}{(8t)}.
$$

若该信号来自 FM：

$$
\phi(t)=k_f\int_{-\infty}^{t}m(u)\,du.
$$

因此

$$
m_{\mathrm{FM}}(t)
=\frac{1}{k_f}\frac{d\phi(t)}{dt}
=4\pi\frac{d}{dt}\operatorname{sinc}{(8t)}.
$$

题中 $k_f=1$，所以

$$
\boxed{
m_{\mathrm{FM}}(t)=32\pi\operatorname{sinc}'{(8t)}
}
$$

若采用归一化定义

$$
\operatorname{sinc}{(x)}=\frac{\sin{(\pi x)}}{\pi x},
$$

则

$$
m_{\mathrm{FM}}(t)
=\frac{8\pi t\cos{(8\pi t)}-\sin{(8\pi t)}}{2t^2},
\qquad t\ne0.
$$

在 $t=0$ 处按极限取值，结果为 $0$。

若该信号来自 PM：

$$
\phi(t)=k_pm(t).
$$

题中 $k_p=1$，因此

$$
\boxed{
m_{\mathrm{PM}}(t)=4\pi\operatorname{sinc}{(8t)}
}
$$

PLL 解调框图如下。鉴相器比较输入 FM 信号与 VCO 输出的相位；环路滤波器滤除高频项并输出控制电压；VCO 根据控制电压调整频率。锁定后，控制电压跟随输入瞬时频率变化，因此可作为 FM 解调输出。

![PLL 方框图](<CPS Lecture 15 Practice Problems.attachments/pll-block-diagram.jpg>)
::::

> [!CAUTION]
> $\operatorname{sinc}$ 有归一化和非归一化两种约定。若课程另行指定 $\operatorname{sinc}{(x)}=\sin{x}/x$，保留 $4\pi\dfrac{d}{dt}\operatorname{sinc}{(8t)}$ 的导数形式，再按指定定义展开。

## 15-3 Q2 多音角度调制 Multitone Angle Modulation

### 15-3-1 题目 Problem

:::: stem Q2
角度调制信号的载波角频率为

$$
\omega_c=2\pi\times10^5.
$$

信号为

$$
\Phi_{\mathrm{FM}}(t)
=10\cos{\left(\omega_c t+5\sin{(3000t)}+10\sin{(2000\pi t)}\right)}.
$$

求：

1. 已调信号功率；
2. 频率偏移；
3. 偏移比；
4. 相位偏移；
5. FM 带宽估计。
::::

---

### 15-3-2 解法 Solution

:::: solution
信号幅度为 $A_c=10$。归一化负载下平均功率为

$$
\boxed{
P=\frac{A_c^2}{2}=50
}
$$

附加相位为

$$
\phi(t)=5\sin{(3000t)}+10\sin{(2000\pi t)}.
$$

瞬时角频率偏移为

$$
\begin{aligned}
\Delta\omega(t)
&=\frac{d\phi(t)}{dt} \\
&=15000\cos{(3000t)}+20000\pi\cos{(2000\pi t)}.
\end{aligned}
$$

最大角频偏按峰值相加估计：

$$
\Delta\omega
=15000+20000\pi
\quad \mathrm{rad/s}.
$$

换算成 Hz：

$$
\boxed{
\Delta f
=\frac{15000+20000\pi}{2\pi}
\approx 12.39\,\mathrm{kHz}
}
$$

两个消息频率分别为

$$
f_1=\frac{3000}{2\pi}\approx477.5\,\mathrm{Hz},
\qquad
f_2=1000\,\mathrm{Hz}.
$$

消息带宽取最高频率

$$
B=1000\,\mathrm{Hz}.
$$

偏移比为

$$
\boxed{
D=\frac{\Delta f}{B}\approx12.39
}
$$

相位偏移峰值按两项峰值相加估计：

$$
\boxed{
\Delta\phi\approx 5+10=15\,\mathrm{rad}
}
$$

Carson 法则给出

$$
\begin{aligned}
B_{\mathrm{FM}}
&\approx2(\Delta f+B)\\
&=2(12.39\,\mathrm{kHz}+1\,\mathrm{kHz})\\
&\approx26.8\,\mathrm{kHz}.
\end{aligned}
$$
::::

## 15-4 Q3 Armstrong 间接 FM 设计 Armstrong Indirect FM Design

### 15-4-1 题目 Problem

:::: stem Q3
设计 Armstrong 间接 FM 调制器，目标为

$$
f_c=97.3\,\mathrm{MHz},
\qquad
\Delta f=10.24\,\mathrm{kHz}.
$$

已知：

- 可用 NBFM 发生器：$f_{c1}=20\,\mathrm{kHz}$，$\Delta f_1=5\,\mathrm{Hz}$；
- 只能使用有限个 frequency doubler；
- 可用 $400\,\mathrm{MHz}$ 到 $500\,\mathrm{MHz}$ 的可调振荡器、混频器和任意规格 BPF。
::::

---

### 15-4-2 解法 Solution

:::: solution
先按目标频偏确定总倍频数：

$$
N=\frac{10.24\,\mathrm{kHz}}{5\,\mathrm{Hz}}
=2048=2^{11}.
$$

因此需要 $11$ 个 frequency doublers。倍频后：

$$
\begin{aligned}
f_{c2}&=20\,\mathrm{kHz}\times2048=40.96\,\mathrm{MHz},\\
\Delta f_2&=5\,\mathrm{Hz}\times2048=10.24\,\mathrm{kHz}.
\end{aligned}
$$

此时频偏已经满足目标。后续只能用变频器调整载波，因为理想混频不会改变 $\Delta f$。

若只允许一次混频，要从 $40.96\,\mathrm{MHz}$ 变到 $97.3\,\mathrm{MHz}$，本振频率必须满足

$$
f_{\mathrm{LO}}=97.3+40.96=138.26\,\mathrm{MHz}
$$

或

$$
f_{\mathrm{LO}}=97.3-40.96=56.34\,\mathrm{MHz}.
$$

这两个值均不在题目给定的 $400\,\mathrm{MHz}$ 到 $500\,\mathrm{MHz}$ 范围内。

因此，按单本振、单次混频解释题面时，精确满足目标频偏并得到 $97.3\,\mathrm{MHz}$ 载波不可行。

若振荡器范围是 OCR 误差，或允许额外本振，则可采用：

$$
\text{NBFM }(20\,\mathrm{kHz},5\,\mathrm{Hz})
\rightarrow
\times 2048
\rightarrow
(40.96\,\mathrm{MHz},10.24\,\mathrm{kHz})
\rightarrow
\text{Mixer with }138.26\,\mathrm{MHz}
\rightarrow
97.3\,\mathrm{MHz}.
$$
::::

> [!WARNING]
> 这个题面的频偏条件和 $400\text{--}500\,\mathrm{MHz}$ 单本振条件存在冲突。若考试或作业给出同题，需先确认本振范围或是否允许两级变频。

## 15-5 Q4 FM 与 PM 带宽敏感性 Bandwidth Sensitivity of FM and PM

### 15-5-1 题目 Problem

:::: stem Q4
给定消息信号

$$
m(t)=\sin{(2000\pi t)},
\qquad
k_f=5000\pi,
\qquad
k_p=10.
$$

1. 估计 FM 与 PM 输出带宽；
2. 若消息幅度加倍，重复计算；
3. 若消息频率加倍，重复计算；
4. 说明 FM 与 PM 带宽对消息频谱的敏感性。
::::

---

### 15-5-2 解法 Solution

:::: solution
原消息频率为

$$
f_m=1000\,\mathrm{Hz}.
$$

FM 峰值频偏为

$$
\Delta f_{\mathrm{FM}}
=\frac{k_f A_m}{2\pi}
=\frac{5000\pi}{2\pi}
=2500\,\mathrm{Hz}.
$$

Carson 法则：

$$
\boxed{
B_{\mathrm{FM}}\approx2(2500+1000)=7000\,\mathrm{Hz}
}
$$

PM 的瞬时频偏为

$$
\Delta f_{\mathrm{PM}}
=k_pA_m f_m
=10\times1\times1000
=10000\,\mathrm{Hz}.
$$

所以

$$
\boxed{
B_{\mathrm{PM}}\approx2(10000+1000)=22000\,\mathrm{Hz}
}
$$

若消息幅度加倍，$A_m=2$：

$$
\Delta f_{\mathrm{FM}}=5000\,\mathrm{Hz},
\qquad
B_{\mathrm{FM}}\approx2(5000+1000)=12000\,\mathrm{Hz}.
$$

$$
\Delta f_{\mathrm{PM}}=20000\,\mathrm{Hz},
\qquad
B_{\mathrm{PM}}\approx2(20000+1000)=42000\,\mathrm{Hz}.
$$

若消息频率加倍，$f_m=2000\,\mathrm{Hz}$，幅度仍为 $1$：

$$
\Delta f_{\mathrm{FM}}=2500\,\mathrm{Hz},
\qquad
B_{\mathrm{FM}}\approx2(2500+2000)=9000\,\mathrm{Hz}.
$$

$$
\Delta f_{\mathrm{PM}}=20000\,\mathrm{Hz},
\qquad
B_{\mathrm{PM}}\approx2(20000+2000)=44000\,\mathrm{Hz}.
$$

整理为表：

| 情况 | $B_{\mathrm{FM}}$ | $B_{\mathrm{PM}}$ |
| --- | --- | --- |
| 原信号 | $7\,\mathrm{kHz}$ | $22\,\mathrm{kHz}$ |
| 幅度加倍 | $12\,\mathrm{kHz}$ | $42\,\mathrm{kHz}$ |
| 频率加倍 | $9\,\mathrm{kHz}$ | $44\,\mathrm{kHz}$ |

FM 的频偏主要由消息幅度决定，消息最高频率通过 Carson 法则中的 $B$ 进入带宽。PM 的频偏与 $A_m f_m$ 成正比，所以对消息频率更敏感。
::::

## 15-6 Q5 单音角度调制带宽 Single-Tone Angle-Modulation Bandwidth

### 15-6-1 题目 Problem

:::: stem Q5
考虑已调信号

$$
s(t)=50\cos{\left[2\pi f_c t+2\sin{(2\pi f_m t)}\right]},
$$

其中

$$
f_c=30\,\mathrm{MHz},
\qquad
f_m=100\,\mathrm{Hz}.
$$

1. 求调制指数 $\beta$；
2. 若采用 FM，求带宽；
3. 若采用 PM，求带宽。
::::

---

### 15-6-2 解法 Solution

:::: solution
该信号的附加相位为

$$
\phi(t)=2\sin{(2\pi f_m t)}.
$$

对单音 FM，标准形式为

$$
s_{\mathrm{FM}}(t)
=A_c\cos{\left[2\pi f_c t+\beta\sin{(2\pi f_m t)}\right]}.
$$

因此

$$
\boxed{
\beta=2
}
$$

FM 中

$$
\beta=\frac{\Delta f}{f_m},
$$

所以

$$
\Delta f=\beta f_m=2\times100=200\,\mathrm{Hz}.
$$

Carson 法则给出

$$
\boxed{
B_{\mathrm{FM}}\approx2(200+100)=600\,\mathrm{Hz}
}
$$

若按 PM 理解，$2$ 是峰值相位偏移。PM 的峰值频偏为

$$
\Delta f_{\mathrm{PM}}
=\beta f_m
=200\,\mathrm{Hz}.
$$

因此

$$
\boxed{
B_{\mathrm{PM}}\approx2(200+100)=600\,\mathrm{Hz}
}
$$

本题是单音信号，且给出的相位形式相同，所以 FM 与 PM 的 Carson 带宽数值相同。区别在于：FM 中 $\beta=\Delta f/f_m$；PM 中 $\beta$ 先表示峰值相位偏移，再通过导数产生同样的频偏。
::::
