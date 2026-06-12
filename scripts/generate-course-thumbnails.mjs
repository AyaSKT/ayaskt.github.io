#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { collectCourseCovers } from './course-index-utils.mjs'

const root = process.cwd()
const docsRoot = path.join(root, 'docs')
const coverFallbacksOutputPath = path.join(root, 'docs/.vitepress/theme/generated/course-covers.json')
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
const coverFallbacks = {}

for (const readme of readmes) {
  const markdown = fs.readFileSync(readme, 'utf8')
  const courseCovers = collectCourseCovers({ docsRoot, readmePath: readme, markdown })

  Object.assign(coverFallbacks, courseCovers.fallbackCovers)

  for (const coverDocsPath of courseCovers.coverDocsPaths) {
    const sourcePath = path.join(docsRoot, coverDocsPath)
    if (!sourcePath || !fs.existsSync(sourcePath)) continue
    covers.set(sourcePath, thumbnailPathFor(sourcePath))
  }
}

const sortedCoverFallbacks = Object.fromEntries(
  Object.entries(coverFallbacks).sort(([left], [right]) => left.localeCompare(right)),
)

fs.mkdirSync(path.dirname(coverFallbacksOutputPath), { recursive: true })
fs.writeFileSync(coverFallbacksOutputPath, `${JSON.stringify(sortedCoverFallbacks, null, 2)}\n`)

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
console.log(`Fallback covers: ${Object.keys(sortedCoverFallbacks).length}.`)
console.log(`Output: ${path.relative(root, coverFallbacksOutputPath)}`)

for (const item of results) {
  console.log(`${item.thumb} (${formatBytes(item.thumbSize)} from ${formatBytes(item.originalSize)})`)
}
