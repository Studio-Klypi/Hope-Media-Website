<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Star } from "@lucide/vue";

const store = usePublicTestimonialStore();
const { loading } = storeToRefs(store);

const open = defineModel<boolean>("open", { default: false });

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    role: z.string(),
    company: z.string(),
    ranking: z.number().min(0).max(5).default(0),
    content: z.string(),
  })),
});
const submit = form.handleSubmit(async (values) => {
  open.value = !(await store.create(values));
});
</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogTrigger as-child>
      <slot />
    </UiDialogTrigger>

    <UiDialogContent>
      <form
        class="grid gap-6"
        @submit="submit"
      >
        <UiDialogHeader>
          <UiDialogTitle>{{ $t("book.dialog.title") }}</UiDialogTitle>
          <UiDialogDescription>{{ $t("book.dialog.description") }}</UiDialogDescription>
        </UiDialogHeader>

        <main class="grid gap-4">
          <div class="grid lg:grid-cols-2 gap-4">
            <UiFormField
              v-slot="{ componentField }"
              name="firstName"
            >
              <UiFormItem>
                <UiFormLabel>{{ $t("book.dialog.fields.first-name") }}</UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>

            <UiFormField
              v-slot="{ componentField }"
              name="lastName"
            >
              <UiFormItem>
                <UiFormLabel>{{ $t("book.dialog.fields.last-name") }}</UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
          </div>

          <UiFormField
            v-slot="{ componentField }"
            name="email"
          >
            <UiFormItem>
              <UiFormLabel>{{ $t("book.dialog.fields.email") }}</UiFormLabel>
              <UiFormControl>
                <UiInput
                  v-bind="componentField"
                  type="email"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <div class="grid lg:grid-cols-2 gap-4">
            <UiFormField
              v-slot="{ componentField }"
              name="role"
            >
              <UiFormItem>
                <UiFormLabel>{{ $t("book.dialog.fields.role") }}</UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>

            <UiFormField
              v-slot="{ componentField }"
              name="company"
            >
              <UiFormItem>
                <UiFormLabel>{{ $t("book.dialog.fields.company") }}</UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
          </div>

          <UiFormField
            v-slot="{ componentField }"
            name="content"
          >
            <UiFormItem>
              <UiFormLabel>{{ $t("book.dialog.fields.content") }}</UiFormLabel>
              <UiFormControl>
                <UiTextarea
                  v-bind="componentField"
                  class="min-h-24 resize-none"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <UiFormField name="ranking">
            <UiFormItem class="flex flex-col">
              <UiFormLabel>{{ $t("book.dialog.fields.ranking") }}</UiFormLabel>

              <UiFormControl>
                <div class="flex items-center">
                  <UiTooltipProvider>
                    <UiTooltip
                      v-for="i in 5"
                      :key="i"
                    >
                      <UiTooltipTrigger as-child>
                        <Star
                          class="cursor-pointer has-[~:hover]:fill-primary has-[~:hover]:stroke-primary hover:fill-primary hover:stroke-primary"
                          :class="{ 'stroke-primary fill-primary': i <= (form.values.ranking ?? 0) }"
                          @click="form.setFieldValue('ranking', i)"
                        />
                      </UiTooltipTrigger>
                      <UiTooltipContent>
                        <p>{{ $t(`labels.testimonial.ranking[${i - 1}]`) }}</p>
                      </UiTooltipContent>
                    </UiTooltip>
                  </UiTooltipProvider>
                </div>
              </UiFormControl>
            </UiFormItem>
          </UiFormField>
        </main>

        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton
              type="button"
              variant="secondary"
            >
              {{ $t("btn.cancel") }}
            </UiButton>
          </UiDialogClose>

          <UiButton :disabled="loading.creating">
            {{ $t("book.dialog.action") }}
            <UiSpinner v-if="loading.creating" />
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
