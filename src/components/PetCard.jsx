"use client";
import { MapPinIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const speciesEmoji = {
  Dog: "🐕",
  Cat: "🐈",
  Bird: "🐦",
  Rabbit: "🐇",
};

const PetCard = ({ pet }) => {
  const [imgSrc, setImgSrc] = useState(
    pet?.photo || "https://blocks.astratic.com/img/general-img-landscape.png",
  );

  return (
    <div className="group w-full max-w-sm mx-auto relative bg-card rounded-sm overflow-hidden border border-border hover:shadow-sm transition-all duration-150 flex flex-col">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-border">
        <Image
          src={imgSrc}
          width={500}
          height={500}
          alt={pet?.name}
          onError={() =>
            setImgSrc(
              "https://blocks.astratic.com/img/general-img-landscape.png",
            )
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

        {/* Species badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 capitalize">
          <span>{speciesEmoji[pet?.species] ?? "🐾"}</span>
          {pet?.species}
        </span>

        {/* Fee badge */}
        <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          ${pet?.adoptionFee}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Name + breed */}
        <div>
          <h3 className="text-lg font-bold text-foreground leading-tight">
            {pet?.name}
          </h3>
          <p className="text-sm text-secondary/50 font-medium">{pet?.breed}</p>
        </div>

        {/* Pills row */}
        <div className="flex flex-wrap gap-2">
          <Pill>{pet?.gender}</Pill>
          <Pill>
            {pet?.age} {pet?.age === 1 ? "yr" : "yrs"}
          </Pill>
          <Pill color="green">{pet?.vaccinationStatus}</Pill>
          <Pill color={pet?.healthStatus === "Healthy" ? "blue" : "amber"}>
            {pet?.healthStatus}
          </Pill>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 flex-1">
          {pet?.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <MapPinIcon />
          {pet?.location}
        </div>

        {/* Details Button */}
        <Button asChild>
          <Link href={`/pets/${pet?._id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

const Pill = ({ children, color = "stone" }) => {
  const styles = {
    stone: "bg-border text-stone-600",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${styles[color]}`}
    >
      {children}
    </span>
  );
};

export default PetCard;
