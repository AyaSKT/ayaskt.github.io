export interface NavItem {
  text: string
  link?: string
  activeMatch?: string
  items?: NavItem[]
}

export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

export interface DocsSpace {
  id: string
  base: string
  title: string
  sidebar: SidebarItem[]
}

export interface DocFrontmatter {
  title?: string
  layout?: 'home' | 'doc'
  aside?: boolean
  outline?: 'deep' | false | [number, number]
  pageClass?: string
  author?: string
  lastUpdated?: string | boolean | Date
  readingMode?: boolean
  search?: boolean
  pdf?: boolean
  hero?: Record<string, unknown>
  homeCourseGroups?: unknown[]
  [key: string]: unknown
}

export interface DocRoute {
  sourcePath: string
  docsPath: string
  routePath: string
  urlPath: string
  frontmatter: DocFrontmatter
}
