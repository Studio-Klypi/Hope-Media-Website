<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import TestimonialTable from "~/components/admin/testimonials/TestimonialTable.vue";

const store = useTestimonialStore();
const { testimonials, loading, hasLoaded } = storeToRefs(store);

store.load();
</script>

<template>
  <Page name="admin.testimonials.index">
    <div
      v-if="loading.list && !hasLoaded"
      class="h-24 grid place-items-center"
    >
      <UiSpinner />
    </div>
    <main v-else-if="testimonials.length">
      <TestimonialTable />
    </main>
    <UiEmpty v-else />
  </Page>
</template>
