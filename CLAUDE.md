# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build / Dev Commands

```bash
npm run docs:dev       # Start dev server
npm run docs:build     # Production build
npm run docs:preview   # Preview production build
```

VitePress v2.0.0-alpha.16. Build output goes to `docs/.vitepress/dist/`.

External CSS: `animate.css` (pre-built animation library, imported in `index.ts`).

## Architecture

This is a **VitePress blog** for university engineering course notes (Chinese). Custom theme extends VitePress default — not a simple config override.

**Theme chain**: `index.ts` → `Layout.vue` → `MyLayout.vue` → wraps `DefaultTheme.Layout` with custom components via slots (`#layout-top`, `#doc-after`, `#home-hero-image`).

**CSS architecture** (`docs/.vitepress/theme/style/`):
- `var.css` — brand colors (`#98CBEA → #C2C7F8 → #F1DCE4`), VitePress CSS variable overrides, iOS animation easing curves and durations
- `rainbow.css` — `@property`-based gradient animation for hero title. Uses registered `<color>` custom properties so the browser interpolates directly (no 101-frame color-mix hack)
- `transitions.css` — all animation keyframes. Page crossfade via View Transitions API, button tap feedback, ripple, scroll reveal, search modal entrance
- `blur.css` — glassmorphism (backdrop-filter blur on nav, search, sidebar)
- `index.css` — imports all of the above + Google Fonts (Noto Sans SC for body, Noto Serif SC for headings), table/image centering, MathJax block display, custom `::: example` container styles

**`custom.css`** (imported directly in `index.ts`, NOT in `index.css`) — academic callout restyling for VitePress built-in containers (`info`, `tip`, `warning`, `danger`, `caution`, `important`, `note`, `details`, `definition`). Flattened rectangle with left accent border + right thin border, using VitePress semantic color variables. Definition uses custom orange (`--aya-c-definition-1`). Does NOT affect `::: example` / `::: stem` / `::: solution`.

**Named view-transition elements** (`transitions.css`): `.VPNavBar`, `.VPSidebar`, `.VPLocalNav` have `view-transition-name` set so they're excluded from the root crossfade snapshot — nav and sidebar stay visually stable during page transitions, only content area fades.

## Custom Markdown Infrastructure

**Math rendering** (in `config.mts`): MathJax 4 via `@mdit/plugin-mathjax`. Server-side SVG output. `$...$` and `$$...$$` delimiters. A custom `tex.packages` list excludes `bboldx` to avoid font variant errors. A `transformer` wraps output in `<span v-pre>` to prevent Vue hydration double-rendering.

**Custom containers** (in `config.mts`, self-contained `registerContainer` function — no external markdown-it-container dependency):
- `::: example [title]` / `::: stem` / `::: solution` — example/problem/solution blocks
- `::: definition [title]` — definition blocks

**Custom components** registered globally in `index.ts`:
- `Mycomponent` (Linkcard), `Confetti` (canvas-confetti), `MouseClick` (DOM ripple), `update`, `BackToTop`, `PageTransition`, `ScrollReveal`, `DocMeta` (word count / reading time)

Components usable in markdown must be registered in `enhanceApp` and placed in `MyLayout.vue` slots (or used inline in `.md` files).

**`solution-collapse.ts`** — client-side solution toggle with `localStorage` state persistence. Initialized via `setupSolutionCollapse(router)` in `enhanceApp`. Watches route changes, finds `.example-solution` elements, and attaches click handlers to `.solution-toggle` buttons.

## Page Transition System (V3.3)

`PageTransition.vue` intercepts internal link clicks on `capture` phase, calls `document.startViewTransition()`, navigates via `useRouter().go()`, and the browser crossfades between old/new snapshots. Zero dependencies. Duration: `--dur-page: 0.8s` (mobile: `0.55s`).

`ScrollReveal.vue` uses `IntersectionObserver` to add `reveal-visible` class to `[data-reveal]` elements on enter with staggered delay.

## Deploy Notes

- No framework build step needed beyond `npm run docs:build`
- `docs/superpowers/` and `docs/public/animation-tuner.html` are gitignored (dev artifacts, not deployed)
- `.superpowers/` is gitignored (Claude Code brainstorms)
- The site has a GitHub Actions workflow (`.github/`) that auto-deploys on push

## Writing Style

写正文内容（章节笔记、复习讲义、Ex 练习等）时，除非用户特别声明不需要，否则必须参考根目录 `WRITING-STYLE.md`。该文件定义了本项目的语言气质、禁用表达、标题/公式/容器/表格规范、章节模板和写作检查清单。
- 路径：`/Users/ayaskt/gp-blogs/WRITING-STYLE.md`
