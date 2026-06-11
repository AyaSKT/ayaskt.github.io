<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'
import { useData, useRouter } from 'vitepress'

const router = useRouter()
const { theme } = useData()

let restoreGo: (() => void) | undefined
let sidebarIndicator: HTMLDivElement | null = null
let indicatorReady = false
let resizeTimer: ReturnType<typeof setTimeout> | undefined
let indicatorFrame = 0
let sidebarObserver: MutationObserver | undefined
let sidebarAttachTimer: ReturnType<typeof setTimeout> | undefined
let sidebarAttachAttempts = 0

function sidebarKeyFor(to: string) {
  const sidebar = theme.value.sidebar
  if (!sidebar || Array.isArray(sidebar)) return ''

  const pathname = new URL(to, window.location.href).pathname
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

function normalizePath(value: string) {
  const url = new URL(value, window.location.href)
  const withoutHtml = url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
  return withoutHtml.length > 1 ? withoutHtml.replace(/\/$/, '') : withoutHtml
}

function findActiveSidebarLink() {
  const activeLink = document.querySelector('.VPSidebarItem.is-active > .item > .link') as HTMLElement | null
  if (activeLink) return activeLink

  const currentPath = normalizePath(window.location.href)
  const links = document.querySelectorAll<HTMLAnchorElement>('.VPSidebar .link[href]')
  for (const link of links) {
    if (normalizePath(link.href) === currentPath) return link
  }

  return null
}

function updateSidebarIndicator() {
  const nav = document.querySelector('.VPSidebar .nav') as HTMLElement | null
  const activeLink = findActiveSidebarLink()

  if (!nav || !activeLink) {
    document
      .querySelectorAll('.VPSidebar .link[data-sidebar-current]')
      .forEach((link) => link.removeAttribute('data-sidebar-current'))

    if (sidebarIndicator) {
      sidebarIndicator.style.opacity = '0'
    }
    return
  }

  try {
    const indicator = ensureIndicator()
    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    document
      .querySelectorAll('.VPSidebar .link[data-sidebar-current]')
      .forEach((link) => {
        if (link !== activeLink) link.removeAttribute('data-sidebar-current')
      })
    activeLink.setAttribute('data-sidebar-current', 'true')

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

function scheduleSidebarIndicatorUpdate() {
  if (indicatorFrame) return

  indicatorFrame = window.requestAnimationFrame(() => {
    indicatorFrame = 0
    updateSidebarIndicator()
  })
}

function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    resizeTimer = undefined
    scheduleSidebarIndicatorUpdate()
  }, 100)
}

function attachSidebarObserver() {
  if (sidebarObserver) return

  const sidebar = document.querySelector('.VPSidebar')
  if (!sidebar) {
    if (sidebarAttachAttempts >= 20) return

    sidebarAttachAttempts += 1
    sidebarAttachTimer = setTimeout(() => {
      sidebarAttachTimer = undefined
      attachSidebarObserver()
    }, 100)
    return
  }

  sidebarObserver = new MutationObserver(() => {
    scheduleSidebarIndicatorUpdate()
  })
  sidebarObserver.observe(sidebar, { attributes: true, subtree: true, attributeFilter: ['class'] })
  scheduleSidebarIndicatorUpdate()
}

function resetSidebarObserver() {
  clearTimeout(sidebarAttachTimer)
  sidebarAttachTimer = undefined
  sidebarAttachAttempts = 0
  sidebarObserver?.disconnect()
  sidebarObserver = undefined
  attachSidebarObserver()
}

onMounted(() => {
  const originalGo = router.go.bind(router)

  router.go = async (to, options) => {
    if (!canTransition(to, options)) {
      await originalGo(to, options)
      await nextTick()
      resetSidebarObserver()
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
        resetSidebarObserver()

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
  attachSidebarObserver()
  setTimeout(() => {
    attachSidebarObserver()
    scheduleSidebarIndicatorUpdate()
  }, 300)

  // 字体加载完成后重新定位（字体切换可能导致文本换行，指示器错位）
  if ('fonts' in document) {
    document.fonts.ready.then(() => scheduleSidebarIndicatorUpdate())
  }

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  restoreGo?.()
  window.removeEventListener('resize', onResize)
  clearTimeout(resizeTimer)
  clearTimeout(sidebarAttachTimer)
  sidebarObserver?.disconnect()
  sidebarObserver = undefined
  if (indicatorFrame) {
    window.cancelAnimationFrame(indicatorFrame)
    indicatorFrame = 0
  }
  sidebarIndicator?.remove()
  sidebarIndicator = null
})
</script>

<template>
  <div style="display: none" />
</template>
