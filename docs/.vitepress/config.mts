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
  title: "Ayaskt 工作站",
  description: "Personal blogs",
  lang: 'zh',


  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: 'https://github.com/ayaskt.png?size=40',

    siteTitle: 'Ayaskt 工作站',

    nav: [
      { text: '主页', link: '/index' },
      { text: '第三学年', items: [
        { text: '通信原理与系统 CPS', link: '/item-1' },
        { text: '人工智能与机器学习 AIML', link: '/item-2' },
        { text: '信息论 IT', link: '/item-3' },
        { text: '数字信号处理 DSP', link: '/Y3S2/DSP/DSP Chapter 2' }
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
      '/Guides/Y3': [
        {
          text: '第三学年目录',
          items: [
            { text: '数字信号处理', link: '/Guides/Y3-DSP' },
            { text: '通信原理与系统', link: '/Guides/Y3-Comm' },
            { text: '人工智能与机器学习', link: '/Guides/Y3-AI-ML' },
            { text: '信息论', link: '/Guides/Y3-InfoTheory' }
          ]
        }
      ],
      '/Guides/Y3-DSP': [
        {
          text: '数字信号处理',
          items: [
            { text: '采样与重构', link: '/Guides/Y3-DSP#第-1-章-采样与重构todo' },
            { text: '离散时间信号与系统', link: '/Guides/Y3-DSP#第-2-章-离散时间信号与系统todo' },
            { text: 'Z 变换与频域分析', link: '/Guides/Y3-DSP#第-3-章-z-变换与频域分析todo' }
          ]
        }
      ],
      '/Guides/Y3-Comm': [
        {
          text: '通信原理与系统',
          items: [
            { text: '信号与系统基础', link: '/Guides/Y3-Comm#第-1-章-信号与系统基础todo' },
            { text: '调制与解调', link: '/Guides/Y3-Comm#第-2-章-调制与解调todo' },
            { text: '噪声与信道', link: '/Guides/Y3-Comm#第-3-章-噪声与信道todo' }
          ]
        }
      ],
      '/Guides/Y3-AI-ML': [
        {
          text: '人工智能与机器学习',
          items: [
            { text: '机器学习基础', link: '/Guides/Y3-AI-ML#第-1-章-机器学习基础todo' },
            { text: '监督学习', link: '/Guides/Y3-AI-ML#第-2-章-监督学习todo' },
            { text: '无监督学习与表示学习', link: '/Guides/Y3-AI-ML#第-3-章-无监督学习与表示学习todo' }
          ]
        }
      ],
      '/Guides/Y3-InfoTheory': [
        {
          text: '信息论',
          items: [
            { text: '信息与熵', link: '/Guides/Y3-InfoTheory#第-1-章-信息与熵todo' },
            { text: '信道与容量', link: '/Guides/Y3-InfoTheory#第-2-章-信道与容量todo' },
            { text: '编码与压缩', link: '/Guides/Y3-InfoTheory#第-3-章-编码与压缩todo' }
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
