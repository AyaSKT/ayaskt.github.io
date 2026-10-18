#!/usr/bin/env node
// 构建后处理：把 dist 里的 PNG / JPG / GIF 全部转成 WebP，并改写 HTML / JS / CSS 中的引用。
// 由 config.mts 的 buildEnd 调用；也可单独运行：node scripts/optimize-dist-images.mjs [distDir]
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const RASTER_RE = /\.(?:png|jpe?g|gif)$/i
const TEXT_RE = /\.(?:html|js|mjs|css|json|xml|svg|webmanifest|txt)$/i
const REF_EXT_RE = /\.(?:png|jpe?g|gif)(?![A-Za-z0-9_-])/gi
const URL_CHAR_RE = /[A-Za-z0-9_\-.~%/:@]/
const RELATIVE_BOUNDARY_RE = /["'`()\s=,<>\\]/

export const WEBP_SETTINGS = {
  version: 1,
  maxWidth: 2400,
  photoQuality: 80,
  graphicQuality: 82,
  alphaQuality: 90,
  effort: 5,
  // 转换后至少要比原图小这么多才替换，否则保留原图
  minSaving: 0.05,
}

const settingsHash = crypto.createHash('sha1').update(JSON.stringify(WEBP_SETTINGS)).digest('hex').slice(0, 8)

async function walk(dir, files = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, files)
    else if (entry.isFile()) files.push(full)
  }
  return files
}

function toUrlPath(outDir, file) {
  return path.relative(outDir, file).split(path.sep).join('/')
}

function stripUrl(value, base) {
  let clean = value.split(/[?#]/)[0]
  if (/^[a-z][a-z0-9+.-]*:/i.test(clean) || clean.startsWith('//')) return ''
  if (base !== '/' && clean.startsWith(base)) clean = `/${clean.slice(base.length)}`
  try {
    clean = decodeURI(clean)
  } catch {}
  return clean.replace(/^\/+/, '')
}

// 站点图标与分享图需要保持原格式（部分平台/浏览器不认 WebP 图标）
async function collectHeadExclusions(outDir, base) {
  const excluded = new Set()
  let html = ''
  try {
    html = await fs.readFile(path.join(outDir, 'index.html'), 'utf8')
  } catch {
    return excluded
  }

  const linkRe = /<link\b[^>]*\brel="(?:icon|shortcut icon|apple-touch-icon[^"]*|mask-icon)"[^>]*>/gi
  const metaRe = /<meta\b[^>]*\b(?:property|name)="(?:og:image|twitter:image)[^"]*"[^>]*>/gi
  for (const tag of html.match(linkRe) ?? []) {
    const href = tag.match(/\bhref="([^"]+)"/i)?.[1]
    if (href) excluded.add(stripUrl(href, base))
  }
  for (const tag of html.match(metaRe) ?? []) {
    const content = tag.match(/\bcontent="([^"]+)"/i)?.[1]
    if (content) excluded.add(stripUrl(content, base))
  }
  excluded.delete('')
  return excluded
}

async function encodeWebp(buffer, ext) {
  const isGif = ext === '.gif'
  const image = sharp(buffer, { animated: isGif, failOn: 'none' })
  const meta = await image.metadata()
  const pipeline = isGif ? image : image.rotate()

  if (!isGif && meta.width && meta.width > WEBP_SETTINGS.maxWidth) {
    pipeline.resize({ width: WEBP_SETTINGS.maxWidth, withoutEnlargement: true })
  }

  const isPhoto = ext === '.jpg' || ext === '.jpeg'
  return pipeline
    .webp({
      quality: isPhoto ? WEBP_SETTINGS.photoQuality : WEBP_SETTINGS.graphicQuality,
      alphaQuality: WEBP_SETTINGS.alphaQuality,
      effort: WEBP_SETTINGS.effort,
      smartSubsample: true,
    })
    .toBuffer()
}

// 以「原图内容 + 参数」为 key 缓存结果；未达到 minSaving 的记为 .skip
async function convertCached(cacheDir, buffer, ext) {
  const key = crypto.createHash('sha1').update(buffer).digest('hex') + `-${settingsHash}`
  const hit = path.join(cacheDir, `${key}.webp`)
  const skip = path.join(cacheDir, `${key}.skip`)

  try {
    return { key: `${key}.webp`, output: await fs.readFile(hit), cached: true }
  } catch {}
  try {
    await fs.access(skip)
    return { key: `${key}.skip`, output: null, cached: true }
  } catch {}

  const output = await encodeWebp(buffer, ext)
  if (output.length > buffer.length * (1 - WEBP_SETTINGS.minSaving)) {
    await fs.writeFile(skip, '')
    return { key: `${key}.skip`, output: null, cached: false }
  }
  await fs.writeFile(hit, output)
  return { key: `${key}.webp`, output, cached: false }
}

async function runPool(items, limit, worker) {
  let next = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      await worker(items[index], index)
    }
  })
  await Promise.all(runners)
}

function buildRewriter(renames, base) {
  // 按最后一段文件名分组，扫描时只需在扩展名处回看一次
  const bySegment = new Map()
  const add = (from, to) => {
    const segment = from.slice(from.lastIndexOf('/') + 1)
    const list = bySegment.get(segment) ?? []
    list.push([from, to])
    list.sort((a, b) => b[0].length - a[0].length)
    bySegment.set(segment, list)
  }

  const prefixes = base === '/' ? ['/'] : ['/', base]
  for (const [from, to] of renames) {
    for (const prefix of prefixes) {
      add(prefix + from, prefix + to)
      const encodedFrom = encodeURI(from)
      if (encodedFrom !== from) add(prefix + encodedFrom, prefix + encodeURI(to))
    }
  }

  // frontmatter / 组件 props 里的相对路径（如 `5.jpg`）按页面所在目录解析
  const resolveRelative = (content, end, pageDir) => {
    let start = end
    while (start > 0 && !RELATIVE_BOUNDARY_RE.test(content[start - 1])) start--
    const token = content.slice(start, end)
    if (!token || token.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(token)) return null

    let decoded = token
    try {
      decoded = decodeURI(token)
    } catch {}
    const resolved = path.posix.normalize(path.posix.join(pageDir, decoded))
    const target = renames.get(resolved)
    if (!target) return null

    const suffix = target.slice(resolved.length - path.posix.extname(resolved).length)
    return { start, to: token.slice(0, token.length - path.posix.extname(token).length) + suffix }
  }

  return (content, pageDir = null) => {
    let out = ''
    let last = 0
    let count = 0
    for (const match of content.matchAll(REF_EXT_RE)) {
      const end = match.index + match[0].length
      let replacement = null

      const slash = content.lastIndexOf('/', match.index)
      for (const [from, to] of (slash >= 0 && bySegment.get(content.slice(slash + 1, end))) || []) {
        const start = end - from.length
        if (start < last || !content.startsWith(from, start)) continue
        if (start > 0 && URL_CHAR_RE.test(content[start - 1])) continue
        replacement = { start, to }
        break
      }
      if (!replacement && pageDir !== null) replacement = resolveRelative(content, end, pageDir)
      if (!replacement || replacement.start < last) continue

      out += content.slice(last, replacement.start) + replacement.to
      last = end
      count++
    }
    return { content: count ? out + content.slice(last) : content, count }
  }
}

// HTML 所在目录即页面目录；页面 JS chunk 通过 HTML 里的 modulepreload 找回对应页面
async function collectPageDirs(outDir, files) {
  const pageDirs = new Map()
  for (const file of files) {
    if (!file.endsWith('.html')) continue
    const dir = path.posix.dirname(toUrlPath(outDir, file)).replace(/^\.$/, '')
    pageDirs.set(file, dir)

    const html = await fs.readFile(file, 'utf8')
    for (const match of html.matchAll(/["/]assets\/([^"]+?\.md\.[\w-]+)\.lean\.js"/g)) {
      let name = match[1]
      try {
        name = decodeURI(name)
      } catch {}
      for (const chunk of [`${name}.lean.js`, `${name}.js`]) {
        pageDirs.set(path.join(outDir, 'assets', chunk), dir)
      }
    }
  }
  return pageDirs
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export async function optimizeDistImages({
  outDir,
  base = '/',
  cacheDir = path.join(root, 'docs/.vitepress/cache/dist-webp'),
  log = console.log,
} = {}) {
  const startedAt = Date.now()
  sharp.cache(false)
  await fs.mkdir(cacheDir, { recursive: true })

  const files = await walk(outDir)
  const existing = new Set(files.map((file) => toUrlPath(outDir, file)))
  const excluded = await collectHeadExclusions(outDir, base)
  const rasters = files.filter((file) => RASTER_RE.test(file))
  const sources = rasters.filter((file) => !excluded.has(toUrlPath(outDir, file)))

  // 目标名已被占用（如 public 里本来就有同名 .webp）时改用 name.ext.webp
  const targets = new Map()
  const claimed = new Set(existing)
  for (const file of sources) {
    const rel = toUrlPath(outDir, file)
    let target = rel.replace(RASTER_RE, '.webp')
    if (claimed.has(target)) target = `${rel}.webp`
    claimed.add(target)
    targets.set(file, target)
  }

  const renames = new Map()
  const usedCacheKeys = new Set()
  let before = 0
  let after = 0
  let fresh = 0
  let kept = 0
  const failures = []

  await runPool(sources, Math.max(2, Math.min(6, os.availableParallelism?.() ?? os.cpus().length)), async (file) => {
    const rel = toUrlPath(outDir, file)
    try {
      const buffer = await fs.readFile(file)
      const result = await convertCached(cacheDir, buffer, path.extname(file).toLowerCase())
      usedCacheKeys.add(result.key)
      if (!result.cached) fresh++

      before += buffer.length
      if (!result.output) {
        after += buffer.length
        kept++
        return
      }

      await fs.writeFile(path.join(outDir, targets.get(file)), result.output)
      await fs.unlink(file)
      after += result.output.length
      renames.set(rel, targets.get(file))
    } catch (error) {
      failures.push(`${rel}: ${error.message}`)
    }
  })

  const rewrite = buildRewriter(renames, base)
  const pageDirs = await collectPageDirs(outDir, files)
  const textFiles = files.filter((file) => TEXT_RE.test(file))
  let references = 0
  let touched = 0
  await runPool(textFiles, 16, async (file) => {
    const original = await fs.readFile(file, 'utf8')
    const { content, count } = rewrite(original, pageDirs.get(file) ?? null)
    if (!count) return
    references += count
    touched++
    await fs.writeFile(file, content)
  })

  for (const name of await fs.readdir(cacheDir)) {
    if (!usedCacheKeys.has(name)) await fs.rm(path.join(cacheDir, name), { force: true })
  }

  const saved = before ? (1 - after / before) * 100 : 0
  log(`[webp] ${renames.size} 张转为 WebP，${kept} 张保留原格式（转换后不够小），${rasters.length - sources.length} 张图标/分享图跳过`)
  log(`[webp] 图片体积 ${formatBytes(before)} → ${formatBytes(after)}（-${saved.toFixed(1)}%），本次新编码 ${fresh} 张，其余命中缓存`)
  log(`[webp] 改写 ${touched} 个文件中的 ${references} 处引用，用时 ${((Date.now() - startedAt) / 1000).toFixed(1)}s`)
  if (failures.length) {
    log(`[webp] ${failures.length} 张转换失败，已保留原图：`)
    for (const line of failures) log(`  - ${line}`)
  }

  return { converted: renames.size, kept, before, after, references, failures }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outDir = path.resolve(process.argv[2] ?? path.join(root, 'docs/.vitepress/dist'))
  await optimizeDistImages({ outDir, base: process.env.VITEPRESS_BASE ?? '/' })
}
