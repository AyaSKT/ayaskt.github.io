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
- `Confetti` (canvas-confetti), `MouseClick` (DOM ripple), `BackToTop`, `PageTransition`, `DocMeta`, `CourseIndex`, `LyricCard`, `LyricLine`, `LyricCover`, `SongCard`, `MindMap`

Components usable in markdown must be registered in `enhanceApp` and placed in `MyLayout.vue` slots (or used inline in `.md` files).

## Standard Doc Lyric Blocks

### LyricCard / LyricLine

Use `LyricCard` for note-home cover text, epigraphs, song metadata, and lyric excerpts. Despite the component name, it should read as an inline lyric block that belongs to the document body: no visible card surface, no border, no shadow, no backdrop blur, and no hover lift. The lyric text is the main body. Music links sit at the lower-left corner as bare SVG icons and stay hidden until the lyric block is hovered or focused; title and artist sit at the lower-right corner, right-aligned. The whole lyric block is **not** a link. Only the small music icons may navigate.

Use it directly in markdown as HTML/Vue:

```html
<LyricCard
  title="再下一场太阳雨吧"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  qq-url="https://y.qq.com/"
  netease-url="https://music.163.com/"
>
  <LyricLine
    original="雨上(あめあ)がりの空(そら)"
    translation="雨后的天空"
  />
</LyricCard>
```

`LyricCard` props:
- `title`: required work title.
- `artist`: optional author, singer, or group.
- `lang`: title language. Built-in title styling covers `zh`, `ja`, `en`, `ru`, `fr`, `de`, `es`, `it`, `pt`, and related Slavic languages.
- `title-style`: override automatic title punctuation. Supported values: `auto`, `plain`, `italic`, `cn-book`, `ja-kagi`, `ja-double-kagi`, `guillemet`, `french-guillemet`, `double-quote`, `single-quote`, `german-quote`.
- `title-prefix` / `title-suffix`: exact manual title marks when built-in styles are not enough.
- `qq-url` / `netease-url`: optional music links. They render small lower-left bare SVG icons using `/icons/qq-music.svg` and `/icons/wangyiyun.svg`, and do not make the lyric block clickable. `qq` and `netease` are short aliases.
- `default-furigana`: initially show Japanese ruby text, but allow manual toggling.
- `force-furigana`: always show Japanese ruby text.
- `furigana`: `auto`, `open`, `show`, `hide`, or `none`. `show` forces display; `none` hides the button.

`LyricLine` props:
- `original`: original lyric text. It uses Noto Serif and supports ruby shorthand. Japanese lyric blocks must prefer `Noto Serif CJK JP` / `Noto Serif JP`; Chinese lyric blocks must prefer `Noto Serif CJK SC` / `Noto Serif SC` so Han glyphs render correctly.
- `translation`: translated text. It is one size smaller than the original and always uses the SC font stack (`Noto Serif CJK SC` / `Noto Serif SC`) so Chinese glyphs do not inherit Japanese forms.
- `translation-lang`: optional language tag for the translation line. Default is `zh-CN`, which also prevents Japanese lyric blocks from passing `lang="ja"` down into Chinese translations.

Japanese ruby shorthand:
- `漢字(かな)` becomes `<ruby>漢字<rt>かな</rt></ruby>`.
- Use `｜` to mark an exact base when the preceding text is ambiguous, for example `愛しい｜時間(じかん)`.
- For complex cases, write native `<ruby>` inside `LyricLine` instead of using the `original` prop.

Automatic title style defaults:
- `zh`: `《标题》`
- `ja`: `「タイトル」`
- `en`: italic title
- `ru`, `uk`, `bg`, `sr`: `«标题»`
- `fr`: `« 标题 »`
- `de`: `„Titel“`
- `es`, `it`, `pt`: `«标题»`

Keep lyric excerpts short in committed docs. Do not paste long copyrighted lyrics.

## Customization Layer (`theme/custom/`)

User-facing customization entry points, wired and empty by default. **Spec: root `CUSTOMIZATION.md`** — consult/update it whenever interfaces change.

- `custom/tokens.css` — design/motion token overrides, imported last (highest priority)
- `custom/components.ts` — extra global markdown components
- `custom/slots.ts` — mount components into any DefaultTheme layout slot (theme-owned slots append, others pass through dynamically in `MyLayout.vue`)
- `custom/enhance.ts` — `customEnhanceApp(ctx)` hook at end of theme `enhanceApp`

`theme/motion-tokens.ts` reads `--dur-*` / `--ease-*` CSS tokens at runtime for JS animations. New JS animation timings must go through tokens declared in `var.css`, never bare numbers. Per-page frontmatter switches: `comments: false`, `backToTop: false`, `docMeta: false`, `pdf: false`, `author`.

## Navigation Active State

Course nav entries in `docs/.vitepress/config.mts` must highlight for the course README **and every note under the same directory, including nested subdirectories**. When adding or changing course nav links, set `activeMatch` to the course directory prefix, for example `^/Y3S2/CCD/`. Dropdown parents such as `第三学年` also need a parent-level `activeMatch` that aggregates all child course directories; otherwise README pages may highlight correctly while lecture pages do not.

## Page Transition System (V3.3)

`PageTransition.vue` intercepts internal link clicks on `capture` phase, calls `document.startViewTransition()`, navigates via `useRouter().go()`, and the browser crossfades between old/new snapshots. Zero dependencies. Duration: `--dur-page: 0.8s` (mobile: `0.55s`).


## Deploy Notes

- No framework build step needed beyond `npm run docs:build`
- `docs/superpowers/` and `docs/public/animation-tuner.html` are gitignored (dev artifacts, not deployed)
- `.superpowers/` is gitignored (Codex brainstorms)
- The site has a GitHub Actions workflow (`.github/`) that auto-deploys on push
