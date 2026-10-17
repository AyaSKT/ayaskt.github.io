<script lang="ts" setup>
// 1. 再次导入必要的组件
import DefaultTheme from 'vitepress/theme'
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import MouseClick from './MouseClick.vue'
import BackToTop from './backtotop.vue'
import HeroHitokoto from './HeroHitokoto.vue'
import HomeCourseActions from './HomeCourseActions.vue'
import HomeOrbitHero from './HomeOrbitHero.vue'
import HomeSectionHead from './HomeSectionHead.vue'
import HomeRecent from './HomeRecent.vue'
import HomeColophon from './HomeColophon.vue'
import PageTransition from './PageTransition.vue'
import LibraryMotion from './LibraryMotion.vue'
import MathCopy from './MathCopy.vue'
import TopProgress from './TopProgress.vue'
import ReadingModeControl from './ReadingModeControl.vue'
import { customSlots } from '../custom/slots'
import { setupHomeReveal } from '../home-reveal'
import { playDocOrbitEntrance, stopDocOrbitEntrance, vtInFlight } from '../doc-orbit'

// 主题已占用的插槽：自定义组件追加在主题组件之后渲染；
// 其余插槽名直接透传给 DefaultTheme.Layout（见 CUSTOMIZATION.md）
const themeOwnedSlots = [
  'layout-top',
  'nav-bar-content-after',
  'doc-after',
  'home-hero-before',
  'home-hero-info-after',
  'home-hero-image',
  'home-features-before',
  'home-features-after',
]

const passthroughSlots = Object.fromEntries(
  Object.entries(customSlots).filter(([name]) => !themeOwnedSlots.includes(name)),
)

function slotComponents(name: string) {
  return customSlots[name] ?? []
}

const LocalEditorHost = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./LocalEditorHost.vue'))
  : null

// 评论模块异步加载，不占首屏主 bundle
const GiscusComment = defineAsyncComponent(() => import('./GiscusComment.vue'))

const { frontmatter, isDark } = useData()
const route = useRoute()

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const heroImagePool = [
  { light: '/avatars/IMG_0490-light.webp', dark: '/avatars/IMG_0490-dark.webp' },
  { light: '/avatars/IMG_0489-light.webp', dark: '/avatars/IMG_0489-dark.webp' },
  { light: '/avatars/IMG_0233-light.webp', dark: '/avatars/IMG_0233-dark.webp' },
  { light: '/avatars/IMG_0232-light.webp', dark: '/avatars/IMG_0232-dark.webp' },
]

// 只在进入首页时随机选角色；主题切换沿用同一角色的亮 / 暗版本。
const randomHeroIndex = ref<number | null>(null)

let disposeHomeReveal = () => {}
let docOrbitRun = 0

function startHomeReveal() {
  disposeHomeReveal()
  disposeHomeReveal = () => {}
  nextTick(() => {
    window.requestAnimationFrame(() => {
      disposeHomeReveal = setupHomeReveal()
    })
  })
}

// 在路由变化当下记录 VT 状态，不能等到 RAF 才判断（快照可能已结束）。
function startDocOrbit() {
  const run = ++docOrbitRun
  const usesViewTransition = vtInFlight()
  nextTick(() => {
    if (run !== docOrbitRun) return
    playDocOrbitEntrance({ viaTransition: usesViewTransition || vtInFlight() })
  })
}

watch(() => route.path, (path) => {
  docOrbitRun += 1
  stopDocOrbitEntrance()
  if (path === '/' || path === '/index.html') {
    randomHeroIndex.value = Date.now() % heroImagePool.length
    nextTick(() => {
      setupHeroNameEntrance()
      setupHomeNavEntrance()
    })
    startHomeReveal()
  } else {
    disposeHomeReveal()
    disposeHomeReveal = () => {}
    startDocOrbit()
  }
})

// homeHero：轨道 hero（HomeOrbitHero）；未设置时回退到 VitePress 默认 hero
const orbitHero = computed(() => (frontmatter.value as any)?.homeHero ?? null)

const heroImageData = computed(() => {
  const fm = frontmatter.value as any
  return (fm?.hero ?? fm?.homeHero)?.image ?? null
})

const heroImageSrc = computed(() => {
  const image = heroImageData.value
  // 显式指定图片时固定显示，避免首页随机头像覆盖配置。
  if (typeof image === 'string') return image
  if (image?.src) return image.src
  if (isHome.value && randomHeroIndex.value !== null) {
    const image = heroImagePool[randomHeroIndex.value]
    return isDark.value ? image.dark : image.light
  }
  if (!image) return ''
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

let heroPointerX = 0
let heroPointerY = 0
let heroTooltipFrame = 0

function onHeroMouseMove(e: MouseEvent) {
  showTooltip.value = true
  heroPointerX = e.clientX
  heroPointerY = e.clientY
  // rAF 节流：每帧最多读一次布局
  if (heroTooltipFrame) return
  heroTooltipFrame = window.requestAnimationFrame(() => {
    heroTooltipFrame = 0
    const wrapperRect = heroImageRef.value?.getBoundingClientRect()
    if (wrapperRect) {
      tooltipX.value = heroPointerX - wrapperRect.left
      tooltipY.value = heroPointerY - wrapperRect.top
    }
  })
}

function onHeroMouseLeave() {
  showTooltip.value = false
}

// name 的入场动画需要 JS wrapper（background-clip:text 不能做 opacity 动画）
function setupHeroNameEntrance() {
  if (typeof document === 'undefined') return
  const nameEl = document.querySelector('.VPHero .name') as HTMLElement | null
  // 防止重复包裹
  if (!nameEl) return
  nameEl.classList.add('hero-name-ready')
  if (nameEl.parentElement?.querySelector('.hero-name-wrapper')) return
  const wrapper = document.createElement('span')
  wrapper.className = 'hero-name-wrapper animate__animated animate__fadeInLeft'
  wrapper.style.display = 'inline-block'
  wrapper.style.animationDelay = '0.48s'
  wrapper.style.animationDuration = '0.9s'
  nameEl.parentElement.insertBefore(wrapper, nameEl)
  wrapper.appendChild(nameEl)
}

function setupHomeNavEntrance(animate = false) {
  if (typeof document === 'undefined') return
  const nav = document.querySelector('.VPNavBar') as HTMLElement | null
  const root = document.documentElement

  root.classList.add('home-nav-ready')
  nav?.style.removeProperty('animation')
  if (!animate) return

  root.classList.add('home-nav-animate')
  window.setTimeout(() => {
    root.classList.remove('home-nav-animate')
  }, 700)
}

// 是否从首页进入（仅首次加载时判断）
const isHomepage = typeof window !== 'undefined'
  && (window.location.pathname === '/' || window.location.pathname === '/index.html')

let fontRefreshDone = false

async function refreshLayoutAfterFonts() {
  if (fontRefreshDone) return
  fontRefreshDone = true

  await nextTick()
  setupHeroNameEntrance()

  window.requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent('aya-fonts-ready'))
    window.dispatchEvent(new Event('resize'))
  })
}

onMounted(() => {
  const fontsReady = document.fonts?.ready
  if (fontsReady && typeof fontsReady.then === 'function') {
    fontsReady.then(() => {
      void refreshLayoutAfterFonts()
    })
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        void refreshLayoutAfterFonts()
      }, 120)
    }, { once: true })
  }

  // 仅在首次进入首页时 nav 从上方淡入，其他页面无入场动画
  if (isHomepage) {
    // 首次加载时随机选一张 hero image
    if (randomHeroIndex.value === null) {
      randomHeroIndex.value = Date.now() % heroImagePool.length
    }
    setupHomeNavEntrance(true)
  }
  if (isHome.value) startHomeReveal()
  else startDocOrbit()
  // 仅首次加载：hero name 入场动画
  // 导航回到首页时由 View Transitions root crossfade 自然淡入
  setupHeroNameEntrance()
})

onBeforeUnmount(() => {
  disposeHomeReveal()
  docOrbitRun += 1
  stopDocOrbitEntrance()
})
</script>

<template>
  <!-- 使用默认主题的布局，并在顶部和文档之后插入自定义组件 -->
  <DefaultTheme.Layout>
    <!-- 所有页面顶部的特效组件 -->
    <template #layout-top>
      <PageTransition />
      <LibraryMotion />
      <TopProgress />
      <MouseClick />
      <MathCopy />
      <component :is="comp" v-for="(comp, i) in slotComponents('layout-top')" :key="i" />
    </template>

    <template #nav-bar-content-after>
      <ReadingModeControl />
      <component :is="comp" v-for="(comp, i) in slotComponents('nav-bar-content-after')" :key="i" />
    </template>

    <!-- 文档内容之后的评论组件（frontmatter 可关：comments: false / backToTop: false） -->
    <template #doc-after>
      <GiscusComment v-if="frontmatter.comments !== false" />
      <BackToTop v-if="frontmatter.backToTop !== false" />
      <LocalEditorHost v-if="LocalEditorHost" />
      <component :is="comp" v-for="(comp, i) in slotComponents('doc-after')" :key="i" />
    </template>

    <template #home-hero-before>
      <HomeOrbitHero v-if="orbitHero" :image="heroImageSrc" />
      <component :is="comp" v-for="(comp, i) in slotComponents('home-hero-before')" :key="i" />
    </template>

    <template #home-features-before>
      <template v-if="orbitHero">
        <HomeRecent />
        <HomeSectionHead num="02" label="LINKS" title="友情链接" />
      </template>
      <component :is="comp" v-for="(comp, i) in slotComponents('home-features-before')" :key="i" />
    </template>

    <template #home-features-after>
      <HomeColophon v-if="orbitHero" />
      <component :is="comp" v-for="(comp, i) in slotComponents('home-features-after')" :key="i" />
    </template>

    <template #home-hero-info-after>
      <HomeCourseActions />
      <HeroHitokoto class="mobile-hitokoto" />
      <component :is="comp" v-for="(comp, i) in slotComponents('home-hero-info-after')" :key="i" />
    </template>

    <!-- 未被主题占用的插槽按名字透传 -->
    <template v-for="(comps, name) in passthroughSlots" :key="name" #[name]>
      <component :is="comp" v-for="(comp, i) in comps" :key="i" />
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
        <!-- 预加载仅当前选中的 hero 图（其余图片不再首屏下载） -->
        <HeroHitokoto class="desktop-hitokoto" />
        <component :is="comp" v-for="(comp, i) in slotComponents('home-hero-image')" :key="i" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
