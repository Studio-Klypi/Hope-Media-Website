<script setup lang="ts">
const store = useDashboardStore();
const { graph, loading } = storeToRefs(store);

store.loadGraph();
</script>

<template>
  <UiCard class="@2xl/page:col-span-2">
    <UiCardHeader class="flex justify-between">
      <UiCardTitle>{{ $t("admin.home.views-evolution") }}</UiCardTitle>

      <UiSpinner v-if="loading.graph" />
    </UiCardHeader>

    <UiCardContent>
      <UiChartLine
        :data="[
          { date: 'Lun', line1: 10 },
          { date: 'Mar', line1: 8 },
          { date: 'Mer', line1: 43 },
          { date: 'Jeu', line1: 21 },
          { date: 'Ven', line1: 53 },
          { date: 'Sam', line1: 22 },
          { date: 'Dim', line1: 0 },
        ]"
        :config="{
          line1: { label: 'Vues', color: 'hsl(var(--chart-1))' },
        }"
        index="date"
        :categories="['line1']"
        show-area
      />
    </UiCardContent>
  </UiCard>
</template>
