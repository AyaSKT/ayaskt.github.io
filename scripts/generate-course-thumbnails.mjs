#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const docsRoot = path.join(root, 'docs')
const MAX_WIDTH = 640
const QUALITY = 72

function commandExists(command) {
  return spawnSync(command, ['-version'], { stdio: 'ignore' }).status === 0
}

const hasMagick = commandExists('magick')
const hasCwebp = commandExists('cwebp')

if (!hasMagick && !hasCwebp) {
  console.error('generate-course-thumbnails: ImageMagick `magick` or `cwebp` is required.')
  process.exit(1)
}

function normalizeDocsPath(value) {
  return value
    .replace(/\\/g, '/')
    .split('/')
    .filter((segment) => segment && segment !== '.')
    .reduce((segments, segment) => {
      if (segment === '..') segments.pop()
      else segments.push(segment)
      return segments
    }, [])
    .join('/')
}

function decodeSafe(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function stripAngleBrackets(value) {
  return value.trim().replace(/^<|>$/g, '')
}

function isSpecialPath(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|data:|#)/i.test(value)
}

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

function resolveCoverPath(basePath, cover) {
  const clean = decodeSafe(stripAngleBrackets(cover))
  if (!clean || isSpecialPath(clean)) return ''

  const docsPath = clean.startsWith('/')
    ? normalizeDocsPath(clean.replace(/^\/+/, ''))
    : normalizeDocsPath(`${basePath}/${clean}`)

  return path.join(docsRoot, docsPath)
}

function thumbnailPathFor(sourcePath) {
  const parsed = path.parse(sourcePath)
  return path.join(parsed.dir, `${parsed.name}.thumb.webp`)
}

function shouldGenerate(sourcePath, targetPath, force) {
  if (force || !fs.existsSync(targetPath)) return true

  const sourceTime = fs.statSync(sourcePath).mtimeMs
  const targetTime = fs.statSync(targetPath).mtimeMs
  return sourceTime > targetTime
}

function generateWithMagick(sourcePath, targetPath) {
  execFileSync('magick', [
    sourcePath,
    '-auto-orient',
    '-resize',
    `${MAX_WIDTH}x>`,
    '-strip',
    '-quality',
    String(QUALITY),
    targetPath,
  ], { stdio: 'pipe' })
}

function generateWithCwebp(sourcePath, targetPath) {
  execFileSync('cwebp', [
    '-metadata',
    'none',
    '-resize',
    String(MAX_WIDTH),
    '0',
    '-q',
    String(QUALITY),
    sourcePath,
    '-o',
    targetPath,
  ], { stdio: 'pipe' })
}

function generateThumbnail(sourcePath, targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })

  if (hasMagick) generateWithMagick(sourcePath, targetPath)
  else generateWithCwebp(sourcePath, targetPath)
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const force = process.argv.includes('--force')
const readmes = findCourseIndexFiles()
const covers = new Map()

for (const readme of readmes) {
  const markdown = fs.readFileSync(readme, 'utf8')
  const fallbackBasePath = path.relative(docsRoot, path.dirname(readme)).replace(/\\/g, '/')
  const basePath = markdown.match(/basePath=["']([^"']+)["']/)?.[1] ?? fallbackBasePath
  const coverPattern = /cover:\s*(['"`])([^'"`]+)\1/g

  for (const match of markdown.matchAll(coverPattern)) {
    const sourcePath = resolveCoverPath(basePath, match[2])
    if (!sourcePath || !fs.existsSync(sourcePath)) continue
    covers.set(sourcePath, thumbnailPathFor(sourcePath))
  }
}

const results = []

for (const [sourcePath, targetPath] of covers) {
  if (shouldGenerate(sourcePath, targetPath, force)) {
    generateThumbnail(sourcePath, targetPath)
  }

  const originalSize = fs.statSync(sourcePath).size
  const thumbSize = fs.statSync(targetPath).size
  results.push({
    source: path.relative(root, sourcePath),
    thumb: path.relative(root, targetPath),
    originalSize,
    thumbSize,
  })
}

const totalOriginal = results.reduce((sum, item) => sum + item.originalSize, 0)
const totalThumbs = results.reduce((sum, item) => sum + item.thumbSize, 0)

console.log(`Generated/verified ${results.length} course cover thumbnails.`)
console.log(`Original covers: ${formatBytes(totalOriginal)}; thumbnails: ${formatBytes(totalThumbs)}.`)

for (const item of results) {
  console.log(`${item.thumb} (${formatBytes(item.thumbSize)} from ${formatBytes(item.originalSize)})`)
}
