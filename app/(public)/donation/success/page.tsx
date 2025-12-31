import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Teşekkürler 🙏</h1>
      <p>Bağışınız başarıyla alındı. Allah kabul etsin.</p>
      <Button className="mt-6">
        <Link href={"/"}>
        Ana sayfaya dön
        </Link>
      </Button>
    </div>
  );
}
