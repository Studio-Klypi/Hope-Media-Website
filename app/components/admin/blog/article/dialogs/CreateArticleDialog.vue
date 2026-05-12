<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { CreateArticleDialogProps } from "~/components/admin/blog/article/dialogs/index";

withDefaults(defineProps<CreateArticleDialogProps>(), {
  trigger: false,
});

const open = defineModel<boolean>("open", { default: false });
watch(open, (value) => {
  if (!value) return;
  form.resetForm();
});

const store = useBlogStore();
const { loading } = storeToRefs(store);

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    title: z.string().max(255),
  })),
});
const submit = form.handleSubmit(async ({ title }) => {
  open.value = !(await store.create({
    title,
    content: `# ${title}`,
  }));
});
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogTrigger
      v-if="trigger"
      as-child
    >
      <slot />
    </UiDialogTrigger>
    <UiDialogContent>
      <form
        class="grid gap-4"
        @submit="submit"
      >
        <UiDialogHeader>
          <UiDialogTitle>
            {{ $t("btn.new.article") }}
          </UiDialogTitle>
        </UiDialogHeader>

        <UiFormField
          v-slot="{ componentField }"
          name="title"
        >
          <UiFormItem>
            <UiFormLabel>Titre</UiFormLabel>
            <UiFormControl>
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

          <UiButton
            type="submit"
            :disabled="loading.creating"
          >
            {{ $t("btn.create.article") }}
            <UiSpinner v-if="loading.creating" />
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
