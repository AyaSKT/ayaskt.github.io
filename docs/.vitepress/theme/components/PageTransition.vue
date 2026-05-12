<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
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
  return a
}

async function handleClick(e: MouseEvent) {
  const a = isInternalLink(e.target as Element)
  if (!a) return
  const href = a.getAttribute('href')!
  // Don't intercept modifier-click (new tab), right-click, etc.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

  e.preventDefault()

  if ('startViewTransition' in document) {
    // Resolve target path for matching
    const targetPath = new URL(href, window.location.origin).pathname

    ;(document as any).startViewTransition(async () => {
      go(href)
      // Wait for route to land on the target path
      await new Promise<void>(resolve => {
        if (route.path === targetPath) return resolve()
        const unwatch = watch(() => route.path, (p) => {
          if (p === targetPath) { unwatch(); resolve() }
        })
      })
      // Flush Vue render + 2 frames for paint
      await nextTick()
      await new Promise(r => requestAnimationFrame(r))
      await new Promise(r => requestAnimationFrame(r))
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
