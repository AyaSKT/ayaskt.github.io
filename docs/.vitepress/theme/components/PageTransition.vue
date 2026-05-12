<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { useRouter } from 'vitepress'

const { route } = useRouter()
const transition = ref<'pop-in' | 'pop-out' | 'slide' | 'fade' | ''>('')
const visible = ref(false)

function classify(from: string, to: string): 'pop-in' | 'pop-out' | 'slide' | 'fade' {
  const isHome = (p: string) => p === '/' || p === '/index' || p === '/index.html' || p === ''
  const fromHome = isHome(from)
  const toHome = isHome(to)

  if (fromHome && !toHome) return 'pop-in'
  if (!fromHome && toHome) return 'pop-out'
  if (!fromHome && !toHome) return 'slide'
  return 'fade'
}

watch(
  () => route.path,
  (to, from) => {
    const type = classify(from, to)
    transition.value = type
    visible.value = true
    nextTick(() => {
      // Trigger removal after animation completes
      setTimeout(() => {
        visible.value = false
        transition.value = ''
      }, 450)
    })
  }
)
</script>

<template>
  <div
    v-if="visible"
    class="page-transition-overlay"
    :class="transition"
    aria-hidden="true"
  />
</template>
