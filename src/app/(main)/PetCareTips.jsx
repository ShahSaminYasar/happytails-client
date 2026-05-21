"use client";
import { Button } from "@/components/ui/button";
import { PawPrintIcon } from "@phosphor-icons/react";
import Link from "next/link";

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
    <section className="py-20 px-3">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground text-center md:text-left">
              <span className="font-semibold">Pet Care</span> Tips
            </h3>
            <p className="text-foreground/60 text-center md:text-left max-w-md">
              A happy pet starts with an informed owner. Here are six essentials
              every pet parent should know.
            </p>
          </div>
          <Button asChild className="w-fit px-7 self-center md:self-auto">
            <Link href="/pets">
              <PawPrintIcon size={20} /> Adopt a pet
            </Link>
          </Button>
        </div>

        {/* Tips grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tips.map((tip, index) => (
            <div
              key={`tip_${index}`}
              className="bg-primary/10 rounded-sm p-5 flex flex-col gap-3 items-start w-full"
            >
              <span className="text-3xl">{tip.icon}</span>
              <h4 className="text-lg font-semibold uppercase text-foreground">
                {tip.title}
              </h4>
              <p className="text-sm font-normal text-foreground/70 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;
