# PDF Download Print Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `下载 PDF` dropdown to article metadata that lets readers print/save the current rendered VitePress article as a light or dark PDF.

**Architecture:** Reuse the existing `DocMeta` injection after each article H1. `DocMeta.vue` owns the dropdown and temporary print theme marker; theme CSS owns print-only layout cleanup and light/dark print styling. The Markdown config passes a `pdf` prop from frontmatter so pages can opt out with `pdf: false`.

**Tech Stack:** VitePress 2 alpha, Vue 3 `<script setup>`, Node.js `node:test`, global CSS `@media print`, browser `window.print()`.

---

## File Structure

- Modify `package.json`: add a `test:pdf` script for the lightweight verification script.
- Create `scripts/verify-pdf-download.mjs`: source-level regression checks for this feature. It avoids native print dialog automation, which browser engines intentionally restrict.
- Modify `docs/.vitepress/config.mts`: pass `:pdf="false"` only when frontmatter sets `pdf: false`; otherwise pass `:pdf="true"`.
- Modify `docs/.vitepress/theme/components/DocMeta.vue`: add the dropdown, print theme handling, cleanup, accessibility, and responsive scoped styles.
- Modify `docs/.vitepress/theme/style/index.css`: add global print CSS that hides site chrome and applies light/dark PDF themes.

Do not modify unrelated dirty files already present in the worktree unless a later task explicitly requires it.

---

### Task 1: Add PDF Feature Verification Script

**Files:**
- Modify: `package.json`
- Create: `scripts/verify-pdf-download.mjs`

- [ ] **Step 1: Write the failing verification script**

Create `scripts/verify-pdf-download.mjs` with these contents:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('markdown injects the pdf prop from frontmatter', () => {
  const config = read('docs/.vitepress/config.mts')

  assert.match(
    config,
    /const pdf = frontmatter\.pdf === false \? 'false' : 'true'/,
    'formatDocMeta should derive pdf from frontmatter.pdf'
  )
  assert.match(
    config,
    /<DocMeta :words="\$\{words\}" :minutes="\$\{minutes\}" author="\$\{md\.utils\.escapeHtml\(author\)\}" :pdf="\$\{pdf\}"><\/DocMeta>/,
    'DocMeta injection should pass the pdf prop'
  )
})

test('DocMeta exposes an accessible light and dark PDF dropdown', () => {
  const docMeta = read('docs/.vitepress/theme/components/DocMeta.vue')

  assert.match(docMeta, /pdf\?: boolean/, 'DocMeta should accept an optional pdf prop')
  assert.match(docMeta, /const showPdfMenu = ref\(false\)/, 'DocMeta should track menu state')
  assert.match(docMeta, /data-pdf-theme/, 'DocMeta should set a temporary print theme marker')
  assert.match(docMeta, /window\.print\(\)/, 'DocMeta should call the browser print dialog')
  assert.match(docMeta, /aria-haspopup="menu"/, 'PDF trigger should expose menu semantics')
  assert.match(docMeta, />白色 PDF</, 'Light PDF option should be present')
  assert.match(docMeta, />黑色 PDF</, 'Dark PDF option should be present')
  assert.match(docMeta, /@keydown\.escape/, 'Escape should close the dropdown')
})

test('print CSS hides site chrome and supports light and dark themes', () => {
  const css = read('docs/.vitepress/theme/style/index.css')

  assert.match(css, /@media print/, 'global print styles should exist')
  assert.match(css, /\.VPNavBar[\s\S]*display: none !important/, 'print should hide the nav bar')
  assert.match(css, /\.VPSidebar[\s\S]*display: none !important/, 'print should hide the sidebar')
  assert.match(css, /\.VPDoc \.aside[\s\S]*display: none !important/, 'print should hide the article outline')
  assert.match(css, /\.giscus[\s\S]*display: none !important/, 'print should hide comments')
  assert.match(css, /\[data-pdf-theme="light"\]/, 'light PDF theme selector should exist')
  assert.match(css, /\[data-pdf-theme="dark"\]/, 'dark PDF theme selector should exist')
  assert.match(css, /\.doc-meta-pdf[\s\S]*display: none !important/, 'print should hide the PDF dropdown itself')
})
```

- [ ] **Step 2: Add the test script command**

In `package.json`, replace the current scripts object with:

```json
"scripts": {
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs",
  "docs:preview": "vitepress preview docs",
  "test:pdf": "node --test scripts/verify-pdf-download.mjs",
  "postinstall": "node scripts/patch-mathjax.mjs"
}
```

- [ ] **Step 3: Run the verification script and confirm it fails**

Run:

```bash
npm run test:pdf
```

Expected: FAIL. The failure should mention missing `pdf` prop handling, missing `data-pdf-theme`, or missing `@media print`.

- [ ] **Step 4: Commit the failing test**

Run:

```bash
git add package.json scripts/verify-pdf-download.mjs
git commit -m "test: cover pdf print download"
```

---

### Task 2: Pass Frontmatter PDF Opt-Out Into DocMeta

**Files:**
- Modify: `docs/.vitepress/config.mts:116-122`
- Test: `scripts/verify-pdf-download.mjs`

- [ ] **Step 1: Verify the focused test is red**

Run:

```bash
npm run test:pdf
```

Expected: FAIL on `markdown injects the pdf prop from frontmatter`.

- [ ] **Step 2: Implement the minimal config change**

In `docs/.vitepress/config.mts`, replace `formatDocMeta` with:

```ts
function formatDocMeta(md: any, src: string, frontmatter: Record<string, any> = {}) {
  const words = getReadableWordCount(src)
  const minutes = Math.max(1, Math.ceil(words / 500))
  const author = String(frontmatter.author ?? 'Ayaskt')
  const pdf = frontmatter.pdf === false ? 'false' : 'true'

  return `<DocMeta :words="${words}" :minutes="${minutes}" author="${md.utils.escapeHtml(author)}" :pdf="${pdf}"></DocMeta>\n`
}
```

- [ ] **Step 3: Run the verification script**

Run:

```bash
npm run test:pdf
```

Expected: still FAIL, but the failure should move past the Markdown injection assertions and continue to missing `DocMeta`/CSS behavior.

- [ ] **Step 4: Run a production build**

Run:

```bash
npm run docs:build
```

Expected: PASS. VitePress should build without Vue template errors.

- [ ] **Step 5: Commit the config change**

Run:

```bash
git add docs/.vitepress/config.mts
git commit -m "feat: pass pdf option to doc meta"
```

---

### Task 3: Add DocMeta PDF Dropdown And Print Trigger

**Files:**
- Modify: `docs/.vitepress/theme/components/DocMeta.vue`
- Test: `scripts/verify-pdf-download.mjs`

- [ ] **Step 1: Verify the focused test is red**

Run:

```bash
npm run test:pdf
```

Expected: FAIL on `DocMeta exposes an accessible light and dark PDF dropdown`.

- [ ] **Step 2: Replace the DocMeta script block**

In `docs/.vitepress/theme/components/DocMeta.vue`, replace the existing `<script setup lang="ts">...</script>` with:

```vue
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(defineProps<{
  words: number
  minutes: number
  author: string
  pdf?: boolean
}>(), {
  pdf: true
})

const { page, theme } = useData()

const showPdfMenu = ref(false)
let cleanupTimer: ReturnType<typeof window.setTimeout> | undefined

const wordText = computed(() => props.words.toLocaleString('zh-CN'))

const lastUpdatedText = computed(() => {
  if (!page.value.lastUpdated) return ''

  const date = new Date(page.value.lastUpdated)
  const formatOptions = theme.value.lastUpdated?.formatOptions ?? {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  const locale = theme.value.lastUpdated?.formatOptions?.forceLocale ?? 'zh-CN'

  return new Intl.DateTimeFormat(locale, formatOptions).format(date)
})

function closePdfMenu() {
  showPdfMenu.value = false
}

function togglePdfMenu() {
  showPdfMenu.value = !showPdfMenu.value
}

function clearPdfTheme() {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute('data-pdf-theme')
  window.removeEventListener('afterprint', clearPdfTheme)
  if (cleanupTimer) {
    window.clearTimeout(cleanupTimer)
    cleanupTimer = undefined
  }
}

async function printPdf(themeName: 'light' | 'dark') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  closePdfMenu()

  if (typeof window.print !== 'function') return

  document.documentElement.setAttribute('data-pdf-theme', themeName)
  window.addEventListener('afterprint', clearPdfTheme, { once: true })

  await nextTick()
  window.print()

  cleanupTimer = window.setTimeout(clearPdfTheme, 1500)
}

onBeforeUnmount(() => {
  clearPdfTheme()
})
</script>
```

- [ ] **Step 3: Replace the DocMeta template**

In the same file, replace the existing `<template>...</template>` with:

```vue
<template>
  <div class="doc-meta" @keydown.escape="closePdfMenu">
    <div class="doc-meta-row">
      <div class="doc-meta-main">
        <span>字数 {{ wordText }}</span>
        <span class="doc-meta-sep">｜</span>
        <span>阅读时间 {{ minutes }} 分钟</span>
        <span class="doc-meta-sep">｜</span>
        <span>{{ author }}</span>
      </div>

      <div v-if="pdf" class="doc-meta-pdf">
        <button
          class="doc-meta-pdf-trigger"
          type="button"
          aria-haspopup="menu"
          :aria-expanded="showPdfMenu"
          @click="togglePdfMenu"
          @blur="closePdfMenu"
        >
          下载 PDF
          <span class="doc-meta-pdf-caret" aria-hidden="true">⌄</span>
        </button>
        <div v-if="showPdfMenu" class="doc-meta-pdf-menu" role="menu">
          <button type="button" role="menuitem" @mousedown.prevent @click="printPdf('light')">白色 PDF</button>
          <button type="button" role="menuitem" @mousedown.prevent @click="printPdf('dark')">黑色 PDF</button>
        </div>
      </div>
    </div>

    <div v-if="lastUpdatedText" class="doc-meta-updated">
      最后更新：{{ lastUpdatedText }}
    </div>
  </div>
</template>
```

- [ ] **Step 4: Replace the scoped DocMeta styles**

In the same file, replace the existing `<style scoped>...</style>` with:

```vue
<style scoped>
.doc-meta {
  margin: 14px 0 30px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 18px;
  line-height: 1.55;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.doc-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.doc-meta-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.doc-meta-updated {
  margin-top: 4px;
}

.doc-meta-sep {
  color: var(--vp-c-divider);
}

.doc-meta-pdf {
  position: relative;
  flex: 0 0 auto;
}

.doc-meta-pdf-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 9px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font: inherit;
  line-height: 1.35;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.doc-meta-pdf-trigger:hover,
.doc-meta-pdf-trigger:focus-visible {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  outline: none;
}

.doc-meta-pdf-caret {
  font-size: 12px;
  line-height: 1;
}

.doc-meta-pdf-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 30;
  min-width: 112px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-2);
}

.doc-meta-pdf-menu button {
  display: block;
  width: 100%;
  border: 0;
  padding: 7px 10px;
  background: transparent;
  color: var(--vp-c-text-2);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.doc-meta-pdf-menu button:hover,
.doc-meta-pdf-menu button:focus-visible {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
  outline: none;
}

@media (max-width: 640px) {
  .doc-meta-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .doc-meta-pdf-menu {
    right: auto;
    left: 0;
  }
}
</style>
```

- [ ] **Step 5: Run the verification script**

Run:

```bash
npm run test:pdf
```

Expected: still FAIL only on missing print CSS assertions.

- [ ] **Step 6: Run a production build**

Run:

```bash
npm run docs:build
```

Expected: PASS. The Vue SFC should compile cleanly.

- [ ] **Step 7: Commit the component change**

Run:

```bash
git add docs/.vitepress/theme/components/DocMeta.vue
git commit -m "feat: add pdf dropdown to doc meta"
```

---

### Task 4: Add Print CSS Themes And Final Verification

**Files:**
- Modify: `docs/.vitepress/theme/style/index.css`
- Test: `scripts/verify-pdf-download.mjs`

- [ ] **Step 1: Verify the focused test is red**

Run:

```bash
npm run test:pdf
```

Expected: FAIL on `print CSS hides site chrome and supports light and dark themes`.

- [ ] **Step 2: Add print styles near the top-level document styles**

In `docs/.vitepress/theme/style/index.css`, insert this block after the image-centering rules:

```css
@media print {
  @page {
    margin: 16mm 14mm;
  }

  html,
  body {
    width: auto !important;
    min-width: 0 !important;
    overflow: visible !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  html[data-pdf-theme="light"],
  html[data-pdf-theme="light"] body,
  html[data-pdf-theme="light"] .VPDoc,
  html[data-pdf-theme="light"] .vp-doc {
    background: #ffffff !important;
    color: #1f2328 !important;
  }

  html[data-pdf-theme="dark"],
  html[data-pdf-theme="dark"] body,
  html[data-pdf-theme="dark"] .VPDoc,
  html[data-pdf-theme="dark"] .vp-doc {
    background: #101216 !important;
    color: #f1f3f5 !important;
  }

  .VPNavBar,
  .VPSidebar,
  .VPLocalNav,
  .VPDoc .aside,
  .VPDocFooter,
  .giscus,
  .giscus-frame,
  .back-to-top,
  .mouse-click,
  .doc-meta-pdf {
    display: none !important;
  }

  .VPDoc {
    padding: 0 !important;
  }

  .VPDoc .container,
  .VPDoc .content,
  .VPDoc .content-container,
  .VPDoc .main {
    display: block !important;
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .vp-doc {
    max-width: none !important;
    font-size: 12pt;
    line-height: 1.7;
  }

  .vp-doc h1,
  .vp-doc h2,
  .vp-doc h3,
  .vp-doc h4,
  .vp-doc h5,
  .vp-doc h6 {
    break-after: avoid;
    page-break-after: avoid;
  }

  .vp-doc img,
  .vp-doc svg,
  .vp-doc table,
  .custom-block,
  .example-stem,
  .example-solution {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .vp-doc img {
    max-width: 100% !important;
    height: auto !important;
  }

  .vp-doc table {
    width: auto;
    max-width: 100%;
  }

  html[data-pdf-theme="light"] .vp-doc a {
    color: #245c8f !important;
  }

  html[data-pdf-theme="dark"] .vp-doc a {
    color: #98cbea !important;
  }

  html[data-pdf-theme="dark"] .vp-doc tr,
  html[data-pdf-theme="dark"] .vp-doc th,
  html[data-pdf-theme="dark"] .vp-doc td,
  html[data-pdf-theme="dark"] .custom-block,
  html[data-pdf-theme="dark"] .example-stem,
  html[data-pdf-theme="dark"] .example-solution {
    border-color: rgba(255, 255, 255, 0.22) !important;
  }

  html[data-pdf-theme="dark"] .vp-doc div[class*='language-'],
  html[data-pdf-theme="dark"] .vp-doc pre,
  html[data-pdf-theme="dark"] .vp-doc code {
    background-color: #171b21 !important;
    color: #f1f3f5 !important;
  }
}
```

- [ ] **Step 3: Run the verification script**

Run:

```bash
npm run test:pdf
```

Expected: PASS.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run docs:build
```

Expected: PASS.

- [ ] **Step 5: Start the dev server for manual verification**

Run:

```bash
npm run docs:dev -- --host 127.0.0.1
```

Expected: VitePress starts and prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 6: Browser-check one article**

Open a representative article such as:

```text
http://127.0.0.1:5173/Y3S2/DSP/DSP%20Chapter%202.html
```

Verify:

- The metadata row shows `下载 PDF` on the right.
- The dropdown opens with `白色 PDF` and `黑色 PDF`.
- Metadata text does not overlap on desktop or mobile-width viewport.
- The browser print preview hides nav, sidebar, local outline, comments, and the PDF dropdown.
- The print preview keeps H1, metadata text, article content, images, tables, and MathJax SVG.

- [ ] **Step 7: Browser-check frontmatter opt-out**

Temporarily add this frontmatter to a local scratch article or an existing test page, then remove it before committing:

```md
---
pdf: false
---
```

Verify the article still shows metadata but does not show `下载 PDF`.

- [ ] **Step 8: Commit final implementation**

Run:

```bash
git add package.json scripts/verify-pdf-download.mjs docs/.vitepress/config.mts docs/.vitepress/theme/components/DocMeta.vue docs/.vitepress/theme/style/index.css
git commit -m "feat: add pdf print download"
```

---

## Final Verification Checklist

- [ ] `npm run test:pdf` passes.
- [ ] `npm run docs:build` passes.
- [ ] Desktop article metadata layout is clean.
- [ ] Mobile article metadata layout is clean.
- [ ] Light print mode is readable.
- [ ] Dark print mode is readable.
- [ ] Print hides nav bar, sidebar, local outline, comments, and PDF controls.
- [ ] Print keeps rendered Markdown, MathJax SVG, images, tables, example containers, and definition containers.
- [ ] `pdf: false` hides only the PDF dropdown.

## Notes For Implementers

- Native print dialogs cannot be reliably asserted in ordinary automated tests. Verify the marker and CSS automatically, then inspect print preview manually.
- The repository has unrelated dirty files at the time this plan was written. Do not revert or rewrite them.
- If the `@blur` behavior closes the menu before a menu item click in a specific browser, prefer replacing it with a small document-level outside-click handler in `DocMeta.vue` rather than changing the user-facing interaction.
