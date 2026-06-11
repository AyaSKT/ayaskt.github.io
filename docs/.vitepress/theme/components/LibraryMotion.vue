<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

let frame = 0
let fallbackTimer: number | undefined
let stopRouteWatch: (() => void) | undefined

function motionEnabled() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
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

async function runLibraryMotion() {
  if (!motionEnabled()) {
    resetManagedMotion()
    return
  }

  await nextTick()
  resetManagedMotion()
  enhanceHome()
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
})
</script>

<template>
  <div style="display: none" />
</template>
