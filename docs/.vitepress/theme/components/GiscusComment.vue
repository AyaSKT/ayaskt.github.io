<template>
  <div class="giscus-comment">
    <Giscus
      id="comments"
      :key="route.path"
      repo="AyaSKT/notes"
      repo-id="R_kgDORmImBg"
      category="Announcements"
      category-id="DIC_kwDORmImBs4C4Trq"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      lang="zh-CN"
      loading="lazy"
      :theme="theme"
    ></Giscus>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Giscus from '@giscus/vue'
import { useRoute, useData, withBase } from 'vitepress'

const route = useRoute()
const { isDark } = useData()

// 主题样式表由 giscus.app 的 iframe 跨域加载：线上 GitHub Pages 自带
// Access-Control-Allow-Origin，开发服务器的放行写在 config.mts 的 vite.server.cors。
const theme = computed(() => {
  if (typeof window === 'undefined') return isDark.value ? 'dark' : 'light'
  const file = isDark.value ? 'giscus/aya-dark.css' : 'giscus/aya-light.css'
  return new URL(withBase(`/${file}`), window.location.origin).href
})
</script>

<style scoped>
/* giscus 主题给 iframe 内部留了 10px 边距放阴影，这里向外扩回去，评论框与正文左右对齐 */
.giscus-comment {
  position: relative;
  margin: 3rem -10px 0;
}

.giscus-comment::before {
  content: "";
  position: absolute;
  top: -1.5rem;
  left: 10px;
  right: 10px;
  height: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent) 0.8px, transparent 1px);
  background-size: 6px 1px;
  mask-image: linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%);
}

.giscus-comment :deep(giscus-widget) {
  display: block;
}
</style>
