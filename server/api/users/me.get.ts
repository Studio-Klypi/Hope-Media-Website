export default defineEventHandler((event) => {
  console.log("RECOVERING USER... ", event.context.user);
  return event.context.user;
});
