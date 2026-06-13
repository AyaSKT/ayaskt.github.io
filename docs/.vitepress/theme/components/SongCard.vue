<script setup lang="ts">
import { computed, useSlots } from 'vue'
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
  cover: string
  title?: string
  song?: string
  album?: string
  artist?: string
  author?: string
  lang?: string
  alt?: string
  titleStyle?: TitleStyle
  titlePrefix?: string
  titleSuffix?: string
  albumStyle?: TitleStyle
  albumPrefix?: string
  albumSuffix?: string
  coverPosition?: string
}>(), {
  title: '',
  song: '',
  album: '',
  artist: '',
  author: '',
  lang: 'auto',
  alt: '',
  titleStyle: 'auto',
  albumStyle: 'plain',
  coverPosition: 'center',
})

const slots = useSlots()

const normalizedLang = computed(() => props.lang.trim().toLowerCase())
const rawSongTitle = computed(() => props.song || props.title)
const rawArtist = computed(() => props.artist || props.author)
const hasExtra = computed(() => Boolean(slots.default))

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

function titleMarks(style: TitleStyle) {
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

  return marks[style] ?? marks.plain
}

function formatWorkTitle(
  value: string,
  style: TitleStyle,
  prefix?: string,
  suffix?: string,
) {
  if (!value) return ''

  const [autoPrefix, autoSuffix] = titleMarks(style)
  return `${prefix ?? autoPrefix}${value}${suffix ?? autoSuffix}`
}

function resolveAsset(src: string) {
  const trimmed = src.trim()
  if (!trimmed) return ''
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(trimmed)) return trimmed

  return trimmed.startsWith('/') ? withBase(trimmed) : trimmed
}

const resolvedTitleStyle = computed<TitleStyle>(() => {
  return props.titleStyle === 'auto' ? autoTitleStyle(normalizedLang.value) : props.titleStyle
})
const resolvedAlbumStyle = computed<TitleStyle>(() => {
  return props.albumStyle === 'auto' ? autoTitleStyle(normalizedLang.value) : props.albumStyle
})

const displayedSongTitle = computed(() => formatWorkTitle(
  rawSongTitle.value,
  resolvedTitleStyle.value,
  props.titlePrefix,
  props.titleSuffix,
))
const displayedAlbum = computed(() => formatWorkTitle(
  props.album,
  resolvedAlbumStyle.value,
  props.albumPrefix,
  props.albumSuffix,
))
const resolvedCover = computed(() => resolveAsset(props.cover))
const coverAlt = computed(() => {
  if (props.alt) return props.alt

  const label = [rawSongTitle.value, props.album].filter(Boolean).join(' - ')
  return label ? `${label} 专辑封面` : '专辑封面'
})
const ariaLabel = computed(() => {
  const label = [rawSongTitle.value, props.album, rawArtist.value].filter(Boolean).join(' - ')
  return label || '歌曲信息'
})
const isSongTitleItalic = computed(() => resolvedTitleStyle.value === 'italic')
const isAlbumItalic = computed(() => resolvedAlbumStyle.value === 'italic')
</script>

<template>
  <section
    class="song-card"
    :aria-label="ariaLabel"
    :lang="props.lang === 'auto' ? undefined : props.lang"
  >
    <div class="song-card-cover-frame">
      <img
        class="song-card-cover"
        :src="resolvedCover"
        :alt="coverAlt"
        loading="lazy"
        decoding="async"
        :style="{ objectPosition: props.coverPosition }"
      >
    </div>

    <div class="song-card-content">
      <p v-if="displayedAlbum" class="song-card-album" :class="{ 'is-italic': isAlbumItalic }">
        {{ displayedAlbum }}
      </p>

      <p v-if="displayedSongTitle" class="song-card-title" :class="{ 'is-italic': isSongTitleItalic }">
        {{ displayedSongTitle }}
      </p>

      <p v-if="rawArtist" class="song-card-artist">
        {{ rawArtist }}
      </p>

      <div v-if="hasExtra" class="song-card-extra">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.song-card {
  --song-card-serif-sc: 'Noto Serif CJK SC', 'Noto Serif SC', 'Songti SC', serif;
  --song-card-serif-jp: 'Noto Serif CJK JP', 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
  --song-card-sans-sc: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --song-card-sans-jp: 'Noto Sans CJK JP', 'Noto Sans JP', 'Hiragino Sans', sans-serif;
  --song-card-serif: var(--song-card-serif-sc);
  --song-card-sans: var(--song-card-sans-sc);
  --song-card-bg: color-mix(in srgb, var(--vp-c-bg-soft) 86%, rgb(255 255 255 / 34%));
  --song-card-border: color-mix(in srgb, var(--aya-card-border, rgb(255 255 255 / 44%)) 68%, var(--vp-c-divider));
  --song-card-hover-border: color-mix(in srgb, var(--vp-c-brand-1) 44%, var(--vp-c-divider));
  --song-card-highlight: linear-gradient(135deg, rgb(255 255 255 / 18%), rgb(255 255 255 / 3%));
  --song-card-outline-shadow: 0 0 0 1px rgb(255 255 255 / 28%);
  --song-card-feather-shadow: var(--aya-card-feather, 0 0 14px 4px rgb(0 0 0 / 3.5%));
  --song-card-depth-shadow: 0 14px 34px rgb(92 102 114 / 10%);
  --song-card-inner-shadow:
    inset 0 1px 0 rgb(255 255 255 / 36%),
    inset 0 -1px 0 rgb(255 255 255 / 8%);
  --song-card-hover-outline-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 18%, rgb(255 255 255 / 70%));
  --song-card-hover-feather-shadow: 0 0 18px 5px rgb(152 203 234 / 10%);
  --song-card-hover-depth-shadow: 0 18px 42px rgb(92 102 114 / 14%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 0;
  margin: 1.5rem 0 1.75rem;
  border: 1px solid var(--song-card-border);
  border-radius: 8px;
  padding: 14px;
  background:
    var(--song-card-highlight),
    var(--song-card-bg);
  box-shadow:
    var(--song-card-outline-shadow),
    var(--song-card-feather-shadow),
    var(--song-card-depth-shadow),
    var(--song-card-inner-shadow);
  transform: translate3d(0, 0, 0);
  transition:
    border-color 0.22s ease,
    background-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;
}

.song-card:lang(ja) {
  --song-card-serif: var(--song-card-serif-jp);
  --song-card-sans: var(--song-card-sans-jp);
}

.song-card:lang(zh) {
  --song-card-serif: var(--song-card-serif-sc);
  --song-card-sans: var(--song-card-sans-sc);
}

:global(.dark .song-card) {
  --song-card-bg: rgb(10 14 21 / 74%);
  --song-card-border: rgb(17 24 35 / 88%);
  --song-card-hover-border: color-mix(in srgb, var(--vp-c-brand-1) 18%, rgb(17 24 35 / 90%));
  --song-card-highlight: none;
  --song-card-outline-shadow: 0 0 0 1px rgb(0 0 0 / 18%);
  --song-card-feather-shadow: var(--aya-card-feather, 0 0 16px 5px rgb(0 0 0 / 16%));
  --song-card-depth-shadow: 0 14px 34px rgb(0 0 0 / 30%);
  --song-card-inner-shadow:
    inset 0 1px 0 rgb(255 255 255 / 2%),
    inset 0 -1px 0 rgb(0 0 0 / 12%);
  --song-card-hover-outline-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 18%, rgb(0 0 0 / 26%));
  --song-card-hover-feather-shadow: 0 0 18px 5px rgb(152 203 234 / 8%);
  --song-card-hover-depth-shadow: 0 18px 42px rgb(0 0 0 / 40%);
}

.song-card:hover {
  border-color: var(--song-card-hover-border);
  background:
    var(--song-card-highlight),
    color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--song-card-bg));
  box-shadow:
    var(--song-card-hover-outline-shadow),
    var(--song-card-hover-feather-shadow),
    var(--song-card-hover-depth-shadow),
    var(--song-card-inner-shadow);
  transform: translate3d(0, -2px, 0);
}

.song-card-cover-frame {
  display: block;
  aspect-ratio: 1;
  min-width: 0;
  overflow: hidden;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
}

.song-card-cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-card-content {
  display: grid;
  align-content: center;
  gap: 6px;
  min-width: 0;
}

.song-card-album,
.song-card-title,
.song-card-artist,
.song-card-extra {
  min-width: 0;
  margin: 0;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.song-card-album {
  color: var(--vp-c-text-2);
  font-family: var(--song-card-serif);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.45;
}

.song-card-title {
  color: var(--vp-c-text-1);
  font-family: var(--song-card-serif);
  font-size: 1.26rem;
  font-weight: 700;
  line-height: 1.36;
}

.song-card-album.is-italic,
.song-card-title.is-italic {
  padding-bottom: 0.06em;
  font-style: italic;
  line-height: 1.45;
}

.song-card-artist {
  color: var(--vp-c-text-3);
  font-family: var(--song-card-sans);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
}

.song-card-extra {
  margin-top: 2px;
  color: var(--vp-c-text-2);
  font-family: var(--song-card-sans);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.58;
}

.song-card-extra :deep(p) {
  margin: 0;
}

.song-card-extra :deep(p + p) {
  margin-top: 4px;
}

@media (max-width: 640px) {
  .song-card {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 12px;
    margin: 1.25rem 0 1.5rem;
    padding: 12px;
  }

  .song-card-title {
    font-size: 1.12rem;
  }

  .song-card-album {
    font-size: 0.88rem;
  }

  .song-card-artist,
  .song-card-extra {
    font-size: 0.84rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .song-card {
    transition: none;
  }

  .song-card:hover {
    transform: none;
  }
}
</style>
