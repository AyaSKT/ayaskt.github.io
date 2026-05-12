# iOS Style Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add iOS-style non-linear CSS transitions (page switch, button tap, ripple, scroll reveal) to the VitePress blog with zero new dependencies.

**Architecture:** CSS-first with minimal Vue glue. CSS variables define easing curves and durations. A `PageTransition.vue` watcher hooks into VitePress router to dispatch transition classes on an overlay. Button tap is pure CSS. Ripple reuses existing MouseClick canvas with simplified DOM-based logic. Scroll reveal uses IntersectionObserver + CSS class toggle.

**Tech Stack:** VitePress, Vue 3, CSS custom properties, IntersectionObserver API

---

### Task 1: Add CSS variables to var.css

**Files:**
- Modify: `docs/.vitepress/theme/style/var.css`

- [ ] **Step 1: Add CSS custom properties for easing curves and durations**

Append to `docs/.vitepress/theme/style/var.css`:

```css
/* iOS 风格过渡变量 */
:root {
  --ease-ios-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-ios-slide:  cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-ios-fade:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-ios-press:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --dur-page: 0.45s;
  --dur-tap: 0.15s;
  --dur-ripple: 0.8s;
  --dur-reveal: 0.5s;
}
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/style/var.css
git commit -m "feat: add iOS animation CSS variables"
```

---

### Task 2: Create transitions.css with all keyframes and classes

**Files:**
- Create: `docs/.vitepress/theme/style/transitions.css`

- [ ] **Step 1: Create transitions.css**

Write `docs/.vitepress/theme/style/transitions.css`:

```css
/* ================================================================
   iOS Style Transitions — animations, keyframes, utility classes
   ================================================================ */

/* ---- Page Transition Overlay ---- */
.page-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background: var(--vp-c-bg, #fff);
  transform: translateY(110%);
}

/* Pop-in: Home → Content (slide up from bottom, spring) */
.page-transition-overlay.pop-in {
  animation: popIn var(--dur-page) var(--ease-ios-spring) forwards;
}

@keyframes popIn {
  0%   { transform: translateY(110%); }
  100% { transform: translateY(0); }
}

/* Pop-out: Content → Home (slide down to bottom, spring) */
.page-transition-overlay.pop-out {
  animation: popOut var(--dur-page) var(--ease-ios-spring) forwards;
}

@keyframes popOut {
  0%   { transform: translateY(0); }
  100% { transform: translateY(110%); }
}

/* Slide: Content → Content (slide from right, then away to left) */
.page-transition-overlay.slide {
  animation: slideIn var(--dur-page) var(--ease-ios-slide) forwards;
}

@keyframes slideIn {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(-100%); }
  100% { transform: translateX(-100%); }
}

/* Fade: fallback / quick nav */
.page-transition-overlay.fade {
  animation: fadeOverlay var(--dur-page) var(--ease-ios-fade) forwards;
}

@keyframes fadeOverlay {
  0%   { opacity: 0; transform: translateY(0); }
  50%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(0); }
}

/* ---- Button Tap Feedback ---- */
a, button, .VPNavBarMenuLink, .VPLink {
  transition: transform 0.5s var(--ease-ios-spring);
}

a:active, button:active, .VPNavBarMenuLink:active, .VPLink:active {
  transition: transform var(--dur-tap) var(--ease-ios-press);
  transform: scale(0.94);
}

/* ---- Ripple Effect ---- */
.ripple-ring {
  position: fixed;
  border-radius: 50%;
  border: 1.5px solid rgba(152, 203, 234, 0.5);
  pointer-events: none;
  z-index: 999998;
  transform: translate(-50%, -50%);
  animation: rippleExpand var(--dur-ripple) var(--ease-ios-fade) forwards;
}

@keyframes rippleExpand {
  0%   { width: 0; height: 0; opacity: 1; }
  100% { width: 200px; height: 200px; opacity: 0; }
}

/* ---- Scroll Reveal ---- */
.reveal-hidden {
  opacity: 0;
  transform: translateY(28px);
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity var(--dur-reveal) var(--ease-ios-fade),
    transform var(--dur-reveal) var(--ease-ios-slide);
}

/* ---- Mobile Optimization ---- */
@media (max-width: 768px) {
  :root {
    --dur-page: 0.35s;
    --dur-ripple: 0.6s;
    --dur-reveal: 0.4s;
  }

  @keyframes rippleExpand {
    0%   { width: 0; height: 0; opacity: 1; }
    100% { width: 140px; height: 140px; opacity: 0; }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/style/transitions.css
git commit -m "feat: add transitions.css with iOS keyframes and classes"
```

---

### Task 3: Import transitions.css in index.css

**Files:**
- Modify: `docs/.vitepress/theme/style/index.css`

- [ ] **Step 1: Add @import for transitions.css**

Prepend to `docs/.vitepress/theme/style/index.css` (before existing imports):

```css
@import './transitions.css';
```

Full beginning of the file will be:

```css
@import './transitions.css';
@import './blur.css';
@import './var.css';
@import './rainbow.css';
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/style/index.css
git commit -m "feat: import transitions.css into index.css"
```

---

### Task 4: Create PageTransition.vue

**Files:**
- Create: `docs/.vitepress/theme/components/PageTransition.vue`

- [ ] **Step 1: Write PageTransition.vue**

```vue
<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { useRouter } from 'vitepress'

const { route } = useRouter()
const transition = ref<'pop-in' | 'pop-out' | 'slide' | 'fade' | ''>('')
const visible = ref(false)

function classify(from: string, to: string): 'pop-in' | 'pop-out' | 'slide' | 'fade' {
  const isHome = (p: string) => p === '/' || p === '/index' || p === '/index.html' || p === ''
  const fromHome = isHome(from)
  const toHome = isHome(to)

  if (fromHome && !toHome) return 'pop-in'
  if (!fromHome && toHome) return 'pop-out'
  if (!fromHome && !toHome) return 'slide'
  return 'fade'
}

watch(
  () => route.path,
  (to, from) => {
    const type = classify(from, to)
    transition.value = type
    visible.value = true
    nextTick(() => {
      // Trigger removal after animation completes
      setTimeout(() => {
        visible.value = false
        transition.value = ''
      }, 450)
    })
  }
)
</script>

<template>
  <div
    v-if="visible"
    class="page-transition-overlay"
    :class="transition"
    aria-hidden="true"
  />
</template>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/PageTransition.vue
git commit -m "feat: add PageTransition route-based overlay component"
```

---

### Task 5: Create ScrollReveal.vue

**Files:**
- Create: `docs/.vitepress/theme/components/ScrollReveal.vue`

- [ ] **Step 1: Write ScrollReveal.vue**

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('reveal-visible')
          observer?.unobserve(el)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  // Observe all elements with data-reveal attribute
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    ;(el as HTMLElement).classList.add('reveal-hidden')
    ;(el as HTMLElement).style.setProperty('--reveal-i', String(i))
    ;(el as HTMLElement).style.transitionDelay = `calc(var(--reveal-i) * 60ms)`
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div style="display: none" />
</template>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/ScrollReveal.vue
git commit -m "feat: add ScrollReveal IntersectionObserver component"
```

---

### Task 6: Simplify MouseClick.vue ripple logic

**Files:**
- Modify: `docs/.vitepress/theme/components/MouseClick.vue`

- [ ] **Step 1: Replace canvas-based logic with DOM-based ripple**

Replace the entire file content:

```vue
<template>
  <div ref="rippleRoot" style="position: fixed; inset: 0; pointer-events: none; z-index: 999997" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const rippleRoot = ref<HTMLElement | null>(null)

function createRipple(x: number, y: number) {
  const ring = document.createElement('span')
  ring.className = 'ripple-ring'
  ring.style.left = x + 'px'
  ring.style.top = y + 'px'
  rippleRoot.value?.appendChild(ring)
  ring.addEventListener('animationend', () => ring.remove())
}

function handleClick(e: MouseEvent | TouchEvent) {
  const x = 'touches' in e ? e.touches[0].clientX : e.clientX
  const y = 'touches' in e ? e.touches[0].clientY : e.clientY
  createRipple(x, y)
}

onMounted(() => {
  window.addEventListener('click', handleClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClick)
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/MouseClick.vue
git commit -m "refactor: simplify MouseClick to DOM-based ripple"
```

---

### Task 7: Update MyLayout.vue to use PageTransition

**Files:**
- Modify: `docs/.vitepress/theme/components/MyLayout.vue`

- [ ] **Step 1: Import and add PageTransition to MyLayout**

Add the import and component in the template. In the script section, add the import:

```typescript
import PageTransition from './PageTransition.vue'
```

In the template, add `<PageTransition />` inside `<DefaultTheme.Layout>` (before `<MouseClick />`):

```vue
<DefaultTheme.Layout>
  <template #layout-top>
    <PageTransition />
    <MouseClick />
  </template>
  ...
```

Full file after changes:

```vue
<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData } from 'vitepress'
import MouseClick from './MouseClick.vue'
import GiscusComment from './GiscusComment.vue'
import BackToTop from './backtotop.vue'
import HeroHitokoto from './HeroHitokoto.vue'
import PageTransition from './PageTransition.vue'

const { frontmatter, isDark } = useData()

const heroImageData = computed(() => {
  const hero = (frontmatter.value as any)?.hero
  return hero?.image ?? null
})

const heroImageSrc = computed(() => {
  const image = heroImageData.value
  if (!image) return ''
  if (typeof image === 'string') return image
  if (image.src) return image.src
  if (image.light || image.dark) {
    return isDark.value ? (image.dark ?? image.light ?? '') : (image.light ?? image.dark ?? '')
  }
  return ''
})

const heroImageWidth = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.width : undefined
})

const heroImageHeight = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.height : undefined
})

const heroImageStyle = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.style : undefined
})

const heroImageLink = computed(() => {
  const image = heroImageData.value
  return image && typeof image === 'object' ? image.link : undefined
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <PageTransition />
      <MouseClick />
    </template>

    <template #doc-after>
      <GiscusComment />
      <BackToTop />
    </template>

    <template #home-hero-image>
      <a v-if="heroImageSrc && heroImageLink" :href="heroImageLink" target="_blank" rel="noopener noreferrer">
        <img
          class="image-src hero-image-src"
          :src="heroImageSrc"
          :width="heroImageWidth"
          :height="heroImageHeight"
          :style="heroImageStyle"
        >
      </a>
      <img
        v-else-if="heroImageSrc"
        class="image-src hero-image-src"
        :src="heroImageSrc"
        :width="heroImageWidth"
        :height="heroImageHeight"
        :style="heroImageStyle"
      >
      <HeroHitokoto />
    </template>
  </DefaultTheme.Layout>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/MyLayout.vue
git commit -m "feat: wire PageTransition into MyLayout"
```

---

### Task 8: Register new components in index.ts

**Files:**
- Modify: `docs/.vitepress/theme/index.ts`

- [ ] **Step 1: Import and register PageTransition and ScrollReveal**

Add imports:

```typescript
import PageTransition from './components/PageTransition.vue'
import ScrollReveal from './components/ScrollReveal.vue'
```

Add component registrations:

```typescript
app.component('PageTransition', PageTransition)
app.component('ScrollReveal', ScrollReveal)
```

Full file after changes:

```typescript
import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import './style/index.css'

import MouseClick from './components/MouseClick.vue'

import Mycomponent from './components/Linkcard.vue'
import Confetti from './components/confetti.vue'
let homePageStyle: HTMLStyleElement | undefined

import update from "./components/update.vue"

import MyLayout from './components/MyLayout.vue'
import BackToTop from './components/backtotop.vue'
import PageTransition from './components/PageTransition.vue'
import ScrollReveal from './components/ScrollReveal.vue'

export default {
  enhanceApp({app , router }) {
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

    app.component('Mycomponent' , Mycomponent)
    app.component('Confetti' , Confetti)
    app.component('MouseClick' , MouseClick)
    app.component('update' , update)
    app.component('BackToTop', BackToTop)
    app.component('PageTransition', PageTransition)
    app.component('ScrollReveal', ScrollReveal)
  },

  extends: DefaultTheme,
  Layout: Layout,
}

function updateHomePageStyle(value: boolean) {
    if (value) {
      if (homePageStyle) return

      homePageStyle = document.createElement('style')
      homePageStyle.innerHTML = `
      :root {
        animation: rainbow 12s linear infinite;
      }`
      document.body.appendChild(homePageStyle)
    } else {
      if (!homePageStyle) return

      homePageStyle.remove()
      homePageStyle = undefined
    }
  }
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/index.ts
git commit -m "feat: register PageTransition and ScrollReveal components"
```

---

### Task 9: Verify on dev server

**Files:** (none — verification only)

- [ ] **Step 1: Start dev server**

```bash
cd /Users/ayaskt/gp-blogs && npm run docs:dev
```

Open the local URL in browser.

- [ ] **Step 2: Test page transitions**

Navigate between:
- Home → any content page (should see pop-in overlay)
- Content page → Home (should see pop-out overlay)
- Content → another content page via sidebar (should see slide overlay)

- [ ] **Step 3: Test button tap feedback**

Click buttons and links. Verify they scale down on press and spring back on release.

- [ ] **Step 4: Test ripple effect**

Click anywhere on the page. Verify a single ripple ring expands and fades from the click point.

- [ ] **Step 5: Test scroll reveal**

Scroll through a content page with `data-reveal` elements. Verify they fade in and slide up as they enter the viewport.

---

### Task 10: Mobile optimization verification

**Files:** (none — verification only)

- [ ] **Step 1: Test on mobile viewport**

Open Chrome DevTools, toggle device toolbar, select a mobile device (iPhone 14 Pro).

- [ ] **Step 2: Verify**

- Animations play smoothly at 60 FPS (use Performance tab)
- Duration is reduced on mobile (`--dur-page: 0.35s` vs `0.45s`)
- Ripple size is smaller on mobile
- No layout thrashing or jank
