<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'

const { route, go } = useRouter()

function isInternalLink(el: Element): HTMLAnchorElement | null {
  const a = el.closest('a')
  if (!a) return null
  const href = a.getAttribute('href')
  if (!href) return null
  // Skip external, hash-only, and non-http links
  if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return null
  // Skip sidebar toggle and UI chrome
  if (a.getAttribute('role') === 'button') return null
  if (a.closest('.VPSidebar') && !href) return null
  return a
}

function handleClick(e: MouseEvent) {
  const a = isInternalLink(e.target as Element)
  if (!a) return
  const href = a.getAttribute('href')!
  // Don't intercept modifier-click (new tab), right-click, etc.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

  e.preventDefault()

  if ('startViewTransition' in document) {
    ;(document as any).startViewTransition(async () => {
      await go(href)
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
