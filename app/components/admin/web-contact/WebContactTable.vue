<script setup lang="ts">
import { columns } from "~/components/admin/web-contact/index";
import type { WebContact } from "~/types/states/web-contact";
import WebContentDetails from "~/components/admin/web-contact/message/WebContentDetails.vue";

const { messages } = storeToRefs(useWebContactStore());

const selectedMessage = ref<Nullable<WebContact>>(null);

function selectMessage(message: Nullable<WebContact>) {
  selectedMessage.value = message;
}
</script>

<template>
  <div>
    <UiDataTable
      :columns="columns()"
      :data="messages"
      :row-action="selectMessage"
    />

    <UiDialog
      :open="!!selectedMessage"
      @update:open="(val) => {
        if (val) return;
        selectMessage(null);
      }"
    >
      <UiDialogContent class="max-w-3xl!">
        <WebContentDetails
          v-if="selectedMessage"
          :message="selectedMessage"
        />

        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton variant="secondary">
              {{ $t("btn.close") }}
            </UiButton>
          </UiDialogClose>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
