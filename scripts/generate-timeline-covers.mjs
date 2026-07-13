import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import {
  resolveFirstLyricCoverImage,
  resolveFirstNoteImage,
} from './course-index-utils.mjs'
import { resolveLastUpdatedTimestamp } from '../docs/.vitepress/theme/doc-meta-date.mjs'

const scriptPath = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(scriptPath)
const rootDir = path.resolve(scriptDir, '..')
const docsRoot = path.join(rootDir, 'docs')
const previewsPath = path.join(rootDir, 'docs/.vitepress/theme/generated/course-previews.json')
const entriesPath = path.join(rootDir, 'docs/.vitepress/theme/generated/timeline-entries.json')
const outputDir = path.join(rootDir, 'docs/public/timeline-covers')
const genericCoverPath = path.join(scriptDir, 'timeline-covers/source/timeline-cover.jpg')

const width = 640
const height = 360
const blurStart = 0.44
const blurEnd = 0.9
const alphaStart = 0.58
const blurRadius = 7
const earliestTimestamp = Date.parse('2026-01-01T00:00:00+08:00')
const excludedSegments = new Set(['ADC', 'MS'])
const noVisualCourses = new Set(['AIML', 'CAD', 'CPS_N', 'EP'])
const timestampOverrides = new Map([
  ['Y3S2/EMFT/EMFT Chapter 2.md', Date.parse('2026-03-31T12:00:00+08:00')],
])
const accentOrder = ['cyan', 'blue', 'purple', 'green', 'frost', 'indigo', 'rose', 'amber', 'teal']
const courseLabels = {
  ADC: '高阶数字通信 ADC',
  AIML: '人工智能与机器学习 AIML',
  CAD: '电路分析与设计 CAD',
  CCD: '通信电路设计 CCD',
  CPS: '通信原理与系统 CPS',
  CPS_N: '通信原理与系统 CPS_N',
  DSP: '数字信号处理 DSP',
  EMFT: '电磁场与波 EMFT',
  EPMF: '工程项目管理与财务 EPM&F',
  EP: '嵌入式处理器 EP',
  IS: '信息安全 IS',
  IT: '信息论基础 IT',
  MC: '移动通信 MC',
}

function walkMarkdown(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vitepress' || entry.name === 'superpowers') continue
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) walkMarkdown(fullPath, files)
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath)
  }
  return files
}

function isTimelineNote(notePath) {
  if (!/^Y\d+S\d+\//.test(notePath) && !/^early\/(?:CAD|EP)\//.test(notePath)) return false
  if (/(?:^|\/)(?:README|[^/]*-README|index)\.md$/i.test(notePath)) return false
  if (/(?:^|\/)(?:Assets?|Assests?|Attachments?|[^/]+\.attachments?)(?:\/|$)/i.test(notePath)) return false

  return !notePath
    .split('/')
    .some((segment) => excludedSegments.has(segment) || /^MS(?:_|$)/.test(segment))
}

function frontmatter(markdown) {
  return markdown.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? ''
}

function frontmatterValue(markdown, name) {
  const match = frontmatter(markdown).match(new RegExp(`^${name}:\\s*(.*?)\\s*$`, 'm'))
  if (!match) return undefined

  const value = match[1].trim()
  if (value === 'false') return false
  if (value === 'true') return true
  return value.replace(/^(['"])([\s\S]*)\1$/, '$2')
}

function gitTimestamp(filePath) {
  try {
    const value = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', path.relative(rootDir, filePath)],
      { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim()
    return value ? Date.parse(value) : undefined
  } catch {
    return undefined
  }
}

function resolveNoteTimestamp(filePath, markdown) {
  const lockedValue = frontmatterValue(markdown, 'lastUpdated')
  const fallbackTimestamp = gitTimestamp(filePath) ?? fs.statSync(filePath).mtimeMs
  const timestamp = resolveLastUpdatedTimestamp(lockedValue, fallbackTimestamp)
  return { locked: lockedValue !== undefined && lockedValue !== false, timestamp }
}

function cleanTitle(value) {
  return value
    .replace(/<br\s*\/?>/gi, ' · ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function noteTitle(markdown, notePath) {
  const configuredTitle = frontmatterValue(markdown, 'title')
  if (typeof configuredTitle === 'string' && configuredTitle) return cleanTitle(configuredTitle)

  const heading = markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '').match(/^#\s+(.+)$/m)?.[1]
  return cleanTitle(heading || path.basename(notePath, '.md'))
}

function courseKey(notePath) {
  return notePath.split('/')[1] ?? 'NOTE'
}

function courseLabel(notePath) {
  const key = courseKey(notePath)
  return courseLabels[key] ?? key
}

function monthPeriod(timestamp) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date(timestamp))
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  return `${year}.${month}`
}

function noteHref(notePath) {
  const htmlPath = notePath.replace(/\.md$/i, '.html')
  return `/${htmlPath.split('/').map(encodeURIComponent).join('/')}`
}

function stableId(value) {
  const readable = value
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(-48)
  const hash = createHash('sha1').update(value).digest('hex').slice(0, 8)
  return `${readable || 'note'}-${hash}`
}

function noteCover(notePath) {
  const lyricCover = resolveFirstLyricCoverImage(docsRoot, notePath)
  if (lyricCover && fs.existsSync(path.join(docsRoot, lyricCover))) return lyricCover

  const firstImage = resolveFirstNoteImage(docsRoot, notePath)
  if (firstImage && fs.existsSync(path.join(docsRoot, firstImage))) return firstImage

  return ''
}

function fallbackExcerpt(markdown, title) {
  const content = markdown
    .replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_`$>|#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return content ? content.slice(0, 180) : `${title}的课程笔记。`
}

function htmlAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))
  return match?.[1]?.replace(/\s+/g, ' ').trim() ?? ''
}

function lyricLineDescription(markdown) {
  const component = markdown.match(/<(LyricCover|LyricCard)\b([^>]*)>([\s\S]*?)<\/\1>/i)
  if (component) {
    const lang = htmlAttribute(component[2], 'lang').toLowerCase()
    const useTranslation = Boolean(lang && !lang.startsWith('zh'))
    const lines = [...component[3].matchAll(/<LyricLine\b([^>]*)\/?\s*>/gi)]
    const selected = lines
      .map((line) => htmlAttribute(line[1], useTranslation ? 'translation' : 'original'))
      .filter(Boolean)
      .slice(0, 2)
    if (selected.length) return selected.join(' / ')
  }

  return ''
}

function epigraphDescription(markdown) {
  const withoutFrontmatter = markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
  const candidates = [...withoutFrontmatter.matchAll(/^\s*(?:\*\*([^*\n]+)\*\*|>\s*([^\n]+))/gm)]
  for (const candidate of candidates) {
    const value = (candidate[1] || candidate[2] || '').replace(/\s+/g, ' ').trim()
    if (value && !/^\[![A-Z]+\]/i.test(value)) return value
  }
  return ''
}

function noteDescription(markdown, title, preview) {
  return lyricLineDescription(markdown)
    || epigraphDescription(markdown)
    || preview
    || fallbackExcerpt(markdown, title)
}

function seriesInfo(note) {
  const candidates = [note.title, path.basename(note.notePath, '.md')]
  for (const candidate of candidates) {
    const match = candidate.match(/\b(Lecture|Lec\.?|Chapter|Review|Block)[\s._-]*(\d+)(?:\s*[-–]\s*(\d+))?/i)
    if (!match) continue
    const rawType = match[1].replace(/\.$/, '')
    return {
      type: /^Lec(?:ture)?$/i.test(rawType) ? 'Lecture' : rawType[0].toUpperCase() + rawType.slice(1).toLowerCase(),
      start: Number(match[2]),
      end: Number(match[3] || match[2]),
    }
  }
  return undefined
}

function compareGroupedNotes(left, right) {
  const leftSeries = seriesInfo(left)
  const rightSeries = seriesInfo(right)
  if (leftSeries && rightSeries && leftSeries.type === rightSeries.type) {
    return leftSeries.start - rightSeries.start || leftSeries.end - rightSeries.end
  }
  if (leftSeries && !rightSeries) return -1
  if (!leftSeries && rightSeries) return 1
  return left.timestamp - right.timestamp || left.title.localeCompare(right.title)
}

function groupTitle(notes, course, period) {
  if (notes.length === 1) {
    const series = seriesInfo(notes[0])
    return series ? `${series.type} ${series.start}${series.end !== series.start ? ` - ${series.end}` : ''}` : notes[0].title
  }

  const seriesGroups = new Map()
  for (const note of notes) {
    const series = seriesInfo(note)
    if (!series) continue
    const values = seriesGroups.get(series.type) ?? []
    values.push(series)
    seriesGroups.set(series.type, values)
  }

  const [type, values] = [...seriesGroups.entries()].sort((left, right) => right[1].length - left[1].length)[0] ?? []
  if (type && values?.length >= 2) {
    const start = Math.min(...values.map((value) => value.start))
    const end = Math.max(...values.map((value) => value.end))
    return `${type} ${start} - ${end}`
  }

  return `${course} · ${period.replace('.', ' / ')}`
}

function groupTimelineNotes(notes) {
  const grouped = new Map()

  for (const note of notes) {
    const period = monthPeriod(note.timestamp)
    const key = `${courseKey(note.notePath)}::${period}`
    const group = grouped.get(key) ?? {
      key,
      period,
      course: courseLabel(note.notePath),
      courseKey: courseKey(note.notePath),
      notes: [],
      timestamp: 0,
    }
    group.notes.push(note)
    group.timestamp = Math.max(group.timestamp, note.timestamp)
    grouped.set(key, group)
  }

  const groups = [...grouped.values()]
    .map((group) => {
      group.notes.sort(compareGroupedNotes)
      group.title = groupTitle(group.notes, group.course, group.period)
      group.coverDocsPath = group.notes[0].coverDocsPath
      group.description = group.notes[0].description
      return group
    })
    .sort((left, right) => right.period.localeCompare(left.period) || left.course.localeCompare(right.course))

  const epmfLecture5 = notes.find((note) => note.notePath === 'Y3S2/EPMF/Block 2/Lecture 5.md')
  const epmfMay = groups.find((group) => group.courseKey === 'EPMF' && group.period === '2026.05')
  if (epmfLecture5 && epmfMay) {
    epmfMay.coverDocsPath = epmfLecture5.coverDocsPath
    epmfMay.description = epmfLecture5.description
  }

  return groups
}

function smoothstep(start, end, value) {
  const progress = Math.min(1, Math.max(0, (value - start) / (end - start)))
  return progress * progress * (3 - 2 * progress)
}

async function generateCover(sourcePath, outputPath) {
  const base = await sharp(sourcePath)
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .raw()
    .toBuffer()
  const blurred = await sharp(base, { raw: { width, height, channels: 4 } })
    .blur(blurRadius)
    .raw()
    .toBuffer()

  const output = Buffer.alloc(base.length)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = (y * width + x) * 4
      const position = x / (width - 1)
      const blurMix = smoothstep(blurStart, blurEnd, position)
      const alphaFade = smoothstep(alphaStart, 1, position)

      for (let channel = 0; channel < 3; channel += 1) {
        output[pixel + channel] = Math.round(
          base[pixel + channel] * (1 - blurMix) + blurred[pixel + channel] * blurMix,
        )
      }
      output[pixel + 3] = Math.round(base[pixel + 3] * (1 - alphaFade))
    }
  }

  await sharp(output, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath)
}

async function generateTransparentCover(outputPath) {
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath)
}

async function main() {
  const previews = fs.existsSync(previewsPath) ? JSON.parse(fs.readFileSync(previewsPath, 'utf8')) : {}
  const notes = []
  const missingOwnCovers = []

  for (const filePath of walkMarkdown(docsRoot)) {
    const notePath = path.relative(docsRoot, filePath).replace(/\\/g, '/')
    if (!isTimelineNote(notePath)) continue

    const markdown = fs.readFileSync(filePath, 'utf8')
    const resolvedDate = resolveNoteTimestamp(filePath, markdown)
    const fixedTimestamp = timestampOverrides.get(notePath)
    const aimlJanuaryTimestamp = courseKey(notePath) === 'AIML'
      && monthPeriod(resolvedDate.timestamp) === '2026.03'
      ? Date.parse('2026-01-31T12:00:00+08:00')
      : undefined
    const timestamp = fixedTimestamp ?? aimlJanuaryTimestamp ?? resolvedDate.timestamp
    const locked = fixedTimestamp !== undefined || aimlJanuaryTimestamp !== undefined || resolvedDate.locked
    const noVisualMetadata = noVisualCourses.has(courseKey(notePath))
    if (!timestamp || (timestamp < earliestTimestamp && !noVisualMetadata)) continue
    if (courseKey(notePath) === 'CPS' && monthPeriod(timestamp) === '2026.03') continue

    const title = noteTitle(markdown, notePath)
    const ownCover = noVisualMetadata ? '' : noteCover(notePath)
    if (!noVisualMetadata && !ownCover) missingOwnCovers.push(notePath)

    notes.push({
      notePath,
      title,
      timestamp,
      locked,
      noVisualMetadata,
      coverDocsPath: ownCover,
      description: noVisualMetadata ? '' : noteDescription(markdown, title, previews[notePath]),
    })
  }

  notes.sort((left, right) => right.timestamp - left.timestamp || left.notePath.localeCompare(right.notePath))
  const groups = groupTimelineNotes(notes)
  fs.mkdirSync(outputDir, { recursive: true })

  const scriptMtime = fs.statSync(scriptPath).mtimeMs
  const generatedCovers = new Map()
  const expectedOutputs = new Set()

  for (const group of groups) {
    if (group.notes[0].noVisualMetadata) {
      const outputName = 'transparent-faded.png'
      const outputPath = path.join(outputDir, outputName)
      if (!fs.existsSync(outputPath) || fs.statSync(outputPath).mtimeMs < scriptMtime) {
        await generateTransparentCover(outputPath)
        console.log(`Generated ${path.relative(rootDir, outputPath)}`)
      }
      expectedOutputs.add(outputName)
      group.image = `/timeline-covers/${outputName}`
      continue
    }

    const sourcePath = group.coverDocsPath ? path.join(docsRoot, group.coverDocsPath) : genericCoverPath
    const sourceKey = group.coverDocsPath || 'generic/timeline-cover.jpg'
    let outputName = generatedCovers.get(sourceKey)

    if (!outputName) {
      const sourceStem = path.basename(sourcePath, path.extname(sourcePath))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 42) || 'cover'
      const hash = createHash('sha1').update(sourceKey).digest('hex').slice(0, 10)
      outputName = `${sourceStem}-${hash}-faded.png`
      const outputPath = path.join(outputDir, outputName)
      const outputMtime = fs.existsSync(outputPath) ? fs.statSync(outputPath).mtimeMs : 0
      const sourceMtime = fs.statSync(sourcePath).mtimeMs

      if (outputMtime < Math.max(sourceMtime, scriptMtime)) {
        await generateCover(sourcePath, outputPath)
        console.log(`Generated ${path.relative(rootDir, outputPath)}`)
      }
      generatedCovers.set(sourceKey, outputName)
    }

    expectedOutputs.add(outputName)
    group.image = `/timeline-covers/${outputName}`
  }

  for (const fileName of fs.readdirSync(outputDir)) {
    if (fileName.endsWith('-faded.png') && !expectedOutputs.has(fileName)) {
      fs.unlinkSync(path.join(outputDir, fileName))
    }
  }

  const periodAccents = new Map()
  const entries = groups.map((group, index) => {
    const [year, month] = group.period.split('.')
    if (!periodAccents.has(group.period)) {
      periodAccents.set(group.period, accentOrder[periodAccents.size % accentOrder.length])
    }
    return {
      id: stableId(group.key),
      period: group.period,
      course: group.course,
      title: group.title,
      description: group.description,
      image: group.image,
      hasCover: !group.notes[0].noVisualMetadata,
      imageAlt: group.notes[0].noVisualMetadata ? '' : `${group.course} ${year}年${month}月笔记封面`,
      imagePosition: 'center',
      accent: accentOrder[index % accentOrder.length],
      dateAccent: periodAccents.get(group.period),
      noteMeta: `${group.course} · ${year}年${month}月 · ${group.notes.length} 篇笔记`,
      updatedAt: new Date(group.timestamp).toISOString(),
      notes: group.notes.map((note) => ({
        title: note.title,
        href: noteHref(note.notePath),
        updatedAt: new Date(note.timestamp).toISOString(),
        locked: note.locked,
      })),
    }
  })

  fs.writeFileSync(entriesPath, `${JSON.stringify(entries, null, 2)}\n`)
  console.log(`Generated ${entries.length} timeline groups from ${notes.length} notes and ${generatedCovers.size} covers.`)
  console.log('Excluded courses: ADC, MS.')
  if (missingOwnCovers.length) {
    console.warn(`${missingOwnCovers.length} notes use the generic fallback cover:`)
    for (const notePath of missingOwnCovers) console.warn(`- ${notePath}`)
  }
}

await main()
