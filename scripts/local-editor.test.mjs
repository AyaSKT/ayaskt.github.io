import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const myLayoutPath = path.join(root, 'docs/.vitepress/theme/components/MyLayout.vue')
const hostPath = path.join(root, 'docs/.vitepress/theme/components/LocalEditorHost.vue')
const editorPath = path.join(root, 'docs/.vitepress/theme/components/LocalMarkdownEditor.vue')

test('local editor API resolves only markdown files inside docs', async () => {
  const { resolveLocalEditorMarkdownPath } = await import('../docs/.vitepress/config.mts')

  const valid = resolveLocalEditorMarkdownPath('Y3S2/DSP/DSP Chapter 4.md')
  assert.equal(valid.ok, true)
  assert.equal(valid.relativePath, 'Y3S2/DSP/DSP Chapter 4.md')
  assert.match(valid.filePath, /docs[\\/]Y3S2[\\/]DSP[\\/]DSP Chapter 4\.md$/)

  assert.equal(resolveLocalEditorMarkdownPath('../package.json').ok, false)
  assert.equal(resolveLocalEditorMarkdownPath('/../package.json').ok, false)
  assert.equal(resolveLocalEditorMarkdownPath('.vitepress/config.mts').ok, false)
  assert.equal(resolveLocalEditorMarkdownPath('public/favicon.ico').ok, false)
  assert.equal(resolveLocalEditorMarkdownPath('Y3S2/DSP/image.png').ok, false)
})

test('local editor resolves pasted images into article attachment folders', async () => {
  const { resolveLocalEditorAttachmentPath } = await import('../docs/.vitepress/config.mts')
  const fixedDate = new Date(2026, 5, 19, 12, 34, 56)

  const generic = resolveLocalEditorAttachmentPath(
    'Y3S2/CCD/Review/Review 1.md',
    'image.png',
    'image/png',
    fixedDate,
  )
  assert.equal(generic.ok, true)
  assert.equal(
    generic.relativePath,
    'Y3S2/CCD/Review/Review 1.attachments/clipboard-20260619-123456.png',
  )
  assert.equal(generic.markdownPath, 'Review 1.attachments/clipboard-20260619-123456.png')

  const named = resolveLocalEditorAttachmentPath(
    'Y3S2/DSP/DSP Chapter 4.md',
    'Screenshot Demo.JPG',
    'image/jpeg',
    fixedDate,
  )
  assert.equal(named.ok, true)
  assert.equal(named.markdownPath, 'DSP Chapter 4.attachments/screenshot-demo.jpg')

  assert.equal(
    resolveLocalEditorAttachmentPath('Y3S2/DSP/DSP Chapter 4.md', 'vector.svg', 'image/svg+xml').ok,
    false,
  )
})

test('local editor Vite middleware is serve-only', async () => {
  const { createLocalMarkdownEditorPlugin } = await import('../docs/.vitepress/config.mts')
  const plugin = createLocalMarkdownEditorPlugin()

  assert.equal(plugin.name, 'gp-blogs-local-markdown-editor')
  assert.equal(plugin.apply, 'serve')
  assert.equal(typeof plugin.configureServer, 'function')
})

test('local editor host is wired into doc pages without eager wangEditor imports', () => {
  const layoutSource = fs.readFileSync(myLayoutPath, 'utf8')
  const hostSource = fs.readFileSync(hostPath, 'utf8')
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(layoutSource, /const LocalEditorHost = import\.meta\.env\.DEV/)
  assert.match(layoutSource, /defineAsyncComponent\(\(\) => import\(['"]\.\/LocalEditorHost\.vue['"]\)\)/)
  assert.match(layoutSource, /<LocalEditorHost v-if="LocalEditorHost" \/>/)
  assert.match(hostSource, /await import\(['"]\.\/LocalMarkdownEditor\.vue['"]\)/)
  assert.doesNotMatch(hostSource, /@wangeditor\/editor/)
  assert.match(editorSource, /@wangeditor\/editor-for-vue/)
  assert.match(editorSource, /@wangeditor\/editor\/dist\/css\/style\.css/)
})

test('local editor API exposes a local-only pasted image endpoint', () => {
  const configSource = fs.readFileSync(path.join(root, 'docs/.vitepress/config.mts'), 'utf8')

  assert.match(configSource, /url\.pathname === `\$\{localEditorApiPrefix\}\/asset`/)
  assert.match(configSource, /resolveLocalEditorAttachmentPath/)
  assert.match(configSource, /fs\.promises\.mkdir\(resolved\.attachmentDir,\s*\{ recursive: true \}\)/)
  assert.match(configSource, /uniqueLocalEditorAssetPath/)
  assert.match(configSource, /markdownPath/)
  assert.match(configSource, /本地编辑器附件接口仅支持 POST/)
})

test('local editor keeps markdown source as the saved content path', () => {
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(editorSource, /v-model="source"/)
  assert.match(editorSource, /body:\s*JSON\.stringify\(\{[\s\S]*content:\s*source\.value/s)
  assert.match(editorSource, /<iframe[\s\S]*class="local-markdown-editor-frame"/)
  assert.match(editorSource, /<LyricCard/)
  assert.match(editorSource, /::: example/)
  assert.match(editorSource, /```mindmap/)
})

test('local editor can paste clipboard images into markdown source', () => {
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(editorSource, /@paste\.capture="handleImagePaste"/)
  assert.match(editorSource, /function clipboardImageFiles\(event: ClipboardEvent\)/)
  assert.match(editorSource, /item\.type\.startsWith\('image\/'\)/)
  assert.match(editorSource, /new FileReader\(\)/)
  assert.match(editorSource, /fetch\('\/__local-editor__\/asset'/)
  assert.match(editorSource, /function markdownImagePath\(value: string\)/)
  assert.match(editorSource, /value\.replace\(\/ \/g,\s*'%20'\)/)
  assert.match(editorSource, /function normalizeAttachmentImagePaths\(content: string\)/)
  assert.match(editorSource, /\.attachments\\\/\[\^\)\\n\]\*/)
  assert.match(editorSource, /normalizeSourceAttachmentImagePaths\(\)/)
  assert.match(editorSource, /markdownImagePath\(uploaded\.markdownPath\)/)
  assert.match(editorSource, /已插入图片，记得保存文章/)
})

test('local editor uses two columns with switchable left editor modes', () => {
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(editorSource, /type EditorTab = 'markdown' \| 'rich'/)
  assert.match(editorSource, /const activeEditorTab = ref<EditorTab>\('markdown'\)/)
  assert.match(editorSource, /class="local-markdown-editor-left"/)
  assert.match(editorSource, /class="local-markdown-editor-preview"/)
  assert.match(editorSource, /grid-template-columns:\s*minmax\(360px,\s*1fr\)\s+minmax\(360px,\s*1fr\)/)
  assert.match(editorSource, /role="tablist"/)
  assert.match(editorSource, /v-show="activeEditorTab === 'markdown'"/)
  assert.match(editorSource, /v-show="activeEditorTab === 'rich'"/)
  assert.doesNotMatch(editorSource, /class="local-markdown-editor-side"/)
})

test('local editor preserves preview scroll position across refreshes', () => {
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(editorSource, /interface PreviewScrollState/)
  assert.match(editorSource, /const previewFrame = ref<HTMLIFrameElement \| null>\(null\)/)
  assert.match(editorSource, /const pendingPreviewScroll = ref<PreviewScrollState \| null>\(null\)/)
  assert.match(editorSource, /function getPreviewScrollState/)
  assert.match(editorSource, /function restorePreviewScroll/)
  assert.match(editorSource, /pendingPreviewScroll\.value = getPreviewScrollState\(\)/)
  assert.match(editorSource, /@load="restorePreviewScroll"/)
  assert.match(editorSource, /previewWindow\.scrollTo/)
})
