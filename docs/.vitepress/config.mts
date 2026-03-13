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
        { text: '人工智能与机器学习 AIML', link: '/item-2' },
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






    sidebar: [
      {
        text: '当前目录',
        items: [
          // 显示的是 `/guide/index.md` 页面
          { text: 'Introduction', link: '/guide/' }
        ]
      }
    ],

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
