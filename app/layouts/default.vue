<script setup lang="ts">
import Layout from "~/components/composing/Layout.vue";
import TopBar from "~/components/navigation/TopBar.vue";
import BottomBar from "~/components/navigation/BottomBar.vue";
</script>

<template>
  <Layout class="relative flex flex-col min-h-dvh">
    <TopBar />

    <main class="flex-1 min-h-0">
      <NuxtPage />
    </main>

    <BottomBar />
  </Layout>
</template>
