# 更新日志

本文件记录项目每次版本更新中的新增、调整、修复与删减内容。

记录规则：
- 新版本写在最上方。
- 每个版本尽量包含：新增、调整、修复、删减。
- 如果某一类没有内容，写“暂无”即可。

整理说明：
- 本轮历史日志基于 `main` 分支中提交标题包含 `V数字` 的提交生成。
- 同名版本或重复版本号会保留为独立条目，并使用短 hash 区分。
- 条目中的统计来自对应 git commit 的 shortstat。

## V7.1.2 - 2026-11-04

### 新增

- ADC 新增十篇讲义：链路预算、信道编码与错误控制、双工、复用与多址、线路编码、无线接入网、解调与检测、误码性能、眼图与脉冲成形、信道均衡、正交频分复用。数字通信系统与传输介质两篇由占位扩写为完整正文。
- ADC 一至九讲顶部加入歌词封面，含曲名、演唱者、两行双语歌词和可点的音乐平台图标。悬停后封面转为毛玻璃，歌词浮出。
- ADC 课程总览页补齐 Lecture 01–09 与 11–15 的卡片目录，卡片标题与侧边栏一致，封面取讲义自身的首图。
- 时间线收录 ADC：新增 2026 年 11 月卡片「Lecture 1 - 9 / 11 - 15」，封面用第一讲的图，月份配色为琥珀色。首页「近期更新」同步出现这门课。

### 调整

- 课程卡片的缩略图改为扫描所有学年目录，第四学年的课程卡片不再回退到渐变占位。
- 时间线的课程排除名单只剩 MS，ADC 按普通课程规则参与收录。
- ADC 侧边栏补齐 1–9 与 11–15 全部讲义。原先唯一一条「1 数字通信」指向的是传输介质那篇。

### 修复

- 修复歌词封面未展开时被全局图片样式裁成圆角的问题，收起与展开状态现在均保持直角。
- 修复课程 README 页面缩略图与卡片边缘不贴合、圆角处露出底色的问题。图片改由卡片容器统一裁切，桌面顶部封面和手机左侧封面均贴合卡片轮廓。

### 删减

- 首页「近期更新」去掉笔记行与卡片上的密码锁图标，相关样式一并移除。

## V7.1.1 - 2026-10-18

**本次更新重做了时间线页面，给首页下半部分加上失焦入场，并让全站图片加载得更快。**

### 新增

- **全新的时间线页面**：沿用全站的点线与失焦风格。标题逐字浮现，抬头显示笔记的时间跨度；左侧轨道随页面滚动一点点被点亮，经过的节点会亮起并泛起一圈涟漪，当前所在的节点套上一圈缓慢旋转的点线环。每组更新的卡片由虚到实浮现，展开后笔记列表逐行出现。半羽化的封面图保留。
- **首页下半部分的失焦入场**：「近期更新」等区块滚动到眼前时，由模糊逐渐变清晰地浮现。
- **图片自动压缩**：网站发布时，所有笔记插图和页面图片都会自动转换成更小的 WebP 格式，图片总体积减少约八成，打开页面更快；画质肉眼几乎看不出差别。

### 调整

- 时间线卡片在手机上排版更紧凑，没有封面的卡片不再留出大片空白。
- 本地预览网站时不再需要联网下载字体，断网也能启动。

### 修复

暂无。

### 删减

- 时间线抬头去掉了「组更新」「篇笔记」两项统计数字和各项小标题，只保留时间跨度。

## V7.1 - 2026-10-17

**本次更新把首页的点线「绘图纸」风格延伸到全站文档页**，并重做文档之间的切换动画、评论区外观和首页学年面板。

### 新增

- **文档页点线风格**：页面顶部加入刻度尺，二级、三级标题挂上轨道节点与短虚线，正文两侧铺上淡淡的点阵和十字套准标记；文档信息、代码块、例题、右侧目录、课程目录页、阅读进度条和返回顶部按钮都换上同一套点线语言。
- **文档页入场与离场动画**：首次打开时刻线描出、节点就位、目录轨道逐颗亮起；首屏以下的装饰滚动到眼前时再画出来。离开文档回到首页时，刻线回缩、节点收拢。
- **文档之间的切换动画**：旧页面轻轻失焦淡出，新页面首屏内容逐块由虚到实浮现，点阵背景晚一拍出现；切换到另一门课程时左侧目录一起过渡，导航栏和侧栏外框保持不动。
- **评论区新外观**：Giscus 评论区改用站点的配色、字体、圆角和点线分隔，浅色与深色模式各有一套；评论逐条浮现，表情面板带回弹，加载时显示点线转圈。
- **首页学年面板的新动画**：点击圆盘后，面板从该圆盘的方向展开，一条点线把圆盘和面板连在一起；标题、分隔线和课程逐行浮现。被选中的圆盘换上主题色并套一圈缓慢旋转的点线环，其余学年暂时退后。

### 调整

- 文档切换动画先后调整了几轮，最终版更轻、更快，节奏比最快的版本稍慢一点。
- 学年面板重新排版：顶部是学期，下面左侧是学年名称，右侧是课程数；课程之间改用点线分隔，悬停时课程名变色、箭头右移。电脑上也能看到关闭按钮。
- 学年面板关闭时，内容会和面板一起淡出，不会再只剩一个空框慢慢消失。
- 手机上的学年面板改为从屏幕底部整块滑出，顶部加了拖动把手。
- 窄屏电脑和平板宽度下，学年面板会停在圆盘上方；课程较多放不下时，列表在面板内滚动。
- 首页「近期更新」悬停时不再放大封面图片。

### 修复

- 修复文档切换动画结束后，右侧目录突然跳动一下的问题。
- 修复切换课程时，左侧目录会重复播放一遍首次加载动画的问题。
- 修复窄屏电脑和平板宽度下，学年面板盖住圆盘、导致其他学年点不到的问题。
- 修复学年面板的连线末端缩进面板里面、末端圆点被挡住的问题。
- 修复很窄的手机上学年面板顶部的学期文字压到关闭按钮的问题。

### 删减

- 去掉学年面板、「近期更新」卡片和课程目录页分组标题上没有实际含义的 N-01、G-01 等编号。

## V7.0.1 - 2026-10-11

### 新增

- 首页主图新增轻微的鼠标反向跟随效果，移开鼠标后平滑归位，并支持系统「减少动态效果」偏好。

### 调整

- 首页学年与时间线圆盘中的汉字改为正体加粗，提升文字辨识度。

### 修复

- 修复首页主图入场动画结束时阴影突然变淡的问题。

### 删减

- 移除首页主图的悬浮放大动画。

## V7.0 Heavenly - 2026-10-10

**本次更新以首页（Homepage）全面重构为核心。** 相较 V6.12.1，首页采用全新的椭圆轨道主视觉，将课程入口、近期笔记、友情链接与站点信息组织成连续、统一的页面，并配套重新设计进出场与滚动动效。

### 新增

- **全新轨道首页**：主图置于左上方，椭圆弧从左下环绕到右上，学年与时间线入口沿弧排列；右下方以放大的「工作站」标题和描边 Ayaskt 建立视觉重心。宽幅主图采用羽化渐隐与柔和虚化边缘，点阵、刻点、虚线和静态刻度尺贯穿首页设计。
- **首页「01 近期更新」**：复用时间线最新四组笔记，以一张主卡和三张小卡展示封面、课程、讲次范围与更新日期；主卡提供最近笔记直达链接，「全部」入口连接完整时间线。
- **首页站点信息栏**：采用图纸标题栏式布局，集中展示作者、起始时间、最近更新、笔记数量、课程数量与许可协议，与「02 友情链接」共同补齐首页的内容层次。
- **首页专属动效**：进入时弧线描出、节点沿轨道就位、主图由虚变实展开、标题逐字升起；离开时节点收回、弧线回缩、主图合拢；从文档返回首页时以弧心光圈展开。近期更新、友情链接和站点信息在滚入视口时分别错峰入场，并支持系统「减少动态效果」偏好。

### 调整

- 统一首页居中版心、区块边缘、标题间距与留白；区块间距采用桌面 96px、手机 64px，Hero 与正文之间以点线刻度尺自然衔接。
- 重排首页手机与平板布局：低于 800px 时主图与圆弧在上、标题在下，主视觉随可用空间缩放；近期更新改为纵向布局，站点信息按宽度重排并允许长文字换行；学年课程面板在手机上采用带安全区留白的底部浮层。
- 代码块和代码组采用统一圆角与轻阴影，窄屏下与正文边缘对齐；例题改用统一圆角档位，并移除正文卡片的背景模糊。
- 补充圆角阶梯、阴影层级与首页动效令牌，更新 `CUSTOMIZATION.md` 中的 `homeHero` 配置和首页插槽说明；显式配置的首页图片优先于随机头像池。

### 修复

- 修复独立题干没有相邻解答时缺少底部边框、底部圆角不完整的问题。

### 删减

- 清理被现有主题样式覆盖的重复提示框与定义框规则，减少样式维护冲突。

## V6.12.1 - 2026-09-29

### 新增

- 暂无。

### 调整

- 768–899px 导航栏收紧按钮间距与菜单内边距；横屏时阅读模式按钮额外出现，再进一步收紧，避免搜索按钮贴住标题、按钮组溢出右边缘。
- 手机横屏（高度 ≤540px）首页头像改按视口高度限制尺寸，标题不再被挤出首屏。
- 窄屏（≤640px）歌曲卡片封面改为与文字顶部对齐，带播放器的高卡片不再上下各空出一大截。

### 修复

- 修复最窄布局下搜索按钮与汉堡图标紧贴在一起的问题，两者间留出 8px 间距。
- 修复中窄布局下外观切换胶囊内残留 VitePress 竖向分隔线与空白的问题：分隔线改为从 768px 起隐藏，外观切换恢复为 40px 圆形按钮。

### 删减

- 暂无。

## V6.12 - 2026-09-28

### 新增

- 亮色主题改为陶土橙强调色搭配暖灰文字：页面暖白 `#fffefd`、正文与导航标题暖黑 `#141413`，hero 渐变、链接、侧栏激活项与按钮统一为陶土橙；表格与代码块改为中性浅灰，卡片与例题底色固定为白色。夜间与语义容器仍保留 Nord。
- 首页头像改为四组亮 / 暗成对的角色图（`docs/public/avatars/`）：进入首页时随机选一组，切换主题只换成同一角色的另一版本，不再重新随机。
- 新增界面强调色通道 `--aya-c-ui-accent-rgb`，供搜索面板、导航胶囊、点击涟漪、课程卡片焦点环和歌曲卡片悬停光晕使用；默认沿用 `--aya-c-brand-blue-rgb`，亮色主题在 `custom/tokens.css` 中改为陶土橙。正文容器仍使用原品牌通道，不受影响。

### 调整

- 时间线页配色跟随站点令牌：主标题改用首页 hero 的渐变（亮色陶土橙、夜间 Frost 冷蓝），小标题、分隔线、时间轴和卡片边框改取品牌色；亮色下卡片改为白底、标题用暖黑，抽屉底色由 Nord 冷灰改为暖白，九种条目强调色换成偏暖的低饱和版本（`--timeline-warm-*`），夜间仍为 Nord。
- 思维导图分支色按主题分为亮色暖调与夜间 Nord 两套，切换主题时只重新着色、不重置缩放；夜间画布与弹窗底色由中性近黑改为从 Nord 背景派生；导出图片的背景和文字色改读当前主题变量。
- 顶部阅读进度条由写死的蓝紫渐变改用品牌渐变，回到顶部按钮的进度环由 VuePress 绿改用品牌色，课程卡片悬停光晕去掉残留的紫色 `#8839EF`，歌曲卡片播放器强调色不再混入蓝色，音量弹层底色改从主题背景派生。
- 正文插图改为直角，正文内嵌的课程卡片、时间线与音乐组件保留圆角；左侧目录窗口背景改为跟随页面底色。
- 重新生成时间线数据，刷新各笔记的更新时间。
- `TIMELINE.md` 补充时间线配色来源与亮色覆盖位置的说明。

### 修复

- 修复从暗色切换到亮色时短暂白屏的问题。圆形扩散动画使用 `fill: forwards` 且结束后未取消，上一次亮切暗留下的 `circle(0)` 会作用到下一次的旧快照上，使暗色画面一开始就被裁掉；现在动画结束后立即取消，并在 JS 动画挂上前用 CSS 先把亮色新快照收成一个点，避免首帧整页闪亮。
- 修复时间线抽屉笔记数为奇数时，末尾空格露出一整块分隔线底色的问题。

### 删减

- 暂无。

## V6.11.5 - 2026-08-02

### 新增

- 站点图标与品牌资源升级：`favicon.ico` 由 370KB 压至 15KB，新增 256px `site-logo.png` 与 `title-ayaskt-workspace.svg`；导航栏 logo 由 1MB 的 `IMG_4825_transparent.png` 改用 19KB 的 `site-logo.png`，favicon 引用带版本号以规避缓存。

### 调整

- 侧边栏分组展开/收起期间暂停活跃指示器的逐帧重算，改由动画收尾时同步、无过渡地一次性定位，指示器恢复显示时即已在终点。

### 修复

- 修复分组展开时滚动条在动画中途冒出来的问题。内容高度跨过「是否溢出」的分界会让滚动条提前出现，覆盖式滚动条还会额外淡入一次；现在动画起点若没有滚动条，整个过程会把它保持透明，滚动条只在内容定型后出现一次。做法是染色而非改 `overflow`，槽宽不变，动画期间照样可以滚动。
- 修复展开/收起结束瞬间活跃高亮胶囊从半路可见地滑回目标的问题。此前 `ResizeObserver` 在动画每一帧都改写指示器的过渡目标，260ms 的动画结束时它离目标仍有约 91×249px，随后要再花 370ms 才追上。
- 修复折叠包含当前页的分组后，活跃高亮胶囊按被隐藏条目的布局位置定位，从而盖到别的行上或跑出可视区的问题。分组收起时胶囊隐藏，重新展开后回到原位。
- 修复窄屏下活跃指示器留成静态块元素、在抽屉侧栏底部撑出一块空白的问题。浮动窗样式只在 960px 以上生效，指示器现在同步只在该档显示。
- 补齐两处降级路径：不支持 `:has()` 的浏览器（Firefox 121 之前）整套浮动窗样式都不生效，指示器随之保持隐藏，不再因缺少定位参照而乱飘；`prefers-reduced-motion: reduce` 下指示器不再有滑动过渡。

### 删减

- 暂无。

## V6.11.4 - 2026-08-02

### 新增

- 侧边栏指示器新增 `ResizeObserver` 兜底：Web 字体晚于 `document.fonts.ready` 生效导致条目重新折行时，活跃高亮会自动跟随，不再停在旧位置。
- 新增 `--aya-sidebar-pad-x` 令牌与运行时滚动条槽测量（写入 `--aya-sidebar-scrollbar`），左内边距自动扣掉槽宽，覆盖式与常驻滚动条两种环境下条目左右留白都相同。
- 新增 `scripts/download-fonts.mjs` 字体自托管流程：`docs:assets` 阶段从 Google Fonts 下载 Noto Sans/Serif SC 的 unicode-range 分片（202 个 woff2、约 12MB）并生成本地 `fonts.css`，不再运行时依赖 `fonts.googleapis.com`；CI 与本地构建自动执行，分片 URL 自带哈希、重复构建幂等。

### 调整

- 侧边栏浮窗改为「外层圆角窗体 + 内层滚动区」结构：`.VPSidebar` 只负责圆角、边框、阴影与毛玻璃，滚动条与内边距交给内层 `.nav`；移动端 `.VPNavScreen` 与 `.container` 同步拆分。
- 侧边栏左边缘改为对齐版心（新增 `--aya-sidebar-gutter` 令牌），与导航栏标题同一条竖线，并与右侧目录边距互为镜像；顶边与正文、右侧目录齐平。移除此前用来避让贴边的 `clamp()` 左侧间距。

### 修复

- 修复接入鼠标（macOS 显示常驻滚动条）时，侧边栏左侧两个圆角被渲染成直角的问题。Chromium 会在滚动容器带非覆盖式滚动条的一侧丢失圆角裁剪，拆分滚动容器后四角恢复正常。
- 修复侧边栏内无链接的分组标题（如「Block 1 …」）文字与折叠箭头比其它行外突 10px 的错位，现在所有条目左右都对齐同一条线。
- 修复侧边栏条目左右留白不等（左 42px / 右 22px）：VitePress 把 `.group` 宽度写死为 `--vp-sidebar-width - 64px`，与本主题的内边距对不上，在 `direction: rtl` 下整块靠右排、左侧空出一截。改为 `width: auto` 后条目宽度增加约 20px，长标题也少了一次折行。
- 活跃高亮胶囊取消 4px 左内缩（`--aya-sidebar-active-left-inset` 归零），左右留白改为一致。

### 删减

- 暂无。

## V6.11.0 - 2026-07-14

### 新增

- 新增独立 `/timeline` 时间线页面及顶部导航入口，以月份为单位汇总课程笔记；页面采用居中的 Nord 单栏布局，不显示侧栏、右侧大纲和文档目录。
- 新增课程月份卡片与笔记抽屉：同一课程同一月份合并为一张卡片，标题自动归纳为 `Lecture / Chapter / Block 起止编号`，展开后可查看并跳转本月全部笔记。
- 新增编译期时间线数据与封面流水线：根据锁定日期或 Git 最后修改时间生成条目，使用 Sharp 将笔记封面处理为 16:9、右侧渐模糊并透明的 PNG，并在资源构建阶段自动刷新。
- 新增时间线 Hitokoto 引言、九组 Nord 月份配色、同月节点统一配色，以及无封面课程的紧凑短卡片样式。
- 新增根目录 `TIMELINE.md` 维护指南，说明时间线的自动收录、月份分组、日期覆盖、封面生成、无封面课程和发布验证流程。
- 本地 Markdown 编辑器新增“新建笔记”流程，可浏览课程目录、生成带 `lastUpdated` 的初始页面，并按选择将新笔记写入对应 sidebar 分组。
- 本地编辑器新增 frontmatter 可视化面板、可扩展插入块注册表及参数对话框，覆盖例题、定义、歌词、封面歌词、歌曲卡片、思维导图与公式等常用结构。
- 本地编辑器新增内存草稿预览、编辑区与预览区双向滚动同步、实时预览开关，以及新建笔记、草稿、目录、元信息和 sidebar 的开发服务器接口。
- 新增 `Y4S1/ADC` Lecture 1 与 Lecture 2 笔记骨架，为后续高阶数字通信内容补全预留页面。

### 调整

- 时间线当前收录 19 个月度课程组、136 篇笔记；保留 `CPS_N / AIML / CAD / EP`，无封面课程不再预留图片列，并按内容宽度缩短卡片右端。
- AIML Lecture 1–5 固定归入 2026 年 1 月，EMFT Chapter 2 固定归入 2026 年 3 月；2026 年 5 月 EPM&F 卡片改用 Lecture 5 的封面与歌词。
- 时间线描述优先读取笔记自身歌词或题记，外语歌词仅展示翻译，不再读取课程 README 的封面和歌词。
- 调整本地编辑器操作入口、预览刷新与附件路径归一化逻辑，并扩充自动化测试覆盖草稿、frontmatter、sidebar 修改和插入块注册表。
- 调整资源生成顺序，在课程缩略图和摘要之后生成时间线封面；新增 Sharp 开发依赖，并将本地编辑器草稿缓存加入 `.gitignore`。
- 为首页课程品牌按钮补充 Nord 渐变起始色边框，使按钮边界在当前主题下保持清晰。

### 修复

- 修复时间线封面处理后整张图片均被高斯模糊的问题，改为逐像素混合清晰图与模糊图，仅在右侧渐变并淡出透明度。
- 修复时间线卡片描述被固定高度挤压、歌词只露出上半部分的问题，并恢复完整的展开/收起按钮和抽屉动画。
- 修复无封面卡片缩短后高度随容器宽度继续收缩、导致展开按钮消失的问题；无封面卡片现使用独立紧凑高度。
- 修复同一月份内时间线节点颜色不一致的问题，节点改为绑定月份色而非单张卡片强调色。
- 修复时间线卡片展开时淡出消失、重复月份日期重复显示、16:9 封面未覆盖卡片下边及导航栏后背景色断层等显示问题。

### 删减

- 暂时从时间线移除 ADC 与 MS 课程卡片，并移除 2026 年 3 月的旧 CPS 课程组；原始笔记文件不受影响。
- 移除时间线抽屉日期后的“锁定日期”文字，仅保留日期本身。
- 移除时间线对课程 README 封面、README 歌词和透明封面占位列的显示依赖。

## V6.10.0 - 2026-07-12

### 新增

- 新增用户自定义层 `theme/custom/`（tokens.css / components.ts / slots.ts / enhance.ts），分别提供设计令牌覆盖、markdown 全局组件注册、布局插槽挂载（含未占用插槽按名透传）与 enhanceApp 钩子，全部已接线且默认空实现。
- 新增 `theme/motion-tokens.ts`：`readMotionDuration` / `readMotionEasing` 让 JS 动画运行时读取 CSS 动效令牌。
- 新增 JS 动画令牌 `--dur-solution`、`--ease-solution`、`--dur-sidebar-collapse`、`--dur-sidebar-indicator`、`--dur-outline-out`、`--dur-outline-in`、`--ripple-size`（声明于 `var.css`，兜底值与原硬编码值一致）。
- 新增 frontmatter 开关：`comments: false`（评论）、`backToTop: false`（返回顶部）、`docMeta: false`（元信息栏）。
- 新增根目录 `CUSTOMIZATION.md` 自定义接口规范：令牌总表、插槽清单、View Transition 类名钩子、自定义事件、动画子集扩展流程与源码修改约定。
- 新增 `scripts/customization.test.mjs`（`npm run test:customization`）守护上述接口的接线。
- 新增 `scripts/generate-motion-css-subsets.mjs`，从 animate.css 与 AnimXYZ 全量文件中机械抽取主题实际用到的规则，生成本地子集（规则逐字节复制，动画表现与全量库一致）。
- 全站配色切换为 [Nord](https://www.nordtheme.com/docs/colors-and-palettes) 主题：品牌渐变改为 Frost 冷蓝（`#5e81ac → #81a1c1 → #88c0d0`），页面基础色改为 Snow Storm（浅色）/ Polar Night（深色），语义色（tip/warning/danger/important/definition）改用 Aurora。整套配色写在 `custom/tokens.css` 覆盖层，清空该文件即可回退默认柔和渐变。
- `var.css` 新增品牌色通道变量 `--aya-c-brand-blue/-rgb`、`--aya-c-brand-lilac/-rgb`、`--aya-c-brand-pink/-rgb`、`--aya-c-brand-blue-deep(-rgb)`、`--aya-c-brand-lilac-deep`。

### 调整

- 首屏 CSS 从全量 animate.css（72 KB）与 AnimXYZ（103 KB）切换为本地子集（约 6 KB 与 29 KB），构建产物 `style.css` 由 437 KB 降至 296 KB。
- Google Fonts 从 `index.css` 的 `@import` 迁移到 `config.mts` 的 `head` `<link>`，并新增 `preconnect` 预连接，避免 CSS 串行阻塞渲染。
- Solution 折叠动画合并为单套 Web Animations API 动画（opacity 并入关键帧），不再叠加 animate.css class；`.solution-content` 的 `will-change` 改为仅动画期间生效。
- 导航 flyout 菜单的 `will-change` 改为仅在 `xyz-in` / `xyz-out` 动画期间生效，菜单关闭时不再常驻合成层。
- 首页 hero 图 tooltip 的 `mousemove` 改为 `requestAnimationFrame` 节流，每帧最多读一次布局。
- Giscus 评论组件改为异步加载，不再打进首屏主 bundle。
- `solution-collapse.ts`、`sidebar-motion.ts`、`outline-jump-motion.ts` 中的硬编码动画时长/缓动改为读取上述令牌；侧栏活跃指示器 0.38s 与涟漪 200px 同步变量化。行为默认值不变。
- 将 `var.css`、`surface.css`、`sidebar-window.css`、`blur.css`、`transitions.css`、`index.css` 及 `HomeCourseActions`/`CourseIndex`/`SongCard` 组件中散落的品牌色字面量（`rgb(152 203 234)` 等）统一收敛为品牌通道变量，实现「一处覆盖、整站换肤」。行为与默认视觉不变。
- 左侧目录窗口背景改为纯色：浅色 `#E7E9ED`、深色 `#202530`（覆盖 `--aya-sidebar-bg`）。
- `verify-outline-motion` / `verify-sidebar-motion` / `verify-nav-menu-motion` 断言同步更新为子集导入路径。
- `CUSTOMIZATION.md` 补充品牌通道变量说明与整套换肤示例。

### 修复

- 修复首页进入笔记页时左侧目录「卡两下」的问题：真实 `.VPSidebar` 元素的 `fadeInLeft` 入场动画与 `::view-transition-new(sidebar)` 快照动画叠加、且起止时间错开，产生两次可见顿挫。新增 `vt-show-sidebar` 过渡类，View Transition 进场时真实元素跳过自身动画，仅由快照承担入场；硬加载与不支持 View Transitions 的浏览器不受影响。

### 删减

- 移除三个从未被内容使用的死代码组件：`ScrollReveal.vue`（全站无 `data-reveal`）、`update.vue`（已被 `DocMeta` 取代）、`Linkcard.vue`（注册为 `Mycomponent`，零使用），并清理相应注册与 `.reveal-hidden` / `.reveal-visible` 孤儿样式。
- 取消 git 对已被 `.gitignore` 覆盖的 `tmp/`（12 个 CCD 提取临时文件）与 `output/pdf/` 下 1 个 PDF 的跟踪（本地文件保留）。
- 删除根目录三张未被任何页面引用的图片（`chaoxing-ai-boundary-error.png`、`optical_transceiver_break_even.png`、`tower_crane_gantt.png`）。

## V6.9.2 - 2026-07-05

### 新增

- 为 IT Lecture 6-11 统一新增 `LyricCover` 页首歌词封面，覆盖 `Chinatown Blues`、`オレンジスケール`、`あの夏が飽和する。`、`空が盗まれた日`、`エガクミライ` 与 `海の見える街`。
- 为 IT Lecture 6-11 的歌词封面补充网易云音乐直达链接，并为日语歌词写入 ruby shorthand 注音，默认不展开注音显示。
- 为 IT Lecture 8 新增替换封面素材与缩略图，使 `あの夏が飽和する。` 封面歌词使用新的页面封面。

### 调整

- 将 IT Lecture 10 原先的 `海の見える街` 歌词封面迁移到 IT Lecture 11，并把 IT Lecture 10 更换为 MyGO!!!!! `エガクミライ`。
- 调整 IT Lecture 7 `オレンジスケール` 歌词排版，将四句歌词合并为两组 `LyricLine`，保持原文与译文成对展示。
- 简化第三学年顶部导航中的 IT 课程文案，从 `信息论基础 Information Theory` 调整为 `信息论基础 IT`。
- 刷新 IT 课程封面与课程预览生成缓存，使 Lecture 6-11 的歌词封面和 Lecture 8 新封面进入课程卡片索引。

### 修复

- 修复 IT Lecture 6 `LyricCover` 标签结构，避免歌词块因开始标签未闭合而无法正常渲染。

### 删减

- 移除 IT Lecture 7-11 中未确认的 QQ 音乐搜索页兜底链接，只保留已确认的音乐平台直达链接。

## V6.9.1 - 2026-07-04

### 新增

- 扩展 IT Lecture 2 `Discrete Information Source and Self-Information` 正文，补全离散信息源、离散随机变量、信息量、自信息、自信息性质、联合自信息与条件自信息等章节。
- 在 IT Lecture 2 中加入天气信源示意图、自信息性质图，以及 Barcelona / Liverpool 新闻自信息计算例题，并使用 `stem` / `solution` 容器放在章节末尾。
- 为 IT Lecture 3、Lecture 4、Lecture 5 新增 `LyricCover` 页首封面歌词与本地封面附件，分别接入熵、多符号平稳信源、Markov source 章节占位。
- 为 IT Lecture 6-11 补齐英文一级标题，覆盖 lossless source coding、mutual information、channel capacity、channel coding、continuous source/channel capacity 与 rate-distortion theory。

### 调整

- 为 IT Lecture 4 `Love 2000` 封面歌词补充日文 ruby shorthand 注音，并默认展开注音显示。
- 刷新 IT 课程封面与课程预览生成缓存，使 Lecture 2 正文摘要、Lecture 3-5 封面图和 Lecture 6-11 标题预览进入课程卡片。
- 清理 IT Lecture 3、Lecture 5 末尾多余空白，并统一新增 IT 占位页的 Markdown 结构。

### 修复

- 修正 IT Lecture 2 中“消息携带的信息信息”的重复用词。
- 修复 IT Lecture 3、Lecture 5 的行尾空格和 EOF 空行，保证 `git diff --check` 通过。

### 删减

- 暂无

## V6.9 - 2026-07-04

### 新增

- 新增 Y3S1 `信息论基础 IT` 课程入口，并接入首页第三学年课程区、顶部导航、课程侧栏与目录级 `activeMatch`。
- 新增 IT 课程首页，使用 `LyricCard` 引言、课程封面附件与 `CourseIndex` 课程卡片，覆盖 Lecture 2-11 的中文标题、英文 subtitle 与页面链接。
- 新增 IT Lecture 2 `Discrete Information Source and Self-Information` 初始页面，使用 `LyricCover` 封面歌词和本地封面图，并生成对应课程封面缓存。
- 新增 IT Lecture 3-11 空白占位页面，方便后续逐讲补全内容，同时刷新课程预览缓存。

### 调整

- 调整第三学年首页文案，将 `通信原理与系统（新） CPS` 简化为 `通信原理与系统 CPS`，并新增 `信息论基础 IT` 入口。
- 调整 IT 课程首页歌词块的日语语种标记与 ruby shorthand 注音，并保留两句中文译文作为短引言。
- 调整 IT sidebar，从课程首页到 Lecture 2-11 均使用真实课程题名链接，保持课程目录可直接跳转。
- 调整 DSP sidebar 展示文案，去掉 `Block` / `Ch` 条目中的冒号和重复前缀，让章节编号与标题更简洁。
- 为 Y3S2 DSP README 与 Chapter 7-11 补充 `lastUpdated` frontmatter，锁定上传日期，避免后续提交刷新显示时间。
- 将本地 `output/` 目录加入 `.gitignore`，避免导出产物进入工作树噪音。

### 修复

- 补齐 Y3S2 全部 Markdown 笔记的 `lastUpdated` 覆盖，使第三学年第二学期课程的显示日期不再依赖后续 git fallback。
- 刷新 `course-covers.json` 与 `course-previews.json`，使 IT Lecture 2 封面与 IT 占位页面预览在课程卡片中可用。

### 删减

- 暂无

## V6.8.1 - 2026-06-26

### 新增

- 为 `stem` / `solution` 例题容器新增独立毛玻璃表面 token，统一浅色与深色模式下的背景、边框、分隔线、阴影和羽化效果。
- 为答案折叠交互新增高度过渡、淡入淡出、轻微位移与模糊动画，并补充 `aria-expanded` 状态和 reduced motion 兜底。
- 为 EMFT Chapter 8 Part I / Part II 追加“平面波参数列表”和“法向入射参数列表”，把阻抗、波数、传播常数、反射/透射系数、驻波比、能流等易混参数集中整理。
- 为 DSP 课程首页新增 `LyricCard` 引言与本地封面素材，并为 CCD Review 4 补充页面封面图与课程封面缓存入口。

### 调整

- 将 EMFT Chapter 3 P II、Chapter 4、Chapter 5 中的例题结构从外层 `example` 包裹调整为直接暴露 `stem` / `solution`，保留原题目标题并迁移到 `stem` 标签。
- 调整 `stem` / `solution` 的卡面间距、圆角、分隔方式与移动端 padding，使题干和答案在没有外层 `example` 容器时仍保持完整的例题块视觉层级。
- 放慢 `solution` 展开/收起动画时长至 0.56s，使答案内容的高度展开、淡入淡出与模糊过渡更从容。
- 为 EMFT Chapter 2 与 EMFT README 补充 `lastUpdated` frontmatter，锁定显示日期，避免后续提交改写页面更新时间。
- 调整 Y4S1 `IS` 与 `MC` 课程首页歌词译文，去掉译文开头多余的中文引号。

### 修复

- 修复答案折叠按钮只改文字、不同步无障碍展开状态的问题。
- 修复 `stem` / `solution` 脱离 `example` 外层后缺少独立表面和连续块边界的问题。

### 删减

- 移除 EMFT 笔记中所有外层 `example` 容器，避免题干和答案被额外容器套住。

## V6.8 - 2026-06-24

### 新增

- 新增第四学年 Y4S1 课程入口：`移动通信 MC`、`高阶数字通信 ADC`、`信息安全 IS`，三门课程各自具备课程首页、课程编号标题与 `LyricCard` 引言块。
- 为 Y4S1 三门课程新增本地封面图片附件，使课程首页引言块可以直接引用对应封面素材。
- 在顶部导航与侧栏中接入第四学年三门课程，并为 `MC`、`ADC`、`IS` 配置课程目录级 `activeMatch`，方便后续嵌套笔记保持高亮与侧栏上下文。

### 调整

- 将首页第四学年区域从占位状态调整为真实课程卡片，并把第三学年区域视觉样式切换为次级展示，让新学年入口成为首页当前主入口。
- 统一 EMFT 课程首页标题格式，改为中文名、英文名与课程代码并列的课程索引标题，保持与其他课程 README 的版式一致。
- 为 CCD 课程首页与 Rev 1-4 复习页补充 `lastUpdated` frontmatter，锁定课程索引与文档元信息中的更新时间显示。
- 扩展 CCD Lecture 14 `Frequency Modulation and Phase Modulation` 的 FM 产生与解调总表，按步骤整理 Direct FM、Varactor FM、VCXO / 晶体拉频、Indirect FM、倍频链、Slope Detector、Pulse-Averaging Detector 与 Quadrature Detector。

### 修复

- 补齐第四学年课程导航的 sidebar prefix 与父级高亮规则，避免新增课程页面进入后缺少侧栏或顶部菜单高亮。
- 修正 EMFT 课程首页旧标题与当前课程首页标题规范不一致的问题。

### 删减

- 移除首页第四学年 `敬请期待` 占位文案，替换为三门 Y4S1 课程的实际入口。

## V6.7.5 - 2026-06-24

### 新增

- 新增 CCD `Rev 4 概念总整理`，按通信系统、半导体与二极管、晶体管与放大器、RF building blocks、调制/解调、天线、PLL、RF receivers、DAC / ADC 与转换误差整理全课程概念索引。
- 在 CCD README 课程索引与侧栏中加入 `Rev 4 概念总整理` 入口，并刷新课程预览缓存，使 Review 4 能在课程首页正常展示摘要。
- 为 CCD Lecture 14 `Frequency Modulation (FM) & Phase Modulation (PM)` 补充 pulse-averaging discriminator 与 quadrature detector 两张电路图及对应解调过程说明。
- 为 CCD Lecture 14 补充 FM 频偏计算、频率摆动反推消息、变容二极管 LC 设计、RC phase shifter、晶体振荡器小频偏 FM、VCO / VCXO 与 FM detector 别名等复习例题和概念。

### 调整

- 扩展 CCD Lecture 14 的 FM 解调与抗噪章节，把 slope detector、pulse-averaging discriminator、quadrature detector、limiting 与 noise suppression 分成更清晰的复习链路。
- 在 CCD Lecture 5-6 `Amplifiers` 末尾追加 CE / CC / CB 三种 BJT 放大器组态对比表，集中比较电压增益、电流增益、输入/输出电阻、相位关系与典型用途。
- 为 CCD Review 2 追加通信系统与 FM 调制器相关补漏截图，使电路图与框图总整理覆盖更多源讲义图示。

### 修复

- 修正 CCD Lecture 14 中多个 `definition` 容器的 Markdown 写法，避免自定义容器层级不一致影响渲染。
- 补齐 FM/PM Summary 中解调器、VCO / VCXO、LC 设计、FM 抗噪与 PEP 等条目，减少复习时从正文回翻公式的断点。

### 删减

- 暂无

## V6.7.4 - 2026-06-22

### 新增

- 为 CCD `Rev 1 考试分析与复习重点`、`Rev 2 电路图与框图总整理`、`Rev 3 公式总整理` 新增 `Dye the sky.` 主题 `LyricCover` 封面歌词，三页分别使用同曲不同片段与中文译文。
- 为三篇 CCD Review 封面歌词补充 `シャイニーカラーズ` 同曲 QQ 音乐与网易云音乐直达链接，并为日语歌词写入 ruby shorthand 注音。

### 调整

- 将 CCD Rev 1 / Rev 2 / Rev 3 页首普通 Markdown 封面图统一替换为 `LyricCover`，继续复用原封面图片作为课程索引与页面封面来源。
- 统一 CCD Review 封面歌词的日语语种标记与歌词组件写法，使复习页封面与现有 CCD lecture 封面组件风格保持一致。

### 修复

- 暂无

### 删减

- 移除 CCD Rev 1 / Rev 2 / Rev 3 页首裸露的普通 Markdown 图片写法，避免与 `LyricCover` 封面重复。

## V6.7.3 - 2026-06-21

### 新增

- 新增 CCD Lecture 17 `RF Receivers` 完整笔记，覆盖 TRF 接收机、超外差接收机、IF / LO 频率关系、镜像频率、选择性、灵敏度、动态范围、非线性、IIP3、噪声系数、等效噪声温度与 Friis 级联噪声公式。
- 为 CCD Lecture 17 新增射频接收机配套图片素材与缩略图，包含 TRF / superhet 框图、1 dB 压缩点、双音互调频谱、IIP3 测量图、镜像频率图、噪声底与动态范围图、两级噪声因子与前端灵敏度例题图。
- 新增 CCD `Rev 2 电路图与框图总整理`，按 Block 汇总通信链路、器件、电路图、调制/解调框图、PLL、DAC、ADC 与 RF receiver 等复习识图入口，并补齐多张源 PDF 截图附件。
- 新增 CCD `Rev 3 公式总整理`，按课程主线整理基础量与 dB、器件、放大器、混频器、LC 匹配、振荡器、AM / SSB、FM / PM、天线、PLL、RF receiver、DAC、ADC 与转换误差公式。
- 在 CCD Review 1 中补充 Lecture 17 对 Q4 的复习入口，将 receiver 题型扩展到 superheterodyne block diagram、image frequency、linearity、noise figure、sensitivity 与 LNA 作用。

### 调整

- 调整 CCD Part 4 README 与 sidebar，把 Part 4 名称扩展为 `PLL, RF Receivers, DAC, ADC and Converter Errors`，并加入 Lecture 17、Review 2、Review 3 的课程入口。
- 刷新 CCD CourseIndex 与主题生成缓存，使 Review 2 / Review 3 和 Lecture 17 能在课程首页与侧栏中正常展示封面、摘要与入口。
- 调整 CCD Lecture 9 Oscillators 的多处图片路径与图示位置，使 LC 飞轮效应、Barkhausen 条件、反馈网络、Hartley / Colpitts、Clapp VCO 与相位噪声插图更稳定地渲染。
- 调整 CCD Lecture 13 SSB 中部分插图路径，并替换二极管环形调制器图，使 SSB 频谱、滤波、发射机与接收机图示引用保持一致。
- 扩展 CCD Lecture 16 PLL 的参数对照表，补充 $V_i$、$V_o$、$v_o(t)$、$f_0$、$K_D$、$K_O$、$K_V$、环路滤波器与 4046 VCO 参数的单位和易混点。

### 修复

- 修正 CCD Review 2 在 CourseIndex 中硬编码旧通信系统封面的问题，改为与自动封面生成结果保持一致。
- 在 CCD Lecture 17 的前端灵敏度例题中标注课件题干带宽与最终数值之间的疑似不一致，复习时按公式和题干带宽核算。

### 删减

- 暂无

## V6.7.2 - 2026-06-19

### 新增

- 补全 CCD 全课程多篇笔记中课件遗漏的图片公式、速算公式与例题结论，覆盖 Introduction、Semiconductors、Transistors、Amplifiers、Mixers、LC Matching、Oscillators、AM / SSB / FM / PM、Antenna、PLL、DAC 与 ADC。
- 为 CCD Part 1 补充半导体能带模型、PN 结能带解释、BJT 饱和判断、JFET 输入电阻与偏置、MOSFET 限制参数，以及放大器旁路电容、共集/共基放大器核心公式。
- 为 CCD Part 2 补充混频器镜像抑制例题、三阶互调产物、LC 截止频率与 Q 例题、最大功率传输推导、L 型匹配验证、振荡器反馈网络表和 Revision 总复习公式。
- 为 CCD Part 3 补充 AM 过调制 sideband splatter、SSB 10-12 dB 优势推导与接收频率链路、PM 指数、Carson Rule 限定、Deviation Ratio、Bessel 功率分配、PEP 与天线远场边界例题。
- 为 CCD Part 4 补充 PLL lock/capture range、XOR phase detector、RC loop filter、二阶闭环参数、DAC full-scale / R-2R ladder 推导、ADC sampling / SAR / Flash / DNR 公式和例题。

### 调整

- 调整 CCD Lecture 9 Oscillators 的部分插图引用，并补充对应截图附件，使振荡器反馈网络、Hartley / Colpitts 与相位噪声内容更贴合课件图示。
- 刷新课程预览缓存，使 CCD Revision 卡片摘要反映新增的 gain / dB 复习公式。

### 修复

- 修正 CCD ADC 笔记中 8-bit、0-5 V、3 V 输入的编码例题，按课件公式改为 `153 = 10011001_2`。
- 标注天线远场反求频率与 ADC 24-bit DNR 两处课件图示中的疑似数值不一致，复习时按同页公式核算。
- 修复 FM 笔记中低通 RC 相移、倍频链和发射功率相关公式缺失导致的复习断点。

### 删减

- 暂无

## V6.7.1 - 2026-06-18

### 新增

- 新增 `LyricCover` 全局组件：默认按普通笔记图片展示封面，悬浮或键盘聚焦时使用 CSS 毛玻璃动画淡化封面，并渐入复用 `LyricCard` / `LyricLine` 排版的歌词、标题、作者与音乐链接。
- `LyricCover` 支持 `image` / `src` / `cover` 图片路径、图片位置、最大宽度、可选固定比例，以及 `text-tone` 明暗文字模式；本地图片会在 Markdown 编译时尝试自动检测亮度并注入合适文字色，降低封面过亮或过暗时的可读性风险。
- 新增 `LyricCover` 实验室样例页与示例封面图，并在实验室 README 与 sidebar 中加入入口。
- 新增 CourseIndex 对 `LyricCover` 的封面抽取能力：课程索引会优先使用正文里第一个 `LyricCover` 图片作为笔记预览封面，并覆盖 README 中手动配置的封面。
- 新增 37 张 CCD 宽版图示附件，覆盖半导体、晶体管、放大器、AM / SSB / FM、天线、PLL、DAC 与 ADC 等章节。
- 新增根目录 `复习讲座.ics` 日历文件，包含电磁场与波、数字信号处理复习讲座日程。

### 调整

- 将 CCD 16 篇带“歌词 + 封面图”的笔记页首统一替换为 `LyricCover`，保留原有歌词、标题、作者、语种和音乐链接信息。
- 调整 CCD 多篇正文插图引用，优先使用横向宽版图片，并将部分拆分图合并为更适合笔记阅读的单张宽图。
- 调整 CCD Lecture 2b 半导体与 PN 结、Lecture 3-4 晶体管中的少量正文表述与图注，使概念说明更贴近当前笔记写法。
- 刷新 CourseIndex 生成缓存，为 CCD 16 篇笔记写入从 `LyricCover` 提取出的预览封面。

### 修复

- 修复课程索引在文章内存在 `LyricCover` 时仍可能优先使用普通正文图片或 README 显式封面的预览问题。
- 修复 `LyricCover` 相对图片路径在 Markdown 中无法按 Vite 资源方式导入的风险，并补充对应主题组件测试。
- 修复深色模式下 `LyricCover` 毛玻璃层仍显示边框的问题，深色主题中改为透明边框。
- 补充 CourseIndex 工具测试，覆盖 `LyricCover` 位于代码块时不被误识别、优先于普通图片、优先于显式 `cover` 的行为。

### 删减

- 移除 CCD 笔记页首歌词块后重复展示的独立封面图，避免同一封面在开头连续出现两次。

## V6.7 - 2026-06-18

### 新增

- 新增 flat frosted surface token 层 `surface.css`，统一管理平面毛玻璃的背景、边框、模糊与阴影变量，并在主题样式入口中先于各 material consumer 引入。
- 新增 `test:frosted-surface` 回归测试，覆盖旧 `liquid` / `glass` / `highlight` 反射 token、方向性白色高光渐变，以及 MindMap / CourseIndex / SongCard 等组件表面契约。
- 新增 frosted surface 重构设计规格与实施计划文档，记录从液态玻璃/反射层迁移到平面毛玻璃的边界与验收标准。
- 新增 Catppuccin 主题迁移设计规格文档，记录后续主题语义色迁移方向。

### 调整

- 将搜索框、Feature 卡片、导航栏阴影带、导航标签、下拉菜单、移动端导航按钮与文档侧栏窗口的表面样式，从旧液态玻璃/反射命名迁移到 flat frosted / gaussian blur token。
- 将纯净阅读模式导航按钮同步到新的 frosted nav token，并更新阅读模式测试，使隐藏导航栏时仍保持实时可绘制的模糊表面。
- 将 MindMap 顶部控制条与导出菜单的本地 `glass` / `highlight` token 改为 frosted blur token，并关闭控制条、菜单伪元素上的反射背景层。
- 将 Feature、首页课程入口、CourseIndex、SongCard 与 LyricCard 等卡片表面统一为同背景底色与阴影外轮廓，实体边框改为透明，弱化旧高光/底色卡面。
- 调整桌面端文档侧栏当前位置指示器，使蓝色选中面改为更方的圆角矩形，并在左侧轻微内收以贴合侧栏层级。
- 调整课程 README 卡片：下半区复用封面图作为毛玻璃模糊背景，增加连续圆角、外轮廓阴影，并加粗 Lecture 编号；浅色模式编号改为 `#8839EF`。
- 调整 SongCard 悬浮态，使其不再上浮或切换高亮阴影，保持与普通状态一致。
- 调整 LyricCard 主体为无框无影的透明正文块，仅保留专辑封面框的背景与阴影处理。
- 清理 transition 与 surface 注释中的玻璃/反射表述，改为中性的模糊表面描述。

### 修复

- 修复导航 frosted token 改名后，纯净阅读模式仍引用旧 nav glass 变量导致部分 `backdrop-filter` 声明失效的风险。
- 修复主题组件测试仍期待旧 MindMap `glass` token 与 SongCard `highlight` token 的问题，改为断言 frosted 命名与 flat background。
- 保持导航、侧栏、MindMap、CourseIndex、SongCard 等组件原有阴影栈不变，避免清理反射层时误删卡片深度阴影。
- 修复课程 README 卡片下半区毛玻璃背景被遮罩过度削弱、底部圆角在分区裁剪时变成直角的问题。

### 删减

- 移除生产 UI 代码中的旧 `liquid` / `glass` / `highlight` 反射 material token 与方向性白色高光渐变层。
- 移除 CourseIndex / SongCard 的卡片 `highlight` overlay 变量，以及 MindMap 的本地 `glass` / `highlight` 表面变量。

## V6.6.6 - 2026-06-17

### 新增

- 新增 `docs/Y3S1/CPS_N` 通信原理与系统（新）CPS 笔记，按 README 中的 Part 1-4 重写 Lecture 1-4、6-9、11-19，整合课件内容与旧 CPS 笔记补充。
- 新增通信原理与系统（新）CPS 课程 README 与独立 sidebar，README 采用 EP / CAD 早期资料索引风格，并保留跳转旧 CPS 笔记的链接。
- 为新 CPS 笔记整理课程图片附件，跳过装饰性图片，并将偏正方形或偏竖向的图片处理为更适合正文缩放的横向图片。
- 为 `SongCard` 新增音乐播放功能，支持 `song-id` / `netease-id` / `netease-url` 从网易云懒加载播放地址，也支持 `audio-url` 直接绑定音频文件，并提供页面内互斥播放、进度拖动、时间显示与音量控制。
- `SongCard` 设置网易云歌曲 ID 时会优先通过 `/song/detail` 获取专辑封面，`cover` 改为兜底封面，并为加载中与无封面状态提供稳定占位。
- 扩展 `SongCard` 实验室文档与主题组件测试，记录网易云代理、`api-base` / `audio-level` 参数、播放控制条与网易云封面优先级。

### 调整

- 将首页课程入口与第三学年导航栏下拉菜单中的 CPS 链接切换为 `通信原理与系统（新） CPS`，并指向 `docs/Y3S1/CPS_N/CPS-README.md`。
- 调整第三学年导航 activeMatch 与课程预览缓存，使 CPS_N README 与各 Part 笔记在导航和课程卡片中保持一致高亮与展示。
- 调整 `SongCard` 播放态布局：歌曲名、专辑与艺人信息上移，播放进度条下移贴近卡片底部；音量控制改为悬停或聚焦音量按钮时弹出音量条。
- `SongCard` 播放态中部新增歌词与翻译预览区域，可从网易云 `/lyric` 懒加载原文与翻译，也支持本地 LRC 兜底；播放前保持留白，开始播放后首句向上淡入，后续切换时旧句向上淡出、新句向上淡入。
- `SongCard` 歌词预览的原文与翻译字体规则对齐 `LyricCard` / `LyricLine`，翻译固定使用简中 serif 字体栈。
- `SongCard` 歌词预览支持长句自适应，按视觉长度自动缩小原文/翻译字号，并允许最多两行换行显示。
- `SongCard` 未设置专辑名时，歌词预览改为两行原文队列：当前句正常显示，下一句以较浅颜色作为预览，并隐藏翻译。
- 为金曲页面的 `SongCard` 补充网易云单曲 ID，使《ヒッチコック》《夢が僕らの太陽さ》《String Theocracy》《自己肯定感爆上げ↑↑しゅきしゅきソング》的卡片可直接播放，并自动使用网易云专辑封面。
- 确认 AIML 目录下 14 个 Markdown 文件均已配置 `lastUpdated` frontmatter，继续固定页面显示更新时间，避免后续维护提交影响旧笔记日期。

### 修复

- 复核并修正新 CPS 笔记中的知识性表述问题，包括基带信号定义、LTI 卷积与因果性的关系、FM 超外差接收机信号形式、Carson 法则带宽记号，以及 `E_b/N_0` 与普通功率 SNR 的区分。
- 收紧新 CPS 笔记中的严格适用条件说明，覆盖 AM / VSB 包络检波、SSB Hilbert 变换主值积分、Weaver 方法角频率单位、BFSK / M-FSK / QAM 表述等易误读位置。
- 替换新 CPS Part 3 中残留的 `alt text` 图片说明，改为具体中文图注。
- 修正 AIML 笔记中的多处知识性错误，覆盖交叉熵公式、高斯分布公式、归一化/标准化适用条件、PCA/SVD/LDA 表述、方差阈值、SVM 核函数与软间隔、反向传播更新、帕累托前沿、惩罚函数法与背包示例数值等内容。
- 统一 AIML 线性回归与梯度下降相关公式记号，避免标量写法、向量写法和梯度表达前后不一致。

### 删减

- 移除旧 CPS 笔记在首页、第三学年导航下拉菜单和独立 sidebar 中的直接入口；旧笔记现在仅通过新 CPS README 中的链接访问。

## V6.6.5 - 2026-06-17

### 新增

- 新增纯净阅读模式导航栏胶囊按钮，图标继承导航栏当前颜色，并与黑白切换、搜索、社交链接等导航元素保持同一玻璃胶囊风格。
- 文章页纯净阅读模式支持隐藏导航栏、左侧 sidebar 与右侧目录；鼠标移动到对应区域时，仅对应组件淡入显示。
- 首页也展示纯净阅读模式按钮；点击时不会进入阅读模式，而是触发轻微左右震动，并在鼠标附近提示“这里似乎没有可以隐藏的内容...”。
- 新增页面级 `readingMode: false` frontmatter 开关，可在具体文章开头自定义禁用纯净阅读模式；未声明时默认启用。
- 新增纯净阅读模式设计规格、实现计划与聚焦回归测试脚本 `test:reading-mode`。
- 新增 `optical_transceiver_break_even.png` 图片素材，用于后续光收发器盈亏平衡相关内容。

### 调整

- 纯净阅读模式状态只在当前浏览会话中保持，跨页面切换保留状态，刷新网页后重置为普通模式。
- 竖屏状态下隐藏纯净阅读模式按钮并禁用该模式；横屏非文章页点击时仅提供反馈，不隐藏任何区域。
- 纯净阅读模式激活后，按钮状态改为反转明暗的视觉样式，便于与普通导航栏胶囊区分。
- 导航栏阴影现在随导航栏本体一起淡出、淡入，不再单独保留在页面顶部。
- EPMF 课程首页、Block 1-4 讲义、例题、补充阅读、复习页与思维导图页补充 `lastUpdated` frontmatter，固定这些页面的显示更新时间。

### 修复

- 修复纯净阅读模式无法正常退出的问题，阅读模式下鼠标移到顶部区域后导航栏按钮可正常淡入并点击。
- 修复纯净阅读模式中 sidebar 不淡出、不淡入的问题，并避免 sidebar 自身入场动画覆盖阅读模式透明度。
- 修复透明 hover 区域在组件淡入后挡住导航栏、sidebar 或右侧目录点击的问题。
- 修复顶部热区在刚点击进入阅读模式后立刻重新唤出导航栏的问题，进入模式时会等待鼠标离开再重新布防。
- 修复导航栏玻璃效果在弹出后才加载的问题：隐藏状态下保持导航栏可绘制，并让玻璃胶囊的 `backdrop-filter` 实时参与合成。

### 删减

- 暂无

## V6.6.4 - 2026-06-16

### 新增

- 为桌面端导航栏展开菜单新增关闭延迟控制，`--dur-menu-close-delay` 当前设置为 `0.1s`。
- 扩展导航菜单动效回归测试，覆盖延迟关闭、`closing` 状态、`xyz-out` 离场动画与最终隐藏状态。

### 调整

- 调整导航栏展开菜单的关闭状态流：鼠标离开触发区域后先短暂保持可交互，再进入 `closing` 状态播放原有离场动画，动画结束后才真正隐藏。
- 导航菜单关闭延迟与离场动画时长现在从主题 CSS 变量读取，避免 JS 兜底值与样式时长脱节。

### 修复

- 修复导航栏展开菜单在鼠标离开时可能直接消失、跳过原本离场动画的问题。
- 修复文章一级标题后紧接二级标题时，DocMeta 分隔线与二级标题顶部分隔线同时出现的问题；此场景下隐藏紧邻二级标题的顶部分隔线。

### 删减

- 暂无

## V6.6.2 - 2026-06-15

### 新增

- 新增 EPMF 样卷标注解答 PDF：`output/pdf/Sample Exam Questions - EPMF Annotated Solutions.pdf`。
- 在 EPMF Block 2 Lecture 8 的 Cp / Cpk 小节补充样本数据与规格参数来源说明，明确样本均值、标准差、Target、Tolerance、USL 与 LSL 在公式中的角色。

### 调整

- 暂无

### 修复

- 修正 EPMF Block 2 Lecture 6 控制图例题中的均值、估计标准差与控制限取值，保留更精确中间结果后再四舍五入。
- 修正 EPMF Block 2 Lecture 7 Taguchi 损失函数例题中的样本方差与平均损失计算结果。

### 删减

- 暂无

## V6.6 - 2026-06-15

### 新增

- 新增 `MindMap` 全局组件，基于 `markmap-lib` / `markmap-view` 将 Markdown 层级渲染为可拖拽、缩放、折叠和适配视图的交互式思维导图。
- 新增 `mindmap` 代码块渲染器，支持用 ```` ```mindmap 可选标题 ```` 在笔记中直接生成思维导图。
- `MindMap` 新增展开弹层与导出菜单，支持保存 SVG、PNG，并通过浏览器打印页面导出 PDF；导出内容会带上主题背景、文本颜色和 KaTeX 公式样式。
- 新增 `/others/lab/mindmap` 实验室文档与导航入口，并扩展 `test:theme-components` 覆盖 MindMap、组件资源路径转换和 LyricCard 专辑封面。
- 新增 `katex`、`markmap-lib`、`markmap-view` 开发依赖。
- 新增 EPMF Block 1-4 的 `Mindmap.md` 页面、课程索引卡片与侧边栏入口；Block 1 填充项目管理、范围、进度、成本、资源、沟通与风险管理复习提纲，Block 2 填充 DFM、DFS、QC、COQ、稳健设计、DOE、Six-Sigma 等复习导图内容。
- 新增 EPMF README 思维导图统一封面与缩略图附件，用于四个 Block 的 CourseIndex 卡片。
- 新增 `LyricCard` 的 `album-cover`、`album-cover-alt`、`album-cover-position` 参数，可在歌词块右上角展示专辑封面，并支持 public 路径、相对路径和外链。
- 新增 Markdown 组件资源自动导入管线，为 `SongCard` 的 `cover` 与 `LyricCard` 的 `album-cover` 自动处理相对资源路径。
- 新增 Markdown 图片构建期尺寸注入：本地 `jpg` / `jpeg` / `png` / `gif` / `svg` / `webp` 图片会在 VitePress 构建时解析实际宽高，并写入最终 HTML 的 `width` / `height` 属性，提前为正文图片预留布局空间。
- 图片尺寸解析支持相对路径、`docs/public` 绝对路径、URL 编码路径、JPEG EXIF 方向修正、SVG `viewBox` 回退，以及基于文件 `mtime` / `size` 的构建期缓存。
- 新增 `MindMap` 异步组件加载占位块，组件 chunk 尚未加载完成时也会先保留稳定的正文高度。
- 新增 EPMF Block 4 思维导图《铁花飞》专辑封面附件，用于页面开头的 `LyricCard` 展示。
- 新增金曲《String Theocracy》页面与封面附件，并加入金曲 README 与侧边栏导航。
- 新增早期资料 EP 笔记站内展示页，迁入 `DT5EDU/EP_Lecture_Notes` 的完整历史内容与 Git 记录，并固定页面作者为 `Cateds`。
- 新增早期资料 CAD 笔记站内展示页，迁入 `Cateds/CAD_Lecture_Notes` 的完整历史内容与 Git 记录，并固定页面作者为 `Cateds`。
- 为 EP / CAD 早期资料新增独立 sidebar，覆盖课程索引、讲义页面与 EP 的 MS Review Notes 子目录。

### 调整

- 将首页早期资料里的 EP / CAD 笔记链接改为站内 Cateds 版本，导航栏“早期资料”下载菜单保留原 DT5EDU 外链，并新增 Cateds 站内跳转。
- 将 EP / CAD 导入页面的 `lastUpdated` 写死到原始资料日期，避免后续站点维护 commit 改变旧笔记展示日期。
- 将 EPMF 思维导图文件统一改为英文文件名 `Mindmap.md`，并同步更新 README、sidebar 与课程预览缓存，避免中文文件名路径残留。
- 将 EPMF Block 4 思维导图开头的歌词卡片改为《铁花飞》，补入开头两句英中歌词、Mili/塞壬唱片-MSR 艺人信息与专辑封面。
- 为 EPMF Block 1、Block 3、Block 4 思维导图开头的 `LyricCard` 补充网易云音乐歌曲链接。
- EPMF README 中“思维导图”卡片副标题统一为 `Mindmap`，并切换到统一的 `epmf-mindmap-cover` 封面资源。
- 调整 `LyricCard` 顶部控制区布局：注音按钮与专辑封面共用右上角 rail，正文会自动为封面预留空间，移动端改为封面在上、歌词在下。
- 调整 `LyricCard` 底部布局，使音乐平台图标固定在左下角，标题与作者继续保持右下角对齐。
- 调整 `MindMap` 卡片视觉、顶部工具区、默认展开层级与无标题对齐逻辑，导出 SVG / PNG / PDF 合并到一个带动画下拉菜单的导出按钮中。
- 调整 `MindMap` 多一级标题场景的根节点连线：当导图由自动生成的空根节点承载多个一级标题时，隐藏空根节点及其连向一级标题的上级连线。
- 调整 `MindMap` 多一级标题场景的布局：自动空根节点下的一级标题会按同一水平线横向排列，各自子树保持独立展开。
- 将正文页 View Transition 的图片等待策略从运行时长等待改为“构建期尺寸预留 + 短时布局确认”，部署后网络较慢时不再因为图片下载延迟而长时间卡在页面切换前。
- `PageTransition.vue` 现在会把已有 `width` / `height` 属性、图片自然尺寸和实际布局盒子都视为有效布局尺寸，减少短页面切换时的误判等待。
- 为正文自定义容器、`example` / `stem` / `solution` / `options` 容器、`Linkcard`、`SongCard`、`LyricCard`、`CourseIndex`、`MindMap` 补充稳定的 `width`、`min-width`、`box-sizing` 与 `min-height` 约束。
- 为 `CourseIndex` 卡片补充固定 cover 行与移动端行高约束，避免课程索引卡片在图片或 fallback cover 尚未完成布局时抖动。
- 为 `LyricCard` 专辑封面、底部信息区与移动端封面布局补充明确宽高和最小高度，避免封面 rail 影响正文首帧高度。
- 为 `SongCard` 保留封面约 1/3 宽度的 1:2 栅格比例，同时补充卡片与封面框的稳定高度约束。
- 同步更新主题组件测试，覆盖 `MindMap` 加载占位、当前 KaTeX 隐藏策略与 `SongCard` 稳定高度约束。
- 刷新歌词容器实验室示例，替换为更贴近真实用法的日文、英文与俄文歌词片段，并加入专辑封面演示。
- 调整 EMFT Chapter 6 页首歌词块的语言与标题标点样式。
- 微调首页课程入口与 Hero 图片的移动端断点和间距，避免 960px 附近布局状态不一致。

### 修复

- 修复 EP 导入笔记中的若干早期格式问题，包括 HTML 下划线标题、starter comment 拼写与部分年份 typo。
- 修复 `MindMap` 在移动端渲染 KaTeX 公式时可能错位、重复或尺寸不稳定的问题：等待字体加载完成后重新 layout / fit，并让组件内 KaTeX 仅使用 HTML 渲染层参与布局。
- 同步修复 `MindMap` 导出 SVG / PNG / PDF 时的公式样式，避免导出内容与页面显示不一致。
- 修复 `MindMap` 右侧分支文字边缘被 SVG 裁切的问题。
- 修复 `MindMap` 导出菜单层级低于导图卡片、打开后被遮挡的问题。
- 修复 `MindMap` 放大 / 缩小按钮视觉高度不一致的问题。
- 修复正文内容较少、无法填满整页时，页面切换动画首帧可能被 Chrome 以错误高度快照捕获，导致正文在竖直方向被压缩的问题。
- 修复金曲首页 README、DSP 后几章等短页面在切入时因图片或容器尚未预留高度而出现压缩、跳高或长等待的问题。
- 修复自定义容器或正文卡片内容很短、为空、异步加载或图片尚未完成加载时，可能把正文主区域高度拉低并影响 View Transition 快照的问题。
- 修复 `MindMap` 异步加载期间正文区域短暂塌陷的问题，并让外层容器继承 `--mind-map-height` 参与首帧布局。
- 修复 `Linkcard` 图片 HTML 尺寸属性与实际 CSS 尺寸不一致的问题。
- 修复正文页路由切换时 View Transition 快照过早、图片未取得自然尺寸导致页面先以错误矮高度进入过渡、随后被撑开的问题：在 `PageTransition.vue` 新增过渡前稳定步骤，正文页 `nextTick` 后等待前几个图片完成布局（最长 1400ms），再强制读取 `.VPDoc .main` 布局后拍新快照。
- 修复 CCD Lecture 10 Revision 歌词 typo：「Alays」→「Always」。
- 修复 Markdown 中组件相对图片路径不能稳定进入 Vite 资源管线的问题，避免移动文档或构建后封面路径失效。
- 修复正文 View Transition 在页面高度变化时可能被 Chrome 插值压扁的问题，将正文过渡目标调整到 `.VPDoc .main` 并禁用 `doc-content` group 动画。
- 修复 `LyricCard` 同时显示注音按钮和封面时右上角元素挤占正文的问题。
- 修复 `LyricCard` 带专辑封面且页面无右侧目录时，底部歌曲名与作者可能未贴齐歌词块最右边的问题。

### 删减

- 移除 EPMF 思维导图旧中文文件名路径，统一使用 `Mindmap.md`。
- 合并并移除 changelog 中独立的 V6.6 beta / beta 2 / beta 3 条目，以正式 `V6.6` 作为本轮发布记录。

## V6.5.1 - 2026-06-13

### 新增

- 新增 `SongCard` 全局组件，用于展示专辑封面、歌曲名、艺人等信息，支持玻璃拟态卡片样式与语言自动标点。
- 新增金曲板块（`/others/songs/`），收录三首歌词：
  - 自己肯定感爆上げ↑↑しゅきしゅきソング（藤田ことね）
  - ヒッチコック（ヨルシカ）
  - 夢が僕らの太陽さ（虹ヶ咲学園スクールアイドル同好会）
- 新增实验室板块（`/others/lab/`），包含歌词容器与 SongCard 用法文档。
- 补全 EMFT Chapter 5 页首《ヒッチコック》的日文原词，并保留对应中文翻译。

### 调整

- 歌词原词字号略微放大，并将原词字重调整为 `600`；翻译保持小一号显示。
- 将日语假名注音间距恢复为初始版本，取消压缩与下移处理。
- EMFT Chapter 5 歌词块语言改为日语，使原词使用日文字体栈、中文翻译继续使用简体中文字体栈。
- 减弱 SongCard 暗色模式下的反光参数（高光渐变去除、顶部内阴影减半）。
- LyricCard 标题为空时不再显示书名号等空壳标点。
- 将原 `docs/others/test.md` 替换为正式的实验室首页。

### 修复

- LyricCard 日文标题样式 `ja-kagi` / `ja-double-kagi` 在 `lang="ja"` 时自动生效。

### 删减

- 移除 `docs/others/test.md`（已被实验室板块替代）。

## V6.5 - 2026-06-13

### 新增

- 新增 `LyricCard` / `LyricLine` 全局 Markdown 组件，用于在正文中展示歌词、作品名、作者、翻译、日文注音与音乐平台链接。
- 新增日文注音短写解析，支持 `漢字(かな)` 与 `｜文字(かな)` 写法，并提供 `default-furigana`、`force-furigana`、`furigana` 等显示控制。
- 新增 QQ 音乐与网易云音乐 SVG 图标资源，音乐链接以左下角裸 SVG 形式显示，卡片本体不参与跳转。
- 新增 `/others/test` 实验室页面与导航入口，用于集中展示新组件效果、用法与参数列表。
- 新增 `AGENTS.md` 中的标准正文歌词块复用规范。

### 调整

- 将歌词组件注册到 VitePress 自定义主题，支持在所有 Markdown 笔记中直接使用。
- 将歌词组件视觉从独立卡片改为正文内嵌块，移除外层背景、边框、阴影、毛玻璃与整体悬浮位移，同时保留注音切换、音乐跳转、标题与作者展示功能。
- 恢复歌词块右下角歌曲名的原有视觉层级，保持深色、大字号和加粗显示。
- 为 CCD 正文笔记锁定 `lastUpdated`，避免后续歌词维护影响页面最后更新时间。
- 将 CCD 正文笔记页首旧歌词块替换为 `LyricCard` / `LyricLine`，补充网易云音乐链接，并为日文原词写入注音数据；CCD README 保持原有展示方式。
- 为 EMFT 多篇正文笔记锁定 `lastUpdated`，并将页首旧歌词块替换为 `LyricCard` / `LyricLine`，补充 QQ 音乐与网易云音乐链接。
- 调整第三学年导航 activeMatch，使课程 README 与课程目录下所有正文页面都能正确高亮。
- 在 `AGENTS.md` 与 `CLAUDE.md` 补充课程导航 activeMatch 维护说明。

### 修复

- 修复日文歌词卡片中的中文翻译可能继承日文字形的问题，翻译行默认使用 `lang="zh-CN"` 并强制采用 `Noto Serif CJK SC` 字体栈。
- 修复日文原词字体选择，日文歌词默认优先使用 `Noto Serif CJK JP`，中文歌词默认优先使用 `Noto Serif CJK SC`。
- 修复音乐平台链接点击后返回页面时交互焦点状态残留的问题。
- 调整日文注音与正文汉字的行距，使假名更贴近原词。

### 删减

- 移除 CCD 与 EMFT 相关正文页首旧的粗体歌词和右对齐署名写法。
- 移除歌词组件外层卡片化视觉效果，包括背景、边框、阴影、反射感和整体 hover 抬升。

## V6.4.8 - 2026-06-13

### 新增

- 新增文档元信息日期解析工具，支持 frontmatter 手动指定 `lastUpdated`、ISO 时间、日期隐藏与 git 时间回退。
- 新增 `npm run test:doc-meta-date`，覆盖手动更新时间、git 回退、ISO 时区、隐藏日期和展示格式。
- 为 CPS 与 AIML 顶层 Markdown 页面写入源仓库对应文件的固定 `lastUpdated`，避免后续站点维护改动刷新老笔记更新时间。
- 为 DSP Chapter 2-6 写入固定 `lastUpdated`，保留老笔记页面显示的历史更新时间。

### 调整

- `DocMeta` 与旧 `update` 组件统一使用新的日期格式化逻辑，页面日期不再显示“最后更新：/更新时间:”前缀。
- 日期显示格式调整为 `YYYY/MM/DD HH:mm`；当源时间显式包含秒时显示为 `YYYY/MM/DD HH:mm:ss CST`。
- 刷新课程正文预览缓存，使 DSP Chapter 2 的预览同步知识性修正后的内容。

### 修复

- 修正 DSP Chapter 2-6 中若干知识性错误与打字问题，包括离散时间索引范围、范数说明、共轭反对称分解、归一化角频率、Parseval/ESD 表述、采样定理术语、DFT/DFS 正负号与下标、循环卷积、Z 变换 ROC/卷积性质等。

### 删减

- 移除文档更新时间显示中的固定中文前缀，仅保留日期和时间本身。

## V6.4.7 - 2026-06-13

### 新增

- EPMF Block 4 Lecture 15 补充事业部结构、扁平结构、矩阵结构等组织结构配图，并生成对应课程封面缩略图。
- EPMF Block 4 Lecture 16 补充公司战略层级配图。
- EPMF README 更换结尾展示图。

### 调整

- EPMF Block 3/4 正文中的经济、财务与商业术语统一补充中文标注，采用“中文术语 English Term”格式；公式块保留原样。
- EPMF Block 3/4 部分标题、目录锚点、定义容器和表格项统一为中文在前、英文在后的写作风格。
- EPMF Block 3 Lecture 13 Part 1/2 与 13-2 Extended Version 补充 cost、price、interest、asset、depreciation、CapEx、OpEx、TCO 等术语中文。
- EPMF Block 4 Lecture 14/15/16 补充 ownership、shares、valuation、share price、market share、revenue、profit、strategy、KPI 等术语中文。
- 刷新课程卡片封面与预览缓存，使 CourseIndex 展示最新 EPMF 封面和正文摘要。
- 调整 EPMF README 的提示语气与页面分隔。

### 修复

- 修复 EPMF Block 3/4 笔记中部分正文英文经济学名词未标注中文的问题。

### 删减

- 暂无。

## V6.4.5 - 2026-06-13

### 新增

- EPMF 笔记页面通过 `transformPageData` 显式限定右侧目录深度为 h2 ~ h3（特例，为后续目录结构预留）。
- 新增 View Transition CSS 防回归校验脚本，覆盖导航栏命名快照、正文快照选择器、正文快照层级与 doc/contentless 页面切换类名。

### 调整

- 课程索引卡片（CourseIndex）改用双层阴影（羽化光晕 + 投影），营造微悬浮质感，与导航栏胶囊和侧边栏窗口风格统一。
- 首页 feature 卡片复用统一的玻璃卡片边框、羽化阴影和深度阴影变量。
- 课程 README 页面（`pageClass: course-index-page`）不再显示字数 / 阅读时间 / 作者 / 下载 PDF（在 `config.mts` 的 `formatDocMeta` 中判断 frontmatter 跳过注入）。
- 正文切入淡入动画放慢：桌面端 `--dur-doc-enter` 调整为 `0.94s`，移动端调整为 `0.82s`。

### 修复

- 修复页面切换时导航栏 / 本地导航栏因独立 View Transition 快照导致的异常放大、重叠与跟随正文位移动画的问题。
- 修复正文进入动画被 root 快照承载导致 nav 一起横向运动的问题，改为只对真实正文列建立 `doc-content` 命名快照。
- 修复 `.VPDoc .content` 过宽选择器同时命中正文与右侧目录，造成重复 `view-transition-name: doc-content` 并让 Chrome 中止正文动画的问题。
- 修复从有正文页面切换到站内无正文页面时，正文右向淡出动画缺失的问题。
- 修复从有 sidebar 的 doc 页面切换到无 sidebar 的 doc 页面时，sidebar 淡出后短暂出现玻璃模糊矩形残留的问题（新增 `vt-hide-sidebar` 类将 sidebar 并入 root 快照离场）。

### 删减

- 移除导航栏与本地导航栏的独立命名 View Transition 快照规则，避免玻璃态导航在路由切换时生成额外异常快照。

## V6.4.4 - 2026-06-12

### 新增

- CourseIndex 组件新增课程封面 fallback 支持，笔记内封面缺失时回退到课程 README 封面图。
- 抽取 `course-index-utils.mjs` 公共模块，供缩略图与预览生成脚本复用。
- 新增 `course-index-utils.test.mjs` 单元测试及 `npm run test:course-index-assets` 测试脚本。
- EPMF Lecture 7 田口参数设计区域新增 DOE 术语说明 NOTE（因子、水准、实验、处理）。
- EPMF Lecture 7/11/13 公式首次出现的参数新增 NOTE 说明。

### 调整

- `generate-course-thumbnails.mjs` 重构，路径解析逻辑迁移至 `course-index-utils.mjs`。

### 修复

- 暂无。

### 删减

- 暂无。

## V6.4.3 - 2026-06-12

### 新增

- 暂无。

### 调整

- 合并导航栏“第一学年”和“第二学年”为“早期资料”下拉菜单。

### 修复

- 暂无。

### 删减

- 暂无。

## V6.4.2 - 2026-06-12

### 新增

- 新增导航栏“杂项”下拉菜单，并添加站内“更新日志”入口。
- 新增站内更新日志页面 `/changelog`，复用根目录 `CHANGELOG.md` 内容。

### 调整

- 将“更新日志”入口从 GitHub 外链改为站内路由。

### 修复

- 暂无。

### 删减

- 暂无。

## V6.4.1 - 2026-06-12

### 新增

- 暂无。

### 调整

- 暂无。

### 修复

- 修复从文档页面返回首页时，桌面端 sidebar 独立 View Transition 快照残留造成的短暂玻璃模糊层。

### 删减

- 暂无。

## V6.4 Creation & Beyond - 2026-06-12 (9a42ed3)

- 统计：72 个文件变更，新增 1679 行，删除 219 行。

### 新增

- 新增通用课程卡片目录组件 `CourseIndex`。
- 新增课程封面缩略图生成脚本。
- 新增课程卡片正文预览生成脚本。
- 新增课程卡片预览缓存文件。
- 新增/补充 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 46 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 13 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。
- 调整 npm 脚本或依赖锁定。
- 调整 GitHub Pages 部署流程。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 48 项中的旧内容。

## V6.3 - 2026-06-11 (5f45d15)

- 统计：15 个文件变更，新增 859 行，删除 32 行。

### 新增

- 新增 VitePress 自定义主题、自动化脚本相关内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置、主题组件、VitePress 自定义主题、主题样式 等 6 项中的旧内容。

## V6.2 fix - 2026-06-11 (b839373)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 修复 导航、侧边栏与站点配置 中的问题。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## V6.2 fix - 2026-06-11 (33866e9)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 修复 主题样式 中的问题。

### 删减

- 精简/替换 主题样式 中的旧内容。

## V6.2 - 2026-06-11 (96ee51e)

- 统计：19 个文件变更，新增 491 行，删除 102 行。

### 新增

- 新增首页或公共展示资源。
- 新增前端动画或样式 vendor 资源。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置、VitePress 自定义主题、主题组件、主题样式 等 6 项中的旧内容。

## V6.1 - 2026-06-11 (726bce2)

- 统计：18 个文件变更，新增 503 行，删除 368 行。

### 新增

- 新增 VitePress 自定义主题相关内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 移除 VitePress 自定义主题、主题组件 中的旧文件。

## V6.0 fix - 2026-06-10 (a313568)

- 统计：3 个文件变更，新增 209 行，删除 80 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 修复 项目维护文档、主题组件、主题样式 中的问题。

### 删减

- 精简/替换 项目维护文档、主题组件、主题样式 中的旧内容。

## V6.0 - 2026-06-10 (a4f5b30)

- 统计：6 个文件变更，新增 486 行，删除 354 行。

### 新增

- 新增 主题样式相关内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式 中的旧内容。

## V5.7 - 2026-06-10 (9e23c96)

- 统计：34 个文件变更，新增 2863 行，删除 17 行。

### 新增

- 补充 EMFT Chapter 2、EMFT Chapter 8 P II 内容。

### 调整

- 调整 EMFT Chapter 2、EMFT Chapter 8 P II 的笔记、README 或配图引用。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 2、EMFT Chapter 8 P II 中的旧内容。

## V5.6.3 - 2026-06-07 (4eb2bbc)

- 统计：4 个文件变更，新增 21 行，删除 1 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 中的旧内容。

## V5.6.2 - 2026-06-06 (203fa0f)

- 统计：2 个文件变更，新增 11 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 暂无。

## V5.6.1 - 2026-06-05 (106ce6a)

- 统计：2 个文件变更，新增 21 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 11-12 Amplitude Modulation 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 3/CCD Lecture 11-12 Amplitude Modulation 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 暂无。

## V5.6 - 2026-06-05 (240ba76)

- 统计：72 个文件变更，新增 5449 行，删除 21 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 11-12 Amplitude Modulation、CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB、CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 等 10 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 3/CCD Lecture 11-12 Amplitude Modulation、CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB、CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation 等 13 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 移除 EPMF Lecture 14、EPMF Lecture 15、EPMF Lecture 16 中的旧文件或附件。

## V5.5 - 2026-06-04 (01f9c1c)

- 统计：6 个文件变更，新增 161 行，删除 7 行。

### 新增

- 新增 主题组件相关内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 项目维护文档、主题组件、主题样式 中的旧内容。

## V5.4.0 beta - 2026-06-04 (a2acfa6)

- 统计：3 个文件变更，新增 182 行。

### 新增

- 新增 主题样式相关内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## V5.3.1 - 2026-06-03 (c7f31fa)

- 统计：1 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## V5.3 - 2026-06-03 (ab991c2)

- 统计：9 个文件变更，新增 901 行，删除 839 行。

### 新增

- 新增/补充 EMFT EFMT Extra 1、EMFT Chapter 8 P I、EMFT Chapter 8 P II、EMFT README 相关笔记、图片或附件。

### 调整

- 调整 EMFT EFMT Extra 1、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 8 中的旧文件或附件。

## V5.2.2 bug fix - 2026-06-03 (8a7e7e5)

- 统计：2 个文件变更，新增 15 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 修复 主题组件、主题样式 中的问题。

### 删减

- 暂无。

## V5.2.1 Fix - 2026-06-03 (ea5d837)

- 统计：1 个文件变更，新增 81 行。

### 新增

- 补充 EMFT Chapter 8 内容。

### 调整

- 调整 EMFT Chapter 8 的笔记、README 或配图引用。

### 修复

- 修复 EMFT Chapter 8相关问题。

### 删减

- 暂无。

## V5.2 - 2026-06-03 (20c4dc6)

- 统计：6 个文件变更，新增 79 行，删除 33 行。

### 新增

- 新增首页或公共展示资源。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式、首页与公共资源 中的旧内容。

## V5.1.1 fix - 2026-06-02 (68351c0)

- 统计：2 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充 EMFT EFMT Extra 1、EMFT EFMT Extra 2 内容。

### 调整

- 调整 EMFT EFMT Extra 1、EMFT EFMT Extra 2 的笔记、README 或配图引用。

### 修复

- 修复 EMFT EFMT Extra 1、EMFT EFMT Extra 2相关问题。

### 删减

- 精简/替换 EMFT EFMT Extra 1、EMFT EFMT Extra 2 中的旧内容。

## V5.1.1 - 2026-06-02 (0b43b09)

- 统计：6 个文件变更，新增 187 行，删除 105 行。

### 新增

- 新增/补充 EMFT EFMT Extra 2 相关笔记、图片或附件。

### 调整

- 调整 EMFT EFMT Extra 1、EMFT EFMT Extra 2 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT EFMT Extra 1、EMFT EFMT Extra 2 中的旧内容。

## V5.1 - 2026-06-02 (2de1cb9)

- 统计：9 个文件变更，新增 1529 行，删除 2462 行。

### 新增

- 新增/补充 EMFT EFMT Extra 1、EMFT EFMT Extra 2 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 7、EMFT Chapter 8、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 P I、EMFT Chapter 8 P II 中的旧文件或附件。

## V5.0 - 2026-05-31 (552a555)

- 统计：4 个文件变更，新增 167 行，删除 47 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式 中的旧内容。

## V4.9.2 - 2026-05-31 (84e22bd)

- 统计：2 个文件变更，新增 73 行，删除 38 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式 中的旧内容。

## V4.9.1 Left anime - 2026-05-31 (8957205)

- 统计：6 个文件变更，新增 203 行，删除 741 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整 npm 脚本或依赖锁定。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 项目维护文档、主题组件、VitePress 自定义主题、主题样式 等 5 项中的旧内容。

## V4.9 - 2026-05-31 (e05f2c3)

- 统计：14 个文件变更，新增 53 行，删除 22 行。

### 新增

- 新增/补充 CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators、CCD Part 3/CCD Lecture 11-12 Amplitude Modulation、CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB 等 6 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 6 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 10 项中的旧内容。

## V4.8 - 2026-05-31 (017166e)

- 统计：6 个文件变更，新增 543 行，删除 13 行。

### 新增

- 新增/补充 EMFT Chapter 8 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 的笔记、README 或配图引用。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 11 中的旧文件或附件。

## V4.7 - 2026-05-30 (674f1b1)

- 统计：10 个文件变更，新增 3087 行，删除 21 行。

### 新增

- 新增/补充 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 P II、EMFT Chapter 8 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 8 P II、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 P II、EMFT Chapter 8、EMFT README 中的旧内容。

## V4.6.0 EFMT Chap8 P1 Init - 2026-05-30 (d348f3e)

- 统计：17 个文件变更，新增 1513 行，删除 14 行。

### 新增

- 新增/补充 EMFT Chapter 8 P I 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators 等 5 项的笔记、README 或配图引用。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators 等 5 项中的旧内容。

## V4.5.2 - 2026-05-29 (a216593)

- 统计：43 个文件变更，新增 253 行，删除 38 行。

### 新增

- 新增/补充 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 5 项相关笔记、图片或附件。

### 调整

- 调整 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 5 项的笔记、README 或配图引用。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 5 项中的旧内容。

## V4.5.1 - 2026-05-29 (add0dd4)

- 统计：142 个文件变更，新增 7240 行，删除 9 行。

### 新增

- 新增/补充 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators 相关笔记、图片或附件。
- 新增首页或公共展示资源。

### 调整

- 调整 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 6 项的笔记、README 或配图引用。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 6 项中的旧内容。

## V4.5 - 2026-05-29 (5894c84)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## V4.4.1 - 2026-05-27 (85163a6)

- 统计：14 个文件变更，新增 60 行，删除 10 行。

### 新增

- 新增/补充 EPMF Block 3 Additional Reading、EPMF Course Revisit、EPMF Lecture 10、EPMF Lecture 11 等 12 项相关笔记、图片或附件。

### 调整

- 调整 EPMF README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Block 3 Additional Reading、EPMF Course Revisit、EPMF Lecture 10、EPMF Lecture 11 等 13 项中的旧内容。

## V4.4 - 2026-05-27 (5f33c3b)

- 统计：14 个文件变更，新增 1176 行，删除 201 行。

### 新增

- 新增/补充 EPMF Block 1 Examples、EPMF Lecture 7、EPMF Lecture 8 相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 1、EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4 等 8 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整主题样式、动效或响应式表现。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Block 1 Examples、EPMF Lecture 1、EPMF Lecture 2、EPMF Lecture 3 等 9 项中的旧内容。

## V4.3 - 2026-05-27 (7308fb9)

- 统计：47 个文件变更，新增 1153 行，删除 362 行。

### 新增

- 新增/补充 EPMF Block 2 Examples、EPMF Lecture 5、EPMF Lecture 6、EPMF Lecture 7 等 5 项相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 5、EPMF Lecture 6、EPMF Lecture 7、EPMF Lecture 8 等 5 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Block 2 Examples、EPMF Lecture 5、EPMF Lecture 6、EPMF Lecture 7 等 6 项中的旧内容。

## V4.2.3 - 2026-05-26 (2e64398)

- 统计：2 个文件变更，新增 12 行，删除 12 行。

### 新增

- 补充 CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2b Semiconductors Basics 内容。

### 调整

- 调整 CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2b Semiconductors Basics 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2b Semiconductors Basics 中的旧内容。

## V4.2.2 - 2026-05-26 (bbe4f66)

- 统计：9 个文件变更，新增 29 行，删除 5 行。

### 新增

- 新增/补充 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、DSP Chapter 11 相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、DSP README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、DSP Chapter 11 等 5 项中的旧内容。

## V4.2.1 fix - 2026-05-26 (5839c80)

- 统计：2 个文件变更，新增 1 行，删除 1 行。

### 新增

- 新增/补充 CCD Part 1/CCD Lecture 1 Introduction 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 1/CCD Lecture 1 Introduction 的笔记、README 或配图引用。

### 修复

- 修复 CCD Part 1/CCD Lecture 1 Introduction相关问题。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 1 Introduction 中的旧内容。

## V4.2.1 - 2026-05-26 (bcb2858)

- 统计：1 个文件变更，新增 10 行，删除 2 行。

### 新增

- 补充 CCD Part 1/CCD Lecture 1 Introduction 内容。

### 调整

- 调整 CCD Part 1/CCD Lecture 1 Introduction 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 1 Introduction 中的旧内容。

## V4.2 CCD supply - 2026-05-26 (c9b95e4)

- 统计：49 个文件变更，新增 1213 行，删除 7 行。

### 新增

- 新增/补充 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 5 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 5 项中的旧内容。

## V4.1.1 A NEW ERA fix - 2026-05-25 (92feddb)

- 统计：2 个文件变更，新增 40 行。

### 新增

- 补充 EMFT Chapter 6、EMFT Chapter 7 内容。

### 调整

- 调整 EMFT Chapter 6、EMFT Chapter 7 的笔记、README 或配图引用。

### 修复

- 修复 EMFT Chapter 6、EMFT Chapter 7相关问题。

### 删减

- 暂无。

## V4.1 A NEW ERA - 2026-05-25 (2502ae6)

- 统计：5 个文件变更，新增 132 行，删除 94 行。

### 新增

- 新增 主题样式相关内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、VitePress 自定义主题、主题样式 中的旧内容。

## V4.0 Homepage UI - 2026-05-25 (86b65dc)

- 统计：3 个文件变更，新增 421 行，删除 46 行。

### 新增

- 新增 主题组件相关内容。

### 调整

- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、首页与公共资源 中的旧内容。

## V3.8 C6C7 - 2026-05-25 (79f6165)

- 统计：12 个文件变更，新增 1640 行，删除 446 行。

### 新增

- 新增/补充 EMFT Chapter 7 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 6、EMFT Chapter 7、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 10、EMFT Chapter 9 中的旧文件或附件。

## V3.7.4 Fix - 2026-05-16 (69df966)

- 统计：1 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 自定义主题。

### 修复

- 修复 VitePress 自定义主题 中的问题。

### 删减

- 精简/替换 VitePress 自定义主题 中的旧内容。

## V3.7.3 Fix - 2026-05-16 (c3c089b)

- 统计：1 个文件变更，新增 20 行，删除 12 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 自定义主题。

### 修复

- 修复 VitePress 自定义主题 中的问题。

### 删减

- 精简/替换 VitePress 自定义主题 中的旧内容。

## V3.7.2 EXPAND & COLLAPSE - 2026-05-16 (fae5d5b)

- 统计：11 个文件变更，新增 167 行，删除 6 行。

### 新增

- 新增/补充 EMFT Chapter 6 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 6 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 6 中的旧内容。

## V3.7 Old Notes Fix - 2026-05-15 (2142042)

- 统计：24 个文件变更，新增 308 行，删除 679 行。

### 新增

- 补充 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项 内容。

### 调整

- 调整 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 修复 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项相关问题。

### 删减

- 精简/替换 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项中的旧内容。

## V3.6 EPMF 2~4 - 2026-05-15 (d99c472)

- 统计：25 个文件变更，新增 1973 行，删除 4 行。

### 新增

- 新增/补充 EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4 相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4、EPMF README 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4、EPMF README 中的旧内容。

## V3.5.1 CCD Sturcture - 2026-05-14 (53c8fd3)

- 统计：10 个文件变更，新增 94 行。

### 新增

- 新增/补充 CCD README、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors 等 9 项相关笔记、图片或附件。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 修正课程结构或目录组织。

### 删减

- 暂无。

## V3.5 WordCount - 2026-05-14 (24bee7f)

- 统计：8 个文件变更，新增 79 行，删除 7 行。

### 新增

- 新增/补充 EMFT Chapter 6、EMFT Chapter 7、EMFT Chapter 8 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 6、EMFT Chapter 7、EMFT Chapter 8 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 6、EMFT Chapter 7、EMFT Chapter 8 中的旧内容。

## V3.4.1 - 2026-05-13 (0781295)

- 统计：1 个文件变更，新增 11 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## V3.4 - 2026-05-13 (90d37f2)

- 统计：12 个文件变更，新增 358 行，删除 80 行。

### 新增

- 补充 DSP README、EMFT README 内容。

### 调整

- 调整 DSP README、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 DSP README、EMFT README 中的旧内容。

## V3.3.1 - 2026-05-12 (b5168eb)

- 统计：1 个文件变更，新增 15 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## Add V3.3 changelog - 2026-05-12 (a46fb0d)

- 统计：1 个文件变更，新增 80 行。

### 新增

- 新增 `docs/CHANGELOG-V3.3.md`，记录 V3.3 的页面转场、按钮反馈、点击涟漪与滚动 reveal 更新。

### 调整

- 暂无。

### 修复

- 暂无。

### 删减

- 暂无。

## V3.3 — iOS page transitions, button feedback, ripple, scroll reveal - 2026-05-12 (e7e76c5)

- 统计：4 个文件变更，新增 4 行，删除 937 行。

### 新增

- 补充 `.gitignore` 中与动画调试/设计文档相关的忽略规则。

### 调整

- 调整动画调试与设计草稿的项目归档方式。

### 修复

- 暂无。

### 删减

- 移除 `docs/public/animation-tuner.html` 与 `docs/superpowers/` 下的 V3.3 动画计划/规格草稿。

## V3.2.2 - 2026-05-12 (0f1ce39)

- 统计：2 个文件变更，新增 5 行，删除 5 行。

### 新增

- 补充 EMFT Chapter 3 P I、EMFT Chapter 4 内容。

### 调整

- 调整 EMFT Chapter 3 P I、EMFT Chapter 4 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P I、EMFT Chapter 4 中的旧内容。

## V3.2.1 Opt fix - 2026-05-11 (824d1e5)

- 统计：2 个文件变更，新增 8 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整性能、体积或加载体验。

### 修复

- 修复 项目维护文档 中的问题。

### 删减

- 暂无。

## V3.2 Opt - 2026-05-11 (00bd335)

- 统计：14 个文件变更，新增 1341 行，删除 11 行。

### 新增

- 新增/补充 EMFT Chapter 5 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 4、EMFT Chapter 5 的笔记、README 或配图引用。
- 调整性能、体积或加载体验。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 4、EMFT Chapter 5 中的旧内容。

## V3.1.1 bug fix - 2026-04-30 (1019458)

- 统计：1 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充 EMFT README 内容。

### 调整

- 调整 EMFT README 的笔记、README 或配图引用。

### 修复

- 修复 EMFT README相关问题。

### 删减

- 精简/替换 EMFT README 中的旧内容。

## V3.1 EFMT CH4 - 2026-04-30 (7834d71)

- 统计：12 个文件变更，新增 1424 行，删除 8 行。

### 新增

- 新增/补充 EMFT Chapter 4 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 4 的笔记、README 或配图引用。
- 调整自定义主题组件。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 4 中的旧内容。

## V3.0.1 Size Reduction - 2026-04-30 (ced876a)

- 统计：5957 个文件变更，删除 1020163 行。

### 新增


### 调整

- 调整性能、体积或加载体验。

### 修复

- 暂无。

### 删减

- 清理构建产物、依赖目录、缓存或系统临时文件。
- 移除 DSP .DS_Store、EMFT .DS_Store 中的旧文件或附件。

## V3.0 Performance Optimization - 2026-04-30 (7f8f002)

- 统计：13 个文件变更，新增 770 行，删除 591 行。

### 新增

- 新增/补充 EMFT Chapter 4 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 4 的笔记、README 或配图引用。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整性能、体积或加载体验。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 4 中的旧内容。

## V2.7 MCDONALDS - 2026-04-04 (39b1a94)

- 统计：4 个文件变更，新增 17 行，删除 2 行。

### 新增

- 新增首页或公共展示资源。

### 调整

- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、首页与公共资源 中的旧内容。

## V2.7 CONTAINERS - 2026-04-04 (973559e)

- 统计：7 个文件变更，新增 329 行，删除 100 行。

### 新增

- 补充 EMFT Chapter 3 P II、EMFT Chapter 4 内容。

### 调整

- 调整 EMFT Chapter 3 P II、EMFT Chapter 4 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P II、EMFT Chapter 4 中的旧内容。

## V2.6 Avatars - 2026-03-29 (9d27f45)

- 统计：20 个文件变更，新增 16 行，删除 105 行。

### 新增

- 新增/补充 EMFT Chapter 3 P I、EMFT Chapter 5 相关笔记、图片或附件。

### 调整

- 调整 EMFT .DS_Store、EMFT Chapter 3 P I、EMFT Chapter 5 的笔记、README 或配图引用。
- 调整首页内容与公共资源。
- 调整课程指南页面结构或内容。

### 修复

- 暂无。

### 删减

- 移除 课程指南页面、首页与公共资源 中的旧文件。

## V2.6 Lyrics - 2026-03-29 (9bd0c33)

- 统计：3 个文件变更，新增 12 行，删除 1 行。

### 新增

- 新增/补充 EMFT Chapter 4 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 3 P II、EMFT Chapter 4 的笔记、README 或配图引用。
- 调整界面展示或交互体验。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P II、EMFT Chapter 4 中的旧内容。

## V2.5 EMFT C3P2 - 2026-03-29 (d8bea99)

- 统计：17 个文件变更，新增 1154 行，删除 4 行。

### 新增

- 新增/补充 EMFT Chapter 3 P II 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 3 P II、EMFT README 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P II、EMFT README 中的旧内容。

## V2.5 EPMF Lec1 - 2026-03-27 (6bdca47)

- 统计：14 个文件变更，新增 666 行，删除 2 行。

### 新增

- 新增/补充 EPMF Lecture 1 相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 1 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Lecture 1 中的旧内容。

## V2.5 EPMF Structure - 2026-03-23 (5eef96e)

- 统计：477 个文件变更，新增 12034 行，删除 304 行。

### 新增

- 新增/补充 EPMF Lecture 1、EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4 等 9 项相关笔记、图片或附件。
- 新增构建产物或 VitePress 缓存文件。

### 调整

- 调整 EPMF README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 修正课程结构或目录组织。

### 删减

- 清理构建产物、依赖目录、缓存或系统临时文件。

## V2.5 Hitokoto - 2026-03-21 (cba4d55)

- 统计：3 个文件变更，新增 99 行，删除 31 行。

### 新增

- 新增 主题组件相关内容。

### 调整

- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、首页与公共资源 中的旧内容。

## V2.5 color - 2026-03-21 (f529888)

- 统计：2 个文件变更，新增 267 行，删除 220 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题样式 中的旧内容。

## V2.4 - 2026-03-18 (a9fb80b)

- 统计：5 个文件变更，新增 18 行，删除 6 行。

### 新增

- 新增/补充 EMFT Chapter 3 P II 相关笔记、图片或附件。

### 调整

- 调整 DSP Chapter 7、EMFT Chapter 3 P II 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 DSP Chapter 7、EMFT Chapter 3 P II 中的旧内容。

## V2.3 - 2026-03-18 (b20626b)

- 统计：5 个文件变更，新增 8 行，删除 12 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置、VitePress 自定义主题、主题组件、首页与公共资源 中的旧内容。

## V2.2.1 - 2026-03-17 (b8104d9)

- 统计：9 个文件变更，新增 13 行，删除 1 行。

### 新增

- 新增/补充 EMFT Chapter 3 P I、EMFT Chapter 3 P II、EPMF README 相关笔记、图片或附件。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 3 中的旧文件或附件。

## V2.2 - 2026-03-16 (6b34c1a)

- 统计：16 个文件变更，新增 97 行，删除 50 行。

### 新增

- 新增/补充 DSP Chapter 10、DSP Chapter 8、DSP Chapter 9 相关笔记、图片或附件。

### 调整

- 调整 DSP Chapter 10、DSP Chapter 2、DSP Chapter 3 I、DSP Chapter 3 II 等 12 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 DSP Chapter 10、DSP Chapter 2、DSP Chapter 3 I、DSP Chapter 3 II 等 12 项中的旧内容。

## V2.1 Centering - 2026-03-14 (a6caa08)

- 统计：1 个文件变更，新增 16 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## v1.3 - 2026-03-14 (1b0ae43)

- 统计：1 个文件变更，新增 2 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## v1.2 - 2026-03-14 (e385e07)

- 统计：140 个文件变更，新增 57181 行，删除 6 行。

### 新增

- 新增 npm 依赖目录内容。

### 调整

- 调整首页内容与公共资源。
- 调整 npm 脚本或依赖锁定。

### 修复

- 暂无。

### 删减

- 精简/替换 首页与公共资源、依赖与 npm 脚本 中的旧内容。

## V1.1.1 - 2026-03-13 (e25ef3e)

- 统计：2 个文件变更，新增 5 行，删除 7 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 移除 首页与公共资源 中的旧文件。

## V1.1 - 2026-03-13 (db425ad)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 首页与公共资源 中的旧内容。

## V1.1 - 2026-03-13 (3097cdd)

- 统计：1030 个文件变更，新增 28268 行，删除 67 行。

### 新增

- 新增首页或公共展示资源。
- 新增构建产物或 VitePress 缓存文件。
- 新增 npm 依赖目录内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整首页内容与公共资源。
- 调整 npm 脚本或依赖锁定。

### 修复

- 暂无。

### 删减

- 移除 首页与公共资源 中的旧文件。

## V1 - 2026-03-13 (65a8db5)

- 统计：1 个文件变更，新增 4 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 首页与公共资源 中的旧内容。

## V1 - 2026-03-13 (9741948)

- 统计：2 个文件变更，新增 29 行，删除 45 行。

### 新增

- 新增/补充 AIML EC Lecture 4_tmp.html 相关笔记、图片或附件。

### 调整

- 调整 AIML EC Lecture 4 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 AIML EC Lecture 4、AIML EC Lecture 4_tmp.html 中的旧内容。

## V1 - 2026-03-13 (efbde2f)

- 统计：101 个文件变更，新增 4470 行，删除 19 行。

### 新增

- 新增/补充 AIML README、AIML Assets、AIML EC Lecture 1、AIML EC Lecture 2 等 17 项相关笔记、图片或附件。

### 调整

- 调整 DSP Chapter 3 I 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 AIML README、AIML Assets、AIML EC Lecture 1、AIML EC Lecture 2 等 18 项中的旧内容。
