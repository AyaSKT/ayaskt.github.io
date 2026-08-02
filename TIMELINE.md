# 时间线维护指南

本文说明 `/timeline` 的数据来源、自动生成流程，以及添加和维护时间线时需要修改的位置。时间线不是普通 Markdown 正文页，但 `docs/timeline.md` 是它的内容配置入口：页面标题、课程名、卡片标题、描述、封面、图片焦点和配色都在该文件中维护。Vue 组件只保留布局、抽屉和动画逻辑。

## 文件结构

| 文件 | 用途 |
| --- | --- |
| `docs/timeline.md` | 时间线路由与所有可编辑的页面、卡片展示参数。 |
| `docs/.vitepress/theme/components/TimelinePage.vue` | 页面结构、卡片、抽屉、响应式布局、动画与 Nord 样式；不保存卡片内容。 |
| `scripts/generate-timeline-covers.mjs` | 读取 `timeline.md` 配置，扫描笔记、计算日期、按月分组、处理封面并生成时间线数据。 |
| `docs/.vitepress/theme/generated/timeline-entries.json` | 自动生成的时间线数据，不应手工修改。 |
| `docs/public/timeline-covers/` | 自动生成的 16:9 渐隐 WebP，不应手工修改。 |
| `scripts/timeline-covers/source/timeline-cover.jpg` | 有视觉信息但找不到自身封面时使用的通用兜底图。 |
| `docs/.vitepress/config.mts` | 顶部导航中的“时间线”入口。 |
| `docs/.vitepress/theme/index.ts` | 全局注册 `TimelinePage`。 |

`package.json` 中的 `timeline:covers` 负责单独生成时间线资源；它已经接入 `docs:assets`，因此 `npm run docs:dev` 和 `npm run docs:build` 都会先自动刷新时间线。

## 在 timeline.md 中修改卡片

`timeline.entries` 中每项对应“同一门课程 + 同一个月份”的一张卡片。`key` 必须写成 `课程目录名::YYYY.MM`，例如：

```yaml
timeline:
  entries:
    - key: 'EPMF::2026.05'
      course: '工程项目管理与财务 EPM&F'
      title: 'Block 1 - 3'
      description: '落花风里，春意渐行渐远。'
      cover: 'Y3S2/EPMF/Block 2/Lecture 5.attachments/1779869861405.PNG'
      imageAlt: '工程项目管理与财务 EPM&F 2026年05月笔记封面'
      imagePosition: center
      accent: rose
```

- `course`、`title`、`description` 是卡片上直接显示的文字。
- `cover` 是相对于 `docs/` 的原图路径。编译时会自动生成 16:9 高斯渐隐 PNG；设为 `''` 时卡片不渲染也不预留封面。
- `imageAlt` 是封面替代文本；纯装饰图可设为空字符串。
- `imagePosition` 会传给 `object-position`，可写 `center`、`left center`、`50% 30%` 等。
- `accent` 控制单张卡片颜色。可用值为 `cyan`、`blue`、`purple`、`green`、`frost`、`indigo`、`rose`、`amber`、`teal`。
- 可选 `noteMeta` 可以覆盖抽屉顶部的“课程 · 月份 · 笔记数”；不写时由生成器自动计算。
- 同一月份的卡片顺序取 `entries` 中的先后顺序。`timeline.dateAccents` 单独控制月份日期和节点颜色。

页面主标题使用 frontmatter 的 `title`；`timeline.kicker` 和 `timeline.ariaLabel` 分别控制顶部小标题和时间线区域的无障碍标签。开发服务器运行时，保存 `docs/timeline.md` 会自动重生成数据与封面并刷新页面；未启动开发服务器时可手动运行 `npm run timeline:covers`。配置中的封面不存在、颜色名无效或 key 重复时，生成器会直接报错，避免悄悄生成错误页面。

## 添加一篇笔记到时间线

通常不需要手工添加时间线条目，只需新增或修改课程笔记：

1. 将 Markdown 文件放在 `docs/Y数字S数字/课程目录/` 下；旧课程 CAD、EP 也会从 `docs/early/CAD/`、`docs/early/EP/` 扫描。
2. 如果月份必须固定，在 frontmatter 中设置 `lastUpdated`。未锁定日期时，生成器优先使用该文件最近一次 Git 提交时间，尚未提交的新文件使用文件修改时间。
3. 首次生成后，在 `docs/timeline.md` 中为新出现的 `课程::月份` 分组补充展示配置。没有配置时生成器仍会用课程目录名、自动标题、笔记首图和笔记短句作为安全回退。
4. 执行 `npm run timeline:covers`，检查输出的分组数、笔记数、未匹配配置和缺失封面提示，再打开 `/timeline` 查看效果。

课程 README、`index.md`、附件目录和资源目录会被自动忽略。日期早于 2026 年的普通课程不会进入时间线；`AIML`、`CAD`、`CPS_N`、`EP` 是为了保留旧课程而设置的例外。

## 月份分组和卡片标题

生成器以“课程 + 月份”为最大分组层级。同一门课程在同一个月内的多篇笔记只生成一张卡片，展开抽屉后才显示全部笔记链接。

- `Lecture`、`Chapter`、`Review`、`Block` 等带连续编号的标题会自动归纳为 `Lecture 1 - 5` 形式。
- 组内笔记按系列编号优先排序，其次按日期和标题排序。
- 未配置的新分组默认使用排序后第一篇笔记的封面与描述。
- 若某个月需要指定另一篇代表笔记，直接修改 `docs/timeline.md` 中该分组的 `cover` 和 `description`。当前 2026 年 5 月 EPM&F 使用 Lecture 5，也是在这里声明，不需要修改生成脚本。

修改课程显示名时编辑 `docs/timeline.md` 中的 `course`。不要修改生成的 JSON，也不要把卡片内容写回 Vue 组件。

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

封面统一输出为 640 × 360 的透明 PNG。源图优先使用 `docs/timeline.md` 中的 `cover`；仅当新分组尚未配置时才自动读取笔记封面。处理流程是：

1. 将源图旋转校正并裁切为 16:9；
2. 生成同尺寸高斯模糊图；
3. 从右侧开始逐像素混合清晰图与模糊图；
4. 再将右侧透明度平滑降到零，使图片自然隐入卡片背景。

渐变参数位于脚本顶部：`blurStart`、`blurEnd`、`alphaStart`、`blurRadius`。调整后重新运行生成命令即可；脚本会依据源图和脚本修改时间刷新产物，并清理不再被引用的 `-faded.webp`。

不要在 CSS 中叠加一层强模糊遮罩，也不要手工编辑生成 PNG，否则下一次开发或构建会覆盖这些改动。

## 页面样式与交互

页面样式全部位于 `TimelinePage.vue`。修改时应保持以下约束：

- 页面整体居中，但时间线内容在容器内靠左组织；除 navbar 外不显示 sidebar、目录或其他文档组件。
- 日期精确到月份，年与月上下排列且没有中间圆点；月份大于年份并加粗。
- 同一月份只显示第一次出现的日期，同月所有节点使用相同的 `dateAccent`。
- `timeline.entries[].accent` 控制单张卡片配色，`timeline.dateAccents` 控制日期和节点配色，两者不要混用。
- 卡片标题区域高度一致；长标题通过密度 class 缩小字体并允许多行，不应挤高卡片。
- 抽屉最大层级是单篇笔记链接；点击卡片只展开或收起，不应让整张卡片淡出。

竖屏响应式布局还有三条硬约束：

- `440px` 及以下，月份日期必须作为时间线网格中的独立一行放在卡片上方，不要放入卡片文字区；否则日期会挤掉标题和展开按钮。
- `760px` 及以下，有封面卡片使用至少 142.222px 宽、80px 高的 16:9 封面区域，避免卡片随窄屏继续缩矮。
- 卡片容器宽度不超过 639px 时隐藏描述，只保留课程名、等高标题和展开按钮；这里使用 container query，不应改成与页面宽度强绑定的断点。

时间线动效由 `TimelinePage.vue` 与 `PageTransition.vue` 协作：首屏节点在页面过渡完成后从上到下逐级展开，尚未进入视口的节点由 `IntersectionObserver` 监听，滚动出现时从右侧滑入；离开页面前，可见节点从下到上逐级收起，再继续全站 View Transition。时长必须通过 `--dur-timeline-enter`、`--dur-timeline-exit`、`--dur-timeline-stagger` 和 `--dur-timeline-exit-timeout` 调整，不要在组件中写裸时间。`prefers-reduced-motion: reduce` 下必须直接显示内容并跳过路由等待。

需要增加一种全新的颜色名称时，才需要同时更新生成脚本的 `accentOrder`、JSON 类型对应值以及 `TimelinePage.vue` 中相应颜色 class；仅调整现有月份或卡片颜色时，修改 `docs/timeline.md` 即可。

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
