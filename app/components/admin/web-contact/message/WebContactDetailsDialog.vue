<script setup lang="ts">
import type { WebContactDialogProps } from "~/components/admin/web-contact";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import WebContactStatusBadge from "~/components/admin/web-contact/message/WebContactStatusBadge.vue";
import WebContentDetails from "~/components/admin/web-contact/message/WebContentDetails.vue";

const props = defineProps<WebContactDialogProps>();

const store = useWebContactStore();
const { loading } = storeToRefs(store);

const open = defineModel<boolean>("open", { default: false });

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    reply: z.string(),
  })),
});
const submit = form.handleSubmit(async ({ reply }) => {
  if (!props.reply || props.message.repliedAt || props.message.replies?.length) return;

  await store.reply(props.message.id, reply);
});
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogContent class="max-w-3xl!">
      <form
        class="grid gap-6"
        @submit="submit"
      >
        <WebContentDetails :message />

        <template v-if="reply && !message.replies?.length && !message.repliedAt">
          <UiSeparator />

          <UiFormField
            v-slot="{ componentField }"
            name="reply"
          >
            <UiFormItem>
              <UiFormLabel>{{ $t("admin.web-contact.dialogs.details.fields.reply") }}</UiFormLabel>
              <UiFormControl>
                <UiEditor v-bind="componentField" />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>
        </template>

        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton
              type="button"
              variant="secondary"
            >
              {{ $t(`btn.${reply ? "cancel" : "close"}`) }}
            </UiButton>
          </UiDialogClose>

          <UiButton
            v-if="reply"
            :disabled="loading.replying"
          >
            {{ $t("btn.send.default") }}
            <UiSpinner v-if="loading.replying" />
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
