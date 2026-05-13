<script setup lang="ts">
import type { TestimonialProps } from "~/components/admin/testimonials";

const props = defineProps<TestimonialProps>();

const status = computed(() => {
  if (props.testimonial.publishedAt) return "published";
  if (props.testimonial.rejectedAt) return "rejected";
  return "new";
});
const variant = computed(() => {
  switch (status.value) {
    case "published": return "softDefault";
    case "rejected": return "softDestructive";
    default: return "outline";
  }
});
</script>

<template>
  <UiBadge :variant>
    {{ $t(`admin.testimonials.table.values.${status}`) }}
  </UiBadge>
</template>
