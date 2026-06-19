---
lastUpdated: 2026-06-07T21:49:56+08:00
---
# Lecture 15 Antennas in a Circuit 天线

<LyricCover
  image="CCD Lecture 15 Antennas in a Circuit.attachments/1780840132059.JPG"
  title="bloom"
  artist="三木谷奈々"
  lang="en"
  netease-url="https://music.163.com/#/song?id=2750976348"
>
  <LyricLine
    original="Will that urging within me grow bigger someday?"
    translation="栖息于我内心的冲动最终仍会膨胀失控吗？"
  />
  <LyricLine
    original="This wasn't magic as I knew it."
    translation="这不是我所知的魔法。"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [15-1 天线的电路角色 Antenna as a Circuit Element](#15-1-天线的电路角色-antenna-as-a-circuit-element)
  - [15-1-1 天线定义 Antenna Definition](#15-1-1-天线定义-antenna-definition)
  - [15-1-2 天线类型 Antenna Types](#15-1-2-天线类型-antenna-types)
- [15-2 场区划分 Field Regions](#15-2-场区划分-field-regions)
  - [15-2-1 近场与远场 Near Field and Far Field](#15-2-1-近场与远场-near-field-and-far-field)
  - [15-2-2 远场边界 Far-Field Boundary](#15-2-2-远场边界-far-field-boundary)
- [15-3 辐射方向图 Radiation Pattern](#15-3-辐射方向图-radiation-pattern)
  - [15-3-1 主瓣与副瓣 Lobes](#15-3-1-主瓣与副瓣-lobes)
  - [15-3-2 波束宽度 Beamwidth](#15-3-2-波束宽度-beamwidth)
- [15-4 天线参数 Antenna Parameters](#15-4-天线参数-antenna-parameters)
  - [15-4-1 功率密度与辐射强度 Power Density and Radiation Intensity](#15-4-1-功率密度与辐射强度-power-density-and-radiation-intensity)
  - [15-4-2 方向性与增益 Directivity and Gain](#15-4-2-方向性与增益-directivity-and-gain)
  - [15-4-3 带宽与前后比 Bandwidth and Front-to-Back Ratio](#15-4-3-带宽与前后比-bandwidth-and-front-to-back-ratio)
- [15-5 通信链路 Communication Link](#15-5-通信链路-communication-link)
- [Summary](#summary)

## 15-1 天线的电路角色 Antenna as a Circuit Element

### 15-1-1 天线定义 Antenna Definition

:::: definition 天线 Antenna
**天线 Antenna** 是发射或接收电磁波的系统部件。它把传输线中的 guided wave 转换为空间中的 free-space wave，也可反向把空间电磁能量耦合回传输线。
::::



从电路角度看，天线是 guided wave 与 free-space wave 之间的能量接口：

- 发射时，把源和传输线送来的功率辐射到自由空间；
- 接收时，把入射电磁波转成端口电压和电流；
- 匹配不好时，一部分功率会反射回电路；
- 有损耗时，一部分功率会变成热。

天线设计同时关心电路匹配和空间辐射方向图。

---

### 15-1-2 天线类型 Antenna Types

常见天线类型：

| 类型 | 例子 | 特点 |
| --- | --- | --- |
| Wire antenna | dipole, monopole | 结构简单，低频常见 |
| Aperture antenna | horn | 微波频段常见 |
| Microstrip antenna | patch antenna | 易集成到 PCB |
| Array antenna | phased array | 可形成方向性和波束扫描 |
| Reflector antenna | parabolic dish | 高增益，高方向性 |
| Lens antenna | dielectric lens | 用介质控制波前 |

课程后面主要看通用参数，不展开各类结构细节。

## 15-2 场区划分 Field Regions

### 15-2-1 近场与远场 Near Field and Far Field

天线周围空间通常分为 reactive near-field、radiative near-field 和 radiating far-field。

![天线场区](<CCD Lecture 15 Antennas in a Circuit.attachments/antenna_regions.jpg>)

| 区域 | 主要特征 | 说明 |
| --- | --- | --- |
| Reactive near-field | 储能占主导，$E$ 与 $H$ 近似正交相位 | 非传播能量多 |
| Radiative near-field / Fresnel | 开始辐射，方向图随距离变化 | 波前还未近似球面 |
| Radiating far-field / Fraunhofer | $E$ 与 $H$ 同相，方向图基本不随距离变 | 传播功率为主 |

Reactive near-field 中电抗储能占主导，波阻抗可能很高，电场和磁场比例不像远场那样固定。Radiative near-field 中 $E$ 与 $H$ 已经主要同相，但波前还不是近似球面，方向图仍会随距离改变。

远场中波阻抗近似为实数，功率主要向外传播。方向图、增益和链路预算通常都按远场条件定义。

---

### 15-2-2 远场边界 Far-Field Boundary

波长为

$$
\lambda=\frac{c}{f}
$$

对最大尺寸为 $D$ 的天线，常用远场边界估算：

$$
\boxed{R_0\ge \frac{2D^2}{\lambda}}
$$

另一个常见近场边界估算为

$$
R_{\mathrm{reactive}}\approx0.62\sqrt{\frac{D^3}{\lambda}}
$$

这里 $D$ 是天线最大物理尺寸。频率越高，波长越短，同样尺寸天线的远场距离越大。

例：$D=1.2\,\mathrm{m}$、$f=4.2\,\mathrm{GHz}$。先求波长：

$$
\lambda=\frac{3\times10^8}{4.2\times10^9}
=0.0714\,\mathrm{m}
$$

远场边界为

$$
R_0=\frac{2D^2}{\lambda}
=\frac{2(1.2)^2}{0.0714}
\approx40.3\,\mathrm{m}
$$

也可以反求频率。由

$$
R_0=\frac{2D^2}{\lambda},\qquad \lambda=\frac{c}{f}
$$

得

$$
f=\frac{cR_0}{2D^2}
$$

若 $D=0.5\,\mathrm{m}$、$R_0=4\,\mathrm{m}$，按公式计算：

$$
f=\frac{(3\times10^8)(4)}{2(0.5)^2}
=2.4\,\mathrm{GHz}
$$

课件手写结果标为 $1.2\,\mathrm{GHz}$，与同页公式代入不一致，复习时按公式核算。

## 15-3 辐射方向图 Radiation Pattern

### 15-3-1 主瓣与副瓣 Lobes

:::: definition 辐射方向图 Radiation Pattern
**辐射方向图 Radiation Pattern** 描述天线辐射强度随空间方向 $(\theta,\phi)$ 的变化。它可以画成二维截面，也可以画成三维曲面。
::::

![天线方向图](<CCD Lecture 15 Antennas in a Circuit.attachments/antenna_pattern_wide.jpg>)

方向图中的常见部分：

| 名称 | 含义 |
| --- | --- |
| Major lobe / Main lobe | 最大辐射方向附近的主波束 |
| Minor lobe | 非主瓣的其他辐射瓣，通常是不希望的方向 |
| Side lobe | 偏离主方向的副瓣，常指较大的 minor lobe，通常希望降低 |
| Back lobe | 与主瓣相反方向的辐射瓣 |
| Null | 辐射很弱或为零的方向 |

理想 isotropic radiator 在所有方向均匀辐射，三维方向图是球面。真实天线一般都有方向性。

![三维方向图](<CCD Lecture 15 Antennas in a Circuit.attachments/antenna_pattern_3d_wide.jpg>)

---

### 15-3-2 波束宽度 Beamwidth

:::: definition 半功率波束宽度 Half-Power Beamwidth
**Half-Power Beamwidth, HPBW** 是主瓣峰值下降到一半功率，也就是 $-3\,\mathrm{dB}$ 处，两侧方向之间的角度。
::::

:::: definition 第一零点波束宽度 First Null Beamwidth
**First Null Beamwidth, FNBW** 是主瓣两侧第一零点之间的角度。
::::

课程图中给出近似关系：

$$
\mathrm{FNBW}\approx2\times\mathrm{HPBW}
$$

HPBW 越小，波束越窄，方向性通常越强。但覆盖区域也会更窄。

## 15-4 天线参数 Antenna Parameters

### 15-4-1 功率密度与辐射强度 Power Density and Radiation Intensity

各向同性天线辐射功率 $P_{\mathrm{rad}}$ 时，距离 $R$ 处球面面积为

$$
4\pi R^2
$$

功率密度为

$$
W_0=\frac{P_{\mathrm{rad}}}{4\pi R^2}
\qquad \mathrm{(W/m^2)}
$$

辐射强度定义为单位立体角功率：

$$
U=R^2W_0
$$

对各向同性辐射器：

$$
U=\frac{P_{\mathrm{rad}}}{4\pi}
$$

功率密度随距离平方衰减，辐射强度只与方向有关。

---

### 15-4-2 方向性与增益 Directivity and Gain

:::: definition 方向性 Directivity
**方向性 Directivity** 是某方向辐射强度与全方向平均辐射强度的比值。

$$
D(\theta,\phi)=\frac{4\pi U(\theta,\phi)}{P_{\mathrm{rad}}}
$$
::::

各向同性辐射器满足

$$
D=1=0\,\mathrm{dB}
$$

:::: definition 天线增益 Antenna Gain
**天线增益 Antenna Gain** 用输入功率作参考，描述天线在某方向上的有效辐射能力。

$$
G(\theta,\phi)=\frac{4\pi U(\theta,\phi)}{P_{\mathrm{in}}}
$$
::::

![天线参数](<CCD Lecture 15 Antennas in a Circuit.attachments/antenna_parameters.jpg>)

方向性只考虑功率如何分布到空间方向。增益还包含失配、欧姆损耗等实际因素。

若用辐射效率 $\eta$ 表示损耗影响，常写成

$$
G=\eta D
$$

实际 gain 受三件事共同影响：

- mismatch / reflection：端口不匹配会把功率反射回去；
- ohmic loss / efficiency：导体、介质和馈线损耗会把功率变成热；
- directivity：天线把功率集中到某些方向。

增益常用 $\mathrm{dBi}$ 表示，意思是相对 isotropic radiator 的 dB 值。写成单个 $D$ 或 $G$ 时，通常默认取最大辐射方向；完整表达仍是 $D(\theta,\phi)$ 或 $G(\theta,\phi)$。

天线增益不是放大器增益。天线不能凭空增加输入功率，只能把功率集中到某些方向。

---

### 15-4-3 带宽与前后比 Bandwidth and Front-to-Back Ratio

天线带宽定义为满足匹配、增益、方向图或效率要求的频率范围：

$$
\mathrm{BW}=f_H-f_L
$$

前后比为主瓣方向功率与反方向功率的比值，常用 dB 表示：

$$
\mathrm{F/B}=G_{\mathrm{front}}(\mathrm{dB})-G_{\mathrm{back}}(\mathrm{dB})
$$

例如主方向增益为 $12\,\mathrm{dB}$，后向为 $-3\,\mathrm{dB}$：

$$
\mathrm{F/B}=12-(-3)=15\,\mathrm{dB}
$$

前后比在需要抑制后向干扰或控制覆盖区域时很有用。

## 15-5 通信链路 Communication Link

自由空间传播中，功率会分布到越来越大的波前面积上，因此功率密度随距离平方下降。

![通信链路](<CCD Lecture 15 Antennas in a Circuit.attachments/antenna_link_wide.jpg>)

若发射天线增益为 $G_t$，距离 $R$ 处功率密度可写为

$$
W(R)=\frac{P_tG_t}{4\pi R^2}
$$

接收天线用有效孔径 $A_e$ 收集功率：

$$
P_r=W(R)A_e
$$

有效孔径与接收天线增益关系为

$$
A_e=\frac{G_r\lambda^2}{4\pi}
$$

代入得到 Friis 传输公式：

$$
\boxed{
P_r=P_tG_tG_r\left(\frac{\lambda}{4\pi R}\right)^2
}
$$

以 dB 形式看，自由空间路径损耗为

$$
L_{\mathrm{fs}}(\mathrm{dB})=20\log_{10}{\left(\frac{4\pi R}{\lambda}\right)}
$$

## Summary

| 内容 | 公式 / 结论 | 备注 |
| --- | --- | --- |
| 天线作用 | guided wave 与 free-space wave 的转换 | 同时涉及匹配和辐射 |
| 波长 | $\lambda=c/f$ | 高频对应短波长 |
| 远场边界 | $R_0\ge2D^2/\lambda$ | $D$ 为最大尺寸 |
| 功率密度 | $W_0=P_{\mathrm{rad}}/(4\pi R^2)$ | 各向同性情况 |
| 辐射强度 | $U=R^2W_0$ | 与方向有关 |
| 方向性 | $D=4\pi U/P_{\mathrm{rad}}$ | 不含损耗 |
| 增益 | $G=4\pi U/P_{\mathrm{in}}$ | 含效率影响 |
| 带宽 | $\mathrm{BW}=f_H-f_L$ | 取决于性能指标 |
| 前后比 | $\mathrm{F/B}=G_{\mathrm{front}}-G_{\mathrm{back}}$ | dB 直接相减 |
| Friis 公式 | $P_r=P_tG_tG_r(\lambda/(4\pi R))^2$ | 自由空间链路 |
