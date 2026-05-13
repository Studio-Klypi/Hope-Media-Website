import type { EntryType } from "@prisma/client";
import type { InputJsonValue } from "@prisma/client/runtime/client";

export interface AuditEntryCreationPayload {
  userId?: number;
  type: EntryType;
  data?: InputJsonValue;
}
