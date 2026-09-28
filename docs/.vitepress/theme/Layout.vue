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

  const root = document.documentElement
  const toLight = isDark.value
  let animation: Animation | undefined

  root.style.setProperty('--vt-appearance-x', `${x}px`)
  root.style.setProperty('--vt-appearance-y', `${y}px`)
  root.classList.add('vt-appearance', toLight ? 'vt-appearance-to-light' : 'vt-appearance-to-dark')

  try {
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })

    await transition.ready

    animation = root.animate(
      { clipPath: toLight ? clipPath : clipPath.reverse() },
      {
        duration: 300,
        easing: 'ease-in',
        fill: 'forwards',
        pseudoElement: `::view-transition-${toLight ? 'new' : 'old'}(root)`
      }
    )

    await Promise.allSettled([transition.finished, animation.finished])
  } finally {
    // fill: forwards 的动画不取消会一直挂在 html 上，下一次切换会作用到新生成的同名伪元素。
    animation?.cancel()
    root.classList.remove('vt-appearance', 'vt-appearance-to-light', 'vt-appearance-to-dark')
    root.style.removeProperty('--vt-appearance-x')
    root.style.removeProperty('--vt-appearance-y')
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

/* 亮色新快照在上层，JS 裁剪动画要到 ready 之后才挂上，先用 CSS 收成一个点，免得首帧整页闪亮。 */
html.vt-appearance-to-light::view-transition-new(root) {
  clip-path: circle(0px at var(--vt-appearance-x, 50%) var(--vt-appearance-y, 50%));
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
