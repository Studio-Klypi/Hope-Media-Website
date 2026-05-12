<script setup lang="ts">
import { Newspaper, Search, Plus } from "@lucide/vue";
import Page from "~/components/composing/Page.vue";
import ArticlesTable from "~/components/admin/blog/ArticlesTable.vue";
import CreateArticleDialog from "~/components/admin/blog/article/dialogs/CreateArticleDialog.vue";

const store = useBlogStore();
const { articles, loading, hasLoaded } = storeToRefs(store);

const newArticleDialogOpen = ref<boolean>(false);

store.loadArticles();
</script>

<template>
  <Page
    name="admin.articles.list"
    class="flex flex-col gap-4"
  >
    <div
      v-if="loading.list && !hasLoaded"
      class="grid place-items-center h-24"
    >
      <UiSpinner />
    </div>
    <template v-else-if="articles.length">
      <header class="flex items-center gap-2">
        <div class="relative flex-1">
          <UiInput
            class="pl-9 peer/search"
            :placeholder="$t('labels.search')"
            disabled
          />
          <Search class="pointer-events-none size-4 text-muted-foreground absolute left-2.5 top-2.5 peer-disabled/search:opacity-50" />
        </div>

        <UiButton @click="newArticleDialogOpen = true">
          <Plus />
          {{ $t("btn.new.article") }}
        </UiButton>
      </header>

      <main>
        <ArticlesTable />
      </main>
    </template>
    <UiEmpty v-else>
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <Newspaper />
        </UiEmptyMedia>

        <UiEmptyTitle>{{ $t("admin.blog.articles.empty.title") }}</UiEmptyTitle>
        <UiEmptyDescription>{{ $t("admin.blog.articles.empty.description") }}</UiEmptyDescription>
      </UiEmptyHeader>

      <UiEmptyContent>
        <UiButton @click="newArticleDialogOpen = true">
          <Plus />
          {{ $t("btn.new.article") }}
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>

    <CreateArticleDialog v-model:open="newArticleDialogOpen" />
  </Page>
</template>
