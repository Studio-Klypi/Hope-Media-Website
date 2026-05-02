<script setup lang="ts">
import { links } from "~/components/navigation/index";
import { Menu } from "@lucide/vue";
import Logo from "~/components/branding/Logo.vue";

const open = ref<boolean>(false);
const { isMobile } = useResponsive();
</script>

<template>
  <UiSheet
    v-if="isMobile"
    v-model:open="open"
  >
    <UiSheetTrigger as-child>
      <UiButton
        size="icon"
        variant="ghost"
      >
        <Menu />
      </UiButton>
    </UiSheetTrigger>

    <UiSheetContent>
      <UiSheetHeader>
        <Logo class="h-5" />
      </UiSheetHeader>

      <div class="flex flex-col gap-1 px-4 *:justify-start">
        <UiButton
          v-for="link in links"
          :key="link.label"
          variant="ghost"
          as-child
          @click="open = false"
        >
          <NuxtLinkLocale
            :to="link.to"
            active-class="bg-accent! text-accent-foreground!"
          >
            {{ $t(`navigation.${link.label}`) }}
          </NuxtLinkLocale>
        </UiButton>
      </div>

      <UiSheetFooter class="flex-row justify-center">
        <UiButton
          variant="ghost"
          size="icon"
        >
          <UiFlag code="fr" />
        </UiButton>
      </UiSheetFooter>
    </UiSheetContent>
  </UiSheet>
  <div
    v-else
    class="flex items-center gap-0.5"
  >
    <UiButton
      v-for="link in links"
      :key="link.label"
      variant="ghost"
      as-child
    >
      <NuxtLinkLocale
        :to="link.to"
        active-class="bg-accent! text-accent-foreground!"
      >
        {{ $t(`navigation.${link.label}`) }}
      </NuxtLinkLocale>
    </UiButton>

    <UiButton
      variant="ghost"
      size="icon"
      class="ml-2"
    >
      <UiFlag code="fr" />
    </UiButton>
  </div>
</template>
