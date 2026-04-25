export default defineNuxtRouteMiddleware((to) => {
  if (to.path.includes("/maintenance")) return;
  if (!useRuntimeConfig().public.app.maintenance) return;

  return navigateTo(useLocalePath()("/maintenance"));
});
