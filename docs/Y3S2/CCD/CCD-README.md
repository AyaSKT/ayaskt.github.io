---
aside: false
pageClass: course-index-page
---

# CCD 通信电路设计笔记 Introduction & Outline

**再下一场太阳雨吧。**

## Communication Circuit Design (UESTC 3029 / UESTCHN3004)

**本笔记基于 2026 年春季格拉斯哥学院通信电路设计课程文件及教材整理。**

> [!TIP]
> 人生的意义是什么呢？


> [!CAUTION]
> 本笔记的内容受限于本人的水平和老旧的课程资料，可能会存在某些知识错误或者讲解不完全。
> 
> 如果你发现类似的错误或者有改进建议，请直接在评论区评论或者联系我修改，非常感谢！
>
> **顺带一提，请关注虹咲学园谢谢喵**

如果对你有帮助，就请留下一些评论或者表情吧，我会非常感谢的（真的非常非常感谢！）



## 目录 Index

<CourseIndex
  course="CCD"
  basePath="Y3S2/CCD"
  :groups="[
    {
      title: 'Part 1 - Week 6 - Electronic Comms, Semiconductors, Transistors, Amplifiers',
      items: [
        {
          code: 'Lecture 1',
          title: 'Introduction',
          link: 'Part 1/CCD Lecture 1 Introduction.md',
          cover: 'Part 1/CCD Lecture 1 Introduction.attachments/1779783811122.PNG'
        },
        {
          code: 'Lecture 2',
          title: 'Electronic Communications',
          link: 'Part 1/CCD Lecture 2 Electronic Communications.md',
          cover: 'Part 1/CCD Lecture 2 Electronic Communications.attachments/1778848682009.jpg'
        },
        {
          code: 'Lecture 2b',
          title: 'Semiconductors Basics',
          link: 'Part 1/CCD Lecture 2b Semiconductors Basics.md',
          cover: 'Part 1/CCD Lecture 2b Semiconductors Basics.attachments/1779784870101.JPG'
        },
        {
          code: 'Lecture 3-4',
          title: 'Transistors',
          link: 'Part 1/CCD Lecture 3-4 Transistors.md',
          cover: 'Part 1/CCD Lecture 3-4 Transistors.attachments/1779784088824.jpg'
        },
        {
          code: 'Lecture 5-6',
          title: 'Amplifiers',
          link: 'Part 1/CCD Lecture 5-6 Amplifiers.md',
          cover: 'Part 1/CCD Lecture 5-6 Amplifiers.attachments/1780057676448.JPG'
        }
      ]
    },
    {
      title: 'Part 2 - Week 8 - Mixers, Matching Networks, Oscillators',
      items: [
        {
          code: 'Lecture 7',
          title: 'Mixers',
          link: 'Part 2/CCD Lecture 7 Mixers.md',
          cover: 'Part 2/CCD Lecture 7 Mixers.attachments/1780057844904.PNG'
        },
        {
          code: 'Lecture 8',
          title: 'LC Circuits and Matching Networks',
          link: 'Part 2/CCD Lecture 8 LC Circuits and Matching Networks.md',
          cover: 'Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/1780209189821.JPG'
        },
        {
          code: 'Lecture 9',
          title: 'Oscillators',
          link: 'Part 2/CCD Lecture 9 Oscillators.md',
          cover: 'Part 2/CCD Lecture 9 Oscillators.attachments/1780209759050.jpg'
        },
        {
          code: 'Lecture 10',
          title: 'Revision',
          link: 'Part 2/CCD Lecture 10 Revision.md',
          cover: 'Part 2/CCD Lecture 9 Oscillators.attachments/1780209422588.JPG'
        }
      ]
    },
    {
      title: 'Part 3 - Modulation and Antennas',
      items: [
        {
          code: 'Lecture 11-12',
          title: 'Amplitude Modulation',
          link: 'Part 3/CCD Lecture 11-12 Amplitude Modulation.md',
          cover: 'Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/1780674328208.JPG'
        },
        {
          code: 'Lecture 13',
          title: 'Single-Sideband Communication (SSB)',
          link: 'Part 3/CCD Lecture 13 Single-Sideband Communication SSB.md',
          cover: 'Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/1780727188147.JPG'
        },
        {
          code: 'Lecture 14',
          title: 'Frequency Modulation (FM) \u0026 Phase Modulation (PM)',
          link: 'Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.md',
          cover: 'Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/1780839332491.png'
        },
        {
          code: 'Lecture 15',
          title: 'Antennas in a Circuit',
          link: 'Part 3/CCD Lecture 15 Antennas in a Circuit.md',
          cover: 'Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/1780840132059.JPG'
        }
      ]
    },
    {
      title: 'Part 4 - PLL, DAC, ADC and Converter Errors',
      items: [
        {
          code: 'Lecture 16',
          title: 'Phase-Locked Loop (PLL)',
          link: 'Part 4/CCD Lecture 16 Phase-Locked Loop PLL.md',
          cover: 'Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_slope_detector.jpg'
        },
        {
          code: 'Lecture 18',
          title: 'Digital to Analog Conversion',
          link: 'Part 4/CCD Lecture 18 Digital to Analog Conversion.md',
          cover: 'Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_system_interface.jpg'
        },
        {
          code: 'Lecture 19-20',
          title: 'ADC and Converter Errors',
          link: 'Part 4/CCD Lecture 19-20 ADC and Converter Errors.md',
          cover: 'Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_intro.jpg'
        }
      ]
    }
  ]"
/>

![alt text](CCD-README.attachments/1779785178403.JPG)
