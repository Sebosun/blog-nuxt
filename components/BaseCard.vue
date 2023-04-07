<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>
<template>
  <component
    :is="tag ? tag : 'div'"
    class="border-solid border-slate-800 dark:border-slate-400 p-2 border-wrap rounded-md my-4 border-2 box-shadow-hover"
  >
    <slot />
  </component>
</template>

<style scoped>
.box-shadow-hover:hover {
  transition: all;
  transition-duration: 0.5s;
  box-shadow: 9px 9px 0 #f85552;
}
.dark .box-shadow-hover:hover {
  box-shadow: 9px 9px 0 #e67e80;
}
</style>
