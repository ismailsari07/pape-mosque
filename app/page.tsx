'use client';

import { Button } from '@/components/ui/button';
import {
  GithubIcon,
  InstagramIcon,
  MoonIcon,
  SunIcon,
  SunriseIcon,
  SunsetIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';

export default function Home() {
  return (
    <main className="max-w-7xl w-full mx-auto">
      {/***** Header  *****/}
      <header
        id="header"
        className="flex flex-col items-center gap-6 lg:gap-12 text-center py-16 lg:py-32"
      >
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-white">
          <h1 className="text-5xl md:text-8xl font-header md:px-24">
            Muhabbetin ve <br /> Mananın Buluştuğu Yer
          </h1>
          <p className="px-0 text-center">
            Toplumumuza manevi gelişim, kültürel bağ ve hayatın her evresinde <br /> destek sunarak
            hizmet veriyoruz.
          </p>
          <div className="flex gap-4">
            <Button>Namaz Vakitleri</Button>
            <Button>Support Us ❤️</Button>
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

      <section id="prayer-times" className="flex flex-col gap-4 py-16 lg:py-32 text-white">
        <h2 className="text-4xl md:text-6xl font-header text-left">Namaz Vakitleri</h2>
        <div className="w-[50%]">
          Namaz vakitleri, Diyanet İşleri Başkanlığı verilerine dayanarak sunulmaktadır.
          İbadetlerinizi en doğru zamanda yerine getirmeniz için güvenilir ve resmi kaynaklardan
          faydalanıyoruz.
        </div>
        <div className="flex gap-8 justify-center items-center">
          <div className="w-[50%] text-xl flex flex-col gap-4 justify-center items-center border border-foreground rounded-lg p-4 text-center">
            <div>
              26 Temmuz Cumartesi <br />1 Safer 1447
            </div>

            <hr className="h-0.5 w-full bg-foreground" />

            <div className="w-full flex gap-4 justify-center items-center">
              <div className="w-1/2 text-center">
                <div>Aksam Ezanina Kalan Sure</div>
                <div>03:20:00</div>
              </div>
              <hr className="h-12 w-0.5 bg-foreground" />
              <div className="w-1/2 text-center">
                <p>Bilgisayar Saati</p>
                <p>17:34</p>
              </div>
            </div>

            <hr className="h-0.5 w-full bg-foreground" />

            <div className="text-3xl font-semibold text-center underline text-[#FFA500]">
              Cuma Saati: 2:00
            </div>
          </div>

          {/* Namaz Vakitleri */}
          <div className="w-[50%] flex flex-col gap-3">
            <div className="flex justify-around items-center text-lg px-4">
              <div>Namaz</div>
              <div>Ezan</div>
              <div>Ikame</div>
            </div>

            {/* Sabah Namazi */}
            <div className="flex justify-between items-center border border-foreground rounded-lg py-4 px-16 text-2xl shadow-2xl">
              <div className="w-28 flex items-center gap-4">
                <SunriseIcon />
                <span>Sabah</span>
              </div>

              <div className="w-28">05:34 a.m</div>
              <div className="w-28">6:00 a.m</div>
            </div>

            {/* Ogle Namazi */}
            <div className="flex justify-between items-center border border-foreground rounded-lg py-4 px-16 text-2xl shadow-2xl animated-gradient">
              <div className="w-28 flex items-center gap-4">
                <SunIcon />
                <span>Ogle</span>
              </div>

              <div className="w-28">01:15 p.m</div>
              <div className="w-28">2:00 p.m</div>
            </div>

            {/* Ikindi Namazi */}
            <div className="flex justify-between items-center border border-foreground rounded-lg py-4 px-16 text-2xl shadow-2xl">
              <div className="w-28 flex items-center gap-4">
                <SunIcon />
                <span>Ikindi</span>
              </div>

              <div className="w-28">05:34 p.m</div>
              <div className="w-28">05:45 p.m</div>
            </div>

            {/* Aksam Namazi */}
            <div className="flex justify-between items-center border border-foreground rounded-lg py-4 px-16 text-2xl shadow-2xl">
              <div className="w-28 flex items-center gap-4">
                <SunsetIcon />
                <span>Aksam</span>
              </div>

              <div className="w-28">08:34 p.m</div>
              <div className="w-28">08:34 p.m</div>
            </div>

            {/* Yatsi Namazi */}
            <div className="flex justify-between items-center border border-foreground rounded-lg py-4 px-16 text-2xl shadow-2xl">
              <div className="w-28 flex items-center gap-4">
                <MoonIcon />
                <span>Yatsi</span>
              </div>

              <div className="w-28">10:15 p.m</div>
              <div className="w-28">10:15 p.m</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
