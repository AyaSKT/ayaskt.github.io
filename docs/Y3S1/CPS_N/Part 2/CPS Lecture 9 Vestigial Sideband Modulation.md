---
author: Ayaskt
---

# Vestigial Sideband Modulation

## 章节目录

- [9-1 VSB 的动机 Need for VSB](#9-1-vsb-的动机-need-for-vsb)
  - [9-1-1 DSB 与 SSB 的取舍 Trade-Off Between DSB and SSB](#9-1-1-dsb-与-ssb-的取舍-trade-off-between-dsb-and-ssb)
  - [9-1-2 残留边带 Vestigial Sideband](#9-1-2-残留边带-vestigial-sideband)
- [9-2 VSB 调制 VSB Modulation](#9-2-vsb-调制-vsb-modulation)
  - [9-2-1 基本产生过程 Generation Process](#9-2-1-基本产生过程-generation-process)
  - [9-2-2 成形滤波器 Shaping Filter](#9-2-2-成形滤波器-shaping-filter)
- [9-3 VSB 解调与补偿 VSB Demodulation and Compensation](#9-3-vsb-解调与补偿-vsb-demodulation-and-compensation)
  - [9-3-1 同步解调 Synchronous Demodulation](#9-3-1-同步解调-synchronous-demodulation)
  - [9-3-2 接收端补偿 Receiver Compensation](#9-3-2-接收端补偿-receiver-compensation)
  - [9-3-3 互补成形条件 Complementary Shaping Condition](#9-3-3-互补成形条件-complementary-shaping-condition)
- [9-4 VSB 的正交形式 Quadrature Form of VSB](#9-4-vsb-的正交形式-quadrature-form-of-vsb)
- [9-5 VSB 检波与性能 Detection and Performance](#9-5-vsb-检波与性能-detection-and-performance)
- [9-6 例题 Example](#9-6-例题-example)
- [9-7 小结 Summary](#9-7-小结-summary)

## 9-1 VSB 的动机 Need for VSB

### 9-1-1 DSB 与 SSB 的取舍 Trade-Off Between DSB and SSB

DSB 容易产生，但需要 $2B$ 带宽。SSB 只需要 $B$ 带宽，但要么需要很陡的边带滤波器，要么需要近似理想的 Hilbert 相移器。

语音信号在低频端通常有一定间隙，例如电话语音低于约 $300\,\mathrm{Hz}$ 会被削弱。这个间隙可给 SSB 滤波器留过渡带。

视频信号和基带数字信号在低频处有很强分量，直流附近没有可用间隙。此时很难把一个边带干净切掉。

---

### 9-1-2 残留边带 Vestigial Sideband

:::: definition 残留边带调制 Vestigial Sideband Modulation
**残留边带调制 Vestigial Sideband Modulation, VSB** 保留一个完整边带，同时保留另一边带靠近载波处的一小部分残留分量。
::::

VSB 是 DSB 与 SSB 之间的折中。它比 DSB 节省带宽，又比 SSB 容易实现。

![DSB、SSB 与 VSB 频谱对比](<CPS Lecture 9 Vestigial Sideband Modulation.attachments/l9-dsb-ssb-vsb-comparison-wide.jpg>)

典型 VSB 带宽比 SSB 高约 $25\%\text{--}33\%$。它常用于模拟电视 NTSC，也用于 MRI 中减少采集数据量。

## 9-2 VSB 调制 VSB Modulation

### 9-2-1 基本产生过程 Generation Process

VSB 先生成 DSB-SC 或 AM 信号，再通过 VSB 成形滤波器。

课程中用带系数 $2$ 的 DSB 表达式：

$$
\phi_{\mathrm{DSB}}(t)=2m(t)\cos{(\omega_c t)}
$$

其频谱为：

$$
\Phi_{\mathrm{DSB}}(f)=M(f-f_c)+M(f+f_c)
$$

经过发射端 VSB 成形滤波器 $H_i(f)$：

$$
\boxed{
\Phi_{\mathrm{VSB}}(f)
=\left[M(f-f_c)+M(f+f_c)\right]H_i(f)
}
$$

![VSB 调制与成形滤波](<CPS Lecture 9 Vestigial Sideband Modulation.attachments/l9-vsb-shaping-filter-generation-wide.jpg>)

---

### 9-2-2 成形滤波器 Shaping Filter

:::: definition 成形滤波器 Shaping Filter
**成形滤波器 Shaping Filter** 是用于塑造边带保留比例的滤波器。VSB 中的 $H_i(f)$ 通过渐变截止保留一个边带，并保留另一边带的一小段残留部分。
::::

![VSB 成形滤波器响应](<CPS Lecture 9 Vestigial Sideband Modulation.attachments/l9-vsb-filter-response-wide.jpg>)

与 SSB 的理想锐截止不同，VSB 使用渐变截止。过渡带中的残留边带会在解调后与主边带重叠，因此接收端必须补偿。

设残留边带宽度为 $f_v$，消息带宽为 $B$，则正频率 VSB 信号大致占用：

$$
B_{\mathrm{VSB}}\approx B+f_v
$$

当 $f_v$ 较小，VSB 的带宽接近 SSB；当 $f_v$ 增大，VSB 逐渐接近 DSB。

## 9-3 VSB 解调与补偿 VSB Demodulation and Compensation

### 9-3-1 同步解调 Synchronous Demodulation

接收端将 VSB 信号乘以 $2\cos{(\omega_c t)}$：

$$
e(t)=\phi_{\mathrm{VSB}}(t)\,2\cos{(\omega_c t)}
$$

频域中：

$$
\begin{aligned}
E(f)
&=\Phi_{\mathrm{VSB}}(f)*\left[\delta(f-f_c)+\delta(f+f_c)\right]\\
&=\Phi_{\mathrm{VSB}}(f+f_c)+\Phi_{\mathrm{VSB}}(f-f_c)
\end{aligned}
$$

这会把两个边带副本搬回基带。残留边带与主边带在基带处叠加。

![VSB 解调后的重叠与补偿](<CPS Lecture 9 Vestigial Sideband Modulation.attachments/l9-vsb-demod-overlap-wide.jpg>)

---

### 9-3-2 接收端补偿 Receiver Compensation

为了恢复 $M(f)$，接收端输出滤波器 $H_o(f)$ 需要满足：

$$
E(f)H_o(f)=M(f)
$$

代入：

$$
\left[\Phi_{\mathrm{VSB}}(f+f_c)+\Phi_{\mathrm{VSB}}(f-f_c)\right]H_o(f)=M(f)
$$

又因为：

$$
\Phi_{\mathrm{VSB}}(f)
=\left[M(f-f_c)+M(f+f_c)\right]H_i(f)
$$

所以：

$$
\Phi_{\mathrm{VSB}}(f+f_c)
=\left[M(f)+M(f+2f_c)\right]H_i(f+f_c)
$$

$$
\Phi_{\mathrm{VSB}}(f-f_c)
=\left[M(f-2f_c)+M(f)\right]H_i(f-f_c)
$$

低通滤波会去掉 $\pm2f_c$ 附近的项，因此基带内：

$$
E(f)=M(f)\left[H_i(f+f_c)+H_i(f-f_c)\right]
$$

于是：

$$
\boxed{
H_o(f)
=\frac{1}{H_i(f+f_c)+H_i(f-f_c)},
\qquad
\lvert f\rvert\leq B
}
$$

这个式子是 VSB 的核心。发射端怎么残留，接收端就按重叠后的总增益倒数补偿。

---

### 9-3-3 互补成形条件 Complementary Shaping Condition

若发射端成形滤波器设计成：

$$
\boxed{
H_i(f+f_c)+H_i(f-f_c)=1,
\qquad
\lvert f\rvert\leq B
}
$$

则：

$$
\boxed{
H_o(f)=1,
\qquad
\lvert f\rvert\leq B
}
$$

接收端只需普通低通滤波器。此时 $H_i(f)$ 在载波附近的过渡带通常满足互补对称，载波频率处常取半幅：

$$
H_i(f_c)=\frac{1}{2}
$$

![VSB 过渡带互补响应](<CPS Lecture 9 Vestigial Sideband Modulation.attachments/l9-vsb-transition-response.jpg>)

> [!NOTE]
> 旧 CPS 笔记把这个条件解释为“接收端补偿残留边带重叠”。这比只记 $H_o(f)$ 公式更稳，因为 VSB 的失真来源正是重叠区域增益不平坦。

## 9-4 VSB 的正交形式 Quadrature Form of VSB

在满足互补成形条件时，可定义低通信号：

$$
M_v(f)=D(f)M(f)
$$

其中：

$$
D(f)=j\left[1-2H_i(f-f_c)\right]
=-j\left[1-2H_i(f+f_c)\right],
\qquad
\lvert f\rvert\leq B
$$

于是 VSB 可写成正交形式：

$$
\boxed{
\varphi_{\mathrm{VSB}}(t)
=m(t)\cos{(2\pi f_c t)}
+m_v(t)\sin{(2\pi f_c t)}
}
$$

这个形式与 SSB 很像：

$$
\varphi_{\mathrm{SSB}}(t)
=m(t)\cos{(\omega_c t)}
\mp m_h(t)\sin{(\omega_c t)}
$$

区别在于：
- SSB 的正交分量来自 Hilbert 变换 $m_h(t)$；
- VSB 的正交分量来自低通滤波后的 $m_v(t)$；
- VSB 不要求全频带理想 $90^\circ$ 相移。

## 9-5 VSB 检波与性能 Detection and Performance

VSB 可用同步解调精确恢复。若发送端同时发送足够大的载波，VSB 也可使用包络检波或整流检波。

包络检波时仍需满足 AM 的基本条件：

$$
f_c\gg B,
\qquad
A_c+\text{message-related term}\geq0
$$

但 VSB 的正交分量也会进入实际包络。加大载波后的包络检波通常是近似恢复；若要严格恢复，仍以同步检波并配合 $H_o(f)$ 补偿为准。

VSB 的性能位置介于 AM 与 SSB 之间：

| 调制方式 | 带宽 | 产生难度 | 接收难度 | 说明 |
| --- | --- | --- | --- | --- |
| DSB / AM | $2B$ | 低 | AM 可很低 | 带宽浪费 |
| SSB | $B$ | 高 | 高 | 最省带宽 |
| VSB | $B+f_v$ | 中 | 中 | 适合无直流间隙信号 |

VSB 的主要优点：
- 比 DSB 更节省频谱；
- 不需要 SSB 那样陡峭的滤波器；
- 可处理视频这类低频分量很强的信号。

主要局限是仍传输一小部分不需要的边带，带宽高于 SSB。

## 9-6 例题 Example

:::: stem L9-E1
某 VSB 系统的发射端成形滤波器为 $H_i(f)$。同步解调后接收端频谱为：

$$
E(f)=\Phi_{\mathrm{VSB}}(f+f_c)+\Phi_{\mathrm{VSB}}(f-f_c)
$$

推导接收端补偿滤波器 $H_o(f)$，并说明何时 $H_o(f)=1$。
::::

:::: solution
VSB 频谱为：

$$
\Phi_{\mathrm{VSB}}(f)
=\left[M(f-f_c)+M(f+f_c)\right]H_i(f)
$$

因此：

$$
\Phi_{\mathrm{VSB}}(f+f_c)
=\left[M(f)+M(f+2f_c)\right]H_i(f+f_c)
$$

$$
\Phi_{\mathrm{VSB}}(f-f_c)
=\left[M(f-2f_c)+M(f)\right]H_i(f-f_c)
$$

低通后忽略 $\pm2f_c$ 附近项：

$$
E(f)=M(f)\left[H_i(f+f_c)+H_i(f-f_c)\right]
$$

要求 $E(f)H_o(f)=M(f)$，故：

$$
\boxed{
H_o(f)=\frac{1}{H_i(f+f_c)+H_i(f-f_c)}
}
$$

若：

$$
H_i(f+f_c)+H_i(f-f_c)=1,
\qquad
\lvert f\rvert\leq B
$$

则：

$$
\boxed{H_o(f)=1}
$$

此时接收端补偿退化为普通低通滤波。
::::

## 9-7 小结 Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| VSB 思路 | 保留一个边带 + 另一边带残留 | DSB 与 SSB 的折中 |
| VSB 频谱 | $\Phi_{\mathrm{VSB}}(f)=[M(f-f_c)+M(f+f_c)]H_i(f)$ | $H_i$ 为发射端成形滤波器 |
| 带宽 | $B+f_v$ | 通常比 SSB 高约 $25\%\text{--}33\%$ |
| 同步解调 | $E(f)=\Phi(f+f_c)+\Phi(f-f_c)$ | 两个副本在基带重叠 |
| 接收端补偿 | $H_o(f)=1/[H_i(f+f_c)+H_i(f-f_c)]$ | VSB 核心条件 |
| 互补条件 | $H_i(f+f_c)+H_i(f-f_c)=1$ | 接收端只需 LPF |
| 正交形式 | $\varphi_{\mathrm{VSB}}(t)=m(t)\cos{(2\pi f_c t)}+m_v(t)\sin{(2\pi f_c t)}$ | $m_v$ 由低通滤波形成 |
