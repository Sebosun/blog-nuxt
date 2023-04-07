<script setup lang="ts">
const route = useRoute();

useHead({
  meta: [{ property: "og:title", content: `${route.meta.title}` }],
});

const isCentered = useState("isCentered");
</script>

<template>
  <div
    class="min-h-screen dark:text-white dark:bg-black font-comfortaa"
    :class="{ 'mx-auto max-w-2xl': isCentered }"
  >
    <div
      class="2xl:max-w-5xl max-w-2xl"
      :class="{ 'ml-10 xl:ml-20': !isCentered }"
    >
      <BaseNav />
      <div class="pt-6 pb-40 dark:bg-black">
        <slot />
      </div>
    </div>
  </div>
</template>
