import { Suspense } from "react";
import AdminClient from "./AdminClient";
import AdminShell from "../AdminShell";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminShell>
        <AdminClient />
      </AdminShell>
    </Suspense>
  );
}
