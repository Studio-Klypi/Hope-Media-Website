<script setup lang="ts">
import { Mail, Heart } from "@lucide/vue";
import { Instagram, Facebook } from "lucide-vue-next";
import Wrapper from "~/components/composing/Wrapper.vue";
import Logo from "~/components/branding/Logo.vue";

const { instagram, facebook } = useRuntimeConfig().public.social;
</script>

<template>
  <footer class="bg-primary text-primary-foreground px-6 py-24">
    <Wrapper class="flex flex-col @xl/layout:flex-row @xl/layout:justify-between @xl/layout:items-center gap-12">
      <section class="flex flex-col items-start gap-3">
        <header class="grid gap-1.5">
          <Logo class="h-6" />

          <p class="text-sm font-semibold">
            {{ $t("footer.caption") }}
          </p>
        </header>

        <div class="flex items-center gap-1 5">
          <UiButton
            variant="ghost"
            size="icon-sm"
            as-child
          >
            <NuxtLink to="mailto:contact@hope-media.fr">
              <Mail />
            </NuxtLink>
          </UiButton>
          <UiButton
            variant="ghost"
            size="icon-sm"
            as-child
          >
            <NuxtLink
              :to="facebook"
              target="_blank"
              external
            >
              <Facebook />
            </NuxtLink>
          </UiButton>
          <UiButton
            variant="ghost"
            size="icon"
            as-child
          >
            <NuxtLink
              :to="instagram"
              target="_blank"
              external
            >
              <Instagram />
            </NuxtLink>
          </UiButton>
        </div>
      </section>

      <section>
        <p class="flex text-sm items-center gap-[1ch]">
          <i18n-t keypath="footer.creation">
            <template #heart>
              <Heart class="fill-current size-4" />
            </template>
            <template #author>
              <UiButton
                variant="link"
                class="text-primary-foreground! p-0"
                as-child
              >
                <NuxtLink
                  to="https://studio-klypi.com"
                  target="_blank"
                  external
                >
                  Studio Klypi
                </NuxtLink>
              </UiButton>
            </template>
          </i18n-t>
        </p>
      </section>
    </Wrapper>
  </footer>
</template>
