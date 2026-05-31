<script lang="ts" setup>
// 1. 再次导入必要的组件
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import MouseClick from './MouseClick.vue'
import GiscusComment from './GiscusComment.vue' // 评论模块
import BackToTop from './backtotop.vue'
import HeroHitokoto from './HeroHitokoto.vue'
import HomeCourseActions from './HomeCourseActions.vue'
import PageTransition from './PageTransition.vue'

const { frontmatter, isDark } = useData()

const heroImageData = computed(() => {
  const hero = (frontmatter.value as any)?.hero
  return hero?.image ?? null
})

const heroImageSrc = computed(() => {
  const image = heroImageData.value
  if (!image) return ''
  if (typeof image === 'string') return image
  if (image.src) return image.src
  if (image.light || image.dark) {
    return isDark.value ? (image.dark ?? image.light ?? '') : (image.light ?? image.dark ?? '')
  }
  return ''
})

const heroImageWidth = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.width : undefined
})

const heroImageHeight = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.height : undefined
})

const heroImageStyle = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.style : undefined
})

const heroImageLink = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.link : undefined
})

// name 的入场动画需要 JS wrapper（background-clip:text 不能做 opacity 动画）
function setupHeroNameEntrance() {
  if (typeof document === 'undefined') return
  const nameEl = document.querySelector('.VPHero .name') as HTMLElement | null
  if (nameEl && nameEl.parentElement) {
    const wrapper = document.createElement('span')
    wrapper.className = 'hero-name-wrapper animate__animated animate__fadeInLeft'
    wrapper.style.display = 'inline-block'
    wrapper.style.animationDelay = '0.48s'
    wrapper.style.animationDuration = '0.75s'
    nameEl.parentElement.insertBefore(wrapper, nameEl)
    wrapper.appendChild(nameEl)
  }
}

onMounted(() => {
  setupHeroNameEntrance()
})
</script>

<template>
  <!-- 使用默认主题的布局，并在顶部和文档之后插入自定义组件 -->
  <DefaultTheme.Layout>
    <!-- 所有页面顶部的特效组件 -->
    <template #layout-top>
      <PageTransition />
      <MouseClick />
    </template>

    <!-- 文档内容之后的评论组件 -->
    <template #doc-after>
      <GiscusComment />
      <BackToTop />
    </template>

    <template #home-hero-info-after>
      <HomeCourseActions />
      <HeroHitokoto class="mobile-hitokoto" />
    </template>

    <template #home-hero-image>
      <a
        v-if="heroImageSrc && heroImageLink"
        class="image-src"
        :href="heroImageLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="hero-image-src"
          :src="heroImageSrc"
          :width="heroImageWidth"
          :height="heroImageHeight"
          :style="heroImageStyle"
        >
      </a>
      <img
        v-else-if="heroImageSrc"
        class="image-src hero-image-src"
        :src="heroImageSrc"
        :width="heroImageWidth"
        :height="heroImageHeight"
        :style="heroImageStyle"
      >
      <HeroHitokoto class="desktop-hitokoto" />
    </template>
  </DefaultTheme.Layout>
</template>
