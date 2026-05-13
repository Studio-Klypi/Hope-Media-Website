import { AuditEntryModel, OTPModel, UserModel } from "#server/repositories";
import type { Prisma } from "@prisma/client";
import { EntryType } from "@prisma/client";

export default class OTPEngine {
  async create(event: HttpEvent) {
    const body = await readBody<{ email: string }>(event);

    try {
      const user = await UserModel.getByEmail(body.email);
      const otp = await OTPModel.create(user.id);

      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.OTP_REQUESTED,
        data: {
          user: {
            userId: user.id,
            email: user.email,
          },
        },
      });

      await sendMail({
        to: user.email,
        subject: "Votre code de connexion",
        template: "otp/index",
        variables: {
          firstName: user.firstName,
          code: otp.code,
        },
      }).catch((e) => {
        console.error("[OTP REQUEST] Invalid email or .", e);
      });
      console.log(`[OTP REQUEST] ${body.email} 🔑 ${otp.code}`);
      return;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the user.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Error occurred while creating an OTP.",
        }));
      }
    }
  }
}
