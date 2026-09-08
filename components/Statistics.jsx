"use client";

import { motion } from "motion/react";
import { Leaf, Recycle, Users, CalendarDays } from "lucide-react";

const statistics = [
  {
    value: "500+",
    label: "Trees and Plants",
    description: "Protecting and expanding campus greenery",
    icon: Leaf,
  },
  {
    value: "250+",
    label: "Student Volunteers",
    description: "Students participating in green activities",
    icon: Users,
  },
  {
    value: "30+",
    label: "Green Events",
    description: "Awareness programmes and cleaning drives",
    icon: CalendarDays,
  },
  {
    value: "75%",
    label: "Waste Segregated",
    description: "Separating recyclable and organic waste",
    icon: Recycle,
  },
];

export default function Statistics() {
  return (
    <section
      id="statistics"
      className="relative overflow-hidden bg-[#f1ead4] px-6 py-24 text-[#082c20] md:py-32"
    >
      <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-[#a8bd8f]/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#bd7654]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#4f7f55]">
            Our Growing Impact
          </p>

          <h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
            Change begins inside our campus.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#365447] md:text-lg">
            Every planted tree, recycled item and student volunteer helps us
            move towards a cleaner and more sustainable campus.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.25 },
                }}
                className="group rounded-[2rem] border border-[#082c20]/10 bg-white/55 p-7 shadow-[0_20px_60px_rgba(8,44,32,0.08)] backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d3b2a] text-[#f1ead4] transition group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={22} />
                </div>

                <p className="mt-8 font-[family-name:var(--font-cormorant)] text-5xl font-semibold">
                  {item.value}
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {item.label}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#4e685c]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-[#4e685c]">
          Replace these sample numbers with the college’s verified data.
        </p>
      </div>
    </section>
  );
}