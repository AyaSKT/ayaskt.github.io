# 时间线维护指南

本文说明 `/timeline` 的数据来源、自动生成流程，以及添加和维护时间线时需要修改的位置。时间线不是普通 Markdown 正文页：`docs/timeline.md` 只负责指定自定义布局，实际内容由 Vue 组件和编译期生成的数据提供。

## 文件结构

| 文件 | 用途 |
| --- | --- |
| `docs/timeline.md` | 时间线路由入口，使用 `TimelinePage` 布局。 |
| `docs/.vitepress/theme/components/TimelinePage.vue` | 页面结构、卡片、抽屉、响应式布局与 Nord 样式。 |
| `scripts/generate-timeline-covers.mjs` | 扫描笔记、计算日期、按月分组、提取描述、处理封面并生成时间线数据。 |
| `docs/.vitepress/theme/generated/timeline-entries.json` | 自动生成的时间线数据，不应手工修改。 |
| `docs/public/timeline-covers/` | 自动生成的 16:9 渐隐 PNG，不应手工修改。 |
| `scripts/timeline-covers/source/timeline-cover.jpg` | 有视觉信息但找不到自身封面时使用的通用兜底图。 |
| `docs/.vitepress/config.mts` | 顶部导航中的“时间线”入口。 |
| `docs/.vitepress/theme/index.ts` | 全局注册 `TimelinePage`。 |

`package.json` 中的 `timeline:covers` 负责单独生成时间线资源；它已经接入 `docs:assets`，因此 `npm run docs:dev` 和 `npm run docs:build` 都会先自动刷新时间线。

## 添加一篇笔记到时间线

通常不需要手工添加时间线条目，只需新增或修改课程笔记：

1. 将 Markdown 文件放在 `docs/Y数字S数字/课程目录/` 下；旧课程 CAD、EP 也会从 `docs/early/CAD/`、`docs/early/EP/` 扫描。
2. 如果月份必须固定，在 frontmatter 中设置 `lastUpdated`。未锁定日期时，生成器优先使用该文件最近一次 Git 提交时间，尚未提交的新文件使用文件修改时间。
3. 如需封面，在笔记自身加入 `LyricCover` 封面，或至少加入一张 Markdown 图片。生成器优先取笔记自己的首个 `LyricCover` 图片，其次取正文首图，不读取课程 README 的封面。
4. 如需卡片短句，在笔记自身加入简短 `LyricLine` 或题记。外语歌词只取 `translation`，中文歌词取 `original`；请继续遵守项目对版权歌词摘录长度的限制。
5. 执行 `npm run timeline:covers`，检查输出的分组数、笔记数和缺失封面提示，再打开 `/timeline` 查看效果。

课程 README、`index.md`、附件目录和资源目录会被自动忽略。日期早于 2026 年的普通课程不会进入时间线；`AIML`、`CAD`、`CPS_N`、`EP` 是为了保留旧课程而设置的例外。

## 月份分组和卡片标题

生成器以“课程 + 月份”为最大分组层级。同一门课程在同一个月内的多篇笔记只生成一张卡片，展开抽屉后才显示全部笔记链接。

- `Lecture`、`Chapter`、`Review`、`Block` 等带连续编号的标题会自动归纳为 `Lecture 1 - 5` 形式。
- 组内笔记按系列编号优先排序，其次按日期和标题排序。
- 卡片默认使用排序后第一篇笔记的封面与描述。
- 若某个月需要指定另一篇代表笔记，应在 `groupTimelineNotes()` 中添加明确的课程、月份和笔记路径覆盖。当前 2026 年 5 月 EPM&F 使用 Lecture 5，就是在这里处理。

修改课程显示名时编辑脚本顶部的 `courseLabels`。新增课程后如需特殊中文名称，也应在这里补充，不要在生成的 JSON 中改名。

## 日期与收录规则

日期解析和特殊收录规则集中在 `scripts/generate-timeline-covers.mjs`：

- `timestampOverrides`：按相对路径锁定单篇笔记的月份。当前 EMFT Chapter 2 固定在 2026 年 3 月。
- AIML 的特殊判断：当前将原属 2026 年 3 月的 Lecture 1–5 归入 2026 年 1 月。以后若只需覆盖少数明确文件，优先改为在 `timestampOverrides` 中逐项列出。
- `excludedSegments`：整门课程不进入时间线。当前为 ADC、MS。
- `noVisualCourses`：课程进入时间线，但不读取封面和歌词。当前为 AIML、CAD、CPS_N、EP。
- CPS 2026 年 3 月：当前在扫描阶段单独排除，其他月份的 CPS 不受影响。
- `earliestTimestamp`：普通课程的最早收录时间。

时间线只在页面上显示日期，不显示“锁定日期”字样。若调整锁定规则，数据中的 `locked` 可以继续保留给未来功能使用，但不要重新加入可见标签，除非设计需求明确改变。

## 无封面课程

`noVisualCourses` 中的课程会生成 `hasCover: false`：

- 页面不会渲染图片节点，也不会预留封面列；
- 标题直接贴近卡片左侧；
- 卡片使用独立的紧凑高度，右端无需与有封面卡片对齐；
- 展开/收起按钮和笔记抽屉仍必须保留。

维护 `TimelinePage.vue` 时，需分别检查有封面和无封面两种卡片，避免共享的宽高或溢出规则再次遮住描述和展开按钮。

## 封面生成流程

封面统一输出为 640 × 360 的透明 PNG。处理流程是：

1. 将源图旋转校正并裁切为 16:9；
2. 生成同尺寸高斯模糊图；
3. 从右侧开始逐像素混合清晰图与模糊图；
4. 再将右侧透明度平滑降到零，使图片自然隐入卡片背景。

渐变参数位于脚本顶部：`blurStart`、`blurEnd`、`alphaStart`、`blurRadius`。调整后重新运行生成命令即可；脚本会依据源图和脚本修改时间刷新产物，并清理不再被引用的 `-faded.png`。

不要在 CSS 中叠加一层强模糊遮罩，也不要手工编辑生成 PNG，否则下一次开发或构建会覆盖这些改动。

## 页面样式与交互

页面样式全部位于 `TimelinePage.vue`。修改时应保持以下约束：

- 页面整体居中，但时间线内容在容器内靠左组织；除 navbar 外不显示 sidebar、目录或其他文档组件。
- 日期精确到月份，年与月上下排列且没有中间圆点；月份大于年份并加粗。
- 同一月份只显示第一次出现的日期，同月所有节点使用相同的 `dateAccent`。
- `accent` 控制单张卡片配色，`dateAccent` 控制日期和节点配色，两者不要混用。
- 卡片标题区域高度一致；长标题通过密度 class 缩小字体并允许多行，不应挤高卡片。
- 抽屉最大层级是单篇笔记链接；点击卡片只展开或收起，不应让整张卡片淡出。

需要增加月份颜色时，同时更新生成脚本的 `accentOrder`、JSON 类型对应值以及 `TimelinePage.vue` 中相应颜色 class。

## 修改导航或重新创建页面

如果时间线入口被移除后需要重新添加：

1. 创建 `docs/timeline.md`，frontmatter 设置 `layout: TimelinePage`、`sidebar: false`、`outline: false` 和 `pageClass: timeline-layout`。
2. 在 `docs/.vitepress/theme/index.ts` 导入并注册 `TimelinePage`。
3. 在 `docs/.vitepress/config.mts` 的首页按钮右侧加入 `{ text: '时间线', link: '/timeline', activeMatch: '^/timeline(?:\\.html)?$' }`。
4. 确认 `package.json` 的 `docs:assets` 仍调用 `timeline:covers`。

## 发布前检查

```bash
npm run timeline:covers
npm run docs:build
git diff --check
```

生成后还应人工检查：同月日期是否只出现一次、同月节点颜色是否一致、封面右侧是否平滑隐入、无封面卡片是否保留展开按钮，以及抽屉中的每个笔记链接是否能正确跳转。
