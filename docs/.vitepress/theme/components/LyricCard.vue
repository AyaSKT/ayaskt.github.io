<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

type TitleStyle =
  | 'auto'
  | 'plain'
  | 'italic'
  | 'cn-book'
  | 'ja-kagi'
  | 'ja-double-kagi'
  | 'guillemet'
  | 'french-guillemet'
  | 'double-quote'
  | 'single-quote'
  | 'german-quote'

const props = withDefaults(defineProps<{
  title: string
  artist?: string
  lang?: string
  titleStyle?: TitleStyle
  titlePrefix?: string
  titleSuffix?: string
  qqUrl?: string
  qq?: string
  neteaseUrl?: string
  netease?: string
  defaultFurigana?: boolean
  forceFurigana?: boolean
  furigana?: 'auto' | 'open' | 'show' | 'hide' | 'none'
}>(), {
  artist: '',
  lang: 'auto',
  titleStyle: 'auto',
  qqUrl: '',
  qq: '',
  neteaseUrl: '',
  netease: '',
  defaultFurigana: false,
  forceFurigana: false,
  furigana: 'auto',
})

const userFuriganaVisible = ref(props.defaultFurigana || props.furigana === 'open')

const normalizedLang = computed(() => props.lang.trim().toLowerCase())

function autoTitleStyle(lang: string): TitleStyle {
  if (lang.startsWith('zh')) return 'cn-book'
  if (lang.startsWith('ja')) return 'ja-kagi'
  if (lang.startsWith('ru') || lang.startsWith('uk') || lang.startsWith('bg') || lang.startsWith('sr')) {
    return 'guillemet'
  }
  if (lang.startsWith('fr')) return 'french-guillemet'
  if (lang.startsWith('de')) return 'german-quote'
  if (lang.startsWith('es') || lang.startsWith('it') || lang.startsWith('pt')) return 'guillemet'
  if (lang.startsWith('en')) return 'italic'

  return 'plain'
}

const resolvedTitleStyle = computed<TitleStyle>(() => {
  return props.titleStyle === 'auto' ? autoTitleStyle(normalizedLang.value) : props.titleStyle
})

const titleMarks = computed(() => {
  const style = resolvedTitleStyle.value

  const marks: Record<TitleStyle, [string, string]> = {
    auto: ['', ''],
    plain: ['', ''],
    italic: ['', ''],
    'cn-book': ['《', '》'],
    'ja-kagi': ['「', '」'],
    'ja-double-kagi': ['『', '』'],
    guillemet: ['«', '»'],
    'french-guillemet': ['«\u202f', '\u202f»'],
    'double-quote': ['"', '"'],
    'single-quote': ['‘', '’'],
    'german-quote': ['„', '“'],
  }

  const [autoPrefix, autoSuffix] = marks[style] ?? marks.plain

  return {
    prefix: props.titlePrefix ?? autoPrefix,
    suffix: props.titleSuffix ?? autoSuffix,
  }
})

const displayedTitle = computed(() => {
  if (!props.title) return ''
  return `${titleMarks.value.prefix}${props.title}${titleMarks.value.suffix}`
})
const isTitleItalic = computed(() => resolvedTitleStyle.value === 'italic')

const musicLinks = computed(() => [
  {
    key: 'qq',
    label: 'QQ音乐',
    shortLabel: 'QQ',
    icon: withBase('/icons/qq-music.svg'),
    url: props.qqUrl || props.qq,
  },
  {
    key: 'netease',
    label: '网易云音乐',
    shortLabel: '网易',
    icon: withBase('/icons/wangyiyun.svg'),
    url: props.neteaseUrl || props.netease,
  },
].filter((link) => Boolean(link.url)))

const isFuriganaForced = computed(() => props.forceFurigana || props.furigana === 'show')
const hasFuriganaControl = computed(() => {
  if (props.furigana === 'none') return false
  if (isFuriganaForced.value || props.defaultFurigana || props.furigana === 'open' || props.furigana === 'hide') {
    return true
  }

  return normalizedLang.value.startsWith('ja')
})
const isFuriganaVisible = computed(() => isFuriganaForced.value || userFuriganaVisible.value)

function toggleFurigana() {
  if (isFuriganaForced.value) return
  userFuriganaVisible.value = !userFuriganaVisible.value
}

function releaseActionFocus(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement | null
  target?.blur()
}
</script>

<template>
  <section
    class="lyric-card"
    :class="{ 'is-furigana-visible': isFuriganaVisible, 'is-furigana-forced': isFuriganaForced }"
    :lang="props.lang === 'auto' ? undefined : props.lang"
  >
    <div v-if="hasFuriganaControl" class="lyric-card-top-actions">
      <button
        class="lyric-card-action lyric-card-furigana-toggle"
        :class="{ 'is-active': isFuriganaVisible }"
        type="button"
        :aria-pressed="isFuriganaVisible"
        :disabled="isFuriganaForced"
        :title="isFuriganaForced ? 'ふりがなを固定表示' : 'ふりがなを表示/非表示'"
        @click="toggleFurigana"
      >
        ふりがな
      </button>
    </div>

    <div class="lyric-card-body">
      <slot />
    </div>

    <footer class="lyric-card-footer">
      <div v-if="musicLinks.length" class="lyric-card-music-links" aria-label="音乐链接">
        <a
          v-for="link in musicLinks"
          :key="link.key"
          class="lyric-card-music-link"
          :href="link.url"
          :aria-label="link.label"
          :title="link.label"
          target="_blank"
          rel="noreferrer noopener"
          @click.stop="releaseActionFocus"
        >
          <img
            class="lyric-card-music-icon"
            :src="link.icon"
            alt=""
            aria-hidden="true"
          >
        </a>
      </div>

      <header class="lyric-card-header">
        <p v-if="displayedTitle" class="lyric-card-title" :class="{ 'is-italic': isTitleItalic }">
          {{ displayedTitle }}
        </p>
        <p v-if="props.artist" class="lyric-card-artist">
          {{ props.artist }}
        </p>
      </header>
    </footer>
  </section>
</template>

<style scoped>
.lyric-card {
  --lyric-card-serif-sc: 'Noto Serif CJK SC', 'Noto Serif SC', 'Songti SC', serif;
  --lyric-card-serif-jp: 'Noto Serif CJK JP', 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
  --lyric-card-serif: var(--lyric-card-serif-sc);
  --lyric-line-original-serif: var(--lyric-card-serif);
  position: relative;
  display: grid;
  width: 100%;
  min-width: 0;
  gap: 14px;
  margin: 1.5rem 0 1.75rem;
  padding: 0;
}

.lyric-card:lang(ja) {
  --lyric-card-serif: var(--lyric-card-serif-jp);
  --lyric-line-original-serif: var(--lyric-card-serif-jp);
}

.lyric-card:lang(zh) {
  --lyric-card-serif: var(--lyric-card-serif-sc);
  --lyric-line-original-serif: var(--lyric-card-serif-sc);
}

.lyric-card-top-actions {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: min(58%, 280px);
}

.lyric-card-action {
  display: inline-grid;
  place-items: center;
  min-width: 30px;
  height: 24px;
  border: 0;
  border-radius: 4px;
  padding: 0 2px;
  background: transparent;
  color: var(--vp-c-text-3);
  font-family: 'Noto Sans SC', 'PingFang SC', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    color 0.18s ease;
}

:global(.dark .lyric-card-action) {
  color: var(--vp-c-text-3);
}

.lyric-card-music-link {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  opacity: 0;
  pointer-events: none;
  transform: translateY(2px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.lyric-card-music-icon {
  display: block;
  width: 18px;
  height: 18px;
  object-fit: contain;
  opacity: 0.82;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.lyric-card-action:hover,
.lyric-card-action:focus-visible,
.lyric-card-furigana-toggle.is-active {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

:global(.dark .lyric-card-action:hover),
:global(.dark .lyric-card-action:focus-visible),
:global(.dark .lyric-card-furigana-toggle.is-active) {
  color: var(--vp-c-brand-1);
}

.lyric-card-music-link:hover .lyric-card-music-icon,
.lyric-card-music-link:focus-visible .lyric-card-music-icon {
  opacity: 1;
  transform: scale(1.04);
}

.lyric-card-music-link:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 76%, white);
  outline-offset: 2px;
}

.lyric-card:hover .lyric-card-music-link,
.lyric-card:has(:focus-visible) .lyric-card-music-link {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.lyric-card-action:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 76%, white);
  outline-offset: 2px;
}

.lyric-card-furigana-toggle {
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-2px);
}

.lyric-card:hover .lyric-card-furigana-toggle,
.lyric-card:has(:focus-visible) .lyric-card-furigana-toggle,
.lyric-card-furigana-toggle.is-active,
.lyric-card.is-furigana-forced .lyric-card-furigana-toggle {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.lyric-card-furigana-toggle:disabled {
  cursor: default;
}

.lyric-card-footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.45fr);
  align-items: end;
  gap: 10px;
  min-width: 0;
}

.lyric-card-music-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-self: end;
  justify-self: start;
  gap: 7px;
  min-width: 0;
}

.lyric-card-header {
  display: grid;
  gap: 5px;
  justify-items: end;
  min-width: 0;
  text-align: right;
}

.lyric-card-title,
.lyric-card-artist {
  margin: 0;
}

.lyric-card-title {
  color: var(--vp-c-text-1);
  font-family: var(--lyric-card-serif);
  font-size: 1.24rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.38;
  overflow-wrap: anywhere;
}

.lyric-card-title.is-italic {
  padding-bottom: 0.08em;
  font-style: italic;
  line-height: 1.45;
}

.lyric-card-artist {
  color: var(--vp-c-text-3);
  font-family: 'Noto Sans SC', 'PingFang SC', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.45;
}

.lyric-card-body {
  display: grid;
  min-width: 0;
}

.lyric-card:has(.lyric-card-top-actions) .lyric-card-body {
  padding-right: 72px;
}

.lyric-card:not(.is-furigana-visible) :deep(rt) {
  color: transparent;
  font-size: 0;
  line-height: 0;
  opacity: 0;
  transform: translateY(2px);
}

@media (max-width: 640px) {
  .lyric-card {
    gap: 12px;
    margin: 1.25rem 0 1.5rem;
  }

  .lyric-card-top-actions {
    max-width: calc(100% - 24px);
  }

  .lyric-card-footer {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
  }

  .lyric-card-title {
    font-size: 1.12rem;
  }

  .lyric-card:has(.lyric-card-top-actions) .lyric-card-body {
    padding-top: 28px;
    padding-right: 0;
  }

  .lyric-card-furigana-toggle {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .lyric-card-music-link {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

@media (hover: none), (pointer: coarse) {
  .lyric-card-furigana-toggle,
  .lyric-card-music-link {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lyric-card-action,
  .lyric-card :deep(rt) {
    transition: none;
  }
}
</style>
