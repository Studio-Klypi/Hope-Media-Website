<script setup lang="ts">
import Logo from "~/components/branding/Logo.vue";
import { VolumeOff, Volume2 } from "@lucide/vue";
import { useSidebar } from "~/components/ui/sidebar";
import AdminSidebarGroup from "~/components/admin/navigation/sidebar/composed/AdminSidebarGroup.vue";
import { groups } from "~/components/admin/navigation/sidebar/index";

const { open } = useSidebar();
const { paused, toggleSound } = useAdminAudio();
</script>

<template>
  <UiSidebar collapsible="icon">
    <UiSidebarHeader
      class="h-12 items-start justify-center overflow-hidden"
      :class="{ 'px-4': open }"
    >
      <Logo
        :variant="open ? 'long' : 'icon'"
        class="h-5"
        :class="{ 'h-auto w-8': !open }"
      />
    </UiSidebarHeader>

    <UiSidebarContent>
      <AdminSidebarGroup
        v-for="(group, index) in groups"
        :key="group.label ?? `group-${index}`"
        :label="group.label"
        :items="group.items"
      />
    </UiSidebarContent>

    <UiSidebarFooter>
      <UiSidebarMenu>
        <UiSidebarMenuItem>
          <UiSidebarMenuButton
            :tooltip="$t(`admin.navigation.music.${paused ? 'start' : 'stop'}`)"
            @click="toggleSound"
          >
            <component :is="paused ? VolumeOff : Volume2" />
            {{ $t(`admin.navigation.music.${paused ? "start" : "stop"}`) }}
          </UiSidebarMenuButton>
        </UiSidebarMenuItem>
      </UiSidebarMenu>
      <p
        class="text-xs text-muted-foreground text-center truncate"
        :class="{ invisible: !open }"
      >
        v0.0.0-alpha
      </p>
    </UiSidebarFooter>

    <UiSidebarRail />
  </UiSidebar>
</template>
