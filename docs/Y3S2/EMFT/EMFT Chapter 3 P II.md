# 3 Static Electric Field Part II


**“对不起，我欺骗了你。”**  
**“对不起，未能说出口。”**

<div align="right">——25時、ナイトコードで。 《ジェヘナ》</div>

![alt text](<EMFT Chapter 3 P II.attachments/1774776875485.jpg>)

> [!TIP]
> 本文覆盖第三章电势之后的小节。


## 章节目录

- [章节目录](#章节目录)
- [3-6 静电场中的导体 Conductors](#3-6-静电场中的导体-conductors)
  - [3-6-1 导体的定义](#3-6-1-导体的定义)
  - [3-6-2 导体的静电性质](#3-6-2-导体的静电性质)
  - [3-6-3 导体上的电势](#3-6-3-导体上的电势)
- [3-7 静电场中的电介质 Dielectrics](#3-7-静电场中的电介质-dielectrics)
  - [3-7-1 电介质的结构与极化现象 Polarization Phenomenon](#3-7-1-电介质的结构与极化现象-polarization-phenomenon)
  - [3-7-2 电极化强度 Polarization Intensity](#3-7-2-电极化强度-polarization-intensity)
  - [3-7-3 束缚电荷分布](#3-7-3-束缚电荷分布)
- [3-8 电通量密度（电位移矢量）与介电常数 Electric Flux Density \& Dielectric Constant](#3-8-电通量密度电位移矢量与介电常数-electric-flux-density--dielectric-constant)
  - [3-8-1 电通量密度 / 电位移矢量 Electric Flux Density / Electric Displacement Vector](#3-8-1-电通量密度--电位移矢量-electric-flux-density--electric-displacement-vector)
  - [3-8-2 介电常数 Dielectric Constant](#3-8-2-介电常数-dielectric-constant)
  - [3-8-3 静电场的介质问题](#3-8-3-静电场的介质问题)
- [3-9 静电场的边界条件 Boundary Conditions](#3-9-静电场的边界条件-boundary-conditions)
  - [3-9-1 电介质与电介质交界面](#3-9-1-电介质与电介质交界面)
  - [3-9-2 电介质与导体交界面](#3-9-2-电介质与导体交界面)
- [3-10 电容与电容器 Capacitance \& Capacitor](#3-10-电容与电容器-capacitance--capacitor)
  - [3-10-1 电容的定义](#3-10-1-电容的定义)
  - [3-10-2 孤立导体与多导体的电容](#3-10-2-孤立导体与多导体的电容)
  - [3-10-3 电容的决定因素与求解方法](#3-10-3-电容的决定因素与求解方法)
- [3-11 静电能 Electrostatic Energy](#3-11-静电能-electrostatic-energy)
  - [3-11-1 静电能 Electrostatic Energy](#3-11-1-静电能-electrostatic-energy)
  - [3-11-2 导体 / 电容的静电能](#3-11-2-导体--电容的静电能)
  - [3-11-3 多个带电体的静电能](#3-11-3-多个带电体的静电能)
  - [3-11-4 连续分布电荷的静电能](#3-11-4-连续分布电荷的静电能)
  - [3-11-5 电场能](#3-11-5-电场能)
  - [3-11-6 总结](#3-11-6-总结)

## 3-6 静电场中的导体 Conductors

### 3-6-1 导体的定义



电导体通常就简称为**导体 Conductor**，其被定义为：

在其中存在大量可自由移动电荷，因此能够较容易传导电流的材料。

从电磁学角度，也常写成：

**在外电场作用下，内部自由电荷能够发生定向移动，从而形成传导电流的物体，称为导体。**

更本质一点地说：

**导体中有可以在宏观范围内自由移动的载流子。这也是导体与其他非导体最本质的区别。**

> 这些载流子在金属中通常是自由电子。


---

### 3-6-2 导体的静电性质

#### 1. 导体内部

![alt text](<EMFT Chapter 3 P II.attachments/1774680455477.png>)

假设目前导体内部引入了一些多余的正（或负）电荷，导体内部将建立电场，该电场对电荷施加力，使它们相互远离。

这种运动将一直进行，直到所有电荷达到**导体表面**并重新分配，使得**导体内部的电荷和电场都消失掉**。

即在静电平衡下的导体中：

$$
\boxed{
\vec E = 0 \qquad \rho = 0
}
$$

#### 2. 导体表面

![alt text](<EMFT Chapter 3 P II.attachments/1774680896082.png>)

由于电荷均分布在导体表面，在导体表面取一闭合环路，因此有：

$$
\oint \vec E \cdot dl = E_t \; \Delta w = 0
$$

其中 $\Delta w$ 为线元长度， $E_t$ 为电场线切向分量；

$$
E_t = 0
$$

**即导体表面电场线的切向分量恒为零，导体表面电场线垂直于导体表面。**



给定导体表面的电荷密度 $\rho_S$ 和 真空介电常数 $\varepsilon_0$ ：

在导体表面取一个闭合曲，根据高斯定理有：

$$
\oiint_S \vec E \cdot d\vec S = \frac{q}{\varepsilon_0} = \frac{\rho_S \Delta S}{\varepsilon_0}
$$

由前序计算得知表面电场线处处垂直于表面，方向与面元矢量相同，可得：

$$
\oiint_S \vec E \cdot d\vec S = E_n \Delta S = \frac{\rho_S \Delta S}{\varepsilon_0}
$$

即

$$
E_n = \frac{\rho_S}{\varepsilon_0}
$$


总结可得：

> [!IMPORTANT]
> 当一个导体在静电场中处于**静电平衡状态**时：
>
> 导体内部**无电场分布**；
>
> 导体表面中外部，电场线处处垂直于表面，且大小与该点电荷电荷密度成正比：
>
> $$
> \boxed{
> \vec E = \frac{\rho_S}{\varepsilon_0} \vec n
> }
> $$
> 

---

### 3-6-3 导体上的电势

::: example 导体上的电势
::: stem
![alt text](<EMFT Chapter 3 P II.attachments/1774747795570.png>)

球心点电荷 $+Q$；同心导体壳，内半径 $R_i$、外半径 $R_o$。静电平衡时内表面感应 $-Q$、外表面 $+Q$。取 $V(\infty)=0$。
:::
::: solution

> 推导过程我不想写了，挺简单的

$$
\boxed{
R>R_o:\quad E=\frac{Q}{4\pi\varepsilon_0 R^2},\quad V=\frac{Q}{4\pi\varepsilon_0 R}
}
$$

$$
\boxed{
R_i<R<R_o:\quad E=0,\quad V=\frac{Q}{4\pi\varepsilon_0 R_o}
}
$$

$$
\boxed{
R<R_i:\quad E=\frac{Q}{4\pi\varepsilon_0 R^2},\quad V=\frac{Q}{4\pi\varepsilon_0}\left(\frac{1}{R}+\frac{1}{R_o}-\frac{1}{R_i}\right)
}
$$

![alt text](<EMFT Chapter 3 P II.attachments/1774748123197.png>)
:::
:::

> [!IMPORTANT]
> 导体内外的电场强度会发生**突变 Discontinuous Jump**;
> 
> 静电平衡下的导体是一个**等势体 Equipotential Body** 。
> 

或者说：

> [!TIP]
> 其实可以直观一点想：
> 导体内部电场线为0，而电势的公式是电场线沿路径的积分，所以在导体内部电势积分变化量必然为0.
>
> 所以，导体是一个等势体。


---

## 3-7 静电场中的电介质 Dielectrics

### 3-7-1 电介质的结构与极化现象 Polarization Phenomenon

#### 1. 电磁反馈 EM Response

在电磁中，通常有以下三类反馈 Response：

- **极化 Polarization**：由于电场的作用，介电材料中的束缚电荷 Bounded 产生偏转；
- **磁化 Magnetization**：在外部磁场的影响下，产生宏观磁矩；
- **导电 Conduction**：在外部电场的作用下，自由电子发生运动。

这用来表征三种反馈的参数分别为：

- 介电常数 / 电容率 Dielectric Constant / Permittivity $\varepsilon$
- 磁导率 Permeability $\mu$
- 电导率 Conductivity $\sigma$ （就是电阻率的倒数，想起来了吗）

#### 2. 电介质的定义

现在我们来讨论电介质的内部结构。

在物质中，根据极性，可以大致分成两类：

- 非极性分子 Nonpolar Molecules：这种分子的正负电荷中心重合在同一点，因此无外部电场时对外不显出极性。但是如果处于外部电场时，其正负电荷中心可能会被拉开，导致形成类似于极性分子的性质。；
- 极性分子 Polar Molecules：相反地，极性分子的正负电荷中心不重合，形成一种类似于**电偶极子**的结构。因此这种结构会在外部电场中发生一定的偏转，同时自身也会向外发出微小但存在的电场线。


基于这个分类，可以给出电介质的定义：

**一个理想电介质，从内部构成上看，可以理解为：**

**它由大量被束缚在原子、分子内部的正负电荷组成，但几乎没有能够在材料内部自由移动的自由载流子。所以在静电场下，它不像导体那样让自由电荷大范围迁移，而主要表现为极化。**


#### 3. 极化现象 Polarization Phenomenon

当电介质被放置在一个外部电场 $\vec E$ 中，其内部

- 非极性分子：位移极化 Displacement Polarization：正负电荷的中心被拉开，形成电偶极子结构，出现了一个感应电偶极矩；
- 极性分子：取向极化 Orientation Polarization：分子受到外部电场力作用，倾向于把自己的偶极矩方向转得更接近电场方向。

![alt text](<EMFT Chapter 3 P II.attachments/1774751187301.png>)

---

### 3-7-2 电极化强度 Polarization Intensity

#### 1. 定义

现在，我们将用定量的方法对电介质中极化现象进行分析。

定义**电极化强度 Polarization Intensity** 为单位体积内的**电偶极矩矢量和**:

$$
\vec P = \lim_{\Delta V \to 0} \frac{\sum_i \vec p_i}{\Delta V} \qquad (C/m^2)
$$

#### 2. 有无外加电场下的讨论

i. **无外加电场** $\vec E$

- 非极化分子：对外不显电性，即 $\vec p_i = 0$ ，故 $\vec P_i = 0$ ；
- 极化分子：其方向杂乱无章，总体上对外无电性，即 $\vec P_i = 0$ 。

所以，无外加电场下，电极化强度处处为 0 .

ii. **存在外加电场** $\vec E$

在这种情况下，显然几乎所有分子都产生了极化现象。在理想的电介质中，我们给定假设：

$$
\vec p_1 = \vec p_2 = \vec p_3 = \cdots = \vec p_n
$$

即所有极化分子产生的电偶极矩矢量相等。

因此电极化强度可以表示为

$$
\vec P = \sum_i^n \vec p_i = n \vec p_i
$$

其中 $n$ 为单位体积内被极化分子的总数。

> [!NOTE]
> 材料的电极化强度与外部电场强度和材料本身的属性相关。
>
> 我们设应用在外部的电场为 $\vec E_e$ ，在静电平衡之后极化分子构成的电场为 $\vec E_p$ ，则实际电场 $\vec E$ 可以表示为
>
> $$\vec E = \vec E_e + \vec E_p$$
>
> 这里的加号并不代表对外部电场的增强，相反，在介质内部极化电场会削弱外加电场。
>
> 通常我们只讨论线性和**各向同性 Isotropic** 的电介质，因为在这种介质中，实际电场与电极化强度成正比例关系：
>
> $$\vec P = \chi_e \varepsilon_0 \vec E$$
>
> 其中；
> - $\chi_e$ ：电极化率 Susceptibility，也叫电极化常数或电极化系数
> - $\varepsilon_0$ ：真空介电常数
> - $\vec E$ ：介质内实际的总电场
> 
> 其意义为：**材料的极化强度，与材料内部实际承受的电场成正比。**

---


### 3-7-3 束缚电荷分布

#### 1. 定性分析

在一个电介质中，其电极化强度并非处处相等，在某些区域可能存在等效净电荷，通常由以下两种现象组成：

- 介质内部：若这些偶极子在空间中排列得不均匀，那么某一小块体积内偶极子的流出和流入不平衡，相当于就会在内部留下净电荷，这种电荷被称为体束缚电荷;
- 介质表面：在边界处，偶极子链会被截断，于是表面会露出没有被抵消的正负端，这种电荷被称为面束缚电荷。


#### 2. 定量分析

我们用 $\left. q_P \right|_V$ 和 $\left. q_P \right|_S$ 分别表示体电荷和面电荷。

i. 计算体束缚电荷密度

由于介质对外呈电中性，所以有：

$$
\left. q_P \right|_V = - \left. q_P \right|_S
$$

对于表面元 $dS$ ，若其外法向与极化方向夹角为 $\theta$ ，则有
$$
q_P\big|_{dS} = qN_{dS} = qn\,dV = qn\,l\,dS\cos\theta
$$

由电极化强度的定义 $\vec P = nq l \, \vec e_p$ ，可得
$$
\left. q_P \right|_S = \oiint_S \vec P \cdot d\vec S
= \iiint_V \nabla \cdot \vec P \, dV
$$

而由整体电中性，

$$
\left. q_P \right|_V = - \left. q_P \right|_S
= - \iiint_V \nabla \cdot \vec P \, dV
$$

$$
\boxed{
\rho_P = - \nabla \cdot \vec P
}
$$

ii. 计算面束缚电荷密度


由于
$$
q_P\big|_{dS} = \vec P \cdot d\vec S
$$

所以
$$
q_P\big|_{dS} = \vec P \cdot \vec e_n \, dS
$$

$$
\boxed{
\sigma_{P} = \vec P \cdot \vec e_n
}
$$

> [!IMPORTANT]
> 即，对于一个在静电场中的电介质，其体电荷密度和面电荷密度分别为
> $$
> \boxed{
> \begin{aligned}
> \rho_P &= - \nabla \cdot \vec P \\
> \sigma_{P} &= \vec P \cdot \vec e_n
> \end{aligned}
> }
> $$


#### 3. 极化电介质的等效电荷表示

电介质发生极化后，可以把它**等效看作**由两类束缚电荷共同构成：

- 等效的**极化表面电荷密度** $\sigma_p$
- 等效的**极化体电荷密度** $\rho_p$

因此，在计算极化电介质所产生的电势时，可以不再直接从“许多微观偶极子”出发，而是改为对这些等效束缚电荷进行计算。其电势可写为

$$
V=\frac{1}{4\pi\varepsilon_0}\oiint_{S'}\frac{\sigma_p}{R}\,dS'
+\frac{1}{4\pi\varepsilon_0}\iiint_{V'}\frac{\rho_p}{R}\,dV'
$$

其中，$R$ 表示场点到源点的距离，$S'$ 和 $V'$ 分别表示极化电介质对应的表面和体积区域。

需要注意的是，**极化并不会改变物体的总电荷量**。极化的本质只是正负电荷在材料内部发生微小分离，因此整个极化体的总束缚电荷代数和仍然必须为零，即

$$
Q_{\text{total}}=\oiint_S \sigma_p\,dS+\iiint_V \rho_p\,dV=0
$$

再代入

$$
\sigma_p=\vec P\cdot \vec e_n
$$

和

$$
\rho_p=-\nabla\cdot\vec P
$$

可得

$$
Q_{\text{total}}
=\oiint_S \vec P\cdot \vec e_n\,dS-\iiint_V \nabla\cdot\vec P\,dV=0
$$

这说明表面束缚电荷与体束缚电荷虽然都可能存在，但它们的总和始终相互平衡，因此极化后的整个介质仍保持电中性。



## 3-8 电通量密度（电位移矢量）与介电常数 Electric Flux Density & Dielectric Constant

### 3-8-1 电通量密度 / 电位移矢量 Electric Flux Density / Electric Displacement Vector

在静电场的电介质中，我们设自由电荷和净束缚电荷分别为 $q$ 和 $q_b$ ，密度分别为 $\rho$ 和 $\rho_b$ ，

应用高斯定理：

$$
\oiint_S \vec E \cdot d \vec S
= \frac{1}{\varepsilon_0} \iiint_V (\rho + \rho_b) dV
$$

对等式两边处理得到：

$$
\oiint_S \varepsilon_0 \vec E \cdot d \vec S
= \iiint_V \rho dV + 
\boxed{
\iiint_V (- \nabla \cdot \vec P)dV
}
$$

对框内积分利用散度定理，可得

$$
\iiint_V (- \nabla \cdot \vec P)dV
= - \oiint_S \vec P \cdot d \vec S
$$

替换并移项可得：

$$
\oiint_S (\varepsilon_0 \vec E + \vec P) \cdot d \vec S
= \iiint_V \rho dV = q
$$

为了**便于计算**，我们定义电通量密度（也叫电位移矢量） $\vec D$ 如下：

$$
\boxed{
\vec D = \varepsilon_0 \vec E + \vec P
}
$$

可以得到高斯定理的另一种表示：

$$
\boxed{
\oiint_S \vec D \cdot d \vec S

=q
}
$$

其中 $q$ 仅代表自由电荷的电荷量，与极化分子所产生的电荷量**无关**。这种高斯定理适合处理带介质的静电问题。

> [!CAUTION]
> 电位移矢量是一个便于计算，用于描述介质中实际电场和自由电荷关系的中间量，其并没有一个明确和便于理解的实际物理含义。因此不必过于追求 $\vec D$ 到底代表什么物理量，有什么意义。
>
> 其最大的数学意义是，把介质极化的复杂性打包进了一个场量中。


---

### 3-8-2 介电常数 Dielectric Constant

#### 1. 介质分类

- **均匀介质 Homogeneous Media 与 非均匀介质 Inhomogeneous Media**：  
  均匀介质是指介质参数不随空间位置变化，非均匀介质则是介质参数会随空间坐标改变；它们的区别在于**材料性质是否与位置有关**。

- **各向同性介质 Isotropic Media 与 各向异性介质 Anisotropic Media**：  
  各向同性介质是指介质在各个方向上的电磁性质都相同，各向异性介质则在不同方向上表现出不同响应；它们的区别在于**材料性质是否与方向有关**。

- **时变介质 Time Varying Media 与 时不变介质 Time Invariant Media**：  
  时变介质是指介质参数会随时间变化，时不变介质则参数不随时间变化；它们的区别在于**材料性质是否与时间有关**。

- **线性介质 Linear Media 与 非线性介质 Nonlinear Media**：  
  线性介质中，介质响应与外加场成正比，非线性介质中，介质响应与外加场不再满足简单正比关系；它们的区别在于**响应是否满足线性比例关系**。

- **确定性介质 Deterministic Media 与 随机介质 Random Media**：  
  确定性介质的参数可以用确定的函数或常数描述，随机介质的参数带有随机波动或统计特性；它们的区别在于**材料参数是否可以被确定地给出**。

- **色散介质 Dispersive Media 与 非色散介质 Non Dispersive Media**：  
  色散介质中，介质参数会随频率变化，因此不同频率的波传播特性不同；非色散介质中，介质参数与频率无关；它们的区别在于**材料性质是否与频率有关**。



#### 2. 本构关系 Constitutive Relationship

i. 线性，各向同性介质

已知：
$$
\vec P = \chi_e \varepsilon_0 \vec{E}
$$

所以有：

$$
\begin{aligned}
\vec D &= \varepsilon_0 \vec{E} + \vec P \\
&= \varepsilon_0 (1 + \chi_e) \vec E \\
& \xlongequal{\varepsilon_r = 1 + \chi_e} \varepsilon_0 \varepsilon_r \vec E \\
& \xlongequal{\varepsilon = \varepsilon_0 \varepsilon_r} \varepsilon \vec E
\end{aligned}
$$

> [!IMPORTANT]
>
> 对于公式：
> 
> $$\boxed{\vec D = \varepsilon_0 (1 + \chi_e) \vec E \xlongequal{\varepsilon_r = 1 + \chi_e} \varepsilon_0 \varepsilon_r \vec E \xlongequal{\varepsilon = \varepsilon_0 \varepsilon_r} \varepsilon \vec E }$$
>
> 其中：
> - $\varepsilon_0$ 为**真空介电常数 Permittivity of Free Space**；
> - $\varepsilon_r$ 为介质的**相对介电常数 Relative Permittivity**，是一个无量纲数；
> - $\varepsilon$ 为介质的**介电常数 Dielectric Constant**，且 $\varepsilon = \varepsilon_0 \varepsilon_r$；
>
> 由于符号相似，这几类常数很容易混淆。因此要注意区分下标和定义。

ii. 各向异性介质

对于**各向异性介质 Anisotropic Media**， $\vec D$ 与 $\vec E$ 一般不共线，须用**介电张量 Dielectric Tensor** 的分量 $\varepsilon_{ij}$ 描述本构关系，其矩阵形式为

$$
\begin{bmatrix} D_x \\ D_y \\ D_z \end{bmatrix} = \begin{bmatrix} \varepsilon_{11} & \varepsilon_{12} & \varepsilon_{13} \\ \varepsilon_{21} & \varepsilon_{22} & \varepsilon_{23} \\ \varepsilon_{31} & \varepsilon_{32} & \varepsilon_{33} \end{bmatrix} \begin{bmatrix} E_x \\ E_y \\ E_z \end{bmatrix}
$$

亦即 $D_i = \sum_j \varepsilon_{ij} E_j$ 。

与各向同性线性介质中的 $\vec D = \varepsilon \vec E$ 对照，标量 $\varepsilon$ 在此推广为 $3\times3$ 矩阵（张量在直角坐标系下的分量排列）。

此外：

- **均匀介质 Homogeneous Media**：介电常数或张量各分量与空间坐标无关；
- **各向异性**：$\vec D$ 与 $\vec E$ 之间的**本构关系**随外加 $\vec E$ 的方向而变；
- **线性介质**：介电张量与 $\vec E$ 的大小无关；$\vec E$ 加倍则 $\vec D$ 同比加倍，**叠加原理 Superposition Principle**成立。

---

### 3-8-3 静电场的介质问题

经典常中的介质问题可以通过以下方程组描述：

$$
\text{积分形式} 
\quad
\begin{cases}
\oiint_S \vec D \cdot d\vec S = q_{free} \\
\\
\oint_C \vec E \cdot d \vec l = 0
\end{cases}
$$

或者

$$
\text{微分形式}
\quad
\begin{cases}
\nabla \cdot \vec D = \rho_{free} \\
\\
\nabla \times \vec E = 0
\end{cases}
$$

通常在解题时，我们采用如下的顺序计算：

$$
q_f \Rightarrow \vec D \Rightarrow \vec E , \; \vec P , \; q_P
$$



## 3-9 静电场的边界条件 Boundary Conditions

### 3-9-1 电介质与电介质交界面

我们规定：

射入边界的电场线为 $\vec E_1$ ，射出边界的电场线为 $\vec E_2$ .

类似地，相应的电位移矢量分别为 $\vec D_1$ 和 $\vec D_2$ 。

#### 1. 切向分析

![alt text](<EMFT Chapter 3 P II.attachments/1774770458922.png>)

在交界面上选定一个微小矩形闭合环路方向为顺时针，

令其宽 $\Delta l$ ，高 $\Delta h$ ，如图所示，

由静电场基本定理可得：

$$
\oiint_C \vec E \cdot d \vec l = 0
$$

我们令 $\Delta h \to 0$ ，此时电场线的法向分量与线的积分可以同样极限为0，只考虑切向分量后展开得：

$$
\left. \oiint_C \vec E \cdot d \vec l \, \right|_{\Delta h \to 0} = \vec E_1 \cdot \Delta \vec l + \vec E_2 \cdot \Delta \vec l

= E_{1t} \Delta l - E_{2t} \Delta l = 0
$$

整理后可得：

$$
\boxed{
  E_{1t} = E_{2t}
}
$$

所以，在交界面上，**电场强度切向分量连续**。

由于里没有应用到介质相关性质，所以这个性质对所有交界面都生效。

#### 2. 法向分析

![alt text](<EMFT Chapter 3 P II.attachments/1774770556048.png>)

在交界面上取一个闭合圆柱，高 $\Delta h$ ，顶面和地面面积均为 $\Delta S$ ，如图所示，

根据电位移矢量高斯定理有：

$$
\oiint_S \vec D \cdot d \vec S
= q_{free}
$$

同样地，令 $\Delta h \to 0$ ，此时侧面的通量积分可以近似为0，于是只考虑上下底面的积分：

$$
\begin{aligned}
\left. \oiint_S \vec D \cdot d \vec S \right|_{\Delta S \to 0}
&= \vec D_1 \cdot \Delta \vec S_{top} + \vec D_2 \cdot \Delta \vec S_{bottom} \\

&= D_{1n} \Delta S - D_{2n} \Delta S \\

&= q_{free}

\end{aligned}
$$

如果我们设交界面上的面自由电荷密度为 $\sigma$ ，则有：

$$
D_{1n} \Delta S - D_{2n} \Delta S 

= q_{free} = \sigma \Delta S
$$

消去 $\Delta S$ ，可得

$$
\boxed{
D_{1n} - D_{2n} = \sigma
}
$$

在大多数情况下，如果没有特别说明，我们认为交界面上无自由电荷，此时 $\sigma = 0$ ，所以有：

$$
\boxed{
  \begin{aligned}
  D_{1n} &= D_{2n} \\

  \varepsilon_1 E_{1n} &= \varepsilon_2 E_{2n}
  \end{aligned}
}
$$

#### 3. 总结



![alt text](<EMFT Chapter 3 P II.attachments/1774773414752.png>)

> [!IMPORTANT]
>将切向分量和法向分量的结论整合，可以得到介质分界面上电场线的折射定律：
>
>$$\boxed{\frac{\tan {\alpha_1}}{\tan{\alpha_2}}= \frac{\varepsilon_1}{\varepsilon_2}}$$
>
>
>即，电场线切向分量连续，法向分量发生成比例的突变。
>

---

### 3-9-2 电介质与导体交界面

#### 1. 切向分析

此处与电介质交界面的结论类似，但导体表面的电场线永远垂直于导体表面，即其切向分量恒为0 。

因此有：

$$
\boxed{
  E_{1t} = E_{2t} \equiv 0
}
$$

#### 2. 法向分析

![alt text](<EMFT Chapter 3 P II.attachments/1774773749786.png>)

由于导体内部无电场存在，且电场大小与面电荷密度成正比，因此有：

$$



  \begin{aligned}
D_{1n} &= \sigma \\

E_{1n} &= \frac{\sigma}{\varepsilon_1 } 
\end{aligned}

$$

即：

$$
\boxed{
  \vec D = \varepsilon_1 \vec E = \sigma \vec e_n
}
$$



## 3-10 电容与电容器 Capacitance & Capacitor

### 3-10-1 电容的定义

在静电平衡下，导体是等势体。如果给导体带电，总电荷为 $Q$，导体电位为 $U$，那么在几何形状和周围介质不变时，电荷增加几倍，电位也会相应增加几倍。

即：

$$
Q = CU
$$

这里的比例值 $C$ 被定义为电容。


---

### 3-10-2 孤立导体与多导体的电容

#### 1. 孤立导体的电容

![alt text](<EMFT Chapter 3 P II.attachments/1774774515058.png>)

考虑真空中一个孤立导体，如果我们以无穷远处为零势面，给出其带电量 $q$ 和电势 $\varphi$ ，则其电容被定义为：

$$
C = \frac{q}{\varphi}
$$

#### 2. 双导体的电容

![alt text](<EMFT Chapter 3 P II.attachments/1774774669720.png>)

结构如图所示，此时两个导体的电容需要用两者之间的绝对电势差计算：

$$
C = \frac{q}{U} = \frac{q}{\left| \varphi_1 -\varphi_2 \right|}
$$

#### 3. 多导体的电容

如果两电容串联，则总电容为其倒数和的倒数：

$$
\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2}
$$

如果两电容并联，则总电容为其和：

$$
C = C_1 + C_2
$$

> [!TIP]
>
> 串联和并联也是分层结构求电容的基础。
> 
> 即，将一个电容视作多个电容的并联 / 串联，先求解拆分出来的子电容，最后用串并联定理求总电容。

---

### 3-10-3 电容的决定因素与求解方法

电容 $C$ 是导体系统本身的一个物理属性，它由导体系统的**结构、尺寸、形状**以及周围的**介质**共同决定，而**与导体当前所带的电荷量和电位无关**。也就是说，在几何结构和介质分布不变的前提下，即使导体上的电荷 $Q$ 或两导体间的电压 $U$ 改变，电容

$$
C=\frac{Q}{U}
$$

仍保持不变。

因此，求解电容的关键不在于“直接求 $C$”，而是先求出电荷 $Q$ 与电压 $U$ 之间的关系，再利用定义得到电容。

常用的求解方法有两种：

- **方法一：先设电荷，再求电压**  
  先假设单个导体带电 $q$，或两个导体分别带 $\pm q$，然后根据电场分布求出导体的电位或两导体之间的电压 $U$，最后代入
  $
  C=\frac{Q}{U}
  $
  求得电容。

- **方法二：先设电位或电压，再求电荷**  
  先假设导体的电位，或两个导体之间的电压 $U$，然后求导体表面的电荷分布并积分得到总电荷 $Q$，最后同样利用
  $
  C=\frac{Q}{U}
  $
  求得电容。

所以，电容问题本质上都是围绕下面这个定义展开的：

$$
C=\frac{Q}{U}
$$

区别只在于：有时先从电荷出发求电压，有时先从电压出发求电荷。

::: example 分层法求电容
::: stem
![alt text](<EMFT Chapter 3 P II.attachments/1774775436561.png>)

这道题中的两种介质是**沿圆柱底面直径切分**的，也就是说，分界面是一个**经过圆柱轴线的平面**，而不是沿半径方向一层一层套起来。
:::
::: solution

因此：

- 电场线仍然主要沿**径向**分布；
- 两个介质区域两端连接的是**同一对导体**；
- 两个区域承受的**电压相同**。

所以该结构应看成两个半圆柱电容器的**并联**。

设两种介质的介电常数分别为

$$
\varepsilon_1=\varepsilon_0\varepsilon_{r1},\qquad
\varepsilon_2=\varepsilon_0\varepsilon_{r2}
$$

内、外导体半径分别为 $r_i,\ r_o$，长度为 $L$。

先单独求其中一个**半圆柱区域**的电容。设该区域的介电常数为 $\varepsilon$，所带电荷为 $Q$。由于该区域对应的圆心角为 $\pi$，取半径为 $r$、长度为 $L$ 的扇形同轴高斯面，有

$$
\oint_S \vec D\cdot d\vec S = Q
$$

即

$$
D_r(\pi rL)=Q
$$

所以径向电场为

$$
E_r(r)=\frac{Q}{\pi \varepsilon rL}
$$

该半圆柱区域两导体间的电压为

$$
U=\int_{r_i}^{r_o} E_r(r)\,dr
=\frac{Q}{\pi \varepsilon L}\int_{r_i}^{r_o}\frac{dr}{r}
=\frac{Q}{\pi \varepsilon L}\ln\frac{r_o}{r_i}
$$

因而该半圆柱区域的电容为

$$
C=\frac{Q}{U}
=\frac{\pi \varepsilon L}{\ln(r_o/r_i)}
$$

对两种介质分别应用这一结果，可得

$$
C_1=\frac{\pi \varepsilon_0\varepsilon_{r1}L}{\ln(r_o/r_i)}
$$

$$
C_2=\frac{\pi \varepsilon_0\varepsilon_{r2}L}{\ln(r_o/r_i)}
$$

由于两部分是并联关系，所以总电容为

$$
C=C_1+C_2
$$

代入得

$$
C=\frac{\pi \varepsilon_0L}{\ln(r_o/r_i)}\left(\varepsilon_{r1}+\varepsilon_{r2}\right)
$$

**最终结果**

$$
\boxed{
C=\frac{\pi \varepsilon_0L\left(\varepsilon_{r1}+\varepsilon_{r2}\right)}{\ln(r_o/r_i)}
}
$$
:::
:::

## 3-11 静电能 Electrostatic Energy

### 3-11-1 静电能 Electrostatic Energy

静电场不仅能对电荷做功，也能够储存能量。若正电荷沿电场方向运动，则电场对电荷做功，说明静电场中的能量减少；反过来，若将电荷从无穷远缓慢搬运到某一带电体附近，就需要外力克服电场力做功，这部分功就转化为静电场中储存的能量。

因此，**静电能的本质**可以理解为：建立该电荷分布时，外力从无穷远把电荷一点点搬运到指定位置所做的总功。

设某一带电体在中间过程中已经带有电荷 $q$，此时其电势为 $\varphi(q)$。若继续搬入一个微元电荷 $dq$，则外力所做微元功为

$$
dW_e = \varphi(q)\,dq
$$

于是，当总电荷由 $0$ 增加到最终值 $Q$ 时，静电能为

$$
W_e = \int_0^Q \varphi(q)\,dq
$$

这就是静电能最基本的定义式。

---

### 3-11-2 导体 / 电容的静电能

对于孤立导体，若其电容为 $C$，电荷为 $q$，电势为 $\varphi$，则有

$$
\varphi = \frac{q}{C}
$$

代入静电能定义式：

$$
W_e = \int_0^Q \frac{q}{C}\,dq
= \frac{1}{C}\int_0^Q q\,dq
= \frac{Q^2}{2C}
$$

又因为最终电势

$$
\Phi = \frac{Q}{C}
$$

所以静电能还可以写成

$$
W_e = \frac{1}{2}\Phi Q
$$

若写成电容与电压的形式，则有

$$
Q = CU
$$

因此

$$
W_e = \frac{1}{2}QU
= \frac{1}{2}CU^2
= \frac{Q^2}{2C}
$$

所以，对导体或电容器，常用的静电能公式为

$$
\boxed{
W_e = \frac{1}{2}QU
= \frac{Q^2}{2C}
= \frac{1}{2}CU^2
}
$$

其中：

- $Q$ 为导体或电容器极板上的电荷量；
- $U$ 为电压；
- $C$ 为电容。

这些公式彼此等价，实际使用时选最方便的形式即可。

---

### 3-11-3 多个带电体的静电能

若系统中有 $n$ 个带电体，第 $i$ 个带电体的最终电荷为 $Q_i$，最终电势为 $\Phi_i$，则系统总静电能可写为

$$
W_e = \frac{1}{2}\sum_{i=1}^{n}\Phi_i Q_i
$$

这个公式的物理意义是：把所有带电体上的电荷都按相同比例从 $0$ 同时增加到最终值，逐步累加外力所做的功，最终得到整个系统的总静电能。

对于两个带电体组成的系统，上式可写成

$$
W_e = \frac{1}{2}\left(\Phi_1 Q_1 + \Phi_2 Q_2\right)
$$

若是普通两极板电容器，带电量分别为 $+Q$ 和 $-Q$，电位分别为 $\Phi_1$ 和 $\Phi_2$，则有

$$
U = \Phi_1 - \Phi_2
$$

从而仍可化为

$$
W_e = \frac{1}{2}QU
$$

需要注意的是，静电能一般**不满足简单叠加**。虽然电场满足叠加原理，但由于能量与场强的平方有关，所以多个带电体同时存在时，总能量不等于各自单独存在时能量的简单和。多出来的部分称为**相互能**，而单个带电体自身对应的部分称为**自能**。

---

### 3-11-4 连续分布电荷的静电能

若电荷不是集中在若干离散带电体上，而是连续分布在体内、表面或曲线上，则静电能公式可以写成积分形式。

对于体电荷分布 $\rho$，有

$$
W_e = \frac{1}{2}\int_V \rho \varphi\,dV
$$

对于面电荷分布 $\rho_s$，有

$$
W_e = \frac{1}{2}\int_S \rho_s \varphi\,dS
$$

对于线电荷分布 $\rho_l$，有

$$
W_e = \frac{1}{2}\int_l \rho_l \varphi\,dl
$$

其中，$\varphi$ 分别表示对应体元、面元或线元所在位置的电势。

因此，连续分布电荷的静电能本质上仍然可以理解为：把所有微元电荷从无穷远搬入其当前位置所需外力做功的总和，只不过离散求和变成了连续积分。

对于导体系统，若第 $i$ 个导体表面电位为 $\varphi_i$，表面电荷总量为 $q_i$，则还可写成

$$
W_e = \frac{1}{2}\sum_i \varphi_i q_i
$$

这实际上是离散带电体公式在导体系统中的具体形式。

---

### 3-11-5 电场能

从电场角度看，静电能并不是“附着在电荷上”，而是**分布在整个存在电场的空间中**。对于**线性介质**，由连续分布电荷的静电能公式可进一步推导出场的表达式：

$$
W_e = \frac{1}{2}\int_V \vec D \cdot \vec E \, dV
$$

其中积分区域 $V$ 是**整个有电场存在的空间**。

因此，在线性介质中，静电场的能量密度可写为

$$
w_e = \frac{dW_e}{dV} = \frac{1}{2}\vec D \cdot \vec E
$$

对于线性各向同性介质，有

$$
\vec D = \varepsilon \vec E
$$

所以能量密度可写为

$$
w_e = \frac{1}{2}\varepsilon E^2
$$

总静电能则为

$$
W_e = \frac{1}{2}\int_V \varepsilon E^2\,dV
$$

这表明：

- 静电场能量与场强平方成正比；
- 电场越强，单位体积内储存的能量越大；
- 能量分布在整个电场空间中，而不仅仅局限于导体表面。

---

### 3-11-6 总结

因此，静电能的几种常见表达式可以总结为下表：

| 情形 / 说明 | 公式 |
| --- | --- |
| 从零带电过程（$\varphi(q)$ 为电量增至 $q$ 时系统的电势） | $W_e = \displaystyle\int_0^Q \varphi(q)\,dq$ |
| 二端电容 / 单电容等（$Q,U,C$ 为总电荷、电压、电容） | $W_e = \dfrac{1}{2}QU = \dfrac{Q^2}{2C} = \dfrac{1}{2}CU^2$ |
| $n$ 个导体系统（$\Phi_i,Q_i$ 为第 $i$ 个导体的电势与电量） | $W_e = \dfrac{1}{2}\displaystyle\sum_{i=1}^{n}\Phi_i Q_i$ |
| 连续电荷分布（$\rho,\varphi$ 为体密度与电势） | $W_e = \dfrac{1}{2}\displaystyle\int_V \rho \varphi\,dV$ |
| 用场量表示（**线性**介质下 $\vec D$ 与 $\vec E$ 满足线性本构） | $W_e = \dfrac{1}{2}\displaystyle\int_V \vec D \cdot \vec E \, dV$ |
| **线性各向同性**介质：能量密度 $w_e$ 与总能量 | $w_e = \dfrac{1}{2}\varepsilon E^2$，$\quad W_e = \dfrac{1}{2}\displaystyle\int_V \varepsilon E^2\,dV$ |

这些公式只是同一静电能在不同问题背景下的不同写法。实际做题时，应根据已知条件选择最方便的形式。






