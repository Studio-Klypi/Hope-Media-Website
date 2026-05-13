<script setup lang="ts">
import AdminStatCard from "~/components/admin/dashboard/stats/AdminStatCard.vue";

const store = useDashboardStore();
const { stats, loading } = storeToRefs(store);

store.loadStats();
</script>

<template>
  <section class="grid @lg/page:grid-cols-2 @2xl:grid-cols-4 gap-6 @xl/page:col-span-2 @2xl/page:col-span-3">
    <AdminStatCard
      :value="stats.views"
      label="total-views"
      :loading="loading.stats"
    />
    <AdminStatCard
      :value="stats.messages"
      label="new-messages"
      :loading="loading.stats"
    />
    <AdminStatCard
      :value="stats.testimonials.new"
      label="new-testimonials"
      :loading="loading.stats"
    />
    <AdminStatCard
      :value="stats.testimonials.public"
      label="validated-testimonials"
      :loading="loading.stats"
    />
  </section>
</template>
