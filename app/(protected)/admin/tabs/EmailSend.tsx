import { useMutation } from "@tanstack/react-query";
import TabHeader from "../components/TabHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  EmailSendFormValues,
  emailSendSchema,
} from "../email/schema/email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

export default function EmailSend() {
  const emailSendMutation = useMutation({
    mutationFn: async (payload: { to: string }) => {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Mail gonderilemedi.");
      }

      return res.json();
    },
  });

  const defaultValues: EmailSendFormValues = {
    subject: "",
    title: "",
    description: "",
    to: "",
  };

  const form = useForm<EmailSendFormValues>({
    resolver: zodResolver(emailSendSchema),
    defaultValues,
  });

  function handleSubmit(e: any) {
    emailSendMutation.mutate({ to: form.getValues("to") });
  }

  return (
    <div>
      <TabHeader title="Email Send" description="Email gonderme islemleri" />

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-5 flex flex-col gap-3 h-full"
      >
        <div>
          <Label>Subject</Label>
          <Input
            {...form.register("subject")}
            className="border-neutral-800 text-white bg-neutral-900"
            placeholder="Cenaze Duyurusu"
          />
        </div>

        <div>
          <Label>Title</Label>
          <Input
            {...form.register("title")}
            className="border-neutral-800 text-white bg-neutral-900"
            placeholder="Merhum / Merhume Bilgisi"
          />
        </div>

        <div>
          <Label>To</Label>
          <Input
            {...form.register("to")}
            className="border-neutral-800 text-white bg-neutral-900"
            placeholder="Merhum / Merhume Bilgisi"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            {...form.register("description")}
            className="border-neutral-800 text-white bg-neutral-900"
            placeholder="Cenaze bilgileri..."
          />
        </div>

        <Button type="submit">Send Email</Button>
      </form>
    </div>
  );
}
