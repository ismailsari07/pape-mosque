"use client";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const services = [
  {
    title: "Cenaze Hizmetleri",
    description:
      "İslami cenaze düzenlemeleri, defin işlemleri ve kayıp zamanlarında manevi destek sağlıyoruz.",
    imageUrl: "/service1.jpg",
  },
  {
    title: "Kur'an Dersleri",
    description:
      "Deneyimli hocalardan huzurlu ve saygılı bir ortamda Kur’an okumayı ve anlamayı öğrenin.",
    imageUrl: "/service2.jpg",
  },
  {
    title: "Nikah Hizmetleri",
    description:
      "İslami nikah törenleri ve evlilik desteği sunuyor, inanç ve geleneklere bağlı kalıyoruz.",
    imageUrl: "/service3.jpg",
  },
  {
    title: "Ramazan İftar Yemekleri",
    description:
      "Ramazan boyunca günlük iftar yemeklerimizde topluluğumuza katılın, birlik ve imanı pekiştirin.",
    imageUrl: "/service4.jpg",
  },
];

export default function Services() {
  const [selectedServices, setSelectedServices] = useState(services[0]);

  return (
    <section id="services" className="flex flex-col gap-3 py-16 lg:py-32">
      <h3 className="text-4xl md:text-6xl font-semibold">
        Dini ve Sosyal Hizmetler
      </h3>
      <p className="md:w-1/2">
        Cenaze hizmetleri, nikah törenleri, Kur’an dersleri ve Ramazan iftar
        yemekleri dâhil olmak üzere temel dini ve toplumsal hizmetler sunuyoruz.
        Amacımız, manevi yolculuğunuzda sizlere destek olmak ve anlamlı
        hizmetler ile ilgiyi güçlendirerek topluluk bağlarımızı
        kuvvetlendirmektir.
      </p>
      <div className="flex flex-col md:flex-row gap-5 justify-between items-start">
        <div className="hidden w-1/3 md:flex flex-col gap-2 items-start">
          {services.map((service) => (
            <motion.li
              key={service.title}
              initial={false}
              animate={{
                backgroundColor:
                  service === selectedServices ? "#192017" : "transparent",
              }}
              className="rounded-2xl hover:bg-[#192017] p-3 list-none"
              onClick={() => setSelectedServices(service)}
            >
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </motion.li>
          ))}
        </div>

        <nav className="block md:hidden bg-white border-b border-gray-200 rounded-t-lg px-2 py-1 w-full h-auto">
          <ul className="flex text-sm font-medium space-x-1 overflow-x-auto overflow-y-hidden">
            {services.map((item) => (
              <motion.li
                key={item.title}
                initial={false}
                className={`relative px-4 py-2 rounded-t-md cursor-pointer flex items-center gap-2 transition-colors ${
                  selectedServices.title === item.title
                    ? "bg-gray-100 text-black"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedServices(item)}
              >
                <span>{item.title}</span>

                {selectedServices.title === item.title && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-orange-500 rounded"
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/*TODO: duzenle; iki tane main container var*/}
        <div className="w-2/4 hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedServices ? selectedServices.title : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                width={500}
                height={500}
                src={selectedServices ? selectedServices.imageUrl : "empty"}
                alt="services"
                className="w-full h-auto rounded-2xl border border-amber-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:w-2/4 block md:hidden h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedServices ? selectedServices.title : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                width={500}
                height={500}
                src={selectedServices ? selectedServices.imageUrl : "empty"}
                alt="services"
                className="rounded-2xl border border-amber-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
