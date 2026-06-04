<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(defineProps<{
  words: number
  minutes: number
  author: string
  pdf?: boolean
}>(), {
  pdf: true
})

const { page, theme } = useData()

const showPdfMenu = ref(false)
const pdfMenuRef = ref<HTMLElement | null>(null)
let cleanupTimer: ReturnType<typeof window.setTimeout> | undefined
let originalTitle = ''

const wordText = computed(() => props.words.toLocaleString('zh-CN'))

const lastUpdatedText = computed(() => {
  if (!page.value.lastUpdated) return ''

  const date = new Date(page.value.lastUpdated)
  const formatOptions = theme.value.lastUpdated?.formatOptions ?? {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  const locale = theme.value.lastUpdated?.formatOptions?.forceLocale ?? 'zh-CN'

  return new Intl.DateTimeFormat(locale, formatOptions).format(date)
})

function closePdfMenu() {
  showPdfMenu.value = false
}

function togglePdfMenu() {
  showPdfMenu.value = !showPdfMenu.value
}

function clearPdfTheme() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  document.documentElement.removeAttribute('data-pdf-theme')
  if (originalTitle) {
    document.title = originalTitle
    originalTitle = ''
  }
  window.removeEventListener('afterprint', clearPdfTheme)

  if (cleanupTimer) {
    window.clearTimeout(cleanupTimer)
    cleanupTimer = undefined
  }
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!pdfMenuRef.value?.contains(event.target as Node)) closePdfMenu()
}

async function printPdf(themeName: 'light' | 'dark') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  closePdfMenu()
  if (typeof window.print !== 'function') return

  originalTitle = document.title
  document.title = ''
  document.documentElement.setAttribute('data-pdf-theme', themeName)
  window.addEventListener('afterprint', clearPdfTheme, { once: true })

  await nextTick()
  window.print()

  cleanupTimer = window.setTimeout(clearPdfTheme, 1500)
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  clearPdfTheme()
})
</script>

<template>
  <div class="doc-meta" @keydown.escape="closePdfMenu">
    <div class="doc-meta-row">
      <div class="doc-meta-main">
        <span>字数 {{ wordText }}</span>
        <span class="doc-meta-sep">｜</span>
        <span>阅读时间 {{ minutes }} 分钟</span>
        <span class="doc-meta-sep">｜</span>
        <span>{{ author }}</span>
      </div>

      <div v-if="pdf" ref="pdfMenuRef" class="doc-meta-pdf">
        <button
          class="doc-meta-pdf-trigger"
          type="button"
          aria-haspopup="menu"
          :aria-expanded="showPdfMenu"
          @click="togglePdfMenu"
        >
          下载 PDF
          <span class="doc-meta-pdf-caret" aria-hidden="true">⌄</span>
        </button>
        <div v-if="showPdfMenu" class="doc-meta-pdf-menu" role="menu">
          <button type="button" role="menuitem" @click="printPdf('light')">白色 PDF</button>
          <button type="button" role="menuitem" @click="printPdf('dark')">黑色 PDF</button>
        </div>
      </div>
    </div>

    <div v-if="lastUpdatedText" class="doc-meta-updated">
      最后更新：{{ lastUpdatedText }}
    </div>
  </div>
</template>

<style scoped>
.doc-meta {
  margin: 14px 0 30px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 18px;
  line-height: 1.55;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.doc-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.doc-meta-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.doc-meta-updated {
  margin-top: 4px;
}

.doc-meta-sep {
  color: var(--vp-c-divider);
}

.doc-meta-pdf {
  position: relative;
  flex: 0 0 auto;
}

.doc-meta-pdf-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 9px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font: inherit;
  line-height: 1.35;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.doc-meta-pdf-trigger:hover,
.doc-meta-pdf-trigger:focus-visible {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  outline: none;
}

.doc-meta-pdf-caret {
  font-size: 12px;
  line-height: 1;
}

.doc-meta-pdf-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 30;
  min-width: 112px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-2);
}

.doc-meta-pdf-menu button {
  display: block;
  width: 100%;
  border: 0;
  padding: 7px 10px;
  background: transparent;
  color: var(--vp-c-text-2);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.doc-meta-pdf-menu button:hover,
.doc-meta-pdf-menu button:focus-visible {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
  outline: none;
}

@media (max-width: 640px) {
  .doc-meta-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .doc-meta-pdf-menu {
    right: auto;
    left: 0;
  }
}
</style>
