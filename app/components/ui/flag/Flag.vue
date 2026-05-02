<script setup lang="ts">
import type { FlagProps } from "~/components/ui/flag/index";
import { cn } from "~/lib/utils";

const props = defineProps<FlagProps>();
</script>

<template>
  <span :class="cn(`fi fi-${code} rounded-xs`, props.class)" />
</template>
