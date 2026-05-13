<script setup lang="ts">
import { LogOut } from "@lucide/vue";

const store = useUserStore();
const { user } = storeToRefs(store);
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiAvatar
        v-if="user"
        class="cursor-pointer"
      >
        <UiAvatarFallback>
          {{ user.firstName[0] }}{{ user.lastName[0] }}
        </UiAvatarFallback>
      </UiAvatar>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem
        variant="destructive"
        @click="store.logout()"
      >
        <LogOut />
        {{ $t("admin.navigation.user.logout") }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
