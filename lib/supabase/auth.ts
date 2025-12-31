import { supabase } from "./client";

// ============================================
// LOGIN
// ============================================

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// ============================================
// LOGOUT
// ============================================

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ============================================
// GET CURRENT USER
// ============================================

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) return null;

  // Profile bilgisini de al (role için)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email!,
    role: profile?.role || "admin",
  };
}

// ============================================
// GET SESSION
// ============================================

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;
  return session;
}
