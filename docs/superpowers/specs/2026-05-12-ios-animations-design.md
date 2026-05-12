# iOS Style Animations — Design Spec

**Date**: 2026-05-12
**Status**: Approved

## Overview

Add iOS-style non-linear CSS transition effects to the VitePress blog, covering page transitions, micro-interactions, and scroll reveals. Zero new dependencies; all animations CSS-first with minimal JS (~40 lines).

## Architecture

```
docs/.vitepress/theme/
├── style/
│   ├── index.css          ← add @import './transitions.css'
│   ├── transitions.css    ← 🆕 all transition keyframes & classes
│   ├── var.css            ← add easing/duration CSS variables
│   └── (others unchanged)
├── components/
│   ├── PageTransition.vue ← 🆕 route watcher, dispatches animation class
│   └── ScrollReveal.vue   ← 🆕 IntersectionObserver + CSS class toggle
└── index.ts               ← register new components
```

## Animation Types

### Page Transitions (PageTransition.vue)

Listens to `useRouter()` route changes. On navigation, adds one of three CSS classes to the content wrapper. Animation fires after `nextTick` to avoid flash.

| Navigation | Animation | CSS |
|---|---|---|
| Home → Content | Spring pop-in | `scale(0.8) → scale(1)`, `opacity 0 → 1`, spring easing |
| Content → Home | Spring pop-out | reverse: `scale(1) → scale(0.95)`, cross-fade |
| Content → Content | Slide | `translateX(30px) → 0`, cross-fade |
| Sidebar / Search | Fade | `opacity` transition only |

### Button Tap Feedback (CSS only, in transitions.css)

- Press (`:active`): `scale(0.94)`, 0.15s, press easing
- Release: spring-back to `scale(1)`, 0.5s, spring easing
- Applied to: `a`, `button`, `.VPNavBarMenuLink`, `.VPLink`, `.VPButton`

### Ripple Effect

Reuse and simplify existing `MouseClick.vue`. Click creates a `<span>` at pointer position, CSS `@keyframes` expands and fades it, removed on `animationend`.

### Scroll Reveal (ScrollReveal.vue)

`IntersectionObserver` watches elements with `data-reveal` attribute. On enter: adds `reveal-visible` class. Stagger via `transition-delay: calc(var(--i) * 60ms)`.

## CSS Variables (add to var.css)

```css
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

## Optimization

- Zero npm dependencies added
- All animations on compositor thread (CSS transform + opacity only)
- Mobile: reduce duration via `@media (max-width: 768px)`
- `will-change` set only during active animation, removed after
- No `prefers-reduced-motion` handling (personal site, user choice)
- Ripple JS reuses existing MouseClick logic (~20 lines net new)
- Estimated total: ~120 lines CSS + ~40 lines JS, ~2 KB uncompressed

## Files Changed

1. `docs/.vitepress/theme/style/var.css` — add CSS variables
2. `docs/.vitepress/theme/style/transitions.css` — **new**, all animation keyframes/classes
3. `docs/.vitepress/theme/style/index.css` — add `@import './transitions.css'`
4. `docs/.vitepress/theme/components/PageTransition.vue` — **new**, route-based transition dispatcher
5. `docs/.vitepress/theme/components/ScrollReveal.vue` — **new**, IntersectionObserver reveal
6. `docs/.vitepress/theme/components/MouseClick.vue` — simplify ripple logic
7. `docs/.vitepress/theme/components/MyLayout.vue` — wrap with PageTransition
8. `docs/.vitepress/theme/index.ts` — register new components
