"use client";
import { MoonIcon, SunIcon, SunriseIcon, SunsetIcon } from "lucide-react";
import { useEffect, useState } from "react";

const to12Hour = (t: any) =>
  new Date(`1970-01-01T${t}`)
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .replace("AM", "a.m.")
    .replace("PM", "p.m.");

type Item = {
  name: "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
  time: string;
  iqamah?: string;
};

const trName: Record<Item["name"], string> = {
  Fajr: "Sabah",
  Sunrise: "Güneş",
  Dhuhr: "Öğle",
  Asr: "İkindi",
  Maghrib: "Akşam",
  Isha: "Yatsı",
};

const isPrayer = (n: Item["name"]) => n !== "Sunrise";
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Toronto Saatine gore, Mevcut namaz vakti ve sonraki namaz vaktini ceker
 * @param daily Günlük namaz vakitleri listesi
 * @param nowHHMM Şu anki zaman "HH:MM" formatında
 * @returns {current, next} Mevcut ve bir sonraki namaz vakti bilgileri
 */
function getCurrentAndNext(daily: Item[], nowHHMM: string) {
  debugger;
  const now = toMin(nowHHMM);

  // Sadece namazlar (Sunrise hariç) için indeks ve zaman listesi
  const prayers = daily
    .map((it, i) => ({ ...it, i, min: toMin(it.time) }))
    .filter((it) => isPrayer(it.name))
    .sort((a, b) => a.min - b.min);

  // Sonraki namaz: şimdi’den büyük ilk; yoksa ertesi günün ilk namazı (Fajr)
  const next = prayers.find((p) => p.min > now) ?? prayers[0];

  // Şu anki vakit: şimdi’ye en yakın ve küçük/eşit olan; yoksa (Fajr’dan önce) son namaz (Yatsı)
  const current =
    [...prayers].reverse().find((p) => p.min <= now) ??
    prayers[prayers.length - 1];

  return {
    current: { ...current, trName: trName[current.name] },
    next: { ...next, trName: trName[next.name] },
  };
}

export const dynamic = "force-dynamic";
type TodayResponse = {
  date: string;
  lastUpdated: string;
  status: "ok" | "error" | "warning";
  source: "cache";
  payload: any;
};

async function getToday(): Promise<TodayResponse> {
  const res = await fetch(`/api/prayer/today`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to load today: ${res.status}`);

  return res.json();
}

export default function PrayerTimes() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/api/prayer/today", { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data?.payload) return <div>Yükleniyor…</div>;

  const torontoHHMM = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const { current, next } = getCurrentAndNext(
    data.payload.dailyPrayerTimes,
    torontoHHMM,
  );

  return (
    <section id="prayer-times" className="flex flex-col gap-4 py-16 lg:py-32">
      <h2 className="text-4xl md:text-6xl text-left">Namaz Vakitleri</h2>
      <div className="md:w-[50%]">
        Namaz vakitleri, Diyanet İşleri Başkanlığı verilerine dayanarak
        sunulmaktadır. İbadetlerinizi en doğru zamanda yerine getirmeniz için
        güvenilir ve resmi kaynaklardan faydalanıyoruz.
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="md:w-[50%] text-3xl flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-4 w-full">
            <div className="w-1/2 flex flex-col bg-[#fbf2ee] text-[#1b1522] rounded-2xl p-4">
              <div className="text-lg">Şu Anki Vakit</div>
              <div className="text-2xl font-semibold text-[#e87539]">
                {current?.trName}
              </div>
              <div className="text-4xl font-bold">{current?.time}</div>
              <div className="text-lg">
                Bitiş Saati -{" "}
                <span className="font-semibold">
                  {current?.name === "Fajr"
                    ? data.payload.dailyPrayerTimes[1].time
                    : next?.time}
                </span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col bg-[#fbf2ee] text-[#1b1522] rounded-2xl p-4">
              <div className="text-lg">Sonraki Namaz</div>
              <div className="text-2xl font-semibold text-[#e87539]">
                {next?.trName}
              </div>
              <div className="text-4xl font-bold">{next?.time}</div>
              <div className="text-lg">
                Cemaat - <span className="font-semibold">{next?.iqamah}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-around items-center bg-[#fbf2ee] text-[#1b1522] rounded-2xl p-2 px-5">
            <div className="flex flex-col text-lg text-center">
              <div>Güneş Doğuşu</div>
              <div className="font-semibold">
                {to12Hour(data.payload.dailyPrayerTimes[1].time)}
              </div>
            </div>
            <hr className="h-20 w-0.5 bg-gray-300" />
            <div className="flex flex-col text-lg text-center">
              <div>Öğle Vakti</div>
              <div className="font-semibold">
                {to12Hour(data.payload.dailyPrayerTimes[2].time)}
              </div>
            </div>
            <hr className="h-20 w-0.5 bg-gray-300" />
            <div className="flex flex-col text-lg text-center">
              <div>Güneş Batışı</div>
              <div className="font-semibold">
                {to12Hour(data.payload.dailyPrayerTimes[4].time)}
              </div>
            </div>
          </div>

          <div className="w-full bg-[#ffca9c] text-[#1b1522] rounded-2xl p-2 px-5 border-4 border-white text-center">
            <div>Cumaa</div>
            <span>Saati - </span>
            <span className="font-extrabold">
              {data.payload.jumaaPrayerTime} p.m
            </span>
          </div>
        </div>

        {/* Namaz Vakitleri */}
        <div className="w-full md:w-[50%] flex flex-col bg-[#fbf2ee] text-[#1b1522] gap-3 p-1 md:p-4 rounded-2xl">
          <div className="flex justify-between items-center text-base md:text-lg font-extrabold border-b border-gray-300 rounded-2xl p-2 px-10 bg-[#e87539]">
            <div>Namaz</div>
            <div>Ezan</div>
            <div>İkame</div>
          </div>
          {/* Sabah Namazı */}
          <div className="flex justify-between items-center text-base md:text-2xl font-medium border-b border-b-gray-300 p-3">
            <div className="w-28 flex items-center gap-1 md:gap-4">
              <SunriseIcon className="text-[#e87539]" />
              <span>Sabah</span>
            </div>
            <div className="w-32">
              {to12Hour(data.payload.dailyPrayerTimes[0].time)}
            </div>
            <div className="w-32">
              {data.payload.dailyPrayerTimes[0].iqamah} a.m
            </div>
          </div>

          {/* Öğle Namazı */}
          <div className="flex justify-between items-center text-base md:text-2xl font-medium border-b border-b-gray-300 p-3">
            <div className="w-28 flex items-center gap-1 md:gap-4">
              <SunIcon className="text-[#e87539]" />
              <span>Öğle</span>
            </div>
            <div className="w-32">
              {to12Hour(data.payload.dailyPrayerTimes[2].time)}
            </div>
            <div className="w-32">
              {data.payload.dailyPrayerTimes[2].iqamah} p.m
            </div>
          </div>

          {/* İkindi Namazı */}
          <div className="flex justify-between items-center text-base md:text-2xl font-medium border-b border-b-gray-300 p-3">
            <div className="w-28 flex items-center gap-1 md:gap-4">
              <SunIcon className="text-[#e87539]" />
              <span>İkindi</span>
            </div>
            <div className="w-32">
              {to12Hour(data.payload.dailyPrayerTimes[3].time)}
            </div>
            <div className="w-32">
              {data.payload.dailyPrayerTimes[3].iqamah} p.m
            </div>
          </div>

          {/* Akşam Namazı */}
          <div className="flex justify-between items-center text-base md:text-2xl font-medium border-b border-b-gray-300 p-3">
            <div className="w-28 flex items-center gap-1 md:gap-4">
              <SunsetIcon className="text-[#e87539]" />
              <span>Akşam</span>
            </div>
            <div className="w-32">
              {to12Hour(data.payload.dailyPrayerTimes[4].time)}
            </div>
            <div className="w-32">
              {data.payload.dailyPrayerTimes[4].iqamah} p.m
            </div>
          </div>

          {/* Yatsı Namazı */}
          <div className="flex justify-between items-center text-base md:text-2xl font-medium p-3">
            <div className="w-28 flex items-center gap-1 md:gap-4">
              <MoonIcon className="text-[#e87539]" />
              <span>Yatsı</span>
            </div>
            <div className="w-32">
              {to12Hour(data.payload.dailyPrayerTimes[5].time)}
            </div>
            <div className="w-32">
              {data.payload.dailyPrayerTimes[5].iqamah} p.m
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
