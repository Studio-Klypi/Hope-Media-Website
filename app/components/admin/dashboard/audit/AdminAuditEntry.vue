<script setup lang="ts">
import { formatDate } from "date-fns";
import * as locales from "date-fns/locale";
import type { AdminAuditEntryProps } from "~/components/admin/dashboard/audit/index";

const { locale } = useI18n();

defineProps<AdminAuditEntryProps>();
</script>

<template>
  <UiItem class="py-1 px-2">
    <UiItemContent class="gap-0">
      <UiItemTitle>
        <template v-if="entry">
          {{ $t(`admin.audit.${entry.type}`, {
            author: entry.user?.firstName,
            user: entry.data?.user?.firstName ?? entry.data?.firstName,
            code: entry.data?.code,
          }) }}
        </template>
        <UiSkeleton
          v-else
          :style="{ width: `${5 + Math.round(Math.random() * 5)}ch` }"
          class="h-[2ch]"
        />
      </UiItemTitle>
      <UiItemDescription class="capitalize">
        <template v-if="entry">
          {{ formatDate(entry.createdAt, "dd MMM yyyy, HH:mm", { locale: locales[locale] }) }}
        </template>
        <UiSkeleton
          v-else
          :style="{ width: `${10 + Math.round(Math.random() * 10)}ch` }"
          class="h-[1.35ch]"
        />
      </UiItemDescription>
    </UiItemContent>
  </UiItem>
</template>
