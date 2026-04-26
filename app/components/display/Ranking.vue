<script setup lang="ts">
import { Star, StarHalf } from "@lucide/vue";
import type { RankingProps } from "~/components/display/index";

const props = withDefaults(defineProps<RankingProps>(), {
  length: 5,
  normalize: true,
});

const normalized = computed(() => {
  if (!props.normalize) return props.value;
  return Math.round((props.value * props.length) / props.max * 10) / 10;
});
const result = computed(() => Math.floor(normalized.value));
const rest = computed(() => normalized.value % props.length);
</script>

<template>
  <div class="flex items-center">
    <div
      v-for="i in length"
      :key="i"
      class="relative"
    >
      <Star
        class="size-4 text-muted-foreground"
        :class="{ 'text-primary fill-current': i <= result }"
      />
      <StarHalf
        v-if="i - 1 === result && rest >= 0.5"
        class="size-4 absolute top-0 left-0 text-primary fill-current"
      />
    </div>
  </div>
</template>
