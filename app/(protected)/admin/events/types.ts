export type Event = {
  id: string;
  title: string;
  description: string;
  day: string;
  time: string;
  phone: string | null;

  is_recurring: boolean;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;

  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type EventRow = {
  id: string;

  title: string;
  day: string;
  time: string;

  is_active: boolean;
  is_featured: boolean;
};

export type EventPayload = {
  title: string;
  description: string;
  day: string;
  time: string;
  phone?: string | null;

  is_recurring: boolean;
  is_featured: boolean;
  display_order?: number;
  is_active: boolean;
};
