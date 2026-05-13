# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Build / Dev Commands

```bash
npm run docs:dev       # Start dev server
npm run docs:build     # Production build
npm run docs:preview   # Preview production build
```

VitePress v2.0.0-alpha.16. Build output goes to `docs/.vitepress/dist/`.

## Architecture

This is a **VitePress blog** for university engineering course notes (Chinese). Custom theme extends VitePress default — not a simple config override.

**Theme chain**: `index.ts` → `Layout.vue` → `MyLayout.vue` → wraps `DefaultTheme.Layout` with custom components via slots (`#layout-top`, `#doc-after`, `#home-hero-image`).

**CSS architecture** (`docs/.vitepress/theme/style/`):
- `var.css` — brand colors (`#98CBEA → #C2C7F8 → #F1DCE4`), VitePress CSS variable overrides, iOS animation easing curves and durations
- `rainbow.css` — `@property`-based gradient animation for hero title. Uses registered `<color>` custom properties so the browser interpolates directly (no 101-frame color-mix hack)
- `transitions.css` — all animation keyframes. Page crossfade via View Transitions API, button tap feedback, ripple, scroll reveal, search modal entrance
- `blur.css` — glassmorphism (backdrop-filter blur on nav, search, sidebar)
- `index.css` — imports all of the above, plus table/image centering, MathJax block display, custom `::: example` / `::: definition` container styles

**Named view-transition elements** (`transitions.css`): `.VPNavBar`, `.VPSidebar`, `.VPLocalNav` have `view-transition-name` set so they're excluded from the root crossfade snapshot — nav and sidebar stay visually stable during page transitions, only content area fades.

## Custom Markdown Infrastructure

**Math rendering** (in `config.mts`): MathJax 4 via `@mdit/plugin-mathjax`. Server-side SVG output. `$...$` and `$$...$$` delimiters. A custom `tex.packages` list excludes `bboldx` to avoid font variant errors. A `transformer` wraps output in `<span v-pre>` to prevent Vue hydration double-rendering.

**Custom containers** (in `config.mts`, self-contained `registerContainer` function — no external markdown-it-container dependency):
- `::: example [title]` / `::: stem` / `::: solution` — example/problem/solution blocks
- `::: definition [title]` — definition blocks

**Custom components** registered globally in `index.ts`:
- `Mycomponent` (Linkcard), `Confetti` (canvas-confetti), `MouseClick` (DOM ripple), `update`, `BackToTop`, `PageTransition`, `ScrollReveal`

Components usable in markdown must be registered in `enhanceApp` and placed in `MyLayout.vue` slots (or used inline in `.md` files).

## Page Transition System (V3.3)

`PageTransition.vue` intercepts internal link clicks on `capture` phase, calls `document.startViewTransition()`, navigates via `useRouter().go()`, and the browser crossfades between old/new snapshots. Zero dependencies. Duration: `--dur-page: 0.8s` (mobile: `0.55s`).

`ScrollReveal.vue` uses `IntersectionObserver` to add `reveal-visible` class to `[data-reveal]` elements on enter with staggered delay.

## Deploy Notes

- No framework build step needed beyond `npm run docs:build`
- `docs/superpowers/` and `docs/public/animation-tuner.html` are gitignored (dev artifacts, not deployed)
- `.superpowers/` is gitignored (Codex brainstorms)
- The site has a GitHub Actions workflow (`.github/`) that auto-deploys on push
