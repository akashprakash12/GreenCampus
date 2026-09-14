"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Leaf } from "lucide-react";

const EcoScene = dynamic(() => import("./EcoScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-[#a8bd8f]/30" />
    </div>
  ),
});

export default function EcoShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#082c20] px-6 py-24 text-[#f1ead4] md:py-32">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4f7f55]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 text-[#a8bd8f]">
            <Leaf size={18} />

            <p className="text-sm uppercase tracking-[0.3em]">
              One Campus, One Planet
            </p>
          </div>

          <h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
            Every green action shapes our future.
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#bdc9bd]">
            Our campus is part of a larger ecosystem. Responsible use of
            water, energy and natural resources helps protect the planet for
            future generations.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="relative h-[520px] overflow-hidden rounded-[3rem] border border-white/10 bg-[#0d3b2a]/70 shadow-[0_30px_100px_rgba(0,0,0,0.25)] lg:h-[calc(100vh-8rem)]"
        >
          <EcoScene />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#082c20]/80 to-transparent" />

          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-[0.25em] text-[#a8bd8f]">
            Campus Plant
          </p>
        </motion.div>
      </div>
    </section>
  );
}