<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import timelineEntries from '../generated/timeline-entries.json'
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

const entries = timelineEntries as TimelineEntry[]

const openId = ref<string | null>(null)

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

onMounted(() => {
  document.documentElement.classList.add('timeline-page-active')
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('timeline-page-active')
})
</script>

<template>
  <main class="timeline-page" aria-labelledby="timeline-title">
    <header class="timeline-intro">
      <p class="timeline-kicker">AYASKT WORKSPACE · STUDY ARCHIVE</p>
      <h1 id="timeline-title">时间线</h1>
      <HeroHitokoto class="timeline-lead" />
    </header>

    <section class="timeline" aria-label="学习笔记时间线">
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
              <time
                v-if="index === 0 || entries[index - 1].period !== entry.period"
                class="timeline-mobile-period"
                :datetime="entry.period.replace('.', '-')"
              >
                <span class="timeline-year">{{ entry.period.split('.')[0] }}</span>
                <strong class="timeline-month">{{ entry.period.split('.')[1] }}</strong>
              </time>
              <span class="timeline-stage">{{ entry.course }}</span>
              <strong class="timeline-card-title" :class="titleDensity(entry.title)">
                {{ entry.title }}
              </strong>
              <span class="timeline-description">{{ entry.description }}</span>
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
  background:
    radial-gradient(circle at 18% 4%, rgb(var(--aya-c-brand-blue-rgb) / 13%), transparent 34rem),
    radial-gradient(circle at 78% 28%, rgb(var(--aya-c-brand-lilac-rgb) / 9%), transparent 38rem),
    var(--vp-c-bg);
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
  min-height: calc(100vh - var(--vp-nav-height));
  padding: clamp(56px, 8vw, 92px) clamp(18px, 5vw, 72px) 104px;
  color: var(--vp-c-text-1);
  background: transparent;
}

.timeline-intro,
.timeline {
  width: min(820px, 100%);
  margin-right: auto;
  margin-left: auto;
}

.timeline-intro {
  margin-bottom: clamp(48px, 7vw, 72px);
}

.timeline-kicker {
  margin: 0 0 14px;
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  font-weight: 720;
  letter-spacing: 0.16em;
}

.timeline-intro h1 {
  margin: 0;
  font-size: clamp(2.75rem, 7vw, 5.75rem);
  font-weight: 760;
  line-height: 0.96;
  letter-spacing: -0.055em;
}

.timeline-lead {
  max-width: 620px;
  margin: 26px 0 0;
  color: var(--vp-c-text-2);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.8;
  text-align: left;
}

.timeline-intro .timeline-lead.hero-hitokoto {
  width: min(620px, 100%);
  margin: 26px 0 0;
  color: var(--vp-c-text-2);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  text-align: left;
}

.timeline {
  position: relative;
}

.timeline::before {
  position: absolute;
  top: 14px;
  bottom: 24px;
  left: 139px;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    color-mix(in srgb, var(--vp-c-brand-1) 54%, var(--vp-c-divider)) 0 7px,
    transparent 7px 14px
  );
  content: '';
}

.timeline-entry {
  --timeline-accent: var(--vp-c-brand-1);
  --timeline-date-accent: var(--timeline-accent);
  display: grid;
  grid-template-columns: 118px 42px minmax(0, 1fr);
  align-items: start;
  padding-bottom: clamp(44px, 6vw, 62px);
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
  font-size: clamp(2.4rem, 6vw, 4.9rem);
  font-weight: 760;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.045em;
  line-height: 0.86;
  align-items: baseline;
  justify-content: flex-end;
  justify-items: end;
  white-space: nowrap;
}

.timeline-year {
  grid-column: 1 / -1;
  font-size: 0.46em;
  font-weight: 720;
  line-height: 1;
  opacity: 0.72;
}

.timeline-month {
  grid-column: 1;
  color: var(--timeline-date-accent);
  font-size: 1em;
  font-weight: 840;
  line-height: 0.88;
  letter-spacing: -0.04em;
}

.timeline-rail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-column: 2;
  place-items: start center;
  padding-top: clamp(19px, 3.2vw, 42px);
}

.timeline-dot {
  width: 13px;
  height: 13px;
  border: 3px solid var(--vp-c-bg);
  border-radius: 999px;
  background: var(--timeline-date-accent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--timeline-date-accent) 76%, var(--vp-c-divider)),
    0 0 0 7px color-mix(in srgb, var(--timeline-date-accent) 11%, transparent);
  transition:
    scale var(--dur-menu) var(--ease-ios-spring),
    box-shadow var(--dur-menu) var(--ease-ios-fade);
}

.timeline-entry.is-open .timeline-dot {
  scale: 1.08;
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--timeline-date-accent) 82%, var(--vp-c-divider)),
    0 0 0 7px color-mix(in srgb, var(--timeline-date-accent) 13%, transparent);
}

.timeline-card {
  grid-column: 3;
  min-width: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 74%, transparent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 90%, transparent);
  box-shadow:
    0 1px 0 rgb(255 255 255 / 26%) inset,
    0 11px 30px rgb(46 52 64 / 7%);
  transition:
    border-color var(--dur-menu) var(--ease-ios-fade),
    box-shadow var(--dur-menu) var(--ease-ios-fade),
    translate var(--dur-menu) var(--ease-ios-spring);
  container-type: inline-size;
}

.dark .timeline-card {
  background: color-mix(in srgb, var(--vp-c-bg-elv) 92%, transparent);
  box-shadow:
    0 1px 0 rgb(255 255 255 / 5%) inset,
    0 12px 34px rgb(0 0 0 / 20%);
}

@media (min-width: 761px) {
  .timeline-card.is-coverless {
    width: min(76%, 500px);
    justify-self: start;
  }
}

.timeline-card:hover,
.timeline-card:focus-within,
.timeline-entry.is-open .timeline-card {
  border-color: color-mix(in srgb, var(--timeline-accent) 42%, var(--vp-c-divider));
  box-shadow:
    0 1px 0 rgb(255 255 255 / 26%) inset,
    0 14px 36px color-mix(in srgb, var(--timeline-accent) 11%, transparent);
}

.timeline-card-trigger {
  display: grid;
  grid-template-columns: 42% minmax(0, 1fr);
  width: 100%;
  height: 23.625cqw;
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
  transform: scale(0.995);
}

.timeline-card-trigger.is-coverless {
  grid-template-columns: minmax(0, 1fr);
  height: 124px;
}

.timeline-card-trigger.is-coverless .timeline-description {
  display: none;
}

.timeline-card-trigger:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--timeline-accent) 78%, white);
  outline-offset: -3px;
}

.timeline-cover {
  position: relative;
  z-index: 1;
  aspect-ratio: 16 / 9;
  min-height: 0;
  overflow: visible;
  background: transparent;
  align-self: start;
}

.timeline-cover-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timeline-cover-image {
  filter: saturate(0.74) contrast(0.96);
  scale: 1.01;
  transition:
    scale var(--dur-menu) var(--ease-ios-fade),
    filter var(--dur-menu) var(--ease-ios-fade);
}

.timeline-card:hover .timeline-cover-image,
.timeline-entry.is-open .timeline-cover-image {
  filter: saturate(0.92) contrast(1);
  scale: 1.025;
}

.timeline-copy {
  display: flex;
  height: 100%;
  min-width: 0;
  padding: clamp(14px, 2.2vw, 18px);
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-mobile-period {
  display: none;
  grid-template-columns: auto;
  color: var(--timeline-date-accent);
  font-size: clamp(2.4rem, 6vw, 4.9rem);
  font-variant-numeric: tabular-nums;
  line-height: 0.86;
  align-items: baseline;
  justify-content: flex-start;
  justify-items: start;
  white-space: nowrap;
}

.timeline-stage {
  margin-bottom: 4px;
  color: var(--timeline-accent);
  font-size: 0.7rem;
  font-weight: 760;
  letter-spacing: 0.09em;
}

.timeline-card-title {
  display: -webkit-box;
  flex: 0 0 38px;
  height: 38px;
  overflow: hidden;
  font-size: clamp(1.2rem, 2.1vw, 1.62rem);
  font-weight: 730;
  line-height: 1.16;
  letter-spacing: -0.035em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.timeline-card-title.is-compact {
  font-size: clamp(1.05rem, 1.8vw, 1.36rem);
}

.timeline-card-title.is-dense {
  font-size: clamp(0.95rem, 1.55vw, 1.16rem);
  line-height: 1.2;
}

.timeline-description {
  display: -webkit-box;
  flex: 0 0 23px;
  margin-top: 4px;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  line-height: 1.66;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.timeline-expand-label {
  display: inline-flex;
  margin-top: auto;
  padding-top: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.74rem;
  font-weight: 650;
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
  padding: 18px clamp(18px, 3vw, 26px) 21px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 58%, transparent);
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
  margin: 0 0 11px;
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
  font-weight: 680;
  letter-spacing: 0.08em;
}

.timeline-drawer nav {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
}

.timeline-note-link {
  display: flex;
  min-width: 0;
  padding: 11px 13px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
  border-radius: 10px;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg) 72%, transparent);
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
  border-color: color-mix(in srgb, var(--timeline-accent) 52%, var(--vp-c-divider));
  color: var(--timeline-accent);
  background: color-mix(in srgb, var(--timeline-accent) 8%, var(--vp-c-bg));
  translate: 2px 0;
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
  font-size: 0.82rem;
  font-weight: 680;
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
    padding: 44px 16px 82px;
  }

  .timeline-intro,
  .timeline {
    width: 100%;
    margin-left: 0;
  }

  .timeline-intro {
    padding-left: 6px;
    margin-bottom: 50px;
  }

  .timeline-lead {
    font-size: 0.96rem;
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
    font-size: clamp(2.4rem, 6vw, 4.9rem);
    letter-spacing: -0.045em;
  }

  .timeline-rail {
    grid-column: 2;
  }

  .timeline-card {
    grid-column: 3;
    width: 100%;
    border-radius: 14px;
  }

  .timeline-card-trigger {
    grid-template-columns: 46% minmax(0, 1fr);
    height: 25.875cqw;
  }

  .timeline-cover {
    min-height: 0;
  }

  .timeline-copy {
    padding: 9px 12px;
  }

  .timeline-mobile-period {
    display: none;
    margin-bottom: 7px;
    color: var(--timeline-date-accent);
    font-size: 1.2rem;
    font-weight: 720;
    letter-spacing: 0.09em;
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
  .timeline::before {
    left: 16px;
  }

  .timeline-entry {
    grid-template-columns: 33px minmax(0, 1fr);
  }

  .timeline-period {
    display: none;
  }

  .timeline-rail {
    grid-column: 1;
  }

  .timeline-card {
    grid-column: 2;
  }

  .timeline-mobile-period {
    display: grid;
    font-size: clamp(2.4rem, 6vw, 4.9rem);
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
}
</style>
