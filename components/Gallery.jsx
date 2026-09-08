"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Camera } from "lucide-react";

const galleryImages = [
  {
    src: "/images/campus-1.jpeg",
    title: "Campus Greenery",
    category: "Green Campus",
    size: "large",
  },
  {
    src: "/images/campus-2.jpg",
    title: "Campus Plants",
    category: "Biodiversity",
    size: "normal",
  },
  {
    src: "/images/campus-3.jpg",
    title: "NSS Activity",
    category: "Student Participation",
    size: "normal",
  },
  {
    src: "/images/campus-4.jpg",
    title: "Vegetable Planting",
    category: "Sustainable Farming",
    size: "tall",
  },
  {
    src: "/images/campus-5.jpg",
    title: "Growing Together",
    category: "Environment",
    size: "normal",
  },
  {
    src: "/images/campus-6.jpg",
    title: "NSS Volunteers",
    category: "Campus Activity",
    size: "wide",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#0d3b2a] px-6 py-24 text-[#f1ead4] md:py-32"
    >
      <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#a8bd8f]/10 blur-3xl" />
      <div className="absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-[#bd7654]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#a8bd8f]">
              <Camera size={18} />

              <p className="text-sm uppercase tracking-[0.3em]">
                Campus Gallery
              </p>
            </div>

            <h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
              Green moments from our campus.
            </h2>
          </div>

          <p className="max-w-md leading-7 text-[#bdc9bd]">
            Explore environmental activities, NSS programmes, planting
            projects and student participation.
          </p>
        </motion.div>

        <div className="grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => {
            let sizeClass = "";

            if (image.size === "large") {
              sizeClass = "sm:col-span-2 sm:row-span-2";
            }

            if (image.size === "tall") {
              sizeClass = "sm:row-span-2";
            }

            if (image.size === "wide") {
              sizeClass = "sm:col-span-2";
            }

            return (
              <motion.article
                key={image.src}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: (index % 3) * 0.1,
                }}
                className={`group relative overflow-hidden rounded-[2rem] bg-[#082c20] ${sizeClass}`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes={
                    image.size === "large"
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#082c20]/95 via-[#082c20]/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#a8bd8f]">
                      {image.category}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold text-[#f1ead4]">
                      {image.title}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[#f1ead4] text-[#082c20] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={19} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}