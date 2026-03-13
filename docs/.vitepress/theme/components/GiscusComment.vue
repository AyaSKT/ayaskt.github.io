<template>
  <div style="margin-top: 2rem">
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
      theme="preferred_color_scheme"
    ></Giscus>
  </div>
</template>
  
  <script setup>
import Giscus from '@giscus/vue'
import { useRoute } from 'vitepress'

const route = useRoute()
</script>