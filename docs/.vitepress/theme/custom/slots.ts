/**
 * 自定义布局插槽入口。
 *
 * 在这里把组件挂到 VitePress 默认主题的任意布局插槽，无需改动 MyLayout.vue。
 * key 为插槽名，value 为组件数组（按顺序渲染）。
 *
 * 主题已占用的插槽（自定义组件会追加渲染在主题组件之后）：
 *   layout-top / nav-bar-content-after / doc-after / home-hero-info-after / home-hero-image
 *
 * 其余插槽（layout-bottom、doc-before、aside-outline-after、sidebar-nav-before、
 * home-features-after、not-found 等）会按插槽名直接透传给 DefaultTheme.Layout，
 * 完整插槽清单见 CUSTOMIZATION.md。
 *
 * 示例：
 *
 * import Announcement from './Announcement.vue'
 *
 * export const customSlots: Record<string, Component[]> = {
 *   'layout-bottom': [Announcement],
 * }
 */
import type { Component } from 'vue'

export const customSlots: Record<string, Component[]> = {}
