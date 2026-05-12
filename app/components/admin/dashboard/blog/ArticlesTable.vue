<script setup lang="ts">
import { columns } from "~/components/admin/dashboard/blog/index";

const store = useBlogStore();
const { articles } = storeToRefs(store);
</script>

<template>
  <UiDataTable
    :columns="columns()"
    :data="articles"
    row-link="/admin/blog/article/{id}-{slug}"
    :row-link-replacements="{
      id: 'id',
      slug: 'slug',
    }"
  />
</template>
