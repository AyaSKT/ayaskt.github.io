# Frosted Surface Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's liquid/reflection glass code with a unified flat frosted surface system while preserving current shadows, blur, layout, and interactions.

**Architecture:** Add a focused `surface.css` token layer, then migrate global frame surfaces before touching content components. Keep existing component structures and behavior; only change material variables, reflection pseudo-elements, and tests that encode the old glass vocabulary.

**Tech Stack:** VitePress v2, Vue 3 single-file components, CSS custom properties, Node's built-in test runner.

---

## File Structure

- Create: `docs/.vitepress/theme/style/surface.css`
  - Owns global flat frosted surface tokens: backgrounds, borders, blur strengths, text colors, marks, inverse surfaces, and shared shadow aliases.
- Create: `scripts/frosted-surface.test.mjs`
  - Contract test for the new material vocabulary and reflection cleanup.
- Modify: `package.json`
  - Adds `test:frosted-surface`.
- Modify: `docs/.vitepress/theme/style/index.css`
  - Imports `surface.css` before current material consumers.
- Modify: `docs/.vitepress/theme/style/blur.css`
  - Removes public `liquid` search variables, keeps search/card/nav-shadow behavior on flat surface tokens.
- Modify: `docs/.vitepress/theme/style/nav-tabs.css`
  - Renames global nav material variables away from `glass` / `highlight`, deletes reflection pseudo-elements.
- Modify: `docs/.vitepress/theme/style/sidebar-window.css`
  - Renames sidebar blur variables and maps sidebar surfaces to flat surface tokens.
- Modify: `docs/.vitepress/theme/style/reading-mode.css`
  - Keeps reading-mode behavior, changes nav-control material variables, removes reflection layer, updates comments.
- Modify: `docs/.vitepress/theme/style/transitions.css`
  - Updates comments only; no behavior change.
- Modify: `docs/.vitepress/theme/components/MindMap.vue`
  - Removes pill/menu highlight variables and reflection pseudo-elements.
- Modify: `docs/.vitepress/theme/components/CourseIndex.vue`
  - Removes card highlight layer while preserving card shadows and hover depth.
- Modify: `docs/.vitepress/theme/components/SongCard.vue`
  - Removes song-card highlight layer while preserving shadows and player behavior.
- Modify: `docs/.vitepress/theme/components/MathCopy.vue`
  - Uses the inverse flat frosted surface token for the copy toast.
- Modify: `scripts/reading-mode.test.mjs`
  - Updates assertions from `glass` variable names to flat frosted variable names while preserving live blur invariants.

---

### Task 1: Add Surface Tokens And Contract Test

**Files:**
- Create: `scripts/frosted-surface.test.mjs`
- Create: `docs/.vitepress/theme/style/surface.css`
- Modify: `package.json`
- Modify: `docs/.vitepress/theme/style/index.css`

- [ ] **Step 1: Add the failing frosted-surface contract test**

Create `scripts/frosted-surface.test.mjs`:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('theme imports flat surface tokens before material consumers', () => {
  const css = read('docs/.vitepress/theme/style/index.css')
  const surfaceImport = css.indexOf("@import './surface.css';")
  const blurImport = css.indexOf("@import './blur.css';")
  const navImport = css.indexOf("@import './nav-tabs.css';")

  assert.notEqual(surfaceImport, -1, 'index.css should import surface.css')
  assert.ok(surfaceImport < blurImport, 'surface tokens should load before blur.css')
  assert.ok(surfaceImport < navImport, 'surface tokens should load before nav-tabs.css')
})

test('surface token file uses flat frosted vocabulary', () => {
  const css = read('docs/.vitepress/theme/style/surface.css')

  for (const token of [
    '--aya-surface-bg',
    '--aya-surface-bg-strong',
    '--aya-surface-bg-soft',
    '--aya-surface-bg-hover',
    '--aya-surface-bg-active',
    '--aya-surface-border',
    '--aya-frosted-blur-lg',
    '--aya-frosted-blur-md',
    '--aya-frosted-blur-sm',
    '--aya-shadow-card-feather',
    '--aya-shadow-card-depth',
    '--aya-shadow-nav',
    '--aya-shadow-menu',
    '--aya-shadow-sidebar-window',
    '--aya-search-mark-bg',
    '--aya-surface-inverse-bg',
  ]) {
    assert.match(css, new RegExp(token), `${token} should be defined`)
  }

  assert.doesNotMatch(css, /liquid|glass|highlight/i, 'surface.css should not use old material vocabulary')
  assert.doesNotMatch(css, /linear-gradient\(135deg,\s*rgb\(255 255 255/i, 'surface.css should not define directional white reflection layers')
})

test('global material styles no longer expose old reflection tokens', () => {
  const files = [
    'docs/.vitepress/theme/style/blur.css',
    'docs/.vitepress/theme/style/nav-tabs.css',
    'docs/.vitepress/theme/style/sidebar-window.css',
    'docs/.vitepress/theme/style/reading-mode.css',
  ]

  for (const file of files) {
    const source = read(file)
    assert.doesNotMatch(source, /--aya-[\w-]*(?:liquid|glass|highlight)[\w-]*/i, `${file} should not define or consume old material token names`)
    assert.doesNotMatch(source, /linear-gradient\(135deg,\s*rgb\(255 255 255/i, `${file} should not contain directional white reflection gradients`)
  }
})

test('content component surfaces no longer use reflection variables', () => {
  const files = [
    'docs/.vitepress/theme/components/MindMap.vue',
    'docs/.vitepress/theme/components/CourseIndex.vue',
    'docs/.vitepress/theme/components/SongCard.vue',
  ]

  for (const file of files) {
    const source = read(file)
    assert.doesNotMatch(source, /--(?:mind-map|course-index|song-card)-[\w-]*highlight/i, `${file} should not use highlight variables for surface reflection`)
    assert.doesNotMatch(source, /linear-gradient\(135deg,\s*rgb\(255 255 255/i, `${file} should not contain directional white reflection gradients`)
  }
})

test('reading mode keeps the live frosted navbar behavior', () => {
  const css = read('docs/.vitepress/theme/style/reading-mode.css')

  assert.match(css, /html\.reading-mode-active \.VPNavBar\s*{[\s\S]*opacity:\s*0\.001;/)
  assert.match(css, /html\.reading-mode-active \.VPNavBar\s*{[\s\S]*visibility:\s*visible;/)
  assert.match(css, /will-change:\s*backdrop-filter, opacity;/)
  assert.match(css, /html\.reading-mode-nav-visible \.reading-mode-top-zone,[\s\S]*pointer-events:\s*none;/)
})
```

- [ ] **Step 2: Add the package script**

Modify `package.json` inside `"scripts"`:

```json
"test:frosted-surface": "node --test scripts/frosted-surface.test.mjs"
```

Keep the existing `test:reading-mode` script unchanged.

- [ ] **Step 3: Run the new test and confirm it fails**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL because `docs/.vitepress/theme/style/surface.css` does not exist and old material tokens still exist.

- [ ] **Step 4: Create the flat surface token file**

Create `docs/.vitepress/theme/style/surface.css`:

```css
/* Flat frosted surface tokens: blur, tint, border, and shadow without directional reflection. */
:root {
  --aya-surface-bg: rgb(255 255 255 / 26%);
  --aya-surface-bg-strong: rgb(255 255 255 / 64%);
  --aya-surface-bg-soft: rgb(255 255 255 / 34%);
  --aya-surface-bg-hover: rgb(255 255 255 / 18%);
  --aya-surface-bg-active: rgb(152 203 234 / 20%);
  --aya-surface-border: rgb(255 255 255 / 54%);
  --aya-surface-border-soft: rgb(152 203 234 / 30%);
  --aya-surface-text: rgb(56 69 83 / 70%);
  --aya-surface-text-strong: rgb(42 53 65 / 88%);
  --aya-surface-selected: #405769;
  --aya-surface-inverse-bg: rgb(28 34 42 / 86%);
  --aya-surface-inverse-text: #fff;

  --aya-frosted-blur-lg: blur(24px);
  --aya-frosted-blur-md: blur(14px);
  --aya-frosted-blur-sm: blur(10px);
  --aya-frosted-blur-panel: blur(30px);
  --aya-frosted-blur-backdrop: blur(4px);

  --aya-shadow-nav: 0 12px 28px rgb(0 0 0 / 7%);
  --aya-shadow-nav-feather: 0 0 14px 4px rgb(0 0 0 / 4%);
  --aya-shadow-pill-feather: 0 0 12px 3px rgb(0 0 0 / 3.5%);
  --aya-shadow-menu: 0 22px 54px rgb(0 0 0 / 9%);
  --aya-shadow-menu-feather: 0 0 26px 8px rgb(0 0 0 / 7%);
  --aya-shadow-card-feather: 0 0 14px 4px rgb(0 0 0 / 3.5%);
  --aya-shadow-card-depth: 0 14px 34px rgb(92 102 114 / 15%);
  --aya-shadow-sidebar-window: 0 18px 42px rgb(92 102 114 / 18%);
  --aya-shadow-search-panel: 0 34px 90px rgb(54 87 113 / 18%);
  --aya-shadow-search-control: 0 14px 34px rgb(54 87 113 / 13%);
  --aya-shadow-search-result: 0 8px 18px rgb(54 87 113 / 7%);

  --aya-search-backdrop-bg: rgb(247 250 253 / 10%);
  --aya-search-text-soft: rgb(61 72 85 / 72%);
  --aya-search-mark-bg: rgb(152 203 234 / 68%);
  --aya-search-mark-text: #1d4258;

  --aya-nav-shadow-band-height: calc(var(--vp-nav-height, 64px) + 14px);
  --aya-nav-shadow-band-bg: linear-gradient(
    to bottom,
    rgb(74 83 96 / 14%) 0%,
    rgb(74 83 96 / 9%) 38%,
    rgb(74 83 96 / 4%) 68%,
    rgb(74 83 96 / 0%) 100%
  );
}

.dark {
  --aya-surface-bg: rgb(9 13 20 / 48%);
  --aya-surface-bg-strong: rgb(18 24 34 / 62%);
  --aya-surface-bg-soft: rgb(255 255 255 / 8%);
  --aya-surface-bg-hover: rgb(255 255 255 / 7%);
  --aya-surface-bg-active: rgb(152 203 234 / 14%);
  --aya-surface-border: rgb(255 255 255 / 18%);
  --aya-surface-border-soft: rgb(152 203 234 / 24%);
  --aya-surface-text: rgb(223 232 244 / 68%);
  --aya-surface-text-strong: rgb(247 250 255 / 88%);
  --aya-surface-selected: #f8fbff;
  --aya-surface-inverse-bg: rgb(17 24 35 / 92%);
  --aya-surface-inverse-text: #fff;

  --aya-shadow-nav: 0 14px 32px rgb(0 0 0 / 30%);
  --aya-shadow-nav-feather: 0 0 16px 4px rgb(0 0 0 / 16%);
  --aya-shadow-pill-feather: 0 0 12px 3px rgb(0 0 0 / 12%);
  --aya-shadow-menu: 0 22px 54px rgb(0 0 0 / 34%);
  --aya-shadow-menu-feather: 0 0 26px 8px rgb(0 0 0 / 22%);
  --aya-shadow-card-feather: 0 0 16px 5px rgb(0 0 0 / 16%);
  --aya-shadow-card-depth: 0 14px 36px rgb(0 0 0 / 36%);
  --aya-shadow-sidebar-window: 0 18px 44px rgb(0 0 0 / 42%);
  --aya-shadow-search-panel: 0 34px 90px rgb(0 0 0 / 42%);
  --aya-shadow-search-control: 0 14px 34px rgb(0 0 0 / 24%);
  --aya-shadow-search-result: 0 8px 18px rgb(0 0 0 / 18%);

  --aya-search-backdrop-bg: rgb(5 9 14 / 22%);
  --aya-search-text-soft: rgb(220 230 242 / 72%);
  --aya-search-mark-bg: rgb(152 203 234 / 54%);
  --aya-search-mark-text: #eef8ff;

  --aya-nav-shadow-band-bg: linear-gradient(
    to bottom,
    rgb(152 160 172 / 12%) 0%,
    rgb(152 160 172 / 7%) 38%,
    rgb(152 160 172 / 3%) 68%,
    rgb(152 160 172 / 0%) 100%
  );
}
```

- [ ] **Step 5: Import the token file before consumers**

Modify `docs/.vitepress/theme/style/index.css` so the import block contains:

```css
@import './transitions.css';
@import './library-motion.css';
@import './surface.css';
@import './blur.css';
@import './var.css';
@import './rainbow.css';
@import './nav-tabs.css';
@import './sidebar-window.css';
@import './reading-mode.css';
```

- [ ] **Step 6: Run the focused test and confirm the expected remaining failures**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL only on old token names or reflection gradients in the existing style/component files. The import and token-definition assertions should pass.

- [ ] **Step 7: Commit the token scaffold and failing contract**

Run:

```bash
git add package.json scripts/frosted-surface.test.mjs docs/.vitepress/theme/style/index.css docs/.vitepress/theme/style/surface.css
git commit -m "test: add frosted surface contract"
```

---

### Task 2: Migrate Search, Card, And Shared Blur Styles

**Files:**
- Modify: `docs/.vitepress/theme/style/blur.css`
- Test: `scripts/frosted-surface.test.mjs`

- [ ] **Step 1: Replace the old public variable block in `blur.css`**

At the top of `docs/.vitepress/theme/style/blur.css`, replace the `:root` variable definitions for `--aya-liquid-search-*`, `--aya-card-*`, and `--aya-nav-shadow-band-*` with aliases to the new surface tokens:

```css
/* Search, feature card, local nav, and navbar-shadow surfaces. */
:root {
    --aya-card-feather: var(--aya-shadow-card-feather);
    --aya-card-shadow: var(--aya-shadow-card-depth);
    --aya-card-border: var(--aya-surface-border);

    .VPNavBar,
    .VPNavBar.screen-open {
        border-bottom: none !important;
    }
```

Do not reintroduce any `--aya-liquid-*` variable in this file.

- [ ] **Step 2: Replace local search variables with surface tokens**

In `.VPLocalSearchBox[aria-expanded="true"]`, replace the old local-search variable assignments with:

```css
.VPLocalSearchBox[aria-expanded="true"] {
    --vp-local-search-bg: transparent;
    --vp-local-search-result-bg: transparent;
    --vp-local-search-result-border: transparent;
    --vp-local-search-result-selected-bg: transparent;
    --vp-local-search-result-selected-border: color-mix(in srgb, var(--vp-c-brand-1) 78%, transparent);
    --vp-local-search-highlight-bg: var(--aya-search-mark-bg);
    --vp-local-search-highlight-text: var(--aya-search-mark-text);
    z-index: 1000;
}
```

- [ ] **Step 3: Update search surface declarations**

Use these exact mappings inside `blur.css`:

```css
.VPLocalSearchBox[aria-expanded="true"] .backdrop {
    background: var(--aya-search-backdrop-bg);
    backdrop-filter: var(--aya-frosted-blur-backdrop);
    -webkit-backdrop-filter: var(--aya-frosted-blur-backdrop);
}

.VPLocalSearchBox[aria-expanded="true"] .shell {
    border: 1px solid var(--aya-surface-border);
    background: var(--aya-surface-bg-strong);
    box-shadow: var(--aya-shadow-search-panel);
    backdrop-filter: var(--aya-frosted-blur-panel);
    -webkit-backdrop-filter: var(--aya-frosted-blur-panel);
}

.VPLocalSearchBox[aria-expanded="true"] .search-bar {
    border: 1px solid var(--aya-surface-border);
    background: var(--aya-surface-bg-soft);
    box-shadow: var(--aya-shadow-search-control);
    backdrop-filter: var(--aya-frosted-blur-md);
    -webkit-backdrop-filter: var(--aya-frosted-blur-md);
}

.VPLocalSearchBox[aria-expanded="true"] .result {
    border: 1px solid var(--aya-surface-border-soft);
    background: var(--aya-surface-bg-soft);
    box-shadow: var(--aya-shadow-search-result);
    backdrop-filter: var(--aya-frosted-blur-md);
    -webkit-backdrop-filter: var(--aya-frosted-blur-md);
}
```

Keep existing sizing, spacing, border radius, and transitions around these declarations.

- [ ] **Step 4: Update search text, result hover, marks, shortcuts, and no-results**

Replace old color variables in those rules with:

```css
.VPLocalSearchBox[aria-expanded="true"] .search-input::placeholder,
.VPLocalSearchBox[aria-expanded="true"] .search-keyboard-shortcuts,
.VPLocalSearchBox[aria-expanded="true"] .no-results {
    color: var(--aya-search-text-soft);
}

.VPLocalSearchBox[aria-expanded="true"] .result:hover,
.VPLocalSearchBox[aria-expanded="true"] .result.selected {
    background: var(--aya-surface-bg-hover);
}

.VPLocalSearchBox[aria-expanded="true"] .titles mark,
.VPLocalSearchBox[aria-expanded="true"] .excerpt mark {
    background: var(--aya-search-mark-bg);
    color: var(--aya-search-mark-text);
}
```

If a selector already has additional declarations, keep them and only replace the old variable references.

- [ ] **Step 5: Preserve reduced-transparency behavior**

Keep the existing reduced-transparency block, but make the solid backgrounds explicit:

```css
@media (prefers-reduced-transparency: reduce) {
    .VPLocalSearchBox[aria-expanded="true"] .backdrop,
    .VPLocalSearchBox[aria-expanded="true"] .shell,
    .VPLocalSearchBox[aria-expanded="true"] .search-bar,
    .VPLocalSearchBox[aria-expanded="true"] .result {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }

    .VPLocalSearchBox[aria-expanded="true"] .shell {
        background: var(--vp-c-bg);
    }

    .VPLocalSearchBox[aria-expanded="true"] .result,
    .VPLocalSearchBox[aria-expanded="true"] .search-bar {
        background: var(--vp-c-bg-soft);
    }
}
```

- [ ] **Step 6: Run the contract test**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL remains because nav, sidebar, reading mode, and content components still contain old reflection tokens. `blur.css` should no longer be named in the failure output.

- [ ] **Step 7: Commit the shared surface migration**

Run:

```bash
git add docs/.vitepress/theme/style/blur.css
git commit -m "style: migrate shared frosted surfaces"
```

---

### Task 3: Migrate Navigation Surfaces

**Files:**
- Modify: `docs/.vitepress/theme/style/nav-tabs.css`
- Test: `scripts/frosted-surface.test.mjs`

- [ ] **Step 1: Replace the nav material variable block**

Replace the opening `:root` and `.dark` material variable blocks in `docs/.vitepress/theme/style/nav-tabs.css` with:

```css
/* Flat frosted tab treatment for the right side of the desktop nav. */
:root {
  --aya-nav-tab-bg: var(--aya-surface-bg);
  --aya-nav-tab-bg-strong: var(--aya-surface-bg-strong);
  --aya-nav-tab-border: var(--aya-surface-border);
  --aya-nav-tab-text: var(--aya-surface-text);
  --aya-nav-tab-selected: var(--aya-surface-selected);
  --aya-nav-tab-hover: var(--aya-surface-bg-hover);
  --aya-nav-tab-state-bg: var(--aya-surface-bg-hover);
  --aya-nav-pill-state-bg: var(--aya-surface-bg-soft);
  --aya-nav-tab-shadow: var(--aya-shadow-nav);
  --aya-nav-tab-feather-shadow: var(--aya-shadow-nav-feather);
  --aya-nav-pill-feather-shadow: var(--aya-shadow-pill-feather);
  --aya-nav-tab-blur: var(--aya-frosted-blur-lg);
  --aya-nav-pill-blur: var(--aya-frosted-blur-sm);
  --aya-nav-menu-bg: var(--aya-surface-bg-strong);
  --aya-nav-menu-state-bg: var(--aya-surface-bg-soft);
  --aya-nav-menu-blur: var(--aya-frosted-blur-panel);
  --aya-nav-menu-shadow: var(--aya-shadow-menu);
  --aya-nav-menu-feather-shadow: var(--aya-shadow-menu-feather);
}
```

Delete the separate `.dark { ... }` nav-material block because the referenced surface tokens already switch in `.dark`.

- [ ] **Step 2: Replace nav blur token names**

Make these replacements throughout `nav-tabs.css`:

```text
var(--aya-nav-tab-glass)  -> var(--aya-nav-tab-blur)
var(--aya-nav-pill-glass) -> var(--aya-nav-pill-blur)
var(--aya-nav-menu-glass) -> var(--aya-nav-menu-blur)
```

- [ ] **Step 3: Delete container reflection pseudo-elements**

Delete the full selector blocks for these reflection-only rules:

```css
.VPNavBar .VPNavBarMenu::before,
.VPNavBar .DocSearch-Button::before,
.VPNavBar .VPNavBarSearchButton::before,
.VPNavBar .VPNavBarExtra > .button::before { ... }

.VPNavBar .VPMenu::before { ... }

.VPNavBar .VPNavBarAppearance::after,
.VPNavBar .VPNavBarSocialLinks::after { ... }

.VPNavBar .DocSearch-Button::before,
.VPNavBar .VPNavBarSearchButton::before,
.VPNavBar .VPNavBarExtra > .button::before,
.VPNavBar .VPNavBarHamburger::before { ... }
```

Keep the `position: relative`, `z-index`, borders, background, box-shadow, and blur declarations on the real elements.

- [ ] **Step 4: Convert per-pill state pseudo-elements to flat state layers**

Keep `.VPNavBar .VPNavBarMenuLink::before` and `.VPNavBar .VPNavBarMenuGroup > .button::before` because they represent hover/active state, but replace their active/hover backgrounds with:

```css
.VPNavBar .VPNavBarMenuLink.active::before,
.VPNavBar .VPNavBarMenuGroup.active > .button::before,
.VPNavBar .VPNavBarMenuLink:hover::before,
.VPNavBar .VPNavBarMenuGroup:hover > .button::before {
  background: var(--aya-nav-pill-state-bg);
  opacity: 1;
}
```

Remove `backdrop-filter: none !important` and `-webkit-backdrop-filter: none !important` from those state pseudo-element rules.

- [ ] **Step 5: Update reduced-transparency cleanup selectors**

In the reduced-transparency block, remove pseudo-element selectors that were deleted. The block should keep only selectors that still exist:

```css
@media (prefers-reduced-transparency: reduce) {
  .VPNavBar .VPNavBarMenu,
  .VPNavBar .DocSearch-Button,
  .VPNavBar .VPNavBarSearchButton,
  .VPNavBar .VPNavBarExtra > .button,
  .VPNavBar .VPNavBarAppearance,
  .VPNavBar .VPNavBarSocialLinks,
  .VPNavBar .VPNavBarHamburger,
  .VPNavBar .VPMenu {
    background: var(--vp-c-bg-elv) !important;
    background-color: var(--vp-c-bg-elv) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .VPNavBar .VPNavBarMenuLink::before,
  .VPNavBar .VPNavBarMenuGroup > .button::before {
    content: none !important;
  }
}
```

- [ ] **Step 6: Run the contract test**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL remains because sidebar, reading mode, and content components still contain old reflection tokens. `nav-tabs.css` should no longer be named in the failure output.

- [ ] **Step 7: Commit the nav migration**

Run:

```bash
git add docs/.vitepress/theme/style/nav-tabs.css
git commit -m "style: flatten nav frosted surfaces"
```

---

### Task 4: Migrate Sidebar And Mobile Nav Screen Surfaces

**Files:**
- Modify: `docs/.vitepress/theme/style/sidebar-window.css`
- Test: `scripts/frosted-surface.test.mjs`

- [ ] **Step 1: Replace sidebar material variables**

Replace the opening `:root` and `.dark` material variables with:

```css
/* iOS-inspired floating sidebar window for desktop docs pages. */
:root {
  --aya-sidebar-radius: 28px;
  --aya-sidebar-item-radius: 14px;
  --aya-sidebar-bg: var(--aya-surface-bg-strong);
  --aya-sidebar-bg-strong: var(--aya-surface-bg-strong);
  --aya-sidebar-border: var(--aya-surface-border);
  --aya-sidebar-text: var(--aya-surface-text);
  --aya-sidebar-text-strong: var(--aya-surface-text-strong);
  --aya-sidebar-hover: var(--aya-surface-bg-hover);
  --aya-sidebar-active: var(--aya-surface-bg-soft);
  --aya-sidebar-active-bg: var(--aya-surface-bg-active);
  --aya-sidebar-active-text: #3a7a9b;
  --aya-sidebar-window-shadow: var(--aya-shadow-sidebar-window);
  --aya-sidebar-blur: var(--aya-frosted-blur-lg);
  --aya-sidebar-item-blur: var(--aya-frosted-blur-sm);
  --aya-sidebar-layout-offset: max(0px, calc((100vw - var(--vp-layout-max-width)) / 2));
}

.dark {
  --aya-sidebar-active-text: #98CBEA;
}
```

- [ ] **Step 2: Replace sidebar blur token names**

Make these replacements throughout `sidebar-window.css`:

```text
var(--aya-sidebar-glass)      -> var(--aya-sidebar-blur)
var(--aya-sidebar-item-glass) -> var(--aya-sidebar-item-blur)
```

- [ ] **Step 3: Preserve sidebar shadow and active indicator**

Confirm these declarations remain unchanged:

```css
box-shadow: var(--aya-sidebar-window-shadow);
background: var(--aya-sidebar-active-bg);
box-shadow: 0 0 0 1px rgb(152 203 234 / 32%), 0 8px 18px rgb(54 87 113 / 6%);
```

Do not delete `.sidebar-active-indicator`.

- [ ] **Step 4: Run the contract test**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL remains because reading mode and content components still contain old reflection tokens. `sidebar-window.css` should no longer be named in the failure output.

- [ ] **Step 5: Commit the sidebar migration**

Run:

```bash
git add docs/.vitepress/theme/style/sidebar-window.css
git commit -m "style: flatten sidebar frosted surfaces"
```

---

### Task 5: Preserve Reading Mode While Renaming Its Material Layer

**Files:**
- Modify: `docs/.vitepress/theme/style/reading-mode.css`
- Modify: `docs/.vitepress/theme/style/transitions.css`
- Modify: `scripts/reading-mode.test.mjs`
- Test: `scripts/frosted-surface.test.mjs`

- [ ] **Step 1: Remove the reading-mode control reflection layer**

In `docs/.vitepress/theme/style/reading-mode.css`, delete this block:

```css
.VPNavBar .reading-mode-control::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: var(--aya-nav-tab-highlight);
  pointer-events: none;
}
```

Also delete this block:

```css
.VPNavBar .reading-mode-control.is-active::after {
  background: linear-gradient(135deg, rgb(255 255 255 / 16%), rgb(255 255 255 / 0%));
}
```

Keep `.VPNavBar .reading-mode-control > *` if the z-index still helps stacking; it is harmless without the pseudo-element.

- [ ] **Step 2: Replace reading-mode blur token names**

In `reading-mode.css`, replace:

```text
var(--aya-nav-pill-glass) -> var(--aya-nav-pill-blur)
var(--aya-nav-tab-glass)  -> var(--aya-nav-tab-blur)
```

Keep `backdrop-filter` and `-webkit-backdrop-filter` declarations.

- [ ] **Step 3: Update comments and compositor language**

Replace the old navbar paintability comment with:

```css
  /* Keep the nav paintable so frosted blur renders during the reveal. */
```

Keep this declaration unchanged:

```css
will-change: backdrop-filter, opacity;
```

- [ ] **Step 4: Update `reading-mode.test.mjs` material assertions**

In `scripts/reading-mode.test.mjs`, replace the old material assertions in `reading mode CSS hides portrait control and matches navbar glass styling` with:

```js
  assert.match(css, /--aya-nav-tab-bg/)
  assert.match(css, /--aya-nav-tab-border/)
  assert.match(css, /--aya-nav-tab-blur/)
```

In the next test, replace the assertion message:

```js
  assert.match(css, /html\.reading-mode-active \.VPNavBar \.VPNavBarAppearance,[\s\S]*will-change:\s*backdrop-filter, opacity;/, 'frosted nav surfaces should be kept in the compositor')
```

- [ ] **Step 5: Update transition comments without behavior changes**

In `docs/.vitepress/theme/style/transitions.css`, replace comments that describe "玻璃态" with "毛玻璃/blurred surface" wording. Do not change selectors or declarations in this file.

- [ ] **Step 6: Run focused reading-mode tests**

Run:

```bash
npm run test:reading-mode
```

Expected: PASS.

- [ ] **Step 7: Run the frosted-surface contract**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL remains because content components still contain old reflection tokens. `reading-mode.css` should no longer be named in the failure output.

- [ ] **Step 8: Commit the reading-mode migration**

Run:

```bash
git add docs/.vitepress/theme/style/reading-mode.css docs/.vitepress/theme/style/transitions.css scripts/reading-mode.test.mjs
git commit -m "style: preserve reading mode on frosted surfaces"
```

---

### Task 6: Migrate MindMap Control And Menu Surfaces

**Files:**
- Modify: `docs/.vitepress/theme/components/MindMap.vue`
- Test: `scripts/frosted-surface.test.mjs`

- [ ] **Step 1: Replace MindMap surface variables**

Inside `.mind-map`, replace the pill/menu variables with:

```css
  --mind-map-pill-bg: var(--aya-nav-tab-bg, var(--aya-surface-bg));
  --mind-map-pill-bg-strong: var(--aya-nav-tab-bg-strong, var(--aya-surface-bg-strong));
  --mind-map-pill-border: var(--aya-nav-tab-border, var(--aya-surface-border));
  --mind-map-pill-text: var(--aya-nav-tab-text, var(--aya-surface-text));
  --mind-map-pill-selected: var(--aya-nav-tab-selected, var(--aya-surface-selected));
  --mind-map-pill-hover: var(--aya-nav-tab-hover, var(--aya-surface-bg-hover));
  --mind-map-pill-state-bg: var(--aya-nav-pill-state-bg, var(--aya-surface-bg-soft));
  --mind-map-pill-blur: var(--aya-nav-tab-blur, var(--aya-frosted-blur-lg));
  --mind-map-pill-soft-blur: var(--aya-nav-pill-blur, var(--aya-frosted-blur-sm));
  --mind-map-pill-shadow: var(--aya-nav-tab-shadow, var(--aya-shadow-nav));
  --mind-map-pill-feather-shadow: var(--aya-nav-tab-feather-shadow, var(--aya-shadow-nav-feather));
  --mind-map-pill-active-shadow: var(--aya-nav-pill-feather-shadow, var(--aya-shadow-pill-feather));
  --mind-map-menu-bg: var(--aya-nav-menu-bg, var(--aya-surface-bg-strong));
  --mind-map-menu-blur: var(--aya-nav-menu-blur, var(--aya-frosted-blur-panel));
  --mind-map-menu-shadow: var(--aya-nav-menu-shadow, var(--aya-shadow-menu));
  --mind-map-menu-feather-shadow: var(--aya-nav-menu-feather-shadow, var(--aya-shadow-menu-feather));
```

Remove `--mind-map-pill-highlight`, `--mind-map-pill-inner-highlight`, and `--mind-map-menu-highlight`.

- [ ] **Step 2: Replace MindMap blur usages**

Make these replacements:

```text
var(--mind-map-pill-glass)      -> var(--mind-map-pill-blur)
var(--mind-map-pill-soft-glass) -> var(--mind-map-pill-soft-blur)
var(--mind-map-menu-glass)      -> var(--mind-map-menu-blur)
```

- [ ] **Step 3: Delete reflection pseudo-elements**

Delete the full block:

```css
.mind-map-control-pill::before {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: var(--mind-map-pill-highlight);
  pointer-events: none;
}
```

Delete the full block:

```css
.mind-map-export-menu::before {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: var(--mind-map-menu-highlight);
  pointer-events: none;
}
```

- [ ] **Step 4: Keep control state layers flat**

Replace the hover/active state pseudo-element background rule with:

```css
.mind-map-control:hover::before,
.mind-map-control:focus-visible::before,
.mind-map-control.is-active::before,
.mind-map-export-trigger[aria-expanded="true"]::before {
  background: var(--mind-map-pill-state-bg);
  opacity: 1;
}
```

- [ ] **Step 5: Run the frosted-surface contract**

Run:

```bash
npm run test:frosted-surface
```

Expected: FAIL remains because CourseIndex and SongCard still contain old reflection tokens. `MindMap.vue` should no longer be named in the failure output.

- [ ] **Step 6: Commit the MindMap migration**

Run:

```bash
git add docs/.vitepress/theme/components/MindMap.vue
git commit -m "style: flatten mind map controls"
```

---

### Task 7: Migrate CourseIndex, SongCard, And MathCopy Surfaces

**Files:**
- Modify: `docs/.vitepress/theme/components/CourseIndex.vue`
- Modify: `docs/.vitepress/theme/components/SongCard.vue`
- Modify: `docs/.vitepress/theme/components/MathCopy.vue`
- Test: `scripts/frosted-surface.test.mjs`

- [ ] **Step 1: Remove CourseIndex reflection variable**

In `.course-index`, delete:

```css
  --course-index-card-highlight: linear-gradient(135deg, rgb(255 255 255 / 20%), rgb(255 255 255 / 4%));
```

In `:global(.dark .course-index)`, delete:

```css
  --course-index-card-highlight: linear-gradient(135deg, rgb(255 255 255 / 4%), rgb(255 255 255 / 0%));
```

- [ ] **Step 2: Replace CourseIndex card backgrounds**

In `.course-index-card`, replace:

```css
  background:
    var(--course-index-card-highlight),
    var(--course-index-card-bg);
```

with:

```css
  background: var(--course-index-card-bg);
```

In `.course-index-card:hover, .course-index-card:focus-visible`, replace:

```css
  background:
    var(--course-index-card-highlight),
    color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--course-index-card-bg));
```

with:

```css
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--course-index-card-bg));
```

Keep every `box-shadow` line unchanged.

- [ ] **Step 3: Remove SongCard reflection variable**

In `.song-card`, delete:

```css
  --song-card-highlight: linear-gradient(135deg, rgb(255 255 255 / 18%), rgb(255 255 255 / 3%));
```

In `:global(.dark .song-card)`, delete:

```css
  --song-card-highlight: none;
```

- [ ] **Step 4: Replace SongCard backgrounds**

In `.song-card`, replace:

```css
  background:
    var(--song-card-highlight),
    var(--song-card-bg);
```

with:

```css
  background: var(--song-card-bg);
```

In `.song-card:hover`, replace:

```css
  background:
    var(--song-card-highlight),
    color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--song-card-bg));
```

with:

```css
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--song-card-bg));
```

Keep the `.song-card-play-button` brand gradient because it is the play control's fill, not a frosted-surface reflection layer.

- [ ] **Step 5: Move MathCopy toast to inverse surface tokens**

In `.math-copy-toast`, replace color and background with:

```css
  color: var(--aya-surface-inverse-text);
  background: var(--aya-surface-inverse-bg);
```

Keep the existing `box-shadow`, `backdrop-filter`, font size, and animation.

- [ ] **Step 6: Run the frosted-surface contract**

Run:

```bash
npm run test:frosted-surface
```

Expected: PASS.

- [ ] **Step 7: Commit content component migration**

Run:

```bash
git add docs/.vitepress/theme/components/CourseIndex.vue docs/.vitepress/theme/components/SongCard.vue docs/.vitepress/theme/components/MathCopy.vue
git commit -m "style: flatten content component surfaces"
```

---

### Task 8: Final Verification And Polish

**Files:**
- Modify only files from previous tasks if verification exposes a concrete issue.
- Test: `scripts/frosted-surface.test.mjs`, `scripts/reading-mode.test.mjs`

- [ ] **Step 1: Run static reflection audit**

Run:

```bash
rg "liquid|glass|highlight|linear-gradient\\(135deg,\\s*rgb\\(255 255 255" docs/.vitepress/theme/style docs/.vitepress/theme/components --glob '!**/vendor/**'
```

Expected: no output. If output remains, remove or rename the matched reflection code before continuing.

- [ ] **Step 2: Run material contract**

Run:

```bash
npm run test:frosted-surface
```

Expected: PASS.

- [ ] **Step 3: Run reading-mode regression test**

Run:

```bash
npm run test:reading-mode
```

Expected: PASS.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run docs:build
```

Expected: PASS and VitePress writes output to `docs/.vitepress/dist/`.

- [ ] **Step 5: Inspect high-risk surfaces in the browser**

Start the dev server:

```bash
npm run docs:dev -- --host 127.0.0.1
```

Open these routes and inspect light mode, dark mode, and a mobile viewport:

```text
http://127.0.0.1:5173/
http://127.0.0.1:5173/Y3S2/EPMF/Block%202/Lecture%208.html
http://127.0.0.1:5173/others/lab/mindmap.html
http://127.0.0.1:5173/others/lab/song-card.html
```

Expected:

- Navigation, sidebar, search, MindMap controls, CourseIndex cards, SongCard, and MathCopy toast still have blur and preserved shadows.
- No directional white reflection layer appears on frosted surfaces.
- Reading mode reveals navbar/sidebar/aside and keeps nav controls clickable.
- Route changes do not leave a sidebar blur rectangle.

- [ ] **Step 6: Stop the dev server**

Stop the `npm run docs:dev` process from Step 5 with `Ctrl+C`.

- [ ] **Step 7: Commit verification fixes if there were changes**

If Step 5 required fixes, run:

```bash
git add docs/.vitepress/theme scripts package.json
git commit -m "fix: polish frosted surface regressions"
```

If Step 5 required no fixes, do not create an empty commit.

- [ ] **Step 8: Report completion**

Run:

```bash
git status --short
```

Expected: no output.

Summarize the final commit list and the validation commands that passed.
