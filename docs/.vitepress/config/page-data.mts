export function transformPageData(pageData: any) {
  if (pageData.filePath.startsWith('Y3S2/EPMF/') && !pageData.filePath.endsWith('-README.md')) {
    pageData.frontmatter.outline = [2, 3]
  }
}
