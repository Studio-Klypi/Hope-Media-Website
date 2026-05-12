<script setup lang="ts">
import type { WebContactProps } from "~/components/admin/web-contact";
import { MoreHorizontal, Eye, Reply, X, Ban } from "@lucide/vue";
import ConfirmationDialog from "~/components/dialogs/ConfirmationDialog.vue";
import WebContactDetailsDialog from "~/components/admin/web-contact/message/WebContactDetailsDialog.vue";
import WebContactBanDialog from "~/components/admin/web-contact/message/WebContactBanDialog.vue";

defineProps<WebContactProps>();

const store = useWebContactStore();

const detailsDialogOpen = ref<boolean>(false);
watch(detailsDialogOpen, (val) => {
  if (val) return;
  messageReply.value = false;
});
const messageReply = ref<boolean>(false);

const confirmIgnoreDialog = ref<boolean>(false);
const confirmBanDialog = ref<boolean>(false);
</script>

<template>
  <div>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton
          size="icon-sm"
          variant="ghost"
          class="cursor-pointer"
          @click.prevent.stop
        >
          <MoreHorizontal />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="end">
        <UiDropdownMenuGroup>
          <UiDropdownMenuItem @click="detailsDialogOpen = true">
            <Eye />
            {{ $t("admin.web-contact.table.actions.read") }}
          </UiDropdownMenuItem>
        </UiDropdownMenuGroup>

        <template v-if="!message.repliedAt && !message.ignoredAt && !message.blockedAt">
          <UiDropdownMenuSeparator />

          <UiDropdownMenuGroup>
            <UiDropdownMenuItem
              @click="() => {
                detailsDialogOpen = true;
                messageReply = true;
              }"
            >
              <Reply />
              {{ $t("admin.web-contact.table.actions.reply") }}
            </UiDropdownMenuItem>
            <UiDropdownMenuItem @click="confirmIgnoreDialog = true">
              <X />
              {{ $t("admin.web-contact.table.actions.ignore") }}
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>

          <UiDropdownMenuSeparator />

          <UiDropdownMenuGroup>
            <UiDropdownMenuItem
              variant="destructive"
              @click="confirmBanDialog = true"
            >
              <Ban />
              {{ $t("admin.web-contact.table.actions.block") }}
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <WebContactDetailsDialog
      v-model:open="detailsDialogOpen"
      :message
      :reply="messageReply"
    />
    <WebContactBanDialog
      v-model:open="confirmBanDialog"
      :message
    />
    <ConfirmationDialog
      v-model:open="confirmIgnoreDialog"
      :title="$t('admin.web-contact.dialogs.confirm-ignore.title')"
      :description="$t('admin.web-contact.dialogs.confirm-ignore.description')"
      :action="$t('admin.web-contact.dialogs.confirm-ignore.action')"
      @confirmed="store.ignore(message.id)"
    />
  </div>
</template>
