<script lang="ts">
import { ref } from 'vue'

const sharedHitokotoText = ref(':D 你今天过得如何？')
let pendingHitokoto: Promise<void> | undefined

async function loadHitokoto() {
  if (pendingHitokoto) return pendingHitokoto

  pendingHitokoto = (async () => {
    try {
      const res = await fetch('https://v1.hitokoto.cn')
      const data = await res.json()
      sharedHitokotoText.value = data.hitokoto
    } catch (e) {
      console.error(e)
      sharedHitokotoText.value = ':D 你今天过得如何？'
    }
  })()

  return pendingHitokoto
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'

const hitokotoText = sharedHitokotoText

onMounted(() => {
  try {
    loadHitokoto()
  } catch (e) {
    console.error(e)
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
  margin: 0;
  text-align: center;
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  opacity: 0.95;
}

.hero-hitokoto.mobile-hitokoto {
  margin: 18px auto 0;
  width: min(88vw, 360px);
}

.hero-hitokoto.desktop-hitokoto {
  display: none;
  position: absolute;
  top: calc(50% + 140px);
  left: 50%;
  transform: translateX(-50%);
  width: min(88vw, 360px);
}

@media (min-width: 640px) {
  .hero-hitokoto.mobile-hitokoto {
    margin-top: 22px;
  }

  .hero-hitokoto.desktop-hitokoto {
    top: calc(50% + 172px);
  }
}

@media (min-width: 960px) {
  .hero-hitokoto.mobile-hitokoto {
    display: none;
  }

  .hero-hitokoto.desktop-hitokoto {
    display: block;
    top: calc(50% + 200px);
    width: 360px;
  }
}
</style>
