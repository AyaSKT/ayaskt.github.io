<template>
  <div ref="rippleRoot" style="position: fixed; inset: 0; pointer-events: none; z-index: 999997" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const rippleRoot = ref<HTMLElement | null>(null)

function createRipple(x: number, y: number) {
  const ring = document.createElement('span')
  ring.className = 'ripple-ring'
  ring.style.left = x + 'px'
  ring.style.top = y + 'px'
  rippleRoot.value?.appendChild(ring)
  ring.addEventListener('animationend', () => ring.remove())
}

function handleClick(e: MouseEvent | TouchEvent) {
  const x = 'touches' in e ? e.touches[0].clientX : e.clientX
  const y = 'touches' in e ? e.touches[0].clientY : e.clientY
  createRipple(x, y)
}

onMounted(() => {
  window.addEventListener('click', handleClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClick)
})
</script>
