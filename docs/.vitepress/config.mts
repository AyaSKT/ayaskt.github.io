import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// 使用 MathJax 4 渲染数学公式（@mdit/plugin-mathjax 依赖 @mathjax/src@4）
import { mathjax, createMathjaxInstance } from '@mdit/plugin-mathjax'

// 插件默认 TeX 包列表去掉 bboldx，避免 "Invalid variant: -bboldx"（newcm 字体无此变体）
const TEX_PACKAGES_WITHOUT_BBOLDX = [
  'action', 'ams', 'amscd', 'bbm', 'bbox', 'begingroup', 'boldsymbol', 'braket', 'bussproofs',
  'cancel', 'cases', 'centernot', 'color', 'colortbl', 'colorv2', 'configmacros', 'dsfont', 'empheq',
  'enclose', 'extpfeil', 'gensymb', 'html', 'mathtools', 'mhchem', 'newcommand', 'noerrors', 'noundefined',
  'physics', 'setoptions', 'tagformat', 'texhtml', 'textcomp', 'textmacros', 'unicode', 'units', 'upgreek', 'verb'
] as const

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uestcIcon = fs.readFileSync(
  path.resolve(__dirname, '../Index-assets/logos/UESTC.svg'),
  'utf-8'
)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  

  title: "Ayaskt 工作站 | 祝你幸福",
  description: "个人博客 / 资源汇总",
  lang: 'zh',
  head: [
    ['link',{ rel: 'icon', href: '/favicon.ico'}],
  ],
  lastUpdated: true,

  markdown: {
    math: false,
    config: async (md) => {
      // MathJax 4：服务端 SVG 输出，$...$ 与 $$...$$ 分隔符。排除 bboldx 避免 "Invalid variant: -bboldx"。
      // 用 transformer 包裹 v-pre，防止 Vue  hydration 时把公式再处理一次导致重复显示。
      const mathjaxInstance = await createMathjaxInstance({
        output: 'svg',
        delimiters: 'dollars',
        a11y: false, // 关闭辅助输出，避免与主 SVG 同时显示导致公式“重影”
        tex: { packages: ['base', ...TEX_PACKAGES_WITHOUT_BBOLDX] as unknown as import('@mdit/plugin-mathjax').TexPackage[] },
        transformer: (html, displayMode) =>
          displayMode
            ? `<span class="mathjax-block" v-pre>${html}</span>`
            : `<span v-pre>${html}</span>`
      })
      if (mathjaxInstance) {
        await mathjaxInstance.outputStyle()
        md.use(mathjax, mathjaxInstance)
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: 'https://github.com/ayaskt.png?size=40',

    siteTitle: 'Ayaskt Workspace',
    

    nav: [
      { text: '主页', link: '/index' },
      
      { text: '第三学年', items: [
        { text: '通信原理与系统 CPS', link: '/Y3S1/CPS/CPS-README.md' },
        { text: '人工智能与机器学习 AIML', link: '/Y3S1/AIML/AIML-README.md' },
        { text: '信息论 IT', link: '/item-3' },
        { text: '数字信号处理 DSP', link: '/Y3S2/DSP/DSP-README.md' },
        { text: '电磁场与波 EMFT', link: '/Y3S2/EMFT/EMFT-README.md' },
        { text: '通信电路设计 CCD', link: '/Y3S2/CCD/CCD-README.md' },
        { text: '工程项目管理与财务 EPM&F', link: '/Y3S2/EPMF/EPMF-README.md' },
       ] 
      },

      { text: '第二学年', items: [
        { text: '敬请期待...', link: '' },
       ] 
      },

      { text: '第一学年', items: [
        { text: '敬请期待...', link: '' },
       ] 
      },
    ],


    footer: {
      message: 'Released under the MIT License.\nBuilt with VitePress.',
      copyright: 'Copyright © 2025-present Ayaskt'
    },



    

    sidebar: {
      // 数字信号处理：当路径在 /Y3S2/DSP/ 下时显示
      '/Y3S2/DSP/': [
        {
          text: '数字信号处理 DSP 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/DSP/DSP-README.md' },
            {
              text: 'Part I 离散时间信号与系统',
              collapsed: false,
              items: [
                { text: 'Ch 2: 时域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 2' },
                { text: 'Ch 3 I: 频域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 3 I' },
                { text: 'Ch 3 II: 频域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 3 II' },
                { text: 'Ch 4: 离散时间系统', link: '/Y3S2/DSP/DSP Chapter 4' },
              ],
            },
            {
              text: 'Part II 离散变换',
              collapsed: false,
              items: [
                { text: 'Ch 5: 离散傅里叶变换 DFT', link: '/Y3S2/DSP/DSP Chapter 5' },
                { text: 'Ch 6: Z 变换', link: '/Y3S2/DSP/DSP Chapter 6' },
                { text: 'Ch 7: 变换域中的离散 LTI 系统', link: '/Y3S2/DSP/DSP Chapter 7' },
              ],
            },
            {
              text: 'Part III 数字滤波器设计',
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


      // 电磁场与波 EMFT：当路径在 /Y3S2/EMFT/ 下时显示
      '/Y3S2/EMFT/': [
        {
          text: '电磁场与波 EMFT 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/EMFT/EMFT-README' },
            { text: 'Ch 2 矢量分析', link: '/Y3S2/EMFT/EMFT Chapter 2' },
            { text: 'Ch 3 静电场', link: '/Y3S2/EMFT/EMFT Chapter 3' },
            { text: 'Ch 4 静电场问题求解', link: '/Y3S2/EMFT/EMFT Chapter 4' },
            { text: 'Ch 5 恒定电流', link: '/Y3S2/EMFT/EMFT Chapter 5' },
            { text: 'Ch 6 静磁场', link: '/Y3S2/EMFT/EMFT Chapter 6' },
            { text: 'Ch 7 时变场与 Maxwell 方程组', link: '/Y3S2/EMFT/EMFT Chapter 7' },
            { text: 'Ch 8 平面电磁波', link: '/Y3S2/EMFT/EMFT Chapter 8' },
            { text: 'Ch 9 传输线', link: '/Y3S2/EMFT/EMFT Chapter 9' },
            { text: 'Ch 10 波导与谐振腔', link: '/Y3S2/EMFT/EMFT Chapter 10' }
          ]
        }
      ],

      // 通信原理与系统 CPS：当路径在 /Y3S1/CPS/ 下时显示
      '/Y3S1/CPS/': [
        {
          text: '通信原理与系统 CPS 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S1/CPS/CPS-README' },
            { text: 'Lecture 6 Amplitude Modulation DSB-SC', link: '/Y3S1/CPS/CPS Lecture 6 Amplitude Modulation DSB-SC' },
            { text: 'Lecture 7 Amplitude Modulation DSB-WC', link: '/Y3S1/CPS/CPS Lecture 7 Amplitude Modulation DSB-WC' },
            { text: 'Lecture 8 Amplitude Modulation SSB', link: '/Y3S1/CPS/CPS Lecture 8 Amplitude Modulation SSB' },
            { text: 'Lecture 9 Amplitude Modulation VSB', link: '/Y3S1/CPS/CPS Lecture 9 Amplitude Modulation VSB' },
            { text: 'Lecture 11 FM and PM', link: '/Y3S1/CPS/CPS Lecture 11 FM and PM' },
            { text: 'Lecture 12 FM Bandwidth Analysis', link: '/Y3S1/CPS/CPS Lecture 12 FM Bandwidth Analysis' },
            { text: 'Lecture 13 FM Demodulation', link: '/Y3S1/CPS/CPS Lecture 13 FM Demodulation' },
            { text: 'Lecture 14 FM Generation', link: '/Y3S1/CPS/CPS Lecture 14 FM Generation' },
            { text: 'Lecture 16 & 17 Analog to Digital Conversion', link: '/Y3S1/CPS/CPS Lecture 16 & 17 Analog to Digital Conversion' },
            { text: 'Lecture 18 Digital Modulation in AWGN Channel', link: '/Y3S1/CPS/CPS Lecture 18 Digital Modulation in AWGN Channel' },
            { text: 'Lecture 19 Noise in Digital Modulation', link: '/Y3S1/CPS/CPS Lecture 19 Noise in Digital Modulation' }
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
            { text: 'EC Lecture 1', link: '/Y3S1/AIML/EC Lecture 1' },
            { text: 'EC Lecture 2', link: '/Y3S1/AIML/EC Lecture 2' },
            { text: 'EC Lecture 3', link: '/Y3S1/AIML/EC Lecture 3' },
            { text: 'EC Lecture 4', link: '/Y3S1/AIML/EC Lecture 4' },
            { text: 'ML Lecture 2', link: '/Y3S1/AIML/ML Lecture 2' },
            { text: 'ML Lecture 3 Part I', link: '/Y3S1/AIML/ML Lecture 3 Part I' },
            { text: 'ML Lecture 3 Part II', link: '/Y3S1/AIML/ML Lecture 3 Part II' },
            { text: 'ML Lecture 4 Part I', link: '/Y3S1/AIML/ML Lecture 4 Part I' },
            { text: 'ML Lecture 4 Part II', link: '/Y3S1/AIML/ML Lecture 4 Part II' },
            { text: 'ML Lecture 5', link: '/Y3S1/AIML/ML Lecture 5' },
            { text: 'ML Lecture 6', link: '/Y3S1/AIML/ML Lecture 6' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: 'Contents',
    },
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayaskt' },
      {
        icon: { svg: uestcIcon },
        link: 'https://www.uestc.edu.cn/'
      }
    ],

    search: {
      provider: 'local'
    }
  },
 

  

})
