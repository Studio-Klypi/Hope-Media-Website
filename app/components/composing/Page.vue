<script setup lang="ts">
import type { PageProps } from "~/components/composing/index";
import { cn } from "~/lib/utils";

const { t } = useI18n();
const props = withDefaults(defineProps<PageProps>(), {
  name: "home",
});

useSeoMeta({
  title: props.seoKey ? t(`${props.seoKey}.seo.title`) : props.seoData?.title || "Hope Media",
  description: props.seoKey ? t(`${props.seoKey}.seo.description`) : props.seoData?.title || "Description",
  author: "Hope Media",
});
</script>

<template>
  <main
    :data-page-name="name"
    :class="cn('@container/page', props.class)"
  >
    <slot />
  </main>
</template>
