<template>
  <div
    v-if="toast.visible"
    class="math-copy-toast"
    :style="{ left: toast.x + 'px', top: toast.y + 'px' }"
    role="status"
    aria-live="polite"
  >
    {{ toast.text }}
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'

const toast = reactive({
  visible: false,
  text: '已复制 LaTeX',
  x: 0,
  y: 0,
})

let hideTimer: ReturnType<typeof window.setTimeout> | undefined

function findMathContainer(target: EventTarget | null) {
  let node = target instanceof Node ? target : null

  while (node) {
    if (
      node instanceof HTMLElement &&
      node.tagName.toLowerCase() === 'mjx-container' &&
      node.getAttribute('jax') === 'SVG'
    ) {
      return node
    }
    node = node.parentNode
  }

  return null
}

function getLatex(container: HTMLElement) {
  const mathNode = container.querySelector('[data-mml-node="math"][data-latex]')
  return mathNode?.getAttribute('data-latex')?.trim() ?? ''
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.left = '-9999px'
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  input.remove()
}

function showToast(event: MouseEvent, text: string) {
  if (hideTimer) window.clearTimeout(hideTimer)

  toast.text = text
  toast.x = event.clientX
  toast.y = event.clientY + 16
  toast.visible = true

  hideTimer = window.setTimeout(() => {
    toast.visible = false
  }, 1300)
}

async function handleClick(event: MouseEvent) {
  const container = findMathContainer(event.target)
  if (!container) return

  const latex = getLatex(container)
  if (!latex) return

  try {
    await copyText(latex)
    showToast(event, '已复制 LaTeX')
  } catch {
    showToast(event, '复制失败')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
  if (hideTimer) window.clearTimeout(hideTimer)
})
</script>

<style scoped>
.math-copy-toast {
  position: fixed;
  z-index: 999998;
  pointer-events: none;
  transform: translateX(-50%);
  padding: 7px 12px;
  border-radius: 6px;
  color: #fff;
  background: rgba(30, 30, 34, 0.88);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 13px;
  line-height: 1.2;
  white-space: nowrap;
  animation: math-copy-toast-in 0.16s ease-out;
}

@keyframes math-copy-toast-in {
  from {
    opacity: 0;
    transform: translate(-50%, -4px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
