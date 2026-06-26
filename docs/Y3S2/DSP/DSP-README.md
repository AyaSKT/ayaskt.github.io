---
aside: false
pageClass: course-index-page
---

# 数字信号处理<br>Digital Signal Processing<br><span class="h2-in-h1">UESTC4005 / UESTCHN4005</span>

---

<LyricCard
  title="僕の戦争"
  artist="神聖かまってちゃん"
  lang="ja"
  album-cover="DSP-README.attachments/1782471638287.JPG"
>
  <LyricLine
    original="帰(かえ)り道(みち)を無(な)くした風景(ふうけい) "
    translation="遗失了归家路的风景"
  />
  <LyricLine
    original="夕焼(ゆうや)けこやけ逆(さか)さまに"
    translation="倒逆的夕阳"
  />

</LyricCard>


<CourseIndex
  course="DSP"
  basePath="Y3S2/DSP"
  :groups="[
    {
      title: 'Part I 离散时间信号与系统',
      items: [
        {
          code: 'Ch 2',
          title: '时域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Time Domain',
          link: 'DSP Chapter 2.md',
          cover: 'DSP Chapter 2.attachments/1773557886618.PNG'
        },
        {
          code: 'Ch 3 I',
          title: '频域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Frequency Domain',
          link: 'DSP Chapter 3 I.md',
          cover: 'DSP Chapter 3 I.attachments/1773557929285.PNG'
        },
        {
          code: 'Ch 3 II',
          title: '频域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Frequency Domain',
          link: 'DSP Chapter 3 II.md',
          cover: 'DSP Chapter 3 II.attachments/1773557978013.PNG'
        },
        {
          code: 'Ch 4',
          title: '离散时间系统',
          subtitle: 'Discrete-Time Systems',
          link: 'DSP Chapter 4.md',
          cover: 'DSP Chapter 4.attachments/1773557639355.PNG'
        }
      ]
    },
    {
      title: 'Part II 离散变换',
      items: [
        {
          code: 'Ch 5',
          title: '离散傅里叶变换',
          subtitle: 'Discrete Fourier Transform, DFT',
          link: 'DSP Chapter 5.md',
          cover: 'DSP Chapter 5.attachments/1773562401264.png'
        },
        {
          code: 'Ch 6',
          title: 'Z 变换',
          subtitle: 'Z-Transform',
          link: 'DSP Chapter 6.md',
          cover: 'DSP Chapter 6.attachments/1773645596770.JPG'
        },
        {
          code: 'Ch 7',
          title: '变换域中的离散 LTI 系统',
          subtitle: 'LTI Discrete-Time Systems in the Transform Domain',
          link: 'DSP Chapter 7.md',
          cover: 'DSP Chapter 7.attachments/1773645635605.JPG'
        },
        {
          code: 'Ch 11',
          title: '快速傅里叶变换',
          subtitle: 'Fast Fourier Transform and DFT Computation',
          link: 'DSP Chapter 11.md',
        }
      ]
    },
    {
      title: 'Part III 数字滤波器设计',
      items: [
        {
          code: 'Ch 8',
          title: '数字滤波器架构',
          subtitle: 'Digital Filter Structures',
          link: 'DSP Chapter 8.md',
          cover: 'DSP Chapter 8.attachments/1773652978344.JPG'
        },
        {
          code: 'Ch 9',
          title: 'IIR 数字滤波器设计',
          subtitle: 'IIR Digital Filter Design',
          link: 'DSP Chapter 9.md',
          cover: 'DSP Chapter 9.attachments/1773653064083.JPG'
        },
        {
          code: 'Ch 10',
          title: 'FIR 数字滤波器设计',
          subtitle: 'FIR Digital Filter Design',
          link: 'DSP Chapter 10.md',
        }
      ]
    }
  ]"
/>


![alt text](DSP-README.attachments/1773557775504.PNG)



**本笔记基于2026年春季格拉斯哥学院数字信号处理课程文件及教材**

这门课其实就是离散版的信号与系统，但东西是真的多，写一章就两三万个字符。



> [!CAUTION]
> 本笔记的内容受限于本人的水平和老旧的课程资料，可能会存在某些知识错误或者讲解不完全。
>
> 如果你发现类似的错误或者有改进建议，请直接在评论区评论或者联系我修改，非常感谢！
>
> **顺带一提，请关注 Neuro-Sama 谢谢喵**

如果对你有帮助，就请点个 Star 吧，谢谢喵~
