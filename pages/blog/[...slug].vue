<script setup lang="ts">
const { path } = useRoute();

const { data: blogPost } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne();
});
</script>

<template>
  <main>
    <div v-if="blogPost">
      <h1 class="text-6xl">{{ blogPost.title }}</h1>

      <h2 class="text-4xl py-4">
        {{ blogPost.author }}
      </h2>
    </div>
    <BaseArticle />
  </main>
</template>

<style>
.blog-post-card {
  padding-top: 2.5rem;
  padding-bottom: 3rem;
}

.blog-post-card .card-content {
  padding: 1rem;
}

.blog-post-card .title {
  margin-bottom: 1rem;
}

.footnotes {
  padding-top: 1rem;
  margin-top: 3rem;
}

.footnotes::before {
  border-top: 1px solid;
  max-width: 50%;
  content: "";
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
}
</style>
