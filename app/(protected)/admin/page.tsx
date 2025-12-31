import Events from "./tabs/Events";
import Donations from "./tabs/Donations";
import Announcements from "./tabs/Announcements";
import { use } from "react";

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default function AdminDashboard({ searchParams }: PageProps) {
  const { tab = "events" } = use(searchParams);

  if (tab === "donations") return <Donations />;
  if (tab === "announcements") return <Announcements />;
  return <Events />;
}
