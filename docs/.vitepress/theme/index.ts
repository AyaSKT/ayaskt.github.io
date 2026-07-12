import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
// animate.css 子集（仅含主题实际用到的动画），由 scripts/generate-motion-css-subsets.mjs 生成
import './vendor/animate/animate-subset.min.css'
import './style/index.css'
import './custom.css'
// 自定义令牌覆盖入口，最后导入以获得最高优先级（见 CUSTOMIZATION.md）
import './custom/tokens.css'
import { setupSolutionCollapse } from './solution-collapse'
import { customComponents } from './custom/components'
import { customEnhanceApp } from './custom/enhance'
import { defineAsyncComponent } from 'vue'

import MouseClick from './components/MouseClick.vue'

import BackToTop from './components/backtotop.vue'
import PageTransition from './components/PageTransition.vue'
import DocMeta from './components/DocMeta.vue'
import CourseIndex from './components/CourseIndex.vue'
import LyricCard from './components/LyricCard.vue'
import LyricLine from './components/LyricLine.vue'
import LyricCover from './components/LyricCover.vue'
import SongCard from './components/SongCard.vue'
import { setupLinkWarmup } from './link-warmup'

const MindMapLoader = defineAsyncComponent({
  loader: () => import('./components/MindMap.vue'),
  loadingComponent: {
    template: '<div class="mind-map-placeholder" aria-hidden="true"></div>',
  },
})

export default {
  


  
  enhanceApp(ctx) {
    const { app, router } = ctx
    // Solution 折叠功能
    setupSolutionCollapse(router)
    setupLinkWarmup(router)

    app.component('Confetti' , defineAsyncComponent(() => import('./components/confetti.vue')))
    app.component('MouseClick' , MouseClick)
    app.component('BackToTop', BackToTop)
    app.component('PageTransition', PageTransition)
    app.component('DocMeta', DocMeta)
    app.component('CourseIndex', CourseIndex)
    app.component('LyricCard', LyricCard)
    app.component('LyricLine', LyricLine)
    app.component('LyricCover', LyricCover)
    app.component('SongCard', SongCard)
    app.component('MindMap', MindMapLoader)

    // 用户自定义接口（见 CUSTOMIZATION.md）：全局组件 + enhanceApp 钩子
    for (const [name, component] of Object.entries(customComponents)) {
      app.component(name, component)
    }
    customEnhanceApp(ctx)
  },

  extends: DefaultTheme,
  Layout: Layout,
  // ...DefaultTheme, //或者这样写也可
}
