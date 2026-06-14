const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

function slugify(str: string) {
  return str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripFrontmatter(src: string) {
  if (!src.startsWith('---')) return { body: src, frontmatter: '' }

  const end = src.indexOf('\n---', 3)
  if (end === -1) return { body: src, frontmatter: '' }

  const frontmatterEnd = src.indexOf('\n', end + 4)
  return {
    frontmatter: src.slice(3, end),
    body: frontmatterEnd === -1 ? '' : src.slice(frontmatterEnd + 1),
  }
}

function stripMarkdownForSearch(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1 ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, '$1')
    .replace(/[*_~|>$#:[\]{}()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function renderSearchHtml(src: string) {
  const { body, frontmatter } = stripFrontmatter(src)
  if (/^\s*search:\s*false\s*$/m.test(frontmatter)) return ''

  const slugCounts = new Map<string, number>()
  const sections: { level: number; title: string; anchor: string; text: string[] }[] = []
  let current: (typeof sections)[number] | undefined
  let inFence = false

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (/^```|^~~~/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence || !line || /^:::\s*$|^:::\s+\w+/.test(line)) continue

    const heading = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/.exec(line)
    if (heading) {
      const title = stripMarkdownForSearch(heading[2])
      const base = slugify(title)
      const count = slugCounts.get(base) ?? 0
      slugCounts.set(base, count + 1)
      current = {
        level: heading[1].length,
        title,
        anchor: count === 0 ? base : `${base}-${count}`,
        text: [],
      }
      sections.push(current)
      continue
    }

    if (!current) continue
    const text = stripMarkdownForSearch(line)
    if (text) current.text.push(text)
  }

  return sections
    .filter((section) => section.title && section.text.length)
    .map((section) => {
      const level = Math.min(Math.max(section.level, 1), 6)
      return `<h${level}>${escapeHtml(section.title)}<a href="#${section.anchor}" class="header-anchor"></a></h${level}>\n<p>${escapeHtml(section.text.join(' '))}</p>`
    })
    .join('\n')
}

