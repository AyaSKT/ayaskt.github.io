<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import HomeSectionHead from './HomeSectionHead.vue'
import timelineEntries from '../generated/timeline-entries.json'

interface TimelineNote {
  title: string
  href: string
  updatedAt: string
}

interface TimelineEntry {
  id: string
  period: string
  course: string
  title: string
  description?: string
  image: string
  hasCover: boolean
  imageAlt: string
  imagePosition?: string
  updatedAt: string
  notes: TimelineNote[]
}

const entries = timelineEntries as TimelineEntry[]
const noteCount = entries.reduce((sum, e) => sum + e.notes.length, 0)

function splitCourse(course: string) {
  const match = course.match(/^(.*?)\s+([A-Za-z][\w&]*)$/)
  return {
    name: match ? match[1] : course,
    code: match ? match[2].replace(/_N$/, '') : '',
  }
}

function shortDate(iso: string) {
  return iso.slice(5, 10).replace('-', '.')
}

function byRecent(notes: TimelineNote[]) {
  return [...notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

const cards = computed(() => entries.slice(0, 4).map((entry) => {
  const notes = byRecent(entry.notes)
  return {
    ...entry,
    ...splitCourse(entry.course),
    notes,
    href: notes[0] ? withBase(notes[0].href) : withBase('/timeline'),
    image: withBase(entry.image),
  }
}))

const lead = computed(() => cards.value[0])
const rest = computed(() => cards.value.slice(1))

const timelineHref = withBase('/timeline')
</script>

<template>
  <section class="home-recent" aria-labelledby="home-recent-title">
    <HomeSectionHead
      heading-id="home-recent-title"
      num="01"
      label="RECENT"
      title="近期更新"
      :more-text="`全部 ${noteCount} 篇`"
      :more-href="timelineHref"
    />

    <div v-if="lead" class="home-recent-grid">
      <article class="recent-lead">
        <a class="recent-lead-cover" :href="lead.href" tabindex="-1" aria-hidden="true">
          <img
            v-if="lead.hasCover"
            :src="lead.image"
            :alt="lead.imageAlt"
            :style="{ objectPosition: lead.imagePosition }"
            loading="lazy"
          >
          <span v-else class="recent-cover-code">{{ lead.code }}</span>
          <span class="recent-lead-stamp">
            <b>{{ lead.period }}</b>
            <small>LATEST</small>
          </span>
        </a>

        <div class="recent-lead-body">
          <p class="recent-kicker">
            <span>{{ lead.notes.length }} NOTES</span>
          </p>
          <h3>
            <a :href="lead.href">{{ lead.name }}<em v-if="lead.code">{{ lead.code }}</em></a>
          </h3>
          <p class="recent-range">{{ lead.title }}</p>
          <blockquote v-if="lead.description">{{ lead.description }}</blockquote>

          <ol class="recent-notes">
            <li v-for="note in lead.notes.slice(0, 4)" :key="note.href">
              <a :href="withBase(note.href)">
                <time>{{ shortDate(note.updatedAt) }}</time>
                <span>{{ note.title }}</span>
              </a>
            </li>
          </ol>
          <a v-if="lead.notes.length > 4" class="recent-more" :href="timelineHref">
            另外 {{ lead.notes.length - 4 }} 篇在时间线
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>
          </a>
        </div>
      </article>

      <a v-for="card in rest" :key="card.id" class="recent-card" :href="card.href">
        <span class="recent-card-cover">
          <img
            v-if="card.hasCover"
            :src="card.image"
            :alt="card.imageAlt"
            :style="{ objectPosition: card.imagePosition }"
            loading="lazy"
          >
          <span v-else class="recent-cover-code">{{ card.code }}</span>
        </span>
        <span class="recent-card-body">
          <span class="recent-kicker">
            <span>{{ card.period }}</span>
          </span>
          <strong>{{ card.name }}<em v-if="card.code">{{ card.code }}</em></strong>
          <span class="recent-range">{{ card.title }}</span>
          <span class="recent-card-foot">
            <span>{{ card.notes.length }} 篇笔记</span>
            <svg class="recent-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>
          </span>
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-recent {
  --r-accent: var(--vp-c-brand-1);
  --r-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  --r-serif-latin: 'Bodoni Moda', Didot, 'Bodoni 72', 'Bodoni MT', 'Times New Roman', serif;
  --r-serif-zh: 'Noto Serif SC', 'Songti SC', serif;
  --r-card: var(--vp-c-bg);
  --r-line: color-mix(in srgb, var(--r-accent) 22%, var(--vp-c-divider));
}

.dark .home-recent { --r-card: var(--vp-c-bg-elv); }

/* 近期更新 */
.home-recent {
  position: relative;
  box-sizing: content-box;
  max-width: 1152px;
  margin: 24px auto 0;
  padding: 0 24px 96px;
}

/* hero 与内容之间的静态刻度尺：长刻度对齐 64px 网格，两端淡出 */
.home-recent::before {
  content: "";
  display: block;
  height: 9px;
  margin-bottom: 64px;
  background-image:
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--r-accent) 50%, transparent) 0 1px, transparent 1px 64px),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--r-accent) 22%, transparent) 0 1px, transparent 1px 8px);
  background-size: 100% 9px, 100% 4px;
  background-repeat: no-repeat;
  mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
}

.home-recent :deep(.home-section-head) { padding: 0; }

.home-recent-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.recent-lead,
.recent-card {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-radius: var(--aya-radius-lg, 20px);
  background: var(--r-card);
  box-shadow: var(--aya-elevation-2);
}

.recent-lead {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 1fr);
}

.recent-lead-cover {
  position: relative;
  display: block;
  min-height: 340px;
  overflow: hidden;
}

.recent-lead-cover img,
.recent-card-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.78) contrast(0.96);
  transition: filter var(--dur-menu, 0.32s) var(--ease-ios-fade);
}

/* 封面图自带向右的白色淡出，叠一层卡片底色让深色模式也能接上 */
.recent-lead-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 52%, var(--r-card) 98%);
  pointer-events: none;
}

.recent-lead:hover .recent-lead-cover img,
.recent-card:hover .recent-card-cover img {
  filter: saturate(0.95) contrast(1);
}

.recent-lead-stamp {
  position: absolute;
  z-index: 1;
  left: 20px;
  bottom: 20px;
  display: grid;
  gap: 4px;
  padding: 10px 14px 9px;
  border: 1px solid color-mix(in srgb, var(--vp-c-bg) 60%, transparent);
  border-radius: var(--aya-radius-sm, 12px);
  background: color-mix(in srgb, var(--vp-c-bg) 72%, transparent);
  -webkit-backdrop-filter: blur(var(--aya-frosted-blur-sm, 12px));
  backdrop-filter: blur(var(--aya-frosted-blur-sm, 12px));
  box-shadow: var(--aya-elevation-1);
}

.recent-lead-stamp b {
  font: italic 500 22px/1 var(--r-serif-latin);
  color: var(--vp-c-text-1);
}

.recent-lead-stamp small {
  font: 500 10px/1 var(--r-mono);
  letter-spacing: 0.22em;
  color: var(--r-accent);
}

.recent-cover-code {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font: italic 400 clamp(56px, 8vw, 112px)/1 var(--r-serif-latin);
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--r-accent) 55%, transparent);
  background:
    radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--r-accent) 12%, transparent), transparent 60%),
    repeating-linear-gradient(135deg, color-mix(in srgb, var(--r-accent) 6%, transparent) 0 1px, transparent 1px 10px);
}

.recent-lead-body {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 34px 36px 30px 12px;
}

.recent-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font: 500 10.5px/1 var(--r-mono);
  letter-spacing: 0.18em;
  color: var(--r-accent);
}

.recent-kicker i {
  flex: 0 0 22px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.recent-lead h3 {
  margin: 16px 0 0;
  padding: 0;
  border: 0;
  font: 700 30px/1.2 var(--r-serif-zh);
  letter-spacing: 0.02em;
}

.recent-lead h3 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.recent-lead h3 em,
.recent-card strong em {
  margin-left: 0.32em;
  font: italic 400 0.9em/1 var(--r-serif-latin);
  letter-spacing: 0;
  color: var(--r-accent);
}

.recent-range {
  display: block;
  margin: 8px 0 0;
  font: 500 12px/1.4 var(--r-mono);
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}

.recent-lead blockquote {
  margin: 18px 0 0;
  padding: 0 0 0 14px;
  border-left: 2px solid color-mix(in srgb, var(--r-accent) 50%, transparent);
  font: 400 14px/1.75 var(--r-serif-zh);
  color: var(--vp-c-text-2);
}

.recent-notes {
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--r-line);
}

.recent-notes li { margin: 0; }

.recent-notes a {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 10px 2px;
  border-bottom: 1px dashed var(--r-line);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color var(--dur-menu, 0.32s) var(--ease-ios-fade), padding var(--dur-menu, 0.32s) var(--ease-ios-fade);
}

.recent-notes a:hover {
  padding-left: 8px;
  color: var(--r-accent);
}

.recent-notes time {
  font: 500 11px/1 var(--r-mono);
  color: var(--vp-c-text-3);
}

.recent-notes span {
  overflow: hidden;
  font-size: 13.5px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--r-accent);
  text-decoration: none;
}

.recent-more svg,
.recent-arrow {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: translate var(--dur-menu, 0.32s) var(--ease-ios-fade);
}

.recent-more:hover svg,
.recent-card:hover .recent-arrow { translate: 3px 0; }

/* 次要卡片 */
.recent-card {
  display: flex;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
  transition: translate var(--dur-menu, 0.32s) var(--ease-ios-fade), box-shadow var(--dur-menu, 0.32s) var(--ease-ios-fade);
}

.recent-card:hover {
  translate: 0 -3px;
  box-shadow: var(--aya-elevation-3);
}

.recent-card:focus-visible,
.recent-notes a:focus-visible,
.recent-lead h3 a:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--r-accent) 70%, transparent);
  outline-offset: 3px;
}

.recent-card-cover {
  position: relative;
  display: block;
  aspect-ratio: 16 / 8;
  overflow: hidden;
}

.recent-card-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, var(--r-card));
  pointer-events: none;
}

.recent-card .recent-cover-code { font-size: 64px; }

.recent-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 6px 22px 18px;
}

.recent-card strong {
  margin-top: 12px;
  font: 700 18px/1.3 var(--r-serif-zh);
  color: var(--vp-c-text-1);
}

.recent-card-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
}

.recent-card-foot .recent-arrow {
  margin-left: auto;
  color: var(--r-accent);
}

@media (min-width: 640px) {
  .home-recent { padding-right: 48px; padding-left: 48px; }
}

@media (min-width: 960px) {
  .home-recent { padding-right: 64px; padding-left: 64px; }
}

/* 中等宽度：主卡上下堆叠，次要卡片横排成缩略条 */
@media (max-width: 959px) {
  .home-recent-grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .recent-lead { grid-template-columns: minmax(0, 1fr); }
  .recent-lead-cover { min-height: 0; aspect-ratio: 16 / 8; }
  .recent-lead-cover::after { background: linear-gradient(180deg, transparent 55%, var(--r-card)); }
  .recent-lead-body { padding: 4px 26px 24px; }

  .recent-card { flex-direction: row; }
  .recent-card-cover { flex: 0 0 clamp(120px, 34%, 240px); aspect-ratio: auto; min-height: 118px; }
  .recent-card-cover::after { background: linear-gradient(90deg, transparent 50%, var(--r-card)); }
  .recent-card-body { padding: 16px 20px 16px 6px; }
  .recent-card strong { margin-top: 8px; }
  .recent-card-foot { padding-top: 10px; }
  .recent-card .recent-cover-code { font-size: 40px; }
}

@media (max-width: 639px) {
  .home-recent { margin-top: 16px; padding-bottom: 64px; }
  .home-recent::before { margin-bottom: 40px; }
  .recent-lead h3 { font-size: 24px; }
  .recent-lead-stamp { left: 14px; bottom: 14px; }
  .recent-lead-body { padding: 2px 20px 20px; }
  .recent-card-cover { flex-basis: 108px; }
  .recent-card-body { padding: 14px 16px 14px 4px; }
  .recent-card strong { font-size: 16px; }
  .recent-card .recent-range { display: none; }
}
</style>
