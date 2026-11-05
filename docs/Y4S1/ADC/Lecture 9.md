---
lastUpdated: 2026-11-04T22:58:31+08:00
---

# 9 Introduction to Radio Access Networks

<LyricCover
  image="Lecture 9.attachments/1793871863182.jpg"
  title="シャルル(Cover)"
  artist="25時、ナイトコードで。"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/songDetail/004T0fSJ2vxROI"
  netease-url="https://music.163.com/song?id=1935705479"
>
  <LyricLine
    original="愛(あい)を謳(うた)って謳って雲(くも)の上(うえ)"
    translation="将爱歌颂吧 歌颂吧 云层之上"
  />
  <LyricLine
    original="濁(にご)りきっては見(み)えないや 嫌(いや) 嫌"
    translation="越发浑浊 模糊不清 讨厌 讨厌"
  />
</LyricCover>

## 章节目录

- [章节目录](#章节目录)
- [9-1 移动网络结构 Mobile Network Architecture](#9-1-移动网络结构-mobile-network-architecture)
  - [9-1-1 核心网与功能 Core Network and Functions](#9-1-1-核心网与功能-core-network-and-functions)
  - [9-1-2 用户数据通路 User Data Path](#9-1-2-用户数据通路-user-data-path)
- [9-2 无线接入网的作用 Role of the RAN](#9-2-无线接入网的作用-role-of-the-ran)
  - [9-2-1 关键功能与资源管理 Key Functions and RRM](#9-2-1-关键功能与资源管理-key-functions-and-rrm)
  - [9-2-2 移动性、QoS 与指标 Mobility, QoS and Metrics](#9-2-2-移动性qos-与指标-mobility-qos-and-metrics)
- [9-3 基站与协议层 Base Station and Protocol Layers](#9-3-基站与协议层-base-station-and-protocol-layers)
- [9-4 RAN 架构演进 RAN Architecture Evolution](#9-4-ran-架构演进-ran-architecture-evolution)
  - [9-4-1 集中式与分布式 Centralised and Distributed](#9-4-1-集中式与分布式-centralised-and-distributed)
  - [9-4-2 虚拟化与 Open RAN Virtualised and Open RAN](#9-4-2-虚拟化与-open-ran-virtualised-and-open-ran)
- [9-5 资源分配与调度 Resource Allocation and Scheduling](#9-5-资源分配与调度-resource-allocation-and-scheduling)
  - [9-5-1 调度策略 Scheduling Strategies](#9-5-1-调度策略-scheduling-strategies)
  - [9-5-2 权衡与指标 Trade-offs and KPIs](#9-5-2-权衡与指标-trade-offs-and-kpis)
- [9-6 能耗优化 Energy Optimisation](#9-6-能耗优化-energy-optimisation)

## 9-1 移动网络结构 Mobile Network Architecture

手机到互联网的路径分三段：终端、无线接入网、核心网。

![alt text](<Lecture 9.attachments/l9-network.png>)

用户设备 User Equipment（UE）通过无线链路接入基站；基站属于无线接入网 Radio Access Network；核心网 Core Network 把接入网与外部网络连接起来。三者分工明确，各自负责不同层面的功能。

### 9-1-1 核心网与功能 Core Network and Functions

:::: definition 核心网 Core Network
**核心网 Core Network** 位于 RAN 与外部网络之间，负责会话建立、移动性管理、安全与连通性。
::::

核心网是移动系统的大脑，5G 核心网 5GC 已经完全软件化，采用服务化架构 SBA：功能模块化、接口 API 化，可部署在容器或虚拟机上。控制面与用户面分离 CUPS 让两者独立扩展，提升可扩展性与效率。

主要功能模块：

| 缩写 | 中文名 | 作用 |
| --- | --- | --- |
| AMF | 接入与移动性管理功能 | 注册、移动性管理与切换 |
| SMF | 会话管理功能 | IP 会话建立与路由 |
| UPF | 用户面功能 | 用户数据转发 |
| AUSF | 认证服务器功能 | 用户认证与身份校验 |
| UDM | 统一数据管理 | 用户签约数据管理 |
| PCF | 策略控制功能 | 策略控制 |
| CHF | 计费功能 | 计费 |

### 9-1-2 用户数据通路 User Data Path

终端上网时数据经过的步骤：

1. UE 无线接入 gNB；
2. gNB 把请求转到 AMF；
3. AMF 触发 SMF 建立会话；
4. SMF 选择合适的 UPF 转发数据；
5. UPF 把流量送往互联网。

控制面走 AMF 与 SMF，用户面走 UPF。两套通路的分离使得信令与数据可以各自扩展。

## 9-2 无线接入网的作用 Role of the RAN

:::: definition 无线接入网 Radio Access Network
**无线接入网 Radio Access Network, RAN** 是终端与核心网之间的无线接入部分，负责无线收发、资源调度与移动性管理。
::::

RAN 决定网络的覆盖与容量，是用户感知的直接来源。它接收用户数据并转交核心网，也把核心网的数据送到用户。

### 9-2-1 关键功能与资源管理 Key Functions and RRM

RAN 的关键功能包括：

- 无线信号的发送与接收；
- 动态的资源调度与分配；
- 移动性管理与切换；
- 服务质量 QoS 保障与链路自适应。

无线资源管理 RRM 负责频谱的高效使用，包括功率控制、负载均衡与接纳控制，目标是在吞吐量与用户体验之间取得平衡。

调度与 HARQ 决定每个用户在当前时频资源上能分到多少资源，并执行公平性、吞吐量与 QoS 策略；HARQ 负责出错后的重传。

### 9-2-2 移动性、QoS 与指标 Mobility, QoS and Metrics

移动性管理保证用户在移动过程中保持连接。系统监测信号质量，触发同小区或跨小区切换。

QoS 处理把业务流映射到不同的承载，给予优先级、时延与吞吐量保证，使语音与视频等业务得到区别对待。

衡量 RAN 的指标包括吞吐量、覆盖面积、时延、切换成功率、频谱与能量效率、资源利用率与连接密度。RAN 直接影响数据速率、时延与可靠性，同时占据网络运营成本与资本支出的很大一部分。

## 9-3 基站与协议层 Base Station and Protocol Layers

基站由射频单元 RU 与基带单元 BBU 组成。RU 负责射频前端与天线，BBU 负责数字信号处理。基站还包含功率放大器、滤波器与天线。

按覆盖范围划分，宏基站 Macro Cell 半径约 1--20 km，微基站 Micro Cell 约 300 m--2 km，皮基站 Pico Cell 约 50--200 m。

RAN 内部按功能分层：

| 层 | 中文名 | 职责 |
| --- | --- | --- |
| PHY | 物理层 | 调制、编码、传输 |
| MAC | 媒体接入控制 | 调度、复用、HARQ |
| RLC | 无线链路控制 | 分段与重组、重排序、ARQ 重传、流控 |
| PDCP | 分组数据汇聚协议 | 加密、头压缩、排序 |

控制面与用户面走不同的协议栈：

| 控制面 | 用户面 |
| --- | --- |
| NAS | IP |
| RRC | SDAP |
| PDCP | PDCP |
| RLC | RLC |
| MAC | MAC |
| PHY | PHY |

NAS 是非接入层 Non-Access Stratum，负责终端与核心网之间的信令；RRC 是无线资源控制 Radio Resource Control，管理其下所有层，负责连接控制、无线承载建立、移动性管理与 QoS。SDAP 是服务数据适配协议 Service Data Adaptation Protocol，把核心网的 QoS 映射到无线承载。

## 9-4 RAN 架构演进 RAN Architecture Evolution

### 9-4-1 集中式与分布式 Centralised and Distributed

传统 RAN 是单体基站：所有处理集中在基站内，硬件与软件由同一厂商紧耦合，灵活性与可扩展性都受限，升级昂贵，容易形成厂商锁定。

集中式 RAN 把基带单元集中成池，通过前传 Fronthaul 连接远端射频单元。它的优点是能耗与制冷成本低，可以用协作多点传输 CoMP 提升速率与覆盖，扩展性好；缺点是前传容量要求高、距离带来的时延明显。

分布式 RAN 把基带单元放在站点上，每个站点自带 BBU 与射频单元，通过回传 Backhaul 直接连核心网。它部署简单、时延低，但每站点都要配 BBU、机房与制冷，运营成本高，扩展性有限。

### 9-4-2 虚拟化与 Open RAN Virtualised and Open RAN

虚拟化 RAN 用虚拟机或容器把软件与硬件解耦，实现低成本扩展与网络切片，但仍然依赖厂商实现，接口并不完全开放。

:::: definition Open RAN Open Radio Access Network
**Open RAN** 把基站拆成集中单元 CU、分布单元 DU 与射频单元 RU，用开放的标准化接口连接，允许多厂商互操作。
::::

三个单元的分工：

- RU 负责射频收发，包含天线、功放与前端电路；
- DU 负责 PHY、MAC 与部分 RLC，承担低时延调度与 HARQ；
- CU 负责 PDCP、上层 RLC 与控制面功能，通常部署在边缘云或数据中心。

![alt text](<Lecture 9.attachments/l9-oran.png>)

O-RAN 的主要接口：E2 连接 O-CU/O-DU 与近实时 RIC（无线接入网智能控制器），A1 连接近实时与非实时 RIC，O1 连接 CU/DU/RU 与服务管理与编排 SMO。RIC 承载 xApp，用 AI/ML 做无线资源的智能控制。

## 9-5 资源分配与调度 Resource Allocation and Scheduling

:::: definition 资源分配 Resource Allocation
**资源分配 Resource Allocation** 把时间、频率与功率等无线资源指派给用户，在吞吐量与公平性之间取得平衡。
::::

资源分配以业务需求与信道条件为依据动态进行，直接影响用户体验。

### 9-5-1 调度策略 Scheduling Strategies

| 策略 | 做法 | 特点 |
| --- | --- | --- |
| 轮询 Round Robin | 按顺序轮流分配资源 | 公平性好，吞吐量低 |
| 比例公平 Proportional Fair | 兼顾速率与公平 | 折中方案，实际常用 |
| 最大吞吐量 Max Throughput | 优先调度信道好的用户 | 吞吐量高，边缘用户吃亏 |

### 9-5-2 权衡与指标 Trade-offs and KPIs

调度需要在几组目标之间取舍：高负载下的公平与效率、小区边缘用户保护与总吞吐量、实时业务与非实时业务的优先级。

资源分配的关键性能指标 KPI 包括每用户吞吐量、小区边缘性能、调度器利用率、资源块效率与公平性。动态资源分配根据实时需求与信道变化调整，也可以引入 AI 模型预测流量。

## 9-6 能耗优化 Energy Optimisation

RAN 占网络能耗的比例可高达 80%，节能直接关系到运营成本与可持续性。

常见手段包括：低流量时段的休眠模式、按负载激活或关闭小区、自适应调整发射功率。

AI 可以预测流量并调整参数，实施节能调度策略，在预测的低谷时段关闭或缩减资源。实际部署中，Rakuten 的 Open RAN 试验报告了约 30% 的节能，TIP 在农村场景也做了类似尝试。
