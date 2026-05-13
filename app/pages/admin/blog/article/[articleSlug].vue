<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { watchOnce } from "@vueuse/core";

const slug = useRoute().params.articleSlug as string;

const store = useBlogStore();
const { articles, loading } = storeToRefs(store);

const article = computed(() => articles.value.find((a) => {
  const [id, ...rest] = slug.split("-");

  return a.slug === rest.join("-") && a.id === Number(id);
}));
watchOnce(article, (value) => {
  if (!value) return;
  form.resetForm({
    values: {
      title: value.title,
      content: value.content,
    },
  });
});

if (!articles.value.length) store.loadArticles();

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    title: z.string(),
    content: z.string(),
  })),
  initialValues: {
    title: article.value?.title ?? undefined,
    content: article.value?.content ?? undefined,
  },
});
const { valid, touched } = useFormUtils(form);
const submit = form.handleSubmit(async (values) => {
  if (!article.value) return;
  await store.save(article.value.id, values);
});

const canSave = computed(() => valid.value && touched.value);

useKeyboardShortcuts({
  keys: [["Meta", "S"], ["Ctrl", "S"]],
  handler: () => {
    if (!canSave.value) return;
    submit();
    },
  preventDefault: true,
});
</script>

<template>
  <Page
    :name="`admin.blog.articles.${slug}`"
    class="flex-1 flex flex-col"
  >
    <div
      v-if="loading.list && !article"
      class="h-24 grid place-items-center"
    >
      <UiSpinner />
    </div>
    <template v-else-if="article">
      <form
        class="flex-1 flex flex-col gap-4"
        @submit="submit"
      >
        <header class="flex items-center gap-4">
          <UiFormField
            v-slot="{ componentField }"
            name="title"
          >
            <UiFormItem class="flex-1">
              <UiFormControl>
                <UiInput
                  v-bind="componentField"
                  class="h-auto p-0 border-none shadow-none text-3xl! font-bold"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <UiButton :disabled="loading.saving || !canSave">
            {{ $t("btn.save") }}
            <UiSpinner v-if="loading.saving" />
          </UiButton>
        </header>

        <main class="flex-1">
          <UiFormField
            v-slot="{ componentField }"
            name="content"
          >
            <UiFormItem class="min-h-full">
              <UiFormControl>
                <UiEditor v-bind="componentField" />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>
        </main>
      </form>
    </template>
    <UiEmpty v-else>
      <UiEmptyHeader>
        <UiEmptyTitle>C'est vide par ici...</UiEmptyTitle>
        <UiEmptyDescription>Il semblerait que l'article que vous souhaitez éditer n'ai pas été trouvé.</UiEmptyDescription>
      </UiEmptyHeader>

      <UiEmptyContent>
        <UiButton as-child>
          <NuxtLinkLocale to="/admin/blog">
            Retour à la liste
          </NuxtLinkLocale>
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </Page>
</template>
