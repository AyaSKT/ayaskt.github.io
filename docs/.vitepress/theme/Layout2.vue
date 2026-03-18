<script setup>
import { useRouter } from "vitepress";
import MyLayout from './components/MyLayout.vue';
import { watch, ref } from "vue";

const { route } = useRouter();
const isTransitioning = ref(false);

watch(
  () => route.path,
  () => {
    isTransitioning.value = true;
    // 动画结束后重置状态
    setTimeout(() => {
      isTransitioning.value = false;
    }, 500); // 500ms 要和 CSS 动画时间匹配
  }
);
</script>

<template>
  <MyLayout>
    <template #doc-top>
      <div class="shade" :class="{ 'shade-active': isTransitioning }">
        &nbsp;
      </div>
    </template>
  </MyLayout>
</template>

<style>
.shade {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transition: transform 0.5s ease-in-out;
}

.shade-active {
  opacity: 0;
  animation: shadeAnimation 0.5s ease-in-out;
}

@keyframes shadeAnimation {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(100vh);
  }
}
</style>
