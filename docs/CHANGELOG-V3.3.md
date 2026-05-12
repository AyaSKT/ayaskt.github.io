# V3.3 更新记录

**日期**: 2026-05-12  
**概述**: 为 VitePress 博客添加 iOS 风格非线性 CSS 过渡效果，零新增依赖。

---

## 新增效果

### 页面切换
- **淡入淡出过渡** (0.8s 桌面 / 0.55s 移动端)
- 使用 View Transitions API (`document.startViewTransition`)
- 导航栏和侧边栏在切换时保持静止（`view-transition-name` 命名快照）
- 仅内容区域淡入淡出

### 按钮点击反馈
- 按下时缩小至 `scale(0.94)`，释放后弹簧回弹
- 站点标题使用更轻柔的缩放 (`scale(0.97)`)

### 涟漪效果
- 点击任意位置产生扩散圆环（DOM 实现，合成器线程动画）
- 替代了原有的 Canvas 粒子系统（约 130 行代码缩减）

### 滚动渐显
- 元素添加 `data-reveal` 属性后，滚入视口时淡入 + 上移
- 支持交错延迟 (`--reveal-i` 自定义属性)

### 搜索框入场动画
- 从搜索栏位置放大弹出 + 淡入

---

## 修改文件

```
docs/.vitepress/theme/
├── style/
│   ├── var.css              — 新增动画缓动曲线和时长 CSS 变量
│   ├── transitions.css       — 🆕 所有动画关键帧和工具类
│   └── index.css             — 导入 transitions.css
├── components/
│   ├── PageTransition.vue    — 🆕 路由监听 + startViewTransition
│   ├── ScrollReveal.vue      — 🆕 IntersectionObserver 滚动渐显
│   └── MouseClick.vue        — Canvas 重写为 DOM 涟漪
├── MyLayout.vue              — 挂载 PageTransition
├── Layout.vue                — 移除与 transitions.css 冲突的样式
└── index.ts                  — 注册新组件

docs/Y3S2/DSP/DSP-README.md  — 移除 confetti 烟花
.gitignore                    — 排除开发文件
```

## 技术要点

- **零 npm 依赖**，所有动画 CSS-first + 微量 JS
- CSS 动画均在合成器线程运行（`transform` + `opacity`）
- 涟漪从 `width`/`height` 动画改为 `transform: scale()`（避免重排）
- 页面过渡无 `setTimeout` 硬编码，使用 `@animationend` 事件 + View Transitions API
- 移动端适配：时长缩至 ~70%，涟漪尺寸缩小

## CSS 变量

```css
--ease-ios-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-ios-slide:  cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-ios-fade:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-ios-press:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
--dur-page: 0.8s;
--dur-tap: 0.15s;
--dur-ripple: 0.8s;
--dur-reveal: 0.5s;
```

## 使用方式

**滚动渐显**：在 Markdown 元素上添加 `data-reveal` 属性：

```html
<div data-reveal>这个元素会在滚入视口时渐显</div>
```
