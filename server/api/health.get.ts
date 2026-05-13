export default defineEventHandler(async () => {
  const [database, mailer] = await Promise.all([
    prisma.$queryRaw`SELECT 1`.then(() => "ok").catch(() => "ko"),
    verifyMailer().then(() => "ok").catch(() => "ko"),
  ]);

  return { api: "ok", database, mailer };
});
