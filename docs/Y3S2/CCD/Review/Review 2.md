# Rev 2 电路图与框图总整理

![alt text](<Review 2.attachments/1782054353527.JPG>)

本页把 CCD 课件里的电路图、系统框图、等效模型、题图按 block 直接展示出来。已经在讲义里裁好的图优先使用高清裁图；讲义未单独裁出的图，用源 PDF 页面截图补齐。

> [!TIP]
> 收录范围：电路原理图、通信链路框图、等效模型、反馈/调制/转换器结构、题目中需要识别的图。纯公式页、纯文字页、纯照片页不单列；但频谱、波形、方向图若承担“识图入口”，会作为边界图保留。

## 使用方法

先按 Block 找模块，再按 Lecture 顺序看图。每张图上方的 `B1-01`、`B2-01` 这类编号是本页内部图号；标成“补漏截图”的图片来自源 PDF 页面截图，用来补齐讲义里没有单独裁出的电路图或框图。

## 来源覆盖与去重

| 来源 PDF | 页数 | 处理 |
| --- | ---: | --- |
| `CCD24_Lecture1_Introduction.pdf` | 50 | Block 1 |
| `CCD24_Lecture2_Electronic Communications.pdf` | 35 | Block 1 |
| `Lecture2b_Semiconductors Basics.pdf` | 40 | Block 1 |
| `Lecture3-4_Transistors.pdf` | 78 | Block 1 |
| `Lecture5-6_Amplifiers.pdf` | 81 | Block 1 |
| `CCD25_Lecture7_Mixers_LM.pdf` | 35 | Block 2 |
| `CCD25_Lecture 8_LC Circuits and Matching Networks_LM.pdf` | 37 | Block 2 |
| `CCD25_Lecture 9_Oscillators.pdf` | 38 | Block 2 |
| `Lecture 1 and 2 Amplitude Modulation.pdf` | 60 | 与 Lecture 11 and 12 Amplitude Modulation-2.pdf 重复，只展示一套 AM 图 |
| `Lecture 11 and 12 Amplitude Modulation-2.pdf` | 60 | Block 3 |
| `Lecture 13 - SSB.pdf` | 45 | Block 3 |
| `Lecture 14  2026-1.pdf` | 65 | 与 Lecture 14 and 15- 2026.pdf 重复，只展示一套 FM/PM 图 |
| `Lecture 14 and 15- 2026.pdf` | 65 | Block 3 |
| `Lecture 15- Antenna .pdf` | 26 | Block 3 |
| `Lecture 16- PLL.pdf` | 65 | Block 4 |
| `CCD Lecture 17 RF Receivers.md` | - | Block 4 |
| `Lecture 18 DAC 2026.pdf` | 50 | Block 4 |
| `Lecture 19- 20 - ADC and Errors in Conventers.pdf` | 84 | Block 4 |
| `Revision_Lecture_25.pdf` | 89 | 主要复现 Block 1-2 图，不重复展示 |
| `Lecture 1_ProblemsSolutions.pdf` | 3 | 没有新增电路图或框图 |

## Block 1 - 通信系统、器件与放大器

### Lecture 1 - Introduction

先看 transmitter-channel-receiver，再看噪声、增益、衰减的系统级模型。

**B1-01 communication-system**

![B1-01 communication-system](<../Part 1/CCD Lecture 1 Introduction.attachments/communication-system.jpg>)

**B1-02 system-with-noise**

![B1-02 system-with-noise](<../Part 1/CCD Lecture 1 Introduction.attachments/system-with-noise.jpg>)

**B1-03 noise**

![B1-03 noise](<../Part 1/CCD Lecture 1 Introduction.attachments/noise.jpg>)

**B1-04 gain**

![B1-04 gain](<../Part 1/CCD Lecture 1 Introduction.attachments/gain.jpg>)

**B1-05 attenuation**

![B1-05 attenuation](<../Part 1/CCD Lecture 1 Introduction.attachments/attenuation.jpg>)

**B1-06 补漏截图 Lecture 01 p.31**

![B1-06 补漏截图 Lecture 01 p.31](<Review 2.attachments/l01-p31.webp>)

### Lecture 2 - Electronic Communications

先分清 simplex/full duplex/half duplex，再看调制、解调、多路复用的方框流向。

**B1-07 duplex**

![B1-07 duplex](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/duplex_wide.jpg>)

**B1-08 analog-signals**

![B1-08 analog-signals](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/analog-signals.jpg>)

**B1-09 digital-signals**

![B1-09 digital-signals](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/digital-signals.jpg>)

**B1-10 sampling**

![B1-10 sampling](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/sampling.jpg>)

**B1-11 modulation-transmitter**

![B1-11 modulation-transmitter](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/modulation-transmitter.jpg>)

**B1-12 demodulation-receiver**

![B1-12 demodulation-receiver](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/demodulation-receiver.jpg>)

**B1-13 multiplexing**

![B1-13 multiplexing](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/multiplexing.jpg>)

**B1-14 spectrum**

![B1-14 spectrum](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/spectrum.jpg>)

**B1-15 bandwidth**

![B1-15 bandwidth](<../Part 1/CCD Lecture 2 Electronic Communications.attachments/bandwidth.jpg>)

### Lecture 2b - Semiconductors Basics

二极管图题先判 forward/reverse bias，再选 ideal/practical/complete model。

**B1-16 bohr-atom**

![B1-16 bohr-atom](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/bohr-atom_wide.jpg>)

**B1-17 silicon**

![B1-17 silicon](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/silicon_wide.jpg>)

**B1-18 electron-hole-current**

![B1-18 electron-hole-current](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/electron-hole-current.jpg>)

**B1-19 n 型与 p 型半导体**

![B1-19 n 型与 p 型半导体](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/n-p-type_wide.jpg>)

**B1-20 pn-junction**

![B1-20 pn-junction](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/pn-junction_wide.jpg>)

**B1-21 diode**

![B1-21 diode](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/diode.jpg>)

**B1-22 forward-bias**

![B1-22 forward-bias](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/forward-bias.jpg>)

**B1-23 reverse-bias**

![B1-23 reverse-bias](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/reverse-bias.jpg>)

**B1-24 vi-curve**

![B1-24 vi-curve](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/vi-curve_wide.jpg>)

**B1-25 diode-models**

![B1-25 diode-models](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/diode-models.jpg>)

**B1-26 diode-example**

![B1-26 diode-example](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/diode-example.jpg>)

**B1-27 n-type**

![B1-27 n-type](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/n-type.jpg>)

**B1-28 p-type**

![B1-28 p-type](<../Part 1/CCD Lecture 2b Semiconductors Basics.attachments/p-type.jpg>)

### Lecture 3-4 - Transistors

BJT 先判工作区，JFET/MOSFET 先判偏置方式与控制量。补漏截图覆盖课件中没有单独裁出的 DC model、cutoff/saturation、JFET 偏置图。

**B1-29 BJT-structure**

![B1-29 BJT-structure](<../Part 1/CCD Lecture 3-4 Transistors.attachments/bjt-structure.jpg>)

**B1-30 BJT-types**

![B1-30 BJT-types](<../Part 1/CCD Lecture 3-4 Transistors.attachments/bjt-types_wide.jpg>)

**B1-31 BJT-bias**

![B1-31 BJT-bias](<../Part 1/CCD Lecture 3-4 Transistors.attachments/bjt-bias_wide.jpg>)

**B1-32 BJT-characteristics**

![B1-32 BJT-characteristics](<../Part 1/CCD Lecture 3-4 Transistors.attachments/bjt-characteristics_wide.jpg>)

**B1-33 dc-load-line**

![B1-33 dc-load-line](<../Part 1/CCD Lecture 3-4 Transistors.attachments/dc-load-line_wide.jpg>)

**B1-34 BJT-bias-example**

![B1-34 BJT-bias-example](<../Part 1/CCD Lecture 3-4 Transistors.attachments/bjt-bias-example_wide.jpg>)

**B1-35 BJT-switch-example**

![B1-35 BJT-switch-example](<../Part 1/CCD Lecture 3-4 Transistors.attachments/bjt-switch-example_wide.jpg>)

**B1-36 JFET-structure**

![B1-36 JFET-structure](<../Part 1/CCD Lecture 3-4 Transistors.attachments/jfet-structure_wide.jpg>)

**B1-37 JFET-operation**

![B1-37 JFET-operation](<../Part 1/CCD Lecture 3-4 Transistors.attachments/jfet-operation_wide.jpg>)

**B1-38 JFET-drain-curve**

![B1-38 JFET-drain-curve](<../Part 1/CCD Lecture 3-4 Transistors.attachments/jfet-drain-curve.jpg>)

**B1-39 JFET-example**

![B1-39 JFET-example](<../Part 1/CCD Lecture 3-4 Transistors.attachments/jfet-example.jpg>)

**B1-40 JFET-transfer**

![B1-40 JFET-transfer](<../Part 1/CCD Lecture 3-4 Transistors.attachments/jfet-transfer_wide.jpg>)

**B1-41 D-MOSFET 与 E-MOSFET**

![B1-41 D-MOSFET 与 E-MOSFET](<../Part 1/CCD Lecture 3-4 Transistors.attachments/mosfet-types_wide.jpg>)

**B1-42 emosfet-transfer**

![B1-42 emosfet-transfer](<../Part 1/CCD Lecture 3-4 Transistors.attachments/emosfet-transfer_wide.jpg>)

**B1-43 dmosfet-transfer**

![B1-43 dmosfet-transfer](<../Part 1/CCD Lecture 3-4 Transistors.attachments/dmosfet-transfer_wide.jpg>)

**B1-44 d-MOSFET**

![B1-44 d-MOSFET](<../Part 1/CCD Lecture 3-4 Transistors.attachments/d-mosfet.jpg>)

**B1-45 e-MOSFET**

![B1-45 e-MOSFET](<../Part 1/CCD Lecture 3-4 Transistors.attachments/e-mosfet.jpg>)

**B1-46 补漏截图 Lecture 03 04 p.11**

![B1-46 补漏截图 Lecture 03 04 p.11](<Review 2.attachments/l03-04-p11.webp>)

**B1-47 补漏截图 Lecture 03 04 p.13**

![B1-47 补漏截图 Lecture 03 04 p.13](<Review 2.attachments/l03-04-p13.webp>)

**B1-48 补漏截图 Lecture 03 04 p.14**

![B1-48 补漏截图 Lecture 03 04 p.14](<Review 2.attachments/l03-04-p14.webp>)

**B1-49 补漏截图 Lecture 03 04 p.57**

![B1-49 补漏截图 Lecture 03 04 p.57](<Review 2.attachments/l03-04-p57.webp>)

**B1-50 补漏截图 Lecture 03 04 p.58**

![B1-50 补漏截图 Lecture 03 04 p.58](<Review 2.attachments/l03-04-p58.webp>)

**B1-51 补漏截图 Lecture 03 04 p.59**

![B1-51 补漏截图 Lecture 03 04 p.59](<Review 2.attachments/l03-04-p59.webp>)

**B1-52 补漏截图 Lecture 03 04 p.60**

![B1-52 补漏截图 Lecture 03 04 p.60](<Review 2.attachments/l03-04-p60.webp>)

**B1-53 补漏截图 Lecture 03 04 p.61**

![B1-53 补漏截图 Lecture 03 04 p.61](<Review 2.attachments/l03-04-p61.webp>)

**B1-54 补漏截图 Lecture 03 04 p.62**

![B1-54 补漏截图 Lecture 03 04 p.62](<Review 2.attachments/l03-04-p62.webp>)

**B1-55 补漏截图 Lecture 03 04 p.65**

![B1-55 补漏截图 Lecture 03 04 p.65](<Review 2.attachments/l03-04-p65.webp>)

**B1-56 补漏截图 Lecture 03 04 p.75**

![B1-56 补漏截图 Lecture 03 04 p.75](<Review 2.attachments/l03-04-p75.webp>)

**B1-57 补漏截图 Lecture 03 04 p.76**

![B1-57 补漏截图 Lecture 03 04 p.76](<Review 2.attachments/l03-04-p76.webp>)

### Lecture 5-6 - Amplifiers

放大器图题先做 DC bias，再画 AC equivalent；注意旁路电容、负载、输入电阻。

**B1-58 分压偏置的戴维南等效**

![B1-58 分压偏置的戴维南等效](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_08_thevenin_bias.jpg>)

**B1-59 r 参数模型**

![B1-59 r 参数模型](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_18_r_parameter_model.jpg>)

**B1-60 共射放大器**

![B1-60 共射放大器](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_24_common_emitter_amp.jpg>)

**B1-61 共射放大器的相位反转**

![B1-61 共射放大器的相位反转](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_25_phase_inversion.jpg>)

**B1-62 共射放大器交流等效**

![B1-62 共射放大器交流等效](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_30_ac_equivalent.jpg>)

**B1-63 基极信号分压**

![B1-63 基极信号分压](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_32_base_signal_divider.jpg>)

**B1-64 基极到集电极电压增益**

![B1-64 基极到集电极电压增益](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_38_voltage_gain.jpg>)

**B1-65 发射极旁路电容的作用**

![B1-65 发射极旁路电容的作用](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_41_emitter_bypass_effect_wide.jpg>)

**B1-66 负载效应**

![B1-66 负载效应](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_47_load_effect.jpg>)

**B1-67 共集放大器**

![B1-67 共集放大器](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_63_common_collector.jpg>)

**B1-68 共集输入电阻**

![B1-68 共集输入电阻](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_67_cc_input_resistance.jpg>)

**B1-69 共基放大器**

![B1-69 共基放大器](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_74_common_base.jpg>)

**B1-70 共基电压增益**

![B1-70 共基电压增益](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_76_cb_voltage_gain.jpg>)

**B1-71 多级电压增益**

![B1-71 多级电压增益](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_81_multistage_gain.jpg>)

**B1-72 求直流工作点的电路**

![B1-72 求直流工作点的电路](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_12_find_ic_vce.jpg>)

**B1-73 基极信号电压例题**

![B1-73 基极信号电压例题](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_35_ce_problem_base_voltage.jpg>)

**B1-74 负载电压增益例题**

![B1-74 负载电压增益例题](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_48_load_problem.jpg>)

**B1-75 r parameters table**

![B1-75 r parameters table](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_16_r_parameters_table.jpg>)

**B1-76 re formula**

![B1-76 re formula](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_20_re_formula.jpg>)

**B1-77 h to r**

![B1-77 h to r](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_23_h_to_r.jpg>)

**B1-78 dc analysis setup**

![B1-78 dc analysis setup](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_26_dc_analysis_setup.jpg>)

**B1-79 input resistance base**

![B1-79 input resistance base](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_33_input_resistance_base.jpg>)

**B1-80 overall gain**

![B1-80 overall gain](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_40_overall_gain.jpg>)

**B1-81 bypass problem**

![B1-81 bypass problem](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_42_bypass_problem.jpg>)

**B1-82 gain without bypass**

![B1-82 gain without bypass](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_44_gain_without_bypass.jpg>)

**B1-83 gain stability**

![B1-83 gain stability](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_51_gain_stability.jpg>)

**B1-84 total collector waveform**

![B1-84 total collector waveform](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_58_total_collector_waveform.jpg>)

**B1-85 total collector waveform two**

![B1-85 total collector waveform two](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_59_total_collector_waveform_two.jpg>)

**B1-86 current gain**

![B1-86 current gain](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_61_current_gain.jpg>)

**B1-87 power gain**

![B1-87 power gain](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_62_power_gain.jpg>)

**B1-88 CC problem**

![B1-88 CC problem](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_69_cc_problem.jpg>)

**B1-89 CB problem**

![B1-89 CB problem](<../Part 1/CCD Lecture 5-6 Amplifiers.attachments/amp_79_cb_problem.jpg>)

## Block 2 - 混频、LC 匹配与振荡器

### Lecture 7 - Mixers

混频图先找 RF、LO、IF，再决定 sum/difference 哪一路被滤出。

**B2-01 混频器后接滤波器**

![B2-01 混频器后接滤波器](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_05_mixer_filter_superhet.jpg>)

**B2-02 理想频移电路**

![B2-02 理想频移电路](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_07_ideal_frequency_shifter.jpg>)

**B2-03 二极管混频器**

![B2-03 二极管混频器](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_09_diode_mixer.jpg>)

**B2-04 二极管混频器与 LC 滤波**

![B2-04 二极管混频器与 LC 滤波](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_10_diode_mixer_filter.jpg>)

**B2-05 BJT 混频器**

![B2-05 BJT 混频器](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_11_bjt_mixer_wide.jpg>)

**B2-06 双栅 MOSFET 混频器**

![B2-06 双栅 MOSFET 混频器](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_13_dual_gate_mosfet.jpg>)

**B2-07 Image frequency**

![B2-07 Image frequency](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_14_image_frequency.jpg>)

**B2-08 镜像抑制滤波器**

![B2-08 镜像抑制滤波器](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_15_image_rejection_filter.jpg>)

**B2-09 Mini-Circuits 混频器例子**

![B2-09 Mini-Circuits 混频器例子](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_19_minicircuits_example_wide.jpg>)

**B2-10 混频器指标曲线**

![B2-10 混频器指标曲线](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_24_mixer_metric_plots.jpg>)

**B2-11 mixing identity**

![B2-11 mixing identity](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_04_mixing_identity.jpg>)

**B2-12 up down conversion**

![B2-12 up down conversion](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_06_up_down_conversion.jpg>)

**B2-13 ideal shifter problem**

![B2-13 ideal shifter problem](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_08_ideal_shifter_problem.jpg>)

**B2-14 JFET mixer**

![B2-14 JFET mixer](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_12_jfet_mixer.jpg>)

**B2-15 image rejection formula**

![B2-15 image rejection formula](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_16_image_rejection_formula.jpg>)

**B2-16 image rejection example**

![B2-16 image rejection example](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_17_image_rejection_example.jpg>)

**B2-17 broadcast image example**

![B2-17 broadcast image example](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_18_broadcast_image_example.jpg>)

**B2-18 vswr return loss**

![B2-18 vswr return loss](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_23_vswr_return_loss.jpg>)

**B2-19 exercise tones**

![B2-19 exercise tones](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_26_exercise_tones.jpg>)

**B2-20 exercise radio 980**

![B2-20 exercise radio 980](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_29_exercise_radio_980.jpg>)

**B2-21 exercise radio 1500**

![B2-21 exercise radio 1500](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_32_exercise_radio_1500.jpg>)

**B2-22 exercise q image**

![B2-22 exercise q image](<../Part 2/CCD Lecture 7 Mixers.attachments/mix_34_exercise_q_image.jpg>)

### Lecture 8 - LC Circuits and Matching Networks

LC 图题先判断 resonance、Q、bandwidth；匹配网络先判断串/并元件位置。

**B2-23 串联谐振与带通响应**

![B2-23 串联谐振与带通响应](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_resonance_response_wide.jpg>)

**B2-24 谐振响应与 Q 对带宽的影响**

![B2-24 谐振响应与 Q 对带宽的影响](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_q_bandwidth_wide.jpg>)

**B2-25 Tank circuit band-pass**

![B2-25 Tank circuit band-pass](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_19_tank_circuit_bpf_wide.jpg>)

**B2-26 高频寄生参数**

![B2-26 高频寄生参数](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_20_high_frequency_parasitics.jpg>)

**B2-27 通信模块的戴维南视角**

![B2-27 通信模块的戴维南视角](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_23_max_power_blocks.jpg>)

**B2-28 匹配网络规则**

![B2-28 匹配网络规则](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_30_matching_network_rule.jpg>)

**B2-29 复数阻抗匹配**

![B2-29 复数阻抗匹配](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_complex_matching_wide.jpg>)

**B2-30 匹配网络例题**

![B2-30 匹配网络例题](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_31_matching_network_example.jpg>)

**B2-31 practical LC q**

![B2-31 practical LC q](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_04_practical_lc_q.jpg>)

**B2-32 LC resonance intro**

![B2-32 LC resonance intro](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_05_lc_resonance_intro.jpg>)

**B2-33 series resonance notch**

![B2-33 series resonance notch](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_07_series_resonance_notch.jpg>)

**B2-34 rlc series**

![B2-34 rlc series](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_08_rlc_series.jpg>)

**B2-35 LC relation resonance**

![B2-35 LC relation resonance](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_09_lc_relation_resonance.jpg>)

**B2-36 inductance example**

![B2-36 inductance example](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_10_inductance_example.jpg>)

**B2-37 series response curve**

![B2-37 series response curve](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_11_series_response_curve.jpg>)

**B2-38 bandpass formula**

![B2-38 bandpass formula](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_12_bandpass_formula.jpg>)

**B2-39 q effect**

![B2-39 q effect](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_13_q_effect.jpg>)

**B2-40 bandwidth examples**

![B2-40 bandwidth examples](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_14_bandwidth_examples.jpg>)

**B2-41 tank circuit formula**

![B2-41 tank circuit formula](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_18_tank_circuit_formula.jpg>)

**B2-42 rlc summary graph**

![B2-42 rlc summary graph](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_21_rlc_summary_graph.jpg>)

**B2-43 series parallel conversion**

![B2-43 series parallel conversion](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_22_series_parallel_conversion.jpg>)

**B2-44 conjugate matching**

![B2-44 conjugate matching](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_25_conjugate_matching.jpg>)

**B2-45 reflection coefficient**

![B2-45 reflection coefficient](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_27_reflection_coefficient.jpg>)

**B2-46 mismatch loss**

![B2-46 mismatch loss](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_29_mismatch_loss.jpg>)

**B2-47 matching network q**

![B2-47 matching network q](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_32_matching_network_q.jpg>)

**B2-48 matching network values**

![B2-48 matching network values](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_33_matching_network_values.jpg>)

**B2-49 matching network result**

![B2-49 matching network result](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_34_matching_network_result.jpg>)

**B2-50 matching network verify**

![B2-50 matching network verify](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_35_matching_network_verify.jpg>)

**B2-51 complex matching**

![B2-51 complex matching](<../Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/lc_36_complex_matching.jpg>)

### Lecture 9 - Oscillators

振荡器图题先看反馈网络拓扑：phase-shift、Hartley、Colpitts、Clapp、VCO。

**B2-52 LC 槽路振荡过程**

![B2-52 LC 槽路振荡过程](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_04_lc_oscillator_waveform.jpg>)

**B2-53 相移振荡器**

![B2-53 相移振荡器](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_09_phase_shift_circuit.jpg>)

**B2-54 开环设计视角**

![B2-54 开环设计视角](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_14_open_loop_design.jpg>)

**B2-55 晶体、可变电容与变容二极管 VCO**

![B2-55 晶体、可变电容与变容二极管 VCO](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_crystal_vco_wide.jpg>)

**B2-56 Clapp 压控振荡器**

![B2-56 Clapp 压控振荡器](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_32_clapp_vco.jpg>)

**B2-57 Colpitts 振荡器例题电路**

![B2-57 Colpitts 振荡器例题电路](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_colpitts_problem_wide.jpg>)

**B2-58 tank flywheel**

![B2-58 tank flywheel](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_05_tank_flywheel.jpg>)

**B2-59 oscillator loop**

![B2-59 oscillator loop](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_06_oscillator_loop.jpg>)

**B2-60 barkhausen open loop**

![B2-60 barkhausen open loop](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_07_barkhausen_open_loop.jpg>)

**B2-61 barkhausen transfer**

![B2-61 barkhausen transfer](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_08_barkhausen_transfer.jpg>)

**B2-62 phase shift math**

![B2-62 phase shift math](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_10_phase_shift_math.jpg>)

**B2-63 phase shift gain**

![B2-63 phase shift gain](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_11_phase_shift_gain.jpg>)

**B2-64 phase shift problem**

![B2-64 phase shift problem](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_12_phase_shift_problem.jpg>)

**B2-65 phase shift solution**

![B2-65 phase shift solution](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_13_phase_shift_solution.jpg>)

**B2-66 feedback parameters**

![B2-66 feedback parameters](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_15_feedback_parameters.jpg>)

**B2-67 tapped l center**

![B2-67 tapped l center](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_16_tapped_l_center_clean.jpg>)

**B2-68 tapped l formula**

![B2-68 tapped l formula](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_17_tapped_l_formula.jpg>)

**B2-69 tapped l reff**

![B2-69 tapped l reff](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_18_tapped_l_reff.jpg>)

**B2-70 feedback topologies**

![B2-70 feedback topologies](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_19_feedback_topologies.jpg>)

**B2-71 touch base**

![B2-71 touch base](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_20_touch_base.jpg>)

**B2-72 hartley**

![B2-72 hartley](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_21_hartley_clean.jpg>)

**B2-73 hartley left**

![B2-73 hartley left](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_21_hartley_left_clean.jpg>)

**B2-74 colpitts**

![B2-74 colpitts](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_22_colpitts_clean.jpg>)

**B2-75 loading feedback**

![B2-75 loading feedback](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_23_loading_feedback.jpg>)

**B2-76 colpitts self start**

![B2-76 colpitts self start](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_24_colpitts_self_start.jpg>)

**B2-77 colpitts problem**

![B2-77 colpitts problem](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_26_colpitts_problem.jpg>)

**B2-78 colpitts circuit**

![B2-78 colpitts circuit](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_27_colpitts_circuit_clean.jpg>)

**B2-79 colpitts solution**

![B2-79 colpitts solution](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_27_colpitts_solution.jpg>)

**B2-80 crystal equivalent**

![B2-80 crystal equivalent](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_28_crystal_equivalent_clean.jpg>)

**B2-81 crystal stability**

![B2-81 crystal stability](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_29_crystal_stability.jpg>)

**B2-82 variable capacitor**

![B2-82 variable capacitor](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_30_variable_capacitor.jpg>)

**B2-83 varactor VCO**

![B2-83 varactor VCO](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_31_varactor_vco.jpg>)

**B2-84 phase noise jitter**

![B2-84 phase noise jitter](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_35_phase_noise_jitter_clean.jpg>)

**B2-85 eye diagram**

![B2-85 eye diagram](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_36_eye_diagram_clean.jpg>)

**B2-86 phase noise spectrum**

![B2-86 phase noise spectrum](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_37_phase_noise_spectrum.jpg>)

**B2-87 hartley colpitts**

![B2-87 hartley colpitts](<../Part 2/CCD Lecture 9 Oscillators.attachments/osc_hartley_colpitts_wide.jpg>)

## Block 3 - AM、SSB、FM/PM 与天线

### Lecture 11-12 - Amplitude Modulation

AM 图题先看 carrier 是否保留、message 如何控制 carrier amplitude。补漏截图覆盖 high/low-level modulation 框图。

**B3-01 AM 调制框图**

![B3-01 AM 调制框图](<../Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/am_modulation_block.jpg>)

**B3-02 AM 信号模型**

![B3-02 AM 信号模型](<../Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/am_signal_model.jpg>)

**B3-03 AM 包络**

![B3-03 AM 包络](<../Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/am_envelope.jpg>)

**B3-04 过调制**

![B3-04 过调制](<../Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/am_overmodulation.jpg>)

**B3-05 晶体管 AM 调制器**

![B3-05 晶体管 AM 调制器](<../Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/am_transistor_modulator_wide.jpg>)

**B3-06 集电极调制器**

![B3-06 集电极调制器](<../Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/am_collector_modulator_wide.jpg>)

**B3-07 补漏截图 Lecture 11 12 am p.6**

![B3-07 补漏截图 Lecture 11 12 am p.6](<Review 2.attachments/l11-12-am-p06.webp>)

**B3-08 补漏截图 Lecture 11 12 am p.47**

![B3-08 补漏截图 Lecture 11 12 am p.47](<Review 2.attachments/l11-12-am-p47.webp>)

**B3-09 补漏截图 Lecture 11 12 am p.48**

![B3-09 补漏截图 Lecture 11 12 am p.48](<Review 2.attachments/l11-12-am-p48.webp>)

**B3-10 补漏截图 Lecture 11 12 am p.59**

![B3-10 补漏截图 Lecture 11 12 am p.59](<Review 2.attachments/l11-12-am-p59.webp>)

### Lecture 13 - SSB

SSB 图题先看 carrier suppression，再看 filter method、mixing 和 receiver BFO。

**B3-11 AM 频谱**

![B3-11 AM 频谱](<../Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_am_spectrum_wide.jpg>)

**B3-12 边带选择**

![B3-12 边带选择](<../Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_sideband_choice_wide.jpg>)

**B3-13 二极管环形调制器**

![B3-13 二极管环形调制器](<../Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_ring_modulator_wide.jpg>)

**B3-14 SSB 滤波**

![B3-14 SSB 滤波](<../Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_filter.jpg>)

**B3-15 滤波法 SSB 发射机**

![B3-15 滤波法 SSB 发射机](<../Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_transmitter_filter_method.jpg>)

**B3-16 SSB 接收机**

![B3-16 SSB 接收机](<../Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/ssb_receiver.jpg>)

**B3-17 补漏截图 Lecture 13 ssb p.20**

![B3-17 补漏截图 Lecture 13 ssb p.20](<Review 2.attachments/l13-ssb-p20.webp>)

**B3-18 补漏截图 Lecture 13 ssb p.34**

![B3-18 补漏截图 Lecture 13 ssb p.34](<Review 2.attachments/l13-ssb-p34.webp>)

**B3-19 补漏截图 Lecture 13 ssb p.35**

![B3-19 补漏截图 Lecture 13 ssb p.35](<Review 2.attachments/l13-ssb-p35.webp>)

**B3-20 补漏截图 Lecture 13 ssb p.36**

![B3-20 补漏截图 Lecture 13 ssb p.36](<Review 2.attachments/l13-ssb-p36.webp>)

**B3-21 补漏截图 Lecture 13 ssb p.37**

![B3-21 补漏截图 Lecture 13 ssb p.37](<Review 2.attachments/l13-ssb-p37.webp>)

**B3-22 补漏截图 Lecture 13 ssb p.41**

![B3-22 补漏截图 Lecture 13 ssb p.41](<Review 2.attachments/l13-ssb-p41.webp>)

**B3-23 补漏截图 Lecture 13 ssb p.42**

![B3-23 补漏截图 Lecture 13 ssb p.42](<Review 2.attachments/l13-ssb-p42.webp>)

**B3-24 补漏截图 Lecture 13 ssb p.43**

![B3-24 补漏截图 Lecture 13 ssb p.43](<Review 2.attachments/l13-ssb-p43.webp>)

**B3-25 补漏截图 Lecture 13 ssb p.44**

![B3-25 补漏截图 Lecture 13 ssb p.44](<Review 2.attachments/l13-ssb-p44.webp>)

### Lecture 14 - FM and PM

FM/PM 图题先看是 direct FM、indirect FM 还是 demodulator。补漏截图覆盖 crystal oscillator、frequency multiplier、VCO 概念页。

**B3-26 FM 波形表示**

![B3-26 FM 波形表示](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_representation.jpg>)

**B3-27 FM 频偏**

![B3-27 FM 频偏](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_deviation.jpg>)

**B3-28 变容二极管**

![B3-28 变容二极管](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_varactor_diode_wide.jpg>)

**B3-29 变容二极管 FM 调制器**

![B3-29 变容二极管 FM 调制器](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_varactor_modulator_wide.jpg>)

**B3-30 相移电路**

![B3-30 相移电路](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_phase_shifter.jpg>)

**B3-31 斜率检波器**

![B3-31 斜率检波器](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_slope_detector.jpg>)

**B3-32 noise suppression**

![B3-32 noise suppression](<../Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/fm_noise_suppression_wide.jpg>)

**B3-33 补漏截图 Lecture 14 fm p.54**

![B3-33 补漏截图 Lecture 14 fm p.54](<Review 2.attachments/l14-fm-p54.webp>)

**B3-34 补漏截图 Lecture 14 fm p.55**

![B3-34 补漏截图 Lecture 14 fm p.55](<Review 2.attachments/l14-fm-p55.webp>)

**B3-35 补漏截图 Lecture 14 fm p.56**

![B3-35 补漏截图 Lecture 14 fm p.56](<Review 2.attachments/l14-fm-p56.webp>)

**B3-36 补漏截图 Lecture 14 fm p.57**

![B3-36 补漏截图 Lecture 14 fm p.57](<Review 2.attachments/l14-fm-p57.webp>)

### Lecture 15 - Antennas in a Circuit

天线图题主要是方向图、场区、gain/directivity/front-to-back ratio 和通信链路。

**B3-37 天线场区**

![B3-37 天线场区](<../Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/antenna_regions.jpg>)

**B3-38 天线方向图**

![B3-38 天线方向图](<../Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/antenna_pattern_wide.jpg>)

**B3-39 三维方向图**

![B3-39 三维方向图](<../Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/antenna_pattern_3d_wide.jpg>)

**B3-40 天线参数**

![B3-40 天线参数](<../Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/antenna_parameters.jpg>)

**B3-41 通信链路**

![B3-41 通信链路](<../Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/antenna_link_wide.jpg>)

**B3-42 antenna definition**

![B3-42 antenna definition](<../Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/antenna_definition.jpg>)

## Block 4 - PLL、RF 接收机、DAC、ADC 与转换误差

### Lecture 16 - Phase-Locked Loop

PLL 图题先找 phase detector、loop filter、VCO；补漏截图覆盖 4046 设计题与反馈模型相关页。

**B4-01 斜率检波器频率响应**

![B4-01 斜率检波器频率响应](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_slope_detector.jpg>)

**B4-02 PLL 基本介绍**

![B4-02 PLL 基本介绍](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_basic_intro.jpg>)

**B4-03 PLL 基本系统**

![B4-03 PLL 基本系统](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_basic_system.jpg>)

**B4-04 相位检测器**

![B4-04 相位检测器](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_phase_detector_wide.jpg>)

**B4-05 环路滤波器**

![B4-05 环路滤波器](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_loop_filter_wide.jpg>)

**B4-06 VCO**

![B4-06 VCO](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_vco_wide.jpg>)

**B4-07 PLL 反馈模型**

![B4-07 PLL 反馈模型](<../Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_feedback_model.jpg>)

**B4-08 补漏截图 Lecture 16 pll p.14**

![B4-08 补漏截图 Lecture 16 pll p.14](<Review 2.attachments/l16-pll-p14.webp>)

**B4-09 补漏截图 Lecture 16 pll p.38**

![B4-09 补漏截图 Lecture 16 pll p.38](<Review 2.attachments/l16-pll-p38.webp>)

**B4-10 补漏截图 Lecture 16 pll p.39**

![B4-10 补漏截图 Lecture 16 pll p.39](<Review 2.attachments/l16-pll-p39.webp>)

**B4-11 补漏截图 Lecture 16 pll p.40**

![B4-11 补漏截图 Lecture 16 pll p.40](<Review 2.attachments/l16-pll-p40.webp>)

**B4-12 补漏截图 Lecture 16 pll p.41**

![B4-12 补漏截图 Lecture 16 pll p.41](<Review 2.attachments/l16-pll-p41.webp>)

**B4-13 补漏截图 Lecture 16 pll p.42**

![B4-13 补漏截图 Lecture 16 pll p.42](<Review 2.attachments/l16-pll-p42.webp>)

**B4-14 补漏截图 Lecture 16 pll p.43**

![B4-14 补漏截图 Lecture 16 pll p.43](<Review 2.attachments/l16-pll-p43.webp>)

**B4-15 补漏截图 Lecture 16 pll p.44**

![B4-15 补漏截图 Lecture 16 pll p.44](<Review 2.attachments/l16-pll-p44.webp>)

**B4-16 补漏截图 Lecture 16 pll p.45**

![B4-16 补漏截图 Lecture 16 pll p.45](<Review 2.attachments/l16-pll-p45.webp>)

**B4-17 补漏截图 Lecture 16 pll p.46**

![B4-17 补漏截图 Lecture 16 pll p.46](<Review 2.attachments/l16-pll-p46.webp>)

**B4-18 补漏截图 Lecture 16 pll p.47**

![B4-18 补漏截图 Lecture 16 pll p.47](<Review 2.attachments/l16-pll-p47.webp>)

**B4-19 补漏截图 Lecture 16 pll p.48**

![B4-19 补漏截图 Lecture 16 pll p.48](<Review 2.attachments/l16-pll-p48.webp>)

**B4-20 补漏截图 Lecture 16 pll p.49**

![B4-20 补漏截图 Lecture 16 pll p.49](<Review 2.attachments/l16-pll-p49.webp>)

**B4-21 补漏截图 Lecture 16 pll p.50**

![B4-21 补漏截图 Lecture 16 pll p.50](<Review 2.attachments/l16-pll-p50.webp>)

**B4-22 补漏截图 Lecture 16 pll p.51**

![B4-22 补漏截图 Lecture 16 pll p.51](<Review 2.attachments/l16-pll-p51.webp>)

**B4-23 补漏截图 Lecture 16 pll p.52**

![B4-23 补漏截图 Lecture 16 pll p.52](<Review 2.attachments/l16-pll-p52.webp>)

**B4-24 补漏截图 Lecture 16 pll p.53**

![B4-24 补漏截图 Lecture 16 pll p.53](<Review 2.attachments/l16-pll-p53.webp>)

**B4-25 补漏截图 Lecture 16 pll p.54**

![B4-25 补漏截图 Lecture 16 pll p.54](<Review 2.attachments/l16-pll-p54.webp>)

**B4-26 补漏截图 Lecture 16 pll p.57**

![B4-26 补漏截图 Lecture 16 pll p.57](<Review 2.attachments/l16-pll-p57.webp>)

**B4-27 补漏截图 Lecture 16 pll p.58**

![B4-27 补漏截图 Lecture 16 pll p.58](<Review 2.attachments/l16-pll-p58.webp>)

**B4-28 补漏截图 Lecture 16 pll p.59**

![B4-28 补漏截图 Lecture 16 pll p.59](<Review 2.attachments/l16-pll-p59.webp>)

**B4-29 补漏截图 Lecture 16 pll p.60**

![B4-29 补漏截图 Lecture 16 pll p.60](<Review 2.attachments/l16-pll-p60.webp>)

**B4-30 补漏截图 Lecture 16 pll p.61**

![B4-30 补漏截图 Lecture 16 pll p.61](<Review 2.attachments/l16-pll-p61.webp>)

**B4-31 补漏截图 Lecture 16 pll p.62**

![B4-31 补漏截图 Lecture 16 pll p.62](<Review 2.attachments/l16-pll-p62.webp>)

**B4-32 补漏截图 Lecture 16 pll p.63**

![B4-32 补漏截图 Lecture 16 pll p.63](<Review 2.attachments/l16-pll-p63.webp>)

**B4-33 补漏截图 Lecture 16 pll p.64**

![B4-33 补漏截图 Lecture 16 pll p.64](<Review 2.attachments/l16-pll-p64.webp>)

### Lecture 17 - RF Receivers

接收机图题先分 TRF / superhet，再看 image frequency、IIP3、noise figure 和 Friis 级联。Lecture 17 的图主要是系统链路、频谱关系和指标测量图。

**B4-34 TRF 接收机结构**

![B4-34 TRF 接收机结构](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_trf_receiver.jpg>)

**B4-35 超外差接收机结构**

![B4-35 超外差接收机结构](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_superhet_receiver.jpg>)

**B4-36 1 dB 压缩点**

![B4-36 1 dB 压缩点](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_gain_compression.jpg>)

**B4-37 双音输入频谱**

![B4-37 双音输入频谱](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_two_tone_input.jpg>)

**B4-38 双音输出频谱**

![B4-38 双音输出频谱](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_two_tone_output.jpg>)

**B4-39 IIP3 频谱测量关系**

![B4-39 IIP3 频谱测量关系](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_iip3_spectrum.jpg>)

**B4-40 镜像频率位置**

![B4-40 镜像频率位置](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_image_frequency.jpg>)

**B4-41 接收机噪声底与动态范围**

![B4-41 接收机噪声底与动态范围](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_noise_floor_metrics.jpg>)

**B4-42 两级系统噪声因子**

![B4-42 两级系统噪声因子](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_two_stage_noise_factor.jpg>)

**B4-43 前端灵敏度例题**

![B4-43 前端灵敏度例题](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_front_end_sensitivity_example.jpg>)

**B4-44 两级系统例题**

![B4-44 两级系统例题](<../Part 4/CCD Lecture 17 RF Receivers.attachments/rf_two_stage_example.jpg>)

### Lecture 18 - Digital to Analog Conversion

DAC 图题先判断 weighted resistor 还是 R-2R ladder；补漏截图覆盖 op-amp DAC 和 R-2R 逐步化简。

**B4-45 数字系统与环境接口**

![B4-45 数字系统与环境接口](<../Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_system_interface.jpg>)

**B4-46 4-bit DAC 方框图**

![B4-46 4-bit DAC 方框图](<../Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_4bit_block.jpg>)

**B4-47 DAC 阶梯输出**

![B4-47 DAC 阶梯输出](<../Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_staircase_wide.jpg>)

**B4-48 加权电阻 DAC**

![B4-48 加权电阻 DAC](<../Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_weighted_resistor_wide.jpg>)

**B4-49 R-2R 电阻梯**

![B4-49 R-2R 电阻梯](<../Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_r2r_ladder.jpg>)

**B4-50 补漏截图 Lecture 18 dac p.29**

![B4-50 补漏截图 Lecture 18 dac p.29](<Review 2.attachments/l18-dac-p29.webp>)

**B4-51 补漏截图 Lecture 18 dac p.30**

![B4-51 补漏截图 Lecture 18 dac p.30](<Review 2.attachments/l18-dac-p30.webp>)

**B4-52 补漏截图 Lecture 18 dac p.31**

![B4-52 补漏截图 Lecture 18 dac p.31](<Review 2.attachments/l18-dac-p31.webp>)

**B4-53 补漏截图 Lecture 18 dac p.32**

![B4-53 补漏截图 Lecture 18 dac p.32](<Review 2.attachments/l18-dac-p32.webp>)

**B4-54 补漏截图 Lecture 18 dac p.33**

![B4-54 补漏截图 Lecture 18 dac p.33](<Review 2.attachments/l18-dac-p33.webp>)

**B4-55 补漏截图 Lecture 18 dac p.41**

![B4-55 补漏截图 Lecture 18 dac p.41](<Review 2.attachments/l18-dac-p41.webp>)

**B4-56 补漏截图 Lecture 18 dac p.42**

![B4-56 补漏截图 Lecture 18 dac p.42](<Review 2.attachments/l18-dac-p42.webp>)

**B4-57 补漏截图 Lecture 18 dac p.43**

![B4-57 补漏截图 Lecture 18 dac p.43](<Review 2.attachments/l18-dac-p43.webp>)

**B4-58 补漏截图 Lecture 18 dac p.44**

![B4-58 补漏截图 Lecture 18 dac p.44](<Review 2.attachments/l18-dac-p44.webp>)

**B4-59 补漏截图 Lecture 18 dac p.45**

![B4-59 补漏截图 Lecture 18 dac p.45](<Review 2.attachments/l18-dac-p45.webp>)

**B4-60 补漏截图 Lecture 18 dac p.46**

![B4-60 补漏截图 Lecture 18 dac p.46](<Review 2.attachments/l18-dac-p46.webp>)

**B4-61 补漏截图 Lecture 18 dac p.47**

![B4-61 补漏截图 Lecture 18 dac p.47](<Review 2.attachments/l18-dac-p47.webp>)

**B4-62 补漏截图 Lecture 18 dac p.48**

![B4-62 补漏截图 Lecture 18 dac p.48](<Review 2.attachments/l18-dac-p48.webp>)

### Lecture 19-20 - ADC and Converter Errors

ADC 图题按 sampling -> holding -> quantization -> encoding；补漏截图覆盖 SAR 细节、dual-slope 和比较表。

**B4-63 ADC 基本概念**

![B4-63 ADC 基本概念](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_intro.jpg>)

**B4-64 ADC 四个步骤**

![B4-64 ADC 四个步骤](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_four_steps.jpg>)

**B4-65 ADC 采样模块**

![B4-65 ADC 采样模块](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_sampling_block.jpg>)

**B4-66 Nyquist 采样定理**

![B4-66 Nyquist 采样定理](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_nyquist.jpg>)

**B4-67 混叠现象**

![B4-67 混叠现象](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_aliasing.jpg>)

**B4-68 量化模块**

![B4-68 量化模块](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_quantization_block.jpg>)

**B4-69 量化误差**

![B4-69 量化误差](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_quantization_error_wide.jpg>)

**B4-70 SAR ADC**

![B4-70 SAR ADC](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_sar.jpg>)

**B4-71 Flash ADC**

![B4-71 Flash ADC](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_flash_wide.jpg>)

**B4-72 增益误差**

![B4-72 增益误差](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/converter_gain_error.jpg>)

**B4-73 偏移误差**

![B4-73 偏移误差](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/converter_offset_error.jpg>)

**B4-74 线性误差**

![B4-74 线性误差](<../Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/converter_linearity_error.jpg>)

**B4-75 补漏截图 Lecture 19 20 adc p.62**

![B4-75 补漏截图 Lecture 19 20 adc p.62](<Review 2.attachments/l19-20-adc-p62.webp>)

**B4-76 补漏截图 Lecture 19 20 adc p.63**

![B4-76 补漏截图 Lecture 19 20 adc p.63](<Review 2.attachments/l19-20-adc-p63.webp>)

**B4-77 补漏截图 Lecture 19 20 adc p.64**

![B4-77 补漏截图 Lecture 19 20 adc p.64](<Review 2.attachments/l19-20-adc-p64.webp>)

**B4-78 补漏截图 Lecture 19 20 adc p.65**

![B4-78 补漏截图 Lecture 19 20 adc p.65](<Review 2.attachments/l19-20-adc-p65.webp>)

**B4-79 补漏截图 Lecture 19 20 adc p.66**

![B4-79 补漏截图 Lecture 19 20 adc p.66](<Review 2.attachments/l19-20-adc-p66.webp>)

**B4-80 补漏截图 Lecture 19 20 adc p.71**

![B4-80 补漏截图 Lecture 19 20 adc p.71](<Review 2.attachments/l19-20-adc-p71.webp>)

**B4-81 补漏截图 Lecture 19 20 adc p.83**

![B4-81 补漏截图 Lecture 19 20 adc p.83](<Review 2.attachments/l19-20-adc-p83.webp>)

## 快速识图顺序

| 看到的图 | 第一反应 | 常用入口 |
| --- | --- | --- |
| transmitter/channel/receiver | 系统框图，不急着算电路 | 信号在哪个 block 被调制、放大、传输、解调 |
| diode + resistor + source | 先判 forward/reverse bias | practical model: $V_D\approx0.7\,V$ |
| BJT 分压偏置 | 先 DC，再 AC | Thevenin base network，$I_C\approx\beta I_B$ 但要检查 saturation |
| CE amplifier | 看旁路电容和负载 | $r_e'$ model，$R_C\parallel R_L$，phase inversion |
| mixer | 看 RF、LO、IF 三个频率 | $f_{out}=f_{LO}\pm f_{RF}$，再选滤波器 |
| LC/tank/matching | 先找 resonance 或 impedance matching | $f_r=1/(2\pi\sqrt{LC})$，$Q=f_r/BW$，conjugate matching |
| oscillator feedback loop | 先看反馈网络拓扑 | Barkhausen，Hartley tapped L，Colpitts tapped C |
| AM/SSB transmitter | 先看 carrier 是否保留、哪个 sideband 被保留 | AM: carrier + LSB + USB；SSB: one sideband only |
| FM/PM modulator | 先看是改频率还是改相位 | varactor 控制 $C$，VCO 输出频率随控制电压变 |
| PLL | 找 phase detector、loop filter、VCO | locked condition: input and VCO frequency match |
| RF receiver | 先看 TRF / superhet，再看 image、linearity、noise | $f_{IF}=|f_{RF}-f_{LO}|$，IIP3 看双音斜率，Friis 看第一级 |
| DAC ladder | 看 weighted resistor 还是 R-2R | weighted: 电阻二进制权重；R-2R: 只用两种电阻 |
| ADC | 按四步走 | sampling -> holding -> quantizing -> encoding |
