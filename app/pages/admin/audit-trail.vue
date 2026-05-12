<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import AdminAuditEntry from "~/components/admin/dashboard/audit/AdminAuditEntry.vue";

const store = useAuditTrailStore();
const { entries, loading } = storeToRefs(store);

store.load();
</script>

<template>
  <Page
    name="admin.audit-trail"
    seo-key="admin.audit-trail"
    class="flex flex-col gap-4"
  >
    <header>
      <h1 class="text-2xl font-bold">
        {{ $t("admin.audit-trail.title") }}
      </h1>
    </header>

    <main
      v-if="loading"
      class="h-24 grid place-items-center"
    >
      <UiSpinner />
    </main>
    <main v-else>
      <AdminAuditEntry
        v-for="entry in entries"
        :key="entry.id"
        :entry
      />
    </main>
  </Page>
</template>
