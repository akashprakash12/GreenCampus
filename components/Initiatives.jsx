"use client";

import { motion } from "motion/react";
import {
  Droplets,
  Leaf,
  Recycle,
  Sun,
  Trash2,
  Trees,
  ArrowUpRight,
} from "lucide-react";

const initiatives = [
  {
    number: "01",
    title: "Tree Planting",
    description:
      "Planting and protecting native trees to improve campus biodiversity and air quality.",
    icon: Trees,
    color: "#a8bd8f",
  },
  {
    number: "02",
    title: "Waste Management",
    description:
      "Separating recyclable, organic and non-recyclable waste using labelled collection bins.",
    icon: Recycle,
    color: "#d2b48c",
  },
  {
    number: "03",
    title: "Water Conservation",
    description:
      "Reducing water wastage, reporting leaks and promoting responsible water consumption.",
    icon: Droplets,
    color: "#8eb5a4",
  },
  {
    number: "04",
    title: "Solar Energy",
    description:
      "Encouraging clean energy solutions and reducing dependence on conventional electricity.",
    icon: Sun,
    color: "#d8bf72",
  },
  {
    number: "05",
    title: "Plastic-Free Campus",
    description:
      "Reducing single-use plastic and encouraging students to use reusable alternatives.",
    icon: Trash2,
    color: "#bd7654",
  },
  {
    number: "06",
    title: "Campus Biodiversity",
    description:
      "Protecting plants, birds, butterflies and other living species within the campus.",
    icon: Leaf,
    color: "#93ad78",
  },
];

export default function Initiatives() {
  return (
    <section
      id="initiatives"
      className="relative overflow-hidden bg-[#0d3b2a] px-6 py-24 text-[#f1ead4] md:py-32"
    >
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#a8bd8f]/10 blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#bd7654]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#a8bd8f]">
              Campus Initiatives
            </p>

            <h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
              Turning green ideas into everyday actions.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-[#bdc9bd]">
            Our students and staff work together to create a cleaner,
            healthier and environmentally responsible campus.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;

            return (
              <motion.article
                key={initiative.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.25 },
                }}
                className="group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#123f2d] p-7 shadow-[0_25px_70px_rgba(0,0,0,0.15)]"
              >
                <div
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-10 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-20"
                  style={{ backgroundColor: initiative.color }}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-[#082c20] transition duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ backgroundColor: initiative.color }}
                  >
                    <Icon size={27} />
                  </div>

                  <span className="text-sm text-[#829d88]">
                    {initiative.number}
                  </span>
                </div>

                <div className="relative mt-16">
                  <h3 className="text-3xl font-semibold">
                    {initiative.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#b9c8bb]">
                    {initiative.description}
                  </p>
                </div>

                <div className="absolute bottom-7 right-7 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full border border-white/15 text-[#a8bd8f] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={19} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}