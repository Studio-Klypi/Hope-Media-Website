<script setup lang="ts">
import type { ConfirmationDialogEmits, ConfirmationDialogProps } from "~/components/dialogs/index";

withDefaults(defineProps<ConfirmationDialogProps>(), {
  trigger: false,
});
defineEmits<ConfirmationDialogEmits>();

const open = defineModel<boolean>("open", { default: false });
</script>

<template>
  <UiAlertDialog v-model:open="open">
    <UiAlertDialogTrigger
      v-if="trigger"
      as-child
    >
      <slot />
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>{{ title }}</UiAlertDialogTitle>
        <UiAlertDialogDescription>{{ description }}</UiAlertDialogDescription>
      </UiAlertDialogHeader>

      <UiAlertDialogFooter>
        <UiAlertDialogCancel>{{ $t("btn.cancel") }}</UiAlertDialogCancel>
        <UiAlertDialogAction @click="$emit('confirmed')">
          {{ action }}
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
