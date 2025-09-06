import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const services = [
  {
    title: "Funeral Services",
    description:
      "We assist with Islamic funeral arrangements, burials, and provide spiritual support during times of loss.",
    imageUrl: "/service1.jpg",
  },
  {
    title: "Qur'an Lessons",
    description:
      "Learn to read and understand the Qur'an from experienced teachers in a calm, respectful setting.",
    imageUrl: "/service2.jpg",
  },
  {
    title: "Marriage Services",
    description:
      "We offer Islamic Nikah ceremonies and marriage support, guided by faith and community traditions.",
    imageUrl: "/service3.jpg",
  },
  {
    title: "Ramadan Iftar Meals",
    description:
      "Join our welcoming community for daily iftar meals during Ramadan, fostering connection and faith.",
    imageUrl: "/service4.jpg",
  },
];

export default function Services() {
  const [selectedServices, setSelectedServices] = useState(services[0]);

  return (
    <section id="services" className="flex flex-col gap-3 py-16 lg:py-32">
      <h3 className="text-4xl md:text-6xl font-semibold">Our Services</h3>
      <p className="md:w-1/2">
        We offer essential religious and community services including funerals,
        marriage ceremonies, Quran lessons, and Ramadan iftar meals. Our goal is
        to support your spiritual journey and strengthen our community bonds
        through meaningful service and care.
      </p>
      <div className="flex gap-5 justify-between items-start">
        <div className="w-1/3 flex flex-col gap-2 items-start">
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
        <div className="w-2/4">
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
                className="w-full h-auto rounded-2xl border-2 border-amber-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
