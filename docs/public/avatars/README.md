# 首页主题头像

四组头像：`IMG_0490`、`IMG_0489`、`IMG_0233`、`IMG_0232`。

- `*-dark.webp`：用户提供的 HEIC 原图转换为 WebP。
- `*-light.webp`：使用内置 imagegen 工具生成暖白背景版本，再转换为 WebP。
- 首页进入时沿用 `Date.now() % 4` 选择一组；切换主题时使用该组的另一版本。
- 接入位置：`docs/.vitepress/theme/components/MyLayout.vue`；首页默认资源位于 `docs/index.md`。

四张亮色图使用同一编辑提示，各自以对应原图为输入：

> Edit this exact supplied square avatar. Change ONLY the external dark charcoal background behind the character and floating decorations to a uniform warm off-white #FFFEFD, suitable for a light website theme. Preserve the exact character, face, eyes (keep eyes black), hair colors and shapes, clothing, ribbons, accessories, small floating decorations, all outlines, original flat illustration style, original composition and square crop. Do not redraw, add, remove, recolor, or rearrange any character features. No text, borders, shadows, gradients or extra embellishments. Output one square light-background version, matching the original as closely as possible.

亮色版本属于生成式编辑，不保证人物细节逐像素一致；暗色版本保留原始画面。
