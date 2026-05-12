<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { DataTableProps } from "~/components/ui/data-table/index";

const props = defineProps<DataTableProps<TData, TValue>>();

const table = useVueTable({
  get data() { return props.data; },
  get columns() { return props.columns; },
  getCoreRowModel: getCoreRowModel(),
});

function rowUrl(row: TData): string {
  let link = props.rowLink || "";
  Object.entries(props.rowLinkReplacements!).forEach(([k, v]) => link = link!.replaceAll(`{${k}}`, row[v]?.toString() ?? ""));

  return link;
}
async function handleRowClick(row: TData) {
  if (!props.rowAction) return;
  await props.rowAction(row);
}
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            class="relative isolate"
            :class="{ 'cursor-pointer': !!rowAction }"
            @click="handleRowClick(row.original)"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>

            <NuxtLinkLocale
              v-if="rowLink && rowLinkReplacements"
              :to="rowUrl(row.original)"
              class="absolute inset-0 z-1"
            />
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              {{ $t("labels.table.data") }}
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
