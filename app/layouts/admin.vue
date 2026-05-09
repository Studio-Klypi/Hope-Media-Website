<script setup lang="ts">
import Layout from "~/components/composing/Layout.vue";
import AdminSidebar from "~/components/admin/navigation/sidebar/AdminSidebar.vue";
import AdminUser from "~/components/admin/navigation/sidebar/AdminUser.vue";
import AdminAudioProvider from "~/components/admin/AdminAudioProvider.vue";

const { time } = useCurrentTime(true);
</script>

<template>
  <Layout name="admin">
    <AdminAudioProvider>
      <UiSidebarProvider :default-open="false">
        <AdminSidebar />

        <UiSidebarInset class="flex flex-col">
          <header class="sticky top-0 z-10 h-12 px-2 bg-background flex items-center gap-2 border-b">
            <UiSidebarTrigger />
            <p class="text-sm">
              {{ $t("admin.home.title") }}
            </p>

            <div class="ml-auto flex items-center gap-2">
              <UiBadge
                variant="softDefault"
                class="capitalize"
              >
                {{ time }}
              </UiBadge>

              <AdminUser />
            </div>
          </header>

          <main class="p-4 flex-1 flex flex-col min-h-0">
            <NuxtPage />
          </main>
        </UiSidebarInset>
      </UiSidebarProvider>
    </AdminAudioProvider>
  </Layout>
</template>
