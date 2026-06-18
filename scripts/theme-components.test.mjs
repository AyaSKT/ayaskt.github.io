import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const themeRoot = path.join(root, 'docs/.vitepress/theme')
const indexPath = path.join(themeRoot, 'index.ts')
const lyricCardPath = path.join(themeRoot, 'components/LyricCard.vue')
const lyricCoverPath = path.join(themeRoot, 'components/LyricCover.vue')
const songCardPath = path.join(themeRoot, 'components/SongCard.vue')
const mindMapPath = path.join(themeRoot, 'components/MindMap.vue')
const configPath = path.join(root, 'docs/.vitepress/config.mts')
const labReadmePath = path.join(root, 'docs/others/lab/README.md')
const lyricCardDocPath = path.join(root, 'docs/others/lab/lyric-container.md')
const lyricCoverDocPath = path.join(root, 'docs/others/lab/lyric-cover.md')
const songCardDocPath = path.join(root, 'docs/others/lab/song-card.md')
const mindMapDocPath = path.join(root, 'docs/others/lab/mindmap.md')

test('rewrites relative SongCard covers into Vite asset URLs', async () => {
  const { transformSongCardCoverAttrs } = await import('../docs/.vitepress/config.mts')
  const imports = new Map()
  const source = [
    '<SongCard',
    '  cover="hitchcock.attachments/cover.JPG"',
    '  song="ヒッチコック"',
    '/>',
    '<SongCard cover="/1.jpg" song="Public" />',
    '<SongCard cover="https://example.com/cover.jpg" song="Remote" />',
  ].join('\n')

  const result = transformSongCardCoverAttrs(source, (cover) => {
    const variable = `__songCardCover${imports.size}`
    imports.set(cover, variable)
    return variable
  })

  assert.match(result, /:cover='__songCardCover0'/)
  assert.doesNotMatch(result, /cover="hitchcock\.attachments\/cover\.JPG"/)
  assert.deepEqual([...imports], [['./hitchcock.attachments/cover.JPG', '__songCardCover0']])
  assert.match(result, /cover="\/1\.jpg"/)
  assert.match(result, /cover="https:\/\/example\.com\/cover\.jpg"/)
})

test('rewrites relative LyricCard album covers into Vite asset URLs', async () => {
  const { transformLyricCardAlbumCoverAttrs } = await import('../docs/.vitepress/config.mts')
  const imports = new Map()
  const source = [
    '<LyricCard',
    '  album-cover="hitchcock.attachments/cover.JPG"',
    '  title="ヒッチコック"',
    '>',
    '</LyricCard>',
    '<LyricCard album-cover="/1.jpg" title="Public" />',
    '<LyricCard album-cover="https://example.com/cover.jpg" title="Remote" />',
  ].join('\n')

  const result = transformLyricCardAlbumCoverAttrs(source, (cover) => {
    const variable = `__lyricCardAlbumCover${imports.size}`
    imports.set(cover, variable)
    return variable
  })

  assert.match(result, /:album-cover='__lyricCardAlbumCover0'/)
  assert.doesNotMatch(result, /album-cover="hitchcock\.attachments\/cover\.JPG"/)
  assert.deepEqual([...imports], [['./hitchcock.attachments/cover.JPG', '__lyricCardAlbumCover0']])
  assert.match(result, /album-cover="\/1\.jpg"/)
  assert.match(result, /album-cover="https:\/\/example\.com\/cover\.jpg"/)
})

test('rewrites relative LyricCover images into Vite asset URLs', async () => {
  const { transformLyricCoverImageAttrs } = await import('../docs/.vitepress/config.mts')
  const imports = new Map()
  const source = [
    '<LyricCover',
    '  image="hitchcock.attachments/cover.JPG"',
    '  title="ヒッチコック"',
    '>',
    '</LyricCover>',
    '<LyricCover src="/1.jpg" title="Public" />',
    '<LyricCover cover="https://example.com/cover.jpg" title="Remote" />',
  ].join('\n')

  const result = transformLyricCoverImageAttrs(source, (cover) => {
    const variable = `__lyricCoverImage${imports.size}`
    imports.set(cover, variable)
    return variable
  })

  assert.match(result, /:image='__lyricCoverImage0'/)
  assert.doesNotMatch(result, /image="hitchcock\.attachments\/cover\.JPG"/)
  assert.deepEqual([...imports], [['./hitchcock.attachments/cover.JPG', '__lyricCoverImage0']])
  assert.match(result, /src="\/1\.jpg"/)
  assert.match(result, /cover="https:\/\/example\.com\/cover\.jpg"/)
})

test('injects LyricCover text tone at markdown compile time when available', async () => {
  const { transformLyricCoverTextToneAttrs } = await import('../docs/.vitepress/config.mts')
  const source = [
    '<LyricCover image="dark-cover.jpg" title="Night" />',
    '<LyricCover image="bright-cover.jpg" title="Day" text-tone="dark" />',
  ].join('\n')

  const result = transformLyricCoverTextToneAttrs(source, (imagePath) => {
    return imagePath === 'dark-cover.jpg' ? 'light' : 'dark'
  })

  assert.match(result, /<LyricCover image="dark-cover\.jpg" title="Night" text-tone="light" \/>/)
  assert.match(result, /<LyricCover image="bright-cover\.jpg" title="Day" text-tone="dark" \/>/)
})

test('renders mindmap fences as a MindMap markdown component', async () => {
  const { renderMindMapFence } = await import('../docs/.vitepress/config.mts')
  const source = [
    '# 通信原理',
    '',
    '## 幅度调制',
    '- AM',
    '- SSB',
    '',
    '<script>alert("nope")</script>',
  ].join('\n')

  const result = renderMindMapFence(source, 'mindmap CPS 复习总览')

  assert.match(result, /^<MindMap\s/)
  assert.match(result, /:source='/)
  assert.match(result, /title="CPS 复习总览"/)
  assert.match(result, /# 通信原理\\n/)
  assert.doesNotMatch(result, /<script>/)
  assert.match(result, /&lt;script>/)
})

test('component cover asset imports are only injected for markdown HTML tokens', () => {
  const configSource = fs.readFileSync(configPath, 'utf8')

  assert.match(configSource, /token\.type\s*===\s*['"]html_block['"]/)
  assert.match(configSource, /token\.type\s*===\s*['"]html_inline['"]/)
})

test('registers SongCard as a markdown component', () => {
  const indexSource = fs.readFileSync(indexPath, 'utf8')

  assert.match(indexSource, /import SongCard from ['"]\.\/components\/SongCard\.vue['"]/)
  assert.match(indexSource, /app\.component\(['"]SongCard['"]\s*,\s*SongCard\)/)
})

test('registers LyricCover as a markdown component', () => {
  const indexSource = fs.readFileSync(indexPath, 'utf8')

  assert.match(indexSource, /import LyricCover from ['"]\.\/components\/LyricCover\.vue['"]/)
  assert.match(indexSource, /app\.component\(['"]LyricCover['"]\s*,\s*LyricCover\)/)
})

test('registers MindMap as a markdown component', () => {
  const indexSource = fs.readFileSync(indexPath, 'utf8')

  assert.match(indexSource, /const MindMapLoader = defineAsyncComponent\(\{\s*loader:\s*\(\)\s*=>\s*import\(['"]\.\/components\/MindMap\.vue['"]\),/s)
  assert.match(indexSource, /loadingComponent:\s*\{[^}]*mind-map-placeholder/s)
  assert.match(indexSource, /app\.component\(['"]MindMap['"]\s*,\s*MindMapLoader\)/)
})

test('SongCard exposes album cover and CJK-aware metadata hooks', () => {
  assert.equal(fs.existsSync(songCardPath), true)

  const source = fs.readFileSync(songCardPath, 'utf8')

  assert.match(source, /cover\?:\s*string/)
  assert.match(source, /album\?:\s*string/)
  assert.match(source, /artist\?:\s*string/)
  assert.match(source, /song\?:\s*string/)
  assert.match(source, /songId\?:\s*string\s*\|\s*number/)
  assert.match(source, /neteaseId\?:\s*string\s*\|\s*number/)
  assert.match(source, /neteaseUrl\?:\s*string/)
  assert.match(source, /audioUrl\?:\s*string/)
  assert.match(source, /lyricPreview\?:\s*string/)
  assert.match(source, /translationPreview\?:\s*string/)
  assert.match(source, /lyrics\?:\s*string/)
  assert.match(source, /translatedLyrics\?:\s*string/)
  assert.match(source, /--song-card-serif-sc:/)
  assert.match(source, /\.song-card:lang\(ja\)/)
})

test('SongCard exposes lazy NetEase audio playback controls', () => {
  const source = fs.readFileSync(songCardPath, 'utf8')

  assert.match(source, /DEFAULT_NETEASE_API_BASE\s*=\s*['"]https:\/\/api\.hypcvgm\.top\/NeteaseMiniPlayer\/nmp\.php['"]/)
  assert.match(source, /activeSongCardAudio/)
  assert.match(source, /function extractNeteaseSongId/)
  assert.match(source, /function loadNeteaseCover/)
  assert.match(source, /function loadNeteaseAudioUrl/)
  assert.match(source, /function loadNeteaseLyrics/)
  assert.match(source, /function parseLyrics/)
  assert.match(source, /function parseTimedLyricText/)
  assert.match(source, /function measureLyricTextLength/)
  assert.match(source, /function lyricDensityClass/)
  assert.match(source, /\/song\/detail/)
  assert.match(source, /\/song\/url\/v1/)
  assert.match(source, /\/lyric/)
  assert.match(source, /const displayedCover = computed\(\(\) => neteaseCoverUrl\.value \|\| resolvedCover\.value\)/)
  assert.match(source, /audioLevel:\s*['"]exhigh['"]/)
  assert.match(source, /requestNeteaseAudioUrl\(['"]standard['"]\)/)
  assert.match(source, /hasStartedPlayback/)
  assert.match(source, /class="song-card-player"/)
  assert.match(source, /class="song-card-cover-placeholder"/)
  assert.match(source, /ref="songCardAudio"/)
  assert.match(source, /aria-label="播放进度"/)
  assert.match(source, /aria-label="音量"/)
})

test('MindMap exposes a compact interactive SVG surface', () => {
  assert.equal(fs.existsSync(mindMapPath), true)

  const source = fs.readFileSync(mindMapPath, 'utf8')

  assert.match(source, /source:\s*string/)
  assert.match(source, /title\?:\s*string/)
  assert.match(source, /initialExpandLevel:\s*-1,/)
  assert.match(source, /Markmap\.create/)
  assert.match(source, /Transformer/)
  assert.match(source, /from 'markmap-lib'/)
  assert.match(source, /from 'markmap-view'/)
  assert.match(source, /import katex from ['"]katex['"]/)
  assert.match(source, /import ['"]katex\/dist\/katex\.min\.css['"]/)
  assert.match(source, /window\.katex\s*=\s*katex/)
  assert.match(source, /const displayTitle = computed\(\(\) => props\.title\.trim\(\)\)/)
  assert.match(source, /const hasTitle = computed\(\(\) => displayTitle\.value\.length > 0\)/)
  assert.match(source, /class="mind-map-surface"/)
  assert.match(source, /class="mind-map-svg"/)
  assert.match(source, /:style="surfaceStyle"/)
  assert.match(source, /aria-label/)
  assert.match(source, /isExpanded\s*=\s*ref\(false\)/)
  assert.match(source, /isExportMenuOpen\s*=\s*ref\(false\)/)
  assert.match(source, /toggleExpanded/)
  assert.match(source, /closeExpanded/)
  assert.match(source, /toggleExportMenu/)
  assert.match(source, /chooseExport\(format:\s*'svg'\s*\|\s*'png'\s*\|\s*'pdf'\)/)
  assert.match(source, /handleDocumentPointerdown/)
  assert.match(source, /class="mind-map-backdrop"/)
  assert.match(source, /class="mind-map-panel"/)
  assert.match(source, /:class="\{ 'has-no-title': !hasTitle \}"/)
  assert.match(source, /class="mind-map-control-pill is-expand"/)
  assert.match(source, /class="mind-map-control-pill is-tools"/)
  assert.match(source, /class="mind-map-control-pill is-tools"[\s\S]*:class="\{ 'is-menu-open': isExportMenuOpen \}"/)
  assert.match(source, /class="[^"]*mind-map-export-trigger/)
  assert.match(source, /class="mind-map-export-menu"/)
  assert.match(source, /role="menu"/)
  assert.match(source, /role="menuitem"/)
  assert.match(source, /aria-haspopup="menu"/)
  assert.match(source, /aria-label="导出思维导图"/)
  assert.match(source, /导出 SVG/)
  assert.match(source, /导出 PNG/)
  assert.match(source, /导出 PDF/)
  assert.match(source, /展开思维导图/)
  assert.match(source, /aria-modal/)
  assert.match(source, /event\.key\s*!==\s*'Escape'/)
  assert.match(source, /fitMap/)
  assert.match(source, /saveSvg/)
  assert.match(source, /savePng/)
  assert.match(source, /savePdf/)
  assert.match(source, /openPrintWindow/)
  assert.match(source, /XMLSerializer/)
  assert.match(source, /toBlob/)
  assert.match(source, /printWindow\.document\.write/)
  assert.match(source, /printWindow\.document\.close\(\)/)
  assert.match(source, /printWindow\.print\(\)/)
  assert.match(source, /@page/)
  assert.doesNotMatch(source, /application\/pdf/)
  assert.doesNotMatch(source, /buildPdfFromJpeg/)
  assert.doesNotMatch(source, /canvasToJpegBlob/)
  assert.match(source, /getExportTextColor/)
  assert.doesNotMatch(source, /aria-label="保存 SVG"/)
  assert.doesNotMatch(source, /aria-label="保存 PNG"/)
  assert.match(source, /--mind-map-surface-bg:/)
  assert.match(source, /--mind-map-surface-shadow:/)
  assert.match(source, /--mind-map-pill-bg:\s*var\(--aya-nav-tab-bg/)
  assert.match(source, /--mind-map-pill-border:\s*var\(--aya-nav-tab-border/)
  assert.match(source, /--mind-map-menu-bg:\s*var\(--aya-nav-menu-bg/)
  assert.match(source, /--mind-map-square-size:\s*28px;/)
  assert.match(source, /--mind-map-modal-inset:/)
  assert.match(source, /--mind-map-safe-pad-x:/)
  assert.match(source, /--mind-map-safe-pad-y:/)
  assert.match(source, /fitRatio:\s*0\.9/)
  assert.match(source, /function alignInvisibleRootHeadings/)
  assert.match(source, /headingY\s*=\s*0/)
  assert.match(source, /patchRelayout\(markmap\)/)
  assert.match(source, /padding:\s*var\(--mind-map-safe-pad-y\)\s+var\(--mind-map-safe-pad-x\)/)
  assert.match(source, /min-height:\s*calc\(var\(--mind-map-height\)\s*\+\s*46px\)/)
  assert.match(source, /\.mind-map :deep\(\.markmap-node \.markmap-foreign\)\s*{[^}]*overflow:\s*visible;/s)
  assert.match(source, /\.mind-map :deep\(\.katex \.katex-mathml\)\s*{[^}]*display:\s*none;/s)
  assert.match(source, /\.markmap-foreign\{overflow:visible;color:\$\{getExportTextColor\(\)\}\}/)
  assert.match(source, /\.katex \.katex-mathml\{display:none\}/)
  assert.match(source, /--mind-map-pill-frosted-blur:\s*var\(--aya-nav-tab-frosted-blur/)
  assert.match(source, /--mind-map-pill-soft-frosted-blur:\s*var\(--aya-nav-pill-frosted-blur/)
  assert.match(source, /--mind-map-menu-frosted-blur:\s*var\(--aya-nav-menu-frosted-blur/)
  assert.doesNotMatch(source, /--mind-map-[\w-]*(?:glass|highlight)/)
  assert.match(source, /\.mind-map-control-pill\s*{[^}]*border-radius:\s*999px;[^}]*backdrop-filter:\s*var\(--mind-map-pill-frosted-blur\)/s)
  assert.match(source, /\.mind-map-control\.is-square\s*{[^}]*width:\s*var\(--mind-map-square-size\);[^}]*min-width:\s*var\(--mind-map-square-size\);[^}]*height:\s*var\(--mind-map-square-size\);/s)
  assert.match(source, /\.mind-map-control-symbol\s*{[^}]*height:\s*var\(--mind-map-square-symbol-size\);[^}]*line-height:\s*1;/s)
  assert.match(source, /\.mind-map-header\s*{[^}]*position:\s*relative;[^}]*z-index:\s*auto;/s)
  assert.match(source, /\.mind-map-controls\s*{[^}]*margin-left:\s*auto;/s)
  assert.match(source, /\.mind-map-header\.has-no-title\s+\.mind-map-controls\s*{[^}]*justify-content:\s*flex-end;/s)
  assert.doesNotMatch(source, /\.mind-map-control-pill\s*{[^}]*isolation:\s*isolate;/s)
  assert.match(source, /\.mind-map-control-pill\.is-tools\.is-menu-open\s*{[^}]*z-index:\s*40;/s)
  assert.match(source, /\.mind-map-export\s*{[^}]*z-index:\s*40;/s)
  assert.match(source, /\.mind-map-surface\s*{[^}]*z-index:\s*2;/s)
  assert.match(source, /\.mind-map-export-menu\s*{[^}]*position:\s*absolute;[^}]*z-index:\s*30;[^}]*border-radius:\s*16px;[^}]*background:\s*var\(--mind-map-menu-bg\)/s)
  assert.match(source, /enter-active-class="animate__animated animate__fadeInDown mind-map-menu-motion"/)
  assert.match(source, /leave-active-class="animate__animated animate__fadeOutUp mind-map-menu-motion"/)
  assert.match(source, /animate__zoomIn/)
  assert.match(source, /animate__zoomOut/)
  assert.match(source, /\.mind-map\.is-modal-active\s+\.mind-map-backdrop\s*{[^}]*position:\s*fixed;[^}]*backdrop-filter:\s*blur\(/s)
  assert.match(source, /\.mind-map\.is-modal-active\s+\.mind-map-panel\s*{[^}]*position:\s*fixed;[^}]*inset:\s*var\(--mind-map-modal-inset\)/s)
  assert.match(source, /\.mind-map\.is-modal-active\s+\.mind-map-panel\s*{[^}]*width:\s*auto;/s)
  assert.match(source, /:global\(html\.mind-map-modal-open\)/)
  assert.doesNotMatch(source, /--mind-map-border:[^;\n]*var\(--vp-c-brand-1\)/)
  assert.match(source, /--mind-map-surface-bg:\s*rgb\(19 20 23 \/ 96%\)/)
})

test('LyricCard exposes a top-right album cover that leaves room for furigana controls', () => {
  assert.equal(fs.existsSync(lyricCardPath), true)

  const source = fs.readFileSync(lyricCardPath, 'utf8')

  assert.match(source, /albumCover\?:\s*string/)
  assert.match(source, /albumCoverAlt\?:\s*string/)
  assert.match(source, /albumCoverPosition\?:\s*string/)
  assert.match(source, /class="lyric-card-top-rail"/)
  assert.match(source, /class="lyric-card-album-cover-frame"/)
  assert.match(source, /class="lyric-card-album-cover"/)
  assert.match(source, /loading="lazy"/)
  assert.match(source, /decoding="async"/)
  assert.match(source, /'has-album-cover':\s*hasAlbumCover/)
  assert.match(source, /'has-furigana-control':\s*hasFuriganaControl/)
})

test('LyricCard styles the album cover as the rightmost rounded rectangle', () => {
  const source = fs.readFileSync(lyricCardPath, 'utf8')

  assert.match(source, /--lyric-card-album-cover-size:\s*136px/)
  assert.match(source, /--lyric-card-album-cover-body-min-height:\s*calc\(var\(--lyric-card-album-cover-size\)\s*\+\s*64px\)/)
  assert.match(source, /\.lyric-card-top-rail\s*{[^}]*position:\s*absolute;[^}]*right:\s*0;/s)
  assert.match(source, /\.lyric-card-top-rail\s*{[^}]*display:\s*flex;/s)
  assert.match(source, /\.lyric-card-album-cover-frame\s*{[^}]*aspect-ratio:\s*1;[^}]*border-radius:\s*8px;[^}]*overflow:\s*hidden;/s)
  assert.match(source, /\.lyric-card-album-cover\s*{[^}]*object-fit:\s*cover;/s)
  assert.match(source, /\.lyric-card\.has-album-cover\.has-furigana-control\s*{[^}]*--lyric-card-top-rail-space:/s)
  assert.match(source, /\.lyric-card\.has-album-cover\s+\.lyric-card-body\s*{[^}]*min-height:\s*var\(--lyric-card-album-cover-body-min-height\)/s)
  assert.match(source, /\.lyric-card-header\s*{[^}]*grid-column:\s*2;/s)
  assert.match(source, /--lyric-card-album-cover-size:\s*112px/)
})

test('LyricCover reuses LyricCard with a CSS-only frosted cover reveal', () => {
  assert.equal(fs.existsSync(lyricCoverPath), true)

  const source = fs.readFileSync(lyricCoverPath, 'utf8')

  assert.match(source, /import LyricCard from ['"]\.\/LyricCard\.vue['"]/)
  assert.match(source, /image\?:\s*string/)
  assert.match(source, /src\?:\s*string/)
  assert.match(source, /cover\?:\s*string/)
  assert.match(source, /textTone\?:\s*TextTone/)
  assert.match(source, /<LyricCard/)
  assert.match(source, /<slot \/>/)
  assert.match(source, /class="lyric-cover-frame"/)
  assert.match(source, /class="lyric-cover-backdrop"/)
  assert.match(source, /class="lyric-cover-glass"/)
  assert.match(source, /class="lyric-cover-content"/)
  assert.match(source, /backdrop-filter:\s*blur\(18px\)\s*saturate\(1\.12\)/)
  assert.match(source, /filter:\s*blur\(22px\)\s*saturate\(1\.08\)/)
  assert.match(source, /\.lyric-cover-frame:hover\s+\.lyric-cover-content,/)
  assert.match(source, /opacity\s+0\.28s\s+ease/)
  assert.match(source, /object-fit:\s*contain/)
  assert.match(source, /--lyric-cover-text-1:\s*rgb\(255 255 255 \/ 94%\)/)
  assert.match(source, /--lyric-cover-text-1:\s*rgb\(33 36 46 \/ 96%\)/)
  assert.match(source, /:global\(\.dark \.lyric-cover\)\s*{[^}]*--lyric-cover-glass-border:\s*transparent;/s)
  assert.match(source, /@media \(prefers-reduced-motion:\s*reduce\)/)
})

test('SongCard keeps the cover one third wide with a flat frosted floating card style', () => {
  const source = fs.readFileSync(songCardPath, 'utf8')

  assert.match(source, /grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(0,\s*2fr\)/)
  assert.match(source, /min-height:\s*156px/)
  assert.match(source, /aspect-ratio:\s*1/)
  assert.match(source, /border-radius:\s*8px/)
  assert.doesNotMatch(source, /--song-card-[\w-]*highlight/)
  assert.match(source, /\.song-card\s*{[^}]*background:\s*var\(--song-card-bg\);/s)
  assert.match(source, /\.song-card:hover\s*{[^}]*background:\s*color-mix\(in srgb,\s*var\(--vp-c-brand-1\)\s*7%,\s*var\(--song-card-bg\)\);/s)
  assert.match(source, /--song-card-depth-shadow:/)
  assert.match(source, /\.song-card:hover/)
  assert.match(source, /transform:\s*translate3d\(0,\s*-2px,\s*0\)/)
  assert.match(source, /class="song-card-meta"/)
  assert.match(source, /class="song-card-preview"/)
  assert.match(source, /<Transition name="song-card-lyric" appear>/)
  assert.match(source, /v-if="shouldShowLyricPreview"/)
  assert.match(source, /:key="activeLyricKey"/)
  assert.match(source, /:class="activeLyricDensityClasses"/)
  assert.match(source, /class="song-card-preview-original"/)
  assert.match(source, /class="song-card-preview-next"/)
  assert.match(source, /class="song-card-preview-translation"/)
  assert.match(source, /aria-live="polite"/)
  assert.match(source, /usesNextOriginalPreview/)
  assert.match(source, /function nextOriginalText/)
  assert.match(source, /\.song-card\.is-playable\s+\.song-card-content\s*{[^}]*justify-content:\s*space-between;/s)
  assert.match(source, /\.song-card-preview\s*{[^}]*min-height:\s*66px;/s)
  assert.match(source, /\.song-card-preview-original,\n\.song-card-preview-next,\n\.song-card-preview-translation\s*{[^}]*overflow-wrap:\s*anywhere;/s)
  assert.match(source, /\.song-card-preview-original\s*{[^}]*-webkit-line-clamp:\s*2;/s)
  assert.match(source, /\.song-card-preview-next\s*{[^}]*-webkit-line-clamp:\s*2;/s)
  assert.match(source, /\.song-card-preview-next\s*{[^}]*color:\s*color-mix\(in srgb,\s*var\(--vp-c-text-2\)\s*68%,\s*transparent\)/s)
  assert.match(source, /\.song-card-preview-next\s*{[^}]*font-family:\s*var\(--song-card-serif\)/s)
  assert.match(source, /\.song-card-preview-translation\s*{[^}]*-webkit-line-clamp:\s*2;/s)
  assert.match(source, /\.song-card-preview-original\s*{[^}]*font-family:\s*var\(--song-card-serif\)/s)
  assert.match(source, /\.song-card-preview-translation\s*{[^}]*font-family:\s*var\(--song-card-serif-sc\)/s)
  assert.match(source, /\.song-card-preview-translation\s*{[^}]*font-language-override:\s*['"]ZHS['"]/s)
  assert.match(source, /\.song-card-preview-lines\.is-original-compact\s+\.song-card-preview-original\s*{[^}]*font-size:\s*0\.73rem;/s)
  assert.match(source, /\.song-card-preview-lines\.is-next-compact\s+\.song-card-preview-next\s*{[^}]*font-size:\s*0\.65rem;/s)
  assert.match(source, /\.song-card-preview-lines\.is-translation-compact\s+\.song-card-preview-translation\s*{[^}]*font-size:\s*0\.65rem;/s)
  assert.match(source, /\.song-card-lyric-enter-from\s*{[^}]*transform:\s*translateY\(10px\)/s)
  assert.match(source, /\.song-card-lyric-leave-to\s*{[^}]*transform:\s*translateY\(-10px\)/s)
  assert.match(source, /\.song-card-player\s*{[^}]*grid-template-columns:\s*34px\s+minmax\(0,\s*1fr\)\s+34px/s)
  assert.match(source, /\.song-card-player\s*{[^}]*margin-top:\s*auto;/s)
  assert.match(source, /\.song-card-play-button\s*{[^}]*width:\s*34px;/s)
  assert.match(source, /class="song-card-volume-popover"/)
  assert.match(source, /\.song-card-volume:hover\s+\.song-card-volume-popover,/)
  assert.match(source, /\.song-card-volume:focus-within\s+\.song-card-volume-popover\s*{[^}]*opacity:\s*1;/s)
})

test('documents SongCard in the lab and sidebar', () => {
  assert.equal(fs.existsSync(songCardDocPath), true)

  const docSource = fs.readFileSync(songCardDocPath, 'utf8')
  const readmeSource = fs.readFileSync(labReadmePath, 'utf8')
  const configSource = fs.readFileSync(configPath, 'utf8')

  assert.match(docSource, /# SongCard/)
  assert.match(docSource, /<SongCard/)
  assert.match(docSource, /## 使用方法/)
  assert.match(docSource, /## 播放功能/)
  assert.match(docSource, /song-id/)
  assert.match(docSource, /netease-url/)
  assert.match(docSource, /audio-url/)
  assert.match(docSource, /lyric-preview/)
  assert.match(docSource, /translation-preview/)
  assert.match(docSource, /translated-lyrics/)
  assert.match(docSource, /api-base/)
  assert.match(docSource, /NeteaseMiniPlayer/)
  assert.match(docSource, /封面会优先从网易云歌曲详情中获取/)
  assert.match(docSource, /cover.*兜底/)
  assert.match(docSource, /歌词预览的字体规则参考/)
  assert.match(docSource, /播放开始前，歌词预览区域保持留白/)
  assert.match(docSource, /旧句向上淡出，新句从下方向上淡入/)
  assert.match(readmeSource, /\[SongCard.*\]\(\.\/song-card\)/)
  assert.match(configSource, /text:\s*['"]SongCard['"],\s*link:\s*['"]\/others\/lab\/song-card['"]/)
})

test('documents LyricCover in the lab and sidebar', () => {
  assert.equal(fs.existsSync(lyricCoverDocPath), true)
  assert.equal(fs.existsSync(path.join(root, 'docs/others/lab/lyric-cover.attachments/demo-cover.jpg')), true)

  const docSource = fs.readFileSync(lyricCoverDocPath, 'utf8')
  const readmeSource = fs.readFileSync(labReadmePath, 'utf8')
  const configSource = fs.readFileSync(configPath, 'utf8')

  assert.match(docSource, /# LyricCover/)
  assert.match(docSource, /<LyricCover/)
  assert.match(docSource, /image="lyric-cover\.attachments\/demo-cover\.jpg"/)
  assert.match(docSource, /text-tone="light".*text-tone="dark"/s)
  assert.match(docSource, /CourseIndex/)
  assert.match(docSource, /第一个 `LyricCover`/)
  assert.match(readmeSource, /\[LyricCover.*\]\(\.\/lyric-cover\)/)
  assert.match(configSource, /text:\s*['"]LyricCover['"],\s*link:\s*['"]\/others\/lab\/lyric-cover['"]/)
})

test('documents MindMap in the lab and sidebar', () => {
  assert.equal(fs.existsSync(mindMapDocPath), true)

  const docSource = fs.readFileSync(mindMapDocPath, 'utf8')
  const readmeSource = fs.readFileSync(labReadmePath, 'utf8')
  const configSource = fs.readFileSync(configPath, 'utf8')
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
  const devDeps = packageJson.devDependencies ?? {}

  assert.match(docSource, /# MindMap/)
  assert.match(docSource, /```mindmap/)
  assert.match(docSource, /CPS 复习总览/)
  assert.match(docSource, /保存 SVG/)
  assert.match(docSource, /保存 PNG/)
  assert.match(docSource, /保存 PDF/)
  assert.match(docSource, /浏览器打印/)
  assert.match(docSource, /默认全部展开/)
  assert.match(docSource, /L\(y\)=k\(y-m\)\^2/)
  assert.match(docSource, /```mindmap\n# 无标题思维导图/)
  assert.match(readmeSource, /\[MindMap.*\]\(\.\/mindmap\)/)
  assert.match(configSource, /text:\s*['"]MindMap['"],\s*link:\s*['"]\/others\/lab\/mindmap['"]/)
  assert.equal(typeof devDeps['markmap-lib'], 'string')
  assert.equal(typeof devDeps['markmap-view'], 'string')
})

test('documents LyricCard album covers in the lab', () => {
  assert.equal(fs.existsSync(lyricCardDocPath), true)

  const docSource = fs.readFileSync(lyricCardDocPath, 'utf8')

  assert.match(docSource, /夢が僕らの太陽さ/)
  assert.match(docSource, /どんな時\(とき\)も夢\(ゆめ\)が僕\(ぼく\)らの太陽\(たいよう\)さ/)
  assert.match(docSource, /任凭狂风作乱暴雨作势/)
  assert.match(docSource, /也始终牢记 有一道光一直在照耀着我们/)
  assert.match(docSource, /\.\.\/songs\/yume-taiyou\.attachments\/cover\.JPG/)
  assert.match(docSource, /album-cover=/)
  assert.match(docSource, /album-cover-alt/)
  assert.match(docSource, /album-cover-position/)
  assert.match(docSource, /右上角/)
  assert.match(docSource, /注音按钮.*左/)
  assert.match(docSource, /歌词.*较少.*自动.*最低高度/)
})

test('documents requested song examples in the LyricCard lab', () => {
  const docSource = fs.readFileSync(lyricCardDocPath, 'utf8')

  assert.match(docSource, /I Really Want to Stay at Your House/)
  assert.match(docSource, /Rosa Walton & Hallie Coggins/)
  assert.match(docSource, /title="I Really Want to Stay at Your House"[\s\S]*title-style="italic"/)
  assert.match(docSource, /Because I miss you all the time/)
  assert.match(docSource, /因为我却时刻思念着你/)
  assert.match(docSource, /Мёртвый вечер/)
  assert.match(docSource, /мой друг магнитофон/)
  assert.doesNotMatch(docSource, /Paper Moon Signal/)
  assert.doesNotMatch(docSource, /Дорога к дождю/)
})
