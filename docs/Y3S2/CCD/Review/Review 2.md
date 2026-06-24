---
lastUpdated: 2026-06-24T10:46:31+08:00
---

# Rev 2 电路图与框图总整理

<LyricCover
  image="Review 2.attachments/1782054353527.JPG"
  title="Dye the sky."
  artist="シャイニーカラーズ"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/songDetail/001uQOMI1gx65x"
  netease-url="https://music.163.com/#/song?id=2741168530"
>
  <LyricLine
    original="未来(みらい)なんて実(じつ)はどこにもない，"
    translation="未来其实哪里都不在，"
  />
  <LyricLine
    original="描(えが)きだせ、自分(じぶん)の手(て)で。"
    translation="而是用自己的双手，画出来的。"
  />
</LyricCover>

本页把 CCD 课件里的电路图、系统框图、等效模型、题图按 block 直接展示出来。已经在讲义里裁好的图优先使用高清裁图；讲义未单独裁出的图，用源 PDF 页面截图补齐。

> [!WARNING]
> Assisted with AI generation.

## Block 1 - 通信系统、器件与放大器

### Lecture 1 - Introduction

先看 transmitter-channel-receiver，再看噪声、增益、衰减的系统级模型。

**B1-01 communication-system**

![B1-01 communication-system](<../Part%201/CCD%20Lecture%201%20Introduction.attachments/communication-system.jpg>)



**B1-02 noise**

![B1-02 noise](<../Part%201/CCD%20Lecture%201%20Introduction.attachments/noise.jpg>)

**B1-03 gain**

![B1-03 gain](<../Part%201/CCD%20Lecture%201%20Introduction.attachments/gain.jpg>)

**B1-04 attenuation**

![B1-04 attenuation](<../Part%201/CCD%20Lecture%201%20Introduction.attachments/attenuation.jpg>)

**B1-05 补漏截图 Lecture 01 p.31**

![图片](Review%202.attachments/clipboard-20260622-114057.png)


### Lecture 2 - Electronic Communications

先分清 simplex/full duplex/half duplex，再看调制、解调、多路复用的方框流向。

**B1-06 duplex**

![B1-06 duplex](<../Part%201/CCD%20Lecture%202%20Electronic%20Communications.attachments/duplex_wide.jpg>)


**B1-07 modulation-transmitter**

![B1-07 modulation-transmitter](<../Part%201/CCD%20Lecture%202%20Electronic%20Communications.attachments/modulation-transmitter.jpg>)

**B1-08 demodulation-receiver**

![B1-08 demodulation-receiver](<../Part%201/CCD%20Lecture%202%20Electronic%20Communications.attachments/demodulation-receiver.jpg>)

**B1-09 multiplexing**

![B1-09 multiplexing](<../Part%201/CCD%20Lecture%202%20Electronic%20Communications.attachments/multiplexing.jpg>)


![图片](Review%202.attachments/clipboard-20260623-163737.png)


**B1-10 spectrum**

![B1-10 spectrum](<../Part%201/CCD%20Lecture%202%20Electronic%20Communications.attachments/spectrum.jpg>)



### Lecture 2b - Semiconductors Basics



**B1-11 pn-junction**

![B1-11 pn-junction](<../Part%201/CCD%20Lecture%202b%20Semiconductors%20Basics.attachments/pn-junction_wide.jpg>)

**B1-12 diode**

![B1-12 diode](<../Part%201/CCD%20Lecture%202b%20Semiconductors%20Basics.attachments/diode.jpg>)

**B1-13 forward-bias**

![B1-13 forward-bias](<../Part%201/CCD%20Lecture%202b%20Semiconductors%20Basics.attachments/forward-bias.jpg>)

**B1-14 reverse-bias**

![B1-14 reverse-bias](<../Part%201/CCD%20Lecture%202b%20Semiconductors%20Basics.attachments/reverse-bias.jpg>)

**B1-15 vi-curve**

![B1-15 vi-curve](<../Part%201/CCD%20Lecture%202b%20Semiconductors%20Basics.attachments/vi-curve_wide.jpg>)



### Lecture 3-4 - Transistors

BJT 先判工作区，JFET/MOSFET 先判偏置方式与控制量。补漏截图覆盖课件中没有单独裁出的 DC model、cutoff/saturation、JFET 偏置图。

**B1-16 BJT-structure**

![B1-16 BJT-structure](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/bjt-structure.jpg>)

**B1-17 BJT-types**

![B1-17 BJT-types](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/bjt-types_wide.jpg>)

**B1-18 BJT-bias**

![B1-18 BJT-bias](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/bjt-bias_wide.jpg>)

**B1-19 BJT-characteristics**

![B1-19 BJT-characteristics](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/bjt-characteristics_wide.jpg>)

**B1-20 dc-load-line**

![B1-20 dc-load-line](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/dc-load-line_wide.jpg>)

**B1-21 BJT-bias-example**

![B1-21 BJT-bias-example](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/bjt-bias-example_wide.jpg>)

**B1-22 BJT-switch-example**

![B1-22 BJT-switch-example](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/bjt-switch-example_wide.jpg>)

**B1-23 JFET-structure**

![B1-23 JFET-structure](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/jfet-structure_wide.jpg>)

**B1-24 JFET-operation**

![B1-24 JFET-operation](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/jfet-operation_wide.jpg>)

**B1-25 JFET-drain-curve**

![B1-25 JFET-drain-curve](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/jfet-drain-curve.jpg>)

**B1-26 JFET-example**

![B1-26 JFET-example](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/jfet-example.jpg>)

**B1-27 JFET-transfer**

![B1-27 JFET-transfer](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/jfet-transfer_wide.jpg>)

**B1-28 D-MOSFET 与 E-MOSFET**

![B1-28 D-MOSFET 与 E-MOSFET](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/mosfet-types_wide.jpg>)

**B1-29 emosfet-transfer**

![B1-29 emosfet-transfer](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/emosfet-transfer_wide.jpg>)

**B1-30 dmosfet-transfer**

![B1-30 dmosfet-transfer](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/dmosfet-transfer_wide.jpg>)

**B1-31 d-MOSFET**

![B1-31 d-MOSFET](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/d-mosfet.jpg>)

**B1-32 e-MOSFET**

![B1-32 e-MOSFET](<../Part%201/CCD%20Lecture%203-4%20Transistors.attachments/e-mosfet.jpg>)

**B1-33 补漏截图 Lecture 03 04 p.11**

![B1-33 补漏截图 Lecture 03 04 p.11](<Review%202.attachments/l03-04-p11.webp>)

**B1-34 补漏截图 Lecture 03 04 p.13**

![B1-34 补漏截图 Lecture 03 04 p.13](<Review%202.attachments/l03-04-p13.webp>)

**B1-35 补漏截图 Lecture 03 04 p.14**

![B1-35 补漏截图 Lecture 03 04 p.14](<Review%202.attachments/l03-04-p14.webp>)

**B1-36 补漏截图 Lecture 03 04 p.57**

![B1-36 补漏截图 Lecture 03 04 p.57](<Review%202.attachments/l03-04-p57.webp>)

**B1-37 补漏截图 Lecture 03 04 p.58**

![B1-37 补漏截图 Lecture 03 04 p.58](<Review%202.attachments/l03-04-p58.webp>)

**B1-38 补漏截图 Lecture 03 04 p.59**

![B1-38 补漏截图 Lecture 03 04 p.59](<Review%202.attachments/l03-04-p59.webp>)

**B1-39 补漏截图 Lecture 03 04 p.60**

![B1-39 补漏截图 Lecture 03 04 p.60](<Review%202.attachments/l03-04-p60.webp>)

**B1-40 补漏截图 Lecture 03 04 p.61**

![B1-40 补漏截图 Lecture 03 04 p.61](<Review%202.attachments/l03-04-p61.webp>)

**B1-41 补漏截图 Lecture 03 04 p.62**

![B1-41 补漏截图 Lecture 03 04 p.62](<Review%202.attachments/l03-04-p62.webp>)

**B1-42 补漏截图 Lecture 03 04 p.65**

![B1-42 补漏截图 Lecture 03 04 p.65](<Review%202.attachments/l03-04-p65.webp>)

**B1-43 补漏截图 Lecture 03 04 p.75**

![B1-43 补漏截图 Lecture 03 04 p.75](<Review%202.attachments/l03-04-p75.webp>)

**B1-44 补漏截图 Lecture 03 04 p.76**

![B1-44 补漏截图 Lecture 03 04 p.76](<Review%202.attachments/l03-04-p76.webp>)

### Lecture 5-6 - Amplifiers

放大器图题先做 DC bias，再画 AC equivalent；注意旁路电容、负载、输入电阻。

**B1-45 分压偏置的戴维南等效**

![B1-45 分压偏置的戴维南等效](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_08_thevenin_bias.jpg>)

**B1-46 r 参数模型**

![B1-46 r 参数模型](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_18_r_parameter_model.jpg>)

**B1-47 共射放大器**

![B1-47 共射放大器](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_24_common_emitter_amp.jpg>)



**B1-48 共射放大器交流等效**

![B1-48 共射放大器交流等效](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_30_ac_equivalent.jpg>)



**B1-49 基极到集电极电压增益**

![B1-49 基极到集电极电压增益](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_38_voltage_gain.jpg>)



**B1-50 共集放大器**

![B1-50 共集放大器](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_63_common_collector.jpg>)

**B1-51 共集输入电阻**

![B1-51 共集输入电阻](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_67_cc_input_resistance.jpg>)


**B1-52 共基电压增益**

![B1-52 共基电压增益](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_76_cb_voltage_gain.jpg>)

**B1-53 多级电压增益**

![B1-53 多级电压增益](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_81_multistage_gain.jpg>)






**B1-54 input resistance base**

![B1-54 input resistance base](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_33_input_resistance_base.jpg>)

**B1-55 overall gain**

![B1-55 overall gain](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_40_overall_gain.jpg>)


**B1-56 gain without bypass**

![B1-56 gain without bypass](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_44_gain_without_bypass.jpg>)

**B1-57 gain stability**

![B1-57 gain stability](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_51_gain_stability.jpg>)



**B1-58 current gain**

![B1-58 current gain](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_61_current_gain.jpg>)

**B1-59 power gain**

![B1-59 power gain](<../Part%201/CCD%20Lecture%205-6%20Amplifiers.attachments/amp_62_power_gain.jpg>)


## Block 2 - 混频、LC 匹配与振荡器

### Lecture 7 - Mixers

混频图先找 RF、LO、IF，再决定 sum/difference 哪一路被滤出。

**B2-01 混频器后接滤波器**

![B2-01 混频器后接滤波器](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_05_mixer_filter_superhet.jpg>)

**B2-02 理想频移电路**

![B2-02 理想频移电路](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_07_ideal_frequency_shifter.jpg>)

**B2-03 二极管混频器**

![B2-03 二极管混频器](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_09_diode_mixer.jpg>)

**B2-04 二极管混频器与 LC 滤波**

![B2-04 二极管混频器与 LC 滤波](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_10_diode_mixer_filter.jpg>)

**B2-05 BJT 混频器**

![B2-05 BJT 混频器](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_11_bjt_mixer_wide.jpg>)

**B2-06 双栅 MOSFET 混频器**

![B2-06 双栅 MOSFET 混频器](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_13_dual_gate_mosfet.jpg>)

**B2-07 Image frequency**

![B2-07 Image frequency](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_14_image_frequency.jpg>)

**B2-08 镜像抑制滤波器**

![B2-08 镜像抑制滤波器](<../Part%202/CCD%20Lecture%207%20Mixers.attachments/mix_15_image_rejection_filter.jpg>)






### Lecture 8 - LC Circuits and Matching Networks

LC 图题先判断 resonance、Q、bandwidth；匹配网络先判断串/并元件位置。


**B2-09 谐振响应与 Q 对带宽的影响**

![B2-09 谐振响应与 Q 对带宽的影响](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_q_bandwidth_wide.jpg>)

**B2-10 Tank circuit band-pass**

![B2-10 Tank circuit band-pass](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_19_tank_circuit_bpf_wide.jpg>)

**B2-11 高频寄生参数**

![B2-11 高频寄生参数](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_20_high_frequency_parasitics.jpg>)

**B2-12 通信模块的戴维南视角**

![B2-12 通信模块的戴维南视角](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_23_max_power_blocks.jpg>)

**B2-13 匹配网络规则**

![B2-13 匹配网络规则](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_30_matching_network_rule.jpg>)

**B2-14 rlc series**

![B2-14 rlc series](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_08_rlc_series.jpg>)

**B2-15 LC relation resonance**

![B2-15 LC relation resonance](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_09_lc_relation_resonance.jpg>)

**B2-16 inductance example**

![B2-16 inductance example](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_10_inductance_example.jpg>)

**B2-17 series response curve**

![B2-17 series response curve](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_11_series_response_curve.jpg>)

**B2-18 bandpass formula**

![B2-18 bandpass formula](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_12_bandpass_formula.jpg>)

**B2-19 q effect**

![B2-19 q effect](<../Part%202/CCD%20Lecture%208%20LC%20Circuits%20and%20Matching%20Networks.attachments/lc_13_q_effect.jpg>)

### Lecture 9 - Oscillators

振荡器图题先看反馈网络拓扑：phase-shift、Hartley、Colpitts、Clapp、VCO。

**B2-20 LC 槽路振荡过程**

![B2-20 LC 槽路振荡过程](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_04_lc_oscillator_waveform.jpg>)

**B2-21 相移振荡器**

![B2-21 相移振荡器](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_09_phase_shift_circuit.jpg>)

**B2-22 开环设计视角**

![B2-22 开环设计视角](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_14_open_loop_design.jpg>)

**B2-23 晶体、可变电容与变容二极管 VCO**

![B2-23 晶体、可变电容与变容二极管 VCO](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_crystal_vco_wide.jpg>)

**B2-24 Clapp 压控振荡器**

![B2-24 Clapp 压控振荡器](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_32_clapp_vco.jpg>)



**B2-25 tank flywheel**

![B2-25 tank flywheel](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_05_tank_flywheel.jpg>)

**B2-26 oscillator loop**


![图片](Review%202.attachments/clipboard-20260622-114921.png)

**B2-27 hartley**


![图片](Review%202.attachments/clipboard-20260622-115110.png)



**B2-28 colpitts**


![图片](Review%202.attachments/clipboard-20260622-115145.png)




**B2-29 eye diagram**


![图片](Review%202.attachments/clipboard-20260622-115229.png)



**B2-30 hartley colpitts**

![B2-30 hartley colpitts](<../Part%202/CCD%20Lecture%209%20Oscillators.attachments/osc_hartley_colpitts_wide.jpg>)

## Block 3 - AM、SSB、FM/PM 与天线

### Lecture 11-12 - Amplitude Modulation

AM 图题先看 carrier 是否保留、message 如何控制 carrier amplitude。补漏截图覆盖 high/low-level modulation 框图。

**B3-01 AM 调制框图**

![B3-01 AM 调制框图](<../Part%203/CCD%20Lecture%2011-12%20Amplitude%20Modulation.attachments/am_modulation_block.jpg>)





**B3-02 晶体管 AM 调制器**

![B3-02 晶体管 AM 调制器](<../Part%203/CCD%20Lecture%2011-12%20Amplitude%20Modulation.attachments/am_transistor_modulator_wide.jpg>)

**B3-03 集电极调制器**

![B3-03 集电极调制器](<../Part%203/CCD%20Lecture%2011-12%20Amplitude%20Modulation.attachments/am_collector_modulator_wide.jpg>)



**B3-04 补漏截图 Lecture 11 12 am p.47**

![图片](Review%202.attachments/clipboard-20260622-115331.png)


### Lecture 13 - SSB

SSB 图题先看 carrier suppression，再看 filter method、mixing 和 receiver BFO。



**B3-05 二极管环形调制器**

![B3-05 二极管环形调制器](<../Part%203/CCD%20Lecture%2013%20Single-Sideband%20Communication%20SSB.attachments/ssb_ring_modulator_wide.jpg>)

**B3-06 SSB 滤波**

![B3-06 SSB 滤波](<../Part%203/CCD%20Lecture%2013%20Single-Sideband%20Communication%20SSB.attachments/ssb_filter.jpg>)

**B3-07 滤波法 SSB 发射机**

![B3-07 滤波法 SSB 发射机](<../Part%203/CCD%20Lecture%2013%20Single-Sideband%20Communication%20SSB.attachments/ssb_transmitter_filter_method.jpg>)

**B3-08 SSB 接收机**

![B3-08 SSB 接收机](<../Part%203/CCD%20Lecture%2013%20Single-Sideband%20Communication%20SSB.attachments/ssb_receiver.jpg>)


### Lecture 14 - FM and PM

FM/PM 图题先看是 direct FM、indirect FM 还是 demodulator。补漏截图覆盖 crystal oscillator、frequency multiplier、VCO 概念页。


**B3-09 FM 频偏**

![B3-09 FM 频偏](<../Part%203/CCD%20Lecture%2014%20Frequency%20Modulation%20and%20Phase%20Modulation.attachments/fm_deviation.jpg>)


**B3-10 变容二极管 FM 调制器**

![B3-10 变容二极管 FM 调制器](<../Part%203/CCD%20Lecture%2014%20Frequency%20Modulation%20and%20Phase%20Modulation.attachments/fm_varactor_modulator_wide.jpg>)


![图片](Review%202.attachments/clipboard-20260623-163659.png)


**B3-11 相移电路**

![B3-11 相移电路](<../Part%203/CCD%20Lecture%2014%20Frequency%20Modulation%20and%20Phase%20Modulation.attachments/fm_phase_shifter.jpg>)

**B3-12 斜率检波器**

![B3-12 斜率检波器](<../Part%203/CCD%20Lecture%2014%20Frequency%20Modulation%20and%20Phase%20Modulation.attachments/fm_slope_detector.jpg>)



**B3-13 补漏截图 Lecture 14 fm p.54**

![B3-13 补漏截图 Lecture 14 fm p.54](<Review%202.attachments/l14-fm-p54.webp>)



**B3-14 补漏截图 Lecture 14 fm p.56**

![B3-14 补漏截图 Lecture 14 fm p.56](<Review%202.attachments/l14-fm-p56.webp>)


### Lecture 15 - Antennas in a Circuit

天线图题主要是方向图、场区、gain/directivity/front-to-back ratio 和通信链路。

**B3-15 天线场区**

![B3-15 天线场区](<../Part%203/CCD%20Lecture%2015%20Antennas%20in%20a%20Circuit.attachments/antenna_regions.jpg>)

**B3-16 天线方向图**

![B3-16 天线方向图](<../Part%203/CCD%20Lecture%2015%20Antennas%20in%20a%20Circuit.attachments/antenna_pattern_wide.jpg>)

**B3-17 三维方向图**

![B3-17 三维方向图](<../Part%203/CCD%20Lecture%2015%20Antennas%20in%20a%20Circuit.attachments/antenna_pattern_3d_wide.jpg>)

**B3-18 天线参数**

![B3-18 天线参数](<../Part%203/CCD%20Lecture%2015%20Antennas%20in%20a%20Circuit.attachments/antenna_parameters.jpg>)



## Block 4 - PLL、RF 接收机、DAC、ADC 与转换误差

### Lecture 16 - Phase-Locked Loop

PLL 图题先找 phase detector、loop filter、VCO；补漏截图覆盖 4046 设计题与反馈模型相关页。

**B4-01 斜率检波器频率响应**

![B4-01 斜率检波器频率响应](<../Part%204/CCD%20Lecture%2016%20Phase-Locked%20Loop%20PLL.attachments/pll_slope_detector.jpg>)

**B4-02 PLL 基本介绍**

![B4-02 PLL 基本介绍](<../Part%204/CCD%20Lecture%2016%20Phase-Locked%20Loop%20PLL.attachments/pll_basic_intro.jpg>)

**B4-03 PLL 基本系统**

![B4-03 PLL 基本系统](<../Part%204/CCD%20Lecture%2016%20Phase-Locked%20Loop%20PLL.attachments/pll_basic_system.jpg>)



**B4-04 数字 PD**

![B4-04 环路滤波器](<../Part%204/CCD%20Lecture%2016%20Phase-Locked%20Loop%20PLL.attachments/pll_loop_filter_wide.jpg>)

**B4-05 VCO**

![B4-05 VCO](<../Part%204/CCD%20Lecture%2016%20Phase-Locked%20Loop%20PLL.attachments/pll_vco_wide.jpg>)

**B4-06 PLL 反馈模型**

![B4-06 PLL 反馈模型](<../Part%204/CCD%20Lecture%2016%20Phase-Locked%20Loop%20PLL.attachments/pll_feedback_model.jpg>)



### Lecture 17 - RF Receivers

接收机图题先分 TRF / superhet，再看 image frequency、IIP3、noise figure 和 Friis 级联。Lecture 17 的图主要是系统链路、频谱关系和指标测量图。

**B4-07 TRF 接收机结构**

![B4-07 TRF 接收机结构](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_trf_receiver.jpg>)

**B4-08 超外差接收机结构**

![B4-08 超外差接收机结构](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_superhet_receiver.jpg>)

**B4-09 1 dB 压缩点**

![B4-09 1 dB 压缩点](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_gain_compression.jpg>)

**B4-10 双音输入频谱**

![B4-10 双音输入频谱](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_two_tone_input.jpg>)

**B4-11 双音输出频谱**

![B4-11 双音输出频谱](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_two_tone_output.jpg>)

**B4-12 IIP3 频谱测量关系**

![B4-12 IIP3 频谱测量关系](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_iip3_spectrum.jpg>)

**B4-13 镜像频率位置**

![B4-13 镜像频率位置](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_image_frequency.jpg>)

**B4-14 接收机噪声底与动态范围**

![B4-14 接收机噪声底与动态范围](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_noise_floor_metrics.jpg>)

**B4-15 两级系统噪声因子**

![B4-15 两级系统噪声因子](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_two_stage_noise_factor.jpg>)

**B4-16 前端灵敏度例题**

![B4-16 前端灵敏度例题](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_front_end_sensitivity_example.jpg>)

**B4-17 两级系统例题**

![B4-17 两级系统例题](<../Part%204/CCD%20Lecture%2017%20RF%20Receivers.attachments/rf_two_stage_example.jpg>)

### Lecture 18 - Digital to Analog Conversion

DAC 图题先判断 weighted resistor 还是 R-2R ladder；补漏截图覆盖 op-amp DAC 和 R-2R 逐步化简。

**B4-18 数字系统与环境接口**

![B4-18 数字系统与环境接口](<../Part%204/CCD%20Lecture%2018%20Digital%20to%20Analog%20Conversion.attachments/dac_system_interface.jpg>)

**B4-19 4-bit DAC 方框图**

![B4-19 4-bit DAC 方框图](<../Part%204/CCD%20Lecture%2018%20Digital%20to%20Analog%20Conversion.attachments/dac_4bit_block.jpg>)

**B4-20 DAC 阶梯输出**

![B4-20 DAC 阶梯输出](<../Part%204/CCD%20Lecture%2018%20Digital%20to%20Analog%20Conversion.attachments/dac_staircase_wide.jpg>)

**B4-21 加权电阻 DAC**

![B4-21 加权电阻 DAC](<../Part%204/CCD%20Lecture%2018%20Digital%20to%20Analog%20Conversion.attachments/dac_weighted_resistor_wide.jpg>)

**B4-22 R-2R 电阻梯**

![B4-22 R-2R 电阻梯](<../Part%204/CCD%20Lecture%2018%20Digital%20to%20Analog%20Conversion.attachments/dac_r2r_ladder.jpg>)

**B4-23 补漏截图 Lecture 18 dac p.29**

![B4-23 补漏截图 Lecture 18 dac p.29](<Review%202.attachments/l18-dac-p29.webp>)

**B4-24 补漏截图 Lecture 18 dac p.30**

![B4-24 补漏截图 Lecture 18 dac p.30](<Review%202.attachments/l18-dac-p30.webp>)

**B4-25 补漏截图 Lecture 18 dac p.31**

![B4-25 补漏截图 Lecture 18 dac p.31](<Review%202.attachments/l18-dac-p31.webp>)

**B4-26 补漏截图 Lecture 18 dac p.32**

![B4-26 补漏截图 Lecture 18 dac p.32](<Review%202.attachments/l18-dac-p32.webp>)

**B4-27 补漏截图 Lecture 18 dac p.33**

![B4-27 补漏截图 Lecture 18 dac p.33](<Review%202.attachments/l18-dac-p33.webp>)

**B4-28 补漏截图 Lecture 18 dac p.41**

![B4-28 补漏截图 Lecture 18 dac p.41](<Review%202.attachments/l18-dac-p41.webp>)

**B4-29 补漏截图 Lecture 18 dac p.42**

![B4-29 补漏截图 Lecture 18 dac p.42](<Review%202.attachments/l18-dac-p42.webp>)

**B4-30 补漏截图 Lecture 18 dac p.43**

![B4-30 补漏截图 Lecture 18 dac p.43](<Review%202.attachments/l18-dac-p43.webp>)

**B4-31 补漏截图 Lecture 18 dac p.44**

![B4-31 补漏截图 Lecture 18 dac p.44](<Review%202.attachments/l18-dac-p44.webp>)

**B4-32 补漏截图 Lecture 18 dac p.45**

![B4-32 补漏截图 Lecture 18 dac p.45](<Review%202.attachments/l18-dac-p45.webp>)

**B4-33 补漏截图 Lecture 18 dac p.46**

![B4-33 补漏截图 Lecture 18 dac p.46](<Review%202.attachments/l18-dac-p46.webp>)

**B4-34 补漏截图 Lecture 18 dac p.47**

![B4-34 补漏截图 Lecture 18 dac p.47](<Review%202.attachments/l18-dac-p47.webp>)

**B4-35 补漏截图 Lecture 18 dac p.48**

![B4-35 补漏截图 Lecture 18 dac p.48](<Review%202.attachments/l18-dac-p48.webp>)

### Lecture 19-20 - ADC and Converter Errors

ADC 图题按 sampling -> holding -> quantization -> encoding；补漏截图覆盖 SAR 细节、dual-slope 和比较表。

**B4-36 ADC 基本概念**

![B4-36 ADC 基本概念](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_intro.jpg>)

**B4-37 ADC 四个步骤**

![B4-37 ADC 四个步骤](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_four_steps.jpg>)

**B4-38 ADC 采样模块**

![B4-38 ADC 采样模块](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_sampling_block.jpg>)

**B4-39 Nyquist 采样定理**

![B4-39 Nyquist 采样定理](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_nyquist.jpg>)

**B4-40 混叠现象**

![B4-40 混叠现象](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_aliasing.jpg>)

**B4-41 量化模块**

![B4-41 量化模块](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_quantization_block.jpg>)

**B4-42 量化误差**

![B4-42 量化误差](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_quantization_error_wide.jpg>)

**B4-43 SAR ADC**

![B4-43 SAR ADC](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_sar.jpg>)

**B4-44 Flash ADC**

![B4-44 Flash ADC](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/adc_flash_wide.jpg>)

**B4-45 增益误差**

![B4-45 增益误差](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/converter_gain_error.jpg>)

**B4-46 偏移误差**

![B4-46 偏移误差](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/converter_offset_error.jpg>)

**B4-47 线性误差**

![B4-47 线性误差](<../Part%204/CCD%20Lecture%2019-20%20ADC%20and%20Converter%20Errors.attachments/converter_linearity_error.jpg>)

**B4-48 补漏截图 Lecture 19 20 adc p.62**

![B4-48 补漏截图 Lecture 19 20 adc p.62](<Review%202.attachments/l19-20-adc-p62.webp>)

**B4-49 补漏截图 Lecture 19 20 adc p.63**

![B4-49 补漏截图 Lecture 19 20 adc p.63](<Review%202.attachments/l19-20-adc-p63.webp>)

**B4-50 补漏截图 Lecture 19 20 adc p.64**

![B4-50 补漏截图 Lecture 19 20 adc p.64](<Review%202.attachments/l19-20-adc-p64.webp>)

**B4-51 补漏截图 Lecture 19 20 adc p.65**

![B4-51 补漏截图 Lecture 19 20 adc p.65](<Review%202.attachments/l19-20-adc-p65.webp>)

**B4-52 补漏截图 Lecture 19 20 adc p.66**

![B4-52 补漏截图 Lecture 19 20 adc p.66](<Review%202.attachments/l19-20-adc-p66.webp>)

**B4-53 补漏截图 Lecture 19 20 adc p.71**

![B4-53 补漏截图 Lecture 19 20 adc p.71](<Review%202.attachments/l19-20-adc-p71.webp>)

**B4-54 补漏截图 Lecture 19 20 adc p.83**

![B4-54 补漏截图 Lecture 19 20 adc p.83](<Review%202.attachments/l19-20-adc-p83.webp>)

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
