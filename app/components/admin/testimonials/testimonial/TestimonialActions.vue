<script setup lang="ts">
import { MoreHorizontal, Check, X } from "@lucide/vue";
import type { TestimonialProps } from "~/components/admin/testimonials";

defineProps<TestimonialProps>();

const store = useTestimonialStore();
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        size="icon-sm"
        variant="ghost"
        @click.prevent.stop
      >
        <MoreHorizontal />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem @click="store.approve(testimonial.id)">
        <Check />
        {{ $t("admin.testimonials.actions.approve") }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="store.reject(testimonial.id)">
        <X />
        {{ $t("admin.testimonials.actions.reject") }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
