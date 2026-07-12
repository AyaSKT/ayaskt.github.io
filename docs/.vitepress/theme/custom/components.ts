/**
 * 自定义全局组件注册入口。
 *
 * 在这里登记的组件会由 index.ts 的 enhanceApp 自动注册为全局组件，
 * 可直接在任意 markdown 文件中以 `<组件名 />` 使用，无需改动主题源文件。
 *
 * 约定：
 * - key 为注册名（PascalCase），value 为组件本身。
 * - 首屏不需要的重组件请用 defineAsyncComponent 包一层（参考 index.ts 中的 MindMap）。
 *
 * 示例：
 *
 * import { defineAsyncComponent } from 'vue'
 * import MyBadge from './MyBadge.vue'
 *
 * export const customComponents: Record<string, Component> = {
 *   MyBadge,
 *   HeavyChart: defineAsyncComponent(() => import('./HeavyChart.vue')),
 * }
 */
import type { Component } from 'vue'

export const customComponents: Record<string, Component> = {}
