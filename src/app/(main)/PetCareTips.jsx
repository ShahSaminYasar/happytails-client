"use client";

import { Button } from "@/components/ui/button";
import { PawPrintIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { motion } from "motion/react";

const tips = [
  {
    icon: "🥗",
    title: "Balanced Nutrition",
    description:
      "Feed species-appropriate meals at consistent times. Avoid human food and always provide fresh water.",
  },
  {
    icon: "🏃",
    title: "Daily Exercise",
    description:
      "Dogs need walks, cats need play. Regular activity keeps weight healthy and minds sharp.",
  },
  {
    icon: "🩺",
    title: "Routine Vet Visits",
    description:
      "Annual checkups catch issues early. Keep vaccinations and parasite prevention up to date.",
  },
  {
    icon: "🛁",
    title: "Grooming & Hygiene",
    description:
      "Regular brushing, nail trims, and dental care prevent discomfort and long-term health issues.",
  },
  {
    icon: "🧠",
    title: "Mental Stimulation",
    description:
      "Puzzle toys, training sessions, and new experiences prevent boredom and destructive behavior.",
  },
  {
    icon: "❤️",
    title: "Love & Bonding",
    description:
      "Spend quality time daily. Pets thrive on affection, routine, and feeling truly safe at home.",
  },
];

const PetCareTips = () => {
  return (
    <section className="pb-20 pt-5 px-3 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div className="flex flex-col gap-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground text-center md:text-left"
            >
              <span className="font-semibold">Pet Care</span> Tips
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-foreground/60 text-center md:text-left max-w-md"
            >
              A happy pet starts with an informed owner. Here are six essentials
              every pet parent should know.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            <Button asChild className="w-fit px-7 self-center md:self-auto">
              <Link href="/pets">
                <PawPrintIcon size={20} />
                Adopt a pet
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tips.map((tip, index) => (
            <motion.div
              key={`tip_${index}`}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="bg-primary/10 rounded-sm p-5 flex flex-col gap-3 items-start w-full"
            >
              <motion.span
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15 + index * 0.08,
                  duration: 0.4,
                }}
                className="text-3xl"
              >
                {tip.icon}
              </motion.span>

              <motion.h4
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  duration: 0.4,
                }}
                className="text-lg font-semibold uppercase text-foreground"
              >
                {tip.title}
              </motion.h4>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.28 + index * 0.08,
                  duration: 0.45,
                }}
                className="text-sm font-normal text-foreground/70 leading-relaxed"
              >
                {tip.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;
