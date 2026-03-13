import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'








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
  head: [['link', { rel: 'icon', href: '/Index-assets/logos/favicon.ico' }]],
  lastUpdated: true,

  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: 'https://github.com/ayaskt.png?size=40',

    siteTitle: 'Ayaskt 工作站 site',
    

    nav: [
      { text: '主页', link: '/index' },
      { text: '第三学年', items: [
        { text: '通信原理与系统 CPS', link: '/Y3S1/CPS/CPS-README.md' },
        { text: '人工智能与机器学习 AIML', link: '/Y3S1/AIML/AIML-README.md' },
        { text: '信息论 IT', link: '/item-3' },
        { text: '数字信号处理 DSP', link: '/Y3S2/DSP/DSP-README.md' }
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
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Ayaskt'
    },



    

    sidebar: {
      // 数字信号处理：当路径在 /Y3S2/DSP/ 下时显示
      '/Y3S2/DSP/': [
        {
          text: '数字信号处理 课程总览',
          collapsed: false,
          items: [
            { text: 'DSP Introduction', link: '/Y3S2/DSP/DSP-README.md' },
            { text: 'DSP Chapter 2', link: '/Y3S2/DSP/DSP Chapter 2' },
            { text: 'DSP Chapter 3 Part I', link: '/Y3S2/DSP/DSP Chapter 3 I' },
            { text: 'DSP Chapter 3 Part II', link: '/Y3S2/DSP/DSP Chapter 3 II' },
            { text: 'DSP Chapter 4', link: '/Y3S2/DSP/DSP Chapter 4' },
            { text: 'DSP Chapter 5', link: '/Y3S2/DSP/DSP Chapter 5' },
            { text: 'DSP Chapter 6', link: '/Y3S2/DSP/DSP Chapter 6' },
            { text: 'DSP Chapter 7', link: '/Y3S2/DSP/DSP Chapter 7' },
            { text: 'DSP Chapter 8', link: '/Y3S2/DSP/DSP Chapter 8' },
            { text: 'DSP Chapter 9', link: '/Y3S2/DSP/DSP Chapter 9' },
            { text: 'DSP Chapter 10', link: '/Y3S2/DSP/DSP Chapter 10' }
          ]
        }
      ],

      // 通信原理与系统 CPS：当路径在 /Y3S1/CPS/ 下时显示
      '/Y3S1/CPS/': [
        {
          text: '通信原理与系统 课程总览',
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
