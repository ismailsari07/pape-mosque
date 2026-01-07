"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EventFormValues, eventSchema } from "../schema/eventForm.schema";
import { EventPayload } from "../types";

type Props = {
  open: boolean;
  mode: "create" | "update";
  onOpenChange: (open: boolean) => void;
  defaultValues?: EventFormValues;
  onSubmit: (payload: EventFormValues) => void;
};

export function EventEditSheet({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  mode,
}: Props) {
  useEffect(() => {
    if (mode === "update" && defaultValues) {
      form.reset(defaultValues);
    }

    if (mode === "create") {
      form.reset({
        title: "",
        description: "",
        day: "",
        time: "",
        phone: "",
        is_active: true,
        is_featured: false,
        is_recurring: false,
      });
    }
  }, [mode, defaultValues]);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-neutral-950 rounded-lg m-4 border border-neutral-800">
        <SheetHeader>
          <SheetTitle className="text-2xl">Edit Event</SheetTitle>
          <SheetDescription>
            Make changes to the event details and save your changes.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-3 h-full "
        >
          <div>
            <Label>Title</Label>
            <Input
              {...form.register("title")}
              className="border-neutral-800 text-white bg-neutral-900"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              {...form.register("description")}
              className="border-neutral-800 text-white bg-neutral-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Day</Label>
              <Input
                {...form.register("day")}
                className="border-neutral-800 text-white bg-neutral-900"
              />
            </div>

            <div>
              <Label>Time</Label>
              <Input
                {...form.register("time")}
                className="border-neutral-800 text-white bg-neutral-900"
              />
            </div>
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              {...form.register("phone")}
              className="border-neutral-800 text-white bg-neutral-900"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch
              checked={form.watch("is_active")}
              onCheckedChange={(v) => form.setValue("is_active", v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Featured</Label>
            <Switch
              checked={form.watch("is_featured")}
              onCheckedChange={(v) => form.setValue("is_featured", v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Recurring</Label>
            <Switch
              checked={form.watch("is_recurring")}
              onCheckedChange={(v) => form.setValue("is_recurring", v)}
            />
          </div>

          <div className="pt-4 flex flex-col gap-3 mt-auto mb-4">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
