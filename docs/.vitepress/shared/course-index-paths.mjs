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

export function replaceMarkdownExtension(value) {
  return value.replace(/\.md(?=([?#]|$))/i, '.html')
}

function getDecodedPathPart(value) {
  const clean = stripAngleBrackets(value)
  if (!clean || isSpecialPath(clean)) return ''

  return decodeSafe(clean.split(/[?#]/, 1)[0] ?? '')
}

export function resolveNotePath(basePath, link) {
  const pathOnly = getDecodedPathPart(link)
  if (!pathOnly) return ''

  const markdownPath = pathOnly.replace(/\.html$/i, '.md')
  return markdownPath.startsWith('/')
    ? normalizeDocsPath(markdownPath.replace(/^\/+/, ''))
    : normalizeDocsPath(`${basePath}/${markdownPath}`)
}

export function resolveCourseAssetPath(basePath, assetPath) {
  const pathOnly = getDecodedPathPart(assetPath)
  if (!pathOnly) return ''

  return pathOnly.startsWith('/')
    ? normalizeDocsPath(pathOnly.replace(/^\/+/, ''))
    : normalizeDocsPath(`${basePath}/${pathOnly}`)
}

function dirnameDocsPath(value) {
  const normalized = normalizeDocsPath(value)
  const index = normalized.lastIndexOf('/')
  return index === -1 ? '' : normalized.slice(0, index)
}

export function resolveNoteImagePath(notePath, imagePath) {
  const pathOnly = getDecodedPathPart(imagePath)
  if (!pathOnly) return ''

  return pathOnly.startsWith('/')
    ? normalizeDocsPath(pathOnly.replace(/^\/+/, ''))
    : normalizeDocsPath(`${dirnameDocsPath(notePath)}/${pathOnly}`)
}
