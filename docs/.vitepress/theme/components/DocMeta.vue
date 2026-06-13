<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import { formatResolvedLastUpdated } from '../doc-meta-date.mjs'

const props = withDefaults(defineProps<{
  words: number
  minutes: number
  author: string
  pdf?: boolean
}>(), {
  pdf: true
})

const { page, frontmatter } = useData()

let cleanupTimer: ReturnType<typeof window.setTimeout> | undefined
let originalTitle = ''

const wordText = computed(() => props.words.toLocaleString('zh-CN'))

const lastUpdatedText = computed(() => {
  return formatResolvedLastUpdated(
    frontmatter.value.lastUpdated,
    page.value.lastUpdated
  )
})

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

async function printPdf() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  if (typeof window.print !== 'function') return

  originalTitle = document.title
  document.title = ''
  document.documentElement.setAttribute('data-pdf-theme', 'light')
  window.addEventListener('afterprint', clearPdfTheme, { once: true })

  await nextTick()
  window.print()

  cleanupTimer = window.setTimeout(clearPdfTheme, 1500)
}

onBeforeUnmount(() => {
  clearPdfTheme()
})
</script>

<template>
  <div class="doc-meta">
    <div class="doc-meta-row">
      <div class="doc-meta-main">
        <span>字数 {{ wordText }}</span>
        <span class="doc-meta-sep">｜</span>
        <span>阅读时间 {{ minutes }} 分钟</span>
        <span class="doc-meta-sep">｜</span>
        <span>{{ author }}</span>
      </div>

      <div v-if="pdf" class="doc-meta-pdf">
        <button
          class="doc-meta-pdf-trigger"
          type="button"
          @click="printPdf"
        >
          下载 PDF
        </button>
      </div>
    </div>

    <div v-if="lastUpdatedText" class="doc-meta-updated">
      {{ lastUpdatedText }}
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
  display: inline;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  cursor: pointer;
}

.doc-meta-pdf-trigger:hover,
.doc-meta-pdf-trigger:focus-visible {
  color: var(--vp-c-brand-1);
  outline: none;
}

@media (max-width: 640px) {
  .doc-meta-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
