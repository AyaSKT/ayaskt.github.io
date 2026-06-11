<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

interface CourseIndexItem {
  code: string
  title: string
  subtitle?: string
  link: string
  cover?: string
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

const courseImageUrlByPath = new Map(
  Object.entries(courseImageUrls).map(([path, url]) => [
    normalizeDocsPath(path.replace(/^\.\.\/\.\.\/\.\.\//, '')),
    url,
  ]),
)

function stripAngleBrackets(value: string) {
  return value.trim().replace(/^<|>$/g, '')
}

function isSpecialLink(value: string) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)
}

function replaceMarkdownExtension(value: string) {
  return value.replace(/\.md(?=([?#]|$))/i, '.html')
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

const resolvedGroups = computed(() =>
  props.groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      coverUrl: resolveCover(item.cover),
    })),
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
            <span class="course-index-card-code">{{ item.code }}</span>
            <span class="course-index-card-title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="course-index-card-subtitle">
              {{ item.subtitle }}
            </span>
          </span>

          <span class="course-index-preview" aria-hidden="true">
            <span class="course-index-preview-cover" :class="{ 'is-fallback': !item.coverUrl }">
              <img
                v-if="item.coverUrl"
                :src="item.coverUrl"
                alt=""
                loading="lazy"
              >
              <span v-else class="course-index-cover-code">{{ item.code }}</span>
            </span>
            <span class="course-index-preview-body">
              <span class="course-index-preview-code">{{ item.code }}</span>
              <span class="course-index-preview-title">{{ item.title }}</span>
              <span v-if="item.subtitle" class="course-index-preview-subtitle">
                {{ item.subtitle }}
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

.course-index-cover,
.course-index-preview-cover {
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

.course-index-cover::after,
.course-index-preview-cover::after {
  content: "";
  position: absolute;
  inset: auto -20% -35%;
  height: 70%;
  background:
    repeating-linear-gradient(90deg, rgb(255 255 255 / 30%) 0 1px, transparent 1px 18px),
    linear-gradient(180deg, transparent, rgb(255 255 255 / 55%));
  transform: rotate(-8deg);
}

.course-index-cover img,
.course-index-preview-cover img {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.course-index-cover.is-fallback,
.course-index-preview-cover.is-fallback {
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

.course-index-preview-cover {
  height: 150px;
}

.course-index-preview-body {
  display: grid;
  gap: 6px;
  padding: 13px 15px 15px;
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
