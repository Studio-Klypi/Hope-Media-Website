<script setup lang="ts">
import AdminAuditEntry from "~/components/admin/dashboard/audit/AdminAuditEntry.vue";
import type { AdminAuditCardProps } from "~/components/admin/dashboard/audit/index";

withDefaults(defineProps<AdminAuditCardProps>(), {
  maxEntries: 10,
});

const store = useAuditTrailStore();
const { entries, loading } = storeToRefs(store);

store.load();
</script>

<template>
  <UiCard class="gap-4">
    <UiCardHeader class="flex flex-col">
      <UiCardTitle>{{ $t("admin.home.recent-activity") }}</UiCardTitle>
    </UiCardHeader>

    <UiCardContent class="px-4 divide-y">
      <div
        v-if="loading"
        class="h-16 grid place-items-center"
      >
        <AdminAuditEntry
          v-for="i in Math.max(1, maxEntries)"
          :key="`loading-${i}-audit`"
        />
      </div>
      <template v-else>
        <AdminAuditEntry
          v-for="entry in entries.slice(0, Math.max(1, maxEntries))"
          :key="`audit-entry-${entry.id}`"
          :entry
        />
      </template>
    </uicardcontent>
  </uicard>
</template>
