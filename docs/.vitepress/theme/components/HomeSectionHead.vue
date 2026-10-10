<script setup lang="ts">
defineProps<{
  num: string
  label: string
  title: string
  headingId?: string
  moreText?: string
  moreHref?: string
}>()
</script>

<template>
  <div class="home-section-head">
    <span class="home-section-num" aria-hidden="true">{{ num }}</span>
    <div>
      <small>{{ label }}</small>
      <h2 :id="headingId">{{ title }}</h2>
    </div>
    <span class="home-section-rule" />
    <a v-if="moreText && moreHref" class="home-section-more" :href="moreHref">
      {{ moreText }}
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>
    </a>
  </div>
</template>

<style scoped>
.home-section-head {
  display: flex;
  align-items: flex-end;
  gap: 18px;
  box-sizing: content-box;
  max-width: 1152px;
  margin: 0 auto 28px;
  padding: 0 24px;
}

.home-section-num {
  font-family: 'Bodoni Moda', Didot, 'Bodoni 72', 'Bodoni MT', 'Times New Roman', serif;
  font-size: 64px;
  font-style: italic;
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--vp-c-brand-1) 70%, transparent);
}

small {
  display: block;
  margin-bottom: 6px;
  font: 500 11px/1 ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  letter-spacing: 0.2em;
  color: var(--vp-c-brand-1);
}

h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

:root:not(.dark) h2 { color: #141413; }

.home-section-rule {
  flex: 1;
  height: 1px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent), transparent);
}

.home-section-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
  padding: 7px 14px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
  border-radius: var(--aya-radius-pill, 999px);
  background: var(--vp-c-bg);
  box-shadow: var(--aya-elevation-1);
  font: 500 12px/1 ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  letter-spacing: 0.06em;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  white-space: nowrap;
  transition: background var(--dur-menu, 0.32s) var(--ease-ios-fade);
}

.home-section-more:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg));
}

.home-section-more svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: translate var(--dur-menu, 0.32s) var(--ease-ios-fade);
}

.home-section-more:hover svg { translate: 3px 0; }

@media (min-width: 640px) {
  .home-section-head { padding: 0 48px; }
}

@media (min-width: 960px) {
  .home-section-head { padding: 0 64px; }
}

@media (max-width: 639px) {
  .home-section-head { gap: 14px; }
  .home-section-num { font-size: 48px; }
  h2 { font-size: 22px; }
  .home-section-rule { display: none; }
  .home-section-more { margin-left: auto; padding: 6px 11px; }
}
</style>
