## Variant: Compact Segmented Tabs

### Design stance
把 VitePress 右侧导航压成 SwiftUI segmented control 质感，克制、紧凑、最适合落地。

### Key choices
- Layout: 搜索、主导航、工具按钮仍在一行，外层统一毛玻璃背景。
- Typography: 14px 左右，匹配默认 VitePress 导航高度。
- Color: 使用透明白、低饱和品牌蓝和深色模式的冷灰。
- Interaction: tab 下拉、hover、active、深浅色切换都覆盖。

### Trade-offs
- Strong at: 和现有主题兼容度最高，文档页不会抢正文注意力。
- Weak at: 毛玻璃视觉比第一版更收敛。

### Best for
- 想真正替换当前导航右侧，同时保持阅读型博客的安静气质。
