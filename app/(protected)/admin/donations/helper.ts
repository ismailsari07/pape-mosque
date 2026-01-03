export const formatCurrency = (cents: number, currency: string) => {
  if (typeof cents !== "number" || Number.isNaN(cents) || !currency) {
    return "—";
  }

  const amount = cents / 100;
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
