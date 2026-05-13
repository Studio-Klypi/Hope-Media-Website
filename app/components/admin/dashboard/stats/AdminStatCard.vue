<script setup lang="ts">
import type { AdminStatCardProps } from "~/components/admin/dashboard/stats/index";

defineProps<AdminStatCardProps>();
</script>

<template>
  <UiCard>
    <UiCardHeader>
      <UiCardDescription>
        {{ $t(`admin.home.stats.${label}`) }}
      </UiCardDescription>
      <UiCardTitle class="text-4xl font-black">
        <UiSkeleton
          v-if="loading"
          class="w-[4ch] h-[1ch]"
        />
        <template v-else>
          {{ Math.max(0, value) }}
        </template>
      </UiCardTitle>
    </UiCardHeader>
  </UiCard>
</template>

<style scoped>

</style>
