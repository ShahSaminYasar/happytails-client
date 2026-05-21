import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full py-0 px-3">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 items-center justify-center gap-7 md:gap-10">
        <h1 className="text-5xl leading-13 sm:leading-12 text-center md:text-left sm:text-5xl lg:text-7xl font-medium text-foreground/90 uppercase md:leading-15 lg:leading-20 tracking-tighter">
          Adopt and change two lives,{" "}
          <span className="font-bold text-foreground">theirs & yours</span>.
        </h1>

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
