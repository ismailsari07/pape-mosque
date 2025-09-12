"use client";
import { PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function About() {
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
      className="container flex flex-col gap-3 py-8 lg:py-32"
    >
      <motion.p variants={item} className="text-4xl lg:text-6xl font-bold">
        Dernek Tarihi
      </motion.p>
      <motion.p variants={item} className="text-lg max-w-4xl">
        Kanada Türk İslam Kültür Derneği, Nisan 1983’te kuruldu. 336 Pape
        Avenue, Toronto, Ontario’daki Kanada Türk İslam Merkezi 1984’te alındı.
        Onarımı gönüllüler tarafından üç-dört senede tamamlandı. Merkezimizin
        giriş katında mescid ve oturma salonu, üst katında ise din görevlimiz
        için bir lojman bulunmaktadır.
      </motion.p>
      <motion.p variants={item} className="text-lg max-w-4xl">
        Kanada Türk İslam Vakfı, Haziran 1987’de kuruldu. 26 değişmeyen üye ile
        kurulan vakfımızın üye sayısı 29’a ulaşmıştır. Vakfımız ve derneğimiz
        iki kardeş kuruluş idi; 2014’te iki kardeş kuruluş Kanada Türk İslam
        Vakfı adı altında birleşti. Vakfımız, Kanada federal hükümeti nezdinde
        charitable ve incorporation olarak kayıtlıdır.
      </motion.p>
      <motion.p variants={item} className="text-lg max-w-4xl">
        Merkezimizin ve mezarlığımızın mülkiyeti vakfımıza aittir. Merkezimizin
        alınmasında ve onarımında toplumumuz bizleri bağışlarıyla her zaman
        desteklediler. Mayıs 1983 – Mayıs 1987 döneminde 500 dolar ve üzerinde
        gelen bağışları gösteren bir tablo (soyadına göre alfabetik olarak)
        merkezimizde sergilenmektedir. Bazı vatandaşlarımız isimlerinin
        açıklanmasını istemediklerinden bu listede gözükmemektedirler.
      </motion.p>

      <motion.p variants={item} className="text-5xl font-bold mt-24">
        Görevliler
      </motion.p>
      <motion.p variants={item} className="text-lg max-w-4xl">
        Bu liste, camimizin faaliyetlerini en iyi şekilde yürütebilmek için
        özveriyle görev yapan ana ekip üyelerimizi göstermektedir.
      </motion.p>
      <div className="flex gap-3 md:gap-10 flex-wrap">
        {[1, 2, 3, 4, 5].map((x) => (
          <motion.div
            key={x}
            variants={item}
            className="border-2 border-amber-100 rounded-2xl p-3"
          >
            <p className="font-bold text-xl">Ahmet Er</p>
            <p className="text-muted-foreground mb-4">Baskan</p>
            <div className="flex gap-2 items-center">
              <PhoneIcon size={16} /> <a href="#">437 443 9648</a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
