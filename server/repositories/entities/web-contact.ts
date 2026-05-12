import type { BlockWebContact, CreateWebContact, CreateWebContactReply } from "#shared/types/entities/web-contact";
import type { UserEntity } from "#shared/types/entities/user";

export class WebContactRepository {
  async create(payload: CreateWebContact) {
    return prisma.webContact.create({
      data: payload,
      include: {
        replies: true,
      },
    });
  }

  async reply(id: string, payload: CreateWebContactReply, user: UserEntity) {
    const storedContact = await prisma.webContact.findUniqueOrThrow({
      where: {
        id,
        replyTo: null,
        repliedAt: null,
        ignoredAt: null,
        blockedAt: null,
      },
    });
    return prisma.webContact.update({
      where: {
        id,
        replyTo: null,
        repliedAt: null,
        ignoredAt: null,
        blockedAt: null,
      },
      data: {
        repliedAt: new Date(),
        replies: {
          create: [
            {
              ...payload,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              subject: `Re: ${storedContact.subject}`,
            },
          ],
        },
      },
      include: {
        replies: true,
      },
    });
  }

  async ignore(id: string) {
    return prisma.webContact.update({
      where: {
        id,
        ignoredAt: null,
        repliedAt: null,
        blockedAt: null,
      },
      data: {
        ignoredAt: new Date(),
      },
      include: {
        replies: true,
      },
    });
  }

  async block(id: string, payload: BlockWebContact, user: UserEntity) {
    const storedContact = await prisma.webContact.findUniqueOrThrow({
      where: {
        id,
        replyTo: null,
        blockedAt: null,
      },
    });

    return prisma.webContact.update({
      where: {
        id,
        replyTo: null,
        blockedAt: null,
      },
      data: {
        blockedAt: new Date(),
        blocked: {
          create: {
            ...payload,
            email: storedContact.email,
            userId: user.id,
          },
        },
      },
      include: {
        replies: true,
        blocked: true,
      },
    });
  }

  async getAll() {
    const total = await prisma.webContact.count({
      where: {
        replyTo: null,
      },
    });
    const data = await prisma.webContact.findMany({
      where: {
        replyTo: null,
      },
      include: {
        replies: true,
        blocked: true,
      },
    });

    return {
      data,
      meta: {
        total,
        count: data.length,
      },
    };
  }

  async isBlocked(email: string) {
    return !!(await prisma.webBlock.findFirst({
      where: {
        email,
      },
    }));
  }
}
