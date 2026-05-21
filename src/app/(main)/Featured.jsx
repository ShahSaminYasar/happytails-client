import PetCard from "@/components/PetCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Featured = async () => {
  const petsData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?limit=6`,
  ).then((res) => res.json());

  return (
    <section className="w-full py-20 px-3 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col gap-8">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">
          <span className="font-semibold">Featured</span> Pets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {petsData?.map((pet) => (
            <PetCard key={pet?._id} pet={pet} />
          ))}
        </div>

        <Button asChild className={"px-8"}>
          <Link href="/pets">View All</Link>
        </Button>
      </div>
    </section>
  );
};
export default Featured;
