<script setup lang="ts">
import type { ComponentProps } from "~/types/generic/components";
import { cn } from "~/lib/utils";

const props = defineProps<ComponentProps>();
</script>

<template>
  <div :class="cn('@container/wrapper w-full max-w-5xl mx-auto', props.class)">
    <slot />
  </div>
</template>
