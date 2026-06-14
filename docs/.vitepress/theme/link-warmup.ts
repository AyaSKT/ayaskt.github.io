import { wrapRouterHook } from './router-hooks'

type RouterLike = {
  onAfterRouteChange?: (to: string) => unknown
}

type NetworkInformation = {
  effectiveType?: string
  saveData?: boolean
}

const warmed = new Set<string>()
let installed = false
let nearbyWarmupTimer = 0

function canWarmLinks() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return false

  return true
}

function isHtmlNavigation(anchor: HTMLAnchorElement) {
  if (anchor.target === '_blank' || anchor.hasAttribute('download')) return false

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin) return false
  if (url.pathname === window.location.pathname) return false

  const extension = url.pathname.match(/\.\w+$/)?.[0]
  return !extension || extension === '.html'
}

function addRoutePrefetch(href: string) {
  if (warmed.has(href)) return
  warmed.add(href)

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'document'
  link.href = href
  document.head.appendChild(link)
}

function warmAnchor(anchor: HTMLAnchorElement) {
  if (!canWarmLinks() || !isHtmlNavigation(anchor)) return

  const url = new URL(anchor.href)
  url.hash = ''
  addRoutePrefetch(url.href)
}

function normalizedPath(value: string) {
  const url = new URL(value, window.location.href)
  const pathname = url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
  return pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
}

function requestIdle(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number
  }

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(callback, { timeout: 2500 })
  } else {
    window.setTimeout(callback, 900)
  }
}

function warmNearbySidebarLinks() {
  if (!canWarmLinks() || document.hidden) return true

  const links = Array
    .from(document.querySelectorAll<HTMLAnchorElement>('.VPSidebar .link[href]'))
    .filter(isHtmlNavigation)

  if (!links.length) return false

  const currentPath = normalizedPath(window.location.href)
  const currentIndex = links.findIndex((link) => normalizedPath(link.href) === currentPath)
  if (currentIndex < 0) return false

  for (const offset of [1, -1]) {
    const link = links[currentIndex + offset]
    if (link) warmAnchor(link)
  }

  return true
}

function scheduleNearbyWarmup(retries = 2) {
  window.clearTimeout(nearbyWarmupTimer)
  nearbyWarmupTimer = window.setTimeout(() => {
    requestIdle(() => {
      const warmedNearby = warmNearbySidebarLinks()
      if (!warmedNearby && retries > 0) {
        scheduleNearbyWarmup(retries - 1)
      }
    })
  }, 1200)
}

function warmEventTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return

  const anchor = target.closest<HTMLAnchorElement>('a[href]')
  if (anchor) warmAnchor(anchor)
}

export function setupLinkWarmup(router: RouterLike) {
  if (installed) return
  if (!canWarmLinks()) return

  installed = true

  const onPointerOver = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      warmEventTarget(event.target)
    }
  }
  const onMouseIntent = (event: MouseEvent) => warmEventTarget(event.target)
  const onFocusIn = (event: FocusEvent) => warmEventTarget(event.target)
  const onTouchStart = (event: TouchEvent) => warmEventTarget(event.target)

  document.addEventListener('pointerover', onPointerOver, { capture: true, passive: true })
  document.addEventListener('pointerdown', onPointerOver, { capture: true, passive: true })
  document.addEventListener('mouseover', onMouseIntent, { capture: true, passive: true })
  document.addEventListener('mousedown', onMouseIntent, { capture: true, passive: true })
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('touchstart', onTouchStart, { passive: true })

  wrapRouterHook(router, 'onAfterRouteChange', (previousAfterRouteChange) => (to) => {
    const result = previousAfterRouteChange?.(to)
    void Promise.resolve(result).then(scheduleNearbyWarmup)
    return result
  })

  scheduleNearbyWarmup()
}
