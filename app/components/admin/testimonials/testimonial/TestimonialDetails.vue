<script setup lang="ts">
import { Star, ChevronDown, Check, X } from "@lucide/vue";
import type { TestimonialProps } from "~/components/admin/testimonials";
import Ranking from "~/components/display/Ranking.vue";

defineProps<TestimonialProps>();

const store = useTestimonialStore();
</script>

<template>
  <UiDialogHeader>
    <UiDialogTitle>{{ $t("admin.testimonials.dialogs.details.title", { name: `${testimonial.firstName} ${testimonial.lastName}` }) }}</UiDialogTitle>
    <Ranking
      :value="testimonial.ranking"
      :max="5"
    />
  </UiDialogHeader>

  <UiEditorRenderer :content="testimonial.content" />

  <UiDialogFooter>
    <UiDialogClose as-child>
      <UiButton variant="secondary">
        {{ $t("btn.close") }}
      </UiButton>
    </UiDialogClose>

    <UiDropdownMenu v-if="!testimonial.publishedAt && !testimonial.rejectedAt">
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">
          {{ $t("admin.testimonials.dialogs.details.actions") }} <ChevronDown />
        </UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent>
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
  </UiDialogFooter>
</template>
