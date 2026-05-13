<script setup lang="ts">
import type { ArticleProps } from "~/components/admin/blog";

defineProps<ArticleProps>();
</script>

<template>
  <NuxtLinkLocale :to="`/blog/${article.id}-${article.slug}`">
    <UiCard
      class="flex-1 overflow-hidden pt-0"
    >
      <NuxtImg
        v-if="article.banner"
        class="aspect-video w-full object-cover"
        :src="article.banner"
      />
      <span class="aspect-video w-full bg-primary/30" />

      <UiCardHeader>
        <UiCardTitle>{{ article.title }}</UiCardTitle>
        <UiCardDescription class="line-clamp-4">
          {{ article.excerpt }}
        </UiCardDescription>
      </UiCardHeader>

      <UiCardFooter>
        <UiButton
          variant="secondary"
          size="sm"
          class="cursor-pointer"
        >
          {{ $t("home.articles.read-more") }}
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </NuxtLinkLocale>
</template>
