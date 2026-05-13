import type { UserEntity } from "#shared/types/entities/user";
import { SessionModel, UserModel } from "#server/repositories";

declare module "h3" {
  interface H3EventContext {
    user?: UserEntity | null;
  }
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    event.context.user = null;
    return;
  }

  event.context.user = await SessionModel.validate(token).catch(() => null);
});
