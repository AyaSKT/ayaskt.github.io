type RouteOptions = {
  initialLoad?: boolean
  smoothScroll?: boolean
}

type Navigate = () => Promise<void>

import { readMotionDuration } from './motion-tokens'

const OUTLINE_SELECTOR = '.VPDocAsideOutline a[href]'
const MOTION_TARGET_SELECTOR = '.VPDoc .main'
const PENDING_TTL = 1200
// 令牌 --dur-outline-out / --dur-outline-in 可在 custom/tokens.css 覆盖，以下为兜底值
const FADE_OUT_DURATION = 140
const FADE_IN_DURATION = 260

type PendingOutlineJump = {
  pathname: string
  search: string
  hash: string
  time: number
}

function noMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

function toUrl(value: string) {
  return new URL(value, window.location.href)
}

function sameDocument(a: URL, b: URL) {
  return a.origin === b.origin && a.pathname === b.pathname && a.search === b.search
}

function findHashTarget(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash).slice(1))
  } catch {
    return null
  }
}

function motionTarget() {
  return document.querySelector<HTMLElement>(MOTION_TARGET_SELECTOR)
}

function shouldTrackPointer(event: PointerEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  )
}

function shouldTrackKey(event: KeyboardEvent) {
  return (
    !event.defaultPrevented &&
    event.key === 'Enter' &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  )
}

function resetAnimateClasses(element: HTMLElement) {
  element.classList.remove('animate__animated', 'animate__fadeOut', 'animate__fadeIn')
}

function waitForFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

function playAnimateCss(element: HTMLElement, name: 'animate__fadeOut' | 'animate__fadeIn', duration: number) {
  return new Promise<void>((resolve) => {
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      window.clearTimeout(fallback)
      element.removeEventListener('animationend', finish)
      element.removeEventListener('animationcancel', finish)
      resolve()
    }

    resetAnimateClasses(element)
    element.style.setProperty('--animate-duration', `${duration}ms`)
    void element.offsetWidth
    element.classList.add('animate__animated', name)

    const fallback = window.setTimeout(finish, duration + 120)
    element.addEventListener('animationend', finish, { once: true })
    element.addEventListener('animationcancel', finish, { once: true })
  })
}

export function createOutlineJumpMotion() {
  let pending: PendingOutlineJump | undefined
  let runId = 0

  function markPending(target: EventTarget | null) {
    if (!(target instanceof Element)) return

    const link = target.closest<HTMLAnchorElement>(OUTLINE_SELECTOR)
    if (!link) return

    const nextUrl = toUrl(link.href)
    const currentUrl = toUrl(window.location.href)
    if (!nextUrl.hash || !sameDocument(nextUrl, currentUrl)) return

    pending = {
      pathname: nextUrl.pathname,
      search: nextUrl.search,
      hash: nextUrl.hash,
      time: window.performance.now()
    }
  }

  function onPointerDown(event: PointerEvent) {
    if (shouldTrackPointer(event)) markPending(event.target)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (shouldTrackKey(event)) markPending(event.target)
  }

  function matchingPending(to: string) {
    if (!pending) return null
    if (window.performance.now() - pending.time > PENDING_TTL) {
      pending = undefined
      return null
    }

    const nextUrl = toUrl(to)
    const currentUrl = toUrl(window.location.href)
    if (!sameDocument(nextUrl, currentUrl)) return null
    if (
      nextUrl.pathname !== pending.pathname ||
      nextUrl.search !== pending.search ||
      nextUrl.hash !== pending.hash
    ) {
      return null
    }

    return { nextUrl, currentUrl }
  }

  function shouldAnimate(to: string, options?: RouteOptions) {
    const match = matchingPending(to)
    if (!match) return false

    const { nextUrl, currentUrl } = match
    if (options?.initialLoad || !noMotionPreference()) {
      pending = undefined
      return false
    }

    if (!nextUrl.hash || nextUrl.hash === currentUrl.hash) return false
    if (!findHashTarget(nextUrl.hash) || !motionTarget()) return false

    return true
  }

  async function run(to: string, navigate: Navigate) {
    pending = undefined

    const id = ++runId
    const target = motionTarget()
    if (!target) {
      await navigate()
      return
    }

    target.style.pointerEvents = 'none'

    try {
      await playAnimateCss(target, 'animate__fadeOut', readMotionDuration('--dur-outline-out', FADE_OUT_DURATION))
      if (id !== runId) return

      target.style.opacity = '0'
      await navigate()
      await waitForFrame()

      if (!findHashTarget(toUrl(to).hash)) return
      if (id !== runId) return

      await playAnimateCss(target, 'animate__fadeIn', readMotionDuration('--dur-outline-in', FADE_IN_DURATION))
    } finally {
      resetAnimateClasses(target)
      target.style.removeProperty('--animate-duration')
      target.style.removeProperty('opacity')
      target.style.removeProperty('pointer-events')
    }
  }

  function attach() {
    window.addEventListener('pointerdown', onPointerDown, { capture: true })
    window.addEventListener('keydown', onKeyDown, { capture: true })

    return () => {
      window.removeEventListener('pointerdown', onPointerDown, { capture: true })
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      pending = undefined
      runId += 1
    }
  }

  return {
    attach,
    shouldAnimate,
    run
  }
}
