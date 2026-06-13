---
lastUpdated: 2026-06-10T18:09:22+08:00
---

# 8 Plane Electromagnetic Waves Part II

<LyricCard
  title="I Really Want to Stay at Your House"
  artist="Rosa Walton / Hallie Coggins"
  lang="en"
  qq-url="https://y.qq.com/n/ryqq/songDetail/0011gtqV1AYyOO"
  netease-url="https://music.163.com/#/song?id=1496089152"
>
  <LyricLine
    original="You know you didn't lose your self-control,"
    translation="你深知 你并未失去自制力，"
  />
  <LyricLine
    original="Let's start at the rainbow."
    translation="让我们于彩虹之上开始。"
  />
</LyricCard>

![alt text](<EMFT Chapter 8 P II.attachments/1778848085341.JPG>)



## 章节目录

- [章节目录](#章节目录)
- [8-4 平面导体边界的法向入射 Normal Incidence at a Plane Conducting Boundary](#8-4-平面导体边界的法向入射-normal-incidence-at-a-plane-conducting-boundary)
  - [8-4-1 法向入射基本模型](#8-4-1-法向入射基本模型)
  - [8-4-2 边界条件与反射透射系数](#8-4-2-边界条件与反射透射系数)
  - [8-4-3 理想导体边界 Ideal Conductor Boundary](#8-4-3-理想导体边界-ideal-conductor-boundary)
  - [8-4-4 合成场与驻波 Standing Wave](#8-4-4-合成场与驻波-standing-wave)
  - [8-4-5 表面电流与工程理解](#8-4-5-表面电流与工程理解)
- [8-5 平面介质边界的法向入射 Normal Incidence at a Plane Dielectric Boundary](#8-5-平面介质边界的法向入射-normal-incidence-at-a-plane-dielectric-boundary)
  - [8-5-1 理想介质界面](#8-5-1-理想介质界面)
  - [8-5-2 总场与行驻波 Travelling-Standing Wave](#8-5-2-总场与行驻波-travelling-standing-wave)
  - [8-5-3 驻波比 Standing-Wave Ratio](#8-5-3-驻波比-standing-wave-ratio)
  - [8-5-4 电磁能流密度](#8-5-4-电磁能流密度)
  - [8-5-5 典型例题](#8-5-5-典型例题)
  - [8-5-6 雷达低空盲区](#8-5-6-雷达低空盲区)
- [总结 Summary](#总结-summary)



## 8-4 平面导体边界的法向入射 Normal Incidence at a Plane Conducting Boundary

### 8-4-1 法向入射基本模型

![法向入射、反射与透射](<EMFT Chapter 8 P II.attachments/normal-incidence-boundary-wide.jpg>)

电磁波入射到平面边界后，入射侧一般同时存在**入射波 Incident Wave** 和 **反射波 Reflected Wave**；另一侧存在**透射波 Transmitted Wave**。

本节只讨论法向入射，即传播方向垂直于界面。

设界面为 $z=0$，区域 1 为 $z<0$，区域 2 为 $z>0$。入射波沿 $+z$ 方向传播，反射波沿 $-z$ 方向传播，透射波沿 $+z$ 方向传播。

若入射电场取 $x$ 方向线极化，则：

$$
\dot{\vec E}_i(z)=\vec e_xE_{im}e^{-\gamma_1z}
$$

$$
\dot{\vec H}_i(z)=\vec e_y\frac{E_{im}}{\eta_{1c}}e^{-\gamma_1z}
$$

反射波为：

$$
\dot{\vec E}_r(z)=\vec e_xE_{rm}e^{\gamma_1z}
$$

$$
\dot{\vec H}_r(z)=-\vec e_y\frac{E_{rm}}{\eta_{1c}}e^{\gamma_1z}
$$

透射波为：

$$
\dot{\vec E}_t(z)=\vec e_xE_{tm}e^{-\gamma_2z}
$$

$$
\dot{\vec H}_t(z)=\vec e_y\frac{E_{tm}}{\eta_{2c}}e^{-\gamma_2z}
$$

反射波的磁场前面有负号，因为反射波传播方向为 $-\vec e_z$，而 $\dot{\vec E},\dot{\vec H},\vec k$ 仍必须满足右手关系。

---

### 8-4-2 边界条件与反射透射系数

法向入射问题的核心是边界条件。

在无面电流、无面磁流的普通界面上，切向电场和切向磁场连续：

$$
\left.\vec e_n\times(\dot{\vec E}_1-\dot{\vec E}_2)\right|_S=0
$$

$$
\left.\vec e_n\times(\dot{\vec H}_1-\dot{\vec H}_2)\right|_S=0
$$

在 $z=0$ 处：

$$
E_{im}+E_{rm}=E_{tm}
$$

$$
\frac{1}{\eta_{1c}}(E_{im}-E_{rm})
=
\frac{1}{\eta_{2c}}E_{tm}
$$

:::: definition
**反射系数 Reflection Coefficient** $\Gamma$ 定义为反射电场幅度与入射电场幅度之比。

**透射系数 Transmission Coefficient** $\tau$ 定义为透射电场幅度与入射电场幅度之比。
::::

由边界条件解得：

$$
E_{rm}=\Gamma E_{im}
$$

$$
E_{tm}=\tau E_{im}
$$

其中：

$$
\boxed{
\Gamma=\frac{\eta_{2c}-\eta_{1c}}{\eta_{2c}+\eta_{1c}},
\qquad
\tau=\frac{2\eta_{2c}}{\eta_{2c}+\eta_{1c}}
}
$$

这两个系数是法向入射问题的主要结果。后面只是在不同边界条件下代入对应的 $\eta$。

---

### 8-4-3 理想导体边界 Ideal Conductor Boundary

若区域 1 为理想介质，区域 2 为理想导体，则：

$$
\sigma_1=0,\qquad \sigma_2=\infty
$$

理想导体内部电场为零，等效为：

$$
\eta_{2c}=0
$$

代入反射、透射系数：

$$
\Gamma=-1,\qquad \tau=0
$$

即：

$$
E_{rm}=-E_{im}
$$

界面处反射电场与入射电场反相，透射电场为零。

入射波与反射波可写为：

$$
\dot{\vec E}_i(z)=\vec e_xE_{im}e^{-j\beta_1z},
\qquad
\dot{\vec H}_i(z)=\vec e_y\frac{E_{im}}{\eta_1}e^{-j\beta_1z}
$$

$$
\dot{\vec E}_r(z)=-\vec e_xE_{im}e^{j\beta_1z},
\qquad
\dot{\vec H}_r(z)=\vec e_y\frac{E_{im}}{\eta_1}e^{j\beta_1z}
$$

注意磁场没有反相。电场反相来自理想导体表面切向电场必须为零；磁场相加后在表面形成最大值，对应表面感应电流。

---

### 8-4-4 合成场与驻波 Standing Wave

理想导体前方区域的总场为：

$$
\dot{\vec E}_1(z)=\dot{\vec E}_i(z)+\dot{\vec E}_r(z)
$$

代入：

$$
\dot{\vec E}_1(z)
=\vec e_xE_{im}(e^{-j\beta_1z}-e^{j\beta_1z})
=-\vec e_xj2E_{im}\sin{(\beta_1z)}
$$

磁场总场为：

$$
\dot{\vec H}_1(z)
=\vec e_y\frac{E_{im}}{\eta_1}(e^{-j\beta_1z}+e^{j\beta_1z})
=\vec e_y\frac{2E_{im}}{\eta_1}\cos{(\beta_1z)}
$$

对应瞬时形式：

$$
\vec E_1(z,t)=\vec e_x2E_{im}\sin{(\beta_1z)}\sin\omega t
$$

$$
\vec H_1(z,t)=\vec e_y\frac{2E_{im}}{\eta_1}\cos{(\beta_1z)}\cos\omega t
$$

![理想导体前的驻波分布](<EMFT Chapter 8 P II.attachments/standing-wave-wide.jpg>)

电场和磁场有两个差别：

- 时间相位差为 $\pi/2$；
- 空间位置差为 $\lambda_1/4$。

理想导体表面处 $z=0$：

$$
\vec E_1(0,t)=0
$$

$$
|\vec H_1(0,t)| \text{ 取最大值}
$$

:::: definition
**行波 Travelling Wave**：能量沿某一方向传播的电磁波。

**驻波 Standing Wave**：入射波与反射波等幅叠加后形成的空间固定振幅分布，平均能流为零。

**行驻波 Travelling-Standing Wave**：入射波与反射波不等幅叠加后形成的混合波。
::::

理想导体边界对应全反射，所以总场为纯驻波。

平均坡印廷矢量为：

$$
\vec S_{av}
=\frac12\operatorname{Re}[\dot{\vec E}_1\times\dot{\vec H}_1^*]
=0
$$

电场波腹位置：

$$
z_{\max}=-\frac{(2n+1)\lambda_1}{4},
\qquad n=0,1,2,\dots
$$

电场波节位置：

$$
z_{\min}=-\frac{n\lambda_1}{2},
\qquad n=0,1,2,\dots
$$

---

### 8-4-5 表面电流与工程理解

理想导体表面的感应电流密度为：

$$
\vec J_S=\vec e_n\times\dot{\vec H}_1\big|_{z=0}
$$

在本节坐标中，指向区域 1 的法向量为 $-\vec e_z$，于是：

$$
\vec J_S
=-\vec e_z\times\vec e_y\frac{2E_{im}}{\eta_1}
=\vec e_x\frac{2E_{im}}{\eta_1}
$$

理想导体内部透射场为零，表面仍存在感应电流。该表面电流承担边界条件所需的磁场跃变。

:::: stem
均匀平面波沿 $+z$ 方向传播，入射电场为：

$$
\vec E_i
=\vec e_x100\sin{(\omega t-\beta z)}
+\vec e_y200\cos{(\omega t-\beta z)}
\quad \mathrm{V/m}
$$

在 $z=0$ 处放置无限大理想导体平板。求 $z<0$ 区域的总电场、总磁场，以及导体表面电流密度。
::::

:::: solution
先写复电场：

$$
\dot{\vec E}_i(z)
=\vec e_x100e^{-j\beta z}e^{-j\pi/2}
+\vec e_y200e^{-j\beta z}
$$

入射磁场：

$$
\dot{\vec H}_i(z)
=\frac{1}{\eta_0}\vec e_z\times\dot{\vec E}_i
$$

反射电场在理想导体表面反相：

$$
\dot{\vec E}_r(z)
=-\vec e_x100e^{j\beta z}e^{-j\pi/2}
-\vec e_y200e^{j\beta z}
$$

反射磁场为：

$$
\dot{\vec H}_r(z)
=\frac{1}{\eta_0}(-\vec e_z)\times\dot{\vec E}_r
$$

相加得：

$$
\dot{\vec E}_1(z)
=-j\vec e_x200e^{-j\pi/2}\sin{(\beta z)}
-j\vec e_y400\sin{(\beta z)}
$$

$$
\dot{\vec H}_1(z)
=\frac{1}{\eta_0}
\left[
-\vec e_x400\cos{(\beta z)}
+\vec e_y200e^{-j\pi/2}\cos{(\beta z)}
\right]
$$

表面电流密度：

$$
\vec J_S=-\vec e_z\times\dot{\vec H}_1\big|_{z=0}
$$

代入：

$$
\vec J_S
=\vec e_x\frac{200}{\eta_0}e^{-j\pi/2}
+\vec e_y\frac{400}{\eta_0}
$$

即：

$$
\vec J_S
=-j0.53\vec e_x+1.06\vec e_y
\quad \mathrm{A/m}
$$
::::

## 8-5 平面介质边界的法向入射 Normal Incidence at a Plane Dielectric Boundary

### 8-5-1 理想介质界面

本节讨论两侧均为理想介质：

$$
\sigma_1=\sigma_2=0
$$

于是：

$$
\gamma_1=j\beta_1=j\omega\sqrt{\mu_1\varepsilon_1}
$$

$$
\gamma_2=j\beta_2=j\omega\sqrt{\mu_2\varepsilon_2}
$$

$$
\eta_1=\sqrt{\frac{\mu_1}{\varepsilon_1}},
\qquad
\eta_2=\sqrt{\frac{\mu_2}{\varepsilon_2}}
$$

反射、透射系数退化为实数：

$$
\boxed{
\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1},
\qquad
\tau=\frac{2\eta_2}{\eta_2+\eta_1}
}
$$

当 $\eta_2>\eta_1$ 时，$\Gamma>0$，反射电场与入射电场同相。

当 $\eta_2<\eta_1$ 时，$\Gamma<0$，反射电场与入射电场反相。

这个符号会决定界面处是电场波腹还是波节。

---

### 8-5-2 总场与行驻波 Travelling-Standing Wave

在区域 1 中：

$$
\dot{\vec E}_1(z)
=\dot{\vec E}_i(z)+\dot{\vec E}_r(z)
=\vec e_xE_{im}
\left(
e^{-j\beta_1z}
+\Gamma e^{j\beta_1z}
\right)
$$

可写成：

$$
\dot{\vec E}_1(z)
=\vec e_xE_{im}
\left[
(1+\Gamma)e^{-j\beta_1z}
+j2\Gamma\sin{(\beta_1z)}
\right]
$$

第一项对应行波成分，第二项对应驻波成分。

介质界面中通常 $|\Gamma|<1$，反射波幅度小于入射波，所以总场不是纯驻波，而是行驻波。

![介质界面行驻波振幅变化](<EMFT Chapter 8 P II.attachments/dielectric-amplitude-wide.jpg>)

总电场振幅为：

$$
|\dot{\vec E}_1(z)|
=E_{im}\left|1+\Gamma e^{j2\beta_1z}\right|
$$

即：

$$
|\dot{\vec E}_1(z)|
=E_{im}\sqrt{1+\Gamma^2+2\Gamma\cos{(2\beta_1z)}}
$$

若 $\Gamma<0$：

$$
|\dot{\vec E}_1|_{\max}=E_{im}|1-\Gamma|,
\qquad
z=-\left(\frac n2+\frac14\right)\lambda_1
$$

$$
|\dot{\vec E}_1|_{\min}=E_{im}|1+\Gamma|,
\qquad
z=-\frac{n\lambda_1}{2}
$$

若 $\Gamma>0$：

$$
|\dot{\vec E}_1|_{\max}=E_{im}|1+\Gamma|,
\qquad
z=-\frac{n\lambda_1}{2}
$$

$$
|\dot{\vec E}_1|_{\min}=E_{im}|1-\Gamma|,
\qquad
z=-\left(\frac n2+\frac14\right)\lambda_1
$$

其中 $n=0,1,2,\dots$。

---

### 8-5-3 驻波比 Standing-Wave Ratio

:::: definition
**驻波比 Standing-Wave Ratio, SWR** 定义为总场最大振幅与最小振幅之比：

$$
S=\frac{|\dot{\vec E}|_{\max}}{|\dot{\vec E}|_{\min}}
$$
::::

对法向入射的理想介质界面：

$$
\boxed{
S=\frac{1+|\Gamma|}{1-|\Gamma|}
}
$$

反过来：

$$
|\Gamma|=\frac{S-1}{S+1}
$$

几个特殊情况：

| 条件 | 结果 | 波形 |
| --- | --- | --- |
| $\Gamma=0$ | $S=1$ | 纯行波 |
| $\Gamma=\pm1$ | $S=\infty$ | 纯驻波 |
| $0<\lvert\Gamma\rvert<1$ | $1<S<\infty$ | 行驻波 |

驻波比越大，反射越强，驻波成分越明显。

---

### 8-5-4 电磁能流密度

在区域 1 中，入射波平均能流密度为：

$$
\vec S_{iav}
=\frac12\operatorname{Re}[\dot{\vec E}_i\times\dot{\vec H}_i^*]
=\vec e_z\frac{E_{im}^2}{2\eta_1}
$$

反射波沿 $-z$ 方向传播：

$$
\vec S_{rav}
=-\vec e_z\frac{\Gamma^2E_{im}^2}{2\eta_1}
$$

因此区域 1 的净平均能流为：

$$
\vec S_{1av}
=\vec e_z\frac{E_{im}^2}{2\eta_1}(1-\Gamma^2)
$$

区域 2 中只有透射波：

$$
\vec S_{2av}
=\vec e_z\frac{\tau^2E_{im}^2}{2\eta_2}
$$

由 $\Gamma,\tau$ 的定义可验证：

$$
\vec S_{1av}=\vec S_{2av}
$$

理想介质界面没有损耗，所以平均功率守恒。反射改变的是功率在两侧的分配，不会凭空消耗能量。

---

### 8-5-5 典型例题

:::: stem
自由空间中均匀平面波法向入射到半无限无损介质。已知自由空间中的驻波比为 $S=3$，介质中的波长为自由空间波长的 $1/6$。总场最小值出现在界面处。求介质的 $\mu_r$ 与 $\varepsilon_r$。
::::

:::: solution
由驻波比：

$$
S=\frac{1+|\Gamma|}{1-|\Gamma|}=3
$$

得：

$$
|\Gamma|=\frac12
$$

总场最小值在界面处，说明界面处入射波与反射波反相：

$$
\Gamma=-\frac12
$$

由：

$$
\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1}
$$

且 $\eta_1=\eta_0$，得：

$$
\eta_2=\frac13\eta_0
$$

因此：

$$
\frac{\mu_r}{\varepsilon_r}=\frac19
$$

又因为：

$$
\lambda_2=\frac{\lambda_0}{\sqrt{\mu_r\varepsilon_r}}
=\frac{\lambda_0}{6}
$$

所以：

$$
\mu_r\varepsilon_r=36
$$

联立：

$$
\mu_r=2,\qquad \varepsilon_r=18
$$
::::

:::: stem
空气中入射波电场为：

$$
\vec E_i=\vec e_x10\cos{(3\pi\times10^9t-10\pi z)}\quad \mathrm{V/m}
$$

电磁波从空气区域 $z<0$ 法向入射到 $z>0$ 的无损介质中。介质参数为 $\mu_r=1,\varepsilon_r=4$。求 $z>0$ 区域中的电场和磁场。
::::

:::: solution
介质 2 的波阻抗：

$$
\eta_2=\eta_0\sqrt{\frac{\mu_{r2}}{\varepsilon_{r2}}}
=\frac{120\pi}{2}=60\pi\ \Omega
$$

空气中：

$$
\eta_1=\eta_0=120\pi\ \Omega
$$

透射系数：

$$
\tau=\frac{2\eta_2}{\eta_1+\eta_2}
=\frac{2\times60\pi}{120\pi+60\pi}
=0.667
$$

相位常数：

$$
\beta_2=\omega\sqrt{\mu_2\varepsilon_2}
=\frac{3\pi\times10^9}{3\times10^8}\times2
=20\pi\ \mathrm{rad/m}
$$

透射电场：

$$
\vec E_2(z,t)
=\vec e_x\tau E_{im}\cos{(\omega t-\beta_2z)}
$$

即：

$$
\vec E_2(z,t)
=\vec e_x6.67\cos{(3\pi\times10^9t-20\pi z)}\quad \mathrm{V/m}
$$

透射磁场：

$$
\dot{\vec H}_2=\frac{1}{\eta_2}\vec e_z\times\dot{\vec E}_2
$$

所以：

$$
\vec H_2(z,t)
=\vec e_y0.036\cos{(3\pi\times10^9t-20\pi z)}\quad \mathrm{A/m}
$$
::::


---

### 8-5-6 雷达低空盲区

雷达测距需要三个条件：

1. 电磁波近似直线传播；
2. 目标产生可接收的反射波；
3. 入射波与反射波速度已知。

距离估计通常按往返时间计算：

$$
R=\frac{ct}{2}
$$

低空目标会受到地面反射影响。雷达接收点处，直接波与地面反射波可能近似等幅反相，合成场减小，于是形成低空盲区。

![雷达低空盲区示意](<EMFT Chapter 8 P II.attachments/radar-low-altitude-wide.jpg>)

当入射角趋近擦地入射时，反射系数近似为：

$$
\Gamma_\perp\approx -1
$$

$$
\Gamma_\parallel\approx -1
$$

因此地面反射波相对直接波近似反相。低空目标越接近地面，多径相消越明显，雷达探测越困难。





## 总结 Summary




1. 法向入射问题先写入射波、反射波、透射波，再用切向边界条件求幅度；
2. 反射系数与透射系数为 $\displaystyle\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1},\ \tau=\frac{2\eta_2}{\eta_2+\eta_1}$；
3. 理想导体边界满足 $\Gamma=-1,\tau=0$，前方形成纯驻波；
4. 理想介质边界通常满足 $\lvert\Gamma\rvert<1$，前方形成行驻波；
5. 驻波比 $S=\dfrac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ 用来描述反射强弱；
6. 理想介质界面无损耗，平均能流满足 $\vec S_{1av}=\vec S_{2av}$；
7. 雷达低空盲区来自直接波与地面反射波的相消。
