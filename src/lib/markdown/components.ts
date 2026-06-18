import { resolveMarkdownAssetHref } from '../routing/vitepressPaths'

const COMPONENT_ASSET_PROPS: Record<string, string[]> = {
  LyricCard: ['album-cover', 'albumCover'],
  LyricCover: ['image', 'src', 'cover'],
  SongCard: ['cover'],
}

export function transformMarkdownComponents(source: string, docsPath: string) {
  const lines = source.split(/\r?\n/)
  const output: string[] = []
  let pendingMarkdown: string[] = []

  function flushMarkdown() {
    if (!pendingMarkdown.length) return
    const withAssets = transformComponentAssetProps(pendingMarkdown.join('\n'), docsPath)
    output.push(protectComponentBlocks(withAssets))
    pendingMarkdown = []
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const fence = line.match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*(.*?)\s*$/)

    if (!fence) {
      pendingMarkdown.push(line)
      continue
    }

    const [, indent, marker, lang, rawTitle] = fence
    const fenceChar = marker[0]
    const fenceLength = marker.length
    const body: string[] = []
    let closeIndex = index + 1

    for (; closeIndex < lines.length; closeIndex += 1) {
      const closeLine = lines[closeIndex]
      const close = closeLine.match(/^(\s*)(`{3,}|~{3,})\s*$/)
      if (close && close[2][0] === fenceChar && close[2].length >= fenceLength) break
      body.push(closeLine)
    }

    if (lang === 'mindmap') {
      flushMarkdown()
      const title = rawTitle.trim()
      const titleAttr = title ? ` title="${escapeAttribute(title)}"` : ''
      output.push(`${indent}<div class="markdown-component-block"><MindMap source="${escapeMultilineAttribute(body.join('\n'))}"${titleAttr} /></div>`)
    } else {
      pendingMarkdown.push(line, ...body)
      if (closeIndex < lines.length) pendingMarkdown.push(lines[closeIndex])
    }

    index = closeIndex
  }

  flushMarkdown()
  return output.join('\n')
}

function protectComponentBlocks(source: string) {
  const lines = source.split('\n')
  const output: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const open = line.match(/^(\s*)<(CourseIndex|LyricCard|LyricCover|SongCard|MindMap)\b/i)

    if (!open) {
      output.push(line)
      continue
    }

    const [, indent, component] = open
    const block = [line]
    const closingTag = new RegExp(`</${component}>`, 'i')

    if (!/\/\s*>\s*$/.test(line) && !closingTag.test(line)) {
      for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
        const nextLine = lines[nextIndex]
        block.push(nextLine)
        index = nextIndex

        if (/\/\s*>\s*$/.test(nextLine) || closingTag.test(nextLine)) break
      }
    }

    output.push(`${indent}<div class="markdown-component-block">`)
    output.push(...block)
    output.push(`${indent}</div>`)
  }

  return output.join('\n')
}

function transformComponentAssetProps(source: string, docsPath: string) {
  return Object.entries(COMPONENT_ASSET_PROPS).reduce((nextSource, [component, props]) => {
    const tagPattern = new RegExp(`<${component}(\\s[\\s\\S]*?)(\\/?)>`, 'g')

    return nextSource.replace(tagPattern, (tag, attrs: string, selfClosing: string) => {
      const transformedAttrs = props.reduce((nextAttrs, prop) => {
        const attrPattern = new RegExp(`(\\s${escapeRegExp(prop)}=)(["'])([\\s\\S]*?)\\2`, 'g')
        return nextAttrs.replace(attrPattern, (attr, prefix: string, quote: string, value: string) => {
          const resolved = resolveComponentAsset(value, docsPath)
          return `${prefix}${quote}${escapeAttribute(resolved)}${quote}`
        })
      }, attrs)

      return `<${component}${transformedAttrs}${selfClosing}>`
    })
  }, source)
}

function resolveComponentAsset(value: string, docsPath: string) {
  const trimmed = value.trim()
  if (!trimmed || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(trimmed)) return value
  return resolveMarkdownAssetHref(trimmed, docsPath)
}

function escapeMultilineAttribute(value: string) {
  return escapeAttribute(value).replace(/\n/g, '&#10;')
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
