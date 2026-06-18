import path from 'node:path'

const MARKDOWN_EXT_RE = /\.md$/i
const HTML_EXT_RE = /\.html$/i
const INDEX_RE = /(?:^|\/)index\.md$/i

export function normalizePathname(value: string) {
  const parts: string[] = []
  for (const part of value.replace(/\\/g, '/').split('/')) {
    if (!part || part === '.') continue
    if (part === '..') {
      parts.pop()
      continue
    }
    parts.push(part)
  }
  return parts.join('/')
}

export function docsPathToRoutePath(docsPath: string) {
  const normalized = normalizePathname(docsPath)
  if (!MARKDOWN_EXT_RE.test(normalized)) return `/${normalized}`
  if (normalized === 'index.md') return '/'
  if (INDEX_RE.test(normalized)) {
    return `/${normalized.replace(INDEX_RE, '')}/`.replace(/\/+/g, '/')
  }
  return `/${normalized.replace(MARKDOWN_EXT_RE, '')}`
}

export function routePathToUrlPath(routePath: string) {
  if (routePath === '/') return '/'
  return routePath.replace(/\/index$/, '/')
}

export function docsPathToUrlPath(docsPath: string) {
  return routePathToUrlPath(docsPathToRoutePath(docsPath))
}

export function routePathAliases(urlPath: string) {
  const canonical = urlPath.replace(/^\//, '').replace(/\/$/, '')
  if (!canonical) return []

  const aliases = new Set([canonical])
  if (canonical.endsWith('/README')) aliases.add(canonical.replace(/\/README$/, ''))
  return [...aliases].filter(Boolean)
}

export function isExternalHref(href: string) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)
}

export function normalizeSiteHref(href: string) {
  const trimmed = href.trim()
  if (!trimmed || isExternalHref(trimmed)) return href

  const { pathPart, suffix } = splitHref(trimmed)
  if (!pathPart) return href

  const normalized = normalizePathname(safeDecode(pathPart))
    .replace(MARKDOWN_EXT_RE, '')
    .replace(HTML_EXT_RE, '')
  const route = pathPart.startsWith('/') ? `/${normalized}` : normalized
  return `${route || '/'}${suffix}`
}

export function normalizeComparablePath(value: string) {
  const normalized = normalizeSiteHref(value)
    .replace(/\/index$/i, '/')
    .replace(/\/$/, '')
  return normalized || '/'
}

function splitHref(href: string) {
  const hashIndex = href.indexOf('#')
  const queryIndex = href.indexOf('?')
  const splitIndex = [hashIndex, queryIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0]
  if (splitIndex === undefined) return { pathPart: href, suffix: '' }
  return {
    pathPart: href.slice(0, splitIndex),
    suffix: href.slice(splitIndex),
  }
}

export function resolveMarkdownHref(href: string, fromDocsPath: string) {
  const trimmed = href.trim()
  if (!trimmed || isExternalHref(trimmed)) return href

  const { pathPart, suffix } = splitHref(trimmed)
  if (!pathPart) return href

  const decodedPath = safeDecode(pathPart)
  const resolvedDocsPath = decodedPath.startsWith('/')
    ? normalizePathname(decodedPath.replace(/^\/+/, ''))
    : normalizePathname(path.posix.join(path.posix.dirname(fromDocsPath), decodedPath))

  const route = MARKDOWN_EXT_RE.test(resolvedDocsPath)
    ? docsPathToUrlPath(resolvedDocsPath)
    : docsPathToUrlPath(`${resolvedDocsPath}.md`)

  return `${route}${suffix}`
}

export function resolveMarkdownAssetHref(href: string, fromDocsPath: string) {
  const trimmed = href.trim()
  if (!trimmed || isExternalHref(trimmed)) return href

  const { pathPart, suffix } = splitHref(trimmed)
  if (!pathPart) return href

  const decodedPath = safeDecode(pathPart)
  if (decodedPath.startsWith('/')) return `${decodedPath}${suffix}`

  const resolvedDocsPath = normalizePathname(path.posix.join(path.posix.dirname(fromDocsPath), decodedPath))
  return `/_docs/${resolvedDocsPath}${suffix}`
}

export function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
