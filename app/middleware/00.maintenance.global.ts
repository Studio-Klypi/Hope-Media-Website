export default defineNuxtRouteMiddleware((to) => {
  const active = useRuntimeConfig().public.app.maintenance;

  if (to.path.includes("/maintenance")) {
    if (active) return;
    return navigateTo(useLocalePath()("/"));
  }
  if (!active) return;

  return navigateTo(useLocalePath()("/maintenance"));
});
