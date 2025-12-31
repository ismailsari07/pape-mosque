"use client";
import Hero from "@/components/Hero";
import News from "@/components/News";
import PrayerTimes from "@/components/PrayerTimes";
import Services from "@/components/Services";
import UpcomingEvents from "@/components/UpcomingEvents";
import { AuthStatus } from "@/components/AuthStatus";

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <PrayerTimes />
      <Services />
      <UpcomingEvents />
      <News />
    </main>
  );
}
