"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllEvents, deleteEvent } from "@/lib/api/events";
import Link from "next/link";
import { useState } from "react";

export default function EventsPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: getAllEvents,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      setDeleteId(null);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Etkinlikler</h1>
        {/*<Link
          href="/admin/events/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          + Yeni Etkinlik Ekle
        </Link>*/}
      </div>

      {/* Events Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {events && events.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sıra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gün / Saat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Özellikler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.display_order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {event.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.day}</div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {event.is_recurring && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Haftalık
                        </span>
                      )}
                      {event.is_featured && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          Ana Sayfa
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.is_active ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Aktif
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Pasif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4 pointer-events-none"
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      disabled={
                        deleteMutation.isPending && deleteId === event.id
                      }
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 pointer-events-none"
                    >
                      {deleteMutation.isPending && deleteId === event.id
                        ? "Siliniyor..."
                        : "Sil"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Henüz etkinlik yok
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Yeni etkinlik ekleyerek başlayın.
            </p>
            {/* <div className="mt-6">
              <Link
                href="/admin/events/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                + Yeni Etkinlik Ekle
              </Link>
            </div>*/}
          </div>
        )}
      </div>
    </div>
  );
}
