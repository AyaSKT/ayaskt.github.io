<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  original?: string
  translation?: string
  translationLang?: string
}>(), {
  original: '',
  translation: '',
  translationLang: 'zh-CN',
})

const slots = useSlots()

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderRubyShorthand(value: string) {
  const rubyPattern = /(?:[|｜]([\p{Script=Han}々〆ヵヶぁ-ゖァ-ヺー]+)|([\p{Script=Han}々〆ヵヶ]+|[ぁ-ゖァ-ヺー]+))\(([^()\n]+)\)/gu
  let rendered = ''
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = rubyPattern.exec(value)) !== null) {
    const base = match[1] || match[2] || ''
    const reading = match[3] || ''

    rendered += escapeHtml(value.slice(cursor, match.index))
    rendered += `<ruby>${escapeHtml(base)}<rt>${escapeHtml(reading)}</rt></ruby>`
    cursor = rubyPattern.lastIndex
  }

  rendered += escapeHtml(value.slice(cursor))
  return rendered
}

const originalHtml = computed(() => renderRubyShorthand(props.original))
const hasOriginalSlot = computed(() => Boolean(slots.default))
const hasTranslation = computed(() => Boolean(props.translation || slots.translation))
</script>

<template>
  <div class="lyric-line">
    <div class="lyric-line-original">
      <slot v-if="hasOriginalSlot" />
      <span v-else v-html="originalHtml"></span>
    </div>

    <div v-if="hasTranslation" class="lyric-line-translation" :lang="props.translationLang">
      <slot name="translation">{{ props.translation }}</slot>
    </div>
  </div>
</template>

<style scoped>
.lyric-line {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.lyric-line + .lyric-line {
  margin-top: 14px;
}

.lyric-line-original {
  min-width: 0;
  color: var(--vp-c-text-1);
  font-family: var(--lyric-line-original-serif, var(--lyric-card-serif, 'Noto Serif CJK SC', 'Noto Serif SC', 'Songti SC', serif));
  font-size: 1.12rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.82;
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.lyric-line-translation {
  min-width: 0;
  color: var(--vp-c-text-2);
  font-family: 'Noto Serif CJK SC', 'Noto Serif SC', 'Songti SC', serif;
  font-language-override: 'ZHS';
  font-size: 0.96rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.58;
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.lyric-line-original :deep(p),
.lyric-line-translation :deep(p) {
  margin: 0;
}

.lyric-line-original :deep(ruby) {
  ruby-position: over;
}

.lyric-line-original :deep(rt) {
  color: var(--vp-c-text-3);
  font-family: var(--lyric-line-original-serif, var(--lyric-card-serif, 'Noto Serif CJK JP', 'Noto Serif JP', serif));
  font-size: 0.58em;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.2;
  text-align: center;
  transform: none;
  transition:
    color 0.2s ease,
    font-size 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
}

@media (max-width: 480px) {
  .lyric-line-original {
    font-size: 1.05rem;
    line-height: 1.86;
  }

  .lyric-line-translation {
    font-size: 0.9rem;
  }
}
</style>
