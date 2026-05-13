<script setup lang="ts">
import Ranking from "~/components/display/Ranking.vue";
import type { TestimonialProps } from "~/components/admin/testimonials";

defineProps<TestimonialProps>();
</script>

<template>
  <UiCard class="break-inside-avoid">
    <UiCardHeader>
      <div class="flex items-center gap-1.5">
        <UiAvatar>
          <UiAvatarFallback>{{ testimonial.firstName[0] }}{{ testimonial.lastName[0] }}</UiAvatarFallback>
        </UiAvatar>
        <div class="grid">
          <p class="text-sm font-medium">
            {{ testimonial.firstName }} {{ testimonial.lastName }}
          </p>
          <span class="text-xs text-muted-foreground">— {{ $t("labels.testimonial.role", { role: testimonial.role, company: testimonial.company }) }}</span>
        </div>
      </div>
      <UiCardTitle class="text-lg leading-tight">
        {{ testimonial.content }}
      </UiCardTitle>
    </UiCardHeader>

    <UiCardFooter class="flex-row justify-center">
      <Ranking
        :value="testimonial.ranking"
        :max="5"
        :length="5"
        :normalize="false"
      />
    </UiCardFooter>
  </UiCard>
</template>
