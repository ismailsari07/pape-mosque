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
  console.log("Selected:", selectedServices);

  return (
    <section id="services" className="flex flex-col gap-3 py-16 lg:py-32">
      <h3 className="text-4xl md:text-6xl font-semibold">Our Services</h3>
      <p className="md:w-1/2">
        We offer essential religious and community services including funerals,
        marriage ceremonies, Quran lessons, and Ramadan iftar meals. Our goal is
        to support your spiritual journey and strengthen our community bonds
        through meaningful service and care.
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
                className="w-full h-auto rounded-2xl border-2 border-amber-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:w-2/4 block md:hidden">
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
                className="rounded-2xl border-2 border-amber-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
