export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.includes("/admin")) return;

  const store = useUserStore();
  const { loggedIn } = storeToRefs(store);
  const localePath = useLocalePath();

  if (!loggedIn.value && to.path.includes("/admin/auth")) return;

  if (!loggedIn.value) return navigateTo(localePath("/admin/auth/login"));
  else if (to.path.includes("/admin/auth")) return navigateTo(localePath("/admin"));
});
