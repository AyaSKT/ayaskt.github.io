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
const TIMELINE_STAGGER_FALLBACK = 55

const { frontmatter } = useData()
const pageTitle = computed(() => frontmatter.value.title || '时间线')
const pageKicker = computed(() => frontmatter.value.timeline?.kicker || '')
const timelineAriaLabel = computed(() => frontmatter.value.timeline?.ariaLabel || pageTitle.value)
const openId = ref<string | null>(null)

let timelineRoot: HTMLElement | null = null
let timelineElements: HTMLElement[] = []
let timelineObserver: IntersectionObserver | undefined
let enterFrame = 0
let exitTimer = 0
let enterStarted = false
let exitPromise: Promise<void> | undefined

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

function finishEntryReveal(entry: HTMLElement) {
  if (entry.classList.contains('is-motion-exiting')) return

  entry.classList.remove('is-motion-revealing', 'is-initial-reveal', 'is-scroll-reveal')
  entry.classList.add('is-motion-revealed')
  entry.style.removeProperty('--timeline-entry-delay')
}

function revealEntry(entry: HTMLElement, delayIndex: number, kind: TimelineRevealKind) {
  if (!entry.classList.contains('is-motion-pending')) return

  const delay = readMotionDuration('--dur-timeline-stagger', TIMELINE_STAGGER_FALLBACK)
  const card = entry.querySelector<HTMLElement>('.timeline-card')
  const animationName = kind === 'initial' ? 'timelineCardExpand' : 'timelineCardSlideIn'

  timelineObserver?.unobserve(entry)
  entry.style.setProperty('--timeline-entry-delay', `${delayIndex * delay}ms`)
  entry.classList.remove('is-motion-pending')
  entry.classList.add('is-motion-revealing', kind === 'initial' ? 'is-initial-reveal' : 'is-scroll-reveal')

  if (!card) {
    finishEntryReveal(entry)
    return
  }

  card.addEventListener('animationend', (event) => {
    if (event.animationName === animationName) finishEntryReveal(entry)
  }, { once: true })
}

function startTimelineEnter() {
  if (enterStarted || !timelineRoot) return
  enterStarted = true
  window.removeEventListener('vt-transition-done', startTimelineEnter)

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
    timelineRoot?.classList.add('is-motion-exiting')

    const visibleEntries = timelineElements
      .filter((entry) => !entry.classList.contains('is-motion-pending') && entryIsInViewport(entry))
      .sort((left, right) => right.getBoundingClientRect().top - left.getBoundingClientRect().top)

    if (!visibleEntries.length) {
      resolve()
      return
    }

    const stagger = readMotionDuration('--dur-timeline-stagger', TIMELINE_STAGGER_FALLBACK)
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
    }, duration + (visibleEntries.length - 1) * stagger)
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
  timelineElements = timelineRoot
    ? Array.from(timelineRoot.querySelectorAll<HTMLElement>('.timeline-entry'))
    : []

  window.addEventListener('timeline-page-exit-request', onTimelineExitRequest)

  if (!timelineRoot || !motionEnabled()) {
    timelineElements.forEach((entry) => entry.classList.add('is-motion-revealed'))
    return
  }

  timelineRoot.classList.add('is-motion-ready')
  timelineElements.forEach((entry) => entry.classList.add('is-motion-pending'))
  observeTimelineEntries()

  if (isRouteTransitionActive()) {
    window.addEventListener('vt-transition-done', startTimelineEnter, { once: true })
    return
  }

  enterFrame = window.requestAnimationFrame(() => {
    enterFrame = window.requestAnimationFrame(startTimelineEnter)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('timeline-page-exit-request', onTimelineExitRequest)
  window.removeEventListener('vt-transition-done', startTimelineEnter)
  timelineObserver?.disconnect()
  timelineObserver = undefined
  if (enterFrame) window.cancelAnimationFrame(enterFrame)
  if (exitTimer) window.clearTimeout(exitTimer)
  timelineRoot = null
  timelineElements = []
  document.documentElement.classList.remove('timeline-page-active')
})
</script>

<template>
  <main class="timeline-page" aria-labelledby="timeline-title">
    <header class="timeline-intro">
      <div class="timeline-intro-copy">
        <p v-if="pageKicker" class="timeline-kicker">{{ pageKicker }}</p>
        <h1 id="timeline-title">{{ pageTitle }}</h1>
        <HeroHitokoto class="timeline-lead" scope="timeline" />
      </div>
    </header>

    <section class="timeline" :aria-label="timelineAriaLabel">
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
              <span class="timeline-stage">{{ entry.course }}</span>
              <strong class="timeline-card-title" :class="titleDensity(entry.title)">
                {{ entry.title }}
              </strong>
              <span v-if="entry.description" class="timeline-description">{{ entry.description }}</span>
              <span class="timeline-expand-label">
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
                    v-for="note in entry.notes"
                    :key="note.href"
                    class="timeline-note-link"
                    :href="note.href"
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

.timeline-page {
  --timeline-accent: var(--vp-c-brand-1);
  --timeline-editorial-accent: color-mix(in srgb, #8fbcbb 68%, #2e3440);
  --timeline-card-radius: 18px;
  --timeline-drawer-radius: 12px;
  --timeline-serif: 'Noto Serif CJK SC', 'Noto Serif SC', 'Songti SC', 'STSong', serif;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 0 clamp(18px, 5vw, 72px) 112px;
  color: var(--vp-c-text-1);
  background: transparent;
  overflow-x: clip;
}

.dark .timeline-page {
  --timeline-editorial-accent: #8fbcbb;
}

.timeline-intro,
.timeline {
  width: min(1060px, 100%);
  margin-right: auto;
  margin-left: auto;
}

.timeline-intro {
  display: flex;
  min-height: clamp(360px, 56svh, 560px);
  padding: clamp(42px, 5.5vw, 64px) 0 clamp(36px, 4.5vw, 52px);
  border-bottom: 1px solid color-mix(in srgb, var(--timeline-editorial-accent) 24%, var(--vp-c-divider));
  margin-bottom: clamp(70px, 9vw, 112px);
  align-items: center;
}

.timeline-intro-copy {
  display: flex;
  width: 100%;
  min-height: 0;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-kicker {
  margin: 0 0 clamp(24px, 3vw, 36px);
  color: var(--timeline-editorial-accent);
  font-size: 0.72rem;
  font-weight: 740;
  letter-spacing: 0.19em;
}

.timeline-intro h1 {
  margin: 0;
  color: var(--timeline-editorial-accent);
  font-family: var(--timeline-serif);
  font-size: clamp(5.25rem, 10.4vw, 8.75rem);
  font-weight: 600;
  line-height: 0.88;
  letter-spacing: -0.075em;
}

.timeline-lead {
  max-width: 34rem;
  margin: clamp(32px, 4vw, 48px) 0 0;
  color: var(--vp-c-text-2);
  font-family: var(--timeline-serif);
  font-size: clamp(1.05rem, 1.7vw, 1.3rem);
  line-height: 1.85;
  text-align: left;
}

.timeline-intro .timeline-lead.hero-hitokoto {
  width: min(34rem, 100%);
  margin: clamp(32px, 4vw, 48px) 0 0;
  color: var(--vp-c-text-2);
  font-size: clamp(1.05rem, 1.7vw, 1.3rem);
  text-align: left;
}

.timeline {
  position: relative;
}

.timeline::before {
  position: absolute;
  top: 14px;
  bottom: 24px;
  left: 164px;
  width: 1px;
  background: color-mix(in srgb, var(--timeline-editorial-accent) 30%, var(--vp-c-divider));
  content: '';
}

.timeline-entry {
  --timeline-accent: var(--vp-c-brand-1);
  --timeline-date-accent: var(--timeline-accent);
  display: grid;
  grid-template-columns: 138px 52px minmax(0, 1fr);
  align-items: start;
  padding-bottom: clamp(54px, 7vw, 76px);
}

.timeline-page.is-motion-ready .timeline-entry.is-motion-pending .timeline-card,
.timeline-page.is-motion-ready .timeline-entry.is-motion-pending .timeline-period,
.timeline-page.is-motion-ready .timeline-entry.is-motion-pending .timeline-rail {
  opacity: 0;
}

.timeline-page.is-motion-ready .timeline-entry.is-motion-pending .timeline-card-trigger {
  pointer-events: none;
}

.timeline-entry.is-motion-revealing .timeline-card,
.timeline-entry.is-motion-exiting .timeline-card {
  will-change: transform, opacity, clip-path;
}

.timeline-entry.is-motion-revealing .timeline-period,
.timeline-entry.is-motion-revealing .timeline-rail,
.timeline-entry.is-motion-exiting .timeline-period,
.timeline-entry.is-motion-exiting .timeline-rail {
  will-change: transform, opacity;
}

.timeline-entry.is-motion-revealing.is-initial-reveal .timeline-card {
  animation: timelineCardExpand var(--dur-timeline-enter) var(--ease-ios-fade) var(--timeline-entry-delay, 0ms) both;
}

.timeline-entry.is-motion-revealing.is-scroll-reveal .timeline-card {
  animation: timelineCardSlideIn var(--dur-timeline-enter) var(--ease-ios-fade) var(--timeline-entry-delay, 0ms) both;
}

.timeline-entry.is-motion-revealing .timeline-period,
.timeline-entry.is-motion-revealing .timeline-rail {
  animation: timelineMarkerReveal var(--dur-timeline-enter) var(--ease-ios-fade) var(--timeline-entry-delay, 0ms) both;
}

.timeline-entry.is-motion-exiting .timeline-card {
  pointer-events: none;
  animation: timelineCardCollapse var(--dur-timeline-exit) var(--ease-ios-press) var(--timeline-entry-delay, 0ms) both;
}

.timeline-entry.is-motion-exiting .timeline-period,
.timeline-entry.is-motion-exiting .timeline-rail {
  animation: timelineMarkerCollapse var(--dur-timeline-exit) var(--ease-ios-press) var(--timeline-entry-delay, 0ms) both;
}

@keyframes timelineCardExpand {
  from {
    opacity: 0;
    clip-path: inset(0 0 100% 0 round var(--timeline-card-radius));
    transform: translate3d(28px, 0, 0);
  }
  to {
    opacity: 1;
    clip-path: inset(0 round var(--timeline-card-radius));
    transform: translate3d(0, 0, 0);
  }
}

@keyframes timelineCardSlideIn {
  from {
    opacity: 0;
    transform: translate3d(38px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes timelineCardCollapse {
  from {
    opacity: 1;
    clip-path: inset(0 round var(--timeline-card-radius));
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    clip-path: inset(0 0 100% 0 round var(--timeline-card-radius));
    transform: translate3d(22px, 0, 0);
  }
}

@keyframes timelineMarkerReveal {
  from {
    opacity: 0;
    transform: translate3d(12px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes timelineMarkerCollapse {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -8px, 0);
  }
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

.timeline-period {
  display: grid;
  grid-template-columns: auto;
  grid-column: 1;
  padding-top: 0;
  color: var(--timeline-date-accent);
  font-family: var(--timeline-serif);
  font-size: clamp(2.8rem, 6vw, 5.2rem);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.055em;
  line-height: 0.84;
  align-items: baseline;
  justify-content: flex-end;
  justify-items: end;
  white-space: nowrap;
}

.timeline-year {
  grid-column: 1 / -1;
  font-size: 0.46em;
  font-weight: 600;
  line-height: 1;
  opacity: 0.72;
}

.timeline-month {
  grid-column: 1;
  color: var(--timeline-date-accent);
  font-size: 1em;
  font-weight: 650;
  line-height: 0.88;
  letter-spacing: -0.04em;
}

.timeline-rail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-column: 2;
  place-items: start center;
  padding-top: clamp(20px, 3.1vw, 38px);
}

.timeline-dot {
  width: 11px;
  height: 11px;
  border: 2px solid var(--vp-c-bg);
  border-radius: 2px;
  background: var(--timeline-date-accent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--timeline-date-accent) 76%, var(--vp-c-divider));
  transition:
    scale var(--dur-menu) var(--ease-ios-spring),
    box-shadow var(--dur-menu) var(--ease-ios-fade);
}

.timeline-entry.is-open .timeline-dot {
  scale: 1.12;
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--timeline-date-accent) 86%, var(--vp-c-divider));
}

.timeline-card {
  grid-column: 3;
  min-width: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--timeline-editorial-accent) 18%, var(--vp-c-divider));
  border-radius: var(--timeline-card-radius);
  background: color-mix(in srgb, var(--vp-c-bg-elv) 72%, transparent);
  box-shadow: none;
  transition:
    border-color var(--dur-menu) var(--ease-ios-fade),
    box-shadow var(--dur-menu) var(--ease-ios-fade),
    translate var(--dur-menu) var(--ease-ios-spring);
  container-type: inline-size;
}

.dark .timeline-card {
  background: color-mix(in srgb, var(--vp-c-bg-elv) 74%, transparent);
  box-shadow: none;
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
  border-color: color-mix(in srgb, var(--timeline-accent) 58%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--timeline-accent) 5%, var(--vp-c-bg-elv));
  box-shadow: none;
  translate: 3px 0;
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
  overflow: visible;
  background: transparent;
  align-self: stretch;
}

.timeline-cover-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timeline-cover-image {
  filter: saturate(0.68) contrast(0.95);
  scale: 1.01;
  transition:
    scale var(--dur-menu) var(--ease-ios-fade),
    filter var(--dur-menu) var(--ease-ios-fade);
}

.timeline-card:hover .timeline-cover-image,
.timeline-entry.is-open .timeline-cover-image {
  filter: saturate(0.88) contrast(1);
  scale: 1.018;
}

.timeline-copy {
  display: flex;
  height: 100%;
  min-width: 0;
  padding: 18px clamp(18px, 2.5vw, 26px);
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-stage {
  margin-bottom: 7px;
  color: var(--timeline-accent);
  font-size: 0.67rem;
  font-weight: 740;
  letter-spacing: 0.13em;
}

.timeline-card-title {
  display: -webkit-box;
  flex: 0 0 38px;
  height: 38px;
  overflow: hidden;
  font-family: var(--timeline-serif);
  font-size: clamp(1.24rem, 2vw, 1.56rem);
  font-weight: 650;
  line-height: 1.16;
  letter-spacing: -0.025em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.timeline-card-title.is-compact {
  font-size: clamp(1.04rem, 1.7vw, 1.3rem);
}

.timeline-card-title.is-dense {
  font-size: clamp(0.92rem, 1.5vw, 1.12rem);
  line-height: 1.2;
}

.timeline-description {
  display: -webkit-box;
  flex: 0 0 23px;
  margin-top: 6px;
  overflow: hidden;
  color: var(--vp-c-text-2);
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
  padding-top: 4px;
  color: var(--vp-c-text-2);
  color: var(--timeline-accent);
  font-size: 0.7rem;
  font-weight: 680;
  letter-spacing: 0.04em;
  gap: 7px;
  align-items: center;
}

.timeline-expand-label svg,
.timeline-note-link svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.timeline-expand-label svg {
  transition: rotate var(--dur-menu-out) var(--ease-ios-press);
}

.timeline-entry.is-open .timeline-expand-label svg {
  rotate: 180deg;
}

.timeline-drawer-grid {
  display: grid;
  grid-template-rows: 0fr;
  border-top: 1px solid transparent;
  transition:
    grid-template-rows var(--dur-menu-out) var(--ease-ios-fade),
    border-color var(--dur-menu-out) var(--ease-ios-fade);
}

.timeline-drawer-grid.is-expanded {
  grid-template-rows: 1fr;
  border-top-color: color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
}

.timeline-drawer-clip {
  min-height: 0;
  overflow: hidden;
}

.timeline-drawer {
  padding: 22px clamp(20px, 3vw, 28px) 26px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 42%, transparent);
  opacity: 0;
  translate: 0 -6px;
  transition:
    opacity var(--dur-menu-out) var(--ease-ios-fade),
    translate var(--dur-menu-out) var(--ease-ios-fade);
}

.timeline-drawer-grid.is-expanded .timeline-drawer {
  opacity: 1;
  translate: 0 0;
  transition-delay: 0s;
}

.timeline-drawer > p {
  margin: 0 0 14px;
  color: var(--vp-c-text-3);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.timeline-drawer nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: 1px solid color-mix(in srgb, var(--timeline-editorial-accent) 16%, var(--vp-c-divider));
  border-radius: var(--timeline-drawer-radius);
  background: color-mix(in srgb, var(--timeline-editorial-accent) 16%, var(--vp-c-divider));
  gap: 1px;
  overflow: hidden;
}

.timeline-note-link {
  display: flex;
  min-width: 0;
  padding: 13px 14px;
  border: 0;
  border-radius: 0;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  text-decoration: none !important;
  transition:
    color var(--dur-menu) var(--ease-ios-fade),
    border-color var(--dur-menu) var(--ease-ios-fade),
    background-color var(--dur-menu) var(--ease-ios-fade),
    translate var(--dur-menu-out) var(--ease-ios-press),
    transform var(--dur-tap) var(--ease-ios-press);
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.timeline-note-link:hover,
.timeline-note-link:focus-visible {
  color: var(--timeline-accent);
  background: color-mix(in srgb, var(--timeline-accent) 7%, var(--vp-c-bg));
  translate: 1px 0;
}

.timeline-note-link:active {
  transform: scale(0.992);
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
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timeline-note-link small {
  margin-top: 3px;
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
}

@media (max-width: 760px) {
  .timeline-page {
    padding: 0 16px 82px;
  }

  .timeline-intro,
  .timeline {
    width: 100%;
    margin-left: 0;
  }

  .timeline-intro {
    min-height: auto;
    padding: 58px 6px 48px;
    margin-bottom: 64px;
  }

  .timeline-intro h1 {
    font-size: clamp(4.6rem, 15vw, 7.2rem);
  }

  .timeline-lead,
  .timeline-intro .timeline-lead.hero-hitokoto {
    font-size: 0.98rem;
  }

  .timeline::before {
    left: 92px;
  }

  .timeline-entry {
    grid-template-columns: 74px 36px minmax(0, 1fr);
    padding-bottom: 40px;
  }

  .timeline-period {
    padding-top: 1px;
    font-size: clamp(2.6rem, 8vw, 4.15rem);
    letter-spacing: -0.05em;
  }

  .timeline-rail {
    grid-column: 2;
  }

  .timeline-card {
    grid-column: 3;
    width: 100%;
    border-radius: var(--timeline-card-radius);
  }

  .timeline-card-trigger {
    grid-template-columns: max(142.222px, 46%) minmax(0, 1fr);
    height: max(96px, 25.875cqw);
  }

  .timeline-cover {
    min-height: 0;
  }

  .timeline-copy {
    padding: 9px 12px;
  }

  .timeline-stage {
    max-width: 100%;
    margin-bottom: 3px;
    overflow: hidden;
    font-size: 0.62rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .timeline-card-title {
    flex-basis: 31px;
    height: 31px;
    font-size: 1.05rem;
    line-height: 1.08;
  }

  .timeline-card-title.is-compact {
    font-size: 0.9rem;
  }

  .timeline-card-title.is-dense {
    font-size: 0.78rem;
    line-height: 1.12;
  }

  .timeline-description {
    display: none;
  }

  .timeline-expand-label {
    padding-top: 3px;
    font-size: 0.7rem;
  }

  .timeline-drawer {
    padding: 16px 15px 18px;
  }

  .timeline-drawer nav {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 440px) {
  .timeline-intro {
    padding-top: 46px;
    margin-bottom: 56px;
  }

  .timeline-intro h1 {
    font-size: clamp(4.2rem, 17vw, 5rem);
  }

  .timeline::before {
    left: 16px;
  }

  .timeline-entry {
    grid-template-columns: 33px minmax(0, 1fr);
    grid-template-rows: auto auto;
  }

  .timeline-period {
    display: grid;
    grid-column: 2;
    grid-row: 1;
    justify-content: start;
    justify-items: start;
    margin: 0 0 12px 2px;
    font-size: clamp(2.4rem, 11vw, 2.8rem);
  }

  .timeline-rail {
    grid-column: 1;
    grid-row: 1 / 3;
    padding-top: 18px;
  }

  .timeline-card {
    grid-column: 2;
    grid-row: 2;
  }
}

@media (max-width: 360px) {
  .timeline::before {
    left: 12px;
  }

  .timeline-entry {
    grid-template-columns: 26px minmax(0, 1fr);
  }

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

  .timeline-entry,
  .timeline-dot,
  .timeline-card,
  .timeline-cover img,
  .timeline-expand-label svg,
  .timeline-drawer-grid,
  .timeline-drawer,
  .timeline-note-link {
    transition-duration: 0.01ms !important;
  }

  .timeline-page .timeline-entry .timeline-card,
  .timeline-page .timeline-entry .timeline-period,
  .timeline-page .timeline-entry .timeline-rail {
    animation: none !important;
    opacity: 1 !important;
    clip-path: none !important;
    transform: none !important;
  }
}
</style>
