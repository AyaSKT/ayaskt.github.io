/**
 * 本地编辑器可插入块注册表。
 * 新增组件时在此追加条目即可，无需改编辑器核心逻辑。
 *
 * @typedef {'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'lines'} FieldType
 * @typedef {{ key: string, label: string, type: FieldType, placeholder?: string, defaultValue?: string | boolean | number, options?: { label: string, value: string }[], rows?: number }} RegistryField
 * @typedef {{ id: string, label: string, category: string, description?: string, dialog?: boolean, fields?: RegistryField[], build: (values: Record<string, unknown>) => string }} RegistryEntry
 */

/** @type {RegistryEntry[]} */
export const localEditorRegistry = [
  {
    id: 'example',
    label: '例题',
    category: '容器',
    description: 'stem / solution 两层结构',
    dialog: true,
    fields: [
      { key: 'stem', label: '题干', type: 'textarea', rows: 4, placeholder: '题干内容' },
      { key: 'solution', label: '解答', type: 'textarea', rows: 6, placeholder: '解答内容' },
    ],
    build(values) {
      const stem = String(values.stem || '题干').trim()
      const solution = String(values.solution || '解答').trim()
      return `\n::: stem\n${stem}\n:::\n\n::: solution\n${solution}\n:::\n`
    },
  },
  {
    id: 'definition',
    label: '定义',
    category: '容器',
    dialog: true,
    fields: [
      { key: 'title', label: '概念名', type: 'text', defaultValue: '概念', placeholder: '概念' },
      { key: 'body', label: '定义内容', type: 'textarea', rows: 5, placeholder: '定义正文' },
    ],
    build(values) {
      const title = String(values.title || '概念').trim()
      const body = String(values.body || '定义内容').trim()
      return `\n::: definition ${title}\n\n${body}\n\n:::\n`
    },
  },
  {
    id: 'lyric-card',
    label: '歌词',
    category: '歌词',
    dialog: true,
    fields: [
      { key: 'title', label: '曲名', type: 'text', placeholder: '曲名' },
      { key: 'artist', label: '作者/歌手', type: 'text', placeholder: '作者或组合' },
      {
        key: 'lang',
        label: '语言',
        type: 'select',
        defaultValue: 'zh',
        options: [
          { label: '中文', value: 'zh' },
          { label: '日语', value: 'ja' },
          { label: '英语', value: 'en' },
        ],
      },
      { key: 'qqUrl', label: 'QQ 音乐链接', type: 'text', placeholder: 'https://y.qq.com/...' },
      { key: 'neteaseUrl', label: '网易云链接', type: 'text', placeholder: 'https://music.163.com/...' },
      { key: 'lines', label: '歌词行（每行：原文|译文）', type: 'lines', rows: 4, placeholder: '原文|译文' },
    ],
    build(values) {
      const attrs = [
        `title="${String(values.title || '标题').replace(/"/g, '&quot;')}"`,
        values.artist ? `artist="${String(values.artist).replace(/"/g, '&quot;')}"` : '',
        values.lang ? `lang="${values.lang}"` : '',
        values.qqUrl ? `qq-url="${String(values.qqUrl).replace(/"/g, '&quot;')}"` : '',
        values.neteaseUrl ? `netease-url="${String(values.neteaseUrl).replace(/"/g, '&quot;')}"` : '',
      ].filter(Boolean).join(' ')

      const rawLines = Array.isArray(values.lines) ? values.lines : []
      const lineBlocks = rawLines
        .map((line) => {
          const text = String(line).trim()
          if (!text) return ''
          const [original = '', translation = ''] = text.split('|')
          const o = original.trim().replace(/"/g, '&quot;')
          const t = translation.trim().replace(/"/g, '&quot;')
          return t
            ? `  <LyricLine original="${o}" translation="${t}" />`
            : `  <LyricLine original="${o}" />`
        })
        .filter(Boolean)
        .join('\n')

      return `\n<LyricCard ${attrs}>\n${lineBlocks || '  <LyricLine original="原文" translation="译文" />'}\n</LyricCard>\n`
    },
  },
  {
    id: 'lyric-cover',
    label: '封面歌词',
    category: '歌词',
    dialog: true,
    fields: [
      { key: 'image', label: '封面图路径', type: 'text', placeholder: './cover.jpg' },
      { key: 'title', label: '曲名', type: 'text', placeholder: '曲名' },
      { key: 'artist', label: '作者/歌手', type: 'text' },
      {
        key: 'lang',
        label: '语言',
        type: 'select',
        defaultValue: 'en',
        options: [
          { label: '中文', value: 'zh' },
          { label: '日语', value: 'ja' },
          { label: '英语', value: 'en' },
        ],
      },
      { key: 'neteaseUrl', label: '网易云链接', type: 'text' },
      { key: 'lines', label: '歌词行（每行：原文|译文）', type: 'lines', rows: 3 },
    ],
    build(values) {
      const attrs = [
        values.image ? `image="${String(values.image).replace(/"/g, '&quot;')}"` : '',
        `title="${String(values.title || '标题').replace(/"/g, '&quot;')}"`,
        values.artist ? `artist="${String(values.artist).replace(/"/g, '&quot;')}"` : '',
        values.lang ? `lang="${values.lang}"` : '',
        values.neteaseUrl ? `netease-url="${String(values.neteaseUrl).replace(/"/g, '&quot;')}"` : '',
      ].filter(Boolean).join(' ')

      const rawLines = Array.isArray(values.lines) ? values.lines : []
      const lineBlocks = rawLines
        .map((line) => {
          const text = String(line).trim()
          if (!text) return ''
          const [original = '', translation = ''] = text.split('|')
          return `  <LyricLine original="${original.trim().replace(/"/g, '&quot;')}" translation="${translation.trim().replace(/"/g, '&quot;')}" />`
        })
        .filter(Boolean)
        .join('\n')

      return `\n<LyricCover ${attrs}>\n${lineBlocks || '  <LyricLine original="原文" translation="译文" />'}\n</LyricCover>\n`
    },
  },
  {
    id: 'song-card',
    label: '歌曲卡片',
    category: '歌词',
    dialog: true,
    fields: [
      { key: 'songId', label: '网易云歌曲 ID', type: 'text', placeholder: '545728377' },
    ],
    build(values) {
      const songId = String(values.songId || '').trim()
      return songId ? `\n<SongCard song-id="${songId.replace(/"/g, '&quot;')}" />\n` : '\n<SongCard song-id="" />\n'
    },
  },
  {
    id: 'mindmap',
    label: '思维导图',
    category: '图表',
    dialog: true,
    fields: [
      { key: 'title', label: '标题', type: 'text', defaultValue: '导图' },
      { key: 'root', label: '主题', type: 'text', defaultValue: '主题' },
      { key: 'branch', label: '分支', type: 'text', defaultValue: '分支' },
      { key: 'point', label: '要点', type: 'text', defaultValue: '要点' },
    ],
    build(values) {
      const title = String(values.title || '导图').trim()
      const root = String(values.root || '主题').trim()
      const branch = String(values.branch || '分支').trim()
      const point = String(values.point || '要点').trim()
      return `\n\`\`\`mindmap ${title}\n# ${root}\n## ${branch}\n- ${point}\n\`\`\`\n`
    },
  },
  {
    id: 'math-block',
    label: '公式块',
    category: '公式',
    dialog: false,
    build() {
      return '\n$$\n\n$$\n'
    },
  },
  {
    id: 'math-inline',
    label: '行内公式',
    category: '公式',
    dialog: false,
    build() {
      return '$ $'
    },
  },
  {
    id: 'toc',
    label: '目录占位',
    category: '结构',
    dialog: false,
    build() {
      return '\n## 章节目录\n\n'
    },
  },
]

/** @param {string} id */
export function getRegistryEntry(id) {
  return localEditorRegistry.find((entry) => entry.id === id)
}

/** @param {string} id @param {Record<string, unknown>} values */
export function buildRegistrySnippet(id, values = {}) {
  const entry = getRegistryEntry(id)
  if (!entry) return ''
  return entry.build(values)
}

export const localEditorFrontmatterFields = [
  { key: 'title', label: '标题', type: 'text', placeholder: '页面标题（可选）' },
  { key: 'description', label: '描述', type: 'textarea', rows: 2 },
  { key: 'author', label: '作者', type: 'text' },
  { key: 'lastUpdated', label: '更新日期', type: 'text', placeholder: 'ISO 8601，留空则保存时自动写入' },
  { key: 'comments', label: '显示评论', type: 'checkbox' },
  { key: 'backToTop', label: '返回顶部', type: 'checkbox' },
  { key: 'docMeta', label: '文档元信息', type: 'checkbox' },
  { key: 'pdf', label: 'PDF 下载', type: 'checkbox' },
  { key: 'aside', label: '右侧大纲', type: 'select', options: [
    { label: '默认', value: '' },
    { label: '开启', value: 'true' },
    { label: '关闭', value: 'false' },
  ] },
  { key: 'pageClass', label: '页面类名', type: 'text', placeholder: 'course-index-page' },
]
