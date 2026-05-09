<script setup lang="ts">
import { AdminAudioKey } from "~/composables/useAdminAudio";

const music = useTemplateRef("music-player");
const paused = ref<boolean>(true);

function toggleSound() {
  if (!music.value) return;

  music.value.volume = 0.01;

  if (paused.value) {
    music.value.play();
    paused.value = false;
  }
  else {
    music.value.pause();
    paused.value = true;
  }
}

provide(AdminAudioKey, { paused, toggleSound });
</script>

<template>
  <slot />
  <audio
    ref="music-player"
    src="/musics/official-sound-track.mp3"
    class="invisible absolute"
    loop
  />
</template>
