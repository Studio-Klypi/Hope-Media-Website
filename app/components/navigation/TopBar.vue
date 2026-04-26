<script setup lang="ts">
import Menu from "~/components/navigation/Menu.vue";
import Logo from "~/components/branding/Logo.vue";
import type { ComponentProps } from "~/types/generic/components";
import { cn } from "~/lib/utils";
import Wrapper from "~/components/composing/Wrapper.vue";

const props = defineProps<ComponentProps>();
</script>

<template>
  <header :class="cn('z-100 sticky top-0 inset-x-0 flex items-center h-14 @lg/layout:h-16 px-6 bg-background', props.class)">
    <Wrapper class="w-full flex items-center justify-between">
      <NuxtLinkLocale to="/">
        <Logo class="h-5" />
      </NuxtLinkLocale>

      <Menu />
    </Wrapper>
  </header>
</template>
