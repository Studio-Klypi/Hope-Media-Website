import { AuditEntryModel, OTPModel, SessionModel, UserModel } from "#server/repositories";
import type { HttpEvent } from "#shared/types/primitives";
import { HttpCode } from "#shared/types/primitives";
import type { UserPayload } from "#shared/types/entities/user";
import { requireAuth } from "#server/utils/auth";
import { EntryType } from "@prisma/client";

export default class UserEngine {
  static AUTH_COOKIE_NAME = "auth_token" as const;

  async create(event: HttpEvent) {
    requireAuth(event);
    const body = await readBody<UserPayload>(event);

    try {
      const user = await UserModel.create(body);

      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.USER_CREATED,
        data: {
          ...user,
        },
      });

      event.node.res.statusCode = HttpCode.CREATED;
      return user;
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while creating a user.",
      }));
    }
  }

  async login(event: HttpEvent) {
    const body = await readBody<{
      email: string;
      code: string;
    }>(event);

    try {
      const user = await UserModel.getByEmail(body.email);
      await OTPModel.consume(user.id, body.code);

      const session = await SessionModel.create(user.id);

      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.LOGGED_IN,
        data: {
          code: body.code,
        },
      });
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.OTP_CONSUMED,
        data: {
          user: {
            userId: user.id,
            email: user.email,
          },
          code: body.code,
        },
      });

      setCookie(event, UserEngine.AUTH_COOKIE_NAME, session.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 2 * 14,
      });

      return user;
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while logging in.",
      }));
    }
  }

  async logout(event: HttpEvent) {
    const user = requireAuth(event);
    const token = getCookie(event, "auth_token");

    if (!token) return sendError(event, createError({
      statusCode: HttpCode.BAD_REQUEST,
      statusMessage: "No token found.",
    }));

    const body = await readBody<{ all?: boolean }>(event);

    try {
      let count = 1;

      if (body.all) count = await SessionModel.revokeAll(user.id);
      else await SessionModel.revoke(token);

      deleteCookie(event, UserEngine.AUTH_COOKIE_NAME);

      await AuditEntryModel.create({
        userId: user.id,
        type: body.all ? EntryType.LOGGED_OUT_ALL : EntryType.LOGGED_OUT,
        data: {
          count,
        },
      });
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while logging out.",
      }));
    }
  }
}
