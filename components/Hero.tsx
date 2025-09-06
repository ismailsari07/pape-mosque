import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export default function Hero() {
  return (
    <header
      id="header"
      className="flex flex-col items-center gap-6 lg:gap-12 text-center py-8 lg:py-32"
    >
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-white">
        <h1 className="text-5xl md:text-8xl font-header md:px-24">
          Muhabbetin ve <br /> Mananın Buluştuğu Yer
        </h1>
        <p className="px-0 text-center">
          Toplumumuza manevi gelişim, kültürel bağ ve hayatın her evresinde{" "}
          <br /> destek sunarak hizmet veriyoruz.
        </p>
        <div className="flex gap-4">
          <Button className="max-md:text-sm">Namaz Vakitleri</Button>
          <Button className="max-md:text-sm">Support Us ❤️</Button>
        </div>
        <div>
          <Button size="icon" variant="ghost" className="opacity-70">
            <InstagramIcon />
          </Button>
          <Button size="icon" variant="ghost" className="opacity-70">
            <GithubIcon />
          </Button>
          <Button size="icon" variant="ghost" className="opacity-70">
            <TwitterIcon />
          </Button>
          <Button size="icon" variant="ghost" className="opacity-70">
            <YoutubeIcon />
          </Button>
        </div>
      </div>
      <video className="w-fit rounded-xl" autoPlay muted loop>
        <source src="/media/ayasofya.webm" type="video/webm" />
        Your browser does not support the video
      </video>
    </header>
  );
}
