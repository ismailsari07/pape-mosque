"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { signOut } from "@/lib/supabase/auth";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TABS = [
  { id: "events", label: "Events" },
  // { id: "users", label: "Users" },
  { id: "announcements", label: "Announcements" },
  { id: "donations", label: "Donations" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "events";

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="min-h-screen mx-auto p-5 flex gap-3">
        {/* SideBar */}
        <div className="w-80 flex flex-col items-start bg-neutral-900 border border-neutral-800/70 shadow rounded-lg p-5 text-neutral-50">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="font-semibol text-blue-600/90 mt-2">{user?.email}</p>
          </div>

          {/* Tabs */}
          <div className="w-full">
            {/* Tabs Header */}
            <div className="flex flex-col items-start gap-2 mb-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => router.push(`/admin?tab=${tab.id}`)}
                  className={`
              px-2 py-2 text-neutral-50 w-full text-start
              ${activeTab === tab.id ? "bg-neutral-500/20 rounded-lg" : ""}
            `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mt-auto"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-neutral-950 shadow rounded-lg p-5 text-neutral-50">
          {children}
        </div>
      </div>
    </div>
  );
}
