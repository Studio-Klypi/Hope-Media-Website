<script setup lang="ts">

</script>

<template>
  <NuxtLinkLocale to="/blog">
    <UiCard class="pt-0 flex-1 overflow-hidden">
      <NuxtImg
        class="aspect-video object-cover"
        src="/images/home/job.png"
      />

      <UiCardHeader>
        <UiCardTitle>Titre de l'article</UiCardTitle>
        <UiCardDescription class="line-clamp-4">
          description sur maximum 4 lignes.
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
