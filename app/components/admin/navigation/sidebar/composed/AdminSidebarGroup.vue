<script setup lang="ts">
import AdminSidebarButton from "~/components/admin/navigation/sidebar/composed/AdminSidebarButton.vue";
import type { AdminSidebarGroupProps } from "~/components/admin/navigation/sidebar";

defineProps<AdminSidebarGroupProps>();
</script>

<template>
  <UiSidebarGroup>
    <UiSidebarGroupLabel v-if="label">
      {{ $t(label) }}
    </UiSidebarGroupLabel>
    <UiSidebarMenu>
      <AdminSidebarButton
        v-for="item in items"
        :key="item.label"
        :icon="item.icon"
        :label="item.label"
        :to="item.to"
        :exact="item.exact ?? false"
      />
    </UiSidebarMenu>
  </UiSidebarGroup>
</template>
