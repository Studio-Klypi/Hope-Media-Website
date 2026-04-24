export default defineNuxtRouteMiddleware(() => {
  const maintenance = useRuntimeConfig().public.app.maintenance === "true";

  if (maintenance) return navigateTo(useLocalePath()("/maintenance"));
});
