<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import { useData, useRoute } from 'vitepress'

type Region = 'nav' | 'sidebar' | 'aside'

const HIDE_DELAY_MS = 300
const TOAST_DURATION_MS = 1800
const SHAKE_DURATION_MS = 420

const route = useRoute()
const { frontmatter, page } = useData()

const active = ref(false)
const isPortrait = ref(false)
const isShaking = ref(false)
const buttonRef = ref<HTMLButtonElement | null>(null)

const visibleRegions = reactive<Record<Region, boolean>>({
  nav: false,
  sidebar: false,
  aside: false,
})

const armedRegions = reactive<Record<Region, boolean>>({
  nav: true,
  sidebar: true,
  aside: true,
})

const toast = reactive({
  visible: false,
  text: '',
  x: 0,
  y: 0,
})

const regionClassMap: Record<Region, string> = {
  nav: 'reading-mode-nav-visible',
  sidebar: 'reading-mode-sidebar-visible',
  aside: 'reading-mode-aside-visible',
}

const surfaceSelectors: Record<Region, string> = {
  nav: '.VPNavBar',
  sidebar: '.VPSidebar',
  aside: '.VPDoc .aside',
}

const hideTimers = new Map<Region, number>()
let toastTimer = 0
let shakeTimer = 0
let mediaQuery: MediaQueryList | undefined
let detachSurfaceListeners: Array<() => void> = []

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const isDocumentPage = computed(() => {
  if (isHome.value) return false
  return !page.value?.isNotFound
})

const pageAllowsReading = computed(() => {
  const data = frontmatter.value as { readingMode?: boolean }
  return data.readingMode !== false
})

const canUseReadingMode = computed(() => (
  !isPortrait.value &&
  isDocumentPage.value &&
  pageAllowsReading.value
))

const showControl = computed(() => (
  !isPortrait.value &&
  (isHome.value || isDocumentPage.value)
))

const effectiveActive = computed(() => active.value && canUseReadingMode.value)

const buttonTitle = computed(() => {
  if (isHome.value) return '首页没有可隐藏的阅读辅助区域'
  if (!pageAllowsReading.value) return '本页未启用纯净阅读模式'
  return effectiveActive.value ? '退出纯净阅读模式' : '进入纯净阅读模式'
})

const buttonLabel = computed(() => buttonTitle.value)

const toastStyle = computed(() => ({
  left: `${toast.x}px`,
  top: `${toast.y}px`,
}))

function updatePortraitState() {
  if (typeof window === 'undefined') return
  mediaQuery ??= window.matchMedia('(orientation: portrait)')
  isPortrait.value = mediaQuery.matches
}

function clearHideTimer(region: Region) {
  const timer = hideTimers.get(region)
  if (timer) {
    window.clearTimeout(timer)
    hideTimers.delete(region)
  }
}

function showRegion(region: Region) {
  clearHideTimer(region)
  visibleRegions[region] = true
}

function hideRegionSoon(region: Region) {
  clearHideTimer(region)
  hideTimers.set(region, window.setTimeout(() => {
    visibleRegions[region] = false
    hideTimers.delete(region)
  }, HIDE_DELAY_MS))
}

function clearVisibleRegions() {
  ;(Object.keys(visibleRegions) as Region[]).forEach((region) => {
    clearHideTimer(region)
    visibleRegions[region] = false
  })
}

function prepareActiveSession() {
  clearVisibleRegions()
  armedRegions.nav = false
  armedRegions.sidebar = true
  armedRegions.aside = true
}

function resetRegionArming() {
  ;(Object.keys(armedRegions) as Region[]).forEach((region) => {
    armedRegions[region] = true
  })
}

function enterHotZone(region: Region) {
  if (!armedRegions[region]) return
  showRegion(region)
}

function leaveHotZone(region: Region) {
  armedRegions[region] = true
  hideRegionSoon(region)
}

function showToast(event: MouseEvent, text: string) {
  const fallbackRect = buttonRef.value?.getBoundingClientRect()
  const x = Number.isFinite(event.clientX)
    ? event.clientX
    : (fallbackRect ? fallbackRect.left + fallbackRect.width / 2 : window.innerWidth / 2)
  const y = Number.isFinite(event.clientY)
    ? event.clientY
    : (fallbackRect ? fallbackRect.bottom + 10 : 72)

  toast.text = text
  toast.x = x + 12
  toast.y = y + 14
  toast.visible = true

  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.visible = false
  }, TOAST_DURATION_MS)
}

function shakeButton() {
  window.clearTimeout(shakeTimer)
  isShaking.value = false

  window.requestAnimationFrame(() => {
    isShaking.value = true
    shakeTimer = window.setTimeout(() => {
      isShaking.value = false
    }, SHAKE_DURATION_MS)
  })
}

function rejectWithFeedback(event: MouseEvent, text: string) {
  shakeButton()
  showToast(event, text)
}

function onToggle(event: MouseEvent) {
  if (isHome.value) {
    rejectWithFeedback(event, '这里似乎没有可以隐藏的内容...')
    return
  }

  if (!canUseReadingMode.value) {
    rejectWithFeedback(event, '本页未启用纯净阅读模式')
    return
  }

  active.value = !active.value
  if (active.value) {
    prepareActiveSession()
  } else {
    clearVisibleRegions()
    resetRegionArming()
  }
}

function detachSurfaces() {
  detachSurfaceListeners.forEach((detach) => detach())
  detachSurfaceListeners = []
}

function syncSurfaceListeners() {
  detachSurfaces()
  if (!effectiveActive.value || typeof document === 'undefined') return

  ;(Object.keys(surfaceSelectors) as Region[]).forEach((region) => {
    const element = document.querySelector(surfaceSelectors[region])
    if (!(element instanceof HTMLElement)) return

    const enter = () => showRegion(region)
    const leave = () => hideRegionSoon(region)
    element.addEventListener('pointerenter', enter)
    element.addEventListener('pointerleave', leave)
    detachSurfaceListeners.push(() => {
      element.removeEventListener('pointerenter', enter)
      element.removeEventListener('pointerleave', leave)
    })
  })
}

function removeRootClasses() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('reading-mode-active')
  Object.values(regionClassMap).forEach((className) => root.classList.remove(className))
}

function onMediaQueryChange() {
  updatePortraitState()
}

watch([canUseReadingMode, () => route.path], ([canUse]) => {
  if (!canUse) active.value = false
  if (active.value && canUse) {
    prepareActiveSession()
  } else {
    clearVisibleRegions()
    resetRegionArming()
  }
  void nextTick(syncSurfaceListeners)
})

watch([effectiveActive, () => route.path], () => {
  void nextTick(syncSurfaceListeners)
}, { immediate: true })

watchEffect(() => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.toggle('reading-mode-active', effectiveActive.value)

  ;(Object.keys(regionClassMap) as Region[]).forEach((region) => {
    root.classList.toggle(regionClassMap[region], effectiveActive.value && visibleRegions[region])
  })
})

onMounted(() => {
  updatePortraitState()
  mediaQuery?.addEventListener('change', onMediaQueryChange)
  window.addEventListener('resize', updatePortraitState)
})

onUnmounted(() => {
  window.clearTimeout(toastTimer)
  window.clearTimeout(shakeTimer)
  hideTimers.forEach((timer) => window.clearTimeout(timer))
  hideTimers.clear()
  detachSurfaces()
  removeRootClasses()
  mediaQuery?.removeEventListener('change', onMediaQueryChange)
  window.removeEventListener('resize', updatePortraitState)
})
</script>

<template>
  <div
    v-if="showControl"
    class="reading-mode-control"
    :class="{ 'is-active': effectiveActive, 'is-shaking': isShaking }"
  >
    <button
      ref="buttonRef"
      class="reading-mode-button"
      type="button"
      :title="buttonTitle"
      :aria-label="buttonLabel"
      :aria-pressed="effectiveActive"
      @click="onToggle"
    >
      <svg
        class="reading-mode-icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M859.136 51.712h-253.952c-38.4 0-72.704 19.456-93.184 48.64-20.48-29.184-54.784-48.64-93.184-48.64H164.864C102.4 51.712 51.2 102.912 51.2 165.376v627.2c0 62.976 51.2 113.664 113.664 113.664h211.456c32.256 41.472 81.92 65.536 135.168 65.536 52.736 0 102.4-24.576 135.168-65.536h211.456c62.976 0 113.664-51.2 113.664-113.664V165.376c1.024-62.464-50.176-113.664-112.64-113.664zM931.84 792.576c0 39.936-32.768 72.704-72.704 72.704h-222.208c-6.656 0-13.312 3.584-16.896 8.704-24.576 35.328-64.512 56.832-107.52 56.832s-83.456-20.992-107.52-56.832c-3.584-5.632-10.24-8.704-16.896-8.704H165.888c-39.936 0-72.704-32.768-72.704-72.704V165.376c0-39.936 32.768-72.704 72.704-72.704H419.84c39.936 0 72.704 32.768 72.704 72.704V629.76c0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48V165.376c0-39.936 32.768-72.704 72.704-72.704H860.16c39.936 0 72.704 32.768 72.704 72.704v627.2z" fill="currentColor" />
        <path d="M367.104 241.152H215.04c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-8.704-20.48-19.968-20.48zM367.104 457.216H215.04c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-8.704-20.48-19.968-20.48zM367.104 672.768H215.04c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48 0.512-11.264-8.704-20.48-19.968-20.48zM807.936 241.152h-151.552c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48zM807.936 457.216h-151.552c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48zM807.936 672.768h-151.552c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48z" fill="currentColor" />
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="toast.visible"
        class="reading-mode-toast"
        :style="toastStyle"
      >
        {{ toast.text }}
      </div>

      <div
        v-if="effectiveActive"
        class="reading-mode-hover-zones"
        aria-hidden="true"
      >
        <div
          class="reading-mode-hover-zone reading-mode-top-zone"
          @pointerenter="enterHotZone('nav')"
          @pointerleave="leaveHotZone('nav')"
        />
        <div
          class="reading-mode-hover-zone reading-mode-sidebar-zone"
          @pointerenter="enterHotZone('sidebar')"
          @pointerleave="leaveHotZone('sidebar')"
        />
        <div
          class="reading-mode-hover-zone reading-mode-aside-zone"
          @pointerenter="enterHotZone('aside')"
          @pointerleave="leaveHotZone('aside')"
        />
      </div>
    </Teleport>
  </div>
</template>
