<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'
import { useData, useRouter } from 'vitepress'
import type { PageData } from 'vitepress'
import { readMotionDuration } from '../motion-tokens'
import { createOutlineJumpMotion } from '../outline-jump-motion'
import { attachSidebarMotion } from '../sidebar-motion'

const router = useRouter()
const { theme } = useData()

let restoreGo: (() => void) | undefined
let sidebarIndicator: HTMLDivElement | null = null
let indicatorReady = false
let resizeTimer: ReturnType<typeof setTimeout> | undefined
let indicatorFrame = 0
let sidebarObserver: MutationObserver | undefined
let sidebarResizeObserver: ResizeObserver | undefined
let sidebarAttachTimer: ReturnType<typeof setTimeout> | undefined
let sidebarAttachAttempts = 0
let outlineJumpMotion: ReturnType<typeof createOutlineJumpMotion> | undefined
let detachOutlineJumpMotion: (() => void) | undefined
let detachSidebarMotion: (() => void) | undefined

const ARTICLE_IMAGE_LAYOUT_TIMEOUT = 240
const ARTICLE_IMAGE_LAYOUT_POLL_INTERVAL = 32
const ARTICLE_IMAGE_WAIT_LIMIT = 8
const TIMELINE_EXIT_TIMEOUT_FALLBACK = 900

interface TimelineExitRequestDetail {
  handled: boolean
  complete: () => void
}

function sidebarKeyFor(to: string) {
  const sidebar = theme.value.sidebar
  if (!sidebar || Array.isArray(sidebar)) return ''

  const pathname = new URL(to, window.location.href).pathname
  return Object.keys(sidebar)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0] ?? ''
}

function pageKindFor(to: string) {
  const pathname = new URL(to, window.location.href).pathname
  return pathname === '/' || pathname === '/index.html' ? 'home' : 'doc'
}

function hasArticleContent(pageData: PageData | undefined) {
  const frontmatter = pageData?.frontmatter ?? {}

  if (pageData?.isNotFound) return false
  if (frontmatter.layout === 'home') return false
  if (frontmatter.pageClass === 'course-index-page') return false

  return true
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

function isTimelinePath(pathname: string) {
  return pathname === '/timeline' || pathname === '/timeline.html'
}

async function requestTimelinePageExit(to: string) {
  if (!document.documentElement.classList.contains('timeline-page-active')) return
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

  const currentUrl = new URL(window.location.href)
  const nextUrl = new URL(to, window.location.href)
  if (!isTimelinePath(currentUrl.pathname) || isTimelinePath(nextUrl.pathname)) return

  await new Promise<void>((resolve) => {
    let settled = false
    let timeout = 0
    const finish = () => {
      if (settled) return
      settled = true
      window.clearTimeout(timeout)
      resolve()
    }
    const detail: TimelineExitRequestDetail = {
      handled: false,
      complete: finish,
    }

    timeout = window.setTimeout(
      finish,
      readMotionDuration('--dur-timeline-exit-timeout', TIMELINE_EXIT_TIMEOUT_FALLBACK),
    )
    window.dispatchEvent(new CustomEvent('timeline-page-exit-request', { detail }))
    if (!detail.handled) finish()
  })
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
    syncSidebarScrollbarWidth(nav)
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

    // .nav 是滚动容器：绝对定位原点是它的 padding box（RTL 下位于左侧滚动条之后），
    // 且不随内容滚动，所以要减去 client 边距、补回滚动偏移。
    const originLeft = navRect.left + nav.clientLeft - nav.scrollLeft
    const originTop = navRect.top + nav.clientTop - nav.scrollTop

    indicator.style.opacity = '1'
    indicator.style.left = (linkRect.left - originLeft) + 'px'
    indicator.style.top = (linkRect.top - originTop) + 'px'
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
  observeSidebarLayout(sidebar)
  scheduleSidebarIndicatorUpdate()
}

// direction: rtl 让滚动条槽只占左侧，把内容整体右推，条目左右留白就不相等。
// 槽宽取决于系统滚动条设置（覆盖式滚动条为 0），CSS 拿不到，只能量。
// 量出的是槽本身，与当前 padding-left 无关，所以反复调用会收敛。
function syncSidebarScrollbarWidth(nav: HTMLElement) {
  const probe = nav.querySelector('.group')
  if (!probe) return

  const paddingLeft = Number.parseFloat(getComputedStyle(nav).paddingLeft) || 0
  const gutter = probe.getBoundingClientRect().left - nav.getBoundingClientRect().left - paddingLeft
  const next = `${Math.max(0, Math.round(gutter))}px`
  if (nav.style.getPropertyValue('--aya-sidebar-scrollbar') === next) return

  nav.style.setProperty('--aya-sidebar-scrollbar', next)
}

// document.fonts.ready 可能在 Web 字体的 @font-face 注册之前就 resolve，
// 字体到达后条目会重新折行而指示器留在旧位置。观察实际尺寸变化兜底。
function observeSidebarLayout(sidebar: Element) {
  sidebarResizeObserver?.disconnect()
  sidebarResizeObserver = undefined
  if (typeof ResizeObserver === 'undefined') return

  const nav = sidebar.querySelector('.nav')
  if (!nav) return

  const observer = new ResizeObserver(() => {
    scheduleSidebarIndicatorUpdate()
  })
  observer.observe(nav)
  // 指示器自身会被脚本改尺寸，纳入观察会自激。
  nav.querySelectorAll(':scope > *:not(.sidebar-active-indicator)').forEach((child) => {
    observer.observe(child)
  })
  sidebarResizeObserver = observer
}

function resetSidebarObserver() {
  clearTimeout(sidebarAttachTimer)
  sidebarAttachTimer = undefined
  sidebarAttachAttempts = 0
  sidebarObserver?.disconnect()
  sidebarObserver = undefined
  sidebarResizeObserver?.disconnect()
  sidebarResizeObserver = undefined
  attachSidebarObserver()
  resetSidebarMotion()
}

function resetSidebarMotion() {
  detachSidebarMotion?.()
  detachSidebarMotion = attachSidebarMotion(() => {
    scheduleSidebarIndicatorUpdate()
  })
}

function imageHasLayoutSize(image: HTMLImageElement) {
  if (image.complete || (image.naturalWidth > 0 && image.naturalHeight > 0)) return true

  const widthAttr = Number(image.getAttribute('width'))
  const heightAttr = Number(image.getAttribute('height'))
  if (widthAttr > 0 && heightAttr > 0) return true

  const rect = image.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

function waitForImageLayoutSize(image: HTMLImageElement) {
  if (imageHasLayoutSize(image)) return Promise.resolve()

  return new Promise<void>((resolve) => {
    let pollTimer: ReturnType<typeof setTimeout> | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    let settled = false

    const cleanup = () => {
      clearTimeout(pollTimer)
      clearTimeout(timer)
      image.removeEventListener('load', finish)
      image.removeEventListener('error', finish)
    }

    const finish = () => {
      if (settled) return
      settled = true
      cleanup()
      resolve()
    }

    const check = () => {
      if (imageHasLayoutSize(image)) {
        finish()
        return
      }

      pollTimer = setTimeout(check, ARTICLE_IMAGE_LAYOUT_POLL_INTERVAL)
    }

    timer = setTimeout(finish, ARTICLE_IMAGE_LAYOUT_TIMEOUT)
    image.addEventListener('load', finish, { once: true })
    image.addEventListener('error', finish, { once: true })
    check()
  })
}

async function waitForArticleMediaLayout() {
  const main = document.querySelector<HTMLElement>('.VPDoc .main')
  if (!main) return

  const pendingImages = Array
    .from(main.querySelectorAll<HTMLImageElement>('img'))
    .filter((image) => !imageHasLayoutSize(image))
    .slice(0, ARTICLE_IMAGE_WAIT_LIMIT)

  if (pendingImages.length) {
    await Promise.allSettled(pendingImages.map((image) => waitForImageLayoutSize(image)))
  }

  main.getBoundingClientRect()
}

onMounted(() => {
  const originalGo = router.go.bind(router)
  outlineJumpMotion = createOutlineJumpMotion()
  detachOutlineJumpMotion = outlineJumpMotion.attach()

  router.go = async (to, options) => {
    if (outlineJumpMotion?.shouldAnimate(to, options)) {
      await outlineJumpMotion.run(to, async () => {
        await originalGo(to, options)
        await nextTick()
        resetSidebarObserver()
      })
      return
    }

    await requestTimelinePageExit(to)

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
    const hidesSidebar = Boolean(currentSidebarKey && !nextSidebarKey)
    const showsSidebar = Boolean(!currentSidebarKey && nextSidebarKey)
    const routeTransitionClass = `vt-${pageKindFor(window.location.href)}-to-${pageKindFor(to)}`
    const fromArticleContent = hasArticleContent(router.route.data)

    document.documentElement.classList.toggle('vt-keep-sidebar', Boolean(keepsSidebar))
    document.documentElement.classList.toggle('vt-switch-sidebar', switchesSidebar)
    document.documentElement.classList.toggle('vt-hide-sidebar', hidesSidebar)
    document.documentElement.classList.toggle('vt-show-sidebar', showsSidebar)
    document.documentElement.classList.toggle('vt-doc-content-transition', fromArticleContent)
    document.documentElement.classList.toggle('vt-from-doc-content', fromArticleContent)
    document.documentElement.classList.add(routeTransitionClass)

    try {
      const transition = (document as any).startViewTransition(async () => {
        document.documentElement.classList.remove('vt-from-doc-content')

        await originalGo(to, options)
        const toArticleContent = hasArticleContent(router.route.data)

        document.documentElement.classList.toggle('vt-doc-content-transition', fromArticleContent || toArticleContent)
        document.documentElement.classList.toggle('vt-to-doc-content', toArticleContent)
        document.documentElement.classList.toggle('vt-doc-to-contentless', fromArticleContent && !toArticleContent)

        await nextTick()
        if (toArticleContent) {
          await waitForArticleMediaLayout()
        }
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
      document.documentElement.classList.remove('vt-hide-sidebar')
      document.documentElement.classList.remove('vt-show-sidebar')
      document.documentElement.classList.remove('vt-doc-content-transition')
      document.documentElement.classList.remove('vt-from-doc-content')
      document.documentElement.classList.remove('vt-to-doc-content')
      document.documentElement.classList.remove('vt-doc-to-contentless')
      document.documentElement.classList.remove(routeTransitionClass)
      window.dispatchEvent(new CustomEvent('vt-transition-done'))
    }
  }

  restoreGo = () => {
    router.go = originalGo
  }

  // 初始定位 + 监听器
  attachSidebarObserver()
  resetSidebarMotion()
  setTimeout(() => {
    attachSidebarObserver()
    scheduleSidebarIndicatorUpdate()
  }, 300)

  // 字体加载完成后重新定位（字体切换可能导致文本换行，指示器错位）
  const fontsReady = document.fonts?.ready
  if (fontsReady && typeof fontsReady.then === 'function') {
    fontsReady.then(() => scheduleSidebarIndicatorUpdate())
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('aya-fonts-ready', onResize)
})

onUnmounted(() => {
  restoreGo?.()
  detachOutlineJumpMotion?.()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('aya-fonts-ready', onResize)
  clearTimeout(resizeTimer)
  clearTimeout(sidebarAttachTimer)
  detachSidebarMotion?.()
  detachSidebarMotion = undefined
  sidebarObserver?.disconnect()
  sidebarObserver = undefined
  sidebarResizeObserver?.disconnect()
  sidebarResizeObserver = undefined
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
