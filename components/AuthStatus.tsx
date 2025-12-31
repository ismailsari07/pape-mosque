"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 border rounded bg-yellow-50">
        <p>⏳ Auth kontrol ediliyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Auth Status:</h3>
      {isAuthenticated && user ? (
        <div className="space-y-2">
          <p>✅ Giriş Yapılmış</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <div>
          <p>❌ Giriş Yapılmamış</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Giriş Yap
          </button>
        </div>
      )}
    </div>
  );
}
