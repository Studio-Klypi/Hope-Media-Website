<script setup lang="ts">
import { VolumeOff, Volume2 } from "@lucide/vue";
import Page from "~/components/composing/Page.vue";
import Wrapper from "~/components/composing/Wrapper.vue";
import QuoteBlock from "~/components/display/QuoteBlock.vue";
import ArticleCard from "~/components/pages/home/ArticleCard.vue";
import { WavyBackground } from "~/components/ui/wavy-background";

const muted = ref<boolean>(true);
const video = useTemplateRef("videoRef");
watch(video, (element) => {
  if (!element) return;
  element.volume = 0.2;
}, { immediate: true });

const { style } = useParallax(0.55);

const articleStore = usePublicArticleStore();
const { latest: latestArticles } = storeToRefs(articleStore);
articleStore.load();
</script>

<template>
  <Page
    seo-key="home"
    class="flex flex-col *:px-6 pb-16"
  >
    <section
      id="hero"
      class="p-0!"
    >
      <WavyBackground
        class="w-full px-6"
        :canvas-style="style"
        container-class="h-[calc(100dvh-8rem)]"
      >
        <Wrapper class="flex flex-col items-center gap-4">
          <p class="text-lg text-muted-foreground">
            {{ $t("home.hero.caption") }}
          </p>
          <h1 class="text-5xl @md/page:text-7xl font-extrabold max-w-3xl font-serif text-center leading-tight">
            <i18n-t keypath="home.hero.title[0]">
              <template #speech>
                <span class="text-primary">{{ $t("home.hero.title[1]") }}</span>
              </template>
              <template #hears>
                <span class="text-primary">{{ $t("home.hero.title[2]") }}</span>
              </template>
            </i18n-t>
          </h1>
        </Wrapper>
      </WavyBackground>
    </section>

    <section id="video">
      <Wrapper>
        <QuoteBlock>
          <video
            ref="videoRef"
            src="/videos/teaser.mp4"
            type="video/mp4"
            preload="auto"
            playsinline
            autoplay
            :muted
            loop
          />

          <UiButton
            class="absolute bottom-4 right-4 bg-foreground text-background"
            size="icon-sm"
            @click="muted = !muted"
          >
            <VolumeOff v-if="muted" />
            <Volume2 v-else />
          </UiButton>
        </QuoteBlock>
      </Wrapper>
    </section>

    <section
      id="showcase"
      class="pt-40 pb-24"
    >
      <Wrapper class="grid @3xl/page:items-center @3xl/page:grid-cols-2 gap-8">
        <article class="grid gap-2">
          <h2 class="text-xl font-bold">
            {{ $t("home.showcase.title") }}
          </h2>
          <p class="whitespace-pre-line">
            {{ $t("home.showcase.description") }}
          </p>
        </article>

        <QuoteBlock class="h-min">
          <NuxtImg
            class="block aspect-video object-cover"
            src="/images/home/showcase.png"
          />
        </QuoteBlock>
      </Wrapper>
    </section>

    <section
      id="job"
      class="pb-24"
    >
      <Wrapper class="grid @3xl/page:items-center @3xl/page:grid-cols-2 gap-8">
        <QuoteBlock class="row-start-2 @3xl/page:row-start-auto h-min">
          <NuxtImg
            class="block aspect-video object-cover"
            src="/images/home/job.png"
          />
        </QuoteBlock>

        <article class="grid gap-4">
          <p class="whitespace-pre-line">
            {{ $t("home.job.description") }}
          </p>

          <UiButton class="w-min">
            {{ $t("home.job.cta") }}
          </UiButton>
        </article>
      </Wrapper>
    </section>

    <section
      id="articles"
      class="py-16"
    >
      <Wrapper class="grid gap-4">
        <header class="flex flex-col items-start gap-3 @lg/page:gap-0 @lg/page:flex-row @lg/page:items-center @lg/page:justify-between">
          <h2 class="text-2xl font-bold">
            {{ $t("home.articles.title") }}
          </h2>

          <UiButton
            variant="link"
            class="p-0 h-auto text-foreground! opacity-70 hover:opacity-100 transition-opacity duration-75"
            as-child
          >
            <NuxtLinkLocale to="/blog">
              {{ $t("home.articles.see-all") }}
            </NuxtLinkLocale>
          </UiButton>
        </header>

        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          <ArticleCard
            v-for="article in latestArticles"
            :key="article.id"
            :article
          />
        </div>
      </Wrapper>
    </section>
  </Page>
</template>
