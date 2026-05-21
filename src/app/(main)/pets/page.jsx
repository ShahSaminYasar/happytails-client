"use client";
import Loader from "@/components/Loader";
import PetCard from "@/components/PetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllPetsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [species, setSpecies] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pets", searchQuery, species],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.set("name", searchQuery);
      if (species) params.set("species", species);
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?${params.toString()}`,
      );
      return result.json();
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 py-10 flex flex-col gap-10">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground text-center md:text-left">
        Browse <span className="font-semibold">All Pets</span>
      </h3>

      <section className="w-full flex flex-col sm:flex-row items-center gap-3">
        <Select
          value={species}
          onValueChange={(val) => setSpecies(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All species</SelectItem>
            <SelectItem value="Cat">Cat</SelectItem>
            <SelectItem value="Dog">Dog</SelectItem>
            <SelectItem value="Bird">Bird</SelectItem>
            <SelectItem value="Fish">Fish</SelectItem>
            <SelectItem value="Rabbit">Rabbit</SelectItem>
          </SelectContent>
        </Select>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchQuery(e.target.name.value);
          }}
          className="flex items-center gap-2 w-full sm:max-w-sm ml-auto sm:flex-1"
        >
          <Input
            placeholder="Search by pet's name"
            name="name"
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <MagnifyingGlassIcon size={20} />
          </Button>
        </form>
      </section>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      )}

      {isError && (
        <p className="text-center text-destructive py-20">
          Something went wrong. Please try again.
        </p>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <p className="text-center text-foreground/50 py-20">
          No pets found. Try a different search or filter.
        </p>
      )}

      {!isLoading && !isError && data?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;
