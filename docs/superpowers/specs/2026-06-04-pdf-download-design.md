# PDF Download Print Design

## Goal

Add a PDF download entry to each VitePress article's metadata row. The control appears on the right side of the existing `字数 ｜ 阅读时间 ｜ 作者` row, lets the reader choose a light or dark PDF style, and opens the browser print dialog for saving the current article as PDF.

The PDF should reuse the same rendered document DOM as the normal SSG page. It should hide site chrome and interactive-only UI: nav bar, sidebar, local article outline, comments, back-to-top, click effects, transition helpers, and similar non-content elements.

## Scope

Included:

- Add a `下载 PDF` dropdown to `DocMeta.vue`.
- Provide `白色 PDF` and `黑色 PDF` actions.
- Use `window.print()` rather than pre-generating PDF files.
- Use print CSS to preserve article rendering while hiding non-article UI.
- Default to showing the control on pages where `DocMeta` is injected.
- Allow single-page opt-out with frontmatter `pdf: false`.

Not included:

- Build-time PDF generation.
- A separate print route or clean preview page.
- Server-side PDF rendering.
- Changing the existing word count, reading time, author, or last-updated calculations.

## Architecture

The existing Markdown pipeline injects `<DocMeta>` after the first H1 through `registerDocMeta()` in `docs/.vitepress/config.mts`. This remains the integration point because it already owns the article metadata row.

`DocMeta.vue` becomes a small interactive component:

- Left side: existing metadata (`字数`, `阅读时间`, `作者`).
- Right side: `下载 PDF` dropdown.
- Dropdown options set a temporary print theme on `document.documentElement`, then call `window.print()`.

Global print styles live in the theme CSS layer, most likely `docs/.vitepress/theme/style/index.css` or a small imported `print.css` if the implementation benefits from isolation.

## Component Design

`DocMeta.vue` receives one new prop:

- `pdf?: boolean`

The Markdown injection passes this prop from frontmatter. Pages show the control unless `frontmatter.pdf === false`.

The dropdown behavior:

1. Click `下载 PDF` to open or close the menu.
2. Choose `白色 PDF` or `黑色 PDF`.
3. The component closes the menu.
4. It sets `data-pdf-theme="light"` or `data-pdf-theme="dark"` on `<html>`.
5. It waits for the DOM/class change to settle.
6. It calls `window.print()`.
7. It removes the temporary print theme after `afterprint`, with a timeout fallback.

Accessibility requirements:

- The trigger is a real `<button>`.
- It exposes `aria-haspopup="menu"` and `aria-expanded`.
- Menu items are real `<button>` elements.
- Escape closes the menu.
- Outside click closes the menu.

Responsive behavior:

- Desktop: metadata stays left, PDF dropdown aligns right in the same row.
- Narrow screens: the control can wrap to its own line without compressing or overlapping metadata.

## Print Styling

Print mode must hide:

- `.VPNavBar`
- `.VPSidebar`
- `.VPLocalNav`
- `.VPDoc .aside`
- Giscus/comment containers
- back-to-top button
- click/ripple effects
- transition helper components
- the PDF dropdown itself

Print mode must keep:

- article H1
- `DocMeta` text
- `.vp-doc` content
- Markdown-rendered tables, images, code blocks, custom containers
- MathJax SVG output

Light PDF mode:

- Forces a light page background and dark readable text.
- Keeps article typography and layout close to the web page.
- Avoids UI-only shadows, sticky positioning, and animations.

Dark PDF mode:

- Forces a dark page background and light readable text.
- Keeps dark-theme article styling as much as practical in print.
- Ensures tables, code blocks, MathJax, and custom containers remain readable.

Both modes should set sensible print page margins and avoid clipping wide content where CSS can reasonably help. Browser print engines may still paginate long tables or oversized images according to their own rules.

## Data Flow

1. Markdown source is rendered by VitePress.
2. `registerDocMeta()` calculates words, reading time, and author.
3. It injects `<DocMeta :words="..." :minutes="..." author="..." :pdf="...">`.
4. Vue hydrates `DocMeta.vue`.
5. User chooses a PDF theme from the dropdown.
6. `DocMeta.vue` marks `<html>` with the selected print theme and calls `window.print()`.
7. `@media print` CSS hides layout chrome and applies the selected print theme.
8. After printing, the temporary theme mark is removed.

## Error Handling

- If JavaScript is disabled, the PDF control does not work; the static article content still renders normally.
- If `window.print` is unavailable, the control should fail softly and not alter the page permanently.
- If `afterprint` is not fired reliably, the timeout fallback removes the temporary theme marker.
- If a page sets `pdf: false`, the control is not shown, but the rest of `DocMeta` remains unchanged.

## Testing And Verification

Implementation should verify:

- `npm run docs:build` succeeds.
- A normal article shows the PDF dropdown in the metadata row.
- A page with `pdf: false` does not show the PDF dropdown.
- Choosing `白色 PDF` sets the light print theme and opens print.
- Choosing `黑色 PDF` sets the dark print theme and opens print.
- Print preview hides nav, sidebar, article outline, and comments.
- Print preview keeps article title, metadata, rendered MathJax SVG, images, tables, and custom containers.
- Mobile-width layout does not overlap metadata and the dropdown.

Automated tests may be limited because native print dialogs are browser-controlled. At minimum, use build verification plus DOM/CSS checks around the dropdown and theme marker. Manual browser verification is required for print preview appearance.

## Open Decisions Resolved

- PDF generation mode: browser print / save as PDF.
- Button placement: inside `DocMeta.vue`, right side of metadata row.
- Page coverage: default on all `DocMeta` pages, opt-out with `pdf: false`.
- Theme selection: dropdown menu with `白色 PDF` and `黑色 PDF`.
- Render consistency: reuse the existing rendered page DOM rather than rendering Markdown a second time.
