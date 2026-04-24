// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
    "@nuxt/image",
  ],
  devtools: { enabled: true },
  css: ["./tailwind.css"],
  colorMode: {
    classSuffix: "",
    classPrefix: "",
    storageKey: "HOPE_SCHEME",
    preference: "system",
    fallback: "light",
  },
  runtimeConfig: {
    public: {
      app: {
        maintenance: "",
      },
      social: {
        facebook: "",
        instagram: "",
      },
    },
  },
  compatibilityDate: "2025-07-15",
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  googleFonts: {
    families: {
      Inter: "100..900",
    },
  },
  i18n: {
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
        file: "fr.json",
      },
    ],
    strategy: "prefix_except_default",
  },
  shadcn: {
    prefix: "ui",
    componentDir: "./app/components/ui",
  },
});
