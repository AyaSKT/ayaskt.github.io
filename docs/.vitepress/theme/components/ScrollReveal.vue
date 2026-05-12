<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('reveal-visible')
          observer?.unobserve(el)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  // Observe all elements with data-reveal attribute
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    ;(el as HTMLElement).classList.add('reveal-hidden')
    ;(el as HTMLElement).style.setProperty('--reveal-i', String(i))
    ;(el as HTMLElement).style.transitionDelay = `calc(var(--reveal-i) * 60ms)`
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div style="display: none" />
</template>
