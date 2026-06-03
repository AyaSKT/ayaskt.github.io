import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import 'animate.css'
import './style/index.css'
import './custom.css'
import { setupSolutionCollapse } from './solution-collapse'

import MouseClick from './components/MouseClick.vue'

import Mycomponent from './components/Linkcard.vue'
import Confetti from './components/confetti.vue'

import update from "./components/update.vue"

import MyLayout from './components/MyLayout.vue'
import BackToTop from './components/backtotop.vue'
import PageTransition from './components/PageTransition.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import DocMeta from './components/DocMeta.vue'

export default {
  


  
  enhanceApp({app , router }) {
    // Solution 折叠功能
    setupSolutionCollapse(router)

    app.component('Mycomponent' , Mycomponent)
    app.component('Confetti' , Confetti)
    app.component('MouseClick' , MouseClick)
    app.component('update' , update)
    app.component('BackToTop', BackToTop)
    app.component('PageTransition', PageTransition)
    app.component('ScrollReveal', ScrollReveal)
    app.component('DocMeta', DocMeta)
  },

  extends: DefaultTheme,
  Layout: Layout,
  // ...DefaultTheme, //或者这样写也可
}
