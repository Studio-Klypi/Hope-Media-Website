<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import type { Article } from "~/types/states/blog";
import Wrapper from "~/components/composing/Wrapper.vue";

const slug = useRoute().params.articleSlug as string;
const article = ref<Article>();

article.value = await usePublicArticleStore().loadArticle(slug);
</script>

<template>
  <Page
    name="blog.reader"
    class="pt-10 pb-20 px-6"
  >
    <Wrapper class="flex flex-col gap-8">
      <template v-if="article">
        <NuxtImg
          v-if="article.banner"
          class="w-full h-24 object-cover"
          :src="article.banner"
        />

        <header>
          <h1 class="text-4xl font-extrabold">
            {{ article.title }}
          </h1>
          <p
            v-if="article.excerpt"
            class="text-muted-foreground"
          >
            {{ article.excerpt }}
          </p>
        </header>

        <main>
          <UiEditorRenderer :content="article.content" />
        </main>
      </template>
      <UiEmpty v-else />
    </Wrapper>
  </Page>
</template>
