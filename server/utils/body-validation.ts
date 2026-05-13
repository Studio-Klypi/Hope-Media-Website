export async function validateBody<T extends object>(event: HttpEvent) {
  const body = await readBody<T>(event);

  if (!Object.keys(body).length) throw createError({
    statusCode: HttpCode.BAD_REQUEST,
    statusMessage: "Body should contain at least one row!",
  });

  return body;
}
