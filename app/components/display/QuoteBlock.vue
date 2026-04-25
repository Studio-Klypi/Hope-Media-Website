<script setup lang="ts">
import type { ComponentProps } from "~/types/generic/components";
import { cn } from "~/lib/utils";

const props = defineProps<ComponentProps>();
</script>

<template>
  <div :class="cn('relative p-4', props.class)">
    <slot />

    <span class="block size-8 border-l-2 border-t-2 border-foreground absolute top-0 left-0" />
    <span class="block size-8 border-r-2 border-b-2 border-foreground absolute bottom-0 right-0" />
  </div>
</template>
