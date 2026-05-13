import type { Prisma } from "@prisma/client";

export type AuditEntry = Prisma.AuditEntryGetPayload<{
  include: { user: true };
}> & { data?: Nullable };

export interface AuditTrailState {
  entries: Listed<AuditEntry>;
  loading: boolean;
}

export const defaults: AuditTrailState = {
  entries: [],
  loading: false,
};
