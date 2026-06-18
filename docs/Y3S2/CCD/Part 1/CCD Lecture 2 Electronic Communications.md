---
lastUpdated: 2026-05-26T16:20:25+08:00
---
# Lecture 2 Electronic Communications 电子通信基础

<LyricCover
  image="CCD Lecture 2 Electronic Communications.attachments/1778848682009.jpg"
  title="燦々"
  artist="Afterglow"
  lang="ja"
  netease-url="https://music.163.com/#/song?id=2079882237"
>
  <LyricLine
    original="「しゃあないな」って 目(め)を伏(ふ)せて，"
    translation="闭上眼低头说着“真厉害”，"
  />
  <LyricLine
    original="大人(おとな)振(ぶ)って しまう様(よう)な。"
    translation="像大人一样。"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [2-1 通信方式 Simplex, Full Duplex and Half Duplex](#2-1-通信方式-simplex-full-duplex-and-half-duplex)
- [2-2 模拟信号与数字信号 Analog and Digital Signals](#2-2-模拟信号与数字信号-analog-and-digital-signals)
- [2-3 采样 Sampling](#2-3-采样-sampling)
- [2-4 基带与宽带传输 Baseband and Broadband Transmission](#2-4-基带与宽带传输-baseband-and-broadband-transmission)
- [2-5 调制与解调 Modulation and Demodulation](#2-5-调制与解调-modulation-and-demodulation)
- [2-6 复用 Multiplexing](#2-6-复用-multiplexing)
- [2-7 电磁频谱与带宽 Spectrum and Bandwidth](#2-7-电磁频谱与带宽-spectrum-and-bandwidth)
- [Summary](#summary)

## 2-1 通信方式 Simplex, Full Duplex and Half Duplex

电子通信可按传输方向分类。

| 类型 | 中文 | 特点 | 例子 |
| --- | --- | --- | --- |
| Simplex | 单工 | 只允许单方向传输 | 广播、电视、遥控 |
| Full duplex | 全双工 | 双方可同时发送和接收 | 电话通话 |
| Half duplex | 半双工 | 双方都能通信，但同一时刻只有一方发送 | 对讲机、部分无线电系统 |

![alt text](<CCD Lecture 2 Electronic Communications.attachments/duplex_wide.jpg>)

需要注意，duplex 只说明通信方向，不直接说明信号是模拟还是数字。

## 2-2 模拟信号与数字信号 Analog and Digital Signals

:::: definition 模拟信号 Analog Signal
模拟信号是随时间连续变化的电压或电流。正弦波、语音电压、视频信号都属于模拟信号。
::::

![alt text](<CCD Lecture 2 Electronic Communications.attachments/analog-signals.jpg>)

:::: definition 数字信号 Digital Signal
数字信号在幅度上取离散值，常用二进制两状态表示信息。
::::

![alt text](<CCD Lecture 2 Electronic Communications.attachments/digital-signals.jpg>)

模拟与数字信号的对比如下。

| 项目 | 模拟信号 | 数字信号 |
| --- | --- | --- |
| 幅度 | 连续变化 | 离散变化 |
| 典型来源 | 语音、图像、传感器 | 计算机数据、编码信息 |
| 处理方式 | 模拟电路处理 | 数字电路或 DSP 处理 |
| 优点 | 延迟小，形式直接 | 易存储、易复制、抗噪声能力较强 |
| 限制 | 易受噪声累积影响 | 带宽大时需要很高采样率 |

## 2-3 采样 Sampling

连续时间信号 $s(t)$ 等间隔采样后得到序列

$$
s[n] = s(nT_s), \quad n \in \mathbb{Z}
$$

其中 $T_s$ 为采样周期，采样频率为

$$
f_s = \frac{1}{T_s}
$$

采样过程可写成连续信号与冲激串相乘：

$$
s_{\mathrm{sampled}}(t)
= s(t)\sum_{n=-\infty}^{+\infty}\delta(t-nT_s)
$$

![alt text](<CCD Lecture 2 Electronic Communications.attachments/sampling.jpg>)

:::: definition Shannon Sampling Theorem
若连续时间信号最高频率不超过 $f_{\max}$，则当采样频率满足 $f_s > 2f_{\max}$ 时，理论上可由样本恢复原信号。
::::

Nyquist rate 与 Nyquist frequency 分别为

$$
f_{\mathrm{Nyquist\ rate}} = 2f_{\max}
$$

$$
f_{\mathrm{Nyquist\ frequency}} = \frac{f_s}{2}
$$

:::: tip
Nyquist rate 是最低采样率；Nyquist frequency 是给定采样率下可表示的最高频率。两个量容易混用。
::::

## 2-4 基带与宽带传输 Baseband and Broadband Transmission

:::: definition 基带信号 Baseband Signal
原始语音、视频或数字数据在调制前称为基带信号。基带信号可直接传输，也可用于调制高频载波。
::::

| 传输方式 | 说明 | 典型场景 |
| --- | --- | --- |
| Baseband transmission | 原始信号直接进入媒介 | 电话线中的语音、局域网中的数字脉冲 |
| Broadband transmission | 基带信号调制到高频载波后传输 | 无线电、广播、蜂窝通信 |

基带信号直接无线传输通常效率较低，因此实际无线通信多使用高频载波。高频载波更容易通过天线辐射，也便于频分复用。

## 2-5 调制与解调 Modulation and Demodulation

:::: definition 调制 Modulation
调制是用基带信息信号改变高频载波参数的过程。被改变的参数可以是幅度、频率或相位。
::::

正弦载波可写为

$$
v(t) = V_p \sin(2\pi ft + \theta)
$$

或

$$
v(t) = V_p \sin(\omega t + \theta), \quad \omega = 2\pi f
$$

因此常见调制方式为：

| 调制方式 | 改变的载波参数 | 英文 |
| --- | --- | --- |
| 幅度调制 | $V_p$ | AM |
| 频率调制 | $f$ 或 $\omega$ | FM |
| 相位调制 | $\theta$ | PM |

![alt text](<CCD Lecture 2 Electronic Communications.attachments/modulation-transmitter.jpg>)

:::: definition 解调 Demodulation
解调是在接收端从已调载波中恢复基带信息信号的过程，也称 detection。
::::

![alt text](<CCD Lecture 2 Electronic Communications.attachments/demodulation-receiver.jpg>)

## 2-6 复用 Multiplexing

:::: definition 复用 Multiplexing
复用允许两个或多个信号共享同一信道或媒介。发送端将多个基带信号组合为复合信号，接收端再通过解复用恢复各路信号。
::::

![alt text](<CCD Lecture 2 Electronic Communications.attachments/multiplexing.jpg>)

常见复用方式：

| 类型 | 英文 | 基本想法 |
| --- | --- | --- |
| 频分复用 | FDM | 不同信号占用不同频段 |
| 时分复用 | TDM | 不同信号占用不同时隙 |
| 码分复用 | CDM / CDMA | 不同信号使用不同扩频码 |

## 2-7 电磁频谱与带宽 Spectrum and Bandwidth

电磁波在自由空间中的传播速度近似为

$$
c = 3\times 10^8\,\mathrm{m/s}
$$

频率与波长关系为

$$
c = f\lambda
$$

![alt text](<CCD Lecture 2 Electronic Communications.attachments/spectrum.jpg>)

常用通信频段如下。

| 名称 | 频率范围 | 波长数量级 |
| --- | --- | --- |
| VLF | $3\text{--}30\,\mathrm{kHz}$ | $10^5\text{--}10^4\,\mathrm{m}$ |
| LF | $30\text{--}300\,\mathrm{kHz}$ | $10^4\text{--}10^3\,\mathrm{m}$ |
| MF | $300\,\mathrm{kHz}\text{--}3\,\mathrm{MHz}$ | $10^3\text{--}10^2\,\mathrm{m}$ |
| HF | $3\text{--}30\,\mathrm{MHz}$ | $10^2\text{--}10\,\mathrm{m}$ |
| VHF | $30\text{--}300\,\mathrm{MHz}$ | $10\text{--}1\,\mathrm{m}$ |
| UHF | $300\,\mathrm{MHz}\text{--}3\,\mathrm{GHz}$ | $1\text{--}10^{-1}\,\mathrm{m}$ |
| SHF | $3\text{--}30\,\mathrm{GHz}$ | $10^{-1}\text{--}10^{-2}\,\mathrm{m}$ |
| EHF | $30\text{--}300\,\mathrm{GHz}$ | $10^{-2}\text{--}10^{-3}\,\mathrm{m}$ |

:::: definition 带宽 Bandwidth
带宽是信号或系统所占用的频率范围。若最高频率为 $f_2$，最低频率为 $f_1$，则带宽为 $BW=f_2-f_1$。
::::

![alt text](<CCD Lecture 2 Electronic Communications.attachments/bandwidth.jpg>)

$$
BW = f_2 - f_1
$$

调制后信号会在载波频率附近产生边带。若 AM 载波为 $f_c=1000\,\mathrm{kHz}$，最高调制频率为 $f_m=5\,\mathrm{kHz}$，则边带位于

$$
f_c - f_m = 995\,\mathrm{kHz}
$$

$$
f_c + f_m = 1005\,\mathrm{kHz}
$$

因此该 AM 信号占用约

$$
BW = 2f_m = 10\,\mathrm{kHz}
$$

:::: stem
比较一个 $10\,\mathrm{kHz}$ 信号在 $1000\,\mathrm{kHz}$ 和 $1\,\mathrm{GHz}$ 载波附近占载波频率的比例。
::::

:::: solution
在 $1000\,\mathrm{kHz}$ 时

$$
\frac{10\,\mathrm{kHz}}{1000\,\mathrm{kHz}}\times 100\% = 1\%
$$

在 $1\,\mathrm{GHz}=1,000,000\,\mathrm{kHz}$ 时

$$
\frac{10\,\mathrm{kHz}}{1,000,000\,\mathrm{kHz}}\times 100\% = 0.001\%
$$

故同样的绝对带宽放到更高频率处，占频谱的相对比例更小，频谱划分更方便。
::::

## Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| 单工 | 单方向通信 | 广播、遥控 |
| 全双工 | 双方同时通信 | 电话 |
| 半双工 | 双方轮流通信 | 对讲机 |
| 采样 | $s[n]=s(nT_s)$ | $f_s=1/T_s$ |
| 采样定理 | $f_s>2f_{\max}$ | 避免混叠 |
| 载波 | $v(t)=V_p\sin(2\pi ft+\theta)$ | AM/FM/PM 分别改变幅度、频率、相位 |
| 波速关系 | $c=f\lambda$ | 自由空间中 $c\approx3\times10^8\,\mathrm{m/s}$ |
| 带宽 | $BW=f_2-f_1$ | 信号占用的频率范围 |
