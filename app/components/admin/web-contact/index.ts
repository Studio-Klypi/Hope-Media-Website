import type { ColumnDef } from "@tanstack/vue-table";
import { formatDate } from "date-fns";
import * as locales from "date-fns/locale";
import WebContactStatusBadge from "~/components/admin/web-contact/message/WebContactStatusBadge.vue";
import WebContactActions from "~/components/admin/web-contact/message/WebContactActions.vue";
import type { WebContact } from "~/types/states/web-contact";

export interface WebContactProps {
  message: WebContact;
}

export interface WebContactDialogProps {
  message: WebContact;
  reply?: boolean;
}

export const columns = (): Listed<ColumnDef<WebContact>> => {
  const { t, locale } = useI18n();

  return [
    {
      id: "status",
      header: () => h("div", t("admin.web-contact.table.headers.status")),
      cell: ({ row }) => h("div", h(WebContactStatusBadge, { message: row.original })),
    },
    {
      accessorKey: "subject",
      header: () => h("div", t("admin.web-contact.table.headers.subject")),
      cell: ({ row }) => h("p", row.getValue("subject")),
    },
    {
      accessorKey: "message",
      header: () => h("div", t("admin.web-contact.table.headers.message")),
      cell: ({ row }) => h("p", { class: "max-w-sm truncate" }, row.getValue("message")),
    },
    {
      id: "sender",
      header: () => h("div", t("admin.web-contact.table.headers.sender")),
      cell: ({ row }) => h("p", `${row.original.firstName} ${row.original.lastName} <${row.original.email}>`),
    },
    {
      id: "receivedAt",
      header: () => h("div", t("admin.web-contact.table.headers.received-at")),
      cell: ({ row }) => h("p", { class: "capitalize" }, formatDate(row.original.createdAt, "eee d MMM yyyy, HH:mm", { locale: locales[locale.value] })),
    },
    {
      id: "processedAt",
      header: () => h("div", t("admin.web-contact.table.headers.processed-at")),
      cell: ({ row }) => {
        const repliedAt = row.original.repliedAt;
        const ignoredAt = row.original.ignoredAt;
        const blockedAt = row.original.blockedAt;
        const date = repliedAt || ignoredAt || blockedAt;

        const processed = !!date;

        return h("p", { class: "capitalize" }, processed ? formatDate(date, "eee d MMM yyyy, HH:mm", { locale: locales[locale.value] }) : "-");
      },
    },
    {
      id: "actions",
      cell: ({ row }) => h("div", { class: "flex justify-end" }, h(WebContactActions, { message: row.original })),
    },
  ];
};
