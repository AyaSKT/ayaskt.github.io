import { registerComponentAssetImports } from './component-assets.mts'
import { registerCustomContainers } from './containers.mts'
import { registerDocMeta } from './doc-meta.mts'
import { registerMarkdownImageDimensions } from './image-dimensions.mts'
import { configureMathjax } from './mathjax.mts'
import { registerMindMapFence } from './mindmap.mts'

export {
  transformLyricCardAlbumCoverAttrs,
  transformSongCardCoverAttrs,
} from './component-assets.mts'
export { formatDocMeta, getReadableWordCount } from './doc-meta.mts'
export { renderMindMapFence } from './mindmap.mts'

export async function configureMarkdown(md: any) {
  await configureMathjax(md)
  registerCustomContainers(md)
  registerMarkdownImageDimensions(md)
  registerMindMapFence(md)
  registerDocMeta(md)
  registerComponentAssetImports(md)
}
