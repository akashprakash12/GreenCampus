"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
  Recycle,
  Sparkles,
  Trees,
} from "lucide-react";

const events = [
  {
    day: "05",
    month: "JUN",
    year: "2026",
    title: "World Environment Day",
    description:
      "Environmental awareness programme, campus cleaning and student activities.",
    time: "10:00 AM",
    location: "College Auditorium",
    category: "Awareness",
    icon: Sparkles,
    color: "#a8bd8f",
  },
  {
    day: "12",
    month: "JUL",
    year: "2026",
    title: "Campus Tree Planting",
    description:
      "Students and staff plant native trees in selected areas across the campus.",
    time: "9:30 AM",
    location: "College Campus",
    category: "Biodiversity",
    icon: Trees,
    color: "#d2b48c",
  },
  {
    day: "18",
    month: "AUG",
    year: "2026",
    title: "Waste Collection Drive",
    description:
      "Collection and segregation of recyclable waste from classrooms and laboratories.",
    time: "11:00 AM",
    location: "Main Block",
    category: "Recycling",
    icon: Recycle,
    color: "#8eb5a4",
  },
];

export default function Events() {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#f1ead4] px-6 py-24 text-[#082c20] md:py-32"
    >
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#a8bd8f]/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#4f7f55]">
              Campus Activities
            </p>

            <h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
              Events that inspire action.
            </h2>
          </div>

          <a
            href="#contact"
            className="group flex w-fit items-center gap-2 rounded-full border border-[#082c20]/20 px-5 py-3 text-sm font-medium text-[#082c20] transition hover:bg-[#082c20] hover:text-[#f1ead4]"
          >
            Join an event
            <ArrowUpRight
              size={18}
              className="transition group-hover:rotate-45"
            />
          </a>
        </motion.div>

        <div className="space-y-5">
          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.12,
                }}
                className="group grid overflow-hidden rounded-[2rem] border border-[#082c20]/10 bg-white/55 shadow-[0_20px_70px_rgba(8,44,32,0.08)] backdrop-blur-sm md:grid-cols-[170px_1fr_100px]"
              >
                <div className="flex items-center gap-5 border-b border-[#082c20]/10 p-6 md:flex-col md:justify-center md:border-b-0 md:border-r md:text-center">
                  <div>
                    <p className="font-[family-name:var(--font-cormorant)] text-6xl font-semibold leading-none">
                      {event.day}
                    </p>

                    <p className="mt-2 text-sm font-semibold tracking-[0.25em] text-[#4f7f55]">
                      {event.month}
                    </p>

                    <p className="mt-1 text-xs text-[#718078]">
                      {event.year}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold text-[#082c20]"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.category}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-[#5f7469]">
                      <Clock size={14} />
                      {event.time}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-[#5f7469]">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold md:text-4xl">
                    {event.title}
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-[#51685c]">
                    {event.description}
                  </p>
                </div>

                <div className="flex items-center justify-end p-6 md:justify-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-[#082c20] transition duration-300 group-hover:rotate-12 group-hover:scale-110"
                    style={{ backgroundColor: event.color }}
                  >
                    <Icon size={25} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex items-start gap-3 rounded-2xl border border-[#082c20]/10 bg-[#0d3b2a] p-5 text-[#f1ead4]"
        >
          <CalendarDays className="mt-0.5 shrink-0 text-[#a8bd8f]" size={22} />

          <p className="text-sm leading-6 text-[#d1d9d0]">
            These dates are sample information. Replace them with the actual
            dates, times and locations provided by your college.
          </p>
        </motion.div>
      </div>
    </section>
  );
}