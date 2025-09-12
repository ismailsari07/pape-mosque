'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

  export default function Donation() {
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
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      id="about"
      className="container flex flex-col items-center gap-3 py-8 lg:py-32 lg:text-center"
    >
      <motion.p className="text-4xl md:text-6xl font-bold" variants={item}>Bagis</motion.p>
      <motion.p className="text-lg text-center" variants={item}>
        Sadaka ve zekâtlarını camimiz üzerinden yapmak isteyenler ile camimizin
        ihtiyaçlarına katkıda bulunmak isteyenler, uygun bağış seçeneklerinden
        dilediklerini tercih ederek destek olabilirler.
      </motion.p>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mt-10">
        <div className="flex flex-col items-start lg:items-center gap-3">
          <motion.p className="text-4xl md:text-6xl font-bold" variants={item}>Zekat</motion.p>
          <motion.p className="font-semibold" variants={item}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quod.
            Nostrum ea obcaecati recusandae fugit?
          </motion.p>
          <motion.div variants={item}>
          <Button size={"lg"}>
            Zekat <ArrowRight size={20} />
          </Button>
            </motion.div> 
        </div>
        <motion.hr variants={item} className="hidden md:block w-[1px] h-72 lg:block bg-gray-200" />
        <div className="flex flex-col items-start lg:items-center gap-3">
          <motion.p className="text-4xl md:text-6xl font-bold" variants={item}>Sadaka</motion.p>
          <motion.p className="font-semibold" variants={item}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quod.
            Nostrum ea obcaecati recusandae fugit?
          </motion.p>
          <motion.div variants={item}>
          <Button size={"lg"}>
            Sadaka <ArrowRight size={20} />
          </Button>
            </motion.div> 
        </div>
      </div>
    </motion.section>
  );
}
