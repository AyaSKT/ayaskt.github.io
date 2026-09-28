<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const visible = ref(false)
const progress = ref(0)

const IMAGE_PROGRESS_START = 82
const IMAGE_PROGRESS_END = 96
const IMAGE_WAIT_TIMEOUT = 12000

let trickleTimer: number | undefined
let hideTimer: number | undefined
let stopImageTracking: (() => void) | undefined
let restoreHooks: (() => void) | undefined
let initialLoadHandler: (() => void) | undefined
let progressSession = 0

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

function clearImageTracking() {
  const stop = stopImageTracking
  stopImageTracking = undefined
  stop?.()
}

function startProgress() {
  progressSession += 1
  clearImageTracking()
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
  clearImageTracking()
  stopTrickle()
  setProgress(100)

  hideTimer = window.setTimeout(() => {
    visible.value = false
    setProgress(0)
  }, 360)
}

function isTrackableImage(image: HTMLImageElement) {
  if (!image.isConnected) return false
  if (!image.getAttribute('src') && !image.getAttribute('srcset') && !image.currentSrc) return false
  if (image.classList.contains('hero-preload')) return false
  if (image.closest('.hero-preload, [aria-hidden="true"], [hidden]')) return false
  if (!image.closest('.VPDoc, .VPHome, .VPHero, main')) return false

  if (image.loading === 'lazy' && !image.complete) {
    const rect = image.getBoundingClientRect()
    const preloadDistance = window.innerHeight * 2
    if (rect.bottom < -preloadDistance || rect.top > window.innerHeight + preloadDistance) {
      return false
    }
  }

  return true
}

function getPageImages() {
  return Array.from(document.images).filter(isTrackableImage)
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

function waitForPageImages(session: number) {
  clearImageTracking()

  const images = getPageImages()
  if (!images.length) return Promise.resolve()

  let completed = 0
  let settled = false
  let timeout: number | undefined
  const removeListeners: (() => void)[] = []

  return new Promise<void>((resolve) => {
    let stop: () => void

    const cleanup = () => {
      for (const removeListener of removeListeners) removeListener()
      if (timeout) {
        window.clearTimeout(timeout)
        timeout = undefined
      }
    }

    const finish = () => {
      if (settled) return
      settled = true
      if (stopImageTracking === stop) stopImageTracking = undefined
      cleanup()
      resolve()
    }

    const updateImageProgress = () => {
      if (session !== progressSession) {
        finish()
        return
      }

      const ratio = completed / images.length
      const imageProgress = IMAGE_PROGRESS_START + (IMAGE_PROGRESS_END - IMAGE_PROGRESS_START) * ratio
      setProgress(Math.max(progress.value, imageProgress))

      if (completed >= images.length) finish()
    }

    stop = () => {
      finish()
    }

    for (const image of images) {
      if (image.complete) {
        completed += 1
        continue
      }

      let imageSettled = false
      const markComplete = () => {
        if (imageSettled) return
        imageSettled = true
        completed += 1
        updateImageProgress()
      }

      image.addEventListener('load', markComplete, { once: true })
      image.addEventListener('error', markComplete, { once: true })
      removeListeners.push(() => {
        imageSettled = true
        image.removeEventListener('load', markComplete)
        image.removeEventListener('error', markComplete)
      })
    }

    stopImageTracking = stop
    timeout = window.setTimeout(finish, IMAGE_WAIT_TIMEOUT)
    updateImageProgress()
  })
}

async function finishAfterPageImages(session = progressSession) {
  stopTrickle()
  setProgress(Math.max(progress.value, IMAGE_PROGRESS_START))

  await nextTick()
  await nextFrame()
  if (session !== progressSession) return

  await waitForPageImages(session)
  if (session !== progressSession) return

  finishProgress()
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
    setProgress(Math.max(progress.value, IMAGE_PROGRESS_START))
    await previousAfterPageLoad?.(to)
  }

  router.onAfterRouteChange = (to) => {
    void Promise
      .resolve(previousAfterRouteChange?.(to))
      .then(() => finishAfterPageImages())
  }

  if (document.readyState !== 'complete') {
    startProgress()
    const initialSession = progressSession
    initialLoadHandler = () => {
      void finishAfterPageImages(initialSession)
      initialLoadHandler = undefined
    }
    window.addEventListener('load', initialLoadHandler, { once: true })
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
  clearImageTracking()
  stopTrickle()
  window.clearTimeout(hideTimer)
  if (initialLoadHandler) {
    window.removeEventListener('load', initialLoadHandler)
    initialLoadHandler = undefined
  }
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
  background: linear-gradient(
    90deg,
    var(--aya-gradient-start) 0%,
    var(--aya-gradient-middle) 58%,
    var(--aya-gradient-end) 100%
  );
  box-shadow: 0 1px 10px color-mix(in srgb, var(--aya-gradient-middle) 32%, transparent);
  transition: transform 0.24s var(--ease-ios-fade);
}

@media (max-width: 767px) {
  .top-progress {
    height: 2px;
  }
}
</style>
