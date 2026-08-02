# CUSTOMIZATION.md — 主题自定义接口规范

本文档是这个 VitePress 站点的自定义接口总览。所有「不改主题源文件就能完成的定制」都应通过这里列出的接口进行；只有接口不够用时才去改主题源码（改完请回来更新本文档）。

## 接口一览

| 想做什么 | 用哪个接口 | 位置 |
|---|---|---|
| 改颜色、毛玻璃、阴影、圆角 | 设计令牌覆盖 | `theme/custom/tokens.css` |
| 改动画时长、缓动、涟漪大小 | 动效令牌覆盖 | `theme/custom/tokens.css` |
| 新增能在 markdown 里用的组件 | 全局组件注册 | `theme/custom/components.ts` |
| 往页面任意位置插组件（页脚、侧栏上方…） | 布局插槽 | `theme/custom/slots.ts` |
| 注册 Vue 插件 / 路由钩子 / 全局指令 | enhanceApp 钩子 | `theme/custom/enhance.ts` |
| 按页关闭评论 / 返回顶部 / 元信息栏 | frontmatter 开关 | 各 `.md` 文件头部 |
| 修改时间线标题、卡片文字、封面和配色 | `timeline` frontmatter | `docs/timeline.md`（详见 `TIMELINE.md`） |
| 新增 animate.css / AnimXYZ 动画 | 子集允许清单 | `scripts/generate-motion-css-subsets.mjs` |
| 在页面过渡前后做事 | `vt-*` 类名与自定义事件 | CSS / JS 监听 |

下文按类别展开。所有路径省略前缀 `docs/.vitepress/`。

---

## 1. 自定义入口 `theme/custom/`

这个目录是**用户自定义层**，四个文件都已接线完毕，默认全部为空实现，可放心编辑；主题升级时只需保证这四个文件的导出签名不变。

### 1.1 `tokens.css` — 令牌覆盖

在 `index.ts` 中**最后导入**，因此这里写的变量优先级最高。支持覆盖：

- `--aya-*`：主题自有令牌（颜色、表面、阴影、毛玻璃）
- `--dur-*` / `--ease-*`：动效令牌
- `--vp-*`：VitePress 官方变量

```css
:root {
  --aya-gradient-start: #98CBEA;   /* 品牌渐变起点 */
  --dur-page: 0.6s;                /* 页面过渡加速 */
}

.dark {
  --aya-sidebar-bg: rgb(10 14 20 / 70%);
}
```

### 1.2 `components.ts` — 全局组件注册

登记后的组件自动注册为全局组件，可直接在任何 markdown 中使用：

```ts
import { defineAsyncComponent } from 'vue'
import MyBadge from './MyBadge.vue'

export const customComponents: Record<string, Component> = {
  MyBadge,                                                        // 轻组件：同步
  HeavyChart: defineAsyncComponent(() => import('./HeavyChart.vue')), // 重组件：异步
}
```

约定：注册名用 PascalCase；首屏用不到的重依赖组件（图表、编辑器等）必须 `defineAsyncComponent` 异步化（参考 `index.ts` 中 MindMap 的做法）。自定义组件的 `.vue` 文件建议直接放在 `theme/custom/` 下。

### 1.3 `slots.ts` — 布局插槽

把组件挂到 VitePress 默认主题的任意插槽，key 为插槽名，value 为组件数组：

```ts
import Announcement from './Announcement.vue'

export const customSlots: Record<string, Component[]> = {
  'layout-bottom': [Announcement],
}
```

两类插槽的行为不同：

- **主题已占用的插槽**（`layout-top`、`nav-bar-content-after`、`doc-after`、`home-hero-info-after`、`home-hero-image`）：自定义组件**追加渲染在主题组件之后**。
- **其余插槽**：按插槽名直接透传给 `DefaultTheme.Layout`。

常用插槽速查（完整列表见 [VitePress 文档](https://vitepress.dev/guide/extending-default-theme#layout-slots)）：

| 插槽 | 位置 |
|---|---|
| `layout-top` / `layout-bottom` | 整个布局最顶 / 最底 |
| `doc-before` / `doc-after` | 正文前 / 后 |
| `doc-top` / `doc-bottom` | 文档区最顶 / 最底 |
| `doc-footer-before` | 文档页脚前 |
| `aside-top` / `aside-bottom` / `aside-outline-before` / `aside-outline-after` | 右侧大纲区 |
| `sidebar-nav-before` / `sidebar-nav-after` | 左侧栏内容前 / 后 |
| `nav-bar-title-before` / `nav-bar-title-after` / `nav-bar-content-before` / `nav-bar-content-after` | 导航栏 |
| `home-hero-before` / `home-hero-info-before` / `home-hero-info-after` / `home-hero-actions-after` / `home-hero-after` / `home-features-before` / `home-features-after` | 首页 |
| `not-found` | 404 页 |

### 1.4 `enhance.ts` — enhanceApp 钩子

在主题 `enhanceApp` 的最后调用，签名为 `(ctx: EnhanceAppContext) => void`：

```ts
export function customEnhanceApp({ app, router }: EnhanceAppContext) {
  app.use(somePlugin)
  router.onAfterRouteChange = (to) => { /* ... */ }
}
```

---

## 2. 动画接口

### 2.1 动效令牌（CSS 变量）

全部声明在 `theme/style/var.css`，移动端覆盖在 `theme/style/transitions.css` 的 `@media (max-width: 768px)` 块。**改这些值即可全局调速，无需碰任何组件。**

缓动曲线：

| 令牌 | 用途 |
|---|---|
| `--ease-ios-spring` | 按钮回弹 |
| `--ease-ios-slide` | 位移滑动（侧栏指示器等） |
| `--ease-ios-fade` | 淡入 |
| `--ease-ios-press` | 按压 / 淡出 |

时长（纯 CSS 动画使用）：

| 令牌 | 默认 | 用途 |
|---|---|---|
| `--dur-page` / `--dur-page-exit` | 0.76s / 0.48s | 页面过渡进 / 出 |
| `--dur-doc-enter` | 0.94s | 正文横向进场 |
| `--dur-sidebar-enter` / `--dur-sidebar-exit` | 0.72s / 0.46s | 侧栏进 / 出场 |
| `--dur-appearance-enter` / `--dur-appearance-exit` / `--dur-appearance-gap` | 0.68s / 0.42s / 0.14s | 日夜切换 |
| `--dur-panel` / `--dur-overlay` | 0.62s / 0.34s | 面板 / 遮罩 |
| `--dur-menu` / `--dur-menu-out` / `--dur-menu-close-delay` | 0.32s / 0.22s / 0.1s | 导航下拉菜单 |
| `--dur-list-item` | 0.52s | 列表项 stagger |
| `--dur-tap` | 0.12s | 按钮按压 |
| `--dur-ripple` / `--ripple-size` | 0.8s / 200px | 点击涟漪 |

JS 动画令牌（由 `theme/motion-tokens.ts` 在运行时读取，同样可在 `tokens.css` 覆盖）：

| 令牌 | 默认 | 用途 | 消费方 |
|---|---|---|---|
| `--dur-solution` / `--ease-solution` | 0.56s / cubic-bezier(0.16, 1, 0.3, 1) | 例题答案展开折叠 | `solution-collapse.ts` |
| `--dur-sidebar-collapse` | 0.26s | 侧栏分组展开折叠 | `sidebar-motion.ts` |
| `--dur-sidebar-indicator` | 0.38s | 侧栏活跃指示器滑动 | `sidebar-window.css` |
| `--dur-outline-out` / `--dur-outline-in` | 0.14s / 0.26s | 大纲跳转正文淡出 / 淡入 | `outline-jump-motion.ts` |
| `--dur-timeline-enter` / `--dur-timeline-exit` | 0.52s / 0.3s | 时间线卡片展开、滚动入场与离场收起 | `TimelinePage.vue` |
| `--dur-timeline-stagger` | 0.055s | 时间线节点逐级进出场的间隔 | `TimelinePage.vue` |
| `--dur-timeline-exit-timeout` | 0.9s | 路由等待时间线离场完成的安全上限 | `PageTransition.vue` |

**约定**：以后在 JS 中写动画时长 / 缓动，一律先在 `var.css` 声明令牌，再用 `readMotionDuration(token, fallbackMs)` / `readMotionEasing(token, fallback)` 读取，兜底值与令牌默认值保持一致。不要在 JS 里留裸数字。

### 2.2 View Transition 类名钩子

`PageTransition.vue` 在过渡期间会往 `<html>` 上挂类名，可在 CSS 中用它们定制任意元素在过渡中的行为：

| 类名 | 含义 |
|---|---|
| `vt-keep-sidebar` | 同一侧栏间跳转（侧栏保持静止） |
| `vt-switch-sidebar` | 跨侧栏跳转（旧栏左出、新栏左入） |
| `vt-hide-sidebar` | 有侧栏 → 无侧栏 |
| `vt-show-sidebar` | 无侧栏 → 有侧栏（真实侧栏跳过自身入场动画） |
| `vt-home-to-doc` / `vt-doc-to-home` / `vt-doc-to-doc` / `vt-home-to-home` | 路由方向 |
| `vt-doc-content-transition` / `vt-from-doc-content` / `vt-to-doc-content` / `vt-doc-to-contentless` | 正文快照参与情况 |
| `vt-appearance` | 日夜切换圆形揭示进行中 |
| `sidebar-motion-active` | 侧栏分组展开/折叠动画进行中 |

示例——让某元素在页面过渡中保持静止：

```css
html.vt-doc-to-doc .my-widget {
  view-transition-name: my-widget;
}
::view-transition-old(my-widget), ::view-transition-new(my-widget) {
  animation: none;
}
```

### 2.3 自定义事件

| 事件（window 上派发） | 时机 |
|---|---|
| `vt-transition-done` | 每次页面过渡（含降级路径）结束后 |
| `aya-fonts-ready` | Web 字体加载完成、布局刷新之后 |

```ts
window.addEventListener('vt-transition-done', () => { /* 重新初始化依赖 DOM 的东西 */ })
```

### 2.4 animate.css / AnimXYZ 子集扩展

主题只打包两个动画库的**本地子集**（`theme/vendor/animate/`、`theme/vendor/animxyz/animxyz-subset.min.css`）。要用新的动画：

1. 打开 `scripts/generate-motion-css-subsets.mjs`；
2. 在 `ANIMATE_NAMES`（动画名，如 `bounceIn`）或 `XYZ_TOKENS`（utility token，如 `down-2`）中追加；
3. 运行 `node scripts/generate-motion-css-subsets.mjs` 重新生成；
4. 子集规则从全量库逐字节复制，视觉与官方版本一致。

在组件里的用法不变：animate.css 用 `animate__animated animate__fadeIn` 类 + `--animate-duration`；AnimXYZ 用 `xyz="fade up-1"` 属性 + `.xyz-in` / `.xyz-out` 触发类。

---

## 3. 设计令牌参考

按文件分组（均可在 `custom/tokens.css` 覆盖，`.dark` 下有对应暗色值）：

| 文件 | 令牌前缀 | 管什么 |
|---|---|---|
| `style/var.css` | `--aya-gradient-*`、`--aya-c-brand-*`、`--vp-c-brand-*`、`--vp-home-hero-*` | 品牌渐变三色、品牌色通道（tint/阴影复用）、hero 标题/光晕 |
| `style/surface.css` | `--aya-surface-*`、`--aya-frosted-blur-*`、`--aya-shadow-*`、`--aya-search-*` | 全站毛玻璃表面、模糊半径梯度（sm/md/lg/panel/backdrop）、阴影体系 |
| `style/sidebar-window.css` | `--aya-sidebar-*` | 侧栏浮窗：背景、圆角（`--aya-sidebar-radius`）、活跃色、毛玻璃 |
| `style/nav-tabs.css` | `--aya-nav-tab-*`、`--aya-nav-menu-*`、`--aya-nav-pill-*` | 导航胶囊与下拉菜单 |
| `style/reading-mode.css` | `--aya-reading-mode-*` | 纯净阅读模式 |
| `custom.css` | `--aya-c-definition-*`、`--aya-c-warning-*`、`--aya-card-*` | 学术 callout 与卡片 |

改品牌主色只需三个变量：`--aya-gradient-start / middle / end`（hero 渐变、按钮、彩虹动画都引用）。全站半透明品牌 tint（例题背景、搜索高亮、侧栏活跃底色、卡片阴影等）统一走品牌通道变量 `--aya-c-brand-blue/-rgb`、`--aya-c-brand-lilac/-rgb`、`--aya-c-brand-pink/-rgb`，改这几个即可整体换肤。

**整套换肤示例**：`custom/tokens.css` 当前内置一套完整的 [Nord](https://www.nordtheme.com/docs/colors-and-palettes) 调色盘，覆盖了品牌渐变、品牌通道、VitePress 基础背景/文字色（Snow Storm / Polar Night）、Aurora 语义色，以及 hero 标题渐变动画关键帧。可直接照它的结构改成任意配色；清空该文件即回退到主题默认的柔和渐变。

---

## 4. 组件与内容接口

### 4.1 frontmatter 开关（按页生效）

| 字段 | 默认 | 作用 |
|---|---|---|
| `comments: false` | 开 | 关闭本页 Giscus 评论 |
| `backToTop: false` | 开 | 关闭本页返回顶部按钮 |
| `docMeta: false` | 开 | 关闭本页元信息栏（字数/时长/作者/PDF） |
| `pdf: false` | 开 | 仅隐藏元信息栏中的「下载 PDF」 |
| `author: 名字` | Ayaskt | 覆盖元信息栏作者 |
| `pageClass: course-index-page` | — | 课程索引页模式（自动隐藏元信息栏） |

```yaml
---
comments: false
docMeta: false
---
```

### 4.2 内置全局组件

可直接在 markdown 中使用（注册于 `theme/index.ts`）：

| 组件 | 用途 | 详细文档 |
|---|---|---|
| `LyricCard` / `LyricLine` | 歌词块（ruby 注音、双语） | `AGENTS.md`、`docs/others/lab/lyric-container.md` |
| `LyricCover` | 页首歌词封面 | `docs/others/lab/lyric-cover.md` |
| `SongCard` | 歌曲卡片（网易云播放） | `docs/others/lab/song-card.md` |
| `MindMap` | 思维导图（也可用 ` ```mindmap ` fence） | `docs/others/lab/mindmap.md` |
| `CourseIndex` | 课程索引卡片墙 | 课程 README |
| `Confetti` | 彩带特效 | 课程 README |

### 4.3 Markdown 容器

`config.mts` 中 `registerContainer` 注册，样式在 `style/index.css`（example 系）与 `custom.css`（callout 系）：

- `::: example [标题]` / `::: stem` / `::: solution` — 例题 / 题干 / 答案（答案自带折叠，状态存 localStorage）
- `::: definition [标题]` — 定义块
- VitePress 内置：`info` / `tip` / `warning` / `danger` / `note` / `important` / `caution` / `details`

---

## 5. 修改主题源码时的约定

接口不够用、需要动主题内部时遵循：

1. **令牌先行**：新的颜色 / 时长 / 尺寸先在对应 CSS 文件声明 `--aya-*` / `--dur-*` 令牌，JS 通过 `motion-tokens.ts` 读取。
2. **vendor 不可手改**：`theme/vendor/` 下的子集文件只能由 `scripts/generate-motion-css-subsets.mjs` 重新生成；open-props 按官方版本整体替换。
3. **重组件异步化**：新组件若依赖大库，注册时必须 `defineAsyncComponent`。
4. **will-change 不常驻**：只在动画进行期间（配合触发类 / data 属性）声明。
5. **改完跑检查**：`node --test scripts/verify-*.mjs`、`npm run test:theme-components`、`npm run docs:build`；接口变化同步更新本文档与 `CLAUDE.md` / `AGENTS.md`。
6. **提交规范**：更新 `CHANGELOG.md`（格式见 `CLAUDE.md`），版本号遵循 SemVer。
