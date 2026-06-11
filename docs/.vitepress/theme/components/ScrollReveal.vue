<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('reveal-visible', 'xyz-in')
          observer?.unobserve(el)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  // Observe all elements with data-reveal attribute
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    const element = el as HTMLElement
    element.setAttribute('xyz', element.getAttribute('xyz') ?? 'fade duration-6 ease-out')
    element.classList.add('reveal-hidden')
    element.style.setProperty('--xyz-index', String(i))
    element.style.setProperty('--xyz-stagger', '60ms')
    observer?.observe(element)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div style="display: none" />
</template>
