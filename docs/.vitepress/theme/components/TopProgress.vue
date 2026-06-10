<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const visible = ref(false)
const progress = ref(0)

let trickleTimer: number | undefined
let hideTimer: number | undefined
let restoreHooks: (() => void) | undefined

function clamp(value: number) {
  return Math.max(0, Math.min(100, value))
}

function setProgress(value: number) {
  progress.value = clamp(value)
}

function stopTrickle() {
  if (trickleTimer) {
    window.clearInterval(trickleTimer)
    trickleTimer = undefined
  }
}

function startProgress() {
  window.clearTimeout(hideTimer)
  stopTrickle()

  visible.value = true
  setProgress(8)

  trickleTimer = window.setInterval(() => {
    if (progress.value >= 86) return
    setProgress(progress.value + Math.max(0.6, (86 - progress.value) * 0.07))
  }, 180)
}

function finishProgress() {
  stopTrickle()
  setProgress(100)

  hideTimer = window.setTimeout(() => {
    visible.value = false
    setProgress(0)
  }, 360)
}

onMounted(() => {
  const previousBeforeRouteChange = router.onBeforeRouteChange
  const previousBeforePageLoad = router.onBeforePageLoad
  const previousAfterPageLoad = router.onAfterPageLoad
  const previousAfterRouteChange = router.onAfterRouteChange

  router.onBeforeRouteChange = async (to) => {
    startProgress()

    try {
      const result = await previousBeforeRouteChange?.(to)
      if (result === false) finishProgress()
      return result
    } catch (error) {
      finishProgress()
      throw error
    }
  }

  router.onBeforePageLoad = async (to) => {
    if (!visible.value) startProgress()
    setProgress(Math.max(progress.value, 36))

    try {
      const result = await previousBeforePageLoad?.(to)
      if (result === false) finishProgress()
      return result
    } catch (error) {
      finishProgress()
      throw error
    }
  }

  router.onAfterPageLoad = async (to) => {
    setProgress(Math.max(progress.value, 82))
    await previousAfterPageLoad?.(to)
  }

  router.onAfterRouteChange = async (to) => {
    await previousAfterRouteChange?.(to)
    await nextTick()
    finishProgress()
  }

  if (document.readyState !== 'complete') {
    startProgress()
    window.addEventListener('load', finishProgress, { once: true })
  }

  restoreHooks = () => {
    router.onBeforeRouteChange = previousBeforeRouteChange
    router.onBeforePageLoad = previousBeforePageLoad
    router.onAfterPageLoad = previousAfterPageLoad
    router.onAfterRouteChange = previousAfterRouteChange
  }
})

onUnmounted(() => {
  restoreHooks?.()
  stopTrickle()
  window.clearTimeout(hideTimer)
  window.removeEventListener('load', finishProgress)
})
</script>

<template>
  <div class="top-progress" :class="{ visible }" aria-hidden="true">
    <div class="top-progress-track" />
    <div
      class="top-progress-fill"
      :style="{ transform: `scaleX(${progress / 100})` }"
    />
  </div>
</template>

<style scoped>
.top-progress {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1002;
  height: 3px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s ease;
}

.top-progress.visible {
  opacity: 1;
}

.top-progress-track,
.top-progress-fill {
  position: absolute;
  inset: 0;
}

.top-progress-track {
  background: rgb(130 139 153 / 28%);
}

.top-progress-fill {
  transform-origin: left center;
  background: linear-gradient(90deg, #60a5fa 0%, #8b5cf6 58%, #c084fc 100%);
  box-shadow: 0 1px 10px rgb(139 92 246 / 28%);
  transition: transform 0.24s var(--ease-ios-fade);
}

@media (max-width: 767px) {
  .top-progress {
    height: 2px;
  }
}
</style>
