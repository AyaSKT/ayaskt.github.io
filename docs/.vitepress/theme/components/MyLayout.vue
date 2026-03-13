<script lang="ts" setup>
// 1. 再次导入必要的组件
import DefaultTheme from 'vitepress/theme'
import MouseClick from "./MouseClick.vue";
import MouseFollower from "./MouseFollower.vue";
</script>

<template>
  <!-- 2. 使用默认主题的布局 -->
  <DefaultTheme.Layout>
    <!-- 3. 利用“layout-top”插槽，将我们的组件注入到所有页面的顶部 -->
    <template #layout-top>
      <MouseFollower />
      <MouseClick />
    </template>
  </DefaultTheme.Layout>
</template>