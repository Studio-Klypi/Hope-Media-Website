<script setup lang="ts">
import { formatDate } from "date-fns";
import * as locales from "date-fns/locale";

const { locale } = useI18n();
const store = useDashboardStore();
const { graph, loading } = storeToRefs(store);

store.loadGraph();

const xFormatter = (i: number) => {
  const day = graph.value[i]?.day;
  if (!day) return "";
  return formatDate(day, "dd MMM yyyy", { locale: locales[locale.value] });
};
</script>

<template>
  <UiCard class="@2xl/page:col-span-2">
    <UiCardHeader class="flex justify-between">
      <div class="grid gap-1 5">
        <UiCardTitle>{{ $t("admin.home.views-evolution.title") }}</UiCardTitle>
        <UiCardDescription>{{ $t("admin.home.views-evolution.description") }}</UiCardDescription>
      </div>

      <UiSpinner v-if="loading.graph" />
    </UiCardHeader>

    <UiCardContent>
      <UiChartLine
        :data="graph"
        :config="{
          count: { label: 'Vues', color: 'hsl(var(--chart-1))' },
        }"
        index="day"
        :categories="['count']"
        :x-formatter="xFormatter"
        show-area
      />
    </UiCardContent>
  </UiCard>
</template>
