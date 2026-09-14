"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, Leaf } from "lucide-react";

const HeroPlantScene = dynamic(() => import("./HeroPlantScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-[#a8bd8f]/20" />
    </div>
  ),
});

export default function Hero() {
  const heroRef = useRef(null);
const isHeroVisible = useInView(heroRef, {
  amount: 0.05,
});
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const centerTextY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1c5a3e_0%,#0d3b2a_45%,#082c20_100%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4f7f55]/20 blur-3xl"
      />

      {/* Decorative leaf */}

      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[5%] top-[72%] z-10 hidden h-20 w-20 items-center justify-center rounded-full border border-[#a8bd8f]/20 bg-white/5 text-[#a8bd8f] backdrop-blur-md xl:flex"
      >
        <Leaf size={29} />
      </motion.div>

      {/* 3D plant row */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 80 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: "easeOut",
        }}
        className="absolute inset-0 z-10 h-full w-full"
      >
        {isHeroVisible && <HeroPlantScene active={isHeroVisible} />}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#082c20] via-[#082c20]/45 to-transparent md:h-32" />
      </motion.div>

      {/* Hero content */}

      <motion.div
        style={{
          y: centerTextY,
          opacity: contentOpacity,
        }}
        className="absolute inset-x-6 top-[55%] z-20 mx-auto w-auto max-w-7xl -translate-y-1/2 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-7 flex w-fit max-w-full items-center gap-2 rounded-full border border-[#a8bd8f]/30 bg-white/5 px-4 py-2 backdrop-blur"
        >
          <Leaf size={15} className="shrink-0 text-[#a8bd8f]" />

          <span className="text-center text-[10px] uppercase tracking-[0.2em] text-[#d7dbc9] sm:text-xs sm:tracking-[0.25em]">
            IHRD Government Polytechnic College
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="text-6xl font-semibold leading-[0.9] text-[#f1ead4] sm:text-7xl md:text-8xl xl:max-w-3xl xl:text-[92px]"
        >
          Growing a
          <span className="block italic text-[#a8bd8f]">
            Greener Campus
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#c8d0c3] md:text-lg"
        >
          Students and staff working together to protect nature, reduce
          waste and build a sustainable future for our campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row xl:justify-start"
        >
          <a
            href="#initiatives"
            className="hero-primary-button rounded-full px-7 py-3.5 font-medium transition duration-300 hover:-translate-y-1"
          >
            Explore Initiatives
          </a>

          <a
            href="#contact"
            className="rounded-full border border-[#a8bd8f]/50 px-7 py-3.5 text-[#f1ead4] transition duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            Join the Movement
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-[#a8bd8f]"
      >
        <ArrowDown size={25} />
      </motion.a>
    </section>
  );
}