<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'
import { useData, useRouter } from 'vitepress'

const router = useRouter()
const { theme } = useData()

let restoreGo: (() => void) | undefined
let sidebarIndicator: HTMLDivElement | null = null
let indicatorReady = false
let resizeTimer: ReturnType<typeof setTimeout> | undefined

function sidebarKeyFor(to: string) {
  const sidebar = theme.value.sidebar
  if (!sidebar || Array.isArray(sidebar)) return ''

  const pathname = decodeURI(new URL(to, window.location.href).pathname)
  return Object.keys(sidebar)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0] ?? ''
}

function canTransition(to: string, options?: { initialLoad?: boolean }) {
  if (options?.initialLoad) return false
  if (!('startViewTransition' in document)) return false
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return false

  const nextUrl = new URL(to, window.location.href)
  const currentUrl = new URL(window.location.href)

  return (
    nextUrl.origin === currentUrl.origin &&
    (nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search)
  )
}

function ensureIndicator(): HTMLDivElement {
  if (sidebarIndicator) return sidebarIndicator
  const nav = document.querySelector('.VPSidebar .nav') as HTMLElement | null
  if (!nav) throw new Error('Sidebar nav not found')

  sidebarIndicator = document.createElement('div')
  sidebarIndicator.className = 'sidebar-active-indicator'
  nav.appendChild(sidebarIndicator)
  return sidebarIndicator
}

function updateSidebarIndicator() {
  const nav = document.querySelector('.VPSidebar .nav') as HTMLElement | null
  const activeLink = document.querySelector('.VPSidebarItem.is-active > .item > .link') as HTMLElement | null

  if (!nav || !activeLink) {
    if (sidebarIndicator) {
      sidebarIndicator.style.opacity = '0'
    }
    return
  }

  try {
    const indicator = ensureIndicator()
    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    if (!indicatorReady) {
      indicator.style.transition = 'none'
    }

    indicator.style.opacity = '1'
    indicator.style.left = (linkRect.left - navRect.left) + 'px'
    indicator.style.top = (linkRect.top - navRect.top) + 'px'
    indicator.style.width = linkRect.width + 'px'
    indicator.style.height = linkRect.height + 'px'

    if (!indicatorReady) {
      indicator.offsetHeight // force reflow
      indicator.style.transition = ''
      indicatorReady = true
    }
  } catch {
    // sidebar nav may not be in DOM (e.g. homepage)
  }
}

function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(updateSidebarIndicator, 100)
}

onMounted(() => {
  const originalGo = router.go.bind(router)

  router.go = async (to, options) => {
    if (!canTransition(to, options)) {
      await originalGo(to, options)
      return
    }

    const currentSidebarKey = sidebarKeyFor(window.location.href)
    const nextSidebarKey = sidebarKeyFor(to)
    const keepsSidebar = currentSidebarKey && currentSidebarKey === nextSidebarKey
    const switchesSidebar = Boolean(currentSidebarKey && nextSidebarKey && currentSidebarKey !== nextSidebarKey)

    document.documentElement.classList.toggle('vt-keep-sidebar', Boolean(keepsSidebar))
    document.documentElement.classList.toggle('vt-switch-sidebar', switchesSidebar)

    try {
      const transition = (document as any).startViewTransition(async () => {
        await originalGo(to, options)
        await nextTick()

        // 非同一 sidebar：DOM 更新后立刻定位指示器（无动画），确保出现在快照中
        if (!keepsSidebar) {
          sidebarIndicator?.remove()
          sidebarIndicator = null
          indicatorReady = false
          updateSidebarIndicator()
        }
      })

      await transition.finished

      // 同一 sidebar：transition 结束后再从旧位置滑动到新位置
      if (keepsSidebar) {
        await nextTick()
        updateSidebarIndicator()
      }
    } finally {
      document.documentElement.classList.remove('vt-keep-sidebar')
      document.documentElement.classList.remove('vt-switch-sidebar')
      window.dispatchEvent(new CustomEvent('vt-transition-done'))
    }
  }

  restoreGo = () => {
    router.go = originalGo
  }

  // 初始定位 + 监听器
  setTimeout(updateSidebarIndicator, 300)
  window.addEventListener('resize', onResize)

  // 观察 sidebar 内 is-active 变更（展开/折叠分组导致位置变化）
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    const observer = new MutationObserver(() => {
      updateSidebarIndicator()
    })
    observer.observe(sidebar, { attributes: true, subtree: true, attributeFilter: ['class'] })
    onUnmounted(() => observer.disconnect())
  }
})

onUnmounted(() => {
  restoreGo?.()
  window.removeEventListener('resize', onResize)
  clearTimeout(resizeTimer)
  sidebarIndicator?.remove()
  sidebarIndicator = null
})
</script>

<template>
  <div style="display: none" />
</template>
