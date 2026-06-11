<script setup lang="ts">
import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'
import MyLayout from './components/MyLayout.vue'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

function appearanceCenter(event: MouseEvent) {
  if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
    return {
      x: event.clientX,
      y: event.clientY
    }
  }

  const target = event.target as Element | null
  const switchEl = target?.closest('.VPSwitchAppearance')
    ?? target?.closest('.VPNavBarAppearance')?.querySelector('.VPSwitchAppearance')
    ?? target?.closest('.VPNavScreenAppearance')?.querySelector('.VPSwitchAppearance')
    ?? document.querySelector('.VPNavBarAppearance .VPSwitchAppearance')
    ?? document.querySelector('.VPNavScreenAppearance .VPSwitchAppearance')

  if (switchEl instanceof HTMLElement) {
    const rect = switchEl.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
}

provide('toggle-appearance', async (event: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const { x, y } = appearanceCenter(event)
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  document.documentElement.classList.add('vt-appearance')

  try {
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })

    await transition.ready

    const animation = document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        fill: 'forwards',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
      }
    )

    await Promise.allSettled([transition.finished, animation.finished])
  } finally {
    document.documentElement.classList.remove('vt-appearance')
  }
})
</script>

<template>
  <MyLayout />
</template>

<style>
::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
