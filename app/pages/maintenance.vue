<script setup lang="ts">
import { Instagram, Facebook } from "lucide-vue-next";
import Page from "~/components/composing/Page.vue";
import Logo from "~/components/branding/Logo.vue";
import QuoteBlock from "~/components/display/QuoteBlock.vue";

const { instagram, facebook } = useRuntimeConfig().public.social;

definePageMeta({
  layout: "maintenance",
});
</script>

<template>
  <Page
    name="maintenance"
    seo-key="maintenance"
    class="w-full flex flex-col items-center gap-4 min-h-dvh justify-center p-6"
  >
    <Logo class="h-5 text-primary" />

    <h1 class="text-4xl @xl/page:text-5xl @md/page:max-w-sm @lg/page:max-w-md font-extrabold text-pretty text-center">
      {{ $t("maintenance.title") }}
    </h1>

    <QuoteBlock class="mt-10">
      <p class="w-full @md/page:w-sm @lg/page:w-md text-lg text-center">
        “ {{ $t("maintenance.description") }} ”
        <br><span class="text-base text-muted-foreground">— Damiano Mellone</span>
      </p>
    </QuoteBlock>

    <div class="w-full @xs/page:w-auto flex flex-col items-center gap-2 mt-6">
      <p class="text-sm text-center">
        {{ $t("maintenance.waiting") }}
      </p>
      <div class="w-full @xs/page:w-auto flex flex-col @lg/page:flex-row @lg/page:items-center gap-2">
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
    </div>
  </Page>
</template>
