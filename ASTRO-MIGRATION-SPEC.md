# Astro Migration Spec

本文件记录当前 VitePress 文档站迁移到 Astro 自定义框架时已经确认的目标、边界、架构方向和 P0 验收范围。它是迁移分支上的实施基线。

## 1. 迁移定位

- 本次迁移不是渐进式升级，而是在迁移分支上的完整 Astro 重构。
- 当前 VitePress 实现只作为视觉、动画、行为和内容解析的 reference。
- 不要求保留 VitePress 可运行性作为最终目标。
- 清理旧实现放在迁移完成后处理。迁移期间可以临时保留 `docs/.vitepress/` 作为 reference。
- 如果旧实现影响 Astro 构建或扫描，可以把旧文件移入 `.legacy/` 并加入 `.gitignore`，但这不是第一步。

## 2. 核心目标

- 使用 Astro 重构当前 VitePress 文档站。
- 最终桌面端表现、动画、视觉风格、字体大小和当前版本尽量一致。
- 移动端允许重做交互和布局，但必须和桌面端的 frosted / floating surface 视觉语言统一。
- 使用强类型 TypeScript 配置文件，保持类似当前 `config.mts` 的集中配置能力，但拆成更清晰的模块。
- 保留 SPA-like 页面切换体验和 View Transition 过渡动画。
- Markdown 渲染管线使用 remark / rehype。
- 公式渲染使用 KaTeX。
- 保留全部毛玻璃效果，并修正当前 Firefox / Zen / Gecko 下毛玻璃和动画不稳定的问题。
- 保留 changelog。
- 保持 GitHub Pages 静态部署。
- 使用 pnpm。

## 3. 内容与 URL

- 内容源继续保留在 `docs/`，不迁入 `src/content/docs/`。
- 不修改现有 Markdown 正文内容。
- Markdown 中的 `[]()` 路径解析必须符合 VitePress 的源文件相对路径行为。
- 不采用 Starlight 的相对链接解析行为。
- 例如 `../lec13.md` 必须基于当前 Markdown 文件所在目录解析，而不是基于已生成页面 URL 解析。
- 站点 URL 要尽量保持当前 VitePress 兼容。
- `docs/index.md` 对应 `/`。
- 普通 Markdown 页面保持当前可访问路径语义，例如 `/Y3S2/DSP/DSP Chapter 2`。
- Markdown 链接中的 `.md` 输出时转成对应页面 URL，不暴露 `.md`。
- 空格、中文路径、大小写和 README 类页面的行为尽量保持当前可访问状态。

## 4. Docs Space 系统

- 不使用 Starlight 的文档路由、sidebar 和链接模型。
- 在 Astro 上自建 VitePress-compatible docs runtime。
- 支持按 URL 前缀切换文档域、sidebar、nav active state、outline 和 layout。
- 文档域示例包括 `/Y3S2/DSP/`、`/Y3S2/CCD/`、`/Y3S1/CPS_N/`、`/early/CAD/`。
- 顶部 nav 的 `activeMatch` 行为需要保留。
- 课程 README 和普通 lecture 页面需要支持不同布局规则。
- 普通 lecture 页面显示正文、左 sidebar 和右 outline。
- course-index README 页面隐藏 aside，使用课程卡片网格。

推荐配置形态：

```ts
export const docsSpaces = [
  {
    id: 'dsp',
    base: '/Y3S2/DSP/',
    title: '数字信号处理 DSP',
    sidebar: [],
  },
] satisfies DocsSpace[]
```

## 5. Markdown 渲染管线

- 使用 plain Markdown，不使用 MDX。
- 使用 remark / rehype 自建渲染管线。
- 支持当前自定义容器：`example`、`stem`、`solution`、`definition`。
- 支持 `mindmap` fenced code block。
- 支持构建期 heading / outline 抽取。
- 支持构建期 DocMeta 数据：字数、阅读时间、作者、更新时间、PDF 按钮状态。
- 支持本地图片尺寸注入，减少页面切换时布局跳动。
- 支持 Markdown 中的 HTML。
- 支持 Markdown 中的组件标签，但通过自建组件 registry 绑定，不使用 MDX。

## 6. Markdown 组件系统

- Markdown 中继续允许直接写 `<CourseIndex>`、`<LyricCard>`、`<LyricLine>`、`<LyricCover>`、`<SongCard>`、`<MindMap>` 等组件。
- 通过通用 Markdown component registry 识别 PascalCase 组件。
- 新增普通组件时只需要注册组件，不应修改 compiler 主逻辑。
- compiler 负责通用解析：组件名、静态 props、Vue 风格绑定 props、嵌套 children。
- `:groups="[...]"` 这类绑定只允许安全的字面量表达式，不执行任意 JS。
- 组件级构建增强放入独立 transform rules，而不是写死在 renderer 中。

推荐 registry：

```ts
export const markdownComponents = {
  CourseIndex,
  LyricCard,
  LyricLine,
  LyricCover,
  SongCard,
  MindMap,
} satisfies MarkdownComponentRegistry
```

推荐 transform rules：

```ts
componentTransforms: [
  assetProp('SongCard', ['cover']),
  assetProp('LyricCard', ['album-cover']),
  assetProp('LyricCover', ['image', 'src', 'cover']),
  inferLyricCoverTextTone(),
]
```

## 7. 组件迁移策略

- 内容组件优先保留 Vue，并通过 `@astrojs/vue` 作为 islands 使用。
- 顶层 shell、layout、nav、sidebar、outline、reading mode、search、route transition 等 VitePress runtime 相关部分重写。
- 不在 P0 中把复杂 Vue 内容组件重写成 Solid 或 Astro 组件。
- 可保留的 Vue 内容组件包括 `LyricCard`、`LyricLine`、`LyricCover`、`SongCard`、`MindMap`、`CourseIndex`。
- 这些 Vue 组件必须移除 `vitepress` runtime 依赖，例如 `withBase`、`useData`、`useRoute`，改用迁移后的 runtime adapter。
- 后续如果某些组件确实需要重写，可以单独推进。

## 8. Astro Shell 与兼容层

- 第一版优先保持视觉和行为 parity，而不是追求 Astro-native class 命名。
- 关键 VitePress class 可以作为兼容 class 保留，例如 `.VPNavBar`、`.VPSidebar`、`.VPLocalNav`、`.VPDoc`、`.VPDoc .main`、`.VPDocAsideOutline`、`.vp-doc`、`.VPHero`、`.VPFeatures`。
- 允许第一版迁移并复用现有 CSS 文件，只做必要适配。
- 后续稳定后再进行 class 重命名和 CSS 架构清理。
- 目标架构是 `Astro shell + VitePress-compatible docs runtime`。

推荐目录方向：

```txt
src/config/
  site.ts
  docs-spaces.ts
  markdown-components.ts

src/lib/routing/
  vitepressPaths.ts

src/lib/markdown/
  renderMarkdown.ts
  componentRegistry.ts
  componentParser.ts
  componentTransforms.ts
  math.ts
  containers.ts
  outline.ts

src/lib/content/
  loadDocs.ts
  docMeta.ts

src/layouts/
  BaseLayout.astro
  HomeLayout.astro
  DocLayout.astro

src/components/
  shell/
  vue/
```

## 9. 页面过渡与 SPA-like 行为

- 不实现完整 client-side router SPA。
- 使用静态页面 + client-side navigation / View Transition 的 SPA-like 体验。
- 重点是保留页面切换过渡动画，而不是构建完整 CSR 数据路由。
- 如果 Astro 自带 View Transitions 生命周期足够，则优先使用。
- 如果 Astro 生命周期无法精确控制 sidebar / outline / class 切换时机，则实现薄层自定义 navigation controller。

必须保留：

- root 淡入淡出。
- doc content 横向短距离淡入。
- sidebar 切换时的左侧淡入淡出。
- 首页和文档页之间的过渡语义。
- prefers-reduced-motion 下禁用或弱化动画。

## 10. Sidebar 当前项衬底动画

必须保留左侧 sidebar 当前 lecture 链接背后的蓝色圆角矩形衬底动画。

当前对应行为：

- DOM：`.sidebar-active-indicator`
- 当前链接标记：`.VPSidebar .link[data-sidebar-current="true"]`
- 同一 docs space 内切换时，矩形从旧链接连续滑动到新链接。
- 跨 docs space 切换时，不跨 sidebar 滑动，而是随 sidebar 面板淡出淡入后重新定位。
- sidebar 首次加载时，矩形直接出现在当前链接背后，不从顶部飞入。
- sidebar 分组折叠 / 展开时，矩形重新计算位置。
- 字体加载完成或窗口 resize 后，矩形重新计算位置。
- reduced motion 下禁用或弱化滑动。

## 11. 公式渲染

- 使用 KaTeX。
- 使用 `remark-math` + `rehype-katex`。
- 接受和当前 MathJax 4 SVG 输出的轻微视觉差异。
- 目标是整体版面一致、工程课程常用公式正确渲染。
- 迁移现有 `TEX_MACROS`。
- 遇到 KaTeX 不支持的命令时，优先通过宏或配置补齐。
- 不优先回退到 MathJax。
- display 公式需要居中。
- 移动端 display 公式需要可横向滚动。
- 行内公式不能破坏中文行高。

## 12. 搜索

- 搜索能力不能退化。
- 不要求搜索框 UI 与 VitePress 完全一致。
- UI 需要保持毛玻璃、圆角、当前站点视觉风格。
- 复刻 VitePress local search 的核心机制。
- 构建期扫描 Markdown 并生成 MiniSearch index。
- 按 heading section 建索引，而不是只按整页建索引。
- 字段保持类似 VitePress：`title`、`titles`、`text`。
- 搜索选项默认接近 VitePress：`fuzzy: 0.2`、`prefix: true`、`boost: { title: 4, text: 2, titles: 1 }`。
- 支持 `frontmatter.search: false` 排除页面。
- 客户端懒加载 `minisearch` 和搜索 index。
- 结果显示页面标题、heading 层级和正文摘要。
- 命中高亮可以自写或使用轻量库。

## 13. 首页

- 第一版完整复刻当前首页效果，不借迁移机会改版。
- 保留 hero 渐变标题。
- 保留 tagline。
- 保留随机 hero image pool。
- 保留 hero image hover tooltip。
- 保留 `HomeCourseActions` 课程入口按钮组效果。
- 保留 `HeroHitokoto`。
- 保留 feature card 视觉。
- 保留桌面端 nav 首载淡入。
- 移动端首页允许修复布局问题，但必须保持整体视觉语言一致。

## 14. 毛玻璃与 Surface 系统

- P0 目标是稳定、真实、兼容的 frosted glass。
- P0 不使用 SVG filter 液态玻璃。
- 当前 SVG filter 液态玻璃在 Firefox 和 Safari 上不可用，不进入 P0。
- P0 使用 `backdrop-filter` / `-webkit-backdrop-filter`、半透明 tint、border、shadow、radius、必要时 saturation。
- Gecko / Safari 必须有稳定 fallback。
- 第一版不重新引入明显方向性高光和反射层。
- 所有导航、浮动按钮、菜单、搜索、移动端控制面板都使用统一 `FrostedSurface` token 和 class。
- P0 需要预留 P1 liquid upgrade 层，例如 pseudo-layer 和 token，但默认不启用复杂高光 / SVG filter。

推荐 P0 token：

```css
--surface-tint
--surface-border
--surface-blur
--surface-shadow
--surface-radius
--surface-saturation
```

可预留 P1 token：

```css
--surface-highlight
--surface-inner-shadow
--surface-refraction
--surface-specular-opacity
--surface-edge-light
```

## 15. 暗色模式

- 保留暗色模式。
- 桌面端保留当前点击切换时的圆形 View Transition 风格。
- 初始主题从 localStorage / system preference 读取，避免闪烁。
- 如果 Gecko / Zen 下原生 View Transition 与实时 `backdrop-filter` 冲突，优先保证毛玻璃实时有效。
- Gecko / Zen 可以使用自定义 clip / fade overlay 近似替代原生 root View Transition。
- 暗色切换期间不应出现导航和菜单毛玻璃消失后动画结束才恢复的问题。

## 16. 桌面导航与菜单

- 桌面端优先复刻当前 VitePress 风格。
- 保留顶部 nav 的 frosted / rounded / floating 视觉。
- 保留 nav dropdown 动画。
- 修复当前 Zen / Gecko 下“第三学年”等悬停菜单毛玻璃不存在的问题。
- 菜单的 blur layer 应与内容层、滚动层拆分，避免 `backdrop-filter + overflow + transform` 组合导致 Gecko 失效。

## 17. 移动端

- 移动端不是简单复刻当前 VitePress mobile nav，而是需要重做。
- 当前移动端按钮挨太近、Firefox 动画和毛玻璃不稳定，需要作为迁移目标修复。
- 移动端视觉应和桌面端 frosted / floating surface 更统一。
- 顶部不再使用旧 VitePress 上栏毛玻璃挤压布局。
- 使用浮动按钮 / floating glass control cluster。
- 搜索按钮、菜单按钮、返回顶部、搜索弹窗、课程目录抽屉等移动端浮动控件都统一使用 frosted / floating surface 风格。
- 移动端菜单可以重做为全屏或半屏 frosted panel。
- 移动端动画优先保证正确性和毛玻璃稳定性，不强求所有桌面动效。
- 移动端不实现阅读模式。

## 18. 阅读模式

- 桌面端保留纯净阅读模式。
- 移动端不做阅读模式。
- 桌面文章页可以隐藏 nav、sidebar、aside。
- 桌面端保留鼠标热区唤出行为。
- 保留 `readingMode: false` frontmatter。
- 首页不进入阅读模式，只给反馈。

## 19. Giscus

- 保留 Giscus 评论。
- 首页不显示。
- 文档页显示。
- 第一版 course-index README 也按文档页处理，除非后续明确隐藏。
- 需要保持暗色模式联动。
- SPA-like navigation 后需要重新加载或更新 Giscus route，避免评论对应旧页面。

## 20. PDF / Print

- 高质量 PDF 导出不是 P0。
- P0 保留 DocMeta 中的 PDF / 打印按钮入口。
- 按钮可以先调用 `window.print()`。
- 可迁移现有 print CSS 中确定有效的部分。
- 全站高保真 PDF 导出后续更适合用 Playwright 专门实现。

## 21. 部署与包管理

- 使用 pnpm。
- 部署目标是 GitHub Pages 静态站。
- Astro 构建输出为静态资源。
- GitHub Actions 需要改为 pnpm install 和 Astro build。
- 当前缩略图生成依赖 ImageMagick / webp 工具，迁移时可以继续保留，除非后续改成其他图像处理方案。

## 22. Changelog

- 保留现有 changelog。
- 迁移过程中新增重要阶段性变更时继续更新 changelog。
- 不在 P0 中要求重新整理历史 changelog 结构。

## 23. P0 验收页面

第一版 P0 parity 以以下页面作为代表验收集：

- `/`
- `/Y3S2/CCD/CCD-README`
- `/Y3S2/EMFT/EMFT Chapter 3 P II`
- CCD 任一使用 `LyricCover` 的 lecture 页面
- `/others/songs/string-theocracy`
- `/others/lab/mindmap` 或 EPMF Mindmap 页面
- `/early/CAD/`
- 404 页面，如实现中存在

这些页面通过后，再进行全站链接、边缘 Markdown 语法和样式补齐。

## 24. P0 实施阶段

### Phase 1: Astro 基础骨架

- 引入 Astro、Vue integration、remark / rehype / KaTeX、MiniSearch 等依赖。
- 建立 `src/config`、`src/lib`、`src/layouts`、`src/components` 基础结构。
- 保留 `docs/` 作为内容源。
- 建立 VitePress-compatible route resolver。
- 让首页和至少一个文档页可渲染。

### Phase 2: Markdown Runtime

- 实现 remark / rehype 管线。
- 实现自定义容器。
- 实现 KaTeX。
- 实现 component registry 和 parser。
- 实现组件 asset prop transform。
- 实现 heading outline、doc meta、word count、lastUpdated。
- 实现 VitePress-compatible Markdown link resolver。

### Phase 3: Layout 与视觉迁移

- 迁移全局 CSS 和 surface tokens。
- 实现桌面 nav、sidebar、outline、doc layout。
- 保留关键 VitePress 兼容 class。
- 实现首页 parity。
- 实现 CourseIndex、Lyric、Song、MindMap 组件运行。

### Phase 4: Navigation 与动画

- 实现 SPA-like client navigation / View Transition。
- 实现 sidebar active indicator。
- 实现 sidebar same-space / switch-space / hide-space 动画。
- 实现 outline hash jump 动画。
- 实现 dark mode 动画和 Gecko fallback。

### Phase 5: Search / Giscus / Reading Mode

- 实现 MiniSearch 构建期索引。
- 实现搜索 UI。
- 实现 Giscus 文档页评论和主题联动。
- 实现桌面阅读模式。
- 保留 PDF / print 按钮。

### Phase 6: Mobile Redesign

- 重做移动端 floating controls。
- 重做移动端 menu / search / course directory panel。
- 修复移动端 Firefox / Zen 动画和毛玻璃问题。
- 验证公式、表格、图片、CourseIndex、SongCard、LyricCover 不溢出。

### Phase 7: Cleanup

- 移除或归档旧 VitePress 实现。
- 清理不再使用的脚本、CSS 和依赖。
- 整理 README、AGENTS 指引、GitHub Actions。

## 25. 明确非目标

- P0 不使用 Starlight。
- P0 不使用 MDX。
- P0 不实现完整 client-side router SPA。
- P0 不把复杂 Vue 内容组件全部重写成 Solid 或 Astro。
- P0 不做 SVG filter 液态玻璃。
- P0 不做高质量全站 PDF 导出。
- P0 不追求 Astro-native class 命名清洁度。

## 26. 主要风险

- Markdown 组件解析需要足够接近 Vue-in-Markdown 行为，但不能执行任意 JS。
- VitePress-compatible 链接解析是核心风险，必须有测试覆盖。
- Gecko / Safari 的 `backdrop-filter` 与 transform / overflow / View Transition 组合存在兼容风险。
- KaTeX 可能不支持个别 MathJax 命令，需要扫描和补宏。
- Giscus 在 client navigation 后可能需要手动刷新 route。
- 旧 CSS 依赖 VitePress DOM，第一版保留兼容 class 可以降低风险，但后续清理需要单独计划。

## 27. 建议测试覆盖

- VitePress-compatible 路径解析测试。
- Markdown link resolver 测试，覆盖 `./`、`../`、`.md`、空格、中文、hash、query。
- Markdown component parser 测试，覆盖静态 props、`:groups`、嵌套组件、HTML 代码块不误解析。
- 自定义容器渲染测试。
- KaTeX 宏兼容测试。
- CourseIndex asset / preview 测试。
- Search index sectioning 测试。
- Sidebar active indicator DOM contract 测试。
- Reading mode desktop-only 测试。
- Frosted surface contract 测试。
- P0 页面截图或 Playwright smoke test。
