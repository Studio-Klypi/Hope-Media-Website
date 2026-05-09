export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.includes("/admin")) return;

  const store = useUserStore();
  if (store.loggedIn) return;
  await store.recover();
});
