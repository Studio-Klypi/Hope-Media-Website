<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import Wrapper from "~/components/composing/Wrapper.vue";
import TestimonialCard from "~/components/pages/book/TestimonialCard.vue";

const store = useTestimonialStore();
const { testimonials } = storeToRefs(store);

store.load();
</script>

<template>
  <Page
    name="book"
    class="pt-10 pb-20 px-6"
  >
    <Wrapper class="flex flex-col gap-6">
      <header class="flex flex-col @lg/layout:flex-row @lg/layout:justify-between gap-2">
        <h1 class="text-3xl font-extrabold">
          {{ $t("book.title") }}
        </h1>

        <UiButton>
          {{ $t("book.new-testimonial") }}
        </UiButton>
      </header>

      <main class="columns-1 @xl/page:columns-2 @3xl/page:columns-3 space-y-4">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial
        />
      </main>
    </Wrapper>
  </Page>
</template>
