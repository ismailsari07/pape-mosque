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
          <div className="w-[50%] text-3xl flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-4 w-full">
              <div className="w-1/2 flex flex-col bg-[#fbf2ee] text-[#1b1522] rounded-2xl p-4">
                <div className="text-lg">Now Time is</div>
                <div className="text-2xl font-semibold text-[#e87539]">Ogle</div>
                <div className="text-4xl font-bold">12:27</div>
                <div className="text-lg">
                  End Time - <span className="font-semibold">3:54 p.m</span>
                </div>
              </div>

              <div className="w-1/2 flex flex-col bg-[#fbf2ee] text-[#1b1522] rounded-2xl p-4">
                <div className="text-lg">Next Prayer is</div>
                <div className="text-2xl font-semibold text-[#e87539]">Ikindi</div>
                <div className="text-4xl font-bold">03:54</div>
                <div className="text-lg">
                  Azan - <span className="font-semibold">5.15 p.m</span>
                </div>
                <div className="text-lg">
                  Jamaat - <span className="font-semibold">5:30 p.m</span>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-around items-center bg-[#fbf2ee] text-[#1b1522] rounded-2xl p-2 px-5">
              <div className="flex flex-col text-lg text-center">
                <div>Sunrise</div>
                <div className="font-semibold">6:17 a.m</div>
              </div>
              <hr className="h-20 w-0.5 bg-gray-300" />
              <div className="flex flex-col text-lg text-center">
                <div>Mid Day</div>
                <div className="font-semibold">2:43 p.m</div>
              </div>
              <hr className="h-20 w-0.5 bg-gray-300" />
              <div className="flex flex-col text-lg text-center">
                <div>Sunset</div>
                <div className="font-semibold">6:57 p.m</div>
              </div>
            </div>

            <div className="w-full bg-[#ffca9c] text-[#1b1522] rounded-2xl p-2 px-5 border-4 border-white text-center">
              <div>Cumaa</div>
              <span>Saati - </span>
              <span className="font-extrabold">2:00 p.m</span>
            </div>
          </div>

          {/* Namaz Vakitleri */}
          <div className="w-[50%] flex flex-col bg-[#fbf2ee] text-[#1b1522] gap-3 p-4 rounded-2xl">
            <div className="flex justify-between items-center text-lg font-extrabold border-b border-gray-300 rounded-2xl p-2 px-10 bg-[#e87539]">
              <div>Namaz</div>
              <div>Ezan</div>
              <div>Ikame</div>
            </div>
            {/* Sabah Namazı */}
            <div className="flex justify-between items-center text-2xl font-medium border-b border-b-gray-300 p-3">
              <div className="w-28 flex items-center gap-4">
                <SunriseIcon className="text-[#e87539]" />
                <span>Sabah</span>
              </div>
              <div className="w-32">05:34 a.m</div>
              <div className="w-32">06:00 a.m</div>
            </div>

            {/* Öğle Namazı */}
            <div className="flex justify-between items-center text-2xl font-medium border-b border-b-gray-300 p-3">
              <div className="w-28 flex items-center gap-4">
                <SunIcon className="text-[#e87539]" />
                <span>Öğle</span>
              </div>
              <div className="w-32">01:15 p.m</div>
              <div className="w-32">01:30 p.m</div>
            </div>

            {/* İkindi Namazı */}
            <div className="flex justify-between items-center text-2xl font-medium border-b border-b-gray-300 p-3">
              <div className="w-28 flex items-center gap-4">
                <SunIcon className="text-[#e87539]" />
                <span>İkindi</span>
              </div>
              <div className="w-32">04:45 p.m</div>
              <div className="w-32">05:00 p.m</div>
            </div>

            {/* Akşam Namazı */}
            <div className="flex justify-between items-center text-2xl font-medium border-b border-b-gray-300 p-3">
              <div className="w-28 flex items-center gap-4">
                <SunsetIcon className="text-[#e87539]" />
                <span>Akşam</span>
              </div>
              <div className="w-32">08:21 p.m</div>
              <div className="w-32">08:30 p.m</div>
            </div>

            {/* Yatsı Namazı */}
            <div className="flex justify-between items-center text-2xl font-medium p-3">
              <div className="w-28 flex items-center gap-4">
                <MoonIcon className="text-[#e87539]" />
                <span>Yatsı</span>
              </div>
              <div className="w-32">10:05 p.m</div>
              <div className="w-32">10:15 p.m</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
