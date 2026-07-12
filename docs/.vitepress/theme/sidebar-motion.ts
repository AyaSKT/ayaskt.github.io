import { readMotionDuration } from './motion-tokens'

// 令牌 --dur-sidebar-collapse 可在 custom/tokens.css 覆盖，以下为兜底值
const MOTION_DURATION = 260
const MOTION_CLEANUP_BUFFER = 80
const ANIMATE_CLASSES = ['animate__animated', 'animate__fadeIn', 'animate__fadeOut']

type SidebarMotionCleanup = () => void

interface RunningMotion {
  finish: () => void
}

function motionAllowed() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function directItemsFor(item: HTMLElement) {
  return Array
    .from(item.children)
    .find((child): child is HTMLElement => child instanceof HTMLElement && child.classList.contains('items'))
}

function naturalHeight(items: HTMLElement) {
  const previousDisplay = items.style.display

  items.style.display = 'block'
  const height = items.scrollHeight

  if (previousDisplay) items.style.display = previousDisplay
  else items.style.removeProperty('display')

  return height
}

export function attachSidebarMotion(onSettled?: () => void): SidebarMotionCleanup {
  if (typeof window === 'undefined' || !motionAllowed()) return () => {}

  let sidebar = document.querySelector<HTMLElement>('.VPSidebar')
  let observer: MutationObserver | undefined
  let attachTimer: ReturnType<typeof window.setTimeout> | undefined
  let attachAttempts = 0
  let activeMotions = 0

  const collapsedStates = new WeakMap<HTMLElement, boolean>()
  const openHeights = new WeakMap<HTMLElement, number>()
  const running = new WeakMap<HTMLElement, RunningMotion>()
  const pendingInteractions = new WeakSet<HTMLElement>()

  function setMotionRoot(active: boolean) {
    activeMotions += active ? 1 : -1
    activeMotions = Math.max(activeMotions, 0)
    document.documentElement.classList.toggle('sidebar-motion-active', activeMotions > 0)
  }

  function snapshotOpenHeights() {
    if (!sidebar) return

    sidebar
      .querySelectorAll<HTMLElement>('.VPSidebarItem.collapsible:not(.collapsed) > .items')
      .forEach((items) => {
        const item = items.parentElement
        if (!(item instanceof HTMLElement)) return

        const height = items.getBoundingClientRect().height || items.scrollHeight
        if (height > 0) openHeights.set(item, height)
      })
  }

  function trackSidebarInteraction(event: Event) {
    const target = event.target
    if (target instanceof Element) {
      const item = target.closest('.VPSidebarItem.collapsible')
      if (item instanceof HTMLElement) pendingInteractions.add(item)
    }

    snapshotOpenHeights()
  }

  function primeCollapsedStates() {
    if (!sidebar) return

    sidebar.querySelectorAll<HTMLElement>('.VPSidebarItem.collapsible').forEach((item) => {
      collapsedStates.set(item, item.classList.contains('collapsed'))
    })
    snapshotOpenHeights()
  }

  function clearAnimateClasses(items: HTMLElement) {
    items.classList.remove(...ANIMATE_CLASSES)
  }

  function finishMotion(items: HTMLElement, item: HTMLElement, cleanup: () => void) {
    cleanup()
    clearAnimateClasses(items)
    items.removeAttribute('data-sidebar-motion')
    items.style.removeProperty('display')
    items.style.removeProperty('height')
    items.style.removeProperty('overflow')
    items.style.removeProperty('transition')
    items.style.removeProperty('will-change')
    items.style.removeProperty('--animate-duration')
    running.delete(items)

    if (!item.classList.contains('collapsed')) {
      const height = items.getBoundingClientRect().height || items.scrollHeight
      if (height > 0) openHeights.set(item, height)
    }

    setMotionRoot(false)
    onSettled?.()
  }

  function animateItems(item: HTMLElement, collapsed: boolean) {
    const items = directItemsFor(item)
    if (!items) return

    const wasRunning = items.hasAttribute('data-sidebar-motion')
    const currentHeight = wasRunning ? items.getBoundingClientRect().height : 0
    running.get(items)?.finish()

    const fromHeight = collapsed
      ? currentHeight || openHeights.get(item) || naturalHeight(items)
      : currentHeight
    const toHeight = collapsed ? 0 : naturalHeight(items)

    if (fromHeight === toHeight) {
      onSettled?.()
      return
    }

    const motionMs = readMotionDuration('--dur-sidebar-collapse', MOTION_DURATION)

    setMotionRoot(true)
    clearAnimateClasses(items)
    items.setAttribute('data-sidebar-motion', collapsed ? 'collapse' : 'expand')
    items.style.display = 'block'
    items.style.overflow = 'hidden'
    items.style.willChange = 'height, opacity'
    items.style.setProperty('--animate-duration', `${motionMs}ms`)
    items.style.transition = 'none'
    items.style.height = `${fromHeight}px`
    items.classList.add('animate__animated', collapsed ? 'animate__fadeOut' : 'animate__fadeIn')

    items.offsetHeight
    items.style.transition = `height ${motionMs}ms var(--ease-ios-slide)`
    items.style.height = `${toHeight}px`

    let done = false
    let timer: ReturnType<typeof window.setTimeout> | undefined

    const cleanup = () => {
      window.clearTimeout(timer)
      items.removeEventListener('transitionend', onTransitionEnd)
    }

    const finish = () => {
      if (done) return
      done = true
      finishMotion(items, item, cleanup)
    }

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === items && event.propertyName === 'height') finish()
    }

    running.set(items, { finish })
    items.addEventListener('transitionend', onTransitionEnd)
    timer = window.setTimeout(finish, motionMs + MOTION_CLEANUP_BUFFER)
  }

  function handleSidebarItemMutation(target: EventTarget | null) {
    if (!(target instanceof HTMLElement) || !target.classList.contains('VPSidebarItem')) return
    if (!target.classList.contains('collapsible')) return

    const previous = collapsedStates.get(target)
    const collapsed = target.classList.contains('collapsed')

    const shouldAnimate = previous === undefined
      ? pendingInteractions.has(target)
      : previous !== collapsed

    pendingInteractions.delete(target)
    collapsedStates.set(target, collapsed)
    if (!shouldAnimate) return

    animateItems(target, collapsed)
  }

  function attach() {
    sidebar = document.querySelector<HTMLElement>('.VPSidebar')
    if (!sidebar) {
      if (attachAttempts >= 20) return

      attachAttempts += 1
      attachTimer = window.setTimeout(() => {
        attachTimer = undefined
        attach()
      }, 100)
      return
    }

    primeCollapsedStates()
    sidebar.addEventListener('pointerdown', trackSidebarInteraction, { capture: true })
    sidebar.addEventListener('click', trackSidebarInteraction, { capture: true })
    sidebar.addEventListener('keydown', trackSidebarInteraction, { capture: true })

    observer = new MutationObserver((mutations) => {
      let sawChildList = false

      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          handleSidebarItemMutation(mutation.target)
        } else if (mutation.type === 'childList') {
          sawChildList = true
        }
      }

      if (sawChildList) {
        window.requestAnimationFrame(primeCollapsedStates)
      }
    })
    observer.observe(sidebar, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    })
  }

  attach()

  return () => {
    window.clearTimeout(attachTimer)
    observer?.disconnect()
    observer = undefined

    if (sidebar) {
      sidebar.removeEventListener('pointerdown', trackSidebarInteraction, { capture: true })
      sidebar.removeEventListener('click', trackSidebarInteraction, { capture: true })
      sidebar.removeEventListener('keydown', trackSidebarInteraction, { capture: true })
    }

    document.documentElement.classList.remove('sidebar-motion-active')
  }
}
