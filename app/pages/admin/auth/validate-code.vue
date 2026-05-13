<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

definePageMeta({
  layout: "maintenance",
});

const query = useRoute().query;
const email = (query.email ?? "") as string;

const store = useUserStore();
const { loading } = storeToRefs(store);

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    code: z.string().min(6).max(6).regex(/^\d{6}$/),
  })),
  initialValues: {
    code: "",
  },
});
const valid = useFormValidation(form);
const submit = form.handleSubmit(async (values) => {
  const state = await store.login(email, values.code);

  if (!state) form.resetForm();
  else navigateTo(useLocalePath()("/admin"));
});
</script>

<template>
  <Page
    name="admin.auth.validate-code"
    class="min-h-dvh grid place-items-center"
  >
    <form
      class="grid gap-4"
      @submit="submit"
    >
      <header>
        <h1 class="text-2xl font-extrabold">
          Connexion
        </h1>
      </header>

      <main>
        <UiFormField
          v-slot="{ componentField }"
          name="code"
        >
          <UiFormItem>
            <UiFormLabel>Code</UiFormLabel>
            <UiFormControl>
              <UiInputOTP
                v-bind="componentField"
                id="code"
                :maxlength="6"
                pattern="[0-9]*"
              >
                <UiInputOTPGroup>
                  <UiInputOTPSlot :index="0" />
                  <UiInputOTPSlot :index="1" />
                  <UiInputOTPSlot :index="2" />
                  <UiInputOTPSlot :index="3" />
                  <UiInputOTPSlot :index="4" />
                  <UiInputOTPSlot :index="5" />
                </UiInputOTPGroup>
              </UiInputOTP>
            </UiFormControl>
          </UiFormItem>
        </UiFormField>
      </main>

      <footer class="flex justify-center">
        <UiButton
          type="submit"
          :disabled="!valid || loading.login"
        >
          Accéder à mon compte
          <UiSpinner v-if="loading.login" />
        </UiButton>
      </footer>
    </form>
  </Page>
</template>
