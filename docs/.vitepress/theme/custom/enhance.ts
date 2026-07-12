/**
 * 自定义 enhanceApp 钩子。
 *
 * 在主题 enhanceApp 的最后被调用，可以拿到 app / router / siteData，
 * 用于注册插件、全局指令、路由监听等，无需改动 index.ts。
 *
 * 示例：
 *
 * export function customEnhanceApp({ app, router }: EnhanceAppContext) {
 *   app.provide('my-key', 'my-value')
 *   router.onAfterRouteChange = (to) => console.log('route ->', to)
 * }
 */
import type { EnhanceAppContext } from 'vitepress'

export function customEnhanceApp(_ctx: EnhanceAppContext) {
  // 默认无操作
}
