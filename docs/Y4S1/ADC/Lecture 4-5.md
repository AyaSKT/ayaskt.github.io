---
lastUpdated: 2026-11-04T16:48:26+08:00
---

# 4-5 Channel Coding and Error Control

<LyricCover
  image="Lecture 4-5.attachments/1793782531494.jpg"
  title="猛独が襲う"
  artist="一二三"
  lang="ja"
  netease-url="https://music.163.com/song?id=1372315637"
>
  <LyricLine
    original="誰(だれ)に何(なん)と言(い)ったって もう戻(もど)れないんだって"
    translation="不管和别人说什么 也已经无法回头"
  />
  <LyricLine
    original="「面倒(めんどう)だ」なんて 手放(てばな)したことさえ"
    translation="就连觉得好麻烦 而放手不管 也做不到"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [4-1 错误控制的动机 Motivations for Error Control](#4-1-错误控制的动机-motivations-for-error-control)
- [4-2 前向纠错 Forward Error Correction](#4-2-前向纠错-forward-error-correction)
- [4-3 自动重传请求 Automatic Repeat Request](#4-3-自动重传请求-automatic-repeat-request)
- [4-4 混合 ARQ 与方案比较 Hybrid ARQ and Comparison](#4-4-混合-arq-与方案比较-hybrid-arq-and-comparison)
- [4-5 码率与冗余 Code Rate and Redundancy](#4-5-码率与冗余-code-rate-and-redundancy)
- [4-6 奇偶校验与矩形码 Parity and Rectangular Codes](#4-6-奇偶校验与矩形码-parity-and-rectangular-codes)
  - [4-6-1 奇偶校验码 Parity-Check Codes](#4-6-1-奇偶校验码-parity-check-codes)
  - [4-6-2 矩形码 Rectangular Code](#4-6-2-矩形码-rectangular-code)
- [4-7 编码增益 Coding Gain](#4-7-编码增益-coding-gain)
- [4-8 线性分组码 Linear Block Codes](#4-8-线性分组码-linear-block-codes)
  - [4-8-1 线性性质与码字空间 Linearity and Codeword Space](#4-8-1-线性性质与码字空间-linearity-and-codeword-space)
  - [4-8-2 汉明重量与距离 Hamming Weight and Distance](#4-8-2-汉明重量与距离-hamming-weight-and-distance)
- [4-9 生成矩阵与系统码 Generator Matrix and Systematic Codes](#4-9-生成矩阵与系统码-generator-matrix-and-systematic-codes)
- [4-10 校验矩阵与伴随式 Parity-Check Matrix and Syndrome](#4-10-校验矩阵与伴随式-parity-check-matrix-and-syndrome)
  - [4-10-1 校验矩阵 Parity-Check Matrix](#4-10-1-校验矩阵-parity-check-matrix)
  - [4-10-2 伴随式计算 Syndrome Computation](#4-10-2-伴随式计算-syndrome-computation)
- [4-11 标准阵列译码 Standard Array Decoding](#4-11-标准阵列译码-standard-array-decoding)
- [4-12 例题 Worked Examples](#4-12-例题-worked-examples)

## 4-1 错误控制的动机 Motivations for Error Control

严重传输问题在通信中很常见。陆地移动通信面临多径衰落（反射、绕射、散射）与低信噪比；卫星通信受限于下行方向的发射功率，卫星能源有限。

:::: definition 信道编码 Channel Coding
**信道编码 Channel Coding** 向信息比特加入受控冗余，使接收端能够检测甚至纠正传输错误，从而提高可靠性。
::::

无编码时 $k$ 个信息比特直接发送 $k$ 个比特；编码后发送 $n$ 个比特，$n>k$。编码质量用误码率 BER 与误帧率 FER 衡量。

![alt text](<Lecture 4-5.attachments/l45-coding-chain.png>)

理想情况下，即使码字被噪声破坏，译码器也应能判断发送的是哪一个码字。错误控制至少包含检错，最好同时包含纠错；只检错时，收端只能请求重传。

## 4-2 前向纠错 Forward Error Correction

:::: definition 前向纠错 Forward Error Correction
**前向纠错 Forward Error Correction, FEC** 在发送端加入冗余，使接收端无需重传即可纠正部分错误。
::::

主要的 FEC 类别：

- 线性分组码 Linear Block Codes；
- Reed-Solomon 码；
- 卷积码 Convolutional Codes；
- Turbo 码；
- LDPC 码；
- Polar 码。

FEC 适用于三类场景：重传会带来过大时延；没有反向链路；错误频繁到反复重传已不划算。

## 4-3 自动重传请求 Automatic Repeat Request

:::: definition 自动重传请求 Automatic Repeat Request
**自动重传请求 Automatic Repeat Request, ARQ** 由接收端检测错误并请求重传，发送端按确认结果决定是否重发。
::::

接收正确时目的端回 ACK，检测到错误时回 NAK。帧出错或丢失都需要重传。

![alt text](<Lecture 4-5.attachments/l45-stop-and-wait.png>)

停止等待 ARQ 是最简单的形式：发送一个包后等待 ACK，再发下一个包。包出错或丢失时收端不回 ACK，发端超时后重发。设包传输时间为 $T_p$、往返等待时间为 $T_{RTT}$，效率约为

$$
\eta\approx\dfrac{T_p}{T_p+T_{RTT}}
$$

$T_p=1$ ms、$T_{RTT}=20$ ms 时 $\eta\approx1/21\approx4.8\%$。

回退 N 帧 ARQ 让发送端在长度为 $N$ 的窗口内连续发多个包，同时接收 ACK。收端发现错误或丢包时对特定包回 NAK，并丢弃其后所有包；发端从出错包开始重传。收端不接受乱序到达的包。

选择重传 ARQ 让收端用缓冲区暂存所有已收到的包。发现错误时只请求重传出错的那个包，收齐后再按顺序重排。它的重传次数最少，代价是更高的缓存需求与实现复杂度。

ARQ 的实现比 FEC 简单，但在以下情况下不适用：没有反向信道，或 ARQ 的时延过大；重传策略不便实现；无纠错时的预期错误数过多，导致重传开销不可接受。

## 4-4 混合 ARQ 与方案比较 Hybrid ARQ and Comparison

| 项目 | FEC | ARQ |
| --- | --- | --- |
| 冗余用途 | 纠错 | 检错 |
| 可纠正错误时 | 无需重传 | 仍需重传 |
| 时延 | 低 | 重传带来时延 |
| 反向信道 | 不需要 | 需要 |
| 译码复杂度 | 较高 | 较低 |

:::: definition 混合 ARQ Hybrid ARQ
**混合 ARQ Hybrid ARQ** 把 FEC 与重传结合：先发送 FEC 编码包，译码失败时再请求重传，并把多次传输的信息合并使用。
::::

HARQ 保留了 FEC 的低时延，又用重传兜住译码失败的情况，现代蜂窝系统普遍采用。

## 4-5 码率与冗余 Code Rate and Redundancy

分组编码把每个 $k$ 比特的数据块变换为 $n$ 比特的码块。多出的 $n-k$ 个比特称为冗余比特、校验比特或监督比特，不携带新信息。

:::: definition 码率 Code Rate
**码率 Code Rate** 是数据比特占码块总比特的比例：

$$
R_c=\dfrac{k}{n}
$$
::::

冗余度定义为冗余比特与数据比特之比：

$$
\text{redundancy}=\dfrac{n-k}{k}
$$

(15,11) 码中 $k=11$、$n=15$，码率 $11/15=0.733$，冗余度 $(15-11)/11=36.4\%$。

## 4-6 奇偶校验与矩形码 Parity and Rectangular Codes

### 4-6-1 奇偶校验码 Parity-Check Codes

:::: definition 奇偶校验码 Parity-Check Code
**奇偶校验码 Parity-Check Code** 在数据块后附加一个校验位，使整个码字中 1 的个数为偶数（偶校验）或奇数（奇校验）。
::::

接收端对码字做模 2 求和，与已知校验比较。它能检出全部奇数个错误，偶数个错误则可能漏检；即使检出，也无法指出错在哪一位，校验位本身也可能出错。按最小距离计，保证检错能力为 1 位，且没有纠错能力。

例如发送 $U=10111$（偶校验，1 的个数为 4）。若收到 $10011$，1 的个数变为 3，校验由偶变奇，错误被检出；若收到 $11011$，1 的个数仍为 4，两位错误漏检。

设比特错误相互独立、概率为 $p$，$n$ 比特中 $j$ 个错误位置的组合数为

$$
\dbinom{n}{j}=\dfrac{n!}{j!\,(n-j)!}
$$

出现 $j$ 个错误的概率为

$$
\Pr(j,n)=\dbinom{n}{j}p^{j}(1-p)^{n-j}
$$

漏检概率是所有偶数个错误的概率之和：

$$
P_m=\sum_{j=1}^{\lfloor n/2\rfloor}\dbinom{n}{2j}p^{2j}(1-p)^{n-2j}
$$

:::: stem L4-5-E1
(4,3) 奇偶校验码，$p=10^{-3}$。求恰好出现 2 个错误的概率与漏检概率。
::::

:::: solution
位置数为

$\dbinom{4}{2}=\dfrac{4!}{2!\,2!}=6$

2 个错误的概率：

$\Pr(2,4)=6p^{2}(1-p)^{2}=6\times10^{-6}\times(1-10^{-3})^{2}\approx6\times10^{-6}$

漏检概率：

$P_m=\dbinom{4}{2}p^{2}(1-p)^{2}+\dbinom{4}{4}p^{4}\approx6\times10^{-6}+10^{-12}\approx6\times10^{-6}$
::::

---

### 4-6-2 矩形码 Rectangular Code

:::: definition 矩形码 Rectangular Code
**矩形码 Rectangular Code** 把信息比特排成矩形阵列，为每一行和每一列各加一个奇偶校验位，行、列同时校验。
::::

:::: stem L4-5-E2
接收码字排成 $3\times4$ 阵列（偶校验）：

$$
r=\begin{bmatrix}1&1&1&0\\0&1&1&0\\1&0&1&0\end{bmatrix}
$$

找出并纠正其中的错误。
::::

:::: solution
逐行求和：第 1 行 3 个 1，校验失败；第 2、3 行均为偶数个 1，校验通过。

逐列求和：第 3 列 3 个 1，校验失败；第 1、2、4 列通过。

失败的行与列交叉于第 1 行第 3 列，该位由 1 改为 0：

$$
r'=\begin{bmatrix}1&1&0&0\\0&1&1&0\\1&0&1&0\end{bmatrix}
$$

行列各只有一处失败时，矩形码可以定位并纠正单个错误；失败处多于一处时无法纠正。
::::

## 4-7 编码增益 Coding Gain

![alt text](<Lecture 4-5.attachments/l45-coded-vs-uncoded.png>)

图中虚线为编码后的误码率曲线，实线为未编码曲线。低 $E_b/N_0$ 段编码反而更差，因为每个码比特分到的能量下降；越过交点后编码曲线下降更陡，最终在相同 BER 下所需 $E_b/N_0$ 更低。两点之间的水平差值就是编码增益。

:::: stem L4-5-E3
系统 $E_b/N_0=9.6$ dB（即 9.12），未编码误比特率 $P_u=Q\left(\sqrt{2E_b/N_0}\right)=1.02\times10^{-5}$。采用 (15,11) 码纠正每块 1 位错误。求带宽扩展、码比特的信噪比与编码后的块错误概率。
::::

:::: solution
带宽扩展为

$\dfrac{15}{11}\approx1.36$

即增加 36%。码比特与信息比特的能量关系为

$\dfrac{E_c}{N_0}=\dfrac{E_b}{N_0}\cdot\dfrac{k}{n}$

换成 dB：

$\dfrac{E_c}{N_0}=9.6+10\log_{10}\dfrac{11}{15}=8.3\ \text{dB}=6.69$

编码后单个码比特的错误概率：

$P_c=Q\left(\sqrt{2E_c/N_0}\right)=1.36\times10^{-4}$

一块 15 比特中出现 2 个及以上错误时无法纠正，块错误概率近似为

$P_{Bc}\approx\dbinom{15}{2}P_c^{2}(1-P_c)^{13}=1.94\times10^{-6}$

对照未编码情形，11 比特块至少 1 位错误的概率：

$P_{Bu}=1-(1-P_u)^{11}=1.12\times10^{-4}$

块错误概率从 $1.12\times10^{-4}$ 降到 $1.94\times10^{-6}$，约 60 倍改善，代价是 36% 的带宽扩展。
::::

> [!NOTE]
> 按 $Q$ 函数精确计算，$P_c=Q\left(\sqrt{2E_c/N_0}\right)=1.27\times10^{-4}$，块错误概率约 $1.7\times10^{-6}$；课件取 $1.36\times10^{-4}$ 与 $1.94\times10^{-6}$，两者相差来自 $Q$ 表取舍，结论一致。

## 4-8 线性分组码 Linear Block Codes

### 4-8-1 线性性质与码字空间 Linearity and Codeword Space

:::: definition 线性分组码 Linear Block Code
**线性分组码 Linear Block Code** 是满足线性性质的 $(n,k)$ 分组码：$2^{k}$ 个信息向量被映射为 $n$ 比特码字，且任意两个码字的模 2 和仍是码字。
::::

$n$ 比特共有 $2^{n}$ 个可能向量，线性分组码从中选出 $2^{k}$ 个作为合法码字。

模 2 加法与乘法的结果如下：

| 运算 | 结果 |
| --- | --- |
| $1+1$ | $0$ |
| $1+0$ | $1$ |
| $0+0$ | $0$ |
| $1\times1$ | $1$ |
| $1\times0$ | $0$ |

全部二元 $n$ 元组构成二元域上的向量空间。若子集 $S$ 包含全零向量，且任意两个向量的和仍在 $S$ 内，则 $S$ 是子空间。码字 $V_i$ 与 $V_j$ 的模 2 和也是码字，这样的码就是线性的。

以 (6,3) 码为例，$2^{3}=8$ 个信息向量对应 8 个码字：

| 信息向量 | 码字 |
| --- | --- |
| 000 | 000000 |
| 100 | 110100 |
| 010 | 011010 |
| 110 | 101110 |
| 001 | 101001 |
| 101 | 011101 |
| 011 | 110011 |
| 111 | 000111 |

---

### 4-8-2 汉明重量与距离 Hamming Weight and Distance

:::: definition 汉明重量 Hamming Weight
**汉明重量 Hamming Weight** 是二元向量中非零元素的个数。
::::

$U=100101101$ 含 5 个 1，故 $w(U)=5$。

:::: definition 汉明距离 Hamming Distance
**汉明距离 Hamming Distance** 是两个向量对应位置取值不同的位数，等于二者之和的汉明重量：

$$
d(U,V)=w(U+V)
$$
::::

$U=100101101$、$V=011110100$ 时 $d(U,V)=6$。

:::: definition 最小距离 Minimum Distance
**最小距离 Minimum Distance** 是码集中任意两个码字距离的最小值：

$$
d_{min}=\min_{i\neq j}d(U_i,U_j)
$$
::::

合法码字越接近，少量错误就可能把接收向量变成另一个合法码字；码字间距越大，可容忍的错误越多。纠错能力 $t$ 与检错能力 $e$ 由最小距离决定：

$$
t=\left\lfloor\dfrac{d_{min}-1}{2}\right\rfloor,\qquad e=d_{min}-1
$$

:::: tip
这里的 $e$ 表示检错能力，4-11 中的 $e$ 表示错误图样，两者不是同一个量。
::::

:::: stem L4-5-E4
线性分组码的最小距离为 5。求最大检错能力与最大纠错能力。
::::

:::: solution
$e=d_{min}-1=5-1=4$

$t=\left\lfloor\dfrac{5-1}{2}\right\rfloor=2$
::::

## 4-9 生成矩阵与系统码 Generator Matrix and Systematic Codes

:::: definition 生成矩阵 Generator Matrix
**生成矩阵 Generator Matrix** $G$ 是以 $k$ 个基码字为行的 $k\times n$ 矩阵，任何码字都是这些基码字的线性组合：

$$
U=mG
$$
::::

$m$ 为 $1\times k$ 信息向量，$G$ 为 $k\times n$，乘积 $U$ 为 $1\times n$。$k$ 较大时查表编码不可行，改用矩阵乘法。

以 (6,3) 码为例：

$$
G=\begin{bmatrix}1&1&0&1&0&0\\0&1&1&0&1&0\\1&0&1&0&0&1\end{bmatrix}
$$

信息向量 $m=[1\ 1\ 0]$ 时

$U=1\cdot V_1+1\cdot V_2+0\cdot V_3=110100+011010=101110$

:::: definition 系统码 Systematic Code
**系统码 Systematic Code** 把 $k$ 个信息比特原样保留在码字中，其余 $n-k$ 位为校验位。
::::

$k=3$ 时系统码的格式为 $U=[p_1\ p_2\ p_3\ m_1\ m_2\ m_3]$。对应的生成矩阵由校验块与单位矩阵拼接：

$$
G=[P\ |\ I_k]
$$

其中 $P$ 为 $k\times(n-k)$ 矩阵，$I_k$ 为 $k$ 阶单位阵。校验位由信息比特线性组合得到：

$$
u_i=m_1p_{1i}+m_2p_{2i}+\dots+m_kp_{ki},\qquad i=1,\dots,n-k
$$

## 4-10 校验矩阵与伴随式 Parity-Check Matrix and Syndrome

### 4-10-1 校验矩阵 Parity-Check Matrix

:::: definition 校验矩阵 Parity-Check Matrix
**校验矩阵 Parity-Check Matrix** $H$ 是 $(n-k)\times n$ 矩阵，其行与 $G$ 的行正交，用于检验接收向量是否为合法码字：

$$
GH^{T}=0,\qquad UH^{T}=0
$$
::::

$U$ 是 $G$ 生成的码字，当且仅当 $UH^{T}=0$。校验矩阵有两项性质：任何一列都不能全为零，否则该位的错误不影响伴随式、无法检出；所有列必须互不相同，否则两列对应位置的错误无法区分。

:::: stem L4-5-E5
某线性分组码的码字定义为 $U=(m_1+m_2,\ m_2+m_3,\ m_1+m_2+m_3,\ m_1+m_3,\ m_1,\ m_2,\ m_3)$。写出生成矩阵与校验矩阵。
::::

:::: solution
分别令 $m$ 为 $100$、$010$、$001$，得到三个基码字，作为 $G$ 的三行：

$$
G=\begin{bmatrix}1&0&1&1&1&0&0\\1&1&1&0&0&1&0\\0&1&1&1&0&0&1\end{bmatrix}
$$

这是 $(7,3)$ 码，$n-k=4$，故 $H$ 为 $4\times7$：

$$
H=\begin{bmatrix}1&0&0&0&1&1&0\\0&1&0&0&0&1&1\\0&0&1&0&1&1&1\\0&0&0&1&1&0&1\end{bmatrix}
$$
::::

---

### 4-10-2 伴随式计算 Syndrome Computation

:::: definition 伴随式 Syndrome
**伴随式 Syndrome** 是接收向量与校验矩阵的乘积：

$$
S=rH^{T}
$$
::::

$S=0$ 表示 $r$ 是合法码字。代入 $r=U+e$ 得

$$
S=(U+e)H^{T}=UH^{T}+eH^{T}=eH^{T}
$$

伴随式只与错误图样有关，与发送的码字无关。这正是译码可以只靠伴随式查表的原因。

## 4-11 标准阵列译码 Standard Array Decoding

:::: definition 标准阵列 Standard Array
**标准阵列 Standard Array** 把 $2^{n}$ 个可能接收向量排成表，每一行是一个陪集 Coset，第一列的向量称为陪集首 Coset Leader。
::::

陪集首取错误图样，取法是从重量最小、尚未出现过的向量依次选取。同一陪集中所有向量的伴随式相同：

$$
S=(U_i+e_j)H^{T}=e_jH^{T}
$$

因此只要每个陪集的伴随式互不相同，就能由伴随式唯一确定错误图样。若真实错误不是陪集首，译码会给出错误结果。

(6,3) 码的标准阵列：

| 陪集首 | $U_1$ | $U_2$ | $U_3$ | $U_4$ | $U_5$ | $U_6$ | $U_7$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 000000 | 110100 | 011010 | 101110 | 101001 | 011101 | 110011 | 000111 |
| 000001 | 110101 | 011011 | 101111 | 101000 | 011100 | 110010 | 000110 |
| 000010 | 110110 | 011000 | 101100 | 101011 | 011111 | 110001 | 000101 |
| 000100 | 110000 | 011110 | 101010 | 101101 | 011001 | 110111 | 000011 |
| 001000 | 111100 | 010010 | 100110 | 100001 | 010101 | 111011 | 001111 |
| 010000 | 100100 | 001010 | 111110 | 111001 | 001101 | 100011 | 010111 |
| 100000 | 010100 | 111010 | 001110 | 001001 | 111101 | 010011 | 100111 |
| 010001 | 100101 | 001011 | 111111 | 111000 | 001100 | 100010 | 010110 |

对每个陪集首计算 $e_jH^{T}$，得到伴随式查找表：

| 错误图样 | 伴随式 |
| --- | --- |
| 000000 | 000 |
| 000001 | 101 |
| 000010 | 011 |
| 000100 | 110 |
| 001000 | 001 |
| 010000 | 010 |
| 100000 | 100 |
| 010001 | 111 |

:::: definition 错误图样 Error Pattern
**错误图样 Error Pattern** $e$ 是与发送码字逐位模 2 相加得到接收向量的向量，$r=U+e$，其非零位置即错误位置。
::::

译码步骤：

1. 计算伴随式 $S=rH^{T}$；
2. 在查找表中找到伴随式相同的陪集首 $e_j$；
3. 把 $e_j$ 当作信道引入的错误；
4. 输出 $U=r+e_j$。

:::: stem L4-5-E6
(6,3) 码发送 $U=101110$，收到 $r=001110$。用上面的查找表纠正错误。
::::

:::: solution
$r$ 只在第 3、4、5 位为 1，伴随式等于 $H$ 第 3、4、5 列之和：

$$
S=\begin{bmatrix}0\\0\\1\end{bmatrix}+\begin{bmatrix}1\\1\\0\end{bmatrix}+\begin{bmatrix}0\\1\\1\end{bmatrix}=\begin{bmatrix}1\\0\\0\end{bmatrix}
$$

查表得错误图样 $e=100000$，纠正后的码字为

$U=r+e=001110+100000=101110$

与发送码字一致。
::::

## 4-12 例题 Worked Examples

:::: stem L4-5-E7
(6,3) 码的生成矩阵为

$$
G=\begin{bmatrix}1&1&0&1&0&0\\0&1&1&0&1&0\\1&0&1&0&0&1\end{bmatrix}
$$

1. 信息向量 $m=[1\ 1\ 0]$ 对应的码字；
2. 该码的校验矩阵 $H$；
3. 判断 $r=[1\ 1\ 0\ 1\ 1\ 0]$ 是否为合法码字。
::::

:::: solution
1. $U=m_1V_1+m_2V_2=110100+011010=101110$。

2. $G$ 已是系统形式 $[P\ |\ I_3]$，$P$ 为前三列，故 $H=[I_3\ |\ P^{T}]$：

$$
H=\begin{bmatrix}1&0&0&1&0&1\\0&1&0&1&1&0\\0&0&1&0&1&1\end{bmatrix}
$$

3. 计算伴随式，$r$ 在第 1、2、4、5 位为 1，对应列之和：

$$
S=\begin{bmatrix}1\\0\\0\end{bmatrix}+\begin{bmatrix}0\\1\\0\end{bmatrix}+\begin{bmatrix}1\\1\\0\end{bmatrix}+\begin{bmatrix}0\\1\\1\end{bmatrix}=\begin{bmatrix}0\\1\\1\end{bmatrix}
$$

$S=011\neq0$，$r$ 不是合法码字。查表得 $e=000010$，纠正后 $U=110100$。
::::

:::: stem L4-5-E8
(7,4) 码的校验矩阵

$$
H=\begin{bmatrix}1&0&0&1&0&1&1\\0&1&0&1&1&1&0\\0&0&1&0&1&1&1\end{bmatrix}
$$

收到 $r=[1\ 0\ 1\ 1\ 0\ 1\ 1]$。已知伴随式 $001$ 对应错误图样 $0010000$，求发送码字。
::::

:::: solution
$r$ 在第 1、3、4、6、7 位为 1，对应列之和：

$$
S=\begin{bmatrix}1\\0\\0\end{bmatrix}+\begin{bmatrix}0\\0\\1\end{bmatrix}+\begin{bmatrix}1\\1\\0\end{bmatrix}+\begin{bmatrix}1\\1\\1\end{bmatrix}+\begin{bmatrix}1\\0\\1\end{bmatrix}=\begin{bmatrix}0\\0\\1\end{bmatrix}
$$

$S=001$，错误图样 $e=0010000$。

$U=r+e=[1\ 0\ 0\ 1\ 0\ 1\ 1]$

验证：$UH^{T}=0$，确为合法码字。
::::
