<script setup lang="ts">
import type { ArticleProps } from "~/components/admin/blog";
import { MoreHorizontal, Trash, BookDashed, Upload, Archive, ArchiveX, Edit2 } from "@lucide/vue";
import { ArticleStatus } from "@prisma/client";
import ConfirmationDialog from "~/components/dialogs/ConfirmationDialog.vue";

defineProps<ArticleProps>();

const store = useBlogStore();

const confirmDeleteDialogOpen = ref<boolean>(false);
</script>

<template>
  <div>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <slot>
          <UiButton
            variant="outline"
            size="icon-sm"
          >
            <MoreHorizontal />
          </UiButton>
        </slot>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="end">
        <UiDropdownMenuGroup>
          <NuxtLinkLocale :to="`/admin/blog/article/${article.id}-${article.slug}`">
            <UiDropdownMenuItem>
              <Edit2 />
              {{ $t("admin.blog.articles.table.actions.edit") }}
            </UiDropdownMenuItem>
          </NuxtLinkLocale>
        </UiDropdownMenuGroup>

        <UiDropdownMenuSeparator />

        <UiDropdownMenuGroup>
          <UiDropdownMenuItem
            v-if="article.status === ArticleStatus.PUBLISHED || article.publishedAt"
            :disabled="article.status === ArticleStatus.ARCHIVED"
            @click="store.convertToDraft(article.id)"
          >
            <BookDashed />
            {{ $t("admin.blog.articles.table.actions.convert-to-draft") }}
          </UiDropdownMenuItem>
          <UiDropdownMenuItem
            v-else
            :disabled="article.status === ArticleStatus.ARCHIVED"
            @click="store.publish(article.id)"
          >
            <Upload />
            {{ $t("admin.blog.articles.table.actions.publish") }}
          </UiDropdownMenuItem>

          <UiDropdownMenuItem
            v-if="article.status === ArticleStatus.ARCHIVED"
            @click="store.restore(article.id)"
          >
            <ArchiveX />
            {{ $t("admin.blog.articles.table.actions.restore") }}
          </UiDropdownMenuItem>
          <UiDropdownMenuItem
            v-else
            variant="destructive"
            @click="store.archive(article.id)"
          >
            <Archive />
            {{ $t("admin.blog.articles.table.actions.archive") }}
          </UiDropdownMenuItem>
        </UiDropdownMenuGroup>

        <template v-if="article.status !== ArticleStatus.PUBLISHED">
          <UiDropdownMenuSeparator />

          <UiDropdownMenuGroup>
            <UiDropdownMenuItem
              variant="destructive"
              @click="confirmDeleteDialogOpen = true"
            >
              <Trash />
              {{ $t("admin.blog.articles.table.actions.delete") }}
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <ConfirmationDialog
      v-model:open="confirmDeleteDialogOpen"
      :title="$t('admin.blog.articles.table.dialogs.confirm-delete.title')"
      :description="$t('admin.blog.articles.table.dialogs.confirm-delete.description')"
      :action="$t('admin.blog.articles.table.dialogs.confirm-delete.action')"
      @confirmed="store.delete(article.id)"
    />
  </div>
</template>
