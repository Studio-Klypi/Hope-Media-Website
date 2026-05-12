import type { BlockWebContact, CreateWebContact, CreateWebContactReply } from "#shared/types/entities/web-contact";
import type { UserEntity } from "#shared/types/entities/user";

export class WebContactRepository {
  async create(payload: CreateWebContact) {
    return prisma.webContact.create({
      data: payload,
    });
  }

  async reply(id: string, payload: CreateWebContactReply, user: UserEntity) {
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
        reply: {
          create: {
            ...payload,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
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
        reply: {
          include: {
            blocked: true,
          },
        },
        blocked: true,
      },
    });
  }

  async getAll() {
    const total = await prisma.webContact.count();
    const data = await prisma.webContact.findMany();

    return {
      data,
      meta: {
        total,
        count: data.length,
      },
    };
  }
}
