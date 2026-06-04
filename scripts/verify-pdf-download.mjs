import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('markdown injects the pdf prop from frontmatter', () => {
  const config = read('docs/.vitepress/config.mts')

  assert.match(
    config,
    /const pdf = frontmatter\.pdf === false \? 'false' : 'true'/,
    'formatDocMeta should derive pdf from frontmatter.pdf'
  )
  assert.match(
    config,
    /<DocMeta :words="\$\{words\}" :minutes="\$\{minutes\}" author="\$\{md\.utils\.escapeHtml\(author\)\}" :pdf="\$\{pdf\}"><\/DocMeta>/,
    'DocMeta injection should pass the pdf prop'
  )
})

test('DocMeta exposes an accessible light and dark PDF dropdown', () => {
  const docMeta = read('docs/.vitepress/theme/components/DocMeta.vue')

  assert.match(docMeta, /pdf\?: boolean/, 'DocMeta should accept an optional pdf prop')
  assert.match(docMeta, /const showPdfMenu = ref\(false\)/, 'DocMeta should track menu state')
  assert.match(docMeta, /data-pdf-theme/, 'DocMeta should set a temporary print theme marker')
  assert.match(docMeta, /window\.print\(\)/, 'DocMeta should call the browser print dialog')
  assert.match(docMeta, /originalTitle = document\.title/, 'DocMeta should remember the page title before printing')
  assert.match(docMeta, /document\.title = ''/, 'DocMeta should clear the browser print header title while printing')
  assert.match(docMeta, /aria-haspopup="menu"/, 'PDF trigger should expose menu semantics')
  assert.match(docMeta, />白色 PDF</, 'Light PDF option should be present')
  assert.match(docMeta, />黑色 PDF</, 'Dark PDF option should be present')
  assert.match(docMeta, /@keydown\.escape/, 'Escape should close the dropdown')
})

test('print CSS hides site chrome and supports light and dark themes', () => {
  const css = read('docs/.vitepress/theme/style/index.css')
  const giscusComment = read('docs/.vitepress/theme/components/GiscusComment.vue')

  assert.match(css, /@media print/, 'global print styles should exist')
  assert.match(css, /@page\s*{[\s\S]*margin: 0;/, 'print page margins should suppress browser header/footer space')
  assert.match(css, /body\s*{[\s\S]*padding: 22mm 18mm !important;/, 'print body padding should replace page margins')
  assert.match(css, /\.VPNavBar[\s\S]*display: none !important/, 'print should hide the nav bar')
  assert.match(css, /\.VPSidebar[\s\S]*display: none !important/, 'print should hide the sidebar')
  assert.match(css, /\.VPDoc \.aside[\s\S]*display: none !important/, 'print should hide the article outline')
  assert.match(css, /\.giscus-comment[\s\S]*display: none !important/, 'print should hide the Giscus wrapper')
  assert.match(css, /\.giscus[\s\S]*display: none !important/, 'print should hide comments')
  assert.match(giscusComment, /class="giscus-comment"/, 'Giscus should have a wrapper class for print hiding')
  assert.match(css, /\[data-pdf-theme="light"\]/, 'light PDF theme selector should exist')
  assert.match(css, /\[data-pdf-theme="dark"\]/, 'dark PDF theme selector should exist')
  assert.match(css, /\.doc-meta-pdf[\s\S]*display: none !important/, 'print should hide the PDF dropdown itself')
  assert.match(css, /\.example-solution\[data-collapsed\] \.solution-content[\s\S]*max-height: none !important/, 'print should expand collapsed solutions')
  assert.match(css, /\.solution-toggle[\s\S]*display: none !important/, 'print should hide solution toggle buttons')
})
