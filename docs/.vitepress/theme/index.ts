import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import './style/index.css'

import MouseClick from './components/MouseClick.vue'

import Mycomponent from './components/Linkcard.vue'
import Confetti from './components/confetti.vue'
let homePageStyle: HTMLStyleElement | undefined

import update from "./components/update.vue"

import MyLayout from './components/MyLayout.vue'
import BackToTop from './components/backtotop.vue'

export default {
  


  
  enhanceApp({app , router }) {
    // 彩虹背景动画样式


    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

    app.component('Mycomponent' , Mycomponent)
    app.component('Confetti' , Confetti)
    app.component('MouseClick' , MouseClick)
    app.component('update' , update)
    app.component('BackToTop', BackToTop)
  },

  extends: DefaultTheme,
  Layout: Layout,
  // ...DefaultTheme, //或者这样写也可
}


function updateHomePageStyle(value: boolean) {
    if (value) {
      if (homePageStyle) return
  
      homePageStyle = document.createElement('style')
      homePageStyle.innerHTML = `
      :root {
        animation: rainbow 12s linear infinite;
      }`
      document.body.appendChild(homePageStyle)
    } else {
      if (!homePageStyle) return
  
      homePageStyle.remove()
      homePageStyle = undefined
    }
  }