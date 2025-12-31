type Cache<T> = { dayKey: string | null; data: T | null };

let cache: Cache<any> = { dayKey: null, data: null };

export function todayKeyTZ(tz = "America/Toronto") {
  const d = new Date();
  const { y, m, day } = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(d)
    .reduce<Record<string, string>>(
      (a, p) => (p.type !== "literal" && (a[p.type] = p.value), a),
      {},
    );
  return `${y}-${m}-${day}`;
}

export function getDaily<T = any>(): T | null {
  return cache.dayKey === todayKeyTZ() ? (cache.data as T) : null;
}

export function setDaily<T = any>(data: T) {
  cache = { dayKey: todayKeyTZ(), data };
}
