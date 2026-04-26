<script setup lang="ts">
import Ranking from "~/components/display/Ranking.vue";

const lorem = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, quo?",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque doloremque doloribus esse expedita in nihil quia quidem temporibus voluptate!",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores error, exercitationem maiores minima repudiandae?",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi aperiam asperiores, cumque debitis, ea error est eum fuga fugiat illum, labore repudiandae unde vitae.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque minima porro quisquam!",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum laudantium mollitia neque, non pariatur quis sed. A at eum quae veniam! Impedit, quia repellendus.",
];
</script>

<template>
  <UiCard class="break-inside-avoid">
    <UiCardHeader>
      <div class="flex items-center gap-1.5">
        <UiAvatar>
          <UiAvatarFallback>DM</UiAvatarFallback>
        </UiAvatar>
        <div class="grid">
          <p class="text-sm font-medium">
            Damiano Mellone
          </p>
          <span class="text-xs text-muted-foreground">— Rédacteur en Chef</span>
        </div>
      </div>
      <UiCardTitle class="text-lg leading-tight">
        {{ lorem[Math.floor(Math.random() * lorem.length)] }}
      </UiCardTitle>
    </UiCardHeader>

    <UiCardFooter class="flex-row justify-center">
      <Ranking
        :value="4"
        :max="7"
      />
    </UiCardFooter>
  </UiCard>
</template>
