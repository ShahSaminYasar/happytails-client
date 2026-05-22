import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full py-0 pb-20 md:pb-0 px-3 bg-background">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 items-center justify-center gap-7 md:gap-10">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-5xl leading-13 sm:leading-12 text-center md:text-left sm:text-5xl lg:text-7xl font-medium text-foreground/90 uppercase md:leading-15 lg:leading-20 tracking-tighter">
            Adopt and change two lives,{" "}
            <span className="font-bold text-foreground">theirs & yours</span>.
          </h1>

          <p className="text-base font-normal text-secondary/70">
            When you adopt, you are giving love, saving a life, and finding joy
            in a new best friend - all at once.
          </p>

          <Button asChild className={"w-fit px-6"} size="lg">
            <Link href={"/pets"}>Adopt Now</Link>
          </Button>
        </div>

        <Image
          src="/hero-2.png"
          width={500}
          height={500}
          alt="Dog"
          className="w-full border rounded-lg md:border-0"
        />
      </div>
    </section>
  );
};
export default Hero;
