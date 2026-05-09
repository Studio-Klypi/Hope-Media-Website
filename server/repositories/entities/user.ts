import { prisma } from "#server/utils/prisma";
import type { PartialUserPayload, UserPayload } from "#shared/types/entities/user";

export default class UserRepository {
  async get(id: number, active: boolean = true) {
    return prisma.user.findUniqueOrThrow({
      where: {
        id,
        ...(active ? { deletedAt: null } : {}),
      },
    });
  }

  async getByEmail(email: string, active: boolean = true) {
    return prisma.user.findUniqueOrThrow({
      where: {
        email,
        ...(active ? { deletedAt: null } : {}),
      },
    });
  }

  async list(active: boolean = true) {
    const total = await prisma.user.count({
      where: {
        ...(active ? { deletedAt: null } : {}),
      },
    });
    const list = await prisma.user.findMany({
      where: {
        ...(active ? { deletedAt: null } : {}),
      },
    });

    return {
      list,
      total,
    };
  }

  async create(payload: UserPayload) {
    return prisma.user.create({
      data: payload,
    });
  }

  async update(id: number, payload: PartialUserPayload) {
    return prisma.user.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async delete(id: number) {
    return prisma.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
