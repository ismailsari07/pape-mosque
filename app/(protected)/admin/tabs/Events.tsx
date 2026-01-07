"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "@/lib/api/events";
import { createEventColumns } from "../events/table/columns";
import { EventEditSheet } from "../events/components/EventEditSheet";
import { EventPayload } from "../events/types";
import { EventFormValues } from "../events/schema/eventForm.schema";
import TabHeader from "../components/TabHeader";
import { DataTable } from "../components/data-table";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTableToolbar } from "../events/table/data-table-toolbar";

function mapEventToFormValues(
  event: EventPayload,
): EventFormValues | undefined {
  return {
    title: event.title,
    description: event.description,
    day: event.day,
    time: event.time,
    phone: event.phone ?? "",
    is_active: event.is_active,
    is_featured: event.is_featured,
    is_recurring: event.is_recurring,
  };
}

export default function EventsPage() {
  // States
  const [selectedEventId, setSelectedEventId] = useState("");
  const [alertDialog, openAlertDialog] = useState(false);
  const [editSheet, setEditSheet] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");

  // Tanstack Process
  const queryClient = useQueryClient();

  const { data: eventsTable = [], isLoading } = useQuery({
    queryKey: ["table-events"],
    queryFn: getAllEvents,
  });

  const { data: eventData } = useQuery({
    queryKey: ["event-data", selectedEventId],
    queryFn: () => getEvent(selectedEventId!),
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EventPayload }) =>
      updateEvent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-events"] });
      queryClient.invalidateQueries({
        queryKey: ["event-data", selectedEventId],
      });

      toast.success("Event updated successfully", {
        description:
          "The event details have been updated and published on the website.",
      });
    },
    onError: (error) => {
      toast.error("Unable to save changes", {
        description:
          "Please try again or refresh the page if the issue persists.",
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-events"] });

      toast.success("Event deleted", {
        description:
          "The event has been removed and is no longer visible on the website.",
      });
    },
    onError: (error) => {
      toast.error("Unable to delete the event", {
        description:
          "Please try again or refresh the page if the issue persists.",
      });
    },
  });

  const insertEventMutation = useMutation({
    mutationFn: ({ payload }: { payload: EventPayload }) =>
      createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-events"] });
      toast.success("Event created successfully", {
        description: "The event is now live and visible on the website.",
      });
    },
    onError: (error) => {
      toast.error("Failed to create event", {
        description: "The event could not be created. Please try again.",
      });
    },
  });

  // Get the form data ready for Sheet
  const formDefaultValues: EventFormValues | undefined =
    mode === "update" && eventData
      ? mapEventToFormValues(eventData)
      : undefined;
  console.log("mode ==> ", mode);
  console.log(
    mode === "update" && eventData
      ? mapEventToFormValues(eventData)
      : undefined,
  );

  // Create Columns
  const columns = createEventColumns({
    onClickEditButton: openEditSheet,
    onClickDeleteButton: openDeleteAlert,
  });

  // Event Actions' Object
  const eventActions = {
    create: (eventData: EventFormValues) => {
      insertEventMutation.mutate({ payload: eventData });
      setEditSheet(false);
    },
    update: (eventData: EventFormValues) => {
      updateEventMutation.mutate({ id: selectedEventId, payload: eventData });
      setEditSheet(false);
    },
    delete: () => {
      deleteEventMutation.mutate({ id: selectedEventId });
      openAlertDialog(false);
    },
  };

  function openCreateSheet() {
    setMode("create");
    setSelectedEventId("");
    setEditSheet(true);
  }

  function openEditSheet(id: string) {
    setMode("update");
    setSelectedEventId(id);
    setEditSheet(true);
  }

  function openDeleteAlert(id: string) {
    setSelectedEventId(id);
    openAlertDialog(true);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TabHeader
        title="Events"
        description="Manage all events displayed on the public site."
      />
      <DataTable
        columns={columns}
        data={eventsTable}
        renderToolbar={() => (
          <DataTableToolbar onClickAddButton={openCreateSheet} />
        )}
      />
      <EventEditSheet
        open={editSheet}
        mode={mode}
        onOpenChange={(open) => {
          setEditSheet(open);
          if (!open) setSelectedEventId("");
        }}
        defaultValues={formDefaultValues}
        onSubmit={eventActions[mode]}
      />
      <AlertDialog open={alertDialog} onOpenChange={openAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The event will be permanently
              removed and will no longer be visible on the website.
              <br />
              <br />
              This deletion will be logged, including who performed the action,
              for audit and tracking purposes.
              <br />
              <br />
              If this is a recurring or reusable event, you may choose to
              disable it instead. Disabling will hide the event from the website
              while allowing you to re-enable it later when needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={"outline"} onClick={() => openAlertDialog(false)}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={eventActions.delete}>
              Delete Event
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
