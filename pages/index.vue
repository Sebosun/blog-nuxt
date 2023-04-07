<script setup lang="ts">
const { data: blogPostList } = useAsyncData("blog", () => {
  return queryContent("/blog")
    .only(["author", "_path", "title", "date"])
    .sort({ date: 1 })
    .find();
});
</script>

<template>
  <div class="container">
    <section class="articles">
      <div class="column is-offset-2">
        <!-- TODO group transition -->
        <div v-for="blogPost in blogPostList" :key="blogPost._path">
          <NuxtLink :to="blogPost._path">
            <BaseCard tag="article">
              <div class="">
                <div class="flex gap-4 text-lg lg:text-md items-center">
                  <p>
                    {{ blogPost.date }}
                  </p>
                  <h1 v-if="blogPost.author" class="text-lg dark:text-teal-200">
                    By: {{ blogPost.author }}
                  </h1>
                </div>
                <h3 class="text-lg xl:text-2xl">
                  {{ blogPost.title }}
                </h3>
              </div>
              <div class="text-lg xl:text-2xl">
                {{ blogPost.description }}
              </div>
            </BaseCard>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
