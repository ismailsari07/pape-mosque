import { supabase } from "@/lib/supabase/client";

// Tüm bağışları çek (Admin için)
export async function getAllDonations() {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Tek bağış çek
export async function getDonation(id: string) {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// İstatistikler
export async function getDonationStats() {
  const { data, error } = await supabase
    .from("donations")
    .select("amount_cents, fund");

  if (error) throw error;

  // Toplam
  const total = data.reduce((sum, d) => sum + d.amount_cents, 0);

  // Fon bazında
  const byFund = data.reduce((acc: any, d) => {
    if (!acc[d.fund]) acc[d.fund] = 0;
    acc[d.fund] += d.amount_cents;
    return acc;
  }, {});

  return {
    total,
    byFund,
    count: data.length,
  };
}
