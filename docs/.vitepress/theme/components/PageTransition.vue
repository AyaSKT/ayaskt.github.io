<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vitepress'

const { go } = useRouter()

function isInternalLink(el: Element): HTMLAnchorElement | null {
  const a = el.closest('a')
  if (!a) return null
  const href = a.getAttribute('href')
  if (!href) return null
  if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return null
  if (a.getAttribute('role') === 'button') return null
  return a
}

function handleClick(e: MouseEvent) {
  const a = isInternalLink(e.target as Element)
  if (!a) return
  const href = a.getAttribute('href')!
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

  e.preventDefault()

  if ('startViewTransition' in document) {
    ;(document as any).startViewTransition(async () => {
      // navigate first, then wait one tick for Vue to flush DOM
      await go(href)
      await nextTick()
    })
  } else {
    go(href)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick, { capture: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick, { capture: true })
})
</script>

<template>
  <div style="display: none" />
</template>
