import type { UserEntity } from "#shared/types/entities/user";
import { SessionModel } from "#server/repositories";
import UserEngine from "#server/services/entities/user";

declare module "h3" {
  interface H3EventContext {
    user?: UserEntity | null;
  }
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, UserEngine.AUTH_COOKIE_NAME);

  if (!token) {
    event.context.user = null;
    return;
  }

  event.context.user = await SessionModel.validate(token).catch(() => null);
});
