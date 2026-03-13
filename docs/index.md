---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:

  name: "Ayaskt 工作站\nAya's Sky City"
  text: "课堂笔记 / 资源汇总"


  tagline: 今天或许是个不错的日子。



  actions:

    - theme: brand
      text: 课外学习笔记目录
      link: /Guides/Outclass
    
    - theme: brand
      text: Y3S2 数字信号处理 DSP
      link: /Y3S2/DSP/DSP-README.md
  
    - theme: alt
      text: Y3S1 通信原理与系统 CPS
      link: /Y3S1/CPS/CPS-README.md

    - theme: alt
      text: Y3S1 人工智能与机器学习 AI&ML
      link: /Y3S1/AIML/AIML-README.md




---

<head>
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?">
</head>

<script setup>
import { ref, onMounted } from 'vue'
const hitokotoText = ref(':D 你今天过得如何？')
onMounted(async () => {
  try {
    const res = await fetch('https://v1.hitokoto.cn')
    const data = await res.json()
    hitokotoText.value = data.hitokoto
  } catch (e) {
    console.error(e)
    hitokotoText.value = '加载失败，请稍后重试。'
  }
})
</script>

<p
  id="hitokoto"
  style="
    margin-top: 13rem;
    text-align: center;
    font-size: 1.05rem;
    opacity: 0.9;
  "
>
  {{ hitokotoText }}
</p>