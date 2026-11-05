<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import courseCoverFallbacks from '../generated/course-covers.json'
import coursePreviews from '../generated/course-previews.json'

interface CourseIndexItem {
  code: string
  title: string
  subtitle?: string
  link: string
  cover?: string
}

interface ResolvedCourseIndexItem extends CourseIndexItem {
  coverUrl: string
  notePath: string
  previewText: string
}

interface CourseIndexGroup {
  title: string
  items: CourseIndexItem[]
}

const props = withDefaults(defineProps<{
  course?: string
  basePath?: string
  groups: CourseIndexGroup[]
}>(), {
  course: 'Course',
  basePath: '',
})

const courseThumbnailUrls = import.meta.glob('../../../Y*/**/*.thumb.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const courseThumbnailUrlByPath = new Map(
  Object.entries(courseThumbnailUrls).map(([path, url]) => [
    normalizeDocsPath(path.replace(/^\.\.\/\.\.\/\.\.\//, '')),
    url,
  ]),
)

const coursePreviewByPath = coursePreviews as Record<string, string>
const courseCoverFallbackByPath = courseCoverFallbacks as Record<string, string>

function stripAngleBrackets(value: string) {
  return value.trim().replace(/^<|>$/g, '')
}

function isSpecialLink(value: string) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)
}

function replaceMarkdownExtension(value: string) {
  return value.replace(/\.md(?=([?#]|$))/i, '.html')
}

function safeDecodePath(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function normalizeDocsPath(value: string) {
  const segments: string[] = []

  for (const segment of value.replace(/\\/g, '/').split('/')) {
    if (!segment || segment === '.') continue
    if (segment === '..') {
      segments.pop()
      continue
    }

    segments.push(segment)
  }

  return segments.join('/')
}

function joinDocsPath(basePath: string, cover: string) {
  if (cover.startsWith('/')) return normalizeDocsPath(cover.replace(/^\/+/, ''))

  return normalizeDocsPath(`${basePath}/${cover}`)
}

function thumbnailPathFor(imagePath: string) {
  return imagePath.replace(/\.[^.]+$/, '.thumb.webp')
}

function resolveNotePath(link: string) {
  const clean = stripAngleBrackets(link)
  if (isSpecialLink(clean)) return ''

  const pathOnly = safeDecodePath(clean.split(/[?#]/)[0] ?? '')
  if (!pathOnly) return ''

  const markdownPath = pathOnly.replace(/\.html$/i, '.md')
  if (markdownPath.startsWith('/')) {
    return normalizeDocsPath(markdownPath.replace(/^\/+/, ''))
  }

  return normalizeDocsPath(`${props.basePath}/${markdownPath}`)
}

function resolveLink(link: string) {
  const clean = stripAngleBrackets(link)
  if (isSpecialLink(clean)) return clean

  const normalized = replaceMarkdownExtension(clean)
  return normalized.startsWith('/') ? withBase(normalized) : normalized
}

function resolveThumbnailUrl(imagePath: string) {
  return courseThumbnailUrlByPath.get(thumbnailPathFor(imagePath)) ?? ''
}

function resolveFallbackCover(notePath: string) {
  const fallbackCover = courseCoverFallbackByPath[notePath]
  return fallbackCover ? resolveThumbnailUrl(fallbackCover) : ''
}

function resolveCover(cover: string | undefined, notePath: string) {
  if (!cover) return ''

  const clean = stripAngleBrackets(cover)
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|data:)/i.test(clean)) return clean

  const imagePath = joinDocsPath(props.basePath, clean)
  return resolveThumbnailUrl(imagePath) || resolveFallbackCover(notePath)
}

function getPreviewText(item: ResolvedCourseIndexItem) {
  return item.previewText || '暂无正文预览'
}

const resolvedGroups = computed(() =>
  props.groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const notePath = resolveNotePath(item.link)

      return {
        ...item,
        coverUrl: resolveFallbackCover(notePath) || resolveCover(item.cover, notePath),
        notePath,
        previewText: coursePreviewByPath[notePath] ?? '',
      }
    }),
  })),
)

</script>

<template>
  <section class="course-index" :aria-label="`${props.course} 课程目录`">
    <section
      v-for="group in resolvedGroups"
      :key="group.title"
      class="course-index-group"
    >
      <h2 class="course-index-group-title">
        <span class="course-index-group-dot"></span>
        <span>{{ group.title }}</span>
      </h2>

      <div
        class="course-index-grid"
        :class="{ 'is-short-row': group.items.length < 3 }"
      >
        <a
          v-for="item in group.items"
          :key="item.link"
          class="course-index-card"
          :href="resolveLink(item.link)"
        >
          <span class="course-index-cover" :class="{ 'is-fallback': !item.coverUrl }">
            <img
              v-if="item.coverUrl"
              :src="item.coverUrl"
              alt=""
              loading="lazy"
            >
            <span v-else class="course-index-cover-code">{{ item.code }}</span>
          </span>

          <span class="course-index-card-body">
            <img
              v-if="item.coverUrl"
              class="course-index-card-body-bg"
              :src="item.coverUrl"
              alt=""
              loading="lazy"
              aria-hidden="true"
            >
            <span class="course-index-card-code">{{ item.code }}</span>
            <span class="course-index-card-title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="course-index-card-subtitle">
              {{ item.subtitle }}
            </span>
          </span>

          <span class="course-index-preview" aria-hidden="true">
            <span class="course-index-preview-body">
              <span class="course-index-preview-code">{{ item.code }}</span>
              <span class="course-index-preview-title">{{ item.title }}</span>
              <span v-if="item.subtitle" class="course-index-preview-subtitle">
                {{ item.subtitle }}
              </span>
              <span class="course-index-preview-text">
                {{ getPreviewText(item) }}
              </span>
            </span>
          </span>
        </a>
      </div>
    </section>
  </section>
</template>

<style scoped>
:global(.course-index-page .VPDoc .container) {
  max-width: calc(var(--vp-layout-max-width) - var(--vp-sidebar-width)) !important;
}

:global(.course-index-page .VPDoc .content) {
  max-width: none !important;
}

:global(.course-index-page .VPDoc .content-container) {
  max-width: min(1120px, 100%) !important;
}

.course-index {
  --course-index-cover-h: 98px;
  --course-index-radius: 8px;
  --course-index-gap: 14px;
  --course-index-card-bg: var(--aya-card-bg, var(--vp-c-bg));
  --course-index-card-border: transparent;
  --course-index-card-hover-border: transparent;
  --course-index-card-outline-shadow:
    var(--aya-card-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 62%, transparent)),
    0 0 0 3px rgb(0 0 0 / 3%),
    0 0 24px 6px rgb(0 0 0 / 7%),
    0 0 46px 12px rgb(0 0 0 / 5%);
  --course-index-card-feather-shadow: 0 0 18px 5px rgb(0 0 0 / 5.5%);
  --course-index-card-depth-shadow: 0 16px 38px rgb(0 0 0 / 13%);
  --course-index-card-inner-shadow: none;
  --course-index-card-hover-outline-shadow:
    var(--aya-card-hover-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent)),
    0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent),
    0 0 28px 8px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent),
    0 0 58px 14px color-mix(in srgb, var(--vp-c-brand-3) 12%, transparent);
  --course-index-card-hover-feather-shadow: 0 0 22px 7px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
  --course-index-card-hover-depth-shadow: 0 18px 42px color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  --course-index-preview-shadow:
    0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 58%, transparent),
    0 24px 70px rgb(34 42 60 / 18%);
  --course-index-card-code-color: var(--vp-c-brand-1);
  container-type: inline-size;
  display: grid;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  gap: 34px;
  margin: 30px 0 36px;
}

:global(.dark .course-index) {
  --course-index-card-bg: var(--aya-card-bg, var(--vp-c-bg));
  --course-index-card-border: transparent;
  --course-index-card-hover-border: transparent;
  --course-index-card-outline-shadow:
    var(--aya-card-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 42%, transparent)),
    0 0 0 3px rgb(0 0 0 / 18%),
    0 0 26px 7px rgb(0 0 0 / 25%),
    0 0 52px 14px rgb(0 0 0 / 18%);
  --course-index-card-feather-shadow: 0 0 18px 6px rgb(0 0 0 / 22%);
  --course-index-card-depth-shadow: 0 16px 38px rgb(0 0 0 / 42%);
  --course-index-card-inner-shadow: none;
  --course-index-card-hover-outline-shadow:
    var(--aya-card-hover-outline-shadow, 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent)),
    0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent),
    0 0 30px 8px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent),
    0 0 62px 16px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  --course-index-card-hover-feather-shadow: 0 0 24px 8px color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent);
  --course-index-card-hover-depth-shadow: 0 18px 42px color-mix(in srgb, var(--vp-c-brand-1) 18%, rgb(0 0 0 / 34%));
  --course-index-preview-shadow:
    0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 42%, transparent),
    0 24px 70px rgb(0 0 0 / 36%);
  --course-index-card-code-color: var(--vp-c-brand-1);
}

.course-index-group {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.course-index-group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  border: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-family: 'Noto Serif SC', 'SimSun', 'Songti SC', 'STSong', serif;
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.3;
}

.course-index-group-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  flex: 0 0 auto;
  background: linear-gradient(
    var(--aya-gradient-angle, 140deg),
    var(--aya-gradient-start, #98CBEA) 0%,
    var(--aya-gradient-middle, #C2C7F8) 52%,
    var(--aya-gradient-end, #F1DCE4) 100%
  );
  box-shadow: 0 0 0 4px rgb(var(--aya-c-ui-accent-rgb, 152 203 234) / 13%);
}

.course-index-grid {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: var(--course-index-gap);
  overflow: visible;
}

.course-index-grid.is-short-row {
  grid-template-columns: 1fr;
}

@container (min-width: 474px) {
  .course-index-grid.is-short-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container (min-width: 718px) {
  .course-index-grid.is-short-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.course-index-card {
  position: relative;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: var(--course-index-cover-h) minmax(96px, auto);
  width: 100%;
  min-width: 0;
  min-height: 194px;
  border: 1px solid var(--course-index-card-border);
  border-radius: var(--course-index-radius);
  corner-shape: squircle;
  overflow: visible;
  background: var(--course-index-card-bg);
  background-clip: padding-box;
  color: var(--vp-c-text-1);
  text-decoration: none;
  box-shadow:
    var(--course-index-card-outline-shadow),
    var(--course-index-card-feather-shadow),
    var(--course-index-card-depth-shadow),
    var(--course-index-card-inner-shadow);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition:
    transform 0.22s var(--ease-ios-fade, ease),
    border-color 0.22s ease,
    background-color 0.22s ease,
    box-shadow 0.22s ease;
}

.course-index-card:hover,
.course-index-card:focus-visible {
  z-index: 2;
  border-color: var(--course-index-card-hover-border);
  background: var(--course-index-card-bg);
  box-shadow:
    var(--course-index-card-hover-outline-shadow),
    var(--course-index-card-hover-feather-shadow),
    var(--course-index-card-hover-depth-shadow),
    var(--course-index-card-inner-shadow);
  transform: translateY(-3px);
}

.course-index-card:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 76%, white);
  outline-offset: 3px;
}

.course-index-cover {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 22%, rgb(255 255 255 / 70%) 0 9%, transparent 10%),
    linear-gradient(
      var(--aya-gradient-angle, 140deg),
      var(--aya-gradient-start, #98CBEA) 0%,
      var(--aya-gradient-middle, #C2C7F8) 52%,
      var(--aya-gradient-end, #F1DCE4) 100%
    );
}

.course-index-cover {
  height: var(--course-index-cover-h);
  border-radius: var(--course-index-radius) var(--course-index-radius) 0 0;
  corner-shape: squircle;
}

.course-index-cover::after {
  content: "";
  position: absolute;
  inset: auto -20% -35%;
  height: 70%;
  background:
    repeating-linear-gradient(90deg, rgb(255 255 255 / 30%) 0 1px, transparent 1px 18px),
    linear-gradient(180deg, transparent, rgb(255 255 255 / 55%));
  transform: rotate(-8deg);
}

.course-index-cover img {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 0;
  object-fit: cover;
}

.course-index-cover.is-fallback {
  display: grid;
  place-items: center;
}

.course-index-cover-code {
  position: relative;
  z-index: 2;
  color: rgb(31 40 53 / 76%);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1;
}

.course-index-card-body {
  position: relative;
  display: grid;
  box-sizing: border-box;
  width: 100%;
  gap: 5px;
  min-width: 0;
  overflow: hidden;
  border-radius: 0 0 var(--course-index-radius) var(--course-index-radius);
  corner-shape: squircle;
  padding: 12px 13px 14px;
  background: var(--course-index-card-bg);
  isolation: isolate;
}

.course-index-card-body::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 42%), rgb(255 255 255 / 68%)),
    color-mix(in srgb, var(--vp-c-bg) 26%, transparent);
}

:global(.dark .course-index-card-body::after) {
  background:
    linear-gradient(180deg, rgb(9 13 20 / 44%), rgb(9 13 20 / 68%)),
    color-mix(in srgb, var(--vp-c-bg) 30%, transparent);
}

.course-index-card-body-bg {
  position: absolute;
  inset: -18px;
  z-index: 0;
  display: block;
  width: calc(100% + 36px);
  max-width: none;
  height: calc(100% + 36px);
  margin: 0;
  border-radius: 0;
  object-fit: cover;
  filter: blur(22px) saturate(1.24);
  opacity: 0.96;
  transform: scale(1.12);
  pointer-events: none;
}

.course-index-card-code,
.course-index-preview-code {
  position: relative;
  z-index: 2;
  color: var(--course-index-card-code-color);
  font-size: 0.78rem;
  font-weight: 850;
  line-height: 1.2;
}

.course-index-card-title,
.course-index-preview-title {
  position: relative;
  z-index: 2;
  color: var(--vp-c-text-1);
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.42;
}

.course-index-card-subtitle,
.course-index-preview-subtitle {
  position: relative;
  z-index: 2;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.45;
}

.course-index-preview {
  position: absolute;
  left: 12px;
  right: 12px;
  top: calc(100% + 10px);
  z-index: 20;
  display: block;
  box-sizing: border-box;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  corner-shape: squircle;
  overflow: hidden;
  background: var(--course-index-card-bg);
  box-shadow: var(--course-index-preview-shadow);
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.course-index-preview-body {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  gap: 7px;
  padding: 14px 15px 15px;
}

.course-index-preview-text {
  display: -webkit-box;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.58;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}

@media (hover: hover) and (pointer: fine) and (min-width: 769px) {
  .course-index-card:hover .course-index-preview,
  .course-index-card:focus-visible .course-index-preview {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .course-index {
    gap: 28px;
    margin: 24px 0 30px;
  }

  .course-index-group-title {
    margin-bottom: 12px;
    font-size: 1.18rem;
  }

  .course-index-grid,
  .course-index-grid.is-short-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .course-index-card {
    grid-template-columns: 92px minmax(0, 1fr);
    grid-template-rows: minmax(84px, auto);
    min-height: 84px;
    overflow: hidden;
  }

  .course-index-cover {
    height: 100%;
    min-height: 84px;
    border-radius: var(--course-index-radius) 0 0 var(--course-index-radius);
    corner-shape: squircle;
  }

  .course-index-card-body {
    align-content: center;
    border-radius: 0 var(--course-index-radius) var(--course-index-radius) 0;
    corner-shape: squircle;
    padding: 10px 12px;
  }

  .course-index-card-code {
    font-size: 0.72rem;
  }

  .course-index-card-title {
    font-size: 0.9rem;
  }

  .course-index-card-subtitle {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 0.78rem;
  }

  .course-index-preview {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .course-index-card,
  .course-index-preview {
    transition: none;
  }

  .course-index-card:hover,
  .course-index-card:focus-visible {
    transform: none;
  }
}
</style>
