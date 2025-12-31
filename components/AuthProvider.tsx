"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentUser, getSession } from "@/lib/supabase/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcıyı kontrol et
    checkUser();

    // Auth değişikliklerini dinle (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Giriş yapıldı
        const user = await getCurrentUser();
        setUser(user);
      } else if (event === "SIGNED_OUT") {
        // Çıkış yapıldı
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, logout]);

  async function checkUser() {
    try {
      // Check session
      const session = await getSession();
      if (!session) {
        setUser(null);
        return;
      }

      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return <>{children}</>;
}
