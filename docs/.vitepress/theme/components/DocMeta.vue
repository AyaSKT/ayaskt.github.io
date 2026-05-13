<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  words: number
  minutes: number
  author: string
}>()

const { page, theme } = useData()

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
</script>

<template>
  <div class="doc-meta">
    <div class="doc-meta-main">
      <span>字数 {{ wordText }}</span>
      <span class="doc-meta-sep">｜</span>
      <span>阅读时间 {{ minutes }} 分钟</span>
      <span class="doc-meta-sep">｜</span>
      <span>{{ author }}</span>
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

.doc-meta-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.doc-meta-updated {
  margin-top: 4px;
}

.doc-meta-sep {
  color: var(--vp-c-divider);
}
</style>
