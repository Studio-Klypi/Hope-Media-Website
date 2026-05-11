const UNTOUCH_PATHS = [
  "/presentation-doc",
  "/maintenance",
  "/admin",
] as const;

export default defineNuxtRouteMiddleware((to) => {
  const active = useRuntimeConfig().public.app.maintenance;

  if (UNTOUCH_PATHS.find(path => to.path.includes(path))) {
    if (active) return;
    return navigateTo(useLocalePath()("/"));
  }
  if (!active) return;

  return navigateTo(useLocalePath()("/maintenance"));
});
