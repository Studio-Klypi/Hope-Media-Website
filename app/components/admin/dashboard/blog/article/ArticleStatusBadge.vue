<script setup lang="ts">
import type { ArticleProps } from "~/components/admin/dashboard/blog";
import { ArticleStatus } from "@prisma/client";
import type { BadgeVariants } from "~/components/ui/badge";

const props = defineProps<ArticleProps>();

const variant = computed<BadgeVariants["variant"]>(() => {
  switch (props.article.status) {
    case ArticleStatus.PUBLISHED: return "default";
    case ArticleStatus.ARCHIVED: return "softDestructive";
    default: return "dashed";
  }
});
</script>

<template>
  <UiBadge :variant="variant">
    {{ $t(`admin.blog.articles.table.values.status.${article.status}`) }}
  </UiBadge>
</template>
