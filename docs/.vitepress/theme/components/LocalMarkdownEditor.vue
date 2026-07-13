<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { localEditorRegistry } from '../../local-editor/registry.mjs'
import LocalEditorFrontmatterPanel from './LocalEditorFrontmatterPanel.vue'
import LocalEditorInsertDialog from './LocalEditorInsertDialog.vue'

interface ArticlePayload {
  path: string
  content: string
  mtimeMs: number
  title: string
}

interface AssetPayload {
  path: string
  markdownPath: string
  fileName: string
}

interface PreviewScrollState {
  left: number
  top: number
  maxLeft: number
  maxTop: number
  ratioLeft: number
  ratioTop: number
  editorTop?: number
  editorLine?: number
}

interface ScrollAnchorPoint {
  sourceLine: number
  previewY: number
}

type EditorTab = 'markdown' | 'rich' | 'frontmatter'

const props = defineProps<{
  relativePath: string
  pagePath: string
}>()

const emit = defineEmits<{
  close: []
}>()

const editorRef = shallowRef<IDomEditor | null>(null)
const sourceTextarea = ref<HTMLTextAreaElement | null>(null)
const previewFrame = ref<HTMLIFrameElement | null>(null)

const source = ref('')
const savedSource = ref('')
const loadedPath = ref('')
const title = ref('')
const mtimeMs = ref<number | null>(null)
const loading = ref(false)
const saving = ref(false)
const isUploadingImage = ref(false)
const errorText = ref('')
const statusText = ref('')
const previewNonce = ref(0)
const richHtml = ref('<p></p>')
const activeEditorTab = ref<EditorTab>('markdown')
const pendingPreviewScroll = ref<PreviewScrollState | null>(null)
const insertDialogOpen = ref(false)
const insertDialogEntryId = ref('')
const livePreviewEnabled = ref(true)
const draftSyncTimer = ref<number | null>(null)
const previewRefreshTimer = ref<number | null>(null)
const isSyncingDraft = ref(false)
const scrollSyncEnabled = ref(true)
const scrollAnchorPoints = ref<ScrollAnchorPoint[]>([])
const scrollSyncLock = ref<'editor' | 'preview' | null>(null)
let scrollSyncReleaseTimer: number | null = null
let previewScrollHandler: (() => void) | null = null

const editorMode = 'default'
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    'uploadImage',
    'insertVideo',
    'uploadVideo',
    'fullScreen',
  ],
}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '写普通内容片段',
  scroll: false,
}

const quickInserts = computed(() => localEditorRegistry.filter((entry) => !entry.dialog))
const dialogInserts = computed(() => {
  const groups = new Map<string, typeof localEditorRegistry>()
  for (const entry of localEditorRegistry.filter((item) => item.dialog)) {
    const bucket = groups.get(entry.category) ?? []
    bucket.push(entry)
    groups.set(entry.category, bucket)
  }
  return [...groups.entries()]
})

const isDirty = computed(() => source.value !== savedSource.value)
const displayTitle = computed(() => title.value || loadedPath.value || props.relativePath)
const lineCount = computed(() => source.value ? source.value.split(/\r\n|\r|\n/).length : 0)
const sourceBytes = computed(() => new Blob([source.value]).size)
const previewLabel = computed(() => {
  if (!livePreviewEnabled.value) return isDirty.value ? '上次保存' : '当前文件'
  if (isSyncingDraft.value) return '同步预览'
  return isDirty.value ? '实时草稿' : '当前文件'
})

async function syncDraftPreview() {
  if (!loadedPath.value || !livePreviewEnabled.value) return

  isSyncingDraft.value = true
  try {
    normalizeSourceAttachmentImagePaths()
    await fetch('/__local-editor__/draft', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: loadedPath.value,
        content: source.value,
      }),
    })
    refreshPreview({ preserveScroll: true })
  } catch {
    // 预览失败时保留编辑体验，不阻断写作
  } finally {
    isSyncingDraft.value = false
  }
}

function scheduleDraftPreview() {
  if (!livePreviewEnabled.value || !loadedPath.value) return

  if (draftSyncTimer.value) window.clearTimeout(draftSyncTimer.value)
  draftSyncTimer.value = window.setTimeout(() => {
    draftSyncTimer.value = null
    void syncDraftPreview()
  }, 420)

  if (previewRefreshTimer.value) window.clearTimeout(previewRefreshTimer.value)
  previewRefreshTimer.value = window.setTimeout(() => {
    previewRefreshTimer.value = null
  }, 420)
}

async function clearDraftPreview() {
  if (!loadedPath.value) return
  await fetch(
    `/__local-editor__/draft?path=${encodeURIComponent(loadedPath.value)}`,
    { method: 'DELETE', headers: { Accept: 'application/json' } },
  ).catch(() => undefined)
}

const previewSrc = computed(() => {
  const pagePath = props.pagePath || '/'
  const joiner = pagePath.includes('?') ? '&' : '?'
  return `${pagePath}${joiner}localEditorPreview=${previewNonce.value}`
})

async function readJson<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = typeof payload?.error === 'string'
      ? payload.error
      : `请求失败：${response.status}`
    throw new Error(message)
  }
  return payload as T
}

async function loadArticle(skipDirtyCheck = false) {
  if (!skipDirtyCheck && isDirty.value) {
    const confirmed = window.confirm('当前内容尚未保存，确定重新载入吗？')
    if (!confirmed) return
  }

  loading.value = true
  errorText.value = ''

  try {
    const response = await fetch(
      `/__local-editor__/article?path=${encodeURIComponent(props.relativePath)}`,
      {
        headers: { Accept: 'application/json' },
      },
    )
    const payload = await readJson<ArticlePayload>(response)
    source.value = payload.content
    savedSource.value = payload.content
    loadedPath.value = payload.path
    title.value = payload.title
    mtimeMs.value = payload.mtimeMs
    statusText.value = '已载入'
    refreshPreview({ preserveScroll: !skipDirtyCheck })
    await nextTick()
    sourceTextarea.value?.focus()
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : '载入失败'
  } finally {
    loading.value = false
  }
}

async function saveArticle() {
  if (!loadedPath.value || saving.value || isUploadingImage.value) return

  normalizeSourceAttachmentImagePaths()
  saving.value = true
  errorText.value = ''

  try {
    const response = await fetch('/__local-editor__/article', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: loadedPath.value,
        content: source.value,
        mtimeMs: mtimeMs.value,
      }),
    })
    const payload = await readJson<Omit<ArticlePayload, 'content'>>(response)
    savedSource.value = source.value
    loadedPath.value = payload.path
    title.value = payload.title
    mtimeMs.value = payload.mtimeMs
    statusText.value = '已保存'
    await clearDraftPreview()
    refreshPreview()
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : '保存失败'
  } finally {
    saving.value = false
  }
}

function getPreviewScrollState(): PreviewScrollState | null {
  const previewWindow = previewFrame.value?.contentWindow
  const previewDocument = previewFrame.value?.contentDocument
  const scrollRoot = previewDocument?.scrollingElement ?? previewDocument?.documentElement
  if (!previewWindow || !scrollRoot) return null

  const maxLeft = Math.max(0, scrollRoot.scrollWidth - scrollRoot.clientWidth)
  const maxTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight)
  const left = previewWindow.scrollX || scrollRoot.scrollLeft || 0
  const top = previewWindow.scrollY || scrollRoot.scrollTop || 0
  const textarea = sourceTextarea.value

  return {
    left,
    top,
    maxLeft,
    maxTop,
    ratioLeft: maxLeft > 0 ? left / maxLeft : 0,
    ratioTop: maxTop > 0 ? top / maxTop : 0,
    editorTop: textarea?.scrollTop,
    editorLine: textarea ? getEditorFocusLine(textarea) : undefined,
  }
}

function normalizeHeadingText(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function parseSourceAnchors(content: string) {
  const lines = content.split(/\r\n|\r|\n/)
  const anchors: { line: number, text: string }[] = []

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/)
    if (match) {
      anchors.push({ line: index, text: match[2].trim() })
    }
  })

  return anchors
}

function getTextareaLineHeight(textarea: HTMLTextAreaElement) {
  const style = window.getComputedStyle(textarea)
  const lineHeight = Number.parseFloat(style.lineHeight)
  if (Number.isFinite(lineHeight) && lineHeight > 0) return lineHeight

  const fontSize = Number.parseFloat(style.fontSize) || 13
  return fontSize * 1.7
}

function getEditorFocusLine(textarea: HTMLTextAreaElement) {
  const lineHeight = getTextareaLineHeight(textarea)
  const paddingTop = Number.parseFloat(window.getComputedStyle(textarea).paddingTop) || 0
  return Math.max(0, Math.floor((textarea.scrollTop + paddingTop) / lineHeight))
}

function getPreviewContentElement(previewDocument: Document) {
  return previewDocument.querySelector('.vp-doc, .VPDoc .content, .content-container')
}

function getElementDocumentY(element: Element, previewWindow: Window) {
  const rect = element.getBoundingClientRect()
  return rect.top + previewWindow.scrollY
}

function findPreviewHeadingElement(previewDocument: Document, headingText: string) {
  const target = normalizeHeadingText(headingText)
  if (!target) return null

  const headings = previewDocument.querySelectorAll('.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6')
  for (const heading of headings) {
    const text = normalizeHeadingText(heading.textContent ?? '')
    if (text === target || text.includes(target) || target.includes(text)) {
      return heading
    }
  }

  return null
}

function buildScrollAnchorPoints() {
  const previewWindow = previewFrame.value?.contentWindow
  const previewDocument = previewFrame.value?.contentDocument
  if (!previewWindow || !previewDocument) {
    scrollAnchorPoints.value = []
    return
  }

  const content = getPreviewContentElement(previewDocument)
  if (!content) {
    scrollAnchorPoints.value = []
    return
  }

  const lines = source.value.split(/\r\n|\r|\n/)
  const points: ScrollAnchorPoint[] = [
    {
      sourceLine: 0,
      previewY: getElementDocumentY(content, previewWindow),
    },
  ]

  for (const anchor of parseSourceAnchors(source.value)) {
    const element = findPreviewHeadingElement(previewDocument, anchor.text)
    if (element) {
      points.push({
        sourceLine: anchor.line,
        previewY: getElementDocumentY(element, previewWindow),
      })
    }
  }

  const textarea = sourceTextarea.value
  const lineHeight = textarea ? getTextareaLineHeight(textarea) : 22
  const contentBottom = getElementDocumentY(content, previewWindow) + content.scrollHeight
  points.push({
    sourceLine: Math.max(0, lines.length - 1),
    previewY: Math.max(contentBottom - lineHeight, points[points.length - 1]?.previewY ?? 0),
  })

  scrollAnchorPoints.value = points
    .sort((left, right) => left.sourceLine - right.sourceLine)
    .filter((point, index, array) => index === 0 || point.sourceLine > array[index - 1].sourceLine)
}

function interpolateSourceToPreview(sourceLine: number, points: ScrollAnchorPoint[]) {
  if (!points.length) return 0
  if (sourceLine <= points[0].sourceLine) return points[0].previewY

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const next = points[index]
    if (sourceLine <= next.sourceLine) {
      const lineSpan = next.sourceLine - previous.sourceLine
      const ratio = lineSpan > 0 ? (sourceLine - previous.sourceLine) / lineSpan : 0
      return previous.previewY + ratio * (next.previewY - previous.previewY)
    }
  }

  return points[points.length - 1].previewY
}

function interpolatePreviewToSource(previewY: number, points: ScrollAnchorPoint[]) {
  if (!points.length) return 0
  if (previewY <= points[0].previewY) return points[0].sourceLine

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const next = points[index]
    if (previewY <= next.previewY) {
      const previewSpan = next.previewY - previous.previewY
      const ratio = previewSpan > 0 ? (previewY - previous.previewY) / previewSpan : 0
      return previous.sourceLine + ratio * (next.sourceLine - previous.sourceLine)
    }
  }

  return points[points.length - 1].sourceLine
}

function runScrollSync(source: 'editor' | 'preview', action: () => void) {
  if (!scrollSyncEnabled.value || activeEditorTab.value !== 'markdown') return
  if (scrollSyncLock.value && scrollSyncLock.value !== source) return

  scrollSyncLock.value = source
  action()

  if (scrollSyncReleaseTimer) window.clearTimeout(scrollSyncReleaseTimer)
  scrollSyncReleaseTimer = window.setTimeout(() => {
    scrollSyncLock.value = null
    scrollSyncReleaseTimer = null
  }, 48)
}

function syncPreviewToEditorLine(sourceLine: number) {
  const textarea = sourceTextarea.value
  if (!textarea) return

  const lineHeight = getTextareaLineHeight(textarea)
  const paddingTop = Number.parseFloat(window.getComputedStyle(textarea).paddingTop) || 0
  textarea.scrollTop = Math.max(0, sourceLine * lineHeight - paddingTop)
}

function syncEditorScrollToPreview() {
  const textarea = sourceTextarea.value
  const previewWindow = previewFrame.value?.contentWindow
  if (!textarea || !previewWindow) return

  if (!scrollAnchorPoints.value.length) buildScrollAnchorPoints()

  const focusLine = getEditorFocusLine(textarea)
  const paddingTop = Number.parseFloat(window.getComputedStyle(textarea).paddingTop) || 0
  const targetTop = interpolateSourceToPreview(focusLine, scrollAnchorPoints.value) - paddingTop

  previewWindow.scrollTo({
    left: 0,
    top: Math.max(0, targetTop),
    behavior: 'auto',
  })
}

function syncPreviewScrollToEditor() {
  const textarea = sourceTextarea.value
  const previewWindow = previewFrame.value?.contentWindow
  if (!textarea || !previewWindow) return

  if (!scrollAnchorPoints.value.length) buildScrollAnchorPoints()

  const paddingTop = Number.parseFloat(window.getComputedStyle(textarea).paddingTop) || 0
  const previewFocusY = previewWindow.scrollY + paddingTop
  const sourceLine = interpolatePreviewToSource(previewFocusY, scrollAnchorPoints.value)
  syncPreviewToEditorLine(sourceLine)
}

function handleEditorScroll() {
  runScrollSync('editor', syncEditorScrollToPreview)
}

function handlePreviewScroll() {
  runScrollSync('preview', syncPreviewScrollToEditor)
}

function detachPreviewScrollListener() {
  const previewWindow = previewFrame.value?.contentWindow
  if (previewWindow && previewScrollHandler) {
    previewWindow.removeEventListener('scroll', previewScrollHandler)
  }
  previewScrollHandler = null
}

function attachPreviewScrollListener() {
  detachPreviewScrollListener()

  const previewWindow = previewFrame.value?.contentWindow
  if (!previewWindow) return

  previewScrollHandler = () => handlePreviewScroll()
  previewWindow.addEventListener('scroll', previewScrollHandler, { passive: true })
}

function handlePreviewReady() {
  restorePreviewScroll()
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      buildScrollAnchorPoints()
      attachPreviewScrollListener()
    })
  })
}

function refreshPreview({ preserveScroll = true } = {}) {
  normalizeSourceAttachmentImagePaths()

  if (preserveScroll) {
    pendingPreviewScroll.value = getPreviewScrollState()
  }

  previewNonce.value += 1
}

function restorePreviewScroll() {
  const scrollState = pendingPreviewScroll.value
  if (!scrollState) return

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const previewWindow = previewFrame.value?.contentWindow
      const previewDocument = previewFrame.value?.contentDocument
      const scrollRoot = previewDocument?.scrollingElement ?? previewDocument?.documentElement
      if (!previewWindow || !scrollRoot) return

      const maxLeft = Math.max(0, scrollRoot.scrollWidth - scrollRoot.clientWidth)
      const maxTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight)
      const left = scrollState.maxLeft > 0 && maxLeft !== scrollState.maxLeft
        ? scrollState.ratioLeft * maxLeft
        : scrollState.left
      const top = scrollState.maxTop > 0 && maxTop !== scrollState.maxTop
        ? scrollState.ratioTop * maxTop
        : scrollState.top

      scrollSyncLock.value = 'preview'
      previewWindow.scrollTo({
        left: Math.max(0, left),
        top: Math.max(0, top),
        behavior: 'auto',
      })

      if (scrollState.editorLine !== undefined) {
        syncPreviewToEditorLine(scrollState.editorLine)
      } else if (scrollState.editorTop !== undefined) {
        const textarea = sourceTextarea.value
        if (textarea) textarea.scrollTop = scrollState.editorTop
      }

      window.setTimeout(() => {
        if (scrollSyncLock.value === 'preview') scrollSyncLock.value = null
      }, 48)

      pendingPreviewScroll.value = null
    })
  })
}

function closeEditor() {
  if (isDirty.value) {
    const confirmed = window.confirm('当前内容尚未保存，确定关闭吗？')
    if (!confirmed) return
  }

  emit('close')
}

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
}

function insertAtCursor(text: string) {
  activeEditorTab.value = 'markdown'
  const textarea = sourceTextarea.value
  if (!textarea) {
    source.value += text
    return
  }

  const start = textarea.selectionStart ?? source.value.length
  const end = textarea.selectionEnd ?? start
  source.value = `${source.value.slice(0, start)}${text}${source.value.slice(end)}`

  nextTick(() => {
    textarea.focus()
    const cursor = start + text.length
    textarea.setSelectionRange(cursor, cursor)
  })
}

function clipboardImageFiles(event: ClipboardEvent) {
  const clipboard = event.clipboardData
  if (!clipboard) return []

  const itemFiles = Array.from(clipboard.items ?? [])
    .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
    .map((item) => item.getAsFile())
    .filter((file): file is File => Boolean(file))

  if (itemFiles.length) return itemFiles

  return Array.from(clipboard.files ?? [])
    .filter((file) => file.type.startsWith('image/'))
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('图片读取失败'))
      }
    })
    reader.addEventListener('error', () => reject(new Error('图片读取失败')))
    reader.readAsDataURL(file)
  })
}

function markdownImageAlt(fileName: string) {
  const fallback = 'clipboard-image'
  const baseName = fileName ? fileName.replace(/\.[^.]+$/, '') : fallback
  return (baseName || fallback)
    .replace(/[[\]\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function markdownImagePath(value: string) {
  return value.replace(/ /g, '%20')
}

function normalizeAttachmentImagePaths(content: string) {
  return content.replace(
    /(!\[[^\]\n]*\]\()([^)\n]*?\.attachments\/[^)\n]*)(\))/g,
    (_match, prefix: string, imagePath: string, suffix: string) => {
      return `${prefix}${markdownImagePath(imagePath)}${suffix}`
    },
  )
}

function normalizeSourceAttachmentImagePaths() {
  const normalized = normalizeAttachmentImagePaths(source.value)
  if (normalized !== source.value) {
    source.value = normalized
  }
}

async function uploadClipboardImage(file: File) {
  const articlePath = loadedPath.value || props.relativePath
  const dataUrl = await fileToDataUrl(file)
  const response = await fetch('/__local-editor__/asset', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: articlePath,
      name: file.name,
      type: file.type,
      data: dataUrl,
    }),
  })

  return await readJson<AssetPayload>(response)
}

async function handleImagePaste(event: ClipboardEvent) {
  const files = clipboardImageFiles(event)
  if (!files.length) return

  event.preventDefault()
  if (isUploadingImage.value) return

  isUploadingImage.value = true
  errorText.value = ''

  try {
    const inserted: string[] = []
    for (const file of files) {
      const uploaded = await uploadClipboardImage(file)
      inserted.push(
        `![${markdownImageAlt(file.name || uploaded.fileName)}](${markdownImagePath(uploaded.markdownPath)})`,
      )
    }

    insertAtCursor(`\n${inserted.join('\n\n')}\n`)
    statusText.value = inserted.length > 1
      ? `已插入 ${inserted.length} 张图片，记得保存文章`
      : '已插入图片，记得保存文章'
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : '图片粘贴失败'
  } finally {
    isUploadingImage.value = false
  }
}

function escapeMarkdownInline(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/([`*_{}\[\]()#+.!|-])/g, '\\$1')
}

function inlineMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeMarkdownInline(node.textContent ?? '')
  }

  if (!(node instanceof HTMLElement)) return ''

  const tag = node.tagName.toLowerCase()
  const children = () => Array.from(node.childNodes).map(inlineMarkdown).join('')

  if (tag === 'br') return '\n'
  if (tag === 'strong' || tag === 'b') return `**${children()}**`
  if (tag === 'em' || tag === 'i') return `*${children()}*`
  if (tag === 'code') return `\`${node.textContent ?? ''}\``
  if (tag === 'a') {
    const href = node.getAttribute('href') ?? ''
    return href ? `[${children()}](${href})` : children()
  }
  if (tag === 'img') {
    const src = node.getAttribute('src') ?? ''
    const alt = node.getAttribute('alt') ?? ''
    return src ? `![${alt}](${src})` : ''
  }

  return children()
}

function blockMarkdown(node: Node, depth = 0): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeMarkdownInline(node.textContent ?? '')
  }

  if (!(node instanceof HTMLElement)) return ''

  const tag = node.tagName.toLowerCase()
  const children = () => Array.from(node.childNodes).map((child) => blockMarkdown(child, depth)).join('')
  const inline = () => Array.from(node.childNodes).map(inlineMarkdown).join('').trim()

  if (/^h[1-6]$/.test(tag)) {
    return `${'#'.repeat(Number(tag.slice(1)))} ${inline()}\n\n`
  }

  if (tag === 'p') {
    const text = inline()
    return text ? `${text}\n\n` : ''
  }

  if (tag === 'blockquote') {
    return children()
      .trim()
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n') + '\n\n'
  }

  if (tag === 'pre') {
    const code = node.textContent?.replace(/\n+$/, '') ?? ''
    const codeEl = node.querySelector('code')
    const lang = codeEl?.className.match(/language-([A-Za-z0-9_-]+)/)?.[1] ?? ''
    return `\`\`\`${lang}\n${code}\n\`\`\`\n\n`
  }

  if (tag === 'ul' || tag === 'ol') {
    const ordered = tag === 'ol'
    return Array.from(node.children)
      .filter((child) => child.tagName.toLowerCase() === 'li')
      .map((child, index) => {
        const marker = ordered ? `${index + 1}. ` : '- '
        const body = blockMarkdown(child, depth + 1).trim().replace(/\n/g, '\n  ')
        return `${marker}${body}`
      })
      .join('\n') + '\n\n'
  }

  if (tag === 'li') {
    return children() || inline()
  }

  if (tag === 'table') {
    return `${node.outerHTML}\n\n`
  }

  return children() || `${inline()}\n\n`
}

function htmlToMarkdown(html: string) {
  const template = document.createElement('template')
  template.innerHTML = html
  return Array.from(template.content.childNodes)
    .map((node) => blockMarkdown(node))
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function insertRichText() {
  const markdown = htmlToMarkdown(richHtml.value)
  if (!markdown) {
    statusText.value = '富文本片段为空'
    return
  }

  insertAtCursor(`\n${markdown}\n`)
  statusText.value = '已插入片段'
}

function openInsertDialog(entryId: string) {
  insertDialogEntryId.value = entryId
  insertDialogOpen.value = true
}

function insertQuickEntry(entryId: string) {
  const entry = localEditorRegistry.find((item) => item.id === entryId)
  if (!entry) return
  if (entry.dialog) {
    openInsertDialog(entryId)
    return
  }
  insertAtCursor(entry.build({}))
  statusText.value = `已插入 ${entry.label}`
}

function insertSnippet(text: string) {
  insertAtCursor(text)
  statusText.value = '已插入模板'
}

function applyFrontmatterContent(content: string) {
  source.value = content
  statusText.value = 'Frontmatter 已更新'
  scheduleDraftPreview()
}

function handleKeydown(event: KeyboardEvent) {
  const key = event.key.toLowerCase()
  if ((event.metaKey || event.ctrlKey) && key === 's') {
    event.preventDefault()
    void saveArticle()
    return
  }

  if (event.key === 'Escape') {
    closeEditor()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  void loadArticle(true)
})

watch(source, () => {
  scheduleDraftPreview()
  if (scrollSyncEnabled.value) {
    window.requestAnimationFrame(() => buildScrollAnchorPoints())
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  detachPreviewScrollListener()
  if (draftSyncTimer.value) window.clearTimeout(draftSyncTimer.value)
  if (previewRefreshTimer.value) window.clearTimeout(previewRefreshTimer.value)
  if (scrollSyncReleaseTimer) window.clearTimeout(scrollSyncReleaseTimer)
  void clearDraftPreview()
  editorRef.value?.destroy()
  editorRef.value = null
})
</script>

<template>
  <div
    class="local-markdown-editor"
    role="dialog"
    aria-modal="true"
    aria-label="本地文章编辑器"
    @paste.capture="handleImagePaste"
  >
    <div class="local-markdown-editor-shell">
      <header class="local-markdown-editor-header">
        <div class="local-markdown-editor-title">
          <strong>{{ displayTitle }}</strong>
          <span>{{ loadedPath || relativePath }}</span>
        </div>

        <div class="local-markdown-editor-actions">
          <span
            v-if="errorText || statusText"
            class="local-markdown-editor-status"
            :class="{ 'is-error': errorText }"
          >
            {{ errorText || statusText }}
          </span>
          <button type="button" @click="loadArticle(false)">重载</button>
          <button type="button" @click="refreshPreview">刷新预览</button>
          <label class="local-markdown-editor-live-toggle">
            <input v-model="livePreviewEnabled" type="checkbox">
            <span>实时预览</span>
          </label>
          <label class="local-markdown-editor-live-toggle">
            <input v-model="scrollSyncEnabled" type="checkbox">
            <span>滚动联动</span>
          </label>
          <button
            class="is-primary"
            type="button"
            :disabled="saving || loading || isUploadingImage || !isDirty"
            @click="saveArticle"
          >
            {{ saving ? '保存中' : isUploadingImage ? '插图中' : '保存' }}
          </button>
          <button type="button" @click="closeEditor">关闭</button>
        </div>
      </header>

      <main class="local-markdown-editor-body">
        <section class="local-markdown-editor-left">
          <div class="local-markdown-editor-panel-head local-markdown-editor-editor-head">
            <div class="local-markdown-editor-tabs" role="tablist" aria-label="编辑模式">
              <button
                type="button"
                role="tab"
                :aria-selected="activeEditorTab === 'markdown'"
                :class="{ 'is-active': activeEditorTab === 'markdown' }"
                @click="activeEditorTab = 'markdown'"
              >
                Markdown
              </button>
              <button
                type="button"
                role="tab"
                :aria-selected="activeEditorTab === 'rich'"
                :class="{ 'is-active': activeEditorTab === 'rich' }"
                @click="activeEditorTab = 'rich'"
              >
                富文本
              </button>
              <button
                type="button"
                role="tab"
                :aria-selected="activeEditorTab === 'frontmatter'"
                :class="{ 'is-active': activeEditorTab === 'frontmatter' }"
                @click="activeEditorTab = 'frontmatter'"
              >
                格式
              </button>
            </div>

            <span v-if="activeEditorTab === 'markdown'">{{ lineCount }} 行 · {{ sourceBytes }} B</span>
            <button v-else-if="activeEditorTab === 'rich'" type="button" @click="insertRichText">插入 Markdown</button>
            <span v-else>Frontmatter 与页面开关</span>
          </div>

          <div class="local-markdown-editor-edit-stack">
            <section
              v-show="activeEditorTab === 'markdown'"
              class="local-markdown-editor-source-pane"
              role="tabpanel"
            >
              <textarea
                ref="sourceTextarea"
                v-model="source"
                class="local-markdown-editor-textarea"
                spellcheck="false"
                @scroll="handleEditorScroll"
              />

              <div class="local-markdown-editor-snippets" aria-label="插入模板">
                <button
                  v-for="entry in quickInserts"
                  :key="entry.id"
                  type="button"
                  @click="insertQuickEntry(entry.id)"
                >
                  {{ entry.label }}
                </button>
                <template v-for="[category, entries] in dialogInserts" :key="category">
                  <button
                    v-for="entry in entries"
                    :key="entry.id"
                    type="button"
                    class="is-dialog"
                    @click="openInsertDialog(entry.id)"
                  >
                    {{ entry.label }}
                  </button>
                </template>
                <button type="button" class="is-dialog" @click="openInsertDialog('lyric-card')">插入向导</button>
              </div>
            </section>

            <section
              v-show="activeEditorTab === 'frontmatter'"
              class="local-markdown-editor-frontmatter-pane"
              role="tabpanel"
            >
              <LocalEditorFrontmatterPanel
                :source="source"
                @apply="applyFrontmatterContent"
              />
            </section>

            <section
              v-show="activeEditorTab === 'rich'"
              class="local-markdown-editor-rich-pane"
              role="tabpanel"
            >
              <div class="local-markdown-editor-wang">
                <Toolbar
                  class="local-markdown-editor-toolbar"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="editorMode"
                />
                <Editor
                  v-model="richHtml"
                  class="local-markdown-editor-wang-body"
                  :defaultConfig="editorConfig"
                  :mode="editorMode"
                  @onCreated="handleCreated"
                />
              </div>
            </section>
          </div>
        </section>

        <section class="local-markdown-editor-preview">
          <div class="local-markdown-editor-panel-head">
            <span>渲染预览</span>
            <span>{{ previewLabel }}</span>
          </div>

          <iframe
            :key="previewNonce"
            ref="previewFrame"
            class="local-markdown-editor-frame"
            :src="previewSrc"
            title="本地渲染预览"
            @load="handlePreviewReady"
          />
        </section>
      </main>

      <div v-if="loading" class="local-markdown-editor-loading">载入中</div>
    </div>

    <LocalEditorInsertDialog
      :open="insertDialogOpen"
      :entry-id="insertDialogEntryId"
      @close="insertDialogOpen = false"
      @insert="insertSnippet"
    />
  </div>
</template>

<style scoped>
.local-markdown-editor {
  position: fixed;
  z-index: 10000;
  inset: 0;
  display: flex;
  min-width: 0;
  min-height: 0;
  padding: 18px;
  background: color-mix(in srgb, var(--vp-c-bg) 82%, rgb(21 27 38 / 78%));
  backdrop-filter: blur(20px) saturate(1.08);
}

.local-markdown-editor-shell {
  position: relative;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  min-width: 0;
  min-height: 0;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--vp-c-bg) 96%, var(--vp-c-bg-soft));
  box-shadow: 0 24px 72px rgb(15 23 42 / 22%);
  overflow: hidden;
}

.local-markdown-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 14px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 64%, transparent);
}

.local-markdown-editor-title {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.local-markdown-editor-title strong,
.local-markdown-editor-title span {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.local-markdown-editor-title strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.local-markdown-editor-title span {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.local-markdown-editor-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.local-markdown-editor-actions button,
.local-markdown-editor-snippets button,
.local-markdown-editor-panel-head button {
  height: 30px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 6px;
  padding: 0 11px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
}

.local-markdown-editor-actions button:hover,
.local-markdown-editor-snippets button:hover,
.local-markdown-editor-panel-head button:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 44%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
}

.local-markdown-editor-actions button:disabled {
  cursor: default;
  opacity: 0.55;
}

.local-markdown-editor-actions .is-primary {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 72%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-bg));
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.local-markdown-editor-status {
  max-width: 260px;
  overflow: hidden;
  color: var(--vp-c-text-3);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.local-markdown-editor-status.is-error {
  color: var(--vp-c-danger-1);
}

.local-markdown-editor-body {
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(360px, 1fr);
  gap: 12px;
  min-width: 0;
  min-height: 0;
  padding: 12px;
}

.local-markdown-editor-left,
.local-markdown-editor-preview {
  min-width: 0;
  min-height: 0;
}

.local-markdown-editor-left,
.local-markdown-editor-preview {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 76%, transparent);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.local-markdown-editor-edit-stack,
.local-markdown-editor-source-pane,
.local-markdown-editor-rich-pane,
.local-markdown-editor-frontmatter-pane {
  min-width: 0;
  min-height: 0;
}

.local-markdown-editor-edit-stack {
  display: grid;
}

.local-markdown-editor-source-pane,
.local-markdown-editor-rich-pane,
.local-markdown-editor-frontmatter-pane {
  display: grid;
  grid-area: 1 / 1;
  grid-template-rows: minmax(0, 1fr) auto;
}

.local-markdown-editor-frontmatter-pane {
  grid-template-rows: minmax(0, 1fr);
  overflow: auto;
}

.local-markdown-editor-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 42px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 8px 10px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 700;
}

.local-markdown-editor-editor-head {
  align-items: center;
}

.local-markdown-editor-live-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  user-select: none;
}

.local-markdown-editor-live-toggle input {
  accent-color: var(--vp-c-brand-1);
}

.local-markdown-editor-tabs {
  display: inline-grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 260px;
  min-width: 0;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 7px;
  padding: 2px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 76%, transparent);
}

.local-markdown-editor-tabs button {
  width: 100%;
  min-width: 0;
  height: 28px;
  border: 0;
  border-radius: 5px;
  padding: 0 8px;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-weight: 700;
}

.local-markdown-editor-tabs button.is-active {
  background: var(--vp-c-bg);
  box-shadow: 0 1px 5px rgb(15 23 42 / 10%);
  color: var(--vp-c-brand-1);
}

.local-markdown-editor-panel-head span + span {
  flex: 0 0 auto;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 500;
}

.local-markdown-editor-textarea {
  width: 100%;
  min-width: 0;
  min-height: 0;
  border: 0;
  padding: 14px;
  resize: none;
  background: color-mix(in srgb, var(--vp-c-bg) 92%, var(--vp-c-bg-soft));
  color: var(--vp-c-text-1);
  font: 13px/1.7 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  outline: none;
  tab-size: 2;
  caret-color: var(--vp-c-brand-1);
  transition: box-shadow 0.28s var(--ease-standard, ease), caret-color 0.28s ease;
}

.local-markdown-editor-textarea:focus {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 34%, transparent);
  animation: local-editor-caret-glow 1.35s ease-in-out infinite;
}

@keyframes local-editor-caret-glow {
  0%, 100% {
    caret-color: var(--vp-c-brand-1);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent);
  }

  50% {
    caret-color: color-mix(in srgb, var(--vp-c-brand-1) 72%, white);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 48%, transparent);
  }
}

.local-markdown-editor-snippets .is-dialog {
  border-style: dashed;
}

.local-markdown-editor-frontmatter-pane {
  min-height: 0;
  overflow: auto;
}

.local-markdown-editor-snippets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid var(--vp-c-divider);
  padding: 9px 10px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 62%, transparent);
}

.local-markdown-editor-wang {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
}

.local-markdown-editor-toolbar {
  border-bottom: 1px solid var(--vp-c-divider);
}

.local-markdown-editor-wang-body {
  min-height: 0;
  overflow: hidden;
}

.local-markdown-editor-frame {
  width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
  border: 0;
  background: var(--vp-c-bg);
}

.local-markdown-editor-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--vp-c-bg) 72%, transparent);
  color: var(--vp-c-text-2);
  font-weight: 700;
}

:deep(.w-e-bar) {
  background: var(--vp-c-bg);
}

:deep(.w-e-text-container) {
  background: var(--vp-c-bg);
}

:deep(.w-e-text-container [data-slate-editor]) {
  color: var(--vp-c-text-1);
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

@media (max-width: 1100px) {
  .local-markdown-editor-body {
    grid-template-columns: 1fr;
    overflow: auto;
  }

  .local-markdown-editor-left,
  .local-markdown-editor-preview {
    min-height: 60vh;
  }
}

@media (max-width: 768px) {
  .local-markdown-editor {
    padding: 0;
  }

  .local-markdown-editor-shell {
    border-radius: 0;
  }

  .local-markdown-editor-header {
    align-items: stretch;
    flex-direction: column;
  }

  .local-markdown-editor-actions {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .local-markdown-editor-status {
    flex-basis: 100%;
    max-width: none;
  }
}
</style>
