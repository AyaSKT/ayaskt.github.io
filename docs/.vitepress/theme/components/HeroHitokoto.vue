<script setup lang="ts">
import { onMounted, ref } from 'vue'

const hitokotoText = ref(':D 你今天过得如何？')

onMounted(async () => {
  try {
    const res = await fetch('https://v1.hitokoto.cn')
    const data = await res.json()
    hitokotoText.value = data.hitokoto
  } catch (e) {
    console.error(e)
    hitokotoText.value = ':D 你今天过得如何？'
  }
})
</script>

<template>
  <p class="hero-hitokoto">
    {{ hitokotoText }}
  </p>
</template>

<style scoped>
.hero-hitokoto {
  position: absolute;
  top: calc(50% + 140px);
  left: 50%;
  transform: translateX(-50%);
  width: min(88vw, 360px);
  text-align: center;
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  opacity: 0.95;
}

@media (min-width: 640px) {
  .hero-hitokoto {
    top: calc(50% + 172px);
  }
}

@media (min-width: 960px) {
  .hero-hitokoto {
    top: calc(50% + 200px);
    width: 360px;
  }
}
</style>
