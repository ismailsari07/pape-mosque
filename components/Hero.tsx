import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      id="header"
      className="flex flex-col items-center gap-6 lg:gap-12 text-center py-8 lg:py-32"
    >
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        <h1 className="text-5xl md:text-8xl md:px-24">
          <motion.span variants={item} className="text-green-500">
            Türk İslam
          </motion.span>
          <br /> <motion.span variants={item}>Vakfı Kanada</motion.span>
        </h1>
        <motion.p variants={item} className="px-0 text-center">
          Toplumumuza manevi gelişim, kültürel bağ ve hayatın her evresinde{" "}
          <br /> destek sunarak hizmet veriyoruz.
        </motion.p>
        <div className="flex flex-col lg:flex-row gap-4">
          <motion.div variants={item}>
            <Link href="#prayer-times"><Button className="max-md:text-sm">Namaz Vakitleri</Button></Link>
          </motion.div>
          <motion.div variants={item}>
            <Link href="#services">
            <Button className="max-md:text-sm">Hizmetler ve Etkinlikler</Button>
            </Link>
          </motion.div>
        </div>
        <div className="flex">
          <motion.div variants={item}>
            <Button size="icon" variant="ghost" className="opacity-70">
              <InstagramIcon />
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <Button size="icon" variant="ghost" className="opacity-70">
              <GithubIcon />
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <Button size="icon" variant="ghost" className="opacity-70">
              <TwitterIcon />
            </Button>
          </motion.div>
          <motion.div variants={item}>
            <Button size="icon" variant="ghost" className="opacity-70">
              <YoutubeIcon />
            </Button>
          </motion.div>
        </div>
      </div>
      <motion.video
        variants={item}
        className="w-fit rounded-xl"
        autoPlay
        muted
        loop
      >
        <source src="/media/ayasofya.webm" type="video/webm" />
        Your browser does not support the video
      </motion.video>
    </motion.header>
  );
}
