<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import ArticleCard from "~/components/pages/home/ArticleCard.vue";
import Wrapper from "~/components/composing/Wrapper.vue";
</script>

<template>
  <Page
    name="blog"
    class="pt-10 pb-20"
  >
    <Wrapper class="flex flex-col gap-6">
      <header>
        <h1 class="text-3xl font-extrabold">
          {{ $t("blog.title") }}
        </h1>
      </header>

      <main class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </main>
    </Wrapper>
  </Page>
</template>
