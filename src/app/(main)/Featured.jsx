"use client";
import Loader from "@/components/Loader";
import PetCard from "@/components/PetCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Featured = () => {
  const {
    data: petsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-pets"],
    queryFn: async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?limit=6`,
      );

      if (!result.ok) {
        throw new Error("Failed to fetch featured pets");
      }

      return result.json();
    },
  });

  return (
    <section className="w-full py-20 px-3 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col gap-8">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
          <span className="font-semibold">Featured</span> Pets
        </h3>

        {isLoading && (
          <div className="py-20">
            <Loader />
          </div>
        )}

        {isError && (
          <p className="text-destructive text-center py-20">
            Failed to load featured pets.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {petsData?.map((pet) => (
              <PetCard key={pet?._id} pet={pet} />
            ))}
          </div>
        )}

        <Button asChild className={"px-8"}>
          <Link href="/pets">View All</Link>
        </Button>
      </div>
    </section>
  );
};

export default Featured;
