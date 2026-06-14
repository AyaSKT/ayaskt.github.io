export const nav = [
      { text: '主页', link: '/index' },

      { text: '第四学年', items: [] },

      {
        text: '第三学年',
        activeMatch: '^/(Y3S1/(CPS|AIML)|Y3S2/(DSP|EMFT|CCD|EPMF))/',
        items: [
          { text: '通信原理与系统 CPS', link: '/Y3S1/CPS/CPS-README.md', activeMatch: '^/Y3S1/CPS/' },
          { text: '人工智能与机器学习 AIML', link: '/Y3S1/AIML/AIML-README.md', activeMatch: '^/Y3S1/AIML/' },
          { text: '数字信号处理 DSP', link: '/Y3S2/DSP/DSP-README.md', activeMatch: '^/Y3S2/DSP/' },
          { text: '电磁场与波 EMFT', link: '/Y3S2/EMFT/EMFT-README.md', activeMatch: '^/Y3S2/EMFT/' },
          { text: '通信电路设计 CCD', link: '/Y3S2/CCD/CCD-README.md', activeMatch: '^/Y3S2/CCD/' },
          { text: '工程项目管理与财务 EPM&F', link: '/Y3S2/EPMF/EPMF-README.md', activeMatch: '^/Y3S2/EPMF/' },
        ]
      },

      { text: '早期资料', items: [
        { text: '嵌入式处理器 EP (DT5EDU)', link: 'https://mp.weixin.qq.com/s/Xqwg9KBZHkuYoXQAH-DfGw' },
        { text: '电路分析与设计 CAD (DT5EDU)', link: 'https://mp.weixin.qq.com/s/-_oFpk5asMRE_D6sqlMCsw' },
        { text: '微电子系统 MS (DT5EDU)', link: 'https://mp.weixin.qq.com/s/-9nZpf5RWmMm46bBMuBrLg' },

       ]
      },

      { text: '杂项', items: [
        { text: '更新日志', link: '/changelog' },
        { text: '金曲', link: '/others/songs/README.md', activeMatch: '^/others/songs/' },
        { text: '实验室', link: '/others/lab/README.md', activeMatch: '^/others/lab/' },

       ]
      },
    ]

export const sidebar = {
      '/others/songs/': [
        {
          text: '金曲',
          collapsed: false,
          items: [
            { text: '金曲首页', link: '/others/songs/README.md' },
            { text: '自己肯定感爆上げ↑↑しゅきしゅきソング', link: '/others/songs/shuki.md' },
            { text: 'ヒッチコック', link: '/others/songs/hitchcock.md' },
            { text: '夢が僕らの太陽さ', link: '/others/songs/yume-taiyou.md' },
            { text: 'String Theocracy', link: '/others/songs/string-theocracy.md' },
          ],
        },
      ],

      '/others/lab/': [
        {
          text: '实验室',
          collapsed: false,
          items: [
            { text: '实验室首页', link: '/others/lab/README.md' },
            { text: '歌词容器', link: '/others/lab/lyric-container' },
            { text: 'SongCard', link: '/others/lab/song-card' },
            { text: 'MindMap', link: '/others/lab/mindmap' },
          ],
        },
      ],

      // 数字信号处理：当路径在 /Y3S2/DSP/ 下时显示
      '/Y3S2/DSP/': [
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
            {
              text: 'Block 4: DSP 算法实现',
              collapsed: false,
              items: [
                { text: 'Ch 11: DSP 算法实现 FFT', link: '/Y3S2/DSP/DSP Chapter 11' },
              ],
            },
          ],
        },
      ],


      // 工程项目管理与财务 EPMF：当路径在 /Y3S2/EPMF/ 下时显示
      '/Y3S2/EPMF/': [
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


      // 电磁场与波 EMFT：当路径在 /Y3S2/EMFT/ 下时显示
      '/Y3S2/EMFT/': [
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
          ]
        }
      ],

      // 通信电路设计 CCD：当路径在 /Y3S2/CCD/ 下时显示
      '/Y3S2/CCD/': [
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
          ],
        },
      ],

      // 通信原理与系统 CPS：当路径在 /Y3S1/CPS/ 下时显示
      '/Y3S1/CPS/': [
        {
          text: '通信原理与系统 CPS 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S1/CPS/CPS-README' },
            { text: 'Lec 6 抑制载波双边带调幅 DSB-SC', link: '/Y3S1/CPS/CPS Lecture 6 Amplitude Modulation DSB-SC' },
            { text: 'Lec 7 常规调幅 DSB-WC', link: '/Y3S1/CPS/CPS Lecture 7 Amplitude Modulation DSB-WC' },
            { text: 'Lec 8 单边带调幅 SSB', link: '/Y3S1/CPS/CPS Lecture 8 Amplitude Modulation SSB' },
            { text: 'Lec 9 残留边带调幅 VSB', link: '/Y3S1/CPS/CPS Lecture 9 Amplitude Modulation VSB' },
            { text: 'Lec 11 角度调制 FM 与 PM', link: '/Y3S1/CPS/CPS Lecture 11 FM and PM' },
            { text: 'Lec 12 FM 带宽分析', link: '/Y3S1/CPS/CPS Lecture 12 FM Bandwidth Analysis' },
            { text: 'Lec 13 FM 解调', link: '/Y3S1/CPS/CPS Lecture 13 FM Demodulation' },
            { text: 'Lec 14 FM 生成', link: '/Y3S1/CPS/CPS Lecture 14 FM Generation' },
            { text: 'Lec 16 & 17 模数转换', link: '/Y3S1/CPS/CPS Lecture 16 & 17 Analog to Digital Conversion' },
            { text: 'Lec 18 AWGN 信道中的数字调制', link: '/Y3S1/CPS/CPS Lecture 18 Digital Modulation in AWGN Channel' },
            { text: 'Lec 19 数字调制中的噪声', link: '/Y3S1/CPS/CPS Lecture 19 Noise in Digital Modulation' }
          ]
        }
      ],

      // 人工智能与机器学习 AIML：当路径在 /Y3S1/AIML/ 下时显示
      '/Y3S1/AIML/': [
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
    }
