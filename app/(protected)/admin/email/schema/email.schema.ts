import { z } from "zod";

export const emailSendSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  to: z.string().min(1, "email is required"),
});

export type EmailSendFormValues = z.infer<typeof emailSendSchema>;
