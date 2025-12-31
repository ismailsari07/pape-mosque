"use client";

import { useAuthStore } from "@/lib/store/authStore";

export function TestAuth() {
  const { user, isAdmin, setUser, logout } = useAuthStore();

  const loginAsUser = () => {
    setUser({ id: "123", email: "user@gmail.com", role: "user" });
  };

  const loginAsAdmin = () => {
    setUser({ id: "456", email: "admin@gmail.com", role: "admin" });
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <h3 className="font-bold">Test Auth</h3>

      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Is Admin: {isAdmin ? "Evet" : "Hayır"}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={loginAsUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            User Login
          </button>
          <button
            onClick={loginAsAdmin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Admin Login
          </button>
        </div>
      )}
    </div>
  );
}
