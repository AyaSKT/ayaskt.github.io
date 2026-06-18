# Catppuccin Theme Migration Design

Date: 2026-06-18
Status: Approved for implementation planning

## Goal

Migrate the gp-blogs VitePress theme from the current custom blue-pink palette to Catppuccin, using Catppuccin Latte for light mode and Catppuccin Frappe for dark mode.

The migration should feel like the same site with a new palette: preserve the glass navigation, floating sidebar, soft hero gradient, course-card presentation, motion system, and document reading ergonomics while replacing the old brand color language.

## Chosen Direction

- Flavor mapping: Latte light mode and Frappe dark mode.
- Coverage: full site theme-level migration.
- Implementation path: token-first migration.
- Brand accent line: Mauve + Pink + Blue.
- Document semantic color mapping: Catppuccin semantic accents rather than a single brand-only color family.

## Non-Goals

- Do not change page content, course navigation, markdown structure, or sidebar data.
- Do not change interaction behavior, animation timing, reading mode behavior, or component layout.
- Do not introduce a new build dependency or runtime palette loader.
- Do not include unrelated package, release, or frosted-surface changes.
- Do not force every black or white alpha value through Catppuccin if it is serving as a glass highlight, generic shadow, or neutral overlay.

## Architecture

Use `docs/.vitepress/theme/style/var.css` as the theme token source of truth.

Define three layers:

1. Catppuccin raw tokens:
   - `--ctp-latte-*`
   - `--ctp-frappe-*`
   - Values match the official Catppuccin palette.

2. gp-blogs semantic tokens:
   - `--aya-c-brand-primary`
   - `--aya-c-brand-secondary`
   - `--aya-c-brand-tertiary`
   - `--aya-c-bg-*`
   - `--aya-c-surface-*`
   - `--aya-c-border-*`
   - `--aya-c-shadow-*`
   - `--aya-c-definition-*`
   - `--aya-c-solution-*`
   - `--aya-c-warning-*`
   - `--aya-c-danger-*`
   - `--aya-c-info-*`

3. VitePress consumer tokens:
   - `--vp-c-*`
   - `--vp-button-*`
   - `--vp-home-hero-*`

Components and secondary CSS files should consume `--aya-c-*` or `--vp-c-*` tokens. They should avoid direct references to raw Catppuccin tokens except when defining semantic aliases.

## Palette Mapping

Light mode maps to Catppuccin Latte:

- Text: `text`, `subtext1`, `subtext0`
- Backgrounds: `base`, `mantle`, `crust`
- Surfaces: `surface0`, `surface1`, `surface2`
- Borders and muted UI: `overlay0`, `overlay1`, `overlay2`
- Brand: `mauve`, `pink`, `blue`

Dark mode maps to Catppuccin Frappe:

- Text: `text`, `subtext1`, `subtext0`
- Backgrounds: `base`, `mantle`, `crust`
- Surfaces: `surface0`, `surface1`, `surface2`
- Borders and muted UI: `overlay0`, `overlay1`, `overlay2`
- Brand: `mauve`, `pink`, `blue`

Semantic accents:

- Brand: `mauve`, `pink`, `blue`
- Definition: `peach`, `yellow`
- Solution: `green`, `teal`
- Warning: `yellow`, `peach`
- Danger: `red`, `maroon`
- Info: `blue`, `sky`

## Files in Scope

Theme CSS:

- `docs/.vitepress/theme/style/var.css`
- `docs/.vitepress/theme/style/home-hero-gradient-data.css`
- `docs/.vitepress/theme/style/rainbow.css`
- `docs/.vitepress/theme/style/blur.css`
- `docs/.vitepress/theme/style/sidebar-window.css`
- `docs/.vitepress/theme/style/nav-tabs.css`
- `docs/.vitepress/theme/style/index.css`
- `docs/.vitepress/theme/custom.css`

Key component styles:

- `docs/.vitepress/theme/components/HomeCourseActions.vue`
- `docs/.vitepress/theme/components/TopProgress.vue`
- `docs/.vitepress/theme/components/CourseIndex.vue`
- `docs/.vitepress/theme/components/SongCard.vue`
- `docs/.vitepress/theme/components/LyricCard.vue`

Additional components may be touched only if they contain old palette hard-coded colors or consume theme variables incorrectly.

## Migration Rules

1. Keep official Catppuccin raw color values unchanged.
2. Prefer semantic gp-blogs variables for actual site styling.
3. Replace the old brand colors `#98CBEA`, `#C2C7F8`, and `#F1DCE4`.
4. Replace major old brand RGB variants such as `rgb(152 203 234 / ...)`, `rgb(194 199 248 / ...)`, and `rgb(241 220 228 / ...)`.
5. Preserve the current hero gradient behavior, but map its colors to Mauve + Pink + Blue.
6. Preserve glass surfaces by deriving backgrounds, borders, and shadows from Catppuccin base, surface, overlay, and brand tokens.
7. Keep document semantic containers visually distinct with their Catppuccin semantic mapping.
8. Keep dark mode on Frappe, not Mocha.
9. Keep readable contrast ahead of strict decorative matching if a surface is hard to read.
10. Leave unrelated worktree changes untouched.

## Component Treatment

Home hero:

- Use Mauve + Pink + Blue for title gradient, hero glow, and primary home button.
- Preserve gradient animation and existing timing.

Navigation and search:

- Use Latte/Frappe surface and overlay tokens for glass tabs, menus, and local search.
- Use brand Mauve/Blue for active and focused states.
- Use tokenized shadow colors rather than old blue shadow values.

Floating sidebar:

- Use Catppuccin surface tokens for glass window backgrounds.
- Use overlay tokens for text and scrollbars.
- Use brand tokens for active indicator fill, outline, and active text.

Document content:

- Use Catppuccin semantic accents for custom containers.
- Keep the existing structure of `::: example`, `::: definition`, `::: stem`, and `::: solution`.
- Preserve table, image, MathJax, and inline-code layout behavior.

Course and media components:

- Keep layout and interaction untouched.
- Retheme borders, feather shadows, hover outlines, player accents, progress bars, and active states through semantic variables.

## Validation Plan

Run:

```bash
git diff --check
npm run docs:build
```

Search for old brand colors after implementation:

```bash
rg -n "#98CBEA|#C2C7F8|#F1DCE4|152 203 234|194 199 248|241 220 228" docs/.vitepress/theme
```

Visual checks:

- Home page in light mode.
- Home page in dark mode.
- A document page with floating sidebar.
- Navigation tabs and dropdowns.
- Local search opened and focused.
- Custom containers such as example, definition, solution, and warning.
- CourseIndex card grid.
- SongCard player controls.
- LyricCard inline lyric block.

## Acceptance Criteria

- The site uses Catppuccin Latte in light mode and Frappe in dark mode.
- Brand visuals use Mauve + Pink + Blue.
- Old blue-pink brand hard-coded colors are removed from the theme surface, except for any justified historical or non-rendered references.
- VitePress build succeeds.
- Existing layout, navigation, content, and interactions remain unchanged.
- The implementation remains maintainable through a central token layer rather than scattered direct color replacement.
