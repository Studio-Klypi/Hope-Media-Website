import { generateCode } from "#server/utils/generator";

export default class OTPRepository {
  private VALIDITY = 1000 * 60 * 15;

  async create(userId: number) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.VALIDITY);

    return prisma.oTP.create({
      data: {
        userId,
        code: generateCode(),
        createdAt: now,
        expiresAt,
      },
    });
  }

  private async validate(userId: number, code: string) {
    const now = new Date();

    return prisma.oTP.findUniqueOrThrow({
      where: {
        userId_code: {
          userId,
          code,
        },
        expiresAt: {
          gt: now,
        },
        usedAt: null,
      },
    });
  }

  async consume(userId: number, code: string) {
    const now = new Date();

    await this.validate(userId, code);

    return prisma.oTP.update({
      where: {
        userId_code: {
          userId,
          code,
        },
        expiresAt: {
          gt: now,
        },
        usedAt: null,
      },
      data: {
        usedAt: now,
      },
    });
  }
}
