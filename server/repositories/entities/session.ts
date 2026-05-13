import { prisma } from "#server/utils/prisma";

export class SessionRepository {
  private VALIDITY = 1000 * 60 * 60 * 24 * 14; // Valid for 2 weeks

  async create(userId: number) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.VALIDITY);

    return prisma.session.create({
      data: {
        userId,
        createdAt: now,
        expiresAt,
      },
    });
  }

  async validate(token: string) {
    return prisma.session.findUniqueOrThrow({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
        revokedAt: null,
      },
    }).user();
  }

  async revoke(token: string) {
    const now = new Date();

    return prisma.session.update({
      where: {
        token,
        expiresAt: {
          gt: now,
        },
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    });
  }

  async revokeAll(userId: number) {
    const now = new Date();
    const res = await prisma.session.updateMany({
      where: {
        userId,
        expiresAt: {
          gt: now,
        },
        revokedAt: null,
      },
      data: {
        revokeAt: now,
      },
    });

    return res.count;
  }
}
