"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type DataTableToolbarProps = {
  onClickAddButton: () => void;
};

export function DataTableToolbar({ onClickAddButton }: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-end py-4 gap-2">
      <Button variant="dashboard" size="sm" onClick={onClickAddButton}>
        <Plus />
        Add Event
      </Button>
    </div>
  );
}
