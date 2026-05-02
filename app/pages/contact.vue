<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import Wrapper from "~/components/composing/Wrapper.vue";
import QuoteBlock from "~/components/display/QuoteBlock.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { NAME_REGEX, PHONE_REGEX } from "#shared/constants/regex";
import { MESSAGE_LENGTH, SUBJECT_LENGTH } from "#shared/constants/lengths";

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    firstName: z.string().regex(NAME_REGEX),
    lastName: z.string().regex(NAME_REGEX),
    email: z.string().email(),
    phone: z.string().regex(PHONE_REGEX).optional(),
    subject: z.string().max(SUBJECT_LENGTH),
    message: z.string().max(MESSAGE_LENGTH),
    accept: z.boolean().refine(val => val).default(false),
  })),
});
const valid = useFormValidation(form);
const submit = form.handleSubmit(values => console.log(values));
</script>

<template>
  <Page
    name="contact"
    class="pt-10 pb-20 px-6"
  >
    <Wrapper class="grid @xl/page:grid-cols-2 gap-6">
      <section class="@container/section grid gap-2.5">
        <header>
          <h1 class="text-2xl font-extrabold">
            {{ $t("contact.title") }}
          </h1>
        </header>

        <main>
          <form
            class="grid gap-4"
            @submit="submit"
          >
            <div class="grid @md/section:grid-cols-2 gap-4">
              <UiFormField
                v-slot="{ componentField }"
                name="firstName"
              >
                <UiFormItem>
                  <UiFormLabel>
                    {{ $t("contact.form.fields.first-name") }}
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      type="text"
                      v-bind="componentField"
                    />
                  </UiFormControl>
                </UiFormItem>
              </UiFormField>
              <UiFormField
                v-slot="{ componentField }"
                name="lastName"
              >
                <UiFormItem>
                  <UiFormLabel>
                    {{ $t("contact.form.fields.last-name") }}
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      type="text"
                      v-bind="componentField"
                    />
                  </UiFormControl>
                </UiFormItem>
              </UiFormField>
            </div>

            <div class="grid @md/section:grid-cols-2 gap-4">
              <UiFormField
                v-slot="{ componentField }"
                name="email"
              >
                <UiFormItem>
                  <UiFormLabel>
                    {{ $t("contact.form.fields.email") }}
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      type="email"
                      v-bind="componentField"
                    />
                  </UiFormControl>
                </UiFormItem>
              </UiFormField>
              <UiFormField
                v-slot="{ componentField }"
                name="phone"
              >
                <UiFormItem>
                  <UiFormLabel>
                    {{ $t("contact.form.fields.phone") }} <span class="text-xs text-muted-foreground font-normal!">({{ $t("labels.optional").toLowerCase() }})</span>
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      type="tel"
                      v-bind="componentField"
                    />
                  </UiFormControl>
                </UiFormItem>
              </UiFormField>
            </div>

            <UiFormField
              v-slot="{ componentField }"
              name="subject"
            >
              <UiFormItem>
                <UiFormLabel>
                  {{ $t("contact.form.fields.subject") }}
                </UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="text"
                    v-bind="componentField"
                  />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
            <UiFormField
              v-slot="{ componentField }"
              name="message"
            >
              <UiFormItem>
                <UiFormLabel>
                  {{ $t("contact.form.fields.message") }}
                </UiFormLabel>
                <UiFormControl>
                  <UiTextarea
                    v-bind="componentField"
                    class="min-h-32 resize-none"
                  />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>

            <UiFormField
              v-slot="{ componentField }"
              name="accept"
            >
              <UiFormItem class="flex items-center gap-2">
                <UiFormLabel>
                  {{ $t("contact.form.fields.accept") }}
                </UiFormLabel>
                <UiFormControl>
                  <UiSwitch
                    :model-value="componentField.modelValue"
                    @update:model-value="componentField['onUpdate:modelValue']"
                  />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>

            <div class="flex justify-end">
              <UiButton
                type="submit"
                :disabled="!valid"
              >
                {{ $t("contact.form.action") }}
              </UiButton>
            </div>
          </form>
        </main>
      </section>

      <aside>
        <QuoteBlock class="size-full">
          <NuxtImg
            src="/images/home/job.png"
            class="h-full max-w-full object-cover"
          />
        </QuoteBlock>
      </aside>
    </Wrapper>
  </Page>
</template>
