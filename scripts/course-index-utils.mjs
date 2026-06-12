import fs from 'node:fs'
import path from 'node:path'

export function normalizeDocsPath(value) {
  const segments = []

  for (const segment of value.replace(/\\/g, '/').split('/')) {
    if (!segment || segment === '.') continue
    if (segment === '..') {
      segments.pop()
      continue
    }

    segments.push(segment)
  }

  return segments.join('/')
}

export function decodeSafe(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function stripAngleBrackets(value) {
  return value.trim().replace(/^<|>$/g, '')
}

export function isSpecialPath(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)
}

export function resolveCourseIndexBasePath(markdown, docsRoot, readmePath) {
  const configuredBasePath = markdown.match(/basePath=["']([^"']+)["']/)?.[1]
  if (configuredBasePath) return normalizeDocsPath(configuredBasePath)

  return normalizeDocsPath(path.relative(docsRoot, path.dirname(readmePath)))
}

export function resolveNotePath(basePath, link) {
  const clean = decodeSafe(stripAngleBrackets(link))
  if (!clean || isSpecialPath(clean)) return ''

  const pathOnly = clean.split(/[?#]/)[0] ?? ''
  if (!pathOnly) return ''

  const markdownPath = pathOnly.replace(/\.html$/i, '.md')
  return markdownPath.startsWith('/')
    ? normalizeDocsPath(markdownPath.replace(/^\/+/, ''))
    : normalizeDocsPath(`${basePath}/${markdownPath}`)
}

export function resolveCourseAssetPath(basePath, assetPath) {
  const clean = decodeSafe(stripAngleBrackets(assetPath))
  if (!clean || isSpecialPath(clean)) return ''

  const pathOnly = clean.split(/[?#]/)[0] ?? ''
  if (!pathOnly) return ''

  return pathOnly.startsWith('/')
    ? normalizeDocsPath(pathOnly.replace(/^\/+/, ''))
    : normalizeDocsPath(`${basePath}/${pathOnly}`)
}

export function resolveNoteImagePath(notePath, imagePath) {
  const clean = decodeSafe(stripAngleBrackets(imagePath))
  if (!clean || isSpecialPath(clean)) return ''

  const pathOnly = clean.split(/[?#]/)[0] ?? ''
  if (!pathOnly) return ''

  return pathOnly.startsWith('/')
    ? normalizeDocsPath(pathOnly.replace(/^\/+/, ''))
    : normalizeDocsPath(`${path.posix.dirname(notePath)}/${pathOnly}`)
}

export function findFirstMarkdownImage(markdown) {
  const imagePattern = /!\[[^\]]*]\(\s*(?:<([^>\n]+)>|([^\s)]+))(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g
  let inFence = false

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(?:```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }

    if (inFence) continue

    for (const match of line.matchAll(imagePattern)) {
      const imagePath = match[1] ?? match[2] ?? ''
      const clean = decodeSafe(stripAngleBrackets(imagePath))
      if (clean && !isSpecialPath(clean)) return clean
    }
  }

  return ''
}

function extractStringProperty(block, name) {
  const pattern = new RegExp(`${name}:\\s*(['"\`])([^'"\`]*)\\1`)
  return block.match(pattern)?.[2] ?? ''
}

export function extractCourseIndexItems(markdown) {
  const items = []
  const itemPattern = /\{[^{}]*link\s*:\s*(['"`])[^'"`]+\1[^{}]*\}/g

  for (const match of markdown.matchAll(itemPattern)) {
    const block = match[0]
    const link = extractStringProperty(block, 'link')
    if (!link) continue

    items.push({
      link,
      cover: extractStringProperty(block, 'cover'),
    })
  }

  return items
}

export function resolveFirstNoteImage(docsRoot, notePath) {
  const sourcePath = path.join(docsRoot, notePath)
  if (!fs.existsSync(sourcePath)) return ''

  const firstImage = findFirstMarkdownImage(fs.readFileSync(sourcePath, 'utf8'))
  if (!firstImage) return ''

  return resolveNoteImagePath(notePath, firstImage)
}

export function collectCourseCovers({ docsRoot, readmePath, markdown }) {
  const basePath = resolveCourseIndexBasePath(markdown, docsRoot, readmePath)
  const coverDocsPaths = []
  const fallbackCovers = {}

  for (const item of extractCourseIndexItems(markdown)) {
    const notePath = resolveNotePath(basePath, item.link)
    if (!notePath) continue

    let coverDocsPath = ''

    if (item.cover) {
      const configuredCover = resolveCourseAssetPath(basePath, item.cover)
      if (configuredCover && fs.existsSync(path.join(docsRoot, configuredCover))) {
        coverDocsPath = configuredCover
      }
    }

    if (!coverDocsPath) {
      const fallbackCover = resolveFirstNoteImage(docsRoot, notePath)
      if (fallbackCover && fs.existsSync(path.join(docsRoot, fallbackCover))) {
        coverDocsPath = fallbackCover
        fallbackCovers[notePath] = fallbackCover
      }
    }

    if (coverDocsPath) coverDocsPaths.push(coverDocsPath)
  }

  return {
    coverDocsPaths: [...new Set(coverDocsPaths)],
    fallbackCovers,
  }
}
