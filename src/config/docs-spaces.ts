import type { DocsSpace, NavItem } from './types'

export const navItems = [
  { text: '主页', link: '/index' },
  { text: '第四学年', items: [] },
  {
    text: '第三学年',
    activeMatch: '^/(Y3S1/(CPS_N|AIML)|Y3S2/(DSP|EMFT|CCD|EPMF))/',
    items: [
      { text: '通信原理与系统（新） CPS', link: '/Y3S1/CPS_N/CPS-README.md', activeMatch: '^/Y3S1/CPS_N/' },
      { text: '人工智能与机器学习 AIML', link: '/Y3S1/AIML/AIML-README.md', activeMatch: '^/Y3S1/AIML/' },
      { text: '数字信号处理 DSP', link: '/Y3S2/DSP/DSP-README.md', activeMatch: '^/Y3S2/DSP/' },
      { text: '电磁场与波 EMFT', link: '/Y3S2/EMFT/EMFT-README.md', activeMatch: '^/Y3S2/EMFT/' },
      { text: '通信电路设计 CCD', link: '/Y3S2/CCD/CCD-README.md', activeMatch: '^/Y3S2/CCD/' },
      { text: '工程项目管理与财务 EPM&F', link: '/Y3S2/EPMF/EPMF-README.md', activeMatch: '^/Y3S2/EPMF/' },
    ],
  },
  {
    text: '早期资料',
    activeMatch: '^/early/(EP|CAD)/',
    items: [
      { text: '嵌入式处理器 EP (DT5EDU)', link: 'https://mp.weixin.qq.com/s/Xqwg9KBZHkuYoXQAH-DfGw' },
      { text: '嵌入式处理器 EP (Cateds)', link: '/early/EP/', activeMatch: '^/early/EP/' },
      { text: '电路分析与设计 CAD (DT5EDU)', link: 'https://mp.weixin.qq.com/s/-_oFpk5asMRE_D6sqlMCsw' },
      { text: '电路分析与设计 CAD (Cateds)', link: '/early/CAD/', activeMatch: '^/early/CAD/' },
      { text: '微电子系统 MS (DT5EDU)', link: 'https://mp.weixin.qq.com/s/-9nZpf5RWmMm46bBMuBrLg' },
    ],
  },
  {
    text: '杂项',
    items: [
      { text: '更新日志', link: '/changelog' },
      { text: '金曲', link: '/others/songs/README.md', activeMatch: '^/others/songs/' },
      { text: '实验室', link: '/others/lab/README.md', activeMatch: '^/others/lab/' },
    ],
  },
] satisfies NavItem[]

export const docsSpaces = [
  {
    id: 'early-ep',
    base: '/early/EP/',
    title: '嵌入式处理器 EP',
    sidebar: [
      {
        text: '嵌入式处理器 EP',
        collapsed: false,
        items: [
          { text: '课程索引', link: '/early/EP/' },
          { text: 'Lec.1 介绍', link: '/early/EP/Lecture1' },
          { text: 'Lec.2 ARM 处理器与接口', link: '/early/EP/Lecture2' },
          { text: 'Lec.3 汇编语言与机器语言', link: '/early/EP/Lecture3' },
          { text: 'Lec.4 嵌入式系统开发周期', link: '/early/EP/Lecture4' },
          { text: 'Lec.5 测试与调试 I', link: '/early/EP/Lecture5' },
          { text: 'Lec.6 测试与调试 II', link: '/early/EP/Lecture6' },
          { text: 'Lec.7 模数转换器与中断', link: '/early/EP/Lecture7' },
          { text: 'Lec.7 Fix 工作原理', link: '/early/EP/Lecture7_Fix' },
          { text: 'Lec.8 数模转换器', link: '/early/EP/Lecture8' },
          { text: 'Lec.9 I2C', link: '/early/EP/Lecture9' },
          { text: 'Lec.10 SPI', link: '/early/EP/Lecture10' },
          { text: 'Lec.11 模块化编程', link: '/early/EP/Lecture11' },
          { text: 'Lec.12 低功耗嵌入式系统', link: '/early/EP/Lecture12' },
          {
            text: 'MS Review Notes',
            collapsed: false,
            items: [
              { text: 'Lec.9 串行通信与 UART', link: '/early/EP/MS_Review_Notes/B4P3' },
              { text: 'Lec.10 SPI', link: '/early/EP/MS_Review_Notes/B4P1' },
              { text: 'Lec.11 I2C', link: '/early/EP/MS_Review_Notes/B4P2' },
              { text: 'Lec.12 中断、计时器与任务', link: '/early/EP/MS_Review_Notes/B4P4' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'early-cad',
    base: '/early/CAD/',
    title: '电路分析与设计 CAD',
    sidebar: [
      {
        text: '电路分析与设计 CAD',
        collapsed: false,
        items: [
          { text: '课程索引', link: '/early/CAD/' },
          {
            text: 'Week 4',
            collapsed: false,
            items: [
              { text: 'Lec.2 电源与基本信号', link: '/early/CAD/Lecture2' },
            ],
          },
          {
            text: 'Week 8',
            collapsed: false,
            items: [
              { text: 'Lec.5 节点分析法与超节点', link: '/early/CAD/Lecture5' },
              { text: 'Lec.6 网孔分析法与超网孔', link: '/early/CAD/Lecture6' },
            ],
          },
          {
            text: 'Week 10',
            collapsed: false,
            items: [
              { text: 'Lec.7 叠加原理与电源变换', link: '/early/CAD/Lecture7' },
              { text: 'Lec.8 戴维南定理', link: '/early/CAD/Lecture8' },
              { text: 'Lec.9 诺顿定理与最大功率传输', link: '/early/CAD/Lecture9' },
            ],
          },
          {
            text: 'Week 12',
            collapsed: false,
            items: [
              { text: 'Lec.10 电容器', link: '/early/CAD/Lecture10' },
              { text: 'Lec.11 电感器', link: '/early/CAD/Lecture11' },
              { text: 'Lec.12 RC 电路', link: '/early/CAD/Lecture12' },
            ],
          },
          {
            text: 'Week 14',
            collapsed: false,
            items: [
              { text: 'Lec.13 RL 电路', link: '/early/CAD/Lecture13' },
              { text: 'Lec.14 RLC 电路', link: '/early/CAD/Lecture14' },
              { text: 'Lec.15 交流电路', link: '/early/CAD/Lecture15' },
            ],
          },
          {
            text: 'Week 16',
            collapsed: false,
            items: [
              { text: 'Lec.16 一阶滤波器', link: '/early/CAD/Lecture16' },
              { text: 'Lec.17 二阶滤波器', link: '/early/CAD/Lecture17' },
              { text: 'Lec.18 运算放大器', link: '/early/CAD/Lecture18' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'songs',
    base: '/others/songs/',
    title: '金曲',
    sidebar: [
      {
        text: '金曲',
        collapsed: false,
        items: [
          { text: '金曲首页', link: '/others/songs/README.md' },
          { text: 'ギターと孤独と蒼い惑星', link: '/others/songs/guitar-loneliness-blue-planet.md' },
          { text: 'ノンブレス・オブリージュ (Cover)', link: '/others/songs/non-breath-oblige.md' },
          { text: '自己肯定感爆上げ↑↑しゅきしゅきソング', link: '/others/songs/shuki.md' },
          { text: '逃亡', link: '/others/songs/toubou.md' },
          { text: 'ヒッチコック', link: '/others/songs/hitchcock.md' },
          { text: '夢が僕らの太陽さ', link: '/others/songs/yume-taiyou.md' },
          { text: 'String Theocracy', link: '/others/songs/string-theocracy.md' },
        ],
      },
    ],
  },
  {
    id: 'lab',
    base: '/others/lab/',
    title: '实验室',
    sidebar: [
      {
        text: '实验室',
        collapsed: false,
        items: [
          { text: '实验室首页', link: '/others/lab/README.md' },
          { text: '歌词容器', link: '/others/lab/lyric-container' },
          { text: 'LyricCover', link: '/others/lab/lyric-cover' },
          { text: 'SongCard', link: '/others/lab/song-card' },
          { text: 'MindMap', link: '/others/lab/mindmap' },
        ],
      },
    ],
  },
  {
    id: 'dsp',
    base: '/Y3S2/DSP/',
    title: '数字信号处理 DSP',
    sidebar: [
      {
        text: '数字信号处理 DSP 课程总览',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/Y3S2/DSP/DSP-README.md' },
          {
            text: 'Block 1: 离散时间信号与系统',
            collapsed: false,
            items: [
              { text: 'Ch 2: 时域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 2' },
              { text: 'Ch 3 I: 频域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 3 I' },
              { text: 'Ch 3 II: 频域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 3 II' },
              { text: 'Ch 4: 离散时间系统', link: '/Y3S2/DSP/DSP Chapter 4' },
            ],
          },
          {
            text: 'Block 2: 离散变换',
            collapsed: false,
            items: [
              { text: 'Ch 5: 离散傅里叶变换 DFT', link: '/Y3S2/DSP/DSP Chapter 5' },
              { text: 'Ch 6: Z 变换', link: '/Y3S2/DSP/DSP Chapter 6' },
              { text: 'Ch 7: 变换域中的离散 LTI 系统', link: '/Y3S2/DSP/DSP Chapter 7' },
              { text: 'Ch 11: 快速傅里叶变换 FFT', link: '/Y3S2/DSP/DSP Chapter 11' },
            ],
          },
          {
            text: 'Block 3: 数字滤波器设计',
            collapsed: false,
            items: [
              { text: 'Ch 8: 数字滤波器架构', link: '/Y3S2/DSP/DSP Chapter 8' },
              { text: 'Ch 9: IIR 数字滤波器设计', link: '/Y3S2/DSP/DSP Chapter 9' },
              { text: 'Ch 10: FIR 数字滤波器设计', link: '/Y3S2/DSP/DSP Chapter 10' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'epmf',
    base: '/Y3S2/EPMF/',
    title: '工程项目管理与财务 EPMF',
    sidebar: [
      {
        text: '工程项目管理与财务 EPMF 课程总览',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/Y3S2/EPMF/EPMF-README' },
          {
            text: 'Block 1 项目管理',
            collapsed: false,
            items: [
              { text: 'Lecture 1', link: '/Y3S2/EPMF/Block 1/Lecture 1' },
              { text: 'Lecture 2', link: '/Y3S2/EPMF/Block 1/Lecture 2' },
              { text: 'Lecture 3', link: '/Y3S2/EPMF/Block 1/Lecture 3' },
              { text: 'Lecture 4', link: '/Y3S2/EPMF/Block 1/Lecture 4' },
              { text: 'Block 1 例题 Examples', link: '/Y3S2/EPMF/Block 1/Block 1 Examples' },
              { text: '思维导图', link: '/Y3S2/EPMF/Block 1/Mindmap' },
            ],
          },
          {
            text: 'Block 2 面向制造的设计',
            collapsed: false,
            items: [
              { text: 'Lecture 5', link: '/Y3S2/EPMF/Block 2/Lecture 5' },
              { text: 'Lecture 6', link: '/Y3S2/EPMF/Block 2/Lecture 6' },
              { text: 'Lecture 7', link: '/Y3S2/EPMF/Block 2/Lecture 7' },
              { text: 'Lecture 8', link: '/Y3S2/EPMF/Block 2/Lecture 8' },
              { text: 'Block 2 例题 Examples', link: '/Y3S2/EPMF/Block 2/Block 2 Examples' },
              { text: '思维导图', link: '/Y3S2/EPMF/Block 2/Mindmap' },
            ],
          },
          {
            text: 'Block 3 工程经济学',
            collapsed: false,
            items: [
              { text: 'Lecture 9', link: '/Y3S2/EPMF/Block 3/Lecture 9' },
              { text: 'Lecture 10', link: '/Y3S2/EPMF/Block 3/Lecture 10' },
              { text: 'Lecture 11', link: '/Y3S2/EPMF/Block 3/Lecture 11' },
              { text: 'Lecture 12', link: '/Y3S2/EPMF/Block 3/Lecture 12' },
              { text: 'Lecture 13 I', link: '/Y3S2/EPMF/Block 3/Lecture 13 Part 1' },
              { text: 'Lecture 13 II', link: '/Y3S2/EPMF/Block 3/Lecture 13 Part 2' },
              { text: 'Lecture 13 II Ex.', link: '/Y3S2/EPMF/Block 3/Lecture 13-2 Extended Version' },
              { text: '思维导图', link: '/Y3S2/EPMF/Block 3/Mindmap' },
            ],
          },
          {
            text: 'Block 4 公司管理',
            collapsed: false,
            items: [
              { text: 'Lecture 14', link: '/Y3S2/EPMF/Block 4/Lecture 14' },
              { text: 'Lecture 15', link: '/Y3S2/EPMF/Block 4/Lecture 15' },
              { text: 'Lecture 16', link: '/Y3S2/EPMF/Block 4/Lecture 16' },
              { text: '思维导图', link: '/Y3S2/EPMF/Block 4/Mindmap' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'emft',
    base: '/Y3S2/EMFT/',
    title: '电磁场与波 EMFT',
    sidebar: [
      {
        text: '电磁场与波 EMFT 课程总览',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/Y3S2/EMFT/EMFT-README' },
          {
            text: 'Part I 电场',
            collapsed: false,
            items: [
              { text: 'Ch 2 矢量分析', link: '/Y3S2/EMFT/EMFT Chapter 2' },
              { text: 'Ch 3 I 静电场 (上)', link: '/Y3S2/EMFT/EMFT Chapter 3 P I' },
              { text: 'Ch 3 II 静电场 (下)', link: '/Y3S2/EMFT/EMFT Chapter 3 P II' },
              { text: 'Ch 4 静电场问题求解', link: '/Y3S2/EMFT/EMFT Chapter 4' },
              { text: 'Ch 5 恒定电流', link: '/Y3S2/EMFT/EMFT Chapter 5' },
            ],
          },
          {
            text: 'Part II 磁场与电磁波',
            collapsed: false,
            items: [
              { text: 'Ch 6 静磁场', link: '/Y3S2/EMFT/EMFT Chapter 6' },
              { text: 'Ch 7 时变场与 Maxwell 方程组', link: '/Y3S2/EMFT/EMFT Chapter 7' },
              { text: 'Ch 8 I 平面电磁波 (上)', link: '/Y3S2/EMFT/EMFT Chapter 8 P I' },
              { text: 'Ch 8 II 平面电磁波 (下)', link: '/Y3S2/EMFT/EMFT Chapter 8 P II' },
            ],
          },
          {
            text: 'Extra 复习',
            collapsed: false,
            items: [
              { text: 'Ex 1 公式复习', link: '/Y3S2/EMFT/EFMT Extra 1' },
              { text: 'Ex 2 概念复习', link: '/Y3S2/EMFT/EFMT Extra 2' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ccd',
    base: '/Y3S2/CCD/',
    title: '通信电路设计 CCD',
    sidebar: [
      {
        text: '通信电路设计 CCD 课程总览',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/Y3S2/CCD/CCD-README.md' },
          {
            text: 'Part 1 — 半导体器件',
            collapsed: false,
            items: [
              { text: 'Lec 1 导论', link: '/Y3S2/CCD/Part 1/CCD Lecture 1 Introduction' },
              { text: 'Lec 2 电子通信', link: '/Y3S2/CCD/Part 1/CCD Lecture 2 Electronic Communications' },
              { text: 'Lec 2b 半导体基础', link: '/Y3S2/CCD/Part 1/CCD Lecture 2b Semiconductors Basics' },
              { text: 'Lec 3-4 晶体管', link: '/Y3S2/CCD/Part 1/CCD Lecture 3-4 Transistors' },
              { text: 'Lec 5-6 放大器', link: '/Y3S2/CCD/Part 1/CCD Lecture 5-6 Amplifiers' },
            ],
          },
          {
            text: 'Part 2 — 通信电路基础',
            collapsed: false,
            items: [
              { text: 'Lec 7 混频器', link: '/Y3S2/CCD/Part 2/CCD Lecture 7 Mixers' },
              { text: 'Lec 8 LC 电路与匹配网络', link: '/Y3S2/CCD/Part 2/CCD Lecture 8 LC Circuits and Matching Networks' },
              { text: 'Lec 9 振荡器', link: '/Y3S2/CCD/Part 2/CCD Lecture 9 Oscillators' },
              { text: 'Lec 10 复习回顾', link: '/Y3S2/CCD/Part 2/CCD Lecture 10 Revision' },
            ],
          },
          {
            text: 'Part 3 — 调制与天线',
            collapsed: false,
            items: [
              { text: 'Lec 11-12 幅度调制', link: '/Y3S2/CCD/Part 3/CCD Lecture 11-12 Amplitude Modulation' },
              { text: 'Lec 13 单边带通信', link: '/Y3S2/CCD/Part 3/CCD Lecture 13 Single-Sideband Communication SSB' },
              { text: 'Lec 14 FM与PM', link: '/Y3S2/CCD/Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation' },
              { text: 'Lec 15 天线', link: '/Y3S2/CCD/Part 3/CCD Lecture 15 Antennas in a Circuit' },
            ],
          },
          {
            text: 'Part 4 — PLL 与数模转换',
            collapsed: false,
            items: [
              { text: 'Lec 16 锁相环', link: '/Y3S2/CCD/Part 4/CCD Lecture 16 Phase-Locked Loop PLL' },
              { text: 'Lec 18 数模转换', link: '/Y3S2/CCD/Part 4/CCD Lecture 18 Digital to Analog Conversion' },
              { text: 'Lec 19-20 模数转换与转换误差', link: '/Y3S2/CCD/Part 4/CCD Lecture 19-20 ADC and Converter Errors' },
            ],
          },
          {
            text: '复习 Review',
            collapsed: false,
            items: [
              { text: 'Rev 1 概念与模型', link: '/Y3S2/CCD/Review/Review 1' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cps-n',
    base: '/Y3S1/CPS_N/',
    title: '通信原理与系统（新） CPS',
    sidebar: [
      {
        text: '通信原理与系统（新） CPS 课程总览',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/Y3S1/CPS_N/CPS-README' },
          {
            text: 'Part 1 信号，系统与傅里叶',
            collapsed: false,
            items: [
              { text: 'Lec 1 课程简介', link: '/Y3S1/CPS_N/Part 1/CPS Lecture 1 Introduction' },
              { text: 'Lec 2 信号与系统回顾', link: '/Y3S1/CPS_N/Part 1/CPS Lecture 2 Review of Signals and Systems' },
              { text: 'Lec 3 LTI 系统与傅里叶变换', link: '/Y3S1/CPS_N/Part 1/CPS Lecture 3 LTI Systems and Fourier Transform' },
              { text: 'Lec 4 基带与通带信号', link: '/Y3S1/CPS_N/Part 1/CPS Lecture 4 Baseband and Passband Signals' },
            ],
          },
          {
            text: 'Part 2 模拟幅度调制',
            collapsed: false,
            items: [
              { text: 'Lec 6 DSB-SC 调幅', link: '/Y3S1/CPS_N/Part 2/CPS Lecture 6 DSB-SC Amplitude Modulation' },
              { text: 'Lec 7 常规调幅', link: '/Y3S1/CPS_N/Part 2/CPS Lecture 7 Conventional AM' },
              { text: 'Lec 8 单边带调制', link: '/Y3S1/CPS_N/Part 2/CPS Lecture 8 Single Sideband Modulation' },
              { text: 'Lec 9 残留边带调制', link: '/Y3S1/CPS_N/Part 2/CPS Lecture 9 Vestigial Sideband Modulation' },
            ],
          },
          {
            text: 'Part 3 模拟频率调制',
            collapsed: false,
            items: [
              { text: 'Lec 11 FM 与 PM', link: '/Y3S1/CPS_N/Part 3/CPS Lecture 11 FM and PM' },
              { text: 'Lec 12 FM 带宽分析', link: '/Y3S1/CPS_N/Part 3/CPS Lecture 12 FM Bandwidth Analysis' },
              { text: 'Lec 13 FM 解调', link: '/Y3S1/CPS_N/Part 3/CPS Lecture 13 FM Demodulation' },
              { text: 'Lec 14 FM 生成', link: '/Y3S1/CPS_N/Part 3/CPS Lecture 14 FM Generation' },
              { text: 'Lec 15 练习题', link: '/Y3S1/CPS_N/Part 3/CPS Lecture 15 Practice Problems' },
            ],
          },
          {
            text: 'Part 4 数字调制',
            collapsed: false,
            items: [
              { text: 'Lec 16-17 模数转换', link: '/Y3S1/CPS_N/Part 4/CPS Lecture 16-17 Analogue to Digital Conversion' },
              { text: 'Lec 18 数字调制', link: '/Y3S1/CPS_N/Part 4/CPS Lecture 18 Digital Modulation' },
              { text: 'Lec 19 数字调制中的噪声', link: '/Y3S1/CPS_N/Part 4/CPS Lecture 19 Noise in Digital Modulation' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'aiml',
    base: '/Y3S1/AIML/',
    title: '人工智能与机器学习 AIML',
    sidebar: [
      {
        text: '人工智能与机器学习 AIML',
        collapsed: false,
        items: [
          { text: '课程总览', link: '/Y3S1/AIML/AIML-README' },
          {
            text: '进化计算 Evolutionary Computation',
            collapsed: false,
            items: [
              { text: 'Lec 1 优化 Optimization', link: '/Y3S1/AIML/EC Lecture 1' },
              { text: 'Lec 2 遗传算法 GA', link: '/Y3S1/AIML/EC Lecture 2' },
              { text: 'Lec 3 受约束优化', link: '/Y3S1/AIML/EC Lecture 3' },
              { text: 'Lec 4 组合优化 CO', link: '/Y3S1/AIML/EC Lecture 4' },
            ],
          },
          {
            text: '机器学习 Machine Learning',
            collapsed: false,
            items: [
              { text: 'Lec 2 机器学习基础', link: '/Y3S1/AIML/ML Lecture 2' },
              { text: 'Lec 3 I 模型训练基础', link: '/Y3S1/AIML/ML Lecture 3 Part I' },
              { text: 'Lec 3 II 数据准备', link: '/Y3S1/AIML/ML Lecture 3 Part II' },
              { text: 'Lec 4 I 特征选择', link: '/Y3S1/AIML/ML Lecture 4 Part I' },
              { text: 'Lec 4 II 降维', link: '/Y3S1/AIML/ML Lecture 4 Part II' },
              { text: 'Lec 5 支持向量机 SVM', link: '/Y3S1/AIML/ML Lecture 5' },
              { text: 'Lec 6 神经网络 ANN', link: '/Y3S1/AIML/ML Lecture 6' },
            ],
          },
        ],
      },
    ],
  },
] satisfies DocsSpace[]
