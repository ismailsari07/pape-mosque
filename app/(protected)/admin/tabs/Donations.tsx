"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllDonations, getDonationStats } from "@/lib/api/donations";

export default function Donations() {
  const { data: donations, isLoading } = useQuery({
    queryKey: ["admin-donations"],
    queryFn: getAllDonations,
  });

  const { data: stats } = useQuery({
    queryKey: ["donation-stats"],
    queryFn: getDonationStats,
  });

  // Format para
  const formatCurrency = (cents: number, currency: string) => {
    const amount = cents / 100;
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Format tarih
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Bağışlar</h1>
        <p className="text-neutral-400 mt-1">
          Stripe üzerinden yapılan tüm bağışlar
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">
                  Toplam Bağış
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(stats.total, "CAD")}
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">
                  Bağış Sayısı
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.count}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Ortalama</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(Math.round(stats.total / stats.count), "CAD")}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donations Table */}
      <div className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
        {donations && donations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-700">
              <thead className="bg-neutral-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Bağışçı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Fon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Tutar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Stripe Event
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {donations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="hover:bg-neutral-750 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                      {formatDate(donation.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center">
                          <span className="text-xs font-medium text-neutral-300">
                            {donation.donor_email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            {donation.donor_email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-700 text-neutral-300">
                        {donation.fund}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-emerald-400">
                        {formatCurrency(
                          donation.amount_cents,
                          donation.currency,
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs text-neutral-400 bg-neutral-900 px-2 py-1 rounded">
                        {donation.stripe_event_id}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-300">
              Henüz bağış yok
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Stripe webhook'ları aktif olduğunda bağışlar burada görünecek.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
