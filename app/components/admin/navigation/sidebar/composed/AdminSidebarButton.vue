<script setup lang="ts">
import type { AdminSidebarButtonProps } from "~/components/admin/navigation/sidebar";

defineProps<AdminSidebarButtonProps>();
</script>

<template>
  <UiSidebarMenuItem>
    <UiSidebarMenuButton
      as-child
      :tooltip="$t(label)"
    >
      <NuxtLinkLocale
        :to="to"
        :exact-active-class="exact ? 'bg-sidebar-primary! text-sidebar-primary-foreground!' : ''"
        :active-class="!exact ? 'bg-sidebar-primary! text-sidebar-primary-foreground!' : ''"
      >
        <component :is="icon" />
        {{ $t(label) }}
      </NuxtLinkLocale>
    </UiSidebarMenuButton>
  </UiSidebarMenuItem>
</template>
