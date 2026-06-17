# 纯净阅读模式设计

## 背景

这个仓库是基于 VitePress v2 的中文课程笔记博客。当前主题扩展了默认主题，已经有自定义 `Layout.vue` / `MyLayout.vue`、玻璃质感 navbar、浮动 sidebar、右侧 outline、页面 View Transition、sidebar 动效和暗色模式切换。

新的目标是在 navbar 中加入一个“纯净阅读模式”按钮。它用于临时淡出与正文阅读无关的界面：顶部 navbar、左侧 sidebar 和右侧目录。正文布局不重新排版，避免阅读时出现横向跳动。

## 目标

- 在 navbar 的黑白切换胶囊旁新增一个独立阅读模式胶囊按钮。
- 按钮图标使用用户提供的打开书本 SVG，并改为 `currentColor` 以跟随当前 navbar 色彩。
- 横屏文档布局页面默认支持纯净阅读模式。
- 每篇文章可以通过 frontmatter 自定义是否启用纯净阅读模式。
- 阅读模式开启后隐藏 navbar、sidebar、右侧目录，但鼠标移到对应区域时只临时淡入该区域。
- 页面切换时阅读模式状态在当前 SPA 会话内保持；刷新网页后重置为普通模式。
- 首页和禁用页面保留横屏按钮，但点击只给反馈，不进入阅读模式。
- 竖屏状态下按钮隐藏，阅读模式不生效。

## 不做什么

- 不改变正文区域的宽度、居中方式或最大宽度。
- 不修改具体课程笔记内容。
- 不引入新的动画库或状态管理库。
- 不把阅读模式状态写入 `localStorage`、`sessionStorage` 或 URL。
- 不重写 VitePress 默认 navbar、sidebar、outline 组件。
- 不让阅读按钮在阅读模式中常驻；按钮属于 navbar，会随 navbar 一起淡出。

## 已确认的用户决策

- 采用独立组件方案：新增 `ReadingModeControl.vue`，而不是把逻辑塞进 `PageTransition.vue`。
- 横屏下所有文档布局页面都支持按钮展示。
- frontmatter 默认启用阅读模式，少数页面用 `readingMode: false` 禁用。
- `readingMode: false` 页面仍显示横屏按钮；点击时震动并提示本页未启用。
- 首页也显示横屏按钮；点击时震动并提示“这里似乎没有可以隐藏的内容...”。
- 竖屏状态下直接隐藏按钮，阅读模式不生效。
- 阅读按钮是标准开关：第一次点击开启，再次点击退出。
- 开启阅读模式后，鼠标移到某个区域只淡入该区域。
- 鼠标离开对应区域后延迟 `0.3s` 淡出。
- 正文布局保持不变，只隐藏三件套。
- 阅读模式开启后按钮随 navbar 一起隐藏；退出前需要先把鼠标移到顶部唤回 navbar。
- 按钮普通状态保持和 navbar 其他胶囊一致；阅读模式开启后用明暗反转体现 active 状态。
- navbar 的阴影带属于 navbar 本体，必须随着 navbar 一起淡出和淡入，不能在纯净阅读模式下留下单独阴影。

## Frontmatter API

页面默认支持阅读模式：

```yaml
---
title: Example
---
```

单页禁用阅读模式：

```yaml
---
readingMode: false
---
```

禁用只影响该页是否能进入纯净阅读模式，不影响按钮在横屏文档页中的显示。用户点击禁用页按钮时，只显示反馈提示。

## 架构

新增组件：

- `docs/.vitepress/theme/components/ReadingModeControl.vue`

新增样式：

- `docs/.vitepress/theme/style/reading-mode.css`

接入点：

- 在 `docs/.vitepress/theme/components/MyLayout.vue` 中通过 `DefaultTheme.Layout` 的 `nav-bar-content-after` slot 渲染 `ReadingModeControl`。
- 在 `docs/.vitepress/theme/style/index.css` 中引入 `reading-mode.css`。

组件负责：

- 渲染阅读模式按钮和点击反馈提示。
- 判断当前页面类型、frontmatter 和视口方向。
- 维护当前 SPA 会话内的 `active` 状态。
- 在 `document.documentElement` 上维护阅读模式相关 class。
- 监听路由变化、窗口 resize / orientation 变化和热区 hover。

CSS 负责：

- 按钮的普通与 active 外观。
- 首页 / 禁用页点击后的轻微左右震动。
- toast 提示框外观和定位。
- navbar、sidebar、右侧目录的淡出和临时淡入。
- 顶部、左侧、右侧透明 hover 热区。
- `prefers-reduced-motion` 和竖屏隐藏规则。

## 页面与状态规则

### 视口规则

横屏时显示阅读模式按钮。竖屏时按钮隐藏，并强制阅读模式不生效。如果用户在阅读模式开启后切换到竖屏，组件应退出 active 状态并恢复普通界面。

### 页面规则

首页：

- 横屏显示按钮。
- 点击按钮不进入阅读模式。
- 按钮轻微左右震动。
- 在鼠标附近显示提示：“这里似乎没有可以隐藏的内容...”。

支持阅读模式的文档页：

- 横屏显示按钮。
- 首次点击进入阅读模式。
- 再次点击退出阅读模式。
- 页面切换到另一个支持页时，active 状态保持。

`readingMode: false` 文档页：

- 横屏显示按钮。
- 点击按钮不进入阅读模式。
- 按钮轻微左右震动。
- 在鼠标附近显示提示：“本页未启用纯净阅读模式”。
- 如果从 active 页跳转到该页，组件应立即退出 active 状态。

### 刷新规则

阅读模式只存在于当前 SPA 会话。刷新页面后，组件重新初始化，状态回到普通模式。

## CSS 状态类

建议在 `document.documentElement` 上维护这些 class：

- `reading-mode-active`：阅读模式已开启且当前页支持、当前视口为横屏。
- `reading-mode-nav-visible`：阅读模式下 navbar 临时可见。
- `reading-mode-sidebar-visible`：阅读模式下 sidebar 临时可见。
- `reading-mode-aside-visible`：阅读模式下右侧目录临时可见。
- `reading-mode-button-shake`：按钮点击反馈动画。

当 `reading-mode-active` 存在时：

- `.VPNavBar` 默认淡出并禁用交互；它的 `::before` 阴影带必须随 navbar 同步淡出。
- `.VPSidebar` 默认淡出并禁用交互。
- `.VPDoc .aside` 默认淡出并禁用交互。
- 对应 `*-visible` class 存在时，只恢复对应区域的 opacity 和 pointer-events。

## 热区设计

阅读模式开启后需要三个透明热区：

- 顶部热区：覆盖 navbar 原本所在高度，用于唤回 navbar。
- 左侧热区：覆盖 sidebar 原本的浮动窗口区域，用于唤回 sidebar。
- 右侧热区：覆盖右侧目录原本区域，用于唤回 outline。

热区不改变正文布局。进入热区时立即显示对应组件；离开热区后启动 `0.3s` 延迟，延迟结束后淡出。进入另一个热区只影响另一个组件，不应把所有组件一起唤回。

如果某页没有 sidebar 或没有右侧目录，对应热区可以不产生可见效果，但不应报错。

## 按钮视觉

普通状态：

- 独立玻璃胶囊。
- 高度、圆角、边框、背景、阴影和 blur 使用现有 `--aya-nav-tab-*` 变量。
- 内部只显示用户提供的书本 SVG 图标。
- SVG 使用 `fill="currentColor"` 或等价 CSS，使颜色跟随 nav 文本色。
- 不显示按钮文字。

active 状态：

- 保持胶囊形态和 nav 质感。
- 用明暗反转区分状态：浅色模式下深底浅图标，深色模式下浅底深图标。
- active 状态不使用突兀的彩色大按钮。

反馈状态：

- 首页或禁用页点击时，按钮播放轻微左右震动。
- toast 出现在鼠标附近，并短暂显示后消失。
- toast 不应遮挡按钮本身太久，也不应影响页面布局。

## Navbar 阴影绑定

当前主题的 navbar 顶部阴影带由 `.VPNavBar::before` 绘制。阅读模式隐藏 navbar 时，应对 `.VPNavBar` 这个整体做淡出/淡入，而不是只隐藏 `.wrapper`、`.content-body` 或按钮区域。这样 navbar 的玻璃胶囊、按钮、标题区域和阴影带会作为同一个视觉对象一起消失和回来。

实现时不能让 `.VPNavBar::before` 在 `reading-mode-active` 下单独保持可见，也不能给阴影带创建脱离 navbar 的固定层。

## 动画与可访问性

- 默认淡出 / 淡入使用短时 opacity 过渡，可带轻微位移，但不改变布局。
- 鼠标离开热区后 `0.3s` 再淡出。
- 尊重 `prefers-reduced-motion: reduce`：减少或取消位移动画，保留必要的显示状态切换。
- 按钮使用真实 `<button>`，提供 `aria-label`、`aria-pressed` 和 `title`。
- active / focus-visible 状态必须清晰。
- toast 使用非阻塞提示，不抢焦点。

## 与现有主题的关系

- `Layout.vue` 继续负责黑白切换的 View Transition。
- `PageTransition.vue` 继续负责路由过渡、sidebar active indicator 和 outline jump motion。
- `ReadingModeControl.vue` 不接管路由跳转，只观察路由和 frontmatter 状态。
- `reading-mode.css` 只处理阅读模式相关选择器，避免修改现有 navbar、sidebar、outline 的基础样式。
- 现有 `vt-appearance`、`vt-hide-sidebar` 等 View Transition class 不应被阅读模式复用，以免语义混淆。

## 预计修改文件

预计实现时修改：

- `docs/.vitepress/theme/components/MyLayout.vue`
- `docs/.vitepress/theme/components/ReadingModeControl.vue`
- `docs/.vitepress/theme/style/index.css`
- `docs/.vitepress/theme/style/reading-mode.css`

可选验证或回归脚本：

- `scripts/verify-reading-mode.mjs`

## 验证计划

实现后至少验证：

```bash
npm run docs:build
```

交互检查：

- 横屏首页按钮显示，点击只震动并提示“这里似乎没有可以隐藏的内容...”。
- 横屏普通文档页按钮显示，点击可进入和退出阅读模式。
- 阅读模式开启后 navbar、sidebar、右侧目录默认淡出。
- navbar 淡出时顶部阴影带同步淡出；唤回 navbar 时阴影带同步淡入。
- 鼠标移到顶部只唤回 navbar。
- 鼠标移到左侧只唤回 sidebar。
- 鼠标移到右侧只唤回右侧目录。
- 鼠标离开对应区域后约 `0.3s` 再淡出。
- 支持页之间切换时阅读模式保持。
- 切换到 `readingMode: false` 页面时阅读模式退出，按钮仍显示，点击只提示。
- 刷新页面后阅读模式重置为普通模式。
- 竖屏时按钮隐藏，阅读模式不生效。
- 暗色模式和浅色模式下按钮普通状态与 nav 一致，active 状态有明暗反转区分。
- `prefers-reduced-motion: reduce` 下无明显位移动画。

## 风险与注意事项

- navbar 本身在阅读模式中会淡出，因此退出阅读模式前需要先把鼠标移到顶部热区唤回 navbar。
- `.VPDoc .aside` 只在宽屏下存在；横屏但宽度不足时，右侧目录可能本来就不显示，阅读模式不应强行创建它。
- sidebar 已有 View Transition 和 active indicator 逻辑，阅读模式只用 opacity / pointer-events 控制显示，避免影响其内部定位。
- 透明热区需要有足够高的 z-index 接收鼠标事件，但不能阻挡正文内容区域的正常阅读和选择。
