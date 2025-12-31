import { supabase } from "@/lib/supabase/client";

// Tüm etkinlikleri çek (Admin için - aktif + pasif)
export async function getAllEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data;
}

// Aktif etkinlikleri çek (Public için)
export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data;
}

// Ana sayfada gösterilecek etkinlikler (featured)
export async function getFeaturedEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(3);

  if (error) throw error;
  return data;
}

// Tek etkinlik çek
export async function getEvent(id: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Yeni etkinlik ekle
export async function createEvent(event: {
  title: string;
  description: string;
  day: string;
  time: string;
  phone?: string;
  is_recurring?: boolean;
  is_featured?: boolean;
  display_order?: number;
}) {
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Etkinlik güncelle
export async function updateEvent(
  id: string,
  updates: {
    title?: string;
    description?: string;
    day?: string;
    time?: string;
    phone?: string;
    is_recurring?: boolean;
    is_featured?: boolean;
    display_order?: number;
    is_active?: boolean;
  },
) {
  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Etkinlik sil
export async function deleteEvent(id: string) {
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw error;
}
