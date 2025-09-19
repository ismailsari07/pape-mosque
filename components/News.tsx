import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function News() {
  return (
    <section
      id="news"
      className="flex flex-col md:flex-row justify-between items-center max-md:gap-7 py-16 md:py-32"
    >
      <div className="md:w-1/2 flex flex-col gap-2 text-left">
        <h3 className="text-4xl md:text-6xl font-semibold">İletişimde Kalın</h3>
        <p className="text-lg">
          Topluluk haberleri, etkinlik davetleri ve önemli duyurular için abone
          olun. Gizliliğinize saygı duyuyoruz ve yalnızca anlamlı
          bilgilendirmeler gönderiyoruz.
        </p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Email Adresiniz</Label>
        <Input type="email" id="email" placeholder="Email" />
        <Button variant={"default"} size={"lg"}>
          Abone Ol
        </Button>
      </div>
    </section>
  );
}
