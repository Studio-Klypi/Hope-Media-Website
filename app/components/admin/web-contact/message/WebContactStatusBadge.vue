<script setup lang="ts">
import type { WebContactProps } from "~/components/admin/web-contact";

const props = defineProps<WebContactProps>();

const status = computed(() => {
  if (props.message.repliedAt) return "replied";
  if (props.message.ignoredAt) return "ignored";
  if (props.message.blockedAt) return "blocked";
  return "new";
});
const variant = computed(() => {
  switch (status.value) {
    case "replied": return "softDefault";
    case "ignored": return "secondary";
    case "blocked": return "softDestructive";
    default: return "outline";
  }
});
</script>

<template>
  <UiBadge :variant>
    {{ $t(`admin.web-contact.table.values.status.${status}`) }}
  </UiBadge>
</template>
