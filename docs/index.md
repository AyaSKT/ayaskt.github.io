---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:

  name: "Ayaskt 工作站\nAya's Sky City"
  text: "课堂笔记 / 资源汇总"


  tagline: 你战胜了自己，你爱通信工程。

  image:
    src: /IMG_0478.jpg # 你的图片路径，放在 docs 下
    width: 240
    height: 240
    # 加不加都行：圆形 + 阴影效果
    style:
      borderRadius: 50%
      boxShadow: 0 10px 40px rgba(0,0,0,0.25)
      object-fit: cover;



  actions:

    # - theme: brand
    #   text: 课外学习笔记目录
    #   link: /Guides/Outclass
    
    - theme: brand
      text: Y3S2 电磁场与波 EFMT
      link: /Y3S2/EMFT/EMFT-README.md

    - theme: brand
      text: Y3S2 数字信号处理 DSP
      link: /Y3S2/DSP/DSP-README.md

    - theme: brand
      text: Y3S2 通信电路设计 CCD
      link: /Y3S2/CCD/CCD-README.md

    - theme: brand
      text: Y3S2 工程项目管理与财务 EPM&F
      link: 
  
    - theme: alt
      text: Y3S1 通信原理与系统 CPS
      link: /Y3S1/CPS/CPS-README.md

    - theme: alt
      text: Y3S1 人工智能与机器学习 AI&ML
      link: /Y3S1/AIML/AIML-README.md


    - theme: alt
      text: Y2S2 嵌入式处理器 EP (DT5EDU)
      link: https://mp.weixin.qq.com/s/Xqwg9KBZHkuYoXQAH-DfGw

    - theme: alt
      text: Y2S1 电路分析与设计 CAD (DT5EDU)
      link: https://mp.weixin.qq.com/s/-_oFpk5asMRE_D6sqlMCsw

    - theme: alt
      text: Y1S2 微电子系统 MS (DT5EDU)
      link: https://mp.weixin.qq.com/s/-9nZpf5RWmMm46bBMuBrLg


features:

- icon: 
    dark: /uog.png
    light: /uog.png
  title: Glasgow College, UESTC
  details: "毋庸置疑，世界上最伟大的学院。\n在格院，你只需要学会享受生活。"
  link: https://www.gla.uestc.edu.cn/
  linkText: Click to get CW(s)

- icon: 
    dark: /3.PNG
    light: /3.PNG
  title: Neuro Sama
  details: 来看看世界第一的AI主播！“爱，死亡与机器人。”
  link: https://space.bilibili.com/3546729368520811?spm_id_from=333.337.0.0
  linkText: Bilibili 主页

- icon: 📝
  title: Study-hub 学汇
  details: 一个流淌着知识与蜜的地方。很适合查找各类复习资料。
  link: https://study-hub.store/
  linkText: 立刻弯道超车
  
- icon: 
    dark: 5.jpg
    light: 5.jpg
  title: 友情推荐：Cateds
  details: "前端的神 & 后端的神 & Rust的神！ \n 电子信息专业直接去看🌟✌️笔记就可以考99！"
  link: https://cateds.github.io/
  linkText: 点击以膜拜


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
    margin-top: 10rem;
    text-align: center;
    font-size: 1.05rem;
    opacity: 0.9;
  "
>
  {{ hitokotoText }}
</p>