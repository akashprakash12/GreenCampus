"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Leaf, Recycle, Sprout, Users } from "lucide-react";

const points = [
  {
    icon: Sprout,
    title: "Protect nature",
    text: "Preserve campus plants, trees and biodiversity.",
  },
  {
    icon: Recycle,
    title: "Reduce waste",
    text: "Promote segregation, recycling and responsible disposal.",
  },
  {
    icon: Users,
    title: "Student action",
    text: "Encourage students to participate in environmental activities.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f1ead4] px-6 py-24 text-[#082c20] md:py-32"
    >
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#a8bd8f]/30 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#bd7654]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto min-h-[530px] w-full max-w-xl md:min-h-[680px]"
        >
          <motion.div
            whileInView={{ y: [40, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-0 top-0 h-[430px] w-[78%] overflow-hidden rounded-[10rem_10rem_3rem_3rem] shadow-[0_30px_80px_rgba(8,44,32,0.2)] md:h-[560px]"
          >
            <Image
              src="/images/campus-4.jpg"
              alt="Students participating in campus planting"
              fill
              sizes="(max-width: 768px) 80vw, 500px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#082c20]/55 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 text-[#f1ead4]">
              <p className="text-xs uppercase tracking-[0.25em] text-[#cbd8c0]">
                Growing Together
              </p>

              <p className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl font-semibold">
                Green Campus
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="absolute bottom-0 right-0 h-[260px] w-[52%] overflow-hidden rounded-[2rem] border-8 border-[#f1ead4] shadow-2xl md:h-[330px]"
          >
            <Image
              src="/images/campus-6.jpg"
              alt="NSS volunteers participating in a Green Campus activity"
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[8%] top-[8%] flex h-20 w-20 items-center justify-center rounded-full border border-[#082c20]/10 bg-[#0d3b2a] text-[#f1ead4] shadow-xl md:h-24 md:w-24"
          >
            <Leaf size={30} />
          </motion.div>
        </motion.div>

        {/* About content */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-2 text-[#4f7f55]">
            <Leaf size={18} />

            <p className="text-sm uppercase tracking-[0.3em]">
              About Green Campus
            </p>
          </div>

          <h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
            Small actions create meaningful change.
          </h2>

          <p className="mt-7 text-lg leading-8 text-[#365447]">
            Our Green Campus programme brings students and staff together to
            create a cleaner, healthier and environmentally responsible
            college.
          </p>

          <p className="mt-4 leading-7 text-[#51685c]">
            Through practical activities, awareness programmes and
            sustainable campus policies, we encourage everyone to take
            responsibility for protecting our environment.
          </p>

          <div className="mt-9 space-y-4">
            {points.map((point, index) => {
              const Icon = point.icon;

              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.12,
                  }}
                  className="group flex gap-4 rounded-2xl border border-[#082c20]/10 bg-white/45 p-4 transition hover:-translate-y-1 hover:bg-white/70"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0d3b2a] text-[#f1ead4] transition group-hover:rotate-6">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">{point.title}</h3>

                    <p className="mt-1 text-sm leading-6 text-[#51685c]">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <a
            href="#initiatives"
            className="mt-9 inline-flex rounded-full bg-[#082c20] px-7 py-3.5 font-medium text-[#f1ead4] transition hover:-translate-y-1 hover:bg-[#0d3b2a]"
          >
            Discover our initiatives
          </a>
        </motion.div>
      </div>
    </section>
  );
}
