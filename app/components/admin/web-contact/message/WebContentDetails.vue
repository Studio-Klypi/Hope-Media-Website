<script setup lang="ts">
import WebContactStatusBadge from "~/components/admin/web-contact/message/WebContactStatusBadge.vue";
import type { WebContactProps } from "~/components/admin/web-contact";

defineProps<WebContactProps>();
</script>

<template>
  <div class="grid gap-6">
    <UiDialogHeader>
      <WebContactStatusBadge :message />

      <UiDialogTitle class="flex flex-col items-start">
        {{ message.subject }}

        <span
          v-if="message.blockedAt || message.blocked"
          class="cursor-pointer text-sm! font-normal! line-through text-muted-foreground hover:text-destructive transition-colors duration-100"
        >{{ message.firstName }} {{ message.lastName }} &lt;{{ message.email }}&gt;</span>
        <NuxtLink
          v-else
          :to="`mailto:${message.email}`"
          class="text-sm! font-normal! underline-offset-4 text-muted-foreground hover:text-primary hover:underline transition-colors duration-100"
        >{{ message.firstName }} {{ message.lastName }} &lt;{{ message.email }}&gt;</NuxtLink>
      </UiDialogTitle>
      <UiEditorRenderer :content="message.message" />
    </UiDialogHeader>

    <template v-if="message.replies?.length">
      <UiCard
        v-for="reply in message.replies"
        :key="reply.id"
      >
        <UiCardContent class="grid gap-2">
          <div class="flex items-center gap-2">
            <UiAvatar class="size-8">
              <UiAvatarFallback class="text-xs">
                {{ reply.firstName[0] }}{{ reply.lastName[0] }}
              </UiAvatarFallback>
            </UiAvatar>

            <p class="font-medium">
              {{ reply.firstName }} {{ reply.lastName }}
            </p>
          </div>
          <UiEditorRenderer :content="reply.message" />
        </UiCardContent>
      </UiCard>
    </template>

    <template v-if="message.blockedAt && message.blocked">
      <UiCard class="border-destructive text-destructive">
        <UiCardHeader>
          <UiCardTitle>{{ $t("admin.web-contact.dialogs.details.banned.title") }}</UiCardTitle>
          <UiCardDescription class="text-destructive/60! dark:text-destructive/40! whitespace-pre-line">
            {{ $t(`admin.web-contact.dialogs.details.banned.description.${message.blocked.reason ? "with-reason" : "no-reason"}`, { author: message.blocked.user!.firstName, reason: message.blocked.reason ?? "-" }) }}
          </UiCardDescription>
        </UiCardHeader>
      </UiCard>
    </template>
  </div>
</template>

<style scoped>

</style>
