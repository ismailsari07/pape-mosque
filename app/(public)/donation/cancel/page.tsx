import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">İşlem iptal edildi</h1>
      <p>
        Bağış işlemi iptal edildi. Tekrar denemek isterseniz bağış sayfasına
        dönebilirsiniz.
      </p>
      <Button className="mt-6">
        <Link href={"/"}>
        Ana sayfaya dön
        </Link>
      </Button>
    </div>
  );
}
