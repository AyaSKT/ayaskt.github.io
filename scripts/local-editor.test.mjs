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
  assert.equal(typeof plugin.load, 'function')
})

test('local editor plugin is only registered during dev commands', () => {
  const configSource = fs.readFileSync(path.join(root, 'docs/.vitepress/config.mts'), 'utf8')
  // V6.11.1 起 dev 插件列表同时包含时间线配置插件，断言只锁定
  // 「整个 plugins 数组由 isDevCommand 门控，且生产构建为空数组」。
  assert.match(configSource, /plugins:\s*isDevCommand\s*\?[\s\S]*?createLocalMarkdownEditorPlugin\(\)[\s\S]*?:\s*\[\]/)
})

test('local editor host is wired into doc pages without eager wangEditor imports', () => {
  const layoutSource = fs.readFileSync(myLayoutPath, 'utf8')
  const hostSource = fs.readFileSync(hostPath, 'utf8')
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(layoutSource, /const LocalEditorHost = import\.meta\.env\.DEV/)
  assert.match(layoutSource, /defineAsyncComponent\(\(\) => import\(['"]\.\/LocalEditorHost\.vue['"]\)\)/)
  assert.match(layoutSource, /<LocalEditorHost v-if="LocalEditorHost" \/>/)
  assert.match(hostSource, /await import\(['"]\.\/LocalMarkdownEditor\.vue['"]\)/)
  assert.match(hostSource, /LocalEditorNewNoteDialog/)
  assert.match(hostSource, /新建/)
  assert.doesNotMatch(hostSource, /@wangeditor\/editor/)
  assert.match(editorSource, /@wangeditor\/editor-for-vue/)
  assert.match(editorSource, /@wangeditor\/editor\/dist\/css\/style\.css/)
})

test('local editor API exposes draft, create-note and sidebar endpoints', () => {
  const configSource = fs.readFileSync(path.join(root, 'docs/.vitepress/config.mts'), 'utf8')

  assert.match(configSource, /url\.pathname === `\$\{localEditorApiPrefix\}\/asset`/)
  assert.match(configSource, /url\.pathname === `\$\{localEditorApiPrefix\}\/draft`/)
  assert.match(configSource, /url\.pathname === `\$\{localEditorApiPrefix\}\/sidebar`/)
  assert.match(configSource, /req\.method === 'POST'\)/)
  assert.match(configSource, /setLocalEditorDraft/)
  assert.match(configSource, /clearLocalEditorDraft/)
  assert.match(configSource, /appendSidebarItem/)
})

test('local editor keeps markdown source as the saved content path', () => {
  const editorSource = fs.readFileSync(editorPath, 'utf8')
  const registrySource = fs.readFileSync(path.join(root, 'docs/.vitepress/local-editor/registry.mjs'), 'utf8')

  assert.match(editorSource, /v-model="source"/)
  assert.match(editorSource, /body:\s*JSON\.stringify\(\{[\s\S]*content:\s*source\.value/s)
  assert.match(editorSource, /<iframe[\s\S]*class="local-markdown-editor-frame"/)
  assert.match(editorSource, /local-editor\/registry\.mjs/)
  assert.match(registrySource, /<LyricCard/)
  assert.match(registrySource, /::: stem/)
  assert.match(registrySource, /mindmap/)
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

  assert.match(editorSource, /type EditorTab = 'markdown' \| 'rich' \| 'frontmatter'/)
  assert.match(editorSource, /const activeEditorTab = ref<EditorTab>\('markdown'\)/)
  assert.match(editorSource, /class="local-markdown-editor-left"/)
  assert.match(editorSource, /class="local-markdown-editor-preview"/)
  assert.match(editorSource, /grid-template-columns:\s*minmax\(360px,\s*1fr\)\s+minmax\(360px,\s*1fr\)/)
  assert.match(editorSource, /role="tablist"/)
  assert.match(editorSource, /v-show="activeEditorTab === 'markdown'"/)
  assert.match(editorSource, /v-show="activeEditorTab === 'rich'"/)
  assert.match(editorSource, /v-show="activeEditorTab === 'frontmatter'"/)
  assert.match(editorSource, /livePreviewEnabled/)
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
  assert.match(editorSource, /@load="handlePreviewReady"/)
  assert.match(editorSource, /previewWindow\.scrollTo/)
  assert.match(editorSource, /\/__local-editor__\/draft/)
})

test('local editor binds markdown and preview scroll positions', () => {
  const editorSource = fs.readFileSync(editorPath, 'utf8')

  assert.match(editorSource, /scrollSyncEnabled/)
  assert.match(editorSource, /buildScrollAnchorPoints/)
  assert.match(editorSource, /handleEditorScroll/)
  assert.match(editorSource, /handlePreviewScroll/)
  assert.match(editorSource, /@scroll="handleEditorScroll"/)
  assert.match(editorSource, /interpolateSourceToPreview/)
  assert.match(editorSource, /interpolatePreviewToSource/)
})

test('local editor registry can build lyric and container snippets', async () => {
  const { buildRegistrySnippet } = await import('../docs/.vitepress/local-editor/registry.mjs')

  const lyric = buildRegistrySnippet('lyric-card', {
    title: '测试曲',
    artist: '作者',
    lang: 'zh',
    lines: ['原文|译文'],
  })
  assert.match(lyric, /<LyricCard/)
  assert.match(lyric, /translation="译文"/)

  const example = buildRegistrySnippet('example', {
    stem: '题干',
    solution: '解答',
  })
  assert.match(example, /::: stem/)
  assert.match(example, /::: solution/)
  assert.doesNotMatch(example, /::: example/)
})

test('local editor sidebar patcher appends items into config blocks', async () => {
  const { appendSidebarItem } = await import('../docs/.vitepress/local-editor/sidebar-patcher.mjs')
  const sample = `sidebar: {
      '/Y3S2/DSP/': [
        {
          text: '数字信号处理 DSP 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/DSP/DSP-README.md' },
          ],
        },
      ],
    }`

  const patched = appendSidebarItem(sample, {
    prefix: '/Y3S2/DSP/',
    text: '12 新章节',
    link: '/Y3S2/DSP/DSP Chapter 12',
  })

  assert.equal(patched.ok, true)
  assert.equal(patched.changed, true)
  assert.match(patched.content, /'\/Y3S2\/DSP\/DSP Chapter 12'/)
})
