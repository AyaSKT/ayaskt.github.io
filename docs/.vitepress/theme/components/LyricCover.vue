<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import LyricCard from './LyricCard.vue'

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

type TextTone = 'auto' | 'light' | 'dark'

const props = withDefaults(defineProps<{
  image?: string
  src?: string
  cover?: string
  alt?: string
  imageAlt?: string
  imagePosition?: string
  maxWidth?: string
  aspectRatio?: string
  textTone?: TextTone
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
  image: '',
  src: '',
  cover: '',
  alt: '',
  imageAlt: '',
  imagePosition: 'center',
  maxWidth: '100%',
  aspectRatio: '',
  textTone: 'auto',
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

function resolveAsset(src: string) {
  const value = src.trim()
  if (!value) return ''
  if (value.startsWith('/')) return withBase(value)
  return value
}

const rawImage = computed(() => props.image || props.src || props.cover)
const resolvedImage = computed(() => resolveAsset(rawImage.value))
const hasAspectRatio = computed(() => Boolean(props.aspectRatio.trim()))
const normalizedTextTone = computed<TextTone>(() => {
  return props.textTone === 'light' || props.textTone === 'dark' ? props.textTone : 'auto'
})
const imageAlt = computed(() => {
  if (props.imageAlt) return props.imageAlt
  if (props.alt) return props.alt

  const label = [props.title, props.artist].filter(Boolean).join(' - ')
  return label ? `${label} 封面图` : '歌词封面图'
})
const ariaLabel = computed(() => {
  const label = [props.title, props.artist].filter(Boolean).join(' - ')
  return label ? `${label} 歌词封面` : '歌词封面'
})
const frameStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {
    '--lyric-cover-image-position': props.imagePosition,
    '--lyric-cover-max-width': props.maxWidth,
  }

  if (hasAspectRatio.value) {
    style['--lyric-cover-aspect-ratio'] = props.aspectRatio.trim()
  }

  return style
})
</script>

<template>
  <section
    class="lyric-cover"
    :class="[
      `is-text-${normalizedTextTone}`,
      { 'has-aspect-ratio': hasAspectRatio },
    ]"
    :style="frameStyle"
    :aria-label="ariaLabel"
  >
    <div class="lyric-cover-frame" tabindex="0">
      <img
        v-if="resolvedImage"
        class="lyric-cover-image"
        :src="resolvedImage"
        :alt="imageAlt"
        loading="lazy"
        decoding="async"
      >
      <div v-else class="lyric-cover-image-placeholder" aria-hidden="true"></div>

      <div class="lyric-cover-backdrop" aria-hidden="true">
        <img
          v-if="resolvedImage"
          class="lyric-cover-backdrop-image"
          :src="resolvedImage"
          alt=""
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="lyric-cover-glass" aria-hidden="true"></div>

      <div class="lyric-cover-content">
        <LyricCard
          :title="props.title"
          :artist="props.artist"
          :lang="props.lang"
          :title-style="props.titleStyle"
          :title-prefix="props.titlePrefix"
          :title-suffix="props.titleSuffix"
          :qq-url="props.qqUrl"
          :qq="props.qq"
          :netease-url="props.neteaseUrl"
          :netease="props.netease"
          :default-furigana="props.defaultFurigana"
          :force-furigana="props.forceFurigana"
          :furigana="props.furigana"
        >
          <slot />
        </LyricCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lyric-cover {
  --lyric-cover-max-width: 100%;
  --lyric-cover-image-position: center;
  --lyric-cover-glass-bg: color-mix(in srgb, var(--vp-c-bg) 78%, transparent);
  --lyric-cover-glass-border: color-mix(in srgb, var(--vp-c-divider) 58%, transparent);
  --lyric-cover-text-1: var(--vp-c-text-1);
  --lyric-cover-text-2: var(--vp-c-text-2);
  --lyric-cover-text-3: var(--vp-c-text-3);
  --lyric-cover-focus: color-mix(in srgb, var(--vp-c-brand-1) 72%, white);
  display: grid;
  box-sizing: border-box;
  justify-items: center;
  width: 100%;
  min-width: 0;
  margin: 1.25rem 0 1.75rem;
}

.lyric-cover.is-text-light {
  --lyric-cover-glass-bg: rgb(10 14 20 / 58%);
  --lyric-cover-glass-border: rgb(255 255 255 / 18%);
  --lyric-cover-text-1: rgb(255 255 255 / 94%);
  --lyric-cover-text-2: rgb(255 255 255 / 76%);
  --lyric-cover-text-3: rgb(255 255 255 / 62%);
}

.lyric-cover.is-text-dark {
  --lyric-cover-glass-bg: rgb(255 255 255 / 62%);
  --lyric-cover-glass-border: rgb(255 255 255 / 48%);
  --lyric-cover-text-1: rgb(33 36 46 / 96%);
  --lyric-cover-text-2: rgb(58 64 78 / 82%);
  --lyric-cover-text-3: rgb(82 89 104 / 72%);
}

:global(.dark .lyric-cover.is-text-auto) {
  --lyric-cover-glass-bg: rgb(12 18 28 / 62%);
  --lyric-cover-glass-border: transparent;
}

:global(.dark .lyric-cover) {
  --lyric-cover-glass-border: transparent;
}

.lyric-cover-frame {
  position: relative;
  isolation: isolate;
  display: inline-grid;
  box-sizing: border-box;
  max-width: min(100%, var(--lyric-cover-max-width));
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  vertical-align: top;
}

.lyric-cover.has-aspect-ratio .lyric-cover-frame {
  width: min(100%, var(--lyric-cover-max-width));
  aspect-ratio: var(--lyric-cover-aspect-ratio);
}

.lyric-cover-frame:focus-visible {
  outline: 2px solid var(--lyric-cover-focus);
  outline-offset: 3px;
}

.lyric-cover-image {
  grid-area: 1 / 1;
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  margin: 0;
  border-radius: 0;
  object-fit: contain;
  object-position: var(--lyric-cover-image-position);
  transform: translate3d(0, 0, 0);
  transform-origin: center;
  transition:
    opacity 0.34s ease,
    filter 0.34s ease,
    transform 0.34s ease;
}

.lyric-cover.has-aspect-ratio .lyric-cover-image {
  width: 100%;
  height: 100%;
}

.lyric-cover-image-placeholder {
  grid-area: 1 / 1;
  width: min(100%, 720px);
  min-height: 320px;
  background: var(--vp-c-bg-soft);
}

.lyric-cover-backdrop,
.lyric-cover-glass,
.lyric-cover-content {
  position: absolute;
  inset: 0;
}

.lyric-cover-backdrop {
  z-index: 1;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.34s ease;
}

.lyric-cover-backdrop-image {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
  object-fit: cover;
  object-position: var(--lyric-cover-image-position);
  filter: blur(22px) saturate(1.08);
  transform: scale(1.08);
}

.lyric-cover-glass {
  z-index: 2;
  border: 1px solid var(--lyric-cover-glass-border);
  background: var(--lyric-cover-glass-bg);
  opacity: 0;
  -webkit-backdrop-filter: blur(18px) saturate(1.12);
  backdrop-filter: blur(18px) saturate(1.12);
  transition: opacity 0.34s ease;
}

.lyric-cover-content {
  z-index: 3;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  min-width: 0;
  padding: clamp(18px, 4.2vw, 42px);
  overflow: auto;
  color: var(--lyric-cover-text-1);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, 8px, 0);
  transition:
    opacity 0.28s ease,
    transform 0.34s cubic-bezier(0.16, 1, 0.3, 1);
}

.lyric-cover-frame:hover .lyric-cover-image,
.lyric-cover-frame:focus-within .lyric-cover-image {
  opacity: 0.24;
  filter: blur(3px) saturate(0.84);
  transform: scale(1.012);
}

.lyric-cover-frame:hover .lyric-cover-backdrop,
.lyric-cover-frame:focus-within .lyric-cover-backdrop,
.lyric-cover-frame:hover .lyric-cover-glass,
.lyric-cover-frame:focus-within .lyric-cover-glass {
  opacity: 1;
}

.lyric-cover-frame:hover .lyric-cover-content,
.lyric-cover-frame:focus-within .lyric-cover-content {
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(0, 0, 0);
  transition-delay: 0.06s;
}

.lyric-cover-content :deep(.lyric-card) {
  --vp-c-text-1: var(--lyric-cover-text-1);
  --vp-c-text-2: var(--lyric-cover-text-2);
  --vp-c-text-3: var(--lyric-cover-text-3);
  margin: 0;
}

.lyric-cover-content :deep(.lyric-card-action) {
  color: var(--lyric-cover-text-3);
}

.lyric-cover-content :deep(.lyric-card-action:hover),
.lyric-cover-content :deep(.lyric-card-action:focus-visible),
.lyric-cover-content :deep(.lyric-card-furigana-toggle.is-active) {
  color: var(--vp-c-brand-1);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .lyric-cover-glass {
    background: color-mix(in srgb, var(--lyric-cover-glass-bg) 92%, var(--vp-c-bg));
  }
}

@media (max-width: 640px) {
  .lyric-cover-content {
    padding: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lyric-cover-image,
  .lyric-cover-backdrop,
  .lyric-cover-glass,
  .lyric-cover-content {
    transition: none;
  }
}
</style>
