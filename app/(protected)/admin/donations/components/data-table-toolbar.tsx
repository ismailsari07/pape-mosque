"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { funds } from "../data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center py-4 gap-2">
      <Input
        placeholder="Filter emails..."
        value={
          (table.getColumn("donor_email")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("donor_email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm border-neutral-800 text-white bg-neutral-900"
      />

      {table.getColumn("fund_code") && (
        <DataTableFacetedFilter
          column={table.getColumn("fund_code")}
          title="Fon Türü"
          options={funds}
        />
      )}
    </div>
  );
}
