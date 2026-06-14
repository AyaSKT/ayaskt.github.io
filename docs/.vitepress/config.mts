import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// 使用 MathJax 4 渲染数学公式（@mdit/plugin-mathjax 依赖 @mathjax/src@4）
import { mathjax, createMathjaxInstance } from '@mdit/plugin-mathjax'

type MathJaxTexInputOptionsWithMacros = import('@mdit/plugin-mathjax').MathJaxTexInputOptions & {
  macros: Record<string, string | [string, number]>
}

// ---------------------------------------------------------------------------
// Minimal markdown-it container plugin (replaces external markdown-it-container)
// ---------------------------------------------------------------------------
interface ContainerOpts {
  validate: (params: string) => boolean
  render: (tokens: any[], idx: number) => string
}

function registerContainer(md: any, name: string, opts: ContainerOpts) {
  const COLON = 0x3A

  function rule(state: any, startLine: number, endLine: number, silent: boolean): boolean {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    if (state.src.charCodeAt(start) !== COLON) return false

    let pos = start
    while (pos < max && state.src.charCodeAt(pos) === COLON) pos++
    if (pos - start < 3) return false

    const params = state.src.slice(pos, max).trim()
    if (!opts.validate(params)) return false
    if (silent) return true

    let nesting = 0
    let nextLine = startLine
    let hasEnd = false

    while (++nextLine < endLine) {
      const lStart = state.bMarks[nextLine] + state.tShift[nextLine]
      const lMax = state.eMarks[nextLine]
      if (lStart >= lMax || state.src.charCodeAt(lStart) !== COLON) continue
      if (state.sCount[nextLine] - state.blkIndent >= 4) continue

      let cPos = lStart
      while (cPos < lMax && state.src.charCodeAt(cPos) === COLON) cPos++
      if (cPos - lStart < 3) continue

      if (state.src.slice(cPos, lMax).trim()) { nesting++; continue }
      if (nesting > 0) { nesting--; continue }

      hasEnd = true
      break
    }

    const markup = state.src.slice(start, pos)
    const tok_o = state.push(`container_${name}_open`, 'div', 1)
    tok_o.markup = markup; tok_o.block = true; tok_o.info = params
    tok_o.map = [startLine, nextLine]

    state.md.block.tokenize(state, startLine + 1, nextLine)

    const tok_c = state.push(`container_${name}_close`, 'div', -1)
    tok_c.markup = markup; tok_c.block = true

    state.line = nextLine + (hasEnd ? 1 : 0)
    return true
  }

  md.block.ruler.before('fence', `container_${name}`, rule, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
  md.renderer.rules[`container_${name}_open`] = opts.render
  md.renderer.rules[`container_${name}_close`] = opts.render
}

function getReadableWordCount(src: string) {
  const content = src
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\([^)]*\)/g, '')

  // Count math formula symbols before stripping inline code
  const displayMath = content.match(/\$\$[\s\S]*?\$\$/g) ?? []
  const inlineMath = content
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .match(/\$[^$\n]+?\$/g) ?? []
  const mathSymbolCount = [...displayMath, ...inlineMath]
    .join('')
    .replace(/\$/g, '')
    .replace(/\s+/g, '')
    .length

  // Strip inline code after extracting math
  const text = content.replace(/`[^`]*`/g, '')

  // Count CJK characters (CJK Unified Ideographs + extensions + compatibility)
  const cjkCount = (text.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length

  // Count kana (hiragana + katakana + phonetic extensions)
  const kanaCount = (text.match(/[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff]/g) ?? []).length

  // Count remaining "words": Latin, digits, Hangul syllables, CJK extensions B+
  const stripped = text
    .replace(/[\u3400-\u9fff\uf900-\ufaff\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff]/g, ' ')
  let wordCount = 0
  for (const m of stripped.matchAll(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)) {
    wordCount++
  }
  for (const m of stripped.matchAll(/[\uac00-\ud7a3\u{20000}-\u{2fa1f}]/gu)) {
    wordCount++
  }

  return cjkCount + kanaCount + mathSymbolCount + wordCount
}

function formatDocMeta(md: any, src: string, frontmatter: Record<string, any> = {}) {
  // 课程 README 页面不显示字数 / 日期 / 作者 / 下载 PDF
  if (frontmatter.pageClass === 'course-index-page') return ''

  const words = getReadableWordCount(src)
  const minutes = Math.max(1, Math.ceil(words / 500))
  const author = String(frontmatter.author ?? 'Ayaskt')
  const pdf = frontmatter.pdf === false ? 'false' : 'true'

  return `<DocMeta :words="${words}" :minutes="${minutes}" author="${md.utils.escapeHtml(author)}" :pdf="${pdf}"></DocMeta>\n`
}

type ResolveComponentAsset = (specifier: string) => string

interface ComponentAssetRule {
  componentName: string
  attrNames: string[]
  variablePrefix: string
}

const componentAssetRules: ComponentAssetRule[] = [
  { componentName: 'SongCard', attrNames: ['cover'], variablePrefix: '__songCardCover' },
  { componentName: 'LyricCard', attrNames: ['album-cover'], variablePrefix: '__lyricCardAlbumCover' },
]

function safeDecodeUri(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeSingleQuotedAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
}

function isRelativeComponentAsset(value: string) {
  const src = value.trim()
  if (!src) return false
  if (src.startsWith('/') || src.startsWith('#') || src.startsWith('//')) return false
  return !/^[a-z][a-z\d+.-]*:/i.test(src)
}

function normalizeComponentAssetSpecifier(value: string) {
  const src = safeDecodeUri(value.trim())
  return src.startsWith('./') || src.startsWith('../') ? src : `./${src}`
}

function toStaticAssetExpression(specifier: string) {
  return JSON.stringify(specifier)
}

function transformComponentAssetAttrs(
  src: string,
  componentName: string,
  attrNames: string[],
  resolveRelativeAsset: ResolveComponentAsset = toStaticAssetExpression,
) {
  const tagPattern = new RegExp(`<${escapeRegExp(componentName)}\\b(?:[^<>"']|"[^"]*"|'[^']*')*>`, 'g')

  return src.replace(tagPattern, (tag) => {
    return attrNames.reduce((currentTag, attrName) => {
      const escapedAttr = escapeRegExp(attrName)
      const boundAttrPattern = new RegExp(`(?:^|\\s)(?::${escapedAttr}|v-bind:${escapedAttr})\\s*=`)
      if (boundAttrPattern.test(currentTag)) return currentTag

      const attrPattern = new RegExp(`(\\s)${escapedAttr}\\s*=\\s*("([^"]*)"|'([^']*)')`)

      return currentTag.replace(attrPattern, (match, leadingSpace, _quoted, doubleQuoted, singleQuoted) => {
        const rawValue = (doubleQuoted ?? singleQuoted ?? '').trim()
        if (!isRelativeComponentAsset(rawValue)) return match

        const expression = resolveRelativeAsset(normalizeComponentAssetSpecifier(rawValue))
        return `${leadingSpace}:${attrName}='${escapeSingleQuotedAttribute(expression)}'`
      })
    }, tag)
  })
}

export function transformSongCardCoverAttrs(
  src: string,
  resolveRelativeAsset?: ResolveComponentAsset,
) {
  return transformComponentAssetAttrs(src, 'SongCard', ['cover'], resolveRelativeAsset)
}

export function transformLyricCardAlbumCoverAttrs(
  src: string,
  resolveRelativeAsset?: ResolveComponentAsset,
) {
  return transformComponentAssetAttrs(src, 'LyricCard', ['album-cover'], resolveRelativeAsset)
}

export function renderMindMapFence(src: string, info = '') {
  const title = info.replace(/^mindmap\b\s*/, '').trim()
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
  const sourceAttr = escapeSingleQuotedAttribute(JSON.stringify(src))

  return `<MindMap${titleAttr} :source='${sourceAttr}'></MindMap>\n`
}

function transformMarkdownComponentAssetAttrs(
  src: string,
  resolveRuleAsset: (rule: ComponentAssetRule, specifier: string) => string = (_rule, specifier) => {
    return toStaticAssetExpression(specifier)
  },
) {
  return componentAssetRules.reduce((currentSrc, rule) => {
    return transformComponentAssetAttrs(
      currentSrc,
      rule.componentName,
      rule.attrNames,
      (specifier) => resolveRuleAsset(rule, specifier),
    )
  }, src)
}

function registerComponentAssetImports(md: any) {
  const render = md.renderer.render.bind(md.renderer)

  md.renderer.render = (tokens: any[], options: any, env: any) => {
    const imports = new Map<string, string>()

    const resolveRuleAsset = (rule: ComponentAssetRule, specifier: string) => {
      const key = `${rule.componentName}:${specifier}`
      const existing = imports.get(key)
      if (existing) return existing

      const variable = `${rule.variablePrefix}${imports.size}`
      imports.set(key, variable)
      return variable
    }

    const transformToken = (token: any) => {
      if (
        typeof token.content === 'string'
        && (token.type === 'html_block' || token.type === 'html_inline')
      ) {
        const shouldTransform = componentAssetRules.some((rule) => {
          return token.content.includes(`<${rule.componentName}`)
        })

        if (shouldTransform) {
          token.content = transformMarkdownComponentAssetAttrs(token.content, resolveRuleAsset)
        }
      }

      token.children?.forEach(transformToken)
    }

    tokens.forEach(transformToken)
    const html = render(tokens, options, env)
    injectComponentAssetImports(env, imports)

    return html
  }
}

function injectComponentAssetImports(env: any, imports: Map<string, string>) {
  if (!env.sfcBlocks || imports.size === 0) return

  const importCode = [...imports]
    .map(([key, variable]) => {
      const specifier = key.slice(key.indexOf(':') + 1)
      return `import ${variable} from ${JSON.stringify(specifier)}`
    })
    .join('\n')
  const scriptSetup = env.sfcBlocks.scriptSetup

  if (scriptSetup) {
    scriptSetup.content = scriptSetup.content.replace(
      /(<script\b[^>]*>)/i,
      `$1\n${importCode}`,
    )
    return
  }

  env.sfcBlocks.scripts.push({
    content: `<script setup>\n${importCode}\n</script>`,
  })
}

function registerDocMeta(md: any) {
  md.core.ruler.after('inline', 'doc_meta', (state: any) => {
    const h1CloseIndex = state.tokens.findIndex(
      (token: any) => token.type === 'heading_close' && token.tag === 'h1'
    )
    if (h1CloseIndex === -1) return

    const token = new state.Token('html_block', '', 0)
    token.content = formatDocMeta(md, state.src, state.env?.frontmatter)
    state.tokens.splice(h1CloseIndex + 1, 0, token)
  })
}

function registerMindMapFence(md: any) {
  const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const info = (tokens[idx].info || '').trim()
    if (/^mindmap(?:\s|$)/.test(info)) {
      return renderMindMapFence(tokens[idx].content, info)
    }

    if (defaultFence) return defaultFence(tokens, idx, options, env, self)
    return self.renderToken(tokens, idx, options)
  }
}

// 插件默认 TeX 包列表去掉 bboldx，避免 "Invalid variant: -bboldx"（newcm 字体无此变体）
const TEX_PACKAGES_WITHOUT_BBOLDX = [
  'action', 'ams', 'amscd', 'bbm', 'bbox', 'begingroup', 'boldsymbol', 'braket', 'bussproofs',
  'cancel', 'cases', 'centernot', 'color', 'colortbl', 'colorv2', 'configmacros', 'dsfont', 'empheq',
  'enclose', 'extpfeil', 'gensymb', 'html', 'mathtools', 'mhchem', 'newcommand', 'noerrors', 'noundefined',
  'physics', 'setoptions', 'tagformat', 'texhtml', 'textcomp', 'textmacros', 'unicode', 'units', 'upgreek', 'verb'
] as const

const TEX_MACROS = {
  pounds: '\\unicode{xA3}',
} as const

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..')
const publicRoot = path.resolve(docsRoot, 'public')
const isDevCommand = process.argv.includes('dev') || process.argv.includes('serve')
const uestcIcon = fs.readFileSync(
  path.resolve(__dirname, '../Index-assets/logos/UESTC.svg'),
  'utf-8'
)

interface ImageDimensions {
  width: number
  height: number
}

interface CachedImageDimensions {
  mtimeMs: number
  size: number
  dimensions: ImageDimensions | null
}

const imageDimensionCache = new Map<string, CachedImageDimensions>()
const supportedImageDimensionExtensions = new Set([
  '.gif',
  '.jpg',
  '.jpeg',
  '.png',
  '.svg',
  '.webp',
])

function isExternalImageSrc(value: string) {
  const src = value.trim()
  return (
    !src ||
    src.startsWith('#') ||
    src.startsWith('//') ||
    src.startsWith('data:') ||
    src.startsWith('blob:') ||
    /^[a-z][a-z\d+.-]*:/i.test(src)
  )
}

function stripUrlSuffix(value: string) {
  const index = value.search(/[?#]/)
  return index === -1 ? value : value.slice(0, index)
}

function isInsideDocsRoot(filePath: string) {
  const relative = path.relative(docsRoot, filePath)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function getExistingImageFile(candidates: string[]) {
  for (const candidate of candidates) {
    const filePath = path.normalize(candidate)
    if (!isInsideDocsRoot(filePath)) continue

    const stat = fs.statSync(filePath, { throwIfNoEntry: false })
    if (stat?.isFile()) return filePath
  }

  return undefined
}

function markdownFilePathFromEnv(env: any) {
  const candidates = [env?.path, env?.filePath, env?.relativePath]

  for (const candidate of candidates) {
    if (typeof candidate !== 'string' || !candidate.trim()) continue

    const cleanPath = candidate.split(/[?#]/, 1)[0]
    const filePath = path.isAbsolute(cleanPath)
      ? cleanPath
      : path.resolve(docsRoot, cleanPath.replace(/^\/+/, ''))

    if (isInsideDocsRoot(filePath)) return filePath
  }

  return undefined
}

function resolveMarkdownImageFile(src: string, env: any) {
  const cleanSrc = safeDecodeUri(stripUrlSuffix(src).trim())
  if (isExternalImageSrc(cleanSrc)) return undefined

  const extension = path.extname(cleanSrc).toLowerCase()
  if (!supportedImageDimensionExtensions.has(extension)) return undefined

  if (cleanSrc.startsWith('/')) {
    const localPath = cleanSrc.replace(/^\/+/, '')
    return getExistingImageFile([
      path.resolve(publicRoot, localPath),
      path.resolve(docsRoot, localPath),
    ])
  }

  const markdownFilePath = markdownFilePathFromEnv(env)
  const baseDir = markdownFilePath ? path.dirname(markdownFilePath) : docsRoot
  return getExistingImageFile([path.resolve(baseDir, cleanSrc)])
}

function readUInt16(buffer: Buffer, offset: number, littleEndian: boolean) {
  return littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset)
}

function readUInt32(buffer: Buffer, offset: number, littleEndian: boolean) {
  return littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset)
}

function readUInt24LE(buffer: Buffer, offset: number) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16)
}

function applyJpegOrientation(dimensions: ImageDimensions, orientation: number | undefined) {
  return orientation && orientation >= 5 && orientation <= 8
    ? { width: dimensions.height, height: dimensions.width }
    : dimensions
}

function readExifOrientation(buffer: Buffer, offset: number, segmentLength: number) {
  const segmentStart = offset + 2
  const segmentEnd = offset + segmentLength
  if (segmentEnd > buffer.length || segmentStart + 14 > segmentEnd) return undefined
  if (buffer.toString('ascii', segmentStart, segmentStart + 6) !== 'Exif\0\0') return undefined

  const tiffStart = segmentStart + 6
  const endian = buffer.toString('ascii', tiffStart, tiffStart + 2)
  const littleEndian = endian === 'II'
  if (!littleEndian && endian !== 'MM') return undefined
  if (readUInt16(buffer, tiffStart + 2, littleEndian) !== 42) return undefined

  const ifdOffset = readUInt32(buffer, tiffStart + 4, littleEndian)
  const ifdStart = tiffStart + ifdOffset
  if (ifdStart + 2 > segmentEnd) return undefined

  const entryCount = readUInt16(buffer, ifdStart, littleEndian)
  for (let index = 0; index < entryCount; index++) {
    const entryOffset = ifdStart + 2 + index * 12
    if (entryOffset + 12 > segmentEnd) break

    const tag = readUInt16(buffer, entryOffset, littleEndian)
    const type = readUInt16(buffer, entryOffset + 2, littleEndian)
    const count = readUInt32(buffer, entryOffset + 4, littleEndian)
    if (tag === 0x0112 && type === 3 && count >= 1) {
      return readUInt16(buffer, entryOffset + 8, littleEndian)
    }
  }

  return undefined
}

function readJpegDimensions(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null

  let offset = 2
  let orientation: number | undefined

  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    while (buffer[offset] === 0xff) offset += 1
    const marker = buffer[offset]
    offset += 1

    if (marker === 0xd9 || marker === 0xda) break
    if (marker >= 0xd0 && marker <= 0xd7) continue
    if (offset + 2 > buffer.length) break

    const segmentLength = buffer.readUInt16BE(offset)
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break

    if (marker === 0xe1 && !orientation) {
      orientation = readExifOrientation(buffer, offset, segmentLength)
    }

    const isStartOfFrame = (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    )

    if (isStartOfFrame && offset + 7 < buffer.length) {
      return applyJpegOrientation({
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      }, orientation)
    }

    offset += segmentLength
  }

  return null
}

function readPngDimensions(buffer: Buffer): ImageDimensions | null {
  if (
    buffer.length < 24 ||
    buffer[0] !== 0x89 ||
    buffer.toString('ascii', 1, 4) !== 'PNG' ||
    buffer.toString('ascii', 12, 16) !== 'IHDR'
  ) {
    return null
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

function readGifDimensions(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 10 || !/^GIF8[79]a$/.test(buffer.toString('ascii', 0, 6))) return null

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8),
  }
}

function readWebpDimensions(buffer: Buffer): ImageDimensions | null {
  if (
    buffer.length < 30 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null
  }

  const chunkType = buffer.toString('ascii', 12, 16)
  if (chunkType === 'VP8X') {
    return {
      width: readUInt24LE(buffer, 24) + 1,
      height: readUInt24LE(buffer, 27) + 1,
    }
  }

  if (chunkType === 'VP8L' && buffer[20] === 0x2f) {
    return {
      width: 1 + buffer[21] + ((buffer[22] & 0x3f) << 8),
      height: 1 + ((buffer[22] >> 6) | (buffer[23] << 2) | ((buffer[24] & 0x0f) << 10)),
    }
  }

  if (chunkType === 'VP8 ' && buffer.toString('hex', 23, 26) === '9d012a') {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }

  return null
}

function readSvgDimensions(buffer: Buffer): ImageDimensions | null {
  const svgTag = buffer.toString('utf8', 0, Math.min(buffer.length, 4096)).match(/<svg\b[^>]*>/i)?.[0]
  if (!svgTag) return null

  const width = svgTag.match(/\bwidth=(["'])([\d.]+)(?:px)?\1/i)?.[2]
  const height = svgTag.match(/\bheight=(["'])([\d.]+)(?:px)?\1/i)?.[2]
  if (width && height) {
    return {
      width: Math.round(Number(width)),
      height: Math.round(Number(height)),
    }
  }

  const viewBox = svgTag.match(/\bviewBox=(["'])\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*\1/i)
  if (viewBox) {
    return {
      width: Math.round(Number(viewBox[2])),
      height: Math.round(Number(viewBox[3])),
    }
  }

  return null
}

function readImageDimensionsFromBuffer(buffer: Buffer, extension: string): ImageDimensions | null {
  switch (extension) {
    case '.gif':
      return readGifDimensions(buffer)
    case '.jpg':
    case '.jpeg':
      return readJpegDimensions(buffer)
    case '.png':
      return readPngDimensions(buffer)
    case '.svg':
      return readSvgDimensions(buffer)
    case '.webp':
      return readWebpDimensions(buffer)
    default:
      return null
  }
}

function getImageDimensions(filePath: string) {
  const stat = fs.statSync(filePath, { throwIfNoEntry: false })
  if (!stat?.isFile()) return null

  const cached = imageDimensionCache.get(filePath)
  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
    return cached.dimensions
  }

  const dimensions = readImageDimensionsFromBuffer(
    fs.readFileSync(filePath),
    path.extname(filePath).toLowerCase(),
  )

  imageDimensionCache.set(filePath, {
    mtimeMs: stat.mtimeMs,
    size: stat.size,
    dimensions,
  })

  return dimensions
}

function registerMarkdownImageDimensions(md: any) {
  const defaultImage = md.renderer.rules.image?.bind(md.renderer.rules)

  md.renderer.rules.image = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const token = tokens[idx]
    const src = token.attrGet('src')

    if (
      typeof src === 'string' &&
      token.attrGet('width') == null &&
      token.attrGet('height') == null
    ) {
      const imageFile = resolveMarkdownImageFile(src, env)
      const dimensions = imageFile ? getImageDimensions(imageFile) : null

      if (dimensions?.width > 0 && dimensions.height > 0) {
        token.attrSet('width', String(dimensions.width))
        token.attrSet('height', String(dimensions.height))
      }
    }

    if (defaultImage) return defaultImage(tokens, idx, options, env, self)
    return self.renderToken(tokens, idx, options)
  }
}

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

function slugify(str: string) {
  return str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripFrontmatter(src: string) {
  if (!src.startsWith('---')) return { body: src, frontmatter: '' }

  const end = src.indexOf('\n---', 3)
  if (end === -1) return { body: src, frontmatter: '' }

  const frontmatterEnd = src.indexOf('\n', end + 4)
  return {
    frontmatter: src.slice(3, end),
    body: frontmatterEnd === -1 ? '' : src.slice(frontmatterEnd + 1),
  }
}

function stripMarkdownForSearch(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1 ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, '$1')
    .replace(/[*_~|>$#:[\]{}()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function renderSearchHtml(src: string) {
  const { body, frontmatter } = stripFrontmatter(src)
  if (/^\s*search:\s*false\s*$/m.test(frontmatter)) return ''

  const slugCounts = new Map<string, number>()
  const sections: { level: number; title: string; anchor: string; text: string[] }[] = []
  let current: (typeof sections)[number] | undefined
  let inFence = false

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (/^```|^~~~/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence || !line || /^:::\s*$|^:::\s+\w+/.test(line)) continue

    const heading = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/.exec(line)
    if (heading) {
      const title = stripMarkdownForSearch(heading[2])
      const base = slugify(title)
      const count = slugCounts.get(base) ?? 0
      slugCounts.set(base, count + 1)
      current = {
        level: heading[1].length,
        title,
        anchor: count === 0 ? base : `${base}-${count}`,
        text: [],
      }
      sections.push(current)
      continue
    }

    if (!current) continue
    const text = stripMarkdownForSearch(line)
    if (text) current.text.push(text)
  }

  return sections
    .filter((section) => section.title && section.text.length)
    .map((section) => {
      const level = Math.min(Math.max(section.level, 1), 6)
      return `<h${level}>${escapeHtml(section.title)}<a href="#${section.anchor}" class="header-anchor"></a></h${level}>\n<p>${escapeHtml(section.text.join(' '))}</p>`
    })
    .join('\n')
}

// https://vitepress.dev/reference/site-config
export default defineConfig({


  title: "Ayaskt 工作站 | 祝你幸福",
  description: "个人博客 / 资源汇总",
  lang: 'zh',
  srcExclude: [
    'superpowers/**/*.md',
  ],
  buildConcurrency: 4,

  // EPMF 笔记页面：右侧目录显式限定为 h2 ~ h3
  transformPageData(pageData) {
    if (pageData.filePath.startsWith('Y3S2/EPMF/') && !pageData.filePath.endsWith('-README.md')) {
      pageData.frontmatter.outline = [2, 3]
    }
  },

  vite: {
    server: {
      watch: {
        awaitWriteFinish: {
          stabilityThreshold: 10000,
          pollInterval: 1000,
        },
        ignored: [
          '**/.vitepress/cache/**',
          '**/.vitepress/dist/**',
          '**/*.attachments/**',
          '**/Attachments/**',
          '**/Assets/**',
          '**/Assests/**',
          '**/*_tmp.html',
          '**/.DS_Store',
          '**/superpowers/**',
        ],
      },
    },
  },
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico?' }],
  ],
  lastUpdated: true,

  markdown: {
    math: false,
    config: async (md) => {
      // MathJax 4：服务端 SVG 输出，$...$ 与 $$...$$ 分隔符。排除 bboldx 避免 "Invalid variant: -bboldx"。
      // 用 transformer 包裹 v-pre，防止 Vue  hydration 时把公式再处理一次导致重复显示。
      const mathjaxInstance = await createMathjaxInstance({
        output: 'svg',
        delimiters: 'dollars',
        a11y: false, // 关闭辅助输出，避免与主 SVG 同时显示导致公式“重影”
        tex: {
          packages: ['base', ...TEX_PACKAGES_WITHOUT_BBOLDX] as unknown as import('@mdit/plugin-mathjax').TexPackage[],
          macros: TEX_MACROS,
        } as MathJaxTexInputOptionsWithMacros,
        transformer: (html, displayMode) =>
          displayMode
            ? `<span class="mathjax-block" v-pre>${html}</span>`
            : `<span v-pre>${html}</span>`
      })
      if (mathjaxInstance) {
        await mathjaxInstance.outputStyle()
        md.use(mathjax, mathjaxInstance)
      }

      // ::: example / ::: stem / ::: solution 自定义容器
      registerContainer(md, 'example', {
        validate: (p) => /^example(\s|$)/.test(p),
        render(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const title = tokens[idx].info.replace(/^example\s*/, '').trim() || '例题'
            return `<div class="custom-block example"><p class="custom-block-title">${md.utils.escapeHtml(title)}</p>\n`
          }
          return '</div>\n'
        },
      })

      registerContainer(md, 'stem', {
        validate: (p) => /^stem(\s|$)/.test(p),
        render(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const label = tokens[idx].info.replace(/^stem\s*/, '').trim()
            const labelHtml = label
              ? ` <span class="example-stem-label">${md.utils.escapeHtml(label)}</span>`
              : ''
            return `<div class="example-stem"><p class="example-section-title">PROBLEM${labelHtml}</p>\n`
          }
          return '</div>\n'
        },
      })

      registerContainer(md, 'solution', {
        validate: (p) => /^solution(\s|$)/.test(p),
        render(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            return '<div class="example-solution" data-collapsed><p class="example-section-title">SOLUTION <button class="solution-toggle" aria-label="展开/收起">[展开答案]</button></p><div class="solution-content">\n'
          }
          return '</div></div>\n'
        },
      })

      // ::: definition 自定义容器
      registerContainer(md, 'definition', {
        validate: (p) => /^definition(\s|$)/.test(p),
        render(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const title = tokens[idx].info.replace(/^definition\s*/, '').trim() || 'DEFINITION'
            return `<div class="custom-block definition"><p class="custom-block-title">${md.utils.escapeHtml(title)}</p>\n`
          }
          return '</div>\n'
        },
      })

      registerMarkdownImageDimensions(md)
      registerMindMapFence(md)
      registerDocMeta(md)
      registerComponentAssetImports(md)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: '/IMG_4825_transparent.png',

    siteTitle: 'Ayaskt Workspace',


    nav: [
      { text: '主页', link: '/index' },

      { text: '第四学年', items: [] },

      {
        text: '第三学年',
        activeMatch: '^/(Y3S1/(CPS|AIML)|Y3S2/(DSP|EMFT|CCD|EPMF))/',
        items: [
          { text: '通信原理与系统 CPS', link: '/Y3S1/CPS/CPS-README.md', activeMatch: '^/Y3S1/CPS/' },
          { text: '人工智能与机器学习 AIML', link: '/Y3S1/AIML/AIML-README.md', activeMatch: '^/Y3S1/AIML/' },
          { text: '数字信号处理 DSP', link: '/Y3S2/DSP/DSP-README.md', activeMatch: '^/Y3S2/DSP/' },
          { text: '电磁场与波 EMFT', link: '/Y3S2/EMFT/EMFT-README.md', activeMatch: '^/Y3S2/EMFT/' },
          { text: '通信电路设计 CCD', link: '/Y3S2/CCD/CCD-README.md', activeMatch: '^/Y3S2/CCD/' },
          { text: '工程项目管理与财务 EPM&F', link: '/Y3S2/EPMF/EPMF-README.md', activeMatch: '^/Y3S2/EPMF/' },
        ]
      },

      { text: '早期资料', items: [
        { text: '嵌入式处理器 EP (DT5EDU)', link: 'https://mp.weixin.qq.com/s/Xqwg9KBZHkuYoXQAH-DfGw' },
        { text: '电路分析与设计 CAD (DT5EDU)', link: 'https://mp.weixin.qq.com/s/-_oFpk5asMRE_D6sqlMCsw' },
        { text: '微电子系统 MS (DT5EDU)', link: 'https://mp.weixin.qq.com/s/-9nZpf5RWmMm46bBMuBrLg' },

       ]
      },

      { text: '杂项', items: [
        { text: '更新日志', link: '/changelog' },
        { text: '金曲', link: '/others/songs/README.md', activeMatch: '^/others/songs/' },
        { text: '实验室', link: '/others/lab/README.md', activeMatch: '^/others/lab/' },

       ]
      },
    ],


    footer: {
      message: 'Released under the MIT License.\nBuilt with VitePress.',
      copyright: 'Copyright © 2025-present Ayaskt'
    },





    sidebar: {
      '/others/songs/': [
        {
          text: '金曲',
          collapsed: false,
          items: [
            { text: '金曲首页', link: '/others/songs/README.md' },
            { text: '自己肯定感爆上げ↑↑しゅきしゅきソング', link: '/others/songs/shuki.md' },
            { text: 'ヒッチコック', link: '/others/songs/hitchcock.md' },
            { text: '夢が僕らの太陽さ', link: '/others/songs/yume-taiyou.md' },
            { text: 'String Theocracy', link: '/others/songs/string-theocracy.md' },
          ],
        },
      ],

      '/others/lab/': [
        {
          text: '实验室',
          collapsed: false,
          items: [
            { text: '实验室首页', link: '/others/lab/README.md' },
            { text: '歌词容器', link: '/others/lab/lyric-container' },
            { text: 'SongCard', link: '/others/lab/song-card' },
            { text: 'MindMap', link: '/others/lab/mindmap' },
          ],
        },
      ],

      // 数字信号处理：当路径在 /Y3S2/DSP/ 下时显示
      '/Y3S2/DSP/': [
        {
          text: '数字信号处理 DSP 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/DSP/DSP-README.md' },
            {
              text: 'Block 1: 离散时间信号与系统',
              collapsed: false,
              items: [
                { text: 'Ch 2: 时域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 2' },
                { text: 'Ch 3 I: 频域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 3 I' },
                { text: 'Ch 3 II: 频域离散时间信号', link: '/Y3S2/DSP/DSP Chapter 3 II' },
                { text: 'Ch 4: 离散时间系统', link: '/Y3S2/DSP/DSP Chapter 4' },
              ],
            },
            {
              text: 'Block 2: 离散变换',
              collapsed: false,
              items: [
                { text: 'Ch 5: 离散傅里叶变换 DFT', link: '/Y3S2/DSP/DSP Chapter 5' },
                { text: 'Ch 6: Z 变换', link: '/Y3S2/DSP/DSP Chapter 6' },
                { text: 'Ch 7: 变换域中的离散 LTI 系统', link: '/Y3S2/DSP/DSP Chapter 7' },
              ],
            },
            {
              text: 'Block 3: 数字滤波器设计',
              collapsed: false,
              items: [
                { text: 'Ch 8: 数字滤波器架构', link: '/Y3S2/DSP/DSP Chapter 8' },
                { text: 'Ch 9: IIR 数字滤波器设计', link: '/Y3S2/DSP/DSP Chapter 9' },
                { text: 'Ch 10: FIR 数字滤波器设计', link: '/Y3S2/DSP/DSP Chapter 10' },
              ],
            },
            {
              text: 'Block 4: DSP 算法实现',
              collapsed: false,
              items: [
                { text: 'Ch 11: DSP 算法实现 FFT', link: '/Y3S2/DSP/DSP Chapter 11' },
              ],
            },
          ],
        },
      ],


      // 工程项目管理与财务 EPMF：当路径在 /Y3S2/EPMF/ 下时显示
      '/Y3S2/EPMF/': [
        {
          text: '工程项目管理与财务 EPMF 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/EPMF/EPMF-README' },
            {
              text: 'Block 1 项目管理',
              collapsed: false,
              items: [
                { text: 'Lecture 1', link: '/Y3S2/EPMF/Block 1/Lecture 1' },
                { text: 'Lecture 2', link: '/Y3S2/EPMF/Block 1/Lecture 2' },
                { text: 'Lecture 3', link: '/Y3S2/EPMF/Block 1/Lecture 3' },
                { text: 'Lecture 4', link: '/Y3S2/EPMF/Block 1/Lecture 4' },
                { text: 'Block 1 例题 Examples', link: '/Y3S2/EPMF/Block 1/Block 1 Examples' },
                { text: '思维导图', link: '/Y3S2/EPMF/Block 1/Mindmap' },
              ],
            },
            {
              text: 'Block 2 面向制造的设计',
              collapsed: false,
              items: [
                { text: 'Lecture 5', link: '/Y3S2/EPMF/Block 2/Lecture 5' },
                { text: 'Lecture 6', link: '/Y3S2/EPMF/Block 2/Lecture 6' },
                { text: 'Lecture 7', link: '/Y3S2/EPMF/Block 2/Lecture 7' },
                { text: 'Lecture 8', link: '/Y3S2/EPMF/Block 2/Lecture 8' },
                { text: 'Block 2 例题 Examples', link: '/Y3S2/EPMF/Block 2/Block 2 Examples' },
                { text: '思维导图', link: '/Y3S2/EPMF/Block 2/Mindmap' },
              ],
            },
            {
              text: 'Block 3 工程经济学',
              collapsed: false,
              items: [
                { text: 'Lecture 9', link: '/Y3S2/EPMF/Block 3/Lecture 9' },
                { text: 'Lecture 10', link: '/Y3S2/EPMF/Block 3/Lecture 10' },
                { text: 'Lecture 11', link: '/Y3S2/EPMF/Block 3/Lecture 11' },
                { text: 'Lecture 12', link: '/Y3S2/EPMF/Block 3/Lecture 12' },
                { text: 'Lecture 13 I', link: '/Y3S2/EPMF/Block 3/Lecture 13 Part 1' },
                { text: 'Lecture 13 II', link: '/Y3S2/EPMF/Block 3/Lecture 13 Part 2' },
                { text: 'Lecture 13 II Ex.', link: '/Y3S2/EPMF/Block 3/Lecture 13-2 Extended Version' },
                { text: '思维导图', link: '/Y3S2/EPMF/Block 3/Mindmap' },
              ],
            },
            {
              text: 'Block 4 公司管理',
              collapsed: false,
              items: [
                { text: 'Lecture 14', link: '/Y3S2/EPMF/Block 4/Lecture 14' },
                { text: 'Lecture 15', link: '/Y3S2/EPMF/Block 4/Lecture 15' },
                { text: 'Lecture 16', link: '/Y3S2/EPMF/Block 4/Lecture 16' },
                { text: '思维导图', link: '/Y3S2/EPMF/Block 4/Mindmap' },
              ],
            },
          ],
        },
      ],


      // 电磁场与波 EMFT：当路径在 /Y3S2/EMFT/ 下时显示
      '/Y3S2/EMFT/': [
        {
          text: '电磁场与波 EMFT 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/EMFT/EMFT-README' },
            {
              text: 'Part I 电场',
              collapsed: false,
              items: [
                { text: 'Ch 2 矢量分析', link: '/Y3S2/EMFT/EMFT Chapter 2' },
                { text: 'Ch 3 I 静电场 (上)', link: '/Y3S2/EMFT/EMFT Chapter 3 P I' },
                { text: 'Ch 3 II 静电场 (下)', link: '/Y3S2/EMFT/EMFT Chapter 3 P II' },
                { text: 'Ch 4 静电场问题求解', link: '/Y3S2/EMFT/EMFT Chapter 4' },
                { text: 'Ch 5 恒定电流', link: '/Y3S2/EMFT/EMFT Chapter 5' },
              ],
            },
            {
              text: 'Part II 磁场与电磁波',
              collapsed: false,
              items: [
                { text: 'Ch 6 静磁场', link: '/Y3S2/EMFT/EMFT Chapter 6' },
                { text: 'Ch 7 时变场与 Maxwell 方程组', link: '/Y3S2/EMFT/EMFT Chapter 7' },
                { text: 'Ch 8 I 平面电磁波 (上)', link: '/Y3S2/EMFT/EMFT Chapter 8 P I' },
                { text: 'Ch 8 II 平面电磁波 (下)', link: '/Y3S2/EMFT/EMFT Chapter 8 P II' },
              ],
            },
            {
              text: 'Extra 复习',
              collapsed: false,
              items: [
                { text: 'Ex 1 公式复习', link: '/Y3S2/EMFT/EFMT Extra 1' },
                { text: 'Ex 2 概念复习', link: '/Y3S2/EMFT/EFMT Extra 2' },
              ],
            },
          ]
        }
      ],

      // 通信电路设计 CCD：当路径在 /Y3S2/CCD/ 下时显示
      '/Y3S2/CCD/': [
        {
          text: '通信电路设计 CCD 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S2/CCD/CCD-README.md' },
            {
            text: 'Part 1 — 半导体器件',
            collapsed: false,
            items: [
                { text: 'Lec 1 导论', link: '/Y3S2/CCD/Part 1/CCD Lecture 1 Introduction' },
                { text: 'Lec 2 电子通信', link: '/Y3S2/CCD/Part 1/CCD Lecture 2 Electronic Communications' },
                { text: 'Lec 2b 半导体基础', link: '/Y3S2/CCD/Part 1/CCD Lecture 2b Semiconductors Basics' },
                { text: 'Lec 3-4 晶体管', link: '/Y3S2/CCD/Part 1/CCD Lecture 3-4 Transistors' },
                { text: 'Lec 5-6 放大器', link: '/Y3S2/CCD/Part 1/CCD Lecture 5-6 Amplifiers' },
              ],
            },
            {
              text: 'Part 2 — 通信电路基础',
              collapsed: false,
              items: [
                { text: 'Lec 7 混频器', link: '/Y3S2/CCD/Part 2/CCD Lecture 7 Mixers' },
                { text: 'Lec 8 LC 电路与匹配网络', link: '/Y3S2/CCD/Part 2/CCD Lecture 8 LC Circuits and Matching Networks' },
                { text: 'Lec 9 振荡器', link: '/Y3S2/CCD/Part 2/CCD Lecture 9 Oscillators' },
                { text: 'Lec 10 复习回顾', link: '/Y3S2/CCD/Part 2/CCD Lecture 10 Revision' },
              ],
            },
            {
              text: 'Part 3 — 调制与天线',
              collapsed: false,
              items: [
                { text: 'Lec 11-12 幅度调制', link: '/Y3S2/CCD/Part 3/CCD Lecture 11-12 Amplitude Modulation' },
                { text: 'Lec 13 单边带通信', link: '/Y3S2/CCD/Part 3/CCD Lecture 13 Single-Sideband Communication SSB' },
                { text: 'Lec 14 FM与PM', link: '/Y3S2/CCD/Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation' },
                { text: 'Lec 15 天线', link: '/Y3S2/CCD/Part 3/CCD Lecture 15 Antennas in a Circuit' },
              ],
            },
            {
              text: 'Part 4 — PLL 与数模转换',
              collapsed: false,
              items: [
                { text: 'Lec 16 锁相环', link: '/Y3S2/CCD/Part 4/CCD Lecture 16 Phase-Locked Loop PLL' },
                { text: 'Lec 18 数模转换', link: '/Y3S2/CCD/Part 4/CCD Lecture 18 Digital to Analog Conversion' },
                { text: 'Lec 19-20 模数转换与转换误差', link: '/Y3S2/CCD/Part 4/CCD Lecture 19-20 ADC and Converter Errors' },
              ],
            },
          ],
        },
      ],

      // 通信原理与系统 CPS：当路径在 /Y3S1/CPS/ 下时显示
      '/Y3S1/CPS/': [
        {
          text: '通信原理与系统 CPS 课程总览',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/Y3S1/CPS/CPS-README' },
            { text: 'Lec 6 抑制载波双边带调幅 DSB-SC', link: '/Y3S1/CPS/CPS Lecture 6 Amplitude Modulation DSB-SC' },
            { text: 'Lec 7 常规调幅 DSB-WC', link: '/Y3S1/CPS/CPS Lecture 7 Amplitude Modulation DSB-WC' },
            { text: 'Lec 8 单边带调幅 SSB', link: '/Y3S1/CPS/CPS Lecture 8 Amplitude Modulation SSB' },
            { text: 'Lec 9 残留边带调幅 VSB', link: '/Y3S1/CPS/CPS Lecture 9 Amplitude Modulation VSB' },
            { text: 'Lec 11 角度调制 FM 与 PM', link: '/Y3S1/CPS/CPS Lecture 11 FM and PM' },
            { text: 'Lec 12 FM 带宽分析', link: '/Y3S1/CPS/CPS Lecture 12 FM Bandwidth Analysis' },
            { text: 'Lec 13 FM 解调', link: '/Y3S1/CPS/CPS Lecture 13 FM Demodulation' },
            { text: 'Lec 14 FM 生成', link: '/Y3S1/CPS/CPS Lecture 14 FM Generation' },
            { text: 'Lec 16 & 17 模数转换', link: '/Y3S1/CPS/CPS Lecture 16 & 17 Analog to Digital Conversion' },
            { text: 'Lec 18 AWGN 信道中的数字调制', link: '/Y3S1/CPS/CPS Lecture 18 Digital Modulation in AWGN Channel' },
            { text: 'Lec 19 数字调制中的噪声', link: '/Y3S1/CPS/CPS Lecture 19 Noise in Digital Modulation' }
          ]
        }
      ],

      // 人工智能与机器学习 AIML：当路径在 /Y3S1/AIML/ 下时显示
      '/Y3S1/AIML/': [
        {
          text: '人工智能与机器学习 AIML',
          collapsed: false,
          items: [
            { text: '课程总览', link: '/Y3S1/AIML/AIML-README' },
            {
              text: '进化计算 Evolutionary Computation',
              collapsed: false,
              items: [
                { text: 'Lec 1 优化 Optimization', link: '/Y3S1/AIML/EC Lecture 1' },
                { text: 'Lec 2 遗传算法 GA', link: '/Y3S1/AIML/EC Lecture 2' },
                { text: 'Lec 3 受约束优化', link: '/Y3S1/AIML/EC Lecture 3' },
                { text: 'Lec 4 组合优化 CO', link: '/Y3S1/AIML/EC Lecture 4' },
              ],
            },
            {
              text: '机器学习 Machine Learning',
              collapsed: false,
              items: [
                { text: 'Lec 2 机器学习基础', link: '/Y3S1/AIML/ML Lecture 2' },
                { text: 'Lec 3 I 模型训练基础', link: '/Y3S1/AIML/ML Lecture 3 Part I' },
                { text: 'Lec 3 II 数据准备', link: '/Y3S1/AIML/ML Lecture 3 Part II' },
                { text: 'Lec 4 I 特征选择', link: '/Y3S1/AIML/ML Lecture 4 Part I' },
                { text: 'Lec 4 II 降维', link: '/Y3S1/AIML/ML Lecture 4 Part II' },
                { text: 'Lec 5 支持向量机 SVM', link: '/Y3S1/AIML/ML Lecture 5' },
                { text: 'Lec 6 神经网络 ANN', link: '/Y3S1/AIML/ML Lecture 6' },
              ],
            },
          ],
        },
      ],
    },



    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayaskt' },
      {
        icon: { svg: uestcIcon },
        link: 'https://www.uestc.edu.cn/'
      }
    ],

    search: isDevCommand
      ? undefined
      : {
          provider: 'local',
          options: {
            detailedView: false,
            _render: (src) => renderSearchHtml(src),
          },
        }
  },




})
