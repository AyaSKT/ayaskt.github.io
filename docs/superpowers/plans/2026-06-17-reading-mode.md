# Pure Reading Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a landscape-only pure reading mode control to the VitePress navbar that hides navbar, sidebar, and right outline without changing article layout.

**Architecture:** Add one focused `ReadingModeControl.vue` component mounted through the default theme's `nav-bar-content-after` slot, plus one `reading-mode.css` stylesheet imported by the theme. The component owns route/frontmatter/viewport state, feedback toast, session-only active state, root CSS classes, and hover-region timers; CSS owns nav-style button visuals, active inversion, fades, and reduced-motion behavior.

**Tech Stack:** Vue 3 `<script setup lang="ts">`, VitePress `useData` / `useRoute`, existing VitePress default theme DOM classes, existing CSS variables in `nav-tabs.css`, Node `node:test` source-contract checks.

---

## File Structure

- Create `scripts/reading-mode.test.mjs`: source-contract tests for mount wiring, component behavior requirements, and CSS selectors.
- Create `docs/.vitepress/theme/components/ReadingModeControl.vue`: navbar button, session state, route/frontmatter checks, toast feedback, root class management, hover-region timers.
- Create `docs/.vitepress/theme/style/reading-mode.css`: button glass pill styling, active light/dark inversion, hidden/visible state transitions, hover sensors, portrait hiding, reduced-motion rules.
- Modify `docs/.vitepress/theme/components/MyLayout.vue`: import `ReadingModeControl` and render it in the `nav-bar-content-after` slot.
- Modify `docs/.vitepress/theme/style/index.css`: import `reading-mode.css`.
- Modify `package.json`: add `test:reading-mode`.

## Task 1: Mount Skeleton And Contract Test Harness

**Files:**
- Create: `scripts/reading-mode.test.mjs`
- Create: `docs/.vitepress/theme/components/ReadingModeControl.vue`
- Create: `docs/.vitepress/theme/style/reading-mode.css`
- Modify: `package.json`
- Modify: `docs/.vitepress/theme/components/MyLayout.vue`
- Modify: `docs/.vitepress/theme/style/index.css`

- [ ] **Step 1: Write the failing mount contract test**

Create `scripts/reading-mode.test.mjs` with this content:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('reading mode control is mounted through the VitePress nav slot', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')

  assert.match(layout, /import ReadingModeControl from ['"]\.\/ReadingModeControl\.vue['"]/)
  assert.match(layout, /<template #nav-bar-content-after>\s*<ReadingModeControl\s*\/>\s*<\/template>/)
})

test('reading mode stylesheet is imported by the theme', () => {
  const css = read('docs/.vitepress/theme/style/index.css')

  assert.match(css, /@import ['"]\.\/reading-mode\.css['"];/)
})

test('package exposes a focused reading mode contract test', () => {
  const pkg = JSON.parse(read('package.json'))

  assert.equal(pkg.scripts['test:reading-mode'], 'node --test scripts/reading-mode.test.mjs')
})
```

- [ ] **Step 2: Run the new test and verify it fails**

Run:

```bash
node --test scripts/reading-mode.test.mjs
```

Expected: FAIL with an assertion mentioning `ReadingModeControl`, because the component is not mounted yet.

- [ ] **Step 3: Add the test script to `package.json`**

In `package.json`, add the new script after `test:doc-meta-date`:

```json
"test:reading-mode": "node --test scripts/reading-mode.test.mjs",
```

The surrounding scripts block should include:

```json
"test:theme-components": "node --test scripts/theme-components.test.mjs",
"test:course-index-assets": "node --test scripts/course-index-utils.test.mjs",
"test:doc-meta-date": "node --test scripts/doc-meta-date.test.mjs",
"test:reading-mode": "node --test scripts/reading-mode.test.mjs",
"test:pdf": "node --test scripts/verify-pdf-download.mjs",
```

- [ ] **Step 4: Create the initial component skeleton**

Create `docs/.vitepress/theme/components/ReadingModeControl.vue`:

```vue
<template>
  <div class="reading-mode-control" />
</template>
```

- [ ] **Step 5: Create the initial stylesheet**

Create `docs/.vitepress/theme/style/reading-mode.css`:

```css
.reading-mode-control {
  display: none;
}
```

- [ ] **Step 6: Mount the component in `MyLayout.vue`**

Add this import after the `TopProgress` import:

```ts
import ReadingModeControl from './ReadingModeControl.vue'
```

Add this slot inside `<DefaultTheme.Layout>`, after the `layout-top` slot and before `doc-after`:

```vue
    <template #nav-bar-content-after>
      <ReadingModeControl />
    </template>
```

- [ ] **Step 7: Import the stylesheet**

In `docs/.vitepress/theme/style/index.css`, add this import after `sidebar-window.css`:

```css
@import './reading-mode.css';
```

- [ ] **Step 8: Run the mount contract test**

Run:

```bash
npm run test:reading-mode
```

Expected: PASS, with 3 passing subtests.

- [ ] **Step 9: Commit the skeleton and test harness**

```bash
git add package.json scripts/reading-mode.test.mjs docs/.vitepress/theme/components/MyLayout.vue docs/.vitepress/theme/components/ReadingModeControl.vue docs/.vitepress/theme/style/index.css docs/.vitepress/theme/style/reading-mode.css
git commit -m "feat: mount reading mode control"
```

## Task 2: Reading Mode Component Behavior

**Files:**
- Modify: `scripts/reading-mode.test.mjs`
- Modify: `docs/.vitepress/theme/components/ReadingModeControl.vue`

- [ ] **Step 1: Extend the contract test for component behavior**

Replace `scripts/reading-mode.test.mjs` with:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('reading mode control is mounted through the VitePress nav slot', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')

  assert.match(layout, /import ReadingModeControl from ['"]\.\/ReadingModeControl\.vue['"]/)
  assert.match(layout, /<template #nav-bar-content-after>\s*<ReadingModeControl\s*\/>\s*<\/template>/)
})

test('reading mode stylesheet is imported by the theme', () => {
  const css = read('docs/.vitepress/theme/style/index.css')

  assert.match(css, /@import ['"]\.\/reading-mode\.css['"];/)
})

test('package exposes a focused reading mode contract test', () => {
  const pkg = JSON.parse(read('package.json'))

  assert.equal(pkg.scripts['test:reading-mode'], 'node --test scripts/reading-mode.test.mjs')
})

test('ReadingModeControl owns route, frontmatter, viewport, and session-only state', () => {
  const source = read('docs/.vitepress/theme/components/ReadingModeControl.vue')

  assert.match(source, /useData\(\)/, 'component should read VitePress frontmatter and page data')
  assert.match(source, /useRoute\(\)/, 'component should react to route changes')
  assert.match(source, /readingMode\s*!==\s*false/, 'frontmatter should default to enabled and allow readingMode: false')
  assert.match(source, /route\.path\s*===\s*'\/'/, 'homepage should be handled explicitly')
  assert.match(source, /route\.path\s*===\s*'\/index\.html'/, 'index.html homepage route should be handled')
  assert.match(source, /matchMedia\('\(orientation: portrait\)'\)/, 'portrait orientation should disable the control')
  assert.match(source, /active\s*=\s*ref\(false\)/, 'reading state should be in-memory for refresh reset')
  assert.doesNotMatch(source, /localStorage|sessionStorage/, 'reading mode must not persist through refresh')
})

test('ReadingModeControl applies the agreed root classes and feedback messages', () => {
  const source = read('docs/.vitepress/theme/components/ReadingModeControl.vue')

  assert.match(source, /reading-mode-active/)
  assert.match(source, /reading-mode-nav-visible/)
  assert.match(source, /reading-mode-sidebar-visible/)
  assert.match(source, /reading-mode-aside-visible/)
  assert.match(source, /这里似乎没有可以隐藏的内容\.\.\./)
  assert.match(source, /本页未启用纯净阅读模式/)
  assert.match(source, /HIDE_DELAY_MS\s*=\s*300/, 'hover leave delay should be 0.3s')
  assert.match(source, /aria-pressed/)
  assert.match(source, /aria-label/)
  assert.match(source, /fill="currentColor"/, 'book icon should inherit nav color')
})
```

- [ ] **Step 2: Run the behavior contract test and verify it fails**

Run:

```bash
npm run test:reading-mode
```

Expected: FAIL in the component behavior subtests, because the component still contains only the skeleton.

- [ ] **Step 3: Replace `ReadingModeControl.vue` with the full behavior implementation**

Replace `docs/.vitepress/theme/components/ReadingModeControl.vue` with:

```vue
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import { useData, useRoute } from 'vitepress'

type Region = 'nav' | 'sidebar' | 'aside'

const HIDE_DELAY_MS = 300
const TOAST_DURATION_MS = 1800
const SHAKE_DURATION_MS = 420

const route = useRoute()
const { frontmatter, page } = useData()

const active = ref(false)
const isPortrait = ref(false)
const isShaking = ref(false)
const buttonRef = ref<HTMLButtonElement | null>(null)

const visibleRegions = reactive<Record<Region, boolean>>({
  nav: false,
  sidebar: false,
  aside: false,
})

const toast = reactive({
  visible: false,
  text: '',
  x: 0,
  y: 0,
})

const regionClassMap: Record<Region, string> = {
  nav: 'reading-mode-nav-visible',
  sidebar: 'reading-mode-sidebar-visible',
  aside: 'reading-mode-aside-visible',
}

const surfaceSelectors: Record<Region, string> = {
  nav: '.VPNavBar',
  sidebar: '.VPSidebar',
  aside: '.VPDoc .aside',
}

const hideTimers = new Map<Region, number>()
let toastTimer = 0
let shakeTimer = 0
let mediaQuery: MediaQueryList | undefined
let detachSurfaceListeners: Array<() => void> = []

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const isDocumentPage = computed(() => {
  if (isHome.value) return false
  return !page.value?.isNotFound
})

const pageAllowsReading = computed(() => {
  const data = frontmatter.value as { readingMode?: boolean }
  return data.readingMode !== false
})

const canUseReadingMode = computed(() => (
  !isPortrait.value &&
  isDocumentPage.value &&
  pageAllowsReading.value
))

const showControl = computed(() => (
  !isPortrait.value &&
  (isHome.value || isDocumentPage.value)
))

const effectiveActive = computed(() => active.value && canUseReadingMode.value)

const buttonTitle = computed(() => {
  if (isHome.value) return '首页没有可隐藏的阅读辅助区域'
  if (!pageAllowsReading.value) return '本页未启用纯净阅读模式'
  return effectiveActive.value ? '退出纯净阅读模式' : '进入纯净阅读模式'
})

const buttonLabel = computed(() => buttonTitle.value)

const toastStyle = computed(() => ({
  left: `${toast.x}px`,
  top: `${toast.y}px`,
}))

function updatePortraitState() {
  if (typeof window === 'undefined') return
  mediaQuery ??= window.matchMedia('(orientation: portrait)')
  isPortrait.value = mediaQuery.matches
}

function clearHideTimer(region: Region) {
  const timer = hideTimers.get(region)
  if (timer) {
    window.clearTimeout(timer)
    hideTimers.delete(region)
  }
}

function showRegion(region: Region) {
  clearHideTimer(region)
  visibleRegions[region] = true
}

function hideRegionSoon(region: Region) {
  clearHideTimer(region)
  hideTimers.set(region, window.setTimeout(() => {
    visibleRegions[region] = false
    hideTimers.delete(region)
  }, HIDE_DELAY_MS))
}

function clearVisibleRegions() {
  ;(Object.keys(visibleRegions) as Region[]).forEach((region) => {
    clearHideTimer(region)
    visibleRegions[region] = false
  })
}

function showToast(event: MouseEvent, text: string) {
  const fallbackRect = buttonRef.value?.getBoundingClientRect()
  const x = Number.isFinite(event.clientX)
    ? event.clientX
    : (fallbackRect ? fallbackRect.left + fallbackRect.width / 2 : window.innerWidth / 2)
  const y = Number.isFinite(event.clientY)
    ? event.clientY
    : (fallbackRect ? fallbackRect.bottom + 10 : 72)

  toast.text = text
  toast.x = x + 12
  toast.y = y + 14
  toast.visible = true

  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.visible = false
  }, TOAST_DURATION_MS)
}

function shakeButton() {
  window.clearTimeout(shakeTimer)
  isShaking.value = false

  window.requestAnimationFrame(() => {
    isShaking.value = true
    shakeTimer = window.setTimeout(() => {
      isShaking.value = false
    }, SHAKE_DURATION_MS)
  })
}

function rejectWithFeedback(event: MouseEvent, text: string) {
  shakeButton()
  showToast(event, text)
}

function onToggle(event: MouseEvent) {
  if (isHome.value) {
    rejectWithFeedback(event, '这里似乎没有可以隐藏的内容...')
    return
  }

  if (!canUseReadingMode.value) {
    rejectWithFeedback(event, '本页未启用纯净阅读模式')
    return
  }

  active.value = !active.value
  if (!active.value) clearVisibleRegions()
}

function detachSurfaces() {
  detachSurfaceListeners.forEach((detach) => detach())
  detachSurfaceListeners = []
}

function syncSurfaceListeners() {
  detachSurfaces()
  if (!effectiveActive.value || typeof document === 'undefined') return

  ;(Object.keys(surfaceSelectors) as Region[]).forEach((region) => {
    const element = document.querySelector(surfaceSelectors[region])
    if (!(element instanceof HTMLElement)) return

    const enter = () => showRegion(region)
    const leave = () => hideRegionSoon(region)
    element.addEventListener('pointerenter', enter)
    element.addEventListener('pointerleave', leave)
    detachSurfaceListeners.push(() => {
      element.removeEventListener('pointerenter', enter)
      element.removeEventListener('pointerleave', leave)
    })
  })
}

function removeRootClasses() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('reading-mode-active')
  Object.values(regionClassMap).forEach((className) => root.classList.remove(className))
}

function onMediaQueryChange() {
  updatePortraitState()
}

watch([canUseReadingMode, () => route.path], ([canUse]) => {
  if (!canUse) active.value = false
  clearVisibleRegions()
  void nextTick(syncSurfaceListeners)
})

watch([effectiveActive, () => route.path], () => {
  void nextTick(syncSurfaceListeners)
}, { immediate: true })

watchEffect(() => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.toggle('reading-mode-active', effectiveActive.value)

  ;(Object.keys(regionClassMap) as Region[]).forEach((region) => {
    root.classList.toggle(regionClassMap[region], effectiveActive.value && visibleRegions[region])
  })
})

onMounted(() => {
  updatePortraitState()
  mediaQuery?.addEventListener('change', onMediaQueryChange)
  window.addEventListener('resize', updatePortraitState)
})

onUnmounted(() => {
  window.clearTimeout(toastTimer)
  window.clearTimeout(shakeTimer)
  hideTimers.forEach((timer) => window.clearTimeout(timer))
  hideTimers.clear()
  detachSurfaces()
  removeRootClasses()
  mediaQuery?.removeEventListener('change', onMediaQueryChange)
  window.removeEventListener('resize', updatePortraitState)
})
</script>

<template>
  <div
    v-if="showControl"
    class="reading-mode-control"
    :class="{ 'is-active': effectiveActive, 'is-shaking': isShaking }"
  >
    <button
      ref="buttonRef"
      class="reading-mode-button"
      type="button"
      :title="buttonTitle"
      :aria-label="buttonLabel"
      :aria-pressed="effectiveActive"
      @click="onToggle"
    >
      <svg
        class="reading-mode-icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M859.136 51.712h-253.952c-38.4 0-72.704 19.456-93.184 48.64-20.48-29.184-54.784-48.64-93.184-48.64H164.864C102.4 51.712 51.2 102.912 51.2 165.376v627.2c0 62.976 51.2 113.664 113.664 113.664h211.456c32.256 41.472 81.92 65.536 135.168 65.536 52.736 0 102.4-24.576 135.168-65.536h211.456c62.976 0 113.664-51.2 113.664-113.664V165.376c1.024-62.464-50.176-113.664-112.64-113.664zM931.84 792.576c0 39.936-32.768 72.704-72.704 72.704h-222.208c-6.656 0-13.312 3.584-16.896 8.704-24.576 35.328-64.512 56.832-107.52 56.832s-83.456-20.992-107.52-56.832c-3.584-5.632-10.24-8.704-16.896-8.704H165.888c-39.936 0-72.704-32.768-72.704-72.704V165.376c0-39.936 32.768-72.704 72.704-72.704H419.84c39.936 0 72.704 32.768 72.704 72.704V629.76c0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48V165.376c0-39.936 32.768-72.704 72.704-72.704H860.16c39.936 0 72.704 32.768 72.704 72.704v627.2z" fill="currentColor" />
        <path d="M367.104 241.152H215.04c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-8.704-20.48-19.968-20.48zM367.104 457.216H215.04c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-8.704-20.48-19.968-20.48zM367.104 672.768H215.04c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48 0.512-11.264-8.704-20.48-19.968-20.48zM807.936 241.152h-151.552c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48zM807.936 457.216h-151.552c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48zM807.936 672.768h-151.552c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h151.552c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48z" fill="currentColor" />
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="toast.visible"
        class="reading-mode-toast"
        :style="toastStyle"
      >
        {{ toast.text }}
      </div>

      <div
        v-if="effectiveActive"
        class="reading-mode-hover-zones"
        aria-hidden="true"
      >
        <div
          class="reading-mode-hover-zone reading-mode-top-zone"
          @pointerenter="showRegion('nav')"
          @pointerleave="hideRegionSoon('nav')"
        />
        <div
          class="reading-mode-hover-zone reading-mode-sidebar-zone"
          @pointerenter="showRegion('sidebar')"
          @pointerleave="hideRegionSoon('sidebar')"
        />
        <div
          class="reading-mode-hover-zone reading-mode-aside-zone"
          @pointerenter="showRegion('aside')"
          @pointerleave="hideRegionSoon('aside')"
        />
      </div>
    </Teleport>
  </div>
</template>
```

- [ ] **Step 4: Run the behavior contract test**

Run:

```bash
npm run test:reading-mode
```

Expected: PASS, with 5 passing subtests.

- [ ] **Step 5: Commit the component behavior**

```bash
git add scripts/reading-mode.test.mjs docs/.vitepress/theme/components/ReadingModeControl.vue
git commit -m "feat: add reading mode behavior"
```

## Task 3: Reading Mode CSS And Build Verification

**Files:**
- Modify: `scripts/reading-mode.test.mjs`
- Modify: `docs/.vitepress/theme/style/reading-mode.css`

- [ ] **Step 1: Extend the contract test for CSS behavior**

Replace `scripts/reading-mode.test.mjs` with:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('reading mode control is mounted through the VitePress nav slot', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')

  assert.match(layout, /import ReadingModeControl from ['"]\.\/ReadingModeControl\.vue['"]/)
  assert.match(layout, /<template #nav-bar-content-after>\s*<ReadingModeControl\s*\/>\s*<\/template>/)
})

test('reading mode stylesheet is imported by the theme', () => {
  const css = read('docs/.vitepress/theme/style/index.css')

  assert.match(css, /@import ['"]\.\/reading-mode\.css['"];/)
})

test('package exposes a focused reading mode contract test', () => {
  const pkg = JSON.parse(read('package.json'))

  assert.equal(pkg.scripts['test:reading-mode'], 'node --test scripts/reading-mode.test.mjs')
})

test('ReadingModeControl owns route, frontmatter, viewport, and session-only state', () => {
  const source = read('docs/.vitepress/theme/components/ReadingModeControl.vue')

  assert.match(source, /useData\(\)/, 'component should read VitePress frontmatter and page data')
  assert.match(source, /useRoute\(\)/, 'component should react to route changes')
  assert.match(source, /readingMode\s*!==\s*false/, 'frontmatter should default to enabled and allow readingMode: false')
  assert.match(source, /route\.path\s*===\s*'\/'/, 'homepage should be handled explicitly')
  assert.match(source, /route\.path\s*===\s*'\/index\.html'/, 'index.html homepage route should be handled')
  assert.match(source, /matchMedia\('\(orientation: portrait\)'\)/, 'portrait orientation should disable the control')
  assert.match(source, /active\s*=\s*ref\(false\)/, 'reading state should be in-memory for refresh reset')
  assert.doesNotMatch(source, /localStorage|sessionStorage/, 'reading mode must not persist through refresh')
})

test('ReadingModeControl applies the agreed root classes and feedback messages', () => {
  const source = read('docs/.vitepress/theme/components/ReadingModeControl.vue')

  assert.match(source, /reading-mode-active/)
  assert.match(source, /reading-mode-nav-visible/)
  assert.match(source, /reading-mode-sidebar-visible/)
  assert.match(source, /reading-mode-aside-visible/)
  assert.match(source, /这里似乎没有可以隐藏的内容\.\.\./)
  assert.match(source, /本页未启用纯净阅读模式/)
  assert.match(source, /HIDE_DELAY_MS\s*=\s*300/, 'hover leave delay should be 0.3s')
  assert.match(source, /aria-pressed/)
  assert.match(source, /aria-label/)
  assert.match(source, /fill="currentColor"/, 'book icon should inherit nav color')
})

test('reading mode CSS hides portrait control and matches navbar glass styling', () => {
  const css = read('docs/.vitepress/theme/style/reading-mode.css')

  assert.match(css, /\.VPNavBar \.reading-mode-control/)
  assert.match(css, /--aya-nav-tab-bg/)
  assert.match(css, /--aya-nav-tab-border/)
  assert.match(css, /--aya-nav-tab-glass/)
  assert.match(css, /@media \(orientation: portrait\)[\s\S]*\.reading-mode-control/)
  assert.match(css, /\.reading-mode-control\.is-active/)
  assert.match(css, /var\(--vp-c-text-1\)/, 'active state should invert against text color')
  assert.match(css, /var\(--vp-c-bg\)/, 'active state should invert against page background')
  assert.match(css, /@keyframes readingModeShake/)
})

test('reading mode CSS fades full surfaces and keeps navbar shadow bound to navbar', () => {
  const css = read('docs/.vitepress/theme/style/reading-mode.css')

  assert.match(css, /html\.reading-mode-active \.VPNavBar\s*{[\s\S]*opacity:\s*0;/)
  assert.match(css, /html\.reading-mode-active\.reading-mode-nav-visible \.VPNavBar\s*{[\s\S]*opacity:\s*1;/)
  assert.match(css, /html\.reading-mode-active \.VPSidebar\s*{[\s\S]*opacity:\s*0;/)
  assert.match(css, /html\.reading-mode-active\.reading-mode-sidebar-visible \.VPSidebar\s*{[\s\S]*opacity:\s*1;/)
  assert.match(css, /html\.reading-mode-active \.VPDoc \.aside\s*{[\s\S]*opacity:\s*0;/)
  assert.match(css, /html\.reading-mode-active\.reading-mode-aside-visible \.VPDoc \.aside\s*{[\s\S]*opacity:\s*1;/)
  assert.doesNotMatch(css, /reading-mode-active[\s\S]{0,180}\.VPNavBar::before[\s\S]{0,120}opacity:\s*1/, 'navbar shadow should not be separately kept visible')
  assert.match(css, /\.reading-mode-top-zone/)
  assert.match(css, /\.reading-mode-sidebar-zone/)
  assert.match(css, /\.reading-mode-aside-zone/)
  assert.match(css, /prefers-reduced-motion: reduce/)
})
```

- [ ] **Step 2: Run the CSS contract test and verify it fails**

Run:

```bash
npm run test:reading-mode
```

Expected: FAIL in the CSS subtests, because `reading-mode.css` still contains only the skeleton rule.

- [ ] **Step 3: Replace `reading-mode.css` with the full style implementation**

Replace `docs/.vitepress/theme/style/reading-mode.css` with:

```css
:root {
  --aya-reading-mode-fade-duration: 0.24s;
  --aya-reading-mode-shift: 8px;
  --aya-reading-mode-toast-bg: rgb(28 34 42 / 86%);
  --aya-reading-mode-toast-text: #fff;
}

.VPNavBar .VPNavBarAppearance {
  order: 20;
}

.VPNavBar .reading-mode-control {
  order: 21;
}

.VPNavBar .VPNavBarSocialLinks {
  order: 22;
}

.VPNavBar .VPNavBarExtra {
  order: 23;
}

.VPNavBar .VPNavBarHamburger {
  order: 30;
}

.VPNavBar .reading-mode-control {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  color: var(--aya-nav-tab-text);
  transition:
    color 0.22s var(--ease-ios-fade),
    background-color 0.22s var(--ease-ios-fade),
    border-color 0.22s var(--ease-ios-fade),
    box-shadow 0.22s var(--ease-ios-fade),
    transform 0.22s var(--ease-ios-fade);
}

.VPNavBar .reading-mode-control::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: var(--aya-nav-tab-highlight);
  pointer-events: none;
}

.VPNavBar .reading-mode-control > * {
  position: relative;
  z-index: 1;
}

.reading-mode-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  color: inherit;
  background: transparent;
  cursor: pointer;
}

.reading-mode-button:hover {
  color: var(--vp-c-text-1);
  background: var(--aya-nav-tab-hover);
  backdrop-filter: var(--aya-nav-pill-glass);
  -webkit-backdrop-filter: var(--aya-nav-pill-glass);
}

.reading-mode-button:focus-visible {
  outline: 2px solid rgb(255 255 255 / 78%);
  outline-offset: 2px;
}

.reading-mode-icon {
  display: block;
  width: 18px;
  height: 18px;
  color: currentColor;
}

.reading-mode-icon path {
  fill: currentColor;
}

.VPNavBar .reading-mode-control.is-active {
  color: var(--vp-c-bg);
  border-color: color-mix(in srgb, var(--vp-c-text-1) 72%, transparent);
  background: var(--vp-c-text-1) !important;
  background-color: var(--vp-c-text-1) !important;
  box-shadow:
    var(--aya-nav-tab-feather-shadow),
    0 14px 32px rgb(0 0 0 / 16%);
}

.VPNavBar .reading-mode-control.is-active::after {
  background: linear-gradient(135deg, rgb(255 255 255 / 16%), rgb(255 255 255 / 0%));
}

.dark .VPNavBar .reading-mode-control.is-active {
  color: var(--vp-c-bg);
  background: var(--vp-c-text-1) !important;
  background-color: var(--vp-c-text-1) !important;
  box-shadow:
    var(--aya-nav-tab-feather-shadow),
    0 14px 32px rgb(0 0 0 / 34%);
}

.reading-mode-control.is-shaking {
  animation: readingModeShake 0.42s var(--ease-ios-press) both;
}

@keyframes readingModeShake {
  0%, 100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-3px);
  }
  40% {
    transform: translateX(3px);
  }
  60% {
    transform: translateX(-2px);
  }
  80% {
    transform: translateX(2px);
  }
}

.reading-mode-toast {
  position: fixed;
  z-index: 1000000;
  max-width: min(280px, calc(100vw - 32px));
  padding: 8px 12px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 12px;
  color: var(--aya-reading-mode-toast-text);
  background: var(--aya-reading-mode-toast-bg);
  box-shadow: 0 12px 30px rgb(0 0 0 / 18%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  font-size: 13px;
  line-height: 1.45;
  pointer-events: none;
  transform: translateY(0);
  animation: readingModeToastIn 0.2s var(--ease-ios-fade) both;
}

@keyframes readingModeToastIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.VPNavBar,
html:has(.VPDoc) .VPSidebar,
.VPDoc .aside {
  transition:
    opacity var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    transform var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    visibility 0s linear 0s;
}

html.reading-mode-active .VPNavBar {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(calc(-1 * var(--aya-reading-mode-shift)));
  transition:
    opacity var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    transform var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    visibility 0s linear var(--aya-reading-mode-fade-duration);
}

html.reading-mode-active.reading-mode-nav-visible .VPNavBar {
  z-index: 60;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
  transition-delay: 0s;
}

html.reading-mode-active .VPSidebar {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateX(calc(-1 * var(--aya-reading-mode-shift)));
  transition:
    opacity var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    transform var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    visibility 0s linear var(--aya-reading-mode-fade-duration);
}

html.reading-mode-active.reading-mode-sidebar-visible .VPSidebar {
  z-index: 50;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
  transition-delay: 0s;
}

html.reading-mode-active .VPDoc .aside {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateX(var(--aya-reading-mode-shift));
  transition:
    opacity var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    transform var(--aya-reading-mode-fade-duration) var(--ease-ios-fade),
    visibility 0s linear var(--aya-reading-mode-fade-duration);
}

html.reading-mode-active.reading-mode-aside-visible .VPDoc .aside {
  z-index: 45;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
  transition-delay: 0s;
}

.reading-mode-hover-zone {
  position: fixed;
  z-index: 40;
  background: transparent;
  pointer-events: auto;
}

.reading-mode-top-zone {
  inset: 0 0 auto 0;
  height: calc(var(--vp-nav-height) + 18px);
}

.reading-mode-sidebar-zone {
  top: var(--vp-nav-height);
  bottom: 0;
  left: 0;
  width: calc(var(--vp-sidebar-width, 272px) + 36px);
}

.reading-mode-aside-zone {
  top: var(--vp-nav-height);
  right: 0;
  bottom: 0;
  width: min(30vw, 340px);
}

@media (min-width: 768px) {
  .VPNavBar .reading-mode-control {
    height: 38px;
    padding: 0 4px;
    border: 1px solid var(--aya-nav-tab-border);
    border-radius: 999px;
    background: var(--aya-nav-tab-bg) !important;
    background-color: var(--aya-nav-tab-bg) !important;
    background-clip: padding-box;
    box-shadow:
      var(--aya-nav-tab-feather-shadow),
      var(--aya-nav-tab-shadow);
    backdrop-filter: var(--aya-nav-tab-glass) !important;
    -webkit-backdrop-filter: var(--aya-nav-tab-glass) !important;
  }
}

@media (max-width: 767px) {
  .VPNavBar .reading-mode-control {
    width: 34px;
    min-width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border: 1px solid var(--aya-nav-tab-border);
    border-radius: 999px;
    background: var(--aya-nav-tab-bg) !important;
    background-color: var(--aya-nav-tab-bg) !important;
    background-clip: padding-box;
    box-shadow:
      var(--aya-nav-tab-feather-shadow),
      0 10px 24px rgb(0 0 0 / 7%);
    backdrop-filter: var(--aya-nav-tab-glass) !important;
    -webkit-backdrop-filter: var(--aya-nav-tab-glass) !important;
  }

  .reading-mode-button {
    width: 32px;
    height: 32px;
  }

  .reading-mode-icon {
    width: 18px;
    height: 18px;
  }
}

@media (orientation: portrait) {
  .reading-mode-control {
    display: none !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .VPNavBar .reading-mode-control,
  .reading-mode-toast {
    background: var(--vp-c-bg-elv) !important;
    background-color: var(--vp-c-bg-elv) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .VPNavBar .reading-mode-control::after {
    content: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reading-mode-control.is-shaking,
  .reading-mode-toast {
    animation: none !important;
  }

  .VPNavBar,
  html:has(.VPDoc) .VPSidebar,
  .VPDoc .aside,
  html.reading-mode-active .VPNavBar,
  html.reading-mode-active .VPSidebar,
  html.reading-mode-active .VPDoc .aside {
    transition:
      opacity 0.08s linear,
      visibility 0s linear 0s !important;
    transform: none !important;
  }
}
```

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm run test:reading-mode
```

Expected: PASS, with 7 passing subtests.

- [ ] **Step 5: Run the production build**

Run:

```bash
npm run docs:build
```

Expected: PASS. The build may regenerate generated course preview assets if existing uncommitted EPMF content changes affect previews; do not stage unrelated generated or course-content changes unless they are caused by this task and reviewed separately.

- [ ] **Step 6: Commit the CSS implementation**

```bash
git add scripts/reading-mode.test.mjs docs/.vitepress/theme/style/reading-mode.css
git commit -m "feat: style reading mode surfaces"
```

## Final Verification Checklist

- [ ] `npm run test:reading-mode` passes.
- [ ] `npm run docs:build` passes.
- [ ] In landscape homepage, the button appears, shakes on click, and shows “这里似乎没有可以隐藏的内容...”.
- [ ] In landscape document pages, the button toggles reading mode.
- [ ] In reading mode, navbar, sidebar, and right outline fade out while the article stays in the same position.
- [ ] The navbar shadow band fades with `.VPNavBar`; no standalone top shadow remains.
- [ ] Moving the pointer to the top only reveals navbar.
- [ ] Moving the pointer to the left only reveals sidebar.
- [ ] Moving the pointer to the right only reveals the right outline.
- [ ] Leaving a revealed area hides it after about 0.3s.
- [ ] Navigating between supported document pages keeps reading mode active.
- [ ] Navigating to a `readingMode: false` page exits active mode; the button still shows and only displays the disabled-page message.
- [ ] Refreshing the page resets reading mode.
- [ ] Portrait orientation hides the button and exits reading mode.
- [ ] Light and dark themes both show a nav-matching inactive pill and a clearly inverted active pill.
