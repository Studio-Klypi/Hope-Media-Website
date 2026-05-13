// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          href: "/favicon.png",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.png",
        },
        {
          rel: "apple-touch-icon",
          href: "/favicon.png",
        },
      ],
    },
  },
  css: ["./tailwind.css"],
  colorMode: {
    classSuffix: "",
    classPrefix: "",
    storageKey: "HOPE_SCHEME",
    preference: "system",
    fallback: "light",
  },
  runtimeConfig: {
    mail: {
      host: "",
      port: "",
      secure: "",
      user: "",
      pass: "",
      from: {
        name: "",
        address: "",
      },
      reply: {
        to: "",
      },
    },
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
  routeRules: {
    "/admin/**": { ssr: false },
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
      Anton: true,
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
