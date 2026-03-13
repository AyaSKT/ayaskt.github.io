---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:

  name: "Ayaskt 工作站\nAya's Sky City"
  text: "课堂笔记 / 资源汇总"


  tagline: 今天或许是个不错的日子。

  image:
    src: ./2.jpg # 你的图片路径，放在 docs 下
    width: 240
    height: 240
    # 加不加都行：圆形 + 阴影效果
    style:
      borderRadius: 50%
      boxShadow: 0 10px 40px rgba(0,0,0,0.25)
      object-fit: cover;
      marginLeft: 40px;

  actions:

    - theme: brand
      text: 课外学习笔记目录
      link: /Guides/Outclass
    
    - theme: brand
      text: Y3S2 电磁场与波 EFMT
      link: 

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
    hitokotoText.value = ':D 你今天过得如何？'
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