<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import Logo from "~/components/branding/Logo.vue";
import Wrapper from "~/components/composing/Wrapper.vue";
import { MessageCircle, HandFist, Video, Camera, Clapperboard, Mic, ChartNoAxesCombined } from "@lucide/vue";

definePageMeta({
  layout: "maintenance",
});
</script>

<template>
  <Page
    name="presentation-document"
    seo-key="presentation-doc"
    class="flex flex-col pt-10 @xl/layout:pt-20"
  >
    <header class="flex justify-center">
      <Logo
        variant="long"
        class="h-12"
      />
    </header>

    <section
      id="presentation"
      class="pt-28 pb-14 px-6 @lg/layout:px-10 @2xl/layout:px-20"
    >
      <Wrapper class="max-w-none grid @4xl/layout:grid-cols-10 gap-6 @4xl/layout:gap-4">
        <h1 class="text-4xl @xl/layout:text-5xl @3xl/layout:text-6xl font-extrabold @4xl/layout:col-span-5">
          <i18n-t keypath="presentation-doc.title[0]">
            <template #highlight>
              <span class="text-primary font-black">{{ $t("presentation-doc.title[1]") }}</span>
            </template>
          </i18n-t>
        </h1>

        <p class="whitespace-pre-line text-lg @4xl/layout:col-span-4 @4xl/layout:col-start-7">
          <i18n-t keypath="presentation-doc.description[0]">
            <template #tv>
              <span class="text-primary font-bold">{{ $t("presentation-doc.description[1]") }}</span>
            </template>
            <template #radio>
              <span class="text-primary font-bold">{{ $t("presentation-doc.description[2]") }}</span>
            </template>
            <template #amazing>
              <span class="text-primary font-bold">{{ $t("presentation-doc.description[3]") }}</span>
            </template>
            <template #no-talk>
              <span class="text-primary font-bold">{{ $t("presentation-doc.description[4]") }}</span>
            </template>
          </i18n-t>
        </p>
      </Wrapper>
    </section>

    <section
      id="tagline"
      class="py-14 px-6 @lg/layout:px-10 @2xl/layout:px-20"
    >
      <Wrapper class="max-w-none flex flex-col items-center">
        <video
          :src="useRuntimeConfig().public.teaser.url"
          autoplay
          muted
          loop
          preload="metadata"
          class="w-full max-w-7xl block aspect-video rounded-3xl bg-primary"
        />

        <UiCard class="max-w-[calc(100%-4rem)] @xl/layout:max-w-3xl w-full -mt-6 @lg/layout:-mt-8">
          <UiCardContent class="flex flex-col items-start @xl/layout:flex-row @xl/layout:items-center gap-4">
            <HandFist class="shrink-0 size-8 text-bomb mx-auto @lg/layout:mx-0" />

            <p class="text-xl">
              <i18n-t keypath="presentation-doc.tagline[0]">
                <template #need-you>
                  <span class="text-primary font-bold">{{ $t("presentation-doc.tagline[1]") }}</span>
                </template>
              </i18n-t>
            </p>
          </UiCardContent>
        </UiCard>
      </Wrapper>
    </section>

    <section
      id="services"
      class="flex flex-col items-center gap-6 px-6 @lg/layout:px-10 @2xl/layout:px-20 py-14"
    >
      <h2 class="text-lg font-bold">
        {{ $t("presentation-doc.services.title") }}
      </h2>

      <Wrapper class="max-w-none grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        <UiCard>
          <UiCardContent class="flex flex-col items-center justify-center">
            <Video class="size-6 text-bomb" />
          </UiCardContent>

          <UiCardHeader>
            <UiCardTitle>{{ $t("presentation-doc.services.face-cam.title") }}</UiCardTitle>
            <UiCardDescription>{{ $t("presentation-doc.services.face-cam.description") }}</UiCardDescription>
          </UiCardHeader>
        </UiCard>
        <UiCard>
          <UiCardContent class="flex flex-col items-center justify-center">
            <Camera class="size-6 text-bomb" />
          </UiCardContent>

          <UiCardHeader>
            <UiCardTitle>{{ $t("presentation-doc.services.photo-shooting.title") }}</UiCardTitle>
            <UiCardDescription>{{ $t("presentation-doc.services.photo-shooting.description") }}</UiCardDescription>
          </UiCardHeader>
        </UiCard>
        <UiCard>
          <UiCardContent class="flex flex-col items-center justify-center">
            <Mic class="size-6 text-bomb" />
          </UiCardContent>

          <UiCardHeader>
            <UiCardTitle>{{ $t("presentation-doc.services.interviews.title") }}</UiCardTitle>
            <UiCardDescription>{{ $t("presentation-doc.services.interviews.description") }}</UiCardDescription>
          </UiCardHeader>
        </UiCard>
        <UiCard>
          <UiCardContent class="flex flex-col items-center justify-center">
            <Clapperboard class="size-6 text-bomb" />
          </UiCardContent>

          <UiCardHeader>
            <UiCardTitle>{{ $t("presentation-doc.services.teasers-and-reels.title") }}</UiCardTitle>
            <UiCardDescription>{{ $t("presentation-doc.services.teasers-and-reels.description") }}</UiCardDescription>
          </UiCardHeader>
        </UiCard>
        <UiCard>
          <UiCardContent class="flex flex-col items-center justify-center">
            <ChartNoAxesCombined class="size-6 text-bomb" />
          </UiCardContent>

          <UiCardHeader>
            <UiCardTitle>{{ $t("presentation-doc.services.impact.title") }}</UiCardTitle>
            <UiCardDescription>{{ $t("presentation-doc.services.impact.description") }}</UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </Wrapper>
    </section>

    <section
      id="cta"
      class="bg-primary text-primary-foreground px-6 @lg/layout:px-10 @2xl/layout:px-20 py-20 mt-14"
    >
      <Wrapper class="flex flex-col gap-8">
        <MessageCircle class="size-5" />

        <header class="grid gap-2">
          <h2 class="text-lg font-bold">
            {{ $t("presentation-doc.cta.title") }}
          </h2>

          <p class="whitespace-pre-line">
            {{ $t("presentation-doc.cta.description") }}
          </p>
        </header>

        <footer class="flex flex-col items-start gap-1">
          <UiButton
            variant="black"
            as-child
          >
            <NuxtLinkLocale to="/contact">
              {{ $t("presentation-doc.cta.action") }}
            </NuxtLinkLocale>
          </UiButton>

          <p class="text-sm opacity-45">
            {{ $t("presentation-doc.cta.caption") }}
          </p>
        </footer>
      </Wrapper>
    </section>

    <UiTooltipProvider>
      <footer class="flex items-center justify-between px-6 @lg/layout:px-10 @2xl/layout:px-20 py-6">
        <div class="flex items-center gap-3">
          <p class="font-bold">
            {{ $t("presentation-doc.footer.seen-on") }}
          </p>

          <UiTooltip>
            <UiTooltipTrigger as-child>
              <svg
                class="h-6"
                viewBox="0 0 29 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_262)">
                  <path
                    d="M12.9847 0.102591C13.3759 0.0703704 14.0811 0.0933852 14.5078 0.0937838L17.3986 0.0950525C20.7638 0.0954512 24.2027 0.130897 27.5622 0.0878039C27.5773 0.722139 27.6936 2.30924 27.5138 2.86152C27.4032 3.20109 24.2142 6.89391 23.6943 7.5194C23.5409 7.70395 23.4125 7.90293 23.26 8.08795C23.5899 8.20082 23.9112 8.33647 24.2215 8.49392C27.8889 10.3352 29.7049 14.3666 28.462 18.1289C28.2111 18.8881 28.0146 19.3735 27.5787 20.0634C26.6135 21.5909 24.9411 22.9284 23.1951 23.4719C20.4789 24.3446 17.5182 24.0994 14.9896 22.7924C13.8768 22.2645 12.7776 21.2752 11.9102 20.4337C11.925 20.3929 12.0032 20.1828 12.0233 20.1653C12.9665 19.3409 13.979 18.5869 14.9396 17.7796C15.0355 17.699 15.1998 17.6849 15.3061 17.7539C15.4018 17.9604 15.506 18.0305 15.654 18.1837C16.7583 19.3262 18.3145 20.0601 19.9408 19.9375C20.2934 19.911 20.6611 19.8638 20.998 19.7444C26.2003 17.9008 24.5827 11.1514 19.1722 11.4504C18.8641 11.4674 18.5698 11.4663 18.2609 11.5206C17.6879 11.6214 17.1536 11.8526 16.595 11.985C16.5127 11.8036 16.4875 9.42016 16.582 9.22049C16.8624 8.62852 17.6617 7.86049 18.1141 7.32057C18.6019 6.73846 19.1651 6.12221 19.6511 5.52662C20.0833 5.01856 20.4188 4.76717 20.7631 4.18659C20.4446 4.20851 20.0689 4.20485 19.7471 4.19851C17.5024 4.15426 15.2094 4.26821 12.97 4.19561C12.9972 3.82796 12.9776 3.24697 12.9765 2.85982C12.9675 1.94076 12.9702 1.02158 12.9847 0.102591Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4.44371 10.9847C6.97511 10.818 9.16762 12.6905 9.34829 15.1735C9.52896 17.6564 7.62982 19.8156 5.09995 20.0034C2.55483 20.1923 0.338113 18.3153 0.156352 15.8173C-0.0254055 13.3194 1.89706 11.1524 4.44371 10.9847Z"
                    fill="#007EE3"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_262">
                    <rect
                      width="29"
                      height="24"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </UiTooltipTrigger>
            <UiTooltipContent>
              <p>{{ $t("presentation-doc.socials.france-3") }}</p>
            </UiTooltipContent>
          </UiTooltip>
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <svg
                class="h-6"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_268)">
                  <path
                    d="M24.2825 3.14551C24.8165 4.46042 24.9125 5.25577 24.9109 6.67668C24.9156 7.22711 24.8861 7.7773 24.8226 8.32404C24.7042 9.34461 24.5177 10.3559 24.2642 11.3511C23.3646 14.8871 21.3533 19.3308 18.4356 21.6118C16.0587 23.4622 13.0524 24.2867 10.0747 23.905C7.05356 23.5293 4.308 21.946 2.45286 19.5096C1.03354 17.6588 0.203972 15.4169 0.0737573 13.08C-0.155146 9.39616 1.5979 5.39146 4.60517 3.22204C8.44767 0.450084 14.1191 -0.268357 18.7193 0.249727C20.5694 0.458084 22.8283 1.14835 23.987 2.67406C24.0443 2.76406 24.2288 3.07573 24.2825 3.14551Z"
                    fill="#E1243F"
                  />
                  <path
                    d="M12.4225 6.46259C13.0475 6.37028 13.8747 6.62885 14.3663 7.02064C14.9711 7.50266 15.3155 8.23835 15.409 8.99971C15.5525 10.1284 15.2447 11.2683 14.5536 12.1673C13.8128 13.1201 12.8695 13.5722 11.6996 13.7118C9.97208 13.7854 8.78512 12.838 8.61667 11.0609C8.39028 8.67219 10.0333 6.64638 12.4225 6.46259Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M12.085 7.84157C13.0261 7.75276 13.6643 8.16626 13.8205 9.14621C14.0519 10.5973 13.5909 12.0277 12.0005 12.3257L11.9783 12.3289C10.9068 12.4769 10.3014 11.8678 10.178 10.8262C10.0176 9.47123 10.5914 8.02378 12.085 7.84157Z"
                    fill="#E1243F"
                  />
                  <path
                    d="M18.9302 5.48616C19.4433 5.41697 20.1628 5.54311 20.5764 5.86366C21.4935 6.57442 21.3662 8.16918 20.7118 9.01828C19.9566 9.99799 18.7405 10.19 17.5965 10.3405C17.6063 10.9383 17.5987 11.561 17.5995 12.1606L17.603 12.6938C17.0667 12.7875 16.532 12.8662 15.9957 12.9554L15.9968 5.93678C16.9241 5.80654 18.0199 5.56623 18.9302 5.48616Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M18.5724 6.7474C19.6135 6.5594 19.8743 7.68611 19.4191 8.42463C19.2098 8.76442 18.882 8.89042 18.5129 8.97097C18.2352 9.03449 17.8942 9.07123 17.6032 9.12859C17.5978 8.38185 17.5972 7.63511 17.6015 6.88837C17.8784 6.86461 18.2683 6.78292 18.5724 6.7474Z"
                    fill="#E1243F"
                  />
                  <path
                    d="M16.7773 11.4552C17.5426 11.4295 17.4822 12.2359 16.8367 12.4936C16.1238 12.5865 16.0633 11.6913 16.7773 11.4552Z"
                    fill="#E1243F"
                  />
                  <path
                    d="M8.87849 7.104C8.89981 7.10577 8.8958 7.11022 8.91889 7.13019C8.92111 7.55236 8.92094 7.97453 8.9184 8.39669C8.3662 8.46981 7.81229 8.58562 7.26127 8.65486C7.25165 10.5415 7.23799 12.5066 7.26705 14.39C6.78965 14.4358 6.15137 14.5767 5.64394 14.6423L5.64316 12.7739L5.64224 10.2675C5.64219 9.88798 5.6242 9.27341 5.65358 8.90919C5.20684 9.0311 4.48507 9.09936 3.98519 9.2055L3.9809 7.90598L8.87849 7.104Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M8.26873 14.796C8.28262 14.7953 8.29651 14.7948 8.31043 14.7946C9.28094 14.7774 9.20028 15.8087 9.1975 16.485C9.19314 16.9324 9.1934 17.3798 9.1983 17.8272C8.96052 17.8451 8.45352 17.9438 8.19946 17.986C8.20491 17.6458 8.2751 15.8667 8.10337 15.6754C8.06229 15.6296 8.00958 15.6044 7.94852 15.6032C7.82052 15.6007 7.66184 15.6626 7.57073 15.7533C7.47915 15.8446 7.45328 16.0141 7.43823 16.1373C7.40979 16.37 7.42639 16.6191 7.42719 16.8537L7.43552 18.1094L6.46132 18.2669L6.46061 16.5892C6.46274 16.3921 6.49083 16.1384 6.36168 15.9765C6.17611 15.7437 5.83826 15.9948 5.68646 16.143C5.68252 16.8935 5.68274 17.6441 5.68712 18.3947C5.37142 18.433 5.01835 18.5029 4.70234 18.5584C4.68722 17.5111 4.69991 16.4435 4.69415 15.3925C4.93583 15.3768 5.225 15.3252 5.48156 15.3037L5.59434 15.5458C6.03778 15.0859 6.6625 14.8167 7.09387 15.4393C7.40038 15.0154 7.75936 14.837 8.26873 14.796Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M12.6325 14.1316L12.6704 14.1368C12.7102 14.2524 12.6865 16.9395 12.6884 17.2539C12.4468 17.2789 12.1494 17.3964 11.9394 17.3286C11.8541 17.3011 11.8179 17.1903 11.7796 17.106C10.9452 17.9662 9.75608 17.723 9.84653 16.395C9.86356 16.145 9.84879 15.8071 9.85075 15.5486L9.84978 14.561C10.1145 14.539 10.5547 14.4578 10.8298 14.4166C10.8168 15.001 10.833 15.5953 10.8198 16.1782C10.8031 16.9149 11.2503 16.9735 11.6962 16.4746C11.7182 15.7766 11.6987 14.9694 11.6949 14.2644C12.004 14.2168 12.3219 14.1594 12.6325 14.1316Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M14.6627 13.7454C15.0866 13.6909 15.3514 13.7606 15.7 13.9862C15.6083 14.1921 15.4767 14.4146 15.3006 14.5549C14.9713 14.4882 14.5924 14.3541 14.3295 14.6128C14.2675 14.6737 14.2653 14.6717 14.2619 14.7492C14.4683 15.0425 15.6778 14.892 15.7159 15.6087C15.7615 16.4657 15.0667 16.9451 14.2953 17.0286C13.8644 17.0701 13.6239 17.0007 13.243 16.8156C13.6815 15.9527 13.6553 16.2804 14.4676 16.324C14.6172 16.3321 14.8047 16.1679 14.7852 15.9961C14.644 15.7434 13.9433 15.8352 13.6446 15.5836C12.9875 15.03 13.5176 14.1103 14.1845 13.8645C14.3575 13.8008 14.4781 13.7731 14.6627 13.7454Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M19.4468 12.958C19.9157 12.9099 20.1753 12.9926 20.5494 13.265C19.8968 14.24 20.1376 13.612 19.324 13.7344C19.1859 13.7552 19.0048 13.9321 18.9386 14.078C18.8037 14.3754 18.7771 14.7774 18.8797 15.0907C18.9213 15.2178 19.0376 15.3985 19.1609 15.4414C19.5096 15.5625 19.7533 15.2508 20.0368 15.1279C20.115 15.094 20.2217 15.105 20.2919 15.1458C20.3607 15.1858 20.5249 15.3947 20.5466 15.465L20.5152 15.5139C20.2344 15.8593 19.8472 16.1 19.4152 16.1977C18.0603 16.5024 17.5444 15.2178 17.9419 14.1174C18.1956 13.4148 18.7559 13.0881 19.4468 12.958Z"
                    fill="#FEFEFE"
                  />
                  <path
                    d="M17.2576 13.3699L17.2646 13.3734C17.3134 13.4574 17.2942 16.1741 17.2941 16.4961C16.9646 16.555 16.6554 16.6103 16.3233 16.6522C16.3021 16.5646 16.3069 15.8625 16.3067 15.7293L16.3046 13.5074C16.6219 13.4592 16.9396 13.4133 17.2576 13.3699Z"
                    fill="#FEFEFE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_268">
                    <rect
                      width="25"
                      height="24"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </UiTooltipTrigger>
            <UiTooltipContent>
              <p>{{ $t("presentation-doc.socials.top-music") }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </div>

        <div>
          <UiButton
            variant="link"
            class="h-auto p-0 text-foreground! text-base!"
            as-child
          >
            <NuxtLinkLocale to="/">
              hope-media.fr
            </NuxtLinkLocale>
          </UiButton>
        </div>
      </footer>
    </UiTooltipProvider>
  </Page>
</template>
