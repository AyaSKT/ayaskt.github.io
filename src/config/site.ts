export interface SiteConfig {
  title: string
  description: string
  lang: string
  base: string
  author: string
  github: string
}

export const siteConfig = {
  title: 'Ayaskt 工作站 | 祝你幸福',
  description: '个人博客 / 资源汇总',
  lang: 'zh',
  base: '/',
  author: 'Ayaskt',
  github: 'https://github.com/ayaskt',
} satisfies SiteConfig
