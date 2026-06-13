import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const themeRoot = path.join(root, 'docs/.vitepress/theme')
const indexPath = path.join(themeRoot, 'index.ts')
const songCardPath = path.join(themeRoot, 'components/SongCard.vue')
const configPath = path.join(root, 'docs/.vitepress/config.mts')
const labReadmePath = path.join(root, 'docs/others/lab/README.md')
const songCardDocPath = path.join(root, 'docs/others/lab/song-card.md')

test('registers SongCard as a markdown component', () => {
  const indexSource = fs.readFileSync(indexPath, 'utf8')

  assert.match(indexSource, /import SongCard from ['"]\.\/components\/SongCard\.vue['"]/)
  assert.match(indexSource, /app\.component\(['"]SongCard['"]\s*,\s*SongCard\)/)
})

test('SongCard exposes album cover and CJK-aware metadata hooks', () => {
  assert.equal(fs.existsSync(songCardPath), true)

  const source = fs.readFileSync(songCardPath, 'utf8')

  assert.match(source, /cover:\s*string/)
  assert.match(source, /album\?:\s*string/)
  assert.match(source, /artist\?:\s*string/)
  assert.match(source, /song\?:\s*string/)
  assert.match(source, /--song-card-serif-sc:/)
  assert.match(source, /\.song-card:lang\(ja\)/)
})

test('SongCard keeps the cover one third wide with a low-reflection floating card style', () => {
  const source = fs.readFileSync(songCardPath, 'utf8')

  assert.match(source, /grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(0,\s*2fr\)/)
  assert.match(source, /aspect-ratio:\s*1/)
  assert.match(source, /border-radius:\s*8px/)
  assert.match(source, /--song-card-highlight:/)
  assert.match(source, /--song-card-depth-shadow:/)
  assert.match(source, /\.song-card:hover/)
  assert.match(source, /transform:\s*translate3d\(0,\s*-2px,\s*0\)/)
})

test('documents SongCard in the lab and sidebar', () => {
  assert.equal(fs.existsSync(songCardDocPath), true)

  const docSource = fs.readFileSync(songCardDocPath, 'utf8')
  const readmeSource = fs.readFileSync(labReadmePath, 'utf8')
  const configSource = fs.readFileSync(configPath, 'utf8')

  assert.match(docSource, /# SongCard/)
  assert.match(docSource, /<SongCard/)
  assert.match(docSource, /## 使用方法/)
  assert.match(readmeSource, /\[SongCard.*\]\(\.\/song-card\)/)
  assert.match(configSource, /text:\s*['"]SongCard['"],\s*link:\s*['"]\/others\/lab\/song-card['"]/)
})
