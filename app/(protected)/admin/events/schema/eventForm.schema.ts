import { z } from "zod";

// zod schema
export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  day: z.string().min(1),
  time: z.string().min(1),
  phone: z.string().optional(),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  is_recurring: z.boolean(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
