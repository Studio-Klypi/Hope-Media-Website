import type { ColumnDef } from "@tanstack/vue-table";
import type { Article } from "~/types/states/blog";
import { formatDate } from "date-fns";
import * as locales from "date-fns/locale";
import ArticleStatusBadge from "~/components/admin/blog/article/ArticleStatusBadge.vue";
import ArticleActions from "~/components/admin/blog/article/ArticleActions.vue";

export interface ArticleProps {
  article: Article;
}

export const columns = (): Listed<ColumnDef<Article>> => {
  const { t, locale } = useI18n();

  return [
    {
      accessorKey: "title",
      header: () => t("admin.blog.articles.table.headers.title"),
      cell: ({ row }) => h("p", row.getValue("title")),
    },
    {
      accessorKey: "excerpt",
      header: () => t("admin.blog.articles.table.headers.excerpt"),
      cell: ({ row }) => h("p", row.getValue("excerpt") || "-"),
    },
    {
      id: "status",
      header: () => t("admin.blog.articles.table.headers.status"),
      cell: ({ row }) => h("div", h(ArticleStatusBadge, { article: row.original })),
    },
    {
      id: "createdBy",
      header: () => t("admin.blog.articles.table.headers.created-by"),
      cell: ({ row }) => h("p", row.original.author ? `${row.original.author.firstName} ${row.original.author.lastName}` : "Utilisateur supprimé"),
    },
    {
      id: "createdAt",
      header: () => t("admin.blog.articles.table.headers.created-at"),
      cell: ({ row }) => h("p", { class: "capitalize" }, formatDate(row.original.createdAt, "eee d MMM yyyy, HH:mm", { locale: locales[locale.value] })),
    },
    {
      id: "updatedAt",
      header: () => t("admin.blog.articles.table.headers.updated-at"),
      cell: ({ row }) => h("p", { class: "capitalize" }, formatDate(row.original.updatedAt, "eee d MMM yyyy, HH:mm", { locale: locales[locale.value] })),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const actions = h(ArticleActions, { article: row.original });
        return h("div", { class: "flex justify-end relative z-10" }, actions);
      },
    },
  ];
};
