#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import {
  normalizeDocsPath,
  resolveNotePath,
} from '../docs/.vitepress/shared/course-index-paths.mjs'

const root = process.cwd()
const docsRoot = path.join(root, 'docs')
const outputPath = path.join(root, 'docs/.vitepress/theme/generated/course-previews.json')

function walkMarkdown(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.vitepress' || entry.name === 'superpowers') continue

    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walkMarkdown(fullPath, files)
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath)
  }

  return files
}

function findCourseIndexFiles() {
  return walkMarkdown(docsRoot).filter((file) => fs.readFileSync(file, 'utf8').includes('<CourseIndex'))
}

function isTocHeading(value) {
  const headingText = value.trim().replace(/^#{1,6}\s+/, '')
  return /(?:章节目录|目录|Table of Contents|Contents)/i.test(headingText)
}

function headingLevel(value) {
  return value.trim().match(/^(#{1,6})\s+/)?.[1].length ?? 0
}

function withoutFrontmatter(markdown) {
  return markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
}

function getLinesAfterToc(lines) {
  const tocIndex = lines.findIndex((line) => isTocHeading(line))
  if (tocIndex === -1) return { lines, hasToc: false }

  const tocLevel = headingLevel(lines[tocIndex]) || 2
  const bodyStart = lines.findIndex((line, index) => {
    const level = headingLevel(line)
    return index > tocIndex && level > 0 && level <= tocLevel
  })

  return {
    lines: bodyStart >= 0 ? lines.slice(bodyStart) : [],
    hasToc: true,
  }
}

function cleanMarkdownLine(line) {
  let text = line.trim()
  if (!text || /^---+$/.test(text) || /^!\[[^\]]*]/.test(text)) return ''
  if (/^<\/?(?:div|span|p|br)\b/i.test(text)) return ''

  if (/^\|/.test(text)) {
    const cells = text
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)

    if (!cells.length || cells.every((cell) => /^:?-{3,}:?$/.test(cell))) return ''
    text = cells.slice(0, 2).join(': ')
  }

  return text
    .replace(/^#{1,6}\s+/, '')
    .replace(/^>{1,}\s*/, '')
    .replace(/^\[!(?:NOTE|TIP|IMPORTANT|CAUTION|WARNING)\]\s*/i, '')
    .replace(/^:{3,4}\s*\w*\s*/, '')
    .replace(/^[-*+]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerptMarkdown(markdown) {
  const { lines, hasToc } = getLinesAfterToc(withoutFrontmatter(markdown).split(/\r?\n/))
  const firstBodyHeading = hasToc ? 0 : lines.findIndex((line) => /^##\s+/.test(line.trim()))
  const bodyLines = firstBodyHeading >= 0 ? lines.slice(firstBodyHeading) : lines
  const parts = []
  let inFence = false
  let inMath = false

  for (const line of bodyLines) {
    const trimmed = line.trim()

    if (/^```/.test(trimmed)) {
      inFence = !inFence
      continue
    }

    if (/^\$\$/.test(trimmed)) {
      inMath = !inMath
      continue
    }

    if (inFence || inMath) continue

    const text = cleanMarkdownLine(line)
    if (!text) continue

    parts.push(text)
    if (parts.join(' ').length >= 260 || parts.length >= 5) break
  }

  const preview = parts.join(' / ')
  if (!preview) return '暂无正文预览'

  return preview.length > 280 ? `${preview.slice(0, 277)}...` : preview
}

const previews = {}
const missing = []

for (const readme of findCourseIndexFiles()) {
  const markdown = fs.readFileSync(readme, 'utf8')
  const fallbackBasePath = path.relative(docsRoot, path.dirname(readme)).replace(/\\/g, '/')
  const basePath = normalizeDocsPath(markdown.match(/basePath=["']([^"']+)["']/)?.[1] ?? fallbackBasePath)
  const linkPattern = /link:\s*(['"`])([^'"`]+)\1/g

  for (const match of markdown.matchAll(linkPattern)) {
    const notePath = resolveNotePath(basePath, match[2])
    if (!notePath || previews[notePath]) continue

    const sourcePath = path.join(docsRoot, notePath)
    if (!fs.existsSync(sourcePath)) {
      missing.push(notePath)
      previews[notePath] = '暂无正文预览'
      continue
    }

    previews[notePath] = excerptMarkdown(fs.readFileSync(sourcePath, 'utf8'))
  }
}

const sortedPreviews = Object.fromEntries(
  Object.entries(previews).sort(([left], [right]) => left.localeCompare(right)),
)

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, `${JSON.stringify(sortedPreviews, null, 2)}\n`)

console.log(`Generated ${Object.keys(sortedPreviews).length} course card previews.`)
console.log(`Output: ${path.relative(root, outputPath)}`)

if (missing.length) {
  console.warn(`Missing note files: ${missing.length}`)
  for (const notePath of missing) console.warn(`- ${notePath}`)
}
