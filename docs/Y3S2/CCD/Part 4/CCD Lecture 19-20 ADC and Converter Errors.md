# Lecture 19-20 ADC and Converter Errors 模数转换与转换器误差

## 章节目录

- [章节目录](#章节目录)
- [19-1 ADC 基本概念 ADC Basics](#19-1-adc-基本概念-adc-basics)
  - [19-1-1 信号类型 Signal Types](#19-1-1-信号类型-signal-types)
  - [19-1-2 ADC 四个步骤 Four Steps of ADC](#19-1-2-adc-四个步骤-four-steps-of-adc)
- [19-2 采样 Sampling](#19-2-采样-sampling)
  - [19-2-1 采样周期与采样频率 Sampling Period and Sampling Frequency](#19-2-1-采样周期与采样频率-sampling-period-and-sampling-frequency)
  - [19-2-2 Nyquist-Shannon 采样定理 Nyquist-Shannon Sampling Theorem](#19-2-2-nyquist-shannon-采样定理-nyquist-shannon-sampling-theorem)
  - [19-2-3 混叠 Aliasing](#19-2-3-混叠-aliasing)
- [19-3 量化与编码 Quantization and Encoding](#19-3-量化与编码-quantization-and-encoding)
  - [19-3-1 量化 Quantization](#19-3-1-量化-quantization)
  - [19-3-2 分辨率与 LSB Resolution and LSB](#19-3-2-分辨率与-lsb-resolution-and-lsb)
  - [19-3-3 量化误差 Quantization Error](#19-3-3-量化误差-quantization-error)
- [19-4 ADC 类型 Types of ADC](#19-4-adc-类型-types-of-adc)
  - [19-4-1 SAR ADC Successive Approximation ADC](#19-4-1-sar-adc-successive-approximation-adc)
  - [19-4-2 Dual-Slope ADC 双斜率 ADC](#19-4-2-dual-slope-adc-双斜率-adc)
  - [19-4-3 Flash ADC 闪速 ADC](#19-4-3-flash-adc-闪速-adc)
  - [19-4-4 ADC 类型比较 ADC Comparison](#19-4-4-adc-类型比较-adc-comparison)
- [20-1 转换器误差 Converter Errors](#20-1-转换器误差-converter-errors)
  - [20-1-1 增益误差 Gain Error](#20-1-1-增益误差-gain-error)
  - [20-1-2 偏移误差 Offset Error](#20-1-2-偏移误差-offset-error)
  - [20-1-3 非线性误差 Non-Linearity Error](#20-1-3-非线性误差-non-linearity-error)
- [Summary](#summary)

## 19-1 ADC 基本概念 ADC Basics

### 19-1-1 信号类型 Signal Types

![ADC 基本概念](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_intro.jpg>)

数字信号只有有限状态，最常见的是 binary 的 on/off。模拟信号随时间连续变化，例如声音、温度、加速度和传感器输出电压。

:::: definition 模数转换器 Analog-to-Digital Converter
**ADC** 把模拟输入电压转换为对应的数字码。它测量输入幅度，并输出与输入大小相关的 binary value。
::::

ADC 输入范围通常由参考电压决定。转换结果同时受分辨率和采样率限制：

| 参数 Parameter | 含义 |
| --- | --- |
| Resolution / bit depth | 幅度方向能分多细 |
| Sample rate / sampling frequency | 时间方向测多快 |

---

### 19-1-2 ADC 四个步骤 Four Steps of ADC

![ADC 四个步骤](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_four_steps.jpg>)

ADC 的过程通常分成四步：

1. Sampling：在离散时刻读取模拟信号；
2. Holding：保持样本值，给后级转换时间；
3. Quantizing：把样本幅度映射到有限电平；
4. Encoding：把电平编号写成 binary code。

流程可写成：

$$
\text{Analog signal}
\rightarrow
\text{Sampler}
\rightarrow
\text{Holder}
\rightarrow
\text{Quantizer}
\rightarrow
\text{Encoder}
\rightarrow
\text{Digital signal}
$$

如果满足采样定理，主要失真来自量化。若采样频率不足，还会出现混叠。

## 19-2 采样 Sampling

### 19-2-1 采样周期与采样频率 Sampling Period and Sampling Frequency

![ADC 采样模块](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_sampling_block.jpg>)

采样把连续时间信号变成离散时间序列。模拟信号每隔 $T_s$ 秒取一次值：

$$
x[n]=x(nT_s)
$$

采样频率为

$$
f_s=\frac{1}{T_s}
$$

单位通常是 $\mathrm{Hz}$ 或 samples per second。

较高采样率能保留更多时间细节，但也会增加数据量、功耗和处理压力。较低采样率适合慢变化信号。

---

### 19-2-2 Nyquist-Shannon 采样定理 Nyquist-Shannon Sampling Theorem

![Nyquist 采样定理](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_nyquist.jpg>)

若信号最高频率为 $f_{\max}$，为了从采样值恢复原信号，需要

$$
\boxed{
f_s\ge 2f_{\max}
}
$$

其中 $2f_{\max}$ 称为 Nyquist rate，对应采样间隔为

$$
T_s\le \frac{1}{2f_{\max}}
$$

实际系统通常使用略高于 Nyquist rate 的采样频率，并在 ADC 前加 anti-aliasing filter。

---

### 19-2-3 混叠 Aliasing

![混叠现象](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_aliasing.jpg>)

**混叠 Aliasing** 指高频分量在采样后表现为低频分量。采样定理默认信号已经 band-limited。

混叠频率常按这个关系理解：

$$
f_{\mathrm{alias}}
=
\left|f_{\mathrm{in}}-kf_s\right|
$$

其中 $k$ 取使结果落在 Nyquist band 内的整数。

减少混叠的方法：

| 方法 Method | 作用 |
| --- | --- |
| Anti-aliasing filter | 采样前滤掉过高频率 |
| 提高采样率 | 扩大 Nyquist band |
| 限制输入带宽 | 保证信号满足 band-limited 假设 |

:::: tip
抗混叠滤波器应该放在 ADC 前面。采样之后再滤波，已经折叠进低频的成分很难区分。
::::

## 19-3 量化与编码 Quantization and Encoding

### 19-3-1 量化 Quantization

![量化模块](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_quantization_block.jpg>)

采样只处理时间方向，量化处理幅度方向。量化把每个样本幅度映射到有限个离散电平。

对 $N$ bit ADC，可用 code 数为

$$
2^N
$$

例如 12-bit ADC 有

$$
2^{12}=4096
$$

个输出等级。

量化之后再编码，每个等级被分配一个 binary word。

---

### 19-3-2 分辨率与 LSB Resolution and LSB

ADC 满量程范围记为 FSR：

$$
\mathrm{FSR}=V_{\mathrm{H}}-V_{\mathrm{L}}
$$

1 LSB 常写作

$$
1\,\mathrm{LSB}
=
\frac{\mathrm{FSR}}{2^N}
$$

若输入范围为 $0$ 到 $5\,\mathrm{V}$，8-bit ADC 的 LSB 为

$$
1\,\mathrm{LSB}
=
\frac{5}{256}
=
19.53\,\mathrm{mV}
$$

输入 $3\,\mathrm{V}$ 对应的十进制 code 近似为

$$
D\approx
\frac{3}{5}\times 256
=
153.6
\approx154
$$

转成 8-bit binary：

$$
154_{10}=10011010_2
$$

---

### 19-3-3 量化误差 Quantization Error

![量化误差](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_quantization_error.jpg>)

量化误差是实际模拟样本值与量化电平之间的差。

理想均匀量化器中，误差范围约为

$$
-\frac{1}{2}\mathrm{LSB}
\le
e_q
\le
\frac{1}{2}\mathrm{LSB}
$$

所以最大量化误差为

$$
|e_q|_{\max}=\frac{1}{2}\mathrm{LSB}
$$

提高 bit depth 会减小 LSB，因此量化误差也会变小。

| 位数 $N$ | 电平数 $2^N$ | 结果 |
| ---: | ---: | --- |
| 8 | 256 | 低成本，量化台阶明显 |
| 12 | 4096 | 常见测量精度 |
| 16 | 65536 | 高精度采集 |
| 24 | 16777216 | 高分辨率音频和仪器 |

## 19-4 ADC 类型 Types of ADC

### 19-4-1 SAR ADC Successive Approximation ADC

![SAR ADC](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_sar.jpg>)

**SAR ADC** 使用逐次逼近寄存器 Successive Approximation Register。它像二分搜索一样，从 MSB 到 LSB 逐位判断。

每一轮：

1. SAR 先假设当前 bit 为 1；
2. 内部 DAC 产生 $V_{\mathrm{DAC}}$；
3. 比较器判断 $V_{\mathrm{in}}$ 与 $V_{\mathrm{DAC}}$；
4. 若 $V_{\mathrm{DAC}}>V_{\mathrm{in}}$，该 bit 清零；否则保留。

对 4-bit 输入，一个典型过程：

| Cycle | Trial Code | 判断 |
| ---: | --- | --- |
| 1 | 1000 | 判断 MSB |
| 2 | 0100 或 1100 | 判断下一位 |
| 3 | 0010 组合 | 继续逼近 |
| 4 | 最后一位 | 得到最终 code |

SAR ADC 速度中等，成本低，分辨率常见在 8 到 16 bit。

---

### 19-4-2 Dual-Slope ADC 双斜率 ADC

Dual-slope ADC 也叫 integrating ADC。它把输入电压积分一段固定时间，再用参考电压反向积分，测量回到零所需时间。

特点：

| 项目 | 说明 |
| --- | --- |
| 速度 | 慢 |
| 分辨率 | 高 |
| 抗噪声 | 好，尤其适合工频干扰环境 |
| 应用 | 数字万用表、慢速精密测量 |

它不适合高速信号，但适合稳定、精确的低速测量。

---

### 19-4-3 Flash ADC 闪速 ADC

![Flash ADC](<CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_flash.jpg>)

Flash ADC 是最快的 ADC。它用一组比较器同时比较输入电压和多个参考阈值。

对 $N$ bit Flash ADC，需要

$$
2^N-1
$$

个比较器。

例如 3-bit Flash ADC 需要

$$
2^3-1=7
$$

个比较器。

Flash ADC 的优点是速度极高，可达到 giga samples per second。缺点是比较器数量随位数指数增长，因此成本和功耗很高，分辨率通常不高。

---

### 19-4-4 ADC 类型比较 ADC Comparison

| Type | Speed | Cost | Resolution |
| --- | --- | --- | --- |
| SAR | Medium to fast | Low | 8--16 bit |
| Dual-Slope | Slow | Medium | 12--16 bit |
| Flash | Very fast | High | 4--12 bit |

选择 ADC 时通常先看信号带宽和精度要求。高速信号偏向 Flash 或 pipeline，普通嵌入式测量常用 SAR，慢速高精度仪表常用 dual-slope。

## 20-1 转换器误差 Converter Errors

### 20-1-1 增益误差 Gain Error

![增益误差](<CCD Lecture 19-20 ADC and Converter Errors.attachments/converter_gain_error.jpg>)

**增益误差 Gain Error** 是实际输入输出曲线斜率与理想斜率之间的偏差。

理想 DAC 或 ADC 的转换曲线可写成

$$
y_{\mathrm{ideal}}=mx+b
$$

若实际斜率为 $m+\Delta m$：

$$
y_{\mathrm{actual}}=(m+\Delta m)x+b
$$

则误差随输入幅度增大而增大。参考电压误差、电阻比例误差和放大器增益误差都可能造成 gain error。

---

### 20-1-2 偏移误差 Offset Error

![偏移误差](<CCD Lecture 19-20 ADC and Converter Errors.attachments/converter_offset_error.jpg>)

**偏移误差 Offset Error** 是整条转换曲线上下平移。斜率可以是对的，但零点不准。

可写成

$$
y_{\mathrm{actual}}=mx+(b+\Delta b)
$$

例：理想 DAC 在 code 0000 时输出 $0\,\mathrm{V}$，实际输出 $0.1\,\mathrm{V}$，对应正偏移误差。

Offset error 通常来自运放输入失调、电流源偏置或参考节点误差。

---

### 20-1-3 非线性误差 Non-Linearity Error

![线性误差](<CCD Lecture 19-20 ADC and Converter Errors.attachments/converter_linearity_error.jpg>)

非线性误差表示转换曲线不能用一条直线很好描述。常见两类是 INL 和 DNL。

:::: definition INL 与 DNL Integral and Differential Non-Linearity
**INL Integral Non-Linearity** 表示实际转换点相对理想直线的最大偏差。

**DNL Differential Non-Linearity** 表示相邻 code 之间实际步距与理想 1 LSB 步距的偏差。
::::

DNL 可写成

$$
\mathrm{DNL}_k
=
\frac{\Delta V_k}{V_{\mathrm{LSB}}}-1
$$

其中 $\Delta V_k$ 是第 $k$ 个 code 到下一个 code 的实际步距。

若

$$
\mathrm{DNL}>1\,\mathrm{LSB}
$$

可能出现 missing code，也就是某些数字码没有对应的输入范围。

| 误差 Error | 曲线表现 | 常见影响 |
| --- | --- | --- |
| Gain error | 斜率错误 | 满量程附近误差大 |
| Offset error | 整体平移 | 零点不准 |
| INL | 曲线弯曲 | 绝对精度下降 |
| DNL | 步距不均 | missing code、单调性问题 |

## Summary

ADC 把模拟信号变成数字码，过程包括 sampling、holding、quantizing 和 encoding。采样率决定时间分辨率，bit depth 决定幅度分辨率。

常用公式：

$$
f_s\ge 2f_{\max}
$$

$$
1\,\mathrm{LSB}=\frac{\mathrm{FSR}}{2^N}
$$

$$
|e_q|_{\max}=\frac{1}{2}\mathrm{LSB}
$$

转换器误差主要看 gain、offset、INL 和 DNL。Gain 改斜率，offset 改零点，INL/DNL 改线性和相邻步距。
