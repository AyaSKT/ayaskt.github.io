<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const NAV_MENU_XYZ = 'fade small-2 up-1 stagger-1 stagger-rev-0.35 ease-out'
const NAV_MENU_CLOSE_DELAY_FALLBACK = 50
const NAV_MENU_OUT_DURATION_FALLBACK = 220
const NAV_MENU_ITEM_SELECTOR = [
  '.VPMenu .items > *',
  '.VPMenu > .group',
  '.VPMenu .item',
  '.VPMenu .title',
  '.VPMenu .trans-title',
].join(', ')

let frame = 0
let fallbackTimer: number | undefined
let stopRouteWatch: (() => void) | undefined
let navFlyoutCleanups: Array<() => void> = []

function motionEnabled() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

function parseDurationToMs(value: string, fallback: number) {
  const duration = value.trim()
  if (!duration) return fallback

  const amount = Number.parseFloat(duration)
  if (!Number.isFinite(amount)) return fallback

  if (duration.endsWith('ms')) return amount
  if (duration.endsWith('s')) return amount * 1000

  return fallback
}

function getNavMenuCloseDelay(flyout: HTMLElement) {
  const delay = window
    .getComputedStyle(flyout)
    .getPropertyValue('--dur-menu-close-delay')

  return parseDurationToMs(delay, NAV_MENU_CLOSE_DELAY_FALLBACK)
}

function getNavMenuOutDuration(flyout: HTMLElement) {
  const duration = window
    .getComputedStyle(flyout)
    .getPropertyValue('--dur-menu-out')

  return parseDurationToMs(duration, NAV_MENU_OUT_DURATION_FALLBACK)
}

function resetManagedMotion() {
  document.querySelectorAll<HTMLElement>('.aya-xyz-root').forEach((root) => {
    root.classList.remove('xyz-in')
  })

  document.querySelectorAll<HTMLElement>('.aya-xyz-nested').forEach((item) => {
    item.classList.remove('xyz-nested', 'aya-xyz-nested')
    item.style.removeProperty('--xyz-index')
    item.style.removeProperty('--xyz-index-rev')
  })

  document.querySelectorAll<HTMLElement>('.aya-nav-menu-motion').forEach((menu) => {
    menu.classList.remove('xyz-in', 'xyz-out')
  })
}

function visibleElement(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight * 1.35
}

function applyXyzGroup(root: HTMLElement, items: HTMLElement[], xyz: string) {
  const motionItems = items.filter(visibleElement)
  if (!motionItems.length) return

  root.setAttribute('xyz', xyz)
  root.classList.add('aya-xyz-root')
  root.classList.remove('xyz-in')

  motionItems.forEach((item, index) => {
    item.classList.add('xyz-nested', 'aya-xyz-nested')
    item.style.setProperty('--xyz-index', String(index))
    item.style.setProperty('--xyz-index-rev', String(motionItems.length - index - 1))
  })

  root.offsetHeight
  root.classList.add('xyz-in')
}

function enhanceHome() {
  const courseActions = document.querySelector<HTMLElement>('.home-course-actions')
  if (courseActions) {
    const courseItems = Array
      .from(courseActions.querySelectorAll<HTMLElement>('.home-course-group-title, .home-course-button'))
      .slice(0, 18)
    applyXyzGroup(courseActions, courseItems, 'fade left-1 duration-6 stagger-0 stagger-rev-0.5 ease-out')
  }
}

function isNavFlyoutOpen(flyout: HTMLElement, button: HTMLElement) {
  return button.getAttribute('aria-expanded') === 'true'
    || flyout.matches(':hover')
}

function applyNavMenuItems(menu: HTMLElement) {
  const items = Array
    .from(menu.querySelectorAll<HTMLElement>(NAV_MENU_ITEM_SELECTOR))
    .slice(0, 24)

  items.forEach((item, index) => {
    item.classList.add('xyz-nested', 'aya-nav-menu-motion-item')
    item.style.setProperty('--xyz-index', String(index))
    item.style.setProperty('--xyz-index-rev', String(items.length - index - 1))
  })
}

function setNavMenuState(menu: HTMLElement, open: boolean, animate = true) {
  menu.dataset.ayaNavMenuState = open ? 'open' : 'closed'

  if (!motionEnabled()) {
    menu.classList.remove('xyz-in', 'xyz-out')
    return
  }

  const nextClass = open ? 'xyz-in' : 'xyz-out'
  const previousClass = open ? 'xyz-out' : 'xyz-in'

  menu.classList.remove(previousClass, nextClass)
  if (!animate && !open) return

  menu.offsetHeight
  menu.classList.add(nextClass)
}

function setNavMenuClosing(menu: HTMLElement) {
  menu.dataset.ayaNavMenuState = 'closing'

  if (!motionEnabled()) {
    menu.classList.remove('xyz-in', 'xyz-out')
    return
  }

  menu.classList.remove('xyz-in', 'xyz-out')
  menu.offsetHeight
  menu.classList.add('xyz-out')
}

/* 打开任意菜单时立即无动画关闭其他所有菜单，避免横向划过导航时
   多个下拉面板重叠（旧菜单还在退场、新菜单已打开）。 */
function forceCloseOtherNavMenus(exceptMenu: HTMLElement) {
  document.querySelectorAll<HTMLElement>('.VPNavBar .VPFlyout').forEach((other) => {
    const otherMenu = other.querySelector<HTMLElement>(':scope > .menu')
    if (!otherMenu || otherMenu === exceptMenu) return

    const otherButton = other.querySelector<HTMLElement>(':scope > .button')
    if (otherButton) otherButton.setAttribute('aria-expanded', 'false')

    otherMenu.dataset.ayaNavMenuState = 'closed'
    otherMenu.classList.remove('xyz-in', 'xyz-out')
  })
}

function enhanceNavFlyout(flyout: HTMLElement) {
  if (flyout.dataset.ayaNavMotion === 'ready') return

  const button = flyout.querySelector<HTMLElement>(':scope > .button')
  const menu = flyout.querySelector<HTMLElement>(':scope > .menu')
  if (!button || !menu) return

  flyout.dataset.ayaNavMotion = 'ready'
  menu.setAttribute('xyz', NAV_MENU_XYZ)
  menu.classList.add('aya-nav-menu-motion')
  applyNavMenuItems(menu)

  let isOpen = isNavFlyoutOpen(flyout, button)
  setNavMenuState(menu, isOpen, isOpen)

  let syncFrame = 0
  let closeTimer: number | undefined
  let closeAnimationTimer: number | undefined
  const clearCloseTimer = () => {
    if (!closeTimer) return

    window.clearTimeout(closeTimer)
    closeTimer = undefined
  }
  const clearCloseAnimationTimer = () => {
    if (!closeAnimationTimer) return

    window.clearTimeout(closeAnimationTimer)
    closeAnimationTimer = undefined
  }
  const syncState = () => {
    syncFrame = 0
    const nextOpen = isNavFlyoutOpen(flyout, button)

    if (!nextOpen && menu.dataset.ayaNavMenuState === 'closed') {
      isOpen = false
      clearCloseTimer()
      clearCloseAnimationTimer()
      return
    }

    if (nextOpen) {
      clearCloseTimer()
      clearCloseAnimationTimer()
      forceCloseOtherNavMenus(menu)
      if (isOpen && menu.dataset.ayaNavMenuState !== 'closed') return

      isOpen = true
      setNavMenuState(menu, true)
      return
    }

    if (!isOpen || closeTimer) return

    closeTimer = window.setTimeout(() => {
      closeTimer = undefined
      if (isNavFlyoutOpen(flyout, button)) return
      if (menu.dataset.ayaNavMenuState === 'closed') return

      isOpen = false
      setNavMenuClosing(menu)

      closeAnimationTimer = window.setTimeout(() => {
        closeAnimationTimer = undefined
        if (isNavFlyoutOpen(flyout, button)) return

        setNavMenuState(menu, false, false)
      }, getNavMenuOutDuration(flyout))
    }, getNavMenuCloseDelay(flyout))
  }
  const scheduleSync = () => {
    if (syncFrame) window.cancelAnimationFrame(syncFrame)
    syncFrame = window.requestAnimationFrame(syncState)
  }

  const buttonObserver = new MutationObserver(scheduleSync)
  buttonObserver.observe(button, { attributes: true, attributeFilter: ['aria-expanded'] })

  const menuObserver = new MutationObserver(() => {
    applyNavMenuItems(menu)
  })
  menuObserver.observe(menu, { childList: true, subtree: true })

  flyout.addEventListener('mouseenter', scheduleSync)
  flyout.addEventListener('mouseleave', scheduleSync)
  flyout.addEventListener('focusin', scheduleSync)
  flyout.addEventListener('focusout', scheduleSync)
  button.addEventListener('click', scheduleSync)

  navFlyoutCleanups.push(() => {
    buttonObserver.disconnect()
    menuObserver.disconnect()
    clearCloseTimer()
    clearCloseAnimationTimer()
    if (syncFrame) window.cancelAnimationFrame(syncFrame)

    flyout.removeEventListener('mouseenter', scheduleSync)
    flyout.removeEventListener('mouseleave', scheduleSync)
    flyout.removeEventListener('focusin', scheduleSync)
    flyout.removeEventListener('focusout', scheduleSync)
    button.removeEventListener('click', scheduleSync)

    delete flyout.dataset.ayaNavMotion
    delete menu.dataset.ayaNavMenuState
    menu.removeAttribute('xyz')
    menu.classList.remove('aya-nav-menu-motion', 'xyz-in', 'xyz-out')
    menu.querySelectorAll<HTMLElement>('.aya-nav-menu-motion-item').forEach((item) => {
      item.classList.remove('xyz-nested', 'aya-nav-menu-motion-item')
      item.style.removeProperty('--xyz-index')
      item.style.removeProperty('--xyz-index-rev')
    })
  })
}

function enhanceNavFlyouts() {
  document
    .querySelectorAll<HTMLElement>('.VPNavBar .VPFlyout')
    .forEach(enhanceNavFlyout)
}

function cleanupNavFlyouts() {
  navFlyoutCleanups.forEach((cleanup) => cleanup())
  navFlyoutCleanups = []
}

async function runLibraryMotion() {
  if (!motionEnabled()) {
    resetManagedMotion()
    return
  }

  await nextTick()
  resetManagedMotion()
  enhanceHome()
  enhanceNavFlyouts()
}

function scheduleLibraryMotion(delay = 0) {
  window.clearTimeout(fallbackTimer)

  fallbackTimer = window.setTimeout(() => {
    fallbackTimer = undefined

    if (frame) window.cancelAnimationFrame(frame)
    frame = window.requestAnimationFrame(() => {
      frame = 0
      void runLibraryMotion()
    })
  }, delay)
}

function onTransitionDone() {
  scheduleLibraryMotion()
}

onMounted(() => {
  scheduleLibraryMotion()
  window.addEventListener('vt-transition-done', onTransitionDone)

  stopRouteWatch = watch(
    () => route.path,
    () => {
      scheduleLibraryMotion(720)
    },
    { flush: 'post' }
  )
})

onUnmounted(() => {
  window.removeEventListener('vt-transition-done', onTransitionDone)
  stopRouteWatch?.()
  window.clearTimeout(fallbackTimer)

  if (frame) {
    window.cancelAnimationFrame(frame)
    frame = 0
  }

  cleanupNavFlyouts()
})
</script>

<template>
  <div style="display: none" />
</template>
