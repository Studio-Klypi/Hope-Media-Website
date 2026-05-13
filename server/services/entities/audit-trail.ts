import type { EntryType } from "@prisma/client";
import { AuditEntryModel } from "#server/repositories";

export default class AuditTrailEngine {
  async getAll(event: HttpEvent) {
    requireAuth(event);

    const query = getQuery<{
      types?: string;
    }>(event);
    const types = query?.types ? (query.types.split(",") as Listed<EntryType>) : [];

    try {
      return await AuditEntryModel.getAll(types);
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while fetching audit trail.",
      }));
    }
  }
}
