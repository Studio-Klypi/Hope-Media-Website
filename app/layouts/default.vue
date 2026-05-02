<script setup lang="ts">
import Layout from "~/components/composing/Layout.vue";
import TopBar from "~/components/navigation/TopBar.vue";
import BottomBar from "~/components/navigation/BottomBar.vue";
</script>

<template>
  <Layout class="relative">
    <TopBar />

    <NuxtPage />

    <BottomBar />
  </Layout>
</template>
