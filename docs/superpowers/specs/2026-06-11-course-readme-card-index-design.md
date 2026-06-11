# Course README Card Index Design

## Context

The VitePress site is a Chinese university course-note blog with a custom theme layered on top of the default VitePress layout. Course README pages currently use plain Markdown lists for their indexes. The desired update is to make selected course README pages feel consistent with the site's home `features` cards while keeping the normal document-reading experience.

## Goal

Create a reusable course index card container for selected course README pages. The first implementation will cover:

- `docs/Y3S2/DSP/DSP-README.md`
- `docs/Y3S2/CCD/CCD-README.md`
- `docs/Y3S2/EMFT/EMFT-README.md`

The card index should show chapter groups, chapter cards, and cover images. It must support dark mode, mobile layouts, and desktop hover previews.

## Scope

- Add a reusable `CourseIndex` component and register it for Markdown use.
- Replace only the index sections in the three README files listed above.
- Preserve existing README introductions, personal notes, caution blocks, and course-level images unless they conflict with the new index section.
- Keep the left VitePress sidebar visible and unchanged.
- Let the selected README pages use the document content area plus the space normally occupied by the right outline.
- Keep ordinary chapter pages unchanged, including their right outline behavior.

## Non-Goals

- Do not edit any chapter-note body files.
- Do not rewrite course content, formulas, explanations, headings, or attachments.
- Do not redesign the global VitePress layout, nav, sidebar, or home page.
- Do not add runtime filesystem scanning in the browser.

## User Decisions

- Desktop visual style uses option A: feature-like cards with the cover image on top and text below.
- Mobile visual style uses option B: compact horizontal cards with the cover on the left and text on the right.
- Part or block group headings should be larger and clearer than the first mockups.
- Chapter covers may be manually specified.
- If no manual cover is provided during setup, use the first image referenced by the chapter note as the initial cover.
- If no cover exists, show a gradient numbered fallback.
- The first implementation covers only DSP, CCD, and EMFT.

## Architecture

Add `docs/.vitepress/theme/components/CourseIndex.vue`.

Register it globally in `docs/.vitepress/theme/index.ts` so README Markdown can use:

```vue
<CourseIndex
  course="DSP"
  :groups="[
    {
      title: 'Part I 离散时间信号与系统',
      items: [
        {
          code: 'Ch 2',
          title: '时域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Time Domain',
          link: 'DSP Chapter 2.md',
          cover: 'DSP Chapter 2.attachments/1773557886618.PNG'
        }
      ]
    }
  ]"
/>
```

The three README files will keep course-specific data inline. The component owns layout, styling, dark mode behavior, hover previews, and fallback covers.

## Data Model

`CourseIndex` accepts:

- `course`: short course label for accessibility and optional UI labels.
- `groups`: ordered list of course sections.

Each group has:

- `title`: visible group heading, such as `Part I 离散时间信号与系统`.
- `items`: ordered chapter card data.

Each item has:

- `code`: short chapter code, such as `Ch 2` or `Lecture 11-12`.
- `title`: primary chapter title.
- `subtitle`: secondary title or English title.
- `link`: original Markdown link target.
- `cover`: optional cover image path relative to the README.

The component will not infer course structure at runtime. README data remains explicit so future edits are predictable.

## Cover Selection

Implementation will populate initial `cover` values as follows:

1. If the user has specified a cover for an item, use that file.
2. Otherwise, scan the linked chapter Markdown during implementation and use the first referenced local image.
3. If the chapter has no usable image, omit `cover` and let the component render a gradient fallback with `code`.

After implementation, changing a cover only requires editing the corresponding README item.

## Layout

The selected README pages should add page metadata that makes the card index a wide document index page:

```yaml
---
aside: false
pageClass: course-index-page
---
```

The component or theme CSS will scope width changes to `.course-index-page` only. The left sidebar remains normal. The right outline area is intentionally given to the README card grid on these pages.

Desktop and wide tablet behavior:

- Use feature-style cards.
- Cover image sits on top.
- Title and subtitle sit below.
- Grid adapts to available width.
- Wide screens may show up to 4 cards per row.
- Medium widths show 3 or 2 cards per row.

Mobile behavior:

- Use compact horizontal list cards.
- Cover image sits on the left.
- Text sits on the right.
- No hover preview is shown.
- Cards remain easy to scan while scrolling.

Part or block headings:

- Use larger serif-like heading treatment consistent with current document headings.
- Keep spacing large enough to separate groups clearly.
- Preserve the original group order.

## Interaction

Each card is a full link to its chapter.

Desktop:

- Hover raises the card slightly.
- Keyboard `focus-visible` uses the same discoverable state.
- Hover or focus shows a lightweight preview popover.
- The preview shows the cover image, code, title, and subtitle.

Mobile:

- No hover popover.
- Tapping the card navigates directly to the chapter.

Motion:

- Respect `prefers-reduced-motion`.
- With reduced motion enabled, disable translate and scale effects while retaining color and border feedback.

## Dark Mode

The component must use VitePress theme variables where practical:

- text: `var(--vp-c-text-*)`
- surfaces: `var(--vp-c-bg-soft)` and related soft/background variables
- borders: `var(--vp-c-divider)` or local alpha variants
- brand accents: existing gradient colors `#98CBEA`, `#C2C7F8`, `#F1DCE4`

Dark mode must cover:

- card surface
- card border
- title and subtitle text
- hover/focus state
- preview popover
- fallback gradient cover

## Accessibility

- Cards should be semantic links, not clickable `div` wrappers.
- Images should have descriptive `alt` text or empty `alt` when decorative.
- Focus states must be visible.
- Preview content should not be the only way to access chapter information.
- Mobile users should not need hover behavior.

## Files To Change During Implementation

Expected implementation files:

- `docs/.vitepress/theme/components/CourseIndex.vue`
- `docs/.vitepress/theme/index.ts`
- `docs/Y3S2/DSP/DSP-README.md`
- `docs/Y3S2/CCD/CCD-README.md`
- `docs/Y3S2/EMFT/EMFT-README.md`

No chapter-note Markdown files should be edited.

## Verification

Run:

```bash
npm run docs:build
```

Then start the dev server:

```bash
npm run docs:dev
```

Check:

- DSP, CCD, and EMFT README pages render card indexes.
- Left sidebar remains visible on those README pages.
- Right outline is absent on those README pages and the grid uses the extra width.
- Ordinary chapter pages still show their normal layout and outline.
- Desktop widths show 2, 3, or 4 columns depending on available width.
- Mobile width uses compact horizontal cards.
- Dark mode looks intentional.
- Hover and keyboard focus show previews on desktop.
- Missing-cover fallback does not show broken images.

## Risks

- Inline README data can become verbose. This is acceptable because it keeps course structure explicit and avoids runtime filesystem assumptions.
- Hover previews near the right edge need collision handling or conservative positioning so they do not clip.
- Some chapter first images may be formulas or screenshots that are not ideal covers. Manual `cover` overrides are the intended correction path.
