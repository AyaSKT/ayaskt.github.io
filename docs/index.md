---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:

  name: "Ayaskt 工作站\nAyaskt Workspace"
  text: "笔记 / 资源汇总"


  tagline: Daphne, Ficus, Iris, Maackia.

  image:
    src: /IMG_4338.jpeg # 你的图片路径，放在 docs 下
    width: 240
    height: 240
    link: https://www.mcdonalds.com.cn/page/offical-channels/
    # 加不加都行：圆形 + 阴影效果
    style:
      borderRadius: 50%
      boxShadow: 0 10px 40px rgba(0,0,0,0.25)
      object-fit: cover;

  # actions intentionally empty — buttons rendered by HomeCourseActions.vue

homeCourseGroups:
  - id: y3s2
    label: Y3S2
    title: 第三学年第二学期
    tone: "#5fa8cf"
    variant: brand
    rows:
      - items:
          - text: 电磁场与波 EMFT
            link: /Y3S2/EMFT/EMFT-README.md
          - text: 数字信号处理 DSP
            link: /Y3S2/DSP/DSP-README.md
      - items:
          - text: 通信电路设计 CCD
            link: /Y3S2/CCD/CCD-README.md
            variant: alt
          - text: 工程项目管理与财务 EPMF
            link: /Y3S2/EPMF/EPMF-README.md
            variant: alt

  - id: y3s1
    label: Y3S1
    title: 第三学年第一学期
    tone: "#8b8fe8"
    variant: alt
    rows:
      - items:
          - text: 通信原理与系统 CPS
            link: /Y3S1/CPS/CPS-README.md
          - text: 人工智能与机器学习 AI&ML
            link: /Y3S1/AIML/AIML-README.md

  - id: y1y2
    label: Y1 & Y2
    title: 早期课程 / 外部资料
    tone: "#ad8bc8"
    variant: alt
    rows:
      - items:
          - text: 嵌入式处理器 EP (DT5EDU)
            link: https://mp.weixin.qq.com/s/Xqwg9KBZHkuYoXQAH-DfGw
          - text: 电路分析与设计 CAD (DT5EDU)
            link: https://mp.weixin.qq.com/s/-_oFpk5asMRE_D6sqlMCsw
      - items:
          - text: 微电子系统 MS (DT5EDU)
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
  details: 来看看世界第一的AI主播！"爱，死亡与机器人。"
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
