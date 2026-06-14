import { defineConfig } from 'vitepress'
import { isDevCommand } from './config/env.mts'
import { configureMarkdown } from './config/markdown/index.mts'
import { transformPageData } from './config/page-data.mts'
import { createThemeConfig } from './config/theme.mts'
import { viteConfig } from './config/vite.mts'

export {
  formatDocMeta,
  getReadableWordCount,
  renderMindMapFence,
  transformLyricCardAlbumCoverAttrs,
  transformSongCardCoverAttrs,
} from './config/markdown.mts'
export { renderSearchHtml } from './config/search.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Ayaskt 工作站 | 祝你幸福',
  description: '个人博客 / 资源汇总',
  lang: 'zh',
  srcExclude: [
    'superpowers/**/*.md',
  ],
  buildConcurrency: 4,
  transformPageData,
  vite: viteConfig,
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico?' }],
  ],
  lastUpdated: true,
  markdown: {
    math: false,
    config: configureMarkdown,
  },
  themeConfig: createThemeConfig(isDevCommand),
})
