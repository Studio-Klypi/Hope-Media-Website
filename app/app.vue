<script lang="ts" setup>
import "vue-sonner/style.css";
import "flag-icons/css/flag-icons.min.css";
import { Toaster } from "vue-sonner";

useSeoMeta({
  titleTemplate: s => `Hope Media - ${s}`,
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />

    <ClientOnly>
      <Toaster position="bottom-center" />
    </ClientOnly>
  </div>
</template>
