"use client";

import { useSearchParams } from "next/navigation";
import Events from "./tabs/Events";
import Donations from "./tabs/Donations";
import Announcements from "./tabs/Announcements";

export default function AdminClient() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "events";

  if (tab === "donations") return <Donations />;
  if (tab === "announcements") return <Announcements />;

  return <Events />;
}
