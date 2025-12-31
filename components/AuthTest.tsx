"use client";

import { supabase } from "@/lib/supabase/client.ts";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export function AuthTest() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Sayfa yüklendiğinde session kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: "admin",
        });
      }
    });

    // Auth değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: "admin",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Auth Test</h3>
      {user ? (
        <div>
          <p>✅ Giriş Yapılmış</p>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>❌ Giriş Yapılmamış</p>
      )}
    </div>
  );
}
