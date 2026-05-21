"use client";
import { Button } from "@/components/ui/button";
import { PawPrintIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Love, care and give what they deserve",
    description:
      "Give rescued pets a safe, loving forever home they truly deserve",
  },
  {
    title: "Help prevent animal overpopulation",
    description:
      "Adopting helps reduce stray population and supports animal welfare",
  },
  {
    title: "Adoption is good for your health too",
    description: "Pets reduce stress, improve mood, and bring daily happiness",
  },
  {
    title: "Save a life, gain a friend",
    description:
      "Every adoption gives a pet a second chance and a loyal companion",
  },
];

const WhyAdoptPets = () => {
  return (
    <section className="bg-secondary/5 py-20 px-3">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <Image
          src={"/cat.png"}
          width={500}
          height={500}
          alt="Pet image"
          className="rounded-lg w-full aspect-square object-cover"
        />

        <div className="flex flex-col gap-5">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground block text-center md:text-left">
            <span className="font-semibold">Why</span> Adopt Pets?
          </h3>

          <p>
            Adoption is an act of kindness that changes lives. With care and
            awareness, we can create better futures for animals and their
            humans.
          </p>

          <div className="grid grid-cols-2 gap-5">
            {cards?.map((card, index) => (
              <div
                key={`card_${index}`}
                className="bg-primary/10 rounded-sm p-3 flex flex-col gap-2 items-start w-full"
              >
                <h4 className="text-lg font-semibold uppercase text-foreground">
                  {card?.title}
                </h4>
                <p className="text-sm font-normal text-foreground/70">
                  {card?.description}
                </p>
              </div>
            ))}
          </div>

          <Button asChild className={"w-fit px-7"}>
            <Link href="/all-pets">
              <PawPrintIcon size={20} /> Find your friend now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default WhyAdoptPets;
