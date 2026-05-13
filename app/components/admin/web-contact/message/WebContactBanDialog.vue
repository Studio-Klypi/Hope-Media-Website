<script setup lang="ts">
import type { WebContactProps } from "~/components/admin/web-contact";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const { t } = useI18n();

const reasonTemplates = [
  "none",
  "spam",
  "scam",
  "other",
] as const;

const props = defineProps<WebContactProps>();

const store = useWebContactStore();
const { loading } = storeToRefs(store);

const open = defineModel<boolean>("open", { default: false });

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    reason: z.string().optional(),
  })),
});
const submit = form.handleSubmit(async ({ reason }) => {
  open.value = !await store.block(props.message.id, reason);
});

const selectedValue = ref<"none" | "spam" | "scam" | "other">("none");
watch(selectedValue, (value) => {
  switch (value) {
    case "spam": case "scam": {
      form.setFieldValue("reason", t(`admin.web-contact.dialogs.confirm-ban.fields.reason.values.${value}`));
      break;
    }
    default: {
      form.setFieldValue("reason", undefined);
      break;
    }
  }
}, { immediate: true });
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogContent>
      <form
        class="grid gap-4"
        @submit="submit"
      >
        <UiDialogHeader>
          <UiDialogTitle>
            {{ $t("admin.web-contact.dialogs.confirm-ban.title") }}
          </UiDialogTitle>
          <UiDialogDescription>
            {{ $t("admin.web-contact.dialogs.confirm-ban.description", { "contact-email": message.email }) }}
          </UiDialogDescription>
        </UiDialogHeader>

        <UiFormField
          v-slot="{ componentField }"
          name="reason"
        >
          <UiFormItem>
            <UiFormLabel>{{ $t("admin.web-contact.dialogs.confirm-ban.fields.reason.label") }} <span class="text-muted-foreground font-base">({{ $t("labels.optional").toLowerCase() }})</span></UiFormLabel>

            <UiSelect v-model="selectedValue">
              <UiSelectTrigger class="w-full">
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem
                  v-for="template in reasonTemplates"
                  :key="template"
                  :value="template"
                >
                  {{ $t(`admin.web-contact.dialogs.confirm-ban.fields.reason.options.${template}`) }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>

            <UiFormControl v-if="selectedValue === 'other'">
              <UiInput v-bind="componentField" />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>

        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton
              type="button"
              variant="secondary"
            >
              {{ $t("btn.cancel") }}
            </UiButton>
          </UiDialogClose>

          <UiButton :disabled="loading.blocking">
            {{ $t("admin.web-contact.dialogs.confirm-ban.action") }}
            <UiSpinner v-if="loading.blocking" />
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
