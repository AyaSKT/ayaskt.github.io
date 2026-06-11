<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

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
  previewKey: string
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

const courseImageUrls = import.meta.glob('../../../Y3S*/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const courseNoteLoaders = import.meta.glob('../../../Y3S*/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const courseImageUrlByPath = new Map(
  Object.entries(courseImageUrls).map(([path, url]) => [
    normalizeDocsPath(path.replace(/^\.\.\/\.\.\/\.\.\//, '')),
    url,
  ]),
)

const courseNoteLoaderByPath = new Map(
  Object.entries(courseNoteLoaders).map(([path, loader]) => [
    normalizeDocsPath(path.replace(/^\.\.\/\.\.\/\.\.\//, '')),
    loader,
  ]),
)

const previewTexts = ref<Record<string, string>>({})
const previewLoading = ref<Record<string, boolean>>({})
const previewFailures = ref<Record<string, boolean>>({})

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

function resolveCover(cover?: string) {
  if (!cover) return ''

  const clean = stripAngleBrackets(cover)
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|data:)/i.test(clean)) return clean

  return courseImageUrlByPath.get(joinDocsPath(props.basePath, clean)) ?? ''
}

function isTocHeading(value: string) {
  const headingText = value.trim().replace(/^#{1,6}\s+/, '')
  return /(?:章节目录|目录|Table of Contents|Contents)/i.test(headingText)
}

function headingLevel(value: string) {
  return value.trim().match(/^(#{1,6})\s+/)?.[1].length ?? 0
}

function withoutFrontmatter(markdown: string) {
  return markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
}

function getLinesAfterToc(lines: string[]) {
  const tocIndex = lines.findIndex((line) => isTocHeading(line))
  if (tocIndex === -1) return { lines, hasToc: false }

  const tocLevel = headingLevel(lines[tocIndex]) || 2
  const bodyStart = lines.findIndex((line, index) => {
    const level = headingLevel(line)
    return index > tocIndex && level > 0 && level <= tocLevel
  })

  return {
    lines: bodyStart >= 0 ? lines.slice(bodyStart) : [],
    hasToc: true,
  }
}

function cleanMarkdownLine(line: string) {
  let text = line.trim()
  if (!text || /^---+$/.test(text) || /^!\[[^\]]*]/.test(text)) return ''
  if (/^<\/?(?:div|span|p|br)\b/i.test(text)) return ''

  if (/^\|/.test(text)) {
    const cells = text
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)

    if (!cells.length || cells.every((cell) => /^:?-{3,}:?$/.test(cell))) return ''
    text = cells.slice(0, 2).join(': ')
  }

  return text
    .replace(/^#{1,6}\s+/, '')
    .replace(/^>{1,}\s*/, '')
    .replace(/^\[!(?:NOTE|TIP|IMPORTANT|CAUTION|WARNING)\]\s*/i, '')
    .replace(/^:{3,4}\s*\w*\s*/, '')
    .replace(/^[-*+]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerptMarkdown(markdown: string) {
  const { lines, hasToc } = getLinesAfterToc(withoutFrontmatter(markdown).split(/\r?\n/))
  const firstBodyHeading = hasToc ? 0 : lines.findIndex((line) => /^##\s+/.test(line.trim()))
  const bodyLines = firstBodyHeading >= 0 ? lines.slice(firstBodyHeading) : lines
  const parts: string[] = []
  let inFence = false
  let inMath = false

  for (const line of bodyLines) {
    const trimmed = line.trim()

    if (/^```/.test(trimmed)) {
      inFence = !inFence
      continue
    }

    if (/^\$\$/.test(trimmed)) {
      inMath = !inMath
      continue
    }

    if (inFence || inMath) continue

    const text = cleanMarkdownLine(line)
    if (!text) continue

    parts.push(text)
    if (parts.join(' ').length >= 260 || parts.length >= 5) break
  }

  const preview = parts.join(' / ')
  if (!preview) return '暂无正文预览'

  return preview.length > 280 ? `${preview.slice(0, 277)}...` : preview
}

function setPreviewText(key: string, value: string) {
  previewTexts.value = { ...previewTexts.value, [key]: value }
}

function setPreviewLoading(key: string, value: boolean) {
  previewLoading.value = { ...previewLoading.value, [key]: value }
}

function setPreviewFailure(key: string, value: boolean) {
  previewFailures.value = { ...previewFailures.value, [key]: value }
}

async function loadPreview(item: ResolvedCourseIndexItem) {
  if (!item.previewKey || previewTexts.value[item.previewKey] || previewLoading.value[item.previewKey]) {
    return
  }

  const loader = courseNoteLoaderByPath.get(item.notePath)
  if (!loader) {
    setPreviewText(item.previewKey, '暂无正文预览')
    return
  }

  setPreviewLoading(item.previewKey, true)
  setPreviewFailure(item.previewKey, false)

  try {
    const markdown = await loader()
    setPreviewText(item.previewKey, excerptMarkdown(markdown))
  } catch {
    setPreviewFailure(item.previewKey, true)
  } finally {
    setPreviewLoading(item.previewKey, false)
  }
}

function getPreviewText(item: ResolvedCourseIndexItem) {
  if (previewTexts.value[item.previewKey]) return previewTexts.value[item.previewKey]
  if (previewLoading.value[item.previewKey]) return '正在读取正文预览...'
  if (previewFailures.value[item.previewKey]) return '暂时无法读取正文预览'

  return '正在读取正文预览...'
}

const resolvedGroups = computed(() =>
  props.groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const notePath = resolveNotePath(item.link)

      return {
        ...item,
        coverUrl: resolveCover(item.cover),
        notePath,
        previewKey: notePath || item.link,
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
          @focus="loadPreview(item)"
          @pointerenter="loadPreview(item)"
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
  container-type: inline-size;
  display: grid;
  gap: 34px;
  margin: 30px 0 36px;
}

.course-index-group {
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
  box-shadow: 0 0 0 4px rgb(152 203 234 / 13%);
}

.course-index-grid {
  display: grid;
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
  min-width: 0;
  min-height: 194px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 84%, transparent);
  border-radius: var(--course-index-radius);
  overflow: visible;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, transparent);
  color: var(--vp-c-text-1);
  text-decoration: none;
  box-shadow: 0 10px 28px rgb(34 42 60 / 5%);
  transition:
    transform 0.22s var(--ease-ios-fade, ease),
    border-color 0.22s ease,
    background-color 0.22s ease,
    box-shadow 0.22s ease;
}

.course-index-card:hover,
.course-index-card:focus-visible {
  z-index: 2;
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 58%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg-soft));
  box-shadow: 0 16px 42px rgb(34 42 60 / 11%);
  transform: translateY(-3px);
}

.course-index-card:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 76%, white);
  outline-offset: 3px;
}

.course-index-cover {
  position: relative;
  display: block;
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
  display: grid;
  gap: 5px;
  min-width: 0;
  padding: 12px 13px 14px;
}

.course-index-card-code,
.course-index-preview-code {
  color: var(--vp-c-brand-1);
  font-size: 0.78rem;
  font-weight: 750;
  line-height: 1.2;
}

.course-index-card-title,
.course-index-preview-title {
  color: var(--vp-c-text-1);
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.42;
}

.course-index-card-subtitle,
.course-index-preview-subtitle {
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
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  border-radius: 10px;
  overflow: hidden;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  box-shadow: 0 24px 70px rgb(34 42 60 / 20%);
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.course-index-preview-body {
  display: grid;
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
    min-height: 84px;
    overflow: hidden;
  }

  .course-index-cover {
    height: 100%;
    min-height: 84px;
    border-radius: var(--course-index-radius) 0 0 var(--course-index-radius);
  }

  .course-index-card-body {
    align-content: center;
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
