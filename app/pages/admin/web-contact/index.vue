<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import { MessageCircleDashed } from "@lucide/vue";
import WebContactTable from "~/components/admin/web-contact/WebContactTable.vue";

const store = useWebContactStore();
const { messages, loading, hasLoaded } = storeToRefs(store);

store.load();
</script>

<template>
  <Page
    name="admin.web-contact.home"
    seo-key="admin.web-contact"
  >
    <main
      v-if="loading.list && !hasLoaded"
      class="h-24 grid place-items-center"
    >
      <UiSpinner />
    </main>
    <main v-else-if="messages.length">
      <WebContactTable />
    </main>
    <UiEmpty v-else>
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <MessageCircleDashed />
        </UiEmptyMedia>

        <UiEmptyTitle>{{ $t("admin.web-contact.empty.title") }}</UiEmptyTitle>
        <UiEmptyDescription>{{ $t("admin.web-contact.empty.description") }}</UiEmptyDescription>
      </UiEmptyHeader>
    </UiEmpty>
  </Page>
</template>
