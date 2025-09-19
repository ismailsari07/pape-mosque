export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">İşlem iptal edildi</h1>
      <p>
        Bağış işlemi iptal edildi. Tekrar denemek isterseniz bağış sayfasına
        dönebilirsiniz.
      </p>
      <a href="/donation" className="mt-6 text-blue-600 underline">
        Bağış sayfasına dön
      </a>
    </div>
  );
}
