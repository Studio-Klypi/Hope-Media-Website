<script setup lang="ts">
import type { TestimonialProps } from "~/components/admin/testimonials";
import { Star } from "@lucide/vue";

defineProps<TestimonialProps>();

const open = ref<boolean>(false);
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogContent />
  </UiDialog>
</template>
