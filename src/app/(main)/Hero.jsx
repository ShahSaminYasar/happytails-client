"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <section className="w-full py-0 pb-20 md:pb-0 px-3 bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 items-center justify-center gap-7 md:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-4 w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl leading-13 sm:leading-12 text-center md:text-left sm:text-5xl lg:text-7xl font-medium text-foreground/90 uppercase md:leading-15 lg:leading-20 tracking-tighter"
          >
            Adopt and change two lives,{" "}
            <span className="font-bold text-foreground">theirs & yours</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-base font-normal text-secondary/70 text-center md:text-left"
          >
            When you adopt, you are giving love, saving a life, and finding joy
            in a new best friend all at once.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex justify-center md:justify-start"
          >
            <Button asChild className={"w-fit px-6"} size="lg">
              <Link href={"/pets"}>Adopt Now</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/hero-2.png"
              width={500}
              height={500}
              alt="Dog"
              className="w-full border rounded-lg md:border-0"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
