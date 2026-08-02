# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build / Dev Commands

```bash
npm run docs:dev       # Start dev server
npm run docs:build     # Production build
npm run docs:preview   # Preview production build
```

VitePress v2.0.0-alpha.16. Build output goes to `docs/.vitepress/dist/`.

External CSS: local subsets of `animate.css` and AnimXYZ in `theme/vendor/` (only the animations the theme actually uses). Regenerate with `node scripts/generate-motion-css-subsets.mjs` after adding new animation names/tokens (allowlists are at the top of that script).

## Architecture

This is a **VitePress blog** for university engineering course notes (Chinese). Custom theme extends VitePress default.

**Theme chain**: `index.ts` → `Layout.vue` → `MyLayout.vue` → wraps `DefaultTheme.Layout` with custom components via slots (`#layout-top`, `#doc-after`, `#home-hero-image`, `#home-hero-info-after`).

`Layout.vue` provides the appearance toggle using View Transitions API with a circular clip-path reveal. `vt-appearance` class on `<html>` disables root crossfade during mode switch.

## CSS Architecture (`docs/.vitepress/theme/style/`)

- `var.css` — brand colors (`#98CBEA → #C2C7F8 → #F1DCE4`), VitePress CSS variable overrides, iOS animation easing curves/durations, hero button gradient
- `rainbow.css` — `@property`-based gradient animation for hero title
- `home-hero-gradient-data.css` — `@property` registration for `--color-stop-*` custom properties (used by `rainbow.css`)
- `transitions.css` — animation keyframes, View Transitions API rules for page crossfade, sidebar transitions (keep/switch), appearance toggle navbar animation (`fadeOutUp`/`fadeInDown`), button tap feedback, ripple, search modal entrance
- `blur.css` — glassmorphism for nav search, local search panel (full restyle with glass capsules)
- `nav-tabs.css` — SwiftUI-style glass capsules for desktop nav items (menu pills, search button, extra buttons, appearance/social at wide width). Includes flyout dropdown menu with glass blur, hamburger centering, mobile capsule styles. Border and shadow are slightly enhanced from defaults.
- `sidebar-window.css` — desktop sidebar as floating glass window (rounded squircle, scrollbar on left via `direction: rtl`, cross-browser thin scrollbar with `scrollbar-width: thin` + `::-webkit-scrollbar`). Active item uses brand blue tint with floating indicator pill. Mobile `VPNavScreen` restyled as floating window.
  - **The rounded window and the scroll container must stay separate elements.** Chromium squares off the corners on whichever side a non-overlay scrollbar sits (visible whenever macOS is set to always show scroll bars, e.g. with a mouse attached). So `.VPSidebar` is a non-scrolling flex frame that owns radius/border/shadow/backdrop-filter, and the inner `.nav` owns padding, `direction: rtl` and the scrollbar. `.VPNavScreen` / `.container` follow the same split.
  - Alignment: `left` is `--aya-sidebar-layout-offset + --aya-sidebar-gutter` (32px), which puts the left edge on the same line as the nav bar title and mirrors the right-hand outline margin; `top` matches the doc content top. Row indentation is owned by `.link`'s horizontal padding, so link-less group headings get the same padding added back — otherwise their text and caret stick out by 10px.
- `index.css` — imports all above + table/image centering, MathJax block display, custom `::: example/stem/solution` container styles, hero entrance animations, print styles. Google Fonts (Noto Sans SC body, Noto Serif SC headings) are loaded via `<link>` in `config.mts` head (with preconnect), not CSS `@import`.

**`custom.css`** (imported in `index.ts`, NOT in `index.css`) — academic callout restyling for VitePress built-in containers (`info`, `tip`, `warning`, `danger`, `caution`, `important`, `note`, `details`, `definition`). Flattened rectangle with left accent border. Does NOT affect `::: example` / `::: stem` / `::: solution`.

**Named view-transition elements** (`transitions.css`):
- `.VPNavBar`, `.VPLocalNav` — always static (old snapshot shown, new hidden)
- `.VPSidebar` — extracted for docs pages only (`html:has(.VPDoc)`). Same sidebar: old hidden, new shown (prevents backdrop-filter/shadow doubling). Switched sidebar: animated with `fadeInLeft`/`fadeOutLeft`.
- Appearance toggle: navbar uses `fadeOutUp`/`fadeInDown` from animate.css

## Sidebar Active Indicator (FLIP animation)

`PageTransition.vue` manages a floating `<div class="sidebar-active-indicator">` inside `.VPSidebar .nav`. On same-sidebar navigation, the indicator slides from old to new active item via CSS transitions (`left/top/width/height 0.38s`). On homepage→docs or sidebar switch, the indicator is positioned instantly inside `startViewTransition` callback (no animation, appears in same frame as `.is-active` text). Position is computed from `getBoundingClientRect()` against `.nav`'s padding-box origin, compensating for `clientLeft`/`clientTop` and scroll offset because `.nav` is itself the scroll container. A `MutationObserver` on `.VPSidebar` watches class changes (group expand/collapse) and a `ResizeObserver` on `.nav` and its groups catches late layout shifts (`document.fonts.ready` can resolve before the Google Fonts stylesheet registers its `@font-face` rules, which used to leave the pill stranded ~14px off). Resize updates are debounced.

## Custom Markdown Infrastructure

**Math rendering** (`config.mts`): MathJax 4 via `@mdit/plugin-mathjax`. Server-side SVG output. `$...$` and `$$...$$` delimiters. Custom `tex.packages` excludes `bboldx`. A `transformer` wraps output in `<span v-pre>` to prevent Vue hydration double-rendering.

**Custom containers** (in `config.mts`, self-contained `registerContainer` function):
- `::: example [title]` / `::: stem` / `::: solution` — example/problem/solution blocks
- `::: definition [title]` — definition blocks

**Custom components** registered globally in `index.ts`:
`Confetti`, `MouseClick` (DOM ripple), `BackToTop`, `PageTransition`, `DocMeta` (word count / reading time), `CourseIndex`, `LyricCard`, `LyricLine`, `LyricCover`, `SongCard`, `MindMap`

**`solution-collapse.ts`** — client-side solution toggle with `localStorage` state persistence. Initialized in `enhanceApp`.

## Customization Layer (`theme/custom/`)

User-facing customization entry points, all wired and empty by default. **Spec: root `CUSTOMIZATION.md`** — always consult/update it when touching interfaces.

- `custom/tokens.css` — token overrides, imported last in `index.ts` (highest priority)
- `custom/components.ts` — extra global markdown components (`customComponents` record)
- `custom/slots.ts` — mount components into any DefaultTheme layout slot (`customSlots`; theme-owned slots append after theme components, others pass through by dynamic slot name in `MyLayout.vue`)
- `custom/enhance.ts` — `customEnhanceApp(ctx)` hook, called at end of theme `enhanceApp`

`theme/motion-tokens.ts` — `readMotionDuration` / `readMotionEasing` read `--dur-*` / `--ease-*` tokens at runtime, so JS animations (`solution-collapse.ts`, `sidebar-motion.ts`, `outline-jump-motion.ts`) share CSS tokens (`--dur-solution`, `--dur-sidebar-collapse`, `--dur-outline-out/in`, etc. in `var.css`). New JS animation timings must go through tokens, never bare numbers.

Per-page frontmatter switches: `comments: false`, `backToTop: false`, `docMeta: false`, `pdf: false`, `author`.

## Navigation Active State

Course nav entries in `docs/.vitepress/config.mts` must highlight for the course README **and every note under the same directory, including nested subdirectories**. When adding or changing course nav links, set `activeMatch` to the course directory prefix, for example `^/Y3S2/CCD/`. Dropdown parents such as `第三学年` also need a parent-level `activeMatch` that aggregates all child course directories; otherwise README pages may highlight correctly while lecture pages do not.

## Page Transition System

`PageTransition.vue` intercepts internal link clicks, calls `document.startViewTransition()`, navigates via `useRouter().go()`. Three modes:
- **Same sidebar** (`vt-keep-sidebar`): content crossfades while sidebar stays static (old sidebar snapshot hidden, new shown). After transition, sidebar indicator slides to new active item.
- **Sidebar switch** (`vt-switch-sidebar`): old sidebar fades out left, new fades in left with stagger. Indicator is rebuilt and positioned instantly.
- **No sidebar change** (e.g. homepage → docs): default root crossfade. Indicator appears in new snapshot.

## Git Commit Workflow

**提交前必须更新 `CHANGELOG.md`。** 将新版本条目写在最上方，格式：

```markdown
## VX.Y.Z - YYYY-MM-DD

### 新增

- 每条以「-」开头，描述新增内容。无则写「暂无。」。

### 调整

- 描述现有功能的改动。

### 修复

- 描述 bug 修复。

### 删减

- 描述已移除的内容。
```

版本号遵循 Semantic Versioning（此项目大致以 `V主.次.修订` 递增）。提交信息标题写版本号（如 `V6.4.5`），正文由 changelog 条目概括。

## Deploy Notes

- No framework build step beyond `npm run docs:build`
- `docs/superpowers/` and `docs/public/animation-tuner.html` are gitignored
- `.superpowers/` is gitignored (Claude Code brainstorms)
- GitHub Actions workflow (`.github/`) auto-deploys on push

## Writing Style

写正文内容时，除非用户特别声明不需要，否则必须参考 `WRITING-STYLE.md`。该文件定义了语言气质、禁用表达、标题/公式/容器/表格规范、章节模板和写作检查清单。
