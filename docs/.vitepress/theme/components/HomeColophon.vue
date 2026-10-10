<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import timelineEntries from '../generated/timeline-entries.json'

const { frontmatter } = useData()

const hero = computed(() => (frontmatter.value as any)?.homeHero ?? {})

const timeline = timelineEntries as { period: string, updatedAt: string, notes: unknown[] }[]
const periods = timeline.map((e) => e.period).sort()
const since = periods[0] ?? ''
const updated = (timeline.map((e) => e.updatedAt).sort().pop() ?? '').slice(0, 10).replace(/-/g, '.')
const notes = timeline.reduce((sum, e) => sum + e.notes.length, 0)

const courses = computed(() => {
  const groups = (frontmatter.value as any)?.homeCourseGroups ?? []
  return groups.reduce((sum: number, g: any) => (
    sum + (g.rows ?? [{ items: g.items ?? [] }]).reduce((n: number, row: any) => n + row.items.length, 0)
  ), 0)
})

const cells = computed(() => [
  { k: 'DRAWN BY', v: hero.value.ghost ?? 'Ayaskt' },
  { k: 'SINCE', v: since },
  { k: 'UPDATED', v: updated },
  { k: 'NOTES', v: String(notes) },
  { k: 'COURSES', v: String(courses.value) },
  { k: 'LICENSE', v: 'CC BY-NC-SA 4.0' },
])
</script>

<template>
  <aside class="home-colophon" aria-label="站点信息">
    <div class="colophon-block">
      <div class="colophon-mark">
        <span class="colophon-ghost" aria-hidden="true">{{ hero.ghost }}</span>
        <strong>{{ hero.title }}</strong>
        <p>{{ hero.tagline }}</p>
      </div>
      <dl class="colophon-cells">
        <div v-for="c in cells" :key="c.k">
          <dt>{{ c.k }}</dt>
          <dd>{{ c.v }}</dd>
        </div>
      </dl>
    </div>
  </aside>
</template>

<style scoped>
.home-colophon {
  --c-accent: var(--vp-c-brand-1);
  --c-line: color-mix(in srgb, var(--c-accent) 22%, var(--vp-c-divider));
  --c-card: var(--vp-c-bg);
  --c-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  --c-serif-latin: 'Bodoni Moda', Didot, 'Bodoni 72', 'Bodoni MT', 'Times New Roman', serif;
  box-sizing: content-box;
  max-width: 1152px;
  margin: 104px auto 0;
  padding: 0 24px;
}

.dark .home-colophon { --c-card: var(--vp-c-bg-elv); }

.colophon-block {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 2fr);
  overflow: hidden;
  border: 1px solid var(--c-line);
  border-radius: var(--aya-radius-lg, 20px);
  background: var(--c-card);
  box-shadow: var(--aya-elevation-2);
}

.colophon-mark::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--c-accent) 7%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--c-accent) 7%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(120deg, #000, transparent 75%);
  -webkit-mask-image: linear-gradient(120deg, #000, transparent 75%);
  pointer-events: none;
}

.colophon-mark {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 168px;
  padding: 26px 30px;
  border-right: 1px solid var(--c-line);
}

.colophon-ghost {
  position: absolute;
  top: 14px;
  left: 24px;
  font: italic 400 64px/1 var(--c-serif-latin);
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--c-accent) 45%, transparent);
  pointer-events: none;
}

.colophon-mark strong {
  position: relative;
  font: 700 28px/1.1 'Noto Serif SC', 'Songti SC', serif;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-1);
}

.colophon-mark p {
  position: relative;
  margin: 10px 0 0;
  font: italic 400 15px/1.3 var(--c-serif-latin);
  color: var(--vp-c-text-2);
}

.colophon-cells {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
}

.colophon-cells div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-width: 0;
  padding: 18px 22px 20px;
  border-right: 1px solid var(--c-line);
  border-bottom: 1px solid var(--c-line);
}

.colophon-cells div:nth-child(3n) { border-right: 0; }
.colophon-cells div:nth-last-child(-n + 3) { border-bottom: 0; }

.colophon-cells dt {
  font: 500 10px/1 var(--c-mono);
  letter-spacing: 0.2em;
  color: var(--c-accent);
}

.colophon-cells dd {
  margin: 0;
  overflow: hidden;
  font: 500 17px/1.2 var(--c-mono);
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

@media (min-width: 640px) {
  .home-colophon { padding: 0 48px; }
}

@media (min-width: 960px) {
  .home-colophon { padding: 0 64px; }
}

/* 中等宽度：标题块在上，信息格三列铺满 */
@media (max-width: 959px) {
  .colophon-block { grid-template-columns: minmax(0, 1fr); }
  .colophon-mark { min-height: 136px; padding: 24px 22px 20px; border-right: 0; border-bottom: 1px solid var(--c-line); }
  .colophon-ghost { font-size: 52px; left: 18px; }
}

@media (max-width: 767px) {
  .home-colophon { margin-top: 72px; }
}

@media (max-width: 639px) {
  .colophon-cells { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .colophon-cells div { padding: 14px 18px 16px; }
  .colophon-cells div:nth-child(3n) { border-right: 1px solid var(--c-line); }
  .colophon-cells div:nth-child(2n) { border-right: 0; }
  .colophon-cells div:nth-last-child(-n + 3) { border-bottom: 1px solid var(--c-line); }
  .colophon-cells div:nth-last-child(-n + 2) { border-bottom: 0; }
  .colophon-cells dd { font-size: 14px; white-space: normal; }
}
</style>
