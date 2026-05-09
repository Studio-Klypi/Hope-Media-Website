export function requireAuth(event: HttpEvent) {
  if (!event.context.user) throw createError({
    statusCode: HttpCode.UNAUTHORIZED,
    statusMessage: "Should be authenticated!",
  });

  return event.context.user;
}
