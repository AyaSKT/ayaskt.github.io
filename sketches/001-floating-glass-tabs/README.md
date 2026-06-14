## Variant: Floating Glass Tabs

### Design stance
把搜索和主导航拆成两个同级玻璃胶囊，主导航内部不再套小胶囊，强调 Apple / SwiftUI 的轻盈层次。

### Key choices
- Layout: 搜索是独立 pill；主导航、外观、外链共用一个外层 pill。
- Typography: 使用系统 sans，保持和 VitePress 兼容。
- Color: 沿用站点的蓝、淡紫、粉色渐变，但降低饱和度。
- Interaction: tab 可打开下拉菜单，选中态使用底部细光条，深浅色按钮可切换预览。

### Trade-offs
- Strong at: 首页第一眼更精致，毛玻璃感明显，层级不再重复。
- Weak at: 横向占位仍偏大，中文导航多时需要移动端横向滚动。

### Best for
- 想让导航成为视觉焦点，而不是仅做轻微默认主题增强。
