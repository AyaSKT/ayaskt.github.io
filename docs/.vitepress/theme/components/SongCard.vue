<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, useTemplateRef, watch } from 'vue'

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

interface LyricEntry {
  time: number
  text: string
  translation: string
}

const DEFAULT_NETEASE_API_BASE = 'https://api.hypcvgm.top/NeteaseMiniPlayer/nmp.php'

let activeSongCardAudio: HTMLAudioElement | null = null

const props = withDefaults(defineProps<{
  cover?: string
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
  songId?: string | number
  neteaseId?: string | number
  neteaseUrl?: string
  audioUrl?: string
  apiBase?: string
  audioLevel?: string
  autoplay?: boolean
  preview?: string
  lyricPreview?: string
  translationPreview?: string
  lyrics?: string
  translatedLyrics?: string
}>(), {
  cover: '',
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
  songId: '',
  neteaseId: '',
  neteaseUrl: '',
  audioUrl: '',
  apiBase: DEFAULT_NETEASE_API_BASE,
  audioLevel: 'exhigh',
  autoplay: false,
  preview: '',
  lyricPreview: '',
  translationPreview: '',
  lyrics: '',
  translatedLyrics: '',
})

const slots = useSlots()
const audioElement = useTemplateRef<HTMLAudioElement>('songCardAudio')

const normalizedLang = computed(() => props.lang.trim().toLowerCase())
const rawSongTitle = computed(() => props.song || props.title)
const rawArtist = computed(() => props.artist || props.author)
const hasExtra = computed(() => Boolean(slots.default))
const isLoading = ref(false)
const isPlaying = ref(false)
const playbackError = ref('')
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.72)
const loadedPlaybackKey = ref('')
const neteaseCoverUrl = ref('')
const isCoverLoading = ref(false)
const lyricEntries = ref<LyricEntry[]>([])
const loadedLyricKey = ref('')
const isLyricsLoading = ref(false)
const hasStartedPlayback = ref(false)

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
  return src.trim()
}

function ensureHttps(url: string) {
  if (!url) return url
  if (url.includes('music.126.net')) return url.replace(/^http:\/\//, 'https://')
  if (url.startsWith('http://')) return url.replace('http://', 'https://')
  return url
}

function extractNeteaseSongId(source: string) {
  const value = source.trim()
  if (!value) return ''

  const explicitMatch = value.match(/(?:song\?id=|[?&#]id=)(\d+)/i)
  if (explicitMatch) return explicitMatch[1]

  const looseMatch = value.match(/\b(\d{5,})\b/)
  return looseMatch?.[1] ?? ''
}

function normalizeApiBase(base: string) {
  return (base || DEFAULT_NETEASE_API_BASE).trim().replace(/\/$/, '')
}

function buildApiUrl(endpoint: string, params: Record<string, string>) {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const query = new URLSearchParams(params).toString()
  return `${normalizeApiBase(props.apiBase)}${normalizedEndpoint}${query ? `?${query}` : ''}`
}

async function requestNeteaseAudioUrl(level: string) {
  const response = await fetch(buildApiUrl('/song/url/v1', {
    id: resolvedNeteaseSongId.value,
    level,
  }))

  if (!response.ok) {
    throw new Error(`NetEase API request failed with ${response.status}`)
  }

  const data = await response.json()
  if (data.code && data.code !== 200) {
    throw new Error(`NetEase API returned ${data.code}`)
  }

  const audioUrl = data?.data?.[0]?.url
  if (!audioUrl) {
    throw new Error('NetEase API returned no playable URL')
  }

  return ensureHttps(audioUrl)
}

async function loadNeteaseCover() {
  const songId = resolvedNeteaseSongId.value
  neteaseCoverUrl.value = ''

  if (!songId) return

  isCoverLoading.value = true

  try {
    const response = await fetch(buildApiUrl('/song/detail', { ids: songId }))
    if (!response.ok) {
      throw new Error(`NetEase detail request failed with ${response.status}`)
    }

    const data = await response.json()
    if (data.code && data.code !== 200) {
      throw new Error(`NetEase detail API returned ${data.code}`)
    }

    const coverUrl = data?.songs?.[0]?.al?.picUrl
    if (coverUrl) {
      neteaseCoverUrl.value = ensureHttps(coverUrl)
    }
  } catch {
    neteaseCoverUrl.value = ''
  } finally {
    isCoverLoading.value = false
  }
}

async function loadNeteaseAudioUrl() {
  const preferredLevel = props.audioLevel.trim() || 'exhigh'

  try {
    return await requestNeteaseAudioUrl(preferredLevel)
  } catch (error) {
    if (preferredLevel === 'standard') throw error
    return await requestNeteaseAudioUrl('standard')
  }
}

function parseTimedLyricText(source: string) {
  const entries: Array<{ time: number, text: string }> = []

  for (const line of source.split('\n')) {
    const tagPattern = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g
    const tags = [...line.matchAll(tagPattern)]
    if (!tags.length) continue

    const text = line.replace(tagPattern, '').trim()
    if (!text || isLyricCreditLine(text)) continue

    for (const tag of tags) {
      const minutes = Number(tag[1])
      const seconds = Number(tag[2])
      const milliseconds = Number((tag[3] || '0').padEnd(3, '0'))
      entries.push({
        time: minutes * 60 + seconds + milliseconds / 1000,
        text,
      })
    }
  }

  return entries
}

function isLyricCreditLine(text: string) {
  return /^(作词|作詞|作曲|编曲|編曲|词|詞|曲|混音|母带|制作人|歌|演唱|vocal|lyricist|composer|arranger|producer)\s*[:：]/i.test(text)
}

function parseLyrics(original: string, translated: string): LyricEntry[] {
  const originalMap = new Map<number, string>()
  const translationMap = new Map<number, string>()

  for (const entry of parseTimedLyricText(original)) {
    originalMap.set(entry.time, entry.text)
  }

  for (const entry of parseTimedLyricText(translated)) {
    translationMap.set(entry.time, entry.text)
  }

  return [...new Set([...originalMap.keys(), ...translationMap.keys()])]
    .sort((a, b) => a - b)
    .map((time) => ({
      time,
      text: originalMap.get(time) || '',
      translation: translationMap.get(time) || '',
    }))
    .filter((entry) => entry.text || entry.translation)
}

async function loadNeteaseLyrics() {
  const songId = resolvedNeteaseSongId.value
  if (!songId) {
    lyricEntries.value = []
    loadedLyricKey.value = lyricSourceKey.value
    return
  }

  isLyricsLoading.value = true

  try {
    const response = await fetch(buildApiUrl('/lyric', { id: songId }))
    if (!response.ok) {
      throw new Error(`NetEase lyric request failed with ${response.status}`)
    }

    const data = await response.json()
    if (data.code && data.code !== 200) {
      throw new Error(`NetEase lyric API returned ${data.code}`)
    }

    lyricEntries.value = parseLyrics(data?.lrc?.lyric || '', data?.tlyric?.lyric || '')
    loadedLyricKey.value = lyricSourceKey.value
  } catch {
    lyricEntries.value = []
    loadedLyricKey.value = lyricSourceKey.value
  } finally {
    isLyricsLoading.value = false
  }
}

async function ensureLyrics() {
  const key = lyricSourceKey.value
  if (loadedLyricKey.value === key) return

  const inlineLyrics = props.lyrics.trim()
  const inlineTranslatedLyrics = props.translatedLyrics.trim()

  if (inlineLyrics || inlineTranslatedLyrics) {
    lyricEntries.value = parseLyrics(inlineLyrics, inlineTranslatedLyrics)
    loadedLyricKey.value = key
    return
  }

  await loadNeteaseLyrics()
}

async function ensureAudioSource(audio: HTMLAudioElement) {
  const key = playbackKey.value
  if (loadedPlaybackKey.value === key && audio.currentSrc) return audio.currentSrc

  const src = directAudioSrc.value || await loadNeteaseAudioUrl()
  audio.src = src
  audio.load()
  loadedPlaybackKey.value = key
  return src
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '0:00'

  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function measureLyricTextLength(text: string) {
  return Array.from(text).reduce((length, char) => {
    if (/\s/u.test(char)) return length + 0.35
    if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(char)) return length + 1.8
    if (/[A-Z0-9]/u.test(char)) return length + 1.08
    if (/[.,!?;:'"()[\]{}，。！？、；：“”‘’（）【】]/u.test(char)) return length + 0.55
    return length + 1
  }, 0)
}

function lyricDensityClass(text: string, prefix: 'original' | 'translation' | 'next') {
  const length = measureLyricTextLength(text)
  if (length >= 58) return `is-${prefix}-compact`
  if (length >= 42) return `is-${prefix}-dense`
  if (length >= 28) return `is-${prefix}-balanced`
  return `is-${prefix}-normal`
}

function nextOriginalText(entries: LyricEntry[], startIndex: number) {
  for (let i = startIndex; i < entries.length; i += 1) {
    const text = entries[i]?.text?.trim()
    if (text) return text
  }

  return ''
}

async function playAudio() {
  if (!canPlay.value || isLoading.value) return

  const audio = audioElement.value
  if (!audio) return

  isLoading.value = true
  playbackError.value = ''
  void ensureLyrics()

  try {
    await ensureAudioSource(audio)
    if (activeSongCardAudio && activeSongCardAudio !== audio) {
      activeSongCardAudio.pause()
    }

    activeSongCardAudio = audio
    audio.volume = volume.value
    await audio.play()
    isPlaying.value = true
  } catch (error) {
    isPlaying.value = false
    playbackError.value = error instanceof DOMException && error.name === 'NotAllowedError'
      ? '请再次点击播放'
      : '暂时无法播放'
  } finally {
    isLoading.value = false
  }
}

function pauseAudio() {
  audioElement.value?.pause()
}

async function togglePlayback() {
  if (isPlaying.value) {
    pauseAudio()
    return
  }

  await playAudio()
}

function handleAudioPlay() {
  const audio = audioElement.value
  if (!audio) return

  activeSongCardAudio = audio
  isPlaying.value = true
  hasStartedPlayback.value = true
  playbackError.value = ''
  void ensureLyrics()
}

function handleAudioPause() {
  const audio = audioElement.value
  isPlaying.value = false
  if (audio && activeSongCardAudio === audio) {
    activeSongCardAudio = null
  }
}

function handleAudioEnded() {
  const audio = audioElement.value
  isPlaying.value = false
  currentTime.value = duration.value || 0
  if (audio && activeSongCardAudio === audio) {
    activeSongCardAudio = null
  }
}

function handleLoadedMetadata() {
  const audio = audioElement.value
  if (!audio) return

  duration.value = Number.isFinite(audio.duration) ? audio.duration : 0
  currentTime.value = Number.isFinite(audio.currentTime) ? audio.currentTime : 0
}

function handleTimeUpdate() {
  const audio = audioElement.value
  if (!audio) return

  currentTime.value = Number.isFinite(audio.currentTime) ? audio.currentTime : 0
}

function handleAudioError() {
  if (!loadedPlaybackKey.value) return

  isLoading.value = false
  isPlaying.value = false
  playbackError.value = '暂时无法播放'
}

function handleSeek(event: Event) {
  const audio = audioElement.value
  if (!audio || !hasDuration.value) return

  const input = event.target as HTMLInputElement
  const nextTime = (Number(input.value) / 1000) * duration.value
  audio.currentTime = nextTime
  currentTime.value = nextTime
}

function handleVolumeInput(event: Event) {
  const input = event.target as HTMLInputElement
  const nextVolume = Math.min(1, Math.max(0, Number(input.value) / 100))
  volume.value = nextVolume

  const audio = audioElement.value
  if (audio) audio.volume = nextVolume
}

function resetPlayback() {
  const audio = audioElement.value
  if (audio) {
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  }

  isLoading.value = false
  isPlaying.value = false
  playbackError.value = ''
  currentTime.value = 0
  duration.value = 0
  loadedPlaybackKey.value = ''
  lyricEntries.value = []
  loadedLyricKey.value = ''
  isLyricsLoading.value = false
  hasStartedPlayback.value = false
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
const displayedCover = computed(() => neteaseCoverUrl.value || resolvedCover.value)
const directAudioSrc = computed(() => props.audioUrl.trim())
const displayedLyricPreview = computed(() => (props.lyricPreview || props.preview).trim())
const displayedTranslationPreview = computed(() => props.translationPreview.trim())
const inlineLyrics = computed(() => props.lyrics.trim())
const inlineTranslatedLyrics = computed(() => props.translatedLyrics.trim())
const resolvedNeteaseSongId = computed(() => {
  const explicitId = `${props.songId || props.neteaseId || ''}`.trim()
  return explicitId || extractNeteaseSongId(props.neteaseUrl)
})
const canPlay = computed(() => Boolean(directAudioSrc.value || resolvedNeteaseSongId.value))
const canLoadTimedLyrics = computed(() => Boolean(resolvedNeteaseSongId.value || inlineLyrics.value || inlineTranslatedLyrics.value))
const hasFallbackPreview = computed(() => Boolean(displayedLyricPreview.value || displayedTranslationPreview.value))
const hasPreview = computed(() => canPlay.value && (canLoadTimedLyrics.value || hasFallbackPreview.value))
const playbackKey = computed(() => {
  if (directAudioSrc.value) return `audio:${directAudioSrc.value}`
  if (resolvedNeteaseSongId.value) {
    return `netease:${resolvedNeteaseSongId.value}:${normalizeApiBase(props.apiBase)}:${props.audioLevel.trim()}`
  }
  return 'none'
})
const lyricSourceKey = computed(() => {
  if (inlineLyrics.value || inlineTranslatedLyrics.value) {
    return `inline:${inlineLyrics.value}:${inlineTranslatedLyrics.value}`
  }

  if (resolvedNeteaseSongId.value) {
    return `netease:${resolvedNeteaseSongId.value}:${normalizeApiBase(props.apiBase)}`
  }

  return 'fallback'
})
const coverAlt = computed(() => {
  if (props.alt) return props.alt

  const label = [rawSongTitle.value, props.album].filter(Boolean).join(' - ')
  return label ? `${label} 专辑封面` : '专辑封面'
})
const ariaLabel = computed(() => {
  const label = [rawSongTitle.value, props.album, rawArtist.value].filter(Boolean).join(' - ')
  return label || '歌曲信息'
})
const hasAlbum = computed(() => Boolean(displayedAlbum.value))
const usesNextOriginalPreview = computed(() => !hasAlbum.value)
const isSongTitleItalic = computed(() => resolvedTitleStyle.value === 'italic')
const isAlbumItalic = computed(() => resolvedAlbumStyle.value === 'italic')
const hasDuration = computed(() => duration.value > 0)
const progressValue = computed(() => {
  if (!hasDuration.value) return 0
  return Math.min(1000, Math.max(0, Math.round((currentTime.value / duration.value) * 1000)))
})
const currentTimeLabel = computed(() => formatTime(currentTime.value))
const durationLabel = computed(() => formatTime(duration.value))
const volumeValue = computed(() => Math.round(volume.value * 100))
const playButtonLabel = computed(() => {
  if (isLoading.value) return '加载中'
  return isPlaying.value ? '暂停' : '播放'
})
const playbackStatus = computed(() => {
  if (playbackError.value) return playbackError.value
  if (isLoading.value) return '加载中...'
  if (isLyricsLoading.value && hasStartedPlayback.value) return '歌词加载中...'
  if (isPlaying.value) return '播放中'
  return ''
})
const activeLyricIndex = computed(() => {
  if (!hasStartedPlayback.value || !lyricEntries.value.length) return -1
  if (currentTime.value < lyricEntries.value[0].time) return 0

  let index = -1
  for (let i = 0; i < lyricEntries.value.length; i += 1) {
    if (currentTime.value >= lyricEntries.value[i].time) {
      index = i
    } else {
      break
    }
  }

  return index
})
const activeLyricEntry = computed<LyricEntry | null>(() => {
  if (!hasStartedPlayback.value) return null

  if (activeLyricIndex.value >= 0) {
    return lyricEntries.value[activeLyricIndex.value]
  }

  if (hasFallbackPreview.value) {
    return {
      time: 0,
      text: displayedLyricPreview.value,
      translation: displayedTranslationPreview.value,
    }
  }

  return null
})
const activeLyricText = computed(() => activeLyricEntry.value?.text || '')
const activeLyricTranslation = computed(() => activeLyricEntry.value?.translation || '')
const activeNextLyricText = computed(() => {
  if (!usesNextOriginalPreview.value || activeLyricIndex.value < 0) return ''
  return nextOriginalText(lyricEntries.value, activeLyricIndex.value + 1)
})
const visibleLyricTranslation = computed(() => usesNextOriginalPreview.value ? '' : activeLyricTranslation.value)
const shouldShowLyricPreview = computed(() => {
  return Boolean(activeLyricText.value || visibleLyricTranslation.value || activeNextLyricText.value)
})
const activeLyricKey = computed(() => {
  if (!activeLyricEntry.value) return 'empty'
  return `${activeLyricEntry.value.time}:${activeLyricText.value}:${visibleLyricTranslation.value}:${activeNextLyricText.value}`
})
const activeLyricDensityClasses = computed(() => {
  if (usesNextOriginalPreview.value) {
    return [
      'is-original-queue',
      lyricDensityClass(activeLyricText.value, 'original'),
      lyricDensityClass(activeNextLyricText.value, 'next'),
    ]
  }

  return [
    lyricDensityClass(activeLyricText.value, 'original'),
    lyricDensityClass(visibleLyricTranslation.value, 'translation'),
  ]
})

watch(playbackKey, () => {
  resetPlayback()
})

watch(lyricSourceKey, () => {
  lyricEntries.value = []
  loadedLyricKey.value = ''

  if (hasStartedPlayback.value) {
    void ensureLyrics()
  }
})

watch(resolvedNeteaseSongId, () => {
  if (audioElement.value) {
    void loadNeteaseCover()
  } else {
    neteaseCoverUrl.value = ''
  }
})

onMounted(() => {
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }

  void loadNeteaseCover()

  if (props.autoplay && canPlay.value) {
    void playAudio()
  }
})

onBeforeUnmount(() => {
  const audio = audioElement.value
  if (audio && activeSongCardAudio === audio) {
    activeSongCardAudio = null
  }

  resetPlayback()
})
</script>

<template>
  <section
    class="song-card"
    :class="{ 'is-playable': canPlay, 'is-playing': isPlaying }"
    :aria-label="ariaLabel"
    :lang="props.lang === 'auto' ? undefined : props.lang"
  >
    <div
      class="song-card-cover-frame"
      :class="{ 'is-loading': isCoverLoading, 'has-no-cover': !displayedCover }"
    >
      <img
        v-if="displayedCover"
        class="song-card-cover"
        :src="displayedCover"
        :alt="coverAlt"
        loading="lazy"
        decoding="async"
        :style="{ objectPosition: props.coverPosition }"
      >
      <div v-else class="song-card-cover-placeholder" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M9 18V6l10-2v12.2A3 3 0 1 1 17 13.4V7.2l-6 1.2v8.8A3 3 0 1 1 9 18z" />
        </svg>
      </div>
    </div>

    <div class="song-card-content">
      <div class="song-card-meta">
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

      <div
        v-if="hasPreview"
        class="song-card-preview"
        aria-label="歌词预览"
        aria-live="polite"
      >
        <Transition name="song-card-lyric" appear>
          <div
            v-if="shouldShowLyricPreview"
            :key="activeLyricKey"
            class="song-card-preview-lines"
            :class="activeLyricDensityClasses"
          >
            <p v-if="activeLyricText" class="song-card-preview-original">
              {{ activeLyricText }}
            </p>
            <p v-if="activeNextLyricText" class="song-card-preview-next">
              {{ activeNextLyricText }}
            </p>
            <p v-if="visibleLyricTranslation" class="song-card-preview-translation" lang="zh-CN">
              {{ visibleLyricTranslation }}
            </p>
          </div>
        </Transition>
      </div>

      <div
        v-if="canPlay"
        class="song-card-player"
        :class="{ 'is-loading': isLoading, 'is-error': playbackError }"
      >
        <audio
          ref="songCardAudio"
          class="song-card-audio"
          preload="metadata"
          @play="handleAudioPlay"
          @pause="handleAudioPause"
          @ended="handleAudioEnded"
          @loadedmetadata="handleLoadedMetadata"
          @timeupdate="handleTimeUpdate"
          @error="handleAudioError"
        />

        <button
          class="song-card-play-button"
          type="button"
          :aria-label="playButtonLabel"
          :title="playButtonLabel"
          :disabled="isLoading"
          @click="togglePlayback"
        >
          <svg
            v-if="isPlaying"
            class="song-card-control-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
          </svg>
          <svg
            v-else
            class="song-card-control-icon is-play-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div class="song-card-timeline">
          <input
            class="song-card-progress"
            type="range"
            min="0"
            max="1000"
            step="1"
            :value="progressValue"
            :disabled="!hasDuration"
            aria-label="播放进度"
            :aria-valuetext="`${currentTimeLabel} / ${durationLabel}`"
            @input="handleSeek"
          >
          <div class="song-card-time-row">
            <span>{{ currentTimeLabel }}</span>
            <span class="song-card-player-status" aria-live="polite">
              {{ playbackStatus }}
            </span>
            <span>{{ durationLabel }}</span>
          </div>
        </div>

        <div class="song-card-volume">
          <button
            class="song-card-volume-button"
            type="button"
            aria-label="音量"
            title="音量"
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 9v6h4l5 4V5L8 9zm11.5 1.1a3 3 0 0 1 0 3.8l1.5 1.3a5 5 0 0 0 0-6.4z" />
            </svg>
          </button>

          <div class="song-card-volume-popover">
            <input
              class="song-card-volume-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              :value="volumeValue"
              aria-label="音量"
              @input="handleVolumeInput"
            >
          </div>
        </div>
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
  --song-card-bg: var(--aya-card-bg, var(--vp-c-bg));
  --song-card-border: transparent;
  --song-card-hover-border: transparent;
  --song-card-outline-shadow: var(--aya-card-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 62%, transparent));
  --song-card-feather-shadow: var(--aya-card-feather, 0 0 14px 4px rgb(0 0 0 / 3.5%));
  --song-card-depth-shadow: var(--aya-card-shadow, 0 14px 34px rgb(92 102 114 / 10%));
  --song-card-inner-shadow: none;
  --song-card-hover-outline-shadow: var(--aya-card-hover-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent));
  --song-card-hover-feather-shadow: 0 0 18px 5px rgb(var(--aya-c-brand-blue-rgb, 152 203 234) / 10%);
  --song-card-hover-depth-shadow: 0 18px 42px rgb(92 102 114 / 14%);
  --song-card-player-accent: color-mix(in srgb, var(--vp-c-brand-1) 82%, #6f8ff7);
  --song-card-player-track: color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
  --song-card-player-thumb: color-mix(in srgb, var(--vp-c-brand-1) 72%, #ffffff);
  --song-card-volume-popover-bg: color-mix(in srgb, var(--vp-c-bg-soft) 88%, rgb(255 255 255 / 42%));
  --song-card-volume-popover-border: color-mix(in srgb, var(--song-card-border) 78%, var(--vp-c-brand-1));
  --song-card-volume-popover-shadow: 0 10px 26px rgb(92 102 114 / 14%);
  display: grid;
  box-sizing: border-box;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 0;
  min-height: 156px;
  margin: 1.5rem 0 1.75rem;
  border: 1px solid var(--song-card-border);
  border-radius: 8px;
  padding: 14px;
  background: var(--song-card-bg);
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
  --song-card-bg: var(--aya-card-bg, var(--vp-c-bg));
  --song-card-border: transparent;
  --song-card-hover-border: transparent;
  --song-card-outline-shadow: var(--aya-card-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 42%, transparent));
  --song-card-feather-shadow: var(--aya-card-feather, 0 0 16px 5px rgb(0 0 0 / 16%));
  --song-card-depth-shadow: var(--aya-card-shadow, 0 14px 34px rgb(0 0 0 / 30%));
  --song-card-inner-shadow: none;
  --song-card-hover-outline-shadow: var(--aya-card-hover-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent));
  --song-card-hover-feather-shadow: 0 0 18px 5px rgb(var(--aya-c-brand-blue-rgb, 152 203 234) / 8%);
  --song-card-hover-depth-shadow: 0 18px 42px rgb(0 0 0 / 40%);
  --song-card-player-track: rgb(255 255 255 / 12%);
  --song-card-player-thumb: color-mix(in srgb, var(--vp-c-brand-1) 62%, #ffffff);
  --song-card-volume-popover-bg: rgb(17 24 35 / 92%);
  --song-card-volume-popover-border: color-mix(in srgb, var(--vp-c-brand-1) 22%, rgb(255 255 255 / 12%));
  --song-card-volume-popover-shadow: 0 12px 28px rgb(0 0 0 / 42%);
}

.song-card:hover {
  border-color: var(--song-card-border);
  background: var(--song-card-bg);
  box-shadow:
    var(--song-card-outline-shadow),
    var(--song-card-feather-shadow),
    var(--song-card-depth-shadow),
    var(--song-card-inner-shadow);
  transform: translate3d(0, 0, 0);
}

.song-card-cover-frame {
  position: relative;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
}

.song-card-cover-frame.is-loading::after {
  position: absolute;
  inset: 0;
  content: '';
  background:
    linear-gradient(
      110deg,
      transparent 0%,
      rgb(255 255 255 / 22%) 45%,
      transparent 72%
    );
  transform: translateX(-100%);
  animation: song-card-cover-shimmer 1.2s ease-in-out infinite;
}

.song-card-cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.28s ease, filter 0.28s ease;
}

.song-card.is-playing .song-card-cover {
  filter: saturate(1.08);
  transform: scale(1.018);
}

.song-card-cover-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42%;
  height: 42%;
  color: color-mix(in srgb, var(--vp-c-text-3) 72%, transparent);
}

.song-card-cover-placeholder svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: currentColor;
}

@keyframes song-card-cover-shimmer {
  to {
    transform: translateX(100%);
  }
}

.song-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  gap: 6px;
  min-width: 0;
  min-height: 100%;
}

.song-card.is-playable .song-card-content {
  align-self: stretch;
  justify-content: space-between;
  padding: 2px 0 1px;
}

.song-card-meta {
  display: grid;
  align-content: start;
  gap: 6px;
  min-width: 0;
}

.song-card-preview {
  display: grid;
  align-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 66px;
  overflow: hidden;
  padding: 2px 0 4px;
}

.song-card-preview-lines {
  display: grid;
  grid-area: 1 / 1;
  gap: 4px;
  min-width: 0;
}

.song-card-preview-original,
.song-card-preview-next,
.song-card-preview-translation {
  display: -webkit-box;
  min-width: 0;
  margin: 0;
  letter-spacing: 0;
  overflow: hidden;
  overflow-wrap: anywhere;
  white-space: normal;
  word-break: normal;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.song-card-preview-original {
  -webkit-line-clamp: 2;
  color: var(--vp-c-text-1);
  font-family: var(--song-card-serif);
  font-size: 0.94rem;
  font-weight: 600;
  line-height: 1.38;
}

.song-card-preview-translation {
  -webkit-line-clamp: 2;
  color: var(--vp-c-text-2);
  font-family: var(--song-card-serif-sc);
  font-language-override: 'ZHS';
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.42;
}

.song-card-preview-next {
  -webkit-line-clamp: 2;
  color: color-mix(in srgb, var(--vp-c-text-2) 68%, transparent);
  font-family: var(--song-card-serif);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.36;
}

.song-card-preview-lines.is-original-queue {
  gap: 5px;
}

.song-card-preview-lines.is-original-balanced .song-card-preview-original {
  font-size: 0.88rem;
}

.song-card-preview-lines.is-original-dense .song-card-preview-original {
  font-size: 0.8rem;
  line-height: 1.34;
}

.song-card-preview-lines.is-original-compact .song-card-preview-original {
  font-size: 0.73rem;
  line-height: 1.32;
}

.song-card-preview-lines.is-translation-balanced .song-card-preview-translation {
  font-size: 0.76rem;
}

.song-card-preview-lines.is-translation-dense .song-card-preview-translation {
  font-size: 0.7rem;
  line-height: 1.36;
}

.song-card-preview-lines.is-translation-compact .song-card-preview-translation {
  font-size: 0.65rem;
  line-height: 1.34;
}

.song-card-preview-lines.is-next-balanced .song-card-preview-next {
  font-size: 0.76rem;
}

.song-card-preview-lines.is-next-dense .song-card-preview-next {
  font-size: 0.7rem;
  line-height: 1.34;
}

.song-card-preview-lines.is-next-compact .song-card-preview-next {
  font-size: 0.65rem;
  line-height: 1.32;
}

.song-card-lyric-enter-active,
.song-card-lyric-leave-active {
  transition:
    opacity 0.24s ease,
    transform 0.24s cubic-bezier(0.19, 1, 0.22, 1);
}

.song-card-lyric-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.song-card-lyric-enter-to,
.song-card-lyric-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.song-card-lyric-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

.song-card-player {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) 34px;
  align-items: center;
  gap: 10px;
  min-width: 0;
  min-height: 46px;
  margin-top: auto;
}

.song-card-audio {
  display: none;
}

.song-card-play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  min-width: 34px;
  height: 34px;
  margin: 0;
  border: 1px solid color-mix(in srgb, var(--song-card-player-accent) 42%, transparent);
  border-radius: 999px;
  padding: 0;
  color: white;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--song-card-player-accent) 92%, #ffffff), var(--vp-c-brand-2));
  box-shadow:
    0 8px 18px color-mix(in srgb, var(--song-card-player-accent) 20%, transparent),
    inset 0 1px 0 rgb(255 255 255 / 28%);
  cursor: pointer;
  transition:
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    transform 0.18s ease;
}

.song-card-play-button:hover {
  box-shadow:
    0 10px 22px color-mix(in srgb, var(--song-card-player-accent) 28%, transparent),
    inset 0 1px 0 rgb(255 255 255 / 34%);
  transform: translateY(-1px);
}

.song-card-play-button:active {
  transform: translateY(0) scale(0.98);
}

.song-card-play-button:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--song-card-player-accent) 72%, transparent);
  outline-offset: 3px;
}

.song-card-play-button:disabled {
  cursor: wait;
  opacity: 0.72;
  transform: none;
}

.song-card-control-icon {
  display: block;
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.song-card-control-icon.is-play-icon {
  margin-left: 2px;
}

.song-card-timeline {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.song-card-progress,
.song-card-volume-slider {
  width: 100%;
  min-width: 0;
  margin: 0;
  accent-color: var(--song-card-player-accent);
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.song-card-progress {
  height: 16px;
}

.song-card-progress:disabled {
  cursor: default;
  opacity: 0.62;
}

.song-card-progress::-webkit-slider-runnable-track,
.song-card-volume-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: var(--song-card-player-track);
}

.song-card-progress::-webkit-slider-thumb,
.song-card-volume-slider::-webkit-slider-thumb {
  width: 12px;
  height: 12px;
  margin-top: -4px;
  border: 0;
  border-radius: 999px;
  background: var(--song-card-player-thumb);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--song-card-player-accent) 18%, transparent);
  appearance: none;
}

.song-card-progress::-moz-range-track,
.song-card-volume-slider::-moz-range-track {
  height: 4px;
  border-radius: 999px;
  background: var(--song-card-player-track);
}

.song-card-progress::-moz-range-thumb,
.song-card-volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: 0;
  border-radius: 999px;
  background: var(--song-card-player-thumb);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--song-card-player-accent) 18%, transparent);
}

.song-card-time-row {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 38px;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--vp-c-text-3);
  font-family: var(--song-card-sans);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
}

.song-card-time-row > :last-child {
  text-align: right;
}

.song-card-player-status {
  min-width: 0;
  min-height: 1em;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}

.song-card-player.is-error .song-card-player-status {
  color: var(--vp-c-danger-1);
}

.song-card-volume {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  min-width: 34px;
  height: 34px;
}

.song-card-volume-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0;
  color: var(--vp-c-text-3);
  background: transparent;
  cursor: default;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;
}

.song-card-volume-button:hover,
.song-card-volume:focus-within .song-card-volume-button {
  border-color: color-mix(in srgb, var(--song-card-player-accent) 24%, transparent);
  color: var(--song-card-player-accent);
  background: color-mix(in srgb, var(--song-card-player-accent) 8%, transparent);
}

.song-card-volume-button:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--song-card-player-accent) 58%, transparent);
  outline-offset: 2px;
}

.song-card-volume-button svg {
  display: block;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.song-card-volume-popover {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  z-index: 4;
  box-sizing: border-box;
  width: 116px;
  min-width: 116px;
  border: 1px solid var(--song-card-volume-popover-border);
  border-radius: 8px;
  padding: 9px 11px;
  background: var(--song-card-volume-popover-bg);
  box-shadow: var(--song-card-volume-popover-shadow);
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.song-card-volume-popover::after {
  position: absolute;
  right: 12px;
  bottom: -5px;
  width: 8px;
  height: 8px;
  border-right: 1px solid var(--song-card-volume-popover-border);
  border-bottom: 1px solid var(--song-card-volume-popover-border);
  background: var(--song-card-volume-popover-bg);
  content: '';
  transform: rotate(45deg);
}

.song-card-volume:hover .song-card-volume-popover,
.song-card-volume:focus-within .song-card-volume-popover {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.song-card-volume-slider {
  height: 16px;
}

@media (max-width: 640px) {
  .song-card {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 12px;
    min-height: 124px;
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

  .song-card-preview {
    gap: 3px;
    min-height: 56px;
    padding: 1px 0 3px;
  }

  .song-card-preview-original {
    font-size: 0.84rem;
    line-height: 1.34;
  }

  .song-card-preview-next,
  .song-card-preview-translation {
    font-size: 0.74rem;
    line-height: 1.36;
  }

  .song-card-preview-lines.is-original-balanced .song-card-preview-original {
    font-size: 0.78rem;
  }

  .song-card-preview-lines.is-original-dense .song-card-preview-original {
    font-size: 0.72rem;
  }

  .song-card-preview-lines.is-original-compact .song-card-preview-original {
    font-size: 0.67rem;
  }

  .song-card-preview-lines.is-translation-balanced .song-card-preview-translation {
    font-size: 0.69rem;
  }

  .song-card-preview-lines.is-translation-dense .song-card-preview-translation {
    font-size: 0.64rem;
  }

  .song-card-preview-lines.is-translation-compact .song-card-preview-translation {
    font-size: 0.6rem;
  }

  .song-card-preview-lines.is-next-balanced .song-card-preview-next {
    font-size: 0.69rem;
  }

  .song-card-preview-lines.is-next-dense .song-card-preview-next {
    font-size: 0.64rem;
  }

  .song-card-preview-lines.is-next-compact .song-card-preview-next {
    font-size: 0.6rem;
  }

  .song-card.is-playable .song-card-content {
    padding: 0;
  }

  .song-card-player {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 9px;
    min-height: 42px;
  }

  .song-card-play-button {
    width: 32px;
    min-width: 32px;
    height: 32px;
  }

  .song-card-volume {
    display: none;
  }

  .song-card-time-row {
    grid-template-columns: 34px minmax(0, 1fr) 34px;
    gap: 4px;
    font-size: 0.68rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .song-card,
  .song-card-cover,
  .song-card-lyric-enter-active,
  .song-card-lyric-leave-active,
  .song-card-play-button,
  .song-card-volume-button,
  .song-card-volume-popover {
    transition: none;
  }

  .song-card:hover,
  .song-card-play-button:hover {
    transform: none;
  }

  .song-card-cover-frame.is-loading::after {
    animation: none;
  }

  .song-card-lyric-enter-from,
  .song-card-lyric-enter-to,
  .song-card-lyric-leave-from,
  .song-card-lyric-leave-to {
    transform: none;
  }
}
</style>
