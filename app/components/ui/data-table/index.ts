import type { ColumnDef } from "@tanstack/vue-table";

export { default as DataTable } from "./DataTable.vue";

export interface DataTableProps<TD, TV> {
  columns: Listed<ColumnDef<TD, TV>>;
  data: Listed<TD>;
  rowAction?: (row: TD) => Promise<void> | void;
  rowLink?: string;
  rowLinkReplacements?: Record<string, keyof TD>;
}
