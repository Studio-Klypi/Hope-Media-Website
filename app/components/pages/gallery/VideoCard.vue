<script setup lang="ts">
const urls = [
  "/videos/home-background.mp4",
];

const video = useTemplateRef("video");

function start() {
  const element = video.value;
  if (!element) return;

  element.currentTime = 0;
  element.play();
}
function stop() {
  const element = video.value;
  if (!element) return;

  element.pause();
  element.currentTime = 0;
}
</script>

<template>
  <div
    class="flex flex-col break-inside-avoid hover:scale-105 transition-transform duration-300"
    @mouseenter="start"
    @mouseleave="stop"
  >
    <video
      ref="video"
      :src="urls[Math.floor(Math.random() * urls.length)]"
      class="block w-full"
      preload="metadata"
      loop
    />

    <div class="px-4 py-2.5">
      <p class="font-semibold">
        Titre de la vidéo
      </p>
      <p class="text-sm text-muted-foreground line-clamp-2">
        Description de la vidéo
      </p>
    </div>
  </div>
</template>
