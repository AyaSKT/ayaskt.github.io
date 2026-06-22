# Rev 3 公式总整理 Formula Index

<LyricCover
  image="Review 3.attachments/1782054367069.jpg"
  title="Dye the sky."
  artist="シャイニーカラーズ"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/songDetail/001uQOMI1gx65x"
  netease-url="https://music.163.com/#/song?id=2741168530"
>
  <LyricLine
    original="現在(げんざい)だけが存在(そんざい)の証明(しょうめい)，"
    translation="只有存于当下的证明，"
  />
  <LyricLine
    original="刻(きざ)み込(こ)め昨日(きのう)より強(つよ)く。"
    translation="铭刻地比昨日更加深刻。"
  />
</LyricCover>

本页按 CCD 主讲义顺序整理公式。重复出现的公式只保留一次；例题中的纯数值代入不逐条重写，除非它代表一种常用计算模板。

## 章节目录

- [章节目录](#章节目录)
- [3-1 基础量与单位 Basic Quantities](#3-1-基础量与单位-basic-quantities)
  - [3-1-1 噪声、增益与 dB](#3-1-1-噪声增益与-db)
  - [3-1-2 采样、载波与带宽](#3-1-2-采样载波与带宽)
  - [3-1-3 二极管与半导体](#3-1-3-二极管与半导体)
- [3-2 BJT、JFET 与 MOSFET](#3-2-bjtjfet-与-mosfet)
  - [3-2-1 BJT 直流关系](#3-2-1-bjt-直流关系)
  - [3-2-2 JFET 与 MOSFET](#3-2-2-jfet-与-mosfet)
- [3-3 放大器 Amplifiers](#3-3-放大器-amplifiers)
  - [3-3-1 直流偏置与 Q 点](#3-3-1-直流偏置与-q-点)
  - [3-3-2 小信号参数与输入电阻](#3-3-2-小信号参数与输入电阻)
  - [3-3-3 共射、共集与共基增益](#3-3-3-共射共集与共基增益)
  - [3-3-4 电容、负载与多级增益](#3-3-4-电容负载与多级增益)
- [3-4 混频器 Mixers](#3-4-混频器-mixers)
  - [3-4-1 乘法关系与输出频率](#3-4-1-乘法关系与输出频率)
- [\\frac{1}{2}\\cos((\\omega\_1-\\omega\_2)t)](#frac12cosomega_1-omega_2t)
  - [3-4-2 非线性器件混频](#3-4-2-非线性器件混频)
  - [3-4-3 镜像频率与端口指标](#3-4-3-镜像频率与端口指标)
- [3-5 LC、匹配与反射 LC and Matching](#3-5-lc匹配与反射-lc-and-matching)
  - [3-5-1 LC 储能、Q 与谐振](#3-5-1-lc-储能q-与谐振)
  - [3-5-2 串并联转换](#3-5-2-串并联转换)
  - [3-5-3 最大功率传输、反射与 L 型匹配](#3-5-3-最大功率传输反射与-l-型匹配)
- [3-6 振荡器 Oscillators](#3-6-振荡器-oscillators)
  - [3-6-1 Barkhausen 与相移振荡器](#3-6-1-barkhausen-与相移振荡器)
  - [3-6-2 LC 反馈网络、Hartley 与 Colpitts](#3-6-2-lc-反馈网络hartley-与-colpitts)
  - [3-6-3 晶体、VCO 与相位噪声](#3-6-3-晶体vco-与相位噪声)
- [3-7 AM 与 SSB](#3-7-am-与-ssb)
  - [3-7-1 AM 信号、调制度与功率](#3-7-1-am-信号调制度与功率)
  - [3-7-2 DSB-SC、SSB 与滤波器 Q](#3-7-2-dsb-scssb-与滤波器-q)
- [3-8 FM 与 PM](#3-8-fm-与-pm)
  - [3-8-1 角度调制与调频指数](#3-8-1-角度调制与调频指数)
  - [3-8-2 边频、带宽与倍频](#3-8-2-边频带宽与倍频)
- [3-9 天线 Antennas](#3-9-天线-antennas)
  - [3-9-1 场区、方向性与增益](#3-9-1-场区方向性与增益)
- [G\_{\\mathrm{front}}(\\mathrm{dB})](#g_mathrmfrontmathrmdb)
  - [3-9-2 链路公式](#3-9-2-链路公式)
- [3-10 PLL](#3-10-pll)
  - [3-10-1 相位检测、VCO 与锁定范围](#3-10-1-相位检测vco-与锁定范围)
  - [3-10-2 PLL 传递函数](#3-10-2-pll-传递函数)
- [3-11 RF 接收机 RF Receivers](#3-11-rf-接收机-rf-receivers)
  - [3-11-1 外差、IF 与镜像频率](#3-11-1-外差if-与镜像频率)
  - [3-11-2 动态范围与非线性](#3-11-2-动态范围与非线性)
  - [3-11-3 噪声、灵敏度与 Friis 公式](#3-11-3-噪声灵敏度与-friis-公式)
- [3-12 DAC、ADC 与转换误差](#3-12-dacadc-与转换误差)
  - [3-12-1 DAC](#3-12-1-dac)
  - [3-12-2 ADC 采样、量化与类型](#3-12-2-adc-采样量化与类型)
  - [3-12-3 转换器误差](#3-12-3-转换器误差)

## 3-1 基础量与单位 Basic Quantities

### 3-1-1 噪声、增益与 dB

热噪声功率：

$$
N=kTB
$$

线性电压增益与功率增益：

$$
A_V=\frac{V_{\mathrm{out}}}{V_{\mathrm{in}}}
$$

$$
A_P=\frac{P_{\mathrm{out}}}{P_{\mathrm{in}}}
$$

级联系统在线性域相乘：

$$
A_T=A_1A_2A_3\cdots A_n
$$

功率、电压、电流的 dB 表达：

$$
G_{\mathrm{dB}}=10\log_{10}\frac{P_{\mathrm{out}}}{P_{\mathrm{in}}}
$$

$$
G_{\mathrm{dB}}=20\log_{10}\frac{V_{\mathrm{out}}}{V_{\mathrm{in}}}
$$

$$
G_{\mathrm{dB}}=20\log_{10}\frac{I_{\mathrm{out}}}{I_{\mathrm{in}}}
$$

dBm 与 dBW：

$$
P_{\mathrm{dBm}}=10\log_{10}\frac{P}{1\,\mathrm{mW}}
$$

$$
P_{\mathrm{dBW}}=10\log_{10}\frac{P}{1\,\mathrm{W}}
$$

反推功率：

$$
P=1\,\mathrm{mW}\times10^{P_{\mathrm{dBm}}/10}
$$

电阻负载上的功率与 RMS 电压：

$$
P=\frac{V_{\mathrm{rms}}^2}{R}
$$

$$
V_{\mathrm{rms}}=\sqrt{PR}
$$

信噪比：

$$
\mathrm{SNR}=\frac{S}{N}=\frac{P_S}{P_N}
$$

$$
\mathrm{SNR}_{\mathrm{dB}}=10\log_{10}\frac{P_S}{P_N}
$$

---

### 3-1-2 采样、载波与带宽

采样序列：

$$
s[n]=s(nT_s),
\qquad
n\in\mathbb{Z}
$$

$$
f_s=\frac{1}{T_s}
$$

冲激采样模型：

$$
s_{\mathrm{sampled}}(t)
=s(t)\sum_{n=-\infty}^{+\infty}\delta(t-nT_s)
$$

Nyquist rate 与 Nyquist frequency：

$$
f_{\mathrm{Nyquist\ rate}}=2f_{\max}
$$

$$
f_{\mathrm{Nyquist\ frequency}}=\frac{f_s}{2}
$$

正弦载波：

$$
v(t)=V_p\sin(2\pi ft+\theta)
$$

$$
v(t)=V_p\sin(\omega t+\theta),
\qquad
\omega=2\pi f
$$

自由空间光速与波长：

$$
c=3\times10^8\,\mathrm{m/s}
$$

$$
c=f\lambda
$$

频带宽度：

$$
BW=f_2-f_1
$$

单音 AM 的频带占用：

$$
f_c-f_m,
\qquad
f_c+f_m
$$

$$
BW=2f_m
$$

---

### 3-1-3 二极管与半导体

Bohr 模型中第 $n$ 层最多电子数：

$$
N_e=2n^2
$$

硅二极管 practical model：

$$
V_D\approx0.7\,\mathrm{V}
$$

锗二极管 practical model：

$$
V_D\approx0.3\,\mathrm{V}
$$

完整二极管模型：

$$
V_D\approx0.7\,\mathrm{V}+I_Dr_d
$$

简单二极管电路电流：

$$
V_R=V_{\mathrm{BIAS}}-V_D
$$

$$
I=\frac{V_R}{R}
$$

正向、反向与击穿的判断：

$$
V_D\gtrsim V_\gamma
$$

$$
V_D<0
$$

$$
\lvert V_D\rvert\ge V_{\mathrm{BR}}
$$

## 3-2 BJT、JFET 与 MOSFET

### 3-2-1 BJT 直流关系

NPN active region 常用电位关系：

$$
V_C>V_B>V_E
$$

硅 BJT 基极-发射极压降：

$$
V_{BE}\approx0.7\,\mathrm{V}
$$

三端电流关系：

$$
I_E=I_C+I_B
$$

直流电流增益：

$$
\beta_{\mathrm{DC}}=\frac{I_C}{I_B}
$$

$$
\alpha_{\mathrm{DC}}=\frac{I_C}{I_E}
$$

$$
\alpha_{\mathrm{DC}}<1
$$

$$
\alpha_{\mathrm{DC}}
=\frac{\beta_{\mathrm{DC}}}{\beta_{\mathrm{DC}}+1}
$$

$$
\beta_{\mathrm{DC}}
=\frac{\alpha_{\mathrm{DC}}}{1-\alpha_{\mathrm{DC}}}
$$

集电极电阻负载线：

$$
V_{CC}=I_CR_C+V_{CE}
$$

截止点：

$$
I_C=0,
\qquad
V_{CE}=V_{CC}
$$

饱和压降：

$$
V_{CE(\mathrm{sat})}\approx0.2\,\mathrm{V}
$$

饱和集电极电流：

$$
I_{C(\mathrm{sat})}
=\frac{V_{CC}-V_{CE(\mathrm{sat})}}{R_C}
$$

带 LED 的开关电路：

$$
I_{C(\mathrm{sat})}
=\frac{V_{CC}-V_{LED}-V_{CE(\mathrm{sat})}}{R_C}
$$

基极偏置：

$$
I_B=\frac{V_{BB}-V_{BE}}{R_B}
$$

active 区集电极电流：

$$
I_C=\beta_{\mathrm{DC}}I_B
$$

饱和开关所需最小基极电流：

$$
I_{B(\min)}
=\frac{I_{C(\mathrm{sat})}}{\beta_{\mathrm{DC}}}
$$

常用强迫饱和设计：

$$
I_B\approx2I_{B(\min)}
$$

由输入电压驱动基极：

$$
I_B=\frac{V_{\mathrm{in}}-V_{BE}}{R_B}
$$

$$
V_{\mathrm{in}}=I_BR_B+V_{BE}
$$

集电极-发射极电压：

$$
V_{CE}=V_{CC}-I_CR_C
$$

集电极-基极电压：

$$
V_{CB}=V_{CE}-V_{BE}
$$

---

### 3-2-2 JFET 与 MOSFET

n-channel JFET 的 gate-source 偏置：

$$
V_{GS}\le0
$$

Shockley 方程：

$$
I_D=I_{DSS}
\left(
1-\frac{V_{GS}}{V_{GS(\mathrm{off})}}
\right)^2
$$

跨导定义：

$$
g_m=\frac{\Delta I_D}{\Delta V_{GS}}
$$

若已知零偏跨导：

$$
g_m=g_{m0}
\left(
1-\frac{V_{GS}}{V_{GS(\mathrm{off})}}
\right)
$$

$$
g_{m0}=
\frac{2I_{DSS}}{\lvert V_{GS(\mathrm{off})}\rvert}
$$

JFET 输入电阻：

$$
R_{IN}=
\left\lvert
\frac{V_{GS}}{I_{GSS}}
\right\rvert
$$

JFET self-bias：

$$
V_G\approx0
$$

$$
V_S=I_DR_S
$$

$$
V_{GS}=V_G-V_S=-I_DR_S
$$

$$
R_S=
\left\lvert
\frac{V_{GS}}{I_D}
\right\rvert
$$

E-MOSFET 导通条件：

$$
V_{GS}>V_{GS(\mathrm{th})}
$$

E-MOSFET 平方律近似：

$$
I_D=K\left(V_{GS}-V_{GS(\mathrm{th})}\right)^2
$$

D-MOSFET 零偏置：

$$
V_{GS}=0,
\qquad
I_D=I_{DSS}
$$

MOSFET 击穿与导通电阻常用符号：

$$
V_{(BR)DSS},
\qquad
BV_{DSS},
\qquad
R_{DS(\mathrm{on})}
$$

## 3-3 放大器 Amplifiers

### 3-3-1 直流偏置与 Q 点

功率耗散：

$$
P_D=V_{CE}I_C
$$

分压偏置的戴维南等效：

$$
V_{TH}=V_{CC}\frac{R_2}{R_1+R_2}
$$

$$
R_{TH}=R_1\parallel R_2
$$

精确基极回路：

$$
V_{TH}=I_BR_{TH}+V_{BE}+I_ER_E
$$

$$
I_E=(\beta_{\mathrm{DC}}+1)I_B
$$

$$
I_B=
\frac{V_{TH}-V_{BE}}
{R_{TH}+(\beta_{\mathrm{DC}}+1)R_E}
$$

$$
I_C=\beta_{\mathrm{DC}}I_B
$$

近似分压偏置：

$$
V_B\approx V_{CC}\frac{R_2}{R_1+R_2}
$$

$$
V_E\approx V_B-0.7\,\mathrm{V}
$$

$$
I_E\approx I_C\approx\frac{V_E}{R_E}
$$

Q 点电压：

$$
V_E=I_ER_E
$$

$$
V_C=V_{CC}-I_CR_C
$$

$$
V_{CE}=V_C-V_E
$$

---

### 3-3-2 小信号参数与输入电阻

小信号发射极电阻：

$$
r_e'\approx\frac{25\,\mathrm{mV}}{I_E}
$$

h 参数关系：

$$
\alpha_{ac}=h_{fb}
$$

$$
\beta_{ac}=h_{fe}
$$

$$
r_e'=\frac{h_{re}}{h_{oe}}
$$

$$
r_c'=\frac{h_{re}+1}{h_{oe}}
$$

$$
r_b'=h_{ie}-\frac{h_{re}}{h_{oe}}(1+h_{fe})
$$

从基极看入：

$$
R_{in(\mathrm{base})}=\beta_{ac}r_e'
$$

总输入电阻：

$$
R_{in(\mathrm{tot})}
=R_1\parallel R_2\parallel R_{in(\mathrm{base})}
$$

源电阻与输入电阻分压：

$$
V_b=V_s
\frac{R_{in(\mathrm{tot})}}
{R_s+R_{in(\mathrm{tot})}}
$$

$$
\frac{V_s}{V_b}
=
\frac{R_s+R_{in(\mathrm{tot})}}
{R_{in(\mathrm{tot})}}
$$

---

### 3-3-3 共射、共集与共基增益

电压增益定义：

$$
A_v=\frac{V_c}{V_b}
$$

共射放大器，发射极完全旁路：

$$
A_v=-\frac{R_C}{r_e'}
$$

考虑源分压后的整体增益：

$$
A_{v(\mathrm{overall})}
=\frac{V_c}{V_s}
=A_v\frac{V_b}{V_s}
$$

$$
A_v'
=
\left(\frac{V_c}{V_b}\right)
\left(\frac{V_b}{V_s}\right)
=\frac{V_c}{V_s}
$$

无旁路电容：

$$
A_v\approx-\frac{R_C}{r_e'+R_E}
$$

若 $R_E\gg r_e'$：

$$
A_v\approx-\frac{R_C}{R_E}
$$

带负载的集电极等效电阻：

$$
R_C'=R_C\parallel R_L
$$

带负载共射增益：

$$
A_v=-\frac{R_C\parallel R_L}{r_e'}
$$

共集放大器：

$$
R_E'=R_E\parallel R_L
$$

$$
R_{in(\mathrm{base})}
=\beta_{ac}(r_e'+R_E')
$$

$$
A_v=\frac{R_e}{r_e'+R_e}\approx1
$$

$$
R_{out}\approx\frac{R_s}{\beta_{ac}}\parallel R_E
$$

$$
A_i=\frac{I_e}{I_{in}}
$$

$$
A_p\approx A_i
$$

共基放大器：

$$
R_c=R_C\parallel R_L
$$

$$
A_v=\frac{R_C}{r_e'}
$$

$$
A_v\approx\frac{R_c}{r_e'}
$$

$$
R_{in(\mathrm{emitter})}\approx r_e'
$$

$$
A_i\approx1,
\qquad
A_p\approx A_v
$$

---

### 3-3-4 电容、负载与多级增益

发射极旁路电容的经验条件：

$$
X_C\le\frac{R_E}{10}
$$

$$
C\ge\frac{1}{2\pi f_{\min}X_C}
$$

电流增益与功率增益：

$$
A_i=\frac{I_{\mathrm{out}}}{I_{\mathrm{in}}}
$$

$$
A_p=A_vA_i
$$

dB 增益：

$$
A_{v,\mathrm{dB}}
=20\log_{10}\lvert A_v\rvert
$$

$$
A_{p,\mathrm{dB}}
=10\log_{10}A_p
$$

多级电压增益：

$$
A_{v(\mathrm{total})}
=A_{v1}A_{v2}\cdots A_{vn}
$$

$$
A_{v(\mathrm{total}),\mathrm{dB}}
=A_{v1,\mathrm{dB}}+A_{v2,\mathrm{dB}}+\cdots+A_{vn,\mathrm{dB}}
$$

## 3-4 混频器 Mixers

### 3-4-1 乘法关系与输出频率

两个输入信号：

$$
v_1(t)=V_1\cos(\omega_1t)
$$

$$
v_2(t)=V_2\cos(\omega_2t)
$$

余弦乘法：

$$
\cos(\omega_1t)\cos(\omega_2t)
=
\frac{1}{2}\cos((\omega_1-\omega_2)t)
+
\frac{1}{2}\cos((\omega_1+\omega_2)t)
$$

正弦乘法：

$$
\sin(\omega_1t)\sin(\omega_2t)
=
\frac{1}{2}\cos((\omega_1-\omega_2)t)
-
\frac{1}{2}\cos((\omega_1+\omega_2)t)
$$

输出角频率：

$$
\omega_{\mathrm{out}}=\omega_1+\omega_2
$$

$$
\omega_{\mathrm{out}}=\lvert\omega_1-\omega_2\rvert
$$

对应频率：

$$
f_{\mathrm{out}}=f_1+f_2
\quad\mathrm{or}\quad
f_{\mathrm{out}}=\lvert f_1-f_2\rvert
$$

三阶互调常见分量：

$$
2f_1\pm f_2,
\qquad
2f_2\pm f_1
$$

---

### 3-4-2 非线性器件混频

二极管指数关系：

$$
i_D=I_S\left(e^{v_D/V_T}-1\right)
$$

二极管混频输入：

$$
v_D=\frac{1}{2}(v_1+v_2)
$$

小信号展开：

$$
e^{v_D/V_T}\approx
1+\frac{v_D}{V_T}
+
\frac{1}{2}\left(\frac{v_D}{V_T}\right)^2
$$

平方项：

$$
(v_1+v_2)^2=v_1^2+2v_1v_2+v_2^2
$$

平方项产生的频率：

$$
\frac{1}{2}\left(\frac{v_D}{V_T}\right)^2
\rightarrow
2\omega_1,\quad
2\omega_2,\quad
\lvert\omega_1-\omega_2\rvert,\quad
\omega_1+\omega_2
$$

BJT 混频：

$$
i_C=I_S\left(e^{v_{BE}/V_T}-1\right)
$$

$$
v_{BE}=\frac{1}{2}(v_1+v_2)
$$

JFET 平方律：

$$
I_D=I_{DSS}
\left(
1-\frac{v_{GS}}{V_P}
\right)^2
$$

展开后：

$$
I_D=I_{DSS}
\left[
1-2\frac{v_{GS}}{V_P}
+
\frac{v_{GS}^2}{V_P^2}
\right]
$$

JFET 混频输出项：

$$
I_D\sim
-I_{DSS}\frac{V_1V_2}{2V_P^2}
\left[
\cos(\lvert\omega_1-\omega_2\rvert t)
+
\cos((\omega_1+\omega_2)t)
\right]
$$

双栅 MOSFET 混频输出项：

$$
V_{\mathrm{out}}\sim
g_{m\Delta}R_DV_1
\left[
\cos(\lvert\omega_1-\omega_2\rvert t)
+
\cos((\omega_1+\omega_2)t)
\right]
$$

---

### 3-4-3 镜像频率与端口指标

超外差中频：

$$
f_{\mathrm{IF}}
=\lvert f_{\mathrm{LO}}-f_{\mathrm{RF}}\rvert
$$

低边注入示例：

$$
f_{\mathrm{RF,desired}}=f_{\mathrm{LO}}-f_{\mathrm{IF}}
$$

$$
f_{\mathrm{image}}=f_{\mathrm{LO}}+f_{\mathrm{IF}}
$$

一般镜像条件：

$$
\lvert f_{\mathrm{image}}-f_{\mathrm{LO}}\rvert
=
\lvert f_{\mathrm{RF}}-f_{\mathrm{LO}}\rvert
=f_{\mathrm{IF}}
$$

带通偏离量：

$$
\delta=\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega}
$$

镜像抑制幅度比：

$$
A_r=
\frac{V_0(\omega)}{V_0(\omega_0)}
=
\frac{1}{\sqrt{1+(\delta Q)^2}}
$$

镜像抑制 dB：

$$
A_{r,\mathrm{dB}}=20\log_{10}(A_r)
$$

回波损耗：

$$
RL=-20\log_{10}
\left\lvert
\frac{V_{\mathrm{ref}}}{V_{\mathrm{inc}}}
\right\rvert
$$

VSWR：

$$
VSWR=\frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}
$$

$$
\lvert\Gamma\rvert=
\frac{VSWR-1}{VSWR+1}
$$

$$
\lvert\Gamma\rvert=
\left\lvert
\frac{V_{\mathrm{ref}}}{V_{\mathrm{inc}}}
\right\rvert
$$

## 3-5 LC、匹配与反射 LC and Matching

### 3-5-1 LC 储能、Q 与谐振

电容储能：

$$
E_C=\frac{1}{2}CV^2
$$

电感储能：

$$
E_L=\frac{1}{2}LI^2
$$

电感 Q：

$$
Q_L=\frac{\text{电抗}}{\text{电阻}}
=\frac{\omega L}{R}
$$

电容 Q：

$$
Q_C=\frac{\text{电纳}}{\text{电导}}
=\frac{\omega C}{G}
=\omega CR
$$

耗散因数：

$$
D=\frac{1}{Q}
$$

串联 RLC 阻抗：

$$
Z=R+j(X_L-X_C)
$$

$$
X_L=\omega L
$$

$$
X_C=\frac{1}{\omega C}
$$

谐振条件：

$$
X_L=X_C
$$

$$
\omega_0L=\frac{1}{\omega_0C}
$$

$$
\omega_0=\frac{1}{\sqrt{LC}}
$$

$$
f_0=\frac{1}{2\pi\sqrt{LC}}
$$

串联谐振阻抗最小：

$$
Z_{\min}=R
$$

串联 RLC 带宽：

$$
BW=\frac{R}{2\pi L}
$$

串联 Q：

$$
Q=\frac{\omega_0L}{R}
$$

带宽与 Q：

$$
Q=\frac{f_r}{BW}
$$

半功率频率近似：

$$
f_1=f_r-\frac{BW}{2}
$$

$$
f_2=f_r+\frac{BW}{2}
$$

$$
BW=f_2-f_1,
\qquad
f_r\approx\sqrt{f_1f_2},
\qquad
Q=\frac{f_r}{BW}
$$

并联 LC 槽路谐振：

$$
f_r=
\frac{1}{2\pi}
\sqrt{
\frac{1}{LC}-\frac{R^2}{L^2}
}
$$

高 Q 近似：

$$
f_r\approx\frac{1}{2\pi\sqrt{LC}}
$$

并联槽路最大阻抗：

$$
Z_{\max}\approx Q^2R
$$

---

### 3-5-2 串并联转换

串并联 Q 相等：

$$
Q_S=Q_P=Q
$$

$$
Q_S=\frac{X_S}{R_S}
$$

$$
Q_P=\frac{R_P}{X_P}
$$

串联到并联：

$$
R_P=R_S(1+Q^2)
$$

$$
X_P=X_S\left(1+\frac{1}{Q^2}\right)
$$

高 Q 近似：

$$
R_P\approx R_SQ^2
$$

$$
X_P\approx X_S
$$

---

### 3-5-3 最大功率传输、反射与 L 型匹配

源阻抗与负载阻抗：

$$
Z_0=R_0+jX_0
$$

$$
Z_L=R_L+jX_L
$$

负载功率：

$$
P_L=
\frac{1}{2}
\frac{\lvert V_0\rvert^2R_L}
{(R_0+R_L)^2+(X_0+X_L)^2}
$$

共轭匹配：

$$
Z_L=Z_0^*
$$

$$
R_L=R_0
$$

$$
X_L=-X_0
$$

反射系数：

$$
\Gamma=\frac{Z_2-Z_1}{Z_2+Z_1}
$$

无反射：

$$
\Gamma=0
$$

回波损耗：

$$
RL=-20\log_{10}\lvert\Gamma\rvert
$$

失配损耗线性比：

$$
ML=\frac{1}{1-\lvert\Gamma\rvert^2}
$$

失配损耗 dB：

$$
ML=-10\log_{10}(1-\lvert\Gamma\rvert^2)
$$

L 型匹配先取高低电阻：

$$
Q=\sqrt{\frac{R_+}{R_-}-1}
$$

低电阻侧串联电抗：

$$
X_S=QR_-
$$

高电阻侧并联电抗：

$$
X_P=\frac{R_+}{Q}
$$

对应 Q：

$$
Q_S=\frac{X_S}{R_-},
\qquad
Q_P=\frac{R_+}{X_P}
$$

匹配后：

$$
Z_S=Z_P^*
$$

由电抗求元件值：

$$
L=\frac{X_L}{2\pi f}
$$

$$
C=\frac{1}{2\pi fX_C}
$$

## 3-6 振荡器 Oscillators

### 3-6-1 Barkhausen 与相移振荡器

正弦输出：

$$
v_o(t)=A\cos(\omega_0t)
$$

LC 槽路谐振：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

开环放大与反馈：

$$
V_o=AV_i
$$

$$
V_f=\beta V_o=\beta AV_i
$$

环路增益：

$$
L=A\beta
$$

Barkhausen 幅度条件：

$$
\lvert A\beta\rvert\ge1
$$

Barkhausen 相位条件：

$$
\angle A\beta=2\pi n
$$

正反馈闭环增益：

$$
V_o=A(V_i+\beta V_o)
$$

$$
\frac{V_o}{V_i}
=
\frac{A}{1-A\beta}
$$

RC 相移振荡器：

$$
f=\frac{1}{2\pi RC\sqrt6}
$$

$$
\lvert A\rvert\ge29
$$

对应角频率与反馈系数：

$$
\omega_0=\frac{1}{\sqrt6RC}
$$

$$
\beta=\frac{v_3}{v_0}=-\frac{1}{29}
$$

---

### 3-6-2 LC 反馈网络、Hartley 与 Colpitts

中心接地抽头电感：

$$
\omega_0=\frac{1}{\sqrt{(L_1+L_2)C}},
\qquad
\beta=-\frac{L_1}{L_2}
$$

中心接地抽头电容：

$$
\omega_0=
\sqrt{\frac{C_1+C_2}{C_1C_2L}},
\qquad
\beta\approx-\frac{C_1}{C_2}
$$

底部接地抽头电感：

$$
\omega_0=\frac{1}{\sqrt{(L_1+L_2)C}},
\qquad
\beta=\frac{L_1}{L_1+L_2}
$$

底部接地抽头电容：

$$
\omega_0=
\sqrt{\frac{C_1+C_2}{C_1C_2L}},
\qquad
\beta=\frac{C_2}{C_1+C_2}
$$

抽头电感网络的等效负载：

$$
R_{\mathrm{eff}}
=
R_L\left(\frac{L_2}{L_1}\right)^2
\parallel
\frac{Q\omega L_2^2}{L_1+L_2}
$$

加载后的更精确谐振频率：

$$
f_r=
\frac{1}{2\pi\sqrt{LC_T}}
\sqrt{\frac{Q^2}{Q^2+1}}
$$

Hartley：

$$
f_r=\frac{1}{2\pi\sqrt{(L_1+L_2)C}}
$$

Colpitts 等效电容：

$$
C_T=\frac{C_1C_2}{C_1+C_2}
$$

Colpitts：

$$
f_r=\frac{1}{2\pi\sqrt{LC_T}}
$$

Colpitts 反馈系数：

$$
B=\frac{V_f}{V_{\mathrm{out}}}
\approx
\frac{X_{C1}}{X_{C2}}
=
\frac{C_2}{C_1}
$$

起振增益条件：

$$
A_vB>1
$$

稳态增益条件：

$$
A_vB=1
$$

Colpitts 放大器增益要求：

$$
A_v>\frac{C_1}{C_2}
$$

---

### 3-6-3 晶体、VCO 与相位噪声

频率稳定度换算：

$$
0.001\%=10^{-5}=10\,\mathrm{ppm}
$$

平行板电容：

$$
C=\frac{\epsilon A}{d}
$$

变容二极管 VCO：

$$
\omega_0=
\frac{1}{\sqrt{L(C+C_D(V_D))}}
$$

变容二极管电容近似：

$$
C_D\approx
\frac{C_0}
{\sqrt{1+\frac{\lvert V_D\rvert}{0.5\,\mathrm{V}}}}
$$

串联电容：

$$
C_S=\frac{C_1C_2}{C_1+C_2}
$$

变容二极管与串联电容合成：

$$
C_T=\frac{C_DC_S}{C_D+C_S}
$$

VCO 角频率：

$$
\omega_0=\frac{1}{\sqrt{LC_T}}
$$

带相位噪声的输出：

$$
v_o(t)=A\cos(\omega_0t+\phi_n(t))
$$

相位噪声单位：

$$
L(\Delta f)\quad [\mathrm{dBc/Hz}]
$$

## 3-7 AM 与 SSB

### 3-7-1 AM 信号、调制度与功率

载波：

$$
e_c(t)=E_c\cos{(\omega_ct)}
$$

消息：

$$
e_m(t)=E_m\cos{(\omega_mt)}
$$

AM 信号：

$$
e_{\mathrm{AM}}(t)
=
E_c\left[1+m\cos{(\omega_mt)}\right]
\cos{(\omega_ct)}
$$

包络：

$$
E_{\mathrm{env}}(t)
=
E_c\left[1+m\cos{(\omega_mt)}\right]
$$

调制度定义：

$$
m=
\frac{\text{maximum change in carrier amplitude}}
{\text{unmodulated carrier amplitude}}
$$

由包络最大最小值求调制度：

$$
m=\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}
$$

$$
\%m=
\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}
\times100\%
$$

$$
M=m\times100\%
$$

过调制边界：

$$
1+m\cos{(\omega_mt)}
$$

单音 AM 展开：

$$
\begin{aligned}
e_{\mathrm{AM}}(t)
&=E_c\cos{(\omega_ct)}
+mE_c\cos{(\omega_mt)}\cos{(\omega_ct)}\\
&=E_c\cos{(\omega_ct)}
+\frac{mE_c}{2}\cos{[(\omega_c+\omega_m)t]}
+\frac{mE_c}{2}\cos{[(\omega_c-\omega_m)t]}
\end{aligned}
$$

边带频率：

$$
f_{\mathrm{USB}}=f_c+f_m
$$

$$
f_{\mathrm{LSB}}=f_c-f_m
$$

AM 带宽：

$$
\mathrm{BW}_{\mathrm{AM}}=2f_{m,\max}
$$

载波功率：

$$
P_c=\frac{E_c^2}{2R}
$$

单个边带功率：

$$
P_{\mathrm{USB}}
=P_{\mathrm{LSB}}
=\frac{m^2}{4}P_c
$$

总边带功率：

$$
P_{\mathrm{SB}}
=P_{\mathrm{USB}}+P_{\mathrm{LSB}}
=\frac{m^2}{2}P_c
$$

AM 总功率：

$$
P_T=P_c\left(1+\frac{m^2}{2}\right)
$$

100% 调制时：

$$
P_T=1.5P_c
$$

AM 电流关系：

$$
I_T=I_c\sqrt{1+\frac{m^2}{2}}
$$

由总电流反推调制度：

$$
m=
\sqrt{
2\left[
\left(\frac{I_T}{I_c}\right)^2-1
\right]
}
$$

AM 总电压：

$$
E_T=E_c\sqrt{1+\frac{m^2}{2}}
$$

平方律调制器输入与输出：

$$
v_{\mathrm{in}}(t)
=
E_c\cos{(\omega_ct)}
+
E_m\cos{(\omega_mt)}
$$

$$
v_{\mathrm{out}}(t)
=
a_1v_{\mathrm{in}}(t)+a_2v_{\mathrm{in}}^2(t)
$$

平方项展开：

$$
v_{\mathrm{in}}^2
=
E_c^2\cos^2{(\omega_ct)}
+
E_m^2\cos^2{(\omega_mt)}
+
2E_cE_m\cos{(\omega_ct)}\cos{(\omega_mt)}
$$

---

### 3-7-2 DSB-SC、SSB 与滤波器 Q

AM 频谱：

$$
f_c-f_m,
\qquad
f_c,
\qquad
f_c+f_m
$$

SSB 带宽：

$$
\mathrm{BW}_{\mathrm{SSB}}
\approx
f_{m,\max}-f_{m,\min}
$$

AM 功率分布：

$$
P_{\mathrm{AM}}
=P_c+P_{\mathrm{USB}}+P_{\mathrm{LSB}}
$$

$$
P_{\mathrm{USB}}=P_{\mathrm{LSB}}
$$

SSB 相对 AM 的综合优势估算：

$$
10\log_{10}
\left[
\left(
\frac{P_{\mathrm{SSB}}}{P_{\mathrm{AM}}}
\right)
\left(
\frac{BW_{\mathrm{AM}}}{BW_{\mathrm{SSB}}}
\right)^2
\right]
$$

DSB-SC：

$$
s_{\mathrm{DSB}}(t)
=A_cm(t)\cos{(\omega_ct)}
$$

单音 DSB-SC 展开：

$$
m(t)=A_m\cos{(\omega_mt)}
$$

$$
\begin{aligned}
s_{\mathrm{DSB}}(t)
&=A_cA_m\cos{(\omega_mt)}\cos{(\omega_ct)}\\
&=\frac{A_cA_m}{2}\cos{[(\omega_c+\omega_m)t]}
+\frac{A_cA_m}{2}\cos{[(\omega_c-\omega_m)t]}
\end{aligned}
$$

SSB 滤波器 Q：

$$
Q=
\frac{
f_c\left(10^{\mathrm{dB}/20}\right)^{1/2}
}
{4\Delta f}
$$

Product detector 差频恢复：

$$
(f_c+f_m)-f_c=f_m
$$

粗略选择性：

$$
Q=\frac{f_{\mathrm{center}}}{f_H-f_L}
$$

## 3-8 FM 与 PM

### 3-8-1 角度调制与调频指数

角度调制载波：

$$
c(t)=E_c\cos{(\omega_ct+\phi)}
=E_c\cos{\theta(t)}
$$

瞬时角频率：

$$
\omega_i(t)=\frac{d\theta(t)}{dt}
$$

FM 相位：

$$
\theta_{\mathrm{FM}}(t)
=\omega_ct+k_f\int m(t)\,dt
$$

PM 相位：

$$
\theta_{\mathrm{PM}}(t)
=\omega_ct+k_pm(t)
$$

PM 信号：

$$
e_{\mathrm{PM}}(t)
=A_c\sin{(\omega_ct+m_p\sin{(\omega_mt)})}
$$

PM 调制指数：

$$
m_p=\Delta\theta_{\max}
\qquad \mathrm{(rad)}
$$

VCO 频率模型：

$$
f_{\mathrm{out}}(t)=f_c+k_fe_i(t)
$$

频偏：

$$
\Delta f=k_fE_i
$$

FM 调制指数：

$$
m_f=\frac{\Delta f}{f_m}
$$

FM 信号：

$$
e_{\mathrm{FM}}(t)
=E_c\cos{(\omega_ct+m_f\sin{(\omega_mt)})}
$$

---

### 3-8-2 边频、带宽与倍频

FM 边频：

$$
f_c\pm nf_m,
\qquad
n=1,2,3,\ldots
$$

第 $n$ 阶边频幅度：

$$
E_n=E_cJ_n(m_f)
$$

Carson 定则：

$$
\mathrm{BW}_{\mathrm{FM}}
\approx
2(\Delta f+f_{m,\max})
$$

单音形式：

$$
\mathrm{BW}_{\mathrm{FM}}
\approx
2f_m(m_f+1)
$$

按最大频偏写法：

$$
\mathrm{BW}_{\mathrm{FM}}
\approx
2\left(
\frac{\Delta f_{\max}}{f_{m,\max}}+1
\right)f_{m,\max}
$$

Deviation ratio：

$$
DR=\frac{\Delta f_{\max}}{f_{m,\max}}
$$

变容 FM：

$$
f_c=\frac{1}{2\pi\sqrt{LC}}
$$

$$
C_T=C_1+C_{\mathrm{varactor}}
$$

$$
f_c(t)=\frac{1}{2\pi\sqrt{LC_T(t)}}
$$

RC 移相：

$$
\phi=\tan^{-1}\left(\frac{X_C}{R}\right)
$$

$$
X_C=\frac{1}{2\pi fC}
$$

$$
\theta=-\tan^{-1}\left(\frac{R}{X_C}\right)
$$

倍频器：

$$
f_{\mathrm{out}}=Nf_{\mathrm{in}}
$$

$$
\Delta f_{\mathrm{out}}=N\Delta f_{\mathrm{in}}
$$

Peak envelope power：

$$
PEP=
\frac{V_{\mathrm{RMS}}^2}{R}
=
\frac{(V/\sqrt2)^2}{R}
=
\frac{V^2}{2R}
$$

## 3-9 天线 Antennas

### 3-9-1 场区、方向性与增益

波长：

$$
\lambda=\frac{c}{f}
$$

远场边界：

$$
R_0\ge\frac{2D^2}{\lambda}
$$

反应近场边界近似：

$$
R_{\mathrm{reactive}}
\approx
0.62\sqrt{\frac{D^3}{\lambda}}
$$

由远场距离反推频率：

$$
f=\frac{cR_0}{2D^2}
$$

波束宽度：

$$
\mathrm{FNBW}\approx2\times\mathrm{HPBW}
$$

球面积：

$$
4\pi R^2
$$

各向同性功率密度：

$$
W_0=
\frac{P_{\mathrm{rad}}}{4\pi R^2}
\qquad \mathrm{(W/m^2)}
$$

辐射强度：

$$
U=R^2W_0
$$

各向同性辐射强度：

$$
U=\frac{P_{\mathrm{rad}}}{4\pi}
$$

方向性：

$$
D(\theta,\phi)
=
\frac{4\pi U(\theta,\phi)}{P_{\mathrm{rad}}}
$$

各向同性方向性：

$$
D=1=0\,\mathrm{dB}
$$

增益：

$$
G(\theta,\phi)
=
\frac{4\pi U(\theta,\phi)}{P_{\mathrm{in}}}
$$

效率与增益：

$$
G=\eta D
$$

天线带宽：

$$
\mathrm{BW}=f_H-f_L
$$

前后比：

$$
\mathrm{F/B}
=
G_{\mathrm{front}}(\mathrm{dB})
-
G_{\mathrm{back}}(\mathrm{dB})
$$

---

### 3-9-2 链路公式

距离 $R$ 处的功率密度：

$$
W(R)=\frac{P_tG_t}{4\pi R^2}
$$

接收功率：

$$
P_r=W(R)A_e
$$

有效孔径：

$$
A_e=\frac{G_r\lambda^2}{4\pi}
$$

Friis 传输公式：

$$
P_r=P_tG_tG_r
\left(
\frac{\lambda}{4\pi R}
\right)^2
$$

自由空间路径损耗：

$$
L_{\mathrm{fs}}(\mathrm{dB})
=
20\log_{10}
\left(
\frac{4\pi R}{\lambda}
\right)
$$

## 3-10 PLL

### 3-10-1 相位检测、VCO 与锁定范围

相位检测器输出：

$$
v_{\phi}=K_D\phi_e
$$

自由运行：

$$
f_{\mathrm{osc}}=f_0
$$

锁定：

$$
f_{\mathrm{osc}}=f_{\mathrm{in}}
$$

锁定范围：

$$
f_{\min}\le f_{\mathrm{in}}\le f_{\max}
\qquad
\text{lock range}
$$

捕获范围：

$$
f_0-f_c\le f_{\mathrm{in}}\le f_0+f_c
\qquad
\text{capture range}
$$

模拟相位检测器输入：

$$
x_1(t)=A_1\cos{(\omega t+\phi_1)}
$$

$$
x_2(t)=A_2\cos{(\omega t+\phi_2)}
$$

乘法相位检测：

$$
x_1(t)x_2(t)
=
\frac{A_1A_2}{2}\cos{(\phi_1-\phi_2)}
+
\frac{A_1A_2}{2}\cos{(2\omega t+\phi_1+\phi_2)}
$$

低通后：

$$
v_{\phi}\propto\cos{(\phi_1-\phi_2)}
$$

数字相位检测器占空比：

$$
D_{\phi}=\frac{\phi_e}{\pi}
$$

$$
V_{\phi}
=D_{\phi}V_{DD}
=\frac{V_{DD}}{\pi}\phi_e
$$

数字相位检测器增益：

$$
K_D=\frac{V_{DD}}{\pi}
\qquad
\mathrm{(V/rad)}
$$

一阶环路滤波器：

$$
F(s)=\frac{1}{1+sRC}
$$

$$
F(s)=\frac{1}{1+s/\omega_p}
$$

$$
\omega_p=\frac{1}{RC},
\qquad
f_p=\frac{\omega_p}{2\pi}
$$

VCO：

$$
f_{\mathrm{osc}}=f_0+K_{\mathrm{VCO}}v_o
$$

$$
\omega_{\mathrm{osc}}=\omega_0+K_Ov_o
$$

PLL 增益：

$$
K_D=\frac{v_{\phi}}{\phi_e}
\qquad
\mathrm{(V/rad)}
$$

$$
K_O=\frac{\Delta\omega_{\mathrm{osc}}}{v_o}
\qquad
\mathrm{rad/(s\cdot V)}
$$

$$
K_V=K_DK_O
$$

控制电压与相位误差：

$$
v_o=\frac{\omega_1-\omega_0}{K_O}
$$

$$
v_o\approx K_D\phi_e
$$

$$
\phi_e=
\frac{\omega_1-\omega_0}{K_DK_O}
$$

4046 VCO 近似：

$$
f_{\min}
\approx
\frac{1}{R_2(C_1+32\,\mathrm{pF})}
$$

$$
f_{\max}
\approx
f_{\min}
+
\frac{1}{R_1(C_1+32\,\mathrm{pF})}
$$

$$
K_{\mathrm{VCO}}
=
\frac{\Delta f_{\mathrm{osc}}}{\Delta v_o}
=
\frac{f_{\max}-f_{\min}}{V_{DD}}
$$

---

### 3-10-2 PLL 传递函数

反馈模型：

$$
\Phi_{\mathrm{out}}(s)
=
\frac{K_OF(s)K_D}{s}
\left[
\Phi_{\mathrm{in}}(s)-\Phi_{\mathrm{out}}(s)
\right]
$$

闭环传递函数：

$$
H(s)=
\frac{\Phi_{\mathrm{out}}(s)}{\Phi_{\mathrm{in}}(s)}
=
\frac{K_DK_OF(s)}
{s+K_DK_OF(s)}
$$

若 $F(s)=1$：

$$
H(s)=\frac{K_V}{s+K_V}
$$

一阶低通环路滤波器：

$$
F(s)=\frac{\omega_p}{s+\omega_p}
$$

开环：

$$
G(s)=\frac{K_VF(s)}{s}
$$

二阶闭环：

$$
H(s)=
\frac{K_V\omega_p}
{s^2+s\omega_p+K_V\omega_p}
$$

自然频率：

$$
\omega_n=\sqrt{K_V\omega_p}
=\sqrt{K_DK_O\omega_p}
$$

阻尼比：

$$
\zeta=\frac{\omega_p}{2\omega_n}
$$

## 3-11 RF 接收机 RF Receivers

### 3-11-1 外差、IF 与镜像频率

TRF 选择性仍可用 tuned circuit 的 $Q$ 表示：

$$
Q=\frac{f_0}{BW}
$$

Mixer 输出和频与差频：

$$
f_{\mathrm{sum}}=f_{\mathrm{RF}}+f_{\mathrm{LO}}
$$

$$
f_{\mathrm{diff}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

Superheterodyne receiver 的 IF：

$$
f_{\mathrm{IF}}
=
\left| f_{\mathrm{RF}}-f_{\mathrm{LO}} \right|
$$

High-side injection：

$$
f_{\mathrm{LO}}>f_{\mathrm{RF}}
$$

$$
f_{\mathrm{LO}}=f_{\mathrm{RF}}+f_{\mathrm{IF}}
$$

$$
f_{\mathrm{image}}
=
f_{\mathrm{LO}}+f_{\mathrm{IF}}
=
f_{\mathrm{RF}}+2f_{\mathrm{IF}}
$$

Low-side injection：

$$
f_{\mathrm{LO}}<f_{\mathrm{RF}}
$$

$$
f_{\mathrm{LO}}=f_{\mathrm{RF}}-f_{\mathrm{IF}}
$$

$$
f_{\mathrm{image}}
=
f_{\mathrm{LO}}-f_{\mathrm{IF}}
=
f_{\mathrm{RF}}-2f_{\mathrm{IF}}
$$

Desired RF 与 image RF 的间隔：

$$
\left| f_{\mathrm{image}}-f_{\mathrm{RF}} \right|
=
2f_{\mathrm{IF}}
$$

---

### 3-11-2 动态范围与非线性

电压幅度动态范围：

$$
DR
=
20\log_{10}
\left(
\frac{V_{\max}}{V_{\min}}
\right)
\qquad \mathrm{dB}
$$

接收机非线性多项式模型：

$$
y(t)
=
a_0+a_1x(t)+a_2x^2(t)+a_3x^3(t)+\cdots
$$

单音输入：

$$
x(t)=B\cos{(\omega t)}
$$

输出谐波展开：

$$
y(t)
=
b_0+b_1\cos{(\omega t)}
+b_2\cos{(2\omega t)}
+b_3\cos{(3\omega t)}
+\cdots
$$

其中：

$$
b_0=\frac{a_2B^2}{2}
$$

$$
b_1=a_1B+\frac{3a_3B^3}{4}
$$

$$
b_2=\frac{a_2B^2}{2},
\qquad
b_3=\frac{a_3B^3}{4}
$$

各阶谐波失真比例：

$$
D_2=\frac{b_2}{b_1},
\qquad
D_3=\frac{b_3}{b_1},
\qquad
D_4=\frac{b_4}{b_1},
\ldots
$$

总谐波失真：

$$
THD
=
\sqrt{
D_2^2+D_3^2+\cdots
}
$$

小信号输出功率：

$$
P_{\mathrm{out}}=AP_{\mathrm{in}}
$$

1 dB compression 条件：

$$
20\log_{10}
\left|
1+\frac{3a_3B^2}{4a_1}
\right|
=
-1\,\mathrm{dB}
$$

输入幅度：

$$
B_{1\mathrm{dB}}
=
\sqrt{
0.145
\left|
\frac{a_1}{a_3}
\right|
}
$$

$$
S_{\mathrm{in}}(1\,\mathrm{dB})
=
20\log_{10}{B_{1\mathrm{dB}}}
$$

Two-tone 输入：

$$
x(t)
=
B_1\cos{(\omega_a t)}
+
B_2\cos{(\omega_b t)}
$$

二阶互调分量：

$$
2\omega_a,\quad
2\omega_b,\quad
\omega_a+\omega_b,\quad
\left| \omega_a-\omega_b \right|
$$

三阶互调分量：

$$
3\omega_a,\quad
3\omega_b,\quad
2\omega_a\pm\omega_b,\quad
2\omega_b\pm\omega_a
$$

靠近原始双音的 IM3：

$$
2\omega_a-\omega_b,
\qquad
2\omega_b-\omega_a
$$

IIP3 对应输入幅度：

$$
B_{\mathrm{IIP3}}
=
\sqrt{
\frac{4}{3}
\left|
\frac{a_1}{a_3}
\right|
}
$$

IIP3 与 1 dB compression point 的近似关系：

$$
P_{\mathrm{IIP3}}
\approx
P_{1\mathrm{dB}}+9.6\,\mathrm{dB}
$$

由双音测试读 IIP3：

$$
IIP3
=
P_{\mathrm{in}}
+
\frac{\Delta P}{2}
\qquad \mathrm{dB}
$$

---

### 3-11-3 噪声、灵敏度与 Friis 公式

热噪声功率：

$$
P_n=kT\Delta f
$$

室温 $290\,\mathrm{K}$ 下的每 Hz 热噪声底：

$$
P_n=-174\,\mathrm{dBm/Hz}
$$

给定带宽 $B$ 的噪声底：

$$
P_n
=
-174+10\log_{10}{B}
\qquad \mathrm{dBm}
$$

考虑 receiver noise figure：

$$
P_n
=
-174+10\log_{10}{B}+NF
\qquad \mathrm{dBm}
$$

灵敏度：

$$
S_n
=
P_n+SNR_{\mathrm{desired}}
\qquad \mathrm{dBm}
$$

以 1 dB compression point 作为上限时：

$$
DR_{\mathrm{ideal}}
=
P_{1\mathrm{dB}}-S_n
\qquad \mathrm{dB}
$$

Noise factor：

$$
F=\frac{SNR_i}{SNR_o}
$$

Noise figure：

$$
NF=10\log_{10}{F}
\qquad \mathrm{dB}
$$

由附加噪声表示：

$$
F
=
1+\frac{N_a}{N_i}
$$

由等效噪声温度表示：

$$
F=1+\frac{T_e}{T_i}
$$

$$
T_e=T_i(F-1)=290(F-1)
$$

两级 Friis noise formula：

$$
F_{\mathrm{total}}
=
F_1+\frac{F_2-1}{G_1}
$$

多级 Friis noise formula：

$$
F_{\mathrm{total}}
=
F_1
+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+
\frac{F_4-1}{G_1G_2G_3}
+\cdots
$$

dB 与 linear scale 互换：

$$
G_{\mathrm{linear}}
=
10^{G_{\mathrm{dB}}/10}
$$

$$
F_{\mathrm{linear}}
=
10^{NF_{\mathrm{dB}}/10}
$$

$$
NF_{\mathrm{dB}}
=
10\log_{10}{F_{\mathrm{linear}}}
$$

## 3-12 DAC、ADC 与转换误差

### 3-12-1 DAC

$n$ bit 数字码：

$$
D=b_{n-1}b_{n-2}\cdots b_1b_0
$$

DAC 比例关系：

$$
V_{\mathrm{out}}\propto D
$$

4-bit 十进制值：

$$
D=8D_3+4D_2+2D_1+D_0
$$

理想输出，满量程端点按 $2^n-1$ 个间隔：

$$
V_{\mathrm{out}}
=
\frac{D}{2^n-1}V_{\mathrm{ref}}
$$

按 LSB 近似：

$$
V_{\mathrm{out}}\approx D\cdot V_{\mathrm{LSB}}
$$

LSB 大小：

$$
V_{\mathrm{LSB}}
=
\frac{V_{\mathrm{ref}}}{2^n}
$$

Full-scale output：

$$
V_{\mathrm{FS}}
=
\frac{(2^n-1)V_{\mathrm{ref}}}{2^n}
$$

若题目按 $2^n-1$ 个间隔定义步距：

$$
\Delta V=
\frac{V_{\mathrm{ref}}}{2^n-1}
$$

建立精度：

$$
\pm\frac{1}{2}V_{\mathrm{LSB}}
$$

加权电阻支路电流：

$$
I_k=\frac{b_kV_{\mathrm{ref}}}{R_k}
$$

$$
I_{\mathrm{sum}}=\sum_kI_k
$$

反相求和输出：

$$
V_{\mathrm{out}}=-R_fI_{\mathrm{sum}}
$$

4-bit 加权电阻 DAC：

$$
V_{\mathrm{out}}
=
-R_f
\left(
\frac{D_3V_{\mathrm{ref}}}{R}
+
\frac{D_2V_{\mathrm{ref}}}{2R}
+
\frac{D_1V_{\mathrm{ref}}}{4R}
+
\frac{D_0V_{\mathrm{ref}}}{8R}
\right)
$$

若 $R_f=R$：

$$
V_{\mathrm{out}}
=
-V_{\mathrm{ref}}
\left(
D_3+\frac{D_2}{2}+\frac{D_1}{4}+\frac{D_0}{8}
\right)
$$

R-2R 每位贡献：

$$
V_k\propto
\frac{D_kV_{\mathrm{ref}}}{2^{N-k}}
$$

R-2R 输出：

$$
V_{\mathrm{out}}
=
V_{\mathrm{ref}}
\left(
\frac{b_{n-1}}{2}
+
\frac{b_{n-2}}{4}
+
\cdots
+
\frac{b_0}{2^n}
\right)
$$

4-bit R-2R：

$$
V_{\mathrm{out}}
=
D_3\frac{V}{2}
+
D_2\frac{V}{4}
+
D_1\frac{V}{8}
+
D_0\frac{V}{16}
$$

$$
V_{\mathrm{out}}=\frac{D}{16}V
$$

---

### 3-12-2 ADC 采样、量化与类型

采样：

$$
x[n]=x(nT_s)
$$

$$
f_s=\frac{1}{T_s}
$$

Nyquist-Shannon：

$$
f_s\ge2f_{\max}
$$

$$
T_s\le\frac{1}{2f_{\max}}
$$

码率：

$$
R_b=f_sN
$$

混叠频率：

$$
f_{\mathrm{alias}}
=
\left\lvert
f_{\mathrm{in}}-kf_s
\right\rvert
$$

$N$ bit 电平数：

$$
2^N
$$

满量程范围：

$$
\mathrm{FSR}=V_H-V_L
$$

ADC LSB：

$$
1\,\mathrm{LSB}
=
\frac{\mathrm{FSR}}{2^N}
$$

由输入电压估计输出码：

$$
D\approx
\frac{(2^N-1)V_{\mathrm{in}}}{\mathrm{FSR}}
$$

量化误差：

$$
-\frac{1}{2}\mathrm{LSB}
\le
e_q
\le
\frac{1}{2}\mathrm{LSB}
$$

$$
\lvert e_q\rvert_{\max}
=
\frac{1}{2}\mathrm{LSB}
$$

Dynamic range：

$$
DNR=20\log_{10}(2^N)
$$

SAR 转换时间：

$$
t_{\mathrm{conv}}=N\cdot T_{\mathrm{clk}}
$$

Dual-slope ADC：

$$
V_{\mathrm{int}}(T_1)
=
-\frac{V_{\mathrm{in}}T_1}{RC}
$$

$$
0=
V_{\mathrm{int}}(T_1)
+
\frac{V_{\mathrm{ref}}T_2}{RC}
$$

$$
V_{\mathrm{in}}
=
V_{\mathrm{ref}}\frac{T_2}{T_1}
$$

Flash ADC 比较器数量：

$$
2^N-1
$$

Flash ADC 阈值间隔：

$$
\Delta V=\frac{V_{\mathrm{ref}}}{2^N}
$$

3-bit Flash ADC 阈值：

$$
V_i=i\frac{V_{\mathrm{ref}}}{8},
\qquad
i=1,2,\ldots,7
$$

---

### 3-12-3 转换器误差

理想转换曲线：

$$
y_{\mathrm{ideal}}=mx+b
$$

增益误差：

$$
y_{\mathrm{actual}}=(m+\Delta m)x+b
$$

偏移误差：

$$
y_{\mathrm{actual}}=mx+(b+\Delta b)
$$

DNL：

$$
\mathrm{DNL}_k
=
\frac{\Delta V_k}{V_{\mathrm{LSB}}}-1
$$

Missing code 风险：

$$
\mathrm{DNL}>1\,\mathrm{LSB}
$$
