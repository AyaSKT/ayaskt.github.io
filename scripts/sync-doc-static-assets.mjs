#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const docsRoot = path.join(root, 'docs')
const outputRoot = path.join(root, 'docs/public/_docs')

const SKIP_DIRS = new Set(['.vitepress', 'superpowers', 'public', '.obsidian'])
const SKIP_EXTENSIONS = new Set(['.md'])

function shouldCopy(filePath) {
  return !SKIP_EXTENSIONS.has(path.extname(filePath).toLowerCase())
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(path.join(dir, entry.name), files)
      continue
    }

    if (entry.isFile()) {
      const fullPath = path.join(dir, entry.name)
      if (shouldCopy(fullPath)) files.push(fullPath)
    }
  }

  return files
}

fs.rmSync(outputRoot, { recursive: true, force: true })

let copied = 0
let bytes = 0

for (const sourcePath of walk(docsRoot)) {
  const relative = path.relative(docsRoot, sourcePath)
  const targetPath = path.join(outputRoot, relative)
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.copyFileSync(sourcePath, targetPath)
  copied += 1
  bytes += fs.statSync(sourcePath).size
}

console.log(`Synced ${copied} doc static assets to ${path.relative(root, outputRoot)} (${formatBytes(bytes)}).`)

function formatBytes(value) {
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`
  return `${(value / 1024 / 1024).toFixed(1)} MB`
}
