<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useData, withBase } from 'vitepress'

interface CourseItem {
  text: string
  link: string
  variant?: 'brand' | 'alt'
}

interface CourseRow {
  items: CourseItem[]
}

interface CourseGroup {
  id: string
  label: string
  title: string
  tone: string
  variant: 'brand' | 'alt'
  rows?: CourseRow[]
  items?: CourseItem[]
}

const { frontmatter } = useData()
const HERO_STACKED_MEDIA = '(max-width: 960px)'

const groups = computed<CourseGroup[]>(() => {
  const raw: CourseGroup[] = (frontmatter.value as any)?.homeCourseGroups ?? []
  // Normalize: if a group uses flat `items` instead of `rows`, wrap into one row
  return raw.map((g) => ({
    ...g,
    rows: g.rows ?? (g.items ? [{ items: g.items }] : []),
  }))
})

// ---- Circle-wrap algorithm ----

const MIN_ROW_WIDTH = 360
const CLEARANCE = 20
const EXTRA_REACH = 46

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function resolveCourseLink(link: string) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(link)) return link

  const url = new URL(link, 'http://vitepress.local')
  const pathname = url.pathname.endsWith('.md')
    ? url.pathname.replace(/\.md$/, '.html')
    : url.pathname
  const normalized = `${pathname}${url.search}${url.hash}`

  return link.startsWith('/') ? withBase(normalized) : normalized
}

function updateCircleWrap() {
  if (typeof window === 'undefined') return

  const rows = document.querySelectorAll<HTMLElement>('.home-course-row')

  if (window.matchMedia(HERO_STACKED_MEDIA).matches) {
    rows.forEach((row) => row.style.removeProperty('--row-width'))
    return
  }

  const image =
    document.querySelector('.hero-image-src') ||
    document.querySelector('.VPHome .VPHero .image-src')

  if (!image) return

  const imageRect = image.getBoundingClientRect()
  const cx = imageRect.left + imageRect.width / 2
  const cy = imageRect.top + imageRect.height / 2
  const r = imageRect.width / 2 + CLEARANCE

  rows.forEach((row) => {
    const rowRect = row.getBoundingClientRect()
    const rowY = rowRect.top + rowRect.height / 2
    const dy = rowY - cy

    let circleLeftAtY: number
    if (Math.abs(dy) >= r) {
      circleLeftAtY = cx
    } else {
      circleLeftAtY = cx - Math.sqrt(r * r - dy * dy)
    }

    const available = circleLeftAtY - rowRect.left - CLEARANCE + EXTRA_REACH
    const parentMax = row.parentElement!.getBoundingClientRect().width + EXTRA_REACH
    const width = clamp(available, MIN_ROW_WIDTH, parentMax)

    row.style.setProperty('--row-width', `${Math.round(width)}px`)
  })
}

let resizeObserver: ResizeObserver | null = null
let resizeHandler: (() => void) | null = null

function setupCircleWrap() {
  if (typeof window === 'undefined') return

  resizeHandler = () => updateCircleWrap()
  window.addEventListener('resize', resizeHandler)

  if (typeof ResizeObserver !== 'undefined') {
    const image =
      document.querySelector('.hero-image-src') ||
      document.querySelector('.VPHome .VPHero .image-src')
    const actionsRoot = document.querySelector('.home-course-actions')

    resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateCircleWrap)
    })

    if (image) resizeObserver.observe(image)
    if (actionsRoot) resizeObserver.observe(actionsRoot)
  }

  nextTick(() => updateCircleWrap())
}

function teardownCircleWrap() {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

onMounted(() => {
  setupCircleWrap()
})

onBeforeUnmount(() => {
  teardownCircleWrap()
})

watch(
  () => frontmatter.value?.homeCourseGroups,
  () => nextTick(updateCircleWrap)
)

watch(
  () => (frontmatter.value as any)?.page?.relativePath,
  () => nextTick(updateCircleWrap)
)
</script>

<template>
  <section v-if="groups.length" class="home-course-actions">
    <div
      v-for="group in groups"
      :key="group.id"
      class="home-course-group"
      :style="{ '--year-color': group.tone }"
    >
      <div class="home-course-group-title">
        <span class="year-dot"></span>
        <span class="year-code">{{ group.label }}</span>
        <span class="year-name">{{ group.title }}</span>
      </div>
      <div class="home-course-lines">
        <div
          v-for="(row, ri) in group.rows"
          :key="ri"
          class="home-course-row"
        >
          <a
            v-for="item in row.items"
            :key="item.link"
            class="home-course-button"
            :class="(item.variant ?? group.variant) === 'brand' ? 'brand' : 'alt'"
            :href="resolveCourseLink(item.link)"
          >
            {{ item.text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-course-actions {
  display: grid;
  gap: 17px;
  max-width: 720px;
  padding-top: 12px;
}

.home-course-group {
  display: grid;
  gap: 9px;
}

.home-course-group-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.year-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--year-color);
  flex-shrink: 0;
}

.year-code {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--year-color) 13%, white);
  color: color-mix(in srgb, var(--year-color) 70%, black);
  white-space: nowrap;
}

.year-name {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

:global(html.dark .home-course-actions .year-name) {
  color: #fff;
}

.home-course-lines {
  display: grid;
  gap: 8px;
}

.home-course-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  max-width: var(--row-width, 100%);
  transition: max-width 0.35s var(--ease-ios-slide, ease);
}

.home-course-button {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 700;
  padding: 0 18px;
  height: 38px;
  border-radius: 19px;
  text-decoration: none;
  transition:
    background-position 0.9s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

/* Brand variant — gradient matching VitePress hero brand button */
.home-course-button.brand {
  color: #fff;
  border-color: transparent;
  background-image: linear-gradient(
    var(--aya-gradient-angle, 140deg),
    var(--aya-gradient-start, #98CBEA) 0%,
    var(--aya-gradient-middle, #C2C7F8) 52%,
    var(--aya-gradient-end, #F1DCE4) 100%
  );
  background-size: 220% 220%;
  background-position: 0% 50%;
  box-shadow: 0 6px 20px rgb(194 199 248 / 35%);
}

.home-course-button.brand:hover,
.home-course-button.brand:focus-visible {
  background-position: 100% 50%;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgb(194 199 248 / 50%);
}

.home-course-button.brand:active {
  transform: translateY(0);
  box-shadow: 0 4px 14px rgb(194 199 248 / 40%);
}

/* Alt variant — subtle gray/white */
.home-course-button.alt {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  border-color: color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
}

.home-course-button.alt:hover,
.home-course-button.alt:focus-visible {
  background-color: color-mix(in srgb, var(--vp-c-bg-soft) 80%, var(--vp-c-brand-1));
  border-color: color-mix(in srgb, var(--vp-c-divider) 50%, var(--vp-c-brand-1));
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
  box-shadow: 0 3px 10px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.home-course-button.alt:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Mobile: disable circle-wrap, full width rows */
@media (max-width: 960px) {
  :global(.VPHome .VPHero .main),
  :global(.VPHome .VPHero .text),
  :global(.VPHome .VPHero .tagline) {
    text-align: center;
  }

  .home-course-actions {
    width: 100%;
    max-width: min(760px, 100%);
    margin: 28px auto 0;
    padding-top: 0;
    justify-items: center;
  }

  .home-course-group {
    width: 100%;
    justify-items: center;
  }

  .home-course-group-title {
    justify-content: center;
    text-align: center;
  }

  .home-course-lines {
    width: 100%;
    justify-items: center;
  }

  .home-course-row {
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100% !important;
  }

  .home-course-button {
    font-size: 13px;
    padding: 0 14px;
    height: 34px;
    border-radius: 17px;
  }
}
</style>
