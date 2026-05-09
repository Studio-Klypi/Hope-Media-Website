<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import QuoteBlock from "~/components/display/QuoteBlock.vue";
import AdminStatBlock from "~/components/admin/dashboard/stats/AdminStatBlock.vue";
import AdminAuditCard from "~/components/admin/dashboard/audit/AdminAuditCard.vue";
import AdminChartCard from "~/components/admin/dashboard/chart/AdminChartCard.vue";

const { user } = storeToRefs(useUserStore());
const { time } = useCurrentTime();

const period = useDayPeriod();
</script>

<template>
  <Page
    name="admin.home"
    class="grid gap-4"
  >
    <header class="flex items-center justify-between py-3 @lg/page:px-4">
      <div class="grid gap-1">
        <h1 class="text-3xl font-extrabold">
          <i18n-t :keypath="`admin.home.welcome.title[${period}]`">
            <template #name>
              <span class="text-primary">{{ user?.firstName }}</span>
            </template>
          </i18n-t>
        </h1>
        <p class="text-muted-foreground">
          {{ $t(`admin.home.welcome.description[${period}]`) }}
        </p>
      </div>

      <QuoteBlock>
        <p class="text-3xl text-center w-[8ch] font-bold">
          {{ time }}
        </p>
      </QuoteBlock>
    </header>

    <main class="grid gap-6 items-start @xl/page:grid-cols-2 @2xl/page:grid-cols-3">
      <AdminStatBlock />
      <AdminChartCard />
      <AdminAuditCard :max-entries="5" />
    </main>
  </page>
</template>
