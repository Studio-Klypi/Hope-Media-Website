<script setup lang="ts">
import { Instagram, Facebook } from "lucide-vue-next";
import Page from "~/components/composing/Page.vue";
import Logo from "~/components/branding/Logo.vue";

const { instagram, facebook } = useRuntimeConfig().public.social;
</script>

<template>
  <Page
    name="maintenance"
    class="w-full flex flex-col items-center gap-4 min-h-dvh justify-center p-6"
  >
    <p>{{ $t("maintenance.title") }}</p>
    <Logo class="max-h-24 max-w-full" />

    <p>{{ $t("maintenance.description") }}</p>
    <div class="flex flex-col @lg/page:flex-row @lg/page:items-center gap-2">
      <UiButton
        variant="facebook"
        as-child
      >
        <NuxtLink
          :to="facebook"
          target="_blank"
          external
        >
          <Facebook />
          Facebook
        </NuxtLink>
      </UiButton>
      <UiButton
        variant="instagram"
        as-child
      >
        <NuxtLink
          :to="instagram"
          target="_blank"
          external
        >
          <Instagram />
          Instagram
        </NuxtLink>
      </UiButton>
    </div>
  </Page>
</template>
