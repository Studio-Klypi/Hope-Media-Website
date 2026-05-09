import type { ComponentProps } from "~/types/generic/components";
import type { AuditEntry } from "~/types/states/audit-trail";

export interface AdminAuditCardProps {
  maxEntries?: number;
}

export interface AdminAuditEntryProps extends ComponentProps {
  entry?: AuditEntry;
}
