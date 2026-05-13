<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

definePageMeta({
  layout: "maintenance",
});

const store = useUserStore();
const { loading } = storeToRefs(store);

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    email: z.string().email(),
  })),
});
const submit = form.handleSubmit(async (values) => {
  const state = await store.requestCode(values.email);
  if (!state) form.resetForm();
  else navigateTo(useLocalePath()(`/admin/auth/validate-code?email=${values.email}`));
});
</script>

<template>
  <Page
    name="admin.auth.login"
    class="min-h-dvh grid place-items-center"
  >
    <form
      class="grid gap-4 min-w-xs"
      @submit="submit"
    >
      <header>
        <h1 class="text-2xl font-extrabold uppercase">
          Connexion
        </h1>
      </header>

      <main>
        <UiFormField
          v-slot="{ componentField }"
          name="email"
        >
          <UiFormItem>
            <UiFormLabel>Adresse email</UiFormLabel>
            <UiFormControl>
              <UiInput
                type="email"
                v-bind="componentField"
                :disabled="loading.code"
              />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>
      </main>

      <footer class="flex justify-end">
        <UiButton
          type="submit"
          :disabled="loading.code"
        >
          Recevoir un code
          <UiSpinner v-if="loading.code" />
        </UiButton>
      </footer>
    </form>
  </Page>
</template>
