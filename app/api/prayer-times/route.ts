// /app/api/prayer-times/route.ts
import { NextResponse } from "next/server";

const SOURCE = "https://pape-api.onrender.com/prayer-times";

// ---- Günlük cache (America/Toronto) ----
type Cache<T> = { dayKey: string | null; data: T | null };
let cache: Cache<any> = { dayKey: null, data: null };

function todayKeyTZ(tz = "America/Toronto") {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(d)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
  return `${parts.year}-${parts.month}-${parts.day}`; // YYYY-MM-DD
}
function getDaily<T = any>(): T | null {
  console.log("GET cache?", cache.dayKey, "today", todayKeyTZ());
  return cache.dayKey === todayKeyTZ() ? (cache.data as T) : null;
}
function setDaily<T = any>(data: T) {
  console.log("SET cache", todayKeyTZ());
  cache = { dayKey: todayKeyTZ(), data };
}
// ----------------------------------------

// Tek istek için uzun timeout (örn. 180 sn)
async function fetchWithTimeout(url: string, ms = 180_000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return await res.json(); // JSON döndür (cache'e yazmak için)
  } finally {
    clearTimeout(t);
  }
}

// Upstream için sağlam fetch: timeout + 5xx/Network retry + güvenli JSON parse
async function fetchFromUpstream(
  url: string,
  {
    timeoutMs = 180_000, // tek deneme timeout
    attempts = 4, // toplam deneme sayısı
    baseDelayMs = 4000, // backoff'un tabanı (i * base)
  } = {},
) {
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  for (let i = 1; i <= attempts; i++) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), timeoutMs);

    try {
      const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });

      // 2xx → veriyi döndür
      if (res.ok) {
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) return await res.json();
        // JSON değilse yine de parse etmeyi dene (bazı servisler yanlış header döndürüyor)
        const txt = await res.text();
        try {
          return JSON.parse(txt);
        } catch {
          return txt;
        }
      }

      // 4xx → tekrar denemeye gerek yok, hemen hata
      if (res.status >= 400 && res.status < 500) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `Upstream ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}`,
        );
      }

      // 5xx → retry (backoff)
      const body = await res.text().catch(() => "");
      if (i < attempts) {
        await delay(i * baseDelayMs);
        continue;
      }
      throw new Error(
        `Upstream ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}`,
      );
    } catch (err) {
      // Ağ/timeout → retry et, son denemede hatayı fırlat
      if (i < attempts) {
        await delay(i * baseDelayMs);
        continue;
      }
      throw err instanceof Error ? err : new Error("network/timeout");
    } finally {
      clearTimeout(to);
    }
  }

  // teorik olarak buraya düşmez
  throw new Error("unreachable");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "1";
  console.log("force degeri:", force);

  // 1) Günlük cache varsa ve force değilse direkt dön
  if (force) {
    const cached = getDaily();
    console.log("cached: ", cached);
    if (cached) return NextResponse.json(cached, { status: 200 });
  }

  // 2) Gerekirse bir kez çek ve cache'le
  try {
    const json = await fetchFromUpstream(SOURCE);
    setDaily(json);
    return NextResponse.json(json, { status: 200 });
  } catch (e: any) {
    // 3) Canlı çekilemezse ve eski cache varsa onu dön
    const cached = getDaily();
    if (cached) return NextResponse.json(cached, { status: 200 });

    // 4) Hiç veri yoksa hata
    return NextResponse.json(
      { error: e?.message ?? "fetch failed" },
      { status: 504 },
    );
  }
}
