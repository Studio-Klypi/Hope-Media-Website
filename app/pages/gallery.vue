<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import Wrapper from "~/components/composing/Wrapper.vue";
import VideoCard from "~/components/pages/gallery/VideoCard.vue";
</script>

<template>
  <Page
    name="gallery"
    class="pt-10 pb-20 px-6"
  >
    <Wrapper class="flex flex-col gap-6">
      <header>
        <h1 class="text-3xl font-extrabold">
          {{ $t("gallery.title") }}
        </h1>
      </header>

      <main class="columns-1 @xl/page:columns-2 @3xl/page:columns-3 space-y-4">
        <VideoCard
          v-for="i in 10"
          :key="i"
        />
      </main>
    </Wrapper>
  </Page>
</template>
