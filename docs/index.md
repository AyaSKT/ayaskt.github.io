---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:

  name: "Ayaskt 工作站\nAya's Sky City"
  text: "课堂笔记 / 资源汇总"


  tagline: 今天或许是个不错的日子。



  actions:

    - theme: brand
      text: 非课内学习笔记目录
      link: /Guides/Outclass
    
    - theme: brand
      text: 第三学年笔记目录
      link: /Guides/Y3

    - theme: alt
      text: 第二学年笔记目录
      link: /Guides/Y2

    - theme: alt
      text: 第一学年笔记目录
      link: /Guides/Y2

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit


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
    hitokotoText.value = '加载失败，请稍后重试。'
  }
})
</script>

<p
  id="hitokoto"
  style="
    position: fixed;
    left: 0;
    right: 0;
    bottom: 10rem;   /* 距离底部（footer 上方一点） */
    text-align: center;
    font-size: 1.05rem;
    pointer-events: none;
  "
>
  {{ hitokotoText }}
</p>