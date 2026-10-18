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

首页 `homeHero.image.src`（或字符串形式的 `image`）指定固定图片，优先于随机头像池；未指定固定图片时沿用随机头像和亮 / 暗版本切换。

两类插槽的行为不同：

- **主题已占用的插槽**（`layout-top`、`nav-bar-content-after`、`doc-after`、`home-hero-before`、`home-hero-info-after`、`home-hero-image`、`home-features-before`、`home-features-after`）：自定义组件**追加渲染在主题组件之后**。其中 `home-hero-before`（轨道 hero）、`home-features-before`（`01 近期更新`、`02 友情链接` 标题）、`home-features-after`（标题栏式站点信息）只在首页 frontmatter 写了 `homeHero` 时由主题填充；近期更新取 `generated/timeline-entries.json` 的前 4 组。
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
| `--dur-doc-orbit-rail` / `--dur-doc-orbit-node` / `--dur-doc-orbit-toc` / `--dur-doc-orbit-card` / `--doc-orbit-step` | 0.8s / 0.42s / 0.32s / 0.46s / 0.035s | 正文刻度、节点、目录（含珠子滑行）、课程卡片与错峰；收尾等待实际动画结束 |
| `--dur-doc-orbit-exit` / `--ease-doc-orbit-exit` / `--dur-doc-orbit-exit-timeout` | 0.24s / 同 `--ease-home-exit` / 0.7s | 离开正文页前装饰收回；超时只防动画事件丢失 |
| `--dur-doc-orbit-reveal` | 0.6s | 滚入视口时标题刻度、例题刻度、翻页点线的描出 |
| `--dur-doc-defocus` / `--ease-doc-defocus` | 0.22s / `cubic-bezier(0.4, 0, 1, 1)` | 正文页之间：旧页失焦退场 |
| `--dur-doc-focus` / `--ease-doc-focus` / `--dur-doc-focus-step` / `--dur-doc-focus-delay` | 0.7s / `cubic-bezier(0.2, 0.7, 0.1, 1)` / 50ms / 30ms | 正文页之间：新页首屏逐块对焦与错峰 |
| `--doc-defocus-blur` / `--doc-focus-blur` | 5px / 6px | 失焦 / 对焦的模糊半径 |
| `--dur-doc-focus-lag` | 0.2s | 对焦进场时点阵与十字额外延后的时间 |
| `--dur-doc-enter` | 0.94s | 正文横向进场 |
| `--dur-sidebar-enter` / `--dur-sidebar-exit` | 0.72s / 0.46s | 侧栏进 / 出场 |
| `--dur-appearance-enter` / `--dur-appearance-exit` / `--dur-appearance-gap` | 0.68s / 0.42s / 0.14s | 日夜切换 |
| `--dur-panel` / `--dur-overlay` | 0.62s / 0.34s | 面板 / 遮罩 |
| `--dur-menu` / `--dur-menu-out` / `--dur-menu-close-delay` | 0.32s / 0.22s / 0.1s | 导航下拉菜单 |
| `--dur-list-item` | 0.52s | 列表项 stagger |
| `--dur-tap` | 0.12s | 按钮按压 |
| `--dur-ripple` / `--ripple-size` | 0.8s / 200px | 点击涟漪 |
| `--dur-orbit-draw` / `--dur-orbit-fade` / `--dur-orbit-pop` / `--dur-orbit-panel` / `--orbit-step` | 1.6s / 1s / 0.8s / 0.42s / 0.1s | 首页轨道 hero 描线、淡入、节点弹出、课程面板与入场错峰 |
| `--dur-home-reveal` / `--home-reveal-step` | 0.9s / 0.08s | 首页 hero 以下各区块（标题行、近期更新卡片、友情链接、站点信息）滚动进入视口时的入场时长与同批错峰 |
| `--home-reveal-blur` | 10px | 上述区块入场的失焦半径：卡片取全值，卡内文字取一半；设为 `0px` 即关闭模糊 |
| `--dur-home-orbit` / `--ease-home-orbit` | 1.3s / `cubic-bezier(0.22, 1, 0.36, 1)` | 首页进场：节点沿弧从起点滑行到位（越远越久），标题逐字升起与镜头张开共用该曲线 |
| `--dur-home-iris` | 0.9s | 文档页回首页时，新页面从轨道弧心以椭圆光圈展开（弧心坐标由 hero 写入 `--home-iris-x/y`） |
| `--dur-home-exit` / `--ease-home-exit` | 0.52s / `cubic-bezier(0.55, 0, 0.75, 0.2)` | 离开首页：节点收回弧起点、弧线回缩、镜头合拢、标题上浮虚化 |
| `--dur-home-exit-timeout` | 0.95s | 首页离场动画的兜底超时，超时后直接跳转 |

JS 动画令牌（由 `theme/motion-tokens.ts` 在运行时读取，同样可在 `tokens.css` 覆盖）：

| 令牌 | 默认 | 用途 | 消费方 |
|---|---|---|---|
| `--dur-solution` / `--ease-solution` | 0.56s / cubic-bezier(0.16, 1, 0.3, 1) | 例题答案展开折叠 | `solution-collapse.ts` |
| `--dur-sidebar-collapse` | 0.26s | 侧栏分组展开折叠 | `sidebar-motion.ts` |
| `--dur-sidebar-indicator` | 0.38s | 侧栏活跃指示器滑动 | `sidebar-window.css` |
| `--dur-outline-out` / `--dur-outline-in` | 0.14s / 0.26s | 大纲跳转正文淡出 / 淡入 | `outline-jump-motion.ts` |
| `--dur-timeline-enter` / `--dur-timeline-exit` | 0.78s / 0.26s | 时间线卡片由虚到实对焦入场、失焦离场；抬头标题逐字对焦也按它缩放 | `TimelinePage.vue` |
| `--dur-timeline-stagger` / `--dur-timeline-lead` | 0.07s / 0.36s | 同批卡片的错峰间隔；首屏卡片等抬头起势的提前量（统计数字也从这里开始滚动） | `TimelinePage.vue` |
| `--dur-timeline-rail` | 1.2s | 点线底轨自上而下描出 | `TimelinePage.vue` |
| `--dur-timeline-fill` / `--dur-timeline-follow` | 0.34s / 0.12s | 进度实线追随滚动的时间常数：首次铺开 / 平时跟手（越大越"拖"） | `TimelinePage.vue` |
| `--timeline-focus-blur` | 10px（≤768px 为 8px） | 时间线对焦入场的起始模糊半径 | `TimelinePage.vue` |
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
| `vt-transition-done` | 路由 View Transition 收尾后（无 VT 的降级路径不触发） |
| `aya-fonts-ready` | Web 字体加载完成、布局刷新之后 |

```ts
window.addEventListener('vt-transition-done', () => { /* 重新初始化依赖 DOM 的东西 */ })
```

正文轨道装饰使用 `html[data-doc-orbit]`：

| 值 | 时机 | 动的是什么 |
|---|---|---|
| `enter` | 首次加载 / 正文页之间换页 | 装饰描出；首次加载时正文局部进场（元信息、目录文字、课程卡片），正文页之间换页时改为首屏对焦（见下） |
| `pending` | 路由 VT 中（首页 → 正文等），新快照已截、动画未开始 | 装饰暂时隐藏 |
| `draw` | 收到 `vt-transition-ready` 之后 | 只描装饰（刻度、节点、轨道、珠子），与 VT 整页淡入同时播放 |
| `exit` | 离开正文页前 | 装饰收回（`doc-orbit-out-*`）；去首页 / 时间线时收完才截旧快照 |
| `idle` | 以上动画结束 | 静态 |

**正文页之间不走 View Transition。** `PageTransition.vue` 在两个正文页（包括课程目录页）之间导航时：

1. 在 `<html>` 上写 `data-doc-leaving`，正文容器和右侧目录播放 `doc-orbit-defocus`（轻度失焦并淡出）；切换课程时值为 `sidebar`，侧栏条目列表 `.VPSidebar .nav` 也一起失焦，窗框不动。装饰同时进入 `exit`。
2. 退场与新页模块加载并行：路由在 `onAfterPageLoad` 里等退场结束才替换页面。退场播完会写 `data-doc-left`，把旧容器改成静态隐藏。
3. 换页后 `doc-orbit.ts` 给首屏内的块写 `data-orbit-focus` 与 `--orbit-focus-i`，`<html>` 写 `data-doc-arrive`，各块按序号错峰播放 `doc-orbit-focus`（模糊对焦）；点阵与十字再晚 `--dur-doc-focus-lag`。收尾时这些属性全部清除。

不要给 `.VPSidebar` 本身加失焦 / 对焦：它带着首次加载的 `fadeInLeft`，覆盖后再撤掉会让那段淡入重播。同理不要作用在 `.aside` 上（`filter` / `transform` 会让它成为内部 fixed 容器的包含块），用 `.aside-content`。

走 View Transition 的路由（首页 → 正文等）由 VT 承担正文进场，`draw` 里不要给正文、目录文字或课程卡片加动画，也不要在 `vt-transition-done` 后再隐藏并播放它们（`scripts/verify-doc-orbit-motion.mjs` 会检查）。`PageTransition.vue` 在 `transition.ready` 时派发 `vt-transition-ready`。

首屏以下的 h2 / h3 刻度与节点、例题刻度条、翻页点线在滚入视口后才描出：`doc-orbit.ts` 给它们写 `data-orbit-in`，样式用 transition 而不是 keyframes，所以不影响上面的状态收尾。

`doc-orbit.ts` 在文档页还会写入以下状态，可在 `custom/tokens.css` 里按需改样式：

| 状态 | 位置 | 含义 |
|---|---|---|
| `data-orbit-passed` | 正文 `h2`、右侧目录一级 `li` | 已越过阅读线（视口 32%）/ 已读到的目录条目，节点点亮 |
| `data-orbit-has-active` | `.VPDocAsideOutline .content` | 目录存在当前条目，显示已读实线 |
| `--doc-orbit-toc-y` | `.VPDocAsideOutline .content` | 当前条目珠子的 `top`，取自 VitePress 的 `.outline-marker` |
| `--doc-orbit-sheet` | `<html>` | 刻度尺右端的图纸标签字符串（路由目录段，如 `Y3S2 · CCD · PART 2`），根目录页不写入 |

右侧目录的珠子就是 VitePress 自带的 `.outline-marker`。不要给目录的 `li` 加 `position`：VitePress 按链接相对 `.root` 的 `offsetTop` 定位 marker，`li` 成为定位祖先后珠子会停在错误的行上。

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
| `style/surface.css` | `--aya-radius-{xs,sm,md,lg,xl,pill}`、`--aya-elevation-{1..4}` | 圆角阶梯（6/12/16/20/28/999px，≤767px 时 sm/md/lg/xl 缩为 10/14/16/22px）与阴影层级（1 静止内容块如代码块 · 2 卡片 · 3 浮动窗口 · 4 弹层）；新组件应引用这些档位而非手写数值 |
| `style/sidebar-window.css` | `--aya-sidebar-*` | 侧栏浮窗：背景、圆角（`--aya-sidebar-radius`）、版心对齐间距（`--aya-sidebar-gutter`）、活跃色、毛玻璃 |
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

**Giscus 评论外观**：`GiscusComment.vue` 把 `theme` 指向 `docs/public/giscus/aya-light.css` / `aya-dark.css`，两者各自导入官方主题后再导入公用的 `aya-base.css`（形状、排版、动画，并导入站点的 `/fonts/fonts.css`）。改配色改前两份，改形状和动效改 `aya-base.css`。

- 这些样式在 giscus.app 的 iframe 里生效，读不到站点的 CSS 变量和动效令牌，颜色和曲线是手抄的；改 `custom/tokens.css` 的配色后要同步这里。
- iframe 会跨域请求这些文件：线上 GitHub Pages 自带 `Access-Control-Allow-Origin`，开发服务器靠 `config.mts` 里的 `vite.server.cors` 放行 `https://giscus.app`。
- 主题给 iframe 内部留了 10px 边距放阴影，`GiscusComment.vue` 的外层容器相应左右各外扩 10px，两边要一起改。

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
