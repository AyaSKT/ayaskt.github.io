/* download-fonts.mjs
 * 从 Google Fonts 下载 Noto 中文字体的 unicode-range 分片 woff2,
 * 生成本地 fonts.css,供站点自托管(避免运行时访问 fonts.googleapis.com 的
 * 慢速/不可达问题)。CI 与本地构建都会通过 docs:assets 调用本脚本;
 * 下载过的分片会被跳过(URL 自带内容 hash,天然幂等)。
 * dev 使用 --offline,保留已有字体;首次运行时生成空样式表并使用系统字体。
 */
import { createWriteStream, existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const docsRoot = resolve(scriptDir, '../docs')
const fontsDir = join(docsRoot, 'public/fonts')
const outputCssPath = join(fontsDir, 'fonts.css')

// 与 config.mts head 中一致的字体集;减少字重会同步减少分片数量
const FAMILIES = [
  { family: 'Noto Sans SC', weights: [400, 500, 600, 700] },
  { family: 'Noto Serif SC', weights: [400, 500, 600, 700] },
]

const CONCURRENCY = 8
const CHROME_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

function familyParam(f) {
  return `${f.family.replace(/ /g, '+')}:wght@${f.weights.join(';')}`
}

function buildCssUrl() {
  const families = FAMILIES.map(familyParam).join('&family=')
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`
}

/** 解析 css2 响应,返回 @font-face 规则列表 */
function parseFontFaces(cssText) {
  const faces = []
  const blockRe = /@font-face\s*{([^}]*)}/g
  let match
  while ((match = blockRe.exec(cssText))) {
    const block = match[1]
    const read = (prop) => {
      const m = block.match(new RegExp(`${prop}\\s*:\\s*([^;]+);`))
      return m ? m[1].trim() : ''
    }
    const urlMatch = block.match(/url\(\s*['"]?([^)'"]+)['"]?\s*\)/)
    if (!urlMatch) continue
    faces.push({
      family: read('font-family').replace(/['"]/g, ''),
      style: read('font-style'),
      weight: read('font-weight'),
      unicodeRange: read('unicode-range'),
      url: urlMatch[1],
    })
  }
  return faces
}

/** 从 Google Fonts 拉取 css2 响应 */
async function fetchCss() {
  const res = await fetch(buildCssUrl(), {
    headers: { 'user-agent': CHROME_UA, accept: 'text/css,*/*;q=0.1' },
  })
  if (!res.ok) throw new Error(`Google Fonts css2 request failed: ${res.status}`)
  return res.text()
}

/** 并发下载 woff2 到 fontsDir,返回实际下载数 */
async function downloadFaces(faces) {
  mkdirSync(fontsDir, { recursive: true })
  const seen = new Map() // url -> localFileName
  for (const face of faces) {
    const fileName = face.url.split('/').pop() || face.url.split('?')[0].split('/').pop()
    seen.set(face.url, fileName)
  }

  let downloaded = 0
  const queue = [...seen.entries()]
  const worker = async () => {
    for (;;) {
      const item = queue.pop()
      if (!item) return
      const [url, fileName] = item
      const target = join(fontsDir, fileName)
      if (existsSync(target) && statSync(target).size > 0) continue
      const res = await fetch(url, { headers: { 'user-agent': CHROME_UA } })
      if (!res.ok) throw new Error(`Font download failed (${res.status}): ${url}`)
      await pipeline(res.body, createWriteStream(target))
      downloaded += 1
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  // 清理不再被引用的旧分片
  const keep = new Set(seen.values())
  for (const fileName of readdirSync(fontsDir)) {
    if (fileName === 'fonts.css') continue
    if (!keep.has(fileName)) unlinkSync(join(fontsDir, fileName))
  }

  return { total: seen.size, downloaded }
}

/** 生成指向本地文件的 fonts.css */
function writeLocalCss(faces) {
  const blocks = faces.map((face) => {
    const fileName = face.url.split('/').pop()
    const lines = [
      '@font-face {',
      `  font-family: '${face.family}';`,
      `  font-style: ${face.style};`,
      `  font-weight: ${face.weight};`,
      `  font-display: swap;`,
    ]
    if (face.unicodeRange) lines.push(`  unicode-range: ${face.unicodeRange};`)
    lines.push(`  src: url(/fonts/${fileName}) format('woff2');`)
    lines.push('}')
    return lines.join('\n')
  })
  const header = '/* 本文件由 scripts/download-fonts.mjs 自动生成,请勿手工修改。 */\n'
  writeFileSync(outputCssPath, header + blocks.join('\n\n') + '\n')
}

async function main() {
  if (process.argv.includes('--offline')) {
    if (existsSync(outputCssPath)) {
      console.log('Fonts: using local fonts.css (offline dev mode).')
    } else {
      mkdirSync(fontsDir, { recursive: true })
      writeFileSync(outputCssPath, '/* Offline dev: use system fonts until npm run fonts:download is run. */\n')
      console.log('Fonts: no local fonts; using system fonts. Run "npm run fonts:download" to download them.')
    }
    return
  }

  const cssText = await fetchCss()
  const faces = parseFontFaces(cssText)
  if (!faces.length) throw new Error('No @font-face rules found in Google Fonts response')

  const { total, downloaded } = await downloadFaces(faces)
  writeLocalCss(faces)

  console.log(
    `Fonts: ${faces.length} faces, ${total} woff2 files in ${relative(process.cwd(), fontsDir)}`
      + ` (downloaded ${downloaded} this run).`
  )
}

// node:fs 的 writeFileSync / path.relative / dirname 补充导入
import { writeFileSync } from 'node:fs'
import { dirname, relative } from 'node:path'

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
