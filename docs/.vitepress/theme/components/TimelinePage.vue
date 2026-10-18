<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import timelineEntries from '../generated/timeline-entries.json'
import { readMotionDuration } from '../motion-tokens'
import HeroHitokoto from './HeroHitokoto.vue'

interface TimelineNote {
  title: string
  href: string
  updatedAt: string
  locked: boolean
}

interface TimelineEntry {
  id: string
  period: string
  course: string
  title: string
  description: string
  image: string
  hasCover: boolean
  imageAlt: string
  imagePosition?: string
  accent: 'amber' | 'blue' | 'cyan' | 'frost' | 'green' | 'indigo' | 'purple' | 'rose' | 'teal'
  dateAccent: 'amber' | 'blue' | 'cyan' | 'frost' | 'green' | 'indigo' | 'purple' | 'rose' | 'teal'
  noteMeta: string
  updatedAt: string
  notes: TimelineNote[]
}

interface TimelineExitRequestDetail {
  handled: boolean
  complete: () => void
}

type TimelineRevealKind = 'initial' | 'scroll'

const entries = timelineEntries as TimelineEntry[]
const TIMELINE_EXIT_DURATION_FALLBACK = 300
const TIMELINE_STAGGER_FALLBACK = 70
const TIMELINE_LEAD_FALLBACK = 360
const TIMELINE_FILL_FALLBACK = 340
const TIMELINE_FOLLOW_FALLBACK = 120
/** 进度实线的前沿停在视口这一高度；滚到页底时直接铺满 */
const FILL_LINE = 0.8

const { frontmatter } = useData()
const pageTitle = computed(() => frontmatter.value.title || '时间线')
const titleChars = computed(() => Array.from(pageTitle.value as string))
const pageKicker = computed(() => frontmatter.value.timeline?.kicker || '')
const timelineAriaLabel = computed(() => frontmatter.value.timeline?.ariaLabel || pageTitle.value)
const openId = ref<string | null>(null)

const span = entries.length ? `${entries[entries.length - 1].period} — ${entries[0].period}` : ''

let timelineRoot: HTMLElement | null = null
let timelineTrack: HTMLElement | null = null
let timelineElements: HTMLElement[] = []
let timelineDots: (HTMLElement | null)[] = []
let timelineObserver: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined
let enterFrame = 0
let exitTimer = 0
let enterStarted = false
let exitPromise: Promise<void> | undefined

let fillFrame = 0
let fillValue = 0
let fillLast = 0
let fillIntro = true
let fillTau = TIMELINE_FILL_FALLBACK
let followTau = TIMELINE_FOLLOW_FALLBACK
let currentIndex = -1
function toggleEntry(id: string) {
  openId.value = openId.value === id ? null : id
}

function titleDensity(title: string) {
  if (title.length > 34) return 'is-dense'
  if (title.length > 22) return 'is-compact'
  return undefined
}

function formatNoteDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value))
}

function motionEnabled() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

function isRouteTransitionActive() {
  const root = document.documentElement
  return root.classList.contains('vt-home-to-doc')
    || root.classList.contains('vt-doc-to-doc')
    || root.classList.contains('vt-doc-content-transition')
    || root.classList.contains('vt-to-doc-content')
}

function entryIsInViewport(entry: HTMLElement) {
  const rect = entry.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight * 0.96
}

/* ---- 进度实线：前沿追随滚动，经过的节点与月份依次点亮 ---- */

// 底轨入场时带 scaleY，位置和高度都按布局值算，不读变换后的包围盒。
function trackTop() {
  return timelineTrack!.parentElement!.getBoundingClientRect().top + timelineTrack!.offsetTop
}

function fillTarget() {
  if (!timelineTrack) return 0
  const height = timelineTrack.offsetHeight
  const doc = document.documentElement
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) return height
  return Math.max(0, Math.min(height, window.innerHeight * FILL_LINE - trackTop()))
}

function applyFill() {
  if (!timelineTrack) return
  timelineTrack.style.setProperty('--tl-fill', `${fillValue.toFixed(1)}px`)
  const top = trackTop()
  let current = -1
  timelineElements.forEach((entry, index) => {
    const dot = timelineDots[index]
    if (!dot) return
    const rect = dot.getBoundingClientRect()
    const passed = rect.top + rect.height / 2 - top <= fillValue + 0.5
    entry.classList.toggle('is-passed', passed)
    if (passed) current = index
  })
  if (current !== currentIndex) {
    timelineElements[currentIndex]?.classList.remove('is-current')
    timelineElements[current]?.classList.add('is-current')
    currentIndex = current
  }
}

function stepFill(now: number) {
  fillFrame = 0
  if (!timelineTrack) return
  const dt = fillLast ? Math.min(64, now - fillLast) : 16
  fillLast = now
  const target = fillTarget()
  const tau = fillIntro ? fillTau : followTau
  fillValue += (target - fillValue) * (1 - Math.exp(-dt / Math.max(1, tau)))
  if (Math.abs(target - fillValue) < 0.5) {
    fillValue = target
    fillIntro = false
  }
  applyFill()
  if (fillValue !== target) fillFrame = window.requestAnimationFrame(stepFill)
  else fillLast = 0
}

function kickFill() {
  if (!fillFrame && timelineTrack) fillFrame = window.requestAnimationFrame(stepFill)
}

/* ---- 卡片入场 / 离场 ---- */

function finishEntryReveal(entry: HTMLElement) {
  if (entry.classList.contains('is-motion-exiting')) return

  entry.classList.remove('is-motion-revealing', 'is-initial-reveal', 'is-scroll-reveal')
  entry.classList.add('is-motion-revealed')
  entry.style.removeProperty('--timeline-entry-delay')
}

function revealEntry(entry: HTMLElement, delayIndex: number, kind: TimelineRevealKind) {
  if (!entry.classList.contains('is-motion-pending')) return

  const stagger = readMotionDuration('--dur-timeline-stagger', TIMELINE_STAGGER_FALLBACK)
  const lead = kind === 'initial' ? readMotionDuration('--dur-timeline-lead', TIMELINE_LEAD_FALLBACK) : 0

  timelineObserver?.unobserve(entry)
  entry.style.setProperty('--timeline-entry-delay', `${lead + delayIndex * stagger}ms`)
  entry.classList.remove('is-motion-pending')
  entry.classList.add('is-motion-revealing', kind === 'initial' ? 'is-initial-reveal' : 'is-scroll-reveal')

  // 整组动画由条目自身一段空关键帧计时，结束后再撤掉入场状态，避免截断仍在播放的子元素。
  const onEnd = (event: AnimationEvent) => {
    if (event.target !== entry || event.animationName !== 'timeline-hold') return
    entry.removeEventListener('animationend', onEnd)
    finishEntryReveal(entry)
  }
  entry.addEventListener('animationend', onEnd)
}

function startTimelineEnter() {
  if (enterStarted || !timelineRoot) return
  enterStarted = true
  window.removeEventListener('vt-transition-ready', startTimelineEnter)
  window.removeEventListener('vt-transition-done', startTimelineEnter)

  timelineRoot.classList.add('is-intro')
  kickFill()

  timelineElements
    .filter(entryIsInViewport)
    .sort((left, right) => left.getBoundingClientRect().top - right.getBoundingClientRect().top)
    .forEach((entry, index) => revealEntry(entry, index, 'initial'))
}

function observeTimelineEntries() {
  if (!('IntersectionObserver' in window)) {
    timelineElements.forEach((entry) => revealEntry(entry, 0, 'scroll'))
    return
  }

  timelineObserver = new IntersectionObserver((changes) => {
    if (!enterStarted) return

    changes
      .filter((change) => change.isIntersecting)
      .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)
      .forEach((change, index) => revealEntry(change.target as HTMLElement, index, 'scroll'))
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08,
  })

  timelineElements.forEach((entry) => timelineObserver?.observe(entry))
}

function playTimelineExit() {
  if (exitPromise) return exitPromise
  if (!timelineRoot || !motionEnabled()) return Promise.resolve()

  exitPromise = new Promise<void>((resolve) => {
    timelineObserver?.disconnect()
    window.removeEventListener('scroll', kickFill)
    if (fillFrame) window.cancelAnimationFrame(fillFrame)
    fillFrame = 0
    timelineRoot?.classList.add('is-motion-exiting')

    const visibleEntries = timelineElements
      .filter((entry) => !entry.classList.contains('is-motion-pending') && entryIsInViewport(entry))
      .sort((left, right) => right.getBoundingClientRect().top - left.getBoundingClientRect().top)

    const stagger = readMotionDuration('--dur-timeline-stagger', TIMELINE_STAGGER_FALLBACK) * 0.5
    const duration = readMotionDuration('--dur-timeline-exit', TIMELINE_EXIT_DURATION_FALLBACK)

    visibleEntries.forEach((entry, index) => {
      entry.classList.remove('is-motion-revealing', 'is-initial-reveal', 'is-scroll-reveal')
      entry.classList.add('is-motion-exiting')
      entry.style.setProperty('--timeline-entry-delay', `${index * stagger}ms`)
    })

    exitTimer = window.setTimeout(() => {
      exitTimer = 0
      timelineRoot?.classList.add('is-motion-exit-complete')
      resolve()
    }, duration + Math.max(0, visibleEntries.length - 1) * stagger)
  })

  return exitPromise
}

function onTimelineExitRequest(event: Event) {
  const detail = (event as CustomEvent<TimelineExitRequestDetail>).detail
  if (!detail) return

  detail.handled = true
  void playTimelineExit().then(detail.complete, detail.complete)
}

onMounted(() => {
  document.documentElement.classList.add('timeline-page-active')
  timelineRoot = document.querySelector<HTMLElement>('.timeline-page')
  timelineTrack = timelineRoot?.querySelector<HTMLElement>('.timeline-track') ?? null
  timelineElements = timelineRoot
    ? Array.from(timelineRoot.querySelectorAll<HTMLElement>('.timeline-entry'))
    : []
  timelineDots = timelineElements.map((entry) => entry.querySelector<HTMLElement>('.timeline-dot'))

  window.addEventListener('timeline-page-exit-request', onTimelineExitRequest)

  const motion = !!timelineRoot && motionEnabled()
  fillTau = motion ? readMotionDuration('--dur-timeline-fill', TIMELINE_FILL_FALLBACK) : 1
  followTau = motion ? readMotionDuration('--dur-timeline-follow', TIMELINE_FOLLOW_FALLBACK) : 1
  timelineRoot?.classList.add('is-fill-ready')
  window.addEventListener('scroll', kickFill, { passive: true })
  window.addEventListener('resize', kickFill)
  if ('ResizeObserver' in window && timelineRoot) {
    resizeObserver = new ResizeObserver(kickFill)
    resizeObserver.observe(timelineRoot.querySelector('.timeline') ?? timelineRoot)
  }

  if (!motion) {
    timelineElements.forEach((entry) => entry.classList.add('is-motion-revealed'))
    kickFill()
    return
  }

  timelineRoot!.classList.add('is-motion-ready')
  timelineElements.forEach((entry) => entry.classList.add('is-motion-pending'))
  observeTimelineEntries()

  // 新页面快照是实时画面：快照一就绪就开始入场，和切换的淡入同时进行，不留空白页。
  if (isRouteTransitionActive()) {
    window.addEventListener('vt-transition-ready', startTimelineEnter, { once: true })
    window.addEventListener('vt-transition-done', startTimelineEnter, { once: true })
    return
  }

  enterFrame = window.requestAnimationFrame(() => {
    enterFrame = window.requestAnimationFrame(startTimelineEnter)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('timeline-page-exit-request', onTimelineExitRequest)
  window.removeEventListener('vt-transition-ready', startTimelineEnter)
  window.removeEventListener('vt-transition-done', startTimelineEnter)
  window.removeEventListener('scroll', kickFill)
  window.removeEventListener('resize', kickFill)
  timelineObserver?.disconnect()
  timelineObserver = undefined
  resizeObserver?.disconnect()
  resizeObserver = undefined
  if (enterFrame) window.cancelAnimationFrame(enterFrame)
  if (fillFrame) window.cancelAnimationFrame(fillFrame)
  if (exitTimer) window.clearTimeout(exitTimer)
  fillFrame = 0
  timelineRoot = null
  timelineTrack = null
  timelineElements = []
  timelineDots = []
  document.documentElement.classList.remove('timeline-page-active')
})
</script>

<template>
  <main class="timeline-page" aria-labelledby="timeline-title">
    <header class="timeline-intro">
      <i class="timeline-mark timeline-mark--tl" aria-hidden="true" />
      <i class="timeline-mark timeline-mark--tr" aria-hidden="true" />
      <div class="timeline-intro-copy">
        <p v-if="pageKicker" class="timeline-kicker"><i aria-hidden="true" />{{ pageKicker }}</p>
        <h1 id="timeline-title" :aria-label="pageTitle">
          <span class="timeline-ghost" aria-hidden="true">Timeline</span>
          <span
            v-for="(char, i) in titleChars"
            :key="i"
            class="timeline-title-char"
            :style="{ '--c': i }"
            aria-hidden="true"
          >{{ char }}</span>
        </h1>
        <HeroHitokoto class="timeline-lead" scope="timeline" />
        <div class="timeline-stats">
          <span class="timeline-stat timeline-stat--span" aria-label="时间跨度">{{ span }}</span>
        </div>
      </div>
      <i class="timeline-ruler" aria-hidden="true" />
    </header>

    <section class="timeline" :aria-label="timelineAriaLabel">
      <div class="timeline-track" aria-hidden="true">
        <i class="timeline-track-fill" />
        <i class="timeline-track-head" />
      </div>

      <article
        v-for="(entry, index) in entries"
        :id="entry.id"
        :key="entry.id"
        class="timeline-entry"
        :class="[
          `timeline-entry--${entry.accent}`,
          `timeline-date--${entry.dateAccent}`,
          { 'is-open': openId === entry.id },
        ]"
      >
        <time
          v-if="index === 0 || entries[index - 1].period !== entry.period"
          class="timeline-period"
          :datetime="entry.period.replace('.', '-')"
        >
          <span class="timeline-year">{{ entry.period.split('.')[0] }}</span>
          <strong class="timeline-month">{{ entry.period.split('.')[1] }}</strong>
        </time>

        <div class="timeline-rail" aria-hidden="true">
          <span class="timeline-dot"></span>
        </div>

        <div class="timeline-card" :class="{ 'is-coverless': !entry.hasCover }">
          <button
            class="timeline-card-trigger"
            :class="{ 'is-coverless': !entry.hasCover }"
            type="button"
            :aria-expanded="openId === entry.id"
            :aria-controls="`${entry.id}-drawer`"
            @click="toggleEntry(entry.id)"
          >
            <span v-if="entry.hasCover" class="timeline-cover">
              <img
                class="timeline-cover-image"
                :src="entry.image"
                :alt="entry.imageAlt"
                :style="{ objectPosition: entry.imagePosition }"
                loading="lazy"
              >
            </span>

            <span class="timeline-copy">
              <span class="timeline-stage" style="--k: 0">
                <span>{{ entry.course }}</span>
                <span class="timeline-count">{{ entry.notes.length }} 篇</span>
              </span>
              <strong class="timeline-card-title" :class="titleDensity(entry.title)" style="--k: 1">
                {{ entry.title }}
              </strong>
              <span v-if="entry.description" class="timeline-description" style="--k: 2">{{ entry.description }}</span>
              <span class="timeline-expand-label" style="--k: 3">
                {{ openId === entry.id ? '收起' : '展开' }}
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </span>
            </span>
          </button>

          <div
            :id="`${entry.id}-drawer`"
            class="timeline-drawer-grid"
            :class="{ 'is-expanded': openId === entry.id }"
            :aria-hidden="openId !== entry.id"
          >
            <div class="timeline-drawer-clip">
              <div class="timeline-drawer">
                <p>{{ entry.noteMeta }}</p>
                <nav :aria-label="`${entry.title}笔记入口`">
                  <a
                    v-for="(note, ni) in entry.notes"
                    :key="note.href"
                    class="timeline-note-link"
                    :href="note.href"
                    :style="{ '--n': Math.min(ni, 12) }"
                    :tabindex="openId === entry.id ? 0 : -1"
                  >
                    <span>
                      <strong>{{ note.title }}</strong>
                      <small>
                        {{ formatNoteDate(note.updatedAt) }}
                      </small>
                    </span>
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10h11m-4-4 4 4-4 4" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style>
html.timeline-page-active {
  scroll-behavior: smooth;
}

.Layout.timeline-layout {
  background: var(--vp-c-bg);
}

html.timeline-page-active .ripple-ring {
  --ripple-size: 96px;
  animation-duration: var(--dur-menu);
  border-width: 1px;
}

html.timeline-page-active .VPFooter,
html.timeline-page-active .VPLocalNav,
html.timeline-page-active .VPSidebar,
html.timeline-page-active .aside,
html.timeline-page-active .doc-footer,
html.timeline-page-active .content-container > .main > .vp-doc > h1,
html.timeline-page-active .content-container > .main > .vp-doc > .header-anchor {
  display: none !important;
}

html.timeline-page-active .VPPage {
  padding: 0 !important;
}

/* ================================================================
   页面骨架与令牌
   ================================================================ */

.timeline-page {
  --timeline-accent: var(--vp-c-brand-1);
  --timeline-ink: var(--vp-c-text-1);
  --timeline-ink-3: var(--vp-c-text-3);
  --timeline-card-bg: var(--vp-c-bg-elv);
  --timeline-card-title-color: var(--vp-c-text-1);
  --timeline-drawer-bg: color-mix(in srgb, var(--vp-c-bg-soft) 42%, transparent);
  --timeline-line: color-mix(in srgb, var(--vp-c-brand-1) 22%, var(--vp-c-divider));
  --timeline-card-radius: var(--aya-radius-lg, 20px);
  --timeline-drawer-radius: var(--aya-radius-sm, 12px);
  --timeline-serif: 'Noto Serif CJK SC', 'Noto Serif SC', 'Songti SC', 'STSong', serif;
  --timeline-serif-latin: 'Bodoni Moda', Didot, 'Bodoni 72', 'Bodoni MT', 'Times New Roman', serif;
  --timeline-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  --timeline-ease: var(--ease-home-orbit, cubic-bezier(0.22, 1, 0.36, 1));
  --timeline-focus: var(--ease-doc-focus, cubic-bezier(0.2, 0.7, 0.1, 1));
  --tl-blur: var(--timeline-focus-blur, 10px);
  /* 轨道中心线位置 = 日期列宽 + 节点列宽的一半 */
  --tl-col-date: 138px;
  --tl-col-rail: 52px;
  position: relative;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 0 clamp(18px, 5vw, 72px) 112px;
  color: var(--vp-c-text-1);
  background: transparent;
  overflow-x: clip;
}

:root:not(.dark) .timeline-page { --timeline-ink: #141413; }

/* 抬头背后的点阵图纸，向下羽化消失 */
.timeline-page::before {
  position: absolute;
  inset: 0 0 auto;
  height: min(880px, 110svh);
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-3) 34%, transparent) 0.8px, transparent 1.2px);
  background-size: 22px 22px;
  background-position: center top;
  mask-image: radial-gradient(ellipse 70% 62% at 50% 34%, #000 0%, rgb(0 0 0 / 40%) 55%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 62% at 50% 34%, #000 0%, rgb(0 0 0 / 40%) 55%, transparent 100%);
  pointer-events: none;
  content: '';
}

.timeline-intro,
.timeline {
  position: relative;
  width: min(1060px, 100%);
  margin-right: auto;
  margin-left: auto;
}

/* ================================================================
   抬头：短线 + 刻度标签、宋体大字叠描边 Timeline、统计、点线刻度尺
   ================================================================ */

.timeline-intro {
  display: flex;
  min-height: clamp(380px, 54svh, 560px);
  padding: clamp(44px, 5vw, 64px) 0 clamp(40px, 4.6vw, 56px);
  margin-bottom: clamp(52px, 6vw, 80px);
  align-items: center;
}

/* 四角套准十字（只画上方两个，下方由刻度尺收边） */
.timeline-mark {
  position: absolute;
  top: 18px;
  width: 13px;
  height: 13px;
  background:
    linear-gradient(var(--timeline-line), var(--timeline-line)) center / 1px 100% no-repeat,
    linear-gradient(var(--timeline-line), var(--timeline-line)) center / 100% 1px no-repeat;
}

.timeline-mark--tl { left: -6px; }
.timeline-mark--tr { right: -6px; }

.timeline-intro-copy {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-kicker {
  display: inline-flex;
  margin: 0 0 clamp(34px, 4vw, 52px);
  color: var(--timeline-accent);
  font: 500 11px/1 var(--timeline-mono);
  letter-spacing: 0.22em;
  gap: 14px;
  align-items: center;
}

.timeline-kicker i {
  display: block;
  width: 32px;
  height: 1px;
  background: currentColor;
  transform-origin: left center;
}

.timeline-intro h1 {
  position: relative;
  display: flex;
  margin: 0;
  color: var(--timeline-ink);
  font-family: var(--timeline-serif);
  font-size: clamp(5.25rem, 10.4vw, 8.75rem);
  font-weight: 900;
  line-height: 0.96;
  letter-spacing: -0.04em;
}

.timeline-title-char {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.timeline-ghost {
  position: absolute;
  z-index: 0;
  top: -0.2em;
  left: 0.9em;
  color: transparent;
  font-family: var(--timeline-serif-latin);
  font-size: 0.86em;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.02em;
  white-space: nowrap;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--timeline-accent) 55%, transparent);
  pointer-events: none;
  user-select: none;
}

.timeline-lead,
.timeline-intro .timeline-lead.hero-hitokoto {
  width: min(34rem, 100%);
  margin: clamp(30px, 3.6vw, 44px) 0 0;
  color: var(--vp-c-text-2);
  font-family: var(--timeline-serif);
  font-size: clamp(1.02rem, 1.6vw, 1.22rem);
  line-height: 1.85;
  text-align: left;
}

.timeline-stats {
  display: flex;
  margin: clamp(30px, 3.6vw, 44px) 0 0;
  padding: 0;
  gap: clamp(28px, 4.6vw, 56px);
  flex-wrap: wrap;
}

.timeline-stat {
  color: var(--timeline-ink);
  font-family: var(--timeline-serif-latin);
  font-size: clamp(1.9rem, 3.2vw, 2.5rem);
  font-weight: 500;
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1;
}

.timeline-stat--span {
  color: var(--timeline-accent);
  font-style: italic;
}

/* 抬头底边：每 48px 一枚长刻度 + 每 8px 一枚短刻度，向右渐隐 */
.timeline-ruler {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 7px;
  background-image:
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--timeline-accent) 46%, transparent) 0 1px, transparent 1px 48px),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--timeline-accent) 18%, transparent) 0 1px, transparent 1px 8px);
  background-position: left top, left bottom;
  background-repeat: no-repeat;
  background-size: 100% 7px, 100% 3px;
  mask-image: linear-gradient(90deg, #000 0%, #000 64%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 64%, transparent 100%);
  transform-origin: left center;
}

/* ================================================================
   时间轴：点线底轨 + 追随滚动的进度实线
   ================================================================ */

.timeline-track {
  --tl-fill: 0px;
  position: absolute;
  top: 14px;
  bottom: 24px;
  left: calc(var(--tl-col-date) + var(--tl-col-rail) / 2 - 0.5px);
  width: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-3) 55%, transparent) 0.7px, transparent 0.9px);
  background-size: 1px 5px;
  transform-origin: center top;
  pointer-events: none;
}

.timeline-track-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: var(--tl-fill);
  background: linear-gradient(to bottom, transparent, var(--timeline-accent) 56px);
}

/* 前沿珠子：一段彗尾 + 光晕 */
.timeline-track-head {
  position: absolute;
  top: var(--tl-fill);
  left: 0.5px;
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: var(--timeline-accent);
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--timeline-accent) 14%, transparent),
    0 0 18px 2px color-mix(in srgb, var(--timeline-accent) 34%, transparent);
  opacity: 0;
  transition: opacity var(--dur-menu) var(--ease-ios-fade);
}

.timeline-track-head::before {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 3px;
  height: 72px;
  margin-left: -1.5px;
  border-radius: 2px;
  background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--timeline-accent) 55%, transparent));
  filter: blur(1px);
  content: '';
}

.timeline-page.is-fill-ready .timeline-track-head { opacity: 1; }

.timeline-entry {
  --timeline-accent: var(--vp-c-brand-1);
  --timeline-date-accent: var(--timeline-accent);
  position: relative;
  display: grid;
  grid-template-columns: var(--tl-col-date) var(--tl-col-rail) minmax(0, 1fr);
  align-items: start;
  padding-bottom: clamp(54px, 7vw, 76px);
}

.timeline-entry--cyan { --timeline-accent: #8fbcbb; }
.timeline-entry--blue { --timeline-accent: #5e81ac; }
.timeline-entry--green { --timeline-accent: #a3be8c; }
.timeline-entry--purple { --timeline-accent: #b48ead; }
.timeline-entry--frost { --timeline-accent: #76a8bd; }
.timeline-entry--indigo { --timeline-accent: #7886b7; }
.timeline-entry--rose { --timeline-accent: #bd86a3; }
.timeline-entry--amber { --timeline-accent: #c99d62; }
.timeline-entry--teal { --timeline-accent: #6fa8a6; }

.dark .timeline-entry--blue { --timeline-accent: #81a1c1; }
.dark .timeline-entry--frost { --timeline-accent: #88c0d0; }
.dark .timeline-entry--indigo { --timeline-accent: #91a0d0; }
.dark .timeline-entry--rose { --timeline-accent: #d092b1; }
.dark .timeline-entry--amber { --timeline-accent: #d8b276; }
.dark .timeline-entry--teal { --timeline-accent: #8fbcbb; }

.timeline-date--cyan { --timeline-date-accent: #8fbcbb; }
.timeline-date--blue { --timeline-date-accent: #5e81ac; }
.timeline-date--green { --timeline-date-accent: #8fae79; }
.timeline-date--purple { --timeline-date-accent: #b48ead; }
.timeline-date--frost { --timeline-date-accent: #76a8bd; }
.timeline-date--indigo { --timeline-date-accent: #7886b7; }
.timeline-date--rose { --timeline-date-accent: #bd86a3; }
.timeline-date--amber { --timeline-date-accent: #c99d62; }
.timeline-date--teal { --timeline-date-accent: #6fa8a6; }

.dark .timeline-date--blue { --timeline-date-accent: #81a1c1; }
.dark .timeline-date--frost { --timeline-date-accent: #88c0d0; }
.dark .timeline-date--indigo { --timeline-date-accent: #91a0d0; }
.dark .timeline-date--rose { --timeline-date-accent: #d092b1; }
.dark .timeline-date--amber { --timeline-date-accent: #d8b276; }
.dark .timeline-date--teal { --timeline-date-accent: #8fbcbb; }

/* ---- 日期：等宽年份 + Bodoni 大号月份；进度线经过前保持灰度 ---- */
.timeline-period {
  display: grid;
  grid-column: 1;
  padding-right: 14px;
  color: var(--timeline-date-accent);
  white-space: nowrap;
  justify-items: end;
  transition:
    color var(--dur-panel, 0.62s) var(--ease-ios-fade),
    opacity var(--dur-panel, 0.62s) var(--ease-ios-fade);
}

.timeline-year {
  margin-bottom: 6px;
  font: 500 11px/1 var(--timeline-mono);
  letter-spacing: 0.2em;
  opacity: 0.8;
}

.timeline-month {
  font-family: var(--timeline-serif-latin);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 500;
  font-variant-numeric: lining-nums;
  line-height: 0.86;
  letter-spacing: -0.02em;
}

.timeline-page.is-fill-ready .timeline-entry:not(.is-passed) .timeline-period {
  color: var(--timeline-ink-3);
  opacity: 0.34;
}

/* ---- 节点：未经过是空心圆，经过后实心并泛起一圈波纹；当前节点外套旋转点线环 ---- */
.timeline-rail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-column: 2;
  place-items: start center;
  padding-top: clamp(22px, 3.1vw, 38px);
}

.timeline-dot {
  position: relative;
  width: 11px;
  height: 11px;
  border: 1.5px solid var(--timeline-date-accent);
  border-radius: 50%;
  background: var(--timeline-date-accent);
  box-shadow: 0 0 0 3px var(--vp-c-bg);
  transition:
    background-color var(--dur-menu) var(--ease-ios-fade),
    border-color var(--dur-menu) var(--ease-ios-fade),
    scale var(--dur-menu) var(--ease-ios-spring);
}

.timeline-page.is-fill-ready .timeline-entry:not(.is-passed) .timeline-dot {
  border-color: color-mix(in srgb, var(--timeline-ink-3) 60%, transparent);
  background: var(--vp-c-bg);
  scale: 0.82;
}

.timeline-dot::before,
.timeline-dot::after {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  content: '';
}

.timeline-dot::before {
  inset: -2px;
  border: 1px solid var(--timeline-date-accent);
  opacity: 0;
}

.timeline-entry.is-passed .timeline-dot::before {
  animation: timeline-ping 1s var(--timeline-ease);
}

.timeline-dot::after {
  inset: -8px;
  border: 1px dashed color-mix(in srgb, var(--timeline-date-accent) 70%, transparent);
  opacity: 0;
  scale: 0.5;
  transition:
    opacity var(--dur-menu) var(--ease-ios-fade),
    scale var(--dur-menu) var(--ease-ios-spring);
}

.timeline-entry.is-current .timeline-dot::after {
  opacity: 1;
  scale: 1;
  animation: timeline-spin 14s linear infinite;
}

/* 节点到卡片的点线连接 */
.timeline-rail::after {
  position: absolute;
  top: calc(clamp(22px, 3.1vw, 38px) + 5px);
  right: 0;
  left: calc(50% + 12px);
  height: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--timeline-date-accent) 80%, transparent) 0.7px, transparent 0.9px);
  background-size: 5px 1px;
  transform-origin: left center;
  transition: opacity var(--dur-panel, 0.62s) var(--ease-ios-fade);
  content: '';
}

.timeline-page.is-fill-ready .timeline-entry:not(.is-passed) .timeline-rail::after { opacity: 0.35; }

/* ================================================================
   卡片：左侧半羽化封面 + 右侧文字
   ================================================================ */

.timeline-card {
  grid-column: 3;
  min-width: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 80%, transparent);
  border-radius: var(--timeline-card-radius);
  background: var(--timeline-card-bg);
  box-shadow: var(--aya-elevation-1, none);
  transition:
    border-color var(--dur-menu) var(--ease-ios-fade),
    box-shadow var(--dur-menu) var(--ease-ios-fade),
    translate var(--dur-menu) var(--ease-ios-spring);
  container-type: inline-size;
}

@media (min-width: 761px) {
  .timeline-card.is-coverless {
    width: min(68%, 540px);
    justify-self: start;
  }
}

.timeline-card:hover,
.timeline-card:focus-within,
.timeline-entry.is-open .timeline-card {
  border-color: color-mix(in srgb, var(--timeline-accent) 42%, var(--vp-c-divider));
  box-shadow: var(--aya-elevation-2, none);
  translate: 0 -2px;
}

.timeline-card-trigger {
  display: grid;
  grid-template-columns: 268px minmax(0, 1fr);
  width: 100%;
  height: 150px;
  min-height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  color: inherit;
  text-align: left;
  cursor: pointer;
  background: transparent;
  align-items: center;
}

.timeline-card-trigger:active {
  transform: translateY(1px);
}

.timeline-card-trigger.is-coverless {
  grid-template-columns: minmax(0, 1fr);
  height: 118px;
}

.timeline-card-trigger.is-coverless .timeline-description {
  display: none;
}

.timeline-card-trigger:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--timeline-accent) 82%, var(--vp-c-bg));
  outline-offset: -4px;
}

.timeline-cover {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: transparent;
  align-self: stretch;
}

.timeline-cover-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.72) contrast(0.96);
  transition: filter var(--dur-menu) var(--ease-ios-fade);
}

.timeline-card:hover .timeline-cover-image,
.timeline-entry.is-open .timeline-cover-image {
  filter: saturate(0.92) contrast(1);
}

.timeline-copy {
  display: flex;
  height: 100%;
  min-width: 0;
  padding: 18px clamp(18px, 2.5vw, 26px) 16px;
  overflow: hidden;
  flex-direction: column;
  align-items: stretch;
}

.timeline-stage {
  display: flex;
  margin-bottom: 9px;
  color: var(--timeline-accent);
  font: 500 10.5px/1.2 var(--timeline-mono);
  letter-spacing: 0.12em;
  gap: 12px;
  justify-content: space-between;
}

.timeline-stage > :first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timeline-count {
  flex-shrink: 0;
  color: var(--timeline-ink-3);
  letter-spacing: 0.06em;
}

.timeline-card-title {
  display: -webkit-box;
  flex: 0 0 auto;
  max-height: 2.4em;
  overflow: hidden;
  color: var(--timeline-card-title-color);
  font-family: var(--timeline-serif);
  font-size: clamp(1.24rem, 2vw, 1.52rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.timeline-card-title.is-compact {
  font-size: clamp(1.04rem, 1.7vw, 1.3rem);
}

.timeline-card-title.is-dense {
  font-size: clamp(0.92rem, 1.5vw, 1.12rem);
}

.timeline-description {
  display: -webkit-box;
  flex: 0 0 auto;
  margin-top: 7px;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-family: var(--timeline-serif);
  font-size: 0.84rem;
  line-height: 1.66;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

@container (max-width: 639px) {
  .timeline-description {
    display: none;
  }
}

.timeline-expand-label {
  display: inline-flex;
  margin-top: auto;
  padding-top: 8px;
  color: var(--timeline-accent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  gap: 6px;
  align-items: center;
  align-self: flex-start;
}

.timeline-expand-label svg,
.timeline-note-link svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.timeline-expand-label svg {
  transition:
    rotate var(--dur-menu) var(--ease-ios-spring),
    translate var(--dur-menu) var(--ease-ios-spring);
}

.timeline-card:hover .timeline-expand-label svg { translate: 0 2px; }
.timeline-entry.is-open .timeline-expand-label svg { rotate: 180deg; translate: 0 0; }

/* ---- 展开的笔记列表：点线分隔，逐条对焦 ---- */
.timeline-drawer-grid {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-menu) var(--ease-ios-fade);
}

.timeline-drawer-grid.is-expanded {
  grid-template-rows: 1fr;
}

.timeline-drawer-clip {
  min-height: 0;
  overflow: hidden;
}

.timeline-drawer {
  position: relative;
  padding: 20px clamp(20px, 3vw, 28px) 22px;
  background: var(--timeline-drawer-bg);
  opacity: 0;
  transition: opacity var(--dur-menu-out) var(--ease-ios-fade);
}

.timeline-drawer::before {
  position: absolute;
  top: 0;
  right: clamp(20px, 3vw, 28px);
  left: clamp(20px, 3vw, 28px);
  height: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--timeline-accent) 60%, transparent) 0.8px, transparent 1px);
  background-size: 6px 1px;
  transform-origin: left center;
  content: '';
}

.timeline-drawer-grid.is-expanded .timeline-drawer {
  opacity: 1;
}

.timeline-drawer-grid.is-expanded .timeline-drawer::before {
  animation: timeline-grow-x var(--dur-panel, 0.62s) var(--timeline-ease) backwards;
}

.timeline-drawer > p {
  margin: 0 0 10px;
  color: var(--timeline-ink-3);
  font: 500 10.5px/1.4 var(--timeline-mono);
  letter-spacing: 0.08em;
}

.timeline-drawer nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 28px;
}

.timeline-note-link {
  position: relative;
  display: flex;
  min-width: 0;
  padding: 12px 2px;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  transition: color var(--dur-menu) var(--ease-ios-fade);
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.timeline-note-link::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-3) 45%, transparent) 0.6px, transparent 0.8px);
  background-size: 4px 1px;
  content: '';
}

.timeline-drawer-grid.is-expanded .timeline-note-link {
  animation: timeline-row-focus var(--dur-panel, 0.62s) var(--timeline-focus) calc(var(--n, 0) * 28ms + 60ms) backwards;
}

.timeline-note-link:hover,
.timeline-note-link:focus-visible {
  color: var(--timeline-accent);
}

.timeline-note-link:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--timeline-accent) 62%, transparent);
  outline-offset: 2px;
}

.timeline-note-link span {
  min-width: 0;
}

.timeline-note-link strong,
.timeline-note-link small {
  display: block;
}

.timeline-note-link strong {
  overflow: hidden;
  font-family: var(--timeline-serif);
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timeline-note-link small {
  margin-top: 3px;
  color: var(--timeline-ink-3);
  font: 400 10.5px/1.3 var(--timeline-mono);
  letter-spacing: 0.04em;
}

.timeline-note-link svg {
  flex-shrink: 0;
  transition: translate var(--dur-menu) var(--ease-ios-spring);
}

.timeline-note-link:hover svg,
.timeline-note-link:focus-visible svg {
  translate: 4px 0;
}

/* ================================================================
   入场：抬头逐字对焦；底轨自上而下描出；卡片节点弹出 → 连线描出 → 由虚到实
   ================================================================ */

.timeline-page.is-motion-ready:not(.is-intro) :is(.timeline-kicker, .timeline-intro h1, .timeline-lead, .timeline-stats, .timeline-ruler, .timeline-mark, .timeline-track) {
  opacity: 0;
}

.timeline-page.is-intro .timeline-kicker {
  animation: timeline-focus-in var(--dur-timeline-enter) var(--timeline-focus) backwards;
}

.timeline-page.is-intro .timeline-kicker i {
  animation: timeline-grow-x var(--dur-timeline-enter) var(--timeline-ease) 0.08s backwards;
}

.timeline-page.is-intro .timeline-title-char {
  animation: timeline-char-in calc(var(--dur-timeline-enter) * 1.2) var(--timeline-focus) calc(0.1s + var(--c, 0) * 0.08s) backwards;
}

.timeline-page.is-intro .timeline-ghost {
  animation: timeline-wipe calc(var(--dur-timeline-enter) * 1.6) var(--timeline-ease) 0.24s backwards;
}

.timeline-page.is-intro .timeline-lead {
  animation: timeline-focus-in var(--dur-timeline-enter) var(--timeline-focus) 0.34s backwards;
}

.timeline-page.is-intro .timeline-stats {
  animation: timeline-focus-in var(--dur-timeline-enter) var(--timeline-focus) 0.44s backwards;
}

.timeline-page.is-intro .timeline-ruler {
  animation: timeline-grow-x calc(var(--dur-timeline-enter) * 1.8) var(--timeline-ease) 0.3s backwards;
}

.timeline-page.is-intro .timeline-mark {
  animation: timeline-mark-in var(--dur-timeline-enter) var(--ease-ios-spring) 0.5s backwards;
}

.timeline-page.is-intro .timeline-track {
  animation: timeline-grow-y var(--dur-timeline-rail) var(--timeline-ease) var(--dur-timeline-lead) backwards;
}

.timeline-page.is-motion-ready .timeline-entry.is-motion-pending :is(.timeline-card, .timeline-period, .timeline-rail) {
  opacity: 0;
}

.timeline-page.is-motion-ready .timeline-entry.is-motion-pending .timeline-card-trigger {
  pointer-events: none;
}

.timeline-entry.is-motion-revealing {
  animation: timeline-hold calc(var(--dur-timeline-enter) + 0.36s) linear var(--timeline-entry-delay, 0ms);
}

.timeline-entry.is-motion-revealing .timeline-card {
  will-change: transform, opacity, filter;
  animation: timeline-card-focus var(--dur-timeline-enter) var(--timeline-focus) calc(var(--timeline-entry-delay, 0ms) + 0.08s) backwards;
}

.timeline-entry.is-motion-revealing .timeline-cover-image {
  animation: timeline-cover-wipe calc(var(--dur-timeline-enter) * 1.3) var(--timeline-ease) calc(var(--timeline-entry-delay, 0ms) + 0.14s) backwards;
}

.timeline-entry.is-motion-revealing .timeline-copy > * {
  animation: timeline-focus-in calc(var(--dur-timeline-enter) * 0.8) var(--timeline-focus) calc(var(--timeline-entry-delay, 0ms) + 0.16s + var(--k, 0) * 0.055s) backwards;
}

.timeline-entry.is-motion-revealing .timeline-period {
  animation: timeline-period-in var(--dur-timeline-enter) var(--timeline-focus) var(--timeline-entry-delay, 0ms) backwards;
}

.timeline-entry.is-motion-revealing .timeline-dot {
  animation: timeline-pop calc(var(--dur-timeline-enter) * 0.7) var(--ease-ios-spring) var(--timeline-entry-delay, 0ms) backwards;
}

.timeline-entry.is-motion-revealing .timeline-rail::after {
  animation: timeline-grow-x calc(var(--dur-timeline-enter) * 0.8) var(--timeline-ease) calc(var(--timeline-entry-delay, 0ms) + 0.06s) backwards;
}

/* ---- 离场：可见卡片自下而上失焦淡出 ---- */
.timeline-entry.is-motion-exiting .timeline-card {
  pointer-events: none;
  animation: timeline-defocus var(--dur-timeline-exit) var(--ease-doc-defocus, ease-in) var(--timeline-entry-delay, 0ms) both;
}

.timeline-entry.is-motion-exiting :is(.timeline-period, .timeline-rail) {
  animation: timeline-defocus var(--dur-timeline-exit) var(--ease-doc-defocus, ease-in) var(--timeline-entry-delay, 0ms) both;
}

.timeline-page.is-motion-exiting :is(.timeline-intro, .timeline-track) {
  animation: timeline-defocus var(--dur-timeline-exit) var(--ease-doc-defocus, ease-in) both;
}

@keyframes timeline-hold { to { opacity: 1; } }

@keyframes timeline-focus-in {
  from { opacity: 0; filter: blur(calc(var(--tl-blur) * 0.5)); transform: translateY(8px); }
  45% { opacity: 1; }
}

@keyframes timeline-char-in {
  from { opacity: 0; filter: blur(var(--tl-blur)); transform: translateY(0.18em) scale(1.06); }
  45% { opacity: 1; }
}

@keyframes timeline-card-focus {
  from { opacity: 0; filter: blur(var(--tl-blur)); transform: translateX(26px) scale(0.985); }
  40% { opacity: 1; }
}

@keyframes timeline-cover-wipe {
  from { clip-path: inset(0 100% 0 0); transform: scale(1.1); }
  to { clip-path: inset(0 0 0 0); }
}

@keyframes timeline-period-in {
  from { opacity: 0; filter: blur(var(--tl-blur)); transform: translateY(14px); }
  45% { opacity: 1; }
}

@keyframes timeline-row-focus {
  from { opacity: 0; filter: blur(4px); transform: translateY(6px); }
}

@keyframes timeline-defocus {
  to { opacity: 0; filter: blur(var(--doc-defocus-blur, 5px)); transform: translateY(-8px); }
}

@keyframes timeline-wipe {
  from { clip-path: inset(-20% 100% -20% -10%); opacity: 0.2; }
  to { clip-path: inset(-20% -10% -20% -10%); opacity: 1; }
}

@keyframes timeline-grow-x { from { transform: scaleX(0); } }
@keyframes timeline-grow-y { from { transform: scaleY(0); } }
@keyframes timeline-pop { from { opacity: 0; transform: scale(0); } }
@keyframes timeline-mark-in { from { opacity: 0; transform: rotate(-90deg) scale(0.4); } }
@keyframes timeline-spin { to { rotate: 360deg; } }

@keyframes timeline-ping {
  0% { opacity: 0.9; transform: scale(1); }
  100% { opacity: 0; transform: scale(3.2); }
}

/* ================================================================
   窄屏
   ================================================================ */

@media (max-width: 760px) {
  .timeline-page {
    --tl-col-date: 74px;
    --tl-col-rail: 36px;
    padding: 0 16px 82px;
  }

  .timeline-intro {
    min-height: auto;
    padding: 58px 4px 44px;
    margin-bottom: 56px;
  }

  .timeline-mark { display: none; }

  .timeline-intro h1 {
    font-size: clamp(4.4rem, 15vw, 7rem);
  }

  .timeline-lead,
  .timeline-intro .timeline-lead.hero-hitokoto {
    font-size: 0.98rem;
  }

  .timeline-stat { font-size: 1.7rem; }

  .timeline-entry {
    padding-bottom: 40px;
  }

  .timeline-period {
    padding-right: 8px;
  }

  .timeline-month {
    font-size: clamp(2.5rem, 8vw, 3.8rem);
  }

  .timeline-year {
    font-size: 10px;
    letter-spacing: 0.12em;
  }

  .timeline-rail::after { left: calc(50% + 10px); }

  .timeline-card {
    width: 100%;
  }

  .timeline-card-trigger {
    grid-template-columns: max(142.222px, 46%) minmax(0, 1fr);
    height: max(96px, 25.875cqw);
  }

  .timeline-card-trigger.is-coverless {
    height: auto;
    min-height: 84px;
  }

  .timeline-copy {
    padding: 10px 12px;
  }

  .timeline-stage {
    margin-bottom: 4px;
    font-size: 9.5px;
    letter-spacing: 0.08em;
  }

  .timeline-count { display: none; }

  .timeline-card-title {
    font-size: 1.05rem;
    line-height: 1.12;
  }

  .timeline-card-title.is-compact {
    font-size: 0.9rem;
  }

  .timeline-card-title.is-dense {
    font-size: 0.78rem;
  }

  .timeline-description {
    display: none;
  }

  .timeline-expand-label {
    padding-top: 4px;
    font-size: 0.7rem;
  }

  .timeline-drawer {
    padding: 14px 15px 16px;
  }

  .timeline-drawer nav {
    grid-template-columns: 1fr;
  }
}

/* 最窄：日期移到卡片上方，轨道贴左 */
@media (max-width: 440px) {
  .timeline-page {
    --tl-col-date: 0px;
    --tl-col-rail: 33px;
  }

  .timeline-intro {
    padding-top: 46px;
  }

  .timeline-intro h1 {
    font-size: clamp(4rem, 17vw, 4.8rem);
  }

  .timeline-stats { gap: 24px; }

  .timeline-entry {
    grid-template-columns: var(--tl-col-rail) minmax(0, 1fr);
    grid-template-rows: auto auto;
  }

  .timeline-period {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    margin: 0 0 12px 2px;
    padding: 0;
    gap: 8px;
    align-items: baseline;
    justify-content: start;
  }

  .timeline-year { margin: 0; order: 2; }

  .timeline-month { font-size: clamp(2.3rem, 11vw, 2.7rem); }

  .timeline-rail {
    grid-column: 1;
    grid-row: 1 / 3;
    padding-top: 18px;
  }

  .timeline-rail::after { display: none; }

  .timeline-card {
    grid-column: 2;
    grid-row: 2;
  }
}

@media (max-width: 360px) {
  .timeline-page { --tl-col-rail: 26px; }

  .timeline-card-trigger:not(.is-coverless) {
    grid-template-columns: 42% minmax(0, 1fr);
    height: 96px;
  }

  .timeline-copy {
    padding-right: 10px;
    padding-left: 10px;
  }

  .timeline-card-title {
    font-size: 0.95rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html.timeline-page-active {
    scroll-behavior: auto;
  }
}
</style>
