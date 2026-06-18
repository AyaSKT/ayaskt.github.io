import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { DocFrontmatter, DocRoute } from '../../config/types'
import { docsPathToRoutePath, docsPathToUrlPath, normalizePathname } from '../routing/vitepressPaths'

export interface LoadedDoc extends DocRoute {
  content: string
  title: string
}

const root = process.cwd()
export const docsRoot = path.join(root, 'docs')

const EXCLUDED_DIRS = new Set(['.vitepress', 'superpowers'])
const EXCLUDED_ROUTE_DIRS = new Set(['.vitepress', 'superpowers', '.obsidian'])

function walkMarkdown(dir: string, files: string[] = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue
      walkMarkdown(path.join(dir, entry.name), files)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path.join(dir, entry.name))
    }
  }

  return files
}

export function loadAllDocs() {
  return walkMarkdown(docsRoot)
    .filter((file) => isRouteMarkdown(path.relative(docsRoot, file)))
    .map(loadDocFromFile)
    .sort((a, b) => a.urlPath.localeCompare(b.urlPath))
}

export function loadDocFromFile(sourcePath: string): LoadedDoc {
  const raw = fs.readFileSync(sourcePath, 'utf8')
  const parsed = matter(raw)
  const docsPath = normalizePathname(path.relative(docsRoot, sourcePath))
  const routePath = docsPathToRoutePath(docsPath)
  const urlPath = docsPathToUrlPath(docsPath)
  const frontmatter = parsed.data as DocFrontmatter

  return {
    sourcePath,
    docsPath,
    routePath,
    urlPath,
    frontmatter,
    content: resolveIncludes(parsed.content, sourcePath),
    title: frontmatter.title || inferTitle(parsed.content) || 'Untitled',
  }
}

function isRouteMarkdown(relativePath: string) {
  const normalized = normalizePathname(relativePath)
  const parts = normalized.split('/')
  if (parts.some((part) => EXCLUDED_ROUTE_DIRS.has(part))) return false
  if (parts.some((part) => /(?:\.attachments|\.assets)$/i.test(part))) return false
  if (parts.some((part) => /^(?:Attachments|Assets|Assests)$/i.test(part))) return false
  return true
}

function resolveIncludes(content: string, sourcePath: string) {
  return content.replace(/<!--\s*@include:\s*([^\s]+)\s*-->/g, (_match, rawPath) => {
    const includePath = path.resolve(path.dirname(sourcePath), rawPath)
    if (!includePath.startsWith(root) || !fs.existsSync(includePath)) return ''
    return fs.readFileSync(includePath, 'utf8')
  })
}

export function findDocByUrlPath(urlPath: string) {
  const normalized = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '')
  return loadAllDocs().find((doc) => {
    if (doc.urlPath === '/') return normalized === '/'
    return doc.urlPath.replace(/\/$/, '') === normalized
  })
}

function inferTitle(content: string) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? ''
}
