<script lang="ts" setup>
import "flag-icons/css/flag-icons.min.css";

useSeoMeta({
  titleTemplate: s => `Hope Media - ${s}`,
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>
