export function transformContainers(source: string) {
  const stack: string[] = []
  const lines = source.split(/\r?\n/)

  return lines.map((line) => {
    const open = line.match(/^(:{3,})\s+(example|stem|solution|definition)\b\s*(.*)$/)
    if (open) {
      const [, , name, rawTitle] = open
      stack.push(name)
      const title = escapeHtml(rawTitle.trim())

      if (name === 'example') {
        return `<div class="custom-block example"><p class="custom-block-title">${title || '例题'}</p>`
      }
      if (name === 'stem') {
        const label = title ? ` <span class="example-stem-label">${title}</span>` : ''
        return `<div class="example-stem"><p class="example-section-title">PROBLEM${label}</p>`
      }
      if (name === 'solution') {
        return '<div class="example-solution" data-collapsed><p class="example-section-title">SOLUTION <button class="solution-toggle" aria-label="展开/收起">[展开答案]</button></p><div class="solution-content">'
      }
      return `<div class="custom-block definition"><p class="custom-block-title">${title || 'DEFINITION'}</p>`
    }

    if (/^:{3,}\s*$/.test(line)) {
      const name = stack.pop()
      if (name === 'solution') return '</div></div>'
      if (name) return '</div>'
    }

    return line
  }).join('\n')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
