import type { Testimonial } from "#shared/types/entities/testimonial";
import type { ColumnDef } from "@tanstack/vue-table";
import { Star } from "@lucide/vue";
import TestimonialActions from "~/components/admin/testimonials/testimonial/TestimonialActions.vue";
import TestimonialStatusBadge from "~/components/admin/testimonials/testimonial/TestimonialStatusBadge.vue";
import Ranking from "~/components/display/Ranking.vue";

export interface TestimonialProps {
  testimonial: Testimonial;
}

export const columns = (): Listed<ColumnDef<Testimonial>> => {
  const { t } = useI18n();

  return [
    {
      id: "status",
      header: () => h("div", t("admin.testimonials.table.headers.status")),
      cell: ({ row }) => h("div", h(TestimonialStatusBadge, { testimonial: row.original })),
    },
    {
      id: "name",
      header: () => h("div", t("admin.testimonials.table.headers.name")),
      cell: ({ row }) => h("p", `${row.original.firstName} ${row.original.lastName}`),
    },
    {
      id: "role",
      header: () => h("div", t("admin.testimonials.table.headers.role")),
      cell: ({ row }) => h("p", `${row.original.role} chez ${row.original.company}`),
    },
    {
      accessorKey: "content",
      header: () => h("div", t("admin.testimonials.table.headers.content")),
      cell: ({ row }) => h("p", { class: "max-w-md truncate" }, row.getValue("content")),
    },
    {
      id: "ranking",
      header: () => h("div", t("admin.testimonials.table.headers.ranking")),
      cell: ({ row }) => {
        const ranking = h(Ranking, { value: row.original.ranking, max: 5 });
        return h("div", { class: "flex items-center [&_>svg]:size-4" }, ranking);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => h("div", { class: "flex justify-end" }, h(TestimonialActions, { testimonial: row.original })),
    },
  ];
};
