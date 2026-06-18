# 平面毛玻璃材质重构设计

## 背景

这个仓库是基于 VitePress v2 的中文课程笔记博客。当前主题在导航栏、侧栏、搜索弹窗、阅读模式、MindMap、CourseIndex、SongCard 等地方大量使用玻璃拟态代码。视觉上这些表面已经形成了站点特征：半透明底色、圆角、模糊背景和较轻的浮动阴影。

现在的问题是，代码里同时混有 `glass`、`liquid`、`highlight`、斜向白色反射层、伪元素高光和重复的局部变量。它们让材质逻辑不清晰，也让后续维护很难判断哪些代码是必要的毛玻璃，哪些只是液态玻璃反射装饰。

新的目标是重写 UI 材质逻辑，但视觉效果尽量不变：保留组件和卡片背后的阴影、圆角、透明层和高斯模糊；清理所有玻璃反射相关代码，把全站表面统一为平面毛玻璃。

## 已确认的用户决策

- 覆盖范围选择全站所有表面，而不是只改导航或侧栏。
- 卡片和组件背后的阴影必须保持，不属于要清理的玻璃反射代码。
- 目标视觉采用平面毛玻璃：纯背景透明度、边框、阴影和 `backdrop-filter: blur(...)`，不使用方向性反光。
- 命名迁移采用折中方案：公共材质变量重命名，组件内部优先删除反射代码，避免大面积无意义改名。
- 删除边界采用折中方案：删除明显液态反射和方向性 sheen，保留少量非方向性的 hover / active 状态层以维持可读性。
- 静态预览方向已确认：阴影深度、透明毛玻璃和布局层级保持，去掉斜向反射/高光伪元素。

## 目标

- 建立统一的平面毛玻璃材质 token，替代散落的 `liquid` / `glass` / `highlight` 公共语义。
- 保留现有 `box-shadow` 深度、圆角、尺寸、布局和交互节奏。
- 删除斜向白色反射层、sheen、高光伪元素和只为反射存在的重复规则。
- 让导航、搜索、侧栏、移动菜单、阅读模式和内容组件使用一致的表面语言。
- 保留 `prefers-reduced-transparency`、`prefers-reduced-motion`、dark mode 和移动端适配。
- 不改变阅读模式、路由切换、sidebar active indicator、MindMap 交互和 SongCard 播放器行为。

## 不做什么

- 不把站点改成实体卡片风格。
- 不降低或删除现有卡片/组件阴影。
- 不重写 VitePress 默认组件结构。
- 不改变页面导航结构、课程内容或 Markdown API。
- 不重写 `PageTransition.vue` 的路由动画状态机。
- 不把所有组件内部变量一次性重命名到完全统一，除非它们已经位于公共材质层。
- 不把 hover / active 状态做成不可见；必要的平面状态层可以保留。

## 材质定义

新的公共材质以 `surface` / `frosted` / `blur` 语义命名。它表达的是平面毛玻璃，而不是液态玻璃。

公共 token 应覆盖：

- 表面背景：默认、强调、柔和、hover、active。
- 表面边框：浅色和深色模式下的半透明边线。
- 高斯模糊：大面板、中型控件、小胶囊。
- fallback 背景：`prefers-reduced-transparency: reduce` 时使用。
- 共享阴影引用：保留原有 shadow 数值，并通过新材质语义复用。

示例命名方向：

```css
:root {
  --aya-surface-bg: ...;
  --aya-surface-bg-strong: ...;
  --aya-surface-bg-soft: ...;
  --aya-surface-bg-hover: ...;
  --aya-surface-bg-active: ...;
  --aya-surface-border: ...;
  --aya-frosted-blur-lg: blur(...);
  --aya-frosted-blur-md: blur(...);
  --aya-frosted-blur-sm: blur(...);
}
```

旧的 shadow token 不应被当作反射清理目标。必要时可以改为更明确的 surface shadow 名称，但数值和视觉深度应保持。

## 架构

实现分三层推进。

### 1. 公共材质层

在主题样式中集中定义平面毛玻璃 token。可放在现有 `blur.css`，或在实施计划中拆出更清晰的 `surface.css` 并由 `index.css` 引入。该层只定义变量和通用语义，不绑定具体组件结构。

职责：

- 定义 light / dark 模式下的表面色、边框、blur 和 fallback。
- 保留并整理当前卡片、导航、菜单、侧栏和搜索的 shadow 数值。
- 删除公共层中 `liquid`、`glass`、`highlight` 这些容易误导的材质命名。

### 2. 全局框架表面

优先迁移站点框架表面：

- `nav-tabs.css`：导航胶囊、导航菜单、搜索按钮、更多按钮、外观按钮、社交链接、移动端按钮。
- `sidebar-window.css`：桌面浮动 sidebar、sidebar item hover、移动端 `VPNavScreen`。
- `blur.css`：本地搜索弹窗、搜索结果、local nav、feature 卡片。
- `reading-mode.css`：阅读模式按钮、toast、阅读模式下隐藏/唤回的 navbar 表面。
- `transitions.css`：只更新注释语义，不改变 View Transition 行为。

这些文件应改为引用公共 surface token。斜向反射用的 `::before` / `::after` 规则需要删除或降级为纯状态层。

### 3. 内容组件表面

再迁移内容组件内部表面：

- `MindMap.vue`：工具条胶囊、导出菜单、modal 表面。
- `CourseIndex.vue`：课程卡片、筛选/状态控件中使用的高光层。
- `SongCard.vue`：播放器卡片、封面框、弹出控件中使用的高光层。
- `MathCopy.vue`：复制提示表面。

组件内部不做结构重写。保留现有 props、事件、状态、布局和业务逻辑，只移除反射/高光装饰或接入公共材质 token。

## 删除规则

必须删除或替换：

- `linear-gradient(135deg, rgb(255 255 255 / ...), ...)` 这类方向性白色反射层。
- 单纯为了反射而存在的 `::before` / `::after`。
- 公共层中的 `liquid`、`glass`、`highlight` 语义变量。
- 伪元素中显式写 `backdrop-filter: none` 只为了压住高光层的规则。
- 只因液态玻璃叠层产生的重复背景声明。

可以保留：

- `box-shadow` 和已有 shadow token。
- 非方向性的 hover / active 背景色。
- 用于真实布局、图标、遮罩、loading、状态定位的伪元素。
- `backdrop-filter: blur(...)` 和 `-webkit-backdrop-filter`。
- reduced-transparency 下关闭 blur 的 fallback。

判断标准：如果一段代码的主要作用是让表面像有光线反射，就删除；如果它的作用是维持层级、对比度、交互状态或可访问性，就保留或改写为平面状态层。

## 行为保持

### 阅读模式

阅读模式状态机保持不变：

- 横屏文档页可用。
- 首页只震动并提示。
- `readingMode: false` 页面禁用。
- 切换到不支持页面时退出。
- 刷新后不持久化。
- hover 热区继续临时唤回 nav、sidebar 和 aside。
- 表面出现后热区不能挡住真实按钮。

阅读模式里曾经为了实时渲染 blur 而保持 navbar 可绘制。重构后仍要保留这个行为，因为平面毛玻璃仍依赖 live `backdrop-filter`。

### 路由切换

`PageTransition.vue` 的职责不变。sidebar 的 view-transition 规则继续保留，尤其是从有 sidebar 到无 sidebar 时先关闭真实 sidebar blur，避免旧快照留下模糊矩形残影。

可以把注释中的“玻璃态导航”改成“frosted/blurred surface”，但不能改变实际 class 语义和动画时序。

### 组件交互

MindMap、CourseIndex、SongCard、MathCopy 的交互行为不变：

- 不改组件 props。
- 不改事件处理。
- 不改播放器、导出、筛选、modal、复制提示逻辑。
- 不改内容布局尺寸。

## 视觉验收

完成后应满足：

- 导航、侧栏、搜索弹窗、移动菜单和内容组件仍有透明毛玻璃感。
- 阴影深度与当前站点基本一致。
- 页面不再出现斜向高光、反光 sheen 或液态玻璃伪反射。
- hover / active 状态仍清楚可辨。
- dark mode 下文字、边框和状态层有足够对比度。
- `prefers-reduced-transparency` 下表面回退到实体背景。
- 移动端 nav screen、hamburger、搜索弹窗不溢出、不互相遮挡。
- 阅读模式唤回 navbar 时 blur 仍实时渲染，不出现先透明后补 blur 的迟滞感。
- 路由切换时不出现 sidebar 模糊残影。

## 验证计划

静态检查：

```bash
rg "liquid|glass|highlight|backdrop-filter|linear-gradient\\(135deg" docs/.vitepress/theme
```

检查目的：

- 剩余 `liquid` / `glass` / `highlight` 是否只存在于非公共历史说明或确有必要的旧兼容别名。
- 剩余 `linear-gradient(135deg, ...)` 是否仍是反射层。如果是，应继续清理。
- `backdrop-filter` 是否都服务于 blur，而不是多层反射伪元素。

交互测试：

```bash
npm run test:reading-mode
```

构建验证：

```bash
npm run docs:build
```

浏览器检查：

- 首页桌面导航和 feature 卡片。
- 文档页桌面导航、sidebar、aside、阅读模式唤回。
- 本地搜索弹窗和搜索结果。
- 移动端 nav screen、hamburger、搜索按钮。
- MindMap 工具条、导出菜单和 modal。
- CourseIndex 卡片。
- SongCard 播放器表面和弹出控件。
- MathCopy 提示。

必要时使用 Playwright 截图对比 light / dark / mobile 三类场景。

## 预计修改文件

核心样式文件：

- `docs/.vitepress/theme/style/blur.css`
- `docs/.vitepress/theme/style/nav-tabs.css`
- `docs/.vitepress/theme/style/sidebar-window.css`
- `docs/.vitepress/theme/style/reading-mode.css`
- `docs/.vitepress/theme/style/transitions.css`
- `docs/.vitepress/theme/style/index.css`，如果新增 `surface.css`

内容组件：

- `docs/.vitepress/theme/components/MindMap.vue`
- `docs/.vitepress/theme/components/CourseIndex.vue`
- `docs/.vitepress/theme/components/SongCard.vue`
- `docs/.vitepress/theme/components/MathCopy.vue`

测试或验证脚本：

- `scripts/reading-mode.test.mjs`，仅在需要更新 CSS invariant 时修改。

## 风险与缓解

### 选择器优先级回归

风险：当前样式有不少 VitePress 覆盖规则和 `!important`。重构 token 时可能导致 hover/active 不生效。

缓解：先迁移公共变量，再局部替换选择器；不在同一轮里大规模重排文件结构。

### 阅读模式 blur 回归

风险：如果把 navbar 从可绘制状态移除，Chromium 可能再次延迟渲染 `backdrop-filter`。

缓解：保留 near-zero opacity + `visibility: visible` 的策略，只更新注释和变量语义。

### View Transition 残影

风险：sidebar 的 blur 在快照中残留，路由切换后出现模糊矩形。

缓解：保留 `vt-hide-sidebar` 关闭真实 sidebar blur 的规则，只改材质变量和注释。

### 组件视觉变平

风险：删除反射后部分组件可能显得层级不足。

缓解：优先保留 shadow 和边框；必要时调高非方向性背景透明度，而不是恢复斜向高光。

## 完成定义

- 全站表面使用平面毛玻璃语义，不再依赖液态玻璃反射代码。
- 公共材质变量可读，能表达 surface / frosted / blur / border / shadow。
- 现有阴影深度保留。
- 导航、搜索、侧栏、阅读模式和主要内容组件视觉稳定。
- 阅读模式测试通过。
- VitePress 构建通过。
- 视觉检查未发现明显溢出、遮挡、残影或反射层残留。
