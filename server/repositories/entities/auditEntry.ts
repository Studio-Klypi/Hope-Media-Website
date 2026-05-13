import { type EntryType, Prisma } from "@prisma/client";
import { prisma } from "#server/utils/prisma";
import type { AuditEntryCreationPayload } from "#shared/types/entities/auditEntry";

export default class AuditEntryRepository {
  async create(payload: AuditEntryCreationPayload) {
    return prisma.auditEntry.create({
      data: {
        ...payload,
        userId: payload.userId ?? null,
        data: payload.data ?? Prisma.DbNull,
      },
    });
  }

  async get(id: number) {
    return prisma.auditEntry.findUnique({
      where: {
        id,
      },
    });
  }

  async getAll(types?: Listed<EntryType>) {
    const total = await prisma.auditEntry.count({
      where: {
        ...((types?.length ?? 0) > 0
          ? {
            type: {
              in: types,
            },
          }
          : {}),
      },
    });
    const list = await prisma.auditEntry.findMany({
      where: {
        ...((types?.length ?? 0) > 0
          ? {
            type: {
              in: types,
            },
          }
          : {}),
      },
      include: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return {
      list,
      total,
    };
  }

  async getForUser(userId: number, types?: Listed<EntryType>) {
    return prisma.auditEntry.findMany({
      where: {
        userId,
        ...((types?.length ?? 0) > 0
          ? {
            type: {
              in: types,
            },
          }
          : {}),
      },
      include: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }
}
