import { AuditEntryModel, OTPModel, UserModel } from "#server/repositories";
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
        console.error("Unable to send OTP.");
        console.error(e);
      });
      console.log(`🔑 CODE generated for ${body.email} - ${otp.code}`);
      return;
    }
    catch (e) {
      console.error(e);
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while creating an OTP.",
      }));
    }
  }
}
