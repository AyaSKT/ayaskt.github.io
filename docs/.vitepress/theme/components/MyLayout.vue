<script lang="ts" setup>
// 1. 再次导入必要的组件
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import MouseClick from './MouseClick.vue'
import GiscusComment from './GiscusComment.vue' // 评论模块
import BackToTop from './backtotop.vue'
import HeroHitokoto from './HeroHitokoto.vue'
import HomeCourseActions from './HomeCourseActions.vue'
import PageTransition from './PageTransition.vue'
import MathCopy from './MathCopy.vue'

const { frontmatter, isDark } = useData()
const route = useRoute()

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const heroImagePool = [
  '/IMG_4338.jpeg',
  '/IMG_4520.png',
  '/IMG_4521.png',
  '/IMG_4522.png',
]

const randomHeroSrc = ref('')

watch(() => route.path, (path) => {
  if (path === '/' || path === '/index.html') {
    randomHeroSrc.value = heroImagePool[Date.now() % heroImagePool.length]
  }
})

const heroImageData = computed(() => {
  const hero = (frontmatter.value as any)?.hero
  return hero?.image ?? null
})

const heroImageSrc = computed(() => {
  if (isHome.value && randomHeroSrc.value) return randomHeroSrc.value
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

// Hero 图片 hover tooltip 跟随光标
const heroImageRef = ref<HTMLElement | null>(null)
const showTooltip = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)

function onHeroMouseMove(e: MouseEvent) {
  showTooltip.value = true
  const wrapperRect = heroImageRef.value?.getBoundingClientRect()
  if (wrapperRect) {
    tooltipX.value = e.clientX - wrapperRect.left
    tooltipY.value = e.clientY - wrapperRect.top
  }
}

function onHeroMouseLeave() {
  showTooltip.value = false
}

// name 的入场动画需要 JS wrapper（background-clip:text 不能做 opacity 动画）
function setupHeroNameEntrance() {
  if (typeof document === 'undefined') return
  const nameEl = document.querySelector('.VPHero .name') as HTMLElement | null
  // 防止重复包裹
  if (!nameEl || nameEl.parentElement?.querySelector('.hero-name-wrapper')) return
  const wrapper = document.createElement('span')
  wrapper.className = 'hero-name-wrapper animate__animated animate__fadeInLeft'
  wrapper.style.display = 'inline-block'
  wrapper.style.animationDelay = '0.48s'
  wrapper.style.animationDuration = '0.75s'
  nameEl.parentElement.insertBefore(wrapper, nameEl)
  wrapper.appendChild(nameEl)
}

// 是否从首页进入（仅首次加载时判断）
const isHomepage = typeof window !== 'undefined'
  && (window.location.pathname === '/' || window.location.pathname === '/index.html')

onMounted(() => {
  // 仅在首次进入首页时 nav 从上方淡入，其他页面无入场动画
  if (isHomepage) {
    // 首次加载时随机选一张 hero image
    if (!randomHeroSrc.value) {
      randomHeroSrc.value = heroImagePool[Date.now() % heroImagePool.length]
    }
    const nav = document.querySelector('.VPNavBar') as HTMLElement | null
    if (nav) {
      nav.classList.add('animate__animated', 'animate__fadeInDown')
      nav.style.animationDuration = '0.5s'
    }
  }
  // 仅首次加载：hero name 入场动画
  // 导航回到首页时由 View Transitions root crossfade 自然淡入
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
      <MathCopy />
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
      <div ref="heroImageRef" class="hero-image-wrap">
        <a
          v-if="heroImageSrc && heroImageLink"
          class="image-src"
          :href="heroImageLink"
          target="_blank"
          rel="noopener noreferrer"
          @mousemove="onHeroMouseMove"
          @mouseleave="onHeroMouseLeave"
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
          @mousemove="onHeroMouseMove"
          @mouseleave="onHeroMouseLeave"
        >
        <span
          v-if="showTooltip && heroImageLink"
          class="hero-tooltip"
          :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
        >点我有惊喜 (≧▽≦)</span>
        <!-- 预加载全部 hero image，避免切换时重新请求 -->
        <img v-for="src in heroImagePool" :key="src" :src="src" class="hero-preload" aria-hidden="true">
        <HeroHitokoto class="desktop-hitokoto" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
