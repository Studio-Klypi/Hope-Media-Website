<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { QuoteBlock } from "~/components/display/index";

const props = withDefaults(defineProps<QuoteBlock>(), {
  hover: false,
});
</script>

<template>
  <div :class="cn('relative', hover && 'group/quote', props.class)">
    <slot />

    <span class="block size-8 border-l-2 border-t-2 border-foreground absolute -top-4 -left-4 group-hover/quote:-top-2 group-hover/quote:-left-2 transition-all duration-100" />
    <span class="block size-8 border-r-2 border-b-2 border-foreground absolute -bottom-4 -right-4 group-hover/quote:-bottom-2 group-hover/quote:-right-2 transition-all duration-100" />
  </div>
</template>
